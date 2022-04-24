/// <reference path = "../built-in.d.ts" />

import { toSkill } from "./skilltype";


window.game.import('character', function (lib: Record<string, any>, game: Record<string, any>, ui: Record<string, any>, get: Record<string, any>, ai: Record<string, any>, _status) {
	return <currentObject>{
		name: 'Beginner',
		connect: true,
		character: {
			/**绊爱 */
			re_KizunaAI: ['female', 'upd8', 4, ['re_ailian'], ['zhu']],
			/**辉夜月 */
			re_KaguyaLuna: ['female', 'qun', 4, ['re_jiajiupaidui']],
			/**未来明 */
			re_MiraiAkari: ['female', 'qun', 4, ['duanli', 'qingmi']],
			/**猫宫 */
			re_NekomiyaHinata: ['female', 'qun', 4, ['yingdan', 'tianzhuo']],
			/**狗妈 */
			re_KaguraNana: ['female', 'painter', 4, ['re_DDzhanshou']],
			/**小白 */
			re_Siro: ['female', 'dotlive', 3, ['lingsi']],
			/**狐叔 */
			re_Nekomasu: ['female', 'qun', 3, ['milijianying', 're_dianyin']],
			/**Noracat */
			re_Noracat: ['female', 'upd8', 5, ['kouhu', 'zhiqiu']],
			/**下地 */
			re_XiaDi: ['male', 'qun', 4, ['re_yinliu', 'dunzou'], ['guoV']],

			/**物述有栖 */
			re_MononobeAlice: ['female', 'nijisanji', 3, ['tinenghuifu1', 're_dianmingguzhen']],
			/**静凛 */
			re_ShizukaRin: ['female', 'nijisanji', 4, ['re_mozhaotuji']],
			/**月之美兔 */
			re_MitoTsukino: ['female', 'nijisanji', 3, ['re_bingdielei'], ['zhu']],
			/**宇志海莓 */
			re_UshimiIchigo: ['female', 'nijisanji', 3, ['re_kuangren', 're_jitui']],
			/**樋口枫 */
			re_HiguchiKaede: ['female', 'nijisanji', 4, ['re_zhenyin']],
			/**铃鹿诗子 */
			//re_SuzukaUtako: ['female', 'nijisanji', 3, ['re_meici', 're_danlian']],
			/**铃原露露 */
			re_SuzuharaLulu: ['female', 'nijisanji', 5, ['tunshi']],
			/**本间向日葵 */
			re_HonmaHimawari: ['female', 'nijisanji', 4, ['mark_tianqing', 'kuiquan']],
			/**相羽初叶 */
			re_AibaUiha: ['female', 'nijisanji', 4, ['kangding', 'longshe']],
			/**健屋花那 */
			re_SukoyaKana: ['female', 'nijisanji', 3, ['re_huawen', 're_liaohu']],
			/**白雪巴 */
			re_ShirayukiTomoe: ['female', 'nijisanji', 4, ['re_gonggan', 'yejing']],

			/**时乃空 */
			re_TokinoSora: ['female', 'holo', 4, ['re_taiyangzhiyin'], ['zhu']],
			/**AZKi */
			re_AZKi: ['female', 'holo', 4, ['WHiTE', 'BLacK']],
			/**萝卜子 */
			re_RobokoSan: ['female', 'holo', 3, ['re_zhanxie', 're_chongdian']],
			/**白上吹雪 */
			re_ShirakamiFubuki: ['female', 'holo', 3, ['re_yuanlv', 're_jinyuan'], ['zhu']],
			/**星街慧星 */
			re_HoshimatiSuisei: ['female', 'holo', 4, ['cansha']],
			/**aki */
			re_AkiRosenthal: ['female', 'holo', 3, ['meiwu', 're_huichu']],
			/**梅露 */
			re_YozoraMel: ['female', 'holo', 3, ['fuyi', 'xihun']],
			/**樱巫女 */
			re_SakuraMiko: ['female', 'holo', 3, ['huangyou', 'qidao']],
			/**夏色祭 */
			re_NatsuiroMatsuri: ['female', 'holo', 3, ['re_huxi']],
			/**紫咲诗音 */
			re_MurasakiShion: ['female', 'holo', 3, ['anshu', 'xingchi']],
			/**赤井心 */
			re_AkaiHaato: ['female', 'holo', 3, ['xinchixin']],
			/**兔田佩克拉 */
			re_UsadaPekora: ['female', 'holo', 4, ['qiangyun', 'tuquan']],
			/**润羽露西娅 */
			re_UruhaRushia: ['female', 'holo', 3, ['juebi', 'zhanhou']],
			/**大神澪 */
			re_ŌokamiMio: ['female', 'holo', 4, ['re_yuzhan', 're_bizuo']],
			/**百鬼绫目 */
			re_NakiriAyame: ['female', 'holo', 4, ['guiren']],
			/**大空昴 */
			re_ŌzoraSubaru: ['female', 'holo', 4, ['cejing']],
			/**桃子 */
			re_SpadeEcho: ['female', 'holo', 3, ['qinglve', 'yingshi'], ['guoV']],
			/**角卷绵芽 */
			//re_TsunomakiWatame:['female','holo',4,['disui','dengyan']],

			/**小希小桃 */
			re_XiaoxiXiaotao: ['female', 'xuyan', 3, ['re_doupeng', 're_xuyan'], ['guoV']],
			/**犬山 */
			re_InuyamaTamaki: ['male', 'painter', 3, ['rongyuchengyuan', 're_hundunliandong']],
			/**咩宝 */
			re_KaguraMea: ['female', 'paryi', 3, ['fengna', 're_xiaoyan']],
			/**OTO */
			re_OtomeOto: ['female', 'paryi', 3, ['re_yuxia', 'hanyin'], ['zhu']],
			/**团长 */
			re_HisekiErio: ['female', 'paryi', 4, ['re_huange']],
			/**花园猫 */
			re_HanazonoSerena: ['female', 'paryi', 3, ['re_jiumao', 're_enfan']],

			/**美波 */
			re_MinamiNami: ['female', 'singer', 4, ['re_longdan']],
			/**鹿乃 */
			re_Kano: ['female', 'singer', 4, ['shiguang']],
			/**花丸 */
			re_HanamaruHareru: ['female', 'singer', 3, ['rangran', 'jiazhao']],
			/**Re修女克蕾雅 */
			re_SisterClearie: ['female', 'nijisanji', 4, ['shenyou', 'shenfa']],
			/**Re莉泽 */
			re_LizeHelesta: ['female', 'nijisanji', 3, ['yubing']],
			/**Re安洁 */
			re_AngeKatrina: ['female', 'nijisanji', 3, ['akxiaoqiao', 'liancheng']],
			/**ReYuNi */
			re_YuNi: ['female', 'upd8', 4, ['re_shengcai']],
			/**Re兔鞠 */
			re_TomariMari: ['male', 'upd8', 3, ['liansheng', 'ruantang']],
			/**Omesis */
			re_Omesis: ['female', 'upd8', 4, ['yaozhan', 'chongxin']],
			/**虹河 */
			re_NijikawaRaki: ['female', 'upd8', 4, ['yayun', 'jidao']],
			/**Fairys */
			re_Fairys: ['male', 'upd8', 4, ['ywshuangxing', 'yinni']],
			/**天开司 */
			re_TenkaiTsukasa: ['male', 'qun', 4, ['re_pojie', 're_dazhen']],
			/**道明寺晴翔 */
			re_DoumyoujiHaruto: ['male', 'qun', 3, ['shengfu', 'wanbi']],
			/**时雨羽衣 */
			re_ShigureUi: ['female', 'painter', 3, ['uijieyuan', 'huixiang']],
			/**白神遥 */
			re_ShirakamiHaruka: ['female', 'psp', 3, ['zhenbao', 'heimo'], ['guoV']],
		},
		characterSort: {
			Beginner: {
				hololive: [
					're_TokinoSora', 're_AZKi', 're_RobokoSan', 're_ShirakamiFubuki', 're_HoshimatiSuisei', 're_AkiRosenthal', 're_YozoraMel', 're_MurasakiShion',
					're_SakuraMiko', 're_NatsuiroMatsuri', 're_UsadaPekora', 're_AkaiHaato', 're_UruhaRushia', 're_ŌokamiMio', 're_NakiriAyame', 're_ŌzoraSubaru', 're_YukihanaLamy',
					're_SpadeEcho'
				],
			}
		},
		characterReplace: {
			SisterClearie: ['re_SisterClearie', 'SisterClearie'],
			ShirayukiTomoe: ['re_ShirayukiTomoe', 'ShirayukiTomoe'],
			SukoyaKana: ['re_SukoyaKana', 'SukoyaKana'],
		},
		characterIntro: {
			re_SisterClearie: '神のご加護があらんことを<br>--《DOMAG》',
		},
		skill: {
			//re老爱
			re_ailian: {
				audio: 'ailian',
				enable: 'phaseUse',
				selectCard: [1, Infinity],
				position: 'h',
				usable: 1,
				filterCard: true,
				filterTarget(Evt, player, target) {
					return target != player;
				},
				check(card: { name: string; }) {
					if (ui.selected.cards.length > 1) return 0;
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
					if (!ui.selected.cards.length && card.name == 'du') return 20;
					var player = get.owner(card);
					if (player.hp == player.maxHp || player.$.re_ailian_clear > 1 || player.countCards('h') <= 1) {
						if (ui.selected.cards.length) {
							return -1;
						}
						var players = game.filterPlayer();
						for (let i of players) {//[bug] player is not iterable.[fix] Use 'players' instead of 'player'.
							if (!i.isTurnedOver() &&
								!i.hasJudge('lebu') &&
								get.attitude(player, i) >= 3 &&
								get.attitude(i, player) >= 3) {
								return 11 - get.value(card);
							}
						}
						if (player.countCards('h') > player.hp) return 10 - get.value(card);
						if (player.countCards('h') > 2) return 6 - get.value(card);
						return -1;
					}
					return 10 - get.value(card);
				},
				discard: false,
				filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
					return player.countCards('h') > 0;
				},
				content: [() => {
					Evt.num = player.$.re_ailian_clear;
					targets[0].gain(cards, player, 'giveAuto');
				}, () => {
					player.$.re_ailian_clear += cards.length;
					if (player.$.re_ailian_clear >= 2 && Evt.num < 2) {
						let list = [];
						for (let i of get.inpile('basic')) {
							if (lib.filter.cardUsable({ name: i }, player) && player.hasUseTarget(i)) {
								list.push(['基本', '', i]);
								if (i == 'sha') {
									list.push(['基本', '', 'sha', 'fire']);
									list.push(['基本', '', 'sha', 'thunder']);
									list.push(['基本', '', 'sha', 'ice']);
								}
							}
						}
						if (list.length) {
							player.chooseButton(['是否视为使用一张基本牌？', [list, 'vcard']]).set('ai', function (button: { link: any[]; }) {
								var player = _status.event.player;
								var card = { name: button.link[2], nature: button.link[3] };
								switch (card.name) {
									case 'tao':
										if (player.hp == 1 || (player.hp == 2 && !player.hasShan()) || player.needsToDiscard()) {
											return 5;
										}
										return 1 + Math.random();
									case 'sha':
										if (game.hasPlayer((cur: any) => {
											return player.canUse(card, cur) && get.effect(cur, card, player, player) > 0
										})) {
											if (card.nature == 'fire') return 2.95;
											if (card.nature == 'thunder' || card.nature == 'ice') return 2.92;
											return 2.9;
										}
										return 0;
									case 'jiu':
										if (player.getCardUsable('sha') == 0 || !player.hasSha() || !player.hasUseTarget('sha')) return 0;
										return 0.8 + Math.random();
									case 'qi':
										if (player.isDamaged()) return 1.1 + Math.random();
										return 0.1;
									default: return 0;
								}
							});
						}
						else {
							Evt.finish();
						}
					}
					else Evt.finish();
				}, () => {
					if (result?.bool && result.links?.length) {
						let card = { name: result.links[0][2], nature: result.links[0][3] };
						player.chooseUseTarget(card, true);
					}
				}],
				ai: {
					order(skill: any, player) {
						if (player.hp < player.maxHp && player.$.re_ailian_clear < 2 && player.countCards('h') > 1) {
							return 10;
						}
						return 1;
					},
					result: {
						target(player: { countCards: (arg0: string) => number; hp: number; maxHp: any; $: { re_ailian_clear: number; }; }, target: { hasSkillTag: (arg0: string) => any; hasJudge: (arg0: string) => any; countCards: (arg0: string) => any; hasSkill: (arg0: string) => any; }) {
							if (target.hasSkillTag('nogain')) return 0;
							if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
								if (target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if (target.hasJudge('lebu')) return 0;
							var nh = target.countCards('h');
							var np = player.countCards('h');
							if (player.hp == player.maxHp || player.$.re_ailian_clear < 0 || player.countCards('h') <= 1) {
								if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1, 5 - nh);
						}
					},
					effect: {
						target(card: any, player: { countCards: (arg0: string, arg1: { subtype: any; }) => any; }, target: any) {
							if (player == target && get.type(card) == 'equip') {
								if (player.countCards('e', { subtype: get.subtype(card) })) {
									var players = game.filterPlayer();
									for (let i of players) {
										if (i != player && get.attitude(player, i) > 0) {
											return 0;
										}
									}
								}
							}
						}
					},
					threaten: 0.8,
				},
				group: ['re_ailian_clear', 're_ailian_damage'],
				subSkill: {
					clear: {
						init(player: { $: { [x: string]: number; }; }, skill: string | number) {
							if (!player.$[skill]) player.$[skill] = 0;
						},
						trigger: { global: 'phaseNext' },
						direct: true,
						locked: true,
						silent: true,
						firstDo: true,
						content() {
							player.$.re_ailian_clear = 0;
						}
					},
					damage: {
						trigger: { player: 'damageEnd' },
						filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
							return player.countCards('h') > 0;
						},
						direct: true,
						content: [() => {
							player.chooseCardTarget({
								prompt: get.prompt2('re_ailian'),
								selectCard: [1, Infinity],
								position: 'h',
								filterCard: true,
								filterTarget(Evt, player, target) {
									return target != player;
								},
								ai2(target: { hasSkillTag: (arg0: string) => any; hasJudge: (arg0: string) => any; }) {
									var att = get.attitude(_status.event.player, target);
									if (target.hasSkillTag('nogain')) att /= 10;
									if (target.hasJudge('lebu')) att /= 5;
									return att;
								},
								ai1(card: any) {
									if (ui.selected.cards && ui.selected.cards.length > 2) return 0
									var player = _status.event.player;
									if (player.getStorage('re_ailian_clear') > 2) return 0;
									return 8 - get.value(card);
								},
							}).set('logSkill', 're_ailian');
						}, () => {
							if (result.bool && result.targets?.length) {
								player.useSkill('re_ailian', result.cards, result.targets);
							}
						}]
					}
				},
			},
			//re老月
			re_jiajiupaidui: {
				audio: 'jiajiupaidui',
				enable: 'chooseToUse',
				usable: 1,
				filter(Evt, player) {
					return Evt.filterCard({ name: 'jiu', isCard: true }, player, Evt);
				},
				filterTarget(card, player, target) {
					return target.countCards('he');
				},
				content: [() => {
					var att = get.sgnAttitude(target, player)
					target.chooseToDiscard('he', '弃置一张牌(若其中有♠或点数9，则视为' + get.translation(player) + '使用了一张酒)', true).set('ai', (card: any) => {
						if (att > 1) return (get.suit(card) == 'spade' || get.number(card) == 9);
					}).set('att', att);
				}, () => {
					if (result.bool && result.cards) {
						Evt.discardCards = result.cards.slice(0);
					}
					else Evt.finish()
				}, () => {
					Evt.discardCards.forEach((discard: any) => {
						if (get.suit(discard) == 'spade' || get.number(discard) == 9)
							Evt.isJiu = true;
					});
					if (Evt.isJiu) {
						if (_status.event.getParent(2).type == 'dying') {
							Evt.dying = player;
							Evt.type = 'dying';
						}
						player.useCard({ name: 'jiu', isCard: true }, player);
					}
					else {
						Evt.finish();
					}
				}, () => {
					player.getStat().card.jiu--;
				}],
				ai: { order: 10, result: { target: -1 } },
			},
			//re小明
			duanli: {
				audio: 'shiyilijia',
				group: ['duanli_draw'],
				enable: 'phaseUse',
				usable: 1,
				init(player: { $: { duanli: number | undefined; }; }) {
					if (player.$.duanli == undefined) {
						player.$.duanli = 0;
					}
				},
				filter(Evt: any, player: { countCards: (arg0: string) => any; }) {
					return player.countCards('h');
				},
				content: [() => {
					player.$.duanli = player.countCards('h');
				}, () => {
					var cards = player.getCards('h');
					player.discard(cards);
				}],
				ai: { order: 4, result: { player: 1 } },
				mod: {
					aiOrder(player: { maxHp: number; hp: number; }, card: any, num: number) {
						if (typeof card == 'object' && player == _status.currentPhase && get.name(card) == 'tao') {
							var damage = (player.maxHp - player.hp) * 2;
							return num + damage;
						}
					},
				},
				subSkill: {
					draw: {
						forced: true,
						trigger: {
							player: 'phaseEnd'
						},
						filter(Evt: any, player: { $: { duanli: any; }; }) {
							return player.$.duanli;
						},
						content: [() => {
							player.draw(player.$.duanli);
						}, () => {
							player.$.duanli = 0;
						}]
					}
				}
			},
			qingmi: {
				audio: 'seqinghuashen',
				trigger: { global: 'useCardAfter' },
				direct: true,
				filter(Evt, player) {
					return Evt.card.name == 'tao'
						&& Evt.player != player;
				},
				content: [() => {
					trigger.player.chooseBool('是否让' + get.translation(player) + '摸一张牌').set('choice', get.attitude(trigger.player, player) > 0);
				}, () => {
					if (result.bool) {
						player.logSkill('qingmi');
						player.draw(trigger.player);
					}
				}]
			},
			//re猫宫
			yingdan: {
				hiddenCard(player: { countCards: (arg0: string, arg1: { name: string; }) => any; }, name: any) {
					if (['wuxie', 'shan'].contains(name) && player.countCards('h', { name: 'sha' })) return true;
				},
				mod: {
					aiValue(player: { countCards: (arg0: string, arg1: { name: string; }) => number; }, card: { name: string; }, num: number) {
						if (player.countCards('hs', { name: 'sha' }) >= 2) {
							if (card.name == 'shan' || card.name == 'tao' || card.name == 'wuxie') return num / 5;
							if (card.name == 'sha') return num + 3;
						}
					},
					aiUseful(player: any, card: any, num: any) {
						return lib.skill.yingdan.mod.aiValue.apply(this, arguments);
					},
				},
				trigger: { player: ['useCardBefore', 'shaBefore', 'shanBefore', 'wuxieBefore', 'damageBefore'] },
				direct: true,
				firstDo: true,
				filter(Evt, player: any) {
					var evt = Evt;
					if (Evt.name == 'damage') evt = Evt.getParent();
					if (!evt || !evt.card || evt.skill) return false;
					var name = get.name(evt.card);
					var tri;
					if (name == 'sha') tri = evt.getParent('chooseUseTarget');
					else tri = evt.getParent('pre_yingdan_' + name);
					// console.log(evt,tri)
					return tri && tri.addedSkill && tri.addedSkill.contains('number') && evt.skill == 'yingdan_' + name;
				},
				content() {
					trigger.untrigger(true);
				},
				group: ['yingdan_shan', 'yingdan_wuxie', 'yingdan_sha'],//,'yingdan_directHit'
				subSkill: {
					// directHit:{
					// 	trigger:{
					// 		player:"useCard",
					// 	},
					// 	filter(Evt,player){
					// 		var evt = Evt;
					// 		//if(!evt||!evt.card||evt.skill)		return false;
					// 		var name = get.name(evt.card);
					// 		var tri = false;
					// 		if(name=='sha')	tri = evt.getParent('chooseUseTarget');
					// 		else			tri = evt.getParent('pre_yingdan_'+name);
					// 		console.log(evt,tri)
					// 		return tri&&tri.addedSkill&&tri.addedSkill.contains('inRange')&&evt.skill == 'yingdan_'+name;
					// 	},
					// 	direct:true,
					// 	firstDo:true,
					// 	content(){
					// 		trigger.directHit.addArray(game.players);
					// 	},
					// },
					sha: {
						trigger: {
							player: 'useCardBegin',
						},
						filter(Evt: { skill: any; cards: any[]; }, player: any) {
							return ['yingdan_shan', 'yingdan_wuxie'].contains(Evt.skill) && get.name(Evt.cards[0], player);
						},
						direct: true,
						firstDo: true,
						content: [() => {
							player.chooseUseTarget(trigger.cards[0], true, false, trigger.cards);
						}, () => {
							if (result.bool) {
								trigger.card.cards = [];
								trigger.cards = [];
							}
							else {
								trigger.cancel();
							}
						}],
					},
					shan: {
						audio: 'songzang',
						//技能发动时机
						enable: ['chooseToUse'],
						prompt: '使用一张【杀】，视为使用了一张【闪】',
						//动态的viewAs
						viewAs: { name: 'shan' },
						//AI选牌思路
						check(card: any) {
							let number = get.number(card), player = _status.event.player, range = player.getAttackRange();
							let useful = 0
							if (number <= range) useful += 2;
							return useful + get.order(card);
						},
						complexCard: true,
						filterCard(card: any, player: any, Evt: any) {
							return get.name(card, player) == 'sha';
						},
						viewAsFilter(player: { hasUseTarget: (arg0: { name: string; isCard: boolean; }) => any; countCards: (arg0: string, arg1: { name: string; }) => any; }) {
							if (!player.hasUseTarget({ name: 'sha', isCard: true }) || !player.countCards('hs', { name: 'sha' })) return false;
						},
						ai: {
							respondShan: true,
						}
					},
					wuxie: {
						audio: 'songzang',
						//技能发动时机
						enable: ['chooseToUse'],
						prompt: '使用一张【杀】，视为使用了一张【无懈可击】',
						//动态的viewAs
						viewAs: { name: 'wuxie' },
						//AI选牌思路
						check(card: any) {
							var number = get.number(card);
							var player = _status.event.player;
							var range = player.getAttackRange();
							var useful = 0
							if (number <= range) useful += 2;
							return useful + get.order(card);
						},
						complexCard: true,
						filterCard(card: any, player: any, Evt: any) {
							return get.name(card, player) == 'sha';
						},
						viewAsFilter(player: { hasUseTarget: (arg0: { name: string; isCard: boolean; }) => any; countCards: (arg0: string, arg1: { name: string; }) => any; }) {
							if (!player.hasUseTarget({ name: 'sha', isCard: true }) || !player.countCards('hs', { name: 'sha' })) return false;
						},
					}
				},
				ai: {
					noautowuxie: true,
				}
			},
			tianzhuo: {
				audio: 2,
				trigger: { global: 'die' },
				filter(Evt: { player: { countCards: (arg0: string) => number; }; }) {
					return Evt.player.countCards('e') > 0;
				},
				logTarget: 'player',
				content: [() => {
					Evt.togain = trigger.player.getCards('e');
					player.gain(Evt.togain, trigger.player, 'giveAuto');
				}, () => {
					if (trigger.source == player) {
						player.draw(3);
					}
				}],
				ai: {
					threaten: 1.5,
				}
			},
			//re小白
			lingsi: {
				enable: 'phaseUse',
				usable: 1,
				content() {
					player.draw(2);
					player.chooseToDiscard(2, 'he', true).set('ai', (card: any) => {
						if (get.type(card) == 'basic' && player.countCards('h', { type: 'basic' }) && player.hasUseTarget('sha')) {
							return 12 - get.value(card) + Math.random();
						} else if (get.type(card) != 'basic' && (player.countCards('he') - player.countCards('h', { type: 'basic' }) >= 2) && player.hp < player.maxHp) {
							return 6 + Math.random();
						}
						return 6 - get.value(card);
					});
				},
				ai: {
					useSha: 1,
					order: 9,
					result: {
						player: 1,
					},
				},
				group: 'lingsi_discard',
				subSkill: {
					discard: {
						trigger: { player: 'discardAfter' },
						filter(Evt: { cards: any[]; }, player: any) {
							if (!Evt.cards || Evt.cards.length < 2) return false;
							var num1 = 0, num2 = 0;
							Evt.cards.forEach((card: any) => {
								if (get.type(card) == 'basic') {
									num1++;
								} else {
									num2++;
								}
							});
							return Math.max(num1, num2) >= 2;
						},
						prompt2(Evt: { cards: any[]; }, player: any) {
							var num1 = 0, num2 = 0;
							Evt.cards.forEach((card: any) => {
								if (get.type(card) == 'basic') {
									num1++;
								} else {
									num2++;
								}
							});
							var prompt2 = '可以';
							if (num1 >= 2) {
								prompt2 += '视为使用一张杀';
								if (num2 >= 2) {
									prompt2 += ',且令一名角色回复一点体力';
								}
							} else if (num2 >= 2) {
								prompt2 += '令一名角色回复一点体力'
							}
							return prompt2;
						},
						priority: 22,
						content: [() => {
							var num1 = 0, num2 = 0;
							trigger.cards.forEach((card: any) => {
								if (get.type(card) == 'basic') {
									num1++;
								} else {
									num2++;
								}
							});
							if (num1 >= 2) {
								player.chooseUseTarget({ name: 'sha' }, '可以视为打出一张杀', false).set('ai', function (target: any) {
									var player = _status.event.player;
									return get.effect(target, { name: 'sha' }, player, player);
								});
							}
							if (num2 >= 2) Evt.change = true;
						}, () => {
							if (Evt.change) {
								player.chooseTarget('令一名角色回复一点体力', function (card: any, player: any, target: { hp: number; maxHp: number; }) {
									return target.hp < target.maxHp;
								}).ai = function (target: any) {
									var att = get.attitude(_status.event.player, target);
									return att;
								};
							} else {
								Evt.finish();
							}
						}, () => {
							if (result.targets?.length) {
								result.targets[0].recover();
							}
						}],
					}
				},
			},
			//re狐叔
			re_dianyin: {
				trigger: { player: 'damageEnd' },
				content: [() => {
					Evt.num ??= trigger.num;
					player.chooseTarget('令一名角色摸两张牌')
						.set('prompt2', '（若其手牌数少于你或为全场最少，改为摸三张牌）')
						.set('ai', function (target: any) {
							var player = _status.event.player;
							var att = get.attitude(player, target);
							return att;
						});
				}, () => {
					if (result.bool && result?.targets?.length) {
						var target = result.targets[0];
						player.line(target, 'green');
						if (target.countCards('h') < player.countCards('h') || target.isMinHandcard()) {
							target.draw(3);
						}
						else {
							target.draw(2);
						}
					}
				}, () => {
					if (--Evt.num > 0) {
						player.chooseBool(get.prompt2('re_dianyin'));
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						player.logSkill('re_dianyin');
						Evt.goto(0);
					}
				}],
				ai: {
					maixie: true,
				},
			},
			//re王妃
			kouhu: {
				group: ['kouhu_shan', 'kouhu_sha'],
				subSkill: {
					shan: {
						enable: ['chooseToUse'],
						viewAs: { name: 'shan' },
						viewAsFilter(player: any) {
							if (!_status.currentPhase) return false;
						},
						filterCard: () => false,
						selectCard: -1,
						filter(Evt: any, player: { hasSkill: (arg0: string) => any; }) {
							if (player.hasSkill('kouhu_usedShan')) return false;
							return true;
						},
						precontent() {
							player.addTempSkill('kouhu_usedShan', 'roundStart');
							_status.currentPhase.draw();
						}
					},
					sha: {
						enable: ['chooseToRespond'],
						viewAs: { name: 'sha' },
						viewAsFilter(player: any) {
							if (!_status.currentPhase) return false;
						},
						filterCard: () => false,
						selectCard: -1,
						filter(Evt: any, player: { hasSkill: (arg0: string) => any; }) {
							if (player.hasSkill('kouhu_usedSha')) return false;
							return true;
						},
						precontent() {
							player.addTempSkill('kouhu_usedSha', 'roundStart');
							_status.currentPhase.draw();
						}
					},
					usedShan: {},
					usedSha: {},
				}
			},
			zhiqiu: {
				trigger: { player: ['useCardAfter', 'respondAfter'] },
				filter(Evt, player) {
					var name = get.name(Evt.card);
					if (!['sha', 'shan'].contains(name)) return false;
					return Evt.skill && Evt.skill == 'kouhu_' + name && player.countCards('h') > 0 && game.hasPlayer((cur: any) => {
						return player.canCompare(cur);
					});
				},
				content: [() => {
					player.chooseTarget(true, '『直球』：与一名角色拼点', function (card: any, player: { canCompare: (arg0: any) => any; }, target: any) {
						return player.canCompare(target);
					})
				}, () => {
					if (result.bool) {
						var target = result.targets[0];
						Evt.target = target;
						player.logSkill('zhiqiu', target);
						player.chooseToCompare(target);
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						player.chooseTarget(true, '『直球』：对一名角色造成一点伤害').set('ai', function (target: any) {
							var player = _status.event.player;
							return get.damageEffect(target, player, player);
						});
					}
					else {
						player.damage(Evt.target);
						Evt.finish();
					}
				}, () => {
					if (result.bool && result.targets && result.targets[0]) {
						result.targets[0].damage(player);
					}
				}],
				ai: {
					combo: 'zhiqiu'
				}
			},
			//reYuNi
			re_shengcai: {
				trigger: { player: 'useCard1' },
				priority: 123,
				filter(Evt, player) {
					var repeat = 0;
					var another = 0;
					game.hasPlayer(cur => {
						cur.getHistory('useCard', evt => {
							if (get.color(evt.card, cur) == get.color(Evt.card, player)) {
								repeat++;
							} else {
								another++;
							};
						});
					});
					return repeat == 1 && another;
				},
				frequent: true,
				content() {
					var stats = 0;
					function getStats(sum,cur){

					}
					game.hasPlayer(cur => {
						cur.getHistory('useCard', evt => {
							if (get.color(evt.card, cur) !== get.color(trigger.card, player)) {
								stats++;
							}
						});
					});
					player.draw(stats);
				},
				mod: {
					aiOrder(player, card, num) {
						if (typeof card == 'object' && player != _status.currentPhase) {
							if (lib.skill.re_shengcai.filter({ card: card }, player)) {
								return num + 10;
							}
						}
					},
				},
			},
			//reMari
			liansheng: {
				trigger: { player: 'changeHp' },
				forced: true,
				silent: true,
				firstDo: true,
				content() {
					if (player.hp == player.maxHp && player.sex == 'female') {
						player.sex = 'male';
						player.markSkill('liansheng');
						game.log(player, '的性别变更为', '#g' + get.translation(player.sex));
						if (_status.currentPhase && _status.currentPhase.sex == 'female') player.draw();
					}
					if (player.hp < player.maxHp && player.sex == 'male') {
						player.sex = 'female';
						player.markSkill('liansheng');
						game.log(player, '的性别变更为', '#g' + get.translation(player.sex));
						if (_status.currentPhase && _status.currentPhase.sex == 'female') player.draw();
					}
				},
				mark: true,
				intro: {
					content($: any, player: { sex: any; }) {
						return '当前性别：' + get.translation(player.sex);
					},
				},
			},
			ruantang: {
				trigger: { player: 'phaseJudgeBefore' },
				direct: true,
				content: [() => {
					var check = player.countCards('h') >= 2 && player.hp < player.maxHp;
					player.chooseTarget(get.prompt('ruantang'), '令至多一名异性角色与自己各回复一点体力（选择自己则表示仅为自己回复体力）', function (card: any, player: { sex: any; }, target: { sex: any; isDamaged: () => any; }) {
						return target == player || (target.sex != player.sex && target.isDamaged());
					}).set('check', check).set('ai', function (target: any) {
						if (!_status.event.check) return 0;
						var att = get.attitude(_status.event.player, target);
						return att;
					});
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						var target = result.targets[0];
						if (target != player) {
							player.logSkill('ruantang', target);
							if (target.hp < target.maxHp) Evt.recover1 = 1;
							target.recover();
						} else {
							player.logSkill('ruantang');
						}
						if (player.hp < player.maxHp) Evt.recover2 = 1;
						player.recover();
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.recover1 && Evt.target.hp == Evt.target.maxHp) Evt.target.draw();
					if (Evt.recover2 && player.hp == player.maxHp) player.draw();
				}, () => {
					trigger.cancel();
					player.skip('phaseDraw');
				}],
			},
			//reOmesis
			yaozhan: {
				trigger: { player: ['phaseDrawBefore', 'phaseUseBefore'] },
				direct: true,
				content: [() => {
					var check = player.countCards('h') > 2;
					if (trigger.name == 'phaseUse' && player.getHandcardLimit() > 2) check = player.countCards('h') <= player.getHandcardLimit();
					player.chooseTarget('###是否发动『邀战』？###跳过' + get.translation(trigger.name) + '，视为对一名其他角色使用一张【决斗】', function (card: any, player: { canUse: (arg0: { name: string; }, arg1: any) => any; }, target: any) {
						if (player == target) return false;
						return player.canUse({ name: 'juedou' }, target);
					}).set('check', check).set('ai', function (target: any) {
						if (!_status.event.check) return 0;
						return get.effect(target, { name: 'juedou' }, _status.event.player);
					});
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('yaozhan', result.targets);
						player.useCard({ name: 'juedou' }, result.targets[0]);
						trigger.cancel();
					}
				}]
			},
			chongxin: {
				init(player: PlayerModel, skill: string) {
					player.$[skill] ??= [];
				},
				mark: true,
				intro: {
					name: '崇新',
					content: 'cards',
					onunmark($: any[], player: PlayerModel) {
						if ($ && $.length) {
							player.$throw($, 1000);
							game.cardsDiscard($);
							game.log($, '被置入了弃牌堆');
							$.length = 0;
						}
					},
				},
				cardAround: true,
				trigger: { global: 'judge' },
				filter(Evt: { player: { judging: any[]; }; }, player: { countCards: (arg0: string, arg1: { suit: any; }) => number; }) {
					var suit0 = get.suit(Evt.player.judging[0]);
					return player.countCards('he', { suit: suit0 }) > 0;
				},
				direct: true,
				content: [() => {
					player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
						get.translation(trigger.player.judging[0]) + '，' + get.prompt('chongxin'), 'he', (card: any) => {
							var judging = _status.event.judging;
							if (get.suit(card) != get.suit(judging)) return false;
							var player = _status.event.player;
							var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
							if (mod2 != 'unchanged') return mod2;
							var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
							if (mod != 'unchanged') return mod;
							return true;
						}).set('ai', (card: any) => {
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
				}, () => {
					if (result.bool) {
						player.respond(result.cards, 'highlight', 'noOrdering');
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						Evt.card = trigger.player.judging[0];
						player.gain(Evt.card, 'gain2');
						trigger.player.judging[0] = result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player, '的判定牌改为', result.cards[0]);
					} else {
						Evt.finish();
					}
				}, () => {
					player.chooseBool('是否将' + get.translation(Evt.card) + '置于武将牌上')
				}, () => {
					if (result.bool) {
						var card = Evt.card;
						player.lose(card, ui.special, 'to$');
						player.$give(card, player, false);
						player.markAuto('chongxin', [card]);
						game.log(player, '将', card, '置于武将牌上');
					}
					game.delay(1);
				}],
				global: 'chongxin2',
				ai: {
					rejudge: true,
					tag: {
						rejudge: 0.2,
					}
				},
			},
			chongxin2: {
				mod: {
					cardEnabled(card: any, player: any, now: any) {
						if (_status.event.type == 'wuxie' && _status.event.getParent().name == '_wuxie' && _status.event.getParent().card.name == 'juedou') {
							let source = _status.event.getParent().player;
							if (source != player && source.hasSkill('chongxin') && source.$?.chongxin?.length) {
								let suits = get.suit3(source.$.chongxin);
								return !suits.contains(get.suit(card))
							}
						}
					},
					cardRespondable(card: any, player: any, now: any) {
						if (_status.event.name == 'chooseToRespond' && _status.event.getParent().name == 'juedou') {
							let source = _status.event.getParent().player;
							if (source != player && source.hasSkill('chongxin') && source.$?.chongxin?.length) {
								let suits = get.suit3(source.$.chongxin);
								return !suits.contains(get.suit(card))
							}
						}
					},
				},
			},
			//Laki
			yayun: {
				audio: true,
				clickable(player: { $: { yayun: boolean; }; updateMark: (arg0: string, arg1: boolean) => void; }) {
					player.$.yayun = false;
					player.updateMark('yayun', true);
					lib.skill.yayun.laohuji(player);
					if (_status.imchoosing) {
						delete _status.event._cardChoice;
						delete _status.event._targetChoice;
						game.check();
					}
				},
				clickableFilter(player: { $: { yayun: boolean; }; countDiscardableCards: (arg0: any, arg1: string) => any; }) {
					return player.$.yayun == true && player.countDiscardableCards(player, 'h');
				},
				laohuji(player: PlayerModel) {
					console.log('Outter')
					let next = game.createEvent('laohuji');
					next.player = player;
					next.setContent([() => {
						var audio = [player.name, player.name1, player.name2].contains('re_NijikawaRaki');
						player.logSkill('yayun', true, true, true, audio);
						Evt.discards = player.getDiscardableCards(player, 'h');
						player.discard(Evt.discards);
						if (Evt.discards.length == 0) Evt.finish();
						else Evt.cards = [];
					}, () => {
						var suits = get.suit3(Evt.discards);
						let next = player.judge((card: any) => {
							var suits = _status.event.suits;
							if (suits.contains(get.suit(card))) return 1;
							return -1;
						});
						next.set('callback', () => {
							//Evt.getParent().orderingCards.remove(card);
						});
						next.set('suits', suits);
						if (!Evt.num) Evt.num = 1;
						else Evt.num++;
					}, () => {
						console.log(Evt.num)
						if (result.bool) {
							player.draw();
						}
						if (Evt.num < 3) {
							Evt.cards.push(result.card);
							Evt.goto(1);
						}
						else {
							Evt.cards.push(result.card);
						}
					}, () => {
						if (Evt.cards.length == 3) {
							var suits = get.suit3(Evt.cards);
							if (suits.length == 1) {
								player.draw(3);
								game.playAudio('skill', 'laohuji');
							}
						}
					}]);
				},
				init(player: { $: { yayun: boolean; }; }) {
					player.$.yayun = true;
				},
				mark: true,
				trigger: { global: 'roundStart' },
				direct: true,
				content() {
					player.$.yayun = true;
					player.updateMark('yayun', true);
				},
				intro: {
					mark(dialog: { addText: (arg0: string) => void; add: (arg0: any) => void; }, content: any, player) {
						if (player.isUnderControl(true)) {
							if (_status.gameStarted) {
								if (player.$.yayun) {
									if (!player.getDiscardableCards(player, 'h')) dialog.addText('不可发动');
									else dialog.add(ui.create.div('.menubutton.pointerdiv', '点击发动', () => {
										if (!this.disabled) {
											this.disabled = true;
											this.classList.add('disabled');
											this.style.opacity = 0.5;
											lib.skill.yayun.clickable(player);
										}
									}));
								}
								else dialog.addText('本轮已发动');
							}
							// var list=[];
							// var num=Math.min(9,ui.cardPile.childElementCount);
							// for(var i=0;i<num;i++){
							// 	list.push(ui.cardPile.childNodes[i]);
							// }
							// dialog.addSmall(list);
						}
						else {
							if (player.$.yayun) dialog.addText('本轮未发动');
							else dialog.addText('本轮已发动');
						}
					},
					content(content: any, player: { isUnderControl: (arg0: boolean) => any; }) {
						if (player.isUnderControl(true)) {
							// var list=[];
							// var num=Math.min(9,ui.cardPile.childElementCount);
							// for(var i=0;i<num;i++){
							// 	list.push(ui.cardPile.childNodes[i]);
							// }
							// return get.translation(list);
						}
						else {
							if (content) return '本轮未发动';
							else return '本轮已发动';
						}
					}
				},
			},
			jidao: {
				audio: 3,
				audioname: ['jike'],
				trigger: { source: 'damageBegin2' },
				priority: 9,
				filter(Evt: { num: number; }, player: any) {
					return Evt.num > 0;
				},
				check(Evt: { player: { countCards: (arg0: string) => number; }; }, player: any) {
					return get.damageEffect(Evt.player, player, player) < 0
						|| (Evt.player.countCards('h') > 4 && get.attitude(player, Evt.player) < 0);
				},
				logTarget: 'player',
				content: [() => {
					Evt.target = trigger.player;
					trigger.changeToZero();
				}, () => {
					lib.skill.yayun.laohuji(Evt.target);
				}],
			},
			//鹦鹉哥
			ywshuangxing: {
				trigger: { target: 'useCardToBefore' },
				priority: 15,
				check(Evt: { target: any; card: any; player: any; }, player: any) {
					return get.effect(Evt.target, Evt.card, Evt.player, player) < 0;
				},
				filter(Evt: { card: any; }, player: { hp: number; }) {
					return get.type2(Evt.card) != 'basic' && get.color(Evt.card) == 'black' && player.hp % 2 == 1
						|| get.type2(Evt.card) != 'equip' && get.color(Evt.card) == 'red' && player.hp % 2 == 0;
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card: any, player: { hp: number; }, target: any, current: number) {
							if ((get.type2(card) != 'basic' && get.color(card) == 'black' && player.hp % 2 == 1
								|| get.type2(card) != 'equip' && get.color(card) == 'red' && player.hp % 2 == 0)
								&& current < 0) return 'zeroplayertarget';
						},
					}
				}
			},
			yinni: {
				trigger: { player: 'useCard2' },
				direct: true,
				filter(Evt, player) {
					var card = Evt.card;
					var info = get.info(card);
					if (info.allowMultiple == false) return false;
					if (Evt.targets && !info.multitarget) {
						if (player.$.yinni_record_color && player.$.yinni_record_color != get.color(card)) {
							return Evt.targets.length != player.$.yinni_record;
						}
					}
					return false;
				},
				content: [() => {
					var num = player.$.yinni_record - trigger.targets.length;
					if (num > 0) {
						var prompt2 = '为' + get.translation(trigger.card) + '增加目标至' + get.cnNumber(player.$.yinni_record) + '个';
						player.chooseTarget(num, get.prompt('yinni'), function (card: any, player: any, target: any) {
							var player = _status.event.player;
							return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
						}).set('prompt2', prompt2).set('ai', function (target: any) {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							return get.effect(target, trigger.card, player, player);
						}).set('card', trigger.card).set('targets', trigger.targets);
					} else if (num < 0) {
						player.chooseTarget(-num, get.prompt('yinni'), '为' + get.translation(trigger.card) + '减少目标至' + get.cnNumber(player.$.yinni_record) + '个', function (card: any, player: any, target: any) {
							return _status.event.targets.contains(target)
						}).set('targets', trigger.targets).set('ai', function (target: any) {
							var player = _status.event.player;
							return -get.effect(target, _status.event.getTrigger().card, player, player)
						});
					}
				}, () => {
					if (result.bool) {
						if (!Evt.isMine()) game.delayx();
						Evt.targets = result.targets;
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (Evt.targets) {
						player.logSkill('yinni', Evt.targets);
						if (trigger.targets.contains(Evt.targets[0])) {
							player.draw();
							trigger.targets.removeArray(Evt.targets);
						}
						else trigger.targets.addArray(Evt.targets);
					}
				}],
				group: 'yinni_record',
				subSkill: {
					record: {
						trigger: {
							global: 'useCardAfter',
						},
						silent: true,
						firstDo: true,
						filter(Evt, player) {
							if (!Evt.card || !get.color(Evt.card) || !Evt.targets || !Evt.targets.length) return false;
							var type = get.type2(Evt.card);
							return type != 'equip';
						},
						content() {
							player.$.yinni_record = trigger.targets.length;
							player.$.yinni_record_color = get.color(trigger.card);
							if (!player.isUnseen(1)) player.markSkill('yinni_record');
						},
						intro: {
							content: '上一张牌的目标数为&'
						},
					}
				}
			},
			//开司
			re_pojie: {
				init(player: { $: { [x: string]: number; }; }, skill: string | number) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				trigger: {
					global: ['loseAfter'],
				},
				marktext: "戒",
				mark: true,
				intro: {
					content: '出牌阶段结束时弃置#张牌',
				},
				filter(Evt: { es: string | any[]; }, player: any) {
					if (player != _status.currentPhase) return false;
					return Evt?.es?.length;
				},
				content() {
					player.draw();
					player.addMark('re_pojie', 1, false);
				},
				group: 're_pojie_phaseDiscard',
				subSkill: {
					phaseDiscard: {
						trigger: { player: ['phaseUseEnd', 'phaseEnd'] },
						direct: true,
						lastDo: true,
						priority: 2,
						filter(Evt: any, player: { $: { re_pojie: number; }; }) {
							return player.$.re_pojie > 0;
						},
						content: [() => {
							if (trigger.name == 'phaseUse') {
								player.logSkill('re_pojie');
								player.chooseToDiscard(player.$.re_pojie, true, 'h');
								trigger.cancel();
							}
						}, () => {
							player.$.re_pojie = 0;
							player.unmarkSkill('re_pojie');
						}],

					},
				},
			},
			re_dazhen: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.getEquip(1);
				},
				filterCard(card, player) {
					return get.subtype(card) == 'equip1';
				},
				discard: false,
				position: 'e',
				filterTarget(card: any, player: any, target: any) {
					return target != player;
				},
				content: [() => {
					player.$give(cards, target);
					target.equip(cards[0]);
				}, () => {
					Evt.num = Math.abs(player.getHandcardLimit() - player.countCards('h'));
					target.chooseToDiscard('『大振』：弃置' + get.cnNumber(Evt.num) + '张牌，否则受到' + get.translation(player) + '造成的1点伤害', Evt.num, 'he');
				}, () => {
					if (result.bool && result.cards) {
						Evt.finish();
					} else {
						target.damage(player);
					}
				}],
				ai: {
					order: 6,
					result: {
						target(player: { countCards: (arg0: string) => number; getHandcardLimit: () => number; }, target: any) {
							if (player.countCards('h') > player.getHandcardLimit()) {
								return -1;
							}
							else {
								return 0;
							}
						},
						player(player: any, target: { getEquip: (arg0: number) => any; }) {
							if (target.getEquip(1)) return 1;
							else return -0.5;
						},
					},
					threaten: 1.2,
				},
			},
			//re狗妈
			re_DDzhanshou: {
				audio: 'DDzhanshou',
				trigger: { global: 'phaseEnd' },
				priority: 77,
				frequent: true,
				filter(Evt: { player: { getHistory: (arg0: string) => any; }; }, player: any) {
					var history = Evt.player.getHistory('useCard');
					var DD = false;
					history.forEach(function (his: { targets: any[]; card: any; }) {
						if (!(his.targets.contains(Evt.player) || his.targets.contains(player)) && get.color(his.card) == 'red') DD = true;
					});
					return DD;
				},
				content: [() => {
					if (trigger.player == player) {
						player.draw();
						Evt.finish();
					} else {
						player.chooseToUse({
							preTarget: target,
							filterCard(card: any, player: any) {
								return get.name(card) == 'sha' && lib.filter.filterCard.apply(this, arguments);
							},
							filterTarget(card: any, player: any, target: any) {
								return target == _status.event.preTarget && lib.filter.filterTarget.apply(this, arguments);
							},
							addCount: false,
							nodistance: true,
							prompt: 'DD斩首！(若不出【杀】则摸一张牌）',
						}).set('logSkill', ['re_DDzhanshou', trigger.player]);
					}
				}, () => {
					if (result.bool) {
						Evt.finish();
					} else {
						player.draw();
					}
				}],
			},
			//re空
			re_taiyangzhiyin: {
				audio: 'taiyangzhiyin',
				trigger: { player: 'useCard2' },
				filter(Evt, player) {
					return get.number(Evt.card, player) >= 10;
				},
				priority: 1,
				content: [() => {
					var list = [['无法响应'], ['额外目标'], ['摸一张牌']];
					if (!game.hasPlayer(cur => lib.filter.targetEnabled2(trigger.card, player, cur)
						&& player.inRange(cur)
						&& !trigger.targets.contains(cur)
						&& (get.type(trigger.card) != 'equip' && get.type(trigger.card) != 'delay'))) {
						list.splice(1, 1);
					}
					Evt.videoId = lib.status.videoId++;
					game.broadcastAll(function (id, choicelist: any[], Dvalue: string) {
						var dialog = ui.create.dialog('选择' + Dvalue + '项');
						choicelist.forEach((element: any) => {
							dialog.add([element, 'vcard']);
						})
						dialog.videoId = id;
					}, Evt.videoId, list, 1);
				}, () => {
					player.chooseButton(1).set('dialog', Evt.videoId).set('prompt', get.prompt('re_taiyangzhiyin'));
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.bool) {
						result.links.forEach((element: string[]) => {
							if (element[2] == "摸一张牌") {
								player.draw();
							}
							if (element[2] == "无法响应") {
								game.log(player, '令', trigger.card, '无法被响应');
								trigger.directHit.addArray(game.players);
								trigger.nowuxie = true;
							}
						});
						result.links.forEach((element: string[]) => {
							if (element[2] == "额外目标") {
								//console.log(trigger);
								player.chooseTarget(true, `额外指定一名${get.translation(trigger.card)}的目标？`, function (card: any, player: any, target: any) {
									var trigger = _status.event;
									if (trigger.targets.contains(target)) return false;
									return lib.filter.targetEnabled2(trigger.card, _status.event.player, target);
								}).set('ai', function (target: any) {
									var trigger = _status.event.getTrigger();
									var player = _status.event.player;
									return get.effect(target, trigger.card, player, player);
								}).set('targets', trigger.targets).set('card', trigger.card);
							}
						});
					}
				}, () => {
					if (result?.bool) {
						if (!Evt.isMine()) game.delayx();
						Evt.target = result.targets[0];
						if (Evt.target) {
							game.log(Evt.target, '成为了', trigger.card, '的额外目标');
							trigger.targets.add(Evt.target);
							game.delayx();
						}
					}
				}],
			},
			//re凛
			re_mozhaotuji: {
				audio: true,
				audioname: ['jike'],
				group: ['re_mozhaotuji_DrawOrStop', 're_mozhaotuji_useCard', 're_mozhaotuji_change'],
				subSkill: {
					DrawOrStop: {
						trigger: { global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd'] },
						filter(Evt: any, player: { $: { re_mozhaotuji_useCard: any; }; }) {
							if (player.$.re_mozhaotuji_useCard >= 1)
								return true;
						},
						priority: 14,
						direct: true,
						content: [() => {
							if (player.$.re_mozhaotuji_useCard >= 1) {
								player.logSkill('re_mozhaotuji');
								player.draw();
							}
							player.$.re_mozhaotuji_useCard = 0;
						}],
					},
					useCard: {
						init(player, skill) {
							if (!player.$[skill]) player.$[skill] = 0;
						},
						trigger: { player: 'useCardAfter' },
						direct: true,
						silent: true,
						priority: 1,
						content() {
							player.$.re_mozhaotuji_useCard++;
						},
					},
					/**转化阶段 */
					change: {
						audio: 'mozhaotuji',
						trigger: {
							player: ['phaseZhunbeiBefore', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseDiscardBefore', 'phaseJieshuBegin']
						},
						filter(Evt, player) {
							return true;
						},
						check(Evt, player) {
							return Evt.name === 'phaseJudge' && player.countCards('j') > 1
								|| ['phaseDiscard', 'phaseJieshu'].includes(Evt.name);
						},
						prompt(Evt, player) {
							return `把${get.$t(Evt.name)}转换为出牌阶段`;
						},
						usable: 1,
						content: [() => {
							trigger.cancel();
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
					},
				}
			},
			//re兔头
			re_bingdielei: {
				audio: 'bingdielei',
				trigger: { global: 'phaseEnd' },
				round: 1,
				prompt2: '获得一个额外回合',
				filter(Evt, player) {
					return player.getHistory('lose', (evt) => evt.hs && evt.hs.length > 0).length;
				},
				content() {
					player.unmarkSkill(Evt.name);
					player.logSkill(Evt.name);
					player.insertPhase();
				},
				group: ['re_bingdielei_lose'],
				subSkill: {
					lose: {
						trigger: { player: 'loseAfter' },
						priority: 99,
						silent: true,
						popup: false,
						forced: true,
						filter(Evt: { cards: string | any[]; }, player: { $: { re_bingdielei_roundcount: any; }; }) {
							return Evt.cards.length && !player.$.re_bingdielei_roundcount;
						},
						direct: true,
						content() {
							player.addTempSkill('re_bingdielei_mark');
						},
					},
					mark: {
						mark: true,
						marktext: '蕾',
						intro: {
							content: '当前回合结束后可以获得一个额外回合',
							name: '盛蕾',
						},
					},
				},
			},
			//re德龙
			re_zhenyin: {
				audio: 'zhenyin',
				trigger: {
					player: 'useCardToPlayered',
				},
				usable: 1,
				filter(Evt: { targets: any[]; card: any; }, player: any) {
					var num = 0;
					Evt.targets.forEach(function (tar: { countCards: (arg0: string) => number; }) {
						num += tar.countCards('hej');
					})
					return Evt.targets.length
						&& num > 0
						&& get.color(Evt.card) == 'black';

				},
				content: [() => {
					player.chooseTarget('选择『震音』的目标', function (card: any, player: any, target: any) {
						return _status.event.targets.contains(target);
					}).set('targets', trigger.targets);
				}, () => {
					if (result.bool) {
						Evt.A = result.targets[0];
						Evt.B = Evt.A.next;
						if (!Evt.A.countCards('hej')) Evt.finish();
						else {
							player.choosePlayerCard('hej', Evt.A).set('ai', function (button: string) {
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
								} else {
									return get.value(link, target, 'raw') * get.attitude(player, target);
								}
							});
						}
					} else {
						Evt.finish()
					}
				}, () => {
					if (result.bool && result.links?.length) {
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
							Evt.B.getCards('j').forEach(function (c: any) {
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
				}]
			},
			//re海牛
			re_kuangren: {
				audio: 'kuangbaoshuangren',
				trigger: { player: 'shaBegin' },
				priority: 98,
				forced: true,
				filter(Evt: { card: any; }, player: any) {
					return get.color(Evt.card) == 'red';

				},
				content() { },
				group: ['re_kuangren_red', 're_kuangren_black'],
				subSkill: {
					red: {
						mod: {
							targetInRange(card: { name: string; }, player: any) {
								if (_status.currentPhase == player && card.name == 'sha' && get.color(card) == 'red') return true;
							},
							cardUsable(card: { name: string; }, player: any, num: any) {
								if (card.name == 'sha' && get.color(card) == 'red') return Infinity;
							},
						},
					},
					black: {
						trigger: { player: 'useCard2' },
						filter(Evt, player) {
							if (Evt.card.name != 'sha' || get.color(Evt.card) == 'red') return false;
							return game.hasPlayer((cur: any) => !Evt.targets.contains(cur) && lib.filter.targetEnabled2(Evt.card, player, cur));
						},
						direct: true,
						content: [() => {
							player.chooseTarget(get.prompt('re_kuangren'), `为${get.translation(trigger.card)}增加一个目标`,
								function (card, player, target) {
									return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
								})
								.set('ai', target => {
									let player = _status.event.player, source = _status.event.source;
									return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
								})
								.set('targets', trigger.targets).set('card', trigger.card).set('source', player);
						}, () => {
							if (result.bool) {
								if (!Evt.isMine() && !_status.connectMode) game.delayx();
								Evt.target = result.targets[0];
							}
							else {
								Evt.finish();
							}
						}, () => {
							player.logSkill('re_kuangren', Evt.target);
							trigger.targets.push(Evt.target);
						}],
					},
				}
			},
			re_jitui: {
				audio: 'guangsuxiabo',
				audioname: ['jike'],
				trigger: {
					player: ['loseAfter', 'damageAfter'],
				},
				filter(Evt: { name: string; cards: any[]; visible: any; }, player: any) {
					if (Evt.name == 'damage') return true;
					var unB = Evt.cards.filter((card: any) => get.type(card) != 'basic')
					return player != _status.currentPhase && Evt.visible && Evt.name == 'lose' && unB.length;
				},
				priority: 98,
				content() {
					player.draw();
				},
			},
			//reAlice
			re_dianmingguzhen: {
				audio: 'dianmingguzhen',
				enable: "phaseUse",
				usable: 1,
				filter(Evt: any, player: { canMoveCard: (arg0: null, arg1: boolean) => any; }) {
					return player.canMoveCard(null, true);
				},
				content: [() => {
					player.loseHp(1);
				}, () => {
					player.moveCard(true)
						.set('nojudge', true)
						.set('ai', function (target: { countCards: (arg0: string, arg1: (card: any) => any) => number; getCards: (arg0: string) => any; isEmpty: (arg0: any) => any; }) {
							var player = _status.event.player;
							var att = get.attitude(player, target);
							var sgnatt = get.sgn(att);
							if (ui.selected.targets.length == 0) {
								if (target == player) {
									if (target.countCards('e', (card: any) => {
										return get.value(card, target) < 0
											&& game.hasPlayer((cur: { isEmpty: (arg0: any) => any; }) => cur != player && cur != target && get.attitude(player, cur) < 0 && cur.isEmpty(get.subtype(card)));
									}) > 0) return 9;
								}
								else {
									if (game.hasPlayer((cur: { isEmpty: (arg0: any) => any; }) => {
										if (cur != target && cur != player && get.attitude(player, cur) > 0) {
											var es = target.getCards('e');
											for (let i = 0; i < es.length; i++) {
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
							var i;
							var att2 = get.sgn(get.attitude(player, ui.selected.targets[0]));
							for (i = 0; i < es.length; i++) {
								if (sgnatt != 0 && att2 != 0 &&
									get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
									get.sgn(get.value(es[i], target)) == sgnatt &&
									target.isEmpty(get.subtype(es[i]))) {
									return Math.abs(att);
								}
							}
							if (i == es.length) {
								return 0;
							}
							return -att * get.attitude(player, ui.selected.targets[0]);
						});
				}, () => {
					if (result.targets[0] == player) {
						player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, '是否视为使用一张雷【杀】？', false);
					}
				}],
				ai: {
					order: 7,
					result: {
						player(player: { hp: number; }, target: any) {
							if (player.hp != 1) return 1;
							else return -2;
						},
						/*	target(player,target){
								if(ui.selected.targets.length==0){
									if(target==player&&player.hp!=1)	return Math.random();	
									return -2;
								}
								else{
									return 2+Math.random();
								}
							}*/
					},
				},
			},
			//re373
			re_longdan: {
				init(player: { $: { [x: string]: boolean; }; }, skill: string | number) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				hiddenCard(player: { $: { re_longdan: boolean; }; countCards: (arg0: string, arg1: { type?: string; name?: string; }) => number; }, name: string) {
					if (player.$.re_longdan == true && name == 'sha' && lib.inpile.contains(name)) return player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' });
					if (player.$.re_longdan == false && get.type(name) == 'basic' && lib.inpile.contains(name)) return player.countCards('h', { name: 'sha' });
				},
				enable: ['chooseToUse', 'chooseToRespond'],
				usable: 1,
				filter(Evt: any, player: { $: { re_longdan: boolean; }; countCards: (arg0: string, arg1: { type?: string; name?: string; }) => number; }) {
					return player.$.re_longdan == true && player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' }) || player.$.re_longdan == false && player.countCards('h', { name: 'sha' });
				},
				chooseButton: {
					dialog(Evt: any, player: { $: { re_longdan: boolean; }; }) {
						var list = [];
						for (let i of lib.inpile) {
							let name = i;
							if (player.$.re_longdan == true && name == 'sha') {
								list.push(['基本', '', 'sha']);
								list.push(['基本', '', 'sha', 'fire']);
								list.push(['基本', '', 'sha', 'thunder']);
								list.push(['基本', '', 'sha', 'ice']);
								list.push(['基本', '', 'sha', 'ocean']);
							}
							else if (player.$.re_longdan == false && get.type(name) == 'basic' && name != 'sha') list.push(['基本', '', name]);
						}
						return ui.create.dialog(get.translation('re_longdan'), [list, 'vcard']);
					},
					filter(button: { link: any[]; }, player: any) {
						return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
					},
					check(button: { link: any[]; }) {
						var player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						var effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links: any[][], player: any) {
						return {
							filterCard(card: any, player: { $: { re_longdan: boolean; }; }) {
								if (player.$.re_longdan == false) return get.name(card) == 'sha';
								if (get.type(card) == 'basic' && get.name(card) != 'sha') {
									return true;
								}
								return false;
							},
							selectCard: 1,
							popname: true,
							check(card: any) {
								return 6 - get.value(card);
							},
							position: 'hes',
							viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
							onrespond() { return this.onuse.apply(this, arguments) },
							onuse(result: any, player) {
								player.$.re_longdan = !player.$.re_longdan;
								player.updateMarks('re_longdan')
							},
						}
					},
					prompt(links: any[][], player: { $: { re_longdan: boolean; }; }) {
						if (player.$.re_longdan == false) return '将一张【杀】当作' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
						return '将一张基本牌当作' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
					}
				},
				mod: {
					targetInRange(card: any, player: any, target: any) {
						if (_status.event.skill == 're_longdan_backup' && get.number(card) > 7) return true;
					},
					cardUsable(card: any, player: { countCards: (arg0: string, arg1: (card0: any) => boolean) => any; }, num: any) {
						console.log(_status.event.skill, card)
						if (_status.event.skill == 're_longdan_backup' && get.number(card) > 7) return Infinity;
						var result = _status.event.getParent().result;
						if (result?.skill == 're_longdan' && player.countCards('hes', function (card0: any) {
							return get.number(card0) > 7;
						})) return Infinity;
					},
				},
				ai: {
					useSha: 1,
					skillTagFilter(player: PlayerModel, tag: any) {
						switch (tag) {
							case 'respondSha': {
								if (player.$.re_longdan != true || !player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' })) return false;
								break;
							}
							case 'respondShan': {
								if (player.$.re_longdan != false || !player.countCards('h', { name: 'sha' })) return false;
								break;
							}
							case 'save': {
								if (player.$.re_longdan != false || !player.countCards('h', { name: 'sha' })) return false;
								break;
							}
						}
					},
					result: { player: 1 },
					respondSha: true,
					respondShan: true,
					save: true,
				},
			},
			//re修女
			shenyou: {
				marktext: '神',
				intro: {
					name: "神佑",
					content: '<font color=#f66>你受到来自基本牌的伤害+1；其它的伤害-1。</font>',
				},
				mark: true,
				trigger: { player: 'damageBegin3' },
				forced: true,
				priority: 1,
				/*      filter(Evt,player){
						if((Evt.getParent(2).skill&&Evt.getParent(2).skill.length)) return true;
						if(!Evt.getParent(1).card)		return false
						console.log(Evt.getParent(1));
						console.log(get.type(Evt.getParent(1).card,'trick'));
						return get.type(Evt.getParent(1).card,'trick')=='basic'||get.type(Evt.getParent(1).card,'trick')=='trick';
					},*/
				content() {
					if (get.type(trigger.getParent(1).card, 'trick') == 'basic') {
						trigger.num++;
					}
					else {
						trigger.num--;
					}
				},
				ai: {
					notrick: 1,
					effect: {
						target(card: any, player: any, target: any, current: any) {
							if (get.name(card, player) == 'sha') return [0, -4];
						},
					},
				},
			},
			shenfa: {
				trigger: { player: 'loseAfter' },
				priority: 1,
				filter(Evt: { cards: string | any[]; hs: string | any[]; }, player: any) {
					if (!game.hasPlayer((cur: { hasSkill: (arg0: string) => any; }) => {
						return !cur.hasSkill('shenyou');
					})) return false;
					return Evt.cards.length && Evt.hs.length;
				},
				direct: true,
				content: [() => {
					Evt.num = trigger.cards.length;
				}, () => {
					let next = player.chooseTarget('令一名其他角色获得『神佑』直到回合结束')
						.set('filterTarget', function (card: any, player: any, target: { hasSkill: (arg0: string) => any; }) {
							return !target.hasSkill('shenyou');
						})
						.set('ai', function (target: any) {
							var player = _status.event.player;
							var evt = _status.event.getTrigger().getParent();
							var cur = _status.currentPhase;
							if ((player == cur && player.hasSha() && player.getCardUsable('sha')
								&& (player.countCards('h', (card: any) => get.tag(card, 'damage') && get.type('card') == 'trick') < 1)
								|| (evt.name == 'useCard' && evt.card.name == 'sha')) && player.inRange(target)) return get.damageEffect(target, player, player);
							if (player != cur) {
								if (cur.hasSkillTag('useSha') && get.attitude(cur, player) > 0) return 10 - get.attitude(player, target);
								if (cur.getCardUsable('sha') && cur.hasSha()) return 4 + get.attitude(player, cur) - get.attitude(player, target);
							}
							return get.attitude(player, target);
						});
				}, () => {
					if (result.bool) {
						player.logSkill('shenfa', result.targets[0])
						result.targets[0].addTempSkill('shenyou');
						Evt.num--;
						if (Evt.num) {
							Evt.goto(1);
						} else {
							Evt.finish();
						}
					} else {
						Evt.finish();
					}
				}],
			},
			//莉泽
			yubing: {
				audio: 5,
				init(player, skill) {
					if (!player.$[skill]) player.$[skill] = 0;
				},
				trigger: { player: 'useCardAfter' },
				priority: 14,
				filter(Evt, player) {
					return player.getHandcardLimit() && (get.type(Evt.card) == 'basic' || get.type(Evt.card) == 'trick')
						&& !(Evt.result?.bool === false || Evt.iswuxied);
				},
				check(Evt, player) {
					return player != _status.currentPhase || (player.getHandcardLimit() * 2) >= player.countCards('h');
				},
				content() {
					player.$.yubing++;
					player.markSkill('yubing');
					player.draw(2);
				},
				marktext: "冰",
				mark: true,
				intro: {
					content: '手牌上限-#',
				},
				mod: {
					maxHandcard(player: { $: { yubing: number; }; }, num: number) {
						return num - player.$.yubing;
					},
				},
				group: 'yubing_clear',
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						forced: true,
						priority: 42,
						filter(Evt: any, player: { hasMark: (arg0: string) => any; }) {
							return player.hasMark('yubing');
						},
						content() {
							player.unmarkSkill('yubing');
							player.$.yubing = 0;
						}
					},
				},
			},
			//安啾
			akxiaoqiao: {
				init(player: PlayerModel, skill: string) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { player: 'phaseDiscardBegin' },
				filter(Evt: any, player: { countCards: (arg0: string) => any; }) {
					return player.countCards('h');
				},
				direct: true,
				lastDo: true,
				content: [() => {
					player.chooseCardButton('###' + get.prompt('akxiaoqiao') + '###展示任意张类型不同的手牌', player.getCards('h'), [1, 3]).set('filterButton', function (button: string) {
						let type = get.type(button.link, 'trick');
						for (let i of ui.selected.buttons) {
							if (type == get.type(i.link, 'trick')) return false;
						}
						return true;
					});
				}, () => {
					if (result.bool && result.links) {
						player.logSkill('akxiaoqiao');
						let cards = result.links;
						player.showCards(cards, '『小巧』展示手牌');
						player.$.akxiaoqiao.addArray(cards);
					}
				}],
				mod: {
					ignoredHandcard(card: any, player: { $: { akxiaoqiao: any[]; }; }) {
						if (player.$.akxiaoqiao && player.$.akxiaoqiao.contains(card)) {
							return true;
						}
					},
					cardDiscardable(card: any, player: { $: { akxiaoqiao: any[]; }; }, name: string) {
						if (name == 'phaseDiscard' && player.$.akxiaoqiao && player.$.akxiaoqiao.contains(card)) {
							return false;
						}
					},
				},
				group: 'akxiaoqiao_init',
				subSkill: {
					init: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.akxiaoqiao = [];
						},
					}
				},
			},
			liancheng: {
				trigger: { global: 'phaseEnd' },
				filter(Evt: any, player: { $: { liancheng: number; }; countCards: (arg0: string) => any; }) {
					if (player.$.liancheng && player.$.liancheng == 2) return false;
					return player.countCards('h');
				},
				content: [() => {
					player.chooseCardButton('###『链成』###重铸任意张类型不同的手牌', player.getCards('h'), [1, 3]).set('filterButton', function (button: string) {
						let type = get.type(button.link, 'trick');
						for (let i of ui.selected.buttons) {
							if (type == get.type(i.link, 'trick')) return false;
						}
						return true;
					});
				}, () => {
					if (result.bool) {
						player.$.liancheng++;
						var cards = result.links;
						player.lose(cards, ui.discardPile).set('visible', true);
						player.$throw(cards, 1000);
						game.log(player, '将', cards, '置入了弃牌堆');
						player.draw(cards.length);
						if (player == _status.currentPhase || cards.filter((card: any) => get.type(card) == 'equip').length == 0) Evt.finish();
					} else {
						Evt.finish();
					}
				}, () => {
					Evt.diff = player.countCards('h') - _status.currentPhase.countCards('h');
					if (Evt.diff == 0) {
						Evt.finish();
					}
				}, () => {
					var check = (Evt.diff > 0) ? (get.attitude(player, _status.currentPhase) > 0) : (get.attitude(player, _status.currentPhase) < 0);
					let next = player.chooseBool('###『链成』###是否令当前回合角色调整手牌与你相同？')
						.set('ai', () => {
							if (!_status.event.check) return 0;
							return 1;
						})
						.set('check', check)
				}, () => {
					if (result.bool) {
						if (Evt.diff > 0) {
							_status.currentPhase.gain(get.cards(Evt.diff), 'draw');
						} else if (Evt.diff < 0) {
							_status.currentPhase.chooseToDiscard(-Evt.diff, true, 'h');
						}
					}
				}],
				mod: {
					ignoredHandcard(card: any, player: { $: { akxiaoqiao: any[]; }; }) {
						if (player.$.akxiaoqiao && player.$.akxiaoqiao.contains(card)) {
							return true;
						}
					},
					cardDiscardable(card: any, player: { $: { akxiaoqiao: any[]; }; }, name: string) {
						if (name == 'phaseDiscard' && player.$.akxiaoqiao && player.$.akxiaoqiao.contains(card)) {
							return false;
						}
					},
				},
				ai: {
					expose: 0.2,
				},
				group: 'liancheng_init',
				subSkill: {
					init: {
						trigger: { global: 'roundStart' },
						forced: true,
						silent: true,
						popup: false,
						content() {
							player.$.liancheng = 0;
						},
					}
				},
			},

			//re下地
			re_yinliu: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt: any, player: { countDiscardableCards: (arg0: any, arg1: string) => number; }) {
					return player.countDiscardableCards(player, 'he') > 0;
				},
				check(card: any) {
					return 7 - get.value(card);
				},
				filterCard: true,
				position: 'he',
				selectCard: [1, 3],
				content: [() => {
					game.delayx();
				}, () => {
					player.draw();
				}, () => {
					if (get.itemtype(result) == 'cards') {
						player.showCards(result);
						cards.forEach(cur => {
							if (get.suit3(result).contains(get.suit(cur))) Evt.goto(1);
						})
					}
				}],
				ai: {
					order: 6,
					result: {
						player: 1,
					},
					threaten: 0.6,
				},
				subSkill: {
					used: {},
				},
			},
			//re萝卜
			re_zhanxie: {
				priority: 15,
				firstDo: true,
				mod: {
					cardUsable(card: { name: string; }, player: any, num: number) {
						if (card.name == 'sha') {
							return num + 2;
						}
					},
					// cardEnabled(card,player){
					// 	if(card.name=='sha'&&(player.getStat().card.sha>2)) 
					// 		return false
					// }
				},
				group: ['re_zhanxie_draw'],
				subSkill: {
					draw: {
						trigger: {
							player: 'useCardAfter'
						},
						firstDo: true,
						direct: true,
						filter(Evt: { card: { name: string; }; }, player: any) {
							if (Evt.card.name == 'sha') return true;
							else return false;
						},
						content() {
							if (player.countUsed('sha', true) == 3) {
								player.draw(2);
							}
						},
						ai: {
							useSha: 1,
							effect: {
								player(card: { name: any; }, player: { countUsed: (arg0: string, arg1: boolean) => number; }, target: any, current: any) {
									if (['sha'].contains(card.name) && player.countUsed('sha', true) == 2) return [1, 4];
								}
							}
						}
					}
				}
			},
			re_chongdian: {
				forced: true,
				trigger: { player: 'damageBegin4' },
				filter(Evt: { nature: string; }) {
					return Evt.nature == 'thunder';
				},
				content() {
					player.recover(trigger.num);
					trigger.cancel(true);
				},
				group: 're_chongdian_leisha',
				subSkill: {
					leisha: {
						enable: ['chooseToUse', 'chooseToRespond'],
						filterCard(card: any) {
							return get.type(card) == 'equip';
						},
						position: 'hes',
						viewAs: { name: 'sha', nature: 'thunder' },
						check() { return 1 },
						ai: {
							effect: {
								target(card: any, player: any, target: any, current: number) {
									if (get.tag(card, 'respondSha') && current < 0) return 0.5;
								}
							},
							respondSha: true,
							order: 4,
							useful: -1,
						},
						mod: {
							targetInRange(card: { cards: any[]; }, player: any, target: any) {
								if (_status.event.skill == 're_chongdian_leisha' && get.type(card.cards[0]) == 'equip') return true;
							},
						},
					},
				},
				ai: {
					nothunder: true
				},
			},
			//re狐狸
			re_yuanlv: {
				audio: 'yuanlv',
				trigger: { player: ['damageAfter', 'useCardAfter'] },
				priority: 2,
				usable: 1,
				filter(Evt: { name: string; card: any; }, player: any) {
					if (Evt.name == 'damage' || (Evt.name == 'useCard' && get.type(Evt.card, 'trick') == 'trick')) {
						return true;
					}
					else return false;
				},
				content: [() => {
					player.draw(3);
				}, () => {
					player.chooseToMove('『狐虑』：选择放置到牌堆顶部的牌', true)
						.set('list', [
							['牌堆顶'],
							['手牌&装备区', player.getCards('he')],
						])
						.set('reverse', ((_status.currentPhase && _status.currentPhase.next) ? get.attitude(player, _status.currentPhase.next) > 0 : false))
						.set('processAI', function (list) {
							var cards = list[1][1].slice(0);
							cards.sort(function (a, b) {
								return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
							});
							return [cards.slice(0, 2), cards.slice(2)];
						})
						.set('filterMove', function (from, to, moved) {
							if (to == 0 && moved[0].length >= 2) return false;
							return true;
						})
						.set('filterOk', function (moved) {
							return moved[0].length == 2;
						});
				}, () => {
					if (result.bool && result.moved && result.moved[0].length) Evt.cards = result.moved[0].slice(0);
					if (!Evt.cards) {
						Evt.finish()
						return
					}
					game.broadcastAll(function (player, cards) {
						let cardxs = []
						for (let v of cards) {
							let cardx = ui.create.card();
							cardx.classList.add('infohidden');
							cardx.classList.add('infoflip');
							cardxs.push(cardx)
						}
						player.$throw(cardxs, 500, 'nobroadcast');
					}, player, Evt.cards);
					player.lose(Evt.cards, ui.special);
					game.delayx();
				}, () => {
					let tops = Evt.cards.slice(0)
					game.log(player, `将${get.cnNumber(tops.length)}张牌放在牌堆顶`)
					while (tops.length) {
						ui.cardPile.insertBefore(tops.pop().fix(), ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
					game.delayx();
				}],
				ai: {
					maixie: true,
				}
			},
			re_jinyuan: {
				audio: 'jinyuan',
				enable: 'phaseUse',
				usable: 1,
				filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
					return player.countCards('he') > 0;
				},
				filterCard: true,
				position: 'he',
				filterTarget(card: any, player: any, target: any) {
					return player != target;
				},
				content: [() => {
					target.draw();
				}, () => {
					Evt.card = result[0];
					if (target.hasUseTarget(Evt.card)) {
						target.chooseUseTarget(Evt.card, '是否立即使用该牌（' + get.translation(Evt.card) + '）？');
					}
				}],
				ai: {
					order: 6,
					result: {
						target: 1,
					},
					expose: 0.1,
				},
			},
			//re星姐
			cansha: {
				audio: 4,
				trigger: { player: 'useCardAfter' },
				priority: 3,
				filter(Evt: { cards: string | any[]; targets: string | any[]; card: any; result: { bool: boolean; }; iswuxied: any; }, player: any) {
					return Evt.cards.length && Evt.targets.length && (get.name(Evt.card) == 'sha' || get.name(Evt.card) == 'guohe')
						&& !(Evt.result.bool == false || Evt.iswuxied);
				},
				content() {
					if (get.name(trigger.card) == 'sha') {
						player.chooseUseTarget({ name: 'guohe', isCard: false }, false);
					} else if (get.name(trigger.card) == 'guohe') {
						player.chooseUseTarget({ name: 'sha', isCard: false }, false);
					}
				},
				ai: {
					useSha: 2,
					skillTagFilter(player: { countCards: (arg0: string, arg1: string) => number; }, tag: any, arg: any) {
						if (player.countCards('h', 'guohe') > 0) return true;
					},
					effect: {
						player(card: { name: any; }, player: any, target: any, current: number) {
							if (['sha', 'guohe'].contains(card.name) && current < 0) return [0, 0.9];
						}
					}
				}
			},
			//reAKI
			re_huichu: {
				trigger: {
					global: 'phaseBegin',
				},
				round: 1,
				filter(Evt, player: PlayerModel) {
					return player.countCards('h');
				},
				check(Evt, player: PlayerModel) {
					if (player.countCards('h') == player.countCards('h', { color: 'red' })) return get.recoverEffect(Evt.player, player, player) > 0;
					return true;
				},
				content: [() => {
					player.showHandcards();
					Evt.chk = player.countCards('h') == player.countCards('h', { color: 'red' });
				}, () => {
					if (Evt.chk) {
						trigger.player.recover();
					}
				}, () => {
					if (!Evt.chk) {
						player.chooseCard("###『烩料』###重铸任意张手牌", 'h', [1, Infinity]).set('ai', (card: any) => {
							return 6.5 - get.value(card);
						});
					}
				}, () => {
					if (!Evt.chk && result.bool && result.cards.length) {
						player.lose(result.cards, ui.discardPile).set('visible', true);
						player.$throw(result.cards, 1000);
						game.log(player, '将', result.cards, '置入了弃牌堆');
						player.draw(result.cards.length);
					}
				}]
			},
			//re梅露
			fuyi: {
				init(player: { $: { [x: string]: boolean; }; }, skill: string | number) {
					if (!player.$[skill]) player.$[skill] = (game.roundNumber % 2 == 1);
				},
				mod: {
					globalFrom(from: { $: { fuyi: any; }; }, to: any, current: number) {
						if (from.$.fuyi) return current - 1;
					},
					globalTo(from: any, to: { $: { fuyi: any; }; }, current: number) {
						if (!to.$.fuyi) return current + 1;
					},
				},
				trigger: { global: 'roundStart' },
				locked: true,
				direct: true,
				content() {
					player.$.fuyi = (game.roundNumber % 2 == 1);
				},
			},
			xihun: {
				trigger: { global: 'damageEnd' },
				frequent: true,
				usable: 1,
				filter(Evt: { card: any; }, player: { hasSkill: (arg0: string) => any; }) {
					return Evt.card && get.name(Evt.card) == 'sha' && !player.hasSkill('xihun_used');
				},
				content: [() => {
					player.draw();
				}, () => {
					if (player.getHandcardLimit() < player.countCards('h')) {
						player.addTempSkill('xihun_used', 'roundStart');
					}
				}],
				subSkill: { used: {} },
			},
			//reMIKO
			huangyou: {
				enable: 'phaseUse',
				filterCard(card: any) {
					return get.color(card) == 'red';
				},
				selectCard: 2,
				position: 'he',
				filter(Evt: any, player: { countCards: (arg0: string, arg1: { color: string; }) => number; hasSkill: (arg0: string) => any; }) {
					return player.countCards('he', { color: 'red' }) > 1 && !player.hasSkill('huangyou_used');
				},
				content: [() => {
					if (player.hp == player.maxHp) {
						player.draw(3);
						Evt.goto(4);
					}
				}, () => {
					var list = ['摸三张牌', '回复体力'];
					Evt.videoId = lib.status.videoId++;
					game.broadcastAll(function (id: any, list: any) {
						var dialog = ui.create.dialog('选择一项', [list, 'vcard']);
						dialog.videoId = id;
					}, Evt.videoId, list);
				}, () => {
					player.chooseButton(true).set('dialog', Evt.videoId);
				}, () => {
					game.broadcastAll('closeDialog', Evt.videoId);
					if (result.buttons[0].link[2] == '摸三张牌') {
						player.draw(3);
					}
					if (result.buttons[0].link[2] == '回复体力') {
						player.recover();
					}
				}, () => {
					player.judge((card: any) => {
						if (get.suit(card, player) == 'heart') return 4;
						else {
							player.addTempSkill('huangyou_used');
							return -1;
						}
					});
				}],
				ai: {
					order: 8,
					result: {
						player: 1,
					},
				},
				subSkill: {
					used: {},
				},
			},
			qidao: {
				trigger: {
					global: "judge",
				},
				filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
					return player.countCards('he') > 0;
				},
				direct: true,
				priority: 1,
				content: [() => {
					player.chooseToDiscard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
						get.translation(trigger.player.judging[0]) + '，' + get.prompt('qidao'), 'he', (card: any) => {
							return true;
						}).set('ai', (card: any) => {
							var trigger = _status.event.getTrigger();
							var player = _status.event.player;
							var judging = _status.event.judging;
							var result = trigger.judge(judging);
							var attitude = get.attitude(player, trigger.player);
							if (attitude == 0 || result == 0) return 0;
							if (attitude > 0) {
								return (-result) - get.value(card) + Math.random();
							}
							else {
								return result - get.value(card);
							}
						}).set('judging', trigger.player.judging[0]);
				}, () => {
					if (result.bool) {
						trigger.player.judge();
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (trigger.player.judging[0].clone) {
						trigger.player.judging[0].clone.classList.remove('thrownhighlight');
						game.broadcast(function (card) {
							if (card.clone) {
								card.clone.classList.remove('thrownhighlight');
							}
						}, trigger.player.judging[0]);
						game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
					}
					game.cardsDiscard(trigger.player.judging[0]);
					trigger.player.judging[0] = result.card;
					trigger.orderingCards.add(result.card);
					game.log(trigger.player, '重新判定后的判定牌为', result.card);
					game.delay(0.5);
				}],
			},
			//re夏色祭
			re_huxi: new toSkill('trigger',{
				audio: 'huxi',
				filter(Evt, player: PlayerModel) {
					if (!player.$.re_huxiGroup) player.$.re_huxiGroup = []
					return game.hasPlayer(cur => {
						return !player.$.re_huxiGroup.contains(cur) && cur != player;
					}) && Evt.getParent().skill != 're_huxi' && Evt.getParent(2).skill != 're_huxi' && Evt.getParent(3).skill != 're_huxi';
				},
				content: [() => {
					player.chooseCardTarget('『呼吸』：请选择呼吸的对象与交换的牌', true).set('type', 'compare')
						.set('filterTarget', function (card, player, target) {
							if (player.$.re_huxiGroup && player.$.re_huxiGroup.contains(target)) return false;
							return target != player && player.countCards('h') && target.countCards('h');
						})
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						game.log(player, '想要呼吸', Evt.target);
						Evt.card1 = result.cards[0];
						Evt.target.chooseCard('『呼吸』：请选择交换的牌', true).set('type', 'compare');
					} else {
						Evt.finish();
					}
				}, () => {
					Evt.card2 = result.cards[0];
					if (!Evt.resultOL && Evt.ol) {
						game.pause();
					}
				}, () => {
					player.$.re_huxiGroup.add(target);
					player.lose(Evt.card1, ui.ordering);
					Evt.target.lose(Evt.card2, ui.ordering);
				}, () => {
					game.broadcast(function () {
						ui.arena.classList.add('thrownhighlight');
					});
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(Evt.card1, Evt.target, Evt.card2);
					game.log(player, '的交换牌为', Evt.card1);
					game.log(Evt.target, '的交换牌为', Evt.card2);
					Evt.num1 = Evt.card1.number;
					Evt.num2 = Evt.card2.number;
					Evt.trigger('compare');
					game.delay(0, 1500);
				}, () => {
					Evt.result = {
						getC: Evt.card2,
					}
					var str;
					str = get.translation(player.name) + '想要呼吸' + get.translation(Evt.target.name);
					game.broadcastAll(function (str: any) {
						var dialog = ui.create.dialog(str);
						dialog.classList.add('center');
						setTimeout(() => {
							dialog.close();
						}, 1000);
					}, str);
					game.delay(2);
				}, () => {
					if (typeof Evt.target.ai.shown == 'number' && Evt.target.ai.shown <= 0.85 && Evt.addToAI) {
						Evt.target.ai.shown += 0.1;
					}
					player.gain(Evt.card2, 'visible');
					player.$gain2(Evt.card2);
					game.delay(1);
					target.gain(Evt.card1, 'visible');
					target.$gain2(Evt.card1);
					game.broadcastAll(function () {
						ui.arena.classList.remove('thrownhighlight');
					});
					game.addVideo('thrownhighlight2');
					if (Evt.clear !== false) {
						game.broadcastAll(ui.clear);
					}
					if (typeof Evt.preserve == 'function') {
						Evt.preserve = Evt.preserve(Evt.result);
					}
				}, () => {
					if (get.color(Evt.result.getC) == 'red') {
						player.draw(1);
						if (!player.hasSkill('re_huxi_buff')) {
							game.putBuff(player, 're_huxi', '.player_buff')
							player.addTempSkill('re_huxi_buff', 'none');
						}
					}
				}],
				onremove(player, skill) {
					delete player.$.re_huxiGroup
					game.clearBuff(player, 're_huxi')
				},
				group: 're_huxi_clear',
				subSkill: {
					buff: {
						trigger: {
							player: 'useCard'
						},
						firstDo: true,
						direct: true,
						filter(Evt: { card: any; }, player: any) {
							return get.name(Evt.card) == 'sha';
						},
						onremove(player, skill) {
							game.clearBuff(player, 're_huxi')
						},
						content() {
							player.removeSkill('re_huxi_buff');
							if (trigger.addCount !== false) {
								trigger.addCount = false;
								var stat = player.getStat();
								if (stat && stat.card && stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
							}
							game.log(trigger.card, '伤害+1');
							if (typeof trigger.baseDamage != 'number') trigger.baseDamage = 1;
							trigger.baseDamage++;
						},
					},
					clear: {
						firstDo: true,
						silent: true,
						direct: true,
						trigger: {
							player: 'phaseAfter'
						},
						content() {
							delete player.$.re_huxiGroup;
						}
					}
				}
			}).setT('gainEnd'),
			//re赤心
			xinchixin: {
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt: { name: string; getParent: () => { (): any; new(): any; name: string; relatedEvent: { (): any; new(): any; name: string; }; }; position: any; cards: any[]; }, player: { $: { xinchixin: any[]; }; }) {
					if (Evt.name == 'cardsDiscard' && Evt.getParent().name == 'orderingDiscard' && Evt.getParent().relatedEvent.name == 'useCard') return false;
					if (Evt.name == 'lose' && (Evt.getParent().name == 'useCard' || Evt.position != ui.discardPile)) return false;
					var list = Evt.cards.filter((card: any) => {
						if (player.$.xinchixin && player.$.xinchixin.contains(card)) return false;
						return get.suit(card) == 'heart' && get.position(card) == 'd';
					});
					return list.length > 0;
				},
				direct: true,
				content: [() => {
					Evt.cards = trigger.cards.filterInD('d');
				}, () => {
					Evt.videoId = lib.status.videoId++;
					var dialogx = ['###『赤心』：进入弃牌堆的牌###获得其中一张红色牌；或将其中任意张牌置于牌堆顶（先选择的在上）'];
					dialogx.push(Evt.cards);
					if (player.isOnline2()) {
						player.send(function (dialogx: any, id: any) {
							ui.create.dialog.apply(null, dialogx).videoId = id;
						}, dialogx, Evt.videoId);
					}
					Evt.dialog = ui.create.dialog.apply(null, dialogx);
					Evt.dialog.videoId = Evt.videoId;
					if (player != game.me || _status.auto) {
						Evt.dialog.style.display = 'none';
					}
					let next = player.chooseButton()
						.set('selectButton', () => {
							if (ui.selected.buttons.length == 0) return 2;
							else if (get.color(ui.selected.buttons[0].link) == 'red' && ui.dialog.buttons.length == 1) return 1;
							return [1, Infinity];
						})
						.set('dialog', Evt.videoId)
						.set('ai', function (button: string) {
							return get.value(button.link) && ui.selected.buttons.length == 1;
						})
						.set('forceAuto', () => {
							return ui.selected.buttons.length == ui.dialog.buttons.length || ui.dialog.buttons.length == 1;
						});
				}, () => {
					if (result.bool) {
						Evt.links = result.links;
						var controls = ['取消选择', '将这些牌置于牌堆顶', '获得这张牌'];
						if (Evt.links.length != 1 || get.color(Evt.links[0]) != 'red') {
							controls.splice(2, 1);
						}
						var func = function (cards: string | any[], id: any) {
							var dialog = get.idDialog(id);
							if (dialog) {
								for (var j = 0; j < cards.length; j++) {
									for (let i of dialog.buttons) {
										if (i.link == cards[j]) {
											i.classList.add('glow');
										}
										else {
											i.classList.add('unselectable');
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
						player.chooseControl(controls).set('ai', function (Evt: any, player: any) {
							return _status.event.index;
						}).set('index', 2);
					} else {
						if (player.isOnline2()) {
							player.send('closeDialog', Evt.videoId);
						}
						Evt.dialog.close();
						Evt.finish();
					}
				}, () => {
					switch (result.index) {
						case 0: {
							Evt.goto(1);
							break;
						}
						case 1: {
							var list = Evt.links.slice(0);
							while (list.length) {
								ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
							}
							game.log(player, '将牌放在牌堆顶')
							break;
						}
						case 2: {
							if (!player.$.xinchixin) player.$.xinchixin = [];
							player.$.xinchixin.addArray(Evt.links)
							player.gain(Evt.links);
							game.log(player, '获得了', Evt.links);
							break;
						}
					}
				}, () => {
					if (player.isOnline2()) {
						player.send('closeDialog', Evt.videoId);
					}
					Evt.dialog.close();
				}],
				group: 'xinchixin_clear',
				subSkill: {
					clear: {
						trigger: { global: 'phaseAfter' },
						priority: 23,
						forced: true,
						silent: true,
						popup: false,
						content() {
							if (player.$.xinchixin && player.$.xinchixin.length) {
								player.$.xinchixin.length = 0;
							}
						}
					}
				},
			},
			//re粽子
			juebi: {
				group: ['juebi_shan', 'juebi_dam'],
				subSkill: {
					shan: {
						enable: ['chooseToUse', 'chooseToRespond'],
						filterCard(card) {
							return get.type(card) != 'basic';
						},
						viewAs: { name: 'shan' },
						position: 'hes',
						prompt: '将一张非基本牌当【闪】使用或打出',
						check(card: any) { return 8 - get.value(card) },
						filter(Evt: any, player: { getStat: () => { (): any; new(): any; damaged: any; }; }) {
							return !player.getStat().damaged;
						},
					},
					dam: {
						trigger: { player: 'damageEnd' },
						priority: 199,
						direct: true,
						filter(Evt, player: { hasSkill: (arg0: string) => any; }) {
							return !player.hasSkill('juebi_addDam');
						},
						content() {
							player.addTempSkill('juebi_addDam', 'phaseAfter');
						},
					},
					addDam: {
						marktext: '壁',
						mark: true,
						intro: {
							content: '可以令下一次造成的伤害+1',
							name: '绝壁狂怒',
						},
						trigger: { source: 'damageBegin2' },
						priority: 199,
						forced: true,
						silent: true,
						popup: false,
						content: [() => {
							player.chooseBool('###『绝壁』###是否令本次造成的伤害+1', () => {
								return get.attitude(player, trigger.player) < 0;
							});
						}, () => {
							if (result.bool) {
								player.logSkill('juebi', trigger.player);
								trigger.num++;
							}
							if (player.hasSkill('juebi_addDam')) player.removeSkill('juebi_addDam');
						}],
						ai: {
							damageBonus: true,
						},
					}
				}
			},
			zhanhou: {
				group: ['zhanhou_damage', 'zhanhou_recover'],
				subSkill: {
					damage: {
						trigger: { player: 'phaseUseBegin' },
						priority: 199,
						check(Evt: any, player: { getCardUsable: (arg0: string) => any; hp: number; }) {
							return player.getCardUsable('shunshou') && player.hp > 1;
						},
						prompt2: '『战吼』出牌阶段开始时，你可以受到1点伤害，视为使用一张【顺手牵羊】。',
						content: [() => {
							player.damage('nosource');
						}, () => {
							player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】', { name: 'shunshou' }, true);
						}],
					},
					recover: {
						trigger: { global: 'dieAfter' },
						priority: 199,
						filter(Evt: any, player: { hp: number; maxHp: number; }) {
							return player.hp < player.maxHp;
						},
						prompt2: '『战吼』其他角色阵亡时，你可以回复1点体力，视为使用一张【顺手牵羊】。',
						content: [() => {
							player.recover();
						}, () => {
							player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】', { name: 'shunshou' }, true);
						}],
					}
				}
			},
			//rePEKO
			qiangyun: {
				trigger: { global: 'judge' },
				filter(Evt: { player: any; }, player: { countCards: (arg0: string) => number; }) {
					return player == Evt.player && player.countCards('he') > 0;
				},
				direct: true,
				priority: 2,
				content: [() => {
					player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
						get.translation(trigger.player.judging[0]) + '，' + get.prompt('qiangyun'), 'he', (card: any) => {
							return true;
						}).set('ai', (card: any) => {
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
				}, () => {
					if (result.bool) {
						Evt.card = result.cards[0];
						player.addTempSkill('qiangyun2');
						player.$.qiangyun2 = [Evt.card];
						player.respond(Evt.card, 'highlight');
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						if (trigger.player.judging[0].clone) {
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function (card) {
								if (card.clone) {
									card.clone.classList.remove('thrownhighlight');
								}
							}, trigger.player.judging[0]);
							game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						//				player.$gain2(trigger.player.judging[0]);
						//				player.gain(trigger.player.judging[0]);
						trigger.player.judging[0] = Evt.card;
						if (!get.owner(Evt.card, 'judge')) {
							trigger.position.appendChild(Evt.card);
						}
						game.log(trigger.player, '的判定牌改为', Evt.card);
					} else {
						Evt.finish();
					}
				}, () => {
					game.delay(2.5);
				}],
			},
			qiangyun2: {
				init(player: PlayerModel, skill: string) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { global: 'judgeAfter' },
				filter(Evt: any, player: { hasUseTarget: (arg0: any) => any; $: { qiangyun2: any[]; }; }) {
					return player.hasUseTarget(player.$.qiangyun2[0]);
				},
				direct: true,
				priority: 2,
				content() {
					Evt.card = player.$.qiangyun2[0];
					player.addTempSkill('qiangyun3', 'useCardAfter');
					player.$.qiangyun3 = [Evt.card];
					player.chooseUseTarget('是否使用' + get.translation(Evt.card), Evt.card, false, 'noanimate');
					if (player.hasSkill('qiangyun2')) player.removeSkill('qiangyun2');
				},
				onremove(player: { $: { qiangyun2: any; }; }) {
					delete player.$.qiangyun2;
				}
			},
			qiangyun3: {
				init(player: PlayerModel, skill: string) {
					if (!player.$[skill]) player.$[skill] = [];
				},
				trigger: { source: 'damageEnd' },
				filter(Evt: { cards: any[]; }, player: { $: { qiangyun3: any[]; }; }) {
					return Evt.cards && player.$.qiangyun3.contains(Evt.cards[0]);
				},
				direct: true,
				priority: 2,
				content() {
					player.draw();
				},
				onremove(player: { $: { qiangyun3: any; }; }) {
					delete player.$.qiangyun3;
				},
			},
			tuquan: {
				audio: 4,
				trigger: { player: 'shaMiss' },
				forced: true,
				content: [() => {
					player.judge((card: any) => {
						if (get.suit(card) == 'spade') {
							return 1;
						}
						else if (get.suit(card) == 'heart') {
							return -1;
						}
						return 0;
					});
				}, () => {
					if (result.bool) {
						if (result.suit == 'spade') {
							player.discardPlayerCard('结果为♠，请弃置对方一张牌', trigger.target, 'he', true);
						} else if (result.suit == 'heart') {
							player.chooseToDiscard('结果为♥，请弃置一张牌', 'he', true);
						}
					}
				}],
			},
			//re希桃
			re_doupeng: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card: any, player: { canCompare: (arg0: any) => any; }, target: any) {
					return player.canCompare(target);
				},
				filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
					return player.countCards('h') > 0;
				},
				content: [() => {
					player.chooseToCompare(target).set('small', get.recoverEffect(player, target, target) > 0);
				}, () => {
					Evt.winner = result.winner;
					if (Evt.winner) {
						Evt.winner.draw(2);
					}
					else Evt.finish()
				}, () => {
					if (Evt.winner != player) {
						player.chooseBool('是否使对方回复一点体力').set('ai', () => {
							return _status.event.check;
						}).set('check', get.recoverEffect(target, player, player) > 0);
					}
					else Evt.goto(Evt.step + 2);
				}, () => {
					if (result.bool) {
						target.recover(player);
					}
				}, () => {
					if (Evt.winner != target) {
						target.chooseBool('是否使对方回复一点体力').set('ai', () => {
							return _status.event.check;
						}).set('check', get.recoverEffect(player, target, target) > 0);
					}
					else Evt.finish();
				}, () => {
					if (result.bool) {
						player.recover(target);
					}
				}],
				ai: {
					order: 8,
					result: {
						player: 0.6,
						target: 0.6,
					},
				},
			},
			re_xuyan: {
				trigger: { player: 'phaseJieshuBegin' },
				content: [() => {
					player.chooseTarget(1, '选择观察目标', function (card: any, player: any, target: any) {
						return player != target;
					});
				}, () => {
					if (result.bool) {
						result.targets[0].addSkill('re_xuyan_mark');
					}
				}],
				group: ['re_xuyan_damage'],//'re_xuyan_phaseStart',
				subSkill: {
					mark: {
						mark: true,
						intro: {
							content: '造成伤害被列入了观察项目'
						},
					},
					damage: {
						trigger: { global: 'damageAfter' },
						forced: true,
						filter(Evt, player) {
							return Evt.source && Evt.source.hasSkill('re_xuyan_mark');
						},
						content() {
							player.draw()
							// player.addSkill('re_xuyan_damaged');
						}
					},
					// damaged: {
					// 	mark: true,
					// 	marktext: '伤',
					// 	intro: {
					// 		content: '观察目标造成了伤害'
					// 	},
					// },
					// phaseStart: {
					// 	trigger: { player: 'phaseBegin' },
					// 	forced: true,
					// 	filter(Evt: any, player: { hasSkill: (arg0: string) => any; }) {
					// 		return player.hasSkill('re_xuyan_damaged') || player.hasSkill('re_xuyan_dead') || game.filterPlayer((cur: { hasSkill: (arg0: string) => any; }) => {
					// 			if (cur.hasSkill('re_xuyan_mark')) {
					// 				return true;
					// 			}
					// 			else
					// 				return false;
					// 		}).length > 0
					// 	},
					// 	content: [() => {
					// 		game.filterPlayer((cur: { hasSkill: (arg0: string) => any; removeSkill: (arg0: string) => void; }) => {
					// 			if (cur.hasSkill('re_xuyan_mark')) {
					// 				cur.removeSkill('re_xuyan_mark');
					// 				return true;
					// 			}
					// 			else
					// 				return false;
					// 		});
					// 	}, () => {
					// 		if (player.hasSkill('re_xuyan_damaged')) {
					// 			player.draw(1);
					// 			player.removeSkill('re_xuyan_damaged');
					// 		} else {
					// 			player.chooseTarget(true, '令一名角色与你各失去1点体力').set('ai', function (target: any) {
					// 				var player = _status.event.player;
					// 				return 2 - get.attitude(player, target);
					// 			});
					// 		}
					// 	}, () => {
					// 		if (result.bool) {
					// 			player.loseHp();
					// 			result.targets[0].loseHp();
					// 		}
					// 	}]
					// },
				}
			},
			//re犬山
			re_hundunliandong: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card: any, player: any, target) {
					if (target.hasSkill('homolive')) {
						for (let i of ui.selected.targets) {
							if (i.hasSkill('homolive')) return false;
						}
					}
					else {
						for (let i of ui.selected.targets) {
							if (i.group == target.group) return false;
						}
					}
					return target.countCards('he');
				},
				selectTarget: [1, Infinity],
				complexTarget: true,
				multitarget: false,
				content() {
					target.chooseToDiscard(true, 1, 'he', '『混沌联动』：弃置一张牌');
				},
				ai: {
					order: 8,
					result: {
						target(player: any, target: any) {
							return lib.card.guohe_copy2.ai.result.target.apply(this, arguments);
						},
					},
				},
			},
			//reMEA
			fengna: {
				audio: 'luecai',
				enable: 'phaseUse',
				filter(Evt: any, player: { hasSkill: (arg0: string) => any; isMaxHandcard: () => any; }) {
					return !player.hasSkill('fengna_used') && !player.isMaxHandcard();
				},
				filterTarget(card: any, player: { countCards: (arg0: string) => number; }, target: { countCards: (arg0: string) => number; }) {
					if (player == target) return false;
					return target.countCards('h') > player.countCards('h');
				},
				selectTarget: -1,
				multitarget: false,
				content: [() => {
					target.chooseCard('he', '『奉纳』：将一张牌交给' + get.translation(player), true);
				}, () => {
					player.gain(result.cards[0], target, 'giveAuto');
					player.addTempSkill('fengna_used', 'phaseUseEnd')
				}],
				ai: {
					threaten: 1.8,
					order: 4,
					result: {
						target(player: any, target: any) {
							return lib.card.shunshou_copy2.ai.result.target.apply(this, arguments);
						},
						player(player: any, target: any) {
							return lib.card.shunshou_copy2.ai.result.player.apply(this, arguments);
						},
					},
				},
				subSkill: {
					used: {}
				},
			},
			re_xiaoyan: {
				audio: 'xiaoyan',
				direct: true,
				trigger: {
					player: "useCard",
				},
				content() {
					trigger.directHit.addArray(game.filterPlayer((cur: { countCards: (arg0: string) => number; }) => {
						return cur.countCards('h') < player.countCards('h')
					}));
				},
			},
			//reOto
			re_yuxia: {
				audio: 'yuxia',
				hiddenCard(player: { getStat: (arg0: string) => { (): any; new(): any; re_yuxia: any; }; }, name: any) {
					if (!lib.skill.re_yuxia.filter(false, player) || player.getStat('skill').re_yuxia) return false;
					let list = get.inpile('trick');
					return list.contains(name);
				},
				enable: 'chooseToUse',
				filter(Evt: any, player: { countCards: (arg0: string) => number; getStat: (arg0: string) => { (): any; new(): any; re_yuxia: any; }; }) {
					return player.countCards('he') >= 3 && !player.getStat('skill').re_yuxia;
				},
				chooseButton: {
					dialog(Evt: any, player: any) {
						let list = get.inpile('trick');
						for (let i = 0; i < list.length; i++) {
							list[i] = ['锦囊', '', list[i]];
						}
						return ui.create.dialog('『龙箱』', [list, 'vcard']);
					},
					filter(button: { link: any[]; }, player: any) {
						return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
					},
					check(button: { link: any[]; }) {
						let player = _status.event.player;
						if (player.countCards('h', button.link[2]) > 0) return 0;
						if (['wugu', 'jingluo'].contains(button.link[2])) return 0;
						let effect = player.getUseValue(button.link[2]);
						if (effect > 0) return effect;
						return 0;
					},
					backup(links: any[][], player: any) {
						return {
							audio: 'yuxia',
							filterCard(card: any) {
								return true;
							},
							selectCard: 3,
							forceAuto() {
								return ui.selected.buttons.length == 3;
							},
							popname: true,
							check(card: any) {
								return 7 - get.value(card);
							},
							position: 'he',
							viewAs(cards: any, player: any) {
								var number = 0;
								for (let i of cards) {
									number += get.number(i);
								}
								if (number) return { name: links[0][2], nature: links[0][3], number: number };
								return { name: links[0][2], nature: links[0][3] };
							},
						}
					},
					prompt(links: any[][], player: any) {
						return '###『龙箱』###将三张牌当做【' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '】使用';
					}
				},
				ai: {
					order: 6,
					result: { player: 1 },
				},
				group: 're_yuxia_after',
				subSkill: {
					after: {
						trigger: { player: 'useCardEnd' },
						priority: 66,
						forced: true,
						silent: true,
						popup: false,
						filter(Evt: { cards: string | any[]; skill: string; }, player: any) {
							return Evt.cards.length == 3 && Evt.skill == 're_yuxia_backup' && get.position(Evt.cards[0]) == 'd';
						},
						content: [() => {
							Evt.cards = trigger.cards.filterInD();
							game.broadcastAll(function (player: { chooseCardButton: (arg0: number[], arg1: boolean, arg2: any, arg3: string) => { (): any; new(): any; set: { (arg0: string, arg1: (button: any) => any): void; new(): any; }; }; }, cards: any) {
								player.chooseCardButton([0, 1], true, cards, '『龙箱』：可以将其中一张牌置于牌堆顶').set('ai', function (button: string) {
									return get.value(button.link) + Math.random();
								});
							}, player, Evt.cards);
						}, () => {
							if (result.bool && result.links) {
								var list = result.links.slice(0);
								Evt.cards.removeArray(list);
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
			hanyin: {
				trigger: { global: ['useCard', 'respond'] },
				frequent: true,
				filter(Evt: { respondTo: any[]; cards: { filter: (arg0: (i: any) => boolean) => { (): any; new(): any; length: any; }; }; card: any; }, player: any) {
					if (Array.isArray(Evt.respondTo) && Evt.respondTo[0] == player) {
						var num = get.number(Evt.respondTo[1]);
						return (Evt.cards && Evt.cards.filter(function (i: any) {
							return get.number(i) < num;
						}).length) || get.number(Evt.card) < num;
					};
				},
				content() {
					player.draw();
				},
				ai: {
					effect: {
						player(card: any, player: any) {
							if (['nanman', 'wanjian', 'haixiao'].contains(get.name(card))) {
								var num = game.countPlayer((cur: any) => {
									return cur != player;
								});
								if (get.number(card)) num *= get.number(card) / 12;
								return [1, num];
							}
						}
					},
					directHit_ai: true,
					skillTagFilter(player: any, tag: string, arg: { target: any; card: any; }) {
						if (tag == 'directHit_ai' && arg) {
							if (get.attitude(arg.target, player) > 0) return false;
							return get.number(arg.card) && get.number(arg.card) >= 13;
						}
					},
				},
			},
			//re团长
			re_huange: {
				trigger: { global: 'phaseBegin' },
				round: 1,
				priority: 996,
				filter(Evt, player: PlayerModel) {
					return game.countPlayer((cur: { hp: number; }) => {
						return cur.hp != Infinity;
					});
				},
				check(Evt, player: PlayerModel) {
					if (Evt.player != player && get.attitude(Evt.player, player) < 0 && Evt.player.inRange(player)) return true;
					return Evt.player == player && !player.hasJudge('lebu') && (!player.hasUnknown(2) || !player.needsToDiscard());
				},
				content: [() => {
					player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌', true, function (card: any, player: any, target: { hp: number; }) {
						return target.hp != Infinity;
					})
						.set('ai', function (target: { hp: number; }) {
							if (player.inRange(target)) return 2 - get.attitude(player, target);
							else return target.hp - (get.attitude(player, target) / 2);
						})
				}, () => {
					if (result.bool && result.targets?.length) {
						player.logSkill('re_huange', result.targets);
						player.draw(result.targets[0].hp);
						player.$.re_huange_disc = result.targets[0];
						player.addTempSkill('re_huange_disc');
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
						filter(Evt: any, player: { countDiscardableCards: (arg0: any, arg1: string) => any; }) {
							return player.countDiscardableCards(player, 'he');
						},
						content: [() => {
							if (player.$.re_huange_disc.isIn() && player.countCards('he')) {
								player.chooseToDiscard('he', `###『幻歌』###弃置${get.cnNumber(player.$.re_huange_disc.hp)}张牌`, player.$.re_huange_disc.hp, true);
							}
						}],
					}
				},
			},
			//re猫猫
			re_jiumao: {
				audio: 'jiumao',
				group: ['re_jiumao_put', 're_jiumao_use', 're_jiumao_jiesuan'],
				subSkill: {
					put: {
						trigger: {
							global: 'phaseDiscardBegin',
						},
						filter(Evt: { player: any; }, player: any) {
							return player != Evt.player;
						},
						frequent: true,
						content: [() => {
							trigger.player.chooseCard('###' + get.prompt('re_jiumao', player) + '###将任意张手牌交给' + get.translation(player), 'he', [1, Infinity]).set('ai', (card: any) => {
								var player = _status.event.player;
								var source = _status.event.source;
								if (get.attitude(player, source) <= 0) return -1;
								if (!source.needsToDiscard() && !ui.selected.cards.length) return get.value(card, target) - get.value(card, player) + 4;
								if (player.needsToDiscard() && ui.selected.cards.length < (player.countCards('h') - source.countCards('h')) / 2) return get.value(card, target) - get.value(card, player) + 1;
								else return get.value(card, target) - get.value(card, player) - 2;
							}).set('source', player);
						}, () => {
							if (result.bool) {
								trigger.player.logSkill('re_jiumao', player);
								trigger.player.give(result.cards, player);
							}
							else Evt.finish();
						}, () => {
							if (player.countCards('h') == trigger.player.countCards('h')) {
								trigger._re_jiumao = true;
							}
							game.delayx();
						}]
					},
					use: {
						trigger: {
							global: 'phaseDiscardEnd',
						},
						filter(Evt: { player: any; _re_jiumao: boolean; }, player: any) {
							return player != Evt.player && Evt._re_jiumao == true;
						},
						direct: true,
						content: [() => {
							player.chooseCardTarget({
								position: 'hs',
								filterCard: true,
								prompt: get.prompt('re_jiumao') + '使用一张牌并使其额外结算一次',
								filterTarget(card: any, player: any, target: any) {
									return lib.filter.filterTarget.apply(this, arguments);
								},
								ai1(card: any, player: any, target: any) {
									if (get.type(card) != 'equip' && get.name(card) != 'jiu') return get.order(card);
									return 0;
								},
								ai2(card: any, player: any, target: any) {
									if (!_status.event.check) return 0;
									return get.effect(target, { name: 'sha' }, _status.event.player);
								}
							});
						}, () => {
							if (result.bool && result.targets?.length) {
								player.useCard(result.cards[0], result.targets, result.cards, false).set('addedSkill', 're_jiumao_use');
							}
						}]
					},
					jiesuan: {
						trigger: { player: 'useCardAfter' },
						forced: true,
						priority: 42,
						filter(Evt: { addedSkill: string; }, player: any) {
							return Evt.addedSkill == 're_jiumao_use';
						},
						content() {
							var card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
							player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = trigger.skill || 're_jiumao_jiesuan';
						}
					},
				}
			},
			re_enfan: {
				audio: 'shiqi',
				trigger: {
					global: 'dying'
				},
				filter(Evt: { player: any; }, player: { countCards: (arg0: string) => any; }) {
					return player.countCards('h') && Evt.player != player;
				},
				direct: true,
				content: [() => {
					player.chooseCard([1, Infinity], get.prompt2('re_enfan'), 'he').set('ai', (card: any) => {
						if (!_status.event.check) return 0;
						return 6 - get.value(card);
					}).set('check', get.attitude(player, trigger.player) > 0);
				}, () => {
					if (result.bool) {
						Evt.target = trigger.player;
						player.logSkill('re_enfan', Evt.target);
						player.give(result.cards, Evt.target, 'giveAuto');
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.target.countCards('h')) {
						let cardResult = () => {
							var cards = Evt.target.getCards('he');
							var l = cards.length;
							var all = Math.pow(l, 2);
							var list = [];
							for (var i = 1; i < all; i++) {
								var array = [];
								for (var j = 0; j < l; j++) {
									if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
								}
								var types: any[] = [];
								for (var k of array) {
									types.add(get.type2(k));
								}
								if (types.length == 3) list.push(array);
							}
							if (list.length) {
								var sortx = function (x: any[]) {
									var num = get.value(x);
									if (x.filter(function (y: any) {
										return get.color(y) == 'red';
									}).length && x.filter(function (y: any) {
										return get.color(y) == 'black';
									}).length) num -= 4;
									return num;
								}
								list.sort(function (a, b) {
									var numa = sortx(a);
									var numb = sortx(b);
									return numa - numb;
								});
								return list[0];
							}
							return list;
						}
						Evt.target.chooseToDiscard([1, Infinity], true, 'he').set('complexCard', true).set('cardResult', cardResult()).set('ai', (card: any) => {
							if (!_status.event.cardResult.length) return 0 - get.value(card);
							if (!_status.event.cardResult.contains(card)) return 0;
							return 10;
						});
					} else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						if (get.type3(result.cards, 'trick').length >= 3) {
							Evt.target.recover();
						}
						if (get.color3(result.cards).length >= 2) {
							game.asyncDraw([Evt.target, player]);
						}
					}
				}]
			},
			//re三才
			re_yuzhan: {
				audio: 'xuanxu',
				enable: 'phaseUse',
				usable: 1,
				content: [() => {
					var cards = get.cards(4);
					Evt.cards = cards;
					var rednum = 0, blacknum = 0;
					for (var i = 0; i < cards.length; i++) {
						if (get.color(cards[i]) == 'red') rednum++;
						if (get.color(cards[i]) == 'black') blacknum++;
					}
					if ((rednum == 2 && blacknum == 2) || rednum == 4 || blacknum == 4) {
						let next = player.chooseCardButton(2, '预占:选择令当前回合角色获得其中一对', Evt.cards, true);
						next.set('filterButton', function (button: string) {
							for (var i = 0; i < ui.selected.buttons.length; i++) {
								if (get.color(ui.selected.buttons[i].link) != get.color(button.link)) return false;
							}
							return true;
						});
						next.set('ai', function (button: string) {
							if (_status.currentPhase != _status.event.player) {
								return -get.value(button.link, _status.event.player);
							}
							return get.value(button.link, _status.event.player);
						});
					}
					else {
						for (var i = Evt.cards.length - 1; i >= 0; i--) {
							ui.cardPile.insertBefore(Evt.cards[i], ui.cardPile.firstChild);
						}
						player.chooseToGuanxing(Evt.cards.length);
					}
				}, () => {
					if (result.bool && result.links?.length) {
						var player2 = _status.currentPhase;
						Evt.cards.remove(result.links[0]);
						Evt.cards.remove(result.links[1]);
						player2.gain(result.links, 'gain2');
						if (player != player2) {
							player.gain(Evt.cards, 'gain2');
							Evt.cards = [];
						}
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (_status.currentPhase == player && Evt.cards.length) {
						for (var i = Evt.cards.length - 1; i >= 0; i--) {
							ui.cardPile.insertBefore(Evt.cards[i], ui.cardPile.firstChild);
						}
						player.chooseToGuanxing(Evt.cards.length);
					}
				}],
				ai: {
					order: 8,
					result: {
						player: 1,
					},
				},
			},
			re_bizuo: {
				trigger: { global: 'phaseBegin' },
				round: 1,
				filter(Evt: any, player) {
					return _status.currentPhase && player.countCards('h');
				},
				check(Evt: { player: any; }, player: any) {
					return get.attitude(player, Evt.player) > 0;
				},
				content: [() => {
					Evt.target = trigger.player;
					Evt.precards = player.getCards('he')
					player.chooseToMove(get.$pro2('weizeng'))
						.set('list', [
							['牌堆顶'],
							['手牌&装备区', Evt.precards],
						])
						.set('reverse', (_status.currentPhase ? get.attitude(player, _status.currentPhase) > 0 : false))
						.set('processAI', function (list) {
							var cards = list[1][1].slice(0);
							cards.sort(function (a, b) {
								return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
							});
							return [cards.slice(0, 1)];
						})
				}, () => {
					if (result.bool && result.moved && result.moved[0].length) Evt.cards = result.moved[0].slice(0);
					if (!Evt.cards) {
						Evt.finish()
						return
					}
					player.logSkill('re_bizuo', trigger.player);
					player.lose(Evt.cards, ui.special);
					player.$throw(Evt.cards, 1000);
				}, () => {
					for (let v of Evt.cards) {
						v.fix();
						v.storage.bizuo = true;
						ui.cardPile.insertBefore(v, ui.cardPile.firstChild);
					}
					game.log(player, '将' + get.cnNumber(Evt.cards.length) + '张牌置于牌堆顶');
				}],
				derivation: 're_yuzhan',
				group: ['re_bizuo_use', 're_bizuo_end'],
				subSkill: {
					use: {
						trigger: {
							global: 'useCard',
						},
						check(Evt: any, player: any) {
							return true;
						},
						filter(Evt: { card; cards: string | any[]; }, player: any) {
							//if(player!=_status.currentPhase)	return false;
							if (Evt.card && Evt.card.storage && Evt.card.storage.bizuo == true) return true;
							if (Evt.cards && Evt.cards.length) {
								for (var i = 0; i < Evt.cards.length; i++) {
									if (Evt.cards[i].storage && Evt.cards[i].storage.bizuo == true) return true;
								}
							}
							return false;
						},
						prompt: '弼佐:是否发动一次【预占】？',
						content: [() => {
							player.useSkill('re_yuzhan', false);
						}, () => {
							if (trigger.card?.storage?.bizuo) delete trigger.card.storage.bizuo;
							if (trigger.cards?.length) {
								for (var i = 0; i < trigger.cards.length; i++) {
									if (trigger.cards[i].storage?.bizuo) delete trigger.cards[i].storage.bizuo;
								}
							}
						}]
					},
					end: {
						trigger: { global: 'phaseAfter' },
						direct: true,
						content() {
							for (var i = 0; i < ui.cardPile.childElementCount; i++) {
								if (ui.cardPile.childNodes[i].storage?.bizuo) {
									delete ui.cardPile.childNodes[i].storage.bizuo;
								}
							}
							for (var i = 0; i < ui.discardPile.childElementCount; i++) {
								if (ui.discardPile.childNodes[i].storage?.bizuo) {
									delete ui.discardPile.childNodes[i].storage.bizuo;
								}
							}
							var cards: any[] = [];
							for (var i = 0; i < game.players.length; i++) {
								var cards2 = game.players[i].getCards('hej');
								cards = cards.concat(cards2);
							}
							for (var i = 0; i < cards.length; i++) {
								if (cards[i].storage?.bizuo == true) {
									delete cards[i].storage.bizuo;
								}
							}
						}
					},
				},
				ai: {
					expose: 0.1,
				}
			},
			//re狗狗
			guiren: {
				audio: 2,
				enable: 'chooseToUse',
				viewAs: { name: 'sha' },
				selectCard: 2,
				complexCard: true,
				position: 'hes',
				filterCard(card: any) {
					if (ui.selected.cards.length) return get.color(card) != get.color(ui.selected.cards[0]);
					return true;
				},
				check(card: any) {
					if (ui.selected.cards.length && get.type(card, 'trick') != get.type(ui.selected.cards[0], 'trick')) return 10 - get.value(card);
					return 4 - get.value(card);
				},
				precontent: [() => {
					var cards = Evt.result.cards.slice(0);
					var types: any[] = [];
					for (var i = 0; i < cards.length; i++) {
						types.add(get.type(cards[i], 'trick'));
					}
					Evt.types = types;
					Evt.targets = Evt.result.targets.slice(0);
					Evt.getParent().addCount = false;
				}, () => {
					if (Evt.types.contains('basic')) {
						var list = get.info(Evt.result.card).nature.slice(0);
						list.remove('kami');
						list.push('cancel2');
						player.chooseControl(list).set('prompt', get.prompt('guiren')).set('prompt2', '将' + get.translation(Evt.result.card) + '转换为以下属性之一').set('ai', () => {
							var player = _status.event.player;
							var card = _status.event.card;
							if (get.name(card) == 'tao' && get.nature(card) == 'ocean') return 'cancel2';
							if (get.name(card) == 'tao' && get.nature(card) != 'ocean') return 'ocean';
							if (get.name(card) == 'sha') {
								var targets = _status.event.targets;
								for (var i = 0; i < targets.length; i++) {
									if (get.damageEffect(target, player, player)) {
										if (targets[i].hasSkillTag('nodamage')) return 'ice';
										if (!targets[i].hasSkillTag('noocean') && targets[i].hujia > 0) return 'ocean';
										if (!targets[i].hasSkillTag('nofire') && targets[i].getEquip('tengjia')) return 'fire';
										if (!targets[i].hasSkillTag('noyami') && targets[i].countCards('h') >= player.countCards('h')) return 'yami';
									}
								}
							}
							return list.randomGet();
						}).set('card', Evt.result.card).set('targets', Evt.targets);
					} else {
						Evt.goto(3);
					}
				}, () => {
					if (result.control != 'cancel2') {
						Evt.result.card.nature = result.control;
						player.popup(get.translation(Evt.result.card).slice(0, 2), result.control);
						game.log('#y' + get.translation(get.name(Evt.result.card)), '被转为了', Evt.result.card);
					}
				}, () => {
					if (Evt.types.contains('trick')) {
						var target = Evt.targets.shift();
						if (target.countGainableCards(player, 'he') > 0) player.gainPlayerCard(target, 'he');
						if (Evt.targets.length) Evt.redo();
					}
				}],
				group: ['guiren_num'],//'guiren_redraw'
				subSkill: {
					num: {
						trigger: { player: 'useCard' },
						forced: true,
						popup: false,
						filter(Evt: { skill: string; card: { name: any; }; cards: { filter: (arg0: (card: any) => boolean) => { (): any; new(): any; length: any; }; }; }) {
							return Evt.skill == 'guiren' && ['sha'].contains(Evt.card.name) && Evt.cards && Evt.cards.filter((card: any) => get.type(card) == 'equip').length;
						},
						content() {
							trigger.baseDamage++;
						}
					},
					redraw: {
						trigger: { player: 'shaMiss' },
						prompt(Evt: { cards: any; }, player: any) {
							return '是否收回' + get.translation(Evt.cards) + '并结束此阶段？';
						},
						filter(Evt: { skill: string; card: { name: any; }; cards: string | any[]; }) {
							return Evt.skill == 'guiren' && ['sha'].contains(Evt.card.name) && Evt.cards && Evt.cards.length;
						},
						content() {
							player.gain(trigger.cards);
							var evt = _status.event.getParent('phaseUse') || _status.event.getParent('phaseJieshu');
							if (evt && ['phaseJieshu', 'phaseUse'].contains(evt.name)) {
								evt.skipped = true;
							}
						}
					}
				}
			},
			//re阿紫
			anshu: {
				trigger: { global: 'phaseJieshuBegin' },
				direct: true,
				filter(Evt, player: PlayerModel) {
					return Evt.player != player && player.countCards('h', (card: any) => player.canUse(card, Evt.player))
						&& Evt.player.countCards('h') >= player.countCards('h');
				},
				content() {
					player.chooseToUse({
						preTarget: trigger.player,
						filterCard(card: any, player: any) {
							return lib.filter.filterCard.apply(this, arguments);
						},
						filterTarget(card: any, player: any, target: any) {
							return target == _status.event.preTarget && lib.filter.filterTarget.apply(this, arguments);
						},
						addCount: false,
						nodistance: true,
						prompt: get.prompt2('anshu'),
					}).set('logSkill', ['anshu', trigger.player]);
				},
				group: 'anshu_directHit',
				subSkill: {
					directHit: {
						trigger: { player: 'useCard' },
						direct: true,
						filter(Evt: { card: any; getParent: () => { (): any; new(): any; logSkill: string[]; }; }, player: any) {
							return get.suit(Evt.card) == 'spade' && Array.isArray(Evt.getParent().logSkill) && Evt.getParent().logSkill[0] == 'anshu';
						},
						content() {
							console.log('a')
							trigger.directHit.add(trigger.getParent().logSkill[1]);
						},
					}
				}
			},
			xingchi: {
				mod: {
					targetEnabled(card: any, player: { hasSkill: (arg0: string) => any; }, target: any) {
						if (!player.hasSkill('xingchi_countUsed')) return false;
					},
				},
				trigger: { player: 'gainAfter' },
				filter(Evt: any, player: { countCards: (arg0: string) => number; getHandcardLimit: () => number; getCardUsable: (arg0: string) => number; hasSkill: (arg0: string) => any; }) {
					if (player.countCards('h') > player.getHandcardLimit()) return player.getCardUsable('sha') > 0;
					else return !player.hasSkill('xingchi_used');
				},
				check(Evt: any, player: any) {
					return true;
				},
				content: [() => {
					if (player.countCards('h') > player.getHandcardLimit()) {
						player.chooseCardTarget({
							position: 'h',
							filterCard: true,
							prompt: '将一张手牌当作不计入次数【杀】使用',
							filterTarget(card: any, player: any, target: any) {
								return lib.filter.filterTarget({ name: 'sha' }, player, target);
							},
							ai1(card: any) {
								return 6 - get.value(card);
							},
							ai2(target: any) {
								if (!_status.event.check) return 0;
								return get.effect(target, { name: 'sha' }, _status.event.player);
							}
						});
					} else {
						player.draw(2);
						player.addTempSkill('xingchi_used');
						Evt.finish();
					}
				}, () => {
					if (result.bool && result.targets?.length) {
						player.useCard({ name: 'sha' }, result.targets, result.cards, false);
					}
				}],
				group: 'xingchi_record',
				subSkill: {
					record: {
						trigger: { global: 'useCard1' },
						filter(Evt: { player: { hasSkill: (arg0: string) => any; }; }, player: any) {
							return !Evt.player.hasSkill('xingchi_countUsed');
						},
						direct: true,
						locked: true,
						silent: true,
						firstDo: true,
						content() {
							trigger.player.addTempSkill('xingchi_countUsed');
						},
					},
					countUsed: {},
					used: {
						mark: true,
						intro: { content: '本回合已通过『醒迟』摸牌' },
					}
				},
			},
			//re鸭鸭
			cejing: {
				trigger: { global: 'phaseEnd' },
				firstDo: true,
				filter(Evt: { player: { isIn: () => any; getStat: (arg0: string) => any; }; }, player: { hasSkill: (arg0: string) => any; countDiscardableCards: (arg0: string) => number; }) {
					if (player.hasSkill('cejing_disable')) return false;
					return Evt.player.isIn() && !Evt.player.getStat('damage') && player.countDiscardableCards('he') >= 1;
				},
				direct: true,
				content: [() => {
					var target = trigger.player;
					Evt.target = target;
					var check = (get.attitude(player, target) > 0) || (get.attitude(player, target) < 0 && target.countCards('h') - target.getHandcardLimit() >= 2);
					player.chooseToDiscard(get.prompt2('cejing'), 'he').set('ai', (card: any) => {
						if (_status.event.check) return 6 - get.value(card);
						return -1;
					}).set('check', check)
				}, () => {
					if (result.bool && result.cards) {
						var att = get.attitude(player, Evt.target);
						var list0 = lib.phaseName;
						// for(var i=0;i<list0.length;i++){
						// 	list0[i] = [['','',list0[i],list0[i]]]
						// }
						var list: Dialogword = ['『策竞』：选择一个阶段'];
						list.push([list0, 'vcard']);
						list.push('hidden');
						let next = player.chooseButton(list, true);
						next.set('ai', function (button: { link: any[]; }) {
							var link = button.link[2];
							var att = _status.event.att;
							if (att > 0) {
								return link == ['phaseDraw'];
							}
							if (att <= 0) return link == 'phaseDiscard';
						});
						next.set('att', att);
					}
				}, () => {
					if (result.bool && result.links) {
						player.logSkill('cejing', Evt.target)
						var phase = result.links[0][2];
						Evt.target[phase]();
					}
				}],
				group: 'cejing_drawBy',
				subSkill: {
					drawBy: {
						trigger: {
							global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
						},
						filter(Evt: { getParent: () => { (): any; new(): any; name: string; }; }, player: any) {
							return Evt.getParent().name == 'cejing';
						},
						direct: true,
						content: [() => {
							var num = 0;
							var name = trigger.name;
							trigger.player.getHistory('sourceDamage', (evt: { getParent: (arg0: any) => any; num: number; }) => {
								var phase = evt.getParent(name)
								if (phase && phase.getParent && phase.getParent().name == 'cejing') num += evt.num;
							});
							Evt.num = num;
						}, () => {
							if (Evt.num > 0) {
								var list = [player];
								list.add(trigger.player);
								player.logSkill('cejing', list);
								game.asyncDraw(list, Evt.num);
							} else {
								player.addTempSkill('cejing_disable', 'roundStart');
							}
						}],
					},
					disable: {
						mark: true,
						marktext: "竞",
						intro: {
							name: '策竞失败',
							content($: any, player: any, skill: any) {
								return '失去『策竞』直到下个回合开始';
							},
						},
					}
				}
			},
			//reEcho
			qinglve: {
				enable: ['chooseToUse'],
				viewAs: { name: 'shunshou' },
				usable: 1,
				viewAsFilter(player: { isPhaseUsing: () => any; countDisabled: () => number; }) {
					if (!player.isPhaseUsing() || player.countDisabled() >= 5) return false;
				},
				filterCard: () => false,
				selectCard: -1,
				precontent: [() => {
					var list = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
					for (var i = 0; i < list.length; i++) {
						if (player.isDisabled(list[i])) list.splice(i--, 1);
					}
					player.chooseControl(list).set('prompt', '请选择废除一个装备栏').ai = () => {
						if (list.contains('equip1') && player.isEmpty('equip1') && player.countCards('h', (card: { name: string; }) => card.name == 'sha' && player.getUseValue(card) > 0)) return 'equip1';
						if (list.contains('equip3') && player.isEmpty('equip3')) return 'equip3';
						if (list.contains('equip4') && player.isEmpty('equip4')) return 'equip4';
						if (list.contains('equip5') && player.isEmpty('equip5')) return 'equip5';
						if (list.contains('equip2') && player.isEmpty('equip2')) return 'equip2';
						return list.randomGet();
					};
				}, () => {
					Evt.pos = result.control;
					player.disableEquip(Evt.pos);
				}],
				group: ['qinglve_mark'],
				subSkill: {
					mark: {
						mod: {
							maxHandcard(player: { countDisabled: () => any; }, num: any) {
								return num += player.countDisabled();
							},
							attackFrom(from: { countDisabled: () => number; }, to: any, distance: number) {
								return distance - from.countDisabled();
							}
						},
						marktext: '♠',
						intro: {
							name: '轻掠',
							content: '手牌上限和攻击范围+$',
						},
						trigger: { player: 'disableEquipAfter' },
						direct: true,
						content() {
							player.markSkill('qinglve_mark');
						},
					},
				}
			},
			yingshi: {
				enable: ['chooseToUse'],
				viewAs(cards: any[], player: PlayerModel) {
					var name = false;
					var nature = null;
					var suit = null;
					var number = null;
					var cards = player.getStorage('yingshi_cardsDis') as any[];
					if (cards[0]) {
						name = get.name(cards[0]);
						nature = get.nature(cards[0]);
						suit = get.suit(cards[0]);
						number = get.number(cards[0]);
					}
					if (name) return { name: name, nature: nature, suit: suit, number: number, isCard: true };
					return null;
				},
				usable: 1,
				viewAsFilter(player) {
					if (player.countCards('h', { suit: 'club' }) == 0) return false;
				},
				filterCard(card, player, Evt) {
					Evt = Evt || _status.event;
					var filter = Evt._backup.filterCard;
					var name = get.suit(card, player);
					if (name == 'club') return true;
					return false;
				},
				filter(Evt, player) {
					var cards = player.getStorage('yingshi_cardsDis');
					var card = cards[0];
					var filter = Evt.filterCard;
					if (card && filter(card, player, Evt) && player.countCards('h', { suit: 'club' })) return true;
					return false;
				},
				selectCard: 1,
				group: ['yingshi_cardsDis'],
				subSkill: {
					cardsDis: {
						init(player: PlayerModel, skill: string) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						marktext: '♣',
						intro: {
							name: '影逝',
							content: '上一次进入弃牌堆的非♣基本牌为$',
						},
						trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
						direct: true,
						filter(Evt: { cards: { filter: (arg0: (card: any) => boolean) => { (): any; new(): any; length: number; }; }; }, player: any) {
							return Evt.cards.filter((card: any) => get.position(card, true) == 'd' && get.suit(card) != 'club' && get.type(card) == 'basic').length > 0;
						},
						content() {
							let cards = trigger.cards.filter((card: any) => get.position(card, true) == 'd' && get.suit(card) != 'club' && get.type(card) == 'basic');
							player.$.yingshi_cardsDis = [cards.pop()];
							if (!player.isUnseen(1)) player.markSkill('yingshi_cardsDis');
						},
					},
				}
			},
			//re诗子
			re_meici: {
				zhuanhuanji: true,
				audio: 2,
				init(player: PlayerModel, skill: string) {
					if (!player.$[skill]) player.$[skill] = true;
				},
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt: { name: string; getParent: () => { (): any; new(): any; name: string; relatedEvent: { (): any; new(): any; name: string; }; }; position: any; cards: string | any[]; }, player: { $: { re_meici: boolean; }; }) {
					if (Evt.name == 'cardsDiscard' && Evt.getParent().name == 'orderingDiscard' && Evt.getParent().relatedEvent.name == 'useCard') return false;
					if (Evt.name == 'lose' && (Evt.getParent().name == 'useCard' || Evt.position != ui.discardPile)) return false;
					if (Evt.name == 'lose' && Evt.getParent().name == 'addJudge') return false;
					var color = player.$.re_meici == true ? 'red' : 'black';
					for (var i = 0; i < Evt.cards.length; i++) {
						if (get.position(Evt.cards[i], true) == 'd') {
							if (get.color(Evt.cards[i]) == color) return true;
						}
					}
					return false;
				},
				check(Evt: any, player: any) {
					return true;
				},
				usable: 1,
				content: [() => {
					if (trigger.cards.length && trigger.cards.length == 1) {
						player.gain(trigger.cards, 'gain2');
						if (player.$.re_meici == true) {
							player.$.re_meici = false;
						}
						else {
							player.$.re_meici = true;
						}
					}
					else {
						var color = player.$.re_meici == true ? 'red' : 'black';
						var cards = [];
						for (var i = 0; i < trigger.cards.length; i++) {
							if (get.position(trigger.cards[i], true) == 'd') {
								if (get.color(trigger.cards[i]) == color) cards.push(trigger.cards[i]);
							}
						}
						if (cards.length) {
							var str = '###『美词』###获得一张' + get.translation(color) + '牌';
							let next = player.chooseButton(ui.create.dialog(str, [cards, 'vcard'], 'hidden'), true);
							next.set('ai', function (button: { link: any[]; }) {
								var card = { name: button.link[2] };
								var value = get.value(card);
								return value;
							});
						}
						else {
							Evt.finish();
						}
					}
				}, () => {
					if (result.bool && result.links?.length) {
						player.gain(result.links, 'gain2');
						if (player.$.re_meici == true) {
							player.$.re_meici = false;
						}
						else {
							player.$.re_meici = true;
						}
					}
					else {
						Evt.finish();
					}
				}]

			},
			re_danlian: {
				audio: 2,
				trigger: { player: 'gainAfter' },
				filter(Evt: { getParent: (arg0: number) => { (): any; new(): any; name: string; }; cards: string | any[]; }, player: any) {
					if (Evt.getParent(2).name == 'phaseDraw') return false;
					var list = ['heart', 'spade', 'diamond'];
					for (var i = 0; i < Evt.cards.length; i++) {
						if (list.contains(get.suit(Evt.cards[i]))) return true;
					}
					return false;
				},
				direct: true,
				content: [() => {
					var list = ['heart', 'spade', 'diamond'];
					var cards = [];
					for (var i = 0; i < trigger.cards.length; i++) {
						if (list.contains(get.suit(trigger.cards[i]))) cards.push(trigger.cards[i]);
					}
					Evt.cards = cards.slice(0);
				}, () => {
					if (Evt.cards.length) {
						Evt.cards2 = Evt.cards.shift();
						var prompt3 = "###『耽恋』###你可以将" + get.translation(Evt.cards2) + '置入一名角色合理的区域';
						player.chooseTarget(prompt3, function (card: any, player: any, target: { canAddJudge: (arg0: { name: any; }) => any; isEmpty: (arg0: any) => any; }) {
							if (get.type(_status.event.card, false) == 'delay') return target.canAddJudge({ name: _status.event.card.name }) && target != player;
							if (get.type(_status.event.card, false) == 'equip') return target.isEmpty(get.subtype(_status.event.card, false)) && target != player;
							return target != player && lib.filter.canBeGained(_status.event.card, target, player);
						}).set('card', Evt.cards2).set('ai', function (target: any) {
							if (get.type(_status.event.card, false) == 'delay') return -get.attitude(_status.event.player, target);
							return get.attitude(_status.event.player, target);
						});
					}
					else {
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						if (get.type(Evt.cards2, false) == 'delay') {
							player.logSkill('re_danlian', result.targets); result.targets[0].addJudge(Evt.cards2);
						}
						else if (get.type(Evt.cards2, false) == 'equip') {
							player.logSkill('re_danlian', result.targets); result.targets[0].equip(Evt.cards2);
						}
						else {
							player.logSkill('re_danlian', result.targets);
							result.targets[0].gain(Evt.cards2, player, 'giveAuto');
						}
						if (Evt.cards.length) Evt.goto(1);
					}
					else {
						if (Evt.cards.length) Evt.goto(1);
					}
				}]
			},
			//re露露
			tunshi: {
				audio: 'xinhuo',
				trigger: { global: 'dyingBegin' },
				frequent: true,
				priority: 24,
				filter(Evt: { player: any; }, player: any) {
					if (Evt.player == player) return false;
					return _status.currentPhase == player;
				},
				content() {
					player.recover();
				},
				group: 'tunshi_redraw',
				subSkill: {
					redraw: {
						trigger: { global: 'loseAfter' },
						priority: 24,
						filter(Evt: { getParent: () => { (): any; new(): any; name: string; }; player: { countCards: (arg0: string) => number; }; cards: string | any[]; }, player: any) {
							if (Evt.getParent().name == 'gain' || !_status.currentPhase) return false;
							if (Evt.player == player || Evt.player == _status.currentPhase) return false;
							if (Evt.player.countCards('e') == 0) {
								for (var i = 0; i < Evt.cards.length; i++) {
									if (Evt.cards[i].original == 'e') return true;
								}
							}
							if (Evt.player.countCards('h') == 0) {
								for (var i = 0; i < Evt.cards.length; i++) {
									if (Evt.cards[i].original == 'h') return true;
								}
							}
							if (Evt.player.countCards('j') == 0) {
								for (var i = 0; i < Evt.cards.length; i++) {
									if (Evt.cards[i].original == 'j') return true;
								}
							}
							return false;
						},
						check(Evt: any, player: any) {
							return get.attitude(player, _status.currentPhase) > 0;
						},
						content() {
							_status.currentPhase.gain(trigger.cards, 'draw');
						},
					}
				}
			},
			//re葵
			mark_tianqing: {
				audio: 'tianqing',
				trigger: { global: 'damageBegin3' },
				filter(Evt: any, player: { $: { mark_tianqing_record: any; }; }) {
					return player.$.mark_tianqing_record;
				},
				round: 1,
				check(Evt: { player: any; }, player: any) {
					return get.attitude(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content() {
					trigger.changeToZero();
				},
				group: 'mark_tianqing_record',
				subSkill: {
					record: {
						init(player: PlayerModel, skill: string) {
							if (!player.$[skill]) player.$[skill] = false;
						},
						trigger: { global: ['damageEnd', 'phaseAfter'] },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt: any, player: any) {
							return true;
						},
						content() {
							if (trigger.name == 'damage' || trigger.numFixed == true) {
								player.$.mark_tianqing_record = true;
							}
							else {
								player.$.mark_tianqing_record = false;
							}
						}
					}
				}
			},
			tianqing: {
				audio: 6,
				trigger: { global: 'damageBegin3' },
				filter(Evt: any, player: { $: { tianqing_record: any; }; }) {
					return player.$.tianqing_record;
				},
				check(Evt: { player: any; }, player: any) {
					return get.attitude(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content() {
					trigger.changeToZero();
				},
				group: 'tianqing_record',
				subSkill: {
					record: {
						init(player: PlayerModel, skill: string) {
							if (!player.$[skill]) player.$[skill] = true;
						},
						trigger: { global: ['damageZero', 'damageEnd', 'phaseAfter'] },
						forced: true,
						silent: true,
						firstDo: true,
						filter(Evt: any, player: any) {
							return true;
						},
						content() {
							console.log(trigger)
							if (trigger.name == 'damageZero' || trigger.numFixed == true) {
								player.$.tianqing_record = false;
							}
							else {
								player.$.tianqing_record = true;
							}
						}
					}
				}
			},
			kuiquan: {
				audio: 3,
				enable: 'chooseToUse',
				filterCard(card: any, player: { $: { kuiquan_record: any[]; }; }) {
					return !player.$.kuiquan_record.contains(get.type(card, 'trick'));
				},
				viewAs: { name: 'huogong', nature: 'fire' },
				position: 'hes',
				viewAsFilter(player: { countCards: (arg0: string, arg1: (card: any) => boolean) => any; $: { kuiquan_record: any[]; }; }) {
					if (!player.countCards('h', (card: any) => !player.$.kuiquan_record.contains(get.type(card, 'trick')))) return false;
				},
				check(card: { name: string; }) {
					var player = _status.currentPhase;
					if (player.countCards('h') > player.hp || player.countCards('h', { name: 'sha' }) > 0) {
						if (card.name == 'sha') return 4 - get.value(card);
						return 6 - get.value(card);
					}
					return 3 - get.value(card)
				},
				onuse(result: { cards: any[]; }, player: { $: { kuiquan_record: any[]; }; }) {
					player.$.kuiquan_record.add(get.type(result.cards[0], 'trick'));
				},
				ai: {
					kuiquan: true,
					fireAttack: true,
				},
				group: 'kuiquan_record',
				subSkill: {
					record: {
						init(player: PlayerModel, skill: string) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { global: 'phaseAfter' },
						forced: true,
						silent: true,
						firstDo: true,
						content() {
							player.$.kuiquan_record = [];
						}
					}
				}
			},
			//re小霸王
			kangding: {
				trigger: { source: 'damageBegin3', player: 'damageBegin3' },
				filter(Evt: { num: number; source: any; player: any; }, player: { countCards: (arg0: string, arg1: { subtype: string; }) => any; }) {
					if (Evt.num <= 0) return false;
					return player.countCards('he', { subtype: 'equip1' }) && player == Evt.source || player.countCards('he', { subtype: 'equip2' }) && player == Evt.player;
				},
				check(Evt: { source: any; player: any; }, player: any) {
					return player == Evt.source && get.attitude(player, Evt.player) < 0 || player == Evt.player;
				},
				logTarget: 'player',
				content: [() => {
					if (player.countCards('he', { subtype: 'equip1' }) && player == trigger.source) {
						player.chooseToDiscard(get.prompt('kangding'), true, 'he', { subtype: 'equip1' });
					} else {
						player.chooseToDiscard(get.prompt('kangding'), true, 'he', { subtype: 'equip2' });
						Evt.goto(2);
					}
				}, () => {
					if (result.bool) {
						trigger.num++;
						Evt.finish();
					}
				}, () => {
					if (result.bool) {
						trigger.num--;
					}
				}],
			},
			longshe: {
				enable: 'phaseUse',
				filter(Evt: any, player: { countDiscardableCards: (arg0: any, arg1: string) => any; getStat: (arg0: string) => { (): any; new(): any; longshe: any; }; canEquip: (arg0: number) => unknown; }) {
					return player.countDiscardableCards(player, 'h')
						&& (!player.getStat('skill').longshe) || ((player.getStat('skill').longshe || 0) < [1, 2, 3, 4, 5].filter(function (num) {
							return player.canEquip(num)
						}).length);
				},
				filterCard(card: any, player: any) {
					return get.type(card) == 'basic';
				},
				content: [() => {
					var cards = [ui.cardPile.firstChild];
					Evt.cards = cards;
					player.showCards(Evt.cards, '『龙蛇笔走』展示牌')
				}, () => {
					if (get.type(Evt.cards[0]) == 'basic') {
						game.log(Evt.cards, '被置入了弃牌堆');
						game.cardsDiscard(Evt.cards);
						player.draw();
					} else if (player.hasUseTarget(Evt.cards[0])) {
						player.chooseUseTarget(Evt.cards[0]);
					}
				}]
			},
			//花那
			re_huawen: {
				audio: 2,
				enable: 'phaseUse',
				usable: 1,
				selectCard: 2,
				complexCard: true,
				check(card: any) {
					var player = _status.event.player;
					if (get.color(card) == 'red') return player.getUseValue(card) - 2;
					return 6 - get.value(card);
				},
				filter(Evt: any, player: { countCards: (arg0: string, arg1: { color: string; }) => any; }) {
					return player.countCards('he', { color: 'red' }) && player.countCards('he', { color: 'black' });
				},
				filterCard(card: any, player: any, Evt: any) {
					if (ui.selected.cards.length) {
						let pre = ui.selected.cards[0];
						if (get.color(card, player) == get.color(pre, player)) return false;
					}
					return true;
				},
				content() { },
				ai: {
					order: 6,
					result: { player: 1 }
				},
				group: ['re_huawen_useBy', 're_huawen_change'],//,'re_huawen_give'
				subSkill: {
					useBy: {
						trigger: { player: 'discardEnd' },
						filter(Evt: { cards: any[]; }, player: { hasUseTarget: (arg0: any) => any; }) {
							return Evt.cards.length == 2
								&& Evt.cards.filter((card: any) => get.color(card) == 'red').length
								&& Evt.cards.filter((card: any) => get.color(card) == 'black').length
								&& player.hasUseTarget(Evt.cards.filter((card: any) => get.color(card) == 'red')[0]);
						},
						check(Evt: { cards: any[]; }, player: { getUseValue: (arg0: any) => any; }) {
							let card = Evt.cards.filter((card: any) => get.color(card) == 'red')[0];
							return player.getUseValue(card);
						},
						direct: true,
						content() {
							let card = trigger.cards.filter((card: any) => get.color(card) == 'red')[0];
							player.chooseUseTarget(card, `###${get.prompt('re_huawen')}###使用${get.translation(card)}（额外结算一次）`).set('logSkill', 're_huawen_useBy');
						},
					},
					change: {
						trigger: { player: 'useCardAfter' },
						priority: 40,
						direct: true,
						filter(Evt, player: PlayerModel) {
							if (Evt.skill == 're_huawen_change') return false;
							let evt = Evt.getParent('chooseUseTarget');
							return Evt.targets?.length
								&& evt?.logSkill == 're_huawen_useBy';
						},
						content() {
							let card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
							player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = 're_huawen_change';
						},
					},
					give: {
						trigger: { player: 'useCardAfter' },
						priority: 23,
						direct: true,
						filter(Evt, player) {
							if (player.hasHistory('sourceDamage', (evt: { card: any; }) => {
								return evt.card == Evt.card;
							}).length == 0) {
								let evt = Evt.getParent('chooseUseTarget');
								return evt?.logSkill === 're_huawen_useBy'
									&& Evt.cards.filter((card: any) => get.color(card) == 'black' && get.position(card) == 'd').length;
							}
						},
						content: [() => {
							Evt.card = trigger.cards.filter((card: any) => get.color(card) == 'black' && get.position(card) == 'd')[0];
							player.chooseTarget(function (card: any, player: any, target: any) {
								return player != target;
							}).set('card', Evt.card).set('ai', function (target: any) {
								var player = _status.event.player;
								return get.attitude(player, target) * get.value(_status.event.card, target);
							}).set('prompt2', '『花吻』：其他角色获得' + get.translation(Evt.card));
						}, () => {
							if (result.bool && result.targets[0]) {
								player.logSkill('re_huawen_give', result.targets[0]);
								result.targets[0].gain(Evt.card, 'log', 'gain2');
							}
						}],
					}
				},
			},
			re_liaohu: {
				audio: 'liaohu',
				trigger: { global: 'phaseEnd' },
				priority: 23,
				filter(Evt: any, player: { getStat: (arg0: string) => any; }) {
					return player.getStat('damage');
				},
				direct: true,
				content: [() => {
					console.log(player.getStat('skill'))
					if (player.getStat('skill').re_huawen || player.getStat('skill').re_huawen_useBy) {
						Evt.change = true;
					}
				}, () => {
					var str = '###' + get.prompt('re_liaohu') + '###令一名角色摸两张牌 ';
					if (Evt.change) str += '或 摸一张牌并回复1点体力';
					player.chooseTarget(str).set('ai', function (target: any) {
						return get.attitude(_status.event.player, target);
					});
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0]
						Evt.target.classList.add('glow');
					} else {
						Evt.finish();
					}
				}, () => {
					if (Evt.change) {
						var controls = ['摸两张牌', '摸一张牌并回复1点体力', '取消选择'];
						player.chooseControl(controls).set('ai', () => {
							return _status.event.index;
						}).set('index', (get.recoverEffect(Evt.target, player, player) > 2) ? 1 : 0);
					}
					else Evt._result = { index: 0 };
				}, () => {
					Evt.target.classList.remove('glow');
					switch (result.index) {
						case 0: {
							player.logSkill('re_liaohu', Evt.target);
							Evt.target.draw(2);
							break;
						}
						case 1: {
							player.logSkill('re_liaohu', Evt.target);
							Evt.target.draw();
							Evt.target.recover(player);
							break;
						}
						case 2: {
							Evt.goto(0);
							break;
						}
					}
				}],
			},
			//tm
			re_gonggan: {
				enable: 'phaseUse',
				usable: 1,
				selectCard: 2,
				complexCard: true,
				check(card: any) {
					var player = _status.event.player;
					if (get.color(card) == 'black') return player.getUseValue(card) - 2;
					return 6 - get.value(card);
				},
				filter(Evt: any, player: { countCards: (arg0: string, arg1: { color: string; }) => any; }) {
					return player.countCards('h', { color: 'red' }) && player.countCards('h', { color: 'black' });
				},
				filterCard(card: any, player: any, Evt: any) {
					if (ui.selected.cards.length) {
						let pre = ui.selected.cards[0];
						if (get.color(card, player) == get.color(pre, player)) return false;
					}
					return true;
				},
				content() { },
				ai: {
					order: 6,
					result: { player: 1 }
				},
				group: ['re_gonggan_useBy', 're_gonggan_change'],//,'re_gonggan_give'
				subSkill: {
					useBy: {
						trigger: { player: 'discardEnd' },
						filter(Evt: { cards: any[]; }, player: { hasUseTarget: (arg0: any) => any; }) {
							return Evt.cards.length == 2
								&& Evt.cards.filter((card: any) => get.color(card) == 'red').length
								&& Evt.cards.filter((card: any) => get.color(card) == 'black').length
								&& player.hasUseTarget(Evt.cards.filter((card: any) => get.color(card) == 'black')[0]);
						},
						check(Evt: { cards: any[]; }, player: { getUseValue: (arg0: any) => any; }) {
							let card = Evt.cards.filter((card: any) => get.color(card) == 'black')[0];
							return player.getUseValue(card);
						},
						direct: true,
						content() {
							let card = trigger.cards.filter((card: any) => get.color(card) == 'black')[0];
							player.chooseUseTarget(card, `###${get.prompt('re_gonggan')}###使用${get.translation(card)}（可增减目标）`, true).set('logSkill', 're_gonggan_useBy');
						},
					},
					change: {
						trigger: { player: 'useCard2' },
						priority: 23,
						direct: true,
						filter(Evt: { card: any; getParent: (arg0: string) => any; targets: string | any[]; }, player: any) {
							let card = Evt.card;
							if (get.info(card).allowMultiple == false) return false;
							let evt = Evt.getParent('chooseUseTarget');
							return Evt.targets?.length
								&& evt?.logSkill == 're_gonggan_useBy';
						},
						content: [() => {
							let prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标'
							player.chooseTarget(get.prompt('re_gonggan'), function (card: any, player: any, target: any) {
								var player = _status.event.player;
								var source = _status.event.source;
								if (_status.event.targets.contains(target)) return true;
								return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
							}).set('prompt2', prompt2).set('ai', function (target: any) {
								let [trigger, player, source]
									= [_status.event.getTrigger(), _status.event.player, _status.event.source];
								return get.effect(target, trigger.card, source, player) * (_status.event.targets.contains(target) ? -1 : 1);
							}).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
						}, () => {
							if (!Evt.isMine()) game.delayx();
							Evt.targets = result.targets;
						}, () => {
							if (Evt.targets) {
								player.logSkill('re_gonggan', Evt.targets);
								if (trigger.targets.contains(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
								else trigger.targets.addArray(Evt.targets);
							}
						}],
					},
					give: {
						trigger: { player: 'useCardAfter' },
						priority: 23,
						direct: true,
						filter(Evt: { card: any; getParent: (arg0: string) => any; cards: { filter: (arg0: (card: any) => boolean) => { (): any; new(): any; length: any; }; }; }, player: { getHistory: (arg0: string, arg1: (evt: any) => boolean) => { (): any; new(): any; length: any; }; }) {
							if (player.getHistory('sourceDamage', (evt: { card: any; }) => {
								return evt.card == Evt.card;
							}).length) {
								let evt = Evt.getParent('chooseUseTarget');
								return evt?.logSkill == 're_gonggan_useBy'
									&& Evt.cards.filter((card: any) => get.color(card) == 'red' && get.position(card) == 'd').length;
							}
						},
						content: [() => {
							Evt.card = trigger.cards.filter((card: any) => get.color(card) == 'red' && get.position(card) == 'd')[0];
							player.chooseTarget(function (card: any, player: any, target: any) {
								return player != target;
							}).set('card', Evt.card).set('ai', function (target: any) {
								var player = _status.event.player;
								return get.attitude(player, target) * get.value(_status.event.card, target);
							}).set('prompt2', '『共感』：令其他角色获得' + get.translation(Evt.card));
						}, () => {
							if (result.bool && result.targets[0]) {
								player.logSkill('re_gonggan_give', result.targets[0]);
								result.targets[0].gain(Evt.card, 'log', 'gain2');
							}
						}],
					}
				},
			},
			yejing: {
				trigger: { global: 'useCard2' },
				priority: 23,
				filter(Evt: { card: any; targets: any[]; }, player: { hasSkill: (arg0: string) => any; countDiscardableCards: (arg0: any, arg1: string, arg2: (card: any) => boolean) => any; }) {
					if (player.hasSkill('yejing_used')) return false;
					if (get.name(Evt.card) != 'sha' || !Evt.targets.contains(player)) return false;
					return (get.name(Evt.card) == 'sha') && player.countDiscardableCards(player, 'he', (card: any) => get.number(card, player) > _status.event.num);
				},
				direct: true,
				content: [() => {
					let next = player.chooseToDiscard('he', get.prompt2('yejing')).set('logSkill', ['yejing', trigger.player])
						.set('filterCard', function (card: any, player: any) {
							return get.number(card, player) > _status.event.num;
						})
						.set('num', get.number(trigger.card));
				}, () => {
					if (result.bool) {
						player.addTempSkill('yejing_used');
						trigger.cancel();
					}
				}],
				subSkill: { used: {} }
			},
			//re大舅子
			shengfu: {
				enable: 'chooseToUse',
				init(player: PlayerModel, skill: string) {
					player.$.shengfu = {};
				},
				filter(Evt: { type: string; respondTo: any[]; }, player) {
					//每轮每项一次
					//目标/来源不是自己时，才拼点
					if (Evt.type == 'wuxie' && Evt.respondTo && Evt.respondTo[0] != player) {
						if (player.$.shengfu.wuxie != undefined) return false;
						return true;
					}
					return false;
				},
				hiddenCard(player, name: string) {
					return player.$.shengfu.wuxie == undefined && name == 'wuxie';
				},
				check(Evt, player) {
					return get.$a(player, Evt.respondTo[0]) <= 0;
				},
				content: [() => {
					Evt.p1 = Evt.getParent().respondTo[0];
					player.chooseToCompare(Evt.p1);
					player.$.shengfu.wuxie = true;
					player.syncStorage('shengfu');
				}, () => {
					if (result.bool) {
						//赢
						Evt.getParent().result = { wuxied: true };
					} else {
						//输
						player.addTempSkill('shengfu_onLose', 'phaseEnd');
					}
				}],
				group: ['shengfu_reset', 'shengfu_onCompare', 'shengfu_onPhaseUse'],
				subSkill: {
					reset: {
						trigger: { global: 'roundStart' },
						direct: true,
						content() {
							player.$.shengfu = {};
							player.syncStorage('shengfu');
						}
					},
					//禁止使用牌
					onLose: {
						mod: {
							cardEnabled2(card: any, player: any) {
								return false;
							},
							cardUsable(card: any, player: any) {
								return 0;
							},
							hiddenCard(player: any, name: any) {
								return false;
							}
						}
					},
					//用于拼点
					onCompare: {
						trigger: {
							player: 'compare',
							target: 'compare'
						},
						filter(Evt: { card1: any; card2: any; }, player: any) {
							return get.color(Evt.card1) == 'black' || get.color(Evt.card2) == 'black';
						},
						check(Evt: { card1: { number: number; }; card2: { number: number; }; }, player: any) {
							return Evt.card1.number <= Evt.card2.number;
						},
						content: [() => {
							//令一方收回黑色拼点牌，改用牌堆顶牌代替
							player.chooseTarget('选择一方收回黑色拼点牌，改用牌堆顶牌代替', function (card: any, player: any, target: any) {
								if (!_status.event.compareData) return false;
								if (_status.event.compareData.player == target) {
									return get.color(_status.event.compareData.card1) == 'black';
								}
								if (_status.event.compareData.target == target) {
									return get.color(_status.event.compareData.card2) == 'black';
								}
								return false;
							}).set('ai', function (target: any) {
								if (!_status.event.compareData) return 0;
								if (_status.event.compareData.player == target) {
									if (_status.event.compareData.card1.number > _status.event.compareData.card2.number) {
										return 0;
									} else {
										return 10;
									};
								}
								return 0;
							}).set('compareData', {
								player: player,
								target: player == trigger.target ? trigger.player : trigger.target,
								card1: player == trigger.target ? trigger.card2 : trigger.card1,
								card2: player == trigger.target ? trigger.card1 : trigger.card2
							});
						}, () => {
							if (result.bool && result.targets[0]) {
								Evt.chosePlayer = result.targets[0];
								if (Evt.chosePlayer == player) {
									Evt.comparedCard = trigger.card1;
								} else {
									Evt.comparedCard = trigger.card2;
								}
								game.broadcastAll(ui.clear);
								//收回拼点牌
								Evt.chosePlayer.gain(Evt.comparedCard, 'gain');
								//牌堆顶一张牌
								Evt.pileCard = get.cards()[0];
								game.log(Evt.chosePlayer, '判定牌', Evt.comparedCard, '改为', Evt.pileCard);
							} else {
								Evt.finish();
							}
						}, () => {
							if (Evt.chosePlayer == player) {
								trigger.card1 = Evt.pileCard;
								trigger.num1 = Evt.pileCard.number;
							} else {
								trigger.card2 = Evt.pileCard;
								trigger.num2 = Evt.pileCard.number;
							}
							player.$compare(trigger.card1, trigger.target, trigger.card2);
							game.delay(0, 1500);
						}]
					},
					onPhaseUse: {
						enable: 'phaseUse',
						filter(Evt: any, player: { $: { shengfu: { juedou: undefined; }; }; }) {
							//每轮限一次
							if (player.$.shengfu.juedou != undefined) return false;
							return true;
						},
						filterTarget(card: any, player: { canCompare: (arg0: any) => any; }, target: any) {
							return player.canCompare(target);
						},
						content: [() => {
							player.$.shengfu.juedou = true;
							player.syncStorage('shengfu');
							Evt.juedouTarget = target;
							player.chooseToCompare(Evt.juedouTarget);
						}, () => {
							if (result.bool) {
								//赢
								player.useCard({ name: 'juedou', isCard: true }, Evt.juedouTarget);
							} else {
								//输
								player.addTempSkill('shengfu_onLose', 'phaseEnd');
							}
						}],
						ai: {
							order: 1,
							result: {
								target(player: any, target: any, card: any) {
									return -1.5;
								},
								player(player: any, target: any, card: any) {
									return lib.card.juedou.ai.result.player(player, target, card);
								}
							}
						},
					}
				},
				ai: {
					order() {
						return get.order({ name: 'wuxie' }) + 0.2;
					},
					result: {
						player(player: any, target: any) {
							var ext = _status.event.getParent('_wuxie');
							if (!Object.getOwnPropertyNames(ext).length) return 0;
							var att = get.attitude(player, ext.target);
							var eff = get.effect(ext.target, ext.card, ext.player, player);
							if (att > 0) {
								return eff < 0 ? 1 : 0;
							} else if (att < 0) {
								return eff > 0 ? 1 : 0;
							}
							return 0;
						}
					}
				}
			},
			wanbi: {
				trigger: {
					player: ['shanAfter', 'wuxieAfter', 'useSkillAfter']
				},
				frequent: true,
				filter(Evt, player: PlayerModel) {
					if (Evt.name == 'shan') {
						let evt = Evt.getParent('sha');
						if (evt.player.countCards('h') < player.countCards('h')) return false;
						return evt.player != player && evt.card && evt.card.cards[0];
					}
					if (Evt.name == 'wuxie') {
						let evt = Evt.getParent('useCard');
						//抵消其他角色的牌才返回true
						if (evt?.respondTo) {
							if (evt.respondTo[0] && evt.respondTo[0].countCards('h') < player.countCards('h')) return false;
							return evt.respondTo[0] != player && evt.respondTo[1] && evt.respondTo[1].cards && evt.respondTo[1].cards[0];
						} else {
							evt = Evt.getParent('_wuxie');
							if (evt.player.countCards('h') < player.countCards('h')) return false;
							return evt.player != player && evt.card;
						}
					}
					if (Evt.name == 'useSkill' && Object.getOwnPropertyNames(Evt.getParent('_wuxie')).length) {
						let evt = Evt;
						if (evt.result?.wuxied) {
							if (evt.respondTo) {
								if (evt.respondTo[0] && evt.respondTo[0].countCards('h') < player.countCards('h')) return false;
								return evt.respondTo[0] != player && evt.respondTo[1] && evt.respondTo[1].cards && evt.respondTo[1].cards[0];
							} else {
								evt = Evt.getParent('_wuxie');
								if (evt.player.countCards('h') < player.countCards('h')) return false;
								return evt.player != player && evt.card;
							}
						}
					}
					return false;
				},
				content() {
					let evt
					if (trigger.name == 'wuxie') {
						evt = Evt.getParent('useCard');
						if (evt.respondTo) {
							var card = evt.respondTo[1].cards[0];
							player.gain(card, 'gain2');
						} else {
							var card = evt.getParent('_wuxie').card;
							player.gain(card, 'gain2');
						}
						if (card) game.broadcastAll(function (card) {
							if (card && card.clone)
								card.clone.delete();
						}, card);
					} else if (trigger.name == 'shan') {
						evt = Evt.getParent('sha');
						player.gain(evt.card.cards[0], 'gain2');
					} else {
						evt = trigger;
						if (evt.respondTo) {
							var card = evt.respondTo[1].cards[0];
							player.gain(card, 'gain2');
						} else {
							var card = trigger.getParent('_wuxie').card;
							player.gain(card, 'gain2');
						}
						if (card) game.broadcastAll(function (card) {
							if (card && card.clone)
								card.clone.delete();
						}, card);
					}
				}
			},
			//羽衣妈
			uijieyuan: {
				enable: ['chooseToUse'],
				viewAs: { name: 'yuanjiao' },
				check(card: any) {
					return 6 - get.value(card);
				},
				usable: 1,
				selectCard() {
					var player = _status.event.player;
					if (!ui.selected.targets.length) return [1, 2];
					if (ui.selected.targets.length && player.getStorage('uijieyuan_record').contains(ui.selected.targets[0])) return [1, 1];
					return [2, 2];
				},
				filterCard(card: any, player: any) {
					if (!ui.selected.targets.length) return get.type(card) != 'basic' || get.color(card) == 'red';
					//else if(player.getStorage('uijieyuan_record').contains(ui.selected.targets[0])) return get.type(card)!='basic';
					else if (ui.selected.cards.length && ui.selected.cards) return get.color(card) == 'red';
				},
				position: 'he',
				involve: 'yuanjiao',
				group: 'uijieyuan_record',
				subSkill: {
					record: {
						init(player: PlayerModel, skill: string) {
							if (!player.$[skill]) player.$[skill] = [];
						},
						trigger: { global: ['gainAfter', 'loseAfter', 'phaseAfter'] },
						filter(Evt: { name: string; hs: string | any[]; }, player: any) {
							if (Evt.name == 'lose') return Evt.hs && Evt.hs.length;
							return true;
						},
						direct: true,
						silent: true,
						firstDo: true,
						content() {
							if (!player.$.uijieyuan_record) player.$.uijieyuan_record = [];
							if (trigger.name == 'phase') player.$.uijieyuan_record.length = 0;
							else player.$.uijieyuan_record.add(trigger.player);
						}
					}
				}
			},
			huixiang: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player: PlayerModel) {
					return player.countCards('h') > 0;
				},
				filterTarget(card: any, player: PlayerModel, target: PlayerModel) {
					return target != player && target.countCards('e', (card: any) => get.equiptype(card) != 5);
				},
				position: 'he',
				filterCard: true,
				prepare: 'give',
				discard: false,
				lose: false,
				content: [() => {
					target.gain(cards, player);
				}, () => {
					var list = target.getCards('e', (card: any) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
					player.choosePlayerCard(Evt.target, 'e', true).set('filterButton', function (button: string) {
						return get.equiptype(button.link) != 5;
					}).set('ai', function (button: string) {
						var link = button.link;
						if (_status.event.list.contains(link)) return get.value(link, player, 'raw');
						return 1;
					}).set('list', list);
				}, () => {
					if (result.links?.length) {
						Evt.cardname = get.name(result.links[0]);
						if (!player.getEquip(get.subtype(Evt.cardname))) {
							player.addTempSkill('huixiang_equip', { player: ['huixiangBegin'] });
							var name = Evt.cardname;
							player.$.huixiang_equip2 = name;
							player.markAuto('huixiang_equip', result.links);
							var info = lib.card[name].skills;
							if (info && info.length) player.addAdditionalSkill('huixiang_equip', info);
							game.log(player, '声明了', '#y' + get.translation(name));
						}
					}
				}],
				group: 'huixiang_end',
				subSkill: {
					end: {
						trigger: { player: 'phaseJieshuBegin' },
						direct: true,
						filter(Evt: any, player: { countCards: (arg0: string) => number; }) {
							return player.countCards('he') > 0 && game.hasPlayer((cur: any) => {
								return cur != player && lib.skill.huixiang.filterTarget(true, player, cur);
							});
						},
						content: [() => {
							player.chooseCardTarget('he', function (card: any, player: any) {
								return true;
							}, function (card: any, player: any, target: any) {
								return target != player && lib.skill.huixiang.filterTarget.apply(this, arguments);
							}).set('prompt', get.prompt2('huixiang'))
						}, () => {
							if (result.bool && result.targets && result.cards) {
								if (player.hasSkill('huixiang_equip')) player.removeSkill('huixiang_equip');
								Evt.target = result.targets[0];
								player.give(result.cards, Evt.target, 'giveAuto')
							} else {
								Evt.finish();
							}
						}, () => {
							console.log(Evt.target)
							var list = Evt.target.getCards('e', (card: any) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
							player.choosePlayerCard(Evt.target, 'e', true).set('filterButton', function (button: string) {
								return get.equiptype(button.link) != 5;
							}).set('ai', function (button: string) {
								var link = button.link;
								if (_status.event.list.contains(link)) return get.value(link, player, 'raw');
								return 1;
							}).set('list', list);
						}, () => {
							if (result.links?.length) {
								Evt.cardname = get.name(result.links[0]);
								if (!player.getEquip(get.subtype(Evt.cardname))) {
									player.addTempSkill('huixiang_equip', { player: ['huixiangBegin'] });
									var name = Evt.cardname;
									player.$.huixiang_equip2 = name;
									player.markAuto('huixiang_equip', result.links);
									var info = lib.card[name].skills;
									if (info && info.length) player.addAdditionalSkill('huixiang_equip', info);
									game.log(player, '声明了', '#y' + get.translation(name));
								}
							}
						}],
					}
				},
				ai: {
					order: 5,
					result: {
						player(player: { getEquip: (arg0: any) => any; }, target: { getCards: (arg0: string, arg1: (card: any) => boolean) => any; }) {
							var list = target.getCards('e', (card: any) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
							if (list.length) return 0.5;
							else return -1;
						},
						target: 1,
					},
				},
			},
			huixiang_equip: {
				trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
				filter(Evt: { player: any; cards: { filter: (arg0: (card: any) => any) => { (): any; new(): any; length: number; }; }; }, player: { $: { huixiang_equip: any[]; }; }) {
					return player != Evt.player && player != _status.currentPhase && Evt.cards
						&& Evt.cards.filter((card: any) => get.position(card, true) == 'd' && get.type(card) == 'equip' && player.$.huixiang_equip.contains(card)).length > 0;
				},
				forced: true,
				content: [() => {
					if (trigger.delay == false) game.delay();
					player.draw(2);
				}, () => {
					player.unmarkAuto('huixiang_equip', trigger.cards);
				}],
				mod: {
					globalFrom(from: { $: { huixiang_equip2: string | number; }; }, to: any, distance: any) {
						var info = lib.card[from.$.huixiang_equip2];
						if (info && info.distance && info.distance.globalFrom) return distance + info.distance.globalFrom;
					},
					globalTo(from: any, to: { $: { huixiang_equip2: string | number; }; }, distance: any) {
						var info = lib.card[to.$.huixiang_equip2];
						if (info && info.distance && info.distance.globalTo) return distance + info.distance.globalTo;
					},
					attackFrom(from: { $: { huixiang_equip2: string | number; }; }, to: any, distance: any) {
						var info = lib.card[from.$.huixiang_equip2];
						if (info && info.distance && info.distance.attackFrom) return distance + info.distance.attackFrom;
					},
					attackTo(from: any, to: { $: { huixiang_equip2: string | number; }; }, distance: any) {
						var info = lib.card[to.$.huixiang_equip2];
						if (info && info.distance && info.distance.attackTo) return distance + info.distance.attackTo;
					},
				},
				onremove: true,
				intro: {
					mark(dialog, $, player) {
						dialog.add($);
						dialog.addText('当前装备：' + get.translation(player.$.huixiang_equip2));
						var str2 = lib.translate[player.$.huixiang_equip2 + '_info'];
						if (str2) {
							if (str2.length >= 12) dialog.addText(str2, false);
							else dialog.addText(str2);
						}
					},
				},
			},
			//Azki
			WHiTE: {
				trigger: {
					player: 'damageEnd',
				},
				frequent: true,
				filter(Evt: { source: undefined; }, player: any) {
					return Evt.source != undefined;
				},
				logTarget: 'source',
				content: [() => {
					player.viewHandcards(trigger.source);
				}, () => {
					player.chooseControl(lib.suit).set('prompt', '『WHiTE』：请选择一个花色').ai = () => { return lib.suit.randomGet() };
				}, () => {
					Evt.suit = result.control;
					player.popup(Evt.suit + 2);
					game.log(player, '声明了', Evt.suit + 2);
				}, () => {
					if (!trigger.source.$.WHiTE_suit) trigger.source.$.WHiTE_suit = [];
					trigger.source.$.WHiTE_suit.add(Evt.suit);
					if (trigger.source.hasSkill('WHiTE_suit')) trigger.source.markSkill('WHiTE_suit')
					else trigger.source.addTempSkill('WHiTE_suit')
				}],
				subSkill: {
					suit: {
						mark: true,
						onremove: true,
						intro: {
							content: '不能使用、打出或弃置$牌',
						},
						mod: {
							cardDiscardable(card: any, player: { getStorage: (arg0: string) => any[]; }) {
								if (player.getStorage('WHiTE_suit').contains(get.suit(card))) return false;
							},
							cardEnabled2(card: any, player: { getStorage: (arg0: string) => any[]; }) {
								if (player.getStorage('WHiTE_suit').contains(get.suit(card))) return false;
							},
						},
					}
				}
			},
			BLacK: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt: any, player: any) {
					return game.hasPlayer((cur: any) => {
						return cur != player;
					});
				},
				filterTarget(card: any, player: { canCompare: (arg0: any) => any; }, target: any) {
					return player.canCompare(target)
				},
				content: [() => {
					var cards = get.cards(target.hp);
					Evt.cards = cards;
					player.chooseCardButton('『BLacK』：选择一张牌', cards, true);
				}, () => {
					if (result.bool && player.canCompare(target)) {
						for (let i = Evt.cards.length - 1; i >= 0; i--) {
							if (Evt.cards[i] == result.links[0]) continue;
							Evt.cards[i].fix();
							ui.cardPile.insertBefore(Evt.cards[i], ui.cardPile.firstChild);
						}
						player.$.BLacK = result.links[0];
						player.chooseToCompare(target);
					}
					else {
						for (let i = Evt.cards.length - 1; i >= 0; i--) {
							Evt.cards[i].fix();
							ui.cardPile.insertBefore(Evt.cards[i], ui.cardPile.firstChild);
						}
						game.delay();
						Evt.finish();
					}
				}, () => {
					if (result.winner) {
						if (Evt.cards.length) {
							if (result.winner == player) {
								Evt.card = player.$.BLacK;
								if (Evt.card && player.canUse(Evt.card, target)) player.useCard(Evt.card, target);
							}
							else if (result.winner == target) {
								Evt.card = [result.player, result.target].filterInD('d')[0];
								if (Evt.card && target.canUse(Evt.card, player)) target.useCard(Evt.card, player);
							}
						}
					}
					delete player.$.BLacK;
				}],
				group: 'BLacK_compare',
				subSkill: {
					compare: {
						trigger: { player: 'chooseToCompareBegin' },
						firstDo: true,
						direct: true,
						filter(Evt: { getParent: () => { (): any; new(): any; name: string; }; fixedResult: any; }, player: { $: { BLacK: any; }; }) {
							if (Evt.getParent().name == 'BLacK' && player.$.BLacK) {
								return !Evt.fixedResult;
							}
							return false
						},
						content() {
							if (!trigger.fixedResult) trigger.fixedResult = {};
							trigger.fixedResult[player.playerid] = player.$.BLacK;
						}
					}
				},
			},
			//kano
			shiguang: {
				trigger: { player: 'damageEnd' },
				priority: 222,
				filter(Evt: { num: number; }, player: any) {
					return Evt.num > 0;
				},
				direct: true,
				content: [() => {
					Evt.num = trigger.num;
					let next = player.chooseTarget('###' + get.prompt('shiguang') + '###令一名角色受到' + get.cnNumber(Evt.num) + '点伤害', function (card: any, player: any, target: any) {
						return target != _status.event.another;
					})
						.set('num', Evt.num)
						.set('another', trigger.source)
						.set('logSkill', 'shiguang')
						.set('ai', function (target: { hp: number; }) {
							var player = _status.event.player;
							var num = _status.event.num;
							var att = get.attitude(player, target);
							if (target.hp <= num) {
								return -att * (num + 1 - target.hp) * 2;
							} else {
								return -att;
							}
						});
				}, () => {
					if (result.bool && result.targets[0]) {
						result.targets[0].damage(Evt.num, trigger.source || 'nosource');
						if (!result.targets[0].$.shiguang_lose) result.targets[0].$.shiguang_lose = 0;
						result.targets[0].$.shiguang_lose += Evt.num;
						result.targets[0].addTempSkill('shiguang_lose', 'phaseBegin');
					}
				}],
				group: 'shiguang_source',
				subSkill: {
					source: {
						trigger: { source: 'damageSource' },
						priority: 222,
						filter(Evt: { num: number; }, player: any) {
							return Evt.num > 0;
						},
						direct: true,
						content: [() => {
							Evt.num = trigger.num;
							let next = player.chooseTarget('###' + get.prompt('shiguang') + '###令一名角色回复' + get.cnNumber(Evt.num) + '点体力', function (card: any, player: any, target: any) {
								return target != _status.event.another;
							});
							next.set('num', Evt.num);
							next.set('another', trigger.player);
							next.set('ai', function (target: { maxHp: number; hp: number; }) {
								var player = _status.event.player;
								var num = _status.event.num;
								var att = get.attitude(player, target);
								if (get.recoverEffect(target, player, player) <= 0 || target.maxHp - target.hp < num) {
									return -att * num;
								} else {
									return att * num;
								}
							});
						}, () => {
							if (result.bool && result.targets?.length) {
								player.logSkill('shiguang', result.targets);
								result.targets[0].recover(Evt.num);
								if (!result.targets[0].$.shiguang_gain) result.targets[0].$.shiguang_gain = 0;
								result.targets[0].$.shiguang_gain += Evt.num;
								result.targets[0].addTempSkill('shiguang_gain', 'phaseBegin');
							}
						}],
					},
					gain: {
						marktext: "失",
						locked: true,
						intro: {
							content: '在下个回合开始时失去&点体力',
						},
						mark: true,
						onremove(player: { loseHp: (arg0: any) => void; $: { shiguang_gain: any; }; }) {
							game.log('『失光』后续效果');
							game.delayx(0.5);
							player.loseHp(player.$.shiguang_gain);
							delete player.$.shiguang_gain;
						},
					},
					lose: {
						marktext: "失",
						locked: true,
						intro: {
							content: '在下个回合开始时回复&点体力',
						},
						mark: true,
						onremove(player: { isDamaged: () => any; recover: (arg0: any, arg1: string) => void; $: { shiguang_lose: any; }; }) {
							if (player.isDamaged()) {
								game.log('『失光』后续效果');
							}
							game.delayx(0.5);
							player.recover(player.$.shiguang_lose, 'nosource');
							delete player.$.shiguang_lose;
						},
					},
				}
			},
			//花丸
			rangran: {
				trigger: { player: 'useCard2' },
				priority: 222,
				filter(Evt: { card: any; targets: any[]; }, player: { $: { rangran: any[]; }; }) {
					var card = Evt.card;
					var info = get.info(card);
					if (info.allowMultiple == false) return false;
					if (!player.$.rangran) player.$.rangran = [];
					return game.countPlayer((cur: { isMaxHp: () => any; }) => {
						return cur.isMaxHp() && !player.$.rangran.contains(cur) && !Evt.targets.contains(cur) && lib.filter.targetEnabled2(Evt.card, player, cur);
					});
				},
				direct: true,
				content: [() => {
					console.log(player.$.rangran)
					let next = player.chooseTarget(get.prompt2('rangran'), [1, Infinity], function (card: any, player: { $: { rangran: any[]; }; }, target: { isMaxHp: () => any; }) {
						return target.isMaxHp() && !player.$.rangran.contains(target) && !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target)
					}).set('ai', function (target: any) {
						var evt = _status.event;
						return get.effect(target, evt.card, evt.source, evt.player);
					}).set('card', trigger.card).set('targets', trigger.targets);
				}, () => {
					if (result.bool && result.targets[0]) {
						player.logSkill('rangran');
						var targets = result.targets.slice(0);
						trigger.targets.addArray(targets);
						player.$.rangran.addArray(targets);
						player.line(targets, { color: [255, 224, 172] });
					}
				}],
				group: ['rangran_drawBy', 'rangran_clear'],
				subSkill: {
					drawBy: {
						trigger: { global: 'damageHit' },
						priority: 222,
						filter(Evt: { nature: any; player: { isMaxHp: () => any; }; }, player: any) {
							return Evt.nature && Evt.player.isMaxHp();
						},
						forced: true,
						content() {
							player.draw();
						}
					},
					clear: {
						trigger: { global: 'phaseEnd' },
						priority: 222,
						filter(Evt: any, player: { $: { rangran: any; }; }) {
							return player.$.rangran;
						},
						forced: true,
						silent: true,
						popup: false,
						content() {
							delete player.$.rangran;
						}
					},
				}
			},
			jiazhao: {
				trigger: { global: 'damageEnd' },
				filter(Evt: { player: { isIn: () => any; }; }, player: any) {
					return Evt.player.isIn();
				},
				check(Evt: { player: any; }, player: any) {
					return get.attitude(player, Evt.player) > 0;
				},
				logTarget: 'player',
				content() {
					trigger.player.draw(trigger.player.isMinHp() ? 2 : 1).gaintag = ['jiazhao'];
				},
				ai: {
					expose: 0.1,
				},
				global: 'jiazhao_discardBy',
				subSkill: {
					discardBy: {
						mod: {
							aiValue(player: any, card: { hasGaintag: (arg0: string) => any; }, num: number) {
								if (card.hasGaintag && card.hasGaintag('jiazhao')) return num / 10;
							},
						},
						trigger: { player: 'phaseBegin' },
						filter(Evt: { player: any; }, player: { countCards: (arg0: string, arg1: (card: any) => any) => any; }) {
							return Evt.player == player && player.countCards('h', (card: { hasGaintag: (arg0: string) => any; }) => card.hasGaintag('jiazhao'));
						},
						forced: true,
						content() {
							var hs = player.getCards('h', (card: { hasGaintag: (arg0: string) => any; }) => card.hasGaintag('jiazhao'));
							if (hs.length) player.discard(hs);
						}
					}
				}
			},
			//豹豹
			zhenbao: {
				trigger: { player: 'discardAfter' },
				filter(Evt: { cards: string | any[]; }, player: any) {
					if (!Evt.cards || Evt.cards.length < 2) return false;
					return game.hasPlayer((cur: { countCards: (arg0: string) => any; }) => {
						return !cur.countCards('j');
					});
				},
				priority: 22,
				direct: true,
				content: [() => {
					Evt.cards = trigger.cards;
					player.chooseTarget(function (card: any, player: any, target: { countCards: (arg0: string) => any; }) {
						return !target.countCards('j');
					}).set('card', Evt.card).set('ai', function (target: any) {
						var player = _status.event.player;
						return -get.attitude(player, target);
					}).set('prompt', get.prompt2('zhenbao'));
				}, () => {
					if (result.bool) {
						Evt.target = result.targets[0];
						player.logSkill('zhenbao', Evt.target);
					} else Evt.finish();
				}, () => {
					Evt.target.chooseCardButton(cards, '选择一张牌置于判定区', true);
				}, () => {
					if (result.bool) {
						var cards = result.links.slice(0);
						player.$give(cards, Evt.target, false);
						if (get.type(cards[0]) == 'delay') Evt.target.addJudge(cards[0]);
						else if (get.color(cards[0]) == 'red' && Evt.target.canAddJudge('lebu')) Evt.target.addJudge({ name: 'lebu' }, cards);
						else if (get.color(cards[0]) == 'black' && Evt.target.canAddJudge('bingliang')) Evt.target.addJudge({ name: 'bingliang' }, cards);
					}
				}],
			},
			heimo: {
				audio: 'quru',
				trigger: {
					player: 'damageEnd',
				},
				direct: true,
				filter(Evt: any, player: { countCards: (arg0: string) => any; }) {
					return player.countCards('he');
				},
				content: [() => {
					Evt.targets = [player];
					if (trigger.source && trigger.source.isIn()) {
						Evt.damageBy = true;
						Evt.targets.add(trigger.source);
					};
					let next = player.chooseToDiscard('he', [1, Infinity], get.prompt2('heimo', Evt.targets))
						.set('logSkill', ['heimo', Evt.targets, 'fire']);
				}, () => {
					if (result.bool) {
						Evt.num = result.cards.length;
					}
					else Evt.finish();
				}, () => {
					player.judge((card: any) => {
						return 0;
					}).callback = lib.skill.heimo.callback;
					if (--Evt.num) Evt.redo();
				}, () => {
					if (Evt.black && Evt.targets[1]) Evt.targets[1].damage();
				}, () => {
					if (Evt.red) player.draw(2);
				}],
				callback() {
					var evt = Evt.getParent('heimo');
					if (Evt.judgeResult.color == 'black') {
						evt.black = true;
						player.popup('黑色');
					}
					else if (Evt.judgeResult.color == 'red') {
						evt.red = true;
						player.popup('红色');
					}
					game.delay(2);
				},
			},
		},
		dynamicTranslate: {
			re_longdan(player) {
				let str = lib.translate.re_longdan_info;
				let result = /(阳~.*?)[；。].*(阴~.*?)[；。]/g.exec(str);
				let yang = result[1], yin = result[2];
				if (player.$.re_longdan === true) return str.replace(yang, lib.spanClass(yang, 'changetext'));
				return str.replace(yin, lib.spanClass(yin, 'changetext'));
			},
		},
		translate: {
			hololive: `HOLO`,

			re_KizunaAI: `新·绊爱`,
			re_ailian: `爱冀`,
			re_ailian_info: `当你受到伤害后或出牌阶段限一次，你可以将任意张手牌交给一名其他角色。当你于一个阶段内以此法给出第二张牌时，你可以视为使用一张基本牌。`,
			re_ailian_append: lib.figurer(`特性：传递关键牌`),

			re_YuNi: `新·YuNi`,
			re_shengcai: `声彩`,
			re_shengcai_info: `当你使用一张牌时，若与本回合此前被使用的牌颜色均不同，你可以摸X张牌。（X为本回合之前被使用的牌数）`,
			re_shengcai_append: lib.figurer(`回合内爆发（注意不要被其他人使用的牌干扰）`),

			re_TomariMari: `新·兎鞠まり`,
			liansheng: `恋声`,
			liansheng_info: `锁定技 你未受伤时性别为男；受伤时性别为女。你的性别变化时，若当前回合角色为女性，你摸一张牌。`,
			ruantang: `软糖`,
			ruantang_info: `你可以跳过判定阶段和摸牌阶段，令至多一名异性角色与你各回复1点体力，然后体力因此回复至上限的角色摸一张牌。`,

			re_Omesis: `新·欧米伽姐妹`,
			yaozhan: `邀战`,
			yaozhan_info: `你可以跳过摸牌阶段/出牌阶段，视为使用一张【决斗】。`,
			yaozhan_append: lib.figurer(`特性：易上手`),
			chongxin: `崇新`,
			chongxin_info: `当判定牌生效前，你可以用相同花色的牌替换之，然后你可以将获得的牌置于武将牌上。其他角色不能使用与之花色相同的牌响应你使用的【决斗】。`,

			re_NijikawaRaki: `新·虹河ラキ`,
			yayun: `押运`,
			laohuji: `老虎机`,
			yayun_info: `轮次技 在合适的时机，你可以弃置所有手牌，连续判定三次，每有一张判定牌花色包含于弃牌中，你便摸一张牌；若三次判定结果均为同一花色，你额外摸三张牌。`,
			yayun_append: lib.figurer(`特性：赌怪`),
			jidao: `极道`,
			jidao_info: `你可以防止对其他角色造成的伤害，改为令其发动一次『押运』。`,

			re_Fairys: `新·Fairys`,
			re_Fairys_ab: `新·鹦鹉`,
			ywshuangxing: `双形`,
			ywshuangxing_info: `当你成为黑色非基本牌/红色非装备牌的目标时，若你的体力为奇数/偶数，你可以取消之。`,
			yinni: `音拟`,
			yinni_info: `当你使用一张牌时，若与上一张被使用的牌颜色不同，你可将之目标数改为与上一张牌相同。若目标数因此减少，你摸一张牌。`,

			re_TenkaiTsukasa: `新·天开司`,
			re_pojie: `破戒`,
			re_pojie_info: `回合内，一名角色失去装备区的牌时，你可以摸一张牌。出牌阶段结束时，本阶段你每发动过一次此技能便弃置一张牌。`,
			re_dazhen: `大振`,
			re_dazhen_info: `出牌阶段，你可将你武器栏的牌移动至其他角色武器栏（代替原装备），然后其选择一项：<br>弃置你手牌数与手牌上限之差的牌；或受到你造成的1点伤害。`,

			re_KaguyaLuna: `新·辉夜月`,
			re_jiajiupaidui: `假酒`,
			re_jiajiupaidui_info: `每回合限一次，当你需要使用【酒】时，你可以令一名角色弃一张牌，若为♠或点数9，视为你使用之。`,

			re_MiraiAkari: `新·未来明`,
			duanli: `断离`,
			duanli_info: `出牌阶段限一次，你可以弃置所有手牌，然后你于回合结束时摸等量的牌。`,
			duanli_append: lib.figurer(`特性：制衡`),
			qingmi: `情迷`,
			qingmi_info: `其他角色使用【桃】后，可以令你摸一张牌。`,

			re_NekomiyaHinata: `新·猫宫日向`,
			yingdan: `盈弹`,
			yingdan_info: `你可以使用一张【杀】，视为使用了一张【闪】或【无懈可击】。若此【杀】的点数不大于你的攻击范围，则这些牌均不触发技能时机。`,
			yingdan_append: lib.figurer(`特性：强化出杀`),
			tianzhuo: `舔镯`,
			tianzhuo_info: `当其他角色死亡时，你可以获得其装备区的牌，若该角色由你杀死，你摸三张牌。`,

			re_KaguraNana: `新·神乐七奈`,
			re_DDzhanshou: `D斩`,
			re_DDzhanshou_info: `一名角色的回合结束时，若本回合其对除你和其以外的角色使用过红色牌，你可以摸一张牌或对其使用一张【杀】。`,

			re_Siro: `新·小白`,
			lingsi: `灵思`,
			lingsi_info: `出牌阶段限一次，你可以摸两张牌并弃两张牌。<br>你一次性弃置至少两张基本牌后，可以视为使用一张【杀】；一次性弃置至少两张非基本牌后，可以令一名角色回复1点体力。`,
			lingsi_append: lib.figurer(`特性：制衡`),

			re_Nekomasu: `新·ねこます`,
			re_dianyin: `承志`,
			re_dianyin_info: `当你受到 1 点伤害后，你可以令一名角色摸两张牌，若其手牌数少于你或为全场最少，改为摸三张牌。`,

			re_Noracat: `新·野良喵`,
			kouhu: `口胡`,
			kouhu_shan: `口胡-闪`,
			kouhu_sha: `口胡-杀`,
			kouhu_info: `每轮每项限一次。你可以令当前回合角色摸一张牌，视为打出了一张【杀】或使用了一张【闪】。`,
			zhiqiu: `直球`,
			zhiqiu_info: `当你发动『口胡』时，你可以与一名角色拼点，若你赢，你指定一名角色受到一点伤害；否则其对你造成一点伤害。`,

			re_XiaDi: `新·下地`,
			re_yinliu: `逐流`,
			re_yinliu_info: `出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。`,

			re_ShizukaRin: `新·静凛`,
			re_mozhaotuji: `夜杰`,
			re_mozhaotuji_DrawOrStop: `夜杰`,
			re_mozhaotuji_info: `每回合限一次，你可以将你的一个阶段变为出牌阶段。一个阶段结束时，若你于此阶段内使用了张牌，你摸一张牌。`,

			re_MitoTsukino: `新·月之美兔`,
			re_MitoTsukino_info: `月之美兔`,
			re_bingdielei: `盛蕾`,
			re_bingdielei_info: `轮次技 一个回合结束时，若你于该回合内失去过手牌，你可以获得一个额外回合。`,

			re_HiguchiKaede: `新·樋口枫`,
			re_zhenyin: `震音`,
			re_zhenyin_info: `每回合限一次，当你使用黑色牌指定目标后，可以将一名目标区域内的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。`,

			re_UshimiIchigo: `新·宇志海莓`,
			re_kuangren: `狂刃`,
			re_kuangren_info: `你的黑色【杀】可以额外指定一名角色为目标；你的红色【杀】无视距离与次数限制。`,
			re_jitui: `急退`,
			re_jitui_info: `当你受到伤害后或在回合外正面朝上失去非基本牌后，你可以摸一张牌。`,

			re_MononobeAlice: `新·物述有栖`,
			re_dianmingguzhen: `电鸣`,
			re_dianmingguzhen_info: `出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你可视为使用一张【雷杀】。`,

			re_MinamiNami: `新·美波七海`,
			re_longdan: `龙胆雄心`,
			re_longdan_info: `转换技 每回合限一次，阳~你可以将你任意一张不为【杀】的基本牌当作一张【杀】使用或打出；阴~你可以将一张【杀】当作任意一张不为【杀】的基本牌使用或打出。<br>
			你以此法转化点数大于7的牌无次数与距离限制。`,

			re_SisterClearie: `新·克蕾雅`,
			shenyou: `神佑`,
			shenyou_info: `锁定技 你受到来自基本牌的伤害+1；其它的伤害-1。`,
			shenfa: `神罚`,
			shenfa_info: `当你失去一张手牌时，你可以令一名其他角色获得『神佑』直到回合结束。`,
			shenfa_append: lib.figurer(`特性：易上手`),

			re_SuzukaUtako: `新·铃鹿诗子`,
			re_meici: `美词`,
			re_meici_info: `转换技 每回合限一次，有牌不因使用进入弃牌堆时，你可以获得其中一张①红色️②黑色️牌。`,
			re_danlian: `耽恋`,
			re_danlian_info: `当你于摸牌阶段外获得♦/♥/♠牌时，你可以将之合理的置于一名角色的判定区/手牌区/装备区。`,

			re_SuzuharaLulu: `新·铃原露露`,
			tunshi: `吞食`,
			tunshi_info: `其他角色于其回合外失去某区域最后一张牌时，你可以令当前回合角色获得之。你的回合内其他角色进入濒死状态时，你可以回复1点体力。`,

			re_LizeHelesta: `新·莉泽`,
			yubing: `语冰`,
			yubing_info: `你使用基本牌或通常锦囊牌后，若未被抵消，你可以令你不为0的手牌上限-1直到回合结束，然后摸两张牌。`,
			yubing_append: lib.figurer(`特性：易上手`),

			re_AngeKatrina: `新·安洁`,
			akxiaoqiao: `小巧`,
			akxiaoqiao_info: `弃牌阶段开始时，你可以展示任意张类型不同的手牌，本回合这些牌不计入手牌上限。`,
			akxiaoqiao_append: lib.figurer(`特性：易上手`),
			liancheng: `链成`,
			liancheng_info: `每轮限两次。一个回合结束时，你可以重铸任意张类型不同的手牌。若你重铸了装备牌，你可以令当前回合角色调整手牌与你相同。`,

			re_HonmaHimawari: `新·本间向日葵`,
			tianqing: `天晴烂漫`,
			tianqing_info: `一名角色受到伤害时，若本回合上一次伤害没有被防止，你可以防止本次伤害。`,
			mark_tianqing: `天晴烂漫`,
			mark_tianqing_info: `轮次技 一名角色受到伤害时，若本回合已有角色受过伤，你可以防止本次伤害。`,
			mark_tianqing_append: lib.figurer(`特性：减伤`),
			kuiquan: `葵拳连打`,
			kuiquan_info: `你可以将一张牌当【火攻】使用，此牌类型不得为本回合你使用过的类型。当你在【火攻】中弃置了【杀】后，获得目标的展示牌。`,

			re_AibaUiha: `新·相羽初叶`,
			kangding: `扛鼎膂力`,
			kangding_info: `你可以弃置一张武器牌令你即将造成的伤害+1；你可以弃置一张防具牌令你即将受到的伤害-1。`,
			kangding_append: lib.figurer(`特性：减伤`),
			longshe: `龙蛇笔走`,
			longshe_info: `出牌阶段限X次，你可以弃置一张基本牌并展示牌堆顶牌，若为基本牌，弃置之并摸一张牌。若为非基本牌，你可立即使用之。（X为你没有牌的装备栏数）`,

			re_SukoyaKana: `新·健屋花那`,
			re_huawen: `花吻`,
			re_huawen_info: `出牌阶段限一次，你可以弃置两张颜色不同的牌。<br>
			当你弃置两张颜色不同的牌时，可以视为使用其中的红色牌且此牌额外结算一次。`,
			re_liaohu: `疗护`,
			re_liaohu_info: `一个回合结束时，若你造成了伤害，可以令一名角色摸两张牌。若本回合『花吻』已发动，你可以改为摸一张牌并回复 1 点体力。`,

			re_ShirayukiTomoe: `新·白雪巴`,
			re_gonggan: `共感`,
			re_gonggan_info: `出牌阶段限一次，你可以弃置两张颜色不同的牌。<br>
			当你弃置两张颜色不同的牌时，可以视为使用其中的黑色牌且为此牌增加或减少一个目标。`,
			yejing: `夜境`,
			yejing_info: `每回合限一次，当你成为【杀】的目标时，你可以弃置一张点数更大的牌取消之。`,

			re_TokinoSora: `新·时乃空`,
			re_taiyangzhiyin: `阳语`,
			re_taiyangzhiyin_info: `你使用牌指定目标时，若此牌点数不小于10，你可选择一项：<br>令之无法响应；为之额外指定一名目标；或摸一张牌。`,
			re_taiyangzhiyin_append: lib.figurer(`特性：易上手`),

			re_RobokoSan: `新·萝卜子`,
			re_zhanxie: `战械`,
			re_zhanxie_info: `锁定技 你于出牌阶段可多使用两张【杀】。当你使用第三张【杀】时，摸两张牌。`,
			re_chongdian: `机电`,
			re_chongdian_info: `你受到雷电伤害时可改为回复等量体力。你的装备牌可当无距离限制的【雷杀】使用。`,

			re_ShirakamiFubuki: `新·白上吹雪`,
			re_yuanlv: `狐虑`,
			re_yuanlv_info: `每回合限一次，你使用锦囊后或受到伤害后，你可以摸三张牌，然后将两张牌置于牌堆顶。`,
			re_yuanlv_append: lib.figurer(`特性：易上手`),
			re_jinyuan: `边援`,
			re_jinyuan_info: `出牌阶段，你可以弃一张牌令一名其他角色摸一张牌，然后其可以立即使用那张牌。`,

			re_HoshimatiSuisei: `新·星街彗星`,
			cansha: `残杀`,
			cansha_info: `当你的实体【杀】生效后，你可以视为使用一张【过河拆桥】；当你的实体【过河拆桥】生效后，你可以视为使用一张【杀】。`,

			re_AkiRosenthal: `新·亚琦`,
			re_huichu: `烩料`,
			re_huichu_info: `轮次技 一名角色的回合开始时，你可以展示所有手牌，若均为红色，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。`,

			re_YozoraMel: `新·夜空梅露`,
			fuyi: `蝠翼`,
			fuyi_info: `锁定技 奇数轮内你计算与其他角色的距离-1，偶数轮内其他角色计算与你的距离+1。`,
			xihun: `吸魂`,
			xihun_info: `一名角色受到【杀】造成的伤害后，你可以摸一张牌。然后若你的手牌数大于手牌上限，你本轮不能再发动此技能。`,

			re_SakuraMiko: `新·樱巫女`,
			huangyou: `黄油`,
			huangyou_info: `出牌阶段，你可以弃置两张红色牌摸三张牌或回复1点体力，然后判定一次，若不为♥，本回合不能再发动此技能。`,
			huangyou_append: lib.figurer(`特性：赌怪`),
			qidao: `祈祷`,
			qidao_info: `当判定牌生效前，你可以弃一张牌重新判定。`,

			re_NatsuiroMatsuri: `新·夏色祭`,
			re_huxi: `恋上`,
			re_huxi_info: `当你不因此技能获得牌时，你可以与本回合未以此法指定的一名角色交换一张手牌。当你以此法获得红色牌时，你摸一张牌，使用的下一张【杀】不计入次数且伤害+1（不可叠加）。`,
			re_huxi_append: lib.figurer(`特性：传递关键牌 强化出杀`),
			re_huxi_buff: `恋上ing`,
			re_huxi_buff_info: `使用的下一张【杀】不计入次数且伤害+1`,

			re_AkaiHaato: `新·赤井心`,
			xinchixin: `赤心`,
			xinchixin_info: `当牌不因使用进入弃牌堆时，若其中有本回合未以此技能获得的♥牌，你可以获得其中一张红色牌；或将其中任意张牌置于牌堆顶。`,
			xinchixin_append: lib.figurer(`特性：回收关键牌`),

			re_NakiriAyame: `新·百鬼绫目`,
			guiren: `鬼刃`,
			guiren_info: `你可以将两张颜色不同的牌当做一张不计入次数的【杀】使用，根据你转化牌的类型获得对应效果：<br>基本~指定此【杀】的属性；锦囊~获得目标一张牌；装备~此【杀】伤害+1。`,
			guiren_append: lib.figurer(`特性：易上手 强化出杀 多次出杀`),

			re_MurasakiShion: `新·紫咲诗音`,
			anshu: `暗术`,
			anshu_info: `其他角色的回合结束时，若其手牌数不小于你，你可对其使用一张牌。且若此牌为♠，此牌不可被其响应。`,
			xingchi: `醒迟`,
			xingchi_info: `其他角色每回合使用的第一张牌不能指定你为目标。当你获得牌后，若你的手牌数：大于手牌上限，你可以将一张牌当【杀】使用；不大于手牌上限，你摸两张牌，然后本回合不再触发此项。`,

			re_UsadaPekora: `新·兔田佩克拉`,
			qiangyun: `强运`,
			qiangyun_info: `你的判定牌生效前，你可以打出一张牌代替之，然后你可以立即使用打出牌，且此牌造成伤害后，你摸一张牌。`,
			tuquan: `兔拳`,
			tuquan_info: `锁定技 你的【杀】被【闪】抵消时，你进行判定，若为♠，你弃置目标一张牌，若为♥，你弃置一张牌。`,
			tuquan_append: lib.figurer(`特性：强化出杀`),

			re_UruhaRushia: `新·润羽露西娅`,
			juebi: `绝壁`,
			juebi_info: `在你未受到伤害的回合内，你可以将非基本牌当【闪】使用或打出；你受到伤害后，可以令本回合下一次造成的伤害+1。`,
			zhanhou: `战吼`,
			zhanhou_info: `出牌阶段开始时/其他角色阵亡时，你可以受到1点无来源的伤害/回复1点体力，视为使用一张【顺手牵羊】。`,
			zhanhou_append: lib.figurer(`特性：易上手`),

			re_SpadeEcho: `新·黑桃影`,
			qinglve: `轻掠`,
			qinglve_info: `出牌阶段限一次，你可以废除一个装备栏，视为使用一张【顺手牵羊】。你的手牌上限和攻击范围始终增加你废除装备栏之数。`,
			yingshi: `影逝`,
			yingshi_info: `你可以将♣️牌当做最近进入弃牌堆的非♣️基本牌使用或打出。`,

			re_ŌzoraSubaru: `新·大空昴`,
			cejing: `策竞`,
			cejing_info: `一名角色的回合结束时，若其于此回合未造成伤害，你可以弃一张牌令其执行一个指定的额外阶段。此阶段结束时，你与其各摸等同本阶段造成伤害数的牌，若未因此摸牌，本轮此技能失效。`,
			cejing_append: lib.figurer(`特性：辅助`),

			re_TsunomakiWatame: `新·角卷绵芽`,

			re_XiaoxiXiaotao: `新·小希小桃`,
			re_doupeng: `逗捧`,
			re_doupeng_info: `出牌阶段限一次，你可以与一名其他角色拼点，赢的角色摸两张牌，没赢的角色可以令对方回复1点体力。`,
			re_xuyan: `虚研`,
			re_xuyan_info: `结束阶段，你可以选择一名其他角色：<br>直到你下个回合开始前，该角色造成过伤害时，你摸一张牌，若未造成伤害，你失去1点体力。`,

			re_InuyamaTamaki: `新·犬山玉姬`,
			re_hundunliandong: `混联`,
			re_hundunliandong_info: `出牌阶段限一次，你可以令任意势力不相同的角色各弃置一张牌。<br><br>
			此技能计算势力时，有「homolive」标记的角色视为同势力。`,
			re_hundunliandong_append: lib.figurer(`特性：强制弃牌`),

			re_KaguraMea: `新·神乐めあ`,
			fengna: `奉纳`,
			fengna_info: `出牌阶段限一次，你可以令手牌数大于你的角色依次交给你一张牌。`,
			fengna_append: lib.figurer(`特性：高嘲讽`),
			re_xiaoyan: `嚣言`,
			re_xiaoyan_info: `锁定技 你对手牌数小于你的角色使用牌不可被响应。`,

			re_OtomeOto: `新·乙女音`,
			re_yuxia: `龙箱`,
			re_yuxia_info: `每回合限一次，你可以将三张牌当作一张通常锦囊牌使用，此牌点数视为这些牌的合计。然后，你可以将其中一张置于牌堆顶。`,
			hanyin: `瀚音`,
			hanyin_info: `你使用牌被点数小于之的牌响应或抵消时，摸一张牌。`,

			re_HisekiErio: `新·绯赤艾莉欧`,
			re_huange: `幻歌`,
			re_huange_info: `轮次技 一个回合开始时，你可以摸等同一名角色体力值的牌，然后于回合结束时，弃置等同于该角色当前体力值的牌。`,
			re_huange_append: lib.figurer(`特性：易上手`),

			re_HanazonoSerena: `新·花園セレナ`,
			re_jiumao: `啾猫`,
			re_jiumao_info: `其他角色于弃牌阶段开始时，可以交给你任意张手牌；然后若你的手牌数与其相等，你可以于此阶段结束时使用一张牌，且此牌额外结算一次。`,
			re_enfan: `恩返`,
			re_enfan_info: `其他角色进入濒死状态时，你可以交给其任意张牌，然后其弃置任意张牌。若因此弃置的牌：<br>
			包含所有类型，其回复1点体力；包含所有颜色，你与其各摸一张牌。`,

			re_ŌokamiMio: `新·大神澪`,
			re_yuzhan: `预占`,
			re_yuzhan_info: `出牌阶段限一次，你可以观看牌堆顶的四张牌，若有两对颜色相同，你令当前回合角色获得其中一对，若不为你，你获得另一对。然后你将剩余牌以任意顺序置于牌堆顶或牌堆底。`,
			re_bizuo: `弼佐`,
			re_bizuo_info: `轮次技 一名角色的回合开始时，你可以将任意张牌置于牌堆顶，其本回合使用这些牌时，你可以发动一次『预占』。`,

			re_DoumyoujiHaruto: `新·道明寺晴翔`,
			shengfu: `胜负`,
			shengfu_info: `每轮每项限一次，当你需要使用【决斗】/【无懈可击】时，你可以与目标/来源拼点，赢则视为使用之，没赢则不能使用牌直到回合结束。<br>
			你的拼点牌亮出后，你可以令一方收回黑色拼点牌，改用牌堆顶牌代替。`,
			shengfu_append: lib.figurer(`特性：无损拼点`),
			wanbi: `完璧`,
			wanbi_info: `当你抵消其他角色的牌后，若其手牌数不小于你，你可以获得被抵消的牌。`,

			re_ShigureUi: `新·时雨羽衣`,
			uijieyuan: `结缘`,
			uijieyuan_info: `出牌阶段限一次，你可以将两张红色牌当【远交近攻】使用，若对本回合手牌数变化过的角色使用，则改为用一张非基本牌以转化。`,
			huixiang: `绘象`,
			huixiang_equip: `绘象`,
			huixiang_info: `出牌阶段或结束阶段，你可以指定场上的一张非宝物装备牌并交给拥有者一张牌，若你对应装备栏没有牌，你视为装备之直到下次发动此技能。被指定的装备进入弃牌堆时，你摸两张牌。`,
			huixiang_append: lib.figurer(`特性：难上手`),

			re_AZKi: `新·AZKi`,
			WHiTE: `WHiTE`,
			WHiTE_info: `当你受到伤害后，你可以观看来源的手牌并声明一种花色，其无法使用、打出或弃置该花色的牌直到回合结束。`,
			BLacK: `BLacK`,
			BLacK_info: `出牌阶段限一次，你可以指定一名其他角色，然后观看牌堆顶X张牌并用其中一张与其拼点，赢的角色对没赢的角色使用拼点牌。（X为目标体力值）`,
			BLacK_append: lib.figurer(`特性：难上手`),

			re_Kano: `新·鹿乃`,
			shiguang: `失光`,
			shiguang_info: `当你造成/受到伤害后，你可以令另一名角色回复等量体力/受到等量同来源伤害。然后下个回合开始时，其失去等量体力/回复等量体力。`,

			re_HanamaruHareru: `新·花丸晴琉`,
			rangran: `昂然`,
			rangran_info: `你使用牌可指定本回合未以此法指定过的场上体力最多角色为额外目标。场上体力最多的角色受到属性伤害后，你摸一张牌。`,
			jiazhao: `佳朝`,
			jiazhao_info: `当一名角色受到伤害后，你可以令其摸一张牌，若其体力值为全场最少，额外摸一张。其回合开始时弃置因此获得的牌。`,

			re_ShirakamiHaruka: `新·白神遥`,
			zhenbao: `心灵震豹`,
			zhenbao_info: `当你一次性弃置两张或更多的牌后，你可以令一名判定区没有牌的角色选择其中一张置于其判定区。`,
			heimo: `黑魔唤醒`,
			heimo_info: `当你受到伤害后，你可以弃置任意张牌并进行等量次判定。若判定结果中有黑色牌，你对来源造成1点伤害；若有红色牌，你摸两张牌。`,
			heimo_append: lib.figurer(`特性：卖血`),
		}
	}
})