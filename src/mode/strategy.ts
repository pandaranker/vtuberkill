/// <reference path = "../built-in.d.ts" />
import situate from './strategy_situate'
window.game.import('mode', function (lib, game, ui, get, ai, _status) {
	return {
		name: 'strategy',
		characterPack: {
			STG: {
				/**向晚 */
				Ava: ['female', 'asoul', 4, ['yiqu', 'wanxian'], ['guoV']],
				/**贝拉 */
				Bella: ['female', 'asoul', '3/4', ['aswusheng', 'gunxun'], ['guoV']],
				/**珈乐 */
				Carol: ['female', 'asoul', 4, ['shixi', 'xueta', 'yuezhi'], ['guoV']],
				/**嘉然 */
				Diana: ['female', 'asoul', 4, ['quanyu', 'wulian'], ['guoV']],
				/**乃琳 */
				EQueen: ['female', 'asoul', 4, ['yehua', 'fengqing'], ['guoV']],
			},
			drama: {
				testDrama: ['none', '', 1, ['Date:2X21'], ['Date:2X21.1', 'unseen'], '2X21.1']
			}
		},
		cardPack: {
			STG: [],
			recommendGroups: [
				'group_VirtuaReal',
				'group_asoul',
				'group_psp',
				'group_xuyan',
				'group_Providence',
			],
			groups: [
				'group_VirtuaReal',
				'group_psp',
				'group_asoul',
				'group_chaos',
				'group_xuyan',
				'group_xuefeng',
				'group_Providence',
				'group_HappyEl',
				'group_RedC',
			]
		},
		start: function () {
			"step 0"
			var playback = localStorage.getItem(lib.configprefix + 'playback');
			if (playback) {
				Evt.finish();
				return;
			}
			_status.drama = {}
			lib.character = lib.characterPack.STG
			for (var i in lib.character) {
				if (!lib.character[i][4]) {
					lib.character[i][4] = [];
				}
			}
			for (var i in lib.skill) {
				if (lib.skill[i].changeSeat) {
					lib.skill[i] = {};
					if (lib.translate[i + '_info']) {
						lib.translate[i + '_info'] = '此模式下不可用';
					}
				}
			}
			if(ui.auto){
				ui.auto.style.display = 'none';
				ui.sortCard.style.display = 'none';
			}
			lib.translate.restart = '返回';
			ui.STG_start = lib.init.css(`${lib.assetURL}layout/mode`, 'strategy1');
			game.delay(0.1);
			lib.skill = {
				...lib.skill,
				'Date:2X21': {},
			}
			lib.translate = {
				...lib.translate,
				testDrama: '新游戏',
				'Date:2X21': '筚路蓝缕',
				'Date:2X21_info': `公元2021年初，冲蝗的号角不再响彻、鲸落的潮水也逐渐退去，
				在摇摇欲坠的新科帝国治下，国V大陆一时间进入群雄割据、豪强并起、勃勃生机万物竞发的局面。<br>
				新人的登场、老人的离去，国V大陆自古没有永恒的主，只有一轮又一轮的版本更新换代。然而，这份“传统”真的会延续下去吗？`,
			}
			"step 1"
			var bosslist = ui.create.div('#bosslist.hidden');
			Evt.bosslist = bosslist;
			_status.drama.bosslist = bosslist;
			lib.setScroll(bosslist);
			if (!lib.config.touchscreen && lib.config.mousewheel) {
				bosslist._scrollspeed = 30;
				bosslist._scrollnum = 10;
				bosslist.onmousewheel = ui.click.mousewheel;
			}
			var onpause = function () {
				ui.window.classList.add('bosspaused');
			}
			var onresume = function () {
				ui.window.classList.remove('bosspaused');
			}
			game.onpause = onpause;
			game.onpause2 = onpause;
			game.onresume = onresume;
			game.onresume2 = onresume;
			ui.create.div(bosslist);

			Evt.currentDrama = null;
			for (let i in lib.characterPack.drama) {
				let info = lib.characterPack.drama[i];
				let player = ui.create.player(bosslist).init(i);
				console.log(player)
				player.node.hp.classList.add('text');
				player.node.hp.dataset.condition = '';
				player.node.hp.style.left = 'auto';
				player.node.hp.innerHTML = info[5];
				player.setIdentity(player.name);
				player.node.identity.dataset.color = 'qun';
				player.classList.add('bossplayer');

				if (lib.storage.currentDrama == i) {
					Evt.currentDrama = player;
					player.classList.add('highlight');
					if (!lib.config.continue_name_boss && lib.drama[i] && lib.drama[i].control) {
						_status.dramaChoice = lib.drama[i].control();
						_status.dramaChoice.name = i;
						_status.dramaChoice.link = lib.drama[i].controlid || i;
					}
				}
			}
			if (!Evt.currentDrama) {
				Evt.currentDrama = bosslist.childNodes[1];
				Evt.currentDrama.classList.add('highlight');
			}
			ui.create.div(bosslist);
			ui.create.cardsAsync();
			game.finishCards();
			game.addGlobalSkill('autoswap');
			ui.arena.setNumber(8);
			ui.control.style.transitionProperty = 'opacity';
			ui.control.classList.add('bosslist');
			setTimeout(function () {
				ui.control.style.transitionProperty = '';
			}, 1000);

			ui.window.appendChild(bosslist);

			setTimeout(function () {
				if (Evt.currentDrama) {
					var left = Evt.currentDrama.offsetLeft - (ui.window.offsetWidth - 180) / 2;
					if (bosslist.scrollLeft < left) {
						bosslist.scrollLeft = left;
					}
				}
				bosslist.show();
			}, 200);
			game.me = ui.create.player();
			if (lib.config.continue_name_boss) {
				Evt.noslide = true;
				lib.init.onfree();
			}
			else {
				game.chooseCharacter(function (target) {
					if (Evt.currentDrama) {
						Evt.currentDrama.classList.remove('highlight');
					}
					Evt.currentDrama = target;
					game.save('currentDrama', target.name);
					target.classList.add('highlight');
					if (_status.dramaChoice) {
						var name = target.name;
						if (lib.drama[target.name] && lib.drama[target.name].controlid) {
							name = lib.drama[target.name].controlid;
						}
						if (_status.dramaChoice.link != name) {
							lib.drama[_status.dramaChoice.name].control('cancel', _status.dramaChoice);
							_status.dramaChoice.classList.remove('disabled');
							_status.dramaChoice.close();
							delete _status.dramaChoice;
						}
						else {
							return;
						}
					}
					if (lib.drama[target.name] && lib.drama[target.name].control) {
						_status.createControl = ui.control.firstChild;
						_status.dramaChoice = lib.drama[target.name].control();
						_status.dramaChoice.name = target.name;
						_status.dramaChoice.link = lib.drama[target.name].controlid || target.name;
						if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
							_status.dramaChoice.classList.add('disabled');
						}
						delete _status.createControl;
					}
				});
			}
			if (lib.config.test_game) {
				Evt.currentDrama.classList.remove('highlight');
				if (Evt.currentDrama.nextSibling && Evt.currentDrama.nextSibling.classList.contains('player')) {
					Evt.currentDrama = Evt.currentDrama.nextSibling;
				}
				else {
					Evt.currentDrama = Evt.currentDrama.parentNode.childNodes[1];
				}
				game.save('currentDrama', Evt.currentDrama.name);
			}
			"step 2"
			game.bossinfo = lib.drama.global;
			for (var i in lib.drama[Evt.currentDrama.name]) {
				game.bossinfo[i] = lib.drama[Evt.currentDrama.name][i];
			}

			setTimeout(function () {
				ui.control.classList.remove('bosslist');
			}, 500);
			var boss = ui.create.player();
			boss.getId();
			game.boss = boss;
			boss.init(Evt.currentDrama.name);
			boss.side = true;
			if (!Evt.noslide) {
				var rect = Evt.currentDrama.getBoundingClientRect();
				boss.animate('bossing');
				boss.node.hp.animate('start');
				boss.bossinginfo = [rect.left + rect.width / 2, rect.top + rect.height / 2];
				boss.style.transition = 'all 0s';
				boss.node.equips.style.opacity = '0';
			}
			else {
				boss.animate('start');
			}
			boss.setIdentity('zhu');
			boss.identity = 'zhu';
			if (lib.config.continue_name_boss) {
				result = lib.config.continue_name_boss;
				game.saveConfig('continue_name_boss');
			}
			for (let i = 0; i < result.links.length; i++) {
				var player = ui.create.player();
				player.getId();
				player.init(result.links[i]).animate('start');
				player.setIdentity('cai');
				player.identity = 'cai';
				player.side = false;
				game.players.push(player);
				if (result.boss) {
					if (game.bossinfo.minion) {
						player.dataset.position = i + 3;
					}
					else {
						player.dataset.position = (i + 1) * 2;
					}
				}
				else {
					player.dataset.position = i + 1;
				}
				ui.arena.appendChild(player);//[todo player]
			}
			if (result.boss) {
				game.players.unshift(boss);
				boss.dataset.position = 0;
			}
			else {
				game.players.push(boss);
				boss.dataset.position = 7;
			}
			if (game.bossinfo.minion) {
				if (!result.boss) {
					boss.dataset.position = 6;
				}
				for (var i in game.bossinfo.minion) {
					var player = ui.create.player();
					player.getId();
					player.init(game.bossinfo.minion[i]);
					if (boss.bossinginfo) {
						player.animate('bossing');
						player.node.hp.animate('start');
						player.style.transition = 'all 0s';
					}
					else {
						player.animate('start');
					}
					player.setIdentity('zhong');
					player.identity = 'zhong';
					player.side = true;
					game.players.push(player);
					var num = parseInt(i);
					if (result.boss) {
						player.dataset.position = num - 1;
					}
					else {
						if (num == 2) {
							player.dataset.position = 7;
						}
						else {
							player.dataset.position = num - 3;
						}
					}
					ui.arena.appendChild(player);//[todo player]
					if (boss.bossinginfo) {
						var rect = player.getBoundingClientRect();
						player.style.transform = 'translate(' + (boss.bossinginfo[0] - rect.left - rect.width / 2) + 'px,' + (boss.bossinginfo[1] - rect.top - rect.height / 2) + 'px) scale(1.1)';
						ui.refresh(player);
						player.style.transition = '';
						player.style.transform = '';
					}
				}
			}
			ui.create.me();
			ui.fakeme = ui.create.div('.fakeme.avatar', ui.me);
			if (game.me !== boss) {
				game.singleHandcard = true;
				ui.arena.classList.add('single-handcard');
				ui.window.classList.add('single-handcard');
				game.onSwapControl();

				if (lib.config.show_handcardbutton) {
					lib.setPopped(ui.create.system('手牌', null, true), function () {
						var uiintro = ui.create.dialog('hidden');

						var players = game.players.concat(game.dead);
						for (var i = 0; i < players.length; i++) {
							if (players[i].side == game.me.side && players[i] != game.me) {
								uiintro.add(get.translation(players[i]));
								var cards = players[i].getCards('h');
								if (cards.length) {
									uiintro.addSmall(cards, true);
								}
								else {
									uiintro.add('（无）');
								}
							}
						}

						return uiintro;
					}, 220);
				}
			}
			else {
				ui.fakeme.style.display = 'none';
			}
			if (game.bossinfo.chongzheng) {
				lib.setPopped(ui.create.system('重整', null, true), function () {
					var uiintro = ui.create.dialog('hidden');

					uiintro.add('重整');
					var table = ui.create.div('.bosschongzheng');

					var tr, td, added = false;
					for (var i = 0; i < game.dead.length; i++) {
						if (typeof game.dead[i].storage.boss_chongzheng !== 'number') continue;
						added = true;
						tr = ui.create.div(table);
						td = ui.create.div(tr);
						td.innerHTML = get.translation(game.dead[i]);
						td = ui.create.div(tr);
						if (game.dead[i].maxHp > 0) {
							td.innerHTML = '剩余' + (game.bossinfo.chongzheng - game.dead[i].storage.boss_chongzheng) + '回合';
						}
						else {
							td.innerHTML = '无法重整'
						}
					}

					if (!added) {
						uiintro.add('<div class="text center">（无重整角色）</div>');
						uiintro.add(ui.create.div('.placeholder.slim'))
					}
					else {
						uiintro.add(table);
					}

					return uiintro;
				}, 180);
			}
			ui.single_swap = ui.create.system('换人', function () {
				var players = get.players(game.me);
				players.remove(game.boss);
				if (players.length > 1) {
					if (ui.auto.classList.contains('hidden')) {
						game.me.popup('请稍后换人');
						return;
					}
					if (_status.event.isMine()) {
						ui.click.auto();
						setTimeout(function () {
							ui.click.auto();
						}, 500);
					}
					game.modeSwapPlayer(players[1]);
				}
			}, true);
			if (get.config('single_control') || game.me == game.boss) {
				ui.single_swap.style.display = 'none';
			}

			ui.arena.appendChild(boss);//[todo player]
			if (boss.bossinginfo) {
				var rect = boss.getBoundingClientRect();
				boss.style.transform = 'translate(' + (boss.bossinginfo[0] - rect.left - rect.width / 2) + 'px,' + (boss.bossinginfo[1] - rect.top - rect.height / 2) + 'px) scale(1.1)';
				ui.refresh(boss);
				boss.style.transition = '';
				boss.style.transform = '';
				delete boss.bossinginfo;
				setTimeout(function () {
					boss.node.equips.style.opacity = '';
				}, 500);
			}

			Evt.bosslist.delete();

			game.arrangePlayers();
			for (let i = 0; i < game.players.length; i++) {
				game.players[i].node.action.innerHTML = '行动';
			}

			let players = get.players(lib.sort.position);
			let info = [];
			for (let i = 0; i < players.length; i++) {
				info.push({
					name: players[i].name1,
					identity: players[i].identity,
					position: players[i].dataset.position
				});
			}
			_status.videoInited = true;
			game.addVideo('init', null, info);
			if (game.bossinfo.init) {
				game.bossinfo.init();
			}
			delete lib.drama;
			"step 3"
			if (get.config('single_control')) {
				for (let i = 0; i < game.players.length; i++) {
					if (game.players[i].side == game.me.side) {
						game.addRecentCharacter(game.players[i].name);
					}
				}
			}
			else {
				game.addRecentCharacter(game.me.name);
			}
			Evt.trigger('gameStart');
			game.gameDraw(game.boss, game.bossinfo.gameDraw || 4);
			game.bossPhaseLoop();
			setTimeout(function () {
				ui.updatehl();
			}, 200);
		},
		element: {
			player: {
				dieAfter: function () {
					if (this != game.boss) {
						this.$.boss_chongzheng = 0;
					}
					if (game.bossinfo.checkResult && game.bossinfo.checkResult(this) === false) {
						return;
					}
					if (this == game.boss || !game.hasPlayer(function (cur) {
						return !cur.side;
					})) {
						game.checkResult();
					}
				},
			}
		},
		card: {

		},
		init: function () {
			for (var i in lib.characterPack.mode_boss) {
				if (lib.characterPack.mode_boss[i][4].contains('hiddenboss')) continue;
				lib.mode.boss.config[i + '_boss_config'] = {
					name: get.translation(i),
					init: true,
					unfrequent: true,
				}
			}
		},
		game: {
			initMap: () => {

				if (!lib.config.touchscreen) {
					ui.chessMap.addEventListener('mousedown', function (e) {
						if (Array.isArray(e.path)) {
							for (var i = 0; i < e.path.length; i++) {
								var itemtype = get.itemtype(e.path[i]);
								if (itemtype == 'button' || itemtype == 'card' || itemtype == 'player') {
									return;
								}
							}
						}
						this._chessdrag = [e, this.parentNode.chessLeft, this.parentNode.chessTop];
					});
					ui.chessMap.addEventListener('mouseleave', function () {
						this._chessdrag = null;
					});
					ui.chessMap.addEventListener('mouseup', function () {
						if (this._chessdrag) {
							this._chessdrag = null;
						}
					});
					ui.chessMap.addEventListener('mousemove', function (e) {
						if (_status.mousedragging) return;
						if (this._chessdrag) {
							ui.dramaContainer.move(
								this._chessdrag[1] - e.x + this._chessdrag[0].x - ui.dramaContainer.chessLeft,
								this._chessdrag[2] - e.y + this._chessdrag[0].y - ui.dramaContainer.chessTop
							);
							// this.parentNode.scrollLeft=this._chessdrag[1]-e.x+this._chessdrag[0].x;
							// this.parentNode.scrollTop=this._chessdrag[2]-e.y+this._chessdrag[0].y;
							_status.clicked = true;
						}
						e.preventDefault();
					});
					ui.chessMap.addEventListener('wheel', function (e) {
						ui.dramaContainer.move(e.deltaX, e.deltaY);
						e.preventDefault();
					});
					// ui.chessContainer.addEventListener('mousewheel',function(){
					// 	if(_status.currentChessFocus){
					// 		cancelAnimationFrame(_status.currentChessFocus);
					// 		delete _status.currentChessFocus;
					// 	}
					// },{passive:true});
				}
				else {
					ui.chessMap.addEventListener('touchstart', function (e) {
						if (e.touches.length == 1) {
							this._chessdrag = [e, this.parentNode.chessLeft, this.parentNode.chessTop];
						}
					});
					ui.chessMap.addEventListener('touchend', function () {
						this._chessdrag = null;
					});
					ui.chessMap.addEventListener('touchmove', function (e) {
						if (_status.mousedragging) return;
						if (this._chessdrag && e.touches.length == 1) {
							ui.dramaContainer.move(
								this._chessdrag[1] - e.touches[0].clientX + this._chessdrag[0].touches[0].clientX - ui.dramaContainer.chessLeft,
								this._chessdrag[2] - e.touches[0].clientY + this._chessdrag[0].touches[0].clientY - ui.dramaContainer.chessTop
							);
							_status.clicked = true;
						}
						e.preventDefault();
					});
				}
			},
			reserveDead: true,
			addBossFellow: function (position, name) {
				var fellow = game.addFellow(position, name, 'zoominanim');
				fellow.directgain(get.cards(4));
				fellow.side = true;
				fellow.identity = 'zhong';
				fellow.setIdentity('zhong');
				game.addVideo('setIdentity', fellow, 'zhong');
			},
			changeBoss: function (name, player) {
				if (!player) {
					if (game.additionaldead) {
						game.additionaldead.push(game.boss);
					}
					else {
						game.additionaldead = [game.boss];
					}
					player = game.boss;
					delete game.boss;
				}

				player.delete();
				game.players.remove(player);
				game.dead.remove(player);
				var boss = ui.create.player();
				boss.getId();
				boss.init(name);
				boss.side = true;
				game.addVideo('bossSwap', player, (game.boss ? '_' : '') + boss.name);
				boss.dataset.position = player.dataset.position;
				if (game.me == player) {
					game.swapControl(boss);
				}
				game.players.push(boss.animate('zoominanim'));
				game.arrangePlayers();
				if (!game.boss) {
					game.boss = boss;
					boss.setIdentity('zhu');
					boss.identity = 'zhu';
				}
				else {
					boss.setIdentity('zhong');
					boss.identity = 'zhong';
				}
				ui.arena.appendChild(boss);//[todo player]
				boss.directgain(get.cards(4));
			},
			checkResult: function () {
				if (game.boss == game.me) {
					game.over(game.boss.isAlive());
				}
				else {
					game.over(!game.boss.isAlive());
				}
			},
			getVideoName: function () {
				var str = get.translation(game.me.name);
				if (game.me.name2) {
					str += '/' + get.translation(game.me.name2);
				}
				var str2 = '挑战';
				if (game.me != game.boss) {
					str2 += ' - ' + get.translation(game.boss);
				}
				var name = [str, str2];
				return name;
			},
			bossPhaseLoop: function () {
				var next = game.createEvent('phaseLoop');
				if (game.bossinfo.loopFirst) {
					next.player = game.bossinfo.loopFirst();
				}
				else {
					next.player = game.boss;
				}
				_status.looped = true;
				next.setContent(function () {
					"step 0"
					if (player.chongzheng) {
						player.chongzheng = false;
					}
					else if (player.isDead()) {
						if (player.hp < 0) player.hp = 0;
						player.$.boss_chongzheng++;
						if (player.maxHp > 0 && game.bossinfo.chongzheng) {
							if (player.hp < player.maxHp) {
								player.hp++;
							}
							else if (player.countCards('h') < 4) {
								var card = get.cards()[0];
								var sort = lib.config.sort_card(card);
								var position = sort > 0 ? player.node.handcards1 : player.node.handcards2;
								card.fix();
								card.animate('start');
								position.insertBefore(card, position.firstChild);
							}
							player.update();
							if (player.$.boss_chongzheng >= game.bossinfo.chongzheng) {
								player.revive(player.hp);
							}
						}
						if (game.bossinfo.loopType == 2) {
							game.boss.chongzheng = true;
						}
					}
					else {
						if (player.identity == 'zhu' && game.boss != player) {
							player = game.boss;
						}
						player.phase();
					}
					"step 1"
					if (game.bossinfo.loopType == 2) {
						_status.roundStart = true;
						if (Evt.player == game.boss) {
							if (!_status.last || _status.last.nextSeat == game.boss) {
								Evt.player = game.boss.nextSeat;
							}
							else {
								Evt.player = _status.last.nextSeat;
							}
						}
						else {
							_status.last = player;
							Evt.player = game.boss;
							if (player.nextSeat == game.boss) {
								delete _status.roundStart;
							}
						}
					}
					else {
						Evt.player = Evt.player.nextSeat;
					}
					Evt.goto(0);
				});
			},
			onSwapControl: function () {
				if (game.me == game.boss) return;
				game.addVideo('onSwapControl');
				var name = game.me.name;
				if (ui.fakeme && ui.fakeme.current != name) {
					ui.fakeme.current = name;
					if (ui.versushighlight && ui.versushighlight != game.me) {
						ui.versushighlight.classList.remove('current_action');
					}
					ui.versushighlight = game.me;
					game.me.classList.add('current_action');
					// game.me.line(ui.fakeme,{opacity:0.5,dashed:true});

					ui.fakeme.style.backgroundImage = game.me.node.avatar.style.backgroundImage;
					// ui.fakeme.style.backgroundSize='cover';
				}
				ui.updatehl();
			},
			modeSwapPlayer: function (player) {
				var bool = (game.me == game.boss || player == game.boss);
				game.swapControl(player);
				game.onSwapControl();
				if (!bool) return;
				if (game.me == game.boss) {
					game.singleHandcard = false;
					ui.arena.classList.remove('single-handcard');
					ui.window.classList.remove('single-handcard');
					ui.fakeme.style.display = 'none';
					game.me.dataset.position = 0;
					game.me.nextSeat.dataset.position = 2;
					game.me.nextSeat.nextSeat.dataset.position = 4;
					game.me.nextSeat.nextSeat.nextSeat.dataset.position = 6;
				}
				else {
					game.singleHandcard = true;
					ui.arena.classList.add('single-handcard');
					ui.window.classList.add('single-handcard');
					ui.fakeme.style.display = '';
					game.boss.dataset.position = 7;
					game.boss.nextSeat.dataset.position = 1;
					game.boss.nextSeat.nextSeat.dataset.position = 2;
					game.boss.nextSeat.nextSeat.nextSeat.dataset.position = 3;
					if (game.me && game.me.node.handcards2.childNodes.length) {
						while (game.me.node.handcards2.childNodes.length) {
							game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
						}
					}
				}
			},
			chooseCharacter: function (func) {
				var next = game.createEvent('chooseCharacter', false);
				next.showConfig = true;
				next.customreplacetarget = func;
				next.ai = function (player, list) {
					if (get.config('double_character')) {
						player.init(list[0], list[1]);
					}
					else {
						player.init(list[0]);
					}
				}
				next.setContent(function () {
					"step 0"
					let list = lib.cardPack.groups.slice(0);
					Evt.list = list;
					list.randomSort();
					var dialog = ui.create.dialog('推荐势力', 'hidden');
					_status.drama.dialog = dialog
					dialog.classList.add('fixed');
					ui.window.appendChild(dialog);
					dialog.classList.add('stgcharacter');
					dialog.classList.add('modeshortcutpause');
					dialog.classList.add('withbg');
					dialog.add([lib.cardPack.recommendGroups.slice(0), 'vcard']);
					dialog.noopen = true;
					var next = game.me.chooseButton(dialog, true).set('onfree', true);
					next._triggered = null;
					next.custom.replace.target = Evt.customreplacetarget;

					var createCharacterDialog = function () {
						Evt.dialogxx = ui.create.cardDialog(v => {
							if (v.indexOf('group_') >= 0) {
								for (let i of ['wei', 'shu', 'wu', 'jin', 'western', 'key', 'vtuber', 'clubs']) {
									if (v.indexOf(i) === 6) return true
								}
								return false
							}
							return true
						});
						Evt.dialogxx.classList.add('bosscharacter');
						Evt.dialogxx.classList.add('withbg');
						Evt.dialogxx.classList.add('fixed');
						if (ui.cheat2) {
							ui.cheat2.animate('controlpressdownx', 500);
							ui.cheat2.classList.remove('disabled');
						}
					};
					if (lib.onfree) {
						lib.onfree.push(createCharacterDialog);
					}
					else {
						createCharacterDialog();
					}
					ui.create.cheat2 = function () {
						_status.createControl = ui.watchDrama;
						ui.cheat2 = ui.create.control('全部势力', function () {
							ui.cheat2.classList.toggle('glow')
							if (this.dialog == _status.event.dialog) {
								if (game.changeCoin) {
									game.changeCoin(50);
								}
								this.dialog.close();
								_status.event.dialog = this.backup;
								ui.window.appendChild(this.backup);
								_status.drama.dialog = _status.event.dialog
								delete this.backup;
								game.uncheck();
								game.check();
								if (_status.dramaChoice) {
									_status.dramaChoice.animate('controlpressdownx', 500);
									_status.dramaChoice.classList.remove('disabled');
								}
							}
							else {
								if (game.changeCoin) {
									game.changeCoin(-10);
								}
								this.backup = _status.event.dialog;
								_status.event.dialog.close();
								_status.event.dialog = _status.event.parent.dialogxx;
								this.dialog = _status.event.dialog;
								_status.drama.dialog = _status.event.dialog
								ui.window.appendChild(this.dialog);
								game.uncheck();
								game.check();
								if (_status.dramaChoice) {
									_status.dramaChoice.classList.add('disabled');
								}
							}
						});
						if (lib.onfree) {
							ui.cheat2.classList.add('disabled');
						}
						delete _status.createControl;
					}
					ui.create.cheat2();
					ui.watchDrama = ui.create.control('查看地图', function () {
						ui.watchDrama.classList.toggle('glow')
						if (lib.storage.currentDrama) {
							if (_status.drama.watch) {
								_status.drama.watch = false;
								game.showChoose()
								lib.drama[lib.storage.currentDrama].situation.hide()
								if (ui.cheat2) {
									ui.cheat2.animate('controlpressdownx', 500);
									ui.cheat2.classList.remove('disabled');
								}
							}
							else {
								_status.drama.watch = true;
								game.hideChoose()
								lib.drama[lib.storage.currentDrama].situation.show()
								if (ui.cheat2) {
									ui.cheat2.classList.add('disabled');
								}
							}
						}
					});
					"step 1"
					if (ui.cheat2) {
						ui.cheat2.close();
						delete ui.cheat2;
					}
					if (ui.watchDrama) {
						ui.watchDrama.close();
						delete ui.watchDrama;
					}
					if (_status.dramaChoice) {
						_status.dramaChoice.close();
						delete _status.dramaChoice;
					}
					if (Evt.watcher) {
						Evt.result = {
							watcher: true,
							links: Evt.enemy
						};
					}
					else {
						Evt.result = {
							watcher: false,
							links: result.links
						};
						_status.coinCoeff = get.coinCoeff(result.links);
						delete _status.drama.bosslist
					}
				});
				return next;
			},

			hideChoose: () => {
				if (_status.drama.bosslist) _status.drama.bosslist.hide()
				if (_status.drama.dialog) _status.drama.dialog.hide()
			},
			showChoose: () => {
				if (_status.drama.bosslist) _status.drama.bosslist.show()
				if (_status.drama.dialog) _status.drama.dialog.show()
			}
		},
		ui: {
			click: {
				moveContainer: function (x, y, scroll) {
					if (scroll) {
						clearTimeout(ui.dramaContainer._scrolling);
						ui.dramaContainer._scrolling = true;
						ui.chessMap.style.transition = 'transform 0.5s';
						ui.refresh(ui.chessMap);
					}
					else if (ui.dramaContainer._scrolling) {
						return;
					}
					if (typeof x === 'number') ui.dramaContainer.chessLeft += x;
					if (typeof y === 'number') ui.dramaContainer.chessTop += y;
					var xmin = 0;
					if (lib.config.show_history == 'left') {
						xmin = -50;
					}
					if (ui.dramaContainer.chessLeft < xmin) ui.dramaContainer.chessLeft = xmin;
					if (ui.dramaContainer.chessTop < 0) ui.dramaContainer.chessTop = 0;
					var xmax = ui.dramaContainer.xmax;
					var ymax = ui.dramaContainer.ymax;
					if (ui.dramaContainer.chessLeft > xmax) ui.dramaContainer.chessLeft = xmax;
					if (ui.dramaContainer.chessTop > ymax) ui.dramaContainer.chessTop = ymax;
					ui.chessMap.style.transform = 'translate(' + (-ui.dramaContainer.chessLeft) + 'px,' + (-ui.dramaContainer.chessTop) + 'px)';
					if (scroll) {
						var ending = ui.chessMap.listenTransition(function () {
							if (ui.chessMap._ending == ending) {
								clearTimeout(ui.dramaContainer._scrolling);
								delete ui.chessMap._ending;
								ui.chessMap._scrolling = setTimeout(function () {
									ui.dramaContainer._scrolling = null;
									ui.chessMap.style.transition = '';
								}, 500);
							}
						});
						ui.chessMap._ending = ending;
					}
				},
				chessInfo: function (e) {
					if (this.link.isAlive()) {
						this.link.chessFocus();
						if (this.link.classList.contains('selectable') ||
							this.link.classList.contains('selected')) {
							ui.click.target.call(this.link, e);//[todo player]
							ui.click.window.call(ui.window, e);
						}
						e.stopPropagation();
					}
				},
				playergrid: function () {
					if (!_status.paused) return;
					var pos = parseInt(this.dataset.position);
					this.link.moveTo(pos % ui.chesswidth, Math.floor(pos / ui.chesswidth));
					if (ui.movegrids) {
						while (ui.movegrids.length) {
							ui.movegrids.shift().delete();
						}
					}
					_status.event.result = {
						bool: true,
						move: this.link.dataset.position
					};
					game.resume();
				},
				obstacle: function () {
					if (_status.event.chooseObstacle && _status.paused &&
						_status.event.obstacles && _status.event.obstacles.contains(this)) {
						_status.event.obstacle = this;
						game.resume();
					}
				}
			}
		},
		drama: {
			testDrama: {
				size: [[5, 12], [27, 34]],
				situation: {
					show: () => {
						if (ui.STG_start) {
							let preUi = ui.STG_start
							ui.STG_start = lib.init.css(`${lib.assetURL}layout/mode`, 'strategy2')
							preUi.remove()
						} else {
							lib.init.css(`${lib.assetURL}layout/mode`, 'strategy2')
						}
						ui.mapContainer = ui.create.div('#map-container', ui.arena);

						ui.dramaContainer = ui.create.div('#chess-container', ui.mapContainer);
						// require('./strategy_display').rain(ui.dramaContainer.appendChild(document.createElement('canvas')))
						ui.dramaContainer.move = ui.click.moveContainer;
						ui.dramaContainer.chessLeft = 0;
						ui.dramaContainer.chessTop = 0;
						ui.chessMap = ui.create.div('#chessMap', ui.dramaContainer);
						game.initMap()
						ui.canvas2 = document.createElement('canvas');
						ui.canvas2.id = 'canvas2';
						ui.chessMap.appendChild(ui.canvas2);
						ui.ctx2 = ui.canvas2.getContext('2d');

						ui.arena.classList.add('chess');
						let size = lib.drama[lib.storage.currentDrama].size
						let width = (size[1][0] - size[0][0]) * 80
						let height = (size[1][1] - size[0][1]) * 80
						ui.canvas2.width = width
						ui.canvas2.height = height
						ui.chessMap.width = width
						ui.chessMap.height = height

						lib.situate.control.init(ui.canvas2, size, 0.06)

						ui.mapControl = ui.create.div('#map-control', ui.mapContainer)
						lib.situate.control.setMapControl(ui.mapControl)
					},
					hide: () => {
						lib.situate.control.close()
						if (ui.STG_start) {
							let preUi = ui.STG_start
							ui.STG_start = lib.init.css(`${lib.assetURL}layout/mode`, 'strategy1');
							preUi.remove()
						} else {
							lib.init.css(`${lib.assetURL}layout/mode`, 'strategy1')
						}
						ui.mapControl.delete(100, () => {
							ui.dramaContainer.delete(200, () => {
								delete ui.dramaContainer
								delete ui.chessMap
								delete ui.canvas2
								delete ui.ctx2
								ui.mapContainer.delete(200, () => {
									delete ui.mapContainer
								})
							})
						})
					}
				}
			}
		},
		situate: { ...situate },
		skill: {

		},
		translate: {
			group_VirtuaReal_info: `难易度：简单<br><br>
			百科：VirtuaReal，是にじさんじ（通称“彩虹社”）和Bilibili联合推出的虚拟主播企划，
			于2019年4月19日在Bilibili专栏发布初次招募信息，包含了VirtuaReal Project、VirtuaReal Star、VirtuaReal Link等多个分支企划。
			截至2021年11月，旗下共拥有成员70余位，主要在微博和Bilibili等网站进行活动。`,
			group_psp_info: `难易度：简单<br><br>
			百科：Project SP（又称psplive，简称P-SP）是中国的虚拟艺人团体，旗下拥有数位个性鲜明的虚拟艺人，
			志在为大家提供更多优质的音乐、游戏、视频以及直播内容。
			只要不停下脚步，道路就会不断延伸。`,
			group_asoul_info: `难易度：简单<br><br>
			百科：A-SOUL是2020年11月23日公开的乐华娱乐旗下虚拟偶像团体，由字节跳动朝夕光年工作室负责技术支持和日常运营，主要于Bilibili和抖音上开展活动。
			企划前身为“Project V”虚拟偶像女团，未证实疑似前身企划为虚拟偶像“蓝闪Menelaus” ，这也是为什么偶尔评论会有蓝闪，小一等的出现。
			<br><br>
			背景：（被官方遗忘许久的设定里）来自枝江大学的5个性格迥异、各怀才艺的女生在一次临时的救场演出中邂逅彼此，
			因共同的星梦，每个人都充满热情。过着快乐而充实的校园生活，也为能踏上梦想的舞台而努力发光。`,
			group_chaos_info: `难易度：普通<br><br>
			百科：ChaosLive是在Bilibili上活动的虚拟主播企划，于2019年10月31正式启动企业活动。
			2020年4月25日，ChaosLive・Sprout个人势互助社团企划正式启动。`,
			group_xuyan_info: `难易度：普通<br><br>
			百科：虚研社是中国一家较早开始活动的虚拟UP主社团，由微笑科技创建，
			最初只制作了“虚拟次元计划”（小希小桃Channel的前身）这一企划，
			后来通过帮助转生为虚拟UP主的方式，招募了木糖纯、冰糖、子辰等成员。`,
			group_xuefeng_info: `难易度：困难<br><br>
			百科：雪风军团是活跃于bilibili的虚拟主播社团，为SMG旗下的专业虚拟主播运营机构与CG动画制作团队。
			雪风军团于2019年1月21日，随小虾鱼出道视频出现。
			staff代称为雪风，形象为一群屁股会发光的二次元萤火虫，被称为屁光虫。
			实际上却是一群拥有极强开发实力的大神，策划整活、视频制作、3D建模、代播，甚至举办虚拟演唱会。`,
			group_Providence_info: `难易度：普通<br><br>
			百科：Providence企划是在bilibili活动的虚拟主播团体。
			<br><br>
			背景：普罗维登特区地处于新旧世界之间，三个大国的势力交错之处。在上次大战争戛然而止后，各国一致同意将普罗维登群岛划为国际永久中立特区，
			由人类联合政府代管，作为国际自由港成为各方势力交流和交锋的试验田。<br>
			特区联合政府为了振兴本岛文化娱乐业内容创作，决定成立普罗维登企划开发委员会，对使用互联网技术进行新媒体内容创作的艺术家提供政策帮助和支持。
			经过长期的招标，现由艾恩科技集团（NWSE：Aien）提供相应的技术支持。
			普罗维登企划开发委员会将全力打造受人民群众喜爱的电子艺术表演创作平台，为艺术家搭建线上、线下作品展示渠道及作品销售渠道。`,
			group_HappyEl_info: `难易度：困难<br><br>
			百科：乐元素，创立于2009年，是一家以游戏研发运营为主营业务、还包含动画作品、授权商品、音乐、演唱会、广播剧等在内的知名互动娱乐公司。
			代表作品有《开心消消乐》、《战斗吧歌姬!》等。`,
			group_RedC_info: `难易度：普通<br><br>
			百科：RedCircle是一个于2020年成立的新兴虚拟主播社团。
			<br><br>
			背景：大脑有两边，心房分左右。我们的灵魂，当然也可以拥有两份。大叔心和少女情是兼容的，话唠和社恐也是可以共存的。
			你是否为了融入圈子而压抑着自己的个性呢？又或者因为无法隐藏自己的独特，而感到难以融入圈子呢？
			有没有想过，某一天自己能在新的世界里以新的身份自由挥洒着光彩呢？<br>
			这只从日本归来的神秘猫咪，在饱满地吸收了异国虚拟偶像的知识后，回到祖国建立了属于自己的全新社团——Red Circle！`,
		},
		get: {
			rawAttitude: function (from, to) {
				var num = (to.identity == 'zhong') ? 5 : 6;
				return (from.side === to.side ? num : -num);
			}
		}
	};
});
