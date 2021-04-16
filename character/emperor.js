'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'emperor',
		connect:true,
		character:{
			sp_KaguraMea: ['female','shen',3,['zhigao', 'tiangou']],
			sp_MinatoAqua: ['female','shen',2,['shenghuang','renzhan', 'kuase']],
			sp_UsadaPekora: ['female','shen','3/4',['tuqi', 'shizu']],
			sp_MononobeAlice: ['female','shen',3,['xianjing','chahui', 'duandai']],

			sp_Ava: ['female','shen',Infinity,['shuimu','liuxuan']],
			sp_Diana: ['female','shen',2,['tangyan','tianyin']],
			
			sp_KizunaAI:['female', 'shen', 4, ['ai', 'ban']],
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
					var list= player.storage.tiangou_list;
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
					if(get.mode()=='identity'&&get.zhu(player)==player&&game.players.length>4) player.maxHp--;
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
							if(!(event.getParent().cards||event.card))	return false;
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
				check:function(event,player){
					return !player.storage.shenghuang_draw||player.storage.kuase_date>=player.storage.shenghuang_draw;
				},
				content:function(){
					var dream = player.storage.kuase_date;
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
						result.targets[0].draw(player);
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
				ai:{
					combo:'liuxuan',
				},
			},
			liuxuan:{
				init:function(player,skill){
					player.storage[skill] = 'liuxuan_lakua';
					player.addSkill('liuxuan_lakua');
					game.broadcastAll(function(player){
						player._liuxuan_mark=player.mark('😅',{
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
						});
					},player);
					if(lib.skill[skill].process)	lib.skill[skill].process(skill,player.storage[skill],player);
					game.playAudio('skill','liuxuan_lakua1');
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
						game.broadcastAll(function(skill,name,player){
							if(!player._liuxuan_mark) return;
							switch(name){
								case 'liuxuan_lakua': player._liuxuan_mark.firstChild.innerHTML= '😅';;break;
								case 'liuxuan_huoli': player._liuxuan_mark.firstChild.innerHTML= '🤗';;break;
								case 'liuxuan_haixiu': player._liuxuan_mark.firstChild.innerHTML= '🤣';;break;
								case 'liuxuan_jiangzui': player._liuxuan_mark.firstChild.innerHTML= '😡';;break;
								case 'liuxuan_keai': player._liuxuan_mark.firstChild.innerHTML= '😭';;break;
							}
							player.node.name.innerHTML = get.verticalStr(lib.translate[name]+'小向晚');
							lib.translate[skill+'_append']='<span class="changetext">'+lib.translate[name]+'：'+lib.translate[name+'_describe']+'</span>';
							player.update();
						},skill,name,player);
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
								else if(player.storage.liuxuan=='liuxuan_keai')	return num-3;
							}
							if([5,10].contains(key)){
								if(player.storage.liuxuan!='liuxuan_jiangzui')	return num+10;	
								if(player.storage.liuxuan=='liuxuan_jiangzui')	return num-3;	
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
						popup:'溜旋-害羞',
						filter:function(event,player){
							return true;
						},
						content:function(){
							trigger.num ++;
						},
						mod:{
							canBeGained:function(card,source,player){
								if(source!=player&&['h'].contains(get.position(card))) return false;
							},
							canBeDiscarded:function (card,source,player){
								if(source!=player&&['h'].contains(get.position(card))) return false;
							},
							cardDiscardable:function(card,player,name){
								if(['h'].contains(get.position(card))) return false;
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
						popup:'溜旋-可爱',
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
						game.delayx();
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
						game.delayx();
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
				ai:{
					combo:'tangyan',
					order:function(skill,player){
						if(player.hp=player.maxHp&&player.needsToDiscard()){
							if(player.storage.tangyan_on)	return 5;
							return 10;
						}
						return 0;
					},
					result:{
						player:function(player,target){
							if(player.storage.tangyan_on)	return 0;
							if(player.hp==1)	return -2;
							return -0.5
						},
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									var players=game.filterPlayer();
									for(var i=0;i<players.length;i++){
										if(players[i]!=player&&get.attitude(player,players[i])>q){
											return 0;
										}
									}
								}
							}
						}
					},
					threaten:0.1,
				},
			},
			ai:{
				audio:7,
				priority: -10,
				trigger:{
					global: 'roundStart'
				},
				onremove:function(player){
					delete player.storage.ai;
				},
				forced: true,
				skillList: ['ai_xu', 'ai_po', 'ai_ji', 'ai_zhong'],
				content:function(){
					
					'step 0'
					//对点数最少的一名角色造成1点伤害，清空所有点数
					var players = game.players.slice(0);
					event.players= players;

					var minPoint = Infinity;
					for(var i=0;i<players.length;++i){
						if(!players[i].hasSkill('ai_point')) players[i].addSkill('ai_point');
						var point = players[i].storage.ai_point.point;
						if(point < minPoint)minPoint = point;
					}
					
					var minPointPlayers = [];
					for(var i=0;i< players.length;++i){
						if(players[i].storage.ai_point.point == minPoint){
							minPointPlayers.push(players[i]);
						}
					}
					if(!player.storage.ai){
						player.storage.ai = true;
						event.goto(2);
						return;
					}
					if(minPointPlayers.length>1){
						player.chooseTarget('选择一个角色，给其一点伤害', true, function(card, player, target){
							return _status.event.minPointPlayers.contains(target);
						}).set('ai', function(target){
							var player=_status.event.player;
							return get.damageEffect(target,player,player);
						}).set('minPointPlayers', minPointPlayers);
					}else if(minPointPlayers.length == 1){
						event._result = {bool:true, targets: minPointPlayers};
					}else{
						event._result = {bool:false};
					}
					'step 1'
					if(result.targets) result.targets[0].damage();
					for(var i=0;i<event.players.length;++i){
						//清空所有点数
						event.players[i].storage.ai_point.point = 0;
						event.players[i].syncStorage('ai_point');
						event.players[i].markSkill('ai_point');

					}
					'step 2'
					var skillList = [];

					for(var i=0;i<lib.skill.ai.skillList.length;++i){
						var skill =  lib.skill.ai.skillList[i];
						if(!lib.skill.global.contains(skill)&&skill!='ai_point'){
							skillList.push(skill);
						}
					}
					event.set('skillList', skillList);
					if(skillList.length > 1){
						event.videoId = lib.status.videoId++;
						game.broadcastAll(function(id, skillList){
							var dialog=ui.create.dialog('令所有角色获得以下一项效果');
							dialog.forcebutton=true;
							dialog.videoId = id;
							for(var i=0;i<skillList.length;++i){
								dialog.add(
									'<div class="popup text" style="width:calc(100% - 10px);display:inline-block">'
									+get.translation(skillList[i])+'<font class="firetext">▷</font>'+get.skillInfoTranslation(skillList[i])
									+'</div>'
								);
							}
							dialog.op
						}, event.videoId, skillList);
						
						console.log('before chooseControl');
						player.chooseControl(skillList, true).set('ai', function(button){
							return _status.event.aiChoice;
						}).set('aiChoice', skillList.randomGet());
						
						
					}else if(skillList.length == 1){
						event._result = {bool:true, control:skillList[0]};
					}else{
						event.finish();
					}
					'step 3'
					if(typeof event.videoId != 'undefined')game.broadcastAll('closeDialog', event.videoId);
					//添加为全局效果
					var players= game.players.slice(0);

					//效果，终，初始化
					
					if(result.control == 'ai_zhong'){
						var zhongMark = {
							x: players.length+1,
							usedCardCount: 0
						};
						var deadMark = {
							lastDeadList: [],
						};
						game.addGlobalSkill('ai_zhong_deadSkillTrigger');
						game.addGlobalSkill('ai_zhong_onplayerdie');
						for(var i=0;i<players.length;++i){
							players[i].addSkill('ai_zhongMark');
							players[i].storage.ai_zhongMark = zhongMark;
							player.syncStorage('ai_zhongMark');
							players[i].storage.ai_deadMark = deadMark;
							player.syncStorage('ai_deadMark');
						}
						var deadPlayers = game.dead.slice(0);
						for(var i=0;i<deadPlayers.length;++i){
							lib.skill.ai_zhong.syncDeadPlayer(deadPlayers[i]);
						}

					}else{
						event.finish();
					}
					var skills = game.expandSkills([result.control]);
					for(var i=0;i<skills.length;++i){
						if(skills[i]) game.addGlobalSkill(skills[i]);
					}
					
					//记录已使用的技能
					
					for(var i=0;i<players.length;++i){
						players[i].storage.ai_point.skillList.push(result.control);
					}
					if(result.control == 'ai_zhong'){
						//生成dialog
						event.firstNum = game.countPlayer()+1;
						var firstNum = event.firstNum;

						var cards = [];
							
						var leftCard = game.createCard('👈', 'noclick', '');
						cards.push(leftCard);

						for(var i=0;i<10;++i){
							var card  =game.createCard(''+(i+firstNum), 'noclick', '');
							cards.push(card);
						}

						var rightCard = game.createCard('👉', 'noclick', '');
						cards.push(rightCard);

						event.cards = cards;
						event.videoId = lib.status.videoId++;
						var func =function(id, cards){
							var firstNum = game.countPlayer()+1;


							var dialog = ui.create.dialog('选择一个数字',[cards,'card'], 'hidden');
							dialog.videoId = id;
							for(var i=0;i<dialog.buttons.length;++i){
								dialog.buttons[i].childNodes[1].style.visibility = 'hidden';
								dialog.buttons[i].childNodes[2].style.visibility = 'hidden';
								dialog.buttons[i].childNodes[3].style.visibility = 'hidden';
								dialog.buttons[i].node.background.innerHTML = dialog.buttons[i].name;
							}
							dialog.open();
						};

						if(player.isOnline2()){
							player.send(func, event.videoId, cards);
						}
						else{
							func(event.videoId, cards);
						}
					}


					'step 4'
					//生成十个数字牌
					var firstNum = event.firstNum;
					if(firstNum <= game.countPlayer()) firstNum = game.countPlayer() + 1;
					event.firstNum = firstNum;
					var func = function(id,firstNum, hiddenLeft){
						var dialog = get.idDialog(id);
						if(!dialog)return;
						if(hiddenLeft){
							dialog.buttons[0].style.display = 'none';
						}else{
							dialog.buttons[0].style.display = '';
						}
						for(var i=1;i<dialog.buttons.length-1;++i){
							dialog.buttons[i].name = ''+(firstNum+i-1);
							dialog.buttons[i].link.name = ''+(firstNum+i-1);
							dialog.buttons[i].node.background.innerHTML = dialog.buttons[i].name;
						}
					};
					if(player.isOnline2()){
						player.send(func, event.videoId, firstNum, firstNum == game.countPlayer() + 1);
					}else{
						func(event.videoId, firstNum, firstNum == game.countPlayer() + 1);
					}
					for(var i=1;i<event.cards.length-1;++i){
						event.cards[i].name = (firstNum+i-1);
					}

					'step 5'
					
					player.chooseButton(true).set('dialog', event.videoId).set('ai', function(button){
						if(button.link.name == '👈'){
							if(button.style.display != 'none') return Infinity;
							else return -50;
						}else if(button.link.name == '👉'){
							return -10;
						}
						return 100 / parseInt(button.link.name);
					});
					'step 6'
					var x = parseInt(result.links[0].name);
					if(!isNaN(x)){
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}else{
							var dialog = get.idDialog(event.videoId);
							if(dialog) dialog.close();  
						}
						//为技能 终 设置X
						player.storage.ai_zhongMark.x = x;
						var players = game.players.slice(0);
						for(var i=0;i<players.length;++i){
							player.syncStorage('ai_zhongMark');
							players[i].markSkill('ai_zhongMark');
						}
					}else{
						if(result.links[0].name == '👈'){
							event.firstNum -= 10;
						}else{
							event.firstNum += 10;
						}
						event.goto(4);
					}
				},
				group: 'ai_extraPoint',
				subSkill:{
					point:{
						marktext:'爱',
						mark:true,
						init:function(player){
							if(!player.storage.ai_point) {
								player.storage.ai_point = {};
							}
							if(typeof player.storage.ai_point.point != 'number')player.storage.ai_point.point=0;
							if(!Array.isArray(player.storage.ai_point.skillList))player.storage.ai_point.skillList=[];
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
						},

						intro:{
							name:'爱',
							content:'mark',
							mark:function(dialog, storage, player){
								if(storage.skillList.length > 0){
									dialog.addText('获得的效果：');
									for(var i=0;i<storage.skillList.length;++i){
										dialog.add('<div><div class="skill firetext">'+get.translation(storage.skillList[i]).slice(0,2)+'</div><div>'
											+get.skillInfoTranslation(storage.skillList[i],player)+'</div></div>'
										);
									}
								}
								
								if(storage.point > 0)dialog.addText('共有'+get.cnNumber(storage.point)+'个“●标记”');
								else dialog.addText('没有●标记');;
							},
							markcount:function(storage, player){
								return storage.point;
							}
						},

					},
					zhongMark:{
						marktext: '终',
						mark:true, 
						intro:{
							name: '终',
							content: 'mark',
							mark:function(dialog, storage, player){
								dialog.addText('每第X张牌之使用者+❸');
								if(!storage) return;
								dialog.addText('已使用'+get.cnNumber(storage.usedCardCount)+'牌');
								dialog.addText('距离下一次触发还需使用'+get.cnNumber(storage.x - storage.usedCardCount%storage.x)+'张牌');
							},
							markcount:function(storage, player){
								if(!storage) return;
								return storage.x -storage.usedCardCount %storage.x;
							}
						}
					},
					extraPoint:{
						trigger:{
							player: 'addAiPoint'
						},
						direct: true,
						log:false,
						filter:function(event, player){
							return player.hasSkill('ai_point');
						},
						content:function(){
							player.storage.ai_point.point+=1;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
						}
					}
				}
			},
			ai_xu:{
				init:function(player){
				// player.addSkill('ai_point');//test
				},
				group:['ai_xu_ongain', 'ai_xu_ondiscard', 'ai_xu_onPhaseEnd', 'ai_xu_onblacksha'],
				subSkill:{
					//一个阶段内首次获得牌的角色
					ongain:{
						trigger:{
							player: ['gainBegin']
						},
						filter:function(event, player){
							if(game.countPlayer(function(current){
								return current.hasSkill('ai_point')&&!current.storage.ai_xu_ongain;
							}))return true;
							return false;
						},
						direct: true,
						log: false,
						content:function(){
							player.storage.ai_xu_ongain = true;
						}
					},
					//一个阶段内首次失去牌的角色
					ondiscard:{
						trigger:{
							player: 'discardBegin'
						},
						direct: true,
						log: false,
						filter:function(event, player){
							if(game.countPlayer(function(current){
								return current.hasSkill('ai_point')&&!current.storage.ai_xu_ondiscard;
							}))return true;
							return false;
						},
						content:function(){
							player.storage.ai_xu_ondiscard = true;
						}
					},
					//一个阶段内首次获得牌的角色+❶，失去牌的–❶。
					onPhaseEnd:{
						trigger:{
							player: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
						},
						priority: 257,
						direct:true,
						log: false,
						content:function(){
							var players=game.players.slice(0);
							for(var i=0;i<players.length;++i){
								if(players[i].storage.ai_xu_ongain){
									players[i].storage.ai_point.point +=1;
									if(players[i].hasSkill('ai_extraPoint')) players[i].storage.ai_point.point +=1;
									players[i].syncStorage('ai_point');
									players[i].markSkill('ai_point');
								}
								delete players[i].storage.ai_xu_ongain;
								if(players[i].storage.ai_xu_ondiscard&&players[i].storage.ai_point.point>=1){
									players[i].storage.ai_point.point -=1;
									players[i].syncStorage('ai_point');
									players[i].markSkill('ai_point');
								}
								delete players[i].storage.ai_xu_ondiscard;
							}

						}
					},
					//你可以–❷以抵消黑色【杀】。
					onblacksha:{
						trigger:{
							target:'shaBefore'
						},
						filter:function(event, player){
							return player.hasSkill('ai_point')&&event.card&&get.color(event.card) == 'black'&&player.storage.ai_point.point >= 2;
						},
						content:function(){
							player.storage.ai_point.point -= 2;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							trigger.cancel();
						},
						ai:{
							respondShan: true,
						}
					}
				}
			},
			ai_po:{
				group:['ai_po_onhurt', 'ai_po_onphaseJieshu'],
				subSkill:{
					onhurt:{
						trigger:{
							source:'damageSource'
						},
						forced: true,
						filter:function(event, player){
							return player.hasSkill('ai_point');
						},
						content:function(){
							player.storage.ai_point.point += 3;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							event.trigger('addAiPoint');
						}
					},
					onphaseJieshu:{
						trigger:{
							player: 'phaseJieshu'
						},
						filter:function(event, player){
							return player.hasSkill('ai_point')&&player.storage.ai_point.point >= 4;
						},
						content:function(){
							'step 0'
							player.storage.ai_point.point -= 4;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							//移动场上的一张牌
						player.moveCard(true);
						},
						check:function(event, player){
							var players = game.players.slice(0);
							for(var i=0;i<players.length;++i){
								var target = players[i];
								var att=get.attitude(player,target);
								var sgnatt=get.sgn(att);
								if(att>0){
									if(!_status.event.nojudge&&target.countCards('j',function(card){
										return game.hasPlayer(function(current){
											return current!=target&&current.canAddJudge(card)&&get.attitude(player,current)<0;
										})
									})) return true;
									if(target.countCards('e',function(card){
										return get.value(card,target)<0&&game.hasPlayer(function(current){
											return current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))&&get.effect(target,card,player,player)<0;
										});
									})>0) return true;
								}
								else if(att<0){
									if(game.hasPlayer(function(current){
										if(current!=target&&get.attitude(player,current)>0){
											var es=target.getCards('e');
											for(var i=0;i<es.length;i++){
												if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.effect(current,es[i],player,player)>0) return true;
											}
										}
									})){
										return true;
									}
								}
							}
							return false;
						}
					}
				}
			},
			ai_ji:{
				group:['ai_ji_ondiscard', 'ai_ji_onusecard'],
				subSkill:{
					//准备阶段，弃置任意牌以获得两倍的●
					ondiscard:{
						trigger:{
							player: 'phaseZhunbei'
						},
						filter:function(event, player){
							return player.hasSkill('ai_point')&&player.getCards('he').length>0;
						},
						content:function(){
							'step 0'
							player.chooseToDiscard('he', '弃置任意牌', [1, Infinity], true).set('ai', function(card){
								return 1-get.value(card);
							});
							'step 1'
							if(result.bool&&result.cards.length>0){
								player.storage.ai_point.point+=result.cards.length*2;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
								event.trigger('addAiPoint');
							}
						}

					},
					//你可以–❷为你使用的牌增加或减少一名目标。
					onusecard:{
						trigger:{
							player: 'useCard2'
						},
						filter:function(event, player){
							if(!player.hasSkill('ai_point')||player.storage.ai_point.point <2)return false;
							if(!event.targets||!event.targets.length) return false;
							var info=get.info(event.card);
							if(info.allowMultiple==false) return false;
							if(event.targets&&!info.multitarget){
								if(game.hasPlayer(function(current){
									return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current)&&lib.filter.targetInRange(event.card,player,current);
								})){
									return true;
								}
							}
							return false;
						},
						content:function(){
							'step 0'
							//–❷
							player.storage.ai_point.point -=2;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							//为你使用的牌增加或减少一名目标
							var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
							player.chooseTarget(get.prompt('ai_ji'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								return get.effect(target,trigger.card,player,player)*(_status.event.targets.contains(target)?-1:1);
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool){
								if(!event.isMine()) game.delayx();
								event.targets=result.targets;
							}
							else{
								event.finish();
							}
							'step 2'
							if(event.targets){
								player.logSkill('ai_ji',event.targets);
								if(trigger.targets.contains(event.targets[0])) trigger.targets.removeArray(event.targets);
								else trigger.targets.addArray(event.targets);
							}
						}
					}
				}
			},
			ai_zhong:{
				group: ['ai_zhong_onusexcard'],
				subSkill:{
					onusexcard:{
						trigger:{
							player: 'useCard1'
						},
						direct:true,
						filter:function(event, player){
							return player.hasSkill('ai_point')&&player.hasSkill('ai_zhongMark');
						},
						content:function(){       
							'step 0'                     
							var players = game.players.slice(0);
							var storage;
							for(var i=0;i<players.length;++i){
								if(players[i].storage.ai_zhongMark){
									storage = players[i].storage.ai_zhongMark;
									break;
								}
							}
							if(!storage){
								var skills = get.expandSkills('ai_zhong');
								for(var i=0;i<skills.length;++i){
									game.removeGlobalSkill(skills[i]);
								}
								for(var i=0;i<players.length;++i){
									delete players[i].storage.ai_zhongMark;
								}
								event.finish();
								return;
							}
							++storage.usedCardCount;

							for(var i=0;i<players.length;++i){
								if(!players[i].storage.ai_zhongMark){
									players[i].storage.ai_zhongMark = storage;
								}
								players[i].syncStorage('ai_zhongMark');
								players[i].markSkill('ai_zhongMark');
							}
							
							
							if(storage.usedCardCount % storage.x == 0){
								player.storage.ai_point.point+=3;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
								event.trigger('addAiPoint');
							}
						}
					},
					onplayerdie:{
						trigger:{
							global: 'dieAfter'
						},
						direct: true,
						log:false,
						content:function(){
							var diePlayer = trigger.player;
							lib.skill.ai_zhong.syncDeadPlayer(diePlayer);
						}
					},
					deadSkillTrigger:{
						trigger:{
							player: []
						},
						filter:function(event, player){
							return player.hasSkill('ai_point');
						},
						direct:true,
						log:false,
						content:function(){
							'step 0'
							if(!player.storage.ai_point||player.storage.ai_point.point<3){
								trigger.cancel();
								event.finish();
								return;
							}
							player.chooseBool('是否–❸以触发'+get.translation(trigger.name)||'技能'+'？').set('ai',function(){
								return Math.random()>= 0.5;
							});
							'step 1'
							if(result.bool){
								player.storage.ai_point.point -= 3;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
							}else{
								trigger.cancel();
							}
						}
					}
				},
				banned:[],
				characterFilter:function(character){//true is right.
					return character.indexOf('KizunaAI')==-1&&!lib.skill.ai_zhong.banned.contains(character);
				},
				bannedSkill:[],
				skillFilter:function(skill){//true is right.
					if(lib.character['sp_KizunaAI'][3].contains(skill) || lib.skill.ai_zhong.bannedSkill.contains(skill)){
						return false;
					}
					var info = lib.skill[skill];
					if(!info)return false;
					if(info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill)return false;
					return true;
				},
				syncDeadPlayer:function(diePlayer){
					//filter character
					if(!lib.skill.ai_zhong.characterFilter(diePlayer.name))return;

					//获取 ai_deadMark
					var storage;
					var players = game.players.slice(0);
					var storagePlayer;
					for(var i=0;i<players.length;++i){
						if(players[i].storage.ai_deadMark){
							storage = players[i].storage.ai_deadMark;
							storagePlayer = players[i];
							break;
						}
					}

					//获取lastDeadList
					var lastDeadList = storage.lastDeadList;
					var addPlayer = function(player){
						lastDeadList.add(player);
						var skills = lib.character[player.name][3];
						for(var i=0;i<skills.length;++i){
							var skill = skills[i];
							//filter skill
							if(!lib.skill.ai_zhong.skillFilter(skill))continue;
							var info=lib.skill[skill];
							if(!info) continue;
							if(info.trigger){
								for(var i=0;i<players.length;++i){
									players[i].addSkill(skill);
								}
								var setTrigger=function(i,evt){
									var name=i+'_'+evt;
									if(!lib.hook.globalskill[name]){
										lib.hook.globalskill[name]=[];
									
									}
									lib.skill.ai_zhong.subSkill.deadSkillTrigger.trigger.player.push(skill+'Before');
									lib.hook.globalskill[name].add('ai_zhong_deadSkillTrigger');
									lib.hookmap[evt]=true;
								}
								setTrigger('player', skill+'Before');
							}
						}
					};
					var removePlayer = function(player){
						var skills = lib.character[player.name][3];
						
						for(var j=0; j< skills.length;++j){
							if(!lib.skill.ai_zhong.skillFilter(skills[j]))continue;
							for(var i=0;i<players.length;++i){
								if(players[i] == player)continue;
								players[i].removeSkill(skills[j]);    
							}
							var name = 'player_'+skills[j]+'Before';
							lib.skill.ai_zhong.subSkill.deadSkillTrigger.trigger.player.remove(skills[j]+'Before');
							if(lib.hook.globalskill[name]) lib.hook.globalskill[name].remove('ai_zhong_deadSkillTrigger');
						}
						lastDeadList.remove(player);
					};
					//添加死亡角色
					if(diePlayer.isDead()&&!lastDeadList.contains(diePlayer)){
						addPlayer(diePlayer);
					}
					//删除复活角色
					for(var i=0;i<lastDeadList.length;++i){
						if(!lastDeadList[i].isDead()){
							removePlayer(lastDeadList[i]);
						}
					}

					for(var i=0;i<players.length;++i){
						if(!players[i].storage.ai_deadMark){
							players[i].storage.ai_deadMark = storage;
							players[i].syncStorage('ai_deadMark');
						}
					}
					storagePlayer.syncStorage('ai_deadMark');
				}
			},
			ban:{
				audio:2,
				priority: 256,
				frequent: true,
				trigger:{
					global: 'roundStart'
				},
				filter:function(event, player){
					if(game.hasPlayer(function(current){
						if(current.hasSkill('ai_point')){
							return true;
						}
					}))return true;
					return false;
				},
				check:function(event, player){
					var friends = player.getFriends(true);
					var players = game.players.slice(0);
					var sameGroupCount = 0;
					var othersCount = 0;
					for(var i=0;i<players.length;++i){
						if(friends.contains(players[i])){
							if(players[i].storage.ai_point) sameGroupCount+=players[i].storage.ai_point.point;
						}else{
							if(players[i].storage.ai_point) othersCount+=players[i].storage.ai_point.point;
						}
					}
					return sameGroupCount>0 &&sameGroupCount > othersCount*2;
				},
				content:function(){
					'step 0'
					//你可以令与你同阵营的角色亮出身份牌
					var friends = player.getFriends(true);
					event.friends = friends;
					for(var i=0;i<friends.length;i++){
						if(friends[i].identityShown)continue;
						if(friends[i].showIdentity) friends[i].showIdentity();
					}
					'step 1'
					game.delay();
					'step 2'
					var friends = event.friends;
					var players = game.players.slice(0);
					var sameGroupCount = 0;
					var othersCount = 0;
					for(var i=0;i<players.length;++i){
						if(friends.contains(players[i])){
							if(players[i].storage.ai_point) sameGroupCount+=players[i].storage.ai_point.point;
						}else{
							if(players[i].storage.ai_point) othersCount+=players[i].storage.ai_point.point;
						}
					}
					//若你们●的合计值大于其他阵营●的两倍，获得胜利。
					if( sameGroupCount>0 &&sameGroupCount > othersCount*2){
						var func = game.checkOnlineResult;
						game.checkOnlineResult = function(player){
							return event.friends.contains(player);
						};
						game.over(game.checkOnlineResult(game.me));
						game.checkOnlineResult = func;
					}
					
				}
			},
			tuqi:{
				audio:6,
				trigger:{target:'useCardToTarget'},
				forced:true,
				filter:function(event,player){
					var name = get.translation(get.name(event.card));
					if(typeof name=='string')	return true;
				},
				content:function(){
					'step 0'
					var name = get.translation(get.name(trigger.card));
					if(name.length>player.hp){
						trigger.excluded.add(player);
					}
					if(name.length<=player.hp){
						player.draw();
					}
					'step 1'
					if(trigger.getParent().targets&&trigger.getParent().targets.filter(function(cur){
						return cur.isIn();
					}).length==1&&game.countPlayer(function(cur){
						var source = event.getTrigger().player;
						var targets = event.getTrigger().targets;
						var card = event.getTrigger().card;
						return cur.isIn()&&lib.filter.targetEnabled2(card,source,cur)&&!targets.contains(cur);
					})){
						var prompt2='为'+get.translation(trigger.card)+'增加一个目标';
						player.chooseTarget().set('filterTarget',function(card,player,target){
							var source = _status.event.getTrigger().player;
							var targets = _status.event.getTrigger().targets;
							var card = _status.event.getTrigger().card;
							return lib.filter.targetEnabled2(card,source,target)&&!targets.contains(target);
						}).set('prompt2',prompt2).set('ai',function(target){
							var player = _status.event.player;
							var source = _status.event.getTrigger().player;
							var card = _status.event.getTrigger().card;
							return get.effect(target,card,source,player);
						});
					}
					'step 2'
					if(result.bool){
						if(!event.isMine()) game.delayx();
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool&&result.targets){
						player.logSkill('tuqi',event.targets);
						trigger.getParent().targets.addArray(event.targets);
					}
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 1.5;
					},
					effect:{
						target:function(card,player,target,current){
							var name = get.translation(get.name(card));
							if(name.length>target.hp){
								return [0.1,0.5];
							}
							if(name.length<=target.hp){
								return [1,1];
							}
						}
					}
				}
			},
			shizu:{
				audio:6,
				trigger:{source:'damageEnd'},
				forced:true,
				filter:function(event,player){
					var name = get.translation(event.player);
					if(typeof name=='string'&&event.player.isIn())	return true;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					var name = get.translation(trigger.player);
					if(name.length>player.countCards('h'))	player.swapHandcards(trigger.player);
					if(name.length<=player.countCards('h'))	player.swapEquip(trigger.player);
				}
			},
		},
		dynamicTranslate:{
			liuxuan:function(player){
				var str = '<font color=#f66>锁定技</font> 游戏开始时，你处于“拉胯”姿态（对应“4”）。你使用或打出一张点数为3/4/5/7倍数的牌时，进入“活力”/“害羞”/“犟嘴”/“可爱”姿态（若同时满足则选择先进入其中一个然后切换至另一个）；使用或打出其它点数牌的时，回到“拉胯”姿态。'
				switch(player.storage.liuxuan){
					case 'liuxuan_lakua': return str.replace(/“拉胯”/g,'<span class="changetext">“拉胯”</span>');
					case 'liuxuan_huoli': return str.replace('“活力”','<span class="changetext">“活力”</span>');
					case 'liuxuan_haixiu': return str.replace('“害羞”','<span class="changetext">“害羞”</span>');
					case 'liuxuan_jiangzui': return str.replace('“犟嘴”','<span class="changetext">“犟嘴”</span>');
					case 'liuxuan_keai': return str.replace('“可爱”','<span class="changetext">“可爱”</span>');
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

			sp_UsadaPekora: '皇·兔田佩克拉',
			tuqi: '兔起乌沉',
			tuqi_info: '<font color=#f66>锁定技</font> 牌名字数大于/不大于你体力的牌指定你为目标时，你令其对你无效/摸一张牌，若你为唯一目标，你可以为之指定额外目标。',
			shizu: '簪缨世族',
			shizu_info: '<font color=#f66>锁定技</font> 武将名字数大于/不大于你手牌数的角色受到你造成的伤害时，你与其交换手牌/装备区的牌。',
			

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
			+'<br><span class="greentext">害羞</span>：你造成或受到的伤害+1，你的手牌无法被其他角色获得或弃置。'
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
			liuxuan_haixiu_describe: '你造成或受到的伤害+1，你的手牌无法被其他角色获得或弃置。',
			liuxuan_jiangzui: '犟嘴',
			liuxuan_jiangzui_describe: '进入此姿态时，你令其他角色交给你一张牌，然后你展示一张手牌，令之点数+1或-1。',
			liuxuan_keai: '可爱',
			liuxuan_keai_describe: '进入此姿态时摸三张牌；你造成的伤害翻倍；离开此姿态时，将你的体力值调整为当前的一半（向上取整），若没有体力牌，你死亡。',

			'phaseZhunbei': '准备阶段',
			'phaseJudge': '判定阶段',
			'phaseDraw': '摸牌阶段',
			'phaseUse': '出牌阶段',
			'phaseDiscard': '弃牌阶段',
			'phaseJieshu': '结束阶段',
			
			sp_KizunaAI: '皇·绊爱',
			ai: '爱',
			ai_info:
				'一轮开始时，你对●最少的一名角色造成1点伤害，清空所有●，然后令所有角色获得以下一项效果：'
				+'<br>序<span class="firetext">▷</span>一个阶段内首次获得牌的角色+❶，失去牌的–❶。你可以–❷以抵消黑色【杀】。'
				+'<br>破<span class="firetext">▷</span>每次造成伤害时+❸。结束阶段，你可以–❹以移动场上一张牌。'
				+'<br>急<span class="firetext">▷</span>准备阶段，弃置任意牌以获得两倍的●。你可以–❷为你使用的牌增加或减少一名目标。'
				+'<br>终<span class="firetext">▷</span>皇·绊爱声明一个大于存活角色数的数字X，从现在开始每第X张牌之使用者+❸，你可以–❸以触发一项已死亡角色的通常技。'
				+'<br>你每次获得●时，额外+❶。',
			ai_xu: '序',
			ai_xu_info: '一个阶段内首次获得牌的角色+❶，失去牌的–❶。你可以–❷以抵消黑色【杀】。',
			ai_po: '破',
			ai_po_info: '每次造成伤害时+❸。结束阶段，你可以–❹以移动场上一张牌。',
			ai_ji: '急',
			ai_ji_info: '准备阶段，弃置任意牌以获得两倍的●。你可以–❷为你使用的牌增加或减少一名目标。',
			ai_zhong: '终',
			ai_zhong_info: '皇·绊爱声明一个大于存活角色数的数字X，从现在开始每第X张牌之使用者+❸，你可以–❸以触发一项已死亡角色的通常技。',
			ban:'绊',
			ban_info:'一轮结束时，你可以令与你同阵营的角色亮出身份牌，若你们●的合计值大于其他阵营●的两倍，获得胜利。'
		},
	};
});
	