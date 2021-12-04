import * as _context from '../_context';
const { _status, lib, game, ui, get } = _context;
import HTMLDivElementProxy from './HTMLDivElementProxy';
/**
 * Card类
 * 提示作用，无需编译
 * @class CardModel
 * @extends HTMLDivElementProxy
 * @global
 */
class CardModel extends HTMLDivElementProxy {
    inits?: ((card: CardModel) => void)[];
    name?: string
    suit?: string
    number?: number
    nature?: string
    cardid?: number
    viewAs?:string
    node: {
        [propName: string]: HTMLDivElement
    }
    storage?: {[propName: string]: any} = {}
    specialEffects?: string[] = []
    vanishtag?: string[] = []
    gaintag?: string[] = []
    _uncheck?: string[] = []
    destroyed?: boolean
    _destroy?: boolean
    isCard?: boolean
    original?: string
    cards?: CardModel[]
    /**
     * 创建Player
     * @param {HTMLElement} parent 父元素
     * @param {boolean?} [noclick] 是否可点击，如果为true不可点击，如果为false或未指定，可点击
     */
    constructor(parent, info, noclick) {
        super(document.createElement('div'));

        this.element.classList.add('card');
        if (parent) parent.appendChild(this.element);
        //初始化子元素
        var node = this.element;
        // this.initEventListeners();
        /**
            * @name node
            * @memberof GameCores.GameObjects.Card
            * @property {HTMLDivElement} image 图片
            * @property {HTMLDivElement} info 花色和点数信息
            * ```
            * info.innerHTML = "花色<span> </span>点数"
            * ```
            * @property {HTMLDivElement} name 
            */
        node.node = {
            image: ui.create.div('.image', node),
            info: ui.create.div('.info', node),
            name: ui.create.div('.name', node),
            name2: ui.create.div('.name2', node),
            background: ui.create.div('.background', node),
            intro: ui.create.div('.intro', node),
            range: ui.create.div('.range', node),
            gaintag: ui.create.div('.gaintag', node),
        }
        for (var i in lib.element.card) {
            node[i] = lib.element.card[i];
        }
        node.node.intro.innerHTML = lib.config.intro;
        if (!noclick) {
            lib.setIntro(node);
        }
        this.node = this.element.node as{[propName: string]: HTMLDivElement};
        if (info != 'noclick') {
            node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
            if (lib.config.touchscreen) {
                node.addEventListener('touchstart', ui.click.cardtouchstart);
                node.addEventListener('touchmove', ui.click.cardtouchmove);
            }
            if (lib.cardSelectObserver) {//?? [never used]
                lib.cardSelectObserver.observe(node, { attributes: true });
            }
        }
        this.element.getModel = () => {
            return this;
        };
    }
    initEventListeners
    /**
     * 为本游戏牌添加gain标签名；本游戏牌`this.node.gaintag`也会更新
     * @param {(string|Array<string>)} gaintag gain标签名，如果是一个数组，会**覆盖**本游戏牌的原gain标签数组为此数组，而不是向原数组中添加gain标签
     */
    addGaintag (gaintag) {
        if (Array.isArray(gaintag)) this.gaintag = gaintag.slice(0);
        else this.gaintag.add(gaintag);
        var str = '';
        for (var gi = 0; gi < this.gaintag.length; gi++) {
            str += get.translation(this.gaintag[gi]);
            if (gi < this.gaintag.length - 1) str += ' ';
        }
        this.node.gaintag.innerHTML = str;
    }
    /**
     * 为本游戏牌移除gain标签，或置空gain标签数组；本游戏牌`this.node.gaintag`也会更新
     * @param {(string|true)} tag 要移除的gain标签名，如果此gain标签不在其中则不做任何处理；如果此值为true，置空gain标签数组
     */
    removeGaintag (tag) {
        if (tag === true) {
            if (this.gaintag && this.gaintag.length || this.node.gaintag.innerHTML.length) this.addGaintag([]);
        }
        else if (this.hasGaintag(tag)) {
            this.gaintag.remove(tag);
            this.addGaintag(this.gaintag);
        }
    }
    /**
     * 返回本游戏牌是否含有某一个gain标签
     * @param {!string} tag 要搜索的gain标签
     * @returns {!boolean}
     */
    hasGaintag (tag) {
        if (['ming_', 'an_'].contains(tag)) {
            return this.gaintag && this.gaintag.filter(function (gain) {
                return gain.indexOf(tag) == 0;
            }).length;
        }
        else return this.gaintag && this.gaintag.contains(tag);
    }
    /**
     * 初始化
     * 同时将info.global内的技能添加到{@link lib.skill.global}
     * @function
     * @param {(Array|Object)} card TODO
     * @returns {!GameCores.GameObjects.Card} this self
     */
    init (card) {
        if (Array.isArray(card)) {
            if (card[2] == 'huosha') {
                card[2] = 'sha';
                card[3] = 'fire';
            }
            if (card[2] == 'leisha') {
                card[2] = 'sha';
                card[3] = 'thunder';
            }
            if (card[2] == 'kamisha') {
                card[2] = 'sha';
                card[3] = 'kami';
            }
            if (card[2] == 'icesha') {
                card[2] = 'sha';
                card[3] = 'ice';
            }
            if (card[2] == 'haisha') {
                card[2] = 'sha';
                card[3] = 'ocean';
            }
            if (card[2] == 'yamisha') {
                card[2] = 'sha';
                card[3] = 'yami';
            }
            if (card[2] == 'haitao') {
                card[2] = 'tao';
                card[3] = 'ocean';
            }
            if (card[2] == 'haijiu') {
                card[2] = 'jiu';
                card[3] = 'ocean';
            }
        }
        else if (typeof card == 'object') {
            card = [card.suit, card.number, card.name, card.nature];
            card[5] = card.specialEffects
        }
        var cardnum = card[1] || '';
        if (parseInt(cardnum) == cardnum) cardnum = parseInt(cardnum);
        if ([1, 11, 12, 13, 14].contains(cardnum)) {
            cardnum = { '1': 'A', '11': 'J', '12': 'Q', '13': 'K', '14': '★' }[cardnum]
        }
        if (!lib.card[card[2]]) {
            lib.card[card[2]] = {};
        }
        var info = lib.card[card[2]];
        if (info.global && !this.classList.contains('button')) {
            if (Array.isArray(info.global)) {
                while (info.global.length) {
                    game.addGlobalSkill(info.global.shift());
                }
            }
            else if (typeof info.global == 'string') {
                game.addGlobalSkill(info.global);
            }
            delete info.global;
        }
        if (this.name) {
            this.classList.remove('epic');
            this.classList.remove('legend');
            this.classList.remove('gold');
            this.classList.remove('unique');
            this.style.background = '';
            var subtype = get.subtype(this);
            if (subtype) {
                this.classList.remove(subtype);
            }
        }
        if (info.epic) {
            this.classList.add('epic');
        }
        else if (info.legend) {
            this.classList.add('legend');
        }
        else if (info.gold) {
            this.classList.add('gold');
        }
        else if (info.unique) {
            this.classList.add('unique');
        }
        var bg = card[2];
        if (info.cardimage) {
            bg = info.cardimage;
        }
        var img = lib.card[bg].image;
        if (img) {
            if (img.indexOf('db:') == 0) {
                img = img.slice(3);
            }
            else if (img.indexOf('ext:') != 0) {
                img = null;
            }
        }
        this.classList.remove('fullskin');
        this.classList.remove('fullimage');
        this.classList.remove('fullborder');
        this.dataset.cardName = card[2];
        this.dataset.cardType = info.type || '';
        this.dataset.cardSubype = info.subtype || '';
        this.dataset.cardMultitarget = info.multitarget ? '1' : '0';
        this.node.name.dataset.nature = '';
        this.node.info.classList.remove('red');
        if (!lib.config.hide_card_image && lib.card[bg].fullskin) {
            this.classList.add('fullskin');
            if (img) {
                if (img.indexOf('ext:') == 0) {
                    this.node.image.setBackgroundImage(img.replace(/ext:/, 'extension/'));
                }
                else {
                    this.node.image.setBackgroundDB(img);
                }
            }
            else {
                if (lib.card[bg].modeimage) {
                    this.node.image.setBackgroundImage('image/mode/' + lib.card[bg].modeimage + '/card/' + bg + '.png');
                }
                else {
                    if (bg.indexOf('rm_') == 0) {
                        var bg = bg.slice(3);
                        this.node.image.setBackgroundImage('image/replace/' + bg + '.png');
                    }
                    else if (lib.config.replace_image) {
                        this.node.image.setBackgroundImage('image/replace/' + bg + '.png');
                    }
                    else {
                        this.node.image.setBackgroundImage('image/card/' + bg + '.png');
                    }
                }
            }
        }
        else if (lib.card[bg].image == 'background') {
            if (card[3]) this.node.background.setBackground(bg + '_' + card[3], 'card');
            else this.node.background.setBackground(bg, 'card');
        }
        else if (lib.card[bg].fullimage) {
            this.classList.add('fullimage');
            if (img) {
                if (img.indexOf('ext:') == 0) {
                    this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
                    this.style.backgroundSize = 'cover';
                }
                else {
                    this.setBackgroundDB(img);
                }
            }
            else if (lib.card[bg].image) {
                if (lib.card[bg].image.indexOf('character:') == 0) {
                    this.setBackground(lib.card[bg].image.slice(10), 'character');
                }
                else {
                    this.setBackground(lib.card[bg].image);
                }
            }
            else {
                var cardPack = lib.cardPack['mode_' + get.mode()];
                if (Array.isArray(cardPack) && cardPack.contains(bg)) {
                    this.setBackground('mode/' + get.mode() + '/card/' + bg);
                }
                else {
                    this.setBackground('card/' + bg);
                }
            }
        }
        else if (lib.card[bg].fullborder) {
            this.classList.add('fullborder');
            if (lib.card[bg].fullborder == 'gold') {
                this.node.name.dataset.nature = 'metalmm';
            }
            else if (lib.card[bg].fullborder == 'silver') {
                this.node.name.dataset.nature = 'watermm';
            }
            if (!this.node.avatar) {
                this.node.avatar = ui.create.div('.cardavatar');
                this.insertBefore(this.node.avatar, this.firstChild);
            }
            if (!this.node.framebg) {
                this.node.framebg = ui.create.div('.cardframebg');
                this.node.framebg.dataset.auto = lib.card[bg].fullborder;
                this.insertBefore(this.node.framebg, this.firstChild);
            }
            if (img) {
                if (img.indexOf('ext:') == 0) {
                    this.node.avatar.setBackgroundImage(img.replace(/ext:/, 'extension/'));
                    this.node.avatar.style.backgroundSize = 'cover';
                }
                else {
                    this.node.avatar.setBackgroundDB(img);
                }
            }
            else if (lib.card[bg].image) {
                if (lib.card[bg].image.indexOf('character:') == 0) {
                    this.node.avatar.setBackground(lib.card[bg].image.slice(10), 'character');
                }
                else {
                    this.node.avatar.setBackground(lib.card[bg].image);
                }
            }
            else {
                var cardPack = lib.cardPack['mode_' + get.mode()];
                if (Array.isArray(cardPack) && cardPack.contains(bg)) {
                    this.node.avatar.setBackground('mode/' + get.mode() + '/card/' + bg);
                }
                else {
                    this.node.avatar.setBackground('card/' + bg);
                }
            }
        }
        else if (lib.card[bg].image == 'card') {
            if (card[3]) this.setBackground(bg + '_' + card[3], 'card');
            else this.setBackground(bg, 'card');
        }
        else if (typeof lib.card[bg].image == 'string' && !lib.card[bg].fullskin) {
            if (img) {
                if (img.indexOf('ext:') == 0) {
                    this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
                    this.style.backgroundSize = 'cover';
                }
                else {
                    this.setBackgroundDB(img);
                }
            }
            else {
                this.setBackground(lib.card[bg].image);
            }
        }
        else {
            this.node.background.innerHTML = lib.translate[bg + '_cbg'] || lib.translate[bg + '_bg'] || get.translation(bg)[0];
            // this.node.background.style.fontFamily=lib.config.card_font;
            if (this.node.background.innerHTML.length > 1) this.node.background.classList.add('tight');
            else this.node.background.classList.remove('tight');
        }
        if ((bg == 'wuxingpan' || !lib.card[bg].fullborder) && this.node.avatar && this.node.framebg) {
            this.node.avatar.remove();
            this.node.framebg.remove();
            delete this.node.avatar;
            delete this.node.framebg;
        }
        if (info.noname && !this.classList.contains('button')) {
            this.node.name.style.display = 'none';
        }
        if (info.color) {
            this.style.color = info.color;
        }
        if (info.textShadow) {
            this.style.textShadow = info.textShadow;
        }
        if (info.opacity) {
            this.node.info.style.opacity = info.opacity;
            this.node.name.style.opacity = info.opacity;
        }
        if (info.modinfo) {
            this.node.info.innerHTML = info.modinfo;
        }
        else {
            this.node.info.innerHTML = get.translation(card[0]) + '<span> </span>' + cardnum;
        }
        if (info.addinfo) {
            if (!this.node.addinfo) {
                this.node.addinfo = ui.create.div('.range', this);
            }
            this.node.addinfo.innerHTML = info.addinfo;
        }
        else if (this.node.addinfo) {
            this.node.addinfo.remove();
            delete this.node.addinfo;
        }
        if (card[0] == 'heart' || card[0] == 'diamond') {
            this.node.info.classList.add('red');
        }
        this.node.name.innerHTML = '';
        this.node.image.className = 'image';
        var name = get.translation(card[2]);
        if (name.length == 1) {
            if (card[3] == 'fire') {
                name = '火' + name;
                this.node.image.classList.add('fire');
            }
            else if (card[3] == 'thunder') {
                name = '雷' + name;
                this.node.image.classList.add('thunder');
            }
            else if (card[3] == 'kami') {
                name = '神' + name;
                this.node.image.classList.add('kami');
            }
            else if (card[3] == 'ice') {
                name = '冰' + name;
                this.node.image.classList.add('ice');
            }
            else if (card[3] == 'ocean') {
                name = '海' + name;
                this.node.image.classList.add('ocean');
            }
            else if (card[3] == 'yami') {
                name = '暗' + name;
                this.node.image.classList.add('yami');
            }
        } else {
            if (card[3] == 'fire') {
                this.node.image.classList.add('fire');
            }
            else if (card[3] == 'thunder') {
                this.node.image.classList.add('thunder');
            }
            else if (card[3] == 'kami') {
                this.node.image.classList.add('kami');
            }
            else if (card[3] == 'ice') {
                this.node.image.classList.add('ice');
            }
            else if (card[3] == 'ocean') {
                name = name.replace(name.charAt(0), '海');
                this.node.image.classList.add('ocean');
            }
            else if (card[3] == 'yami') {
                name = name.replace(name.charAt(0), '暗');
                this.node.image.classList.add('yami');
            }
        }
        for (let i = 0; i < name.length; i++) {
            this.node.name.innerHTML += name[i] + '<br/>';
        }
        if (name.length >= 5) {
            this.node.name.classList.add('long');
            if (name.length >= 7) {
                this.node.name.classList.add('longlong');
            }
        }
        this.node.name2.innerHTML = get.translation(card[0]) + cardnum + ' ' + name;
        this.suit = card[0];
        this.number = parseInt(card[1]) || 0;
        this.name = card[2];
        this.classList.add('card');
        if (card[3]) {
            if (lib.nature.contains(card[3])) this.nature = card[3];
            this.classList.add(card[3]);
        }
        else if (this.nature) {
            this.classList.remove(this.nature);
            delete this.nature;
        }
        if (info.subtype) this.classList.add(info.subtype);
        if (this.inits) {
            for (var i = 0; i < lib.element.card.inits.length; i++) {
                lib.element.card.inits[i](this);
            }
        }
        if (typeof info.init == 'function') info.init();
        this.node.range.innerHTML = '';
        switch (get.subtype(this)) {
            case 'equip1':
                var added = false;
                if (lib.card[this.name] && lib.card[this.name].distance) {
                    var dist = lib.card[this.name].distance;
                    if (dist.attackFrom) {
                        added = true;
                        this.node.range.innerHTML = '范围: ' + (-dist.attackFrom + 1);
                    }
                }
                if (!added) {
                    this.node.range.innerHTML = '范围: 1';
                }
                break;
            case 'equip3':
                if (info.distance && info.distance.globalTo) {
                    this.node.range.innerHTML = '防御: ' + info.distance.globalTo;
                    this.node.name2.innerHTML += '+';
                }
                break;
            case 'equip4':
                if (info.distance && info.distance.globalFrom) {
                    this.node.range.innerHTML = '进攻: ' + (-info.distance.globalFrom);
                    this.node.name2.innerHTML += '-';
                }
                break;
        }
        var specialEffects = [];
        if (Array.isArray(card[5])) {
            specialEffects.addArray(card[5]);
        }
        let parentNode = this.node.image.parentNode as HTMLElement
        if (parentNode.classList.length > 0)
            parentNode.classList.forEach(element => {
                if (element.indexOf("card_") != -1) {
                    parentNode.classList.remove(element);
                }
            });
        if (specialEffects.length) {
            for (var i = 0; i < specialEffects.length; i++) {
                parentNode.classList.add(specialEffects[i]);
            }
            this.specialEffects = specialEffects;
        }
        if (_status.connectMode && !game.online && lib.cardOL && !this.cardid) {
            this.cardid = get.id();
            lib.cardOL[this.cardid] = this;
        }
        if (!_status.connectMode && !_status.video) {
            this.cardid = get.id();
        }
        var tags = [];
        if (Array.isArray(card[4])) {
            tags.addArray(card[4]);
        }
        if (this.cardid) {
            if (!_status.cardtag) {
                _status.cardtag = {
                    yingbian_zhuzhan: [],
                    yingbian_kongchao: [],
                    yingbian_fujia: [],
                    yingbian_canqu: [],
                }
            }
            for (let i in _status.cardtag) {
                if (_status.cardtag[i].contains(this.cardid)) {
                    tags.add(i);
                }
            }
            if (tags.length) {
                var tagstr = ' <span class="cardtag">';
                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i];
                    if (!_status.cardtag[tag]) {
                        _status.cardtag[tag] = [];
                    }
                    _status.cardtag[tag].add(this.cardid);
                    tagstr += lib.translate[tag + '_tag'];
                }
                tagstr += '</span>';
                this.node.range.innerHTML += tagstr;
            }
        }
        return this;
    }
    /**
     * 选中状态，更新本游戏牌的位置；仅供`ui.me`中的手牌使用的函数(本机)
     * @param {?boolean} [bool] 如果为true，translate`translateY(-20px)`
     * @param {?number} [delay] 延迟`delay`(ms)时长，再更新本游戏牌位置；如果未指定或为0，不调用延迟函数，立即更新
     */
     _transform:string
    updateTransform (bool, delay?) {
        if (delay) {
            var that = this;
            setTimeout(function () {
                that.updateTransform(that.classList.contains('selected'));
            } , delay);
        }
        else {
            if (_status.event.player != game.me) return;
            if (this._transform && this.parentNode && this.parentNode.parentNode &&
                this.parentNode.parentNode.parentNode == ui.me &&
                (!_status.mousedown || _status.mouseleft) &&
                (!(this.parentNode.parentNode as HTMLElement).classList.contains('scrollh') || (game.layout == 'long2' || game.layout == 'nova'))) {
                if (bool) {
                    this.style.transform = this._transform + ' translateY(-20px)';
                }
                else {
                    this.style.transform = this._transform || '';
                }
            }
        }
    }
    aiexclude () {
        _status.event._aiexclude.add(this);
    }
    getSource (name) {
        if (this.name == name) return true;
        var info = lib.card[this.name];
        if (info && Array.isArray(info.source)) {
            return info.source.contains(name);
        }
        return false;
    }
    fixed:boolean
    _listeningEnd:boolean
    _transitionEnded:boolean
    _onEndMoveDelete:boolean
    moveDelete (player) {
        this.fixed = true;
        if (!this._listeningEnd || this._transitionEnded) {
            this.moveTo(player);
            var that = this;
            setTimeout(function () {
                that.delete();
            }, 200);
        }
        else {
            this._onEndMoveDelete = player;
        }
    }
    moveTo (player) {
        this.fixed = true;
        var dx, dy;
        if (this.classList.contains('center')) {
            let ax = [50, -52], ay = [50, -52];
            let nx = ax[0] * ui.arena.offsetWidth / 100 + ax[1],ny = ay[0] * ui.arena.offsetHeight / 100 + ay[1];
            dx = player.getLeft() + player.offsetWidth / 2 - 52 - nx;
            dy = player.getTop() + player.offsetHeight / 2 - 52 - ny;
        }
        else {
            this.style.left = this.offsetLeft + 'px';
            this.style.top = this.offsetTop + 'px';

            dx = player.getLeft() + player.offsetWidth / 2 - 52 - this.offsetLeft;
            dy = player.getTop() + player.offsetHeight / 2 - 52 - this.offsetTop;
        }
        if (get.is.mobileMe(player)) {
            dx += get.cardOffset();
            if (ui.arena.classList.contains('oblongcard')) {
                dy -= 16;
            }
        }


        if (this.style.transform && this.style.transform != 'none' && this.style.transform.indexOf('translate') == -1) {
            this.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
        }
        else {
            this.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        }
        return this;
    }
    clone
    copy () {
        let newcard
        let node = this.cloneNode(true) as HTMLDivElement;
        newcard.name = this.name;
        newcard.suit = this.suit;
        newcard.number = this.number;
        newcard.element = node

        node.style.transform = '';
        node.classList.remove('hidden');
        node.classList.remove('start');
        node.classList.remove('thrown');
        node.classList.remove('selectable');
        node.classList.remove('selected');
        node.classList.remove('removing');
        node.classList.remove('drawinghidden');
        node.classList.remove('glows');
        node.node = {
            name: node.querySelector('.name') as HTMLElement,
            info: node.querySelector('.info') as HTMLElement,
            intro: node.querySelector('.intro') as HTMLElement,
            background: node.querySelector('.background') as HTMLElement,
            image: node.querySelector('.image') as HTMLElement,
            gaintag: node.querySelector('.gaintag') as HTMLElement,
        }
        node.node.gaintag.innerHTML = '';
        newcard.node = newcard.element.node
        var clone = true;
        var position;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'string') node.classList.add(arguments[i]);
            else if (get.objtype(arguments[i]) == 'div') position = arguments[i];
            else if (typeof arguments[i] == 'boolean') clone = arguments[i];
        }
        newcard.moveTo = this.moveTo;
        newcard.moveDelete = this.moveDelete;
        if (clone) this.clone = newcard;
        if (position) position.appendChild(node);
        return node;
    }
    uncheck (skill) {
        if (skill) this._uncheck.add(skill);
        this.classList.add('uncheck');
    }
    recheck (skill?) {
        if (skill) this._uncheck.remove(skill);
        else this._uncheck.length = 0;
        if (this._uncheck.length == 0) this.classList.remove('uncheck');
    }
    discard (bool?) {
        if (!this.destroyed) {
            ui.discardPile.appendChild(this);
        }
        this.fix();
        this.classList.remove('glow');
        if (bool === false) {
            ui.cardPile.insertBefore(this, ui.cardPile.childNodes[Math.floor(Math.random() * ui.cardPile.childNodes.length)]);
        }
        else {
            if (_status.discarded) {
                _status.discarded.add(this);
            }
        }
    }
    hasTag (tag) {
        if (this.cardid && _status.cardtag && _status.cardtag[tag] && _status.cardtag[tag].contains(this.cardid)) {
            return true;
        }
        return false;
    }
    /**
     * 判断本卡牌是否在某角色的区域中
     * @returns {!boolean}
     */
    hasPosition () {
        return ['h', 'e', 'j'].contains(get.position(this));
    }
    /**
     * 判断本卡牌是否在牌堆或弃牌堆中
     * @returns {!boolean}
     */
    isInPile () {
        return ['c', 'd'].contains(get.position(this));
    }

}
export default CardModel;