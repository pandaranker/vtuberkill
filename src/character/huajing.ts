import { toSkill } from "./skilltype";

window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: 'huajing',
		connect: true,
		character: {
			/**长尾景 */
			NagaoKei: ['male', 'nijisanji', 3, ['nkfumo', 'chidu']],
			/**西园千草 */
			NishizonoChigusa: ['female', 'nijisanji', 4, ['qiti', 'miaoyu']],
			/**白神遥 */
			ShirakamiHaruka: ['female', 'psp', 3, ['baoxiao', 'quru'], ['guoV']],
			/**海狗 */
			KisaragiKoyori: ['female', 'kagura', 3, ['shinve', 'juzu']],
			/**鲨皇 */
			GawrGura: ['female', 'holo', 3, ['lingqun', 'yangliu'], ['yingV']],
			/**Ina */
			NinomaeInanis: ['female', 'holo', 3, ['mochu', 'fuyue'], ['yingV']],
			/**娜娜米 */
			Nana7mi: ['female', 'VirtuaReal', 4, ['xieqi', 'youhai'], ['guoV']],

			/**海星宫汐 */
			sea_HosimiyaSio: ['female', 'qun', 5, ['zhuhan', 'pobing'],],
			/**海熊猫 */
			sea_SasakiSaku: ['female', 'nijisanji', 4, ['haishou', 'lishi']],
			/**潜水夸 */
			sea_MinatoAqua: ['female', 'holo', 3, ['jinchen', 'qianyong']],
			/**海向晚 */
			sea_Ava: ['female', 'asoul', 3, ['zhuiguang', 'ronglei'], ['guoV']],

			/**皇团 */
			sp_HisekiErio: ['female', 'shen', '1/6', ['qiming', 'shengbian', 'tulong']],
			/**鲨皇 */
			sp_GawrGura: ['female', 'shen', 3, ['sp_guaisheng', 'sp_guiliu'], ['yingV']],
		},
		characterSort: {
			huajing: {
				sea_emperor: ['sp_HisekiErio', 'sp_GawrGura'],
				HOLOEN: ['GawrGura', 'NinomaeInanis'],
			},
		},
		characterIntro: {
		},
		skill: {
			nkfumo: {
				trigger: { player: 'useCard1' },
				priority: 42,
				check(Evt, player) {
					var effect = 0;
					for (var i = 0; i < Evt.targets.length; i++) {
						effect += get.effect(Evt.targets[i], { name: 'langyong' }, Evt.player, player);
					}
					return effect > 0;
				},
				filter(Evt, player) {
					if (Evt.targets.length != 1) return false;
					return lib.filter.filterTarget({ name: 'langyong' }, player, Evt.targets[0]);
				},
				content() {
					'step 0'
					player.judge(function (result) {
						if (get.color(result) == 'black') return 2;
						return 0;
					});
					'step 1'
					if (result.bool) {
						if (!trigger.addedSkill) trigger.addedSkill = [];
						trigger.addedSkill.add('nkfumo');
						if (player.$.nkfumo2) delete player.$.nkfumo2;
						lib.skill.nkfumo2.trigger = { player: [get.name(trigger.card) + 'Begin'] };
					}
					'step 2'
					player.$.nkfumo2 = trigger.card;
					game.log(player, '将', trigger.card, '的效果改为【浪涌】')
					player.addTempSkill('nkfumo2', { player: 'useCardAfter' });
				},
				involve: 'langyong',
				group: 'nkfumo_reback',
				subSkill: {
					reback: {
						trigger: { player: 'useCardAfter' },
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							if (!player.hasSkill('chidu_used')) return false;
							return (get.type(Evt.card, 'trick') == 'trick');
						},
						content() {
							player.removeSkill('chidu_used')
						},
					},
				}
			},
			nkfumo2: {
				trigger: { global: 'Xbegin' },
				forced: true,
				silent: true,
				popup: false,
				filter(Evt, player) {
					return Evt.card == player.$.nkfumo2;
				},
				content() {
					var fun = lib.card.langyong.content;
					trigger.setContent(fun);
				},
			},
			chidu: {
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = [];
				},
				mark: true,
				trigger: { global: 'judge' },
				filter(Evt, player) {
					if (player.hasSkill('chidu_used')) return false;
					var color0 = get.color(Evt.player.judging[0]);
					return (player.countCards('h') - player.countCards('h', { color: color0 })) > 0;
				},
				direct: true,
				content() {
					'step 0'
					player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
						get.translation(trigger.player.judging[0]) + '，' + get.prompt('chidu'), 'he', function (card) {
							var judging = _status.event.judging;
							if (get.color(card) == get.color(judging)) return false;
							var player = _status.event.player;
							var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
							if (mod2 != 'unchanged') return mod2;
							var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
							if (mod != 'unchanged') return mod;
							return true;
						}).set('ai', function (card) {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							var judging = _status.event.judging;
							var result = trigger.judge(card) - trigger.judge(judging);
							var attitude = get.attitude(player, trigger.player);
							if (attitude == 0 || result == 0) return 0;
							if (attitude > 0) {
								return result;
							}
							else {
								return -result;
							}
						}).set('judging', trigger.player.judging[0]);
					'step 1'
					if (result.bool) {
						player.addTempSkill('chidu_used')
						player.respond(result.cards, 'highlight', 'noOrdering');
					}
					else {
						Evt.finish();
					}
					'step 2'
					if (result.bool) {
						Evt.card = trigger.player.judging[0];
						player.gain(Evt.card, 'gain2');
						trigger.player.judging[0] = result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player, '的判定牌改为', result.cards[0]);
					} else {
						Evt.finish();
					}
				},
				subSkill: {
					used: {},
				},
				ai: {
					rejudge: true,
					tag: {
						rejudge: 0.7,
					}
				},
			},
			qiti: {
				trigger: { player: 'damageAfter' },
				priority: 42,
				direct: true,
				filter(Evt, player) {
					return Evt.num > 0 && Evt.source?.isIn() && typeof Evt.nature === 'string' && player.countCards('he');
				},
				content: [() => {
					player.chooseCard(get.prompt2('qiti'), 'he')
						.set('ai', card => {
							return 6 - get.value(card);
						});
				}, () => {
					if (result.bool && result.cards?.length) {
						Evt.tar = trigger.source
						player.logSkill('qiti', Evt.tar);
						player.give(result.cards, Evt.tar, 'giveAuto')
					}
				}, () => {
					Evt.tar.chooseCard(`『气嚏』：交给${get.translation(player)}${get.cnNumber(player.getDamagedHp() + 1)}张牌`, 'he', player.getDamagedHp() + 1, true)
						.set('ai', card => {
							return 6 - get.value(card);
						});
				}, () => {
					if (result.bool && result.cards?.length) {
						Evt.tar.give(result.cards, player, 'giveAuto')
					}
				}],
				ai: {
					maixie: true,
					skillTagFilter(player) {
						return player.countCards('he') > 0;
					},
				}
			},
			miaoyu: {
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = true;
				},
				trigger: {
					player: ['gainAfter', 'loseAfter'],
				},
				filter(Evt, player) {
					if (Evt.name == 'gain') return player.$.miaoyu && Evt.getParent().name !== 'draw'
					else return !player.$.miaoyu && Evt.getParent().name !== 'discard'
				},
				direct: true,
				content: [() => {
					if (trigger.name == 'gain') {
						player.chooseTarget(get.prompt2('miaoyu', null, player))
							.set('filterTarget', function (card, player, target) {
								return true;
							})
							.set('ai', tar => {
								return get.attitude2(tar);
							});
					} else {
						player.chooseTarget(get.prompt2('miaoyu', null, player), function (card, player, target) {
							return player.canUse({ name: 'sha' }, target, false);
						}).set('ai', tar => {
							return get.effect(tar, { name: 'sha', nature: 'ocean' }, _status.event.player)
						});
					}
				}, () => {
					if (result.targets?.length) {
						player.$.miaoyu = !player.$.miaoyu;
						player.updateMarks('miaoyu')
						Evt.tar = result.targets[0];
						player.logSkill('miaoyu', Evt.tar);
						if (trigger.name == 'gain') {
							Evt.tar.changeHujia()
						} else {
							player.useCard({ name: 'sha', nature: 'ocean' }, Evt.tar, false);
						}
					}
				}],
				ai: {
					useSha: 1,
				},
				involve: [{
					name: 'sha',
					nature: 'ocean'
				}]
			},
			baoxiao: {
				trigger: { player: 'useCard' },
				lastDo: true,
				forced: true,
				filter(Evt, player) {
					if (Evt.card.nature != 'ocean') return false;
					return Evt.card.name == 'sha';
				},
				content() {
					'step 0'
					if (trigger.addCount !== false) {
						trigger.addCount = false;
						var stat = player.getStat();
						if (stat && stat.card && stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
					}
					Evt.num = trigger.targets.filter(function (tar) {
						return tar.hujia == 0;
					}).length;
					'step 1'
					player.draw(Evt.num);
				},
				involve: [{
					name: 'sha',
					nature: 'ocean'
				}]
			},
			quru: {
				audio: 5,
				enable: 'chooseToUse',
				filterCard(card) {
					return get.type(card) != 'basic';
				},
				selectCard: 2,
				position: 'he',
				viewAs: { name: 'sha', nature: 'ocean' },
				filter(Evt, player) {
					return (player.countCards('he') - player.countCards('he', { type: 'basic' })) >= 2 && player.isPhaseUsing();
				},
				prompt: '将两张牌当海【杀】使用',
				check(card, cards) {
					var player = _status.event.player;
					if ((get.name(card) == 'sha' && (card.nature == 'ocean' || (player.getEquip(1) && get.name(player.getEquip(1)) == 'sanchaji')))) return 0;
					return 8 - get.value(card);
				},
				onuse(result, player) {
					var hs = player.getCards('h');
					var es = player.getCards('e');
					var hu = [], eu = [];
					result.cards.forEach(function (card) {
						if (get.position(card) == 'h') hu.add(card);
						if (get.position(card) == 'e') eu.add(card);
					})
					if ((hu.length && hu.length == hs.length) || (eu.length && eu.length == es.length)) player.changeHujia();
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && get.name(card) == 'sha' && card.nature == 'ocean') return num + 10;
						if (get.itemtype(card) == 'card' && get.name(card) == 'sha' && card.nature != 'ocean') return num - 2;
					},
					aiValue(player, card, num) {
						if (get.itemtype(card) == 'card' && get.name(card) == 'sha' && card.nature == 'ocean') return num + 5;
					},
				},
				ai: {
					order: 7,
					result: { player: 1 },
					gainHujia: true
				},
				involve: [{
					name: 'sha',
					nature: 'ocean'
				}],
				group: ['quru_addDam'],
				subSkill: {
					addDam: {
						trigger: { source: 'damageBegin2' },
						priority: 22,
						filter(Evt, player) {
							return player.hujia && Evt.getParent().skill == 'quru';
						},
						prompt2(Evt, player) {
							return '你可以失去所有护甲，令' + get.translation(Evt.player) + '伤害等量增加';
						},
						content() {
							'step 0'
							Evt.num = player.hujia;
							'step 1'
							player.changeHujia(-Evt.num);
							trigger.num += Evt.num;
						},
					},
				},
			},
			shinve: {
				trigger: { player: 'changeHp' },
				firstDo: true,
				forced: true,
				filter(Evt, player) {
					return Evt.num < 0;
				},
				content() {
					player.changeHujia(-trigger.num);
				},
				group: 'shinve_change',
				subSkill: {
					change: {
						trigger: { player: 'phaseZhunbeiBegin' },
						firstDo: true,
						forced: true,
						priority: 9,
						filter(Evt, player) {
							return player.hujia > 0;
						},
						content() {
							Evt.num = player.hujia;
							player.changeHujia(-Evt.num);
							player.draw(Evt.num);
						},
					}
				},
				ai: {
					maixie: true,
					maixie_hp: true
				},
			},
			juzu: {
				skillAnimation: true,
				animationStr: '海狗女王',
				unique: true,
				juexingji: true,
				forced: true,
				trigger: { player: 'damageAfter' },
				filter(Evt, player) {
					return Evt.source && Evt.source.countCards('h') > player.countCards('h');
				},
				content() {
					player.gainMaxHp();
					// if(player.getHandcardLimit()>player.countCards('h'))	player.draw(player.getHandcardLimit()-player.countCards('h'));
					player.drawTo(player.maxHp);
					player.$.juzu = true;
					player.awakenSkill('juzu');
					player.addSkill('haigou');
				},
				derivation: 'haigou',
			},
			haigou: {
				trigger: { player: 'useCardToPlayer' },
				filter(Evt, player) {
					return Evt.target.countCards('h') > player.countCards('h') && get.tag(Evt.card, 'damage');
				},
				priority: 9,
				forced: true,
				content() {
					trigger.directHit.add(trigger.target);
				},
				group: 'haigou_addDam',
				subSkill: {
					addDam: {
						trigger: { source: 'damageBegin2' },
						priority: 9,
						forced: true,
						filter(Evt, player) {
							return Evt.nature == 'ocean';
						},
						content() {
							trigger.num++;
						},
					},
				}
			},
			//HOLOEN
			lingqun: {
				trigger: { player: 'phaseDiscardEnd' },
				frequent: true,
				filter(Evt, player) {
					return Evt.cards && Evt.cards.length;
				},
				content() {
					Evt.num = trigger.cards.length;
					player.changeHujia(Evt.num);
				},
				mod: {
					maxHandcard(player, num) {
						if (player.countCards('h') > player.hp && player.hujia)
							return num + player.hujia;
					},
				},
				ai: {
					gainHujia: true,
					nohujia: true,
					skillTagFilter(player, tag, arg) {
						if (tag == 'nohujia') return player.countCards('h') > player.hp;
					},
				},
			},
			yangliu: {
				audio: 2,
				trigger: { player: 'useCard1' },
				filter(Evt, player) {
					return get.tag(Evt.card, 'damage') && player.hujia;
				},
				content() {
					'step 0'
					player.changeHujia(-1);
					if (!trigger.addedSkill) trigger.addedSkill = [];
					trigger.addedSkill.add('yangliu');
					'step 1'
					var controls = ['摸一张牌', '不可响应'];
					controls.push('取消');
					player.chooseControl('dialogcontrol', controls).set('ai', function (Evt, player) {
						return _status.event.index;
					}).set('index', 0);
					'step 2'
					switch (result.control) {
						case '摸一张牌': {
							player.draw();
							break;
						}
						case '不可响应': {
							trigger.directHit.addArray(trigger.targets);
							break;
						}
					}
				},
				group: 'yangliu_changeNature',
				subSkill: {
					changeNature: {
						trigger: { global: 'damageBegin1' },
						firstDo: true,
						forced: true,
						priority: 7,
						filter(Evt, player) {
							var evt = Evt.getParent();
							if (evt.name == '_lianhuan') evt = Evt.getTrigger().getParent(2);
							else evt = evt.getParent();
							return evt.addedSkill && evt.addedSkill.contains('yangliu');
						},
						content() {
							trigger.nature = 'ocean';
						},
					},
				},
			},
			mochu: {
				audio: 4,
				trigger: { source: 'damageBegin1' },
				direct: true,
				filter(Evt, player) {
					return ['ocean', 'yami'].contains(Evt.nature);
				},
				logTarget: 'player',
				content() {
					'step 0'
					if (trigger.nature == 'yami') {
						player.chooseBool('###' + get.prompt('mochu') + '###摸一张牌，并将伤害改为海洋属性').ai = function () {
							return 1;
						}
					}
					'step 1'
					if (result.bool) {
						player.draw();
						trigger.nature = 'ocean';
					}
					'step 2'
					if (trigger.nature == 'ocean') {
						player.chooseToDiscard('###' + get.prompt('mochu') + '###弃一张牌，并回复伤害值的体力').ai = function (card) {
							var player = _status.event.player;
							return (get.recoverEffect(player, player, player) > 0) ? (8 - get.value(card)) : 0;
						}
					}
					'step 3'
					if (result.bool && result.cards && result.cards.length) {
						player.recover(trigger.num);
					}
				},
			},
			fuyue: {
				audio: 3,
				trigger: { global: 'useCard2' },
				filter(Evt, player) {
					return get.name(Evt.card) == 'sha' && lib.linked.contains(get.nature(Evt.card)) && lib.filter.targetEnabled2({ name: 'chenmo' }, Evt.player, player);
				},
				usable: 1,
				logTarget: 'player',
				content() {
					'step 0'
					Evt.target = trigger.player;
					Evt.card = trigger.card;
					Evt.target.useCard({ name: 'chenmo' }, player, false);
					'step 1'
					if (result.cards && result.cards.length) {
						Evt.num = result.cards.length;
						player.chooseTarget('为' + get.translation(Evt.target) + '的' + get.translation(Evt.card) + '增加至多' +
							get.cnNumber(Evt.num) + '个目标', [1, Evt.num], function (card, player, target) {
								var player = _status.event.source;
								if (_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card, player, target);
							}).set('source', Evt.target).set('ai', function (target) {
								var player = _status.event.player;
								var source = _status.event.source;
								return get.effect(target, _status.event.card, source, player);
							}).set('targets', trigger.targets).set('card', Evt.card);
					} else {
						Evt.finish();
					}
					'step 2'
					if (result.targets?.length) {
						Evt.targets = result.targets;
						player.logSkill('fuyue', Evt.targets);
						trigger.targets.addArray(Evt.targets);
					}
				},
				involve: 'chenmo',
				result: {
					player: 1,
				}
			},
			//VR
			xieqi: {
				auido: 2,
				hiddenCard(player, name) {
					if (!lib.skill.xieqi.filter(false, player)) return false;
					var list = get.libCard(function (card) {
						return card.ai && card.ai.tag && card.ai.tag.huajing && card.ai.tag.huajing > 0;
					});
					for (var i = 0; i < list.length; i++) {
						if (list[i] == name) return true;
					}
					return false;
				},
				hiddenYami(player, name) {
					if (!lib.skill.xieqi.filter(false, player)) return false;
					return true;
				},
				enable: 'chooseToUse',
				usable: 1,
				getResult(cards): Array<[]> {
					let player = _status.event.player || _status.event._trigger.player
					let l = cards.length, all = Math.pow(l, 2), list = [];
					for (let i = 1; i < all; i++) {
						let array = [];
						for (let j = 0; j < l; j++) {
							if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
						}
						let num = 0;
						for (let k of array) {
							num += get.number(k);
						}
						if (num > 0 && num % 7 == 0) list.push(array);
					}
					if (list.length) {
						list.sort(function (a, b) {
							if (a.length != b.length) return b.length - a.length;
							return get.value(a, player) - get.value(b, player);
						});
						return list[0];
					}
					return list;
				},
				filter(Evt, player) {
					let xieqi_choice = lib.skill.xieqi.getResult(player.getCards('h'));
					return xieqi_choice.length;
				},
				check(card) {
					let evt = _status.event;
					if (!evt.xieqi_choice) evt.xieqi_choice = lib.skill.xieqi.getResult(evt.player.getCards('he'), evt.player);
					if (!evt.xieqi_choice.includes(card)) return 0;
					return 1;
				},
				chooseButton: {
					dialog(Evt, player) {
						var list = get.libCard(function (card) {
							return card.ai && card.ai.tag && card.ai.tag.huajing && card.ai.tag.huajing > 0;
						});
						for (let i = 0; i < list.length; i++) {
							list[i] = [get.translation(get.type2(list[i])), '', list[i]];
						}
						list.push(['基本', '', 'tao', 'ocean']);
						list.push(['基本', '', 'sha', 'ocean']);
						list.push(['基本', '', 'sha', 'yami']);
						if (list.length == 0) {
							return ui.create.dialog('未启用《化鲸篇》');
						}
						else return ui.create.dialog('『携七』', [list, 'vcard']);
					},
					filter(button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
					},
					check(button) {
						var player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						if (button.link[2] == 'jingluo') return 0;
						var effect = player.getUseValue(button.link[2]);
						if (effect > 0) {
							if (button.link[2] == 'haidi') return effect * 2;
							return effect;
						}
						return 0;
					},
					backup(links, player) {
						return {
							filterCard(card) {
								return true;
							},
							complexCard: true,
							selectCard() {
								var num = 0;
								for (var i = 0; i < ui.selected.cards.length; i++) {
									num += get.number(ui.selected.cards[i]);
								}
								if (num > 0 && num % 7 == 0) return [ui.selected.cards.length, ui.selected.cards.length + 1];
								return ui.selected.cards.length + 2;
							},
							// forceAuto(){
							// 	return ui.selected.buttons.length==1;
							// },
							popname: true,
							check(card) {
								return 7 - get.value(card);
							},
							position: 'he',
							viewAs: { name: links[0][2], nature: links[0][3] },
							onuse(result, player) {
								player.logSkill('xieqi');
								if (result.targets?.length == 1) player.draw(result.cards.length);
							},
						}
					},
					prompt(links, player) {
						return '###『携七』###将任意张点数合计为7倍数的牌当做【' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '】使用';
					}
				},
				ai: {
					order: 6,
					result: {
						player(player) {
							var players = game.filterPlayer();
							for (var i = 0; i < players.length; i++) {
								if (players[i] != player && get.attitude(player, players[i]) > 0) {
									return 1.5;
								}
							}
							return 1;
						}
					},
					threaten: 1.2,
				},
			},
			youhai: {
				trigger: { player: 'useCard1' },
				filter(Evt, player) {
					if (player.hp == player.maxHp) return false
					var sum = 0;
					if (Evt.card.cards) {
						for (var i = 0; i < Evt.card.cards.length; i++) {
							sum += get.number(Evt.card.cards[i]);
						}
					} else {
						sum += get.number(Evt.card)
					}
					return sum == 7;
				},
				lastDo: true,
				content() {
					'step 0'
					Evt.num = player.getDamagedHp();
					Evt.targets = [];
					'step 1'
					player.chooseTarget([1, Evt.num], '###『佑海』###分配' + get.cnNumber(Evt.num) + '点护甲').set('ai', function (target) {
						var player = _status.event.player;
						if (target.hujia == 0) return get.attitude(player, target);
						return get.attitude(player, target) / 2;
					});
					'step 2'
					if (result.targets?.length) {
						Evt.targets.addArray(result.targets);
						player.line(result.targets, 'ocean');
						for (var i = 0; i < Evt.targets.length; i++) {
							Evt.targets[i].changeHujia();
						};
					} else {
						return false;
					}
				},
				ai: {
					gainHujia: true
				}
			},
			//特典角色
			//海企鹅
			zhuhan: {
				trigger: { player: 'changeHujiaBegin' },
				filter(Evt, player) {
					return Evt.num >= 0;
				},
				forced: true,
				lastDo: true,
				content() {
					trigger.num++;
				},
				group: 'zhuhan_gainBy',
				subSkill: {
					gainBy: {
						trigger: { global: 'roundStart' },
						forced: true,
						filter(Evt, player) {
							return player.hujia < player.hp;
						},
						content() {
							'step 0'
							player.loseHp();
							'step 1'
							player.changeHujia();
						}
					},
				},
				ai: {
					gainHujia: true
				}
			},
			pobing: {
				trigger: { source: 'damageBegin2' },
				filter(Evt, player) {
					return player.hujia > Evt.player?.hujia;
				},
				// check(Evt,player){
				// 	return Evt.player.hp>player.hp&&get.attitude(player,Evt.player)<0;
				// },
				forced: true,
				logTarget: 'player',
				content() {
					'step 0'
					Evt.target = trigger.player;
					player.changeHujia(-player.hujia);
					'step 1'
					let num = 0;
					if (trigger.nature) num++;
					if (Evt.target.hp > player.hp) num++;
					if (Evt.target.getHistory('changeHujia').length) num++;
					num > 0 && (trigger.num += num);
				},
			},
			//海熊猫
			haishou: new toSkill('regard',{
				audio: 3,
				enable: 'chooseToUse',
				filterCard(card, player) {
					return get.type(card) != 'basic';
				},
				selectCard: 1,
				position: 'he',
				viewAs: { name: 'qi' },
				filter(Evt, player) {
					if (player.hasSkill('haishou_round')) return false;
					return player.countCards('he') > player.countCards('he', { type: 'basic' });
				},
				check(card) {
					var player = _status.event.player;
					if (card.name == 'qi') return 0;
					if (player.hp < player.maxHp) return 8 - get.value(card);
					return 3 - get.value(card);
				},
				onuse(result, player) {
					player.addTempSkill('haishou_round', 'roundStart')
				},
				subSkill: {
					round: {
						trigger: { source: 'damageBegin1' },
						silent: true,
						filter(Evt, player) {
							return Evt.nature;
						},
						content() {
							player.removeSkill('haishou_round');
						}
					},
				},
				involve:'qi',
				ai: {
					gainHujia: true
				}
			}),
			lishi: {
				audio: 2,
				trigger: { player: 'changeHujiaEnd' },
				filter(Evt, player) {
					return Evt.num < 0 && player.hujia == 0;
				},
				forced: true,
				lastDo: true,
				content() {
					player.draw();
				}
			},
			//海夸
			jinchen: {
				audio: 2,
				trigger: { player: 'phaseUseEnd' },
				lastDo: true,
				check(Evt, player) {
					return get.recoverEffect(player, player, player);
				},
				content() {
					'step 0'
					player.recover();
					player.turnOver();
					'step 1'
					player.chooseUseTarget({ name: 'chenmo' });
				},
				involve: 'chenmo'
			},
			qianyong: {
				audio: 2,
				trigger: { player: 'turnOverBefore' },
				filter(Evt, player) {
					return player.isTurnedOver();
				},
				locked: true,
				direct: true,
				lastDo: true,
				content() {
					'step 0'
					player.chooseTarget('###『潜涌』###使用一张无视防具的海杀，否则摸两张牌', function (card, player, target) {
						if (player == target) return false;
						return player.inRange(target) && player.canUse({ name: 'sha', nature: 'ocean' }, target, false);
					}).set('ai', function (target) {
						var player = _status.event.player;
						return get.effect(target, { name: 'sha', nature: 'ocean' }, player, player);
					});
					'step 1'
					if (result.targets?.length) {
						player.logSkill('qianyong', result.targets);
						player.useCard({ name: 'sha', nature: 'ocean' }, result.targets, false).card.qianyong = true;
					}
					else {
						player.logSkill('qianyong_draw')
						player.draw(2);
					}
				},
				ai: {
					unequip: true,
					skillTagFilter(player, tag, arg) {
						if (!arg || !arg.card || arg.card.qianyong != true) return false;
					},
				},
				mod: {
					targetEnabled(card, player, target, now) {
						if (target.isTurnedOver() && (card.name == 'sha' || (get.type2(card, false) == 'trick' && get.tag(card, 'damage')))) {
							if (player != target) return false;
						}
					},
				},
				involve: [{
					name: 'sha',
					nature: 'ocean'
				}],
				group: 'qianyong_addDam',
				subSkill: {
					addDam: {
						trigger: { source: 'damageBegin2' },
						priority: 6,
						forced: true,
						filter(Evt, player) {
							return Evt.nature == 'ocean' && player.isTurnedOver();
						},
						content() {
							trigger.num++;
						},
					},
					draw: { audio: 2 }
				},
			},
			//海向晚
			zhuiguang: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				filterTarget(card, player, target) {
					if (player != target) return true;
				},
				filterCard: true,
				selectCard: -1,
				lose: false,
				discard: false,
				prepare: 'give',
				content() {
					'step 0'
					game.hasPlayer(cur => {
						if (cur.hasSkill('zhuiguang_chehai') && cur.$.zhuiguang_chehai == player) cur.removeSkill('zhuiguang_chehai');
					});
					'step 1'
					target.gain(cards, player);
					target.changeHujia();
					'step 2'
					target.$.zhuiguang_chehai = player;
					target.addSkill('zhuiguang_chehai');
				},
				subSkill: {
					chehai: {
						mark: 'character',
						intro: {
							content: '需要保护$',
						},
						onremove: true,
						trigger: { global: ['useCardToTarget', 'dying'] },
						forced: true,
						filter(Evt, player) {
							var ava = Evt.name == 'useCardToTarget' ? Evt.target : Evt.player;
							return player.$.zhuiguang_chehai && ava == player.$.zhuiguang_chehai
								&& player.countCards('he') > 0 && get.type(Evt.card) != 'equip';
						},
						content() {
							'step 0'
							player.chooseCard('he', true, '###『追光澈海』###将一张牌交给' + get.translation(player.$.zhuiguang_chehai)).set('ai', function (card) {
								var player = _status.event.player;
								var ava = player.$.zhuiguang_chehai
								return get.value(card, ava, 'raw') * get.attitude(player, ava)
							});
							'step 1'
							if (result.bool) {
								player.give(result.cards, player.$.zhuiguang_chehai, 'giveAuto');
							};
						},
					},
				},
				ai: {
					order(item, player) {
						if (player.countCards('h') <= 2) return 6;
						return 1;
					},
					result: {
						player(player, target) {
							return -0.1;
						},
						target(player, target) {
							if (target.$.zhuiguang_chehai == player) return player.countCards('h') / 3 - player.hp + 1;
							return player.countCards('h') / 3 - player.hp + target.countCards('he') / 5 - 1;
						}
					},
					threaten: 0.8,
				},
			},
			ronglei: {
				trigger: { global: "useCardToTarget" },
				filter(Evt, player) {
					return Evt.target != player && Evt.targets.length == 1 && player.countCards('h') < player.getHandcardLimit() && get.type(Evt.card) != 'equip';
				},
				logTarget: 'target',
				content() {
					'step 0'
					var target = trigger.target;
					Evt.target = target;
					target.judge(function (card) {
						if (get.color(card) == 'red') return 1;
						return 0;
					});
					'step 1'
					if (result.color) {
						if (result.color == 'red') {
							game.asyncDraw([Evt.target, player]);
						}
						else {
							trigger.getParent().targets.add(player);
						}
					}
				}
			},

			//SP团长
			qiming: {
				audio: 5,
				global: 'qiming_viewH',
				group: ['qiming_begin', 'qiming_saycards', 'qiming_UseBy'],
				subSkill: {
					viewH: {
						ai: {
							viewHandcard: true,
							skillTagFilter(player, tag, target) {
								if (!game.hasPlayer(cur => {
									return cur.hasSkill('qiming');
								})) return false;
							},
						},
					},
					begin: {
						trigger: { global: 'roundStart' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							'step 0'
							if (player.hasMark('qiming_saycards')) player.unmarkSkill('qiming_saycards');
							player.$.qiming_saycards.length = 0;
							'step 1'
							Evt.videoId = lib.status.videoId++;
							var list = [];
							for (var i = 0; i < lib.inpile.length; i++) {
								var name = lib.inpile[i];
								if (get.type(name, 'trick') == 'trick') list.push(['锦囊', '', name]);
								if (get.type(name, 'trick') == 'equip') list.push(['装备', '', name]);
							}
							game.broadcastAll(function (id, list) {
								var dialog = ui.create.dialog('###『启明星辰』###声明一张牌', [list, 'vcard']);
								dialog.videoId = id;
							}, Evt.videoId, list);
							'step 2'
							let next = player.chooseButton(1, true);
							next.set('dialog', Evt.videoId);
							next.set('ai', function (button) {
								var value = player.getUseValue({ name: button.link[2], isCard: true });
								if (player.hasCard({ name: button.link[2] })) return 2 * value;
								return value;
							});
							'step 3'
							game.broadcastAll('closeDialog', Evt.videoId);
							if (result.bool) {
								player.logSkill('qiming');
								player.$.qiming_saycards.add(result.links[0][2]);
								game.log(player, '的『启明星辰』声明了【', player.$.qiming_saycards, '】');
								player.syncStorage('qiming_saycards');
								player.markSkill('qiming_saycards');
							}
						}
					},
					saycards: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = [];
						},
						locked: true,
						notemp: true,
						marktext: '明',
						intro: {
							content: '声明了$',
							name: '『启明星辰』',
						}
					},
					UseBy: {
						trigger: { global: 'useCard1' },
						priority: 999,
						forced: true,
						firstDo: true,
						filter(Evt, player) {
							return get.name(Evt.card) == player.$.qiming_saycards;
						},
						content() {
							trigger.player.draw();
							player.recover(trigger.player);
						}
					},
				},
			},
			shengbian: {
				audio: 2,
				trigger: { player: ['changeHp', 'changeHujiaEnd'] },
				filter(Evt, player) {
					return player.maxHp && (player.hujia ? (player.hp + player.hujia) : player.hp) > player.maxHp;
				},
				lastDo: true,
				forced: true,
				content() {
					'step 0'
					var hp = lib.character[player.name][2];
					hp = (typeof hp == 'string') ? Number(hp.substring(0, 1)) : hp;
					Evt.num = player.hujia * (player.hp - hp);
					player.hujia = 0;
					player.hp = hp;
					player.update();
					game.log(player, '体力和护甲重置为初始状态');
					'step 1'
					player.draw(Evt.num);
				},
			},
			tulong: {
				trigger: { player: 'dyingBegin' },
				filter(Evt, player) {
					return player.$.qiming_saycards && player.$.qiming_saycards[0] && get.info({ name: player.$.qiming_saycards[0] }).notarget !== true && player.countCards('h') && player.hasUseTarget(player.$.qiming_saycards[0]);
				},
				lastDo: true,
				direct: true,
				content() {
					'step 0'
					Evt.card = { name: player.$.qiming_saycards[0] };
					let next = player.chooseCardTarget({
						prompt: get.prompt('tulong'),
						prompt2: "将一张牌当作【" + player.$.qiming_saycards[0] + "】使用",
						filterCard(card, player) {
							return get.type(card) == 'equip' && lib.filter.cardDiscardable(card, player)
						},
						filterTarget(card, player, target) {
							return lib.filter.filterTarget(_status.event.card, player, target);
						},
					});
					next.selectTarget = lib.card[Evt.card.name].selectTarget || [1, 1];
					next.ai2 = function (target) {
						var player = _status.event.player;
						return get.effect(target, _status.event.card, player, player);
					},
						next.set('card', Evt.card)
					'step 1'
					if (result.bool && result.cards && result.targets) {
						player.logSkill('tulong');
						player.loseMaxHp();
						Evt.cards = result.cards.slice(0);
						Evt.targets = result.targets.slice(0);
						let next = player.useCard(Evt.card, Evt.targets);
						next.cards = Evt.cards;
					}
				},
				ai:{
					combo:'qiming'
				}
			},
			//SP鲨皇
			sp_guaisheng: {
				audio: 5,
				trigger: { global: 'damageBegin1' },
				priority: -10,
				init(player) {
					player.$.sp_guaisheng = { one: false, two: false, three: false, four: false, five: false, six: false, seven: false };
					//player.$.guaishengMap={1:false,2:false,3:false,12:false,13:false,23:false,123:false};
				},
				onremove(player) {
					delete player.$.sp_guaisheng;
				},
				direct: true,
				filter(Evt, player) {
					if (player.$.sp_guaisheng) {
						var num = 0;
						for (var i in player.$.sp_guaisheng) {
							if (player.$.sp_guaisheng[i] == false) num++;
						}
					}
					return num >= 1 && Evt.nature == 'ocean';
				},
				content() {
					'step 0'
					Evt.num = 2;
					Evt.list = { one: '选项一', two: '选项二', three: '选项三', four: '选项四', five: '选项五', six: '选项六', seven: '选项七' };
					'step 1'
					for (var i in player.$.sp_guaisheng) {
						if (player.$.sp_guaisheng[i] == true) {
							Evt.list[i] = '';
						}
					}
					//if(trigger.source==undefined) Evt.list['two']='';
					var list = [];
					for (var i in Evt.list) {
						if (Evt.list[i] != '') list.push(Evt.list[i]);
					}
					var choice = list.randomGet();
					var str = '『海洋怪声』：你可选择以下任意项构成未执行过的组合以执行：<br><br>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项一：' + '令一名角色摸一张牌' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项二：' + '弃置来源一张牌' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项三：' + '将本次伤害改为冰属性' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项四：' + '选项一和选项二组合' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项五：' + '选项一和选项三组合' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项六：' + '选项二和选项三组合' + '</div>';
					str += '<div class="popup text" style="width:calc(100% - 10px);margin-top:8px;display:inline-block">选项七：' + '选项一和选项二和选项三组合' + '</div>';
					list.push('cancel2');
					player.chooseControl(list, function () {
						return _status.event.choice;
					}).set('prompt', str).set('choice', choice);
					'step 2'
					if (result.control != 'cancel2') {
						Evt.num--;
						switch (result.control) {
							case '选项一': {
								player.$.sp_guaisheng['one'] = true;
								// Evt.one=true;				   
								break;
							}
							case '选项二': {
								// Evt.two=true;
								if (trigger.source && trigger.source.num('he')) player.discardPlayerCard('he', true, trigger.source); player.logSkill('sp_guaisheng', trigger.source);
								player.$.sp_guaisheng['two'] = true;
								Evt.goto(4);
								break;
							}
							case '选项三': {
								// Evt.three=true;
								trigger.nature = 'ice';
								player.logSkill('sp_guaisheng');
								player.$.sp_guaisheng['three'] = true;
								Evt.goto(4);
								break;
							}
							case '选项四': {
								// Evt.three=true;
								if (trigger.source && trigger.source.num('he')) player.discardPlayerCard('he', true, trigger.source); player.logSkill('sp_guaisheng', trigger.source);
								player.$.sp_guaisheng['four'] = true;
								break;
							}
							case '选项五': {
								//Evt.three=true;
								trigger.nature = 'ice';
								player.$.sp_guaisheng['five'] = true;
								break;
							}
							case '选项六': {
								// Evt.three=true;
								if (trigger.source && trigger.source.num('he')) player.discardPlayerCard('he', true, trigger.source); player.logSkill('sp_guaisheng', trigger.source);
								trigger.nature = 'ice';
								player.$.sp_guaisheng['six'] = true;
								Evt.goto(4);
								break;
							}
							case '选项七': {
								// Evt.three=true;
								if (trigger.source && trigger.source.num('he')) player.discardPlayerCard('he', true, trigger.source); player.logSkill('sp_guaisheng', trigger.source);
								trigger.nature = 'ice';
								player.$.sp_guaisheng['seven'] = true;
								break;
							}
						}
					}
					else {
						Evt.finish();
					}
					'step 3'
					player.chooseTarget(true, '『海洋怪声』：令一名角色摸一张牌', function (card, player, target) {
						return true;
					}).set('ai', function (target) {
						var player = _status.event.player;
						return get.attitude(player, target);
					});
					'step 4'
					if (result.targets?.length) {
						player.logSkill('sp_guaisheng', result.targets[0]);
						result.targets[0].draw();
					}
					var uncomplete = false;
					for (var i in player.$.sp_guaisheng) {
						if (player.$.sp_guaisheng[i] != true) {
							uncomplete = true; break;
						}
					}
					if (!uncomplete) {
						player.$.sp_guaisheng = { one: false, two: false, three: false, four: false, five: false, six: false, seven: false };
						player.changeHujia();
					}
				},
				ai: {
					gainHujia: true
				}
			},
			sp_guiliu: {
				audio: 5,
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'cardsDiscard' && Evt.getParent().name == 'orderingDiscard' && Evt.getParent().relatedEvent.name == 'useCard') return false;
					if (Evt.name == 'lose' && (Evt.getParent().name == 'useCard' || Evt.position != ui.discardPile)) return false;
					var cards = player.getCards('h');
					for (var i = 0; i < Evt.cards.length; i++) {
						if (get.position(Evt.cards[i], true) == 'd') {
							for (var j = 0; j < cards.length; j++) {
								if (get.color(Evt.cards[i]) == get.color(cards[j])) return true;
							}
						}
					}
					return false;
				},
				check(Evt, player) {
					return true;
				},
				usable: 1,
				content() {
					'step 0'
					Evt.cards = [], Evt.cards2 = {};
					if (trigger.cards && trigger.cards.length) Evt.num = trigger.cards.length;
					'step 1'
					Evt.num--;
					if (Evt.num >= 0) {
						var str = '『百川归流』：选择并展示任意张同色的牌可以将';
						str += get.translation(trigger.cards[Evt.num]);
						str += '等量复制洗入牌堆';
						player.chooseCard(true, [0, player.num('h')], function (card, player) {
							return get.color(card) == get.color(trigger.cards[Evt.num]);
						}).set('ai', function (card) {
							return 10 - get.value(card);
						}).set('prompt', str);
					}
					else {
						Evt.finish();
					}
					'step 2'
					if (result.cards && result.cards.length) {
						player.showCards(result.cards);
						Evt.numx = result.cards.length;
						Evt.goto(3);
					}
					else {
						if (Evt.num >= 0) {
							Evt.goto(1);
						}
						else {
							Evt.finish();
						}
					}
					'step 3'
					var card = game.createCard(trigger.cards[Evt.num].name, trigger.cards[Evt.num].suit, trigger.cards[Evt.num].number, trigger.cards[Evt.num].nature);
					if (!Evt.cards2[Evt.numx]) Evt.cards2[Evt.numx] = [];
					Evt.cards2[Evt.numx].push(card);
					while (Evt.numx--) {
						var card = game.createCard(trigger.cards[Evt.num].name, trigger.cards[Evt.num].suit, trigger.cards[Evt.num].number, trigger.cards[Evt.num].nature);
						for (var i = 0; i < trigger.cards[Evt.num]['classList'].length; i++) {
							if (!card.classList.contains(trigger.cards[Evt.num]['classList'][i])) card.classList.add(trigger.cards[Evt.num]['classList'][i]);
						}
						Evt.cards.push(card);
					}
					//if(Evt.num>=0) Evt.goto(1);
					'step 4'
					Evt.cards.randomSort();
					for (let i = 0; i < Evt.cards.length; i++) {
						ui.cardPile.appendChild(Evt.cards[i]);
					}
					for (let i in Evt.cards2) {
						if (Evt.cards2[i].length > 1) {
							game.log(player, '将', Evt.cards2[i], '各', i, '张洗入了牌堆');
						}
						else {
							game.log(player, '将', Evt.cards2[i], i, '张洗入了牌堆');
						}
					}
					var list = ['海', '沉', '浪', '落', '涌', '漩', '涡', '没', '浮', '淹', '洪', '河', '酒', '渡', '洞'], cards = [], card = trigger.cards[Evt.num];
					if (card.classList[2] == 'ocean') cards.push(card);
					for (let i in list) {
						var names = get.translation(card);
						for (var k = 0; k < names.length; k++) {
							if (names[k] == list[i] && !cards.contains(card)) cards.push(card);
						}
					}
					if (cards.length) player.gain(cards, 'gain2');
				},
			},
		},
		characterReplace: {
			ShirakamiHaruka: ['ShirakamiHaruka', 're_ShirakamiHaruka'],
		},
		dynamicTranslate: {
			tulong(player) {
				if (player.$.qiming_saycards && player.$.qiming_saycards.length) return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作<font color=#fcd>【' + get.translation(player.$.qiming_saycards) + '】</font>使用。';
				return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作本轮『启明星辰』中声明的牌使用。';
			},
			miaoyu(player) {
				let str = lib.translate.miaoyu_info;
				let result = /(阳~.*?)[；。].*(阴~.*?)[；。]/g.exec(str);
				let yang = result[1], yin = result[2];
				if (player.$.miaoyu === true) return str.replace(yang, lib.spanClass(yang, 'changetext'));
				return str.replace(yin, lib.spanClass(yin, 'changetext'));
			},
		},
		translate: {
			sea_emperor: `化鲸皇`,
			HOLOEN: `holoEN`,

			sea_HosimiyaSio: `海·星宫汐`,
			zhuhan: `筑寒`,
			zhuhan_info: `锁定技 你的护甲获得量+1；轮次开始时，若你的护甲少于体力，你失去一点体力并获得等量护甲*。`,
			zhuhan_append: lib.figurer(`特性：叠甲`),
			pobing: `破冰`,
			pobing_info: `锁定技 你对护甲少于自己的角色造成伤害时，失去所有护甲，根据满足的项数，令此伤害等量增加：<br>
			伤害为属性伤害；目标体力多于你；目标在当前回合获得了护甲。`,

			sea_SasakiSaku: `海·笹木咲`,
			haishou: `煽动海兽`,
			haishou_info: `每轮限一次，你可以将任一非基本牌当【气】使用；你造成属性伤害时，重置此技能。`,
			haishoun_append: lib.figurer(`特性：叠甲`),
			lishi: `幕下力士`,
			lishi_info: `锁定技 你失去最后1点护甲*时，摸一张牌。`,

			sea_MinatoAqua: `海·湊阿夸`,
			jinchen: `浸沉`,
			jinchen_info: `出牌阶段结束时，你可以回复一点体力并翻面*，视为使用一张【沉没】。`,
			qianyong: `潜涌`,
			qianyong_info: `锁定技 当你背面朝上时，你不能成为其他角色的【杀】或伤害类锦囊的目标且造成的海洋伤害+1；当你翻至正面时，可以视为使用一张无视防具的【海杀】或摸两张牌。`,
			qianyong_draw: `潜涌`,

			sea_Ava: `海·向晚`,
			zhuiguang: `追光澈海`,
			zhuiguang_info: `出牌阶段限一次，你可以将所有手牌交给一名其他角色并令其获得1点护甲*，然后直到你下一次发动此技能：你每一次成为非装备牌的目标或进入濒死状态时，其需交给你一张牌。`,
			zhuiguang_chehai: `追光澈海`,
			zhuiguang_chehai_info: `向晚成为非装备牌的目标或进入濒死状态时，你需交给其一张牌。`,
			ronglei: `眀渊融泪`,
			ronglei_info: `其他角色成为非装备牌的唯一目标时，若你手牌少于上限，你可以令其进行一次判定：若为红色，你和其各摸一张牌；若为黑色，你也成为此牌的目标。`,

			NagaoKei: `长尾景`,
			nkfumo: `伏魔`,
			nkfumo_info: `你使用牌指定其他角色为唯一目标时，你可以进行判定，若结果为黑色，将之效果改为【浪涌】。当你使用锦囊牌后，重置『忖度』。`,
			chidu: `忖度`,
			chidu_info: `每回合限一次，当判定牌生效前，你可以打出一张颜色与结果不同的手牌替换之。`,

			NishizonoChigusa: `西园千草`,
			qiti: `气嚏`,
			qiti_info: `你受到属性伤害后，可以交给来源一张牌，令其交给你X张牌。（X为你已损失的体力+1）`,
			miaoyu: `喵鱼`,
			miaoyu_info: `转换技 阳~你不因摸牌获得牌时，可以令一名角色获得1点护甲*。阴~你不因弃牌失去牌时，可以视为使用一张无距离限制的【海杀】。`,
			miaoyu_append: lib.figurer(`特性：叠甲`),

			ShirakamiHaruka: `白神遥`,
			baoxiao: `豹笑`,
			baoxiao_info: `锁定技 你使用【海杀】不计入次数，且每指定一名无护甲角色为目标，你摸一张牌。`,
			quru: `取乳`,
			quru_info: `出牌阶段，你可以将两张非基本牌当作【海杀】使用，若你因此失去了某区域的最后一张牌，你获得1点护甲*；<br>
			此【杀】造成伤害时，你可以失去所有护甲令伤害等量增加。`,
			quru_append: lib.figurer(`特性：叠甲`),

			KisaragiKoyori: `如月こより`,
			shinve: `尸虐`,
			shinve_info: `锁定技 你体力减少时，获得等量护甲*。准备阶段，你失去所有护甲，摸等量的牌。`,
			shinve_append: lib.figurer(`特性：叠甲`),
			juzu: `举组`,
			juzu_info: `<font color=#ed5>觉醒技</font> 手牌数多于你的角色对你造成伤害后，你增加1点体力上限并摸牌至体力上限，获得技能『海狗』。`,
			haigou: `海狗`,
			haigou_info: `锁定技 你造成的海洋伤害+1。手牌数多于你的角色无法响应你使用的能造成伤害的牌。`,

			GawrGura: `噶呜·古拉`,
			lingqun: `领群`,
			lingqun_info: `锁定技 你于弃牌阶段弃牌后获得等量护甲*。你的手牌数多于体力值时，你的护甲效果改为使你增加等量手牌上限。`,
			lingqun_append: lib.figurer(`特性：叠甲`),
			yangliu: `洋流`,
			yangliu_info: `当你使用能造成伤害的牌时，可以扣减1点护甲将此伤害改为海洋属性。然后你摸一张牌；或令之不可被响应。`,

			NinomaeInanis: `一伊那尔栖`,
			mochu: `墨触`,
			mochu_info: `你造成暗影/海洋属性伤害时，可以摸/弃一张牌，使之改为海洋属性伤害/令你回复等同伤害值的体力。`,
			fuyue: `富岳`,
			fuyue_info: `每回合限一次，一名角色使用属性【杀】指定目标时，你可以令其视为对你使用【沉没】，你每因此失去一张牌，便可以为此【杀】额外指定一名目标。`,

			Nana7mi: `七海Nana7mi`,
			Nana7mi_ab: `七海`,
			xieqi: `携七`,
			xieqi_info: `每回合限一次，你可以将任意张点数合计为7倍数的手牌当化鲸篇的一张牌使用，若仅指定了一名角色为目标，你摸等同于以此法失去牌数的牌。`,
			youhai: `佑海`,
			youhai_info: `你使用点数或点数合计为7的牌时，可以令至多X名角色各获得一点护甲*。（X为你已损失的体力值）`,
			youhai_append: lib.figurer(`特性：叠甲`),

			sp_HisekiErio: `皇·绯赤艾利欧`,
			qiming: `启明星辰`,
			qiming_info: `锁定技 你在场时所有角色明置手牌。一轮开始时，你可以声明一种非基本牌，本轮内使用此牌同名牌的角色摸一张牌并令你回复1点体力。`,
			shengbian: `升变征途`,
			shengbian_info: `锁定技 当你的体力或护甲变化后，若你体力与护甲之和大于体力上限，你将体力和护甲重置至开始状态，然后摸X张牌。（X为你因此失去的体力与护甲之乘积）`,
			tulong: `屠龙伐彼`,
			tulong_info: `你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作本轮『启明星辰』中声明的牌使用。`,

			sp_GawrGura: `皇·噶呜·古拉`,
			sp_guaisheng: `海洋怪声`,
			sp_guaisheng_info: `当一名角色造成海洋伤害时，你可选择以下任意项构成未执行过的组合以执行：1.令一名角色摸一张牌；2.弃置来源一张牌；3.将本次伤害改为冰属性。<br>
			然后若你执行过所有的组合，获得1点护甲*，重置此技能。`,
			sp_guaisheng_append: lib.figurer(`特性：叠甲`),
			sp_guiliu: `百川归流`,
			sp_guiliu_info: `每回合限一次，当一张牌不因使用进入弃牌堆时，你可以展示任意同色的牌，将此牌的等量复制洗入牌堆。且若此牌牌面中有“氵”，你获得之。`,

		},
	}
});