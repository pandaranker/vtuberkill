
/**绘制固定坐标的六边形路径，返回六边形实际（左上角）坐标 */
function hexagonal(ctx, begin, zoom, angle = [0, 7]) {
    begin = [(begin[0] + 1) * 560 * zoom, (begin[1] + 1) * 485 * zoom]
    let line = [[280, 0], [0, 160], [0, 485], [280, 645], [560, 485], [560, 160], [280, 0], [0, 160], [0, 485]]
    line = line.slice(...angle)
    ctx.moveTo(begin[0] + line[0][0] * zoom, begin[1] + line[0][1] * zoom);
    let end = begin.slice(0)
    for (let v of line.slice(1)) {
        end = [begin[0] + v[0] * zoom, begin[1] + v[1] * zoom]
        ctx.lineTo(...end);
    }
    return { begin, end }
}
function hexLine(ctx, begin, zoom, angle) {
    let dist = 325 * zoom
    let dig = Math.PI / 3;
    let x = dist * Math.sin(angle * dig);
    let y = dist * -Math.cos(angle * dig);
    ctx.lineTo(begin[0] + x, begin[1] + y);
    return [begin[0] + x, begin[1] + y]
}
function hexToRgba(hex, opacity, deviate) {
    let r = parseInt('0x' + hex.slice(1, 3)), g = parseInt('0x' + hex.slice(3, 5)), b = parseInt('0x' + hex.slice(5, 7))
    if (deviate) {
        let d = deviate
        let p = n => Math.max(0, n)
        r += d[0]
        g += d[1]
        b += d[2]
        r = p(r); g = p(g); b = p(b)
    }
    return `rgba(${r},${g},${b},${opacity})`;
}
class City {
    // static cityId = 0;
    blocks = []
    constructor(name, pos, config = {}) {
        this.id = ("000" + ++City.cityId).slice(-3);
        this.name = name;
        this.pos = pos;
        this.level = config.level || 0;
        this.region = config.region;
        this.shape = config.shape;
        this.color = config.color;
        let shape = this.shape
        if (shape) {
            if (typeof shape[0] === 'number') {
                for (let i = 1; i < shape.length; i++) {
                    let sy = i - 1 + shape[0]
                    let sx = shape[i]
                    if (sx instanceof Array) {
                        if (sx[0] instanceof Array) {
                            for (let s of sx) {
                                this.addBlocks(s, sy)
                            }
                        } else {
                            this.addBlocks(sx, sy)
                        }
                    } else {
                        this.addBlocks(sx, sy)
                    }
                }
            }
            else if (shape.length) {
                for (let s of shape) {
                    this.addBlocks(s[0], s[1])
                }
            }
        }
        else {
            this.addBlocks(0, 0)
            this.addBlocks([0, 1], -1)
        }
    }
    addBlocks(xs, y) {
        if (xs instanceof Array) {
            for (let x = xs[0]; x <= xs[1]; x++) {
                this.addBlock(x, y)
            }
        } else {
            this.addBlock(xs, y)
        }
    }
    addBlock(x, y) {
        let center = (x === 0 && y === 0) || (x === 0 && y === -1) || (x === 1 && y === -1)
        this.blocks.push(new Block([this.pos[0] + x / 2 + y / 4, this.pos[1] + y / 2], {
            type: center ? 'cityCenter' : 'city',
            city:this,
            cityId: this.cityId,
        }))
    }
    drawMap(ctx, size, zoom) {
        ctx.font = "36px Arial";
        ctx.strokeStyle = "rgba(0, 10, 255, 0.5)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        let xy = size[0].slice(0)
        let c = this
        let pos = c.pos.slice(0)
        if (xy[0] < pos[0]
            && pos[0] < size[1][0]
            && xy[1] < pos[1]
            && pos[1] < size[1][1]) {
            ctx.stroke();
            ctx.save()
            ctx.fillStyle = c.color ? hexToRgba(c.color, 0.5) : "rgba(200, 10, 200, 0.5)";
            ctx.fill()
            ctx.beginPath()
            ctx.restore()

            let blocks = c.blocks.slice(0)
            for (let b of blocks) {
                b.drawMap(ctx, size, zoom)
            }
            let coord = [(pos[0] - size[0][0]) * 2, [pos[1] - size[0][1]] * 2]
            let coord2 = hexagonal(ctx, coord, zoom).begin
            ctx.save()
            ctx.fillStyle = c.color ? hexToRgba(c.color, 0.9) : "rgba(150, 50, 255, 0.9)";
            ctx.fillText(translation.citys[c.name], coord2[0] - 20, coord2[1] + 20);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;
            ctx.strokeText(translation.citys[c.name], coord2[0] - 20, coord2[1] + 20);
            ctx.restore()
            
            c.tempCoord = coord2
        }
        else {
            return false
        }
    }
}
City.cityId = 0
class Mount {
    constructor(name, pos, config = {}) {
        this.id = ("000" + ++Mount.mountId).slice(-3);
        this.name = name;
        this.pos = pos;
        this.shape = config.shape;
        this.color = config.color;
    }
}
Mount.mountId = 0
class Block {
    constructor(pos, config = {}) {
        this.id = ("0000" + ++Block.blockId).slice(-4);
        this.name = name;
        this.pos = pos;
        this.level = config.level || 0;
        this.type = config.type;
        this.city = config.city;
        this.cityId = config.cityId;
    }
    drawMap(ctx, size, zoom) {
        ctx.font = "36px Arial";
        ctx.strokeStyle = "rgba(0, 10, 255, 0.5)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        let pos = this.pos.slice(0)
        if (pos[0] > size[0][0]
            && pos[0] < size[1][0]
            && pos[1] > size[0][1]
            && pos[1] < size[1][1]) {
            let coord = [(pos[0] - size[0][0]) * 2, [pos[1] - size[0][1]] * 2]
            let c = this.city
            let opacity = this.type==='cityCenter'?0.9:0.3
            hexagonal(ctx, coord, zoom)
            ctx.stroke();
            ctx.save()
            ctx.fillStyle = c.color ? hexToRgba(c.color, opacity) : `rgba(150, 50, 255, ${opacity})`;
            ctx.fill()
            ctx.beginPath()
            ctx.restore()
        }
    }
}
Block.blockId = 0
let translation = {
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
                -3, 1, [[-3, 2]], [[-5, 2]], [[-5, 1]], [[-6, 2]], [[-8, 0]]
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
                -2, [[-2, 1], [4, 9]], [[-5, 7]], [[-8, 4]], [[-8, -4]]
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
    translation
}