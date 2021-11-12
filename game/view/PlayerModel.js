globalThis.moduleManager.define(['core/core','view/HTMLDivElementProxy'], function ({_status, lib, game, ui, get, ai}, HTMLDivElementProxy) {
    /**
     * Player类
     * @class PlayerModel
     * @extends HTMLDivElementProxy
     * @global
     */
    class PlayerModel extends HTMLDivElementProxy {
        /**
         * 创建Player
         * @param {HTMLElement} parent 父元素
         * @param {boolean?} [noclick] 是否可点击，如果为true不可点击，如果为false或未指定，可点击
         */
        constructor(parent, noclick) {
            super(document.createElement('div'));

            this.element.classList.add('player');
            if (parent) parent.appendChild(this.element);
            //初始化属性
            node = this;
            /**
             * 回合计数，初始为0，每回合开始则加1
             * @name phaseNumber
             * @type {!number}
             * @memberof PlayerModel
             * @instance
             */
            node.phaseNumber = 0;
            /**
             * 事件跳过列表，如果一个事件e的事件名在该列表中存在X个，则接下来的X个事件e会被直接跳过，不执行；每跳过一个事件，列表中就会相应移除一个事件名
             * @name skipList
             * @type {!Array<string>}
             * @memberof PlayerModel
             * @instance
             */
            node.skipList = [];
            /**
             * 技能列表
             * @name skills
             * @type {!Array<any>}
             * @memberof PlayerModel
             * @instance
             */
            node.skills = [];
            /**
             * ??
             * @name initedSkills
             * @type {!Array<any>}
             * @memberof PlayerModel
             * @instance
             */
            node.initedSkills = [];
            node.additionalSkills = {};
            node.disabledSkills = {};
            node.hiddenSkills = [];
            node.awakenedSkills = [];
            node.forbiddenSkills = {};
            node.popups = [];
            node.damagepopups = [];
            node.judging = [];
            node.stat = [{ card: {}, skill: {} }];
            node.actionHistory = [{...lib.historyRecorder}];
            node.tempSkills = {};
            node.storage = {};
            node.marks = {};
            node.ai = { friend: [], enemy: [], neutral: [], handcards: { global: [], source: [], viewed: [] } };
            node.queueCount = 0;
            node.outCount = 0;

            //初始化子元素
            var node = this.element;
            /**
             * 角色的子节点
             * @name node
             * @memberof PlayerModel
             * @instance
             * @property {HTMLDivElement} avatar (主将)头像
             * @property {HTMLDivElement} avatar2 副将头像
             * @property {HTMLDivElement} turnover 翻面
             * @property {HTMLDivElement} framebg 背景
             * @property {HTMLDivElement} intro 介绍
             * @property {HTMLDivElement} identity 身份
             * @property {HTMLDivElement} hp 当前血量
             * @property {HTMLDivElement} name (主将)姓名
             * @property {HTMLDivElement} name2 副将姓名
             * @property {HTMLDivElement} nameol 姓名OL
             * @property {HTMLDivElement} count 数量
             * @property {HTMLDivElement} equips 装备栏
             * @property {HTMLDivElement} judges 判定栏
             * @property {HTMLDivElement} marks 标记
             * @property {HTMLDivElement} chain 连环
             * @property {HTMLDivElement} handcards1 手牌1
             * @property {HTMLDivElement} handcards2 手牌2
             * @property {HTMLDivElement} action action
             * @property {HTMLDivElement} link 铁索(横置)
             */
            node.node = {
                avatar: ui.create.div('.avatar', node, this.onClickAvatar).hide(),
                avatar2: ui.create.div('.avatar2', node, this.onClickAvatar2).hide(),
                turnedover: ui.create.div('.turned', '<div>翻<br>面<div>', node),
                framebg: ui.create.div('.framebg', node),
                intro: ui.create.div('.intro', node),
                identity: ui.create.div('.identity', node),
                hp: ui.create.div('.hp', node),
                name: ui.create.div('.name', node),
                name2: ui.create.div('.name.name2', node),
                nameol: ui.create.div('.nameol', node),
                count: ui.create.div('.count', node).hide(),
                equips: ui.create.div('.equips', node).hide(),
                judges: ui.create.div('.judges', node),
                marks: ui.create.div('.marks', node),
                chain: ui.create.div('.chain', '<div></div>', node),
                handcards1: ui.create.div('.handcards'),
                handcards2: ui.create.div('.handcards'),
            };
            this.node = this.element.node;
            node.node.link = this.mark(' ', { mark: get.linkintro });
            node.node.link.firstChild.setBackgroundImage('image/card/tiesuo_mark.png')
            node.node.link.firstChild.style.backgroundSize = 'cover';
            //铁索元素
            //[need optimize]
            var chainlength = game.layout == 'default' ? 64 : 40;
            for (var i = 0; i < chainlength; i++) {
                ui.create.div(node.node.chain.firstChild, '.cardbg').style.transform = 'translateX(' + (i * 5 - 5) + 'px)';
            }
            //特殊行动标识：在战棋模式中显示当前正在行动的角色与角色间距离
            node.node.action = ui.create.div('.action', node.node.avatar);
            //小身份div
            ui.create.div(node.node.identity);
            //点击事件
            this.initEventListeners();
            if (!noclick) {
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', this.onClickCharacter);
                node.node.identity.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', this.onClickIdentity);
                if (lib.config.touchscreen) {
                    node.addEventListener('touchstart', ui.click.playertouchstart);//[never used]
                }
            }
            else node.noclick = true;
            this.element.getModel = () => {
                return this;
            };
        }
        initEventListeners() {
            /**
            * 点击(主)头像时
            */
            var onClickAvatar = () => {
                if (!lib.config.doubleclick_intro) return;
                if (this.isUnseen(0)) return;
                if (!lib.character[this.name]) return;
                if (!ui.menuContainer) return;
                // var avatar = this.node.avatar;
                var player = this;
                if (!game.players.contains(player) && !game.dead.contains(player)) return;
                if (!this._doubleClicking) {
                    this._doubleClicking = true;
                    setTimeout(() => {
                        this._doubleClicking = false;//[bug] Never invoked.[fix] Use 'this' instead of 'avatar'.
                    }, 500);
                    return;
                }
                // ui.click.skin(this,player.name);
                game.pause2();
                ui.click.charactercard(player.name, null, null, true, this);
            }
            /**
             * 点击(副)头像时
             */
            var onClickAvatar2 = () => {
                if (!lib.config.doubleclick_intro) return;
                if (this.classList.contains('unseen2')) return;
                if (!lib.character[this.name2]) return;
                if (!ui.menuContainer) return;
                var avatar = this.node.avatar;
                var player = this;
                if (!game.players.contains(player) && !game.dead.contains(player)) return;
                if (!this._doubleClicking) {
                    this._doubleClicking = true;
                    setTimeout(function () {
                        avatar._doubleClicking = false;
                    }, 500);
                    return;
                }
                // ui.click.skin(this,player.name2);
                game.pause2();
                ui.click.charactercard(player.name2, null, null, true, this);
            }
            /**
             * 点击角色牌时
             * @param {MouseEvent} e 点击事件
             */
            var onClickCharacter = (e) => {
                if (_status.dragged) return;
                if (_status.clicked) return;
                if (ui.intro) return;
                if (this.classList.contains('connect')) {
                    if (game.online) {
                        if (game.onlinezhu) {
                            if (!this.playerid && game.connectPlayers) {
                                if (['versus', 'doudizhu', 'longlaoguan'].contains(lib.configOL.mode)) return;
                                if (lib.configOL.mode == 'identity' && lib.configOL.identity_mode == 'zhong') return;
                                if (!this.classList.contains('unselectable2') && lib.configOL.number <= 2) return;
                                this.classList.toggle('unselectable2')
                                if (this.classList.contains('unselectable2')) {
                                    lib.configOL.number--;
                                }
                                else {
                                    lib.configOL.number++;
                                }
                                game.send('changeNumConfig', lib.configOL.number,
                                    game.connectPlayers.indexOf(this), this.classList.contains('unselectable2'));
                            }
                        }
                        return;
                    }
                    if (this.playerid) {
                        if (this.ws) {
                            if (confirm('是否踢出' + this.nickname + '？')) {
                                var id = get.id();
                                this.ws.send(function (id) {
                                    if (game.ws) {
                                        game.ws.close();
                                        game.saveConfig('reconnect_info');
                                        game.saveConfig('banned_info', id);
                                    }
                                }, id);
                                lib.node.banned.push(id);
                            }
                        }
                    }
                    else {
                        if (['versus', 'doudizhu', 'longlaoguan', 'single'].contains(lib.configOL.mode)) return;
                        if (lib.configOL.mode == 'identity' && (lib.configOL.identity_mode == 'zhong' || lib.configOL.identity_mode == 'purple')) return;
                        if (!this.classList.contains('unselectable2') && lib.configOL.number <= 2) return;
                        this.classList.toggle('unselectable2')
                        if (this.classList.contains('unselectable2')) {
                            lib.configOL.number--;
                        }
                        else {
                            lib.configOL.number++;
                        }
                        game.send('server', 'config', lib.configOL);
                        game.updateWaiting();
                    }
                    return;
                }
                _status.clicked = true;
                var custom = _status.event.custom;
                if (custom.replace.target) {
                    custom.replace.target(this, e);
                    return;
                }
                if (this.classList.contains('selectable') == false) return;
                this.unprompt();
                if (this.classList.contains('selected')) {
                    ui.selected.targets.remove(this);
                    if (_status.multitarget || _status.event.complexSelect) {
                        game.uncheck();
                        game.check();
                    }
                    else {
                        this.classList.remove('selected');
                    }
                }
                else {
                    ui.selected.targets.add(this);
                    if (_status.event.name == 'chooseTarget' || _status.event.name == 'chooseToUse' || _status.event.name == 'chooseCardTarget') {
                        var targetprompt = null;
                        if (_status.event.targetprompt) {
                            targetprompt = _status.event.targetprompt;
                        }
                        else if (_status.event.skill && !get.info(_status.event.skill).viewAs) {
                            targetprompt = get.info(_status.event.skill).targetprompt;
                        }
                        else if (_status.event.name == 'chooseToUse') {
                            var currentcard = get.card();
                            if (currentcard) {
                                targetprompt = get.info(currentcard).targetprompt;
                            }
                        }
                        if (targetprompt) {
                            if (Array.isArray(targetprompt)) {
                                targetprompt = targetprompt[Math.min(targetprompt.length - 1, ui.selected.targets.indexOf(this))];
                            }
                            else if (typeof targetprompt == 'function') {
                                targetprompt = targetprompt(this);
                            }
                            if (targetprompt && typeof targetprompt == 'string') {
                                this.prompt(targetprompt);
                            }
                        }
                    }
                    this.classList.add('selected');
                }
                if (custom.add.target) {
                    custom.add.target();
                }
                game.check();
            }
            var onClickIdentity = (e) => {
                if (_status.dragged) return;
                _status.clicked = true;
                if (!game.getIdentityList) return;
                if (_status.video) return;
                if (this.forceShown) return;
                if (_status.clickingidentity) {
                    for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                        _status.clickingidentity[1][i].delete();
                        _status.clickingidentity[1][i].style.transform = '';
                    }
                    if (_status.clickingidentity[0] == this) {
                        delete _status.clickingidentity;
                        return;
                    }
                }
                var list = game.getIdentityList(this);
                if (!list) return;
                if (lib.config.mark_identity_style == 'click') {
                    var list2 = [];
                    for (var i in list) {
                        list2.push(i);
                    }
                    list2.push(list2[0]);
                    for (var i = 0; i < list2.length; i++) {
                        if (this.node.identity.firstChild.innerHTML == list[list2[i]]) {
                            this.node.identity.firstChild.innerHTML = list[list2[i + 1]];
                            this.node.identity.dataset.color = list2[i + 1];
                            break;
                        }
                    }
                }
                else {
                    if (get.mode() == 'guozhan') {
                        list = { holo: '杏', nijisanji: '虹', vtuber: '企', clubs: '社' };
                    }
                    var list2 = get.copy(list);
                    if (game.getIdentityList2) {
                        game.getIdentityList2(list2);
                    }
                    var rect = this.getBoundingClientRect();
                    this._customintro = (uiintro) => {
                        if (get.mode() == 'guozhan') {
                            uiintro.clickintro = true;
                        }
                        else {
                            uiintro.touchclose = true;
                        }
                        // if(lib.config.theme!='woodden'){
                        uiintro.classList.add('woodbg');
                        // }
                        if (get.is.phoneLayout()) {
                            uiintro.style.width = '100px';
                        }
                        else {
                            uiintro.style.width = '85px';
                        }
                        var source = this;
                        for (var i in list) {
                            var node = ui.create.div();
                            node.classList.add('guessidentity');
                            node.classList.add('pointerdiv');
                            ui.create.div('.menubutton.large', list2[i], node);
                            if (!get.is.phoneLayout()) {
                                node.firstChild.style.fontSize = '24px';
                                node.firstChild.style.lineHeight = '24px';
                            }
                            if (get.mode() == 'guozhan') {
                                if (source._guozhanguess) {
                                    if (!source._guozhanguess.contains(i)) {
                                        node.classList.add('transparent');
                                    }
                                }
                                node._source = source;
                                node.listen(ui.click.identitycircle);
                            }
                            else {
                                node.listen(function () {
                                    var info = this.link;
                                    info[0].firstChild.innerHTML = info[1];
                                    info[0].dataset.color = info[2];
                                    _status.clicked = false;
                                });
                            }

                            node.link = [this.node.identity, list[i], i];
                            uiintro.add(node);
                        }
                    };
                    ui.click.touchpop();
                    ui.click.intro.call(this, {
                        clientX: (rect.left + rect.width) * game.documentZoom,
                        clientY: (rect.top) * game.documentZoom
                    });
                }
            }
            this.onClickAvatar = this.element.onClickAvatar = onClickAvatar;
            this.onClickAvatar2 = this.element.onClickAvatar2 = onClickAvatar2;
            this.onClickCharacter = this.element.onClickCharacter = onClickCharacter;
            this.onClickIdentity = this.element.onClickIdentity = onClickIdentity;

        }

        /**
         * 检测本角色武将牌周围是否有牌
         */
        hasCardAround() {
            let cards = [];
            let skills = this.getSkills(true, false, false);
            game.expandSkills(skills);
            for (let i of skills) {
                if (lib.skill[i] && lib.skill[i].cardAround) {
                    let key = [];
                    let storage = this.getStorage(i);
                    let method = lib.skill[i].cardAround;
                    if (Array.isArray(method)) {
                        for (let j of method) key = key.concat(storage[j]);
                    }
                    else if (typeof method == 'function') {
                        key = key.concat(method(this));
                    }
                    else if (Array.isArray(storage)) key = key.concat(storage);
                    else key.push(storage);
                    console.log(key);
                    cards.addArray(key);
                }
            }
            if (cards.length) return cards;
            return false;
        }
        isYingV() {
            var info = lib.character[this.name || this.name1];
            if (info && info[4]) {
                if (info[4].contains('yingV')) return true;
            }
        }
        isGuoV() {
            var info = lib.character[this.name || this.name1];
            if (info && info[4]) {
                if (info[4].contains('guoV')) return true;
            }
        }
        /**
         * 将一张牌置入本角色的判定区
         */
        addToJudge(card, source) {
            let cards = (get.itemtype(card) == 'card') ? [card] : card;
            if (source) source.$give(cards, this, false);
            if (get.type(cards[0]) == 'delay') this.addJudge(cards[0]);
            else if (get.color(cards[0]) == 'red' && this.canAddJudge('lebu')) this.addJudge({ name: 'lebu' }, cards);
            else if (get.color(cards[0]) == 'black' && this.canAddJudge('bingliang')) this.addJudge({ name: 'bingliang' }, cards);
        }
        /**
         * 判断一张牌能否本角色的判定区
         */
        canAddToJudge(card) {
            if (get.type(card) == 'delay') return this.canAddJudge(card);
            if (this.canAddJudge('lebu') && get.color(card) == 'red') return true
            if (this.canAddJudge('bingliang') && get.color(card) == 'black') return true
            return false;
        }
        //自创函数(升阶相关)
        chooseShengjie() {
            let next = game.createEvent('chooseShengjie');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') next.materials = arguments[i];
                else if (typeof arguments[i] == 'boolean') next.forced = arguments[i];
                else if (typeof arguments[i] == 'string') next.prompt = arguments[i];
                else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') next.select = arguments[i];
                else if (typeof arguments[i] == 'function') next.filterProduct = arguments[i];
                else if (typeof arguments[i] == 'function') next.filterMaterial = arguments[i];
            }
            if (!this.canShengjie.apply(this, arguments)) return;
            if (next.prompt == undefined) next.prompt = '请选择升阶获得的卡牌';
            if (next.select == undefined) next.select = [1, Infinity];
            next.setContent('chooseShengjie');
            return next;
        }
        canShengjie() {
            if (lib.configOL.protect_beginner) return false;
            let list = [];
            if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length) return false;
            for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
                var info = lib.card[lib.cardPack.mode_derivation[i]];
                if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials))) list.push(lib.cardPack.mode_derivation[i]);
            }
            var materials, select, filterProduct, bool = false;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') materials = arguments[i];
                else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
                else if (typeof arguments[i] == 'function') filterProduct = arguments[i];
            }
            if (filterProduct) list = list.filter(filterProduct);
            if (!materials || !list.length) return false;
            if (select == undefined) select = [1, Infinity];
            var materialList = [];
            var cards = materials.slice(0);
            var l = cards.length;
            var all = Math.pow(l, 2);
            for (var i = 1; i < all; i++) {
                var array = [];
                for (var j = 0; j < l; j++) {
                    if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
                }
                if ((get.itemtype(select) == 'select' && array.length >= select[0] && array.length <= select[1])
                    || (typeof select == 'number' && array.length == select)) materialList.push(array);
            }
            for (var j of materialList) {
                for (var k of list) {
                    var filter = get.info({ name: k }).materials;
                    if (Array.isArray(filter) && filter.length == j.length) {
                        var mate = filter.slice(0);
                        for (var l = 0; l < mate.length; l++) {
                            for (var card of j) {
                                if (get.is.filterCardBy(card, mate[l])) {
                                    mate.splice(l--, 1);
                                }
                            }
                        }
                        if (mate.length == 0) {
                            bool = true;
                        }
                    }
                    if (typeof filter == 'function') {
                        bool = filter(j);
                    }
                }
            }
            return bool;
        }
        //新函数
        /**
         * 将技能移入本角色的封锁列表
         */
        addSkillBlocker(skill) {
            if (!this.storage.skill_blocker) this.storage.skill_blocker = [];
            this.storage.skill_blocker.push(skill);
        }
        /**
         * 将技能移出本角色的封锁列表
         */
        removeSkillBlocker(skill) {
            if (this.storage.skill_blocker) {
                this.storage.skill_blocker.remove(skill);
                if (!this.storage.skill_blocker.length) delete this.storage.skill_blocker;
            }
        }
        /**
         * 将本角色的卡牌移入(目标角色)特殊区
         */
        loseToSpecial(cards, tag, target) {
            var next = game.loseAsync({
                player: this,
                cards: cards,
                tag: tag,
                toStorage: true,
                target: target || this,
            });
            next.setContent(function () {
                "step 0"
                player.lose(cards, ui.special).set('getlx', false);
                "step 1"
                target.directgains(cards, null, event.tag)
            });
            return next;
        }
        /**
         * 为本角色的手牌添加标签
         */
        addGaintag(cards, tag) {
            if (get.itemtype(cards) == 'card') cards = [cards];
            game.addVideo('addGaintag', this, [get.cardsInfo(cards), tag]);
            game.broadcastAll(function (player, cards, tag) {
                var hs = player.getCards('h');
                for (var i of cards) {
                    if (hs.contains(i)) i.addGaintag(tag);
                }
            }, this, cards, tag);
        }
        /**
         * 为本角色手牌移除标签
         */
        removeGaintag(tag, cards) {
            game.addVideo('removeGaintag', this, tag);
            game.broadcastAll(function (player, tag, cards) {
                cards = cards || player.getCards('h');
                for (var i of cards) i.removeGaintag(tag);
            }, this, tag, cards);
        }
        /**
         * 判断本角色能否在濒死求桃事件中救治目标角色
         * @param {string} target 目标角色
         * @returns {!boolean} 可以救治返回`true`，不可以返回`false`
         */
        canSave(target) {
            var player = this;
            if (player.hasSkillTag('save', true, target, true)) return true;
            var name = {}, hs = player.getCards('hs');
            for (var i of hs) name[get.name(i)] = true;
            for (var i in lib.card) {
                if (lib.card[i].savable && (lib.inpile.contains(i) || name[i])) {
                    if (lib.filter.cardSavable({ name: i }, player, target) && (_status.connectMode || player.hasUsableCard(i))) return true;
                }
            }
            return false;
        }
        /**
         * 展示本角色
         * @param {(0|1|2)} num 0:展示主将; 1: 展示副将; 2: 全部展示
         * @param {?boolean} [log] 如果为true或未指定，输出日志；如果为false，不输出日志
         * @returns {GameCores.Bases.Event}
         */
        showCharacter(num, log) {
            var toShow = [];
            if ((num == 0 || num == 2) && this.isUnseen(0)) toShow.add(this.name1);
            if ((num == 1 || num == 2) && this.isUnseen(1)) toShow.add(this.name2);
            if (!toShow.length) return;
            lib.element.player.$showCharacter.apply(this, arguments);
            var next = game.createEvent('showCharacter', false);
            next.player = this;
            next.num = num;
            next.toShow = toShow;
            next._args = arguments;
            next.setContent('showCharacter');
            return next;
        }
        /**
         * 展示本角色(无事件)
         * @param {(0|1|2)} num 0:展示主将; 1: 展示副将; 2: 全部展示
         * @param {?boolean} [log] 如果为true或未指定，输出日志；如果为false，不输出日志
         */
        $showCharacter(num, log) {
            if (num == 0 && !this.isUnseen(0)) {
                return;
            }
            if (num == 1 && (!this.name2 || !this.isUnseen(1))) {
                return;
            }
            if (!this.isUnseen(2)) {
                return;
            }
            game.addVideo('showCharacter', this, num);
            var skills;
            switch (num) {
                case 0:
                    if (log !== false) game.log(this, '展示了主将', '#b' + this.name1);
                    this.name = this.name1;
                    skills = lib.character[this.name][3] || [];
                    this.sex = lib.character[this.name][0];
                    if (this.group == 'unknown') this.group = lib.character[this.name][1];
                    this.classList.remove('unseen');
                    break;
                case 1:
                    if (log !== false) game.log(this, '展示了副将', '#b' + this.name2);
                    skills = lib.character[this.name2][3] || [];
                    if (this.sex == 'unknown') this.sex = lib.character[this.name2][0];
                    if (this.name.indexOf('unknown') == 0) this.name = this.name2;
                    this.classList.remove('unseen2');
                    break;
                case 2:
                    if (log !== false) {
                        if (this.name2) game.log(this, '展示了主将', '#b' + this.name1, '、副将', '#b' + this.name2);
                        else game.log(this, '展示了主将', '#b' + this.name1);
                    }
                    this.name = this.name1;
                    var skills = (lib.character[this.name][3] || []);
                    if (this.name2) skills = skills.concat(lib.character[this.name2][3] || []);
                    this.sex = lib.character[this.name][0];
                    if (this.group == 'unknown') this.group = lib.character[this.name][1];
                    this.classList.remove('unseen');
                    this.classList.remove('unseen2');
                    break;
            }
            if (!this.isUnseen(2)) {
                delete this.storage.nohp;
                this.hp = this.storage.rawHp + this.maxHp - 1;
                this.maxHp = this.storage.rawMaxHp + this.maxHp - 1;
                this.node.hp.show();
                this.update();
            }
            game.broadcast(function (player, name, sex, num, group) {
                player.group = group;
                player.name = name;
                player.sex = sex;
                switch (num) {
                    case 0: player.classList.remove('unseen'); break;
                    case 1: player.classList.remove('unseen2'); break;
                    case 2: player.classList.remove('unseen'); player.classList.remove('unseen2'); break;
                }
                if (!player.isUnseen(2)) {
                    delete player.storage.nohp;
                    player.node.hp.show();
                    player.update();
                }
            }, this, this.name, this.sex, num, this.group);
            for (var i = 0; i < skills.length; i++) {
                if (this.hiddenSkills.contains(skills[i])) {
                    this.hiddenSkills.remove(skills[i]);
                    this.addSkill(skills[i]);
                }
            }
            this.checkConflict();
        }
        /**
         * 观星
         * 本角色观看牌堆顶的`num`张牌并将其以任意顺序置于牌堆顶或牌堆底
         * @param {number} num
         * @returns {GameCores.Bases.Event}
         */
        chooseToGuanxing(num) {
            var next = game.createEvent('chooseToGuanxing');
            next.num = num || 1;
            next.player = this;
            next.setContent('chooseToGuanxing');
            return next;
        }
        /**
         * 向其他角色发送互动表情(本机)
         * @param {!GameCores.GameObjects.Player} 互动的对象
         * @param {!string} emotion 表情
         */
        $throwEmotion(target, name) {
            game.addVideo('throwEmotion', this, [target.dataset.position, name]);
            var getLeft = function (player) {
                if (player == game.me && !ui.fakeme && !ui.chess) return player.getLeft() + player.node.avatar.offsetWidth / 2;
                return player.getLeft() + player.offsetWidth / 2;
            }
            var player = this;
            var emotion = ui.create.div('', '<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '1.png"> </div>', game.chess ? ui.chess : ui.window);
            emotion.style.width = '60px';
            emotion.style.height = '60px';
            var width = emotion.offsetWidth / 2;
            var height = emotion.offsetHeight / 2;
            if (game.chess) width += 60;
            var left = getLeft(player) - width;
            var top = player.getTop() + player.offsetHeight / 3 - height;
            emotion.style.left = left + 'px';
            emotion.style.top = top + 'px';
            var left2 = getLeft(target) - width;
            var top2 = target.getTop() + target.offsetHeight / 3 - height;
            emotion.style['z-index'] = 10;
            emotion.style.transform = 'translateY(' + (top2 - top) + 'px) translateX(' + (left2 - left) + 'px)';
            if (lib.config.background_audio) game.playAudio('effect', 'throw_' + name + get.rand(1, 2));
            setTimeout(function () {
                emotion.innerHTML = ('<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '2.png"> </div>');
                setTimeout(function () {
                    emotion.delete();
                }, 1200);
            }, 600);
        }
        /**
         * 本角色尝试播放一个技能动画[support online]
         * @param {string} name 技能名
         * @param {string} popname 弹出的名称，如果`popname`等于`name`，使用`get.skillTranslation(name, this)`作为弹出的名称
         * @param {?boolean} [checkShow]
         */
        trySkillAnimate(name, popname, checkShow) {
            if (!game.online && lib.config.skill_animation_type != 'off' && lib.skill[name] && lib.skill[name].skillAnimation) {
                if (lib.config.skill_animation_type == 'default') {
                    checkShow = checkShow || 'main';
                }
                else {
                    checkShow = false;
                }
                if (lib.skill[name].textAnimation) {
                    checkShow = false;
                }
                this.$skill(lib.skill[name].animationStr || lib.translate[name], lib.skill[name].skillAnimation, lib.skill[name].animationColor, checkShow);
                return;
            }
            var player = this;
            game.broadcast(function (player, name, popname) {
                player.trySkillAnimate(name, popname);
            }, player, name, popname);
            if (lib.animate.skill[name]) lib.animate.skill[name].apply(this, arguments);
            else {
                if (popname != name) this.popup(popname, 'water', false);
                else this.popup(get.skillTranslation(name, this), 'water', false);
            }
        }
        /**
         * 本角色尝试播放一个游戏牌动画[support online]
         * @param {!GameCores.GameObjects.Card} card
         * @param {string} name 游戏牌名
         * @param {string} nature 属性
         * @param {?string} [popname] 弹出的名称，如果未指定，使用`name`作为弹出的名称
         */
        tryCardAnimate(card, name, nature, popname) {
            var player = this;
            game.broadcast(function (player, card, name, nature, popname) {
                player.tryCardAnimate(card, name, nature, popname);
            }, player, card, name, nature, popname);
            if (lib.animate.card[card.name]) lib.animate.card[card.name].apply(this, arguments);
            else {
                if (!lib.config.show_card_prompt) return;
                if (get.type(card) == 'equip' && lib.config.hide_card_prompt_equip) return;
                if (get.type(card) == 'basic' && lib.config.hide_card_prompt_basic) return;
                if (popname) player.popup({ name: card.name, nature: card.nature }, nature, false);
                else player.popup(name, nature, false);
            }
        }
        hasUsableCard(name) {
            var player = this;
            if (player.countCards('hs', name)) return true;
            var skills = player.getSkills(true).concat(lib.skill.global);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var ifo = get.info(skills[i]);
                if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == name) {
                    if (!ifo.viewAsFilter || ifo.viewAsFilter(player)) {
                        return true;
                    }
                }
                else {
                    var hiddenCard = get.info(skills[i]).hiddenCard;
                    if (typeof hiddenCard == 'function' && hiddenCard(player, name)) {
                        return true;
                    }
                }
            }
        }
        /**
         * 判断目标角色是否在本角色的攻击范围内
         * @param {string} to 目标角色
         * @returns {!boolean} 在范围内返回`true`，在范围外返回`false`
         */
        inRange(to) {
            var from = this;
            if (from == to || from.hasSkill('undist') || to.hasSkill('undist')) return false;
            if (!game.players.contains(from) && !game.dead.contains(from)) return false;
            if (!game.players.contains(to) && !game.dead.contains(to)) return false;
            var mod1 = game.checkMod(from, to, 'unchanged', 'inRange', from);
            if (mod1 != 'unchanged') return mod1;
            var mod2 = game.checkMod(from, to, 'unchanged', 'inRangeOf', to);
            if (mod2 != 'unchanged') return mod2;
            if (from.getAttackRange() < 1) return false;
            var player = from, m, n = 1, i;
            var fxy, txy;
            if (game.chess) {
                fxy = from.getXY();
                txy = to.getXY();
                n = Math.abs(fxy[0] - txy[0]) + Math.abs(fxy[1] - txy[1]);
            }
            else if (to.isMin(true) || from.isMin(true)) { }
            else {
                var length = game.players.length;
                var totalPopulation = game.players.length + game.dead.length + 1;
                for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                    if (player.nextSeat != to) {
                        player = player.nextSeat;
                        if (player.isAlive() && !player.isOut() && !player.hasSkill('undist') && !player.isMin(true)) n++;
                    }
                    else {
                        break;
                    }
                }
                for (i = 0; i < game.players.length; i++) {
                    if (game.players[i].isOut() || game.players[i].hasSkill('undist') || game.players[i].isMin(true)) length--;
                }
                if (from.isDead()) length++;
                if (to.isDead()) length++;
                var left = from.hasSkillTag('left_hand');
                var right = from.hasSkillTag('right_hand');
                if (left === right) n = Math.min(n, length - n);
                else if (left == true) n = length - n;
            }
            n = game.checkMod(from, to, n, 'globalFrom', from);
            n = game.checkMod(from, to, n, 'globalTo', to);
            m = n;
            m = game.checkMod(from, to, m, 'attackFrom', from);
            m = game.checkMod(from, to, m, 'attackTo', to);
            var equips1 = from.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.contains(card);
            }), equips2 = to.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.contains(card);
            });
            for (i = 0; i < equips1.length; i++) {
                var info = get.info(equips1[i]).distance;
                if (!info) continue;
                if (info.globalFrom) {
                    m += info.globalFrom;
                    n += info.globalFrom;
                }
                if (info.attackFrom) {
                    m += info.attackFrom;
                }
            }
            for (i = 0; i < equips2.length; i++) {
                var info = get.info(equips2[i]).distance;
                if (!info) continue;
                if (info.globalTo) {
                    m += info.globalTo;
                    n += info.globalTo;
                }
                if (info.attaclTo) {
                    m += info.attaclTo;
                }
            }
            return m <= 1;
        }
        /**
         * 判断本角色是否在目标角色的攻击范围内
         * @param {string} source 目标角色
         * @returns {!boolean} 在范围内返回`true`，在范围外返回`false`
         */
        inRangeOf(source) {
            return source.inRange(this);
        }
        /**
         * 获得本角色已损失的体力值
         * @returns {!number} this.maxHp - Math.max(0, this.hp)
         */
        getDamagedHp() {
            return this.maxHp - Math.max(0, this.hp);
        }
        changeGroup(group, log, broadcast) {
            var player = this;
            if (broadcast !== false) {
                game.broadcast(function (player, group) {
                    player.group = group;
                    player.node.name.dataset.nature = get.groupnature(group);
                }, player, group);
            }
            player.group = group;
            player.node.name.dataset.nature = get.groupnature(group);
            if (log !== false) game.log(this, '将势力变为了', '#y' + get.translation(group + 2));
        }
        chooseToDuiben(target) {
            var next = game.createEvent('chooseToDuiben');
            next.player = this;
            next.target = target;
            next.setContent('chooseToDuiben');
            return next;
        }
        chooseToPSS(target) {
            var next = game.createEvent('chooseToPSS');
            next.player = this;
            next.target = target;
            next.setContent('chooseToPSS');
            return next;
        }
        chooseToEnable() {
            var next = game.createEvent('chooseToEnable');
            next.player = this;
            next.setContent('chooseToEnable');
            return next;
        }
        chooseToDisable(horse) {
            var next = game.createEvent('chooseToDisable');
            next.player = this;
            if (horse) next.horse = true;
            next.setContent('chooseToDisable');
            return next;
        }
        countDisabled() {
            if (!this.storage.disableEquip) return 0;
            return this.storage.disableEquip.length;
        }
        isPhaseUsing(notmeisok) {
            if (!notmeisok && _status.currentPhase != this) return false;
            return _status.event.name == 'phaseUse' || _status.event.getParent('phaseUse').name == 'phaseUse';
        }
        swapEquip(target, subtype) {
            var next = game.createEvent('swapEquip');
            next.player = this;
            next.target = target;
            next.subtype = subtype;
            next.setContent('swapEquip');
            return next;
        }
        canCompare(target) {
            if (this == target) return false;
            if (!this.countCards('h') || !target.countCards('h')) return false;
            if (this.hasSkillTag('noCompareSource') || target.hasSkillTag('noCompareTarget')) return false;
            return true;
        }
        disableEquip(pos) {
            if (typeof pos == 'number') pos = 'equip' + pos;
            var next = game.createEvent('disableEquip');
            next.player = this;
            next.pos = pos;
            next.source = _status.event.player;
            next.setContent('disableEquip');
            return next;
        }
        $disableEquip(skill) {
            game.broadcast(function (player, skill) {
                player.$disableEquip(skill);
            }, this, skill);
            var player = this;
            if (!player.storage.disableEquip) player.storage.disableEquip = [];
            player.storage.disableEquip.add(skill);
            player.storage.disableEquip.sort();
            var pos = { equip1: '武器栏', equip2: '防具栏', equip3: '+1马栏', equip4: '-1马栏', equip5: '宝物栏' }[skill];
            if (!pos) return;
            var card = game.createCard('feichu_' + skill, pos, '');
            card.fix();
            card.style.transform = '';
            card.classList.remove('drawinghidden');
            card.classList.add('feichu');
            delete card._transform;
            var equipNum = get.equipNum(card);
            var equipped = false;
            for (var i = 0; i < player.node.equips.childNodes.length; i++) {
                if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
                    player.node.equips.insertBefore(card, player.node.equips.childNodes[i]);
                    equipped = true;
                    break;
                }
            }
            if (!equipped) {
                player.node.equips.appendChild(card);
                if (_status.discarded) {
                    _status.discarded.remove(card);
                }
            }
            return player;
        }
        enableEquip(pos) {
            if (typeof pos == 'number') pos = 'equip' + pos;
            var next = game.createEvent('enableEquip');
            next.player = this;
            next.pos = pos;
            next.source = _status.event.player;
            next.setContent('enableEquip');
            return next;
        }
        $enableEquip(skill) {
            game.broadcast(function (player, skill) {
                player.$enableEquip(skill);
            }, this, skill);
            var player = this;
            if (player.storage.disableEquip) player.storage.disableEquip.remove(skill);
            for (var i = 0; i < player.node.equips.childNodes.length; i++) {
                if (player.node.equips.childNodes[i].name == 'feichu_' + skill) {
                    player.node.equips.removeChild(player.node.equips.childNodes[i]);
                    break;
                }
            }
            return player;
        }
        isDisabled(arg) {
            if (typeof arg == 'number') arg = 'equip' + arg;
            if (arg == 'equip6' && this.storage.disableEquip && (this.storage.disableEquip.contains('equip3') || this.storage.disableEquip.contains('equip4'))) return true;
            if (this.storage.disableEquip && this.storage.disableEquip.contains(arg)) return true;
            return false;
        }
        isEmpty(num) {
            if (num == 6 || num == 'equip6') {
                if (!this.isEmpty(3) || !this.isEmpty(4)) return false;
            }
            else if ([3, 4, 'equip3', 'equip4'].contains(num)) {
                if (this.getEquip(6)) return false;
            }
            return !this.isDisabled(num) && !this.getEquip(num);
        }
        $disableJudge() {
            var player = this;
            var card = game.createCard('disable_judge', '', '');
            player.storage._disableJudge = true;
            card.fix();
            card.classList.add('feichu');
            card.style.transform = '';
            card.classList.add('drawinghidden');
            player.node.judges.insertBefore(card, player.node.judges.firstChild);
            ui.updatej(player);
        }
        $enableJudge() {
            var player = this;
            player.storage._disableJudge = false;
            for (var i = 0; i < player.node.judges.childNodes.length; i++) {
                if (player.node.judges.childNodes[i].name == 'disable_judge') {
                    player.node.judges.removeChild(player.node.judges.childNodes[i]);
                    break;
                }
            }
        }
        disableJudge() {
            var next = game.createEvent('disableJudge');
            next.player = this;
            next.source = _status.event.player;
            next.setContent('disableJudge');
            return next;
        }
        enableJudge() {
            var next = game.createEvent('enableJudge');
            next.player = this;
            next.source = _status.event.player;
            next.setContent('enableJudge');
            return next;
        }
        //原有函数
        /**
         * 角色初始化
         * @param {?string} character 角色名，如果未指定，函数直接返回undefined
         * @param {(string|false)} character2 如果为角色名，创建双将角色；如果为false，创建单将
         * @param {!boolean} skill 如果为true，添加技能；如果为false，不添加角色技能；该参数在`character2`参数为false时无效
         * @returns {GameCores.GameObjects.Card} 角色对象
         */
        init(character, character2, skill) {
            if (typeof character == 'string' && !lib.character[character]) {
                lib.character[character] = get.character(character);
            }
            if (typeof character2 == 'string' && !lib.character[character2]) {
                lib.character[character2] = get.character(character2);
            }
            if (!lib.character[character]) return;
            if (get.is.jun(character2)) {
                var tmp = character;
                character = character2;
                character2 = tmp;
            }
            if (character2 == false) {
                skill = false;
                character2 = null;
            }
            var info = lib.character[character];
            if (!info) {
                info = ['', '', 1, [], []];
            }
            if (!info[4]) {
                info[4] = [];
            }
            var skills = info[3].slice(0);
            this.clearSkills(true);
            this.classList.add('fullskin');
            if (!game.minskin && get.is.newLayout() && !info[4].contains('minskin')) {
                this.classList.remove('minskin');
                this.node.avatar.setBackground(character, 'character');
            }
            else {
                this.node.avatar.setBackground(character, 'character');
                if (info[4].contains('minskin')) {
                    this.classList.add('minskin');
                }
                else if (game.minskin) {
                    this.classList.add('minskin');
                }
                else {
                    this.classList.remove('minskin');
                }
            }

            var hp1 = get.infoHp(info[2]);
            var maxHp1 = get.infoMaxHp(info[2]);

            this.node.avatar.show();
            this.node.count.show();
            this.node.equips.show();
            this.name = character;
            this.name1 = character;
            this.sex = info[0];
            this.group = info[1];
            this.hp = hp1;
            this.maxHp = maxHp1;
            this.hujia = 0;
            this.node.intro.innerHTML = lib.config.intro;
            this.node.name.dataset.nature = get.groupnature(this.group);
            lib.setIntro(this);
            this.node.name.innerHTML = get[get.slimName2 ? 'slimName2' : 'slimName'](character);
            if (this.classList.contains('minskin') && this.node.name.querySelectorAll('br').length >= 4) {
                this.node.name.classList.add('long');
            }
            if (info[4].contains('hiddenSkill') && !this.noclick) {
                if (!this.hiddenSkills) this.hiddenSkills = [];
                this.hiddenSkills.addArray(skills);
                skills = [];
                this.classList.add(_status.video ? 'unseen_v' : 'unseen');
                this.name = 'unknown';
                if (!this.node.name_seat && !_status.video) {
                    this.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(this.name)), this);
                    this.node.name_seat.dataset.nature = get.groupnature(this.group);
                }
                this.sex = 'male';
                //this.group='unknown';
                this.storage.nohp = true;
                skills.add('g_hidden_ai');
            }
            if (character2 && lib.character[character2]) {
                var info2 = lib.character[character2];
                if (!info2) {
                    info2 = ['', '', 1, [], []];
                }
                if (!info2[4]) {
                    info2[4] = [];
                }
                this.classList.add('fullskin2');
                this.node.avatar2.setBackground(character2, 'character');

                this.node.avatar2.show();
                this.name2 = character2;
                var hp2 = get.infoHp(info2[2]);
                var maxHp2 = get.infoMaxHp(info2[2]);
                var double_hp;
                if (_status.connectMode || get.mode() == 'single') {
                    double_hp = 'pingjun';
                }
                else {
                    double_hp = get.config('double_hp');
                }
                switch (double_hp) {
                    case 'pingjun': {
                        this.maxHp = Math.floor((maxHp1 + maxHp2) / 2);
                        this.hp = Math.floor((hp1 + hp2) / 2);
                        this.singleHp = ((maxHp1 + maxHp2) % 2 === 1);
                        break;
                    }
                    case 'zuidazhi': {
                        this.maxHp = Math.max(maxHp1, maxHp2);
                        this.hp = Math.max(hp1, hp2);
                        break;
                    }
                    case 'zuixiaozhi': {
                        this.maxHp = Math.min(maxHp1, maxHp2);
                        this.hp = Math.min(hp1, hp2);
                        break;
                    }
                    case 'zonghe': {
                        this.maxHp = maxHp1 + maxHp2;
                        this.hp = hp1 + hp2;
                        break;
                    }
                    default: {
                        this.maxHp = maxHp1 + maxHp2 - 3;
                        this.hp = hp1 + hp2 - 3;
                    };
                }
                this.node.count.classList.add('p2');
                if (info2[4].contains('hiddenSkill') && !this.noclick) {
                    if (!this.hiddenSkills) this.hiddenSkills = [];
                    this.hiddenSkills.addArray(info2[3]);
                    this.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
                    this.storage.nohp = true;
                    skills.add('g_hidden_ai');
                }
                else skills = skills.concat(info2[3]);

                this.node.name2.innerHTML = get.slimName(character2);
            }
            if (this.storage.nohp) {
                this.storage.rawHp = this.hp;
                this.storage.rawMaxHp = this.maxHp;
                this.hp = 1;
                this.maxHp = 1;
                this.node.hp.hide();
            }
            if (skill != false) {
                for (var i = 0; i < skills.length; i++) {
                    this.addSkill(skills[i]);
                }
                this.checkConflict();
            }
            lib.group.add(this.group);
            if (this.inits) {
                for (var i = 0; i < lib.element.player.inits.length; i++) {
                    lib.element.player.inits[i](this);
                }
            }
            if (this._inits) {
                for (var i = 0; i < this._inits.length; i++) {
                    this._inits[i](this);
                }
            }
            this.update();
            return this;
        }
        /**
         * 角色初始化[support online]
         * @param {string} name 玩家名
         * @param {string} character 角色名
         */
        initOL(name, character) {
            this.node.avatar.setBackground(character, 'character');
            this.node.avatar.show();
            this.node.name.innerHTML = get.verticalStr(name);
            this.nickname = name;
            this.avatar = character;
            this.node.nameol.innerHTML = '';
            if (lib.character[character]) this.sex = lib.character[character][0];
        }
        /**
         * 在角色销毁时调用[support online]
         */
        uninitOL() {
            this.node.avatar.hide();
            this.node.name.innerHTML = '';
            this.node.identity.firstChild.innerHTML = '';
            delete this.nickname;
            delete this.avatar;
            delete this.sex;
        }
        /**
         * 初始化房间
         * @returns {GameCores.GameObjects.Player} this self
         * @param {Array} info 房间信息
         */
        initRoom(info, info2) {
            var str = '';
            this.serving = false;
            if (!info || info == 'server') {
                this.roomempty = true;
                str = '空房间';
                this.roomfull = false;
                this.roomgaming = false;
                this.version = null;
                if (info == 'server') {
                    this.serving = true;
                }
            }
            else {
                var config = info[2];
                this.key = info[4];
                this.roomempty = false;
                str += get.modetrans(config);
                str += ' 模式　';
                for (var i = str.length; i < 11; i++) str += '　';
                this.version = config.version;
                if (config.gameStarted) {
                    str += '<span class="firetext">游戏中</span>　';
                    if (config.observe && config.observeReady && this.version == lib.versionOL) {
                        this.classList.remove('exclude');
                    }
                    else {
                        this.classList.add('exclude');
                    }
                }
                else {
                    str += '<span class="greentext">等待中</span>　';
                    if (this.version != lib.versionOL) {
                        this.classList.add('exclude');
                    }
                    else {
                        this.classList.remove('exclude');
                    }
                }
                this.maxHp = parseInt(config.number);
                this.hp = Math.min(this.maxHp, info[3]);
                if (this.hp < this.maxHp || config.gameStarted) str += ('人数：' + this.hp + '/' + this.maxHp);
                else str += ('人数：<span class="firetext">' + this.hp + '/' + this.maxHp + '</span>');

                str += ('　(' + info[0].slice(0, 12) + ' 的房间)');
                this.config = config;
                if (this.hp == this.maxHp && !config.gameStarted) {
                    this.roomfull = true;
                }
                else {
                    this.roomfull = false;
                }
                if (config.gameStarted && (!config.observe || !config.observeReady)) {
                    this.roomgaming = true;
                }
                else {
                    this.roomgaming = false;
                }
            }
            this.firstChild.innerHTML = str;
            return this;
        }
        /**
         * TODO - 重新初始化
         * @param {*} from
         * @param {*} to
         * @param {*} maxHp
         * @param {*} online
         * @returns {(undefined|GameCores.GameObjects.Player)}
         */
        reinit(from, to, maxHp, online) {
            var info1 = lib.character[from];
            var info2 = lib.character[to];
            var smooth = true;
            if (maxHp == 'nosmooth') {
                smooth = false;
                maxHp = null;
            }
            if (this.name2 == from) {
                this.name2 = to;
                if (this.isUnseen(0) && !this.isUnseen(1)) {
                    this.sex = info2[0];
                    this.name = to;
                }
                if (smooth) this.smoothAvatar(true);
                this.node.avatar2.setBackground(to, 'character');
                this.node.name2.innerHTML = get.slimName(to);
            }
            else if (this.name == from || this.name1 == from) {
                if (this.name1 == from) {
                    this.name1 = to;
                }
                if (!this.classList.contains('unseen2')) {
                    this.name = to;
                    this.sex = info2[0];
                }
                if (smooth) this.smoothAvatar(false);
                this.node.avatar.setBackground(to, 'character');
                this.node.name.innerHTML = get.slimName(to);

                if (this == game.me && ui.fakeme) {
                    ui.fakeme.style.backgroundImage = this.node.avatar.style.backgroundImage;
                }
            }
            else {
                return this;
            }
            if (online) {
                return;
            }
            for (var i = 0; i < info1[3].length; i++) {
                this.removeSkill(info1[3][i]);
            }
            for (var i = 0; i < info2[3].length; i++) {
                this.addSkill(info2[3][i]);
            }
            if (Array.isArray(maxHp)) {
                this.maxHp = maxHp[1];
                this.hp = maxHp[0];
            }
            else {
                var num;
                if (maxHp === false) {
                    num = 0;
                }
                else {
                    if (typeof maxHp != 'number') {
                        maxHp = get.infoMaxHp(info2[2]);
                    }
                    num = maxHp - get.infoMaxHp(info1[2]);
                }
                if (typeof this.singleHp == 'boolean') {
                    if (num % 2 != 0) {
                        if (this.singleHp) {
                            this.maxHp += (num + 1) / 2;
                            this.singleHp = false;
                        }
                        else {
                            this.maxHp += (num - 1) / 2;
                            this.singleHp = true;
                            if (!game.online) {
                                this.doubleDraw();
                            }
                        }
                    }
                    else {
                        this.maxHp += num / 2;
                    }
                }
                else {
                    this.maxHp += num;
                }
            }
            game.broadcast(function (player, from, to, skills) {
                player.reinit(from, to, null, true);
                player.applySkills(skills);
            }, this, from, to, get.skillState(this));
            game.addVideo('reinit3', this, {
                from: from,
                to: to,
                hp: this.maxHp,
                avatar2: this.name2 == to
            });
            this.update();
        }
        /**
         * 在角色销毁时调用
         * @returns {!GameCores.GameObjects.Player} this self
         */
        uninit() {
            for (var i = 1; i < 6; i++) {
                if (this.isDisabled(i)) this.$enableEquip('equip' + i);
            }
            if (this.storage._disableJudge) {
                game.broadcastAll(function (player) {
                    player.storage._disableJudge = false;
                    for (var i = 0; i < player.node.judges.childNodes.length; i++) {
                        if (player.node.judges.childNodes[i].name == 'disable_judge') {
                            player.node.judges.removeChild(player.node.judges.childNodes[i]);
                            break;
                        }
                    }
                }, this);
            }
            this.node.avatar.hide();
            this.node.count.hide();
            if (this.node.wuxing) {
                this.node.wuxing.hide();
            }
            if (this.node.name_seat) {
                this.node.name_seat.remove();
                delete this.node.name_seat;
            }
            if (this.storage.nohp) this.node.hp.show();
            this.classList.remove('unseen');
            this.classList.remove('unseen2');
            delete this.name;
            delete this.name1;
            delete this.sex;
            delete this.group;
            delete this.hp;
            delete this.maxHp;
            delete this.hujia;
            this.clearSkills(true);
            this.node.identity.style.backgroundColor = '';
            this.node.intro.innerHTML = '';
            this.node.name.innerHTML = '';
            this.node.hp.innerHTML = '';
            this.node.count.innerHTML = '0';
            if (this.name2) {
                delete this.singleHp;
                this.node.avatar2.hide();
                this.node.name2.innerHTML = '';
                this.classList.remove('fullskin2')
                delete this.name2;
                this.node.count.classList.remove('p2');
            }
            for (var mark in this.marks) {
                this.marks[mark].remove();
            }
            ui.updatem(this);

            this.skipList = [];
            this.skills = this.skills.contains('cangji_yozuru') ? ['cangji_yozuru'] : [];
            this.initedSkills = [];
            this.additionalSkills = {};
            this.disabledSkills = {};
            this.hiddenSkills = [];
            this.awakenedSkills = [];
            this.forbiddenSkills = {};
            this.phaseNumber = 0;
            this.stat = [{ card: {}, skill: {} }];
            this.tempSkills = {};
            this.storage = {};
            this.marks = {};
            this.ai = { friend: [], enemy: [], neutral: [] };

            return this;
        }
        /**
         * 返回`this.offsetLeft`
         * @returns {!number}
         */
        getLeft() {
            return this.offsetLeft;
        }
        /**
         * 返回`this.offsetTop`
         * @returns {!number}
         */
        getTop() {
            return this.offsetTop;
        }
        /**
         * @param {?boolean} [vice] 是否使用副将头像，如果为true则使用副将头像；如果为false或未指定，使用(主将)头像
         * @param {?boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
         */
        smoothAvatar(vice, video) {
            var div = ui.create.div('.fullsize');
            if (vice) {
                div.style.background = getComputedStyle(this.node.avatar2).background;
                this.node.avatar2.appendChild(div);
            }
            else {
                div.style.background = getComputedStyle(this.node.avatar).background;
                this.node.avatar.appendChild(div);
            }
            ui.refresh(div);
            div.style.transition = 'all 1s';
            setTimeout(function () {
                div.classList.add('removing');
                setTimeout(function () {
                    div.remove();
                }, 2000);
            }, 100);
            if (video != false) {
                game.addVideo('smoothAvatar', this, vice);
            }
        }
        /**
         * 强制改变本角色座次，即使目标座次已经有角色存在
         * @param {number} position
         * @param {boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
         */
        changeSeat(position, video) {
            var player = this;
            if (video !== false) game.addVideo('changeSeat', player, position);
            var rect1 = player.getBoundingClientRect();
            player.style.transition = 'all 0s';
            ui.refresh(player);
            player.dataset.position = position;
            var rect2 = player.getBoundingClientRect();
            var dx = rect1.left - rect2.left;
            var dy = rect1.top - rect2.top;
            if ((game.chess || (player.dataset.position != 0 && position != 0)) && player.classList.contains('linked')) {
                player.style.transform = 'rotate(-90deg) translate(' + (-dy) + 'px,' + (dx) + 'px)';
            }
            else {
                player.style.transform = 'translate(' + (dx) + 'px,' + (dy) + 'px)';
            }
            setTimeout(function () {
                player.style.transition = '';
                ui.refresh(player);
                player.style.transform = '';
            }, 100);
        }
        /**
         * 将数据(参数)传输至服务器
         * @returns {!GameCores.GameObjects.Player} this self
         */
        send() {
            if (!this.ws || this.ws.closed) return this;
            this.ws.send.apply(this.ws, arguments);
            return this;
        }
        /**
         * 为本角色生成并注册ID，如果本角色的ID已经存在就重新生成；如果是在(联机|播放录播)的情况下，该函数不做操作
         * @returns {!GameCores.GameObjects.Player} this self
         */
        getId() {
            if (_status.video || _status.connectMode) return this;
            if (this.playerid) {
                delete game.playerMap[this.playerid];
            }
            this.playerid = get.id();
            game.playerMap[this.playerid] = this;
            return this;
        }
        /**
         * 向其他角色发送互动表情[support online]
         * @param {!GameCores.GameObjects.Player} 互动的对象
         * @param {!string} emotion 表情
         */
        throwEmotion(target, emotion) {
            game.broadcastAll(function (player, target, emotion) {
                player.$throwEmotion(target, emotion);
            }, this, target, emotion);
        }
        /**
         * 本角色发送聊天表情
         * @param {string} emotionPack 表情包
         * @param {number} emotionID 表情ID
         */
        emotion(pack, id) {
            var str = '<img src="##assetURL##image/emotion/' + pack + '/' + id + '.gif" width="50" height="50">';
            lib.element.player.say.call(this, str);
            game.broadcast(function (id, str) {
                if (lib.playerOL[id]) {
                    lib.playerOL[id].say(str);
                }
                else if (game.connectPlayers) {
                    for (var i = 0; i < game.connectPlayers.length; i++) {
                        if (game.connectPlayers[i].playerid == id) {
                            lib.element.player.say.call(game.connectPlayers[i], str);
                            return;
                        }
                    }
                }
            }, this.playerid, str);
        }
        /**
         * 本角色发送聊天消息[support online]
         * @param {!string} str 聊天消息
         */
        chat(str) {
            if (get.is.banWords(str)) return;
            lib.element.player.say.call(this, str);
            game.broadcast(function (id, str) {
                if (lib.playerOL[id]) {
                    lib.playerOL[id].say(str);
                }
                else if (game.connectPlayers) {
                    for (var i = 0; i < game.connectPlayers.length; i++) {
                        if (game.connectPlayers[i].playerid == id) {
                            lib.element.player.say.call(game.connectPlayers[i], str);
                            return;
                        }
                    }
                }
            }, this.playerid, str);
        }
        /**
         * 本角色发送聊天消息(单机)
         * @param {!string} str 聊天消息
         */
        say(str) {
            str = str.replace(/##assetURL##/g, lib.assetURL);
            var dialog = ui.create.dialog('hidden');
            dialog.classList.add('static');
            dialog.add('<div class="text" style="word-break:break-all;display:inline">' + str + '</div>');
            dialog.classList.add('popped');
            ui.window.appendChild(dialog);
            var width = dialog.content.firstChild.firstChild.offsetWidth;
            if (width < 190) {
                dialog._mod_height = -16;
            }
            else {
                dialog.content.firstChild.style.textAlign = 'left';
            }
            dialog.style.width = (width + 16) + 'px';
            var refnode;
            if (this.node && this.node.avatar && this.parentNode == ui.arena) {
                refnode = this.node.avatar;
            }
            if (refnode) {
                lib.placePoppedDialog(dialog, {
                    clientX: (ui.arena.offsetLeft + this.getLeft() + refnode.offsetLeft + refnode.offsetWidth / 2) * game.documentZoom,
                    clientY: (ui.arena.offsetTop + this.getTop() + refnode.offsetTop + refnode.offsetHeight / 4) * game.documentZoom
                });
            }
            else {
                lib.placePoppedDialog(dialog, {
                    clientX: (this.getLeft() + this.offsetWidth / 2) * game.documentZoom,
                    clientY: (this.getTop() + this.offsetHeight / 4) * game.documentZoom
                });
            }
            if (dialog._mod_height) {
                dialog.content.firstChild.style.padding = 0;
            }
            setTimeout(function () {
                dialog.delete();
            }, lib.quickVoice.indexOf(str) != -1 ? 3800 : 2000);
            var name = get.translation(this.name);
            var info = [name ? (name + '[' + this.nickname + ']') : this.nickname, str];
            lib.chatHistory.push(info);
            if (_status.addChatEntry) {
                if (_status.addChatEntry._origin.parentNode) {
                    _status.addChatEntry(info, false);
                }
                else {
                    delete _status.addChatEntry;
                }
            }
            if (lib.config.background_speak && lib.quickVoice.indexOf(str) != -1) {
                game.playAudio('voice', (this.sex == 'female' ? 'female' : 'male'), lib.quickVoice.indexOf(str));
            }
        }
        /**
         * 显示投降按钮
         */
        showGiveup() {
            this._giveUp = true;
            if (this == game.me) {
                ui.create.giveup();
            }
            else if (this.isOnline2()) {
                this.send(ui.create.giveup);
            }
        }
        /**
         * 同步技能信息[support online]
         * @param {Object} skills 要同步的技能信息
         * @param {?Array<string>} skills.global 全局技能的信息
         * @param {?Object} skills.skillinfo 技能模板信息
         * @param {?Object} skills.stat 本角色的技能状态信息
         * @param {?Object} skills."['playerid']" 角色的技能信息
         */
        applySkills(skills) {
            for (var i in skills) {
                if (i == 'global') {
                    lib.skill.global = skills[i];
                }
                else if (i == 'skillinfo') {
                    for (var j in skills[i]) {
                        if (!lib.skill[j]) {
                            lib.skill[j] = {};
                        }
                        lib.skill[j].chooseButton = skills[i][j];
                    }
                }
                else if (i == 'stat') {
                    this.stat = [skills.stat];
                }
                else if (lib.playerOL[i]) {
                    for (var j in skills[i]) {
                        lib.playerOL[i][j] = skills[i][j];
                    }
                }
            }
        }
        /**
         * 返回本角色状态信息
         * @returns {GameCores.GameObjects.Player~State}
         */
        getState() {
            /**
             * @name GameCores.GameObjects.Player~State
             * @property {number} hp 当前血量
             * @property {number} maxHp 最大血量
             * @property {string} nickname 玩家昵称
             * @property {string} sex 角色性别
             * @property {string} group 角色势力
             * @property {string} name 角色姓名
             * @property {string} name1 角色(主将)姓名
             * @property {string} name2 角色(副将)姓名
             * @property {Array<GameCores.GameObjects.Card>} handcards 角色手牌
             * @property {Array<string>} gaintag gaintag标签数组
             * @property {Array<GameCores.GameObjects.Card>} equips 角色装备区的牌
             * @property {Array<GameCores.GameObjects.Card>} judges 角色判定区的牌
             * @property {Array<GameCores.GameObjects.Card>} specials 角色武将牌上的牌
             * @property {Array<string>} disableJudge 对角色无效的判定数组
             * @property {Array<(string|number)>} disableEquip 角色废除的装备(类型)数组
             * @property {Array<(string|undefined)>} views 角色判定区牌的视为名数组，即使判定牌的视为名为空也会添加到该数组中，`views`与`judges`一一对应
             * @property {number} position 角色位置(座次)
             * @property {number} hujia 角色护甲
             * @property {(boolean|undefined)} side 角色所属的一侧，如果`p1.side == p2.side`则认为p1与p2为同侧(友方)，否则为异侧(敌方)；该值仅在部分模式(vs等)中使用，在其他模式中默认为undefined
             * @property {boolean} identityShown 是否显示身份
             * @property {Array} identityNode [this.node.identity.innerHTML, this.node.identity.dataset.color] 
             * @property {string} identity 角色身份
             * @property {boolean} dead 角色是否已死亡
             * @property {boolean} linked 角色是否被链接
             * @property {boolean} turnedover 角色是否翻面
             * @property {number} phaseNumber 此时的回合计数
             * @property {boolean} unseen
             * @property {boolean} unseen2 
             * @property {string} mode 当前的模式
             */
            var state = {
                hp: this.hp,
                maxHp: this.maxHp,
                nickname: this.nickname,
                sex: this.sex,
                group: this.group,
                name: this.name,
                name1: this.name1,
                name2: this.name2,
                handcards: this.getCards('hs'),
                gaintag: [],
                equips: this.getCards('e'),
                judges: this.getCards('j'),
                specials: this.getCards('s'),
                disableJudge: this.storage._disableJudge,
                disableEquip: this.storage.disableEquip,
                views: [],
                position: parseInt(this.dataset.position),
                hujia: this.hujia,
                side: this.side,
                identityShown: this.identityShown,
                identityNode: [this.node.identity.innerHTML, this.node.identity.dataset.color],
                identity: this.identity,
                dead: this.isDead(),
                linked: this.isLinked(),
                turnedover: this.isTurnedOver(),
                phaseNumber: this.phaseNumber,
                unseen: this.isUnseen(0),
                unseen2: this.isUnseen(1),
            }
            for (var i = 0; i < state.judges.length; i++) {
                state.views[i] = state.judges[i].viewAs;
            }
            for (var i = 0; i < state.handcards.length; i++) {
                state.gaintag[i] = state.handcards[i].gaintag;
            }
            if (this.getModeState) {
                state.mode = this.getModeState();
            }
            return state;
        }
        /**
         * 设置玩家昵称
         * @param {string} [str] 玩家昵称，如果未指定或为空字符串，使用`this.nickname`。如果`this.nickname`的值也未指定，使用空字符串
         * @returns {GameCores.GameObjects.Player} this self
         */
        setNickname(str) {
            this.node.nameol.innerHTML = (str || this.nickname || '').slice(0, 12);
            return this;
        }
        /**
         * 设置头像[support online]
         * @param {!string} name 武将名，如果是角色副将，则设置副将的头像；如果是主将，则设置主将的头像
         * @param {!string} name2 新图片名(角色名)，用于设置背景；{@link HTMLDivElement#setBackground}
         * @param {?boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
         * @param {?boolean} [fakeme] 如果为true或未指定，设置{@link ui.fakeme}的背景图为头像图；如果为false，不设置
         */
        setAvatar(name, name2, video, fakeme) {
            var node;
            if (this.name2 == name) {
                node = this.node.avatar2;
                this.smoothAvatar(true, video);
            }
            else if (this.name == name) {
                node = this.node.avatar;
                this.smoothAvatar(false, video);
            }
            if (node) {
                node.setBackground(name2, 'character');
                if (this == game.me && ui.fakeme && fakeme !== false) {
                    ui.fakeme.style.backgroundImage = node.style.backgroundImage;
                }
                if (video != false) {
                    game.addVideo('setAvatar', this, [name, name2]);
                }
            }
            game.broadcast(function (player, name, name2) {
                player.setAvatar(name, name2, false);
            }, this, name, name2);
        }
        /**
         * 设置头像更新数组，每张头像更新后停留1s，全部更新完成后，还原头像
         * @param {!string} name 武将名，如果是角色副将，则设置副将的头像；如果是主将，则设置主将的头像
         * @param {Array<string>} list 头像名(角色名)数组
         * @see {@link lib.element.player.setAvatar}
         */
        setAvatarQueue(name, list) {
            var node;
            var player = this;
            if (player.name2 == name) {
                node = player.node.avatar2;
            }
            else {
                node = player.node.avatar;
            }
            if (node._avatarqueue) {
                for (var i = 0; i < list.length; i++) {
                    node._avatarqueue.push(list[i]);
                }
            }
            else {
                var func = function () {
                    if (node._avatarqueue.length) {
                        player.setAvatar(name, node._avatarqueue.shift(), false, false);
                    }
                    else {
                        clearInterval(node._avatarqueueinterval);
                        delete node._avatarqueue;
                        delete node._avatarqueueinterval;
                        player.setAvatar(name, name, false, false);
                    }
                };
                node._avatarqueue = list.slice(0);
                node._avatarqueueinterval = setInterval(func, 1000);
                func();
            }
            game.addVideo('setAvatarQueue', this, [name, list]);
        }
        /**
         * 本角色闪烁头像
         * @param {!string} skill 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
         * @param {!string} name (角色|技能)名，如果是角色名，闪烁此角色的头像；如果是技能名，使用此技能所属角色的角色名
         */
        flashAvatar(skill, name) {
            if (lib.skill[name] && !lib.character[name]) {
                var stop = false;
                var list = lib.config.all.characters.slice(0);
                for (var i in lib.characterPack) {
                    list.add(i);
                }
                for (var i = 0; i < list.length; i++) {
                    for (var j in lib.characterPack[list[i]]) {
                        if (lib.characterPack[list[i]][j][3].contains(name)) {
                            name = j;
                            stop = true;
                            break;
                        }
                    }
                    if (stop) {
                        break;
                    }
                }
            }
            if (lib.character[this.name2] && lib.character[this.name2][3].contains(skill)) {
                this.setAvatarQueue(this.name2, [name]);
            }
            else {
                this.setAvatarQueue(this.name, [name]);
            }
        }
        /**
         * 本角色头像下绘制图像
         * @param {!string} buff 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
         * @param {!string} skill 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
         * @param {!string} name (角色|技能)名，如果是角色名，闪烁此角色的头像；如果是技能名，使用此技能所属角色的角色名
         */
        buffAvatar(buff, skill, name) {
            if (lib.skill[name] && !lib.character[name]) {
                var stop = false;
                var list = lib.config.all.characters.slice(0);
                for (var i in lib.characterPack) {
                    list.add(i);
                }
                for (var i = 0; i < list.length; i++) {
                    for (var j in lib.characterPack[list[i]]) {
                        if (lib.characterPack[list[i]][j][3].contains(name)) {
                            name = j;
                            stop = true;
                            break;
                        }
                    }
                    if (stop) {
                        break;
                    }
                }
            }
            if (lib.character[this.name2] && lib.character[this.name2][3].contains(skill)) {
                this.setAvatarQueue(this.name2, [name]);
            }
            else {
                this.setAvatarQueue(this.name, [name]);
            }
        }
        /**
         * 同步本角色数据(联网)
         * @returns {?GameCores.GameObjects.Player} this self；如果是回放模式且该函数被无参调用，返回空值(undefined)
         */
        update() {
            if (_status.video && arguments.length == 0) return;
            if (this.hp >= this.maxHp) this.hp = this.maxHp;
            var hp = this.node.hp;
            hp.style.transition = 'none';
            game.broadcast(function (player, hp, maxHp, hujia) {
                player.hp = hp;
                player.maxHp = maxHp;
                player.hujia = hujia;
                player.update();
            }, this, this.hp, this.maxHp, this.hujia);
            if (!_status.video) {
                if (this.hujia) {
                    this.markSkill('ghujia');
                }
                else {
                    this.unmarkSkill('ghujia');
                }
            }
            if (!this.storage.nohp) {
                var libHp = lib.character[(this.name && this.name.indexOf('unknown') == 0) ? this.name1 : this.name];
                if (this.maxHp == Infinity) {
                    hp.innerHTML = '∞';
                }
                else if (libHp && libHp[2] && get.infoHp(libHp[2]) < 0) {
                    hp.innerHTML = this.hp + '/' + this.maxHp;
                    hp.classList.add('text');
                }
                else if (game.layout == 'default' && this.maxHp > 14) {
                    hp.innerHTML = this.hp + '/' + this.maxHp;
                    hp.classList.add('text');
                }
                else if (get.is.newLayout() &&
                    (
                        this.maxHp > 9 ||
                        (this.maxHp > 5 && this.classList.contains('minskin')) ||
                        ((game.layout == 'mobile' || game.layout == 'long') && this.dataset.position == 0 && this.maxHp > 7)
                    )) {
                    hp.innerHTML = this.hp + '<br>/<br>' + this.maxHp + '<div></div>';
                    if (this.hp == 0) {
                        hp.lastChild.classList.add('lost');
                    }
                    hp.classList.add('textstyle');
                    // hp.classList.remove('long');
                }
                else {
                    hp.innerHTML = '';
                    hp.classList.remove('text');
                    hp.classList.remove('textstyle');
                    while (this.maxHp > hp.childNodes.length) {
                        ui.create.div(hp);
                    }
                    while (Math.max(0, this.maxHp) < hp.childNodes.length) {
                        hp.removeChild(hp.lastChild);
                    }
                    for (var i = 0; i < this.maxHp; i++) {
                        var index = i;
                        if (get.is.newLayout()) {
                            index = this.maxHp - i - 1;
                        }
                        if (i < this.hp) {
                            hp.childNodes[index].classList.remove('lost');
                        }
                        else {
                            hp.childNodes[index].classList.add('lost');
                        }
                    }
                    // if(this.maxHp==9){
                    //     hp.classList.add('long');
                    // }
                    // else{
                    //     hp.classList.remove('long');
                    // }
                }
                if (hp.classList.contains('room')) {
                    hp.dataset.condition = 'high';
                }
                else if (this.hp == 0) {
                    hp.dataset.condition = '';
                }
                else if (this.hp > Math.round(this.maxHp / 2) || this.hp === this.maxHp) {
                    hp.dataset.condition = 'high';
                }
                else if (this.hp > Math.floor(this.maxHp / 3)) {
                    hp.dataset.condition = 'mid';
                }
                else {
                    hp.dataset.condition = 'low';
                }

                setTimeout(function () {
                    hp.style.transition = '';
                });
            }
            var numh = this.countCards('h');
            if (_status.video) {
                numh = arguments[0];
            }
            if (numh >= 10) {
                numh = numh.toString();
                this.node.count.dataset.condition = 'low';
                this.node.count.innerHTML = numh[0] + '<br>' + numh[1];
            }
            else {
                if (numh > 5) {
                    this.node.count.dataset.condition = 'higher';
                }
                else if (numh > 2) {
                    this.node.count.dataset.condition = 'high';
                }
                else if (numh > 0) {
                    this.node.count.dataset.condition = 'mid';
                }
                else {
                    this.node.count.dataset.condition = 'none';
                }
                this.node.count.innerHTML = numh;
            }
            if (this.updates) {
                for (var i = 0; i < lib.element.player.updates.length; i++) {
                    lib.element.player.updates[i](this);
                }
            }
            if (!_status.video) {
                game.addVideo('update', this, [this.countCards('h'), this.hp, this.maxHp, this.hujia]);
            }
            this.updateMarks();
            return this;
        }
        /**
         * 本角色的一个技能标记移除指定数量，如果这个技能当前(没有标记|标记数为0)，返回`undefined`；
         * 此函数仅支持数值类型的标记，如果是非数值类型的标记，不做任何移除操作，返回`undefined`；
         * 数值类型仅支持整数
         * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
         * @param {?number} [num] 正整数，标记要移除的数量；如果值为0或未指定，则使用数量 **1** 作为要移除的数量
         * @param {?boolean} [log] 是否输出日志，如果为true或未指定，输出日志；如果为false，不输出日志
         */
        removeMark(i, num, log) {
            if (typeof num != 'number' || !num) num = 1;
            if (typeof this.storage[i] != 'number' || !this.storage[i]) return;
            if (num > this.storage[i]) num = this.storage[i];
            this.storage[i] -= num;
            if (log !== false) {
                var str = false;
                var info = get.info(i);
                if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
                else str = lib.translate[i];
                if (str) game.log(this, '移去了', get.cnNumber(num), '个', '#g【' + str + '】');
            }
            this.syncStorage(i);
            this[this.storage[i] ? 'markSkill' : 'unmarkSkill'](i);
        }
        /**
         * 本角色的一个技能标记添加指定数量；
         * 此函数支持任意类型的标记，但不建议使用非数值类型的标记，因为对非数值类型的标记，会首先使用 0 值覆盖原值；
         * 数值类型不支持浮点数
         * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
         * @param {?number} [num] 正整数，标记要添加的数量；如果值为0或未指定，则使用数量 **1** 作为要添加的数量
         * @param {?boolean} [log] 是否输出日志，如果为true或未指定，输出日志；如果为false，不输出日志
         */
        addMark(i, num, log) {
            if (typeof num != 'number' || !num) num = 1;
            if (typeof this.storage[i] != 'number') this.storage[i] = 0;
            this.storage[i] += num;
            if (log !== false) {
                var str = false;
                var info = get.info(i);
                if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
                else str = lib.translate[i];
                if (str) game.log(this, '获得了', get.cnNumber(num), '个', '#g【' + str + '】');
            }
            this.syncStorage(i);
            this.markSkill(i);
        }
        /**
         * 返回本角色一个技能的标记数
         * @param {?string} [i] 技能名，如果是数值型标记，返回此技能的标记数；如果是数组型标记，返回数组的长度值；否则，返回0值
         * @returns {!number}
         */
        countMark(i) {
            if (this.storage[i] == undefined) return 0;
            if (typeof this.storage[i] == 'number') return this.storage[i];
            if (Array.isArray(this.storage[i])) return this.storage[i].length;
            return 0;
        }
        /**
         * 返回此角色是否有一个技能的标记
         * 此函数仅支持数值型标记，对于非数值型标记，此函数总返回false
         * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
         * @returns {!boolean}
         */
        hasMark(i) {
            return this.countMark(i) > 0;
        }
        /**
         * 同步本角色一个技能标记的显示数值，如果是非数值类型的标记，不做同步操作，返回`this`
         * @param {!string} i 技能名
         * @param {?boolean} [storage] 是否同步标记数据，如果为true，同步标记(联网)；如果为false或未指定，不同步
         */
        updateMark(i, storage) {
            if (!this.marks[i]) {
                if (lib.skill[i] && lib.skill[i].intro && (this.storage[i] || lib.skill[i].intro.markcount)) {
                    this.markSkill(i);
                    if (!this.marks[i]) return this;
                }
                else {
                    return this;
                }
            }
            if (storage && this.storage[i]) {
                this.syncStorage(i);
            }
            if (i == 'ghujia' || ((!this.marks[i].querySelector('.image') || this.storage[i + '_markcount']) &&
                lib.skill[i] && lib.skill[i].intro && !lib.skill[i].intro.nocount &&
                (this.storage[i] || lib.skill[i].intro.markcount))) {
                this.marks[i].classList.add('overflowmark')
                var num = 0;
                if (typeof lib.skill[i].intro.markcount == 'function') {
                    num = lib.skill[i].intro.markcount(this.storage[i], this);
                }
                else if (typeof this.storage[i + '_markcount'] == 'number') {
                    num = this.storage[i + '_markcount'];
                }
                else if (i == 'ghujia') {
                    num = this.hujia;
                }
                else if (typeof this.storage[i] == 'number') {
                    num = this.storage[i];
                }
                else if (Array.isArray(this.storage[i])) {
                    num = this.storage[i].length;
                }
                if (num) {
                    if (!this.marks[i].markcount) {
                        this.marks[i].markcount = ui.create.div('.markcount.menubutton', this.marks[i]);
                    }
                    this.marks[i].markcount.innerHTML = num;
                }
                else if (this.marks[i].markcount) {
                    this.marks[i].markcount.delete();
                    delete this.marks[i].markcount;
                }
            }
            else {
                if (this.marks[i].markcount) {
                    this.marks[i].markcount.delete();
                    delete this.marks[i].markcount;
                }
                if (lib.skill[i].mark == 'auto') {
                    this.unmarkSkill(i);
                }
            }
            return this;
        }
        /**
         * 更新本角色全部数值型技能标记信息，不处理非数值标记
         * @param {?string} [skillname] 技能名，同步本角色的一个技能标记数据然后同步更新(联网)；如果未指定，则不进行同步，仅在本机更新
         */
        updateMarks(connect) {
            if (typeof connect == 'string' && _status.connectMode && !game.online) {
                game.broadcast(function (player, storage, skill) {
                    player.storage[skill] = storage;
                    player.updateMarks();
                }, this, this.storage[connect], connect);
            }
            for (var i in this.marks) {
                this.updateMark(i);
            }
        }
        num(arg1, arg2, arg3) {
            if (get.itemtype(arg1) == 'position') {
                return this.get(arg1, arg2, arg3).length;
            }
            else if (arg1 == 's') {
                if (typeof arg2 == 'boolean') {
                    return game.expandSkills(this.getSkills(arg2).concat(lib.skill.global)).contains(arg3);
                }
                else {
                    return game.expandSkills(this.getSkills().concat(lib.skill.global)).contains(arg2);
                }
            }
        }
        line(target, config) {
            if (get.itemtype(target) == 'players') {
                for (var i = 0; i < target.length; i++) {
                    this.line(target[i], config);
                }
            }
            else if (get.itemtype(target) == 'player') {
                if (target == this) return;
                game.broadcast(function (player, target, config) {
                    player.line(target, config);
                }, this, target, config);
                game.addVideo('line', this, [target.dataset.position, config]);
                game.linexy([
                    this.getLeft() + this.offsetWidth / 2,
                    this.getTop() + this.offsetHeight / 2,
                    target.getLeft() + target.offsetWidth / 2,
                    target.getTop() + target.offsetHeight / 2
                ], config, true);
            }
        }
        line2(targets, config) {
            this.line(targets[0], config);
            targets = targets.slice(0);
            for (var i = 1; i < targets.length; i++) {
                (function (j) {
                    setTimeout(function () {
                        targets[j - 1].line(targets[j], config);
                    }, lib.config.duration * i);
                }(i));
            }
        }
        getNext() {
            if (this.hasSkill('undist')) return null;
            var target = this;
            for (var i = 0; i < game.players.length - 1; i++) {
                target = target.next;
                if (!target.hasSkill('undist')) {
                    return target;
                }
            }
            return null;
        }
        getPrevious() {
            if (this.hasSkill('undist')) return null;
            var target = this;
            for (var i = 0; i < game.players.length - 1; i++) {
                target = target.previous;
                if (!target.hasSkill('undist')) {
                    return target;
                }
            }
            return null;
        }
        countUsed(card, type) {
            if (type === true) {
                var num = 0;
                var history = this.getHistory('useCard');
                for (var i = 0; i < history.length; i++) {
                    if (!card) num++;
                    else if (typeof card == 'string' && history[i].card && card == history[i].card.name) num++;
                    else if (typeof card == 'object' && history[i].card && card.name == history[i].card.name) num++;
                }
                return num;
            }
            var num;
            var stat = this.getStat('card');
            if (!card) {
                num = 0;
                for (var i in stat) {
                    if (typeof stat[i] == 'number') {
                        console.log(i, stat[i])
                        num += stat[i];
                    }
                }
                return num;
            }
            if (typeof card == 'object') {
                card = card.name;
            }
            num = stat[card];
            if (typeof num != 'number') return 0;
            return num;
        }
        countSkill(skill) {
            var num = this.getStat('skill')[skill];
            if (num == undefined) return 0;
            return num;
        }
        getStockSkills(unowned, unique, hidden) {
            var list = [];
            if (lib.character[this.name] && (hidden || !this.isUnseen(0))) {
                list.addArray(lib.character[this.name][3]);
            }
            if (lib.character[this.name1] && (hidden || !this.isUnseen(0))) {
                list.addArray(lib.character[this.name1][3]);
            }
            if (lib.character[this.name2] && (hidden || !this.isUnseen(1))) {
                list.addArray(lib.character[this.name2][3]);
            }
            if (!unowned) {
                for (var i = 0; i < list.length; i++) {
                    if (!this.hasSkill(list[i])) {
                        list.splice(i--, 1);
                    }
                }
            }
            if (!unique) {
                for (var i = 0; i < list.length; i++) {
                    var info = lib.skill[list[i]];
                    if (!info || info.unique || info.temp || info.sub || info.charlotte) {
                        list.splice(i--, 1);
                    }
                }
            }
            return list;
        }
        /**
         * 返回本角色(手牌|装备区|判定区|武将牌上)或任意位置组合的游戏牌
         * @function lib.element.player.getCards
         * @param {string} [position='h'] 游戏牌位置组合: [hesj]+
         * @returns {!Array<GameCores.GameObjects.Card>}
         */
        /**
         * 返回本角色所有牌中等于指定名称或手牌轴被视为指定名称的游戏牌
         * @function lib.element.player.getCards
         * @variation 2
         * @param {string} [position='h'] 游戏牌位置: [hesj]+
         * @param {!string} [name] 游戏牌名，返回所有名称等于该牌名，或者手牌中被视为此牌名的牌
         * @returns {!Array<GameCores.GameObjects.Card>}
         */
        /**
         * 返回本角色所有牌中满足特定条件的游戏牌
         * @function lib.element.player.getCards
         * @variation 3
         * @param {string} [position='h'] 游戏牌位置: [hesj]+
         * @param {?Object} [cond] 条件对象，每个属性对应一个匹配条件(游戏牌对象必须有该属性，否则该条件会被跳过，不会生效)，只要有一次匹配失败就将牌从结果数组中移除；如果未指定则跳过匹配过程
         * @param {...(Array<(Object|string)>|string)} cond.'[keyname]' 匹配条件，如果`cond[keyname] == card[keyname] || cond[keyname].contains(card[keyname])`成立，则匹配成功
         * @returns {!Array<GameCores.GameObjects.Card>}
         */
        /**
         * getCards筛选函数
         * @callback lib.element.player.getCards~filterCard
         * @param {!GameCores.GameObjects.Card} card 游戏牌对象
         * @returns {?boolean} true表示保留此游戏牌，false或未指定表示不保留
         * @see {@link lib.element.player.getCards(4)}
         */
        /**
         * 返回本角色所有牌中通过筛选函数的游戏牌
         * @function lib.element.player.getCards
         * @variation 4
         * @param {string} [position='h'] 游戏牌位置: [hesj]+
         * @param {?lib.element.player.getCards~filterCard} [filter] 筛选函数，如果未指定则跳过筛选过程
         * @returns {!Array<GameCores.GameObjects.Card>}
         */
        getCards(arg1, arg2) {
            if (typeof arg1 != 'string') {
                arg1 = 'h';
            }
            var cards = [], cards1 = [];
            var i, j;
            for (i = 0; i < arg1.length; i++) {
                if (arg1[i] == 'h') {
                    for (j = 0; j < this.node.handcards1.childElementCount; j++) {
                        if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
                            cards.push(this.node.handcards1.childNodes[j]);
                        }
                    }
                    for (j = 0; j < this.node.handcards2.childElementCount; j++) {
                        if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
                            cards.push(this.node.handcards2.childNodes[j]);
                        }
                    }
                }
                else if (arg1[i] == 's') {
                    for (j = 0; j < this.node.handcards1.childElementCount; j++) {
                        if (!this.node.handcards1.childNodes[j].classList.contains('removing') && this.node.handcards1.childNodes[j].classList.contains('glows')) {
                            cards.push(this.node.handcards1.childNodes[j]);
                        }
                    }
                    for (j = 0; j < this.node.handcards2.childElementCount; j++) {
                        if (!this.node.handcards2.childNodes[j].classList.contains('removing') && this.node.handcards2.childNodes[j].classList.contains('glows')) {
                            cards.push(this.node.handcards2.childNodes[j]);
                        }
                    }
                }
                else if (arg1[i] == 'e') {
                    for (j = 0; j < this.node.equips.childElementCount; j++) {
                        if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
                            cards.push(this.node.equips.childNodes[j]);
                        }
                    }
                }
                else if (arg1[i] == 'j') {
                    for (j = 0; j < this.node.judges.childElementCount; j++) {
                        if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
                            cards.push(this.node.judges.childNodes[j]);
                            if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
                                this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
                                this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
                                cards1.push(this.node.judges.childNodes[j]);
                            }
                        }
                    }
                }
            }
            if (arguments.length == 1) {
                return cards;
            }
            if (arg2) {
                for (i = 0; i < cards.length; i++) {
                    if (!get.is.filterCardBy(cards[i], arg2)) {
                        cards.splice(i--, 1);
                    }
                }
            }
            for (i = 0; i < cards1.length; i++) {
                if (cards1[i].tempJudge) {
                    cards1[i].name = cards1[i].tempJudge;
                    delete cards1[i].tempJudge;
                }
            }
            return cards;
        }
        getDiscardableCards(player, arg1, arg2) {
            var cards = this.getCards(arg1, arg2);
            for (var i = 0; i < cards.length; i++) {
                if (!lib.filter.canBeDiscarded(cards[i], player, this)) {
                    cards.splice(i--, 1);
                }
            }
            return cards;
        }
        getGainableCards(player, arg1, arg2) {
            var cards = this.getCards(arg1, arg2);
            for (var i = 0; i < cards.length; i++) {
                if (!lib.filter.canBeGained(cards[i], player, this)) {
                    cards.splice(i--, 1);
                }
            }
            return cards;
        }
        getGainableSkills(func) {
            var list = [];
            var names = [this.name, this.name1, this.name2];
            for (var i = 0; i < names.length; i++) {
                list.addArray(get.gainableSkillsName(names[i], func));
            }
            return list;
        }
        countCards(arg1, arg2) {
            return this.getCards(arg1, arg2).length;
        }
        countDiscardableCards(player, arg1, arg2) {
            return this.getDiscardableCards(player, arg1, arg2).length;
        }
        countGainableCards(player, arg1, arg2) {
            return this.getGainableCards(player, arg1, arg2).length;
        }
        getOriginalSkills() {
            var skills = [];
            if (lib.character[this.name] && !this.isUnseen(0)) {
                skills.addArray(lib.character[this.name][3]);
            }
            if (this.name2 && lib.character[this.name2] && !this.isUnseen(1)) {
                skills.addArray(lib.character[this.name2][3]);
            }
            return skills;
        }
        /**
         * 返回本角色的技能组；
         * 该技能组不包括子技能；
         * @param {!string} skill 技能名
         * @param {*} arg2 为真时表示计入隐藏的技能、为'e'时表示仅返回装备技能
         * @param {*} arg3 为false时表示不计入装备技能
         * @param {*} arg4 为false时表示计入失效的技能
         * @returns {!Array<string>}
         */
        getSkills(arg2, arg3, arg4) {
            var skills = this.skills.slice(0);
            var es = [];
            var i, j;
            if (arg3 !== false) {
                for (i = 0; i < this.node.equips.childElementCount; i++) {
                    if (!this.node.equips.childNodes[i].classList.contains('removing')) {
                        var equipskills = get.info(this.node.equips.childNodes[i], false).skills;
                        if (equipskills) {
                            es.addArray(equipskills);
                        }
                    }
                }
                if (arg2 == 'e') {
                    return es;
                }
            }
            for (var i in this.additionalSkills) {
                if (Array.isArray(this.additionalSkills[i]) && (arg2 || i.indexOf('hidden:') !== 0)) {
                    for (j = 0; j < this.additionalSkills[i].length; j++) {
                        if (this.additionalSkills[i][j]) {
                            skills.add(this.additionalSkills[i][j]);
                        }
                    }
                }
                else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
                    skills.add(this.additionalSkills[i]);
                }
            }
            for (var i in this.tempSkills) {
                skills.add(i);
            }
            if (arg2) skills.addArray(this.hiddenSkills);
            if (arg3 !== false) skills.addArray(es);
            for (var i in this.forbiddenSkills) {
                skills.remove(i);
            }
            if (arg4 !== false) {
                skills = game.filterSkills(skills, this, es);
            }
            return skills;
        }
        /**
         * 角色的游戏牌区域(手牌|装备区|判定区)组合
         * Regex: [hej]|he|hj|ej|hej
         * @typedef {string} GameCores.PlayerCardPosition
         * @see {@link GameCores.CardPosition}
         */
        /**
         * 返回本角色(武将牌上|手牌|装备区|判定区)的游戏牌 TODO
         * @param {('s'|GameCores.PlayerCardPosition)} position 角色的游戏牌区域或者角色的武将牌上区域
         * @param {*} arg2
         * @param {*} arg3
         * @param {*} arg4
         * @returns {Array<GameCores.GameObjects.Card>}
         * @see {@link GameCores.PlayerCardPosition}
         * @example
         * let cards = player.get('he')//手牌和装备区所有未被移除、废除、的牌
         * 
         * 
         */
        get(arg1, arg2, arg3, arg4) {
            var i, j;
            if (arg1 == 's') {
                var skills = this.skills.slice(0);
                var es = [];
                if (arg3 !== false) {
                    for (i = 0; i < this.node.equips.childElementCount; i++) {
                        if (!this.node.equips.childNodes[i].classList.contains('removing') && !this.node.equips.childNodes[i].classList.contains('feichu')) {
                            var equipskills = get.info(this.node.equips.childNodes[i]).skills;
                            if (equipskills) {
                                es.addArray(equipskills);
                            }
                        }
                    }
                    if (arg2 == 'e') {
                        return es;
                    }
                }
                for (var i in this.additionalSkills) {
                    if (Array.isArray(this.additionalSkills[i])) {
                        for (j = 0; j < this.additionalSkills[i].length; j++) {
                            if (this.additionalSkills[i][j]) {
                                skills.add(this.additionalSkills[i][j]);
                            }
                        }
                    }
                    else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
                        skills.add(this.additionalSkills[i]);
                    }
                }
                for (var i in this.tempSkills) {
                    skills.add(i);
                }
                if (arg2) skills.addArray(this.hiddenSkills);
                if (arg3 !== false) skills.addArray(es);
                for (var i in this.forbiddenSkills) {
                    skills.remove(i);
                }
                if (arg4 !== false) {
                    skills = game.filterSkills(skills, this, es);
                }
                return skills;
            }
            else if (get.is.pos(arg1)) {
                var cards = [], cards1 = [];
                for (i = 0; i < arg1.length; i++) {
                    if (arg1[i] == 'h') {
                        for (j = 0; j < this.node.handcards1.childElementCount; j++) {
                            if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('feichu') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
                                cards.push(this.node.handcards1.childNodes[j]);
                            }
                        }
                        for (j = 0; j < this.node.handcards2.childElementCount; j++) {
                            if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('feichu') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
                                cards.push(this.node.handcards2.childNodes[j]);
                            }
                        }
                    }
                    else if (arg1[i] == 'e') {
                        for (j = 0; j < this.node.equips.childElementCount; j++) {
                            if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
                                cards.push(this.node.equips.childNodes[j]);
                            }
                        }
                        if (arguments.length == 2 && typeof arg2 == 'string' && /1|2|3|4|5/.test(arg2)) {
                            for (j = 0; j < cards.length; j++) {
                                if (get.subtype(cards[j]) == 'equip' + arg2) return cards[j];
                            }
                            return;
                        }
                    }
                    else if (arg1[i] == 'j') {
                        for (j = 0; j < this.node.judges.childElementCount; j++) {
                            if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
                                cards.push(this.node.judges.childNodes[j]);
                                if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
                                    this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
                                    this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
                                    cards1.push(this.node.judges.childNodes[j]);
                                }
                            }
                        }
                    }
                }
                if (arguments.length == 1) {
                    return cards;
                }
                if (arg2 != undefined) {
                    if (typeof arg3 == 'function') {
                        var cards2 = cards.slice(0);
                        cards.sort(function (a, b) {
                            return arg3(b, cards2) - arg3(a, cards2);
                        });
                    }
                    if (typeof arg2 == 'string') {
                        for (i = 0; i < cards.length; i++) {
                            if (cards[i].name != arg2) {
                                cards.splice(i, 1); i--;
                            }
                        }
                    }
                    else if (typeof arg2 == 'object') {
                        for (i = 0; i < cards.length; i++) {
                            for (j in arg2) {
                                if (j == 'type') {
                                    if (typeof arg2[j] == 'object') {
                                        if (arg2[j].contains(get.type(cards[i])) == false) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                    else if (typeof arg2[j] == 'string') {
                                        if (get.type(cards[i]) != arg2[j]) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                }
                                else if (j == 'subtype') {
                                    if (typeof arg2[j] == 'object') {
                                        if (arg2[j].contains(get.subtype(cards[i])) == false) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                    else if (typeof arg2[j] == 'string') {
                                        if (get.subtype(cards[i]) != arg2[j]) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                }
                                else if (j == 'color') {
                                    if (typeof arg2[j] == 'object') {
                                        if (arg2[j].contains(get.color(cards[i])) == false) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                    else if (typeof arg2[j] == 'string') {
                                        if (get.color(cards[i]) != arg2[j]) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                }
                                else if (j == 'suit') {
                                    if (typeof arg2[j] == 'object') {
                                        if (arg2[j].contains(get.suit(cards[i])) == false) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                    else if (typeof arg2[j] == 'string') {
                                        if (get.suit(cards[i]) != arg2[j]) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                }
                                else if (j == 'number') {
                                    if (typeof arg2[j] == 'object') {
                                        if (arg2[j].contains(get.number(cards[i])) == false) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                    else if (typeof arg2[j] == 'string') {
                                        if (get.number(cards[i]) != arg2[j]) {
                                            cards.splice(i, 1); i--; break;
                                        }
                                    }
                                }
                                else if (typeof arg2[j] == 'object') {
                                    if (arg2[j].contains(cards[i][j]) == false) {
                                        cards.splice(i, 1); i--; break;
                                    }
                                }
                                else if (typeof arg2[j] == 'string') {
                                    if (cards[i][j] != arg2[j]) {
                                        cards.splice(i, 1); i--; break;
                                    }
                                }
                            }
                        }
                    }
                    else if (typeof arg2 == 'number' && arg2 > 0) {
                        cards.splice(arg2);
                    }
                    else if (typeof arg2 == 'function') {
                        for (i = 0; i < cards.length; i++) {
                            if (!arg2(cards[i])) {
                                cards.splice(i, 1); i--;
                            }
                        }
                    }
                }
                for (i = 0; i < cards1.length; i++) {
                    if (cards1[i].tempJudge) {
                        cards1[i].name = cards1[i].tempJudge;
                        delete cards1[i].tempJudge;
                    }
                }
                if (arg2 === 0) return cards[0];
                if (typeof arg3 == 'number') {
                    if (arg3 == 0) return cards[0];
                    cards.splice(arg3);
                }
                if (typeof arg4 == 'number') {
                    if (arg4 == 0) return cards[0];
                    cards.splice(arg4);
                }
                return cards;
            }
        }
        /**
         * 记录本角色的一个技能当前标记数(回放记录)，并更新全部标记信息({@link lib.element.player.updateMarks})
         * @param {!string} skill 技能名
         */
        syncStorage(skill) {
            switch (get.itemtype(this.storage[skill])) {
                case 'cards': game.addVideo('storage', this, [skill, get.cardsInfo(this.storage[skill]), 'cards']); break;
                case 'card': game.addVideo('storage', this, [skill, get.cardInfo(this.storage[skill]), 'card']); break;
                default:
                    try {
                        game.addVideo('storage', this, [skill, JSON.parse(JSON.stringify(this.storage[skill]))]);
                    }
                    catch (e) {
                        console.log(this.storage[skill]);
                    }
            }
        }
        syncSkills() {
            game.broadcast(function (player, skills) {
                player.applySkills(skills);
            }, this, get.skillState(this));
        }
        playerfocus(time) {
            time = time || 1000;
            this.classList.add('playerfocus');
            ui.arena.classList.add('playerfocus');
            var that = this;
            setTimeout(function () {
                that.classList.remove('playerfocus');
                ui.arena.classList.remove('playerfocus');
            }, time);
            game.addVideo('playerfocus', this, time);
            game.broadcast(function (player, time) {
                player.playerfocus(time);
            }, this, time);
            return this;
        }
        /**
         * 记录本角色的一个技能当前标记数(回放记录)，并更新全部标记信息({@link lib.element.player.updateMarks})
         * @param {!string} skill 技能名
         */
        setIdentity(identity) {
            if (!identity) identity = this.identity;
            if (get.is.jun(this)) {
                this.node.identity.firstChild.innerHTML = '君';
            }
            else {
                this.node.identity.firstChild.innerHTML = get.translation(identity);
            }
            this.node.identity.dataset.color = identity;
            return this;
        }
        insertPhase(skill, insert) {
            var evt = _status.event.getParent('phase');
            var next;
            if (evt && evt.parent && evt.parent.next) {
                evt = evt.parent;
                next = game.createEvent('phase', null, evt);
            }
            else if (_status.event.parent && _status.event.parent.next) {
                evt = _status.event.parent;
                next = game.createEvent('phase', null, evt);
            }
            else {
                evt = null;
                next = game.createEvent('phase');
            }
            if (evt && insert && evt.next.contains(next)) {
                evt.next.remove(next);
                evt.next.unshift(next);
            }
            next.player = this;
            next.skill = skill || _status.event.name;
            next.setContent('phase');
            return next;
        }
        insertEvent(name, content, arg) {
            var evt = _status.event.getParent('phase');
            var next;
            if (evt && evt.parent && evt.parent.next) {
                next = game.createEvent(name, null, evt.parent);
            }
            else {
                next = game.createEvent(name);
            }
            for (var i in arg) {
                next[i] = arg[i];
            }
            next.player = this;
            next.setContent(content);
            return next;
        }
        phase(skill, stageList) {
            var next = game.createEvent('phase');
            next.player = this;
            next.setContent('phase');
            if (!_status.roundStart) {
                _status.roundStart = this;
            }
            if (skill) {
                next.skill = skill;
            }
            if (stageList) {
                next.stageList = stageList;
            }
            return next;
        }
        phaseZhunbei() {
            var next = game.createEvent('phaseZhunbei');
            next.player = this;
            next.setContent('emptyEvent');
            return next;
        }
        phaseJudge() {
            var next = game.createEvent('phaseJudge');
            next.player = this;
            next.setContent('phaseJudge');
            return next;
        }
        phaseDraw() {
            var next = game.createEvent('phaseDraw');
            next.player = this;
            next.num = 2;
            if ((get.config('first_less') || _status.connectMode || _status.first_less_forced) && game.phaseNumber == 1 && _status.first_less) {
                next.num--;
            }
            next.setContent('phaseDraw');
            return next;
        }
        phaseUse() {
            var next = game.createEvent('phaseUse');
            next.player = this;
            next.setContent('phaseUse');
            return next;
        }
        phaseDiscard() {
            var next = game.createEvent('phaseDiscard');
            next.player = this;
            next.setContent('phaseDiscard');
            return next;
        }
        phaseJieshu() {
            var next = game.createEvent('phaseJieshu');
            next.player = this;
            next.setContent('emptyEvent');
            return next;
        }
        chooseToUse(use) {
            var next = game.createEvent('chooseToUse');
            next.player = this;
            if (arguments.length == 1 && get.objtype(arguments[0]) == 'object') {
                for (var i in use) {
                    next[i] = use[i];
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'number' || get.itemtype(arguments[i]) == 'select') {
                        next.selectTarget = arguments[i];
                    }
                    else if ((typeof arguments[i] == 'object' && arguments[i]) || typeof arguments[i] == 'function') {
                        if (get.itemtype(arguments[i]) == 'player' || next.filterCard) {
                            next.filterTarget = arguments[i];
                        }
                        else next.filterCard = arguments[i];
                    }
                    else if (typeof arguments[i] == 'boolean') {
                        next.forced = arguments[i];
                    }
                    else if (typeof arguments[i] == 'string') {
                        next.prompt = arguments[i];
                    }
                }
            }
            if (typeof next.filterCard == 'object') {
                next.filterCard = get.filter(next.filterCard);
            }
            if (typeof next.filterTarget == 'object') {
                next.filterTarget = get.filter(next.filterTarget, 2);
            }
            if (next.filterCard == undefined) {
                next.filterCard = lib.filter.filterCard;
            }
            if (next.selectCard == undefined) {
                next.selectCard = [1, 1];
            }
            if (next.filterTarget == undefined) {
                next.filterTarget = lib.filter.filterTarget;
            }
            if (next.selectTarget == undefined) {
                next.selectTarget = lib.filter.selectTarget;
            }
            next.position = 'hs';
            if (next.ai1 == undefined) next.ai1 = get.order;
            if (next.ai2 == undefined) next.ai2 = get.effect_use;
            next.setContent('chooseToUse');
            next._args = Array.from(arguments);
            return next;
        }
        chooseToRespond() {
            var next = game.createEvent('chooseToRespond');
            next.player = this;
            var filter;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    next.selectCard = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectCard = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    next.position = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.filterCard) next.ai = arguments[i];
                    else next.filterCard = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    next.filterCard = get.filter(arguments[i]);
                    filter = arguments[i];
                }
                else if (arguments[i] == 'nosource') {
                    next.nosource = true;
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
            }
            if (next.filterCard == undefined) next.filterCard = lib.filter.all;
            if (next.selectCard == undefined) next.selectCard = [1, 1];
            if (next.source == undefined && !next.nosource) next.source = _status.event.player;
            if (next.ai == undefined) next.ai = get.unuseful2;
            if (next.prompt != false) {
                if (typeof next.prompt == 'string') {
                    //next.dialog=next.prompt;
                }
                else {
                    var str = '请打出' + get.cnNumber(next.selectCard[0]) + '张'
                    if (filter) {
                        if (filter.name) {
                            str += get.translation(filter.name);
                        }
                        else {
                            str += '牌';
                        }
                    }
                    else {
                        str += '牌';
                    }
                    if (_status.event.getParent().name == 'useCard') {
                        var cardname = _status.event.name;
                        if (lib.card[cardname] && lib.translate[cardname]) {
                            str += '响应' + lib.translate[cardname];
                        }
                    }
                    next.prompt = str;
                }
            }
            next.position = 'hs';
            next.setContent('chooseToRespond');
            next._args = Array.from(arguments);
            return next;
        }
        chooseToDiscard() {
            var next = game.createEvent('chooseToDiscard');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    next.selectCard = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectCard = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'dialog') {
                    next.dialog = arguments[i];
                    next.prompt = false;
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    next.position = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.filterCard) next.ai = arguments[i];
                    else next.filterCard = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    next.filterCard = get.filter(arguments[i]);
                }
                else if (typeof arguments[i] == 'string') {
                    get.evtprompt(next, arguments[i]);
                }
                if (arguments[i] === null) {
                    for (var i = 0; i < arguments.length; i++) {
                        console.log(arguments[i]);
                    }
                }
            }
            if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
            if (next.filterCard == undefined) next.filterCard = lib.filter.all;
            if (next.selectCard == undefined) next.selectCard = [1, 1];
            if (next.ai == undefined) next.ai = get.unuseful;
            next.autochoose = function () {
                if (!this.forced) return false;
                if (typeof this.selectCard == 'function') return false;
                var cards = this.player.getCards(this.position);
                var num = cards.length;
                for (var i = 0; i < cards.length; i++) {
                    if (!lib.filter.cardDiscardable(cards[i], this.player, this)) num--;
                }
                return get.select(this.selectCard)[0] >= num;
            }
            next.setContent('chooseToDiscard');
            next._args = Array.from(arguments);
            return next;
        }
        chooseToCompare(target, check) {
            var next = game.createEvent('chooseToCompare');
            next.player = this;
            if (Array.isArray(target)) {
                next.targets = target;
                if (check) next.ai = check;
                else next.ai = function (card) {
                    if (typeof card == 'string' && lib.skill[card]) {
                        var ais = lib.skill[card].check || function () { return 0 };
                        return ais();
                    }
                    var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -10 : 0;
                    if (card.name == 'du') addi += 5;
                    var source = _status.event.source;
                    var player = _status.event.player;
                    var getn = function (card) {
                        if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13;
                        return get.number(card);
                    }
                    if (source && source != player && get.attitude(player, source) > 1) {
                        return -getn(card) - get.value(card) / 2 + addi;
                    }
                    return getn(card) - get.value(card) / 2 + addi;
                }
                next.setContent('chooseToCompareMultiple');
            }
            else {
                next.target = target;
                if (check) next.ai = check;
                else next.ai = function (card) {
                    if (typeof card == 'string' && lib.skill[card]) {
                        var ais = lib.skill[card].check || function () { return 0 };
                        return ais();
                    }
                    var player = get.owner(card);
                    var getn = function (card) {
                        if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13;
                        return get.number(card);
                    }
                    var event = _status.event.getParent();
                    var to = (player == event.player ? event.target : event.player);
                    var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -10 : 0;
                    if (card.name == 'du') addi += 5;
                    if (player == event.player) {
                        if (get.attitude(player, to) > 0 && event.small) {
                            return -getn(card) - get.value(card) / 2 + addi;
                        }
                        return getn(card) - get.value(card) / 2 + addi;
                    }
                    else {
                        if (get.attitude(player, to) > 0 && !event.small) {
                            return -getn(card) - get.value(card) / 2 + addi;
                        }
                        return getn(card) - get.value(card) / 2 + addi;
                    }
                }
                next.setContent('chooseToCompare');
            }
            next._args = Array.from(arguments);
            return next;
        }
        discoverSkill(list) {
            var next = game.createEvent('discoverSkill');
            next.player = this;
            next.setContent('discoverSkill');
            next.list = list;
            for (var i = 1; i < arguments.length; i++) {
                if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.num = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
                else if (typeof arguments[i] === 'function') {
                    next.ai = arguments[i];
                }
            }
        }
        chooseSkill(target) {
            var next = game.createEvent('chooseSkill');
            next.player = this;
            next.setContent('chooseSkill');
            next.target = target;
            for (var i = 1; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    next.func = arguments[i];
                }
            }
        }
        discoverCard(list) {
            var next = game.createEvent('discoverCard');
            next.player = this;
            next.setContent('discoverCard');
            next.list = list || lib.inpile.slice(0);
            next.forced = true;
            for (var i = 1; i < arguments.length; i++) {
                if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    switch (arguments[i]) {
                        case 'use': next.use = true; break;
                        case 'nogain': next.nogain = true; break;
                        default: next.prompt = arguments[i];
                    }
                }
                else if (typeof arguments[i] == 'number') {
                    next.num = arguments[i];
                }
                else if (typeof arguments[i] === 'function') {
                    next.ai = arguments[i];
                }
            }
            return next;
        }
        chooseCardButton() {
            var cards, prompt, forced, select;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') cards = arguments[i];
                else if (typeof arguments[i] == 'boolean') forced = arguments[i];
                else if (typeof arguments[i] == 'string') prompt = arguments[i];
                else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
            }
            if (prompt == undefined) prompt = '请选择卡牌';
            return this.chooseButton(forced, select, 'hidden', [prompt, cards, 'hidden']);
        }
        chooseVCardButton() {
            var list, prompt, forced, select, notype = false;
            for (var i = 0; i < arguments.length; i++) {
                if (Array.isArray(arguments[i])) {
                    list = arguments[i];
                }
                else if (arguments[i] == 'notype') {
                    notype = true;
                }
                else if (typeof arguments[i] == 'boolean') forced = arguments[i];
                else if (typeof arguments[i] == 'string') prompt = arguments[i];
                else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
            }
            for (var i = 0; i < list.length; i++) {
                list[i] = [notype ? '' : (get.subtype(list[i]) || get.type(list[i])), '', list[i]];
            }
            if (prompt == undefined) prompt = '请选择卡牌';
            return this.chooseButton(forced, select, 'hidden', [prompt, [list, 'vcard'], 'hidden']);
        }
        chooseButton() {
            var next = game.createEvent('chooseButton');
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'dialog') {
                    next.dialog = arguments[i];
                    next.closeDialog = true;
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectButton = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.selectButton = [arguments[i], arguments[i]];
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.ai) next.filterButton = arguments[i];
                    else next.ai = arguments[i];
                }
                else if (Array.isArray(arguments[i])) {
                    next.createDialog = arguments[i];
                }
            }
            next.player = this;
            if (typeof next.forced != 'boolean') next.forced = false;
            if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
            if (next.filterButton == undefined) next.filterButton = lib.filter.filterButton;
            if (next.selectButton == undefined) next.selectButton = [1, 1];
            if (next.ai == undefined) next.ai = function () { return 1 };
            next.setContent('chooseButton');
            next._args = Array.from(arguments);
            next.forceDie = true;
            return next;
        }
        chooseButtonOL(list, callback, ai) {
            var next = game.createEvent('chooseButtonOL');
            next.list = list;
            next.setContent('chooseButtonOL');
            next.ai = ai;
            next.callback = callback;
            next._args = Array.from(arguments);
            return next;
        }
        chooseCardOL() {
            var next = game.createEvent('chooseCardOL');
            next._args = [];
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'players') {
                    next.list = arguments[i].slice(0);
                }
                else {
                    next._args.push(arguments[i]);
                }
            }
            next.setContent('chooseCardOL');
            next._args.add('glow_result');
            return next;
        }
        chooseCard(choose) {
            var next = game.createEvent('chooseCard');
            next.player = this;
            if (arguments.length == 1 && get.is.object(choose)) {
                for (var i in choose) {
                    next[i] = choose[i];
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'number') {
                        next.selectCard = [arguments[i], arguments[i]];
                    }
                    else if (get.itemtype(arguments[i]) == 'select') {
                        next.selectCard = arguments[i];
                    }
                    else if (typeof arguments[i] == 'boolean') {
                        next.forced = arguments[i];
                    }
                    else if (get.itemtype(arguments[i]) == 'position') {
                        next.position = arguments[i];
                    }
                    else if (typeof arguments[i] == 'function') {
                        if (next.filterCard) next.ai = arguments[i];
                        else next.filterCard = arguments[i];
                    }
                    else if (typeof arguments[i] == 'object' && arguments[i]) {
                        next.filterCard = get.filter(arguments[i]);
                    }
                    else if (arguments[i] == 'glow_result') {
                        next.glow_result = true;
                    }
                    else if (typeof arguments[i] == 'string') {
                        get.evtprompt(next, arguments[i]);
                    }
                }
            }
            if (next.filterCard == undefined) next.filterCard = lib.filter.all;
            if (next.selectCard == undefined) next.selectCard = [1, 1];
            if (next.ai == undefined) next.ai = get.unuseful3;
            next.setContent('chooseCard');
            next._args = Array.from(arguments);
            return next;
        }
        chooseUseTarget() {
            var next = game.createEvent('chooseUseTarget');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'players') {
                    next.targets = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.targets = [arguments[i]];
                }
                else if (get.is.object(arguments[i]) && arguments[i].name) {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    if (arguments[i] == 'nopopup') {
                        next.nopopup = true;
                    }
                    else if (arguments[i] == 'noanimate') {
                        next.animate = false;
                    }
                    else if (arguments[i] == 'nothrow') {
                        next.throw = false;
                    }
                    else if (arguments[i] == 'nodistance') {
                        next.nodistance = true;
                    }
                    else if (arguments[i] == 'noTargetDelay') {
                        next.noTargetDelay = true;
                    }
                    else if (arguments[i] == 'nodelayx') {
                        next.nodelayx = true;
                    }
                    else if (lib.card[arguments[i]] && !next.card) {
                        next.card = { name: arguments[i], isCard: true };
                    }
                    else get.evtprompt(next, arguments[i]);
                }
                else if (arguments[i] === true) {
                    next.forced = true;
                }
                else if (arguments[i] === false) {
                    next.addCount = false;
                }
            }
            if (!next.targets) next.targets = game.players.slice(0);
            if (next.cards == undefined) {
                if (get.itemtype(next.card) == 'card') {
                    next.cards = [next.card];
                }
                else next.cards = [];
            }
            else if (next.card == undefined) {
                if (next.cards) {
                    next.card = next.cards[0];
                }
            }
            next.setContent('chooseUseTarget');
            next._args = Array.from(arguments);
            return next;
            // Fully Online-Ready! Enjoy It!
        }
        chooseTarget() {
            var next = game.createEvent('chooseTarget');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    next.selectTarget = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectTarget = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'dialog') {
                    next.dialog = arguments[i];
                    next.prompt = false;
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.filterTarget) next.ai = arguments[i];
                    else next.filterTarget = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    get.evtprompt(next, arguments[i]);
                }
            }
            if (next.filterTarget == undefined) next.filterTarget = lib.filter.all;
            if (next.selectTarget == undefined) next.selectTarget = [1, 1];
            if (next.ai == undefined) next.ai = get.attitude2;
            next.setContent('chooseTarget');
            next._args = Array.from(arguments);
            next.forceDie = true;
            return next;
        }
        chooseCardTarget(choose) {
            var next = game.createEvent('chooseCardTarget');
            next.player = this;
            if (arguments.length == 1) {
                for (var i in choose) {
                    next[i] = choose[i];
                }
            }
            if (typeof next.filterCard == 'object') {
                next.filterCard = get.filter(next.filterCard);
            }
            if (typeof next.filterTarget == 'object') {
                next.filterTarget = get.filter(next.filterTarget, 2);
            }
            if (next.filterCard == undefined || next.filterCard === true) {
                next.filterCard = lib.filter.all;
            }
            if (next.selectCard == undefined) {
                next.selectCard = 1;
            }
            if (next.filterTarget == undefined || next.filterTarget === true) {
                next.filterTarget = lib.filter.all;
            }
            if (next.selectTarget == undefined) {
                next.selectTarget = 1;
            }
            if (next.ai1 == undefined) next.ai1 = get.unuseful2;
            if (next.ai2 == undefined) next.ai2 = get.attitude2;
            next.setContent('chooseCardTarget');
            next._args = Array.from(arguments);
            return next;
        }
        chooseControlList() {
            var list = [];
            var prompt = null;
            var forced = 'cancel2';
            var func = null;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    if (!prompt) {
                        prompt = arguments[i];
                    }
                    else {
                        list.push(arguments[i]);
                    }
                }
                else if (Array.isArray(arguments[i])) {
                    list = arguments[i];
                }
                else if (arguments[i] === true) {
                    forced = null;
                }
                else if (typeof arguments[i] == 'function') {
                    func = arguments[i];
                }
            }
            return this.chooseControl(forced, func).set('choiceList', list).set('prompt', prompt);
        }
        chooseControl() {
            var next = game.createEvent('chooseControl');
            next.controls = [];
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    if (arguments[i] == 'dialogcontrol') {
                        next.dialogcontrol = true;
                    }
                    else if (arguments[i] == 'seperate') {
                        next.seperate = true;
                    }
                    else {
                        next.controls.push(arguments[i]);
                    }
                }
                else if (Array.isArray(arguments[i])) {
                    next.controls = next.controls.concat(arguments[i]);
                }
                else if (typeof arguments[i] == 'function') {
                    next.ai = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.choice = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'dialog') {
                    next.dialog = arguments[i];
                }
            }
            next.player = this;
            if (next.choice == undefined) next.choice = 0;
            next.setContent('chooseControl');
            next._args = Array.from(arguments);
            next.forceDie = true;
            return next;
        }
        chooseBool() {
            var next = game.createEvent('chooseBool');
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'boolean') {
                    next.choice = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    next.ai = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    get.evtprompt(next, arguments[i]);
                }
                else if (get.itemtype(arguments[i]) == 'dialog') {
                    next.dialog = arguments[i];
                }
                if (next.choice == undefined) next.choice = true;
            }
            next.player = this;
            next.setContent('chooseBool');
            next._args = Array.from(arguments);
            next.forceDie = true;
            return next;
        }
        chooseDrawRecover() {
            var next = game.createEvent('chooseDrawRecover', false);
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    if (typeof next.num1 == 'number') {
                        next.num2 = arguments[i];
                    }
                    else {
                        next.num1 = arguments[i];
                    }
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    next.ai = arguments[i];
                }
            }
            if (typeof next.num1 != 'number') {
                next.num1 = 1;
            }
            if (typeof next.num2 != 'number') {
                next.num2 = 1;
            }
            next.setContent('chooseDrawRecover');
            return next;
        }
        choosePlayerCard() {
            var next = game.createEvent('choosePlayerCard');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.target = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.selectButton = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectButton = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    next.position = arguments[i];
                }
                else if (arguments[i] == 'visible') {
                    next.visible = true;
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.ai) next.filterButton = arguments[i];
                    else next.ai = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    next.filterButton = get.filter(arguments[i]);
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
            }
            if (next.filterButton == undefined) next.filterButton = lib.filter.all;
            if (next.position == undefined) next.position = 'he';
            if (next.selectButton == undefined) next.selectButton = [1, 1];
            if (next.ai == undefined) next.ai = function (button) {
                var val = get.buttonValue(button);
                if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
                return val;
            };
            next.setContent('choosePlayerCard');
            next._args = Array.from(arguments);
            return next;
        }
        discardPlayerCard() {
            var next = game.createEvent('discardPlayerCard');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.target = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.selectButton = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectButton = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    next.position = arguments[i];
                }
                else if (arguments[i] == 'visible') {
                    next.visible = true;
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.ai) next.filterButton = arguments[i];
                    else next.ai = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    next.filterButton = get.filter(arguments[i]);
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
            }
            if (next.filterButton == undefined) next.filterButton = lib.filter.all;
            if (next.position == undefined) next.position = 'he';
            if (next.selectButton == undefined) next.selectButton = [1, 1];
            if (next.ai == undefined) next.ai = function (button) {
                var val = get.buttonValue(button);
                if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
                return val;
            };
            next.setContent('discardPlayerCard');
            next._args = Array.from(arguments);
            return next;
        }
        gainPlayerCard() {
            var next = game.createEvent('gainPlayerCard');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.target = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.selectButton = [arguments[i], arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'select') {
                    next.selectButton = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    next.position = arguments[i];
                }
                else if (arguments[i] == 'visible') {
                    next.visible = true;
                }
                else if (arguments[i] == 'visibleMove') {
                    next.visibleMove = true;
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.ai) next.filterButton = arguments[i];
                    else next.ai = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    next.filterButton = get.filter(arguments[i]);
                }
                else if (typeof arguments[i] == 'string') {
                    next.prompt = arguments[i];
                }
            }
            if (next.filterButton == undefined) next.filterButton = lib.filter.all;
            if (next.position == undefined) next.position = 'he';
            if (next.selectButton == undefined) next.selectButton = [1, 1];
            if (next.ai == undefined) next.ai = function (button) {
                var val = get.buttonValue(button);
                if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
                return val;
            };
            next.setContent('gainPlayerCard');
            next._args = Array.from(arguments);
            return next;
        }
        showHandcards(str) {
            var next = game.createEvent('showHandcards');
            next.player = this;
            if (typeof str == 'string') {
                next.prompt = str;
            }
            next.setContent('showHandcards');
            next._args = Array.from(arguments);
            return next;
        }
        showCards(cards, str) {
            var next = game.createEvent('showCards');
            next.player = this;
            next.str = str;
            if (typeof cards == 'string') {
                str = cards;
                cards = next.str;
                next.str = str;
            }
            if (get.itemtype(cards) == 'card') next.cards = [cards];
            else if (get.itemtype(cards) == 'cards') next.cards = cards.slice(0);
            else _status.event.next.remove(next);
            next.setContent('showCards');
            next._args = Array.from(arguments);
            return next;
        }
        viewCards(str, cards) {
            var next = game.createEvent('viewCards');
            next.player = this;
            next.str = str;
            next.cards = cards.slice(0);
            next.setContent('viewCards');
            next._args = Array.from(arguments);
            return next;
        }
        viewHandcards(target) {
            var cards = target.getCards('h');
            if (cards.length) {
                return this.viewCards(get.translation(target) + '的手牌', cards);
            }
            else {
                return false;
            }
        }
        canMoveCard(withatt, nojudge, moveHandcard) {
            var player = this;
            return game.hasPlayer(function (current) {
                var att = get.sgn(get.attitude(player, current));
                if (!withatt || att != 0) {
                    var es = current.getCards('e');
                    for (var i = 0; i < es.length; i++) {
                        if (game.hasPlayer(function (current2) {
                            if (withatt) {
                                if (get.sgn(get.value(es[i], current)) != -att) return false;
                                var att2 = get.sgn(get.attitude(player, current2));
                                if (att == att2 || att2 != get.sgn(get.effect(current2, es[i], player, current2))) return false;
                            }
                            return current != current2 && !current2.isMin() && current2.isEmpty(get.subtype(es[i]));
                        })) {
                            return true;
                        }
                    }
                }
                if (!nojudge && (!withatt || att > 0)) {
                    var js = current.getCards('j');
                    for (var i = 0; i < js.length; i++) {
                        if (game.hasPlayer(function (current2) {
                            if (withatt) {
                                var att2 = get.attitude(player, current2);
                                if (att2 >= 0) return false;
                            }
                            return current != current2 && current2.canAddJudge(js[i]);
                        })) {
                            return true;
                        }
                    }
                }
                if (moveHandcard == true) {
                    if (current.countCards('h') > 0) return true;
                }
            });
        }
        moveCard() {
            var next = game.createEvent('moveCard');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'boolean') {
                    next.forced = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    get.evtprompt(next, arguments[i]);
                }
                else if (typeof arguments[i] == 'function') {
                    if (next.sourceFilterTarget) next.ai = arguments[i];
                    else next.sourceFilterTarget = arguments[i];
                }
                else if (Array.isArray(arguments[i])) {
                    for (var j = 0; j < arguments[i].length; j++) {
                        if (typeof arguments[i][j] != 'string') break;
                    }
                    if (j == arguments[i].length) {
                        next.targetprompt = arguments[i];
                    }
                }
            }
            next.setContent('moveCard');
            next._args = Array.from(arguments);
            return next;
        }
        /**
         * 本角色使用牌或技能；`chooseToUse`时调用
         * @function
         * @param {*} result `chooseToUse`的结果
         * @param {?GameCores.Bases.Event} [event] 父事件，如果不指定，使用当前事件作为父事件
         */
        useResult(result, event) {
            event = event || _status.event;
            if (result._sendskill) {
                lib.skill[result._sendskill[0]] = result._sendskill[1];
            }
            if (event.onresult) {
                event.onresult(result);
            }
            if (result.skill) {
                var info = get.info(result.skill);
                if (info.onuse) {
                    info.onuse(result, this);
                }
                if (info.direct && !info.clearTime) {
                    _status.noclearcountdown = true;
                }
            }
            if (event.logSkill) {
                if (typeof event.logSkill == 'string') {
                    this.logSkill(event.logSkill);
                }
                else if (Array.isArray(event.logSkill)) {
                    this.logSkill.apply(this, event.logSkill);
                }
            }
            if (result.card || !result.skill) {
                result.used = result.card || result.cards[0];
                var next = this.useCard(result.card, result.cards, result.targets, result.skill);
                next.oncard = event.oncard;
                next.respondTo = event.respondTo;
                if (event.addCount === false) {
                    next.addCount = false;
                }
                return next;
            }
            else if (result.skill) {
                result.used = result.skill;
                return this.useSkill(result.skill, result.cards, result.targets);
            }
        }
        useCard() {
            var next = game.createEvent('useCard');
            next.player = this;
            next.num = 0;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'players') {
                    next.targets = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.targets = [arguments[i]];
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    if (arguments[i] == 'noai') {
                        next.noai = true;
                    }
                    else if (arguments[i] == 'nowuxie') {
                        next.nowuxie = true;
                    }
                    else {
                        next.skill = arguments[i];
                    }
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.addCount = arguments[i];
                }
            }
            if (next.cards == undefined) {
                if (get.itemtype(next.card) == 'card') {
                    next.cards = [next.card];
                }
                else next.cards = [];
            }
            else if (next.card == undefined) {
                if (next.cards) {
                    next.card = next.cards[0];
                }
            }
            if (!next.targets) {
                next.targets = [];
            }
            if (next.card) {
                next.card = get.autoViewAs(next.card, false, next.player);
                var info = get.info(next.card);
                if (info.changeTarget) {
                    info.changeTarget(next.player, next.targets);
                }
                if (info.singleCard) {
                    next._targets = next.targets.slice(0);
                    next.target = next.targets[0];
                    next.addedTargets = next.targets.splice(1);
                    if (next.addedTargets.length) {
                        next.addedTarget = next.addedTargets[0];
                    }
                }
                if (!next.card.isCard && next.cards.length) {
                    next.card.cards = next.cards.slice(0);
                }
            }
            for (var i = 0; i < next.targets.length; i++) {
                if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
                    if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
                    this.ai.tempIgnore.add(next.targets[i]);
                }
            }
            if (typeof this.logAi == 'function' && !next.noai && !get.info(next.card).noai) {
                var postAi = get.info(next.card).postAi;
                if (postAi && postAi(next.targets)) {
                    next.postAi = true;
                }
                else {
                    this.logAi(next.targets, next.card);
                }
            }
            next.stocktargets = next.targets.slice(0);
            next.setContent('useCard');
            return next;
        }
        useSkill() {
            var next = game.createEvent('useSkill');
            next.player = this;
            next.num = 0;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'players') {
                    next.targets = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    next.skill = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.addCount = arguments[i];
                }
            }
            if (next.cards == undefined) {
                next.cards = [];
            }
            if (next.skill && get.info(next.skill) && get.info(next.skill).changeTarget) {
                get.info(next.skill).changeTarget(next.player, next.targets);
            }
            if (next.targets) {
                for (var i = 0; i < next.targets.length; i++) {
                    if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
                        if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
                        this.ai.tempIgnore.add(next.targets[i]);
                    }
                }
                if (typeof this.logAi == 'function') {
                    this.logAi(next.targets, next.skill);
                }
            }
            else {
                next.targets = [];
            }
            next.setContent('useSkill');
            return next;
        }
        drawTo(num, args) {
            var num2 = num - this.countCards('h');
            if (!num2) return;
            var next = this.draw(num2);
            if (Array.isArray(args)) {
                for (var i = 0; i < args.length; i++) {
                    if (get.itemtype(args[i]) == 'player') {
                        next.source = args[i];
                    }
                    else if (typeof args[i] == 'boolean') {
                        next.animate = args[i];
                    }
                    else if (args[i] == 'nodelay') {
                        next.animate = false;
                        next.$draw = true;
                    }
                    else if (args[i] == 'visible') {
                        next.visible = true;
                    }
                    else if (args[i] == 'bottom') {
                        next.bottom = true;
                    }
                    else if (typeof args[i] == 'object' && args[i] && args[i].drawDeck != undefined) {
                        next.drawDeck = args[i].drawDeck;
                    }
                }
            }
            return next;
        }
        draw() {
            var next = game.createEvent('draw');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.num = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.animate = arguments[i];
                }
                else if (arguments[i] == 'nodelay') {
                    next.animate = false;
                    next.$draw = true;
                }
                else if (arguments[i] == 'visible') {
                    next.visible = true;
                }
                else if (arguments[i] == 'bottom') {
                    next.bottom = true;
                }
                else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].drawDeck != undefined) {
                    next.drawDeck = arguments[i].drawDeck;
                }
            }
            if (next.num == undefined) next.num = 1;
            if (next.num <= 0) _status.event.next.remove(next);
            next.setContent('draw');
            if (lib.config.mode == 'stone' && _status.mode == 'deck' &&
                next.drawDeck == undefined && !next.player.isMin() && next.num > 1) {
                next.drawDeck = 1;
            }
            return next;
        }
        randomDiscard() {
            var position = 'he', num = 1, delay = null;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    num = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    position = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    delay = arguments[i];
                }
            }
            var cards = this.getCards(position).randomGets(num);
            if (cards.length) {
                var next = this.discard(cards, 'notBySelf');
                if (typeof delay == 'boolean') {
                    next.delay = delay;
                }
            }
            return cards;
        }
        randomGain() {
            var position = 'he', num = 1, target = null, line = false;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    num = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'position') {
                    position = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    target = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    line = arguments[i];
                }
            }
            if (target) {
                var cards = target.getCards(position).randomGets(num);
                if (cards.length) {
                    if (line) {
                        this.line(target, 'green');
                    }
                    this.gain(cards, target, 'log', 'bySelf');
                    target.$giveAuto(cards, this);
                }
                return cards;
            }
            return [];
        }
        discard() {
            var next = game.createEvent('discard');
            next.player = this;
            next.num = 0;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.cards = [arguments[i]];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.animate = arguments[i];
                }
                else if (get.objtype(arguments[i]) == 'div') {
                    next.position = arguments[i];
                }
                else if (arguments[i] == 'notBySelf') {
                    next.notBySelf = true;
                }
            }
            if (next.cards == undefined) _status.event.next.remove(next);
            next.setContent('discard');
            return next;
        }
        respond() {
            var next = game.createEvent('respond');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') next.animate = arguments[i];
                else if (arguments[i] == 'highlight') next.highlight = true;
                else if (arguments[i] == 'noOrdering') next.noOrdering = true;
                else if (typeof arguments[i] == 'string') next.skill = arguments[i];
            }
            if (next.cards == undefined) {
                if (get.itemtype(next.card) == 'card') {
                    next.cards = [next.card];
                }
                else {
                    next.cards = [];
                }
            }
            else if (next.card == undefined) {
                if (next.cards) {
                    next.card = next.cards[0];
                    if (!next.skill) {
                        next.card = get.autoViewAs(next.card, null, next.player);
                    }
                }
            }
            next.setContent('respond');
            return next;
        }
        swapHandcards(target, cards1, cards2) {
            var next = game.createEvent('swapHandcards', false);
            next.player = this;
            next.target = target;
            if (cards1) next.cards1 = cards1;
            if (cards2) next.cards2 = cards2;
            next.setContent('swapHandcards');
            return next;
        }
        directequip(cards) {
            for (var i = 0; i < cards.length; i++) {
                this.$equip(cards[i]);
            }
            if (!_status.video) {
                game.addVideo('directequip', this, get.cardsInfo(cards));
            }
        }
        directgain(cards, broadcast, gaintag) {
            var hs = this.getCards('hs');
            for (var i = 0; i < cards.length; i++) {
                if (hs.contains(cards[i])) {
                    cards.splice(i--, 1);
                }
            }
            for (var i = 0; i < cards.length; i++) {
                cards[i].fix();
                if (gaintag) cards[i].addGaintag(gaintag);
                var sort = lib.config.sort_card(cards[i]);
                if (this == game.me) {
                    cards[i].classList.add('drawinghidden');
                }
                if (get.is.singleHandcard() || sort > 0) {
                    this.node.handcards1.insertBefore(cards[i], this.node.handcards1.firstChild);
                }
                else {
                    this.node.handcards2.insertBefore(cards[i], this.node.handcards2.firstChild);
                }
            }
            if (this == game.me || _status.video) ui.updatehl();
            if (!_status.video) {
                game.addVideo('directgain', this, get.cardsInfo(cards));
                this.update();
            }
            if (broadcast !== false) game.broadcast(function (player, cards) {
                player.directgain(cards);
            }, this, cards);
            return this;
        }
        /**
         * 本角色获取游戏牌到武将牌上，从除本角色武将牌上、手牌外的区域
         * @param {Array<GameCores.GameObjects.Card>} cards 要获取的游戏牌数组，如果一张游戏牌在本角色(手牌|武将牌上)，就从数组中移除它
         * @param {?boolean} [broadcast] 如果为trueh或未指定，通过{@link game.broadcast}同步获取游戏牌；如果为false，本机更新
         * @param {string} [gaintag] 为此次通过此函数移动到武将牌上的每张游戏牌设置`card.gaintag=`
         */
        directgains(cards, broadcast, gaintag) {
            var hs = this.getCards('hs');
            for (var i = 0; i < cards.length; i++) {
                if (hs.contains(cards[i])) {
                    cards.splice(i--, 1);
                }
            }
            var addLast = function (card, node) {
                if (gaintag) {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        var add = node.childNodes[node.childNodes.length - i - 1];
                        if (!add.classList.contains('glows')) break;
                        if (add.hasGaintag(gaintag)) {
                            node.insertBefore(card, add.nextSibling);
                            return;
                        }
                    }
                }
                node.appendChild(card);
            }
            for (var i = 0; i < cards.length; i++) {
                cards[i].fix();
                cards[i].remove();
                if (gaintag) cards[i].addGaintag(gaintag);
                cards[i].classList.add('glows');
                if (this == game.me) {
                    cards[i].classList.add('drawinghidden');
                }
                if (get.is.singleHandcard()) {
                    addLast(cards[i], this.node.handcards1);
                }
                else {
                    addLast(cards[i], this.node.handcards2);
                }
            }
            if (this == game.me || _status.video) ui.updatehl();
            if (!_status.video) {
                game.addVideo('directgains', this, get.cardsInfo(cards));
                this.update();
            }
            if (broadcast !== false) game.broadcast(function (player, cards, gaintag) {
                player.directgains(cards, null, gaintag);//[recommend] use false instead of null
            }, this, cards, gaintag);
            return this;
        }
        gainMultiple(targets, position) {
            var next = game.createEvent('gainMultiple', false);
            next.setContent('gainMultiple');
            next.player = this;
            next.targets = targets;
            next.position = position || 'h';
            return next;
        }
        gain() {
            var next = game.createEvent('gain');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.cards = [arguments[i]];
                }
                else if (arguments[i] === 'log') {
                    next.log = true;
                }
                else if (arguments[i] == 'fromStorage') {
                    next.fromStorage = true;
                }
                else if (arguments[i] == 'bySelf') {
                    next.bySelf = true;
                }
                else if (typeof arguments[i] == 'string') {
                    next.animate = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.delay = arguments[i];
                }
            }
            if (next.animate == 'gain2' || next.animate == 'draw2') {
                if (!next.hasOwnProperty('log')) {
                    next.log = true;
                }
            }
            next.setContent('gain');
            next.getl = function (player) {
                var that = this;
                var map = {
                    player: player,
                    hs: [],
                    es: [],
                    js: [],
                    ss: [],
                    cards: [],
                    cards2: [],
                };
                player.getHistory('lose', function (evt) {
                    if (evt.parent == that) {
                        map.hs.addArray(evt.hs);
                        map.es.addArray(evt.es);
                        map.js.addArray(evt.js);
                        map.ss.addArray(evt.ss);
                        map.cards.addArray(evt.cards);
                        map.cards2.addArray(evt.cards2);
                    }
                });
                if (map.cards.length > 0 || map.ss.length > 0) return map;
            };
            next.gaintag = [];
            return next;
        }
        give(cards, target, visible) {
            var next = target.gain(cards, this);
            next.animate = visible ? 'give' : 'giveAuto';
        }
        lose() {
            var next = game.createEvent('lose');
            next.player = this;
            next.forceDie = true;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.cards = [arguments[i]];
                }
                else if (get.objtype(arguments[i]) == 'div') {
                    next.position = arguments[i];
                }
                else if (arguments[i] == 'toStorage') {
                    next.toStorage = true;
                }
                else if (arguments[i] == 'visible') {
                    next.visible = true;
                }
                else if (arguments[i] == 'insert') {
                    next.insert_card = true;
                }
            }
            if (next.cards) {
                var hej = this.getCards('hejs');
                for (var i = 0; i < next.cards.length; i++) {
                    if (!hej.contains(next.cards[i])) {
                        next.cards.splice(i--, 1);
                    }
                }
            }
            if (!next.cards || !next.cards.length) {
                _status.event.next.remove(next);
            }
            else {
                if (next.position == undefined) next.position = ui.discardPile;
                next.cards = next.cards.slice(0);
            }
            next.setContent('lose');
            next.getl = function (player) {
                if (this.getlx !== false && this.player == player) return this;
            };
            return next;
        }
        damage() {
            var next = game.createEvent('damage');
            //next.forceDie=true;
            next.player = this;
            var nocard, nosource;
            var event = _status.event;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.num = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                    next.card = arguments[i];
                }
                else if (arguments[i] == 'nocard') {
                    nocard = true;
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
                else if (arguments[i] == 'notrigger') {
                    next._triggered = null;
                    next.notrigger = true;
                }
                else if (get.itemtype(arguments[i]) == 'nature') {
                    next.nature = arguments[i];
                }
            }
            if (next.card == undefined && !nocard) next.card = event.card;
            if (next.cards == undefined && !nocard) next.cards = event.cards;
            if (next.source == undefined && !nosource) next.source = event.player;
            if (next.source && next.source.isDead()) delete next.source;
            if (next.num == undefined) next.num = 1;
            if (next.nature == 'poison') delete next._triggered;
            next.setContent('damage');
            next.filterStop = function () {
                if (this.source && this.source.isDead()) delete this.source;
                if (this.num <= 0) {
                    delete this.filterStop;
                    this.trigger('damageZero');
                    this.finish();
                    this._triggered = null;
                    return true;
                }
            };
            return next;
        }
        recover() {
            var next = game.createEvent('recover');
            next.player = this;
            var nocard, nosource;
            var event = _status.event;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'cards') {
                    next.cards = arguments[i].slice(0);
                }
                else if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'number') {
                    next.num = arguments[i];
                }
                else if (arguments[i] == 'nocard') {
                    nocard = true;
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
            }
            if (next.card == undefined && !nocard) next.card = event.card;
            if (next.cards == undefined && !nocard) next.cards = event.cards;
            if (next.source == undefined && !nosource) next.source = event.player;
            if (next.num == undefined) next.num = 1;
            if (next.num <= 0) _status.event.next.remove(next);
            next.setContent('recover');
            return next;
        }
        doubleDraw() {
            if (get.is.changban()) return;
            var next = game.createEvent('doubleDraw');
            next.player = this;
            next.setContent('doubleDraw');
            return next;
        }
        loseHp(num) {
            var next = game.createEvent('loseHp');
            next.num = num;
            next.player = this;
            if (next.num == undefined) next.num = 1;
            next.setContent('loseHp');
            return next;
        }
        loseMaxHp() {
            var next = game.createEvent('loseMaxHp');
            next.player = this;
            var nosource;
            var event = _status.event;
            next.num = 1;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] === 'number') {
                    next.num = arguments[i];
                }
                else if (typeof arguments[i] === 'boolean') {
                    next.forced = arguments[i];
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
            }
            if (next.source == undefined && !nosource) next.source = event.player;
            next.setContent('loseMaxHp');
            return next;
        }
        gainMaxHp() {
            var next = game.createEvent('gainMaxHp');
            next.player = this;
            var nosource;
            var event = _status.event;
            next.num = 1;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === 'number') {
                    next.num = arguments[i];
                }
                else if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (typeof arguments[i] === 'boolean') {
                    next.forced = arguments[i];
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
            }
            if (next.source == undefined && !nosource) next.source = event.player;
            next.setContent('gainMaxHp');
            return next;
        }
        changeHp(num, popup) {
            var next = game.createEvent('changeHp', false);
            next.num = num;
            if (popup != undefined) next.popup = popup;
            next.player = this;
            next.setContent('changeHp');
            return next;
        }

        changeHujia(num, type) {
            var next = game.createEvent('changeHujia');
            if (typeof num != 'number') {
                num = 1;
            }
            next.num = num;
            next.player = this;
            if (type) next.type = type;
            next.setContent('changeHujia');
            return next;
        }
        getBuff() {
            var list = [1, 2, 3, 4, 5, 6];
            var nodelay = false;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    list.remove(arguments[i]);
                }
                else if (arguments[i] === false) {
                    nodelay = true;
                }
            }
            if (this.isHealthy()) {
                list.remove(2);
            }
            if (!this.countCards('j')) {
                list.remove(5);
            }
            if (!this.isLinked() && !this.isTurnedOver()) {
                list.remove(6);
            }
            if (this.hasSkill('qianxing')) {
                list.remove(4);
            }
            switch (list.randomGet()) {
                case 1: this.draw(nodelay ? 'nodelay' : 1); break;
                case 2: this.recover(); break;
                case 3: this.changeHujia(); break;
                case 4: this.tempHide();
                case 5: this.discard(this.getCards('j')).delay = (!nodelay); break;
                case 6: {
                    if (this.isLinked()) this.link();
                    if (this.isTurnedOver()) this.turnOver();
                    break;
                }
            }
            return this;
        }
        getDebuff() {
            var list = [1, 2, 3, 4, 5, 6];
            var nodelay = false;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'number') {
                    list.remove(arguments[i]);
                }
                else if (arguments[i] === false) {
                    nodelay = true;
                }
            }
            if (this.countCards('he') == 0) {
                list.remove(1);
            }
            if (this.isLinked()) {
                list.remove(4);
            }
            if (this.hasSkill('fengyin')) {
                list.remove(5);
            }
            if (this.hp == 1) {
                list.remove(3);
                if (list.length > 1) list.remove(2);
            }
            if (!list.length) return this;
            var num = list.randomGet();
            switch (list.randomGet()) {
                case 1: this.randomDiscard(nodelay ? false : 'he'); break;
                case 2: this.loseHp(); break;
                case 3: this.damage(); break;
                case 4: if (!this.isLinked()) this.link(); break;
                case 5: this.addTempSkill('fengyin', { player: 'phaseAfter' }); break;
                case 6: {
                    var list = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var info = lib.card[lib.inpile[i]];
                        if (info.type == 'delay' && !info.cancel && !this.hasJudge(lib.inpile[i])) {
                            list.push(lib.inpile[i]);
                        }
                    }
                    if (list.length) {
                        var card = game.createCard(list.randomGet());
                        this.addJudge(card);
                        this.$draw(card);
                        if (!nodelay) game.delay();
                    }
                    else {
                        this.getDebuff(6);
                    }
                    break;
                }
            }
            return this;
        }
        dying(reason) {
            if (this.nodying || this.hp > 0 || this.isDying()) return;
            var next = game.createEvent('dying');
            next.player = this;
            next.reason = reason;
            if (reason && reason.source) next.source = reason.source;
            next.setContent('dying');
            next.filterStop = function () {
                if (this.player.hp > 0) {
                    delete this.filterStop;
                    return true;
                }
            };
            return next;
        }
        die(reason) {
            var next = game.createEvent('die');
            next.player = this;
            next.reason = reason;
            if (reason) next.source = reason.source;
            next.setContent('die');
            return next;
        }
        revive(hp, log) {
            if (log !== false) game.log(this, '复活');
            if (this.maxHp < 1) this.maxHp = 1;
            if (hp) this.hp = hp;
            else {
                this.hp = 1;
            }
            game.addVideo('revive', this);
            this.classList.remove('dead');
            this.removeAttribute('style');
            this.node.avatar.style.transform = '';
            this.node.avatar2.style.transform = '';
            this.node.hp.show();
            this.node.equips.show();
            this.node.count.show();
            this.update();
            var player;
            player = this.previousSeat;
            while (player.isDead()) player = player.previousSeat;
            player.next = this;
            this.previous = player;
            player = this.nextSeat;
            while (player.isDead()) player = player.nextSeat;
            player.previous = this;
            this.next = player;
            game.players.add(this);
            game.dead.remove(this);
            if (this == game.me) {
                if (ui.auto) ui.auto.show();
                if (ui.wuxie) ui.wuxie.show();
                if (ui.revive) {
                    ui.revive.close();
                    delete ui.revive;
                }
                if (ui.exit) {
                    ui.exit.close();
                    delete ui.exit;
                }
                if (ui.swap) {
                    ui.swap.close();
                    delete ui.swap;
                }
                if (ui.restart) {
                    ui.restart.close();
                    delete ui.restart;
                }
                if (ui.continue_game) {
                    ui.continue_game.close();
                    delete ui.continue_game;
                }
            }
        }
        /**
         * 返回本角色是否处于混乱状态
         * @returns {!boolean}
         */
        isMad() {
            return this.hasSkill('mad');
        }
        /**
         * 令本角色进入混乱状态；
         * 此函数会输出日志
         * @param {(string|Object)} [end] 结束时点，下一次触发该时点时结束本角色结束混乱状态；如果未指定，默认为'phaseAfter'
         */
        goMad(end) {
            if (end) {
                this.addTempSkill('mad', end);
            }
            else {
                this.addSkill('mad');
            }
            game.log(this, '进入混乱状态');
        }
        /**
         * 令本角色移除混乱状态
         */
        unMad() {
            this.removeSkill('mad');
        }
        tempHide() {
            this.addTempSkill('qianxing', { player: 'phaseBegin' });
        }
        addExpose(num) {
            if (typeof this.ai.shown == 'number' && !this.identityShown && this.ai.shown < 1) {
                this.ai.shown += num;
                if (this.ai.shown > 0.95) {
                    this.ai.shown = 0.95;
                }
            }
            return this;
        }
        equip(card, arg2) {
            if (get.type(card) != 'equip') return;
            var next = game.createEvent('equip');
            next.card = card;
            if (get.is.object(next.card) && get.itemtype(next.card.cards) == 'cards' && get.name(next.card.cards[0]) == next.card.name && next.card.cards.length == 1) next.card = next.card.cards[0];
            next.player = this;
            if (arg2) {
                if (arg2 === true) {
                    next.draw = true;
                } else {
                    next.cards = arg2;
                }
            }
            if (!next.cards) next.cards = [next.card];
            if (get.itemtype(next.cards) == 'card') next.cards = [next.cards];
            next.setContent(lib.element.content.equip);
            next.getl = function (player) {
                var that = this;
                var map = {
                    player: player,
                    hs: [],
                    es: [],
                    js: [],
                    ss: [],
                    cards: [],
                    cards2: [],
                };
                player.getHistory('lose', function (evt) {
                    if (evt.parent == that) {
                        map.hs.addArray(evt.hs);
                        map.es.addArray(evt.es);
                        map.js.addArray(evt.js);
                        map.ss.addArray(evt.ss);
                        map.cards.addArray(evt.cards);
                        map.cards2.addArray(evt.cards2);
                    }
                });
                if (map.cards.length > 0 || map.ss.length > 0) return map;
            };
            return next;
        }
        addJudge(card, cards) {
            var next = game.createEvent('addJudge');
            next.card = card;
            next.cards = cards;
            if (next.cards == undefined) next.cards = [card];
            if (get.itemtype(next.cards) == 'card') next.cards = [next.cards];
            next.player = this;
            next.setContent('addJudge');
            next.getl = function (player) {
                var that = this;
                var map = {
                    player: player,
                    hs: [],
                    es: [],
                    js: [],
                    ss: [],
                    cards: [],
                    cards2: [],
                };
                player.getHistory('lose', function (evt) {
                    if (evt.parent == that) {
                        map.hs.addArray(evt.hs);
                        map.es.addArray(evt.es);
                        map.js.addArray(evt.js);
                        map.ss.addArray(evt.ss);
                        map.cards.addArray(evt.cards);
                        map.cards2.addArray(evt.cards2);
                    }
                });
                if (map.cards.length > 0 || map.ss.length > 0) return map;
            };
            return next;
        }
        canAddJudge(card) {
            if (this.storage._disableJudge) return false;
            var name;
            if (typeof card == 'string') {
                name = card;
            }
            else {
                name = card.viewAs || card.name;
            }
            if (!name) return false;
            if (this.hasJudge(name)) return false;
            var mod = game.checkMod(card, this, this, 'unchanged', 'targetEnabled', this);
            if (mod != 'unchanged') return mod;
            return true;
        }
        addJudgeNext(card) {
            if (!card.expired) {
                var target = this.next;
                var name = card.viewAs || card.name;
                var bool = false;
                for (var iwhile = 0; iwhile < 20; iwhile++) {
                    if (target.canAddJudge(card)) {
                        bool = true; break;
                    }
                    target = target.next;
                }
                if (!bool) {
                    game.log(card, '进入了弃牌堆');
                    game.cardsDiscard(card);
                }
                else {
                    if (card.name != name) {
                        target.addJudge(name, card);
                    }
                    else {
                        target.addJudge(card);
                    }
                }
            }
            else {
                card.expired = false;
            }
        }
        /**
         * 判定事件
         * @returns {!boolean}
         */
        judge() {
            var next = game.createEvent('judge');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'card') {
                    next.card = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    next.skill = arguments[i];
                }
                else if (typeof arguments[i] == 'function') {
                    next.judge = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    next.clearArena = arguments[i];
                }
                else if (get.objtype(arguments[i]) == 'div') {
                    next.position = arguments[i];
                }
            }
            if (next.card && next.judge == undefined) {
                next.judge = get.judge(next.card);
            }
            if (next.judge == undefined) next.judge = function () { return 0 };
            if (next.position == undefined) next.position = ui.discardPile;
            if (next.card) next.cardname = next.card.viewAs || next.card.name;

            var str = '';
            if (next.card) str = get.translation(next.card.viewAs || next.card.name);
            else if (next.skill) str = get.translation(next.skill);
            else str = get.translation(_status.event.name);
            next.judgestr = str;
            next.setContent('judge');
            return next;
        }
        /**
         * 翻面事件
         * @returns {!boolean}
         */
        turnOver(bool) {
            if (typeof bool == 'boolean') {
                if (bool) {
                    if (this.isTurnedOver()) return;
                }
                else {
                    if (!this.isTurnedOver()) return;
                }
            }
            var next = game.createEvent('turnOver');
            next.player = this;
            var nosource;
            var event = _status.event;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
            }
            if (next.source == undefined && !nosource) next.source = event.player;
            next.setContent('turnOver');
            return next;
        }
        out(skill) {
            if (typeof skill == 'number') {
                this.outCount += skill;
            }
            else if (typeof skill == 'string') {
                if (!this.outSkills) {
                    this.outSkills = [];
                }
                this.outSkills.add(skill);
            }
            else {
                this.outCount++;
            }
            if (!this.classList.contains('out')) {
                this.classList.add('out');
                game.log(this, '离开游戏');
            }
            if (!game.countPlayer()) {
                game.over();
            }
        }
        in(skill) {
            if (this.isOut()) {
                if (typeof skill == 'string') {
                    if (this.outSkills) {
                        this.outSkills.remove(skill);
                        if (!this.outSkills.length) {
                            delete this.outSkills;
                        }
                    }
                }
                else if (typeof skill == 'number') {
                    this.outCount -= skill;
                }
                else {
                    if (skill === true) {
                        delete this.outSkills;
                    }
                    this.outCount = 0;
                }
                if (this.outCount <= 0 && !this.outSkills) {
                    this.outCount = 0;
                    this.classList.remove('out');
                    game.log(this, '进入游戏');
                }
            }
        }
        /**
         * 横置事件
         * @returns {!boolean}
         */
        link(bool) {
            if (typeof bool == 'boolean') {
                if (bool) {
                    if (this.isLinked()) return;
                }
                else {
                    if (!this.isLinked()) return;
                }
            }
            var next = game.createEvent('link');
            next.player = this;
            var nosource;
            var event = _status.event;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    next.source = arguments[i];
                }
                else if (arguments[i] == 'nosource') {
                    nosource = true;
                }
            }
            if (next.source == undefined && !nosource) next.source = event.player;
            next.setContent('link');
            return next;
        }
        skip(name) {
            this.skipList.add(name);
        }
        wait(callback) {
            if (lib.node) {
                if (typeof callback == 'function') {
                    callback._noname_waiting = true;
                    lib.node.torespond[this.playerid] = callback;
                }
                else {
                    lib.node.torespond[this.playerid] = '_noname_waiting';
                }
                clearTimeout(lib.node.torespondtimeout[this.playerid]);
                if (this.ws && !this.ws.closed) {
                    var player = this;
                    var time = parseInt(lib.configOL.choose_timeout) * 1000;
                    if (ui.arena && ui.arena.classList.contains('choose-character') && lib.configOL.chooseCharacter_timeout) {
                        time *= 5;
                    }
                    if (_status.event.getParent().skillHidden) {
                        for (var i = 0; i < game.players.length; i++) {
                            game.players[i].showTimer(time);
                        }
                        player._hide_all_timer = true;
                    }
                    else if (!_status.event._global_waiting) {
                        player.showTimer(time);
                    }
                    lib.node.torespondtimeout[this.playerid] = setTimeout(function () {
                        player.unwait('ai');
                        player.ws.ws.close();
                    }, time + 5000);
                }
            }
        }
        unwait(result) {
            if (this._hide_all_timer) {
                delete this._hide_all_timer;
                for (var i = 0; i < game.players.length; i++) {
                    game.players[i].hideTimer();
                }
            }
            else if (!_status.event._global_waiting) {
                this.hideTimer();
            }
            clearTimeout(lib.node.torespondtimeout[this.playerid]);
            delete lib.node.torespondtimeout[this.playerid];
            if (!lib.node.torespond.hasOwnProperty(this.playerid)) {
                return;
            }
            var noresume = false;
            var proceed = null;
            if (typeof lib.node.torespond[this.playerid] == 'function' && lib.node.torespond[this.playerid]._noname_waiting) {
                proceed = lib.node.torespond[this.playerid](result, this);
                if (proceed === false) {
                    noresume = true;
                }
            }
            lib.node.torespond[this.playerid] = result;
            for (var i in lib.node.torespond) {
                if (lib.node.torespond[i] == '_noname_waiting') {
                    return;
                }
                else if (lib.node.torespond[i] && lib.node.torespond[i]._noname_waiting) {
                    return;
                }
            }
            _status.event.result = result;
            _status.event.resultOL = lib.node.torespond;
            lib.node.torespond = {};
            if (typeof proceed == 'function') proceed();
            else if (_status.paused && !noresume) game.resume();
        }
        /**
         * 
         * @returns {!boolean}
         */
        logSkill(name, targets, nature, logv, audio) {
            if (get.itemtype(targets) == 'player') targets = [targets];
            var nopop = false;
            var popname = name;
            if (Array.isArray(name)) {
                popname = name[1];
                name = name[0];
            }
            var checkShow = this.checkShow(name);
            if (lib.translate[name]) {
                this.trySkillAnimate(name, popname, checkShow);
                if (typeof targets == 'object' && targets.length) {
                    var str;
                    if (targets[0] == this) {
                        str = '#b自己';
                        if (targets.length > 1) {
                            str += '、';
                            str += get.translation(targets.slice(1));
                        }
                    }
                    else str = targets;
                    game.log(this, '对', str, '发动了', '#p『' + get.skillTranslation(name, this) + '』');
                }
                else {
                    game.log(this, '发动了', '#p『' + get.skillTranslation(name, this) + '』');
                }
            }
            if (nature != false) {
                if (nature === undefined) {
                    nature = 'green';
                }
                this.line(targets, nature);
            }
            var info = lib.skill[name];
            if (info && info.ai && info.ai.expose != undefined &&
                this.logAi && (!targets || targets.length != 1 || targets[0] != this)) {
                this.logAi(lib.skill[name].ai.expose);
            }
            if (info && info.round) {
                var roundname = name + '_roundcount';
                this.storage[roundname] = game.roundNumber;
                this.syncStorage(roundname);
                this.markSkill(roundname);
            }
            if (audio !== false) {
                game.trySkillAudio(name, this, true);
            }
            if (game.chess) {
                this.chessFocus();
            }
            if (logv === true) {
                game.logv(this, name, targets, null, true);
            }
            else if (info && info.logv !== false) {
                game.logv(this, name, targets);
            }
            if (this._hookTrigger) {
                for (var i = 0; i < this._hookTrigger.length; i++) {
                    var info = lib.skill[this._hookTrigger[i]].hookTrigger;
                    if (info && info.log) {
                        info.log(this, name, targets);
                    }
                }
            }
        }
        unprompt() {
            if (this.node.prompt) {
                this.node.prompt.delete();
                delete this.node.prompt;
            }
        }
        prompt(str, nature) {
            var node;
            if (this.node.prompt) {
                node = this.node.prompt;
                node.innerHTML = '';
                node.className = 'damage normal-font damageadded';
            }
            else {
                node = ui.create.div('.damage.normal-font', this);
                this.node.prompt = node;
                ui.refresh(node);
                node.classList.add('damageadded');
            }
            node.innerHTML = str;
            node.dataset.nature = nature || 'soil';
        }
        prompt_old(name2, className) {
            var node;
            if (this.node.prompt) {
                node = this.node.prompt;
                node.innerHTML = '';
                node.className = 'popup';
            }
            else {
                node = ui.create.div('.popup', this.parentNode);
                this.node.prompt = node;
            }
            node.dataset.position = this.dataset.position;
            if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
                typeof name2 == 'number' || this.classList.contains('minskin')) {
                node.innerHTML = name2;
            }
            else {
                for (var i = 0; i < name2.length; i++) {
                    node.innerHTML += name2[i] + '<br/>';
                }
            }
            if (className) {
                node.classList.add(className);
            }
        }
        /**
         * 文字弹出动画效果
         * [recommend] 令人迷惑的是，此函数实质调用了{@link lib.element.player.$damagepop}，而不是{@link lib.element.player.$damagepop}调用此函数
         * @param {!string} name (技能|角色|游戏牌)名或其他任意非空字符串
         * @param {string} [classname='water'] 效果色
         * @param {?boolean} [nobroadcast] 如果为true，则
         */
        popup(name, className, nobroadcast) {
            var name2 = get.translation(name);
            if (!name2) return;
            this.$damagepop(name2, className || 'water', true, nobroadcast);
        }
        popup_old(name, className) {
            var name2 = get.translation(name);
            var node = ui.create.div('.popup', this.parentNode);
            if (!name2) {
                node.remove();
                return node;
            }
            game.addVideo('popup', this, [name, className]);
            node.dataset.position = this.dataset.position;
            if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
                typeof name2 == 'number' || this.classList.contains('minskin')) {
                node.innerHTML = name2;
            }
            else {
                for (var i = 0; i < name2.length; i++) {
                    node.innerHTML += name2[i] + '<br/>';
                }
            }
            if (className) {
                node.classList.add(className);
            }
            this.popups.push(node);
            if (this.popups.length > 1) {
                node.hide();
            }
            else {
                var that = this;
                setTimeout(function () { that._popup(); }, 1000);
            }
            return node;
        }
        _popup() {
            if (this.popups.length) {
                this.popups.shift().delete();
                if (this.popups.length) {
                    this.popups[0].show();
                    var that = this;
                    setTimeout(function () { that._popup(); }, 1000);
                }
            }
        }
        showTimer(time) {
            if (!time && lib.configOL) {
                time = parseInt(lib.configOL.choose_timeout) * 1000;
            }
            // if(ui.arena&&ui.arena.classList.contains('choose-character')&&lib.configOL.chooseCharacter_timeout){
            // 	time *= 5;
            // }
            if (_status.connectMode && !game.online) {
                game.broadcast(function (player, time) {
                    player.showTimer(time);
                }, this, time);
            }
            if (this == game.me) {
                return;
            }
            if (this.node.timer) {
                this.node.timer.remove();
            }
            var timer = ui.create.div('.timerbar', this);
            this.node.timer = timer;
            ui.create.div(this.node.timer);
            var bar = ui.create.div(this.node.timer);
            ui.refresh(bar);
            bar.style.transitionDuration = (time / 1000) + 's';
            bar.style.width = 0;
        }
        hideTimer() {
            if (_status.connectMode && !game.online && this.playerid) {
                game.broadcast(function (player) {
                    player.hideTimer();
                }, this);
            }
            if (this.node.timer) {
                this.node.timer.delete();
                delete this.node.timer;
            }
        }
        markAuto(name, info) {
            if (Array.isArray(info)) {
                if (!Array.isArray(this.storage[name])) this.storage[name] = [];
                this.storage[name].addArray(info);
                this.markSkill(name);
            }
            else {
                var storage = this.storage[name];
                if (Array.isArray(storage)) {
                    this[storage.length > 0 ? 'markSkill' : 'unmarkSkill'](name);
                }
                else if (typeof storage == 'number') {
                    this[storage.length > 0 ? 'markSkill' : 'unmarkSkill'](name);
                }
            }
        }
        unmarkAuto(name, info) {
            var storage = this.storage[name]
            if (Array.isArray(info) && Array.isArray(storage)) {
                storage.removeArray(info.slice(0));
                this.markAuto(name);
            }
        }
        getStorage(name) {
            return this.storage[name] || [];
        }
        markSkill(name, info, card) {
            if (info === true) {
                this.syncStorage(name);
                info = null;
            }
            if (get.itemtype(card) == 'card') {
                game.addVideo('markSkill', this, [name, get.cardInfo(card)]);
            }
            else {
                game.addVideo('markSkill', this, [name]);
            }
            game.broadcastAll(function (storage, player, name, info, card) {
                if (storage != undefined) {
                    player.storage[name] = storage;
                }
                if (!info) {
                    if (player.marks[name]) {
                        player.updateMarks();
                        return;
                    }
                    if (lib.skill[name]) {
                        info = lib.skill[name].intro;
                    }
                    if (!info) {
                        return;
                    }
                }
                if (player.marks[name]) {
                    player.marks[name].info = info;
                }
                else {
                    if (card) {
                        player.marks[name] = player.mark(card, info, name);
                    }
                    else {
                        player.marks[name] = player.mark(name, info);
                    }
                }
                player.updateMarks();
            }, this.storage[name], this, name, info, card);
            return this;
        }
        unmarkSkill(name) {
            game.addVideo('unmarkSkill', this, name);
            game.broadcast(function (player, name) {
                if (player.marks[name]) {
                    player.marks[name].delete();
                    player.marks[name].style.transform += ' scale(0.2)';
                    delete player.marks[name];
                    ui.updatem(player);
                }
            }, this, name);
            if (this.marks[name]) {
                this.marks[name].delete();
                this.marks[name].style.transform += ' scale(0.2)';
                delete this.marks[name];
                ui.updatem(this);
                var info = lib.skill[name];
                if (info && info.intro && info.intro.onunmark) {
                    if (info.intro.onunmark == 'throw') {
                        if (get.itemtype(this.storage[name]) == 'cards') {
                            this.$throw(this.storage[name], 1000);
                            game.cardsDiscard(this.storage[name]);
                            game.log(this.storage[name], '进入了弃牌堆');
                            this.storage[name].length = 0;
                        }
                    }
                    else if (typeof info.intro.onunmark == 'function') {
                        info.intro.onunmark(this.storage[name], this);
                    }
                }
            }
            return this;
        }
        markSkillCharacter(id, target, name, content) {
            if (typeof target == 'object') {
                target = target.name;
            }
            game.broadcastAll(function (player, target, name, content, id) {
                if (player.marks[id]) {
                    player.marks[id].name = name + '_charactermark';
                    player.marks[id]._name = target;
                    player.marks[id].info = {
                        name: name,
                        content: content,
                        id: id
                    };
                    player.marks[id].setBackground(target, 'character');
                    game.addVideo('changeMarkCharacter', player, {
                        id: id,
                        name: name,
                        content: content,
                        target: target
                    });
                }
                else {
                    player.marks[id] = player.markCharacter(target, {
                        name: name,
                        content: content,
                        id: id
                    });
                    player.marks[id]._name = target;
                    game.addVideo('markCharacter', player, {
                        name: name,
                        content: content,
                        id: id,
                        target: target
                    });
                }
            }, this, target, name, content, id);
            return this;
        }
        markCharacter(name, info, learn, learn2) {
            if (typeof name == 'object') {
                name = name.name;
            }
            var node;
            if (name.indexOf('unknown') == 0) {
                node = ui.create.div('.card.mark.drawinghidden');
                ui.create.div('.background.skillmark', node).innerHTML = get.translation(name)[0];
            }
            else {
                if (!lib.character[name]) return;
                node = ui.create.div('.card.mark.drawinghidden').setBackground(name, 'character');
            }
            this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
            node.name = name + '_charactermark';
            if (!info) {
                info = {};
            }
            if (!info.name) {
                info.name = get.translation(name);
            }
            if (!info.content) {
                info.content = get.skillintro(name, learn, learn2)
            }
            node.info = info;
            node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
            if (!lib.config.touchscreen) {
                if (lib.config.hover_all) {
                    lib.setHover(node, ui.click.hoverplayer);
                }
                if (lib.config.right_info) {
                    node.oncontextmenu = ui.click.rightplayer;
                }
            }
            ui.updatem(this);
            return node;
        }
        /**
         * 标记
         * @function
         * @param {(Array<Card>|Card|string)} name 
         * @param {*} info mark info
         * @param {*} skill 
         * @returns {*}
         */
        mark(name, info, skill) {
            if (get.itemtype(name) == 'cards') {
                var marks = [];
                for (var i = 0; i < name.length; i++) {
                    marks.push(this.mark(name[i], info));
                }
                return marks;
            }
            else {
                var node;
                if (get.itemtype(name) == 'card') {
                    node = name.copy('mark');
                    node.classList.add('drawinghidden');
                    this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
                    node.suit = name.suit;
                    node.number = name.number;
                    // if(name.name&&lib.card[name.name]&&lib.card[name.name].markimage){
                    //     node.node.image.style.left=lib.card[name.name].markimage;
                    // }

                    if (name.classList.contains('fullborder')) {
                        node.classList.add('fakejudge');
                        node.classList.add('fakemark');
                        (node.querySelector('.background') || ui.create.div('.background', node)).innerHTML = lib.translate[name.name + '_bg'] || get.translation(name.name)[0];
                    }

                    name = name.name;
                }
                else {
                    node = ui.create.div('.card.mark.drawinghidden');
                    this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
                    var str = lib.translate[name + '_bg'];
                    if (!str || str[0] == '+' || str[0] == '-') {
                        str = get.translation(name)[0];
                    }
                    ui.create.div('.background.skillmark', node).innerHTML = str;
                    // node.style.fontFamily=lib.config.card_font;
                }
                node.name = name;
                node.skill = skill || name;
                if (typeof info == 'object') {
                    node.info = info;
                }
                else if (typeof info == 'string') {
                    node.markidentifer = info;
                }
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
                if (!lib.config.touchscreen) {
                    if (lib.config.hover_all) {
                        lib.setHover(node, ui.click.hoverplayer);
                    }
                    if (lib.config.right_info) {
                        node.oncontextmenu = ui.click.rightplayer;
                    }
                }
                this.updateMarks();
                ui.updatem(this);
                return node;
            }
        }
        /**
         * 取消标记
         * @function
         * @param {*} name
         * @param {*} info
         */
        unmark(name, info) {
            game.addVideo('unmarkname', this, name);
            if (get.itemtype(name) == 'card') {
                this.unmark(name.name, info);
            }
            else if (get.itemtype(name) == 'cards') {
                for (var i = 0; i < name.length; i++) {
                    this.unmark(name[i].name, info);
                }
            }
            else {
                for (var i = 0; i < this.node.marks.childNodes.length; i++) {
                    if (this.node.marks.childNodes[i].name == name &&
                        (!info || this.node.marks.childNodes[i].markidentifer == info)) {
                        this.node.marks.childNodes[i].delete();
                        this.node.marks.childNodes[i].style.transform += ' scale(0.2)';
                        ui.updatem(this);
                        return;
                    }
                }
            }
        }
        addLink() {
            if (get.is.linked2(this)) {
                this.classList.add('linked2');
            }
            else {
                this.classList.add('linked');
            }
        }
        removeLink() {
            if (get.is.linked2(this)) {
                this.classList.remove('linked2');
            }
            else {
                this.classList.remove('linked');
            }
        }
        /**
         * 返回一张牌当前本角色是否可以(对目标角色)使用
         * @returns {!boolean}
         */
        canUse(card, target, distance, includecard) {
            if (typeof card == 'string') card = { name: card, isCard: true };
            var info = get.info(card);
            if (info.multicheck && !info.multicheck(card, this)) return false;
            if (!lib.filter.cardEnabled(card, this)) return false;
            if (distance !== false && !lib.filter.targetInRange(card, this, target)) return false;
            return lib.filter[includecard ? 'targetEnabledx' : 'targetEnabled'](card, this, target);
        }
        /**
         * 返回一张牌当前本角色是否可以使用
         * @returns {!boolean}
         */
        hasUseTarget(card, distance, includecard) {
            var player = this;
            return game.hasPlayer(function (current) {
                return player.canUse(card, current, distance, includecard);
            });
        }
        /**
         * 返回一张牌当前本角色使用的收益为正收益，当前可以使用，且有使用对象
         * @returns {!boolean}
         */
        hasValueTarget() {
            return this.getUseValue.apply(this, arguments) > 0;
        }
        /**
         * 返回一张牌当前本角色使用的收益
         * @returns {!boolean}
         */
        getUseValue(card, distance, includecard) {
            if (typeof (card) == 'string') {
                card = { name: card, isCard: true };
            }
            var player = this;
            var targets = game.filterPlayer();
            var value = [];
            var min = 0;
            var info = get.info(card);
            if (!info || info.notarget) return 0;
            var range;
            var select = get.copy(info.selectTarget);
            if (select == undefined) {
                if (info.filterTarget == undefined) return true;
                range = [1, 1];
            }
            else if (typeof select == 'number') range = [select, select];
            else if (get.itemtype(select) == 'select') range = select;
            else if (typeof select == 'function') range = select(card, player);
            if (info.singleCard) range = [1, 1];
            game.checkMod(card, player, range, 'selectTarget', player);
            if (!range) return 0;

            for (var i = 0; i < targets.length; i++) {
                if (player.canUse(card, targets[i], distance, includecard)) {
                    var eff = get.effect(targets[i], card, player, player);
                    value.push(eff);
                }
            }
            value.sort(function (a, b) {
                return b - a;
            });
            for (var i = 0; i < value.length; i++) {
                if (i == range[1] || range[1] != -1 && value[i] <= 0) break;
                min += value[i];
            }
            return min;
        }
        /**
         * 
         * @returns {!boolean}
         */
        addSubPlayer(cfg) {
            var skill = 'subplayer_' + cfg.name + '_' + get.id();
            game.log(this, '获得了随从', '#g' + get.translation(cfg.name))
            cfg.hs = cfg.hs || [];
            cfg.es = cfg.es || [];
            cfg.skills = cfg.skills || [];
            cfg.hp = cfg.hp || 1;
            cfg.maxHp = cfg.maxHp || 1;
            cfg.sex = cfg.sex || 'male';
            cfg.group = cfg.group || 'qun';
            cfg.skill = cfg.skill || _status.event.name;
            if (!cfg.source) {
                if (this.hasSkill(_status.event.name) && this.name2 && lib.character[this.name2] &&
                    lib.character[this.name2][3].contains(_status.event.name)) {
                    cfg.source = this.name2;
                }
                else {
                    cfg.source = this.name;
                }
            }
            game.broadcastAll(function (player, skill, cfg) {
                lib.skill[skill] = {
                    intro: {
                        content: cfg.intro || ''
                    },
                    mark: 'character',
                    subplayer: cfg.skill,
                    ai: {
                        subplayer: true
                    }
                }
                lib.character[skill] = [cfg.sex, cfg.group, cfg.maxHp, cfg.skills, ['character:' + cfg.name]];
                lib.translate[skill] = cfg.caption || get.rawName(cfg.name);
                player.storage[skill] = cfg;
            }, this, skill, cfg);
            game.addVideo('addSubPlayer', this, [skill, lib.skill[skill], lib.character[skill], lib.translate[skill], { name: cfg.name }]);
            this.addSkill(skill);
            return skill;
        }
        /**
         * 
         * @returns {!boolean}
         */
        removeSubPlayer(name) {
            if (this.hasSkill('subplayer') && this.name == name) {
                this.exitSubPlayer(true);
            }
            else {
                if (player.storage[name].onremove) {
                    player.storage[name].onremove(player);
                }
                this.removeSkill(name);
                delete this.storage[name];
                game.log(player, '牺牲了随从', '#g' + name);
                _status.event.trigger('removeSubPlayer');
            }
        }
        /**
         * 
         * @returns {!boolean}
         */
        callSubPlayer() {
            if (this.hasSkill('subplayer')) return;
            var next = game.createEvent('callSubPlayer');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    next.directresult = arguments[i];
                }
            }
            next.setContent('callSubPlayer');
            return next;
        }
        /**
         * 
         * @returns {!boolean}
         */
        toggleSubPlayer() {
            if (!this.hasSkill('subplayer')) return;
            var next = game.createEvent('toggleSubPlayer');
            next.player = this;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    next.directresult = arguments[i];
                }
            }
            next.setContent('toggleSubPlayer');
            return next;
        }
        /**
         * 
         * @returns {!boolean}
         */
        exitSubPlayer(remove) {
            if (!this.hasSkill('subplayer')) return;
            var next = game.createEvent('exitSubPlayer');
            next.player = this;
            next.remove = remove;
            next.setContent('exitSubPlayer');
            return next;
        }
        /**
         * 
         * @returns {!boolean}
         */
        getSubPlayers(tag) {
            var skills = this.getSkills();
            var list = [];
            for (var i = 0; i < skills.length; i++) {
                var name = skills[i];
                var info = lib.skill[name];
                if (tag && info.subplayer != tag) continue;
                if (info.ai && info.ai.subplayer && this.storage[name] && this.storage[name].name) {
                    list.push(name);
                }
            }
            return list;
        }
        /**
         * 同时将info.global内的技能添加到{@link lib.skill.global}
         * @returns {!boolean}
         */
        addSkillTrigger(skill, hidden, triggeronly) {
            var info = lib.skill[skill];
            if (!info) return;
            if (typeof info.group == 'string') {
                this.addSkillTrigger(info.group, hidden);
            }
            else if (Array.isArray(info.group)) {
                for (var i = 0; i < info.group.length; i++) {
                    this.addSkillTrigger(info.group[i], hidden);
                }
            }
            if (!triggeronly) {
                if (info.global && (!hidden || info.globalSilent)) {
                    if (typeof info.global == 'string') {
                        game.addGlobalSkill(info.global, this);
                    }
                    else {
                        for (var j = 0; j < info.global.length; j++) {
                            game.addGlobalSkill(info.global[j], this);
                        }
                    }
                }
                if (this.initedSkills.contains(skill)) return this;
                this.initedSkills.push(skill);
                if (info.init && !_status.video) {
                    info.init(this, skill);
                }
            }
            if (info.trigger && this.playerid) {
                var playerid = this.playerid;
                var setTrigger = function (i, evt) {
                    if (i == 'global') {
                        if (!lib.hook.globaltrigger[evt]) {
                            lib.hook.globaltrigger[evt] = {};
                        }
                        if (!lib.hook.globaltrigger[evt][playerid]) {
                            lib.hook.globaltrigger[evt][playerid] = [];
                        }
                        lib.hook.globaltrigger[evt][playerid].add(skill);
                    }
                    else {
                        var name = playerid + '_' + i + '_' + evt;
                        if (!lib.hook[name]) {
                            lib.hook[name] = [];
                        }
                        lib.hook[name].add(skill);
                    }
                    lib.hookmap[evt] = true;
                }
                for (var i in info.trigger) {
                    if (typeof info.trigger[i] == 'string') {
                        setTrigger(i, info.trigger[i]);
                    }
                    else if (Array.isArray(info.trigger[i])) {
                        for (var j = 0; j < info.trigger[i].length; j++) {
                            setTrigger(i, info.trigger[i][j]);
                        }
                    }
                }
            }
            if (info.hookTrigger) {
                if (!this._hookTrigger) {
                    this._hookTrigger = [];
                }
                this._hookTrigger.add(skill);
            }
            if (_status.event && _status.event.addTrigger) _status.event.addTrigger(skill, this);
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        addSkillLog(skill) {
            this.addSkill(skill);
            this.popup(skill);
            game.log(this, '获得了技能', '#g『' + get.translation(skill) + '』');
        }
        /**
         * 添加一组技能
         * @name lib.element.player.addSkill
         * @function
         * @param {Array<string>} skills 技能名数组
         * @param {?boolean} [checkConflict] 是否检测冲突，如果为true，添加技能完成后检测；如果为false或未指定，不检测
         * @param {?boolean} [nobroadcast] 如果为true，直接添加技能；如果为false或未指定，调用{@link game.broadcast}为本角色添加技能
         * @returns {string} 如果添加技能成功，返回技能名`skill`；如果失败，返回undefined
         * @see {@link lib.element.player.addSkill(2)}
         */
        /**
         * 本角色添加技能
         * @name lib.element.player.addSkill
         * @function
         * @variation 2
         * @param {!string} skill 技能名
         * @param {?boolean} [checkConflict] 是否检测冲突，如果为true，添加技能完成后检测；如果为false或未指定，不检测
         * @param {?boolean} [nobroadcast] 如果为true，直接添加技能；如果为false或未指定，调用{@link game.broadcast}为本角色添加技能
         * @returns {string} 如果添加技能成功，返回技能名`skill`；如果失败，返回undefined
         */
        addSkill(skill, checkConflict, nobroadcast) {
            if (Array.isArray(skill)) {
                for (var i = 0; i < skill.length; i++) {
                    this.addSkill(skill[i]);
                }
            }
            else {
                if (this.skills.contains(skill)) return;
                var info = lib.skill[skill];
                if (!info) return;
                if (!nobroadcast) {
                    game.broadcast(function (player, skill) {
                        player.skills.add(skill);
                    }, this, skill);
                }
                this.skills.add(skill);
                this.addSkillTrigger(skill);
                if (this.awakenedSkills.contains(skill)) {
                    this.awakenSkill(skill);
                    return;
                }
                if (info.init2 && !_status.video) {
                    info.init2(this, skill);
                }
                if (info.mark) {
                    if (info.mark == 'card' &&
                        get.itemtype(this.storage[skill]) == 'card') {
                        this.markSkill(skill, null, this.storage[skill]);
                    }
                    else if (info.mark == 'card' &&
                        get.itemtype(this.storage[skill]) == 'cards') {
                        this.markSkill(skill, null, this.storage[skill][0]);
                    }
                    else if (info.mark == 'image') {
                        this.markSkill(skill, null, ui.create.card(null, 'noclick').init([null, null, skill]));
                    }
                    else if (info.mark == 'character') {
                        var intro = info.intro.content;
                        if (typeof intro == 'function') {
                            intro = intro(this.storage[skill], this);
                        }
                        else if (typeof intro == 'string') {
                            intro = intro.replace(/#/g, this.storage[skill]);
                            intro = intro.replace(/&/g, get.cnNumber(this.storage[skill]));
                            intro = intro.replace(/\$/g, get.translation(this.storage[skill]));
                        }
                        var caption;
                        if (typeof info.intro.name == 'function') {
                            caption = info.intro.name(this.storage[skill], this);
                        }
                        else if (typeof info.intro.name == 'string') {
                            caption = info.name;
                        }
                        else {
                            caption = get.translation(skill);
                        }
                        this.markSkillCharacter(skill, this.storage[skill], caption, intro);
                    }
                    else {
                        this.markSkill(skill);
                    }
                }
            }
            if (checkConflict) this.checkConflict();
            return skill;
        }
        /**
         * 
         * @returns {!boolean}
         */
        addAdditionalSkill(skill, skills, keep) {
            if (this.additionalSkills[skill]) {
                if (keep) {
                    if (typeof this.additionalSkills[skill] == 'string') {
                        this.additionalSkills[skill] = [this.additionalSkills[skill]];
                    }
                }
                else {
                    this.removeAdditionalSkill(skill);
                    this.additionalSkills[skill] = [];
                }
            }
            else {
                this.additionalSkills[skill] = [];
            }
            if (typeof skills == 'string') {
                skills = [skills];
            }
            for (var i = 0; i < skills.length; i++) {
                this.addSkill(skills[i], null, true);
                this.skills.remove(skills[i]);
                this.additionalSkills[skill].push(skills[i]);
            }
            this.checkConflict();
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        removeAdditionalSkill(skill, target) {
            if (this.additionalSkills[skill]) {
                var additionalSkills = this.additionalSkills[skill];
                if (Array.isArray(additionalSkills) && typeof target == 'string') {
                    if (additionalSkills.contains(target)) {
                        additionalSkills.remove(target);
                        this.removeSkill(target);
                    }
                }
                else {
                    delete this.additionalSkills[skill];
                    if (typeof additionalSkills == 'string') {
                        this.removeSkill(additionalSkills);
                    }
                    else if (Array.isArray(additionalSkills)) {
                        for (var i = 0; i < additionalSkills.length; i++) {
                            this.removeSkill(additionalSkills[i]);
                        }
                    }
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        awakenSkill(skill, nounmark) {
            if (!nounmark) this.unmarkSkill(skill);
            this.disableSkill(skill + '_awake', skill);
            this.awakenedSkills.add(skill);
            if (this.storage[skill] === false) this.storage[skill] = true;
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        restoreSkill(skill, nomark) {
            if (this.storage[skill] === true) this.storage[skill] = false;
            this.awakenedSkills.remove(skill);
            this.enableSkill(skill + '_awake', skill);
            if (!nomark) this.markSkill(skill);
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        disableSkill(skill, skills) {
            if (typeof skills == 'string') {
                if (!this.disabledSkills[skills]) {
                    this.disabledSkills[skills] = [];
                    var info = get.info(skills);
                    if (info.ondisable && info.onremove) {
                        info.onremove(this);
                    }
                }
                this.disabledSkills[skills].add(skill);
                var group = lib.skill[skills].group;
                if (typeof group == 'string' || Array.isArray(group)) {
                    this.disableSkill(skill, group);
                }
            }
            else if (Array.isArray(skills)) {
                for (var i = 0; i < skills.length; i++) {
                    this.disableSkill(skill, skills[i]);
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        enableSkill(skill) {
            for (var i in this.disabledSkills) {
                this.disabledSkills[i].remove(skill);
                if (this.disabledSkills[i].length == 0) {
                    delete this.disabledSkills[i];
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        checkMarks() {
            var skills = this.getSkills();
            game.expandSkills(skills);
            for (var i in this.marks) {
                if (!skills.contains(i) && !this.marks[i].info.fixed) {
                    this.unmarkSkill(i);
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        addEquipTrigger(card) {
            if (card) {
                var info = get.info(card);
                if (info.skills) {
                    for (var j = 0; j < info.skills.length; j++) {
                        this.addSkillTrigger(info.skills[j]);
                    }
                }
            }
            else {
                var es = this.getCards('e');
                for (var i = 0; i < es.length; i++) {
                    this.addEquipTrigger(es[i]);
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        removeEquipTrigger(card, move) {
            if (card) {
                var info = get.info(card);
                if (move === false) {
                    if (card.originalName) {
                        card.classList.remove('fakejudge');
                        if (get.type(card.originalName) == 'equip') {
                            card.classList.remove(get.subtype(card.viewAs));
                            card.classList.add(get.subtype(card.originalName));
                        } else {
                            card.classList.remove(get.subtype(card.viewAs));
                        }
                        card.name = card.originalName;
                        delete card.viewAs;
                        delete card.originalName;
                    }
                } else {
                    //	if(card.viewAs&&card.originalName&&card.originalName){
                    //		card.name = card.originalName
                    //	}
                }
                var skills = this.getSkills(null, false);
                if (info.skills) {
                    for (var j = 0; j < info.skills.length; j++) {
                        if (skills.contains(info.skills[j])) continue;
                        this.removeSkillTrigger(info.skills[j]);
                    }
                }
                if (info.clearLose && typeof info.onLose == 'function') {
                    var next = game.createEvent('lose_' + card.name);
                    next.setContent(info.onLose);
                    next.player = this;
                    next.card = card;
                }
            }
            else {
                var es = this.getCards('e');
                for (var i = 0; i < es.length; i++) {
                    this.removeEquipTrigger(es[i]);
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        removeSkillTrigger(skill, triggeronly) {
            var info = lib.skill[skill];
            if (!info) return;
            if (typeof info.group == 'string') {
                this.removeSkillTrigger(info.group);
            }
            else if (Array.isArray(info.group)) {
                for (var i = 0; i < info.group.length; i++) {
                    this.removeSkillTrigger(info.group[i]);
                }
            }
            if (!triggeronly) this.initedSkills.remove(skill);
            if (info.trigger) {
                var playerid = this.playerid;
                var removeTrigger = function (i, evt) {
                    if (i == 'global') {
                        for (var j in lib.hook.globaltrigger) {
                            if (lib.hook.globaltrigger[j][playerid]) {
                                lib.hook.globaltrigger[j][playerid].remove(skill);
                                if (lib.hook.globaltrigger[j][playerid].length == 0) {
                                    delete lib.hook.globaltrigger[j][playerid];
                                }
                                if (get.is.empty(lib.hook.globaltrigger[j])) {
                                    delete lib.hook.globaltrigger[j];
                                }
                            }
                        }
                    }
                    else {
                        var name = playerid + '_' + i + '_' + evt;
                        if (lib.hook[name]) {
                            lib.hook[name].remove(skill);
                            if (lib.hook[name].length == 0) {
                                delete lib.hook[name];
                            }
                        }
                    }
                }
                for (var i in info.trigger) {
                    if (typeof info.trigger[i] == 'string') {
                        removeTrigger(i, info.trigger[i]);
                    }
                    else if (Array.isArray(info.trigger[i])) {
                        for (var j = 0; j < info.trigger[i].length; j++) {
                            removeTrigger(i, info.trigger[i][j]);
                        }
                    }
                }
            }
            if (info.hookTrigger) {
                if (this._hookTrigger) {
                    this._hookTrigger.remove(skill);
                    if (!this._hookTrigger.length) {
                        delete this._hookTrigger;
                    }
                }
            }
            return this;
        }
        /**
         * 
         * @returns {!boolean}
         */
        removeSkill(skill) {
            if (!skill) return;
            if (Array.isArray(skill)) {
                for (var i = 0; i < skill.length; i++) {
                    this.removeSkill(skill[i]);
                }
            }
            else {
                var info = lib.skill[skill];
                if (info && info.fixed && arguments[1] !== true) return skill;
                this.unmarkSkill(skill);
                game.broadcastAll(function (player, skill) {
                    player.skills.remove(skill);
                    player.hiddenSkills.remove(skill);
                }, this, skill);
                this.checkConflict(skill);
                delete this.tempSkills[skill];
                if (info) {
                    if (info.onremove) {
                        if (typeof info.onremove == 'function') {
                            info.onremove(this, skill);
                        }
                        else if (typeof info.onremove == 'string') {
                            if (info.onremove == 'storage') {
                                delete this.storage[skill];
                            }
                            else {
                                var cards = this.storage[skill];
                                if (get.itemtype(cards) == 'card') {
                                    cards = [cards];
                                }
                                if (get.itemtype(cards) == 'cards') {
                                    if (this.onremove == 'discard') {
                                        this.$throw(cards);
                                    }
                                    if (this.onremove == 'discard' || this.onremove == 'lose') {
                                        game.cardsDiscard(cards);
                                        delete this.storage[skill];
                                    }
                                }
                            }
                        }
                        else if (Array.isArray(info.onremove)) {
                            for (var i = 0; i < info.onremove.length; i++) {
                                delete this.storage[info.onremove[i]];
                            }
                        }
                        else if (info.onremove === true) {
                            delete this.storage[skill];
                        }
                    }
                    this.removeSkillTrigger(skill);
                    if (!info.keepSkill) {
                        this.removeAdditionalSkill(skill);
                    }
                }
                this.enableSkill(skill + '_awake');
            }
            return skill;
        }
        /**
         * 本角色添加一个临时技能
         * @param {!string} skill 技能名
         * @param {(string|Object|undefined)} [expire='phaseAfter'] 过期时间，`expire`实际上对应一个触发器，本角色在下一次触发器被触发的时候移除此技能；如果未指定，使用'phaseAfter'
         * @param {?boolean} [checkConflict] 如果为true，添加技能完成后检测冲突；如果为false或未指定，不检测
         * @returns {string} 如果添加成功，返回技能名`skill`；否则，返回undefined
         */
        addTempSkill(skill, expire, checkConflict) {
            if (this.hasSkill(skill) && this.tempSkills[skill] == undefined) return;
            var noremove = this.skills.contains(skill);
            this.addSkill(skill, checkConflict, true);
            if (!noremove) this.skills.remove(skill);

            if (!expire) {
                expire = 'phaseAfter';
            }
            this.tempSkills[skill] = expire;

            if (typeof expire == 'string') {
                lib.hookmap[expire] = true;
            }
            else if (Array.isArray(expire)) {
                for (var i = 0; i < expire.length; i++) {
                    lib.hookmap[expire[i]] = true;
                }
            }
            else if (get.objtype(expire) == 'object') {
                var roles = ['player', 'source', 'target'];
                for (var i = 0; i < roles.length; i++) {
                    if (typeof expire[roles[i]] == 'string') {
                        lib.hookmap[expire[roles[i]]] = true;
                    }
                    else if (Array.isArray(expire[roles[i]])) {
                        for (var j = 0; j < expire[roles[i]].length; j++) {
                            lib.hookmap[expire[roles[i]][j]] = true;
                        }
                    }
                }
                if (expire.global) {
                    if (typeof expire.global == 'string') {
                        lib.hookmap[expire.global] = true;
                    }
                    else if (Array.isArray(expire.global)) {
                        for (var i = 0; i < expire.global.length; i++) {
                            lib.hookmap[expire.global[i]] = true;
                        }
                    }
                }
            }

            for (var i in expire) {
                if (typeof expire[i] == 'string') {
                    lib.hookmap[expire[i]] = true;
                }
                else if (Array.isArray(expire[i])) {
                    for (var j = 0; j < expire.length; j++) {
                        lib.hookmap[expire[i][j]] = true;
                    }
                }
            }
            return skill;
        }
        /**
         * 
         * @returns {!boolean}
         */
        attitudeTo(target) {
            if (typeof get.attitude == 'function') return get.attitude(this, target);
            return 0;
        }
        /**
         * 
         * @returns {!boolean}
         */
        clearSkills(all) {
            var list = [];
            var exclude = [];
            for (var i = 0; i < arguments.length; i++) {
                exclude.push(arguments[i]);
            }
            for (i = 0; i < this.skills.length; i++) {
                if (lib.skill[this.skills[i]].superCharlotte) continue;
                if (!all && (lib.skill[this.skills[i]].temp || lib.skill[this.skills[i]].charlotte)) continue;
                if (!exclude.contains(this.skills[i])) {
                    list.push(this.skills[i]);
                }
            }
            if (all) {
                for (var i in this.additionalSkills) {
                    this.removeAdditionalSkill(i);
                }
            }
            this.removeSkill(list);
            this.checkConflict();
            this.checkMarks();
            return list;
        }
        /**
         * 
         * @returns {!boolean}
         */
        checkConflict(skill) {
            if (skill) {
                if (this.forbiddenSkills[skill]) {
                    delete this.forbiddenSkills[skill];
                }
                else {
                    for (var i in this.forbiddenSkills) {
                        if (this.forbiddenSkills[i].remove(skill)) {
                            if (!this.forbiddenSkills[i].length) {
                                delete this.forbiddenSkills[i];
                            }
                        }
                    }
                }
            }
            else {
                this.forbiddenSkills = {};
                var forbid = [];
                var getName = function (arr) {
                    var str = '';
                    for (var i = 0; i < arr.length; i++) {
                        str += arr[i] + '+';
                    }
                    return str.slice(0, str.length - 1);
                }
                var forbidlist = lib.config.forbid.concat(lib.config.customforbid);
                var skills = this.getSkills();
                for (var i = 0; i < forbidlist.length; i++) {
                    if (lib.config.customforbid.contains(forbidlist[i]) ||
                        !lib.config.forbidlist.contains(getName(forbidlist[i]))) {
                        for (var j = 0; j < forbidlist[i].length; j++) {
                            if (!skills.contains(forbidlist[i][j])) break;
                        }
                        if (j == forbidlist[i].length) {
                            forbid.push(forbidlist[i]);
                        }
                    }
                }
                for (var i = 0; i < forbid.length; i++) {
                    if (forbid[i][1] || this.name2) {
                        this.forbiddenSkills[forbid[i][0]] = this.forbiddenSkills[forbid[i][0]] || [];
                        if (forbid[i][1]) {
                            this.forbiddenSkills[forbid[i][0]].add(forbid[i][1]);
                        }
                    }
                }
            }
        }
        /**
         * 返回本角色的一个记录数据
         * @returns {!boolean}
         */
        getHistory(key, filter, last) {
            if (!key) return this.actionHistory[this.actionHistory.length - 1];
            if (!filter) return this.actionHistory[this.actionHistory.length - 1][key];
            else {
                var history = this.getHistory(key).slice(0);
                if (last) history = history.slice(0, history.indexOf(last) + 1);
                for (var i = 0; i < history.length; i++) {
                    if (!filter(history[i])) history.splice(i--, 1);
                }
                return history;
            }
        }
        hasHistory(key, filter, last) {
            var history = this.getHistory(key).slice(0);
            if (last) history = history.slice(0, history.indexOf(last) + 1);
            for (var i = 0; i < history.length; i++) {
                if (filter(history[i])) return true;
            }
            return false;
        }
        /**
         * 返回本角色最近(当前)的记录数据
         * @returns {Array}
         */
        getLastHistory(key, filter, last) {
            var history = false;
            for (var i = this.actionHistory.length - 1; i >= 0; i--) {
                if (this.actionHistory[i].isMe) {
                    history = this.actionHistory[i]; break;
                }
            }
            if (!history) return null;
            if (!key) return history;
            if (!filter) return history[key];
            else {
                history = history.slice(0);
                if (last) history = history.slice(0, history.indexOf(last) + 1);
                for (var i = 0; i < history.length; i++) {
                    if (!filter(history[i])) history.splice(i--, 1);
                }
                return history;
            }
        }
        /**
         * 返回本角色的记录数据 TODO
         * @returns {Array}
         */
        getAllHistory(key, filter, last) {
            var list = [];
            var all = this.actionHistory;
            for (var j = 0; j < all.length; j++) {
                if (!key || !all[j][key]) {
                    list.push(all[j]);
                }
                else {
                    if (!filter) list.addArray(all[j][key]);
                    else {
                        var history = all[j][key].slice(0);
                        if (last) history = history.slice(0, history.indexOf(last) + 1);
                        for (var i = 0; i < history.length; i++) {
                            if (filter(history[i])) list.push(history[i]);
                        }
                    }
                }
            }
            return list;
        }
        hasAllHistory(key, filter, last) {
            var list = [];
            var all = this.actionHistory;
            for (var j = 0; j < all.length; j++) {
                var history = all[j][key].slice(0);
                if (last) history = history.slice(0, history.indexOf(last) + 1);
                for (var i = 0; i < history.length; i++) {
                    if (filter(history[i])) return true;
                }
            }
            return false;
        }
        /**
         * 返回一张本角色使用过的牌
         * @param {number} [idx=0] 索引，从最近到最远，为0表示最近使用的牌，如果未索引到(e.g. `idx >= length`)，返回null
         * @returns {(GameCores.GameObjects.Card|null)} 
         */
        getLastUsed(num) {
            if (typeof num != 'number') num = 0;
            var history = this.getHistory('useCard');
            if (history.length <= num) return null;
            return history[history.length - num - 1];
        }
        /**
         * 返回最后的`stat`的指定键名的值
         * @param {string} [key] 键名；如果未指定或者为空字符串，返回最后`stat`
         * @returns {?Object}
         */
        getStat(key) {
            if (!key) return this.stat[this.stat.length - 1];
            return this.stat[this.stat.length - 1][key];
        }
        /**
         * 返回最后的`stat`的指定键名的值 TODO
         * @param {string} [key] 键名；如果未指定或者为空字符串，返回最后`stat`
         * @returns {?Object}
         */
        getLastStat(key) {
            var stat = false;
            for (var i = this.stat.length - 1; i >= 0; i--) {
                if (this.stat[i].isMe) {
                    stat = this.stat[i]; break;
                }
            }
            if (!stat) return null
            if (!key) return stat;
            return stat[key];
        }
        /**
         * 设置本角色的Timeout队列，Timeout延迟一定时长，然后重置角色位置
         * @param {(number|false)} [time=500] 等待时长(ms)；如果为false，表示终止最近添加的Timeout并重置本角色Timeout队列计数
         */
        queue(time) {
            if (time == false) {
                clearTimeout(this.queueTimeout);
                this.queueCount = 0;
                return;
            }
            if (time == undefined) time = 500;
            var player = this;
            player.queueCount++;
            this.queueTimeout = setTimeout(function () {
                player.queueCount--;
                if (player.queueCount == 0) {
                    player.style.transform = '';
                    player.node.avatar.style.transform = '';
                    player.node.avatar2.style.transform = '';
                    if (game.chess) {
                        ui.placeChess(player, player.dataset.position);
                    }
                    if (player == game.me) ui.me.removeAttribute('style');
                }
            }, time)
        }
        /**
         * 返回一张游戏牌可以被本角色使用的次数，如果本角色有被动技**cardUsable**改变游戏牌的使用次数，采用改变后的值
         * @param {!string} cardname 牌名
         * @param {boolean} [ignoreUsed] 是否忽略使用过的次数，如果为true，忽略使用过的次数；如果为false或者未指定，结果会减去使用过的次数
         * @returns {!number}
         */
        getCardUsable(card, pure) {
            var player = this;
            if (typeof card == 'string') {
                card = { name: card };
            }
            card = get.autoViewAs(card, null, player);
            var num = get.info(card).usable;
            if (typeof num == 'function') num = num(card, player);
            num = game.checkMod(card, player, num, 'cardUsable', player);
            if (typeof num != 'number') return Infinity;
            if (!pure && _status.currentPhase == player) {
                return num - player.countUsed(card);
            }
            return num;
        }
        /**
         * 返回攻击范围
         * @returns {!number}
         */
        getAttackRange(raw) {
            var player = this;
            var range = 0;
            if (raw) range = game.checkMod(player, player, range, 'globalFrom', player);
            range = game.checkMod(player, player, range, 'attackFrom', player);
            var equips = player.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.contains(card);
            });
            for (var i = 0; i < equips.length; i++) {
                var info = get.info(equips[i]).distance;
                if (!info) continue;
                if (raw && info.globalFrom) {
                    range += info.globalFrom;
                }
                if (info.attackFrom) {
                    range += info.attackFrom;
                }
            }
            return (1 - range);
        }
        /**
         * TODO
         * @returns {!boolean}
         */
        getGlobalFrom() {
            var player = this;
            var range = 0;
            range = game.checkMod(player, player, range, 'globalFrom', player);
            var equips = player.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.contains(card);
            });
            for (var i = 0; i < equips.length; i++) {
                var info = get.info(equips[i]).distance;
                if (!info) continue;
                if (info.globalFrom) {
                    range += info.globalFrom;
                }
            }
            return (-range);
        }
        /**
         * TODO
         * @returns {!boolean}
         */
        getGlobalTo() {
            var player = this;
            var range = 0;
            range = game.checkMod(player, player, range, 'globalTo', player);
            var equips = player.getCards('e', function (card) {
                return !ui.selected.cards || !ui.selected.cards.contains(card);
            });
            for (var i = 0; i < equips.length; i++) {
                var info = get.info(equips[i]).distance;
                if (!info) continue;
                if (info.globalTo) {
                    range += info.globalTo;
                }
            }
            return (range);
        }
        /**
         * 返回本角色的最大手牌数**num**；如果本角色有被动技**maxHandcardBase maxHandcard maxHandcardFinal**，依次改变**num**，返回改变后的**num**；**num**不会小于0
         * @returns {!number} 非负整数
         */
        getHandcardLimit() {
            var num = Math.max(this.hp, 0);
            num = game.checkMod(this, num, 'maxHandcardBase', this);
            num = game.checkMod(this, num, 'maxHandcard', this);
            num = game.checkMod(this, num, 'maxHandcardFinal', this);
            return Math.max(0, num);
        }
        /**
         * @callback lib.element.player~playerFilterPredicate
         * @param {!GameCores.GameObjects.Player} player
         * @returns {!boolean}
         */
        /**
         * 返回本角色的敌方角色
         * @name lib.element.player.getEnemies
         * @function
         * @param {lib.element.player~playerFilterPredicate} [predicate] 筛选函数
         * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
         */
        getEnemies(func) {
            var player = this;
            var targets;
            var mode = get.mode();
            if (mode == 'identity') {
                if (_status.mode == 'purple') {
                    switch (player.identity) {
                        case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
                        }); break;
                        case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
                        }); break;
                        case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return !['rYe', 'bYe'].contains(target.identity);
                        }); break;
                    }
                }
                else {
                    var num = get.population('fan');
                    switch (player.identity) {
                        case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            if (num >= 3) return target.identity == 'fan';
                            return target.identity == 'nei' || target.identity == 'fan';
                        }); break;
                        case 'nei': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            if (num >= 3) return target.identity == 'fan';
                            if (game.players.length == 2) return target != player;
                            return target.identity == 'zhong' || target.identity == 'mingzhong' || target.identity == 'fan';
                        }); break;
                        case 'fan': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return target.identity != 'fan';
                        }); break;
                    }
                }
            }
            else if (mode == 'guozhan') {
                if (player.identity == 'ye') {
                    targets = game.filterPlayer(function (target) {
                        if (func && !func(target)) return false;
                        return true;
                    });
                }
                else {
                    var group = lib.character[player.name1][1];
                    targets = game.filterPlayer(function (target) {
                        if (func && !func(target)) return false;
                        return target.identity == 'ye' || lib.character[target.name1][1] != group;
                    });
                }
            }
            else if (mode == 'doudizhu' || mode == 'longlaoguan') {
                targets = game.filterPlayer(function (target) {
                    if (func && !func(target)) return false;
                    return target.identity != player.identity;
                });
            }
            else {
                targets = game.filterPlayer(function (target) {
                    if (func && !func(target)) return false;
                    return target.side != player.side;
                });
            }
            targets.remove(player);
            return targets;
        }
        /**
         * 返回本角色的友方角色
         * @name lib.element.player.getFriends
         * @function
         * @param {lib.element.player~playerFilterPredicate} predicate 筛选函数
         * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
         */
        /**
         * 返回本角色的友方角色
         * @name lib.element.player.getFriends
         * @function
         * @param {?boolean} hasSelf 结果是否包含本角色，如果为true，则包括；如果为false或未指定，则不包括
         * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
         */
        getFriends(func) {
            var player = this;
            var targets;
            var mode = get.mode();
            var self = false;
            if (func === true) {
                func = null;
                self = true;
            }
            if (mode == 'identity') {
                if (_status.mode == 'purple') {
                    switch (player.identity) {
                        case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
                        }); break;
                        case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
                        }); break;
                        case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['rYe', 'bYe'].contains(target.identity);
                        }); break;
                    }
                }
                else {
                    switch (player.identity) {
                        case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return ['zhu', 'zhong', 'mingzhong'].contains(target.identity);
                        }); break;
                        case 'nei': targets = []; break;
                        case 'fan': targets = game.filterPlayer(function (target) {
                            if (func && !func(target)) return false;
                            return target.identity == 'fan';
                        }); break;
                    }
                }
            }
            else if (mode == 'guozhan') {
                if (player.identity == 'ye') {
                    targets = [];
                }
                else {
                    var group = lib.character[player.name1][1];
                    targets = game.filterPlayer(function (target) {
                        if (func && !func(target)) return false;
                        return target.identity != 'ye' && lib.character[target.name1][1] == group;
                    });
                }
            }
            else if (mode == 'doudizhu' || mode == 'longlaoguan') {
                targets = game.filterPlayer(function (target) {
                    if (func && !func(target)) return false;
                    return target.identity == player.identity;
                });
            }
            else {
                targets = game.filterPlayer(function (target) {
                    if (func && !func(target)) return false;
                    return target.side == player.side;
                });
            }
            if (self) {
                targets.add(player);
            }
            else {
                targets.remove(player);
            }
            return targets;
        }
        /**
         * 返回本角色是否是目标的敌方
         * @param {!GameCores.GameObjects.Player} player 目标角色
         * @returns {!boolean}
         */
        isEnemyOf() {
            return !this.isFriendOf.apply(this, arguments);
        }
        /**
         * 返回本角色是否是目标的友方
         * @param {!GameCores.GameObjects.Player} player 目标角色
         * @returns {!boolean}
         */
        isFriendOf(player) {
            if (get.mode() == 'guozhan') {
                if (this == player) return true;
                if (this.storage.yexinjia_friend == player || player.storage.yexinjia_friend == this) return true;
                if (this.identity == 'unknown' || this.identity == 'ye') return false;
                if (player.identity == 'unknown' || player.identity == 'ye') return false;
                return this.identity == player.identity;
            }
            if (get.mode() == 'doudizhu' || get.mode() == 'longlaoguan') {
                return this.identity == player.identity;
            }
            if (this.side != undefined && typeof player.side == 'boolean') {
                return this.side == player.side;
            }
            return this == player;
        }
        /**
         * 返回本角色是否是目标的友方
         * @param {!GameCores.GameObjects.Player} player 目标角色
         * @returns {!boolean}
         */
        isFriendsOf(player) {
            return player.getFriends(true).contains(this);
        }
        /**
         * 返回本角色是否是目标的敌方
         * @param {!GameCores.GameObjects.Player} player 目标角色
         * @returns {!boolean}
         */
        isEnemiesOf(player) {
            return player.getEnemies().contains(this);
        }
        /**
         * 返回本角色是否未死亡
         * @returns {!boolean} true表示未死亡，false表示已死亡
         */
        isAlive() {
            return this.classList.contains('dead') == false;
        }
        /**
         * 返回本角色是否死亡
         * @returns {!boolean}
         */
        isDead() {
            return this.classList.contains('dead');
        }
        /**
         * 返回本角色是否处于濒死状态
         * @returns {!boolean}
         */
        isDying() {
            return _status.dying.contains(this) && this.hp <= 0 && this.isAlive();
        }
        /**
         * 返回本角色是否当前血量小于最大血量，如果本角色处于**无HP状态**，返回false
         * @returns {!boolean}
         */
        isDamaged() {
            return this.hp < this.maxHp && !this.storage.nohp;
        }
        /**
         * 返回本角色是否当前血量等于最大血量，如果本角色处于**无HP状态**，返回true
         * @returns {!boolean}
         */
        isHealthy() {
            return this.hp == this.maxHp || this.storage.nohp;
        }
        /**
         * 返回本角色的血量是否是局中最多
         * @param {boolean} [isUnique] 如果为true，只在血量最多且唯一时返回true；如果为false或未指定，只要血量最多就返回true
         * @returns {!boolean}
         */
        isMaxHp(equal) {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].hp >= this.hp) return false;
                }
                else {
                    if (game.players[i].hp > this.hp) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的血量是否是局中最少
         * @param {boolean} [isUnique] 如果为true，只在血量最少且唯一时返回true；如果为false或未指定，只要血量最少就返回true
         * @returns {!boolean}
         */
        isMinHp(equal) {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].hp <= this.hp) return false;
                }
                else {
                    if (game.players[i].hp < this.hp) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的手牌和装备总数是否是局中最多
         * @param {boolean} [isUnique] 如果为true，只在数量最多且唯一时返回true；如果为false或未指定，只要数量是最多就返回true
         * @returns {!boolean}
         */
        isMaxCard(equal) {
            var nh = this.countCards('he');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('he') >= nh) return false;
                }
                else {
                    if (game.players[i].countCards('he') > nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的手牌和装备总数是否是局中最少
         * @param {boolean} [isUnique] 如果为true，只在数量最少且唯一时返回true；如果为false或未指定，只要数量是最少就返回true
         * @returns {!boolean}
         */
        isMinCard(equal) {
            var nh = this.countCards('he');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('he') <= nh) return false;
                }
                else {
                    if (game.players[i].countCards('he') < nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的手牌数量是否是局中最多
         * @param {boolean} [isUnique] 如果为true，只在手牌数量最多且唯一时返回true；如果为false或未指定，只要装备数量是最多就返回true
         * @returns {!boolean}
         */
        isMaxHandcard(equal) {
            var nh = this.countCards('h');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('h') >= nh) return false;
                }
                else {
                    if (game.players[i].countCards('h') > nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的手牌数量是否是局中最少
         * @param {boolean} [isUnique] 如果为true，只在手牌数量最少且唯一时返回true；如果为false或未指定，只要手牌数量是最少就返回true
         * @returns {!boolean}
         */
        isMinHandcard(equal) {
            var nh = this.countCards('h');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('h') <= nh) return false;
                }
                else {
                    if (game.players[i].countCards('h') < nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的装备数量是否是局中最多
         * @param {boolean} [isUnique] 如果为true，只在装备数量最多且唯一时返回true；如果为false或未指定，只要装备数量是最多就返回true
         * @returns {!boolean}
         */
        isMaxEquip(equal) {
            var nh = this.countCards('e');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('e') >= nh) return false;
                }
                else {
                    if (game.players[i].countCards('e') > nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色的装备数量是否是局中最少
         * @param {boolean} [isUnique] 如果为true，只在装备数量最少且唯一时返回true；如果为false或未指定，只要装备数量是最少就返回true
         * @returns {!boolean}
         */
        isMinEquip(equal) {
            var nh = this.countCards('e');
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == this) continue;
                if (equal) {
                    if (game.players[i].countCards('e') <= nh) return false;
                }
                else {
                    if (game.players[i].countCards('e') < nh) return false;
                }
            }
            return true;
        }
        /**
         * 返回本角色是否被链接
         * @returns {!boolean} true表示被链接，false表示未被链接
         */
        isLinked() {
            if (get.is.linked2(this)) {
                return this.classList.contains('linked2');
            }
            return this.classList.contains('linked');
        }
        /**
         * 返回本角色是否翻面
         * @returns {!boolean} true表示翻面，false表示未翻面
         */
        isTurnedOver() {
            return this.classList.contains('turnedover');
        }
        /**
         * 返回本角色的玩家是否离开
         * @returns {!boolean} true表示离开，false表示未离开
         */
        isOut() {
            return this.classList.contains('out');
        }
        /**
         * 本角色是否不计入距离的计算
         * @param {?boolean} [distance]
         * @returns {!boolean}
         */
        //TODO
        isMin(distance) {
            if (distance && lib.config.mode != 'stone') return false;
            if (this.forcemin) return true;
            return this.classList.contains('minskin') && !game.chess;
        }
        /**
         * 表示本角色是否在局中(未死亡&未离开&未移出房间)
         * @returns {!boolean} true表示在局中，false表示不在局中
         */
        isIn() {
            return this.classList.contains('dead') == false && this.classList.contains('out') == false && !this.removed;
        }
        /**
         * 返回本角色是否可见，如果可见返回true
         * @param {number} num **0**: unseen; **1**: unseen2; **2**: unseen && unseen2; **default**: unseen && !unseen2 
         * @returns {!boolean}
         */
        isUnseen(num) {
            switch (num) {
                case 0: return this.classList.contains('unseen');
                case 1: return this.classList.contains('unseen2');
                case 2: return this.classList.contains('unseen') || this.classList.contains('unseen2');
                default: return this.classList.contains('unseen') && (!this.name2 || this.classList.contains('unseen2'));
            }
        }
        /**
         * 判断本角色是否可以被某角色的玩家控制
         * @param {?boolean} self 如果为true，当是两个角色是同一个角色时返回true；如果为false或未指定，返回false
         * @param {GameCores.GameObjects.Player} [me] 某角色，用于判断本角色是否被`me`的玩家控制，如果未指定，默认使用`game.me`
         * @returns {!boolean}
         */
        isUnderControl(self, me) {
            me = (me || game.me);
            var that = this._trueMe || this;
            if (that.isMad() || game.notMe) return false;
            if (this === me) {
                if (self) return true;
                return false;
            }
            if (that === me || this == me._trueMe) return true;
            if (_status.connectMode) return false;
            if (lib.config.mode == 'versus') {
                if (_status.mode == 'three') return this.side == me.side;
                if (_status.mode == 'standard') return lib.storage.single_control && this.side == me.side;
                if (_status.mode == 'four') return get.config('four_phaseswap') && this.side == me.side;
                if (_status.mode == 'two') return get.config('two_phaseswap') && this.side == me.side;
                return false;
            }
            else if (lib.config.mode == 'boss') {
                if (me.side) return false;
                return this.side == me.side && get.config('single_control');
            }
            else if (game.chess) {
                if (lib.config.mode == 'chess') {
                    if (_status.mode == 'combat' && !get.config('single_control')) return false;
                }
                return this.side == me.side;
            }
            return false;
        }
        /**
         * 角色是否处于联机状态
         * 注意，该函数如果角色处于托管状态，返回false
         * @returns {!boolean}
         */
        isOnline() {
            if (this.ws && lib.node && !this.ws.closed && this.ws.inited && !this.isAuto) {
                return true;
            }
            return false;
        }
        /**
         * 角色是否处于联机状态
         * @returns {!boolean}
         */
        isOnline2() {
            if (this.ws && lib.node && !this.ws.closed) {
                return true;
            }
            return false;
        }
        /**
         * 角色是否处于脱机状态
         * @returns {!boolean}
         */
        isOffline() {
            if (this.ws && lib.node && this.ws.closed) {
                return true;
            }
            return false;
        }
        checkShow(skill, showonly) {
            var sourceSkill = get.info(skill);
            var noshow = false;
            if (sourceSkill && sourceSkill.sourceSkill) {
                skill = sourceSkill.sourceSkill;
            }
            if (lib.skill.global.contains(skill)) return false;
            if (get.mode() != 'guozhan' || game.expandSkills(this.getSkills()).contains(skill)) {
                if (showonly) {
                    return false;
                }
                else {
                    noshow = true;
                }
            }
            var unseen0 = this.isUnseen(0);
            var name1 = this.name1 || this.name;
            if (lib.character[name1] && (!showonly || unseen0)) {
                var skills = game.expandSkills(lib.character[name1][3].slice(0));
                if (skills.contains(skill)) {
                    if (!noshow && this.isUnseen(0)) this.showCharacter(0);
                    return 'main';
                }
            }
            var unseen1 = this.isUnseen(1);
            var name2 = this.name2;
            if (lib.character[name2] && (!showonly || unseen1)) {
                var skills = game.expandSkills(lib.character[name2][3].slice(0));
                if (skills.contains(skill)) {
                    if (!noshow && this.isUnseen(1)) this.showCharacter(1);
                    return 'vice';
                }
            }
            return false;
        }
        /**
         * 返回本角色当前超出手牌上限多少张牌，如果没有超出上限，返回0；
         * 如果角色有被动技**ignoredHandcard**，令被动技返回`true`的牌不计入手牌上限
         * @param {?number} [num] 
         * @returns {!number} 非负整数
         */
        needsToDiscard(num) {
            if (typeof num != 'number') num = 0;
            var hs = this.getCards('h');
            num += hs.length;
            for (var i = 0; i < hs.length; i++) {
                if (game.checkMod(hs[i], this, false, 'ignoredHandcard', this) == true) {
                    num--;
                }
            }
            return Math.max(0, num - this.getHandcardLimit());
        }
        distanceTo(target, method) {
            return get.distance(this, target, method);
        }
        distanceFrom(target, method) {
            return get.distance(target, this, method);
        }
        /**
         * 返回本角色是否拥有一个技能；
         * 此技能会在角色拥有(技能|子技能)中查找技能名；
         * 实际调用了{@link lib.element.player.getSkills this.getSkills(arg2, arg3, arg4)}，并用{@link game.expandSkills}展开
         * @param {!string} skill 技能名
         * @param {*} arg2 为真时表示计入隐藏的技能、为'e'时表示仅返回装备技能
         * @param {*} arg3 为false时表示不计入装备技能
         * @param {*} arg4 为false时表示计入失效的技能
         * @returns {!boolean}
         */
        hasSkill(skill, arg2, arg3, arg4) {
            return game.expandSkills(this.getSkills(arg2, arg3, arg4)).contains(skill);
        }
        hasStockSkill(skill, arg1, arg2, arg3) {
            return game.expandSkills(this.getStockSkills(arg1, arg2, arg3)).contains(skill);
        }
        hasZhuSkill(skill, player) {
            if (!this.hasSkill(skill)) return false;
            var mode = get.mode();
            if (mode == 'identity' || (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu'))) {
                if (mode != 'identity') {
                    if (player && this.side != player.side) return false;
                }
                if (_status.mode == 'purple') {
                    if (player && this.identity.slice(0, 1) != player.identity.slice(0, 1)) return false;
                }
                if (this.isZhu == true) return true;
                for (var i in this.storage) {
                    if (i.indexOf('zhuSkill_') == 0 && this.storage[i].contains(skill)) return true;
                }
            }
            return false;
        }
        hasGlobalTag(tag, arg) {
            var skills = lib.skill.global.slice(0);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.ai) {
                    if (info.ai.skillTagFilter && info.ai[tag] &&
                        info.ai.skillTagFilter(this, tag, arg) === false) continue;
                    if (typeof info.ai[tag] == 'string') {
                        if (info.ai[tag] == arg) return true;
                    }
                    else if (info.ai[tag]) {
                        return true;
                    }
                }
            }
            return false;
        }
        hasSkillTag(tag, hidden, arg, globalskill) {
            var skills = this.getSkills(hidden);
            if (globalskill) {
                skills.addArray(lib.skill.global);
            }
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var info = lib.skill[skills[i]];
                if (info && info.ai) {
                    if (info.ai.skillTagFilter && info.ai[tag] &&
                        info.ai.skillTagFilter(this, tag, arg) === false) continue;
                    if (typeof info.ai[tag] == 'string') {
                        if (info.ai[tag] == arg) return true;
                    }
                    else if (info.ai[tag]) {
                        return true;
                    }
                }
            }
            return false;
        }
        hasJudge(name) {
            if (name && typeof name == 'object') {
                name = name.viewAs || name.name;
            }
            var judges = this.node.judges.childNodes;
            for (var i = 0; i < judges.length; i++) {
                if (judges[i].classList.contains('removing')) continue;
                if ((judges[i].viewAs || judges[i].name) == name) {
                    return true;
                }
            }
            return false;
        }
        hasFriend() {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut()) continue;
                if (game.players[i] != this && get.attitude(game.players[i], this) > 0) {
                    return true;
                }
            }
            return false;
        }
        hasUnknown(num) {
            var mode = get.mode();
            if (typeof num != 'number') {
                num = 0;
            }
            if (mode == 'identity' || mode == 'guozhan') {
                for (var i = 0; i < game.players.length; i++) {
                    if (game.players[i].ai.shown == 0 && game.players[i] != this) {
                        num--;
                        if (num <= 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        isUnknown(player) {
            var mode = get.mode();
            if (mode == 'identity' || mode == 'guozhan') {
                if (this.ai.shown == 0 && this != player) {
                    return true;
                }
            }
            return false;
        }
        //暗属性
        hasYami() {
            if (this.countCards('h', { nature: 'yami' })) return true;
            var skills = this.getSkills(true).concat(lib.skill.global);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var ifo = get.info(skills[i]);
                if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.nature == 'yami') {
                    if (!ifo.viewAsFilter || ifo.viewAsFilter(this)) {
                        return true;
                    }
                }
                else {
                    var hiddenYami = get.info(skills[i]).hiddenYami;
                    if (typeof hiddenYami == 'function' && hiddenYami(this, false)) {
                        return true;
                    }
                }
            }
            return false;
        }
        hasWuxie() {
            if (this.countCards('hs', 'wuxie')) return true;
            var skills = this.getSkills(true).concat(lib.skill.global);
            game.expandSkills(skills);
            for (var i = 0; i < skills.length; i++) {
                var ifo = get.info(skills[i]);
                if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
                    if (!ifo.viewAsFilter || ifo.viewAsFilter(this)) {
                        return true;
                    }
                }
                else {
                    var hiddenCard = get.info(skills[i]).hiddenCard;
                    if (typeof hiddenCard == 'function' && hiddenCard(this, 'wuxie')) {
                        return true;
                    }
                }
            }
            return false;
        }
        hasSha(respond, noauto) {
            if (this.countCards('hs', 'sha')) return true;
            if (this.countCards('hs', 'hufu')) return true;
            if (!noauto && this.countCards('hs', 'yuchanqian')) return true;
            if (this.hasSkillTag('respondSha', true, respond ? 'respond' : 'use', true)) return true;
            return false;
        }
        hasShan() {
            if (this.countCards('hs', 'shan')) return true;
            if (this.countCards('hs', 'hufu')) return true;
            if (this.hasSkillTag('respondShan', true, null, true)) return true;
            return false;
        }
        mayHaveShan() {
            return this.hasShan();
            // modify: After AngelBeats! -2nd Beat-
        }
        hasCard(name, position) {
            if (typeof name == 'function') {
                var hs = this.getCards(position);
                for (var i = 0; i < hs.length; i++) {
                    if (name(hs[i])) return true;
                }
            }
            else {
                if (this.countCards(position, name)) return true;
            }
            return false;
        }
        canEquip(name, replace) {
            if (get.type(name) == 'card') {
                name = get.equiptype(name);
            }
            var range = get.subtype(name);
            if (this.isDisabled(range)) return false;
            if (['equip3', 'equip4'].contains(range) && this.getEquip(6)) return false;
            if (!replace && !this.isEmpty(range)) return false;
            return true;
        }
        /**
         * 装备类型
         * |string|number|equip|
         * |:----:|:----:|:---:|
         * |equip1|1|武器|
         * |equip2|2|防具|
         * |equip3|3|防御载具|
         * |equip4|4|攻击载具|
         * |equip5|5|宝物|
         * |equip6|6|坐骑|
         * 
         * @typedef {('equip[1-6]'|number)} GameCores.EquipType
         */
        /**
         * 返回角色装备区的一张牌
         * @param {(GameCores.GameObjects.Card|'equip[0-9]'|number)} name 如果为游戏牌对象，使用其装备类型(如果有)；如果不是可装备类型或者`name`未指定，此函数返回null；可以取值为数值[0-9]或字符串'equip[0-9]'，但是通常只在[1-6]范围内({@link GameCores.EquipType})
         * @returns {(null|GameCores.GameObjects.Card)}
         */
        getEquip(name) {
            var es = this.getCards('e');
            if (typeof name == 'object' && get.info(name)) {
                name = get.info(name).subtype;
                if (name) {
                    name = parseInt(name[5]);
                }
            }
            else if (typeof name == 'string' && name.indexOf('equip') == 0 && name.length == 6) {
                name = parseInt(name[5]);
            }
            if (!name) {
                return null;
            }
            for (var i = 0; i < es.length; i++) {
                if (typeof name === 'number') {
                    if (get.info(es[i]).subtype === 'equip' + name) {
                        return es[i];
                    }
                }
                else {
                    if (es[i].name === name) return es[i];
                    var source = get.info(es[i]).source;
                    if (Array.isArray(source) && source.contains(name)) {
                        return es[i];
                    }
                }
            }
            return null;
        }
        /**
         * 返回角色判定区一张(指定牌|视为指定牌)
         * @function
         * @param {?string} name 指定牌的牌名
         * @returns {(GameCores.GameObjects.Card|null)} 如果没找到，返回null
         */
        getJudge(name) {
            var judges = this.node.judges.childNodes;
            for (var i = 0; i < judges.length; i++) {
                if (judges[i].classList.contains('removing')) continue;
                if ((judges[i].viewAs || judges[i].name) == name) {
                    return judges[i];
                }
            }
            return null;
        }
        $drawAuto(cards, target) {
            if (this.isUnderControl(true, target)) {
                this.$draw(cards);
            }
            else {
                this.$draw(cards.length);
            }
        }
        $draw(num, init, config) {
            if (init !== false && init !== 'nobroadcast') {
                game.broadcast(function (player, num, init, config) {
                    player.$draw(num, init, config)
                }, this, num, init, config);
            }
            var cards, node;
            if (get.itemtype(num) == 'cards') {
                cards = num;
                num = cards.length;
            }
            else if (get.itemtype(num) == 'card') {
                cards = [num];
                num = 1;
            }
            if (init !== false) {
                if (cards) {
                    game.addVideo('drawCard', this, get.cardsInfo(cards));
                }
                else {
                    game.addVideo('draw', this, num);
                }
            }
            if (cards) {
                cards = cards.slice(0);
                node = cards.shift().copy('thrown', 'drawingcard');
            }
            else {
                node = ui.create.div('.card.thrown.drawingcard');
            }
            node.fixed = true;
            node.hide();

            var dx, dy;
            if (game.chess) {
                var rect = this.getBoundingClientRect();

                if (rect.left <= 80) {
                    dx = -10;
                    if (rect.top <= 80) {
                        dy = -10;
                    }
                    else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
                        dy = 10;
                    }
                    else {
                        dy = 0;
                    }
                }
                else if (rect.left + rect.width + 80 >= ui.chessContainer.offsetWidth) {
                    dx = 10;
                    if (rect.top <= 80) {
                        dy = -10;
                    }
                    else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
                        dy = 10;
                    }
                    else {
                        dy = 0;
                    }
                }
                else if (rect.top <= 80) {
                    dx = 0;
                    dy = -10;
                }
                else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
                    dx = 0;
                    dy = 10;
                }
                else {
                    dx = rect.left + this.offsetWidth / 2 - ui.arena.offsetWidth / 2;
                    dy = rect.top + this.offsetHeight / 2 - ui.arena.offsetHeight / 2;
                }

                var coeff = 240 / Math.sqrt(dx * dx + dy * dy);
                dx *= coeff;
                dy *= coeff;

                node.style.left = (this.getLeft() + this.offsetWidth / 2 - 52 - dx) + 'px';
                node.style.top = (this.getTop() + this.offsetHeight / 2 - 52 - dy) + 'px';
                this.parentNode.appendChild(node);
            }
            else {
                this.parentNode.appendChild(node);
                node.style.left = 'calc(50% - 52px)';
                node.style.top = 'calc(50% - 52px)';

                dx = this.getLeft() + this.offsetWidth / 2 - 52 - node.offsetLeft;
                dy = this.getTop() + this.offsetHeight / 2 - 52 - node.offsetTop;

                if (get.is.mobileMe(this)) {
                    dx += get.cardOffset();
                    if (ui.arena.classList.contains('oblongcard')) {
                        dy -= 16;
                    }
                }
            }
            node.style.transitionDuration = '0.8s';
            ui.refresh(node);
            if (typeof num == 'number' && init !== false) {
                config = {
                    total: num,
                    current: 1
                }
            }
            if (config && config.total > 1) {
                var total = config.total, current = config.current;
                var dxtotal;
                if (total <= 5) {
                    dxtotal = Math.min(80, (total - 1) * 20);
                    dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1)
                }
                else {
                    var total2 = Math.floor(total / 2);
                    if (current <= total2) {
                        total = total2;
                        dy -= 20;
                    }
                    else {
                        current -= total2;
                        total -= total2;
                        dy += 20;
                    }
                    dxtotal = Math.min(80, (total - 1) * 20);
                    dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1)
                }
                config.current++;
            }
            if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
                node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
            }
            else {
                node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
            }
            node.show();

            node.listenTransition(function () {
                node.style.transitionDuration = '0.5s';
                ui.refresh(node);
                node.delete();
            });
            var that = this;
            if (num && num > 1) {
                if (config && config.total > 1) {
                    setTimeout(function () {
                        if (cards) {
                            that.$draw(cards, false, config)
                        }
                        else {
                            that.$draw(num - 1, false, config)
                        }
                    }, 50)
                }
                else {
                    setTimeout(function () {
                        if (cards) {
                            that.$draw(cards, false, config)
                        }
                        else {
                            that.$draw(num - 1, false, config)
                        }
                    }, 200);
                }
            }
        }
        $compareMultiple(card1, targets, cards) {
            game.broadcast(function (player, card1, targets, cards) {
                player.$compareMultiple(card1, targets, cards);
            }, this, card1, targets, cards);
            game.addVideo('compareMultiple', this, [get.cardInfo(card1), get.targetsInfo(targets), get.cardsInfo(cards)]);
            var player = this;
            var node1 = player.$throwxy2(card1,
                'calc(50% - 52px)', 'calc(50% + 10px)', 'perspective(600px) rotateY(180deg)', true
            );
            if (lib.config.cardback_style != 'default') {
                node1.style.transitionProperty = 'none';
                ui.refresh(node1);
                node1.classList.add('infohidden');
                ui.refresh(node1);
                node1.style.transitionProperty = '';
            }
            else {
                node1.classList.add('infohidden');
            }

            node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
            var onEnd01 = function () {
                node1.removeEventListener('webkitTransitionEnd', onEnd01);
                setTimeout(function () {
                    node1.style.transition = 'all ease-in 0.3s';
                    node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                    var onEnd = function () {
                        node1.classList.remove('infohidden');
                        node1.style.transition = 'all 0s';
                        ui.refresh(node1);
                        node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                        ui.refresh(node1);
                        node1.style.transition = '';
                        ui.refresh(node1);
                        node1.style.transform = '';
                        node1.removeEventListener('webkitTransitionEnd', onEnd);
                    }
                    node1.listenTransition(onEnd);
                }, 300);
            };
            node1.listenTransition(onEnd01);

            setTimeout(function () {
                var left0 = -targets.length * 52 - (targets.length - 1) * 8;
                for (var i = 0; i < targets.length; i++) {
                    (function (target, card2, i) {
                        var left = left0 + i * 120;
                        var node2;
                        if (left < 0) {
                            node2 = target.$throwxy2(card2,
                                'calc(50% - ' + (-left) + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
                            );
                        }
                        else {
                            node2 = target.$throwxy2(card2,
                                'calc(50% + ' + left + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
                            );
                        }
                        if (lib.config.cardback_style != 'default') {
                            node2.style.transitionProperty = 'none';
                            ui.refresh(node2);
                            node2.classList.add('infohidden');
                            ui.refresh(node2);
                            node2.style.transitionProperty = '';
                        }
                        else {
                            node2.classList.add('infohidden');
                        }
                        node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
                        var onEnd02 = function () {
                            node2.removeEventListener('webkitTransitionEnd', onEnd02);
                            setTimeout(function () {
                                node2.style.transition = 'all ease-in 0.3s';
                                node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                                var onEnd = function () {
                                    node2.classList.remove('infohidden');
                                    node2.style.transition = 'all 0s';
                                    ui.refresh(node2);
                                    node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                                    ui.refresh(node2);
                                    node2.style.transition = '';
                                    ui.refresh(node2);
                                    node2.style.transform = '';
                                    node2.removeEventListener('webkitTransitionEnd', onEnd);
                                }
                                node2.listenTransition(onEnd);
                            }, 200);
                        };
                        node2.listenTransition(onEnd02);
                    }(targets[i], cards[i], i))
                }
            }, 200);
        }
        $compare(card1, target, card2) {
            game.broadcast(function (player, target, card1, card2) {
                player.$compare(card1, target, card2);
            }, this, target, card1, card2);
            game.addVideo('compare', this, [get.cardInfo(card1), target.dataset.position, get.cardInfo(card2)]);
            var player = this;
            var node1 = player.$throwxy2(card1,
                'calc(50% - 114px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
            );
            if (lib.config.cardback_style != 'default') {
                node1.style.transitionProperty = 'none';
                ui.refresh(node1);
                node1.classList.add('infohidden');
                ui.refresh(node1);
                node1.style.transitionProperty = '';
            }
            else {
                node1.classList.add('infohidden');
            }

            node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
            var onEnd01 = function () {
                node1.removeEventListener('webkitTransitionEnd', onEnd01);
                setTimeout(function () {
                    node1.style.transition = 'all ease-in 0.3s';
                    node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                    var onEnd = function () {
                        node1.classList.remove('infohidden');
                        node1.style.transition = 'all 0s';
                        ui.refresh(node1);
                        node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                        ui.refresh(node1);
                        node1.style.transition = '';
                        ui.refresh(node1);
                        node1.style.transform = '';
                        node1.removeEventListener('webkitTransitionEnd', onEnd);
                    }
                    node1.listenTransition(onEnd);
                }, 300);
            };
            node1.listenTransition(onEnd01);
            setTimeout(function () {
                var node2 = target.$throwxy2(card2,
                    'calc(50% + 10px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
                );
                if (lib.config.cardback_style != 'default') {
                    node2.style.transitionProperty = 'none';
                    ui.refresh(node2);
                    node2.classList.add('infohidden');
                    ui.refresh(node2);
                    node2.style.transitionProperty = '';
                }
                else {
                    node2.classList.add('infohidden');
                }
                node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
                var onEnd02 = function () {
                    node2.removeEventListener('webkitTransitionEnd', onEnd02);
                    setTimeout(function () {
                        node2.style.transition = 'all ease-in 0.3s';
                        node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                        var onEnd = function () {
                            node2.classList.remove('infohidden');
                            node2.style.transition = 'all 0s';
                            ui.refresh(node2);
                            node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                            ui.refresh(node2);
                            node2.style.transition = '';
                            ui.refresh(node2);
                            node2.style.transform = '';
                            node2.removeEventListener('webkitTransitionEnd', onEnd);
                        }
                        node2.listenTransition(onEnd);
                    }, 200);
                };
                node2.listenTransition(onEnd02);
            }, 200);
        }
        $throw(card, time, init, nosource) {
            if (typeof card == 'number') {
                var tmp = card;
                card = [];
                while (tmp--) {
                    var cardx = ui.create.card();
                    cardx.classList.add('infohidden');
                    cardx.classList.add('infoflip');
                    card.push(cardx);
                }
            }
            if (init !== false) {
                if (init !== 'nobroadcast') {
                    game.broadcast(function (player, card, time, init, nosource) {
                        player.$throw(card, time, init, nosource);
                    }, this, card, time, init);
                }
                if (get.itemtype(card) != 'cards') {
                    if (get.itemtype(card) == 'card') {
                        card = [card];
                    }
                    else {
                        return;
                    }
                }
                game.addVideo('throw', this, [get.cardsInfo(card), time, nosource]);
            }
            if (game.chess) {
                this.chessFocus();
            }
            if (get.itemtype(card) == 'cards') {
                var node;
                for (var i = 0; i < card.length; i++) {
                    node = this.$throw(card[i], time, false, nosource);
                }
                return node;
            }
            else {
                var node;
                if (card == undefined || card.length == 0) return;
                node = this.$throwordered(card.copy('thrown'), nosource);
                if (time != undefined) {
                    node.fixed = true;
                    setTimeout(function () { node.delete() }, time);
                }
                lib.listenEnd(node);
                return node;
            }
        }
        $throwordered() {
            return this.$throwordered2.apply(this, arguments);
            // if(lib.config.low_performance){
            //     return this.$throwordered2.apply(this,arguments);
            // }
            // else{
            //     return this.$throwordered1.apply(this,arguments);
            // }
        }
        $throwordered1(node, nosource) {
            node.classList.add('thrown');
            node.hide();
            node.style.transitionProperty = 'left,top,opacity,transform';
            for (var i = 0; i < ui.thrown.length; i++) {
                if (ui.thrown[i].parentNode != ui.arena ||
                    ui.thrown[i].classList.contains('removing')) {
                    ui.thrown.splice(i--, 1);
                }
            }
            ui.thrown.push(node);
            var uithrowns = ui.thrown.slice(0);
            var tops;
            if (game.chess) {
                switch (Math.floor((ui.thrown.length - 1) / 4)) {
                    case 0:
                        tops = ['calc(50% - 82px)'];
                        break;
                    case 1:
                        tops = ['calc(50% - 139px)', 'calc(50% - 25px)'];
                        break;
                    case 2:
                        tops = ['calc(50% - 196px)', 'calc(50% - 82px)', 'calc(50% + 32px)'];
                        break;
                    default:
                        tops = ['calc(50% - 253px)', 'calc(50% - 139px)',
                            'calc(50% - 25px)', 'calc(50% + 89px)'];
                }
            }
            else {
                switch (Math.floor((ui.thrown.length - 1) / 4)) {
                    case 0:
                        tops = ['calc(50% - 52px)'];
                        break;
                    case 1:
                        tops = ['calc(50% - 109px)', 'calc(50% + 5px)'];
                        break;
                    case 2:
                        tops = ['calc(50% - 166px)', 'calc(50% - 52px)', 'calc(50% + 62px)'];
                        break;
                    default:
                        tops = ['calc(50% - 223px)', 'calc(50% - 109px)',
                            'calc(50% + 5px)', 'calc(50% + 119px)'];
                }
            }
            while (uithrowns.length) {
                var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
                switch (throwns.length) {
                    case 1:
                        throwns[0].style.left = 'calc(50% - 52px)';
                        break;
                    case 2:
                        throwns[0].style.left = 'calc(50% - 109px)';
                        throwns[1].style.left = 'calc(50% + 5px)';
                        break;
                    case 3:
                        throwns[0].style.left = 'calc(50% - 166px)';
                        throwns[1].style.left = 'calc(50% - 52px)';
                        throwns[2].style.left = 'calc(50% + 62px)';
                        break;
                    case 4:
                        throwns[0].style.left = 'calc(50% - 223px)';
                        throwns[1].style.left = 'calc(50% - 109px)';
                        throwns[2].style.left = 'calc(50% + 5px)';
                        throwns[3].style.left = 'calc(50% + 119px)';
                        break;
                }
                var top;
                if (tops.length) {
                    top = tops.shift();
                }
                else {
                    if (game.chess) {
                        top = 'calc(50% - 82px)';
                    }
                    else {
                        top = 'calc(50% - 52px)';
                    }
                }
                for (var i = 0; i < throwns.length; i++) {
                    throwns[i].style.top = top;
                }
            }
            if (nosource) {
                node.style.transform = 'scale(0)';
                node.classList.add('center');
            }
            else {
                var parseCalc = function (str) {
                    var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
                    var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
                    return [parseInt(per), parseInt(add)];
                }
                var nx = parseCalc(node.style.left);
                var ny = parseCalc(node.style.top);
                nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
                ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
                var dx, dy;
                if (game.chess) {
                    var rect = this.getBoundingClientRect();
                    dx = rect.left + this.offsetWidth / 2 - 52 - nx;
                    dy = rect.top + this.offsetHeight / 2 - 52 - ny;
                }
                else {
                    dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
                    dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
                    if (get.is.mobileMe(this)) {
                        dx += get.cardOffset();
                        if (ui.arena.classList.contains('oblongcard')) {
                            dy -= 16;
                        }
                    }
                }
                if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
                    node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
                }
                else {
                    node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                }
            }
            ui.arena.appendChild(node);
            ui.refresh(node);
            node.style.transform = '';
            node.show();
            lib.listenEnd(node);
            return node;
        }
        $throwordered2(node, nosource) {
            node.classList.add('thrown');
            node.classList.add('center');
            node.hide();
            node.style.transitionProperty = 'left,top,opacity,transform';

            if (nosource) {
                // node.style.transform='scale(0)';
            }
            else {
                var nx = [50, -52];
                var ny = [50, -52];
                nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
                ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
                var dx, dy;
                if (game.chess) {
                    var rect = this.getBoundingClientRect();
                    dx = rect.left + this.offsetWidth / 2 - 52 - nx;
                    dy = rect.top + this.offsetHeight / 2 - 52 - ny;
                }
                else {
                    dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
                    dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
                    if (get.is.mobileMe(this)) {
                        dx += get.cardOffset();
                        if (ui.arena.classList.contains('oblongcard')) {
                            dy -= 16;
                        }
                    }
                }
                if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
                    node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
                }
                else {
                    node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                }
            }
            ui.arena.appendChild(node);
            ui.refresh(node);

            for (var i = 0; i < ui.thrown.length; i++) {
                if (ui.thrown[i].parentNode != ui.arena ||
                    ui.thrown[i].classList.contains('removing')) {
                    ui.thrown.splice(i--, 1);
                }
            }
            ui.thrown.push(node);
            var uithrowns = ui.thrown.slice(0);
            var tops;
            switch (Math.floor((ui.thrown.length - 1) / 4)) {
                case 0:
                    tops = [0];
                    break;
                case 1:
                    tops = [-57, 57];
                    break;
                case 2:
                    tops = [-114, 0, 114];
                    break;
                default:
                    tops = [-171, -57, 57, 171];
            }
            while (uithrowns.length) {
                var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
                switch (throwns.length) {
                    case 1:
                        throwns[0]._transthrown = 'translate(0px,';
                        break;
                    case 2:
                        throwns[0]._transthrown = 'translate(-57px,';
                        throwns[1]._transthrown = 'translate(57px,';
                        break;
                    case 3:
                        throwns[0]._transthrown = 'translate(-114px,';
                        throwns[1]._transthrown = 'translate(0,';
                        throwns[2]._transthrown = 'translate(114px,';
                        break;
                    case 4:
                        throwns[0]._transthrown = 'translate(-171px,';
                        throwns[1]._transthrown = 'translate(-57px,';
                        throwns[2]._transthrown = 'translate(57px,';
                        throwns[3]._transthrown = 'translate(171px,';
                        break;
                }
                var top;
                if (tops.length) {
                    top = tops.shift();
                }
                else {
                    top = 0;
                }
                if (game.chess) {
                    top -= 30;
                }
                for (var i = 0; i < throwns.length; i++) {
                    throwns[i].style.transform = throwns[i]._transthrown + top + 'px)';
                    delete throwns[i]._transthrown;
                }
            }

            node.show();
            lib.listenEnd(node);
            return node;
        }
        $throwxy(card, left, top) {
            var node = card.copy('thrown', 'thrownhighlight');
            node.dataset.position = this.dataset.position;
            node.hide();
            node.style.transitionProperty = 'left,top,opacity';

            ui.arena.appendChild(node);
            ui.refresh(node);
            node.show();
            node.style.left = left;
            node.style.top = top;
            lib.listenEnd(node);
            return node;
        }
        $throwxy2(card, left, top, trans, flipx, flipy) {
            if (game.chess) {
                return this.$throwxy.apply(this, arguments);
            }
            var node = card.copy('thrown', 'thrownhighlight');
            node.style.left = left;
            node.style.top = top;
            node.hide();
            // node.style.transitionProperty='left,top,opacity,transform';

            var parseCalc = function (str) {
                var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
                var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
                return [parseInt(per), parseInt(add)];
            }
            var nx = parseCalc(node.style.left);
            var ny = parseCalc(node.style.top);
            nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
            ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
            var dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
            var dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
            if (flipx) dx = -dx;
            if (flipy) dy = -dy;
            if (trans) {
                node.style.transform = trans + ' translate(' + dx + 'px,' + dy + 'px)';
            }
            else {
                node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
            }

            ui.arena.appendChild(node);
            ui.refresh(node);
            node.show();
            // node.style.transform=trans||'';
            lib.listenEnd(node);
            return node;
        }
        throwDice(num) {
            if (typeof num != 'number') {
                num = get.rand(6) + 1;
                _status.event.num = num;
            }
            if (!game.online) {
                game.pause();
            }
            game.broadcastAll(function (num) {
                var diceContainer = ui.create.div('.fullsize.dice-container', ui.window);
                ui.window.classList.add('dicepaused');
                var dice = ui.create.div('.dice');
                var side;

                side = ui.create.div('.side.front', dice);
                ui.create.div('.dot.center', side);
                ui.create.div('.side.front.inner', dice);

                side = ui.create.div('.side.top', dice);
                ui.create.div('.dot.dtop.dleft', side);
                ui.create.div('.dot.dbottom.dright', side);
                ui.create.div('.side.top.inner', dice);

                side = ui.create.div('.side.right', dice);
                ui.create.div('.dot.dtop.dleft', side);
                ui.create.div('.dot.center', side);
                ui.create.div('.dot.dbottom.dright', side);
                ui.create.div('.side.right.inner', dice);

                side = ui.create.div('.side.left', dice);
                ui.create.div('.dot.dtop.dleft', side);
                ui.create.div('.dot.dtop.dright', side);
                ui.create.div('.dot.dbottom.dleft', side);
                ui.create.div('.dot.dbottom.dright', side);
                ui.create.div('.side.left.inner', dice);

                side = ui.create.div('.side.bottom', dice);
                ui.create.div('.dot.center', side);
                ui.create.div('.dot.dtop.dleft', side);
                ui.create.div('.dot.dtop.dright', side);
                ui.create.div('.dot.dbottom.dleft', side);
                ui.create.div('.dot.dbottom.dright', side);
                ui.create.div('.side.bottom.inner', dice);

                side = ui.create.div('.side.back', dice);
                ui.create.div('.dot.dtop.dleft', side);
                ui.create.div('.dot.dtop.dright', side);
                ui.create.div('.dot.dbottom.dleft', side);
                ui.create.div('.dot.dbottom.dright', side);
                ui.create.div('.dot.center dleft', side);
                ui.create.div('.dot.center dright', side);
                ui.create.div('.side.back.inner', dice);

                ui.create.div('.side.cover.x', dice);
                ui.create.div('.side.cover.y', dice);
                ui.create.div('.side.cover.z', dice);

                var map = {
                    1: [75, 0, 45],
                    2: [-15, 45, 0],
                    3: [165, -45, 90],
                    4: [345, -45, 90],
                    5: [345, -45, 180],
                    6: [255, 0, 135]
                };
                dice.roll = function (deg) {
                    if (typeof deg == 'number') {
                        dice.current[0] += deg;
                        deg = dice.current;
                    }
                    deg = deg.slice(0);
                    dice.current = deg;
                    this.style.transform = 'rotateX(' + deg[0] + 'deg) rotateY(' + deg[1] + 'deg) rotateZ(' + deg[2] + 'deg)';
                };
                dice.roll(map[num]);
                diceContainer.appendChild(dice);
                ui.refresh(dice);
                dice.roll(1025);

                dice.addEventListener('webkitTransitionEnd', function () {
                    if (!dice.over) {
                        dice.style.transition = 'transform 0.8s ease';
                        dice.roll(-20);
                        dice.over = true;
                    }
                    else if (!dice.resumed) {
                        setTimeout(function () {
                            diceContainer.delete();
                            ui.window.classList.remove('dicepaused');
                        }, 300);
                        if (!game.online) {
                            setTimeout(game.resume, 800);
                        }
                        dice.resumed = true;
                    }
                });
            }, num);
        }
        $giveAuto(card, player) {
            if (Array.isArray(card) && card.length == 0) return;
            var args = Array.from(arguments);
            if (_status.connectMode || (!this.isUnderControl(true) && !player.isUnderControl(true))) {
                if (Array.isArray(card)) {
                    card = card.length;
                }
                else {
                    card = 1;
                }
                args[0] = card;
            }
            return this.$give.apply(this, args);
        }
        $give(card, player, log, init) {
            if (init !== false) {
                game.broadcast(function (source, card, player, init) {
                    source.$give(card, player, false, init);
                }, this, card, player, init);
                if (typeof card == 'number' && card >= 0) {
                    game.addVideo('give', this, [card, player.dataset.position]);
                }
                else {
                    if (get.itemtype(card) == 'card') {
                        card = [card];
                    }
                    if (get.itemtype(card) == 'cards') {
                        game.addVideo('giveCard', this, [get.cardsInfo(card), player.dataset.position]);
                    }
                }
            }
            if (get.itemtype(card) == 'cards') {
                if (log != false && !_status.video) {
                    game.log(player, '从', this, '获得了', card);
                }
                if (this.$givemod) {
                    this.$givemod(card, player);
                }
                else {
                    for (var i = 0; i < card.length; i++) {
                        this.$give(card[i], player, false, false);
                    }
                }
            }
            else if (typeof card == 'number' && card >= 0) {
                if (log != false && !_status.video) {
                    game.log(player, '从', this, '获得了' + get.cnNumber(card) + '张牌');
                }
                if (this.$givemod) {
                    this.$givemod(card, player);
                }
                else {
                    while (card--) this.$give('', player, false, false);
                }
            }
            else {
                if (log != false && !_status.video) {
                    if (get.itemtype(card) == 'card' && log != false) {
                        game.log(player, '从', this, '获得了', card);
                    }
                    else {
                        game.log(player, '从', this, '获得了一张牌');
                    }
                }
                if (this.$givemod) {
                    this.$givemod(card, player);
                }
                else {
                    var node;
                    if (get.itemtype(card) == 'card') {
                        node = card.copy('card', 'thrown', false);
                    }
                    else {
                        node = ui.create.div('.card.thrown');
                    }
                    // node.dataset.position=this.dataset.position;
                    node.fixed = true;
                    this.$throwordered(node);
                    // lib.listenEnd(node);
                    // node.hide();
                    // node.style.transitionProperty='left,top,opacity';
                    //
                    // node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
                    //
                    // ui.arena.appendChild(node);
                    // ui.refresh(node);
                    // node.show();
                    // node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
                    // node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

                    node.listenTransition(function () {
                        var dx = player.getLeft() + player.offsetWidth / 2 - 52 - node.offsetLeft;
                        var dy = player.getTop() + player.offsetHeight / 2 - 52 - node.offsetTop;
                        if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
                            node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
                        }
                        else {
                            node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
                        }

                        node.delete();
                    });
                    // setTimeout(function(){
                    //     // node.removeAttribute('style');
                    //     // node.dataset.position=player.dataset.position;
                    //     var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
                    //     var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
                    //     if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                    //         node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                    //     }
                    //     else{
                    //         node.style.transform='translate('+dx+'px,'+dy+'px)';
                    //     }
                    //
                    //     node.delete();
                    // },700);
                }
            }
        }
        $equip(card, viewAs) {
            var originalName = card.originalName;
            if (viewAs && this.storage.disableEquip != undefined && this.storage.disableEquip.contains(get.subtype(viewAs))) {
                this.gain(card, 'gain2');
                game.log(this, '装备失败');
            }
            else if (this.storage.disableEquip != undefined && this.storage.disableEquip.contains(get.subtype(card))) {
                this.gain(card, 'gain2');
                game.log(this, '装备失败');
            }
            else {
                var player = this;
                game.broadcast(function (player, card, viewAs) {
                    player.$equip(card, viewAs);
                }, player, card, viewAs);
                card.fix();
                card.style.transform = '';
                card.classList.remove('drawinghidden');
                delete card._transform;
                //已修改
                card.originalName = originalName;
                card.viewAs = viewAs;
                if (viewAs && viewAs != card.name) {
                    if (card.classList.contains('fullskin') || card.classList.contains('fullborder')) {
                        card.classList.add('fakejudge');
                        card.node.background.innerHTML = lib.translate[viewAs.name + '_bg'] || get.translation(viewAs)[0];
                    }
                    card.classList.remove(get.subtype(card));
                    card.classList.add(get.subtype(viewAs));
                    if (typeof viewAs == 'string') card.viewAs = viewAs;
                    else card.viewAs = viewAs.name;
                }
                else {
                    card.classList.remove('fakejudge');
                    delete card.viewAs;
                }
                //console.log(card.viewAs);
                if (card.viewAs && card.name != card.viewAs) {
                    if (!card.originalName) card.originalName = card.name;
                    card.name = card.viewAs;
                }
                var equipNum = get.equipNum(card);
                var equipped = false;
                for (var i = 0; i < player.node.equips.childNodes.length; i++) {
                    if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
                        player.node.equips.insertBefore(card, player.node.equips.childNodes[i]);
                        equipped = true;
                        break;
                    }
                }
                if (!equipped) {
                    player.node.equips.appendChild(card);
                    if (_status.discarded) {
                        _status.discarded.remove(card);
                    }
                }
                var ecard = viewAs ? { name: viewAs } : card;
                var info = get.info(ecard);
                if (info.skills) {
                    for (var i = 0; i < info.skills.length; i++) {
                        player.addSkillTrigger(info.skills[i]);
                    }
                }
                return player;
            };
        }
        $gain(card, log, init) {
            if (init !== false) {
                game.broadcast(function (player, card, init) {
                    player.$gain(card, false, init);
                }, this, card, init);
                if (typeof card == 'number' && card >= 0) {
                    game.addVideo('gain', this, card);
                }
                else {
                    if (get.itemtype(card) == 'card') {
                        card = [card];
                    }
                    if (get.itemtype(card) == 'cards') {
                        game.addVideo('gainCard', this, get.cardsInfo(card));
                    }
                    else {
                        game.addVideo('gain', this, 1);
                    }
                }
            }
            if (get.itemtype(card) == 'cards') {
                if (log != false && !_status.video) {
                    game.log(this, '获得了', card);
                }
                if (this.$gainmod) {
                    this.$gainmod(card);
                }
                else {
                    for (var i = 0; i < card.length; i++) {
                        this.$gain(card[i], false, false);
                    }
                }
            }
            else if (typeof card == 'number' && card > 1) {
                if (log != false && !_status.video) {
                    game.log(this, '获得了' + get.cnNumber(card) + '张牌');
                }
                if (this.$gainmod) {
                    this.$gainmod(card);
                }
                else {
                    for (var i = 0; i < card; i++) {
                        this.$gain(1, false, false);
                    }
                }
            }
            else {
                if (get.itemtype(card) == 'card' && log != false && !_status.video) {
                    game.log(this, '获得了', card);
                }
                if (this.$gainmod) {
                    this.$gainmod(card);
                }
                else {
                    var node;
                    if (get.itemtype(card) == 'card') {
                        // node=this.$throwordered(card.copy(),true);
                        node = card.copy('thrown', false);
                    }
                    else {
                        // node=this.$throwordered(ui.create.div('.card.thrown'),true);
                        node = ui.create.div('.card.thrown');
                        node.moveTo = lib.element.card.moveTo;
                        node.moveDelete = lib.element.card.moveDelete;
                    }
                    node.fixed = true;
                    node.style.left = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
                    node.style.top = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
                    node.style.transform = 'scale(0)';
                    node.hide();
                    ui.arena.appendChild(node);
                    ui.refresh(node);
                    node.show();
                    node.style.transform = '';

                    lib.listenEnd(node);
                    var player = this;
                    setTimeout(function () {
                        node.moveDelete(player);
                    }, 700);
                }
            }
        }
        $gain2(cards, log) {
            if (log === true) {
                game.log(this, '获得了', cards);
            }
            game.broadcast(function (player, cards) {
                player.$gain2(cards);
            }, this, cards);
            if (get.itemtype(cards) == 'card') cards = [cards];
            else if (get.itemtype(cards) != 'cards') return;
            var list = [], list2 = [];
            for (var i = 0; i < cards.length; i++) {
                if (cards[i].clone &&
                    (cards[i].clone.parentNode == this.parentNode ||
                        cards[i].clone.parentNode == ui.arena) &&
                    parseFloat(getComputedStyle(cards[i].clone).opacity) > 0.3) {
                    cards[i].clone.moveDelete(this);
                    list2.push(cards[i].clone);
                }
                else {
                    list.push(cards[i]);
                }
            }
            if (list2.length) {
                game.addVideo('gain2', this, get.cardsInfo(list2));
            }
            if (list.length) {
                this.$draw(list, 'nobroadcast');
                return true;
            }
        }
        /**
         * 本角色播放技能动画
         */
        //TODO
        $skill(name, type, color, avatar) {
            if (typeof type != 'string') type = 'legend';
            if (!avatar) {
                this.playerfocus(1500);
                game.delay(2);
            }
            else {
                game.addVideo('playerfocus2');
                game.broadcastAll(function () {
                    ui.arena.classList.add('playerfocus');
                    setTimeout(function () {
                        ui.arena.classList.remove('playerfocus');
                    }, 1800)
                });
                game.delay(3);
            }
            var that = this;
            setTimeout(function () {
                game.broadcastAll(function (that, type, name, color, avatar) {
                    if (lib.config.animation && !lib.config.low_performance) {
                        if (game.chess) {
                            that['$' + type + '2'](1200);
                        }
                        else {
                            that['$' + type](1200);
                        }
                    }
                    if (name) {
                        that.$fullscreenpop(name, color, avatar);
                    }
                }, that, type, name, color, avatar);
            }, avatar ? 0 : 300);
        }
        $fire() {
            game.addVideo('flame', this, 'fire');
            var left, top;
            if (game.chess) {
                var rect = this.getBoundingClientRect();
                left = rect.left;
                top = rect.top;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 20, 700, 'fire');
        }
        $thunder() {
            game.addVideo('flame', this, 'thunder');
            var left, top;
            if (game.chess) {
                var rect = this.getBoundingClientRect();
                left = rect.left;
                top = rect.top;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'thunder');
        }
        $rare2() {
            game.addVideo('flame', this, 'rare2');
            var rect = this.getBoundingClientRect();
            var left = rect.left;
            var top = rect.top + 15;
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'rare');
        }
        $epic2() {
            game.addVideo('flame', this, 'epic2');
            var rect = this.getBoundingClientRect();
            var left = rect.left;
            var top = rect.top + 15;
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'epic');
        }
        $legend2() {
            game.addVideo('flame', this, 'legend2');
            var rect = this.getBoundingClientRect();
            var left = rect.left;
            var top = rect.top + 15;
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'legend');
        }
        $rare(time) {
            time = time || 700;
            game.addVideo('flame', this, 'rare');
            var left, top;
            if (game.chess) {
                left = this.getLeft() - ui.arena.offsetLeft;
                top = this.getTop() - ui.arena.offsetTop;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            if (this.classList.contains('minskin')) {
                top += 15;
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, time, 'rare');
        }
        $epic(time) {
            time = time || 700;
            game.addVideo('flame', this, 'epic');
            var left, top;
            if (game.chess) {
                left = this.getLeft() - ui.arena.offsetLeft;
                top = this.getTop() - ui.arena.offsetTop;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            if (this.classList.contains('minskin')) {
                top += 15;
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, time, 'epic');
        }
        $legend(time) {
            time = time || 700;
            game.addVideo('flame', this, 'legend');
            var left, top;
            if (game.chess) {
                left = this.getLeft() - ui.arena.offsetLeft;
                top = this.getTop() - ui.arena.offsetTop;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            if (this.classList.contains('minskin')) {
                top += 15;
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, time, 'legend');
        }
        $coin() {
            game.broadcast(function (player) {
                if (!lib.config.low_performance) {
                    player.$coin();
                }
            }, this);
            game.addVideo('flame', this, 'coin');
            var left = this.getLeft() - ui.arena.offsetLeft;
            var top = this.getTop() - ui.arena.offsetTop;
            if (this.classList.contains('minskin')) {
                top += 15;
            }
            top -= 25;
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'coin');
        }
        $dust() {
            game.broadcast(function (player) {
                if (!lib.config.low_performance) {
                    player.$dust();
                }
            }, this);
            game.addVideo('flame', this, 'dust');
            var left = this.getLeft() - ui.arena.offsetLeft;
            var top = this.getTop() - ui.arena.offsetTop;
            if (this.classList.contains('minskin')) {
                top += 15;
            }
            top -= 25;
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'dust');
        }
        $recover() {
            game.addVideo('flame', this, 'recover');
            var left, top;
            if (game.chess) {
                var rect = this.getBoundingClientRect();
                left = rect.left;
                top = rect.top;
            }
            else {
                left = this.getLeft();
                top = this.getTop();
            }
            game.animate.flame(left + this.offsetWidth / 2,
                top + this.offsetHeight - 30, 700, 'recover');
        }
        $fullscreenpop(str, nature, avatar, broadcast) {
            if (broadcast !== false) game.broadcast(function (player, str, nature, avatar) {
                player.$fullscreenpop(str, nature, avatar);
            }, this, str, nature, avatar);
            game.addVideo('fullscreenpop', this, [str, nature, avatar]);
            var node = ui.create.div('.damage');
            if (avatar && this.node) {
                if (avatar == 'vice') {
                    if (lib.character[this.name2]) {
                        avatar = this.node.avatar2;
                    }
                }
                else {
                    if (lib.character[this.name]) {
                        avatar = this.node.avatar;
                    }
                }
                if (!get.is.div(avatar)) {
                    avatar = false;
                }
            }
            else {
                avatar = false;
            }
            if (avatar) {
                node.classList.add('fullscreenavatar');
                ui.create.div('', ui.create.div(node));
                // ui.create.div('',str.split('').join('<br>'),ui.create.div('.text.textbg',node));
                ui.create.div('', '<div>' + str.split('').join('</div><br><div>') + '</div>', ui.create.div('.text', node));
                node.firstChild.firstChild.style.backgroundImage = avatar.style.backgroundImage;
                node.dataset.nature = nature || 'unknown';
                var num = 0;
                var nodes = node.lastChild.firstChild.querySelectorAll('div');
                var interval = setInterval(function () {
                    if (num < nodes.length) {
                        nodes[num].classList.add('flashtext');
                        num++;
                    }
                    else {
                        clearInterval(interval);
                    }
                }, 100);
            }
            else {
                avatar = false;
                node.innerHTML = str;
                node.dataset.nature = nature || 'soil';
            }
            if (avatar) {
                var rect1 = ui.window.getBoundingClientRect();
                var rect2 = this.getBoundingClientRect();
                var dx = Math.round(2 * rect2.left + rect2.width - rect1.width);
                var dy = Math.round(2 * rect2.top + rect2.height - rect1.height);
                node.style.transform = 'scale(0.5) translate(' + dx + 'px,' + dy + 'px)';
            }
            ui.window.appendChild(node);
            ui.refresh(node);
            if (avatar) {
                node.style.transform = 'scale(1)';
                node.style.opacity = 1;
            }
            else {
                node.classList.add('damageadded');
            }
            setTimeout(function () {
                node.delete();
                node.style.transform = 'scale(1.5)'
            }, avatar ? 1600 : 1000);
        }
        /**
         * 伤害效果
         * @param {(string|number)} num 伤害数值或者任意字符串
         * @param {string} [nature='soil'] 伤害属性
         * @param {?boolean} font 如果为true，`damage div`添加类`normal-font`；如果为false或未指定，使用伤害默认字体大小
         * @param {?boolean} nobroadcast 如果为true或未指定，调用`game.broadcast`广播；如果为false，仅在本机
         */
        $damagepop(num, nature, font, nobroadcast) {
            if (typeof num == 'number' || typeof num == 'string') {
                game.addVideo('damagepop', this, [num, nature, font]);
                if (nobroadcast !== false) game.broadcast(function (player, num, nature, font) {
                    player.$damagepop(num, nature, font);
                }, this, num, nature, font);
                var node = ui.create.div('.damage');
                if (font) {
                    node.classList.add('normal-font');
                }
                if (typeof num == 'number' && num > 0) {
                    if (num == Infinity) num = '+∞'
                    else num = '+' + num;
                }
                else if (num == -Infinity) num = '-∞';
                node.innerHTML = num;
                this.damagepopups.push(node);
                node.dataset.nature = nature || 'soil';
                if (this.damagepopups.length == 1) {
                    this.$damagepop();
                }
            }
            else if (this.damagepopups.length) {
                var node = this.damagepopups[0];
                this.appendChild(node);
                ui.refresh(node);
                node.classList.add('damageadded');
                node.listenTransition(function () {
                    setTimeout(function () {
                        node.delete();
                    }, 200);
                });
                // setTimeout(function(){
                //     node.delete();
                // },500);
                var that = this;
                setTimeout(function () {
                    that.damagepopups.shift();
                    that.$damagepop();
                }, 500);
            }
        }
        $damage(source) {
            if (get.itemtype(source) == 'player') {
                game.addVideo('damage', this, source.dataset.position);
            }
            else {
                game.addVideo('damage', this);
            }
            game.broadcast(function (player, source) {
                player.$damage(source);
            }, this, source);
            if (source && source != this && lib.config.damage_shake) {
                var left, top;
                if (source.getTop() == this.getTop()) {
                    left = 20;
                    top = 0;
                }
                else {
                    var ratio = (source.getLeft() - this.getLeft()) / (source.getTop() - this.getTop());
                    left = Math.abs(20 * ratio / Math.sqrt(1 + ratio * ratio));
                    top = Math.abs(20 / Math.sqrt(1 + ratio * ratio));
                }
                if (source.getLeft() - this.getLeft() > 0) left = -left;
                if (source.getTop() - this.getTop() > 0) top = -top;
                if (get.is.mobileMe(this)) {
                    if (this.classList.contains('linked')) {
                        this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
                        this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
                    }
                    else {
                        this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                        this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                    }
                }
                else if (this.classList.contains('linked') && get.is.newLayout()) {
                    this.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
                }
                else if (this._chesstransform) {
                    this.style.transform = 'translate(' + (left + this._chesstransform[0]) + 'px,' + (top + this._chesstransform[1]) + 'px)';
                }
                else {
                    this.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                }
            }
            else {
                var zoom1 = 0.9, zoom2 = 0.95;
                if (arguments[1] == 'phase') {
                    zoom1 = 1.05;
                    zoom2 = 1.05;
                }
                if (get.is.mobileMe(this)) {
                    if (this.classList.contains('linked')) {
                        this.node.avatar.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
                        this.node.avatar2.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
                    }
                    else {
                        this.node.avatar.style.transform = 'scale(' + zoom1 + ')';
                        this.node.avatar2.style.transform = 'scale(' + zoom1 + ')';
                    }
                }
                else if (this.classList.contains('linked') && get.is.newLayout()) {
                    this.style.transform = 'scale(' + zoom2 + ') rotate(-90deg)';
                }
                else if (game.chess && this._chesstransform) {
                    this.style.transform = 'translate(' + this._chesstransform[0] + 'px,' + this._chesstransform[1] + 'px) scale(' + zoom2 + ')';
                }
                else {
                    this.style.transform = 'scale(' + zoom2 + ')';
                }
            }
            this.queue();
        }
        $die() {
            game.addVideo('die', this);
            game.broadcast(function (player) {
                player.$die();
            }, this);
            if (lib.config.die_move != 'off') {
                this.$dieflip(lib.config.die_move);
            }
            if (lib.element.player.$dieAfter) {
                lib.element.player.$dieAfter.call(this);
            }
        }
        $dieflip(type) {
            var top0 = ui.window.offsetHeight / 2;
            var left0 = ui.window.offsetWidth / 2;
            var ratio = (left0 - this.getLeft()) / (top0 - this.getTop());
            var left = Math.abs(50 * ratio / Math.sqrt(1 + ratio * ratio));
            var top = Math.abs(50 / Math.sqrt(1 + ratio * ratio));
            if (left0 - this.getLeft() > 0) left = -left;
            if (top0 - this.getTop() > 0) top = -top;
            if (get.is.mobileMe(this)) {
                left = -Math.random() * 5 - 10;
                top = Math.random() * 5 + 10;
            }
            if (this._chesstransform) {
                left += this._chesstransform[0];
                top += this._chesstransform[1];
            }
            var transform = 'translate(' + left + 'px,' + top + 'px) ' +
                'rotate(' + (Math.random() * 20 - 10) + 'deg) ';
            if (type == 'flip') {
                if (game.layout == 'long' || game.layout == 'long2') {
                    transform += 'rotateY(180deg)';
                }
                else {
                    transform += ((Math.random() - 0.5 < 0) ? 'rotateX(180deg)' : 'rotateY(180deg)');
                }
            }
            if (get.is.mobileMe(this)) {
                this.node.avatar.style.transform = transform;
                this.node.avatar2.style.transform = transform;
                this.style.transform = '';
            }
            else {
                this.node.avatar.style.transform = '';
                this.node.avatar2.style.transform = '';
                this.style.transform = transform;
            }
            this.queue(false);
        }
        $phaseJudge(card) {
            game.addVideo('phaseJudge', this, get.cardInfo(card));
            var player = this;
            var clone = player.$throw(card);
            if (lib.config.low_performance && card && card.clone) {
                var waitingForTransition = get.time();
                _status.waitingForTransition = waitingForTransition;
                card.clone.listenTransition(function () {
                    if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                        game.resume();
                    }
                });
                game.pause();
            }
            else {
                game.delay();
            }
        }

    }
    return PlayerModel;
});