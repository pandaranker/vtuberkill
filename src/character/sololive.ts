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
			/**兔田佩克拉 */
			old_UsadaPekora: ['female', 'holo', 3, ['pekoyu', 'hongshaoturou']],

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

			//旧艾琳
			duanfu: {
				trigger: { player: 'useCardToPlayer', target: 'useCardToPlayer' },
				priority: 100,
				lastDo: true,
				check(Evt, player) {
					if (player == Evt.player) return get.effect(Evt.target, Evt.card, player) < 0;
					return get.effect(player, Evt.card, Evt.target, player) < 0;
				},
				prompt(Evt, player) {
					if (player == Evt.player && Evt.target != player) return '指定' + get.translation(Evt.target) + '为' + get.translation(Evt.card) + '的目标，' + get.prompt('duanfu');
					else return '被' + get.translation(Evt.player) + '指定为' + get.translation(Evt.card) + '的目标，' + get.prompt('duanfu');
				},
				filter(Evt, player) {
					if (player == Evt.player && !Evt.target.isLinked()) return true;
					if (player == Evt.target && Evt.player.isLinked()) return true;
					return false;
				},
				content() {
					if (player == trigger.player) {
						trigger.target.link();
						trigger.excluded.add(trigger.target);
						game.log(trigger.getParent().card, '不会对', trigger.target, '生效');
					} else {
						trigger.player.link();
						trigger.excluded.add(trigger.target);
						game.log(trigger.getParent().card, '不会对', player, '生效');
					}
				},
				ai: {
					effect: {
						player(card, player, target, current) {
							if (get.name(card) == 'tiesuo') return [1, 1];
						}
					}
				}
			},
			daichang: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return game.hasPlayer(cur => cur.isLinked());
				},
				content() {
					'step 0'
					player.loseMaxHp();
					'step 1'
					Evt.num = game.countPlayer(cur => cur.isLinked());
					player.draw(Evt.num);
					player.addTempSkill('daichang_bottom', 'phaseUseAfter')
				},
				subSkill: {
					bottom: {
						mark: true,
						intro: {
							name: '借贷',
							content: '造成伤害时，需将X张牌置于牌堆底。（X为场上被横置的角色数）',
						},
						trigger: { source: 'damageEnd' },
						priority: 100,
						lastDo: true,
						forced: true,
						filter(Evt, player) {
							return player.countCards('he') && game.hasPlayer(cur => cur.isLinked());
						},
						content() {
							'step 0'
							Evt.num = game.countPlayer(cur => {
								return cur.isLinked();
							});
							player.choosePlayerCard('###『贷偿』###请选择要置于牌堆底的牌（先选择的在下）', player, 'he', Evt.num, true);
							'step 1'
							Evt.cards = result.cards.slice(0);
							player.lose(Evt.cards);
							'step 2'
							while (Evt.cards.length) {
								var card = Evt.cards.pop();
								card.fix();
								ui.cardPile.appendChild(card);
							}
							game.log(player, '将' + get.cnNumber(Evt.num) + '张牌置于牌堆底');
						}
					}
				},
			},
			hongtu: {
				trigger: { player: 'phaseUseEnd' },
				unique: true,
				limited: true,
				priority: 100,
				filter(Evt, player) {
					return player.isLinked() && player.hp == player.maxHp;
				},
				content() {
					'step 0'
					player.storage.hongtu = true;
					player.awakenSkill('hongtu');
					Evt.going = 1;
					'step 1'
					Evt.card = get.bottomCards()[0];
					player.showCards(Evt.card);
					'step 2'
					if (player.hasUseTarget(Evt.card, false)) {
						player.chooseUseTarget(Evt.card, false, true);
					} else {
						Evt.going = 0;
					}
					'step 3'
					player.draw();
					'step 4'
					if (Evt.going == 1) {
						Evt.goto(1);
					}
				},
			},
			//旧黄兔
			huangtu: {
				trigger: {
					global: 'gameDrawAfter',
					player: 'enterGame',
				},
				forced: true,
				filter(Evt, player) {
					return game.countPlayer(cur => {
						return !cur.storage.nohp && cur.maxHp != Infinity && cur != player;
					});
				},
				audio: 6,
				content() {
					'step 0'
					player.chooseTarget('请选择『颂恩』的目标', lib.translate.huangtu_info, true, function (card, player, target) {
						if (target.storage.nohp || target.maxHp == Infinity) return false
						return target != player && (!player.storage.huangtu2 || !player.storage.huangtu2.contains(target));
					}).set('ai', function (target) {
						var att = get.attitude(_status.event.player, target);
						if (att > 0) return att + 1;
						if (att == 0) return Math.random();
						return att;
					});
					'step 1'
					if (result.bool) {
						Evt.target = result.targets[0];
						if (!player.storage.huangtu2) player.storage.huangtu2 = [];
						player.storage.huangtu2.add(Evt.target);
						player.addSkill('huangtu2');
						player.addSkill('huangtu3');
					}
					'step 2'
					var target = Evt.target;
					target.storage.huangtu_mark = player;
					target.addSkill('huangtu_mark');
					'step 3'
					var target = Evt.target;
					player.gainMaxHp(target.maxHp);
					player.recover(target.maxHp);
				}
			},
			huangtu_mark: {
				mark: 'character',
				intro: {
					name: '颂恩',
					content: '当你在$的回合外体力变化时，$体力进行同样的变化，当$在自己的回合内合体力变化时，你体力进行同样的变化'
				},
				onremove: true,
			},
			huangtu2: {
				trigger: { global: ['damageEnd', 'recoverEnd', 'loseHpEnd'] },
				forced: true,
				filter(Evt, player) {
					if (player == _status.currentPhase && player == Evt.player) return true;
					if (Evt.player.isDead() || Evt.num == 0) return false;
					return player.storage.huangtu2 && player.storage.huangtu2.contains(Evt.player) && player != _status.currentPhase;
				},
				logTarget: 'player',
				content() {
					'step 0'
					if (trigger.player == player) {
						var target = player.storage.huangtu2[0];
						target[trigger.name](trigger.num, 'nosource');
						if (target.storage.huangtu_mark != player) {
							target.storage.huangtu_mark = player;
						}
						target.markSkill('huangtu_mark');
						Evt.finish();
					}
					'step 1'
					var target = trigger.player;
					if (target.storage.huangtu_mark != player) {
						target.storage.huangtu_mark = player;
					}
					target.markSkill('huangtu_mark');
					game.delayx();
					'step 2'
					player[trigger.name](trigger.num, 'nosource');
				},
				onremove(player) {
					if (!player.storage.huangtu2) return;
					var splayer = player.storage.huangtu2[0];
					splayer.removeSkill('huangtu_mark');
					delete player.storage.huangtu2;
				},
			},
			huangtu3: {
				trigger: { global: 'dieBegin' },
				silent: true,
				filter(Evt, player) {
					return Evt.player == player || player.storage.huangtu2 && player.storage.huangtu2.contains(player);
				},
				content() {
					if (player == Evt.player) player.removeSkill('huangtu2');
					else player.storage.huangtu2.remove(Evt.player);
				}
			},
			wudao: {
				init(player, skill) {
					var list = [];
					for (var i = 0; i < lib.inpile.length; i++) {
						var name = lib.inpile[i];
						if (get.type(name) == 'basic') list.push(name);
					}
					if (!player.storage[skill]) player.storage[skill] = list;
				},
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.countCards('h', function (card, player) {
						return Evt.player.storage.wudao.contains(get.name(card));
					}) > 0;
				},
				filterCard(card, player, Evt) {
					return player.storage.wudao.contains(get.name(card));
				},
				prepare(cards, player) {
					player.$throw(cards, 1000);
					game.log(player, '将', cards, '置入了弃牌堆');
				},
				position: 'h',
				discard: false,
				loseTo: 'discardPile',
				visible: true,
				delay: 0.5,
				content() {
					player.draw();
					//					console.log(player.storage.wudao);
					player.storage.wudao.remove(get.name(Evt.cards[0]));
				},
				ai: {
					basic: {
						order: 1
					},
					result: {
						player: 1,
					},
				},
				group: ['wudao_useEnd', 'wudao_clear'],
				subSkill: {
					useEnd: {
						trigger: { player: 'phaseUseEnd' },
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							return player.storage.wudao.length == 0;
						},
						content() {
							'step 0'
							if (player.storage.wudao.length) {
								Evt.finish();
							} else {
								player.logSkill('wudao');
							}
							'step 1'
							var list = ['摸两张牌', '回复体力'];
							game.broadcastAll(function (player, list) {
								var dialog = ui.create.dialog('选择一项', [list, 'vcard']);
								player.chooseButton(dialog, true);
							}, player, list)
							'step 2'
							if (result.buttons[0].link[2] == '摸两张牌') {
								player.draw(2);
							}
							if (result.buttons[0].link[2] == '回复体力') {
								player.recover();
							}
						}
					},
					clear: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							var list = [];
							for (var i = 0; i < lib.inpile.length; i++) {
								var name = lib.inpile[i];
								if (get.type(name) == 'basic') list.push(name);
							}
							player.storage.wudao = list;
						},
					},
				}
			},
			yinyuan: {
				zhuSkill: true,
				trigger: { player: 'wudao_useEndAfter' },
				filter(Evt, player) {
					if (!player.hasZhuSkill('yinyuan')) return false;
					return Evt._result;
				},
				content() {
					'step 0'
					var next = player.chooseTarget();
					next.set('filterTarget', function (card, player, target) {
						return target.group == player.group;
					});
					if (trigger._result?.length) {
						next.set('prompt2', '失去一点体力上限，令其回复一点体力');
					} else if (trigger._result?.links && trigger._result.links[0][3] == '回复体力') {
						next.set('prompt2', '失去一点体力上限，令其摸两张牌');
					}
					'step 1'
					if (result.bool) {
						player.loseMaxHp();
						if (trigger._result?.length) {
							result.targets[0].recover(player);
						} else if (trigger._result?.links[0][3] == '回复体力') {
							result.targets[0].draw(2, player);
						}
					}
				}
			},
			/**旧花园猫 */
			old_maoliang: {
				mark: true,
				locked: true,
				marktext: '粮',
				intro: {
					content: 'cards',
					onunmark: 'throw',
					cardAround: true
				},
			},
			old_jiumao: {
				audio: 'jiumao',
				global: 'old_jiumao_put',
				group: ['old_jiumao_gain'],
				subSkill: {
					put: {
						trigger: {
							player: 'phaseDiscardBegin',
						},
						check(Evt, player) {
							var target = game.findPlayer(cur => {
								return cur.hasSkill('old_jiumao');
							})
							return target && get.attitude(player, target) > 0;
						},
						filter(Evt, player) {
							return !player.hasSkill('old_jiumao') && player.countCards('he')
								&& game.hasPlayer(cur => {
									return cur.hasSkill('old_jiumao');
								});
						},
						content() {
							'step 0'
							player.chooseCard(get.prompt('old_jiumao'), 'he', [1, Infinity]).set('ai', card => {
								var player = _status.event.player;
								if (player.needsToDiscard() && ui.selected.cards.length < player.countCards('h')) return 6 - get.useful(card);
								else return 2 - get.useful(card);
							}).set('prompt', '###『啾猫』###你在弃牌阶段开始时，可将任意数量的牌放在自己武将牌旁，称为「猫粮」');
							'step 1'
							if (result.bool) {
								player.lose(result.cards, ui.special, 'visible', 'toStorage');
								player.$give(result.cards, player, false);
								if (player.storage.old_maoliang) {
									player.storage.old_maoliang = player.storage.old_maoliang.concat(result.cards);
								}
								else {
									player.storage.old_maoliang = result.cards;
								}
								// game.addVideo('storage', player, ['old_maoliang',get.cardsInfo(player.storage.old_maoliang),'cards']);
								player.addSkill('old_maoliang');
								player.markSkill('old_maoliang');
								player.showCards(player.storage.old_maoliang, "猫粮");
							}
							else Evt.finish();
							'step 2'
							game.delayx();
						}
					},
					gain: {
						popup: false,
						trigger: {
							player: 'phaseBegin',
						},
						content() {
							'step 0'
							Evt.targets = game.filterPlayer(cur => {
								return cur.hasSkill('old_maoliang');
							});
							Evt.videoId = lib.status.videoId++;
							game.broadcastAll(function (targets, id) {
								var dialog = ui.create.dialog('选择猫粮');
								targets.forEach(function (p) {
									if (p.storage.old_maoliang.length) {
										dialog.addText(get.translation(p));
										dialog.add(p.storage.old_maoliang);
									}
								})
								dialog.videoId = id;
							}, Evt.targets, Evt.videoId);
							var next = player.chooseButton([1, player.maxHp]);
							next.set('dialog', Evt.videoId);
							'step 1'
							game.broadcastAll('closeDialog', Evt.videoId)
							if (result.bool) {
								Evt.cards = result.links;
								player.logSkill('old_jiumao');
								Evt.targets.forEach(function (p) {
									var all = p.storage.old_maoliang;
									var cho = [];
									p.storage.old_maoliang = [];
									all.forEach(card => {
										if (Evt.cards.indexOf(card) != -1) {
											cho.push(card);
											p.addTempSkill('old_jiumao_cancel');
										}
										else {
											p.storage.old_maoliang.push(card);
										}
									})
									p.$give(cho, player, false);
									player.gain(cho, 'fromStorage');
									p.syncStorage('old_maoliang');
									p.markSkill('old_maoliang');
									game.log(player, "获得了", p, "的猫粮：", cho);
								})
								player.line(game.filterPlayer(cur => {
									return cur.hasSkill('old_jiumao_cancel');
								}), 'green');
							}
						}
					},
					cancel: {
						mod: {
							targetEnabled(card, player, target) {
								if (get.color(card) == 'black' && player.hasSkill('old_jiumao')) {
									return false;
								}
							}
						}
					},
				}
			},
			old_enfan: {
				popup: false,
				trigger: {
					global: 'dying'
				},
				filter(Evt, player) {
					return Evt.player.hasSkill('old_jiumao') || Evt.player.hasSkill('old_maoliang');
				},
				content() {
					'step 0'
					Evt.targets = game.filterPlayer(cur => {
						return cur.hasSkill('old_maoliang');
					});
					Evt.videoId = lib.status.videoId++;
					game.broadcastAll(function (targets, id, current) {
						var dialog = ui.create.dialog('选择猫粮');
						targets.forEach(function (p) {
							if (p != current && p.storage.old_maoliang.length) {
								dialog.addText(get.translation(p));
								dialog.add(p.storage.old_maoliang);
							}
						})
						dialog.videoId = id;
					}, Evt.targets, Evt.videoId, trigger.player)
					var next = player.chooseButton([1, player.maxHp]);
					next.set('dialog', Evt.videoId);
					'step 1'
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						Evt.cards = result.links;
						var targets = [];
						var less = false;
						Evt.targets.forEach(function (p) {
							var temp = p.storage.old_maoliang;
							p.storage.old_maoliang = [];
							temp.forEach(card => {
								if (Evt.cards.indexOf(card) != -1) {
									p.$give(card, trigger.player, false);
									trigger.player.gain(card, 'fromStorage');
									targets.push(p);
								}
								else {
									p.storage.old_maoliang.push(card);
									less = true;
								}
							})
							p.syncStorage('old_maoliang');
							p.markSkill('old_maoliang');
						})
						if (!less) {
							trigger.player.recover();
						}
						player.logSkill('old_enfan', trigger.player);
						trigger.player.line(targets, 'green');
					}
					else Evt.finish();
				}
			},
			old_shiqi: {
				audio: 'shiqi',
				forced: true,
				trigger: {
					player: 'phaseZhunbeiBegin',
				},
				filter(Evt, player) {
					var cnt = game.filterPlayer(cur => {
						return player.countCards('h') < cur.countCards('h');
					})
					return cnt == 0;
				},
				content() {
					player.addTempSkill('old_shiqi_addDam');
					let buff = '.player_buff';
					game.broadcastAll(function (player, buff) {
						player.node.old_shiqi = ui.create.div(buff, player.node.avatar);
						player.node.old_shiqi2 = ui.create.div(buff, player.node.avatar2);
					}, player, buff);
				},
				subSkill: {
					addDam: {
						direct: true,
						silent: true,
						trigger: {
							source: 'damageBegin',
						},
						content() {
							player.removeSkill('old_shiqi_addDam');
							trigger.num++;
						},
						onremove(player, skill) {
							game.broadcastAll(function (player) {
								player.node.old_shiqi.delete();
								player.node.old_shiqi2.delete();
								delete player.node.old_shiqi;
								delete player.node.old_shiqi2;
							}, player);
						},
						ai: {
							damageBonus: true,
						},
					}
				}
			},
			//旧兔宝
			pekoyu: {
				audio: 'tuquan',
				init(player) {
					player.storage.pekoyu = [];
				},
				marktext: "peko",
				intro: {
					name: '嚣张咚鼓',
					content(storage, player, skill) {
						if (storage.length) {
							return '本回合已通过花色为' + get.translation(storage) + '的牌发动了技能';
						}
						else {
							return '本回合尚未发动技能';
						}
					},
				},
				trigger: { player: 'useCardAfter' },
				priority: 111,
				filter(Evt, player) {
					if (!player.isPhaseUsing()) return false;
					if (!(get.type(Evt.card) == 'basic' || get.type(Evt.card) == 'trick')) return false;
					if (Evt.result.bool == false || Evt.iswuxied) return false;
					for (let i of player.getStorage('pekoyu')) {
						if (get.suit(Evt.card) == i) return false
					}
					return true;
				},
				content() {
					'step 0'
					player.draw(),
						player.storage.pekoyu.add(get.suit(trigger.card));
					'step 1'
					player.chooseToDiscard('###『嚣张咚鼓』###然后，弃置一张牌', 'h', true).set('ai', card => {
						var name = card.name;
						if (name == 'jiu') return 12;
						if (get.type(card) == 'trick') return 4;
						return 10 - get.value(card);
					});
					'step 2'
					if (result.bool && result.cards?.length) {
						if (get.name(result.cards[0], player) == 'jiu')
							player.chooseTarget('###『嚣张咚鼓』###选择一名角色，令其摸两张牌').set('ai', function (target) {
								var player = _status.event.player;
								if (player.countCards('h') < player.getHandcardLimit()) return target == player;
								return get.attitude(player, target) * (target.isDamaged() ? 2 : 1);
							});
					}
					'step 3'
					if (result.bool && result.targets?.length) {
						var target = result.targets[0];
						player.line(target, 'thunder');
						target.draw(2, player);
					}
				},
				group: ['pekoyu_update', 'pekoyu_back'],
				subSkill: {
					update: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							player.markSkill('pekoyu');
						}
					},
					back: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							player.unmarkSkill('pekoyu');
							player.storage.pekoyu = [];
						}
					},
				},
			},
			hongshaoturou: {
				audio: true,
				filter(Evt, player) {
					return !player.isLinked();
				},
				enable: "phaseUse",
				usable: 1,
				content() {
					player.link(true);
					player.addMark('hongshaoturou', 1, false);
					player.addTempSkill('hongshaoturou_viewAs');
					player.addTempSkill('hongshaoturou_shao');
					let buff = '.player_buff';
					game.broadcastAll(function (player, buff) {
						player.node.hongshaoturou = ui.create.div(buff, player.node.avatar);
					}, player, buff);
				},
				onremove(player, skill) {
					player.removeSkill('hongshaoturou_shao');
				},
				subSkill: {
					viewAs: {
						mod: {
							cardname(card, player) {
								if (card.name == 'shan' || card.name == 'tao') return 'jiu';
								if (get.subtype(card) == 'equip3' || get.subtype(card) == 'equip4' || get.subtype(card) == 'equip6') return 'tiesuo';
							},
						},
						trigger: { player: ['useCard1', 'respond', 'loseBeign'] },
						firstDo: true,
						forced: true,
						filter(Evt, player) {
							return Evt.card.name == 'jiu' && !Evt.skill &&
								Evt.cards.length == 1 && (Evt.cards[0].name == 'tao' || Evt.cards[0].name == 'shan');
						},
						content() {
						},
					},
					shao: {
						trigger: { player: 'phaseEnd' },
						marktext: '炎',
						mark: true,
						forced: true,
						intro: {
							content: '当前回合结束后受到一点火焰伤害',
							name: '自煲自足',
						},
						onremove(player, skill) {
							game.broadcastAll(function (player) {
								if (player.node.hongshaoturou) {
									player.node.hongshaoturou.delete();
									delete player.node.hongshaoturou;
								}
							}, player);
						},
						filter(Evt, player) {
							return true;
						},
						content() {
							player.damage('fire');
							player.removeSkill('hongshaoturou_shao');
						}
					},
				}
			},
			//向晚
			baitai: {
				audio: 'liuxuan_keai',
				trigger: { player: 'phaseBegin' },
				usable: 1,
				filter(Evt, player) {
					if (player.storage.baitai_A !== 0) player.storage.baitai_A = 0;
					if (player.storage.baitai_B !== 0) player.storage.baitai_B = 0;
					if (player.storage.baitai_C !== 0) player.storage.baitai_C = 0;
					if (player.storage.baitai_D !== 0) player.storage.baitai_D = 0;
					if (player.storage.baitai_E !== 0) player.storage.baitai_E = 0;
					return player.countCards('h');
				},
				content() {
					'step 0'
					player.showHandcards();
					'step 1'
					player.storage.baitai_A += player.countCards('h', { suit: 'diamond' });
					player.markSkill('baitai_A');
					'step 2'
					player.storage.baitai_B += player.countCards('h', { suit: 'club' });
					player.markSkill('baitai_B');
					'step 3'
					player.storage.baitai_C += player.countCards('h', { suit: 'heart' });
					player.markSkill('baitai_C');
					'step 4'
					player.storage.baitai_D += player.countCards('h', { suit: 'spade' });
					player.markSkill('baitai_D');
					'step 5'
					player.storage.baitai_E += Math.min(player.storage.baitai_A, player.storage.baitai_B, player.storage.baitai_C, player.storage.baitai_D);
					if (player.storage.baitai_E > 0) player.markSkill('baitai_E');
				},
				group: ['baitai_clear', 'baitai_A', 'baitai_B', 'baitai_C', 'baitai_D', 'baitai_E'],
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							return player.storage.baitai_A || player.storage.baitai_B || player.storage.baitai_C || player.storage.baitai_D || player.storage.baitai_E;
						},
						content() {
							if (player.storage.baitai_A !== 0) player.storage.baitai_A = 0;
							if (player.storage.baitai_B !== 0) player.storage.baitai_B = 0;
							if (player.storage.baitai_C !== 0) player.storage.baitai_C = 0;
							if (player.storage.baitai_D !== 0) player.storage.baitai_D = 0;
							if (player.storage.baitai_E !== 0) player.storage.baitai_E = 0;
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
								return distance - from.storage.baitai_A;
							}
						},
						marktext: '歌',
						intro: { name: '百态', content: '本回合内攻击范围+#' },
					},
					B: {
						trigger: { player: 'phaseDrawBegin2' },
						forced: true,
						filter(Evt, player) {
							return !Evt.numFixed && player.storage.baitai_B;
						},
						content() {
							var Buff = player.storage.baitai_B;
							trigger.num += Buff;
						},
						marktext: '之',
						intro: { name: '百态', content: '摸牌阶段摸牌数+#' },
					},
					C: {
						mod: {
							maxHandcard(player, num) {
								var Buff = player.storage.baitai_C;
								return num += Buff;
							},
						},
						marktext: '母',
						intro: { name: '百态', content: '本回合手牌上限+#' },
					},
					D: {
						mod: {
							cardUsable(card, player, num) {
								var Buff = player.storage.baitai_D;
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
								if (player.storage.baitai_E > 0) range[1] += player.storage.baitai_E;
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
					player.chooseCard(true, 'he').set('ai', card => {
						var att = _status.event.att;
						return 3 + att > get.value(card);
					}).set('att', get.attitude(player, trigger.source))
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
							if (player.countCards('h') != cur.countCards('h')) return true;
							var es = player.getCards('e');
							for (var i = 0; i < es.length; i++) {
								if (cur.isEmpty(get.subtype(es[i])) && (player.countCards('e') != cur.countCards('e'))) return true;
							}
							var js = player.getCards('j');
							for (var i = 0; i < js.length; i++) {
								if (cur.canAddJudge(js[i]) && (player.countCards('j') != cur.countCards('j'))) return true;
							}
						}
						return false;
					});
				},
				content() {
					'step 0'
					var next = player.moveCard(function (card, player, target) {
						if (target == player) return true;
						if (ui.selected.targets.length && ui.selected.targets[0] != player) return false;
						if (player.inRange(target)) {
							if (player.countCards('h') != target.countCards('h')) return true;
							var es = player.getCards('e');
							for (var i = 0; i < es.length; i++) {
								if (target.isEmpty(get.subtype(es[i])) && (player.countCards('e') != target.countCards('e'))) return true;
							}
							var js = player.getCards('j');
							for (var i = 0; i < js.length; i++) {
								if (target.canAddJudge(js[i]) && (player.countCards('j') != target.countCards('j'))) return true;
							}
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
					if (!player.storage.gz_lianjin_mark) player.storage.gz_lianjin_mark = [];
					if (!player.storage.gz_lianjin_used) player.storage.gz_lianjin_used = [];
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
					player.storage.gz_lianjin_mark.filter(card => {
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
						player.chooseCardButton(player.storage.gz_lianjin_mark, 3, true, '选择发动『炼金』的牌').set('filterButton', function (button) {
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
						player.storage.gz_lianjin_used.add('A');
						player.chooseUseTarget({ name: 'sha', nature: 'fire' }, '是否使用第一张火【杀】？', false);
					}
					else if (Evt.useWuzhong) {
						player.storage.gz_lianjin_used.add('B');
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
							player.storage.gz_lianjin_used = [];
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
					if (player.storage.lingli_clickChange === undefined) player.storage.lingli_clickChange = false;
					else player.storage.lingli_clickChange = !player.storage.lingli_clickChange;
				},
				clickableFilter(player) {
					return player.storage.lingli_clickChange !== false;
				},
				filter(Evt, player) {
					if (player.storage.lingli_clickChange === false) return false;
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
					if (!player.storage.chengfo_mark) player.storage.chengfo_mark = [];
					player.storage.chengfo_mark.add(get.suit(result.card, player));
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
							delete player.storage.chengfo_mark;
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
			old_jiumao_info: `其他角色在弃牌阶段开始时，可将任意数量的牌放在其武将牌旁，称为「猫粮」。你的回合开始时，可获得数量不大于你体力上限的「猫粮」，若如此做，你无法使用黑色牌指定你获得牌的来源为目标直到回合结束。`,
			old_enfan: `恩返(旧)`,
			old_enfan_info: `发动过『啾猫』的角色濒死时，你可把其以外角色的数量不大于你体力上限的「猫粮」交给该名角色，然后若场上没有「猫粮」，其回复1点体力。`,
			old_shiqi: `势起(旧)`,
			old_shiqi_info: `锁定技 准备阶段，若你的手牌数为全场最多，本回合你造成的第一次伤害+1。`,
			old_shiqi_append: lib.figurer(`特性：爆发`),

			old_UsadaPekora: `旧兔田`,
			pekoyu: `嚣张咚鼓`,
			pekoyu_info: `回合内，当你的非装备牌生效并结算后，若本回合未因此花色的牌发动此技能，你可以摸一张牌然后弃置一张牌。若你因此弃置了【酒】，你可以令一名角色摸两张牌。`,
			hongshaoturou: `自煲自足`,
			hongshaoturou_info: `出牌阶段限一次，你可以横置武将牌，令你在回合结束时受到1点火焰伤害。然后本回合内你的【闪】和【桃】视为【酒】，你的坐骑牌视为【铁索连环】。`,


			gz_Ava: `国战向晚`,
			gz_yiqu: `亦趋`,
			gz_yiqu_info: `每回合限一次，当你受到伤害后，你可以交给来源一张牌。若与对你造成伤害的牌花色相同，你摸两张牌。`,
			baitai: `百态`,
			baitai_info: `回合开始时，你可以展示所有手牌，根据各花色的牌数于本回合增加对应值：♦️~攻击范围，♣️~摸牌阶段摸牌数，♥️~手牌上限，♠️~出牌阶段可使用【杀】的次数；一组四种花色~使用牌额外选择目标。`,

			gz_LizeHelesta: `国战莉泽`,
			tongchen: `同尘`,
			tongchen_info: `出牌阶段限一次，若你攻击范围内有角色某一区域内的牌数与你在该区域的牌数不等，你可在你与其的该区域间移动一张牌。然后若你与其在该区域内的牌数相等，你摸一张牌。`,
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