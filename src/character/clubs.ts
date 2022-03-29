import skill from './club_skill'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	let Evt: { [propName: string]: any }
	return <currentObject>{
		name: 'clubs',
		connect: true,
		character: {
			//神乐组
			KaguraMea: ['female', 'kagura', 4, ['luecai', 'xiaoyan']],
			YaotomeNoe: ['female', 'kagura', 4, ['huiyuan', 'suoshi']],

			NekomiyaHinata: ['female', 'qun', 3, ['yuchong', 'songzang', 'zhimao']],
			XiaDi: ['male', 'qun', 4, ['yinliu', 'dunzou']],
			Nekomasu: ['female', 'qun', 3, ['milijianying', 'dianyinchuancheng']],
			/**艾琳 */
			Eilene: ['female', 'eilene', 4, ['daimeng', 'changsheng'], ['zhu']],
			/**嫁实 */
			Yomemi: ['female', 'eilene', 3, ['mokuai', 'yaoji']],
			/**萌实 */
			Moemi: ['female', 'eilene', 4, ['chengzhang', 'mengdong']],
			/**夏实萌惠 */
			NatsumiMoe: ['female', 'eilene', 4, ['moemanyi', 'cuchuan'], ['yingV']],
			/**白玉 */
			Shiratama: ['female', 'painter', 4, ['meihua', 'shentian'],],
			/**雫るる */
			ShizukuLulu: ['female', 'qun', 3, ['duixian', 'gutai']],

			/**P家诸人 */
			Paryi: ['male', 'paryi', 4, ['tiantang', 'haoren'], ['doublegroup:paryi:painter']],
			TakatsukiRitsu: ['female', 'paryi', 3, ['shengya', 'liangshan', 'chongshi']],
			MorinagaMiu: ['female', 'paryi', 3, ['guanzhai', 'zhishu']],
			OtomeOto: ['female', 'paryi', 3, ['yuxia', 'lianjue', 'changxiang'], ['zhu']],
			HisekiErio: ['female', 'paryi', 4, ['huange', 'qishi', 'yongtuan'], ['zhu']],
			HanazonoSerena: ['female', 'paryi', 4, ['jiumao', 'enfan', 'shiqi'], ['zhu']],
			/**甘城なつき */
			NachoNeko: ['female', 'painter', 4, ['cirong', 'maoyu'], ['riV']],
			/**狗妈 */
			KaguraNana: ['female', 'painter', 3, ['DDzhanshou', 'xinluezhili'], ['zhu', 'doublegroup:painter:paryi:holo']],
			/**真白花音 */
			MashiroKanon: ['female', 'paryi', 3, ['chenzhu', 'yutuo']],

			/**星宫汐 */
			HosimiyaSio: ['female', 'qun', 4, ['yuanyao', 'gongni'],],
			/**耳朵 */
			Hiiro: ['female', 'Providence', 4, ['jiace', 'xiangying'], ['yingV']],
			/**猫雷NyaRu */
			NecoraNyaru: ['female', 'qun', 3, ['miaolu', 'benglei'],],
			/**琥珀玲 */
			KohakuRin: ['female', 'qun', 4, ['chunzhen', 'hupo'],],
			/**寝月ねろ */
			NerunaNero: ['female', 'qun', 3, ['peijiu', 'ransha'],],
			/**羽澄照乌愈 */
			PastelUyu: ['female', 'qun', 3, ['chenming', 'xiantong'],],

			/**闪光pika */
			shanguangpika: ['female', 'qun', 4, ['yikai', 'pkyuanjun'], ['guoV']],
			/**永雏塔菲 */
			Taffy: ['female', 'qun', 3, ['qianqi', 'chutan'], ['guoV']],
			/**桃井最中 */
			MomoiMonaka: ['female', 'qun', 4, ['qutao', 'daifei'], ['guoV']],

			/**咩栗 */
			Merry: ['female', 'VirtualUnion', 4, ['qinhuo', 'lvecao', 'yangxi'], ['guoV']],
			/**呜米 */
			Umy: ['female', 'VirtualUnion', 4, ['naisi', 'tuzai', 'wuneng'], ['guoV']],
			/**希亚娜 */
			Ciyana: ['female', 'VirtualUnion', 3, ['yankui', 'danyan']],

			/**进击的冰糖 */
			bingtang: ['female', 'xuyan', 4, ['xiou'], ['guoV', 'doublegroup:xuyan:qun']],
			/**张京华 */
			zhangjinghua: ['male', 'qun', 3, ['xiemen', 'jiai']],
			/**NoiR */
			NoiR: ['female', 'qun', 3, ['mozouqiyin', 'budingpaidui']],
			/**晴步子 */
			Bafuko: ['female', 'qun', 4, ['shangsheng', 'jinghua']],
			/**阳向心美 */
			HinataCocomi: ['female', 'qun', 4, ['qijian', 'yizhan', 'jushi'], ['zhu']],
			/**紫海由爱 */
			ShikaiYue: ['female', 'qun', 3, ['lianyin', 'guixiang'], ['doublegroup:qun:xuyan']],
			/**纸木铗 */
			KamikiHasami: ['female', 'qun', 4, ['quzhuan', 'yuanjiu'],],
			/**黑桐亚里亚 */
			KurokiriAria: ['female', 'qun', 4, ['xuanying', 'houfan'],],

			/**早稻叽 */
			Zaodaoji: ['female', 'chaos', 4, ['guangan', 'lanxuan', 'zonghe'], ['zhu', 'guoV']],
			/**白夜真宵 */
			ByakuyaMayoi: ['female', 'chaos', 4, ['bykuangxin'], ['guoV']],
			/**牛牛子 */
			Niuniuzi: ['female', 'chaos', 4, ['qiying', 'hengxuan'], ['guoV']],

			/**蜜球兔 */
			Miqiutu: ['female', 'VirtuaReal', 4, ['zhazong', 'mengnan'], ['guoV']],
			/**茶冷 */
			Karon: ['female', 'VirtuaReal', 4, ['huomo', 'tuying'], ['guoV']],

			/**米白 */
			mibai: ['female', 'RedC', 4, ['zhepie', 'chumo'], ['guoV']],
			/**亚哈 */
			Ahab: ['female', 'RedC', 4, ['ahbingyi', 'sujian'], ['guoV']],

			/**宇佐纪诺诺 */
			UsakiNono: ['female', 'ego', 4, ['tuhui', 'fuyou'], ['guoV']],
			/**莱妮娅 */
			Rynia: ['female', 'ego', 4, ['yinxu'], ['guoV']],

			/**喵喵人 */
			Nyanners: ['female', 'vshojo', 3, ['shenghuo', 'dipo', 'miaoche'], ['zhu', 'yingV']],
			/**Veibae */
			Veibae: ['female', 'vshojo', 4, ['zhexun', 'yuci'], ['yingV']],
			/**铁耗子 */
			Ironmouse: ['female', 'vshojo', 3, ['haosun', 'banmao'], ['yingV']],
			/**Froot */
			Froot: ['female', 'vshojo', 4, ['exiao', 'jinmei'], ['yingV']],
			/**Silvervale */
			Silvervale: ['female', 'vshojo', 4, ['yingling', 'duchun'], ['yingV']],

			/**陆鳐 */
			luyao: ['female', 'qun', 4, ['manyou', 'changjie'], ['guoV']],
			/**林莉奈 */
			RinaHayashi: ['female', 'qun', 3, ['xilv', 'bana'], ['guoV']],
			/**清则子 */
			qingzezi: ['female', 'qun', 4, ['menghuan', 'gengu'], ['guoV']],
			/**菜菜姐 */
			caicai: ['female', 'qun', 5, ['tibing', 'guangtui'], ['guoV']],
			/**笙歌 */
			shengge: ['female', 'psp', 4, ['dixian', 'gumei'], ['guoV', 'P_SP', 'doublegroup:qun:psp']],
		},
		characterSort: {
			clubs: {
				paryi2: ['Paryi', 'TakatsukiRitsu', 'MorinagaMiu', 'HanazonoSerena', 'OtomeOto', 'HisekiErio', 'MashiroKanon'],
				vshojo2: ['Nyanners', 'Veibae', 'Ironmouse', 'Froot', 'Silvervale'],
				MeUmy: ['Merry', 'Umy'],
			}
		},
		characterTitle: {
			OtomeOto: '#pChucolala',
			HisekiErio: '#pChucolala',
			MashiroKanon: '#pChucolala',

			HayamiSaki: '#gChobits-live',
			KiyoInga: '#gChobits-live',
		},
		characterReplace: {
			NekomiyaHinata: ['re_NekomiyaHinata', 'NekomiyaHinata'],
			KaguraNana: ['re_KaguraNana', 'KaguraNana'],
			Siro: ['re_Siro', 'Siro'],
			Nekomasu: ['re_Nekomasu', 'Nekomasu'],
			XiaDi: ['re_XiaDi', 'XiaDi'],
			KaguraMea: ['re_KaguraMea', 'KaguraMea', 'sp_KaguraMea'],
			OtomeOto: ['re_OtomeOto', 'OtomeOto'],
			HisekiErio: ['re_HisekiErio', 'HisekiErio'],
			HanazonoSerena: ['re_HanazonoSerena', 'HanazonoSerena', 'old_HanazonoSerena'],
			HosimiyaSio: ['HosimiyaSio', 'sea_HosimiyaSio', 'star_HosimiyaSio'],

			Eilene: ['Eilene', 'old_Eilene'],
		},
		characterIntro: {
			Paryi: '帕里，巴蜀富豪者也，累世公卿，广散金帛，养士三千，昔绊爱首义，左右劝帕里图之，帕里由此建国，聚诸奇士建国帕里破一期，天时地利人和皆不顺，诸士心皆背，P家无疾而终，帕里亦败走青城，后党锢事泄，杏国树倒猴散，P家有团长绯赤艾利欧接连败诸侯，中兴P家，OTO、古守血遊等士亦借此征战，P家之势渐盛。',
			OtomeOto: 'oto者，名歌姬也，曾学于教坊司，能歌善舞，以《初音未来的消失》之传说名曲惊煞一众善才，后烽烟四起，oto批皮入V界，人情炎凉，难以经营，如此经年，后杏溃败，oto喃喃自言曰：好风凭借力，送我上青云。有友曰绯赤艾利欧，两人相持生活数十年，V始二十年，杏礼崩乐坏，团长尽收杏社之地，亲迎oto，oto亦欣然前往，paryi系重归荣光，此二人先导也。',
			TakatsukiRitsu: '阿律者，帕里之衙内也，清楚三铳士之一，以超美丽3d与烂活闻名，常联动yyut，一日律问直播间观众爱者，众人皆曰yyut，律遂破防光速下播，杏溃败后，众v皆如终获青天，有欣欣向荣之势，独律未增半分，郁郁寡欢，此后毕业之，是矣，烂活可供一时，可供一世乎？',

			KaguraMea: '神乐咩者，东瀛之歌女也，迫于生计西来中原，有《money》、《你好我很可爱》之名曲流传世间，咩性格直爽，以此获众拥簇，却亦因此惹祸上身，V始二十二年，西都陷落，咩于京畿聚众建国，国号曰咩，定元咩啊元年，与杏虹分庭抗礼。',
			KaguraNana: "神乐七奈（V始三年），蜀郡唐辛人也，尤善丹青，图写特妙，元昭重之，V始三年，诞女百鬼绫目，益州牧帕里既败，七奈自修同族聚众起兵，拥者百万。谚曰，多言必失，是矣！七奈失言为中原诸侯所恶，蜀地之人亦仇中原，如此至今。",
			Siro: "siro（V始二年），字小白，别号电脑少女，母孕时梦海豚入怀，小白诞即能言，孩提之时即多识胡语，尤善海豚之言，既加冠，应召入宫，拜左将军V海豚候领幽州牧，善骑射，有神弓曰AKM，军中皆呼战神。",
			HanazonoSerena: "花园sarena者（V始三年），青城之猫灵也，清楚三铳士之一，为报帕里之恩追随之，虽体弱多病然擅行刺，V始三年，以松饼鸩杀汉中太守，帕里pro遂建国巴蜀，花园猫不谙世事，常为好事者钓之。V始九年，朝廷出兵百万击巴蜀，大破蜀军，花园猫身中数刀，仍负帕里逃出益州，复还青城，人不知所踪。",
			XiaDi: '下地者，V8之健将也，自群雄并起，囚人草莽之徒自成一国，名曰V8，V8奉绅宝为主，总领V8事宜，次年勒夫以鸩杀之，夺绅宝之权，下地作丹青《不要以为这样就赢了》缅之，领自家军离V8，后为勒夫击，大败，遁于江城。',
			Nekomasu: '狐叔者，原国相也，屡谏朝廷，针砭时弊，谗人间之，放于巴蜀，巴蜀有奇人曰野良喵，叔与野良一见如故，尝与青城饮之，后绊爱起义，屡请狐叔，狐叔自认忠于朝廷，屡拒之，叔素修黄帝之道，善养生之经，建宗“养生”，后日竟成第一宗。',
			NekomiyaHinata: '猫宫日向者，游侠也，尤善射术，有“飞将”之称，以一人一枪往艾伦格百次余，屠者以千计，日向好游戏，性天然，行事率真常为联动对象捉弄，节目效果斐然，日向家境贫寒，尚不能备衣物，以塑料袋蔽身，为邻人笑，邻人有九石玉、隐神木荫者素与日向交好，昔绊爱首义，日向与玉、木荫筹划建国，后为小人所泄，破之，日向遁于江湖，转个人势，与玉、木荫经营。',
		},
		skill: {...skill},
		dynamicTranslate: {
			mozouqiyin(player) {
				var str = '小';
				if (player.$.bigOrSmall) str = player.$.bigOrSmall;
				return `其他角色的回合开始时，你可使用一张牌，若未造成伤害，本回合其跳过弃牌阶段且不能使用点数（${str}）于此牌的牌。`;
			},
			budingpaidui(player) {
				var str = '小';
				if (player.$.bigOrSmall) str = player.$.bigOrSmall;
				return `当你使用一张牌后，若点数（${str}）于前一张被使用的牌，你可摸一张牌，然后用以下未选过的一项替代之前（）内的内容：小，大，等。三项均被触发后或一轮开始时，重置选项。`;
			}
		},
		translate: {
			MeUmy: `MeUmy`,

			Miqiutu: `蜜球兔`,
			zhazong: `寻嬲`,
			zhazong_info: `出牌阶段结束时，若你于此阶段没有使用过基本牌/装备牌/锦囊牌，你可以弃置一名角色手牌区/装备区/判定区各一张牌。`,
			zhazong_append: lib.figurer(`特性：易上手`),
			mengnan: `梦喃`,
			mengnan_info: `锁定技 当一张牌进入/离开你的判定区时，你需要摸/弃一张牌，若此时不在判定阶段，张数+1；<br>
			当你脱离濒死状态时，将此技能替换为『月喃』。`,
			yuenan: `月喃`,
			yuenan_info: `摸牌阶段，你可以改为亮出牌堆顶的五张牌，使用其中至多两张牌。`,

			Yomemi: `Yomemi`,
			mokuai: `模块搭载`,
			mokuai_info: `锁定技 你的【杀】和『致命药剂』可指定的目标数为X；你每次回复体力固定回复X点。（X为你装备区内牌数且至少为1）。`,
			yaoji: `致命药剂`,
			yaoji_info: `出牌阶段限一次，你可以选择一名角色，弃置任意张类型不同牌，然后亮出牌堆顶等量牌。目标角色需依次选择：弃置与亮出牌等量且花色相同的牌；或受到你造成的1点伤害。`,
			yaoji_append: lib.figurer(`特性：直接伤害`),

			Eilene: `艾琳`,
			daimeng: `贷梦`,
			daimeng_info: `每项限一次。出牌阶段，你可以摸一张/两张/三张/四张牌使手牌数为全场唯一最多，然后回复1点体力/横置/翻面/立即结束此阶段。`,
			daimeng_append: lib.figurer(`特性：爆发`),
			changsheng: `偿生`,
			changsheng_info: `锁定技 你首次进入濒死状态时，弃置区域内所有牌，回复体力至3，重置『贷梦』，从游戏中除外直到你的下个回合开始。`,

			NekomiyaHinata: `猫宫日向`,
			yuchong: `一命通关`,
			yuchong_info: `锁定技 你装备区内的武器牌不能被弃置。你装备着武器时，你手牌中的武器牌均视为不计入次数的【杀】。`,
			songzang: `送葬天使`,
			songzang_info: `你使用【杀】指定已损失体力值超过体力上限一半的角色为目标时，你可令此【杀】伤害+1，若其因此【杀】的伤害而进入濒死状态，则其不能使用【桃】直到此濒死事件结算。`,
			zhimao: `只箱只猫`,
			zhimao_info: `当你成为普通锦囊牌的目标时，若来源与你不相邻，你可选择一项：<br>
			取消之并摸一张牌；获得其武器牌，视为对其使用一张【杀】。`,

			KaguraMea: `神乐めあ`,
			luecai: `掠财`,
			luecai_info: `出牌阶段限一次，你可以将手牌数大于你的角色的一张牌置于你的武将牌上，或令一名手牌数小于你的角色将一张牌置于你的武将牌上，称为「财布」。
			准备阶段，若你的武将牌上有「财布」，你可以移去任意数量的「财布」摸等量的牌。`,
			luecai_append: lib.figurer(`特性：顺手牵咩`),
			xiaoyan: `嚣言`,
			xiaoyan_info: `锁定技 你对手牌数小于你的角色使用牌不可被响应。当你造成或受到伤害时，若有花色与来源牌相同的「财布」，此伤害+1。`,
			xiaoyan_append: lib.figurer(`特性：强制命中 破军`),
			caibu: `财布`,


			KamikiHasami: `纸木铗`,
			quzhuan: `曲转`,
			quzhuan_info: `每回合限一次，其他角色在你的回合内使用牌时，你可以在其结算后获得之。`,
			yuanjiu: `援咎`,
			yuanjiu_info: `一名角色的出牌阶段开始时，你可以交给其一张与装备区内某张牌花色相同的牌，视为对其使用了一张【酒】。`,
			yuanjiu_append: lib.figurer(`特性：传递关键牌 联动`),

			ShikaiYue: `紫海由爱`,
			lianyin: `联音`,
			lianyin_info: `每回合限X次，其他角色在你的回合内使用牌时，你可以与其各摸一张牌。（X为你的体力上限）`,
			lianyin_append: lib.figurer(`特性：联动`),
			guixiang: `归乡`,
			guixiang_info: `<font color=#caf>觉醒技</font> 准备阶段，若你发动『联音』的次数不少于存活角色数，你增加一点体力上限并回复一点体力，将『联音』的“使用”改为“使用或打出”。`,

			KurokiriAria: `黑桐亚里亚`,
			xuanying: `玄荫`,
			xuanying_info: `每回合限X次，其他角色在你的回合内使用牌时，你可以交给其一张牌，并令一名角色摸一张牌，若你交出了装备牌，则额外摸X张。（X为你装备区的牌数+1）`,
			xuanying_append: lib.figurer(`特性：联动`),
			houfan: `候返`,
			houfan_info: `<font color=#b56>限定技</font> 出牌阶段，若你手牌数为全场最少，你可以减1点体力上限，从弃牌堆随机获得四张装备牌，并将『玄荫』的“使用”改为“使用或打出”。`,

			HinataCocomi: `阳向心美`,
			qijian: `起鉴`,
			qijian_info: `其他角色于自己的回合使用一张指定目标的红色牌后，你可以跟随之使用一张牌，若你未以此牌造成伤害，你摸一张牌；若其势力与你不同，此技能失效直到本回合结束。`,
			qijian_append: lib.figurer(`特性：联动`),
			yizhan: `翼展`,
			yizhan_info: `每名角色限一次，你令其脱离濒死状态时，你可以摸牌至手牌上限并将其势力改为与你相同。`,
			jushi: `聚识`,
			jushi_info: `<font color=#fae>主公技</font> 锁定技 场上每有一名势力与你相同的角色，你的手牌上限+1。`,

			KaguraNana: `神乐七奈`,
			DDzhanshou: `DD斩首`,
			DDzhanshou_info: `当你使用牌指定目标后，你可选择其中一名目标角色，该角色每满足一项你便可将其一张牌移出游戏直到此回合结束：<br>
			手牌数不少于你；体力值不少于你；装备区牌数不少于你。<br>然后若该角色没有手牌，其摸一张牌。`,
			DDzhanshou_append: lib.figurer(`特性：连营 破军`),
			xinluezhili: `辛略之力`,
			xinluezhili_draw: `辛略之力`,
			xinluezhili_info: `主公技 当其他角色因『DD斩首』失去最后一张手牌时，其可令你摸一张牌。`,

			HanazonoSerena: `花园Serena`,
			HanazonoSerena_ab: `花园セレナ`,
			maoliang: `猫粮`,
			jiumao: `啾猫`,
			jiumao_put: `啾猫`,
			jiumao_info: `每名角色于出牌阶段限一次，可将任意张手牌置于你武将牌上，称为「猫粮」。<br>
			每回合限一次，你可将「猫粮」如手牌般使用或打出。`,
			jiumao_append: lib.figurer(`特性：联动`),
			enfan: `恩返`,
			enfan_info: `你令其他角色脱离濒死状态时，可以交给其任意数量的「猫粮」，然后若其手牌数与你相同，其可以视为使用一张你的「猫粮」。`,
			enfan_append: lib.figurer(`特性：辅助`),
			shiqi: `势起`,
			shiqi_info: `主公技 锁定技 同势力角色摸牌阶段多摸一张牌。`,

			MashiroKanon: `真白花音`,
			chenzhu: `辰铸`,
			chenzhu_info: `当武器牌被使用时，你将牌堆顶牌置于你的武将牌上。装备武器的角色的回合开始时，你可获得武将牌上的一张牌，改变其武器牌名直到回合结束。`,
			yutuo: `玉托`,
			yutuo_info: `每轮限一次，你可以令你受到的伤害-1，然后若你的<防具栏>没有牌，你可废除<防具栏>并以一个未废除的装备栏修改<>，重置此技能。`,
			yutuo_append: lib.figurer(`特性：减伤`),

			bingtang: `冰糖IO`,
			bingtang_ab: `冰糖`,
			xiou: `戏偶`,
			xiou_info: `出牌阶段开始时，你可以获得一名其他角色的所有手牌，然后交给其等量的牌。结束阶段，若你本回合没有对其造成过伤害，你与其各摸一张牌。`,
			xiou_gainHand_info: `出牌阶段开始时，你可以获得一名其他角色的所有手牌，然后交给其等量的牌。结束阶段，若你本回合没有对其造成过伤害，你与其各摸一张牌。`,
			xiou_append: lib.figurer(`特性：辅助`),

			zhangjinghua: `张京华`,
			xiemen: `斜门`,
			xiemen_info: `你使用或打出牌时，可令其他角色各随机移除一张手牌直到回合结束。`,
			xiemen_append: lib.figurer(`特性：易上手 破军`),
			jiai: `集爱`,
			jiai_info: `每回合限一次，你可以将两张手牌当任意基本牌使用或打出，当你以此法响应其他角色使用的牌时，摸一张牌。`,

			XiaDi: `下地`,
			yinliu: `引流`,
			yinliu_info: `出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。若你以此法弃置了所有手牌，本回合结束时你可再次发动此技能。`,
			yinliu_append: lib.figurer(`特性：赌狗`),
			dunzou: `遁走`,
			dunzou_info: `你于其他角色的回合被♣牌指定并结算后，你可以将自己移出游戏直到回合结束。`,
			dunzou_enable: `遁走`,

			Nekomasu: `ねこます`,
			milijianying: `迷离剑影`,
			milijianying_info: `锁定技 你视为拥有装备【节奏双剑】的效果。当你使用一张【杀】后，改变你的性别。`,
			dianyinchuancheng: `点引承传`,
			dianyinchuancheng_info: `当你受到 1 点伤害后，你可以与一名与你手牌数差不大于 X 的角色交换手牌，然后手牌较少的一方将手牌数调整至与较多一方相同。（X为体力值不少于你的角色数）`,
			dianyinchuancheng_append: lib.figurer(`特性：卖血 辅助`),

			ShizukuLulu: `雫るる`,
			duixian: `稽杀`,
			duixian_info: `每回合限一次，你对其他角色使用【杀】或其他角色使用【杀】指定你为目标时，你可改之为【决斗】。<br>
			若其因此受到伤害，你可弃置其一张牌，若你因此受到伤害，你摸两张牌。`,
			duixian_append: lib.figurer(`特性：强化出杀 卖血 易上手`),
			gutai: `守峡`,
			gutai_info: `当一张牌造成伤害后，若你为使用者或目标之一，你可以取消此牌的剩余目标。`,

			NoiR: `NoiR`,
			mozouqiyin: `默奏起音`,
			mozouqiyin_info: `其他角色的回合开始时，你可使用一张牌，若未造成伤害，本回合其跳过弃牌阶段且不能使用点数（小）于此牌的牌。`,
			mozouqiyin_append: lib.figurer(`特性：联动`),
			budingpaidui: `布丁派对`,
			budingpaidui_info: `当你使用一张牌后，若点数（小）于前一张被使用的牌，你可摸一张牌，然后用以下未选过的一项替代之前（）内的内容：小，大，等。<br>
			三项均被触发后或一轮开始时，重置选项。`,
			budingpaidui_append: lib.figurer(`特性：大连营`),

			MinamiNami: `美波七海`,
			Noracat: `野良喵`,
			Kano: `鹿乃`,
			HanamaruHareru: `花丸晴琉`,
		},
	};
});
