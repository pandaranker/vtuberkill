'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:"yuzu",
		connect:true,
		character:{
			// ShitoAnon: ['female','paryi',3,['jiacan','fuhui']],

			// AngeKatrina:['female','nijisanji',3,['shencha','chuangzuo']],
			
			/**向晚 */
			Ava: ['female','asoul',4,['yiqu','wanxian']],

			/**机萪 */
			jike: ['female','qun',3,['qianjiwanbian']],
			/**勺宝 */
			Shaun: ['female','VirtuaReal',3,['juxiao','shenyan']],
			/**三三 */
			Mikawa: ['male','qun',4,['zhezhuan','setu']],
			/**测试用角色 */
			Ruki: ['female','VirtuaReal',4,['beixie','hunzhan']],
		},
		characterSort:{
			yuzu:{
				TEST:['Ruki'],
			}
		},
		characterIntro:{
		},
		skill:{
			//Ruki
			beixie:{
				trigger:{global:'gameDrawBegin',player:'enterGame'},
				direct:true,
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
						player.logSkill(event.name);
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
				filter:function(event, player){
					if((!(player.storage.haoren===true))&&event.player==player)	return false;
					if(player.countCards('he')<(event.player.storage.paryi||1))	return false;
					return true;
				},
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
			//Ciyana
			yankui:{
				trigger:{global:'phaseZhunbei'},
				direct:true,
				filter:function(event, player){
					if(player.hasUnknown(4))	return false;
					return player!=event.player&&player.countCards('he',function(card){
						return !player.storage.yankui_mark||!player.storage.yankui_mark.contains(get.type(card,'trick'));
					})>1&&event.player.countDiscardableCards(player,'h');
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					game.broadcastAll(function(player){
						player.chooseToDiscard(get.prompt2('yankui'),function(card){
							return !player.storage.yankui_mark||!player.storage.yankui_mark.contains(get.type(card,'trick'));
						}).ai = function(card){
							var player = _status.event.player;
							var target = _status.event.getTrigger().player;
							if(player.hasUseTarget(card)) return 6+player.getUseValue(card);
							else if(get.attitude(player,target)<1) return 6-get.useful(card);
							return 0;
						}
					}, player)
					'step 1'
					if(result.cards&&result.cards.length){
						player.logSkill(event.target);
						if(!player.storage.yankui_mark)	player.storage.yankui_mark = [];
						for(var i=0;i<result.cards.length;i++){
							player.storage.yankui_mark.add(get.type(result.cards[0],'trick'));
						}
						var next = player.gainPlayerCard(event.target,'h',true);
						next.set('visible',true);
						next.set('ai',function(button){
							var player = _status.event.player;
							var target = _status.event.getTrigger().player;
							if(get.attitude(player,target)>0){
								if(target.countCards('h',{name:'sha'})>1&&get.type(button.link)!='basic'&&get.name(button.link)!='sha')	return 6+get.value(button.link);
								if(target.countCards('j')&&target.needsToDiscard()&&get.type(button.link)!='basic')	return 5+get.value(button.link);
							}
							return get.value(button.link);
						});
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.links){
						player.addTempSkill('yankui_mark','roundStart');
						event.card = result.links[0];
						if(get.type(event.card)!='basic'){
							event.target.skip('phaseJudge');
							event.target.skip('phaseDiscard');
							event.target.addTempSkill('yankui1');
						}else{
							event.target.addTempSkill('yankui2');
						}
					}
				},
				//group:'yankui_mark',
				subSkill:{
					mark:{
						mark:true,
						marktext:'魇',
						intro:{
							name:'魇窥',
							content:function(storage,player){
								var str='<ul style="padding-top:0;margin-top:0"><p>本轮次已弃置的牌类型</p>';
								for(var i=0;i<storage.length;i++){
									str+='<li>'+get.translation(storage[i]);
								}
								str+='</ul>'
								return str;
							},
						},
						onremove:function (player,skill){
							player.unmarkSkill(skill);
							delete player.storage[skill]
						},
					},
				},
			},
			yankui1:{
				mark:true,
				marktext:'魇',
				intro:{name:'魇窥 - 非基本牌',content:'跳过本回合下一个判定阶段和弃牌阶段'},
			},
			yankui2:{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=='sha') return num+1;
					},
				},
				mark:true,
				marktext:'魇',
				intro:{name:'魇窥 - 基本牌',content:'本回合内可以多使用一张【杀】'},
			},
			//noe
			huiyuan:{
				audio:4,
				trigger:{global:'useCard1'},
				filter:function(event, player){
					return player.countCards('h')<event.player.countCards('h')&&get.type(event.card)=='basic';
				},
				usable:1,
				check:function(event, player){
					return get.attitude(player,event.player)>0;
				},
				content:function(){
					game.asyncDraw([player,trigger.player]);
				},
			},
			suoshi:{
				audio:2,
				trigger:{player:'damageBegin3'},
				filter:function(event, player){
					return player.countCards('h');
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(cur){
						return cur.isMaxHandcard();
					});
					player.chooseCardTarget({
						prompt:get.prompt2('suoshi'),
						position:'h',
						filterTarget:function(card,player,target){
							return player!=target&&target.isMaxHandcard();
						},
						filterCard:lib.filter.cardDiscardable,
						ai1:function(card){
							if(_status.event.goon) return 6-get.value(card);
							return 0;
						},
						ai2:function(target){
							var player=_status.event.player;
							return get.attitude(player,target);
						},
						goon:function(target){
							var player=_status.event.player;
							return !player.isMinHandcard()&&(player.countCards('h')<3&&get.attitude(player,target)>0);
						}(list[0]),
					});
					'step 1'
					if(result.bool&&result.targets.length){
						event.cards = result.cards.slice(0);
						event.target = result.targets[0];
						player.logSkill('suoshi',event.target);
						player.give(event.cards,event.target);
					}

				},
				group:['suoshi_addDam'],
				subSkill:{
					addDam:{
						trigger:{player:'damageBegin'},
						forced:true,
						filter:function(event, player){
							return !player.isMinHandcard();
						},
						content:function(){
							trigger.num++;
						}
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
						if(!target.countDiscardableCards(player,'he'))	list.shift();
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
								trigger.player.draw(2,player);
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
				audio:4,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=true;
				},
				marktext:"卒",
				intro:{
					name:'职业生涯结束',
					content:function (storage,player,skill){
						return '失去【职业生涯】技能直到下个回合开始';
					},
				},
				trigger:{player:'useCardAfter'},
				priority: 996,
				forced: true,
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
						priority: 996,
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
				priority:996,
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
						priority: 996,
						check:function(event,player){
							if(player.hasUnknown(1))	return false;
							return get.attitude(player,event.player)>0;
						},
						filter:function(event,player){
							return player.storage.liangshan.length;
						},
						prompt2:'一名角色回合开始时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
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
						priority: 996,
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
						filter:function(event,player){
							return event.player.hp<=0&&player.storage.liangshan.length;
						},
						prompt2:'一名角色濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
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
				priority: 996,
				frequent:true,
				content:function(){
					game.asyncDraw([player,trigger.target]);
					// player.draw();
					// trigger.target.draw();
				}
			},
			//miu
			guanzhai:{
				audio:5,
				trigger:{global:'phaseEnd'},
				priority:997,
				prompt2:function(event,player){
					var target = event.player;
					return '可以观看其手牌，并获得其中至多'+(target.hasSkill('zhai')?target.countMark('zhai')+1:1)+'张牌';
				},
				filter:function(event,player){
					var num = event.player.countUsed();
					return event.player!=player&&event.player.countCards('h')&&num<(event.player.hasSkill('zhai')?event.player.countMark('zhai')+2:2);
				},
				content:function(){
					'step 0'
					var str = '###『观宅』###获得其中至多'+(trigger.player.hasSkill('zhai')?trigger.player.countMark('zhai')+1:1)+'张牌';
					player.choosePlayerCard(trigger.player,[1,(trigger.player.hasSkill('zhai')?trigger.player.countMark('zhai')+1:1)],'h').set('visible', true).set('prompt',str);
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
				onremove:true,
			},
			zhishu:{
				audio:3,
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
						game.delayx();
						event.target.chooseCard('he','是否交给'+get.translation(player)+'一张花色为'+get.translation(result.cards[0])+'的牌？',function(card,player){
							return get.suit(card)==_status.event.suit;
						}).set('suit',result.cards[0])
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
			yuxia:{
				audio:4,
				hiddenCard:function(player,name){
					if(!lib.skill.yuxia.filter(false,player))	return false;
					var list = get.inpile('trick');
					for(var i=0;i<list.length;i++){
						if(list[i]==name) return true;
					}
					return false;
				},
				enable:'chooseToUse',
				filter:function(event,player){
					return player.countCards('he')>=3;
				},
				chooseButton:{
					dialog:function(event,player){
						var list = get.inpile('trick');
						for(var i=0;i<list.length;i++){
							list[i]=['锦囊','',list[i]];
						}
						return ui.create.dialog('『玉匣』',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2],nature:button.link[3]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards('h',button.link[2])>0) return 0;
						if(['wugu','jingluo'].contains(button.link[2])) return 0;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'yuxia',
							filterCard:function(card){
								return true;
							},
							selectCard:3,
							forceAuto:function(){
								return ui.selected.cards.length==3;
							},
							popname:true,
							check:function(card){
								return 7-get.value(card);
							},
							position:'he',
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function(links,player){
						return '###『玉匣』###将三张牌当做【'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'】使用';
					}
				},
				ai:{
					order:6,
					result:{
						player:function(player){
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i]!=player&&get.attitude(player,players[i])>0){
									return 0.5;
								}
							}
							return 0;
						}
					},
				},
				group:'yuxia_after',
				subSkill:{
					after:{
						trigger:{player:'useCardEnd'},
						priority:66,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return event.cards.length==3&&event.skill=='yuxia_backup'&&get.position(event.cards[0])=='d';
						},
						content:function(){
							'step 0'
							event.cards = trigger.cards;
							player.chooseCardButton([0,3],true,cards,'『玉匣』：可以按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
								return get.value(button.link)+Math.random();;
							});
							'step 1'
							if(result.bool&&result.links){
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
				},
			},
			qiepian:{
				init:function(player,skill){
					player.storage[skill]=[];
				},
				marktext: '崛',
				intro: {
					content: 'cards',
					name:'以『连崛』使用过的锦囊牌',
				},
				trigger:{player:'phaseEnd'},
				priority:66,
				frequent:true,
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
					var next = player.chooseButton(1);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						return player.getUseValue({name:button.link[2],isCard:true});
					});
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
				group:['qiepian_start'],
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
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&!player.needsToDiscard()&&Math.abs(player.storage.qiepian_start-player.countCards('h'))%3==0){
							return num-10;
						}
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
			},
			//团长
			huanshi:{
				mark:true,
				intro:{
					name:'幻士',
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
			},
			huange:{
				trigger:{global:'phaseBegin'},
				round:1,
				priority:996,
				filter:function(event,player){
					return game.countPlayer(function(cur){
						return cur.hp!=Infinity
					});
				},
				check:function(event,player){
					if(event.player!=player&&get.attitude(player,event.player)<0&&event.player.inRange(player))	return true;
					return event.player==player&&game.roundNumber>1&&player.hasUseTarget('sha')&&!player.needsToDiscard();
				},
				content:function(){
					'step 0'
					var next = player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌',true,function(card,player,target){
						return target.hp!=Infinity
					});
					next.set('ai',function(target){
						if(player.inRange(target))	return 2-get.attitude(player,target);
						else return target.hp-(get.attitude(player,target)/2);
					})
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
							onunmark:true,
						},
						trigger:{global:'phaseEnd'},
						priority:996,
						onremove:true,
						forced:true,
						filter:function(event,player){
							return player.countDiscardableCards(player,'he');
						},
						content:function(){
							'step 0'
							if(player.storage.huange_disc.isIn()&&player.countCards('he')){
								var prompt2 = '';
								if(player.storage.qishi===true)	prompt2 += '将'+get.cnNumber(player.storage.huange_disc.hp)+'张牌置于武将牌上';
								else{	
									prompt2 += '弃置'+get.cnNumber(player.storage.huange_disc.hp)+'张牌';
								}
								player.chooseCard('he','###『幻歌』###'+prompt2,player.storage.huange_disc.hp,true,lib.filter.cardDiscardable);
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
							delete player.storage.huange_disc;
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
				derivation:'xiban',
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
				check:function(event,player){
					return player.isDamaged()||get.attitude(player,event.player);
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
							if(target==_status.event.source&&_status.event.source.countCards('he')>=2&&_status.event.num>=2)	return 10-get.attitude(_status.event.player,target);
							return (target==_status.event.player)?8:0;
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
				audio:true,
				audioname:['jike'],
				trigger:{source:'damageEnd',player:'damageEnd'},
				priority:99,
				lastDo:true,
				check:function(event,player){
					if(event.source&&event.source == player)	return get.attitude(player,event.player)<1;
					return true;
				},
				frequent:true,
				prompt:function(event,player){
					if(event.source&&event.source == player)	return '对'+get.translation(event.player)+'造成伤害，'+get.prompt('niaoji');
					return '受到来自'+get.translation(event.source)+'的伤害，'+get.prompt('niaoji');
				},
				filter:function(event,player){
					return event.source;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.suit(result)=='spade') return 2;
						if(get.suit(result)=='heart') return 2;
						return -1;
					};
					event.target = (player==trigger.source)?trigger.player:trigger.source;
					if(!event.target||!event.target.isIn()||event.target.countCards('he')<=0){
						func=function(result){
							if(get.suit(result)=='spade') return 0;
							if(get.suit(result)=='heart') return 2;
							return -1;
						};
					}
					player.judge(func);
					'step 1'
					if(result.bool){
						event.num = player.maxHp-player.hp+1;
						if(result.suit=='spade'){
							if([player.name,player.name1].contains('Yousa')) game.playAudio('skill','niaoji_spade'+Math.ceil(3*Math.random()));
							player.discardPlayerCard('###『鸟肌』###弃置'+get.translation(event.target)+get.cnNumber(event.num)+'张牌',event.target,event.num,true,'he');
						}else if(result.suit=='heart'){
							if([player.name,player.name1].contains('Yousa')) game.playAudio('skill','niaoji_heart'+Math.ceil(3*Math.random()));
							player.draw(event.num);
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
					if(player.inRange(target)) return true;
				},
				content:function(){
					'step 0'
					var next = player.chooseCardButton('###『翔星』###按顺序将卡牌置于牌堆顶（先选择的在上）',player.getCards('h'),player.countCards('h'),true);
					next.set('forceAuto',function(){
						return ui.selected.buttons.length==_status.event.player.countCards('h');
					});
					next.set('ai',function(button){
						if(get.suit(button.link)=='heart')	return 8+Math.random();
						if(get.suit(button.link)=='spade')	return 6+Math.random();
						return 4+Math.random();
					})
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
				},
				ai:{
					order:function(item,player){
						if(player.countCards('h',{suit:'heart'}))	return 4;
						else return 1;
					},
					result:{
						player:function(player,target){
							var num = -player.countCards('h');
							if(player.countCards('h',{suit:'heart'}))	num+=(player.maxHp-player.hp+1);
							return num;
						},
						target:function(player,target){
							if(target.hasSkill('shenyou')) return 0;
							return get.damageEffect(target,player);
						}
					},
					expose:0.2,
				},
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
						trigger.excluded.add(trigger.target);
						game.log(trigger.getParent().card,'不会对',trigger.target,'生效');
					}else{
						trigger.player.link();
						trigger.excluded.add(trigger.target);
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
				check:function(card){
					return 7-get.value(card);
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
						trigger:{player:'useCard',target:'useCardToTarget'},
						priority:77,
						lastDo:true,
						forced:true,
						filter:function(event,player){
							if(get.type(event.card,'trick')!='trick')	return false;
							if(player.storage.tianyi_drawBy && player.storage.tianyi_drawBy.contains(get.suit(event.card)))	return false;
							return player.storage.tianyi.length && get.suit(player.storage.tianyi[0])!=get.suit(event.card);
						},
						content:function(){
							player.draw();
							if(!player.storage.tianyi_drawBy)	player.storage.tianyi_drawBy = [];
							player.storage.tianyi_drawBy.add(get.suit(trigger.card));
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
							player.gain(trigger.getParent().cards,'gainAuto');
						}
					},
					clear:{
						trigger:{global:['gameDrawAfter','phaseAfter'],player:['enterGame','phaseZhunbeiBegin']},
						direct:true,
						firstDo:true,
						content:function(){
							'step 0'
							if(trigger.name=='phase'){
								delete player.storage.tianyi_drawBy;
								event.finish();
							}
							else if(trigger.name=='phaseZhunbei'&&player.storage.tianyi.length){
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
				ai:{order:4,result:{player:1}},
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
				},
				ai:{
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')==1&&!player.hasSkill('nveyu_eff')&&!target.hujia&&target.hp>1){
								if(target.hasSkillTag('maixie'))	return [1,1,0,3];
								return [1,1,0,1];
							}
						}
					}
				}
			},
			//tm
			gonggan:{
				trigger:{global:'phaseBegin'},
				priority:23,
				direct:true,
				filter:function(event,player){
					return event.player!=player&&player.countCards('h')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0&&player.countCards('h')<=1;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt2('gonggan')).set('ai',function(card){
						if(get.number(card)>10)			return 8-get.value(card)+Math.random();
						if(player.countCards('h')>=3)	return 5-get.value(card)+Math.random();
						if(player.countCards('h')==1)	return -get.value(card)+Math.random();
						return 2-get.value(card)+Math.random();
					});
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
					next.set('ai',function(button){
						var num = 0
						_status.event.cards.forEach(function(card){
							if(get.suit(card)==button.link[2])	num++;
						})
						return num+Math.random();
					});
					next.set('cards',player.getCards('h'));
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							number:function(card,player,number){
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
							return (get.name(event.card)=='sha')&&player.countDiscardableCards(player,'he');
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
							return event.targets&&event.targets.length&&player.countCards('h',{suit:'club'});
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
								var prompt2='为'+get.translation(trigger.card)+'增加或减少一个目标'
								player.chooseTarget(get.prompt('yeyu'),function(card,player,target){
									var player = _status.event.player;
									var source = _status.event.source;
									if(_status.event.targets.contains(target)) return true;
									return lib.filter.targetEnabled2(_status.event.card,source,target)&&lib.filter.targetInRange(_status.event.card,source,target);
								}).set('prompt2',prompt2).set('ai',function(target){
									var trigger=_status.event.getTrigger();
									var player=_status.event.player;
									var source = _status.event.source;
									return get.effect(target,trigger.card,source,player)*(_status.event.targets.contains(target)?-1:1);
								}).set('targets',trigger.targets).set('card',trigger.card).set('source',trigger.player)
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
					event.list2 = target.getCards('h');
					//target.showCards(event.list2,'『花吻交染』展示手牌');
					game.broadcastAll(function(id, list1, list2, player, target){
						var dialog=ui.create.dialog('『花吻交染』交换花色、点数、种类相同的牌各一张');
						dialog.addText(get.translation(player)+'的手牌');
						dialog.add([list1, 'card']);
						dialog.addText(get.translation(target)+'的手牌');
						dialog.add([list2, 'card']);
						dialog.videoId = id;
					}, event.videoId, event.list1, event.list2, player, target);
					game.delay(1);
					'step 1'
					var next = player.chooseButton(true).set('target',target).set('list1',event.list1).set('list2',event.list2);
					next.set('dialog',event.videoId);
					next.set('selectButton',function(){
						if(ui.selected.buttons.length%2==1){
							return [ui.selected.buttons.length+1,ui.selected.buttons.length+1];
						}
						return [0,6];
					});
					next.set('filterButton',function(button){
						var now = button.link;
						var links = ui.selected.buttons.map(function(button){
							return button.link;
						})
						return _status.event.process(links,now);
						// if(ui.selected.buttons.length%2==1){
						// 	var now = button.link, pre = ui.selected.buttons[ui.selected.buttons.length-1].link;
						// 	if(event.list1&&event.list1.length&&event.list1.contains(now)&&event.list1.contains(pre))	return false;
						// 	if(event.list1&&event.list2.length&&event.list2.contains(now)&&event.list2.contains(pre))	return false;
						// 	if(ui.selected.buttons.length>2){
						// 		var from = ui.selected.buttons;
						// 		if(from.length>4){
						// 			if((get.type(from[0].link)==get.type(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
						// 			||(get.type(from[2].link)==get.type(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
						// 				return get.number(now)==get.number(pre);
						// 			if((get.number(from[0].link)==get.number(from[1].link)&&get.suit(from[2].link)==get.suit(from[3].link))
						// 			||(get.number(from[2].link)==get.number(from[3].link)&&get.suit(from[0].link)==get.suit(from[1].link)))
						// 				return get.type(now)==get.type(pre);
						// 			if((get.number(from[0].link)==get.number(from[1].link)&&get.type(from[2].link)==get.type(from[3].link))
						// 			||(get.number(from[2].link)==get.number(from[3].link)&&get.type(from[0].link)==get.type(from[1].link)))
						// 				return get.suit(now)==get.suit(pre);
						// 		}else{
						// 			if(get.type(from[0].link)==get.type(from[1].link))	return get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre);
						// 			if(get.suit(from[0].link)==get.suit(from[1].link))	return get.type(now)==get.type(pre)||get.number(now)==get.number(pre);
						// 			if(get.number(from[0].link)==get.number(from[1].link))	return get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre);
						// 		}
						// 	}else{
						// 		return (get.type(now)==get.type(pre)||get.suit(now)==get.suit(pre)||get.number(now)==get.number(pre));
						// 	}
						// 	return false;
						// }
						// return true;
					});
					next.set('switchToAuto',function(){
						_status.event.result='ai';
					}).set('processAI',function(){
						var player = _status.event.player;
						var target = _status.event.target;
						var list1 = _status.event.list1.slice(0);
						var list2 = _status.event.list2.slice(0);
						var cards = list1.concat(list2);
						var links = [];
						if(get.attitude(player,target)<0){
							var saves = list2.filter(function(card){
								return ['tao','jiu','zong'].contains(get.name(card))
							})
							if(target.hp==1||player.hp==1||saves.length){
								var dones = [];
								saves.forEach(function(save){
									list1.forEach(function(card){
										if(_status.event.process(save,card)){
											dones.push(save);
											dones.push(card);
										}
									})
								})
								links.addArray(dones.splice(0,2));
							}
						}else{
							var dones = [];
							for(var i=0;i<list1.length;i++){
								var done = [list1[i]];
								var choices = cards.slice(0).remove(list1[i]);
								for(var j=0;j<choices.length;j++){
									console.log(done)
									if(done.length==6)	break;
									if(_status.event.process(done,choices[j])){
										done.push(choices[j]);
										choices.remove(choices[j]);
										j = 0;
									}
								}
								dones.push(done);
							}
							console.log(dones)
							if(dones.length>0){
								dones.sort(function(a,b){
									return b.length-a.length;
								});
								links.addArray(dones[0]);
							}
						}
						return {
							bool:true,
							links:links,
						}
					});
					next.set('process',function(selected,now){
						var last = selected.slice(0);
						var over = {
							type:0,
							suit:0,
							number:0
						};
						var going = [];
						if(last.length%2==1){
							var pack = selected[selected.length-1];
						}
						for(var i=0;i<last.length;i+=2){
							if(!last[i+1])	continue;
							var go = [];
							for(var j in over){
								if((j=='trye'&&get.type(last[i],'trick')==get.type(last[i+1],'trick'))||get[j](last[i])==get[j](last[i+1])){
									go.add(j);
								}
							}
							if(!go.length)	continue;
							for(var i=0;i<go.length;i++){
								going.add(go[i]);
								over[go[i]]+=(1/go.length);
							}
						}
						var list1 = _status.event.list1;
						var list2 = _status.event.list2;
						if(!pack){
							if(list1.contains(now)){
								for(var i=0;i<list2.length;i++){
									for(var j in over){
										if((j=='trye'&&get.type(list2[i],'trick')==get.type(now,'trick'))||get[j](list2[i])==get[j](now)){
											if(!going.contains(j)||over[j]<1)	return true;
										}
									}
								}
							}
							if(list2.contains(now)){
								for(var i=0;i<list1.length;i++){
									for(var j in over){
										if((j=='trye'&&get.type(list1[i],'trick')==get.type(now,'trick'))||get[j](list1[i])==get[j](now)){
											if(!going.contains(j)||over[j]<1)	return true;
										}
									}
								}
							}
						}
						else{
							if(list1.contains(pack)){
								if(!list2.contains(now))	return false;
								for(var j in over){
									if((j=='trye'&&get.type(pack,'trick')==get.type(now,'trick'))||get[j](pack)==get[j](now)){
										if(!going.contains(j)||over[j]<1)	return true;
									}
								}
							}
							if(list2.contains(pack)){
								if(!list1.contains(now))	return false;
								for(var j in over){
									if((j=='trye'&&get.type(pack,'trick')==get.type(now,'trick'))||get[j](pack)==get[j](now)){
										if(!going.contains(j)||over[j]<1)	return true;
									}
								}
							}
						}
						return false;
					})
					// next.set('ai',function(button){
					// 	var now = button.link;
					// 	if(ui.selected.buttons.length/2==1&&ui.selected.buttons.length%2==1)		return 10;
					// 	if(event.list1&&event.list1.length&&event.list1.contains(now))	return 9-get.value(button.link,_status.event.player);
					// 	return get.value(button.link,_status.event.player);
					// });
					'step 2'
					game.broadcastAll('closeDialog', event.videoId);
					if(result.bool&&result.links){
						var cards1 = result.links.slice(0);
						var cards2 = result.links.slice(0);
						cards1 = cards1.filter(function(card){
							return event.list1.contains(card);
						})
						cards2 = cards2.filter(function(card){
							return event.list2.contains(card);
						})
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
				ai:{
					order:7,
					result:{
						target:function (player,target){
							if(target.countCards('h')>=3){
								return 2;
							}
							else if(target.countCards('h')>=1){
								return 0;
							}
							else if(target.hp==1){
								return -2;
							}
							else{
								return -1;
							}
						},
						player:function(player,target){
							if(player.countCards('h')>=3){
								return 2;
							}
							else if(player.countCards('h')>=1){
								return 0;
							}
							else if(player.hp==1){
								return -1;
							}
							else{
								return -0.5;
							}
						},
					}
				},
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
				check:function(event,player){
					if(player.storage.huawen&&player.storage.huawen.length){
						return get.recoverEffect(player.storage.huawen[0],player,player);
					}else{
						return get.recoverEffect(player,player,player);
					}
				},
				content:function(){
					if(player.getStat().skill.huawen!=undefined){
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
					}).set('ai',function(target){
						return 1-get.attitude(player,target)+Math.random();;
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
							player.chooseTarget(true,'###『煌燃』###分配多余的一点伤害').set('ai',function(target){
								return 1-get.attitude(player,target)<0+Math.random();;
							});
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
						priority: 999,
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
						event.getParent().getTrigger().excluded.add(target);
						game.log(event.getParent().getTrigger().card,'不会对',target,'生效');
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
						return get.value(button.link,_status.event.player)+Math.random();;
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
				audio:'yubing',
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player,name){
					return event.num&&player.countDiscardableCards(player,'e');
				},
				content:function(){
					'step 0'
					player.discardPlayerCard('###'+get.prompt('helesta')+'###可以弃置装备区的一张牌使伤害-1',player,'e').set('ai',function(){
						if(player.isDamaged()||player.countCards('e')==1)	return 5+Math.random();
						return Math.random()-0.2;
					});
					'step 1'
					if(result.bool){
						trigger.num--;
					};
				},
				mod:{
					aiValue:function(player,card,num){
						if(game.roundNumber>1&&get.type(card)=='equip'&&!get.cardtag(card,'gifts')){
							if(get.position(card)=='e') return num/player.hp;
							return num*player.hp;
						}
					},
				},
				group:'helesta_iceshaBy',
				subSkill:{
					iceshaBy:{
						trigger:{
							player:'loseAfter',
							global:['equipAfter','addJudgeAfter','gainAfter'],
						},
						filter:function(event,player){
							var evt=event.getl(player);
							return evt&&evt.es&&evt.es.length>0&&player.hasUseTarget({name:'sha',nature:'ice',isCard:true});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseUseTarget('###'+get.prompt('helesta')+'###视为使用一张冰【杀】并摸一张牌',{name:'sha',nature:'ice',isCard:true},false);
							'step 1'
							if(result.targets&&result.targets.length){
								player.logSkill('helesta');
								player.draw();
							}
						},
					}
				},
			},
			//ange
			chuangzuo:{},
			//露露
			zhongli:{
				mark:true,
				intro:{
					name:'本回合因『重力牵引』获得的牌',
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
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
						player.gain(result.card,'draw');
						if(!event.cards)	event.cards = [];
						event.cards.add(result.card);
						event.goto(0);
					}
					'step 2'
					if(event.cards&&event.cards.length){
						for(var i =0;i<event.cards.length;i++){
							if(!player.storage.zhongli.contains(event.cards[i])){
								event.newPhaseUse = true;
							}
						}
					}else{
						event.finish();
					}
					'step 3'
					if(event.newPhaseUse){
						player.markAuto('zhongli',event.cards);
						if(player.maxHp>1)	player.loseMaxHp();
						player.phaseUse();
					}
					'step 4'
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
				group:'zhongli_clear',
				subSkill:{
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						lastDo:true,
						priority:666,
						content:function(){
							player.unmarkSkill('zhongli');
						}
					},
				}
			},
			xinhuo:{
				audio:2,
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
					next.set('ai',function(button){
						if(get.type(button.link)=='equip'){	
							if(typeof get.info(button.link).onLose=='function') return 10+Math.random();
							else return 7+Math.random();
						}
						if(get.name(button.link)=='sha'&&player.countCards('h',{name:'sha'})==1)	return 0;
						return 7-get.value(button.link)/2+Math.random();
					});
					'step 1'
					if(result.bool&&result.links&&result.links.length)	event.cards=result.links.slice(0);
					else	event.finish();
					game.delay();
					'step 2'
					game.log(player,'把两张牌放在了牌堆顶');
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
						player.storage.xinhuo_chuanhuo = 1;
						var buff = '.player_buff';
						game.broadcastAll(function(player, buff){
							player.node.xinhuo= ui.create.div(buff ,player.node.avatar);
						}, player, buff);
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.type(card,'trick')=='trick'&&get.info(card).notarget!==true&&!player.needsToDiscard()){
							var evt=player.getStat().card;
							for(var i in evt){
								if(evt[i]&&get.type(evt[i],'trick')=='trick'){
									return num-7;
								}
							}
						}
					},
				},
				ai:{
					order:function(item,player){
						var cards =  Object.entries(player.getStat().card);
						for(var i=0;i<cards.length;i++){
							if(get.type(cards[i][0])=='basic'){
								if(player.hasSha()&&player.countCards('he')>=3&&(!player.storage.xinhuo_chuanhuo||player.storage.xinhuo_chuanhuo<2)){
									return 7.1;
								}
							}
						}
						return 0;
					},
					result:{player:1},
				},
				subSkill:{
					chuanhuo:{
						audio:3,
						trigger:{player:'useCard'},
						forced:true,
						onremove:function(player){
							if(player.node.xinhuo){
								player.node.xinhuo.delete();
								delete player.node.xinhuo;
							}
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
						ai:{
							useSha:1,
						}
					},
				},
			},
			weizhuang:{
				audio:2,
				trigger:{player:'useCardAfter'},
				locked:true,
				direct:true,
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
					if(get.type(trigger.card,'trick')=='basic'&&player.getHistory('useCard',function(evt){
						return get.type(evt.card,'trick')=='basic';
					}).length>1){
						player.logSkill('weizhuang');
						player.draw(trigger.targets.length);
					}else if(get.type(trigger.card,'trick')=='trick'&&player.getHistory('useCard',function(evt){
						return get.type(evt.card,'trick')=='trick';
					}).length>1){
						player.logSkill('weizhuang_discard');
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
					discard:{},
					clear:{
						trigger:{global:'gameDrawAfter',player:['enterGame','phaseAfter']},
						direct:true,
						firstDo:true,
						priority:666,
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
				ai:{
					threaten:1.5,
					effect:{
						player:function(card,player,target,current){
							if(get.color(card)=='black'&&get.tag(card,'damage')){
								if(player.countDiscardableCards(target,'e'))	return [1,-0.5,1,-1];
								return [1,1,1,-1];
							}
						}
					}
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
				ai:{
					threaten:1.5
				}
			},
			zhongjizhimeng:{
				audio:true,
				audioname:['jike'],
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					var next = player.chooseCard('h',true,'『重机织梦』：展示一张手牌');
					next.set('ai',function(card){
						var player = _status.event.player;
						if(get.suit(card)=='red'&&player.hasUseTarget(card))	return 5+get.order(card);
						if(player.hasUseTarget(card))	return 2+get.order(card);
						return 6-get.value(card);
					})
					'step 1'
					if(result.bool){
						event.cards = result.cards;
						player.showCards(event.cards,'###『重机织梦』###展示手牌');
						player.addGaintag(event.cards,'zhongjizhimeng')
					}else{
						event.finish();
					}
				},
				mod:{
					color:function(card,player,color){
						if(!card.cards||card.cards.length!=1) return;
						for(var i of card.cards){
							if(i.hasGaintag('zhongjizhimeng')){
								if(color=='red')	return 'black';
								else if(color=='black')	return 'red';
							}
						}
					},
				},
				ai:{order:10,player:1},
				group:['zhongjizhimeng_lose','zhongjizhimeng_clear'],
				subSkill:{
					lose:{
						trigger:{player:'loseAfter'},
						filter:function(event,player){
							for(var i in event.gaintag_map){
								if(event.gaintag_map[i].contains('zhongjizhimeng')) return true;
							}
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget('###'+get.prompt('zhongjizhimeng')+'###令一名角色回复1点体力或摸两张牌').set('ai',function(target){
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
									event.target.recover(player);
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
						trigger:{player:['phaseAfter']},
						direct:true,
						firstDo:true,
						content:function(){
							player.removeGaintag('zhongjizhimeng');
						}
					},
				},
			},
			//阿喵喵
			miaomiao:{
				trigger:{source:'damageBegin1'},
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
					trigger.player.recover(player);
					'step 3'
					if(player.hasSkill('chengneng_used')){
						player.draw();
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&!player.needsToDiscard()){
							return num-10;
						}
					},
				},
				ai:{
					notricksource:true,
					effect:{
						player:function(card,player,target,current){
							if(get.tag(card,'damage')==1){
								var num = get.recoverEffect(target,player,player);
								return [0,num,0,num];
							}
						}
					}
				}
			},
			chengneng:{
				trigger:{global:'damageBegin3'},
				priority:3,
				firstDo:true,
				direct:true,
				filter:function(event,player){
					return event.num&&player.countDiscardableCards(player,'he');
				},
				check:function(event,player){
					if(event.num==1)	 return get.recoverEffect(event.player,player,player);
					return 0;
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
			//下巴
			shenglang:{
				enable:'phaseUse',
				viewAs:{name:'juedou'},
				usable:1,
				filter:function(event,player){
					return player.hasCard(function(card){
						return get.name(card)=='sha';
					});
				},
				filterCard:function(card,player){
					return get.name(card)=='sha';
				},
				check:function(card){
					return 8-get.value(card);
				},
				ai:{
					basic:{
						order:10
					},
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='directHit_ai'){
							if(arg&&get.name(arg.card)=='juedou') return true;
							return false;
						}
					},
					result:{player:1},
				},
				group:'shenglang_drawBy',
				subSkill:{
					drawBy:{
						trigger:{player:'phaseEnd'},
						priority:7,
						direct:true,
						filter:function(event,player){
							var num = 0,going = 0;
							game.getGlobalHistory('cardMove',function(evt){
								if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
								if(evt.player==player)	going++;
								if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
								for(var i=0;i<evt.cards.length;i++){
									var card=evt.cards[i];
									if(get.name(card)=='sha'&&get.suit(card)=='spade')	num++;
								}
							},event);
							return going&&num;
						},
						content:function(){
							var num = 0;
							game.getGlobalHistory('cardMove',function(evt){
								if(evt==event||(evt.name!='lose'&&evt.name!='cardsDiscard')) return false;
								if(evt.name=='lose'&&evt.position!=ui.discardPile) return false;
								for(var i=0;i<evt.cards.length;i++){
									var card=evt.cards[i];
									if(get.name(card)=='sha'&&get.suit(card)=='spade')	num++;
								}
							},event);
							event.num = num;
							player.logSkill('shenglang');
							player.draw(event.num);
						}
					}
				}
			},
			nodao:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.getEquip(1)&&player.countCards('h','sha')>0;
				},
				filterCard:{name:'sha'},
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(result&&get.itemtype(event.cards)=='cards'){
						for(var i=0;i<result.length;i++)
						if(get.subtype(result[i])=='equip1'){
							event.card = result[i];
							player.chooseBool('『无刀之咎』：是否装备'+get.translation(event.card)+'并回复一点体力？');
						}
					}
					'step 2'
					if(result.bool){
						player.equip(event.card);
						player.recover();
					}
				},
				ai:{
					basic:{
						order:2
					},
					result:{
						player:function(player,target){
							if(player.getStat().card.juedou)	return 1;
							else return 0.5;
						},
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.subtype(card)=='equip1') return (num>1?1:num);
					},
					aiValue:function(player,card,num){
						if(get.itemtype(card)=='card'&&get.subtype(card)=='equip1') return num/10;
						if(get.itemtype(card)=='card'&&player.getStat().card.juedou&&get.name(card)=='sha') return num/10;
					},
				},
			},
			//凛月
			zhuqiao:{
				audio:5,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 0;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.zhuqiao<24;
				},
				check:function(card,cards){
					var player=_status.event.player;
					if(player.storage.zhuqiao_addCard&&player.storage.zhuqiao_addCard.contains(get.suit(card)))	return 6-get.value(card);
					return 9-get.value(card);
				},
				filterCard:true,
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
				position:'he',
				discard:false,
				loseTo:'discardPile',
				visible:true,
				delay:0.5,
				content:function(){
					player.draw();
					player.storage.zhuqiao += get.number(cards[0]);
					if(!player.hasSkill('zhuqiao_addCard'))		player.addTempSkill('zhuqiao_addCard');
					if(!player.storage.zhuqiao_addCard)			player.storage.zhuqiao_addCard = [];
					player.storage.zhuqiao_addCard.add(get.suit(cards[0]));
					player.markSkill('zhuqiao_addCard');
				},
				ai:{
					basic:{
						order:1,
					},
					result:{
						player:0.5,
					},
					threaten:1.5
				},
				group:['zhuqiao_clear'],
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						priority:24,
						forced:true,
						silent:true,
						popup:false,
						content:function(){
							player.storage.zhuqiao = 0;
						},
					},
					mark:{
						trigger:{player:'loseAfter'},
						priority:24,
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player,name){
							console.log(event);
							if(!event.visible||event.getParent().name!='useSkill')	return false;
							return [event.hs[0],event.es[0]].event.cards[0]//&&event.getParent().cards==event.cards;
						},
						content:function(){
							if(!player.hasSkill('zhuqiao_addCard'))		player.addTempSkill('zhuqiao_addCard');
							if(!player.storage.zhuqiao_addCard)			player.storage.zhuqiao_addCard = [];
							player.storage.zhuqiao_addCard.add(get.suit(trigger.cards[0]));
							player.markSkill('zhuqiao_addCard');
						},
					},
					addCard:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						mark:true,
						intro:{
							content:'本回合重铸牌的花色：$',
						},
						trigger:{player:'phaseEnd'},
						priority:24,
						direct:true,
						filter:function(event,player,name){
							return game.countPlayer(function(cur){
								return player.storage.zhuqiao_addCard.length>cur.countCards('h');
							});
						},
						onremove:function(player){
							delete player.storage.zhuqiao_addCard;
						},
						content:function(){
							'step 0'
							event.num = player.storage.zhuqiao_addCard.length;
							player.chooseTarget('###'+get.prompt('zhuqiao')+'###令一名角色将手牌数补至'+get.cnNumber(event.num)+'张',function(card,player,target){
								return player.storage.zhuqiao_addCard.length>target.countCards('h');
							}).set('ai',function(target){
								var player = _status.event.player;
								return get.attitude(player,target);
							})
							'step 1'
							if(result.bool&&result.targets&&result.targets.length){
								event.target = result.targets[0];
								player.logSkill('zhuqiao',event.target);
								event.target.gain(get.cards(event.num-event.target.countCards('h')),'draw')
							}
						},
					},
				}
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
						direct:true,
						lastDo:true,
						priority:2,
						filter:function(event,player){
							return player.storage.pojie>0;
						},
						content:function(){
							'step 0'
							if(trigger.name=='phaseDiscard'){
								player.logSkill('pojie');
								player.chooseToDiscard(player.storage.pojie,true,'h');
								trigger.cancel();
							}
							'step 1'
							player.storage.pojie = 0;
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
					if(event.equip){
						target.$give(event.equip,player);
						player.equip(event.equip);
					}
					player.$give(cards,target);
					target.equip(cards[0]);
					'step 2'
					event.num =Math.abs(player.getHandcardLimit()-player.countCards('h'));
					target.chooseToDiscard('『大振』：需要弃置'+get.cnNumber(event.num)+'张牌',event.num,'he',true);
				},
				ai:{
					order:6,
					result:{
						target:function (player,target){
							if(player.countCards('h')>player.getHandcardLimit()){
								return -1;
							}
							else{
								return 0;
							}
						},
						player:function(player,target){
							if(target.getEquip(1))	return 1;
							else return -0.5;
						},
					},
					threaten:1.2,
				},
			},
			//ptr
			mianmo:{
				audio:3,
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(player.hasSkill('mianmo_used'))	return false;
					return event.targets&&event.targets.length&&event.cards&&event.cards.length;
				},
				direct:true,
				firstDo:true,
				priority:4,
				content:function(){
					'step 0'
					event.num = 0;
					for(var i=0;i<trigger.cards.length;i++){
						event.num += get.number(trigger.cards[i],player);
					}
					event.card = trigger.cards[0];
					var next = player.chooseTarget();
					next.set('prompt',get.prompt2('mianmo').replace('之点数或合计点数',event.num));
					next.set('filterTarget',function(){
						return true;
					});
					next.set('complexTarget',true);
					next.set('selectTarget',function(){
						var num = _status.event.num,sum = 0;
						for(var j=0;j<ui.selected.targets.length;j++){
							sum += ui.selected.targets[j].hp;
						}
						if(num==sum) return [0,ui.selected.targets.length];
						else return [ui.selected.targets.length+1,ui.selected.targets.length+1];
					});
					next.set('num',event.num);
					next.set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,player,player);
					});
					'step 1'
					if(result.bool){
						event.targets = result.targets.slice(0);
						player.logSkill('mianmo',event.targets);
						if(player.storage.tiaolv_up&&player.storage.tiaolv_up.contains(event.card))		event.goto(4);
						if(player.storage.tiaolv_down&&player.storage.tiaolv_down.contains(event.card))	event.goto(6);
					}else{
						event.finish();
					}
					'step 2'
					if(event.targets.contains(player)){
						if(!player.canUse(event.card,player))	event.targets.remove(player);
					}else{
						player.addTempSkill('mianmo_used')
					}
					'step 3'
					trigger.targets = event.targets;
					event.finish();
					'step 4'
					player.chooseBool('眠魔：是否令目标各摸一张牌？').set('ai',function(){
						var player=_status.event.player;
						if(_status.event.targets.contains(player)) return true;
						return false;
					}).set('targets',event.targets);
					'step 5'
					if(result.bool){
							game.asyncDraw(event.targets);
					}
					event.goto(2);
					'step 6'
					player.chooseBool('眠魔：是否令目标横置？').set('ai',function(){
						return true;
					});
					'step 7'
					if(result.bool){
						event.targets.forEach(function(tar){
							if(!tar.isLinked()) tar.link();
						});
					}
					event.goto(2);
				},
				subSkill:{
					used:{},
				},
			},
			tiaolv:{
				audio:4,
				trigger:{player:'useCard1'},
				filter:function(event,player){
					return event.cards&&event.cards.length==1;
				},
				firstDo:true,
				direct:true,
				priority:5,
				content:function(){
					'step 0'
					player.chooseControl(['增加','减少','cancel2']).set('prompt',get.prompt2('tiaolv'));
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('tiaolv');
						switch (result.control) {
							case '增加':
								player.storage.tiaolv_up.addArray(trigger.cards);
								break;
							case '减少':
								player.storage.tiaolv_down.addArray(trigger.cards);
								break;
							default:
								break;
						}
					}
				},
				group:['tiaolv_up','tiaolv_down'],
				subSkill:{
					up:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						trigger:{player:'useCardAfter'},
						firstDo:true,
						silent:true,
						direct:true,
						priority:5,
						content:function(){
							if(player.storage[event.name].length)	player.storage[event.name].length=0;
						},
						mod:{
							number:function(card,player,number){
								var num = (player.maxHp-player.hp)||1;
								if(player.storage.tiaolv_up.contains(card))	return number+num;
							},
						},
					},
					down:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = [];
						},
						trigger:{player:'useCardAfter'},
						firstDo:true,
						silent:true,
						direct:true,
						priority:5,
						content:function(){
							if(player.storage[event.name].length)	player.storage[event.name].length=0;
						},
						mod:{
							number:function(card,player,number){
								var num = (player.maxHp-player.hp)||1;
								if(player.storage.tiaolv_down.contains(card))	return number-num;
							},
						},
					},
				},
			},
			//狼半仙
			niwei:{
				marktext:'弼',
				intro:{
					name:'味增弼佐',
					content:function(storage,player){
						var str='<ul style="padding-top:0;margin-top:0"><p>本回合变为逆位的牌名</p>';
						for(var i=0;i<storage.length;i++){
							str+='<li>'+get.translation(storage[i]);
						}
						str+='</ul>'
						return str;
					},
				},
				onremove:function (player,skill){
					player.unmarkSkill(skill);
					delete player.storage[skill]
				},
			},
			ming_niwei:{
				trigger:{global:['shaBegin','shanBegin','taoBegin','jiuBegin']},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					if(event.player.hasSkill('niwei')&&event.player.storage.niwei&&event.player.storage.niwei.contains(event.name))	return true;
					if(event.player!=player)	return false;
					var loser = player.getHistory('lose',function(evt){
						 return (evt.type=='use'&&evt.getParent().card&&evt.getParent().card==event.card);
					});
					loser = loser[loser.length-1];
					console.log(loser);
					if(loser.getParent()){
						if(event.getParent()==loser.getParent()){
							for(var i in loser.gaintag_map){
								if(loser.gaintag_map[i].contains('ming_niwei')) return true;
							}
						}
					}
				},
				content:function(){
					var fun = lib.card['niwei_'+trigger.name].content;
					if(fun)	trigger.setContent(fun);
				},
				ai:{
					threaten:0.8,
				}
			},
			xuanxu:{
				audio:4,
				global:'xuanxu_put',
				group:'ming_niwei',
				trigger:{player:'phaseUseBegin'},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					return player.countCards('h',function(card){
						return get.type(card)=='basic'&&!card.hasGaintag('ming_');
					});
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('xuanxu'),[1,Infinity],function(card){
						return get.type(card)=='basic'&&!card.hasGaintag('ming_');
					}).set('ai',function(card){
						return 7-get.useful(card);
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						event.cards = result.cards.slice(0);
						game.log(player,'亮出了',event.cards);
						player.addGaintag(event.cards,'ming_niwei');
					}
				},
				subSkill:{
					put:{
						mod:{
							targetEnabled:function(card,player,target,now){
								if(!card.cards) return;
								for(var i of card.cards){
									if(!i.hasGaintag('ming_niwei')) return;
								}
								if(now===false)	return true;
								var info=get.info(card);
								var filter=info.filterTarget;
								var range=info.range;
								var outrange=info.outrange;
								if(typeof filter=='boolean') return !filter;
								if(range==undefined&&outrange==undefined){
									if(typeof filter=='function'){
										return !filter(card,player,target);
									}
								}else{
									return lib.filter.targetInRange(card,player,target)||!filter(card,player,target);
								}
							},
						}
					}
				},
				mod:{
					playerEnabled:function(card,player,target,now){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						var info=get.info(card);
						var filter=info.filterTarget;
						var range=info.range;
						var outrange=info.outrange;
						if(typeof filter=='boolean') return !filter;
						if(range==undefined&&outrange==undefined){
							if(typeof filter=='function'){
								return !filter(card,player,target);
							}
						}else{
							return lib.filter.targetInRange(card,player,target)||!filter(card,player,target);
						}
					},
					selectTarget:function(card,player,range){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						if(range[1]==-1)	range[1]=1;
					},
					targetInRange:function(card,player,target,now){
						if(!card.cards) return;
						for(var i of card.cards){
							if(!i.hasGaintag('ming_niwei')) return;
						}
						var info=get.info(card);
						var range=info.range;
						var outrange=info.outrange;
						if(range==undefined&&outrange==undefined) return true;
						if(player.hasSkill('undist')||target.hasSkill('undist')) return true;
						for(var i in range){
							if(i=='attack'){
								if(target==player)	return true;
								if(player.inRange(target)) return false;
								var range2=player.getAttackRange();
								if(range2<=0) return true;
								var distance=get.distance(player,target);
								if(range[i]<=distance-range2) return true;
							}
							else{
								var distance=get.distance(player,target,i);
								if(range[i]<distance) return true;
							}
						}
						for(var i in outrange){
							if(i=='attack'){
								var range2=player.getAttackRange();
								if(range2<=0) return true;
								var distance=get.distance(player,target)+extra;
								if(outrange[i]>distance-range2+1) return true;
							}
							else{
								var distance=get.distance(player,target,i)+extra;
								if(outrange[i]>distance) return true;
							}
						}
						return false;
					},
					ignoredHandcard:function(card,player){
						if(card.hasGaintag('ming_niwei')){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&card.hasGaintag('ming_niwei')){
							return false;
						}
					},
				},
			},
			weizeng:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{global:'phaseBegin'},
				direct:true,
				lastDo:true,
				priority:3,
				filter:function(event,player){
					return event.player!=player&&player.countCards('h',function(card){
						return get.type(card)=='basic'&&card.hasGaintag('ming_');
					});
				},
				content:function(){
					'step 0'
					event.target = trigger.player;
					player.chooseCard(get.prompt2('weizeng'),[1,Infinity],function(card){
						return get.type(card)=='basic'&&card.hasGaintag('ming_');
					}).set('ai',function(card){
						if(card.hasGaintag('ming_niwei')||['shan','tao'].contains(get.name(card))) return 0;
						return random()-0.1;
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						event.cards = result.cards.slice(0);
						player.chooseButton(true,event.cards.length,['按顺序将卡牌置于牌堆顶（先选择的在上）',event.cards]).set('ai',function(button){
							var value=get.value(button.link);
							if(_status.event.reverse) return value;
							return -value;
						}).set('reverse',((_status.currentPhase)?get.attitude(player,_status.currentPhase)>0:false));
					}else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.links&&result.links.length){
						event.linkcards = result.links.slice(0);
						player.lose(event.cards,ui.special);
						event.target.addTempSkill('weizeng_put');
						event.target.addTempSkill('niwei');
						event.target.storage.weizeng_put = [];
						event.target.storage.weizeng_put.addArray(event.cards);
						game.log(player,'将',event.cards,'置于牌堆顶');
					}
					'step 3'
					var cards=event.linkcards;
					while(cards.length>0){
						var card=cards.pop();
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				subSkill:{
					put:{
						trigger:{player:'gainAfter'},
						direct:true,
						lastDo:true,
						priority:3,
						filter:function(event,player){
							if(player.storage.weizeng_put&&player.storage.weizeng_put.length){
								for(var i=0;i<event.cards.length;i++){
									if(player.storage.weizeng_put.contains(event.cards[i])){
										return true;
									}
								}
							}
						},
						content:function(){
							'step 0'
							event.cards = [];
							if(!player.storage.niwei)	player.storage.niwei = [];
							for(var i=0;i<trigger.cards.length;i++){
								if(player.storage.weizeng_put.contains(trigger.cards[i])){
									player.storage.niwei.add(trigger.cards[i].name);
									event.cards.contains(trigger.cards.splice(i--,1));
								}
							}
							'step 1'
							player.markSkill('niwei');
							player.storage.weizeng_put.removeArray(event.cards);
						},
						onremove:true,
					}
				},
			},
			//贝海王
			aswusheng:{
				init:function(player,skill){
					player.storage[skill] = 0;
				},
				trigger:{player:['useCardBegin','respondBegin']},
				direct:true,
				frequent:true,
				priority:5,
				filter:function(event,player){
					return get.type(event.card)=='basic'||player.storage.aswusheng>0;
				},
				logTarget:function(event,player){
					if(event.name=='respond')	return event.source;
					if(['sha','qi','jiu','tao'].contains(event.card.name))	return event.targets[0];
					if(event.respondTo) return event.respondTo[0];
				},
				mark:true,
				intro:{
					content:'连续使用或打出了&张基本牌',
				},
				content:function(){
					'step 0'
					if(get.type(trigger.card)!='basic'&&player.storage.aswusheng>0){
						player.storage.aswusheng = 0;
						player.markSkill('aswusheng');
						event.finish();
					}
					event.num = player.storage.aswusheng;
					'step 1'
					var goto = false;
					var logTarget = get.copy(lib.skill.aswusheng.logTarget);
					var target = logTarget(trigger,player);
					player.storage.aswusheng++;
					player.markSkill('aswusheng');
					switch(event.num){
						case 0:goto = (trigger.name=='useCard');break;
						case 1:goto = true;break;
						case 2:goto = (target.countGainableCards(player,'he')>0);break;
						case 3:goto = (player.hp<player.maxHp);break;
						default:break;
					}
					if(goto){
						event.target = target;
						var next = player.chooseBool(get.prompt2('aswusheng').replace(event.num,'<span class="yellowtext">'+event.num+'</span>'));
						next.set('ai',function(){return 1});
						next.set('frequentSkill',event.name);
					}else{
						event.finish(0)
					}
					'step 2'
					if(result.bool||event.frequent){
						player.logSkill(event.name,event.target);
						switch(event.num){
							case 0:{
								if(trigger.addCount!==false){
									trigger.addCount=false;
									var stat=player.getStat();
									if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
								}
							};break;
							case 1:{
								player.draw();
							};break;
							case 2:player.gainPlayerCard(event.target,'he');break;
							case 3:player.recover();break;
						}
					}
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase&&get.name(card)=='sha'){
							if(player.countCards('h',{name:'sha'})>2&&player.storage.aswusheng==0)	return num+5;
							if(player.countCards('h',{name:'sha'})==2&&[0,2].contains(player.storage.aswusheng))	return num+3;
							if(player.storage.aswusheng==2)	return num+10;
						}
					},
				},
				ai:{
					threaten:0.8,
				}
			},
			gunxun:{
				enable:'phaseUse',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = true;
				},
				filter:function(event,player,cards){
					if(player.storage.gunxun)	return player.countCards('h',function(card){
						return !card.hasGaintag('ming_')&&get.color(card)=='red';
					});
					return player.countCards('h',function(card){
						return !card.hasGaintag('ming_')&&get.color(card)=='black';
					});
				},
				selectCard:[1,Infinity],
				filterCard:function(card,player){
					if(player.storage.gunxun)	return !card.hasGaintag('ming_')&&get.color(card)=='red';
					return !card.hasGaintag('ming_')&&get.color(card)=='black';
				},
				check:function(card){return 5-get.value(card)},
				discard:false,
				lose:false,
				content:function(){
					'step 0'
					game.log(player,'亮出了',event.cards);
					if(player.storage.gunxun) player.addGaintag(event.cards,'ming_gunxunsha');
					else player.addGaintag(event.cards,'ming_gunxunshan');
					'step 1'
					player.storage.gunxun = !player.storage.gunxun;
					var num = event.cards.length;
					if(game.hasPlayer(function(cur){
						return cur.countCards('e')<num;
					})){
						player.chooseTarget('『棍训』：令装备区牌数少于'+get.cnNumber(num)+'的一名角色失去所有非锁定技直到回合结束',function(card,player,target){
							return target.countCards('e')<_status.event.num;
						}).set('num',num).set('ai',function(target){
							var player = _status.event.player;
							return -get.attitude(player,target)+Math.random();
						})
					}
					'step 2'
					if(result.targets&&result.targets.length){
						var target = result.targets[0];
						event.target = target;
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
					}
				},
				mod:{
					cardname:function(card,player){
						if(card.hasGaintag&&card.hasGaintag('ming_gunxunshan'))	return 'shan';
						if(card.hasGaintag&&card.hasGaintag('ming_gunxunsha'))	return 'sha';
					},
				},
				ai:{
					order:7,
					result:{player:0.5},
				}
			},
			//嘉然
			quanyu:{
				audio:6,
				trigger:{global:'useCard1'},
				frequent:function(event,player){
					var handcards = player.getCards('h');
					var suits = [];
					for(var i=0;i<handcards.length;i++){
						suits.add(get.suit(handcards[i]));
					}
					var num = 4-suits.length;
					return event.cards&&event.cards.length&&event.cards[0].name!='du'&&player.hp>=num;
				},
				filter:function(event,player){
					var suit = get.suit(event.card);
					return event.cards&&event.cards.length&&suit!='none'&&event.player!=player&&player.countCards('h',function(card){
						return suit==get.suit(card);
					})==0;
				},
				check:function(event,player){
					var handcards = player.getCards('h');
					var suits = [];
					for(var i=0;i<handcards.length;i++){
						suits.add(get.suit(handcards[i]));
					}
					var num = 4-suits.length;
					if(player.hp<num)		return false;
					if(['shandian','du'].contains(event.card.name))		return false;
					if(event.targets&&event.targets.length&&get.attitude(player,event.player)<0){
						for(var i=0;i<event.targets.length;i++){
							if(get.effect(event.targets[i],event.card,event.player,player)<0)	return true;
						}
					}else{
						return get.attitude(player,event.player)<0;
					}
				},
				content:function(){
					'step 0'
					trigger.cancel();
					event.cards = trigger.cards;
					event.target = trigger.player;
					player.gain(event.cards,event.target,'gain2');
					'step 1'
					player.showHandcards('『全域』展示手牌');
					var handcards = player.getCards('h');
					var suits = [];
					for(var i=0;i<handcards.length;i++){
						suits.add(get.suit(handcards[i]));
					}
					event.num = 4-suits.length;
					if(event.num>0){
						player.damage(event.num,'nosource');
					}
				},
				ai:{
					expose:0.2,
				},
			},
			wulian:{
				audio:true,
				enable:'phaseUse',
				unique:true,
				limited:true,
				filter:function(event,player,cards){
					return player.isDamaged();
				},
				content:function(){
					'step 0'
					console.log(player.stat)
					player.awakenSkill('wulian');
					player.draw(player.maxHp-player.hp);
					'step 1'
					player.addTempSkill('lianpo','roundStart');
				},
				derivation:'lianpo',
				ai:{
					order:function(item,player){
						if((player.maxHp-player.hp)>=3) return 10;
						return 0;
					},
					result:{player:2},
				}
			},
			lianpo:{
				audio:4,
				//audioname:['Diana'],
				trigger:{global:'phaseAfter'},
				frequent:true,
				onremove:true,
				filter:function(event,player){
					return player.getStat('kill')>0;
				},
				content:function(){
					player.insertPhase();
				},
			},
			//乃琳
			yehua:{
				audio:true,
				trigger:{player:'phaseBegin'},
				//frequent:true,
				filter:function(event,player){
					return !player.isMaxHandcard(true);
				},
				check:function(event,player){
					var list=game.filterPlayer(function(current){
						return current.isMaxHandcard();
					}).sortBySeat();
					return (list[0].countCards('h')-player.countCards('h'))>=1;
				},
				content:function(){
					'step 0'
					var num = 1;
					var targets = game.filterPlayer(function(cur){
						return cur.isMaxHandcard();
					});
					num+=targets[0].countCards('h');
					num-=player.countCards('h');
					event.cards = get.cards(num);
					'step 1'
					player.gain(event.cards,'draw');
					'step 2'
					player.turnOver();
				},
			},
			fengqing:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				trigger:{player:['linkBegin','turnOverBegin']},
				frequent:true,
				filter:function(event,player){
					return true;
				},
				process:function(change){
					switch(change){
						case 1:return '其下个准备阶段视为使用了【酒】';break;
						case 2:return '其下个准备阶段视为使用了【桃】';break;
						case 3:return '其跳过本回合的判定和弃牌阶段';break;
					}
				},
				content:function(){
					'step 0'
					event.change = player.storage.fengqing;
					player.chooseTarget('『风情』:选择技能的目标').set('ai',function(target){
						var player = _status.event.player;
						var change = _status.event.change;
						switch(change){
							case 1:return get.effect(target,{name:'jiu'},target,player)||target==player;break;
							case 2:return get.effect(target,{name:'tao'},target,player);break;
							case 3:{
								if(target!=_status.currentPhase)	return 0;
								if(target.countCards('j')>0) return 2*get.attitude(player,target)+Math.random();
								return get.attitude(player,target)+Math.random();
								break;
							}
						}
						return get.attitude(player,target)+Math.random();
					}).set('prompt2',lib.skill.fengqing.process(event.change)).set('change',event.change)
					'step 1'
					if(result.targets&&result.targets.length){
						event.target = result.targets[0];
						player.logSkill('fengqing',event.target);
						switch(event.change){
							case 1:event.target.addSkill('fengqing_jiu');break;
							case 2:event.target.addSkill('fengqing_tao');break;
							case 3:{
								event.target.skip('phaseJudge');
								event.target.skip('phaseDiscard');
								break;
							}
						}
						player.storage.fengqing = (player.storage.fengqing==3)?1:player.storage.fengqing+1;
					}
				},
				effect:{
					target:function(card,player,target,current){
						if(['tiesuo','lulitongxin'].contains(card.name)){
							return [1,2];
						}
					},
				},
				subSkill:{
					jiu:{
						audio:2,
						mark:true,
						intro:{
							content:'下个准备阶段视为使用了【桃】'
						},
						trigger:{player:'phaseZhunbeiEnd'},
						forced:true,
						onremove:true,
						popup:'风情-酒',
						audioname:['EQueen'],
						filter:function(event,player){
							return lib.filter.filterCard({name:'jiu',isCard:false},player,event);
						},
						content:function(){
							player.chooseUseTarget({name:'jiu'},true,'noTargetDelay');
							player.removeSkill(event.name);
						},
					},
					tao:{
						audio:2,
						mark:true,
						intro:{
							content:'下个准备阶段视为使用了【桃】'
						},
						trigger:{player:'phaseZhunbeiEnd'},
						forced:true,
						onremove:true,
						popup:'风情-桃',
						audioname:['EQueen'],
						filter:function(event,player){
							return true;
							return lib.filter.filterCard({name:'tao',isCard:false},player,event);
						},
						content:function(){
							player.chooseUseTarget({name:'tao'},true,'noTargetDelay');
							player.removeSkill(event.name);
						},
					},
				},
			},
			//珈乐
			huangjia:{
				init:function(player,skill) {
					if(!player.storage[skill])	player.storage[skill] = true;
				},
				locked:true,
				notemp:true,
				mark:true,
				marktext: '👠',
				intro: {
					mark:function(dialog,content,player){
						console.log(player.storage.huangjia);
						dialog.addText('已成为皇珈骑士');
					},
					onunmark:function(storage,player){
						if(storage){
							storage = false;
						}
					},
				},
			},
			shixi:{
				marktext: '时',
				intro: {
					mark:function(dialog,content,player){
						dialog.addText('时隙:初始手牌');
						var list = player.storage.shixi.slice(0);
						dialog.addSmall(list);
					},
					content: 'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							storage.length=0;
						}
					},
				},
				trigger:{global:'gameDrawAfter',player:'enterGame'},
				forced:true,
				content:function(){
					var cards = player.getCards('h');
					if(cards.length){
						if(!player.storage.shixi)	player.storage.shixi = []
						player.showCards(cards,'时隙:记录初始手牌');
						player.storage.shixi.addArray(cards);
						player.markSkill('shixi');
					}
				},
				group:['shixi_mark','shixi_draw'],
				subSkill:{
					mark:{
						marktext: '隙',
						intro: {
							mark:function(dialog,content,player){
								dialog.addText('时隙:已指定');
								var list = player.storage.shixi_mark.slice(0);
								dialog.addSmall(list);
							},
							content: 'cards',
							onunmark:function(storage,player){
								if(storage&&storage.length){
									storage.length=0;
								}
							},
						},
						trigger:{global:['loseAfter','cardsDiscardAfter']},
						filter:function(event,player){
							var record = player.storage.shixi.slice(0);
							if(!record)		return false;
							if(event.name=='cardsDiscard'&&(event.getParent().name!='orderingDiscard'
							||(!event.getParent().relatedEvent||!event.getParent().relatedEvent.player||event.getParent().relatedEvent.name=='judge'
							||!((player.storage.yuezhi===true&&event.getParent().relatedEvent.player.storage.huangjia)
							||event.getParent().relatedEvent.player==player)))) return false;
							if(event.name=='lose'&&(event.position!=ui.discardPile
							||!((player.storage.yuezhi===true&&event.player.storage.huangjia)
							||event.player==player)))	return false;
							if(event.player&&event.player!=player) console.log(event.player.storage.huangjia)
							var list = event.cards.filter(function(card){
								if(event.js&&event.js.contains(card))	return false;
								for(var i=0;i<record.length;i++){
									if(player.storage.shixi_mark&&player.storage.shixi_mark.contains(record[i]))	continue;
									if(get.suit(record[i])==get.suit(card))	return true;
								}
							});
							return list.length>0;
						},
						direct:true,
						content:function(){
							'step 0'
							var record = player.storage.shixi.slice(0);
							var list = trigger.cards.filter(function(card){
								for(var i=0;i<record.length;i++){
									if(player.storage.shixi_mark&&player.storage.shixi_mark.contains(record[i]))	continue;
									if(get.suit(record[i])==get.suit(card))	return true;
								}
							});
							event.record = record;
							event.list = list;
							event.num = 0;
							'step 1'
							if(event.list[event.num]){
								if(player.storage.shixi_mark)	event.record.removeArray(player.storage.shixi_mark);
								if(event.record.length){
									player.chooseButton(['###'+get.prompt('shixi')+'###选择要指定的牌（与'+get.translation(event.list[event.num])
									+'花色相同）',event.record]).set('filterButton',function(button){
										var card=_status.event.card;
										return get.suit(button.link)==get.suit(card);
									}).set('ai',function(button){
										return get.value(button.link)+2*Math.random();
									}).set('card',event.list[event.num]);
								}else	event.finish();
							}
							'step 2'
							if(result.bool&&result.links){
								if(!player.storage.shixi_mark)	player.storage.shixi_mark = [];
								player.storage.shixi_mark.addArray(result.links);
								player.markSkill('shixi_mark');
							}
							event.num++;
							if(event.list[event.num])	event.goto(1);
						},
					},
					draw:{
						trigger:{
							global:['phaseZhunbeiEnd','phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd','phaseJieshuEnd']
						},
						filter:function(event,player){
							return player.storage.shixi_mark&&player.storage.shixi_mark.length;
						},
						forced:true,
						content:function(){
							'step 0'
							event.num = Math.floor(player.storage.shixi_mark.length/2)
							player.draw(event.num);
							'step 1'
							player.unmarkSkill('shixi_mark');
						},
					},
				}
			},
			xueta:{
				audio:6,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return Array.isArray(event.respondTo)&&event.respondTo[0]!=player&&!event.respondTo[0].storage.huangjia;
				},
				filter:function(event,player){
					if(player.hasUnknown(1))	return true;
					if(event.player.isFriendsOf(player))	return true;
					return get.attitude(player,event.player)>-1;
				},
				content:function(){
					'step 0'
					event.target = trigger.respondTo[0];
					event.target.draw();
					event.target.addSkill('huangjia');
					// 'step 1'
					// game.asyncDraw([player,event.target]);
				}
			},
			yuezhi:{
				audio:true,
				skillAnimation:true,
				animationStr:'音乐珈',
				unique:true,
				juexingji:true,
				forced:true,
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return game.countPlayer(function(cur){
						return cur.storage.huangjia===true;
					})>=player.hp;
				},
				content:function(){
					'step 0'
					player.awakenSkill('yuezhi');
					player.storage.yuezhi = true;
					'step 1'
					var record = player.storage.shixi.slice(0);
					record.forEach(function(card){
						if(get.position(card,true)=='d')	player.gain(card,'draw');
						else	player.chooseDrawRecover(2,1);
					})
				}
			},
			//向晚
			yiqu:{
				trigger:{global:['chooseTargetAfter','chooseCardTargetAfter','chooseUseTargetAfter','useSkillAfter']},
				frequent:true,
				filter:function(event,player){
					var name = lib.skill.yiqu.process(event);
					var info=lib.skill[name];
					if(!info||info.equipSkill||info.ruleSkill)	return false;
					var result = event.result;
					var targets = [];
					if(event.name=='useSkill')		targets = event.targets||[event.target];
					else if(!result||result.bool!=true)		return false;
					else{
						targets = result.targets.slice(0);
					}
					return lib.translate[name+'_info']&&!player.hasSkill(name)&&targets.contains(player);
				},
				prompt2:function(event,player){
					var name = lib.skill.yiqu.process(event);
					return '你可以获得『'+get.translation(name)+'』，直到下次进入濒死状态';
				},
				process:function(event){
					var name = event.skill||event.getParent().name;
					if(name.length>3){
						var index = name.indexOf('_',4);
						if(index>3)	name = name.substring(0,index);
					}
					return name;
				},
				content:function(){
					var name = lib.skill.yiqu.process(trigger);
					player.addSkillLog(name);
					player.addAdditionalSkill('yiqu',name,true);
				},
				group:'yiqu_beDying',
				subSkill:{
					beDying:{
						trigger:{player:'dyingBefore'},
						forced:true,
						filter:function(event,player){
							return player.additionalSkills['yiqu'];
						},
						content:function(){
							player.removeAdditionalSkill('yiqu');
						}
					}
				}
			},
			wanxian:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.player!=player&&event.parent.name=='damage'
					&&event.parent.source&&[event.player,player].contains(event.parent.source)
					&&player.additionalSkills['yiqu']&&player.additionalSkills['yiqu'].length;
				},
				content:function(){
					'step 0'
					event.num = player.additionalSkills['yiqu'].length;
					player.removeAdditionalSkill('yiqu');
					'step 1'
					player.draw(event.num);
				},
				ai:{
					combo:'yiqu',
				},
			},
			//阿梓
			juehuo:{
				init:function(player,skill) {
					if(!player.storage[skill]){
						player.storage[skill] = {};
						player.storage[skill].ms = [];
						player.storage[skill].ans = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '绝活',
				intro: {
					mark:function(dialog,content,player){
						if(player.storage.juehuo.ms&&player.storage.juehuo.ms.length){
							var list = player.storage.juehuo.ms.slice(0);
							dialog.addText('明置绝活');
							dialog.addSmall(list);
						}
						if(player.storage.juehuo.ans&&player.storage.juehuo.ans.length){
							if(player.isUnderControl(true)){
								var list = player.storage.juehuo.ans.slice(0);
								dialog.addText('暗置绝活');
								dialog.addSmall(list);
							}
							else{
								dialog.addText('暗置绝活（'+get.cnNumber(player.storage.juehuo.ans.length)+'张）');
							}
						}
					},
					content: 'cards',
					onunmark:function(storage,player){
						if((storage&&storage.ms&&storage.ms.length)||(storage&&storage.ans&&storage.ans.length)){
							var cards = storage.ms.concat(storage.ans);
							player.$throw(cards,1000);
							game.cardsDiscard(cards);
							game.log(cards,'被置入了弃牌堆');
							storage.ms.length=0;
							storage.ans.length=0;
						}
					},
				}
			},
			zhiyue:{
				audio:8,
				trigger:{player:'useCardEnd'},
				frequent:true,
				filter:function(event,player){
					if(player.storage.juehuo.ans&&player.storage.juehuo.ms){
						var card = event.card;
						var list1 = player.storage.juehuo.ans.slice(0);
						var list2 = player.storage.juehuo.ms.slice(0);
						for(var i =0;i<list1.length;i++){
							if(get.type(list1[i],'trick')==get.type(card,'trick'))	return true;
						}
						for(var i =0;i<list2.length;i++){
							if(get.suit(list2[i])==get.suit(card))	return true;
						}
						if(list1.length==0&&list2.length==0)		return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					event.card = trigger.card;
					var list1 = player.storage.juehuo.ans.slice(0);
					var list2 = player.storage.juehuo.ms.slice(0);
					var list = ['『指月』：选择绝活翻面'];
					if(list1&&list1.length){
						list.push('暗置绝活');
						list.push([list1,'card']);
					}
					if(list2&&list2.length){
						list.push('明置绝活');
						list.push([list2,'card']);
					}
					list.push('hidden');
					event.list1 = list1;
					event.list2 = list2;
					var next = player.chooseButton(list);
					next.set('selectButton',[1,event.list2.length+1]);
					next.set('filterButton',function(button){
						var card = _status.event.card;
						var evt = _status.event.getParent();
						var now = button.link;
						if(evt.list1&&evt.list1.length&&evt.list1.contains(now)){
							var selected = ui.selected.buttons;
							if(selected.length){
								for(var i=0;i<selected.length;i++){
									if(evt.list1.contains(selected[i].link)) return false;
								}
							}
							return get.type(now,'trick')==get.type(card,'trick');
						}
						if(event.list2&&event.list2.length&&event.list2.contains(now)){
							return get.suit(now)==get.suit(card);
						}
					});
					next.set('card',event.card);
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						var cards1 = result.links.slice(0);
						var cards2 = result.links.slice(0);
						cards1 = cards1.filter(function(card){
							return event.list1.contains(card);
						});
						cards2 = cards2.filter(function(card){
							return event.list2.contains(card);
						});
						event.cards = cards1.concat(cards2)
						if(cards1&&cards1.length==event.list1.length){
							event.cards.push(get.cards()[0]);
						}
						if(cards2&&cards2.length){
							player.draw(cards2.length);
						}
						lib.skill.zhiyue.process(player,event.cards);
						game.delay(0.5);
					}
				},
				process:function(player,cards){
					if(player.storage.juehuo.ans&&player.storage.juehuo.ms){
						for(var i=0;i<cards.length;i++){
							if(player.storage.juehuo.ms.contains(cards[i])){
								player.$give(cards[i],player);
								player.storage.juehuo.ms.remove(cards[i]);
								player.storage.juehuo.ans.push(cards[i]);
							}else if(player.storage.juehuo.ans.contains(cards[i])){
								player.$give(cards[i],player);
								player.storage.juehuo.ans.remove(cards[i]);
								player.storage.juehuo.ms.push(cards[i]);
							}else{
								player.$draw(cards[i]);
								player.storage.juehuo.ans.push(cards[i]);
							}
						}
						player.markSkill('juehuo');
					}

				},
				ai:{
					threaten:1.5
				},
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player.storage.juehuo){
							var suit = get.suit(card);
							var type = get.type(card,'trick');
							var ans = player.storage.juehuo.ans.slice(0);
							var ms = player.storage.juehuo.ms.slice(0);
							for(var i=0;i<ans.length;i++){
								if(get.type(ans[i],'trick')==type)	return num+7;
							}
							for(var i=0;i<ms.length;i++){
								if(get.suit(ms[i])==suit)	return num+5;
							}
						}
					},
				},
				group:['juehuo','zhiyue_start'],
				subSkill:{
					start:{
						forced:true,
						priority:10,
						trigger:{
							global:'gameStart',
							player:'enterGame',
						},
						content:function(){
							event.cards = get.cards();
							game.playAudio('skill','zhiyue0');
							lib.skill.zhiyue.process(player,event.cards);
						},
					}
				}
			},
			zhengniu:{
				audio:4,
				trigger:{player:['turnOverBefore','linkBefore','recoverBefore','drawBefore']},
				direct:true,
				filter:function(event,player){
					if(!player.storage.juehuo
						||!(player.storage.juehuo.ans&&player.storage.juehuo.ans.length
						||player.storage.juehuo.ms&&player.storage.juehuo.ms.length))				return false;
					if(!event.source||get.itemtype(event.source)!='player'||event.source==player)	return false;
					if(event.name=='turnOver')	return player.isTurnedOver();
					if(event.name=='link')	return player.isTurnedOver();
					return true
				},
				content:function(){
					'step 0'
					event.target = trigger.source;
					var check = get.attitude(player,event.target)>0;
					var list1 = player.storage.juehuo.ans.slice(0);
					var list2 = player.storage.juehuo.ms.slice(0);
					// if(list1&&list1.length){
					// 	dialog.addText('暗置绝活');
					// 	dialog.add([list1, 'card']);
					// }
					// if(list2&&list2.length){
					// 	dialog.addText('明置绝活');
					// 	dialog.add([list2, 'card']);
					// }
					var list = ['###'+get.prompt('zhengniu')+'###选择交给'+get.translation(event.target)+'的绝活'];
					if(list1&&list1.length){
						list.push('暗置绝活');
						list.push([list1,'card']);
					}
					if(list2&&list2.length){
						list.push('明置绝活');
						list.push([list2,'card']);
					}
					list.push('hidden');
					player.chooseButton(list).set('filterButton',function(button){
						return true;
					}).set('selectButton',[1,Infinity]).set('ai',function(button){
						if(!_status.event.check)	return -1;
						if((ui.dialog.buttons.length-ui.selected.buttons.length)<=3)	return -1;
						return get.value(button.link);
					}).set('check',check);
					'step 1'
					if(result.bool&&result.links){
						player.logSkill('zhengniu');
						player.storage.juehuo.ans.removeArray(result.links);
						player.storage.juehuo.ms.removeArray(result.links);
						event.target.gain(result.links);
						player.updateMarks();
					}
				},
			},
			//勺宝
			juxiao:{
				trigger:{player:'damageEnd'},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				filter:function(event,player){
					return true;
				},
				frequent:true,
				content:function(){
					'step 0'
					player.chooseTarget([1,2],true,'###『句销』：令至多两名角色各摸一张牌###摸牌的角色不能使用【杀】直到回合结束').set('ai',function(target){
						var att = get.attitude(_status.event.player);
						if(target==currentPhase&&(target.hasSha()||target.hasSkillTag('useSha'))){
							if(target.hasS)	return 2-att;
						}
					})
					'step 1'
					if(result.bool&&result.targets){
						player.logSkill('juxiao',result.targets);
						game.asyncDraw(result.targets);
						result.targets.forEach(function(tar){
							tar.addTempSkill('juxiao_xiao');
						})
					}
				},
				subSkill:{
					xiao:{
						mark:true,
						intro:{
							content:'无法使用杀直到回合结束'
						},
						mod:{
							cardEnabled:function(card){
								if(card.name=='sha') return false;
							}
						}
					}
				},
				ai:{
					expose:0.1,
					threaten:0.8,
					maixie:true,
				}
			},
			shenyan:{
				audio:6,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = [];
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return player.countCards('h',);
					//return player.countCards('h',{type:'basic'});
				},
				content:function(){
					'step 0'
					player.showHandcards();
					player.chooseCard('h','『神言』:弃置一种牌名的牌').set('ai',function(card){
						if(['sha'].contains(card.name))			return 5;
						if(!['sha','tao'].contains(card.name)&&get.type(card)=='basic')	return 6-get.value(card);
						return 1;
					});
					'step 1'
					if(result.bool&&result.cards){
						event.cname = get.name(result.cards[0]);
						event.discard = player.discard(player.getCards('h',event.cname));
					}else{
						event.finish();
					}
					'step 2'
					if(event.discard.cards){
						console.log(event.discard)
						var cards = event.discard.cards;
						if(!player.storage.shenyan)	player.storage.shenyan = [];
						cards.forEach(function(card){
							player.storage.shenyan.add(get.suit(card));
						});
						player.draw(cards.length)
					}else{
						event.finish();
					}
					'step 3'
					if(player.storage.shenyan){
						if(!player.hasSkill('shenyan_mark'))		player.addTempSkill('shenyan_mark','phaseUseAfter');
						player.markSkill('shenyan_mark');
						var num = player.storage.shenyan.length;
						console.log(player.storage.shenyan)
						var list = get.inpile('trick');
						for(var i=0;i<list.length;i++){
							if(get.translation(list[i]).length!=num){
								list.splice(i--,1);
							}
							else	list[i]=['锦囊','',list[i]];
						}
						console.log(list)
						if(list.length){
							var dialog=ui.create.dialog('是否选择一张长度'+num+'的锦囊牌视为使用之？',[list,'vcard'],'hidden');
							player.chooseButton(dialog,true).set('ai',function(button){
								var card={name:button.link[2]};
								var value=get.value(card);
								return value;
							});
						}
					}
					'step 4'
					if(result.bool&&result.links&&result.links.length){
						player.chooseUseTarget({name:result.links[0][2]},true);
					}else{
						if(event.cname=='sha'){
							game.log(player,'重置了『神言』');
							player.getStat('skill').shenyan--;
						}
					}
				},
				subSkill:{
					mark:{
						marktext:"言",
						locked:true,
						intro:{
							name:'神言',
							content:function (storage,player,skill){
								if(player.storage.shenyan.length){
									return '本阶段『神言』的弃置花色：'+ get.translation(player.storage.shenyan);
								}
							},
						},
						onremove:function(player){
							player.storage.shenyan.length = 0;
						},
					}
				},
				ai:{
					order:6,
					result:{
						player:1,
					},
				},
			},
			//三三
			zhezhuan:{
				enable:'chooseToUse',
				usable:1,
				filter:function(event,player,cards){
					return (player.countCards('he',{type:'trick'})+player.countCards('he',{type:'delay'}))>=1;
				},
				hiddenCard:function(player,name){
					if(typeof lib.card[name].yingbian_prompt!='string')		return false;
					return name!='du'&&get.type(name)=='basic'&&(player.countCards('he',{type:'trick'})||player.countCards('he',{type:'delay'}));
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('辙转','hidden');
						dialog.add('应变标签');
						var table=document.createElement('div');
						var list = ['yingbian_kongchao','yingbian_canqu','yingbian_fujia','yingbian_zhuzhan']
						table.classList.add('add-setting');
						table.style.margin='0';
						table.style.width='100%';
						table.style.position='relative';
						for(var i=0;i<list.length;i++){
							if(player.isDisabled(i)) continue;
							var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML='<span>'+get.translation(list[i]+'_tag')+'</span>';
							td.link=list[i];
							td.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							for(var j in lib.element.button){
								td[j]=lib.element.button[i];
							}
							table.appendChild(td);
							dialog.buttons.add(td);
						}
						dialog.content.appendChild(table);
						dialog.add('卡牌转换');
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=='du')	continue;
							if(typeof lib.card[name].yingbian_prompt!='string'&&typeof lib.card[name].yingbian_prompt!='function')		continue;
							if(name=='sha'){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
							}
							else if(get.type(name)=='trick'){
								if(!player.countCards('h',{name:name}))	continue;
								list.push(['锦囊','',name]);
							}
							else if(get.type(name)=='basic'){
								list.push(['基本','',name])
							};
						}
						dialog.add([list,'vcard']);
						return dialog;
					},
					filter:function(button,player){
						if(ui.selected.buttons.length&&typeof button.link==typeof ui.selected.buttons[0].link) return false;
						if(typeof button.link=='object'){ 
							var evt = _status.event.getParent();
							var name = button.link[2];
							if(evt.filterCard&&typeof evt.filterCard=='function'){
								return	evt.filterCard({name:name,isCard:true},player);
							}
							return lib.filter.filterCard({name:name,isCard:true},player,evt);
						}
						return true;
					},
					select:2,
					check:function(button){
						var player=_status.event.player;
						if(typeof button.link=='string'){
							switch(button.link){
								case 'yingbian_kongchao':return 4.5;break;
								case 'yingbian_canqu':return player.hp==1;break;
								case 'yingbian_fujia':return 4.3;break;
								case 'yingbian_zhuzhan':return (3-player.hp)*1.5;break;
							}
						}
						var name=button.link[2];
						var evt=_status.event.getParent();
						if(get.type(name)=='basic'){
							if(name=='shan') return 2;
							if(evt.type=='dying'){
								if(get.attitude(player,evt.dying)<2) return false;
								return 1.9;
							}
							if(evt.type=='phase') return player.getUseValue({name:name,nature:button.link[3],isCard:true});
							return 1;
						}
						var player=_status.event.player;
						var effect=player.getUseValue(button.link[2]);
						if(effect>0) return effect;
						return 0;
					},
					backup:function(links,player){
						if(typeof links[1]=='string') links.reverse();
						var yingbian=links[0];
						var name=links[1][2];
						var nature=links[1][3];
						return {
							filterCard:function(card,player){
								if(get.type(card,'trick')!='trick')	return false;
								if(get.type(name)=='trick')		return get.name(card)==name;
								return true;
							},
							selectCard:1,
							yingbian:yingbian,
							viewAs:{
								name:name,
								nature:nature,
								yingbian:false,
							//	cardtag:[yingbian],
								isCard:true,
							},
							popname:true,
							precontent:function(){
								player.logSkill('zhezhuan');
								console.log(lib.skill.zhezhuan_backup.yingbian);
								if(!_status.cardtag.yuzu)	_status.cardtag.yuzu = [];
								_status.cardtag.yuzu.add(lib.skill.zhezhuan_backup.yingbian);
							},
							
						}
					},
					prompt:function(links,player){
						if(typeof links[1]=='string') links.reverse();
						var yingbian=links[0];
						var name=links[1][2];
						var nature=links[1][3];
						return '视为使用一张带有'+get.translation(yingbian+'_tag')+'标签的'+(get.translation(nature)||'')+'【'+get.translation(name)+'】';
					},
				},
				ai:{
					order:12,
					result:{
						player:1
					},
					threaten:1.5
				},
				group:'zhezhuan_clear',
				subSkill:{
					clear:{
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						firstDo:true,
						priority:333,
						content:function(){
							if(_status.cardtag.yuzu&&_status.cardtag.yuzu.length)	delete _status.cardtag.yuzu;
						}
					}
				}
			},
			setu:{
				mark:true,
				intro:{
					name:'涩涂',
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
				usable:1,
				filter:function(event,player,cards){
					return player.countCards('he')>=2;
				},
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<18;
				},
				discard:false,
				toStorage:true,
				delay:false,
				visible:true,
				complexCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					if(get.number(card)<=2)	return 2+get.number(card)-get.value(card);
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.markAuto('setu',cards);
					'step 1'
					var cards = player.storage.setu;
					event.num = cards.length;
					var num = 1;
					for(var i=0;i<cards.length;i++){
						num *= get.number(cards[i]);
					}
					if(num>100)	event.going = true;
					'step 2'
					if(event.going===true){
						player.unmarkSkill('setu');
						player.draw(event.num);
						player.chooseTarget('『涩涂』：对一名角色造成一点伤害',true).set('ai',function(target){
							var player = _status.event.player;
							return get.damageEffect(target,player,player);
						});
					}
					'step 3'
					if(result.targets&&result.targets.length){
						event.target = result.targets[0];
						event.target.damage();
					}
				},
				ai:{
					order:7.5,
					result:{
						player:1,
					},
					threaten:1.5
				}
			},
			//步步
			tianlve:{
				audio:true,
				trigger:{player:'phaseUseBegin'},
				priority:199,
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('tianlve'),function(card,player,target){
						return target!=player;
					},function(target){
						var player = _status.event.player;
						return get.recoverEffect(target,player,player);
					});
					'step 1'
					if(result.targets&&result.targets.length){
						player.logSkill('tianlve',result.targets);
						event.target = result.targets[0];
						event.target.recover();
						player.storage.tianlve_pcr = event.target;
						player.addTempSkill('tianlve_pcr');
					}
				},
				subSkill:{
					pcr:{
						mark:'character',
						intro:{
							name:'甜略',
							content:'本阶段内你对$使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标',
							onunmark:true,
						},
						onremove:function(player,skill){
							player.unmarkSkill('tianlve_pcr');
							delete player.storage.tianlve_pcr;
						},
						trigger:{player:'useCard'},
						priority:199,
						direct:true,
						filter:function(event,player){
							return event.targets&&event.targets.length==1&&event.targets[0]==player.storage.tianlve_pcr;
						},
						content:function(){
							'step 0'
							var prompt2='为'+get.translation(trigger.card)+'增加一个目标'
							player.chooseTarget(get.prompt('tianlve'),function(card,player,target){
								var player=_status.event.player;
								if(_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card,player,target);
							}).set('prompt2',prompt2).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.card,player,player);
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool&&result.targets&&result.targets.length){
								if(!event.isMine()) game.delayx();
								event.targets = result.targets;
							}
							'step 2'
							if(event.targets){
								player.logSkill('tianlve',event.targets);
								trigger.targets.addArray(event.targets);
							}else{
								player.draw();
							}
						},
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.tianlve_pcr) return true;
							},
						},
					},
				}
			},
			luxian:{
				audio:true,
				group:'P_SP',
				trigger:{player:'phaseZhunbeiBegin'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				forceunique:true,
				filter:function(event,player){
					return player.isDamaged();
				},
				check:function(event,player){
					return player.countCards('he')>=5||player.hp<=1;
				},
				content:function(){
					'step 0'
					var list;
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='psp') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='psp';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='psp';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('Pudding');
					if(list.length){
						player.chooseButton(true).set('ai',function(button){
							return 5||get.rank(button.link,true)-lib.character[button.link][2];
						}).set('createDialog',['『颅祭』：获得其中一名角色所有技能',[list.randomGets(3),'character']]);
					}else	event.finish()
					'step 1'
					if(result.links&&result.links.length){
						player.awakenSkill('luxian');
						player.loseMaxHp();
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								player.addTempSkill(skills[j],'phaseAfter');
							}
						}
						player.storage.luxian_pcr = result.links[0];
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('luxian',result.links[0]);
						player.addTempSkill('luxian_pcr','phaseAfter');
						player.markSkill('P_SP');
					}
				},
				subSkill:{
					pcr:{
						onremove:function(player,skill){
							if(player.storage[skill]&&player.storage.P_SP.contains(player.storage[skill])){
								console.log(player.storage[skill])
								player.storage.P_SP.remove(player.storage[skill]);
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
							}
							delete player.storage[skill]
						}
					},
				}
			},
			//粉兔
			erni:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				group:['erni_going','erni_change'],
				hiddenCard:function(player,name){
					switch(player.storage.erni){
						case 1:if(name=='sha') return player.countCards('h');break;
						case 2:if(name=='shan') return player.countCards('h');break;
						case 3:if(name=='tao') return player.countCards('h');break;
					}
				},
				ai:{
					useSha:1,
					skillTagFilter:function(player,tag){
						switch(tag){
							case 'respondSha':{
								if(player.storage.erni!=1||!player.countCards('h')) return false;
								break;
							}
							case 'respondShan':{
								if(player.storage.erni!=2||!player.countCards('h')) return false;
								break;
							}
							case 'save':{
								if(player.storage.erni!=3||!player.countCards('h')) return false;
								break;
							}
						}
					},
					result:{player:1},
					respondSha:true,
					respondShan:true,
					save:true,
				},
				subSkill:{
					going:{
						enable:['chooseToUse','chooseToRespond'],
						//发动时提示的技能描述
						prompt:function(event,player){
							var player = player||event.player;
							var str = get.skillInfoTranslation('erni',player);
							return str;
						},
						viewAs:function(cards,player){
							var name = false;
							var suit = get.suit(cards[0],player);
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							//返回判断结果
							if(name) return {name:name,suit:suit};
							return null;
						},
						viewAsFilter:function(player){
							var cards = player.getCards('h');
							if(!cards.length)	return false;
							var filter=event.filterCard;
							var name = false;
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							for(var i=1;i<cards.length;i++){
								var suit = get.suit(cards[i],player);
								if(filter({name:name,suit:suit},player,event)) return true;
							}
							return false;
						},
						filterCard:function(card,player,event){
							event=event||_status.event;
							var filter=event._backup.filterCard;
							var name = false;
							var suit = get.suit(card,player);
							switch(player.storage.erni){
								case 1:name='sha';break;
								case 2:name='shan';break;
								case 3:name='tao';break;
							}
							if(filter({name:name,suit:suit},player,event)) return true;
							return false;
						},
						precontent:function(){
							'step 0'
							event.cards = event.result.cards.slice(0);
							player.$throw(event.cards);
							player.lose(event.cards,ui.ordering);
							event.result.card.cards=[];
							event.result.cards=[];
							delete event.result.card.number;
							'step 1'
							game.broadcast(function(){
								ui.arena.classList.add('thrownhighlight');
							});
							ui.arena.classList.add('thrownhighlight');
							game.addVideo('thrownhighlight1');
							player.showCards(event.cards,'『耳匿』展示手牌');
							while(event.cards.length>0){
								var card=event.cards.pop();
								card.fix();
								ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
								game.updateRoundNumber();
							}
							'step 2'
							game.broadcastAll(function(){
								ui.arena.classList.remove('thrownhighlight');
							});
							game.addVideo('thrownhighlight2');
							if(event.clear!==false){
								game.broadcastAll(ui.clear);
							}
							if(player.storage.erni!=3)	player.storage.erni++;
							else	player.storage.erni = 1;
						},
					},
					change:{
						trigger:{player:['shouruAfter','chonghuangAfter','baoxiaoAfter','tianlveAfter','luxianAfter','useSkillAfter']},
						priority:199,
						prompt2:'转换一次『耳匿』',
						filter:function(event,player){
							name = event.name;
							if(name=='useSkill')	name = event.skill;
							if(['erni_change','erni_going'].contains(name))	return false;
							var info=lib.skill[name];
							if(info.equipSkill||info.ruleSkill||info.silent)	return false;
							return true;
						},
						content:function(){
							if(player.storage.erni!=3)	player.storage.erni++;
							else	player.storage.erni = 1;
						}
					}
				}
			},
			shouru:{
				audio:4,
				trigger:{player:['damageAfter','useCardAfter','respondAfter']},
				priority:199,
				frequent:true,
				filter:function(event,player){
					if(player.hasSkill('shouru_used'))	return false;
					return (event.name=='damage'||['useCard','respond'].contains(event.name)&&event.skill=='erni_going')&&game.hasPlayer(function(cur){
						return cur!=player&&get.distance(_status.currentPhase,cur,'pure')==1&&cur.countGainableCards(player,'he');
					});
				},
				content:function(){
					'step 0'
					event.source = trigger.player;
					player.chooseTarget(get.prompt2('shouru'),true,function(card,player,target){
						return target!=player&&get.distance(_status.currentPhase,target,'pure')==1&&target.countGainableCards(player,'he');
					},function(target){
						var player = _status.event.player;
						return 8-get.attitude(player,target);
					});
					'step 1'
					if(result.targets&&result.targets.length){
						player.addTempSkill('shouru_used')
						player.gainPlayerCard('he',result.targets[0],'『耳匿』：获得其一张牌');
					}
				},
				ai:{
					expose:0.1,
					threaten:0.8,
				},
				subSkill:{
					used:{}
				},
			},
			chonghuang:{
				audio:true,
				group:'P_SP',
				trigger:{global:'changeHp'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				forceunique:true,
				filter:function(event,player){
					if(player.hasZhuSkill('yinzun')&&event.player.group==player.group){
						return event.player.hp==1;
					}
					return event.player==player&&player.hp==1;
				},
				content:function(){
					'step 0'
					var list;
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='psp') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='psp';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='psp';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&players[i].group&&players[i].group=='psp'){
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('AyanaNana');
					if(list.length){
						player.chooseButton(true).set('ai',function(button){
							return 5||get.rank(button.link,true)-lib.character[button.link][2];
						}).set('createDialog',['『崇皇』：获得其中一名角色所有技能',[list.randomGets(3),'character']]);
					}else event.finish();
					'step 1'
					if(result.links&&result.links.length){
						player.awakenSkill('chonghuang');
						player.loseMaxHp();
						for(var i=0;i<result.links.length;i++){
							if(_status.characterlist){
								_status.characterlist.remove(result.links[i]);
							}
							var skills=lib.character[result.links[i]][3];
							for(var j=0;j<skills.length;j++){
								player.addTempSkill(skills[j],'roundStart');
							}
						}
						player.storage.chonghuang_kamen = result.links[0];
						player.storage.P_SP.addArray(result.links);
						player.flashAvatar('chonghuang',result.links[0]);
						player.addTempSkill('chonghuang_kamen','roundStart');
						player.markSkill('P_SP');
					}
				},
				subSkill:{
					kamen:{
						onremove:function(player,skill){
							console.log(player.storage.P_SP)
							if(player.hasSkill('P_SP')&&player.storage[skill]&&player.storage.P_SP.contains(player.storage[skill])){
								player.storage.P_SP.remove(player.storage[skill]);
								delete player.storage[skill]
								if(player.storage.P_SP.length==0){
									player.unmarkSkill('P_SP');
								}else{
									player.markSkill('P_SP');
								}
							}
						}
					},
				}
			},
			yinzun:{
				unique:true,
				zhuSkill:true,
			},
			//阿秋
			jiren:{
				audio:6,
				audioname:['jike'],
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill] = 1;
				},
				enable:'phaseUse',
				usable: 1,
				filter:function(event,player){
					return true;
				},
				content:function(){
					'step 0'
					var func=function(result){
						if(get.subtype(result)=='equip1'){
							player.gain(result.card,'gainAuto')
							return 3;
						}
						return 0;
					};
					if(player.storage.jiren_going&&player.storage.jiren_going.length&&player.storage.jiren_going.length<4){
						func=function(result){
							var suits = _status.event.player.storage.jiren_going||[];
							if(get.subtype(result)=='equip1'){
								player.gain(result.card,'gainAuto')
								return 3;
							}
							if(suits.contains(get.suit(result))) return -1;
							return 1;
						};
					}
					player.judge(func);
					'step 1'
					if(result.card){
						if(!player.storage.jiren_going)	player.storage.jiren_going = [];
						player.storage.jiren_going.add(get.suit(result));
						if(!player.hasSkill('jiren_going'))	player.addTempSkill('jiren_going');
						player.markSkill('jiren_going');
					}
				},
				group:'jiren2',
				ai:{
					threaten:1.2,
					order:18,
					result:{player:1},
				},
				subSkill:{
					going:{
						audio:false,
						marktext:"祭",
						locked:true,
						intro:{
							name:'祭刃',
							content:function (storage,player,skill){
								if(storage.length){
									return '本回合已产生的『祭刃』判定结果：'+ get.translation(storage);
								}
							},
						},
						onremove:true,
						trigger:{global:['loseEnd','cardsDiscardEnd']},
						filter:function(event,player){
							var record = player.storage.jiren_going;
							if(!record)		return false;
							return event.cards&&event.cards.filter(function(card){
								return get.position(card,true)=='d'&&record.contains(get.suit(card));
							}).length;
						},
						direct:true,
						content:function(){
							'step 0'
							if(player.storage.jiren==1){
								player.chooseTarget('是否视为使用一张杀？',function(card,player,target){
									return player.canUse('sha',target);
								}).set('ai',function(target){
									var player=_status.event.player;
									return get.effect(target,{name:'sha'},player,player);
								}).set('prompt2',get.skillInfoTranslation('jiren',player));
							}else if(player.storage.jiren==2){
								player.chooseBool(function(){
									return 1;
								}).set('prompt','###'+get.prompt('jiren')+'###'+get.skillInfoTranslation('jiren',player));
							}else{
								player.chooseCard('he').set('ai',function(card){
									var player=_status.event.player;
									if(['shan','wuxie','jiedao'].contains(get.name(card)))	return 19-get.value(card);
									if(player.storage.jiren_going.contains(get.suit(card)))		return 12-get.value(card);
									return 10-get.value(card);
								}).set('prompt','###'+get.prompt('jiren')+'###'+get.skillInfoTranslation('jiren',player));
							}
							'step 1'
							if(result.bool){
								if(player.storage.jiren<3)	player.storage.jiren++;
								else	player.storage.jiren = 1;
								if(result.targets&&result.targets.length)	player.useCard({name:'sha'},result.targets,false);
								else if(result.cards&&result.cards.length)	player.discard(result.cards);
								else	player.draw();
							}
						},
						mod:{
							aiValue:function(player,card,num){
								if(get.suit(card)&&player.storage.jiren_going&&player.storage.jiren_going.contains(get.suit(card))) return num/10;
							},
						},
						ai:{
							useSha:2,
							effect:{
								player:function(card,player){
									if(player.storage.jiren_going.contains(get.suit(card))){
										if(get.name(card)=='sha')	return [1,3];
										return [1,2];
									}
									if(get.name(card)=='sha')	return [1,2];
								}
							},
							result:{player:1},
						},
					},
				}
			},
			jiren2:{
				audio:false,
				enable:'phaseUse',
				filter:function(event,player){
					return player.getStat('skill').jiren;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					game.log(player,'重置了『祭刃』');
					player.getStat('skill').jiren--;
				},
				ai:{
					order:function(item,player){
						if(player.awakenedSkills.contains('canxin')){
							return player.isHealthy()||player.hp>3;
						}else{
							if(player.hp==1)	return 0;
							var num = 2;
							num += 2*player.countCards('h')+player.countCards('e');
							if(player.storage.jiren_going)	num -= player.storage.jiren_going.length;
							return num;
						}
					},
					result:{
						player:function(player,target){
							if(player.hasUnknown(3))	return 0;
							if(!player.storage.jiren_going)	return player.countCards('h');
							else if(player.storage.jiren_going.length)	return 4-player.storage.jiren_going.length;
							else return -1;
						},
					},
				},
			},
			canxin:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				forceunique:true,
				filter:function(event,player){
					return player.countCards('he')>0&&player.isDamaged();
				},
				check:function(event,player){
					return player.storage.jiren_going&&player.countCards('he',function(card){
						return get.tag(card,'damage')
					})>0&&player.isDamaged();
				},
				content:function(){
					'step 0'
					player.awakenSkill('canxin');
					'step 1'
					var next=player.chooseCard('he','###重铸一张牌###若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作');
					next.set('ai',function(card){
						if(get.tag(card,'damage'))	return 15-get.value(card);
						return 6-get.value(card);
					});
					'step 2'
					if(result.bool&&result.cards){
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw();
						var card = result.cards[0];
						if(get.tag(card,'damage'))	event.goto(1);
						else{
							player.recover();
							var evt=_status.event.getParent('phase');
							if(evt){
								evt.finish();
							}
						}
					}
				}
			},
			P_SP:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:'P',
				intro:{
					onunmark:function(storage,player){
						_status.characterlist.addArray(storage);
						storage=[];
					},
					mark:function(dialog,storage,player){
						if(storage&&storage.length){
							dialog.addText('已叠加：'+get.cnNumber(storage.length)+'位P-SP角色');
							dialog.addSmall([storage,'character']);
						}
					},
					content:function(storage,player){
						return '已叠加：'+get.cnNumber(storage.length)+'位P-SP角色'
					},
					markcount:function(storage,player){
						if(storage&&storage.length) return storage.length;
						return 0;
					}
				},
			},
			//机萪
			qianjiwanbian:{
				audio:4,
				trigger:{source:'damageAfter',player:'phaseBegin'},
				priority:199,
				frequent:true,
				group:['qianjiwanbian_change','qianjiwanbian_clear'],
				filter:function(event,player){
					if(event.name=='damage'&&event.getParent()&&event.getParent().name!="trigger"&&event.getParent(2)&&event.getParent(2).qianjiwanbian)	return false;
					return true;
				},
				gainable:['前','千','钱','签','欠','浅','迁','倩','谦','倩','牵','乾','铅','遣','仟','纤','黔','嵌','钳','歉','虔','谴','堑',
					'技','级','及','机','祭','集','籍','基','即','记','急','吉','寄','季','极','继','计','纪','姬','己',
					'挤','剂','济','积','击','肌','忌','棘','疾','激','际','系','寂','迹','脊','辑','藉','稷','戟','骑','悸','觊','嫉',
					'完','玩','晚','碗','万','湾','丸','弯','婉','挽','腕','顽','绾','蜿','宛',
					'边','变','便','编','遍','扁','辩','鞭','辨','贬','匾','辫',
				],
				content:function(){
					'step 0'
					if(!player.storage.qianjiwanbian_change)	player.storage.qianjiwanbian_change = 'thunder';
					var list=lib.linked.slice(0);
					list.remove('kami');
					list.remove(player.storage.qianjiwanbian_change);
					event.map = {};
					for(var i=0;i<list.length;i++){
						event.map[get.rawName(list[i])] = list[i];
						list[i] = get.rawName(list[i]);
					}
					list.push('取消');
					player.chooseControl('dialogcontrol',list).set('ai',function(){
						return list.randomGets();
					}).set('prompt','『千机万变』：将（'+(get.rawName(player.storage.qianjiwanbian_change))+'）改写为：');
					'step 1'
					if(result.control!='取消'){
						player.storage.qianjiwanbian_change = event.map[result.control];
					}else{
						event.finish();
					}
					'step 2'
					var list=get.gainableSkills(function(info,skill){
						var name = get.translation(skill);
						for(var i=0;i<name.length;i++){
							if(lib.skill.qianjiwanbian.gainable.contains(name.substring(i,i+1)))	return true;
						}
					});
					//console.log(list);
					list.remove(player.getSkills());
					list.add('qianjiwanbian');
					list=list.randomGets(3);
					event.skillai=function(){
						return get.max(list,get.skillRank,'item');
					};
					var fun=function(list){
						var dialog=ui.create.dialog('forcebutton');
						dialog.add('选择获得一项技能');
						var clickItem=function(){
							_status.event._result=this.link;
							dialog.close();
							game.resume();
						};
						for(var i=0;i<list.length;i++){
							if(lib.translate[list[i]+'_info']){
								var translation=get.translation(list[i]);
								if(translation[0]=='新'&&translation.length==3){
									translation=translation.slice(1,3);
								}
								else{
									translation=translation.slice(0,2);
								}
								var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">'+
								translation+'</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
								item.firstChild.addEventListener('click',clickItem);
								item.firstChild.link=list[i];
							}
						}
						dialog.add(ui.create.div('.placeholder'));
						// event.switchToAuto=function(){
						// 	event._result=event.skillai();
						// 	dialog.close();
						// 	game.resume();
						// };
						_status.imchoosing=true;
						game.pause();
					};
					if(player.isOnline2()){
						player.send(func,list);
					}
					// else{
					// 	fun(list);
					// }
					else if(event.isMine()){
						fun(list);
					}
					else{
						event._result=event.skillai();
					}
					'step 3'
					_status.imchoosing=false;
					var link=result;
					if(trigger.getParent().name!="trigger"&&!trigger.getParent(2).qianjiwanbian)	trigger.getParent(2).qianjiwanbian = true;
					if(link!='qianjiwanbian'){
						player.addAdditionalSkill('qianjiwanbian',link,true);
						player.addSkillLog(link);
					}
					if(player.storage.qianjiwanbian_clear===true&&event.reapeat!=true){
						event.reapeat = true;
						event.goto(2);
					}
					if(link=='qianjiwanbian'&&player.storage.qianjiwanbian_clear!=true){
						game.playAudio('skill','qianjiwanbian_mua');
						player.storage.qianjiwanbian_clear = true;
						game.log(player,'改写了','#y『千机万变』');
					}
				},
				subSkill:{
					change:{
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill] = 'thunder';
						},
						trigger:{source:'damageBegin2'},
						priority:199,
						prompt:function(event){
							var str = '可以将本次对'+get.translation(event.player)+'造成的伤害改为（';
							str+=get.rawName(_status.event.player.storage.qianjiwanbian_change);
							str+='）属性';
							return str;
						},
						filter:function(event,player){
							return player.storage.qianjiwanbian_change&&event.nature!=player.storage.qianjiwanbian_change;
						},
						content:function(){
							trigger.nature = player.storage.qianjiwanbian_change;
						}
					},
					clear:{
						audio:4,
						trigger:{player:'phaseBegin'},
						priority:200,
						forced:true,
						silent:true,
						filter:function(event,player){
							return true;
						},
						content:function(){
							player.storage.qianjiwanbian_clear = false;
							player.removeAdditionalSkill('qianjiwanbian');
						}
					}
				}
			},
		},
		card:{
			niwei_sha:{
				content:function(){
					event.target.recover(player);
					game.delay(0.5);
				},
			},
			niwei_shan:{
				content:function(){
					delete event.result;
					event.player.draw(2);
					game.delay(0.5);
				},
			},
			niwei_tao:{
				content:function(){
					event.target.loseHp(player);
					game.delay(0.5);
				},
			},
			niwei_jiu:{
				content:function(){
					event.target.chooseToUse();
					game.delay(0.5);
				},
			},
		},
		dynamicTranslate:{
			tiantang:function(player){
				if(player.storage.haoren===true) return '<font color=#fcd>一名角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段，且在此出牌阶段内，其获得“引流”；或令其摸两张牌，只能使用声明花色的牌直到回合结束。</font>（X为你对目标发动此技能的次数且至少为1）';
				return '其他角色的回合开始时，你可以弃置X张牌并声明一种花色：观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）';
			},
			gunxun:function(player){
				if(player.storage.gunxun===true) return '<font color=#88e>转换技</font> 出牌阶段，你可以亮出至少一张<span class="firetext">①红色</span>②黑色手牌使之视为<span class="firetext">①【杀】</span>②【闪】，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。';
				return '<font color=#88e>转换技</font> 出牌阶段，你可以亮出至少一张①红色<span class="browntext">②黑色</span>手牌使之视为①【杀】<span class="browntext">②【闪】</span>，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。<span class="bluetext"></span>';
			},
			fengqing:function(player){
				var str = '<font color=#88e>转换技</font> 当你的武将牌状态发生变化时，你可以选择一名角色，其在其下个准备阶段①视为使用了【酒】②视为使用了【桃】③跳过本回合的判定和弃牌阶段。';
				switch(player.storage.fengqing){
					case 1: return str.replace(/①视为使用了【酒】/g,'<span class="bluetext">①视为使用了【酒】</span>');
					case 2: return str.replace(/②视为使用了【桃】/g,'<span class="bluetext">②视为使用了【桃】</span>');
					case 3: return str.replace(/③跳过本回合的判定和弃牌阶段/g,'<span class="bluetext">③跳过本回合的判定和弃牌阶段</span>');
				}
				return str;
			},
			erni:function(player){
				var str = '<font color=#88e>转换技</font> 你可以展示一张手牌并置于牌堆顶，视为使用或打出了一张同花色的①【杀】②【闪】③【桃】；当你发动其他技能后，可以转换一次『耳匿』。';
				switch(player.storage.erni){
					case 1: return str.replace(/①【杀】/g,'<span class="bluetext">①【杀】</span>');
					case 2: return str.replace(/②【闪】/g,'<span class="bluetext">②【闪】</span>');
					case 3: return str.replace(/③【桃】/g,'<span class="bluetext">③【桃】</span>');
				}
				return str;
			},
			jiren:function(player){
				var str = '<font color=#88e>转换技</font> 出牌阶段限一次，你可以进行判定，若为武器牌则获得之。有牌进入弃牌堆时，若其花色与你本回合某张『祭刃』判定牌相同，你可以①视为使用一张【杀】②摸一张牌③弃一张牌。你可以失去1点体力以重置此技能。';
				switch(player.storage.jiren){
					case 1: return str.replace(/①视为使用一张【杀】/g,'<span class="bluetext">①视为使用一张【杀】</span>');
					case 2: return str.replace(/②摸一张牌/g,'<span class="bluetext">②摸一张牌</span>');
					case 3: return str.replace(/③弃一张牌/g,'<span class="bluetext">③弃一张牌</span>');
				}
				return str;
			},
			qianjiwanbian:function(player){
				var str = '你可将你造成的伤害改为（雷电）属性。一个回合开始时或你于一个独立的事件中首次造成伤害时，可修改（）内属性并发现一个有字与此技能某字拼音相同的技能，在本轮内获得之。若选择“千机万变”，其效果改为你此后触发此技能时额外发现一次。';
				if(player.storage.qianjiwanbian_change){
					return str.replace(/雷电/g,'<span class="bluetext">'+get.rawName(player.storage.qianjiwanbian_change)+'</span>');
				}
				return str;
			},
		},
		translate:{
			TEST: '测试员',
			Ruki: '琉绮',
			beixie: '备械',
			beixie_info: '游戏开始时，你可以指定获得牌堆中的一张牌，且若其为武器牌，你立即装备之。',
			hunzhan: '混战',
			hunzhan_info: '<font color=#f66>锁定技</font> 一名角色受到伤害时，其可立即使用一张牌，若其如此做，你摸一张牌。',

			jike: '机萪',
			qianjiwanbian: '千机万变',
			qianjiwanbian_info: '你可将你造成的伤害改为（雷电）属性。一个回合开始时或你于一个独立的事件中首次造成伤害时，可修改（）内属性并发现一个有字与此技能某字拼音相同的技能，在你下个回合开始之前获得之。若选择『千机万变』，直到你的下个回合开始前此技能触发时额外发现一次。',
			
			Azusa: '阿梓',
			zhiyue: '指月',
			juehuo: '绝活',
			zhiyue_info: '游戏开始时，你将牌堆顶牌扣置于武将牌旁，称为“绝活”。当你使用与暗置“绝活”类型相同的牌时，可以将其中一张明置，然后若所有“绝活”均明置，你扣置牌堆顶牌于武将牌旁；当你使用与明置“绝活”花色相同的牌时，可以将其中任意张暗置并摸等量的牌。',
			zhengniu: '蒸牛',
			zhengniu_info: '其他角色令你重置、回复体力或摸牌时，你可以令其获得任意的“绝活”。',

			EQueen: '乃琳',
			yehua: '夜话',
			yehua_info: '回合开始时，你可以将手牌调整至场上唯一最多并翻面，然后本回合你使用卡牌能且只能指定多个目标。',
			fengqing: '风情',
			fengqing_info: '<font color=#88e>转换技</font> 当你的武将牌状态发生变化时，你可以选择一名角色，其在其下个准备阶段①视为使用了【酒】②视为使用了【桃】③跳过本回合的判定和弃牌阶段。',
			fengqing_jiu: '风情-酒',
			fengqing_tao: '风情-桃',

			Carol: '珈乐',
			huangjia: '王力口乐',
			shixi: '时隙',
			shixi_info: '<font color=#f66>锁定技</font> 游戏开始时，记录你的初始手牌。当（你）的牌进入弃牌堆时，若有未选定的记录牌花色与之相同，你可以选定该记录牌。一个阶段结束时，每有两个选定你便摸一张牌，然后重置选定。',
			xueta: '靴踏',
			xueta_info: '当你抵消其他角色使用的牌后，若其不是皇珈骑士，你可令其摸一张牌并成为皇珈骑士。',
			yuezhi: '乐治',
			yuezhi_info: '<font color=#a7f>觉醒技</font> 回合开始时，若场上皇珈骑士的数量不少于你的体力值，你从弃牌堆获得你的初始手牌，每有一张无法获得，你回复1点体力或摸两张牌，然后修改（）内容为“你或一名皇珈骑士”。',

			Ava: '向晚',
			yiqu: '亦趋',
			yiqu_info: '若你在其他角色执行技能的过程中被指定为目标，你可以获得该技能直到下次进入濒死状态。',
			wanxian: '挽弦',
			wanxian_info: '<font color=#f66>锁定技</font> 你令其他角色进入濒死状态时，你失去来自『亦趋』额外技能并摸等量的牌。',

			Diana: '嘉然',
			quanyu: '全域',
			quanyu_info: '其他角色使用一张牌时，若你没有该花色的手牌，你可以令此牌无效并获得之，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。',
			wulian: '舞连',
			wulian_info: '<font color=#ecd>限定技</font> 出牌阶段，你可以摸等同于已损失体力值的牌，然后在本轮内获得『连破』。',
			lianpo:'连破',
			lianpo_info:'一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。',

			Bella: '贝拉',
			aswusheng: '舞圣',
			aswusheng_info: '你连续使用或打出第（）张基本牌时，可以触发对应项：（0）使之不计入次数；（1）摸一张牌；（2）获得对方的一张牌；（3）回复1点体力。',
			gunxun: '棍训',
			gunxun_info: '<font color=#88e>转换技</font> 出牌阶段，你可以亮出至少一张①红色②黑色手牌使之视为①【杀】②【闪】，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。',
			ming_gunxunshan: '棍训:闪',
			ming_gunxunsha: '棍训:杀',

			Mikawa: '三川',
			zhezhuan: '辙转',
			zhezhuan_info: '每回合限一次，你可以将一张非基本牌当作具有任意应变条件的应变标签同名牌或基本牌使用。',
			setu: '涩涂',
			setu_info: '出牌阶段限一次，你可以将任意张点数之和小于18的手牌置于武将牌上。然后若你武将牌上牌之乘积大于100，你将这些牌置入弃牌堆，摸等量的牌，并对一名角色造成1点伤害。',

			ŌokamiMio: '大神澪',
			niwei: '逆位',
			ming_niwei: '逆位',
			xuanxu: '玄虚映实',
			xuanxu_info: '出牌阶段开始时，你可以亮出任意张基本牌，称为“逆位”牌，“逆位”牌不计入手牌数，且只能以以下效果对原不合法的目标使用：【杀】∽回复1点体力；【闪】∽摸两张牌；【桃】∽失去1点体力；【酒】∽立即使用一张牌。',
			weizeng: '味增弼佐',
			weizeng_info: '其他角色的回合开始时，你可以将任意亮出牌以任意顺序置于牌堆顶，其获得这些牌后，其所有同名牌在本回合内均视为“逆位”。',

			Ciyana: '希亚娜',
			yankui: '魇窥',
			yankui_info: '其他角色的准备阶段，你可以弃置一张与本轮以此法弃置的牌类型均不同的牌，然后观看其手牌，展示并获得其中一张。若此牌为：非基本牌，本回合其跳过判定阶段与弃牌阶段；基本牌，本回合其可以多使用一张【杀】。',

			YaotomeNoe: '八乙女のえ',
			huiyuan: '回援',
			huiyuan_info: '每回合限一次，当一名其他角色使用基本牌时，若其手牌数多于你，则你可以与其各摸一张牌。',
			suoshi: '琐事',
			suoshi_info: '当你受到伤害时，你可以将一张手牌交给一名全场手牌数最多的角色；若你手牌不为全场最少，你受到的伤害+1。',

			SuouPatra: '周防パトラ',
			mianmo: '眠魔',
			mianmo_info: '每回合限一次，你使用牌的目标可改为任意体力和等于之点数或合计点数的角色，若包括你，重置此技能。',
			tiaolv: '调律',
			tiaolv_info: '你使用一张牌时，可以令其点数增加/减少X（X为你已损失的体力值且至少为1），然后若你以此牌发动“眠魔”，则你可以令目标横置/各摸一张牌。',

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
			chongshi: '铳士',
			chongshi_info: '你使用【杀】指定目标后，可与其各摸一张牌。',

			MorinagaMiu: '森永缪',
			guanzhai: '观宅',
			guanzhai_info: '其他角色的回合结束时，若其本回合使用的牌少于（两）张，你可观看其手牌并获得其中（一）张。',
			zhishu: '直抒',
			zhishu_info: '出牌阶段开始时或你的体力值变化时，你可以展示一张手牌，然后令一名角色交给你一张同花色的牌，若其未执行，其下个回合中（）内的数值+1。',

			OtomeOto: '乙女音',
			yuxia: '玉匣',
			yuxia_info: '你可以将三张牌当作一张通常锦囊牌使用。然后，你可以将这些牌以任意顺序置于牌堆顶。',
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
			niaoji_info: '你造成/受到伤害后，可以进行判定：若为♥️，你摸X张牌；若为♠️，你弃置目标/来源X张牌。（X为你已损失的体力值+1）',
			ysxiangxing: '翔星',
			ysxiangxing_info: '出牌阶段限一次，你可以将所有手牌以任意顺序置于牌堆顶，然后对攻击范围内一名角色造成1点伤害。',

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

			KenmochiDouya: '剑持刀也',
			shenglang: '声浪燃烈',
			shenglang_info: '出牌阶段限一次，你可以将一张【杀】当【决斗】使用。你失去过牌的回合结束时，摸等同于该回合进入弃牌堆的♠【杀】数量的牌',
			nodao: '无刀之咎',
			nodao_info: '你没有装备武器时，可以于出牌阶段重铸【杀】，若你以此法获得武器牌，你可以立即装备之并回复1点体力。',

			SasakiSaku: '笹木咲',
			tiaolian: '咆咲',
			tiaolian_info: '当你使用牌指定其他角色为目标时，可用一张手牌与其中任意名目标同时拼点，对于你没赢的取消此目标，你赢的不可响应此牌；当你成为其他角色使用牌的目标时，你可以与其拼点，若你赢，此牌对你无效，若你没赢，你不可响应此牌。每回合限一次。',
			jiaku: '生笹',
			jiaku_info: '<font color=#f66>锁定技</font> 你赢得拼点时，获得目标一张牌；你没赢得拼点时，摸一张牌。',

			LizeHelesta: '莉泽·赫露艾斯塔',
			shencha: '权力审查',
			shencha_info: '准备阶段，你可以跳过本回合的摸牌阶段并观看牌堆顶3张牌，获得其中至多两张基本牌，并将其余牌置于牌堆底。若你的装备区没有牌，则你可装备其中的至多两张装备牌，若你的判定区有牌，则每有一张牌你便多观看一张牌。',
			helesta: '赫露圣剑',
			helesta_info: '你受到伤害时，可以弃置自己装备区的一张牌使此伤害-1。你失去装备区的牌时，你可以视为使用一张冰【杀】并摸一张牌。',

			AngeKatrina: '安洁·卡特琳娜',
			chuangzuo: '创作延续',
			chuangzuo_info: '准备阶段，你可令一名角色获得其判定区或装备区的一张牌，然后你摸一张牌。',

			SuzuharaLulu: '铃原露露',
			zhongli: '重力牵引',
			zhongli_info: '<font color=#f66>锁定技</font> 出牌阶段结束时，你进行判定：若为装备牌，你获得判定牌并继续判定；若你本回合第一次因此获得了某张装备牌，你减1点体力上限（至少为1）且执行一个额外的出牌阶段。',
			xinhuo: '薪火相传',
			xinhuo_chuanhuo: '传火',
			xinhuo_info: '出牌阶段，你可以将两张牌以任意顺序置于牌堆顶，令你本回合下一张使用的牌无距离和次数限制且可多指定一名目标（可叠加）。',
			weizhuang: '魔界伪装',
			weizhuang_discard: '魔界伪装',
			weizhuang_info: '<font color=#f66>锁定技</font> 你在一回合内多次使用基本牌/锦囊牌后，摸/弃X张牌。（X为此牌指定的目标数）',

			KagamiHayato: '加賀美隼人',
			liebo: '裂帛核哮',
			liebo_info: '<font color=#f66>锁定技</font> 你的黑色牌无法被响应。你的一张黑色牌首次造成伤害时，摸一张牌，然后目标可以令你弃置你装备区内的一张牌',
			zhongjizhimeng: '重机织梦',
			zhongjizhimeng_info: '出牌阶段限一次，你可弃置一张牌并展示一张手牌，此牌的颜色视为原来的异色直到回合结束。本回合内你失去此牌时，可以令一名角色回复1点体力或摸两张牌',

			AmamiyaKokoro: '天宫心',
			miaomiao: '流泪喵喵',
			miaomiao_info: '<font color=#f66>锁定技</font> 你造成数值为1的伤害时，需将其改为等量体力回复，或令目标摸两张牌；然后若你本回合已发动『逞能突击』，摸一张牌。',
			chengneng: '逞能龙息',
			chengneng_info: '每回合限一次。其他角色受到伤害，你可以弃一张牌令其来源视为你，且你为其原来源时，本次伤害改为等量体力流失。',

			SakuraRitsuki: '櫻凜月',
			zhuqiao: '筑巧',
			zhuqiao_info: '出牌阶段，若你本回合因此进入弃牌堆的牌点数之和小于24，你可重铸一张牌。回合结束时，你可令一名角色将手牌数补至X张（X为你本回合以此重铸牌的花色数）。',

			TenkaiTsukasa: '天开司',
			pojie: '破戒',
			pojie_info: '回合内，一名角色装备区内的牌数变化时，你可以摸一张牌。弃牌阶段，你需弃置的牌数改为本回合发动此技能的次数。',
			dazhen: '大振',
			dazhen_info: '出牌阶段限一次，你可将你武器栏的牌移动至其他角色武器栏（可替换原武器），然后其弃置你手牌数与手牌上限之差的牌，若不足，受到你造成的1点伤害。',

			Shaun: '勺',
			juxiao: '句销',
			juxiao_info: '当你受到伤害后，可以令至多两名角色各摸一张牌，因此摸牌的角色不能使用【杀】直到回合结束。',
			shenyan: '神言',
			shenyan_info: '出牌阶段限一次，你可以展示并弃置手牌中一种牌名的牌，摸等量的牌。然后你可以视为使用一张名称长度等同本阶段此技能弃置牌花色数的锦囊牌；否则若你弃置了【杀】，重置此技能。',

			Pudding: '步玎',
			tianlve: '甜略',
			tianlve_info: '出牌阶段开始时，你可以令一名其他角色回复1点体力，然后本阶段内你对其使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标。',
			luxian: '颅祭',
			luxian_info: '<font color=#fda>限定技</font> 准备阶段，若你已受伤，你可以扣减1点体力上限，然后发现一次P-SP角色，本回合内你视为拥有其所有技能。',

			AyanaNana: '绫奈奈奈',
			erni: '耳匿',
			erni_info: '<font color=#88e>转换技</font> 你可以展示一张手牌并置于牌堆顶，视为使用或打出了一张同花色的①【杀】②【闪】③【桃】；当你发动其他技能后，可以转换一次『耳匿』。',
			shouru: '受乳',
			shouru_info: '每回合限一次。你受到伤害/发动『耳匿』后，可以获得当前回合角色上家或下家的一张牌。',
			chonghuang: '崇皇',
			chonghuang_info: '<font color=#dac>限定技</font> 当你体力值变为1时，你可以扣减1点体力上限，然后发现一次P-SP角色，本轮次内你视为拥有其所有技能。',
			yinzun: '隐尊',
			yinzun_info: '<font color=#dac>主公技</font> 你的『崇皇』可以在同势力角色体力变为1时发动。',
			
			AkiRinco: '秋凛子',
			jiren: '祭刃',
			jiren_going: '祭刃',
			jiren2: '祭刃-重置',
			jiren_info: '<font color=#88e>转换技</font> 出牌阶段限一次，你可以进行判定，若为武器牌则获得之。有牌进入弃牌堆时，若其花色与你本回合此技能某张判定牌相同，你可以①视为使用一张【杀】②摸一张牌③弃一张牌。你可以失去1点体力以重置此技能。',
			canxin: '残心',
			canxin_info: '<font color=#fda>限定技</font> 出牌阶段结束时，若你已受伤，你可以重铸一张牌。若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作；否则回复1点体力并立即结束回合。',

			P_SP: 'P-SP',

		},
	};
});