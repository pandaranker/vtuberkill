'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		character:{
			Paryi:['male','paryi',4,['tiantang','haoren']],
			TakatsukiRitsu:['female','paryi',3,['shengya','liangshan','chongshi']],
			MorinagaMiu:['female','paryi',3,['guanzhai','zhishu']],
			OtomeOto:['female','paryi',3,['xiaogui','qiepian','changxiang'],['zhu']],

			ShirayukiTomoe:['female','nijisanji',4,['gonggan','yeyu']],
			SukoyaKana:['female','nijisanji',3,['huawen','liaohu']],
			Elu:['female','nijisanji',3,['huangran','yinzhen','senhu']],
			SasakiSaku:['female','nijisanji',3,['tiaolian','jiaku']],

		},
		characterSort:{
			yuzu:{
                ParyiPro:['Paryi','TakatsukiRitsu','MorinagaMiu','OtomeOto'],
			}
		},
		characterIntro:{
			Paryi:'kimo~',
			OtomeOto:'5000兆円欲しい！ --乙女おと',
			Civia:'“听我说，DD会带来世界和平~”',
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
							['heart', '', 'heart', 'heart'],
							['diamond', '', 'diamond', 'diamond'],
							['club', '', 'club', 'club'],
							['spade', '', 'spade', 'spade']
						];
						game.broadcastAll(function(id, suitlist){
							var dialog=ui.create.dialog('『天扉』声明');
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
				animationStr:'好人一生',
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
					name:'职业生涯结束',
					content:function (storage,player,skill){
						return '失去【职业生涯】技能直到下个回合开始';
					},
				},
				trigger:{player:'useCardAfter'},
				priority: 998,
				forced:	true,
				filter:function(event,player){
					return player.storage.shengya&&player.isPhaseUsing()&&get.color(event.card)=='red';
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
						player.markSkill('shengya');
					}
				},
				group:'shengya_init',
				subSkill:{
					init:{
						trigger:{player:'phaseBefore'},
						silent: true,
						forced:	true,
						priority: 998,
						content:function(){
							if(!player.storage.shengya){
								player.storage.shengya=true;
								player.unmarkSkill('shengya');
							}
						},
					},
				}
			},
			liangshan:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:"汉",
				locked:true,
				intro:{
					name:'好汉歌',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				trigger:{global:'drawEnd'},
				priority:998,
				filter:function(event,player){
					return event.player!=player&&player==_status.currentPhase&&event.player.getHistory('gain').length==1;
				},
				content:function(){
					var card=game.cardsGotoSpecial(get.cards()).cards[0];
					game.log(player,'将',card,'置于武将牌上');
					player.storage.liangshan.push(card);
					player.$draw(card);
					game.delay();
					player.markSkill('liangshan');
				},
				group:['liangshan_use','liangshan_save'],
				subSkill:{
					use:{
						trigger:{global:'phaseBegin'},
						priority: 998,
						filter:function(event,player){
							return player.storage.liangshan.length;
						},
						content:function(){
							'step 0'
							player.chooseCardButton('交给其一张你武将牌上的牌', 1, player.storage.liangshan);
							'step 1'
							if (result.bool) {
								var card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player,'将',card,'交给了',trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
								player.storage.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}
					},
					save:{
						trigger:{global:'dying'},
						filter:function(event,player){
							return event.player.hp<=0&&player.storage.liangshan.length;
						},
						content:function(){
							'step 0'
							player.chooseCardButton('交给其一张你武将牌上的一张牌', 1, player.storage.liangshan);
							'step 1'
							if (result.bool) {
								var card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player,'将',card,'交给了',trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
								player.storage.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}
					}
				},
			},
			chongshi:{
				trigger:{player:'shaBegin'},
				priority: 998,
				content:function(){
					player.draw();
					trigger.target.draw();
				}
			},
			//miu
			guanzhai:{
				trigger:{global:['phaseEnd']},
				priority:997,
				prompt2:function(event,player){
					var target = event.player;
					return '可以观看其手牌，并获得其中至多'+(target.hasSkill('zhai')?target.countMark('zhai')+1:1)+'张牌';
				},
				filter:function(event,player){
					var history = event.player.getHistory('useCard');
					var num = 0;
					history.forEach(function(his){
						num += his.card.length;
					});
					return event.player!=player&&num<(event.player.hasSkill('zhai')?event.player.countMark('zhai')+2:2);
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player, target){
						player.choosePlayerCard('获得其中至多'+(target.hasSkill('zhai')?target.countMark('zhai')+1:1)+'张牌',target,[1,(target.hasSkill('zhai')?target.countMark('zhai')+1:1)],'h').set('visible', true);
					}, player, trigger.player)
					'step 1'
					if(result.bool){
						player.logSkill('guanzhai',trigger.player)
						player.gain(result.cards,trigger.player,'giveAuto');
					}
				},
			},
			zhai:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				marktext:'宅',
				intro:{
					name:'直往欲女',
					content:function (storage,player,skill){
						return '下个回合中，【阿宅观察】（）内的数值+'+storage+'。';
					},
				},
				mark:true,
				onremove:function(player){
					delete player.storage.zhai;
				},
			},
			zhishu:{
				trigger:{player:['phaseUseBegin','changeHp']},
				priority:997,
				filter:function(event,player){
					return player.countCards('h');
				},
				content:function(){
					'step 0'
					var next=player.chooseCardTarget('h', 1, '选择展示的手牌与目标');
					next.set('filterTarget',function(card,player,target){
						return target!=player;
					});
					next.set('ai2',function(target){
						return 7-get.attitude(player,target);
					})
					'step 1'
					if(result.bool){
						event.target = result.targets[0];
						player.showCards(result.cards,'『直抒』展示手牌');
						game.delay(1);
						game.broadcastAll(function(player,target,suit){
							target.chooseCard('he','交给'+get.translation(player)+'一张花色为'+get.translation(suit)+'的牌',function(card,player){
								return get.suit(card)==suit;
							},)
						}, player, event.target, get.suit(result.cards[0]));
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.gain(result.cards[0],event.target,'giveAuto');
					}else{
						event.target.addTempSkill('zhai',{player:'phaseAfter'});
						event.target.addMark('zhai',1);
						game.log(event.target,'拒绝交给',player,'相同花色的牌');
					}
				}
			},
			//oto
			xiaogui:{
	/*			init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				locked:true,
				notemp:true,
				marktext: '玉',
				intro: {
					content: 'cards',
					name:'以『玉匣』使用过的锦囊牌',
				},*/
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>=3;
				},
				filterCard:true,
				discard:false,
				selectCard:3,
				position:'he',
				content:function(){
					'step 0'
	//				player.logSkill('xiaogui');
					player.lose(cards,ui.ordering).set('visible', true);
					console.log(cards)
					event.cards = cards;
					event.videoId = lib.status.videoId++;
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var reapeat = 0;
						if(reapeat||name=='wuxie'||name=='jinchan') continue;
						else if(get.type(name)=='trick') list.push(['锦囊','',name]);
					}
					game.broadcastAll(function(id, list){
						var dialog=ui.create.dialog('使用一张锦囊牌',[list,'vcard']);
						dialog.videoId = id;
					}, event.videoId, list);
					'step 1'
					var next = player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if (result.bool){
						var card = result.links[0];
						player.chooseUseTarget({name:card[2]},true);
		/*				player.storage.xiaogui.add(game.createCard(card[2]));
						player.syncStorage('xiaogui');
						player.markSkill('xiaogui');*/
					}
					'step 3'
					game.broadcastAll(function(player,cards){
						player.chooseCardButton([0,3],true,cards,'『玉匣』：可以按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
							return get.value(button.link);
						});
					}, player, event.cards);
					'step 4'
					if(result.bool){
						var list=result.links.slice(0);
						if(list.length<3){
							event.cards.removeArray(list);
						}
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
						game.log(player,'将牌放在牌堆顶')
						if(event.cards.length){
							game.cardsDiscard(event.cards);
							game.log(event.cards,'进入了弃牌堆')
						}
					}else{
						game.cardsDiscard(event.cards);
						game.log(event.cards,'进入了弃牌堆')
					}
				},
				group:['xiaogui_wuxie','xiaogui_after'],
				subSkill:{
					wuxie:{
		/*				init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = true;
						},*/
						enable:'chooseToUse',
						viewAs:{name:'wuxie'},
						filterCard:true,
						position:'he',
						selectCard:3,
						viewAsFilter:function(player){
							return player.countCards('he')>=3;
						},
						check:function(card){
							return 6-get.value(card);
						},
						prompt:'将三张牌当【无懈可击】使用',
						onuse:function(result,player){
		/*					player.storage.xiaogui_wuxie = false;
							player.storage.xiaogui.add(game.createCard({name:'wuxie'}));
							player.syncStorage('xiaogui');
							player.markSkill('xiaogui');*/
						},
					},
					after:{
						trigger:{player:'useCardAfter'},
						priority:66,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return event.card.name=='wuxie'&&event.cards.length==3&&event.skill=='xiaogui_wuxie';
						},
						content:function(){
							'step 0'
							event.cards = trigger.cards;
							game.broadcastAll(function(player,cards){
								player.chooseCardButton([0,3],true,cards,'『玉匣』：可以按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
									return get.value(button.link);
								});
							}, player, event.cards);
							'step 1'
							if(result.bool){
								var list=result.links.slice(0);
								if(list.length<3){
									event.cards.removeArray(list);
								}
								while(list.length){
									ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
								}
								game.log(player,'将牌放在牌堆顶')
								if(event.cards.length){
									game.cardsDiscard(event.cards);
									game.log(event.cards,'进入了弃牌堆')
								}
							}else{
								game.cardsDiscard(event.cards);
								game.log(event.cards,'进入了弃牌堆')
							}
						}
					}
		/*			jinchan:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = true;
						},
						enable:['chooseToRespond','chooseToUse'],
						viewAs:{name:'jinchan'},
						position:'he',
						selectCard:3,
						viewAsFilter:function(player){
							return player.storage.xiaogui_jinchan&&player.countCards('he')>=3;
						},
						check:function(card){
							return 6-get.value(card);
						},
						prompt:'将三张牌当【金蝉脱壳】使用',
						onuse:function(result,player){
							player.storage.xiaogui_jinchan = true;
							player.storage.xiaogui.add(game.createCard({name:'jinchan'}));
							player.syncStorage('xiaogui');
							player.markSkill('xiaogui');
						},
					},*/
				},
			},
			qiepian:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				group:['qiepian_start','qiepian_end'],
				subSkill:{
					start:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						locked:true,
						notemp:true,
						marktext: '崛',
						intro: {
							content: 'cards',
							name:'以『连崛』使用过的锦囊牌',
						},
						trigger:{player:'phaseBefore'},
						firstDo:true,
						forced:true,
						silent:true,
						popup:false,
						priority:66,
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.storage.qiepian = player.countCards('h');
						},
					},
					end:{
						trigger:{player:'phaseEnd'},
						priority:66,
						filter:function(event,player){
							return /*(player.storage.qiepian-player.countCards('h'))&&*/(Math.abs(player.storage.qiepian-player.countCards('h'))%3==0);
						},
						content:function(){
							'step 0'
							player.chooseControlList(['令至多三名角色各摸一张牌','视为使用一张未以此使用过的通常锦囊牌'],function(){
								return 1;
							});
							'step 1'
							switch(result.index){
								case 0: {
									player.chooseTarget([1,3],'令至多三名角色各摸一张牌').set('ai',function(target){
										var att=get.attitude(_status.event.player,target);
										if(att>1){
											return att;
										}
										return 0;
									});
									event.goto(2);
									break;
								}
								case 1: {
									event.videoId = lib.status.videoId++;
									var list=[];
									for(var i=0;i<lib.inpile.length;i++){
										var name=lib.inpile[i];
										var reapeat = 0;
										if(player.storage.qiepian_start.length){
											player.storage.qiepian_start.forEach(function(his){	
												if(get.name(his)==name) reapeat ++;
											});
										}
								/*		if(player.storage.xiaogui.length){
											player.storage.xiaogui.forEach(function(his){	
												if(get.name(his)==name) reapeat ++;
											});
										}*/
										if(reapeat||name=='wuxie'||name=='jinchan') continue;
										else if(get.type(name)=='trick') list.push(['锦囊','',name]);
									}
									game.broadcastAll(function(id, list){
										var dialog=ui.create.dialog('使用一张未以此使用过的通常锦囊牌',[list,'vcard']);
										dialog.videoId = id;
									}, event.videoId, list);
									event.goto(3);
									break;
								}
							}
							'step 2'
							if(result.targets&&result.targets.length){
								console.log('OK');
								result.targets.forEach(function(tar){
									tar.draw();
								});
							}
							event.finish();
							'step 3'
							var next = player.chooseButton(1 ,true);
							next.set('dialog',event.videoId);
							'step 4'
							game.broadcastAll('closeDialog', event.videoId);
							if (result.bool){
								var card = result.links[0];
								player.chooseUseTarget({name:card[2]},true);
								player.storage.qiepian_start.add(game.createCard(card[2]));
								player.syncStorage('qiepian_start');
								player.markSkill('qiepian_start');
							}
						},
					},
				},
			},
			changxiang:{
				zhuSkill:true,
				trigger:{global:'dying'},
				priority:66,
				filter:function(event,player){
					if(!player.hasZhuSkill('renjiazhizhu')) return false;
					return event.player.hp<=0&&event.player!=player&&event.player.group==player.group&&player.countCards('he')>=player.hp;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(player.hp);
					'step 1'
					if(result.bool)
					player.useCard({name:'tao'},trigger.player);
				}
		//		viewAsFilter:function(player){
		//			return player.countCards('he')>=player.hp;
		//		},
			},

			//tmsk
			gonggan:{
				trigger:{global:'phaseBegin'},
				priority:23,
				popup:false,
				filter:function(event,player){
					return event.player!=player&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h');
					'step 1'
					if(result.bool){
						player.logSkill('gonggan', trigger.player);
						event.card = result.cards[0];
						player.showHandcards('『奇癖共感』展示手牌');
						game.delay(1);
					}else{
						event.finish();
					}
					'step 2'
					var suitlist = [
						['heart', '', 'heart', 'heart', 'div2'],
						['diamond', '', 'diamond', 'diamond', 'div2'],
						['club', '', 'club', 'club', 'div2'],
						['spade', '', 'spade', 'spade', 'div2']
					];
					game.broadcastAll(function(id, suitlist){
						var dialog=ui.create.dialog('奇癖共感 声明');
						dialog.addText('花色');
						dialog.add([suitlist, 'vcard']);
						dialog.videoId = id;
					}, event.videoId, suitlist);
					'step 3'
					var next = trigger.player.chooseButton(1 ,true);
					next.set('dialog',event.videoId);
					'step 4'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						player.storage.gonggan = result.links[0][2];
						game.log(trigger.player,'猜测为',player.storage.gonggan)
					}else{
						event.finish();
					}
					'step 5'
					if(player.storage.gonggan==get.suit(event.card)){
						trigger.player.gain(event.card,player,'giveAuto');
						var suit = 'gonggan_'+get.suit(event.card);
						player.addTempSkill('gonggan_num'+get.number(event.card));
						player.addTempSkill(suit);
					}else{
						player.addTempSkill('gonggan_num12');
					}
				},
				subSkill:{
					heart:{
						marktext:'♥',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♥',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='heart') return 'heart';
							},
						}
					},
					spade:{
						marktext:'♠',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♠',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='spade') return 'spade';
							},
						}
					},
					diamond:{
						marktext:'♦',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♦',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='diamond') return 'diamond';
							},
						}
					},
					club:{
						marktext:'♣',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为♣',
						},
						mod:{
							suit:function(card,suit){
								if(suit!='club') return 'club';
							},
						}
					},
					num1:{
						marktext:'1',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为1',
						},
						mod:{
							number:function(card,number){
								return number=1;
							},
						},
					},
					num2:{
						marktext:'2',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为2',
						},
						mod:{
							number:function(card,number){
								return number=2;
							},
						},
					},
					num3:{
						marktext:'3',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为3',
						},
						mod:{
							number:function(card,number){
								return number=3;
							},
						},
					},
					num4:{
						marktext:'4',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为4',
						},
						mod:{
							number:function(card,number){
								return number=4;
							},
						},
					},
					num5:{
						marktext:'5',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为5',
						},
						mod:{
							number:function(card,number){
								return number=5;
							},
						},
					},
					num6:{
						marktext:'6',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为6',
						},
						mod:{
							number:function(card,number){
								return number=6;
							},
						},
					},
					num7:{
						marktext:'7',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为7',
						},
						mod:{
							number:function(card,number){
								return number=7;
							},
						},
					},
					num8:{
						marktext:'8',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为8',
						},
						mod:{
							number:function(card,number){
								return number=8;
							},
						},
					},
					num9:{
						marktext:'9',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为9',
						},
						mod:{
							number:function(card,number){
								return number=9;
							},
						},
					},
					num10:{
						marktext:'10',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为10',
						},
						mod:{
							number:function(card,number){
								return number=10;
							},
						},
					},
					num11:{
						marktext:'J',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为J',
						},
						mod:{
							number:function(card,number){
								return number=11;
							},
						},
					},
					num12:{
						marktext:'Q',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为Q',
						},
						mod:{
							number:function(card,number){
								return number=12;
							},
						},
					},
					num13:{
						marktext:'K',
						mark:true,
						locked:true,
						intro:{
							name:'奇癖共感',
							content:'手牌视为K',
						},
						mod:{
							number:function(card,number){
								return number=13;
							},
						},
					},
				},
			},
			yeyu:{
				group:['yeyu_sha','yeyu_trick'],
				subSkill:{
					sha:{
						trigger:{global:'useCard2'},
						priority:23,
						popup:false,
						filter:function(event,player){
							if(event.player==player||get.name(event.card)!='sha')	return false;
							return (get.name(event.card)=='sha');
						},
						prompt2:'你可以弃置一张点数大于此【杀】的牌取消之',
						content:function(){
							'step 0'
							var next=player.chooseToDiscard('he','弃置一张点数大于此【杀】的牌取消之');
							next.set('filterCard',function(card,player){
								return get.number(card,player)>_status.event.num;
							});
							next.set('num',get.number(trigger.card))
							'step 1'
							if(result.bool){
								player.logSkill('yeyu',trigger.player);
								trigger.cancel();
							}
						},
					},
					trick:{
						trigger:{global:'useCard2'},
						priority:23,
						popup:false,
						filter:function(event,player){
							if(event.player==player||get.type(event.card)!='trick')	return false;
							return (get.type(event.card)=='trick');
						},
						prompt2:'你可以重铸一张梅花牌为之增加或减少一名目标',
						content:function(){
							'step 0'
							var next=player.chooseCard('he','重铸一张梅花牌');
							next.set('filterCard',function(card,player){
								return get.suit(card,player)=='club';
							});
							'step 1'
							if(result.bool){
								player.logSkill('yeyu');
								player.lose(result.cards, ui.discardPile).set('visible', true);
								player.$throw(result.cards);
								game.log(player, '将', result.cards, '置入了弃牌堆');
								player.draw();
								_status.event.player = trigger.player;
								var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
								game.broadcastAll(function(player,trigger,prompt2){
									player.chooseTarget(get.prompt('yeyu'),function(card,player,target){
										var player = _status.event.player;
										if(_status.event.targets.contains(target)) return true;
										return lib.filter.targetEnabled2(_status.event.card,player,target)&&lib.filter.targetInRange(_status.event.card,player,target);
									}).set('prompt2',prompt2).set('targets',trigger.targets).set('card',trigger.card);
								}, player, trigger, prompt2);
								event.goto(2);
							}else{
								event.finish();
							}
							'step 2'
							if(!event.isMine()) game.delayx();
							event.targets=result.targets;
							'step 3'
							if(event.targets){
								player.logSkill('yeyu',event.targets);
								if(trigger.targets.contains(event.targets[0]))	trigger.targets.removeArray(event.targets);
								else trigger.targets.addArray(event.targets);
							}
							event.finish();
						},
					},
				},
			},
			//花那
			huawen:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0&&target.sex == 'female';
				},
				content:function(){
					'step 0'
					player.storage.huawen.add(target);
					event.list1 = player.getCards('h');
					//player.showCards(event.list1,'『花吻交染』展示手牌');
					game.delay(1);
					event.list2 = target.getCards('h');
					//target.showCards(event.list2,'『花吻交染』展示手牌');
					game.delay(1);
					game.broadcastAll(function(id, list1, list2, player, target){
						var dialog=ui.create.dialog('『花吻交染』交换花色、点数、种类相同的牌各一张');
						dialog.addText(get.translation(player)+'的手牌');
						dialog.add([list1, 'card']);
						dialog.addText(get.translation(target)+'的手牌');
						dialog.add([list2, 'card']);
						dialog.videoId = id;
					}, event.videoId, event.list1, event.list2, player, target);
					'step 1'
					game.broadcastAll(function(player){
						var next = player.chooseButton(true).set('visible', true);
						next.set('dialog',event.videoId);
						next.set('selectButton',function(){
							if(ui.selected.buttons.length%2==1)	return [ui.selected.buttons.length+1,ui.selected.buttons.length+1];
							return [0,6];
						});
						next.set('filterButton',function(button){
							if(ui.selected.buttons.length%2==1){
								var now = button.link, pre = ui.selected.buttons[ui.selected.buttons.length-1].link;
								if(event.list1&&event.list1.length&&event.list1.contains(now)&&event.list1.contains(pre))	return false;
								if(event.list1&&event.list2.length&&event.list2.contains(now)&&event.list2.contains(pre))	return false;
								if(ui.selected.buttons.length>2){
									var from = ui.selected.buttons;
									if(from.length>4){
										if((get.type(from[0].link)==get.type(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
										||(get.type(from[2].link)==get.type(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
											return get.number(now)==get.number(pre);
										if((get.number(from[0].link)==get.number(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
										||(get.number(from[2].link)==get.number(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
											return get.type(now)==get.type(pre);
										if((get.number(from[0].link)==get.number(from[1].link)&&get.type(from[2].link)==get.type(from[3].link))
										||(get.number(from[2].link)==get.number(from[3].link)&&get.type(from[0].link)==get.type(from[1].link)))
											return get.suit(now)==get.suit(pre);
									}else{
										if(get.type(from[0].link)==get.type(from[1].link))	return get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre);
										if(get.suit(from[0].link)==get.suit(from[1].link))	return get.type(now)==get.type(pre)||get.number(now)==get.number(pre);
										if(get.number(from[0].link)==get.number(from[1].link))	return get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre);
									}
								}else{
									return (get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre));
								}
								return false;
							}
							return true;
						});
					}, player);
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool){
						var card1 = result.buttons.filter(function(but){
							return event.list1.contains(but.link);
						})
						var card2 = result.buttons.filter(function(but){
							return event.list2.contains(but.link);
						})
						if(card1.length&&card2.length){
							var cards1 = card1.map(function(card){
								return card.link;
							})
							var cards2 = card2.map(function(card){
								return card.link;
							})
							player.gain(cards2,target,'giveAuto').set('visible', true);
							player.draw(cards2.length);
							target.gain(cards1,player,'giveAuto').set('visible', true);
							target.draw(cards1.length);
						}
						if(!card1||card1.length<3){
							player.loseHp();
							target.loseHp();
						}
					}else{
						event.finish();
					}
				},
				group:'huawen_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						priority:23,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							if(player.storage.huawen&&player.storage.huawen.length){
								player.storage.huawen.length = 0;
							}
						}
					}
				},
			},
			liaohu:{
				trigger:{global:'phaseEnd'},
				priority:23,
				filter:function(event,player){
					return player.getStat('damage');
				},
				content:function(){
					if(player.getStat().skill.huawen||0){
						if(player.storage.huawen&&player.storage.huawen.length){
							player.storage.huawen[0].recover();
						}
					}else{
						player.recover();
					}
				},
			},
			//elu
			huangran:{
				trigger:{player:'damageBegin4'},
				priority: 99,
				filter:function(event,player){
					return event.num>=2&&event.nature=='fire'&&game.hasPlayer(function(cur){
						return cur!=player&&get.distance(player,cur)<=1;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget('###『煌燃』###选择一名角色与自己平摊伤害',function(card,player,target){
						return target!=player&&get.distance(player,target)<=1;
					});
					'step 1'
					if(result.bool){
						if(trigger.num%2==0){
							trigger.num/=2;
							result.targets[0].damage(trigger.num,trigger.source,'fire');
							event.finish();
						}else{
							trigger.num--;
							trigger.num/=2;
							result.targets[0].damage(trigger.num,trigger.source,'fire');
							player.chooseTarget(true,'###『煌燃』###分配多余的一点伤害');
						}
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						result.targets[0].damage(1,trigger.source,'fire');
					}
				},
				group:'huangran_drawBy',
				subSkill:{
					drawBy:{
						trigger:{global:'damageEnd'},
						priority: 99,
						forced:true,
						filter:function(event,player){
							if(event.player.hasSkill('huangran_shao')) 	return false;
							console.log(event)
							return event.nature=='fire'&&event.getParent().name=='huangran';
						},
						content:function(){
							player.draw();
							trigger.player.addTempSkill('huangran_shao','huangranAfter');
						},
					},
					shao:{},
				}
			},
			yinzhen:{
				group:['yinzhen_fire','yinzhen_contains','yinzhen_getC'],
				subSkill:{
					fire:{
						trigger:{source:'damageBegin1'},
						priority: 99,
						usable: 1,
						forced:	true,
						content:function(){
							trigger.nature='fire';
						},
					},
					contains:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						trigger:{global:'phaseBefore'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.yinzhen_contains.length = 0;
							game.hasPlayer(function(cur){
								if(cur!=player){
									player.storage.yinzhen_contains.push(cur);
									player.storage.yinzhen_contains.push(get.distance(cur,player));
								}
							})
						},
					},
					getC:{
						trigger:{global:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							for(var i=0;i<(player.storage.yinzhen_contains.length);i+=2){
								if(get.distance(player.storage.yinzhen_contains[i],player)<player.storage.yinzhen_contains[i+1]){
									player.logSkill('yinzhen',player.storage.yinzhen_contains[i]);
									player.gainPlayerCard('h',player.storage.yinzhen_contains[i],true).set('visible', true);
								}
							}
						},
					},
					
				},
			},
			senhu:{
				group:['senhu_tengjia1','senhu_tengjia2','senhu_tengjia3'],
				locked:true,
				ai:{
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=7.5) return 0;
							}
							if(!target.isEmpty(2)) return;
							return lib.skill.bagua_skill.ai.effect.target.apply(this,arguments);
						}
					}
				},
				subSkill:{
					tengjia1:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia1',
						filter:function(event,player){
							if(!lib.skill.tengjia1.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
					tengjia2:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia2',
						filter:function(event,player){
							if(!lib.skill.tengjia2.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
					tengjia3:{
						equipSkill:true,
						noHidden:true,
						inherit:'tengjia3',
						filter:function(event,player){
							if(!lib.skill.tengjia3.filter(event,player)) return false;
							if(!player.isEmpty(2)) return false;
							return true;
						},
					},
				}
			},
			//ssk
			tiaolian:{
				trigger:{player:'useCardToPlayer', target:'useCardToTarget'},
				usable:1,
				filter:function(event,player){
					if(event.player==player&&!game.hasPlayer(function(cur){
						return event.targets.contains(cur)&&cur!=player;
					}))	return false;
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(trigger.targets.contains(player)&&trigger.player!=player){
						player.chooseToCompare(trigger.player);
					}
					'step 1'
					if(trigger.targets.contains(player)&&trigger.player!=player){
						if(result.bool){
							trigger.getParent().targets.remove(player);
							game.log(trigger.card,'不会对',player,'生效');
						}
						event.finish();
					}
					'step 2'
					event.targets = trigger.targets;
					console.log(event.targets);
					var next = player.chooseTarget('###咆咲###选择拼点的对象',true);
					next.set('filterTarget',function(card,player,target){
						return player.canCompare(target)&&event.targets.contains(target);
					})
					next.set('selectTarget',[1,event.targets.length]);
					next.set('multitarget',true);
					next.set('multiline',true)
					'step 3'
					if(result.bool){
						player.chooseToCompare(result.targets).callback=lib.skill.tiaolian.callback;
					}
				},
			//	chat:['粗鄙之语','天地不容','谄谀之臣','皓首匹夫，苍髯老贼','二臣贼子','断脊之犬','我从未见过有如此厚颜无耻之人！'],
				callback:function(){
					'step 0'
					if(event.num1<=event.num2){
			//			target.chat(lib.skill.tiaolian.chat[Math.floor(Math.random()*5)]);
						event.getParent(2)._trigger.targets.remove(target);
						game.log(event.getParent(2)._trigger.card,'不会对',target,'生效');
						game.delay();
					}
					'step 1'
					if(event.num1>event.num2){
						event.getParent(2)._trigger.directHit.add(target);
						game.log(target,'不能响应',event.getParent(2)._trigger.card);
						game.delay();
					}
				},
			},
			jiaku:{
				trigger:{player:['chooseToCompareAfter','compareMultipleAfter'],target:['chooseToCompareAfter','compareMultipleAfter']},
				forced: true,
				filter:function(event,player){
					console.log(event)
					return !event.iwhile;
				},
				content:function(){
					if(player==trigger.player){
						if(trigger.num1>trigger.num2){
							player.gainPlayerCard('###生笹###获得对方的一张牌',trigger.target,true);
						}
						else{
							player.draw();
						}
					}else{
						if(trigger.num2>trigger.num1){
							player.gainPlayerCard('###生笹###获得对方的一张牌',trigger.player,true);
						}
						else{
							player.draw();
						}
					}
				},
			},


			
		}, 
		translate:{
			dynamicTranslate:{
					tiantang:function(player){
					if(player.storage.haoren) return '<font color=#fcd>一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段，且在此出牌阶段内，其获得“引流”；或令其摸两张牌，只能使用声明花色的牌直到回合结束。</font>（X为你对目标发动此技能的次数且至少为1）';
					return '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）';
				},
			},

			ParyiPro: '帕里坡',

			Paryi: '帕里',
			tiantang: '天扉',
			tiantang_info: '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）',
			haoren: '好人',
			haoren_info: '<font color=#fcd>觉醒技</font> 你发动『天扉』后，若发动次数大于存活人数，你扣减1点体力上限，将『天扉』的“其他”改为“一名”；且在『天扉』的额外出牌阶段内，当前回合角色获得『引流』。',

			TakatsukiRitsu: '高槻律',
			shengya: '生涯',
			shengya_info: '<font color=#f33>锁定技</font> 出牌阶段内，你使用的一张红色牌后，你翻开牌堆顶第一张牌并获得之。若你翻开了♣牌，你失去一点体力，并且失去此技能直到下个回合开始。',
			liangshan: '汉歌',
			liangshan_info: '其他角色在你的回合内第一次摸牌后，你可以将牌堆顶牌置于你的武将牌上。一名角色回合开始或濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
			liangshan_use_info: '一名角色回合开始时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
			liangshan_save_info: '一名角色濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
			chongshi: '铳士',
			chongshi_info: '你使用【杀】指定目标后，可与其各摸一张牌。',

			MorinagaMiu: '森永缪',
			guanzhai: '观宅',
			guanzhai_info: '其他角色的回合结束时，若其本回合使用的牌少于（两）张，你可观看其手牌并获得其中（一）张。',
			zhishu: '直抒',
			zhishu_info: '出牌阶段开始时或你的体力值变化时，你可以展示一张手牌，然后令一名角色交给你一张同花色的牌，若其未执行，其下个回合中（）内的数值+1。',

			OtomeOto: '乙女音',
			xiaogui: '玉匣',
			xiaogui_info: '你可以将三张牌当作一张通常锦囊牌使用。然后，你可以将这些牌以任意顺序置于牌堆顶。',
			qiepian: '连崛',
			qiepian_info: '回合结束时，若你的手牌数与本回合开始时差值为三的倍数，你可以选择一项：令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
			changxiang: '长箱',
			changxiang_info: '<font color=#ff4>主公技</font> 其他同势力角色进入濒死状态时，你可以弃置数量等于自己当前体力值的手牌，视为对其使用一张【桃】。',


			SukoyaKana: '健屋花那',
			huawen: '花吻交染',
			huawen_info: '出牌阶段限一次，你可以选择一名其他女性角色，你与其互相展示手牌，然后交换花色、点数、种类相同的牌各一张，每交换一张便各摸一张牌。然后若交换不足三次，你与其各失去1点体力。',
			liaohu: '逃杀疗护',
			liaohu_info: '你造成过伤害的回合结束时，若该回合未发动/发动了“花吻交染”，你可以令你/本轮“花吻交染”选择的其他角色回复1点体力。',

			ShirayukiTomoe: '白雪巴',
			gonggan: '奇癖共感',
			gonggan_info: '其他角色的回合开始时，你可以展示所有手牌然后扣置其中一张，令当前回合角色猜测此牌花色，若猜对，其获得此牌，且本回合你手牌花色、点数均视为与此牌相同；若猜错，你收回此牌，且本回合你手牌点数均视为Q。',
			yeyu: '夜域女王',
			yeyu_info: '其他角色使用【杀】时，你可以弃置一张点数大于此【杀】的牌取消之。其他角色使用通常锦囊牌时，你可以重铸一张梅花牌为之增加或减少一名目标。',

			Elu: 'Elu',
			huangran: '煌燃',
			huangran_info: '你受到火焰伤害时，可以选择一名距离为1的角色与你平均承担，不能平均的额外1点由你分配。然后每有一名角色因此受伤，你摸一张牌。',
			yinzhen: '隐真',
			yinzhen_info: '<font color=#f66>锁定技</font> 每回合造成的第一次伤害均改为火焰伤害。其他角色与你距离减小的回合结束时，你观看其手牌并获得其中一张。',
			senhu: '森护',
			senhu_info: '<font color=#f66>锁定技</font> 若你的装备区里没有防具牌，你视为装备着【藤甲】。',

			SasakiSaku: '笹木咲',
			tiaolian: '咆咲',
			tiaolian_info: '当你使用牌指定其他角色为目标时，可用一张手牌与其中任意名目标同时拼点，对于你没赢的取消此目标，你赢的不可响应此牌；当你成为其他角色使用牌的目标时，你可以与其拼点，若你赢，此牌对你无效。每回合限一次。',
			jiaku: '生笹',
			jiaku_info: '锁定技。你赢得拼点时，获得目标一张牌；你没赢得拼点时，摸一张牌。',
		},
	};
});