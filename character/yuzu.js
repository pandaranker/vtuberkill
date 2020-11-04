'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		//connectBanned:['NekomiyaHinata','SisterClearie'],
		connect:true,
		character:{
			NekomiyaHinata:['female','qun',3,['yuchong', 'songzang', 'zhimao']],
			SisterClearie:['female','nijisanji',3,['zhenxin','zhuwei']],
			MinatoAqua:['female','holo',3,['kuali','youyi']],
			UsadaPekora:['female','holo',3,['pekoyu','hongshaoturou']],
		},
		characterIntro:{
			NekomiyaHinata: '“这不是猫耳，这是头发啦！”',
			SisterClearie:	'“今日也愿神加护于你……”',
			MinatoAqua:'“余裕余裕~”',
			UsadaPekora: '“哈↑哈↑哈↑哈↑”',
		},
		skill:{
			//猫宫
			yuchong:{
				group:['yuchong_unbeDis','yuchong_unRes'],
			//	group:['yuchong_dist' , 'yuchong_uneq'],
			//	subSkill: 
			//	{			
			//		dist:{			
			//			mod:{
								//距离变化
			//					attackFrom:function(from,to,distance){
			//						if(from.getEquip(1))
			//						{
			//							return distance-1; 
			//						}                
			//					},
			//					globalTo:function(from,to,distance){
			//						if(to.getEquip(1))
			//						{
			//							return distance+1;
			//						}
			//					},
								//无法弃置
				subSkill:{
					unbeDis:{
						mod:{
							canBeDiscarded:function(card,player,target,name,now){
								if(get.subtype(card)=='equip1'){
										return false;
									}
								},
							}
					},
					unRes:{
						mod:{
							cardname:function(card,player){
								if(player.getEquip(1)){
									if(get.subtype(card)=='equip1'){  
										return 'sha';
									}
								}
							},
						},
						trigger:{player:['useCard1']},
						firstDo:true,
						forced:	true,
						filter:function(event,player){
							if(!player.getEquip(1))		return false;
							return get.subtype(event.cards[0])=='equip1';
						},
						content:function(){
							for(var i=0;i<trigger.targets.length;i++){
								trigger.directHit.add(trigger.targets[0]);
							}						
						},
					}
				}
			//		},
					//无视防具
					/*uneq:{
						
						trigger:{player:'useCardToPlayered'},
						forced:true,
						priority:9,
						filter:function(event,player){
							if(!player.getEquip(1))		return false;
							return event.card.name=='sha'||get.type(event.card)=='trick';
						},
						logTarget:'target',
						content:function(){
								player.addTempSkill('unequip');
						},
					}*/
			//	}
			},										
			songzang:{
				trigger:{player:'useCardToPlayered'},
				priority:8,
				filter:function(event,player){
					return event.card.name=='sha'&&!(event.target.maxHp/2 < event.target.hp)&&player.countCards('he')>0;
				},
				logTarget:'target',
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt('songzang'),'he');
							
					'step 1'	//无法被响应	
					//trigger.getParent().directHit.add(trigger.target);
								//伤害+1
					trigger.getParent().baseDamage++;
					trigger.target.addTempSkill('songzang2');
					trigger.target.addTempSkill('songzang4');
					trigger.target.storage.songzang2.add(trigger.card);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&current<0) return 0.7;
						}
					}
				}
			},
			songzang2:{
				firstDo:true,
				ai:{unequip2:true},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage','damageCancelled','damageZero'],
					target:['shaMiss','useCardToExcluded'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.songzang2&&event.card&&player.storage.songzang2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.songzang2.remove(trigger.card);
					if(!player.storage.songzang2.length) player.removeSkill('songzang2');
				},
			},
			songzang3:{
				mod:{
					cardSavable:function(card){
						if(card.name=='tao') return false;
					},
				},
			},
			songzang4:{
				trigger:{player:'dyingBegin'},
				forced:true,
				silent:true,
				firstDo:true,
				filter:function(event,player){
					return event.getParent(2).songzang_buffed=true;
				},
				content:function(){
					player.addTempSkill('songzang3',{global:['dyingEnd','phaseEnd']});
				},
			},
			zhimao:{
				trigger:{target:'useCardToBegin'},
				forced:true,
				priority:15,
				filter:function(event,player){
					if(!event.target||event.target!=player||event.player==player) return false;
					if(player.inRange(event.player)) return false; 	//使用牌者在攻击距离外
					return (get.type(event.card)=='trick');		//牌为锦囊牌
				},
				content:function(){
					'step 0'
					var target = trigger.player;			
					if(target.getEquip(1)){
						player.chooseControlList(
							['取消之并抽一张牌',
							'获得'+get.translation(target)+'的武器牌，视为对其使用【杀】'],
							true,function(event,player){
							return _status.event.index;
						});
					}
					else{
			//			player.chooseControlList(
			//				['抽一张牌',
			//				'视为对其使用【杀】'],
			//				true,function(event,player){
			//				return _status.event.index;
			//			});
						player.draw();
						trigger.cancel();
					}
					'step 1'
					var target = trigger.player;				
			//			if(target.getEquip(1)){
							if(result.index==1){
								player.line(target);
								player.gain(target.getEquip(1),target,'give','bySelf');
								player.useCard({name:'sha',isCard:true},target).animate=false;
							}	
							else if(result.index==0){
								player.draw();
								trigger.cancel();
							}						
			//			}
			//			else{
			//				if(result.index==1){
			//					player.line(target);
			//					player.useCard({name:'sha',isCard:true},target).animate=false;
			//				}	
			//				else						player.draw();
							
			//			}
					
			//		'step2'
			//		trigger.cancel();
				}									
				
			},
			//修女
			zhenxin:{
				group:['zhenxin_from' , 'zhenxin_to'],
				subSkill:{
					//防止每回合你第一次对体力值小于你的角色造成的伤害
					from:{
						trigger:{source: 'damageBefore' },
						forced:true,
						usable:1,
						priority:12,
						filter:function(event,player){
							console.log(event);
							if(event.player==player)	return false;
							return player.hp>event.player.hp;
						},
						content:function(){
							trigger.num=0;
						},
					},
					//防止体力值大于你的角色每回合对你造成的第一次伤害
					to:{
						trigger:{player: 'damageBefore' },
						forced:true,
						usable:1,
						priority:24,
						filter:function(event,player){
							if(event.player!=player)	return false;
							if(!event.source.hp)		return false
							return player.hp<event.source.hp;
						},
						content:function(){
							trigger.num=0;
						},
					}
				}
			},
			zhuwei:{
				global:'zhuwei_put',
				group:['zhuwei_moveC'],
				subSkill:{
					put:{
						trigger:{player:'phaseEnd'},
						forced:false,
						priority:24,
						check: function(event, player) {
							var target = game.findPlayer(function(cur){
								return cur.hasSkill('zhuwei');
							});
							return target && get.attitude(player, target) > 0;
						},
						filter:function(event,player){
							if(		!game.hasPlayer(function(cur){
								return cur.hasSkill('zhuwei');
							}))									return false;
							if(player.hasSkill('zhuwei'))		return false;
							return	!game.hasPlayer(function(cur){
								return cur.countCards('h') < event.player.countCards('h')||cur.hp < event.player.hp;
							});
						},
						content:function(){
							player.draw();
							var target = game.findPlayer(function(cur) {
								return cur.hasSkill('zhuwei');
							});
							target.draw();
						},
					},
					moveC:{
						trigger:{global:'zhuwei_putAfter'},
						forced:false,
						filter:function(event,player){
							var canbeM=function(a,b){
									var es=a.getCards('e');
									var c=0;
									for(var i=0;i<es.length;i++){
										if(b.isEmpty(get.subtype(es[i]))) c++;
									}
									return c;
								}
							return canbeM(player,event.player)||canbeM(event.player,player);
						},	
						content:function(){
							'step 0'
							game.broadcastAll(function(player, object){
								var canbeM=function(a,b){
									var es=a.getCards('e');
									var c=0;
									for(var i=0;i<es.length;i++){
										if(b.isEmpty(get.subtype(es[i]))) c++;
									}
									return c;
								}
								console.log(canbeM(object,player));
								next=player.chooseTarget(function(card,player,target){
										if((canbeM(player,object)>0&&target== player)||(canbeM(object,player)>0&&target== object))
										return true;
								});
								next.set('multitarget',true);
								next.set('targetprompt',['被移走']);
								next.set('prompt',event.prompt||'你或其场上的一张装备牌');
								next.set('forced',false);
							}, player, trigger.player)
							'step 1'
							if(result.bool){
								if(result.targets[0]==trigger.player)	result.targets.push(player);
								if(result.targets[0]==player)	result.targets.push(trigger.player);
								player.line2(result.targets,'green');
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							game.delay();
							'step 3'
							if(targets.length==2){
								player.choosePlayerCard('e',true,function(button){
									var player=_status.event.player;
									var targets0=_status.event.targets0;
									var targets1=_status.event.targets1;
									if(get.attitude(player,targets0)>get.attitude(player,targets1)){
										if(get.value(button.link,targets0)<0) return 10;
										return 0;
									}
									else{
										return get.equipValue(button.link);
									}
								},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
									var targets1=_status.event.targets1;
									return targets1.isEmpty(get.subtype(button.link));
								});
							}
							else{
								event.finish();
							}
							'step 4'
							if(result.bool&&result.links.length){
								var link=result.links[0];
								event.targets[1].equip(link);
								event.targets[0].$give(link,event.targets[1]);
								game.delay();
								event.result={bool:true};
							}
						}
					}
				},			
			},
			//夸
			kuali:{
				init:function (player){
					player.storage.kuali=0;
				},
				group:['kuali_zhuDong','kuali_jieshu'],
				subSkill:{
					zhuDong:{
						enable:"phaseUse",
						usable:1,
						filter:function(event,player){
							return game.hasPlayer(function(cur){
								return (cur.countCards('h')%player.countCards('h')==0&&cur.countCards('h')>0)
								||(cur.hp%player.hp==0&&cur.hp>0);
							});
						},
						content:function(){
							'step 0'
							player.storage.kuali++;
							player.chooseControlList(
								['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
								'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
								true,function(event,player){
									return _status.event.index;
								});
							'step 1'
							if(result.index==0){
								player.chooseTarget('选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
									if(target==player) 				return false;
									return target.countCards('h')%player.countCards('h')==0;
								});						
							}
							if(result.index==1){
								var num=-1;
								game.hasPlayer(function(cur){
									if(cur.hp%player.hp==0)
									num++;
								});
								player.draw(num);
								player.loseHp();
								event.finish();
							}
							'step 2'
							if(result.bool&&result.targets.length)
							{
								var num=0;
								num=Number(result.targets.length);
								player.chooseToDiscard(num,'弃置'+num+'张牌并回复等量体力','he');
								player.recover(num);
							}
						},
					},
				
			
					jieshu:{
						trigger:{player:'phaseEnd'},
						usable:1,
						priority:40,
						filter:function(event,player){
								if(player.storage.kuali!=0){
									player.storage.kuali=0;
									return false;
								}
								return game.hasPlayer(function(cur){
									return (cur.countCards('h')%player.countCards('h')==0&&cur.countCards('h')>0)
									||(cur.hp%player.hp==0&&cur.hp>0);
								});
							},
							content:function(){
								'step 0'
								player.storage.kuali++;
								player.chooseControlList(
									['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
									'摸体力为你整数倍的角色数的牌，然后失去1点体力'],
									true,function(event,player){
										return _status.event.index;
									});
								'step 1'
								if(result.index==0){
									player.chooseTarget('选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',[1,Infinity],function(card,player,target){
										if(target==player) 				return false;
										return target.countCards('h')%player.countCards('h')==0;
									});						
								}
								if(result.index==1){
									var num=-1;
									game.hasPlayer(function(cur){
										if(cur.hp%player.hp==0)
										num++;
									});
									player.draw(num);
									player.loseHp();
									event.finish();
								}
								'step 2'
									if(result.bool&&result.targets.length)
									{
										var num=0;
										num=Number(result.targets.length);
										player.chooseToDiscard(num,'弃置'+num+'张牌并回复等量体力','he');
										player.recover(num);
									}
								},
						},
					},
			},
			youyi:{
				trigger:{
					global: 'phaseBegin'
				},
				round:1,
				priority:80,
				filter:function(event, player){	
					return event.player!=player;
				},
				content:function(){
					'step 0'
					var next=player.chooseCard(get.prompt2('youyi'));
					next.set('ai',function(card){
						if(get.type(card)=='basic') return 1;
						return get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('youyi');
						player.showCards(result.cards);
					}
					'step 2'
					var target = trigger.player;
						target.gain(result.cards,player,'giveAuto');
						target.markSkill('youyi');
						target.addTempSkill('youyishiyue','phaseAfter');
						target.addTempSkill('youyishiyue_lose','phaseEnd');
						target.addTempSkill('youyishiyue_rec','phaseAfter');
						player.storage.youyi=result.cards[0];
				},
				group:['youyi_dam'],
				subSkill:{				
					dam:{
						trigger:{global:'damageBegin'},
						filter:function(event,player){
						if(event.source==player||!event.source)	return false;
							return event.source.hasSkill('youyishiyue');
						},
						prompt:'是否收回“誓约”牌',
						content:function(){
						trigger.num=0;
						player.line(trigger.source,'thunder');
						player.gain(player.storage.youyi,this.trigger.source,'give2');
						trigger.source.removeSkill('youyishiyue');
						trigger.source.updateMarks();
						}
					},
				},
			},
			youyishiyue:{
				marktext:"誓",
				locked:true,
				intro:{
					content:function (storage,player,skill){
						var su,na,nu;
						game.hasPlayer(function(cur){
							if(cur.hasSkill('youyi')){
								su=get.suit(cur.storage.youyi);
								na=get.name(cur.storage.youyi);
								nu=cur.storage.youyi.number;
							}
						});
						return '当前的“誓约”牌为'+get.translation(su)+get.translation(nu)+get.translation(na)+'当你造成伤害时，湊阿库娅可令你将“誓约”牌交给她以防止之。该回合结束时，你可以弃置“誓约”牌令你或其回复1点体力。（若此牌离开你的区域，此状态结束）';
					},
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'誓约解除');
							storage.length=0;
						}
					},
				},
				mark:true,
				group:['youyishiyue_lose','youyishiyue_rec'],
				subSkill:{
					lose:{
						trigger:{player:['loseAfter','respondAfter']},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							var shi;
							var bo=game.hasPlayer(function(cur){
								if(cur.hasSkill('youyi')){
									shi=cur.storage.youyi;
									return true;
								}
								else{
									return false;
								}
							});
							if(event.getParent().name=="useCard"&&get.type(event.getParent().card)=='equip')	return false;
							if(!(event.getParent().cards||event.card))											return false
		//					if(get.name(event.getParent().card) =='shandian')									return false;
							console.log(shi);
							console.log(event.getParent());
							for(var i=0;i<event.getParent().cards.length;i++){
								if(event.getParent().cards[i]==shi)		return true;
							}
						},
						content:function(){
							player.removeSkill('youyishiyue');
							player.updateMarks();
						},
					},
					rec:{
						trigger:{player:'phaseEnd'},
						forced:false,
						priority:80,
						filter:function(event,player){
							return game.hasPlayer(function(cur){
								return cur.hasSkill('youyi');
							})
						},
						content:function(){
							var shi;
							var aqua;
							game.hasPlayer(function(cur){
								if(cur.hasSkill('youyi')){
									aqua = cur
									shi = cur.storage.youyi;
								}
							});
							//弃“誓约”牌回复
							game.broadcastAll(function(player, aqua, shi){
								player.chooseToDiscard('弃置誓约牌','he',function(card,player){
									return card=shi;
								});
								player.chooseTarget('让你或她回复一点体力',1,function(card,player,target){
									return target==player||target==aqua;
								});
							}, player, aqua, shi);
						},
					},
			
			
				},
			},
			//兔宝
			pekoyu:{
				trigger:{player:'useCardAfter'},
				forced:false,
				priority:111,
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					if(!(get.type(event.card) =='basic'||get.type(event.card)=='trick'))	return false;
					if(event.result.bool == false || event.result.wuxied)					return false;
					console.log(player.getLastUsed(1));
					var evt=player.getLastUsed(1);
					if(!evt||!evt.card) return true;
						var ark=[get.suit(evt.card)];
						console.log(ark);
						for(var i=2;;i++){
							var evt=player.getLastUsed(1);
							if(!evt||!evt.card){
								ark.push(get.suit(evt.card));
							}
							else break;
						}
					console.log(ark);
					for(var i=0;i<ark.length;i++){
						if(get.suit(event.card)==ark[i])							return false
					}
					return !(event.result.bool == false || event.result.wuxied);			
				},
				content: function() {
					'step 0'
					player.draw(),
					player.chooseToDiscard('然后，弃置一张牌','h').set('ai',function(card){
						var name = card.name;
						if(name=='jiu') 			return 120;
						if(get.type(card)=='trick')	return 40;
						return 100-get.value(card);													
					});
					'step 1'
					if(result.cards){
						console.log(result.cards[0]);
						if(result.cards[0].name=='jiu'||
							(player.hasMark('hongshaoturou')&&(result.cards[0].name=='shan'||result.cards[0].name=='tao')))
						player.chooseTarget('选择一名角色，令其摸一张牌').set('ai',function(target){
							var player=_status.event.player;
							return get.attitude(player,target)*(target.isDamaged()?2:1);
						});
					}
					'step 2'
					if(result.bool&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.draw(2);
					}
				}
			},
			hongshaoturou:{
				enable:"phaseUse",
				usable:1,
				content:function(){
					player.link();
					player.addMark('hongshaoturou',1,false);
					player.addTempSkill('hongshaoturou_viewAs','phaseAfter');
					player.addTempSkill('hongshaoturou_shao','phaseAfter');
					var buff = '.player_buff';
							game.broadcastAll(function(player, buff){
								player.node.hongshaoturou= ui.create.div(buff ,player.node.avatar);
							}, player, buff);
				},			
			},
			hongshaoturou_viewAs:{
				mod:{
					cardname:function(card,player){
						if(card.name=='shan'||card.name=='tao')														return 'jiu';
						if(get.subtype(card)=='equip3'||get.subtype(card)=='equip4'||get.subtype(card)=='equip6')	return 'tiesuo';
					},
				},
				trigger:{player:['useCard1','respond','loseBeign']},
				firstDo:true,
				forced:	true,
				filter:function(event,player){
					return event.card.name=='jiu'&&!event.skill&&
					event.cards.length==1&&(event.cards[0].name=='tao'||event.cards[0].name=='shan');
				},
				content:function(){
				},
			},
			hongshaoturou_shao:{
				trigger:{player:['phaseEnd']},
				forced:	true,
				onremove: function(player, skill) {
					game.broadcastAll(function(player){
						player.node.hongshaoturou.delete();
						delete player.node.hongshaoturou;
					}, player);
				},
				filter:function(event,player){
					return true;
				},
				content:function(){
					player.damage('fire');
					player.removeSkill('hongshaoturou_shao');	
				}
			}
							
			
		}, 
		translate:{
			NekomiyaHinata:'猫宫日向',
			yuchong: '一命通关',
			yuchong_info: '锁定技。你装备区内的武器牌不能被弃置。你在装备武器时，你手牌中的武器牌均视为不可被响应的杀。',
			songzang: '送葬天使',
			songzang_info: '你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可以弃一张牌令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。',
			zhimao: '只箱只猫',
			zhimao_info: '当你成为非延时性锦囊牌的目标时，若来源在你攻击范围外，你可选择一项：取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。',
			SisterClearie:'修女·克蕾雅',
			zhenxin: '真信之诚',
			zhenxin_info: '锁定技。防止每回合你第一次对体力值小于你的角色造成的伤害；防止体力值大于你的角色每回合对你造成的第一次伤害。',
			zhuwei: '助危之心',
			zhuwei_info: '其他角色的结束阶段，若其手牌或体力为全场最少，其可以与你各摸一张牌，然后你可以移动你或其装备区的一张牌。',
			MinatoAqua:'湊阿库娅',
			kuali:'夸力满满',
			kuali_info:'出牌/结束阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。每回合限一次。',
			youyi:'友谊誓约',
			youyi_info:'每轮限一次，其他角色的回合开始时，你可以展示并交给其一张“誓约”牌。本回合内，当其造成伤害时，你可令其将“誓约”牌交给你以防止之。该回合结束时，其可以弃置“誓约”牌令你或其回复1点体力。',
			youyishiyue:'友谊誓约',
			youyishiyue_info:'友谊誓约生效中',
			UsadaPekora:'兔田佩克拉',
			pekoyu:'嚣张咚鼓',
			pekoyu_info:'回合内，当你的非装备牌生效后，若此花色牌本回合未被使用过，你可以摸一张牌然后弃置一张牌。若你因此弃置了【酒】，你可以令一名角色摸两张牌。',
			hongshaoturou:'自煲自足',
			hongshaoturou_info:'出牌阶段限一次，你可以横置武将牌，令你在回合结束时受到1点火焰伤害。然后本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。',
		},
	};
});