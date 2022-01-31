window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return <currentObject>{
		name: 'vtuber',
		connect: true,
		character: {
			/**绊爱 */
			KizunaAI: ['female', 'upd8', 4, ['ailian', 'qixu'], ['zhu']],
			/**小白 */
			Siro: ['female', 'dotlive', 4, ['zhongxinghezou', 'xiugong'], ['zhu']],
			/**巴恰鲁 */
			Bacharu: ['male', 'dotlive', 4, ['zuodun', 'baidao']],
			/**小明 */
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			/**小希小桃 */
			XiaoxiXiaotao: ['female', 'xuyan', 3, ['yipengyidou', 'renleiguancha'], ['guoV']],
			/**兰音 */
			Reine: ['female', 'xuyan', 4, ['yueyao', 'kongling'], ['guoV']],
			/**辉夜月 */
			KaguyaLuna: ['female', 'qun', 3, ['jiajiupaidui', 'kuangzuiluanwu']],
			/**兔妈妈 */
			InabaHaneru: ['female', 'nanashi', '2/3', ['jiance', 'chanbing', 'buyu'], ['zhu']],
			/**BFM */
			UmoriHinako: ['female', 'nanashi', 4, ['hongyi', 'jueshou']],
			/**patra */
			SuouPatra: ['female', 'nanashi', 4, ['mianmo', 'tiaolv']],
			/**天开司 */
			TenkaiTsukasa: ['male', 'upd8', 4, ['pojie', 'dazhen']],

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

			/**步玎 */
			Pudding: ['female', 'psp', 4, ['tianlve', 'luxian'], ['guoV', 'P_SP']],
			/**粉兔 */
			AyanaNana: ['female', 'psp', '2/4', ['erni', 'shouru', 'chonghuang', 'yinzun'], ['zhu', 'guoV', 'P_SP']],
			/**红晓音 */
			KurenaiAkane: ['female', 'psp', 4, ['quankai', 'heyuan'], ['guoV', 'P_SP']],
			/**东爱璃 */
			Lovely: ['female', 'psp', 4, ['yangyao', 'shili'], ['guoV', 'P_SP']],
			/**阿秋 */
			AkiRinco: ['female', 'psp', 4, ['jiren', 'luqiu', 'canxin'], ['guoV', 'P_SP']],
			/**星汐Seki */
			Seki: ['female', 'psp', 4, ['zhuxing', 'shanzhu'], ['guoV', 'P_SP']],

			/**花谱 */
			Kaf: ['female', 'vwp', 3, ['liuhua', 'yishi', 'shiji'], ['zhu']],
			/**理芽 */
			Rim: ['female', 'vwp', 4, ['shenghua', 'zhanchong'],],
			/**异世界情绪 */
			IsekaiJoucho: ['female', 'vwp', 4, ['baiqing', 'shuangxing'],],
			/**春猿火 */
			Harusaruhi: ['female', 'vwp', 4, ['huoju', 'zouyang'],],
			/**幸祜 */
			Koko: ['female', 'vwp', 4, ['xiezhen', 'wenzhou'],],
			/**可不 */
			Kafu: ['female', 'vwp', 3, ['nisheng', 'jingyan']],

			/**塞菲拉·苏 */
			SephiraSu: ['female', 'qun', 3, ['mishu', 'xingchen']],
			/**姬雏 */
			HIMEHINA: ['female', 'qun', 3, ['jichu', 'mingshizhige']],

			/**泠鸢 */
			Yousa: ['female', 'VirtuaReal', 3, ['niaoji', 'ysxiangxing'], ['guoV']],
			/**阿梓 */
			Azusa: ['female', 'VirtuaReal', 4, ['zhiyue', 'zhengniu'], ['guoV']],
			/**勺宝 */
			Shaun: ['female', 'VirtuaReal', 3, ['juxiao', 'shshenyan'], ['guoV']],
			/**阿萨Aza */
			Aza: ['male', 'VirtuaReal', 3, ['qiding', 'chouxin'], ['guoV']],
			/**千幽Chiyuu */
			Chiyuu: ['female', 'VirtuaReal', 4, ['anyou', 'mingyou'], ['guoV']],
			/**茉里Mari */
			Mari: ['female', 'VirtuaReal', 4, ['tingzhu', 'xuemo'], ['guoV']],
			/**弥希MIKI */
			Miki: ['female', 'VirtuaReal', 4, ['xingxu', 'qingsui'], ['guoV']],
			/**真绯瑠mahiru */
			Mahiru: ['female', 'VirtuaReal', 4, ['jusheng', 'xingqu'], ['guoV']],

			/**胡桃 */
			Menherachan: ['female', 'NetEase', 4, ['shangbei', 'qianqing'], ['guoV']],

			/**犬山 */
			InuyamaTamaki: ['male', 'nori', 3, ['rongyaochengyuan', 'hundunliandong']],
			/**Mishiro */
			ShirayukiMishiro: ['female', 'nori', 3, ['tianyi', 'nveyu']],
			/**虾皇 */
			xiaoxiayu: ['female', 'xuefeng', 4, ['tanghuang', 'xiejiang'], ['guoV']],
			/**龟龟 */
			tianxixi: ['female', 'xuefeng', 3, ['lache', 'danfu'], ['guoV']],

			/**机萪 */
			jike: ['female', 'qun', 3, ['qianjiwanbian'], ['guoV']],
		},
		characterSort: {
			vtuber: {
				asoul2: ['Ava', 'Bella', 'Carol', 'Diana', 'EQueen'],
				VirtuaReal2: ['Yousa', 'Aza', 'Shaun', 'Miqiutu', , 'Azusa'],
				psp2: ['Pudding', 'AyanaNana', 'AkiRinco', 'KurenaiAkane', 'Lovely'],
			}
		},
		characterTitle: {
			KizunaAI: '#r绊虚之始',
			KaguyaLuna: '#p不羁的夜空之月',
			XiaoxiXiaotao: '#p研虚之实',

			Ava: '#rA_SOUL',
			Bella: '#rA_SOUL',
			Diana: '#rA_SOUL',
			Carol: '#rA_SOUL',
			EQueen: '#rA_SOUL',
		},
		characterReplace: {
			KizunaAI: ['re_KizunaAI', 'KizunaAI', 'sp_KizunaAI'],
			MiraiAkari: ['re_MiraiAkari', 'MiraiAkari'],
			TenkaiTsukasa: ['re_TenkaiTsukasa', 'TenkaiTsukasa'],
			KaguyaLuna: ['re_KaguyaLuna', 'KaguyaLuna'],
			XiaoxiXiaotao: ['re_XiaoxiXiaotao', 'XiaoxiXiaotao'],
			InuyamaTamaki: ['re_InuyamaTamaki', 'InuyamaTamaki'],
			InabaHaneru: ['InabaHaneru', 'gz_InabaHaneru', 'old_InabaHaneru'],

			Azusa: ['Azusa', 'ap_Azusa'],
			Nana7mi: ['Nana7mi', 'ap_Nana7mi'],

			Ava: ['Ava', 'sp_Ava', 'sea_Ava', 'gz_Ava'],
			Diana: ['Diana', 'sp_Diana'],
		},
		characterIntro: {
			KizunaAI: '绊爱者，沛国焦郡人也，生于V始元年，以人工智障号之，有《FAQ赋》流传于世，爱有贤相，名曰望，左右心害其能，因谗之，望行仁义而怀anti，遂还相位，是以绊爱得王V界，威加四海，世人多之.',
			MiraiAkari: "未来明（V始二年），生于荆楚郡望，少时猎虎不慎坠马，遂记忆尽失，同族有长者初音未来，携明识山见水，阿满童年如此。V始十九年，绊爱既首义，天下豪杰并起，明亦王于西南，定国号为ENTUM，后为小人夺之，满知无经纬之才，遁入山中，不闻世事。",
			InuyamaTamaki: '犬山玉姬者，草莽微末之士也，原为东都一亭长，后绊爱首义，豪杰并起，犬山自叹曰，金鳞岂是池中物，遂聚族起义，然命运多舛，先败朝廷，又为四天王猜忌，幸而频频与杏社、虹社联动，渐得民心，立国时已四十有六。犬山帐下将军皆封之曰姬，世人戏称之曰娘子军，犬山亦不屑一顾。',
			XiaoxiXiaotao: '小希者，魔都之望族也，魔都的破坏者，屡欲炸虚研村，后为小桃止之，魔都土妹，穿模之神，多有传说流传于世，小桃者，小希之后辈也，昔有伯乐识千里马，小桃制小希亦是之矣，有沙雕观察广为人知。',
			KaguyaLuna: '辉夜月者，燕赵之侠客也，生于V始元年，性豪爽，声奇特，有可卡因酱之美名，luna少时绊爱交好，亲涉矢石披坚执锐，成绊爱之功业，然rap一战，恩断义绝，自领军建国，国号为辉夜月channel，追随者数以兆记。',
			UmoriHinako: '宇森雏子，异界之蝙蝠者，随黄兔因幡氏战于列阳东，伐乌桓、鲜卑、高句丽诸部，取之以红旗，修律，重末，百姓安，震周之诸侯。雏子善战，屡自鼓乐助御敌，谓之《攻击战》，后友人常效之。然雏子初修律，列阳东遭百年不遇之饥，敌者饥之为“绝收将军”，雏子不意此事。V始十九年，为仇设计所刺，不幸卒。后二年，地尽数入于京畿神乐咩之手，咩与雏子为旧识，遂善置此地旧民。',
			InabaHaneru: '因幡哈涅鲁，异界之黄兔者，精通东瀛书花五道，起势以后，割据幽州及扶余，后建社，号曰‘佚’。佚社初效始皇绊爱之治，怀柔四方，广纳封臣，固有宇森雏子、周防帕特拉之能臣，然因幡氏深知功不足自坐此位，终不称王，后竟服于绊爱势。所幸周无大患，因幡氏亦与神乐咩犬山玉姬之势远交联合，佚社渐广，绊爱势溃后，即背，改与魔族周防帕特拉共治。至于雏子卒，因幡甚悲，至常自怨，引怀柔之首共治，杏户氏与龙龙崎氏由此入朝。后之佚社，终黯淡于杏国虹社者。',

			Qiankesaier: '',
		},
		skill: {
			ailian: {
				audio: 1,
				enable: 'phaseUse',
				position: 'h',
				filter(Evt, player) {
					if (player.hasSkill('ailianUsable')) return false;
					return player.countCards('h') > 0;
				},
				content() {
					'step 0'
					if (!player.storage.targets) player.storage.targets = [];
					if (player.countCards('h') > 0) {
						player.chooseTarget('指定一个给予牌的目标', function (card, player, target) {
							if (target == player) return false;
							if (player.storage.targets) {
								for (var i = 0; i < player.storage.targets.length; i++) {
									if (player.storage.targets[i] == target) {
										return false;
									}
								}
								return true
							}
							else {
								return true
							}
						}, function (target) {
							var player = _status.event.player;
							if (get.attitude(player, target) <= 0) return 0;
							else return get.attitude(player, target);
						});
					}
					else {
						Evt.goto(3);
					}
					'step 1'
					//console.log(result);
					if (result?.bool) {
						if (result.targets) {
							if (!player.storage.targets) player.storage.targets = [];
							if (!Evt.targets.contains(result.targets[0])) {
								Evt.targets.addArray(result.targets);
								player.storage.targets.addArray(result.targets);
							}
							Evt.target = result.targets[0];
						}
						player.chooseCard(true, 'h', '选择要交给' + get.translation(Evt.target) + '的牌', [1, Infinity]).set('ai', card => {
							if (player.isZhu) return 6 - get.useful(card);
							return 7 - get.useful(card);
						})
					}
					else {
						Evt.goto(3);
					}
					'step 2'
					if (result.bool == true) {
						Evt.cards.addArray(result.cards);
						Evt.target.gain(result.cards, Evt.player, 'give');
						if (player.countCards('h')) {
							Evt.goto(0);
						}
					}
					else {
						Evt.targets.pop();
						player.storage.targets.pop();
					}
					'step 3'
					var difType = true;
					var TypeList = [];
					if (Evt.targets && Evt.targets.length > 0) {
						for (var i = 0; i < Evt.cards.length; i++) {
							TypeList.add(get.type(Evt.cards[i]));
							if (TypeList.indexOf(get.type(Evt.cards[i])) != i) {
								difType = false;
								break;
							}
						}
					}
					else {
						Evt.goto(10);
					}
					if (difType == false) {
						Evt.goto(6);
					}
					'step 4'
					player.chooseTarget('是否令' + Evt.cards.length.toString() + '名角色横置？', Evt.cards.length, function (card, player, target) {
						return true;
					}).set('ai', function (target) {
						var player = _status.event.player;
						return get.effect(target, { name: 'tiesuo' }, player, player);
					});
					'step 5'
					if (result.bool == true) {
						result.targets.forEach(element => element.link());
					}
					'step 6'
					var distanceGroup = false;
					for (var i = 0; i < Evt.targets.length; i++) {
						distanceGroup = false;
						for (var j = 0; j < Evt.targets.length; j++) {
							if (i == j) {
								continue;
							}
							else if (get.distance(player.storage.targets[i], player.storage.targets[j], 'pure') == 1) {
								distanceGroup = true;
								break;
							}
						}
						if (distanceGroup == false) {
							break;
						}
					}
					if (distanceGroup == false) {
						Evt.goto(10);
					}
					'step 7'
					if (Evt.targets.length > 1) {
						Evt.num = Evt.targets.length;
						let list = [];
						for (let i of get.inpile('basic')) {
							if (lib.filter.cardUsable({ name: i }, player, Evt.getParent('chooseToUse')) && player.hasUseTarget(i)) {
								list.push(['基本', '', i]);
								if (i == 'sha') {
									list.push(['基本', '', 'sha', 'fire']);
									list.push(['基本', '', 'sha', 'thunder']);
									list.push(['基本', '', 'sha', 'ice']);
								}
							}
						}
						if (list.length) {
							player.chooseButton(['是否视为使用一张基本牌？', [list, 'vcard']]).set('ai', function (button) {
								var player = _status.event.player;
								var card = { name: button.link[2], nature: button.link[3] };
								switch (card.name) {
									case 'tao':
										if (player.hp == 1 || (player.hp == 2 && !player.hasShan()) || player.needsToDiscard()) {
											return 5;
										}
										return 1 + Math.random();
									case 'sha':
										if (game.hasPlayer(cur => {
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
					}
					else {
						Evt.goto(10);
					}
					'step 8'
					if (result.control != 'cancel2') {
						let usecard = { name: result.links[0][2], nature: result.links[0][3] };
						Evt.usecard = usecard;
						player.chooseTarget('选择至多' + Evt.targets.length.toString() + '个目标', [1, Evt.num], function (card, player, target) {
							return lib.filter.targetEnabled(_status.event.card, player, target)
						}).set('ai', function (target) {
							var player = _status.event.player;
							var card = _status.event.card;
							return get.effect(target, card, player, player);
						}).set('card', Evt.usecard);
					}
					else {
						Evt.goto(10);
					}
					'step 9'
					//console.log(result);
					if (result.targets)
						Evt.targets = result.targets;
					else Evt.targets = [];
					player.useCard(Evt.usecard, Evt.targets, true);
					'step 10'
					if (Evt.targets && Evt.targets.length == 0 && Evt.cards.length == 0) {
						if (player.hasSkill('ailianUsable')) player.removeSkill('ailianUsable');
					}
					else {
						player.addSkill('ailianUsable');
						delete player.storage.targets;
						Evt.finish();
					}
				},
				ai: {
					order(skill, player) {
						if (game.hasPlayer(cur => {
							return cur != player && get.attitude(player, cur) > 0;
						})) {
							if (player.needsToDiscard()) {
								return 1 + Math.random();
							}
							return 5 + Math.random();
						}
						else return 0;
					},
					result: {
						player(player, target) {
							if (player.needsToDiscard()) return Math.random();
							return Math.random() - 0.6;
						}
					},
					threaten: 0.8
				},
			},
			ailianUsable: {
				trigger: { global: ['phaseUseAfter', 'phaseAfter'] },
				silent: true,
				filter(Evt) {
					return Evt.skill != 'ailian';
				},
				content() {
					player.removeSkill('ailianUsable');
				}
			},
			qixu: {
				unique: true,
				group: ['qixu1', 'qixu2', 'qixu4'],
				zhuSkill: true,
			},
			qixu1: {
				trigger: { player: ['chooseToRespondBefore'] },
				check(Evt) {
					if (Evt.qixu) return false;
					return true;
				},
				filter(Evt, player) {
					if (Evt.responded) return false;
					//if(player.storage.qixuing) return false;
					if (!player.hasZhuSkill('qixu')) return false;
					if (player.hasSkill('qixu3')) return false;
					if (!Evt.filterCard({ name: 'sha' }, player, Evt)) return false;
					return game.hasPlayer(cur => {
						return cur != player;
					});
				},
				content() {
					"step 0"
					if (!player.hasSkill('qixu3'))
						player.addSkill('qixu3');
					if (Evt.current == undefined) Evt.current = player.next;
					if (Evt.current == player) {
						Evt.getParent(2).step = 0;
						Evt.finish();
					}
					else if (Evt.current) {
						//player.storage.qixuing=true;
						var next = Evt.current.chooseCard(get.translation(player) + '声明使用一张杀，是否替弃置一张杀阻止',
							function (card, player, Evt) {
								Evt = Evt || _status.event;
								return card.name == 'sha';
							}, { name: 'sha' }, 1);
						next.set('ai', function () {
							var Evt = _status.event;
							return (get.attitude(Evt.player, Evt.source) + 1);
						});
						next.set('source', player);
						next.set('qixu', true);
						next.set('skillwarn', '阻止' + get.translation(player) + '打出一张杀');
						next.noOrdering = true;
						next.autochoose = lib.filter.autoRespondSha;
					}
					else {
						Evt.current = Evt.current.next;
						Evt.redo();
					}
					"step 1"
					//player.storage.qixuing=false;
					if (!result.bool) {
						Evt.current = Evt.current.next;
						if (Evt.current == player) {
							Evt.goto(2);
						}
						else {
							Evt.goto(0);
						}
					}
					else {
						Evt.current.discard(result.cards);
						Evt.finish();
					}
					'step 2'
					trigger.result = { bool: true, card: { name: 'sha', isCard: true } };
					trigger.responded = true;
					trigger.animate = false;
					if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
						Evt.current.ai.shown += 0.3;
						if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
					}
					Evt.finish();
				}
			},
			qixu2: {
				enable: 'chooseToUse',
				prompt: '选择一名目标角色。若其他角色不弃置【杀】响应，则视为你对其使用【杀】。',
				filter(Evt, player) {
					if (Evt.filterCard && !Evt.filterCard({ name: 'sha' }, player, Evt)) return false;
					if (!player.hasZhuSkill('qixu')) return false;
					if (player.hasSkill('qixu3')) return false;
					if (!lib.filter.cardUsable({ name: 'sha' }, player)) return false;
					return game.hasPlayer(cur => {
						return cur != player;
					});
				},
				filterTarget(card, player, target) {
					if (_status.event._backup &&
						typeof _status.event._backup.filterTarget == 'function' &&
						!_status.event._backup.filterTarget({ name: 'sha' }, player, target)) {
						return false;
					}
					return player.canUse({ name: 'sha' }, target);
				},
				content() {
					"step 0"
					if (!player.hasSkill('qixu3'))
						player.addSkill('qixu3');
					if (Evt.current == undefined) Evt.current = player.next;
					if (Evt.current == player) {
						Evt.getParent(2).step = 0;
						Evt.finish();
					}
					else if (Evt.current) {
						var next = Evt.current.chooseCard(get.translation(player) + '对' + get.translation(target) + '使用一张杀，是否替弃置一张杀阻止',
							function (card, player, Evt) {
								Evt = Evt || _status.event;
								return card.name == 'sha';
							}, { name: 'sha' }, 1);
						next.set('ai', card => {
							var Evt = _status.event;
							return -get.effect(Evt.target, card, Evt.source, Evt.player);
						});
						next.set('source', player);
						next.set('target', target);
						next.set('qixu', true);
						next.set('skillwarn', '阻止' + get.translation(player) + '打出一张杀');
						//next.noOrdering=true;
						//next.autochoose=lib.filter.autoRespondSha;
					}
					else {
						Evt.current = Evt.current.next;
						Evt.redo();
					}
					"step 1"
					if (result.bool) {
						Evt.current.discard(result.cards);
						Evt.finish();
					}
					else {
						Evt.current = Evt.current.next;
						if (Evt.current == player) {
							Evt.getParent(2).step = 0;
							Evt.goto(2);
						}
						else {
							Evt.goto(0);
						}
					}
					'step 2'
					if (result.cards && result.cards.length) {
						player.useCard({ name: 'sha', isCard: true }, result.cards, target).animate = false;
					}
					else {
						player.useCard({ name: 'sha', isCard: true }, target).animate = false;
					}
					if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
						Evt.current.ai.shown += 0.3;
						if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
					}
				},
				ai: {
					respondSha: true,
					skillTagFilter(player) {
						if (!player.hasZhuSkill('qixu')) return false;
						return true;
					},
					result: {
						target(player, target) {
							if (player.hasSkill('qixu3')) return 0;
							return get.effect(target, { name: 'sha' }, player, target);
						}
					},
					order() {
						return get.order({ name: 'sha' }) - 0.1;
					},
				}
			},
			qixu3: {
				trigger: {
					global: 'roundStart'
				},
				mark: true,
				intro: { content: '一轮后重置(杀)' },
				silent: true,
				// filter(Evt){
				// 	return Evt.skill!='qixu2'&&Evt.skill!='qixu4';
				// },
				content() {
					player.removeSkill('qixu3');
				}
			},
			qixu4: {
				unique: true,
				trigger: { player: ['chooseToRespondBefore', 'chooseToUseBefore'] },
				filter(Evt, player) {
					if (Evt.responded) return false;
					//if(player.storage.qixu4) return false;
					if (!player.hasZhuSkill('qixu')) return false;
					if (player.hasSkill('qixu5')) return false;
					if (!Evt.filterCard({ name: 'shan' }, player, Evt)) return false;
					return true;
				},
				check(Evt, player) {
					if (get.damageEffect(Evt.player, player, player) < 0) return true;
					return true;
				},
				content() {
					"step 0"
					player.addSkill('qixu5');
					if (Evt.current == undefined) Evt.current = player.next;
					if (Evt.current == player) {
						Evt.goto(2);
					}
					else if (Evt.current) {
						//player.storage.qixu4=true;
						// var next=Evt.current.chooseToDiscard('弃置一张闪阻止'+get.translation(player)+'发动技能？',{name:'shan'},
						// function(card,player,Evt){
						// 	Evt=Evt||_status.event;
						// 	return card.name=='shan';
						// },1);
						var next = Evt.current.chooseCard(get.translation(player) + '声明使用一张闪，是否替弃置一张闪阻止', { name: 'shan' },
							// function(card,player,Evt){
							// 	return card.name=='shan';
							// },
							1, false);
						// next.set('ai',card => {
						// 	var Evt=_status.event;
						// 	return get.effect(Evt.target,card,Evt.event.source,Evt.player);
						// });
						next.set('ai', function () {
							var Evt = _status.event;
							return (3 - get.attitude(Evt.player, Evt.source));
						});
						next.set('skillwarn', '阻止' + get.translation(player) + '技能生效');
						next.autochoose = lib.filter.autoRespondShan;
						next.set('source', player);
					}
					"step 1"
					//player.storage.qixu4=false;
					//console.log(result);
					if (result.bool) {
						Evt.current.discard(result.cards);
						Evt.finish();
					}
					else {
						Evt.current = Evt.current.next;
						if (Evt.current == player) {
							Evt.goto(2);
						}
						else {
							Evt.goto(0);
						}
					}
					'step 2'
					trigger.result = { bool: true, card: { name: 'shan', isCard: true } };
					trigger.responded = true;
					trigger.animate = false;
					//player.addSkill('qixu3');
					if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
						Evt.current.ai.shown += 0.3;
						if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
					}
					Evt.finish();
				},
				ai: {
					respondShan: true,
					skillTagFilter(player) {
						if (player.storage.qixu) return false;
						if (!player.hasZhuSkill('qixu')) return false;
						return true;
					},
				},
			},
			qixu5: {
				trigger: {
					global: 'roundStart'
				},
				mark: true,
				intro: { content: '一轮后重置(闪)' },
				silent: true,
				// filter(Evt){
				// 	return Evt.skill!='qixu2'&&Evt.skill!='qixu4';
				// },
				content() {
					player.removeSkill('qixu5');
				}
			},
			rongyaochengyuan: {
				trigger: {
					player: "damageBegin3",
				},
				//alter:true,
				filter(Evt, player) {
					if (Evt.source == undefined || Evt.source == player) return false;
					if (Evt.source.hasSkill('rongyaochengyuan_homolive')) return false;
					return true;
				},
				prompt2(Evt, player) {
					return '给' + get.translation(Evt.source) + '添加homolive标记,并抵挡此次伤害';
				},
				logTarget: 'source',
				content() {
					'step 0'
					player.logSkill('rongyaochengyuan', trigger.source);
					trigger.source.addSkill('rongyaochengyuan_homolive');
					'step 1'
					trigger.changeToZero();
				},
				subSkill: {
					homolive: {
						mark: true,
						marktext: 'HO',
						intro: {
							name: 'Homolive',
							content: '我一直都是Homolive的一员啊！'
						},
					},
				},
			},
			hundunliandong: {
				audio: 3,
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card, player, target) {
					var targets = [player].concat(ui.selected.targets);
					if (targets.contains(target)) return false;
					for (let i = 0; i < targets.length; i++) {
						if (targets[i].hasSkill('rongyaochengyuan_homolive') && target.hasSkill('rongyaochengyuan_homolive')) {
							return false;
						}
						if (targets[i].group == target.group) {
							return false;
						}
					}
					return target.countCards('he');
				},
				complexTarget: true,
				multitarget: true,
				selectTarget: [1, Infinity],
				content() {
					var targets = [player].concat(targets);
					'step 0'
					if (Evt.dropCardsType == null) {
						Evt.dropCardsType = [];
						Evt.dropCards = [];
						Evt.playerIndex = 0;
						Evt.dialogId = 0;
					}
					if (targets.length >= 1) {
						if (targets[Evt.playerIndex].countCards('he')) {
							Evt.handcardsCount = targets[Evt.playerIndex].countCards('h');
							targets[Evt.playerIndex].chooseToDiscard(true, 1, 'he', '『混沌联动』：弃置一张牌');
						}
						else {
							Evt.handcardsCount = -1;
						}
					}
					else {
						Evt.goto(3);
					}
					'step 1'
					if (result.cards && result.cards.length) {
						Evt.dropCards.addArray(result.cards);
						Evt.dropCardsType = get.suit3(Evt.dropCards);
					}
					'step 2'
					if (Evt.handcardsCount != -1) {
						if (targets[Evt.playerIndex].countCards('h') == 0 && Evt.handcardsCount != 0) {
							Evt.goto(3);
						}
						else {
							ui.clear();
							if (Evt.dialog && Evt.dialogId) {
								Evt.dialog.close();
								_status.dieClose.remove(Evt.dialog);
								game.broadcast('closeDialog', Evt.dialogId);
								game.broadcast(function (id) {
									var dialog = get.idDialog(id);
									if (dialog) {
										_status.dieClose.remove(dialog);
									}
								}, Evt.dialogId);
							}
							Evt.dialog = ui.create.dialog('混沌联动', Evt.dropCards, true);
							_status.dieClose.push(Evt.dialog);
							Evt.dialog.videoId = lib.status.videoId++;
							game.broadcast(function (cards, id) {
								var dialog = ui.create.dialog('混沌联动', cards, true);
								_status.dieClose.push(dialog);
								dialog.videoId = id;
							}, Evt.dropCards, Evt.dialog.videoId);
							Evt.dialogId = Evt.dialog.videoId;
							if (Evt.dropCardsType.length >= 4) {
								Evt.goto(3);
							}
							else {
								Evt.playerIndex++;
								if (Evt.playerIndex >= targets.length) {
									Evt.playerIndex = 0;
								}
								Evt.goto(0);
							}
						}
					}
					else {
						Evt.playerIndex++;
						if (Evt.playerIndex < targets.length) {
							Evt.goto(0);
						}
						else {
							Evt.playerIndex = 0;
							Evt.goto(0);
						}
					}
					'step 3'
					///显示当前弃牌框，待改进
					ui.clear();
					game.broadcast('closeDialog', Evt.dialogId);
					if (Evt.dialog && Evt.dialogId) {
						Evt.dialog.close();
						_status.dieClose.remove(Evt.dialog);
						game.broadcast('closeDialog', Evt.dialogId);
						game.broadcast(function (id) {
							var dialog = get.idDialog(id);
							if (dialog) {
								_status.dieClose.remove(dialog);
							}
						}, Evt.dialogId);
					}
				},
				ai: {
					order: 7,
					result: {
						player(player, target) {
							if ((get.mode() != 'identity' || game.roundNumber > 1) && player.countCards('h') > 1) return 1;
							else return -0.2;
						},
						target(player, target) {
							if (!target.countCards('h')) return -2;
							return -target.countCards('h') / 2;
						}
					},
				},

			},
			zhongxinghezou: {
				init(player) {
					if (!player.storage.zhongxinghezou) {
						player.storage.zhongxinghezou = [];
					}
				},
				trigger: {
					player: 'useCard2'
				},
				filter(Evt, player) {
					if (!(get.itemtype(Evt.cards) == 'cards')) return false
					// if (Evt.getParent().triggeredTargets3.length > 1) return false;
					return get.number(Evt.card) && !player.hasSkill('zhongxinghezou_used');
				},
				check(Evt, player) {
					var effect = 0;
					if (Evt.card.name == 'wuxie' || Evt.card.name == 'shan') {
						if (get.attitude(player, Evt.starget) < -1) {
							effect = -1;
						}
					}
					else if (Evt.targets && Evt.targets.length) {
						for (var i = 0; i < Evt.targets.length; i++) {
							effect += get.effect(Evt.targets[i], Evt.card, Evt.player, player);
						}
					}
					return get.number(Evt.card) < 6 || effect < 3;
				},
				content() {
					'step 0'
					Evt.ctargets = trigger.targets;
					player.chooseTarget(get.prompt2('zhongxinghezou'), function (card, player, target) {
						return !_status.event.targets.contains(target) && target.countCards('h');
					}).set('ai', function (target) {
						return 2 - get.attitude(_status.event.player, target);
					}).set('targets', trigger.targets);
					'step 1'
					if (result.bool && result.targets[0]) {
						Evt.starget = result.targets[0];
						var att = get.attitude(Evt.starget, player);
						var num = get.number(trigger.card);
						var effect = 0;
						if (trigger.card.name == 'wuxie' || trigger.card.name == 'shan') {
							if (get.attitude(player, Evt.starget) < -1) {
								effect = -1;
							}
						}
						else if (trigger.targets && trigger.targets.length) {
							for (var i = 0; i < trigger.targets.length; i++) {
								effect += get.effect(trigger.targets[i], trigger.card, Evt.starget, player);
							}
						}
						Evt.starget.chooseCard(true, 'h', '众星合奏：亮出一张手牌').set('ai', card => {
							var source = _status.event.source;
							var att = _status.event.att;
							var num = _status.event.num;
							var player = _status.event.player;
							var effect = _status.event.effect;
							if (get.number(card) + num == 12) {
								if (att > 0 || get.recoverEffect(player, source, player)) return 8 - get.useful(card);
								else return 0;
							}
							else if (get.number(card) + num < 12) {
								return -effect - get.useful(card);
							}
							else {
								return 4 - get.useful(card);
							}
						}).set('att', att).set('num', num).set('effect', effect).set('source', player);
					}
					else {
						Evt.finish();
					}
					'step 2'
					if (result.bool && result.cards.length) {
						player.addTempSkill('zhongxinghezou_used')
						Evt.starget.showCards(result.cards);
						Evt.card = result.cards[0];
						var num = get.number(Evt.card) + get.number(trigger.card);
						if (num < 12) {
							// trigger.targets.length=0;
							// trigger.getParent().triggeredTargets2.length=0;
							player.gain(result.cards, Evt.starget, 'give');
							trigger.cancel();
						}
						if (num >= 12) {
							player.storage.zhongxinghezou.push({
								source: trigger.card.cardid,
								user: Evt.starget,
								card: Evt.card,
								targets: Evt.ctargets,
							});
						}
						if (num == 12) {
							player.draw();
							Evt.starget.recover(player);
						}
					}
					else {
						Evt.finish();
					}
				},
				group: ['zhongxinghezou_use'],
				subSkill: {
					use: {
						forced: true,
						trigger: {
							player: 'useCardAfter',
						},
						filter(Evt, player) {
							if (!Evt.card.isCard) return false;
							if (!player.storage.zhongxinghezou.length) return false;
							return true;
						},
						content() {
							player.storage.zhongxinghezou.forEach(function (item) {
								if (item.source == trigger.card.cardid) {
									item.targets.forEach(function (tar) {
										if (item.user.canUse(item.card, tar)) {
											item.user.useCard(item.card, tar);
										}
									})
									player.storage.zhongxinghezou.remove(item);
								}
							})
						}
					},
					used: {},
				}
			},
			xiugong: {
				trigger: { player: 'phaseUseBegin' },
				priority: 199,
				filter(Evt, player) {
					return game.hasPlayer(cur => {
						return cur != player;
					});
				},
				check(Evt, player) {
					return true;
				},
				content() {
					'step 0'
					player.chooseTarget('选择『天道宿宫』的目标', true, function (card, player, target) {
						return target != player
					});
					'step 1'
					if (result.bool) {
						Evt.target = result.targets[0];
						Evt.num = Evt.target.countCards('h');
						if (Evt.num > 0) {
							Evt.reality = Evt.target.countCards('h', { type: ['trick', 'delay'] });
							var rand = 1.5 * Math.pow(Math.random(), Evt.num)
							if (player.hasSkillTag('viewHandcard', null, Evt.target, true)) rand = 1;
							var list = ['0张'];
							for (var i = 1; i <= Evt.num; i++) {
								list.push(i + '张');
							}
							player.chooseControl('dialogcontrol', list, true).set('ai', function () {
								var num = _status.event.num;
								if (_status.event.rand > Evt.getRand()) {
									console.log(_status.event.reality)
									return _status.event.reality + '张';
								}
								if (Evt.getRand() < 1 / num) return _status.event.reality + '张';
								return list.randomGet();
							}).set('prompt', '猜测' + get.translation(Evt.target) + '手牌中锦囊牌的数量').set('num', Evt.num).set('rand', rand).set('reality', Evt.reality);
						} else {
							player.draw();
							Evt.finish();
						}
					}
					'step 2'
					if (result.control) {
						player.chat(result.control);
						game.log(player, '猜测', Evt.target, '手中有' + result.control + '锦囊牌');
						var num = result.control.substring(0, 1);
						Evt.target.showHandcards();
						if (num == Evt.reality) {
							player.draw();
							if (player.storage.xiugong_times == 0) player.storage.xiugong_times = num;
						}
					}
				},
				involve: 'zhongxinghezou',
				group: ['xiugong_times', 'xiugong_clear'],
				subSkill: {
					times: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger: { player: 'useCard2' },
						firstDo: true,
						forced: true,
						filter(Evt, player) {
							console.log(player.storage.xiugong_times)
							return player.storage.xiugong_times > 0 && player.hasSkill('zhongxinghezou_used');
						},
						content() {
							player.storage.xiugong_times--;
							player.removeSkill('zhongxinghezou_used');
						},
					},
					clear: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							return player.storage.xiugong_times != 0;
						},
						content() {
							player.storage.xiugong_times = 0;
						},
					}
				}
			},
			zuodun: {
				audio: 2,
				trigger: { global: 'damageBegin3' },
				usable: 1,
				priority: 1,
				popup: false,
				filter(Evt, player) {
					return Evt.player != player && Evt.num;
				},
				check(Evt, player) {
					return (player.hp - Evt.player.hp) > 0 && get.attitude(player, Evt.player) > (6 - player.hp);
				},
				logTarget: 'player',
				content() {
					trigger.player = player;
					var targets = [player];
					if (trigger.source) targets.add(trigger.source);
					game.asyncDraw(targets);
					if (!player.hasSkill('zhongxinghezou')) {
						player.addTempSkill('zhongxinghezou', { player: 'phaseAfter' });
					}
				},
				derivation: 'zhongxinghezou',
			},
			baidao: {
				enable: 'phaseUse',
				usable: 1,
				filter(Evt, player) {
					return player.countCards('h');
				},
				filterCard: true,
				selectCard: -1,
				position: 'h',
				discard: false,
				lose: false,
				content() {
					player.showHandcards();
					var overJ = cards.filter(card => get.number(card) > 11);
					var under3 = cards.filter(card => get.number(card) < 3);
					player.recover(overJ.length);
					if (under3.length && player.hasSkill('zhongxinghezou')) {
						if (player.getStat().skill.zhongxinghezou) {
							player.getStat().skill.zhongxinghezou--;
							player.storage.baidao_times += (under3.length - 1);
						} else {
							player.storage.baidao_times += under3.length;
						}
					}
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							if (player.countCards('h', card => get.number(card) > 11)) return get.recoverEffect(player, player, player);
							else return -0.2;
						},
					},
				},
				group: ['baidao_times', 'baidao_clear'],
				subSkill: {
					times: {
						init(player, skill) {
							if (!player.storage[skill]) player.storage[skill] = 0;
						},
						trigger: { player: 'useCard2' },
						firstDo: true,
						forced: true,
						filter(Evt, player) {
							return player.storage.baidao_times > 0 && player.hasSkill('zhongxinghezou_used');
						},
						content() {
							player.storage.baidao_times--;
							player.removeSkill('zhongxinghezou_used');
						},
					},
					clear: {
						trigger: { player: 'phaseAfter' },
						forced: true,
						silent: true,
						popup: false,
						filter(Evt, player) {
							return player.storage.baidao_times != 0;
						},
						content() {
							player.storage.baidao_times = 0;
						},
					}
				},
				derivation: 'zhongxinghezou',
			},
			yipengyidou: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget(card, player, target) {
					return player.canCompare(target);
				},
				filter(Evt, player) {
					return player.countCards('h') > 0;
				},
				content() {
					"step 0"
					player.chooseToCompare(target).set('small', (get.recoverEffect(target, player, player) > get.recoverEffect(player, target, player) + 1));
					"step 1"
					Evt.resultWinner = result.winner;
					Evt.loop = 1;
					if (!Evt.resultWinner) {
						Evt.player1 = player;
						Evt.player2 = target;
					}
					else {
						Evt.player1 = Evt.resultWinner;
						if (Evt.resultWinner != player) Evt.player2 = player;
						else if (Evt.resultWinner != target) Evt.player2 = target;
					}
					Evt.cards = [];
					"step 2"
					game.getGlobalHistory('cardMove', evt => {
						if (evt == trigger || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
						if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
						for (var i = 0; i < evt.cards.length; i++) {
							var card = evt.cards[i];
							if (get.type(card) != 'equip' && get.type(card) != 'delay') {
								if (Evt.loop) {
									if (Evt.player1.hasUseTarget(card)) {
										Evt.cards.add(card);
									}
								}
								else {
									if (Evt.player2.hasUseTarget(card)) {
										Evt.cards.add(card);
									}
								}
							}
						}
					}, trigger);
					if (Evt.cards.length <= 0) {
						Evt.finish();
					}
					else {
						game.cardsGotoOrdering(Evt.cards);
						var dialog = ui.create.dialog('一捧一逗', Evt.cards, true);
						_status.dieClose.push(dialog);
						dialog.videoId = lib.status.videoId++;
						game.addVideo('cardDialog', null, ['一捧一逗', get.cardsInfo(Evt.cards), dialog.videoId]);
						Evt.getParent().preResult = dialog.videoId;
						game.broadcast(function (cards, id) {
							var dialog = ui.create.dialog('一捧一逗', cards, true);
							_status.dieClose.push(dialog);
							dialog.videoId = id;
						}, Evt.cards, dialog.videoId);
						Evt.dialog = dialog;
					}
					"step 3"
					if (Evt.loop) {
						Evt.player1.chooseCard(1, 'he', '是否将一张牌当其中一张牌打出?');
					}
					else {
						Evt.player2.chooseCard(1, 'he', '是否将一张牌当其中一张牌打出?');
					}
					"step 4"
					if (result.bool) {
						Evt.viewAsCards = result.cards;
						if (Evt.loop) {
							game.log(player, '观看了', '#y弃牌堆的牌');
							var chooseButton = Evt.player1.chooseButton(true, function (button) {
								return get.value(button.link, _status.event.player);
							}).set('dialog', Evt.dialog.videoId);
							Evt.chooseButton = chooseButton;
						}
						else {
							game.log(Evt.target, '观看了', '#y弃牌堆的牌');
							var chooseButton = Evt.target.chooseButton(true, function (button) {
								return get.value(button.link, _status.event.player);
							}).set('dialog', Evt.dialog.videoId);
							Evt.chooseButton = chooseButton;
						}
					}
					else {
						Evt.goto(6);
					}
					"step 5"
					if (!result.links[0]) {
						Evt.goto(6);
					}
					else {
						Evt.cardUse = result.links[0];
						if (Evt.loop) {
							if (Evt.player1.hasUseTarget(Evt.cardUse)) {
								Evt.player1.chooseUseTarget(result.links[0], Evt.viewAsCards, true, false).viewAs = true;
							}
						}
						else {
							if (Evt.player2.hasUseTarget(Evt.cardUse)) {
								Evt.player2.chooseUseTarget(result.links[0], Evt.viewAsCards, true, false).viewAs = true;
							}
						}
					}
					"step 6"
					ui.clear();
					Evt.dialog.close();
					_status.dieClose.remove(Evt.dialog);
					game.broadcast(function (id) {
						var dialog = get.idDialog(id);
						if (dialog) {
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					}, Evt.dialog.videoId);
					if (Evt.loop) {
						Evt.loop--;
						if (Evt.loop) {
							Evt.player1.chooseBool('将一张牌当本回合进入弃牌堆的一张基本牌或通常锦囊牌使用，或取消使对方回复一点体力').set('ai', function () {
								var player = _status.event.player;
								var target = _status.event.getParent().player2;
								if (get.recoverEffect(target, player, player) > 1) return 0;
								else return -0.2 + Math.random();
							});
						}
						else {
							Evt.player2.chooseBool('将一张牌当本回合进入弃牌堆的一张基本牌或通常锦囊牌使用，或取消使对方回复一点体力').set('ai', function () {
								var player = _status.event.player;
								var target = _status.event.getParent().player1;
								if (get.recoverEffect(target, player, player) > 1) return 0;
								else return -0.2 + Math.random();
							});
						}
					}
					else {
						Evt.finish();
					}
					"step 7"
					if (result.bool) {
						Evt.goto(2);
					}
					else {
						if (Evt.loop == 2 || (Evt.loop && Evt.resultWinner == player) || (!Evt.loop && Evt.resultWinner != player)) {
							Evt.target.recover();
						}
						else {
							player.recover();
						}
					}
				},
				ai: {
					order: 8,
					result: {
						target: 0.5,
					},
				},
			},
			renleiguancha: {
				trigger: { player: 'phaseEnd' },
				content() {
					'step 0'
					player.chooseTarget(1, '选择观察目标', function (card, player, target) {
						return player != target;
					});
					'step 1'
					if (result.bool) {
						result.targets[0].addSkill('renleiguancha_mark');
					}
				},
				group: ['renleiguancha_phaseStart', 'renleiguancha_damage', 'renleiguancha_die'],
				subSkill: {
					mark: {
						mark: true,
						intro: {
							content: '造成伤害，杀死玩家与死亡都被列入了观察项目'
						},
					},
					phaseStart: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						filter(Evt, player) {
							return player.hasSkill('renleiguancha_damaged') || player.hasSkill('renleiguancha_dead')
								|| game.filterPlayer(cur => cur.hasSkill('renleiguancha_mark')).length > 0
						},
						content() {
							'step 0'
							game.filterPlayer(cur => {
								if (cur.hasSkill('renleiguancha_mark')) {
									cur.removeSkill('renleiguancha_mark');
									return true;
								}
								else
									return false;
							});
							if (!player.hasSkill('renleiguancha_damaged') && !player.hasSkill('renleiguancha_dead')) {
								player.draw(2);
								player.loseHp();
								Evt.finish();
							}
							'step 1'
							if (player.hasSkill('renleiguancha_damaged')) {
								player.draw(1);
								player.removeSkill('renleiguancha_damaged');
							}
							'step 2'
							if (player.hasSkill('renleiguancha_dead')) {
								player.removeSkill('renleiguancha_dead');
								player.chooseTarget(1, '对一名角色造成一点伤害');
							}
							else {
								Evt.finish();
							}
							'step 3'
							if (result.bool) {
								result.targets[0].damage(player);
							}
						}
					},
					damage: {
						trigger: { global: 'damageAfter' },
						forced: true,
						filter(Evt, player) {
							if (Evt.source) {
								return Evt.source.hasSkill('renleiguancha_mark');//||Evt.player.hasSkill('renleiguancha_mark');
							}
							else
								return false;
							//return Evt.player.hasSkill('renleiguancha_mark');
						},
						content() {
							player.addSkill('renleiguancha_damaged');
						}
					},
					die: {
						trigger: { global: 'dieBefore' },
						forced: true,
						filter(Evt, player) {
							if (Evt.source) {
								return Evt.source.hasSkill('renleiguancha_mark') || Evt.player.hasSkill('renleiguancha_mark');
							}
							else
								return Evt.player.hasSkill('renleiguancha_mark');
						},
						content() {
							player.addSkill('renleiguancha_dead');
						}
					},
					damaged: {
						mark: true,
						marktext: '伤',
						intro: {
							content: '观察目标造成了伤害'
						},
					},
					dead: {
						mark: true,
						marktext: '亡',
						intro: {
							content: '观察目标死亡或杀死过角色'
						},
					}
				}
			},
			//兰音
			yueyao: {
				init(player, skill) {
					player.storage[skill] = 0;
				},
				trigger: {
					global: 'gameDrawAfter',
					player: ['enterGame', 'phaseBegin'],
				},
				filter(Evt, player) {
					return true;
				},
				forced: true,
				intro: { content: '月谣：#' },
				content() {
					player.storage.yueyao = player.countCards('h');
					player.markSkill('yueyao');
				},
				mod: {
					targetEnabled(card, player, target) {
						if (target.hasSkill('yueyao') && target.storage.yueyao == player.countCards('h')) return false;
					},
				},
				group: 'yueyao_addDam',
				subSkill: {
					addDam: {
						trigger: { source: 'damageBegin' },
						forced: true,
						filter(Evt, player) {
							return player.storage.yueyao == player.countCards('h');
						},
						content() {
							trigger.num++;
						}
					},
				}
			},
			kongling: {
				trigger: { player: 'damageAfter' },
				filter(Evt, player) {
					return Evt.num > 0;
				},
				direct: true,
				content() {
					'step 0'
					player.chooseTarget(get.prompt2('kongling'), function (card, player, target) {
						return player.storage.yueyao != target.countCards('h');
					}).set('ai', function (target) {
						var player = _status.event.player;
						if (player.storage.yueyao < target.countCards('h')) return 1 - get.attitude(player, target) * (target.countCards('h') - player.storage.yueyao);
						return get.attitude(player, target);
					});
					'step 1'
					if (result.bool && result.targets) {
						player.logSkill('kongling', result.targets);
						var target = result.targets[0];
						if (player.storage.yueyao < target.countCards('h')) target.chooseToDiscard(true, target.countCards('h') - player.storage.yueyao);
						else target.gain(get.cards(player.storage.yueyao - target.countCards('h')), 'draw');
					}
				},
				ai: {
					maixie: true,
					combo: 'yueyao'
				}
			},
			jiajiupaidui: {
				audio: 3,
				enable: 'chooseToUse',
				filter(Evt, player) {
					return Evt.filterCard({ name: 'jiu', isCard: true }, player, Evt);
				},
				filterTarget(card, player, target) {
					return target.countCards('he');
				},
				selectTarget: 2,
				multitarget: true,
				round: 1,
				content() {
					'step 0'
					player.chooseCardOL(true, targets, 'he', '弃置一张牌(若其中有♠或9，则视为' + get.translation(player) + '使用了一张酒)').set('ai', card => {
						var source = _status.event.source;
						var player = _status.event.player;
						if (get.attitude(player, source) > 0 && (get.suit(card) == 'spade' || get.number(card) == 9)) return 12 - get.value(card);
						return 6 - get.value(card);
					}).set('source', player).aiCard = function (target) {
						var hs = target.getCards('h');
						var Evt = _status.event;
						Evt.player = target;
						hs.sort(function (a, b) {
							return Evt.ai(a) - Evt.ai(b);
						});
						delete Evt.player;
						return { bool: true, cards: [hs[0]] };
					};
					'step 1'
					var cards = [];
					result.forEach(cur => cards.addArray(cur.cards));
					targets[0].discard(cards[0]);
					targets[1].discard(cards[1]);
					Evt.cards = cards;
					'step 2'
					game.delay();
					Evt.allJiu = true;
					Evt.cards.forEach(card => {
						if (get.suit(card) === 'spade' || get.number(card) == 9)
							Evt.isJiu = true;
						else {
							Evt.allJiu = false;
						}
					});
					if (Evt.isJiu) {
						if (_status.event.getParent(2).type == 'dying') {
							Evt.dying = player;
							Evt.type = 'dying';
						}
						player.useCard({ name: 'jiu', isCard: true }, player, false);
					}
					'step 3'
					if (Evt.allJiu) {
						var roundname = 'jiajiupaidui_roundcount';
						if (player.hasMark(roundname)) {
							player.popup('重置');
							var next = game.createEvent('resetSkill');
							[next.player, next.resetSkill] = [player, 'jiajiupaidui']
							next.setContent('resetRound');
						}
						player.draw();
					}
				},
				ai: {
					order: 9,
					result: {
						player: 0.8,
						target: -1,
						expose: 0.4,
					},
					threaten: 1.2
				},
			},
			kuangzuiluanwu: {
				audio: 1,
				unique: true,
				enable: 'phaseUse',
				limited: true,
				skillAnimation: 'epic',
				animationColor: 'thunder',
				filter(card, player) {
					return player.storage.jiu > 0;
				},
				filterTarget(card, player, target) {
					return player.canUse({ name: 'sha' }, target, false);
				},
				selectTarget() {
					return _status.event.player.storage.jiu;
				},
				multitarget: true,
				content() {
					'step 0'
					player.storage.kuangzuiluanwu = true;
					player.awakenSkill('kuangzuiluanwu');
					player.loseMaxHp();
					'step 1'
					Evt.shaEvent = player.useCard({ name: 'sha' }, targets);
					'step 2'
					player.addSkill('kuangzuiluanwu_count');
				},
				intro: {
					content(storage, player, skill) {
						if (player.storage.jiu)
							return '未发动。当前使用酒计数:' + (player.storage.jiu).toString()
						else
							return '未发动。当前使用酒计数:0'
					}
				},
				subSkill: {
					count: {
						mark: true,
						marktext: "酒",
						direct: true,
						intro: {
							content(storage, player, skill) {
								if (player.storage.jiu)
									return '已发动。当前使用酒计数:' + (player.storage.jiu).toString()
								else
									return '已发动。当前使用酒计数:0'
							}
						},
					},
				},
				ai: {
					target(player, target) {
						return lib.card.sha.ai.result.target(player, target);
					},
					player(player, target) {
						if (player.isHealthy()) return -3;
						return -1;
					}
				}
			},
			//黄兔
			jiance: {
				frequent: true,
				trigger: { player: ['loseHpEnd', 'damageEnd'] },
				content: [() => {
					player.chooseTarget(get.prompt2('jiance'), function (card, player, target) {
						return target.countCards('h');
					}).set('ai', function (target) {
						let player = _status.event.player;
						if (target.countCards('h') <= 4) return 2 - get.attitude(player, target);
						return 0;
					});
				}, () => {
					if (result.bool && result.targets) {
						Evt.target = result.targets[0];
						Evt.target.showHandcards('监策');
						let types = ['basic', 'trick', 'equip'];
						let cards = Evt.target.getCards('h').slice(0);
						for (let i of cards) {
							let type = get.type(i, 'trick');
							if (types.contains(type)) types.remove(type);
						}
						Evt.num = types.length;
					} else Evt.finish();
				}, () => {
					if (Evt.num) {
						player.chooseTarget('『监策』：选择令一名角色摸' + get.cnNumber(Evt.num) + '张牌', (card, player, target) => target != _status.event.source)
							.set('ai', (target) => {
								let player = _status.event.player;
								return target.needsToDiscard() ? get.attitude(target, player) / 2 : get.attitude(target, player);
							}).set('source', Evt.target)
					} else Evt.finish();
				}, () => {
					if (result.bool && result.targets) {
						result.targets[0].draw(Evt.num);
					}
				}],
				ai: {
					maixie: true,
				}
			},
			chanbing: {
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = [];
				},
				trigger: { global: 'roundStart' },
				forced: true,
				filter(Evt, player) {
					return true;
				},
				content() {
					'step 0'
					var numbers = [];
					for (var i = 0; i < player.storage.chanbing.length; i++) {
						numbers.add(get.number(player.storage.chanbing[i]));
					}
					var next = player.judge(card => {
						var numbers = _status.event.numbers;
						if (numbers && numbers.contains(get.number(card))) return -1;
						return 1;
					});
					next.set('numbers', numbers);
					'step 1'
					if (result.bool) {
						var cards = [result.card];
						game.cardsGotoSpecial(cards, ui.special);
						player.$gain(cards, false);
						player.markAuto('chanbing', cards);
						player.recover();
					} else {
						player.loseHp();
					}
				},
				marktext: '缠',
				intro: {
					onunmark(storage, player) {
						if (storage && storage.length) {
							player.$throw(storage, 1000);
							game.cardsDiscard(storage);
							game.log(storage, '被置入了弃牌堆');
							storage.length = 0;
						}
					},
					mark(dialog, content, player) {
						if (content && content.length) {
							dialog.addAuto(content);
						}
					},
					content(content, player) {
						if (content && content.length) {
							return get.translation(content);
						}
					}
				},
			},
			buyu: {
				trigger: { global: 'die' },
				filter(Evt, player) {
					return Evt.player.getStockSkills('黄兔颂恩', '因缘斩断').filter(function (skill) {
						var info = get.info(skill);
						return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited;
					}).length > 0 && player.countCards('h');
				},
				logTarget: 'player',
				content() {
					'step 0'
					Evt.togain = trigger.player.getCards('he');
					trigger.player.lose(Evt.togain, ui.special, 'toStorage');
					trigger.player.$give(Evt.togain, player, false);
					player.markAuto('chanbing', Evt.togain);
					'step 1'
					var list = trigger.player.getStockSkills('黄兔颂恩', '因缘斩断').filter(function (skill) {
						var info = get.info(skill);
						return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited;
					});
					if (list.length == 1) Evt._result = { control: list[0] };
					else player.chooseControl(list).set('prompt', '『不渝』：选择获得一个技能').set('forceDie', true).set('ai', function () {
						return list.randomGet();
					});
					'step 2'
					if (player.storage.buyu) player.removeSkill(player.storage.buyu);
					player.storage.buyu = result.control;
					player.markSkill('buyu');
					player.addSkillLog(result.control);
					game.broadcastAll(function (skill) {
						var list = [skill];
						game.expandSkills(list);
						for (var i of list) {
							var info = lib.skill[i];
							if (!info) continue;
							if (!info.audioname2) info.audioname2 = {};
							info.audioname2.InabaHaneru = 'buyu';
						}
					}, result.control);
				},
				mark: true,
				intro: { content: '当前『不渝』技能：$' },
			},
			//蝙蝠妹
			hongyi: {
				trigger: { global: 'judgeAfter' },
				usable: 1,
				filter(Evt, player) {
					return Evt.result.color == 'red' && player != _status.currentPhase && _status.currentPhase && _status.currentPhase.countCards('he');
				},
				content() {
					'step 0'
					_status.currentPhase.chooseCard('he', true, '『红移』：你需要交给' + get.translation(player) + '一张牌');
					'step 1'
					if (result.bool)
						player.gain(result.cards[0], _status.currentPhase, 'giveAuto');
				}
			},
			jueshou: {
				enable: 'phaseUse',
				filter(Evt, player) {
					if (player.hasSkill('jueshou_used')) return false;
					var cards = player.getCards('he', { color: 'black' });
					for (var i = 0; i < cards.length; i++) {
						if (get.type(cards[i], 'trick') != 'trick') return true;
					}
					return false;
				},
				position: 'he',
				filterCard(card, player) {
					if (get.type(card, 'trick') == 'trick') return false;
					return get.color(card) == 'black' && get.owner(card) == player;
				},
				check(card) {
					return 7 - get.value(card);
				},
				discard: false,
				prepare: 'throw',
				filterTarget(card, player, target) {
					if (get.suit(card) == 'club') return lib.filter.targetEnabled2({ name: 'bingliang' }, player, target)
					return lib.filter.filterTarget({ name: 'bingliang' }, player, target);
				},
				content() {
					player.addTempSkill('jueshou_used', 'phaseUseEnd');
					player.useCard({ name: 'bingliang' }, target, cards).animate = false;
					if (get.type(cards[0]) == 'equip') {
						player.addTempSkill('jueshou_dist', { player: 'phaseZhunbeiBegin' });
					}
				},
				subSkill: {
					dist: {
						mark: true,
						intro: { content: '距离+1' },
						mod: {
							globalTo(from, to, distance) {
								return distance + 1;
							},
						},
					},
					used: {},
				},
				ai: {
					effect(card) {
						if (get.name(card) == 'shandian') return [1, 1];
					},
					result: {
						target(player, target) {
							return get.effect(target, { name: 'bingliang' }, player, target);
						}
					},
					order: 9,
				}
			},

			//Kaf
			liuhua: {
				init(player, skill) {
					if (!player.storage[skill]) player.storage[skill] = [];
				},
				mark: true,
				intro: {
					name: '化羽',
					content: 'cards',
					onunmark(storage, player) {
						if (storage && storage.length) {
							player.$throw(storage, 1000);
							game.cardsDiscard(storage);
							game.log(storage, '被置入了弃牌堆');
							storage.length = 0;
						}
					},
				},
				cardAround: true,
				trigger: { global: 'phaseAfter' },
				lastDo: true,
				filter(Evt, player) {
					return player.countCards('h') && game.countPlayer2(cur => cur.getHistory('damage').length);
				},
				check(Evt, player) {
					return player.countCards('h') <= 2 || player.getStorage('liuhua').length <= 1;
				},
				content() {
					'step 0'
					player.showHandcards();
					Evt.cards = player.getCards('h');
					'step 1'
					player.lose(Evt.cards, ui.special, 'toStorage');
					player.$give(Evt.cards, player, false);
					player.markAuto('liuhua', Evt.cards);
					game.log(player, '将', Evt.cards, '置于武将牌上');
					game.delay(1)
					'step 2'
					player.insertPhase();
				},
				group: 'liuhua_regain',
				subSkill: {
					regain: {
						trigger: { player: ['phaseBefore', 'turnOverBefore'], target: ['shiji2After'] },
						firstDo: true,
						direct: true,
						filter(Evt, player) {
							if ((Evt.name == 'phase' && Evt.skill != 'liuhua') || (Evt.name == 'turnOver' && (!Evt.getParent()._trigger || Evt.getParent()._trigger.skill != 'liuhua'))) return false;
							if (player.storage.liuhua.length < 4) return false;
							var list = get.suit3(player.storage.liuhua);
							return list.length >= 4;
						},
						content() {
							'step 0'
							var next = player.chooseCardButton('###' + get.translation('liuhua') + '###获得一种颜色的『化羽』牌', player.storage.liuhua, true);
							next.set('ai', function (button) {
								return get.value(button.link);
							});
							next.set('cards', player.storage.liuhua);
							'step 1'
							if (result.bool) {
								game.delay(0.5);
								player.logSkill('liuhua');
								Evt.cards = player.storage.liuhua.filter(card => get.color(card) == get.color(result.links[0]));
								player.unmarkAuto('liuhua', Evt.cards);
								player.$give(Evt.cards, player, false);
								player.gain(Evt.cards);
							} else Evt.finish();
							'step 2'
							if (trigger.name == 'turnOver') trigger.cancel(true);
							player.turnOver();
						},
					},
				}
			},
			yishi: {
				trigger: { player: 'phaseBefore' },
				firstDo: true,
				forced: true,
				filter(Evt, player) {
					return Evt.skill;
				},
				content() {
					'step 0'
					player.storage.yishi_use = _status.currentPhase;
					'step 1'
					player.addTempSkill('yishi_use');
					'step 2'
					game.filterPlayer(cur => {
						if (cur != player && cur != player.storage.yishi_use) {
							cur.addTempSkill('yishi_cardDisable');
						}
					})
				},
				subSkill: {
					use: {
						mark: 'character',
						intro: {
							content(storage, player) {
								if (storage == player) return '使用牌只能指定自己为目标';
								return '使用牌只能指定自己或' + get.translation(storage) + '为目标';
							}
						},
						onremove: true,
						mod: {
							playerEnabled(card, player, target) {
								if (player != target && player.storage.yishi_use != target) return false;
							}
						}
					},
					cardDisable: {
						mark: true,
						intro: {
							name: '遗世',
							content: '本回合内不能使用或打出牌'
						},
						mod: {
							cardEnabled2(card) {
								return false;
							},
						},
					}
				}
			},
			shiji: {
				unique: true,
				global: 'shiji2',
				zhuSkill: true,
			},
			shiji2: {
				enable: 'phaseUse',
				prompt() {
					var player = _status.event.player;
					var list = game.filterPlayer(function (target) {
						return target.hasZhuSkill('shiji', player) && player.group == target.group && target.getStorage('liuhua').length;
					});
					var str = '选择' + get.translation(list);
					if (list.length > 1) str += '中的一人';
					str += '将其『化羽』牌不包含花色的任意张牌置于之上';
					return str;
				},
				filter(Evt, player) {
					if (player.countCards('h') == 0) return false;
					return game.hasPlayer(function (target) {
						return target.hasZhuSkill('shiji', player) && player.group == target.group && target.getStorage('liuhua').length;
					});
				},
				filterTarget(card, player, target) {
					return target.hasZhuSkill('shiji', player) && player.group == target.group;
				},
				clearTime: true,
				prepare(cards, player, targets) {
					targets[0].logSkill('shiji');
				},
				usable: 1,
				content() {
					"step 0"
					var suits = get.suit3(target.getStorage('liuhua'));
					player.chooseCard(true, 'he', '选择置于' + get.translation(target) + '『化羽』牌上的牌', [1, Infinity], function (card, player) {
						return !_status.event.suits.contains(get.suit(card));
					}).set('suits', suits).set('ai', card => {
						var evt = _status.event.getParent();
						if (evt.target.isTurnedOver() && (_status.event.suits + ui.selected.cards.length) < 5) return get.value(card, evt.target, 'raw') - 1;
						if ((evt.player.countCards('he') - ui.selected.cards.length) < 3) return get.value(card, evt.target, 'raw') - 9;
						return get.value(card, evt.target, 'raw') - 5;
					}).set('complexCard', true);
					"step 1"
					if (result.bool && result.cards && result.cards.length) {
						Evt.cards = result.cards;
						player.lose(Evt.cards, ui.special, 'toStorage');
						player.$give(Evt.cards, target, false);
						target.markAuto('liuhua', Evt.cards);
						game.log(player, '将', Evt.cards, '置于', target, '武将牌上');
					}
				},
				ai: {
					basic: {
						order: 1
					},
					expose: 0.2,
					result: {
						target(player, target) {
							if (player.countCards('h', 'du') && get.attitude(player, target) < 0) return -1;
							if (player.countCards('h') >= player.hp) return 1;
							if (target.isTurnedOver()) return 2;
							return 0;
						}
					}
				}
			}
		},
		card: {
		},
		translate: {
			vtuber_upd8: `UPD8`,
			KizunaAI: `绊爱`,
			KizunaAI_info: `绊爱`,
			ailian: `爱链`,
			ailian_info: `出牌阶段限一次，你可以将任意手牌展示并交给其他角色，若给出的牌类型均不同，你可以令等量角色横置；若获得牌的角色互相相邻，你可以视为使用了一张指定目标数等于获得牌角色数的基本牌。`,
			ailian_append: lib.figurer(`特性：传递关键牌`),
			qixu: `启虚`,
			qixu1: `启虚`,
			qixu2: `启虚`,
			qixu3: `杀启虚`,
			qixu4: `启虚`,
			qixu5: `闪启虚`,
			qixu_info: `主公技 当你需要使用或打出【杀】或【闪】时，你可以声明之，若没有角色弃置一张声明牌，则视为你使用或打出了此牌。每轮每项限一次。`,
			qixu_append: lib.figurer(`特性：白嫖[基本牌]`),

			MiraiAkari: `未来明`,
			shiyilijia: `失忆离家`,
			shiyilijia_info: `出牌阶段限一次，你可弃置所有手牌，若如此做，你于回合结束时摸等量的牌。`,
			shiyilijia_append: lib.figurer(`特性：制衡 克己`),
			seqinghuashen: `色情化身`,
			seqinghuashen_info: `其他角色的【桃】因使用进入弃牌堆时，你可以令其摸一张牌，然后你获得其一张牌。`,

			InuyamaTamaki: `犬山玉姬`,
			InuyamaTamaki_info: `犬山玉姬`,
			rongyaochengyuan: `荣誉成员`,
			rongyaochengyuan_info: `其他角色对你造成伤害时，若其没有「homolive」标记，你可令其获得一个，然后防止此伤害。`,
			hundunliandong: `混沌联动`,
			hundunliandong_info: `出牌阶段限一次，你可以指定包括你在内势力各不同的任意名角色，从你开始依次弃一张牌直到：共有四种花色；或有角色因此失去最后一张手牌。此技能计算势力时，拥有「homolive」标记的角色视为同一势力`,
			hundunliandong_append: lib.figurer(`特性：强制弃牌`),

			ShirayukiMishiro: `白雪深白`,
			tianyi: `梦幻天衣`,
			tianyi_info: `出牌阶段限一次，若你没有装备防具，你可以将一张牌置于武将牌上，称为「衣」。每回合每种花色限一次，当你使用或成为锦囊牌的目标时，若该牌花色与「衣」不同，你摸一张牌；若花色相同，你可以取消之，然后弃置「衣」并获得此牌。准备阶段，弃置「衣」，然后你可以移动场上一张牌。`,
			nveyu: `甜言虐语`,
			nveyu_info: `锁定技 当你于一回合内首次造成伤害时，你令目标回复一点体力，与其各摸一张牌，然后本回合你对其使用牌无距离与次数限制。`,
			nveyu_append: lib.figurer(`特性：难上手 辅助`),

			Siro: `电脑少女小白`,
			zhongxinghezou: `众星合奏`,
			zhongxinghezou_info: `每回合限一次，你使用实体牌指定目标后，可令目标外的一名角色亮出一张牌。若两牌点数之和：小于12~你获得亮出牌令你使用的牌无效；不小于12~你使用的牌结算后，亮出牌的角色对同目标使用亮出牌；等于12~你摸一张牌并令亮出牌的角色回复1点体力。`,
			zhongxinghezou_append: lib.figurer(`通过指定队友或自己，实现一回合出多次【杀】和摸牌`),
			xiugong: `天道宿宫`,
			xiugong_info: `出牌阶段开始时，你可以猜测一名其他角色手牌中锦囊牌的数量并令其展示手牌，若猜测正确，你摸一张牌并令你本回合的『众星合奏』增加等量次数上限。`,
			xiugong_append: lib.figurer(`特性：观看手牌 额外摸牌 难上手`),

			Bacharu: `巴恰鲁`,
			zuodun: `我身作盾`,
			zuodun_info: `每回合限一次，其他角色受到伤害时，你可将此伤害转移给你，然后你与伤害来源各摸一张牌并获得『众星合奏』直到你的回合结束。`,
			zuodun_append: lib.figurer(`特性：辅助`),
			baidao: `白道游星`,
			baidao_info: `出牌阶段限一次，你可以展示所有手牌，每有一张点数大于J便回复1点体力；每有一张点数小于3便令你本回合的『众星合奏』增加1次数上限。`,

			XiaoxiXiaotao: `小希小桃`,
			XiaoxiXiaotao_info: `小希小桃`,
			yipengyidou: `一捧一逗`,
			yipengyidou_info: `出牌阶段限一次，你可与一名其他角色拼点，赢的角色可以立即将一张牌当本回合进入弃牌堆的一张基本牌或通常锦囊牌使用。然后没赢的角色也可如此做；或令赢的角色回复1点体力。`,
			yipengyidou_append: lib.figurer(`通过与队友拼点，多次使用关键牌`),
			renleiguancha: `人类观察`,
			renleiguancha_info: `结束阶段，你可以选择一名其他角色。你的下回合开始时，若该角色在期间：造成过伤害~你摸一张牌；死亡或杀死过角色~你造成1点伤害；以上皆无~你摸两张牌并失去1点体力。`,
			renleiguancha_append: lib.figurer(`特性：额外摸牌`),

			Reine: `兰音`,
			yueyao: `月谣`,
			yueyao_info: `锁定技 游戏或回合开始时，你记录当前的手牌数为X。<br>
			一名角色的手牌数为X时，其不能对你使用牌。<br>
			你手牌数等于X时，造成的伤害+1。`,
			yueyao_append: lib.figurer(`特性：爆发`),
			kongling: `空灵`,
			kongling_info: `你受到伤害后，可以令一名角色将手牌调整至X。`,
			kongling_append: lib.figurer(`特性：卖血 辅助`),

			KaguyaLuna: `辉夜月`,
			KaguyaLuna_info: `辉夜月`,
			jiajiupaidui: `假酒派对`,
			jiajiupaidui_info: `轮次技 当你需要使用【酒】时，你可以令两名角色各弃置一张牌，若其中包含♠或点数9，视为你使用之（不计入次数）。若均为♠或点数9，你摸一张牌并重置此技能。`,
			jiajiupaidui_append: lib.figurer(`特性：白嫖【酒】 强制弃牌`),
			kuangzuiluanwu: `狂醉乱舞`,
			kuangzuiluanwu_info: `<font color=#daa>限定技</font> 出牌阶段，你可以扣减一点体力上限，视为使用了一张无距离限制的目标数为X的【杀】。（X为你当前的【酒】层数）`,

			InabaHaneru: `因幡はねる`,
			jiance: `监策`,
			jiance_info: `你体力减少后，可以令一名角色展示所有手牌，若不包含所有类型的牌，你可以令另一名角色摸X张牌（X为其中不包含的类型数）。`,
			jiance_append: lib.figurer(`特性：卖血`),
			chanbing: `缠病`,
			chanbing_info: `锁定技 一轮开始时，你进行判定，若点数与你武将牌上的牌均不相同，将之置于你武将牌上并回复1点体力；否则，你失去1点体力。`,
			buyu: `不渝`,
			buyu_info: `一名角色死亡时，你可以将其所有牌置于武将牌上并获得其的一个技能直到你下次以此法获得技能。`,
			buyu_append: lib.figurer(`特性：难上手`),

			UmoriHinako: `宇森ひなこ`,
			hongyi: `红移`,
			hongyi_info: `每回合限一次，当出现红色判定结果后，你可以令当前回合角色交给你一张牌。`,
			jueshou: `绝收`,
			jueshou_info: `出牌阶段限一次，你可以将一张黑色基本牌或装备牌当作【兵粮寸断】使用，若为♣，则此【兵粮寸断】无距离限制；若为装备牌，其他角色计算与你的距离+1直到你下个回合开始。`,
			jueshou_append: lib.figurer(`特性：易上手`),

			Kaf: `花谱`,
			liuhua: `化羽`,
			liuhua_info: `一个回合结束时，若有角色受到了伤害，你可以将所有手牌置于武将牌上并获得一个额外回合。你的『化羽』牌增加后，若之包含四种花色，你获得一种颜色的『化羽』牌并翻面。`,
			yishi: `遗世`,
			yishi_info: `锁定技 在你的额外回合内，你使用牌只能指定你或上一回合角色为目标，且其他角色不能使用或打出牌。`,
			yishi_append: lib.figurer(`特性：难上手`),
			shiji: `市迹`,
			shiji2: `市迹`,
			shiji_info: `主公技 同势力角色的出牌阶段限一次，其可以将『化羽』牌不包含花色的任意张牌置于之上。`,
			shiji_append: lib.figurer(`只能在已有『化羽』牌时发动`),

			Rim: `理芽`,
			shenghua: `生花`,
			shenghua_info: `出牌阶段，你可以弃置所有手牌，然后摸X张牌。（X为弃牌数减去本阶段此技能发动的次数）`,
			zhanchong: `绽虫`,
			zhanchong_info: `当一张装备牌不因使用正面朝上离开你的手牌区时，你可以翻面并弃置其他角色的一张牌，若不为装备牌，其受到一点伤害。`,
			zhanchong_append: lib.figurer(`特性：爆发 易上手`),

			Kafu: `可不`,
			nisheng: `拟声`,
			nisheng_info: `一个额定回合结束后，你可以展示两张点数相同的手牌并获得一个额外的回合。每个点数限一次。`,
			jingyan: `精赝`,
			jingyan_info: `你受到伤害后，可以翻面并获得来源一半的牌（向上取整）。`,
			jingyan_append: lib.figurer(`特性：卖血`),

			IsekaiJoucho: `ヰ世界情绪`,
			baiqing: `白情`,
			baiqing_info: `一回合内第X张【杀】被使用时，你可以亮出牌堆顶X张牌，获得其中与此【杀】颜色不同的牌。（X为你已损失的体力值+1）`,
			shuangxing: `星徊`,
			shuangxing_info: `你使用仅指定其他角色为目标的锦囊牌后，可以选择一项：<br>令你本回合使用牌无次数限制；令其中一名目标对你使用一张【杀】，否则你获得其一张牌。`,
			shuangxing_append: lib.figurer(`特性：挑衅`),

			DoumyoujiHaruto: `道明寺晴翔`,
			YuNi: `YuNi`,
			Fairys: `Fairys`,
			Fairys_ab: `鹦鹉`,
		},
	};
});
