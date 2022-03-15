import skill from './yuzu_skill'
import translate from './yuzu_translate'
import card from './yuzu_card'
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


			/**碧居结衣 */
			AoiYui: ['female', 'qun', 3, ['suyuan', 'mujian'], ['riV']],

			/**Melody */
			Melody: ['female', 'vshojo', 4, ['kuangbiao', 'leizhu', 'tonggan'], ['zhu', 'yingV']],


			/**琴吹梦 */
			KotobukiYume: ['female', 'qun', 4, ['xuanquan', 'rusu'],],
			/**海月シェル */
			UmitsukiShell: ['female', 'qun', 4, ['beike', 'wenda'],],
			/**猫山苗 */
			NekoyamaNae: ['female', 'qun', 6, ['moupi', 'xuneng'],],
			/**琥珀玲 */
			KohakuRin: ['female', 'qun', 4, ['chunzhen', 'hupo'],],
			/**寝月ねろ */
			NerunaNero: ['female', 'qun', 3, ['peijiu', 'ransha'],],

			/**凤玲天天 */
			HoureiTenten: ['female', 'qun', 3, ['shengquan', 'yizhu'], ['guoV']],

			/**陆鳐 */
			luyao: ['female', 'qun', 4, ['manyou', 'changjie'], ['guoV']],


			/**兰若Ruo */
			lanruo: ['female', 'hunmiao', 3, ['dieyuan', 'shengyang'], ['guoV']],
			/**兰若Re */
			lanre: ['female', 'hunmiao', 3, ['daoyi', 'shengyin'], ['guoV']],
			/**魂喵喵 */
			hunmiaomiao: ['female', 'hunmiao', 3, ['xiuyou', 'jiyuan'], ['guoV']],

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

			/**喵田弥夜Miya */
			Miya: ['female', 'painter', 4, ['maoxiao', 'jianfa', 'jijie'], ['zhu', 'guoV']],
			/**桃井最中 */
			MomoiMonaka: ['female', 'qun', 4, ['qutao', 'daifei'], ['guoV']],
			/**谢拉 */
			CierraRunis: ['female', 'qun', 3, ['minghuahongxiao']],


			/**姬拉 */
			Kira: ['female', 'qun', 4, ['weiguang', 'liangqin'], ['guoV']],

			/**伊莎贝拉·霍利 */
			IsabellaHolly: ['female', 'HappyEl', 4, ['youchu', 'yuanhua'], ['guoV']],

			/**伊万 */
			iiivan: ['female', 'xuefeng', 4, ['shuipo', 'pianchao'], ['guoV']],

			/**YY */
			yizhiYY: ['male', 'psp', 4, ['bianshi'], ['guoV', 'P_SP']],
			/**莲汰 */
			AiTeN: ['male', 'psp', 4, ['langfei', 'xieyun'], ['guoV', 'P_SP']],

			/**艾白 */
			aibai: ['female', 'Tencent', 3, ['bianyin', 'shabai'], ['guoV']],
			/**文静 */
			wenjing: ['female', 'Tencent', 4, ['zaiying', 'zhengen'], ['guoV']],

			/**乌拉の帝国 */
			wula: ['female', 'lucca', 4, ['dizuo', 'hongtie'], ['guoV']],
			/**云玉鸾 */
			yunyuluan: ['female', 'lucca', 4, ['jiujiu', 'qitong'], ['guoV']],

			/**杜松子 */
			dusongziGin: ['female', 'qun', 3, ['danqing', 'gaiqu'], ['guoV']],
			/**无理 */
			Muri: ['female', 'VirtuaReal', 3, ['lique', 'zhangdeng'], ['guoV']],
			/**Hanser */
			Hanser: ['female', 'VirtuaReal', 3, ['naiwei', 'cishan'], ['guoV']],

			/**启娜娜米 */
			ap_Nana7mi: ['female', 'VirtuaReal', 4, ['niyou', 'shalu'], ['guoV']],
			/**启阿梓 */
			ap_Azusa: ['female', 'VirtuaReal', 3, ['puyu', 'appojian'], ['guoV']],

			/**清则子 */
			qingzezi: ['female', 'qun', 4, ['menghuan', 'gengu'], ['guoV']],

			/**诸葛哀汐 */
			zhugeaixi: ['female', 'qun', 4, ['kaituan', 'gehuang', 'susi'], ['guoV']],

			/**满月 */
			Mitsuki: ['female', 'Providence', 4, ['xuedian'], ['guoV']],
			/**蛙吹Keroro */
			Keroro: ['female', 'Providence', 4, ['beifa', 'wuwu'], ['guoV']],


			/**雨街F */
			AmemachiF: ['female', 'RedC', 3, ['ciling', 'xiyu'], ['guoV']],

			/**中国绊爱 */
			zhongguobanai: ['female', 'NetEase', 4, ['liying', 'fuyu'], ['guoV']],

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
		skill: { ...skill },
		card: card,
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
					case 1: return str.replace(/①『集爱』/g, `${lib.spanClass(`①『集爱』`, 'changetext')}`);
					case 2: return str.replace(/②『盛阴』/g, `${lib.spanClass(`②『盛阴』`, 'changetext')}`);
					case 3: return str.replace(/③『全域』/g, `${lib.spanClass(`③『全域』`, 'changetext')}`);
				}
				return str;
			},
			qitong(player) {
				let str = lib.translate.qitong_info;
				switch (player.$.qitong) {
					case true: return str.replace(/①装备区/g, `${lib.spanClass(`①装备区`, 'changetext')}`);
					case false: return str.replace(/②座次/g, `${lib.spanClass(`②座次`, 'changetext')}`);
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
				let str = lib.translate.yinxu_info;
				switch (player.$.yinxu) {
					case true: return str.replace(/①锦囊牌/g, `${lib.spanClass(`①锦囊牌`, 'changetext')}`);
					case false: return str.replace(/②装备牌/g, `${lib.spanClass(`②装备牌`, 'changetext')}`);
				}
				return str;
			},
		},
		translate: translate,
	};
});