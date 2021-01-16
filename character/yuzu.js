'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		character:{
			Yousa:['female','VirtuaReal',3,['niaoji','ysxiangxing']],

			Eilene:['female','eilene','4/6',['duanfu','daichang','hongtu'],['zhu']],

			LizeHelesta:['female','nijisanji',3,['shencha','helesta'],['zhu']],
//			AngeKatrina:['female','nijisanji',3,['shencha','chuangzuo']],
			SuzuharaLulu:['female','nijisanji',5,['zhongli','xinhuo','weizhuang']],
			KagamiHayato:['male','nijisanji',3,['liebo','zhimeng']],
			AmamiyaKokoro:['female','nijisanji',3,['miaomiao','chengneng']],

			ShirayukiMishiro:['female','key',3,['tianyi','nveyu']],

			TenkaiTsukasa:['male','upd8',4,['pojie','dazhen']],
			/**测试用角色 */
			Ruki:['female','VirtuaReal',4,['beixie','hunzhan']],
		},
		characterSort:{
			yuzu:{
				TEST:['Ruki'],
			}
		},
		characterIntro:{
			Paryi:'kimo~',
			OtomeOto:'5000兆円欲しい！ --乙女おと',
			Civia:'“听我说，DD会带来世界和平~”',
		},
		skill:{
			//Ruki
			beixie:{
				trigger:{global:'gameDrawBegin',player:'enterGame'},
				forced:true,
				content:function(){
					'step 0'
					event.togain = [];
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						var current=ui.cardPile.childNodes[i];
						event.togain.push(current);
					}
					'step 1'
					player.chooseButton(['是否获得其中的一张牌？',event.togain]);
					'step 2'
					if(result.bool){
						player.gain(result.links,'draw');
						if(get.subtype(result.links[0])=='equip1'){
							player.equip(result.links[0]);
						}
					}
				}
			},
			hunzhan:{
				trigger:{global:'damageAfter'},
				forced:true,
				content:function(){
					'step 0'
					trigger.player.chooseToUse(function(card){
						return player.hasUseTarget(card);
					},get.prompt2('hunzhan'));
					'step 1'
					if(result.cards&&result.cards.length){
						player.draw();
					}
				}
			},
			//帕里
			paryi:{
				marktext:"P",
				locked:true,
				intro:{
					name:'帕里家常',
					content:function (storage,player,skill){
						return '已经历了'+storage+'次『天扉』';
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
					if(player.storage.tiantang)	player.storage.tiantang.length = 0;
					var num = trigger.player.storage.paryi||1;
					player.chooseToDiscard(num,'he');
					'step 1'
					if(result.bool){
						if(!(player.storage.haoren===true)){
							player.storage.haoren++;
							player.markSkill('haoren');
						}
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
								game.broadcastAll(function(player,target){
									var next=player.discardPlayerCard("弃置一张声明花色的牌", target, 'he').set('visible', true);
									next.set('filterButton',function(card){
										return get.suit(card.link)==player.storage.tiantang;
									});
									var fC=0;
									target.getCards('he').forEach(function(tB){
										if(get.suit(tB)==player.storage.tiantang)	fC++;
									})
									if(fC){
										next.set('forced',true);
									}
									target.addTempSkill('tiantangzhifei_yisheng','phaseUseEnd');
									if(player.storage.haoren===true){
										target.markSkill('tiantangzhifei_yisheng');
										target.addTempSkill('yinliu','phaseUseEnd');
									}
									target.phaseUse();
								}, player, trigger.player)
								event.statClear = true;
                            }
                            if(element[2]=='摸两张牌'){
								trigger.player.draw(2);
								trigger.player.addTempSkill('tiantangzhifei_xianzhi','phaseEnd');
								trigger.player.storage.tiantangzhifei_xianzhi = player.storage.tiantang;
								trigger.player.syncStorage('tiantangzhifei_xianzhi');
								event.finish();
                            }
                        });
					}
					else{
						event.finish();
					}
					'step 6'
					if(event.statClear){
						var stat = trigger.player.getStat();
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
				ai:{
					combo:'tiantang',
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
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
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
						priority: 998,
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
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
						if(his.card)	num ++;
					});
					return event.player!=player&&event.player.countCards('h')&&num<(event.player.hasSkill('zhai')?event.player.countMark('zhai')+2:2);
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player, target){
						player.choosePlayerCard('###『观宅』###获得其中至多'+(target.hasSkill('zhai')?target.countMark('zhai')+1:1)+'张牌',target,[1,(target.hasSkill('zhai')?target.countMark('zhai')+1:1)],'h').set('visible', true);
					}, player, trigger.player)
					'step 1'
					if(result.bool){
						player.logSkill('guanzhai',trigger.player);
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
				},
				ai:{
					combo:'guanzhai',
				},
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
						var next = player.chooseUseTarget({name:card[2]},true);
						next.set('cards',event.cards);
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
						if(list.length>0){
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
							return event.card.name=='wuxie'&&event.cards.length==3&&event.skill=='xiaogui_wuxie'&&get.position(event.cards[0])=='d';
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
					player.storage[skill]=[];
				},
				locked:true,
				notemp:true,
				marktext: '崛',
				intro: {
					content: 'cards',
					name:'以『连崛』使用过的锦囊牌',
				},
				group:['qiepian_start','qiepian_end'],
				subSkill:{
					start:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger:{player:'phaseBefore'},
						firstDo:true,
						forced:true,
						silent:true,
						popup:false,
						priority:66,
						content:function(){
							player.storage.qiepian_start = player.countCards('h');
						},
					},
					end:{
						trigger:{player:'phaseEnd'},
						priority:66,
						prompt2: '你可以选择一项：令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
						filter:function(event,player){
							return /*(player.storage.qiepian-player.countCards('h'))&&*/(Math.abs(player.storage.qiepian_start-player.countCards('h'))%3==0);
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
										if(player.storage.qiepian.length){
											player.storage.qiepian.forEach(function(his){	
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
								game.asyncDraw(result.targets);
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
								player.storage.qiepian.add(game.createCard(card[2]));
								player.syncStorage('qiepian');
								player.markSkill('qiepian');
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
					if(!player.hasZhuSkill('changxiang')) return false;
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
			//团长
			huanshi:{
				mark:true,
				intro:{
					name:'幻士',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
			},
			huange:{
				trigger:{global:'phaseBegin'},
				round:1,
				priority:996,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					game.broadcastAll(function(player){
						player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌',true);
					}, player)
					'step 1'
					if(result.bool){
						player.logSkill('huange',result.targets);
						player.draw(result.targets[0].hp);
						player.storage.huange_disc = result.targets[0];
						player.markSkill('huange_disc');
						player.addTempSkill('huange_disc');
					}
				},
				subSkill:{
					disc:{
						mark:'character',
						intro:{
							name:'幻歌',
							content:'回合结束时弃置$体力值的牌',
							onunmark:function(storage,player){
								if(storage&&storage.length){
									storage.length=0;
								}
							},
						},
						trigger:{global:'phaseEnd'},
						priority:996,
						onremove:true,
						forced:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							'step 0'
							if(player.storage.huange_disc.isIn()&&player.countCards('he')){
								var prompt2 = '';
								if(player.storage.qishi===true)	prompt2 += '将'+get.cnNumber(player.storage.huange_disc.hp)+'张牌置于武将牌上';
								else	prompt2 += '弃置'+get.cnNumber(player.storage.huange_disc.hp)+'张牌';
								player.chooseCard('he','###『幻歌』###'+prompt2,player.storage.huange_disc.hp,true);
							}else{
								event.goto(2);
							}
							'step 1'
							if(result.bool){
								if(player.storage.qishi===true){
									event.cards = result.cards;
									player.lose(result.cards,ui.special,'toStorage');
									player.$give(event.cards,player,false);
									player.markAuto('huanshi',event.cards);
								}else{
									player.discard(result.cards);
								}
							}
							'step 2'
							player.unmarkSkill('huange_disc');
						},
					}
				},
			},
			qishi:{
				skillAnimation:true,
				animationStr:'希望之花',
				unique:true,
				juexingji:true,
				forced:true,
				trigger:{global:'roundStart'},
				firstDo:true,
				priority:996,
				filter:function(event,player){
					return player.storage.qishi_date&&player.storage.qishi_date.contains(player)&&player.storage.qishi_date.length>1;
				},
				content:function(){
					'step 0'
					player.unmarkSkill('qishi_date');
					player.loseMaxHp();
					event.cards = [];
					'step 1'
					var next=player.judge(function(card){
						if(get.color(card)=='black') return -1.5;
						return 1.5;
					});
					next.set('callback',function(){
						event.getParent().orderingCards.remove(card);
					});
					'step 2'
					if(result.bool){
						event.cards.push(result.card);
						event.goto(1);
					}
					else{
						event.cards.push(result.card);
					}
					'step 3'
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)!='o'){
							event.cards.splice(i,1);
							i--;
						}
					}
					if(event.cards.length){
						player.$gain2(event.cards,false)
						player.markAuto('huanshi',event.cards);
					}
					'step 4'
					player.storage.qishi = true;
					player.awakenSkill('qishi');
					player.addSkill('xiban');
				},
				group:['qishi_date','qishi_update'],
				subSkill:{
					date:{
						mark:true,
						intro:{
							name:'奇誓',
							content:function (storage,player,skill){
								var str = '本轮内';
								if(storage.contains(player))	str += ' 已受到伤害';
								if(storage!=[player])	str += ' 已造成伤害';
								return str;
							},
							onunmark:function(storage,player){
								if(storage&&storage.length){
									storage.length=0;
								}
							},
						},
						trigger:{player:'damageEnd',source:'damageEnd'},
						firstDo:true,
						priority:996,
						direct:true,
						filter:function(event,player){
							if(player.storage.qishi === true)	return false;
							if(player.storage.qishi_date&&player.storage.qishi_date.contains(event.player))	return false;
							return true;
						},
						content:function(){
							if(!player.storage.qishi_date)	player.storage.qishi_date = [];
							player.storage.qishi_date.add(trigger.player);
							player.markSkill('qishi_date');
						},
					},
					update:{
						trigger:{global:'roundStart'},
						lastDo:true,
						priority:996,
						direct:true,
						filter:function(event,player){
							if(player.storage.qishi === true)	return false;
							return true;
						},
						content:function(){
							player.unmarkSkill('qishi_date');
						}
					},
				},
				ai:{
					combo:'huange',
				},
			},
			xiban:{
				trigger:{global:'phaseEnd'},
				priority:99,
				forced:true,
				filter:function(event,player){
					return _status.currentPhase!=player&&_status.currentPhase.getHistory('sourceDamage').length&&player.hp<=player.storage.huanshi.length;
				},
				content:function(){
					'step 0'
					player.chooseCardButton('###『系绊』###可以弃置'+get.cnNumber(player.hp)+'张“士” 发动技能',player.hp,player.storage.huanshi);
					'step 1'
					if(result.bool){
						event.cards = result.links;
						player.unmarkAuto('huanshi',event.cards);
						player.$throw(event.cards,1000);
						var next = player.chooseTarget(get.prompt2('xiban'),function(card,player,tar){
							if(tar==_status.event.source||tar==_status.event.player)	return true;
						},true);
						next.set('source',trigger.player);
						next.set('num',event.cards.length)
						next.set('ai',function(target){
							if(target==_status.event.player&&_status.event.player.hp==_status.event.player.maxHp)	return -10;
							if(target==_status.event.source&&_status.event.source.countCards('he')>=2&&_status.event.num>=2)	return -get.attitude(_status.event.player,target);
							return (target==_status.event.player)?1:0;
						});
					}
					'step 2'
					if(result.bool){
						if(result.targets[0]!=player){
							trigger.player.chooseToDiscard(true,'he',event.cards.length);
						}else{
							player.recover();
						}
					}
				},
				ai:{
					combo:'huange',
				},
			},
			yongtuan:{
				skillAnimation:true,
				animationStr:'一袋米要扛几楼',
				unique:true,
				limited:true,
				zhuSkill:true,
				trigger:{player:'xibanAfter'},
				priority:66,
				filter:function(event,player){
					if(!player.hasZhuSkill('yongtuan')) return false;
					return event.cards.length;
				},
				content:function(){
					'step 0'
					var next = player.chooseTarget(true,function(card,player,tar){
						return tar.group==_status.event.player.group;
					});
					next.set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						result.targets[0].gain(trigger.cards);
						player.awakenSkill('yongtuan');
					}
				},
				ai:{
					combo:'huange',
				},
			},

			//冷鸟
			niaoji:{
				trigger:{source:'damageEnd'},
				priority:99,
				lastDo:true,
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				prompt:function(event){
					return '对'+get.translation(event.player)+'造成伤害，'+get.prompt('niaoji');
				},
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.suit(result)=='spade') return 2;
						if(get.suit(result)=='heart') return 2;
						return -1;
					};
					if(!trigger.player.isIn()||trigger.player.countCards('he')<=0){
						func=function(result){
							if(get.suit(result)=='spade') return 0;
							if(get.suit(result)=='heart') return 2;
							return -1;
						};
					}
					player.judge(func);
					'step 1'
					if(result.bool){
						if(result.suit=='spade'){
							player.discardPlayerCard('###『鸟肌』###弃置'+get.translation(trigger.player)+get.cnNumber(trigger.player.hp)+'张牌',trigger.player,trigger.player.hp,true,'he');
						}else if(result.suit=='heart'){
							player.draw(player.hp);
						}
					}
				},
			},
			ysxiangxing:{
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return true;
				},
				content:function(){
					'step 0'
					var next = player.chooseCardButton('###『翔星』###按顺序将卡牌置于牌堆顶（先选择的在上）',player.getCards('h'),player.countCards('h'),true);
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==_status.event.player.countCards('h');
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length)	event.cards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 2'
					player.lose(event.cards,ui.special);
					'step 3'
					var cards = event.cards;
                    while(cards.length>0){
                        var card=cards.pop();
                        card.fix();
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        game.updateRoundNumber();
					}
					'step 4'
					target.damage(player);
				}
			},

			//艾琳
			duanfu:{
				trigger:{player:'useCardToPlayer', target:'useCardToPlayer'},
				priority:100,
				lastDo:true,
				check:function(event,player){
					if(player==event.player)	return get.effect(event.target,event.card,player)<0;
					return get.effect(player,event.card,event.target,player)<0;
				},
				prompt:function(event,player){
					if(player==event.player&&event.target!=player)	return '指定'+get.translation(event.target)+'为'+get.translation(event.card)+'的目标，'+get.prompt('duanfu');
					else	return '被'+get.translation(event.player)+'指定为'+get.translation(event.card)+'的目标，'+get.prompt('duanfu');
				},
				filter:function(event,player){
					if(player==event.player&&!event.target.isLinked())	return true;
					if(player==event.target&&event.player.isLinked())	return true;
					return false;
				},
				content:function(){
					if(player==trigger.player){
						trigger.target.link();
						trigger.getParent().targets.remove(trigger.target);
						game.log(trigger.getParent().card,'不会对',trigger.target,'生效');
					}else{
						trigger.player.link();
						trigger.getParent().targets.remove(player);
						game.log(trigger.getParent().card,'不会对',player,'生效');
					}
				}
			},
			daichang:{
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return game.hasPlayer(function(cur){
						return cur.isLinked();
					});
				},
				content:function(){
					'step 0'
					player.loseMaxHp();
					'step 1'
					event.num = game.countPlayer(function(cur){
						return cur.isLinked();
					});
					player.draw(event.num);
					player.addTempSkill('daichang_bottom','phaseUseAfter')
				},
				subSkill:{
					bottom:{
						mark:true,
						intro:{
							name:'借贷',
							content:'造成伤害时，需将X张牌置于牌堆底。（X为场上被横置的角色数）',
						},
						trigger:{source:'damageEnd'},
						priority:100,
						lastDo:true,
						forced:true,
						filter:function(event,player){
							return player.countCards('he')&&game.hasPlayer(function(cur){
								return cur.isLinked();
							});
						},
						content:function(){
							'step 0'
							event.num = game.countPlayer(function(cur){
								return cur.isLinked();
							});
							player.choosePlayerCard('###『贷偿』###请选择要置于牌堆底的牌（先选择的在下）',player,'he',event.num,true);
							'step 1'
							event.cards = result.cards.slice(0);
							player.lose(event.cards);
							'step 2'
							while(event.cards.length){
								var card=event.cards.pop();
								card.fix();
								ui.cardPile.appendChild(card);
							}
							game.log(player,'将'+get.cnNumber(event.num)+'张牌置于牌堆底');
						}
					}
				},
			},
			hongtu:{
				trigger:{player:'phaseUseEnd'},
				unique:true,
				limited:true,
				priority:100,
				filter:function(event,player){
					return player.isLinked()&&player.hp==player.maxHp;
				},
				content:function(){
					'step 0'
					player.awakenSkill('hongtu');
					event.going = 1;
					'step 1'
					event.card = get.bottomCards()[0];
					player.showCards(event.card);
					'step 2'
					if(player.hasUseTarget(event.card,false)){
						player.chooseUseTarget(event.card,false,true);
					}else{
						event.going = 0;
					}
					'step 3'
					player.draw();
					'step 4'
					if(event.going==1){
						event.goto(1);
					}
					console.log(get.bottomCards())
				},
			},

			//mishiro
			tianyi:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mark:true,
				intro:{
					name:'衣',
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
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return !player.getEquip(2);
				},
				filterCard:function(card,player){
					return true;
				},
		//		selectTarget:-1,
		//		filterTarget:function(card,player,target){
		//			return player==target;
		//		},
				discard:false,
				visible:true,
				toStorage:true,
		//		prepare:'give',
				content:function(){
					'step 0'
					player.$give(cards,player,false);
					player.markAuto('tianyi',cards);
					game.log(player,'将',cards,'置于武将牌上');
				},
				group:['tianyi_drawBy','tianyi_cancelBy','tianyi_clear'],
				subSkill:{
					drawBy:{
						trigger:{player:'useCard'},
						priority:77,
						lastDo:true,
						forced:true,
						filter:function(event,player){
							if(get.type(event.card,'trick')!='trick')	return false;
							if(player.getHistory('useCard',function(evt){
								return get.suit(evt.card)==get.suit(event.card);
							}).length>1)	return false;
							return player.storage.tianyi.length && get.suit(player.storage.tianyi[0])!=get.suit(event.card);
						},
						content:function(){
							player.draw();
						}
					},
					cancelBy:{
						trigger:{target:'useCardToTarget'},
						priority:77,
						lastDo:true,
						check:function(event,player){
							return get.effect(player,event.card,event.player,player)<-1;
						},
						prompt:function(event){
							return '被'+get.translation(event.card)+'指定为目标，'+get.prompt('tianyi');
						},
						filter:function(event,player){
							if(get.type(event.card,'trick')!='trick')	return false;
							return player.storage.tianyi.length && get.suit(player.storage.tianyi[0])==get.suit(event.card);
						},
						content:function(){
							'step 0'
							player.unmarkSkill('tianyi');
							'step 1'
							trigger.getParent().cancel();
							'step 2'
							player.gain(trigger.getParent().card);
						}
					},
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseZhunbeiBegin']},
						direct:true,
						firstDo:true,
						content:function(){
							'step 0'
							if(trigger.name=='phaseZhunbei'&&player.storage.tianyi.length){
								event.moveCard = true;
							}
							'step 1'
							player.unmarkSkill('tianyi');
							'step 2'
							if(event.moveCard==true){
								player.moveCard('###'+get.prompt('tianyi')+'###可以移动场上的一张装备牌').nojudge=true;
							}
						}
					},
				},
			},
			nveyu:{
				trigger:{source:'damageEnd'},
				priority:77,
				usable:1,
				lastDo:true,
				forced:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					trigger.player.recover();
					'step 1'
					game.asyncDraw([player,trigger.player]);
					'step 2'
					player.storage.nveyu_eff = trigger.player;
					player.addTempSkill('nveyu_eff');
				},
				subSkill:{
					eff:{
						mark:'character',
						intro:{
							name:'虐语',
							content:'对$使用牌无距离与次数限制',
						},
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.nveyu_eff) return true;
							},
							cardUsableTarget:function (card,player,target){
								if(player.storage.nveyu_eff==target) return true;
							},
						},
						onremove:true,
					}
				}
			},
			//tm
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
						var cards1 = result.links.slice(0);
						var cards2 = result.links.slice(0);
						if(cards1.length&&cards2.length&&cards1.length==cards2.length){
							event.num = cards1.length;
							player.gain(cards2,target,'giveAuto').set('visible', true);
							target.gain(cards1,player,'giveAuto').set('visible', true);
							game.asyncDraw([player,target],event.num)
						}
						if(!event.num||event.num<3){
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
						trigger:{global:'damageBegin1'},
						priority: 99,
						usable: 1,
						forced:	true,
				/*		filter:function(event,player){
							return player!=event.source;
						},*/
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
				group:['senhu_tengjia2'],
			//	group:['senhu_tengjia1','senhu_tengjia2','senhu_tengjia3'],
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
						return event.targets.contains(cur)&&cur!=player&&player.canCompare(cur);
					}))	return false;
					if(event.player!=player&&!player.canCompare(event.player))	return false;
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
							if(trigger.getParent().targets.length==0)	trigger.getParent().cancel();
						}else{
							trigger.getParent().directHit.add(player);
							game.log(player,'不能响应',trigger.getParent().card);
						}
						event.finish();
					}
					'step 2'
					event.targets = trigger.targets;
					game.broadcastAll(function(player,targets){
						var next = player.chooseTarget('###『咆咲』###选择拼点的对象',true);
						next.set('filterTarget',function(card,player,target){
							return player.canCompare(target)&&targets.contains(target);
						})
						next.set('selectTarget',[1,targets.length]);
						next.set('multitarget',true);
						next.set('multiline',true)
					},player,event.targets);
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
						event.getParent().getTrigger().targets.remove(target);
						game.log(event.getParent().getTrigger().card,'不会对',target,'生效');
						if(event.getParent().getTrigger().targets.length==0)	event.getParent().getTrigger().cancel();
						game.delay();
					}
					'step 1'
					if(event.num1>event.num2){
						event.getParent().getTrigger().directHit.add(target);
						game.log(target,'不能响应',event.getParent().getTrigger().card);
						game.delay();
					}
				},
			},
			jiaku:{
				trigger:{player:['chooseToCompareAfter','compareMultipleAfter'],target:['chooseToCompareAfter','compareMultipleAfter']},
				forced: true,
				filter:function(event,player){
					return !event.iwhile;
				},
				content:function(){
					if(player==trigger.player){
						if(trigger.num1>trigger.num2){
							player.gainPlayerCard('###『生笹』###获得对方的一张牌',trigger.target,true);
						}
						else{
							player.draw();
						}
					}else{
						if(trigger.num2>trigger.num1){
							player.gainPlayerCard('###『生笹』###获得对方的一张牌',trigger.player,true);
						}
						else{
							player.draw();
						}
					}
				},
			},
			//lize
			shencha:{
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return true;
				},
				check:function(event,player){
					return player.countCards('j')>0;
				},
				content:function(){
					'step 0'
					event.num = 3+player.countCards('j');
					event.getE = (player.countCards('e')==0);
					'step 1'
					event.cards = get.cards(event.num)
					'step 2'
					var prompt2 = '获得其中至多两张基础牌';
					var selectButton = [0,2]
					if(event.getE){
						prompt2+=',装备其中至多两张装备牌';
						selectButton[1]+=2;
					}
					var next =  player.chooseCardButton(event.cards,'###『审查』###'+prompt2);
					next.set('selectButton',selectButton)
					next.set('filterButton',function(button){
						var type = get.type(button.link,'trick');
						var geting = [0,0]
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.type(ui.selected.buttons[i].link,'trick')=='basic') geting[0]++;
							if(get.type(ui.selected.buttons[i].link,'trick')=='equip') geting[1]++;
						}
						return (type=='basic'&&geting[0]<2)||(_status.event.getE&&type=='equip'&&geting[1]<2);
					});
					next.set('getE',event.getE)
					next.set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 3'
					if(result.bool&&result.links.length){
						var cards = result.links.slice(0);
						event.cards.removeArray(cards);
						var basics = cards.filter(function(card){
							return get.type(card)=='basic'
						});
						var equips = cards.filter(function(card){
							return get.type(card)=='equip'
						});
						player.gain(basics,'gain2');
						equips.forEach(function(equip){
							player.equip(equip);
						});
					}
					'step 4'
					player.skip('phaseDraw');
					if(event.cards.length==0)	event.finish();
					if(event.cards.length==1)	event.goto(7);
					'step 5'
					player.chooseCardButton('###『权力审查』###请选择置于牌堆底的顺序（先选择的在下）',event.cards,event.cards.length,true);
					'step 6'
					event.cards = result.links.slice(0);
					'step 7'
					game.log(player,'将'+get.cnNumber(event.cards.length)+'张牌置于牌堆底');
					while(event.cards.length){
						var card=event.cards.pop();
						card.fix();
						ui.cardPile.appendChild(card);
					}
				},
			},
			helesta:{
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player,name){
					return event.num&&player.countCards('e');
				},
				content:function(){
					'step 0'
					player.gainPlayerCard('###'+get.prompt('helesta')+'###可以获得装备区的一张牌使伤害-1',player,'e');
					'step 1'
					if(result.bool){
						player.logSkill('helesta');
						trigger.num--;
					}
				},
				group:'helesta_iceshaBy',
				subSkill:{
					iceshaBy:{
						trigger:{
							player:'loseAfter',
				//			global:['gainAfter','equipAfter','addJudgeAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							return evt&&evt.es&&evt.es.length>0&&player.hasUseTarget({name:'sha',nature:'ice',isCard:true});
						},
						direct:true,
						content:function(){
							player.chooseUseTarget('###'+get.prompt('helesta')+'###视为使用一张冰【杀】',{name:'sha',nature:'ice',isCard:true},false);
						},
					}
				},
			},
			//ange
			chuangzuo:{},
			//露露
			zhongli:{
				trigger:{player:'phaseUseAfter'},
				priority:99,
				lastDo:true,
				forced:true,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.type(result)=='equip') return 2;
						return 0;
					};
					player.judge(func);
					'step 1'
					if(result.judge>0){
						if(player.maxHp>1)	player.loseMaxHp();
						player.gain(result.card);
						player.phaseUse();
					}else{
						event.finish();
					}
					'step 2'
					var stat = player.getStat();
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
			},
			xinhuo:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>=2;
				},
				content:function(){
					'step 0'
					var next = player.chooseCardButton('###『薪火相传』###按顺序将卡牌置于牌堆顶（先选择的在上）',player.getCards('he'),2);
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==2;
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length)	event.cards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 2'
					player.lose(event.cards,ui.special);
					'step 3'
					var cards = event.cards;
                    while(cards.length>0){
                        var card=cards.pop();
                        card.fix();
                        ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
                        game.updateRoundNumber();
					}
					'step 4'
					if(player.hasSkill('xinhuo_chuanhuo')){
						player.storage.xinhuo_chuanhuo++;
						player.updateMarks();
					}else{
						player.addTempSkill('xinhuo_chuanhuo');
						player.storage.xinhuo_chuanhuo = 1
					}
				},
				subSkill:{
					chuanhuo:{
						trigger:{player:'useCard'},
						forced:true,
						onremove:function(player){
							player.unmarkSkill('xinhuo_chuanhuo');
							delete player.storage.xinhuo_chuanhuo;
						},
						mod:{
							selectTarget:function(card,player,range){
								if(range[1]==-1) return;
								range[1]+=player.storage.xinhuo_chuanhuo;
							},
							cardUsable:function(card,player,num){
								return true;
							},
							targetInRange:function(card,player,target,now){
								return true;
							},
						},
						content:function(){
							player.removeSkill('xinhuo_chuanhuo');
						},
						mark:true,
						intro:{
							content:'下一张使用的牌无距离和次数限制且可额外指定$名目标',
							markcount:function(storage,player){
								return player.storage.xinhuo_chuanhuo;
							}
						},
					},
				},
			},
			weizhuang:{
				trigger:{player:'useCard'},
				forced:true,
				lastDo:true,
				filter:function(event,player){
					return (get.type(event.card,'trick')=='trick' || get.type(event.card,'trick')=='basic')&&event.targets.length>0;
				},
				content:function(){
					'step 0'
					if(!player.hasMark('weizhuang')){
						player.markSkill('weizhuang');
					}
					'step 1'
					console.log(player.getHistory());
					if(get.type(trigger.card,'trick')=='basic'&&player.getHistory('useCard',function(evt){
						return get.type(evt.card,'trick')=='basic';
					}).length>1){
						player.draw(trigger.targets.length)
					}else if(get.type(trigger.card,'trick')=='trick'&&player.getHistory('useCard',function(evt){
						return get.type(evt.card,'trick')=='trick';
					}).length>1){
						player.chooseToDiscard(trigger.targets.length,'he',true)
					}
				},
				mark:true,
				intro:{
					content:'使用基本牌/锦囊牌指定目标时，摸/弃X张牌（X为此牌指定的目标数）',
					onunmark:true,
				},
				group:['weizhuang_clear'],
				subSkill:{
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('weizhuang');
						}
					},
				},
			},
			//社长
			liebo:{
				trigger:{player:'useCard'},
				filter:function(event,player){
					return get.color(event.card,player)=='black';
				},
				priority:12,
				forced:true,
				content:function(){
					trigger.directHit.addArray(game.filterPlayer(function(cur){
						return true;
					}));
				},
				group:'liebo_drawBy',
				subSkill:{
					drawBy:{
						trigger:{source:'damage'},
						filter:function(event,player){
							var evt = event.getParent();
							if(evt.name=='_lianhuan')	evt = event.getTrigger().getParent(2);
							else	evt = evt.getParent();
							if(evt.addedSkill&&evt.addedSkill.contains('liebo'))	return false;
							return get.color(event.card,player)=='black';
						},
						priority:12,
						forced:true,
						content:function(){
							'step 0'
							var evt = trigger.getParent();
							if(evt.name=='_lianhuan')	evt = trigger.getTrigger().getParent(2);
							else	evt = evt.getParent();
							if(!evt.addedSkill)	evt.addedSkill = [];
							evt.addedSkill.add('liebo');
							player.draw();
							'step 1'
							game.broadcastAll(function(player,target){
								player.discardPlayerCard('e',target);
							},trigger.player,player)
						},
					},
				},
			},
			zhimeng:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				content:function(){
					'step 0'
					player.chooseCard('h',true,'『重机织梦』：展示一张手牌');
					'step 1'
					if(result.bool){
						player.showCards(result.cards,'###『重机织梦』###展示手牌')
						player.storage.zhimeng = result.cards[0];
						player.syncStorage('zhimeng');
					}else{
						event.finish();
					}
					'step 2'
					player.markSkill('zhimeng');
				},
				mark:true,
				intro:{
					name:'失去展示牌时，可以令一名角色回复1点体力或摸两张牌',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage = [];
						}
					},
				},
				mod:{
					color:function(card,player,color){
						if(card.cards.length==1&&card.cards[0]==player.storage.zhimeng){
							if(color=='red')	return 'black';
							else if(color=='black')	return 'red';
						}
					},
				},
				group:['zhimeng_lose','zhimeng_clear'],
				subSkill:{
					lose:{
						trigger:{player:'loseAfter'},
						filter:function(event,player){
							return player.storage.zhimeng!=[]&&event.cards.contains(player.storage.zhimeng);
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget('###'+get.prompt('zhimeng')+'###令一名角色回复1点体力或摸两张牌').set('ai',function(target){
								return get.attitude(_status.event.player,target);
							});
							'step 1'
							if(result.bool){
								event.target = result.targets[0]
								event.target.classList.add('glow');
							}else{
								event.finish();
							}
							'step 2'
							var controls=['摸两张牌','回复一点体力','取消选择'];
							player.chooseControl(controls).set('ai',function(event,player){
								return _status.event.index;
							}).set('index',0);
							'step 3'
							event.target.classList.remove('glow');
							switch(result.index){
								case 0:{
									event.target.draw(2);
									break;
								}
								case 1:{
									event.target.recover();
									break;
								}
								case 2:{
									event.goto(0);
									break;
								}
							}
						}
					},
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						firstDo:true,
						content:function(){
							player.unmarkSkill('zhimeng');
						}
					},
				},
			},
			//阿喵喵
			miaomiao:{
				trigger:{source:'damageBegin4'},
				priority:3,
				lastDo:true,
				direct:true,
				filter:function(event,player){
					return event.num == 1;
				},
				content:function(){
					'step 0'
					var check = -1;
					check += (get.attitude(player,target)*get.effect(trigger.player,{name:'recover'},player,player));
					player.chooseTarget('『流泪喵喵』：令目标摸两张牌（取消则改本次伤害为回复）',function(card,player,target){
						return target==trigger.player;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(_status.event.check>0)	return false;
						return get.attitude(player,target)>0&&target.hp==target.maxHp;
					});
					'step 1'
					if(result.bool){
						result.targets[0].draw(2);
						event.goto(3);
					}else{
						trigger.cancel();
					}
					'step 2'
					trigger.player.recover();
					'step 3'
					if(player.hasSkill('chengneng_used')){
						player.draw();
					}
				},
			},
			chengneng:{
				trigger:{global:'damageBegin3'},
				priority:3,
				firstDo:true,
				direct:true,
				filter:function(event,player){
					return event.player != player;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('chengneng'),'he')
					'step 1'
					if(result.bool){
						player.addTempSkill('chengneng_used')
						if(trigger.source==player)	event.goto(3);
					}else{
						event.finish();
					}
					'step 2'
					trigger.source = player;
					event.finish();
					'step 3'
					trigger.cancel();
					'step 4'
					trigger.player.loseHp(trigger.num);
				},
				subSkill:{
					used:{
						mark:true,
						marktext:"龙",
						intro:{
							name:'逞能龙息',
							content:'本回合已发动『逞能龙息』',

						}
					}
				},
			},
			//开司
			pojie:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				trigger:{
					global:['loseAfter','equipAfter'],
				},
				marktext:"戒",
				mark:true,
				intro:{
					content:'弃牌阶段改为弃置#张牌',
				},
				filter:function(event,player){
					if(player!=_status.currentPhase)	return false;
					if(event.name=='equip'){
						return true;
					}
					var evt=event.getl(event.player);
					return evt&&evt.es&&evt.es.length>0;
				},
				content:function(){
					player.draw();
					player.storage.pojie++;
					player.markSkill('pojie');
				},
				group:'pojie_phaseDiscard',
				subSkill:{
					phaseDiscard:{
						trigger:{player:['phaseDiscardBegin','phaseEnd']},
						forced:true,
						filter:function(event,player){
							return player.storage.pojie>0;
						},
						content:function(){
							'step 0'
							if(trigger.name=='phaseDiscard'){
								player.chooseToDiscard(player.storage.pojie,true,'h');
								trigger.cancel();
							}
							'step 1'
							player.storage.pojie==0;
							player.unmarkSkill('pojie');
						},

					},
				},
			},
			dazhen:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player,cards){
					return player.getEquip(1);
				},
				filterCard:function(card,player){
					return get.subtype(card) == 'equip1';
				},
				discard:false,
				position:'e',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					'step 0'
					if(target.getEquip(1)){
						event.equip = target.getEquip(1);
					}
					'step 1'
					player.$give(cards,target);
					target.equip(cards[0]);
					'step 2'
					if(event.equip){
						target.$give(event.equip,player);
						player.equip(event.equip)
					}
					'step 3'
					target.chooseToDiscard('『大振』：需要弃置'+get.cnNumber(Math.abs(player.getHandcardLimit()-player.countCards('h')))+'张牌',Math.abs(player.getHandcardLimit()-player.countCards('h')),'he',true);
				},
			},
		}, 
		dynamicTranslate:{
			tiantang:function(player){
				if(player.storage.haoren===true) return '<font color=#fcd>一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段，且在此出牌阶段内，其获得“引流”；或令其摸两张牌，只能使用声明花色的牌直到回合结束。</font>（X为你对目标发动此技能的次数且至少为1）';
				return '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）';
			},
		},
		translate:{
			TEST: '测试员',
			Ruki: '琉绮',
			beixie: '备械',
			beixie_info: '游戏开始时，你可以指定获得牌堆中的一张牌，且若其为武器牌，你立即装备之。',
			hunzhan: '混战',
			hunzhan_info: '<font color=#f66>锁定技</font> 一名角色受到伤害时，其可立即使用一张牌，若其如此做，你摸一张牌。',

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

			huanshi: '士',
			HisekiErio: '绯赤艾莉欧',
			huange: '幻歌',
			huange_info: '每轮限一次。一个回合开始时，你可以摸等同一名角色体力值的牌，然后于回合结束时，弃置等同其当前体力值的牌。若你发动过『奇誓』，你可以将弃牌改为置于你的武将牌上。',
			qishi: '奇誓',
			qishi_info: '<font color=#f54>觉醒技</font> 你造成且受到伤害的轮次结束时，你减1体力上限，获得『系绊』，然后进行判定直到出现黑色并将这些牌置于武将牌上，称为“士”。',
			xiban: '系绊',
			xiban_info: '其他角色造成伤害的回合结束时，你可以弃置X张“士”令其选择一项：弃置等量的牌；或若你已受伤，令你回复1点体力。（X为你当前体力值）',
			yongtuan: '拥团',
			yongtuan_info: '<font color=#ff4>主公技</font> <font color=#fa8>限定技</font> 你弃置“士”时，可以令一名同势力角色获得之。',

			Yousa: '泠鸢',
			niaoji: '鸟肌',
			niaoji_info: '你造成一次伤害后可以进行判定：若为♥️，你摸等同你当前体力值的牌；若为♠️，你弃置目标等同于其当前体力值的牌。',
			ysxiangxing: '翔星',
			ysxiangxing_info: '出牌阶段限一次，你可以将所有手牌以任意顺序置于牌堆顶，然后对任一角色造成1点伤害。',

			Eilene: '艾琳',
			duanfu: '断缚',
			duanfu_info: '你的牌指定目标时，你可以将其横置并使此牌对其无效；你成为牌指定的目标时，你可以将来源解除横置并使此牌对你无效。',
			daichang: '贷偿',
			daichang_info: '出牌阶段限一次，你可以扣减一点体力上限并摸X张牌，然后你于本阶段内造成伤害时，需将X张牌置于牌堆底。（X为场上被横置的角色数）',
			hongtu: '宏图',
			hongtu_info: '<font color=#faa>限定技</font> 你的出牌阶段结束时，若你处于横置状态且体力为上限：你可以亮出牌堆底牌并使用之，然后摸一张牌，重复此操作直到你无法使用亮出牌。',

			ShirayukiMishiro: '白雪深白',
			tianyi: '梦幻天衣',
			tianyi_info: '出牌阶段限一次，若你没有装备防具，你可以将一张牌置于武将牌上，称为“衣”。每回合每种花色限一次，当你使用或成为锦囊牌的目标时，若该牌花色与“衣”不同，你摸一张牌；若花色相同，你可以取消之，然后弃置“衣”并获得此牌。准备阶段，弃置“衣”，然后你可以移动场上一张装备牌。',
			nveyu: '甜言虐语',
			nveyu_info: '<font color=#f66>锁定技</font> 当你于一回合内首次造成伤害时，你令目标回复一点体力，与其各摸一张牌，然后本回合你对其使用牌无距离与次数限制。',

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

			Elu: '艾露',
			huangran: '煌燃',
			huangran_info: '你受到火焰伤害时，可以选择一名距离为1的角色与你平均承担，不能平均的额外1点由你分配。然后每有一名角色因此受伤，你摸一张牌。',
			yinzhen: '隐真',
			yinzhen_info: '<font color=#f66>锁定技</font> 每回合造成的第一次伤害均改为火焰伤害。其他角色与你距离减小的回合结束时，你观看其手牌并获得其中一张。',
			senhu: '森护',
			senhu_info: '<font color=#f66>锁定技</font> 若你的装备区里没有防具牌，你受到的火焰伤害+1。',

			SasakiSaku: '笹木咲',
			tiaolian: '咆咲',
			tiaolian_info: '当你使用牌指定其他角色为目标时，可用一张手牌与其中任意名目标同时拼点，对于你没赢的取消此目标，你赢的不可响应此牌；当你成为其他角色使用牌的目标时，你可以与其拼点，若你赢，此牌对你无效，若你没赢，你不可响应此牌。每回合限一次。',
			jiaku: '生笹',
			jiaku_info: '<font color=#f66>锁定技</font> 你赢得拼点时，获得目标一张牌；你没赢得拼点时，摸一张牌。',

			LizeHelesta: '莉泽·赫露艾斯塔',
			shencha: '权力审查',
			shencha_info: '准备阶段，你可以跳过本回合的摸牌阶段并观看牌堆顶3张牌，获得其中至多两张基本牌，并将其余牌置于牌堆底。若你的装备区没有牌，则你可装备其中的至多两张装备牌，若你的判定区有牌，则每有一张牌你便多观看一张牌。',
			helesta: '赫露圣剑',
			helesta_info: '你受到伤害时，你可以获得装备区的一张牌使此伤害-1。你失去装备区的牌时，你可以视为使用一张冰【杀】。',

			AngeKatrina: '安洁·卡特琳娜',
			chuangzuo: '创作延续',
			chuangzuo_info: '准备阶段，你可令一名角色获得其判定区或装备区的一张牌，然后你摸一张牌。',

			SuzuharaLulu: '铃原露露',
			zhongli: '重力牵引',
			zhongli_info: '<font color=#f66>锁定技</font> 出牌阶段结束时，你进行判定：若为装备牌，你减1点体力上限（至少为1）并获得判定牌，然后执行一个额外的出牌阶段。',
			xinhuo: '薪火相传',
			xinhuo_chuanhuo: '传火',
			xinhuo_info: '出牌阶段，你可以将两张牌以任意顺序置于牌堆顶，令你本回合下一张使用的牌无距离和次数限制且可额外指定一名目标（可叠加）。',
			weizhuang: '魔界伪装',
			weizhuang_info: '<font color=#f66>锁定技</font> 你在一回合内多次使用基本牌/锦囊牌指定目标时，摸/弃X张牌。（X为此牌指定的目标数）',

			KagamiHayato: '加賀美隼人',
			liebo: '裂帛核哮',
			liebo_info: '<font color=#f66>锁定技</font> 你的黑色牌无法被响应。你的一张黑色牌首次造成伤害时，摸一张牌，然后目标可以令你弃置你装备区内的一张牌',
			zhimeng: '重机织梦',
			zhimeng_info: '出牌阶段限一次，你可弃置一张牌并展示一张手牌，此牌的颜色视为原来的异色直到回合结束。本回合内你失去此牌时，可以令一名角色回复1点体力或摸两张牌',

			AmamiyaKokoro: '天宫心',
			miaomiao: '流泪喵喵',
			miaomiao_info: '<font color=#f66>锁定技</font> 你造成数值为1的伤害时，需将其改为等量体力回复，或令目标摸两张牌；然后若你本回合已发动『逞能突击』，摸一张牌。',
			chengneng: '逞能龙息',
			chengneng_info: '每回合限一次。其他角色受到伤害，你可以弃一张牌令其来源视为你，且你为其原来源时，本次伤害改为等量体力流失。',

			TenkaiTsukasa: '天开司',
			pojie: '破戒',
			pojie_info: '回合内，一名角色装备区内的牌数变化时，你可以摸一张牌。弃牌阶段，你需弃置的牌数改为本回合发动此技能的次数。',
			dazhen: '大振',
			dazhen_info: '出牌阶段限一次，你可将你武器栏的牌移动至其他角色武器栏（可替换原武器），然后其弃置你手牌数与手牌上限之差的牌，若不足，受到你造成的1点伤害。',
		},
	};
});