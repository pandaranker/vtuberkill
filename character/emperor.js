'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'emperor',
		connect:true,
		character:{
			sp_KaguraMea: ['female','shen',3,['zhigao', 'tiangou']],
			sp_MinatoAqua: ['female','shen',2,['shenghuang','renzhan', 'kuase']],
			sp_MononobeAlice: ['female','shen',3,['xianjing','chahui', 'duandai']],

			sp_Ava: ['female','shen',Infinity,['shuimu','liuxuan']],
			sp_Diana: ['female','shen',2,['tangyan','tianyin']],
		},
		characterIntro:{
			sp_MinatoAqua:	 '杏社终末之时的救世主，V始二十四年，姑苏城破，事态危急，华夏之人皆念圣皇爱人亲民，不忍坐视，有义士曰字幕组，以《taking over》、《for the win》两利器夜刺霓虹上将，霓虹上将中刃即死，义士亦为左右斩之，杏军大乱，姑苏周围城郡crew往来助之，大破杏军，圣皇既此知杏高层为人，自立为皇，护一方百姓。',
		},
		skill:{
			//欧皇咩
			zhigao:{
				skillAnimation:true,
				animationColor:'thunder',
				trigger:{global:'changeHpBegin'},
				limited:true,
				unique:true,
				mark:true,
				filter:function(event,player){
					if(player.storage.zhigao) return false;
					return event.num!=0&&event.player.isDamaged()&&player==_status.currentPhase;
				},
				content:function(){
					player.awakenSkill('zhigao');
					player.storage.zhigao = true;
					trigger.cancel();
					if(trigger.num<0){
						game.broadcast(function(){
							if(lib.config.background_audio){
								game.playAudio('effect','damage2');
							}
						});
						trigger.player.$damage(player);
						player.$damagepop(-Math.abs(trigger.num),'thunder');
						trigger.player.loseMaxHp(Math.abs(trigger.num),true);
					}else if(trigger.num>0){
						game.broadcast(function(){
							if(lib.config.background_audio){
								game.playAudio('effect','recover');
							}
						});
						game.broadcastAll(function(player){
							if(lib.config.animation&&!lib.config.low_performance){
								player.$recover();
							}
						},trigger.player);
						player.$damagepop(Math.abs(trigger.num),'thunder');
						trigger.player.gainMaxHp(Math.abs(trigger.num),true);
					}
				}
			},
			tiangou:{
				init:function(player,skill){
					player.storage[skill]=[];
				},
			//	skillAnimation:true,
			//	animationColor:'thunder',
				trigger:{global:'roundStart'},
				content:function(){
					'step 0'
					var list= player.storage.tiangou_list;;
					list.removeArray(player.storage.tiangou);
					event.videoId = lib.status.videoId++;
					for(var i=0;i<list.length;i++){
						list[i] = [['','',list[i],list[i]]]
					}
					game.broadcastAll(function(id, choicelist){
						var dialog=ui.create.dialog('『天狗食日』 声明一个阶段');
						choicelist.forEach(element=>{
							dialog.add([element,'vcard']);
						})
						dialog.videoId = id;
					}, event.videoId, list);
					'step 1'
					player.chooseButton().set('dialog',event.videoId).set('prompt',get.prompt('tiangou'));
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						game.delay(0.5);
						game.log(player,'声明了',result.links[0][2]);
						player.popup(result.links[0][2],'thunder');
						player.storage.tiangou.add(result.links[0][2]);
					}else{
						event.finish();
					}
					'step 3'
					game.delay(0.5);
					player.chooseTarget(true,'『天狗食日』：选定一名角色，本轮内只有其能执行声明阶段');
					'step 4'
					if(result.bool){
						player.logSkill('tiangou',result.targets[0]);
						result.targets[0].addTempSkill('tiangou_limit','roundStart');
						result.targets[0].storage.tiangou_limit.add(player.storage.tiangou[player.storage.tiangou.length-1]);
					}
					'step 5'
					player.storage.tiangou_list=['phaseJudge','phaseDraw','phaseUse','phaseDiscard'];
					if(player.storage.tiangou.length==player.storage.tiangou_list.length){
						player.getSkills(true,false).forEach(function(skill){
							if(lib.skill[skill].init){
								lib.skill[skill].init(event.player,skill);
							}
						})
						player.awakenedSkills.forEach(function(skill){
							player.restoreSkill(skill);
						})
						player.update();
					}
				},
				group:['tiangou_list'],
				subSkill:{
					list:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=['phaseJudge','phaseDraw','phaseUse','phaseDiscard'];
						},
					},
					limit:{
						init:function(player,skill){
							if(!player.storage[skill])	player.storage[skill]=[];
						},
						firstDo:true,
						direct:true,
						trigger:{global:['phaseJudgeBefore','phaseDrawBefore','phaseUseBefore','phaseDiscardBefore']},
						filter:function(event,player){
							return event.player!=player&&player.storage.tiangou_limit.contains(event.name);
						},
						content:function(){
							player.line(trigger.player,'thunder');
							game.log(trigger.player,'的','#y'+player.storage.tiangou_limit,'被跳过了');
							trigger.cancel();
						},
						onremove:function(player){
							delete player.storage.tiangou_limit;
						},
					}
				},
			},
			//圣皇夸
			shenghuang:{
				locked:true,
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
							if(get.zhu(player)==player&&game.players.length>4){
								player.storage.shenghuang_draw=4;
							}
							else{
								player.storage.shenghuang_draw=3;
							}
							if(player.hasSkill('shenghuang_draw'))  player.markSkill('shenghuang_draw');
						},
						marktext: '圣',
						mark: true,
						intro: {
							content:'剩余&张数值为2的体力卡',
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
				init:function(player){
					player.storage.renzhan = [];
				},
				check:function(event,player){
					if(player.storage.shenghuang_draw==0&&player.hp==1)		return false;
					return player.getUseValue({name:'sha'})>0;
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
					player.showCards(player.storage.renzhan,'瞬息刃斩亮出牌堆');
					game.delay(2);
					player.chooseControlList(
						['获得这些牌',
						'获得其中的【杀】并对一名角色使用任意张【杀】'],
						true,function(event,player){
							return _status.event.index;
						}).set('ai',function(){
							var player = _status.event.player;
							if(player.countCards('h',{name:'sha'})>=1&&player.storage.renzhan.length<=3)	return 1;
							return 0;
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
						var next=player.chooseTarget('###『刃斩』###指定一名角色，对其使用任意张【杀】',function(card,player,target){
							return player!=target;
						});
						next.set('targetprompt',['RUA']);
						next.set('forced',false);
						next.set('ai',function(target){
							var att=get.attitude(player,target);
							return 50-att;
						});
					}, player)
					'step 3'
					if(result.bool){
						event.target = result.targets[0];
						var target = result.targets[0];
						console.log(target);
						game.log(player,'刃斩的目标为',target);
						target.addTempSkill('renzhan2','phaseEnd');
						target.storage.renzhan2 = true;
						player.logSkill('renzhan',target);
						player.chooseToUse('对'+get.translation(target)+'使用杀',{name:'sha'},target ,-1);
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool){
						var target = event.target;
						if(target.storage.renzhan2&&player.canUse({name:'sha'},target,false)){
						player.chooseToUse('对'+get.translation(target)+'继续使用杀',{name:'sha'},target ,-1);
					}}
					else{
						event.finish();
					}
					'step 5'
					if(result.bool){
						var target = event.target;
						if(target.storage.renzhan2&&player.canUse({name:'sha'},target,false)){
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
				onremove:function(player){
					delete player.storage.renzhan2;
				},
				content:function(){
					player.unmarkSkill('renzhan2');
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
								if(evt.name!='lose'&&evt.name!='cardsDiscard') return false;
								if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
								for(var i=0;i<evt.cards.length;i++){
											suits.add(get.suit(evt.cards[i]));
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
				ai:{
					combo:'xianjing',
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
				},
				ai:{
					combo:'xianjing',
				},
			},

			//SP向晚
			shuimu:{
				trigger:{player:'damageBegin'},
				filter:function(event,player){
					return player.storage.liuxuan&&player.maxHp==Infinity;
				},
				locked:true,
				forced:true,
				priority:6,
				content:function(){
					var num = 0;
					switch(player.storage.liuxuan){
						case 'liuxuan_lakua': num = 4;break;
						case 'liuxuan_huoli': num = 3;break;
						case 'liuxuan_haixiu': num = 4;break;
						case 'liuxuan_jiangzui': num = 5;break;
						case 'liuxuan_keai': num = 7;break;
					}
					player.maxHp = num;
					player.hp = num;
					player.update();
				},
			},
			liuxuan:{
				init:function(player,skill){
					player.storage[skill] = 'liuxuan_lakua';
					player.addSkill('liuxuan_lakua');
					if(lib.skill[skill].process)	lib.skill[skill].process(skill,player.storage[skill],player);
					game.playAudio('skill','liuxuan_lakua1');
				},
				mark:true,
				marktext:'😅',
				intro:{
					name:function(storage,player){
						var skill = player.storage.liuxuan;
						return '<div class="text center browntext">'+lib.translate[skill]+'小向晚</div>';
					},
					content:function(content,player){
						var list = ['liuxuan_lakua','liuxuan_huoli','liuxuan_haixiu','liuxuan_jiangzui','liuxuan_keai'];
						var str='';
						for(var i=0;i<list.length;i++){
							if(player.hasSkill(list[i]))	str+='<span class="legendtext">';
							str+=lib.translate[list[i]];
							str+='：';
							str+=lib.translate[list[i]+'_describe'];
							if(player.hasSkill(list[i]))	str+='</span>';
							str+='<br>';
						}
						return str;
					}
				},
				trigger:{player:['useCardBegin','respondBegin']},
				filter:function(event,player){
					var number = get.number(event.card);
					var list = [];
					if(number){
						if(number%3==0)	list.add('liuxuan_huoli');
						if(number%4==0)	list.add('liuxuan_haixiu');
						if(number%5==0)	list.add('liuxuan_jiangzui');
						if(number%7==0)	list.add('liuxuan_keai');
					}
					if(list.length==0)	list.add('liuxuan_lakua');
					list.remove(player.storage.liuxuan);
					return list.length;
				},
				process:function(skill,name,player){
					if(lib.translate[name]){
						player.node.name.innerHTML = get.verticalStr(lib.translate[name]+'小向晚');
						lib.translate[skill+'_append']='<span class="bluetext">'+lib.translate[name]+'：'+lib.translate[name+'_describe']+'</span>';
						player.update();
					}
				},
				locked:true,
				forced:true,
				priority:6,
				content:function(){
					'step 0'
					var number = get.number(trigger.card);
					var list = [];
					if(number){
						if(number%3==0)	list.add('liuxuan_huoli');
						if(number%4==0)	list.add('liuxuan_haixiu');
						if(number%5==0)	list.add('liuxuan_jiangzui');
						if(number%7==0)	list.add('liuxuan_keai');
					}
					if(list.length==0)	list.add('liuxuan_lakua');
					event.list = list;
					'step 1'
					if(event.list.length==0){
						event.finish()
					}else if(event.list.length==1){
						event.link = event.list.pop();
						var from = player.storage.liuxuan;
						player.removeSkill([from]);
						event.goto(3);
					}else if(event.list.length>1){
						var list = event.list.slice(0);
						player.chooseButton(true,['选择一个姿态进入',[list,'vcard'],'hidden']).set('filterButton',function(button){
							var player = _status.event.player;
							if(button.link[2]==player.storage.liuxuan)	return false;
							return true;
						}).set('prompt','选择一个姿态进入');
					}
					'step 2'
					if(result.bool&&result.links[0]){
						var from = player.storage.liuxuan;
						player.removeSkill([from]);
						var link = result.links[0][2];
						event.link = link;
						event.list.remove(link);
					}
					'step 3'
					if(event.link&&event.link!=player.storage.liuxuan){
						player.storage.liuxuan = event.link;
						player.popup(player.storage.liuxuan);
						if(event.link=='liuxuan_jiangzui'&&game.hasPlayer(function(cur){
							if(player==cur) return false;
							return cur.countGainableCards(player,'he')>0;
						})){
						player.chooseTarget(true,'『犟嘴』：'+lib.translate[event.link+'_describe'],function(card,player,target){
							if(player==target) return false;
							return target.countGainableCards(player,'he')>0;
						}).set('ai',function(target){
							var player = _status.event.player;
							return -get.attitude(player,target)+Math.random();
						})}else{
							event.goto(9);
						}
					}
					'step 4'
					if(event.link=='liuxuan_jiangzui'&&result&&result.targets&&result.targets.length){
						event.target = result.targets[0];
						player.logSkill(event.link,event.target);
						event.target.chooseCard('he','无限溜旋-犟嘴：将一张牌交给'+get.translation(player),1,true).ai=function(card){
							return -get.value(card);
						};
					}else{
						event.goto(9);
					}
					'step 5'
					if(event.link=='liuxuan_jiangzui'&&result.cards&&result.cards.length){
						event.target.$giveAuto(result.cards,player);
						player.gain(result.cards,event.target);
					}
					'step 6'
					if(event.link=='liuxuan_jiangzui'){
						event.cards = player.getCards('h').removeArray(trigger.cards);
						event.videoId=lib.status.videoId++;
						var dialogx=['『犟嘴』：选择一张牌，令其点数增加或减少1'];
						dialogx.push(event.cards);
						if(player.isOnline2()){
							player.send(function(dialogx,id){
								ui.create.dialog.apply(null,dialogx).videoId=id;
							},dialogx,event.videoId);
						}
						event.dialog=ui.create.dialog.apply(null,dialogx);
						event.dialog.videoId=event.videoId;
						if(player!=game.me||_status.auto){
							event.dialog.style.display='none';
						}
						var next = player.chooseButton();
						next.set('dialog',event.videoId);
						next.set('ai',function(button){
							if(get.number(button.link)==7)	return get.value(button.link)*2+Math.random();
							return get.value(button.link);
						});
						next.set('forceAuto',function(){
							return ui.selected.buttons.length==1||ui.dialog.buttons.length==1;
						});
					}else{
						event.goto(9);
					}
					'step 7'
					if(event.link=='liuxuan_jiangzui'&&result.links&&result.links.length){
						event.links = result.links;
						var func=function(cards,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var j=0;j<cards.length;j++){
									for(var i=0;i<dialog.buttons.length;i++){
										if(dialog.buttons[i].link==cards[j]){
											dialog.buttons[i].classList.add('glow');
										}
										else{
											dialog.buttons[i].classList.add('unselectable');
										}
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.links,event.videoId);
						}
						else if(player==game.me&&!_status.auto){
							func(event.links,event.videoId);
						}
						var list = ['+1','-1','取消选择'];
						if(event.links[0].hasGaintag('liuxuan_lose2'))	list.remove('-1');
						if(event.links[0].hasGaintag('liuxuan_plus2'))	list.remove('+1');
						player.chooseControl(list,true).set('ai',function(){
							var card = _status.event.card;
							var controls=_status.event.controls;
							if([5,10,12].contains(get.number(card)+1)&&controls.contains('+1'))	return '+1';
							if([5,10,12].contains(get.number(card)-1)&&controls.contains('-1'))	return '-1';
							return controls.randomGet();
						}).set('card',event.links[0]);
					}else{
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						event.finish();					
					}
					'step 8'
					if(event.link=='liuxuan_jiangzui'&&result.control){
						switch(result.control){
							case '取消选择':event.goto(5);break;
							case '+1':{
								if(event.links[0].hasGaintag('liuxuan_lose')){
									event.links[0].removeGaintag('liuxuan_lose');
								}
								else if(event.links[0].hasGaintag('liuxuan_lose2')){
									event.links[0].removeGaintag('liuxuan_lose2');
									player.addGaintag(event.links,'liuxuan_lose');
								}
								else if(event.links[0].hasGaintag('liuxuan_plus')){
									event.links[0].removeGaintag('liuxuan_plus');
									player.addGaintag(event.links,'liuxuan_plus2');
								}
								else{
									player.addGaintag(event.links,'liuxuan_plus');
								}
								break;
							}
							case '-1':{
								if(event.links[0].hasGaintag('liuxuan_plus')){
									event.links[0].removeGaintag('liuxuan_plus');
								}
								else if(event.links[0].hasGaintag('liuxuan_plus2')){
									event.links[0].removeGaintag('liuxuan_plus2');
									player.addGaintag(event.links,'liuxuan_plus');
								}
								else if(event.links[0].hasGaintag('liuxuan_lose')){
									event.links[0].removeGaintag('liuxuan_lose');
									player.addGaintag(event.links,'liuxuan_lose2');
								}
								else{
									player.addGaintag(event.links,'liuxuan_lose');
								}
								break;
							}
						}
					}
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					'step 9'
					if(event.link){
						player.storage.liuxuan = event.link;
						player.popup(player.storage.liuxuan);
						game.log(player,'进入了','#g'+get.translation(event.link),'姿态');
						if(['liuxuan_lakua','liuxuan_keai','liuxuan_haixiu'].contains(event.link))	player.logSkill(event.link);
						player.addSkill(event.link);
						player.markSkill('liuxuan');
						game.delay();
						if(lib.skill.liuxuan.process)	lib.skill.liuxuan.process('liuxuan',event.link,player);
					}
					event.goto(1);
				},
				mod:{
					number:function(card,player,number){
						if(card.hasGaintag&&card.hasGaintag('liuxuan_plus2'))	return number+2;
						if(card.hasGaintag&&card.hasGaintag('liuxuan_lose2'))	return number-2;
						if(card.hasGaintag&&card.hasGaintag('liuxuan_plus'))	return number+1;
						if(card.hasGaintag&&card.hasGaintag('liuxuan_lose'))	return number-1;
					},
					aiOrder:function(player,card,num){
						if(typeof card=='object'){
							var key = get.number(card);
							if([7,14].contains(key)){
								if(player.hp==Infinity)		return num-20;
								else if(player.hp<=3&&player.storage.liuxuan!='liuxuan_keai')	return num+10;	
							}
							if([5,10].contains(key)){
								if(player.storage.liuxuan!='liuxuan_jiangzui')	return num+10;	
							}
							if([4,8,12].contains(key)){
								if(get.tag(card,'damage'))	return num+5;	
							}
						}
					},
				},
				subSkill:{
					lakua:{
						audio:3,
						onremove:true,
						mod:{
							globalTo:function(from,to,distance){
								if(to!=from){
									return distance-1;
								}
							}
						},
					},
					huoli:{
						onremove:function(player){
							player.popup(player.storage.liuxuan);
							player.draw();
							game.delay();
						},
						ai:{
							directHit_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(tag=='directHit_ai'){
									if(arg&&get.type(arg.card)=='trick') return true;
									return false;
								}
							}
						}
					},
					haixiu:{
						audio:3,
						onremove:true,
						trigger:{source:'damageBegin2',player:'damageBegin4'},
						priority:6,
						forced:true,
						popup:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							trigger.num ++;
						},
						mod:{
							canBeGained:function(card,source,player){
								if(get.position(card)=='hej') return false;
							},
							canBeDiscarded:function (card,source,player){
								if(get.position(card)=='hej') return false;
							},
							cardDiscardable:function(card,player,name){
								if(get.position(card)=='hej') return false;
							}
						},
					},
					jiangzui:{
						audio:3,
						onremove:true,
					},
					keai:{
						audio:5,
						onremove:function(player){
							if(player.hp==Infinity){
								player.die();
							}
							else{ 
								player.hp = Math.ceil(player.hp/2);
								player.update();
							}
						},
						init:function(player,skill){
							player.draw(3);
						},
						trigger:{source:'damageBegin2'},
						priority:6,
						forced:true,
						popup:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							trigger.num *= 2;
						},
					},
				}
			},
			//SP嘉然
			tangyan:{
				audio:10,
				init:function(player,skill){
					player.storage.tangyan = [];
				},
				trigger:{player:['useCardAfter','respondAfter','loseAfter']},
				filter:function(event,player){
					if(!player.isDamaged())		return false;
					if(event.name=='lose'){
						if(event.getParent().name!='discard')	return false;
						for(var i=0;i<event.cards.length;i++){
							var card = event.cards[i];
							if(get.position(card)=='d'&&get.type(card)=='basic')	return true;
						}
					}else{
						return event.card&&get.type(event.card)=='basic';
					}
				},
				direct:true,
				content:function(){
					'step 0'
					event.source = _status.currentPhase;
					if(event.source!=player&&event.source.countCards('h')){
						var wanxiang = event.source.getCards('h');
						for(var i=0;i<wanxiang.length;i++){
							if(wanxiang[i].hasGaintag('xinjia'))	event.xinjia = true;
						}
					}
					event.filterCards = [];
					event.cards = (trigger.name=='lose')?(trigger.cards.filter(function(lose){
						return get.type(lose)=='basic';
					})):[trigger.card];
					'step 1'
					var card = event.cards.shift();
					var list = [];
					for(var i of lib.inpile){
						var type=get.type(i);
						// if(i==get.name(card))		continue;
						if(type!='basic')			continue;
						if(player.storage.tangyan.contains(i))		continue;
						if(lib.filter.filterCard({name:i},player,trigger)&&player.hasUseTarget({name:i,isCard:false})){ 
							list.push([type,'',i]);
							var natures = get.info({name:i}).nature;
							if(natures&&natures.length){
								for(var j=0;j<natures.length;j++){
									if(natures[j]=='kami')	continue;
									list.push([type,'',i,natures[j]]);
								}
							}
						}
					}
					event.filterCards = list;
					if(event.xinjia){ 
						if(!event.allBy)	event.allBy = 1;
						event.goto(3);
					}
					'step 2'
					event.list = ['令一名角色摸一张牌','防止你下一次受到的伤害'];
					if(event.filterCards.length) event.list.push('视为使用一张本回合未以此法使用过的基本牌');
					var list = event.list;
					var choice = [0,1].randomGet();
					if(player.storage.tangyan_on)	choice = 1;
					if(list.length>=3)	choice = 2;
					player.chooseControlList(list,function(){
						return _status.event.choice;
					}).set('prompt',get.prompt2('tangyan')).set('choice',choice);
					'step 3'
					if(result.control!='cancel2'||(event.xinjia&&event.allBy&&event.allBy<=3)){
						var str = '';
						if(event.allBy)	str+='（依次执行每一项）';
						switch((result.index+1)||event.allBy){
							case 1:{
								player.logSkill('tangyan');
								player.chooseTarget(true,'『穿心糖言』：令一名角色摸一张牌'+str).set('ai',function(target){
								var player = _status.event.player;
								return get.attitude(player,target);
							})};break;
							case 2:{
								if(player.storage.tangyan_on!==true){
									player.logSkill('tangyan');
									game.log(player,'防止了自己下一次受到的伤害'+str);
									player.storage.tangyan_on = true;
								}
							};break;
							case 3:{
								player.logSkill('tangyan');
								var list = event.filterCards;
								if(list.length)
								player.chooseButton(true,['『穿心糖言』：选择一张本回合未以此法使用过的基本牌并使用之'+str,[list,'vcard'],'hidden']).set('ai',function(button){
									return get.order({name:button.link[2],nature:button.link[3]});
								})
								event.goto(5);
							};break;
						}
					}else{
						event.finish();
					}
					'step 4'
					if(result.targets&&result.targets.length){
						result.targets[0].draw();
					}
					if(event.xinjia&&event.allBy<=2){ 
						event.allBy++;
						if(event.filterCards.length>0||event.allBy<=2) event.goto(3);
					}
					'step 5'
					if(result.links&&result.links.length){
						var card = result.links[0];
						player.storage.tangyan.add(card[2]);
						player.chooseUseTarget({name:card[2],nature:card[3]},true,'noTargetDelay','nodelayx');
					}
					// if(event.xinjia&&event.allBy<=2){ 
					// 	event.allBy++;
					// 	event.goto(3);
					// }
					'step 6'
					if(event.cards.length){
						event.goto(1);
					}
				},
				group:['tangyan_on','tangyan_clear'],
				subSkill:{
					on:{
						init:function(player,skill){
							player.storage.tangyan_on = false;
							player.markSkill('tangyan_on');
						},
						marktext:'糖',
						intro:{
							mark:function(dialog,content,player){
								if(player.storage.tangyan_on)	return '穿心糖言：防止'+get.translation(player)+'下一次受到的伤害';
							},
							content:function(content,player){
								if(player.storage.tangyan_on)	return '穿心糖言：防止'+get.translation(player)+'下一次受到的伤害';
							}
						},
						trigger:{player:'damageBegin3'},
						priority:29,
						locked:true,
						forced:true,
						filter:function(event,player){
							return player.storage.tangyan_on;
						},
						content:function(){
							player.storage.tangyan_on = false;
							trigger.cancel();
						}
					},
					clear:{
						trigger:{global:'phaseAfter'},
						priority:29,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.tangyan&&player.storage.tangyan.length){
								player.storage.tangyan.length = 0;
							}
						}
					}
				}
			},
			tianyin:{
				audio:5,
				enable:'phaseUse',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = true;
				},
				filter:function(event,player,cards){
					return player.countCards('h')
				},
				filterCard:true,
				discard:false,
				lose:false,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					player.damage('nosource');
					targets[0].gain(cards[0],player,'gainAuto').gaintag.add('xinjia');
				},
			},
		},
		dynamicTranslate:{
			liuxuan:function(player){
				var str = '<font color=#f66>锁定技</font> 游戏开始时，你处于“拉胯”姿态（对应“4”）。你使用或打出一张点数为3/4/5/7倍数的牌时，进入“活力”/“害羞”/“犟嘴”/“可爱”姿态（若同时满足则选择先进入其中一个然后切换至另一个）；使用或打出其它点数牌的时，回到“拉胯”姿态。'
				switch(player.storage.liuxuan){
					case 'liuxuan_lakua': return str.replace(/“拉胯”/g,'<span class="bluetext">“拉胯”</span>');
					case 'liuxuan_huoli': return str.replace('“活力”','<span class="bluetext">“活力”</span>');
					case 'liuxuan_haixiu': return str.replace('“害羞”','<span class="bluetext">“害羞”</span>');
					case 'liuxuan_jiangzui': return str.replace('“犟嘴”','<span class="bluetext">“犟嘴”</span>');
					case 'liuxuan_keai': return str.replace('“可爱”','<span class="bluetext">“可爱”</span>');
				}
				return ;
			 },
		},
		translate:{
			sp_KaguraMea: '皇·神乐めあ',
			zhigao: '至高权柄',
			zhigao_info: '<font color=#dfb>限定技</font> 回合内，一名已受伤角色体力值变化时，你可以令此变化改为等量的体力上限变化。',
			tiangou: '天狗食日',
			tiangou_info: '一轮开始时，你可以声明一个未声明过的主要阶段并选择一名角色。本轮内只有其能执行此阶段。若均已声明，重置你的所有技能。',

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

			sp_Diana: '皇·嘉然',
			tangyan: '穿心糖言',
			tangyan_info: '若你已受伤，你使用、打出或弃置一张基本牌后，可以选择一项：1.令一名角色摸一张牌；2.防止你下一次受到的伤害；3.视为使用一张本回合未以此法使用过的基本牌。',
			tianyin: '万象天引',
			tianyin_info: '出牌阶段，你可以受到1点无来源的伤害，并将一张手牌交给一名其他角色，此牌称为“心嘉”牌。在持有“心嘉”牌角色的回合中，你发动『穿心糖言』改为依次执行所有选项。',
			xinjia: '心嘉',

			sp_Ava: '皇·向晚',
			shuimu: '降雨水母',
			shuimu_info: '<font color=#f66>锁定技</font> 你首次受到伤害前没有体力牌。首次受到伤害后，你获得当前姿态对应的体力牌。',
			liuxuan: '无限溜旋',
			liuxuan_info: '<font color=#f66>锁定技</font> 游戏开始时，你处于“拉胯”姿态（对应“4”）。你使用或打出一张点数为3/4/5/7倍数的牌时，进入“活力”/“害羞”/“犟嘴”/“可爱”姿态（若同时满足则选择先进入其中一个然后切换至另一个）；使用或打出其它点数牌的时，回到“拉胯”姿态。<br>'
			+'<br><span class="yellowtext">拉胯</span>：其他角色计算与你的距离-1。'
			+'<br><span class="legendtext">活力</span>：你的锦囊牌无法被抵消；离开此姿态时，你摸一张牌。'
			+'<br><span class="greentext">害羞</span>：你造成或受到的伤害+1，你区域内的牌不能被获得或弃置。'
			+'<br><span class="firetext">犟嘴</span>：进入此姿态时，你令其他角色交给你一张牌，然后你展示一张手牌，令之点数+1或-1。'
			+'<br><span class="thundertext">可爱</span>：进入此姿态时摸三张牌；你造成的伤害翻倍；离开此姿态时，将你的体力值调整为当前的一半（向上取整），若没有体力牌，你死亡。',

			liuxuan_plus: '溜旋:+1',
			liuxuan_lose: '溜旋:-1',
			liuxuan_plus2: '溜旋:+2',
			liuxuan_lose2: '溜旋:-2',

			liuxuan_lakua: '拉胯',
			liuxuan_lakua_describe: '其他角色计算与你的距离-1。',
			liuxuan_huoli: '活力',
			liuxuan_huoli_describe: '你的锦囊牌无法被抵消；离开此姿态时，你摸一张牌。',
			liuxuan_haixiu: '害羞',
			liuxuan_haixiu_describe: '你造成或受到的伤害+1，你区域内的牌不能被获得或弃置。',
			liuxuan_jiangzui: '犟嘴',
			liuxuan_jiangzui_describe: '进入此姿态时，你令其他角色交给你一张牌，然后你展示一张手牌，令之点数+1或-1。',
			liuxuan_keai: '可爱',
			liuxuan_keai_describe: '进入此姿态时摸三张牌；你造成的伤害翻倍；离开此姿态时，将你的体力值调整为当前的一半（向上取整），若没有体力牌，你死亡。',

			'phaseJudge': '判定阶段',
			'phaseDraw': '摸牌阶段',
			'phaseUse': '出牌阶段',
			'phaseDiscard': '弃牌阶段',
		},
	};
});
	