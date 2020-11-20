'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		connectBanned:['sp_MinatoAqua', 'sp_MononobeAlice'],
		character:{
			Paryi:['male','paryi',4,['tiantang','haoren']],
	//		TakatsukiRitsu:['female','paryi',3,['shengya','liangshan','chongshi']],
			Civia:['female','holo',3,['kuangxin','danyan','qingjie']],
			SpadeEcho:['female','holo',3,['hangao','yinglve']],
			Artia:['female','holo',3,['shuangzhi','shenghua']],
			Doris:['female','holo',3,['shuangzhi','shenghua']],

			sp_MinatoAqua:['female','shen',2,['shenghuang','renzhan', 'kuase']],
			sp_MononobeAlice:['female','shen',3,['xianjing','chahui', 'duandai']]
		},
		characterIntro:{
			MinatoAqua:'“余裕余裕~”',
			UsadaPekora: '“哈↑哈↑哈↑哈↑”',
			Paryi:'kimo~',
			Civia:'“听我说，DD会带来世界和平~”',

			sp_MinatoAqua:'',
			sp_MononobeAlice:'',
		},
		skill:{
			
			//帕里
			paryi:{
				marktext:"P",
				locked:true,
				intro:{
					name:'帕里家常',
					content:function (storage,player,skill){
						return '已经历了'+storage+'次【天堂之扉】';
					},
				},
			},
			tiantang:{
				priority:987,
				global:'paryi',
				trigger:{
					global: 'phaseBegin'
				},
				priority:81,
				filter:function(event, player){
					if((!(player.storage.haoren===true))&&event.player==player)	return false;
					if(player.countCards('he')<(event.player.storage.paryi||1))	return false;
					return true;
				},
				content:function(){
					'step 0'
					var num = trigger.player.storage.paryi||1;
					player.chooseToDiscard(num,'he');
					'step 1'
					if(result.bool){
						if(!(player.storage.haoren===true)){
							player.storage.haoren++;
						}
						player.markSkill('haoren');
						var target = trigger.player;
						if(target.storage.paryi>0){
							target.storage.paryi++;
						}
						else{
							target.storage.paryi=1;
						}
						target.markSkill('paryi');
						target.syncStorage('paryi');
						event.videoId = lib.status.videoId++;
						var suitlist = [
							['heart', '', 'heart', 'heart', 'div2'],
							['diamond', '', 'diamond', 'diamond', 'div2'],
							['club', '', 'club', 'club', 'div2'],
							['spade', '', 'spade', 'spade', 'div2']
						];
						game.broadcastAll(function(id, suitlist){
							var dialog=ui.create.dialog('天堂之扉 声明');
							dialog.addText('花色');
							dialog.add([suitlist, 'vcard']);
							dialog.videoId = id;
						}, event.videoId, suitlist);
					}
					else event.finish();
					'step 2'
					var next = player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.storage.tiantang = result.links[0][2];
						game.log('帕里声明了'+get.translation(player.storage.tiantang));
						var target = trigger.player;
						var list= [['观看并弃置声明花色牌'],['摸两张牌']];;
						if(!target.countCards('he'))	list.shift();
						event.videoId = lib.status.videoId++;
						game.broadcastAll(function(id, choicelist){
							var dialog=ui.create.dialog('选择一项');
							choicelist.forEach(element=>{
								dialog.add([element,'vcard']);
							})
							dialog.videoId = id;
						}, event.videoId, list);
					}
					else event.finish();
					'step 4'
					player.chooseButton().set('dialog',event.videoId).set('prompt',get.prompt('tiantang'));
					'step 5'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						game.delay(0.5);
						player.logSkill('tiantang', trigger.player);
                        result.links.forEach(element => {
                            if(element[2]=='观看并弃置声明花色牌'){	
								if(trigger.player.countCards('h')==1&&trigger.player.countCards('e')==0&&get.suit(trigger.player.getCards('h')[0])==player.storage.tiantang){
									player.viewCards('观看其手牌',trigger.player.getCards('h'));
								}
								game.broadcastAll(function(player,trigger){
									var next=player.discardPlayerCard("弃置一张声明花色的牌", trigger.player, 'he').set('visible', true);
									next.set('filterButton',function(card){
										return get.suit(card.link)==player.storage.tiantang;
									});
									var fC=0;
									trigger.player.getCards('he').forEach(function(tB){
										if(get.suit(tB)==player.storage.tiantang)	fC++;
									})
									if(fC){
										next.set('forced',true);
									}
									trigger.player.phaseUse();
								}, player, trigger)
								trigger.player.addTempSkill('tiantangzhifei_yisheng','phaseUseEnd');
								if(player.storage.haoren===true){
									trigger.player.markSkill('tiantangzhifei_yisheng');
									trigger.player.addTempSkill('yinliu','phaseUseEnd');
								}
                            }
                            if(element[2]=='摸两张牌'){
								trigger.player.draw(2);
								trigger.player.addTempSkill('tiantangzhifei_xianzhi','phaseEnd');
								trigger.player.storage.tiantangzhifei_xianzhi=player.storage.tiantang;
								trigger.player.syncStorage('tiantangzhifei_xianzhi')
                            }
                        });
					}
					else{
						event.finish();
					}
					'step 6'
					if(player.hasSkill('tiantangzhifei_yisheng')){
						var stat=player.getStat();
						stat.card={};
						for(var i in stat.skill){
							var bool=false;
							var info=lib.skill[i];
							if(info.enable!=undefined){
								if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
								else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
							}
							if(bool) stat.skill[i]=0;
						}
					}
				},
			},
			tiantangzhifei:{
				group:['tiantangzhifei_yisheng','tiantangzhifei_xianzhi'],
				subSkill:{
					yisheng:{
						marktext:"流",
						locked:true,
						intro:{
							name:'回流',
							content:function (storage,player,skill){
								return '暂时获得技能【引流】';
							},
						},
					},
					xianzhi:{
						marktext:"断",
						locked:true,
						intro:{
							name:'断臂',
							content:function (storage,player,skill){
								return '只能使用花色为'+get.translation(storage)+'的牌';
							},
						},
						mark:true,
						mod:{
							cardEnabled:function(card,player,now){
								return get.suit(card)==player.storage.tiantangzhifei_xianzhi;
								
							},
						},
					},
				}
			},
			haoren:{
				skillAnimation:true,
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player){
					player.storage.haoren=0;
				},
				marktext:"井",
				locked:true,
				intro:{
					name:'挖井人',
					content:function (storage,player,skill){
						return '已发动了'+storage+'次【天堂之扉】';
					},
				},
				trigger:{player:'tiantangAfter'},
				filter:function(event,player){
					return player.storage.haoren>game.countPlayer();
				},
				content:function(){
					player.loseMaxHp();
					player.storage.haoren=true;
					player.awakenSkill('haoren');
					player.unmarkSkill('haoren');
				},
			},
			//ggl
			shengya:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=true;
				},
				marktext:"卒",
				locked:true,
				intro:{
					name:'puripuri……',
					content:function (storage,player,skill){
						return '失去【职业生涯】技能直到回合结束';
					},
				},
				trigger:{player:'useCardAfter'},
				priority: 998,
				forced:	true,
				filter:function(event,player){
					return player.isPhaseUsing()&&get.color(event.card)=='red';
				},
				content:function(){
					event.cards=get.cards(1);
					game.cardsGotoOrdering(event.cards);
					player.showCards(event.cards);
					game.delay(1);
					player.gain(event.cards);
					if(get.suit(event.cards[0])=='club'){
						player.loseHp();
						player.storage.shengya = false;
						player.markSkill('shengya')
					}
				},
				group:'shengya_init',
				subSkill:{
					init:{
						trigger:{player:'phaseEnd'},
						silent: true,
						forced:	true,
						priority: 998,
						content:function(){
							if(!player.storage.shengya){
								player.storage.shengya=true;
								player.unmarkSkill('shengya')
							}
						},
					},
				}


			},
			liangshan:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=true;
				},
				marktext:"高",
				locked:true,
				intro:{
					name:'高槻律的头顶',
					content:'cards',
				},
				trigger:{global:'gainEnd'},
				forced:true,
				priority:998,
				filter:function(event,player){
					return event.player!=player;
				},


			},
			//Civia
			kuangxin:{
				trigger:{global:'useCardToPlayered'},
				usable:1,
				filter:function(event,player){
					if(event.targets.length!=1)		return false;
					if(event.targets[0]==player)	return false;
					return get.tag(event.card,'damage')&&event.targets[0].countCards('h')&&player.countCards('h');
				},
				content:function(){
					'step 0'
	//				if(trigger.targets[0].countCards('h')==1){
	//					player.viewCards('观看其手牌',trigger.targets[0].getCards('h'));
	//				}
					game.broadcastAll(function(target){
						target.choosePlayerCard(target,'h',true).set('visible', true);
					}, trigger.targets[0]);
	//				game.log(player,'观看了',trigger.targets[0],'的手牌')
					'step 1'
					if(result.bool){
						event.card = result.cards[0];
						game.broadcastAll(function(player){
							player.choosePlayerCard(player,'h',true).set('visible', true);
						}, player);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						trigger.targets[0].gain(result.cards[0],player,'giveAuto');
						player.gain(event.card,trigger.targets[0],'giveAuto');
						trigger.targets[0].addTempSkill('kuangxin2','phaseEnd');
						trigger.targets[0].storage.kuangxin2.add(trigger.card);
						trigger.targets[0].storage.kuangxin2.add(player);
						trigger.targets[0].syncStorage('kuangxin2');
						player.storage.kuangxin_draw.add(trigger.card);
						player.storage.kuangxin_draw.add(trigger.targets[0]);
					}
				},
				group:['kuangxin_draw','kuangxin_back'],
				subSkill:{
					draw:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						trigger:{global:'useCardAfter'},
						forced:true,
						priority:66,
						filter:function(event,player){
							if(!(player.storage.kuangxin_draw.contains(event.targets[0])&&player.storage.kuangxin_draw.contains(event.card)))	return false
							if(!event.targets[0].storage.kuangxin2)		return false;
							return event.targets[0].storage.kuangxin2.contains(player);
						},
						content:function(){
							'step 0'
							game.broadcastAll(function(){
								player.chooseTarget('令你或其摸一张牌').set('filterTarget',function(card,player,target){
									return target==player||target==player.storage.kuangxin_draw[1];
								})
							});
							'step 1'
							if(result.bool){
								result.targets[0].draw();
							}
						},
					},
					back:{
						trigger:{global:'phaseEnd'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.kuangxin_draw)
							player.storage.kuangxin_draw=[];
						},

					}
				},
			},
			kuangxin2:{
				firstDo:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				trigger:{
	//				player:['damageCancelled','damageZero'],
	//				target:['shaMiss','useCardToExcluded'],
					player:['damage'],
				},
				charlotte:true,
				filter:function(event,player){
					return player.storage.kuangxin2&&event.card&&player.storage.kuangxin2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:14,
				content:function(){
	//				player.draw();
	//				console.log(player.storage.kuangxin2);
	//				player.storage.kuangxin2[1].draw();
	//				player.storage.kuangxin2.remove(trigger.card);
	//				if(!player.storage.kuangxin2.length) 
					player.removeSkill('kuangxin2');
				},
			},
			danyan:{
				trigger:{player:'loseEnd'},
				priority:22,
				filter:function(event,player){
					if(game.hasPlayer(function(cur){
						return	cur.getHistory('damage',function(evt){
							return evt.source==player;
						}).length>0
					}))
					{
						return false;
					}
					var canG=0;
					event.cards.forEach(function(car){
						game.hasPlayer(function(cur){
							if(player.canUse(car,cur))	canG++;
						});;
						console.log(canG);
					})
					console.log(event);
					if(!event.hs)	return false;	
					return canG&&(event.name=='cardsDiscard'||(event.name=='lose'&&event.getParent().name=='discard'));
				},
				content:function(){
					'step 0'
					event.cards = trigger.hs;
					game.broadcastAll(function(player, cards){
						var next=player.chooseCardButton(1,'选择使用的牌',cards);
						next.set('filterButton',function(button){
							return game.hasPlayer(function(cur){
								return player.canUse(button.link,cur)
							});
						});;
					}, player, event.cards);	
					'step 1'
					if(result.bool){
						game.broadcastAll(function(player, card){
							player.chooseUseTarget(card,true,'noanimate','nopopup');
						},player,result.links[0])
					}

				},
			},
			qingjie:{
				mod:{
					globalFrom:function(from,to,distance){
						if(distance>1&&!(to.getEquip(3)||to.getEquip(4)))	return 1;
					},
					globalTo:function(from,to,distance){
						var dist = distance;
						if(to.countCards('h')>from.countCards('h'))
						{
							dist+=to.countCards('h')-from.countCards('h');
						}
	//					if(to.hp>from.hp){
	//						dist+=to.hp-from.hp;
	//					}
						return dist;
					},
				},
			},
			//Echo
			hangao:{
				enable:'phaseUse',
				usable:1,
	//			selectCard:1,
	//			filterCard:function (card,player){
     //   			return get.suit(card)=='spade';
	//			},
				filter:function(event,player){
					var gao = player.getCards('he').filter(function(ca){
						return get.suit(ca)=='spade';
					});
					return gao.length;
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						player.chooseCardTarget({
							position:'he',
							filterCard:function(card){
							return get.suit(card)=='spade';
							},
							filterTarget:function(card,player,target){
								return target!=player;
							}
						});
					}, player);
					'step 1'
					if(result.bool){
						var target = result.targets[0]
						player.logSkill('hangao',target);
						target.gain(player,result.cards[0],'giveAuto');
						target.addTempSkill('hangaohouxu',{target:'phaseEnd'});
						target.storage.hangaohouxu.add(result.cards[0]);
						target.storage.hangaohouxu.add(player);
						target.syncStorage('hangaohouxu');
					}
				},
			},
			hangaohouxu:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"♠",
				locked:true,
				intro:{
					name:'函告',
	//				content:'cards',
					content:function (storage,player,skill){
						return '在回合结束时展示手牌';
					},
				},
				mark:true,
				forced:true,
				priority:42,
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					return player.storage.hangaohouxu[1].isAlive()&&!player.storage.hangaohouxu[1].isOut();
				},
				content:function(){
					player.showCards(player.getCards('h'),'函告后续');
					game.delay(0.5);
					var history=player.getHistory('useCard');
					var heaG=1,diaG=1;
					for(var i=0;i<history.length;i++){
						console.log(history[i].cards[0]);
						if(history[i].cards[0]==player.storage.hangaohouxu[0])	diaG=0;
						if(!history[i].targets) continue;
						for(var j=0;j<history[i].targets.length;j++){
							if(history[i].targets[j]==player.storage.hangaohouxu[1])	heaG=0;
						}
					}
					if(heaG){
						player.storage.hangaohouxu[1].gain(player,player.getCards('he').filter(function(ca){
							return get.suit(ca)=='heart';
						}),'giveAuto');
					}
					if(diaG&&!player.getCards('h').contains(player.storage.hangaohouxu[0])){
						player.storage.hangaohouxu[1].gain(player,player.getCards('he').filter(function(ca){
							return get.suit(ca)=='diamond';
						}),'giveAuto');
					}
					player.removeSkill('hangaohouxu');
				}
			},
			yinglve:{
				trigger:{player:'phaseJieshuBegin'},
				priority:42,
				filter:function(event,player){
					return player.countDisabled()!=5;
				},
				content:function(){
					'step 0'
					player.chooseToDisable().set('ai',function(event,player,list){
						if(list.contains('equip2')) 											return 'equip2';
						if(list.contains('equip1')&&player.countCards('h',{name:'sha'})>2)		return 'equip1';
						if(list.contains('equip5')&&player.countCards('h',{type:'trick'})>=1)	return 'equip5';
					});
					'step 1'
					player.chooseUseTarget('###视为使用一张没有距离限制的【顺手牵羊】',{name:'shunshou'},true,'nodistance');
				},
				mod:{
					selectTarget:function(card,player,range){
						if(get.name(card)=='shunshou'){
							return range[1]=player.countDisabled()||range[1];
						}
					},
					maxHandcard:function(player,num){
						return num+player.countDisabled();
					},
				},
			},
			//Artia
			shangdong:{
				marktext:"冻",
				locked:true,
				intro:{
					name:'殇冻',
					content:function (storage,player,skill){
						return '受到伤害时加'+storage;
					},
				},
				mark:true,
			},
			shuangzhi:{
				check:function(event,player){
					return  get.attitude(player,event.player)<1;;
				},
				trigger:{global:'loseAfter'},
				priority:222,
				filter:function(event,player){
					return event.player.isAlive()&&event.player!=player&&!(event.getParent().name=="useCard"||event.getParent().name=="useSkill")&&event.cards.filterInD('d').length>1;
				},
				content:function(){
					'step 0'
					var list = ['受到1点无来源伤害','受到的伤害+1直到其回合开始']
					var next = trigger.player.chooseControlList('选择其中的一项',list,true,function(){
						return _status.event.choice;
					});
					'step 1'
					if(result.index==0){
						trigger.player.damage();
					}
					else{
						trigger.player.addSkill('shangdong');
						trigger.player.addMark('shangdong',1);
					}
				},
				group:['shuangzhi_init','shuangzhi_addDam'],
				subSkill:{
					init:{
						trigger:{global:'phaseBefore'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return event.player.hasMark('shangdong');
						},
						content:function(){
							trigger.player.unmarkSkill('shangdong');
							trigger.player.removeSkill('shangdong');
						}
					},
					addDam:{
						trigger:{global:'damageBegin1'},
						forced:true,
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return event.player.hasMark('shangdong');
						},
						content:function(){
							trigger.num+=trigger.player.countMark('shangdong');
						},
					},
				},
			},
			shenghua:{
				trigger:{global:'roundStart'},
				priority:222,
				round:1,
				filter:function(event,player){
					return game.players.length-1;
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next=player.chooseTarget(2,function(card,player,target){
							return true;
						});
						next.set('targetprompt',['失去体力','回复体力']);
						next.set('prompt','指定两名角色，分别回复一点体力和失去一点体力');
						next.set('forced',false);
					}, player)
					'step 1'
					if(result.bool){
						result.targets[0].loseHp();
						result.targets[0].addTempSkill('shenghua_lose','roundStart');
						result.targets[1].recover();
						result.targets[1].addTempSkill('shenghua_gain','roundStart');
					}
				},
			},
			shenghua_lose:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"生",
				locked:true,
				intro:{
					name:'生化之握-',
					content:function (storage,player,skill){
						return '在轮次结束时回复体力';
					},
				},
				mark:true,
				forced:true,
				priority:420,
				onremove:function(player){
					if(player.maxHp-player.hp){
						game.log('希握后续效果');
					}
					game.delay(0.5);
					player.recover();
				},
				content:function(){
				}
			},
			shenghua_gain:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				marktext:"生",
				locked:true,
				intro:{
					name:'生化之握+',
					content:function (storage,player,skill){
						return '在轮次结束时失去体力';
					},
				},
				mark:true,
				forced:true,
				priority:420,
				onremove:function(player){
					game.log('希握后续效果');
					game.delay(0.5);
					player.loseHp();
				},
				content:function(){
				}
			},

			//圣皇夸
			shenghuang:{
				init:function(player){
					player.storage.shenghuang=0;
					if(get.zhu(player)==player&&game.players.length>4) player.maxHp--;
				},
				global:['shenghuang_put', 'shenghuang_rec'],
				group:['shenghuang_draw', 'shenghuang_lose', 'shenghuang_ret'],
				subSkill:{
					put:{
						trigger:{global:'phaseBegin'},
						forced:true,
						silent:true,
						popup:false,
						priority:777,
						filter:function (event,player){
							return player.hp;
						},
						content:function(){
							player.storage.shenghuang_put = player.hp;
						}
					},
					draw:{
						init:function(player){
							if(get.zhu(player)==player&&game.players.length>4)
							{player.storage.shenghuang_draw=4;}
							else
							{player.storage.shenghuang_draw=3;}
							if(player.hasSkill('shenghuang_draw'))  player.markSkill('shenghuang_draw');
						},
						marktext: '圣',
						mark: true,
						intro: {
							content:function (storage,player,skill){
								return '剩余'+storage+'张数值为2的体力卡';
							},
							name:'剩余体力卡',
						},
						forced:true,
						priority:777,
						skillAnimation:true,
						animationColor:'gray',
						trigger:{
							player:"dying",
						},
						filter:function (event,player){
							return player.storage.shenghuang_draw>0
						},
						content:function(){
							player.maxHp=2;
							player.recover(player.maxHp-player.hp);
							player.storage.shenghuang_draw--;
							player.syncStorage('shenghuang_draw');
							if(!player.storage.shenghuang_draw){
								player.unmarkSkill('shenghuang_draw');
								player.removeSkill('shenghuang_draw');
							}
						},
					},
					lose:{
						marktext: '愈',
						intro: {
							content:'当前回合已失去了黑色牌，在本回合结束时，其他角色将体力回复至回合开始时的状态。',
							name:'圣皇之愈',
						},
						trigger:{player:'loseAfter'},
						forced:true,
						priority:777,
						filter:function(event,player){
							if(!(event.getParent().cards||event.card))									return false;
		//					if(event.getParent().name=="useCard"||event.getParent().name=="useSkill")	return false;
							var cards = event.getParent().cards;
							var bc=0;
							for(var i=0;i<cards.length;i++){
								if(get.color(cards[i]) == 'black')	bc++;
							}
							return bc;
						},
						content:function(){
							player.storage.shenghuang++;
							player.markSkill('shenghuang_lose');
						},
					},
					ret:{
						forced:true,
						silent:true,
						popup:false,
						priority:888,
						trigger:{global:'phaseAfter'},
						filter:function(event,player){
							return player.storage.shenghuang;
						},
						content:function(){
							player.storage.shenghuang=0;
							player.unmarkSkill('shenghuang_lose');
						}
					},
					rec:{
						forced:true,
						priority:777,
						trigger:{global:'phaseEnd'},
						filter:function(event,player){
							if(player.hasSkill('shenghuang'))					return false;
							if(player.storage.shenghuang_put == undefined)		return false;
							if(!game.hasPlayer(function(cur){
								return cur.hasSkill('shenghuang')&&cur.storage.shenghuang>0;
							}))													return false;
							return player.storage.shenghuang_put > player.hp;
						},
						content:function(){
							var vq=player.storage.shenghuang_put-player.hp;
							if(vq>0){
								player.recover(vq);
							}
						},
					}
				},
			},
			renzhan:{
				priority:777,
				trigger:{global:'damageEnd'},
				forced:false,
				usable:1,
	//			skillAnimation:true,
	//			animationColor:'wood',
				init:function(player){
					player.storage.renzhan = [];
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0&&get.effect(event.player,{name:'sha'},player,player)>0;
				},
				filter:function(event,player){
					return event.player!=player&&event.player.hp>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.loseHp();
					var card=get.cards()[0];
					var cards=[];
					cards.push(card);
					while(get.name(card)!='sha'){
						card=get.cards()[0];
						cards.push(card);
					}
					player.storage.renzhan = cards;
					console.log(cards);
					player.showCards(player.storage.renzhan,'瞬息刃斩亮出牌堆');
					game.delay(2);
					player.chooseControlList(
						['获得这些牌',
						'获得其中的【杀】并对一名角色使用任意张【杀】'],
						true,function(event,player){
							return _status.event.index;
						});
					'step 1'
					if(result.index==0)	
					{
						cards = player.storage.renzhan;
						game.log(player,'获得了', cards);
						player.gain(cards);
						_status.event.finish();
					}
					else if(result.index==1)
					{
						var cards = [];
						player.storage.renzhan.forEach(function(card){
							if(get.name(card)!='sha')	return;
							cards.push(card);
						});
						player.storage.renzhan = cards;
						player.showCards(player.storage.renzhan,'获得其中的【杀】');
						game.delay(2);
						player.gain(cards);
					}
					'step 2'
					game.broadcastAll(function(player){
						var next=player.chooseTarget(function(card,player,target){
							return player!=target;
						});
						next.set('targetprompt',['RUA']);
						next.set('prompt','指定一名角色，对其使用任意张【杀】');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return 50-att;
						});
					}, player)
					console.log('OK');
					'step 3'
					if(result.bool){
						_status.event.target = result.targets[0];
						var target = result.targets[0];
						console.log(target);
						game.log(player,'刃斩的目标为',target);
						target.addTempSkill('renzhan2','phaseEnd');
						target.storage.renzhan2 = 0;
						console.log('OK');
						console.log(player.hasCard('sha','h'));
						player.logSkill('renzhan',target);
						player.chooseToUse('对'+get.translation(target)+'使用杀',{name:'sha'},target ,-1);
					}
					else{
						_status.event.finish();
					}
					'step 4'
					if(result.bool){
						var target = _status.event.target;
						if(!(target.storage.renzhan2||target.isDead()||target.isOut())){
						player.chooseToUse('对'+get.translation(target)+'继续使用杀',{name:'sha'},target ,-1);
					}}
					else{
						event.finish();
					}
					'step 5'
					if(result.bool){
						var target = _status.event.target;
						if(!(target.storage.renzhan2||target.isDead()||target.isOut())){
							event.goto(4);
						}
					}
					target.unmarkSkill('renzhan2');
					target.removeSkill('renzhan2');
				},
				ai:{
					　　maixie:true,
				},
			},
			renzhan2:{
				marktext:"危",
				locked:true,
				intro:{
					name:'危',
					content:'成为瞬息刃斩的目标',
				},
				mark:true,
				firstDo:true,
				silent:true,
				forced:true,
				popup:false,
				trigger:{player:'dying'},
				filter:function(event,player){
					return player.isAlive();
				},
				content:function(){
					console.log('OK');
					player.storage.renzhan2++;
				},
			},
			kuase:{
				unique:true,
				limited:true,
				skillAnimation:true,
				priority:888,
				animationStr:'夸色☆超级梦想',
				trigger:{global:'phaseAfter'},
				prompt:function(){
					var player=_status.event.player;
					return '是否发动“阿库娅色☆超级梦想” \n （本回合所有角色回复体力之和为'+player.storage.kuase_date+'点）';
				},
				filter:function(event,player){
					return player.storage.kuase_date;
				},
				content:function(){
					var dream = player.storage.kuase_date ;
		//			game.hasPlayer(function(cur){
		//				dream += (cur.hp-cur.storage.shenghuang_put);
		//				var damT = cur.getHistory('damage');
		//				var dam = 0;
		//				damT.forEach(function(da){
		//					if(da.num){
		//						dam += da.num;
		//					}
		//				});
		//				dream += dam;			
		//				console.log(dream);
		//			});
					player.draw(dream);
					player.getStat().card.sha=0;
					player.phaseUse();
					player.storage.kuase = true;
					player.awakenSkill('kuase');
				},
				group:['kuase_date','kuase_ret'],
				subSkill:{
					date:{
						init:function(player){
							player.storage.kuase_date = 0;
						},
						forced:true,
						silent:true,
						popup:false,
						priority:777,
						trigger:{global:'recoverAfter'},
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.storage.kuase_date += trigger.num;
						},
					},
					ret:{
						forced:true,
						silent:true,
						popup:false,
						priority:666,
						trigger:{global:'phaseAfter'},
						filter:function(event,player){
							return player.storage.kuase_date;
						},
						content:function(){
							player.storage.kuase_date=0;
						}
					}
				}
			},
			//SP爱丽丝
			xianjing:{
				init:function(player){
					player.storage.xianjing = [];
				},
				marktext:"仙",
				locked:true,
				intro:{
					name:'仙境奇遇',
					content:function (storage,player,skill){
						if(storage.length == 1){
							return '上一张使用的牌，花色为'+ get.translation(storage);
						}
						else if(storage.length > 1){
							return '先前使用的牌，花色为'+ get.translation(storage);
						}
						else{
							return '本回合尚未使用牌';
						}
					},
				},
				trigger:{player:'useCardAfter'},
				forced:false,
				priority:555,
				filter:function(event,player){
					if(!player.storage.xianjing.length){
						return false;
					}else if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(event.card)=='spade')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(event.card)=='diamond')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(event.card)=='club')
					||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(event.card)=='heart')
					){
						return true;
					}
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next=player.chooseTarget(function(card,player,target){
							return true;
						});
						next.set('targetprompt',['JK']);
						next.set('prompt','指定一名角色，令其摸一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						result.targets[0].draw();
					}
				},
				group:['xianjing_update', 'xianjing_back', 'xianjing_discard'],
				subSkill:{
					update:{
						trigger:{player:'useCardAfter'},
						forced:true,
						silent:true,
						priority:544,
						content:function(){
							if(!player.storage.xianjing.length){
								player.storage.xianjing.add(get.suit(trigger.card));
							}
							else if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(trigger.card)=='spade')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(trigger.card)=='diamond')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(trigger.card)=='club')
							||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(trigger.card)=='heart')
							){
								player.storage.xianjing.push(get.suit(trigger.card));
							}else{
								player.storage.xianjing.splice(0, player.storage.xianjing.length, get.suit(trigger.card));
							}
							player.markSkill('xianjing');
							if(player.storage.xianjing.length==4){
								player.storage.duandai++;
								player.markSkill('duandai');
							}
						},
					},
					back:{
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('xianjing');
							player.storage.xianjing = [];
						}
					},
					discard:{
						trigger:{global:'phaseEnd'},
						forced:false,
						priority:555,
						prompt:'你可选择一项：令一名其他角色获得“小兔子”标记，或令所有“小兔子”各摸一张牌。',
						filter:function(event,player){
							var suits = [];
							game.getGlobalHistory('cardMove',function(evt){
			//					console.log(evt);
								if(evt.name=='cardsDiscard'||(evt.name=='lose'&&evt.getParent().name=='discard')){
										for(var i=0;i<evt.cards.length;i++){
											suits.add(get.suit(evt.cards[i]));
										}
									}
								});
							if(suits.length == 4)	return true;
						},
						content:function(){
							'step 0'
							player.chooseControlList(
								['令一名其他角色获得“小兔子”标记',
								'令所有“小兔子”各摸一张牌'],
								true,function(event,player){
									return _status.event.index;
								});
							'step 1'
							if(result.index==0){
								game.broadcastAll(function(player){
									var next=player.chooseTarget(function(card,player,target){
										return target!=player&&!target.hasSkill('xiaotuzi');
									});
									next.set('targetprompt',['小兔子']);
									next.set('prompt','指定一名角色，令其成为小兔子');
									next.set('forced',false);
									next.set('ai',function(target){
										var att=get.attitude(player,target);
										return att;
									});
								}, player);
							}
							else if(result.index==1){
								game.hasPlayer(function(cur){
									if(cur.hasSkill('xiaotuzi')){
										cur.draw();
									}
								})
							}
							else{
								event.finish();
							}
							'step 2'
							if(result.bool){
								result.targets[0].addSkill('xiaotuzi');
								result.targets[0].markSkill('xiaotuzi');
							}
						}
					}
				},
			},
			chahui:{
				forced:false,
				priority:543,
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					return game.hasPlayer(function(cur){
						return cur.hasSkill('xiaotuzi')&&cur.countCards('h');
					});
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next = player.chooseTarget(function(card, player, target){
							return target!=player&&target.hasSkill('xiaotuzi');
						});
						next.set('prompt','指定一名小兔子，令其出一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						_status.event.target = result.targets[0];
						game.broadcastAll(function(target){
							var next = target.chooseCard('h',1,'是否紧跟爱丽丝之后使用一张牌');
							next.set('forced',false);
							next.set('ai',function(card){
								if(get.name(card)=='shan')	return 10;
								var player;
								game.hasPlayer(function(cur){
									if(cur.hasSkill('chahui'))	player = cur;
								});
								if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(card)=='spade')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(card)=='diamond')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(card)=='club')
								||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(card)=='heart')
								){
									return 100;
								}
							});
						}, _status.event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = result.cards[0];
						if((player.storage.xianjing[player.storage.xianjing.length-1]=='heart' && get.suit(event.card)=='spade')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='spade' && get.suit(event.card)=='diamond')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='diamond' && get.suit(event.card)=='club')
						||(player.storage.xianjing[player.storage.xianjing.length-1]=='club' && get.suit(event.card)=='heart')
						){
							player.gain(event.card);
							game.log(player, '获得了', event.card)
							player.chooseUseTarget(event.card, true);
						}
						else{
							_status.event.target.chooseUseTarget(event.card, true);
						}
					}
					else{
						event.finish();
					}
				},
			},
			xiaotuzi:{
				forced:false,
				marktext:"🐇",
				mark:true,
				locked:true,
				priority:543,
				intro:{
					name:'<font color=#ee2>小兔子标记</font>',
					content:'成为了爱丽丝的小兔子',
				},
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					if(!player.isPhaseUsing()) return false;
					return game.hasPlayer(function(cur){
						return cur.hasSkill('chahui')&&cur.countCards('h');
					});
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						var next = player.chooseTarget(function(card, player, target){
							return target!=player&&target.hasSkill('chahui');
						});
						next.set('prompt','指定爱丽丝，令其出一张牌');
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return att;
						});
					}, player);
					'step 1'
					if(result.bool){
						_status.event.target = result.targets[0];
						game.broadcastAll(function(target,trigger){
							var next = target.chooseCard('h',1,'是否紧跟小兔子之后使用一张牌');
							next.set('forced',false);
							next.set('ai',function(card){
								if(get.name(card)=='shan')	return 10;
								if((get.suit(trigger.card)=='heart' && get.suit(card)=='spade')
								||(get.suit(trigger.card)=='spade' && get.suit(card)=='diamond')
								||(get.suit(trigger.card)=='diamond' && get.suit(card)=='club')
								||(get.suit(trigger.card)=='club' && get.suit(card)=='heart')
								){
									return 100;
								}
							});
						}, _status.event.target, trigger);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card = result.cards[0];
						if((get.suit(trigger.card)=='heart' && get.suit(event.card)=='spade')
						||(get.suit(trigger.card)=='spade' && get.suit(event.card)=='diamond')
						||(get.suit(trigger.card)=='diamond' && get.suit(event.card)=='club')
						||(get.suit(trigger.card)=='club' && get.suit(event.card)=='heart')
						){
							player.gain(event.card);
							game.log(player, '获得了', event.card)
							player.chooseUseTarget(event.card, true);
						}
						else{
							_status.event.target.chooseUseTarget(event.card, true);
						}
					}
					else{
						event.finish();
					}
				},
				group:['xiaotuzi_lose'],
				subSkill:{
					lose:{
						trigger:{global:'dieBegin'},
						filter:function(event,player){
							return event.player.hasSkill('xianjing');
						},
						forced:true,
						silent:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('xiaotuzi');
							player.removeSkill('xiaotuzi');
						},
					},
				},
			},
			duandai:{
				init:function(player){
					player.storage.duandai = 0;
				},
				locked:true,
				notemp:true,
				marktext: 'Alice',
				intro: {
					content: '已完成一组Alice序列，可以在回合结束时回复体力值',
				},
				skillAnimation:true,
				priority:543,
				animationStr:'嚣张缎带',
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					if(player.hp == player.maxHp)	return false;
					return player.storage.duandai;
				},
				content:function(){
					player.recover(player.maxHp-player.hp);
					player.storage.duandai = 0;
					player.unmarkSkill('duandai');
				}
			},
			
		}, 
		translate:{
			dynamicTranslate:{
					tiantang:function(player){
					if(player.storage.haoren) return '<font color=#fcd>一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段，且在此出牌阶段内，其获得“引流”；或令其摸两张牌，只能使用声明花色的牌直到回合结束。</font>（X为你对目标发动此技能的次数且至少为1）';
					return '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）';
				},
			},
			Paryi: '帕里',
			tiantang: '天堂之扉',
			tiantang_info: '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）',
			haoren: '好人一生',
			haoren_info: '<font color=#fcd>觉醒技</font> 你发动“天堂之扉”后，若发动次数大于存活人数，你扣减1点体力上限，将“天堂之扉”的“其他”改为“一名”；且在“天堂之扉”的额外出牌阶段内，当前回合角色获得“引流”。',

			TakatsukiRitsu: '高槻律',
			shengya: '职业生涯',
			shengya_info: '锁定技。出牌阶段内，你使用的一张红色牌后，你翻开牌堆顶第一张牌并获得之。若你翻开了♣牌，你失去一点体力，并且失去此技能直到下个回合开始。',

			Civia: '希薇娅',
			kuangxin: '旷心',
			kuangxin2: '旷心',
			kuangxin_info: '每回合限一次,当其他角色成为【杀】或伤害类锦囊牌的唯一目标时，你可以令你与其各选择一张牌交换,此牌结算后,若其未受到此牌造成的伤害,你可以令你或其摸一张牌。',
			danyan: '弹言',
			danyan_info: '你的手牌因弃置而进入弃牌堆时,若本回合你没有造成过伤害,你可以使用其中的一张牌。',
			qingjie: '轻捷',
			qingjie_info: '<font color=#f66>锁定技</font> 你你计算与装备区内没有坐骑牌的角色的距离视为1；其他角色计算与你的距离时，你每比其多一张手牌，距离便+1。',
			SpadeEcho: '黑桃影',
			hangao: '函告',
			hangao_info: '出牌阶段限一次，你可以将一张♠牌交给一名其他角色，该角色于下个回合结束时展示所有手牌，然后若其本回合没有对你使用过牌，你获得其所有的♥牌；若你本轮交出的♠牌未被其使用且不在其手牌，你获得其所有的♦牌。',
			yinglve: '影掠',
			yinglve_info: '结束阶段，你可以废除一个装备栏视为使用一张无距离限制的【顺手牵羊】；你每有一个废除的装备栏，攻击距离和【顺手牵羊】可指定的目标数便+1。',
			feichu_equip1:'废除',
			feichu_equip2:'废除',
			feichu_equip3:'废除',
			feichu_equip4:'废除',
			feichu_equip5:'废除',
			Artia: '阿媂娅',
			shuangzhi: '殇冻',
			shuangzhi_info: '其他角色一次性弃置一张以上的牌后，你可以令其选择一项：受到1点无来源伤害；或受到的伤害+1直到其回合开始。',
			shenghua: '希握',
			shenghua_info: '一轮开始时，你可以令一名角色失去1点体力，另一名角色回复1点体力。本轮结束时前者回复1点体力，后者失去1点体力。',



			sp_MinatoAqua:'皇·湊阿库娅',
			shenghuang: '圣皇之愈',
			shenghuang_info: '<font color=#f66>锁定技</font> 当你进入濒死状态时，更换新的体力牌。你失去过黑色牌的回合结束时，其他角色将体力回复至回合开始时的状态。',
			renzhan: '瞬息刃斩',
			renzhan_info: '每回合限一次。其他角色受到伤害后，若其未濒死，你可以失去1点体力，亮出牌堆顶牌直到出现【杀】，然后获得这些牌；或获得其中的【杀】并对一名角色使用任意张【杀】，直到其进入濒死状态。',
			kuase: '夸色梦想',
			kuase_info: '<font color=#f5c>限定技</font> 一个回合结束时，若有角色在回合内回复体力，你可以摸X张牌然后执行一个额外的出牌阶段。（X为所有角色本回合回复的体力值之和）',
			
			sp_MononobeAlice: '皇·物述有栖',
			xianjing: '仙境奇遇',
			xianjing_info: '当你使用一张牌后，若与本回合被使用的上一张牌在Alice序列（♥️、♠️、♦️、♣️、♥️......）中连续，你可以令一名角色摸一张牌。一个回合结束时，若此回合进入弃牌堆的牌包含所有花色，你可选择一项：令一名其他角色获得“小兔子”标记，或令所有“小兔子”各摸一张牌。',
			chahui: '茶会交流',
			chahui_info: '你于出牌阶段使用牌后，可以令一名小兔子选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌视为你使用，否则结束出牌阶段。小兔子于出牌阶段使用牌后也可以对你如此做。',
			duandai: '嚣张缎带',
			duandai_info: '回合结束时，若本回合你使用牌完成过一组Alice序列，你可以回复所有体力。',
			xiaotuzi: '小兔子',
			xiaotuzi_info: '成为了爱丽丝的小兔子，于出牌阶段使用牌后，可以令一名爱丽丝选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌视为你使用',
		},
	};
});