interface chara {
    name?: string,
    ability: [number, number, number, number, number],
    characteristic?: string,
    skills: string[],
}
const testDrama = {
    recommendGroups: ['group_RedC', 'group_xuyan', 'group_xuefeng'],
    factions: {
        group_RedC: {
            citys: ['nanhai', 'jiaozhi', 'jiuzhen'],
            chara: {
                leader: 'AmemachiF',
                members: ['mibai', 'Ahab'],
            },
            resource: {

            },
            config: {
                color: '#843e65'
            }
        },
        group_MiyaFam: {
            citys: ['changsha'],
            chara: {
                leader: 'Miya',
                members: ['MomoiMonaka'],
            },
            resource: {

            },
            config: {
                color: '#f1c44b'
            }
        },
        group_ego: {
            citys: ['wuling'],
            chara: {
                leader: 'UsakiNono',
                members: ['Rynia'],
            },
            config: {
                color: '#d88db7'
            }
        },
        group_xuyan: {
            citys: ['chaisang'],
            chara: {
                leader: 'Xiaoxi',
                members: ['Xiaotao'],
            },
            config: {
                color: '#d6ce6d'
            }
        },
        group_xuefeng: {
            citys: ['lujiang', 'runan'],
            chara: {
                leader: 'xiaoxiayu',
                members: ['tianxixi', 'shenxiaoya', 'iiivan'],
            },
            config: {
                color: '#a893c8'
            }
        },
        group_chaos: {
            citys: ['xiangyang', 'jiangling', 'jiangxia', 'xinye'],
            chara: {
                leader: 'Zaodaoji',
                members: ['ByakuyaMayoi', 'Niuniuzi', 'Mamoru'],
            },
            config: {
                color: '#76d7dc'
            }
        },
        group_NetEase: {
            citys: ['guangling'],
            chara: {
                leader: 'zhongguobanai',
                members: ['Menherachan', 'RIKO', 'YamaUsagi'],
            },
            config: {
                color: '#ff6868'
            }
        },
        group_chidori: {
            citys: ['kuaiji'],
            chara: {
                leader: 'airuisi',
                members: ['aibaiVer1', 'wenjingVer1'],
            },
            config: {
                color: '#dc569c'
            }
        },
        group_azhun: {
            citys: ['jianye'],
            chara: {
                leader: 'azhun',
                members: [],
            },
            config: {
                color: '#85add6'
            }
        },
        group_bingtang: {
            citys: ['wu'],
            chara: {
                leader: 'bingtang',
                members: ['zhangjinghua', 'Paryi'],
            },
            config: {
                color: '#b48469'
            }
        },
    },
    unions: {
        iceFire: {
            name: '冰火联盟',
            type: 'economic',
            members: ['group_xuefeng', 'group_xuyan']
        }
    },
    resource: {
        population: {
            abbr: 'P',
            reserves: {
                longxi: 10,
                wuwei: 20,
                tianshui: 14,
                anding: 12,

                shuofang: 10,
                wuyuan: 11,

                hanzhong: 13,
                zitong: 14,
                chengdu: 24,
                jiangzhou: 12,
                yongan: 20,

                fuling: 11,
                jianning: 10,
                yunnan: 12,
                yongchang: 10,

                xihe: 11,
                jinyang: 20,
                shangdang: 14,

                changan: 26,
                wan: 13,
                shangyong: 11,

                luoyang: 24,

                ye: 16,
                zhongshan: 14,
                nanpi: 12,

                ji: 12,
                beiping: 30,
                liucheng: 16,
                xiangping: 20,

                pingyuan: 14,
                beihai: 16,

                puyang: 13,
                chenliu: 16,

                xiapi: 20,
                xiaopei: 14,
                langya: 20,
                guangling: 18,

                shouchun: 22,
                lujiang: 14,

                xuchang: 20,
                runan: 13,

                xinye: 12,
                xiangyang: 28,
                jiangxia: 20,
                jiangling: 16,

                changsha: 20,
                wuling: 12,
                lingling: 14,
                guiyang: 16,

                jianye: 28,
                wu: 30,
                chaisang: 20,
                kuaiji: 14,
                jianan: 16,
                luling: 10,

                nanhai: 26,
                jiaozhi: 14,
                jiuzhen: 20,
            },
            allocation: {
                longxi: [0.4, 0.1],
                wuwei: [0.4, 0.1],
                tianshui: [0.4, 0.1],
                anding: [0.4, 0.1],

                shuofang: [0.4, 0.1],
                wuyuan: [0.4, 0.1],

                hanzhong: [0.5, 0.1],
                zitong: [0.5, 0.1],
                chengdu: [0.5, 0.1],
                jiangzhou: [0.5, 0.1],
                yongan: [0.5, 0.1],

                fuling: [0.4, 0.1],
                jianning: [0.4, 0.1],
                yunnan: [0.4, 0.1],
                yongchang: [0.4, 0.1],

                xihe: [0.5, 0.1],
                jinyang: [0.5, 0.1],
                shangdang: [0.5, 0.1],

                changan: [0.4, 0.1],
                wan: [0.4, 0.1],
                shangyong: [0.4, 0.1],

                luoyang: [0.5, 0.1],

                ye: [0.5, 0.1],
                zhongshan: [0.5, 0.1],
                nanpi: [0.5, 0.1],

                ji: [0.5, 0.1],
                beiping: [0.5, 0.1],
                liucheng: [0.5, 0.1],
                xiangping: [0.5, 0.1],

                pingyuan: [0.4, 0.1],
                beihai: [0.4, 0.1],

                puyang: [0.4, 0.1],
                chenliu: [0.4, 0.1],

                xiapi: [0.5, 0.1],
                xiaopei: [0.5, 0.1],
                langya: [0.5, 0.1],
                guangling: [0.5, 0.1],

                shouchun: [0.4, 0.1],
                lujiang: [0.4, 0.1],

                xuchang: [0.5, 0.1],
                runan: [0.5, 0.1],

                xinye: [0.5, 0.1],
                xiangyang: [0.5, 0.1],
                jiangxia: [0.5, 0.1],
                jiangling: [0.5, 0.1],

                changsha: [0.4, 0.1],
                wuling: [0.4, 0.1],
                lingling: [0.4, 0.1],
                guiyang: [0.4, 0.1],

                jianye: [0.6, 0.1],
                wu: [0.6, 0.1],
                chaisang: [0.6, 0.1],
                kuaiji: [0.6, 0.1],
                jianan: [0.6, 0.1],
                luling: [0.6, 0.1],

                nanhai: [0.6,0.1],
                jiaozhi: [0.6,0.1],
                jiuzhen: [0.6,0.1],
            },
        },
        reputation: {
            abbr: 'R',
            reserves: {
                group_RedC: 10,
                group_MiyaFam: 5,
                group_ego: 5,
                group_xuyan: 10,
                group_xuefeng: 20,
                group_chaos: 10,
                group_NetEase: 20,
                group_chidori: 5,
                group_azhun: 10,
                group_bingtang: 5,
            },
            allocation: {
                // longxi: [0.4, 0.1],
                // wuwei: [0.4, 0.1],
                // tianshui: [0.4, 0.1],
                // anding: [0.4, 0.1],

                // shuofang: [0.4, 0.1],
                // wuyuan: [0.4, 0.1],

                hanzhong: [0.5, 0.1],
                zitong: [0.5, 0.1],
                chengdu: [0.5, 0.1],
                jiangzhou: [0.5, 0.1],
                yongan: [0.5, 0.1],

                fuling: [0.4, 0.1],
                jianning: [0.4, 0.1],
                yunnan: [0.4, 0.1],
                yongchang: [0.4, 0.1],

                // xihe: [0.5, 0.1],
                // jinyang: [0.5, 0.1],
                // shangdang: [0.5, 0.1],

                changan: [0.4, 0.1],
                wan: [0.4, 0.1],
                shangyong: [0.4, 0.1],

                // luoyang: [0.5, 0.1],

                // ye: [0.5, 0.1],
                // zhongshan: [0.5, 0.1],
                // nanpi: [0.5, 0.1],

                // ji: [0.5, 0.1],
                // beiping: [0.5, 0.1],
                // liucheng: [0.5, 0.1],
                // xiangping: [0.5, 0.1],

                // pingyuan: [0.4, 0.1],
                // beihai: [0.4, 0.1],

                // puyang: [0.4, 0.1],
                // chenliu: [0.4, 0.1],

                xiapi: [0.5, 0.1],
                xiaopei: [0.5, 0.1],
                langya: [0.5, 0.1],
                guangling: [0.5, 0.1],

                shouchun: [0.4, 0.1],
                lujiang: [0.4, 0.1],

                xuchang: [0.5, 0.1],
                runan: [0.5, 0.1],

                xinye: [0.5, 0.1],
                xiangyang: [0.5, 0.1],
                jiangxia: [0.5, 0.1],
                jiangling: [0.5, 0.1],

                changsha: [0.4, 0.1],
                wuling: [0.4, 0.1],
                lingling: [0.4, 0.1],
                guiyang: [0.4, 0.1],

                jianye: [0.6, 0.1],
                wu: [0.6, 0.1],
                chaisang: [0.6, 0.1],
                kuaiji: [0.6, 0.1],
                jianan: [0.6, 0.1],
                luling: [0.6, 0.1],

                nanhai: [0.6,0.1],
                jiaozhi: [0.6,0.1],
                jiuzhen: [0.6,0.1],
            },
        },
        electricity: {
            abbr: 'R',
            reserves: {
                group_RedC: 10,
                group_MiyaFam: 5,
                group_ego: 5,
                group_xuyan: 10,
                group_xuefeng: 20,
                group_chaos: 10,
                group_NetEase: 20,
                group_chidori: 5,
                group_azhun: 10,
                group_bingtang: 5,
            },
            allocation: {
                hanzhong: [0.5, 0.1],
                zitong: [0.5, 0.1],
                chengdu: [0.5, 0.1],
                jiangzhou: [0.5, 0.1],
                yongan: [0.5, 0.1],

                fuling: [0.4, 0.1],
                jianning: [0.4, 0.1],
                yunnan: [0.4, 0.1],
                yongchang: [0.4, 0.1],

                changan: [0.4, 0.1],
                wan: [0.4, 0.1],
                shangyong: [0.4, 0.1],
                
                xiapi: [0.5, 0.1],
                xiaopei: [0.5, 0.1],
                langya: [0.5, 0.1],
                guangling: [0.5, 0.1],

                shouchun: [0.4, 0.1],
                lujiang: [0.4, 0.1],

                xuchang: [0.5, 0.1],
                runan: [0.5, 0.1],

                xinye: [0.5, 0.1],
                xiangyang: [0.5, 0.1],
                jiangxia: [0.5, 0.1],
                jiangling: [0.5, 0.1],

                changsha: [0.4, 0.1],
                wuling: [0.4, 0.1],
                lingling: [0.4, 0.1],
                guiyang: [0.4, 0.1],

                jianye: [0.6, 0.1],
                wu: [0.6, 0.1],
                chaisang: [0.6, 0.1],
                kuaiji: [0.6, 0.1],
                jianan: [0.6, 0.1],
                luling: [0.6, 0.1],

                nanhai: [0.6,0.1],
                jiaozhi: [0.6,0.1],
                jiuzhen: [0.6,0.1],
            },
        },

        // figure: '皮套',
        // voice: '音声',
        // cutting: '切片',
    }
}
export default {
    testDrama,
    global: {
        charas: <{ [key in string]: chara }>{
            //xuefeng
            xiaoxiayu: {
                ability: [7, 7, 8, 8, 5],
                characteristic: '虾皇',
                skills: ['讲堂'],
            },
            tianxixi: {
                ability: [8, 6, 10, 6, 4],
                characteristic: '龟龟',
                skills: ['主持'],
            },
            shenxiaoya: {
                ability: [7, 5, 11, 7, 9],
                characteristic: 'SMG',
                skills: ['记者'],
            },
            iiivan: {
                ability: [6, 8, 7, 7, 6],
                characteristic: '水龙',
                skills: ['联动'],
            },
            //RedC
            AmemachiF: {
                ability: [6, 8, 4, 7, 6],
                skills: ['杀手'],
            },
            Ahab: {
                ability: [8, 5, 7, 6, 7],
                skills: ['警探', '豪饮'],
            },
            mibai: {
                ability: [7, 7, 5, 6, 8],
                characteristic: '除魔',
                skills: [],
            },
            //azhun
            azhun: {
                ability: [6, 8, 7, 5, 6],
                characteristic: '天气预报',
                skills: ['主持'],
            },
            //NetEase
            zhongguobanai: {
                ability: [6, 6, 5, 8, 3],
                characteristic: '4号爱',
                skills: [],
            },
            Menherachan: {
                ability: [5, 7, 4, 9, 4],
                skills: ['日记'],
            },
            RIKO: {
                ability: [7, 6, 5, 6, 5],
                characteristic: '铁驭',
                skills: [],
            },
            YamaUsagi: {
                ability: [5, 5, 6, 4, 5],
                characteristic: '蛙蹈',
                skills: ['萌兔'],
            },
            //bingtang
            bingtang: {
                ability: [8, 9, 8, 7, 11],
                characteristic: 'DD头子',
                skills: ['联动', 'MMD'],
            },
            zhangjinghua: {
                ability: [9, 7, 10, 5, 8],
                characteristic: '集爱',
                skills: ['联动'],
            },
            Paryi: {
                ability: [7, 8, 6, 8, 5],
                characteristic: '萌兔x',
                skills: ['联动'],
            },
            //ego
            UsakiNono: {
                ability: [6, 5, 5, 9, 8],
                skills: ['萌兔'],
            },
            Rynia: {
                ability: [7, 6, 5, 7, 5],
                skills: ['歌姬'],
            },
            //chidori
            airuisi: {
                ability: [9, 9, 8, 8, 4],
                skills: ['偶像'],
            },
            aibaiVer1: {
                name: '艾白【1.0】',
                ability: [4, 7, 6, 4, 5],
                skills: ['电竞'],
            },
            wenjingVer1: {
                name: '文静【1.0】',
                ability: [5, 6, 5, 4, 3],
                skills: ['电竞'],
            },
            //chaos
            Zaodaoji: {
                ability: [9, 9, 8, 8, 4],
                characteristic: '纯白恶魔',
                skills: ['偶像'],
            },
            ByakuyaMayoi: {
                ability: [4, 7, 5, 6, 5],
                skills: [],
            },
            Niuniuzi: {
                ability: [5, 6, 3, 4, 5],
                skills: [],
            },
            Mamoru: {
                ability: [8, 7, 6, 5, 6],
                skills: [],
            },
            //MiyaFam
            Miya: {
                ability: [5, 7, 7, 10, 3],
                skills: ['神官'],
            },
            MomoiMonaka: {
                ability: [7, 5, 8, 7, 5],
                skills: ['异色'],
            },
        }
    }
}