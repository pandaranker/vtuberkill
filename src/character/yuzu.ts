import { toSkill } from './skilltype'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return <currentObject>{
		name: "yuzu",
		connect: true,
		character: {
			//新月岚
			xinyuelan: ['female', 'qun', 4, ['chisha', 'wujian'], ['guoV']],
			//白音小雪
			Shiranekoyuki: ['female', 'qun', 4, ['jvliu', 'wuxia'], ['riV']],

			/**------------------------------------------------------------------------------------------------------- */

			// ShitoAnon: ['female','paryi',3,['jiacan','fuhui']],

			// AngeKatrina:['female','nijisanji',3,['shencha','chuangzuo']],

			// YuikaSiina:['female','nijisanji',4,['tiaolian','jiaku']],

			/**月紫亚里亚 */
			TsukushiAria: ['female', 'qun', 3, ['tatongling', 'yumeng'], ['riV']],

			/**碧居结衣 */
			AoiYui: ['female', 'qun', 3, ['suyuan', 'mujian'], ['riV']],
			/**甘城なつき */
			NachoNeko: ['female', 'qun', 4, ['cirong', 'maoyu'], ['riV']],

			/**日ノ隈らん */
			HinokumaRan: ['female', 'nanashi', 4, ['yixiang', 'xianyu'], ['riV']],

			/**Melody */
			Melody: ['female', 'vshojo', 4, ['kuangbiao', 'leizhu', 'tonggan'], ['zhu', 'yingV']],

			/**狮白牡丹 */
			ShishiroBotan: ['female', 'holo', 4, ['sbliedan', 'buqiang']],

			/**pph */
			PinkyPopHepburn: ['female', 'qun', 4, ['pphpanfeng', 'lanyue']],

			/**白玉 */
			Shiratama: ['female', 'qun', 4, ['meihua', 'shentian'],],
			/**琴吹梦 */
			KotobukiYume: ['female', 'qun', 4, ['xuanquan', 'rusu'],],
			/**海月シェル */
			UmitsukiShell: ['female', 'qun', 4, ['beike', 'wenda'],],
			/**羽澄照乌愈 */
			PastelUyu: ['female', 'qun', 3, ['chenming', 'xiantong'],],

			/**凤玲天天 */
			HoureiTenten: ['female', 'qun', 3, ['shengquan', 'yizhu'], ['guoV']],

			/**扇宝 */
			shanbao: ['female', 'qun', 4, ['fengxu'], ['guoV']],
			/**秋蒂 */
			qiudi: ['female', 'qun', 3, ['xiangnuo'], ['guoV']],
			/**陆鳐 */
			luyao: ['female', 'qun', 4, ['manyou', 'changjie'], ['guoV']],

			/**小柔 */
			Xiaorou: ['female', 'xuyan', 3, ['rouqing', 'guangying'], ['guoV']],
			/**艾露露 */
			Ailurus: ['female', 'xuyan', 4, ['aldanyan', 'lunao'], ['guoV']],


			/**兰若Ruo */
			lanruo: ['female', 'hunmiao', 3, ['dieyuan', 'shengyang'], ['guoV']],
			/**兰若Re */
			lanre: ['female', 'hunmiao', 3, ['daoyi', 'shengyin'], ['guoV']],
			/**魂喵喵 */
			hunmiaomiao: ['female', 'hunmiao', 3, ['xiuyou', 'jiyuan'], ['guoV']],

			/**菜菜姐 */
			caicai: ['female', 'qun', 5, ['tibing', 'guangtui'], ['guoV']],

			/**白夜真宵 */
			ByakuyaMayoi: ['female', 'chaos', 4, ['bykuangxin'], ['guoV']],
			/**高原守 */
			Mamoru: ['male', 'chaos', '-3/3', ['shoumi', 'yanwang'], ['guoV']],

			/**远北千南 */
			AchikitaChinami: ['female', 'nijisanji', 3, ['yingkuo', 'shengni'],],

			/**早见咲 */
			HayamiSaki: ['female', 'paryi', 4, ['tuncai', 'zhidu'], ['zhu', 'guoV']],
			/**纪代因果 */
			KiyoInga: ['female', 'paryi', 4, ['huanxi', 'celv'], ['yingV']],

			/**闪光pika */
			shanguangpika: ['female', 'qun', 4, ['yikai', 'pkyuanjun'], ['guoV']],
			/**永雏塔菲 */
			Taffy: ['female', 'qun', 3, ['qianqi', 'chutan'], ['guoV']],
			/**谢拉 */
			CierraRunis: ['female', 'qun', 3, ['minghuahongxiao']],


			/**林莉奈 */
			RinaHayashi: ['female', 'qun', 3, ['xilv', 'bana'], ['guoV']],
			/**姬拉 */
			Kira: ['female', 'qun', 4, ['weiguang', 'liangqin'], ['guoV']],

			/**吉诺儿kino */
			Kino: ['female', 'HappyEl', 4, ['xiandu', 'yexi'], ['guoV']],
			/**唐九夏 */
			tangjiuxia: ['female', 'HappyEl', 4, ['jiuxian', 'yujian'], ['guoV']],
			/**李清歌 */
			liqingge: ['female', 'HappyEl', 4, ['tage'], ['guoV']],
			/**神宫司玉藻 */
			JingujiTamamo: ['female', 'HappyEl', 3, ['aowei', 'meizhan'], ['zhu', 'guoV']],

			/**伊万 */
			iiivan: ['female', 'xuefeng', 4, ['shuipo', 'pianchao'], ['guoV']],
			/**申䒕雅 */
			shenxiaoya: ['female', 'xuefeng', 4, ['xyshixi', 'wenxin'], ['guoV']],

			/**YY */
			yizhiYY: ['male', 'psp', 4, ['bianshi'], ['guoV', 'P_SP']],
			/**西魔幽 */
			AkumaYuu: ['male', 'psp', 4, ['akjianwu', 'tongzhao'], ['guoV', 'P_SP']],
			/**莲汰 */
			AiTeN: ['male', 'psp', 4, ['langfei', 'xieyun'], ['guoV', 'P_SP']],
			/**笙歌 */
			shengge: ['female', 'psp', 4, ['dixian', 'gumei'], ['guoV', 'P_SP', 'doublegroup:psp:qun']],

			/**艾瑞思 */
			airuisi: ['female', 'Tencent', 4, ['maozhi', 'baifei'], ['zhu', 'guoV']],
			/**艾白 */
			aibai: ['female', 'Tencent', 3, ['bianyin', 'shabai'], ['guoV']],
			/**文静 */
			wenjing: ['female', 'Tencent', 4, ['zaiying', 'zhengen'], ['guoV']],
			/**星瞳 */
			xingtong: ['female', 'Tencent', 4, ['jiezou', 'xtguyong'], ['guoV']],

			/**乌拉の帝国 */
			wula: ['female', 'lucca', 4, ['dizuo', 'hongtie'], ['guoV']],
			/**云玉鸾 */
			yunyuluan: ['female', 'lucca', 4, ['jiujiu', 'qitong'], ['guoV']],

			/**杜松子 */
			dusongziGin: ['female', 'qun', 3, ['danqing', 'gaiqu'], ['guoV']],
			/**无理 */
			Muri: ['female', 'VirtuaReal', 3, ['lique', 'zhangdeng'], ['guoV']],
			/**小可 */
			xiaoke: ['female', 'VirtuaReal', '3/4', ['dianying', 'ganfen'], ['guoV']],
			/**Hanser */
			Hanser: ['female', 'VirtuaReal', 3, ['naiwei', 'cishan'], ['guoV']],
			/**勾檀Mayumi */
			Mayumi: ['female', 'VirtuaReal', 4, ['jinzhou', 'gouhun'], ['guoV']],
			/**露露娜Ruruna */
			Ruruna: ['female', 'VirtuaReal', 4, ['miluan', 'shenjiao'], ['guoV']],
			/**茶冷 */
			Karon: ['female', 'VirtuaReal', 4, ['huomo', 'tuying'], ['guoV']],

			/**启娜娜米 */
			ap_Nana7mi: ['female', 'VirtuaReal', 4, ['niyou', 'shalu'], ['guoV']],
			/**启阿梓 */
			ap_Azusa: ['female', 'VirtuaReal', 3, ['puyu', 'appojian'], ['guoV']],

			/**清则子 */
			qingzezi: ['female', 'qun', 4, ['menghuan', 'gengu'], ['guoV']],

			/**诸葛哀汐 */
			zhugeaixi: ['female', 'qun', 4, ['kaituan', 'gehuang', 'susi'], ['guoV']],

			/**胡桃Usa */
			KurumiUsa: ['female', 'Providence', 4, ['jidou', 'duotian'], ['guoV']],
			/**七濑Unia */
			NanaseUnia: ['female', 'Providence', 4, ['qisui'], ['guoV']],
			/**玛安娜Myanna */
			Myanna: ['female', 'Providence', 4, ['yemo', 'jiaopin'], ['guoV']],
			/**花花Haya */
			Haya: ['female', 'Providence', 4, ['shengping', 'jiushuang'], ['guoV']],
			/**白桃shirako */
			Shirako: ['female', 'Providence', 4, ['jufu', 'qihun'], ['guoV', 'doublegroup:Providence:qun']],

			/**麟＆犀 */
			linxi: ['female', 'qun', 5, ['lilian', 'zihuai'], ['guoV']],

			/**雨街F */
			AmemachiF: ['female', 'RedC', 3, ['ciling', 'xiyu'], ['guoV']],

			/**中国绊爱 */
			zhongguobanai: ['female', 'NetEase', 4, ['liying', 'fuyu'], ['guoV']],
			/**栗子酱 */
			RIKO: ['female', 'NetEase', 4, ['tieyu'], ['guoV']],
			/**山兔 */
			YamaUsagi: ['female', 'NetEase', 3, ['zhengmeng', 'wadao'], ['guoV']],

			/**新科娘 */
			xinkeniang: ['female', 'qun', 4, ['daimao', 'hongtou'], ['zhu', 'guoV']],
			/**阿准 */
			azhun: ['female', 'qun', 3, ['tianqi', 'yubao', 'butaizhun'], ['guoV']],
			/**测试用角色 */
			Ruki: ['female', 'VirtuaReal', 4, ['beixie', 'hunzhan'], ['guoV']],
		},
		characterSort: {
			yuzu: {
				TEST: ['Ruki'],
			}
		},
		characterIntro: {
		},
		characterTitle: {
			Shiratama: '#y幼术师',

			liqingge: '#y战斗吧歌姬！',
			JingujiTamamo: '#y战斗吧歌姬！',
			Kino: '#yNebula-Beat',
			tangjiuxia: '#yNebula-Beat',
		},
		skill: {
			chisha: {
				audio: true,
				trigger: { player: 'phaseZhunbeiBegin' },
				filter(Evt, player) {
					return !player.isMaxHandcard(true);
				},
				check(Evt, player) {
					let list = game.filterPlayer(cur => cur.isMaxHandcard()).sortBySeat();
					return (list[0].countCards('h') - player.countCards('h')) >= 1;
				},
				content: [() => {
					let num = 1, list = game.filterPlayer(cur => cur.isMaxHandcard());
					num += (list[0].countCards('h') - player.countCards('h'));
					Evt.cards = get.cards(num);
				}, () => {
					player.gain(Evt.cards, 'draw');
				}, () => {
					player.addTempSkill('chisha_cardDisable')
				}],
				subSkill: {
					cardDisable: {
						mark: true,
						intro: { content: '不能使用本回合摸到的牌' },
						mod: {
							cardEnabled(card, player) {
								return lib.skill.chisha_cardDisable.mod.cardSavable.apply(this, arguments);
							},
							cardSavable(card, player) {
								if (!card.cards) return
								let cards = [], hs = player.getCards('h');
								player.getHistory('gain', evt => {
									if (evt.getParent().name != 'draw') return false;
									for (let i of evt.cards) {
										if (hs.includes(i)) cards.add(i);
									}
								});
								let num = cards.length;
								cards.removeArray(card.cards);
								if (cards.length < num) return false;
							},
						},
					},
				},
			},
			//迟砂：准备阶段，你可以将手牌调整至全场唯一最多，若如此做，你不能使用本回合摸到的牌直到回合结束。
			wujian: {
				trigger: {
					player: 'damageAfter', source: 'damageAfter'
				},
				logTarget(Evt, player) {
					if (player == Evt.source) return [player, Evt.player];
					return [player, Evt.source];
				},
				check(Evt, player) {
					return (player.countCards('h') - (player == Evt.source ? Evt.player : Evt.source).countCards('h')) <= 1;
				},
				filter(Evt, player) {
					return Evt.source && player.countCards('h') > (player == Evt.source ? Evt.player : Evt.source).countCards('h');
				},
				content() {
					if (player == trigger.source) Evt.target = trigger.player;
					else Evt.target = trigger.source;
					player.swapHandcards(Evt.target);
				},
			},
			//鹜荐：你对其他角色造成伤害或受到其他角色的伤害后，若你手牌数多于对方，你可以与其交换手牌
			jvliu: {
				trigger: {
					global: 'useCard'
				},
				filter(Evt, player) {
					return get.type(Evt.card) != 'basic' && Evt.player != player;
				},
				check(Evt, player) {
					if (get.$a(player, Evt.player) > 0) {
						return false;
					}
					if (get.tag(Evt.card, 'respondSha') && Evt.targets.includes(player)) {
						if (player.countCards('h', { name: 'sha' }) == 0) {
							return true;
						}
					}
					else if (get.tag(Evt.card, 'respondShan') && Evt.targets.includes(player)) {
						if (player.countCards('h', { name: 'shan' }) == 0) {
							return true;
						}
					}
					else if (get.tag(Evt.card, 'damage') && Evt.targets.includes(player)) {
						if (Evt.card.name == 'shuiyanqijunx') return player.countCards('e') == 0;
						return true;
					}
					else if ((Evt.card.name == 'shunshou' || (get.subtype(Evt.card) === 'equip2' && Evt.player.isEmpty(2))) && player.hp > 2) {
						return true;
					}
					return false;
				},
				logTarget: 'player',
				content: [() => {
					player.loseHp(1);
				}, () => {
					trigger.cancel();
					game.delayx();
				}],
			},
			//拒流：其他角色使用非基本牌时，你可以失去一点体力取消之。
			wuxia: {
				unique: true,
				juexingji: true,
				forced: true,
				trigger: {
					player: 'phaseZhunbei'
				},
				firstDo: true,
				filter(Evt, player) {
					return player.hp == 1;
				},
				content: [() => {
					player.awakenSkill('wuxia');
					player.gainMaxHp();
				}, () => {
					player.recover();
				}, () => {
					if (player.countCards('h') >= 3)
						player.chooseToDiscard(3, true);
					else
						player.removeSkill('jvliu');
				}, () => {
					player.setAvatar('Shiranekoyuki', 'Shiranekoyuki1');
					player.addSkill('wuxia_yuanyao');
				}],
				derivation: 'wuxia_yuanyao',
				involve: 'jvliu',
			},
			//无瑕：觉醒技。准备阶段，若你体力为1，你增加一点体力并回复一点体力，弃置三张手牌（若不足则改为失去『拒流』）并获得『攻熏』。
			wuxia_yuanyao: {
				filter(Evt, player) {
					if (player.countCards('h') > player.maxHp || player.countCards('h') == player.hp)
						return false;
					return (player.getStat('skill').wuxia_yuanyao || 0) < game.countPlayer(cur => cur.sex == 'female');
				},
				inherit: 'yuanyao',
			},
			/**------------------------------------------------------------------------------------------------------- */
			//Ruki
			beixie: {
				trigger: { global: 'gameDrawBegin', player: 'enterGame' },
				direct: true,
				content: [() => {
					Evt.togain = [];
					for (let i = 0; i < ui.cardPile.childElementCount; i++) {
						Evt.togain.push(ui.cardPile.childNodes[i]);
					}
				}, () => {
					player.chooseButton(['是否获得其中的一张牌？', Evt.togain]);
				}, () => {
					if (result.bool) {
						player.logSkill(Evt.name);
						player.gain(result.links, 'draw', 'log');
						if (get.subtype(result.links[0]) == 'equip1') {
							player.equip(result.links[0]);
						}
					}
				}]
			},
			hunzhan: {
				trigger: { global: 'damageAfter' },
				forced: true,
				filter(Evt, player) {
					return true;
				},
				logTarget: 'player',
				content: [() => {
					trigger.player.chooseToUse({
						filterCard(card, player) {
							return lib.filter.filterCard.apply(this, arguments);
						},
						prompt: get.$pro2('hunzhan')
					});
				}, () => {
					if (result.cards && result.cards.length) {
						player.draw();
					}
				}]
			},
			//杜松子dusongziGin
			danqing: new toSkill('trigger', {
				trigger: {
					player: 'damageAfter', source: 'damageAfter'
				},
				init(player, skill) {
					player.$[skill] ??= [['first']];
				},
				filter(Evt, player) {
					return game.countPlayer(cur => !player.getStorage('danqing')[0].includes(cur))
				},
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('danqing'), function (card, player, target) {
						return !player.getStorage('danqing')[0].includes(target);
					}, function (target) {
						return get.$a2(target)
					})
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0]
						let card2 = get.cardPile(function (card) { return card.name == 'jiu'; }, ['cardPile', 'discardPile']);
						if (card2) {
							player.logSkill('danqing', Evt.target)
							Evt.target.gain(card2, 'draw', 'log');
						}
						else Evt.finish()
					}
					else Evt.finish()
				}, () => {
					if (!Evt.target.hasSkill('danqing_Used')) Evt.target.addSkill('danqing_Used');
					if (player.$.danqing[0]) {
						if (player.$.danqing[0].includes('first')) {
							player.$.danqing[0].remove('first')
							let card2 = get.cardPile(function (card) { return card.name == 'jiu'; }, ['cardPile', 'discardPile']);
							if (card2) {
								Evt.target.gain(card2, 'draw', 'log');
							}
						}
						player.$.danqing[0].push(Evt.target)
					}
				}],
				group: 'danqing_count',
				subSkill: {
					count: new toSkill('trigger', {
						content() {
							player.$.danqing ??= []
							player.$.danqing.unshift(['first'])
						}
					}, 'direct', 'silent').setT({ global: 'phaseBefore' }),
					Used: new toSkill('mark', {
						intro: {
							content: '已成为过『蛋擎』的目标'
						}
					}, 'locked', 'mark')
				},
			}).setT({ player: 'damageAfter', source: 'damageAfter' }),
			gaiqu: new toSkill('trigger', {
				filter(Evt, player) {
					return player.countCards('h') < player.$.gaiqu_count;
				},
				content: [() => {
					delete player.$.gaiqu_count;
					player.awakenSkill('gaiqu');
					player.unmarkSkill('gaiqu_count')
					player.gainMaxHp();
				}, () => {
					player.recover();
				}, () => {
					if (player.countCards('h') > 2)
						player.chooseToDiscard(3, true);
					else
						player.removeSkill('danqing');
				}, () => {
					game.filterPlayer(cur => { if (cur.hasSkill('danqing_Used') && !cur.hasSkill('songxing')) cur.addSkill('songxing') })
				}],
				group: 'gaiqu_count',
				subSkill: {
					count: new toSkill('trigger', {
						intro: {
							content: '已使用#张【酒】'
						},
						filter(Evt, player) {
							return get.name(Evt.card) === 'jiu'
						},
						content() {
							player.$.gaiqu_count ??= 0
							player.$.gaiqu_count++
							player.markSkill('gaiqu_count')
						}
					}, 'forced').setT('useCardAfter')
				},
				derivation: 'songxing',
				involve: 'danqing',
			}, 'unique', 'juexingji', 'forced', 'firstDo').setT('phaseZhunbei'),
			songxing: new toSkill('regard', {
				init(player, skill) {
					player.$[skill] = [];
				},
				hiddenCard(player, name) {
					if (!player.countCards('hs', { name: 'jiu' })) return false;
					let list = get.inpile('trick2', card => {
						if (player.$.songxing.contains(card)) return false;
						return true;
					});
					for (let i of list) {
						if (i == name) return true;
					}
				},
				filter(Evt, player) {
					return player.countCards('hs', { name: 'jiu' });
				},
				chooseButton: {
					dialog(Evt, player) {
						let list = get.inpile('trick2', card => {
							if (player.$.songxing.contains(card)) return false;
							return true;
						});
						if (list.length == 0) {
							return ui.create.dialog('『松星』已无可用牌');
						}
						return ui.create.dialog('『松星』', [list, 'vcard']);
					},
					filter(button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check(button) {
						let player = _status.event.player
						if (button.link[2] == 'wugu') return 0;
						let effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links, player) {
						return {
							filterCard(card) {
								return get.name(card) === 'jiu'
							},
							selectCard: 1,
							popname: true,
							check(card) {
								return 6 - get.value(card);
							},
							position: 'hs',
							viewAs: { name: links[0][2] },
							onuse(result, player) {
								player.$.songxing.add(result.card.name);
							},
						};
					},
					prompt(links, player) {
						return `###『松星』###将一张【酒】当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
					}
				},
				group: 'songxing_clear',
				subSkill: {
					clear: new toSkill('trigger', {
						content() {
							player.$.songxing = []
						}
					}, 'direct', 'silent').setT({ global: 'phaseAfter' }),
				},
			}, 'enable:chooseToUse'),
			//月紫亚里亚
			tatongling: new toSkill('trigger', {
				intro: {
					content: 'cards',
					onunmark: 'throw',
				},
				init(player, skill) {
					player.$[skill] ??= [];
				},
				check(Evt, player) {
					if (player.hasSkill('tatongling_used')) return false
					if (Evt.player.isTurnedOver()) return get.$a(player, Evt.player) > 0
					return get.$a(player, Evt.player) < 0
				},
				content: [() => {
					Evt.target = trigger.player
					let check = !Evt.target.isTurnedOver() && (get.$a(Evt.target, player) >= 0 || Evt.target.needsToDiscard())
					Evt.target.chooseCard(2).set('ai', function (card) {
						if (!_status.event.check) return 0;
						return get.unuseful3(card)
					}).set('check', check).set('prompt', `『彤灵』：将两张手牌置于${get.$t(player)}武将牌上，否则翻面并回复一点体力`);
				}, () => {
					if (result.cards?.length) {
						Evt.target.$give(result.cards, player)
						Evt.target.lose(result.cards, ui.special, 'toStorage')
						player.markAuto('tatongling', result.cards)
					} else {
						Evt.target.turnOver()
						Evt.target.recover()
						player.addTempSkill('tatongling_used', 'phaseNext')
					}
				}],
			}, 'logTarget:player', 'cardAround').setT({ global: 'loseHpAfter', source: 'damageAfter' }).set(['group', 'tatongling_gainBy'], ['subSkill', {
				gainBy: new toSkill('trigger', {
					content() {
						let cards = player.getStorage('tatongling')
						if (cards.length) {
							player.gain(cards)
							player.$give(cards, player, false)
							player.unmarkAuto('tatongling', cards)
						}
					},
				}, 'direct').setT(lib.phaseName, 'Skipped'),
				used: new toSkill('mark'),
			}]),
			yumeng: new toSkill('trigger', {
				content() {
					"step 0"
					var check = player.countCards('h') > 2;
					player.chooseTarget(get.$pro2(`yumeng`), function (card, player, target) {
						if (player == target) return false;
						return true;
					}).set('check', check).set('ai', function (target) {
						if (!_status.event.check) return 0;
						return get.$a(_status.event.player, target);
					});
					"step 1"
					if (result.bool) {
						player.logSkill('yumeng', result.targets);
						Evt.target = result.targets[0]
						Evt.target.$.yumeng2 = player
						Evt.target.addTempSkill('yumeng2', 'none')
						trigger.cancel();
						player.skip('phaseDraw');
					}
				},
			}, 'direct').setT('phaseJudgeBefore').set(['group', 'yumeng_clear'], ['subSkill', {
				clear: new toSkill('trigger', {
					content() {
						game.filterPlayer(cur => {
							if (cur.$.yumeng2 === player) cur.removeSkill('yumeng2')
						})
					},
				}, 'direct').setT('phaseBegin')
			}]),
			yumeng2: new toSkill('trigger', {
				content() {
					trigger.cancel();
					trigger.player.loseHp(trigger.num);
				}
			}, 'forced', 'mark:character', 'onremove').setT('damageBefore').set(['intro', { content: '受到的伤害改为体力流失' }]),
			suyuan: new toSkill('trigger', {
				filter(Evt, player) {
					if (Evt.name == 'lose') {
						if (Evt.position != ui.discardPile) return false;
					} else {
						let evt = Evt.getParent();
						if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player != player || !['useCard', 'respond'].includes(evt.relatedEvent.name)) return false;
					}
					return get.suit3((Evt.cards2 || Evt.cards).filterInD('d')).length >= 3;
				},
				content: [() => {
					let cards = (trigger.cards2 || trigger.cards).filterInD('d');
					Evt.cards = cards;
					player.chooseTarget((card, player, target) => {
						if (player == target) return false;
						return true;
					}).set('ai', tar => {
						let att = get.$a2(player, tar);
						if (tar.hp == 1) return att + get.damageEffect(tar, player, player)
						return (get.value(_status.event.cards, 'raw', tar) + tar.hp - 5) * att;
					}).set('cards', cards).set('createDialog',
						[get.$pro('suyuan'),
							'small', get.skillInfoTranslation('suyuan', player), '令一名其他角色获得这些牌',
						[cards, 'card']]);
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('suyuan', Evt.target);

						let evt = trigger.getParent().relatedEvent;
						if ((trigger.name == 'discard' && !trigger.delay) || evt?.name == 'respond') game.delayx();
						Evt.target.damage('nosource')
					} else Evt.finish();
				}, () => {
					Evt.target.$.suyuan = Evt.cards.length
					Evt.target.$.suyuan2 = player
					Evt.target.addTempSkill('suyuan2', 'none')
					Evt.target.gain(Evt.cards, 'gain2', 'log');
				}],
			}, 'direct').setT({ player: 'loseAfter', global: 'cardsDiscardAfter' }),
			suyuan2: new toSkill('mark', {
				onremove: ['suyuan', 'suyuan2'],
				filter(Evt, player) {
					return player.$.suyuan2 === Evt.player && player.$.suyuan;
				},
				content() {
					trigger.player.logSkill('suyuan', player)
					trigger.player.gainPlayerCard(player, true, player.$.suyuan)
				}
			}, 'forced', 'mark:character').setT({ global: 'phaseZhunbeiBegin' }).set(['intro', { content: '在$的下个准备阶段由对方获得牌' }]),
			mujian: new toSkill('trigger', {
				content() {
					game.filterPlayer(cur => {
						cur.addSkill('mujian2')
					})
				}
			}, 'forced').setT('dieBegin'),
			mujian2: new toSkill('trigger', {
				content() {
					for (let v of game.dead) {
						if (v.isDead() && v.hasSkill('mujian')) {
							v.revive(1)
							v.logSkill('mujian')
							let next = game.createEvent('resetSkill');
							next.player = v
							next.setContent([function () {
								let list = get.gainableSkills((info, skill) => {
									return info.enable === 'phaseUse' && !info.forceunique && !info.notemp && !player.hasSkill(skill);
								});
								player.discoverSkill(list);
							},
							function () {
								let link = result.skill;
								if (link) {
									player.addTempSkill(link, 'dieBegin')
								}
							}]);
						}
					}
				}
			}, 'locked', 'direct', 'silent').setT({ global: 'roundStart' }),
			cirong: new toSkill('active', {
				usable: 1,
				filterTarget(card, player, target) {
					return get.$dis(player, target, 'pure') <= 1;
				},
				discard: false,
				prepare: 'give2',
				content() {
					target.gain(cards, player);
				},
			}, 'filterCard'),
			maoyu: new toSkill('trigger', {
				filter(Evt, player) {
					if (player !== _status.currentPhase || Evt.player == player) return false;
					{
						let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
						if (info && !info.equipSkill && !info.ruleSkill) return lib.translate[`${name}_info`];
					}
					{
						let name = lib.skill.yiqu.process(Evt.getParent()), info = lib.skill[name];
						if (info && !info.equipSkill && !info.ruleSkill) return lib.translate[`${name}_info`];
					}
				},
				logTarget: 'player',
				content: [function () {
					Evt.tar0 = trigger.player
					Evt.tar1 = Evt.tar0.getNext()
					Evt.list = [`交给${get.$t(player)}两张牌`, `弃置一张牌，令${get.$t(Evt.tar1)}摸一张牌`];
					if (Evt.tar0.countCards('he') >= 2) {
						Evt.tar0.chooseControl('dialogcontrol', Evt.list, function () {
							return _status.event.att;
						}).set('att', get.$a(Evt.tar0, player) > get.$a(Evt.tar0, Evt.tar1) ? 0 : 1).set('prompt', '『猫羽』请选择一项');
					} else {
						Evt._result = { control: Evt.list[1] };
					}
				}, function () {
					switch (result.control) {
						case Evt.list[0]: {
							Evt.tar0.chooseCard(2, true, 'he', `交给${get.$t(player)}两张牌`)
							break;
						}
						case Evt.list[1]: {
							Evt.tar0.chooseToDiscard(true)
							break;
						}
					}
				}, function () {
					if (result.cards.length === 2) player.gain(result.cards, Evt.tar0, 'giveAuto');
					else Evt.tar1.draw();
				}]
			}).setT({ global: 'gainAfter' }),
			//日ノ隈兰
			yixiang: new toSkill('trigger', {
				filter(Evt, player) {
					return game.countPlayer(cur => cur.getDamagedHp() > 0)
				},
				content: [() => {
					player.chooseTarget(get.$pro2('yixiang'), (card, player, tar) => {
						return tar.getDamagedHp() > 0;
					}, tar => {
						let player = _status.event.player
						if (get.type3(tar.getCards()) <= 1) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() - 3 * get.$a(player, tar) - 3
						if (get.type3(tar.getCards()) >= 3) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() - 3
						if (tar === player && player.$.xianyu2?.isIn) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() + (player.$.xianyu2.getHandcardLimit() - player.$.xianyu2.countCards('h')) - 3
						return 0
					})
				}, () => {
					if (result.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('yixiang', Evt.target)
						player.turnOver()
						game.delay(0.8)
					}
					else Evt.finish()
				}, () => {
					Evt.target.recover(Evt.target.getDamagedHp())
					Evt.target.$.yixiang_houxu = player
					Evt.target.addTempSkill('yixiang_houxu')
				}],
				subSkill: {
					houxu: new toSkill('mark', {
						mark: 'character',
						marktext: "🐻",
						intro: {
							name: '异想',
							content(storage, player, skill) {
								return '在本回合结束时展示手牌';
							},
						},
						priority: 43,
						filter(Evt, player) {
							return player.$.yixiang_houxu.isIn();
						},
						content: [() => {
							player.showCards(player.getCards('h'), '异想后续');
							game.delay(0.5);
						}, () => {
							let types = ['basic', 'trick', 'equip'];
							let cards = player.getCards('h').slice(0);
							for (let i = 0; i < cards.length; i++) {
								let type = get.type(cards[i], 'trick');
								if (types.contains(type)) types.remove(type);
							}
							Evt.num = types.length;
							player.loseHp(Evt.num)
						}, () => {
							player.$.yixiang_houxu.draw(Evt.num)
						}]
					}, 'onremove', 'locked', 'forced', 'mark').setT({ global: 'phaseEnd' }),
				}
			}, 'direct').setT('phaseZhunbei'),
			xianyu: new toSkill('trigger', {
				filter(Evt, player) {
					return game.countPlayer() >= 2
				},
				content: [function () {
					player.chooseTarget(get.$pro2('xianyu'), (card, player, tar) => {
						return tar.isIn()
					}, tar => {
						return get.$a2(tar)
					})
				}, function () {
					if (result.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('xianyu', Evt.target)
						game.delay(0.5)
					}
					else {
						player.awakenSkill('xianyu')
						Evt.finish()
					}
				}, function () {
					player.$.xianyu2 = Evt.target
					player.addTempSkill('xianyu2')
				}],
			}, 'direct', 'onremove').setT({ global: 'gameStart', player: 'enterGame' }),
			xianyu2: new toSkill('mark', {
				mark: 'character',
				intro: {
					name: '衔鱼',
					content: `你失去体力时，$摸牌至上限；
					你或$死亡时，对方重置且翻至正面。`
				},
				filter(Evt, player) {
					if (Evt.num <= 0) return false
					return player.$?.xianyu2?.isIn() && !player.$.xianyu2.needsToDiscard()
				},
				logTarget(Evt, player) {
					return player.$?.xianyu2
				},
				content() {
					player.$.xianyu2.drawTo(player.getHandcardLimit())
				},
				group: 'xianyu2_going',
				subSkill: {
					going: new toSkill('trigger', {
						filter(Evt, player) {
							console.log(Evt.player)
							return (player.$?.xianyu2?.isIn() || player.isIn())
								&& [player.$.xianyu2, player].includes(Evt.player)
						},
						logTarget(Evt, player) {
							return player.$?.xianyu2
						},
						content: [() => {
							if (player.$.xianyu2.isDead() && player.isIn()) {
								player.turnOver(false)
								player.link(false)
							}
						}, () => {
							if (trigger.player === player && player.$.xianyu2.isIn()) {
								player.$.xianyu2.turnOver(false)
								player.$.xianyu2.link(false)
							}
						}]
					}, 'forced').setT({ global: 'dieEnd', player: 'dieBegin' })
				}
			}, 'forced').setT('loseHpEnd'),
			//雪团
			chentu: {
				enable: 'phaseUse',
				position: 'h',
				usable: 1,
				filterCard: true,
				selectCard: [1, Infinity],
				complexCard: true,
				check(card) {
					let player = _status.event.player;
					let nh = player.countCards('h') - ui.selected.cards.length;
					for (let i = 0; i < game.players.length; i++) {
						if (game.players[i].isOut() || game.players[i] == player) continue;
						if (game.players[i].countCards('h') < nh) return 12 - get.value(card);
					}
					return 5 - get.value(card);
				},
				content() {
					if (player.isMinHandcard()) {
						if (!player.$.chentu) player.$.chentu = 0;
						player.$.chentu += cards.length;
						player.markSkill('chentu');
					}
				},
				marktext: 'yuki',
				intro: {
					content(storage, player) {
						let str = '下个回合开始时，摸';
						str += get.cnNumber(player.$.chentu * 2);
						str += '张牌';
						return str;
					},
				},
				group: ['chentu_drawBy'],
				subSkill: {
					drawBy: {
						trigger: { player: 'phaseBegin' },
						direct: true,
						filter(Evt, player) {
							return player.$.chentu;
						},
						content() {
							player.draw(player.$.chentu * 2);
							player.unmarkSkill('chentu');
							delete player.$.chentu;
						}
					}
				},
				ai: {
					threaten: 1.3,
					order: 6,
					result: { player: 4 },
				}
			},
			sishu: {
				enable: 'chooseToUse',
				filter(Evt, player) {
					if (player != _status.currentPhase) return false;
					if (!player.countCards('h', { suit: 'heart' }) ||
						!player.countCards('h', { suit: 'spade' }) ||
						!player.countCards('h', { suit: 'diamond' }) ||
						!player.countCards('h', { suit: 'club' })) return false;
					if (!game.hasPlayer(cur => cur != player)) {
						return false;
					}
					return Evt.filterCard({ name: 'sha' }, player, Evt) ||
						Evt.filterCard({ name: 'jiu' }, player, Evt) ||
						Evt.filterCard({ name: 'tao' }, player, Evt) ||
						Evt.filterCard({ name: 'shan' }, player, Evt);
				},
				chooseButton: {
					dialog(Evt, player) {
						let list = [];
						_status.event.skillBy = 'sishu';
						if (Evt.filterCard({ name: 'sha' }, player, Evt)) {
							list.push(['基本', '', 'sha']);
							list.push(['基本', '', 'sha', 'fire']);
							list.push(['基本', '', 'sha', 'thunder']);
						}
						if (Evt.filterCard({ name: 'tao' }, player, Evt)) {
							list.push(['基本', '', 'tao']);
						}
						if (Evt.filterCard({ name: 'jiu' }, player, Evt)) {
							list.push(['基本', '', 'jiu']);
						}
						if (Evt.filterCard({ name: 'shan' }, player, Evt)) {
							list.push(['基本', '', 'shan']);
						}
						delete _status.event.skillBy;
						return ui.create.dialog('饲鼠', [list, 'vcard'], 'hidden');
					},
					check(button) {
						let player = _status.event.player;
						let card = { name: button.link[2], nature: button.link[3] };
						if (card.name == 'jiu') return get.order({ name: 'jiu' });
						if (game.hasPlayer(cur => player.canUse(card, cur) && get.effect(cur, card, player, player) > 0)) {
							if (card.name == 'sha') {
								if (card.nature == 'fire') return 2.95;
								else if (card.nature == 'fire') return 2.92;
								else return 2.9;
							} else if (card.name == 'tao' || card.name == 'shan') {
								return 4;
							}
						}
						return 0;
					},
					backup(links, player) {
						return {
							filterCard(card) {
								if (ui.selected.cards.length) {
									for (let i of ui.selected.cards) {
										if (get.suit(card) == get.suit(i)) return false;
									}
								}
								return get.suit(card);
							},
							complexCard: true,
							viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
							selectCard: 4,
							popname: true,
							log: false,
							precontent: [() => {
								Evt.cards = Evt.result.cards.slice(0);
								Evt.result.card.cards = [];
								Evt.result.cards = [];
								delete Evt.result.card.suit;
								delete Evt.result.card.number;
							}, () => {
								player.chooseTarget('选择收到这些牌的角色', true, lib.filter.notMe).ai = function (target) {
									return get.$a(player, target);
								}
							}, () => {
								if (result.bool && result.targets?.length) {
									player.logSkill('sishu', result.targets);
									player.give(Evt.cards, result.targets[0], true);
								}
							}],
						}
					},
					prompt(links, player) {
						return `###选择交给其他角色的牌，以及${get.$t(links[0][3] || '')}${get.$t(links[0][2])}的目标###（注意是牌的目标。而不是收到牌的角色）`;
					}
				},
				mod: {
					cardEnabled(card, player) {
						if (player == _status.currentPhase && get.type(card) == 'basic' && (_status.event.skillBy != 'sishu' && _status.event.skill != 'sishu_backup')) return false;
					},
					cardSavable(card, player) {
						if (player == _status.currentPhase && get.type(card) == 'basic' && (_status.event.skillBy != 'sishu' && _status.event.skill != 'sishu_backup')) return false;
					},
				},
				ai: {
					order() {
						let player = _status.event.player;
						let Evt = _status.event;
						let nh = player.countCards('h');
						if (game.hasPlayer(cur => get.$a(player, cur) > 0 && cur.countCards('h') < nh)) {
							if (Evt.type == 'dying') {
								if (Evt.filterCard({ name: 'tao' }, player, Evt)) {
									return 0.5;
								}
							} else {
								if (Evt.filterCard({ name: 'tao' }, player, Evt) || Evt.filterCard({ name: 'shan' }, player, Evt)) {
									return 4;
								}
								if (Evt.filterCard({ name: 'sha' }, player, Evt)) {
									return 2.9;
								}
							}
						}
						return 0;
					},
					save: true,
					respondSha: true,
					respondShan: true,
					skillTagFilter(player, tag, arg) {
						return player.countCards('h') >= 4;
					},
					result: {
						player(player) {
							if (_status.event.type == 'dying') {
								return get.$a(player, _status.event.dying);
							} else {
								return 1;
							}
						}
					}
				}
			},
			//扇宝
			fengxu: {
				trigger: {
					player: 'useCardToPlayered',
				},
				filter(Evt, player) {
					return Evt.targets.length == 1
						&& Evt.target == Evt.targets[0]
						&& Evt.target.countCards('hej');
				},
				check(Evt, player) {
					return get.$a(player, Evt.target) <= 0
						|| (get.$a(player, Evt.target) > 0 && Evt.target.countCards('j'));
				},
				content: [() => {
					Evt.A = trigger.target;
					Evt.num = 0;
				}, () => {
					Evt.B = Evt.A.next;
					if (!Evt.A.countCards('hej')) Evt.finish();
					player.choosePlayerCard('hej', Evt.A, true).set('ai', function (button) {
						let player = _status.event.player, source = _status.event.target, target = source.next, link = button.link;
						if (get.position(link) == 'j') {
							if (target.canAddJudge(link)) return get.effect(target, link, player, player) * get.$a(player, target);
						} else if (get.position(link) == 'e') {
							let subtype = get.subtype(link);
							if (!target.getEquip(subtype)) return get.effect(target, link, player, player) * get.$a(player, target);
						} else {
							return get.value(link, target, 'raw') * get.$a(player, target);
						}
					});
				}, () => {
					if (result.bool) {
						let card = result.links[0];
						if (get.position(card) == 'e') {
							let c = Evt.B.getEquip(get.subtype(card));
							if (c) {
								Evt.change = true;
								game.log(c, '掉落了');
							}
							Evt.B.equip(card);
						} else if (get.position(card) == 'j') {
							let cname = card.viewAs ? card.viewAs : get.name(card);
							Evt.B.getCards('j').forEach(function (c) {
								if (get.name(c) == cname) {
									Evt.change = true;
									game.log(c, '掉落了');
									game.cardsDiscard(c);
								}
							})
							Evt.B.addJudge({ name: cname }, [card]);
						} else {
							Evt.B.gain(card, Evt.A);
						}
						Evt.A.$give(card, Evt.B)
						game.delay();
					}
				}, () => {
					if (Evt.change) {
						if (Evt.B == player && Evt.num) player.draw(Evt.num);
					} else if (Evt.num < 5) {
						Evt.A = Evt.B;
						Evt.num++;
						Evt.goto(1);
					}
				}]
			},
			//秋蒂Q
			xiangnuo: {
				trigger: {
					player: ['loseAfter', 'equipEnd'],
					global: ['gainAfter', 'equipAfter', 'addJudgeAfter', 'loseAsyncAfter'],
				},
				direct: true,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 1;
				},
				filter(Evt, player) {
					if (player.$.xiangnuo == 1) {
						return Evt.name == 'equip' && Evt.player == player;
					} else {
						let evt = Evt.getl(player);
						return evt?.es?.length;
					}
				},
				content: [() => {
					player.chooseTarget(get.$pro2('xiangnuo')).ai = function (target) {
						return get.$a2(target) * (target.isMinHp(true) && target.isDamaged() ? 4.5 : 2);
					};
				}, () => {
					if (result.bool) {
						player.$.xiangnuo = player.$.xiangnuo == 1 ? 2 : 1;
						let target = result.targets[0];
						target.draw(2);
						if (target.isMinHp(true)) target.recover();
					}
				}],
				group: 'xiangnuo2',
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
						}
					},
					expose: 0.5,
					threaten: 1.3
				}
			},
			xiangnuo2: {
				enable: 'phaseUse',
				getResult(cards, player): Array<[]> {
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
						if (num == 12) list.push(array);
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
				usable: 1,
				filterCard(card) {
					let num = 0;
					for (let i of ui.selected.cards) {
						num += get.number(i);
					}
					return get.number(card) + num <= 12;
				},
				complexCard: true,
				selectCard() {
					let num = 0;
					for (let i of ui.selected.cards) {
						num += get.number(i);
					}
					if (num == 12) return ui.selected.cards.length;
					return ui.selected.cards.length + 2;
				},
				check(card) {
					let evt = _status.event;
					if (!evt.xiangnuo_choice) evt.xiangnuo_choice = lib.skill.xiangnuo2.getResult(evt.player.getCards('he'), evt.player);
					if (!evt.xiangnuo_choice.includes(card)) return 0;
					return 1;
				},
				content: [() => {
					player.draw(cards.length).gaintag = ['xiangnuo'];
				}, () => {
					player.$.xiangnuo = player.$.xiangnuo == 1 ? 2 : 1;
				}],
				ai: {
					order: 5,
					result: { player: 1 },
				},
			},
			//陆鳐
			manyou: new toSkill('trigger', {
				usable: 1,
				filter(Evt, player) {
					if (Evt.name == 'lose' && Evt.position != ui.discardPile) return false;
					for (let i of (Evt.cards2 || Evt.cards).filterInD('d')) {
						console.log(i)
						if (get.name(i) === 'sha' && ['thunder', 'ocean'].includes(get.nature(i))) return true;
					}
					return false;
				},
				content: [() => {
					Evt.cards = (trigger.cards2 || trigger.cards).filterInD('d').filter(i => get.name(i) === 'sha' && ['thunder', 'ocean'].includes(get.nature(i)))
					player.gain(Evt.cards, 'gain2', 'log').gaintag.add('manyou');
				}],
				group: 'manyou_reCount',
				subSkill: {
					reCount: {
						trigger: { player: 'useCard1' },
						firstDo: true,
						silent: true,
						filter(Evt, player) {
							return get.type(Evt.card) == 'basic' && Evt.cards.length == 1 && player.getHistory('lose', evt => {
								if (evt.getParent() != Evt) return false;
								for (let i in evt.gaintag_map) {
									if (evt.gaintag_map[i].includes('manyou')) return true;
								}
								return false;
							}).length > 0;
						},
						content() {
							if (trigger.addCount !== false) {
								trigger.addCount = false;
								let stat = player.getStat().card;
								if (stat[trigger.card.name]) stat[trigger.card.name]--;
							}
						},
					}
				},
				ai: {
					threaten: 1.1
				}
			}).setT({ global: ['loseAfter', 'cardsDiscardAfter'] }),
			changjie: new toSkill('trigger', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				intro: {
					content: '本局游戏内累计使用了#张属性【杀】'
				},
				content() {
					if (player.hasHistory('sourceDamage', evt => {
						return evt.getParent('phaseUse') === trigger;
					}) && player.$.changjie>0) {
						player.draw(player.$.changjie)
					} else {
						player.chooseToDiscard(true, player.$.changjie,'he')
					}
				},
				group: 'changjie_mark',
				subSkill: {
					mark: new toSkill('trigger', {
						filter(Evt, player) {
							return Evt.card.name === 'sha' && Evt.card.nature;
						},
						content() {
							player.$.changjie++
							player.markSkill('changjie')
						},
					}, 'direct', 'locked').setT('useCard')
				},
				ai: {
					threaten: 1.3
				}
			}, 'forced').setT('phaseUseEnd'),
			//虾皇
			tanghuang: {
				trigger: { target: 'useCardToTargeted' },
				logTarget: 'player',
				usable: 1,
				filter(Evt, player) {
					let source = Evt.player;
					if (source == player) return false;
					return true;
				},
				check(Evt, player) {
					let target = Evt.player;
					if (get.$a(player, target) >= 0) {
						if ((player.hujia || player.getDamagedHp() >= 2) && player.hasSkillTag('xuefeng')) return true;
						if (get.$a(player, target) > 0 && target.hujia && target.hasSkillTag('xuefeng')) return true;
					}
					return false;
				},
				content: [() => {
					Evt.num = (player.getDamagedHp()) || 1;
					Evt.target = trigger.player;
					player.draw(Evt.num);
					game.delayx();
				}, () => {
					let list: Dialogword = [];
					if (Evt.target.countCards('he')) {
						list.push('你的牌', Evt.target.getCards('he'));
					}
					if (player.countCards('h')) {
						list.add(`${get.$t(player.name)}的牌`);
						list.push([player.getCards('h'), 'blank'])
					}
					if (player.countCards('e')) {
						list.add(`${get.$t(player.name)}的牌`);
						list.push(player.getCards('e'));
					}
					let chooseButton = Evt.target.chooseButton(Evt.num + 3, true, list);
					chooseButton.set('target', player);
					chooseButton.set('num', Evt.num);
					chooseButton.set('ai', function (button) {
						let player = _status.event.player, target = _status.event.target;
						let num = _status.event.num
						let ps = [], ts = [];
						for (let i of ui.selected.buttons) {
							let card = i.link;
							if (target.getCards('he').includes(card)) ts.push(card);
							else ps.push(card);
						}
						let card = button.link;
						let owner = get.owner(card), val = get.value(card) || 1;
						if (get.$a(player, target) > 0) {
							if (target.hujia || player.hujia) { } else if (num % 2 == 0) {
								if (owner == ((ps.length > ts.length) ? target : player)) return 10 - val;
							}
						}
						if (owner == player) {
							if (target.hujia && target.hasSkillTag('xuefeng')) {
								if (ps.length > 1) return 15 - val;
								return 12 - val;
							}
							return 7 - val;
						} else {
							if (player.hujia && player.hasSkillTag('xuefeng')) {
								if (ts.length > 1) return 16 - val;
								return 11 - val;
							}
							return 5.5 - val;
						}
					});
					chooseButton.set('filterButton', function (button) {
						let player = _status.event.player;
						return lib.filter.canBeDiscarded(button.link, player, get.owner(button.link));
					});
				}, () => {
					if (result.bool) {
						let list = result.links, target = Evt.target;
						Evt.list1 = [];
						Evt.list2 = [];
						for (let i of list) {
							if (get.owner(i) == player) {
								Evt.list1.push(i);
							} else {
								Evt.list2.push(i);
							};
						};
						if (Evt.list1.length && Evt.list2.length) {
							target.discard(Evt.list2).delay = false;
							player.discard(Evt.list1);
						} else if (Evt.list2.length) {
							target.discard(Evt.list2);
						} else player.discard(Evt.list1);
						let dis = Evt.list1.length - Evt.list2.length;
						if (dis > 0) {
							Evt.dis = dis;
							Evt.more = player;
							Evt.less = target;
						} else if (dis < 0) {
							Evt.dis = -dis;
							Evt.more = target;
							Evt.less = player;
						}
					};
				}, () => {
					if (Evt.more) {
						Evt.less.damage();
						Evt.more.draw(Evt.dis);
					}
				}],
			},
			xiejiang: {
				trigger: { player: ['drawEnd', 'changeHujiaEnd'] },
				filter(Evt, player) {
					if (Evt.name == 'draw') return Evt.num >= 2;
					else return Evt.num < 0 && _status.currentPhase;
				},
				forced: true,
				content() {
					if (trigger.name == 'draw') {
						player.changeHujia();
					} else {
						_status.currentPhase.draw(2);
					}
				},
				ai: {
					tag: {
						xuefeng: 1,
					}
				}
			},
			//龟龟
			lache: {
				trigger: { player: ['recoverAfter', 'discardAfter', 'changeHujiaEnd'] },
				logTarget(Evt, player) {
					if (Evt.name == 'recover') return _status.currentPhase;
					return player;
				},
				filter(Evt, player) {
					if (Evt.name == 'recover') return _status.currentPhase?.isIn();
					else if (player.hp < player.maxHp) {
						if (Evt.name == 'discard') return Evt.cards.length >= 2;
						else return Evt.num < 0;
					}
				},
				prompt2(Evt, player) {
					if (Evt.name == 'recover') return '令其摸两张牌';
					return '回复一点体力';
				},
				check(Evt, player) {
					if (Evt.name == 'recover') return get.$a(player, _status.currentPhase) > 0;
					else return true;
				},
				content() {
					if (trigger.name == 'recover') {
						_status.currentPhase.draw(2);
					} else {
						if (_status.currentPhase != player) player.draw(Math.abs(trigger.num || trigger.cards.length));
						player.recover();
					}
				},
			},
			danfu: {
				trigger: { player: ['phaseJieshuBegin', 'changeHujiaAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'phaseJieshu') return !player.getStat('damage');
					else return Evt.num < 0 && _status.currentPhase;
				},
				forced: true,
				content() {
					if (trigger.name == 'phaseJieshu') {
						player.loseHp();
						player.changeHujia();
					} else {
						for (let i = 0; i > trigger.num; i--) {
							_status.currentPhase.draw();
						}
					}
				},
				ai: {
					tag: {
						xuefeng: 1,
					}
				}
			},
			//伊万
			shuipo: {
				trigger: { player: ['discardAfter', 'changeHujiaEnd', 'useCardAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'useCard') return get.type2(Evt.card) == 'trick' && !player.hasSkill('shuipo_used');
					else if (Evt.name == 'discard') return Evt.cards.length >= 3;
					else return !player.hujia;
				},
				forced: true,
				content() {
					if (trigger.name == 'useCard') {
						player.loseHp();
						player.chooseToDiscard([1, Infinity], 'he', true, '『水魄』：请弃置任意张牌')
						player.addTempSkill('shuipo_used', 'phaseNext');
					} else {
						player.recover();
						player.draw();
					}
				},
				subSkill: {
					used: {},
				},
				ai: {
					tag: {
						xuefeng: 1,
					}
				}
			},
			ming_pianchao: {},
			pianchao: {
				mod: {
					aiValue(player, card, num) {
						if (card.hasGaintag && card.hasGaintag('ming_') && player.hasUseTarget(card)) return num / (10 * player.getUseValue(card));
					},
				},
				trigger: { player: ['loseHpAfter', 'discardEnd'] },
				filter(Evt, player) {
					if (Evt.name == 'loseHp') return player.countCards('h', card => !card.hasGaintag('ming_')) >= 2;
					else {
						return player.getHistory('lose', evt => {
							if (evt.getParent() != Evt) return false;
							for (let i in evt.gaintag_map) {
								if (evt.gaintag_map[i].includes('ming_')) return true;
							}
							return false;
						}).length > 0;
					}
				},
				direct: true,
				content: [() => {
					if (trigger.name == 'loseHp') {
						player.chooseCard('h', `###${get.$pro('pianchao')}###亮出两张手牌并获得1点护甲`, 2, card => !card.hasGaintag('ming_'));
					} else {
						Evt.cards = trigger.cards.filter(card => player.getHistory('lose', evt => {
							if (evt.getParent() != trigger) return false;
							if (evt.gaintag_map[card.cardid] && evt.gaintag_map[card.cardid].includes('ming_')) return true;
							return false;
						}).length > 0);
						let next = player.chooseCardButton(1, `###${get.$pro('pianchao')}###使用其中一张牌`, Evt.cards);
						next.set('filterButton', function (button) {
							let player = _status.event.player;
							return player.hasUseTarget(button.link);
						});
						next.set('ai', function (button) {
							let player = _status.event.player;
							return player.getUseValue(button.link);
						});
					}
				}, () => {
					if (result.bool) {
						if (trigger.name == 'loseHp') {
							player.logSkill('pianchao')
							player.addGaintag(result.cards, 'ming_pianchao');
							player.changeHujia();
						} else {
							player.logSkill('pianchao')
							player.chooseUseTarget(result.links[0], true, 'nopopup');
							player.addTempSkill('pianchao_phaseUseBy', 'none');
						}
					}
				}],
				subSkill: {
					phaseUseBy: {
						mark: true,
						marktext: '片',
						intro: { content: '于下个额定阶段结束后进行一个额外的出牌阶段' },
						trigger: { global: 'phaseNext' },
						forced: true,
						content() {
							player.removeSkill('pianchao_phaseUseBy');
							player.phaseUse();
						},
					},
				},
			},
			//申䒕雅
			xyshixi: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget: true,
				content: [() => {
					target.damage();
				}, () => {
					target.recover();
				}],
				ai: {
					tag: {
						xuefeng: 1,
					}
				}
			},
			wenxin: {
				mod: {
					aiValue(player, card, num) {
						if (card.hasGaintag && card.hasGaintag('ming_') && player.hasUseTarget(card)) return num / (10 * player.getUseValue(card));
					},
				},
				trigger: { player: 'phaseJieshuEnd' },
				filter(Evt, player) {
					return game.hasPlayer(cur => cur.hasHistory('recover', evt => evt.player == cur && evt.result))
				},
				content: [() => {
					Evt.targets = game.filterPlayer(cur => cur.hasHistory('recover', evt => evt.player == cur && evt.result));
					game.asyncDraw(Evt.targets, player.getDamagedHp() || 1);
				}],
			},
			//Ciyana
			yankui: {
				trigger: { global: 'phaseZhunbei' },
				direct: true,
				filter(Evt, player) {
					return player != Evt.player && player.countCards('he', card => !player.$.yankui_mark
						|| !player.$.yankui_mark.includes(get.type2(card))) > 1 && Evt.player.countGainableCards(player, 'h');
				},
				check(Evt, player) {
					if (player.hasUnknown(4)) return false;
					return true;
				},
				content: [() => {
					Evt.target = trigger.player;
					game.broadcastAll(function (player) {
						player.chooseToDiscard(get.$pro2('yankui'), 'he', card => !player.$.yankui_mark
							|| !player.$.yankui_mark.includes(get.type2(card))).ai = card => {
								let player = _status.event.player, target = _status.event.getTrigger().player, use = 0;
								if (player.hasUseTarget(card)) use += player.getUseValue(card) * 2;
								if (get.$a(player, target) < 1) return 6 - get.useful(card) + use;
								return 0;
							};
					}, player)
				}, () => {
					if (result.cards && result.cards.length) {
						player.logSkill(Evt.target);
						if (!player.$.yankui_mark) player.$.yankui_mark = [];
						for (let i = 0; i < result.cards.length; i++) {
							player.$.yankui_mark.add(get.type2(result.cards[0]));
						}
						let next = player.gainPlayerCard(Evt.target, 'h', true, 'visibleMove');
						next.set('visible', true);
						next.set('ai', function (button) {
							let player = _status.event.player, target = _status.event.getTrigger().player;
							if (get.$a(player, target) > 0) {
								if (target.countCards('h', { name: 'sha' }) > 1 && get.type(button.link) != 'basic' && get.name(button.link) != 'sha') return 6 + get.value(button.link);
								if (target.countCards('j') && target.needsToDiscard() && get.type(button.link) != 'basic') return 5 + get.value(button.link);
							}
							return get.value(button.link);
						});
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool && result.links) {
						player.addTempSkill('yankui_mark', 'roundStart');
						Evt.card = result.links[0];
						if (get.type(Evt.card) != 'basic') {
							Evt.target.skip('phaseJudge');
							Evt.target.skip('phaseDiscard');
							Evt.target.addTempSkill('yankui1');
						} else {
							Evt.target.addTempSkill('yankui2');
						}
					}
				}],
				//group:'yankui_mark',
				subSkill: {
					mark: {
						mark: true,
						marktext: '魇',
						intro: {
							name: '魇窥',
							content(storage, player) {
								let str = '<ul style="padding-top:0;margin-top:0"><p>本轮次已弃置的牌类型</p>';
								for (let i = 0; i < storage.length; i++) {
									str += '<li>' + get.$t(storage[i]);
								}
								str += '</ul>'
								return str;
							},
						},
						onremove(player, skill) {
							player.unmarkSkill(skill);
							delete player.$[skill]
						},
					},
				},
			},
			yankui1: {
				mark: true,
				marktext: '魇',
				intro: { name: '魇窥 - 非基本牌', content: '跳过本回合下一个判定阶段和弃牌阶段' },
			},
			yankui2: {
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return num + 1;
					},
				},
				mark: true,
				marktext: '魇',
				intro: { name: '魇窥 - 基本牌', content: '本回合内可以多使用一张【杀】' },
			},
			//noe
			huiyuan: {
				audio: 4,
				trigger: { global: 'useCard1' },
				filter(Evt, player) {
					return player.countCards('h') < Evt.player.countCards('h') && get.type(Evt.card) == 'basic';
				},
				usable: 1,
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				content() {
					game.asyncDraw([player, trigger.player]);
				},
			},
			suoshi: {
				audio: 2,
				trigger: { player: 'damageBegin3' },
				filter(Evt, player) {
					return player.countCards('h');
				},
				direct: true,
				content: [() => {
					let list = game.filterPlayer(cur => {
						return cur.isMaxHandcard();
					});
					player.chooseCardTarget({
						prompt: get.$pro2('suoshi'),
						position: 'h',
						filterTarget(card, player, target) {
							return player != target && target.isMaxHandcard();
						},
						filterCard: lib.filter.cardDiscardable,
						ai1(card) {
							if (_status.event.goon) return 6 - get.value(card);
							return 0;
						},
						ai2(target) {
							let player = _status.event.player;
							return get.$a(player, target);
						},
						goon: !player.isMinHandcard() && (player.countCards('h') < 3 && get.$a(player, list[0]) > 0),
					});
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.cards = result.cards.slice(0);
						Evt.target = result.targets[0];
						player.logSkill('suoshi', Evt.target);
						player.give(Evt.cards, Evt.target);
					}
				}],
				group: ['suoshi_addDam'],
				subSkill: {
					addDam: {
						trigger: { player: 'damageBegin' },
						forced: true,
						filter(Evt, player) {
							return !player.isMinHandcard();
						},
						content() {
							trigger.num++;
						}
					}
				}
			},
			//帕里
			paryi: {
				marktext: "P",
				locked: true,
				intro: {
					name: '帕里家常',
					content(storage, player, skill) {
						return `已经历了${storage}次『天扉』`;
					},
				},
			},
			tiantang: {
				audio: 2,
				priority: 987,
				global: 'paryi',
				trigger: {
					global: 'phaseBegin'
				},
				filter(Evt, player) {
					if (player.countCards('he') < (Evt.player.$.paryi || 1)) return false;
					return true;
				},
				check(Evt, player) {
					if (player.$.haoren !== true) return (Evt.player.$.paryi || 1) <= 2 && get.$a(player, Evt.player) < 1 && !Evt.player.hasJudge('lebu');
					return Evt.player.needsToDiscard() && get.$a(player, Evt.player) < 0 || Evt.player.countCards('h') == 0 && Evt.player.getHandcardLimit() >= 3 && get.$a(player, Evt.player) >= 0;
				},
				content: [() => {
					let num = trigger.player.$.paryi || 1;
					if (player.$.haoren === true) player.chooseCard(num, 'he', `『天扉』：重铸${get.cnNumber(num)}张牌`).ai = get.unuseful3;
					else player.chooseToDiscard(num, 'he', `『天扉』：弃置${get.cnNumber(num)}张牌`).ai = get.unuseful2;
				}, () => {
					if (result.bool) {
						Evt.target = trigger.player;
						if (player.$.haoren !== true) {
							player.addMark('haoren');
						} else {
							player.lose(result.cards, ui.discardPile).set('visible', true);
							player.$throw(result.cards, 1000);
							game.log(player, '将', result.cards, '置入了弃牌堆');
							player.draw(result.cards.length);
						}
						let target = Evt.target;
						if (target.$.paryi) {
							target.$.paryi++;
						} else {
							target.$.paryi = 1;
						}
						target.markSkill('paryi');
						Evt.videoId = lib.status.videoId++;
						let suitlist = [
							['heart', '', 'heart', 'heart'],
							['diamond', '', 'diamond', 'diamond'],
							['club', '', 'club', 'club'],
							['spade', '', 'spade', 'spade']
						];
						game.broadcastAll(function (id, suitlist) {
							let dialog = ui.create.dialog('『天扉』声明');
							dialog.addText('花色');
							dialog.add([suitlist, 'vcard']);
							dialog.videoId = id;
						}, Evt.videoId, suitlist);
					} else Evt.finish();
				}, () => {
					player.chooseButton().set('dialog', Evt.videoId);
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						Evt.tiantang = result.links[0][2];
						player.chat(get.$t(Evt.tiantang));
						game.log(player, '声明了', Evt.tiantang);

						let list = [`观看${get.$t(Evt.target)}的手牌${player.awakenedSkills.includes('haoren') ? '并重铸' : '并弃置'}其一张${get.$t(Evt.tiantang)}牌，令其执行一个额外的出牌阶段`,
						`令${get.$t(Evt.target)}摸两张牌，然后其只能使用${get.$t(Evt.tiantang)}的牌直到回合结束`];
						// if(!player.awakenedSkills.includes('haoren')&&!Evt.target.countDiscardableCards(player,'he'))	list.shift();
						player.chooseControl('dialogcontrol', list).set('ai', function () {
							return 1;
						}).set('prompt', '『天扉』：选择一项');
					} else Evt.finish();
				}, () => {
					switch (result.index) {
						case 0: {
							let next = player[player.$.haoren === true ? 'choosePlayerCard' : 'discardPlayerCard'](`『天扉』：${player.$.haoren === true ? '重铸' : '弃置'}一张声明花色的牌`, Evt.target, 'he').set('visible', true).set('complexSelect', true);
							next.set('filterButton', function (button) {
								return get.suit(button.link) == _status.event.suit;
							});
							next.set('suit', Evt.tiantang);
							if (Evt.target.countCards('he', card => get.suit(card) == Evt.tiantang)) {
								next.set('forced', true);
							}
							break;
						}
						case 1: {
							Evt.target.draw(2, player);
							Evt.target.addTempSkill('tiantangzhifei_xianzhi', 'phaseEnd');
							Evt.target.$.tiantangzhifei_xianzhi = Evt.tiantang;
							Evt.target.syncStorage('tiantangzhifei_xianzhi');
							Evt.finish();
							break;
						}
					}
				}, () => {
					if (player.$.haoren === true && result.bool && result.cards) {
						Evt.target.lose(result.cards, ui.discardPile).set('visible', true);
						Evt.target.$throw(result.cards, 1000);
						game.log(Evt.target, '将', result.cards, '置入了弃牌堆');
						Evt.target.draw(result.cards.length);
					}
					if (player.$.haoren === true) {
						Evt.target.addTempSkill('tiantangzhifei_yisheng', 'phaseUseEnd');
					}
					Evt.target.phaseUse();
				}],
			},
			tiantangzhifei: {
				subSkill: {
					yisheng: {
						mark: true,
						marktext: "流",
						intro: {
							name: '回流',
							content(storage, player, skill) {
								return '暂时获得技能『引流』';
							},
						},
						inherit: 'yinliu',
					},
					xianzhi: {
						mark: true,
						marktext: "断",
						locked: true,
						intro: {
							name: '断臂',
							content(storage, player, skill) {
								return `只能使用花色为${get.$t(storage)}的牌`;
							},
						},
						onremove: true,
						mod: {
							cardEnabled(card, player, now) {
								if (get.suit(card) != player.$.tiantangzhifei_xianzhi) return false;

							},
						},
					},
				}
			},
			haoren: {
				audio: true,
				skillAnimation: true,
				animationStr: '好人一生',
				unique: true,
				juexingji: true,
				forced: true,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				marktext: "井",
				intro: {
					name: '挖井人',
					content(storage, player, skill) {
						return `已发动了${storage}次『天扉』`;
					},
				},
				trigger: { player: 'tiantangAfter' },
				filter(Evt, player) {
					return player.$.haoren > game.countPlayer();
				},
				content() {
					player.loseMaxHp();
					player.$.haoren = true;
					player.awakenSkill('haoren');
					player.unmarkSkill('haoren');
				},
				ai: {
					combo: 'tiantang',
				},
			},
			//ggl
			shengya: {
				audio: 4,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				marktext: "卒",
				intro: {
					name: '职业生涯结束',
					content(storage, player, skill) {
						return '失去『职业生涯』直到下个回合开始';
					},
				},
				trigger: { player: 'useCardAfter' },
				priority: 996,
				forced: true,
				filter(Evt, player) {
					return player.$.shengya && player.isPhaseUsing() && get.color(Evt.card) == 'red';
				},
				content() {
					Evt.cards = get.cards(1);
					game.cardsGotoOrdering(Evt.cards);
					player.showCards(Evt.cards);
					game.delay(1);
					player.gain(Evt.cards);
					if (get.suit(Evt.cards[0]) == 'club') {
						player.loseHp();
						player.$.shengya = false;
						player.markSkill('shengya');
					}
				},
				group: 'shengya_init',
				subSkill: {
					init: {
						trigger: { player: 'phaseBefore' },
						silent: true,
						forced: true,
						priority: 996,
						content() {
							if (!player.$.shengya) {
								player.$.shengya = true;
								player.unmarkSkill('shengya');
							}
						},
					},
				}
			},
			liangshan: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				marktext: "汉",
				intro: {
					name: '好汉歌',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true,
				trigger: { global: 'drawEnd' },
				priority: 996,
				filter(Evt, player) {
					return Evt.player != player && player == _status.currentPhase && Evt.player.getHistory('gain').length == 1;
				},
				content() {
					let card = game.cardsGotoSpecial(get.cards()).cards[0];
					game.log(player, '将', card, '置于武将牌上');
					player.$.liangshan.push(card);
					player.$draw(card);
					game.delay();
					player.markSkill('liangshan');
				},
				group: ['liangshan_use', 'liangshan_save'],
				subSkill: {
					use: {
						trigger: { global: 'phaseBegin' },
						priority: 996,
						check(Evt, player) {
							if (player.hasUnknown(1)) return false;
							return get.$a(player, Evt.player) > 0;
						},
						filter(Evt, player) {
							return player.$.liangshan.length;
						},
						prompt2: '一名角色回合开始时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
						content: [() => {
							player.chooseCardButton('交给其一张你武将牌上的牌', 1, player.$.liangshan);
						}, () => {
							if (result.bool) {
								let card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player, '将', card, '交给了', trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
								player.$.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}]
					},
					save: {
						trigger: { global: 'dying' },
						priority: 996,
						check(Evt, player) {
							return get.$a(player, Evt.player) > 0;
						},
						filter(Evt, player) {
							return Evt.player.hp <= 0 && player.$.liangshan.length;
						},
						prompt2: '一名角色濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
						content: [() => {
							player.chooseCardButton('交给其一张你武将牌上的一张牌', 1, player.$.liangshan);
						}, () => {
							if (result.bool) {
								let card = result.links;
								player.$give(card, trigger.player, false);
								game.log(player, '将', card, '交给了', trigger.player);
								trigger.player.gain(card);
								trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
								player.$.liangshan.remove(card);
								player.markSkill('liangshan');
							}
						}]
					}
				},
			},
			chongshi: {
				trigger: { player: 'shaBegin' },
				priority: 996,
				frequent: true,
				content() {
					game.asyncDraw([player, trigger.target]);
					// player.draw();
					// trigger.target.draw();
				}
			},
			//miu
			guanzhai: {
				audio: 5,
				trigger: { global: 'phaseEnd' },
				priority: 997,
				prompt2(Evt, player) {
					let target = Evt.player;
					return `可以观看其手牌，并获得其中至多${target.hasSkill('zhai') ? target.countMark('zhai') + 1 : 1}张牌`;
				},
				logTarget: 'player',
				filter(Evt, player) {
					let num = Evt.player.countUsed(null, true);
					return Evt.player != player && Evt.player.countCards('h') && num < (Evt.player.hasSkill('zhai') ? Evt.player.countMark('zhai') + 2 : 2);
				},
				content: [() => {
					let str = `###『观宅』###获得其中至多${trigger.player.hasSkill('zhai') ? trigger.player.countMark('zhai') + 1 : 1}张牌`;
					player.choosePlayerCard(trigger.player, [1, (trigger.player.hasSkill('zhai') ? trigger.player.countMark('zhai') + 1 : 1)], 'h').set('visible', true).set('prompt', str);
				}, () => {
					if (result.bool) {
						player.logSkill('guanzhai', trigger.player, true, true, false);
						player.gain(result.cards, trigger.player, 'giveAuto');
					}
				}],
			},
			zhai: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				marktext: '宅',
				intro: {
					name: '直往欲女',
					name2: '观宅',
					content(storage, player, skill) {
						return `下个回合中，『观宅』（）内的数值+${storage}。`;
					},
				},
				mark: true,
				onremove: true,
			},
			zhishu: {
				audio: 3,
				trigger: { player: ['phaseUseBegin', 'changeHp'] },
				direct: true,
				filter(Evt, player) {
					return player.countCards('h');
				},
				content: [() => {
					let next = player.chooseCardTarget().set('prompt', get.$pro2('zhishu'));
					next.set('filterTarget', function (card, player, target) {
						return target != player;
					});
					next.set('ai2', function (target) {
						let player = _status.event.player;
						return 7 - get.$a(player, target);
					});
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('zhishu', Evt.target);
						player.showCards(result.cards, '『直抒』展示手牌');
						game.delayx();
						Evt.target.chooseCard('he', `是否交给${get.$t(player)}一张花色为${get.$t(get.suit(result.cards[0]))}的牌？`, function (card, player) {
							return get.suit(card) == _status.event.suit;
						}).set('suit', get.suit(result.cards[0]))
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						player.gain(result.cards[0], Evt.target, 'giveAuto');
					} else {
						Evt.target.addTempSkill('zhai', { player: 'phaseAfter' });
						Evt.target.addMark('zhai', 1);
						game.log(Evt.target, '拒绝交给', player, '相同花色的牌');
					}
				}],
				ai: {
					combo: 'guanzhai',
				},
			},
			//oto
			yuxia: {
				audio: 4,
				hiddenCard(player, name) {
					if (!lib.skill.yuxia.filter(false, player)) return false;
					let list = get.inpile('trick');
					for (let i = 0; i < list.length; i++) {
						if (list[i] == name) return true;
					}
					return false;
				},
				enable: 'chooseToUse',
				filter(Evt, player) {
					return player.countCards('he') >= 3;
				},
				chooseButton: {
					dialog(Evt, player) {
						let list = get.inpile('trick');
						for (let i = 0; i < list.length; i++) {
							list[i] = ['锦囊', '', list[i]];
						}
						return ui.create.dialog('『玉匣』', [list, 'vcard']);
					},
					filter(button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
					},
					check(button) {
						let player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						if (['wugu', 'jingluo'].includes(button.link[2])) return 0;
						let effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links, player) {
						return {
							audio: 'yuxia',
							filterCard(card) {
								return true;
							},
							selectCard: 3,
							forceAuto() {
								return ui.selected.cards.length == 3;
							},
							popname: true,
							check(card) {
								return 7 - get.value(card);
							},
							position: 'hes',
							viewAs: { name: links[0][2], nature: links[0][3] },
						}
					},
					prompt(links, player) {
						return `###『玉匣』###将三张牌当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
					}
				},
				ai: {
					order: 6,
					result: {
						player(player) {
							let players = game.filterPlayer();
							for (let i = 0; i < players.length; i++) {
								if (players[i] != player && get.$a(player, players[i]) > 0) {
									return 0.5;
								}
							}
							return 0;
						}
					},
				},
				group: 'yuxia_after',
				subSkill: {
					after: {
						trigger: { player: 'useCardEnd' },
						priority: 66,
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							return Evt.cards.length == 3 && Evt.skill == 'yuxia_backup' && Evt.cards.filterInD().length;
						},
						content: [() => {
							Evt.cards = trigger.cards.filterInD();
							player.chooseCardButton([0, 3], true, Evt.cards, '『玉匣』：可以按顺序将卡牌置于牌堆顶（先选择的在上）').set('ai', function (button) {
								let player = _status.event.player;
								let now = _status.currentPhase;
								let next = now.getNext();
								let att = get.$a(player, next);
								let card = button.link;
								let judge = next.getCards('j')[ui.selected.buttons.length];
								if (judge) {
									return get.judge(judge)(card) * att;
								}
								return next.getUseValue(card) * att;
							});
						}, () => {
							if (result.bool && result.links) {
								let list = result.links.slice(0);
								if (list.length) {
									Evt.cards.removeArray(list);
								}
								while (list.length) {
									ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
								}
								game.log(player, '将牌放在牌堆顶')
								if (Evt.cards.length) {
									game.cardsDiscard(Evt.cards);
									game.log(Evt.cards, '进入了弃牌堆')
								}
							} else {
								game.cardsDiscard(Evt.cards);
								game.log(Evt.cards, '进入了弃牌堆')
							}
						}]
					}
				},
			},
			lianjue: {
				init(player, skill) {
					player.$[skill] = [];
				},
				marktext: '崛',
				intro: {
					content: 'cards',
					name: '以『连崛』使用过的锦囊牌',
				},
				trigger: { player: 'phaseEnd' },
				priority: 66,
				frequent: true,
				prompt2: '你可以选择一项：令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
				filter(Evt, player) {
					return /*(player.$.lianjue-player.countCards('h'))&&*/(Math.abs(player.$.lianjue_start - player.countCards('h')) % 3 == 0);
				},
				content: [() => {
					player.chooseControlList(['令至多三名角色各摸一张牌', '视为使用一张未以此使用过的通常锦囊牌'], function () {
						return 1;
					});
				}, () => {
					switch (result.index) {
						case 0: {
							player.chooseTarget([1, 3], '令至多三名角色各摸一张牌').set('ai', function (target) {
								let att = get.$a(_status.event.player, target);
								if (att > 1) {
									return att;
								}
								return 0;
							});
							Evt.goto(2);
							break;
						}
						case 1: {
							Evt.videoId = lib.status.videoId++;
							let list = [];
							for (let i = 0; i < lib.inpile.length; i++) {
								let name = lib.inpile[i];
								let reapeat = 0;
								if (player.$.lianjue.length) {
									player.$.lianjue.forEach(function (his) {
										if (get.name(his) == name) reapeat++;
									});
								}
								if (reapeat || name == 'wuxie' || name == 'jinchan') continue;
								else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							}
							game.broadcastAll(function (id, list) {
								let dialog = ui.create.dialog('使用一张未以此使用过的通常锦囊牌', [list, 'vcard']);
								dialog.videoId = id;
							}, Evt.videoId, list);
							Evt.goto(3);
							break;
						}
					}
				}, () => {
					if (result.targets?.length) {
						game.asyncDraw(result.targets);
					}
					Evt.finish();
				}, () => {
					let next = player.chooseButton(1);
					next.set('dialog', Evt.videoId);
					next.set('ai', function (button) {
						return player.getUseValue({ name: button.link[2], isCard: true });
					});
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						let card = result.links[0];
						player.chooseUseTarget({ name: card[2] }, true);
						player.$.lianjue.add(game.createCard(card[2]));
						player.syncStorage('lianjue');
						player.markSkill('lianjue');
					}
				}],
				group: ['lianjue_start'],
				subSkill: {
					start: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = 0;
						},
						trigger: { player: 'phaseBefore' },
						firstDo: true,
						forced: true,
						silent: true,
						popup: false,
						priority: 66,
						content() {
							player.$.lianjue_start = player.countCards('h');
						},
					},
				},
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player == _status.currentPhase && !player.needsToDiscard() && Math.abs(player.$.lianjue_start - player.countCards('h')) % 3 == 0) {
							return num - 10;
						}
					},
				},
			},
			changxiang: {
				zhuSkill: true,
				trigger: { global: 'dying' },
				priority: 66,
				filter(Evt, player) {
					if (!player.hasZhuSkill('changxiang')) return false;
					return Evt.player.hp <= 0 && Evt.player != player && Evt.player.group == player.group && player.countCards('he') >= player.hp;
				},
				content: [() => {
					player.chooseToDiscard(player.hp);
				}, () => {
					if (result.bool)
						player.useCard({ name: 'tao' }, trigger.player);
				}]
			},
			//团长
			xhhuanshi: {
				mark: true,
				locked: true,
				intro: {
					name: '幻士',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true,
			},
			huange: {
				trigger: { global: 'phaseBegin' },
				round: 1,
				priority: 996,
				filter(Evt, player) {
					return game.countPlayer(cur => cur.hp > 0 && cur.hp !== Infinity);
				},
				check(Evt, player) {
					if (Evt.player != player && get.$a(player, Evt.player) < 0 && Evt.player.inRange(player)) return true;
					return Evt.player == player && game.roundNumber > 1 && player.hasUseTarget('sha') && !player.needsToDiscard();
				},
				popup: false,
				content: [() => {
					let next = player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌', true, function (card, player, target) {
						return target.hp > 0 && target.hp !== Infinity;
					});
					next.set('ai', function (target) {
						let num = target.hp
						if (player.$.qishi === true) num += target.hp
						if (player.inRange(target)) return num - get.$a(player, target);
						else return num - (get.$a(player, target) / 2);
					})
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('huange', result.targets);
						player.draw(result.targets[0].hp);
						player.$.huange_disc = result.targets[0];
						player.markSkill('huange_disc');
						player.addTempSkill('huange_disc');
					}
				}],
				subSkill: {
					disc: {
						mark: 'character',
						intro: {
							name: '幻歌',
							content: '回合结束时弃置$体力值的牌',
						},
						trigger: { global: 'phaseEnd' },
						priority: 996,
						onremove: true,
						forced: true,
						filter(Evt, player) {
							return player.countDiscardableCards(player, 'he');
						},
						content: [() => {
							if (player.$.huange_disc.isIn() && player.countCards('he')) {
								let prompt2 = player.$.qishi === true ? `将${get.cnNumber(player.$.huange_disc.hp)}张牌置于武将牌上` : `弃置${get.cnNumber(player.$.huange_disc.hp)}张牌`;
								player.chooseCard('he', `###『幻歌』###${prompt2}`, player.$.huange_disc.hp, true, lib.filter.cardDiscardable);
							} else {
								Evt.goto(2);
							}
						}, () => {
							if (result.bool) {
								if (player.$.qishi === true) {
									Evt.cards = result.cards;
									player.lose(result.cards, ui.special, 'toStorage');
									player.$give(Evt.cards, player, false);
									player.markAuto('xhhuanshi', Evt.cards);
								} else {
									player.discard(result.cards);
								}
							}
						}, () => {
							player.unmarkSkill('huange_disc');
							delete player.$.huange_disc;
						}],
					}
				},
			},
			qishi: {
				audio: true,
				skillAnimation: true,
				animationStr: '希望之花',
				unique: true,
				juexingji: true,
				forced: true,
				trigger: { global: 'roundEnd' },
				firstDo: true,
				priority: 996,
				filter(Evt, player) {
					return player.$.qishi_date && player.$.qishi_date.includes(player) && player.$.qishi_date.length > 1;
				},
				content: [() => {
					player.unmarkSkill('qishi_date');
					player.loseMaxHp();
					Evt.cards = [];
				}, () => {
					let next = player.judge(card => {
						if (get.color(card) == 'black') return -1.5;
						return 1.5;
					});
					next.set('callback', function () {
						Evt.getParent().orderingCards.remove(card);
					});
				}, () => {
					if (result.bool) {
						Evt.cards.push(result.card);
						Evt.goto(1);
					} else {
						Evt.cards.push(result.card);
					}
				}, () => {
					for (let i = 0; i < Evt.cards.length; i++) {
						if (get.position(Evt.cards[i], true) != 'o') {
							Evt.cards.splice(i, 1);
							i--;
						}
					}
					if (Evt.cards.length) {
						player.$gain2(Evt.cards, false)
						player.markAuto('xhhuanshi', Evt.cards);
					}
				}, () => {
					player.$.qishi = true;
					player.awakenSkill('qishi');
					player.addSkill('xiban');
				}],
				derivation: 'xiban',
				group: ['qishi_date', 'qishi_update'],
				subSkill: {
					date: {
						mark: true,
						intro: {
							name: '奇誓',
							content(storage, player, skill) {
								let str = '本轮内';
								if (storage.includes(player)) str += ' 已受到伤害';
								if (storage != [player]) str += ' 已造成伤害';
								return str;
							},
							onunmark(storage, player) {
								if (storage && storage.length) {
									storage.length = 0;
								}
							},
						},
						trigger: { player: 'damageEnd', source: 'damageEnd' },
						firstDo: true,
						priority: 996,
						direct: true,
						filter(Evt, player) {
							if (player.$.qishi === true) return false;
							if (player.$.qishi_date && player.$.qishi_date.includes(Evt.player)) return false;
							return true;
						},
						content() {
							if (!player.$.qishi_date) player.$.qishi_date = [];
							player.$.qishi_date.add(trigger.player);
							player.markSkill('qishi_date');
						},
					},
					update: {
						trigger: { global: 'roundStart' },
						lastDo: true,
						priority: 996,
						direct: true,
						filter(Evt, player) {
							if (player.$.qishi === true) return false;
							return true;
						},
						content() {
							player.unmarkSkill('qishi_date');
						}
					},
				},
				ai: {
					combo: 'huange',
				},
			},
			xiban: {
				trigger: { global: 'phaseEnd' },
				priority: 99,
				frequent: true,
				filter(Evt, player) {
					return Evt.player != player && Evt.player.getHistory('sourceDamage').length && player.hp <= player.$.xhhuanshi.length;
				},
				check(Evt, player) {
					return player.isDamaged() || get.$a(player, Evt.player) < 0;
				},
				logTarget(Evt, player) {
					return Evt.player;
				},
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCardButton(`###『系绊』###可以弃置${get.cnNumber(player.hp)}张「士」 对${get.$t(Evt.target)}发动技能`, player.hp, player.$.xhhuanshi);
				}, () => {
					if (result.bool) {
						Evt.cards = result.links.slice(0);
						player.unmarkAuto('xhhuanshi', Evt.cards);
						player.$throw(Evt.cards, 1000);
						game.cardsGotoOrdering(Evt.cards);
					} else Evt.finish();
				}, () => {
					let next = Evt.target.chooseToDiscard('he', Evt.cards.length);
					if (player.isHealthy()) {
						next.set('forced', true);
					} else {
						next.set('prompt2', `取消则令${get.$t(player)}回复一点体力`)
					}
					next.set('source', player);
					next.set('ai', card => {
						let source = _status.event.source;
						let player = _status.event.player;
						if (source.isDamaged() && get.recoverEffect(source, player, player) >= 0) return -1;
						return 7 - get.value(card);
					});
				}, () => {
					if (!result.bool) {
						player.recover(Evt.target);
					}
				}],
				ai: {
					combo: 'huange',
				},
			},
			yongtuan: {
				audio: true,
				skillAnimation: true,
				animationStr: '一袋米要扛几楼',
				unique: true,
				limited: true,
				zhuSkill: true,
				trigger: { player: 'xibanAfter' },
				priority: 66,
				filter(Evt, player) {
					if (!player.hasZhuSkill('yongtuan')) return false;
					return Evt.cards.length;
				},
				content: [() => {
					let next = player.chooseTarget(true, function (card, player, tar) {
						return tar.group == _status.event.player.group;
					});
					next.set('ai', function (target) {
						return get.$a(_status.event.player, target);
					});
				}, () => {
					if (result.bool) {
						result.targets[0].gain(trigger.cards);
						player.$.yongtuan = true;
						player.awakenSkill('yongtuan');
					}
				}],
				ai: {
					combo: 'huange',
				},
			},

			//冷鸟
			niaoji: {
				audio: true,
				audioname: ['jike'],
				trigger: { source: 'damageEnd', player: 'damageEnd' },
				priority: 99,
				lastDo: true,
				check(Evt, player) {
					if (Evt.source && Evt.source == player) return get.$a(player, Evt.player) < 1;
					return true;
				},
				frequent: true,
				prompt(Evt, player) {
					if (Evt.source && Evt.source == player) return `对${get.$t(Evt.player)}造成伤害，${get.$pro('niaoji')}`;
					return `受到来自${get.$t(Evt.source)}的伤害，${get.$pro('niaoji')}`;
				},
				filter(Evt, player) {
					return Evt.source;
				},
				content: [() => {
					let func: (Object) => number
					Evt.target = (player == trigger.source) ? trigger.player : trigger.source;
					if (!Evt.target || !Evt.target.isIn() || Evt.target.countCards('he') <= 0) {
						func = function (result) {
							if (get.suit(result) == 'spade') return 0;
							if (get.suit(result) == 'heart') return 2;
							return -1;
						};
					} else {
						func = function (result) {
							if (get.suit(result) == 'spade') return 2;
							if (get.suit(result) == 'heart') return 2;
							return -1;
						};
					}
					player.judge(func);
				}, () => {
					if (result.bool) {
						Evt.num = player.getDamagedHp() + 1;
						if (result.suit == 'spade') {
							if ([player.name, player.name1].includes('Yousa')) {
								let audio = 'niaoji_spade' + Math.ceil(3 * Math.random());
								game.playAudio('skill', audio);
								game.broadcast(function (audio) {
									game.playAudio('skill', audio);
								}, audio);
							}
							player.discardPlayerCard(`###『鸟肌』###弃置${get.$t(Evt.target)}${get.cnNumber(Evt.num)}张牌`, Evt.target, Evt.num, true, 'he');
						} else if (result.suit == 'heart') {
							if ([player.name, player.name1].includes('Yousa')) {
								let audio = 'niaoji_heart' + Math.ceil(3 * Math.random());
								game.playAudio('skill', audio);
								game.broadcast(function (audio) {
									game.playAudio('skill', audio);
								}, audio);
							}
							player.draw(Evt.num);
						}
					}
				}],
			},
			ysxiangxing: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				filterTarget(card, player, target) {
					if (player.inRange(target)) return true;
				},
				content: [() => {
					let next = player.chooseCardButton('###『翔星』###按顺序将卡牌置于牌堆顶（先选择的在上）', player.getCards('h'), player.countCards('h'), true);
					next.set('forceAuto', function () {
						return ui.selected.buttons.length == _status.event.player.countCards('h');
					});
					next.set('ai', function (button) {
						if (get.suit(button.link) == 'heart') return 8 + Math.random();
						if (get.suit(button.link) == 'spade') return 6 + Math.random();
						return 4 + Math.random();
					})
				}, () => {
					if (result.bool && result.links?.length) Evt.cards = result.links.slice(0);
					else Evt.finish();
					game.delay();
				}, () => {
					player.lose(Evt.cards, ui.special);
				}, () => {
					let cards = Evt.cards;
					game.log(player, `将${get.cnNumber(cards.length)}张牌放在牌堆顶`);
					while (cards.length > 0) {
						ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				}, () => {
					target.damage(player);
				}],
				ai: {
					order(item, player) {
						if (player.countCards('h', { suit: 'heart' })) return 4;
						else return 1;
					},
					result: {
						player(player, target) {
							let num = -player.countCards('h');
							if (player.countCards('h', { suit: 'heart' })) num += (player.getDamagedHp() + 1);
							return num;
						},
						target(player, target) {
							if (target.hasSkill('shenyou')) return 0;
							return get.damageEffect(target, player, target);
						}
					},
					expose: 0.2,
				},
			},
			//hanser
			naiwei: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return true;
				},
				filterTarget(card, player, target) {
					if (target.isMinHp() || target.isMaxHp()) return true;
				},
				content: [() => {
					Evt.map = ['recover', 'loseHp'];
					if (target.isMinHp() && target.isMaxHp()) {
						player.chooseControl('recover_hp', 'lose_hp', function () {
							if (_status.event.check) return 0;
							return 1;
						}).set('prompt', '令目标执行：').set('check', get.recoverEffect(target, player, player) > 0);
					} else {
						Evt.type = target.isMinHp() ? 0 : 1;
						Evt.goto(2)
					}
				}, () => {
					Evt.type = result.control == 'recover_hp' ? 0 : 1;
				}, () => {
					target[Evt.map[Evt.type]]();
				}, () => {
					if (Evt.type) {
						if (game.countPlayer(cur => {
							return cur.isMinHp;
						}) < 2) return;
					} else {
						if (game.countPlayer(cur => {
							return cur.isMaxHp;
						}) < 2) return;
					}
					player.chooseTarget(function (card, player, target) {
						let change = _status.event.change;
						if (change == 'recover') return target.isMaxHp();
						return target.isMinHp();
					}, function (target) {
						let player = _status.event.player;
						let change = _status.event.change;
						if (change == 'recover') return 1 - get.$a(player, target);
						return get.recoverEffect(target, player, player);
					}).set('prompt', '###『奶味天使』###可以执行另一项').set('change', Evt.map[Evt.type]);
				}, () => {
					if (result.bool && result.targets?.length) {
						player.line(result.targets);
						result.targets[0][[...Evt.map].reverse()[Evt.type]]();
					}
				}],
				ai: {
					order: 6,
					result: {
						target(player, target) {
							let eff0 = get.recoverEffect(target, player, target);
							let eff1 = -2;
							if (target.isMinHp() && target.isMaxHp()) {
								if (get.$a(player, target) > 0) return Math.max(eff0, eff1);
								return Math.min(eff0, eff1);
							}
							if (target.isMinHp()) return eff0;
							return eff1;
						}
					},
					expose: 0.2,
				},
			},
			cishan: {
				trigger: { player: 'phaseDrawBegin1' },
				filter(Evt, player) {
					return !Evt.numFixed && player.countCards('h') > 0;
				},
				check(Evt, player) {
					return player.countCards('h') >= 4;
				},
				content: [() => {
					trigger.changeToZero();
				}, () => {
					player.draw(player.countCards('h'));
					Evt.targets = game.filterPlayer().sortBySeat(player);
				}, () => {
					Evt.target = Evt.targets.shift();
					if (Evt.target.canCompare(player)) {
						Evt.target.chooseBool(`###是否与${get.$t(player)}拼点？###若赢可以获得${get.$t(player)}的一张牌`).set('ai', function () {
							if (!_status.event.check) return 0;
							return 1;
						}).set('check', get.$a(Evt.target, player) < 0);
					} else Evt.goto(5);
				}, () => {
					if (result.bool) {
						Evt.target.line(player);
						Evt.target.chooseToCompare(player);
					} else Evt.goto(5);
				}, () => {
					if (result.bool) {
						if (player.countGainableCards(Evt.target, 'he')) {
							Evt.target.gainPlayerCard(player, true);
						}
					}
				}, () => {
					if (Evt.targets.length) Evt.goto(2);
				}],
			},

			//mishiro
			tianyi: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				mark: true,
				intro: {
					name: '衣',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true,
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return !player.getEquip(2);
				},
				filterCard(card, player) {
					return true;
				},
				check(card) {
					return 7 - get.value(card);
				},
				//		selectTarget:-1,
				//		filterTarget(card,player,target){
				//			return player==target;
				//		},
				discard: false,
				visible: true,
				toStorage: true,
				//		prepare:'give',
				content: [() => {
					player.$give(cards, player, false);
					player.markAuto('tianyi', cards);
					game.log(player, '将', cards, '置于武将牌上');
				}],
				group: ['tianyi_drawBy', 'tianyi_cancelBy', 'tianyi_clear'],
				subSkill: {
					drawBy: {
						trigger: { player: 'useCard', target: 'useCardToTarget' },
						priority: 77,
						lastDo: true,
						forced: true,
						filter(Evt, player) {
							if (get.type2(Evt.card) != 'trick') return false;
							if (player.storage?.tianyi_drawBy?.includes(get.suit(Evt.card))) return false;
							return player.$.tianyi.length && get.suit(player.$.tianyi[0]) != get.suit(Evt.card);
						},
						content() {
							player.draw();
							if (!player.$.tianyi_drawBy) player.$.tianyi_drawBy = [];
							player.$.tianyi_drawBy.add(get.suit(trigger.card));
						}
					},
					cancelBy: {
						trigger: { target: 'useCardToTarget' },
						priority: 77,
						lastDo: true,
						check(Evt, player) {
							return get.effect(player, Evt.card, Evt.player, player) < -1;
						},
						prompt(Evt) {
							return `被${get.$t(Evt.card)}指定为目标，${get.$pro('tianyi')}`;
						},
						filter(Evt, player) {
							if (get.type2(Evt.card) != 'trick') return false;
							return player.$.tianyi.length && get.suit(player.$.tianyi[0]) == get.suit(Evt.card);
						},
						content: [() => {
							player.unmarkSkill('tianyi');
						}, () => {
							trigger.getParent().cancel();
						}, () => {
							player.gain(trigger.getParent().cards, 'giveAuto');
						}]
					},
					clear: {
						trigger: { global: ['gameDrawAfter', 'phaseAfter'], player: ['enterGame', 'phaseZhunbeiBegin'] },
						direct: true,
						firstDo: true,
						content: [() => {
							if (trigger.name == 'phase') {
								delete player.$.tianyi_drawBy;
								Evt.finish();
							} else if (trigger.name == 'phaseZhunbei' && player.$.tianyi.length) {
								Evt.moveCard = true;
							}
						}, () => {
							player.unmarkSkill('tianyi');
						}, () => {
							if (Evt.moveCard == true) {
								player.moveCard(`###${get.$pro('tianyi')}###可以移动场上的一张牌`);
							}
						}]
					},
				},
				ai: { order: 4, result: { player: 1 } },
			},
			nveyu: {
				trigger: { source: 'damageEnd' },
				priority: 77,
				usable: 1,
				lastDo: true,
				forced: true,
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					trigger.player.recover();
				}, () => {
					game.asyncDraw([player, trigger.player]);
				}, () => {
					player.$.nveyu_eff = trigger.player;
					player.addTempSkill('nveyu_eff');
				}],
				subSkill: {
					eff: {
						mark: 'character',
						intro: {
							name: '虐语',
							content: '对$使用牌无距离与次数限制',
						},
						mod: {
							targetInRange(card, player, target) {
								if (target == player.$.nveyu_eff) return true;
							},
							cardUsableTarget(card, player, target) {
								if (player.$.nveyu_eff == target) return true;
							},
						},
						onremove: true,
					}
				},
				ai: {
					effect: {
						player(card, player, target, current) {
							if (get.tag(card, 'damage') == 1 && !target) console.warn(card, target)
							if (target) {
								if (get.tag(card, 'damage') == 1 && !player.hasSkill('nveyu_eff') && !target.hujia && target.hp > 1) {
									if (target.hasSkillTag('maixie')) return [1, 1, 0, 3];
									return [1, 1, 0, 1];
								}
							}
						}
					}
				}
			},
			//tm
			gonggan: {
				trigger: { global: 'phaseBegin' },
				priority: 23,
				direct: true,
				filter(Evt, player) {
					return Evt.player != player && player.countCards('h') > 0;
				},
				content: [() => {
					player.chooseCard('h', get.$pro2('gonggan')).set('ai', card => {
						if (get.number(card) > 10) return 8 - get.value(card) + Math.random();
						if (player.countCards('h') >= 3) return 5 - get.value(card) + Math.random();
						if (player.countCards('h') == 1) return -get.value(card) + Math.random();
						return 2 - get.value(card) + Math.random();
					});
				}, () => {
					if (result.bool) {
						player.logSkill('gonggan', trigger.player);
						Evt.card = result.cards[0];
						player.showHandcards('『奇癖共感』展示手牌');
						game.delay(1);
					} else {
						Evt.finish();
					}
				}, () => {
					let suitlist = [
						['heart', '', 'heart', 'heart', 'div2'],
						['diamond', '', 'diamond', 'diamond', 'div2'],
						['club', '', 'club', 'club', 'div2'],
						['spade', '', 'spade', 'spade', 'div2']
					];
					game.broadcastAll(function (id, suitlist) {
						let dialog = ui.create.dialog('奇癖共感 声明');
						dialog.addText('花色');
						dialog.add([suitlist, 'vcard']);
						dialog.videoId = id;
					}, Evt.videoId, suitlist);
				}, () => {
					let next = trigger.player.chooseButton(1, true);
					next.set('dialog', Evt.videoId);
					next.set('ai', function (button) {
						let num = 0
						_status.event.cards.forEach(card => {
							if (get.suit(card) == button.link[2]) num++;
						})
						return num + Math.random();
					});
					next.set('cards', player.getCards('h'));
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						player.$.gonggan = result.links[0][2];
						trigger.player.chat(get.$t(player.$.gonggan));
						game.log(trigger.player, '猜测为', player.$.gonggan)
					} else {
						Evt.finish();
					}
				}, () => {
					if (player.$.gonggan == get.suit(Evt.card)) {
						trigger.player.gain(Evt.card, player, 'giveAuto');
						let suit = 'gonggan_' + get.suit(Evt.card);
						player.$.gonggan_num = get.number(Evt.card);
						player.addTempSkill(suit);
					} else {
						player.$.gonggan_num = 12;
					}
					lib.translate['gonggan_num_bg'] = player.$.gonggan_num;
					player.addTempSkill('gonggan_num');
				}],
				subSkill: {
					heart: {
						marktext: '♥',
						mark: true,
						locked: true,
						intro: {
							name: '奇癖共感',
							content: '手牌视为♥',
						},
						mod: {
							suit(card, suit) {
								if (suit != 'heart') return 'heart';
							},
						}
					},
					spade: {
						marktext: '♠',
						mark: true,
						locked: true,
						intro: {
							name: '奇癖共感',
							content: '手牌视为♠',
						},
						mod: {
							suit(card, suit) {
								if (suit != 'spade') return 'spade';
							},
						}
					},
					diamond: {
						marktext: '♦',
						mark: true,
						locked: true,
						intro: {
							name: '奇癖共感',
							content: '手牌视为♦',
						},
						mod: {
							suit(card, suit) {
								if (suit != 'diamond') return 'diamond';
							},
						}
					},
					club: {
						marktext: '♣',
						mark: true,
						locked: true,
						intro: {
							name: '奇癖共感',
							content: '手牌视为♣',
						},
						mod: {
							suit(card, suit) {
								if (suit != 'club') return 'club';
							},
						}
					},
					num: {
						mark: true,
						locked: true,
						intro: {
							name: '奇癖共感',
							content: '手牌视为#',
						},
						onremove: true,
						mod: {
							number(card, player, number) {
								return number = player.$.gonggan_num;
							},
						},
					},
				},
			},
			yeyu: {
				group: ['yeyu_sha', 'yeyu_trick'],
				subSkill: {
					sha: {
						trigger: { global: 'useCard2' },
						priority: 23,
						popup: false,
						filter(Evt, player) {
							if (Evt.player == player || get.name(Evt.card) != 'sha') return false;
							return (get.name(Evt.card) == 'sha') && player.countDiscardableCards(player, 'he');
						},
						prompt2: '你可以弃置一张点数大于此【杀】的牌取消之',
						content: [() => {
							let next = player.chooseToDiscard('he', '弃置一张点数大于此【杀】的牌取消之');
							next.set('filterCard', function (card, player) {
								return get.number(card, player) > _status.event.num;
							});
							next.set('num', get.number(trigger.card))
						}, () => {
							if (result.bool) {
								player.logSkill('yeyu', trigger.player);
								trigger.cancel();
							}
						}],
					},
					trick: {
						trigger: { global: 'useCard2' },
						priority: 23,
						popup: false,
						filter(Evt, player) {
							let card = Evt.card;
							let info = get.info(card);
							if (info.allowMultiple == false) return false;
							if (Evt.player == player || get.type(Evt.card) != 'trick') return false;
							return Evt?.targets?.length && player.countCards('h', { suit: 'club' });
						},
						prompt2: '你可以重铸一张梅花牌为之增加或减少一名目标',
						content: [() => {
							let next = player.chooseCard('he', '重铸一张梅花牌');
							next.set('filterCard', function (card, player) {
								return get.suit(card, player) == 'club';
							});
						}, () => {
							if (result.bool) {
								player.logSkill('yeyu');
								player.lose(result.cards, ui.discardPile).set('visible', true);
								player.$throw(result.cards);
								game.log(player, '将', result.cards, '置入了弃牌堆');
								player.draw();
								let prompt2 = `为${get.$t(trigger.card)}增加或减少一个目标`;
								player.chooseTarget(get.$pro('yeyu'), true, function (card, player, target) {
									let source = _status.event.source;
									if (_status.event.targets.includes(target)) return true;
									return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
								}).set('prompt2', prompt2).set('ai', function (target) {
									let player = _status.event.player, source = _status.event.source;
									return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
								}).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
							} else {
								Evt.finish();
							}
						}, () => {
							if (!Evt.isMine()) game.delayx();
							Evt.targets = result.targets;
						}, () => {
							if (Evt.targets) {
								player.logSkill('yeyu', Evt.targets);
								if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
								else trigger.targets.addArray(Evt.targets);
							}
						}],
					},
				},
			},
			//花那
			huawen: {
				audio: 2,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				filterTarget(card, player, target) {
					return target != player && target.countCards('h') > 0 && target.sex == 'female';
				},
				content: [() => {
					player.$.huawen.add(target);
					Evt.list1 = player.getCards('h');
					Evt.list2 = target.getCards('h');
					game.broadcastAll(function (id, list1, list2, player, target) {
						let dialog = ui.create.dialog('『花吻交染』交换花色、点数、种类相同的牌各一张');
						dialog.addText(`${get.$t(player)}的手牌`);
						dialog.add([list1, 'card']);
						dialog.addText(`${get.$t(target)}的手牌`);
						dialog.add([list2, 'card']);
						dialog.videoId = id;
					}, Evt.videoId, Evt.list1, Evt.list2, player, target);
					game.delay(1);
				}, () => {
					let next = player.chooseButton(true).set('target', target).set('list1', Evt.list1).set('list2', Evt.list2);
					next.set('dialog', Evt.videoId);
					next.set('selectButton', function () {
						if (ui.selected.buttons.length % 2 == 1) {
							return [ui.selected.buttons.length + 1, ui.selected.buttons.length + 1];
						}
						return [0, 6];
					});
					next.set('filterButton', function (button) {
						let now = button.link;
						let links = ui.selected.buttons.map(function (button) {
							return button.link;
						})
						return _status.event.process(links, now);
					});
					next.set('switchToAuto', function () {
						_status.event.result = 'ai';
					}).set('processAI', function () {
						let player = _status.event.player;
						let target = _status.event.target;
						let list1 = _status.event.list1.slice(0);
						let list2 = _status.event.list2.slice(0);
						let cards = list1.concat(list2);
						let links = [];
						if (get.$a(player, target) < 0) {
							let saves = list2.filter(card => ['tao', 'jiu', 'zong'].includes(get.name(card)))
							if (target.hp == 1 || player.hp == 1 || saves.length) {
								let dones = [];
								saves.forEach(function (save) {
									list1.forEach(card => {
										if (_status.event.process([save], card)) {
											dones.add(save);
											dones.add(card);
										}
									})
								})
								links.addArray(dones.splice(0, 2));
							}
						} else {
							let dones = [];
							for (let i = 0; i < list1.length; i++) {
								let done = [list1[i]];
								let choices = cards.slice(0).remove(list1[i]);
								for (let j = 0; j < choices.length; j++) {
									if (done.length == 6) break;
									if (_status.event.process(done, choices[j])) {
										done.push(choices[j]);
										choices.remove(choices[j]);
										j = 0;
									}
								}
								if (done.length % 2 == 1) done.pop();
								dones.push(done);
							}
							if (dones.length > 0) {
								dones.sort(function (a, b) {
									return b.length - a.length;
								});
								links.addArray(dones[0]);
							}
						}
						return {
							bool: true,
							links: links,
						}
					});
					next.set('process', function (selected, now) {
						let last = selected.slice(0);
						let over = {
							type2: 0,
							suit: 0,
							number: 0
						};
						let going = [];
						let overOne = 0;
						let pack = 0;
						if (last.length % 2 == 1) {
							pack = selected[selected.length - 1];
						}
						for (let i = 0; i < last.length; i += 2) {
							if (!last[i + 1]) continue;
							let go = [];
							for (let j in over) {
								if (get[j](last[i]) == get[j](last[i + 1])) {
									go.add(j);
								}
							}
							if (!go.length) continue;
							for (let j = 0; j < go.length; j++) {
								going.add(go[j]);
								over[go[j]] += (1 / go.length);
							}
						}
						let list1 = _status.event.list1;
						let list2 = _status.event.list2;
						for (let j in over) {
							overOne = Math.max(over[j] - 1, overOne);
						}
						if (!pack) {
							if (list1.includes(now)) {
								for (let i = 0; i < list2.length; i++) {
									for (let j in over) {
										if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
										if (get[j](list2[i]) == get[j](now)) {
											return true;
										}
									}
								}
							}
							if (list2.includes(now)) {
								for (let i = 0; i < list1.length; i++) {
									for (let j in over) {
										if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
										if (get[j](list1[i]) == get[j](now)) {
											return true;
										}
									}
								}
							}
						} else {
							if (list1.includes(pack)) {
								if (!list2.includes(now)) return false;
								for (let j in over) {
									if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
									if (get[j](pack) == get[j](now)) {
										return true;
									}
								}
							}
							if (list2.includes(pack)) {
								if (!list1.includes(now)) return false;
								for (let j in over) {
									if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
									if (get[j](pack) == get[j](now)) {
										return true;
									}
								}
							}
						}
						return false;
					});
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool && result.links) {
						let cards1 = result.links.slice(0), cards2 = result.links.slice(0);
						cards1 = cards1.filter(card => Evt.list1.includes(card))
						cards2 = cards2.filter(card => Evt.list2.includes(card))
						if (cards1.length && cards2.length && cards1.length == cards2.length) {
							Evt.num = cards1.length;
							player.gain(cards2, target, 'giveAuto').set('visible', true);
							target.gain(cards1, player, 'giveAuto').set('visible', true);
							game.asyncDraw([player, target], Evt.num)
						}
						if (!Evt.num || Evt.num < 3) {
							player.loseHp();
							target.loseHp();
						}
					} else {
						Evt.finish();
					}
				}],
				group: 'huawen_clear',
				ai: {
					order: 8.5,
					result: {
						target(player, target) {
							if (target.countCards('h') >= 3) {
								return 2;
							} else if (target.countCards('h') >= 1) {
								return 0;
							} else if (target.hp == 1) {
								return -2;
							} else {
								return -1;
							}
						},
						player(player, target) {
							if (player.countCards('h') >= 3) {
								return 2;
							} else if (player.countCards('h') >= 1) {
								return 0;
							} else if (player.hp == 1) {
								return -1;
							} else {
								return -0.5;
							}
						},
					}
				},
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 23,
						forced: true,
						silent: true,
						popup: false,
						content() {
							if (player.storage?.huawen?.length) {
								player.$.huawen.length = 0;
							}
						}
					}
				},
			},
			liaohu: {
				audio: 2,
				trigger: { global: 'phaseEnd' },
				priority: 23,
				filter(Evt, player) {
					return player.getStat('damage');
				},
				check(Evt, player) {
					return get.recoverEffect((player.storage?.huawen?.length ? player.$.huawen[0] : player), player, player) > 0;
				},
				content() {
					if (player.getStat().skill.huawen != undefined) {
						if (player.storage?.huawen?.length) {
							player.$.huawen[0].recover();
						}
					} else {
						player.recover();
					}
				},
			},
			//elu
			huangran: {
				trigger: { player: 'damageBegin4' },
				priority: 99,
				filter(Evt, player) {
					return Evt.num >= 2 && Evt.nature == 'fire' && game.hasPlayer(cur => {
						return cur != player && get.$dis(player, cur) <= 1;
					});
				},
				content: [() => {
					player.chooseTarget('###『煌燃』###选择一名角色与自己平摊伤害', function (card, player, target) {
						return target != player && get.$dis(player, target) <= 1;
					}).set('ai', function (target) {
						return 1 - get.$a(player, target) + Math.random();
					});
				}, () => {
					if (result.bool) {
						if (trigger.num % 2 == 0) {
							trigger.num /= 2;
							result.targets[0].damage(trigger.num, trigger.source, 'fire');
							Evt.finish();
						} else {
							trigger.num--;
							trigger.num /= 2;
							result.targets[0].damage(trigger.num, trigger.source, 'fire');
							player.chooseTarget(true, '###『煌燃』###分配多余的一点伤害').set('ai', function (target) {
								return 1 - get.$a(player, target) < 0 + Math.random();
							});
						}
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						result.targets[0].damage(1, trigger.source, 'fire');
					}
				}],
				group: 'huangran_drawBy',
				subSkill: {
					drawBy: {
						trigger: { global: 'damageEnd' },
						priority: 99,
						forced: true,
						filter(Evt, player) {
							if (Evt.player.hasSkill('huangran_shao')) return false;
							return Evt.nature == 'fire' && Evt.getParent().name == 'huangran';
						},
						content() {
							player.draw();
							trigger.player.addTempSkill('huangran_shao', 'huangranAfter');
						},
					},
					shao: {},
				}
			},
			yinzhen: {
				group: ['yinzhen_fire', 'yinzhen_includes', 'yinzhen_getC'],
				subSkill: {
					fire: {
						trigger: { global: 'damageBegin1' },
						priority: 999,
						usable: 1,
						forced: true,
						/*		filter(Evt,player){
									return player!=Evt.source;
								},*/
						content() {
							trigger.nature = 'fire';
						},
					},
					includes: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { global: 'phaseBefore' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.yinzhen_includes.length = 0;
							game.hasPlayer(cur => {
								if (cur != player) {
									player.$.yinzhen_includes.push(cur);
									player.$.yinzhen_includes.push(get.$dis(cur, player));
								}
							})
						},
					},
					getC: {
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							for (let i = 0; i < (player.$.yinzhen_includes.length); i += 2) {
								if (get.$dis(player.$.yinzhen_includes[i], player) < player.$.yinzhen_includes[i + 1]) {
									player.logSkill('yinzhen', player.$.yinzhen_includes[i]);
									player.gainPlayerCard('h', player.$.yinzhen_includes[i], true).set('visible', true);
								}
							}
						},
					},

				},
			},
			senhu: {
				group: 'senhu_tengjia2',
				//	group:['senhu_tengjia1','senhu_tengjia2','senhu_tengjia3'],
				locked: true,
				ai: {
					effect: {
						target(card, player, target) {
							if (player == target && get.subtype(card) == 'equip2') {
								if (get.equipValue(card) <= 7.5) return 0;
							}
							if (!target.isEmpty(2)) return;
							return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
						}
					}
				},
				subSkill: {
					tengjia1: {
						equipSkill: true,
						noHidden: true,
						inherit: 'tengjia1',
						filter(Evt, player) {
							if (!player.isEmpty(2)) return false;
							return true;
						},
					},
					tengjia2: {
						equipSkill: true,
						noHidden: true,
						inherit: 'tengjia2',
						filter(Evt, player) {
							if (!player.isEmpty(2)) return false;
							return Evt.nature == 'fire';
						},
					},
					tengjia3: {
						equipSkill: true,
						noHidden: true,
						inherit: 'tengjia3',
						filter(Evt, player) {
							if (!player.isEmpty(2)) return false;
							return true;
						},
					},
				}
			},
			//ssk
			tiaolian: {
				trigger: { player: 'useCardToPlayer', target: 'useCardToTarget' },
				usable: 1,
				clickChange: '休眠',
				clickable(player) {
					if (player.$.tiaolian_clickChange === undefined) player.$.tiaolian_clickChange = false;
					else player.$.tiaolian_clickChange = !player.$.tiaolian_clickChange;
				},
				clickableFilter(player) {
					return player.$.tiaolian_clickChange !== false;
				},
				filter(Evt, player) {
					if (player.$.tiaolian_clickChange === false) return false;
					if (Evt.player == player && !Evt.targets.filter(cur => {
						return player.canCompare(cur);
					}).length) return false;
					if (Evt.player != player && !player.canCompare(Evt.player)) return false;
					return player.countCards('h') > 0;
				},
				check(Evt, player) {
					if (Evt.player == player && Evt.targets.filter(cur => {
						return player.canCompare(cur) && get.$a(player, cur) < 1;
					})) return 1;
					if (Evt.player != player) return get.$a(player, Evt.player) < 1;
				},
				content: [() => {
					if (trigger.targets.includes(player) && trigger.player != player) {
						player.chooseToCompare(trigger.player);
					}
				}, () => {
					if (trigger.targets.includes(player) && trigger.player != player) {
						if (result.bool) {
							trigger.getParent().targets.remove(player);
							game.log(trigger.card, '不会对', player, '生效');
							if (trigger.getParent().targets.length == 0) trigger.getParent().cancel();
						} else {
							trigger.getParent().directHit.add(player);
							game.log(player, '不能响应', trigger.getParent().card);
						}
						Evt.finish();
					}
				}, () => {
					Evt.targets = trigger.targets;
					let next = player.chooseTarget('###『咆咲』###选择拼点的对象', true);
					next.set('filterTarget', function (card, player, target) {
						return player.canCompare(target) && _status.event.targets.includes(target);
					})
					next.set('ai', function (target) {
						return 7 - get.$a2(target);
					})
					next.set('selectTarget', [1, Infinity]);
					next.set('multitarget', true);
					next.set('multiline', true)
					next.set('targets', Evt.targets);
				}, () => {
					if (result.bool && result.targets?.length) {
						player.chooseToCompare(result.targets).callback = lib.skill.tiaolian.callback;
					}
				}],
				//	chat:['粗鄙之语','天地不容','谄谀之臣','皓首匹夫，苍髯老贼','二臣贼子','断脊之犬','我从未见过有如此厚颜无耻之人！'],
				callback() {
					if (Evt.num1 <= Evt.num2) {
						//			target.chat(lib.skill.tiaolian.chat[Math.floor(Math.random()*5)]);
						Evt.getParent().getTrigger().excluded.add(target);
						game.log(Evt.getParent().getTrigger().card, '不会对', target, '生效');
						game.delay();
					} else {
						Evt.getParent().getTrigger().directHit.add(target);
						game.log(target, '不能响应', Evt.getParent().getTrigger().card);
						game.delay();
					}
				},
			},
			jiaku: {
				trigger: { player: ['chooseToCompareAfter', 'compareMultipleAfter'], target: ['chooseToCompareAfter', 'compareMultipleAfter'] },
				forced: true,
				filter(Evt, player) {
					return !Evt.iwhile;
				},
				content() {
					if (player == trigger.player) {
						if (trigger.num1 > trigger.num2) {
							player.gainPlayerCard('###『生笹』###获得对方的一张牌', trigger.target, true);
						} else {
							player.draw();
						}
					} else {
						if (trigger.num2 > trigger.num1) {
							player.gainPlayerCard('###『生笹』###获得对方的一张牌', trigger.player, true);
						} else {
							player.draw();
						}
					}
				},
			},
			//lize
			shencha: {
				trigger: { player: 'phaseZhunbeiBegin' },
				filter(Evt, player) {
					return true;
				},
				check(Evt, player) {
					return player.countCards('j') > 0;
				},
				content: [() => {
					Evt.num = 3 + player.countCards('j');
					Evt.getE = (player.countCards('e') == 0);
				}, () => {
					Evt.cards = get.cards(Evt.num)
				}, () => {
					let prompt2 = '获得其中至多两张基础牌';
					let selectButton = [0, 2]
					if (Evt.getE) {
						prompt2 += ',装备其中至多两张装备牌';
						selectButton[1] += 2;
					}
					let next = player.chooseCardButton(Evt.cards, '###『审查』###' + prompt2);
					next.set('selectButton', selectButton)
					next.set('filterButton', function (button) {
						let type = get.type2(button.link);
						let geting = [0, 0]
						for (let i = 0; i < ui.selected.buttons.length; i++) {
							if (get.type2(ui.selected.buttons[i].link) == 'basic') geting[0]++;
							if (get.type2(ui.selected.buttons[i].link) == 'equip') geting[1]++;
						}
						return (type == 'basic' && geting[0] < 2) || (_status.event.getE && type == 'equip' && geting[1] < 2);
					});
					next.set('getE', Evt.getE)
					next.set('ai', function (button) {
						return get.value(button.link, _status.event.player) + Math.random();
					});
				}, () => {
					if (result.bool && result.links?.length) {
						let cards = result.links.slice(0);
						Evt.cards.removeArray(cards);
						let basics = cards.filter(card => get.type(card) == 'basic');
						let equips = cards.filter(card => get.type(card) == 'equip');
						player.gain(basics, 'gain2');
						equips.forEach(function (equip) {
							player.equip(equip);
						});
					}
				}, () => {
					player.skip('phaseDraw');
					if (Evt.cards.length == 0) Evt.finish();
					if (Evt.cards.length == 1) Evt.goto(7);
				}, () => {
					player.chooseCardButton('###『权力审查』###请选择置于牌堆底的顺序（先选择的在下）', Evt.cards, Evt.cards.length, true);
				}, () => {
					Evt.cards = result.links.slice(0);
				}, () => {
					let cards = Evt.cards;
					game.log(player, `将${get.cnNumber(cards.length)}张牌置于牌堆底`);
					while (cards.length) {
						ui.cardPile.appendChild(cards.pop().fix());
					}
					game.updateRoundNumber();
				}],
			},
			helesta: {
				audio: 'yubing',
				trigger: { player: 'damageBegin3' },
				direct: true,
				filter(Evt, player) {
					return Evt.num && player.countDiscardableCards(player, 'e');
				},
				content: [() => {
					player.discardPlayerCard(`###${get.$pro('helesta')}###可以弃置装备区的一张牌使伤害-1`, player, 'e').set('ai', function () {
						if (player.isDamaged() || player.countCards('e') == 1) return 5 + Math.random();
						return Math.random() - 0.2;
					});
				}, () => {
					if (result.bool) {
						trigger.num--;
					};
				}],
				ai: {
					noe: true,
					reverseEquip: true,
					effect: {
						target(card, player, target, current) {
							if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
						}
					}
				},
				// mod:{
				// 	aiValue(player,card,num){
				// 		if(game.roundNumber>1&&get.type(card)=='equip'&&!get.cardtag(card,'gifts')){
				// 			if(get.position(card)=='e') return num/player.hp;
				// 			return num*player.hp;
				// 		}
				// 	},
				// },
				group: 'helesta_iceshaBy',
				subSkill: {
					iceshaBy: {
						trigger: {
							player: 'loseAfter',
							global: ['equipAfter', 'addJudgeAfter', 'gainAfter'],
						},
						filter(Evt, player) {
							let evt = Evt.getl(player);
							return evt?.es?.length > 0 && player.hasUseTarget({ name: 'sha', nature: 'ice', isCard: true });
						},
						direct: true,
						content: [() => {
							player.chooseUseTarget(`###${get.$pro('helesta')}###视为使用一张冰【杀】并摸一张牌`, { name: 'sha', nature: 'ice', isCard: true }, false);
						}, () => {
							if (result.targets?.length) {
								player.logSkill('helesta');
								player.draw();
							}
						}],
					}
				},
			},
			//ange
			chuangzuo: {},
			//露露
			zhongli: {
				audio: 3,
				audioname: ['jike'],
				mark: true,
				intro: {
					name: '本回合因『重力牵引』获得的牌',
					content: 'cards',
					onunmark(storage, player) {
						if (storage && storage.length) {
							storage.length = 0;
						}
					},
				},
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { player: 'phaseUseAfter' },
				priority: 99,
				lastDo: true,
				forced: true,
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					let func = function (result) {
						if (get.type(result) == 'equip') return 2;
						return 0;
					};
					player.judge(func).callback = lib.skill.zhongli.callback;
				}, () => {
					if (result.judge > 0) {
						if (!Evt.cards) Evt.cards = [];
						Evt.cards.add(result.card);
						Evt.goto(0);
					}
				}, () => {
					if (Evt.cards && Evt.cards.length) {
						for (let i = 0; i < Evt.cards.length; i++) {
							if (!player.$.zhongli.includes(Evt.cards[i])) {
								Evt.newPhaseUse = true;
							}
						}
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.newPhaseUse) {
						player.markAuto('zhongli', Evt.cards);
						if (player.maxHp > 1) player.loseMaxHp();
						player.phaseUse();
					}
				}, () => {
					let stat = player.getStat();
					for (let i in stat.skill) {
						let bool = false;
						let info = lib.skill[i];
						if (info.enable != undefined) {
							if (typeof info.enable == 'string' && info.enable == 'phaseUse') bool = true;
							else if (typeof info.enable == 'object' && info.enable.includes('phaseUse')) bool = true;
						}
						if (bool) stat.skill[i] = 0;
					}
				}],
				callback() {
					if (get.type(Evt.judgeResult.name) == 'equip') {
						player.gain(card, 'gain2');
						// Evt.judgeResult.judge = 2;
					}
				},
				group: 'zhongli_clear',
				subSkill: {
					clear: {
						trigger: { global: 'gameDrawAfter', player: ['enterGame', 'phaseAfter'] },
						direct: true,
						lastDo: true,
						priority: 666,
						content() {
							player.unmarkSkill('zhongli');
						}
					},
				}
			},
			xinhuo: {
				audio: 2,
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.countCards('he') >= 2;
				},
				filterCard: true,
				position: 'he',
				selectCard: 2,
				check(card) {
					let player = _status.event.player
					if (get.type(card) == 'equip') {
						if (typeof get.info(card).onLose == 'function') return 9 + Math.random();
						else return 7 + Math.random();
					}
					if (get.name(card) == 'sha' && player.countCards('h', { name: 'sha' }) == 1) return 0;
					return 7 - get.value(card) / 2;
				},
				discard: false,
				toStorage: true,
				content: [() => {
					let next = player.chooseCardButton('###『薪火相传』###按顺序将卡牌置于牌堆顶（先选择的在上）', cards, 2, true);
					next.set('forceAuto', function () {
						return ui.selected.buttons.length == 2;
					});
					next.set('ai', function (button) {
						if (get.type(button.link) == 'equip') {
							if (typeof get.info(button.link).onLose == 'function') return 10 + Math.random();
							else return 7 + Math.random();
						}
						if (get.name(button.link) == 'sha' && player.countCards('h', { name: 'sha' }) == 1) return 0;
						return 7 - get.value(button.link) / 2 + Math.random();
					});
				}, () => {
					if (result.bool && result.links?.length) cards = result.links.slice(0);
				}, () => {
					game.log(Evt.target, `将${get.cnNumber(cards.length)}张牌放在牌堆顶`);
					while (cards.length > 0) {
						ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				}, () => {
					if (player.hasSkill('xinhuo_chuanhuo')) {
						player.$.xinhuo_chuanhuo++;
						player.updateMarks();
					} else {
						player.addTempSkill('xinhuo_chuanhuo');
						player.$.xinhuo_chuanhuo = 1;
						let buff = '.player_buff';
						game.broadcastAll(function (player, buff) {
							player.node.xinhuo = ui.create.div(buff, player.node.avatar);
						}, player, buff);
					}
				}],
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player == _status.currentPhase && get.type2(card) == 'trick' && get.info(card).notarget !== true && !player.needsToDiscard()) {
							let evt = player.getStat().card;
							for (let i in evt) {
								if (evt[i] && get.type2(evt[i]) == 'trick') {
									return num - 7;
								}
							}
						}
					},
				},
				ai: {
					order(item, player) {
						let cards = Object.entries(player.getStat().card);
						for (let i = 0; i < cards.length; i++) {
							if (get.type(cards[i][0]) == 'basic') {
								if (player.hasSha() && player.countCards('he') >= 3 && (!player.$.xinhuo_chuanhuo || player.$.xinhuo_chuanhuo < 2)) {
									return 7.1;
								}
							}
						}
						return 0;
					},
					result: { player: 1 },
				},
				subSkill: {
					chuanhuo: {
						audio: 3,
						trigger: { player: 'useCard' },
						forced: true,
						onremove(player) {
							if (player.node.xinhuo) {
								player.node.xinhuo.delete();
								delete player.node.xinhuo;
							}
							player.unmarkSkill('xinhuo_chuanhuo');
							delete player.$.xinhuo_chuanhuo;
						},
						mod: {
							selectTarget(card, player, range) {
								if (range[1] == -1) return;
								range[1] += player.$.xinhuo_chuanhuo;
							},
							cardUsable(card, player, num) {
								return true;
							},
							targetInRange(card, player, target, now) {
								return true;
							},
						},
						content() {
							player.removeSkill('xinhuo_chuanhuo');
						},
						mark: true,
						intro: {
							content: '下一张使用的牌无距离和次数限制且可额外指定$名目标',
							markcount(storage, player) {
								return player.$.xinhuo_chuanhuo;
							}
						},
						ai: {
							useSha: 1,
						}
					},
				},
			},
			weizhuang: {
				audio: 2,
				trigger: { player: 'useCardAfter' },
				locked: true,
				direct: true,
				lastDo: true,
				filter(Evt, player) {
					return (get.type2(Evt.card) == 'trick' || get.type2(Evt.card) == 'basic') && Evt.targets.length > 0;
				},
				content: [() => {
					if (!player.hasMark('weizhuang')) {
						player.markSkill('weizhuang');
					}
				}, () => {
					if (get.type2(trigger.card) == 'basic' && player.getHistory('useCard', evt => {
						return get.type2(evt.card) == 'basic';
					}).length > 1) {
						player.logSkill('weizhuang');
						player.draw(trigger.targets.length);
					} else if (get.type2(trigger.card) == 'trick' && player.getHistory('useCard', evt => {
						return get.type2(evt.card) == 'trick';
					}).length > 1) {
						player.logSkill('weizhuang_discard');
						player.chooseToDiscard(trigger.targets.length, 'he', true)
					}
				}],
				mark: true,
				intro: {
					content: '使用基本牌/锦囊牌指定目标时，摸/弃X张牌（X为此牌指定的目标数）',
				},
				group: ['weizhuang_clear'],
				subSkill: {
					discard: {},
					clear: {
						trigger: { global: 'gameDrawAfter', player: ['enterGame', 'phaseAfter'] },
						direct: true,
						firstDo: true,
						priority: 666,
						content() {
							player.unmarkSkill('weizhuang');
						}
					},
				},
			},
			//社长
			liebo: {
				trigger: { player: 'useCardBefore' },
				filter(Evt, player) {
					return get.color(Evt.card, player) == 'black';
				},
				priority: 12,
				forced: true,
				content() {
					if (!trigger.directHit) trigger.directHit = [];
					trigger.directHit.addArray(game.players);
				},
				ai: {
					threaten: 1.5,
					effect: {
						player(card, player, target, current) {
							if (get.color(card) == 'black' && get.tag(card, 'damage')) {
								if (player.countDiscardableCards(target, 'e')) return [1, -0.5, 1, -1];
								return [1, 1, 1, -1];
							}
						}
					}
				},
				group: 'liebo_drawBy',
				subSkill: {
					drawBy: {
						trigger: { source: 'damage' },
						filter(Evt, player) {
							let evt = Evt.getParent();
							if (evt.name == '_lianhuan') evt = Evt.getTrigger().getParent(2);
							else evt = evt.getParent();
							if (evt.addedSkill && evt.addedSkill.includes('liebo')) return false;
							return get.color(Evt.card, player) == 'black';
						},
						priority: 12,
						forced: true,
						logTarget: 'player',
						content: [() => {
							let evt = trigger.getParent();
							if (evt.name == '_lianhuan') evt = trigger.getTrigger().getParent(2);
							else evt = evt.getParent();
							evt.addedSkill ||= [];
							evt.addedSkill.add('liebo');
							player.draw();
						}, () => {
							if (player.countCards('e')) {
								Evt.target = trigger.player
								Evt.target.discardPlayerCard('e', player, true);
							}
						}],
					},
				},
			},
			zhongjizhimeng: {
				audio: true,
				audioname: ['jike'],
				enable: 'phaseUse',
				usable: 1,
				filterCard: true,
				position: 'he',
				check(card) {
					return 8 - get.value(card);
				},
				content: [() => {
					let next = player.chooseCard('h', true, '『重机织梦』：展示一张手牌');
					next.set('ai', card => {
						let player = _status.event.player;
						if (get.suit(card) == 'red' && player.hasUseTarget(card)) return 5 + get.order(card);
						if (player.hasUseTarget(card)) return 2 + get.order(card);
						return 6 - get.value(card);
					})
				}, () => {
					if (result.bool) {
						Evt.cards = result.cards;
						player.showCards(Evt.cards, '『重机织梦』展示手牌');
						player.addGaintag(Evt.cards, 'zhongjizhimeng')
					} else {
						Evt.finish();
					}
				}],
				mod: {
					color(card, player, color) {
						if (!card.cards || card.cards.length != 1) return;
						for (let i of card.cards) {
							if (i.hasGaintag('zhongjizhimeng')) {
								if (color == 'red') return 'black';
								else if (color == 'black') return 'red';
							}
						}
					},
				},
				ai: {
					order: 10,
					player(player, target) {
						if (player.countCards('h') >= 2) {
							return 2;
						}
						else return 0
					},
				},
				group: ['zhongjizhimeng_lose'],
				subSkill: {
					lose: {
						trigger: { player: 'loseAfter' },
						filter(Evt, player) {
							for (let i in Evt.gaintag_map) {
								if (Evt.gaintag_map[i].includes('zhongjizhimeng')) return true;
							}
						},
						direct: true,
						content: [() => {
							player.chooseTarget(`###${get.$pro('zhongjizhimeng')}###令一名角色回复1点体力或摸两张牌`).set('ai', function (target) {
								return get.$a(_status.event.player, target);
							});
						}, () => {
							if (result.bool) {
								Evt.target = result.targets[0]
								Evt.target.classList.add('glow');
							} else {
								Evt.finish();
							}
						}, () => {
							let controls = ['摸两张牌', '回复一点体力', '取消选择'];
							player.chooseControl(controls).set('ai', function () {
								return _status.event.index;
							}).set('index', 0);
						}, () => {
							Evt.target.classList.remove('glow');
							switch (result.index) {
								case 0: {
									player.logSkill('zhongjizhimeng', Evt.target);
									Evt.target.draw(2);
									break;
								}
								case 1: {
									player.logSkill('zhongjizhimeng', Evt.target);
									Evt.target.recover(player);
									break;
								}
								case 2: {
									Evt.goto(0);
									break;
								}
							}
						}]
					}
				},
			},
			//阿喵喵
			miaomiao: {
				trigger: { source: 'damageBegin3' },
				priority: 3,
				direct: true,
				filter(Evt, player) {
					return Evt.num == 1;
				},
				content: [() => {
					let check = 1;
					check -= get.recoverEffect(trigger.player, player, player);
					player.chooseTarget('『流泪喵喵』：令目标摸两张牌（取消则改本次伤害为回复）', function (card, player, target) {
						return target == _status.event.target0;
					}).set('ai', function (target) {
						if (_status.event.check > 0) return 0;
						return 1;
					}).set('check', check).set('target0', trigger.player);
				}, () => {
					if (result.bool) {
						result.targets[0].draw(2);
						Evt.goto(3);
					} else {
						trigger.cancel(true);
					}
				}, () => {
					trigger.player.recover(player);
				}, () => {
					if (player.hasSkill('chengneng_used')) {
						player.draw();
					}
				}],
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player == _status.currentPhase && !player.needsToDiscard()) {
							return num - 10;
						}
					},
				},
				ai: {
					notricksource: true,
					effect: {
						player(card, player, target, current) {
							if (get.tag(card, 'damage') == 1) {
								let num = get.recoverEffect(target, player, player);
								return [0, num, 0, num];
							}
						}
					}
				}
			},
			chengneng: {
				trigger: { global: 'damageBegin3' },
				priority: 3,
				direct: true,
				filter(Evt, player) {
					return Evt.num && Evt.player != player && player.countDiscardableCards(player, 'he');
				},
				check(Evt, player) {
					if (Evt.num == 1) return get.recoverEffect(Evt.player, player, player);
					return 0;
				},
				content: [() => {
					player.chooseToDiscard(get.$pro2('chengneng'), 'he')
				}, () => {
					if (result.bool) {
						player.addTempSkill('chengneng_used')
						if (trigger.source == player) Evt.goto(3);
					} else {
						Evt.finish();
					}
				}, () => {
					trigger.source = player;
					Evt.finish();
				}, () => {
					trigger.cancel();
				}, () => {
					trigger.player.loseHp(trigger.num);
				}],
				subSkill: {
					used: {
						mark: true,
						marktext: "龙",
						intro: {
							name: '逞能龙息',
							content: '本回合已发动『逞能龙息』',

						}
					}
				},
			},
			//下巴
			shenglang: {
				enable: 'phaseUse',
				viewAs: { name: 'juedou' },
				usable: 1,
				filter(Evt, player) {
					return player.hasCard(card => get.name(card) == 'sha');
				},
				filterCard(card, player) {
					return get.name(card) == 'sha';
				},
				check(card) {
					return 8 - get.value(card);
				},
				ai: {
					basic: {
						order: 10
					},
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (tag == 'directHit_ai') {
							if (arg && get.name(arg.card) == 'juedou') return true;
							return false;
						}
					},
					result: { player: 1 },
				},
				group: 'shenglang_drawBy',
				subSkill: {
					drawBy: {
						trigger: { global: 'phaseEnd' },
						priority: 7,
						direct: true,
						filter(Evt, player) {
							let num = 0, going = 0;
							game.getGlobalHistory('cardMove', evt => {
								if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
								if (evt.player == player) going++;
								if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
								for (let i = 0; i < evt.cards.length; i++) {
									let card = evt.cards[i];
									if (get.name(card) == 'sha' && get.suit(card) == 'spade') num++;
								}
							}, Evt);
							return going && num;
						},
						content() {
							let num = 0;
							game.getGlobalHistory('cardMove', evt => {
								if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
								if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
								for (let i = 0; i < evt.cards.length; i++) {
									let card = evt.cards[i];
									if (get.name(card) == 'sha' && get.suit(card) == 'spade') num++;
								}
							}, Evt);
							Evt.num = num;
							player.logSkill('shenglang');
							player.draw(Evt.num);
						}
					}
				}
			},
			nodao: {
				audio: 2,
				enable: 'phaseUse',
				filter(Evt, player) {
					return !player.getEquip(1) && player.countCards('h', 'sha') > 0;
				},
				filterCard: { name: 'sha' },
				prepare(cards, player) {
					player.$throw(cards, 1000);
					game.log(player, '将', cards, '置入了弃牌堆');
				},
				discard: false,
				loseTo: 'discardPile',
				visible: true,
				delay: 0.5,
				content: [() => {
					player.draw();
				}, () => {
					if (result && get.itemtype(result) == 'cards') {
						for (let i of result) {
							if (get.subtype(i) == 'equip1') {
								Evt.card = i;
								player.chooseBool(`『无刀之咎』：是否装备${get.$t(Evt.card)}并回复一点体力？`);
							}
						}
					}
				}, () => {
					if (result.bool) {
						player.equip(Evt.card);
						player.recover();
					}
				}],
				ai: {
					basic: {
						order: 2
					},
					result: {
						player(player, target) {
							if (player.getStat().card.juedou) return 1;
							else return 0.5;
						},
					},
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && get.subtype(card) == 'equip1') return (num > 1 ? 1 : num);
					},
					aiValue(player, card, num) {
						if (get.itemtype(card) == 'card' && get.subtype(card) == 'equip1') return num / 10;
						if (get.itemtype(card) == 'card' && player.getStat().card.juedou && get.name(card) == 'sha') return num / 10;
					},
				},
			},
			//奈罗花
			ming_echi: {},
			echi: {
				trigger: {
					global: "gainAfter",
				},
				direct: true,
				filter(Evt, player) {
					if (Evt.player == player) return false;
					let evt = Evt.getParent('phaseDraw');
					if (!evt || evt.name != 'phaseDraw') {
						return Evt.cards && Evt.cards.length > 0 && Evt.player.hp >= player.hp;
					}
				},
				content: [() => {
					Evt.tar = trigger.player;
					let check = get.$a(player, Evt.player) < 0;
					player.chooseCard(get.$pro2('echi', Evt.tar), function (card, player, target) {
						return !card.hasGaintag('ming_');
					}).set('logSkill', ['echi', Evt.tar]).set('ai', card => {
						if (!_status.event.check) return 0;
						if (get.type(card) == 'equip') return 12 - get.value(card);
						return 8 - get.value(card);
					}).set('check', check);
				}, () => {
					if (result.bool) {
						Evt.cardtype = get.type2(result.cards[0])
						player.showCards(result.cards, '『阿斥』：亮出手牌');
						player.addGaintag(result.cards, 'ming_echi');
						player.$give(result.cards, player, false);
						game.delayx();
					} else Evt.finish();
				}, () => {
					let type = Evt.cardtype;
					Evt.tar.chooseToDiscard(`弃置一张为${get.$t(type)}牌的牌或失去一点体力`, function (card, player, target) {
						return get.type2(card) == _status.event.type;
					}).set('ai', card => {
						if (player.hp == 1) return 11 - get.value(card);
						return 6 - get.value(card);
					}).set('type', type);
				}, () => {
					if (!result.bool) {
						Evt.tar.loseHp();
					}
				}]
			},
			mudu: {
				trigger: {
					global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
				},
				filter(Evt, player) {
					if (Evt.player == player || Evt.player.countCards('he') < 2) return false;
					if (player.getHistory('lose', evt => {
						return evt.getParent(Evt.name) == Evt;
					}).length >= 1) return true;
					return false;
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) <= 0;
				},
				popup: false,
				content: [() => {
					Evt.tar = trigger.player;
					player.choosePlayerCard(Evt.tar, 'he', 2, `移除${get.$t(Evt.tar)}两张牌`, true).set('ai', function (button) {
						let info = get.info(button.link);
						if (info.onLose && get.position(button.link) == 'e') return 0;
						return get.value(button.link, player, 'raw');
					}).set('logSkill', ['mudu', Evt.tar]);
				}, () => {
					if (result?.links?.length) {
						let str = 'mudu_card' + player.playerid;
						if (Evt.tar.storage[str]) {
							Evt.tar.storage[str] = Evt.tar.storage[str].concat(result.links);
						} else {
							Evt.tar.storage[str] = result.links.slice(0);
						}
						Evt.tar.addSkill('mudu_card');
						Evt.tar.lose(result.links, ui.special, 'toStorage');
					}
				}],
				subSkill: {
					card: {
						mark: true,
						trigger: {
							global: 'phaseEnd'
						},
						filter(Evt, player) {
							return true;
						},
						forced: true,
						intro: {
							content: 'cardCount',
							onunmark(storage, player) {
								if (storage && storage.length) {
									player.$throw(storage, 1000);
									game.cardsDiscard(storage);
									game.log(storage, '被置入了弃牌堆');
									storage.length = 0;
								}
							},
						},
						content: [() => {
							let keys = Object.keys(player.storage);
							for (let i = 0; i < keys.length; i++) {
								if (keys[i].indexOf('mudu_card') == 0) keys[i] = keys[i].slice(9);
								else keys.splice(i--, 1);
							}
							Evt.keys = keys;
						}, () => {
							let key = Evt.keys.pop(), source = game.filterPlayer(cur => { return cur.playerid == key });
							let str = 'mudu_card' + key;
							if (!source.length) {
								player.gain(player.storage[str], 'fromStorage');
								delete player.storage[str];
							} else {
								source = source[0];
								player.chooseButton(['选择收回的牌', player.storage[str], 'hidden'], true).set('callback', function (player, result) {
									let cards = player.storage[str].slice(0).removeArray(result.links);
									let source = _status.event.source;
									player.gain(result.links);
									if (source.isIn()) {
										player.$give(cards, source);
										source.gain(cards);
									}
									delete player.storage[str];
								}).set('source', source);
							}
							if (Evt.keys.length > 0) Evt.redo();
							else player.removeSkill('mudu_card');
						}],
					},
				},
				ai: {
					threaten: 1.3
				}
			},
			//远北千南
			yingkuo: {
				trigger: {
					player: ['gainAfter', 'equipAfter'],
				},
				direct: true,
				filter(Evt, player) {
					if (Evt.name == 'equip' && Evt.swapped) return false;
					return game.hasPlayer(cur => {
						if (cur == player) return false;
						if (Evt.name == 'equip') return cur.countCards('e') == player.countCards('e');
						else return cur.countCards('h') == player.countCards('h');
					});
				},
				content: [() => {
					player.chooseTarget(get.$pro2('yingkuo'), function (card, player, target) {
						if (player == target) return false;
						if (_status.event.type == 'equip') return target.countCards('e') == player.countCards('e');
						else return target.countCards('h') == player.countCards('h');
					}).set('ai', function (target) {
						return -get.$a2(target);
					}).set('type', trigger.name);
				}, () => {
					if (result.bool) {
						Evt.tar = result.targets[0];
						player.logSkill('yingkuo', Evt.tar);
						Evt.tar.chooseToDiscard((trigger.name == 'equip' ? 'e' : 'h'), true);
					}
				}]
			},
			shengni: {
				enable: 'chooseToUse',
				viewAs(cards, player) {
					if (player.$.shengni_cardsDis) {
						let cur = player.$.shengni_cardsDis[0];
						return {
							name: get.name(cur),
							suit: get.suit(cur),
							number: get.number(cur),
							nature: get.nature(cur),
						};
					}
					return null;
				},
				filter(Evt, player) {
					let filter = Evt.filterCard;
					if (!player.$.shengni_cardsDis || !player.$.shengni_cardsDis.length) return false;
					return filter(player.$.shengni_cardsDis[0], player, Evt);
				},
				check(card) {
					let player = _status.event.player;
					return player.getUseValue(player.$.shengni_cardsDis[0]) > player.getUseValue(card);
				},
				filterCard(card, player, Evt) {
					if (player.hasSkill('shengni_used')) return true;
					return false;
				},
				selectCard() {
					let player = _status.event.player;
					if (player.hasSkill('shengni_used')) return 1;
					return -1;
				},
				precontent() {
					player.addTempSkill('shengni_used');
				},
				ignoreMod: true,
				position: 'h',
				group: ['shengni_cardsDis', 'shengni_cardsDis2'],
				subSkill: {
					used: {},
					cardsDis: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						marktext: '拟',
						intro: {
							name: '声拟',
							content(storage, player) {
								if (!storage) return '上一次进入弃牌堆的牌不满足条件';
								return '上一次进入弃牌堆的基本牌/通常锦囊牌为' + get.$t(storage);
							}
						},
						trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
						direct: true,
						filter(Evt, player) {
							if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
								|| (!Evt.getParent().relatedEvent || !Evt.getParent().relatedEvent.player || Evt.getParent().relatedEvent.name == 'judge'
									|| Evt.getParent().relatedEvent.player == player))) return false;
							if (Evt.name == 'lose' && (Evt.position != ui.discardPile
								|| Evt.player == player)) return false;
							return Evt.cards.filter(card => get.position(card, true) == 'd'
								&& ['basic', 'trick'].includes(get.type(card))).length > 0;
						},
						content() {
							let cards = trigger.cards.filter(card => get.position(card, true) == 'd' && ['basic', 'trick'].includes(get.type(card)));
							player.$.shengni_cardsDis = [cards.pop()];
							player.markSkill('shengni_cardsDis');
						},
					},
					cardsDis2: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
						direct: true,
						firstDo: true,
						filter(Evt, player) {
							return Evt.cards.filter(card => get.position(card, true) == 'd').length > 0;
						},
						content() {
							delete player.$.shengni_cardsDis;
							player.markSkill('shengni_cardsDis');
						},
					},
				},
				ai: {
					threaten: 1.3
				}
			},
			//凛月
			zhuqiao: {
				audio: 5,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.$.zhuqiao < 24;
				},
				check(card, cards) {
					let player = _status.event.player;
					if (player.$.zhuqiao_addCard && player.$.zhuqiao_addCard.includes(get.suit(card))) return 6 - get.value(card);
					return 9 - get.value(card);
				},
				filterCard: true,
				prepare(cards, player) {
					player.$throw(cards, 1000);
					game.log(player, '将', cards, '置入了弃牌堆');
				},
				position: 'he',
				discard: false,
				loseTo: 'discardPile',
				visible: true,
				delay: 0.5,
				content() {
					player.draw();
					player.$.zhuqiao += get.number(cards[0]);
					if (!player.hasSkill('zhuqiao_addCard')) player.addTempSkill('zhuqiao_addCard');
					if (!player.$.zhuqiao_addCard) player.$.zhuqiao_addCard = [];
					player.$.zhuqiao_addCard.add(get.suit(cards[0]));
					player.markSkill('zhuqiao_addCard');
				},
				ai: {
					basic: {
						order: 1,
					},
					result: {
						player: 0.5,
					},
					threaten: 1.5
				},
				group: ['zhuqiao_clear'],
				subSkill: {
					clear: {
						trigger: { player: 'phaseAfter' },
						priority: 24,
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.zhuqiao = 0;
						},
					},
					addCard: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						mark: true,
						intro: {
							content: '本回合重铸牌的花色：$',
						},
						trigger: { player: 'phaseEnd' },
						priority: 24,
						direct: true,
						filter(Evt, player) {
							return game.countPlayer(cur => {
								return player.$.zhuqiao_addCard.length > cur.countCards('h');
							});
						},
						onremove(player) {
							delete player.$.zhuqiao_addCard;
						},
						content: [() => {
							Evt.num = player.$.zhuqiao_addCard.length;
							player.chooseTarget(`###${get.$pro('zhuqiao')}###令一名角色将手牌数补至${get.cnNumber(Evt.num)}张`, function (card, player, target) {
								return _status.event.num > target.countCards('h');
							}).set('ai', function (target) {
								let player = _status.event.player;
								return (_status.event.num - target.countCards('h')) * get.$a(player, target);
							}).set('num', Evt.num)
						}, () => {
							if (result.bool && result.targets?.length) {
								Evt.target = result.targets[0];
								player.logSkill('zhuqiao', Evt.target);
								Evt.target.gain(get.cards(Evt.num - Evt.target.countCards('h')), 'draw')
							}
						}],
					},
				}
			},
			//开司
			pojie: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				trigger: {
					global: ['loseAfter', 'equipAfter'],
				},
				marktext: "戒",
				mark: true,
				intro: {
					content: '弃牌阶段改为弃置#张牌',
				},
				filter(Evt, player) {
					if (player != _status.currentPhase) return false;
					if (Evt.name == 'equip') {
						return true;
					}
					return Evt?.es?.length;
				},
				content() {
					player.draw();
					player.addMark('pojie', 1, false);
				},
				group: 'pojie_phaseDiscard',
				subSkill: {
					phaseDiscard: {
						trigger: { player: ['phaseDiscardBegin', 'phaseEnd'] },
						direct: true,
						lastDo: true,
						priority: 2,
						filter(Evt, player) {
							return player.$.pojie > 0;
						},
						content: [() => {
							if (trigger.name == 'phaseDiscard') {
								player.logSkill('pojie');
								if (!trigger.num) trigger.num = player.$.pojie;
							}
						}, () => {
							player.$.pojie = 0;
							player.unmarkSkill('pojie');
						}],
					},
				},
			},
			dazhen: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.getEquip(1);
				},
				filterCard(card, player) {
					return get.subtype(card) == 'equip1';
				},
				discard: false,
				lose: false,
				position: 'e',
				filterTarget(card, player, target) {
					return target != player;
				},
				content: [() => {
					player.$give(cards, target, false);
					target.equip(cards[0]);
				}, () => {
					Evt.num = Math.abs(player.getHandcardLimit() - player.countCards('h'));
					target.chooseToDiscard(`『大振』：需要弃置${get.cnNumber(Evt.num)}张牌`, Evt.num, 'he', true);
				}],
				ai: {
					order: 6,
					result: {
						target(player, target) {
							if (player.countCards('h') > player.getHandcardLimit()) {
								return -1;
							} else {
								return 0;
							}
						},
						player(player, target) {
							if (target.getEquip(1)) return 1;
							else return -0.5;
						},
					},
					threaten: 1.2,
				},
			},
			//早见咲
			tuncai: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				trigger: {
					player: 'discardAfter',
					global: 'drawAfter',
				},
				round: 1,
				filter(Evt, player) {
					if (Evt.name == 'draw') return Evt.player != player && player.$.tuncai;
					else return Evt.cards.length && !player.$.tuncai;
				},
				check(Evt, player) {
					if (player.$.tuncai == true) return Evt.num >= 2;
					return true;
				},
				popup: false,
				content: [() => {
					if (trigger.name == 'draw') {
						player.logSkill('tuncai', player); player.draw(trigger.num); player.$.tuncai = !player.$.tuncai; Evt.finish();
					} else player.chooseTarget(get.$pro2('tuncai'), function (card, player, target) {
						if (player == target) return false;
						return target.countCards('he');
					}).set('ai', function (target) {
						return -get.$a2(target);
					});
				}, () => {
					if (result.bool) {
						Evt.tar = result.targets[0];
						player.logSkill('tuncai', Evt.tar);
						player.$.tuncai = !player.$.tuncai;
						Evt.tar.chooseToDiscard(trigger.cards.length, true, 'he');
					}
				}]
			},
			zhidu: {
				trigger: { global: ['damageAfter', 'dying'] },
				zhuSkill: true,
				filter(Evt, player) {
					if (!player.hasZhuSkill('zhidu') || Evt.player.group != player.group) return false;
					if (Evt.name == 'damage') return Evt.num >= 2;
					return true;
				},
				content() {
					player.$.tuncai = !player.$.tuncai;
					game.delay();
					let roundname = 'tuncai_roundcount';
					if (player.hasMark(roundname)) {
						player.popup('重置');
						let next = game.createEvent('resetSkill');
						[next.player, next.resetSkill] = [player, 'tuncai']
						next.setContent('resetRound');
					}
				},
				ai: {
					combo: 'tuncai',
					threaten: 1.3
				}
			},
			//纪代因果
			huanxi: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				trigger: {
					player: ['phaseUseBegin', 'phaseUseEnd'],
				},
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				check(Evt, player) {
					let cards = player.getCards('h');
					let value = 0;
					for (let i of cards) {
						value += get.value(i);
					}
					value /= player.countCards('h');
					return (value < 6 && player.countCards('h') == player.hp) || value < 4;
				},
				content: [() => {
					Evt.cards = player.getCards('h');
					player.discard(Evt.cards);
				}, () => {
					player.draw(Evt.cards.length);
				}, () => {
					let names = Evt.cards.map(function (i) {
						return get.name(i);
					})
					if (!trigger.huanxi) {
						trigger.huanxi = names;
					} else {
						if (trigger.huanxi.length + names.length == trigger.huanxi.addArray(names).length) {
							if (player.hasSkill('celv_cardDisable')) {
								let next = game.createEvent('resetSkill');
								[next.player, next.resetSkill] = [player, 'celv']
								next.setContent(function () {
									player.popup('重置');
									player.removeSkill('celv_cardDisable');
								});
							}
						}
					}
				}]
			},
			celv: {
				trigger: { player: ['changeHp', 'discardAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'changeHp') return Evt.num < 0;
					return Evt.cards.length == player.hp;
				},
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('celv'), function (card, player, target) {
						if (player == target) return false;
						return target.countGainableCards(player, 'h');
					}).set('ai', function (target) {
						let player = _status.event.player;
						return get.effect(target, { name: 'shunshou_copy2' }, player, player);
					});
				}, () => {
					if (result.bool) {
						Evt.tar = result.targets[0];
						player.logSkill('celv', Evt.tar);
						player.gainPlayerCard(Evt.tar, 'h', true, 'visibleMove');
					}
				}, () => {
					if (result.bool) {
						let card = result.cards[0]
						player.showCards(card, '『册吕』获得手牌');
						if (!player.$.celv_cardDisable) player.$.celv_cardDisable = [];
						player.$.celv_cardDisable.add(get.name(card));
						if (!player.hasSkill('celv_cardDisable')) player.addSkill('celv_cardDisable');
						player.markSkill('celv_cardDisable');
					}
				}],
				subSkill: {
					cardDisable: {
						marktext: '吕',
						intro: {
							name: '春绿',
							content: '不能使用或打出：$'
						},
						onremove: true,
						mod: {
							cardEnabled2(card, player) {
								if (player.$.celv_cardDisable.includes(get.name(card, player))) return false;
							},
						},
					}
				},
				ai: {
					combo: 'huanxi',
					threaten: 1.3
				}
			},


			//ptr
			mianmo: {
				audio: 3,
				trigger: { player: 'useCard1' },
				filter(Evt, player) {
					if (player.hasSkill('mianmo_used')) return false;
					return Evt.targets && Evt.targets.length && Evt.cards && Evt.cards.length;
				},
				direct: true,
				firstDo: true,
				priority: 4,
				content: [() => {
					Evt.num = 0;
					for (let i = 0; i < trigger.cards.length; i++) {
						Evt.num += get.number(trigger.cards[i], player);
					}
					Evt.card = trigger.cards[0];
					let next = player.chooseTarget();
					next.set('prompt', get.$pro2('mianmo').replace('之点数或合计点数', Evt.num));
					next.set('filterTarget', function () {
						return true;
					});
					next.set('complexTarget', true);
					next.set('selectTarget', function () {
						let num = _status.event.num, sum = 0;
						for (let j = 0; j < ui.selected.targets.length; j++) {
							sum += ui.selected.targets[j].hp;
						}
						if (num == sum) return [0, ui.selected.targets.length];
						else return [ui.selected.targets.length + 1, ui.selected.targets.length + 1];
					});
					next.set('num', Evt.num);
					next.set('ai', function (target) {
						let trigger = _status.event.getTrigger();
						let player = _status.event.player;
						return get.effect(target, trigger.card, player, player);
					});
				}, () => {
					if (result.bool) {
						Evt.targets = result.targets.slice(0);
						player.logSkill('mianmo', Evt.targets);
						if (player.$.tiaolv_up && player.$.tiaolv_up.includes(Evt.card)) Evt.goto(4);
						if (player.$.tiaolv_down && player.$.tiaolv_down.includes(Evt.card)) Evt.goto(6);
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets.includes(player)) {
						if (!player.canUse(Evt.card, player)) Evt.targets.remove(player);
					} else {
						player.addTempSkill('mianmo_used')
					}
				}, () => {
					trigger.targets = Evt.targets;
					Evt.finish();
				}, () => {
					player.chooseBool('眠魔：是否令目标各摸一张牌？').set('ai', function () {
						let player = _status.event.player;
						if (_status.event.targets.includes(player)) return true;
						return false;
					}).set('targets', Evt.targets);
				}, () => {
					if (result.bool) {
						game.asyncDraw(Evt.targets);
					}
					Evt.goto(2);
				}, () => {
					player.chooseBool('眠魔：是否令目标横置？').set('ai', function () {
						return true;
					});
				}, () => {
					if (result.bool) {
						Evt.targets.forEach(function (tar) {
							tar.link(true)
						});
					}
					Evt.goto(2);
				}],
				subSkill: {
					used: {},
				},
			},
			tiaolv: {
				audio: 4,
				trigger: { player: 'useCard1' },
				filter(Evt, player) {
					return Evt.cards && Evt.cards.length == 1;
				},
				firstDo: true,
				direct: true,
				priority: 5,
				content: [() => {
					player.chooseControl(['增加', '减少', 'cancel2']).set('prompt', get.$pro2('tiaolv'));
				}, () => {
					if (result.control != 'cancel2') {
						player.logSkill('tiaolv');
						switch (result.control) {
							case '增加':
								player.$.tiaolv_up.addArray(trigger.cards);
								break;
							case '减少':
								player.$.tiaolv_down.addArray(trigger.cards);
								break;
							default:
								break;
						}
					}
				}],
				group: ['tiaolv_up', 'tiaolv_down'],
				subSkill: {
					up: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { player: 'useCardAfter' },
						firstDo: true,
						silent: true,
						direct: true,
						priority: 5,
						content() {
							if (player.$[Evt.name].length) player.$[Evt.name].length = 0;
						},
						mod: {
							number(card, player, number) {
								let num = player.getDamagedHp() || 1;
								if (player.$.tiaolv_up.includes(card)) return number + num;
							},
						},
					},
					down: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { player: 'useCardAfter' },
						firstDo: true,
						silent: true,
						direct: true,
						priority: 5,
						content() {
							if (player.$[Evt.name].length) player.$[Evt.name].length = 0;
						},
						mod: {
							number(card, player, number) {
								let num = player.getDamagedHp() || 1;
								if (player.$.tiaolv_down.includes(card)) return number - num;
							},
						},
					},
				},
			},
			//狼半仙
			niwei: {
				marktext: '弼',
				intro: {
					name: '味增弼佐',
					content(storage, player) {
						let str = '<ul style="padding-top:0;margin-top:0"><p>本回合变为逆位的牌名</p>';
						for (let i = 0; i < storage.length; i++) {
							str += '<li>' + get.$t(storage[i]);
						}
						str += '</ul>'
						return str;
					},
				},
				onremove(player, skill) {
					player.unmarkSkill(skill);
					delete player.$[skill]
				},
			},
			ming_niwei: {
				trigger: { global: ['shaBegin', 'shanBegin', 'taoBegin', 'jiuBegin'] },
				direct: true,
				lastDo: true,
				priority: 3,
				filter(Evt, player) {
					if (Evt.player.hasSkill('niwei') && Evt.player.$.niwei && Evt.player.$.niwei.includes(Evt.name)) return true;
					if (Evt.player != player) return false;
					let loser = player.getHistory('lose', evt => {
						return (evt.type == 'use' && evt.getParent().card && evt.getParent().card == Evt.card);
					});
					loser = loser[loser.length - 1];
					if (loser.getParent()) {
						if (Evt.getParent() == loser.getParent()) {
							for (let i in loser.gaintag_map) {
								if (loser.gaintag_map[i].includes('ming_niwei')) return true;
							}
						}
					}
				},
				content() {
					let fun = lib.card['niwei_' + trigger.name].content;
					if (fun) trigger.setContent(fun);
				},
				ai: {
					threaten: 0.8,
				}
			},
			xuanxu: {
				audio: 4,
				global: 'xuanxu_put',
				group: 'ming_niwei',
				trigger: { player: 'phaseUseBegin' },
				direct: true,
				lastDo: true,
				priority: 3,
				filter(Evt, player) {
					return player.countCards('h', card => get.type(card) == 'basic'
						&& !card.hasGaintag('ming_'));
				},
				content: [() => {
					player.chooseCard(get.$pro2('xuanxu'), [1, Infinity], card => {
						return get.type(card) == 'basic' && !card.hasGaintag('ming_');
					}).set('ai', card => {
						return 7 - get.useful(card);
					});
				}, () => {
					if (result.bool && result.cards && result.cards.length) {
						Evt.cards = result.cards.slice(0);
						player.showCards(Evt.cards, '『玄虚映实』亮出手牌');
						player.addGaintag(Evt.cards, 'ming_niwei');
						game.delayx();
					}
				}],
				subSkill: {
					put: {
						mod: {
							targetEnabled(card, player, target, now) {
								if (!card.cards) return;
								for (let i of card.cards) {
									if (!i.hasGaintag('ming_niwei')) return;
								}
								if (now === false) return true;
								let info = get.info(card), filter = info.filterTarget, range = info.range, outrange = info.outrange;
								if (typeof filter == 'boolean') return !filter;
								if (range == undefined && outrange == undefined) {
									if (typeof filter == 'function') {
										return !filter(card, player, target);
									}
								} else {
									return lib.filter.targetInRange(card, player, target) || !filter(card, player, target);
								}
							},
						}
					}
				},
				mod: {
					playerEnabled(card, player, target, now) {
						if (!card.cards) return;
						for (let i of card.cards) {
							if (!i.hasGaintag('ming_niwei')) return;
						}
						let info = get.info(card), filter = info.filterTarget, range = info.range, outrange = info.outrange;
						if (typeof filter == 'boolean') return !filter;
						if (range == undefined && outrange == undefined) {
							if (typeof filter == 'function') {
								return !filter(card, player, target);
							}
						} else {
							return lib.filter.targetInRange(card, player, target) || !filter(card, player, target);
						}
					},
					selectTarget(card, player, range) {
						if (!card.cards) return;
						for (let i of card.cards) {
							if (!i.hasGaintag('ming_niwei')) return;
						}
						if (range[1] == -1) range[1] = 1;
					},
					targetInRange(card, player, target, now) {
						if (!card.cards) return;
						for (let i of card.cards) {
							if (!i.hasGaintag('ming_niwei')) return;
						}
						if (_status.niweing) return;
						_status.niwei = true;
						if (typeof now == 'boolean') return !now;
						return lib.filter.targetInRange(card, player, target);
						delete _status.niwei;
						// let info=get.info(card), range=info.range, outrange=info.outrange;
						// if(range==undefined&&outrange==undefined) return true;
						// if(player.hasSkill('undist')||target.hasSkill('undist')) return true;
						// for(let i in range){
						// 	if(i=='attack'){
						// 		if(target==player)	return true;
						// 		if(player.inRange(target)) return false;
						// 		let range2=player.getAttackRange();
						// 		if(range2<=0) return true;
						// 		let distance=get.$dis(player,target);
						// 		if(range[i]<=distance-range2) return true;
						// 	}else{
						// 		let distance=get.$dis(player,target,i);
						// 		if(range[i]<distance) return true;
						// 	}
						// }
						// for(let i in outrange){
						// 	if(i=='attack'){
						// 		let range2=player.getAttackRange();
						// 		if(range2<=0) return true;
						// 		let distance=get.$dis(player,target)+extra;
						// 		if(outrange[i]>distance-range2+1) return true;
						// 	}else{
						// 		let distance=get.$dis(player,target,i)+extra;
						// 		if(outrange[i]>distance) return true;
						// 	}
						// }
						// return false;
					},
					ignoredHandcard(card, player) {
						if (card.hasGaintag('ming_niwei')) {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('ming_niwei')) {
							return false;
						}
					},
				},
			},
			weizeng: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { global: 'phaseBegin' },
				direct: true,
				lastDo: true,
				priority: 3,
				filter(Evt, player) {
					return Evt.player != player && player.countCards('h', card => get.type(card) == 'basic' && card.hasGaintag('ming_'));
				},
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCard(get.$pro2('weizeng'), [1, Infinity], card => {
						return get.type(card) == 'basic' && card.hasGaintag('ming_');
					}).set('ai', card => {
						if (card.hasGaintag('ming_niwei') || ['shan', 'tao'].includes(get.name(card))) return 0;
						return Math.random() - 0.2;
					});
				}, () => {
					if (result.bool && result.cards && result.cards.length) {
						Evt.cards = result.cards.slice(0);
						player.chooseButton(true, Evt.cards.length, ['按顺序将卡牌置于牌堆顶（先选择的在上）', Evt.cards]).set('ai', function (button) {
							let value = get.value(button.link);
							if (_status.event.reverse) return value;
							return -value;
						}).set('reverse', ((_status.currentPhase) ? get.$a(player, _status.currentPhase) > 0 : false));
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool && result.links?.length) {
						Evt.linkcards = result.links.slice(0);
						player.lose(Evt.cards, ui.special);
						Evt.target.addTempSkill('weizeng_put');
						Evt.target.addTempSkill('niwei');
						Evt.target.$.weizeng_put = [];
						Evt.target.$.weizeng_put.addArray(Evt.cards);
						game.log(player, '将', Evt.cards, '置于牌堆顶');
					}
				}, () => {
					let cards = Evt.linkcards;
					while (cards.length) {
						ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				}],
				subSkill: {
					put: {
						trigger: { player: 'gainAfter' },
						direct: true,
						lastDo: true,
						priority: 3,
						filter(Evt, player) {
							if (player.$.weizeng_put && player.$.weizeng_put.length) {
								for (let i = 0; i < Evt.cards.length; i++) {
									if (player.$.weizeng_put.includes(Evt.cards[i])) {
										return true;
									}
								}
							}
						},
						content: [() => {
							Evt.cards = [];
							if (!player.$.niwei) player.$.niwei = [];
							for (let i = 0; i < trigger.cards.length; i++) {
								if (player.$.weizeng_put.includes(trigger.cards[i])) {
									player.$.niwei.add(trigger.cards[i].name);
									Evt.cards.includes(trigger.cards.splice(i--, 1));
								}
							}
						}, () => {
							player.markSkill('niwei');
							player.$.weizeng_put.removeArray(Evt.cards);
						}],
						onremove: true,
					}
				},
			},
			//贝海王
			aswusheng: {
				init(player, skill) {
					player.$[skill] = 0;
				},
				trigger: { player: ['useCard', 'respond'] },
				direct: true,
				frequent: true,
				priority: 5,
				filter(Evt, player) {
					return get.type(Evt.card) == 'basic' || player.$.aswusheng > 0;
				},
				logTarget(Evt, player) {
					if (Evt.name == 'respond') return Evt.source;
					if (['sha', 'qi', 'jiu', 'tao'].includes(Evt.card.name)) return Evt.targets[0];
					if (Evt.respondTo) return Evt.respondTo[0];
				},
				mark: true,
				intro: {
					content: '连续使用或打出了&张基本牌',
				},
				content: [() => {
					if (get.type(trigger.card) != 'basic' && player.$.aswusheng > 0) {
						player.$.aswusheng = 0;
						player.markSkill('aswusheng');
						Evt.finish();
					}
					Evt.num = player.$.aswusheng;
				}, () => {
					let goto = false;
					let logTarget = get.copy(lib.skill.aswusheng.logTarget);
					let target = logTarget(trigger, player);
					player.$.aswusheng++;
					player.markSkill('aswusheng');
					switch (Evt.num) {
						case 0: goto = (trigger.name == 'useCard'); break;
						case 1: goto = true; break;
						case 2: goto = (target.countGainableCards(player, 'he') > 0); break;
						case 3: goto = (player.hp < player.maxHp); break;
						default: break;
					}
					if (goto) {
						Evt.target = target;
						let next = player.chooseBool(get.$pro2('aswusheng').replace(Evt.num, `<span class="yellowtext">${Evt.num}</span>`));
						next.set('ai', function () { return 1 });
						next.set('frequentSkill', Evt.name);
					} else {
						Evt.finish(0)
					}
				}, () => {
					if (result.bool || Evt.frequent) {
						player.logSkill(Evt.name, Evt.target);
						switch (Evt.num) {
							case 0: {
								if (trigger.addCount !== false) {
									trigger.addCount = false;
									let stat = player.getStat();
									if (stat && stat.card && stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
								}
							}; break;
							case 1: {
								player.draw();
							}; break;
							case 2: player.gainPlayerCard(Evt.target, 'he'); break;
							case 3: player.recover(); break;
						}
					}
				}],
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player == _status.currentPhase) {
							if (get.type(card) != 'basic') {
								if (player.$.aswusheng == 0) return num - 2;
								if (player.countCards('hs', { name: 'sha' }) >= 2 && player.$.aswusheng == 1) return num + 10;
							} else if (get.name(card) != 'sha') {
								if (player.countCards('hs', { name: 'sha' }) == 1 && player.$.aswusheng == 1) return num + 6;
							}
						}
					},
				},
				ai: {
					presha: true,
					threaten(player, target) {
						if (player.countCards('hs')) return 0.8;
					},
					skillTagFilter(player) {
						return player.countCards('hs', { name: 'sha' }) > 1 && [0, 2].includes(player.$.aswusheng);
					}
				}
			},
			gunxun: {
				enable: 'phaseUse',
				init(player, skill) {
					player.$[skill] ||= 1;
				},
				filter(Evt, player) {
					if (player.$.gunxun === 1) return player.countCards('h', card => !card.hasGaintag('ming_') && get.color(card) == 'red');
					return player.countCards('h', card => !card.hasGaintag('ming_') && get.color(card) == 'black');
				},
				selectCard: [1, Infinity],
				filterCard(card, player) {
					if (player.$.gunxun === 1) return !card.hasGaintag('ming_') && get.color(card) == 'red';
					return !card.hasGaintag('ming_') && get.color(card) == 'black';
				},
				check(card) {
					let player = _status.event.player;
					if (player.$.gunxun === 1 && player.countCards('hs', 'sha') < 2) return 6 - get.value(card);
					if (player.$.gunxun === 2 && player.countCards('hs', 'shan') > 1) return 2 - get.value(card);
					return 5 - get.value(card);
				},
				discard: false,
				lose: false,
				content: [() => {
					player.showCards(cards, '『棍训』亮出手牌');
					if (player.$.gunxun === 1) player.addGaintag(cards, 'ming_gunxunsha');
					else player.addGaintag(cards, 'ming_gunxunshan');
					game.delayx();
				}, () => {
					player.$.gunxun = [2, 1][player.$.gunxun - 1];
					let num = cards.length;
					if (game.hasPlayer(cur => cur.countCards('e') < num)) {
						player.chooseTarget(`『棍训』：令装备区牌数少于 ${get.cnNumber(num)} 的一名角色失去所有非锁定技直到回合结束`, function (card, player, target) {
							return target.countCards('e') < _status.event.num;
						}).set('num', num).set('ai', function (target) {
							let player = _status.event.player;
							return -get.$a(player, target) + Math.random();
						})
					}
				}, () => {
					if (result.targets?.length) {
						let target = result.targets[0];
						Evt.target = target;
						if (!target.hasSkill('fengyin')) {
							target.addTempSkill('fengyin');
						}
					}
				}],
				mod: {
					cardname(card, player) {
						if (card.hasGaintag && card.hasGaintag('ming_gunxunshan')) return 'shan';
						if (card.hasGaintag && card.hasGaintag('ming_gunxunsha')) return 'sha';
					},
				},
				ai: {
					order: 7.5,
					result: { player: 0.5 },
				}
			},
			//嘉然
			quanyu: {
				audio: 6,
				trigger: { global: 'useCard1' },
				clickChange: '休眠',
				clickable(player) {
					if (player.$.quanyu_clickChange === undefined) player.$.quanyu_clickChange = false;
					else player.$.quanyu_clickChange = !player.$.quanyu_clickChange;
				},
				clickableFilter(player) {
					return player.$.quanyu_clickChange !== false;
				},
				filter(Evt, player) {
					if (player.$.quanyu_clickChange === false) return false;
					let suit = get.suit(Evt.card);
					return Evt.cards && Evt.cards.length && suit != 'none' && Evt.player != player && !player.countCards('h', card => suit == get.suit(card));
				},
				check(Evt, player) {
					let handcards = player.getCards('h');
					let num = 4 - get.suit3(handcards).length;
					if (player.hp < num) return false;
					if (['shandian', 'du'].includes(Evt.card.name)) return false;
					if (Evt.targets && Evt.targets.length && get.$a(player, Evt.player) < 0) {
						for (let i = 0; i < Evt.targets.length; i++) {
							if (get.effect(Evt.targets[i], Evt.card, Evt.player, player) < 0) return true;
						}
					} else {
						return get.$a(player, Evt.player) < 0;
					}
				},
				prompt2(Evt, player) {
					return `你可以获得${get.$t(Evt.player)}使用的${get.$t(Evt.card)}，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。`;
				},
				addDialog(Evt, player) {
					return Evt.cards;
				},
				content: [() => {
					trigger.cancel();
					Evt.cards = trigger.cards;
					Evt.target = trigger.player;
					player.gain(Evt.cards, Evt.target, 'gain2');
				}, () => {
					player.showHandcards('『全域』展示手牌');
					let handcards = player.getCards('h');
					Evt.num = 4 - get.suit3(handcards).length;
				}, () => {
					if (Evt.num > 0) {
						player.damage(Evt.num, 'nosource');
					}
				}],
				ai: {
					expose: 0.2,
				},
			},
			wulian: {
				audio: true,
				enable: 'phaseUse',
				unique: true,
				limited: true,
				filter(Evt, player) {
					return player.isDamaged();
				},
				content: [() => {
					player.$.wulian = true;
					player.awakenSkill('wulian');
					player.draw(player.getDamagedHp());
				}, () => {
					player.addTempSkill('lianpo', 'roundStart');
				}],
				derivation: 'lianpo',
				ai: {
					order(item, player) {
						if (player.getDamagedHp() >= 3) return 10;
						return 0;
					},
					result: { player: 2 },
				}
			},
			lianpo: {
				audio: 4,
				//audioname:['Diana'],
				trigger: { global: 'phaseAfter' },
				frequent: true,
				onremove: true,
				filter(Evt, player) {
					return player.getStat('kill') > 0;
				},
				content() {
					player.insertPhase();
				},
			},
			//乃琳
			yehua: {
				audio: 3,
				trigger: { player: 'phaseBegin' },
				//frequent:true,
				filter(Evt, player) {
					return !player.isMaxHandcard(true);
				},
				check(Evt, player) {
					let list = game.filterPlayer(cur => {
						return cur.isMaxHandcard();
					}).sortBySeat();
					return (list[0].countCards('h') - player.countCards('h')) >= 1;
				},
				content: [() => {
					let num = 1, list = game.filterPlayer(cur => cur.isMaxHandcard());
					num += (list[0].countCards('h') - player.countCards('h'));
					Evt.cards = get.cards(num);
				}, () => {
					player.gain(Evt.cards, 'draw');
				}, () => {
					player.turnOver();
				}],
			},
			fengqing: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 1;
				},
				trigger: { player: ['linkBegin', 'turnOverBegin'] },
				direct: true,
				filter(Evt, player) {
					return true;
				},
				process(change) {
					switch (change) {
						case 1: return '其下个准备阶段视为使用了【酒】'; break;
						case 2: return '其下个准备阶段视为使用了【桃】'; break;
						case 3: return '其跳过本回合的判定和弃牌阶段'; break;
					}
				},
				content: [() => {
					Evt.change = player.$.fengqing;
					player.chooseTarget(get.$pro('fengqing')).set('ai', function (target) {
						let player = _status.event.player;
						let change = _status.event.change;
						switch (change) {
							case 1: return get.effect(target, { name: 'jiu' }, target, player) || target == player; break;
							case 2: return get.effect(target, { name: 'tao' }, target, player); break;
							case 3: {
								if (target != _status.currentPhase) return 0;
								if (target.countCards('j') > 0) return 2 * get.$a(player, target) + Math.random();
								return get.$a(player, target) + Math.random();
								break;
							}
						}
						return get.$a(player, target) + Math.random();
					}).set('prompt2', lib.skill.fengqing.process(Evt.change)).set('change', Evt.change)
				}, () => {
					if (result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('fengqing', Evt.target);
						switch (Evt.change) {
							case 1: Evt.target.addSkill('fengqing_jiu'); break;
							case 2: Evt.target.addSkill('fengqing_tao'); break;
							case 3: {
								Evt.target.skip('phaseJudge');
								Evt.target.skip('phaseDiscard');
								break;
							}
						}
						player.$.fengqing = (player.$.fengqing == 3) ? 1 : player.$.fengqing + 1;
					}
				}],
				effect: {
					target(card, player, target, current) {
						if (['tiesuo', 'lulitongxin'].includes(card.name)) {
							return [1, 2];
						}
					},
				},
				subSkill: {
					jiu: {
						audio: 2,
						mark: true,
						intro: {
							content: '下个准备阶段视为使用了【酒】'
						},
						trigger: { player: 'phaseZhunbeiEnd' },
						forced: true,
						onremove: true,
						popup: '风情-酒',
						audioname: ['EQueen'],
						filter(Evt, player) {
							return lib.filter.filterCard({ name: 'jiu', isCard: false }, player, Evt);
						},
						content() {
							player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay');
							player.removeSkill(Evt.name);
						},
					},
					tao: {
						audio: 2,
						mark: true,
						intro: {
							content: '下个准备阶段视为使用了【桃】'
						},
						trigger: { player: 'phaseZhunbeiEnd' },
						forced: true,
						onremove: true,
						popup: '风情-桃',
						audioname: ['EQueen'],
						filter(Evt, player) {
							return true;
							return lib.filter.filterCard({ name: 'tao', isCard: false }, player, Evt);
						},
						content() {
							player.chooseUseTarget({ name: 'tao' }, true, 'noTargetDelay');
							player.removeSkill(Evt.name);
						},
					},
				},
			},
			//珈乐
			huangjia: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				locked: true,
				notemp: true,
				mark: true,
				marktext: '👠',
				intro: {
					mark(dialog, content, player) {
						dialog.addText('已成为皇珈骑士');
					},
					onunmark(storage, player) {
						if (storage) {
							storage = undefined;
						}
					},
				},
			},
			shixi: {
				marktext: '时',
				intro: {
					mark(dialog, content, player) {
						dialog.addText('时隙:初始手牌');
						let list = player.$.shixi.slice(0);
						dialog.addSmall(list);
					},
					content: 'cards',
					onunmark(storage, player) {
						if (storage && storage.length) {
							storage.length = 0;
						}
					},
				},
				trigger: { global: 'phaseLoopBefore', player: 'enterGame' },
				forced: true,
				frequent: true,
				filter(Evt, player) {
					return !player.$.shixi;
				},
				content() {
					let cards = player.getCards('h');
					if (cards.length) {
						if (!player.$.shixi) player.$.shixi = []
						player.showCards(cards, '时隙:记录初始手牌');
						player.$.shixi.addArray(cards);
						player.markSkill('shixi');
					}
				},
				group: ['shixi_mark', 'shixi_draw'],
				subSkill: {
					mark: {
						marktext: '隙',
						intro: {
							mark(dialog, content, player) {
								dialog.addText('时隙:已指定');
								let list = player.$.shixi_mark.slice(0);
								dialog.addSmall(list);
							},
							content: 'cards',
							onunmark(storage, player) {
								if (storage && storage.length) {
									storage.length = 0;
								}
							},
						},
						trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
						filter(Evt, player) {
							let record = player.getStorage('shixi').slice(0);
							if (!record) return false;
							let check = cur => (player.$.yuezhi === true && cur.$.huangjia) || cur == player
							if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
								|| (!Evt.getParent().relatedEvent?.player || Evt.getParent().relatedEvent.name == 'judge'
									|| !check(Evt.getParent().relatedEvent.player)))) return false;
							if (Evt.name == 'lose' && (Evt.position != ui.discardPile
								|| !check(Evt.player))) return false;
							let list = Evt.cards.filter(card => {
								if (Evt.js && Evt.js.includes(card)) return false;
								for (let i = 0; i < record.length; i++) {
									if (player.$.shixi_mark && player.$.shixi_mark.includes(record[i])) continue;
									if (get.suit(record[i]) == get.suit(card)) return true;
								}
							});
							return list.length > 0;
						},
						direct: true,
						content: [() => {
							let record = player.getStorage('shixi').slice(0);
							let list = trigger.cards.filter(card => {
								for (let i of record) {
									if (player.$.shixi_mark && player.$.shixi_mark.includes(i)) continue;
									if (get.suit(i) == get.suit(card)) return true;
								}
							});
							Evt.record = record;
							Evt.list = list;
							Evt.num = 0;
						}, () => {
							if (Evt.list[Evt.num]) {
								if (player.$.shixi_mark) Evt.record.removeArray(player.$.shixi_mark);
								let filterButtons = Evt.record.filter(card => get.suit(Evt.list[Evt.num]) == get.suit(card))
								if (Evt.record.length) {
									if (lib.config.autoskilllist.includes('shixi')) {
										player.chooseButton([`###${get.$pro('shixi')}###选择要指定的牌（与${get.$t(Evt.list[Evt.num])}花色相同）`, Evt.record]).set('filterButton', function (button) {
											let card = _status.event.card;
											return get.suit(button.link) == get.suit(card);
										}).set('ai', function (button) {
											return get.value(button.link) + 2 * Math.random();
										}).set('card', Evt.list[Evt.num]);
									}
									else if (filterButtons.length) {
										Evt._result = { bool: true, links: [filterButtons.shift()] };
									}
								};
							}
						}, () => {
							if (result.bool && result.links) {
								if (!player.$.shixi_mark) player.$.shixi_mark = [];
								player.$.shixi_mark.addArray(result.links);
								player.markSkill('shixi_mark');
							}
							Evt.num++;
							if (Evt.list[Evt.num]) Evt.goto(1);
						}],
					},
					draw: {
						trigger: {
							global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
						},
						filter(Evt, player) {
							return player.$.shixi_mark && player.$.shixi_mark.length;
						},
						direct: true,
						content: [() => {
							Evt.num = Math.floor(player.$.shixi_mark.length / 2);
						}, () => {
							if (Evt.num > 0) {
								player.logSkill('shixi');
								player.draw(Evt.num);
								player.unmarkSkill('shixi_mark');
							}
						}],
					},
				}
			},
			xueta: {
				audio: 6,
				trigger: { player: ['useCard', 'respond'] },
				filter(Evt, player) {
					if (player.countCards('he') == 0) return false;
					return Array.isArray(Evt.respondTo) && Evt.respondTo[0] && Evt.respondTo[0] != player;
				},
				direct: true,
				content: [() => {
					Evt.target = trigger.respondTo[0];
					player.chooseToDiscard('he', get.$pro2('xueta')).set('ai', card => {
						if (!_status.event.check) return 1 - get.value(card);
						return 8 - get.value(card);
					}).set('logSkill', ['xueta', Evt.target, 'fire']).set('check', (get.$a(player, Evt.target) > 0 || !Evt.target.$.yuezhi));
				}, () => {
					if (result.bool && result.cards && result.cards.length) {
						Evt.target.draw(2);
						Evt.target.addSkill('huangjia');
					}
				}],
				ai: {
					effect: {
						target(card, player, target) {
							if (!player.$.huangjia) {
								if (get.$a(player, target) > 0 && get.$a(target, player) > 0) {
									if (get.tag(card, 'respondShan') && target.countCards('hs', 'shan') && target.countCards('he') > target.countCards('h', 'shan')) {
										return [1, 2, 1, 1];
									}
									if (get.tag(card, 'respondSha') && target.countCards('hs', 'sha') && target.countCards('he') > target.countCards('h', 'sha')) {
										if (card.name == 'juedou') return;
										return [1, 2, 1, 1];
									}
								}
							}
						}
					}
				}
			},
			yuezhi: {
				audio: true,
				skillAnimation: true,
				animationStr: '音乐珈',
				unique: true,
				juexingji: true,
				forced: true,
				trigger: { player: 'phaseBegin' },
				filter(Evt, player) {
					let num = game.countPlayer(cur => cur.$.huangjia === true);
					return num >= player.hp || num >= player.countCards('h');
				},
				content: [() => {
					player.gainMaxHp();
					player.awakenSkill('yuezhi');
					player.$.yuezhi = true;
				}, () => {
					let record = player.$.shixi.slice(0);
					record.forEach(card => {
						if (get.position(card, true) == 'd') player.gain(card, 'draw');
						else {
							player.recover();
							player.draw(2);
						}
						game.delay(0.4);
					})
				}],
				ai: {
					combo: 'shixi'
				}
			},
			//向晚
			yiqu: {
				trigger: { global: ['chooseTargetAfter', 'chooseCardTargetAfter', 'chooseUseTargetAfter', 'useSkillAfter'] },
				frequent: true,
				filter(Evt, player) {
					if (Evt.player == player) return false;
					let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
					if (!info || info.equipSkill || info.ruleSkill) return false;
					let result = Evt.result, targets = [];
					if (Evt.name == 'useSkill') targets = Evt.targets || [Evt.target];
					else if (!result || result.bool != true) return false;
					else {
						targets = result.targets.slice(0);
					}
					return lib.translate[`${name}_info`] && !player.hasSkill(name) && targets.includes(player);
				},
				prompt2(Evt, player) {
					let name = lib.skill.yiqu.process(Evt);
					return `你可以获得『${get.$t(name)}』，直到下次进入濒死状态`;
				},
				process(Evt) {
					let name = Evt.skill || Evt.getParent().name;
					if (name.length > 3) {
						let index = name.indexOf('_', 4);
						if (index > 3) name = name.substring(0, index);
					}
					return name;
				},
				content() {
					let name = lib.skill.yiqu.process(trigger);
					player.flashAvatar('yiqu', get.name(trigger.player));
					player.addSkillLog(name);
					player.addAdditionalSkill('yiqu', name, true);
				},
				group: 'yiqu_beDying',
				subSkill: {
					beDying: {
						trigger: { player: 'dyingBefore' },
						forced: true,
						filter(Evt, player) {
							return player.additionalSkills['yiqu'];
						},
						content() {
							player.removeAdditionalSkill('yiqu');
						}
					}
				}
			},
			wanxian: {
				audio: 2,
				trigger: { global: 'dying' },
				forced: true,
				check() {
					return false;
				},
				filter(Evt, player) {
					return Evt.player != player && Evt.reason && Evt.reason.source && player == Evt.parent.source
						&& player.additionalSkills['yiqu'] && player.additionalSkills['yiqu'].length;
				},
				content: [() => {
					Evt.num = player.additionalSkills['yiqu'].length;
					player.removeAdditionalSkill('yiqu');
				}, () => {
					player.draw(Evt.num);
				}],
				ai: {
					combo: 'yiqu',
				},
			},
			//阿梓
			juehuo: {
				init(player, skill) {
					if (!player.$[skill]) {
						player.$[skill] = {
							ms: [],
							ans: []
						};
					}
				},
				locked: true,
				notemp: true,
				marktext: '绝',
				intro: {
					mark(dialog, content, player) {
						if (player.$.juehuo.ms && player.$.juehuo.ms.length) {
							let list = player.$.juehuo.ms.slice(0);
							dialog.addText('明置绝活');
							dialog.addSmall(list);
						}
						if (player.$.juehuo.ans && player.$.juehuo.ans.length) {
							if (player.isUnderControl(true)) {
								let list = player.$.juehuo.ans.slice(0);
								dialog.addText('暗置绝活');
								dialog.addSmall(list);
							} else {
								dialog.addText(`暗置绝活（${get.cnNumber(player.$.juehuo.ans.length)}张）`);
							}
						}
					},
					content: 'cards',
					onunmark(storage, player) {
						if ((storage && storage.ms && storage.ms.length) || (storage && storage.ans && storage.ans.length)) {
							let cards = storage.ms.concat(storage.ans);
							player.$throw(cards, 1000);
							game.cardsDiscard(cards);
							game.log(cards, '被置入了弃牌堆');
							storage.ms.length = 0;
							storage.ans.length = 0;
						}
					},
				},
				cardAround: ['ms', 'ans']
			},
			zhiyue: {
				audio: 8,
				trigger: { player: 'useCardEnd' },
				frequent: true,
				filter(Evt, player) {
					if (player.$.juehuo.ans && player.$.juehuo.ms) {
						let card = Evt.card,
							list1 = player.$.juehuo.ans.slice(0), list2 = player.$.juehuo.ms.slice(0);
						for (let i = 0; i < list1.length; i++) {
							if (get.type2(list1[i]) == get.type2(card)) return true;
						}
						for (let i = 0; i < list2.length; i++) {
							if (get.suit(list2[i]) == get.suit(card)) return true;
						}
					}
					return false;
				},
				content: [() => {
					Evt.card = trigger.card;
					let list1 = player.$.juehuo.ans.slice(0), list2 = player.$.juehuo.ms.slice(0);
					let list: Dialogword = ['『指月』：选择绝活翻面'];
					if (list1.length) {
						list.push('暗置绝活');
						list.push([list1, 'card']);
					}
					if (list2.length) {
						list.push('明置绝活');
						list.push([list2, 'card']);
					}
					list.push('hidden');
					Evt.list1 = list1;
					Evt.list2 = list2;
					let next = player.chooseButton(list);
					next.set('selectButton', [1, Evt.list2.length + 1]);
					next.set('filterButton', function (button) {
						let card = _status.event.card, evt = _status.event.getParent(), now = button.link;
						if (evt.list1 && evt.list1.length && evt.list1.includes(now)) {
							let selected = ui.selected.buttons;
							if (selected.length) {
								for (let i = 0; i < selected.length; i++) {
									if (evt.list1.includes(selected[i].link)) return false;
								}
							}
							return get.type2(now) == get.type2(card);
						}
						if (evt.list2 && evt.list2.length && evt.list2.includes(now)) {
							return get.suit(now) == get.suit(card);
						}
					});
					next.set('card', Evt.card);
				}, () => {
					if (result.bool && result.links?.length) {
						let cards1 = result.links.slice(0), cards2 = result.links.slice(0);
						cards1 = cards1.filter(card => Evt.list1.includes(card));
						cards2 = cards2.filter(card => Evt.list2.includes(card));
						Evt.cards = cards1.concat(cards2)
						if (cards1.length == Evt.list1.length) {
							Evt.cards.push(get.cards()[0]);
						}
						if (cards2.length) {
							player.draw(cards2.length);
						}
						lib.skill.zhiyue.process(player, Evt.cards);
						game.delay(0.5);
					}
				}],
				process(player, cards) {
					let storage = player.getStorage('juehuo');
					if (storage.ans && storage.ms) {
						let drawAutos = [];
						for (let i = 0; i < cards.length; i++) {
							if (storage.ms.includes(cards[i])) {
								player.$give(cards[i], player, false);
								storage.ms.remove(cards[i]);
								storage.ans.push(cards[i]);
							} else if (storage.ans.includes(cards[i])) {
								player.$give(cards[i], player, false);
								storage.ans.remove(cards[i]);
								storage.ms.push(cards[i]);
							} else {
								drawAutos.add(cards[i]);
								game.cardsGotoSpecial(cards[i]);
								storage.ans.push(cards[i]);
							}
						}
						if (drawAutos.length) player.$drawAuto(drawAutos);
						player.markSkill('juehuo');
					}
				},
				ai: {
					threaten: 1.5
				},
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player.$.juehuo) {
							let suit = get.suit(card), type = get.type2(card), ans = player.$.juehuo.ans.slice(0), ms = player.$.juehuo.ms.slice(0);
							for (let i = 0; i < ans.length; i++) {
								if (get.type2(ans[i]) == type) return num + 7;
							}
							for (let i = 0; i < ms.length; i++) {
								if (get.suit(ms[i]) == suit) return num + 5;
							}
						}
					},
				},
				group: ['juehuo', 'zhiyue_start'],
				subSkill: {
					start: {
						forced: true,
						priority: 10,
						trigger: {
							global: 'gameStart',
							player: 'enterGame',
						},
						content() {
							Evt.cards = get.cards();
							game.playAudio('skill', 'zhiyue0');
							lib.skill.zhiyue.process(player, Evt.cards);
						},
					}
				}
			},
			zhengniu: {
				audio: 4,
				trigger: { player: ['linkBefore', 'recoverBefore', 'drawBefore'] },
				direct: true,
				filter(Evt, player) {
					if (!player.$.juehuo
						|| !(player.$.juehuo.ans && player.$.juehuo.ans.length
							|| player.$.juehuo.ms && player.$.juehuo.ms.length)) return false;
					if (!Evt.source || get.itemtype(Evt.source) != 'player' || Evt.source == player) return false;
					if (Evt.name == 'link') return !player.isLinked();
					return true
				},
				content: [() => {
					Evt.target = trigger.source;
					let check = get.$a(player, Evt.target) > 0,
						list1 = player.$.juehuo.ans.slice(0), list2 = player.$.juehuo.ms.slice(0);
					let list: Dialogword = [`###${get.$pro('zhengniu')}###选择交给${get.$t(Evt.target)}的绝活`];
					if (list1.length) {
						list.push('暗置绝活');
						list.push([list1, 'card']);
					}
					if (list2.length) {
						list.push('明置绝活');
						list.push([list2, 'card']);
					}
					list.push('hidden');
					player.chooseButton(list).set('filterButton', function (button) {
						return true;
					}).set('selectButton', [1, Infinity]).set('ai', function (button) {
						if (!_status.event.check) return -1;
						if ((ui.dialog.buttons.length - ui.selected.buttons.length) <= 3) return -1;
						return get.value(button.link);
					}).set('check', check);
				}, () => {
					if (result.bool && result.links) {
						player.logSkill('zhengniu');
						player.$.juehuo.ans.removeArray(result.links);
						player.$.juehuo.ms.removeArray(result.links);
						player.$give(result.links, Evt.target);
						Evt.target.gain(result.links);
						player.updateMarks();
					}
				}],
			},
			//勺宝
			juxiao: {
				trigger: { player: 'damageEnd' },
				filter(Evt, player) {
					return true;
				},
				frequent: true,
				content: [() => {
					player.chooseTarget([1, 2], true, '###『句销』：令至多两名角色各摸一张牌###摸牌的角色不能使用【杀】直到回合结束').set('ai', function (target) {
						let att = get.$a(_status.event.player);
						if (target == _status.currentPhase && (target.hasSha() || target.hasSkillTag('useSha'))) {
							if (target.hasS) return 2 - att;
						}
					})
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('juxiao', result.targets);
						game.asyncDraw(result.targets);
						result.targets.forEach(function (tar) {
							tar.addTempSkill('juxiao_xiao');
						})
					}
				}],
				subSkill: {
					xiao: {
						mark: true,
						intro: {
							content: '无法使用杀直到回合结束'
						},
						mod: {
							cardEnabled(card) {
								if (card.name == 'sha') return false;
							}
						}
					}
				},
				ai: {
					expose: 0.1,
					threaten: 0.8,
					maixie: true,
				}
			},
			shshenyan: {
				audio: 6,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h',);
				},
				content: [() => {
					player.showHandcards();
					game.delayx();
					if (!player.$.shshenyan) player.$.shshenyan = [];
				}, () => {
					player.chooseCard('h', '『神言』:弃置一种牌名的牌', true).set('ai', card => {
						if (['sha'].includes(card.name)) return 5;
						if (!['sha', 'tao'].includes(card.name) && get.type(card) == 'basic') return 6 - get.value(card);
						return 1;
					});
				}, () => {
					if (result.bool && result.cards) {
						Evt.cname = get.name(result.cards[0]);
						Evt.discard = player.discard(player.getCards('h', Evt.cname));
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.discard.cards) {
						let cards = Evt.discard.cards;
						cards.forEach(card => {
							player.$.shshenyan.add(get.suit(card));
						});
						player.draw(cards.length)
					} else {
						Evt.finish();
					}
				}, () => {
					if (player.$.shshenyan) {
						if (!player.hasSkill('shshenyan_mark')) player.addTempSkill('shshenyan_mark', 'phaseUseAfter');
						player.markSkill('shshenyan_mark');
						let num = player.$.shshenyan.length, list = get.inpile('trick');
						for (let i = 0; i < list.length; i++) {
							if (get.$t(list[i]).length != num) {
								list.splice(i--, 1);
							} else list[i] = ['锦囊', '', list[i]];
						}
						if (list.length) {
							player.chooseButton([`是否选择一张长度${num}的锦囊牌视为使用之？`, [list, 'vcard'], 'hidden']).set('ai', function (button) {
								let card = { name: button.link[2] }, value = get.value(card);
								return value;
							});
						}
					}
				}, () => {
					if (result.bool && result.links?.length) {
						player.chooseUseTarget({ name: result.links[0][2] }, true);
					} else {
						if (Evt.cname == 'sha') {
							let next = game.createEvent('resetSkill');
							[next.player] = [player]
							next.setContent(function () {
								player.popup('重置');
								game.log(player, '重置了『神言』');
								player.getStat('skill').shshenyan--;
							});
						}
					}
				}],
				subSkill: {
					mark: {
						marktext: "言",
						locked: true,
						intro: {
							name: '神言',
							content(storage, player, skill) {
								if (player.$.shshenyan.length) {
									return '本阶段『神言』的弃置花色：' + get.$t(player.$.shshenyan);
								}
							},
						},
						onremove(player) {
							player.$.shshenyan.length = 0;
						},
					}
				},
				ai: {
					order: 6,
					result: {
						player: 1,
					},
				},
			},
			//三三
			zhezhuan: {
				enable: 'chooseToUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('he', { type: ['trick', 'delay'] }) >= 1;
				},
				hiddenCard(player, name) {
					if (typeof lib.card[name].yingbian_prompt != 'string') return false;
					return name != 'du' && get.type(name) == 'basic' && player.countCards('he', { type: ['trick', 'delay'] });
				},
				chooseButton: {
					dialog(Evt, player) {
						let dialog = ui.create.dialog('辙转', 'hidden');
						dialog.add('应变标签');
						let table = document.createElement('div');
						let list0 = ['yingbian_kongchao', 'yingbian_canqu', 'yingbian_fujia', 'yingbian_zhuzhan'];
						table.classList.add('add-setting');
						table.style.margin = '0';
						table.style.width = '100%';
						table.style.position = 'relative';
						for (let i of list0) {
							let td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.innerHTML = `<span>${get.$t(`${i}_tag`)}</span>`;
							td.link = i;
							td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
							for (let j in lib.element.button) {
								td[j] = lib.element.button[i];
							}
							table.appendChild(td);
							dialog.buttons.add(td);
						}
						dialog.content.appendChild(table);
						dialog.add('卡牌转换');
						let list1 = [];
						for (let i = 0; i < lib.inpile.length; i++) {
							let name = lib.inpile[i];
							if (name == 'du') continue;
							if (!lib.card[name].yingbian_prompt) continue;
							if (name == 'sha') {
								list1.push(['基本', '', 'sha']);
								list1.push(['基本', '', 'sha', 'fire']);
							} else if (get.type(name) == 'trick') {
								if (!player.countCards('h', { name: name })) continue;
								list1.push(['锦囊', '', name]);
							} else if (get.type(name) == 'basic') {
								list1.push(['基本', '', name])
							};
						}
						dialog.add([list1, 'vcard']);
						return dialog;
					},
					filter(button, player) {
						if (ui.selected.buttons.length && typeof button.link == typeof ui.selected.buttons[0].link) return false;
						if (typeof button.link == 'object') {
							let evt = _status.event.getParent(), name = button.link[2];
							if (evt.filterCard && typeof evt.filterCard == 'function') {
								return evt.filterCard({ name: name, isCard: true }, player);
							}
							return lib.filter.filterCard({ name: name, isCard: true }, player, evt);
						}
						return true;
					},
					select: 2,
					check(button) {
						let player = _status.event.player;
						if (typeof button.link == 'string') {
							switch (button.link) {
								case 'yingbian_kongchao': return 4.5; break;
								case 'yingbian_canqu': return player.hp == 1; break;
								case 'yingbian_fujia': return 4.3; break;
								case 'yingbian_zhuzhan': return (3 - player.hp) * 1.5; break;
							}
						}
						let name = button.link[2], evt = _status.event.getParent();
						if (get.type(name) == 'basic') {
							if (name == 'shan') return 2;
							if (evt.type == 'dying') {
								if (get.$a(player, evt.dying) < 2) return false;
								return 1.9;
							}
							if (evt.type == 'phase') return player.getUseValue({ name: name, nature: button.link[3], isCard: true });
							return 1;
						}
						let effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links, player) {
						if (typeof links[1] == 'string') links.reverse();
						let yingbian = [links[0], ['yingbian_damage', 'yingbian_gain'].randomGet()];
						let name = links[1][2], nature = links[1][3];
						return {
							filterCard(card, player) {
								if (get.type2(card) != 'trick') return false;
								if (get.type2(name) == 'trick') return get.name(card) == name;
								return true;
							},
							selectCard: 1,
							yingbian: yingbian,
							viewAs: {
								cardid: get.id(),
								name: name,
								nature: nature,
								isCard: true,
							},
							popname: true,
							precontent() {
								player.logSkill('zhezhuan');
								let yingbian = lib.skill.zhezhuan_backup.yingbian;
								console.log(_status, _status.cardtag);
								_status.cardtag[yingbian[0]].add(Evt.result.card.cardid);
								_status.cardtag[yingbian[1]].add(Evt.result.card.cardid);
							},

						}
					},
					prompt(links, player) {
						if (typeof links[1] == 'string') links.reverse();
						let yingbian = links[0], name = links[1][2], nature = links[1][3];
						return `视为使用一张带有${get.$t(`${yingbian}_tag`)}标签的${get.$t(nature) || ''}【${get.$t(name)}】`;
					},
				},
				ai: {
					order: 12,
					result: {
						player: 1
					},
					threaten: 1.5
				},
				group: 'zhezhuan_clear',
				subSkill: {
					clear: {
						trigger: { player: 'useCard1' },
						forced: true,
						popup: false,
						firstDo: true,
						priority: 333,
						content() {
							if (_status.cardtag.yuzu && _status.cardtag.yuzu.length) delete _status.cardtag.yuzu;
						}
					}
				}
			},
			setu: {
				mark: true,
				intro: {
					name: '涩涂',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true,
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('he') >= 2;
				},
				filterCard(card) {
					let num = 0;
					for (let i of ui.selected.cards) {
						num += get.number(i);
					}
					return get.number(card) + num < 18;
				},
				discard: false,
				toStorage: true,
				delay: false,
				visible: true,
				complexCard: true,
				selectCard: [1, Infinity],
				check(card) {
					if (get.number(card) <= 2) return 2 + get.number(card) - get.value(card);
					return 7 - get.value(card);
				},
				content: [() => {
					player.markAuto('setu', cards);
				}, () => {
					let setus = player.$.setu;
					Evt.num = setus.length;
					let num = 1;
					for (let i of setus) {
						num *= get.number(i);
					}
					if (num > 100) Evt.going = true;
				}, () => {
					if (Evt.going === true) {
						player.unmarkSkill('setu');
						player.draw(Evt.num);
						player.chooseTarget('『涩涂』：对一名角色造成一点伤害', true).set('ai', function (target) {
							let player = _status.event.player;
							return get.damageEffect(target, player, player);
						});
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						Evt.target.damage('nocard');
					}
				}],
				ai: {
					order: 7.5,
					result: {
						player: 1,
					},
					threaten: 1.5
				}
			},
			//樱井
			junxu: {
				trigger: { player: 'useCard' },
				frequent: true,
				filter(Evt, player) {
					return player.getHistory('useCard').length == player.hp;
				},
				content() {
					player.chooseDrawRecover(2, 1, true, function () {
						if (player.hp == 1 && player.isDamaged()) return 'recover_hp';
						if (_status.event.check) return 'draw_card';
						if (player.isDamaged() && player.isPhaseUsing() && player.countCards('hs', card => {
							return player.getUseValue({ name: 'sha', isCard: true }) > 0;
						}) >= 2) return 'recover_hp';
						return 'draw_card';
					}).set('check', get.tag(trigger.card, 'recover') >= 1 && trigger.targets.includes(player));
				},
				ai: {
					threaten: 1.5,
					noShan: true,
					skillTagFilter(player, tag, arg) {
						if (tag == 'noShan') {
							if (player.isHealthy()) return true;
							return false;
						}
					},
				}
			},
			jingniang: {
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.countCards('he');
				},
				filterCard: true,
				check(card) {
					if (get.name(card) == 'sha') return 1 - get.value(card);
					return 7 - get.value(card);
				},
				content() {
					player.addTempSkill('jingniang_addDamBy');
					player.addMark('jingniang');
				},
				intro: {
					name: '醉酒',
					content: 'mark'
				},
				position: 'he',
				marktext: '酿',
				subSkill: {
					addDamBy: new toSkill('trigger', {
						filter(Evt, player) {
							return Evt.card && Evt.card.name == 'sha' && player.countMark('jingniang');
						},
						content() {
							trigger.baseDamage += player.countMark('jingniang');
							if (trigger.addCount !== false) {
								trigger.addCount = false;
								if (player.stat[player.stat.length - 1].card.sha > 0) {
									player.stat[player.stat.length - 1].card.sha--;
								}
							}
						},
						onremove(player, skill) {
							player.removeMark('jingniang', player.countMark('jingniang'), false);
						},
					}, 'forced').setT('useCard1'),
				},
				ai: {
					order: 4,
					result: {
						player(player, target) {
							if (player.getUseValue({ name: 'sha', isCard: true }) > 0 && player.countCards('hs', 'sha') >= 2) {
								return 1;
							}
						},
					},
					threaten: 1.2
				}
			},
			//宇佐纪诺诺
			tuhui: {
				group: ['tuhuiA', 'tuhuiB'],
			},
			tuhuiA: {
				trigger: { source: 'damageEnd' },
				round: 1,
				filter(Evt, player) {
					return Evt.player.isIn() && Evt.player != player;
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content: [() => {
					;
					Evt.targets = [player];
					Evt.targets.add(trigger.player);
					Evt.num = player.$.fuyou ? 2 : 1;
				}, () => {
					;
					Evt.target = Evt.targets.shift();
					Evt.recover = Evt.target.recover(Evt.num);
				}, () => {
					;
					if (!Evt.recover.result)
						Evt.target.draw(Evt.num);
					if (Evt.targets.length)
						Evt.goto(1);
				}],
				ai: {
					threaten: 1.6,
					effect: {
						player(card, player, target, current) {
							if (get.tag(card, 'damage') == 1 && !player.hasMark('tuhui_roundname') && !target.hujia && target.hp > 1 && get.$a(player, target) > 0) {
								if (target != player) {
									if (target.hasSkillTag('maixie'))
										return [1, 1, 0, 3];
									return [1, 1, 0, 0.5];
								}
							}
						}
					}
				}
			},
			tuhuiB: {
				trigger: { player: 'damageEnd' },
				round: 1,
				filter(Evt, player) {
					return Evt.source && Evt.source.isIn() && Evt.source != player;
				},
				check(Evt, player) {
					return get.$a(player, Evt.source) > 0;
				},
				logTarget: 'source',
				content: [() => {
					Evt.targets = [player];
					Evt.targets.add(trigger.source);
					Evt.num = player.$.fuyou ? 2 : 1;
				}, () => {
					Evt.target = Evt.targets.shift();
					Evt.recover = Evt.target.recover(Evt.num);
				}, () => {
					if (!Evt.recover.result) Evt.target.draw(Evt.num);
					if (Evt.targets.length) Evt.goto(1);
				}],
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'damage') == 1 && !target.hasMark('tuhuiB_roundcount') && !target.hujia && target.hp > 1 && get.$a(target, player) > 0) {
								if (target != player) return [0, 0, 1, 1];
							}
						}
					}
				}
			},
			fuyou: {
				audio: true,
				enable: 'phaseUse',
				unique: true,
				limited: true,
				content: [() => {
					player.$.fuyou = true;
					player.awakenSkill('fuyou');
				}, () => {
					{
						let roundname = 'tuhui_roundcount';
						if (player.hasMark(roundname)) {
							player.popup('重置');
							let next = game.createEvent('resetSkill');
							[next.player, next.resetSkill] = [player, 'tuhui']
							next.setContent('resetRound');
							game.delayx();
						}
					}
				}, () => {
					{
						let roundname = 'tuhuiB_roundcount';
						if (player.hasMark(roundname)) {
							player.popup('重置');
							let next = game.createEvent('resetSkill');
							[next.player, next.resetSkill] = [player, 'tuhuiB']
							next.setContent('resetRound');
							game.delayx();
						}
					}
				}, () => {
					game.filterPlayer(cur => {
						cur.addTempSkill('fuyou2');
					});
				}],
				ai: {
					order(item, player) {
						if (player.hp >= 3 && game.countPlayer(cur => {
							return get.$a(player, cur) < 0 && cur.hp <= 1;
						})) return 10;
						return 0;
					},
					result: { player: 1 },
				}
			},
			fuyou2: new toSkill('mark', {
				marktext: '幼',
				intro: {
					name: '复幼',
					content: '无法回复体力',
				},
				trigger: {
					player: 'recoverBegin'
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'recover')) return 'zeroplayertarget';
						}
					}
				}
			}, 'mark', 'forced'),
			//莱妮娅Rynia
			yinxu: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				hiddenCard(player, name) {
					if (name == 'sha' && lib.inpile.includes(name)) {
						if (player.$.yinxu == true) return player.countCards('h', { type: ['trick', 'delay'] });
						if (player.$.yinxu == false) return player.countCards('h', { type: 'equip' });
					}
				},
				enable: ['chooseToUse'],
				filter(Evt, player) {
					return lib.inpile.includes('sha');
				},
				filterCard(card, player) {
					if (!player.$.yinxu) return get.type(card) == 'equip';
					return get.type2(card) == 'trick';
				},
				selectCard: 1,
				check(card) {
					return 6 - get.value(card);
				},
				position: 'hes',
				viewAs: { name: 'sha' },
				onuse(result, player) {
					player.$.yinxu = !player.$.yinxu;
				},
				mod: {
					targetInRange(card, player, target) {
						if (_status.event.skill == 'yinxu') return true;
					},
					cardUsable(card, player, num) {
						if (_status.event.skillBy == 'yinxu' || _status.event.skill == 'yinxu') return Infinity;
					},
				},
				ai: {
					useSha: 1,
					result: { player: 1 },
				},
				group: 'yinxu_shaMiss',
				subSkill: {
					shaMiss: {
						trigger: { player: 'shaMiss' },
						direct: true,
						filter(Evt, player) {
							return Evt.skill == 'yinxu';
						},
						content: [() => {
							player.chooseTarget(`『吟虚』：令你或${get.$t(trigger.target)}调整手牌至上限`, function (card, player, target) {
								if (![player, _status.event.target0].includes(target)) return false;
								return target.getHandcardLimit() != target.countCards('h');
							}, function (target) {
								let player = _status.event.player;
								return (target.getHandcardLimit() - target.countCards('h')) * get.$a(player, target);
							}).set('target0', trigger.target);
						}, () => {
							if (result.bool) {
								Evt.target = result.targets[0];
								player.logSkill('yinxu', Evt.target);
								let num = Evt.target.getHandcardLimit() - Evt.target.countCards('h')
								if (num > 0) {
									Evt.target.draw(num);
								} else if (num < -0) {
									Evt.target.chooseToDiscard(-num, true);
								}
							}
						}],
					}
				}
			},
			//艾瑞思
			maozhi: {
				enable: 'phaseUse',
				filter(Evt, player) {
					if (player.hasSkill('maozhi_used')) return false;
					return player.countCards('he') > 0;
				},
				filterCard(card) {
					for (let i = 0; i < ui.selected.cards.length; i++) {
						if (get.type2(card) == get.type2(ui.selected.cards[i])) return false;
					}
					return true;
				},
				check(card) {
					if (ui.selected.cards.length) return 7 - get.value(card);
					return 5 - get.value(card);
				},
				complexCard: true,
				selectCard: 2,
				position: 'he',
				filterTarget(card, player, target) {
					return target != player;
				},
				discard: true,
				content: [() => {
					Evt.suits = get.suit3(cards);
					if (get.color3(cards).length <= 1) player.addTempSkill('maozhi_used');
				}, () => {
					if (Evt.suits.includes('heart')) {
						target.loseHp();
						target.draw(3);
						game.delay(0.5);
					}
				}, () => {
					if (Evt.suits.includes('diamond')) {
						if (target.hasUseTarget('sha')) {
							target.chooseUseTarget('sha', true, false, '『茆织』：视为使用一张【杀】');
							game.delay(0.5);
						}
					}
				}, () => {
					if (Evt.suits.includes('spade')) {
						target.showHandcards('『茆织』展示手牌');
						target.link(true);
						game.delay(0.5);
					}
				}, () => {
					if (Evt.suits.includes('club')) {
						target.chooseCard('he', [3, Infinity], true, '『茆织』：重铸至少三张牌').ai = get.unuseful3;
						game.delay(0.5);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards) {
						target.lose(result.cards, ui.discardPile).set('visible', true);
						target.$throw(result.cards);
						game.log(target, '将', result.cards, '置入了弃牌堆');
						target.draw(result.cards.length);
					}
				}],
				ai: {
					order: 2,
					result: {
						target(player, target) {
							let cards = ui.selected.cards;
							let suits = get.suit3(cards);
							if (target.hp == 1 && suits.includes('heart')) return -1;
							let result = 0;
							if (suits.includes('heart')) {
								if (target.countCards('h') < 3) result += 1;
								else result -= 0.2;
							}
							if (suits.includes('diamond')) {
								result += target.getUseValue({ name: 'sha' }) / 2;
							}
							if (suits.includes('spade')) {
								if (!target.isLinked()) result -= 0.5;
							}
							if (suits.includes('club')) {
								if (target.countCards('h') < 3) result -= 0.2;
								else result += 1;
							}
							return result;
						}
					}
				},
				subSkill: {
					used: {}
				}
			},
			baifei: {
				marktext: '妃',
				intro: {
					name: '已发动『拜妃』的目标角色',
					mark(dialog, storage, player) {
						if (storage && storage.length) {
							let name = storage.map(cur => get.name(cur));
							dialog.addSmall([name, 'character']);
						}
					},
					content(storage, player) {
						return `已『拜妃』${get.cnNumber(storage.length)}名角色`
					},
				},
				trigger: { source: 'damageAfter', player: 'damageAfter' },
				zhuSkill: true,
				logTarget(Evt, player) {
					if (player == Evt.source) return [player, Evt.player];
					return [player, Evt.source];
				},
				filter(Evt, player) {
					if (!player.hasZhuSkill('baifei')) return false;
					let characters = player.getStorage('baifei');
					if (player == Evt.source) return !characters.includes(Evt.player);
					else if (Evt.source) return !characters.includes(Evt.source);
				},
				content: [() => {
					if (!player.$.baifei) player.$.baifei = [];
					if (player == trigger.source) Evt.target = trigger.player;
					else Evt.target = trigger.source;
					player.chooseDrawRecover(2, 1, true);
				}, () => {
					if (result) {
						player.$.baifei.add(Evt.target);
						player.markSkill('baifei');
					}
				}],
			},
			//艾白
			bianyin: {
				trigger: { player: 'useCardBegin' },
				// direct:true,
				filter(Evt, player) {
					return Evt.cards && Evt.cards.length == 1;
				},
				usable: 1,
				content: [() => {
					player.chooseCard('he', get.$pro2('bianyin'), true);
				}, () => {
					if (result.bool) {
						// player.logSkill('bianyin');
						Evt.suit = get.suit(result.cards[0]);
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards, 1000);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw();
						trigger.card.suit = Evt.suit;
						trigger.cards[0].suit = Evt.suit;
					}
				}],
			},
			shabai: {
				trigger: {
					player: ['loseAfter'],
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
				},
				frequent: true,
				filter(Evt, player) {
					let evt = Evt.getl(player);
					return evt?.cards?.filter(card => {
						if (_status.currentPhase == player) return get.color(card) == 'red';
						return get.color(card) == 'black';
					}).length;
				},
				content: [() => {
					let evt = trigger.getl(player);
					Evt.num = evt.cards.filter(card => {
						if (_status.currentPhase == player) return get.color(card) == 'red';
						return get.color(card) == 'black';
					}).length;
				}, () => {
					if (_status.currentPhase == player) {
						player.draw();
					} else {
						player.moveCard();
					}
				}, () => {
					if (_status.currentPhase != player && !result.bool) {
						Evt.finish();
					}
				}, () => {
					if (--Evt.num > 0) Evt.goto(1);
				}],
			},
			//文静
			zaiying: {
				trigger: {
					global: "gainAfter",
				},
				logTarget: 'player',
				filter(Evt, player) {
					if (Evt.player == player) return false;
					return _status.currentPhase == player && player.canCompare(Evt.player);
				},
				content: [() => {
					Evt.tar = trigger.player;
					player.chooseToCompare([Evt.tar]).callback = lib.skill.zaiying.callback;
				}],
				callback() {
					if (Evt.winner == player) {
						player.drawTo(player.getHandcardLimit());
					} else {
						player.recover();
					}

					if (Evt.winner == target) {
						target.drawTo(target.getHandcardLimit());
					} else {
						target.recover();
					}
				},
				group: 'zaiying_phaseUse',
				subSkill: {
					phaseUse: {
						enable: 'phaseUse',
						usable: 1,
						filterTarget(card, player, target) {
							return player.canCompare(target);
						},
						filter(Evt, player) {
							return player.countCards('h') > 0;
						},
						content() {
							player.chooseToCompare([target]).callback = lib.skill.zaiying.callback;
						},
						ai:{
							order:6,
							result: {
								player(player, target) {
									if(!player.needsToDiscard()||player.isDamaged())	return 1
								},
								target(player,target) {
									if(!target.needsToDiscard())	return 1
								}
							},
						}
					}
				}
			},
			zhengen: {
				intro: {
					name: '已发动『政恩』的目标角色',
					mark(dialog, storage, player) {
						if (storage && storage.length) {
							let name = storage.map(cur => get.name(cur));
							dialog.addSmall([name, 'character']);
						}
					},
					content(storage, player) {
						return `已『政恩』${get.cnNumber(storage.length)}名角色`
					},
				},
				forced: true,
				dutySkill: true,
				trigger: { source: 'damageAfter', player: 'damageAfter' },
				logTarget(Evt, player) {
					if (player == Evt.source) return [player, Evt.player];
					return [player, Evt.source];
				},
				filter(Evt, player) {
					let characters = player.getStorage('zhengen');
					if (player == Evt.source) return player.countCards('h') && Evt.player.countDiscardableCards(player, 'ej') && !characters.includes(Evt.player);
					else if (Evt.source) return player.countCards('h') && Evt.source.countDiscardableCards(player, 'ej') && !characters.includes(Evt.source);
				},
				content: [() => {
					if (!player.$.zhengen) player.$.zhengen = [];
					if (!player.$.zhengen_achieve) player.$.zhengen_achieve = [];
					if (player == trigger.source) Evt.target = trigger.player;
					else Evt.target = trigger.source;
					player.chooseToDiscard(true, '『政恩』：弃置一张手牌');
				}, () => {
					if (result.bool) {
						player.$.zhengen_achieve.addArray(result.cards);
						player.discardPlayerCard(Evt.target, 'ej', true);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links) {
						player.$.zhengen.add(Evt.target);
						player.markSkill('zhengen');
						player.$.zhengen_achieve.addArray(result.links);
						player.markSkill('zhengen_achieve');
					}
				}],
				group: ['zhengen_achieve', 'zhengen_fail'],
				subSkill: {
					achieve: new toSkill('trigger',{
						intro: {
							name: '已发动『政恩』的弃置卡牌',
							content: 'cards',
						},
						trigger: { global: 'gainAfter' },
						filter(Evt, player) {
							let cards = player.getStorage('zhengen_achieve');
							let check = false;
							cards.forEach(card => {
								let num = get.number(card);
								if (cards.filter(cur => get.number(cur) == num).length >= 4) check = true;
							});
							return check
						},
						skillAnimation: true,
						animationColor: 'wood',
						content: [() => {
							game.log(player, '成功完成使命');
							let num = player.countCards('h') - player.getHandcardLimit();
							if (num > 0) {
								player.draw(num);
							} else if (num < 0) {
								player.chooseToDiscard(num);
							}
						}, () => {
							player.$.zhengen = [];
							player.markSkill('zhengen');
							player.$.zhengen_achieve = [];
							player.markSkill('zhengen_achieve');
						}],
					},'forced').setI([]),
					fail: {
						trigger: { player: 'recoverAfter' },
						direct: true,
						forceDie: true,
						filter(Evt, player) {
							return Evt.result && player.isHealthy() && player.countCards('h') > 0;
						},
						content: [() => {
							game.log(player, '使命失败');
							player.$.zhengen = [];
							player.unmarkSkill('zhengen');
							player.$.zhengen_achieve = [];
							player.unmarkSkill('zhengen_achieve');
							player.awakenSkill('zhengen');
							Evt.num = player.countCards('h');
							player.chooseTarget(Evt.num, `『政恩』：令${get.cnNumber(Evt.num)}名角色横置`, true, function (card, player, target) {
								return !target.isLinked();
							}, function (target) {
								let player = _status.event.player, num = _status.event.num;
								return get.$a(player, target) / 2 + num * get.damageEffect(target, player, player);
							}).set('num', Evt.num);
						}, () => {
							if (result.bool) {
								let targets = result.targets;
								player.logSkill('zhengen_fail', targets);
								while (targets.length) {
									let target = targets.shift();
									target.link();
									target.draw();
								}
							}
						}, () => {
							player.damage(player.countCards('h'), 'fire');
						}],
					},
				},
			},
			//星瞳
			jiezou: new toSkill('regard', {
				mod: {
					maxHandcardFinal(player, num) {
						return num + game.countPlayer(cur => cur.inRangeOf(player));
					}
				},
				intro: {
					markcount(storage, player) {
						return game.countPlayer(cur => cur.inRangeOf(player));
					}
				}
			}),
			xtguyong: new toSkill('trigger', {
				filter(Evt, player) {
					return game.hasPlayer(cur => cur.countCards('h') < player.countCards('h')
						|| cur.countCards('e') < player.countCards('e')
						|| cur.countCards('j') < player.countCards('j'))
				},
				content: [() => {
					player.chooseTarget(get.$pro2('xtguyong'), (card, player, tar) => tar.countCards('h') < player.countCards('h')
						|| tar.countCards('e') < player.countCards('e')
						|| tar.countCards('j') < player.countCards('j'), tar => tar.countCards('j') < player.countCards('j'))
				}, () => {
					if (result?.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('xtguyong', Evt.target)
						Evt.position = ''
						for (let i of ['h', 'e', 'j']) {
							if (Evt.target.countCards(i) < player.countCards(i)) Evt.position += i
						}
						Evt.num = Evt.position.length
						player.turnOver()
					}
					else Evt.finish()
				}, () => {
					if (Evt.num === 0) Evt.finish()
					else {
						Evt.target.discardPlayerCard(player, Evt.num, Evt.position, true).set('filterButton', button => {
							for (var i = 0; i < ui.selected.buttons.length; i++) {
								if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						})
					}
				}, () => {
					Evt.num = result.links.length
					if (Evt.num === 0) Evt.finish()
					else {
						player.chooseTarget(`令攻击范围内至多${get.cnNumber(Evt.num)}名角色受到${Evt.num}点伤害`, [1, Evt.num],
							(card, player, tar) => tar.inRangeOf(player), tar => -get.$a2(tar))
					}
				}, () => {
					if (result?.targets?.length) {
						Evt.targets = result.targets.slice(0)
					}
				}, () => {
					if (Evt.targets.length) {
						let target = Evt.targets.shift();
						player.line(target, 'fire');
						target.damage(Evt.num);
						Evt.redo();
					}
				}],
			}, 'direct').setT('phaseZhunbeiBegin'),
			//乌拉の帝国
			dizuo: {
				trigger: { player: 'useCard' },
				direct: true,
				filter(Evt, player) {
					return get.type(Evt.card) == 'equip' && game.hasPlayer(cur => {
						return cur != player && get.$dis(cur, player) <= 1;
					});
				},
				content: [() => {
					player.chooseTarget(get.$pro2('dizuo'), function (card, player, target) {
						return target != player && get.$dis(target, player) <= 1;
					}, function (target) {
						let player = _status.event.player, att = get.$a(player, target);
						if (att > 0 && target.countCards('he', { type: 'equip' })) return att * 2;
						if (!target.countCards('he', { type: 'equip' }) && player.hasCard(card => {
							if (get.info(card).selectTarget == '-1') return 0;
							return get.effect(target, card, player, player) > 0;
						})) return 1 - att / 2;
						return 0;
					});
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('dizuo', Evt.target);
						game.delayx();
						Evt.target.chooseCard('he', { type: 'equip' }).set('ai', card => {
							return 6 - get.value(card);
						}).set('prompt', `『帝座』：将一张装备牌交给${get.$t(player.name)}并摸两张牌，或成为其下一张牌的额外目标`);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards && result.cards.length) {
						Evt.target.give(result.cards, player, true);
						Evt.target.draw(2);
					} else {
						if (!Evt.target.hasSkill('dizuo_mark')) {
							Evt.target.addSkill('dizuo_mark');
							game.swapSeat(player, Evt.target);
						}
						player.$.dizuo_addTarget = Evt.target;
						player.markSkill('dizuo_addTarget');
					}
				}],
				group: 'dizuo_addTarget',
				subSkill: {
					mark: {},
					addTarget: {
						mark: 'character',
						intro: {
							content: '下一张牌的额外目标：$'
						},
						trigger: { player: 'useCard1' },
						forced: true,
						filter(Evt, player) {
							return player.$.dizuo_addTarget;
						},
						logTarget(Evt, player) {
							return player.$.dizuo_addTarget;
						},
						content: [() => {
							if (trigger.targets && trigger.targets.length) {
								trigger.targets.add(player.$.dizuo_addTarget);
							}
						}, () => {
							delete player.$.dizuo_addTarget;
							player.unmarkSkill('dizuo_addTarget');
						}],
					}
				},
				ai: {
					threaten: 1.1,
					effect: {
						player(card, player, target, current) {
							if (player.$.dizuo_addTarget && target != player.$.dizuo_addTarget) {
								_status.dizuo = true
								let eff = get.effect(player.$.dizuo_addTarget, card, player, player);
								delete _status.dizuo
								if (current > 0 || eff > 0) return [1, eff];
							}
						}
					}
				},
			},
			hongtie: {
				trigger: { player: 'useCardToPlayered' },
				filter(Evt, player) {
					if (!Evt.isFirstTarget) return false;
					if (Evt.targets.length % 2 != 0) return false;
					return true;
				},
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('hongtie'),
						function (card, player, target) {
							return _status.event.targets.includes(target);
						}).set('ai', function (target) {
							let player = _status.event.player;
							return get.damageEffect(target, player, player);
						}).set('targets', trigger.targets);
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('hongtie', Evt.target);
						Evt.target.damage();
						game.delayx();
					}
				}],
				ai: {
					threaten: 1.1,
				},
			},
			//云玉鸾
			jiujiu: {
				trigger: { player: 'phaseUseBegin' },
				direct: true,
				filter(Evt, player) {
					return player.countCards('he', { type: 'equip' });
				},
				content: [() => {
					player.chooseCardTarget({
						position: 'he',
						filterCard: { type: 'equip' },
						filterTarget(card, player, target) {
							return true;
						},
						ai2(target) {
							let player = _status.event.player, att = get.$a(player, target);
							if (att > 0 && target.countCards('he', { type: 'equip' }) && !player.needsToDiscard()) return att * 1.5;
							if (!target.countCards('he', { type: 'equip' })) return get.damageEffect(target, player, player) - 1;
							return 0;
						}
					}).set('prompt', get.$pro2('jiujiu'));
				}, () => {
					if (result.bool && result.cards && result.targets?.length) {
						Evt.target = result.targets[0];
						Evt.card = result.cards[0];
						player.logSkill('jiujiu', Evt.target);
						player.lose(Evt.card, ui.special);
						game.delayx();
					} else Evt.finish();
				}, () => {
					let card = Evt.card;
					ui.cardPile.insertBefore(card.fix(), ui.cardPile.firstChild);
					game.updateRoundNumber();
					trigger.cancel();
				}, () => {
					Evt.target.chooseCard('he', { type: 'equip' }).set('ai', card => {
						return 8 - get.value(card);
					}).set('prompt', `『臼啾』：将一张装备牌交给${get.$t(player.name)}并摸两张牌，或受到一点伤害`);
				}, () => {
					if (result.bool && result.cards && result.cards.length) {
						Evt.target.give(result.cards, player, true);
						Evt.target.draw(2);
					} else {
						player.line(Evt.target);
						Evt.target.damage('nocard');
					}
				}],
				ai: {
					effect: {
						player(card, player, target, current) {
							if (player.$.dizuo_addTarget && target != player.$.dizuo_addTarget) {
								let eff = get.effect(player.$.dizuo_addTarget, card, player, player);
								if (current > 0 || eff > 0) return [1, eff];
							}
						}
					}
				},
			},
			qitong: new toSkill('trigger',{
				filter(Evt, player) {
					return player.getHistory('sourceDamage').length == 0;
				},
				logTarget(Evt, player) {
					return player.getNext();
				},
				content: [() => {
					Evt.target = player.getNext();
					if (player.$.qitong) {
						player.swapEquip(Evt.target);
						Evt.finish();
					} else {
						game.swapSeat(player, Evt.target);
					}
					player.$.qitong = !player.$.qitong;
				}, () => {
					if ((player.next || player.getNext()) == _status.roundStart) {
						player.drawTo(player.getHandcardLimit());
						player.phaseUse();
					}
				}],
				ai: {
					threaten: 1.1,
				},
			}).setI(true).setT('phaseJieshuBegin'),

			//步步
			tianlve: {
				audio: true,
				trigger: { player: 'phaseUseBegin' },
				priority: 199,
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('tianlve'), function (card, player, target) {
						return target != player;
					}, function (target) {
						let player = _status.event.player;
						return get.recoverEffect(target, player, player);
					});
				}, () => {
					if (result.targets?.length) {
						player.logSkill('tianlve', result.targets);
						Evt.target = result.targets[0];
						Evt.target.recover();
						player.$.tianlve_pcr = Evt.target;
						player.addTempSkill('tianlve_pcr');
					}
				}],
				subSkill: {
					pcr: {
						mark: 'character',
						intro: {
							name: '甜略',
							content: '本阶段内你对$使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标',
						},
						onremove(player, skill) {
							player.unmarkSkill('tianlve_pcr');
							delete player.$.tianlve_pcr;
						},
						trigger: { player: 'useCard' },
						priority: 199,
						direct: true,
						filter(Evt, player) {
							let card = Evt.card, info = get.info(card);
							if (info.allowMultiple == false) return false;
							return Evt.targets && Evt.targets.length == 1 && Evt.targets[0] == player.$.tianlve_pcr;
						},
						content: [() => {
							let prompt2 = `为${get.$t(trigger.card)}增加一个目标`
							player.chooseTarget(get.$pro('tianlve'), function (card, player, target) {
								if (_status.event.targets.includes(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card, player, target);
							}).set('prompt2', prompt2).set('ai', function (target) {
								let player = _status.event.player;
								return get.effect(target, _status.event.card, player, player);
							}).set('targets', trigger.targets).set('card', trigger.card);
						}, () => {
							if (result.bool && result.targets?.length) {
								if (!Evt.isMine()) game.delayx();
								Evt.targets = result.targets;
							}
						}, () => {
							if (Evt.targets) {
								player.logSkill('tianlve', Evt.targets);
								trigger.targets.addArray(Evt.targets);
							} else {
								player.draw();
							}
						}],
						mod: {
							targetInRange(card, player, target) {
								if (target == player.$.tianlve_pcr) return true;
							},
						},
					},
				}
			},
			luxian: {
				audio: true,
				group: 'P_SP',
				trigger: { player: 'phaseZhunbeiBegin' },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'orange',
				forceunique: true,
				filter(Evt, player) {
					return player.isDamaged();
				},
				check(Evt, player) {
					return player.countCards('hes') >= 5 || player.hp <= 1;
				},
				content: [() => {
					let list;
					if (_status.characterlist) {
						list = [];
						for (let i of _status.characterlist) {
							let info = lib.character[i];
							if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
						}
					} else if (_status.connectMode) {
						list = get.charactersOL(function (i) {
							let info = lib.character[i];
							return !(info[1] == 'psp' || info[4].includes('P_SP'));
						});
					} else {
						list = get.gainableCharacters(function (info) {
							return info[1] == 'psp' || info[4].includes('P_SP');
						});
					}
					let players = game.players.concat(game.dead);
					for (let i = 0; i < players.length; i++) {
						if (players[i] != player && players[i].group && players[i].group == 'psp') {
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('Pudding');
					if (list.length) {
						player.chooseButton(true).set('ai', function (button) {
							return 5 || get.rank(button.link, true) - lib.character[button.link][2];
						}).set('createDialog', ['『颅祭』：获得其中一名角色所有技能', [list.randomGets(3), 'character']]);
					} else Evt.finish()
				}, () => {
					if (result.links?.length) {
						player.$.luxian = true;
						player.awakenSkill('luxian');
						player.loseMaxHp();
						for (let i of result.links) {
							if (_status.characterlist) {
								_status.characterlist.remove(i);
							}
							let skills = lib.character[i][3];
							for (let j of skills) {
								player.addTempSkill(j, { player: 'phaseDiscardAfter' });
							}
							player.flashAvatar('luxian', i);
						}
						player.$.luxian_pcr ??= [];
						player.$.luxian_pcr.addArray(result.links);
						player.$.P_SP.addArray(result.links);
						player.addTempSkill('luxian_pcr', { player: 'phaseDiscardAfter' });
						player.markSkill('P_SP');
					}
				}],
				subSkill: {
					pcr: {
						onremove(player, skill) {
							let storage = player.getStorage(skill)
							if (player.hasSkill('P_SP', null, null, false) && storage.length) {
								if (_status.characterlist) _status.characterlist.addArray(storage);
								player.$.P_SP.removeArray(storage);
								if (player.$.P_SP.length == 0) {
									player.unmarkSkill('P_SP');
								} else {
									player.markSkill('P_SP');
								}
								delete player.$[skill]
							}
						}
					},
				}
			},
			//粉兔
			erni: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 1;
				},
				group: ['erni_going', 'erni_change'],
				hiddenCard(player, name) {
					switch (player.$.erni) {
						case 1: if (name == 'sha') return player.countCards('h'); break;
						case 2: if (name == 'shan') return player.countCards('h'); break;
						case 3: if (name == 'tao') return player.countCards('h'); break;
					}
				},
				ai: {
					useSha: 1,
					skillTagFilter(player, tag) {
						switch (tag) {
							case 'respondSha': {
								if (player.$.erni != 1 || !player.countCards('h')) return false;
								break;
							}
							case 'respondShan': {
								if (player.$.erni != 2 || !player.countCards('h')) return false;
								break;
							}
							case 'save': {
								if (player.$.erni != 3 || !player.countCards('h')) return false;
								break;
							}
						}
					},
					result: { player: 1 },
					respondSha: true,
					respondShan: true,
					save: true,
				},
				subSkill: {
					going: {
						enable: ['chooseToUse', 'chooseToRespond'],
						//发动时提示的技能描述
						prompt(Evt, player) {
							player ||= Evt.player;
							let str = get.skillInfoTranslation('erni', player);
							return str;
						},
						viewAs(cards, player) {
							let name = null;
							let suit = get.suit(cards[0], player);
							switch (player.$.erni) {
								case 1: name = 'sha'; break;
								case 2: name = 'shan'; break;
								case 3: name = 'tao'; break;
							}
							//返回判断结果
							if (name) return { name: name, suit: suit };
							return null;
						},
						viewAsFilter(player) {
							let cards = player.getCards('h');
							if (!cards.length) return false;
							let filter = Evt.filterCard;
							let name = null;
							switch (player.$.erni) {
								case 1: name = 'sha'; break;
								case 2: name = 'shan'; break;
								case 3: name = 'tao'; break;
							}
							for (let i of cards) {
								let suit = get.suit(i, player);
								if (filter({ name: name, suit: suit }, player, _status.event)) return true;
							}
							return false;
						},
						check(card) {
							return 7 - get.value(card);
						},
						filter(Evt, player) {
							return player.countCards('h');
						},
						filterCard(card, player, Evt) {
							Evt = Evt || _status.event;
							let filter = Evt._backup.filterCard;
							let name = null;
							let suit = get.suit(card, player);
							switch (player.$.erni) {
								case 1: name = 'sha'; break;
								case 2: name = 'shan'; break;
								case 3: name = 'tao'; break;
							}
							if (filter({ name: name, suit: suit }, player, Evt)) return true;
							return false;
						},
						precontent: [() => {
							Evt.cards = Evt.result.cards.slice(0);
							player.$throw(Evt.cards);
							player.lose(Evt.cards, ui.ordering);
							Evt.result.card.cards = [];
							Evt.result.cards = [];
							delete Evt.result.card.number;
						}, () => {
							game.broadcast(function () {
								ui.arena.classList.add('thrownhighlight');
							});
							let cards = Evt.cards
							ui.arena.classList.add('thrownhighlight');
							game.addVideo('thrownhighlight1');
							player.showCards(cards, '『耳匿』展示手牌');
							while (cards.length) {
								ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
							}
							game.updateRoundNumber();
						}, () => {
							game.broadcastAll(function () {
								ui.arena.classList.remove('thrownhighlight');
							});
							game.addVideo('thrownhighlight2');
							if (Evt.clear !== false) {
								game.broadcastAll(ui.clear);
							}
							if (player.$.erni != 3) player.$.erni++;
							else player.$.erni = 1;
						}],
					},
					change: {
						trigger: { player: ['shouruAfter', 'chonghuangAfter', 'baoxiaoAfter', 'tianlveAfter', 'luxianAfter', 'quankaiAfter', 'canxinAfter', 'useSkillAfter'] },
						priority: 199,
						prompt2: '转换一次『耳匿』',
						filter(Evt, player) {
							let name = Evt.name;
							if (name == 'useSkill') name = Evt.skill;
							if (['erni_change', 'erni_going'].includes(name)) return false;
							let info = lib.skill[name];
							if (info.equipSkill || info.ruleSkill || info.silent) return false;
							return true;
						},
						content() {
							if (player.$.erni != 3) player.$.erni++;
							else player.$.erni = 1;
						}
					}
				}
			},
			shouru: {
				audio: 4,
				trigger: { player: ['damageAfter', 'useCardAfter', 'respondAfter'] },
				priority: 199,
				frequent: true,
				filter(Evt, player) {
					if (player.hasSkill('shouru_used')) return false;
					return (Evt.name == 'damage' || ['useCard', 'respond'].includes(Evt.name) && Evt.skill == 'erni_going') && game.hasPlayer(cur => {
						return cur != player && get.$dis(_status.currentPhase, cur, 'pure') == 1 && cur.countGainableCards(player, 'he');
					});
				},
				content: [() => {
					Evt.source = trigger.player;
					player.chooseTarget(get.$pro2('shouru'), true, function (card, player, target) {
						return target != player && get.$dis(_status.currentPhase, target, 'pure') == 1 && target.countGainableCards(player, 'he');
					}, function (target) {
						let player = _status.event.player;
						return 8 - get.$a(player, target);
					});
				}, () => {
					if (result.targets?.length) {
						player.addTempSkill('shouru_used')
						player.gainPlayerCard('he', result.targets[0], '『受乳』：获得其一张牌');
					}
				}],
				ai: {
					expose: 0.1,
					threaten: 0.8,
				},
				involve: 'erni',
				subSkill: {
					used: {}
				},
			},
			chonghuang: {
				audio: true,
				group: 'P_SP',
				trigger: { global: 'changeHp' },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'fire',
				forceunique: true,
				filter(Evt, player) {
					if (player.hasZhuSkill('yinzun') && Evt.player.group == player.group) {
						return Evt.player.hp == 1;
					}
					return Evt.player == player && player.hp == 1;
				},
				content: [() => {
					let list;
					if (_status.characterlist) {
						list = [];
						for (let i of _status.characterlist) {
							let info = lib.character[i];
							if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
						}
					} else if (_status.connectMode) {
						list = get.charactersOL(function (i) {
							let info = lib.character[i];
							return !(info[1] == 'psp' || info[4].includes('P_SP'));
						});
					} else {
						list = get.gainableCharacters(function (info) {
							return info[1] == 'psp' || info[4].includes('P_SP');
						});
					}
					let players = game.players.concat(game.dead);
					for (let i = 0; i < players.length; i++) {
						if (players[i] != player && players[i].group && players[i].group == 'psp') {
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('AyanaNana');
					if (list.length) {
						player.chooseButton(true).set('ai', function (button) {
							return 5 || get.rank(button.link, true) - lib.character[button.link][2];
						}).set('createDialog', ['『崇皇』：获得其中一名角色所有技能', [list.randomGets(3), 'character']]);
					} else Evt.finish();
				}, () => {
					if (result.links?.length) {
						player.$.chonghuang = true;
						player.awakenSkill('chonghuang');
						player.loseMaxHp();
						for (let i of result.links) {
							if (_status.characterlist) {
								_status.characterlist.remove(result.links[i]);
							}
							let skills = lib.character[i][3];
							for (let j of skills) {
								player.addTempSkill(j, 'roundStart');
							}
							player.flashAvatar('chonghuang', i);
						}
						player.$.chonghuang_kamen ??= [];
						player.$.chonghuang_kamen.addArray(result.links);
						player.$.P_SP.addArray(result.links);
						player.addTempSkill('chonghuang_kamen', 'roundStart');
						player.markSkill('P_SP');
					}
				}],
				subSkill: {
					kamen: {
						onremove(player, skill) {
							let storage = player.getStorage(skill)
							if (player.hasSkill('P_SP', null, null, false) && storage.length) {
								if (_status.characterlist) _status.characterlist.addArray(storage);
								player.$.P_SP.removeArray(storage);
								if (player.$.P_SP.length == 0) {
									player.unmarkSkill('P_SP');
								} else {
									player.markSkill('P_SP');
								}
								delete player.$[skill]
							}
						}
					},
				}
			},
			yinzun: {
				unique: true,
				zhuSkill: true,
				involve: 'chonghuang',
			},
			//阿秋
			jiren: {
				audio: 6,
				audioname: ['jike'],
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return true;
				},
				content() {
					let func = function (result) {
						let num = 0
						if (get.subtype(result) == 'equip1') {
							num += get.value(result, player, 'raw') / 2;
						}
						if (get.color(result) == 'red') {
							num += 1.5;
						}
						return num;
					};
					player.judge(func).callback = lib.skill.jiren.callback;
				},
				callback: [() => {
					if (Evt.judgeResult.color == 'red') {
						player.draw();
					}
					if (get.subtype(Evt.judgeResult.name) == 'equip1') {
						player.gain(card, 'gain2');
					}
					if (Evt.judgeResult.suit) {
						player.$.jiren_going = [];
						player.$.jiren_going.add(Evt.judgeResult.suit);
						if (!player.hasSkill('jiren_going')) player.addTempSkill('jiren_going');
						player.markSkill('jiren_going');
					}
				}],
				group: 'jiren2',
				ai: {
					threaten: 1.2,
					order: 16,
					result: { player: 1 },
				},
				subSkill: {
					going: {
						audio: false,
						marktext: "祭",
						locked: true,
						intro: {
							name: '戮秋',
							content(storage, player, skill) {
								if (storage.length) {
									return '本回合上一次『祭刃』判定结果：' + get.$t(storage);
								}
							},
						},
						onremove: true,
					},
				}
			},
			jiren2: {
				audio: false,
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.getStat('skill').jiren;
				},
				content: [() => {
					player.loseHp();
				}, () => {
					let next = game.createEvent('resetSkill');
					[next.player] = [player]
					next.setContent(function () {
						player.popup('重置');
						game.log(player, '重置了『祭刃』');
						player.getStat('skill').jiren--;
					});
				}],
				ai: {
					order(item, player) {
						if (player.awakenedSkills.includes('canxin')) {
							if (player.isHealthy() || player.hp > 3) return 10;
						} else {
							if (player.$.jiren_going && player.hp > 1) {
								let num = player.countCards('hs', card => {
									let info = get.info(card);
									if (info.allowMultiple == false) return false;
									return player.hasUseTarget(card);
								});
								if (num >= 3) return -1;
								return num / player.countCards('hs') < (player.hp / 4);
							}
						}
					},
					result: {
						player(player, target) {
							if (player.hasUnknown(3) || player.hp === 1) return -0.1;
							if (!player.$.jiren_going) return player.countCards('hs');
							else if (player.countCards('hs') >= 4) return 0.1;
							else return -1;
						},
					},
				},
			},
			luqiu: new toSkill('trigger',{
				trigger: { global: ['loseEnd', 'cardsDiscardEnd'] },
				filter(Evt, player) {
					let record = player.$.jiren_going;
					if (!record) return false;
					return Evt.cards && Evt.cards.filter(card => get.position(card, true) == 'd' && record.includes(get.suit(card))).length;
				},
				direct: true,
				content: [() => {
					if (player.$.luqiu == 1) {
						player.chooseTarget(`${get.$pro('luqiu')}视为使用一张杀？`, function (card, player, target) {
							return player.canUse('sha', target);
						}).set('ai', function (target) {
							let player = _status.event.player;
							return get.effect(target, { name: 'sha' }, player, player);
						}).set('prompt2', get.skillInfoTranslation('luqiu', player));
					} else if (player.$.luqiu == 2) {
						player.chooseBool(function () {
							return 1;
						}).set('prompt', `###${get.$pro('luqiu')}摸一张牌###${get.skillInfoTranslation('luqiu', player)}`);
					} else {
						player.chooseCard('he').set('ai', card => {
							let player = _status.event.player;
							if (player.$.jiren_going.includes(get.suit(card))) return 12 - get.value(card);
							return 10 - get.value(card);
						}).set('prompt', `###${get.$pro('luqiu')}弃一张牌###${get.skillInfoTranslation('luqiu', player)}`);
					}
				}, () => {
					if (result.bool) {
						if (player.$.luqiu < 3) player.$.luqiu++;
						else player.$.luqiu = 1;
						if (result.targets?.length) player.useCard({ name: 'sha' }, result.targets, false);
						else if (result.cards && result.cards.length) player.discard(result.cards);
						else player.draw();
					}
				}],
				mod: {
					aiValue(player, card, num) {
						if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) return num / 10;
					},
					aiOrder(player, card, num) {
						if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) return num + 8;
					},
				},
				ai: {
					combo: 'jiren',
					useSha: 2,
					effect: {
						player(card, player) {
							if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) {
								if (get.name(card) == 'sha') return [1, 3];
								return [1, 2];
							}
							if (get.name(card) == 'sha') return [1, 2];
						}
					},
					result: { player: 1 },
				},
			}).setI([]),
			canxin: {
				audio: 2,
				trigger: { player: 'phaseUseEnd' },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'fire',
				forceunique: true,
				filter(Evt, player) {
					return player.countCards('he') > 0 && player.isDamaged();
				},
				check(Evt, player) {
					return player.$.jiren_going
						&& player.countCards('he', card => get.tag(card, 'damage')) > 0 && player.isDamaged();
				},
				content: [() => {
					player.$.canxin = true;
					player.awakenSkill('canxin');
				}, () => {
					let next = player.chooseCard('he', '###重铸一张牌###若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作');
					next.set('ai', card => {
						if (get.tag(card, 'damage')) return 15 - get.value(card);
						return 6 - get.value(card);
					});
				}, () => {
					if (result.bool && result.cards) {
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw();
						let card = result.cards[0];
						if (get.tag(card, 'damage')) Evt.goto(1);
						else {
							player.recover();
							let evt = _status.event.getParent('phase');
							if (evt) {
								evt.finish();
							}
						}
					}
				}]
			},
			//红晓音
			quankai: {
				audio: 7,
				trigger: { source: 'damageEnd' },
				direct: true,
				round: 1,
				filter(Evt, player) {
					return Evt.player.isIn() && Evt.player.countDiscardableCards(player, 'hej');
				},
				content: [() => {
					player.discardPlayerCard(trigger.player, 'hej', get.$pro2('quankai'));
				}, () => {
					if (result.links?.length) {
						player.logSkill('quankai', trigger.player);
						player.$.quankai = result.links.slice(0);
						player.markSkill('quankai');
					}
				}],
				mark: true,
				intro: { content: 'cards' },
				group: 'quankai_gainBy',
				subSkill: {
					gainBy: {
						trigger: { player: 'useCardAfter' },
						direct: true,
						filter(Evt, player) {
							let type = get.type2(Evt.card);
							return type == 'trick' && player.$.quankai;
						},
						content: [() => {
							player.chooseCardButton('从弃牌堆获得上次『拳开』的弃牌，否则重置『拳开』', 1, player.$.quankai).set('filterButton', function (button) {
								return _status.event.list.includes(button.link);
							}).set('list', player.$.quankai.filterInD('d')).set('ai', function (button) {
								return get.value(button.link) > 0;
							});
						}, () => {
							if (result.bool && result.links) {
								player.logSkill('quankai');
								player.gain(result.links, 'gain2');
							} else {
								let roundname = 'quankai_roundcount';
								if (player.hasMark(roundname)) {
									player.popup('重置');
									let next = game.createEvent('resetSkill');
									[next.player, next.resetSkill] = [player, 'quankai']
									next.setContent('resetRound');
								}
							}
						}],
					}
				}
			},
			heyuan: {
				audio: 2,
				group: 'P_SP',
				trigger: { player: 'phaseDrawBegin1' },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'fire',
				forceunique: true,
				filter(Evt, player) {
					return !Evt.numFixed && player.isDamaged();
				},
				check(Evt, player) {
					return player.countCards('hs', card => get.tag(card, 'damage')) >= 2;
				},
				content: [() => {
					trigger.changeToZero();
					player.$.heyuan = true;
					player.awakenSkill('heyuan');
					Evt.num = 1;
				}, () => {
					let list;
					if (_status.characterlist) {
						list = [];
						for (let i of _status.characterlist) {
							let info = lib.character[i];
							if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
						}
					} else if (_status.connectMode) {
						list = get.charactersOL(function (i) {
							let info = lib.character[i];
							return !(info[1] == 'psp' || info[4].includes('P_SP'));
						});
					} else {
						list = get.gainableCharacters(function (info) {
							return info[1] == 'psp' || info[4].includes('P_SP');
						});
					}
					let players = game.players.concat(game.dead);
					for (let i = 0; i < players.length; i++) {
						if (players[i] != player && players[i].group && players[i].group == 'psp') {
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('KurenaiAkane');
					if (list.length) {
						player.chooseButton(true).set('ai', function (button) {
							return 5 || get.rank(button.link, true) - lib.character[button.link][2];
						}).set('createDialog', [`『合缘』：获得其中一名角色的所有${Evt.num > 0 ? '' : '非'}限定技`, [list.randomGets(3), 'character']]);
					} else Evt.finish();
				}, () => {
					if (result.links?.length) {
						for (let i of result.links) {
							if (_status.characterlist) {
								_status.characterlist.remove(result.links[i]);
							}
							let skills = lib.character[i][3];
							for (let j of skills) {
								if (Evt.num ? (lib.skill[j].limited) : (!lib.skill[j].limited)) {
									player.addTempSkill(j, { player: 'phaseBegin' });
								}
							}
						}
						if (!player.$.heyuan_qiyuan) player.$.heyuan_qiyuan = [];
						player.$.heyuan_qiyuan.addArray(result.links);
						player.$.P_SP.addArray(result.links);
						player.flashAvatar('heyuan', result.links[0]);
						player.addTempSkill('heyuan_qiyuan', { player: 'phaseBegin' });
						player.markSkill('P_SP');
					}
				}, () => {
					if (Evt.num > 0) {
						Evt.num--;
						Evt.goto(1);
					}
				}],
				subSkill: {
					qiyuan: {
						onremove(player, skill) {
							let storage = player.getStorage(skill)
							if (player.hasSkill('P_SP', null, null, false) && storage.length) {
								if (_status.characterlist) _status.characterlist.addArray(storage);
								player.$.P_SP.removeArray(storage);
								if (player.$.P_SP.length == 0) {
									player.unmarkSkill('P_SP');
								} else {
									player.markSkill('P_SP');
								}
								delete player.$[skill]
							}
						}
					}
				}
			},
			//拉布里
			yangyao: new toSkill('active',{
				audio: false,
				filter(Evt, player) {
					let list = [];
					if (!player.isAuto) return true;
					for (let i = 0; i < ui.discardPile.childElementCount; i++) {
						let card = ui.discardPile.childNodes[i];
						if (player.getStorage('yangyao').includes(get.name(card))) continue;
						if (get.type2(card) == 'trick') {
							list.push(card);
						}
					}
					return list.length;
				},
				filterCard(card, player) {
					if (ui.selected.cards.length) return get.color(card) == get.color(ui.selected.cards[0]);
					return player.countCards('hes', { color: get.color(card) }) >= 2;
				},
				complexCard: true,
				selectCard() {
					if (ui.selected.cards.length) return 2;
					return [0, 2];
				},
				position: 'he',
				content: [() => {
					if (!cards.length) player.loseHp();
				}, () => {
					let list = [];
					for (let i = 0; i < ui.discardPile.childElementCount; i++) {
						let card = ui.discardPile.childNodes[i];
						if (player.getStorage('yangyao').includes(get.name(card))) continue;
						if (get.type2(card) == 'trick') {
							list.push(card);
						}
					}
					if (list.length) {
						target.chooseCardButton('『秧耀』：选择获得一张锦囊牌', list, true).ai = function (button) {
							return get.value(button.link);
						};
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links) {
						if (!player.$.yangyao) player.$.yangyao = [];
						player.$.yangyao.push(get.name(result.links[0]))
						target.gain(result.links, 'gain2', 'log');
					}
				}],
				group: 'yangyao_clear',
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 23,
						filter(Evt, player) {
							return player.getStorage('yangyao').length;
						},
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.getStorage('yangyao').length = 0;
						}
					}
				},
				ai: {
					order(item, player) {
						if (player.hp <= 1 && player.countCards('hes') <= 3) return 0;
						if (player.isHealthy() || player.hp > 3) return 9;
						return 2;
					},
					result: {
						player(player, target) {
							if (player.hp == 1) return -10;
							if (ui.selected.cards.length < 2) {
								return player.hp - 6;
							}
							return -2.5;
						},
						target(player, target) {
							let result = 0;
							for (let i = 0; i < ui.discardPile.childElementCount; i++) {
								let card = ui.discardPile.childNodes[i];
								if (player.getStorage('yangyao').includes(get.name(card))) continue;
								if (get.type2(card) == 'trick') {
									result = Math.max(result, get.value(card, target, 'raw'));
								}
							}
							return result;
						}
					},
				},
			},'filterTarget').setI([]),
			shili: {
				audio: true,
				trigger: { global: 'phaseEnd' },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'wood',
				forceunique: true,
				filter(Evt, player) {
					if (!player.isDamaged()) return false;
					let history = player.getHistory('useCard');
					for (let i = 0; i < history.length; i++) {
						if (get.type2(history[i].card) != 'basic') return true;
					}
				},
				check(Evt, player) {
					let history = player.getHistory('useCard');
					let num = 0;
					for (let i = 0; i < history.length; i++) {
						if (get.type2(history[i].card) != 'basic') num++;
					}
					if (player.hasUnknown(1)) return false;
					return num >= 3;
				},
				content: [() => {
					let history = player.getHistory('useCard'), num = 0;
					for (let i = 0; i < history.length; i++) {
						if (get.type2(history[i].card) != 'basic') num++;
					}
					Evt.num = num;
					player.$.shili = true;
					player.awakenSkill('shili');
					player.chooseTarget(`『拾璃』：令一名角色摸${get.cnNumber(Evt.num)}张牌并执行一个额外的出牌阶段`, true, function (card, player, target) {
						return target.isIn();
					}).set('num', Evt.num).ai = function (target) {
						let att = get.$a(_status.event.player, target);
						return att * _status.event.num;
					};
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						Evt.target.draw(Evt.num);
					} else Evt.finish();
				}, () => {
					Evt.target.phaseUse();
				}],
			},
			//西魔幽
			akjianwu: {
				trigger: { player: ['useCard', 'respond'] },
				priority: 5,
				filter(Evt, player) {
					let logTarget = get.copy(lib.skill.akjianwu.logTarget);
					let target = logTarget(Evt, player);
					return get.type(Evt.card) == 'basic' && player.canCompare(target);
				},
				check(Evt, player) {
					let logTarget = get.copy(lib.skill.akjianwu.logTarget);
					let target = logTarget(Evt, player);
					return get.$a(player, target) < 0 || Evt.card.name == 'tao';
				},
				logTarget(Evt, player) {
					if (Evt.name == 'respond') return Evt.source;
					if (['sha', 'qi', 'jiu', 'tao'].includes(Evt.card.name)) return Evt.targets[0];
					if (Evt.respondTo) return Evt.respondTo[0];
				},
				content: [() => {
					let logTarget = get.copy(lib.skill.akjianwu.logTarget);
					let target = logTarget(trigger, player);
					Evt.target = target;
					player.chooseToCompare(Evt.target);
				}, () => {
					if (result.winner && result.loser) {
						[Evt.winner, Evt.loser, Evt.card] = [result.winner, result.loser, trigger.card];
						let list = [`于${get.$t(Evt.card)}结算后获得之`, '展示并获得对方的一张牌'], check = 1;
						if (Evt.card.cards && get.value(Evt.card.cards, Evt.winner, 'raw') > Evt.loser.countGainableCards(Evt.winner, 'he')) check = 0;
						Evt.winner.chooseControlList(list, true, function (Evt, player) {
							return _status.event.check;
						}).set('check', check);
					} else Evt.finish();
				}, () => {
					switch (result.index) {
						case 0: {
							if (Evt.card.cards && Evt.card.cards.length) {
								let next = game.createEvent('akjianwu_gain2');
								Evt.next.remove(next);
								trigger.after.push(next);
								[next.player, next.cards] = [Evt.winner, Evt.card.cards];
								next.setContent(lib.skill.akjianwu.akjianwu_gain2);
							}
							Evt.finish();
							break;
						}
						case 1: {
							if (Evt.loser.countGainableCards(Evt.winner, 'he') > 0)
								Evt.winner.gainPlayerCard(Evt.loser, 'he', true, 'visibleMove');
							break;
						}
					}
				}, () => {
					if (result.links) {
						Evt.winner.chooseToUse({
							cards: result.links,
							filterCard(card) {
								if (get.itemtype(card) != 'card' || !_status.event.cards || !_status.event.cards.includes(card)) return false;
								if (lib.filter.filterCard.apply(this, arguments)) {
									if (card.name == 'sha') return true;
									let range = get.select(get.info(card).selectTarget);
									if (range[0] == 1 && range[1] == 1) return true;
								}
							},
							prompt: '是否使用获得牌中的一张？',
						});
					}
				}],
				akjianwu_gain2: [() => {
					Evt.gains = cards.filter(card => card.isInPile())
					if (Evt.gains.length) player.gain(cards, 'gain2');
				}, () => {
					player.chooseToUse({
						cards: Evt.gains,
						filterCard(card) {
							if (get.itemtype(card) != 'card' || !_status.event.cards || !_status.event.cards.includes(card)) return false;
							if (lib.filter.filterCard.apply(this, arguments)) {
								if (card.name == 'sha') return true;
								let range = get.select(get.info(card).selectTarget);
								if (range[0] == 1 && range[1] == 1) return true;
							}
						},
						prompt: '是否使用获得牌中的一张？',
					});
				}],
				ai: {
					threaten(player, target) {
						if (target.countCards('hs') >= 2) return 0.7;
					},
				}
			},
			tongzhao: {
				audio: true,
				group: 'P_SP',
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'yami',
				forceunique: true,
				trigger: { player: ['chooseToCompareAfter', 'compareMultipleAfter'], target: ['chooseToCompareAfter', 'compareMultipleAfter'] },
				filter(Evt, player) {
					if (!player.isDamaged()) return false;
					if (Evt.preserve) return false;
					if (Evt.result.tie) return true;
					if (player == Evt.player) {
						return Evt.num1 <= Evt.num2;
					} else {
						return Evt.num1 >= Evt.num2;
					}
				},
				check(Evt, player) {
					if (player.hasUnknown(1)) return Evt.result.tie;
					return player.countCards('hes') >= 4;
				},
				content: [() => {
					player.$.tongzhao = true;
					player.awakenSkill('tongzhao');
					if (trigger.result.tie) {
						Evt.num = 1;
					}
				}, () => {
					let list;
					if (_status.characterlist) {
						list = [];
						for (let i of _status.characterlist) {
							let info = lib.character[i];
							if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
						}
					} else if (_status.connectMode) {
						list = get.charactersOL(function (i) {
							let info = lib.character[i];
							return !(info[1] == 'psp' || info[4].includes('P_SP'));
						});
					} else {
						list = get.gainableCharacters(function (info) {
							return info[1] == 'psp' || info[4].includes('P_SP');
						});
					}
					let players = game.players.concat(game.dead);
					for (let i = 0; i < players.length; i++) {
						if (players[i] != player && players[i].group && players[i].group == 'psp') {
							list.add(players[i].name);
							list.add(players[i].name1);
							list.add(players[i].name2);
						}
					}
					list.remove(player.name);
					list.remove(player.name1);
					list.remove(player.name2);
					list.remove('AkumaYuu');
					if (list.length) {
						player.chooseButton(true).set('ai', function (button) {
							return 5 || get.rank(button.link, true) - lib.character[button.link][2];
						}).set('createDialog', ['『同召』：获得其中一名角色的所有技能', [list.randomGets(3), 'character']]);
					} else Evt.finish();
				}, () => {
					if (result.links?.length) {
						for (let i of result.links) {
							if (_status.characterlist) {
								_status.characterlist.remove(result.links[i]);
							}
							let skills = lib.character[i][3];
							for (let j of skills) {
								player.addTempSkill(j, { player: ['loseHpAfter', 'damageAfter'] });
							}
						}
						if (!player.$.tongzhao_wangzuo) player.$.tongzhao_wangzuo = [];
						player.$.tongzhao_wangzuo.addArray(result.links);
						player.$.P_SP.addArray(result.links);
						player.flashAvatar('tongzhao', result.links[0]);
						player.addTempSkill('tongzhao_wangzuo', { player: ['loseHpAfter', 'damageAfter'] });
						player.markSkill('P_SP');
					}
				}, () => {
					if (Evt.num > 0) {
						Evt.num--;
						Evt.goto(1);
					}
				}],
				subSkill: {
					wangzuo: {
						onremove(player, skill) {
							let storage = player.getStorage(skill)
							if (player.hasSkill('P_SP', null, null, false) && storage.length) {
								if (_status.characterlist) _status.characterlist.addArray(storage);
								player.$.P_SP.removeArray(storage);
								if (player.$.P_SP.length == 0) {
									player.unmarkSkill('P_SP');
								} else {
									player.markSkill('P_SP');
								}
								delete player.$[skill]
							}
						}
					}
				}
			},
			//莲汰
			langfei: new toSkill('trigger', {
				filter(Evt, player) {
					return get.type(Evt.card) === 'trick' && get.tag(Evt.card, 'damage');
				},
				content() {
					trigger.baseDamage++;
				},
				usable: 1
			}).setT('useCard'),
			xieyun: new toSkill('trigger', {
				animationColor: 'yami',
				filter(Evt, player) {
					return game.countPlayer(cur => {
						let skills = cur.getSkills(null, false, false);
						for (let i of skills) {
							if (i != 'xieyun' && lib.skill[i].limited && cur.awakenedSkills.contains(i)) {
								return true
							}
						}
					})
				},
				check(Evt, player) {
					return game.countPlayer(cur => {
						let skills = cur.getSkills(null, false, false);
						for (let i of skills) {
							if (i != 'xieyun' && lib.skill[i].limited && cur.awakenedSkills.contains(i)) {
								return get.$a(player, cur) >= 0
							}
						}
					})
				},
				content: [() => {
					player.awakenSkill('xieyun');
					player.chooseTarget('选择『协韵』的目标', true, (card, player, tar) => {
						let skills = tar.getSkills(null, false, false);
						for (let i of skills) {
							if (i != 'xieyun' && lib.skill[i].limited && tar.awakenedSkills.contains(i)) {
								return true
							}
						}
					}, (tar) => {
						return get.$a(player, tar) + 1
					});
				}, () => {
					if (result?.targets?.length) {
						Evt.target = result.targets[0]
						let list = [];
						let skills = Evt.target.getSkills(null, false, false);
						for (let i of skills) {
							if (i != 'xieyun' && lib.skill[i].limited && Evt.target.awakenedSkills.contains(i)) {
								list.push(i);
							}
						}
						if (list.length == 1) {
							Evt.target.restoreSkill(list[0]);
							player.addSkill(list[0])
						}
						else if (list.length > 1) {
							player.chooseControl(list).set('prompt', '选择一个限定技重置之');
						}
						else {
							Evt.finish();
						}
					}
					else Evt.finish()
				}, () => {
					Evt.target.restoreSkill(result.control);
					player.addSkill(result.control)
				}]
			}, 'unique', 'limited', 'skillAnimation', 'forceunique').setT('phaseUseBegin'),
			//YY
			bianshi: {
				trigger: { global: 'phaseBegin' },
				priority: 23,
				direct: true,
				filter(Evt, player) {
					return Evt.player.hp >= player.hp && player.countCards('h', card => !card.hasGaintag('ming_'));
				},
				content: [() => {
					let check = get.$a(player, trigger.player) <= 0 && trigger.player.countCards('h') >= 2;
					player.chooseCard('h', get.$pro2('bianshi'), card => !card.hasGaintag('ming_')).set('ai', card => {
						if (_status.event.check && get.type2(card) != 'equip') return 8 - get.value(card) + Math.random();
						else return 0;
					}).set('check', check);
				}, () => {
					if (result.bool) {
						Evt.target = trigger.player;
						player.showCards(result.cards, '『辨识』亮出手牌');
						player.addGaintag(result.cards, 'ming_bianshi');
						game.delayx();
						player.logSkill('bianshi', Evt.target);
						Evt.target.$.bianshi2 = get.type2(result.cards[0]);
						Evt.target.addTempSkill('bianshi2');
					}
				}]
			},
			bianshi2: {
				trigger: { global: ['loseEnd', 'cardsDiscardEnd'] },
				filter(Evt, player) {
					let record = player.$.bianshi2;
					return Evt.cards && Evt.cards.filter(card => get.position(card, true) == 'd' && get.type2(card) == record).length > 0;
				},
				forced: true,
				mark: true,
				intro: { content: '指定的类型：$' },
				onremove: ['bianshi', 'bianshi2'],
				content: [() => {
					if (player.$.bianshi && player.$.bianshi >= 2) {
						player.chooseToDiscard('『辨识』弃牌', 'he', true);
						Evt.finish();
					} else {
						player.draw();
					}
				}, () => {
					if (!player.$.bianshi) player.$.bianshi = 1;
					else player.$.bianshi++;
				}, () => {
					if (player.$.bianshi === 2) player.loseHp();
				}]
			},
			ming_bianshi: {},
			//星汐
			zhuxing: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					Evt.cards = get.cards(7);
					let list1 = Evt.cards.slice(0), list2 = player.getCards('h').slice(0);
					let list: Dialogword = ['『铸星』：选择进行替换的牌'];
					if (list1.length) {
						list.push('牌堆顶牌');
						list.push([list1, 'card']);
					}
					if (list2.length) {
						list.push('你的手牌');
						list.push([list2, 'card']);
					}
					list.push('hidden');
					Evt.list1 = list1;
					Evt.list2 = list2;
					let next = player.chooseButton(list, true).set('complexSelect', true);
					next.set('selectButton', function (button) {
						let ul = ui.selected.buttons.length;
						if (ul % 2 == 0) return [ul, ul + 1];
						return [ul + 2, ul + 2];
					});
					next.set('filterButton', function (button) {
						let evt = _status.event.getParent(), ul = ui.selected.buttons.length;
						if (ul > 0) {
							let pre = ui.selected.buttons[ul - 1].link;
							let now = button.link;
							if (evt.list2.includes(pre) && evt.list1.includes(now)) {
								return true;
							}
							if (evt.list1.includes(pre) && evt.list2.includes(now)) {
								return true;
							}
							return false;
						}
						return true
					});
					next.set('switchToAuto', function () {
						_status.event.result = 'ai';
					}).set('processAI', function () {
						let evt = _status.event.getParent(), links = [], player = evt.player;
						evt.list1.sort(function (a, b) {
							return get.useful(b, player) - get.useful(a, player);
						})
						evt.list2.sort(function (a, b) {
							return get.useful(a, player) - get.useful(b, player);
						})
						for (let i = 0; i < Math.min(evt.list2.length, evt.list1.length); i++) {
							if (get.useful(evt.list1[i], player) - get.useful(evt.list2[i], player) >= 0) links.push(evt.list1[i], evt.list2[i]);
						}
						return {
							bool: true,
							links: links,
						}
					});
				}, () => {
					if (result.bool) {
						Evt.cards1 = Evt.list1.filter(card => result.links.includes(card));
						Evt.cards2 = Evt.list2.filter(card => result.links.includes(card));
						Evt.num = Evt.cards1.length;
						player.lose(Evt.cards2, ui.special);
						player.gain(Evt.cards1, 'draw');
					} else Evt.finish();
				}, () => {
					let cards = Evt.cards.map(card => Evt.cards1.includes(card) ? Evt.cards2[Evt.cards1.indexOf(card)] : card)
					while (cards.length) {
						ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
					}
				}],
				ai: {
					order(item, player) {
						if (player.isDamaged() && player.countCards('he') >= 3) return 9;
						return 4;
					},
					result: {
						player(player, target) {
							return 1;
						},
					},
				},
			},
			shanzhu: {
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'yami',
				forceunique: true,
				trigger: { player: ['phaseJieshuBegin'] },
				filter(Evt, player) {
					if (!player.isDamaged()) return false;
					let cards = [];
					return player.getHistory('useCard', evt => {
						cards.addArray(evt.cards);
					});
					return cards.length;
				},
				check(Evt, player) {
					let cards = [];
					return player.getHistory('useCard', evt => {
						cards.addArray(evt.cards);
					});
					return cards.length > 4;
				},
				content() {
					player.$.shanzhu = true;
					player.awakenSkill('shanzhu');
					let cards = [];
					player.getHistory('useCard', evt => {
						cards.addArray(evt.cards);
					})
					player.gain(cards, 'gain2', 'log');
				},
			},

			P_SP: new toSkill('mark',{
				marktext: 'P',
				intro: {
					onunmark(storage, player) {
						if (_status.characterlist) _status.characterlist.addArray(storage);
						storage = [];
					},
					mark(dialog, storage, player) {
						if (storage && storage.length) {
							dialog.addText(`已叠加：${get.cnNumber(storage.length)}位P-SP角色`);
							dialog.addSmall([storage, 'character']);
						}
					},
					content(storage, player) {
						return `已叠加：${get.cnNumber(storage.length)}位P-SP角色`
					},
					markcount(storage, player) {
						if (storage && storage.length) return storage.length;
						return 0;
					}
				},
			}).setI([]),
			//机萪
			qianjiwanbian: {
				audio: 4,
				trigger: { source: 'damageAfter', player: 'phaseBegin' },
				priority: 199,
				frequent: true,
				group: ['qianjiwanbian_change', 'qianjiwanbian_clear'],
				filter(Evt, player) {
					if (Evt.name == 'damage' && Evt.getParent() && Evt.getParent().name != "trigger" && Evt.getParent(2) && Evt.getParent(2).qianjiwanbian) return false;
					return true;
				},
				gainable: ['前', '千', '钱', '签', '欠', '浅', '迁', '倩', '谦', '倩', '牵', '乾', '铅', '遣', '仟', '纤', '黔', '嵌', '钳', '歉', '虔', '谴', '堑',
					'技', '级', '及', '机', '祭', '集', '籍', '基', '即', '记', '急', '吉', '寄', '季', '极', '继', '计', '纪', '姬', '己',
					'挤', '剂', '济', '积', '击', '肌', '忌', '棘', '疾', '激', '际', '系', '寂', '迹', '脊', '辑', '藉', '稷', '戟', '骑', '悸', '觊', '嫉',
					'完', '玩', '晚', '碗', '万', '湾', '丸', '弯', '婉', '挽', '腕', '顽', '绾', '蜿', '宛',
					'边', '变', '便', '编', '遍', '扁', '辩', '鞭', '辨', '贬', '匾', '辫',
				],
				content: [() => {
					if (!player.$.qianjiwanbian_change) player.$.qianjiwanbian_change = 'thunder';
					let list = lib.linked.slice(0);
					list.remove('kami');
					list.remove(player.$.qianjiwanbian_change);
					Evt.map = {};
					for (let i = 0; i < list.length; i++) {
						Evt.map[get.rawName(list[i])] = list[i];
						list[i] = get.rawName(list[i]);
					}
					list.push('取消');
					player.chooseControl('dialogcontrol', list).set('ai', function () {
						return list.randomGets();
					}).set('prompt', `『千机万变』：将（${get.rawName(player.$.qianjiwanbian_change)}）改写为：`);
				}, () => {
					if (result.control != '取消') {
						player.$.qianjiwanbian_change = Evt.map[result.control];
						let list = get.gainableSkills((info, skill) => {
							let name = get.$t(skill);
							for (let i = 0; i < name.length; i++) {
								if (lib.skill.qianjiwanbian.gainable.includes(name.substring(i, i + 1)))
									return !info.notemp && !player.hasSkill(skill);
							}
						});
						list.add('qianjiwanbian');
						player.discoverSkill(list);
					} else {
						Evt.finish();
					}
				}, () => {
					// list=list.randomGets(3);
					// Evt.skillai=function(){
					// 	return get.max(list,get.skillRank,'item');
					// };
					let link = result.skill;
					if (link) {
						if (trigger.getParent().name != "trigger" && !trigger.getParent(2).qianjiwanbian) trigger.getParent(2).qianjiwanbian = true;
						if (link != 'qianjiwanbian') {
							player.addAdditionalSkill('qianjiwanbian', link, true);
							player.addSkillLog(link);
						}
						if (player.$.qianjiwanbian_clear === true && Evt.reapeat != true) {
							Evt.reapeat = true;
							Evt.goto(2);
						}
						if (link == 'qianjiwanbian' && player.$.qianjiwanbian_clear != true) {
							game.playAudio('skill', 'qianjiwanbian_mua');
							player.$.qianjiwanbian_clear = true;
							game.log(player, '改写了', '#y『千机万变』');
						}
					}
				}],
				ai: {
					effect: {
						player(card, player, target) {
							if (get.tag(card, 'damage')) return [1, 0.5];
						},
					},
					threaten: 3,
				},
				subSkill: {
					change: new toSkill('trigger',{
						trigger: { source: 'damageBegin2' },
						priority: 199,
						prompt(Evt) {
							let str = `可以将本次对${get.$t(Evt.player)}造成的伤害改为（${get.rawName(_status.event.player.$.qianjiwanbian_change)}）属性`;
							return str;
						},
						filter(Evt, player) {
							return player.$.qianjiwanbian_change && Evt.nature != player.$.qianjiwanbian_change;
						},
						content() {
							trigger.nature = player.$.qianjiwanbian_change;
						}
					}).setI([]),
					clear: {
						audio: 4,
						trigger: { player: 'phaseBegin' },
						priority: 200,
						forced: true,
						silent: true,
						filter(Evt, player) {
							return true;
						},
						content() {
							player.$.qianjiwanbian_clear = false;
							player.removeAdditionalSkill('qianjiwanbian');
						}
					}
				}
			},
			//清则子
			ze: {
				intro: {
					name: '『梦桓』：则',
					content: 'cards',
					onunmark: 'throw',
				},
				locked: true,
				cardAround: true,
			},
			menghuan: {
				forced: true,
				priority: 10,
				trigger: {
					global: ['gameStart', 'judgeEnd'],
					player: 'enterGame',
				},
				filter(Evt, player) {
					if (Evt.name == 'judge') return get.position(Evt.result.card, true) == 'o';
					return true;
				},
				content: [() => {
					Evt.cards = trigger.name == 'judge' ? [trigger.result.card] : get.cards();
					game.cardsGotoSpecial(Evt.cards)
					player.markAuto('ze', Evt.cards);
					player.$gain2(Evt.cards);
				}, () => {
					if (player.getStorage('ze').length > 6) {
						let discard = player.getStorage('ze').splice(0, 1);
						game.cardsDiscard(discard);
						player.markSkill('ze');
					}
				}],
				mod: {
					aiOrder(player, card, num) {
						let card0 = player.getStorage('ze')[player.getHistory('useCard').length];
						if (card0 && (get.suit(card0) == get.suit(card) || get.type2(card0) == get.type2(card))) return num + 4;
					},
				},
				group: ['ze', 'menghuan_drawBy'],
				subSkill: {
					drawBy: {
						trigger: { player: ['useCard'] },
						forced: true,
						filter(Evt, player) {
							if (player.getStorage('ze')) {
								let card = player.getStorage('ze')[player.getHistory('useCard').length - 1];
								return card && (get.suit(card) == get.suit(Evt.card) || get.type2(card) == get.type2(Evt.card));
							}
						},
						content() {
							player.draw();
						},
					}
				}
			},
			gengu: {
				trigger: { player: 'changeHp' },
				direct: true,
				filter(Evt, player) {
					return player.countCards('h');
				},
				content: [() => {
					player.chooseTarget(get.$pro2('gengu')).set('ai', function (target) {
						let player = _status.event.player;
						let att = get.$a(player, target);
						if (!target.countCards('he')) return 0;
						if (target.hasCardAround()) return att - 1;
						return -att;
					});
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('gengu', Evt.target);
						Evt.target.judge(card => {
							if (get.color(card) == 'black' && !_status.event.player.hasCardAround()) return -2;
							return 0;
						}).callback = lib.skill.gengu.callback;
					}
				}],
				callback: [() => {
					if (Evt.judgeResult.color == 'black') {
						if (player.hasCardAround()) {
							player.chooseCard('he', true, '『亘古』：重铸一张牌').ai = get.unuseful3;
						} else {
							player.chooseToDiscard('he', true);
						}
					}
				}, () => {
					if (result.bool && result.cards) {
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw(result.cards.length);
					}
				}],
			},
			//笙歌
			di: {
				init(player, skill) {
					if (!player.$[skill]) {
						player.$[skill] = {
							left: [],
							right: []
						};
					}
				},
				locked: true,
				intro: {
					mark(dialog, content, player) {
						if (player.$.di.left && player.$.di.left.length) {
							let list = player.$.di.left.slice(0);
							dialog.addText('左侧「笛」');
							dialog.addSmall(list);
						}
						if (player.$.di.right && player.$.di.right.length) {
							let list = player.$.di.right.slice(0);
							dialog.addText('右侧「笛」');
							dialog.addSmall(list);
						}
					},
					content: 'cards',
					onunmark(storage, player) {
						if ((storage && storage.left && storage.left.length) || (storage && storage.right && storage.right.length)) {
							let cards = storage.left.concat(storage.right);
							player.$throw(cards, 1000);
							game.cardsDiscard(cards);
							game.log(cards, '被置入了弃牌堆');
							storage.left.length = 0;
							storage.right.length = 0;
						}
					},
				},
				cardAround: ['left', 'right'],
			},
			dixian: {
				enable: 'phaseUse',
				usable: 1,
				content: [() => {
					player.chooseControl('左侧', '右侧').set('prompt', '『笛鲜』：选择将牌堆顶牌置于').set('ai', function () {
						let player = _status.event.player;
						if (player.getStorage('di').left > 3) return 1;
						return 0;
					});
				}, () => {
					Evt.cards = get.cards();
					if (result.control == '左侧') {
						lib.skill.dixian.process(player, Evt.cards[0], 'left');
					} else {
						lib.skill.dixian.process(player, Evt.cards[0], 'right');
					}
				}],
				process(player, card, method) {
					let storage = player.getStorage('di');
					if (storage.left && storage.right) {
						let num = 0, left = [], right = [];
						switch (method) {
							case 'use':
								for (let i of storage.left) {
									if (get.type(card) == get.type(i)) {
										left.push(i);
										player.$give(i, player, false);
										player.gain(i, 'log');
										num++;
									}
								}
								for (let i of storage.right) {
									if (get.type(card) == get.type(i)) {
										right.push(i);
										player.$give(i, player, false);
										player.gain(i, 'log');
										num++;
									}
								}
								break;
							case 'left':
								player.$drawAuto(card);
								storage[method].add(card);
								for (let i of storage.right) {
									if (get.color(card) == get.color(i)) {
										right.push(i);
										player.$give(i, player, false);
										player.gain(i, 'log');
										num++;
									}
								}
								break;
							case 'right':
								player.$drawAuto(card);
								storage[method].add(card);
								for (let i of storage.left) {
									if (get.color(card) == get.color(i)) {
										left.push(i);
										player.$give(i, player, false);
										player.gain(i, 'log');
										num++;
									}
								}
								break;
						}
						storage.left.removeArray(left);
						storage.right.removeArray(right);
						player.markSkill('di');
						if (num >= 3) player.useSkill('dixian');
					}
				},
				ai: {
					order: 4,
					result: {
						player: 1,
					},
				},
				group: ['di', 'dixian_useCard'],
				subSkill: {
					useCard: {
						trigger: { player: 'useCardAfter' },
						direct: true,
						priority: 545,
						content() {
							lib.skill.dixian.process(player, trigger.cards[0], 'use');
						},
					}
				}
			},
			gumei: {
				trigger: { player: 'useCard' },
				frequent: true,
				filter(Evt) {
					return get.type2(Evt.card) == 'trick' && Evt.card.isCard;
				},
				content: [() => {
					player.chooseTarget(get.$pro2('gumei')).set('ai', function (target) {
						let player = _status.event.player;
						let att = get.$a(player, target);
						if (target.hasCardAround()) return att - 1;
						return -att;
					});
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('gumei', Evt.target);
						if (Evt.target.hasCardAround()) {
							Evt.target.draw();
						} else {
							Evt.target.link();
						}
					}
				}],
				ai: {
					threaten: 1.4,
					noautowuxie: true,
				}
			},

			//诸葛哀汐
			kaituan: new toSkill('regard', {
				viewAs: { name: 'guohe' },
				filter(Evt, player) {
					return player.countCards('hs')
				},
				filterCard(card, player) {
					return get.number(card) < 5;
				},
			}, 'enable:chooseToUse'),
			gehuang: new toSkill('trigger', {
				filter(Evt, player) {
					console.log(Evt)
					return get.type2(Evt.card) === 'trick';
				},
				intro: { content: '鸽簧：#' },
				content() {
					let num = game.countPlayer(cur => player.inRange(cur))
					if (player.storage.gehuang && player.storage.gehuang != num) {
						player.draw(Math.abs(player.storage.gehuang - num))
					}
					player.storage.gehuang = num;
					player.markSkill('gehuang');
				},
				group: 'gehuang_addDam',
				subSkill: {
					addDam: new toSkill('trigger', {
						filter(Evt, player) {
							return player.storage.gehuang === player.hp;
						},
						content() {
							trigger.num++;
						}
					}, 'forced').setT({ source: 'damageBegin' }),
				}
			}, 'forced').setT('useCard1'),
			susi: new toSkill('active', {
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					player.awakenSkill('susi')
					game.filterPlayer(cur => {
						if (cur.group === target.group) {
							cur.addTempSkill('susi_enable', 'none');
							game.broadcastAll((splayer) => {
								splayer.out('susi_enable');
							}, cur)
						}
					})
				}, () => {
					game.delay(2)
				}],
				ai: {
					order: 11,
					result: {
						player: -3,
						target: 1
					}
				}
			}, 'unique', 'limited', 'skillAnimation', 'filterTarget'),
			susi_enable: new toSkill('rule', {
				filter(Evt, player) {
					game.broadcastAll(function (splayer) {
						splayer.in('susi_enable');
					}, player)
					return true;
				},
				intro: {
					content: '移除游戏外'
				},
				content() {
					game.broadcastAll(function (splayer) {
						_status.dying.remove(splayer);
					}, player)
					player.removeSkill('dunzou_enable');
				}
			}, 'mark', 'direct').setT({ global: 'phaseEnd' }),
			//胡桃Usa
			jidou: new toSkill('trigger', {
				filter(Evt, player) {
					if (!(Evt.card.name == 'juedou')) return false;
					// return player==Evt.target||Evt.getParent().triggeredTargets3.length==1;
					return player == Evt.target || Evt.getParent().targets.length == 1;
				},
				content() {
					player.draw((player.hp === 1 || player.countCards('h') === 0) ? 3 : 1)
				},
			}, 'forced').setT({ player: 'useCardToPlayered', target: 'useCardToTargeted' }),
			duotian: new toSkill('active', {
				filter(Evt, player) {
					return lib.skill.duotian.computedCard().length && player.countCards('hs', { type: 'basic' });
				},
				computedCard() {
					let list = get.inpile('trick2', card => {
						let info = lib.card[card];
						if (!info) return false
						if (info.toself === true) return true
						if ((info.selectTarget && info.selectTarget !== 1)
							|| info.notarget || info.multitarget) return false;
						return true;
					});
					return list;
				},
				chooseButton: {
					dialog(Evt, player) {
						let list = lib.skill.duotian.computedCard();
						return ui.create.dialog('『堕天』选择转化的锦囊', [list, 'vcard']);
					},
					filter(button, player) {
						return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check(button) {
						return _status.event.player.getUseValue({ name: button.link[2] });
					},
					backup(links, player) {
						return {
							popname: true,
							position: 'hs',
							viewAs: { name: links[0][2] },
							check(card) {
								return 6 - get.value(card);
							},
							filterCard(card) {
								return get.type(card) == 'basic';
							},
							onuse(result, player) {
								let num = result.card.number
								let targets = result.targets
								if (num) {
									if (num >= 6 && get.type(result.card) !== 'delay') {
										/**增加目标 */
										let next = game.createEvent('duotianChangeTarget')
										next.player = player
										next._trigger = result
										next.setContent([() => {
											player.chooseTarget(get.$pro('duotian'), `为${get.$t(trigger.card)}增加一个目标`,
												(card, player, target) => !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target))
												.set('ai', target => {
													let player = _status.event.player, source = _status.event.source;
													return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
												}).set('targets', trigger.targets).set('card', trigger.card).set('source', player);
										}, () => {
											if (result.bool) {
												if (!Evt.isMine() && !_status.connectMode) game.delayx();
												Evt.target = result.targets[0];
											}
											else {
												Evt.finish();
											}
										}, () => {
											player.logSkill('duotian', Evt.target);
											trigger.targets.push(Evt.target);
										}]);
									}
									if (num >= 12) {
										/**追加阶段 */
										let evt = _status.event.getParent('phaseUse')
										if (evt && evt.name === 'phaseUse') {
											let next = game.createEvent('duotianExtraStage');
											next.player = player;
											next.setContent(function () {
											}, () => {
												game.delay(1)
												player.setAvatar('KurumiUsa', 'KurumiUsa1')
											}, () => {
												player.popup('额外出牌')
												game.delay(0.5)
											}, () => {
												player.phaseUse()
											}, () => {
												player.setAvatar('KurumiUsa', 'KurumiUsa')
											});
											_status.event.next.remove(next);
											evt.after.push(next);
										}
									}
								}
							}
						};
					},
					prompt(links, player) {
						return `将一张基本牌当做【${get.$t(links[0][2])}】使用`;
					}
				},
				ai: {
					order: 5,
					result: {
						player: 1
					}
				}
			}).set('usable', 1),
			//七濑Unia
			qisui: new toSkill('trigger', {
				filter(Evt, player) {
					let targets = lib.skill.qisui.logTarget(Evt, player)
					return targets.length
				},
				check(Evt, player) {
					let targets = lib.skill.qisui.logTarget(Evt, player)
					let num = 0
					targets.forEach(target => {
						num += get.$a(player, target)
					});
					return num >= 0
				},
				logTarget(Evt, player) {
					let targets = [];
					if (_status.currentPhase === player) targets.push(Evt.player)
					if (Evt.player === player && Evt.source?.isIn()) targets.push(Evt.source)
					targets.removeArray(player.$.qisui)
					return targets
				},
				content() {
					let targets = lib.skill.qisui.logTarget(trigger, player)
					targets.forEach(tar => {
						player.$.qisui.add(tar)
						if (!tar.hasSkill('lingjun')) tar.addTempSkill('lingjun', { player: 'juedouBegin' })
						else trigger.num++
					});
				},
				group: 'qisui_clear',
				subSkill: {
					clear: new toSkill('trigger', {
						content() {
							player.$.qisui.length = []
							if (player.hasSkill('lingjun')) player.setAvatar('NanaseUnia', 'NanaseUnia1')
							else player.setAvatar('NanaseUnia', 'NanaseUnia')
						}
					}, 'direct', 'silent').setT({ global: 'phaseAfter' }),
				},
				derivation: 'lingjun'
			}).setT({ global: 'drawBegin' }).setI([]),
			lingjun: new toSkill('mark', {
				marktext: '军',
				intro: {
					content: '手牌中的【杀】视为【决斗】'
				},
				mod: {
					cardname(card, player, name) {
						if (get.position(card) === 'h' && name === 'sha') return 'juedou'
					}
				}
			}, 'mark'),
			//玛安娜Myanna
			yemo: new toSkill('active', {
				filter(event, player) {
					return player.countDisabled() < 5;
				},
				chooseButton: {
					dialog(event, player) {
						return ui.create.dialog('###夜魔###' + lib.translate.yemo_info);
					},
					chooseControl(event, player) {
						var list = [];
						for (var i = 1; i < 6; i++) {
							if (!player.isDisabled(i)) list.push('equip' + i);
						}
						list.push('cancel2');
						return list;
					},
					check(event, player) {
						for (var i = 5; i > 0; i--) {
							if (player.isEmpty(i)) return ('equip' + i);
						}
						return 'cancel2';
					},
					backup(result) {
						var next = get.copy(lib.skill.yemox);
						next.position = result.control;
						return next;
					},
				},
				ai: {
					order: 1,
					result: {
						player(player) {
							if (game.hasPlayer(function (target) {
								if (player == target) return false;
								var hs = target.countCards('h');
								return hs > 2 && get.$a(player, target) <= 0 && !target.hasSkill('linghun');
							})) return 1;
							return 0;
						},
					},
				},
				derivation: 'linghun'
			}),
			yemox: {
				audio: 'yemo',
				content: [() => {
					player.draw()
				}, () => {
					player.disableEquip(lib.skill.yemo_backup.position);
				}, () => {
					if (player.isAlive()) {
						player.chooseTarget(true, '选择一名角色获得『灵昏』直到其下一次使用【决斗】，若其已有『灵昏』，改为弃置其区域内的一张牌').set('ai', (target) => {
							let player = _status.event.player
							if (!target.hasSkill('linghun')) return get.$a(player, target) <= 0
							return get.effect(target, { name: 'guohe_copy' }, player, player)
						});
					}
					else
						Evt.finish();
				}, () => {
					if (result.bool && result.targets?.length) {
						let target = Evt.target = result.targets[0]
						if (!target.hasSkill('linghun')) target.addTempSkill('linghun', { player: 'juedouBegin' })
						else player.discardPlayerCard('hej', true, target);
					}
					else
						Evt.finish();
				}],
			},
			linghun: new toSkill('mark', {
				marktext: '昏',
				intro: {
					content: '手牌中的【闪】视为【决斗】'
				},
				mod: {
					cardname(card, player, name) {
						if (get.position(card) === 'h' && name === 'shan') return 'juedou'
					}
				}
			}, 'mark'),
			jiaopin: new toSkill('trigger', {
				filter(Evt, player) {
					return player.isDamaged() && player.$.disableEquip != undefined && player.$.disableEquip.length > 0
				},
				logTarget: 'player',
				content() {
					player.chooseToEnable();
				},
			}).setT('phaseJieshuBegin'),
			//花花Haya
			shengping: new toSkill('trigger', {
				filter(Evt, player) {
					return Evt.player != player && Evt.result?.cards?.length
				},
				logTarget: 'player',
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0
				},
				content() {
					Evt.target = trigger.player
					game.asyncDraw([player, Evt.target])
				},
				ai: {
					effect: {
						target(card, player, target, cur) {
							if (target.hp < 0) {
								if (get.tag(card, 'discard') >= 1 && get.$a(target, player) > 0) return [1, 1, 1, 1];
							}
						}
					}
				},
			}).setT({ target: 'discardPlayerCardEnd' }),
			jiushuang: new toSkill('trigger', {
				filter(Evt, player) {
					return player.countDiscardableCards(Evt.player, 'hej') > 0;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player
					Evt.target.discardPlayerCard('hej', true, player)
				}, () => {
					if (result.links?.length) {
						let target = Evt.target
						if (!target.hasSkill('lingxun')) target.addTempSkill('lingxun', { player: 'juedouBegin' })
						else target.link();
					}
				}],
				derivation: 'lingxun'
			}).setT({ global: 'phaseBegin' }),
			lingxun: new toSkill('mark', {
				marktext: '醺',
				intro: {
					content: '手牌中的【酒】视为【决斗】'
				},
				mod: {
					cardname(card, player, name) {
						if (get.position(card) === 'h' && name === 'jiu') return 'juedou'
					}
				}
			}, 'mark'),
			//白桃shirako
			jufu: new toSkill('regard', {
				chooseButton: {
					dialog() {
						let list = [['锦囊', '', 'wuzhong'], ['锦囊', '', 'wugu']];
						return ui.create.dialog('咀福', [list, 'vcard']);
					},
					filter(button, player) {
						let evt = _status.event.getParent();
						if (evt?.filterCard) {
							return evt.filterCard({ name: button.link[2] }, player, evt);
						}
						return true;
					},
					backup(links, player) {
						return {
							filterCard: { name: 'tao' },
							position: 'hs',
							selectCard: 1,
							viewAs: { name: links[0][2], nature: links[0][3] },
						}
					},
					prompt(links, player) {
						return `将一张【桃】做当【${get.$t(links[0][2])}】使用`;
					},
				},
				filter(Evt, player) {
					return player.countCards('hs', 'tao');
				},
			}, 'enable:chooseToUse'),
			qihun: new toSkill('trigger', {
				filter(Evt, player) {
					return game.countPlayer(cur => cur != player && cur.countCards('h'));
				},
				content: [function () {
					player.chooseTarget(get.$pro2('qihun'), function (card, player, target) {
						return target !== player && target.countCards('h')
					}).set('ai', target => {
						let player = _status.event.player, att = get.$a2(target), reds = target.countCards('h', { color: 'red' })
						if (target.countCards('h', 'tao')) return -1.6 * reds * att
						else if (target.group === player.group) return reds * att
						return -0.4 * reds * att
					})
				}, function () {
					if (result?.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('qihun', Evt.target)
						Evt.target.showHandcards('『祈婚』展示手牌');
						Evt.cards = Evt.target.getCards('h', { color: 'red' })
					}
					else Evt.finish()
				}, function () {
					if (Evt.cards.length) {
						Evt.target.give(Evt.cards, player, true)
					}
					else Evt.finish()
				}, function () {
					if (Evt.cards.filter(card => card.name === 'tao').length === 0) {
						if (player.group === Evt.target.group) {
							Evt.target.draw(Evt.cards.length)
							Evt.finish()
						}
						else {
							player.chooseCard(`交给${get.$t(Evt.target)}${get.cnNumber(Evt.cards.length)}张牌`, 'he', true, Evt.cards.length).set('ai', card => get.unuseful3(card))
						}
					}
				}, function () {
					if (result.cards?.length) {
						player.give(result.cards, Evt.target, true)
					}
				}]
			}, 'direct').setT('phaseUseEnd'),
			//麟＆犀
			lilian: {
				trigger: { player: 'phaseBegin' },
				direct: true,
				filter(Evt, player) {
					return player.maxHp;
				},
				content: [() => {
					player.chooseTarget(get.$pro2('lilian')).set('ai', target => {
						let player = _status.event.player;
						return get.$a(player, target) - player.maxHp;
					});
				}, () => {
					if (result.bool) {
						player.logSkill('lilian', Evt.target);
						Evt.target = result.targets[0];
						Evt.target.draw(player.maxHp);
						game.delayx();
					} else Evt.finish();
				}, () => {
					let check = function () {
						for (let i = 0; i < game.players.length; i++) {
							if (game.players[i].isOut() || game.players[i] == player) continue;
							if (game.players[i].maxHp <= player.maxHp) return false;
						}
						return true;
					}();
					if (check) {
						player.setAvatar('linxi', 'linxi1');
					} else player.loseMaxHp();
					game.delayx();
				}],
			},
			zihuai: {
				trigger: { player: 'discardAfter' },
				priority: 199,
				frequent: true,
				round: 1,
				filter(Evt, player) {
					return player.$.zihuai_mark && Evt.cards.length >= player.$.zihuai_mark;
				},
				content() {
					player.draw(player.$.zihuai_mark);
				},
				group: ['zihuai_mark'],
				subSkill: {
					mark: {
						direct: true,
						locked: true,
						marktext: '🎶',
						intro: {
							content: '上一次于弃牌阶段弃置的牌数：#'
						},
						trigger: { player: 'phaseDiscardEnd' },
						filter(Evt, player) {
							let cards = [];
							player.getHistory('lose', evt => {
								if (evt?.type == 'discard' && evt.getParent('phaseDiscard') == Evt && evt.hs) cards.addArray(evt.cards);
							});
							return cards.length >= 1;
						},
						content() {
							let cards = [];
							player.getHistory('lose', evt => {
								if (evt?.type == 'discard' && evt.getParent('phaseDiscard') == trigger && evt.hs) cards.addArray(evt.cards);
							});
							player.$.zihuai_mark = cards.length;
							player.markSkill('zihuai_mark');
						},
					}
				}
			},
			//中国绊爱
			liying: {
				trigger: { player: ['damageEnd', 'respondEnd'] },
				direct: true,
				filter(Evt, player) {
					let source;
					if (Evt.name == 'damage') source = Evt.source;
					else if (Array.isArray(Evt.respondTo)) source = Evt.respondTo[0];
					if (source) {
						return source != player && source.countCards('he') && source.hp > 0;
					}
				},
				content: [() => {
					if (trigger.name == 'damage') Evt.target = trigger.source;
					else Evt.target = trigger.respondTo[0];
					Evt.num = Evt.target.hp;
					player.gainPlayerCard(get.$pro2('liying'), 'he', Evt.target, Evt.target.hp).set('logSkill', ['liying', Evt.target]);
				}, () => {
					if (result.bool && Evt.num > 1) {
						player.chooseCard('he', `将${get.cnNumber(Evt.num - 1)}张牌交给${get.$t(Evt.target)}`, Evt.num - 1, true);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards.length) {
						Evt.target.gain(result.cards, player, 'give');
						if (typeof player.$.fuyu == 'number') {
							player.$.fuyu += result.cards.length;
							player.markSkill('fuyu')
						}
						if (typeof player.$.liying != 'number') {
							player.$.liying = 0;
						}
						if (player.$.liying >= 0) {
							player.$.liying += result.cards.length;
							if (player.$.liying >= 2) {
								let list = [];
								let type = player.$.fuyu === true ? 'trick' : 'basic';
								for (let i of get.inpile(type)) {
									if (lib.filter.cardUsable({ name: i }, player, Evt.getParent()) && player.hasUseTarget(i)) {
										list.push([get.$t(type), '', i]);
										if (i == 'sha') {
											list.push(['基本', '', 'sha', 'fire']);
											list.push(['基本', '', 'sha', 'thunder']);
											list.push(['基本', '', 'sha', 'ice']);
										}
									}
								}
								if (list.length) {
									player.chooseButton(['是否视为使用其中一张牌？', [list, 'vcard']]).set('ai', function (button) {
										let player = _status.event.player;
										let card = { name: button.link[2], nature: button.link[3] };
										return player.getUseValue(card);
									});
								} else {
									Evt.finish();
								}
								player.$.liying = -1;
							} else {
								Evt.finish();
							}
						}
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links?.length) {
						let card = { name: result.links[0][2], nature: result.links[0][3] };
						player.chooseUseTarget(card, true);
					}
				}],
				ai: {
					maixie: true,
				},
				group: ['liying_clear'],
				subSkill: {
					clear: {
						trigger: { global: 'phaseNext' },
						direct: true,
						locked: true,
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							return player.$.liying;
						},
						content() {
							player.$.liying = 0;
						}
					},
				}
			},
			fuyu: new toSkill('trigger',{
				marktext: "谕",
				intro: {
					content: '已通过『立影』给出了&张牌',
				},
				trigger: { player: 'phaseZhunbeiBegin' },
				animationColor: 'thunder',
				filter(Evt, player) {
					return player.$.fuyu > 0 && player.$.fuyu % 4 == 0;
				},
				content() {
					player.loseMaxHp();
					player.$.fuyu = true;
					player.awakenSkill('fuyu');
				},
				ai: {
					combo: 'liying'
				}
			},'juexingji','skillAnimation','forced').setI(0),
			//山兔YamaUsagi
			zhengmeng: new toSkill('trigger', {
				filter(Evt, player) {
					return !Evt.numFixed;
				},
				check(Evt, player) {
					return player.countCards('h') >= 2;
				},
				content: [() => {
					trigger.changeToZero();
					player.turnOver();
				}, () => {
					player.throwDice();
				}, () => {
					player.draw(Evt.num);
					if (Evt.num === 6) {
						player.addMark('zhengmeng_addDamBy')
					}
				}],
				group: 'zhengmeng_addDamBy',
				subSkill: {
					addDamBy: new toSkill('trigger', {
						intro: {
							content: '【杀】伤害+#'
						},
						forced: true,
						popup: false,
						filter(Evt, player) {
							return ['sha'].contains(Evt.card.name) && player.countMark('zhengmeng_addDamBy');
						},
						content() {
							trigger.baseDamage += player.countMark('zhengmeng_addDamBy');
						}
					}).setT('useCard1'),
				}
			}).setT('phaseDrawBegin1'),
			wadao: new toSkill('trigger', {
				filter(Evt, player) {
					return !player.isTurnedOver();
				},
				content: [() => {
					player.chooseTarget(get.$pro('wadao2'), function (card, player, target) {
						return target !== player;
					}).ai = target => {
						return get.$a2(target);
					}
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('wadao', Evt.target);
						Evt.target.insertPhase();
					}
				}],
				ai: {
					expose: 0.3,
				}
			}, 'direct').setT('turnOverAfter'),
			//栗子酱
			tieyu: new toSkill('trigger',{
				intro: {
					content: '『铁驭』（）值偏差#',
				},
				frequent(Evt, player) {
					return get.type(Evt.card) == 'equip';
				},
				filter(Evt, player) {
					return (get.type(Evt.card) == 'equip' && (2 + player.$.tieyu > 0))
						|| player.countCards('he') > (3 + player.$.tieyu);
				},
				check(Evt, player) {
					return get.type(Evt.card) == 'equip';
				},
				content: [() => {
					if (get.type(trigger.card) == 'equip') {
						player.draw(2 + player.$.tieyu);
						Evt.finish();
					} else {
						player.chooseToDiscard(3 + player.$.tieyu, true, '『铁驭』：请弃牌')
					}
				}, () => {
					if (result.cards?.length) {
						let color = get.color(result.cards)
						switch (color) {
							case 'red':
								let card = trigger.card;
								let info = get.info(card);
								if (['basic', 'trick'].includes(info.type) && info.allowMultiple !== false
									&& trigger.targets && !info.multitarget) {
									if (game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(card, player, cur))) {
										let prompt2 = `为${get.$t(trigger.card)}增加至多两个目标`;
										player.chooseTarget([1, 2], get.$pro('tieyu'), function (card, player, target) {
											return !_status.event.targets.includes(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
										}).set('prompt2', prompt2).set('ai', function (target) {
											let player = _status.event.player;
											return get.effect(target, _status.event.card, player, player);
										}).set('card', card).set('targets', trigger.targets);
									}
								}
								break;
							case 'black':
								game.log(trigger.card, '的数值+1')
								trigger.baseDamage++;
								break;
							case 'none':
								player.$.tieyu--;
								player.markSkill('tieyu')
								if (2 - player.$.tieyu <= 0) player.setAvatar('RIKO', 'RIKO1');
								break;
						}
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						if (!Evt.isMine()) game.delayx();
						Evt.targets = result.targets;
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets) {
						player.logSkill('tieyu', Evt.targets);
						trigger.targets.addArray(Evt.targets);
					}
				}],
			}).setT('useCard2').setI(0),

			//新科娘
			daimao: {
				mod: {
					cardUsable(card, player, num) {
						if (!get.suit(card)) return
						let suits = get.suit3(player.getStorage('daimao_mark'))
						if (suits.includes(suits)) return true;
					},
					targetInRange(card, player, target) {
						if (!get.suit(card)) return
						let suits = get.suit3(player.getStorage('daimao_mark'))
						if (suits.includes(suits)) return true;
					}
				},
				enable: 'chooseToUse',
				skillAnimation: 'epic',
				locked: true,
				filter(Evt, player) {
					if (Evt.type != 'dying') return false;
					if (player != Evt.dying) return false;
					return player.countCards('hes', card => {
						if (player.getStorage('daimao_mark').filter(function (daimao) {
							return get.suit(daimao) == get.suit(card)
						}).length == 0) return true;
					});
				},
				filterCard(card, player) {
					if (player.getStorage('daimao_mark').filter(function (daimao) {
						return get.suit(daimao) == get.suit(card)
					}).length == 0) return true;
				},
				position: 'he',
				content: [() => {
					let audio = 'daimao_' + player.getStorage('daimao_mark').length;
					game.playAudio('skill', audio);
					game.broadcast(function (audio) {
						game.playAudio('skill', audio);
					}, audio);
					player.$give(cards, player);
					player.lose(cards, ui.special, 'toStorage');
					player.markAuto('daimao_mark', cards);
				}, () => {
					player.loseMaxHp();
				}, () => {
					player.recover(player.maxHp - player.hp);
				}, () => {
					player.draw(3);
				}],
				ai: {
					skillTagFilter(player) {
						if (player.hp > 0) return false;
					},
					save: true,
					result: {
						player: 3,
					},
					threaten(player, target) {
						if (player.getStorage('daimao_mark') <= 2) return 0.8;
					}
				},
				group: ['daimao_mark', 'daimao_start'],
				subSkill: {
					mark: {
						locked: true,
						intro: {
							name: '呆毛',
							content: 'cards',
							onunmark: 'throw',
						},
						cardAround: true
					},
					start: {
						forced: true,
						priority: 10,
						trigger: {
							global: 'gameStart',
							player: 'enterGame',
						},
						content() {
							if (!player.$.daimao_mark) player.$.daimao_mark = [];
							let cards = get.cards();
							game.cardsGotoSpecial(cards);
							player.$gain2(cards);
							player.markAuto('daimao_mark', cards);
						},
					}
				}
			},
			hongtou: {
				group: ['hongtou2', 'hongtou_shan'],
				unique: true,
				zhuSkill: true,
				filter(Evt, player) {
					if (!player.hasZhuSkill('hongtou') || !game.hasPlayer(cur => cur != player && cur.isGuoV())) return false;
					return !Evt.hongtou && (Evt.type != 'phase' || !player.hasSkill('hongtou3'));
				},
				enable: ['chooseToUse', 'chooseToRespond'],
				viewAs: { name: 'sha' },
				filterCard: () => false,
				selectCard: -1,
				ai: {
					order() {
						return get.order({ name: 'sha' }) + 0.3;
					},
					respondSha: true,
					skillTagFilter(player) {
						if (!player.hasZhuSkill('hongtou') || !game.hasPlayer(cur => cur != player && cur.isGuoV())) return false;
					},
				},
				subSkill: {
					shan: {
						unique: true,
						zhuSkill: true,
						trigger: { player: ['chooseToRespondBefore', 'chooseToUseBefore'] },
						filter(Evt, player) {
							if (Evt.responded) return false;
							if (player.$.hongtou_shaning) return false;
							if (!player.hasZhuSkill('hongtou_shan')) return false;
							if (!Evt.filterCard({ name: 'shan' }, player, Evt)) return false;
							return game.hasPlayer(cur => cur != player && cur.isGuoV());
						},
						check(Evt, player) {
							if (get.damageEffect(player, Evt.player, player) >= 0) return false;
							return true;
						},
						content() {
							"step 0"
							if (Evt.current == undefined) Evt.current = player.next;
							if (Evt.current == player) {
								Evt.finish();
							} else if (Evt.current.isGuoV()) {
								if ((Evt.current == game.me && !_status.auto) || (
									get.$a(Evt.current, player) > 2) ||
									Evt.current.isOnline()) {
									player.$.hongtou_shaning = true;
									let next = Evt.current.chooseToRespond(`是否替${get.$t(player)}打出一张闪？`, { name: 'shan' });
									next.set('ai', function () {
										let Evt = _status.event;
										return (get.$a(Evt.player, Evt.source) - 2);
									});
									next.set('skillwarn', `替${get.$t(player)}打出一张闪`);
									next.autochoose = lib.filter.autoRespondShan;
									next.set('source', player);
								}
							}
							"step 1"
							player.$.hongtou_shaning = false;
							if (result.bool) {
								Evt.finish();
								trigger.result = { bool: true, card: { name: 'shan', isCard: true } };
								trigger.responded = true;
								trigger.animate = false;
								if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
									Evt.current.ai.shown += 0.3;
									if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
								}
							} else {
								Evt.current = Evt.current.next;
								Evt.goto(0);
							}
						},
						ai: {
							respondShan: true,
							skillTagFilter(player) {
								if (player.$.hongtou_shaning) return false;
								if (!player.hasZhuSkill('hongtou_shan')) return false;
								return game.hasPlayer(cur => cur != player && cur.isGuoV());
							},
						},
					}
				}
			},
			hongtou2: {
				trigger: { player: ['useCardBegin', 'respondBegin'] },
				logTarget: 'targets',
				filter(Evt, player) {
					return Evt.skill == 'hongtou';
				},
				forced: true,
				content() {
					"step 0"
					delete trigger.skill;
					trigger.getParent().set('hongtou', true);
					"step 1"
					if (Evt.current == undefined) Evt.current = player.next;
					if (Evt.current == player) {
						player.addTempSkill('hongtou3');
						Evt.finish();
						trigger.cancel();
						trigger.getParent().goto(0);
					} else if (Evt.current.isGuoV()) {
						let next = Evt.current.chooseToRespond(`是否替${get.$t(player)}打出一张杀？`, { name: 'sha' });
						next.set('ai', function () {
							let { player, source } = _status.event;
							return (get.$a(player, source) - 2);
						});
						next.set('source', player);
						next.set('hongtou', true);
						next.set('skillwarn', `替${get.$t(player)}打出一张杀`);
						next.noOrdering = true;
						next.autochoose = lib.filter.autoRespondSha;
					} else {
						Evt.current = Evt.current.next;
						Evt.redo();
					}
					"step 2"
					if (result.bool) {
						Evt.finish();
						trigger.card = result.card;
						trigger.cards = result.cards;
						trigger.throw = false;
						if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
							Evt.current.ai.shown += 0.3;
							if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
						}
					} else {
						Evt.current = Evt.current.next;
						Evt.goto(1);
					}
				}
			},
			hongtou3: {
				trigger: { global: ['useCardAfter', 'useSkillAfter', 'phaseAfter'] },
				silent: true,
				charlotte: true,
				filter(Evt) {
					return Evt.skill != 'hongtou';
				},
				content() {
					player.removeSkill('hongtou3');
				}
			},
			//阿准
			tianqi: {
				forced: true,
				priority: 10,
				trigger: {
					global: 'gameStart',
					player: 'enterGame',
				},
				content() {
					let cards = get.cards();
					game.cardsGotoSpecial(cards);
					player.$gain2(cards);
					player.markAuto('tianqi_mark', cards);
					player.addSkill('tianqi_mark');
				},
			},
			tianqi_mark: {
				locked: true,
				intro: {
					name: '天气',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true
			},
			yubao: {
				trigger: { global: 'phaseZhunbeiBegin' },
				check(Evt, player) {
					return true;
				},
				filter(Evt, player) {
					return Evt.player.hasSkill('tianqi_mark');
				},
				frequent: true,
				content: [() => {
					Evt.num = game.countPlayer(cur => cur.hasSkill('tianqi_mark'));
					Evt.cards = get.cards(Evt.num);
					player.chooseCardButton(Evt.num, Evt.cards, '『预报』：按顺序将卡牌置于牌堆顶（先选择的在上）').set('ai', function (button) {
						let player = _status.event.player, next = _status.currentPhase, att = get.$a(player, next),
							card = button.link, judge = next.getCards('j')[ui.selected.buttons.length];
						if (judge) {
							return get.judge(judge)(card) * att;
						}
						return next.getUseValue(card) * att;
					}).set('phase', trigger.name)
				}, () => {
					let list;
					if (result.bool) {
						list = result.links.slice(0);
					} else {
						list = Evt.cards;
					}
					while (list.length) {
						ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
					}
				}],
			},
			butaizhun: {
				subSkill: { used: {} },
				group: ["butaizhun_guess", "butaizhun_respond", "butaizhun_wuxie"],
				enable: "chooseToUse",
				filter(Evt, player) {
					if (player.hasSkill('butaizhun_used')) return false;
					if (!player.countCards('h')) return false;
					let list = ['sha', 'shan', 'tao', 'jiu', 'taoyuan', 'wugu', 'juedou', 'huogong', 'jiedao', 'tiesuo', 'guohe', 'shunshou', 'wuzhong', 'wanjian', 'nanman', 'haixiao', 'langyong', 'qinshi'];
					if (get.mode() == 'guozhan') {
						list = list.concat(['xietianzi', 'shuiyanqijunx', 'lulitongxin', 'lianjunshengyan', 'chiling', 'diaohulishan', 'yuanjiao', 'huoshaolianying']);
					}
					for (let i = 0; i < list.length; i++) {
						if (Evt.filterCard({ name: list[i] }, player)) return true;
					}
					return false;
				},
				chooseButton: {
					dialog() {
						let list = [];
						for (let i = 0; i < lib.inpile.length; i++) {
							let name = lib.inpile[i];
							if (name == 'wuxie') continue;
							if (name == 'sha') {
								list.push(['基本', '', 'sha']);
								list.push(['基本', '', 'sha', 'fire']);
								list.push(['基本', '', 'sha', 'thunder']);
								list.push(['基本', '', 'sha', 'ice']);
							} else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
							else if (get.type(name) == 'basic') list.push(['基本', '', name]);
						}
						return ui.create.dialog('不太准', [list, 'vcard']);
					},
					filter(button, player) {
						let evt = _status.event.getParent();
						if (evt?.filterCard) {
							return evt.filterCard({ name: button.link[2] }, player, evt);
						}
						return true;
					},
					backup(links, player) {
						return {
							filterCard: true,
							selectCard: 1,
							viewAs: { name: links[0][2], nature: links[0][3] },
						}
					},
					prompt(links, player) {
						return `将一张手牌做当${get.$t(links[0][2])}使用`;
					},
				},
				ai: {
					save: true,
					respondShan: true,
					fireAttack: true,
					skillTagFilter(player) {
						if (player.hasSkill('butaizhun_used')) return false;
					},
					threaten: 1.2,
				},
			},
			butaizhun_guess: {
				audio: 2,
				trigger: {
					player: "useCardBefore",
				},
				filter(Evt, player) {
					return Evt.skill == "butaizhun_backup" || Evt.skill == "butaizhun_wuxie";
				},
				forced: true,
				direct: true,
				priority: 15,
				content: [() => {
					player.logSkill('butaizhun_guess');
					player.addTempSkill('butaizhun_used');
					player.popup(trigger.card.name, 'metal');
					player.lose(trigger.cards, ui.special);
					player.line(trigger.targets, trigger.card.nature);
					trigger.line = false;
					trigger.animate = false;
					Evt.prompt = `${get.$t(player)}声明了${get.$t(trigger.card.name)}，是否质疑？`;
					Evt.guessers = game.filterPlayer(cur => cur != player && !cur.hasSkill('tianqi_mark'));
					Evt.guessers.sort(lib.sort.seat);

					game.broadcastAll(card => {
						_status.guhuoNode = card.copy('thrown');
						if (lib.config.cardback_style != 'default') {
							_status.guhuoNode.style.transitionProperty = 'none';
							ui.refresh(_status.guhuoNode);
							_status.guhuoNode.classList.add('infohidden');
							ui.refresh(_status.guhuoNode);
							_status.guhuoNode.style.transitionProperty = '';
						} else {
							_status.guhuoNode.classList.add('infohidden');
						}
						_status.guhuoNode.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
						player.$throwordered2(_status.guhuoNode);
					}, trigger.cards[0]);


					Evt.onEnd01 = function () {
						_status.guhuoNode.removeEventListener('webkitTransitionEnd', Evt.onEnd01);
						_status.guhuoNode.style.transition = 'all ease-in 0.3s';
						_status.guhuoNode.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
						let onEnd = function () {
							_status.guhuoNode.classList.remove('infohidden');
							_status.guhuoNode.style.transition = 'all 0s';
							ui.refresh(_status.guhuoNode);
							_status.guhuoNode.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
							ui.refresh(_status.guhuoNode);
							_status.guhuoNode.style.transition = '';
							ui.refresh(_status.guhuoNode);
							_status.guhuoNode.style.transform = '';
							_status.guhuoNode.removeEventListener('webkitTransitionEnd', onEnd);
						}
						_status.guhuoNode.listenTransition(onEnd);
					};
				}, () => {
					if (Evt.guessers.length == 0) Evt.goto(3);
					else {
						Evt.guessers[0].chooseControl('质疑', '不质疑').set('prompt', Evt.prompt).set('ai', function () {
							if (get.$a(Evt.guessers[0], player) > 0) return '不质疑';
							return Math.random() < 0.5 ? '不质疑' : '质疑';
						});
					}
				}, () => {
					if (!result.control) result.control = '不质疑';
					Evt.guessers[0].chat(result.control);
					game.delay(1);
					if (result.control == '不质疑') {
						game.log(Evt.guessers[0], '#g不质疑');
						Evt.guessers.remove(Evt.guessers[0]);
						Evt.goto(1);
					} else {
						game.log(Evt.guessers[0], '#y质疑');
					}
				}, () => {
					game.broadcastAll(function (onEnd) {
						_status.guhuoNode.listenTransition(onEnd);
					}, Evt.onEnd01);
				}, () => {
					game.delay(3.2);
				}, () => {
					if (!Evt.guessers.length) Evt.finish();
				}, () => {
					if (trigger.card.name == trigger.cards[0].name) {
						Evt.guessers[0].popup('质疑错误', 'fire');
						let cards = get.cards();
						game.cardsGotoSpecial(cards);
						Evt.guessers[0].$gain2(cards);
						Evt.guessers[0].markAuto('tianqi_mark', cards);
						Evt.guessers[0].addSkill('tianqi_mark');
						game.log(Evt.guessers[0], '获得了', '#g「天气」');
					} else {
						Evt.guessers[0].popup('质疑正确', 'wood');
						game.log(player, '使用的', trigger.card, '作废了');
						game.cardsDiscard(trigger.cards);
						game.broadcastAll(ui.clear);
						trigger.cancel();
						if (trigger.name == 'useCard' && trigger.parent) trigger.parent.goto(0);
					}
					game.delay();
				}],
			},
			butaizhun_respond: {
				trigger: {
					player: "chooseToRespondBegin",
				},
				filter(Evt, player) {
					if (player.hasSkill('butaizhun_used')) return false;
					if (Evt.responded) return false;
					if (!Evt.filterCard({ name: 'shan' }) && !Evt.filterCard({ name: 'sha' })) return false;
					if (!lib.filter.cardRespondable({ name: 'shan' }, player, Evt) && !lib.filter.cardRespondable({ name: 'sha' }, player, Evt)) return false;
					if (!player.countCards('h')) return false;
					return true;
				},
				direct: true,
				content() {
					"step 0"
					if (trigger.filterCard({ name: 'shan' }) && lib.filter.cardRespondable({ name: 'shan' }, player, trigger)) Evt.name = 'shan';
					else Evt.name = 'sha';
					player.chooseCard(`是否发动【不太准】，将一张手牌当做${get.$t(Evt.name)}打出？`);
					"step 1"
					if (result.bool) {
						player.logSkill('butaizhun_guess');
						player.addTempSkill('butaizhun_used')
						player.popup(Evt.name, 'metal');
						Evt.card = result.cards[0];
						player.lose(Evt.card, ui.special);
						Evt.prompt = `${get.$t(player)}声明了${get.$t(Evt.name)}，是否质疑？`;
						Evt.guessers = game.filterPlayer(cur => cur != player && !cur.hasSkill('tianqi_mark'));
						Evt.guessers.sort(lib.sort.seat);


						game.broadcastAll(card => {
							_status.guhuoNode = card.copy('thrown');
							if (lib.config.cardback_style != 'default') {
								_status.guhuoNode.style.transitionProperty = 'none';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.classList.add('infohidden');
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transitionProperty = '';
							} else {
								_status.guhuoNode.classList.add('infohidden');
							}
							_status.guhuoNode.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
							player.$throwordered2(_status.guhuoNode);
						}, result.cards[0]);


						Evt.onEnd01 = function () {
							_status.guhuoNode.removeEventListener('webkitTransitionEnd', Evt.onEnd01);
							_status.guhuoNode.style.transition = 'all ease-in 0.3s';
							_status.guhuoNode.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
							let onEnd = function () {
								_status.guhuoNode.classList.remove('infohidden');
								_status.guhuoNode.style.transition = 'all 0s';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transition = '';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform = '';
								_status.guhuoNode.removeEventListener('webkitTransitionEnd', onEnd);
							}
							_status.guhuoNode.listenTransition(onEnd);
						};
					} else Evt.finish();
					"step 2"
					if (Evt.guessers.length == 0) Evt.goto(4);
					else {
						Evt.guessers[0].chooseControl('质疑', '不质疑').set('prompt', Evt.prompt).set('ai', function () {
							if (get.$a(Evt.guessers[0], player) > 0) return '不质疑';
							return Math.random() < 0.5 ? '不质疑' : '质疑';
						});
					}
					"step 3"
					if (!result.control) result.control = '不质疑';
					Evt.guessers[0].chat(result.control);
					game.delay();
					if (result.control == '不质疑') {
						game.log(Evt.guessers[0], '#g不质疑');
						Evt.guessers.remove(Evt.guessers[0]);
						Evt.goto(2);
					} else {
						game.log(Evt.guessers[0], '#y质疑');
					}
					"step 4"
					game.broadcastAll(function (onEnd) {
						_status.guhuoNode.listenTransition(onEnd);
					}, Evt.onEnd01);
					"step 5"
					game.delay(3.2);
					if (!Evt.guessers.length) Evt.goto(7);
					"step 6"
					if (Evt.name == Evt.card.name) {
						Evt.guessers[0].popup('质疑错误', 'fire');
						let cards = get.cards();
						game.cardsGotoSpecial(cards);
						Evt.guessers[0].$gain2(cards);
						Evt.guessers[0].markAuto('tianqi_mark', cards);
						Evt.guessers[0].addSkill('tianqi_mark');
						game.log(Evt.guessers[0], '获得了', '#g「天气」牌');
					} else {
						Evt.guessers[0].popup('质疑正确', 'wood');
						game.log(player, '打出的', '#y' + get.$t(Evt.name), '作废了');
						game.cardsDiscard(Evt.card);
						Evt.finish();
					}
					"step 7"
					trigger.untrigger();
					trigger.responded = true;
					trigger.result = { bool: true, card: { name: Evt.name }, cards: [Evt.card], noanimate: true };
				},
				ai: {
					order: 4,
					useful: -1,
					value: -1,
				},
			},
			butaizhun_wuxie: {
				log: false,
				silent: true,
				popup: false,
				enable: "chooseToUse",
				filterCard: true,
				viewAsFilter(player) {
					if (player.hasSkill('butaizhun_used')) return false;
					return player.countCards('h') > 0;
				},
				viewAs: {
					name: "wuxie",
				},
				check(card) {
					if (card.name == 'wuxie') return 1000;
					return 0;
				},
				prompt: "将一张手牌当无懈可击使用",
				threaten: 1.2,
			},
			//叽叽
			guangan: {
				trigger: { global: 'useCard2' },
				filter(Evt, player) {
					if (player.$.guangan >= game.countPlayer() - 1) return false;
					return Evt.player == player && (Evt.targets.includes(player.getNext()) || player.getStorage('zonghe').filter(function (zonghe) {
						return Evt.targets.includes(zonghe);
					}).length) || (Evt.player == player.getPrevious() || player.getStorage('zonghe').includes(Evt.player)) && Evt.targets.includes(player);
				},
				frequent: true,
				content: [() => {
					player.draw();
					if (!player.$.guangan) player.$.guangan = 0;
					player.$.guangan++;
				}, () => {
					player.markSkill('guangan');
				}],
				marktext: '叽',
				intro: {
					content: '本轮次已摸了&张牌',
					markcount(storage, player) {
						return player.$.guangan;
					}
				},
				group: 'guangan_clear',
				subSkill: {
					clear: {
						trigger: { global: 'roundStart' },
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							delete player.$.guangan;
							player.unmarkSkill('guangan');
						}
					},
				}
			},
			lanxuan: {
				mod: {
					targetInRange(card, player, target) {
						if (_status.event.logSkill == 'lanxuan') return true;
					},
					cardUsable(card, player, num) {
						if (_status.event.logSkill == 'lanxuan') return Infinity;
					},
				},
				trigger: { source: 'damageAfter' },
				filter(Evt, player) {
					if (player.hasSkill('lanxuan_used1')) return false;
					return player.countCards('hs', card => player.hasUseTarget(card));
				},
				direct: true,
				usable: 1,
				content: [() => {
					player.chooseToUse({
						filterCard(card, player) {
							return lib.filter.filterCard.apply(this, arguments);
						},
						prompt: get.$pro2('lanxuan')
					}).set('logSkill', ['lanxuan']).set('targetRequired', true);
				}, () => {
					if (result.bool) {
						player.addTempSkill('lanxuan_used1');
					}
				}],
				group: 'lanxuan_damageUse',
				subSkill: {
					damageUse: {
						trigger: { player: 'damageAfter' },
						filter(Evt, player) {
							if (player.hasSkill('lanxuan_used2')) return false;
							return player.countCards('hs', card => player.hasUseTarget(card));
						},
						direct: true,
						usable: 1,
						content: [() => {
							player.chooseToUse({
								filterCard(card, player) {
									return lib.filter.filterCard.apply(this, arguments);
								},
								prompt: get.$pro2('lanxuan')
							}).set('logSkill', ['lanxuan']).set('targetRequired', true);
						}, () => {
							if (result.bool) {
								player.addTempSkill('lanxuan_used2');
							}
						}],
					},
					used1: {},
					used2: {},
				},
				ai: {
					threaten: 1.2,
				}
			},
			zonghe: {
				audio: true,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				unique: true,
				zhuSkill: true,
				trigger: { global: 'gameDrawAfter', player: 'enterGame' },
				filter(Evt, player) {
					if (!player.hasZhuSkill('zonghe')) return false;
					return game.hasPlayer(function (target) {
						return target != player && !player.getStorage('zonghe').includes(target)
							&& (get.name(target) in lib.characterPack.clubs || target.group == 'qun');
					});
				},
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('zonghe'), function (card, player, target) {
						return target != player && !player.getStorage('zonghe').includes(target)
							&& (get.name(target) in lib.characterPack.clubs || target.group == 'qun');
					}).set('ai', function (target) {
						let player = _status.event.player;
						if (target != player.getNext()) return 5 - get.$a(player, target);
						return 3 - get.$a(player, target);
					});
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('zonghe', Evt.target);
						player.$.zonghe.add(Evt.target);
						player.$.zonghe_mark = Evt.target;
						player.addSkill('zonghe_mark');
					}
				}],
				involve: 'guangan',
				subSkill: {
					mark: {
						mark: 'character',
						locked: true,
						intro: {
							name: '纵合',
							content: '对$发动『珖黯』时无视座次限制',
						},
					}
				}
			},
			//牛牛子
			qiying: {
				trigger: { player: 'damageAfter' },
				filter(Evt, player) {
					if (player == _status.currentPhase) return false;
					return lib.filter.cardEnabled({ name: 'nanman' }, player);
				},
				check(Evt, player) {
					let effect = 0;
					let players = game.players.slice(0);
					if (player.isTurnedOver() || player.isPhaseUsing()) effect += 3;
					for (let i = 0; i < players.length; i++) {
						if (players[i] != player && player.canUse('nanman', players[i])) effect += get.effect(players[i], { name: 'nanman' }, player, player);
					}
					return effect > 0;
				},
				content: [() => {
					player.turnOver();
				}, () => {
					player.chooseUseTarget({ name: 'nanman' }, true);
				}]
			},
			hengxuan: {
				trigger: { player: 'phaseJieshuBegin' },
				filter(Evt, player) {
					return true;
				},
				check(Evt, player) {
					return true;
				},
				frequent: true,
				content() {
					player.draw(2).gaintag = ['hengxuan'];
				},
				group: 'hengxuan_discardBy',
				subSkill: {
					discardBy: {
						mod: {
							aiValue(player, card, num) {
								if (card.hasGaintag && card.hasGaintag('hengxuan')) return num / 10;
							},
						},
						trigger: { target: "useCardToTarget" },
						filter(Evt, player) {
							return Evt.player != player && Evt.targets.length == 1 && player.countCards('h', (card) => card.hasGaintag('hengxuan'));
						},
						forced: true,
						content() {
							let hs = player.getCards('h', card => card.hasGaintag('hengxuan'));
							if (hs.length) player.discard(hs);
						}
					}
				}
			},
			//高原守
			shoumi: {
				audio: 2,
				trigger: { global: 'gameDrawAfter', player: ['enterGame', 'changeHp'] },
				filter(Evt, player) {
					if (Evt.name == 'changeHp') return Evt.num != 0;
					return true;
				},
				forced: true,
				content() {
					if (player.hp == 0) {
						let reason = trigger.getParent();
						delete player.nodying;
						if (trigger.num > 0) player.dying(reason);
					} else {
						player.nodying = true;
						if (player.hp < 0 && !player.hasSkill('shoumi_yingzi')) {
							player.addAdditionalSkill('shoumi', 'shoumi_yingzi');
						} else if (player.hp > 0 && !player.hasSkill('shoumi_guicai')) {
							player.addAdditionalSkill('shoumi', 'shoumi_guicai');
						}
					}
				},
				ai: {
					effect: {
						target(card, player, target, cur) {
							if (target.hp < 0) {
								if (get.tag(card, 'recover') > 0) return [-1, 0];
								if (target.hp == -1) return [1, -1];
								if (get.tag(card, 'damage') >= 1 || get.tag(card, 'loseHp')) return [-1.5, 0];
							}
						}
					}
				},
				involve: ['shoumi_yingzi', 'shoumi_guicai']
			},
			shoumi_yingzi: {
				trigger: { player: 'phaseDrawBegin2' },
				forced: true,
				filter(Evt, player) {
					return !Evt.numFixed;
				},
				content() {
					trigger.num++;
				},
				ai: {
					threaten: 1.5
				},
				mod: {
					maxHandcardBase(player, num) {
						return player.maxHp;
					}
				}
			},
			shoumi_guicai: {
				trigger: { global: 'judge' },
				direct: true,
				filter(Evt, player) {
					return player.countCards('he') > 0;
				},
				content() {
					"step 0"
					player.chooseCard(`${get.$t(trigger.player)}的${trigger.judgestr || ''}判定为${get.$t(trigger.player.judging[0])}，${get.$pro('shoumi_guicai')}`, 'he', card => {
						let player = _status.event.player;
						let mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
						if (mod2 != 'unchanged') return mod2;
						let mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
						if (mod != 'unchanged') return mod;
						return true;
					}).set('ai', card => {
						let trigger = _status.event.getTrigger();
						let player = _status.event.player;
						let judging = _status.event.judging;
						let result = trigger.judge(card) - trigger.judge(judging);
						let att = get.$a(player, trigger.player);
						if (att == 0 || result == 0) return 0;
						if (att > 0) {
							return result - get.value(card) / 2;
						} else {
							return -result - get.value(card) / 2;
						}
					}).set('judging', trigger.player.judging[0]);
					"step 1"
					if (result.bool) {
						player.respond(result.cards, 'shoumi_guicai', 'highlight', 'noOrdering');
					} else {
						Evt.finish();
					}
					"step 2"
					if (result.bool) {
						if (trigger.player.judging[0].clone) {
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(card => {
								if (card.clone) {
									card.clone.classList.remove('thrownhighlight');
								}
							}, trigger.player.judging[0]);
							game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0] = result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player, '的判定牌改为', result.cards[0]);
						game.delay(2);
					}
				},
				ai: {
					rejudge: true,
					tag: {
						rejudge: 1,
					}
				}
			},
			yanwang: {
				trigger: { target: 'useCardToTarget' },
				filter(Evt, player) {
					return Evt.player != player;
				},
				direct: true,
				content: [() => {
					player.line(trigger.player, 'green');
					let check = get.recoverEffect(player, trigger.player, trigger.player);
					if (player.countCards('h') > 0) check += 0.5;
					check = check > 0;
					trigger.player.chooseBool(get.$pro2('yanwang', player)).set('choice', check > 0);
				}, () => {
					if (result.bool) {
						trigger.player.logSkill('yanwang', player);
						player.recover(trigger.player);
					} else Evt.finish();
				}, () => {
					trigger.player.gainPlayerCard(player, 'h', true, 'visibleMove');
				}, () => {
					if (result.bool && result.links) {
						if (get.color(result.links[0]) == 'black') {
							if (!game.hasPlayer(cur => cur != player && cur != trigger.player && trigger.player.canUse('juedou', cur))) {
								Evt.finish();
								return;
							}
							Evt.source = trigger.player;
							player.chooseTarget(true, function (card, player, target) {
								let evt = _status.event.getParent();
								return evt.source.canUse({ name: 'juedou' }, target);
							}, `请选择一名角色，视为${get.$t(trigger.player)}对其使用【决斗】`).set('ai', function (target) {
								let evt = _status.event.getParent();
								return get.effect(target, { name: 'juedou' }, evt.source, _status.event.player) - 2;
							});
						}
					} else Evt.finish();
				}, () => {
					if (result.bool && result.targets?.length) {
						trigger.player.useCard({ name: 'juedou', isCard: true }, result.targets[0], 'noai');
					}
				}],
			},
			//白夜真宵
			bykuangxin: {
				audio: 2,
				enable: 'phaseUse',
				usable: 1,
				content: [() => {
					if (Evt.cards == undefined) Evt.cards = [];
					if (Evt.d10 == undefined) Evt.d10 = [];
					let next = player.judge(card => {
						if (get.number(card) > 10) return 1.5;
						return 0;
					});
					next.set('callback', function () {
						let evt = Evt.getParent('bykuangxin');
						if (get.number(card) > 10) {
							Evt.getParent().orderingCards.remove(card);
						} else {
							evt.d10.unshift(card);
							if (!evt.num) {
								evt.num = 0;
							}
							evt.num++;
							if (evt.d100 == undefined) {
								evt.d100 = 0;
								if (get.number(card) != 10) evt.d100 += get.number(card);
							} else {
								if (get.number(card) != 10 || evt.d100 == 0) evt.d100 += (get.number(card) * 10);
							}
							if (evt.num == 2) {
								player.chat('1d100=' + evt.d100);
								if (evt.d100 >= 96) player.popup('大失败', 'yami');
								else if (evt.d100 <= 5) player.popup('大成功', 'wood');
								else if (evt.d100 <= 40) player.popup('成功', 'wood');
								else if (evt.d100 >= 61) player.popup('失败', 'yami');
								game.delayx(1.5);
							}
						}
						game.delayx(0.2);
					});
				}, () => {
					if (Evt.num != 2) {
						Evt.card = get.cards()[0];
						if (Evt.videoId == undefined) Evt.videoId = lib.status.videoId++;
						if (result.number > 10) Evt.cards.push(result.card);
						for (let i of Evt.cards) {
							Evt.card = i;
							game.addVideo('judge1', player, [get.cardInfo(Evt.card), false, Evt.videoId]);
							game.broadcastAll(function (player, card, str, id, cardid) {
								let Evt;
								if (game.online) {
									Evt = {};
								} else {
									Evt = _status.event;
								}
								if (game.chess) {
									Evt.node = card.copy('thrown', 'center', ui.arena).animate('start');
								} else {
									Evt.node = player.$throwordered(card.copy(), true);
								}
								if (lib.cardOL) lib.cardOL[cardid] = Evt.node;
								Evt.node.cardid = cardid;
								Evt.node.classList.add('thrownhighlight');
								ui.arena.classList.add('thrownhighlight');
								Evt.dialog = ui.create.dialog(str);
								Evt.dialog.classList.add('center');
								Evt.dialog.videoId = id;
							}, player, Evt.card, false, Evt.videoId, get.id());
						}
						game.addVideo('centernode', null, get.cardsInfo(Evt.cards));
						Evt.goto(0);
					} else {
						if (Evt.videoId) {
							game.addVideo('judge2', null, Evt.videoId);
							game.broadcast(function (id) {
								let dialog = get.idDialog(id);
								if (dialog) {
									dialog.close();
								}
								ui.arena.classList.remove('thrownhighlight');
							}, Evt.videoId);
						}
						for (let i = 0; i < Evt.cards.length; i++) {
							if (get.position(Evt.cards[i], true) != 'o') {
								Evt.cards.splice(i, 1);
								i--;
							}
						}
						player.gain(Evt.cards, 'gain2').gaintag.add('bykuangxin');
					}
				}, () => {
					if (Evt.d100) {
						player.showCards(Evt.d10, '『狂信』判定结果：' + Evt.d100);
						if (Evt.d100 >= 96) {
							game.filterPlayer(cur => {
								if (cur != player) player.randomGain('h', cur);
							})
						} else if (Evt.d100 <= 5) {
							player.draw(2);
							player.gainMaxHp(true);
						} else if (Evt.d100 <= 40) {
							player.recover();
						} else if (Evt.d100 <= 60) {
						} else if (Evt.d100 <= 95) {
							player.loseHp();
							if (player.needsToDiscard()) {
								player.chooseToDiscard(player.needsToDiscard(), true);
							}
						}
					}
				}, () => {
					if (Evt.d100) {
						if (Evt.d100 >= 96) {
							player.loseMaxHp(true);
							if (lib.config.background_audio) {
								game.playAudio('effect', 'damage2');
							}
							game.broadcast(function () {
								if (lib.config.background_audio) {
									game.playAudio('effect', 'damage2');
								}
							});
							player.$damage(player);
						} else if (Evt.d100 >= 41 && Evt.d100 <= 60) {
							if (player.hasUseTarget('juedou')) {
								player.chooseUseTarget({ name: 'juedou', isCard: true }, true);
							}
						}
					}
				}],
				ai: {
					order: 6,
					result: {
						player: 1
					}
				},
			},
			//小柔
			rouqing: {
				init(player, skill) {
					player.$[skill] = 1;
					player.markSkill('rouqing');
				},
				marktext: '柔',
				intro: {
					content(storage, player) {
						let str = '下一次发动『柔情』时，（）值为：';
						if (player.$.rouqing > 4) str += get.cnNumber(0);
						else str += get.cnNumber(4 - player.$.rouqing);
						return str;
					},
				},
				trigger: { global: 'changeHp' },
				filter(Evt, player) {
					return Evt.num < 0;
				},
				usable: 1,
				frequent(Evt, player) {
					return player == Evt.player;
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content: [() => {
					Evt.num = -trigger.num;
					Evt.target = trigger.player;
					if (!player.$.rouqing) player.$.rouqing = 1;
					Evt.min = 4 - player.$.rouqing;
					if (Evt.min < 0) {
						Evt.min = 0;
					}
				}, () => {
					Evt.num--;
					Evt.cards = get.cards(4);
					Evt.target.chooseCardButton([Evt.min, 4], true, Evt.cards, `『柔情』：选择至少(${get.cnNumber(Evt.min)})张牌置于牌堆底（先选择的在下）<br>
					然后获得未被选择的牌`).set('ai', function (button) {
						let min = 0;
						if (ui.selected.buttons.length >= Evt.min) min = -5;
						let player = _status.event.player, now = _status.currentPhase, next = now.getNext();
						let att = get.$a(player, next), card = button.link;
						let judge = next.getCards('j')[ui.selected.buttons.length];
						if (judge) {
							return get.judge(judge)(card) * att + min;
						}
						return next.getUseValue(card) * att + min;
					}).set('min', Evt.min);
				}, () => {
					if (result.bool && result.links) {
						player.$.rouqing = 1;
						player.markSkill('rouqing');
						let cards = result.links.slice(0);
						Evt.cards.removeArray(cards);
						game.log(Evt.target, `将${get.cnNumber(cards.length)}张牌置于牌堆底`);
						while (cards.length) {
							ui.cardPile.appendChild(cards.pop().fix());
						}
						game.updateRoundNumber();
						if (Evt.cards.length) {
							Evt.target.gain(Evt.cards, 'gain2');
						}
					}
				}, () => {
					if (Evt.num > 0) Evt.goto(1);
				}],
				ai: {
					threaten: 1.9,
					maixie: true,
					maixie_hp: true,
				}
			},
			guangying: {
				trigger: {
					player: 'loseAfter',
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
				},
				filter(Evt, player) {
					if (Evt.getParent().name == 'useCard') return false;
					let evt = Evt.getl(player);
					return evt?.hs?.length;
				},
				forced: true,
				content() {
					if (!player.$.rouqing) player.$.rouqing = 1;
					player.$.rouqing++;
					player.markSkill('rouqing');
				},
				ai: {
					combo: 'rouqing'
				},
				group: 'guangying_recoverBy',
				subSkill: {
					recoverBy: {
						trigger: {
							player: 'gainAfter',
						},
						filter(Evt, player) {
							return Evt.cards?.length >= 4;
						},
						forced: true,
						content() {
							player.recover();
						},
					}
				}
			},
			//艾露露
			aldanyan: new toSkill('active', {
				usable: 1,
				filter(Evt, player) {
					return player.countCards('he') > 0;
				},
				filterTarget(card, player, target) {
					if (target.hp >= player.hp) return true;
				},
				selectCard: 2,
				discard: false,
				prepare: 'give2',
				content: [() => {
					target.gain(cards, player);
				}, () => {
					Evt.list = [`令${get.$t(player)}获得你的三张牌`, '受到一点伤害']
					target.chooseControl('dialogcontrol', Evt.list).set('ai', function () {
						let { player, source, controls } = _status.event;
						if (get.$a(player, source) > 0 || player.countCards('he') == 0) return 0;
						if (get.damageEffect(player, source, player) < 0 && player.hp == 1) return 0;
						if (get.damageEffect(player, source, player) > 0) return 1;
						return controls.randomGet();
					}).set('source', player);
				}, () => {
					switch (result.control) {
						case Evt.list[0]: {
							player.gainPlayerCard(target, [1, 3], true, 'he', 'visible');
							break;
						}
						case Evt.list[1]: {
							target.damage(player);
							game.delayx();
							break;
						}
					}
				}],
				ai: {
					order(item, player) {
						return 6
					},
					result: {
						player(player, target) {
							return -1;
						},
						target(player, target) {
							if (target.countCards('he')) return -2;
							return get.damageEffect(target, player, target);
						}
					},
					threaten: 0.4,
					expose: 0.2,
				},
			}, 'filterCard'),
			lunao: new toSkill('trigger', {
				trigger: { source: 'damageBegin2' },
				priority: 199,
				content: [() => {
					let list = lib.linked.slice(0);
					list.remove('kami');
					list.remove(trigger.nature);
					Evt.map = {};
					for (let i = 0; i < list.length; i++) {
						Evt.map[get.rawName(list[i])] = list[i];
						list[i] = get.rawName(list[i]);
					}
					list.push('取消');
					player.chooseControl('dialogcontrol', list).set('ai', () => list.randomGets()).set('prompt', get.$pro2('lunao'));
				}, () => {
					if (result.control != '取消') {
						Evt.target = trigger.player
						player.logSkill('lunao', Evt.target)
						trigger.nature = Evt.map[result.control]
						trigger.num++
						let halt = game.createEvent('halt');
						Evt.next.remove(halt);
						trigger.after.push(halt);
						halt.setContent(function () {
							var evt = _status.event.getParent('phaseUse');
							if (evt && evt.name == 'phaseUse') {
								evt.skipped = true;
							}
							var evt = _status.event.getParent('phase');
							if (evt && evt.name == 'phase') {
								evt.finish();
							}
						});
					} else {
						Evt.finish();
					}
				}]
			}, 'direct'),
			//蜜球兔
			zhazong: {
				trigger: { player: 'phaseUseEnd' },
				direct: true,
				audio: 3,
				filter(Evt, player) {
					return !player.hasHistory('useCard', evt => get.type2(evt.card) == 'basic' && evt.getParent('phaseUse') == Evt)
						|| !player.hasHistory('useCard', evt => get.type2(evt.card) == 'equip' && evt.getParent('phaseUse') == Evt)
						|| !player.hasHistory('useCard', evt => get.type2(evt.card) == 'trick' && evt.getParent('phaseUse') == Evt);
				},
				content: [() => {
					let position = '';
					let str = '弃置一名角色';
					if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'basic' && evt.getParent('phaseUse') == trigger)) {
						position += 'h';
						str += ' 手牌区 ';
					}
					if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'equip' && evt.getParent('phaseUse') == trigger)) {
						position += 'e';
						str += ' 装备区 ';
					}
					if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'trick' && evt.getParent('phaseUse') == trigger)) {
						position += 'j';
						str += ' 判定区 ';
					}
					Evt.position = position;
					if (position.length) {
						str += '各至多一张牌';
						player.chooseTarget(get.$pro('zhazong'), function (card, player, target) {
							return target.countCards(_status.event.position);
						}).set('position', position).set('prompt2', str).set('ai', function (target) {
							let player = _status.event.player;
							let att = get.$a(player, target);
							if (att < 0) {
								att = -Math.sqrt(-att);
							} else {
								att = Math.sqrt(att);
							}
							if (_status.event.position == 'h') return -att;
							return att * lib.card.guohe.ai.result.target(player, target);
						});
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('zhazong', result.targets);
						Evt.target = result.targets[0];
						player.discardPlayerCard(Evt.target, Evt.position, [1, Evt.position.length], true).set('filterButton', function (button) {
							for (let i = 0; i < ui.selected.buttons.length; i++) {
								if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						});
					}
				}]
			},
			mengnan: new toSkill('trigger', {
				filter(Evt, player) {
					if (Evt.name == 'addJudge' && Evt.player == player) return true;
					let evt = Evt.getl(player);
					return evt?.js?.length > 0 && !player.hasSkill('misuzu_zhongxing_haruko');
				},
				content() {
					let draw = false, num = 2;
					if (trigger.name == 'addJudge' && trigger.player == player) draw = true
					let evt = trigger.getParent('phaseJudge');
					if (evt?.name == 'phaseJudge') {
						num = 1;
					}
					if (draw) player.draw(num);
					else player.chooseToDiscard(num, true);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.name(card) == 'shandian') {
								return [1, 1];
							}
						}
					}
				},
				subSkill: {
					yuenanBy: new toSkill('trigger', {
						filter(Evt, player) {
							return player.isAlive();
						},
						content() {
							player.removeSkill('mengnan')
							player.addSkill('yuenan')
						},
					}, 'forced').setT('dyingAfter')
				},
				group: 'mengnan_yuenanBy',
				derivation: 'yuenan'
			}, 'forced').setT({
				player: ['loseAfter', 'addJudgeAfter'],
				global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
			}),
			//无理
			lique: {
				trigger: { target: 'useCardToTargeted' },
				forced: true,
				filter(Evt, player) {
					return get.type(Evt.card) != 'equip';
				},
				content: [() => {
					player.loseHp();
				}, () => {
					player.draw();
				}],
				ai: {
					effect: {
						target(card, player, target, current) {
							if (target.hp < 0) return [0, 1];
							if (get.type(card) != 'equip') return [1, 2];
						}
					}
				}
			},
			zhangdeng: {
				trigger: { player: 'dying' },
				forced: true,
				filter: (Evt, player) => true,
				content() {
					player.recover();
					game.delayx();
				},
				ai: {
					maixie_defend: true,
					threaten(player, target) {
						if (target.hp == 1) return 0.6;
						return 1;
					},
					effect: {
						target(card, player, target, current) {
							if (target.hujia) return;
							if (player._zhangdeng_tmp) return;
							if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
							if (get.tag(card, 'damage')) {
								let basic = player.$.shangdong || 0;
								if (get.$a(player, target) > 0 && target.hp > 1) {
									return basic;
								}
								if (get.$a(player, target) < 0 && !player.hasSkillTag('damageBonus', false, {
									name: card ? card.name : null,
									target: target,
									card: card
								})) {
									if (card.name == 'sha') return;
									let sha = false;
									player._zhangdeng_tmp = true;
									let num = player.countCards('h', card => {
										if (card.name == 'sha') {
											if (sha) {
												return false;
											}
											else {
												sha = true;
											}
										}
										return get.effect(target, card, player, player) + basic > 0;
									});
									delete player._zhangdeng_tmp;
									if (player.hasSkillTag('damage')) {
										num++;
									}
									if (num < 2) {
										let enemies = player.getEnemies();
										if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
											return;
										}
										return basic;
									}
								}
							}
						}
					}
				}
			},
			//Aza
			qiding: {
				enable: 'phaseUse',
				usable: 1,
				filter: (Evt, player) => player.countCards('h'),
				filterTarget(card, player, target) {
					return player.inRange(target);
				},
				content: [() => {
					target.viewHandcards(player);
				}, () => {
					Evt.list = ['受到一点伤害', `令${get.$t(player)}观看并获得你的一张牌，且防止其对你的伤害直到本回合结束`];
					target.chooseControl('dialogcontrol', Evt.list).set('ai', function () {
						let player = _status.event.player, source = _status.event.source, controls = _status.event.controls.slice(0);
						if (get.$a(player, source) > 0 || player.countCards('he') == 0) return 1;
						if (get.damageEffect(player, source, player) < 0 && player.hp == 1) return 1;
						if (get.damageEffect(player, source, player) > 0) return 0;
						return controls.randomGet();
					}).set('source', player);
				}, () => {
					switch (result.control) {
						case Evt.list[0]: {
							target.damage(player);
							game.delayx();
							break;
						}
						case Evt.list[1]: {
							player.gainPlayerCard(target, 'he', 'visible');
							player.$.qiding_respondDam = target;
							player.addTempSkill('qiding_respondDam');
							break;
						}
					}
				}],
				subSkill: {
					respondDam: {
						mark: 'character',
						intro: {
							name: '契定',
							content: '防止对$造成的伤害',
						},
						onremove: true,
						forced: true,
						trigger: { source: 'damageBegin' },
						filter(Evt, player) {
							return player.$.qiding_respondDam == Evt.player;
						},
						content() {
							trigger.changeToZero();
						},
						ai: {
							effect: {
								player(card, player, target, current) {
									if (target && target == player.$.qiding_respondDam && get.tag(card, 'damage')) return 'zeroplayertarget';
								}
							}
						}
					}
				},
				ai: {
					order: 6,
					result: {
						target: -1,
					},
					threaten: 1.1,
				}
			},
			chouxin: {
				trigger: { player: 'loseEnd' },
				filter(Evt, player) {
					if (!Evt.visible) return false;
					for (let i = 0; i < Evt.hs.length; i++) {
						if (get.suit(Evt.hs[i]) == 'heart') return true;
					}
					return false;
				},
				forced: true,
				content() {
					if (player.isHealthy()) player.loseHp();
					else player.recover();
					player.addTempSkill('chouxin_skipDiscard');
				},
				subSkill: {
					skipDiscard: {
						mark: true,
						intro: {
							name: '酬心',
							content: '跳过弃牌阶段',
						},
						trigger: { player: 'phaseDiscardBefore' },
						forced: true,
						content() {
							trigger.cancel();
						},
					}
				}
			},
			//Mhr
			jusheng: {
				trigger: { global: 'phaseZhunbeiBegin' },
				check(Evt, player) {
					return Evt.player.countCards('e') > player.countCards('e');
				},
				logTarget: 'player',
				filter(Evt, player) {
					return (Evt.player.countCards('e') || player.countCards('e')) && player != Evt.player;
				},
				round: 1,
				content: [() => {
					Evt.target = trigger.player;
					Evt.prenum = Evt.target.countCards('e');
					player.swapEquip(Evt.target);
				}, () => {
					if (Evt.target.countCards('e') > Evt.prenum) {
						Evt.target.$.jusheng_shiyue = player;
						Evt.target.addTempSkill('jusheng_shiyue');
						Evt.finish();
					} else if (Evt.target.countCards('e') < Evt.prenum) {
						player.chooseTarget('『剧生』：令你或其调整手牌至与对方相同', true, function (card, player, target) {
							return _status.event.targets.includes(target);
						}, function (target) {
							let num = _status.event.targets.slice(0).remove(target)[0].countCards('h') - target.countCards('h');
							return get.$a2(target) * num;
						}).set('targets', [player, Evt.target]);
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						let target = Evt.target;
						let num = player.countCards('h') - target.countCards('h');
						switch (result.targets[0]) {
							case player:
								if (num > 0) player.chooseToDiscard(num, true);
								else if (num < -0) player.draw(-num);
								break;
							case target:
								if (num > 0) target.draw(num);
								else if (num < -0) target.chooseToDiscard(-num, true);
								break;
						}
					}
				}],
				subSkill: {
					shiyue: {
						mark: 'character',
						intro: {
							name: '剧生',
							mark(dialog, content, player) {
								if (content) {
									dialog.addAuto([content]);
								}
							},
							content: '被$发动了『剧生』',
						},
						onremove: true,
						trigger: { player: 'useCard2' },
						filter(Evt, player) {
							if (!player.$.jusheng_shiyue.isIn()) return false;
							return Evt.targets.includes(player) || Evt.targets.includes(player.$.jusheng_shiyue);
						},
						direct: true,
						lastDo: true,
						content() {
							Evt.source = player.$.jusheng_shiyue;
							player.line(Evt.source);
							Evt.source.chooseUseTarget({ name: 'sha', isCard: false }, false).set('logSkill', 'jusheng');
							game.delayx();
						},
						ai: {
							effect: {
								player(card, player, target, current) {
									if (player.$.jusheng_shiyue.isIn() && target) {
										if ([player.$.xingxu_shiyue, player].includes(target) && get.$a(player, player.$.jusheng_shiyue)) return [1, 0.5];
									}
								}
							}
						}
					},
				},
				ai: {
					expose: 0.2
				},
			},
			xingqu: {
				trigger: { global: 'dying' },
				limited: true,
				skillAnimation: true,
				animationColor: 'yami',
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0 || (get.$a(player, Evt.player) > -1 && player.isDamaged());
				},
				filter(Evt, player) {
					return Evt.player != player && Evt.reason && Evt.reason.source == player;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					player.loseMaxHp();
					player.awakenSkill('xingqu');
				}, () => {
					Evt.target.recover();
					Evt.choice = get.gainableSkills().randomGets(3);
					Evt.prompt = '『星取』：选择一个技能';
					if (_status.connectMode) Evt.goto(5);
				}, () => {
					Evt.target.chooseButton([Evt.prompt, [Evt.choice, 'vcard']], true).set('ai', function (button) {
						return 1 + Math.random();
					});
				}, () => {
					Evt.tarSkill = result.links[0][2];
					player.chooseButton([Evt.prompt, [Evt.choice, 'vcard']], true).set('ai', function (button) {
						return 1 + Math.random();
					});
				}, () => {
					Evt.mySkill = result.links[0][2];
					Evt.goto(7);
				}, () => {
					let list = [[player, [Evt.prompt, [Evt.choice, 'vcard']], true],
					[Evt.target, [Evt.prompt, [Evt.choice, 'vcard']], true]];
					player.chooseButtonOL(list).set('switchToAuto', function () {
						_status.event.result = 'ai';
					}, function () { }, function () { return 1 + Math.random() }).set('processAI', function () {
						let buttons = _status.event.dialog.buttons;
						return {
							bool: true,
							links: [buttons.randomGet().link],
						}
					});
				}, () => {
					Evt.mySkill = result[player.playerid].links[0][2];
					Evt.tarSkill = result[Evt.target.playerid].links[0][2];
				}, () => {
					player.popup(get.$t(Evt.mySkill));
					Evt.target.popup(get.$t(Evt.tarSkill));
					if (Evt.mySkill == Evt.tarSkill) {
						player.line2([Evt.target, player]);
						player.addAdditionalSkill('xingqu', 'xingqu2', true);
					} else {
						player.addSkillLog(Evt.tarSkill);
						player.addAdditionalSkill('xingqu', Evt.tarSkill, true);
					}
				}],
			},
			xingqu2: {
				trigger: { source: 'damageBegin1' },
				forced: true,
				charlotte: true,
				content() {
					trigger.num++;
				},
				mark: true,
				intro: {
					content: '造成伤害时，此伤害+1',
				},
			},
			//Miki
			xingxu: {
				trigger: { global: 'phaseZhunbeiBegin' },
				check(Evt, player) {
					if (get.$a(player, Evt.player) >= 1) {
						return player.countCards('he') >= player.hp;
					} else {
						return player.countCards('he', card => get.value(card) <= 0) >= 2;
					}
					return false;
				},
				logTarget: 'player',
				filter(Evt, player) {
					return player.countCards('he') >= 2 && player != Evt.player;
				},
				round: 1,
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCard(2, true, 'he', `『星许』交给${get.$t(Evt.target)}两张牌`).set('ai', card => {
						return _status.event.att >= 1 ? get.value(card) : -get.value(card);
					}).set('att', get.$a(player, Evt.target));
				}, () => {
					if (result.bool) {
						Evt.cards = result.cards;
						player.give(Evt.cards, Evt.target, true);
						Evt.target.$.xingxu_shiyue = player;
						Evt.target.$.xingxu_shiyue2 = Evt.cards;
						Evt.target.addTempSkill('xingxu_shiyue');
						Evt.target.addTempSkill('xingxu_shiyue2');
					}
				}],
				subSkill: {
					shiyue: {
						mark: 'character',
						intro: {
							name: '星许',
							mark(dialog, content, player) {
								if (content) {
									dialog.addAuto([content]);
									dialog.addAuto(player.$.xingxu_shiyue2);
								}
							},
							content: '被$发动了『星许』',
						},
						onremove: true,
						trigger: { player: 'phaseEnd' },
						filter(Evt, player) {
							if (!player.$.xingxu_shiyue.isIn()) return false;
							return player.hasHistory('sourceDamage', evt => {
								return evt.player == player.$.xingxu_shiyue;
							});
						},
						forced: true,
						lastDo: true,
						content() {
							Evt.source = player.$.xingxu_shiyue;
							player.line(Evt.source);
							Evt.source.recover(Evt.source);
							game.delayx();
						},
						ai: {
							effect: {
								player(card, player, target, current) {
									if (target && target == player.$.xingxu_shiyue && get.tag(card, 'damage') && !player.getHistory('sourceDamage', evt => {
										return evt.player == player.$.xingxu_shiyue;
									}).length) return [1, 0, 1, 1];
								}
							}
						}
					},
					shiyue2: {
						onremove: true,
						trigger: { player: 'phaseEnd' },
						filter(Evt, player) {
							if (!player.$.xingxu_shiyue.isIn()) return false;
							let cards = player.$.xingxu_shiyue2.slice(0);
							player.getHistory('useCard', evt => {
								cards.removeArray(evt.cards);
							});
							return cards.length == 1;
						},
						direct: true,
						content: [() => {
							player.line(Evt.source);
							game.delayx();
							Evt.source = player.$.xingxu_shiyue;
							Evt.cards = player.$.xingxu_shiyue2.slice(0);
							player.getHistory('useCard', evt => {
								Evt.cards.removeArray(evt.cards);
							});
						}, () => {
							if (Evt.cards.length == 1 && player.hasUseTarget(Evt.cards[0])) {
								Evt.source.chooseUseTarget(Evt.cards[0], '视为使用一张' + get.$t(Evt.cards[0]), true);
							}
						}],
						mod: {
							aiOrder(player, card, num) {
								if (get.$a(player, player.$.xingxu_shiyue) > 1 && player.$.xingxu_shiyue2) {
									if (player.$.xingxu_shiyue2.includes(card)
										&& player.getHistory('useCard', evt => player.$.xingxu_shiyue2.includes(evt.card)).length == 1) {
										if (player.needsToDiscard()) return num - 2;
										else return num - 8;
									}
								}
							},
						},
					}
				},
				ai: {
					expose: 0.2
				},
			},
			qingsui: {
				init(player, skill) {
					if (!player.$[skill]) {
						player.$[skill] = 0;
					}
					player.addAdditionalSkill('qingsui', 'qingsui_jiai')
				},
				trigger: { player: ['useCardAfter', 'qingsui_shengyinAfter', 'qingsui_quanyuAfter'] },
				filter(Evt, player) {
					if (Evt.name == 'useCard') return Evt.skill == 'qingsui_jiai_backup';
					return true;
				},
				locked: true,
				direct: true,
				content: [() => {
					if (player.$.qingsui == 2) player.$.qingsui = 0;
					else player.$.qingsui++;
					player.addAdditionalSkill('qingsui', ['qingsui_jiai', 'qingsui_shengyin', 'qingsui_quanyu'][player.$.qingsui])
				}, () => {
					if (player.$.qingsui == 0) {
						Evt.target = _status.currentPhase;
						if (Evt.target.countGainableCards(player, 'he') && Evt.target != player) {
							player.line(Evt.target);
							player.gainPlayerCard(Evt.target, 'he');
						}
					}
				}],
				subSkill: {
					jiai: {
						inherit: "jiai",
						filter(Evt, player) {
							if (player.$.qingsui != 0) return false;
							if (player.countCards('h') < 2) return false;
							let filterCard = Evt.filterCard || function (card, player, Evt) {
								return true;
							};
							let jiaiCards = [];
							for (let i = 0; i < lib.inpile.length; ++i) {
								if (get.type(lib.inpile[i]) != 'basic') continue;
								let card = { name: lib.inpile[i] };
								if (filterCard(card, player, Evt)) {
									jiaiCards.push(card);
								}

							}
							return jiaiCards.length > 0;
						},
					},
					shengyin: {
						inherit: "shengyin",
						filter(Evt, player) {
							if (player.$.qingsui != 1) return false;
							return true;
						},
					},
					quanyu: {
						inherit: "quanyu",
						filter(Evt, player) {
							if (player.$.qingsui != 2) return false;
							let suit = get.suit(Evt.card);
							return Evt.cards && Evt.cards.length && suit != 'none' && Evt.player != player && !player.countCards('h', card => suit == get.suit(card));
						},
					},
				},
				involve: ['jiai', 'shengyin', 'quanyu']
			},
			//勾檀Mayumi
			level: new toSkill('mark',{
				marktext: '级',
				intro: {
					content: '等级：#'
				}
			}).setI(1),
			jinzhou: {
				group: ['level'],
				trigger: { player: 'loseEnd' },
				forced: true,
				filter(Evt, player) {
					return Evt.es.filter(card => get.subtype(card) == 'equip2').length;
				},
				content: [() => {
					if (!player.$.level) {
						player.$.level = 1;
					}
					player.draw(player.$.level);
				}, () => {
					game.playAudio('effect', 'hujia');
					game.broadcast(function () {
						game.playAudio('effect', 'hujia');
					});
					player.$.level++;
					player.markSkill('level');
				}],
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.type(card) == 'equip' && get.subtype(card) == 'equip2') return [1, 2];
						}
					}
				}
			},
			gouhun: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					if (!player.$.level) {
						player.$.level = 1;
					}
					let list = get.cards(player.$.level + 2);
					Evt.list = list;
					player.showCards(list, '『勾魂』亮出牌');
				}, () => {
					Evt.cards = Evt.list.slice(0);
					player.chooseCardButton(Evt.list, '获得其中一种类型的牌<br>（取消则+1等级）');
				}, () => {
					if (result.bool) {
						let type = get.type2(result.links[0]), cards = Evt.cards.filter(card => get.type2(card) == type);
						player.showCards(cards, '『勾魂』获得牌');
						game.delayx();
						player.gain(cards, 'gain2', 'log').gaintag.add('gouhun');
						Evt.cards.removeArray(cards);
					} else {
						game.playAudio('effect', 'hujia');
						game.broadcast(function () {
							game.playAudio('effect', 'hujia');
						});
						player.$.level++;
						player.markSkill('level');
					}
				}, () => {
					game.cardsDiscard(Evt.cards);
				}],
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag('gouhun') && get.type2(card) == 'trick') {
							return true;
						}
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('gouhun') && get.type2(card) == 'trick') {
							return false;
						}
					},
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && card.hasGaintag('gouhun') && get.type(card) == 'basic') return num + 0.1;
					},
				},
				group: ['level', 'gouhun_reCount'],
				subSkill: {
					reCount: {
						trigger: { player: 'useCard1' },
						firstDo: true,
						silent: true,
						filter(Evt, player) {
							return get.type(Evt.card) == 'basic' && Evt.cards.length == 1 && player.getHistory('lose', evt => {
								if (evt.getParent() != Evt) return false;
								for (let i in evt.gaintag_map) {
									if (evt.gaintag_map[i].includes('gouhun')) return true;
								}
								return false;
							}).length > 0;
						},
						content() {
							if (trigger.addCount !== false) {
								trigger.addCount = false;
								let stat = player.getStat().card;
								if (stat[trigger.card.name]) stat[trigger.card.name]--;
							}
						},
					}
				},
				ai: {
					order: 5,
					result: {
						player: 1
					},
					threaten: 1.5
				},
			},
			//千幽Chiyuu
			anyou: {
				trigger: { player: ['phaseUseBegin', 'damageAfter'] },
				priority: 199,
				filter(Evt, player) {
					return game.countPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
				},
				check(Evt, player) {
					return player.hp > 1;
				},
				logTarget(Evt, player) {
					return game.filterPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
				},
				content: [() => {
					Evt.targets = game.filterPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
					Evt.targets.sortBySeat(player);
				}, () => {
					Evt.target = Evt.targets.shift();
					Evt.target.chooseToUse();
				}, () => {
					if (result.bool || Evt.target.countCards('he') == 0) {
						Evt.goto(4);
					} else {
						Evt.target.chooseCard('he', true, `『暗友』：交给${get.$t(player)}一张牌`);
					}
				}, () => {
					if (result.bool && result.cards) {
						Evt.target.give(result.cards, player, true);
					}
				}, () => {
					if (Evt.targets.length) Evt.goto(1);
				}],
				group: ['anyou_drawBy'],
				subSkill: {
					drawBy: {
						trigger: { target: 'useCardToTarget' },
						priority: 199,
						forced: true,
						filter(Evt, player) {
							let evt0 = Evt.getParent('anyou');
							let evt1 = Evt.getParent('chooseToUse');
							return (evt0 && evt0.name == 'anyou') && (evt1 && evt1.name == 'chooseToUse');
						},
						content() {
							player.draw();
						},
					},
				},
				ai: {
					maixie: true,
				}
			},
			mingyou: {
				trigger: { target: 'useCardToTarget' },
				filter(Evt, player) {
					return Evt.player.getHistory('damage').length;
				},
				frequent(Evt, player) {
					return player.isDamaged() || Evt.player == player;
				},
				content: [() => {
					Evt.targets = [player];
					Evt.targets.add(trigger.player);
				}, () => {
					Evt.targets.shift().recover();
				}, () => {
					if (Evt.targets.length) Evt.goto(1);
				}],
				ai: {
					effect: {
						target(card, player, target, current) {
							if (player.getHistory('damage').length) return [1, 2];
						}
					},
				},
			},
			//茉里Mari
			tingzhu: {
				trigger: { source: 'damageAfter' },
				priority: 199,
				filter(Evt, player) {
					return Evt.getParent().type == 'card' && game.hasPlayer(cur => !Evt.getParent().targets.includes(cur));
				},
				direct: true,
				content: [() => {
					let types = get.type3(_status.discarded);
					let check = game.hasPlayer(cur => !trigger.getParent().targets.includes(cur) && get.damageEffect(cur, player, player) > 0);
					player.chooseToDiscard(get.$pro2('tingzhu'), 'he', card => {
						return !_status.event.types.includes(get.type(card));
					}).set('ai', card => {
						if (!_status.event.check) return -1;
						return 7 - get.value(card);
					}).set('types', types || []).set('check', check);
				}, () => {
					if (result.bool) {
						player.chooseTarget('『庭柱』：选择一名角色对其造成伤害', true, function (card, player, target) {
							return !_status.event.targets.includes(target);
						}).set('targets', trigger.getParent().targets).set('ai', function (target) {
							let player = _status.event.player;
							return get.damageEffect(target, player, player) > 0;
						});
					} else Evt.finish();
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('tingzhu', Evt.target);
						Evt.target.damage();
						game.delayx();
					}
				}],
			},
			xuemo: {
				trigger: { source: 'damageBegin1' },
				filter(Evt, player) {
					return Evt.player.hp > 0 && Evt.player.hp != player.hp;
				},
				check(Evt, player) {
					return (Math.min(Evt.player.hp, player.maxHp)) - player.hp > (get.$a(player, Evt.player) / 4);
				},
				content: [() => {
					Evt.num = trigger.player.hp - player.hp;
					player.changeHp(Evt.num);
				}, () => {
					trigger.num++;
				}],
				ai: {
					effect: {
						player(card, player, target, current) {
							if (get.tag(card, 'damage') && target.hp > player.hp) return [1, 2];
						}
					},
				},
			},
			//露露娜Ruruna
			miluan: new toSkill('active', {
				usable: 1,
				filterTarget(card, player, target) {
					return player.canCompare(target);
				},
				selectTarget: [1, 2],
				content() {
					player.chooseToCompare(targets).callback = lib.skill.miluan.callback;
				},
				callback() {
					if (Evt.winner != player) {
						player.damage(target)
						player.draw(2)
					}
					if (Evt.winner != target) {
						target.damage(player)
						target.draw(2)
					}
				},
				ai: {
					order(item, player) {
						return 6
					},
					result: {
						player(player, target) {
							if (player.hp === 1) return -2
							return 1;
						},
						target(player, target) {
							if (target.hp === 1 || target.countCards('h') === 1) return get.damageEffect(target, player, target)
							return 2;
						}
					},
					threaten: 0.2
				},
			}, 'multitarget'),
			shenjiao: new toSkill('trigger', {
				filter(Evt, player) {
					return Evt.num > 0;
				},
				content: [() => {
					player.chooseTarget(get.$pro2('shenjiao')).set('ai', function (target) {
						let player = _status.event.player;
						return get.$a(player, target) / ((target.$.shenjiao_dam || 0) + 1);
					})
				}, () => {
					if (result.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('shenjiao', Evt.target)
						Evt.target.hasSkill('shenjiao_dam') ? Evt.target.$.shenjiao_dam++ : Evt.target.addTempSkill('shenjiao_dam')
					}
				}],
			}, 'direct').set('subSkill', {
				dam: new toSkill('mark', {
					init(player, skill) {
						if (!player.$[skill]) {
							player.$[skill] = 1;
						}
					},
					trigger: { player: 'damageBegin3' },
					content() {
						trigger.num -= player.$.shenjiao_dam
					},
					ai: {
						effect: {
							target(card, player, target, current) {
								if (get.tag(card, 'damage') && target.$.shenjiao_dam) return [1, -target.$.shenjiao_dam];
							}
						},
					},
					intro: {
						content: '受到的伤害-#'
					}
				}, 'forced', 'onremove', 'mark')
			}).setT('damageAfter'),
			//茶冷
			huomo: new toSkill('trigger', {
				round: 1,
				filter(Evt, player) {
					return get.type(Evt.card) !== 'equip' && game.countPlayer(cur => cur !== player && get.$dis(cur, player) <= 1) && player.countCards('he')
				},
				content: [() => {
					player.chooseToDiscard('he', get.$pro2('huomo')).set('ai', card => {
						let player = _status.event.player, source = _status.event.source, list = game.filterPlayer(cur => cur !== player && get.$dis(cur, player) <= 1);
						let eff = 0
						for (let v of list) {
							get.effect(v, _status.event.card, source, player) * (_status.event.targets.includes(v) ? -1 : 1)
						}
						if (eff > 0) return get.unuseful2(card)
						if (eff = 0) return get.unuseful(card)
						return -1
					}).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player)
				}, () => {
					if (result.bool) {
						if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
						Evt.targets = game.filterPlayer(cur => cur !== player && get.$dis(cur, player) <= 1);
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets) {
						if (!Evt.isOnline()) game.delay(2);
						player.logSkill('huomo', Evt.targets);
						if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
						else trigger.targets.addArray(Evt.targets);
					}
				}],
				ai: {
					threaten: 0.9
				},
			}, 'direct').setT({ target: 'useCardToTarget' }),
			tuying: new toSkill('trigger', {
				filter(Evt, player) {
					return player.hasHistory('useCard', (evt) => evt.getParent('phaseUse') === Evt);
				},
				content: [() => {
					Evt.history = player.getHistory('useCard', (evt) => evt.getParent('phaseUse') === trigger)
				}, () => {
					Evt._result = {};
					if (Evt.history.length && player.countCards('hs')) {
						let first = Evt.history[0].targets, last = Evt.history.pop().card,
							card = { name: last.name, nature: last.nature };
						if (lib.filter.cardEnabled(card)) {
							if (player.hasUseTarget(card)) {
								lib.skill.tuyingx.viewAs = card
								lib.skill.tuyingx.first = first
								var next = player.chooseToUse();
								if (next.isOnline()) {
									player.send(function (card) {
										lib.skill.tuyingx.viewAs = card
										lib.skill.tuyingx.first = first
									}, card)
								}
								next.logSkill = 'tuying';
								next.set('openskilldialog', `涂映：将一张手牌当${get.translation(card)}使用`);
								next.set('norestore', true);
								next.set('_backupevent', 'tuyingx');
								next.set('custom', {
									add: {},
									replace: { window: function () { } }
								});
								next.backup('tuyingx');
							}
						}
					}
				}],
			}, 'direct').setT('phaseUseAfter'),
			tuyingx: new toSkill('regard', {
				filterCard: function (card) {
					return get.itemtype(card) == 'card';
				},
				selectCard: 1,
				position: 'hs',
				popname: true,
				onuse(result, player) {
					let first = lib.skill.tuyingx.first
					if (first && first.length !== result.targets.length) {
						let next = game.createEvent('tuyinghouxu')
						next.player = player;
						next._trigger = result;
						next.num = first.length - result.targets.length;
						next.setContent([() => {
							let prompt2 = `为${get.$t(Evt.card)}${num > 0 ? `增加` : `减少`}${get.cnNumber(Math.abs(num))}个目标`;
							player.chooseTarget(Math.abs(num), get.$pro2('tuying'), (card, player, target) => {
								let source = _status.event.source;
								if (_status.event.targets.includes(target))
									return _status.event.num < 0
								else
									return _status.event.num > 0 && lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
							}).set('prompt2', prompt2).set('ai', target => {
								let player = _status.event.player, source = _status.event.source;
								return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
							}).set('targets', trigger.targets).set('card', trigger.card).set('source', player).set('num', num)
						}, () => {
							if (result.bool) {
								if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
								Evt.targets = result.targets;
							}
						}, () => {
							if (Evt.targets) {
								player.logSkill('tuying', Evt.targets);
								if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
								else trigger.targets.addArray(Evt.targets);
							}
						}]);
					}
				}
			}),
			//小可
			mian: {
				init(player, skill) {
					if (!player.$[skill]) {
						player.$[skill] = {
							ms: [],
							ans: []
						};
					}
				},
				locked: true,
				notemp: true,
				marktext: '面',
				intro: {
					mark(dialog, content, player) {
						if (player.$.mian.ms && player.$.mian.ms.length) {
							let list = player.$.mian.ms.slice(0);
							dialog.addText('明置面条');
							dialog.addSmall(list);
						}
						if (player.$.mian.ans && player.$.mian.ans.length) {
							if (player.isUnderControl(true)) {
								let list = player.$.mian.ans.slice(0);
								dialog.addText('暗置面条');
								dialog.addSmall(list);
							} else {
								dialog.addText(`暗置面条（${get.cnNumber(player.$.mian.ans.length)}张）`);
							}
						}
					},
					content: 'cards',
					onunmark(storage, player) {
						if ((storage && storage.ms && storage.ms.length) || (storage && storage.ans && storage.ans.length)) {
							let cards = storage.ms.concat(storage.ans);
							player.$throw(cards, 1000);
							game.cardsDiscard(cards);
							game.log(cards, '被置入了弃牌堆');
							storage.ms.length = 0;
							storage.ans.length = 0;
						}
					},
				},
				cardAround: ['ms', 'ans']
			},
			dianying: {
				trigger: { player: 'damageBegin' },
				direct: true,
				filter(Evt, player) {
					if (!Evt.source || !Evt.source.isIn()) return false;
					return player.$.mian.ms && player.$.mian.ms.length >= 3;
				},
				content: [() => {
					let list2 = player.$.mian.ms.slice(0), list: Dialogword = ['『店营』：可以暗置3碗或以上的面条'];
					if (list2 && list2.length) {
						list.push('明置面条');
						list.push([list2, 'card']);
					}
					list.push('hidden');
					Evt.source = trigger.source;
					let check = trigger.num == 1 && Evt.source.isFriendsOf(player);
					let next = player.chooseButton(list);
					next.set('selectButton', [3, Infinity]);
					next.set('source', Evt.source);
					next.set('ai', function (button) {
						if (!_status.event.check) return -1;
						let player = _status.event.player, source = _status.event.source;
						return get.value(button.link, source, 'raw');
					});
					next.set('check', check)
				}, () => {
					if (result.bool && result.links) {
						player.logSkill('dianying', Evt.source);
						lib.skill.dianying.process(player, result.links);
						trigger.num--;
						trigger.dianyingCards = result.links;
						player.addTempSkill('dianying_ifDamageZero');
						game.delay(0.5);
					}
				}],
				subSkill: {
					ifDamageZero: {
						trigger: { player: 'damageZero' },
						filter(Evt) {
							return Evt.dianyingCards;
						},
						forced: true,
						content() {
							Evt.source = trigger.source;
							Evt.cards = trigger.dianyingCards;
							player.$.mian.ans.removeArray(Evt.cards);
							player.updateMarks();
							player.$give(Evt.cards, Evt.source);
							Evt.source.gain(Evt.cards, 'log');
						}
					}
				},
				process(player, cards) {
					let storage = player.getStorage('mian');
					if (storage.ans && storage.ms) {
						let giveAutos = [], drawAutos = [], source;
						for (let i = 0; i < cards.length; i++) {
							if (storage.ms.includes(cards[i])) {
								player.$give(cards[i], player, false);
								storage.ms.remove(cards[i]);
								storage.ans.push(cards[i]);
							} else if (storage.ans.includes(cards[i])) {
								player.$give(cards[i], player, false);
								storage.ans.remove(cards[i]);
								storage.ms.push(cards[i]);
							} else if (get.owner(cards[i])) {
								source = get.owner(cards[i]);
								giveAutos.add(cards[i]);
								storage.ans.push(cards[i]);
							} else {
								drawAutos.add(cards[i]);
								game.cardsGotoSpecial(cards[i]);
								storage.ans.push(cards[i]);
							}
						}
						if (drawAutos.length) player.$drawAuto(drawAutos);
						if (source && giveAutos.length) {
							source.$giveAuto(giveAutos, player);
						}
						player.markSkill('mian');
					}

				},
				ai: {
					threaten: 1.5
				},
				global: 'dianying2',
				group: 'mian',
			},
			dianying2: {
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.countCards('he') && game.hasPlayer(cur => cur.hasSkill('dianying') && cur != player);
				},
				filterCard: true,
				selectCard: [1, Infinity],
				filterTarget(card, player, target) {
					return target.hasSkill('dianying') && target != player;
				},
				discard: false,
				toStorage: true,
				position: 'he',
				usable: 1,
				prompt() {
					let player = _status.event.player;
					let list = game.filterPlayer(cur => cur.hasSkill('dianying'));
					let str = '将至少一张牌交给' + get.$t(list);
					if (list.length > 1) str += '中的一人';
					return str;
				},
				complexCard: true,
				check(card) {
					if (!ui.selected.cards.length) return 8 - get.value(card);
					return 6 - ui.selected.cards.length - get.value(card);
				},
				content: [() => {
					lib.skill.dianying.process(target, cards);
				}, () => {
					let list1 = target.$.mian.ans.slice(0);
					let list: Dialogword = ['『店营』：是否选择两碗面条明置'];
					if (list1.length) {
						list.push('暗置面条');
						if (target.isUnderControl(true)) list.push([list1, 'card']);
						else {
							list1.randomSort();
							list.push([list1, 'blank']);
						}
					}
					list.push('hidden');
					let next = player.chooseButton(list);
					next.set('selectButton', 2);
					next.set('target', target);
					next.set('ai', function (button) {
						let player = _status.event.player;
						let target = _status.event.target;
						return get.$a(player, target) <= 0 || get.recoverEffect(player, target, player) > 0;
					});
				}, () => {
					if (result.bool && result.links) {
						player.line(target);
						lib.skill.dianying.process(target, result.links);
					} else {
						Evt.finish();
					}
				}, () => {
					player.recover(target);
				}],
				ai: {
					order: 6,
					result: {
						player(player, target) {
							let num = get.recoverEffect(player, target, player)
							if (target.getStorage('mian').ans.length <= 3) num += get.$a(player, target) / 2
							if (!player.needsToDiscard()) num - 1
							return num
						},
						target(player, target) {
							if (target.getStorage('mian').ans.length > 6) return 0
							if (target.getStorage('mian').ans.length > 3) return 0.5
							return 2
						}
					}
				}
			},
			ganfen: {
				audio: 2,
				trigger: { player: ['phaseJudgeBefore', 'phaseDrawBefore', 'phaseUseBefore', 'phaseDiscardBefore'] },
				clickChange: '停业',
				clickable(player) {
					if (player.$.ganfen_clickChange === undefined) player.$.ganfen_clickChange = false;
					else player.$.ganfen_clickChange = !player.$.ganfen_clickChange;
				},
				clickableFilter(player) {
					return player.$.ganfen_clickChange !== false;
				},
				filter(Evt, player) {
					if (player.$.ganfen_clickChange === false) return false;
					return player.hasSkill('mian');
				},
				prompt(Evt) {
					let str = get.$pro('ganfen');
					str += '跳过';
					str += get.$t(Evt.name);
					return str;
				},
				check(Evt, player) {
					if (['phaseDraw', 'phaseUse'].includes(Evt.name) || player.hp <= 1) return false;
					if (Evt.name == 'phaseJudge' && player.countCards('j') > 1) return true;
					return player.hp > 2 && player.countCards;
				},
				content: [() => {
					trigger.cancel();
				}, () => {
					player.damage();
				}, () => {
					Evt.cards = get.cards(3);
					lib.skill.dianying.process(player, Evt.cards);
				}],
				group: 'ganfen_fanmian',
				subSkill: {
					fanmian: {
						trigger: { player: ['useCardAfter', 'respondAfter'] },
						filter(Evt, player) {
							if (player.$.ganfen_clickChange === false) return false;
							if (player.$.mian && player.$.mian.ans.length) {
								return get.type(Evt.card) == 'basic';
							}
						},
						direct: true,
						content: [() => {
							Evt.card = trigger.card;
							let list1 = player.$.mian.ans.slice(0);
							let list: Dialogword = ['『擀奋』：选择面条翻面'];
							if (list1.length) {
								list.push('暗置面条');
								list.push([list1, 'card']);
							}
							list.push('hidden');
							Evt.list1 = list1;
							player.chooseButton(list);
						}, () => {
							if (result.bool && result.links?.length) {
								player.logSkill('ganfen');
								lib.skill.dianying.process(player, result.links);
								game.delay(0.5);
							}
						}],
					}
				}
			},
			//启七海
			niyou: {
				trigger: { global: 'phaseEnd' },
				priority: 49,
				filter(Evt, player) {
					return player.getHistory('damage').length;
				},
				forced: true,
				content: [() => {
					game.delay(1);
					Evt.phaseUse = player.phaseUse();
				}, () => {
					if (!player.hasHistory('useCard', evt => {
						return evt.getParent('phaseUse') == Evt.phaseUse;
					})) {
						player.turnOver();
						player.draw(2);
					} else {
						player.markSkill('niyou');
						player.$.niyou = player.$.niyou ? (player.$.niyou + 1) : 1;
					}
				}],
				intro: {
					content: '心之壁厚度：#'
				},
				mod: {
					globalFrom(from, to, distance) {
						if (from.$.niyou) return distance + from.$.niyou;
					}
				}
			},
			shalu: {
				audio: 3,
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				filterTarget(card, player, target) {
					if (!player.inRange(target)) return true;
				},
				filterCard: true,
				selectCard: -1,
				content: [() => {
					target.damage('nocard');
				}, () => {
					if (target.hp > 0) player.draw(target.hp);
				}],
				ai: {
					order(item, player) {
						if (player.countCards('h', { suit: 'heart' })) return 4;
						else return 1;
					},
					result: {
						player(player, target) {
							return target.hp - player.countCards('h');
						},
						target(player, target) {
							if (target.hasSkill('shenyou')) return 0;
							return get.damageEffect(target, player, target);
						}
					},
					expose: 0.2,
				},
			},
			//启阿梓
			puyu: {
				audio: true,
				trigger: { player: 'phaseUseBegin' },
				priority: 510,
				filter(Evt, player) {
					return game.hasPlayer(cur => cur.countCards('he'))
				},
				direct: true,
				content: [() => {
					player.chooseTarget(get.$pro2('puyu'), (card, player, target) => target.countCards('he')).set('ai', function (target) {
						let player = _status.event.player;
						return get.effect(target, { name: 'guohe_copy2' }, player, player);
					})
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('puyu', Evt.target);
						Evt.target.chooseToDiscard('『璞玉』：请弃置一张牌', true, 'he').set('ai', card => {
							let player = _status.event.player, source = _status.event.source, num = 2;
							if (get.$a(player, source) > 0 && source.getUseValue(card)) {
								if (source.countCards('h') > 3) {
									num += 3 * get.value(card, source)
								} else if (source.countCards('h') > 0) {
									num += get.value(card, source)
								}
							}
							num -= get.value(card, player)
							return num;
						}).set('source', player);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards) {
						Evt.card = result.cards[0];
						player.$.puyu_phaseEndBy = Evt.card;
						player.$.puyu_phaseEndBy2 = [0, 0];
						player.addTempSkill('puyu_phaseEndBy', { player: 'phaseUseEnd' })
						game.delayx();
					}
				}],
				subSkill: {
					phaseEndBy: {
						mark: true,
						intro: {
							mark(dialog, storage, player) {
								if (storage) {
									dialog.addSmall('所有手牌视为：');
									dialog.addSmall([storage]);
									dialog.addSmall(`本阶段已使用${player.$.puyu_phaseEndBy2[0]}张牌<br>所有角色已获得${player.$.puyu_phaseEndBy2[1]}张牌`);
								}
							},
						},
						mod: {
							cardname(card, player, name) {
								if (player.$.puyu_phaseEndBy && get.position(card) == 'h') return get.name(player.$.puyu_phaseEndBy);
							},
						},
						onremove: ['puyu_phaseEndBy', 'puyu_phaseEndBy2'],
						trigger: { player: 'useCardAfter', global: 'gainAfter' },
						priority: 510,
						filter(Evt, player) {
							return game.hasPlayer(cur => cur.countCards('he'))
						},
						direct: true,
						content() {
							if (trigger.name == 'useCard') player.$.puyu_phaseEndBy2[0]++;
							else player.$.puyu_phaseEndBy2[1] += trigger.cards.length;
							if (player.$.puyu_phaseEndBy2[0] >= 5, player.$.puyu_phaseEndBy2[1] >= 10) {
								let evt = _status.event.getParent('phaseUse');
								if (evt?.name == 'phaseUse' && evt.player == player) {
									evt.skipped = true;
								}
							} else player.markSkill('puyu_phaseEndBy')
						}
					}
				}
			},
			appojian: {
				audio: 3,
				trigger: { source: 'damageAfter' },
				priority: 199,
				filter(Evt, player) {
					return Evt.getParent().type == 'card' && game.hasPlayer(cur => !Evt.getParent().targets.includes(cur));
				},
				forced: true,
				content: [() => {
					player.chooseTarget('『破茧』：令体力最多的一名角色失去体力', true, function (card, player, target) {
						return target.isMaxHp();
					}).set('ai', function (target) {
						return 1 - get.$a2(target);
					});
				}, () => {
					if (result.bool) {
						result.targets[0].loseHp();
					} else Evt.finish();
				}, () => {
					player.chooseTarget('『破茧』：令体力最少的一名角色回复体力', true, function (card, player, target) {
						return target.isMinHp();
					}).set('ai', function (target) {
						let player = _status.event.player
						return get.recoverEffect(target, player, player);
					});
				}, () => {
					if (result.bool) {
						result.targets[0].recover();
					}
				}, () => {
					if (player.isMaxHp() || player.isMinHp()) {
						let evt = _status.event.getParent('phaseUse');
						if (evt?.name == 'phaseUse') {
							evt.skipped = true;
						}
						let phase = _status.event.getParent('phase');
						if (phase?.name == 'phase') {
							phase.finish();
						}
					}
				}],
				ai: {
					effect: {
						player(card, player, target, current) {
							if (get.tag(card, 'damage')) return [1, 2];
						}
					},
				},
			},


			//园长
			dieyuan: {
				trigger: { global: 'recoverAfter' },
				filter(Evt, player) {
					return Evt.player != player && Evt.player.isIn();
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					Evt.gainnum = Math.abs(Evt.target.hp - player.hp) || 1;
					Evt.target.draw(Evt.gainnum);
				}, () => {
					if (Evt.target.isIn()) {
						Evt.gainnum = Math.abs(Evt.target.hp - player.hp) || 1;
						Evt.target.chooseCard(Evt.gainnum, 'he', `将${get.cnNumber(Evt.gainnum)}张牌交给${get.$t(player)}`).set('ai', card => {
							if (_status.event.goon > 0) return 0;
							if (_status.event.goon < 0) return 1 - get.value(card);
							return 5 - get.value(card);
						}).set('goon', function () {
							if (get.recoverEffect(player, Evt.target, Evt.target) > 0) return 1;
							if (player.isHealthy() || get.$a(player, Evt.target) <= 0) return -1;
							return 0;
						}());
					} else Evt.finish();
				}, () => {
					if (!result.bool || !result.cards) {
						player.recover(Evt.target);
					} else {
						Evt.target.give(result.cards, player, true);
					}
				}],
				ai: {
					expose: 0.1
				}
			},
			shengyang: {
				enable: 'phaseUse',
				usable: 1,
				filterCard: true,
				position: 'he',
				filterTarget(card, player, target) {
					return target != player;
				},
				check(card) {
					let num = get.value(card);
					if (get.color(card) == 'black') {
						if (num >= 6) return 0;
						return 20 - num;
					} else {
						if (_status.event.player.needsToDiscard()) {
							return 7 - num;
						}
					}
					return 0;
				},
				discard: false,
				lose: false,
				delay: false,
				content: [() => {
					target.gain(cards, player, 'giveAuto');
				}, () => {
					Evt.gainnum = (Math.abs(target.hp - player.hp) || 1) * 2;
					player.judge(card => {
						let evt = _status.event.getParent('shengyang')
						if (evt?.gainnum >= get.number(card)) return 3
						if (evt?.target?.isDamaged()) return 1;
						return -1;
					}).set('callback', function () {
						let evt = _status.event.getParent('shengyang')
						if (!evt || evt.name != 'shengyang') return;
						if (Evt.judgeResult.number <= evt.gainnum) player.gainPlayerCard([1, evt.gainnum], evt.target, true);
						else evt.target.recover();
					});
				}],
				ai: {
					order: 8,
					expose: 0.2,
					result: {
						target(player, target) {
							return get.recoverEffect(target, player, target);
						}
					}
				}
			},
			//道姑
			daoyi: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				map: ['color', 'number', 'suit', 'name'],
				trigger: { global: 'judge' },
				filter: () => true,
				direct: true,
				content: [() => {
					Evt.target = trigger.player;
					let list = [];
					if (lib.skill.daoyi.map[player.$.daoyi] == 'name') {
						for (let i = 0; i < lib.inpile.length; i++) {
							let name = lib.inpile[i];
							list.push([get.type2(name), '', name]);
						}
					} else {
						for (let i = 0; i < lib[lib.skill.daoyi.map[player.$.daoyi]].length; i++) {
							let name = lib[lib.skill.daoyi.map[player.$.daoyi]][i];
							list.push([lib.skill.daoyi.map[player.$.daoyi], '', name]);
						}
					}
					let str = `${get.$t(Evt.target)}的${trigger.judgestr || ''}判定为${get.$t(Evt.target.judging[0])}，是否发动『道易』，修改判定结果？`;
					let dialog = ui.create.dialog(str, [list, 'vcard'], 'hidden');
					player.chooseButton(dialog).set('ai', function (button) {
						let judging = _status.event.judging, player = _status.event.player, change = _status.event.change;
						let trigger = _status.event.getTrigger(), res1 = trigger.judge(judging);
						let card = {
							name: get.name(judging),
							nature: get.nature(judging),
							suit: get.suit(judging),
							color: get.color(judging),
							number: get.number(judging),
						}, att = get.$a(player, trigger.player);
						if (att == 0) return 0;
						card[change] = button.link[2];
						let now = trigger.judge(card);
						let effect = (now - res1) * att;
						if (player.$.daoyi == 3 && _status.currentPhase && _status.currentPhase.isIn()) effect += (get.damageEffect(_status.currentPhase, player, player)) * 1.5;
						return effect;
					}).set('change', lib.skill.daoyi.map[player.$.daoyi]).set('judging', Evt.target.judging[0]);
				}, () => {
					if (result.bool == true) {
						let link = result.links[0][2];
						player.addExpose(0.25);
						player.logSkill('daoyi', Evt.target);
						player.popup(link);
						game.log(player, '将判定结果改为了', '#y' + get.$t(link));
						if (!trigger.fixedResult) trigger.fixedResult = {};
						if (lib.skill.daoyi.map[player.$.daoyi] == 'number') trigger.fixedResult[lib.skill.daoyi.map[player.$.daoyi]] = lib.number.indexOf(link) + 1;
						else trigger.fixedResult[lib.skill.daoyi.map[player.$.daoyi]] = link;
						console.log(trigger.fixedResult)
					} else Evt.finish();
				}, () => {
					if (player.$.daoyi < 3) player.$.daoyi++;
					else {
						player.$.daoyi = 0;
						if (_status.currentPhase && _status.currentPhase.isIn()) {
							player.line(_status.currentPhase);
							_status.currentPhase.damage(1, 'thunder');
						}
					}
				}],
			},
			shengyin: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card, player, target) {
					return target != player && target.countCards('h');
				},
				content: [() => {
					target.chooseCard('h', '『盛阴』：请展示一张牌', true);
				}, () => {
					if (result.cards) {
						let card = result.cards[0];
						target.showCards(card, '『盛阴』展示手牌');
						Evt.card = card;
						Evt.color = get.color(card);
						Evt.type2 = get.type2(card);
					} else Evt.finish();
				}, () => {
					let next = target.judge(card => {
						let evt = _status.event.getParent('shengyin')
						if (get.color(card) == evt?.color) return 2;
						if (get.type2(card) == evt?.type2) return -1;
						return 0;
					});
					next.set('callback', function () {
						let evt = _status.event.getParent('shengyin')
						if (!evt || evt.name != 'shengyin') return;
						let color = evt.color, type2 = evt.type2, card0 = evt.card, source = evt.player;
						if (get.type2(Evt.judgeResult.name) == type2) source.gain(card0, player, 'give');
						if (Evt.judgeResult.color == color) game.asyncDraw([player, source]);
					});
				}],
				ai: {
					order: 8,
					expose: 0.2,
					result: {
						target(player, target) {
							return 2;
						}
					}
				}
			},
			//魂喵喵
			hun: {
				locked: true,
				intro: {
					name: '『修又』：魂',
					content: 'cards',
					onunmark: 'throw',
				},
				cardAround: true
			},
			xiuyou: {
				intro: {
					name: '已发动『修又』的目标角色',
					mark(dialog, storage, player) {
						if (storage && storage.length) {
							let name = storage.map(cur => get.name(cur));
							dialog.addSmall([name, 'character']);
						}
					},
					content(storage, player) {
						return `已『修又』${get.cnNumber(storage.length)}名角色`
					},
				},
				trigger: { player: 'dying' },
				filter(Evt, player) {
					return player.getStorage('hun').length > 2 && _status.currentPhase && _status.currentPhase.isIn();
				},
				logTarget(Evt, player) {
					return _status.currentPhase;
				},
				forced: true,
				content: [() => {
					if (!player.$.xiuyou) player.$.xiuyou = [];
					Evt.target = _status.currentPhase;
					Evt.cards = player.getStorage('hun').slice(0);
					player.chooseCardButton(Evt.cards, `###『修又』选择交给${get.$t(Evt.target)}的牌###${get.skillInfoTranslation('xiuyou', player)}`, true).set('ai', function (button) {
						let player = _status.event.player;
						return get.$a(player, _status.currentPhase) && get.buttonValue(button);
					});
				}, () => {
					if (result.bool) {
						Evt.num = player.$.xiuyou.includes(Evt.target) ? 2 : 1;
						Evt.cards.removeArray(result.links);
						Evt.target.gain(result.links, 'gain2');
						player.unmarkAuto('hun', result.links);
					} else Evt.finish();
				}, () => {
					let str = `选项A：将全部手牌与${get.$t(player)}的「魂」交换<br>选项B：令${get.$t(player)}摸「魂」数量张牌<br>选项C：令${get.$t(player)}回复一点体力`;
					let list = [[['A', '', '选项A']], [['B', '', '选项B']], [['C', '', '选项C']]];
					Evt.videoId = lib.status.videoId++;
					game.broadcastAll(function (id, choicelist, str, num) {
						let dialog = ui.create.dialog(`『修又』：请选择${get.cnNumber(num)}项`);
						dialog.addSmall(str)
						choicelist.forEach(element => {
							dialog.add([element, 'vcard']);
						})
						dialog.videoId = id;
					}, Evt.videoId, list, str, Evt.num);
				}, () => {
					Evt.target.chooseButton(true, Evt.num).set('dialog', Evt.videoId).set('prompt', get.$pro('tiantang'));
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						result.links.forEach(element => {
							switch (element[0]) {
								case 'A':
									let cards = Evt.target.getCards('h');
									player.unmarkAuto('hun', Evt.cards);
									Evt.target.lose(cards, ui.special);
									Evt.target.gain(Evt.cards);
									Evt.target.$give(cards, player);
									player.markAuto('hun', cards);
									break;
								case 'B':
									player.draw(player.getStorage('hun').length);
									break;
								case 'C':
									player.recover(Evt.target);
									break;
							}
						});
					}
				}, () => {
					player.$.xiuyou.add(Evt.target);
				}],
				group: ['hun', 'xiuyou_gainMark'],
				subSkill: {
					gainMark: {
						trigger: { player: ['judgeEnd', 'damageEnd'] },
						forced: true,
						filter(Evt, player) {
							if (Evt.name == 'judge') return get.position(Evt.result.card, true) == 'o';
							return true;
							// return get.itemtype(Evt.cards)=='cards'&&get.position(Evt.cards[0],true)=='o';
						},
						content() {
							Evt.cards = trigger.name == 'judge' ? [trigger.result.card] : get.cards();
							game.cardsGotoSpecial(Evt.cards)
							player.markAuto('hun', Evt.cards);
							player.$gain2(Evt.cards);
						}
					}
				}
			},
			jiyuan: {
				trigger: { global: 'phaseZhunbeiBegin' },
				filter(Evt, player) {
					return Evt.player.isIn();
				},
				check(Evt, player) {
					return player == Evt.player;
				},
				logTarget: 'player',
				round: 1,
				content() {
					Evt.target = trigger.player;
					let next = Evt.target.judge(card => {
						if (get.color(card) == 'red') return 2;
						if (get.color(card) == 'black') return -2;
						return 0;
					});
					next.set('callback', function () {
						if (Evt.judgeResult.color == 'red') player.draw(2);
						if (Evt.judgeResult.color == 'black') player.damage('nosource', 'nocard');
					});
				},
			},
			//菜菜姐
			tibing: {
				trigger: { player: ['phaseZhunbeiBegin', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseDiscardBefore', 'phaseJieshuBegin'] },
				forced: true,
				direct: true,
				filter: () => true,
				content() {
					trigger.cancel();
				},
				group: ['tibing_drawBy', 'tibing_discardBy'],
				subSkill: {
					drawBy: {
						trigger: { player: ['phaseUseBegin'] },
						forced: true,
						filter: () => true,
						content: [() => {
							player.draw(2);
						}, () => {
							player.gain(player.getCards('ej'), player, 'giveAuto', 'log');
						}],
					},
					discardBy: {
						trigger: { player: ['phaseUseEnd'] },
						forced: true,
						filter: () => true,
						content: [() => {
							player.showHandcards();
						}, () => {
							player.discard(player.getCards('h', { type: ['equip', 'trick', 'delay'] }));
						}],
					}
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.type(card) == 'delay') return [0.1, 1];
						}
					}
				}
			},
			guangtui: {
				trigger: { global: 'phaseDiscardBegin' },
				filter(Evt, player) {
					return Evt.player != player && player.isDamaged();
				},
				check(Evt, player) {
					return player.hp <= 2 || get.$a(player, Evt.player);
				},
				content: [() => {
					player.loseMaxHp(true);
				}, () => {
					trigger.cancel(true);
					game.delayx();
				}, () => {
					player.phaseUse();
				}],
				ai: {
					threaten(player, target) {
						if (!target.isDamaged()) return 0.6;
					}
				}
			},
			//蓝蓝
			zhepie: {
				trigger: { player: ['phaseZhunbeiBegin'] },
				filter(Evt, player) {
					return true;
				},
				usable: 1,
				content: [() => {
					Evt.card = get.cards()[0];
					player.showCards(Evt.card);
					game.delayx();
				}, () => {
					player.chooseTarget(true).set('ai', function (target) {
						let type2 = get.type2(_status.event.card);
						let att = get.$a2(target);
						if (target.countCards('h', { type2: type2 }) <= 1 || type2 == 'equip') {
							if (target == player) return 1 + att;
							return att
						}
						if (type2 == 'basic' && target.countCards('h', { type2: type2 }) >= 1 && att < 0) {
							return -att;
						}
						return get.value(card) * att / 4;
					}).set('card', Evt.card).set('createDialog',
						['『折撇』：令一名角色获得此牌',
							[[Evt.card], 'card']]);
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.line(Evt.target, 'ocean');
						Evt.target.gain(Evt.card, 'gain2', 'log');
						if (!Evt.target.$.zhepie_cardDisable) Evt.target.$.zhepie_cardDisable = [];
						Evt.target.$.zhepie_cardDisable.add(Evt.card);
						Evt.target.addTempSkill('zhepie_cardDisable', { player: 'phaseAfter' });
						game.delayx();
					}
				}],
				subSkill: {
					cardDisable: {
						mark: true,
						intro: {
							name: '折撇',
							content: 'cards',
						},
						onremove: true,
						mod: {
							cardEnabled(card, player) {
								if (player.getStorage('zhepie_cardDisable').filter(zhepie => get.type2(zhepie) == get.type2(card)).length) return false;
							},
							cardSavable(card, player) {
								if (player.getStorage('zhepie_cardDisable').filter(zhepie => get.type2(zhepie) == get.type2(card)).length) return false;
							},
						},
					}
				},
				ai: {
					threaten: 1.2,
				}
			},
			chumo: {
				trigger: {
					player: 'loseAfter',
					global: 'cardsDiscardAfter',
				},
				filter(Evt, player) {
					if (Evt.name == 'lose') {
						if (Evt.position != ui.discardPile) return false;
					} else {
						let evt = Evt.getParent();
						if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player != player || !['useCard', 'respond'].includes(evt.relatedEvent.name)) return false;
					}
					return (Evt.cards2 || Evt.cards).filterInD('d').length > 0;
				},
				round: 1,
				direct: true,
				content: [() => {
					let cards = (trigger.cards2 || trigger.cards).filterInD('d');
					Evt.cards = cards;
					player.chooseTarget().set('ai', function (target) {
						let att = get.$a2(player, target);
						let num = 0;
						for (let i of _status.event.cards) {
							if (get.value(i) < 0 && att < 0 && !num) num += 1;
							if (get.value(i) > 0 && att > 0 && !num) num += att;
							if (!target.hasUseTarget(i)) num += 2;
						}
						return num;
					}).set('cards', cards).set('createDialog',
						[get.$pro2('chumo'),
						[cards, 'card']]);
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('chumo', Evt.target);

						let evt = trigger.getParent().relatedEvent;
						if ((trigger.name == 'discard' && !trigger.delay) || evt?.name == 'respond') game.delayx();
						if (Evt.cards.length == 1) {
							Evt._result = { links: [Evt.cards[0]] };
							Evt.goto(3);
						}
					} else Evt.finish();
				}, () => {
					player.chooseCardButton(Evt.cards, true, `选择令${get.$t(Evt.target)}获得的牌`, function (button) {
						let evt = _status.event.getParent();
						let att = get.$a(evt.player, evt.target), i = button.link, value = get.value(i, target, 'raw');
						if (!evt.target.hasUseTarget(i)) return att * value + 4;
						return att * value;
					});
				}, () => {
					if (result.links?.length) {
						Evt.card = result.links[0];
						Evt.target.gain(Evt.card, 'gain2', 'log');
						if (!Evt.target.hasUseTarget(Evt.card)) {
							player.draw(2);
						};
					}
				}],
				ai: {
					threaten(player, target) {
						if (target.isDamaged()) return 1.2;
					}
				}
			},

			//亚哈
			ahbingyi: {
				trigger: { global: ['drawBegin'] },
				filter(Evt, player) {
					return Evt.num && Evt.player != player && Evt.player.isMaxHandcard();
				},
				check(Evt, player) {
					if (Evt.num < 2) return false;
					return get.$a(player, Evt.player) < -1 && player.hp >= 3;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					player.loseHp();
				}, () => {
					trigger.cancel();
					game.delayx();
				}, () => {
					if (Evt.target.countDiscardableCards(player, 'he')) {
						player.discardPlayerCard(Evt.target, 'he', true);
					}
				}],
				ai: {
					threaten: 1.1,
				}
			},
			sujian: {
				trigger: { player: 'damageEnd' },
				filter(Evt, player) {
					return get.itemtype(Evt.cards) == 'cards' && get.position(Evt.cards[0], true) == 'o';
				},
				content() {
					game.cardsGotoSpecial(trigger.cards);
					player.$gain2(trigger.cards);
					player.markAuto('sujian_su', trigger.cards);
				},
				group: ['sujian_su', 'sujian_chooseBy', 'sujian_changeBy'],
				subSkill: {
					su: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						intro: {
							content: 'cards',
							locked: true,
							notemp: true,
							marktext: '🚨',
							onunmark(storage, player) {
								if (storage && storage.length) {
									player.$throw(storage, 1000);
									game.cardsDiscard(storage);
									game.log(storage, '被置入了弃牌堆');
									storage.length = 0;
								}
							},
							cardAround: true
						}
					},
					chooseBy: {
						trigger: { player: 'ahbingyiAfter' },
						filter(Evt, player) {
							return player.countCards('h');
						},
						direct: true,
						content: [() => {
							player.chooseCard('h', '发动『秉义』时，可以将一张手牌置于武将牌上').set('ai', card => {
								return 7 - get.value(card, player);
							}).set('logSkill', 'sujian');
						}, () => {
							if (result.bool && result.cards) {
								player.lose(result.cards, 'toStorage');
								player.$gain2(result.cards);
								player.markAuto('sujian_su', result.cards);
							}
						}],
					},
					changeBy: {
						trigger: { global: ['useCard'] },
						filter(Evt, player) {
							if (!Evt.targets.length) return false;
							if (!player.getStorage('sujian_su').length) return false;
							return player.getStorage('sujian_su').filter(card => {
								return get.name(Evt.card) == get.name(card) || get.suit(Evt.card) == get.suit(card);
							}).length;
						},
						direct: true,
						content: [() => {
							Evt.sujian = player.getStorage('sujian_su').slice(0);
							Evt.card = trigger.card;
							Evt.target = trigger.player;
							let check = 0;
							for (let i of trigger.targets) {
								if (get.effect(i, Evt.card, Evt.target, player) < 0) check++;
							}
							if (check < Evt.sujian.length) check = 0;
							player.chooseCardButton(Evt.sujian, `###${get.$pro('sujian')}###将一张对应${get.$t(Evt.card)}的「肃」置于牌堆顶`).set('filterButton', function (button) {
								let card = button.link;
								return get.name(_status.event.card0) == get.name(card) || get.suit(_status.event.card0) == get.suit(card);
							}).set('ai', function (button) {
								if (!_status.event.check) return -1;
								return 1;
							}).set('check', check).set('card0', Evt.card);
						}, () => {
							if (result.bool && result.links) {
								let card = result.links[0];
								player.logSkill('sujian', Evt.target);
								player.$.sujian_su.remove(card);
								ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
								player.$throw(card, 1000);
								game.log(player, `将${get.$t(card)}置于牌堆顶`);
								player.updateMarks();
							} else Evt.finish();
						}, () => {
							let prompt2 = `为${get.$t(Evt.card)}减少任意个目标`
							player.chooseTarget('『肃监』：选择目标角色', [1, Infinity], function (card, player, target) {
								if (_status.event.targets.includes(target)) return true;
							}).set('prompt2', prompt2).set('ai', function (target) {
								let card = _status.event.card, player = _status.event.player, source = _status.event.source;
								return get.effect(target, card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
							}).set('targets', trigger.targets).set('card', Evt.card).set('source', Evt.target);
						}, () => {
							if (!Evt.isMine()) game.delayx();
							Evt.targets = result.targets;
						}, () => {
							if (Evt.targets) {
								player.logSkill('sujian', Evt.targets);
								if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
							}
						}]
					}
				},
				ai: {
					combo: 'ahbingyi',
					maixie: true,
					maixie_hp: true,
					effect: {
						target(card, player, target) {
							if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
							if (get.tag(card, 'damage')) return [1, 0.55];
						}
					}
				}
			},
			//雨街F
			ciling: new toSkill('trigger', {
				filter(Evt, player) {
					return game.countPlayer(cur => cur !== player && !cur.hasSkill('ciling2'))
				},
				content: [() => {
					player.chooseTarget(get.$pro2('ciling'), function (card, player, target) {
						return target !== player && !target.hasSkill('ciling2')
					}).set('ai', tar => get.$a2(tar) < 0)
				}, () => {
					if (result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('ciling', Evt.target);
						Evt.target.addSkill('ciling2')
						trigger.cancel();
						game.delayx();
					}
				}],
				ai: {
					threaten: 1.1,
				},
				involve: 'ciling',
				subSkill: {
					dis: new toSkill('trigger', {
						filter(Evt, player) {
							return Evt.player.isIn() && Evt.player !== player && Evt.player.hasSkill('ciling2')
						},
						content: [() => {
							Evt.cards = trigger.cards
							Evt.target = trigger.player
							player.chooseControl('dialogcontrol', ['1.获得其弃牌', '2.视为对其使用一张【杀】', '取消']).set('ai', function () {
								let { player, target, cards } = _status.event.getParent();
								// let values = cards?0:get.value(cards,'raw',player)
								let values = get.value(cards || [], 'raw', player)
								console.log(get.effect(target, { name: 'sha' }, player, player))
								if (get.effect(target, { name: 'sha' }, player, player) > values / 3) return 0
								if (values > 0) return 1
								return 2
							}).set('check', (get.$a(player, _status.currentPhase) > 0) ? 0 : 1).set('prompt', get.$pro2('ciling', Evt.target)).set('addDialog', Evt.cards ? [Evt.cards] : []);
						}, () => {
							if (result.control.indexOf('1.') === 0 && Evt.cards.length) {
								player.gain(Evt.cards, 'log', 'gain2')
							}
							else if (result.control.indexOf('2.') === 0) {
								player.useCard({ name: 'sha' }, Evt.target, false)
							}
						}]
					}).setT({ global: 'phaseDiscardEnd' })
				},
				group: 'ciling_dis'
			}, 'direct').setT('phaseUseBefore'),
			ciling2: new toSkill('mark', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				filter(Evt, player) {
					return Evt.name === 'dying' || Evt.target.hasSkill('ciling')
				},
				intro: {
					content: '被追杀中，已累计对杀手使用#张【杀】'
				},
				content() {
					if (trigger.name === 'dying') {
						delete player.$.ciling2
						player.removeSkill('ciling2')
					}
					else {
						if (++player.$.ciling2 >= 3) {
							delete player.$.ciling2
							player.removeSkill('ciling2')
						}
					}
				}
			}, 'locked', 'mark').setT(['sha', 'dying'], 'Begin'),
			xiyu: new toSkill('trigger', {
				filter(Evt, player) {
					return player !== _status.currentPhase
				},
				content() {
					player.draw()
				}
			}, 'forced').setT('useCard2'),
			//Gaku
			exi: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card, player, target) {
					return target.countCards('h') && target != player;
				},
				filter(Evt, player) {
					return true;
				},
				content: [() => {
					player.chooseToPSS(target);
				}, () => {
					if (!result.tie) {
						let card = { name: 'sha' };
						if (result.winner == 'stone') card.name = 'juedou';
						if (result.bool) {
							player.draw(2);
							target.useCard(card, player, false, 'noai');
						} else {
							target.draw(2);
							player.useCard(card, target, false, 'noai');
						}
					}
				}],
				ai: {
					order: 10,
					result: {
						player: 1,
						target: -0.1,
					}
				}
			},
			suisui: {
				trigger: { player: 'damageBegin3' },
				forced: true,
				usable: 1,
				filter(Evt, player) {
					return !Evt.source && player.hp != 1 || Evt.source && player.hp == 1;
				},
				content() {
					trigger.cancel();
				},
				ai: {
					threaten(player, target) {
						if (target.hp == 1) return 0.5;
						return 1;
					},
				}
			},

			//星宫汐
			yuanyao: {
				enable: 'phaseUse',
				filter(Evt, player) {
					if (player.countCards('h') > player.maxHp || player.countCards('h') == player.hp) return false;
					return (player.getStat('skill').yuanyao || 0) < game.countPlayer(cur => cur.sex == 'female');
				},
				complexCard: true,
				filterCard(Evt, player) {
					if (player.countCards('h') > player.hp) return true;
					return false;
				},
				selectCard() {
					let player = _status.event.player;
					if (player.countCards('h') > player.hp) return (player.countCards('h') - player.hp);
					return -1;
				},
				discard: true,
				check(card) {
					return 7.5 - get.value(card);
				},
				content: [() => {
					if (cards && cards.length) {
						Evt.change = 'discard';
						Evt.num = cards.length;
					} else {
						Evt.change = 'draw';
						Evt.num = player.hp - player.countCards('h');
					}
				}, () => {
					switch (Evt.change) {
						case 'discard': {
							player.recover(Evt.num); break;
						}
						case 'draw': {
							player.draw(Evt.num); player.loseHp(Evt.num); break;
						}
					}
				}],
				ai: {
					order: 1.5,
					result: {
						player(player) {
							let num = game.countPlayer(cur => cur.sex == 'female') - (player.getStat('skill').yuanyao || 0);
							if (num > 1) return player.countCards('h');
							return player.countCards('h') - player.hp;
						},
					},
				},
			},
			gongni: {
				audio: true,
				trigger: { player: ['phaseZhunbeiBegin', 'useCardAfter', 'respondAfter'] },
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'yami',
				filter(Evt, player) {
					if (Evt.name != 'phaseZhunbei' && _status.currentPhase == player) return false;
					return game.countPlayer() == game.countPlayer(cur => cur.isDamaged() && cur.hp >= 0);
				},
				logTarget(Evt, player) {
					return game.players;
				},
				check(Evt, player) {
					let effect = 0;
					game.filterPlayer(cur => {
						effect += (cur.getDamagedHp() - cur.hp) * get.$a(player, target);
					})
					return effect >= 3;
				},
				content: [() => {
					player.$.gongni = true;
					player.awakenSkill('gongni');
					Evt.doon = [];
					Evt.current = player;
				}, () => {
					player.line(Evt.current, 'ocean');
					Evt.current.hp = (Evt.current.getDamagedHp());
					Evt.current.$thunder();
					game.log(Evt.current, '的体力变为', '#g' + Evt.current.hp);
					Evt.current.update();
					game.delayx(1.2);
					Evt.doon.add(Evt.current);
				}, () => {
					if (!Evt.doon.includes(Evt.current.next)) {
						Evt.current = Evt.current.next;
						Evt.goto(1);
					}
				}],
			},
			//紫海由爱
			lianyin: {
				trigger: { global: ['useCard', 'respond'] },
				priority: 996,
				filter(Evt, player) {
					if (Evt.name == 'respond' && !player.awakenedSkills.includes('guixiang')) return false;
					if (!player.$.lianyin) player.$.lianyin = 0;
					if (!player.$.guixiang) player.$.guixiang = 0;
					return Evt.player != player && player == _status.currentPhase && player.$.lianyin < player.maxHp;
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > -1;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					game.asyncDraw([player, Evt.target]);
				}, () => {
					player.$.lianyin++;
					player.$.guixiang++;
					player.markSkill('guixiang');
				}],
				group: 'lianyin_clear',
				subSkill: {
					clear: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							return player.$.lianyin;
						},
						content() {
							player.$.lianyin = 0;
						}
					},
				},
			},
			guixiang: {
				skillAnimation: true,
				unique: true,
				juexingji: true,
				forced: true,
				init(player) {
					player.$.guixiang = 0;
				},
				intro: {
					content: '已发动了&次『联音』',
				},
				trigger: { player: 'phaseZhunbeiBegin' },
				filter(Evt, player) {
					return player.$.guixiang >= game.countPlayer();
				},
				content: [() => {
					player.gainMaxHp();
				}, () => {
					player.recover();
				}, () => {
					player.$.guixiang = true;
					player.awakenSkill('guixiang');
					player.unmarkSkill('guixiang');
				}],
				ai: {
					combo: 'lianyin',
				},
			},
			//亚里亚
			xuanying: {
				trigger: { global: ['useCard', 'respond'] },
				priority: 996,
				filter(Evt, player) {
					if (Evt.name == 'respond' && !player.awakenedSkills.includes('houfan')) return false;
					if (!player.$.xuanying) player.$.xuanying = 0;
					return Evt.player != player && player == _status.currentPhase && player.$.xuanying < (player.countCards('e') || 1);
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCard(`###${get.$pro('xuanying')}###将一张牌交给${get.$t(Evt.target)}`, 'he').set('target', Evt.target).ai = card => {
						let player = _status.event.player, target = _status.event.target;
						if (get.position(card) == 'e') return ((player.countCards('e') + 1) || 1) + get.value(card, target, 'raw') * get.$a(player, target);
						else if (get.type(card) == 'equip') return ((player.countCards('e')) || 1) + get.value(card, target, 'raw') * get.$a(player, target);
						return 1 + get.value(card, target, 'raw') * get.$a(player, target);
					};
				}, () => {
					if (result.bool && result.cards) {
						if (get.type(result.cards[0]) == 'equip') Evt.drawNum = 'equip';
						player.give(result.cards, Evt.target, true);
					} else Evt.finish();
				}, () => {
					player.chooseTarget(`『玄荫』：令你或其摸${get.cnNumber(Evt.drawNum == 'equip' ? player.countCards('e') + 1 : 1)}张牌`, function (card, player, target) {
						return player == target || target == _status.event.target;
					}).set('target', Evt.target).ai = function (target) {
						if (target != player && target.hasSkillTag('nogain')) return 0;
						return get.$a(player, target);
					};
				}, () => {
					if (result.bool && result.targets?.length) {
						if (Evt.drawNum == 'equip') result.targets[0].draw(player.countCards('e') + 1 || 1);
						else result.targets[0].draw();
					}
				}],
				group: 'xuanying_clear',
				subSkill: {
					clear: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							return player.$.xuanying;
						},
						content() {
							player.$.xuanying = 0;
						}
					},
				},
			},
			houfan: {
				enable: 'phaseUse',
				unique: true,
				limited: true,
				filter(Evt, player) {
					return player.isMinHandcard();
				},
				content: [() => {
					player.loseMaxHp();
					Evt.num = 0;
				}, () => {
					let card = get.discardPile(card => get.type(card) == 'equip');
					if (card) {
						player.gain(card, 'gain2');
						Evt.num++;
					} else Evt.goto(3);
				}, () => {
					if (Evt.num < 4) Evt.goto(1);
				}, () => {
					player.$.houfan = true;
					player.awakenSkill('houfan');
				}],
				ai: {
					combo: 'xuanying',
					order(item, player) {
						let equips = [];
						for (let i = 0; i < ui.discardPile.childElementCount; i++) {
							let subtype = get.subtype(ui.discardPile.childNodes[i]);
							if (subtype && player.countCards('h', { subtype: subtype }) == 0) {
								equips.add(ui.discardPile.childNodes[i]);
							}
						}
						if (equips.length >= 3) return 10;
						return 0;
					},
					result: { player: 3 },
				}
			},
			//纸木铗
			quzhuan: {
				trigger: { global: 'useCardAfter' },
				usable: 1,
				filter(Evt, player) {
					return player == _status.currentPhase && Evt.player != player && get.itemtype(Evt.cards) == 'cards' && Evt.cards.filterInD().length;
				},
				prompt2(Evt, player) {
					return '你可以获得' + get.$t(Evt.cards.filterInD());
				},
				check(Evt, player) {
					return Evt.cards.filterInD().length > 1 || get.value(Evt.cards.filterInD()[0], player) > 1;
				},
				content() {
					player.gain(trigger.cards.filterInD(), 'gain2');
				}
			},
			yuanjiu: {
				trigger: { global: 'phaseUseBegin' },
				direct: true,
				filter(Evt, player) {
					let esuits = get.suit3(Evt.player.getCards('e'));
					return esuits.length && player.countDiscardableCards(player, 'he', card => esuits.includes(card));
				},
				content: [() => {
					Evt.target = trigger.player;
					let suits = get.suit3(Evt.target.getCards('e'));
					player.chooseCard('he', get.$pro2('yuanjiu'), card => _status.event.suits.includes(get.suit(card))).set('suits', suits).set('ai', card => {
						let target = _status.event.getParent().target;
						let player = _status.event.player;
						if (target.hasSha() && target.getUseValue('jiu') > 0 && get.$a(player, target) > 0) return 11 - get.value(card);
						return 0;
					}).set('logSkill', ['yuanjiu', Evt.target]);
				}, () => {
					if (result.bool) {
						player.give(result.cards, Evt.target, true);
					} else Evt.finish();
				}, () => {
					player.useCard({ name: 'jiu' }, Evt.target);
				}]
			},
			//ccm
			qijian: {
				audio: 4,
				trigger: { global: 'useCardAfter' },
				filter(Evt, player) {
					if (player.hasSkill('qijian_lost')) return false;
					return Evt.player == _status.currentPhase && Evt.player != player && get.color(Evt.card) == 'red' && Evt.targets && Evt.targets.length;
				},
				prompt2(Evt, player) {
					return `你可以跟随${get.$t(Evt.cards)}使用一张牌`;
				},
				check(Evt, player) {
					return Evt.cards.length > 1 || get.value(Evt.cards[0], player) > 1;
				},
				direct: true,
				content: [() => {
					player.chooseToUse({
						prompt: `###${get.$t('qijian')}###跟随${get.$t(trigger.player)}使用一张牌？`,
						filterCard(card, player) {
							return lib.filter.filterCard.apply(this, arguments);
						},
						addCount: false,
					}).set('ai1', card => {
						let player = _status.event.player;
						let useBy = _status.event.useBy;
						if (get.tag(card, 'damage') && useBy.group == 'qun' && player.hasZhuSkill('jushi')) return get.order(card) + 10;
						return get.order(card);
					}).set('useBy', trigger.player).set('logSkill', 'qijian').set('targetRequired', true);
				}, () => {
					if (result.bool) {
						if (!player.hasHistory('sourceDamage', evt => evt.card.cardid == result.card.cardid && result.targets.includes(evt.player))) {
							player.draw();
							if (trigger.player.group != 'qun' || !player.hasZhuSkill('jushi')) player.addTempSkill('qijian_lost');
						}
					}
				}],
				subSkill: {
					lost: {}
				}
			},
			yizhan: {
				subSkill: {
					count: {
						trigger: {
							global: "recoverBegin",
						},
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							if (!Evt.card) return false;
							if (!Evt.source || Evt.source != player) return false;
							if (!Evt.player.isDying()) return false;
							if (Evt.player.$.yizhan_mark != undefined) return false;
							return true;
						},
						content() {
							trigger.yizhan = true;
						},
					},
					mark: {
						mark: 'character',
						locked: true,
						intro: {
							name: 'ccm的翅膀',
							content: '已被$发动『翼展』',
						},
					}
				},
				audio: true,
				group: ['yizhan_count'],
				trigger: {
					global: "recoverAfter",
				},
				init(player) {
					player.$.yizhan = false;
				},
				filter(Evt, player) {
					if (Evt.player.$.yizhan) return false;
					if (Evt.player.isDying()) return false;
					return Evt.yizhan == true;
				},
				skillAnimation: true,
				animationColor: 'fire',
				frequent: true,
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					player.drawTo(player.getHandcardLimit());
				}, () => {
					Evt.target.changeGroup('qun');
					Evt.target.$.yizhan_mark = player;
					Evt.target.addSkill('yizhan_mark');
				}],
			},
			jushi: {
				unique: true,
				zhuSkill: true,
				mod: {
					maxHandcard(player, num) {
						if (player.hasZhuSkill('jushi') && game.countPlayer(cur => cur.group && cur.group == 'qun'))
							return num + game.countPlayer(cur => cur.group && cur.group == 'qun');
					},
				},
				ai: {
					combo: 'qijian'
				}
			},
			//Buff
			shangsheng: {
				audio: 5,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [-1, -1];
				},
				trigger: { player: 'phaseBegin' },
				check(Evt, player) {
					return true;
				},
				filter(Evt, player) {
					return true;
				},
				frequent: true,
				content: [() => {
					player.chooseControl('dialogcontrol', ['A.于摸牌阶段多摸1张牌', 'B.于出牌阶段多出1张【杀】', 'C.于弃牌阶段手牌上限+1']).set('ai', function () {
						let player = _status.event.player;
						let controls = _status.event.controls.slice(0);
						let map = ['A.于摸牌阶段多摸1张牌', 'B.于出牌阶段多出1张【杀】', 'C.于弃牌阶段手牌上限+1'];
						if (player.$.shangsheng[0] == -1) return controls.randomGet();
						else {
							if (player.$.shangsheng[0] >= 0) controls.remove(map[player.$.shangsheng[0]]);
							if (player.$.shangsheng[1] >= 0) controls.remove(map[player.$.shangsheng[1]]);
							if (controls.includes('B.于出牌阶段多出1张【杀】') && player.countCards('hs', 'sha') >= 2 && player.hasUseTarget({ name: 'sha', isCard: true })) return 'B.于出牌阶段多出1张【杀】';
							return controls.randomGet();
						}
					}).set('prompt', '『能力上升』：选择一项');
				}, () => {
					Evt.change = result.control;
					switch (Evt.change) {
						case 'A.于摸牌阶段多摸1张牌': {
							player.addTempSkill('shangsheng_Buff0'); break;
						}
						case 'B.于出牌阶段多出1张【杀】': {
							player.addTempSkill('shangsheng_Buff1'); break;
						}
						case 'C.于弃牌阶段手牌上限+1': {
							player.addTempSkill('shangsheng_Buff2'); break;
						}
					}
				}, () => {
					Evt.map = {
						'A.于摸牌阶段多摸1张牌': 1,
						'B.于出牌阶段多出1张【杀】': 2,
						'C.于弃牌阶段手牌上限+1': 3,
					}
					if (player.$.shangsheng[0] >= 0 && player.$.shangsheng[0] != Evt.map[Evt.change]
						&& player.$.shangsheng[1] >= 0 && player.$.shangsheng[1] != Evt.map[Evt.change]) player.$.shangsheng_Buff++;
					else if (player.$.shangsheng_Buff > 0) player.$.shangsheng_Buff--;
				}, () => {
					player.$.shangsheng[1] = player.$.shangsheng[0];
					player.$.shangsheng[0] = Evt.map[Evt.change];
					player.markSkill('shangsheng_Buff');
				}],
				group: 'shangsheng_Buff',
				subSkill: {
					Buff0: {
						trigger: { player: 'phaseDrawBegin2' },
						forced: true,
						filter(Evt, player) {
							return !Evt.numFixed;
						},
						content() {
							let Buff = (player.$.shangsheng_Buff) || 1;
							trigger.num += Buff;
						},
						mark: true,
						marktext: 'A',
						intro: { name: 'Buff', content: '本回合内于摸牌阶段多摸牌' },
					},
					Buff1: {
						mod: {
							cardUsable(card, player, num) {
								let Buff = (player.$.shangsheng_Buff) || 1;
								if (card.name == 'sha' && player.isPhaseUsing()) return num + Buff;
							},
						},
						mark: true,
						marktext: 'B',
						intro: { name: 'Buff', content: '本回合内于出牌阶段可以多使用【杀】' },
					},
					Buff2: {
						trigger: { player: 'phaseDiscardBegin' },
						forced: true,
						content() { },
						mod: {
							maxHandcard(player, num) {
								if (_status.event.name == 'phaseDiscard') {
									let Buff = (player.$.shangsheng_Buff) || 1;
									return num += Buff;
								}
							},
						},
						mark: true,
						marktext: 'C',
						intro: { name: 'Buff', content: '本回合于弃牌阶段手牌上限上升' },
					},
					Buff: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = 0;
						},
						marktext: "↑↑",
						locked: true,
						intro: {
							name: '能力值大上升↑↑',
							content: 'Buff已叠加&层',
						},
					}
				}
			},
			jinghua: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.getStat().card.sha > 0;
				},
				filterCard: true,
				complexCard: true,
				selectCard() {
					let player = _status.event.player;
					return player.getStat().card.sha;
				},
				complexTarget: true,
				multitarget: true,
				selectTarget() {
					if (!ui.selected.cards.length) return [1, 1];
					return [ui.selected.cards.length, ui.selected.cards.length];
				},
				filterTarget(card, player, target) {
					if (!ui.selected.cards.length) return false;
					return target != player;
				},
				discard: false,
				lose: false,
				check(card) {
					if (get.type(card) == 'basic') return 7 - get.value(card);
					return 4 - get.value(card);
				},
				content: [() => {
					Evt.shows = cards.slice(0);
					Evt.gains = targets.slice(0);
					if (!player.$.jinghua) player.$.jinghua = [];
					player.$.jinghua.addArray(Evt.gains);
				}, () => {
					let show = Evt.shows.shift();
					let gain = Evt.gains.shift();
					player.showCards(show, '『镜花水月』展示牌');
					gain.addSkill('jinghua2');
					player.give(show, gain, true);
					gain.markAuto('jinghua2', [show]);
					if (Evt.gains.length) Evt.redo();
				}],
				ai: {
					order: 7,
					result: {
						target: -1,
					}
				}
			},
			jinghua2: {
				marktext: '镜',
				intro: {
					name: '镜花水月',
					content: 'cards',
				},
				onremove: true,
				charlotte: true,
				mod: {
					cardEnabled(card, player) {
						if (player.getStorage('jinghua2').filter(jinghua => get.type2(jinghua) == get.type2(card)).length) return false;
					},
					cardSavable(card, player) {
						if (player.getStorage('jinghua2').filter(jinghua => get.type2(jinghua) == get.type2(card)).length) return false;
					},
				},
				trigger: {
					global: 'phaseBefore',
				},
				locked: true,
				direct: true,
				filter(Evt, player) {
					return Evt.player.hasSkill('jinghua') && Evt.player.getStorage('jinghua').includes(player);
				},
				content() {
					player.line(trigger.player);
					trigger.player.$.jinghua.remove(player);
					player.removeSkill('jinghua2');
				},
			},
			//七濑胡桃
			shang: {
				intro: {
					name: '裳',
					content: 'cards',
					onunmark: 'throw',
				},
				locked: true,
				cardAround: true,
			},
			shangbei: {
				group: ['shang', 'shangbei_give'],
				trigger: { player: 'damageAfter' },
				frequent: true,
				content: [() => {
					let cards = [ui.cardPile.firstChild];
					Evt.cards = cards;
					player.showCards(Evt.cards, '『裳备』展示牌');
				}, () => {
					if (!player.getStorage('shang').includes(get.suit(Evt.cards[0], false))) {
						player.$draw(Evt.cards);
						player.markAuto('shang', game.cardsGotoSpecial(Evt.cards).cards);
						player.draw();
					}
				}],
				subSkill: {
					give: {
						trigger: { player: 'phaseUseBegin' },
						direct: true,
						filter(Evt, player) {
							return player.getStorage('shang').length > 0;
						},
						content: [() => {
							Evt.cards = player.getStorage('shang');
						}, () => {
							Evt.videoId = lib.status.videoId++;
							let dialogx = ['###『裳备』：你的「裳」###选择某一类型的「裳」，然后令一名角色获得之'];
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
						}, () => {
							let next = player.chooseButton();
							next.set('selectButton', 1);
							next.set('dialog', Evt.videoId);
							next.set('ai', function (button) {
								return get.value(button.link);
							});
						}, () => {
							if (result.bool && result.links) {
								Evt.links = result.links;
								let func = function (cards, id) {
									let dialog = get.idDialog(id);
									if (dialog) {
										for (let j of cards) {
											for (let i = 0; i < dialog.buttons.length; i++) {
												if (get.type2(dialog.buttons[i].link) == get.type2(j)) {
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
								} else if (player == game.me && !_status.auto) {
									func(Evt.links, Evt.videoId);
								}
								player.chooseTarget('『裳备』：令一名角色获得之').set('ai', function (target) {
									let player = _status.event.player, effect = get.$a(player, target) * 1.5;
									if (target != player) effect += get.recoverEffect(player, player, player);
									return effect;
								});
							} else {
								if (player.isOnline2()) {
									player.send('closeDialog', Evt.videoId);
								}
								Evt.dialog.close();
								Evt.finish();
							}
						}, () => {
							if (result.bool && result.targets?.length) {
								Evt.target = result.targets[0];
								let type = get.type2(Evt.links[0]);
								Evt.cards = Evt.cards.filter(card => get.type2(card) == type);
								player.unmarkAuto('shang', Evt.cards);
								player.$give(Evt.cards, Evt.target);
								Evt.target.gain(Evt.cards, 'giveAuto');
								if (Evt.target != player) player.recover();
							} else {
								for (let i = 0; i < ui.dialog.buttons.length; i++) {
									ui.dialog.buttons[i].classList.remove('glow');
								}
								Evt.goto(2);
							}
						}, () => {
							if (player.isOnline2()) {
								player.send('closeDialog', Evt.videoId);
							}
							Evt.dialog.close();
						}],
					}
				}
			},
			qianqing: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				filter(Evt, player) {
					return player.getStorage('shang').length == 0;
				},
				content() {
					player.damage('nosource');
				}
			},
			//Rim
			shenghua: {
				enable: 'phaseUse',
				position: 'h',
				filter(Evt, player) {
					return player.countCards('h');
				},
				filterCard: true,
				selectCard: -1,
				check(card) {
					if (get.type(card) == 'equip') return 10 - get.value(card);
					return 6 - get.value(card);
				},
				content() {
					player.draw(cards.length - player.countSkill('shenghua'));
				},
				ai: {
					order(item, player) {
						if (player.countCards('h', { type: 'equip' })) return 4;
						else return 1;
					},
					result: {
						player(player) {
							if (player.isTurnedOver() && player.countCards('h', { type: 'equip' })) return 1;
							return 1 - player.countSkill('shenghua');
						}
					}
				}
			},
			zhanchong: {
				trigger: { player: 'loseEnd' },
				filter(Evt, player) {
					if (Evt.getParent().name && ['useCard', 'addJudge'].includes(Evt.getParent().name)) return false;
					if (!Evt.visible) return false;
					for (let i = 0; i < Evt.hs.length; i++) {
						if (get.type(Evt.hs[i]) == 'equip') return true;
					}
					return false;
				},
				direct: true,
				content: [() => {
					Evt.num ??= trigger.hs.filter(chong => get.type(chong) == 'equip').length;
					if (Evt.num > 0) {
						player.chooseTarget(get.$pro2('zhanchong'), function (card, player, target) {
							return target.countCards('he');
						}).set('ai', function (target) {
							let player = _status.event.player;
							if (player.isTurnedOver()) return 4 - get.$a(player, target);
							return -1 - get.$a(player, target);
						});
					} else Evt.finish();
				}, () => {
					if (result.bool && result.targets[0]) {
						Evt.target = result.targets[0];
						player.discardPlayerCard(result.targets[0], 'he', true).set('ai', function (button) {
							if (get.type(button.link) == 'equip') return 2 - get.value(button.link);
							return 3 - get.value(button.link) + get.damageEffect(_status.event.target, _status.event.player, _status.event.player);
						})
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards?.length) {
						player.turnOver();
						Evt.num--;
						if (get.type(result.cards[0]) != 'equip') {
							Evt.target.damage(player);
						}
						Evt.goto(0);
					}
				}],
			},
			//情绪
			baiqing: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				trigger: { global: 'useCard2' },
				filter(Evt, player) {
					if (Evt.card.name != 'sha') return false;
					return true;
				},
				direct: true,
				content: [() => {
					if (!player.$.baiqing) player.$.baiqing = 0;
					player.$.baiqing++;
					player.markSkill('baiqing');
				}, () => {
					if (player.getDamagedHp() + 1 == player.$.baiqing) {
						player.chooseBool(get.$pro2('baiqing')).ai = function () {
							return 1;
						};
					}
				}, () => {
					if (result.bool) {
						Evt.cards = get.cards(player.$.baiqing);
						player.showCards(`『白情』亮出牌堆顶${get.cnNumber(player.$.baiqing)}张牌`, Evt.cards);
					} else Evt.finish();
				}, () => {
					let discards = [];
					if (trigger.cards) {
						Evt.cards = Evt.cards.filter(card => {
							for (let i = 0; i < trigger.cards.length; i++) {
								if (get.color(trigger.cards[i]) == get.color(card)) {
									discards.add(card);
									return false;
								}
							}
							return true;
						})
					}
					if (discards.length) {
						game.cardsDiscard(discards);
					}
					player.gain(Evt.cards, 'log', 'gain2');
				}],
				marktext: 'ヰ',
				mark: true,
				intro: {
					content: '全场已使用#张杀',
				},
				group: 'baiqing_clear',
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						priority: 42,
						content() {
							player.unmarkSkill('baiqing');
							player.$.baiqing = 0;
						}
					},
				},
			},
			shuangxing: {
				trigger: { player: 'useCard2' },
				filter(Evt, player) {
					if (get.type2(Evt.card) != 'trick') return false;
					return Evt.targets && Evt.targets.length && !Evt.targets.includes(player);
				},
				direct: true,
				content: [() => {
					let controls = ['令你本回合使用牌无次数限制', '令其中一名目标对你使用一张【杀】，否则你获得其一张牌', '取消'];
					player.chooseControl('dialogcontrol', controls).set('ai', function () {
						let player = _status.event.player;
						if (player.countCards('hs', 'sha') > 2 && !player.hasSkill('shuangxing_chenhui') && !player.hasUnknown(2)) return 0;
						return 1;
					}).set('prompt', get.$pro2('shuangxing'));
				}, () => {
					switch (result.control) {
						case '令你本回合使用牌无次数限制': {
							player.logSkill('shuangxing');
							player.addTempSkill('shuangxing_chenhui');
							Evt.finish();
							break;
						}
						case '令其中一名目标对你使用一张【杀】，否则你获得其一张牌': {
							player.chooseTarget(get.$pro2('shuangxing'), function (card, player, target) {
								return _status.event.targets.includes(target) && target.countCards('h');
							}).set('ai', function (target) {
								if (get.$a(player, target) < 0) {
									if (player.maxHp - player.hp + 1 > player.$.baiqing) return 4;
									else return 5 - target.countCards('hs');
								}
								return 0;
							}).set('targets', trigger.targets);
							break;
						}
						default: Evt.finish();
					}
				}, () => {
					if (result.bool && result.targets[0]) {
						let target = result.targets[0];
						Evt.target = target;
						player.logSkill('shuangxing', target);
						target.chooseToUse(function (card, player, Evt) {
							if (get.name(card) != 'sha') return false;
							return lib.filter.filterCard.apply(this, arguments);
						}, `『星徊』：对${get.$t(player)}使用一张杀，或令其获得你的一张牌`).set('targetRequired', true).set('complexSelect', true).set('filterTarget', function (card, player, target) {
							if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
							return lib.filter.targetEnabled2.apply(this, arguments);
						}).set('sourcex', player);
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool == false && Evt.target.countGainableCards(player, 'he') > 0) {
						player.gainPlayerCard(Evt.target, 'he', true);
					} else {
						Evt.finish();
					}
				}],
				subSkill: {
					chenhui: {
						mark: true,
						intro: {
							content: '本回合使用牌无次数限制',
						},
						mod: {
							cardUsable(card, player, num) {
								return Infinity;
							},
						},
					}
				}
			},
			//可不
			nisheng: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { global: 'phaseEnd' },
				filter(Evt, player) {
					if (Evt.skill) return false;
					return player.countCards('h', card1 => {
						let num = get.number(card1, player);
						if (player.getStorage('nisheng').includes(num)) return false;
						return player.countCards('h', card2 => card1 != card2 && num == get.number(card2, player));
					}) >= 2;
				},
				content: [() => {
					player.chooseCard(get.$pro2('nisheng'), 'h', 2, function (card, player) {
						let num = get.number(card);
						if (player.getStorage('nisheng').includes(num)) return false;
						if (ui.selected.cards.length) return num == get.number(ui.selected.cards[0]);
						return true;
					}).ai = get.unuseful2;
				}, () => {
					if (result.bool && result.cards[0]) {
						player.showCards(result.cards, '拟声');
						player.$.nisheng.add(get.number(result.cards[0]));
						player.markSkill('nisheng');
						player.insertPhase();
					} else {
						Evt.finish();
					}
				}],
				intro: {
					content: '已使用过的点数：#',
				},
			},
			jingyan: {
				trigger: { player: 'damageEnd' },
				filter(Evt, player) {
					return Evt.source && Evt.source.isIn() && Evt.source.countCards('he') / 2 > 0;
				},
				check(Evt, player) {
					return Evt.source.countCards('he') / 2 >= 2 || player.isTurnedOver();
				},
				logTarget: 'source',
				content: [() => {
					player.turnOver();
				}, () => {
					player.gainPlayerCard(trigger.source, true, 'he', Math.ceil(trigger.source.countCards('he') / 2));
				}],
				ai: {
					maixie: true,
					skillTagFilter(player) {
						return player.isTurnedOver();
					},
				}
			},
			//猫又小粥
			fantuan: {
				trigger: { player: 'useCard2' },
				direct: true,
				filter(Evt) {
					return get.type(Evt.card) == 'delay';
				},
				content: [() => {
					player.chooseTarget(get.$pro2('fantuan')).set('ai', function (target) {
						let player = _status.event.player;
						return get.recoverEffect(target, player, player) + get.$a(player, target);
					});
				}, () => {
					if (result.bool && result.targets[0]) {
						result.targets[0].recover();
						result.targets[0].draw();
					}
				}],
			},
			shengang: {
				group: ['shengang_judge', 'shengang_useCard'],
				subSkill: {
					judge: {
						trigger: { global: ['judgeAfter'] },
						filter(Evt, player) {
							if (!game.filterPlayer(cur => get.$dis(player, cur, 'pure') == 1, [player]).includes(Evt.player)) return false;
							return Evt.card && get.type(Evt.card) == 'delay' && get.position(Evt.card) == 'd';
						},
						prompt2(Evt, player) {
							return '获得' + get.$t(Evt.card);
						},
						check(Evt, player) {
							return get.value(Evt.card) > 3;
						},
						round: 2,
						content() {
							player.gain(trigger.card, 'gain2', 'log');
						},
					},
					useCard: {
						trigger: { global: ['useCardAfter'] },
						filter(Evt, player) {
							if (!game.filterPlayer(cur => get.$dis(player, cur, 'pure') == 1, [player]).includes(Evt.player)) return false;
							return Evt.cards && Evt.cards.filterInD().length;
						},
						prompt2(Evt, player) {
							return '获得' + get.$t(Evt.cards.filterInD());
						},
						check(Evt, player) {
							return get.value(Evt.cards.filterInD()) > 3;
						},
						round: 2,
						content() {
							player.gain(trigger.cards.filterInD(), 'gain2', 'log');
						},
					}
				}
			},
			//狮白牡丹
			dan: {
				locked: true,
				marktext: '弹',
				intro: {
					content: 'cardCount',
				},
				cardAround: true
			},
			sbliedan: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { player: 'useCardToPlayered' },
				filter(Evt, player) {
					return get.name(Evt.card) == 'sha' && Evt.target.countCards('he');
				},
				logTarget: 'target',
				content: [() => {
					Evt.target = trigger.target;
					Evt.num = Math.min(game.roundNumber || 1, 7);
					Evt.target.chooseCard('he', Evt.num, true, `『烈弹』：将${get.cnNumber(Evt.num)}张牌置为「弹」`);
				}, () => {
					if (result.bool && result.cards.length) {
						Evt.target.lose(result.cards, ui.special, 'toStorage');
						target.addSkill('sbliedan2');
						target.$.sbliedan2 = Evt.num;
						player.markAuto('dan', result.cards);
					}
				}],
				group: ['dan', 'sbliedan_gainBy'],
				subSkill: {
					gainBy: {
						trigger: { player: 'phaseEnd' },
						forced: true,
						popup: false,
						filter(Evt, player) {
							return player.$.dan && player.$.dan.length > 0;
						},
						content() {
							game.log(player, `收回了${get.cnNumber(player.gain(player.$.dan, 'draw', 'fromStorage').cards.length)}张「弹」`);
							player.$.dan.length = 0;
						},
					}
				}
			},
			sbliedan2: {
				trigger: { global: 'phaseDiscardEnd' },
				direct: true,
				filter(Evt, player) {
					return player.$.sbliedan2;
				},
				content: [() => {
					Evt.num = player.$.sbliedan2;
					let cards = [];
					game.filterPlayer(cur => {
						if (cur.getStorage('dan').length) cards.addArray(cur.getStorage('dan'));
					});
					if (cards.length) {
						player.chooseCardButton(cards, Evt.num, `『烈弹』：可以收回${get.cnNumber(Evt.num)}张「弹」`);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links.length) {
						game.filterPlayer(cur => {
							if (cur.getStorage('dan').length) cur.unmarkAuto('dan', result.links);
						})
						game.log(player, `收回了${get.cnNumber(player.gain(result.links, 'draw', 'fromStorage').cards.length)}张「弹」`);
						delete player.$.sbliedan2;
						player.removeSkill('sbliedan2');
					}
				}],
				intro: {
					onunmark: 'throw',
					content: 'cardCount',
				},
			},
			buqiang: {
				trigger: { global: 'changeHp' },
				direct: true,
				filter(Evt, player) {
					return Evt.player.hp == 1 && player.canUse('sha', Evt.player, false) && (player.hasSha() || _status.connectMode && player.countCards('hs'));
				},
				content() {
					Evt.target = trigger.player;
					player.chooseToUse(get.$pro2('buqiang', Evt.target), function (card, player, Evt) {
						if (get.name(card) != 'sha') return false;
						return lib.filter.filterCard.apply(this, arguments);
					}, Evt.target, -1).set('addCount', false).set('logSkill', 'buqiang');
				},
			},
			//PPH
			pphpanfeng: {
				trigger: { player: ['phaseUseBegin', 'damageAfter'] },
				filter(Evt, player) {
					return !player.hasSkill('pphpanfeng_used');
				},
				content() {
					player.judge(card => {
						if (get.color(card) == 'red') return 2;
						return 0;
					}).callback = lib.skill.pphpanfeng.callback;
				},
				callback: [() => {
					if (Evt.judgeResult.color == 'red') {
						player.chooseTarget('『攀峰』：对体力最多的角色造成一点伤害', true, function (card, player, target) {
							return target.isMaxHp();
						}).set('ai', function (target) {
							let player = _status.event.player;
							return get.damageEffect(target, player, player);
						});
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						player.logSkill('pphpanfeng', Evt.target);
						Evt.target.damage('nocard');
					}
				}],
				group: 'pphpanfeng_usedBy',
				subSkill: {
					usedBy: {
						trigger: { global: 'dyingAfter' },
						forced: true,
						popup: false,
						filter(Evt, player) {
							return Evt.player.isAlive() && Evt.reason && Evt.reason.getParent().name == 'judgeCallback'
								&& Evt.reason.getParent(3).name == 'pphpanfeng' && Evt.reason.getParent(3).player == player;
						},
						content() {
							player.addTempSkill('pphpanfeng_used');
						}
					},
					used: {
						mark: true,
						marktext: '峰',
						intro: {
							content: '不能发动『攀峰』'
						}
					}
				}
			},
			lanyue: {
				trigger: { global: 'damageSource' },
				filter(Evt, player) {
					if (Evt._notrigger.includes(Evt.player)) return false;
					if (!player.countCards('h')) return false;
					return (Evt.card && Evt.card.name == 'sha' && Evt.getParent().name == 'sha' &&
						Evt.source.isAlive());
				},
				direct: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'metal',
				content: [() => {
					Evt.target = trigger.source;
					Evt.num = trigger.num;
					let check = get.$a(player, Evt.target) > 0 && (!Evt.target.countCards('h') || Evt.num >= 2)
					player.chooseToDiscard(get.$pro2('lanyue')).set('ai', card => {
						let check = _status.event.check;
						if (!check) return 0;
						return get.unuseful2(card);
					}).set('check', check);
				}, () => {
					if (result.bool && result.cards) {
						player.logSkill('lanyue', Evt.target);
						player.awakenSkill('lanyue');
						Evt.target.gainMaxHp();
					} else Evt.finish();
				}, () => {
					let list = [player];
					list.add(Evt.target);
					game.asyncDraw(list, Evt.num)
				}]
			},
			//喵喵人
			shenghuo: {
				audio: 3,
				init(player, skill) {
					player.markSkill('shenghuo');
					if (!player.$[skill]) player.$[skill] = 0;
				},
				enable: 'phaseUse',
				position: 'h',
				filter(Evt, player) {
					return !player.getStat('skill').shenghuo || player.getStat('skill').shenghuo < player.$.shenghuo + 1;
				},
				content: [() => {
					Evt.topCards = get.cards(player.$.shenghuo + 1);
					Evt.bottomCards = get.bottomCards(player.$.shenghuo + 1);
					Evt.bottomCards.removeArray(Evt.topCards);
					let cards = Evt.topCards.concat(Evt.bottomCards);
					player.chooseButton([0, Infinity], true, ['『圣火』：按顺序选择置于牌堆另一端的牌（先选择的在外侧）', '牌堆顶', [Evt.topCards, 'card'], '牌堆底', [Evt.bottomCards, 'card']]).set('ai', function (button) {
						let player = _status.event.player, now = _status.currentPhase, next = now.getNext();
						let att = get.$a(player, next), card = button.link;
						let bottomCards = _status.event.bottomCards;
						let judge = next.getCards('j')[ui.selected.buttons.filter(buttonx => bottomCards.includes(buttonx.link)).length];
						if (judge) {
							if (bottomCards.includes(card)) return get.judge(judge)(card) * att;
							else return -get.judge(judge)(card) * att;
						}
						if (bottomCards.includes(card)) return next.getUseValue(card) * att;
						return -next.getUseValue(card) * att;
					}).set('bottomCards', Evt.bottomCards);
				}, () => {
					if (result.bool && result.links) {
						let links = result.links.slice(0)
						let top = Evt.topCards.slice(0).removeArray(links), bottom = Evt.bottomCards.slice(0).removeArray(links);
						for (let i = 0; i < links.length; i++) {
							if (Evt.topCards.includes(links[i])) bottom.push(links[i]);
							if (Evt.bottomCards.includes(links[i])) top.unshift(links[i]);
						}
						for (let i = top.length - 1; i > -1; i--) {
							ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
						}
						for (let i = 0; i < bottom.length; i++) {
							ui.cardPile.appendChild(bottom[i]);
						}
						player.popup(`${get.cnNumber(top.length)}上${get.cnNumber(bottom.length)}下`);
						game.log(player, `将${get.cnNumber(top.length)}张牌置于牌堆顶`);
						game.updateRoundNumber();
						game.delay(2);
					}
				}],
				marktext: 'Nya',
				mark: true,
				intro: {
					content: '上次受到的伤害值为#',
				},
				group: 'shenghuo_change',
				subSkill: {
					change: {
						trigger: { player: 'damage' },
						filter(Evt, player) {
							return Evt.num > 0;
						},
						direct: true,
						content() {
							player.$.shenghuo = trigger.num;
							player.markSkill('shenghuo');
						}
					}
				},
				ai: {
					order(item, player) {
						if (player.countCards('hs', card => get.tag(card, 'draw'))) return 10;
						else return 1;
					},
					result: {
						player(player) {
							return 1;
						}
					}
				},
			},
			dipo: {
				audio: 1,
				trigger: {
					player: 'drawBegin'
				},
				filter(Evt, player) {
					return player.isDamaged();
				},
				forced: true,
				firstDo: true,
				content() {
					trigger.bottom = true;
					trigger.num++;
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					skillTagFilter(player) {
						return player.isHealthy();
					},
					threaten(player, target) {
						if (target.hp == target.maxHp) return 0.5;
						return 1.2;
					},
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'draw') && target.isDamaged()) return [1, 1];
						}
					}
				}
			},
			miaoche: {
				audio: 2,
				trigger: { global: 'loseAfter' },
				filter(Evt, player) {
					if (!player.hasZhuSkill('miaoche')) return false;
					return Evt.type == 'discard' && Evt.getParent('phaseDiscard').player == Evt.player && Evt.player.isYingV() && Evt.cards2.filterInD('d').length > 0;
				},
				zhuSkill: true,
				direct: true,
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					if (trigger.delay === false) game.delay();
					let cards = trigger.cards2.filterInD('d');
					player.chooseCardButton(cards, '『喵车』：是否获得其中的一张牌？').set('ai', function (button) {
						return get.value(button.link, _status.event.player);
					});
					"step 1"
					if (result.bool) {
						player.logSkill('miaoche', Evt.target);
						player.gain(result.links[0], 'gain2');
						game.delayx();
					}
				}],
			},
			//铁耗子
			haosun: {
				audio: 3,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: {
					player: 'phaseBegin'
				},
				filter(Evt, player) {
					return true;
				},
				direct: true,
				content: [() => {
					let controls = ['回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张', '声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张', '取消'];
					player.chooseControl('dialogcontrol', controls).set('ai', function () {
						let player = _status.event.player;
						if (player.isDamaged() || player.getStorage('haosun').length > 1) return 0;
						return 1;
					}).set('prompt', get.$pro2('haosun'));
				}, () => {
					switch (result.control) {
						case '回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张': {
							player.logSkill('haosun');
							player.recover();
							player.$.banmao = true;
							player.$.haosun = [];
							player.addTempSkill('haosun_drop');
							player.unmarkSkill('haosun');
							Evt.finish();
							break;
						}
						case '声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张': {
							player.chooseControl(get.inpile('basic', card => lib.filter.cardEnabled({ name: card }, player, 'forceEnable'))).set('prompt', '声明一种你可以使用的基本牌并令你不能使用之').set('choice', get.inpile('basic', card => {
								if (player.hasCard(card)) return false;
								return lib.filter.cardEnabled({ name: card }, player, 'forceEnable');
							})).set('ai', function () {
								let player = _status.event.player;
								let controls = _status.event.controls.slice(0);
								if (_status.event.choice && _status.event.choice.length) return _status.event.choice.randomGet();
								if (controls.includes('qi')) return 'qi';
								if (controls.includes('tao') && player.hp >= 2) return 'tao';
								if (controls.includes('jiu')) return 'jiu';
								return controls.randomGet();
							});
							break;
						}
						default: Evt.finish();
					}
				}, () => {
					if (result.control) {
						player.logSkill('haosun');
						player.popup(result.control);
						player.$.haosun.add(result.control);
						player.addTempSkill('haosun_plus');
						player.markSkill('haosun');
						game.delayx();
					}
				}],
				mod: {
					cardEnabled(card, player) {
						if (player.getStorage('haosun').includes(get.name(card))) return false;
					},
					cardSavable(card, player) {
						if (player.getStorage('haosun').includes(get.name(card))) return false;
					}
				},
				mark: true,
				intro: {
					content: '已禁用的基本牌：$',
				},
				subSkill: {
					drop: {
						trigger: {
							player: 'drawBegin'
						},
						forced: true,
						firstDo: true,
						content() {
							trigger.num--;
						},
						mark: true,
						intro: {
							content: '摸牌量-1',
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'draw')) return 0;
								}
							}
						}
					},
					plus: {
						trigger: {
							player: 'drawBegin'
						},
						forced: true,
						firstDo: true,
						content() {
							trigger.num++;
						},
						mark: true,
						intro: {
							content: '摸牌量+1',
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'draw')) return [1, 1];
								}
							}
						}
					}
				}
			},
			banmao: {
				audio: 2,
				trigger: {
					player: 'damageEnd', source: 'damageEnd'
				},
				filter(Evt, player) {
					return Evt.source && Evt.card && get.name(Evt.card) == 'sha';
				},
				forced: true,
				content() {
					trigger.source.draw();
				},
				mod: {
					cardEnabled(card, player) {
						if (['shan', 'jiu'].includes(get.name(card)) && player.isHealthy() && player.$.banmao !== true) return false;
					},
					cardSavable(card, player) {
						if (['shan', 'jiu'].includes(get.name(card)) && player.isHealthy() && player.$.banmao !== true) return false;
					}
				},
				derivation: 'banmao_rewrite',
			},
			//Froot
			exiao: {
				trigger: { player: 'useCard' },
				frequent: true,
				filter(Evt) {
					return get.type(Evt.card) == 'trick';
				},
				content: [() => {
					player.judge(card => {
						if (get.color(card) == 'black') return 4;
						return -1;
					});
				}, () => {
					if (result.judge > 0) {
						trigger.nowuxie = true;
						game.delayx();
						if (get.position(result.card) == 'd') player.gain(result.card, 'gain2', 'log');
					}
				}],
			},
			jinmei: {
				audio: 2,
				trigger: { global: 'phaseBegin' },
				round: 1,
				priority: 996,
				filter(Evt, player) {
					return Evt.player != player && player.countCards('he', { color: 'black' });
				},
				direct: true,
				content: [() => {
					Evt.target = trigger.player;
					let goon = get.$a(player, Evt.target) < 0 && !Evt.target.hasJudge('lebu') && !Evt.target.hasJudge('bingliang');
					let next = player.chooseCard(get.$pro2('jinmei'), 'he', { color: 'black' }).set('goon', goon).set('ai', card => {
						if (!goon) return 0;
						return 5 - get.value(card);
					});
				}, () => {
					if (result.bool) {
						player.logSkill('jinmei', Evt.target);
						Evt.target.gain(result.cards, player, 'giveAuto');
						Evt.target.addTempSkill('jinmei_drop')
					}
				}],
				ai: {
					expose: 0.1,
				},
				subSkill: {
					drop: {
						trigger: {
							player: 'drawBegin'
						},
						forced: true,
						firstDo: true,
						content() {
							trigger.num--;
						},
						mark: true,
						intro: {
							content: '摸牌量-1',
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'draw')) return 0;
								}
							}
						}
					},
				}
			},
			//Veibae
			zhexun: {
				group: 'zhexun0',
				audio: 3,
			},
			zhexun0: {
				trigger: { player: 'useCard2' },
				frequent: true,
				filter(Evt, player) {
					let card = Evt.card;
					let info = get.info(card);
					if (info.allowMultiple == false) return false;
					let history = player.getHistory('useCard', evt => get.color(Evt.card) == get.color(evt.card)).length;
					return history > 1 && history == player.getHistory('useCard').length;
				},
				content: [() => {
					trigger.directHit.addArray(game.players);
				}, () => {
					if (get.type2(trigger.card) != 'equip') {
						let prompt2 = `为${get.$t(trigger.card)}额外指定一个目标`;
						player.chooseTarget(get.$pro(Evt.name), function (card, player, target) {
							if (_status.event.targets.includes(target)) return false;
							return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
						}).set('prompt2', prompt2).set('ai', function (target) {
							let player = _status.event.player;
							return get.effect(target, _status.event.card, player, player);
						}).set('targets', trigger.targets).set('card', trigger.card);
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						player.line(result.targets);
						game.log(result.targets, '成为了', trigger.card, '的额外目标');
						trigger.targets.addArray(result.targets);
					}
				}],
			},
			yuci: {
				audio: 2,
				trigger: {
					player: 'drawBegin'
				},
				forced: true,
				firstDo: true,
				filter(Evt, player) {
					if (player.hasSkill('yuci_used')) return false;
					let another = player.next;
					let sex = false;
					while (another != player) {
						if (sex != false && another.sex != sex) return false;
						sex = another.sex;
						another = another.next;
					}
					return true;
				},
				content() {
					trigger.num++;
					player.addTempSkill('yuci_used', 'phaseNext');
				},
				subSkill: {
					used: {}
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'draw') && !target.hasSkill('yuci_used')) return [1, 1];
						}
					}
				}
			},
			//Melody
			kuangbiao: {
				intro: {
					mark(dialog, storage, player) {
						if (player.countCards('s', card => card.hasGaintag('kuangbiao')))
							dialog.addAuto(player.getCards('s', card => card.hasGaintag('kuangbiao')));
					},
					markcount(storage, player) {
						return player.countCards('s', card => card.hasGaintag('kuangbiao'));
					},
					onunmark(storage, player) {
						let cards = player.getCards('s', card => card.hasGaintag('kuangbiao'));
						if (cards.length) {
							player.lose(cards, ui.discardPile);
							player.$throw(cards, 1000);
							game.log(cards, '进入了弃牌堆');
						}
					},
				},
				cardAround(player) {
					return player.getCards('s', card => card.hasGaintag('kuangbiao'));
				},
				trigger: { player: 'useCardAfter' },
				forced: true,
				filter(Evt, player) {
					return get.suit(Evt.card) == 'heart' && player.hasHistory('lose', evt => {
						if (evt.getParent() != Evt) return false;
						if (JSON.stringify(evt.hs) == JSON.stringify(Evt.cards)) return true;
						return false;
					});
				},
				content: [() => {
					if (player.hp != 1) player.loseHp();
				}, () => {
					player.directgains(trigger.cards, null, 'kuangbiao');
					player.markSkill('kuangbiao');
				}],
				mod: {
					cardname(card, player, name) {
						if (get.suit(card) == 'heart' && get.position(card) == 'h') return 'wuzhong';
					},
					cardEnabled2(cardx, player) {
						if (player.countCards('s', card => card.hasGaintag('kuangbiao'))) {
							if (get.position(cardx) == 's' && cardx.hasGaintag('kuangbiao') && !player.isDamaged()) return false;
						}
					}
				},
				ai: {
					effect: {
						player(card, player, target) {
							if (get.suit(card) == 'heart' && get.position(card) == 'h') {
								if (player.hp == 1) return [1, 0.1, 1, 0];
								return [1, (player.hp - 3) * 2, 1, 0];
							}
						}
					}
				}
			},
			leizhu: {
				trigger: { player: 'useCard2' },
				filter(Evt, player) {
					return get.type2(Evt.card) == 'trick';
				},
				direct: true,
				intro: {
					name2: 'R18',
					content: 'mark',
				},
				content: [() => {
					player.addMark('leizhu', 1, false);
					if (player.countMark('leizhu') == 3) {
						player.removeMark('leizhu', 3, false);
						let card = trigger.card;
						let info = get.info(card);
						if (info.allowMultiple == false || !trigger.targets
							|| !game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(card, player, cur))) Evt.finish();
					} else Evt.finish();
				}, () => {
					let prompt2 = `为${get.$t(trigger.card)}增加一个目标`;
					player.chooseTarget(get.$pro(Evt.name), function (card, player, target) {
						if (_status.event.targets.includes(target)) return false;
						return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
					}).set('prompt2', prompt2).set('ai', function (target) {
						let trigger = _status.event.getTrigger();
						let player = _status.event.player;
						if (player.hp == 1) return false;
						return get.effect(target, trigger.card, player, player) + get.damageEffect(target, player, player);
					}).set('targets', trigger.targets).set('card', trigger.card);
				}, () => {
					if (result.bool) {
						if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
						Evt.targets = result.targets;
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets) {
						player.logSkill('leizhu', Evt.targets);
						trigger.targets.addArray(Evt.targets);
						player.damage();
						Evt.targets[0].damage();
					}
				}],
			},
			tonggan: {
				unique: true,
				trigger: {
					global: 'drawBegin'
				},
				zhuSkill: true,
				forced: true,
				firstDo: true,
				filter(Evt, player) {
					if (!player.hasZhuSkill('tonggan')) return false;
					if (player.hasSkill('tonggan_used')) return false;
					return Evt.player.group && Evt.player.group == player.group;
				},
				logTarget: 'player',
				content() {
					Evt.target = trigger.player;
					Evt.target.addTempSkill('tonggan_used', 'phaseNext');
					if (game.roundNumber % 2 == 1) return trigger.num--;
					if (game.roundNumber % 2 != 1) return trigger.num++;
				},
				subSkill: {
					used: {}
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'draw') && !target.hasSkill('tonggan_used')) {
								if (game.roundNumber % 2 == 1) return [0.2, 0];
								if (game.roundNumber % 2 != 1) return [1, 2];
							}
						}
					}
				}
			},
			//Silvervale
			yingling: new toSkill('trigger', {
				filter(Evt, player) {
					return !player.hasSkill('yingling_used');
				},
				content() {
					player.addTempSkill('yingling_used', 'phaseNext');
					player.judge(card => {
						if (get.color(card) === 'red') return 1
						return 0
					}).callback = lib.skill.yingling.callback;
				},
				callback() {
					let evt = _status.event.getParent('yingling');
					if (Evt.judgeResult.color == 'red') {
						evt.getTrigger().num++
					}
				},
				subSkill: { used: new toSkill('mark') },
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'draw') && !target.hasSkill('yingling_used')) return [1, 0.5];
						}
					}
				}
			}, 'forced', 'firstDo').setT('drawBegin'),
			duchun: new toSkill('trigger', {
				filter(Evt, player) {
					return get.position(Evt.result.card, true) == 'o';
				},
				content: [() => {
					Evt.card = trigger.result.card
					player.chooseTarget(get.$pro2('duchun'), function (card, player, target) {
						return true
					}).set('ai', target => {
						let { player, card } = _status.event.getParent()
						return get.$a(player, target) * (get.value(card, 'raw', target) + (target.$.duchun_drop > 1 ? 1 : -2))
					})
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('duchun', Evt.target)
						Evt.target.gain(Evt.card, 'gain2')
						if (!Evt.target.$.duchun_drop) {
							Evt.target.$.duchun_drop = 1
							Evt.target.addSkill('duchun_drop')
						}
						else {
							Evt.target.$.duchun_drop++
							Evt.target.markSkill('duchun_drop')
						}
					}
				}],
				subSkill: {
					drop: new toSkill('mark', {
						content() {
							trigger.num -= player.$.duchun_drop
							// player.unmarkSkill('duchun_drop')
							player.removeSkill('duchun_drop')
						},
						intro: {
							content: '摸牌量-#',
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'draw')) return 0;
								}
							}
						}
					}, 'mark', 'onremove', 'forced', 'firstDo').setT('drawBefore'),
				}
			}, 'direct').setT('judgeEnd'),
			//耳朵
			jiace: {
				trigger: { target: 'useCardToTarget' },
				filter(Evt, player) {
					if (!Evt.targets || !Evt.targets.includes(player)) return false;
					if (Evt.player == player) return false;
					let info = get.info(Evt.card);
					if (info.allowMultiple == false || info.multitarget) return false;
					if (get.color(Evt.card) != 'black') return false;
					if (Evt.targets.length >= 1) return true;
				},
				direct: true,
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCard('h', get.$pro2('jiace'), { suit: get.suit(trigger.card) }).ai = get.unuseful2;
				}, () => {
					if (result.bool) {
						player.logSkill('jiace', Evt.target);
						player.give(result.cards, Evt.target, true);
						if (!player.hasSkill('jiace_used')) {
							if (!trigger.getParent().addedSkill) trigger.getParent().addedSkill = [];
							trigger.getParent().addedSkill.add('jiace');
						}
					} else {
						Evt.finish();
					}
				}, () => {
					player.addTempSkill('jiace_used')
					let prompt2 = `为${get.$t(trigger.card)}增加或减少一个目标`;
					player.chooseTarget(get.$pro('jiace'), (card, player, target) => {
						let source = _status.event.source;
						if (_status.event.targets.includes(target))
							return true;
						return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
					}).set('prompt2', prompt2).set('ai', target => {
						let player = _status.event.player, source = _status.event.source;
						return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
					}).set('targets', trigger.targets).set('card', trigger.card).set('source', Evt.target);
				}, () => {
					if (result.bool) {
						if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
						Evt.targets = result.targets;
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets) {
						player.logSkill('jiace', Evt.targets);
						if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
						else trigger.targets.addArray(Evt.targets);
					}
				}],
				group: ['jiace_gainBy'],
				subSkill: {
					used: {},
					gainBy: {
						trigger: { global: 'useCardAfter' },
						forced: true,
						filter(Evt, player) {
							let cards = Evt.cards.filterInD();
							return cards.length && Evt.addedSkill && Evt.addedSkill.includes('jiace');
						},
						content() {
							let cards = trigger.cards.filterInD();
							player.gain(cards, 'gain2');
						},
					},
				}
			},
			xiangying: {
				enable: 'phaseUse',
				position: 'h',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h', { color: 'red' });
				},
				filterCard(card, player) {
					return get.color(card) == 'red';
				},
				selectCard: [1, Infinity],
				filterTarget(card, player, target) {
					return target.countCards('h') < player.countCards('h');
				},
				discard: false,
				prepare: 'give2',
				content: [() => {
					target.gain(cards, player);
				}, () => {
					if (target.countCards('h') > player.countCards('h')) {
						target.showHandcards();
					} else {
						Evt.finish();
					}
				}, () => {
					let num = Math.abs(target.countCards('h', { color: 'red' }) - target.countCards('h', { color: 'black' }));
					player.draw(num);
				}],
				ai: {
					order: 10,
					result: {
						player(player, target) {
							let num = ui.selected.cards.length * 2 + target.countCards('h');
							if (num <= player.countCards('h')) return -1;
							return Math.abs(num + target.countCards('h', { color: 'red' }) - target.countCards('h', { color: 'black' }));
						},
						target(player, target) {
							if (target.hasSkillTag('nogain')) return 0;
							return ui.selected.cards.length;
						}
					},
					threaten: 0.6
				}
			},
			//凤玲天天
			shengquan: new toSkill('trigger', {
				filter(Evt, player) {
					return player.countCards('h')
				},
				content: [() => {
					player.chooseToDiscard([2, Infinity], 'h', get.$pro2('shengquan')).set('complexCard', true).set('filterCard', (card, player) => {
						if (ui.selected.cards.length) return get.color(card) == get.color(ui.selected.cards[0]);
						return player.countCards('hes', { color: get.color(card) }) >= 2;
					}).set('ai', function (card) { return get.unuseful3(card) })
				}, () => {
					if (result.bool && result.cards.length) {
						player.logSkill('shengquan', player)
						Evt.num = result.cards.length - 1
						player.recover(Evt.num)
					}
				}],
				ai: {
					maixie: true,
					skillTagFilter(player) {
						return player.countCards('h') > 1
					},
				}
			}, 'direct').setT('damageAfter'),
			yizhu: new toSkill('active', {
				position: 'h',
				filterTarget(card, player, target) {
					return target.countCards('h') >= 2 && target !== player;
				},
				content: [() => {
					player.loseHp()
				}, () => {
					player.gainPlayerCard(target, 'h', 2)
				}, () => {
					player.$.yizhu_giveBy = target
					player.addTempSkill('yizhu_giveBy', 'yizhuBefore')
				}],
				ai: {
					order: 10,
					result: {
						player(player, target) {
							if (player.hp === 1) return 0
							if (player.$.yizhu === target && get.$a(player, target) > 0) return -1
							return player.hp - 2
						},
						target(player, target) {
							if (player.hp === 1) return 0
							if (player.$.yizhu === target) return -1
							return 2;
						}
					},
					threaten: 0.6
				},
			}).set('usable', 1, 'subSkill', {
				giveBy: new toSkill('trigger', {
					filter(Evt, player) {
						return player.$.yizhu_giveBy?.isIn() && (Evt.cards2 || Evt.cards).filterInD('d').length
					},
					logTarget(Evt, player) {
						return player.$.yizhu_giveBy
					},
					content() {
						Evt.tar = player.$.yizhu_giveBy
						Evt.cards = (trigger.cards2 || trigger.cards).filterInD('d');
						Evt.tar.gain(Evt.cards, 'gain2')
					},
					mark: 'character',
					intro: {
						name: '译注',
						content: '令$获得自己的弃牌',
					},
				}, 'direct', 'locked', 'onremove').setT('discardEnd')
			}
			),
			//萌实
			chengzhang: {
				audio: 3,
				trigger: {
					player: 'loseAfter',
					global: ['gainAfter', 'equipAfter', 'addJudgeAfter', 'loseAsyncAfter'],
				},
				filterTarget(card, player, target) {
					return target != player && target.isIn() && target.hasUseTarget(card);
				},
				filter(Evt, player) {
					let evt = Evt.getl(player);
					return evt?.es?.filter(card => get.position(card, true) == 'd'
						&& game.hasPlayer(target => lib.skill.chengzhang.filterTarget)).length > 0;
				},
				frequent: true,
				content: [() => {
					Evt.cards = trigger.getl(player).es.filter(card => {
						return get.position(card, true) == 'd' && game.hasPlayer(target => lib.skill.chengzhang.filterTarget(card, player, target));
					});
					Evt.count = Evt.cards.length;
				}, () => {
					Evt.count--;
					player.chooseTarget(function (card, player, target) {
						return target != player && target.isIn() && target.hasUseTarget(_status.event.cardx);
					}, '选择一名角色使用' + get.$t(Evt.cards[Evt.count])).set('ai', (target) => get.$a(_status.event.player, target) * get.value(_status.event.cardx, target)).set('cardx', Evt.cards[Evt.count]);
				}, () => {
					if (result.bool && result.targets?.length) {
						let target = result.targets[0];
						player.line(target, 'green');
						if (target.hasUseTarget(Evt.cards[Evt.count])) target.chooseUseTarget(Evt.cards[Evt.count], true);
					}
				}, () => {
					if (Evt.count) Evt.goto(1);
				}],
			},
			mengdong: {
				audio: 3,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { player: 'useCardToPlayered' },
				check: () => true,
				filter(Evt, player) {
					return !player.getStorage('mengdong').includes(Evt.target) && Evt.target.countCards('e') % 2 == 1;
				},
				frequent: true,
				logTarget: 'target',
				content() {
					player.$.mengdong.add(trigger.target);
					player.markSkill('mengdong');
					player.draw();
				},
				group: 'mengdong_clear',
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 23,
						filter(Evt, player) {
							return player.$.mengdong && player.$.mengdong.length;
						},
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.mengdong.length = 0;
						}
					}
				},
				ai: {
					result: {
						player: 1,
					},
					effect: {
						player(card, player, target, current) {
							if (target && !player.getStorage('mengdong').includes(target) && target.countCards('e') % 2 == 1) return [1, 1];
						}
					}
				}
			},
			//夏实萌惠
			moemanyi: {
				locked: true,
				mod: {
					targetEnabled(card, player, target, now) {
						if (get.type(card) == 'delay') {
							for (let i = 0; i < game.players.length; i++) {
								if (!(game.players[i].isOut() || game.players[i] == player)) {
									if (game.players[i].getAttackRange() < player.getAttackRange()) return now;
								}
								return false;
							}
						}
						if (get.name(card) == 'sha' && get.color(card) == 'black') {
							for (let i = 0; i < game.players.length; i++) {
								if (!(game.players[i].isOut() || game.players[i] == player)) {
									if (game.players[i].getAttackRange() > player.getAttackRange()) return now;
								}
								return false;
							}
						}
					}
				},
			},
			cuchuan: {
				trigger: { player: 'phaseDrawBegin1' },
				filter(Evt, player) {
					return !Evt.numFixed && game.hasPlayer(cur => player != cur && get.$dis(player, cur) <= 1);
				},
				check(Evt, player) {
					return game.countPlayer(cur => player != cur && get.$dis(player, cur) <= 1) >= 2;
				},
				content: [() => {
					trigger.changeToZero();
					Evt.targets = game.filterPlayer(cur => player != cur && get.$dis(player, cur) <= 1);
				}, () => {
					game.asyncDraw(Evt.targets);
					game.delayx();
					Evt.num = 0;
				}, () => {
					player.gainPlayerCard(Evt.targets[Evt.num], 'he', true);
					Evt.num++;
				}, () => {
					if (Evt.targets[Evt.num]) Evt.goto(2);
				}],
			},
			//春猿火
			huoju: {
				trigger: { global: 'damageBegin' },
				forced: true,
				filter(Evt, player) {
					if (!Evt.source) return false;
					if (Evt.source == player || get.$dis(player, Evt.source, 'pure') == 1) {
						return Evt.nature != 'fire';
					}
				},
				content() {
					trigger.nature = 'fire';
				},
				group: 'huoju_turnOverBy',
				subSkill: {
					turnOverBy: {
						trigger: { player: 'damageAfter', source: 'damageAfter' },
						forced: true,
						filter(Evt, player) {
							return Evt.nature == 'fire' && Evt.source && Evt.source.isIn()
								&& (Evt.source.isMinHp() || Evt.source.isMinHandcard());
						},
						content: [() => {
							if (trigger.source.isMinHandcard()) {
								trigger.source.turnOver();
								trigger.source.draw();
							}
						}, () => {
							if (trigger.source.isMinHp()) {
								trigger.source.turnOver();
								trigger.source.recover();
							}
						}],
					}
				}
			},
			zouyang: {
				trigger: { player: 'useCard2' },
				filter(Evt, player) {
					if (player.hasSkill('zouyang_used')) return false;
					let card = Evt.card, info = get.info(card);
					if (info.allowMultiple == false) return false;
					if (Evt.targets && Evt.targets.length == 1 && !info.multitarget) {
						if (game.hasPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1)) {
							return true;
						}
					}
					return false;
				},
				logTarget(Evt, player) {
					return game.filterPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1);
				},
				check(Evt, player) {
					return game.hasPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1 && get.effect(cur, Evt.card, player, player) > 0);
				},
				content: [() => {
					Evt.draws = [];
					Evt.targets = game.filterPlayer(cur => !trigger.targets.includes(cur) && get.$dis(trigger.targets[0], cur, 'pure') == 1);
					for (let i of Evt.targets) {
						if (lib.filter.targetEnabled2(trigger.card, player, i)) {
							if (Evt._zouyang_tmp && Evt._zouyang_tmp != 'target') Evt._zouyang_tmp = 'goon';
							else Evt._zouyang_tmp = 'target';
						} else {
							Evt.draws.add(i);
							if (Evt._zouyang_tmp && Evt._zouyang_tmp != 'draw') Evt._zouyang_tmp = 'goon';
							else Evt._zouyang_tmp = 'draw';
						}
					}
					Evt.targets.removeArray(Evt.draws);
				}, () => {
					if (Evt._zouyang_tmp != 'goon') {
						player.addTempSkill('zouyang_used');
					}
				}, () => {
					if (Evt.targets.length) {
						trigger.targets.addArray(Evt.targets);
					}
					if (Evt.draws.length) {
						game.asyncDraw(Evt.draws);
					}
				}],
				subSkill: {
					used: {
						mark: true,
						intro: {
							content: '不能发动『奏扬』',
						},
					},
				}
			},
			//幸祜
			xiezhen: {
				trigger: { global: 'damageBegin' },
				filter(Evt, player) {
					return Evt.source != player && get.$dis(Evt.source, player) <= 1 && Evt.source.countDiscardableCards(player, 'he');
				},
				check(Evt, player) {
					return get.damageEffect(_status.event.player0, player, player) > 0;
				},
				content: [() => {
					Evt.forced = true;
					Evt.target = trigger.source;
					player.turnOver();
				}, () => {
					player.discardPlayerCard('he', Evt.target, Evt.forced, `『谐振』：弃置${get.$t(Evt.target)}的一张牌`).set('ai', (button) => {
						let player = _status.event.player;
						let num = 10;
						if (get.position(button.link) == 'e') {
							if (get.damageEffect(_status.event.player0, player, player) > 0)
								num += 6;
							if (get.damageEffect(_status.event.player0, player, player) < 0)
								num -= 6;
						}
						return num - get.value(button.link) * _status.event.att;
					}).set('logSkill', ['rejianchu', Evt.target]).set('player0', trigger.player).set('att', get.$a(player, Evt.target) / 2);
				}, () => {
					if (result.bool && result.links?.length) {
						if (get.type(result.links[0], null, result.links[0].original == 'h' ? Evt.target : false) == 'equip') {
							Evt.forced = false;
							trigger.num++;
							game.delayx();
							if (Evt.target.countDiscardableCards(player, 'he')) Evt.goto(1);
						}
					}
				}],
			},
			wenzhou: {
				trigger: { player: 'damageEnd', global: 'turnOverEnd' },
				filter(Evt, player) {
					if (Evt.name == 'damage') return Evt.num > 1 && Evt.source && Evt.source.isIn();
					return !Evt.player.isTurnedOver();
				},
				logTarget(Evt, player) {
					if (Evt.name == 'damage') return Evt.source;
					return Evt.player;
				},
				forced: true,
				content() {
					if (trigger.name == 'damage') trigger.source.turnOver();
					else trigger.player.draw();
				},
			},
			//猫雷NyaRu
			miaolu: {
				audio: 3,
				trigger: { global: 'dying' },
				filter(Evt, player) {
					return Evt.player.hp <= 0 && Evt.player.countCards('h') > 0;
				},
				direct: true,
				content() {
					"step 0"
					let check;
					if (trigger.player.isUnderControl(true, player) || get.$a(player, trigger.player) > 0) {
						check = trigger.player.hasCard(card => {
							return get.type(card) != 'basic';
						});
					} else {
						check = trigger.player.hasCard(card => {
							return get.type(card) == 'basic';
						});
					}
					player.discardPlayerCard(trigger.player, get.$pro('miaolu', trigger.player), 'h').set('ai', (button) => {
						if (!_status.event.check)
							return 0;
						if (_status.event.target.isUnderControl(true, _status.event.player) || get.recoverEffect(_status.event.target, _status.event.player, _status.event.player) > 0) {
							if (get.type(button.link) != 'basic') {
								return 10 - get.value(button.link);
							}
							return 0;
						} else {
							return Math.random();
						}
					}).set('check', check);
					"step 1"
					if (result.bool) {
						player.logSkill('miaolu', trigger.player);
						Evt.card = result.links[0];
						player.showCards([Evt.card], `${get.$t(player)}弃置的手牌`);
					} else {
						Evt.finish();
					}
					"step 2"
					if (get.type(Evt.card) != 'basic') {
						trigger.player.recover();
					} else {
						player.gain(Evt.card, 'gain2', 'log');
					}
				},
				ai: {
					threaten: 1.4
				}
			},
			benglei: {
				audio: 2,
				trigger: { player: 'damageEnd' },
				direct: true,
				filter(Evt, player) {
					return (Evt.num > 0);
				},
				content: [() => {
					Evt.count = trigger.num;
				}, () => {
					Evt.count--;
					player.chooseTarget(get.$pro2('benglei')).set('ai', (target) => {
						let player = _status.event.player;
						return get.damageEffect(target, player, player);
					});
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('benglei', result.targets);
						Evt.target = result.targets[0];
						Evt.target.judge(card => {
							if (get.suit(card) == 'spade') return -3;
							if (get.suit(card) == 'club') return -2;
							return 0;
						}).callback = lib.skill.benglei.callback;
					} else Evt.finish();
				}, () => {
					if (Evt.discardBy === true) {
						if (Evt.target.countDiscardableCards(player, 'he')) {
							player.line(Evt.target);
							player.discardPlayerCard('he', Evt.target, true);
						}
						if (Evt.redoBy) {
							delete Evt.redoBy;
						} else if (Evt.discardBy) {
							delete Evt.discardBy;
						}
						Evt.redo();
					}
				}, () => {
					if (Evt.count > 0) Evt.goto(1);
				}],
				callback: [() => {
					let evt = _status.event.getParent('benglei');
					Evt.Nyaru = evt.player;
					if (Evt.judgeResult.suit == 'spade') {
						let evt = _status.event.getParent('damage');
						if (evt?.name == 'damage' && evt.num) {
							player.damage(evt.num, 'thunder', Evt.Nyaru);
						}
					} else if (Evt.judgeResult.suit == 'club') {
						evt.discardBy = true;
						evt.redoBy = true;
					} else if (Evt.judgeResult.color == 'red') {
						Evt.goto(2);
					}
				}, () => {
					game.delay(2);
					Evt.finish();
				}, () => {
					Evt.Nyaru.discardPlayerCard(player, get.$pro('miaolu', player), 'h').set('ai', (button) => {
						if (_status.event.target.isUnderControl(true, _status.event.player) || get.recoverEffect(_status.event.target, _status.event.player, _status.event.player) > 0) {
							if (get.type(button.link) != 'basic') {
								return 10 - get.value(button.link);
							}
							return 0;
						} else {
							return Math.random();
						}
					});
				}, () => {
					if (result.bool) {
						Evt.Nyaru.logSkill('miaolu', player);
						Evt.card = result.links[0];
						Evt.Nyaru.showCards([Evt.card], `${get.$t(Evt.Nyaru)}弃置的手牌`);
					} else {
						Evt.finish();
					}
				}, () => {
					if (get.type(Evt.card) != 'basic') {
						player.recover();
					} else {
						Evt.Nyaru.gain(Evt.card, 'gain2', 'log');
					}
				}],
				ai: {
					maixie_defend: true,
					effect: {
						target(card, player, target) {
							if (player.countCards('he') > 1 && get.tag(card, 'damage')) {
								if (player.hasSkillTag('jueqing', false, target)) return [1, -1.5];
								if (get.$a(target, player) < 0) return [1, 1];
							}
						}
					}
				}
			},
			//琴吹梦
			xuanquan: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countDisabled() < 5;
				},
				chooseButton: {
					dialog(Evt, player) {
						return ui.create.dialog('###『选权』###' + lib.translate.xuanquan_info);
					},
					chooseControl(Evt, player) {
						let list = [];
						for (let i = 1; i < 6; i++) {
							if (!player.isDisabled(i)) list.push('equip' + i);
						}
						list.push('cancel2');
						return list;
					},
					check(Evt, player) {
						for (let i = 5; i > 0; i--) {
							if (player.isEmpty(i)) return ('equip' + i);
						}
						return 'cancel2';
					},
					backup(result) {
						let next = get.copy(lib.skill.xuanquanx);
						next.position = result.control;
						return next;
					},
				},
				group: ['xuanquan_record'],
				subSkill: {
					record: {
						trigger: { global: 'disableEquipAfter' },
						filter(Evt, player) {
							return Evt.player != player;
						},
						forced: true,
						content() {
							player.draw();
						},
					},
				},
				ai: {
					order: 1,
					result: {
						player(player) {
							if (game.hasPlayer(target => {
								if (player == target)
									return false;
								let hs = target.countCards('he');
								return hs > 2 && get.$a(player, target) >= 0;
							})) return 1;
							return 0;
						},
					},
				},
			},
			xuanquanx: {
				content: [() => {
					player.disableEquip(lib.skill.xuanquan_backup.position);
				}, () => {
					if (player.isAlive() && game.hasPlayer(cur => cur != player && cur.countCards('he'))) {
						player.chooseTarget(true, '获得一名角色的一张牌并令其获得技能『选权』', function (card, player, target) {
							if (player == target) return false;
							return target.countGainableCards(player, 'he') > 0;
						}).set('ai', target => get.$a(_status.event.player, target) * (target.countCards('he') - 2));
					} else Evt.finish();
				}, () => {
					if (result.bool) {
						let target = result.targets[0];
						Evt.target = target;
						player.line(target);
						player.gainPlayerCard(target, 'he', true);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links?.length) {
						target = Evt.target;
						target.addSkill('xuanquan');
					}
				}],
			},
			rusu: {
				trigger: {
					player: ['loseAfter'],
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
				},
				direct: true,
				filter(Evt, player) {
					let evt = Evt.getl(player);
					return (evt?.es?.length && player.countCards('he', { type: 'equip' }))
						|| (evt?.js?.length && player.countCards('he', { type: ['trick', 'delay'] }));
				},
				content: [() => {
					{
						let evt = trigger.getl(player);
						if (evt?.js?.length && player.countCards('he', { type: ['trick', 'delay'] })) {
							player.chooseCardTarget({
								filterCard: { type: ['trick', 'delay'] },
								position: 'he',
								filterTarget(card, player, target) {
									return target.canAddToJudge(card);
								},
								ai1(card) {
									return 7 - get.value(card);
								},
								ai2(target) {
									return 1 - get.$a(_status.event.player, target);
								},
								prompt: `###${get.$pro('rusu')}###将一张锦囊牌置于选择目标的判定区`
							})
						}
					}
				}, () => {
					if (result.bool && result.cards?.length && result.targets?.length) {
						player.logSkill('rusu', result.targets);
						let thisTarget = result.targets[0];
						let thisCard = result.cards[0];
						thisTarget.addToJudge(thisCard, player);
					}
				}, () => {
					let evt = trigger.getl(player);
					if (evt?.es?.length && player.countCards('he', { type: 'equip' })) {
						player.chooseCardTarget({
							filterCard: { type: 'equip' },
							position: 'he',
							filterTarget(card, player, target) {
								return target.isEmpty(get.subtype(card));
							},
							ai1(card) {
								return 6 - get.value(card);
							},
							ai2(target) {
								return get.$a(_status.event.player, target) - 3;
							},
							prompt: `###${get.$pro('rusu')}###将一张装备牌置于选择目标的装备区`
						})
					} else Evt.finish();
				}, () => {
					if (result.bool && result.cards?.length && result.targets?.length) {
						player.logSkill('rusu', result.targets);
						let thisTarget = result.targets[0];
						let thisCard = result.cards[0];
						thisTarget.equip(thisCard);
						Evt.target = thisTarget;
						if (thisTarget != player) {
							player.$give(thisCard, thisTarget, false);
						}
					}
				}],
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.type(card) == 'delay' && target.countCards('he', { type: ['trick', 'delay'] })) return [1, 1];
						}
					},
				}
			},
			//海月シェル
			beike: new toSkill('trigger', {
				init(player, skill) {
					player.$[skill] ??= get.inpile('trick2')
					player.$.beike2 = []
				},
				filter(Evt, player) {
					return get.type2(Evt.card) === 'trick' && !player.$?.beike2?.contains(get.name(Evt.card))
				},
				onremove: ['beike', 'beike2'],
				content() {
					player.$.beike.remove(get.name(trigger.card))
					player.$.beike2.add(get.name(trigger.card))
					player.draw()
					player.markSkill('beike')
				},
				intro: {
					content: '本局游戏内尚未被使用的锦囊（原始牌堆）：<br>$'
				},
				group: 'beike_addDam',
				subSkill: {
					addDam: new toSkill('trigger', {
						filter(Evt, player) {
							return player.$.beike.length === 0;
						},
						logTarget: 'player',
						content() {
							trigger.num++;
						}
					}, 'forced').setT({ source: 'damageBegin' }),
				}
			}, 'forced').setT({ global: 'useCard' }),
			wenda: new toSkill('regard', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				filter(Evt, player) {
					return (player.$.wenda === true && player.countCards('hs', { type: 'equip' }))
						|| (player.$.wenda === false && player.countCards('hs', { type: 'basic' }));
				},
				hiddenCard(player, name) {
					if (player.$.wenda === true && player.countCards('hs', { type: 'equip' })) {
						let list = get.inpile('trick2');
						for (let i of list) {
							if (i == name) return true;
						}
					}
					else if (player.$.wenda === false && player.countCards('hs', { type: 'basic' })) {
						if ('wuxie' === name) return true
					}
				},
				chooseButton: {
					dialog(Evt, player) {
						let list = player.$.wenda ? get.inpile('trick2') : ['wuxie'];
						if (list.length == 0) {
							return ui.create.dialog('『一问一答』已无可用牌');
						}
						return ui.create.dialog('『一问一答』', [list, 'vcard']);
					},
					filter(button, player) {
						return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check(button) {
						let player = _status.event.player
						if (button.link[2] == 'wugu') return 0;
						let effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links, player) {
						return {
							filterCard(card) {
								return player.$.wenda ? get.type(card) === 'equip' : get.type(card) === 'basic'
							},
							selectCard: 1,
							popname: true,
							check(card) {
								return 6 - get.value(card);
							},
							position: 'hs',
							viewAs: { name: links[0][2] },
							onuse(result, player) {
								player.$.wenda = !player.$.wenda
							},
						};
					},
					prompt(links, player) {
						return `###『一问一答』###将一张【酒】当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
					}
				},
			}, 'enable:chooseToUse'),
			//羽澄照乌愈
			chenming: new toSkill('trigger', {
				filter(Evt, player) {
					return true
				},
				content: [() => {
					let list = trigger.stageList || lib.phaseName.slice(0);
					player.chooseButton([get.$pro2('chenming'), [list, 'vcard'], 'hidden'])
						.set('filterButton', button => !['phaseDiscard', 'phaseDraw'].includes(button.link[2]))
						.set('ai', button => button.link[2] === 'phaseJudge' ? 10 : 5);
				}, () => {
					if (result.links?.length) {
						player.logSkill('chenming')
						let stageList = (trigger.stageList || lib.phaseName).slice(0)
						stageList.splice(stageList.indexOf(result.links[0][2]), 1, 'phaseDraw')
						trigger.stageList = stageList;
						game.delay(1)
					}
				}],
			}, 'direct').setT('phaseBegin'),
			xiantong: new toSkill('trigger', {
				filter(Evt, player) {
					return player.countCards('he');
				},
				content: [() => {
					player.judge()
				}, () => {
					if (result.card && result.color) {
						Evt.card = result.card
						player.chooseToDiscard(`弃置颜色为${get.$t(result.color)}或类型为${get.$t(get.type2(Evt.card))}两张牌`, 'he', 2)
							.set('filterCard', (card, player) => get.color(card) === result.color || get.type2(card) === get.type2(Evt.card))
							.set('ai', card => get.unuseful2(card))
					}
				}, () => {
					if (result.cards?.length) {
						trigger.num--
						trigger.addedSkill ??= []
						trigger.addedSkill.add('xiantong')
						trigger.addedSkill.add({ 'xiantong': Evt.card })
					}
				}],
				group: ['xiantong_gainBy'],
				subSkill: {
					gainBy: new toSkill('trigger', {
						filter(Evt, player) {
							return Evt.addedSkill?.includes('xiantong') && Evt.num > 0
						},
						content() {
							for (let i of trigger.addedSkill) {
								if (i instanceof Object && i.xiantong) {
									player.gain(i.xiantong, 'gain2', 'log')
								}
							}
						}
					}, 'forced').setT('damageEnd'),
				}
			}).setT('damageBegin3'),
			//hh
			jichu: {
				mod: {
					selectTarget(card, player, range) {
						if (range[1] == -1) return;
						let evt = player.getLastUsed();
						if (evt?.card && get.type2(evt.card) == 'trick' && !['delay', 'equip'].includes(get.type(card))) range[1] += 1;
					},
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player.isPhaseUsing()) {
							let evt = player.getLastUsed();
							let order = num;
							if (evt?.card && get.type2(evt.card) == 'trick' && !['delay', 'equip'].includes(get.type(card))) {
								order += 2;
							}
							if (evt?.card && get.suit(evt.card) == 'diamond') {
								order += 2;
							}
							return order;
						}
					},
				},
				trigger: { player: 'useCardAfter' },
				frequent: true,
				filter(Evt, player) {
					let evt = player.getLastUsed(1);
					if (!evt || !evt.card) return false;
					return get.suit(evt.card) == 'diamond' && !(Evt.result.bool == false || Evt.iswuxied);
				},
				content() {
					player.draw();
				},
			},
			mingshizhige: {
				trigger: { player: 'damageEnd' },
				filter(Evt, player) {
					return Evt.num > 0;
				},
				check(Evt, player) {
					return player.countCards('h', card => {
						return player.getUseValue(card) > 0;
					});
				},
				content: [() => {
					Evt.cards = player.getCards('h');
					let num = Evt.cards.length;
					player.lose(Evt.cards, ui.discardPile).set('visible', true);
					player.$throw(Evt.cards, 1000);
					game.log(player, '将', Evt.cards, '置入了弃牌堆');
					player.draw(num);
					game.delayx();
				}, () => {
					player.chooseCardButton(Evt.cards, '是否使用其中的一张？').set('filterButton', function (button) {
						return _status.event.player.hasUseTarget(button.link);
					}).set('ai', button => _status.event.player.getUseValue(button.link));
				}, () => {
					if (result.bool) {
						player.chooseUseTarget(true, result.links[0]);
					}
				}],
			},
			//白玉
			meihua: {
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt, player) {
					if (Evt.type == 'discard') return false;
					return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club').length > 0;
				},
				addDialog(Evt, player) {
					return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club');
				},
				check(Evt, player) {
					return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club' && get.value(card, player) > 3).length;
				},
				round: 1,
				content: [() => {
					let cards = trigger.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club');
					if (cards.length == 1) {
						Evt.cards = cards;
					} else {
						player.chooseCardButton(cards, true).set('ai', (button) => get.value(button.link, _status.event.player) - 3);
					}
				}, () => {
					if (result.bool && result.links) {
						Evt.cards = result.links.slice(0);
					}
					player.gain(Evt.cards, 'gain2', 'log');
				}],
			},
			shentian: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card, player, target) {
					return target.countCards('h') > 0;
				},
				content: [() => {
					player.viewHandcards(target);
				}, () => {
					player.judge();
				}, () => {
					let suit = result.suit;
					player.chooseButton([`请选择重铸${get.$t(target)}的手牌`, target.getCards('h')], [1, Infinity]).set('filterButton', function (button) {
						if (_status.event.suit == get.suit(button.link)) return false;
						for (let i = 0; i < ui.selected.buttons.length; i++) {
							if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
						}
						return true;
					}).set('suit', suit).set('att', get.$a(player, target)).set('ai', (button) => {
						if (_status.event.att <= 0)
							return get.value(button.link) - 4;
						return 4 - get.value(button.link);
					});
				}, () => {
					if (result.bool) {
						let cards = result.links;
						target.lose(cards, ui.discardPile).set('visible', true);
						target.$throw(cards, 1000);
						game.log(target, '将', cards, '置入了弃牌堆');
						target.draw(cards.length);
					}
				}],
				ai: {
					order: 6,
					result: {
						target(player, target) {
							if (target.countCards('h') > 2) {
								if (get.$a(player, target) > 0) return 1;
								else return -1;
							}
							return -0.1;
						}
					}
				},
			},
			//苏姐
			mishu: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { global: 'phaseEnd' },
				filter(Evt, player) {
					if (Evt.player == player) return false;
					let cards = [];
					game.getGlobalHistory('cardMove', evt => {
						if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
						if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
						cards.addArray(evt.cards)
					});
					return cards.length && _status.currentPhase.isIn();
				},
				content: [() => {
					let cards = _status.discarded.slice(0);
					Evt.discards = cards;
					let list: Dialogword = ['获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力', '令其获得本回合进入弃牌堆的一种类型的牌，且若这些牌点数之积大于13，对其造成1点伤害', '取消'];
					list.removeArray(player.$.mishu);
					if (list.length) {
						player.chooseControl('dialogcontrol', list).set('ai', function () {
							let evt = _status.event.getParent();
							let controls = _status.event.controls.slice(0);
							if (evt.discards.length >= 4 && controls.includes('获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力')) return 0;
							return _status.event.att;
						}).set('check', (get.$a(player, _status.currentPhase) > 0) ? 0 : 1).set('prompt', get.$pro2('mishu')).set('addDialog', [cards]);
					} else Evt.finish();
				}, () => {
					if (result.control && result.control != '取消') {
						let prompt = result.control;
						Evt.target = _status.currentPhase;
						Evt.control = result.control;
						prompt.replace(/其/, get.$t(_status.currentPhase));
						let next = player.chooseCardButton(Evt.discards, prompt);
						if (Evt.control == '获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力') {
							next.set('filterButton', function (button) {
								for (let i = 0; i < ui.selected.buttons.length; i++) {
									if (get.type2(ui.selected.buttons[i].link) == get.type2(button.link)) return false;
								}
								return true;
							});
							next.set('selectButton', function () {
								let types = [];
								for (let i of Evt.discards) {
									types.add(get.type2(i))
								}
								return types.length;
							}());
						} else {
							next.set('filterButton', function (button) {
								return true;
							});
							next.set('ai', function (button) {
								let cards = [];
								let type = get.type2(button.link);
								let player = _status.event.player;
								let target = _status.event.target;
								cards.concat(_status.event.discards.filter(card => {
									return type == get.type2(card);
								}))
								let eff = get.$a(player, target) * get.value(cards, target, 'raw');
								let num = 1;
								for (let i of cards) {
									num *= get.number(i);
								}
								if (num > 13) eff += get.damageEffect(target, player, player);
								return eff;
							});
							next.set('discards', Evt.discards);
							next.set('target', Evt.target);
						}
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool && result.links?.length) {
						player.$.mishu.add(Evt.control);
						if (Evt.control == '获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力') {
							let num = 0, count = 0, cards = result.links;
							for (let i of cards) {
								num += get.number(i);
							}
							for (let i = 1; i <= num; i++) {
								if (num % i == 0) {
									count++;
								}
							}
							player.gain(cards, 'gain2', 'log');
							if (count <= 2) Evt.target.recover();
						} else {
							let num = 1;
							let cards = Evt.discards.filter(card => {
								return get.type2(result.links[0]) == get.type2(card);
							});
							for (let i of cards) {
								num *= get.number(i);
							}
							Evt.target.gain(cards, 'gain2', 'log');
							if (num > 13) Evt.target.damage();

						}
					}
				}],
				group: 'mishu_clear',
				subSkill: {
					clear: {
						trigger: {
							global: 'roundStart'
						},
						firstDo: true,
						direct: true,
						filter(Evt, player) {
							return player.$.mishu.length;
						},
						content() {
							player.$.mishu = [];
						}
					}
				}
			},
			xingchen: {
				trigger: { player: 'damageAfter' },
				priority: 2,
				filter(Evt, player) {
					return true
				},
				content: [() => {
					player.draw(5);
				}, () => {
					player.chooseCard(5, 'he', '『未卜星辰』：选择放置到牌堆顶部的牌', true);
				}, () => {
					if (result.bool == true && result.cards != null) {
						Evt.cards = result.cards
					}
					if (Evt.cards.length > 0) {
						player.chooseButton(true, Evt.cards.length, ['『未卜星辰』：按顺序将卡牌置于牌堆顶（先选择的在上）', Evt.cards]).set('ai', function (button) {
							let player = _status.event.player, now = _status.currentPhase, next = now.getNext();
							let att = get.$a(player, next), card = button.link;
							let judge = next.getCards('j')[ui.selected.buttons.length];
							if (judge) {
								return get.judge(judge)(card) * att;
							}
							return next.getUseValue(card) * att;
						});
					}
				}, () => {
					if (result.bool && result.links?.length) Evt.linkcards = result.links.slice(0);
					else Evt.finish();
					game.delay();
				}, () => {
					player.lose(Evt.linkcards, ui.special);
					game.delay();
				}, () => {
					let cards = Evt.linkcards;
					while (cards.length > 0) {
						ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				}],
				ai: {
					maixie: true,
				}
			},
			//谢拉
			minghuahongxiao: {
				trigger: { player: ['useCard', 'discardAfter'] },
				filter(Evt, player) {
					return (Evt.name == 'useCard' && player != _status.currentPhase && Evt.cards.length && Evt.cards.length)
						|| (Evt.name == 'discard' && player == _status.currentPhase && Evt.cards.length);
				},
				check(Evt, player) {
					if (Evt.name == 'useCard' && player.isPhaseUsing() && player.countCards('h') && get.type2(Evt.card) == 'trick') return false;
					return true;
				},
				content: [() => {
					Evt.list = [];
					for (let i of trigger.cards) {
						Evt.list.add(get.type2(i));
					}
				}, () => {
					if (Evt.list.includes('basic')) player.addSkill('minghuahongxiao_change');
				}, () => {
					if (Evt.list.includes('trick')) {
						let evt = _status.event.getParent('phaseUse');
						if (evt?.name == 'phaseUse') {
							evt.skipped = true;
						}
						player.chooseTarget('令一名没有手牌的角色摸两张牌', function (card, player, target) {
							return target.countCards('h') == 0;
						});
					} else Evt.goto(4);
				}, () => {
					if (result.bool && result.targets?.length) {
						result.targets[0].draw(2);
					}
				}, () => {
					if (Evt.list.includes('equip')) player.recover();
				}],
				subSkill: {
					change: {
						trigger: { global: 'useCard2' },
						priority: 23,
						popup: false,
						direct: true,
						filter(Evt, player) {
							let card = Evt.card;
							let info = get.info(card);
							if (info.allowMultiple == false) return false;
							return Evt.targets && Evt.targets.length;
						},
						content: [() => {
							if (['equip', 'delay'].includes(get.type(trigger.card))
								|| !game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(trigger.card, player, cur))) Evt.goto(4);
						}, () => {
							let prompt2 = `为${get.$t(trigger.card)}增加一个目标`;
							player.chooseTarget(get.$pro('minghuahongxiao_change'), function (card, player, target) {
								let source = _status.event.source;
								if (_status.event.targets.includes(target)) return false;
								return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
							}).set('prompt2', prompt2).set('ai', function (target) {
								let player = _status.event.player;
								let source = _status.event.source;
								return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
							}).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
						}, () => {
							if (!Evt.isMine()) game.delayx();
							Evt.targets = result.targets;
						}, () => {
							if (Evt.targets) {
								player.logSkill('minghuahongxiao_change', Evt.targets);
								if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
								else trigger.targets.addArray(Evt.targets);
							}
						}, () => {
							player.removeSkill('minghuahongxiao_change');
						}],
					}
				}
			},
			//永雏塔菲
			qianqi: {
				init(player, skill) {
					player.$[skill] = 0;
				},
				trigger: { global: 'phaseBegin' },
				filter(Evt, player) {
					return player.countCards('he') > player.$.qianqi || 1;
				},
				direct: true,
				content: [() => {
					player.chooseToDiscard(get.$pro2('qianqi', trigger.player), 'he', player.$.qianqi || 1).set('logSkill', ['qianqi', trigger.player]);
				}, () => {
					if (result.bool) {
						game.delayx();
						Evt.target = trigger.player;
						let list = (trigger.stageList || lib.phaseName).slice(0);
						for (let i = 0; i < list.length; i++) {
							list[i] = ['', i + 1, list[i]];
						}
						player.chooseButton(['『迁奇』：选择两个阶段调换位置（若不选则执行另一个效果）', [list, 'vcard'], 'hidden'], 2);
					} else Evt.finish();
				}, () => {
					if (result.bool && result.links) {
						let steps = result.links.slice(0), stageList = (trigger.stageList || lib.phaseName).slice(0);
						let index0 = steps[0][1] - 1, index1 = steps[1][1] - 1;
						[stageList[index0], stageList[index1]] = [stageList[index1], stageList[index0]];
						trigger.stageList = stageList;
					} else {
						Evt.target.$.qianqi_change = player.$.qianqi || 1
						Evt.target.addTempSkill('qianqi_change');
					}
					player.$.qianqi++;
					player.addTempSkill('qianqi_clear');
					player.markSkill('qianqi');
				}],
				intro: {
					content: '『迁奇』发动次数：#',
				},
				subSkill: {
					change: {
						trigger: { player: 'useCard2' },
						priority: 23,
						forced: true,
						lastDo: true,
						mark: true,
						intro: {
							content: '本回合使用的前&张牌，目标锁定为1',
						},
						filter(Evt, player) {
							if (player.countUsed(null, true) > player.$.qianqi_change) return false;
							let card = Evt.card, info = get.info(card);
							if (info.allowMultiple == false) return false;
							return Evt.targets && Evt.targets.length && Evt.targets.length != 1;
						},
						content: [() => {
							player.chooseTarget('『迁奇』：将目标数锁定为1', function (card, player, target) {
								if (_status.event.targets.includes(target)) return true;
							}).set('ai', function (target) {
								let player = _status.event.player;
								return get.effect(target, _status.event.card, player, player);
							}).set('targets', trigger.targets).set('card', trigger.card);
						}, () => {
							if (!Evt.isMine()) game.delayx();
							Evt.targets = result.targets;
						}, () => {
							if (Evt.targets) {
								player.logSkill('qianqi_change', Evt.targets);
								trigger.targets = Evt.targets;
							}
						}],
					},
					clear: {
						trigger: { global: 'phaseEnd' },
						filter(Evt, player) {
							return !game.countPlayer2(cur => cur.getHistory('damage').length);
						},
						forced: true,
						content: [() => {
							player.$.qianqi = 0;
							player.unmarkSkill('qianqi');
							game.log(player, '重置了『迁奇』计数');
							game.delay(0.5);
						}],
					}
				}
			},
			chutan: {
				init(player, skill) {
					player.$[skill] = [];
				},
				enable: 'phaseUse',
				filter(Evt, player) {
					return game.countPlayer(cur => {
						return cur != player;
					}) >= 2;
				},
				filterCard(card, player) {
					return true;
				},
				filterTarget(card, player, target) {
					return target != player;
				},
				selectTarget: 2,
				position: 'he',
				check(card) {
					return 6 - get.value(card);
				},
				usable: 1,
				line: false,
				log: 'notarget',
				content: [() => {
					if (!player.$.chutan) player.$.chutan = [];
					player.$.chutan.add(target);
					target.$.chutan_next = player;
					player.addTempSkill('chutan_next', { player: 'phaseBegin' });
				}],
				ai: {
					order: 10,
					result: {
						player: 1,
					}
				},
				subSkill: {
					next: {
						mark: true,
						intro: {
							content: '『雏探』标记了两名角色'
						},
						onremove(player) {
							player.$.chutan.forEach(chu => {
								if (chu.$.chutan_next == player)
									delete chu.$.chutan_next;
							})
							delete player.$.chutan;
						},
						trigger: { global: 'phaseEnd' },
						priority: 23,
						forced: true,
						filter(Evt, player) {
							let chus = player.getStorage('chutan').slice(0);
							if (!chus.includes(Evt.player)) return false;
							chus.remove(Evt.player);
							return Evt.player.getHistory('useCard', evt => {
								return evt.targets.includes(chus[0]);
							}).length > 0;
						},
						logTarget: 'player',
						content() {
							let cards = [];
							trigger.player.getHistory('useCard', evt => {
								cards.addArray(evt.cards);
							})
							player.gain(cards, 'gain2', 'log');
						},
					}
				}
			},
			//闪光pika
			yikai: {
				enable: 'phaseUse',
				limited: true,
				filterTarget: true,
				content: [() => {
					player.awakenSkill('yikai');
					target.draw(2);
				}, () => {
					target.damage('thunder');
				}, () => {
					let list = [];
					let skills = target.getOriginalSkills();
					for (let i of skills) {
						if (lib.skill[i].limited) {
							list.push(i);
						}
					}
					list.push('cancel2');
					if (list.length > 1) {
						player.chooseControl(list).set('prompt', '选择一个限定技：<br><ul><li>未发动~该限定技失效直到你的下个回合开始<li>已发动~此回合结束后视为该限定技未发动过</ul>');
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.control !== 'cancel2') {
						if (target.awakenedSkills.includes(result.control)) {
							target.$.yikai_restore = result.control;
							target.addTempSkill('yikai_restore', 'phaseZhunbeiBegin');
						} else {
							target.$.yikai_blocker = [result.control, player];
							target.addTempSkill('yikai_blocker', 'none');
						}
					}
				}],
				subSkill: {
					restore: {
						mark: true,
						intro: {
							content: '在回合结束后重置『$』',
						},
						trigger: { global: 'phaseAfter' },
						locked: true,
						silent: true,
						onremove: true,
						content() {
							player.restoreSkill(player.$.yikai_restore);
						}
					},
					blocker: {
						mark: true,
						intro: {
							content(storage, player, skill) {
								let str = '';
								let list = player.getSkills(null, null, false).filter(i => lib.skill.yikai_blocker.skillBlocker(i, player));
								if (list.length) str += ('<li>失效技能：' + get.$t(list))
								return str;
							}
						},
						init(player, skill) {
							player.addSkillBlocker(skill);
						},
						onremove(player, skill) {
							delete player.$.yikai_blocker;
							player.removeSkillBlocker(skill);
						},
						locked: true,
						skillBlocker(skill, player) {
							return !lib.skill[skill].charlotte && player.getStorage('yikai_blocker')[0] == skill;
						},
						trigger: { global: 'phaseBegin' },
						filter(Evt, player) {
							let pika = player.getStorage('yikai_blocker')[0];
							return !pika || !pika.isIn() || pika == Evt.player;
						},
						content() {
							player.removeSkill('yikai_blocker');
						},
					}
				},
				ai: {
					order: 4,
					damage: true,
					result: {
						target(player, target) {
							if (target.hp > 1) {
								let skills = target.getOriginalSkills();
								for (let i of skills) {
									if (lib.skill[i].limited && target.awakenedSkills.includes(i)) {
										return 8;
									}
								}
							}
							if (target != player) return 0;
							if (get.damageEffect(target, player, player) >= 0) return 10;
							if (target.hp >= 1) return 5;
						}
					}
				}
			},
			pkyuanjun: {
				trigger: { player: 'damageEnd', source: 'damageEnd' },
				filter(Evt, player) {
					if (Evt.nature != 'thunder') return false;
					return Evt.source && Evt.source.isAlive() && Evt.player.isAlive();
				},
				usable: 1,
				logTarget(Evt, player) {
					return player == Evt.player ? Evt.source : Evt.player;
				},
				check(Evt, player) {
					let target = player == Evt.player ? Evt.source : Evt.player;
					if (target.countCards('h') >= player.countCards('h')) return true;
					if (target.countCards('h') - player.countCards('h') >= -1) return player.isDamaged();
				},
				content: [() => {
					Evt.target = player == trigger.player ? trigger.source : trigger.player;
					let num = Evt.target.countCards('h') - player.countCards('h');
					if (num > 0) {
						player.draw(num);
						Evt.finish();
					} else if (num < 0) {
						player.chooseToDiscard(-num, true);
					}
				}, () => {
					player.recover();
				}],
				ai: {
					result: {
						player: 1,
					}
				},
			},
			//咩栗
			qinhuo: {
				trigger: { global: 'useCardAfter' },
				direct: true,
				filter(Evt, player) {
					if (Evt.cards && get.name(Evt.card) == 'huogong'
						&& !Evt.player.hasHistory('sourceDamage', evt => Evt == evt.getParent('useCard'))) return true;
				},
				content: [() => {
					player.chooseTarget(function (card, player, target) {
						return target != _status.event.source;
					}).set('ai', function (target) {
						let att = get.$a(_status.event.player, target);
						if (target.hasSkillTag('nogain')) att /= 10;
						if (target.hasJudge('lebu')) att /= 2;
						return get.value(_status.event.cardx, target, 'raw') * att;
					}).set('cardx', trigger.cards).set('source', trigger.player).set('createDialog',
						[get.$pro('qinhuo'),
							'small', get.skillInfoTranslation('qinhuo', player), '令一名角色获得这些牌',
						[trigger.cards, 'card']]);
				}, () => {
					if (result.bool) {
						let target = result.targets[0];
						player.logSkill('qinhuo', target);
						target.gain(trigger.cards, 'gain2');
					}
				}],
			},
			lvecao: {
				trigger: { player: 'damageEnd' },
				filter(Evt, player) {
					return player.hasUseTarget({ name: 'tiesuo' });
				},
				check(Evt, player) {
					return true;
				},
				frequent: true,
				content() {
					player.chooseUseTarget({ name: 'tiesuo' }, true).set('addedSkill', ['lvecao']);
				},
				group: 'lvecao_fadian',
				subSkill: {
					fadian: {
						trigger: { global: 'linkEnd' },
						filter(Evt, player) {
							let evt = Evt.getParent('useCard');
							if (evt.getParent('chooseUseTarget').addedSkill && evt.getParent('chooseUseTarget').addedSkill.includes('lvecao')) {
								return evt.card.name == 'tiesuo' && evt.player == player && !Evt.player.isLinked()
									&& Evt.player.countGainableCards(player, 'hej', card => {
										if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
										return true;
									});
							}
						},
						direct: true,
						content() {
							player.gainPlayerCard(trigger.player, 'hej', '获得其区域内一张可见牌').set('filterButton', function (button) {
								if (get.position(button.link) != 'e' && get.position(button.link) != 'j' && !button.link.hasGaintag('ming_')) return false;
								return true;
							}).set('logSkill', 'lvecao_fadian');
						},
						ai: {
							effect: {
								player(card, player, target, current) {
									if (_status.event.name == 'chooseUseTarget' && _status.event.addedSkill.includes('lvecao')) {
										if (card.name == 'tiesuo' && target && target.isLinked() && target.countCards('hej', card => {
											if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
											return true;
										})) return [1, 2, 1, -1];
									}
								}
							}
						},
					}
				}
			},
			yangxi: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('he') > player.countCards('he', { type: ['trick', 'delay'] });
				},
				filterCard(card, player) {
					if (get.type2(card) == 'basic') return false;
					if (get.type(card) == 'delay') return player.canAddJudge(card);
					if (player.canAddJudge('lebu') && get.color(card) == 'red') return true
					if (player.canAddJudge('bingliang') && get.color(card) == 'black') return true
					return false;
				},
				filterTarget(card, player, target) {
					return true;
				},
				position: 'he',
				discard: false,
				lose: false,
				check(card) {
					let player = _status.event.player
					if (['shandian', 'fulei', 'haidi'].includes(get.name(card))) return 9 - get.value(card);
					if (get.color(card) == 'red' && !player.needsToDiscard()) return 6 - get.value(card);
					if (get.color(card) == 'black' && player.countCards('he') >= 3) return 5 - get.value(card);
					if (get.type(card) == 'delay') return 4 - get.value(card);
					return 3 - get.value(card);
				},
				content: [() => {
					player.$give(cards, player, false);
					if (get.type(cards[0]) == 'delay') player.addJudge(cards[0]);
					else if (get.color(cards[0]) == 'red' && player.canAddJudge('lebu')) player.addJudge({ name: 'lebu' }, cards);
					else if (get.color(cards[0]) == 'black' && player.canAddJudge('bingliang')) player.addJudge({ name: 'bingliang' }, cards);
				}, () => {
					target.damage('thunder');
				}],
				ai: {
					order: 2,
					result: {
						player(player, target) {
							if (player.countCards('h', card => ['shandian', 'fulei', 'haidi'].includes(get.name(card)))) return 0;
							return -1.5;
						},
						target(player, target) {
							if (target.hasSkill('shenyou')) return 0;
							if (target.hp == 1) return get.damageEffect(target, player, target) - 2;
							return get.damageEffect(target, player, target);
						}
					}
				}
			},
			//呜米
			naisi: {
				trigger: { global: 'phaseEnd' },
				direct: true,
				init(player, skill) {
					player.$[skill] = 0;
				},
				filter(Evt, player) {
					return player.$.naisi;
				},
				content: [() => {
					if (player.$.naisi > 1) {
						player.chooseTarget(get.$pro2('naisi'), function (card, player, target) {
							return true;
						}).set('ai', function (target) {
							return get.damageEffect(target, _status.event.player, _status.event.player);
						});
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						let target = result.targets[0];
						player.logSkill('naisi', target);
						target.damage(player.$.naisi);
					}
				}, () => {
					player.$.naisi = 0;
				}],
				group: 'naisi_recover',
				subSkill: {
					recover: {
						trigger: { player: 'recoverAfter' },
						direct: true,
						lastDo: true,
						forced: true,
						silent: true,
						content() {
							player.$.naisi++;
						},
					}
				}
			},
			tuzai: {
				trigger: { source: 'damageEnd' },
				filter(Evt, player) {
					return Evt.player.countGainableCards(player, 'hej', card => {
						if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
						return true;
					});
				},
				check(Evt, player) {
					if (get.recoverEffect(Evt.player, player, player) > 0) return true;
					let att = get.$a(player, Evt.player);
					if (att > 0 && Evt.player.countCards('j')) return true;
					let cards = Evt.player.getGainableCards(player, 'he', card => get.position(card) == 'e' || card.hasGaintag('ming_'));
					for (let i of cards) {
						if (get.equipValue(i) >= 6) return true;
					}
					return false;
				},
				logTarget: 'player',
				content: [() => {
					player.gainPlayerCard(trigger.player, 'hej', '获得其区域内一张可见牌', true).set('filterButton', function (button) {
						if (get.position(button.link) != 'e' && get.position(button.link) != 'j' && !button.link.hasGaintag('ming_')) return false;
						return true;
					});
				}, () => {
					trigger.player.recover();
				}],
				effect: {
					player(cardx, player, target) {
						if (get.$a(player, target) > 0 && target.countGainableCards(player, 'hej', card => {
							if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
							return true;
						})) {
							if (get.tag(cardx, 'damage') == 1) {
								if (target.countGainableCards(player, 'j')) return [1, 1, 0, 2];
								else return [1, 1, 0, -0.5];
							}
						}
					}
				}
			},
			wuneng: {
				enable: 'phaseUse',
				filter(Evt, player) {
					return player.countCards('h', card => ['tao', 'taoyuan'].includes(card.name) && !card.hasGaintag('ming_'));
				},
				filterCard(card, player) {
					return ['tao', 'taoyuan'].includes(card.name) && !card.hasGaintag('ming_');
				},
				position: 'h',
				discard: false,
				lose: false,
				check(card) {
					return true;
				},
				content: [() => {
					player.showCards(cards, '『呜能』亮出手牌');
					player.addGaintag(cards, 'ming_wuneng');
					player.$give(cards, player, false);
					game.delayx();
				}, () => {
					player.draw();
				}],
				ai: {
					order: 10,
					result: {
						player: 1,
					}
				}
			},
			//林大力
			xilv: {
				trigger: { global: 'drawAfter' },
				filter(Evt, player) {
					if (Evt.player == player) return false;
					let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
					if (!info || info.equipSkill || info.ruleSkill) return false;
					return lib.translate[`${name}_info`] && player.countCards('h') > 0;
				},
				content: [() => {
					Evt.target = trigger.player;
					player.chooseCard('h', get.$pro2('xilv')).set('ai', card => {
						let target = _status.event.target;
						return get.$a2(target) * get.value(card, target, 'raw') + 1;
					}).set('target', Evt.target);
				}, () => {
					if (result.bool) {
						player.logSkill('xilv', Evt.target)
						Evt.target.gain(result.cards, player, 'giveAuto');
					} else Evt.finish();
				}, () => {
					let name = lib.skill.yiqu.process(trigger);
					Evt.list = ['将摸到的牌交给' + get.$t(player), `令${get.$t(player)}获得<div class="skill">${get.$t(name)}</div>`];
					if (!player.hasSkill(name)) {
						Evt.target.chooseControl('dialogcontrol', Evt.list, function () {
							return _status.event.att;
						}).set('att', get.$a(Evt.target, player) > 0 ? 1 : 0).set('prompt', '『习律』请选择一项').set('addDialog', [trigger.result]);
					} else {
						Evt._result = { control: Evt.list[0] };
					}
				}, () => {
					switch (result.control) {
						case Evt.list[0]: {
							player.gain(trigger.result, Evt.target, 'giveAuto');
							break;
						}
						case Evt.list[1]: {
							let name = lib.skill.yiqu.process(trigger);
							player.flashAvatar('xilv', get.name(trigger.player));
							player.addAdditionalSkill('xilv', name, true);
							break;
						}
					}
				}],
				group: 'xilv_phaseEnd',
				subSkill: {
					phaseEnd: {
						trigger: { player: 'phaseEnd' },
						forced: true,
						filter(Evt, player) {
							return player.additionalSkills['xilv'];
						},
						content() {
							player.removeAdditionalSkill('xilv');
						}
					}
				}
			},
			bana: {
				trigger: { global: 'changeHp' },
				filter(Evt, player) {
					return Evt.player.countCards('he') <= Evt.player.hp && Evt.player.hp <= game.countPlayer();
				},
				check(Evt, player) {
					return get.$a(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content() {
					trigger.player.draw();
				},
				ai: {
					expose: 0.1,
				}
			},
			//Kira
			weiguang: {
				intro: {
					content: '『微光』：$',
				},
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = null;
				},
				trigger: { player: 'phaseBegin' },
				filter(Evt, player) {
					return player.countCards('hs');
				},
				direct: true,
				content: [() => {
					player.chooseToUse({
						prompt: get.$pro2('weiguang'),
						addCount: false,
					});
				}, () => {
					if (result.card && get.type(result.card)) {
						if (!player.$.weiguang) player.$.weiguang = get.type(result.card);
						if (player.$.weiguang === get.type(result.card)) {
							player.markSkill('weiguang');
							player.draw();
						} else {
							player.$.weiguang = true;
						}
					}
				}],
			},
			liangqin: {
				trigger: { player: 'dyingAfter' },
				unique: true,
				limited: true,
				priority: 100,
				check(Evt, player) {
					return true;
				},
				content: [() => {
					player.$.liangqin = true;
					player.awakenSkill('liangqin');
				}, () => {
					player.addSkill('liangqin_phaseBefore')
				}],
				subSkill: {
					phaseBefore: {
						mark: true,
						intro: {
							content: '在下个回合内摸牌量上升',
						},
						trigger: {
							player: 'phaseBefore'
						},
						forced: true,
						firstDo: true,
						content: [() => {
							player.$.liangqin_drawPlus = 1;
							player.addTempSkill('liangqin_drawPlus');
						}, () => {
							player.removeSkill('liangqin_phaseBefore');
						}],
					},
					drawPlus: {
						trigger: {
							player: 'drawBegin'
						},
						forced: true,
						firstDo: true,
						onremove: true,
						content() {
							trigger.num += player.$.liangqin_drawPlus;
							player.$.liangqin_drawPlus++;
						},
						mark: true,
						intro: {
							content: '摸牌量+#',
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'draw')) return [1, player.$.liangqin_drawPlus || 1];
								}
							}
						}
					}
				}
			},
			//李清歌
			tage: {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				trigger: { global: 'useCardAfter' },
				firstDo: true,
				direct: true,
				filter(Evt, player) {
					if (Evt.player != _status.currentPhase) return false;
					let usable = player.getDamagedHp() || 1;
					if (player.$.tage >= usable) return false;
					let num = get.number(Evt.card);
					return typeof num == "number" && player.countCards('hs', card => [1, -1].includes(get.number(card) - num));
				},
				content: [() => {
					Evt.precard = trigger.cards.slice(0);
					let num = get.number(trigger.card);
					player.chooseToRespond('『踏歌』：是否打出一张牌替换' + get.$t(Evt.precard), card => {
						if (!get.number(card)) return false;
						let num = _status.event.num;
						return [1, -1].includes(get.number(card) - num);
					}).set('num', num).set('ai', card => {
						if (!_status.event.check) return 1 - get.value(card);
						return 7 - get.value(card);
					}).set('check', get.value(Evt.precard, player) > 1 || (player.getDamagedHp() >= 2));
				}, () => {
					if (result.bool && result.cards) {
						player.logSkill('tage');
						if (!player.$.tage) player.$.tage = 1;
						else player.$.tage++;
						player.markSkill('tage');
						Evt.cards = result.cards.slice(0);
						trigger.cards = Evt.cards;
						player.gain(Evt.precard, 'gain2', 'log');
					}
				}],
				intro: {
					content: '『踏歌』发动次数：#',
				},
				group: ['tage_drawBy', 'tage_clear'],
				subSkill: {
					drawBy: {
						trigger: { global: 'phaseEnd' },
						filter(Evt, player) {
							return player.$.tage > 0;
						},
						prompt2(Evt, player) {
							let usable = player.getDamagedHp() || 1;
							return `摸${get.cnNumber(usable)}张牌，并交给${get.$t(Evt.player)}至少一张牌`;
						},
						content: [() => {
							let usable = player.getDamagedHp() || 1;
							player.draw(usable);
						}, () => {
							if (player.countCards('he') && trigger.player.isIn()) {
								Evt.target = trigger.player;
								player.chooseCard('he', true).set('ai', card => {
									let player = _status.event.player, target = _status.event.target;
									if (get.$a(player, target) > 0) return get.value(card, target) - get.value(card, player);
									return get.value(card, player) - get.value(card, target);
								}).set('target', Evt.target).set('prompt', `选择交给${get.$t(Evt.target)}的牌`)
							} else Evt.finish();
						}, () => {
							if (result.bool && result.cards) {
								player.line(Evt.target);
								player.give(result.cards, Evt.target, true);
							}
						}]
					},
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 23,
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.tage = 0;
							player.unmarkSkill('tage');
						}
					}
				}
			},
			//神宫司玉藻
			aowei: {
				trigger: { global: 'cardsDiscardAfter' },
				firstDo: true,
				direct: true,
				filter(Evt, player) {
					let evt = Evt.getParent();
					if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player == player
						|| !['useCard', 'respond'].includes(evt.relatedEvent.name) || get.name(evt.relatedEvent.card) != 'sha') return false;
					let cards = (Evt.cards2 || Evt.cards).filterInD('d');
					let card0 = evt.relatedEvent.card;
					return cards.length > 0 && player.countCards('hs', card => get.suit(card) == get.suit(card0) || get.number(card) == get.number(card0));
				},
				content: [() => {
					let evt = trigger.getParent(), cards = (trigger.cards2 || trigger.cards).filterInD('d');
					let precard = evt.relatedEvent.card;
					Evt.precard = cards.slice(0);
					Evt.change = !precard.nature;

					player.chooseToRespond('『傲尾』：是否打出一张牌替换' + get.$t(Evt.precard), card => {
						if (!get.suit(card) && !get.number(card)) return false;
						let precard = _status.event.precard;
						return get.suit(card) == get.suit(precard)
							|| get.number(card) == get.number(precard);
					}).set('precard', precard).set('ai', card => {
						if (!_status.event.check) return 1 - get.value(card);
						return 7 - get.value(card);
					}).set('check', 1);
				}, () => {
					if (result.bool && result.cards) {
						player.logSkill('aowei');
						Evt.cards = result.cards.slice(0);
						trigger.cards = Evt.cards;
						player.gain(Evt.precard, 'gain2', 'log');
					} else Evt.finish();
				}, () => {
					player.chooseTarget('『傲尾』：你可以' + (Evt.change ? '弃置一名角色一张牌' : '令一名角色回复一点体力')).set('ai', function (target) {
						let player = _status.event.player;
						if (_status.event.change) return 1 - get.$a(player, target);
						return get.recoverEffect(target, player, player);
					}).set('change', Evt.change);
				}, () => {
					if (result.bool && result.targets?.length) {
						Evt.target = result.targets[0];
						if (Evt.change) {
							player.discardPlayerCard(Evt.target, true, 'he');
						} else {
							Evt.target.recover();
						}
					}
				}],
			},
			meizhan: {
				audio: true,
				zhuSkill: true,
				trigger: { global: 'gainAfter' },
				filter(Evt, player) {
					if (!player.hasZhuSkill('meizhan')) return false;
					if (Evt.getParent().name == 'draw') return false;
					return Evt.player.group == player.group;
				},
				direct: true,
				usable: 1,
				content: [() => {
					Evt.target = trigger.player;
					let check = get.$a(Evt.target, player) > 0;
					let next = Evt.target.chooseBool(get.$pro2('meizhan', player, Evt.target));
					next.set('ai', () => {
						if (!_status.event.check)
							return 0;
						return 1;
					});
					next.set('check', check)
				}, () => {
					if (result.bool) {
						player.logSkill('meizhan', Evt.target);
						let draws = [Evt.target];
						draws.add(player);
						game.asyncDraw(draws);
					}
				}],
			},
			//吉诺儿kino
			xiandu: new toSkill('trigger', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				content() {
					player.$.xiandu++
					player.markSkill('xiandu')
					if (player.$.xiandu % 10 === 0) {
						player.logSkill('xiandu')
						player.draw(Math.min(player.$.xiandu / 10, 5))
					}
				},
				intro: {
					content: '本局游戏内累计使用了#张牌'
				}
			}, 'direct', 'locked').setT('useCard'),
			yexi: new toSkill('active', {
				filter(Evt, player) {
					return player.countCards('he');
				},
				filterTarget(card, player, target) {
					return target !== player && player.countDiscardableCards(target, 'he');
				},
				content: [() => {
					target.discardPlayerCard(player, 'he', true, `『椰熙』：请弃置${get.$t(player)}的一张牌`)
				}, () => {
					if (result?.cards?.length) {
						if (get.name(result.cards[0]) === 'sha' || get.type(result.cards[0]) === 'equip')
							target.useCard({ name: 'sha' }, get.cards(), player, false)
						else Evt.finish()
					}
					else Evt.finish()
				}, () => {
					if (target.countCards('he')) {
						player.gainPlayerCard(target, 'he', `『椰熙』：请回收${get.$t(target)}的椰子壳🥥`)
					}
				}],
				ai: {
					order: 2,
					result: {
						player(player, target) {
							if (player.hp === 1 || player.countCards('he', { type: 'equip' }) + player.countCards('h', 'sha') === 0) return -5
							if (!player.needsToDiscard() || player.isEmpty(2)) return -2
							if (!player.hasShan()) return -1
							return 0
						},
						target(player, target) {
							if (target.countCards('he', 'equip')) return -2
							if (target.countCards('he') > 2) return -1
							return 0
						}
					}
				}
			}),
			//唐九夏
			jiuxian: new toSkill('trigger', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				content: [() => {
					player.$.jiuxian++
					player.markSkill('jiuxian')
					if (player.$.jiuxian % 9 === 0) {
						player.chooseTarget(get.$pro2('jiuxian')).set('ai', tar => {
							let player = _status.event.player, att = get.$a(player, tar)
							if (att) return get.recoverEffect(tar, player, player)
							else if (tar.hasSkillTag('maixie')) return -0.5 * att
							else return -1.5 * att
						})
					}
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0]
						player.chooseControl('cancel2', 'recover_hp', 'lose_hp', function () {
							if (_status.event.check) return 1;
							return 2;
						}).set('prompt', '令目标执行：').set('check', get.recoverEffect(Evt.target, player, player) > 0);
					} else Evt.finish();
				}, () => {
					switch (result.index) {
						case 0: {
							Evt.goto(0);
							break;
						}
						case 1: {
							player.logSkill('jiuxian', Evt.target)
							Evt.target.recover()
							break;
						}
						case 2: {
							player.logSkill('jiuxian', Evt.target)
							Evt.target.loseHp()
							break;
						}
					}
				}],
				intro: {
					content: '本局游戏内累计使用了#张牌'
				},
				ai: {
					expose: 0.2
				}
			}, 'direct', 'locked').setT('useCard'),
			yujian: new toSkill('trigger', {
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				filter(Evt, player) {
					if (get.type(Evt.card) === 'equip') {
						return (player.$.yujian === true && player === Evt.player)
							|| (player.$.yujian === false && player !== Evt.player);
					}
					return false;
				},
				content: [() => {
					if (player.$.yujian === true) {
						player.chooseTarget(get.$pro2('yujian', null, player), (card, player, target) => {
							return player != target;
						}).set('ai', tar => {
							let player = _status.event.player
							return get.effect(tar, _status.event.card, player, player) + 0.1
						}).set('card', trigger.card)
					}
					else if (player.$.yujian === false) {
						player.chooseToDiscard(get.$pro2('yujian', null, player), 'he').set('ai', card => {
							if (get.$a2(_status.event.target) > 0) return -1
							return get.unuseful2(card)
						}).set('card', trigger.player)
					}
				}, () => {
					if (player.$.yujian === true && result?.targets?.length) {
						Evt.target = result.targets[0]
						player.logSkill('yujian', Evt.target)
						game.delay(1)
						player.draw()
						trigger.targets = [Evt.target]
					}
					else if (player.$.yujian === false) {
						Evt.target = trigger.player
						player.logSkill('yujian', Evt.target)
						game.delay(1)
						trigger.finish()
						player.gain(trigger.cards)
					} else Evt.finish();
				}, () => {
					player.$.yujian = !player.$.yujian
				}],
			}, 'direct').setT({ global: 'useCard2' }),
			yuenan: new toSkill('trigger', {
				filter(Evt, player) {
					return !Evt.numFixed;
				},
				check(Evt, player) {
					return true;
				},
				content: [() => {
					trigger.changeToZero();
				}, () => {
					var cards = Evt.cards = get.cards(5);
					game.cardsGotoOrdering(cards).relatedEvent = Evt.getParent();
					var dialog = ui.create.dialog('『月喃』使用一张牌', cards);
					_status.dieClose.push(dialog);
					dialog.videoId = lib.status.videoId++;
					game.addVideo('cardDialog', null, ['月喃', get.cardsInfo(cards), dialog.videoId]);
					Evt.getParent().preResult = dialog.videoId;
					game.broadcast(function (cards, id) {
						let dialog = ui.create.dialog('月喃', cards);
						_status.dieClose.push(dialog);
						dialog.videoId = id;
					}, cards, dialog.videoId);
					Evt.dialog = dialog;
					game.log(player, '亮出了', '#y牌堆顶的牌');
					player.chooseButton().set('dialog', dialog.videoId).set('filterButton', function (button) {
						let player = _status.event.player;
						return player.hasUseTarget(button.link)
					}).set('ai', button => {
						let player = _status.event.player;
						let effect = player.getUseValue(button.link);
						if (effect > 0) return effect;
						return 0;
					});
				}, () => {
					Evt.dialog.close();
					_status.dieClose.remove(Evt.dialog);
					game.broadcast(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					}, Evt.dialog.videoId);
					if (!result.links[0]) {
						Evt.goto(5)
					}
					else {
						player.chooseUseTarget(result.links[0], true, false);
						Evt.cards.remove(result.links[0]);
					}
				}, () => {
					if (Evt.cards.length == 0) {
						Evt.finish()
						return
					}
					var cards = Evt.cards
					var dialog = ui.create.dialog('『月喃』使用一张牌', cards);
					_status.dieClose.push(dialog);
					dialog.videoId = lib.status.videoId++;
					game.addVideo('cardDialog', null, ['月喃', get.cardsInfo(cards), dialog.videoId]);
					Evt.getParent().preResult = dialog.videoId;
					game.broadcast(function (cards, id) {
						var dialog = ui.create.dialog('月喃', cards);
						_status.dieClose.push(dialog);
						dialog.videoId = id;
					}, cards, dialog.videoId);
					Evt.dialog = dialog;
					game.log(player, '亮出了', '#y牌堆顶的牌');
					player.chooseButton().set('dialog', dialog.videoId).set('filterButton', function (button) {
						let player = _status.event.player;
						return player.hasUseTarget(button.link)
					}).set('ai', button => {
						let player = _status.event.player;
						let effect = player.getUseValue(button.link);
						if (effect > 0) return effect;
						return 0;
					});
				}, () => {
					if (!result.links[0]) {
						Evt.goto(5)
					}
					else {
						player.chooseUseTarget(result.links[0], true, false);
					}
				}, () => {
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
				}],
			}).setT('phaseDrawBegin1'),
		},
		card: {
			niwei_sha: {
				content() {
					Evt.target.recover(player);
					game.delay(0.5);
				},
			},
			niwei_shan: {
				content() {
					delete Evt.result;
					Evt.player.draw(2);
					game.delay(0.5);
				},
			},
			niwei_tao: {
				content() {
					Evt.target.loseHp();
					game.delay(0.5);
				},
			},
			niwei_jiu: {
				content() {
					Evt.target.chooseToUse().set('targetRequired', true);
					game.delay(0.5);
				},
			},
		},
		dynamicTranslate: {
			tiantang(player) {
				let str = lib.translate.tiantang_info;
				if (player.$.haoren === true) return `<font color=#fcd>${str.slice(0, str.indexOf(`（`)).replace(/弃置/g, `重铸`)}</font>${str.slice(str.indexOf(`（`))}`;
				return str;
			},
			liying(player) {
				let str = lib.translate.liying_info;
				if (player.$.fuyu === true) return `<font color=#fcd>${str.slice(0, str.indexOf(`（`)).replace(/基本/g, `通常锦囊`)}</font>${str.slice(str.indexOf(`（`))}`;
				return str;
			},
			gunxun(player) {
				let str = lib.translate.gunxun_info;
				switch (player.$.gunxun) {
					case 1: return str.replace(/①红色/g, `<span class="firetext">①红色</span>`).replace(/①【杀】/g, `<span class="firetext">①【杀】</span>`);
					case 2: return str.replace(/②黑色/g, `<span class="browntext">②黑色</span>`).replace(/②【闪】/g, `<span class="browntext">②【闪】</span>`);
				}
			},
			fengqing(player) {
				let str = lib.translate.fengqing_info;
				switch (player.$.fengqing) {
					case 1: return str.replace(/①视为使用了【酒】/g, `<span class="changetext">①视为使用了【酒】</span>`);
					case 2: return str.replace(/②视为使用了【桃】/g, `<span class="changetext">②视为使用了【桃】</span>`);
					case 3: return str.replace(/③跳过本回合的判定和弃牌阶段/g, `<span class="changetext">③跳过本回合的判定和弃牌阶段</span>`);
				}
				return str;
			},
			erni(player) {
				let str = lib.translate.erni_info;
				switch (player.$.erni) {
					case 1: return str.replace(/①【杀】/g, `<span class="changetext">①【杀】</span>`);
					case 2: return str.replace(/②【闪】/g, `<span class="changetext">②【闪】</span>`);
					case 3: return str.replace(/③【桃】/g, `<span class="changetext">③【桃】</span>`);
				}
				return str;
			},
			luqiu(player) {
				let str = lib.translate.luqiu_info;
				switch (player.$.luqiu) {
					case 1: return str.replace(/①视为使用一张【杀】/g, `<span class="changetext">①视为使用一张【杀】</span>`);
					case 2: return str.replace(/②摸一张牌/g, `<span class="changetext">②摸一张牌</span>`);
					case 3: return str.replace(/③弃一张牌/g, `<span class="changetext">③弃一张牌</span>`);
				}
				return str;
			},
			qianjiwanbian(player) {
				let str = lib.translate.qianjiwanbian_info;
				return player.$.qianjiwanbian_change ? str.replace(/雷电/g, `<span class="changetext">${get.rawName(player.$.qianjiwanbian_change)}</span>`) : str;
			},
			shangsheng(player) {
				let str = lib.translate.shangsheng_info;
				let num = player.$.shangsheng_Buff || 1;
				return num ? str.replace(/1/g, `<span class="changetext">${num}</span>`) : str;
			},
			lianyin(player) {
				let str = lib.translate.lianyin_info;
				if (player.awakenedSkills.includes(`guixiang`)) {
					return str.replace(/使用/g, `<span class="changetext">使用或打出</span>`);
				}
				return str;
			},
			xuanying(player) {
				let str = lib.translate.xuanying_info;
				if (player.awakenedSkills.includes(`houfan`)) {
					return str.replace(/使用/g, `<span class="changetext">使用或打出</span>`);
				}
				return str;
			},
			shixi(player) {
				let str = lib.translate.shixi_info;
				if (player.$.yuezhi) {
					return str.replace(/（你）/g, `<span class="changetext">（你或一名<皇珈骑士>）</span>`);
				}
				return str;
			},
			banmao(player) {
				if (player.$.banmao) return `【已修改】 锁定技 你造成或受到来自【杀】的伤害时，来源摸一张牌。`;
				return `锁定技 若你未受伤，你不能使用【闪】或【酒】。你造成或受到来自【杀】的伤害时，来源摸一张牌。`;
			},

			daoyi(player) {
				let str = lib.translate.daoyi_info;
				switch (player.$.daoyi) {
					case 0: return str.replace(/①颜色/g, `<span class="changetext">①颜色</span>`);
					case 1: return str.replace(/②点数/g, `<span class="changetext">②点数</span>`);
					case 2: return str.replace(/③花色/g, `<span class="changetext">③花色</span>`);
					case 3: return str.replace(/④牌名/g, `<span class="changetext">④牌名</span>`);
				}
				return str;
			},
			xiangnuo(player) {
				let str = lib.translate.xiangnuo_info;
				switch (player.$.xiangnuo) {
					case 1: return str.replace(/①进入/g, `<span class="changetext">①进入</span>`);
					case 2: return str.replace(/②离开/g, `<span class="changetext">②离开</span>`);
				}
				return str;
			},
			qingsui(player) {
				let str = lib.translate.qingsui_info;
				switch (player.$.qingsui) {
					case 0: return str.replace(/①『集爱』/g, `${lib.spanClass(`①『集爱』`, 'changetext')}`);
					case 1: return str.replace(/②『盛阴』/g, `${lib.spanClass(`②『盛阴』`, 'changetext')}`);
					case 2: return str.replace(/③『全域』/g, `${lib.spanClass(`③『全域』`, 'changetext')}`);
				}
				return str;
			},
			tuncai(player) {
				let str = lib.translate.tuncai_info;
				let result = /(阳~.*?)[；。].*(阴~.*?)[；。]/g.exec(str);
				let yang = result[1], yin = result[2];
				if (player.$.tuncai === true) return str.replace(yang, lib.spanClass(yang, 'changetext'));
				return str.replace(yin, lib.spanClass(yin, 'changetext'));
			},
			yujian(player) {
				let str = lib.translate.yujian_info;
				let result = /(阳~.*?)[；。].*(阴~.*?)[；。]/g.exec(str);
				let yang = result[1], yin = result[2];
				if (player.$.yujian === true) return str.replace(yang, lib.spanClass(yang, 'changetext'));
				return str.replace(yin, lib.spanClass(yin, 'changetext'));
			},
			wenda(player) {
				let str = lib.translate.wenda_info;
				let result = /(阳~.*?)[；。].*(阴~.*?)[；。]/g.exec(str);
				let yang = result[1], yin = result[2];
				if (player.$.wenda === true) return str.replace(yang, lib.spanClass(yang, 'changetext'));
				return str.replace(yin, lib.spanClass(yin, 'changetext'));
			},
			yinxu(player) {
				if (player.$.yinxu === true) return `转换技 你可以将一张${lib.spanClass(`①锦囊牌`, 'changetext')}②装备牌当作无视距离和次数限制的【杀】使用；以此使用的【杀】被抵消时，你可以令你或目标调整手牌至上限。`;
				return `转换技 你可以将一张①锦囊牌${lib.spanClass(`②装备牌`, 'changetext')}当作无视距离和次数限制的【杀】使用；以此使用的【杀】被抵消时，你可以令你或目标调整手牌至上限。`;
			},
		},
		translate: {
			duoduopoi: '多多poi',
			duoduopoi_ab: '多多',
			ShigureUi: '时雨羽衣',

			xinyuelan: `新月岚`,
			xinyuelan_ab: `炒作大师`,
			chisha: `迟砂`,
			chisha_info: `准备阶段，你可以将手牌调整至全场唯一最多，若如此做，你不能使用本回合摸到的牌直到回合结束。`,
			chisha_append: lib.figurer(`FAQ：“将手牌调整至全场唯一最多”不属于摸牌`),
			wujian: `鹜荐`,
			wujian_info: `你对其他角色造成伤害或受到其他角色的伤害后，若你手牌数多于对方，你可以与其交换手牌。`,

			Shiranekoyuki: `白音小雪`,
			jvliu: `拒流`,
			jvliu_info: `其他角色使用非基本牌时，你可以失去一点体力取消之。`,
			jvliu_append: lib.figurer(`特性：干扰`),
			wuxia: `无瑕`,
			wuxia_info: `觉醒技 准备阶段，若你体力为1，你增加一点体力并回复一点体力，弃置三张手牌（若不足则改为失去『拒流』）并获得『鸢揺』。`,
			wuxia_yuanyao: `鸢揺(雪)`,
			wuxia_yuanyao_append: lib.figurer(`特性：制衡`),

			/**------------------------------------------------------------------------------------------------------- */

			TsukushiAria: `月紫亚里亚`,
			tatongling: `彤灵`,
			tatongling_info: `一名角色体力流失或受到来源为你的伤害后，你可令其选择一项：
			将两张手牌置于你的武将牌上；翻面并回复一点体力，令你的『彤灵』失效直到本阶段结束。<br>
			当你的阶段被跳过时，你获得武将牌上的牌。`,
			tatongling_append: lib.figurer(`特性：压制`),
			yumeng: `预梦`,
			yumeng2: `预梦`,
			yumeng_info: `你可以跳过判定阶段与摸牌阶段，指定一名其他角色，其受到的伤害改为体力流失，直到你的下个回合开始。`,

			AoiYui: `碧居结衣`,
			suyuan: `溯愿`,
			suyuan2: `溯愿`,
			suyuan_info: `你的牌进入弃牌堆时，若这些牌包含三种或以上花色，
			你可以令一名其他角色获得这些牌并受到一点无来源的伤害，你于下个准备阶段获得其等量牌。`,
			mujian: `幕间`,
			mujian2: `幕间`,
			mujian_info: `锁定技 若你以体力为 0 的状态死亡，下个轮次开始时，你复活并发现一个主动技，获得之直到你下次死亡。`,

			NachoNeko: `甘城なつき`,
			cirong: `赐绒`,
			cirong_info: `出牌阶段限一次，你可以将一张手牌交给相邻角色。`,
			maoyu: `猫羽`,
			maoyu_info: `回合内，其他角色因为技能获得牌时，你可以令其选择一项：
			交给你两张牌；弃置一张牌，令其下家摸一张牌。`,

			HinokumaRan: `日ノ隈らん`,
			HinokumaRan_ab: `日ノ隈兰`,
			yixiang: `异想`,
			yixiang_info: `准备阶段，你可以翻面并令一名角色回复已损失的体力值，本回合结束时，其展示手牌，每缺少一种类型，其失去 1 点体力，你摸 1 张牌。`,
			xianyu: `衔鱼`,
			xianyu2: `衔鱼`,
			xianyu_info: `游戏开始时，你可以指定一名角色，你失去体力时，其摸牌至上限；
			你或其死亡时，对方重置且翻至正面。`,

			TEST: `测试员`,
			Ruki: `琉绮Ruki`,
			Ruki_ab: `琉绮`,
			beixie: `备械`,
			beixie_info: `${lib.discoloration1}游戏开始时，你可以指定获得牌堆中的一张牌，且若为武器牌，你立即装备之。`,
			hunzhan: `混战`,
			hunzhan_info: `锁定技 一名角色受到伤害时，其可立即使用一张牌，若其如此做，你摸一张牌。`,

			YukiTuan: `雪团yuki`,
			YukiTuan_ab: `雪团`,
			chentu: `衬兔`,
			chentu_info: `出牌阶段限一次，你可以弃置任意张牌，然后若你的手牌数为全场最低，你于下个回合开始时摸此次弃牌数两倍的牌。`,
			chentu_append: lib.figurer(`特性：制衡`),
			sishu: `饲鼠`,
			sishu_info: `锁定技 回合内，你需要使用基本牌时，能且仅能将一组花色的牌交给一名其他角色视为使用之。`,
			sishu_append: lib.figurer(`一组花色的牌：即四张花色各不相同的牌；特性：自肃（不能以其他方式使用基本牌）`),

			Nyanners: `Nyanners`,
			Nyanners_ab: `喵喵人`,
			shenghuo: `圣火`,
			shenghuo_info: `出牌阶段限X次，你可以观看牌堆顶与底各X张牌，然后将其中的任意张置于牌堆另一端。（X为你上一次受到伤害的伤害值+1）`,
			shenghuo_append: lib.figurer(`特性：控顶`),
			dipo: `底破`,
			dipo_info: `锁定技 若你已受伤，你摸牌时从牌堆底摸取且摸牌量+1。`,
			miaoche: `喵车`,
			miaoche_info: `主公技 英V于弃牌阶段弃置牌后，你可以获得其中一张弃牌。`,

			Ironmouse: `Ironmouse`,
			Ironmouse_ab: `铁耗子`,
			haosun: `耗损`,
			haosun_info: `回合开始时，你可以选择一项：<br>回复1点体力以重置此技能并修改『伴猫』，然后你本回合摸牌量-1；声明一种你可以使用的基本牌并令你不能使用之，然后你本回合摸牌量+1。`,
			banmao: `伴猫`,
			banmao_info: `锁定技 若你未受伤，你不能使用【闪】或【酒】。你造成或受到来自【杀】的伤害时，来源摸一张牌。`,
			banmao_rewrite: `伴猫·改`,
			banmao_rewrite_info: `锁定技 你造成或受到来自【杀】的伤害时，来源摸一张牌。`,

			Froot: `Froot`,
			Froot_ab: `巫妖`,
			exiao: `恶哮`,
			exiao_info: `你使用通常锦囊牌时，可以进行一次判定，若结果为黑色，其不能被【无懈可击】抵消且你获得判定牌。`,
			jinmei: `禁魅`,
			jinmei_info: `轮次技 其他角色的回合开始时，你可以交给其一张黑色牌，然后其本回合摸牌量-1。`,
			jinmei_append: lib.figurer(`特性：干扰`),

			Veibae: `Veibae`,
			Veibae_ab: `白恶魔`,
			zhexun: `哲循`,
			zhexun0: `哲循`,
			zhexun_info: `你使用的一张牌若与你本回合已使用的所有牌颜色相同，其不可被响应且可以额外指定一个目标。`,
			yuci: `欲词`,
			yuci_info: `锁定技 若场上的其他角色均为同一性别，你每个阶段首次摸牌量+1。`,

			Melody: `Projekt Melody`,
			Melody_ab: `Mel`,
			kuangbiao: `狂飙`,
			kuangbiao_info: `锁定技 你的♥手牌视为【无中生有】。你使用的♥手牌结算后，你失去不为1的一点体力并将此牌置于武将牌上。你已受伤时，可以将『狂飙』牌如手牌般使用或打出。`,
			leizhu: `磊诛`,
			leizhu_info: `你每使用三张锦囊牌，可以为此牌增加一个目标，然后其与你各受到一点伤害。`,
			tonggan: `同甘`,
			tonggan_info: `主公技 锁定技 与你势力相同的角色，在奇数/偶数轮次内，每阶段首次摸牌量-1/+1。`,

			Silvervale: `Silvervale`,
			Silvervale_ab: `樱花狼灵`,
			yingling: `樱聆`,
			yingling_info: `锁定技 你每阶段首次摸牌时，进行一次判定，若结果为红色，本次摸牌量+1。`,
			duchun: `渎纯`,
			duchun_info: `你的判定牌生效后，你可以令一名其他角色获得之，其下次摸牌量-1。`,

			ShishiroBotan: `狮白牡丹`,
			dan: `弹`,
			sbliedan: `烈弹`,
			sbliedan2: `烈弹`,
			sbliedan_info: `当你使用【杀】指定一名其他角色时，你可以令其将X张牌置于你的武将牌上，称之为「弹」。若如此做，一个弃牌阶段结束时，其可以获得等量的「弹」。若回合结束时你的武将牌上仍有「弹」，你获得之（X等于当前轮次数且至多为7）。`,
			sbliedan_append: lib.figurer(`特性：爆发 破军`),
			buqiang: `补枪`,
			buqiang_info: `当其他角色体力值改变为1时，你可以对其使用一张【杀】。`,

			PinkyPopHepburn: `PinkyPopHepburn`,
			PinkyPopHepburn_ab: `PPH`,
			pphpanfeng: `攀峰`,
			pphpanfeng_info: `出牌阶段开始时或你受到伤害后，你可以进行一次判定，若结果为红色，你指定体力最多的一名角色，对其造成一点伤害；若其因此进入濒死状态，你不能发动『攀峰』直到本回合结束。`,
			lanyue: `揽月`,
			lanyue_info: `限定技 一名角色使用【杀】造成伤害后，你可以弃一张牌令其体力上限+1，并与其各摸伤害值的牌。`,

			HosimiyaSio: `星宫汐`,
			yuanyao: `鸢揺`,
			yuanyao_info: `出牌阶段限X次，若你的手牌数不多于体力上限，你可以交换体力值与手牌数。（X为场上存在的女性角色数）`,
			yuanyao_append: lib.figurer(`特性：制衡`),
			gongni: `宫逆`,
			gongni_info: `限定技 准备阶段开始时，或你于回合外使用或打出一张牌后，若所有角色均已受伤，你可以令所有角色依次交换体力值与已损失体力值。`,

			luyao: `陆鳐LuLu`,
			luyao_ab: `陆鳐`,
			manyou: `鳗游`,
			manyou_info: `每回合限一次，当雷电或海洋属性的【杀】进入弃牌堆时，你可以获得之，以此获得的牌被使用时不计入次数。`,
			changjie: `长阶`,
			changjie_info: `锁定技 出牌阶段结束时，若你于本阶段内造成过伤害，你摸X张牌，若没有，你弃X张牌。（X为你本局游戏内使用属性【杀】的次数）`,
			changjie_append: lib.figurer(`特性：成长`),

			shanbao: `扇宝`,
			fengxu: `风许`,
			fengxu_info: `你使用牌指定唯一目标时，可以将其区域内的一张牌移至其下家（可替换），若未发生替换，则对其下家重复此流程，直到发生替换或重复了五次。<br>若你的牌因此发生了替换，此技能结算后你摸重复次数的牌，然后不能发动此技能直到你下一次弃置手牌。`,
			fengxu_append: lib.figurer(`特性：捡瓶子`),

			qiudi: `秋蒂Q`,
			xiangnuo: `香诺`,
			xiangnuo2: `香诺-转换`,
			xiangnuo_info: `转换技 当牌①进入②离开你的装备区时，你可以令一名角色摸两张牌，若其体力为全场唯一最低，额外回复一点体力。<br>
			出牌阶段限一次，你可以重铸点数之和为Q(12)的手牌并转换一次『香诺』。`,

			xiaoxiayu: `Siva小虾鱼`,
			xiaoxiayu_ab: `小虾鱼`,
			tanghuang: `堂皇`,
			tanghuang_info: `每回合限一次，当你成为其他角色使用牌的目标时，你可以摸X张牌并令其弃置你和其共计X+3张牌，然后弃置牌数：较少者～受到一点伤害；较多者～摸弃牌差的牌。（X为你已损失的体力值且至少为1）`,
			xiejiang: `蟹酱`,
			xiejiang_info: `锁定技 你摸两张以上的牌后，获得1点护甲；你失去护甲后，当前回合角色摸两张牌。`,

			tianxixi: `田汐汐`,
			lache: `拉扯`,
			lache_info: `你回复体力时，可以令当前回合角色摸两张牌；你弃置两张以上的牌或护甲减少后，可以回复一点体力，若发生在回合外，你摸等量牌。`,
			danfu: `蛋孵`,
			danfu_info: `锁定技 结束阶段，若你本回合未造成伤害，你失去一点体力并获得1点护甲；你失去1点护甲后，当前回合角色摸一张牌。`,

			iiivan: `伊万`,
			shuipo: `水魄`,
			shuipo_info: `锁定技 你弃置三张以上的牌或失去最后1点护甲后，回复一点体力并摸一张牌；你每阶段首次使用锦囊牌时，失去一点体力并弃置任意张牌。`,
			ming_pianchao: `片超`,
			pianchao: `片超`,
			pianchao_phaseUseBy: `片超`,
			pianchao_info: `你体力流失后，可以亮出两张手牌并获得1点护甲；当你弃置亮出的手牌时，可以使用其中一张，并于此额定阶段结束后进行一个额外的出牌阶段。`,

			shenxiaoya: `申䒕雅`,
			xyshixi: `实习`,
			xyshixi_info: `出牌阶段限一次，你可以对一名角色造成一点伤害，然后令其回复一点体力。`,
			wenxin: `闻新`,
			wenxin_info: `结束阶段，你可以令本回合回复过体力的角色各摸X张牌。（X为你已损失的体力值且至少为1）`,


			lanruo: `兰若Ruo`,
			dieyuan: `蝶缘`,
			dieyuan_info: `其他角色回复1点体力后，你可以令其摸X张牌，令其选择一项：<br>令你回复一点体力；交给你X张牌。（X为你与其的体力差且至少为1）`,
			shengyang: `盛阳`,
			shengyang_info: `出牌阶段限一次，你可以交给一名其他角色一张牌并进行一次判定，若结果的点数：<br>不大于2X~你获得其至多2X张牌；大于2X~其回复一点体力。`,

			lanre: `兰若Re`,
			daoyi: `道易`,
			daoyi_info: `转换技 你可以修改场上一次判定结果的①颜色②点数③花色④牌名。此技能转换至①时，你可以对当前回合角色造成1点雷电伤害。`,
			shengyin: `盛阴`,
			shengyin_info: `出牌阶段限一次，你可以展示其他角色的一张手牌并令其进行一次判定，若结果与展示牌：类型相同～你获得展示牌；颜色相同～你与其各摸一张牌。`,

			hunmiaomiao: `魂喵喵`,
			hun: `魂`,
			xiuyou: `修又`,
			xiuyou_info: `锁定技 你进行判定/受到伤害后，你将判定牌/牌堆顶牌置于武将牌上，称为「魂」。你进入濒死状态时，若「魂」的数量多于2，你需将一张「魂」交给当前回合角色，令其选择一项：<br>
			将全部手牌与你的「魂」交换；令你摸「魂」数量张牌；令你回复一点体力。<br>
			若此技能多次对其发动，改为选择两项。`,
			jiyuan: `楫渊`,
			jiyuan_info: `轮次技 一名角色的准备阶段，你可以令其进行一次判定，若结果为：红色~其摸两张牌；黑色~其受到一点无来源的伤害。`,

			caicai: `菜菜姐`,
			tibing: `体并`,
			tibing_info: `锁定技 你跳过不为出牌阶段的阶段。你于出牌阶段开始时，摸两张牌并获得自己场上的所有牌；于出牌阶段结束时，展示并弃置手牌中的非基本牌。`,
			guangtui: `广推`,
			guangtui_info: `若你已受伤，你可以扣减一点体力上限，将其他角色的弃牌阶段改为自己的出牌阶段。`,

			mibai: `米白zzz`,
			mibai_ab: `米白`,
			zhepie: `折撇`,
			zhepie_info: `准备阶段，你可以亮出牌堆顶牌并令一名角色获得之，其无法使用同类型的牌直到其回合结束。`,
			chumo: `除魔`,
			chumo_info: `轮次技。你区域内的牌进入弃牌堆时，你可以令一名角色获得之，若此牌无法被立即使用，你摸两张牌。`,

			Ahab: `亚哈`,
			ahbingyi: `秉义`,
			ahbingyi_info: `其他角色摸牌时，若其手牌为全场最高，你可以失去一点体力，取消之并弃置其一张牌。`,
			sujian: `肃监`,
			sujian_info: `你受到来自一张牌的伤害/发动『秉义』时，可以将此牌/一张手牌置于武将牌上，称为「肃」。<br>与「肃」同名称或花色的牌在被使用时，你可以将一张对应的「肃」置于牌堆顶，取消此牌任意名目标。`,
			sujian_append: lib.figurer(`特性：控顶 干扰`),

			FushimiGaku: `伏见学`,
			exi: `恶戏`,
			exi_info: `出牌阶段限一次，你可与一名有手牌的角色猜拳：赢家摸两张牌，输家视为对赢家使用了一张【杀】。若以剪刀输，则将使用【杀】改为使用【决斗】。`,
			suisui: `祟崇`,
			suisui_info: `锁定技 当你的体力值不为1/为1时，防止你每回合首次受到的无/有来源伤害。`,

			Xiaorou: `小柔`,
			rouqing: `柔情`,
			rouqing_info: `每回合限一次，一名角色体力减少1点后，你可以令其观看牌堆顶的四张牌并将至少（3）张牌置于牌堆底，获得其余的牌。`,
			rouqing_append: lib.figurer(`特性：卖血`),
			guangying: `光萦`,
			guangying_info: `锁定技 当你一次性获得四张以上的牌后，你回复一点体力；当你不因使用失去手牌后，你『柔情』的（）值-1，直到你下一次发动『柔情』。`,

			Ailurus: `艾露露`,
			aldanyan: `胆燕`,
			aldanyan_info: `出牌阶段限一次，你可以将两张牌交给体力不少于你的一名角色，令其选择一项：
			令你获得其三张牌；受到你造成的一点伤害。`,
			aldanyan_append: lib.figurer(`特性：直接伤害`),
			lunao: `胡闹`,
			lunao_info: `当你造成伤害时，若目标体力不多于你，你可以令本次伤害改为指定属性且此伤害+1，本次伤害结算后立即结束当前回合。`,

			ByakuyaMayoi: `白夜真宵`,
			bykuangxin: `狂信`,
			bykuangxin_info: `出牌阶段限一次，你可以进行判定直到出现两次点数为A～10的结果，然后你获得其他判定牌，并根据判定顺序组合（第一次为个位、第二次为十位）执行：<br>
			${lib.spanClass(`01～05`, `greentext`)}--摸两张牌增加一点体力上限；
			${lib.spanClass(`06～40`, `changetext`)}--回复一点体力；
			${lib.spanClass(`41～70`, `bluetext`)}--视为使用一张【决斗】；
			${lib.spanClass(`71～95`, `browntext`)}--失去一点体力并弃置手牌至上限；
			${lib.spanClass(`96～100`, `legendtext`)}--依次获得其他角色随机一张手牌并扣减一点体力上限。`,

			Mamoru: `高原守`,
			shoumi: `密守`,
			shoumi_info: `锁定技 当且仅当你的体力变为0时，你进入濒死状态。你的体力小于/大于0时，视为拥有『英姿』/『鬼才』。`,
			shoumi_yingzi: `英姿(密)`,
			shoumi_yingzi_info: `锁定技 摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限为你的体力上限。`,
			shoumi_guicai: `鬼才(密)`,
			shoumi_guicai_info: `在任意角色的判定牌生效前，你可以打出一张牌代替之`,
			yanwang: `妄诳`,
			yanwang_info: `其他角色使用牌指定你为目标时，其可以令你回复一点体力，然后展示并获得你的一张牌；若其因此获得了黑色牌，你可以令其视为对你指定的一名角色使用一张【决斗】。`,

			Niuniuzi: `牛牛子`,
			qiying: `奇嘤`,
			qiying_info: `你于其他角色的回合受到伤害后，你可以翻面并视为使用一张【南蛮入侵】。`,
			hengxuan: `恒宣`,
			hengxuan_info: `结束阶段，你可以摸两张牌；当你被其他角色指定为牌的唯一目标时，立即弃置以此法摸到的牌。`,

			Zaodaoji: `早稻叽`,
			guangan: `珖黯`,
			guangan_info: `你的上家对你使用牌，或你对你的下家使用牌时，你可以摸一张牌。每轮限X次（X为场上存活的其他角色数）。`,
			guangan_append: lib.figurer(`特性：易上手`),
			lanxuan: `澜绚`,
			lanxuan_info: `每回合每项限一次，你造成或受到伤害后，可以立即无视距离与次数限制使用一张牌。`,
			zonghe: `纵合`,
			zonghe_info: `<font color=#fbd>主公技</font> 游戏开始时，你可以指定一名社势力角色，你对其发动『珖黯』时无视座次限制。`,

			Hiiro: `希萝`,
			jiace: `铗策`,
			jiace_info: `你成为黑色牌的目标时，可以将一张与之同花色的手牌交给来源，为此牌增加或减少一个目标。若为你本回合首次发动『铗策』，你于此牌结算后获得之。`,
			xiangying: `襄英`,
			xiangying_info: `出牌阶段限一次，你可将任意红色牌交给一名手牌数小于你的角色，然后若其手牌数大于你，其展示手牌，你摸其中红黑色牌数差的牌。`,
			xiangying_append: lib.figurer(`特性：难上手`),

			HoureiTenten: `凤玲天天`,
			shengquan: `圣泉`,
			shengquan_info: `你受到伤害后，可以弃置任意张同色的手牌，回复X点体力（X为弃牌数-1）。`,
			yizhu: `译注`,
			yizhu_info: `出牌阶段限一次，你可以失去一点体力，获得一名其他角色的两张手牌；然后直到你下次发动此技能，其获得被你弃置的牌。`,

			Moemi: `萌实`,
			chengzhang: `澄涨`,
			chengzhang_info: `你装备区内的一张牌进入弃牌堆时，你可以令一名其他角色使用之。`,
			mengdong: `萌动`,
			mengdong_info: `你使用牌指定本回合未指定过的角色为目标时，若其装备区牌数为奇数，你可以摸一张牌。`,

			NatsumiMoe: `夏实萌惠`,
			moemanyi: `满溢`,
			moemanyi_info: `锁定技 你的攻击范围为全场最高/最低时，不能成为延时锦囊牌/黑色【杀】的目标。`,
			cuchuan: `粗串`,
			cuchuan_info: `摸牌阶段，你可以放弃摸牌，改为令距离为1的角色各摸一张牌，然后你获得这些角色各一张牌。`,

			Harusaruhi: `春猿火`,
			huoju: `火居`,
			huoju_info: `锁定技 你和相邻角色造成的伤害改为火焰伤害。你造成或受到火焰伤害后，若伤害来源手牌/体力全场最少，其翻面并摸一张牌/回复一点体力。`,
			zouyang: `奏扬`,
			zouyang_info: `你使用非装备牌仅指定一名角色为目标时，可使其相邻角色也成为此牌目标，其中不能成为合法目标的摸一张牌，若均摸牌或均成为目标，你不能再发动此技能直到回合结束。`,

			Koko: `幸祜`,
			xiezhen: `谐振`,
			xiezhen_info: `距离你为1的角色造成伤害时，你可以翻面并☆弃置其一张牌，若为装备牌，此伤害+1且你可以重复☆。`,
			wenzhou: `吻昼`,
			wenzhou_info: `锁定技 你受到大于1点的伤害后，令来源翻面；一名角色翻至正面时，令其摸一张牌。`,

			NecoraNyaru: `猫雷NyaRu`,
			NecoraNyaru_ab: `猫雷`,
			miaolu: `露佐`,
			miaolu_info: `一名角色进入濒死状态时，你可以弃置其一张手牌，若为基本牌，你获得之；若不为，其回复一点体力。`,
			benglei: `绷雷`,
			benglei_info: `你受到 1 点伤害后，可以令一名角色进行一次判定，若结果为：♠～对其造成与本次伤害等量的雷电伤害；♣～依次弃置其两张牌；红色～对其发动一次『露佐』。`,

			Shiratama: `白玉`,
			meihua: `莓华`,
			meihua_info: `轮次技 当♣牌不因弃置进入弃牌堆时，你可以获得之。`,
			shentian: `审甜`,
			shentian_info: `出牌阶段限一次，你可以观看一名角色的手牌并进行一次判定，然后重铸其中与判定牌花色不同的牌，每种花色至多一张。`,

			KotobukiYume: `琴吹梦`,
			xuanquan: `选权`,
			xuanquan_backup: `选权`,
			xuanquan_info: `出牌阶段限一次，你可以废除一个装备栏，获得其他角色的一张牌并令其获得『选权』。其他角色废除装备栏后，你摸一张牌。`,
			rusu: `入俗`,
			rusu_info: `你判定/装备区的牌减少时，你可以将一张锦囊/装备牌置于场上同区域。`,

			UmitsukiShell: `海月シェル`,
			beike: `贝壳潮流`,
			beike_info: `锁定技 一局游戏内，当一种锦囊首次被使用时，你摸一张牌；若原始牌堆中所有种类的锦囊均被使用过，你造成的伤害+1。`,
			wenda: `一问一答`,
			wenda_info: `转换技 阳~你可以将一张装备牌当作一张锦囊牌使用。阴~你可以将一张基本牌当作【无懈可击】使用。`,

			PastelUyu: `羽澄照うゆ`,
			PastelUyu_ab: `羽澄照乌愈`,
			chenming: `晨鸣`,
			chenming_info: `回合开始时，你可以将本回合除弃牌阶段外的一个阶段改为摸牌阶段。若为出牌阶段，你可以视为使用一张无视距离的【杀】。`,
			xiantong: `衔桐`,
			xiantong_info: `当你受到伤害时，你可以进行一次判定并弃置两张与结果颜色或类型相同的牌令伤害-1；若此伤害未被防止，你获得此判定牌。`,

			HIMEHINA: `田中姬&铃木雏`,
			HIMEHINA_ab: `姬&雏`,
			jichu: `姬雏轮舞`,
			jichu_info: `若本回合被使用的上一张牌为锦囊牌，你使用牌可以额外选择一个目标。若本回合被使用的上一张牌为♦️，你使用牌生效并结算后摸一张牌。`,
			mingshizhige: `命逝之歌`,
			mingshizhige_info: `当你受到 1 点伤害后，你可以重铸所有手牌，然后使用因此失去的其中一张。`,

			SephiraSu: `塞菲拉·苏`,
			mishu: `数之秘术`,
			mishu_info: `其他角色的回合结束时，你可以选择一项：<br>
			获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力； 令其获得本回合进入弃牌堆的一种类型的牌，且若这些牌点数之积大于13，对其造成1点伤害。每轮每项限一次。`,
			xingchen: `未卜星辰`,
			xingchen_info: `当你受到伤害后，可摸五张牌，然后将五张牌以任意顺序置于牌堆顶。`,
			xingchen_append: lib.figurer(`特性：控顶`),

			CierraRunis: `谢拉·露妮丝`,
			CierraRunis_ab: `谢拉`,
			minghuahongxiao: `鸣花轰咲`,
			minghuahongxiao_info: `你在回合外使用牌或在回合内弃置牌时，可根据你失去的牌执行对应项：基本牌~为下一张牌额外指定一名目标；锦囊牌~结束当前阶段，然后可以令一名没有手牌的角色摸两张牌；装备牌~回复1点体力。`,

			Taffy: `永雏塔菲`,
			qianqi: `迁奇`,
			qianqi_info: `一名角色的回合开始时，你可以弃置X张牌，交换本回合的两个阶段，或令其本回合使用的前X张牌可指定目标数为1；<br>然后若本回合没有角色受到伤害，重置X（X为此技能发动的次数且至少为1）。`,
			chutan: `雏探`,
			chutan_info: `出牌阶段限一次，你可以弃置一张牌，选择两名其他角色。你的下个回合开始前，若目标角色于其回合使用牌指定过另一名目标角色为目标，你于其回合结束时获得其本回合使用的实体牌，否则其不能成为『雏探』的目标。`,

			shanguangpika: `闪光pika`,
			shanguangpika_ab: `闪光皮卡`,
			yikai: `异开`,
			yikai_info: `限定技 出牌阶段，你可令一名角色摸2张牌并对其造成一点雷电伤害。然后你可以选择其的一个限定技，若该技能：<br>
			未发动~该限定技失效直到你的下个回合开始；已发动~此回合结束后视为该限定技未发动过。`,
			pkyuanjun: `元昀`,
			pkyuanjun_info: `每回合限一次，你造成或受到雷电伤害时，可以将手牌调整至与对方相同，若你未因此摸牌，你回复一点体力。`,

			Merry: `咩栗`,
			qinhuo: `侵火`,
			qinhuo_info: `当一名角色使用的【火攻】结算后，若之未造成伤害，你可以令另一名角色获得之。`,
			lvecao: `略草`,
			lvecao_info: `你受到伤害后，可以视为使用一张【铁索连环】，若有角色因此重置，你可以获得其区域内一张可见牌。`,
			yangxi: `羊袭`,
			yangxi_info: `出牌阶段限一次，你可以将一张非基本牌置于你的判定区，然后对一名角色造成1点雷电伤害。`,

			Umy: `呜米`,
			naisi: `奶死`,
			naisi_info: `一个回合结束时，若你于此回合内回复过多次体力，你可以对一名角色造成X点伤害。（X为你本回合回复体力的次数）`,
			tuzai: `图崽`,
			tuzai_info: `你对一名角色造成伤害后，可以获得其区域内一张可见牌，并令其回复一点体力。`,
			wuneng: `呜能`,
			ming_wuneng: `呜能`,
			wuneng_info: `出牌阶段，你可以亮出一张【桃】或【桃园结义】并摸一张牌。`,

			RinaHayashi: `林莉奈`,
			xilv: `习律`,
			xilv_info: `其他角色因为技能摸牌时，你可以交给其一张手牌，然后其选择一项：<br>1.交给你摸到的牌；2.若你没有对应技能，令你获得之，直到你的下个回合结束。`,
			bana: `拔奈`,
			bana_info: `当一名角色的体力改变后，若其牌数≤体力值≤场上角色数，你可以令其摸一张牌。`,

			Kira: `姬拉Kira`,
			Kira_ab: `姬拉`,
			weiguang: `微光`,
			weiguang_info: `回合开始时，你可以使用一张牌，若与你以『微光』使用的每一张牌类型相同，你摸一张牌。`,
			liangqin: `良寝`,
			liangqin_info: `<font color=#f57>限定技</font> 你脱离濒死状态后，可以令你下个回合内第X次摸牌的摸牌量+X。`,

			Menherachan: `七濑胡桃`,
			shang: `裳`,
			shangbei: `裳备`,
			shangbei_info: `你受到伤害后，可以展示牌堆顶牌，若你没有与之花色相同的「裳」，你将之置于武将牌上，称为「裳」，然后摸一张牌。<br>出牌阶段开始时，你可以令一名角色获得某一类型的「裳」，若为其他角色获得，你回复一点体力。`,
			qianqing: `迁情`,
			qianqing_info: `锁定技 回合开始时，若你没有「裳」，你受到一点无来源的伤害。`,

			liqingge: `李清歌`,
			tage: `踏歌`,
			tage_info: `每回合限X次，当一名角色于其回合内使用一张牌后，你可以打出一张点数与之相差1的牌替换之。你以此法获得牌的回合结束时，可以摸X张牌，然后将一张手牌交给当前回合角色。（X为你已损失的体力值且至少为1）`,

			JingujiTamamo: `神宫司玉藻`,
			aowei: `傲尾`,
			aowei_info: `当其他角色的【杀】结算完毕即将进入弃牌堆时，你可打出一张同花色或点数的手牌替换之。若你获得的牌：<br>有属性~你可以令一名角色回复一点体力；无属性~你可以弃置一名角色的一张牌。`,
			meizhan: `魅绽`,
			meizhan_info: `主公技 每回合限一次，与你同势力的角色不因摸牌获得牌时，可以与你各摸一张牌。`,

			Kino: `吉诺儿kino`,
			Kino_ab: `吉诺儿`,
			xiandu: `显渡`,
			xiandu_info: `锁定技 一局游戏内，你每使用十张牌，摸X张牌（X为此技能被发动的次数且至多为5）`,
			yexi: `椰熙`,
			yexi_info: `出牌阶段，你可以令一名其他角色弃置你的一张牌，若其弃置了【杀】或装备牌，其将牌堆顶牌当作【杀】对你使用，然后你获得其一张牌。`,

			tangjiuxia: `唐九夏`,
			jiuxian: `韭仙`,
			jiuxian_info: `你每使用九张牌，你可以令一名角色回复或失去一点体力。`,
			yujian: `御剑`,
			yujian_info: `转换技 阳~你使用装备牌时，可以摸一张牌并令其他角色装备之；阴~其他角色使用装备牌时，你可以弃一张牌并令你获得之。`,

			Bafuko: `晴步子`,
			shangsheng: `能力上升`,
			shangsheng_info: `回合开始时，你于本回合获得一项效果：A.于摸牌阶段多摸1张牌；B.于出牌阶段多出1张【杀】；C.于弃牌阶段手牌上限+1。然后若本次选择与前两次均不同，此技能所有数字+1；否则-1（至少为1）。`,
			shangsheng_append: lib.figurer(`特性：成长`),
			jinghua: `镜花水月`,
			jinghua_info: `出牌阶段限一次，你可以将X张牌依次展示并交给不同角色，令其无法使用相同类型的牌，直到你的下个回合开始（X为你本回合使用【杀】的次数）。`,

			AmemachiF: `雨街F`,
			ciling: `刺令`,
			ciling_info: `你可以跳过出牌阶段，改为指定一名其他角色，其每次弃牌阶段结束后，你可以选择一项：
			1.获得其弃牌；2.视为对其使用一张【杀】。<br>
			『刺令』状态会持续直至其进入濒死状态或其对你使用了三张【杀】。`,
			ciling2: `刺令`,
			ciling2_info: `被杀手刺杀中`,
			xiyu: `细雨`,
			xiyu_info: `锁定技。你于回合外使用牌时，摸一张牌。`,

			linxi: `麟＆犀`,
			lilian: `历敛`,
			lilian_info: `准备阶段，你可以令一名角色摸等同你体力上限的牌，然后令你不为全场唯一最低的体力上限扣减1点。`,
			zihuai: `辎徊`,
			zihuai_info: `轮次技 你一次性弃置至少X张牌后，可以摸X张牌。（X为你上一次于弃牌阶段弃置的牌数）`,

			jike: `机萪`,
			qianjiwanbian: `千机万变`,
			qianjiwanbian_info: `当你造成伤害时，你可将此伤害改为（雷电）属性。<br>
			回合开始时或你于一个独立事件中首次造成伤害后，可修改（）内属性并发现一个有字与此技能某字拼音相同的技能，在你下个回合开始之前获得之。若选择『千机万变』，直到你的下个回合开始前此技能触发时额外发现一次。`,
			qianjiwanbian_append: lib.figurer(`特性：难上手`),

			xinkeniang: `新科娘`,
			daimao: `呆毛科技`,
			daimao_info: `锁定技 游戏开始时，你将牌堆顶牌置于武将牌上，称为「萪」；你使用与「萪」同花色的牌不受距离和次数限制；你进入濒死状态时，将一张与「萪」不同花色的牌置于「萪」中，若如此做，则你体力上限-1，回复满体力，摸三张牌。`,
			hongtou: `红头文件`,
			hongtou_info: `<font color=#f44>主公技</font> 当你需要使用或打出基本牌时，场上的国V可代替你使用或打出。`,

			azhun: `天气阿准`,
			azhun_ab: `阿准`,
			tianqi: `天气`,
			tianqi_mark: `天气`,
			tianqi_info: `锁定技 游戏开始时，你将牌堆顶牌置于你的武将牌旁，称为「天气」。`,
			yubao: `预报`,
			yubao_info: `拥有「天气」的角色的准备阶段开始时，你可以观看牌堆顶的X张牌，并以任意顺序放回（X为场上「天气」的数量）。`,
			yubao_append: lib.figurer(`特性：控顶`),
			butaizhun: `不太准`,
			butaizhun_info: `每回合限一次，你可以扣置一张手牌当任意一张基本牌或通常锦囊牌使用或打出。此时，未拥有「天气」的其他角色可质疑则翻开此牌：若为假则此牌作废，若为真则质疑角色将牌堆顶牌置于武将牌旁，称为「天气」。`,
			butaizhun_guess: `不太准`,
			butaizhun_respond: `不太准`,
			butaizhun_wuxie: `不太准`,
			butaizhun_ally_bg: `真`,
			butaizhun_betray_bg: `假`,

			zhongguobanai: `中国绊爱`,
			liying: `立影`,
			liying_info: `当你受到伤害或打出牌响应其他角色后，你可以获得来源X张牌，然后交给其X-1张牌；当你于一个阶段内以此法给出第二张牌时，你可以视为使用一张基本牌。（X为其体力值）`,
			fuyu: `扶谕`,
			fuyu_info: `觉醒技 准备阶段，若你通过『立影』给出的牌数为4的倍数。你扣减一点体力上限，将『立影』里的“基本”改为“通常锦囊”。`,

			YamaUsagi: `山兔YamaUsagi`,
			YamaUsagi_ab: `山兔`,
			zhengmeng: `正萌`,
			zhengmeng_info: `摸牌阶段，你可以改为翻面并投掷一枚骰子，摸骰点张牌，若骰点为6，你本局游戏内【杀】造成的伤害+1。`,
			wadao: `蛙蹈`,
			wadao_info: `你翻至正面时，可以令一名其他角色进行一个额外的回合。`,

			RIKO: `栗子酱`,
			tieyu: `铁驭`,
			tieyu_info: `你使用非装备牌时，可以弃置（3）张牌，若弃牌颜色为：<br>
			黑色～此牌数值+1；红色～增加至多两个目标；无色～此技能（）值-1。<br>
			你使用装备牌时，可以摸（2）张牌。`,
			tieyu_append: lib.figurer(`特性：成长<br>FAQ：“数值”仅限于伤害值、回复值与护甲获得值`),

			EQueen: `乃琳`,
			yehua: `夜话`,
			yehua_info: `回合开始时，你可以将手牌调整至场上唯一最多并翻面。`,
			fengqing: `风情`,
			fengqing_info: `转换技 当你的武将牌状态发生变化时，你可以选择一名角色，其在其下个准备阶段①视为使用了【酒】②视为使用了【桃】③跳过本回合的判定和弃牌阶段。`,
			fengqing_jiu: `风情-酒`,
			fengqing_tao: `风情-桃`,

			Carol: `珈乐`,
			huangjia: `王力口乐`,
			shixi: `时隙`,
			shixi_info: `锁定技 游戏开始时，记录你的初始手牌。当（你）的牌进入弃牌堆时，你可以选定一张花色与之相同的记录牌。一个阶段结束时，每有两个选定你便摸一张牌，然后重置选定。`,
			xueta: `靴匿`,
			xueta_info: `你响应其他角色的牌后，可以弃一张牌，令其摸两张牌，并令其成为<皇珈骑士>。`,
			yuezhi: `乐治`,
			yuezhi_info: `<font color=#a7f>觉醒技</font> 回合开始时，若场上<皇珈骑士>的数量不少于你的体力值或手牌数，你增加一点体力上限并从弃牌堆获得你的初始手牌，每有一张无法获得，你回复1点体力并摸两张牌，然后修改『时隙』（）内容为“你或一名<皇珈骑士>”。`,

			Ava: `向晚`,
			yiqu: `亦趋`,
			yiqu_info: `若你在其他角色执行技能的过程中被指定为目标，你可以获得该技能直到下次进入濒死状态。`,
			wanxian: `挽弦`,
			wanxian_info: `锁定技 你令其他角色进入濒死状态时，你失去来自『亦趋』额外技能并摸等量的牌。`,

			Diana: `嘉然`,
			quanyu: `全域`,
			quanyu_info: `其他角色使用一张牌时，若你没有该花色的手牌，你可以令此牌无效并获得之，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。`,
			quanyu_append: lib.figurer(`特性：干扰`),
			wulian: `舞连`,
			wulian_info: `<font color=#ecd>限定技</font> 出牌阶段，你可以摸等同于已损失体力值的牌，然后在本轮内获得『连破』。`,
			lianpo: `连破`,
			lianpo_info: `一名角色的回合结束时，若你本回合内杀死过角色，则你可以进行一个额外的回合。`,

			Bella: `贝拉`,
			aswusheng: `舞圣`,
			aswusheng_info: `你连续使用或打出第（）张基本牌时，可以触发对应项：（0）使之不计入次数；（1）摸一张牌；（2）获得对方的一张牌；（3）回复1点体力。`,
			aswusheng_append: lib.figurer(`特性：易上手`),
			gunxun: `棍训`,
			gunxun_info: `转换技 出牌阶段，你可以亮出至少一张①红色②黑色手牌使之视为①【杀】②【闪】，然后你可令装备区牌数少于本次亮出牌数的一名角色失去所有非锁定技直到回合结束。`,
			ming_gunxunshan: `棍训:闪`,
			ming_gunxunsha: `棍训:杀`,

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

			ŌokamiMio: `大神澪`,
			niwei: `逆位`,
			ming_niwei: `逆位`,
			xuanxu: `玄虚映实`,
			xuanxu_info: `出牌阶段开始时，你可以亮出任意张基本牌，称为「逆位」牌，「逆位」牌不计入手牌数，且只能以以下效果对原不合法的目标使用：【杀】∽回复1点体力；【闪】∽摸两张牌；【桃】∽失去1点体力；【酒】∽立即使用一张牌。`,
			weizeng: `味增弼佐`,
			weizeng_info: `其他角色的回合开始时，你可以将任意亮出牌以任意顺序置于牌堆顶，其获得这些牌后，其所有同名牌在本回合内均视为「逆位」。`,
			weizeng_append: lib.figurer(`特性：难上手 控顶`),

			Ciyana: `希亚娜`,
			yankui: `魇窥`,
			yankui_info: `其他角色的准备阶段，你可以弃置一张与本轮以此法弃置的牌类型均不同的牌，然后观看其手牌，展示并获得其中一张。若此牌为：非基本牌，本回合其跳过判定阶段与弃牌阶段；基本牌，本回合其可以多使用一张【杀】。`,

			YaotomeNoe: `八乙女のえ`,
			huiyuan: `回援`,
			huiyuan_info: `每回合限一次，当其他角色使用基本牌时，若其手牌数多于你，则你可以与其各摸一张牌。`,
			huiyuan_append: lib.figurer(`特性：辅助`),
			suoshi: `琐事`,
			suoshi_info: `当你受到伤害时，你可以将一张手牌交给一名全场手牌数最多的角色；若你手牌数不为全场最少，你受到的伤害+1。`,

			SuouPatra: `周防パトラ`,
			mianmo: `眠魔`,
			mianmo_info: `每回合限一次，你使用牌的目标可改为任意体力和等于之点数或合计点数的角色，若包括你，重置此技能。`,
			tiaolv: `调律`,
			tiaolv_info: `你使用一张牌时，可以令其点数增加/减少X（X为你已损失的体力值且至少为1），然后若你以此牌发动『眠魔』，则你可以令目标横置/各摸一张牌。`,
			tiaolv_append: lib.figurer(`特性：难上手`),

			Paryi: `帕里`,
			tiantang: `天扉`,
			tiantang_info: `一名角色的回合开始时，你可以弃置X张牌并声明一种花色：<br>
			观看并弃置其一张声明花色的牌，令其执行一个额外的出牌阶段；或令其摸两张牌，只能使用声明花色的牌直到回合结束。（X为你对目标发动此技能的次数且至少为1）`,
			haoren: `好人`,
			haoren_info: `觉醒技 你发动『天扉』后，若发动次数大于存活人数，你扣减1点体力上限，将『天扉』的“弃置”改为“重铸”；且在『天扉』的额外出牌阶段内，当前回合角色获得『引流』。`,
			haoren_append: lib.figurer(`特性：难上手`),

			TakatsukiRitsu: `高槻律`,
			shengya: `生涯`,
			shengya_info: `<font color=#f33>锁定技</font> 出牌阶段内，你使用的一张红色牌后，你亮出牌堆顶一张牌并获得之。若你亮出了♣牌，你失去一点体力，并且失去此技能直到下个回合开始。`,
			shengya_append: lib.figurer(`特性：易上手`),
			liangshan: `汉歌`,
			liangshan_info: `其他角色在你的回合内第一次摸牌后，你可以将牌堆顶牌置于你的武将牌上。一名角色回合开始或濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。`,
			liangshan_append: lib.figurer(`特性：辅助`),
			chongshi: `铳士`,
			chongshi_info: `你使用【杀】指定目标后，可与其各摸一张牌。`,

			MorinagaMiu: `森永缪`,
			guanzhai: `观宅`,
			guanzhai_info: `其他角色的回合结束时，若其本回合使用的牌少于（2）张，你可观看其手牌并获得其中（1）张。`,
			guanzhai_append: lib.figurer(`特性：易上手 压制`),
			zhishu: `直抒`,
			zhishu_info: `出牌阶段开始或你的体力改变时，你可以展示一张手牌，令一名其他角色选择一项：<br>交给你一张同花色的牌；令你与其下个回合内『观宅』的（）值+1。`,

			OtomeOto: `乙女音`,
			yuxia: `玉匣`,
			yuxia_info: `你可以将三张牌当作一张通常锦囊牌使用；其结算后，你可以将这些牌以任意顺序置于牌堆顶。`,
			yuxia_append: lib.figurer(`特性：控顶`),
			lianjue: `连崛`,
			lianjue_info: `回合结束时，若你的手牌数与本回合开始时差值为三的倍数，你可以选择一项：<br>令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。`,
			changxiang: `长箱`,
			changxiang_info: `主公技 其他同势力角色进入濒死状态时，你可以弃置数量等于自己当前体力值的手牌，视为对其使用一张【桃】。`,

			xhhuanshi: `士`,
			HisekiErio: `绯赤艾莉欧`,
			huange: `幻歌`,
			huange_info: `轮次技 一个回合开始时，你可以摸等同一名角色体力值的牌，然后于回合结束时，弃置等同其当前体力值的牌。若你发动过『奇誓』，你可以将弃牌改为置于你的武将牌上。`,
			qishi: `奇誓`,
			qishi_info: `<font color=#f54>觉醒技</font> 你造成且受到伤害的轮次结束时，你减1体力上限，获得『系绊』，然后进行判定直到出现黑色并将这些牌置于武将牌上，称为「士」。`,
			xiban: `系绊`,
			xiban_info: `其他角色的回合结束时，若其造成了伤害，你可以弃置X张「士」令其选择一项：弃置等量的牌；或若你已受伤，令你回复1点体力。（X为你当前体力值）`,
			yongtuan: `拥团`,
			yongtuan_info: `主公技 <font color=#fa8>限定技</font> 你弃置「士」时，可以令一名同势力角色获得之。`,

			dusongziGin: `杜松子_Gin`,
			dusongziGin_ab: `杜松子`,
			danqing: `蛋擎`,
			danqing_info: `你造成或受到伤害后，可以令一名本回合未以此法获得牌的角色获得一张【酒】，若是该回合首次发动，改为获得两张。`,
			gaiqu: `改躯`,
			gaiqu_info: `觉醒技 准备阶段，若你本局游戏内使用【酒】的次数多于你的手牌数，你增加一点体力上限并回复一点体力，弃置三张手牌（若不足则改为失去『蛋擎』）并令所有成为过『蛋擎』目标的角色获得『松星』。`,
			songxing: `松星`,
			songxing_info: `你可以将一张【酒】当作一张锦囊牌使用，每回合每种牌名限一次。`,


			Yousa: `泠鸢`,
			niaoji: `鸟肌`,
			niaoji_info: `你造成/受到伤害后，可以进行判定：若为♥️，你摸X张牌；若为♠️，你弃置目标/来源X张牌。（X为你已损失的体力值+1）`,
			ysxiangxing: `翔星`,
			ysxiangxing_info: `出牌阶段限一次，你可以将所有手牌以任意顺序置于牌堆顶，然后对攻击范围内一名角色造成1点伤害。`,
			ysxiangxing_append: lib.figurer(`特性：易上手 直接伤害 控顶`),

			Hanser: `hanser`,
			Hanser_ab: `憨色`,
			naiwei: `奶味天使`,
			naiwei_info: `出牌阶段限一次，你可令体力值最大的一名角色失去1点体力，或令体力值最小的一名角色回复1点体力。然后若满足该项的角色不止一名，你可发动另一项。`,
			cishan: `慈善赌王`,
			cishan_info: `摸牌阶段，你可改为将手牌数翻倍。然后其他角色可以选择与你拼点，赢的角色获得你一张牌。`,
			cishan_append: lib.figurer(`特性：爆发`),

			Shaun: `勺`,
			juxiao: `句销`,
			juxiao_info: `当你受到伤害后，可以令至多两名角色各摸一张牌，因此摸牌的角色不能使用【杀】直到回合结束。`,
			juxiao_append: lib.figurer(`特性：卖血`),
			shshenyan: `神言`,
			shshenyan_info: `出牌阶段限一次，你可以展示并弃置手牌中一种牌名的牌，摸等量的牌。然后你可以：视为使用一张名称长度等于本阶段此技能弃置牌花色数的锦囊牌；否则若你弃置了【杀】，重置此技能。`,
			shshenyan_append: lib.figurer(`特性：制衡`),

			Muri: `无理Muri`,
			Muri_ab: `无理`,
			lique: `理却`,
			lique_info: `锁定技 你成为非装备牌的目标时，失去一点体力并摸一张牌。`,
			zhangdeng: `掌灯`,
			zhangdeng_info: `锁定技 你进入濒死状态时，回复一点体力。`,

			Aza: `阿萨Aza`,
			Aza_ab: `阿萨`,
			qiding: `契定`,
			qiding_info: `出牌阶段限一次，你可以令攻击范围内的一名角色观看你的手牌并选择一项：<br>受到1点伤害；令你观看并获得其一张牌且防止你对其的伤害直到本回合结束。`,
			chouxin: `酬心`,
			chouxin_info: `锁定技 当♥牌正面朝上离开你的手牌时，若你：未受伤~失去1点体力；已受伤~回复一点体力。你已发动过此技能的回合内，你跳过弃牌阶段。`,

			Mahiru: `真绯瑠Mahiru`,
			Mahiru_ab: `真绯瑠`,
			jusheng: `剧生`,
			jusheng_info: `轮次技 其他角色的准备阶段，你可以与其交换装备区，若其装备区的牌数因此：<br>减少~你令你或其调整手牌至与对方相同；增加~其本回合使用牌指定你或其为目标时，你可以视为使用一张【杀】。`,
			xingqu: `星取`,
			xingqu_info: `限定技 你令其他角色进入濒死状态时，你可以扣减1点体力上限令其回复1点体力，然后你们同时发现一组技能，若你们选择的技能相同，你本局游戏内造成的伤害+1；若不同，你获得对方选择的技能。`,

			Miki: `弥希Miki`,
			Miki_ab: `弥希`,
			xingxu: `星许`,
			xingxu_shiyue: `星许`,
			xingxu_info: `轮次技 其他角色的准备阶段，你可以交给其两张牌。本回合结束时，若其：使用了其中一张～你视为使用另一张；对你造成了伤害～你回复一点体力。`,
			qingsui: `清随`,
			qingsui_jiai: `集爱(清)`,
			qingsui_shengyin: `盛阴(清)`,
			qingsui_quanyu: `全域(清)`,
			qingsui_info: `转换技 你视为拥有①『集爱』②『盛阴』③『全域』。<br>当此技能于你回合外转换至①时，你可以获得当前回合角色的一张牌。`,

			Chiyuu: `千幽Chiyuu`,
			Chiyuu_ab: `千幽`,
			anyou: `暗友`,
			anyou_info: `出牌阶段开始或你受到伤害后时，你可以令与你距离为1的角色依次选择一项：<br>交给你一张牌；使用一张牌，以此使用的牌指定你为目标时，你摸一张牌。`,
			mingyou: `明悠`,
			mingyou_info: `本回合已受到伤害的角色使用牌指定你为目标时，你可以与其各回复一点体力。`,

			Mari: `茉里Mari`,
			Mari_ab: `茉里`,
			tingzhu: `庭柱`,
			tingzhu_info: `你使用牌造成伤害后，可以弃置一张本回合未进入弃牌堆类型的牌，对目标外的一名角色造成一点伤害。`,
			xuemo: `血耱`,
			xuemo_info: `你对体力与你不同的角色造成伤害时，可以将体力调整至与其相同令伤害+1。`,

			Mayumi: `勾檀Mayumi`,
			Mayumi_ab: `勾檀`,
			jinzhou: `晋胄`,
			jinzhou_info: `锁定技 当你失去装备区的防具牌时，你摸（1）张牌，然后令所有（）值+1。`,
			gouhun: `勾魂`,
			gouhun_info: `出牌阶段限一次，你可以亮出牌堆顶（3）张牌，并选择一项：获得其中一种类型的牌；令所有（）值+1。<br>你以此技能获得的基本牌不计入次数，锦囊牌不计入手牌上限。`,
			gouhun_append: lib.figurer(`特性：成长`),

			Ruruna: `露露娜Ruruna`,
			Ruruna_ab: `露露娜`,
			miluan: `迷乱`,
			miluan_info: `出牌阶段，你可以与至多两名角色拼点，没赢的角色受到来自对方的一点伤害并摸两张牌。`,
			shenjiao: `身教`,
			shenjiao_info: `你受到伤害后，可以令一名角色受到的伤害-1直到回合结束。`,
			shenjiao_append: lib.figurer(`特性：辅助`),

			Karon: `茶冷Karon`,
			Karon_ab: `茶冷`,
			huomo: `惑魔`,
			huomo_info: `轮次技 你成为一张牌的目标时，可以弃置一张牌，令距离你为1的其他角色改变对于此牌的目标状态。`,
			huomo_append: lib.figurer(`特性：辅助`),
			tuying: `涂映`,
			tuying_info: `出牌阶段结束时，你可以将一张手牌当做本阶段使用的最后一张牌使用，然后可以将之目标数改为与本阶段使用的第一张牌相同。`,

			xiaoke: `小可学妹`,
			xiaoke_ab: `小可`,
			mian: `面`,
			dianying: `店营`,
			dianying2: `店营`,
			dianying_info: `其他角色的出牌阶段限一次，其可以将至少一张手牌扣置于你的武将牌旁，称为「面」，然后其可以将两张「面」明置以回复1点体力。<br>
			你受到伤害时，可以将至少三张明置的「面」暗置，使此伤害-1，若伤害被防止，伤害来源获得因此暗置的「面」。`,
			ganfen: `擀奋`,
			ganfen_info: `你可以对自己造成1点伤害并跳过一个主要阶段，将牌堆顶三张牌扣置为「面」。<br>
			你使用或打出基本牌时，可以将一张「面」明置。`,

			Azusa: `阿梓`,
			juehuo: `绝活`,
			zhiyue: `指月`,
			zhiyue_info: `游戏开始时，你将牌堆顶牌扣置于武将牌旁，称为「绝活」。<br>
			当你使用与暗置「绝活」类型相同的牌时，可以将其中一张明置，然后若所有「绝活」均明置，你扣置牌堆顶牌于武将牌旁；<br>
			当你使用与明置「绝活」花色相同的牌时，可以将其中任意张暗置并摸等量的牌。`,
			zhiyue_append: lib.figurer(`特性：成长`),
			zhengniu: `蒸牛`,
			zhengniu_info: `其他角色令你重置、回复体力或摸牌时，你可以令其获得任意的「绝活」。`,

			ap_Nana7mi: `天启·七海`,
			ap_Nana7mi_ab: `界七海`,
			niyou: `溺游`,
			niyou_info: `锁定技 一个回合结束时，若你受到了伤害，你进行一个额外的出牌阶段。若你于此阶段内没有使用牌，你翻面并摸两张牌；若使用了，你与其他角色距离+1。`,
			shalu: `鲨戮`,
			shalu_info: `出牌阶段限一次，你可以弃置所有手牌并对攻击范围外的一名角色造成一点伤害，然后摸其体力值的牌。`,

			ap_Azusa: `天启·阿梓`,
			ap_Azusa_ab: `界阿梓`,
			puyu: `璞玉`,
			puyu_info: `出牌阶段开始时，你可以令一名角色弃一张牌，本阶段内，你所有手牌的牌名视为之，且你使用5张牌或所有角色合计获得10张牌后立即结束此阶段。`,
			appojian: `破茧`,
			appojian_info: `锁定技 你使用牌造成伤害后，你令体力最多的一名角色失去一点体力，体力最少的一名角色回复一点体力；然后若你满足至少一项，立即结束当前回合。`,

			qingzezi: `清则子`,
			ze: `则`,
			menghuan: `梦桓`,
			menghuan_info: `锁定技 游戏开始时/一名角色进行判定后，你将牌堆顶牌/判定牌依次置于武将牌右侧，称为「则」，然后若「则」数量大于6，将左起第1张「则」置入弃牌堆。<br>
			当你于一个回合内使用的第n张牌与左起第n张「则」花色或类型相同时，你摸一张牌。`,
			gengu: `亘古`,
			gengu_info: `当你体力改变后，你可以令一名角色进行一次判定，若结果：<br>
			为黑色～其弃一张牌，若其武将牌周围有牌，则改为重铸一张牌。`,

			shengge: `笙歌`,
			di: `笛`,
			dixian: `笛鲜`,
			dixian_info: `出牌阶段限一次，你可以将牌堆顶牌置于武将牌的左侧或右侧，称为「笛」，当另一张同颜色的「笛」被置于另一侧或你使用一张同类型的牌后，你获得之。<br>
			你一次性获得3张或以上的「笛」后，可以立即发动一次此技能。`,
			gumei: `古寐`,
			gumei_info: `你使用锦囊牌时，可以令一名角色横置或重置，若其武将牌周围有牌，则改为摸一张牌。`,


			zhugeaixi: `诸葛哀汐`,
			kaituan: `开团`,
			kaituan_info: `你可以将点数小于5的牌当作【过河拆桥】使用。`,
			gehuang: `鸽簧`,
			gehuang_info: `锁定技 当你使用一张锦囊牌时，记录此时你攻击范围内的角色数为X。<br>
			当X变化时，你摸变化差值张牌。<br>
			你体力等于X时，造成的伤害+1。`,
			susi: `诉死`,
			susi_enable: `诉死`,
			susi_info: `限定技 出牌阶段，你可以将一个势力的所有角色移出游戏直到回合结束。`,

			KurumiUsa: `胡桃Usa`,
			KurumiUsa_ab: `胡桃`,
			jidou: `激斗`,
			jidou_info: `锁定技 你使用【决斗】指定唯一目标或成为【决斗】的目标时，摸一张牌，若你没有手牌或体力为1，改为摸三张。`,
			duotian: `堕天`,
			duotian_info: `出牌阶段限一次，你可以将一张基本牌当作一张单体锦囊牌使用，若此牌点数：<br>
			≥6~你可为之增加一个目标；≥12~你于此阶段结束后进行一个额外的出牌阶段。`,

			NanaseUnia: `七濑Unia`,
			NanaseUnia_ab: `七濑`,
			qisui: `麒随`,
			qisui_info: `每回合每名角色限一次，一名角色于你的回合内摸牌或其他角色令你摸牌时，你可以令其获得『灵军』直到其下一次使用【决斗】，若其已拥有『灵军』，改为本次摸牌量+1。`,
			lingjun: `灵军`,
			lingjun_info: `锁定技 你手牌中的【杀】视为【决斗】。`,

			Myanna: `玛安娜Myanna`,
			Myanna_ab: `玛安娜`,
			yemo: `夜魔`,
			yemo_backup: `夜魔`,
			yemo_info: `出牌阶段，你可以摸一张牌并废除一个装备栏，令一名角色获得『灵昏』直到其下一次使用【决斗】，若其已有『灵昏』，改为弃置其区域内的一张牌。`,
			jiaopin: `校频`,
			jiaopin_info: `结束阶段，若你已受伤，你可以恢复一个装备栏。`,
			linghun: `灵昏`,
			linghun_info: `锁定技 你手牌中的【闪】视为【决斗】。`,

			Haya: `花花Haya`,
			Haya_ab: `花花`,
			shengping: `升平`,
			shengping_info: `其他角色弃置你的牌时，你可以与其各摸一张牌。`,
			jiushuang: `酒霜`,
			jiushuang_info: `一名角色的回合开始时，你可以令其弃置你的一张牌，并获得『灵醺』直到其下一次使用【决斗】，若其已有『灵醺』，改为令其横置或重置。`,
			lingxun: `灵醺`,
			lingxun_info: `锁定技 你手牌中的【酒】视为【决斗】。`,

			Shirako: `白桃shirako`,
			Shirako_ab: `白桃`,
			jufu: `咀福`,
			jufu_info: `你可以将【桃】当作【无中生有】或【五谷丰登】使用。`,
			qihun: `祈婚`,
			qihun_info: `出牌阶段结束时，你可以令一名角色展示手牌并将其中所有的红色牌交给你，若其中没有【桃】，你需交给其等量牌（若其势力与你相同，改为令其摸等量牌）。`,


			SukoyaKana: `健屋花那`,
			huawen: `花吻交染`,
			huawen_info: `出牌阶段限一次，你可以选择一名其他女性角色，你与其互相展示手牌，然后交换花色、点数、种类相同的牌各一张，每交换一张便各摸一张牌。然后若交换不足三次，你与其各失去1点体力。`,
			huawen_append: lib.figurer(`特性：难上手 爆发`),
			liaohu: `逃杀疗护`,
			liaohu_info: `一个回合结束时，若你造成了伤害且该回合未发动/发动了『花吻交染』，你可以令你/本轮『花吻交染』选择的其他角色回复1点体力。`,

			ShirayukiTomoe: `白雪巴`,
			gonggan: `奇癖共感`,
			gonggan_info: `其他角色的回合开始时，你可以展示所有手牌然后扣置其中一张，令当前回合角色猜测此牌花色，若猜对，其获得此牌，且本回合你手牌花色、点数均视为与此牌相同；若猜错，你收回此牌，且本回合你手牌点数均视为Q。`,
			gonggan_append: lib.figurer(`特性：难上手`),
			yeyu: `夜域女王`,
			yeyu_info: `其他角色使用【杀】时，你可以弃置一张点数大于此【杀】的牌取消之。其他角色使用通常锦囊牌时，你可以重铸一张梅花牌为之增加或减少一名目标。`,
			yeyu_append: lib.figurer(`特性：干扰`),

			Elu: `Elu`,
			Elu_ab: `艾露`,
			huangran: `煌燃`,
			huangran_info: `你受到火焰伤害时，可以选择一名距离为1的角色与你平均承担，不能平均的额外1点由你分配。<br>每有一名角色因此受伤，你摸一张牌。`,
			yinzhen: `隐真`,
			yinzhen_info: `锁定技 每回合造成的第一次伤害均改为火焰伤害。其他角色与你距离减小的回合结束时，你观看其手牌并获得其中一张。`,
			senhu: `森护`,
			senhu_info: `锁定技 若你的装备区里没有防具牌，你受到的火焰伤害+1。`,

			KenmochiDouya: `剑持刀也`,
			shenglang: `声浪燃烈`,
			shenglang_info: `出牌阶段限一次，你可以将一张【杀】当【决斗】使用。一个回合结束时，若你失去过牌，摸等同于该回合进入弃牌堆的♠【杀】数量的牌`,
			nodao: `无刀之咎`,
			nodao_info: `你没有装备武器时，可以于出牌阶段重铸【杀】，若你以此法获得武器牌，你可以立即装备之并回复1点体力。`,

			AchikitaChinami: `远北千南`,
			yingkuo: `影拓`,
			yingkuo_info: `你装备区或手牌区的牌数增加时，若有其他角色在此区域内的牌数与你相同，你可令其弃置该区域内的一张牌。`,
			shengni: `声拟`,
			shengni_info: `若上一张进入弃牌堆的牌为其他角色的基本牌或通常锦囊牌，你可将你的一张手牌当做该牌使用或打出。若这是在你回合内首次发动『声拟』，改为“你可视为使用或打出该牌”。`,

			HayamiSaki: `早见咲`,
			tuncai: `屯财`,
			tuncai_info: `轮次技 转换技 阳~其他角色摸牌后，你可以摸等量牌；阴~你弃牌后，可以令一名其他角色弃等量牌。`,
			zhidu: `值督`,
			zhidu_info: `主公技 当同势力角色进入濒死状态或受到两点或以上伤害时，你可以重置并转换『屯财』。`,

			KiyoInga: `纪代因果`,
			huanxi: `浣洗`,
			huanxi_info: `出牌阶段开始或结束时，你可以弃置所有手牌，然后摸等量牌。若均弃牌且两次弃牌不包含同名牌，重置『册吕』`,
			celv: `册吕`,
			celv_info: `你体力减少或弃置与体力等量的牌时，可以展示并获得其他角色的一张手牌，然后你不能使用或打出与此牌同名的牌。`,
			celv_append: lib.figurer(`特性：自肃`),

			AngeKatrina: `安洁·卡特琳娜`,
			chuangzuo: `创作延续`,
			chuangzuo_info: `准备阶段，你可令一名角色获得其判定区或装备区的一张牌，然后你摸一张牌。`,

			SuzuharaLulu: `铃原露露`,
			zhongli: `重力牵引`,
			zhongli_info: `锁定技 出牌阶段结束时，你进行判定：若为装备牌，你获得判定牌并继续判定；若你本回合首次因此获得了某张装备牌，你减1点体力上限（至少为1）且执行一个额外的出牌阶段。`,
			xinhuo: `薪火相传`,
			xinhuo_chuanhuo: `传火`,
			xinhuo_info: `出牌阶段，你可以将两张牌置于牌堆顶，令你本回合下一张使用的牌无距离和次数限制且可额外选择一个目标（可叠加）。`,
			weizhuang: `魔界伪装`,
			weizhuang_discard: `魔界伪装`,
			weizhuang_info: `锁定技 你在一回合内多次使用基本牌/锦囊牌后，摸/弃X张牌。（X为此牌指定的目标数）`,
			weizhuang_append: lib.figurer(`特性：自肃`),

			KagamiHayato: `加賀美隼人`,
			liebo: `裂帛核哮`,
			liebo_info: `锁定技 你的黑色牌无法被响应。当你使用一张黑色牌首次造成伤害时，你摸一张牌，令目标弃置你装备区的一张牌。`,
			zhongjizhimeng: `重机织梦`,
			zhongjizhimeng_info: `出牌阶段限一次，你可以弃置一张牌并展示一张手牌，此牌的颜色视为原来的异色，且你失去之时，可以令一名角色回复1点体力或摸两张牌。`,

			AmamiyaKokoro: `天宫心`,
			miaomiao: `流泪喵喵`,
			miaomiao_info: `锁定技 你造成数值为1的伤害时，需将其改为等量体力回复，或令目标摸两张牌；若你本回合已发动『逞能龙息』，你摸一张牌。`,
			chengneng: `逞能龙息`,
			chengneng_info: `每回合限一次，当其他角色受到伤害时，你可以弃一张牌令其来源视为你，若你为其原来源，本次伤害改为等量体力流失。`,
			chengneng_append: lib.figurer(`特性：难上手 combo`),

			SakuraRitsuki: `櫻凜月`,
			zhuqiao: `筑巧`,
			zhuqiao_info: `出牌阶段，若你本回合因此进入弃牌堆的牌点数之和小于24，你可重铸一张牌。回合结束时，你可令一名角色将手牌数补至X张（X为你本回合以此重铸牌的花色数）。`,
			zhuqiao_append: lib.figurer(`特性：易上手`),

			TenkaiTsukasa: `天开司`,
			pojie: `破戒`,
			pojie_info: `回合内，一名角色装备区内的牌数变化时，你可以摸一张牌。弃牌阶段，你需弃置的牌数改为本回合发动此技能的次数。`,
			dazhen: `大振`,
			dazhen_info: `出牌阶段限一次，你可将你武器栏的牌移动至其他角色武器栏（可替换原武器），然后其弃置你手牌数与手牌上限之差的牌，若不足，受到你造成的1点伤害。`,
			dazhen_append: lib.figurer(`特性：爆发 破军`),

			UsakiNono: `宇佐纪诺诺`,
			tuhui: `兔烩`,
			tuhuiA: `兔烩(伤害)`,
			tuhuiB: `兔烩(受伤害)`,
			tuhui_info: `每轮每项限一次。你对其他角色造成伤害或其他角色对你造成伤害后，你可以与其各回复（1）点体力；无法回复体力的角色摸（1）张牌。`,
			fuyou: `复幼`,
			fuyou_info: `限定技 出牌阶段，你可以令所有角色无法回复体力直到回合结束，重置『兔烩』并使之的（）值+1。`,

			Rynia: `莱妮娅Rynia`,
			Rynia_ab: `莱妮娅`,
			yinxu: `吟虚`,
			yinxu_info: `转换技 你可以将一张①锦囊牌②装备牌当作无视距离和次数限制的【杀】使用；以此使用的【杀】被抵消时，你可以令你或目标调整手牌至上限。`,
			yinxu_append: lib.figurer(`特性：易上手 爆发`),

			airuisi: `艾瑞思`,
			maozhi: `茆织`,
			maozhi_info: `出牌阶段，你可以弃置两张不同类型的牌，令一名其他角色根据你弃牌包含的花色执行对应效果：<br>♥～失去1点体力并摸三张牌；♦～视为使用一张【杀】；♠～展示所有手牌并横置；♣～重铸至少三张牌。<br>
			若你的弃牌颜色相同，本回合你不能再发动此技能。`,
			baifei: `拜妃`,
			baifei_info: `主公技 每名角色限一次，你对其造成伤害或受到其造成的伤害后，可以回复1点体力或摸两张牌。`,

			aibai: `艾白`,
			bianyin: `变音`,
			bianyin_info: `每回合限一次，当你使用一张牌时，你可以重铸一张牌，将之改为重铸牌的花色。`,
			shabai: `傻白`,
			shabai_info: `当一张红色牌于回合内离开你的区域时，你可摸一张牌；当一张黑色牌于回合外离开你的区域时，你可移动场上一张牌。`,

			wenjing: `文静`,
			zaiying: `再赢`,
			zaiying_info: `出牌阶段限一次/其他角色于你的回合内获得牌时，你可以与一名角色/其拼点，赢的角色摸牌至上限，没赢的角色回复一点体力。`,
			zhengen: `政恩`,
			zhengen_info: `使命技 每名角色限一次，你对其造成伤害或受到其伤害时，你弃置一张手牌与其场上的一张牌。<br>
			成功～若你以此技能弃置了四张同点数的牌：你调整手牌至上限，重置次技能。<br>
			失败～你体力回复至上限时，若有手牌：你令X名角色横置并摸一张牌，然后你受到X点火焰伤害。（X为你手牌数）`,

			xingtong: `星瞳`,
			jiezou: `节奏`,
			jiezou_info: `锁定技 你攻击范围内每有一名角色，你的手牌上限+1。`,
			xtguyong: `孤勇`,
			xtguyong_info: `准备阶段，你可以翻面并令一名手牌区/装备区/判定区牌数少于你的角色弃置你的对应区域各一张牌，
			然后你对攻击范围内至多X名角色各造成X点伤害（X为此技能弃置的牌数）`,

			wula: `乌拉の帝国`,
			wula_ab: `乌拉`,
			dizuo: `帝座`,
			dizuo_info: `你使用装备牌时，可以令一名与你距离为1的角色选择一项：<br>交给你一张装备牌并摸两张牌；成为你下一张牌的额外目标，若是首次选择此项，其与你交换座次。`,
			hongtie: `洪铁`,
			hongtie_info: `你使用牌指定偶数名角色为目标时，可以对其中一名目标造成一点伤害。`,

			yunyuluan: `云玉鸾`,
			jiujiu: `臼啾`,
			jiujiu_info: `出牌阶段开始时，你可以将一张装备牌置于牌堆顶并跳过此阶段，令一名角色选择一项：<br>交给你一张装备牌并摸两张牌；受到你造成的一点伤害。`,
			qitong: `栖桐`,
			qitong_info: `转换技 结束阶段，若你本回合没有造成伤害，你可以与下家交换①装备区②座次；若你的座次因此变为最后，你调整手牌至上限并进行一个额外的出牌阶段。`,

			yizhiYY: `亦枝YY`,
			bianshi: `辨识`,
			bianshi2: `辨识`,
			ming_bianshi: `辨识`,
			bianshi_info: `体力值不少于你的角色的回合开始时，你可以亮出一张手牌：直到回合结束，每当与此牌类别相同的牌进入弃牌堆时，该角色摸一张牌。以此法获得第二张牌后，该角色失去一点体力并令其因『辨识』的摸牌改为弃牌。`,
			bianshi_append: lib.figurer(`特性：干扰`),

			Pudding: `步玎`,
			tianlve: `甜略`,
			tianlve_info: `出牌阶段开始时，你可以令一名其他角色回复1点体力，然后本阶段内你对其使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标。`,
			tianlve_append: lib.figurer(`特性：卖血 辅助 强化出杀`),
			luxian: `颅祭`,
			luxian_info: `<font color=#fda>限定技</font> 准备阶段，若你已受伤，你可以扣减1点体力上限，并发现一次P-SP角色，你视为拥有其所有技能直到弃牌阶段结束。`,
			luxian_append: lib.figurer(`特性：难上手 爆发`),

			AyanaNana: `绫奈奈奈`,
			erni: `耳匿`,
			erni_info: `转换技 你可以展示一张手牌并置于牌堆顶，视为使用或打出了一张同花色的①【杀】②【闪】③【桃】；当你发动其他技能后，可以转换一次『耳匿』。`,
			erni_append: lib.figurer(`特性：控顶`),
			shouru: `受乳`,
			shouru_info: `每回合限一次，你受到伤害/发动『耳匿』后，可以获得当前回合角色上家或下家的一张牌。`,
			shouru_append: lib.figurer(`特性：combo`),
			chonghuang: `崇皇`,
			chonghuang_info: `<font color=#dac>限定技</font> 当你体力值变为1时，你可以扣减1点体力上限，并发现一次P-SP角色，本轮次内你视为拥有其所有技能。`,
			chonghuang_append: lib.figurer(`特性：难上手`),
			yinzun: `隐尊`,
			yinzun_info: `<font color=#dac>主公技</font> 你的『崇皇』可以在同势力角色体力变为1时发动。`,

			AkiRinco: `秋凛子`,
			jiren: `祭刃`,
			jiren2: `祭刃-重置`,
			jiren_info: `出牌阶段限一次，你可以进行判定，若结果为：红色~你摸一张牌；武器牌~你获得之。你可以失去1点体力以重置此技能。`,
			luqiu: `戮秋`,
			luqiu_info: `转换技 当一张牌进入弃牌堆时，若其花色与你本回合上一次『祭刃』的判定牌相同，你可以①视为使用一张【杀】②摸一张牌③弃一张牌。`,
			luqiu_append: lib.figurer(`特性：难上手 爆发 combo`),
			canxin: `残心`,
			canxin_info: `<font color=#ed9>限定技</font> 出牌阶段结束时，若你已受伤，你可以重铸一张牌。若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作；否则回复1点体力并立即结束回合。`,

			KurenaiAkane: `红晓音`,
			quankai: `拳开`,
			quankai_info: `轮次技 你造成伤害后，可以弃置目标区域内的一张牌；当你使用锦囊牌后，可以从弃牌堆中获得上一次『拳开』的弃牌，或重置此技能。`,
			heyuan: `合缘`,
			heyuan_info: `<font color=#f57>限定技</font> 摸牌阶段，若你已受伤，你可以放弃摸牌，改为发现两次P-SP势力角色，然后视为拥有前者的非限定技和后者的限定技直到你的下个回合开始。`,
			heyuan_append: lib.figurer(`特性：难上手`),

			Lovely: `东爱璃`,
			yangyao: `秧耀`,
			yangyao_info: `出牌阶段，你可以失去一点体力或弃置两张同色的牌，令一名角色从弃牌堆获得一张锦囊牌；每回合每种锦囊牌限一次。`,
			yangyao_append: lib.figurer(`特性：爆发 combo`),
			shili: `拾璃`,
			shili_info: `<font color=#987>限定技</font> 一个回合结束时，若你已受伤，你可以令一名角色摸X张牌并执行一个额外的出牌阶段（X为你本回合使用过的非基本牌数量）。`,

			AkumaYuu: `西魔幽`,
			akjianwu: `剑舞`,
			akjianwu_info: `你使用或打出一张基本牌时，可以与对方拼点，赢的角色选择一项：<br>1.于此牌结算后获得之；2.展示并获得对方的一张牌。<br>以此获得【杀】或单体锦囊牌的角色可以立即使用之。`,
			tongzhao: `同召`,
			tongzhao_info: `<font color=#d87>限定技</font> 你拼点没赢时，若你已受伤，你可以发现一次（若为平局则改为发现两次）P-SP势力角色，视为拥有其所有技能直到你下一次体力减少。`,

			AiTeN: `莲汰`,
			langfei: `狼吠`,
			langfei_info: `每回合限一次，你可以令你使用的通常锦囊牌伤害+1。`,
			xieyun: `协韵`,
			xieyun_info: `限定技 出牌阶段开始时，你可以指定场上一个已发动的限定技，令持有者重置此技能，然后你获得同名技能。`,

			Seki: `星汐Seki`,
			Seki_ab: `星汐`,
			zhuxing: `铸星`,
			zhuxing_info: `出牌阶段限一次，你可以观看牌堆顶的七张牌，并用手牌替换其中任意张。`,
			zhuxing_append: lib.figurer(`特性：控顶`),
			shanzhu: `潸逐`,
			shanzhu_info: `限定技 结束阶段，若你已受伤，你可以获得本回合你使用的所有实体牌。`,

			P_SP: `P-SP`,

			zhu_tag: `常驻主公`,
			guoV_tag: `国V`,
			yingV_tag: `英V`,
		},
	};
});