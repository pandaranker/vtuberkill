/**
 * strategy_situate 地图相关
 */

import { timeLog } from "console";

/**
 * 绘制固定坐标的六边形路径，返回六边形实际（左上角）坐标
 * @param {*} ctx 
 * @param {*} begin 起始坐标（在六边形网格上）
 * @param {*} zoom 缩放比例
 * @param {*} angle 角度（起始角度和终止角度）
 * @returns 
 */
function hexagonal(ctx = context.curCtx, begin: posType, zoom = context.curZoom, angle = [0, 6]) {
    begin = [(begin[0] + 1) * 560 * zoom, (begin[1] + 1) * 485 * zoom]
    let center = [280, 325]
    let dist = 325
    let dig = Math.PI / 3;
    let line = []
    for (let a = angle[0]; a <= angle[1]; a++) {
        line.push([center[0] + dist * Math.sin(a * dig), center[1] - dist * Math.cos(a * dig)])
    }
    ctx.moveTo(begin[0] + line[0][0] * zoom, begin[1] + line[0][1] * zoom);
    let end: posType = [...begin]
    for (let v of line.slice(1)) {
        end = [begin[0] + v[0] * zoom, begin[1] + v[1] * zoom]
        ctx.lineTo(...end);
    }
    return { begin, center, end }
}
/**
 * 绘制固定坐标的六边环形路径，返回六边形实际（左上角）坐标
 * @param {*} ctx 
 * @param {*} begin 起始坐标（在六边形网格上）
 * @param {*} zoom 缩放比例
 * @param {*} direction 方向（数组）
 * @param {*} serif 是否有端点三角形，默认有
 * @returns 
 */
function hexAnnulus(ctx, begin, zoom, direction, serif = true) {
    begin = [(begin[0] + 1) * 560 * zoom, (begin[1] + 1) * 485 * zoom]
    let center = [280, 325], dist = 325
    let dig = Math.PI / 3, map = ['0.25,-0.5', '0.5,0', '0.25,0.5', '-0.25,0.5', '-0.5,0', '-0.25,-0.5'],
        drcts = direction.map(d => {
            return map.indexOf(d.join(","))
        })
    function AddLine(line, a, dist) {
        line.push([center[0] + dist * Math.sin(a * dig), center[1] - dist * Math.cos(a * dig)])
    }
    for (let drct of drcts) {
        let line = []
        AddLine(line, drct, dist)
        AddLine(line, drct + 1, dist)
        if (serif) {
            AddLine(line, drct + 1.25, dist * Math.cos(0.5 * dig) / Math.cos(0.25 * dig))
            AddLine(line, drct - 0.25, dist * Math.cos(0.5 * dig) / Math.cos(0.25 * dig))
        }
        else {
            AddLine(line, drct + 1, dist * 0.8)
            AddLine(line, drct, dist * 0.8)
        }
        ctx.moveTo(begin[0] + line[0][0] * zoom, begin[1] + line[0][1] * zoom);
        for (let v of line.slice(1)) {
            ctx.lineTo(begin[0] + v[0] * zoom, begin[1] + v[1] * zoom);
        }
        ctx.closePath()
    }
    return { begin, drcts }
}
/**
 * 转换颜色至RGBA
 * @param hex 16进制RGB颜色
 * @param opacity 透明度
 * @param deviate 偏差值
 * @returns 
 */
