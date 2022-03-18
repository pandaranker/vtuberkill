import skill from './vtuber_skill'
import translate from './vtuber_translate'
window.game.import('character', function (lib, game, ui, get, ai, _status) {
	return <currentObject>{
		name: 'vtuber',
		connect: true,
		character: {
			/**绊爱 */
			KizunaAI: ['female', 'upd8', 4, ['ailian', 'qixu'], ['zhu']],
			/**天开司 */
			TenkaiTsukasa: ['male', 'upd8', 4, ['pojie', 'dazhen']],

			/**小白 */
			Siro: ['female', 'dotlive', 4, ['zhongxinghezou', 'xiugong'], ['zhu']],
			/**巴恰鲁 */
			Bacharu: ['male', 'dotlive', 4, ['zuodun', 'baidao']],
			/**小明 */
			MiraiAkari: ['female', 'qun', 4, ['shiyilijia', 'seqinghuashen']],
			/**辉夜月 */
			KaguyaLuna: ['female', 'qun', 3, ['jiajiupaidui', 'kuangzuiluanwu']],
			/**pph */
			PinkyPopHepburn: ['female', 'qun', 4, ['pphpanfeng', 'lanyue']],

			/**小希小桃 */
			XiaoxiXiaotao: ['female', 'xuyan', 3, ['yipengyidou', 'renleiguancha'], ['guoV']],
			/**小柔 */
			Xiaorou: ['female', 'xuyan', 3, ['rouqing', 'guangying'], ['guoV']],
			/**兰音 */
			Reine: ['female', 'xuyan', 4, ['yueyao', 'kongling'], ['guoV']],
			/**艾露露 */
			Ailurus: ['female', 'xuyan', 4, ['aldanyan', 'hunao'], ['guoV']],

			/**兔妈妈 */
			InabaHaneru: ['female', 'nanashi', '2/3', ['jiance', 'chanbing', 'buyu'], ['zhu']],
			/**BFM */
			UmoriHinako: ['female', 'nanashi', 4, ['hongyi', 'jueshou']],
			/**patra */
			SuouPatra: ['female', 'nanashi', 4, ['mianmo', 'tiaolv']],
			/**日ノ隈らん */
			HinokumaRan: ['female', 'nanashi', 4, ['yixiang', 'xianyu'], ['riV']],

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
			Pudding: ['female', 'psp', 4, ['tianlve', 'luji'], ['guoV', 'P_SP', 'doublegroup:psp:qun']],
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
			/**西魔幽 */
			AkumaYuu: ['male', 'psp', 4, ['akjianwu', 'tongzhao'], ['guoV', 'P_SP']],

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
			/**月紫亚里亚 */
			TsukushiAria: ['female', 'qun', 3, ['tatongling', 'yumeng'], ['riV']],

			/**泠鸢 */
			Yousa: ['female', 'VirtuaReal', 3, ['niaoji', 'ysxiangxing'], ['guoV']],
			/**Hanser */
			Hanser: ['female', 'VirtuaReal', 3, ['naiwei', 'cishan'], ['guoV']],
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
			/**勾檀Mayumi */
			Mayumi: ['female', 'VirtuaReal', 4, ['jinzhou', 'gouhun'], ['guoV']],
			/**阿梓 */
			Azusa: ['female', 'VirtuaReal', 4, ['zhiyue', 'zhengniu'], ['guoV']],
			/**小可 */
			xiaoke: ['female', 'VirtuaReal', '3/4', ['dianying', 'ganfen'], ['guoV']],
			/**露露娜Ruruna */
			Ruruna: ['female', 'VirtuaReal', 4, ['miluan', 'shenjiao'], ['guoV']],

			/**胡桃 */
			Menherachan: ['female', 'NetEase', 4, ['shangbei', 'qianqing'], ['guoV']],
			/**栗子酱 */
			RIKO: ['female', 'NetEase', 4, ['tieyu'], ['guoV']],
			/**山兔 */
			YamaUsagi: ['female', 'NetEase', 3, ['zhengmeng', 'wadao'], ['guoV']],

			/**犬山 */
			InuyamaTamaki: ['male', 'nori', 3, ['rongyaochengyuan', 'hundunliandong']],
			/**Mishiro */
			ShirayukiMishiro: ['female', 'nori', 3, ['tianyi', 'nveyu']],

			/**虾皇 */
			xiaoxiayu: ['female', 'xuefeng', 4, ['tanghuang', 'xiejiang'], ['guoV']],
			/**龟龟 */
			tianxixi: ['female', 'xuefeng', 3, ['lache', 'danfu'], ['guoV']],
			/**申䒕雅 */
			shenxiaoya: ['female', 'xuefeng', 4, ['xyshixi', 'wenxin'], ['guoV']],

			/**机萪 */
			jike: ['female', 'qun', 3, ['qianjiwanbian'], ['guoV']],
			/**扇宝 */
			shanbao: ['female', 'qun', 4, ['fengxu'], ['guoV']],
			/**秋蒂 */
			qiudi: ['female', 'qun', 3, ['xiangnuo'], ['guoV']],
			/**麟＆犀 */
			linxi: ['female', 'qun', 5, ['lilian', 'zihuai'], ['guoV']],

			/**七濑Unia */
			NanaseUnia: ['female', 'Providence', 4, ['qisui'], ['guoV']],
			/**胡桃Usa */
			KurumiUsa: ['female', 'Providence', 3, ['jidou', 'duotian'], ['guoV']],
			/**玛安娜Myanna */
			Myanna: ['female', 'Providence', 4, ['yemo', 'jiaopin'], ['guoV']],
			/**花花Haya */
			Haya: ['female', 'Providence', 4, ['shengping', 'jiushuang'], ['guoV']],
			/**咲间妮娜 */
			SakumaNiina: ['female', 'Providence', 3, ['tianjiang', 'baiquan'], ['guoV']],
			/**满月 */
			Mitsuki: ['female', 'Providence', 4, ['xuedian'], ['guoV']],
			/**白桃shirako */
			Shirako: ['female', 'Providence', 4, ['jufu', 'qihun'], ['guoV', 'doublegroup:qun:Providence']],

			/**吉诺儿kino */
			Kino: ['female', 'HappyEl', 4, ['xiandu', 'yexi'], ['guoV']],
			/**唐九夏 */
			tangjiuxia: ['female', 'HappyEl', 4, ['jiuxian', 'yujian'], ['guoV']],
			/**李清歌 */
			liqingge: ['female', 'HappyEl', 4, ['tage'], ['guoV']],
			/**神宫司玉藻 */
			JingujiTamamo: ['female', 'HappyEl', 3, ['aowei', 'meizhan'], ['zhu', 'guoV']],

			/**艾瑞思 */
			airuisi: ['female', 'Tencent', 4, ['maozhi', 'baifei'], ['zhu', 'guoV']],
			/**星瞳 */
			xingtong: ['female', 'Tencent', 4, ['jiezou', 'xtguyong'], ['guoV']],
			/**艾白 */
			aibai: ['female', 'Tencent', 3, ['bianyin', 'shabai'], ['guoV']],
			/**文静 */
			wenjing: ['female', 'Tencent', 4, ['zaiying', 'zhengen'], ['guoV']],
		},
		characterSort: {
			vtuber: {
				asoul2: ['Ava', 'Bella', 'Carol', 'Diana', 'EQueen'],
				VirtuaReal2: ['Yousa', 'Aza', 'Shaun', 'Mayumi', 'xiaoke', 'Azusa', 'Mahiru', 'Chiyuu', 'Mari', 'Ruruna'],
				psp2: ['Pudding', 'AyanaNana', 'AkiRinco', 'KurenaiAkane', 'Lovely', 'Seki', 'AkumaYuu'],
				vwp2: ['Kaf', 'Rim', 'IsekaiJoucho', 'Harusaruhi', 'Koko', 'Kafu'],
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
		skill: {...skill},
		card: {},
		translate: {...translate},
	};
});
