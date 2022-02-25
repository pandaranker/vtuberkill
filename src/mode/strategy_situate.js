
class City {
    // static cityId = 0;
    constructor(name, pos, config = {}) {
        this.id = ("000" + ++City.cityId).slice(-3);
        this.name = name;
        this.pos = pos;
        this.level = config.level || 0;
        this.region = config.region;
        this.shape = config.shape;
        this.color = config.color;
    }
}
City.cityId = 0
class Mount {
    constructor(name, pos, config = {}) {
        this.id = ("000" + ++City.cityId).slice(-3);
        this.name = name;
        this.pos = pos;
        this.level = config.level || 0;
        this.shape = config.shape;
        this.color = config.color;
    }
}
module.exports = {
    citys: [
        new City("longxi", [0, 10], { level: 2 }),
        new City("wuwei", [1, 6], { level: 4 }),
        new City("tianshui", [2, 11], { level: 3 }),
        new City("anding", [4, 8], { level: 1 }),
        new City("beidi", [5, 6], { level: 2 }),

        new City("hanzhong", [6, 14], { level: 3 }),
        new City("zitong", [5, 17], { level: 1 }),
        new City("chengdu", [2, 20], { level: 6 }),
        new City("jiangzhou", [6, 22], { level: 2 }),
        new City("yongan", [10, 20], { level: 1 }),

        new City("fuling", [8, 23], {}),
        new City("jianning", [5, 17], { level: 2 }),
        new City("yunnan", [3, 28], { level: 1 }),
        new City("yongchang", [1, 29], {}),

        new City("xihe", [10, 6], { level: 2 }),
        new City("jinyang", [12, 6], { level: 3 }),

        new City("changan", [8, 11], { level: 8 }),
        new City("wan", [12, 14], { level: 4 }),
        new City("shangyong", [10, 15], { level: 2 }),

        new City("luoyang", [12, 11], { level: 8 }),

        new City("ye", [15, 7], { level: 6 }),
        new City("nanpi", [19, 5], { level: 2 }),

        new City("ji", [17, 3], { level: 1 }),
        new City("beiping", [20, 3], { level: 4 }),
        new City("liucheng", [22, 2], {}),
        new City("xiangping", [24, 3], { level: 3 }),

        new City("pingyuan", [19, 8], { level: 2 }),
        new City("beihai", [23, 7], { level: 4 }),

        new City("puyang", [17, 10], { level: 2 }),
        new City("chenliu", [16, 12], { level: 3 }),

        new City("xiapi", [22, 13], { level: 5 }),
        new City("xiaopei", [20, 12], { level: 2 }),
        new City("langya", [21, 10], { level: 3 }),

        new City("shouchun", [19, 15], { level: 5 }),
        new City("lujiang", [21, 18], { level: 2 }),

        new City("xuchang", [15, 14], { level: 4 }),
        new City("runan", [17, 16], { level: 3 }),

        new City("xinye", [14, 17], { level: 2 }),
        new City("xiangyang", [13, 19], { level: 6 }),
        new City("jiangxia", [17, 19], { level: 4 }),
        new City("jiangling", [14, 22], { level: 3 }),

        new City("changsha", [16, 24], {
            level: 3, color: '#448800', shape: [
                -2, [1, 3], [-1, 3], [-3, 4], [-4, 3], [-4, 3], [1, 2]
            ]
        }),
        new City("wuling", [12, 23], { level: 2 }),
        new City("lingling", [13, 26], {
            color: '#008844', shape: [
                -3,1, [[-3, 2]], [[-5, 2]], [[-5, 1]], [[-6, 2]], [[-7, 0]]
            ]
        }),
        new City("guiyang", [15, 26], {
            level: 1, color: '#008877', shape: [
                -1, [[0, 4]], [[-1, 6]], [[-1, 5]], [[-3, -1], [4, 5]]
            ]
        }),

        new City("jianye", [24, 17], { level: 8 }),
        new City("wu", [25, 20], { level: 6 }),
        new City("kuaiji", [25, 23], { level: 3 }),
        new City("jianan", [22, 25], { level: 3 }),
        new City("luling", [20, 25], {
            level: 2, color: '#aa6622', shape: [
                -1, [[0, 1]], [[-1, 1]], [[-2, 1]], [[-4, 0]], [[-5, -1]]
            ]
        }),

        new City("nanhai", [17, 28], {
            level: 8, color: '#3311dd', shape: [
                -2, [[-1, 1], [4, 9]], [[-6, 7]], [[-8, 4]], [[-8, -4]]
            ]
        }),
        new City("jiaozhi", [11, 29], {
            level: 3, color: '#8800aa', shape: [
                -3, [[1, 3]], [[-2, 4]], [[-3, 4]], [[-5, 1]], [[-4, -1]], -4
            ]
        }),
        new City("jiuzhen", [9, 32], {
            level: 4, color: '#aa2266', shape: [
                [[0, 2], -5], [[0, 2], -4], [[0, 2], -3], [[0, 1], -2], [[-1, 1], 0], [[-1, 1], 1], [[-1, 0], 2]
            ]
        }),
        new City("rinan", [10, 35], { level: 1 }),

        new City("taibei", [28, 23], { level: 6 }),
        new City("taizhong", [28, 25], { level: 3 }),
    ],
    translation: {
        citys: {
            longxi: '陇西',
            wuwei: '武威',
            tianshui: '天水',
            anding: '安定',
            beidi: '北地',

            hanzhong: '汉中',
            zitong: '梓潼',
            chengdu: '成都',
            jiangzhou: '江州',
            yongan: '永安',

            fuling: '涪陵',
            jianning: '建宁',
            yunnan: '云南',
            yongchang: '永昌',

            xihe: '西河',
            jinyang: '晋阳',

            changan: '长安',
            wan: '宛',
            shangyong: '上庸',

            luoyang: '洛阳',

            ye: '邺',
            nanpi: '南皮',

            ji: '蓟',
            beiping: '北平',
            liucheng: '柳城',
            xiangping: '襄平',

            pingyuan: '平原',
            beihai: '北海',

            puyang: '濮阳',
            chenliu: '陈留',

            xiapi: '下邳',
            xiaopei: '小沛',
            langya: '琅琊',

            shouchun: '寿春',
            lujiang: '庐江',

            xuchang: '许昌',
            runan: '汝南',

            xinye: '新野',
            xiangyang: '襄阳',
            jiangxia: '江夏',
            jiangling: '江陵',

            changsha: '长沙',
            wuling: '武陵',
            lingling: '零陵',
            guiyang: '贵阳',

            jianye: '建业',
            wu: '吴',
            kuaiji: '会稽',
            jianan: '建安',
            luling: '庐陵',

            nanhai: '南海',
            jiaozhi: '交趾',
            jiuzhen: '九真',
            rinan: '日南',

            taibei: '台北',
            taizhong: '台中',
        },
        lands: {
            Mt: '山峦',
            Gb: '戈壁',
            Pl: '平原',
            Hl: '丘陵',
            Rv: '河流',
            Se: '海洋',
        }
    }
}