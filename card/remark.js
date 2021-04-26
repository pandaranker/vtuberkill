'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'remark',
		connect:true,
		card:{
			rm_bagua:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				ai:{
					basic:{
						equipValue:7.5
					}
				},
				skills:['rm_bagua_skill']
			},
			rm_jueying:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
			rm_dilu:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
			rm_zhuahuang:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
			rm_chitu:{
				fullskin:true,
				type:'equip',
				subtype:'equip4',
				distance:{globalFrom:-1},
			},
			rm_dawan:{
				fullskin:true,
				type:'equip',
				subtype:'equip4',
				distance:{globalFrom:-1},
			},
			rm_zixin:{
				fullskin:true,
				type:'equip',
				subtype:'equip4',
				distance:{globalFrom:-1},
			},
			rm_zhuge:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.1;
					},
					equipValue:function(card,player){
						if(player._rm_zhuge_temp) return 1;
						player._rm_zhuge_temp=true;
						var result=function(){
							if(!game.hasPlayer(function(current){
								return get.distance(player,current)<=1&&player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
							})){
								return 1;
							}
							if(player.hasSha()&&_status.currentPhase==player){
								if(player.getEquip('rm_zhuge')&&player.countUsed('sha')||player.getCardUsable('sha')==0){
									return 10;
								}
							}
							var num=player.countCards('h','sha');
							if(num>1) return 6+num;
							return 3+num;
						}();
						delete player._rm_zhuge_temp;
						return result;
					},
					basic:{
						equipValue:5
					},
					tag:{
						valueswap:1
					}
				},
				skills:['rm_zhuge_skill']
			},
			rm_cixiong:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['rm_cixiong_skill']
			},
			rm_qinggang:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['rm_qinggang_skill']
			},
			rm_qinglong:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					equipValue:function(card,player){
						return Math.min(2.5+player.countCards('h','sha'),4);
					},
					basic:{
						equipValue:3.5
					}
				},
				skills:['rm_qinglong_skill','rm_qinglong_guozhan']
			},
			rm_zhangba:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					equipValue:function(card,player){
						var num=2.5+player.countCards('h')/3;
						return Math.min(num,4);
					},
					basic:{
						equipValue:3.5
					}
				},
				skills:['rm_zhangba_skill']
			},
			rm_guanshi:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-2},
				ai:{
					equipValue:function(card,player){
						var num=2.5+(player.countCards('h')+player.countCards('e'))/2.5;
						return Math.min(num,5);
					},
					basic:{
						equipValue:4.5,
					}
				},
				skills:['rm_guanshi_skill']
			},
			rm_fangtian:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-3},
				ai:{
					basic:{
						equipValue:2.5
					}
				},
				skills:['rm_fangtian_skill','rm_fangtian_guozhan']
			},
			rm_qilin:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-4},
				ai:{
					basic:{
						equipValue:3
					}
				},
				skills:['rm_qilin_skill']
			},
			rm_hanbing:{
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				distance:{attackFrom:-1},
				skills:['rm_hanbing_skill'],
				ai:{
					basic:{
						equipValue:2
					}
				},
			},
			rm_renwang:{
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:['rm_renwang_skill'],
				ai:{
					basic:{
						equipValue:7.5
					},
				},
			},

			rm_muniu:{
				fullskin:true,
				type:'equip',
				subtype:'equip5',
				nomod:true,
				onEquip:function(){
					player.markSkill('rm_muniu_skill6');
				},
				forceDie:true,
				onLose:function(){
					player.unmarkSkill('rm_muniu_skill6');
					delete player.getStat('skill').rm_muniu_skill;
					if((event.getParent(2)&&event.getParent(2).name!='swapEquip')&&event.parent.type!='equip'&&card&&card.cards&&card.cards.length){
						player.$throw(card.cards,1000);
						player.popup('rm_muniu');
						game.log(card,'掉落了',card.cards);
						game.cardsDiscard(card.cards);
						card.cards.length=0;
					}
				},
				clearLose:true,
				equipDelay:false,
				loseDelay:false,
				skills:['rm_muniu_skill','rm_muniu_skill4','rm_muniu_skill6','rm_muniu_skill7'],
				ai:{
					equipValue:function(card){
						if(card.card) return 7+card.card.length;
						return 7;
					},
					basic:{
						equipValue:7
					}
				}
			},
			rm_hualiu:{
				fullskin:true,
				type:'equip',
				subtype:'equip3',
				distance:{globalTo:1},
			},
			rm_zhuque:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				//cardnature:'fire',
				distance:{attackFrom:-3},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['rm_zhuque_skill']
			},
			rm_guding:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-1},
				ai:{
					basic:{
						equipValue:2
					}
				},
				skills:['rm_guding_skill']
			},
			rm_tengjia:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				//cardnature:'fire',
				ai:{
					value:function(card,player,index,method){
						if(player.isDisabled(2)) return 0.01;
						if(card==player.getEquip(2)){
							if(player.hasSkillTag('noDirectDamage')) return 10;
							if(game.hasPlayer(function(current){
								return current!=player&&get.attitude(current,player)<0&&current.hasSkillTag('fireAttack',null,null,true);
							})) return 0;
							return 6;
						}
						var value=0;
						var info=get.info(card);
						var current=player.getEquip(info.subtype);
						if(current&&card!=current){
							value=get.value(current,player);
						}
						var equipValue=info.ai.equipValue;
						if(equipValue==undefined){
							equipValue=info.ai.basic.equipValue;
						}
						if(typeof equipValue=='function'){
							if(method=='raw') return equipValue(card,player);
							if(method=='raw2') return equipValue(card,player)-value;
							return Math.max(0.1,equipValue(card,player)-value);
						}
						if(typeof equipValue!='number') equipValue=0;
						if(method=='raw') return equipValue;
						if(method=='raw2') return equipValue-value;
						return Math.max(0.1,equipValue-value);
					},
					equipValue:function(card,player){
						if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
						if(player.hasSkillTag('noDirectDamage')) return 10;
						if(get.damageEffect(player,player,player,'fire')>=0) return 10;
						var num=4-game.countPlayer(function(current){
							if(get.attitude(current,player)<0){
								if(current.hasSkillTag('fireAttack',null,null,true)) return 3;
								return 1;
							}
							return false;
						});
						if(player.hp==1) num+=3;
						if(player.hp==2) num+=1;
						return num;
					},
					basic:{
						equipValue:3
					},
				},
				skills:['rm_tengjia1','rm_tengjia2','rm_tengjia3']
			},
			rm_baiyin:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				loseDelay:false,
				onLose:function(){
					var next=game.createEvent('rm_baiyin_recover');
					event.next.remove(next);
					var evt=event.getParent();
					if(evt.getlx===false) evt=evt.getParent();
					evt.after.push(next);
					next.player=player;
					next.setContent(function(){
						if(player.isDamaged()) player.logSkill('rm_baiyin_skill');
						player.recover();
					});
				},
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				skills:['rm_baiyin_skill'],
				tag:{
					recover:1,
				},
				ai:{
					order:9.5,
					equipValue:function(card,player){
						if(player.hp==player.maxHp) return 5;
						if(player.countCards('h','rm_baiyin')) return 6;
						return 0;
					},
					basic:{
						equipValue:5
					}
				}
			},

			rm_wuxingpan:{
				type:'equip',
				subtype:'equip5',
				skills:['rm_wuxingpan_skill'],
				fullskin:true
			}
		},
		skill:{
			rm_qinglong_guozhan:{
				equipSkill:true,
				trigger:{player:'useCard'},
				forced:true,
				audio:'rm_qinglong_skill',
				filter:function(event,player){
					return get.mode()=='guozhan'&&event.card.name=='sha';
				},
				content:function(){
					if(!_status.rm_qinglong_guozhan) _status.rm_qinglong_guozhan=[];
					_status.rm_qinglong_guozhan=[];
					_status.rm_qinglong_guozhan.add(trigger);
					game.countPlayer2(function(current){
						current.addTempSkill('rm_qinglong_guozhan_mingzhi');
					});
					var next=game.createEvent('rm_qinglong_guozhan');
					event.next.remove(next);
					trigger.after.add(next);
					next.setContent(function(){
						_status.rm_qinglong_guozhan.remove(event.parent);
					});
				}
			},
			rm_qinglong_guozhan_mingzhi:{
				ai:{
					nomingzhi:true,
					skillTagFilter:function(player){
						if(_status.rm_qinglong_guozhan){
							for(var i=0;i<_status.rm_qinglong_guozhan.length;i++){
								if(_status.rm_qinglong_guozhan[i].targets.contains(player)) return true;
							}
						}
						return false;
					},
				}
			},
			rm_hanbing_skill:{
				equipSkill:true,
				trigger:{source:'damageBegin2'},
				//direct:true,
				audio:true,
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink()&&event.player.getCards('he').length>0;
				},
				//priority:1,
				check:function(event,player){
					var target=event.player;
					var eff=get.damageEffect(target,player,player,event.nature);
					if(get.attitude(player,target)>0){
						if(eff>=0) return false;
						return true;
					}
					if(eff<=0) return true;
					if(target.hp==1) return false;
					if(event.num>1||player.hasSkill('tianxianjiu')||
						player.hasSkill('luoyi2')||player.hasSkill('reluoyi2')) return false;
					if(target.countCards('he')<2) return false;
					var num=0;
					var cards=target.getCards('he');
					for(var i=0;i<cards.length;i++){
						if(get.value(cards[i])>6) num++;
					}
					if(num>=2) return true;
					return false;
				},
				logTarget:"player",
				content:function(){
					"step 0"
					trigger.cancel();
					"step 1"
					if(trigger.player.countDiscardableCards(player,'he')){
						player.line(trigger.player);
						player.discardPlayerCard('he',trigger.player,true);
					}
					"step 2"
					if(trigger.player.countDiscardableCards(player,'he')){
						player.line(trigger.player);
						player.discardPlayerCard('he',trigger.player,true);
					}
				}
			},
			rm_renwang_skill:{
				equipSkill:true,
				trigger:{target:'shaBegin'},
				forced:true,
				priority:6,
				audio:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return (event.card.name=='sha'&&get.color(event.card)=='black')
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})) return;
							if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
						}
					}
				}
			},
			rm_zhuge_skill:{
				equipSkill:true,
				audio:true,
				firstDo:true,
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						var cardx=player.getEquip('rm_zhuge');
						if(card.name=='sha'&&(!cardx||player.hasSkill('rm_zhuge_skill',null,false)||(!_status.rm_zhuge_temp&&!ui.selected.cards.contains(cardx)))){
							if(get.is.versus()||get.is.changban()){
								return num+3;
							}
							return Infinity;
						}
					},
					cardEnabled2:function(card,player){
						if(!_status.event.addCount_extra||player.hasSkill('rm_zhuge_skill',null,false)) return;
						if(card&&card==player.getEquip('rm_zhuge')){
							_status.rm_zhuge_temp=true;
							var bool=lib.filter.cardUsable(get.autoViewAs({name:'sha'},ui.selected.cards.concat([card])),player);
							delete _status.rm_zhuge_temp;
							if(!bool) return false;
						}
					},
				},
			},
			rm_cixiong_skill:{
				equipSkill:true,
				trigger:{player:'useCardToPlayered'},
				audio:true,
				logTarget:'target',
				check:function(event,player){
					if(get.attitude(player,event.target)>0) return true;
					var target=event.target;
					return target.countCards('h')==0||!target.hasSkillTag('noh');
				},
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(player.sex=='male'&&event.target.sex=='female') return true;
					if(player.sex=='female'&&event.target.sex=='male') return true;
					return false;
				},
				content:function(){
					"step 0"
					trigger.target.chooseToDiscard('弃置一张手牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
						var trigger=_status.event.getTrigger();
						return -get.attitude(trigger.target,trigger.player)-get.value(card);
					});
					"step 1"
					if(result.bool==false) player.draw();
				}
			},
			rm_qinggang_skill:{
				equipSkill:true,
				audio:true,
				trigger:{
					player:'useCardToPlayered',
				},
				filter:function(event){
					return event.card.name=='sha';
				},
				forced:true,
				logTarget:'target',
				content:function(){
					trigger.target.addTempSkill('rm_qinggang2');
					trigger.target.storage.rm_qinggang2.add(trigger.card);
				},
				ai:{
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.name=='sha') return true;
						return false;
					}
				}
			},
			rm_qinggang2:{
				firstDo:true,
				ai:{unequip2:true},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
					player:['damage','damageCancelled','damageZero'],
					source:['damage','damageCancelled','damageZero'],
					target:['shaMiss','useCardToExcluded','useCardToEnd'],
					global:['useCardEnd'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.rm_qinggang2&&event.card&&player.storage.rm_qinggang2.contains(event.card)&&(event.name!='damage'||event.notLink());
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.rm_qinggang2.remove(trigger.card);
					if(!player.storage.rm_qinggang2.length) player.removeSkill('rm_qinggang2');
				},
			},
			rm_qinglong_skill:{
				equipSkill:true,
				trigger:{player:'shaMiss'},
				direct:true,
				filter:function(event,player){
					if(get.mode()=='guozhan') return false;
					return player.canUse('sha',event.target,false)&&(player.hasSha()||_status.connectMode&&player.countCards('h'));
				},
				content:function(){
					"step 0"
					player.chooseToUse(get.prompt('rm_qinglong'),function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},trigger.target,-1).set('addCount',false).logSkill='rm_qinglong_skill';
				}
			},
			rm_zhangba_skill:{
				equipSkill:true,
				enable:['chooseToUse','chooseToRespond'],
				filterCard:true,
				selectCard:2,
				position:'h',
				viewAs:{name:'sha'},
				complexCard:true,
				filter:function(event,player){
					return player.countCards('h')>=2;
				},
				audio:true,
				prompt:'将两张手牌当杀使用或打出',
				check:function(card){
					if(card.name=='sha') return 0;
					return 5-get.value(card)
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						return player.countCards('h')>=2;
					},
				}
			},
			rm_guanshi_skill:{
				equipSkill:true,
				trigger:{player:'shaMiss'},
				direct:true,
				audio:true,
				filter:function(event,player){
					return player.countCards('he',function(card){
						return card!=player.getEquip('rm_guanshi');
					})>=2&&event.target.isAlive();
				},
				content:function(){
					"step 0"
					var next=player.chooseToDiscard(get.prompt('rm_guanshi'),2,'he',function(card){
						return _status.event.player.getEquip('rm_guanshi')!=card;
					});
					next.logSkill='rm_guanshi_skill';
					next.set('ai',function(card){
						var evt=_status.event.getTrigger();
						if(get.attitude(evt.player,evt.target)<0){
							if(evt.baseDamage+evt.extraDamage>=Math.min(2,evt.target.hp)){
								return 8-get.value(card)
							}
							return 5-get.value(card)
						}
						return -1;
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.trigger('shaHit');
						trigger._result.bool=false;
						trigger._result.result=null;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(player._rm_guanshi_temp) return;
						player._rm_guanshi_temp=true;
						var bool=(get.attitude(player,arg.target)<0&&arg.card.name=='sha'&&player.countCards('he',function(card){
							return card!=player.getEquip('rm_guanshi')&&card!=arg.card&&(!arg.card.cards||!arg.card.cards.contains(card))&&get.value(card)<5;
						})>1);
						delete player._rm_guanshi_temp;
						return bool;
					},
				},
			},
			rm_fangtian_skill:{
				equipSkill:true,
				audio:true,
				trigger:{player:'useCard1'},
				forced:true,
				firstDo:true,
				filter:function(event,player){
					if(event.card.name!='sha'||get.mode()=='guozhan') return false;
					var card=event.card;
					var range;
					var select=get.copy(get.info(card).selectTarget);
					if(select==undefined){
						if(get.info(card).filterTarget==undefined) return false;
						range=[1,1];
					}
					else if(typeof select=='number') range=[select,select];
					else if(get.itemtype(select)=='select') range=select;
					else if(typeof select=='function') range=select(card,player);
					game.checkMod(card,player,range,'selectTarget',player);
					return range[1]!=-1&&event.targets.length>range[1];
				},
				content:function(){},
				mod:{
					selectTarget:function(card,player,range){
						if(card.name!='sha') return;
						if(get.mode()=='guozhan') return;
						if(range[1]==-1) return;
						var cards=player.getCards('h');
						if(!cards.length) return;
						for(var i=0;i<cards.length;i++){
							if(cards[i].classList.contains('selected')==false)
								return;
						}
						range[1]+=2;
					}
				}
			},
			rm_fangtian_guozhan:{
				equipSkill:true,
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(get.mode()!='guozhan') return false;
					if(event.card.name!='sha') return false;
					return game.hasPlayer(function(target){
						if(event.targets.contains(target)) return false;
						if(!lib.filter.filterTarget(event.card,player,target)) return false;
						if(target.identity=='ye'||target.identity=='unknown') return true;
						for(var i=0;i<event.targets.length;i++){
							if(target.identity==event.targets[i].identity) return false;
						}
						return true;
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('rm_fangtian'),[1,Infinity],function(card,player,target){
						var cardx=_status.event.cardx;
						if(!lib.filter.filterTarget(cardx,player,target)) return false;
						var targets=_status.event.targets.slice(0).concat(ui.selected.targets);
						if(targets.contains(target)) return false;
						if(target.identity=='ye'||target.identity=='unknown') return true;
						for(var i=0;i<targets.length;i++){
							if(target.identity==targets[i].identity) return false;
						}
						return true;
					}).set('promptbar','none').set('cardx',trigger.card).set('targets',trigger.targets).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,_status.event.cardx,player,player)
					});
					'step 1'
					if(result.bool){
						player.logSkill('rm_fangtian_skill',result.targets);
						if(!player.storage.rm_fangtian_guozhan_trigger) player.storage.rm_fangtian_guozhan_trigger=[];
						player.storage.rm_fangtian_guozhan_trigger.add(trigger.card);
						trigger.targets.addArray(result.targets);
						player.addTempSkill('rm_fangtian_guozhan_trigger');
					}
				},
			},
			rm_fangtian_guozhan_trigger:{
				trigger:{player:'shaMiss'},
				silent:true,
				onremove:true,
				content:function(){
					if(player.storage[event.name].contains(trigger.card)) trigger.getParent().excluded.addArray(trigger.getParent().targets);
				},
				group:'rm_fangtian_guozhan_remove',
			},
			rm_fangtian_guozhan_remove:{
				trigger:{player:['useCardAfter','useCardCancelled']},
				silent:true,
				filter:function(event,player){
					return player.storage.rm_fangtian_guozhan_trigger&&player.storage.rm_fangtian_guozhan_trigger.contains(event.card);
				},
				content:function(){
					player.storage.rm_fangtian_guozhan_trigger.remove(trigger.card);
				}
			},
			rm_qilin_skill:{
				equipSkill:true,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.notLink()&&event.player.getCards('e',{subtype:['equip3','equip4','equip6']}).length>0
				},
				direct:true,
				audio:true,
				content:function(){
					"step 0"
					var att=(get.attitude(player,trigger.player)<=0);
					var next=player.chooseButton();
					next.set('att',att);
					next.set('createDialog',['是否发动【麒麟弓】，弃置'+get.translation(trigger.player)+'的一张坐骑牌？',trigger.player.getCards('e',{subtype:['equip3','equip4','equip6']})]);
					next.set('ai',function(button){
						if(_status.event.att) return get.buttonValue(button);
						return 0;
					});
					"step 1"
					if(result.bool){
						player.logSkill('rm_qilin_skill',trigger.player);
						trigger.player.discard(result.links[0]);
					}
				}
			},
			rm_bagua_skill:{
				equipSkill:true,
				trigger:{player:['chooseToRespondBegin','chooseToUseBegin']},
				filter:function(event,player){
					if(event.responded) return false;
					if(event.rm_bagua_skill) return false;
					if(!event.filterCard||!event.filterCard({name:'shan'},player,event)) return false;
					if(event.name=='chooseToRespond'&&!lib.filter.cardRespondable({name:'shan'},player,event)) return false;
					if(player.hasSkillTag('unequip2')) return false;
					var evt=event.getParent();
					if(evt.player&&evt.player.hasSkillTag('unequip',false,{
						name:evt.card?evt.card.name:null,
						target:player,
						card:evt.card
					})) return false;
					return true;
				},
				audio:true,
				check:function(event,player){
					if(event&&(event.ai||event.ai1)){
						var ai=event.ai||event.ai1;
						var tmp=_status.event;
						_status.event=event;
						var result=ai({name:'shan'},_status.event.player,event);
						_status.event=tmp;
						return result>0;
					}
					return true;
				},
				content:function(){
					"step 0"
					trigger.rm_bagua_skill=true;
					player.judge('rm_bagua',function(card){return (get.color(card)=='red')?1.5:-0.5});
					"step 1"
					if(result.judge>0){
						trigger.untrigger();
						trigger.set('responded',true);
						trigger.result={bool:true,card:{name:'shan',isCard:true}}
					}
				},
				ai:{
					respondShan:true,
					effect:{
						target:function(card,player,target,effect){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})) return;
							if(get.tag(card,'respondShan')) return 0.5;
						}
					}
				}
			},
			rm_muniu_skill:{
				equipSkill:true,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				check:function(card){
					if(card.name=='du') return 20;
					var player=_status.event.player;
					var nh=player.countCards('h');
					if(!player.needsToDiscard()){
						if(nh<3) return 0;
						if(nh==3) return 5-get.value(card);
						return 7-get.value(card);
					}
					return 10-get.useful(card);
				},
				discard:false,
				lose:true,
				toStorage:true,
				sync:function(rm_muniu){
					if(game.online){
						return;
					}
					if(!rm_muniu.cards){
						rm_muniu.cards=[];
					}
					for(var i=0;i<rm_muniu.cards.length;i++){
						if(!rm_muniu.cards[i].parentNode||rm_muniu.cards[i].parentNode.id!='special'){
							rm_muniu.cards.splice(i--,1);
						}
					}
					game.broadcast(function(rm_muniu,cards){
						rm_muniu.cards=cards;
					},rm_muniu,rm_muniu.cards);
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				prepare:function(cards,player){
					player.$give(1,player,false);
				},
				content:function(){
					"step 0"
					for(var i=0;i<cards.length;i++){
						if(!cards[i].destroyed){
							ui.special.appendChild(cards[i]);
						}
						else{
							cards[i].remove();
							cards.splice(i--,1);
						}
					}
					var rm_muniu=player.getEquip(5);
					if(!rm_muniu||!cards.length){
						for(var i=0;i<cards.length;i++){
							cards[i].discard();
						}
						event.finish();
						return;
					}
					if(rm_muniu.cards==undefined) rm_muniu.cards=[];
					rm_muniu.cards.push(cards[0]);
					game.broadcast(function(rm_muniu,cards){
						rm_muniu.cards=cards;
					},rm_muniu,rm_muniu.cards);
					var players=game.filterPlayer(function(current){
						if(!current.getEquip(5)&&current!=player&&!current.isTurnedOver()&&
							get.attitude(player,current)>=3&&get.attitude(current,player)>=3){
							return true;
						}
					});
					players.sort(lib.sort.seat);
					var choice=players[0];
					var next=player.chooseTarget('是否移动木牛流马？',function(card,player,target){
						return !target.isMin()&&player!=target&&target.isEmpty(5);
					});
					next.set('ai',function(target){
						return target==_status.event.choice?1:-1;
					});
					next.set('choice',choice);
					"step 1"
					if(result.bool){
						var card=player.getEquip(5);
						result.targets[0].equip(card);
						player.$give(card,result.targets[0]);
						player.line(result.targets,'green');
						game.delay();
					}
					else{
						player.updateMarks();
					}
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var rm_muniu=player.getEquip(5);
						if(!rm_muniu||!rm_muniu.cards) return false;
						for(var i=0;i<rm_muniu.cards.length;i++){
							switch(tag){
								case 'respondSha':if(rm_muniu.cards[i].name=='sha') return true;break;
								case 'respondShan':if(rm_muniu.cards[i].name=='shan') return true;break;
							}
						}
						return false;
					},
					order:1,
					expose:0.1,
					result:{
						player:1
					}
				}
			},
			rm_muniu_skill2:{
				group:['rm_muniu_skill3','rm_muniu_skill4']
			},
			rm_muniu_skill3:{
				trigger:{player:'chooseToRespondBegin'},
				cardSkill:true,
				filter:function(event,player){
					if(event.responded) return false;
					var rm_muniu=player.getEquip(5);
					if(!rm_muniu.cards) return false;
					lib.skill.rm_muniu_skill.sync(rm_muniu);
					for(var i=0;i<rm_muniu.cards.length;i++){
						if(event.filterCard(rm_muniu.cards[i],player,event)&&lib.filter.cardRespondable(rm_muniu.cards[i],player,event)) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseButton(['木牛流马',player.getEquip(5).cards]).set('filterButton',function(button){
						var evt=_status.event.getTrigger();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,_status.event.player,evt)&&lib.filter.cardRespondable(button.link,_status.event.player,evt);
						}
						return true;
					}).set('ai',function(button){
						var evt=_status.event.getTrigger();
						if(evt&&evt.ai){
							var tmp=_status.event;
							_status.event=evt;
							var result=evt.ai(button.link,_status.event.player,evt);
							_status.event=tmp;
							return result;
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.responded=true;
						trigger.result={bool:true,card:result.links[0],cards:result.links.slice(0)};
					}
				},
				ai:{
					order:4,
					useful:-1,
					value:-1
				}
			},
			rm_muniu_skill4:{
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					var rm_muniu=player.getEquip(5);
					if(!rm_muniu.cards) return false;
					lib.skill.rm_muniu_skill.sync(rm_muniu);
					for(var i=0;i<rm_muniu.cards.length;i++){
						if(event.filterCard(rm_muniu.cards[i],player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('木牛流马',player.getEquip(5).cards,'hidden');
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,player,evt);
						}
						return true;
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						if(button.link.name=='du') return 10;
						var player=_status.event.player;
						if(player.getUseValue(button.link)>0) return get.order(button.link);
						return -1;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							selectCard:-1,
							position:'h',
							viewAs:links[0],
							precontent:function(){
								delete event.result.skill;
							},
						};
					},
					prompt:function(links){
						return '选择'+get.translation(links)+'的目标';
					},
				},
				ai:{
					order:function(item,player){
						var event=_status.event;
						if(event.type!='phase') return 4;
						if(!player) return -1;
						var rm_muniu=player.getEquip('rm_muniu');
						if(!rm_muniu||!rm_muniu.cards) return -1;
						var order=0;
						for(var i=0;i<rm_muniu.cards.length;i++){
							if(player.getUseValue(rm_muniu.cards[i])>0){
								var order2=get.order(rm_muniu.cards[i]);
								if(order2>order) order=order2
							}
						}
						return order+0.1;
					},
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					},
					useful:-1,
					value:-1
				}
			},
			rm_muniu_skill6:{
				mark:true,
				intro:{
					content:function(storage,player){
						var rm_muniu=player.getEquip(5);
						if(!rm_muniu||!rm_muniu.cards||!rm_muniu.cards.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							return get.translation(rm_muniu.cards);
						}
						else{
							return '共有'+get.cnNumber(rm_muniu.cards.length)+'张牌';
						}
					},
					mark:function(dialog,storage,player){
						var rm_muniu=player.getEquip(5);
						if(!rm_muniu||!rm_muniu.cards||!rm_muniu.cards.length) return '共有〇张牌';
						if(player.isUnderControl(true)){
							dialog.addAuto(rm_muniu.cards);
						}
						else{
							return '共有'+get.cnNumber(rm_muniu.cards.length)+'张牌';
						}
					},
					markcount:function(storage,player){
						var rm_muniu=player.getEquip(5);
						if(rm_muniu&&rm_muniu.cards) return rm_muniu.cards.length;
						return 0;
					}
				}
			},
			rm_muniu_skill7:{
				hiddenCard:function(player,name){
					var rm_muniu=player.getEquip(5);
					if(!rm_muniu.cards) return false;
					lib.skill.rm_muniu_skill.sync(rm_muniu);
					for(var i=0;i<rm_muniu.cards.length;i++){
						if(rm_muniu.cards[i].name==name) return true;
					}
					return false;
				},
				trigger:{global:'cardsGotoOrderingEnd'},
				silent:true,
				firstDo:true,
				filter:function(event,player){
					var rm_muniu=player.getEquip('rm_muniu');
					if(!rm_muniu||!rm_muniu.cards) return false;
					return event.cards&&event.cards.filter(function(card){
						return rm_muniu.cards.contains(card);
					}).length>0;
				},
				content:function(){
					var rm_muniu=player.getEquip(5);
					if(rm_muniu&&rm_muniu.cards){
						rm_muniu.cards.remove(trigger.cards);
						lib.skill.rm_muniu_skill.sync(rm_muniu);
					}
					player.updateMarks();
				},
			},
			rm_guding_skill:{
				equipSkill:true,
				audio:true,
				trigger:{source:'damageBegin1'},
				filter:function(event){
					if(event.parent.name=='_lianhuan'||event.parent.name=='_lianhuan2') return false;
					if(event.card&&event.card.name=='sha'){
						if(event.player.countCards('h')==0) return true;
					}
					return false;
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						player:function(card,player,target,current,isLink){
							if(card.name=='sha'&&!isLink&&target.countCards('h')==0&&!target.hasSkillTag('filterDamage',null,{
								player:player,
								card:card,
							})) return [1,0,1,-3];
						}
					}
				}
			},
			rm_tengjia1:{
				equipSkill:true,
				trigger:{target:['useCardToBefore']},
				forced:true,
				priority:6,
				audio:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='nanman') return true;
					if(event.card.name=='wanjian') return true;
					if(event.card.name=='chuqibuyi') return true;
					return false;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:target,
								card:card
							})) return;
							if(card.name=='nanman'||card.name=='wanjian'||card.name=='chuqibuyi') return 'zerotarget';
							if(card.name=='sha'){
								var equip1=player.getEquip(1);
								if(equip1&&equip1.name=='rm_zhuque') return 1.9;
								if(!card.nature) return 'zerotarget';
							}
						}
					}
				}
			},
			rm_tengjia2:{
				equipSkill:true,
				trigger:{player:'damageBegin3'},
				filter:function(event,player){
					if(event.nature!='fire') return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				audio:true,
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					fireAttack:true,
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'){
								if(card.nature=='fire') return 2;
								if(player.hasSkill('rm_zhuque_skill')) return 1.9;
							}
							if(get.tag(card,'fireDamage')&&current<0) return 2;
						}
					}
				}
			},
			rm_tengjia3:{
				equipSkill:true,
				audio:'rm_tengjia1',
				trigger:{target:'shaBefore'},
				forced:true,
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='sha'&&!event.card.nature) return true;
					return false;
				},
				content:function(){
					trigger.cancel();
				},
			},
			rm_baiyin_skill:{
				equipSkill:true,
				trigger:{player:'damageBegin4'},
				forced:true,
				audio:true,
				filter:function(event,player){
					if(event.num<=1) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				//priority:-10,
				content:function(){
					trigger.num=1;
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
			rm_zhuque_skill:{
				equipSkill:true,
				trigger:{player:'useCard1'},
				//priority:7,
				filter:function(event,player){
					if(event.card.name=='sha'&&!event.card.nature) return true;
				},
				audio:true,
				check:function(event,player){
					var eff=0;
					for(var i=0;i<event.targets.length;i++){
						var target=event.targets[i];
						var eff1=get.damageEffect(target,player,player);
						var eff2=get.damageEffect(target,player,player,'fire');
						eff+=eff2;
						eff-=eff1;
					}
					return eff>=0;
				},
				content:function(){
					trigger.card.nature='fire';
					if(get.itemtype(trigger.card)=='card'){
						var next=game.createEvent('rm_zhuque_clear');
						next.card=trigger.card;
						event.next.remove(next);
						trigger.after.push(next);
						next.setContent(function(){
							delete card.nature;
						});
					}
				}
			},
			rm_zhuque_skill2:{
				trigger:{player:'useCardAfter'},
				forced:true,
				popup:false,
				content:function(){
					delete player.storage.rm_zhuque_skill.nature;
				}
			},
			
			rm_wuxingpan_skill:{
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				lose:false,
				prompt:'选择一张手牌永久改变其五行属性',
				content:function(){
					"step 0"
					player.chooseControl('metal','wood','water','fire','soil');
					"step 1"
					var card=cards[0];
					if(!card.node.wuxing){
						card.node.wuxing=ui.create.div('.wunature',card);
					}


					card.wunature=result.control;
					card.node.wuxing.dataset.nature=result.control;
					card.node.wuxing.innerHTML=get.translation(result.control);
				}
			}
		},
		translate:{
			rm_bagua:'八卦阵',
			rm_bagua_bg:'卦',
			rm_bagua_skill:'八卦阵',
			rm_jueying:'绝影',
			rm_dilu:'的卢',
			rm_zhuahuang:'爪黄飞电',
			rm_jueying_bg:'+马',
			rm_dilu_bg:'+马',
			rm_zhuahuang_bg:'+马',
			rm_chitu:'赤兔',
			rm_chitu_bg:'-马',
			rm_dawan:'大宛',
			rm_dawan_bg:'-马',
			rm_zixin:'紫骍',
			rm_zixin_bg:'-马',
			rm_zhuge:'诸葛连弩',
			rm_cixiong:'雌雄双股剑',
			rm_zhuge_bg:'弩',
			rm_cixiong_bg:'双',
			rm_qinggang:'青釭剑',
			rm_qinglong:'青龙偃月刀',
			rm_zhangba:'丈八蛇矛',
			rm_qinglong_bg:'偃',
			rm_zhangba_bg:'蛇',
			rm_guanshi:'贯石斧',
			rm_fangtian:'方天画戟',
			rm_qilin:'麒麟弓',
			rm_qilin_bg:'弓',
			rm_zhuge_skill:'诸葛连弩',
			rm_cixiong_skill:'雌雄双股剑',
			rm_qinggang_skill:'青釭剑',
			rm_qinglong_skill:'青龙偃月刀',
			rm_qinglong_guozhan:'青龙偃月刀',
			rm_zhangba_skill:'丈八蛇矛',
			rm_guanshi_skill:'贯石斧',
			rm_fangtian_skill:'方天画戟',
			rm_qilin_skill:'麒麟弓',
			rm_hanbing:'寒冰剑',
			rm_renwang:'仁王盾',
			rm_hanbing_bg:'冰',
			rm_renwang_bg:'盾',
			rm_hanbing_skill:'寒冰剑',
			rm_renwang_skill:'仁王盾',
			rm_hanbing_info:'当你使用杀造成伤害时，你可以防止此伤害，改为依次弃置目标角色的两张牌。',
			rm_hanbing_skill_info:'当你使用杀造成伤害时，你可以防止此伤害，改为依次弃置目标角色的两张牌。',
			rm_renwang_info:'锁定技，黑色的杀对你无效',
			rm_renwang_skill_info:'锁定技，黑色的杀对你无效',
			rm_bagua_info:'当你需要使用或打出一张【闪】时，你可以进行一次判定，若判定结果为红色，视为你使用或打出了一张【闪】。',
			rm_bagua_skill_info:'当你需要使用或打出一张【闪】时，你可以进行一次判定，若判定结果为红色，视为你使用或打出了一张【闪】。',
			rm_jueying_info:'锁定技，其他角色计算与你的距离+1。',
			rm_dilu_info:'锁定技，其他角色计算与你的距离+1。',
			rm_zhuahuang_info:'锁定技，其他角色计算与你的距离+1。',
			rm_chitu_info:'锁定技，你计算与其他角色的距离-1。',
			rm_dawan_info:'锁定技，你计算与其他角色的距离-1。',
			rm_zixin_info:'锁定技，你计算与其他角色的距离-1。',
			rm_zhuge_skill_info:'锁定技，你于出牌阶段内使用【杀】无次数限制。',
			rm_zhuge_info:'锁定技，你于出牌阶段内使用【杀】无次数限制。',
			rm_cixiong_skill_info:'当你使用【杀】指定一名异性的目标角色后，你可以令其选择一项：1.弃置一张手牌；2.令你摸一张牌。',
			rm_cixiong_info:'当你使用【杀】指定一名异性的目标角色后，你可以令其选择一项：1.弃置一张手牌；2.令你摸一张牌。',
			rm_qinggang_skill_info:'锁定技，当你使用【杀】指定一名目标角色后，你令其防具技能无效直到此【杀】被抵消或造成伤害。',
			rm_qinggang_info:'锁定技，当你使用【杀】指定一名目标角色后，你令其防具技能无效直到此【杀】被抵消或造成伤害。',
			rm_qinglong_skill_info:'当你使用的【杀】被目标角色使用的【闪】抵消时，你可以对其使用一张【杀】（无距离限制）。',
			rm_qinglong_guozhan_info:'锁定技，当你使用【杀】指定目标后，所有目标角色不能明置武将牌直到此【杀】结算完毕为止。',
			rm_qinglong_info:'当你使用的【杀】被目标角色使用的【闪】抵消时，你可以对其使用一张【杀】（无距离限制）。',
			rm_qinglong_info_guozhan:'锁定技，当你使用【杀】指定目标后，所有目标角色不能明置武将牌直到此【杀】结算完毕为止。',
			rm_zhangba_skill_info:'你可以将两张手牌当【杀】使用或打出。',
			rm_zhangba_info:'你可以将两张手牌当【杀】使用或打出。',
			rm_guanshi_skill_info:'当你使用的【杀】被目标角色使用的【闪】抵消时，你可以弃置两张牌，令此【杀】依然对其造成伤害。',
			rm_guanshi_info:'当你使用的【杀】被目标角色使用的【闪】抵消时，你可以弃置两张牌，令此【杀】依然对其造成伤害。',
			rm_fangtian_skill_info:'你使用的【杀】若是你最后的手牌，你可以额外选择至多两个目标。',
			rm_fangtian_info:'你使用的【杀】若是你最后的手牌，你可以额外选择至多两个目标。',
			rm_fangtian_info_guozhan:'你使用【杀】可以指定任意名角色为目标（不能包含势力相同的角色），若任意一名目标角色使用【闪】抵消了此【杀】，则此【杀】对剩余的目标角色无效。',
			rm_qilin_skill_info:'当你使用【杀】对目标角色造成伤害时，你可以弃置其装备区里的一张坐骑牌。',
			rm_qilin_info:'当你使用【杀】对目标角色造成伤害时，你可以弃置其装备区里的一张坐骑牌。',

			rm_hualiu:'骅骝',
			rm_zhuque:'朱雀羽扇',
			rm_hualiu_bg:'+马',
			rm_hualiu_info:'你的防御距离+1',
			rm_zhuque_bg:'扇',
			rm_zhuque_skill:'朱雀羽扇',
			rm_zhuque_info:'你可以将一张普通【杀】当具火焰伤害的【杀】使用。',
			rm_guding:'古锭刀',
			rm_guding_info:'锁定技，当你使用【杀】对目标角色造成伤害时，若其没有手牌，此伤害+1。',
			rm_guding_skill:'古锭刀',
			rm_tengjia:'藤甲',
			rm_tengjia_info:'锁定技，【南蛮入侵】、【万箭齐发】、【出其不意】和普通【杀】对你无效。当你受到火焰伤害时，该伤害+1。',
			rm_tengjia1:'藤甲',
			rm_tengjia2:'藤甲',
			rm_tengjia3:'藤甲',
			rm_baiyin:'白银狮子',
			rm_baiyin_info:'锁定技，你每次受到伤害时，最多承受1点伤害（防止多余的伤害）；当你失去装备区里的【白银狮子】时，你回复1点体力。',
			rm_baiyin_skill:'白银狮子',
			
			rm_muniu:'木牛流马',
			rm_muniu_bg:'牛',
			rm_muniu_skill:'木牛',
			rm_muniu_skill2:'流马',
			rm_muniu_skill3:'流马',
			rm_muniu_skill4:'流马',
			rm_muniu_skill6:'木牛流马',
			rm_muniu_skill6_bg:'辎',
			rm_muniu_skill4_backup:'流马',
			rm_muniu_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',
			rm_muniu_skill_info:'出牌阶段限一次，你可以将一张手牌扣置于你装备区里的【木牛流马】下，若如此做，你可以将此装备移动到一名其他角色的装备区里；你可以将此装备牌下的牌如手牌般使用或打出。',

			
			rm_wuxingpan:'五行盘',
			rm_wuxingpan_skill:'五行',
			rm_wuxingpan_skill_info:'出牌阶段限一次，你可以永久改变一张手牌的五行属性',
			rm_wuxingpan_info:'出牌阶段限一次，你可以永久改变一张手牌的五行属性',
		},
		list:[
		],
	}
});