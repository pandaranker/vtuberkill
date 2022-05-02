/// <reference path = "../built-in.d.ts" />

import skill from './Beginner_skill'

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
			re_MitoTsukino: ['female', 'nijisanji', 3, ['re_bingdielei','qiujin'], ['zhu']],
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
			re_ShirakamiFubuki: ['female', 'holo', 3, ['re_yuanlv', 're_jinyuan']],
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
		skill: {...skill},
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
			liansheng_info: `锁定技 你进入或离开已受伤状态时，改变你的性别。你的性别变化时，若当前回合角色为女性，你摸一张牌。`,
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
			qiujin: `囚禁`,
			qiujin_info: `主公技 结束阶段，你可以令一名虹势力其他角色摸一张牌并横置。`,

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
			zhenbao_info: `当你一次性弃置两张或更多的牌后，你可以令一名判定区没有牌的角色选择其中一张置入*其判定区。`,
			heimo: `黑魔唤醒`,
			heimo_info: `当你受到伤害后，你可以弃置任意张牌并进行等量次判定。若判定结果中有黑色牌，你对来源造成1点伤害；若有红色牌，你摸两张牌。`,
			heimo_append: lib.figurer(`特性：卖血`),
		}
	}
})