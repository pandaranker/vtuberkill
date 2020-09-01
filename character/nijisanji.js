'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'nijisanji',
        connect:true,
        character:{
			/**物述有栖 */
			MononobeAlice:['female','wu',3,['tinenghuifu1','dianmingguzhen']],
			/**静凛 */
			ShizukaRin:['female','wu',4,['mozhaotuji']],
			/**家长麦 */
			IenagaMugi:['female','wu',3,['fengxue','yuepi','cangxiong']],
        },
        characterIntro:{
			MononobeAlice:'物述有栖',
			ShizukaRin:'静凛',
			IenagaMugi:'家长麦',
        },
        skill:{
            fuheijs:{
				enable:"phaseUse",
				filter:function(event,player){
					return player.countDiscardableCards(player,'he')!=0
				},
                content:function(){
					'step 0'
					var list=['弃置一名角色的1张装备牌'];
					if(lib.skill.fuheijs.canMoveCard(player)) list.push('将一名其他角色装备区内的一张牌移动到另一名角色的装备区内');
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('fuheijs')).set('ai',function(){
						if(lib.skill.fuheijs.canMoveCard(player,true)) return 1;
						return 0;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('fuheijs');
						if(result.index==1) event.goto(5);
						else event.count=1;
					}
					else event.finish();
					'step 2'
					player.chooseTarget('弃置一名其他角色的一张装备牌',function(card,player,target){
						if(player==target) return false;
						return target.countDiscardableCards(player,'e');
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 3'
					if(result.bool){
						player.chooseToDiscard('he',true);
						player.line(result.targets[0],'green');
						player.discardPlayerCard(result.targets[0],'e',true);
						event.count--;
					}
					else event.finish();
					'step 4'
					if(event.count) event.goto(2);
					else event.finish();
					'step 5'
					player.chooseToDiscard('he',true);
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							return target.countCards('e')>0;
						}
					});
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=player&&current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&current!=player&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张装备牌');
					next.set('forced',true);
					'step 6'
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 7'
					game.delay();
					'step 8'
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
					'step 9'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						event.targets[1].equip(link);
						event.targets[0].$give(link,event.targets[1])
						game.delay();
						event.result={bool:true};
					}
                },
				canMoveCard:function(player,withatt){
					return game.hasPlayer(function(current){
						if(player==current) return false;
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(player==current2) return false;
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att2!=get.sgn(get.value(es[i],current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.isEmpty(get.subtype(es[i]));
								})){
									return true;
								}
							}
						}
					});
				}
            },
            leiyan:{
				trigger:{player:'useCard1'},
				forced:true,
                firstDo:true,
                filter:function(event,player){
					//console.log(event);
					if(event.card.name!='sha'||event.card.nature!='thunder') return false;
					return true;
                },
				content:function(){
                },
				mod:{
					selectTarget:function(card,player,range){
						//console.log(card.nature,range);
						if(card.name!='sha'||card.nature!='thunder') return;
						if(range[1]==-1) return;
						range[1]+=2;
					},
				},
				group:['leiyan_qinggang'],
				subSkill:{
					qinggang:{
						trigger:{
							player:'useCardToPlayered',
						},
						filter:function(event){
							return event.card.name=='sha'&&event.card.nature=='thunder';
						},
						forced:true,
						logTarget:'target',
						content:function(){
							trigger.target.addTempSkill('leiyan2');
							trigger.target.storage.leiyan2.add(trigger.card);
						},
						ai:{
							unequip_ai:true,
							skillTagFilter:function(player,tag,arg){
								if(arg&&arg.name=='sha') return true;
								return false;
							}
						}
					},
				}
            },
			leiyan2:{
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
					return player.storage.leyan2&&event.card&&player.storage.leyan2.contains(event.card);
				},
				silent:true,
				forced:true,
				popup:false,
				priority:12,
				content:function(){
					player.storage.leyan2.remove(trigger.card);
					if(!player.storage.leyan2.length) player.removeSkill('leyan2');
				},
			},
            xiaozhangduandai:{
				skillAnimation:true,
				animationColor:'orange',
				unique:true,
				juexingji:true,
				trigger:{player:'dyingBegin'},
				forced:true,
				derivation:'yongchun',
				filter:function(event,player){
					if(player.storage.yongchun) return false;
					return player.hp<player.maxHp;
				},
				content:function(){
					player.awakenSkill('qianxin');
					player.storage.yongchun=true;
					player.addSkill('yongchun');
                    player.hp+=3;
                    player.draw(3);
				}
            },
            yongchun:{
                enable:"phaseUse",
                trigger:{player:'shaBegin'},
                frequent:true,
                forced:false,
				filterCard:function(card){//选择的牌需要满足的条件
					return card.name=='sha';//例子，只能选择红色牌
				},
                content:function(){
                    player.draw(1);
                    player.chooseToDiscard('he',true);
                    player.getStat().card.sha--;
                }
			},
			tinenghuifu1:{
				trigger:{player:'loseAfter'},
				forced:true,	
				nopop:false,//player是否logSkill('此技能')，true为不
				filter:function(event,player){
					return event.es&&event.es.length>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.es.length;
					"step 1"
					event.count--;
					player.recover();
					"step 2"
					if(event.count>0){
						//console.log(event.count);
						player.chooseBool(get.prompt2('tinenghuifu1')).set('frequentSkill','tinenghuifu1').ai=lib.filter.all;
					}
					"step 3"
					if(result.bool){
						//game.delay();
						result.bool=false;
						event.goto(1);
					}
				},
				group:['tinenghuifu1_hp'],
				subSkill:{
					hp:{
						trigger:{player:['loseHpEnd','damageEnd']},
						forced:true,	
						nopop:true,//player是否logSkill('此技能')，true为不
						content:function(){
							player.draw(1);
							player.logSkill('tinenghuifu');
						}
					}
				}
				
			},
			dianmingguzhen:{
				enable:"phaseUse",
				usable:1,
				filter:function(event,player){
					if(!game.hasPlayer(function(current){
						return current.countCards('e')>0;
					})) return false;
					return true
				},
				content:function(){
					'step 0'
					player.loseHp(1);
					'step 1'
					//console.log(lib.skill.dianmingguzhen.canMoveCard(player));
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							return target.countCards('e')>0;
						}
					});
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=player&&current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&current!=player&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张装备牌');
					next.set('forced',true);
					'step 2'
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 3'
					game.delay();
					'step 4'
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
					'step 5'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						event.targets[1].equip(link);
						event.targets[0].$give(link,event.targets[1]);
						event.equiptype=get.subtype(link);
						game.delay();
						event.result={bool:true};
					}
					'step 6'
					if(event.targets[0]!=player){
						event.finish();
					}
					else{
						if(event.judgeGroup==null)
							event.judgeGroup=[];
					}
					'step 7'
					event.equiptype=parseInt(event.equiptype.slice(5));
                    event.players=game.filterPlayer(function(current){
						return (current!=player)&&(!current.getEquip(event.equiptype));
                    });
					event.players.sortBySeat(player);
					'step 8'
                    if(event.playersIndex==null){
                        event.playersIndex=0;
                    }
                    if(event.playersIndex<event.players.length){
						////getCards('e',{subtype:['equip3','equip4','equip6']}));
						if(!event.players[event.playersIndex].getEquip(event.equiptype)){
							player.useCard({name:'sha',nature:'thunder',isCard:true},event.players[event.playersIndex],false);
							//player.getStat().card.sha--;
						}
					}
					'step 9'
					if(!result.bool){
						event.judgeGroup.add(event.players[event.playersIndex]);
					}
					event.playersIndex++;
					if(event.playersIndex<event.players.length){
						event.goto(8);
					}
					'step 10'
					if(event.judgeGroup.length>0){
						var shanString='<br>';
						for(var i=0;i<event.judgeGroup.length;i++){
							shanString+=(get.translation(event.judgeGroup[i])+',');
						}
						player.chooseBool('是否对所有闪避者追加闪电判定？'+shanString);
					}
					else{
						event.finish();
					}
					'step 11'
					if(!result.bool){
						event.finish();
					}
					'step 12'
						//console.log(player.getStat().card.sha);
					if(event.judgeGroup.length>0){
						event.judgeGroup[0].judge(function(card){
							if(get.suit(card)=='spade'&&(get.number(card)>=2&&get.number(card)<=9)) return 2;
						});
					}
					else{
						event.finish();
					}
					'step 13'
					game.delay();
					if(event.judgeGroup.length>0){
						if(result.judge==2){
							event.judgeGroup[0].damage(3,'thunder','nosource');
						}
						event.judgeGroup.shift();
						event.goto(12)
					}
					else{
						event.finish();
					}
				},
				canMoveCard:function(player,withatt){
					return game.hasPlayer(function(current){
						if(player==current) return false;
						var att=get.sgn(get.attitude(player,current));
						if(!withatt||att!=0){
							var es=current.getCards('e');
							for(var i=0;i<es.length;i++){
								if(game.hasPlayer(function(current2){
									if(player==current2) return false;
									if(withatt){
										if(get.sgn(get.value(es[i],current))!=-att) return false;
										var att2=get.sgn(get.attitude(player,current2));
										if(att2!=get.sgn(get.value(es[i],current2))) return false;
									}
									return current!=current2&&!current2.isMin()&&current2.isEmpty(get.subtype(es[i]));
								})){
									return true;
								}
							}
						}
					});
				},
			},
			mozhaotuji:{
				group:['mozhaotuji_DrawOrStop','mozhaotuji_Ready','mozhaotuji_Judge','mozhaotuji_PhaseDraw','mozhaotuji_Discard','mozhaotuji_End'],
				/**转化阶段 */
				contentx:function(trigger,player){
					'step 0'
					if(!player.hasSkill('mozhaotujiStart'))
						player.addTempSkill('mozhaotujiStart');
					trigger.cancel();
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
					'step 1'
					player.phaseUse();
					'step 2'
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
				},
				subSkill:{
					DrawOrStop:{
						trigger:{global:'phaseUseAfter'},
						filter:function(event,player){
							if((player.getHistory('useCard').length)>=2)
								return true;
							else if((player.getHistory('useCard').length)==0)
								return player==_status.currentPhase;
							else
								return false;
						},
						forced:true,
						content:function(){
							'step 0'
							if((player.getHistory('useCard').length)>=2)
								player.draw(1);
							else
								player.addTempSkill('mozhaotujiStop');
							'step 1'
							player.getHistory('useCard').splice(0,player.getHistory('useCard').length);
							player.getHistory('respond').splice(0,player.getHistory('respond').length);
						},
					},
					Ready:{
						trigger:{
							player:'phaseZhunbeiBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把准备阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Judge:{
						trigger:{
							player:'phaseJudgeBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把判定阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					PhaseDraw:{
						trigger:{
							player:'phaseDrawBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把摸牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					Discard:{
						trigger:{
							player:'phaseDiscardBefore'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把弃牌阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
					End:{
						trigger:{
							player:'phaseJieshuBegin'
						},
						filter:function(event,player){
							return !player.hasSkill('mozhaotujiStop');
						},
						prompt:function(){
							return '把结束阶段转换为出牌阶段';
						},
						content:function () {
							lib.skill.mozhaotuji.contentx(trigger,player);
						},
					},
				}
			},
			mozhaotujiStart:{
				trigger:{
					player:['phaseJudgeAfter','phaseDrawAfter','phaseDiscardAfter']
				},
				direct:true,
				filter:function(event,player){
					if((player.getHistory('useCard').length+player.getHistory('respond').length)==0)
						return true;
					else
						return !player.hasSkill('mozhaotujiStop');
				},
				content:function(){
					player.addTempSkill('mozhaotujiStop');
				}
			},
			mozhaotujiStop:{

			},
			fengxue:{
				trigger:{
					player:'phaseUseBefore'
				},
				content:function(){
					'step 0'
					trigger.cancel();
					'step 1'
					event.players=[];
					event.players=game.filterPlayer(function(current){
						return (current!=player)&&current.hp>=player.hp;
					});
					'step 2'
					ui.clear();
					var num;
					num=event.players.length+1;
					var cards=get.cards(num);
					event.cards=cards;
					event.gains=[];
					event.discards=[];
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					game.log(player,'观看了','#y牌堆顶的牌');
					//var content=['牌堆顶的'+event.cards.length+'张牌',event.cards];
					//player.chooseControl('ok').set('dialog',content);
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 3'
					if(!result.links[0]){
						event.finish();
					}
					else{
						var bool=game.hasPlayer(function(current){
							return player.canUse(result.links[0],current);
						});
						if(bool){
							player.chooseUseTarget(result.links[0],true,false);
						}
						else event.discards.push(result.links[0]);
						event.cards.remove(result.links[0]);
					}
					'step 4'
					//player.gain(event.cards,'gain2');
					// if(event.discards.length){
					// 	player.$throw(event.discards);
					// 	game.cardsDiscard(event.discards);
					// }
					ui.clear();
					'step 5'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
					if(event.cards.length==0){
						event.finish();
					}
					'step 6'
					game.cardsGotoOrdering(cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['奋学(获取一种花色牌)',get.cardsInfo(cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('奋学(获取一种花色牌)',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId);
					event.dialog=dialog;
					var chooseButton=player.chooseButton(true,function(button){
						return get.value(button.link,_status.event.player);
					}).set('dialog',dialog.videoId);
					event.chooseButton=chooseButton;
					'step 7'
					if(result.links[0]){
						event.cards.forEach(card => {
							if(get.suit(card)==get.suit(result.links[0])){
								event.gains.push(card);
							}
							else{
								event.discards.push(card);
							}
						});
					}
					if(event.discards.length){
						player.$throw(event.discards);
						game.cardsDiscard(event.discards);
					}
					if(event.gains.length){
						player.gain(event.gains,'gain2');
					}
					'step 8'
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
				},
			},
			yuepi:{
				trigger:{
					player:'phaseDiscardBefore',
				},
				filter:function (event,player){
					return (player.countCards('h')>=player.countCards('e'))&&player.countCards('e')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',player.countCards('e'),true,'请选择重铸的牌');
					'step 1'
					player.lose(result.cards, ui.discardPile);
					player.$throw(result.cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
					'step 2'
					player.draw(player.countCards('e'));
					player.addTempSkill('yuepi_handLimit');
				},
				subSkill:{
					handLimit:{
						mod:{
							maxHandcard:function (player,num){
								return num+player.countCards('e');
							},
						}
					}
				}
			},
			cangxiong:{
				trigger:{
					global:'changeHp'
				},
				filter:function (event,player){
					if(!event.player||event.player==player||player.countCards('h')==0) return false;
					return event.player.hp==1;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',[1,Infinity],true,'请选择要给对方的牌');
					'step 1'
					if(result.cards){
						trigger.player.gain(result.cards,player,'giveAuto');
					}
					'step 2'
					if(trigger.player.countCards('h')>player.countCards('h')){
						if(player.storage.outPlayers==null){
							player.storage.outPlayers=[];
						}
						player.storage.outPlayers.push(trigger.player);
						trigger.player.addTempSkill('cangxiong_diao',{target:'phaseBegin'});//移除游戏
						trigger.player.out('cangxiong_diao');
					}
				},
				subSkill:{
					diao:{
						trigger:{player:'phaseBegin'},
						mark:true,
						direct:true,
						filter:function(event,player){
							player.in('cangxiong_diao');
							//
							return true;
						},
						intro:{
							content:'移除游戏外'
						},
						content:function(){
							player.removeSkill('cangxiong_diao');
						}
					},
				}
			}
        },
        translate:{
            MononobeAlice:'物述有栖',
            fuheijs:'腹黑JS',
            fuheijs_info:'出牌阶段，你可以弃置一张手牌，选择转移或者弃置任意一名角色装备的装备牌',
            leiyan:'雷言',
            leiyan_info:'锁定技。你的［雷杀］可以指定1-3个目标，并无视角色防具',
            xiaozhangduandai:'嚣张缎带',
            xiaozhangduandai_info:'觉醒技。当你处于濒死状态时，立即恢复3点体力，摸3张牌并获得技能（咏春）',
            yongchun:'咏春',
			yongchun_info:'你在出牌阶段使用［杀］时，可以摸一张牌，并弃置一张手牌，令此［杀］不计入出牌阶段的使用次数',
			tinenghuifu1:'体能恢复',
			tinenghuifu1_info:'锁定技。当你失去一张装备牌后，你回复 1 点体力。当你的体力值减少后，你摸一张牌。',
			dianmingguzhen:'电鸣鼓震',
			dianmingguzhen_info:'出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你视为对对应装备栏内没有装备的所有角色使用一张雷【杀】；然后你可以为抵消此【杀】的角色追加一次【闪电】判定。',
			ShizukaRin:'静凛',
			mozhaotuji:'魔爪突击',
			mozhaotuji_info:'回合内，你可以将任意阶段连续的变为出牌阶段，直到你有出牌阶段未使用过牌。你使用过两张或更多牌的阶段结束时，你摸一张牌。',
			IenagaMugi:'家长麦',
			fengxue:'奋学',
			fengxue_info:'你可以跳过出牌阶段，亮出牌堆顶的X+1张牌，使用其中一张牌，然后获得其中一种花色的牌，弃置其余的牌。（X为体力值不小于你的角色数）',
			yuepi:'乐癖',
			yuepi_info:'弃牌阶段开始时，你可以重铸等同于你装备区牌数的手牌，令你在本阶段增加等量的手牌上限。',
			cangxiong:'藏兄',
			cangxiong_info:'其他角色的体力值变为1后，你可以交给其任意手牌，然后若其手牌数大于你，其视为不存在直到其回合开始。',
        }
    }
}
)