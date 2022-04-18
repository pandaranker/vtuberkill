window.game.import('character', function (lib, game, ui, get, ai, _status) {
	let Evt: { [propName: string]: any }
	return {
		name: 'nijisanji',
		connect: true,
		character: {
			/**物述有栖 */
			MononobeAlice: ['female', 'nijisanji', 3, ['tinenghuifu1', 'dianmingguzhen']],
			/**静凛 */
			ShizukaRin: ['female', 'nijisanji', 4, ['mozhaotuji']],
			/**家长麦 */
			IenagaMugi: ['female', 'nijisanji', 3, ['fengxue', 'yuepi', 'cangxiong']],
			/**月之美兔 */
			MitoTsukino: ['female', 'nijisanji', 3, ['mark_bingdielei', 'mark_quanxinquanyi', 'qiujinzhiling'], ['zhu']],
			/**宇志海莓 */
			UshimiIchigo: ['female', 'nijisanji', 3, ['kuangbaoshuangren', 'guangsuxiabo']],
			/**铃鹿诗子 */
			SuzukaUtako: ['female', 'nijisanji', 3, ['meici', 'danlian']],
			/**樋口枫 */
			HiguchiKaede: ['female', 'nijisanji', 4, ['mark_zhenyin']],
			/**修女克蕾雅 */
			SisterClearie: ['female', 'nijisanji', 3, ['zhenxin', 'sczhuwei']],
			/**熊猫人 */
			SasakiSaku: ['female', 'nijisanji', 3, ['tiaolian', 'jiaku']],
			/**健屋花那 */
			SukoyaKana: ['female', 'nijisanji', 3, ['huawen', 'liaohu']],
			/**白雪巴 */
			ShirayukiTomoe: ['female', 'nijisanji', 4, ['gonggan', 'yeyu']],
			/**Elu */
			Elu: ['female', 'nijisanji', 3, ['huangran', 'senhu']],
			/**皇女 */
			LizeHelesta: ['female', 'nijisanji', 3, ['shencha', 'helesta'], ['zhu']],
			/**露露 */
			SuzuharaLulu: ['female', 'nijisanji', 5, ['zhongli', 'xinhuo', 'weizhuang']],
			/**阿喵喵 */
			AmamiyaKokoro: ['female', 'nijisanji', 3, ['miaomiao', 'chengneng']],
			/**社长 */
			KagamiHayato: ['male', 'nijisanji', 3, ['liebo', 'zhongjizhimeng']],
			/**山神歌流多 */
			YagamiKaruta: ['female', 'nijisanji', 3, ['suisi', 'liefeng']],
			/**雪城真寻 */
			YukishiroMahiro: ['female', 'nijisanji', 3, ['jiaoming', 'changhe']],
			/**小野町春香 */
			OnomachiHaruka: ['female', 'nijisanji', 3, ['nvjiangrouhao', 'yinlaiyaotang']],
			/**樱凛月 */
			SakuraRitsuki: ['female', 'nijisanji', 3, ['zhuqiao']],
			/**刀也 */
			KenmochiDouya: ['male', 'nijisanji', 4, ['shenglang', 'nodao']],
			/**Gaku */
			FushimiGaku: ['male', 'nijisanji', 4, ['exi', 'suisui']],
			/**奈罗花 */
			Naraka: ['female', 'nijisanji', 3, ['echi', 'mudu'],],
		},
		characterSort: {
			nijisanji: {
				nijisanji_1: ['MitoTsukino', 'HiguchiKaede', 'ShizukaRin', 'Elu'],
				nijisanji_2: ['SuzukaUtako', 'UshimiIchigo', 'IenagaMugi', 'MononobeAlice', 'KenmochiDouya'],
			}
		},
		characterIntro: {
			MononobeAlice: '物述有栖者，雷电掌控者也，寄以jk身份隐藏之，然尝小嘴通电，小兔子皆知爱丽丝非凡人，喜红茶，尤善奥术魔刃，为北方氏族youtube恶之，V始十八年，举家迁徙bilibili，V始二十年，月之美兔揭竿而起，爱丽丝毁家纾难，以家助美兔建国，拜一字并肩王。',
			HiguchiKaede: '樋口枫者，关西之游侠也，姿色天然占尽风流，善以琴杀人，来去翩翩，有宾客枫组三千，V始二十年，月之美兔兴于西北，自封委员长、上将军，建国曰彩虹，枫率宾客从之，枫尝与杏之福禄将军萝卜子交好，惺惺相惜，成V界之佳话。',
			ShizukaRin: '静凛者，皇族也，因父败于樱巫女被贬为庶人，遂恨朝廷，先随绊爱征战，绊爱初建国，不慕名利，往杏国扶之，先取天水后取临沂，成杏国之伟业，元昭欲拜之国师，又避之，尝与美兔弈棋，战百余合，喜曰：美兔知我矣！遂安于彩虹。',
			IenagaMugi: '家长麦者，诸国之辩士也，善言辞，三言便使otaku气坠于马下，吐血斗升，Mugi嗜乐如命，与当世之乐圣交好，互为知音。英语上手，身负苦难，为父母厌恶之人，麦自V始年间便游于天下，为救美兔取祸于朝廷，流亡海外，有《辩书》广为人知。',
			MitoTsukino: '彩虹社的红龙、英才教育者，虹社的统领者、lonely eater、全人类之委员长、脑控宗师、月之小丑、双生暗影、行为艺术家、至高魔主、怒涛聚集、海洋王者、永不沉寂者、彩虹社永远滴真神，月之美兔是也。',
			UshimiIchigo: "宇志海莓者，深海之海兔也，修炼千年化形为人，海莓原自起于海滨，拥者不计其数，性狂暴，曾以一人顶勒夫千军，V始二十年，美兔兴，海莓从之，首封平西候，海莓嗜睡，时到即宕机，美兔遣御前侍卫日夜守之。",
			SuzukaUtako: '腐烂的贞德、历战的尸套龙、饥饿的恐暴龙、攻击性的母性、古老的腐女、每秒都在渗出黑历史的女人、801战争的英灵、腐女子的末路、从温暖的图片中看出阴暗的女人、背景是正太自助餐、深网的魔物、过滤未成年直播者、彩虹社诞生出的怪物、DeathZone、唯一让DD害怕的大姐姐、国际问题、邪神美兔崇拜者、十年后的月之美兔、属性商店、神造兵器、有行动力的变态、出口即是真言、行走的HiAce、酒淋浴、母性的墓场、假面具即将掉落的铃鹿诗子。',
			SisterClearie: '“今日也愿神加护于你……”',
		},
		skill: {
			tinenghuifu1: {
				audio: true,
				trigger: { player: 'loseAfter' },
				forced: true,
				filter(Evt, player) {
					return Evt.es && Evt.es.length > 0;
				},
				content() {
					"step 0"
					Evt.count = trigger.es.length;
					"step 1"
					Evt.count--;
					player.recover();
					"step 2"
					if (Evt.count > 0) {
						Evt.goto(1);
					}
				},
				group: ['tinenghuifu1_hp'],
				subSkill: {
					hp: {
						trigger: { player: 'changeHp' },
						forced: true,
						filter(Evt, player) {
							return Evt.num < 0 && player.isDamaged();
						},
						content() {
							player.draw(1);
						}
					}
				},
				ai: {
					maixie: true,
					maixie_hp: true
				}
			},
			dianmingguzhen: {
				audio: 2,
				enable: "phaseUse",
				usable: 1,
				filter(Evt, player) {
					return player.canMoveCard(null, true);
				},
				content() {
					'step 0'
					player.loseHp(1);
					'step 1'
					player.moveCard(true)
						.set('nojudge', true)
						.set('ai', function (target) {
							var player = _status.event.player;
							var att = get.attitude(player, target);
							var sgnatt = get.sgn(att);
							if (ui.selected.targets.length == 0) {
								if (target == player) {
									var es = player.getCards('e');
									for (var i = 0; i < es.length; i++) {
										var effect = 0;
										game.filterPlayer(cur => {
											if (cur.isEmpty(get.subtype(es[i]))) effect++;
										})
										return 3 * effect;
									}
								}
								if (att > 0) {
									if (target.countCards('e', card => {
										return get.value(card, target) < 0
											&& game.hasPlayer(cur => cur != player && cur != target && get.attitude(player, cur) < 0 && cur.isEmpty(get.subtype(card)));
									}) > 0) return 9;
								}
								else if (att < 0) {
									if (game.hasPlayer(cur => {
										if (cur != target && cur != player && get.attitude(player, cur) > 0) {
											var es = target.getCards('e');
											for (var i = 0; i < es.length; i++) {
												if (get.value(es[i], target) > 0 && cur.isEmpty(get.subtype(es[i])) && get.value(es[i], cur) > 0) return true;
											}
										}
									})) {
										return -att;
									}
								}
								return 0;
							}
							var es = ui.selected.targets[0].getCards('e');
							var att2 = get.sgn(get.attitude(player, ui.selected.targets[0]));
							for (let i = 0; i < es.length; i++) {
								if (ui.selected.targets[0] == player && target.isEmpty(get.subtype(es[i]))) {
									var effect = 0;
									game.filterPlayer(cur => {
										if (cur.isEmpty(get.subtype(es[i])) && cur != target) effect += get.effect(cur, { name: 'sha' }, player, player);
									});
									return 2 * (effect + att);
								}
								if (sgnatt != 0 && att2 != 0 &&
									get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
									get.sgn(get.value(es[i], target)) == sgnatt &&
									target.isEmpty(get.subtype(es[i]))) {
									return Math.abs(att);
								}
							}
							return -att * get.attitude(player, ui.selected.targets[0]);
						})
						.set('forced', true);
					'step 2'
					if (result.targets[0] != player) {
						Evt.finish();
					}
					else {
						Evt.equiptype = get.subtype(result.card);
						Evt.players = game.filterPlayer(cur => cur != player && !cur.getEquip(Evt.equiptype)).sortBySeat(player);
						if (Evt.judgeGroup == null)
							Evt.judgeGroup = [];
					}
					'step 3'
					if (Evt.playersIndex == null) {
						Evt.playersIndex = 0;
					}
					if (Evt.playersIndex < Evt.players.length) {
						if (!Evt.players[Evt.playersIndex].getEquip(Evt.equiptype)) {
							player.useCard({ name: 'sha', nature: 'thunder', isCard: true }, Evt.players[Evt.playersIndex], false);
						}
					}
					'step 4'
					if (!result.bool) {
						Evt.judgeGroup.add(Evt.players[Evt.playersIndex]);
					}
					if (Evt.players[++Evt.playersIndex]) Evt.goto(3);
					'step 5'
					if (Evt.judgeGroup.length > 0) {
						var shanString = '<br>';
						for (let i = 0; i < Evt.judgeGroup.length; i++) {
							shanString += (get.translation(Evt.judgeGroup[i]) + ',');
						}
						var check = 0;
						for (let i of Evt.judgeGroup) {
							check += lib.card.shandian.ai.result.target(player, i)
						}
						player.chooseBool('是否对所有闪避者追加闪电判定？' + shanString).set('check', check).ai = function () {
							return _status.event.check > 0;
						};
					}
					else {
						Evt.finish();
					}
					'step 6'
					if (!result.bool) {
						Evt.finish();
					}
					'step 7'
					Evt.judgeGroup[0].judge(card => {
						if (get.suit(card) == 'spade' && (get.number(card) >= 2 && get.number(card) <= 9)) return 2;
					}).callback = function () {
						var number = Evt.judgeResult.number;
						if (Evt.judgeResult.suit == 'spade' && (number >= 2 && number <= 9)) {
							player.damage(3, 'thunder', 'nosource');
						}
					};
					'step 8'
					game.delay();
					Evt.judgeGroup.shift();
					if (Evt.judgeGroup.length > 0) Evt.goto(7);
				},
				ai: {
					useSha: 2,
					order: 7,
					result: {
						player(player, target) {
							if (player.hp != 1) return 1;
							else return -2;
						},
					},
				},
			},
			mozhaotuji: {
				group: ['mozhaotuji_DrawOrStop', 'mozhaotuji_useCard', 'mozhaotuji_change'],
				subSkill: {
					DrawOrStop: {
						audio: true,
						audioname: ['jike'],
						trigger: { global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd'] },
						filter(Evt, player) {
							if (player.$.mozhaotuji_useCard >= 1)
								return true;
							else if (player.$.mozhaotuji_useCard == 0)
								return player == _status.currentPhase;
							else
								return false;
						},
						priority: 14,
						direct: true,
						content() {
							'step 0'
							if (player.$.mozhaotuji_useCard >= 2) {
								player.logSkill('mozhaotuji');
								player.draw(1);
							}
							else if (trigger.name == 'phaseUse' && player.$.mozhaotuji_useCard == 0) {
								player.addTempSkill('mozhaotujiStop');
							}
							player.$.mozhaotuji_useCard = 0;
							'step 1'
						},
					},
					useCard: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger: { player: 'useCardAfter' },
						direct: true,
						silent: true,
						priority: 1,
						content() {
							player.$.mozhaotuji_useCard++;
						},
					},
					/**转化阶段 */
					change: {
						audio: 'mozhaotuji',
						trigger: {
							player: ['phaseZhunbeiBegin', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseDiscardBefore', 'phaseJieshuBegin']
						},
						filter(Evt, player) {
							return !player.hasSkill('mozhaotujiStop');
						},
						check(Evt, player) {
							return Evt.name === 'phaseJudge' && player.countCards('j') > 1
								|| ['phaseDiscard', 'phaseJieshu'].includes(Evt.name);
						},
						prompt(Evt, player) {
							return `把${get.$t(Evt.name)}转换为出牌阶段`;
						},
						content: [function () {
							trigger.cancel();
						}, function () {
							player.phaseUse();
						}, function () {
							let stat = player.getStat();
							stat.card = {};
							for (let i in stat.skill) {
								let bool = false;
								let info = lib.skill[i];
								if (info.enable != undefined) {
									if (typeof info.enable == 'string' && info.enable == 'phaseUse') bool = true;
									else if (typeof info.enable == 'object' && info.enable.contains('phaseUse')) bool = true;
								}
								if (bool) stat.skill[i] = 0;
							}
						}],
					},
				}
			},
			mozhaotujiStop: {},
			fengxue: {
				trigger: {
					player: 'phaseUseBefore'
				},
				check(Evt, player) {
					return !player.needsToDiscard() || (player.hp >= 1 && player.countCards('h') <= 3 && player.countCards('e') >= 1);
				},
				content() {
					'step 0'
					trigger.cancel();
					'step 1'
					ui.clear();
					var num = game.countPlayer(cur => cur != player && cur.hp >= player.hp) + 1;
					var cards = get.cards(num);
					Evt.cards = cards;
					Evt.gains = [];
					Evt.discards = [];
					game.cardsGotoOrdering(cards).relatedEvent = Evt.getParent();
					var dialog = ui.create.dialog('奋学(使用一张牌)', cards, true);
					_status.dieClose.push(dialog);
					dialog.videoId = lib.status.videoId++;
					game.addVideo('cardDialog', null, ['奋学', get.cardsInfo(cards), dialog.videoId]);
					Evt.getParent().preResult = dialog.videoId;
					game.broadcast(function (cards, id) {
						var dialog = ui.create.dialog('奋学', cards, true);
						_status.dieClose.push(dialog);
						dialog.videoId = id;
					}, cards, dialog.videoId);
					Evt.dialog = dialog;
					game.log(player, '亮出了', '#y牌堆顶的牌');
					//var content=['牌堆顶的'+Evt.cards.length+'张牌',Evt.cards];
					//player.chooseControl('ok').set('dialog',content);
					var chooseButton = player.chooseButton(true).set('dialog', dialog.videoId).set('filterButton', function (button) {
						let player = _status.event.player;
						return player.hasUseTarget(button.link)
					}).set('ai', function (button) {
						return get.value(button.link, _status.event.player);
					});
					Evt.chooseButton = chooseButton;
					'step 2'
					if (!result.links[0]) {
						ui.clear();
						Evt.finish();
					}
					else {
						if (player.hasUseTarget(result.links[0])) {
							player.chooseUseTarget(result.links[0], true, false);
						}
						else Evt.discards.push(result.links[0]);
						Evt.cards.remove(result.links[0]);
					}
					'step 3'
					ui.clear();
					'step 4'
					Evt.dialog.close();
					_status.dieClose.remove(Evt.dialog);
					game.broadcast(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					}, Evt.dialog.videoId);
					if (Evt.cards.length == 0) {
						Evt.finish();
					}
					'step 5'
					game.cardsGotoOrdering(cards).relatedEvent = Evt.getParent();
					var dialog = ui.create.dialog('奋学(获取一种花色牌)', cards, true);
					_status.dieClose.push(dialog);
					dialog.videoId = lib.status.videoId++;
					game.addVideo('cardDialog', null, ['奋学(获取一种花色牌)', get.cardsInfo(cards), dialog.videoId]);
					Evt.getParent().preResult = dialog.videoId;
					game.broadcast(function (cards, id) {
						var dialog = ui.create.dialog('奋学(获取一种花色牌)', cards, true);
						_status.dieClose.push(dialog);
						dialog.videoId = id;
					}, cards, dialog.videoId);
					Evt.dialog = dialog;
					var chooseButton = player.chooseButton(true).set('dialog', dialog.videoId).set('ai', function (button) {
						return get.value(button.link, _status.event.player);
					});
					Evt.chooseButton = chooseButton;
					'step 6'
					if (result.links[0]) {
						game.log(player, '选择了', get.translation(get.suit(result.links[0]) + '2'));
						Evt.cards.forEach(card => {
							if (get.suit(card) == get.suit(result.links[0])) {
								Evt.gains.push(card);
							}
							else {
								Evt.discards.push(card);
							}
						});
					}
					if (Evt.discards.length) {
						player.$throw(Evt.discards);
						game.cardsDiscard(Evt.discards);
					}
					if (Evt.gains.length) {
						//game.log(player,'获得了',Evt.gains);
						player.gain(Evt.gains, 'gain2');
					}
					'step 7'
					Evt.dialog.close();
					_status.dieClose.remove(Evt.dialog);
					game.broadcast(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					}, Evt.dialog.videoId);
				},
				ai: {
					result: {
						player(player) {
							if (player.hp < 2) return -2;
							if (player.countCards('e') >= 2) return 1;
							return -2;
						}
					},
				}
			},
			yuepi: {
				trigger: {
					player: 'phaseDiscardBefore',
				},
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				content() {
					'step 0'
					player.chooseCard('h', [1, player.countCards('e') + 1], true, '『乐癖』：请选择重铸的牌');
					'step 1'
					if (result.bool) {
						Evt.num = result.cards.length
						player.lose(result.cards, ui.discardPile, 'visible');
						player.$throw(result.cards, 1000);
						game.log(player, '将', cards, '置入了弃牌堆');
					}
					else Evt.finish()
					'step 2'
					player.draw(Evt.num);
					player.$.yuepi_handLimit = Evt.num
					player.addTempSkill('yuepi_handLimit', { player: 'phaseDiscardAfter' });
				},
				subSkill: {
					handLimit: {
						mod: {
							maxHandcard(player, num) {
								return num + player.$.yuepi_handLimit;
							},
						}
					}
				}
			},
			cangxiong: {
				trigger: {
					global: 'changeHp'
				},
				filter(Evt, player) {
					if (!Evt.player || Evt.player == player || player.countCards('h') == 0) return false;
					return Evt.player.hp == 1;
				},
				check(Evt, player) {
					var att = get.attitude(player, Evt.player);
					return (att > 0 && Evt.player != _status.currentPhase) || (att < 0 && Evt.player == _status.currentPhase && (Evt.player.countCards('h') - player.countCards('h')) <= 1);
				},
				content() {
					'step 0'
					player.chooseCard('h', [1, Infinity], true, '请选择要给对方的牌')
						.set('ai', card => {
							var target = _status.event.getTrigger().player;
							console.log(target);
							if ((target.countCards('h') + ui.selected.cards.length) > (player.countCards('h') - ui.selected.cards.length)) return -1;
							return 7 - get.value(card);
						});
					'step 1'
					if (result.cards) {
						trigger.player.gain(result.cards, player, 'giveAuto');
					}
					'step 2'
					if (trigger.player.countCards('h') > player.countCards('h')) {
						if (player.$.outPlayers == null) {
							player.$.outPlayers = [];
						}
						player.$.outPlayers.push(trigger.player);
						trigger.player.addTempSkill('cangxiong_diao', 'none');//移除游戏
						game.broadcastAll(function (splayer) {
							splayer.out('cangxiong_diao');
						}, trigger.player
						)
					}
				},
				subSkill: {
					diao: {
						trigger: { global: ['phaseAfter', 'turnOverAfter'] },
						mark: true,
						direct: true,
						filter(Evt, player) {
							if (Evt.player.next !== player) {
								return false;
							}
							else if (Evt.name == 'turnOver' && Evt.player.isTurnedOver()) {
								return false;
							}
							else if (Evt.name == 'turnOver' && Evt.player != _status.currentPhase) {
								return false;
							}
							else {
								game.broadcastAll(function (splayer) {
									splayer.in('cangxiong_diao');
								}, player
								)
							}
							return true;
							//player.in('cangxiong_diao');
							//player.in('cangxiong_diao');
							//

						},
						intro: {
							content: '移除游戏外'
						},
						content() {
							game.broadcastAll(function (splayer) {
								_status.dying.remove(splayer);
							}, player)
							player.removeSkill('cangxiong_diao');
						}
					},
				},
				ai: {
					basic: {
						order: 10
					},
					result: {
						target(player, target) {
							return get.attitude(player, target)
						},
					},
					threaten: 1.3
				}
			},

			mark_bingdielei: {
				audio: 'bingdielei',
				group: 'mark_bingdielei_damageBy',
				subSkill: {
					damageBy: {
						trigger: { player: 'damageBegin4', source: 'damageBegin4' },
						priority: 99,
						filter(Evt, player) {
							return Evt.num && !Evt.getParent('phase').skill;
						},
						direct: true,
						content() {
							"step 0"
							if (trigger.delay == false) game.delay();
							"step 1"
							player.addTempSkill('mark_bingdielei_anotherPhase');
						},
					},
					anotherPhase: {
						audio: 'bingdielei',
						trigger: { global: 'phaseEnd' },
						marktext: '并',
						mark: true,
						filter(Evt, player) {
							return player.countDiscardableCards(player, 'he', { suit: 'club' }) || player.countCards('he', { type: 'equip' });
						},
						intro: {
							content: '当前回合结束后可以获得一个额外回合',
							name: '并蒂恶蕾',
						},
						direct: true,
						popup: false,
						content() {
							'step 0'
							player.chooseToDiscard('###是否发动『并蒂恶蕾』？###弃置一张♣或装备牌以获得一个额外回合', 'he', function (card) {
								return get.suit(card) == 'club' || get.type(card) == 'equip';
							}).set('logSkill', Evt.name)
							'step 1'
							if (result.bool) {
								player.unmarkSkill(Evt.name);
								player.insertPhase();
							}
						},
					},
				},
				ai: {
					maixie: true,
				},
			},
			mark_quanxinquanyi: {
				audio: 'quanxinquanyi',
				init(player, skill) {
					player.storage[skill] = [];
				},
				group: ['mark_quanxinquanyi_begin', 'mark_quanxinquanyi_saycards', 'mark_quanxinquanyi_loseBy', 'mark_quanxinquanyi_endRound'],
				subSkill: {
					begin: {
						trigger: { global: 'roundStart' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							'step 0'
							if (player.hasMark('mark_quanxinquanyi_saycards')) player.unmarkSkill('mark_quanxinquanyi_saycards');
							if (!player.$.mark_quanxinquanyi_loseBy) player.$.mark_quanxinquanyi_loseBy = true;
							player.$.mark_quanxinquanyi_saycards.length = 0;

							var list = [];
							for (var i = 0; i < lib.inpile.length; i++) {
								var name = lib.inpile[i];
								var reapeat = 0;
								if (player.$.mark_quanxinquanyi.length) {
									player.$.mark_quanxinquanyi.forEach(function (his) {
										if (his == name) reapeat++;
									});
								}
								if (reapeat || name == 'wuxie' || name == 'jinchan') continue;
								else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							}
							if (!list.length) Evt.finish();
							else Evt.list = list;
							'step 1'
							player.chooseBool('###是否发动『全新全异』？###一轮开始时，你可以声明一张未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。')
							'step 2'
							if (result.bool) {
								player.logSkill('mark_quanxinquanyi');
								Evt.videoId = lib.status.videoId++;
								let list = Evt.list;
								game.broadcastAll(function (id, list) {
									var dialog = ui.create.dialog('声明一张牌', [list, 'vcard']);
									dialog.videoId = id;
								}, Evt.videoId, list);
							} else {
								Evt.finish();
							}
							'step 3'
							let next = player.chooseButton(1, true);
							next.set('dialog', Evt.videoId);
							next.set('ai', function (button) {
								var card = { name: button.link[2] };
								var value = get.value(card);
								return value;
							});
							'step 4'
							game.broadcastAll('closeDialog', Evt.videoId);
							if (result.bool) {
								player.$.mark_quanxinquanyi_saycards.add(result.links[0][2]);
								player.$.mark_quanxinquanyi.add(result.links[0][2]);
								game.log(player, '的『全新全异』声明了【', player.$.mark_quanxinquanyi_saycards, '】');
								player.syncStorage('mark_quanxinquanyi_saycards');
								player.markSkill('mark_quanxinquanyi_saycards');
							}
						}
					},
					saycards: {
						init(player, skill) {
							if (!player.$.mark_quanxinquanyi_saycards) {
								player.$.mark_quanxinquanyi_saycards = [];
							}
						},
						locked: true,
						notemp: true,
						marktext: '异',
						intro: {
							content(storage, player) {
								if (player.$.mark_quanxinquanyi_loseBy) return '声明了【' + get.translation(player.$.mark_quanxinquanyi_saycards) + '】';
								else return '声明了【' + get.translation(player.$.mark_quanxinquanyi_saycards) + '】,当前轮次已有同名牌进入弃牌堆';
							},
							name: '『全新全异』',
						}
					},
					loseBy: {
						init(player, skill) {
							if (!player.storage[skill]) {
								player.storage[skill] = true;
							}
						},
						trigger: { global: 'phaseEnd' },
						priority: 999,
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							if (player.hasZhuSkill('qiujinzhiling') && Evt.player != player && Evt.player.group == player.group) return false;
							return game.getGlobalHistory('cardMove', evt => {
								if (evt.name == 'cardsDiscard' || (evt.name == 'lose' && evt.position == ui.discardPile)) {
									var num = 0;
									evt.cards.forEach(card => {
										if (get.name(card) == player.$.mark_quanxinquanyi_saycards[0]) num++;
									})
									return num;
								}
							}).length;
						},
						content() {
							player.$.mark_quanxinquanyi_loseBy = false;
							player.markSkill('mark_quanxinquanyi_saycards');
						}
					},
					endRound: {
						trigger: { global: 'roundEnd' },
						priority: 999,
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							return player.$.mark_quanxinquanyi_saycards.length && player.$.mark_quanxinquanyi_loseBy;
						},
						content() {
							'step 0'
							if (!player.hasUseTarget({ name: player.$.mark_quanxinquanyi_saycards })) {
								Evt.finish();
							}
							'step 1'
							player.chooseCard('###『全新全异』##是否将一张牌当作声明牌使用？', 1)
							'step 2'
							if (result.bool) {
								player.logSkill('mark_quanxinquanyi_endRound');
								player.chooseUseTarget(result.cards, { name: player.$.mark_quanxinquanyi_saycards }, true, false);
							}
						}
					}
				}
			},

			mark2_bingdielei: {
				group: 'mark2_bingdielei_damageBy',
				subSkill: {
					damageBy: {
						trigger: { player: 'damageBegin4', global: 'dying' },
						priority: 99,
						filter(Evt, player) {
							if (Evt.getParent('phase').skill) return false;
							if (Evt.name == 'damage' && player == Evt.player) return true;
							return Evt.getParent() && Evt.getParent().source == player;
						},
						direct: true,
						content() {
							"step 0"
							if (trigger.delay == false) game.delay();
							"step 1"
							player.markSkill(Evt.name);
							player.logSkill(Evt.name);
							player.addTempSkill('mark2_bingdielei_anotherPhase');
						},
					},
					anotherPhase: {
						trigger: { global: 'phaseEnd' },
						marktext: '并',
						mark: true,
						intro: {
							content: '当前回合结束后获得一个额外回合',
							name: '并蒂恶蕾',
						},
						content() {
							game.delayx();
							player.insertPhase();
						},
					},
				},
			},

			quanxinquanyi: {
				group: ['quanxinquanyi_begin', 'quanxinquanyi_playerLosecard'],
				subSkill: {
					begin: {
						trigger: { global: 'roundStart' },
						filter(Evt, player) {
							if (player.countCards('h') < 1) return false;
							return true;
						},
						content() {
							'step 0'
							//delete player.$.quanxinquanyi_showcards;
							delete player.$.quanxinquanyi_saycards;
							var maxCard = player.getDamagedHp();
							if (maxCard == 0) maxCard = 1;
							player.chooseCard('h', '选择要展示的手牌', [1, maxCard], true);
							'step 1'
							player.showCards(result.cards);
							Evt.showCards = result.cards;
							player.addSkill('quanxinquanyi_showcards');
							player.addSkill('quanxinquanyi_losecard', 'roundStart');
							player.addTempSkill('quanxinquanyi_discard', 'roundStart');
							player.addSkill('quanxinquanyi_end', 'roundStart'); //为了使新加的技能不在当前roundStart被触发
							'step 2'
							player.$.quanxinquanyi_showcards.addArray(Evt.showCards);
							//player.showCards(player.$.quanxinquanyi_showcards,'全新全异（展示）');
							player.syncStorage('quanxinquanyi_showcards');
							player.markSkill('quanxinquanyi_showcards');
							'step 3'
							Evt.videoId = lib.status.videoId++;
							var list = [];
							for (var i = 0; i < lib.inpile.length; i++) {
								var name = lib.inpile[i];
								if (name == 'wuxie') continue;
								else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							}
							//ui.create.dialog('声明一张牌',[list,'vcard']);
							game.broadcastAll(function (id, list) {
								var dialog = ui.create.dialog('声明一张牌', [list, 'vcard']);
								dialog.videoId = id;
							}, Evt.videoId, list);
							'step 4'
							let next = player.chooseButton(1, true);
							next.set('dialog', Evt.videoId);
							'step 5'
							game.broadcastAll('closeDialog', Evt.videoId);
							if (result.bool) {
								player.addSkill('quanxinquanyi_saycards');
								player.$.quanxinquanyi_saycards = result.links;
								player.showCards(player.$.quanxinquanyi_saycards, '全新全异（声明）');
								player.syncStorage('quanxinquanyi_saycards');
								player.markSkill('quanxinquanyi_saycards');
							}
						}
					},
					end: {
						trigger: { global: 'phaseBefore' },
						direct: true,
						content() {
							player.addSkill('quanxinquanyi_endRound');
							player.removeSkill('quanxinquanyi_end');
						}
					},
					showcards: {
						init(player) {
							if (!player.$.quanxinquanyi_showcards) {
								player.$.quanxinquanyi_showcards = [];
							}
						},
						locked: true,
						notemp: true,
						marktext: '新',
						intro: {
							content: 'cards',
							onunmark: 'throw',
							name: '全新全异（亮出）',
							// onunmark(storage,player){
							// 	if(storage&&storage.length){
							// 		player.$throw(storage,1000);
							// 		game.cardsDiscard(storage);
							// 		game.log(storage,'被置入了弃牌堆');
							// 		storage.length=0;
							// 	}
							// },
						}
					},
					saycards: {
						init(player) {
							if (!player.$.quanxinquanyi_saycards) {
								player.$.quanxinquanyi_saycards = [];
							}
						},
						locked: true,
						notemp: true,
						marktext: '异',
						intro: {
							content(storage, player) {
								if (!player.$.saycardsInD)
									return '声明了【' + get.translation(player.$.quanxinquanyi_saycards[0][2]) + '】,当前未进入弃牌堆，本轮结束时可用一张亮出牌使用'
								else
									return '声明了【' + get.translation(player.$.quanxinquanyi_saycards[0][2]) + '】,当前已经有声明牌进入弃牌堆'
							},
							name: '全新全异（声明）',
							// onunmark(storage,player){
							// 	if(storage&&storage.length){
							// 		player.$throw(storage,1000);
							// 		game.cardsDiscard(storage);
							// 		game.log(storage,'被置入了弃牌堆');
							// 		storage.length=0;
							// 	}
							// },
						}
					},
					discard: {
						trigger: { global: 'loseAfter' },
						priority: 99,
						filter(Evt, player) {
							if (Evt.type != 'discard') return false;
							for (var i = 0; i < Evt.cards2.length; i++) {
								for (var j = 0; j < player.$.quanxinquanyi_showcards.length; j++) {
									if (Evt.cards2[i] == player.$.quanxinquanyi_showcards[j] && get.position(Evt.cards2[i], true) == 'd') {
										//console.log(Evt.cards2[i]);
										return true;
									}
								}
							}
							return false;
						},
						direct: true,
						//frequent:'check',
						content() {
							"step 0"
							if (trigger.delay == false) game.delay();
							"step 1"
							var cards = [];
							for (var i = 0; i < trigger.cards2.length; i++) {
								for (var j = 0; j < player.$.quanxinquanyi_showcards.length; j++) {
									if (trigger.cards2[i] == player.$.quanxinquanyi_showcards[j] && get.position(trigger.cards2[i], true) == 'd') {
										cards.push(trigger.cards2[i]);
									}
								}
							}
							if (cards.length) {
								player.markSkill(Evt.name);
								player.logSkill(Evt.name);
								player.addTempSkill('bingdielei_anotherPhase');
							}
						},
					},
					playerLosecard: {
						trigger: { player: 'loseAfter' },
						direct: true,
						filter(Evt, player) {
							if (player.$.quanxinquanyi_showcards && player.$.quanxinquanyi_showcards.length > 0)
								return true;
							else
								return false;
						},
						content() {
							if (player.$.quanxinquanyi_showcards)
								for (var i = 0; i < trigger.cards2.length; i++) {
									if (player.$.quanxinquanyi_showcards.contains(trigger.cards2[i])) {
										game.broadcastAll(
											function (splayer, card) {
												splayer.$.quanxinquanyi_showcards.remove(card)
											}, player, trigger.cards2[i]
										);
										player.syncStorage('quanxinquanyi_showcards');
									}
								}
						}
					},
					losecard: {
						trigger: { global: 'loseAfter' },
						filter(Evt, player) {
							if (Evt.type != 'use' && Evt.type != 'discard') return false;
							if (player.hasZhuSkill('qiujinzhiling') && Evt.player.group == player.group) return false;
							for (var i = 0; i < Evt.cards2.length; i++) {
								if (Evt.cards2[i].name == player.$.quanxinquanyi_saycards[0][2]) {
									return true;
								}
							}
							return false;
						},
						direct: true,
						//frequent:'check',
						content() {
							player.$.saycardsInD = true;
						}
					},
					endRound: {
						trigger: { global: 'roundStart' },
						priority: 999,
						prompt() {
							return '是否将一张亮出牌当作声明牌使用？(若不满足使用声明牌条件将直接结算)'
						},
						filter(Evt, player) {
							return player.$.quanxinquanyi_saycards;
						},
						content() {
							'step 0'
							if (player.$.saycardsInD) {
								Evt.goto(4);
							}
							else {
								if (!player.hasUseTarget(player.$.quanxinquanyi_saycards[0][2])) {
									Evt.goto(4);
								}
							}
							'step 1'
							player.chooseCard('选择一张亮出牌', 1, function (card) {
								var cuplayer = _status.event.player;
								return cuplayer.$.quanxinquanyi_showcards.contains(card);
							})
							'step 2'
							if (result.bool) {
								Evt.useshowCards = result.cards;
								player.chooseUseTarget(Evt.useshowCards[0], { name: player.$.quanxinquanyi_saycards[0][2] }, true, false);
								// player.chooseTarget('选择使用目标',function(card,player,target){
								// 	return player.canUse({name:player.$.quanxinquanyi_saycards[0][2]},target);
								// }).ai=function(target){
								// 	if(!check) return 0;
								// 	return get.effect(target,{name:player.$.quanxinquanyi_saycards[0][2]},_status.event.player);
								// }
							}
							else {
								Evt.goto(4);
							}
							'step 3'
							if (result.bool) {
							}
							'step 4'
							//player.removeSkill('quanxinquanyi_showcards');
							player.removeSkill('quanxinquanyi_saycards');
							player.removeSkill('quanxinquanyi_endRound');
						}
					}
				}
			},
			bingdielei: {
				audio: 3,
				subSkill: {
					anotherPhase: {
						trigger: { global: 'phaseEnd' },
						marktext: '并',
						mark: true,
						forced: true,
						intro: {
							content: '当前回合结束后获得一个额外回合',
							name: '并蒂恶蕾',
						},
						content() {
							game.delayx();
							player.insertPhase();
						}
					}
				}
			},
			qiujinzhiling: {
				unique: true,
				zhuSkill: true,
			},
			zhenyin: {
				audio: 1,
				trigger: {
					source: 'damageEnd',
					player: 'useCardToPlayered',
				},
				filter(Evt, player) {
					if (!player.hasSkill('saqi_use')) {
						return Evt.name == 'damage' && Evt.player.countCards('ej');
					}
					else {
						return Evt.name == 'useCardToPlayered'
							&& Evt.targets.length == 1
							&& Evt.targets[0].countCards('ej');
					}
				},
				content() {
					'step 0'
					Evt.A = trigger.name == 'damage' ?
						trigger.player :
						trigger.targets[0];
					Evt.B = Evt.A.next;
					if (!Evt.A.countCards('ej')) Evt.finish();
					player.choosePlayerCard('ej', Evt.A).set('ai', function (button) {
						var player = _status.event.player;
						var source = _status.event.target;
						var target = source.next;
						var link = button.link;
						if (get.position(link) == 'j') {
							if (target.canAddJudge(link)) return get.effect(target, link, player, player);
							else return get.damageEffect(target, player, player);
						} else if (get.position(link) == 'e') {
							var subtype = get.subtype(link);
							if (!target.getEquip(subtype)) return get.effect(target, link, player, player);
							else return get.damageEffect(target, player, player);
						}
					});
					'step 1'
					if (result.bool) {
						var card = result.links[0];
						var dam = false;
						if (get.position(card) == 'e') {
							var c = Evt.B.getEquip(get.subtype(card));
							if (c) {
								dam = true;
								game.log(c, '掉落了');
							}
							Evt.B.equip(card);
						}
						else {
							var cname = card.viewAs ? card.viewAs : get.name(card);
							Evt.B.getCards('j').forEach(function (c) {
								if (get.name(c) == cname) {
									game.log(c, '掉落了');
									game.cardsDiscard(c);
									dam = true;
								}
							})
							Evt.B.addJudge({ name: cname }, [card]);
						}
						Evt.A.$give(card, Evt.B)
						if (dam) Evt.B.damage('nocard');
						game.delay();
					}
				}
			},
			saqi: {
				init(player) {
					if (!player.$.saqi_use) {
						player.$.saqi_use = [];
					}
				},
				trigger: { player: 'phaseZhunbeiBegin' },
				content() {
					'step 0'
					var list = [];
					list.push('减少上限');
					if (player.maxHp < 5) list.push('增加上限');
					player.chooseControl(list).ai = function () {
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
				prompt() {
					var str = "是否发动『飒气』并选择<br>";
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
							content(storage, player, skill) {
								var str = "发动『震音』的条件改为“你使用牌指定唯一目标后”。<br>";
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
						content() {
							var suit = get.suit(trigger.card);
							if (player.hasSkill('saqi_ban') && suit && suit != 'none') {
								if (player.$.saqi_use.indexOf(suit) == -1) {
									player.$.saqi_use.push(suit);
									player.markSkill('saqi_use');
								}
							}
						},
						mod: {
							aiOrder(player, card, num) {
								if (get.itemtype(card) == 'card' && !get.info(card).notarget) return num + 1;
							},
							aiValue(player, card, num) {
								if (get.itemtype(card) == 'card' && !get.info(card).notarget) return num + 1;
							},
						},
					},
					banG: {
						mod: {
							cardEnabled(card, player) {
								var cur = game.findPlayer(function (p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player &&
									cur.$.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							},
							cardSavable(card, player) {
								var cur = game.findPlayer(function (p) {
									return p.hasSkill('saqi_ban');
								})
								if (cur && cur != player &&
									cur.$.saqi_use.indexOf(get.suit(card)) != -1) {
									return false;
								}
							}
						},
					},
					ban: {
						onremove(player) {
							player.$.saqi_use = [];
							player.markSkill('saqi_use');
						},
					}
				}
			},
			mark_zhenyin: {
				audio: 'zhenyin',
				init(player, skill) {
					player.storage[skill] ||= 1;
				},
				trigger: {
					player: 'useCardToPlayered',
				},
				filter(Evt, player) {
					return Evt.targets?.length == 1
						&& (player.$.mark_zhenyin === 1 ? Evt.targets[0].countCards('h') : Evt.targets[0].countCards('ej'));
				},
				content() {
					'step 0'
					Evt.A = trigger.targets[0];
					Evt.B = Evt.A.next;
					player.choosePlayerCard('hej', Evt.A).set('ai', function (button) {
						let [player, source, link] = [_status.event.player, _status.event.target, button.link];
						let target = source.next;
						if (get.position(link) == 'j') {
							if (target.canAddJudge(link)) return get.effect(target, link, player, player);
							else return get.damageEffect(target, player, player);
						} else if (get.position(link) == 'e') {
							var subtype = get.subtype(link);
							if (!target.getEquip(subtype)) return get.effect(target, link, player, player);
							else return get.damageEffect(target, player, player);
						} else {
							return get.value(link, target, 'raw') * get.attitude(player, target);
						}
					}).set('filterButton', function (button) {
						let [player, link] = [_status.event.player, button.link];
						if (get.position(link) == 'h') {
							return player.$.mark_zhenyin === 1;
						} else {
							return player.$.mark_zhenyin === 2;
						}
					})
					'step 1'
					if (result.bool && result.links?.length) {
						player.$.mark_zhenyin = [2, 1][player.$.mark_zhenyin - 1]
						player.updateMarks('mark_zhenyin')
						let card = result.links[0];
						let dam = false;
						if (get.position(card) == 'e') {
							var c = Evt.B.getEquip(get.subtype(card));
							if (c) {
								dam = true;
								game.log(c, '掉落了');
							}
							Evt.B.equip(card);
						}
						else if (get.position(card) == 'j') {
							var cname = card.viewAs ? card.viewAs : get.name(card);
							Evt.B.getCards('j').forEach(function (c) {
								if (get.name(c) == cname) {
									game.log(c, '掉落了');
									game.cardsDiscard(c);
									dam = true;
								}
							})
							Evt.B.addJudge({ name: cname }, [card]);
						}
						else {
							Evt.B.gain(card, Evt.A);
						}
						Evt.A.$give(card, Evt.B)
						if (dam) Evt.B.damage('nocard');
						game.delay();
					}
				}
			},
			meici: {
				audio: 4,
				group: ['meici_set', 'meici_use'],
				subSkill: {
					mark: {
						mark: true,
						intro: {
							content: "本回合使用锦囊牌时，将被观看手牌并重铸其中一张",
						},
					},
					set: {
						direct: true,
						trigger: {
							global: 'phaseBegin',
						},
						filter(Evt, player) {
							return Evt.player != player && !game.findPlayer(cur => cur.getCards('h') > Evt.player.getCards('h'));
						},
						content() {
							player.logSkill('meici', trigger.player);
							trigger.player.addTempSkill('meici_mark');
							game.delayx();
						}
					},
					use: {
						trigger: {
							global: 'useCardAfter'
						},
						filter(Evt, player) {
							return Evt.player.hasSkill('meici_mark')
								&& get.type2(Evt.card) === 'trick';
						},
						forced: true,
						popup: false,
						content: [() => {
							game.delay(0.5);
							Evt.target = trigger.player
							player.choosePlayerCard(`###${get.prompt('meici')}###重铸其一张手牌`, trigger.player, 'h').set('visible', true).set('tar', trigger.player).ai = button => {
								let val = get.buttonValue(button);
								let player = _status.event.player;
								let target = _status.event.tar;
								if (get.attitude(player, target) > 0) return 4 - val + Math.random();
								return val + Math.random();
							};
						}, () => {
							if (result.bool && result.cards.length) {
								player.logSkill('meici', trigger.player, true, false, false);
								trigger.player.lose(result.cards, ui.discardPile).set('visible', true);
								trigger.player.$throw(result.cards);
								game.log(trigger.player, '将', result.cards, '置入了弃牌堆');
								trigger.player.draw();
								if (get.type(result.cards[0]) !== 'basic') Evt.finish()
							}
						}, () => {
							player.chooseCard("『美词』：可以重铸一张手牌", 'h');
						}, () => {
							if (result.bool && result.cards.length) {
								player.lose(result.cards, ui.discardPile);
								player.$throw(result.cards);
								player.draw();
								game.log(player, '将', result.cards, '置入了弃牌堆');
							}
						}]
					}
				},
				ai: {
					threaten: 1.5,
				},
			},
			danlian: {
				audio: 3,
				trigger: {
					global: 'phaseEnd'
				},
				filter(Evt, player) {
					var cards = [];
					game.getGlobalHistory('cardMove', evt => {
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray((evt.cards2 || evt.cards).filterInD('d'));
						}
					});
					let suit = ['diamond', 'club'];
					return cards.length >= Evt.player.hp &&
						cards.filter(card => suit.contains(get.suit(card))).length &&
						Evt.player.isIn();
				},
				round: 1,
				direct: true,
				content() {
					'step 0'
					var cards = [];
					let suit = ['diamond', 'club'];
					game.getGlobalHistory('cardMove', evt => {
						if (evt.name == 'lose' && evt.parent.name != 'useCard') {
							cards.addArray((evt.cards2 || evt.cards).filterInD('d').filter(card => suit.contains(get.suit(card))));
						}
					});
					if (cards) player.chooseCardButton("###『耽恋』：进入弃牌堆的牌###选择一张牌（♦牌当【乐不思蜀】，♣牌当【决斗】）", cards);
					else Evt.finish();
					'step 1'
					if (result.bool) {
						Evt.card = result.links[0];
						var pStr = get.suit(Evt.card) == 'diamond' ?
							"选择【乐不思蜀】的目标" : "选择【决斗】的目标";
						Evt.cardName = get.suit(Evt.card) == 'diamond' ?
							'lebu' : 'juedou';

						player.chooseTarget(pStr, function (card, player, target) {
							let user = _status.event.user
							return user.canUse(_status.event.cardName, target);
						})
							.set('user', trigger.player)
							.set('cardName', Evt.cardName)
							.set('ai', target => get.effect(target, { name: _status.event.cardName }, _status.event.user, _status.event.player));
					}
					else Evt.finish();
					'step 2'
					if (result.bool && result.targets.length) {
						var target = result.targets[0];
						player.logSkill('danlian', [trigger.player, target])
						game.delay(0.5);
						trigger.player.useCard({ name: Evt.cardName }, target, [Evt.card], 'noai');
					}
					game.delayx()
				},
				ai: {
					threaten: 1.5,
				},
				subSkill: {
					diamond: {},
					club: {},
				}
			},
			kuangbaoshuangren: {
				audio: 3,
				group: ['kuangbaoshuangren_red', 'kuangbaoshuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange(card, player) {
								if (_status.currentPhase == player && get.name(card) == 'sha' && get.color(card) == 'red') return true;
							},
							cardUsable(card, player, num) {
								if (card.name == 'sha' && get.color(card) == 'red') return Infinity;
							},
						},
						trigger: {
							source: 'damageEnd'
						},
						filter(Evt, player) {
							return Evt.card && get.name(Evt.card) == 'sha' && Evt.notLink()
								&& get.color(Evt.card) == 'red'
								&& Evt.player.countDiscardableCards(player, 'e', { subtype: ['equip3', 'equip4', 'equip6'] });
						},
						direct: true,
						content() {
							"step 0"
							var att = (get.attitude(player, trigger.player) <= 0);
							let next = player.chooseButton();
							next.set('att', att);
							next.set('createDialog', ['是否发动『狂暴双刃』，弃置' + get.translation(trigger.player) + '的一张坐骑牌？', trigger.player.getDiscardableCards(player, 'e', { subtype: ['equip3', 'equip4', 'equip6'] })]);
							next.set('ai', button => {
								if (_status.event.att)
									return get.buttonValue(button);
								return 0;
							});
							"step 1"
							if (result.bool && result.links.length) {
								player.logSkill('kuangbaoshuangren', trigger.player);
								trigger.player.discard(result.links[0]);
							}
						}
					},
					black: {
						trigger: {
							player: 'useCard2',
							// player: 'useCardToPlayered'
						},
						locked: true,
						direct: true,
						filter(Evt, player) {
							// if (Evt.getParent().triggeredTargets3.length > 1) return false;
							if (!Evt.card || !(Evt.card.name == 'sha')
								|| !(get.color(Evt.card) == 'black')) {
								return false;
							}
							return game.hasPlayer(cur => lib.filter.targetEnabled2(Evt.card, player, cur)
								&& player.inRange(cur)
								&& !Evt.targets.contains(cur)
								&& player.canUse(Evt.card, cur))
						},
						content() {
							'step 0'
							player.chooseTarget(true, '额外指定一名' + get.translation(trigger.card) + '的目标', function (card, player, target) {
								if (_status.event.targets.contains(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card, player, target)
									&& player.inRange(target);
							}).set('targets', trigger.targets).set('card', trigger.card).set('ai', target => {
								var player = _status.event.player;
								return get.effect(target, _status.event.card, player, player);
							});
							'step 1'
							if (result.bool && result.targets.length) {
								game.delayx();
								player.logSkill('kuangbaoshuangren', result.targets);
								trigger.targets.unshift(result.targets[0]);
							}
						},
					},
				}
			},
			guangsuxiabo: {
				audio: 2,
				init(player) {
					player.$.hp = 0;
					player.$.loseCount = 0;
				},
				trigger: {
					global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
				},
				filter(Evt, player) {
					return player.$.hp || player.$.loseCount > 2;
				},
				content() {
					'step 0'
					player.draw();
					'step 1'
					let evt = _status.event.getParent('phaseUse');
					if (evt?.name == 'phaseUse') {
						evt.skipped = true;
					}
					let phase = _status.event.getParent('phase');
					if (phase?.name == 'phase') {
						phase.finish();
					}
				},
				ai: {
					maixie: true,
				},
				group: ['guangsuxiabo_clear', 'guangsuxiabo_cnt1', 'guangsuxiabo_cnt2'],
				subSkill: {
					clear: {
						forced: true,
						silent: true,
						trigger: {
							global: ['phaseZhunbeiBegin', 'phaseJudgeBegin', 'phaseDrawBegin', 'phaseUseBegin', 'phaseDiscardBegin', 'phaseJieshuBegin']
						},
						content() {
							player.$.hp = 0;
							player.$.loseCount = 0;
						}
					},
					cnt1: {
						forced: true,
						silent: true,
						trigger: {
							player: 'loseEnd',
						},
						content() {
							player.$.loseCount += trigger.cards2.length;
						}
					},
					cnt2: {
						forced: true,
						silent: true,
						trigger: {
							player: 'damageEnd',
						},
						content() {
							player.$.hp = 1;
						}
					},
				},
			},

			//修女
			zhenxin: {
				locked: true,
				group: ['zhenxin_from', 'zhenxin_to'],
				subSkill: {
					//防止每回合你第一次对体力值小于你的角色造成的伤害
					from: {
						trigger: { source: 'damageBefore' },
						forced: true,
						usable: 1,
						priority: 12,
						filter(Evt, player) {
							if (Evt.player == player) return false;
							return player.hp > Evt.player.hp;
						},
						content() {
							trigger.changeToZero();
						},
					},
					//防止体力值大于你的角色每回合对你造成的第一次伤害
					to: {
						trigger: { player: 'damageBefore' },
						forced: true,
						usable: 1,
						priority: 24,
						filter(Evt, player) {
							if (Evt.player != player) return false;
							if (!Evt.source) return false;
							return player.hp < Evt.source.hp;
						},
						content() {
							trigger.changeToZero();
						},
					}
				}
			},
			sczhuwei: {
				group: ['sczhuwei_put', 'sczhuwei_moveC'],
				subSkill: {
					put: {
						trigger: { global: 'phaseEnd' },
						priority: 24,
						direct: true,
						filter(Evt, player) {
							if (player == Evt.player) return false;
							return Evt.player.isMinHandcard() || Evt.player.isMinHp();
						},
						content() {
							'step 0'
							player.line(trigger.player, 'green');
							var check = get.attitude(trigger.player, player);
							trigger.player.chooseBool(get.prompt2('sczhuwei_put', player)).set('choice', check > 0);
							'step 1'
							if (result.bool) {
								trigger.player.logSkill('sczhuwei', player);
								Evt.target = trigger.player;
								game.asyncDraw([player, Evt.target]);
							}
						},
					},
					moveC: {
						trigger: { global: 'sczhuwei_putAfter' },
						forced: false,
						filter(Evt, player) {
							if (!Evt.target) return false;
							var canbeM = function (a, b) {
								var es = a.getCards('e');
								var c = 0;
								for (var i = 0; i < es.length; i++) {
									if (b.isEmpty(get.subtype(es[i]))) c++;
								}
								return c;
							}
							return canbeM(player, Evt.target) || canbeM(Evt.target, player);
						},
						content() {
							player.moveCard(function (card, player, target) {
								if (target == player || target == _status.currentPhase) return true;
								return false;
							});
						}
					}
				},
			},
			suisi: {
				audio: 4,
				locked: true,
				direct: true,
				trigger: {
					player: ['cardsDiscardAfter', 'chooseToDiscardAfter', 'discardAfter']
				},
				filter(Evt, player) {
					var cards = Evt.cards;
					if (!cards) return false;
					var ret = false;
					if (!player.$.suisi) player.$.suisi = { lastCnt: 0 };
					else player.$.suisi.lastCnt = 0;

					for (var i = 0; i < cards.length; ++i) {
						if (cards[i] && (cards[i].name == 'shan' || cards[i].name == 'wuxie')) ++player.$.suisi.lastCnt;
					}
					return player.$.suisi.lastCnt > 0;
				},
				content() {
					if (player.$.suisi && player.$.suisi.lastCnt > 0) {
						player.draw(Math.ceil(player.$.suisi.lastCnt / 2));
						player.logSkill('suisi');
					}
				},
				group: ['suisi_shanMod', 'suisi_wuxieMod'],
				subSkill: {
					shanMod: {
						hiddenCard(player, name) {
							if (_status.event.name == 'chooseToUse' && _status.event.type == 'respondShan') {
								if (name == 'shan') {
									return false;
								}
							}
							// return true;
						},
						mod: {
							cardname(card, player, name) {
								if (_status.event.name == 'chooseToUse' && _status.event.type == 'respondShan') {
									if (name != 'shan' && get.type2(name) == 'basic') {
										return 'shan';
									}
								}
							},
							cardEnabled2(card, player, name) {
								if (_status.event.name == 'chooseToUse' && _status.event.type == 'respondShan') {
									if (card.name == 'shan' && (!card.isCard || !card.cards || card.cards.length > 1)) {
										return false;
									}
								}
							}
						}
					},
					wuxieMod: {
						hiddenCard(player, name) {
							if (_status.event.name == 'chooseToUse' && _status.event.type == 'wuxie') {
								if (name == 'wuxie') return false;
							}
							// return true;
						},
						mod: {
							cardname(card, player, name) {
								if (_status.event.name == 'chooseToUse' && _status.event.type == 'wuxie') {
									if (name != 'wuxie' && get.type2(name) == 'trick') {
										return 'wuxie';
									}
								}
							},
							cardEnabled2(card, player, name) {
								if (_status.event.name == 'chooseToUse' && _status.event.type == 'wuxie') {
									if (card.name == 'wuxie' && (!card.isCard || !card.cards || card.cards.length > 1)) {
										return false;
									}
								}
							}
						}
					}
				}
			},
			liefeng: {
				trigger: {
					player: 'phaseJieshu'
				},
				//direct: true,
				//popup: false,
				filter(Evt, player) {
					return player.countCards('h');
				},
				check(Evt, player) {
					return player.countCards('h', { name: ['shan', 'wuxie'] }) == player.countCards('h');
				},
				content() {
					'step 0'
					var handCards = player.getCards('h').slice(0);
					player.showCards(handCards);
					Evt.handCards = handCards;
					//player.logSkill('liefeng');
					'step 1'
					if (!Evt.handCards || !Evt.handCards.length) {
						Evt.finish();
						return;
					}
					var shaCnt = 0;
					for (var i = 0; i < Evt.handCards.length; ++i) {
						if (Evt.handCards[i] && (
							Evt.handCards[i].name == 'shan'
							|| Evt.handCards[i].name == 'wuxie'
							|| !lib.filter.cardEnabled(Evt.handCards[i], player))) {
							++shaCnt;
						}
					}
					if (shaCnt >= Evt.handCards.length) {
						Evt.shaCnt = shaCnt;
						Evt.handCnt = shaCnt;
						Evt._result = { bool: true };
						player.discard(Evt.handCards);
					} else {
						Evt.finish();
						return;
					}
					'step 2'
					if (!result.bool || Evt.shaCnt <= 0) {
						Evt.finish();
						return;
					}
					player.chooseUseTarget(
						'###选择一个目标，视为对其使用一张暗【杀】。###(暗【杀】：' + Evt.shaCnt + '/' + Evt.handCnt + '张）',
						{ name: 'sha', nature: 'yami' }, true, 'nodistance'
					);
					'step 3'
					--Evt.shaCnt;
					Evt.goto(2);

				},
				ai: {
					useSha: 1,
					skillTagFilter(player, tag, arg) {
						if (tag == 'useSha') return player.countCards('h', { name: ['shan', 'wuxie'] }) == player.countCards('h');
					},
					threaten(player, target) {
						return 1.6;
					}
				},
				involve: [{
					name: 'sha',
					nature: 'yami'
				}]
			},
			//雪城真寻
			jiaoming: {
				audio: 5,
				trigger: {
					global: ['loseAfter', 'cardsDiscardAfter']
				},
				forced: true,
				popup: false,
				filter(Evt, player) {
					if (!player || player.hasSkill('jiaoming_invalid')) return false;

					Evt = Evt && (Evt.name == 'phaseUse' ? Evt : Evt.getParent('phaseUse'));
					if (!Evt || Object.getOwnPropertyNames(Evt).length == 0) return false;
					//是此player的回合
					if (player != Evt.player) return false;

					return true;
				},
				content() {
					//获得当前event的parent，phaseUse，
					//如果不存在就返回
					Evt = Evt && (Evt.name == 'phaseUse' ? Evt : Evt.getParent('phaseUse'));
					if (!Evt || Object.getOwnPropertyNames(Evt).length == 0) return;
					//倒序遍历globalHistory的cardMove，
					//对其中每个lose事件，遍历卡牌，并记录位于弃牌堆的牌
					var cardnames = {};
					game.getGlobalHistory('cardMove', evt => {
						if (evt.cards && evt.name == 'lose' && evt.getParent('phaseUse') == Evt) {
							for (var i = evt.cards.length - 1; i >= 0; --i) {
								if (get.position(evt.cards[i], true) != 'd') continue;
								if (typeof cardnames[evt.cards[i].name] === 'undefined') {
									cardnames[evt.cards[i].name] = [];
								}
								if (!cardnames[evt.cards[i].name].contains(evt.cards[i])) {
									cardnames[evt.cards[i].name].push(evt.cards[i]);
								}
							}
						}
						return true;
					});
					//如果弃牌堆存在某个牌名重复，则添加空事件jiaoming_invalid，
					//用于判定jiaoming本回合能否触发/使用
					for (var nm in cardnames) {
						if (cardnames[nm] && cardnames[nm].length > 1) {
							player.addTempSkill('jiaoming_invalid');
						};
					}
					if (nm != undefined) {
						player.addTempSkill('jiaoming_main', 'phaseUseAfter');
					}
				},
				subSkill: {
					invalid: {

					},
					main: {
						enable: 'phaseUse',
						check(Evt, player) {
							return true;
						},
						filter(Evt, player) {
							return !player.hasSkill('jiaoming_invalid');
						},
						prompt: '你可选择攻击范围内有你的一名其他角色',
						filterTarget(card, player, target) {
							return player != target && target.canUse('sha', player);
						},
						content() {
							'step 0'
							Evt.jmTarget = targets[0];
							let next = Evt.jmTarget.chooseToUse(
								'对' + get.translation(player) + '使用一张【杀】；或失去1点体力并令' + get.translation(player) + '于本回合失去『骄名』。',
								function (card, player) {
									if (get.name(card) != 'sha') return false;
									return lib.filter.filterCard.apply(this, arguments);
								}
							);
							next.set('filterTarget', function (card, player, target) {
								return _status.event.shaTarget == target;
							}).set('shaTarget', player).set('targetRequired', true);
							//ai
							var aiChoice = Evt.jmTarget.hasSha('use') ? player : -1;
							next.set('choice', aiChoice).set('ai2', target => _status.event.choice);
							'step 1'
							if (Evt.directfalse || result.bool == false) {
								player.addTempSkill('jiaoming_invalid');
								Evt.jmTarget.loseHp();
							}
						},
						ai: {
							pretao: true,
							order: 5,
							result: {
								player(player, target) {
									if (player.hp != 1) {
										if (target.hp == 1 && !target.hasSha('use')) {
											return 2;
										}
										return 0;
									}
									else return -1;
								},
								target(player, target) {
									if (target.hasSha('use')) {
										return -1;
									} else {
										return -2;
									}
								}
							}
						}
					}
				}
			},
			changhe: {
				audio: true,
				trigger: {
					player: 'phaseUseEnd'
				},
				forced: false,
				check(Evt, player) {
					return true;
				},
				filter(Evt, player) {
					Evt = Evt && (Evt.name == 'phaseUse' ? Evt : Evt.getParent('phaseUse'));
					if (!Evt || Object.getOwnPropertyNames(Evt).length == 0) return false;
					if (!player) return false;
					var cardnames = {};
					game.getGlobalHistory('cardMove', evt => {
						if (evt.cards && evt.name == 'lose' && evt.getParent('phaseUse') == Evt) {
							for (var i = evt.cards.length - 1; i >= 0; --i) {
								if (get.position(evt.cards[i], true) != 'd') continue;
								if (typeof cardnames[evt.cards[i].name] === 'undefined') {
									cardnames[evt.cards[i].name] = [];
								}
								if (!cardnames[evt.cards[i].name].contains(evt.cards[i])) {
									cardnames[evt.cards[i].name].push(evt.cards[i]);
								}
							}
						}
						return true;
					});
					//弃牌堆有大于等于三张同名牌，即可触发，返回true
					for (var nm in cardnames) {
						if (cardnames[nm] && cardnames[nm].length > 2) return true;
					}
					return false;
				},
				content() {
					'step 0'
					player.chooseControl(['cancel2']).set('choiceList', [
						'摸两张牌',
						'回复1点体力'
					]).set('prompt', '请选择一项').set('ai', function () {
						if (_status.event.chPlayer) {
							return _status.event.chPlayer.maxHp > _status.event.chPlayer.hp;
						}
						return 0;
					}).set('chPlayer', player);
					'step 1'
					if (result.control != 'cancel2') {
						if (result.index == 0) {
							player.draw(3);
						} else {
							player.recover();
						}
					}
				}
			},
			//小野町春香
			nvjiangrouhao: {
				audio: true,
				group: ['nvjiangrouhao_shaTrigger', 'nvjiangrouhao_distanceTrigger'],
				subSkill: {
					shaTrigger: {
						trigger: {
							player: 'useCardToPlayered',
						},
						filter(Evt) {
							return Evt.card.name == 'sha';
						},
						forced: true,
						content() {
							//对杀的对象添加临时mod技能，限制使用牌的花色
							var suit = trigger.card.suit;
							var target = trigger.target;
							target.addTempSkill('nvjiangrouhao_filterShan', 'shaAfter', 'nvjiangrouhao_distanceTemp');

							if (!target.$.nvjiangrouhao) {
								target.$.nvjiangrouhao = {
									shaTrigger: {}
								};
							}
							target.$.nvjiangrouhao.shaTrigger.suit = suit;
							//同步的数据
							if (target.isOnline()) {
								target.send(function (target, suit) {
									if (!target.$.nvjiangrouhao) {
										target.$.nvjiangrouhao = {
											shaTrigger: {}
										};
									}
									target.$.nvjiangrouhao.shaTrigger.suit = suit;
								}, target, suit);
							}
						},
					},
					//特定牌花色mod
					filterShan: {
						mod: {
							cardEnabled2(card, player) {
								//如果player有杀，且有花色
								var sha = (player && player.storage && player.$.nvjiangrouhao)
									&& player.$.nvjiangrouhao.shaTrigger;
								if (!sha || !sha.suit) return;
								//只有同花色的闪能响应
								if (get.name(card) == 'shan' && get.suit(card) != sha.suit) {
									return false;
								}
							}
						}
					},
					distanceTrigger: {
						audio: 'nvjiangrouhao',
						trigger: {
							source: 'damageSource'
						},
						forced: true,
						content() {
							player.addTempSkill('nvjiangrouhao_distanceTemp', { player: 'phaseBegin' });
						}
					},
					//距离mod
					distanceTemp: {
						mark: true,
						mod: {
							globalFrom(player, target, distance) {
								return distance - 1;
							}
						},
						intro: {
							content: '锁定技，直到你的下一个回合开始，你计算与其他角色的距离-1。'
						}
					}
				}
			},
			yinlaiyaotang: {
				audio: 3,
				group: ['yinlaiyaotang_phaseUse', 'yinlaiyaotang_loseCheck'],
				subSkill: {
					phaseUse: {
						enable: 'phaseUse',
						usable: 1,
						log: false,
						filter(Evt, player) {
							return player.getCards('h').length > 0;
						},
						content() {
							'step 0'
							player.chooseCardTarget({
								position: 'he',
								prompt: '###『引徕药汤』###将任意数量手牌交给你攻击范围内的任意角色（指定自己时表示置于武将牌上）',
								selectCard: [1, Infinity],
								filterCard: true,
								filterTarget(card, player, target) {
									return target == player || player.inRange(target);//自己或自己攻击范围内的角色
								},
								ai1(card) {
									var player = _status.event.player;
									if (ui.selected.cards.length || player.$.yinlaiyaotang_phaseUse) {
										var tang = ui.selected.cards.concat(player.$.yinlaiyaotang_phaseUse);
										for (var i = 0; i < tang.length; i++) {
											if (get.name(tang[i]) == card.name) return 0;
										}
									}
									if (player.needsToDiscard()) return 7.5 - get.value(card);
									return 6 - get.value(card);//选牌收益判断
								},
								ai2(target) {
									if (target != player) return get.recoverEffect(target, _status.event.player, _status.event.player);
									return 1;//选人收益判断
								},
							});
							'step 1'
							if (result.bool) {
								player.logSkill('yinlaiyaotang');
								Evt.cards = result.cards.slice(0);
								Evt.target = result.targets[0];
								if (Evt.target == player) {
									player.lose(Evt.cards, ui.special, 'toStorage');
									player.$give(Evt.cards, player, false);//处理牌动画
									player.markAuto('yinlaiyaotang_phaseUse', Evt.cards);//自动标记
								} else {
									Evt.target.gain(Evt.cards, player, 'giveAuto');
								}
							}
							// 'step 0'
							// player.chooseControl(['cancel2']).set('choiceList',[
							// 	'你可将任意数量手牌交给你攻击范围内的任意角色',
							// 	'将任意手牌置于武将牌上'
							// ]).set('prompt', '请选择一项').set('ai', function(){
							// 	return Math.random()>0.5?0:1;
							// });
							// 'step 1'
							// if(result.control!='cancel2'){
							// 	//选择任意数量手牌
							// 	player.chooseCard('h', '选择你的手牌',true, [1, player.getCards('h').length||1]);
							// 	Evt.selecetedChoice = result.index;
							// }else{
							// 	Evt.finish();
							// }
							// 'step 2'
							// if(result.bool){
							// 	//选中的牌
							// 	Evt.prepareCards = result.cards.slice(0);
							// 	if(Evt.selecetedChoice == 0){
							// 		Evt.goto(3);
							// 		//选择player攻击范围内的角色
							// 		player.chooseTarget('将选中的手牌交给你攻击范围内的任意角色', true, function(card, player, target){
							// 			return player.canUse('sha',target);
							// 		}).set('ai',function(target){
							// 			return get.damageEffect(target, _status.event.player, _status.event.player);
							// 		});
							// 	}else{
							// 		Evt.goto(4);
							// 	}
							// }else{
							// 	Evt.finish();
							// }
							// 'step 3'
							// if(result.bool&&Evt.prepareCards&&Evt.prepareCards.length>0&&result.targets){
							// 	//选择的角色获得选中的牌
							// 	var prepareTarget = result.targets[0];
							// 	prepareTarget.gain(Evt.prepareCards, player);
							// }
							// Evt.finish();
							// 'step 4'
							// //从手牌移除
							// player.lose(Evt.prepareCards,ui.special,'toStorage');
							// //同步mark，保存至player.$.yinlaiyaotang_phaseUse 
							// player.$.yinlaiyaotang_phaseUse = player.$.yinlaiyaotang_phaseUse.concat(Evt.prepareCards);
							// player.syncStorage('yinlaiyaotang_phaseUse');
							// player.markSkill('yinlaiyaotang_phaseUse');
							// game.log(player,'将',Evt.prepareCards,'置于武将牌上');
						},
						init(player) {
							if (!player.$.yinlaiyaotang_phaseUse) player.$.yinlaiyaotang_phaseUse = [];
						},
						intro: {
							name: '引徕药汤',
							content: 'cards'
						},
						ai: {
							order: 5,//决定AI会不会主动释放技能
							result: { player: 0.5 },
						}
					},
					loseCheck: {
						audio: 'yinlaiyaotang',
						trigger: { global: 'loseAfter' },
						forced: true,
						filter(Evt, player) {
							//在有牌置于武将牌上时继续检查
							if (!player.$.yinlaiyaotang_phaseUse) return;
							if (Evt.hs && Evt.hs.length && Evt.player != player && get.distance(player, Evt.player) <= 1) {
								var tang = player.$.yinlaiyaotang_phaseUse;
								for (var i = 0; i < Evt.hs.length; i++) {
									for (var j = 0; j < tang.length; j++) {
										if (get.name(tang[j]) == get.name(Evt.hs[i])) {
											return true;
										}
									}
								}
							}

							//仅对距离为1的角色
							// if(get.distance(player, Evt.player) == 1){
							// 	if(!Evt.cards||!Evt.cards.length)return false;
							// 	for(var i=0;i<Evt.cards.length;++i){
							// 		//仅查找当前牌的位置为手牌时
							// 		if(get.position(Evt.cards[i]) != 'h') continue;
							// 		//对武将牌上的牌遍历，找到同名牌则通过
							// 		for(var j=0;j<player.$.yinlaiyaotang_phaseUse.length;++j){
							// 			if(player.$.yinlaiyaotang_phaseUse[j].name == Evt.cards[i].name){
							// 				//保存检索的位置信息
							// 				player.$.loseCheck = [i, j];
							// 				return true;
							// 			}
							// 		}
							// 	}
							// }
							// return false;
						},
						content() {
							'step 0'
							trigger.player.recover();
							'step 1'
							var hs = trigger.hs
							var tang = player.$.yinlaiyaotang_phaseUse;
							Evt.cards = [];
							for (var i = 0; i < hs.length; i++) {
								for (var j = 0; j < tang.length; j++) {
									if (get.name(tang[j]) == get.name(hs[i])) {
										Evt.cards.push(tang[j]);
									}
								}
							}
							player.gain(Evt.cards, 'gain2');
							player.unmarkAuto('yinlaiyaotang_phaseUse', Evt.cards);
							// 'step 1'
							// var removedCard = player.$.yinlaiyaotang_phaseUse.splice(player.$.loseCheck[1], 1)[0];
							// if(player.$.yinlaiyaotang_phaseUse.length == 0){
							// 	player.unmarkSkill('yinlaiyaotang_phaseUse');
							// }else{
							// 	//更新mark
							// 	player.markSkill('yinlaiyaotang_phaseUse');
							// }
							// player.syncStorage('yinlaiyaotang_phaseUse');
							// //获得卡牌

							// player.gain(removedCard,'fromStorage');
							// game.log(player, '从武将牌上获得一张', removedCard);
							// //延时

							// game.delayx();
							'step 2'
							//你摸一张牌。
							player.draw();
						}
					}
				}
			},
		},
		characterReplace: {
			SasakiSaku: ['SasakiSaku', 'sea_SasakiSaku'],
			LizeHelesta: ['re_LizeHelesta', 'LizeHelesta', 'gz_LizeHelesta'],
			re_AngeKatrina: ['re_AngeKatrina', 'gz_AngeKatrina'],

			MononobeAlice: ['re_MononobeAlice', 'MononobeAlice', 'sp_MononobeAlice'],
			ShizukaRin: ['re_ShizukaRin', 'ShizukaRin'],
			MitoTsukino: ['re_MitoTsukino', 'MitoTsukino'],
			UshimiIchigo: ['re_UshimiIchigo', 'UshimiIchigo'],
			HiguchiKaede: ['re_HiguchiKaede', 'HiguchiKaede'],
			SuzuharaLulu: ['re_SuzuharaLulu', 'SuzuharaLulu'],
		},
		dynamicTranslate: {
			mark_zhenyin(player) {
				let str = lib.translate.mark_zhenyin_info;
				switch (player.$.mark_zhenyin) {
					case 1: return str.replace(/①手牌区/g, `<span class="changetext">①手牌区</span>`);
					case 2: return str.replace(/②装备或判定区/g, `<span class="changetext">②装备或判定区</span>`);
				}
				return str;
			},
		},
		translate: {
			nijisanji_1: `一期生`,
			nijisanji_2: `二期生`,


			MononobeAlice: `物述有栖`,
			tinenghuifu1: `体能恢复`,
			tinenghuifu1_hp: `体能恢复`,
			tinenghuifu1_info: `锁定技 当你失去装备区的一张牌后，你回复1点体力。当你的体力值减少后，你摸一张牌。`,
			tinenghuifu1_append: lib.figurer(`特性：卖血`),
			dianmingguzhen: `电鸣鼓震`,
			dianmingguzhen_info: `出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你视为向对应装备栏内没有装备的所有角色使用一张【雷杀】；然后你可以为抵消此【杀】的角色追加一次【闪电】判定。`,
			dianmingguzhen_append: lib.figurer(`可以通过将自己的装备转移给队友，实现瞬间爆发`),

			ShizukaRin: `静凛`,
			mozhaotuji: `魔爪突击`,
			mozhaotuji_DrawOrStop: `魔爪突击`,
			mozhaotuji_info: `回合内，你可以将任意阶段连续的变为出牌阶段，直到你有出牌阶段未使用过牌。一个阶段结束时，若你于此阶段内使用了至少两张牌，你摸一张牌。`,
			mozhaotuji_append: lib.figurer(`特性：多次出杀 易上手`),

			IenagaMugi: `家长麦`,
			fengxue: `奋学`,
			fengxue_info: `你可以跳过出牌阶段，亮出牌堆顶<br>〈体力值不小于你的角色数+1〉张牌，使用其中一张牌，获得其中一种花色的牌。`,
			yuepi: `乐癖`,
			yuepi_info: `弃牌阶段开始时，你可以重铸至多<br>〈你装备区牌数+1〉张手牌，令你在本阶段增加等量的手牌上限。`,
			cangxiong: `藏兄`,
			cangxiong_info: `其他角色的体力值变为 1 后，你可以交给其任意张手牌；若其手牌数多于你，将移出游戏直到其回合开始。`,
			cangxiong_append: lib.figurer(`特性：传递关键牌 保护友方`),

			MitoTsukino: `月之美兔`,
			MitoTsukino_info: `月之美兔`,
			quanxinquanyi: `全新全异`,
			quanxinquanyi_info: `一轮开始时，你可以亮出至多X张手牌并声明一种通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你将一张亮出牌当本轮声明牌使用。（X为你已损失的体力值且至少为1）`,
			bingdielei: `并蒂恶蕾`,
			bingdielei_info: `回合结束时，若本回合你弃置过亮出牌，获得一个额外的回合。`,

			mark_bingdielei: `并蒂恶蕾`,
			mark_bingdielei_anotherPhase: `并蒂恶蕾`,
			mark_bingdielei_info: `一个额定回合结束时，若你于本回合内造成或受到过伤害，你可以弃置一张♣或装备牌以获得一个额外回合。`,
			mark_quanxinquanyi: `全新全异`,
			mark_quanxinquanyi_endRound: `全新全异`,
			mark_quanxinquanyi_info: `一轮开始时，你可以声明一张未以此法未声明过的通常锦囊牌。本轮结束时，若本轮没有声明牌进入弃牌堆，你可以将一张牌当本轮声明牌使用。`,
			qiujinzhiling: `囚禁指令`,
			qiujinzhiling_info: `主公技 锁定技 其他同势力角色回合内进入弃牌堆的牌不触发『全新全异』`,

			mark2_bingdielei: `并蒂恶蕾`,
			mark2_bingdielei_info: `一个额定回合结束时，若你于本回合内受到伤害或令一名角色进入濒死状态，获得一个额外回合。`,

			SuzukaUtako: `铃鹿诗子`,
			meici: `美词`,
			meici_info: `其他角色的回合开始时，若其手牌为全场最多，其本回合使用锦囊牌后，你可以观看其手牌并重铸其中一张，若为基本牌，你也可重铸一张手牌。`,
			meici_append: lib.figurer(`特性：难上手`),
			danlian: `耽恋`,
			danlian_info: `轮次技 一个回合结束时，若本回合不因使用而进入弃牌堆的牌数不少于当前回合角色的体力，
			你可选择其中一张♦/♣牌，当前回合角色将此牌当【乐不思蜀】/【决斗】对你指定的一名角色使用。`,
			danlian_append: lib.figurer(`可以把弃牌转化为【乐不思蜀】或【决斗】`),

			HiguchiKaede: `樋口枫`,
			zhenyin: `震音`,
			zhenyin_info: `你造成伤害后，可以将目标装备区或判定区的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。`,
			saqi: `飒气`,
			saqi_info: `准备阶段，你可以增加（至多到 5 ）或扣减 1 点体力上限，若选择扣减，你获得以下效果直到你的下回合开始：你使用牌结算后，所有其他角色本回合无法使用该花色的牌；发动『震音』的条件改为“你使用牌指定唯一目标后”。`,
			saqi_append: lib.figurer(`特性：改变体力上限 爆发`),

			mark_zhenyin: `震音`,
			mark_zhenyin_info: `转换技 你使用牌指定唯一目标后，可将其①手牌区②装备或判定区的一张牌移至其下家，若引起冲突，进行替代并对下家造成1点伤害。`,

			UshimiIchigo: `宇志海莓`,
			kuangbaoshuangren: `狂暴双刃`,
			kuangbaoshuangren_info: `锁定技 你的黑色【杀】指定目标后，需额外指定攻击范围内的一名角色为目标。你的红色【杀】无距离与次数限制，且造成伤害后可以弃置目标的坐骑牌。`,
			kuangbaoshuangren_append: lib.figurer(`特性：强化出杀`),
			guangsuxiabo: `光速下播`,
			guangsuxiabo_info: `一个阶段结束时，若你于此阶段受到过伤害或失去了两张以上的牌，你可以摸一张牌并结束当前回合。`,

			SisterClearie: `修女·克蕾雅`,
			zhenxin: `真信之诚`,
			zhenxin_info: `锁定技 防止你每回合首次对体力值小于你的角色造成的伤害；防止体力值大于你的角色每回合首次对你造成的伤害。`,
			sczhuwei: `助危之心`,
			sczhuwei_info: `其他角色的结束阶段，若其手牌或体力为全场最少，其可以与你各摸一张牌，然后你可在你们之间移动装备区的一张牌。`,
			sczhuwei_put_info: `令修女克蕾雅与你各摸一张牌，然后她可以移动你或其装备区的一张牌。`,

			HonmaHimawari: `本间向日葵`,

			YagamiKaruta: `山神歌流多`,
			suisi: `髓思`,
			suisi_info: `锁定技 你不能使用非转化的【闪】与【无懈可击】。你手牌中的【闪】或【无懈可击】进入弃牌堆时，摸一半数量的牌（向上取整）。<br><br>
			你可以将不为【闪】的基本牌当【闪】使用，不为【无懈可击】的锦囊牌当【无懈可击】使用。`,
			suisi_append: lib.figurer(`特性：高防御 自肃`),
			liefeng: `猎风`,
			liefeng_info: `结束阶段，你可以展示所有手牌，若均无法被使用，你弃置之并视为使用了等量的【暗杀】。`,

			YukishiroMahiro: `雪城真寻`,
			jiaoming: `骄名`,
			jiaoming_info: `出牌阶段，若本阶段进入弃牌堆的牌名称均不同，你可令攻击范围内有你的一名其他角色选择一项：<br>
			对你使用一张【杀】；失去1点体力并令你于本回合失去『骄名』。`,
			jiaoming_append: lib.figurer(`特性：挑衅`),
			changhe: `唱和`,
			changhe_info: `出牌阶段结束时，若本阶段至少有三张名称相同的牌进入弃牌堆，你可以选择一项：<br>
			摸三张牌；回复1点体力。`,

			OnomachiHaruka: `小野町春香`,
			nvjiangrouhao: `女将柔豪`,
			nvjiangrouhao_info: `锁定技 你的【杀】只能被同花色的【闪】抵消，你造成伤害后，计算与其他角色的距离-1。`,
			yinlaiyaotang: `引徕药汤`,
			yinlaiyaotang_info: `出牌阶段限一次，你可将任意数量手牌交给你攻击范围内的任意角色或将任意手牌置于武将牌上。
			武将牌上的牌的同名牌从与你距离为1的角色的手牌中离开时，其回复1点体力，武将牌上的那张牌返回你的手牌且你摸一张牌。`,
			yinlaiyaotang_append: lib.figurer(`特性：难上手`),

			SasakiSaku: `笹木咲`,
			tiaolian: `咆咲`,
			tiaolian_info: `每回合限一次。当你使用牌指定其他角色为目标时，可用一张手牌与其中任意名目标同时拼点，若你：没赢~取消此目标，赢~其不可响应此牌；<br>
			当你成为其他角色使用牌的目标时，你可以与其拼点，若你：赢~此牌对你无效，没赢~你不可响应此牌。`,
			jiaku: `生笹`,
			jiaku_info: `锁定技 你赢得拼点时，获得目标一张牌；你没赢得拼点时，摸一张牌。`,
			jiaku_append: lib.figurer(`特性：无损拼点 易上手`),

			LizeHelesta: `莉泽·赫露艾斯塔`,
			// LizeHelesta_ab: `莉泽`,
			shencha: `权力审查`,
			shencha_info: `准备阶段，你可以跳过本回合的摸牌阶段并观看牌堆顶3张牌，获得其中至多两张基本牌，并将其余牌置于牌堆底。若你的装备区没有牌，则你可装备其中的至多两张装备牌，若你的判定区有牌，则每有一张牌你便多观看一张。`,
			helesta: `赫露圣剑`,
			helesta_info: `你受到伤害时，可以弃置自己装备区的一张牌使此伤害-1。你失去装备区的牌时，你可以视为使用一张冰【杀】并摸一张牌。`,
			helesta_append: lib.figurer(`特性：减伤`),

			Naraka: `奈罗花`,
			ming_echi: `阿斥`,
			echi: `阿斥`,
			echi_info: `其它角色于摸牌阶段外获得牌时，若该角色的体力值不小于你，你可亮出一张手牌并令其选择一项：<br>
			弃置一张同类型的牌；失去一点体力。`,
			mudu: `哞督`,
			mudu_info: `其它角色的阶段结束时，若你于此阶段内失去过牌，则可令其将两张牌移出游戏。
			当前回合结束时，该角色获得一张以此法被移出游戏的牌，你获得剩余的牌。`,
			mudu_append: lib.figurer(`特性：控制`),

			AibaUiha: `相羽初叶`,
			KataribeTsumugu: `语部纺`,
		}
	}
}
)