function hexToRgba(hex: string, opacity: number, deviate?: [number, number, number]) {
    if (hex.indexOf('#') !== 0) return hex
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
type shapeType = Array<number | (number | number[])[]>
type posType = [number, number]
type areaType = { level?: number, color?: string, shape?: shapeType }
type blockType = { level?: number, type?: string, cityId?: string, area?: Area }
/**
 * Area 地域
 */
class Pos {
    id: string
    pos: posType
    constructor(pos: posType) {
        this.pos = pos
    }
    inSize(size = context.curSize) {
        let pos = this.pos.slice(0)
        return size[0][0] < pos[0]
            && pos[0] < size[1][0]
            && size[0][1] < pos[1]
            && pos[1] < size[1][1]
    }
}
class Area extends Pos {
    blocks: Array<Block>
    name: string
    color?: string
    shape?: shapeType
    constructor(pos: posType) {
        super(pos)
        this.blocks = []
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
    addShape(shape) {
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
    tempCoord(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom) {
        let pos = this.pos.slice(0)
        let coord: posType = [(pos[0] - size[0][0]) * 2, (pos[1] - size[0][1]) * 2]
        ctx.beginPath()
        let coord2 = hexagonal(ctx, coord, zoom).begin
        ctx.beginPath()
        return coord2
    }
    addBlock(...args) { }
    drawMap(...args) { }

    get region(): false | Region {
        for (let v of regions) {
            if (v.areas.includes(this)) {
                return v
            }
        }
        return false
    }
    set region(reg: false | string | Region) {
        for (let v of regions) {
            if (v.areas.includes(this)) {
                v.areas.remove(this)
            }
        }
        if (reg instanceof Region) {
            reg.areas.push(this)
        }
        else {
            for (let v of regions) {
                if (v.name === reg) {
                    v.areas.push(this)
                }
            }
        }
    }
    get faction(): false | Faction {
        for (let v of factions) {
            if (v.areas.includes(this)) return v
        }
        return false
    }
    set faction(fact: false | string | Faction) {
        for (let v of factions) {
            if (v.areas.includes(this)) {
                v.areas.remove(this)
            }
        }
        if (fact instanceof Region) {
            fact.areas.push(this)
        }
        else {
            for (let v of factions) {
                if (v.name == fact) {
                    v.areas.push(this)
                }
            }
        }
    }
}
/**
 * City 城市
 */
class City extends Area {
    static cityId: number
    level: number
    resource: Record<Resource['name'], number>
    constructor(name: string, pos: posType, config: areaType = {}) {
        super(pos)
        this.id = ("000" + ++City.cityId).slice(-3);
        this.name = name;
        this.level = config.level || 0;
        this.shape = config.shape;
        this.color = config.color;

        if (this.shape) {
            this.addShape(this.shape)
        }
        else {
            this.addBlocks(0, 0)
            this.addBlocks([0, 1], -1)
        }
    }
    drawBorder(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom) {
        let c = this
        let blocks = c.blocks.slice(0)
        for (let b of blocks) {
            let pos = b.pos
            if (b.inSize) {
                let direction = b.getAdjoinBlock((x, y) => x.cityId !== y.cityId).direction
                if (direction.length) {
                    let coord = [(pos[0] - size[0][0]) * 2, (pos[1] - size[0][1]) * 2]
                    hexAnnulus(ctx, coord, zoom, direction)
                }
            }
        }
        let opacity = 0.5
        ctx.save()
        ctx.fillStyle = c.color ? hexToRgba(c.color, opacity, [-20, -20, -20]) : `rgba(150, 50, 255, ${opacity})`;
        ctx.fill()
        ctx.beginPath()
        ctx.restore()
    }
    addBlock(x: number, y: number) {
        let center = (x === 0 && y === 0) || (x === 0 && y === -1) || (x === 1 && y === -1)
        this.blocks.push(new Block([this.pos[0] + x / 2 + y / 4, this.pos[1] + y / 2], {
            type: center ? 'cityCenter' : 'city',
            area: this,
            cityId: this.id,
        }))
    }
    drawMap(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom, config: anyObject = {}) {
        let c = this
        if (this.inSize()) {
            ctx.beginPath()

            ctx.save()
            let blocks = c.blocks.slice(0)
            for (let b of blocks) {
                b.drawMap(ctx, size, zoom)
            }
            if (config.hiddenBorder !== true) {
                c.drawBorder(ctx, size, zoom)
            }
            ctx.restore()

            if (config.hiddenName !== true) {
                c.drawName(ctx, size, zoom, config.hiddenName > 0 ? config.hiddenName : 0.85)
            }
        }
        else {
            return false
        }
    }
    drawName(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom, opacity: number) {
        let c = this
        if (this.inSize()) {
            let coord2 = this.tempCoord()
            ctx.save()
            ctx.fillStyle = c.color ? hexToRgba(c.color, opacity) : "rgba(150, 50, 255, 0.9)";
            let nameText = translation.citys[c.name] || c.name
            let fontSize = 6 + 500 * zoom
            let fontFamily = "'hyk2gj',Arial"
            if (nameText.length <= 1) {
                fontSize += 5
            }
            if (nameText.length <= 2) {
                fontSize += 5
            }
            ctx.font = `${fontSize}px ${fontFamily}`
            ctx.fillText(nameText, coord2[0] + 300 * zoom, coord2[1] + 300 * zoom);
            ctx.strokeStyle = "rgba(0, 10, 255, 1)";
            ctx.shadowBlur = 10;
            ctx.lineWidth = 1;
            ctx.lineJoin = "round";
            ctx.shadowColor = ctx.fillStyle;
            ctx.strokeText(nameText, coord2[0] + 300 * zoom, coord2[1] + 300 * zoom);
            ctx.beginPath()
            ctx.restore()
        }
    }
}
City.cityId = 0
/**
 * Mount 山脉
 */
class Mount extends Area {
    static mountId: number
    constructor(name: string, pos: posType, config: areaType = {}) {
        super(pos)
        this.id = ("000" + ++Mount.mountId).slice(-3);
        this.name = name;
        this.shape = config.shape;
        this.color = config.color || '#333333';

        if (this.shape) {
            this.addShape(this.shape)
        }
    }
    addBlock(x, y) {
        this.blocks.push(new Block([this.pos[0] + x / 2 + y / 4, this.pos[1] + y / 2], {
            type: 'mount',
            area: this
        }))
    }
    drawMap(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom) {
        let m = this
        if (m.inSize()) {
            ctx.beginPath()

            let blocks = m.blocks.slice(0)
            for (let b of blocks) {
                b.drawMap(ctx, size, zoom, false)
            }
        }
        else {
            return false
        }
    }
}
Mount.mountId = 0
type adjoinsType = { left, right, leftup, rightup, leftdown, rightdown }
/**
 * Block 地块
 */
class Block extends Pos {
    static blockId: number
    pos: posType
    level: number
    type?: string
    cityId?: string
    area?: Area
    adjoins?: adjoinsType
    constructor(pos: posType, config: blockType = {}) {
        super(pos)
        this.id = ("00000" + ++Block.blockId).slice(-5);
        this.pos = pos;
        this.level = config.level || 0;
        this.type = config.type;
        this.area = config.area;
        this.cityId = config.cityId;
        let adjoins = <adjoinsType>{
            right: [0.5, 0],
            left: [-0.5, 0],
            rightup: [0.25, -0.5],
            leftup: [-0.25, -0.5],
            rightdown: [0.25, 0.5],
            leftdown: [-0.25, 0.5],
        }
        let reserveMap = {
            right: 'left',
            left: 'right',
            rightup: 'leftdown',
            leftdown: 'rightup',
            rightdown: 'leftup',
            leftup: 'rightdown',
        }
        for (let b of blocks) {
            let bpos = b.pos
            for (let v in adjoins) {
                if (adjoins[v] instanceof Array) {
                    if (bpos[0] - pos[0] === adjoins[v][0] && bpos[1] - pos[1] === adjoins[v][1]) {
                        adjoins[v] = b
                        b.adjoins[reserveMap[v]] = this
                    }
                }
            }
        }
        this.adjoins = adjoins
        blocks.push(this)
    }
    drawMap(ctx = context.curCtx, size: [posType, posType], zoom: number, stroke = true) {
        ctx.strokeStyle = `rgba(0, 10, 255, ${(Math.min(0.06 - zoom) * 0.5, 0.8)})`;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        if (zoom <= 0.03) stroke = false
        if (this.inSize()) {
            let pos = this.pos.slice(0)
            let coord: posType = [(pos[0] - size[0][0]) * 2, (pos[1] - size[0][1]) * 2]
            let area = this.area
            let opacity = 0.55
            if (this.cityId) {
                opacity = this.type === 'cityCenter' ? 0.5 : 0.4
            }
            hexagonal(ctx, coord, zoom)
            if (stroke) {
                ctx.stroke();
            }
            ctx.save()
            if (this.cityId && data.map_status) {
                switch (data.map_status) {
                    case '城市':
                        ctx.fillStyle = area.color ? hexToRgba(area.color, opacity) : `rgba(150, 50, 255, ${opacity})`;
                        break;
                    case '势力': case '外交':
                        ctx.fillStyle = area.faction ? hexToRgba(area.faction.color, opacity) : `rgba(55, 55, 65, 0.4)`;
                        break;
                    case '省区':
                        ctx.fillStyle = area.region ? hexToRgba(area.region.color, opacity) : `rgba(150, 50, 255, ${opacity})`;
                        break;
                }
            }
            else {
                ctx.fillStyle = area.color ? hexToRgba(area.color, opacity) : `rgba(150, 50, 255, ${opacity})`;
            }
            ctx.fill()
            ctx.beginPath()
            ctx.restore()
        }
    }
    getAdjoinBlock(filter: ((x: Block, y: Block) => boolean)) {
        let pos = this.pos
        let direction = []
        let reserve = []
        let adjoins = this.adjoins
        for (let a in adjoins) {
            if (adjoins[a] instanceof Block) {
                let apos = adjoins[a].pos
                if (!filter(this, adjoins[a])) {
                    reserve.push([apos[0] - pos[0], apos[1] - pos[1]])
                }
                else {
                    direction.push([apos[0] - pos[0], apos[1] - pos[1]])
                }
            }
            else if (adjoins[a] instanceof Array) {
                reserve.push([...adjoins[a]])
            }
        }
        return { adjoins, direction, reserve }
    }
}
Block.blockId = 0
class Areas {
    id: string
    name: string
    color: string
    areas: Area[]
    citys: City[]
    constructor(name) {
        this.name = name
    }
    updateAreas() {
        this.areas = this.citys.slice(0)
    }
    areasInSize() {
        return this.areas.filter(a => a.inSize())
    }
    drawAreas(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom, config?: anyObject) {
        ctx.save()
        for (let a of this.areasInSize()) {
            a.drawMap(ctx, size, zoom, config)
        }
        ctx.restore()
    }
    drawName(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom) {
        let as = this
        if (as.areasInSize().length) {
            let coord2 = as.tempCoord()
            ctx.save()
            ctx.fillStyle = as.color ? hexToRgba(as.color, 0.9) : "rgba(150, 50, 255, 1)";
            let nameText = translation.factions[as.name] || as.name
            let fontSize = 6 + 500 * zoom
            let fontFamily = "'hyk2gj',Arial"
            if (nameText.length <= 2) {
                fontSize += 5
            }
            if (nameText.length <= 4) {
                fontSize += 5
            }
            if (nameText.length <= 7) {
                fontSize += 9
            }
            else if (nameText.length <= 10) {
                fontSize += 4
            }
            if (as.citys.length >= 4) {
                fontSize += 5
            }
            if (as.citys.length >= 6) {
                fontSize += 10
            }
            ctx.font = `${fontSize}px ${fontFamily}`
            ctx.fillText(nameText, coord2[0] + 300 * zoom, coord2[1] + 300 * zoom);
            ctx.strokeStyle = "rgba(0, 10, 255, 1)";
            ctx.shadowBlur = 10;
            ctx.lineWidth = 1;
            ctx.lineJoin = "round";
            ctx.shadowColor = ctx.fillStyle;
            ctx.strokeText(nameText, coord2[0] + 300 * zoom, coord2[1] + 300 * zoom);
            ctx.beginPath()
            ctx.restore()
        }
    }
    tempCoord() {
        let areasInSize = this.areasInSize()
        if (areasInSize.length === 1) {
            return areasInSize[0].tempCoord()
        }
        if (areasInSize.length > 1) {
            let areaTempCoord = []
            for (let a of areasInSize) {
                areaTempCoord.push(a.tempCoord())
            }
            let temp: posType = [0, 0]
            for (let v of areaTempCoord) {
                temp = [temp[0] + v[0], temp[1] + v[1]]
            }
            temp[0] /= areaTempCoord.length
            temp[1] /= areaTempCoord.length
            return temp
        }
        return false
    }
}
/**
 * Region 省区
 */
class Region extends Areas {
    static regionId: number
    level?: number
    constructor(name: string, citynames: string[], info: { config: anyObject }) {
        super(name)
        this.id = ("000" + ++Region.regionId).slice(-3);
        this.citys = citys.filter(city => citynames.includes(city.name))
        this.color = info.config.color
        this.updateAreas()
    }
    drawMap(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom, config?: anyObject) {
        let r = this
        if (r.areasInSize().length) {
            let config: anyObject = { hiddenName: true }
            // if (data.map_status === '省区') config.hiddenBorder = true
            r.drawAreas(ctx, size, zoom, config)
        }
        else {
            return false
        }
    }
}
Region.regionId = 0
/**
 * Faction 势力
 */
class Faction extends Areas {
    static factionId: number
    resource: Record<Resource['name'], number>
    constructor(name: string, citynames: string[], info: { chara?: anyObject, config: anyObject }) {
        super(name)
        this.id = ("000" + ++Faction.factionId).slice(-3);
        this.citys = citys.filter(city => citynames.includes(city.name))
        this.color = info.config.color
        this.updateAreas()
    }
    drawMap(ctx = context.curCtx, size = context.curSize, zoom = context.curZoom, config?: anyObject) {
        let f = this
        if (f.areasInSize().length) {
            let config: anyObject = { hiddenName: true }
            if (data.map_status === '外交') config.hiddenBorder = true
            f.drawAreas(ctx, size, zoom, config)
        }
        else {
            return false
        }
    }
    MapHighlight(ctx = context.tempCtx, size = context.curSize, zoom = context.curZoom, config?: anyObject) {
        let f = this
        let blocks = []
        for (let a of f.areasInSize()) {
            blocks = [...blocks, ...a.blocks]
        }
        for (let b of blocks) {
            let pos = b.pos
            if (b.inSize) {
                let direction = b.getAdjoinBlock((x, y) => x.area?.faction === y.area?.faction).reserve
                if (direction.length) {
                    let coord = [(pos[0] - size[0][0]) * 2, (pos[1] - size[0][1]) * 2]
                    hexAnnulus(ctx, coord, zoom, direction)
                }
            }
        }
        let opacity = 1
        ctx.save()
        ctx.globalCompositeOperation = 'xor';
        ctx.shadowBlur = 10;
        ctx.shadowColor = hexToRgba(f.color, 1, [-30, -30, -30]);
        ctx.fillStyle = hexToRgba(f.color, opacity, [30, 30, 30]);
        ctx.fill()
        ctx.beginPath()
        ctx.restore()
    }
    showInformation(ctx = context.tempCtx, size = context.curSize, zoom = context.curZoom, config?: anyObject) {
        let f = this
        if (f.areasInSize().length) {
            let coord2 = f.tempCoord()
            ctx.save()
            ctx.globalCompositeOperation = 'xor';
            ctx.shadowBlur = 10;
            ctx.shadowColor = hexToRgba(f.color, 1, [-30, -30, -30]);
            ctx.fillStyle = hexToRgba(f.color, 1);
            let infoText = config.text || ''
            let fontSize = 6 + 300 * zoom
            let fontFamily = "'hyk2gj',Arial"
            ctx.font = `${fontSize}px ${fontFamily}`
            ctx.fillText(infoText, coord2[0] + 310 * zoom, coord2[1] + 330 * zoom);
            ctx.beginPath()
            ctx.restore()
        }
    }
}
Faction.factionId = 0
/**
 * Clan 氏族|派系
 */
class Clan {
    static clanId: number
    name: string
    factions: Faction[]
    constructor(name: string, factions: Faction[], info: anyObject) {
        this.name = name
        this.factions = factions
    }
}
Clan.clanId = 0
class Resource {
    static resourceId: number
    name: string
    abbreviation: `${string[1]}`
    dispersion: 'city' | 'faction'
    allocation: Record<City['name'] | Faction['name'], [number, number]>
    container: 'city' | 'faction'
    reserves: Record<City['name'] | Faction['name'], number>
    constructor(name: string, allocat: Record<City['name'] | Faction['name'], [number] | [number, number]>, info: anyObject = { reserves: {} }) {
        this.name = name
        for (let v in allocat) {
            if (!this.dispersion) {
                factions.some(f => {
                    if (f.name === v) {
                        this.dispersion = 'faction'
                        return true
                    }
                })
                citys.some(c => {
                    if (c.name === v) {
                        this.dispersion = 'city'
                        return true
                    }
                })
            }
            if (allocat[v].length === 1) {
                allocat[v][1] = 0
            }
        }
        this.allocation = allocat as Record<City['name'] | Faction['name'], [number, number]>
        this.reserves = info.reserves
        for (let v of Object.keys(this.reserves)) {
            if (!this.container) {
                factions.some(f => {
                    if (f.name === v) {
                        this.container = 'faction'
                        return true
                    }
                })
                citys.some(c => {
                    if (c.name === v) {
                        this.container = 'city'
                        return true
                    }
                })
            }
            else break;
        }
        this.setReserves()
        this.updateReserves()
    }
    addReserves(containerName: City['name'] | Faction['name'], reserve: number) {
        this.reserves[containerName] = reserve
        this.setReserves()
    }
    setReserves(containers?: City[] | Faction[]) {
        if (this.container === 'faction') {
            containers = factions
        }
        else if (this.container === 'city') {
            containers = citys
        }
        for (let cont of containers) {
            cont.resource[this.abbreviation] = this.reserves[cont.name] || 0
        }
    }
    updateReserves(containers?: City[] | Faction[]) {
        if (this.container === 'faction') {
            containers = factions
        }
        else if (this.container === 'city') {
            containers = citys
        }
        for (let cont of containers) {
            this.reserves[cont.name] = cont.resource[this.abbreviation]
        }
    }
    cityHarvest(factionName: Faction['name']) {
        let curc = citys.find(c => c.name === factionName)
        let harvest = 0
        if (this.dispersion === 'city') {
            harvest += this.allocation[curc.name][0]
        }
        else if (this.dispersion === 'faction') {
            factions.some(f => {
                if (f.citys.includes(curc)) {
                    harvest += this.allocation[f.name][0]
                    return true;
                }
            })
        }
        this.reserves[curc.name] += harvest
    }
    factionHarvest(factionName: Faction['name']) {
        let curf = factions.find(f => f.name === factionName)
        let harvest = 0
        if (this.dispersion === 'city') {
            citys.forEach(c => {
                if (curf.citys.includes(c)) {
                    harvest += this.allocation[c.name][0]
                }
            })
        }
        else if (this.dispersion === 'faction') {
            harvest += this.allocation[curf.name][0]
        }
        this.reserves[curf.name] += harvest
        if(context.tempCtx){
            curf.showInformation(context.tempCtx, context.curSize, context.curZoom, {
                text: `${translation.resource[this.name]}${this.abbreviation}${harvest > 0 ? '增加' : '减少'}了${harvest}`
            })
            if (data.timeRecord) {
                clearTimeout(data.timeRecord)
                control.tempClear()
            }
            data.timeRecord = setTimeout(() => {
                control.tempClear()
            }, 2000)
        }
    }
    harvest() {
        if (this.container === 'faction') {
            for (let f of factions) {
                this.factionHarvest(f.name)
            }
        }
        else if (this.container === 'city') {
            for (let f of factions) {
                this.factionHarvest(f.name)
            }
        }
        this.updateReserves()
    }
    naturalGrowth() {
        for (let v in this.allocation) {
            let singleAlloc = this.allocation[v]
            singleAlloc[0] += singleAlloc[1]
        }
    }
    mouthNext() {
        this.harvest()
        this.naturalGrowth()
    }
}
Resource.resourceId = 0
const blocks = []
const translation = {
    citys: <stringObejct>{
        longxi: '陇西',
        wuwei: '武威',
        tianshui: '天水',
        anding: '安定',

        shuofang: '朔方',
        wuyuan: '五原',

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
        shangdang: '上党',

        changan: '长安',
        wan: '宛',
        shangyong: '上庸',

        luoyang: '洛阳',

        ye: '邺',
        zhongshan: '中山',
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
        guangling: '广陵',

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
        chaisang: '柴桑',
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
    factions: <stringObejct>{
        group_RedC: '红圈RedCircle',
        group_MiyaFam: 'Miya Family',
        group_ego: 'Egolive',
        group_xuyan: '虚研社',
        group_xuefeng: '雪风军团',
        group_chaos: 'chaoslive',
        group_NetEase: '网易',
        group_chidori: '千鸟战队',
        group_azhun: '天气阿准',
        group_bingtang: '冰糖',
    },
    resource: <stringObejct>{
        population: '人口',
        reputation: '信誉',
        electricity: '电力',

        figure: '皮套',
        voice: '音声',
        cutting: '切片',
    },
    lands: <stringObejct>{
        Mt: '山峦',
        Gb: '戈壁',
        Pl: '平原',
        Hl: '丘陵',
        Rv: '河流',
        Se: '海洋',
    },
}
const citys = [
    new City("longxi", [0, 10], { level: 2 }),
    new City("wuwei", [1, 6], { level: 4 }),
    new City("tianshui", [2, 11], { level: 3 }),
    new City("anding", [4, 8], { level: 1 }),

    new City("shuofang", [6, 5], { level: 2 }),
    new City("wuyuan", [7, 2]),

    new City("hanzhong", [6, 14], {
        level: 3, color: '#f3ea9d', shape: [
            -4, [1, 2], [0, 1], [-4, 4], [-6, 4], [-5, 5], [-5, 4], [[-5, -4], [-2, 2]], [-1, 1]
        ]
    }),
    new City("zitong", [5, 17], { level: 2 }),
    new City("chengdu", [2, 20], { level: 6 }),
    new City("jiangzhou", [6, 22], {
        level: 2, color: '#48a088', shape: [
            -4, [1, 2], [-1, 2], [-2, 4], [-4, 4], [-5, 4], [-6, 2], [-6, 1], [[-7, -6], [-3, -1]]
        ]
    }),
    new City("yongan", [10, 20], {
        level: 2, color: '#7ddecf', shape: [
            -5, [-1, 0], [-2, 2], [-2, 3], [-3, 3], [-4, 4], [-5, 4], [[-5, -3], [1, 3]], -5
        ]
    }),

    new City("fuling", [8, 23], {
        color: '#aa8844', shape: [
            -2, 3, [0, 2], [-1, 1], [-2, 2], [-1, 2], [-1, 1], [-1, 1], [0, 1], [0, 1]
        ]
    }),
    new City("jianning", [5, 17], { level: 2 }),
    new City("yunnan", [3, 28], {
        level: 1
    }),
    new City("yongchang", [1, 29], {}),

    new City("xihe", [10, 6], { level: 2 }),
    new City("jinyang", [12, 6], { level: 4 }),
    new City("shangdang", [12, 8], { level: 3 }),

    new City("changan", [8, 11], { level: 8 }),
    new City("wan", [12, 14], {
        level: 4, color: '#f3d48a', shape: [
            -3, [0, 1], [-2, 2], [-2, 2], [-1, 2], [-2, 2], [-2, 1], [-1, 0]
        ]
    }),
    new City("shangyong", [10, 15], {
        level: 2, color: '#94d685', shape: [
            -2, [-1, 1], [-2, 1], [-1, 2], [-1, 3], [0, 3], 1
        ]
    }),

    new City("luoyang", [12, 11], { level: 8 }),

    new City("ye", [15, 7], { level: 6 }),
    new City("zhongshan", [16, 5], { level: 3 }),
    new City("nanpi", [19, 5], { level: 2 }),

    new City("ji", [17, 3], { level: 1 }),
    new City("beiping", [20, 3], { level: 4 }),
    new City("liucheng", [22, 2], {}),
    new City("xiangping", [24, 3], { level: 3 }),

    new City("pingyuan", [19, 8], { level: 2 }),
    new City("beihai", [23, 7], { level: 4 }),

    new City("puyang", [17, 10], { level: 2 }),
    new City("chenliu", [16, 12], { level: 3 }),

    new City("xiapi", [22, 13], {
        level: 5, color: '#d07ae0', shape: [
            -3, [1, 4], [-1, 4], [-1, 5], [-2, 5], [-3, 1], -3
        ]
    }),
    new City("xiaopei", [20, 12], { level: 2 }),
    new City("langya", [21, 10], { level: 4 }),
    new City("guangling", [23, 15], {
        level: 4, color: '#6fa1eb', shape: [
            -3, [2, 5], [-2, 5], [-3, 5], [-3, 3], [-3, -1], -3
        ]
    }),

    new City("shouchun", [19, 15], {
        level: 5, color: '#f7b063', shape: [
            -3, [0, 4], [-1, 4], [-2, 4], [-3, 4], [-2, 4], [-1, 4], [-1, 2]
        ]
    }),
    new City("lujiang", [21, 18], {
        level: 2, color: '#e0d57a', shape: [
            -3, [2, 3], [-1, 3], [-2, 2], [-4, 2], [-4, 1], [-4, -1]
        ]
    }),

    new City("xuchang", [15, 14], {
        level: 4, color: '#7ec7ff', shape: [
            -2, [-1, 1], [-2, 3], [-3, 5], [-3, 4], [-4, 3], [-2, 0]
        ]
    }),
    new City("runan", [17, 16], {
        level: 3, color: '#8198fc', shape: [
            -1, [-1, 2], [-3, 3], [-2, 3], [0, 3]
        ]
    }),

    new City("xinye", [14, 17], {
        level: 2, color: '#ea9370', shape: [
            -3, [0, 2], [-1, 3], [-2, 4], [-3, 5], [-1, 2]
        ]
    }),
    new City("xiangyang", [13, 19], {
        level: 6, color: '#a893c8', shape: [
            -4, -4, [-5, -2], [-4, -1], [-3, 1], [-3, 4], [-2, 4], [0, 4]
        ]
    }),
    new City("jiangxia", [17, 19], {
        level: 4, color: '#8ecdb7', shape: [
            -3, [-1, 1], [-1, 4], [-1, 4], [-1, 4], [0, 3]
        ]
    }),
    new City("jiangling", [14, 22], {
        level: 3, color: '#6a84b7', shape: [
            -4, [-1, 0], [-2, 5], [-3, 4], [-2, 4], [-1, 3], [0, 1]
        ]
    }),

    new City("changsha", [16, 24], {
        level: 4, color: '#c4e759', shape: [
            -2, [1, 3], [-1, 3], [-3, 4], [-4, 3], [-4, 3], [1, 2]
        ]
    }),
    new City("wuling", [12, 23], {
        level: 2, color: '#95a3c6', shape: [
            -3, [-4, -3], [-4, 0], [-5, 1], [-6, 2], [-5, 2], [-5, 0], [-6, -1], [-6, -5]
        ]
    }),
    new City("lingling", [13, 26], {
        color: '#008844', shape: [
            -3, 1, [[-3, 2]], [[-5, 2]], [[-5, 1]], [[-6, 2]], [-7, 0]
        ]
    }),
    new City("guiyang", [15, 26], {
        level: 1, color: '#75ac8f', shape: [
            -1, [[0, 4]], [[-1, 6]], [[-1, 5]], [[-3, -1], [4, 5]]
        ]
    }),

    new City("jianye", [24, 17], {
        level: 8, color: '#bbd97b', shape: [
            -1, [0, 2], [-1, 2], [-1, 1], [-1, 1], [-2, -1], -2, [-4, -3], [-5, -3]
        ]
    }),
    new City("wu", [25, 20], {
        level: 7, color: '#f65e69', shape: [
            -6, [4, 6], [3, 5], [3, 4], [1, 4], [0, 3], [-1, 2], [-1, 2], [-3, 1]
        ]
    }),
    new City("chaisang", [19, 21], {
        level: 6, color: '#ee948a', shape: [
            -1, [0, 3], [-3, 3], [-4, 2], [-4, 3], [-5, 2], [-5, 1], [[-5, -4], [-2, 0]]
        ]
    }),
    new City("kuaiji", [25, 23], {
        level: 4, color: '#c2ef92', shape: [
            -5, [-3, -1], [-4, 1], [-4, 3], [-3, 2], [-5, 1], [-6, 1], [-6, 0], [-2, -1]
        ]
    }),
    new City("jianan", [22, 25], {
        level: 3, color: '#9de4e0', shape: [
            -4, [[0, 1]], [[-1, 1]], [[-2, 5]], [-2, 6], [-2, 3], [-2, 2], [-3, 1], [-4, 0], [-5, -4]
        ]
    }),
    new City("luling", [20, 25], {
        level: 2, color: '#aa6622', shape: [
            -1, [[0, 1]], [[-1, 1]], [[-2, 1]], [[-4, 0]], [[-5, -1]]
        ]
    }),

    new City("nanhai", [17, 28], {
        level: 8, color: '#9bc2e6', shape: [
            -2, [[-2, 1], [4, 7]], [-5, 7], [-8, 4], [-8, -4]
        ]
    }),
    new City("jiaozhi", [11, 29], {
        level: 3, color: '#7e719f', shape: [
            -3, [[1, 3]], [[-2, 4]], [[-3, 4]], [[-5, 1]], [[-4, -1]], -4
        ]
    }),
    new City("jiuzhen", [9, 32], {
        level: 4, color: '#945e75', shape: [
            -5, [0, 2], [0, 2], [0, 2], [0, 1], [0, 1], [-1, 1], [-1, 1], [-1, 0]
        ]
    }),
    // new City("rinan", [10, 35], { level: 1 }),

    // new City("taibei", [28, 23], { level: 6 }),
    // new City("taizhong", [28, 25], { level: 3 }),
]
const regions = [
    new Region('交州', ['nanhai', 'jiaozhi', 'jiuzhen'], {
        config: {
            color: '#9bc2e6'
        }
    }),
    new Region('荆南', ['changsha', 'guiyang', 'lingling', 'wuling', 'fuling'], {
        config: {
            color: '#c4e759'
        }
    }),
    new Region('荆北', ['xiangyang', 'jiangling', 'jiangxia', 'xinye'], {
        config: {
            color: '#a893c8'
        }
    }),
    new Region('扬州', ['jianye', 'wu', 'chaisang', 'kuaiji', 'jianan', 'luling'], {
        config: {
            color: '#bbd97b'
        }
    }),

    new Region('豫州', ['xuchang', 'runan'], {
        config: {
            color: '#7ec7ff'
        }
    }),
    new Region('淮南', ['shouchun', 'lujiang'], {
        config: {
            color: '#f7b063'
        }
    }),
    new Region('徐州', ['xiapi', 'xiaopei', 'langya', 'guangling'], {
        config: {
            color: '#d07ae0'
        }
    }),
]
const mounts = [
    // new City("秦岭", [14, 22], {
    //     shape: [
    //         -5, [-1, 0], [-2, 5], [-2, 4], [-2, 4], [-1, 3], [0, 1]
    //     ]
    // }),

    new Mount("桐柏山", [12, 16], {
        shape: [
            0, 1, [-1, 0]
        ]
    }),
    new Mount("大别山", [17, 17], {
        shape: [
            0, [[0, 0], [5, 5]], [0, 4]
        ]
    }),
    new Mount("武夷山脉", [19, 24], {
        shape: [
            -1, 0, [-1, 2], [-2, 0], [-2, -1], [-3, -2]
        ]
    }),
    new Mount("南岭", [13, 28], {
        shape: [
            -1, [-1, 2]
        ]
    }),
    new Mount("云贵高原", [8, 26], {
        shape: [
            -5, 0, [-2, 1], [-1, 1], [0, 1], [0, 2], [0, 2], [-1, 3], [-2, 2], [-3, 3], [-6, 0], [-7, -1], [-4, -3]
        ]
    }),
]
const factions = <Faction[]>[]
const resources = <Resource[]>[]
type stringObejct = Record<string, string>
type anyObject = Record<string, any>
interface context extends anyObject {
    curCvs: HTMLCanvasElement
    tempCvs: HTMLCanvasElement
    curCtx: CanvasRenderingContext2D
    tempCtx: CanvasRenderingContext2D
    curSize: [posType, posType]
    curZoom: number
}
interface data extends anyObject {
    timeRecord?: NodeJS.Timeout
}
const context = <context>{}
let data = <data>{}
const control = {
    setMapSearcher(parent: HTMLDivElement, methods: anyObject = {}) {
        switch (methods.type) {
            case 'faction': {
                methods.focus ??= data.chessFunctions.chessFocus
                let radio = document.createElement('input')
                radio.type = "radio"
                radio.value = "势力列表"
                radio.onclick = () => {
                    if (data.radio === radio) {
                        radio.checked = false;
                        data.radio = null;
                    } else data.radio = radio;
                };
                parent.appendChild(radio)
                let prediv = document.createElement('div')
                parent.appendChild(prediv)
                prediv.style = `--preH:${factions.length}`
                for (let v of factions) {
                    let div = document.createElement('div')
                    div.innerHTML = translation.factions[v.name]
                    div.style = `--transY:${factions.indexOf(v) + 1}`
                    div.listen(() => {
                        methods.focus(v)
                        v.MapHighlight()
                        if (data.timeRecord) {
                            clearTimeout(data.timeRecord)
                            control.tempClear()
                        }
                        data.timeRecord = setTimeout(() => {
                            control.tempClear()
                            data.timeRecord = setTimeout(() => {
                                v.MapHighlight()
                                data.timeRecord = setTimeout(() => {
                                    control.tempClear()
                                }, 700)
                            }, 300)
                        }, 400)
                    })
                    prediv.appendChild(div)
                }
            } break;
            case 'diplomacy': {
                methods.focus ??= data.chessFunctions.chessFocus
                let radio = document.createElement('input')
                radio.type = "radio"
                radio.value = "外交关系"
                radio.onclick = () => {
                    if (data.radio === radio) {
                        radio.checked = false;
                        data.radio = null;
                    } else data.radio = radio;
                };
                parent.appendChild(radio)
                let prediv = document.createElement('div')
                parent.appendChild(prediv)
                for (let v of factions) {
                    let div = document.createElement('div')
                    div.innerHTML = translation.factions[v.name]
                    div.style = `--transY:${factions.indexOf(v) + 1}`
                    div.listen(() => {
                        methods.focus(v)
                        v.MapHighlight()
                        if (data.timeRecord) clearTimeout(data.timeRecord)
                        data.timeRecord = setTimeout(() => {
                            control.reinit()
                            data.timeRecord = setTimeout(() => {
                                v.MapHighlight()
                                data.timeRecord = setTimeout(() => {
                                    control.reinit()
                                }, 700)
                            }, 300)
                        }, 400)
                    })
                    prediv.appendChild(div)
                }
            } break;
        }
    },
    setMapControl(parent: HTMLDivElement, methods: anyObject = {}) {
        switch (methods.type) {
            case 'zoom': {
                let map_zoom = context.curZoom
                let prediv = document.createElement('div')
                let originalWidth = context.curCvs.width
                let originalHeight = context.curCvs.height
                prediv.innerHTML = `地图缩放`
                parent.appendChild(prediv)
                for (let v of ['还原', '0.5', '0.8', '1.2', '1.6']) {
                    let div = document.createElement('div')
                    div.innerHTML = v === '还原' ? v : `×${v}`
                    div.listen(() => {
                        if (v === '还原') {
                            context.curZoom = map_zoom = 0.06
                            context.curCvs.width = originalWidth
                            context.curCvs.height = originalHeight
                        }
                        else {
                            map_zoom *= Number.parseFloat(v)
                            context.curZoom = map_zoom
                            context.curCvs.width *= Number.parseFloat(v)
                            context.curCvs.height *= Number.parseFloat(v)
                        }
                        control.tempSynchronization()
                        this.reinit()
                    })
                    parent.appendChild(div)
                }
            } break;
            case 'mode': {
                let map_status = '城市', map_status_div: HTMLDivElement
                for (let v of ['城市', '省区', '势力', '外交']) {
                    let div = document.createElement('div')
                    if (v === map_status) map_status_div = div
                    div.innerHTML = `${v}模式`
                    div.listen(() => {
                        if (map_status === v) return;
                        parent.insertBefore(div, map_status_div)
                        map_status = v
                        map_status_div = div
                        this.reinit()
                    })
                    parent.appendChild(div)
                }
                if (!data.map_status) {
                    Object.defineProperty(data, 'map_status', {
                        get() {
                            return map_status
                        },
                    })
                }
            } break;
        }
    },
    resourceController() {
        return {
            changeResorce(fact, resource, num) {
                let curf = factions.find(f => f.name === fact)
                let curRes = resources.find(r => r.name === resource)
                curf.resource[resource] += num
                curRes.setReserves()

            },
            mouthNext(watching) {
                for(let curRes of resources){
                    curRes.mouthNext()
                }
            },
            getResorce(fact, resource, key = 'reserves') {
                let curRes = resources.find(r => r.name === resource)
                return curRes[key][fact]
            }
        }
    },
    init(cvs: HTMLCanvasElement, size: [posType, posType], zoom: number) {
        context.curCvs = cvs
        context.curSize = size
        context.curZoom = zoom
        context.curCtx = cvs.getContext('2d')
        context.parent = cvs.parentElement
        context.tempCvs = document.createElement('canvas')
        context.tempCvs.style.position = 'ab'
        context.tempCvs.id = 'temp-canvas'
        context.parent.appendChild(context.tempCvs)
        context.tempCtx = context.tempCvs.getContext('2d')
        control.tempSynchronization()
        for (let ctx of [context.curCtx, context.tempCtx]) {
            ctx.font = `${6 + 500 * zoom}px 'hyk2gj',Arial`;
            ctx.strokeStyle = "rgba(0, 10, 255, 0.5)";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.textAlign = 'center'
        }
        this.initMap()
    },
    reinit() {
        this.clear()
        if (context.curCvs && context.curCtx) {
            this.initMap()
        }
    },
    initMap() {
        switch (data.map_status) {
            case undefined:
            case '城市': {
                for (let m of mounts) {
                    m.drawMap()
                }
                for (let c of citys) {
                    c.drawMap()
                }
            }
                break;
            case '势力': {
                for (let m of mounts) {
                    m.drawMap()
                }
                let config: anyObject = { hiddenName: 0.5 }
                for (let c of citys) {
                    if (c.faction === false) {
                        c.drawMap(context.curCtx, context.curSize, context.curZoom, config)
                    }
                }
                for (let f of factions) {
                    f.drawMap()
                }
                for (let f of factions) {
                    f.drawName()
                }
            }
                break;
            case '外交': {
                for (let f of factions) {
                    f.drawMap()
                }
                for (let f of factions) {
                    f.drawName()
                }
            }
                break;
            case '省区': {
                for (let r of regions) {
                    r.drawMap()
                }
                for (let r of regions) {
                    r.drawName()
                }
            }
                break;
        }
    },
    close() {
        this.clear()
        data = {}
    },
    clear() {
        if (context.curCvs && context.curCtx) {
            let ctx = context.curCtx
            let cvs = context.curCvs
            ctx.clearRect(0, 0, cvs.width, cvs.height)
        }
    },
    tempSynchronization() {
        [context.tempCvs.width, context.tempCvs.height] = [context.curCvs.width, context.curCvs.height]
    },
    tempClear() {
        if (context.tempCvs && context.tempCtx) {
            let ctx = context.tempCtx
            let cvs = context.tempCvs
            ctx.clearRect(0, 0, cvs.width, cvs.height)
        }
    }
}
export default {
    citys,
    mounts,
    translation,
    control,
    drama: {
        init(info) {
            if (info.resource) {
                resources.length = 0
                let resos = info.reso
                for (let res in resos) {
                    resources.push(new Resource(res, resos[res].allocation, resos[res]))
                }
            }
            if (info.factions) {
                factions.length = 0
                let facts = info.factions
                for (let fact in facts) {
                    factions.push(new Faction(fact, facts[fact].citys, facts[fact]))
                }
            }
        },
        set(key: string, info: anyObject) {
            data[key] = info
        }
    }
}