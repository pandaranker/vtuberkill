window.game.import('character', function (lib, game, ui, get, ai, _status) {
	let Evt: { [propName: string]: any }
	return {
		name: 'emperor',
		connect: true,
		character: {
			sp_KaguraMea: ['female', 'shen', 3, ['zhigao', 'tiangou']],
			sp_MinatoAqua: ['female', 'shen', 2, ['shenghuang', 'renzhan', 'kuase']],
			sp_UsadaPekora: ['female', 'shen', '3/4', ['tuqi', 'shizu']],
			sp_MononobeAlice: ['female', 'shen', 3, ['xianjing', 'chahui', 'duandai']],

			sp_Ava: ['female', 'shen', Infinity, ['shuimu', 'liuxuan'], ['guoV']],
			sp_Diana: ['female', 'shen', 2, ['tangyan', 'tianyin'], ['guoV']],

			sp_KizunaAI: ['female', 'shen', 4, ['ai', 'ban']],
		},
		characterIntro: {
			sp_MinatoAqua: '杏社终末之时的救世主，V始二十四年，姑苏城破，事态危急，华夏之人皆念圣皇爱人亲民，不忍坐视，有义士曰字幕组，以《taking over》、《for the win》两利器夜刺霓虹上将，霓虹上将中刃即死，义士亦为左右斩之，杏军大乱，姑苏周围城郡crew往来助之，大破杏军，圣皇既此知杏高层为人，自立为皇，护一方百姓。',
		},
		skill: {
			//欧皇咩
			zhigao: {
				skillAnimation: true,
				animationColor: 'thunder',
				trigger: { global: 'changeHpBegin' },
				limited: true,
				unique: true,
				mark: true,
				filter(Evt, player) {
					if (player.$.zhigao) return false;
					return Evt.num != 0 && Evt.player.isDamaged() && player == _status.currentPhase;
				},
				content() {
					player.$.zhigao = true;
					player.awakenSkill('zhigao');
					trigger.cancel();
					if (trigger.num < 0) {
						game.broadcast(function () {
							if (lib.config.background_audio) {
								game.playAudio('effect', 'damage2');
							}
						});
						trigger.player.$damage(player);
						player.$damagepop(-Math.abs(trigger.num), 'thunder');
						trigger.player.loseMaxHp(Math.abs(trigger.num), true);
					} else if (trigger.num > 0) {
						game.broadcast(function () {
							if (lib.config.background_audio) {
								game.playAudio('effect', 'recover');
							}
						});
						game.broadcastAll(function (player) {
							if (lib.config.animation && !lib.config.low_performance) {
								player.$recover();
							}
						}, trigger.player);
						player.$damagepop(Math.abs(trigger.num), 'thunder');
						trigger.player.gainMaxHp(Math.abs(trigger.num), true);
					}
				}
			},
			tiangou: {
				init(player, skill) {
					player.storage[skill] = [];
				},
				//	skillAnimation:true,
				//	animationColor:'thunder',
				trigger: { global: 'roundStart' },
				content() {
					'step 0'
					if (false) {
						var bigImg = document.createElement("img");
						bigImg.src = lib.assetURL + "image/GIF_bg/MEA.gif";
						bigImg.style.margin = '0';
						bigImg.style.width = '100%';
						ui.background.appendChild(bigImg);
						setTimeout(function () { bigImg.src = lib.assetURL + "image/GIF_bg/MEA.png"; }, 5580);
						setTimeout(function () { bigImg.remove(); }, 6500);
					}
					if (false) {
						game.broadcastAll() + ui.background.setBackgroundImage("image/GIF_bg/MEA.gif");
						setTimeout(function () { game.broadcastAll() + ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg'); }, 5500);
					}
					var list = player.$.tiangou_list;
					list.removeArray(player.$.tiangou);
					Evt.videoId = lib.status.videoId++;
					for (var i = 0; i < list.length; i++) {
						list[i] = [['', '', list[i], list[i]]]
					}
					game.broadcastAll(function (id, choicelist) {
						var dialog = ui.create.dialog('『天狗食日』 声明一个阶段');
						choicelist.forEach(element => {
							dialog.add([element, 'vcard']);
						})
						dialog.videoId = id;
					}, Evt.videoId, list);
					'step 1'
					player.chooseButton().set('dialog', Evt.videoId).set('prompt', get.prompt('tiangou'));
					'step 2'
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						game.delay(0.5);
						game.log(player, '声明了', result.links[0][2]);
						player.chat(get.translation(result.links[0][2]));
						// player.popup(result.links[0][2],'thunder');
						player.$.tiangou.add(result.links[0][2]);
					} else {
						Evt.finish();
					}
					'step 3'
					game.delay(0.5);
					player.chooseTarget(true, '『天狗食日』：选定一名角色，本轮内只有其能执行声明阶段');
					'step 4'
					if (result.bool) {
						player.logSkill('tiangou', result.targets[0]);
						result.targets[0].addTempSkill('tiangou_limit', 'roundStart');
						result.targets[0].$.tiangou_limit.add(player.$.tiangou[player.$.tiangou.length - 1]);
					}
					'step 5'
					player.$.tiangou_list = ['phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard'];
					if (player.$.tiangou.length == player.$.tiangou_list.length) {
						player.getSkills(true, false).forEach(function (skill) {
							if (lib.skill[skill].init) {
								lib.skill[skill].init(Evt.player, skill);
							}
						})
						player.awakenedSkills.forEach(function (skill) {
							player.restoreSkill(skill);
						})
						player.update();
					}
				},
				group: ['tiangou_list'],
				subSkill: {
					list: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = ['phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard'];
						},
					},
					limit: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = [];
						},
						firstDo: true,
						direct: true,
						trigger: { global: ['phaseJudgeBefore', 'phaseDrawBefore', 'phaseUseBefore', 'phaseDiscardBefore'] },
						filter(Evt, player) {
							return Evt.player != player && player.$.tiangou_limit.contains(Evt.name);
						},
						content() {
							player.line(trigger.player, 'thunder');
							game.log(trigger.player, '的', '#y' + player.$.tiangou_limit, '被跳过了');
							trigger.cancel();
						},
						onremove(player) {
							delete player.$.tiangou_limit;
						},
					}
				},
			},
			//圣皇夸
			shenghuang: {
				locked: true,
				init(player) {
					player.$.shenghuang = 0;
					if (get.mode() == 'identity' && get.zhu(player) == player && game.players.length > 4) player.maxHp--;
				},
				global: ['shenghuang_put', 'shenghuang_rec'],
				group: ['shenghuang_draw', 'shenghuang_lose', 'shenghuang_ret'],
				subSkill: {
					put: {
						trigger: { global: 'phaseBegin' },
						forced: true,
						silent: true,
						popup: false,
						priority: 777,
						filter(Evt, player) {
							return player.hp;
						},
						content() {
							player.$.shenghuang_put = player.hp;
						}
					},
					draw: {
						init(player) {
							if (get.zhu(player) == player && game.players.length > 4) {
								player.$.shenghuang_draw = 4;
							}
							else {
								player.$.shenghuang_draw = 3;
							}
							if (player.hasSkill('shenghuang_draw')) player.markSkill('shenghuang_draw');
						},
						marktext: '圣',
						mark: true,
						intro: {
							content: '剩余&张数值为2的体力卡',
							name: '剩余体力卡',
						},
						forced: true,
						priority: 777,
						skillAnimation: true,
						animationColor: 'gray',
						trigger: {
							player: "dying",
						},
						filter(Evt, player) {
							return player.$.shenghuang_draw > 0
						},
						content() {
							player.maxHp = 2;
							player.recover(player.maxHp - player.hp);
							player.$.shenghuang_draw--;
							player.syncStorage('shenghuang_draw');
							if (!player.$.shenghuang_draw) {
								player.unmarkSkill('shenghuang_draw');
								player.removeSkill('shenghuang_draw');
							}
						},
					},
					lose: {
						marktext: '愈',
						intro: {
							content: '当前回合已失去了黑色牌，在本回合结束时，其他角色将体力回复至回合开始时的状态。',
							name: '圣皇之愈',
						},
						trigger: { player: 'loseAfter' },
						forced: true,
						priority: 777,
						filter(Evt, player) {
							if (!(Evt.getParent().cards || Evt.card)) return false;
							var cards = Evt.getParent().cards;
							var bc = 0;
							for (var i = 0; i < cards.length; i++) {
								if (get.color(cards[i]) == 'black') bc++;
							}
							return bc;
						},
						content() {
							player.$.shenghuang++;
							player.markSkill('shenghuang_lose');
						},
					},
					ret: {
						forced: true,
						silent: true,
						popup: false,
						priority: 888,
						trigger: { global: 'phaseAfter' },
						filter(Evt, player) {
							return player.$.shenghuang;
						},
						content() {
							player.$.shenghuang = 0;
							player.unmarkSkill('shenghuang_lose');
						}
					},
					rec: {
						forced: true,
						priority: 777,
						trigger: { global: 'phaseEnd' },
						filter(Evt, player) {
							if (player.hasSkill('shenghuang')) return false;
							if (player.$.shenghuang_put == undefined) return false;
							if (!game.hasPlayer(cur => {
								return cur.hasSkill('shenghuang') && cur.$.shenghuang > 0;
							})) return false;
							return player.$.shenghuang_put > player.hp;
						},
						content() {
							var vq = player.$.shenghuang_put - player.hp;
							if (vq > 0) {
								player.recover(vq);
							}
						},
					}
				},
			},
			renzhan: {
				priority: 777,
				trigger: { global: 'damageEnd' },
				usable: 1,
				check(Evt, player) {
					if (player.$.shenghuang_draw == 0 && player.hp == 1) return false;
					return player.getUseValue({ name: 'sha' }) > 0;
				},
				filter(Evt, player) {
					return Evt.player != player && Evt.player.hp > 0;
				},
				logTarget: 'player',
				content() {
					'step 0'
					player.loseHp();
					var card = get.cards()[0];
					var cards = [card];
					while (get.name(card) != 'sha') {
						card = get.cards()[0];
						cards.push(card);
					}
					Evt.cards = cards;
					'step 1'
					game.cardsGotoOrdering(Evt.cards);
					game.delayx();
					'step 2'
					player.showCards(Evt.cards, '『瞬息刃斩』亮出牌堆');
					player.chooseControlList(
						['获得这些牌',
							'获得其中的【杀】并对一名角色使用任意张【杀】'],
						true).set('ai', function () {
							var player = _status.event.player;
							if (player.countCards('h', { name: 'sha' }) >= 1 && Evt.cards.length <= 3) return 1;
							return 0;
						});
					'step 3'
					if (result.index == 0) {
						cards = Evt.cards;
						game.log(player, '获得了', cards);
						player.gain(cards, 'gain2');
						Evt.finish();
					}
					else if (result.index == 1) {
						var cards = [];
						Evt.cards.forEach(card => {
							if (get.name(card) == 'sha') cards.push(card);
						});
						Evt.cards = cards;
						player.showCards(Evt.cards, '获得其中的【杀】');
						game.delayx();
						player.gain(cards, 'gain2');
					}
					'step 4'
					let next = player.chooseTarget('###『刃斩』###指定一名角色，对其使用任意张【杀】', function (card, player, target) {
						return player != target;
					})
						.set('targetprompt', ['RUA'])
						.set('forced', false)
						.set('ai', function (target) {
							var player = _status.event.player;
							var att = get.attitude(player, target);
							return 10 - att;
						});
					'step 5'
					if (result.bool) {
						var target = result.targets[0];
						Evt.target = target;
						game.log(player, '刃斩的目标为', target);
						target.addTempSkill('renzhan2', 'phaseEnd');
						target.$.renzhan2 = true;
						player.logSkill('renzhan', target);
						player.chooseToUse('对' + get.translation(target) + '使用杀', { name: 'sha' }, target, -1);
					}
					else {
						Evt.finish();
					}
					'step 6'
					if (result.bool) {
						var target = Evt.target;
						if (target.$.renzhan2 && player.canUse({ name: 'sha' }, target, false)) {
							player.chooseToUse('对' + get.translation(target) + '继续使用杀', { name: 'sha' }, target, -1);
						}
					}
					else {
						Evt.finish();
					}
					'step 7'
					var target = Evt.target;
					if (result.bool) {
						if (target.$.renzhan2 && player.canUse({ name: 'sha' }, target, false)) {
							Evt.goto(6);
						}
					}
					if (target) {
						target.unmarkSkill('renzhan2');
						target.removeSkill('renzhan2');
					}
				},
				ai: {
					maixie: true,
				},
			},
			renzhan2: {
				marktext: "危",
				locked: true,
				intro: {
					name: '危',
					content: '成为瞬息刃斩的目标',
				},
				mark: true,
				firstDo: true,
				silent: true,
				forced: true,
				popup: false,
				trigger: { player: 'dying' },
				filter(Evt, player) {
					return player.isAlive();
				},
				onremove: true,
				content() {
					player.$.renzhan2 = false;
				},
			},
			kuase: {
				unique: true,
				limited: true,
				skillAnimation: true,
				priority: 888,
				animationStr: '夸色☆超级梦想',
				trigger: { global: 'phaseAfter' },
				prompt() {
					var player = _status.event.player;
					return '是否发动『阿库娅色☆超级梦想』<br>（本回合所有角色回复体力之和为' + player.$.kuase_date + '点）';
				},
				filter(Evt, player) {
					return player.$.kuase_date;
				},
				check(Evt, player) {
					return !player.$.shenghuang_draw || player.$.kuase_date >= player.$.shenghuang_draw;
				},
				content() {
					var dream = player.$.kuase_date;
					player.draw(dream);
					player.getStat().card.sha = 0;
					player.phaseUse();
					player.$.kuase = true;
					player.awakenSkill('kuase');
				},
				group: ['kuase_date', 'kuase_ret'],
				subSkill: {
					date: {
						init(player) {
							player.$.kuase_date = 0;
						},
						forced: true,
						silent: true,
						popup: false,
						priority: 777,
						trigger: { global: 'recoverAfter' },
						filter(Evt, player) {
							return true;
						},
						content() {
							player.$.kuase_date += trigger.num;
						},
					},
					ret: {
						forced: true,
						silent: true,
						popup: false,
						priority: 666,
						trigger: { global: 'phaseAfter' },
						filter(Evt, player) {
							return player.$.kuase_date;
						},
						content() {
							player.$.kuase_date = 0;
						}
					}
				}
			},
			//SP爱丽丝
			xianjing: {
				init(player) {
					player.$.xianjing = [];
				},
				marktext: "仙",
				intro: {
					name: '仙境奇遇',
					content(storage, player, skill) {
						if (storage.length == 1) {
							return '上一张使用的牌，花色为' + get.translation(storage);
						}
						else if (storage.length > 1) {
							return '先前使用的牌，花色为' + get.translation(storage);
						}
						else {
							return '本回合尚未使用牌';
						}
					},
				},
				trigger: { player: 'useCardAfter' },
				priority: 555,
				filter(Evt, player) {
					if (!player.$.xianjing.length) {
						return false;
					} else if ((player.$.xianjing[player.$.xianjing.length - 1] == 'heart' && get.suit(Evt.card) == 'spade')
						|| (player.$.xianjing[player.$.xianjing.length - 1] == 'spade' && get.suit(Evt.card) == 'diamond')
						|| (player.$.xianjing[player.$.xianjing.length - 1] == 'diamond' && get.suit(Evt.card) == 'club')
						|| (player.$.xianjing[player.$.xianjing.length - 1] == 'club' && get.suit(Evt.card) == 'heart')
					) {
						return true;
					}
				},
				content() {
					'step 0'
					game.broadcastAll(function (player) {
						let next = player.chooseTarget(function (card, player, target) {
							return true;
						});
						next.set('targetprompt', ['JK']);
						next.set('prompt', '指定一名角色，令其摸一张牌');
						next.set('forced', false);
						next.set('ai', function (target) {
							var att = get.attitude(player, target);
							return att;
						});
					}, player);
					'step 1'
					if (result.bool) {
						result.targets[0].draw(player);
					}
				},
				group: ['xianjing_update', 'xianjing_back', 'xianjing_discard'],
				subSkill: {
					update: {
						trigger: { player: 'useCardAfter' },
						forced: true,
						silent: true,
						priority: 544,
						content() {
							if (!player.$.xianjing.length) {
								player.$.xianjing.add(get.suit(trigger.card));
							}
							else if ((player.$.xianjing[player.$.xianjing.length - 1] == 'heart' && get.suit(trigger.card) == 'spade')
								|| (player.$.xianjing[player.$.xianjing.length - 1] == 'spade' && get.suit(trigger.card) == 'diamond')
								|| (player.$.xianjing[player.$.xianjing.length - 1] == 'diamond' && get.suit(trigger.card) == 'club')
								|| (player.$.xianjing[player.$.xianjing.length - 1] == 'club' && get.suit(trigger.card) == 'heart')
							) {
								player.$.xianjing.push(get.suit(trigger.card));
							} else {
								player.$.xianjing.splice(0, player.$.xianjing.length, get.suit(trigger.card));
							}
							player.markSkill('xianjing');
							if (player.$.xianjing.length == 4) {
								player.$.duandai++;
								player.markSkill('duandai');
							}
						},
					},
					back: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							player.unmarkSkill('xianjing');
							player.$.xianjing = [];
						}
					},
					discard: {
						trigger: { global: 'phaseEnd' },
						forced: false,
						priority: 555,
						prompt: '你可选择一项：令一名其他角色获得「小兔子」标记，或令所有「小兔子」各摸一张牌。',
						filter(Evt, player) {
							var suits = [];
							game.getGlobalHistory('cardMove', evt => {
								if (evt.name != 'lose' && evt.name != 'cardsDiscard') return false;
								if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
								suits.addArray(get.suit3(evt.cards))
							});
							if (suits.length >= 4) return true;
						},
						content() {
							'step 0'
							player.chooseControlList(
								['令一名其他角色获得「小兔子」标记',
									'令所有「小兔子」各摸一张牌'],
								true, function (Evt, player) {
									return _status.event.index;
								});
							'step 1'
							if (result.index == 0) {
								game.broadcastAll(function (player) {
									let next = player.chooseTarget(function (card, player, target) {
										return target != player && !target.hasSkill('xiaotuzi');
									});
									next.set('targetprompt', ['小兔子']);
									next.set('prompt', '指定一名角色，令其成为小兔子');
									next.set('forced', false);
									next.set('ai', function (target) {
										var att = get.attitude(player, target);
										return att;
									});
								}, player);
							}
							else if (result.index == 1) {
								game.hasPlayer(cur => {
									if (cur.hasSkill('xiaotuzi')) {
										cur.draw();
									}
								})
							}
							else {
								Evt.finish();
							}
							'step 2'
							if (result.bool) {
								result.targets[0].addSkill('xiaotuzi');
								result.targets[0].markSkill('xiaotuzi');
							}
						}
					}
				},
			},
			chahui: {
				forced: false,
				priority: 543,
				trigger: { player: 'useCardAfter' },
				filter(Evt, player) {
					if (!player.isPhaseUsing()) return false;
					return game.hasPlayer(cur => {
						return cur.hasSkill('xiaotuzi') && cur.countCards('h');
					});
				},
				content() {
					'step 0'
					game.broadcastAll(function (player) {
						let next = player.chooseTarget(function (card, player, target) {
							return target != player && target.hasSkill('xiaotuzi');
						});
						next.set('prompt', '指定一名小兔子，令其出一张牌');
						next.set('forced', false);
						next.set('ai', function (target) {
							var att = get.attitude(player, target);
							return att;
						});
					}, player);
					'step 1'
					if (result.bool) {
						Evt.target = result.targets[0];
						Evt.target.chooseCard('h', 1, '是否紧跟爱丽丝之后使用一张牌')
							.set('filterCard')
							.set('ai', card => {
								let alice = _status.event.alice,
									player = _status.event.player;
								if (!player.hasUseTarget(card)) return 0;
								if ((player.$.xianjing[player.$.xianjing.length - 1] == 'heart' && get.suit(card) == 'spade')
									|| (player.$.xianjing[player.$.xianjing.length - 1] == 'spade' && get.suit(card) == 'diamond')
									|| (player.$.xianjing[player.$.xianjing.length - 1] == 'diamond' && get.suit(card) == 'club')
									|| (player.$.xianjing[player.$.xianjing.length - 1] == 'club' && get.suit(card) == 'heart')
								) {
									if (get.$a(player, alice) > 0) {
										return 10;
									}
								}
							})
							.set('alice', player)
					}
					else {
						Evt.finish();
					}
					'step 2'
					if (result.bool) {
						Evt.card = result.cards[0];
						if (((player.$.xianjing[player.$.xianjing.length - 1] == 'heart' && get.suit(Evt.card) == 'spade')
							|| (player.$.xianjing[player.$.xianjing.length - 1] == 'spade' && get.suit(Evt.card) == 'diamond')
							|| (player.$.xianjing[player.$.xianjing.length - 1] == 'diamond' && get.suit(Evt.card) == 'club')
							|| (player.$.xianjing[player.$.xianjing.length - 1] == 'club' && get.suit(Evt.card) == 'heart'))
							&& player.hasUseTarget(Evt.card)) {
							player.chooseUseTarget(Evt.card, `视为使用一张${get.$t(Evt.card)}`, true)
						}
						else {
							Evt.target.chooseUseTarget(Evt.card, true);
						}
					}
					else {
						Evt.finish();
					}
				},
				ai: {
					combo: 'xianjing',
				},
			},
			xiaotuzi: {
				forced: false,
				marktext: "🐇",
				mark: true,
				locked: true,
				priority: 543,
				intro: {
					name: '<font color=#ee2>小兔子标记</font>',
					content: '成为了爱丽丝的小兔子',
				},
				trigger: { player: 'useCardAfter' },
				filter(Evt, player) {
					if (!player.isPhaseUsing()) return false;
					return game.hasPlayer(cur => {
						return cur.hasSkill('chahui') && cur.countCards('h');
					});
				},
				content() {
					'step 0'
					game.broadcastAll(function (player) {
						let next = player.chooseTarget(function (card, player, target) {
							return target != player && target.hasSkill('chahui');
						});
						next.set('prompt', '指定爱丽丝，令其出一张牌');
						next.set('forced', false);
						next.set('ai', function (target) {
							var att = get.attitude(player, target);
							return att;
						});
					}, player);
					'step 1'
					if (result.bool) {
						_status.event.target = result.targets[0];
						game.broadcastAll(function (target, trigger) {
							let next = target.chooseCard('h', 1, '是否紧跟小兔子之后使用一张牌');
							next.set('forced', false);
							next.set('ai', card => {
								if (get.name(card) == 'shan') return 10;
								if ((get.suit(trigger.card) == 'heart' && get.suit(card) == 'spade')
									|| (get.suit(trigger.card) == 'spade' && get.suit(card) == 'diamond')
									|| (get.suit(trigger.card) == 'diamond' && get.suit(card) == 'club')
									|| (get.suit(trigger.card) == 'club' && get.suit(card) == 'heart')
								) {
									return 100;
								}
							});
						}, _status.event.target, trigger);
					}
					else {
						Evt.finish();
					}
					'step 2'
					if (result.bool) {
						Evt.card = result.cards[0];
						if ((get.suit(trigger.card) == 'heart' && get.suit(Evt.card) == 'spade')
							|| (get.suit(trigger.card) == 'spade' && get.suit(Evt.card) == 'diamond')
							|| (get.suit(trigger.card) == 'diamond' && get.suit(Evt.card) == 'club')
							|| (get.suit(trigger.card) == 'club' && get.suit(Evt.card) == 'heart')
						) {
							player.gain(Evt.card);
							game.log(player, '获得了', Evt.card)
							player.chooseUseTarget(Evt.card, true);
						}
						else {
							_status.event.target.chooseUseTarget(Evt.card, true);
						}
					}
					else {
						Evt.finish();
					}
				},
				group: ['xiaotuzi_lose'],
				subSkill: {
					lose: {
						trigger: { global: 'dieBegin' },
						filter(Evt, player) {
							return Evt.player.hasSkill('xianjing');
						},
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							player.unmarkSkill('xiaotuzi');
							player.removeSkill('xiaotuzi');
						},
					},
				},
			},
			duandai: {
				init(player) {
					player.$.duandai = 0;
				},
				notemp: true,
				marktext: 'Alice',
				intro: {
					content: '已完成一组Alice序列，可以在回合结束时回复体力值',
				},
				skillAnimation: true,
				priority: 543,
				animationStr: '嚣张缎带',
				trigger: { player: 'phaseEnd' },
				filter(Evt, player) {
					if (player.hp == player.maxHp) return false;
					return player.$.duandai;
				},
				content() {
					player.recover(player.maxHp - player.hp);
					player.$.duandai = 0;
					player.unmarkSkill('duandai');
				},
				ai: {
					combo: 'xianjing',
				},
			},

			//SP向晚
			shuimu: {
				trigger: { player: 'damageBegin' },
				filter(Evt, player) {
					return player.$.liuxuan && player.maxHp == Infinity;
				},
				locked: true,
				forced: true,
				priority: 6,
				content() {
					var num = 0;
					switch (player.$.liuxuan) {
						case 'liuxuan_lakua': num = 4; break;
						case 'liuxuan_huoli': num = 3; break;
						case 'liuxuan_haixiu': num = 4; break;
						case 'liuxuan_jiangzui': num = 5; break;
						case 'liuxuan_keai': num = 7; break;
					}
					player.maxHp = num;
					player.hp = num;
					player.update();
				},
				ai: {
					combo: 'liuxuan',
				},
			},
			liuxuan: {
				init(player, skill) {
					player.storage[skill] = 'liuxuan_lakua';
					player.addSkill('liuxuan_lakua');
					game.broadcastAll(function (player) {
						player._liuxuan_mark = player.mark('😅', {
							name(storage, player) {
								var skill = player.$.liuxuan;
								return '<div class="text center browntext">' + lib.translate[skill] + '小向晚</div>';
							},
							content(content, player) {
								var list = ['liuxuan_lakua', 'liuxuan_huoli', 'liuxuan_haixiu', 'liuxuan_jiangzui', 'liuxuan_keai'];
								var str = '';
								for (var i = 0; i < list.length; i++) {
									if (player.hasSkill(list[i])) str += '<span class="legendtext">';
									str += lib.translate[list[i]];
									str += '：';
									str += lib.translate[list[i] + '_describe'];
									if (player.hasSkill(list[i])) str += '</span>';
									str += '<br>';
								}
								return str;
							}
						});
					}, player);
					if (lib.skill[skill].process) lib.skill[skill].process(skill, player.storage[skill], player);
					game.playAudio('skill', 'liuxuan_lakua1');
				},
				trigger: { player: ['useCardBegin', 'respondBegin'] },
				filter(Evt, player) {
					var number = get.number(Evt.card);
					var list = [];
					if (number) {
						if (number % 3 == 0) list.add('liuxuan_huoli');
						if (number % 4 == 0) list.add('liuxuan_haixiu');
						if (number % 5 == 0) list.add('liuxuan_jiangzui');
						if (number % 7 == 0) list.add('liuxuan_keai');
					}
					if (list.length == 0) list.add('liuxuan_lakua');
					list.remove(player.$.liuxuan);
					return list.length;
				},
				process(skill, name, player) {
					if (lib.translate[name]) {
						game.broadcastAll(function (skill, name, player) {
							if (!player._liuxuan_mark) return;
							switch (name) {
								case 'liuxuan_lakua': player._liuxuan_mark.firstChild.innerHTML = '😅'; break;
								case 'liuxuan_huoli': player._liuxuan_mark.firstChild.innerHTML = '🤗'; break;
								case 'liuxuan_haixiu': player._liuxuan_mark.firstChild.innerHTML = '🤣'; break;
								case 'liuxuan_jiangzui': player._liuxuan_mark.firstChild.innerHTML = '😡'; break;
								case 'liuxuan_keai': player._liuxuan_mark.firstChild.innerHTML = '😭'; break;
							}
							player.node.name.innerHTML = get.verticalStr(lib.translate[name] + '小向晚');
							lib.translate[skill + '_append'] = '<span class="changetext">' + lib.translate[name] + '：' + lib.translate[name + '_describe'] + '</span>';
							player.update();
						}, skill, name, player);
					}
				},
				locked: true,
				forced: true,
				priority: 6,
				content() {
					'step 0'
					let number = get.number(trigger.card);
					let list = [];
					if (number) {
						if (number % 3 == 0) list.add('liuxuan_huoli');
						if (number % 4 == 0) list.add('liuxuan_haixiu');
						if (number % 5 == 0) list.add('liuxuan_jiangzui');
						if (number % 7 == 0) list.add('liuxuan_keai');
					}
					if (list.length == 0) list.add('liuxuan_lakua');
					Evt.list = list;
					'step 1'
					if (Evt.list.length == 0) {
						Evt.finish()
					} else if (Evt.list.length == 1) {
						Evt.link = Evt.list.pop();
						var from = player.$.liuxuan;
						player.removeSkill([from]);
						Evt.goto(3);
					} else if (Evt.list.length > 1) {
						let list = Evt.list.slice(0);
						player.chooseButton(true, ['选择一个姿态进入', [list, 'vcard'], 'hidden']).set('filterButton', function (button) {
							var player = _status.event.player;
							if (button.link[2] == player.$.liuxuan) return false;
							return true;
						}).set('prompt', '选择一个姿态进入');
					}
					'step 2'
					if (result.bool && result.links[0]) {
						var from = player.$.liuxuan;
						player.removeSkill([from]);
						var link = result.links[0][2];
						Evt.link = link;
						Evt.list.remove(link);
					}
					'step 3'
					if (Evt.link && Evt.link != player.$.liuxuan) {
						player.$.liuxuan = Evt.link;
						player.popup(player.$.liuxuan);
						if (Evt.link == 'liuxuan_jiangzui'
							&& game.hasPlayer(cur => player != cur && cur.countGainableCards(player, 'he') > 0)) {
							player.chooseTarget(true, '『犟嘴』：' + lib.translate[Evt.link + '_describe'], function (card, player, target) {
								if (player == target) return false;
								return target.countGainableCards(player, 'he') > 0;
							}).set('ai', function (target) {
								var player = _status.event.player;
								return -get.attitude(player, target) + Math.random();
							})
						} else {
							Evt.goto(9);
						}
					}
					'step 4'
					if (Evt.link == 'liuxuan_jiangzui' && result?.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill(Evt.link, Evt.target);
						Evt.target.chooseCard('he', '无限溜旋-犟嘴：将一张牌交给' + get.translation(player), 1, true)
							.set('ai', card => {
								return -get.value(card);
							});
					} else {
						Evt.goto(9);
					}
					'step 5'
					if (Evt.link == 'liuxuan_jiangzui' && result?.cards?.length) {
						Evt.target.$giveAuto(result.cards, player);
						player.gain(result.cards, Evt.target);
					}
					'step 6'
					if (Evt.link == 'liuxuan_jiangzui') {
						Evt.cards = player.getCards('h').removeArray(trigger.cards);
						Evt.videoId = lib.status.videoId++;
						var dialogx = ['『犟嘴』：选择一张牌，令其点数增加或减少1'];
						dialogx.push(Evt.cards);
						if (player.isOnline2()) {
							player.send(function (dialogx, id) {
								ui.create.dialog.apply(null, dialogx).videoId = id;
							}, dialogx, Evt.videoId);
						}
						Evt.dialog = ui.create.dialog.apply(null, dialogx);
						Evt.dialog.videoId = Evt.videoId;
						if (player != game.me || _status.auto) {
							Evt.dialog.style.display = 'none';
						}
						let next = player.chooseButton();
						next.set('dialog', Evt.videoId);
						next.set('ai', function (button) {
							if (get.number(button.link) == 7) return get.value(button.link) * 2 + Math.random();
							return get.value(button.link);
						});
						next.set('forceAuto', function () {
							return ui.selected.buttons.length == 1 || ui.dialog.buttons.length == 1;
						});
					} else {
						Evt.goto(9);
					}
					'step 7'
					if (Evt.link == 'liuxuan_jiangzui' && result.links?.length) {
						Evt.links = result.links;
						var func = function (cards, id) {
							var dialog = get.idDialog(id);
							if (dialog) {
								for (var j = 0; j < cards.length; j++) {
									for (var i = 0; i < dialog.buttons.length; i++) {
										if (dialog.buttons[i].link == cards[j]) {
											dialog.buttons[i].classList.add('glow');
										}
										else {
											dialog.buttons[i].classList.add('unselectable');
										}
									}
								}
							}
						}
						if (player.isOnline2()) {
							player.send(func, Evt.links, Evt.videoId);
						}
						else if (player == game.me && !_status.auto) {
							func(Evt.links, Evt.videoId);
						}
						let list = ['+1', '-1', '取消选择'];
						if (Evt.links[0].hasGaintag('liuxuan_lose2')) list.remove('-1');
						if (Evt.links[0].hasGaintag('liuxuan_plus2')) list.remove('+1');
						player.chooseControl(list, true).set('ai', function () {
							let card = _status.event.card;
							let controls = _status.event.controls;
							if ([5, 10, 12].contains(get.number(card) + 1) && controls.contains('+1')) return '+1';
							if ([5, 10, 12].contains(get.number(card) - 1) && controls.contains('-1')) return '-1';
							return controls.randomGet();
						}).set('card', Evt.links[0]);
					} else {
						if (player.isOnline2()) {
							player.send('closeDialog', Evt.videoId);
						}
						Evt.dialog.close();
						Evt.finish();
					}
					'step 8'
					if (Evt.link == 'liuxuan_jiangzui' && result.control) {
						switch (result.control) {
							case '取消选择': Evt.goto(5); break;
							case '+1': {
								if (Evt.links[0].hasGaintag('liuxuan_lose')) {
									Evt.links[0].removeGaintag('liuxuan_lose');
								}
								else if (Evt.links[0].hasGaintag('liuxuan_lose2')) {
									Evt.links[0].removeGaintag('liuxuan_lose2');
									player.addGaintag(Evt.links, 'liuxuan_lose');
								}
								else if (Evt.links[0].hasGaintag('liuxuan_plus')) {
									Evt.links[0].removeGaintag('liuxuan_plus');
									player.addGaintag(Evt.links, 'liuxuan_plus2');
								}
								else {
									player.addGaintag(Evt.links, 'liuxuan_plus');
								}
								break;
							}
							case '-1': {
								if (Evt.links[0].hasGaintag('liuxuan_plus')) {
									Evt.links[0].removeGaintag('liuxuan_plus');
								}
								else if (Evt.links[0].hasGaintag('liuxuan_plus2')) {
									Evt.links[0].removeGaintag('liuxuan_plus2');
									player.addGaintag(Evt.links, 'liuxuan_plus');
								}
								else if (Evt.links[0].hasGaintag('liuxuan_lose')) {
									Evt.links[0].removeGaintag('liuxuan_lose');
									player.addGaintag(Evt.links, 'liuxuan_lose2');
								}
								else {
									player.addGaintag(Evt.links, 'liuxuan_lose');
								}
								break;
							}
						}
					}
					if (player.isOnline2()) {
						player.send('closeDialog', Evt.videoId);
					}
					Evt.dialog.close();
					'step 9'
					if (Evt.link) {
						player.$.liuxuan = Evt.link;
						player.popup(player.$.liuxuan);
						game.log(player, '进入了', '#g' + get.translation(Evt.link), '姿态');
						if (['liuxuan_lakua', 'liuxuan_keai', 'liuxuan_haixiu'].contains(Evt.link)) player.logSkill(Evt.link);
						player.addSkill(Evt.link);
						game.delay();
						if (lib.skill.liuxuan.process) lib.skill.liuxuan.process('liuxuan', Evt.link, player);
					}
					Evt.goto(1);
				},
				mod: {
					number(card, player, number) {
						if (card.hasGaintag && card.hasGaintag('liuxuan_plus2')) return number + 2;
						if (card.hasGaintag && card.hasGaintag('liuxuan_lose2')) return number - 2;
						if (card.hasGaintag && card.hasGaintag('liuxuan_plus')) return number + 1;
						if (card.hasGaintag && card.hasGaintag('liuxuan_lose')) return number - 1;
					},
					aiOrder(player, card, num) {
						if (typeof card == 'object') {
							var key = get.number(card);
							if ([7, 14].contains(key)) {
								if (player.hp == Infinity) return num - 20;
								else if (player.hp <= 3 && player.$.liuxuan != 'liuxuan_keai') return num + 10;
								else if (player.$.liuxuan == 'liuxuan_keai') return num - 3;
							}
							if ([5, 10].contains(key)) {
								if (player.$.liuxuan != 'liuxuan_jiangzui') return num + 10;
								if (player.$.liuxuan == 'liuxuan_jiangzui') return num - 3;
							}
							if ([4, 8, 12].contains(key)) {
								if (get.tag(card, 'damage')) return num + 5;
							}
						}
					},
				},
				subSkill: {
					lakua: {
						audio: 3,
						onremove: true,
						mod: {
							globalTo(from, to, distance) {
								if (to != from) {
									return distance - 1;
								}
							}
						},
					},
					huoli: {
						onremove(player) {
							player.popup(player.$.liuxuan);
							player.draw();
							game.delay();
						},
						trigger: { player: 'useCard' },
						forced: true,
						filter(Evt) {
							return get.type(Evt.card) == 'trick';
						},
						content() {
							trigger.nowuxie = true;
						},
					},
					haixiu: {
						audio: 3,
						onremove: true,
						trigger: { source: 'damageBegin2', player: 'damageBegin4' },
						priority: 6,
						forced: true,
						popup: '溜旋-害羞',
						filter(Evt, player) {
							return true;
						},
						content() {
							trigger.num++;
						},
						ai: {
							damageBonus: true
						},
						mod: {
							canBeGained(card, source, player) {
								if (source != player && ['h'].contains(get.position(card))) return false;
							},
							canBeDiscarded(card, source, player) {
								if (source != player && ['h'].contains(get.position(card))) return false;
							},
						},
					},
					jiangzui: {
						audio: 3,
						onremove: true,
					},
					keai: {
						audio: 5,
						onremove(player) {
							if (player.hp == Infinity) {
								player.die();
							}
							else {
								player.hp = Math.ceil(player.hp / 2);
								player.update();
							}
						},
						init(player, skill) {
							player.draw(3);
						},
						trigger: { source: 'damageBegin2' },
						priority: 6,
						forced: true,
						popup: '溜旋-可爱',
						filter(Evt, player) {
							return true;
						},
						content() {
							trigger.num *= 2;
						},
					},
				}
			},
			//SP嘉然
			tangyan: {
				audio: 10,
				init(player, skill) {
					player.$.tangyan = [];
				},
				trigger: { player: ['useCardAfter', 'respondAfter', 'loseAfter'] },
				filter(Evt, player) {
					if (!player.isDamaged()) return false;
					if (Evt.name == 'lose') {
						if (Evt.getParent().name != 'discard') return false;
						for (var i = 0; i < Evt.cards.length; i++) {
							var card = Evt.cards[i];
							if (get.position(card) == 'd' && get.type(card) == 'basic') return true;
						}
					} else {
						return Evt.card && get.type(Evt.card) == 'basic';
					}
				},
				direct: true,
				content() {
					'step 0'
					Evt.source = _status.currentPhase;
					if (Evt.source != player && Evt.source.countCards('h', card => card.hasGaintag('xinjia'))) {
						Evt.xinjia = true;
					}
					Evt.filterCards = [];
					Evt.cards = (trigger.name == 'lose') ? (trigger.cards.filter(function (lose) {
						return get.type(lose) == 'basic';
					})) : [trigger.card];
					'step 1'
					var card = Evt.cards.shift();
					Evt.filterCards = get.inpile('basic', i => {
						if (player.$.tangyan.contains(i)) return false;
						if (lib.filter.filterCard({ name: i }, player, trigger) && player.hasUseTarget({ name: i, isCard: false })) {
							return true
						}
					});
					Evt.filterCards = Evt.filterCards.map(i => {
						let natures = get.info({ name: i }).nature;
						let list = [[get.type(i), '', i]]
						if (natures && natures.length) {
							for (let j of natures) {
								if (j !== 'kami') list.push([get.type(i), '', i, j])
							}
						}
						console.log(i)
						return list
					}).vkflat()
					if (Evt.xinjia) {
						if (!Evt.allBy) Evt.allBy = 1;
						Evt.goto(3);
					}
					console.log(Evt.filterCards)
					'step 2'
					Evt.list = ['令一名角色摸一张牌', '防止一名角色下一次受到的伤害'];
					if (Evt.filterCards.length) Evt.list.push('视为使用一张本回合未以此法使用过的基本牌');
					let choice = [0, 1].randomGet();
					if (!player.$.tangyan_on) choice = 1;
					if (Evt.list.length >= 3) choice = 2;
					player.chooseControlList(Evt.list, function () {
						return _status.event.choice;
					}).set('prompt', get.prompt2('tangyan')).set('choice', choice);
					'step 3'
					if (result.control != 'cancel2' || (Evt.xinjia && Evt.allBy && Evt.allBy <= 3)) {
						game.delayx();
						let str = '';
						if (Evt.allBy) {
							str += '（依次执行每一项）';
						}
						Evt.curChoice = (result.index + 1) || Evt.allBy
						switch (Evt.curChoice) {
							case 1: {
								player.chooseTarget(true, '『穿心糖言』：令一名角色摸一张牌' + str).set('ai', function (target) {
									let player = _status.event.player;
									return get.attitude(player, target);
								})
							}; break;
							case 2: {
								player.chooseTarget(true, '『穿心糖言』：防止一名角色下一次受到的伤害' + str).set('ai', function (target) {
									let player = _status.event.player;
									if (!target.$.tangyan_on) return get.attitude(player, target);
									return 0.1 * get.attitude(player, target)
								})
							}; break;
							case 3: {
								player.logSkill('tangyan');
								let list = Evt.filterCards;
								if (list.length)
									player.chooseButton(true, ['『穿心糖言』：选择一张本回合未以此法使用过的基本牌并使用之' + str, [list, 'vcard'], 'hidden']).set('ai', function (button) {
										return get.order({ name: button.link[2], nature: button.link[3] });
									})
								Evt.goto(5);
							}; break;
						}
					} else {
						Evt.finish();
					}
					'step 4'
					if (result.targets?.length) {
						let str = '';
						if (Evt.allBy) {
							str += '（依次执行每一项）';
						}
						let target = result.targets[0]
						player.logSkill('tangyan', target);
						switch (Evt.curChoice) {
							case 1: target.draw();
								break;
							case 2: {
								if (target.$.tangyan_on !== true) {
									game.log(player, '防止了', target, '下一次受到的伤害' + str);
									target.$.tangyan_on = true;
								}
							}; break;
						}
					}
					if (Evt.xinjia && Evt.allBy <= 2) {
						Evt.allBy++;
						if (Evt.filterCards.length > 0 || Evt.allBy <= 2) Evt.goto(3);
					}
					'step 5'
					if (result.links?.length) {
						game.delayx();
						var card = result.links[0];
						player.$.tangyan.add(card[2]);
						player.chooseUseTarget({ name: card[2], nature: card[3] }, true, 'noTargetDelay', 'nodelayx');
					}
					'step 6'
					if (Evt.cards.length) {
						Evt.goto(1);
					}
				},
				group: ['tangyan_on', 'tangyan_clear'],
				subSkill: {
					on: {
						init(player, skill) {
							player.$.tangyan_on = false;
							player.markSkill('tangyan_on');
						},
						marktext: '糖',
						intro: {
							mark(dialog, content, player) {
								if (player.$.tangyan_on) return `『穿心糖言』防止${get.translation(player)}下一次受到的伤害`;
							},
							content(content, player) {
								if (player.$.tangyan_on) return `『穿心糖言』防止${get.translation(player)}下一次受到的伤害`;
							}
						},
						trigger: { global: 'damageBegin3' },
						priority: 29,
						locked: true,
						forced: true,
						logTarget: 'player',
						filter(Evt, player) {
							return Evt.player.$.tangyan_on;
						},
						content() {
							game.log(trigger.player, '受到的伤害被', player, '防止');
							trigger.player.$.tangyan_on = false;
							trigger.cancel();
							game.delayx()
						}
					},
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 29,
						forced: true,
						silent: true,
						popup: false,
						content() {
							if (player.$.tangyan && player.$.tangyan.length) {
								player.$.tangyan.length = 0;
							}
						}
					}
				}
			},
			tianyin: {
				audio: 5,
				enable: 'phaseUse',
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = true;
				},
				filter(Evt, player) {
					return player.countCards('h')
				},
				filterCard: true,
				prepare: 'give',
				discard: false,
				lose: false,
				filterTarget(card, player, target) {
					return target != player;
				},
				content() {
					player.damage('nosource');
					targets[0].gain(cards[0], player).gaintag.add('xinjia');
				},
				ai: {
					combo: 'tangyan',
					order(skill, player) {
						if (player.isDamaged()) return 0;
						if (player.isHealthy() && player.needsToDiscard()) {
							if (player.$.tangyan_on) return 5;
							return 10;
						}
						return 0;
					},
					result: {
						player(player, target) {
							if (player.$.tangyan_on) return 0;
							if (player.isDamaged()) return -2;
							return -0.5
						},
						target(player, target) {
							if (target.hasSkillTag('nogain')) return 0;
							if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
								if (target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if (target.hasJudge('lebu')) return 0;
							var nh = target.countCards('h');
							var np = player.countCards('h');
							if (player.hp == player.maxHp || player.countCards('h') <= 1) {
								if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1, 5 - nh);
						}
					},
					effect: {
						target(card, player, target) {
							if (player == target && get.type(card) == 'equip' && player.isHealthy()) {
								if (player.countCards('e', { subtype: get.subtype(card) })) {
									var players = game.filterPlayer();
									for (var i = 0; i < players.length; i++) {
										if (players[i] != player && get.attitude(player, players[i]) > 0) {
											return 0;
										}
									}
								}
							}
						}
					},
					threaten: 0.1,
				},
			},
			ai: {
				audio: 7,
				priority: -10,
				trigger: {
					global: 'roundStart'
				},
				onremove(player) {
					delete player.$.ai;
				},
				forced: true,
				skillList: ['ai_xu', 'ai_po', 'ai_ji', 'ai_zhong'],
				content() {

					'step 0'
					//对点数最少的一名角色造成1点伤害，清空所有点数
					var players = game.players.slice(0);
					Evt.players = players;

					var minPoint = Infinity;
					for (var i = 0; i < players.length; ++i) {
						if (!players[i].hasSkill('ai_point')) players[i].addSkill('ai_point');
						var point = players[i].$.ai_point.point;
						if (point < minPoint) minPoint = point;
					}

					var minPointPlayers = [];
					for (var i = 0; i < players.length; ++i) {
						if (players[i].$.ai_point.point == minPoint) {
							minPointPlayers.push(players[i]);
						}
					}
					if (!player.$.ai) {
						player.$.ai = true;
						Evt.goto(2);
						return;
					}
					if (minPointPlayers.length > 1) {
						player.chooseTarget('选择一个角色，给其一点伤害', true, function (card, player, target) {
							return _status.event.minPointPlayers.contains(target);
						}).set('ai', function (target) {
							var player = _status.event.player;
							return get.damageEffect(target, player, player);
						}).set('minPointPlayers', minPointPlayers);
					} else if (minPointPlayers.length == 1) {
						Evt._result = { bool: true, targets: minPointPlayers };
					} else {
						Evt._result = { bool: false };
					}
					'step 1'
					if (result.targets) result.targets[0].damage();
					for (var i = 0; i < Evt.players.length; ++i) {
						//清空所有点数
						Evt.players[i].$.ai_point.point = 0;
						Evt.players[i].syncStorage('ai_point');
						Evt.players[i].markSkill('ai_point');

					}
					'step 2'
					var skillList = [];

					for (var i = 0; i < lib.skill.ai.skillList.length; ++i) {
						var skill = lib.skill.ai.skillList[i];
						if (!lib.skill.global.contains(skill) && skill != 'ai_point') {
							skillList.push(skill);
						}
					}
					Evt.set('skillList', skillList);
					if (skillList.length > 1) {
						Evt.videoId = lib.status.videoId++;
						game.broadcastAll(function (id, skillList) {
							var dialog = ui.create.dialog('令所有角色获得以下一项效果');
							dialog.forcebutton = true;
							dialog.videoId = id;
							for (var i = 0; i < skillList.length; ++i) {
								dialog.add(
									'<div class="popup text" style="width:calc(100% - 10px);display:inline-block">'
									+ get.translation(skillList[i]) + '<font class="firetext">▷</font>' + get.skillInfoTranslation(skillList[i])
									+ '</div>'
								);
							}
							dialog.op
						}, Evt.videoId, skillList);

						console.log('before chooseControl');
						player.chooseControl(skillList, true).set('ai', function (button) {
							return _status.event.aiChoice;
						}).set('aiChoice', skillList.randomGet());


					} else if (skillList.length == 1) {
						Evt._result = { bool: true, control: skillList[0] };
					} else {
						Evt.finish();
					}
					'step 3'
					if (typeof Evt.videoId != 'undefined') game.broadcastAll('closeDialog', Evt.videoId);
					//添加为全局效果
					var players = game.players.slice(0);

					//效果，终，初始化

					if (result.control == 'ai_zhong') {
						var zhongMark = {
							x: players.length + 1,
							usedCardCount: 0
						};
						var deadMark = {
							lastDeadList: [],
						};
						game.addGlobalSkill('ai_zhong_deadSkillTrigger');
						game.addGlobalSkill('ai_zhong_onplayerdie');
						for (var i = 0; i < players.length; ++i) {
							players[i].addSkill('ai_zhongMark');
							players[i].$.ai_zhongMark = zhongMark;
							player.syncStorage('ai_zhongMark');
							players[i].$.ai_deadMark = deadMark;
							player.syncStorage('ai_deadMark');
						}
						var deadPlayers = game.dead.slice(0);
						for (var i = 0; i < deadPlayers.length; ++i) {
							lib.skill.ai_zhong.syncDeadPlayer(deadPlayers[i]);
						}

					} else {
						Evt.finish();
					}
					var skills = game.expandSkills([result.control]);
					for (var i = 0; i < skills.length; ++i) {
						if (skills[i]) game.addGlobalSkill(skills[i]);
					}

					//记录已使用的技能

					for (var i = 0; i < players.length; ++i) {
						players[i].$.ai_point.skillList.push(result.control);
					}
					if (result.control == 'ai_zhong') {
						//生成dialog
						Evt.firstNum = game.countPlayer() + 1;
						var firstNum = Evt.firstNum;

						var cards = [];

						var leftCard = game.createCard('👈', 'noclick', '');
						cards.push(leftCard);

						for (var i = 0; i < 10; ++i) {
							var card = game.createCard('' + (i + firstNum), 'noclick', '');
							cards.push(card);
						}

						var rightCard = game.createCard('👉', 'noclick', '');
						cards.push(rightCard);

						Evt.cards = cards;
						Evt.videoId = lib.status.videoId++;
						let func = function (id, cards) {
							var firstNum = game.countPlayer() + 1;


							var dialog = ui.create.dialog('选择一个数字', [cards, 'card'], 'hidden');
							dialog.videoId = id;
							for (var i = 0; i < dialog.buttons.length; ++i) {
								dialog.buttons[i].childNodes[1].style.visibility = 'hidden';
								dialog.buttons[i].childNodes[2].style.visibility = 'hidden';
								dialog.buttons[i].childNodes[3].style.visibility = 'hidden';
								dialog.buttons[i].node.background.innerHTML = dialog.buttons[i].name;
							}
							dialog.open();
						};

						if (player.isOnline2()) {
							player.send(func, Evt.videoId, cards);
						}
						else {
							func(Evt.videoId, cards);
						}
					}


					'step 4'
					//生成十个数字牌
					var firstNum = Evt.firstNum;
					if (firstNum <= game.countPlayer()) firstNum = game.countPlayer() + 1;
					Evt.firstNum = firstNum;
					let func = function (id, firstNum, hiddenLeft) {
						var dialog = get.idDialog(id);
						if (!dialog) return;
						if (hiddenLeft) {
							dialog.buttons[0].style.display = 'none';
						} else {
							dialog.buttons[0].style.display = '';
						}
						for (var i = 1; i < dialog.buttons.length - 1; ++i) {
							dialog.buttons[i].name = '' + (firstNum + i - 1);
							dialog.buttons[i].link.name = '' + (firstNum + i - 1);
							dialog.buttons[i].node.background.innerHTML = dialog.buttons[i].name;
						}
					};
					if (player.isOnline2()) {
						player.send(func, Evt.videoId, firstNum, firstNum == game.countPlayer() + 1);
					} else {
						func(Evt.videoId, firstNum, firstNum == game.countPlayer() + 1);
					}
					for (let i = 1; i < Evt.cards.length - 1; ++i) {
						Evt.cards[i].name = (firstNum + i - 1);
					}

					'step 5'

					player.chooseButton(true).set('dialog', Evt.videoId).set('ai', function (button) {
						if (button.link.name == '👈') {
							if (button.style.display != 'none') return Infinity;
							else return -50;
						} else if (button.link.name == '👉') {
							return -10;
						}
						return 100 / parseInt(button.link.name);
					});
					'step 6'
					var x = parseInt(result.links[0].name);
					if (!isNaN(x)) {
						if (player.isOnline2()) {
							player.send('closeDialog', Evt.videoId);
						} else {
							var dialog = get.idDialog(Evt.videoId);
							if (dialog) dialog.close();
						}
						//为技能 终 设置X
						player.$.ai_zhongMark.x = x;
						var players = game.players.slice(0);
						for (var i = 0; i < players.length; ++i) {
							player.syncStorage('ai_zhongMark');
							players[i].markSkill('ai_zhongMark');
						}
					} else {
						if (result.links[0].name == '👈') {
							Evt.firstNum -= 10;
						} else {
							Evt.firstNum += 10;
						}
						Evt.goto(4);
					}
				},
				group: 'ai_extraPoint',
				subSkill: {
					point: {
						marktext: '爱',
						mark: true,
						init(player) {
							if (!player.$.ai_point) {
								player.$.ai_point = {};
							}
							if (typeof player.$.ai_point.point != 'number') player.$.ai_point.point = 0;
							if (!Array.isArray(player.$.ai_point.skillList)) player.$.ai_point.skillList = [];
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
						},

						intro: {
							name: '爱',
							content: 'mark',
							mark(dialog, storage, player) {
								if (storage.skillList.length > 0) {
									dialog.addText('获得的效果：');
									for (var i = 0; i < storage.skillList.length; ++i) {
										dialog.add('<div><div class="skill firetext">' + get.translation(storage.skillList[i]).slice(0, 2) + '</div><div>'
											+ get.skillInfoTranslation(storage.skillList[i], player) + '</div></div>'
										);
									}
								}

								if (storage.point > 0) dialog.addText('共有' + get.cnNumber(storage.point) + '个「●标记」');
								else dialog.addText('没有「●标记」');
							},
							markcount(storage, player) {
								return storage && storage.point;
							}
						},

					},
					zhongMark: {
						marktext: '终',
						mark: true,
						intro: {
							name: '终',
							content: 'mark',
							mark(dialog, storage, player) {
								dialog.addText('每第' + get.cnNumber(storage.x) + '张牌之使用者+❸');
								if (!storage) return;
								dialog.addText('已使用' + get.cnNumber(storage.usedCardCount) + '牌');
								dialog.addText('距离下一次触发还需使用' + get.cnNumber(storage.x - storage.usedCardCount % storage.x) + '张牌');
							},
							markcount(storage, player) {
								if (!storage) return;
								return storage.x - storage.usedCardCount % storage.x;
							}
						}
					},
					extraPoint: {
						trigger: {
							player: 'addAiPoint'
						},
						direct: true,
						filter(Evt, player) {
							return player.hasSkill('ai_point');
						},
						content() {
							player.$.ai_point.point += 1;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
						}
					}
				}
			},
			ai_xu: {
				init(player) {
					// player.addSkill('ai_point');//test
				},
				group: ['ai_xu_ongain', 'ai_xu_ondiscard', 'ai_xu_onPhaseEnd', 'ai_xu_onblacksha'],
				subSkill: {
					//一个阶段内首次获得牌的角色
					ongain: {
						trigger: {
							player: ['gainBegin']
						},
						filter(Evt, player) {
							if (game.countPlayer(cur => cur.hasSkill('ai_point') && !cur.$.ai_xu_ongain)) return true;
							return false;
						},
						direct: true,
						content() {
							player.$.ai_xu_ongain = true;
						}
					},
					//一个阶段内首次失去牌的角色
					ondiscard: {
						trigger: {
							player: 'discardBegin'
						},
						direct: true,
						filter(Evt, player) {
							if (game.countPlayer(cur => cur.hasSkill('ai_point') && !cur.$.ai_xu_ondiscard)) return true;
							return false;
						},
						content() {
							player.$.ai_xu_ondiscard = true;
						}
					},
					//一个阶段内首次获得牌的角色+❶，失去牌的–❶。
					onPhaseEnd: {
						trigger: {
							player: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
						},
						priority: 257,
						direct: true,
						content() {
							var players = game.players.slice(0);
							for (var i = 0; i < players.length; ++i) {
								if (players[i].$.ai_xu_ongain) {
									players[i].$.ai_point.point += 1;
									if (players[i].hasSkill('ai_extraPoint')) players[i].$.ai_point.point += 1;
									players[i].syncStorage('ai_point');
									players[i].markSkill('ai_point');
								}
								delete players[i].$.ai_xu_ongain;
								if (players[i].$.ai_xu_ondiscard && players[i].$.ai_point.point >= 1) {
									players[i].$.ai_point.point -= 1;
									players[i].syncStorage('ai_point');
									players[i].markSkill('ai_point');
								}
								delete players[i].$.ai_xu_ondiscard;
							}

						}
					},
					//你可以–❷以抵消黑色【杀】。
					onblacksha: {
						trigger: {
							target: 'shaBefore'
						},
						filter(Evt, player) {
							return player.hasSkill('ai_point') && Evt.card && get.color(Evt.card) == 'black' && player.$.ai_point.point >= 2;
						},
						content() {
							player.$.ai_point.point -= 2;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							trigger.cancel();
						},
						ai: {
							respondShan: true,
						}
					}
				}
			},
			ai_po: {
				group: ['ai_po_onhurt', 'ai_po_onphaseJieshu'],
				subSkill: {
					onhurt: {
						trigger: {
							source: 'damageSource'
						},
						forced: true,
						filter(Evt, player) {
							return player.hasSkill('ai_point');
						},
						content() {
							player.$.ai_point.point += 3;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							Evt.trigger('addAiPoint');
						}
					},
					onphaseJieshu: {
						trigger: {
							player: 'phaseJieshu'
						},
						filter(Evt, player) {
							return player.hasSkill('ai_point') && player.$.ai_point.point >= 4;
						},
						content() {
							'step 0'
							player.$.ai_point.point -= 4;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							//移动场上的一张牌
							player.moveCard(true);
						},
						check(Evt, player) {
							var players = game.players.slice(0);
							for (var i = 0; i < players.length; ++i) {
								var target = players[i];
								var att = get.attitude(player, target);
								var sgnatt = get.sgn(att);
								if (att > 0) {
									if (!_status.event.nojudge
										&& target.countCards('j', card => game.hasPlayer(cur => cur != target && cur.canAddJudge(card) && get.attitude(player, cur) < 0))) return true;
									if (target.countCards('e', card => get.value(card, target) < 0
										&& game.hasPlayer(cur => cur != target
											&& get.attitude(player, cur) < 0 && cur.isEmpty(get.subtype(card))
											&& get.effect(target, card, player, player) < 0))) return true;
								}
								else if (att < 0) {
									if (game.hasPlayer(cur => {
										if (cur != target && get.attitude(player, cur) > 0) {
											var es = target.getCards('e');
											for (var i = 0; i < es.length; i++) {
												if (get.value(es[i], target) > 0 && cur.isEmpty(get.subtype(es[i])) && get.effect(cur, es[i], player, player) > 0) return true;
											}
										}
									})) {
										return true;
									}
								}
							}
							return false;
						}
					}
				}
			},
			ai_ji: {
				group: ['ai_ji_ondiscard', 'ai_ji_onusecard'],
				subSkill: {
					//准备阶段，弃置任意牌以获得两倍的●
					ondiscard: {
						trigger: {
							player: 'phaseZhunbei'
						},
						filter(Evt, player) {
							return player.hasSkill('ai_point') && player.getCards('he').length > 0;
						},
						content() {
							'step 0'
							player.chooseToDiscard('he', '弃置任意牌', [1, Infinity], true)
								.set('ai', card => {
									return 1 - get.value(card);
								});
							'step 1'
							if (result.bool && result.cards.length > 0) {
								player.$.ai_point.point += result.cards.length * 2;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
								Evt.trigger('addAiPoint');
							}
						}

					},
					//你可以–❷为你使用的牌增加或减少一名目标。
					onusecard: {
						trigger: {
							player: 'useCard2'
						},
						filter(Evt, player) {
							if (!player.hasSkill('ai_point') || player.$.ai_point.point < 2) return false;
							if (!Evt.targets || !Evt.targets.length) return false;
							var info = get.info(Evt.card);
							if (info.allowMultiple == false) return false;
							if (Evt.targets && !info.multitarget) {
								if (game.hasPlayer(cur => {
									return !Evt.targets.contains(cur) && lib.filter.targetEnabled2(Evt.card, player, cur) && lib.filter.targetInRange(Evt.card, player, cur);
								})) {
									return true;
								}
							}
							return false;
						},
						content() {
							'step 0'
							//–❷
							player.$.ai_point.point -= 2;
							player.syncStorage('ai_point');
							player.markSkill('ai_point');
							//为你使用的牌增加或减少一名目标
							var prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标'
							player.chooseTarget(get.prompt('ai_ji'), function (card, player, target) {
								var player = _status.event.player;
								if (_status.event.targets.contains(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
							}).set('prompt2', prompt2).set('ai', function (target) {
								var trigger = _status.event.getTrigger();
								var player = _status.event.player;
								return get.effect(target, trigger.card, player, player) * (_status.event.targets.contains(target) ? -1 : 1);
							}).set('targets', trigger.targets).set('card', trigger.card);
							'step 1'
							if (result.bool) {
								if (!Evt.isMine()) game.delayx();
								Evt.targets = result.targets;
							}
							else {
								Evt.finish();
							}
							'step 2'
							if (Evt.targets) {
								player.logSkill('ai_ji', Evt.targets);
								if (trigger.targets.contains(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
								else trigger.targets.addArray(Evt.targets);
							}
						}
					}
				}
			},
			ai_zhong: {
				group: ['ai_zhong_onusexcard'],
				subSkill: {
					onusexcard: {
						trigger: {
							player: 'useCard1'
						},
						direct: true,
						filter(Evt, player) {
							return player.hasSkill('ai_point') && player.hasSkill('ai_zhongMark');
						},
						content() {
							'step 0'
							var players = game.players.slice(0);
							var storage;
							for (var i = 0; i < players.length; ++i) {
								if (players[i].$.ai_zhongMark) {
									storage = players[i].$.ai_zhongMark;
									break;
								}
							}
							if (!storage) {
								var skills = get.expandSkills('ai_zhong');
								for (var i = 0; i < skills.length; ++i) {
									game.removeGlobalSkill(skills[i]);
								}
								for (var i = 0; i < players.length; ++i) {
									delete players[i].$.ai_zhongMark;
								}
								Evt.finish();
								return;
							}
							++storage.usedCardCount;

							for (var i = 0; i < players.length; ++i) {
								if (!players[i].$.ai_zhongMark) {
									players[i].$.ai_zhongMark = storage;
								}
								players[i].syncStorage('ai_zhongMark');
								players[i].markSkill('ai_zhongMark');
							}


							if (storage.usedCardCount % storage.x == 0) {
								player.$.ai_point.point += 3;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
								Evt.trigger('addAiPoint');
							}
						}
					},
					onplayerdie: {
						trigger: {
							global: 'dieAfter'
						},
						direct: true,
						content() {
							var diePlayer = trigger.player;
							lib.skill.ai_zhong.syncDeadPlayer(diePlayer);
						}
					},
					deadSkillTrigger: {
						trigger: {
							player: []
						},
						filter(Evt, player) {
							return player.hasSkill('ai_point');
						},
						direct: true,
						content() {
							'step 0'
							if (!player.$.ai_point || player.$.ai_point.point < 3) {
								trigger.cancel();
								Evt.finish();
								return;
							}
							player.chooseBool('是否–❸以触发' + get.translation(trigger.name) || '技能' + '？').set('ai', function () {
								return Math.random() >= 0.5;
							});
							'step 1'
							if (result.bool) {
								player.$.ai_point.point -= 3;
								player.syncStorage('ai_point');
								player.markSkill('ai_point');
							} else {
								trigger.cancel();
							}
						}
					}
				},
				banned: [],
				characterFilter(character) {//true is right.
					return character.indexOf('KizunaAI') == -1 && !lib.skill.ai_zhong.banned.contains(character);
				},
				bannedSkill: [],
				skillFilter(skill) {//true is right.
					if (lib.character['sp_KizunaAI'][3].contains(skill) || lib.skill.ai_zhong.bannedSkill.contains(skill)) {
						return false;
					}
					var info = lib.skill[skill];
					if (!info) return false;
					if (info.charlotte || (info.unique && !info.gainable) || info.juexingji || info.limited || info.zhuSkill || info.hiddenSkill) return false;
					return true;
				},
				syncDeadPlayer(diePlayer) {
					//filter character
					if (!lib.skill.ai_zhong.characterFilter(diePlayer.name)) return;

					//获取 ai_deadMark
					var storage;
					var players = game.players.slice(0);
					var storagePlayer;
					for (var i = 0; i < players.length; ++i) {
						if (players[i].$.ai_deadMark) {
							storage = players[i].$.ai_deadMark;
							storagePlayer = players[i];
							break;
						}
					}

					//获取lastDeadList
					var lastDeadList = storage.lastDeadList;
					var addPlayer = function (player) {
						lastDeadList.add(player);
						var skills = lib.character[player.name][3];
						for (var i = 0; i < skills.length; ++i) {
							var skill = skills[i];
							//filter skill
							if (!lib.skill.ai_zhong.skillFilter(skill)) continue;
							var info = lib.skill[skill];
							if (!info) continue;
							if (info.trigger) {
								for (var i = 0; i < players.length; ++i) {
									players[i].addSkill(skill);
								}
								var setTrigger = function (i, evt) {
									var name = i + '_' + evt;
									if (!lib.hook.globalskill[name]) {
										lib.hook.globalskill[name] = [];

									}
									lib.skill.ai_zhong.subSkill.deadSkillTrigger.trigger.player.push(skill + 'Before');
									lib.hook.globalskill[name].add('ai_zhong_deadSkillTrigger');
									lib.hookmap[evt] = true;
								}
								setTrigger('player', skill + 'Before');
							}
						}
					};
					var removePlayer = function (player) {
						var skills = lib.character[player.name][3];

						for (var j = 0; j < skills.length; ++j) {
							if (!lib.skill.ai_zhong.skillFilter(skills[j])) continue;
							for (var i = 0; i < players.length; ++i) {
								if (players[i] == player) continue;
								players[i].removeSkill(skills[j]);
							}
							var name = 'player_' + skills[j] + 'Before';
							lib.skill.ai_zhong.subSkill.deadSkillTrigger.trigger.player.remove(skills[j] + 'Before');
							if (lib.hook.globalskill[name]) lib.hook.globalskill[name].remove('ai_zhong_deadSkillTrigger');
						}
						lastDeadList.remove(player);
					};
					//添加死亡角色
					if (diePlayer.isDead() && !lastDeadList.contains(diePlayer)) {
						addPlayer(diePlayer);
					}
					//删除复活角色
					for (var i = 0; i < lastDeadList.length; ++i) {
						if (!lastDeadList[i].isDead()) {
							removePlayer(lastDeadList[i]);
						}
					}

					for (var i = 0; i < players.length; ++i) {
						if (!players[i].$.ai_deadMark) {
							players[i].$.ai_deadMark = storage;
							players[i].syncStorage('ai_deadMark');
						}
					}
					storagePlayer.syncStorage('ai_deadMark');
				}
			},
			ban: {
				audio: 2,
				priority: 256,
				frequent: true,
				trigger: {
					global: 'roundEnd'
				},
				filter(Evt, player) {
					if (game.hasPlayer(cur => cur.hasSkill('ai_point'))) return true;
					return false;
				},
				check(Evt, player) {
					var friends = player.getFriends(true);
					var players = game.players.slice(0);
					var sameGroupCount = 0;
					var othersCount = 0;
					for (var i = 0; i < players.length; ++i) {
						if (friends.contains(players[i])) {
							if (players[i].$.ai_point) sameGroupCount += players[i].$.ai_point.point;
						} else {
							if (players[i].$.ai_point) othersCount += players[i].$.ai_point.point;
						}
					}
					return sameGroupCount > 0 && sameGroupCount > othersCount * 2;
				},
				content() {
					'step 0'
					//你可以令与你同阵营的角色亮出身份牌
					var friends = player.getFriends(true);
					Evt.friends = friends;
					for (var i = 0; i < friends.length; i++) {
						if (friends[i].identityShown) continue;
						if (friends[i].showIdentity) friends[i].showIdentity();
					}
					'step 1'
					game.delay();
					'step 2'
					var friends = Evt.friends;
					var players = game.players.slice(0);
					var sameGroupCount = 0;
					var othersCount = 0;
					for (var i = 0; i < players.length; ++i) {
						if (friends.contains(players[i])) {
							if (players[i].$.ai_point) sameGroupCount += players[i].$.ai_point.point;
						} else {
							if (players[i].$.ai_point) othersCount += players[i].$.ai_point.point;
						}
					}
					//若你们●的合计值大于其他阵营●的两倍，获得胜利。
					if (sameGroupCount > 0 && sameGroupCount > othersCount * 2) {
						var func = game.checkOnlineResult;
						game.checkOnlineResult = function (player) {
							return Evt.friends.contains(player);
						};
						game.over(game.checkOnlineResult(game.me));
						game.checkOnlineResult = func;
					}

				}
			},
			tuqi: {
				audio: 6,
				trigger: { target: 'useCardToTarget' },
				forced: true,
				filter(Evt, player) {
					var name = get.translation(get.name(Evt.card));
					if (typeof name == 'string') return true;
				},
				content() {
					'step 0'
					var name = get.translation(get.name(trigger.card));
					if (name.length > player.hp) {
						trigger.excluded.add(player);
					}
					if (name.length <= player.hp) {
						player.draw();
					}
					'step 1'
					if (trigger.getParent().targets && trigger.getParent().targets.filter(cur => cur.isIn()).length == 1
						&& game.countPlayer(cur => {
							var source = Evt.getTrigger().player;
							var targets = Evt.getTrigger().targets;
							var card = Evt.getTrigger().card;
							return cur.isIn() && lib.filter.targetEnabled2(card, source, cur) && !targets.contains(cur);
						})) {
						var prompt2 = '为' + get.translation(trigger.card) + '增加一个目标';
						player.chooseTarget().set('filterTarget', function (card, player, target) {
							var source = _status.event.getTrigger().player;
							var targets = _status.event.getTrigger().targets;
							var card = _status.event.getTrigger().card;
							return lib.filter.targetEnabled2(card, source, target) && !targets.contains(target);
						}).set('prompt2', prompt2).set('ai', function (target) {
							var player = _status.event.player;
							var source = _status.event.getTrigger().player;
							var card = _status.event.getTrigger().card;
							return get.effect(target, card, source, player);
						});
					}
					'step 2'
					if (result.bool) {
						if (!Evt.isMine()) game.delayx();
						Evt.targets = result.targets;
					}
					else {
						Evt.finish();
					}
					'step 3'
					if (result.bool && result.targets) {
						player.logSkill('tuqi', Evt.targets);
						trigger.getParent().targets.addArray(Evt.targets);
					}
				},
				ai: {
					threaten(player, target) {
						if (target.hp == 1) return 1.5;
					},
					effect: {
						target(card, player, target, current) {
							var name = get.translation(get.name(card));
							if (name.length > target.hp) {
								return [0.1, 0.5];
							}
							if (name.length <= target.hp) {
								return [1, 1];
							}
						}
					}
				}
			},
			shizu: {
				audio: 6,
				trigger: { source: 'damageEnd' },
				forced: true,
				filter(Evt, player) {
					var name = get.translation(Evt.player);
					if (typeof name == 'string' && Evt.player.isIn()) return true;
				},
				logTarget: 'player',
				content() {
					'step 0'
					var name = get.translation(trigger.player);
					if (name.length > player.countCards('h')) player.swapHandcards(trigger.player);
					if (name.length <= player.countCards('h')) player.swapEquip(trigger.player);
				}
			},
		},
		dynamicTranslate: {
			liuxuan(player) {
				var str = '锁定技 游戏开始时，你处于「拉胯」姿态（对应<4>）。你使用或打出一张点数为3/4/5/7倍数的牌时，进入「活力」/「害羞」/「犟嘴」/「可爱」姿态（若同时满足则选择先进入其中一个然后切换至另一个）；使用或打出其它点数牌的时，回到「拉胯」姿态。'
				switch (player.$.liuxuan) {
					case 'liuxuan_lakua': return str.replace(/「拉胯」/g, '<span class="changetext">「拉胯」</span>');
					case 'liuxuan_huoli': return str.replace('「活力」', '<span class="changetext">「活力」</span>');
					case 'liuxuan_haixiu': return str.replace('「害羞」', '<span class="changetext">「害羞」</span>');
					case 'liuxuan_jiangzui': return str.replace('「犟嘴」', '<span class="changetext">「犟嘴」</span>');
					case 'liuxuan_keai': return str.replace('「可爱」', '<span class="changetext">「可爱」</span>');
				}
				return;
			},
		},
		translate: {
			sp_KaguraMea: `皇·神乐めあ`,
			zhigao: `至高权柄`,
			zhigao_info: `<font color=#dfb>限定技</font> 回合内，一名已受伤角色体力值变化时，你可以令此变化改为等量的体力上限变化。`,
			tiangou: `天狗食日`,
			tiangou_info: `一轮开始时，你可以声明一个未声明过的主要阶段并选择一名角色。本轮内只有其能执行此阶段。若均已声明，重置你的所有技能。`,

			sp_MinatoAqua: `皇·湊阿库娅`,
			shenghuang: `圣皇之愈`,
			shenghuang_info: `锁定技 当你进入濒死状态时，更换新的体力牌。<br>
			你失去过黑色牌的回合结束时，其他角色将体力回复至回合开始时的状态。`,
			renzhan: `瞬息刃斩`,
			renzhan_info: `每回合限一次。其他角色受到伤害后，你可以失去1点体力，亮出牌堆顶牌直到出现【杀】，选择一项：<br>
			获得亮出牌；获得其中的【杀】并对一名角色使用任意张【杀】，直到其进入濒死状态。`,
			kuase: `夸色梦想`,
			kuase_info: `<font color=#f5c>限定技</font> 一个回合结束时，若有角色在该回合内回复体力，你可以摸X张牌然后执行一个额外的出牌阶段。（X为所有角色本回合回复的体力值之和）`,

			sp_MononobeAlice: `皇·物述有栖`,
			xianjing: `仙境奇遇`,
			xianjing_info: `当你使用一张牌后，若与本回合被使用的上一张牌在Alice序列（♥️、♠️、♦️、♣️、♥️......）中连续，你可以令一名角色摸一张牌。<br>
			一个回合结束时，若此回合进入弃牌堆的牌包含所有花色，你可选择一项：<br>
			令一名其他角色获得「小兔子」标记；令所有「小兔子」各摸一张牌。`,
			chahui: `茶会交流`,
			chahui_info: `你于出牌阶段使用牌后，可以令一名小兔子选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌改为由你使用。<br>
			小兔子于出牌阶段使用牌后也可以对你如此做。`,
			duandai: `嚣张缎带`,
			duandai_info: `回合结束时，若本回合你使用牌完成过一组Alice序列，你可以回复所有体力。`,
			xiaotuzi: `小兔子`,
			xiaotuzi_info: `成为了爱丽丝的小兔子，于出牌阶段使用牌后，可以令一名爱丽丝选择是否使用一张牌，若其因此使用的牌与上一张牌在Alice序列中连续，此牌改为由你使用`,

			sp_UsadaPekora: `皇·兔田佩克拉`,
			tuqi: `兔起乌沉`,
			tuqi_info: `锁定技 牌名字数大于/不大于你体力的牌指定你为目标时，你令其对你无效/摸一张牌，若你为唯一目标，你可以为之指定额外目标。`,
			shizu: `簪缨世族`,
			shizu_info: `锁定技 武将名字数大于/不大于你手牌数的角色受到你造成的伤害时，你与其交换手牌/装备区的牌。`,


			sp_Diana: `皇·嘉然`,
			tangyan: `穿心糖言`,
			tangyan_info: `若你已受伤，你使用、打出或弃置一张基本牌后，可以选择一项：<br>
			1.令一名角色摸一张牌
			2.防止一名角色下一次受到的伤害
			3.视为使用一张本回合未以此法使用过的基本牌`,
			tianyin: `万象天引`,
			tianyin_info: `出牌阶段，你可以受到1点无来源的伤害，并将一张手牌交给一名其他角色，此牌称为「心嘉」牌。在持有「心嘉」牌角色的回合中，你发动『穿心糖言』改为依次执行所有选项。`,
			xinjia: `心嘉`,

			sp_Ava: `皇·向晚`,
			shuimu: `降雨水母`,
			shuimu_info: `锁定技 你首次受到伤害前没有体力牌。首次受到伤害后，你获得当前姿态对应的体力牌。`,
			liuxuan: `无限溜旋`,
			liuxuan_info:
				`锁定技 游戏开始时，你处于「拉胯」姿态（对应<4>）。你使用或打出一张点数为3/4/5/7倍数的牌时，进入「活力」/「害羞」/「犟嘴」/「可爱」姿态（若同时满足则选择先进入其中一个然后切换至另一个）；使用或打出其它点数牌的时，回到「拉胯」姿态。<br>
				<br><span class="yellowtext">拉胯</span>：其他角色计算与你的距离-1。
				<br><span class="legendtext">活力</span>：你的锦囊牌无法被抵消；离开此姿态时，你摸一张牌。
				<br><span class="greentext">害羞</span>：你造成或受到的伤害+1，你的手牌无法被其他角色获得或弃置。
				<br><span class="firetext">犟嘴</span>：进入此姿态时，你令其他角色交给你一张牌，然后你展示一张手牌，令之点数+1或-1。
				<br><span class="thundertext">可爱</span>：进入此姿态时摸三张牌；你造成的伤害翻倍；离开此姿态时，将你的体力值调整为当前的一半（向上取整），若没有体力牌，你死亡。`,

			liuxuan_plus: `溜旋:+1`,
			liuxuan_lose: `溜旋:-1`,
			liuxuan_plus2: `溜旋:+2`,
			liuxuan_lose2: `溜旋:-2`,

			liuxuan_lakua: `拉胯`,
			liuxuan_lakua_describe: `其他角色计算与你的距离-1。`,
			liuxuan_huoli: `活力`,
			liuxuan_huoli_describe: `你的锦囊牌无法被抵消；离开此姿态时，你摸一张牌。`,
			liuxuan_haixiu: `害羞`,
			liuxuan_haixiu_describe: `你造成或受到的伤害+1，你的手牌无法被其他角色获得或弃置。`,
			liuxuan_jiangzui: `犟嘴`,
			liuxuan_jiangzui_describe: `进入此姿态时，你令其他角色交给你一张牌，然后你展示一张手牌，令之点数+1或-1。`,
			liuxuan_keai: `可爱`,
			liuxuan_keai_describe: `进入此姿态时摸三张牌；你造成的伤害翻倍；离开此姿态时，将你的体力值调整为当前的一半（向上取整），若没有体力牌，你死亡。`,


			sp_KizunaAI: `皇·绊爱`,
			ai: `爱`,
			ai_info:
				`一轮开始时，你对●最少的一名角色造成1点伤害，清空所有●，然后令所有角色获得以下一项效果：
				<br>序<span class="firetext">▷</span>一个阶段内首次获得牌的角色+❶，失去牌的–❶。你可以–❷以抵消黑色【杀】。
				<br>破<span class="firetext">▷</span>每次造成伤害时+❸。结束阶段，你可以–❹以移动场上一张牌。
				<br>急<span class="firetext">▷</span>准备阶段，弃置任意牌以获得两倍的●。你可以–❷为你使用的牌增加或减少一名目标。
				<br>终<span class="firetext">▷</span>皇·绊爱声明一个大于存活角色数的数字X，从现在开始每第X张牌之使用者+❸，你可以–❸以触发一项已死亡角色的通常技。
				<br>你每次获得●时，额外+❶。`,
			ai_xu: `序`,
			ai_xu_info: `一个阶段内首次获得牌的角色+❶，失去牌的–❶。你可以–❷以抵消黑色【杀】。`,
			ai_po: `破`,
			ai_po_info: `每次造成伤害时+❸。结束阶段，你可以–❹以移动场上一张牌。`,
			ai_ji: `急`,
			ai_ji_info: `准备阶段，弃置任意牌以获得两倍的●。你可以–❷为你使用的牌增加或减少一名目标。`,
			ai_zhong: `终`,
			ai_zhong_info: `皇·绊爱声明一个大于存活角色数的数字X，从现在开始每第X张牌之使用者+❸，你可以–❸以触发一项已死亡角色的通常技。`,
			ban: `绊`,
			ban_info: `一轮结束时，你可以令与你同阵营的角色翻开身份牌，若你们●的合计值大于其他阵营●的两倍，获得胜利。`
		},
	};
});
