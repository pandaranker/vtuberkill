'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'vtuber',
        connect:true,
		character:{
            /**绊爱 */
			KizunaAI:['female','qun',4,['ailian','qixu'],['zhu']],
			/**犬山 */
			InuyamaTamaki:['male','key',3,['rongyaochengyuan','hundunliandong']],
			/**小希小桃 */
			XiaoxiXiaotao:['male','qun',3,['yipengyidou','renleiguancha']],
		},
        characterIntro:{
			KizunaAI:'绊爱',
			InuyamaTamaki:'犬山玉姬',
			XiaoxiXiaotao:'小希小桃'
        },
		skill:{
            ailian:{
				enable:'phaseUse',
				position:'h',
				filter:function(event,player){
					if(player.hasSkill('ailianUsable')) return false;
                    return player.countCards('h')>0;
                },
                content: function(){
					var trigger=_status.event;
					'step 0'
					if(!player.storage.targets) player.storage.targets=[];
					if(player.countCards('h')>0)
					{
                        player.chooseTarget('指定一个给予牌的目标',function(card,player,target){
                            //get.distance(target,current,'pure')==1
							if(target==player) return false;
							//window.console.log(player.storage);get.distance(target,player.storage.targets[i],'pure')<=1
                            if(player.storage.targets){
								if(player.storage.targets.length==0) return true;
                                for(var i =0; i< player.storage.targets.length;i++){
									if(player.storage.targets[i].group==target.group){
										return false;
									}
                                }
								return true
							}
							else{
								return true
							}
                            return false;
                        });
                    }
                    else{
                        event.goto(3);
                    }
					'step 1'
					//console.log(result);
                    if(result&&result.bool==false){
                        event.goto(3);
                    }
                    else{
                        if(result.targets){
							if(!player.storage.targets) player.storage.targets=[];
                            if(!trigger.targets.contains(result.targets[0])){
                                trigger.targets.addArray(result.targets);
                                player.storage.targets.addArray(result.targets);
                            }
                            trigger.target=result.targets[0];
                        }
                        player.chooseCard(true, 'h', '选择要给出的牌',[1,Infinity]);
                    }
                    'step 2'
                    if(result.bool==true){
                        trigger.cards.addArray(result.cards);
					    trigger.target.gain(result.cards,event.player,'give');
                        if(player.countCards('h')){
                            event.goto(0);
                        }
                    }
                    else{
						trigger.targets.pop();
                        player.storage.targets.pop();
                    }
					'step 3'
                    var difType=true;
                    var TypeList=[];
					if(trigger.targets&&trigger.targets.length>0){
						for(var i=0;i<trigger.cards.length;i++){
							TypeList.add(get.type(trigger.cards[i]));
							if(TypeList.indexOf(get.type(trigger.cards[i]))!=i){
								difType=false;
								break;
							}
						}
					}
					else{
						event.goto(10);
					}
                    if(difType==false){
                        event.goto(6);
                    }
                    'step 4'
					player.chooseTarget('是否令'+ trigger.cards.length.toString() +'名角色横置？',trigger.cards.length,function(card,player,target){
                        return true;
                    });
                    'step 5'
                    if(result.bool==true){
                        result.targets.forEach(element => {
                           element.link(); 
                        });
                    }
                    'step 6'
                    var distanceGroup=false;
                    for(var i=0;i<trigger.targets.length;i++){
						distanceGroup=false;
						for(var j=0;j<trigger.targets.length;j++){
							if(i==j){
								continue;
							}
							else if(get.distance(player.storage.targets[i],player.storage.targets[j],'pure')==1){
								distanceGroup=true;
								break;
							}
						}
						if(distanceGroup==false){
							break;
						}
                    }
                    if(distanceGroup==false){
                        event.goto(10);
                    }
					'step 7'
					if(trigger.targets.length>1){
						if(trigger.targets.length>game.countPlayer()-1)
							player.chooseControl(['jiu','tao','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
						else{
							var playersNum=0;
							for(var i=0;i<game.players.length;i++){
								if(lib.filter.filterTarget({name:'sha',isCard:true},player,game.players[i])){
									playersNum++;
								}
							}
							// console.log(lib.filter.filterTarget({name:'sha',isCard:true},player,game.players[0]));
							if(playersNum>=trigger.targets.length&&player.getCardUsable({name:'sha'}))
								player.chooseControl(['jiu','sha','tao','leisha','huosha','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
							else
								player.chooseControl(['jiu','tao','cancel2']).set('prompt','是否视为对'+ trigger.targets.length.toString() +'名角色使用一次基本牌？');
						}
					}
					else{
                        event.goto(10);
					}
                    'step 8'
                    if(result.control!='cancel2'){
                        var usecard={name:result.control,isCard:true};
                        switch (usecard.name) {
                            case 'huosha':
                                usecard.name='sha';
                                usecard.nature='fire';
                                break;
                            case 'leisha':
                                usecard.name='sha';
                                usecard.nature='thunder';
                                break;
                            default:
                                break;
                        }
						trigger.usecard=usecard;
						if(trigger.usecard.name=='sha'){
							player.chooseTarget('选择'+ trigger.targets.length.toString() +'个目标',trigger.targets.length,function(card,player,target){
								if(player==target) return false;
								return lib.filter.filterTarget({name:'sha',isCard:true},player,target)
							});
						}
						else if(trigger.usecard.name!='sha'){
							player.chooseTarget('选择'+ trigger.targets.length.toString() +'个目标',trigger.targets.length,function(card,player,target){
								return true;
							});
						}
						else{
							event.goto(10);
						}
                    }
                    else{
                        event.goto(10);
                    }
                    'step 9'
					//console.log(result);
					if(result.targets)
						trigger.targets=result.targets;
					else
						trigger.targets=[];
                    for(var i=0;i<trigger.targets.length;i++){
                        //console.log(trigger.usecard);
						player.useCard(trigger.usecard,trigger.targets[i],false);
						if(trigger.usecard.name=='sha') player.getStat().card.sha++;
						// console.log(player.getStat().card.sha);
                    }
					'step 10'
					if(trigger.targets&&trigger.targets.length==0&&trigger.cards.length==0){
						if(player.hasSkill('ailianUsable'))
							player.removeSkill('ailianUsable');
					}
					else{
						player.addSkill('ailianUsable');
						delete player.storage.targets;
						event.finish();
					}
                }
			},
			ailianUsable:{
				trigger:{global:['phaseUseAfter','phaseAfter']},
				silent:true,
				filter:function(event){
					return event.skill!='ailian';
				},
				content:function(){
					player.removeSkill('ailianUsable');
				}
			},
			qixu:{
				unique:true,
				group:['qixu1','qixu2','qixu4'],
				zhuSkill:true,
			},
			qixu1:{
				trigger:{player:['chooseToRespondBefore']},
				check:function(event){
					if(event.qixu) return false;
					return true;
				},
				filter:function(event,player){
					if(event.responded) return false;
					//if(player.storage.qixuing) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu3')) return false;
					if(!event.filterCard({name:'sha'},player,event)) return false;
					return game.hasPlayer(function(current){
						return current!=player;
					});
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addSkill('qixu3');
						event.getParent(2).step=0;
						event.finish();
					}
					else if(event.current){
						//player.storage.qixuing=true;
						var next=event.current.chooseCard(get.translation(player)+'声明使用一张杀，是否替弃置一张杀阻止',
						function(card,player,event){
							event=event||_status.event;
							return card.name=='sha';
						},{name:'sha'},1);
						next.set('ai',function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)+1);
						});
						next.set('source',player);
						next.set('qixu',true);
						next.set('skillwarn','阻止'+get.translation(player)+'打出一张杀');
						next.noOrdering=true;
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					//player.storage.qixuing=false;
					if(!result.bool){
						event.current=event.current.next;
						if(event.current==player){
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					else{
						event.current.discard(result.cards);
						event.finish();
					}
					'step 2'
					trigger.result={bool:true,card:{name:'sha',isCard:true}};
					trigger.responded=true;
					trigger.animate=false;
					player.addSkill('qixu3');
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
					event.finish();
				}
			},
			qixu2:{
				enable:'chooseToUse',
				prompt:'选择一名目标角色。若其他角色不弃置【杀】响应，则视为你对其使用【杀】。',
				filter:function(event,player){
					if(event.filterCard&&!event.filterCard({name:'sha'},player,event)) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu3')) return false;
					if(!lib.filter.cardUsable({name:'sha'},player)) return false;
					return game.hasPlayer(function(current){
						return current!=player;
					});
				},
				filterTarget:function(card,player,target){
					if(_status.event._backup&&
						typeof _status.event._backup.filterTarget=='function'&&
						!_status.event._backup.filterTarget({name:'sha'},player,target)){
						return false;
					}
					return player.canUse({name:'sha'},target);
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addSkill('qixu3');
						event.getParent(2).step=0;
						event.finish();
					}
					else if(event.current){
						var next=event.current.chooseCard(get.translation(player)+'对'+get.translation(target)+'使用一张杀，是否替弃置一张杀阻止',
						function(card,player,event){
							event=event||_status.event;
							return card.name=='sha';
						},{name:'sha'},1);
						next.set('ai',function(card){
							var event=_status.event;
							return get.effect(event.target,card,event.source,event.player);
						});
						next.set('source',player);
						next.set('target',target);
						next.set('qixu',true);
						next.set('skillwarn','阻止'+get.translation(player)+'打出一张杀');
						//next.noOrdering=true;
						//next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					if(result.bool){
						player.addSkill('qixu3');
						event.current.discard(result.cards);
						event.finish();
					}
					else{
						event.current=event.current.next;
						if(event.current==player){
							player.addSkill('qixu3');
							event.getParent(2).step=0;
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					'step 2'
					if(result.cards&&result.cards.length){
						player.useCard({name:'sha',isCard:true},result.cards,target).animate=false;
					}
					else{
						player.useCard({name:'sha',isCard:true},target).animate=false;
					}
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
				},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.hasZhuSkill('qixu')) return false;
						return true;
					},
					result:{
						target:function(player,target){
							if(player.hasSkill('qixu3')) return 0;
							return get.effect(target,{name:'sha'},player,target);
						}
					},
					order:function(){
						return get.order({name:'sha'})-0.1;
					},
				}
			},
			qixu3:{
				trigger:{
					global: 'roundStart'
				},
				mark:true,
				intro:{content:'一轮后重置(杀)'},
				silent:true,
				// filter:function(event){
				// 	return event.skill!='qixu2'&&event.skill!='qixu4';
				// },
				content:function(){
					player.removeSkill('qixu3');
				}
			},
			qixu4:{
				unique:true,
				trigger:{player:['chooseToRespondBefore','chooseToUseBefore']},
				filter:function(event,player){
					if(event.responded) return false;
					//if(player.storage.qixu4) return false;
					if(!player.hasZhuSkill('qixu')) return false;
					if(player.hasSkill('qixu5')) return false;
					if(!event.filterCard({name:'shan'},player,event)) return false;
					return true;
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.goto(2);
					}
					else if(event.current){
							//player.storage.qixu4=true;
							// var next=event.current.chooseToDiscard('弃置一张闪阻止'+get.translation(player)+'发动技能？',{name:'shan'},
							// function(card,player,event){
							// 	event=event||_status.event;
							// 	return card.name=='shan';
							// },1);
							var next=event.current.chooseCard(get.translation(player)+'声明使用一张闪，是否替弃置一张闪阻止',{name:'shan'},
							// function(card,player,event){
							// 	return card.name=='shan';
							// },
							1,false);
							// next.set('ai',function(card){
							// 	var event=_status.event;
							// 	return get.effect(event.target,card,event.event.source,event.player);
							// });
							next.set('ai',function(){
								var event=_status.event;
								return (3-get.attitude(event.player,event.source));
							});
							next.set('skillwarn','阻止'+get.translation(player)+'技能生效');
							next.autochoose=lib.filter.autoRespondShan;
							next.set('source',player);
					}
					"step 1"
					//player.storage.qixu4=false;
					console.log(result);
					if(result.bool){
						event.current.discard(result.cards);
						event.finish();
					}
					else{
						event.current=event.current.next;
						if(event.current==player){
							event.goto(2);
						}
						else{
							event.goto(0);
						}
					}
					'step 2'
					trigger.result={bool:true,card:{name:'shan',isCard:true}};
					trigger.responded=true;
					trigger.animate=false;
					//player.addSkill('qixu3');
					if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
						event.current.ai.shown+=0.3;
						if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
					}
					event.finish();
				},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(player.storage.qixu) return false;
						if(!player.hasZhuSkill('qixu')) return false;
						return true;
					},
				},
			},
			qixu5:{
				trigger:{
					global: 'roundStart'
				},
				mark:true,
				intro:{content:'一轮后重置(闪)'},
				silent:true,
				// filter:function(event){
				// 	return event.skill!='qixu2'&&event.skill!='qixu4';
				// },
				content:function(){
					player.removeSkill('qixu5');
				}
			},
			rongyaochengyuan:{
				trigger:{
					player:"damageBegin3",
				},
				//alter:true,
				filter:function (event,player){
					if(event.source==undefined) return false;
					if(event.source.hasSkill('rongyaochengyuan_homolive')) return false;
					return true;
				},
				forced:true,
				content:function (){
					'step 0'
					player.chooseBool('是否发动技能,给目标添加homolive标记,并抵挡此次伤害');
					'step 1'
					if(result.bool){
						trigger.source.addSkill('rongyaochengyuan_homolive');
					}
					else{
						event.finish();
					}
					'step 2'
					trigger.num=0;
				},
				subSkill:{
					homolive:{
						mark:true,
						marktext:'HO',
						intro:{
							name:'Homolive',
							content:'我一直都是Homolive的一员啊！'
						},
					},
				},
			},
			hundunliandong:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					if(player.storage.targets==null) {
						player.storage.targets=[];
						player.storage.targets.add(player);
					}
					if(event.dropCardsType==null){
						event.dropCardsType=[];
						event.dropCards=[];
						event.playerIndex=0;
						event.dialogId=0;
					}
					player.chooseTarget('指定一个不同势力目标参与联动',function(card,player,target){
						//get.distance(target,current,'pure')==1
						if(target==player) return false;
						//window.console.log(player.storage);get.distance(target,player.storage.targets[i],'pure')<=1
						if(player.storage.targets){
							if(player.storage.targets.length==0) return true;
							if(target.hasSkill('rongyaochengyuan_homolive')){
								for(var i =0; i< player.storage.targets.length;i++){
									if(player.storage.targets[i].hasSkill('rongyaochengyuan_homolive')){
										return false;
									}
								}
								return true;
							}
							for(var i =0; i< player.storage.targets.length;i++){
								if(player.storage.targets[i].group==target.group){
									return false;
								}
							}
							return true
						}
						else{
							return true
						}
						return false;
					});
					'step 1'
					if(result&&result.bool==false){
						event.goto(2);
					}
					else{
						player.storage.targets.add(result.targets[0]);
						event.goto(0);
					}
					'step 2'
					if(player.storage.targets.length>0){
						if(player.storage.targets[event.playerIndex].countCards('hj')){
							event.handcardsCount= player.storage.targets[event.playerIndex].countCards('h');
							player.storage.targets[event.playerIndex].chooseToDiscard(true,1,'弃置一张牌');
						}
						else{
							event.handcardsCount=-1;
						}
					}
					else{
						event.goto(4);
					}
					'step 3'
					if(event.handcardsCount!=-1){
						if(player.storage.targets[event.playerIndex].countCards('h')==0&&event.handcardsCount!=0){
							event.goto(4);
						}
						else{
							if(result.cards&&result.cards.length){
								event.dropCards.add(result.cards[0]);
								if(!event.dropCardsType.contains(get.suit(result.cards[0]))){
									event.dropCardsType.add(get.suit(result.cards[0]));
								}
							}
							///显示当前弃牌框，待改进
							ui.clear();
							for(var i=0;i<ui.dialogs.length;i++){
								if(ui.dialogs[i].videoId==event.dialogId){
									var dialog=ui.dialogs[i];
									dialog.close();
									_status.dieClose.remove(dialog);
									break;
								}
							}
							game.broadcast(function(id){
								var dialog=get.idDialog(id);
								if(dialog){
									dialog.close();
									_status.dieClose.remove(dialog);
								}
							},event.dialogId);
							var dialog=ui.create.dialog('混沌联动',event.dropCards,true);
							_status.dieClose.push(dialog);
							dialog.videoId=lib.status.videoId++;
							game.broadcast(function(cards,id){
								var dialog=ui.create.dialog('混沌联动',cards,true);
								_status.dieClose.push(dialog);
								dialog.videoId=id;
							},event.dropCards,dialog.videoId);
							event.dialogId=dialog.videoId;
							///显示当前弃牌框，待改进
							if(event.dropCardsType.length>2){
								event.goto(4);
							}
							else{
								event.playerIndex++;
								if(event.playerIndex>=player.storage.targets.length){
									event.playerIndex=0;
								}
								event.goto(2);
							}
						}
					}
					else{
						player.storage.targets.splice(event.playerIndex,1);
						if(event.playerIndex<player.storage.targets.length){
							event.goto(2);
						}
						else{
							event.playerIndex=0;
							event.goto(2);
						}
					}
					'step 4'
					delete player.storage.targets;
					///显示当前弃牌框，待改进
					ui.clear();
					for(var i=0;i<ui.dialogs.length;i++){
						if(ui.dialogs[i].videoId==event.dialogId){
							var dialog=ui.dialogs[i];
							dialog.close();
							_status.dieClose.remove(dialog);
							break;
						}
					}
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialogId);
					event.finish();
				}
			},
			yipengyidou:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target);
					"step 1"
					event.resultBool=result.bool;
					event.loop=true;//循环一次（询问是否发动效果后）
					event.cards=[];
					"step 2"
					game.getGlobalHistory('cardMove',function(evt){
						if(evt==trigger||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
						if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
						for(var i=0;i<evt.cards.length;i++){
							var card=evt.cards[i];
							if(get.type(card)!='equip'&&get.type(card)!='delay'&&!get.info(card).multitarget&&get.info(card).name!='shan'){
								if((event.loop&&event.resultBool)||(!event.loop&&!event.resultBool)){
									if(game.hasPlayer(function(current){
										return player.canUse(card,current);
									})){
									event.cards.add(card);
									}
								}
								else if((event.loop&&!event.resultBool)||(!event.loop&&event.resultBool)){
									if(game.hasPlayer(function(current){
										return event.target.canUse(card,current);
									})){
									event.cards.add(card);
									}
								}
							}
						}
					},trigger);
					game.cardsGotoOrdering(event.cards).relatedEvent=event.getParent();
					var dialog=ui.create.dialog('一捧一逗',event.cards,true);
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['一捧一逗',get.cardsInfo(event.cards),dialog.videoId]);
					event.getParent().preResult=dialog.videoId;
					game.broadcast(function(cards,id){
						var dialog=ui.create.dialog('一捧一逗',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},event.cards,dialog.videoId);
					event.dialog=dialog;
					"step 3"
					if(event.resultBool){
						player.chooseCard(1,'是否将一张牌当其中一张牌打出?');
					}
					else{
						event.target.chooseCard(1,'是否将一张牌当其中一张牌打出?');
					}
					"step 4"
					if(result.bool){
						console.log(result);
						event.viewAsCards=result.cards;
						if(event.resultBool){
							game.log(player,'观看了','#y弃牌堆的牌');
							var chooseButton=player.chooseButton(true,function(button){
								return get.value(button.link,_status.event.player);
							}).set('dialog',event.dialog.videoId);
							event.chooseButton=chooseButton;
						}
						else{
							game.log(event.target,'观看了','#y弃牌堆的牌');
							var chooseButton=event.target.chooseButton(true,function(button){
								return get.value(button.link,_status.event.player);
							}).set('dialog',event.dialog.videoId);
							event.chooseButton=chooseButton;
						}
					}
					else{
						event.goto(6);
					}
					"step 5"
					if(!result.links[0]){
						event.goto(6);
					}
					else{
						if(event.resultBool){
							var bool=game.hasPlayer(function(current){
								return player.canUse(result.links[0],current);
							});
							if(bool){
								//player.chooseUseTarget(result.links[0],true,false);
								console.log(result.links[0]);
								player.chooseUseTarget(result.links[0],event.viewAsCards,true,false).viewAs=true;
							}
						}
						else{
							var bool=game.hasPlayer(function(current){
								return event.target.canUse(result.links[0],current);
							});
							if(bool){
								event.target.chooseUseTarget(result.links[0],event.viewAsCards,true,false).viewAs=true;
							}
						}
					}
					"step 6"
					ui.clear();
					event.dialog.close();
					_status.dieClose.remove(event.dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},event.dialog.videoId);
					if(event.loop){
						event.loop=false;
						event.resultBool=!event.resultBool;
						if(event.resultBool){
							player.chooseBool('同样发动一次效果，或取消使对方回复一点体力');
						}
						else{
							event.target.chooseBool('同样发动一次效果，或取消使对方回复一点体力');
						}
					}
					else{
						event.finish();
					}
					"step 7"
					if(result.bool){
						event.goto(2);
					}
					else{
						if(event.resultBool){
							event.target.recover();
						}
						else{
							player.recover();
						}
					}
				}
			},
			renleiguancha:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					target.addSkill('renleiguancha_mark');
				},
				group:['renleiguancha_phaseStart','renleiguancha_damage','renleiguancha_die'],
				subSkill:{
					mark:{
						mark:true,
						intro:{
							content:'造成或受到伤害，杀死玩家与死亡都被列入了观察项目'
						},
					},
					phaseStart:{
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							console.log(player.hasSkill('renleiguancha_damaged'),player.hasSkill('renleiguancha_dead'),game.filterPlayer(function(current){
								if(current.hasSkill('renleiguancha_mark')){
									current.removeSkill('renleiguancha_mark')
									return true;
								}
								else
									return false
							}).length);
							return player.hasSkill('renleiguancha_damaged')||player.hasSkill('renleiguancha_dead')||game.filterPlayer(function(current){
								if(current.hasSkill('renleiguancha_mark')){
									current.removeSkill('renleiguancha_mark')
									return true;
								}
								else
									return false
							}).length>0
						},
						content:function(){
							'step 0'
							if(!player.hasSkill('renleiguancha_damaged')&&!player.hasSkill('renleiguancha_dead')){
								player.draw(2);
								player.loseHp();
								event.finish();
							}
							'step 1'
							if(player.hasSkill('renleiguancha_damaged')){
								player.draw(1);
								player.removeSkill('renleiguancha_damaged');
							}
							'step 2'
							if(player.hasSkill('renleiguancha_dead')){
								player.removeSkill('renleiguancha_dead');
								player.chooseTarget(1,'对一名角色造成一点伤害');
							}
							else{
								event.finish();
							}
							'step 3'
							if(result.bool){
								console.log(result);
								result.targets[0].damage(player);
							}
						}
					},
					damage:{
						trigger:{global:'damageAfter'},
						forced:true,
						filter:function(event,player){
							if(event.source){
								return event.source.hasSkill('renleiguancha_mark');//||event.player.hasSkill('renleiguancha_mark');
							}
							else
								return false;
								//return event.player.hasSkill('renleiguancha_mark');
						},
						content:function(){
							player.addSkill('renleiguancha_damaged');
						}
					},
					die:{
						trigger:{global:'dieBefore'},
						forced:true,
						filter:function(event,player){
							if(event.source){
								return event.source.hasSkill('renleiguancha_mark')||event.player.hasSkill('renleiguancha_mark');
							}
							else
								return event.player.hasSkill('renleiguancha_mark');
						},
						content:function(){
							player.addSkill('renleiguancha_dead');
						}
					},
					damaged:{
						mark:true,
						marktext:'伤',
						intro:{
							content:'观察目标造成了伤害'
						},
					},
					dead:{
						mark:true,
						marktext:'亡',
						intro:{
							content:'观察目标死亡或杀死过角色'
						},
					}
				}
			}
		},
		translate:{
            KizunaAI:'绊爱',
			KizunaAI_info:'绊爱',
			InuyamaTamaki:'犬山玉姬',
			InuyamaTamaki_info:'犬山玉姬',
			XiaoxiXiaotao:'小希小桃',
			XiaoxiXiaotao_info:'小希小桃',
            ailian:'爱链',
            ailian_info:'出牌阶段限一次，你可以将任意手牌展示并交给势力不重复的其他角色，若给出的牌类型均不同，你可以令等量角色横置；若获得牌的角色互相相邻，你可以视为使用了一张指定目标数等于获得牌角色数的基本牌。',
			qixu:'启虚',
			qixu1:'启虚',
            qixu2:'启虚',
            qixu3:'启虚',
            qixu4:'启虚',
            qixu_info:'主公技。当你需要使用或打出【杀】或【闪】时，你可以声明之，若没有角色弃置一张声明牌，则视为你使用或打出了此牌。每轮每项限一次。',
			rongyaochengyuan:'荣誉成员',
			rongyaochengyuan_info:'其他势力角色对你造成伤害时，若其没有“homolive”标记，你可令其获得一个，然后防止此伤害。',
			hundunliandong:'混沌联动',
			hundunliandong_info:'出牌阶段限一次，你可以指定包括你在内势力各不同的任意名角色，从你开始依次弃一张牌直到：共有三种花色；或有角色因此失去最后一张手牌。此技能计算势力时，拥有“homolive”标记的角色视为同一势力',
			yipengyidou:'一捧一逗',
			yipengyidou_info:'出牌阶段限一次，你可与一名其他角色拼点，赢的角色可以立即将一张牌当本阶段进入弃牌堆的一张基本牌或通常单体锦囊牌使用。然后没赢的角色也可如此做；或令赢的角色回复1点体力。',
			renleiguancha:'人类观察',
			renleiguancha_info:'结束阶段，你可以选择一名其他角色。你的下回合开始时，若该角色在期间：造成过伤害~你摸一张牌；死亡或杀死过角色~你造成1点伤害；以上皆无~你摸两张牌并失去1点体力。'
		},
	};
});
