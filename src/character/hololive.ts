import skill from './hololive_skill'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return {
		name: 'hololive',
		connect: true,
		character: {
			GawrGura: ['female', 'holo', 3, ['lingqun', 'yangliu']],
			NinomaeInanis: ['female', 'holo', 3, ['mochu', 'fuyue']],
			/**时乃空 */
			TokinoSora: ['female', 'holo', 4, ['taiyangzhiyin', 'renjiazhizhu'], ['zhu']],
			/**夜空梅露 */
			YozoraMel: ['female', 'holo', 3, ['juhun', 'meilu']],
			/**赤井心 */
			AkaiHaato: ['female', 'holo', 3, ['liaolishiyan', 'momizhiyan']],
			/**夏色祭 */
			NatsuiroMatsuri: ['female', 'holo', 3, ['huxi', 'lianmeng']],
			/**萝卜子 */
			RobokoSan: ['female', 'holo', 3, ['gaonengzhanxie', 'ranyouxielou']],
			/**白上吹雪 */
			ShirakamiFubuki: ['female', 'holo', 3, ['yuanlv', 'jinyuan', 'zhongjian'], ['zhu']],
			/**aki */
			AkiRosenthal: ['female', 'holo', 3, ['meiwu', 'huichu']],
			/**星街慧星 */
			HoshimatiSuisei: ['female', 'holo', 4, ['yemuxingyong', 'xinghejianduei']],
			/**樱巫女 */
			SakuraMiko: ['female', 'holo', 4, ['haodu']],
			/**湊阿库娅 */
			MinatoAqua: ['female', 'holo', 3, ['kuali', 'youyi']],
			/**兔田佩克拉 */
			UsadaPekora: ['female', 'holo', 4, ['zhonggong', 'binzhan']],
			/**大神澪 */
			ŌokamiMio: ['female', 'holo', 3, ['xuanxu', 'weizeng'], ['forbidai']],
			/**大脸猫 */
			NekomataOkayu: ['female', 'holo', 3, ['fantuan', 'shengang']],
			/**狮白牡丹 */
			ShishiroBotan: ['female', 'holo', 4, ['sbliedan', 'buqiang']],
			/**天音彼方 */
			AmaneKanata: ['female', 'holo', 3, ['yuyi', 'renjian']],

			/**OG诸人 */
			Civia: ['female', 'holo', 3, ['kuangxin', 'danyan', 'qingjie'], ['guoV']],
			SpadeEcho: ['female', 'holo', 3, ['hangao', 'yinglve'], ['guoV']],
			Artia: ['female', 'holo', 3, ['shuangzhi', 'xiwo'], ['guoV']],
			Doris: ['female', 'holo', 3, ['shenhai', 'paomo'], ['guoV']],
			Yogiri: ['female', 'holo', 4, ['shisang', 'wanjie'], ['guoV']],
			Rosalyn: ['female', 'holo', 3, ['maoge', 'bianlan', 'futian'], ['guoV']],
		},
		characterSort: {
			hololive: {
				hololive_wuyin: ['TokinoSora', 'HoshimatiSuisei', 'RobokoSan', 'SakuraMiko'],
				hololive_1: ['YozoraMel', 'AkiRosenthal', 'AkaiHaato', 'ShirakamiFubuki', 'NatsuiroMatsuri'],
				hololive_2and3: ['MinatoAqua', 'UsadaPekora'],
				OurGirls: ['Civia', 'SpadeEcho', 'Artia', 'Doris', 'Yogiri', 'Rosalyn'],

				HOLOEN: ['GawrGura', 'NinomaeInanis'],
			}
		},
		characterReplace: {
			TokinoSora: ['re_TokinoSora', 'TokinoSora'],
			RobokoSan: ['re_RobokoSan', 'RobokoSan'],
			YozoraMel: ['re_YozoraMel', 'YozoraMel'],

			ShirakamiFubuki: ['re_ShirakamiFubuki', 'ShirakamiFubuki'],
			HoshimatiSuisei: ['re_HoshimatiSuisei', 'HoshimatiSuisei'],
			AkiRosenthal: ['re_AkiRosenthal', 'AkiRosenthal'],
			SakuraMiko: ['re_SakuraMiko', 'SakuraMiko'],
			NatsuiroMatsuri: ['re_NatsuiroMatsuri', 'NatsuiroMatsuri'],
			AkaiHaato: ['re_AkaiHaato', 'AkaiHaato'],
			UsadaPekora: ['re_UsadaPekora', 'UsadaPekora', 'sp_UsadaPekora', 'old_UsadaPekora'],
			ŌokamiMio: ['re_ŌokamiMio', 'ŌokamiMio'],
			SpadeEcho: ['re_SpadeEcho', 'SpadeEcho'],

			Ciyana: ['Ciyana', 'Civia'],

			MinatoAqua: ['MinatoAqua', 'sp_MinatoAqua', 'sea_MinatoAqua'],
			GawrGura: ['GawrGura', 'sp_GawrGura'],
		},
		characterIntro: {
			MinatoAqua: '阿库娅者，杏社一孑然水兵，虫蝗起祸之时水军都督欲助之，夸苦谏无果，斩之，人常言名正则言顺，夸亦不惧流言，僭越圣皇之位。如此抗争十月有余，战功赫赫，只身一人斩鬼佬兆计，活华夏民众不可胜数，元昭既为虫蝗惑，出兵连击圣皇，圣皇外抗虫蝗，内拒元昭，日削月割，以至于穷，V始二十四年，姑苏城破，圣皇燔宝器、烧粮草，死战力竭而亡。',
			UsadaPekora: '“哈↑哈↑哈↑哈↑”',

			SakuraMiko: '樱巫女（V始三年）者，神社之巫女也，性坚毅，素有樱火龙之称，子云，食色性也，圣人如此，miko亦然，miko喜黄油，常于配信误启之，虽贵为巫女，护东南诸郡安宁，然不识诗书，有《FAQ》、《倪哥》为众人笑，V始十九年，朝廷窜东南，miko力拒之，自封自由领，不受诸侯管制',
			HoshimatiSuisei: '星街彗星（V始三年），北海人也，少时贫寒，彗酱一心求学，从当世之先达元昭执经叩问，元昭深器之，彗酱豆蔻之年即通晓诸经，人莫不言之曰天道酬勤，六边形战士之名世人皆知。V始十三年绊爱首义，彗酱自投笔从戎，有tst之神兵，杏国拜之曰上将军，后党锢事泄，世人皆知元昭欺世盗名之徒，星街亦惶惶不可终日，随杏败走瀛洲。',
			TokinoSora: '混沌的尽头，少女的回旋曲，杏社起始同时也是终末的清楚担当，全杏社圆桌骑士之首，空友之母，反抗军的破坏者、狮心之人、大杏社的卡丽熙、hololive真主、永不恐惧者、阿芙乐尔公主，时乃空是也',
			YozoraMel: '夜空梅露者，西界之吸血鬼也，面容婧然身材出众，曾因人拒同族长者，为血族放，梅露东奔长安，于苑中为歌女，惹得京城子弟风流，夏色祭既受元昭令，以樱桃汁赚梅露，遂从祭拜杏国，元昭拜之曰南阳县主。',
			AkaiHaato: '赤井心，京师名医之后也，嗜食成性，有《药膳经》流于世，其药多先夺人命后生之，用者莫不谈之色变，食尤喜沙琪玛，每日贡食入府，左右皆呼“哈恰玛恰玛”，后元昭起势，心随夏色祭往拜之，从军十年活人兆计，后拜土澳公主，总领土澳事宜。',
			AkiRosenthal: 'aki者，蓬莱之仙子也，天帝遣aki携神兵助元昭起义师，aki遂下界，恰逢时乃空见欺，朝廷围之，aki使奥术魔刃斩之，只一合，朝廷三十万军士灰飞烟灭，杏军皆呼之曰神，有反重力之发辫二，元昭欲留aki，aki婉拒之，还复天界，不知所踪。',
			NatsuiroMatsuri: '夏色祭（V始二年）者，元昭之同族也，自党锢之祸后，元昭暗谋国事，遣祭访天下名士，得名士四人，是为杏国一期，祭不拘小节，最喜呼吸，同社皆避之，既为混沌传说，一般露○可轻言之，建功累累，元昭尊为第一将军',
			RobokoSan: '萝卜子（V始三年）者，奇巧士之造物也，自号高性能机器人，实则不善文书，萝卜起于草莽，生性豪爽，后为时乃空所动，随杏社征战，V始二十年，杏国攻灭诸侯，远交近攻，俨然有大一统之势，萝卜子拜平南王福禄将军，安于南方',
			ShirakamiFubuki: '白上吹雪者，青丘之狐也，夏色祭以玉米赚之，V始十五年，朝廷击绊爱于桐江，大破之，又击之于宛城，斩爱之左将军，一时人皆自危，起义初显败势，吹雪自领百骑迂回西南袭朝廷于后，解绊爱众叛亲离之危，重兴V国大业，后虫蝗起祸，元昭绥靖，吹雪亦听之任之，遂成大乱。',


			Civia: '希薇娅者，独角兽也，九世善行，神灵感其所为，点化成人，其成人之时情不自禁多言人语，后人称之为“话痨将军”，civia多通夷语，随黑桃影归杏后，官拜大学士，总掌文职，行事和蔼淡然，常言“watashimo”，有好好先生之称，虫蝗之难后，civia叹恶龙之无道，元昭之无能，携cn六人离之。',
			SpadeEcho: '黑桃影者，神乐七奈之女也，幼时离散，嗓音独特，孑然独活于幽云等地，以行盗活之，echo盗亦有道，决不伸手贫寒，常行窃于联动对象设备，造成诸多直播事故，为天下笑，echo慕杏“则天去私”之号，携友三人归之，战功赫赫，杏有中华基业，echo等六人之力也，虫皇之难后，echo终思华夷不两立，冲突出阵，隐退于山林。',
		},
		skill: { ...skill },
		translate: {
			hololive_1: `一期生`,
			hololive_wuyin: `无印`,
			hololive_2and3: `二&三期生`,
			OurGirls: `OurGirls`,

			TokinoSora: `时乃空`,
			taiyangzhiyin: `太阳之音`,
			taiyangzhiyin_info: `你使用牌指定目标时，此牌点数每比10大1点，你便可选择不重复的一项：<br>令之无法响应；为之额外指定一名目标；或摸一张牌。`,
			taiyangzhiyin_append: lib.figurer(`特性：强制命中 强化出杀`),
			renjiazhizhu: `仁家之主`,
			renjiazhizhu_info: `主公技 你的回合开始时，其他同势力角色可以展示并交给你一张牌，本回合这些点数的牌点数均改为J。`,
			renjiazhizhu_tag: `仁家之主`,

			YozoraMel: `夜空梅露`,
			juhun: `聚魂`,
			juhun_info: `锁定技 每回合有角色首次受到伤害后，将牌堆顶牌置于你武将牌上。一轮开始时，你获得武将牌上所有牌。`,
			meilu: `没露`,
			meilu_info: `锁定技 准备阶段，若你的手牌数比体力值多三或以上，你翻面。当你的武将牌背面朝上时，你使用【杀】没有次数限制；当你的武将牌翻至正面时，你回复 1 点体力。`,
			meilu_append: lib.figurer(`特性：多次出杀`),

			AkaiHaato: `赤井心`,
			liaolishiyan: `料理实验`,
			liaolishiyan_info: `摸牌阶段，你可改为展示并获得牌堆顶的两张牌，然后根据其中的花色执行对应效果：♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。出牌阶段限一次，你可以重铸与当回合『料理实验』花色相同的两张牌令一名角色执行对应效果。`,
			liaolishiyan2: `料理实验`,
			liaolishiyan2_info: `出牌阶段限一次，你可以重铸与当回合『料理实验』花色相同的两张牌令一名角色执行对应效果。♦~重铸一张牌，♣~弃置一张牌，♥~令赤井心回复 1 点体力，♠~失去 1 点体力。`,
			momizhiyan: `抹蜜之言`,
			momizhiyan_info: `每回合限一次，当你使用牌指定目标后，你可弃置一张牌令其中一名目标执行弃置牌花色在『料理实验』的对应效果。`,
			momizhiyan_append: lib.figurer(`特性：难上手`),

			NatsuiroMatsuri: `夏色祭`,
			huxi: `呼吸`,
			huxi_buff: `呼吸`,
			huxi_info: `出牌阶段限一次，你可以与攻击范围内的一名角色交换一张手牌。当你以此法获得红色牌时，你摸一张牌，本回合内进攻距离+1且可多使用一张【杀】。`,
			huxi_append: lib.figurer(`特性：传递关键牌`),
			lianmeng: `连梦`,
			lianmeng_info: `锁定技 当你使用武器牌或造成伤害后，你需对本回合未以此法指定的一名角色发动『呼吸』。当你于回合外获得其他角色的牌后，重铸你装备区的防具牌。`,
			lianmeng_append: lib.figurer(`特性：难上手`),

			RobokoSan: `萝卜子`,
			gaonengzhanxie: `高能战械`,
			gaonengzhanxie_info: `锁定技 你使用【杀】的次数上限加上你装备区牌数。当你于回合内使用【杀】后，你摸X张牌，若你还可使用【杀】，你弃置等量的牌。（X为你本阶段已使用过的【杀】的数量)`,
			gaonengzhanxie_append: lib.figurer(`特性：多次出杀`),
			ranyouxielou: `燃油泄漏`,
			ranyouxielou_info: `锁定技 你受到属性伤害时，令来源选择一项：<br>
			取消之并你回复等量体力；令你获得伤害来源牌。<br>
			你攻击范围内其他角色受到火焰伤害时，若你的手牌数不小于手牌上限，你弃置一张牌令此伤害+1。`,
			ranyouxielou_append: lib.figurer(`特性：属性伤害减免`),

			ShirakamiFubuki: `白上吹雪`,
			baihuqingguo: `白狐倾国`,
			baihuqingguo_info: `其他角色的出牌阶段开始时，你可弃一张牌，若如此做，该角色于此阶段使用的牌只能以你或其自己为目标。`,
			huyanluanyu: `狐言乱语`,
			huyanluanyu_info: `每当你受到1点伤害后，（记你此时手牌数为X）你可令手牌数多于X的角色各交给你一张牌，然后你交给手牌数少于X的角色各一张牌。`,
			yuanlv: `远虑`,
			yuanlv_info: `每轮每项限一次。一个回合结束时，若你使用过锦囊牌或受到过伤害，你可以摸等同你体力上限的牌，并将等同你体力值的牌置于牌堆顶。`,
			yuanlv_append: lib.figurer(`特性：卖血 控顶`),
			jinyuan: `近援`,
			jinyuan_info: `出牌阶段限一次，你可以观看一名角色的手牌，然后你可交给其一张牌，若如此做，其可以立即使用之。`,
			jinyuan_append: lib.figurer(`特性：传递关键牌`),
			zhongjian: `中坚`,
			zhongjian_info: `主公技 轮次技 当一张通常锦囊牌指定目标后，你可以选择同势力一名角色的一张手牌，此牌本回合视为【无懈可击】。`,

			AkiRosenthal: `亚琦·罗森塔尔`,
			AkiRosenthal_ab: `亚琦`,
			meiwu: `魅舞`,
			meiwu_info: `每回合限一次，当你成为黑色牌的唯一目标时，你可以将目标转移给另一名其他角色，然后若此牌被抵消，你交给其一张牌。`,
			huichu: `慧厨`,
			huichu_info: `体力值最少的角色回合开始时，你可以展示所有手牌，若均为♥，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。`,


			HoshimatiSuisei: `星街彗星`,
			yemuxingyong: `夜幕星咏`,
			yemuxingyong_info: `每轮限一次，一个弃牌阶段结束时，你可将本阶段进入弃牌堆的牌置于武将牌上，称为「咏」。然后其他角色也可将一张黑色牌置于你武将牌上。<br>出牌阶段，你可获得一张「咏」，然后立即将两张手牌当【过河拆桥】或【酒】使用。`,
			yong: `咏`,
			xinghejianduei: `星河舰队`,
			xinghejianduei_info: `<font color=#ccf>觉醒技</font> 一轮开始时，若你的体力值不大于游戏轮数，你扣减 1 点体力上限并摸八张牌，然后你的攻击范围和手牌上限始终增加「咏」的数量。`,

			SakuraMiko: `樱巫女`,
			haodu: `豪赌`,
			haodu_info: `出牌阶段限X次（X为你已损失的体力值且至少为1)，你可以将至少一张手牌交给一名其他角色并声明点数、花色、类型，然后你展示其一张手牌。根据与声明相同的项依次执行对应效果：点数~你与其交换手牌；类型~令其弃置两张牌；花色~你获得其一张牌。			`,

			MinatoAqua: `湊阿库娅`,
			kuali: `夸力满满`,
			kuali_info: `出牌阶段限一次/结束阶段，你可以选择一项：<br>
			&nbsp;选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力<br>
			&nbsp;摸体力为你整数倍的角色数的牌，失去1点体力`,
			kuali_active_info: `出牌阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。`,
			kuali_jieshu_info: `结束阶段，你可以选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力；或摸体力为你整数倍的角色数的牌，然后失去1点体力。`,
			youyi: `友谊誓约`,
			youyi_info: `轮次技 其他角色的回合开始时，你可以展示并交给其一张「誓约」牌。本回合内，当其造成伤害时，你可令其将「誓约」牌交给你以防止之。该回合结束时，其可以弃置「誓约」牌令你或其回复1点体力。`,
			youyi_append: lib.figurer(`特性：传递关键牌 限制敌方输出`),
			youyishiyue: `誓约`,
			youyishiyue_info: `友谊誓约生效中`,
			youyishiyue_rec_info: `弃置「誓约」牌，令你或湊阿库娅回复一点体力。`,

			UsadaPekora: `兔田佩克拉`,
			zhonggong: `重工`,
			zhonggong_info: `准备阶段，若你装备区牌数为全场唯一最少/唯一最多，你令手牌上限永久+1/两名角色横置。`,
			binzhan: `缤绽`,
			binzhan_info: `出牌阶段限一次，你可以调整手牌至上限，若你因此弃牌，你可以对攻击范围内至多X名角色各造成1点火焰伤害（X为你弃置的牌数）。`,

			NekomataOkayu: `猫又小粥`,
			fantuan: `安心饭团`,
			fantuan_info: `你使用一张延时锦囊牌时，可以令一名角色回复一点体力并摸一张牌。`,
			shengang: `神冈家计`,
			shengang_judge: `神冈家计-判定`,
			shengang_useCard: `神冈家计-使用`,
			shengang_info: `每两轮每项限一次，你可以在自己与相邻角色判定区卡牌/使用实体牌结算后获得之。`,
			shengang_append: lib.figurer(`特性：回收关键牌`),


			UruhaRushia: `润羽露西娅`,
			NakiriAyame: `百鬼绫目`,
			MurasakiShion: `紫咲诗音`,
			TsunomakiWatame: `角卷绵芽`,
			YukihanaLamy: `雪花菈米`,
			ŌzoraSubaru: `大空昴`,
			AZKi: `AZKi`,

			Civia: `希薇娅`,
			kuangxin: `旷心`,
			kuangxin2: `旷心`,
			kuangxin_info: `每回合限一次，当其他角色成为【杀】或伤害类锦囊牌的唯一目标时，你可以令你与其各选择一张牌交换，此牌结算后，若其未受到此牌造成的伤害，你可以令你或其摸一张牌。`,
			danyan: `弹言`,
			danyan_info: `你的手牌因弃置而进入弃牌堆时，若本回合你没有造成过伤害，你可以使用其中的一张牌。`,
			qingjie: `轻捷`,
			qingjie_info: `锁定技 你与装备区内没有坐骑牌的角色的距离视为1；其他角色计算与你的距离时，你每比其多一张手牌，距离便+1。`,

			SpadeEcho: `黑桃影`,
			hangao: `函告`,
			hangao_info: `出牌阶段限一次，你可以将一张♠牌交给一名其他角色，该角色于下个回合结束时展示所有手牌，若其本回合没有对你使用过牌，你获得其所有的♥牌；若你本轮交出的♠牌未被其使用且不在其手牌中，你获得其所有的♦牌。`,
			hangao_append: lib.figurer(`特性：传递关键牌 挑衅`),
			yinglve: `影掠`,
			yinglve_info: `结束阶段，你可以废除一个装备栏视为使用一张无距离限制的【顺手牵羊】；你的攻击范围+X且你使用【顺手牵羊】可选择的目标数为X。（X为你废除的装备栏数）`,

			Artia: `阿媂娅`,
			shuangzhi: `殇冻`,
			shuangzhi_info: `其他角色一回合内弃置第二张牌后，你可以令其选择一项：<br>受到1点无来源伤害；或受到的伤害+1直到其回合开始。`,
			xiwo: `希握`,
			xiwo_info: `一轮开始时，你可以令一名角色失去1点体力，另一名角色回复1点体力。本轮结束时前者回复1点体力，后者失去1点体力。`,

			Doris: `朵莉丝`,
			shenhai: `曜海`,
			shenhai_info: `当你使用一张1.装备牌2.基本牌3.通常锦囊牌时，若该牌点数大于你本回合使用的上一张牌，你可以执行对应标号的项：1.令一名其他角色使用2.此牌额外结算一次3.此牌增加或减少一个目标。当你于一回合内发动三次本技能后，解除标号限制。`,
			shenhai_append: lib.figurer(`可以通过先打小牌后打大牌，让【桃】、【杀】多生效一次`),
			paomo: `儚恋`,
			paomo_info: `每名角色每回合限一次，当其他角色于你的回合内使用牌后，你可以令你『曜海』记录牌的点数视为与此牌相同，然后与其各摸一张牌。`,
			paomo_append: lib.figurer(`特性：联动`),

			Yogiri: `夜霧`,
			shisang: `食尚`,
			shisang_info: `出牌阶段限一次，你使用牌指定目标后，可以将此牌的效果改为令目标回复1点体力。`,
			wanjie: `腕解`,
			wanjie_info: `出牌阶段限一次，你可以展示所有手牌并选择一项：<br>
			弃置其中的黑色牌，并摸两张牌；弃置其中的红色牌，并将本回合『食尚』的 “回复1点体力” 改为 “受到1点伤害”。`,

			Rosalyn: `罗莎琳`,
			maoge: `帽阁`,
			maoge_info: `锁定技 你摸的牌均改为置于武将牌上，称为「书」。你的手牌数不小于「书」数时，摸牌阶段额外摸一张牌；你的手牌数小于「书」数时，你能且只能使用或打出「书」。`,
			maoge_append: lib.figurer(`可以无视手牌上限屯牌`),
			bianlan: `遍览`,
			bianlan_info: `当你使用牌指定目标后，你可以获得一种花色的「书」。然后你可以令其中一名本回合未因此摸牌的目标摸一张牌。`,
			futian: `覆天`,
			futian_info: `<font color=#abf>限定技</font> 回合开始时，你可以交换手牌与「书」，然后本回合你可以将任意两张牌当一张未以此法使用过的通常锦囊牌使用。`,
			futian_append: lib.figurer(`特性：爆发`),

		},
	};
});
