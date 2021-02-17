'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'emperor',
		connect:true,
		character:{
			sp_KaguraMea:['female','shen',3,['zhigao', 'tiangou']],
			sp_MinatoAqua:['female','shen',2,['shenghuang','renzhan', 'kuase']],
			sp_MononobeAlice:['female','shen',3,['xianjing','chahui', 'duandai']],
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
						_status.event.target = result.targets[0];
						var target = result.targets[0];
						console.log(target);
						game.log(player,'刃斩的目标为',target);
						target.addTempSkill('renzhan2','phaseEnd');
						target.storage.renzhan2 = 0;
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
								if(evt==trigger||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
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
				},
				ai:{
					combo:'xianjing',
				},
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


			'phaseJudge': '判定阶段',
			'phaseDraw': '摸牌阶段',
			'phaseUse': '出牌阶段',
			'phaseDiscard': '弃牌阶段',
		 },
	};
});
	