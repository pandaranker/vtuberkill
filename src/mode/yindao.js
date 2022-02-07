'use strict';

const { event, player } = require("../../game/src/game/lib_element");

game.import('mode', function (lib, game, ui, get, ai, _status) {
	return {
		name: 'yindao',
		changbanCharacter: [],
		yindaoPile: [
			['spade', 5, 'sha'],
			['spade', 7, 'sha'],
			['spade', 8, 'sha'],
			['spade', 10, 'sha'],
			['heart', 10, 'sha'],
			['heart', 11, 'sha'],
			['club', 4, 'sha'],
			['club', 5, 'sha'],
			['club', 6, 'sha'],
			['club', 8, 'sha'],
			['club', 9, 'sha'],
			['club', 10, 'sha'],
			['club', 11, 'sha'],
			['diamond', 6, 'sha'],
			['diamond', 9, 'sha'],
			['diamond', 11, 'sha'],
			['heart', 2, 'shan'],
			['heart', 5, 'shan'],
			['diamond', 2, 'shan'],
			['diamond', 3, 'shan'],
			['diamond', 7, 'shan'],
			['diamond', 8, 'shan'],
			['diamond', 10, 'shan'],
			['diamond', 11, 'shan'],
			['heart', 3, 'tao'],
			['heart', 4, 'tao'],
			['heart', 9, 'tao'],
			['diamond', 12, 'tao'],
			['club', 12, 'bingliang'],
			['spade', 3, 'guohe'],
			['diamond', 12, 'guohe'],
			['club', 3, 'guohe'],
			['club', 1, 'juedou'],
			['spade', 1, 'juedou'],
			['heart', 6, 'lebu'],
			['spade', 1, 'nanman'],
			['club', 7, 'shuiyanqijunx'],
			['spade', 4, 'shunshou'],
			['spade', 11, 'shunshou'],
			['diamond', 4, 'shunshou'],
			['heart', 1, 'wanjian'],
			['heart', 5, 'wuxie'],
			['club', 5, 'wuxie'],
			['heart', 7, 'wuzhong'],
			['heart', 8, 'wuzhong'],
			['diamond', 5, 'guanshi'],
			['spade', 9, 'hanbing'],
			['spade', 6, 'qinggang'],
			['spade', 12, 'zhangba'],
			['diamond', 1, 'zhuge'],
			['spade', 2, 'bagua'],
			['club', 2, 'renwang'],
		],
		characterSingle: {},
		startBefore() {
			_status.mode = 'yindao';
			for (var i in lib.characterSingle) {
				lib.character[i] = lib.characterSingle[i];
				if (!lib.character[i][4]) {
					lib.character[i][4] = [];
				}
			}
			for (var j in lib.yindaoTranslate) lib.translate[j] = lib.yindaoTranslate[j];
			if (!lib.yindao) lib.yindao = {
				completeNumber: 0,
				addFellow(name) {
					game.filterPlayer(cur => {
						if (cur !== game.me) cur.dataset.position++
					})
					ui.arena.setNumber(game.countPlayer2() + 1);
					game.fellow = game.addFellow(1, name);
					// game.fellow.gain(get.cards(4));
					game.fellow.identity = 'fan';
					game.fellow.setIdentity();
					game.fellow.identityShown = true;
					game.fellow.node.identity.classList.remove('guessing');
					_status.event.getParent('phaseLoop').player = game.fellow;
				},
			}
		},
		start() {
			'step 0'
			_status.yindao = true;
			var playback = localStorage.getItem(lib.configprefix + 'playback');
			if (playback) {
				event.finish();
			}
			else if (!_status.connectMode) {
				game.prepareArena(2);
			}
			'step 1'
			_status.mode = 'yindao';
			lib.card.list = lib.yindaoPile.slice(0);
			'step 2'
			for (var i = 0; i < game.players.length; i++) {
				game.players[i].getId();
			}
			game.changeCharacter0();
			'step 3'
			game.syncState();

			var players = get.players(lib.sort.position);
			var info = [];
			for (var i = 0; i < players.length; i++) {
				info.push({
					name: players[i].name1,
					name2: players[i].name2,
					identity: players[i].identity
				});
			}
			_status.videoInited = true;
			game.addVideo('init', null, info);
			'step 4'
			event.player = game.me;
			event.trigger('gameStart');
			'step 5'
			if (_status.reYindao) {
				event.goto(4);
			}
			game.delay(3);
			'step 6'
			game.over();
		},
		game: {
			getVideoName() {
				var str = get.translation(game.me.name);
				if (game.me.name2) {
					str += '/' + get.translation(game.me.name2);
				}
				var name = [
					str,
					'引导' + ' - ' + lib.translate[game.me.identity + '2']
				];
				return name;
			},
			showIdentity() { },
			checkResult() {
				game.over((game.me._trueMe || game.me).isAlive());
			},
			checkOnlineResult(player) {
				return game.me.isAlive();
			},
			changeCharacter0() {
				var next = game.createEvent('changeCharacter', false);
				next.setContent(function () {
					'step 0'
					var map = ['zhu', 'fan'];
					game.me.identity = map[0];
					game.me.next.identity = map[1];
					game.me.showIdentity();
					game.me.next.showIdentity();
					'step 1'
					game.me.init('Kino');
					game.me.next.init('shanbao');
					'step 2'
					lib.init.onfree();
				});
			},
		},
		element: {
			player: {
				hasZhuSkill() { return false; },
				dieAfter() {
					game.checkResult();
				},
				logAi(targets, card) { },
				showIdentity() {
					game.broadcastAll(function (player, identity) {
						player.identity = identity;
						game[identity] = player;
						player.side = identity == 'zhu';
						player.node.identity.classList.remove('guessing');
						player.identityShown = true;
						player.ai.shown = 1;
						player.setIdentity();
						if (player.identity == 'zhu') {
							player.isZhu = true;
						}
						if (_status.clickingidentity) {
							for (var i = 0; i < _status.clickingidentity[1].length; i++) {
								_status.clickingidentity[1][i].delete();
								_status.clickingidentity[1][i].style.transform = '';
							}
							delete _status.clickingidentity;
						}
					}, this, this.identity);
				}
			}
		},
		get: {
			attitude(from, to) {
				if (from.identity == to.identity) return 10;
				return -10;
			},
		},
		skill: {
			_yindaoA: {
				trigger: { player: 'gameStart' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					if (!game.shanbao) {
						game.shanbao = game.me.next
						game.filterPlayer(function (cur) {
							cur.addTempSkill('fengyin')
						})
					}
					if (!_status.reYindao) {
						ui.auto.hide();
						galgame.sce("yindaoA0");
					}
					else {
						_status.reYindao = false;
						galgame.sce("yindaoA1");
					}
					'step 1'
					if (!game.dusong) {
						lib.yindao.addFellow('dusongziGin')
						game.dusong = game.me.next
						game.dusong.addTempSkill('fengyin')
					}
					'step 2'
					switch (result.bool) {
						case '纯路人，什么是三国杀？': {
							galgame.sce("yindaoB");
						}
						case '听说过，也玩过类似的桌游': {
							galgame.sce("yindaoC");
							_status.oneYindao = true;
							break;
						}
						case '只接触过原版的三国杀': {
							galgame.sce("yindaoD");
							break;
						}
						case '游戏规则我都懂，教教我怎么进行游戏配置吧': {
							_status.reYindao = true
							event.trigger('yindaoE');
							event.goto(0)
							break;
						}
						case '进阶教程什么的有在做嘛？': {
							_status.reYindao = true
							galgame.sce("yindaoMaking")
							event.goto(0)
							break;
						}
						case '跳过引导': {
							event.goto(6)
							break;
						}
					}
					'step 3'
					if (_status.oneYindao) {
						event.trigger('yindaoCard');
					}
					'step 4'
					if (_status.oneYindao) {
						event.trigger('yindaoSkill');
					}
					'step 5'
					event.trigger('yindaoF');
					'step 6'
					galgame.sce("over");
					'step 7'
					switch (result.bool) {
						case '再引导一次': { _status.reYindao = true; break; }
						case '进入身份模式': {
							game.saveConfig('mode', 'identity');
							game.reload(); break;
						}
						case '进入国战模式': {
							game.saveConfig('mode', 'guozhan');
							game.reload(); break;
						}
					}
				},
			},
			_yindaoCard: {
				trigger: { player: 'yindaoCard' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					Evt.clear = () => {
						game.filterPlayer(function (cur) {
							cur.recover(4);
							if(cur.countCards('hej')) cur.lose(cur.getCards('hej'), ui.special);
						})
					}
					Evt.clear()
					player.gain(game.createCard('sha'), 'gain2');
					game.delay(1.5);
					'step 1'
					galgame.sce("yindaoCard1");
					'step 2'
					if (result.bool == '跳过这个部分') {
						event.goto(6);
					}
					else {
						player.chooseToUse({
							prompt: '###选择手牌中的【杀】，再选择〖扇宝〗，就可以使用出这张【杀】###（一张牌被使用后就会离开手牌区）',
							filterCard(card, player) {
								return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
							},
							addCount: false,
							forced: true,
						});
					}
					'step 3'
					player.gain(game.createCard('shan'), 'gain2');
					game.dusong.gain(game.createCard('sha'), 'gain2');
					game.delay(1.5);
					'step 4'
					galgame.sce("yindaoCard2");
					'step 5'
					game.dusong.chooseToUse({
						filterCard(card, player) {
							return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
						},
						addCount: false,
						forced: true,
					});
					'step 6'
					Evt.clear()
					'step 7'
					var dialog = ui.create.dialog('forcebutton');
					dialog.add('基本牌');
					dialog.addSmall([['sha', 'shan', 'tao'], 'vcard']);
					dialog.add('锦囊牌');
					dialog.addSmall([['wuzhong', 'shunshou', 'lebu'], 'vcard']);
					dialog.add('装备牌');
					dialog.addSmall([['zhuge', 'renwang', 'muniu'], 'vcard']);
					event.dialog = dialog;
					game.delay();
					'step 8'
					galgame.sce("yindaoCard3");
					'step 9'
					Evt.clear()
					event.dialog.close();
					galgame.sce("yindaoCardIndex");
					'step 10'
					switch (result.bool) {
						case '装备牌的分类与使用':
							player.gain(game.createCard('guding'), 'gain2');
							player.gain(game.createCard('sha'), 'gain2');
							event.going = 1; break;
						case '通常锦囊牌的使用':
							player.gain(game.createCard('wuzhong'), 'gain2');
							game.dusong.gain(game.createCard('shan'), 'gain2');
							event.going = 2; break;
						case '回合与阶段':
							var dialog = ui.create.dialog('forcebutton');
							dialog.add('每个回合会按阶段进行<br>');
							dialog.add('回合开始');
							dialog.addSmall([lib.phaseName.slice(0,1), 'vcard']);
							dialog.add('回合进行');
							dialog.addSmall([lib.phaseName.slice(1,lib.phaseName.length-1), 'vcard']);
							dialog.add('回合结束');
							dialog.addSmall([[lib.phaseName[lib.phaseName.length-1]], 'vcard']);
							event.going = 3; break;
						case '判定与延时锦囊牌的使用':
							player.gain(game.createCard('lebu'), 'gain2');
							event.going = 4; break;
						case '卡牌的「使用」与「打出」':
							player.gain(game.createCard('juedou'), 'gain2');
							game.dusong.gain(game.createCard('sha'), 'gain2');
							player.gain(game.createCard('sha'), 'gain2');
							event.going = 5; break;
						case '无懈可击！':
							player.gain(game.createCard('juedou'), 'gain2');
							game.dusong.gain(game.createCard('wuxie'), 'gain2');
							player.gain(game.createCard('wuxie'), 'gain2');
							event.going = 6; break;
						case '跳过这个部分':
							event.going = 'skip'; break;
					}
					game.delay(1.5);
					'step 11'
					switch (event.going) {
						case 1:
							player.chooseToUse({
								prompt: '###试试点击手牌中的装备牌来使用它<br>右键点击也可以查看详细信息###（一般的装备牌都是默认使用者为目标，所以没有指定的过程）',
								filterCard(card, player) {
									return get.type(card) == 'equip' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 1; break;
						case 2:
							player.chooseToUse({
								prompt: '###来试试使用手牌中的锦囊【无中生有】吧###（锦囊牌的效果千奇百怪，【无中生有】的效果是摸两张牌）',
								filterCard(card, player) {
									return get.type(card) == 'trick' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 2; break;
						case 3:
							galgame.sce("yindaoCard33");
							event.going = 3; break;
						case 4:
							galgame.sce("yindaoCard34");
							event.going = 4; break;
						case 5:
							player.chooseToUse({
								prompt: '###来试试使用手牌中的锦囊【决斗】吧###锦囊【决斗】的效果是让对方打出一张【杀】<br>（“打出”不同于“使用”，只是单纯的声明一张牌，然后将其置入弃牌堆，这个过程没有目标没有效果，但是否完成“打出”这一动作会影响卡牌或技能的效果）',
								filterCard(card, player) {
									return get.type(card) == 'trick' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 5; break;
						case 6:
							player.chooseToUse({
								prompt: '###锦囊【无懈可击】并不能直接使用，而是在一些合适的时机去使用它###（试试使用手牌中除了【无懈可击】的锦囊牌叭）',
								filterCard(card, player) {
									return get.type(card) == 'trick' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 6; break;
						case 'skip':
							event.finish(); break;
					}
					game.delay(0.5);
					'step 12'
					switch (event.going) {
						case 1:
							player.chooseToUse({
								prompt: '###因为你装备了武器【军刀】，所以你的能力获得了强化，现在再对扇宝使用【杀】试试叭~###（【军刀】的效果是：当你使用【杀】对目标角色造成伤害时，若其没有手牌，此伤害+1）',
								filterCard(card, player) {
									return get.type(card) == 'basic' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 1; break;
						case 2:
							player.chooseToUse({
								prompt: '###来试试使用手牌中的锦囊牌【过河拆桥】吧###（【过河拆桥】的效果是弃置目标一张牌，用它来瓦解敌人的防御吧！）',
								filterCard(card, player) {
									return get.type(card) == 'trick' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 2; break;
						case 3:
							event.going = 3; break;
						case 4:
							player.chooseToUse({
								prompt: '###来试试使用手牌中的延时锦囊牌【乐不思蜀】吧###（【乐不思蜀】的效果是跳过出牌阶段，并且只有在判定结果不为♥时才会生效）',
								filterCard(card, player) {
									return get.type(card) == 'delay' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 4; break;
						case 5:
							event.going = 5; break;
						case 6:
							event.going = 6; break;
						case 'skip':
							event.finish(); break;
					}
					game.delay(0.5);
					'step 13'
					switch (event.going) {
						case 1:
							player.gain(game.createCard('bagua'), 'gain2');
							game.dusong.gain(game.createCard('sha'), 'gain2');
							event.going = 1; break;
						case 2:
							galgame.sce("yindaoCard42");
							event.going = 2; break;
						case 3:
							event.going = 3; break;
						case 4:
							event.going = 4; break;
						case 5:
							event.going = 5; break;
						case 6:
							event.going = 6; break;
						case 'skip':
							event.finish(); break;
					}
					game.delay(0.5);
					'step 14'
					switch (event.going) {
						case 1:
							player.chooseToUse({
								prompt: '###与倾向攻击的武器类装备相对，还有倾向防御的防具类装备，来试试使用手牌中的防具【宣传战】吧###（值得一提的是，每种类型的装备同时只能装备一个）',
								filterCard(card, player) {
									return get.type(card) == 'equip' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 1; break;
						case 2:
							game.shanbao.gain(game.createCard('shan'), 'gain2');
							event.going = 2; break;
						case 3:
							event.going = 3; break;
						case 4:
							event.going = 4; break;
						case 5:
							event.going = 5; break;
						case 6:
							event.going = 6; break;
						case 'skip':
							event.finish(); break;
					}
					game.delay(0.5);
					'step 15'
					switch (event.going) {
						case 1:
							game.dusong.chooseToUse({
								filterCard(card, player) {
									return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 1; break;
						case 2:
							player.chooseToUse({
								prompt: '###来试试有效的使用手牌吧~###（杜松子手中的【闪】已被弃置了，已经没有手段阻止【杀】了）',
								filterCard(card, player) {
									return get.type(card) == 'basic' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							});
							event.going = 2; break;
						case 3:
							event.going = 3; break;
						case 4:
							event.going = 4; break;
						case 5:
							event.going = 5; break;
						case 6:
							event.going = 6; break;
						case 'skip':
							event.finish(); break;
					}
					game.delay(0.5);
					'step 16'
					switch (event.going) {
						case 1: case 2: case 3: case 4: case 5: case 6:
							game.delay(0.5);
							event.goto(9); break;
						case 'skip':
							event.finish(); break;
					}
				},
			},
			//游戏配置讲解
			_yindaoE: {
				trigger: { player: 'yindaoE' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					Evt.clear = function () {
						while (ui.controls.length) ui.controls[0].close();
					};
					galgame.sce("yindaoE0");
					Evt.clear();
					ui.create.control('使用移动布局', function () {
						if (lib.config.phonelayout) {
							ui.control.firstChild.firstChild.innerHTML = '使用移动布局';
							game.saveConfig('phonelayout', false);
							lib.init.layout('mobile');
						}
						else {
							ui.control.firstChild.firstChild.innerHTML = '使用默认布局';
							game.saveConfig('phonelayout', true);
							lib.init.layout('mobile');
						}
					});
					ui.create.control('继续', game.resume);
					'step 1'
					game.pause();
					'step 2'
					if (lib.config.touchscreen) {
						Evt.clear();
						galgame.sce("yindaoE1");
						ui.create.control('继续', game.resume);
					}
					'step 3'
					if (lib.config.touchscreen) {
						game.pause();
					}
					'step 4'
					Evt.clear();
					'step 5'
					event.trigger('yindaoEplus')
					'step 6'
					Evt.clear()
					lib.cheat.e()
					player.draw(3)
					game.shanbao.useCard(game.createCard('zhangba'), game.shanbao)
					game.shanbao.useCard(game.createCard('jueying'), game.shanbao)
					game.shanbao.draw(2)
					game.dusong.useCard(game.createCard('zixin'), game.dusong)
					game.dusong.draw(4)
					game.shanbao.useCard(game.createCard('lebu'), game.dusong)
					'step 7'
					galgame.sce("yindaoE3");
					'step 8'
					let map = {
						'旧版': 'default',
						'默认（初始样式）': 'mobile',
						'宽屏': 'long',
						'手杀': 'long2',
						'新版': 'nova',
					}
					if (map[result.bool]) {
						lib.init.layout(map[result.bool])
						game.delay(6)
						Evt.goto(7)
					}
				}
			},
			//菜单信息
			_yindaoEplus: {
				trigger: { player: 'yindaoEplus' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					ui.arena.classList.add('only_dialog');
					Evt.clear = () => {
						while (ui.controls.length) ui.controls[0].close();
					};
					Evt.clear2 = () => {
						ui.click.configMenu();
						ui.window.classList.remove('noclick_important');
						ui.control.classList.remove('noclick_click_important');
						ui.control.style.top = '';
						_status.event.finish()
						ui.arena.classList.remove('only_dialog');
					}
					ui.window.classList.add('noclick_important');
					ui.click.configMenu();
					ui.control.classList.add('noclick_click_important');
					ui.control.style.top = 'calc(100% - 105px)';
					ui.create.control('继续', game.resume);
					ui.create.control('跳过关于菜单的介绍', () => {
						game.resume()
						Evt.clear2()
						game.resume()
					});
					galgame.sce("yindaoE20");
					'step 1'
					game.pause();
					'step 2'
					Evt.clear();
					ui.click.menuTab('选项');
					galgame.sce("yindaoE21");
					'step 3'
					ui.click.menuTab('武将');
					galgame.sce("yindaoE22");
					'step 4'
					ui.click.menuTab('卡牌');
					galgame.sce("yindaoE23");
					'step 5'
					ui.click.menuTab('开始');
					galgame.sce("yindaoE24");
					'step 6'
					ui.create.control('继续', game.resume);
					game.pause();
					'step 7'
					Evt.clear();
					ui.click.menuTab('其它');
					galgame.sce("yindaoE25");
					'step 8'
					Evt.clear2()
					ui.create.control('继续介绍其他项目', game.resume);
					game.pause();
				}
			},
			//细致的规则讲解
			_yindaoF: {
				trigger: { player: 'yindaoF' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					game.filterPlayer(function (cur) {
						cur.recover(4);
						cur.link(false)
						if(cur.countCards('hej')) cur.lose(cur.getCards('hej'), ui.special);
					})
					galgame.sce("yindaoF0");
					'step 1'
					galgame.sce("yindaoFIndex");
					'step 2'
					switch (result.bool) {
						case '三国杀机制：转换技':
							galgame.sce("yindaoNewSkill0")
							event.going = 1; break;
						case '无名杀机制：护甲':
							event.going = 2; break;
						case 'V杀新增机制：海洋与暗影':
							event.going = 3; break;
						case '讲讲V杀游戏配置吧':
							event.trigger('yindaoE')
							event.going = 4; break;
						case '跳过这个部分':
							event.going = 'skip'; break;
					}
					game.delay(1.5);
					'step 3'
					switch (event.going) {
						case 1:
							switch (result.bool) {
								case '跟随<span class=\"aqua\">樋口枫</span>学习转换技）':
									event.going = 1; break;
								case '好的哦~（跟随<span class=\"orange\">乃琳</span>学习转换技）':
									event.going = 1; break;
								case '可是转换技我本来就懂啊（“阿瞒……”）':
									galgame.sce("yindaoNewSkill1"); break;
							}
							event.going = 1; break;
						case 2:
							game.shanbao.changeHujia()
							player.gain(game.createCard('sha'), 'gain2');
							event.going = 2; break;
						case 3:
							event.going = 3; break;
						case 'skip':
							event.finish(); break;
					}
					'step 4'
					switch (event.going) {
						case 1:
							galgame.sce("yindaoMaking"); break;
						case 2:
							player.chooseToUse({
								prompt: '###来试试有效的使用手牌吧~###（无甲角色受到的都是实实在在的真实伤害）',
								filterCard(card, player) {
									return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
								},
								addCount: false,
								forced: true,
							}); break;
						case 3:
							event.trigger('yindaoFplus')
							break;
						case 4: case 5: case 6:
						case 'skip':
							event.finish(); break;
					}
					'step 5'
					switch (event.going) {
						case 1: case 2: case 3: case 4: case 5: case 6:
							event.goto(1); break;
						case 'skip':
							event.finish(); break;
					}
				},
			},
			//海洋和暗影属性
			_yindaoFplus: {
				trigger: { player: 'yindaoFplus' },
				silent: true,
				popup: false,
				filter(event, player) {
					return true;
				},
				content() {
					'step 0'
					Evt.clear = function () {
						game.filterPlayer(function (cur) {
							cur.recover(4);
							cur.link(false)
							if(cur.countCards('hej')) cur.lose(cur.getCards('hej'), ui.special);
						})
						while (ui.controls.length) ui.controls[0].close();
					};
					Evt.clear()
					game.shanbao.changeHujia()
					game.shanbao.link()
					game.dusong.link()
					player.gain(game.createCard({ name: 'sha', nature: 'ocean' }), 'gain2');
					player.gain(game.createCard({ name: 'sha', nature: 'fire' }), 'gain2');
					'step 1'
					player.chooseToUse({
						prompt: '###来试试有效的使用手牌吧~###海洋属性的杀会造成海洋属性伤害，对护甲有特攻效果哦（但是触发特攻效果时伤害不会引爆铁索）',
						filterCard(card, player) {
							return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
						},
						addCount: false,
						forced: true,
					})
					'step 2'
					ui.create.control('下一个', game.resume);
					ui.create.control('再来一遍', () => {
						game.resume()
						Evt.goto(0)
						game.resume()
					});
					game.pause()
					'step 3'
					Evt.clear()
					game.shanbao.draw(3)
					game.shanbao.gain(game.createCard('shan'), 'gain2')
					game.dusong.gain(game.createCard('shan'), 'gain2')
					player.gain(game.createCard({ name: 'sha', nature: 'yami' }), 'gain2');
					player.gain(game.createCard('sha'), 'gain2');
					'step 4'
					player.chooseToUse({
						prompt: '###来试试有效的使用手牌吧~###暗影属性的杀会造成暗影属性伤害，可以强制命中手牌多于你的角色！（但是触发强制命中时伤害不会引爆铁索）',
						filterCard(card, player) {
							return card.name == 'sha' && lib.filter.filterCard.apply(this, arguments);
						},
						addCount: false,
						forced: true,
					})
					'step 5'
					ui.create.control('结束', game.resume);
					ui.create.control('再来一遍', () => {
						game.resume()
						Evt.goto(3)
						game.resume()
					});
					game.pause()
					'step 6'
					Evt.clear()
					game.delay(2)
				},
			},
			_yindaoWuxie: {
				trigger: { global: 'wuxieAfter' },
				silent: true,
				popup: false,
				filter(event, player) {
					return player == game.me && !player.$.studyWuxie;
				},
				content() {
					'step 0'
					player.$.studyWuxie = true;
					galgame.sce("yindaoWuxie");
				},
			},
			_yindaoRespond: {
				trigger: { global: 'chooseToRespond' },
				silent: true,
				popup: false,
				filter(event, player) {
					return player == game.me && !player.$.studyRespond;
				},
				content() {
					'step 0'
					player.$.studyRespond = true;
				},
			},
			_yindaDraw: {
				trigger: { global: 'drawBegin' },
				silent: true,
				popup: false,
				filter(event, player) {
					return player == game.me;
				},
				content() {
					'step 0'
					var list = []
					var evt = trigger.getParent('_yindaoCard');
					if (evt && evt.name == '_yindaoCard') {
						if (evt.going == 2)
							list = [game.createCard('guohe'), game.createCard('sha')]
					}
					while (list.length) {
						ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
					}
				},
			},
		},
		yindaoTranslate: {
			zhu: "先",
			fan: "后",
			zhu2: "先手",
			fan2: "后手",
		},
	};
});
