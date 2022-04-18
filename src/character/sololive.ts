import oldSkill from './sololive_oldSkill'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return <currentObject>{
		name: "sololive",
		connect: true,
		character: {
			/**妮娅 */
			His_HoshinoNiya: ['female', 'qun', 3, ['shushi', 'zengzhi'], ['guoV']],
			/**茜科塞尔 */
			Qiankesaier: ['male', 'qun', 4, ['shuangshoujiaoying', 'anyingxuemai'], ['guoV']],
			/*黑川*/
			heichuan: ['none', 'qun', 3, ['zhengtibuming', 'lunhuizuzhou'], ['guoV']],//, 'mingyunniezao'
			/**雪团 */
			YukiTuan: ['female', 'qun', 4, ['chentu', 'sishu'], ['guoV']],
			/**三三 */
			Mikawa: ['male', 'qun', 4, ['zhezhuan', 'setu'], ['guoV']],
			/**樱井 */
			Sakurai: ['male', 'qun', 4, ['junxu', 'jingniang'], ['guoV']],

			/**旧艾琳 */
			old_Eilene: ['female', 'eilene', '4/6', ['duanfu', 'daichang', 'hongtu'], ['zhu']],
			/**旧因幡 */
			old_InabaHaneru: ['female', 'nanashi', 1, ['huangtu', 'wudao', 'yinyuan'], ['zhu']],
			/**旧花园猫 */
			old_HanazonoSerena: ['female', 'paryi', 3, ['old_jiumao', 'old_enfan', 'old_shiqi']],
			/**旧兔田佩克拉 */
			old_UsadaPekora: ['female', 'holo', 3, ['pekoyu', 'hongshaoturou']],
			/**旧Elu */
			old_Elu: ['female', 'nijisanji', 3, ['old_huangran', 'old_yinzhen', 'old_senhu']],

			/**gz莉泽 */
			gz_LizeHelesta: ['female', 'nijisanji', 3, ['tongchen', 'wangxuan']],
			/**gz安洁 */
			gz_AngeKatrina: ['female', 'nijisanji', 4, ['gz_lianjin']],
			/**向晚 */
			gz_Ava: ['female', 'vtuber', 4, ['baitai', 'gz_yiqu'], ['guoV']],
			/**兔妈妈 */
			gz_InabaHaneru: ['female', 'upd8', 3, ['gz_jiance', 'yingqi']],
			/**心萪 */
			gz_xinke: ['female', 'qun', 3, ['zuigao', 'xinhuochuancheng']],
			/**雪花菈米 */
			gz_YukihanaLamy: ['female', 'holo', 4, ['hanling']],
			/**语部纺 */
			gz_KataribeTsumugu: ['female', 'nijisanji', 3, ['lingli', 'chengfo']],
		},
		characterSort: {
			sololive: {
				KurokawaPresents: ['Qiankesaier', 'heichuan'],
				rewriteGuo: ['gz_LizeHelesta', 'gz_AngeKatrina', 'gz_Ava', 'gz_InabaHaneru', 'gz_xinke', 'gz_YukihanaLamy', 'gz_KataribeTsumugu'],
			},
		},
		skill: {
			...oldSkill,
			//向晚
			baitai: {
				audio: 'liuxuan_keai',
				trigger: { player: 'phaseBegin' },
				usable: 1,
				filter(Evt, player) {
					if (player.$.baitai_A !== 0) player.$.baitai_A = 0;
					if (player.$.baitai_B !== 0) player.$.baitai_B = 0;
					if (player.$.baitai_C !== 0) player.$.baitai_C = 0;
					if (player.$.baitai_D !== 0) player.$.baitai_D = 0;
					if (player.$.baitai_E !== 0) player.$.baitai_E = 0;
					return player.countCards('h');
				},
				content() {
					'step 0'
					player.showHandcards();
					'step 1'
					player.$.baitai_A += player.countCards('h', { suit: 'diamond' });
					player.markSkill('baitai_A');
					'step 2'
					player.$.baitai_B += player.countCards('h', { suit: 'club' });
					player.markSkill('baitai_B');
					'step 3'
					player.$.baitai_C += player.countCards('h', { suit: 'heart' });
					player.markSkill('baitai_C');
					'step 4'
					player.$.baitai_D += player.countCards('h', { suit: 'spade' });
					player.markSkill('baitai_D');
					'step 5'
					player.$.baitai_E += Math.min(player.$.baitai_A, player.$.baitai_B, player.$.baitai_C, player.$.baitai_D);
					if (player.$.baitai_E > 0) player.markSkill('baitai_E');
				},
				group: ['baitai_clear', 'baitai_A', 'baitai_B', 'baitai_C', 'baitai_D', 'baitai_E'],
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							return player.$.baitai_A || player.$.baitai_B || player.$.baitai_C || player.$.baitai_D || player.$.baitai_E;
						},
						content() {
							if (player.$.baitai_A !== 0) player.$.baitai_A = 0;
							if (player.$.baitai_B !== 0) player.$.baitai_B = 0;
							if (player.$.baitai_C !== 0) player.$.baitai_C = 0;
							if (player.$.baitai_D !== 0) player.$.baitai_D = 0;
							if (player.$.baitai_E !== 0) player.$.baitai_E = 0;
							player.unmarkSkill('baitai_A');
							player.unmarkSkill('baitai_B');
							player.unmarkSkill('baitai_C');
							player.unmarkSkill('baitai_D');
							player.unmarkSkill('baitai_E');
						}
					},
					A: {
						mod: {
							attackFrom(from, to, distance) {
								return distance - from.$.baitai_A;
							}
						},
						marktext: '歌',
						intro: { name: '百态', content: '本回合内攻击范围+#' },
					},
					B: {
						trigger: { player: 'phaseDrawBegin2' },
						forced: true,
						filter(Evt, player) {
							return !Evt.numFixed && player.$.baitai_B;
						},
						content() {
							var Buff = player.$.baitai_B;
							trigger.num += Buff;
						},
						marktext: '之',
						intro: { name: '百态', content: '摸牌阶段摸牌数+#' },
					},
					C: {
						mod: {
							maxHandcard(player, num) {
								var Buff = player.$.baitai_C;
								return num += Buff;
							},
						},
						marktext: '母',
						intro: { name: '百态', content: '本回合手牌上限+#' },
					},
					D: {
						mod: {
							cardUsable(card, player, num) {
								var Buff = player.$.baitai_D;
								if (card.name == 'sha' && player.isPhaseUsing()) return num + Buff;
							},
						},
						marktext: '水',
						intro: { name: '百态', content: '出牌阶段可使用【杀】的次数+#' },
					},
					E: {
						mod: {
							selectTarget(card, player, range) {
								console.log(card, range)
								if (!Array.isArray(range) || range[1] == -1) return;
								if (player.$.baitai_E > 0) range[1] += player.$.baitai_E;
							},
						},
						marktext: '🐚',
						intro: { name: '百态', content: '使用牌可指定的目标+#' },
					},
				}
			},
			gz_yiqu: {
				trigger: { player: 'damageAfter' },
				usable: 1,
				filter(Evt, player) {
					return Evt.source && player.countCards('he');
				},
				prompt2(Evt, player) {
					return '你可以交给' + get.translation(Evt.source) + '一张牌，然后摸两张牌';
				},
				content() {
					'step 0'
					player.chooseCard(true, 'he')
						.set('ai', card => {
							var att = _status.event.att;
							return 3 + att > get.value(card);
						})
						.set('att', get.attitude(player, trigger.source))
					'step 1'
					if (result.bool && result.cards) {
						player.give(result.cards, trigger.source, 'giveAuto');
						player.draw(2);
					}
				},
			},
			//皇女
			tongchen: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return game.hasPlayer(cur => {
						if (player.inRange(cur)) {
							return player.countCards('h') != cur.countCards('h')
							||player.countCards('e') != cur.countCards('e')
							|| player.countCards('j') != cur.countCards('j')
						}
						return false;
					});
				},
				content() {
					'step 0'
					let next = player.moveCard(function (card, player, target) {
						if (target == player) return true;
						if (ui.selected.targets.length && ui.selected.targets[0] != player) return false;
						if (player.inRange(target)) {
							return player.countCards('h') != target.countCards('h')
							||player.countCards('e') != target.countCards('e')
							|| player.countCards('j') != target.countCards('j')
						}
						return false;
					});
					next.moveHandcard = true;
					'step 1'
					if (result.bool && result.card) {
						console.log(result);
						if (result.targets[0].countCards(result.position) == result.targets[1].countCards(result.position)) player.draw();
					}
				},
				ai: {
					order: 10,
					player: 1,
				}
			},
			wangxuan: {
				mod: {
					maxHandcard(player, num) {
						if (player.isMaxHp() || player.isMaxEquip() && player.countCards('e')) return num * 2;
					},
					attackFrom(from, to, distance) {
						if (from._wangxuan_tmp) return;
						var num = distance;
						from._wangxuan_tmp = true;
						if (from.isMaxHp() || from.isMaxEquip() && from.countCards('e')) num -= from.getAttackRange();
						delete from._wangxuan_tmp;
						return num;
					}
				},
			},
			//gz安洁
			gz_lianjin: {
				trigger: { player: 'useCardAfter' },
				filter(Evt, player) {
					if (!player.$.gz_lianjin_mark) player.$.gz_lianjin_mark = [];
					if (!player.$.gz_lianjin_used) player.$.gz_lianjin_used = [];
					return Evt.card && player.countCards('h');
				},
				direct: true,
				content() {
					'step 0'
					player.chooseCard(get.prompt2('gz_lianjin'), function (card, player, target) {
						return true;
					}).ai = card => {
						if (get.type(card) == 'equip') return 8 - get.value(card);
						return 5 - get.value(card);
					};
					'step 1'
					if (result.bool) {
						player.logSkill('gz_lianjin');
						player.$give(result.cards, player, false);
						player.lose(result.cards, ui.special, 'toStorage');
						player.markAuto('gz_lianjin_mark', result.cards);
					}
					else {
						Evt.finish();
					}
					'step 2'
					var list = {};
					player.$.gz_lianjin_mark.filter(card => {
						if (!list[get.suit(card)]) list[get.suit(card)] = 0;
						list[get.suit(card)]++;
					});
					Evt.list = list;
					if (Object.keys(Evt.list).length >= 3 && !player.getStorage('gz_lianjin_used').contains('A')) {
						Evt.chooseEquip = true;
						Evt.useSha = true;
					} else if (!player.getStorage('gz_lianjin_used').contains('B')) {
						for (var i in list) {
							if (list[i] >= 3) Evt.chooseEquip = i;
							Evt.useWuzhong = true;
						}
					}
					'step 3'
					if (Evt.chooseEquip) {
						player.chooseCardButton(player.$.gz_lianjin_mark, 3, true, '选择发动『炼金』的牌').set('filterButton', function (button) {
							var link = button.link;
							if (_status.event.chosen !== true) return _status.event.chosen == get.suit(link);
							else {
								for (var i = 0; i < ui.selected.buttons.length; i++) {
									if (get.suit(link) == get.suit(ui.selected.buttons[i].link)) return false;
								}
								return true;
							}
						}).set('chosen', Evt.chooseEquip);
					} else {
						Evt.finish();
					}
					'step 4'
					if (result.bool) {
						var cards = result.links.slice(0);
						player.unmarkAuto('gz_lianjin_mark', cards);
						Evt.equips = cards.filter(card => get.type(card) == 'equip');
						Evt.others = cards.removeArray(Evt.equips);
						Evt.num = 0;
						if (!Evt.equips[Evt.num]) Evt.goto(10);
					}
					'step 5'
					Evt.card = Evt.equips[Evt.num];
					Evt.effect = ['equip'];
					if (get.color(Evt.card) == 'red') {
						Evt.effect.add('lebu');
					}
					if (get.color(Evt.card) == 'black') {
						Evt.effect.add('bingliang');
					}
					player.chooseTarget('###' + get.prompt('gz_lianjin') + '###将' + get.translation(Evt.card) + '置于一名角色的区域内').set('ai', function (target) {
						var player = _status.event.player;
						var effect = _status.event.effect;
						var card = _status.event.card;
						var gain = 0
						if (effect.contains('lebu') && target.canAddJudge('lebu')) gain += get.effect(target, { name: 'lebu' }, player, player);
						if (effect.contains('bingliang') && target.canAddJudge('bingliang')) gain += get.effect(target, { name: 'bingliang' }, player, player);
						return gain * (-get.attitude(player, target) - 2) + get.value(card) * (get.attitude(player, target) + 2) / 4;
					}).set('effect', Evt.effect).set('card', Evt.card)
					'step 6'
					if (result.bool) {
						Evt.target = result.targets[0]
						Evt.target.classList.add('glow');
					} else {
						Evt.finish();
					}
					'step 7'
					var controls = ['判定区', '装备区', '取消选择'];
					if (Evt.effect.contains('lebu') && !Evt.target.canAddJudge('lebu') || Evt.effect.contains('bingliang') && !Evt.target.canAddJudge('bingliang')) controls.shift();
					player.chooseControl(controls).set('ai', function () {
						return _status.event.index;
					}).set('att', get.attitude(player, Evt.target));
					'step 8'
					Evt.target.classList.remove('glow');
					switch (result.index) {
						case 0: {
							player.$give(Evt.card, Evt.target, false);
							if (Evt.effect.contains('lebu') && Evt.target.canAddJudge('lebu')) Evt.target.addJudge({ name: 'lebu' }, [Evt.card]);
							else if (Evt.effect.contains('bingliang') && Evt.target.canAddJudge('bingliang')) Evt.target.addJudge({ name: 'bingliang' }, [Evt.card]);
							break;
						}
						case 1: {
							player.$give(Evt.card, Evt.target, false);
							Evt.target.equip(Evt.card);
							break;
						}
						case 2: {
							Evt.goto(9);
							break;
						}
					}
					'step 9'
					Evt.num++;
					if (Evt.equips[Evt.num]) Evt.goto(5);
					'step 10'
					if (Evt.others && Evt.others.length) {
						player.$throw(Evt.others, 1000);
						game.cardsDiscard(Evt.others);
						game.log(Evt.otherss, '被置入了弃牌堆');
					}
					'step 11'
					if (Evt.useSha) {
						player.$.gz_lianjin_used.add('A');
						player.chooseUseTarget({ name: 'sha', nature: 'fire' }, '是否使用第一张火【杀】？', false);
					}
					else if (Evt.useWuzhong) {
						player.$.gz_lianjin_used.add('B');
						player.chooseUseTarget({ name: 'wuzhong' }, '是否使用第一张【无中生有】？', false);
					}
					'step 12'
					if (Evt.useSha) {
						player.chooseUseTarget({ name: 'sha', nature: 'fire' }, '是否使用第二张火【杀】？', false);
					}
					else if (Evt.useWuzhong) {
						player.chooseUseTarget({ name: 'wuzhong' }, '是否使用第二张【无中生有】？', false);
					}
					// if(){

					// }
				},
				group: ['gz_lianjin_mark'],
				subSkill: {
					used: {},
					mark: {
						intro: {
							content: 'cards',
							onunmark: 'throw',
						},
						marktext: '洁',
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.gz_lianjin_used = [];
						},
						cardAround: true
					}
				}
			},
			//黄兔
			gz_jiance: {
				trigger: { player: 'zhibiAfter' },
				filter(Evt, player) {
					console.log(Evt)
					if (!Evt.cards || !Evt.skill || Evt.skill.indexOf('gz_jiance_') != 0) return false;
					var type2 = get.type2(Evt.cards[0]);
					return Evt.control && Evt.control == '手牌' && Evt.target.countCards('h', card => get.type2(card) == type2) == 0;
				},
				direct: true,
				content() {
					'step 0'
					player.choosePlayerCard(trigger.target, [1, Infinity], get.prompt('gz_jiance'), '重铸其中的任意张').set('ai', function (button) {
						var val = get.buttonValue(button);
						if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return 0.5 - val;
						return val;
					}).set('visible', true);
					'step 1'
					if (result.bool && result.cards) {
						trigger.target.showHandcards('『监策』展示手牌');
						Evt.cards = result.cards;
						game.delayx();
					} else Evt.finish();
					'step 2'
					var num = Evt.cards.length;
					player.logSkill('gz_jiance', target);
					trigger.target.lose(Evt.cards, ui.discardPile).set('visible', true);
					trigger.target.$throw(Evt.cards, 1000);
					game.log(trigger.target, '将', Evt.cards, '置入了弃牌堆');
					trigger.target.draw(num);
				},
				group: ['gz_jiance_spade', 'gz_jiance_club'],
				subSkill: {
					spade: {
						enable: 'chooseToUse',
						viewAs: { name: 'zhibi' },
						usable: 1,
						filterCard: { suit: 'spade' },
					},
					club: {
						enable: 'chooseToUse',
						viewAs: { name: 'zhibi' },
						usable: 1,
						filterCard: { suit: 'club' },
					}
				}
			},
			yingqi: {
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
						|| (!Evt.getParent().relatedEvent || !Evt.getParent().relatedEvent.player || Evt.getParent().relatedEvent.name == 'judge'
							|| Evt.getParent().relatedEvent.player != player))) return false;
					if (Evt.name == 'lose' && (Evt.position != ui.discardPile
						|| Evt.player != player)) return false;
					if (_status.currentPhase && _status.currentPhase != player && _status.currentPhase.maxHp != Infinity && _status.currentPhase.countCards('h') < _status.currentPhase.maxHp) {
						for (var i = 0; i < Evt.cards.length; i++) {
							if (get.position(Evt.cards[i]) == 'd') {
								return true;
							}
						}
					}
					return false;
				},
				check(Evt, player) {
					if (_status.currentPhase.maxHp < _status.currentPhase.countCards('h')) return get.attitude(player, _status.currentPhase) < 0;
					return get.attitude(player, _status.currentPhase) > 0;
				},
				logTarget(Evt) {
					return _status.currentPhase;
				},
				content() {
					Evt.target = _status.currentPhase;
					if (Evt.target.maxHp < Evt.target.countCards('h')) Evt.target.chooseToDiscard(true, Evt.target.countCards('h') - Evt.target.maxHp);
					else Evt.target.gain(get.cards(Evt.target.maxHp - Evt.target.countCards('h')), 'draw');
				},
				group: 'yingqi_drawBy',
				subSkill: {
					drawBy: {
						trigger: { global: 'loseAfter' },
						filter(Evt, player) {
							if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
								|| (!Evt.getParent().relatedEvent || !Evt.getParent().relatedEvent.player || Evt.getParent().relatedEvent.name == 'judge'
									|| Evt.getParent().relatedEvent.player == player))) return false;
							if (Evt.name == 'lose' && (Evt.position != ui.discardPile
								|| Evt.player == player)) return false;
							if (_status.currentPhase == player && player.maxHp != Infinity && player.countCards('h') < player.maxHp) {
								for (var i = 0; i < Evt.cards.length; i++) {
									if (get.position(Evt.cards[i]) == 'd') {
										return true;
									}
								}
							}
							return false;
						},
						direct: true,
						content() {
							'step 0'
							var choice = (player.maxHp < player.countCards('h')) ? (get.attitude(trigger.player, player) < 0) : (get.attitude(trigger.player, player) > 0);
							trigger.player.chooseBool('是否发动『迎喫』，令' + get.translation(player) + '摸' + get.cnNumber(player.maxHp - player.countCards('h')) + '张牌？').set('choice', choice);
							'step 1'
							if (result.bool) {
								player.logSkill('yingqi');
								trigger.player.line(player, 'green');
								if (player.maxHp < player.countCards('h')) player.chooseToDiscard(true, player.countCards('h') - player.maxHp);
								else player.gain(get.cards(player.maxHp - player.countCards('h')), 'draw');
							}
						}
					}
				}
			},
			//心萪
			zuigao: {
				intro: {
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true,
				enable: 'phaseUse',
				usable: 1,
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = [];
				},
				filter(Evt, player) {
					return player.countCards('he') > 0;
				},
				filterCard: true,
				position: 'he',
				filterTarget(card, player, target) {
					return target != player;
				},
				check(card) {
					var player = _status.event.player;
					var zuigao = player.getStorage('zuigao');
					for (var i of zuigao) {
						if (get.suit(i) == get.suit(card)) return 7 - get.value(card);
					}
					return 1 - get.value(card);
				},
				discard: false,
				toStorage: true,
				delay: false,
				content() {
					'step 0'
					player.$give(cards, player, false);
					player.markAuto('zuigao', cards);
					'step 1'
					if (get.mode() == 'guozhan' && target.isUnseen(2)) {
						player.chooseControl(true).set('prompt', '令目标执行一项').set('choiceList', ['展示所有手牌并弃置与此将牌上花色相同的牌', '明置一张武将牌']);
					} else {
						Evt.goto(4);
					}
					'step 2'
					if (result.control == '选项一') {
						player.chat('展示所有手牌并弃置与此将牌上花色相同的牌');
						game.delayx();
						Evt.goto(4);
					}
					else if (result.control == '选项二') {
						player.chat('明置一张武将牌');
						game.delayx();
						var list = [];
						if (target.isUnseen(0)) list.push('主将');
						if (target.isUnseen(1)) list.push('副将');
						if (list.length > 1) target.chooseControl(['主将', '副将']).set('ai', function () {
							return Math.random() > 0.5 ? 0 : 1;
						}).prompt = '选择并展示一张武将牌';
						else Evt._result = { index: list[0] == '主将' ? 0 : 1 };
					}
					'step 3'
					if (result.index == 0) {
						target.showCharacter(0);
					}
					else {
						target.showCharacter(1);
					}
					'step 4'
					target.showHandcards();
					game.delay(1.2);
					'step 5'
					var suits = get.suit3(player.getStorage('zuigao'));
					var discards = target.getCards('he', { suit: suits });
					target.discard(discards);
				},
				ai: {
					order: 8,
					result: {
						player: -0.2,
						target(player, target) {
							if (target.countCards('h')) return -(player.getStorage('zuigao').length + 1);
						},
					},
				},
				group: 'zuigao_draw',
				subSkill: {
					draw: {
						trigger: { player: 'phaseDrawBegin' },
						forced: true,
						filter(Evt, player) {
							return !Evt.numFixed;
						},
						content() {
							trigger.num = game.countGroup();
						},
					},
				}
			},
			xinhuochuancheng: {
				trigger: { player: ['damageEnd', 'dyingBegin'], source: ['damageEnd'] },
				filter(Evt, player) {
					return player.getStorage('zuigao').length && game.hasPlayer(cur => {
						return cur != player;
					});
				},
				direct: true,
				locked: true,
				content() {
					'step 0'
					player.chooseTarget(true, '选择『心火传承』的目标', function (card, player, target) {
						return target != player;
					});
					'step 1'
					Evt.target = result.targets[0];
					if (Evt.target) {
						player.logSkill('xinhuochuancheng', Evt.target);
						var cards = player.getStorage('zuigao');
						if (trigger.name == 'dying') {
							player.unmarkAuto('zuigao', cards);
							player.$give(cards, Evt.target)
							Evt.target.gain(cards);
							Evt.finish();
						} else {
							player.chooseCardButton(cards, '选择交给' + get.translation(Evt.target) + '的一张牌', true).set('ai', function (button) {
								return get.attitude2(_status.event.target) * get.value(button.link, _status.event.target, 'raw');
							}).set('target', Evt.target);
						}
					} else Evt.finish();
					'step 2'
					if (result.bool && result.links) {
						var cards = result.links.slice(0);
						player.unmarkAuto('zuigao', cards);
						player.$give(cards, Evt.target)
						Evt.target.gain(cards);
					}

				},
				ai: {
					threaten(player, target) {
						if (target.getStorage('zuigao').length) return 1.5;
						return 1;
					},
				},
			},
			//雪花菈米
			hanling: {
				trigger: { player: 'damageBegin3' },
				filter(Evt, player) {
					return Evt.source && player.countCards('h') > Evt.source.countCards('h');
				},
				check(Evt, player) {
					return player.countCards('h') - Evt.source.countCards('h') <= Evt.num;
				},
				prompt(Evt, player) {
					return '你受到来源为' + get.translation(Evt.source) + '的伤害，可以将手牌弃至' + get.cnNumber(Evt.source) + '张以防止此伤害';
				},
				logTarget: 'source',
				content() {
					'step 0'
					Evt.num = player.countCards('h') - trigger.source.countCards('h');
					player.chooseToDiscard('『寒灵』：需要弃置' + Evt.num + '张牌', Evt.num, true, 'h');
					'step 1'
					trigger.changeToZero();
				},
				group: 'hanling_drawBy',
				subSkill: {
					drawBy: {
						trigger: { player: 'phaseEnd' },
						filter(Evt, player) {
							var num = 0;
							num += player.getHistory('useCard', evt => {
								return evt.targets && (evt.targets.length > 1 || evt.targets[0] != player);
							}).length;
							return !num && game.hasPlayer(cur => {
								return cur.countCards('h') < player.countCards('h');
							});
						},
						direct: true,
						content() {
							'step 0'
							player.chooseTarget(get.prompt2('hanling'), function (card, player, target) {
								return target.countCards('h') < player.countCards('h');
							}).set('ai', function (target) {
								var player = _status.event.player;
								var num = player.countCards('h') - target.countCards('h');
								return num * get.attitude(player, target);
							});
							'step 1'
							if (result.bool && result.targets) {
								Evt.num = player.countCards('h');
								Evt.target = result.targets[0];
							} else {
								Evt.finish();
							}
							'step 2'
							if (Evt.target) {
								Evt.target.drawTo(Evt.num);
							}
						},
					}
				}
			},
			//语部纺
			lingli: {
				trigger: { global: 'useCard' },
				clickChange: '休眠',
				clickable(player) {
					if (player.$.lingli_clickChange === undefined) player.$.lingli_clickChange = false;
					else player.$.lingli_clickChange = !player.$.lingli_clickChange;
				},
				clickableFilter(player) {
					return player.$.lingli_clickChange !== false;
				},
				filter(Evt, player) {
					if (player.$.lingli_clickChange === false) return false;
					return Evt.targets && Evt.targets.length == 1 && Evt.cards && Evt.cards.length;
				},
				check(Evt, player) {
					if (get.attitude(player, Evt.player) > 0) {
						return get.effect(Evt.targets[0], Evt.card, Evt.player, player) > 1 && !['equip', 'delay'].contains(get.type(Evt.card)) && get.name(Evt.card) == get.name(Evt.cards[0]) && get.name(Evt.card) != 'jiu';
					}
					if (get.attitude(player, Evt.player) < 0) {
						return get.effect(Evt.targets[0], Evt.card, Evt.player, Evt.player) > 1 && (['equip', 'delay'].contains(get.type(Evt.card)) || get.name(Evt.card) != 'jiu');
					}
					return 0;
				},
				prompt(Evt, player) {
					return get.translation(Evt.player) + '使用' + get.translation(Evt.card) + '指定' + get.translation(Evt.targets) + '为目标，' + get.prompt('lingli');
				},
				round: 1,
				logTarget: 'player',
				content() {
					'step 0'
					trigger.cancel();
					'step 1'
					trigger.player.gain(trigger.cards, 'gain2').gaintag.add('lingli');
					trigger.player.addTempSkill('lingli_ganshe');
				},
				subSkill: {
					ganshe: {
						mod: {
							aiOrder(player, card, num) {
								if (card.hasGaintag && card.hasGaintag('lingli')) return num / 10;
							},
						},
						ai: {
							effect: {
								player(card, player, target, current) {
									if (card.hasGaintag && card.hasGaintag('lingli')) return [2, 0, 2, 0];
								}
							}
						},
						trigger: { player: 'useCardAfter', global: 'phaseEnd' },
						direct: true,
						filterx(Evt, player) {
							if (!player.isPhaseUsing()) return false;
							return player.getHistory('lose', evt => {
								if (evt.getParent() != Evt) return false;
								for (var i in evt.gaintag_map) {
									if (evt.gaintag_map[i].contains('lingli')) return true;
								}
								return false;
							}).length > 0;
						},
						filter(Evt, player) {
							if (Evt.name == 'phase') return true;
							if (!lib.skill.lingli_ganshe.filterx(Evt, player)) return false;
							if (Evt.targets && Evt.targets.length > 0) {
								var info = get.info(Evt.card);
								if (info.allowMultiple == false) return false;
								if (Evt.targets && !info.multitarget) {
									if (game.hasPlayer(cur => {
										return Evt.targets.contains(cur) && lib.filter.targetEnabled2(Evt.card, player, cur) && lib.filter.targetInRange(Evt.card, player, cur);
									})) {
										return true;
									}
								}
							}
							return false;
						},
						content() {
							'step 0'
							if (trigger.name == 'useCard') {
								var card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
								player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = trigger.skill || 'lingli_ganshe';
							}
							else {
								player.removeGaintag('lingli');
								Evt.finish();
							}
							'step 1'
							var evt = trigger.getParent('phaseUse');
							if (evt?.name == 'phaseUse') {
								evt.skipped = true;
							}
						}
					}
				}
			},
			chengfo: {
				enable: ['chooseToUse'],
				viewAs: { name: 'yiyi' },
				check(card) {
					if (get.type(card) == 'equip' && get.position(card) == 'h') return 4 - get.value(card);
					return 6 - get.value(card);
				},
				filterCard(card, player) {
					if (player.getStorage('chengfo_mark').contains(get.suit(card))) return false;
					return true;
				},
				onuse(result, player) {
					if (!player.$.chengfo_mark) player.$.chengfo_mark = [];
					player.$.chengfo_mark.add(get.suit(result.card, player));
					player.markSkill('chengfo_mark');
				},
				ai: {
					order: 10,
					player: 1,
				},
				group: ['chengfo_drawBy', 'chengfo_clear'],
				subSkill: {
					mark: {
						onremove: true,
						intro: {
							content(storage, player, skill) {
								if (storage.length) {
									return '本回合『闭目成佛』使用过的花色：' + get.translation(storage);
								}
							},
						}
					},
					drawBy: {
						trigger: { global: 'yiyiEnd' },
						filter(Evt, player) {
							return Evt.skill && Evt.skill == 'chengfo' && Evt.player != player && Evt.discards && (Evt.discards.filter(card => get.type(card) == 'equip').length || Evt.discards.length);
						},
						direct: true,
						content() {
							'step 0'
							//window.prompt("sometext","defaultvalue");
							player.chooseCardButton('『闭目成佛』：使用其中一张装备牌', trigger.discards).set('filterButton', function (button) {
								return get.type(button.link) == 'equip';
							});
							'step 1'
							if (result.bool && result.links) {
								player.useCard(result.links[0], player);
							}
							'step 2'
							var list = [];
							for (var i of trigger.discards) {
								list.push(get.color(i));
							}
							if (!function (array) {
								if (array.length > 0) {
									return !array.some(function (value, index) {
										return value !== array[0];
									});
								} else {
									return false;
								}
							}(list)) Evt.finish();
							'step 3'
							player.draw();
						},
					},
					clear: {
						firstDo: true,
						silent: true,
						direct: true,
						trigger: {
							player: ['phaseAfter']
						},
						content() {
							delete player.$.chengfo_mark;
							player.unmarkSkill('chengfo_mark');
						}
					}
				}
			},



			g_hidden_ai: {
				charlotte: true,
				ai: {
					threaten(player, target) {
						if (get.mode() != 'guozhan' && target.isUnseen(2)) return 0.0001;
						return 1;
					},
				},
			},
		},
		card: {
		},
		dynamicTranslate: {
		},
		translate: {
			KurokawaPresents: `Kurokawa Presents`,
			rewriteGuo: `国战共通`,

			db_atk: `进攻对策`,
			db_atk1: `全军出击`,
			db_atk2: `分兵围城`,

			db_def: `防御对策`,
			db_def1: `奇袭粮道`,
			db_def2: `开城诱敌`,


			His_HoshinoNiya: `星野妮娅·史官`,
			His_HoshinoNiya_ab: `星野·史官`,
			shushi: `书史`,
			shushi_info: `你的主要阶段开始时，你可以观看牌堆顶的任意张牌，并以任意顺序放回。你每回合至多以此法观看X张牌，且每少观看一张本回合手牌上限便+1。（X为场上人数且至少为5）`,
			shushi_append: lib.figurer(`特性：观星`),
			zengzhi: `增殖`,
			zengzhi_info: `当你的实体锦囊牌结算后，你可以进行一次判定，若花色与该锦囊牌相同，视为你使用了一张同样的锦囊牌。`,

			Qiankesaier: `茜科塞尔`,
			Qiankesaier_info: `茜科塞尔`,
			shuangshoujiaoying: `双首角鹰`,
			shuangshoujiaoying_gai: `双首角鹰`,
			shuangshoujiaoying_info: `当你使用【杀】指定目标后，可以令你或目标展示手牌并重铸其中的【闪】。若为其重铸，你摸一张牌；若为你重铸，此【杀】不计入次数。`,
			shuangshoujiaoying_gai_info: `当你使用【杀】指定目标后，可以令你或目标展示手牌并重铸其中的红色牌。若为其重铸，你摸一张牌；若为你重铸，此【杀】不计入次数。`,
			anyingxuemai: `暗影血脉`,
			anyingxuemai_info: `<font color=#daa>限定技</font>，你进入濒死状态时，可以展示所有手牌并回复其中最少花色牌数的体力。然后将『双首角鹰』的“【闪】”改为“红色牌”。`,

			heichuan: `原初黑川`,
			zhengtibuming: `正体不明`,
			zhengtibuming_info: `游戏开始时，你随机获得三张武将牌作为「替身」，然后亮出其中一张。获得亮出「替身」的通常技，且性别和势力视为与「替身」相同。回合开始或结束时，你可以选择一项：<br>
			更改亮出的「替身」；或随机更换一张「替身」。当你受到1点伤害后，你可以获得一张新的「替身」。`,
			lunhuizuzhou: `轮回诅咒`,
			lunhuizuzhou_info: `锁定技 其他角色不能以任何方式让你回复体力。你死亡后，令一名其他角色获得此技能。`,
			mingyunniezao: `命运捏造`,
			mingyunniezao_info: `主公技。当其它同势力角色的判定牌生效前，你可以观看牌堆顶的五张牌，选择其中一张替代之，然后将其余牌以任意顺序放回牌堆顶。`,

			Mikawa: `三川`,
			zhezhuan: `辙转`,
			zhezhuan_info: `每回合限一次，你可以将一张非基本牌当作具有任意应变标签的同名牌或基本牌使用。`,
			setu: `涩涂`,
			setu_info: `出牌阶段限一次，你可以将任意张点数之和小于18的手牌置于武将牌上。然后若你武将牌上牌之乘积大于100，你将这些牌置入弃牌堆，摸等量的牌，并对一名角色造成1点伤害。`,

			Sakurai: `樱井林`,
			junxu: `军序`,
			junxu_info: `你每个回合使用第X张牌时，可以摸两张牌或回复一点体力。（X为你的体力值）`,
			jingniang: `井酿`,
			jingniang_info: `出牌阶段，你可以弃一张牌，令你的【杀】不计入次数且伤害+1，直到本回合结束。`,

			old_Eilene: `旧艾琳`,
			duanfu: `断缚`,
			duanfu_info: `你的牌指定目标时，你可以将其横置并使此牌对其无效；你成为牌指定的目标时，你可以将来源解除横置并使此牌对你无效。`,
			daichang: `贷偿`,
			daichang_info: `出牌阶段限一次，你可以扣减一点体力上限并摸X张牌，然后你于本阶段内造成伤害时，需将X张牌置于牌堆底。（X为场上被横置的角色数）`,
			daichang_append: lib.figurer(`特性：难上手`),
			hongtu: `宏图`,
			hongtu_info: `<font color=#faa>限定技</font> 你的出牌阶段结束时，若你处于横置状态且体力为上限：你可以亮出牌堆底牌并使用之，然后摸一张牌，重复此操作直到你无法使用亮出牌。`,
			hongtu_append: lib.figurer(`特性：爆发`),

			old_InabaHaneru: `旧因幡`,
			huangtu: `颂恩`,
			huangtu_info: `锁定技 游戏开始时，你选择一名其他角色，增加与其相同的体力上限和体力。回合外，其体力变化时，你的体力进行同样的变化；回合内，你体力变化时，其体力进行同样的变化。`,
			wudao: `五道`,
			wudao_info: `出牌阶段，你可以重铸一张基本牌，你以此法重铸的牌须与本回合之前重铸的牌名不同。出牌阶段结束时，若本回合你重铸了所有牌名的基本牌，你可以摸两张牌或回复1点体力。`,
			wudao_useEnd_info: `本回合你重铸了所有牌名的基本牌，你可以摸两张牌或回复1点体力。`,
			yinyuan: `缘斩`,
			yinyuan_info: `主公技 若你在出牌阶段结束时发动『五道』，你可以扣减一点体力上限，令一名同势力角色执行未被选择一项。`,

			old_HanazonoSerena: `旧花園猫`,
			old_maoliang: `猫粮(旧)`,
			old_jiumao: `啾猫(旧)`,
			old_jiumao_info: `其他角色在弃牌阶段开始时，可将任意数量的牌放在其武将牌旁，称为「猫粮」。<br>
			你的回合开始时，可获得数量不大于你体力上限的「猫粮」，若如此做，你无法使用黑色牌指定你获得牌的来源为目标直到回合结束。`,
			old_enfan: `恩返(旧)`,
			old_enfan_info: `发动过『啾猫』的角色濒死时，你可将场上的数量不大于你体力上限的「猫粮」交给该名角色，然后若场上没有「猫粮」，其回复1点体力。`,
			old_shiqi: `势起(旧)`,
			old_shiqi_info: `锁定技 准备阶段，若你的手牌数为全场最多，本回合你造成的第一次伤害+1。`,
			old_shiqi_append: lib.figurer(`特性：爆发`),

			old_UsadaPekora: `旧兔田`,
			pekoyu: `嚣张咚鼓`,
			pekoyu_info: `回合内，当你的非装备牌生效并结算后，若本回合未因此花色的牌发动此技能，你可以摸一张牌然后弃置一张牌。若你因此弃置了【酒】，你可以令一名角色摸两张牌。`,
			hongshaoturou: `自煲自足`,
			hongshaoturou_info: `出牌阶段限一次，你可以横置武将牌，令你在回合结束时受到1点火焰伤害。然后本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。`,

			old_Elu: `旧艾露`,
			old_huangran: `煌燃(旧)`,
			old_huangran_info: `你受到火焰伤害时，可以选择一名距离为1的角色与你平均承担，不能平均的额外1点由你分配。<br>
			每有一名角色因此受伤，你摸一张牌。`,
			old_yinzhen: `隐真`,
			old_yinzhen_info: `锁定技 每回合限一次，所有角色造成的伤害改为火焰伤害。<br>
			其他角色与你距离减小的回合结束时，你观看其手牌并获得其中一张。`,
			old_senhu: `森护(旧)`,
			old_senhu_info: `锁定技 若你的装备区里没有防具牌，你受到的火焰伤害+1。`,

			gz_Ava: `国战向晚`,
			gz_yiqu: `亦趋`,
			gz_yiqu_info: `每回合限一次，当你受到伤害后，你可以交给来源一张牌。若与对你造成伤害的牌花色相同，你摸两张牌。`,
			baitai: `百态`,
			baitai_info: `回合开始时，你可以展示所有手牌，根据各花色的牌数于本回合增加对应值：♦️~攻击范围，♣️~摸牌阶段摸牌数，♥️~手牌上限，♠️~出牌阶段可使用【杀】的次数；一组四种花色~使用牌额外选择目标。`,

			gz_LizeHelesta: `国战莉泽`,
			tongchen: `同尘`,
			tongchen_info: `出牌阶段限一次，若你攻击范围内有角色某一区域内的牌数与你在该区域的牌数不等，你可在你们之间移动区域内的一张牌。然后若你与其在该区域内的牌数相等，你摸一张牌。`,
			wangxuan: `王选`,
			wangxuan_info: `锁定技 当你的体力或装备区装备为全场最多时，你的手牌上限和攻击范围翻倍。`,

			gz_InabaHaneru: `国战因幡はねる`,
			gz_InabaHaneru_ab: `国战因幡`,
			gz_jiance: `监策`,
			gz_jiance_spade: `监策♠`,
			gz_jiance_club: `监策♣`,
			gz_jiance_info: `每回合每项限一次，你可以将一张♠️/♣️牌当【知己知彼】使用。若选择观看手牌且其中没有你转化牌的类型，你可以展示之并重铸其中任意张。`,
			yingqi: `迎喫`,
			yingqi_info: `其他角色的牌在你的回合进入弃牌堆后，其可以令你将手牌数调整至体力上限。你的牌在其他角色的回合进入弃牌堆后，你可以令其将手牌数调整至体力上限。`,

			gz_xinke: `心萪`,
			zuigao: `最高指令`,
			zuigao_info: `摸牌阶段，你摸等同于场上势力数的牌。出牌阶段限一次，你可以将一张牌置于此将牌上，令一名角色：展示所有手牌并弃置与此将牌上花色相同的牌；或明置一张武将牌。`,
			xinhuochuancheng: `心心之火`,
			xinhuochuancheng_info: `锁定技 当你造成或受到伤害后，你需将此将牌上的一张牌交给其他角色。你进入濒死状态时，若此将牌上有牌，你需将此将牌上所有牌交给其他角色并回复1点体力。`,

			gz_YukihanaLamy: `雪花菈米`,
			hanling: `寒灵`,
			hanling_info: `当你受到伤害时，若来源手牌数小于你，你可以将手牌弃至与其相等防止此伤害。你的回合结束时，若本回合你未对其他角色使用过牌，你可以令一名角色摸牌至与你手牌相同。`,

			gz_KataribeTsumugu: `语部纺`,
			lingli: `灵力干涉`,
			lingli_info: `轮次技 当一张牌指定唯一角色为目标时，你可以令之无效并返回来源手牌。然后其本回合使用此牌时结束当前阶段并额外结算一次。`,
			chengfo: `闭目成佛`,
			chengfo_info: `你可以将一张本回合未使用过花色的牌当【以逸待劳】使用。其他角色因此弃置牌后，若包含装备牌，你可以使用其中一张；若为同色，你摸一张牌。`,

			gz_AngeKatrina: `国战安洁`,
			gz_lianjin: `炼金`,
			gz_lianjin_info: `当你使用一张牌后，可以将一张手牌置于此将牌上。然后若此将牌上有三种不同/相同花色的牌，你将其中的装备牌置入场上，弃置其余的牌，视为使用了两张：火【杀】/【无中生有】，然后本回合不再触发此项。`,

		}
	};
});