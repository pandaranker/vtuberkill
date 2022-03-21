import { toSkill } from './skilltype'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	let cardSkill = {
		g_ci: {
			ruleSkill: true,
			mod: {
				cardname: function (card, player) {
					if (card.name == 'ci') return 'sha';
				},
			},
			trigger: { player: 'useCard1' },
			forced: true,
			filter: function (Evt, player) {
				return Evt.card && Evt.card.name == 'sha' && Evt.addCount !== false && Evt.cards &&
					Evt.cards.length == 1 && get.name(Evt.cards[0], null) == 'ci';
			},
			content: function () {
				if (trigger.addCount !== false) {
					trigger.addCount = false;
					if (player.stat[player.stat.length - 1].card.sha > 0) {
						player.stat[player.stat.length - 1].card.sha--;
					}
				}
				player.addTempSkill('g_ci2', { player: 'useCardAfter' });
			},
		},
		g_ci2: {
			cardSkill: true,
			trigger: { source: 'damageBegin4' },
			forced: true,
			logTarget: 'player',
			filter: function (Evt, player) {
				return Evt.player.hujia > 0 && player.hasSkillTag('overHujia', true, {
					name: Evt.card.name,
					target: Evt.player,
					card: Evt.card
				});
			},
			content: function () { },
			ai: {
				unequip: true,
				overHujia: true,
				skillTagFilter: function (player, tag, arg) {
					if (!arg || !arg.card || arg.card.name != 'sha') {
						return false;
					}
					var cards = arg.card.cards
					if (!cards || cards.length != 1 || get.name(cards[0], null) != 'ci') {
						return false;
					}
				},
			}
		},
		g_wudaoqu: {
			cardSkill: true,
			trigger: { global: 'useCard' },
			forced: true,
			popup: false,
			filter: function (Evt, player) {
				if (!Evt.targets.contains(player) || !Evt.cards || !Evt.cards.length) return false;
				if (Evt.getParent().directHit && Evt.getParent().directHit.contains(player)) return false;
				return player.hasUsableCard('wudaoqu');
			},
			content: function () {
				'step 0'
				trigger.wudaoqu = true;
				player.chooseToUse('是否对' + get.translation(trigger.card) + '使用【无刀取】？').set('ai1', function (card) {
					return _status.event.bool;
				}).set('bool', -get.effect(player, trigger.card, trigger.player, player)).set('respondTo', [trigger.player, trigger.card]).set('filterCard', function (card, player) {
					if (get.name(card) != 'wudaoqu') return false;
					return lib.filter.cardEnabled(card, player, 'forceEnable');
				});
				'step 1'
				delete trigger.wudaoqu;
			}
		},
		pm_zhuge_skill: {
			equipSkill: true,
			audio: true,
			firstDo: true,
			trigger: { player: 'useCard1' },
			forced: true,
			filter: function (event, player) {
				return !event.audioed && event.card.name == 'sha' && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase';
			},
			content: function () {
				trigger.audioed = true;
			},
			mod: {
				cardUsable: function (card, player, num) {
					var cardx = player.getEquip('promote_zhuge');
					if (card.name == 'sha' && (!cardx || player.hasSkill('pm_zhuge_skill', null, false) || (!_status.pm_zhuge_temp && !ui.selected.cards.contains(cardx)))) {
						return Infinity;
					}
				},
				cardEnabled2: function (card, player) {
					if (!_status.event.addCount_extra || player.hasSkill('pm_zhuge_skill', null, false)) return;
					if (card && card == player.getEquip('promote_zhuge')) {
						try {
							var cardz = get.card();
						}
						catch (e) {
							return;
						}
						if (!cardz || cardz.name != 'sha') return;
						_status.pm_zhuge_temp = true;
						var bool = lib.filter.cardUsable(get.autoViewAs({ name: 'sha' }, ui.selected.cards.concat([card])), player);
						delete _status.pm_zhuge_temp;
						if (!bool) return false;
					}
				},
			},
		},
		pm_kouqin_skill: new toSkill('active',{
			equipSkill: true,
			usable:1,
			content:function(){
				'step 0'
				player.chooseToPlayBeatmap({
					//歌曲名称
					name:'美しきもの',
					//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式 并将文件名重命名为和上面的歌曲名称相同）
					filename:'music_beauty',
					//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
					timeleap:[0,368,690,1342,2072,2724,4080,4771,5173,5475,6131,6831,8183,8412,9554,10214,10605,10921,11577,12277,13631,15007,15673,16377,17732,18400,19081],
					//开始播放时间的偏移量（毫秒）
					current:-8932,
					//判定栏高度（相对整个对话框高度比例）
					judgebar_height:0.14,
					//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
					range1:[86,110],
					range2:[92,104],
					range3:[96,100],
					//滑条每相对于整个对话框下落1%所需的时间（毫秒）
					speed:20,
				});
				'step 1'
				console.log(result)
				var score=Math.floor(Math.min(3,result.accuracy/35));
				Evt.score=score;
				game.log(player,'的演奏评级为','#y'+result.rank[0],'，获得积分点数','#y'+score,'分');
				player.draw(score)
			},
			ai:{
				order:10,
				result:{
					player:1,
				},
			},
		}),
	}
	return <currentObject>{
		name: 'xingtian',
		connect: true,
		card: {
			ci: {
				fullskin: true,
				enable: true,
				type: 'basic',
				vanish: true,
				global: ['g_ci'],
				materials: ['sha', 'sha'],
				materials_prompt: '【杀】+【杀】',
				derivation: true,
				derivationpack: 'xingtian',
				// autoViewAs:'sha',
				addinfo: '杀'
			},
			peng: {
				fullskin: true,
				enable: true,
				type: 'basic',
				vanish: true,
				filterTarget: function (card, player, target) {
					return true;
				},
				selectTarget: 1,
				modTarget: true,
				materials: ['sha', 'shan'],
				materials_prompt: '【杀】+【闪】',
				derivation: true,
				derivationpack: 'xingtian',
				content: function () {
					'step 0'
					target.loseHp();
					'step 1'
					target.draw(2);
				},
				ai: {
					order: 7,
					value: [2, 4, 6, 2],
					useful: [3, 2, 2, 1],
					result: {
						target: function (player, target) {
							if (target.hasSkill('zhangdeng') || target.hp == Infinity) return 3;
							if (target.hp == 1) return -2;
							return target.hp - 2;
						},
					},
					tag: {
						loseHp: 1,
						draw: 2,
					}
				}
			},
			gao: {
				fullskin: true,
				type: 'basic',
				vanish: true,
				enable: function (card, player) {
					return false;
				},
				savable: function (card, player, dying) {
					return dying != player;
				},
				selectTarget: -1,
				modTarget: function (card, player, target) {
					return target.hp < target.maxHp;
				},
				materials: ['tao', 'jiu'],
				materials_prompt: '【桃】+【酒】',
				derivation: true,
				derivationpack: 'xingtian',
				content: function () {
					target.recover(3);
				},
				ai: {
					basic: {
						useful: function (card, i) {
							if (game.hasPlayer(function (cur) {
								return cur.hp <= 1;
							})) {
								if (i == 0) return 8;
								return 6;
							}
							return 0.5;
						},
						value: function (card, player, i) {
							if (game.hasPlayer(function (cur) {
								return get.recoverEffect(cur, player, player) > 1;
							})) {
								if (player.hp <= 2) {
									if (i == 0) return 7.3;
									return 3;
								}
								else {
									if (i == 0) return 10;
									return 6;
								}
							}
							return 1;
						},
					},
					result: {
						target: 6,
					},
					tag: {
						recover: 3,
						save: 1,
					}
				}
			},
			wudaoqu: {
				fullskin: true,
				type: 'trick',
				vanish: true,
				global: ['g_wudaoqu'],
				notarget: true,
				materials: ['shan', 'wuxie'],
				materials_prompt: '【闪】+【无懈可击】',
				derivation: true,
				derivationpack: 'xingtian',
				content: function () {
					var evt = Evt.getParent(3)._trigger;
					if (evt.wudaoqu) {
						evt.cancel();
						Evt.cards = evt.cards;
						let next = game.createEvent('wudaoqu_gain');
						next.player = player;
						next.setContent(function () {
							var cards = Evt.getParent().cards.filterInD();
							if (cards.length) player.gain(cards, 'gain2', 'log');
						});
					}
				},
				ai: {
					basic: {
						useful: [6, 4],
						value: [7, 4],
					},
					result: { player: 1 },
				},
			},
			daluandou: {
				fullskin: true,
				enable: true,
				type: 'trick',
				vanish: true,
				// wuxieable:true,
				materials: [{ color: 'red' }, { color: 'black' }],
				materials_prompt: '红色牌+黑色牌',
				derivation: true,
				derivationpack: 'xingtian',
				filterTarget: function (card, player, target) {
					return player.canCompare(target);
				},
				content: function () {
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if (result.winner == player) {
						player.gainPlayerCard(target, [1, 3], 'hej', true).set('filterButton', function (button) {
							for (var i = 0; i < ui.selected.buttons.length; i++) {
								if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						});

					} else if (result.winner == target) {
						target.gainPlayerCard(player, [1, 3], 'hej', true).set('filterButton', function (button) {
							for (var i = 0; i < ui.selected.buttons.length; i++) {
								if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						});
					}
				},
				ai: {
					basic: {
						useful: [5, 4, 2],
						value: [7, 3, 1],
					},
					result: { player: 1, target: -1 },
				},
			},

			promote_zhuge: {
				materials: [(card)=>get.subtype(card)==='equip1'&&!get.info(card).distance?.attackFrom, { number: 14 }],
				materials_prompt: '攻击范围为1的武器牌+★牌',
				derivation: true,
				derivationpack: 'xingtian',
				distance: {
					attackFrom: -2,
				},
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				ai: {
					equipValue: function (card, player) {
						if (!game.hasPlayer(function (current) {
							return player.canUse('sha', current) && get.effect(current, { name: 'sha' }, player, player) > 0;
						})) {
							return 1;
						}
						if (player.hasSha() && _status.currentPhase == player) {
							if (player.getEquip('zhuge') || player.getCardUsable('sha') == 0) {
								return 10;
							}
						}
						var num = player.countCards('h', 'sha');
						if (num > 1) return 6 + num;
						return 3 + num;
					},
					basic: {
						equipValue: 5,
					},
					tag: {
						valueswap: 1,
					},
				},
				skills: ["pm_zhuge_skill"],
			},
			promote_kouqin: {
				materials: ['shan', { type: ['trick','delay'] },{type:'equip'}],
				materials_prompt: '【闪】+锦囊牌+装备牌',
				derivation: true,
				derivationpack: 'xingtian',
				distance: {
					attackFrom: +1,
				},
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				ai: {
					equipValue: function (card, player) {
						if (!game.hasPlayer(function (current) {
							return player.canUse('sha', current) && get.effect(current, { name: 'sha' }, player, player) > 0;
						})) {
							return 6;
						}
						var num = player.countCards('h', 'sha');
						if (num > 1) return 3 - num;
						return 6 - num;
					},
					basic: {
						equipValue: 5,
					},
					tag: {
						valueswap: 1,
					},
				},
				skills: ["pm_kouqin_skill"],
			},
		},
		character: {
			/**☆星宫汐 */
			star_HosimiyaSio: ['female', 'qun', 3, ['xuanyu', 'xingheng'],],
		},
		characterSort: {
			xingtian: {
			},
		},
		characterIntro: {
		},
		skill: {
			...cardSkill,
			xuanyu: new toSkill('trigger', {
				init(player, skill) {
					return player.$[skill] = []
				},
				filter(Evt, player) {
					if (Evt.getParent().target && Evt.getParent().player === player) {
						let map = Evt.getl(Evt.getParent().target)
						if (map?.hs?.length === 0 && (map.js.length || map.es.length)) return Evt.cards.length === 1
					}
					return (Evt.animate == 'gain2' || Evt.animate == 'give' || Evt.visible == true) && Evt.cards.length === 1
				},
				content: [() => {
					Evt.card = trigger.cards[0]
					player.showCards(Evt.card, '『宣裕』记录牌')
					if (player.$.xuanyu.length) {
						Evt.num = get.number(Evt.card) + get.number(player.$.xuanyu[0])
					}
					else Evt.finish()
					player.$.xuanyu.unshift(Evt.card)
					if (!player.marks.xuanyu.number) player.unmarkSkill('xuanyu')
					player.markSkill('xuanyu', null, player.$.xuanyu[0])
				}, () => {
					if (Evt.num % 4 === 0) {
						player.recover()
					}
				}, () => {
					if (Evt.num % 7 === 0) {
						player.draw(2)
					}
				}],
				intro: {
					name: '宣裕',
					content: 'cards',
				},
			}, 'mark:card').setT('gainEnd'),
			xingheng: new toSkill('trigger', {
				usable: 1,
				filter(Evt, player) {
					if (['phaseJudge', 'phaseDiscard'].includes(Evt.name)) return player.getStorage('xuanyu').length % 2 === 1
					else return player.getStorage('xuanyu').length % 2 === 0 && Evt.targets.length === 1
				},
				content: [() => {
					console.log('A')
					if (['phaseJudge', 'phaseDiscard'].includes(trigger.name)) {
						trigger.cancel()
					}
					else {
						Evt.target = trigger.player
						player.gainPlayerCard(Evt.target, 'hej', true)
						Evt.finish()
					}
				}, () => {
					player.phaseUse();
				}, () => {
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
				ai: {
					combo: 'xuanyu'
				},
			}, 'logTarget:player').setT({ player: ['phaseJudge', 'phaseDiscard'], target: 'useCardTo' }, 'Before'),
		},
		characterReplace: {
		},
		// dynamicTranslate:{
		// 	tulong:function(player){
		// 		if(player.$.qiming_saycards&&player.$.qiming_saycards.length) return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作<font color=#fcd>【'+get.translation(player.$.qiming_saycards)+'】</font>使用。';
		// 		return '你进入濒死状态时，可以扣减1点体力上限，将一张手牌当作本轮『启明星辰』中声明的牌使用。';
		// 	},
		// },
		translate: {
			ci: '刺',
			g_ci: '刺',
			g_ci2: '刺',
			ci_info: '在规则上视为【杀】。此牌无视目标的防具与护甲，且不计入次数。',

			peng: '烹',
			peng_info: '出牌阶段，对一名角色使用，目标失去一点体力并摸两张牌。',

			gao: '膏',
			gao_info: '其他角色的濒死阶段，对其使用，目标回复3点体力。',

			wudaoqu: '无刀取',
			wudaoqu_info: '成为实体牌的目标时使用，取消并获得此牌。',

			ruiping: '锐评',
			ruiping_info: '出牌阶段，你可以与一名角色拼点，赢的角色获得双方拼点牌并受到一点火焰伤害。',

			daluandou: '大乱斗',
			daluandou_info: '出牌阶段，你可以与一名角色拼点，赢的角色获得对方每个区域各一张牌。',


			promote_zhuge: "键盘AK",
			promote_zhuge_info: "锁定技 你于出牌阶段内使用【杀】无次数限制。",
			pm_zhuge_skill: '连射',
			pm_zhuge_skill_info: '锁定技 你于出牌阶段内使用【杀】无次数限制。',

			promote_kouqin: "半音口琴",
			promote_kouqin_info: "出牌阶段限一次，你可以演奏一次《美丽之物》，根据得分摸0~3张牌。",
			pm_kouqin_skill: '琴奏',
			pm_kouqin_skill_info: '出牌阶段限一次，你可以演奏一次《美丽之物》，根据得分摸0~3张牌。',

			star_HosimiyaSio: `☆星宫汐`,
			xuanyu: `宣裕`,
			xuanyu_info: `有且仅有一张牌正面朝上加入你的手牌时，你可以记录之，若其与此技能上一张记录牌的点数和为：<br>
			4倍数～你回复一点体力；7倍数～你摸两张牌。`,
			xingheng: `星恒`,
			xingheng_info: `每回合限一次，若你『宣裕』记录过的牌数为：<br>
			奇数～你可以将判定或弃牌阶段改为出牌阶段；偶数～一名角色使用牌指定你为唯一目标时，你可以获得其区域内一张牌。`,
		},
	}
});