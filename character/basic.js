'use strict';


game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'basic',
		connect:true,
		character:{
			HoshimatiSuisei:['female','shu',4,['yemuxingyong', 'xinghejianduei']],
			KaguraMea: ['female', 'qun', 4, ['luecai', 'xiaoyan']],
			UshimiIchigo: ['female', 'wu', 3, ['kuangbaoshuangren', 'guangsuxiabo']],
			SakuraMiko: ['female', 'shu', 4, ['haodu']],
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			kaguraNaNa: ['female', 'qun', 3, ['DDzhanshou', 'xinluezhili'], ['zhu']],
			Siro: ['female', 'qun', 4, ['zhongxinghezou']],
			HanazonoSerena: ['female', 'qun', 3, ['jiumao', 'enfan', 'shiqi']],
			AkiRosenthal: ['female', 'shu', 3, ['meiwu', 'huichu']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			SuzukaUtako: ['female', 'wu', 3, ['meici', 'danlian']],
			HiguchiKaede: ['female', 'wu', 4, ['zhenyin', 'saqi']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],
		},
		characterIntro:{
			HoshimatiSuisei:'如彗星般出现星（Star）之原石。我是虚拟偶像星街彗星。以至今为止积累的全部、以从现在开始积累的全部，向大家传达最好的音乐与舞台。无法忘却的瞬间、请与我共有吧。麻烦请你多多指教',
			KaguraMea: '财布? 定叫他有来无回！',
			UshimiIchigo: "8岁的小学三年级学生，居住在海边的小镇上。本体为草莓奶昔色海蛞蝓的小姑娘。性格泼辣，有些假小子。每天放学以后就潜入深海。喜食粉色的裙带菜和各种草莓味的点心。",
			SakuraMiko: '很久很久之前被电脑世界的神为了初生世界变得繁荣而创造出来的神使。被神派遣到电脑世界，接触到萌文化、动画、游戏等等，从而决心成为偶像。',
			MiraiAkari: "因为人物设计是曾经创造过初音未来的KEI，因此经常被人称为初音的妹妹。Mirai Akari是一名失忆少女，为了让大家了解自己开始做视频。同时是一位NEET，且拥有一套别墅并作为背景。",
			kaguraNaNa: "大家好辣！我是从唐辛子星来的，神乐七奈！平常是扮成插画师，偷偷地（？）辛略地球。",
			Siro: "",
			HanazonoSerena: "被您收养的猫娘。主人！从现在开始请多关照喵。",
			AkiRosenthal: '',
			XiaDi: '',
			HiguchiKaede: '生活在虚拟关西的二年级高中生。身材修长相貌出众。从小就喜欢吹小号，现在隶属校吹奏乐部。认为打扮、与猫咪一起生活是人生价值所在。为了想要更了解喜爱事物的相关，而开始了VTuber活动',
			Nekomasu: '虚拟口癖萝莉狐娘YouTuber大叔',
		},
		skill:{
			caibu: {
				init: function(player) {
					if (!player.storage.caibu) {
						player.storage.caibu = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '财',
				intro: {
					content: 'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							storage.length=0;
						}
					},
				}
			},
			luecai: {
				group: ['caibu', 'luecai_draw'],
				enable: 'phaseUse',
				usable: 1,
				locked: true,
				filterTarget:function(card,player,target){
					if (player==target) return false;
					if (target.countCards('he') == 0 || target.countCards('h') == player.countCards('h')) return false;
					return target;
				},
				check() {
					return 1;
				},
				content: function() {
					'step 0'
					if (target.countCards('h') > player.countCards('h')) {
						player.choosePlayerCard(target, 'he', true);
					}
					else if (target.countCards('h') < player.countCards('h')) {
						target.chooseCard('he', true)
					}
					'step 1'
					if (target.countCards('h') > player.countCards('h')) {
						event.card = result.links[0];
					}
					else if (target.countCards('h') < player.countCards('h')) {
						event.card = result.cards[0];
					} 
					'step 2'
					target.$give(event.card, player, false);
					target.lose(event.card, ui.special, 'toStorage');
					player.storage.caibu.push(event.card);
					player.syncStorage('caibu');
					player.markSkill('caibu');
					player.showCards(player.storage.caibu, '财布');
				},
				subSkill: {
					draw: {
						trigger: {
							player: 'phaseBegin'
						},
						filter: function(event, player) {
							return player.storage.caibu.length > 0;
						},
						content: function() {
							'step 0'
							player.chooseCardButton('移去任意张财布', [1, Infinity], player.storage.caibu);
							'step 1'
							if (result.bool) {
								var cards = result.links;
								player.$throw(cards);
								game.cardsDiscard(cards);
								cards.forEach(function(card) {
									player.storage.caibu.remove(card);
								});
								player.syncStorage('caibu');
								player.draw(cards.length);
							}
							'step 2'
							if (!player.storage.caibu.length) {
								player.unmarkSkill('caibu');
							}
						}
					}
				}
			},
			xiaoyan: {
				group: ['caibu', 'xiaoyan_res', 'xiaoyan_dam', 'xiaoyan_highlight', 'xiaoyan_clear'],
				subSkill: {
					res: {
						direct: true,
						trigger:{
							player:"useCard",
						},
						// filter:function(event,player){
						// 	return event.card
						// 		&& (
						// 			get.type(event.card)=='trick'||get.type(event.card)=='basic' 
						// 			&& !['shan','tao','jiu','du'].contains(event.card.name)
						// 		)
						// 		&& game.hasPlayer(function(current){
						// 			return current!=player && current.countCards('h') < player.countCards('h')
						// 				&& event.targets.contains(current);
						// 		});
						// },
						content:function(){
							trigger.directHit.addArray(game.filterPlayer(function(current){
								return current.countCards('h') < player.countCards('h')
							}));
						},
					},
					dam: {
						forced: true,
						trigger: {
							source: 'damageBefore',
							player: 'damageBefore'
						},
						filter: function(event, player) {
							if (!event.card || !get.suit(event.card)) return false;
							var chk = false;
							player.storage.caibu.forEach(function(c) {
								if (get.suit(c) == get.suit(event.card)) chk = true;
							});
							return chk;
						},
						content: function() {
							trigger.num++;
						},
					},
					highlight: {
						direct: true,
						trigger: {
							player: 'useCardToPlayered',
							target: 'useCardToPlayered',
						},
						filter: function(event, player) {
							if (!event.card || !get.suit(event.card)) return false;
							if (!get.tag(event.card,'damage')) return false;
							var chk = false;
							player.storage.caibu.forEach(function(c) {
								if (get.suit(c) == get.suit(event.card)) chk = true;
							});
							return chk;
						},
						content: function() {
							var buff = trigger.player == player ? '.player_buff' : '.player_nerf';
							game.broadcastAll(function(player, buff){
								player.node.xiaoyan = ui.create.div(buff ,player.node.avatar);
								player.node.xiaoyan2 = ui.create.div(buff ,player.node.avatar2);
							}, player, buff);
							game.delayx();
						}
					},
					clear: {
						direct: true,
						silent: true,
						trigger: {
							global: ['useCardAfter', 'respondAfter'],
						},
						content: function() {
							if(player.node.xiaoyan){
								game.broadcastAll(function(player){
									player.node.xiaoyan.delete();
									player.node.xiaoyan2.delete();
									delete player.node.xiaoyan;
									delete player.node.xiaoyan2;
								}, player);
							}
						}
					}
				}
			},

			kuangbaoshuangren: {
				group: ['kuangbaoshuangren_red', 'kuangbaoshuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange:function(card,player){
								if(_status.currentPhase==player && card.name=='sha' && get.color(card) == 'red') return true;
							},
							cardUsable:function (card,player,num){
								if(card.name=='sha' && get.color(card) == 'red') return Infinity;
							},
						},
						trigger: {
							source:'damageEnd'
						},
						filter:function(event,player){
							return event.card&&event.card.name=='sha'&&event.notLink()
								&& get.color(event.card) == 'red'
								&& event.player.getCards('e',{subtype:['equip3','equip4','equip6']}).length > 0
						},
						direct:true,
						content:function(){
							"step 0"
							var att=(get.attitude(player,trigger.player)<=0);
							var next=player.chooseButton();
							next.set('att',att);
							next.set('createDialog',['是否发动狂暴双刃，弃置'+get.translation(trigger.player)+'的一张坐骑牌？',trigger.player.getCards('e',{subtype:['equip3','equip4','equip6']})]);
							next.set('ai',function(button){
								if(_status.event.att) return get.buttonValue(button);
								return 0;
							});
							"step 1"
							if(result.bool && result.links.length){
								player.logSkill('kuangbaoshuangren',trigger.player);
								trigger.player.discard(result.links[0]);
							}
						}
					},
					black: {
						trigger: {
							player: 'useCard2',
							// player: 'useCardToPlayered'
						},
						forced: true,
						direct:true,
						filter:function(event,player) {
							// if (event.getParent().triggeredTargets3.length > 1) return false;
							if (!event.card || !(event.card.name == 'sha') 
								|| !(get.color(event.card) == 'black')) {
								return false;
							}
							return game.hasPlayer(function(cur) {
								return lib.filter.targetEnabled2(event.card, player, cur)
									&& player.inRange(cur)
									&& !event.targets.contains(cur)
							})
						},
						content:function(){
							'step 0'
							player.chooseTarget(true, '额外指定一名'+get.translation(trigger.card)+'的目标',function(card,player,target){
								if (trigger.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(trigger.card, player, target)
									&& player.inRange(target)
									&& !trigger.targets.contains(target)
							}).set('ai',function(target){
								var trigger=_status.event.getTrigger();
								var player=_status.event.player;
								return get.effect(target,trigger.card,player,player);
							}).set('targets',trigger.targets).set('card',trigger.card);
							'step 1'
							if(result.bool && result.targets.length){
								game.delayx();
								console.log(result.targets);
								player.logSkill('kuangbaoshuangren', result.targets);
								trigger.targets.addArray(result.targets);
							}
						},
					},
				}
			},
			guangsuxiabo: {
				init: function(player) {
					player.storage.hp = 0;
					player.storage.loseCount = 0;
				},
				trigger: {
					global: ['phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd'],
				},
				filter: function(event, player) {
					return player.storage.hp || player.storage.loseCount > 2;
				},
				content: function() {
					'step 0'
					player.draw();
					'step 1'
					var evt=_status.event.getParent('phase');
					if(evt){
						game.resetSkills();
						_status.event=evt;
						_status.event.finish();
						// _status.event.untrigger(true);
					}
				},

				group: ['guangsuxiabo_clear', 'guangsuxiabo_cnt1', 'guangsuxiabo_cnt2'],
				subSkill: {
					clear: {
						forced: true,
						silent: true,
						trigger: {
							global: ['phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin'],
						},
						content: function() {
							player.storage.hp = player.storage.loseCount = 0;
						}
					},
					cnt1: {
						forced: true,
						silent: true,
						trigger: {
							player: 'loseEnd',
						},
						content: function() {
							player.storage.loseCount += trigger.cards2.length;
						}
					},
					cnt2: {
						forced: true,
						silent: true,
						trigger: {
							player: 'damageEnd',
						},
						content: function() {
							player.storage.hp = 1;
						}
					},
				},
			},

			haodu: {
				enable: 'phaseUse',
				filterCard: true,
				selectCard: [1, Infinity],
				position: 'h',
				selectTarget: 1,
				discard:false,
				lose:false,
				filter: function(event, player) {
					return player.countCards('h') && !player.hasSkill('haodu_lose')
						&& (player.getStat('skill').haodu||0) < player.maxHp - player.hp + 1;
				},
				filterTarget: function(card, player, target) {
					return player != target;
				},
				content: function() {
					'step 0'
					target.gain(cards,player,'giveAuto');
					'step 1'
					event.videoId = lib.status.videoId++;
					var typelist = [
							['基本','','sha', 'basic', 'div1'], 
							['锦囊', '', 'wuzhong', 'trick', 'delay', 'div1'], 
							['装备', '', 'renwang', 'equip', 'div1']
						];
					var suitlist = [
							['heart', '', 'heart', 'heart', 'div2'],
							['diamond', '', 'diamond', 'diamond', 'div2'],
							['club', '', 'club', 'club', 'div2'],
							['spade', '', 'spade', 'spade', 'div2']
						];
					var numberlist = [];
					for (var i = 1; i <= 13; ++i) {
						var c = i;
						if (i == 1) c = 'A';
						else if (i == 10) c = 'X'
						else if (i == 11) c = 'J';
						else if (i == 12) c = 'Q';
						else if (i == 13) c = 'K';
						else c = i;
						numberlist.push(['', i, c, i, 'div3']);
					}
					game.broadcastAll(function(id, typelist, suitlist, numberlist){
						var dialog=ui.create.dialog('豪赌 选择');
						dialog.addText('类型');
						dialog.add([typelist, 'vcard']);
						dialog.addText('花色');
						dialog.add([suitlist, 'vcard']);
						dialog.addText('点数');
						dialog.add([numberlist, 'vcard']);
						dialog.videoId = id;
					}, event.videoId, typelist, suitlist, numberlist);
					'step 2'
					var next = player.chooseButton(3 ,true);
					next.set('dialog',event.videoId);
					next.set('filterButton',function(button) {
						for(var i = 0;i < ui.selected.buttons.length; i++){
							var now = button.link, pre = ui.selected.buttons[i].link;
							if (now[now.length - 1] == pre[pre.length - 1]) return false;
						}
						return true;
					});
					'step 3'
					game.broadcastAll('closeDialog', event.videoId);
					if (result.bool) {
						event.chi = [];
						result.links.forEach(function(card) {
							for (var i = 3; i < card.length - 1; ++i) event.chi.push(card[i]);
						})
					}
					else event.finish();
					'step 4'
					player.choosePlayerCard(target, 'h', true);
					'step 5'
					if (result.bool) {
						event.card = result.links[0];
						var str = "豪赌展示<br>";
						if (event.chi.contains(get.number(event.card))) str += "你与其交换手牌<br>";
						if (event.chi.contains(get.type(event.card))) str += "你弃置其两张牌<br>";
						if (event.chi.contains(get.suit(event.card))) str += "你获得其一张牌<br>";
						player.showCards(event.card, str);
						game.delay(2);
					}
					else event.finish();
					'step 6'
					if (event.chi.contains(get.number(event.card))) {
						player.line(target, 'grean');
						player.swapHandcards(target);
					}
					'step 7'
					if (event.chi.contains(get.type(event.card))) {
						game.delayx();
						if (target.countDiscardableCards(player, 'he')) {
							player.line(target, 'grean');
							player.discardPlayerCard("弃置其两张牌", target, 2, 'he', true);
						}
					}
					'step 8'
					if (event.chi.contains(get.suit(event.card))) {
						game.delayx();
						if(target.countGainableCards(player, 'he')){
							player.line(target, 'grean');
							player.gainPlayerCard("获得其一张牌", 'he', target, true);
						}
					}
				},
				subSkill: {
					lose: {},
				}
			},

			yong: {
				init: function(player) {
					if (!player.storage.yong) {
						player.storage.yong = [];
					}
				},
				locked:true,
				notemp:true,
				marktext: '咏',
				intro: {
					content: 'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							storage.length=0;
						}
					},
				}
			},
			yemuxingyong: {
				group: ['yong', 'yemuxingyong_gain', 'yemuxingyong_use'],
				subSkill: {
					gain: {
						round: 1,
						trigger: {
							global: 'phaseDiscardAfter',
						},
						filter: function(event, player) {
							if(event.player.isIn()){
								var find = false;
								event.player.getHistory('lose',function(evt){
									return evt.type=='discard'&&evt.getParent('phaseDiscard')==event&&evt.hs.filterInD('d').length>0;
								}).forEach(function(arr) {
									if (arr.cards != undefined) arr.cards.forEach(function(c) {
										find = true;
									})
								});
								return find;
							}
							return false;
						},
						check: function(event, player) {
							return true;
						},
						content: function() {
							"step 0"
							var cards=[];
							game.getGlobalHistory('cardMove',function(evt){
								if(evt.name=='cardsDiscard'&&evt.getParent('phaseDiscard')==trigger) cards.addArray(evt.cards.filterInD('d'));
							});
							game.countPlayer2(function(current){
								current.getHistory('lose',function(evt){
									if(evt.type!='discard'||evt.getParent('phaseDiscard')!=trigger) return;
									cards.addArray(evt.cards.filterInD('d'));
								})
							});
							event.cards = cards;
							if (event.cards.length) {
								game.cardsGotoSpecial(event.cards);
							}
							else {
								event.finish();
							}
							'step 1'
							player.storage.yong = player.storage.yong.concat(event.cards);
							player.showCards(player.storage.yong,'夜幕星咏');
							player.syncStorage('yong');
							player.markSkill('yong');
							"step 2"
							event.players=game.filterPlayer(function(current){
								return current!=player && current.countCards('he') > 0;
							});
							event.players.sortBySeat(player);
							"step 3"
							if(event.players.length){
								event.current=event.players.shift();
								event.current.animate('target');
								player.line(event.current,'green');
								if (event.current.countCards('he') && player.isAlive()) {
									event.current.chooseCard({color:'black'},'he', 
									'可将一张黑色牌置于' + get.translation(player)+ '武将牌上').set('ai',function(card){
										if(get.attitude(_status.event.player,_status.event.target) > 1) return 7-get.value(card);
										return -1;
									}).set('target', player);;
								}
							}
							else{
								player.showCards(player.storage.yong, "咏");
								game.delayx();
								event.finish();
							}
							"step 4"
							if (result.bool) {
								var card = result.cards[0];
								event.current.lose(card, ui.special, 'toStorage');
								player.storage.yong.push(card);
								event.current.$give(card, player, false);
								player.syncStorage('yong');
								player.markSkill('yong');
							}
							event.goto(3);
						},
					},
					use: {
						enable: 'phaseUse',
						filter: function(event, player) {
							if (!player.storage.yong.length) {
								return false;
							}
							return true;
						},
						content: function() {
							'step 0'
							player.chooseButton(['选择一张咏', player.storage.yong], 1);
							'step 1'
							if (result.bool) {
								var card = result.links[0];
								player.gain(result.links, 'fromStorage');
								player.storage.yong.remove(card);
								player.syncStorage('yong');
								player.markSkill('yong');
								player.$give(card, player, false);
								if (!player.storage.yong.length) {
									player.unmarkSkill('yong');
								}
							}
							else event.finish();
							'step 2'
							var chk = player.countCards('h') >= 2;
							chk &= lib.filter.cardUsable({name:'jiu'},player, 
									event.getParent('chooseToUse'))
									&& player.canUse('jiu', player);
							game.players.forEach(function(p) {
								if (p != player && player.canUse('guohe', p)) chk = true; 
							})
							if (!chk) event.finish();
							'step 3'
							player.chooseCardTarget({
								prompt: "选择两张手牌并对自己使用一张酒或对其它角色使用一张过河拆桥",
								position: 'h',
								selectCard: 2, 
								forced: true,
								filterTarget: function(card, player, target) {
									if (player == target) {
										return lib.filter.cardUsable({name:'jiu'},player, _status.event.getParent('chooseToUse'))
											&& player.canUse('jiu', player);
									}
									else {
										return player.canUse('guohe', target);
									}
								}
							})
							'step 4'
							if (result.bool && result.targets.length && result.cards.length) {
								var tar = result.targets[0];
								if (tar == player) player.useCard({name: 'jiu'}, tar, result.cards);
								else player.useCard({name: 'guohe'}, tar, result.cards);
							}
						}
					},
				}
			},
			xinghejianduei: {
				skillAnimation:true,
				animationColor:'thunder',
				juexingji:true,
				unique:true,
				trigger:{
					global: 'roundStart'
				},
				filter:function(event,player){
					return !player.storage.xinghejianduei && player.hp <= game.roundNumber;
				},
				forced:true,
				content: function() {
					player.loseMaxHp();
					player.draw(event.num=game.countPlayer());
					// player.draw(10 - player.countCards('h'));
					player.addSkill('xinghejianduei_juexing');
					player.awakenSkill(event.name);
					player.storage[event.name]=true;
				},
				subSkill: {
					juexing: {
						mod: {
							maxHandcardBase:function(player,num){
								return num + player.storage.yong.length;
							},
							attackFrom:function(from,to,distance){
								return distance-from.storage.yong.length;
							},
						}
					}
				}
			},

			shiyilijia: {
				group: ['shiyilijia_draw'],
				enable: 'phaseUse',
				usable: 1,
				init: function(player) {
					if (player.storage.shiyilijia == undefined) {
						player.storage.shiyilijia = 0;
					}
				},
				filter: function(event, player) {
					return player.countCards('h');
				},
				content:function() {
					'step 0'
					player.storage.shiyilijia = player.countCards('h');
					'step 1'
					var cards=player.getCards('h');
					player.discard(cards);
				},
				subSkill: {
					draw: {
						forced: true,
						trigger: {
							player: 'phaseEnd'
						},
						filter: function(event, player) {
							return player.storage.shiyilijia;
						},
						content: function() {
							'step 0'
							player.draw(player.storage.shiyilijia);
							'step 1'
							player.storage.shiyilijia = 0;
						}
					}
				}
			},
			seqinghuashen: {
				popup: false,
				trigger: {
					global:'useCardAfter'
				},
				filter:function(event,player){
					return event.card.name=='tao'
						&&event.player!=player
						&&get.itemtype(event.cards)=='cards'
						&&get.position(event.cards[0],true)=='o';
				},
				content:function() {
					'step 0'
					player.logSkill('seqinghuashen');
					trigger.player.draw();
					'step 1'
					var target = trigger.player;
					if (target.countGainableCards(player, 'he')) {
						player.gainPlayerCard('he',target,true);
					}
				}
			},

			xinluezhili: {
				unique:true,
				zhuSkill:true,
			},
			DDzhanshou: {
				trigger: {
					player:'useCard2'
				},
				direct:true,
				filter:function(event,player){
					return event.targets.length;
				},
				check: function(event, player) {
					return true;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('DDzhanshou'),function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if (result.bool) {
						event.tar = result.targets[0];
						if (player.hasZhuSkill('xinluezhili') && player != event.tar) {
							event.tar.addSkill('xinluezhili_draw');
						}
						// player.logSkill('DDzhanshou', event.tar);
						var count = (event.tar.countCards('h') >= player.countCards('h')) 
									+ (event.tar.hp >= player.hp) 
									+ (event.tar.countCards('e') >= player.countCards('e'));
						player.choosePlayerCard(event.tar, 'he', [1, count], "移除至多" + count + "张牌");
					}
					'step 2'
					if(result.bool){
						player.logSkill('DDzhanshou', event.tar);
						if(event.tar.storage.DDzhanshou_card){
							event.tar.storage.DDzhanshou_card = event.tar.storage.DDzhanshou_card.concat(result.links);
						}
						else {
							event.tar.storage.DDzhanshou_card = result.links.slice(0);
						}
						// game.addVideo('storage', event.tar, ['DDzhanshou_card',get.cardsInfo(event.tar.storage.DDzhanshou_card),'cards']);
						event.tar.addSkill('DDzhanshou_card');
						event.tar.markSkill('DDzhanshou_card');
						event.tar.lose(result.links,ui.special,'toStorage');
					}
					'step 3'
					if (event.tar && event.tar.countCards('h') == 0) {
						event.tar.draw();
					}
					'step 4'
					if (event.tar && event.tar.hasSkill('xinluezhili_draw')) {
						event.tar.removeSkill('xinluezhili_draw');
					}
				},
				subSkill: {
					card: {
						trigger:{
							global:'phaseEnd'
						},
						audio:false,
						mark:true,
						direct:true,
						intro:{
							content:'cardCount',
							onunmark:function(storage,player){
								if(storage&&storage.length){
									player.$throw(storage,1000);
									game.cardsDiscard(storage);
									game.log(storage,'被置入了弃牌堆');
									storage.length=0;
								}
							},
						},
						content:function(){
							if(player.storage.DDzhanshou_card){
								player.gain(player.storage.DDzhanshou_card,'fromStorage');
								delete player.storage.DDzhanshou_card;
							}
							player.removeSkill('DDzhanshou_card');
						},
					}
				}
			},
			xinluezhili_draw: {
				trigger: {
					player: 'loseAfter',
				},
				filter: function(event, player) {
					if (player.countCards('h')) return false;
					var target = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					return event.hs&&event.hs.length>0 && target.length;
				},
				content: function() {
					var target = game.filterPlayer(function(current){
						return current.hasZhuSkill('xinluezhili');
					});
					if (target.length) {
						target[0].draw();
					}
				}
			},

			zhongxinghezou: {
				init: function(player) {
					if (!player.storage.zhongxinghezou) {
						player.storage.zhongxinghezou = [];
					}
				},
				trigger: {
					player:'useCard2'
				},
				usable: 1,
				filter:function(event,player){
					if (!(get.itemtype(event.cards) == 'cards')) return false
					// if (event.getParent().triggeredTargets3.length > 1) return false;
					return true;
				},
				content: function() {
					'step 0'
					event.ctargets = trigger.targets;
					player.chooseTarget(get.prompt2('zhongxinghezou'),function(card,player,target){
						return !_status.event.targets.contains(target) && target.countCards('he');
					}).set('ai',function(target){
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if (result.bool) {
						event.starget = result.targets[0];
						event.starget.chooseToDiscard(true, 'he');
					}
					else {
						event.finish();
					}
					'step 2'
					if (result.bool && result.cards.length) {
						event.card = result.cards[0];
						var num = get.number(event.card) + get.number(trigger.card);
						if (num < 12) {
							// trigger.targets.length=0;
							// trigger.getParent().triggeredTargets2.length=0;
							trigger.cancel();
						}
						if (num >= 12 && ['basic', 'trick'].contains(get.type(event.card))) {
							player.storage.zhongxinghezou.push({
								source: trigger.card.cardid,
								card: event.card,
								targets: event.ctargets,
							});
						}
						if (num == 12) {
							event.starget.recover();
						}
					}
					else {
						event.finish();
					}
				},
				group: ['zhongxinghezou_use'],
				subSkill: {
					use: {
						forced: true,
						trigger: {
							player: 'useCardAfter',
						},
						filter: function(event, player) {
							if (!event.card.isCard) return false;
							if (!player.storage.zhongxinghezou.length) return false;
							return true;
						},
						content: function() {
							player.storage.zhongxinghezou.forEach(function(item) {
								if (item.source == trigger.card.cardid) {
									item.targets.forEach(function(tar) {
										if (get.type(item.card) == 'trick' 
										|| ['sha', 'jiu', 'tao'].contains(get.name(item.card))) {
											player.useCard({name: get.name(item.card), iscard: true}, tar);
										}
									})
									player.storage.zhongxinghezou.remove(item);
								}
							})
						}
					},
				}
			},

			maoliang: {
				mark:true,
				marktext: '粮',
				intro:{
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
			jiumao: {
				global: 'jiumao_put',
				group: ['jiumao_gain'],
				subSkill: {
					put: {
						trigger: {
							player: 'phaseDiscardBegin',
						},
						check: function(event, player) {
							var target = game.findPlayer(function(cur) {
								return cur.hasSkill('jiumao');
							})
							console.log(get.attitude(player, target));
							return target && get.attitude(player, target) > 0;
						},
						filter: function(event, player) {
							return !player.hasSkill('jiumao') && player.countCards('he')
								&& game.hasPlayer(function(cur) {
									return cur.hasSkill('jiumao');
								});
						},
						content: function() {
							'step 0'
							player.chooseCard(get.prompt('jiumao'), 'he', [1, Infinity]).set('ai', function(card) {
								if (player.needsToDiscard()) return 5 - get.useful(card);
								else return 2 - get.useful(card);
							});
							'step 1'
							if (result.bool) {
								player.lose(result.cards, ui.special, 'visible', 'toStorage');
								player.$give(result.cards, player, false);
								if (player.storage.maoliang) {
									player.storage.maoliang = player.storage.maoliang.concat(result.cards);
								}
								else {
									player.storage.maoliang = result.cards;
								}
								// game.addVideo('storage', player, ['maoliang',get.cardsInfo(player.storage.maoliang),'cards']);
								player.addSkill('maoliang');
								player.markSkill('maoliang');
								player.showCards(player.storage.maoliang, "猫粮");
							}
							else event.finish();
							'step 2'
							game.delayx();
						}
					},
					gain: {
						popup: false,
						trigger: {
							player: 'phaseBegin',
						},
						content: function() {
							'step 0'
							event.targets = game.filterPlayer(function(cur) {
								return cur.hasSkill('maoliang');
							});
							event.videoId=lib.status.videoId++;
							game.broadcastAll(function(targets, id) {
								var dialog = ui.create.dialog('选择猫粮');
								targets.forEach(function(p) {
									if (p.storage.maoliang.length) {
										dialog.addText(get.translation(p));
										dialog.add(p.storage.maoliang);
									}
								})
								dialog.videoId = id;
							}, event.targets, event.videoId);
							var next = player.chooseButton([1, player.maxHp]);
							next.set('dialog', event.videoId);
							'step 1'
							game.broadcastAll('closeDialog', event.videoId)
							if (result.bool) {
								event.cards = result.links;
								player.logSkill('jiumao');
								event.targets.forEach(function(p) {
									var all = p.storage.maoliang;
									var cho = [];
									p.storage.maoliang = [];
									all.forEach(function(card) {
										if (event.cards.indexOf(card) != -1) {
											cho.push(card);
											p.addTempSkill('jiumao_cancel');
										}
										else {
											p.storage.maoliang.push(card);
										}
									})
									p.$give(cho, player, false);
									player.gain(cho, 'fromStorage');
									p.syncStorage('maoliang');
									p.markSkill('maoliang');
									game.log(player, "获得了", p, "的猫粮：", cho);
								})
								player.line(game.filterPlayer(function(cur) {
									return cur.hasSkill('jiumao_cancel');
								}), 'green');
							}
						}
					},
					cancel: {
						mod: {
							targetEnabled: function(card, player, target) {
								if (get.color(card) == 'black' && player.hasSkill('jiumao')) {
									return false;
								}
							}
						}
					},
				}
			},
			enfan: {
				popup: false, 
				trigger: {
					global:'dying'
				},
				filter: function(event, player) {
					return event.player.hasSkill('jiumao') || event.player.hasSkill('maoliang');
				},
				content: function() {
					'step 0'
					event.targets = game.filterPlayer(function(cur) {
						return cur.hasSkill('maoliang');
					});
					event.videoId = lib.status.videoId++;
					game.broadcastAll(function(targets, id, current) {
						var dialog = ui.create.dialog('选择猫粮');
						targets.forEach(function(p) {
							if (p != current && p.storage.maoliang.length) {
								dialog.addText(get.translation(p));
								dialog.add(p.storage.maoliang);
							}
						})
						dialog.videoId = id;
					}, event.targets, event.videoId,trigger.player)
					var next = player.chooseButton([1, player.maxHp]);
					next.set('dialog', event.videoId);
					'step 1'
					game.broadcastAll('closeDialog',event.videoId);
					if (result.bool) {
						event.cards = result.links;
						var targets = [];
						var less = false;
						event.targets.forEach(function(p) {
							var temp = p.storage.maoliang;
							p.storage.maoliang = [];
							temp.forEach(function(card) {
								if (event.cards.indexOf(card) != -1) {
									p.$give(card, trigger.player, false);
									trigger.player.gain(card, 'fromStorage');
									targets.push(p);
								}
								else {
									p.storage.maoliang.push(card);
									less = true;
								}
							})
							p.syncStorage('maoliang');
							p.markSkill('maoliang');
						})
						if (!less) {
							trigger.player.recover();
						}
						player.logSkill('enfan', trigger.player);
						trigger.player.line(targets, 'green');
					}
					else event.finish();
				}
			},
			shiqi: {
				direct: true,
				trigger: {
					player: 'phaseZhunbeiBegin',
				},
				filter: function(event, player) {
					var cnt = game.filterPlayer(function(cur) {
						return player.countCards('h') < cur.countCards('h');
					})
					return cnt == 0;
				},
				content: function() {
					player.logSkill('shiqi');
					player.addTempSkill('shiqi_addDam');

					var buff = '.player_buff';
					game.broadcastAll(function(player, buff){
						player.node.shiqi= ui.create.div(buff ,player.node.avatar);
						player.node.shiqi2 = ui.create.div(buff ,player.node.avatar2);
					}, player, buff);
				},
				subSkill: {
					addDam: {
						direct: true, 
						silent: true,
						trigger: {
							source: 'damageBegin',
						},
						content: function() {
							player.removeSkill('shiqi_addDam');
							trigger.num++;
						},
						onremove: function(player, skill) {
							game.broadcastAll(function(player){
								player.node.shiqi.delete();
								player.node.shiqi2.delete();
								delete player.node.shiqi;
								delete player.node.shiqi2;
							}, player);
						}
					}
				}
			},

			meiwu: {
				// popup: false,
				direct: true,
				trigger: {
					target: 'useCardToTarget',
				},
				usable: 1,
				filter: function(event, player) {
					return get.color(event.card) == 'black' && event.targets.length == 1
				},
				content: function() {
					'step 0'
					if (!game.hasPlayer(function(cur) {
						return cur != player && cur != trigger.player;
					})) event.finish();
					player.chooseTarget('转移给一名其它角色', function(card, player, target) {
						return player != target && target != trigger.player;
					})
					'step 1'
					if (result.bool) {
						var target=result.targets[0];
						player.logSkill(event.name, target);
						var evt = trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
						player.storage.meiwu_trace = {
							cardid: trigger.card.cardid,
							target: target,
						};
					}
				},
				group: ['meiwu_trace'],
				subSkill: {
					trace: {
						direct: true,
						trigger: {
							global: 'useCardAfter',
						},
						filter: function(event, player) {
							if (!player.storage.meiwu_trace) return false;
							return player.storage.meiwu_trace.cardid == event.card.cardid &&
								(event.result.bool == false || event.result.wuxied);
						},
						content: function() {
							'step 0'
							player.chooseCard(true, 'he', "交给其一张牌");
							'step 1'
							if (result.bool && result.cards.length) {
								var target = player.storage.meiwu_trace.target;
								player.$giveAuto(result.cards, target);
								target.gain(result.cards, player);
							}
						}
					},
				}
			},
			huichu: {
				trigger: {
					global: 'phaseBegin',
				},
				filter: function(event, player) {
					return player.countCards('h')
						&& !game.hasPlayer(function(cur) {
							return cur.hp < event.player.hp;
						});
				},
				content: function() {
					'step 0'
					player.showHandcards();
					event.chk = player.countCards('h') == player.countCards('h', {suit: 'heart'});
					'step 1'
					if (event.chk) {
						trigger.player.recover();
					}
					'step 2'
					if (!event.chk) {
						player.chooseCard("重铸任意张手牌", 'h', [1, Infinity]);
					}
					'step 3'
					if (!event.chk && result.bool && result.cards.length) {
						player.lose(result.cards, ui.discardPile);
						player.$throw(result.cards);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw(result.cards.length);
					}
				}
			},

			yinliu: {
				enable: 'phaseUse',
				filter: function(event, player) {
					return	(player.countCards('he') >= 2 ||
							player.countCards('h')) && 
							!player.hasSkill('yinliu_used');
				},
				content: function() {
					'step 0'
					var list = [];
					if (player.countCards('he') >= 2) list.push('弃置两张牌');
					if (player.countCards('h')) list.push('弃置所有手牌');
					if (list.length) {
						player.addTempSkill('yinliu_used');
						player.chooseControl(list);
					}
					else event.finish();
					'step 1'
					if (result.control == '弃置两张牌') event.control = 0;
					if (result.control == '弃置所有手牌') event.control = 1;
					if (event.control == 0) {
						player.chooseCard('he', 2, true);
					}
					else {
						event.cards = player.getCards('h');
						player.addTempSkill('yinliu_end');
					}
					'step 2'
					if (event.control == 0 && result.bool) {
						event.cards = result.cards;
					} 
					'step 3'
					player.discard(event.cards);
					while (true) {
						var card=get.cards()[0]
						player.showCards(card);
						player.gain(card, 'gain2');
						var chk = true;
						event.cards.forEach(function(cur) {
							if (get.suit(cur) == get.suit(card)) chk = false;
						})
						if (!chk) break;
					}
				},
				subSkill: {
					used: {},
					end: {
						trigger: {
							player: 'phaseEnd',
						},
						filter: function(event, player) {
							return player.countCards('he') >= 2 || player.countCards('h');
						},
						content: function () {
							player.insertEvent('yinliu', lib.skill.yinliu.content);
						},
					}
				}
			},
			dunzou: {
				trigger: {
					global: 'useCardAfter',
				},
				filter: function(event, player) {
					return 	player!=_status.currentPhase &&
							// event.player != player &&
							event.card && 
							get.suit(event.card) == 'club' &&
							event.targets.contains(player);
				},
				content: function () {
					player.addTempSkill('dunzou_enable');
				},
			},
			dunzou_enable:{
				trigger:{player:['damageBegin3','loseHpBefore','recoverBefore']},
				forced:true,
				popup:false,
				content:function(){
					trigger.cancel();
				},
				mod:{
					cardEnabled:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					},
					targetEnabled:function(){
						return false;
					},
				},
				mark:true,
				intro:{
					content:'不计入距离的计算且不能使用牌且不是牌的合法目标且不能失去/回复体力和受到伤害'
				},
				group:'undist',
				ai:{
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'recover')||get.tag(card,'damage')) return 'zeroplayertarget';
						},
					},
				},
			},

			meici: {
				group: ['meici_set', 'meici_use'],
				subSkill: {
					mark: {
						mark: true,
						intro: {
							content: "本回合使用锦囊牌时，将被观看手牌并重铸其中一张",
						},
						onunmark: function(player) {
							player.unmarkSkill('meici_mark');
						}
					},
					set: {
						direct: true,
						trigger: {
							global: 'phaseBegin',
						},
						filter: function(event, player) {
							return event.player != player && !game.findPlayer(function(cur) {
								return cur.getCards('h') > event.player.getCards('h');
							});
						},
						content: function() {
							player.logSkill('meici', trigger.player);
							game.delayx();
							trigger.player.addTempSkill('meici_mark');
							trigger.player.markSkill('meici_mark');
						}
					},
					use: {
						popup: false,
						trigger: {
							global: 'useCardAfter'
						},
						filter: function(event, player) {
							return event.player.hasSkill('meici_mark')
								&& ['trick', 'delay'].contains(get.type(event.card));
						},
						content: function() {
							'step 0'
							game.delay(0.5);
							player.logSkill('meici', trigger.player);
							player.choosePlayerCard("重铸其一张手牌", trigger.player, 'h').set('visible', true);
							'step 1'
							if (result.bool && result.cards.length) {
								trigger.player.lose(result.cards, ui.discardPile);
								trigger.player.$throw(result.cards);
								game.log(trigger.player, '将', result.cards, '置入了弃牌堆');
								trigger.player.draw();
								if (get.type(result.cards[0]) == 'basic') {
									player.chooseCard("重铸一张牌", 'he');
								}
							}
							'step 2'
							if (result.bool && result.cards.length) {
								player.lose(result.cards, ui.discardPile);
								player.$throw(result.cards);
								player.draw();
								game.log(player, '将', result.cards, '置入了弃牌堆');
							}
						}
					}
				}
			},
			danlian: {
				trigger: {
					global: 'phaseEnd'
				},
				filter: function(event, player) {
					var cards = [];
					game.getGlobalHistory('cardMove',function(evt){
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray(evt.cards.filterInD('d'));
						}
					});
					var suit = [];
					if (!player.hasSkill('danlian_diamond')) suit.push('diamond');
					if (!player.hasSkill('danlian_club')) suit.push('club');
					return cards.length >= event.player.hp && 
						cards.filter(function(card) {
							return suit.contains(get.suit(card));
						}).length &&
						event.player.isAlive();
				},
				content: function() {
					'step 0'
					var cards = [];
					var suit = [];
					if (!player.hasSkill('danlian_diamond')) suit.push('diamond');
					if (!player.hasSkill('danlian_club')) suit.push('club');
					game.getGlobalHistory('cardMove', function(evt) {
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray(evt.cards.filterInD('d').filter(function(card) {
								return suit.contains(get.suit(card));
							}));
						}
					});
					if (cards) player.chooseCardButton("选择一张牌", cards);
					else event.finish();
					'step 1'
					if (result.bool) {
						console.log(result);
						event.card = result.links[0];
						var pStr = get.suit(event.card) == 'diamond' ?
							"选择乐不思蜀的目标" : "选择决斗的目标";
						event.cardName = get.suit(event.card) == 'diamond' ? 
							'lebu' : 'juedou';
						
						game.broadcastAll(function(player, user, pStr, cardName) {
							player.chooseTarget(pStr, function(card, player, target) {
								return user.canUse(cardName, target)
									&& target != player
									&& target != user;
							}).set('ai', function(target) {
								return -get.attitude(player, target);
							});
						}, player, trigger.player, pStr, event.cardName)
					}
					else event.finish();
					'step 2'
					if (result.bool && result.targets.length) {
						var target = result.targets[0];
						trigger.player.useCard({name: event.cardName}, target, [event.card]);
						player.addTempSkill('danlian_' + get.suit(event.card), 'roundStart');
					}
					game.delay(0.5);
				},
				subSkill: {
					diamond: {},
					club: {},
				}
			},

			zhenyin: {
				trigger: {
					source: 'damageEnd',
					player: 'useCardToPlayered',
				},
				filter: function(event, player) {
					if (!player.hasSkill('saqi_use')) {
						return event.name == 'damage' && event.player.countCards('ej');
					}
					else {
						return event.name == 'useCardToPlayered' 
							&& event.targets.length == 1
							&& event.targets[0].countCards('ej');
					}
				},
				content: function() {
					'step 0'
					event.A = trigger.name == 'damage' ? 
						trigger.player :
						trigger.targets[0];
					event.B = event.A.next;
					if (!event.A.countCards('ej')) event.finish();
					player.choosePlayerCard('ej', event.A);
					'step 1'
					if (result.bool) {
						var card = result.links[0];
						var dam = false;
						if(get.position(card)=='e'){
							var c = event.B.getEquip(get.subtype(card));
							if (c) {
								dam = true;
								game.log(c, '掉落了');
							}
							re = event.B.equip(card);
						}
						else {
							var cname = card.viewAs ? card.viewAs : get.name(card);
							event.B.getCards('j').forEach(function(c) {
								if (get.name(c) == cname) {
									game.log(c, '掉落了');
									game.cardsDiscard(c);
									dam = true;
								}
							})
							event.B.addJudge({name: cname}, [card]);
						}
						event.A.$give(card, event.B)
						if (dam) event.B.damage('nocard');
						game.delay();
					}
				}
			},
			saqi: {
				init: function(player) {
					if (!player.storage.saqi_use) {
						player.storage.saqi_use = [];
					}
				},
				trigger: {player: 'phaseZhunbeiBegin'},
				content: function() {
					'step 0'
					var list = [];
					list.push('减少上限');
					if (player.maxHp < 5) list.push('增加上限');
					player.chooseControl(list).ai = function() {
						if (list.length == 2) {
							if (player.maxHp > player.hp) {
								return 0;
							}
							else return 1;
						}
						else return 0;
					};
					'step 1'
					if (result.control == '增加上限') {
						player.gainMaxHp();
					}
					else {
						player.loseMaxHp();
						player.addTempSkill('saqi_use', {
							player: 'phaseBegin',
						});
						player.addTempSkill('saqi_ban');
					}
				},
				prompt: function() {
					var str = "是否发动飒气并选择<br>";
					var add = (_status.event.player.maxHp < 5);
					var item1 = '减少体力上限<br>';
					var item2 = '增加体力上限<br>';
					if (!add) return str + item1;
					else return str + '1. ' + item1 + '2. ' + item2;
				},
				global: 'saqi_banG',
				subSkill: {
					use: {
						mark: true,
						locked: true,
						direct: true,
						marktext: '飒',
						intro: {
							content: function(storage, player, skill) {
								var str = "发动“震音”的条件改为“你使用牌指定唯一目标后”。<br>";
								if (storage && storage.length) {
									str += "其他角色本回合无法使用的花色：" + 
										get.translation(storage);
								}
								return str;
							}
						},
						trigger: {
							player: 'useCardAfter',
						},
						content: function() {
							var suit = get.suit(trigger.card);
							if (player.hasSkill('saqi_ban') && suit && suit != 'none') {
								if (player.storage.saqi_use.indexOf(suit) == -1) {
									player.storage.saqi_use.push(suit);
									player.markSkill('saqi_use');
								}
							}
						}
					},
					banG: {
						mod: {
							cardEnabled: function(card, player) {
								var cur = game.findPlayer(function(p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player && 
									cur.storage.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							},
							cardSavable:function(card, player){
								var cur = game.findPlayer(function(p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player && 
									cur.storage.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							}
						},
					},
					ban: {
						onremove: function(player) {
							player.storage.saqi_use = [];
							player.markSkill('saqi_use');
						},
					}
				}
			},

			milijianying: {
				direct: true,
				mark: true,
				marktext: '性',
				locked: true,
				intro: {
					content: function(storage, player, skill) {
						return "当前为" + get.translation(player.sex);
					},
				},
				trigger: {
					player: 'useCardAfter',
				},
				filter: function(event, player) {
					return get.name(event.card) == 'sha';
				},
				content: function() {
					if (player.sex == 'female') {
						player.sex = 'male';
					}
					else {
						player.sex = 'female'
					}
					player.markSkill('milijianying');
				},
				group: 'milijianying_cixiong',
				subSkill: {
					cixiong: {
						equipSkill:true,
						noHidden:true,
						inherit:'cixiong_skill',
					},
				}
			},
			dianyinchuancheng: {
				trigger: {
					player:'damageEnd',
				},
				direct: true,
				content: function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					event.count--;
					var X = game.countPlayer(function(cur) {
						return cur.hp > player.hp;
					})
					player.chooseTarget("你可以与一名与你手牌数差不大于" + X + "的角色交换手牌",function(card,player,target){
						return Math.abs(player.countCards('h') - target.countCards('h')) <= X
							// && target != player;
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return Math.abs(player.countCards('h') - target.countCards('h'));
						}
						return att/3;
					});
					"step 2"
					if(result.bool){
						event.tar = result.targets[0];
						player.logSkill('dianyinchuancheng', event.tar);
						player.swapHandcards(event.tar);
					}
					'step 3'
					if (event.tar) {
						var max = Math.max(player.countCards('h'), event.tar.countCards('h'));
						player.drawTo(max);
						event.tar.drawTo(max);
						if (event.count) event.goto(1);
					}
				},
			},
		},
		translate:{
			HoshimatiSuisei:'星街彗星',
			yemuxingyong: '夜幕星咏',
			yemuxingyong_info: '每轮限一次，一个弃牌阶段结束时，你可将本阶段进入弃牌堆的牌置于武将牌上，称为“咏”。然后其他角色也可将一张黑色牌置于你武将牌上。出牌阶段，你可获得一张“咏”，然后立即将两张手牌当【过河拆桥】或【酒】使用。',
			yong: '咏',
			xinghejianduei:'星河舰队',
			xinghejianduei_info:'觉醒技。一轮开始时，若你的体力值不大于游戏轮数，你减 1 点体力上限并摸等同于存活角色数的手牌，然后你的攻击范围和手牌上限始终增加“咏”的数量。',

			KaguraMea: '神乐めあ',
			luecai: '掠财',
			luecai_info: '出牌阶段限一次，你可以将手牌数大于你的角色的一张牌置于你的武将牌上，或令一名手牌数小于你的角色将一张牌置于你的武将牌上，称为“财布”。准备阶段，若你的武将牌上有“财布”，你可以移去任意数量的”财布“摸等量的牌。',
			xiaoyan: '嚣言',
			xiaoyan_info: '锁定技。你对手牌数小于你的角色使用牌不可被响应。当你造成或受到伤害时，若有花色与来源牌相同的“财布”，此伤害+1。',
			caibu: '财布',

			UshimiIchigo: '宇志海莓',
			kuangbaoshuangren: '狂暴双刃',
			kuangbaoshuangren_info: '锁定技。你的黑色【杀】指定目标后，需额外指定攻击范围内的一名角色为目标。你的红色【杀】无距离与次数限制，且造成伤害后可以弃置目标的坐骑牌。',
			guangsuxiabo: '光速下播',
			guangsuxiabo_info: '一个阶段结束时，若你于此阶段受到过伤害或失去了两张以上的牌，你可以摸一张牌并结束当前回合。',

			SakuraMiko: '樱巫女',
			haodu: '豪赌',
			haodu_info: '出牌阶段X+1次（X为已损失体力），你可以将至少一张手牌交给一名其他角色并声明点数、花色、类型，然后你展示其一张手牌。根据与声明相同的项依次执行对应效果：点数，你与其交换手牌；类型，你弃置其两张牌；花色，你获得其一张牌。',

			MiraiAkari: '未来明',
			shiyilijia: '失忆离家',
			shiyilijia_info: '出牌阶段限一次，你可弃置所有手牌，若如此做，你于回合结束时摸等量的牌。',
			seqinghuashen: '色情化身',
			seqinghuashen_info: '其他角色的【桃】因使用进入弃牌堆时，你可以令其摸一张牌，然后你获得其一张牌。',

			kaguraNaNa: '神乐七奈',
			DDzhanshou: 'DD斩首',
			DDzhanshou_info: '当你使用牌指定目标后，你可选择其中一名目标角色，该角色每满足一项你便可将其一张牌移出游戏直到此回合结束：手牌数不少于你；体力值不少于你；装备区牌数不少于你。然后若该角色没有手牌，其摸一张牌。', 
			xinluezhili: '辛略之力', 
			xinluezhili_draw: '辛略之力',
			xinluezhili_info: '主公技。当其他角色因“DD斩首”失去最后一张手牌时，其可令你摸一张牌', 

			Siro: '电脑少女小白',
			zhongxinghezou: '众星合奏',
			zhongxinghezou_info: '你使用实体牌指定目标后，可令目标外的角色弃置一张牌。若两牌点数之和：小于12，此牌无效；不小于12，此牌结算后，你视为对同目标使用弃置的基本牌或普通锦囊牌；等于12，弃置牌的角色回复1点体力。',

			HanazonoSerena: '花園セレナ',
			maoliang: '猫粮',
			jiumao: '啾猫',
			jiumao_info: '其他角色在弃牌阶段开始时，可将任意数量的牌放在其武将牌旁，称为“猫粮”。你的回合开始时，可获得数量不大于你体力上限的“猫粮”，若如此做，你无法使用黑色牌指定你获得牌的来源为目标直到回合结束。',
			enfan: '恩返',
			enfan_info: '发动过“啾猫”的角色濒死时，你可把其以外角色的数量不大于你体力上限的“猫粮”交给该名角色，然后若场上没有“猫粮”，其回复1点体力',
			shiqi: '势起',
			shiqi_info: '锁定技。准备阶段，若你的手牌数为全场最多，本回合你造成的第一次伤害+1。',

			AkiRosenthal: '亚琦·罗森塔尔',
			meiwu: '魅舞',
			meiwu_info: '当你于一回合内首次成为黑色牌的唯一目标时，你可以将目标转移给另一名其他角色，然后若此牌被抵消，你交给其一张牌。',
			huichu: '慧厨',
			huichu_info: '体力值最少的角色回合开始时，你可以展示所有手牌，若均为♥，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。',

			XiaDi: '下地',
			yinliu: '引流',
			yinliu_info: '出牌阶段限一次，你可以弃置两张牌或所有手牌，然后摸牌并展示直到出现了你弃置牌包含的花色为止。若你以此法弃置了所有手牌，本回合结束时你可再次发动此技能。',
			dunzou: '遁走',
			dunzou_info: '你于其他角色的回合被♣牌指定并结算后，你可以令你于本回合视为不存在。',
			dunzou_enable: '遁走',

			SuzukaUtako: '铃鹿诗子',
			meici: '美词',
			meici_info: '其他角色的回合开始时，若其手牌为全场最多，其本回合使用锦囊牌后，你可以观看其手牌并重铸其中一张，若因此重铸了基本牌，你也可重铸一张牌。',
			danlian: '耽恋',
			danlian_info: '一个回合结束时，若本回合不因使用而进入弃牌堆的牌不小于当前回合角色的体力值，你可选择其中一张♦或♣牌并选择另一名其他角色，当前回合角色将♦牌当【乐不思蜀】，♣牌当【决斗】对你选择的角色使用。每轮每种花色限一次。',

			HiguchiKaede: '樋口枫',
			zhenyin: '震音',
			zhenyin_info: '你造成伤害后，可以将目标装备区或判定区的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。',
			saqi: '飒气',
			saqi_info: '准备阶段，你可以增加（至多到 5 ）或扣减 1 点体力上限，若选择扣减，你获得以下效果直到你的下回合开始：你使用牌结算后，所有其他角色本回合无法使用该花色的牌；发动“震音”的条件改为“你使用牌指定唯一目标后”。',

			Nekomasu: 'Nekomasu',
			milijianying: '迷离剑影',
			milijianying_info: '锁定技。你始终拥有装备【雌雄双股剑】的效果。当你使用一张【杀】后，改变你的性别。',
			dianyinchuancheng: '点引承传',
			dianyinchuancheng_info: '当你受到1点伤害后，你可以与一名与你手牌数差不大于X的角色交换手牌，然后手牌较少的一方将手牌调整至较多一方的数量。（X为场上体力值大于你的角色）',
		},
	};
});
