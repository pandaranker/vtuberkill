'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'huajing',
		connect:true,
		card:{
			//化鲸篇
			qi:{
				fullskin:true,
				enable:true,
				type:'basic',
				toself:true,
				filterTarget:function(card,player,target){
					return true;
				},
				selectTarget:1,
				modTarget:true,
				content:function(){
					'step 0'
					if(!target.hasSkill('qi_skill')){
						target.addTempSkill('qi_skill')
					}
					'step 1'
					if(target.isDamaged()){
						target.changeHujia();
					}
				},
				ai:{
					order:function(item,player){
						if(player.isDamaged()) return 5.1;
						return get.order({name:'sha'})+0.3;
					},
					value:5,
					useful:[3,2,2,1],
					result:{
						target:function(player,target){
							if(target.isDamaged()) return 1.1;
							else if(!target.isPhaseUsing())	return 0;
							var shas=player.getCards('h','sha');
							if(shas.length>1&&(player.getCardUsable('sha')>1||player.countCards('h','zhuge'))){
								return 0;
							}
							shas.sort(function(a,b){
								return get.order(b)-get.order(a);
							})
							var card;
							if(shas.length){
								for(var i=0;i<shas.length;i++){
									if(lib.filter.filterCard(shas[i],target)){
										card=shas[i];break;
									}
								}
							}
							if(card){
								if(game.hasPlayer(function(current){
									return (get.attitude(target,current)<0&&
										target.canUse(card,current,true,true)&&
										!current.hasSkillTag('filterDamage',null,{
											player:player,
											card:card,
											qi:true,
										})&&
										get.effect(current,card,target)>0);
								})){
									if(card.nature)	return 0.2;
									return 1;
								}
							}
							return 0;
						},
					},
					//一些新标签
					tag:{
						changeNatrue:1,
						gainHujia:0.8,
					}
				}
			},
			jingluo:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				yingbian_prompt:'当你使用此牌选择目标后，你可为此牌减少一个目标',
				yingbian:function(event){
					event.yingbian_removeTarget=true;
				},
				filterTarget:function(card,player,target){
					return true;
				},
				reverseOrder:true,
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					if(event.directHit) event._result={bool:false};
					else{
						var next=target.chooseToDiscard('he');
						next.set('ai',function(card){
							var evt=_status.event.getParent();
							if(evt.target.hp==evt.target.maxHp) return 0;
							if(!evt.target.isLinked())	return 4-get.value(card);
							if(get.name(card)=='shan'&&evt.target.hp>1)	return 2;
							return 9-get.value(card);
						});
						next.set('prompt','弃置一张牌，否则横置并摸一张牌');
					}
					'step 1'
					if(result.cards&&result.cards.length){
						target.changeHujia(event.baseDamage);
						event.finish();
					}
					'step 2'
					if(target.isLinked())	event.finish();
					'step 3'
					target.link();
					target.draw();
				},
				ai:{
					wuxie:function(target,card,player,viewer){
						if(get.attitude(viewer,target)<0){
							if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
						}
					},
					basic:{
						order:9,
						useful:[5,1],
						value:5,
					},
					result:{
						target:function(player,target){
							if(player.hasUnknown(2)&&get.mode()!='guozhan') return 1;
							var nh=target.countCards('h');
							if(get.mode()=='identity'){
								if(target.isZhu&&nh<=2&&target.hp<=1) return 2;
							}
							if(nh==0) return 1.5;
							return 1;
						},
					},
					tag:{
						huajing:1,
						loseCard:0.5,
						discard:0.5,
						draw:0.5,
						gainHujia:0.8,
						multitarget:1,
						multineg:1,
					}
				}
			},
			haixiao:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:-1,
				reverseOrder:true,
				cardnature:'ocean',
				yingbian_prompt:'当你使用此牌选择目标后，你可为此牌减少一个目标',
				yingbian:function(event){
					event.yingbian_removeTarget=true;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					if(event.directHit) event._result={bool:false};
					else{
						var sourcecolor = get.color(card,player);
						var next=target.chooseToRespond({color:sourcecolor});
						next.set('ai',function(card){
							var evt=_status.event.getParent();
							if(get.damageEffect(evt.target,evt.player,evt.target)>=0) return 0;
							if(evt.player.hasSkillTag('notricksource')) return 0;
							if(evt.target.hasSkillTag('notrick')) return 0;
							if(evt.target.hasSkillTag('noocean')||evt.target.hasSkillTag('nodamage')){
								return -1;
							}
						return 8-get.value(card);
						});
						next.set('prompt',`【海啸】：打出一张颜色为${get.translation(sourcecolor)}的牌响应之，否则受到${get.cnNumber(event.baseDamage)}点海洋伤害`);
						next.autochoose=lib.filter.autoRespondShan;
					}
					'step 1'
					if(result.bool==false){
						target.damage(event.baseDamage,'ocean');
					}
				},
				ai:{
					wuxie:function(target,card,player,viewer){
						var suit = get.suit(card);
						if(get.attitude(viewer,target)>0&&target.countCards('h',function(card){
							return suit==get.suit(card);
						})){
							if(!target.countCards('h')||target.hp==1||Math.random()<0.7) return 0;
						}
					},
					basic:{
						order:9,
						useful:1,
						value:5
					},
					result:{
						target:function(player,target){
							if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
							var nh=target.countCards('h');
							if(get.mode()=='identity'){
								if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
							}
							if(nh==0) return -2;
							if(nh==1) return -1.7
							return -1.5;
						},
					},
					tag:{
						huajing:1,
						respond:1,
						damage:1,
						natureDamage:1,
						oceanDamage:1,
						multitarget:1,
						multineg:1,
					}
				}
			},
			langyong:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:1,
				cardnature:'ocean',
				modTarget:true,
				filterTarget:function(card,player,target){
					return target.countCards('e');
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					target.chooseControl('dialogcontrol',['弃置装备区所有牌','受到海洋伤害']).set('ai',function(){
						var evt=_status.event.getParent();
						if(evt.player.hasSkillTag('notricksource')) return 1;
						if(evt.player.hasSkillTag('noocean')) return 1;
						if(evt.target.hasSkillTag('notrick')) return 1;
						if(evt.target.hp==1)	return 0;
						return Math.random()<0.5?1:0;
					}).set('prompt',`【浪涌】：弃置装备区里所有的牌，或受到${get.translation(player)}造成的${get.cnNumber(event.baseDamage)}点海洋伤害。`);
					'step 1'
					if(result.control=='弃置装备区所有牌'){
						target.discard(target.getCards('e'))
					}else{
						target.damage(event.baseDamage,'ocean')
					}
				},
				ai:{
					basic:{
						order:9.5,
						useful:[3,1],
						value:5,
					},
					result:{
						target:function(player,target){
							if(player.hasSkill('miaomiao'))	return get.recoverEffect(target,player,player);
							if(target.hasSkillTag('noocean')) return 0;
							return -1.5;
						},
					},
					tag:{
						huajing:1,
						loseCard:1,
						discard:1,
						damage:1,
						natureDamage:1,
						oceanDamage:1,
					}
				}
			},
			chenmo:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target.countCards('he');
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target, 'he', [1, 3], '【沉没】：移除至多3张牌',true).set('ai',function(button){
						var val = get.buttonValue(button);
						var att = get.attitude(_status.event.player,get.owner(button.link));
						var pos = get.position(button.link);
						var extra = get.owner(button.link).getCards('h').removeArray(ui.selected.cards);
						if(att>0&&pos=='h') return 8+val;
						else if(pos=='h'&&extra.length==1&&extra.contains(button.link)) return 0;
						else if(att>0)	return -val;
						return val;
					});
					'step 1'
					if(result.bool){
						event.cards = result.links.slice(0);
						if(!target.hasSkill('chen_card')){
							target.addSkill('chen_card');
						}
						target.lose(result.links,ui.special,'toStorage');
					}else{
						event.finish();
					}
					'step 2'
					target.markAuto('chen_card',event.cards);
					event.result = {cards:event.cards};
					'step 3'
					if (target && target.countCards('h') == 0) {
						target.draw();
					}
				},
				ai:{
					basic:{
						order:10.5,
						useful:[2,1],
						value:5,
					},
					result:{
						target:function(player,target){
							if(!player.inRange(target)&&!player.hasCard('juedou'))	return 0;
							if(target==player&&player.needsToDiscard())	return 1;
							var att=get.attitude(player,target);
							var nh=target.countCards('h');
							if(att>0){
								var js=target.getCards('j');
								if(js.length){
									var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
									if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
										return 3;
									}
								}
								if(target.getEquip('baiyin')&&target.isDamaged()&&
									get.recoverEffect(target,player,player)>0){
									if(target.hp==1&&!target.hujia) return 1.6;
									if(target.hp==2) return 0.01;
									return 0;
								}
							}
							var es=target.getCards('e');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.filter(function(esx){
							return esx.name=='tengjia'||get.value(esx)>0
							}).length==0);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&(noe||noe2)) return 0;
							if(att<=0&&!target.countCards('he')) return 1.5;
							return -1.5;
						},
					},
					tag:{
						huajing:1,
						draw:1,
						loseCard:1,
						discard:1
					}
				}
			},
			chenjing:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target.countCards('he');
				},
				content:function(){
					'step 0'
					player.choosePlayerCard(target, 'he', [1, 3], '【沉静】：移除至多3张牌',true).set('ai',function(button){
						var val = get.buttonValue(button);
						var att = get.attitude(_status.event.player,get.owner(button.link));
						var pos = get.position(button.link);
						var extra = get.owner(button.link).getCards('h').removeArray(ui.selected.cards);
						if(att>0&&pos=='h') return 8+val;
						else if(pos=='h'&&extra.length==1&&extra.contains(button.link)) return 0;
						else if(att>0)	return -val;
						return val;
					});
					'step 1'
					if(result.bool){
						event.cards = result.links.slice(0);
						if(!target.hasSkill('chen_card')){
							target.addSkill('chen_card');
						}
						target.lose(result.links,ui.special,'toStorage');
					}else{
						event.finish();
					}
					'step 2'
					target.markAuto('chen_card',event.cards);
					event.result = {cards:event.cards};
					'step 3'
					if (target && target.countCards('h') == 0) {
						target.changeHujia();
					}
				},
				ai:{
					basic:{
						order:10.5,
						useful:[2,1],
						value:5,
					},
					result:{
						target:function(player,target){
							if(!player.inRange(target)&&!player.hasCard('juedou'))	return 0;
							if(target==player&&player.needsToDiscard())	return 1;
							var att=get.attitude(player,target);
							var nh=target.countCards('h');
							if(att>0){
								var js=target.getCards('j');
								if(js.length){
									var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
									if(jj.name=='guohe'||js.length>1||get.effect(target,jj,target,player)<0){
										return 3;
									}
								}
								if(target.getEquip('baiyin')&&target.isDamaged()&&
									get.recoverEffect(target,player,player)>0){
									if(target.hp==1&&!target.hujia) return 1.6;
									if(target.hp==2) return 0.01;
									return 0;
								}
							}
							var es=target.getCards('e');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.filter(function(esx){
							return esx.name=='tengjia'||get.value(esx)>0
							}).length==0);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&(noe||noe2)) return 0;
							if(att<=0&&!target.countCards('he')) return 1.5;
							return -1.5;
						},
					},
					tag:{
						huajing:1,
						gainHujia:0.8,
						loseCard:1,
						discard:1
					}
				}
			},
			
			xuanwo:{
				fullskin:true,
				type:'delay',
				filterTarget:function(card,player,target){
					return (lib.filter.judge(card,player,target)&&player!=target);
				},
				judge:function(card){
					if(get.suit(card)=='diamond') return 2;
					return -3;
				},
				effect:function(){
					if(result.bool==false){
						var list = game.filterPlayer(function(current){
							return get.distance(player,current,'pure')==1;
						},targets);
						list.unshift(player);
						for(var i=0;i<list.length;i++){
							list[i].chooseToDiscard(1,true,'he');
						}
						player.addJudgeNext(card);
					}
				},
				ai:{
					basic:{
						order:1,
						useful:1,
						value:8,
					},
					result:{
						target:function(player,target){
							var num=target.hp-target.countCards('h')-2;
							if(num>-1) return -0.01;
							if(target.hp<3) num--;
							if(target.isTurnedOver()) num/=2;
							var dist=get.distance(player,target,'absolute');
							if(dist<1) dist=1;
							return num/Math.sqrt(dist);
						}
					},
					tag:{
						huajing:1,
						loseCard:1,
						discard:1,
					}
				}
			},
			haidi:{
				fullskin:true,
				type:'delay',
				filterTarget:function(card,player,target){
					return (lib.filter.judge(card,player,target));
				},
				judge:function(card){
					if(get.number(card)>10) return 3;
					return 0;
				},
				effect:function(){
					if(result.bool==true){
						player.draw(2);
					}else{
						player.storage.haidi = 2;
						if(!player.hasSkill('haidi')){
							player.addTempSkill('haidi');
						}
						player.addJudge({name:'haidi'},card);
					}
				},
				ai:{
					basic:{
						order:1,
						useful:[2,1],
						value:8,
					},
					result:{
						target:function(player,target){
							return 3;
						}
					},
					tag:{
						huajing:1,
						draw:1,
					}
				}
			},

			sanchaji:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:6
					},
					tag:{
						huajing:1,
					}
				},
				skills:['sanchaji_skill']
			},
			yinghua:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				ai:{
					basic:{
						equipValue:6
					},
					tag:{
						huajing:1,
					}
				},
				skills:['yinghua_skill']
			},
			linghunshouge:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-4},
				ai:{
					basic:{
						equipValue:4
					},
					tag:{
						huajing:1,
					}
				},
				skills:['linghunshouge_skill']
			},
			
			waiguge:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				equipDelay:false,
				onEquip:function(){
					player.changeHujia();
				},
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				skills:['waiguge_skill'],
				tag:{
					gainHujia:1,
				},
				ai:{
					order:9.5,
					equipValue:function(card,player){
						if(player.countCards('h','waiguge')) return 6;
						return 5;
					},
					basic:{
						equipValue:5
					},
					tag:{
						huajing:1,
					}
				}
			},
			qiyu:{
				fullskin:true,
				type:'equip',
				subtype:'equip4',
				distance:{globalFrom:-1},
				ai:{
					basic:{
						equipValue:4
					},
					tag:{
						huajing:1,
					}
				},
			},
			yalishanda:{
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				nomod:true,
				forceDie:true,
				clearLose:true,
				skills:['yalishanda_skill','yalishanda_skill2'],
				ai:{
					equipValue:function(card){
						return 7;
					},
					basic:{
						equipValue:7
					},
					tag:{
						huajing:1,
					}
				}
			},
			//二扩
			qinshi:{
				fullskin:true,
				type:'trick',
				enable:function(card,player){
					return player.countDiscardableCards(player,'he',function(i){
						return i!=card;
					});
				},
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.hujia;
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number') event.baseDamage=1;
					event.discard = player.chooseToDiscard('he',true).set('prompt2',`若弃置装备牌，则额外对目标造成${get.cnNumber(event.baseDamage)}点暗影伤害`).set('ai',function(card){
						var target = _status.event.getParent().target;
						var player = _status.event.player;
						if(get.type(card)=='equip') return get.damageEffect(target,player,player)+7-get.value(card);
						return 7-get.value(card);
					})
					'step 1'
					event.num = target.hujia;
					target.changeHujia(-event.num);
					game.delayx();
					'step 2'
					var card = event.discard.result.cards[0];
					if(get.type(card)=='equip')	target.damage(event.baseDamage,'yami');
				},
				ai:{
					basic:{
						order:10.5,
						useful:[5,3,1],
						value:[5,3,1],
					},
					result:{
						player:function(player,target){
							return -0.7;
						},
						target:function(player,target){
							return -target.hujia;
						},
					},
					tag:{
						huajing:1,
						damage:1,
						yamiDamage:1,
						oceanDamage:1,
					}
				}
			},
			bowen:{
				fullskin:true,
				type:'trick',
				enable:true,
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.hujia;
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number')	event.baseDamage=1;
					event.num = target.hujia;
					target.chooseToDiscard(event.num,true);
					'step 1'
					if(result.cards.length<event.num)	target.damage(event.baseDamage,'ocean');
				},
				chongzhu:true,
				ai:{
					basic:{
						order:10.5,
						useful:[5,3,1],
						value:[5,3,1],
					},
					result:{
						target:function(player,target){
							var hs = target.countCards('h');
							var hujia = target.hujia;
							if(hs<hujia)	return -(2+hs);
							else return -hujia;
						},
					},
					tag:{
						huajing:1,
						discard:1,
						damage:0.2,
						natureDamage:1,
						oceanDamage:1,
					}
				}
			},
			huiliu:{
				fullskin:true,
				type:'trick',
				enable:true,
				range:{global:2},
				selectTarget:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.hujia;
				},
				content:function(){
					'step 0'
					if(typeof event.baseDamage!='number')	event.baseDamage=1;
					target.changeHujia(-event.baseDamage);
					game.delay(0.5);
					'step 1'
					player.changeHujia(event.baseDamage + (player.isDamaged()?1:0));
				},
				ai:{
					basic:{
						order:10.5,
						useful:[5,3,1],
						value:[5,3,1],
					},
					result:{
						player:function(player,target){
							if(player.isDamaged())	return 2;
							else return 1;
						},
						target:-1,
					},
					tag:{
						huajing:1,
						gainHujia:1.5,
					}
				}
			},
			suansuyulei:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4
					},
					tag:{
						huajing:1,
					}
				},
				skills:['suansuyulei_skill']
			},
			shenshuizhadan:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				ai:{
					equipValue:function(card,player){
						if(player.countCards('h')) return 7;
						if(player.countCards('e')>1) return 6;
						return 4;
					},
					basic:{
						equipValue:5
					},
					tag:{
						huajing:1,
					}
				},
				skills:['shenshuizhadan_skill']
			},
			qianshuifu:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				equipDelay:false,
				onLose:function(){
					player.logSkill('qianshuifu_skill');
					var next=game.createEvent('qianshuifu_draw');
					event.next.remove(next);
					event.getParent().after.push(next);
					next.player=player;
					next.setContent(function(){
						player.draw();
					});
				},
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				skills:['qianshuifu_skill'],
				tag:{
					draw:1,
				},
				ai:{
					order:9.5,
					equipValue:function(card,player){
						if(player.countCards('h','qianshuifu')) return 6;
						return 0;
					},
					basic:{
						equipValue:5
					},
					tag:{
						huajing:1,
					}
				}
			},
			fanchuan:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
				ai:{
					basic:{
						equipValue:4,
					},
					tag:{
						huajing:1,
					}
				},
			},
			yatelandisi:{
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				nomod:true,
				forceDie:true,
				clearLose:true,
				skills:['yatelandisi_skill1','yatelandisi_skill2'],
				ai:{
					equipValue:function(card,player){
						if(player.countCards('e')>=3) return 8;
						return 7;
					},
					basic:{
						equipValue:7
					},
					tag:{
						huajing:1,
					}
				}
			},
		},
		skill:{
			qi_skill:{
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(!get.info(event.card).nature)	return false;
					var natures = get.info(event.card).nature.slice(0);
					natures.remove('kami');
					if(event.card.nature)	natures.remove(event.card.nature);
					return natures.length;
				},
				direct:true,
				onremove:true,
				content:function(){
					'step 0'
					var list=get.info(trigger.card).nature.slice(0);
					list.remove('kami');
					if(trigger.card.nature)	list.remove(trigger.card.nature);
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('qi')).set('prompt2','将'+get.translation(trigger.card)+'转换为以下属性之一').set('ai',function(){
						var player = _status.event.player;
						var card = _status.event.getTrigger().card;
						if(get.name(card)=='tao'&&get.nature(card)=='ocean')	return 'cancel2';
						if(get.name(card)=='tao'&&get.nature(card)!='ocean')	return 'ocean';
						if(get.name(card)=='sha'){
							var targets = _status.event.getTrigger().targets;
							for(var i=0;i<targets.length;i++){
								if(get.damageEffect(target,player,player)){
									if(targets[i].hasSkillTag('nodamage'))	return 'ice';
									if(!targets[i].hasSkillTag('noocean')&&targets[i].hujia>0)	return 'ocean';
									if(!targets[i].hasSkillTag('nofire')&&targets[i].getEquip('tengjia'))	return 'fire';
									if(!targets[i].hasSkillTag('noyami')&&targets[i].countCards('h')>=player.countCards('h'))	return 'yami';
								}
							}
						}
						return list.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('qi');
						trigger.card.nature=result.control;
						player.popup(get.translation(trigger.card).slice(0,2),result.control);
						game.log('#y'+get.translation(get.name(trigger.card)),'被转为了',trigger.card);
						player.removeSkill('qi_skill');
					}
				},
			},
			chen_card: {
				trigger:{
					global:'phaseEnd'
				},
				mark:true,
				marktext:'沉',
				direct:true,
				intro:{
					content:'cardCount',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							storage.length=0;
						}
					},
				},
				content:function(){
					if(player.storage.chen_card){
						player.gain(player.storage.chen_card,'fromStorage');
						delete player.storage.chen_card;
					}
					player.removeSkill('chen_card');
				},
			},
			haidi:{
				mark:true,
				marktext:'宝',
				intro:{
					content:'手牌上限+#',
				},
				mod:{
					maxHandcard:function (player,num){
						return num+player.storage.haidi;
					},
				},
			},
			sanchaji_skill:{
				equipSkill:true,
				trigger:{player:'useCard1'},
				check:function(event,player){
					if(event.targets[0].hujia==0)	return false;
					if(event.targets[0].isLinked()&&player.isLinked&&!player.hasSkillTag('noocean'))	return false;
					if(get.attitude(player,event.targets[0])>0) return true;
					var eff=0;
					for(var i=0;i<event.targets.length;i++){
						var target=event.targets[i];
						var eff1=get.damageEffect(target,player,player);
						var eff2=get.damageEffect(target,player,player,'ocean');
						eff+=eff2;
						eff-=eff1;
					}
					return eff>=0;
				},
				filter:function(event,player){
					if(event.card.name=='sha'&&event.card.nature!='ocean') return true;
				},
				content:function(){
					'step 0'
					if(trigger.card.nature){
						event.nature = trigger.card.nature;
					}
					'step 1'
					trigger.card.nature='ocean';
					if(get.itemtype(trigger.card)=='card'){
						var next=game.createEvent('sanchaji_clear');
						next.card=trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						if(event.nature){
							next.nature = event.nature;
							next.setContent(function(){
								card.nature = nature;
							});
						}else{
							next.setContent(function(){
								delete card.nature;
							});
						}
					}
				}
			},
			linghunshouge_skill:{
				equipSkill:true,
				trigger:{source:'damageBegin4'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.player.hujia>0;
				},
				content:function(){},
				ai:{
					overHujia:true,
					skillTagFilter:function(player){
						return true;
					},
				}
			},
			suansuyulei_skill:{
				equipSkill:true,
				trigger:{source:'damageBegin4'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.card&&(get.tag(event.card,'damage')&&get.nature(event.card)=='ocean'
					||get.tag(event.card,'oceanDamage'))&&event.player.hujia>0;
				},
				content:function(){},
				ai:{
					unequip:true,
					overHujia:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||!(get.tag(arg.card,'damage')&&get.nature(arg.card)=='ocean'
						||get.tag(arg.card,'oceanDamage'))) return false;
					},
				},
			},
			shenshuizhadan_skill:{
				equipSkill:true,
				hiddenYami:function(player,name){
					return player.countCards('h',function(card){
						if(!lib.skill.shenshuizhadan_skill.filterCard(card,false,player))	return false;
						return true
					});
				},
				enable:'chooseToUse',
				viewAs:{name:'sha',nature:'yami'},
				position:'h',
				filterCard:function(card,player,event){
					return get.type(card,'trick')=='trick';
				},
			},
			yinghua_skill:{
				trigger:{player:'shaBegin'},
				filter:function(event,player){
					return lib.filter.filterTarget({name:'langyong'},player,event.target);
				},
				check:function(event,player){
					if(event.target.hujia==0)	return false;
					if(event.target.isLinked()&&player.isLinked&&!player.hasSkillTag('noocean'))	return false;
					if(get.attitude(player,event.target)>0&&event.target.hasSkillTag('noocean')) return true;
					var eff=0;
					for(var i=0;i<event.targets.length;i++){
						var target=event.targets[i];
						var eff1=get.damageEffect(target,player,player);
						var eff2=get.damageEffect(target,player,player,'ocean');
						eff+=eff2;
						eff-=eff1;
					}
					return eff>=0;
				},
				content:function(){
					var fun = lib.card.langyong.content;
					game.log(player,'将',trigger.card,'的效果改为【浪涌】');
					trigger.setContent(fun);
				},
			},
			waiguge_skill:{
				equipSkill:true,
				trigger:{player:'damageBegin4'},
				forced:true,
				lastDo:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return event.nature=='ocean';
				},
				content:function(){
					trigger.changeToZero();
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasSkillTag('unequip2')) return false;
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('unequip',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('unequip_ai',false,{
								name:arg.card?arg.card.name:null,
								target:player,
								card:arg.card,
							})) return false;
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			qianshuifu_skill:{
				equipSkill:true,
				trigger:{player:'damageBegin4'},
				forced:true,
				lastDo:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(!event.source||event.source.inRange(player)||event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return event.num>0;
				},
				content:function(){
					trigger.num--;
				},
			},
			yalishanda_skill:{
				equipSkill:true,
				trigger:{source:'damageBegin1'},
				direct:true,
				firstDo:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var list=lib.linked.slice(0);
					list.remove('kami');
					if(trigger.nature)	list.remove(trigger.nature);
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt('yalishanda_skill')).set('prompt2','将本次伤害转换为以下属性之一');
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('yalishanda');
						trigger.nature=result.control;
						game.log('本次伤害被转为了','#y'+get.translation(result.control),'属性')
					}
				},
			},
			yalishanda_skill2:{
				equipSkill:true,
				trigger:{source:'damageEnd'},
				firstDo:true,
				filter:function(event,player){
					return event.player.countCards('he');
				},
				content:function(){
					'step 0'
					player.discard(player.getCards('e',{name:'yalishanda'}));
					'step 1'
					trigger.player.chooseToDiscard('he',2,true);
				},
			},
			yatelandisi_skill1:{
				equipSkill:true,
				trigger:{global:'phaseBegin'},//
				direct:true,
				firstDo:true,
				filter:function(event,player){
					return player.countCards('e',function(i){
						var subtype = get.subtype(i)
						if(player.storage.yatelandisi_skill2&&player.storage.yatelandisi_skill2.contains(subtype))	return false;
						return ['equip1','equip2'].contains(subtype);
					});
				},
				content:function(){
					'step 0'
					var att = get.attitude(player,_status.currentPhase)>=0;
					att = (att)?0:1;
					var list = [];
					event.equip1 = player.getEquip(1);
					event.equip2 = player.getEquip(2);
					if(event.equip1&&!player.getStorage('yatelandisi_skill2').contains('equip1')){
						list.push('武器栏');
					}
					if(event.equip2&&!player.getStorage('yatelandisi_skill2').contains('equip2')){
						list.push('防具栏');
					}
					if(list.length==1&&att==1)	att = -1;
					list.push('取消');
					player.chooseControl('dialogcontrol',list,function(){
						return _status.event.att;
					}).set('att',att).set('prompt',get.prompt2('yatelandisi'));
					'step 1'
					if(result.control!='取消'){
						player.logSkill('yatelandisi');
						switch(result.control){
							case '武器栏':event.subtype = 'equip1';break;
							case '防具栏':event.subtype = 'equip2';break;
						}
						player.popup(result.control);
						game.delay(0.5);
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(get.subtype(name)==event.subtype) list.push(['装备','',name]);
						}
						game.broadcastAll(function(id, list){
							var dialog=ui.create.dialog('###『亚特兰蒂斯』###声明一张牌',[list,'vcard']);
							dialog.videoId = id;
						}, event.videoId, list);
					}else{
						event.finish();
					}
					'step 2'
					var next = player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						var value = player.getUseValue({name:button.link[2],isCard:true});
						if(player.hasCard({name:button.link[2]}))	return 2*value;
						return value;
					});
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if (result.bool&&event[event.subtype]) {
						player.popup(event.subtype,event[event.subtype],event[event.subtype].name);
						game.delay(0.5);
						var name0 = event[event.subtype].name;
						var cardid = event[event.subtype].cardid;
						event[event.subtype].viewAs = result.links[0][2];
						event[event.subtype].name = result.links[0][2];
						if(!player.storage.yatelandisi_skill2)	player.storage.yatelandisi_skill2 = [];
						player.storage.yatelandisi_skill2.add(event.subtype);
						if(player.storage.yatelandisi_skill3&&player.storage.yatelandisi_skill3.length){
							player.removeSkill('yatelandisi_skill3');
						}
						player.storage.yatelandisi_skill3 = [cardid,name0,event[event.subtype]];
						game.log(player,'的『',event.name,'』声明了【',event[event.subtype].viewAs,'】');
						player.syncStorage('yatelandisi_skill3');
						player.addTempSkill('yatelandisi_skill3');
					}
					'step 4'
					player.useCard({name:'chenjing'},[player]);
				},
			},
			yatelandisi_skill2:{
				equipSkill:true,
				trigger:{global:'roundStart'},
				forced:true,
				silent:true,
				popup:false,
				filter:function(event,player){
					return player.storage.yatelandisi_skill2;
				},
				onremove:true,
				content:function(){
					player.storage.yatelandisi_skill2 = [];
				}
			},
			yatelandisi_skill3:{
				mark:true,
				intro:{
					content:function(storage,player){
						if(storage.length==3)	return '更改了装备区【'+get.translation(storage[1])+'】的名称';
					},
					markcount:function(storage,player){
						return 0;
					},
				},
				equipSkill:true,
				onremove:function(player,skill){
					var args = player.storage.yatelandisi_skill3;
					var change = player.getCards('e',function(i){
						return i.cardid==args[0];
					});
					console.log(args,change);
					if(change&&change[0]){
						change[0].name = args[1];
						change[0].viewAs = args[1];
						player.popup(args[1])
					}
				},
				forced:true,
				trigger:{player:'loseBegin'},
				filter:function(event,player){
					var args = player.storage.yatelandisi_skill3;
					return args&&event.cards.filter(function(i){
						return i.cardid==args[0];
					}).length;
				},
				content:function(){
					player.removeSkill('yatelandisi_skill3');
				}
			},
		},
		translate:{
			qi: '气',
			qi_skill: '聚气',
			qi_info: '目标角色本回合使用下一张牌时可指定属性。若其已受伤，额外获得1点护甲。',
			qi_skill_info: '本回合使用下一张牌时可指定属性。',
			jingluo: '鲸落',
			jingluo_info: '出牌阶段，对所有角色使用，目标依次选择一项：弃置一张牌以获得1点护甲；或横置武将牌以摸一张牌。',
			haixiao: '海啸',
			haixiao_info: '出牌阶段，对所有其他角色使用，目标依次选择一项：打出一张颜色相同的牌，或受到你造成的1点海洋伤害。',
			langyong: '浪涌',
			langyong_info: '出牌阶段，对一名装备区里有牌的角色使用，其选择一项：弃置装备区里所有的牌，或受到你造成的1点海洋伤害。',
			chenmo: '沉没',
			chenmo_info: '出牌阶段，对一名角色使用，移除目标的至多三张牌直到回合结束，若因此移除了所有手牌，其摸一张牌。',
			chenjing: '沉静',
			chenjing_info: '出牌阶段，对一名角色使用，移除目标的至多三张牌直到回合结束，若因此移除了所有手牌，其获得1点护甲。',
			chen_card:'消失之牌',

			huiliu: '回流',
			huiliu_info: '出牌阶段，对距离2以内且有护甲的一名其他角色使用。你获取其一点护甲，若你已受伤，则额外获得一点护甲。',
			qinshi: '浸蚀',
			qinshi_info: '出牌阶段，对有护甲的一名其他角色使用，你弃置一张牌，移除其所有护甲，若你弃置了装备牌，则额外对目标造成一点暗影伤害。',
			bowen: '波纹',
			bowen_info: '出牌阶段，对有护甲的一名其他角色使用，令其弃置自身护甲数量的手牌，若不足，则额外对其造成一点海洋伤害。',

			xuanwo: '漩涡',
			xuanwo_info: '出牌阶段，对一名其他角色使用（横置于判定区内）；若判定结果不为♦，该角色与其相邻的角色各弃置一张牌；然后将此牌移至当前回合角色下家。',
			haidi: '海底宝藏',
			haidi_info: '出牌阶段，对一名角色使用（横置于判定区内）；若判定结果点数大于10，摸两张牌。否则其本回合手牌上限+2，保留此牌。',

			sanchaji: '三叉戟',
			sanchaji_bg: '叉',
			sanchaji_skill: '三叉戟',
			sanchaji_info: '你可以将你的任一张【杀】当具海洋伤害的【杀】来使用。',
			sanchaji_skill_info: '你可以将你的任一张【杀】当具海洋伤害的【杀】来使用。',
			linghunshouge: '灵魂收割者',
			linghunshouge_bg: '灵',
			linghunshouge_skill: '灵魂收割者',
			linghunshouge_info: '锁定技 你造成的伤害无视护甲。',
			linghunshouge_skill_info: '锁定技 你造成的伤害无视护甲。',
			yinghua: '樱华水刃',
			yinghua_bg: '樱',
			yinghua_skill: '樱华水刃',
			yinghua_info: '你使用【杀】指定装备区里有牌的角色为目标时，你可以将之效果改为【浪涌】。',
			yinghua_skill_info: '你使用【杀】指定装备区里有牌的角色为目标时，你可以将之效果改为【浪涌】。',
			suansuyulei: '酸素鱼雷',
			suansuyulei_bg: '酸',
			suansuyulei_skill: '酸素鱼雷',
			suansuyulei_info: '锁定技 你使用的海洋属性的牌无视护甲与防具。',
			suansuyulei_skill_info: '锁定技 你使用的海洋属性的牌无视护甲与防具。',
			shenshuizhadan: '深水炸弹',
			shenshuizhadan_bg: '炸',
			shenshuizhadan_info: '你可以将任意锦囊牌当作暗影属性的【杀】使用。',
			shenshuizhadan_skill: '炸鱼',
			shenshuizhadan_skill_info: '你可以将任意锦囊牌当作暗影属性的【杀】使用。',
			qianshuifu: '潜水服',
			qianshuifu_skill: '潜水服',
			qianshuifu_bg: '服',
			qianshuifu_info: ' 锁定技 你在一名角色攻击范围外时，受到来源为其的伤害-1；当你失去装备区里的【潜水服】时，你摸一张牌。',
			fanchuan: '帆船',
			fanchuan_bg: '帆',
			fanchuan_info: '锁定技 其他角色计算与你的距离+1。',
			yatelandisi: '亚特兰蒂斯',
			yatelandisi_info: ' 每轮每项限一次，一个回合开始时，你可以声明一张武器/防具的技能并视为对自己使用一张【沉静】，然后直到回合结束，将自己装备区内武器/防具的技能改为之。',
			yatelandisi_skill1: '亚特兰',
			yatelandisi_skill3: '失落之城',

			waiguge: '外骨骼',
			waiguge_bg: '骨',
			waiguge_skill: '外骨骼',
			waiguge_info: '锁定技 装备时获得1点护甲，防止你受到的海洋伤害。',
			waiguge_skill_info: '锁定技 装备时获得1点护甲，防止你受到的海洋伤害。',
			qiyu: '旗鱼',
			qiyu_bg: '鱼',
			qiyu_info: '锁定技 你计算与其他角色的距离-1。',
			yalishanda: '亚历山大石',
			yalishanda_info: '石',
			yalishanda_skill: '亚历山大石',
			yalishanda_skill2: '亚历山大石',
			yalishanda_info: '你可以指定你造成伤害的属性。你造成伤害后可以弃置此牌，令目标弃置两张牌。',
			yalishanda_skill_info: '你可以指定你造成伤害的属性。',
			yalishanda_skill2_info: '你造成伤害后可以弃置此牌，令目标弃置两张牌。',
		},
		list:[
			['spade',1,'qi'],
			['spade',1,'qinshi'],
			['spade',2,'sha','yami'],
			['spade',2,'huiliu'],
			['spade',3,'sanchaji'],
			['spade',3,'suansuyulei'],
			['spade',4,'sha','ocean'],
			['spade',4,'sha','yami'],
			['spade',5,'langyong'],
			['spade',5,'langyong'],
			['spade',6,'sha','ocean'],
			['spade',6,'sha','ocean'],
			['spade',7,'haixiao'],
			['spade',7,'qi'],
			['spade',8,'waiguge'],
			['spade',8,'juedou','yami'],
			['spade',9,'sha','yami'],
			['spade',9,'jiu','ocean'],
			['spade',10,'qi'],
			['spade',10,'sha','ocean'],
			['spade',11,'wuxie',null,['yingbian_kongchao']],
			['spade',11,'sha','ocean'],
			['spade',12,'wuxie',null,['yingbian_kongchao']],
			['spade',12,'huiliu'],
			['spade',13,'tiesuo'],
			['spade',13,'haixiao'],

			['heart',1,'qi'],
			['heart',1,'bowen'],
			['heart',2,'shan'],
			['heart',2,'sha'],
			['heart',3,'sha','ocean'],
			['heart',3,'lebu'],
			['heart',4,'tao','ocean'],
			['heart',4,'tao'],
			['heart',5,'tao','ocean'],
			['heart',5,'qi'],
			['heart',6,'chenjing'],
			['heart',6,'tao'],
			['heart',7,'chenmo'],
			['heart',7,'huiliu'],
			['heart',8,'sha','ocean'],
			['heart',8,'tao','ocean'],
			['heart',9,'jiu'],
			['heart',9,'lebu'],
			['heart',10,'yinghua'],
			['heart',10,'shan'],
			['heart',11,'qi'],
			['spade',11,'jiu','ocean'],
			['heart',12,'wuxie',null,['yingbian_kongchao']],
			['heart',12,'yatelandisi'],
			['heart',13,'jingluo'],
			['heart',13,'wuxie',null,['yingbian_kongchao']],

			['club',1,'chenmo'],
			['club',1,'shenshuizhadan'],
			['club',2,'sha','yami'],
			['club',2,'sha','thunder'],
			['club',3,'jiu'],
			['club',3,'sha','yami'],
			['club',4,'sha','yami'],
			['club',4,'tiesuo'],
			['club',5,'qi'],
			['club',5,'sha','yami'],
			['club',6,'langyong'],
			['club',6,'haixiao'],
			['club',7,'sha','ocean'],
			['club',7,'juedou','ocean'],
			['club',8,'sha','yami'],
			['club',8,'chenmo'],
			['club',9,'sha','yami'],
			['club',9,'jingluo'],
			['club',10,'haixiao'],
			['club',10,'bowen','yami'],
			['club',11,'tiesuo'],
			['club',11,'qianshuifu'],
			['club',12,'qiyu'],
			['club',12,'qinshi'],
			['club',13,'jingluo'],
			['club',13,'tiesuo'],

			['diamond',1,'xuanwo'],
			['diamond',2,'tao','ocean'],
			['diamond',2,'qinshi'],
			['diamond',3,'shan'],
			['diamond',3,'wuzhong','ocean'],
			['diamond',4,'sha','yami'],
			['diamond',4,'tao','ocean'],
			['diamond',5,'linghunshouge'],
			['diamond',5,'shan',null,['yingbian_kongchao']],
			['diamond',6,'sha','ocean'],
			['diamond',6,'bowen'],
			['diamond',7,'xuanwo'],
			['diamond',7,'qi'],
			['diamond',8,'qi'],
			['diamond',8,'shan',null,['yingbian_kongchao']],
			['diamond',9,'shan'],
			['diamond',9,'jiu'],
			['diamond',10,'waiguge'],
			['diamond',11,'wuxie',null,['yingbian_kongchao']],
			['diamond',11,'shan',null,['yingbian_kongchao']],
			['diamond',12,'shan'],
			['diamond',12,'wuxie'],
			['diamond',13,'haidi'],
			['diamond',13,'fanchuan'],
		],
		help:{
			'化鲸篇':('<div style="margin:10px">海洋与暗影</div><ul style="margin-top:0">'+
			'<li>当带有护甲的角色受到海洋伤害时，本次伤害+1且不引起传递；而非伤害类的海洋属性的牌，会使没有护甲的目标额外获得一点护甲。'+
			'<br><li>一名角色对手牌数多于自己的目标使用暗影属性的牌时，此牌不可被目标响应；暗影属性的牌可以在其他角色的结束阶段对其使用。</ul></ul>'),
		},
	}
});