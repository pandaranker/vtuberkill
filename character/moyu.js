'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'moyu',
		connect:true,
		character:{
			shenshenAlice: ['female', 'shen', 6, ['huanzhuang', 'tinenghuifu']],
			shenshenHoshimatiSuisei: ['female', 'shen', 4, ['xinghejianduei_ban', 'xingyongzange']],
			conqueror: ['male', 'qun', 4, ['dunji', 'kongtizhemo']],
			hongyouchaoshou: ['male', 'qun', 3, ['wangzhedating', 'xukongkaituan', 'yingyangjiaohuan']],
			highlander: ['male', 'qun', 4, ['jinggongzitai', 'poshantiji', 'lingqiaoshanbi']],
			// SuzukaUtako2: ['female', 'wu', 3, ['jiuhao', 'shizhangmengyan', 'fuzhe']],
		},
		characterIntro:{
			conqueror: 'In desperate times, conscripted criminals refill our ranks. Sometimes, however, you find a diamond in the rough. The most elite earn their name: Conquerors. Strong as a battering ram, resilient as a fortress gate, their flail is as dangerous to the wielder as it is to the enemy. But in the right hands it becomes... unstoppable',
			hongyouchaoshou: '最好的评价就是逝者安息',
		},
		skill:{
			xinghejianduei_ban: {
				trigger: {
					player: ['phaseUseBegin'],
				},
				skillAnimation:'epic',
				animationColor:'thunder',
				group: ['xinghejianduei_ban_discard', 'xinghejianduei_ban_reset'],
				mark: true,
				init: function(player) {
					if (player.storage.xinghejianduei == undefined) {
						player.storage.xinghejianduei = false;
					}
				},
				filter: function(event, player) {
					// console.log(player.storage);
					return player.storage.xinghejianduei == false && player.countCards('h') < 10;
				},
				content: function() {
					// console.log(player.storage);
					player.draw(10 - player.countCards('h'));
					player.storage.xinghejianduei = true;
				},
				marktext: '舰',
				intro:{
					content:'limited',
				},
				subSkill: {
					discard: {
						forced: true,
						trigger: {
							player: ['phaseEnd'],
						},
						filter: function(event, player) {
							// console.log(player.storage);
							return player.storage.xinghejianduei == true&& player.countCards('he');
						},
						content: function() {
							player.chooseToDiscard(3,'he',true);
							if (player.countCards('h') == 0) {
								player.storage.xinghejianduei = false;
								// console.log("hihi");
								// console.log(player.storage);
							}
						}
					},
					reset: {
						forced: true,
						skillAnimation:'epic',
						trigger: {
							player: ['loseEnd'],
						},
						filter: function(event, player) {
							return player.storage.xinghejianduei == true && player.countCards('h') == 0;
						},
						content: function() {
							player.storage.xinghejianduei = false;
							// console.log(player.storage);
						}
					}
				}
			},
			xingyongzange: {
				global: 'xingyongzange_draw',
				group: ['xingyongzange_skip'],
				frequent:true,
				locked:true,
				notemp:true,
				init: function(player) {
					if (!player.storage.xingyongzange) {
						player.storage.xingyongzange= [];
					}
				},
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
				},
				trigger: {
					global:'roundStart',
				},
				content:function() {
					"step 0"
					if(player.countCards('he')){
						player.chooseCard('he', '你可以用一张牌替换武将牌上的牌（没有则置于上）', 1);
					}
					else{
						event.finish();
					}
					"step 1"
					if (result.cards&&result.cards.length) {
						var card = result.cards[0];
						player.lose(card, ui.special, 'toStorage');
						
						if (!player.storage.xingyongzange.length) {
							player.storage.xingyongzange.push(card);
						}
						else {
							player.storage.xingyongzange.forEach(function(c) {
								player.gain(c);
							});
							player.storage.xingyongzange[0] = card;
						}
						player.syncStorage('xingyongzange');
						player.markSkill('xingyongzange');
						game.log(player,'将',result.cards,'替换武将牌上的牌');
					}
				},
				subSkill: {
					draw: {
						trigger: {
							player: 'loseEnd',
						},
						frequent: true, 
						filter: function(event, player) {
							if(event.type!='discard') return false;
							var target = game.filterPlayer(function(current){
								return current.hasSkill('xingyongzange');
							});
							// console.log(target);

							if (target.length != 1) return false;
							var owner = target[0];
							if (owner.storage.xingyongzange== undefined || owner.storage.xingyongzange.length == 0) {
								return false;
							}
							var point = get.number(owner.storage.xingyongzange[0]);
							// console.log("需要的点数" + point);
							for (var i = 0; i < event.cards2.length; i++) {
								var card = event.cards2[i];
								if (get.number(card) == point) return true;
							}
							return false;
						},
						content: function() {
							'step 0'
							var target = game.filterPlayer(function(current){
								return current.hasSkill('xingyongzange');
							});
							var point = get.number(target[0].storage.xingyongzange[0]);
							// console.log("点数" + point);
							event.$= 0;
							// console.log(trigger.cards2);
							trigger.cards2.forEach(function(card) {
								if (get.number(card) == point) {
									event.$++;
									// console.log(event.$);
								}
							});
							'step 1'
							player.chooseBool("是否发动星咏赞歌横置并摸一张牌");
							'step 2'
							// console.log('牌数' + event.$);
							if (result.bool) {
								if (!player.isLinked()) {
									player.link();
								}
								player.draw();
								event.$--;
							}
							else {
								event.finish();
							}
							'step 3'
							if (event.$ > 0) {
								event.goto(1);
							}
							else {
								event.finish();
							}
						},
					},
					skip: {
						forced: true,
						trigger: {
							player: 'phaseDiscardBefore',
						},
						filter: function(event, player) {
							// console.log(player.isLinked());
							return player.isLinked();
						},
						content: function() {
							trigger.cancel();
						}
					}
				},
			},

			huanzhuang: {
				mark:true,
				locked:true,
				zhuanhuanji:true,
				marktext:'装',
				epic: true,
				intro:{
					content:function(storage,player,skill){
						var str=player.storage.huanzhuang == false ?
							'失去一点体力，获得牌堆中的一张装备牌。':'减少一点体力上限并弃置至少四张牌，视为你使用了一张无距离限制且不计入出牌阶段使用次数的【雷杀】。';
						return str;
					},
				},
				init: function(player) {
					player.storage.huanzhuang = false;
					// player.storage.huanzhuang = true;
				},
				filter: function(event, player) {
					if (!player.storage.huanzhuang) {
						return true;
					}
					else {
						return player.countCards('he') >= 4;
					}
				},
				enable:"phaseUse",
				usable:1,
				content: function() {
					'step 0'
					event.huanzhuang = player.storage.huanzhuang;
					player.storage.huanzhuang = !player.storage.huanzhuang;
					'step 1'
					if (!event.huanzhuang) {
						player.loseHp();
						var card =get.cardPile(function(card){
							return get.type(card) == 'equip';
						});
						player.gain(card);
					}
					'step 2'
					if (event.huanzhuang) {
						player.loseMaxHp();
						player.chooseToDiscard('he', [4, Infinity], true);
					}
					'step 3'
					if (event.huanzhuang && result.bool) {
						player.chooseTarget("对一名其他角色使用一张【雷杀】",function(card,player,target){
							if(player==target) return false;
							return player.canUse({name:'sha'},target,false);
						})
					}
					'step 4'
					if (event.huanzhuang && result.bool) {
						player.logSkill('huanzhuang',result.targets);
						player.useCard({name: 'sha', nature: 'thunder'}, result.targets, false);
					}
				}
			},
			tinenghuifu: {
				trigger: {
					player:'loseAfter'
				},
				frequent:true,
				filter:function(event,player){
					return event.es&&event.es.length>0;
				},
				content:function(){
					console.log("heihei");
					player.drawTo(player.maxHp);
				},
			},

			dunji: {
				audio: 1,
				enable: 'phaseUse', 
				usable: 1,
				selectTarget: 1,
				filterTarget: function(card, player, target) {
					return target != player && target.countCards('h');
				},
				content: function() {
					'step 0'
					player.choosePlayerCard(target, 'h');
					'step 1'
					if (result.bool) {
						var card = result.links[0];
						target.discard(card);
						// player.showCards(card, "盾击弃置");
						if (get.name(card) != 'shan') {
							console.log(target);
							target.addTempSkill('dunji_buff');
						}
					}
					else event.finish();
				},
			},
			dunji_buff: {
				mark:true,
				marktext: '盾',
				intro: {
					content: '不能打出或使用闪',
				},
				forced: true,
				silent: true,
				trigger: {
					player: 'damageEnd',
				},
				filter: function(event, player) {
					return event.source.hasSkill('dunji');
				},
				content: function() {
					trigger.source.logSkill(player, 'dunji');
					player.chooseToDiscard(true, 'h');
				},
				mod: {
					cardUsable:function(card){
						if (get.name(card) == 'shan') return 0;
					},
					cardRespondable:function(card){
						if (get.name(card) == 'shan') return 0;
					},
					cardEnabled:function(card){
						if(card.name=='shan') return 0;
					},
					cardSavable:function(card){
						if (get.name(card) == 'shan') return 0;
					}
				}
			},
			kongtizhemo: {
				group: ['kongtizhemo_lose','kongtizhemo_dam'],
				subSkill: {
					lose: {
						trigger: {
							global: 'loseAfter',
						},
						filter: function(event, player) {
							if(_status.currentPhase != player) return false;
							if (event.player == player) return false;
							if (event.player.countCards('h')) return false;
							return event.hs && event.hs.length > 0;
						},
						content: function() {
							player.draw();
						}
					},
					dam: {
						trigger: {
							source: 'damageEnd',
						},
						filter: function(event, player) {
							return event.player.countCards('h') == 0;
						},
						content: function() {
							player.draw();
						}
					},
				}
			},

			wangzhedating: {
				group: ['wangzhedating_discard1', 'wangzhedating_discard2', 'wangzhedating_draw'],
				subSkill: {
					discard1: {
						forced: true,
						trigger: {
							player: ['useCardAfter', 'respondAfter'],
						},
						filter:function(event,player){
							var chk = false;
							event.cards.filterInD('o').forEach(function(card) {
								if (!['equip','delay'].contains(get.type(card))) {
									chk = true;
								}
							})
							return chk;
						},
						content:function(){
							var cards=trigger.cards.filterInD('o');
							cards.forEach(function(card) {
								console.log('o ' + card.name);
								if (!['equip','delay'].contains(get.type(card))) {
									card.fix();
									ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
									game.log(player,'将',card,'置于牌堆顶');
								}
							});
							game.updateRoundNumber();
						},
					},
					discard2: {
						forced: true, 
						trigger: {
							player: 'loseAfter',
						},
						filter: function(event, player) {
							event.cards.forEach(function(c) {
								console.log(get.name(c) + ' ' + get.position(c));
							})
							return event.cards.filterInD('d').length;
						},
						content: function() {
							var cards = trigger.cards.filterInD('d');
							cards.forEach(function(card) {
								console.log('d ' + card.name);
								card.fix();
								ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
								game.log(player,'将',card,'置于牌堆顶');
							})
							game.updateRoundNumber();
						}
					},
					draw: {
						direct: true,
						trigger:{
							player:'drawBegin',
						},
						content: function() {
							var pos = ui.discardPile.childNodes.length - trigger.num;
							if (pos < 0) pos = 0;
							trigger.num = 0;
							var cards = [];
							for (var i = pos; i < ui.discardPile.childNodes.length; ++i) {
								cards.push(ui.discardPile.childNodes[i]);
							}
							player.gain(cards, 'gain2');
						},
					},
				}
			},
			xukongkaituan: {
				mark:true,
				zhuanhuanji:true,
				marktext: '团',
				init: function(player) {
					player.storage.xukongkaituan = 0;
				},
				intro:{
					content:function(storage,player,skill){
						var str = !player.storage.xukongkaituan?
							'指定一个花色然后亮出牌堆顶4张牌。你获得其中花色与指定花色相同的牌，且本回合使用该花色的牌无距离次数限制。':
							'指定一个花色然后亮出弃牌堆顶4张牌。你获得其中花色与指定花色相同的牌，且本回合使用该花色的牌无距离次数限制。';
						
						if(player.storage.xukongkaituan_suit){
							str+='<br><li>当前花色：';
							str+=get.translation(player.storage.xukongkaituan_suit);
						}
						return str;
					},
				},
				enable:"phaseUse",
				filter: function(event, player) {
					return !player.hasSkill('xukongkaituan_used');
				},
				content: function() {
					'step 0'
					player.addTempSkill('xukongkaituan_used');
					player.chooseControl('heart','diamond','club','spade');
					'step 1'
					if (!player.storage.xukongkaituan) {
						event.cards = get.cards(4);
						player.storage.xukongkaituan = !player.storage.xukongkaituan;
					}
					else {
						event.cards = [];
						for (var i = ui.discardPile.childNodes.length - 1; i >= 0; --i) {
							if (event.cards.length < 4) {
								var current = ui.discardPile.childNodes[i];
								event.cards.push(current);
							}
							else break;
						}
						player.storage.xukongkaituan = !player.storage.xukongkaituan;
					}
					event.suit = result.control;
					player.storage.xukongkaituan_suit = result.control;
					player.showCards(event.cards);
					game.delayx();
					'step 2'
					var cards = [];
					event.cards.forEach(function(card) {
						if (get.suit(card) == event.suit) {
							cards.push(card);
						}
					})
					player.gain(cards, 'log', 'gain2');
					player.markSkill('xukongkaituan');
					player.addTempSkill('xukongkaituan_use');
				},
				subSkill: {
					use: {
						mod: {
							cardUsable:function(card, player){
								if (get.suit(card) == player.storage.xukongkaituan_suit) {
									return Infinity;
								}
							},
							targetInRange:function(card,player){
								if (get.suit(card) == player.storage.xukongkaituan_suit) {
									return true;
								}
							}
						},
						onremove: function(player) {
							delete player.storage.xukongkaituan_suit;
						}
					}
				}
			},
			xukongkaituan_used: {
			},
			yingyangjiaohuan: {
				unique:true,
				enable:'phaseUse',
				limited:true,
				skillAnimation:'epic',
				animationColor: 'legend',
				position:'he',
				filterCard: true,
				discard: false,
				selectCard: [1,Infinity],
				content: function() {
					player.awakenSkill('yingyangjiaohuan');
					game.cardsDiscard(cards);
					player.$throw(cards);
					var newcards = get.cards(cards.length);
					player.gain(newcards, 'gain2');
					if (player.hasSkill('xukongkaituan')) {
						player.removeSkill('xukongkaituan');
						player.addSkill('xukongkaituan');
						if (player.hasSkill('xukongkaituan_used')) {
							player.removeSkill('xukongkaituan_used');
						}
					}
				}
			},

			gong_mark: {
				mark: true,
				marktext: '攻',
				intro:{
					name: '进攻姿态',
				},
				onremove: function(player) {
					player.unmarkSkill('gong_mark');
				}
			},
			jinggongzitai: {
				group: ['jinggongzitai_in', 'jinggongzitai_out'],
				subSkill: {
					in: {
						audio: 'jinggongzitai_in',
						trigger: {
							source: 'damageEnd',
							player: 'phaseDiscardEnd'
						},
						filter: function(event, player) {
							if (player.hasSkill('gong_mark')) return false;
							// console.log(event.name);
							if (event.name == 'phaseDiscard') {
								return event.cards && event.cards.length >= 2;
							}
							else return true;
						},
						content: function() {
							player.draw(2);
							player.addSkill('gong_mark');
						},
					},
					out: {
						audio: 'jinggongzitai_out',
						trigger: {
							player: 'damageEnd',
						},
						forced: true, 
						filter: function(event, player) {
							return player.hasSkill('gong_mark');
						},
						content: function() {
							player.chooseToDiscard(true, 'h');
							player.removeSkill('gong_mark');
						}
					}
				}
			},
			poshantiji: {
				audio: 2,
				trigger: {
					player: 'shaMiss',
					target: 'shaMiss',
				},
				filter: function(event, player) {
					return player.hasSkill('gong_mark');
				},
				content: function() {
					'step 0'
					event.tar = trigger.target == player ? trigger.player : trigger.target;
					console.log(event.tar);
					player.chooseToDiscard('he');
					'step 1'
					if (result.bool) {
						console.log('true');
						player.judge();
					}
					else event.finish();
					'step 2'
					var suit = result.suit;
					console.log(suit);
					if (suit == 'heart') {
						player.removeSkill('gong_mark');
					}
					else if (suit == 'diamond') {
						if (!event.tar.classList.contains('turnedover')) {
							event.tar.turnOver();
						}
					}
					else {
						event.tar.discard(event.tar.getCards('e'));
						event.tar.chooseToDiscard(true, 'h', 2);
					}
				}
			},
			lingqiaoshanbi: {
				audio: 2,
				trigger: {
					player: ['useCardAfter', 'respondAfter'],
				},
				filter: function(event, player) {
					return player.hasSkill('gong_mark') && get.name(event.card) == 'shan';
				},
				content: function() {
					player.draw();
				}
			},

			jiuhao: {
				mark: true,
				marktext: '醇',
				locked: true,
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
				},
				init: function(player) {
					player.storage.jiuhao= [];
				},
				group: ['jiuhao_put', 'jiuhao_use'],
				subSkill: {
					put: {
						trigger: {
							player: 'useCardAfter',
						},
						filter: function(event, player) {
							return get.name(event.card) == 'sha';
						},
						content: function() {
							'step 0'
							player.chooseCard('he').set('filterCard', function(card, player) {
								return get.color(card) == 'red';
							})
							'step 1'
							if (result.bool && result.cards && result.cards.length) {
								player.lose(result.cards, ui.special, 'toStorage');
								player.storage.jiuhao.push(result.cards[0]);
								player.syncStorage('jiuhao');
								player.markSkill('jiuhao');
								player.showCards(player.storage.jiuhao, '醇');
							}
						}
					},
					use: {
						enable:'chooseToUse',
						filter:function(event,player){
							if (!player.storage.jiuhao.length) return false;
							return event.filterCard({name:'jiu',isCard:true},player,event);
						},
						content:function(){
							'step 0'
							if(_status.event.getParent(2).type=='dying'){
								event.dying=player;
								event.type='dying';
							}
							player.chooseCardButton('弃置一张醇', player.storage.jiuhao);
							'step 1'
							if (result.bool && result.links && result.links.length) {
								var card = result.links[0];
								player.$throw(card);
								game.cardsDiscard(card);
								player.storage.jiuhao.remove(card);
								player.syncStorage('jiuhao');
								player.useCard({name:'jiu',isCard:true},player);
							}
						},
					},
				},
			},
			shizhangmengyan: {
				trigger: {
					target: 'useCardToTarget',
				},
				filter: function(event, player) {
					return get.color(event.card) == 'black'
						&& player.countCards('he');
				},
				content: function() {
					'step 0'
					player.chooseToDiscard('he');
					'step 1'
					if (result.bool) {
						player.useCard({name: 'sha'}, trigger.player);
					}
				}
			},
		},
		translate:{
			shenshenAlice: '神神爱丽丝',
			huanzhuang: '换装',
			huanzhuang_info: '转换技，出牌阶段限一次，①失去一点体力，获得牌堆中的一张装备牌。②减少一点体力上限并弃置至少四张牌，视为你使用了一张无距离限制且不计入出牌阶段使用次数的雷杀。',
			tinenghuifu: '体能恢复',
			tinenghuifu_info: '当你失去装备时，你可以将手牌摸至数量等于体力上限值。',

			shenshenHoshimatiSuisei: '神神星街彗星', 
			xinghejianduei_ban: '星河舰队',
			xinghejianduei_ban_info: '暂无',
			xingyongzange: '星咏赞歌', 
			xingyongzange_info: '暂无',

			conqueror: '征服者', 
			dunji: '盾击',
			dunji_buff: '盾击命中',
			dunji_info: '出牌阶段限一次，弃置一名其它角色一张手牌，若不是闪，则本回合他不能使用或打出闪，且受到你的伤害后需弃置一张手牌',
			kongtizhemo: '空体折磨',
			kongtizhemo_info: '你的回合内，当一名其它角色失去最后一张手牌时，你摸一张牌；当你对一名没有手牌的角色造成伤害时，你摸一张牌',

			hongyouchaoshou: '红油抄手',
			wangzhedating: '亡者大厅',
			wangzhedating_info: '锁定技，你使用或打出的牌结算后将进入弃牌堆时，你的弃牌将进入弃牌堆时，你将其置于牌堆顶；你的摸牌改为从弃牌堆获得第一张牌',
			xukongkaituan: '虚空开团',
			xukongkaituan_info: '转换技，出牌阶段限一次，①指定一个花色然后亮出牌堆顶4张牌。②指定一个花色然后亮出弃牌堆顶4张牌。你获得其中花色与指定花色相同的牌，且本回合使用该花色的牌无距离次数限制。',
			yingyangjiaohuan: '阴阳交换',
			yingyangjiaohuan_info: '限定技，你将你的任意张牌置入弃牌堆，然后从牌堆中获得同样数量的牌；然后重置“虚空开团”',

			highlander: '高地勇士',
			jinggongzitai: '进攻姿态',
			gong_mark: '进攻姿态',
			jinggongzitai_info: '当你未处于进攻姿态时，你造成一点伤害或于弃牌阶段弃置了至少两张牌后，你可以摸两张牌并进入进攻姿态；当你处于进攻姿态受到一点伤害后需弃置一张牌并离开进攻姿态',
			poshantiji: '破山踢击',
			poshantiji_info: '当你处于进攻姿态时，你使用杀被闪抵消或使用闪抵消杀后，你可以弃置一张牌并进行一次判定：'
				+ get.translation('heart')  + '，退出进攻姿态'
				+ get.translation('diamond') + '，若来源未翻面，来源翻面'
				+ '为黑色，来源弃置所有装备再弃置两张手牌', 
			lingqiaoshanbi: '灵巧闪避',
			lingqiaoshanbi_info: '当你处于进攻姿态时，你使用或打出一张闪后可以摸一张牌',

			SuzukaUtako2: '2号铃鹿诗子',
			jiuhao: '酒豪',
			jiuhao_info: '每当你使用或打出一张杀时，可以将一张红色牌放于你武将上，称之为“醇”（最多三张）。每当你需要使用或打出一张酒时，你可以弃置一张醇视为使用或打出。',
			shizhangmengyan: '诗瘴梦魇',
			shizhangmengyan_info: '当你成为黑色牌的目标时，你弃置一张牌，视为对黑牌使用者使用一张杀，若此杀被抵消，取消你于该黑色牌的目标。',
			fuzhe: '腐者',
			fuzhe_info: '其他角色对自己以外的同性别角色造成伤害，若因本次伤害进入濒死状态时你可以立即摸一张牌，若因此伤害导致角色阵亡你可以再摸两张牌。',
		},
	};
});
