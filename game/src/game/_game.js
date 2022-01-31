module.exports = {
    gameFun: (vkCore) => {
        let { game, ui, get, ai, lib, _status } = vkCore
        /**
         * dist 路径
         */
        const dist = () => lib.assetURL + 'dist'
        return {
            /**
             * 资源封装_事件相关_向弹窗中添加一名角色区域内满足要求的牌
             * @param {!object} Evt 弹窗所在的事件对象，必须要有dialog属性
             * @param {!Player} target 获取牌的目标角色
             * @param {boolean} [directh] 当添加的牌均为不可见（'blank'）的手牌时，directh为true
             * @param {?string} [type] 获取牌的条件，可能为'canBeDiscarded' | 'canBeGained'
             * @param {?function} [callback] 添加动作完成后执行的回调函数
             */
            showPlayerCard: function (Evt, target, directh, type, callback) {
                if (!Evt.dialog) return;
                let player = Evt.player || _status.event.player, position = Evt.position || 'h';
                for (let i = 0; i < Evt.position.length; i++) {
                    if (Evt.position[i] == 'h') {
                        let ms = target.getCards('h', function (card) {
                            if (type && !lib.filter[type](card, player, target)) return false;
                            if (target.isUnderControl(true)) return true;
                            if (card.hasGaintag('an_')) return false;
                            if (Evt.visible || player.hasSkillTag('viewHandcard', null, target, true)) {
                                return true;
                            }
                            return card.hasGaintag('ming_');
                        });
                        if (ms.length > 0) {
                            Evt.dialog.addText('明置区');
                            ms.randomSort();
                            Evt.dialog.add(ms);
                            directh = false;
                        }
                        let ans = target.getCards('h', function (card) {
                            if (type && !lib.filter[type](card, player, target)) return false;
                            if (ms.contains(card)) return false;
                            return true;
                        });
                        if (ans.length > 0) {
                            Evt.dialog.addText((ms.length ? '暗置区' : '手牌区'));
                            ans.randomSort();
                            Evt.dialog.add([ans, 'blank']);
                        }
                    }
                    else if (Evt.position[i] == 'e') {
                        let es = target.getCards('e', function (card) {
                            if (type && !lib.filter[type](card, player, target)) return false;
                            return true;
                        });
                        if (es.length) {
                            Evt.dialog.addText('装备区');
                            Evt.dialog.add(es);
                            directh = false;
                        }
                    }
                    else if (Evt.position[i] == 'j') {
                        let js = target.getCards('j', function (card) {
                            if (type && !lib.filter[type](card, player, target)) return false;
                            return true;
                        });
                        if (js.length) {
                            Evt.dialog.addText('判定区');
                            Evt.dialog.add(js);
                            directh = false;
                        }
                    }
                }
                callback && callback(Evt);
                return directh;
            },
            loseAsync: function (arg) {
                var next = game.createEvent('loseAsync');
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
                if (arg && get.is.object(arg)) {
                    for (var i in arg) next[i] = arg[i];
                }
                return next;
            },
            //获取（角色名）的评级
            getRarity: function (name) {
                var rank = lib.rank.rarity;
                if (rank.beginner.contains(name)) return 'beginner';
                if (rank.legend.contains(name)) return 'legend';
                if (rank.epic.contains(name)) return 'epic';
                if (rank.rare.contains(name)) return 'rare';
                if (get.mode() != 'chess' && rank.junk.contains(name)) return 'junk';
                return 'common';
            },
            getGlobalHistory: function (key, filter) {
                if (!key) return _status.globalHistory[_status.globalHistory.length - 1];
                if (!filter) return _status.globalHistory[_status.globalHistory.length - 1][key];
                else {
                    var history = game.getGlobalHistory(key).slice(0);
                    for (var i = 0; i < history.length; i++) {
                        if (!filter(history[i])) history.splice(i--, 1);
                    }
                    return history;
                }
            },
            cardsDiscard: function (cards) {
                var type = get.itemtype(cards);
                if (type != 'cards' && type != 'card') return;
                var next = game.createEvent('cardsDiscard');
                next.cards = type == 'cards' ? cards.slice(0) : [cards];
                next.setContent('cardsDiscard');
                return next;
            },
            cardsGotoOrdering: function (cards) {
                var type = get.itemtype(cards);
                if (type != 'cards' && type != 'card') return;
                var next = game.createEvent('cardsGotoOrdering');
                next.cards = type == 'cards' ? cards.slice(0) : [cards];
                next.setContent('cardsGotoOrdering');
                return next;
            },
            cardsGotoSpecial: function (cards, bool) {
                var type = get.itemtype(cards);
                if (type != 'cards' && type != 'card') return;
                var next = game.createEvent('cardsGotoSpecial');
                next.cards = type == 'cards' ? cards.slice(0) : [cards];
                if (bool === false) next.notrigger = true;
                next.setContent('cardsGotoSpecial');
                return next;
            },
            online: false,
            onlineID: null,
            onlineKey: null,
            showHistory: function (pause) {
                if (lib.config.show_history == 'left') {
                    ui.window.classList.add('leftbar');
                }
                else if (lib.config.show_history == 'right') {
                    ui.window.classList.add('rightbar');
                }
                if (pause != false && ui.pause) {
                    ui.pause.show();
                }
            },
            createBackground: function (src, blur) {
                var current = document.body.querySelector('.background.upper');
                if (current) {
                    current.delete();
                }
                var node = ui.create.div('.background.blurbg', document.body);
                node.setBackgroundImage(src);
                node.style.backgroundSize = 'cover';
                if (blur) {
                    node.classList.add('paused')
                }
                return node;
            },
            changeLand: function (url, player) {
                game.addVideo('changeLand', player, url);
                if (url.indexOf('/') === -1) {
                    url = 'image/card/' + url;
                }
                if (url.indexOf('.png') == -1 && url.indexOf('.jpg') == -1) {
                    url += '.jpg';
                }
                var name = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
                var skill = name + '_skill';
                var node = ui.create.div('.background.upper.land');
                node.setBackgroundImage(url);
                node.destroy = function () {
                    if (this.skill) {
                        game.removeGlobalSkill(this.skill);
                        if (this.system) {
                            this.system.remove();
                        }
                    }
                    this.classList.add('hidden');
                    var node = this;
                    setTimeout(function () {
                        node.remove();
                    }, 3000);
                    if (ui.land == this) {
                        ui.land = null;
                    }
                }
                if (ui.land) {
                    document.body.insertBefore(node, ui.land);
                    ui.land.destroy();
                }
                else {
                    node.classList.add('hidden');
                    document.body.insertBefore(node, ui.window);
                    ui.refresh(node);
                    node.classList.remove('hidden');
                }
                ui.land = node;
                if (name) {
                    node.name = name;
                    node.skill = skill;
                    if (player) {
                        node.player = player;
                        player.addTempSkill('land_used');
                    }
                    node.system = ui.create.system(lib.translate[skill], null, true, true);
                    lib.setPopped(node.system, function () {
                        var uiintro = ui.create.dialog('hidden');
                        var str = '地图';
                        if (player) {
                            str = '来源：' + get.translation(player);
                        }
                        var caption = uiintro.addText(str);
                        caption.style.margin = '0';
                        uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skill + '_info'] + '</div>');
                        uiintro.add(ui.create.div('.placeholder.slim'));
                        return uiintro;
                    }, 200);
                    game.addGlobalSkill(skill);
                }
            },
            checkFileList: function (updates, proceed) {
                var n = updates.length;
                if (!n) {
                    proceed(n);
                }
                for (var i = 0; i < updates.length; i++) {
                    if (lib.node && lib.node.fs) {
                        lib.node.fs.access(__dirname + '/' + updates[i], (function (entry) {
                            return function (err) {
                                if (!err) {
                                    var stat = lib.node.fs.statSync(__dirname + '/' + entry);
                                    if (stat.size == 0) {
                                        err = true;
                                    }
                                }
                                if (err) {
                                    n--;
                                    if (n == 0) {
                                        proceed();
                                    }
                                }
                                else {
                                    n--;
                                    updates.remove(entry);
                                    if (n == 0) {
                                        proceed();
                                    }
                                }
                            }
                        }(updates[i])));
                    }
                    else {
                        resolveLocalFileSystemURL(lib.assetURL + updates[i], (function (name) {
                            return function (entry) {
                                n--;
                                updates.remove(name);
                                if (n == 0) {
                                    proceed();
                                }
                            }
                        }(updates[i])), function () {
                            n--;
                            if (n == 0) {
                                proceed();
                            }
                        });
                    }
                }
            },
            replaceHandcards: function () {
                var next = game.createEvent('replaceHandcards');
                if (Array.isArray(arguments[0])) {
                    next.players = arguments[0];
                }
                else {
                    next.players = [];
                    for (var i = 0; i < arguments.length; i++) {
                        if (get.itemtype(arguments[i]) == 'player') {
                            next.players.push(arguments[i]);
                        }
                    }
                }
                if (_status.connectMode) {
                    next.setContent('replaceHandcardsOL');
                }
                else {
                    next.setContent('replaceHandcards');
                }
            },
            removeCard: function (name) {
                for (var i = 0; i < lib.card.list.length; i++) {
                    if (lib.card.list[i][2] == name) {
                        lib.card.list.splice(i--, 1);
                    }
                }
                var list = [];
                for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                    if (ui.cardPile.childNodes[i].name == name) {
                        list.push(ui.cardPile.childNodes[i]);
                    }
                }
                for (var i = 0; i < list.length; i++) {
                    list[i].remove();
                }
            },
            randomMapOL: function (type) {
                if (type == 'hidden') {
                    ui.arena.classList.add('playerhidden');
                }
                game.prepareArena();
                if (window.isNonameServer) {
                    game.me = ui.create.player();
                }
                var list = [];
                for (var i = 0; i < game.players.length; i++) {
                    if (game.players[i] != game.me) {
                        list.push(game.players[i]);
                    }
                }
                var map = [];
                for (var i = 0; i < lib.node.clients.length; i++) {
                    if (!list.length) break;
                    if (lib.configOL.observe_race) var current = list.shift();
                    else var current = list.randomRemove();
                    current.ws = lib.node.clients[i];
                    current.playerid = current.ws.id;
                    current.nickname = current.ws.nickname;
                    current.setNickname();
                }
                if (!window.isNonameServer) {
                    game.me.playerid = get.id();
                    game.me.nickname = get.connectNickname();
                    game.me.setNickname();
                }
                for (var i = 0; i < game.players.length; i++) {
                    if (!game.players[i].playerid) {
                        game.players[i].playerid = get.id();
                    }
                    map.push([game.players[i].playerid, game.players[i].nickname]);
                    lib.playerOL[game.players[i].playerid] = game.players[i];
                }
                game.broadcast(function (map, config, hidden) {
                    if (hidden) {
                        ui.arena.classList.add('playerhidden');
                    }
                    lib.configOL = config;
                    ui.create.players();
                    ui.create.me();
                    game.me.playerid = game.onlineID;
                    game.me.nickname = get.connectNickname();
                    for (var i = 0; i < map.length; i++) {
                        if (map[i][0] == game.me.playerid) {
                            map = map.concat(map.splice(0, i));
                            break;
                        }
                    }
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].playerid = map[i][0];
                        game.players[i].nickname = map[i][1];
                        game.players[i].setNickname();
                        lib.playerOL[game.players[i].playerid] = game.players[i];
                    }
                    _status.mode = lib.configOL[lib.configOL.mode + '_mode'];
                }, map, lib.configOL, type == 'hidden');
                _status.mode = lib.configOL[lib.configOL.mode + '_mode'];
                game.chooseCharacterOL();
            },
            closeMenu: function () {
                if (ui.menuContainer && !ui.menuContainer.classList.contains('hidden')) {
                    ui.click.configMenu();
                }
            },
            closeConnectMenu: function () {
                if (ui.connectMenuContainer && !ui.connectMenuContainer.classList.contains('hidden')) {
                    ui.click.connectMenu();
                }
            },
            closePopped: function () {
                if (ui.currentpopped) {
                    if (ui.currentpopped._uiintro) {
                        ui.currentpopped._uiintro.delete();
                        delete ui.currentpopped._uiintro;
                    }
                    delete ui.currentpopped;
                }
            },
            broadcast: function () {
                if (!lib.node || !lib.node.clients || game.online) return;
                for (var i = 0; i < lib.node.clients.length; i++) {
                    if (lib.node.clients[i].inited) {
                        lib.node.clients[i].send.apply(lib.node.clients[i], arguments);
                    }
                }
            },
            broadcastAll: function () {
                if (game.online) return;
                var argc = arguments.length;
                var args = new Array(argc);
                for (var i = 0; i < argc; i++) {
                    args[i] = arguments[i];
                }
                game.broadcast.apply(this, args);
                var func = args.shift();
                if (typeof func == 'string') {
                    func = lib.message.client[func];
                }
                if (typeof func == 'function') {
                    func.apply(this, args);
                }
            },
            syncState: function () {
                var state = null;
                if (game.getState) {
                    state = game.getState();
                }
                game.broadcast(function (state, current, number) {
                    if (game.updateState && state) game.updateState(state);
                    _status.currentPhase = current;
                    game.phaseNumber = number;
                }, state, _status.currentPhase, game.phaseNumber);
            },
            updateWaiting: function () {
                var map = [];
                for (var i = 0; i < game.connectPlayers.length; i++) {
                    var player = game.connectPlayers[i];
                    if (player.playerid) {
                        if (!game.onlinezhu) {
                            game.onlinezhu = player.playerid;
                            game.send('server', 'changeAvatar', player.nickname, player.avatar);
                            _status.onlinenickname = player.nickname;
                            _status.onlineavatar = player.avatar;
                        }
                        map[i] = [player.nickname, player.avatar, player.playerid];
                        if (player.playerid == game.onlinezhu) {
                            map[i].push('zhu');
                        }
                    }
                    else if (player.classList.contains('unselectable2')) {
                        map[i] = 'disabled';
                    }
                    else {
                        map[i] = null;
                    }
                }
                game.broadcast('updateWaiting', map);
            },
            createServer: function () {
                lib.node.clients = [];
                lib.node.banned = [];
                lib.node.observing = [];
                lib.node.torespond = {};
                lib.node.torespondtimeout = {};
                lib.playerOL = {};
                lib.cardOL = {};
                lib.wsOL = {};
                ui.create.roomInfo();
                ui.create.chat();
        
                if (game.onlineroom) {
        
                }
                else {
                    var WebSocketServer = require('ws').Server;
                    var wss = new WebSocketServer({ port: 8080 });
        
                    game.ip = get.ip();
        
                    wss.on('connection', lib.init.connection);
                }
            },
            playAudio: function () {
                if (_status.video && arguments[1] != 'video') return;
                var str = '';
                var onerror = null;
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === 'string' || typeof arguments[i] == 'number') {
                        str += '/' + arguments[i];
                    }
                    else if (typeof arguments[i] == 'function') {
                        onerror = arguments[i]
                    }
                    if (_status.video) break;
                }
                if (!lib.config.repeat_audio && _status.skillaudio.contains(str)) return;
                _status.skillaudio.add(str);
                game.addVideo('playAudio', null, str);
                setTimeout(function () {
                    _status.skillaudio.remove(str);
                }, 1000);
                var audio = document.createElement('audio');
                audio.autoplay = true;
                audio.volume = lib.config.volumn_audio / 8;
                if (str.indexOf('.mp3') != -1 || str.indexOf('.ogg') != -1) {
                    audio.src = lib.assetURL + 'audio' + str;
                }
                else {
                    audio.src = lib.assetURL + 'audio' + str + '.mp3';
                }
                audio.addEventListener('ended', function () {
                    this.remove();
                });
                audio.onerror = function () {
                    if (this._changed) {
                        this.remove();
                        if (onerror) {
                            onerror();
                        }
                    }
                    else {
                        this.src = lib.assetURL + 'audio' + str + '.ogg';
                        this._changed = true;
                    }
                };
                ui.window.appendChild(audio);
                return audio;
            },
            trySkillAudio: function (skill, player, directaudio) {
                game.broadcast(game.trySkillAudio, skill, player, directaudio);
                var info = get.info(skill);
                if (!info) return;
                if ((!info.direct || directaudio) && lib.config.background_speak &&
                    (!lib.skill.global.contains(skill) || lib.skill[skill].forceaudio)) {
                    var audioname = skill;
                    if (info.audioname2 && info.audioname2[player.name]) {
                        audioname = info.audioname2[player.name];
                        info = lib.skill[audioname];
                    }
                    var audioinfo = info.audio;
                    if (typeof audioinfo == 'string' && lib.skill[audioinfo]) {
                        audioname = audioinfo;
                        audioinfo = lib.skill[audioname].audio;
                    }
                    if (typeof audioinfo == 'string') {
                        if (audioinfo.indexOf('ext:') == 0) {
                            audioinfo = audioinfo.split(':');
                            if (audioinfo.length == 3) {
                                if (audioinfo[2] == 'true') {
                                    game.playAudio('..', 'extension', audioinfo[1], audioname);
                                }
                                else {
                                    audioinfo[2] = parseInt(audioinfo[2]);
                                    if (audioinfo[2]) {
                                        game.playAudio('..', 'extension', audioinfo[1], audioname + Math.ceil(audioinfo[2] * Math.random()));
                                    }
                                }
                            }
                            return;
                        }
                    }
                    else if (Array.isArray(audioinfo)) {
                        audioname = audioinfo[0];
                        audioinfo = audioinfo[1];
                    }
                    if (Array.isArray(info.audioname) && player) {
                        if (info.audioname.contains(player.name)) {
                            audioname += '_' + player.name;
                        }
                        else if (info.audioname.contains(player.name1)) {
                            audioname += '_' + player.name1;
                        }
                        else if (info.audioname.contains(player.name2)) {
                            audioname += '_' + player.name2;
                        }
                    }
                    if (typeof audioinfo == 'number') {
                        console.log(audioname)
                        game.playAudio('skill', audioname + Math.ceil(audioinfo * Math.random()));
                    }
                    else if (audioinfo) {
                        game.playAudio('skill', audioname);
                    }
                    else if (true && info.audio !== false) {
                        game.playSkillAudio(audioname);
                    }
                }
            },
            playSkillAudio: function (name, index) {
                if (_status.video && arguments[1] != 'video') return;
                if (!lib.config.repeat_audio && _status.skillaudio.contains(name)) return;
                game.addVideo('playSkillAudio', null, name);
                if (name.indexOf('|') < name.lastIndexOf('|')) {
                    name = name.slice(name.lastIndexOf('|') + 1);
                }
                _status.skillaudio.add(name);
                setTimeout(function () {
                    _status.skillaudio.remove(name);
                }, 1000);
                var str = 'audio/skill/';
                var audio = document.createElement('audio');
                audio.autoplay = true;
                audio.volume = lib.config.volumn_audio / 8;
                audio.src = lib.assetURL + str + name + '.mp3';
                audio.addEventListener('ended', function () {
                    this.remove();
                });
                if (typeof index != 'number') {
                    index = Math.ceil(Math.random() * 2);
                }
                audio._changed = 1;
                audio.onerror = function () {
                    switch (this._changed) {
                        case 1: {
                            audio.src = lib.assetURL + str + name + '.ogg';
                            this._changed = 2;
                            break;
                        }
                        case 2: {
                            audio.src = lib.assetURL + str + name + index + '.mp3';
                            this._changed = 3;
                            break;
                        }
                        case 3: {
                            audio.src = lib.assetURL + str + name + index + '.ogg';
                            this._changed = 4;
                            break;
                        }
                        default: {
                            this.remove();
                        }
                    }
                };
                ui.window.appendChild(audio);
            },
            playBackgroundMusic: function () {
                if (lib.config.background_music == 'music_off') {
                    ui.backgroundMusic.src = '';
                }
                else if (_status._aozhan == true && lib.config.mode_config.guozhan.aozhan_bgm != 'disabled') {
                    var aozhan = lib.config.mode_config.guozhan.aozhan_bgm;
                    ui.backgroundMusic.src = lib.assetURL + 'audio/background/aozhan_' + aozhan + '.mp3';
                }
                else {
                    var music = lib.config.background_music;
                    if (music == 'music_random') {
                        music = lib.config.all.background_music.randomGet('music_off', 'music_random', _status.currentMusic);
                    }
                    _status.currentMusic = music;
                    if (music == 'music_custom') {
                        if (lib.config.background_music_src) {
                            ui.backgroundMusic.src = lib.config.background_music_src;
                        }
                    }
                    else {
                        ui.backgroundMusic.src = lib.assetURL + 'audio/background/' + music + '.mp3';
                    }
                }
            },
            /**
             * 导入包(卡牌|角色|拓展)
             * @param {!string} type 类型
             * @param {!function} content 载入内容的回调函数
             */
            import: function (type, content) {
                if (type == 'extension') {
                    game.loadExtension(content);
                }
                else {
                    if (!lib.imported[type]) {
                        lib.imported[type] = {};
                    }
                    var content2 = content(lib, game, ui, get, ai, _status);
                    if (content2.name) {
                        lib.imported[type][content2.name] = content2;
                        delete content2.name;
                    }
                }
            },
            loadExtension: function (obj) {
                var noeval = false;
                if (typeof obj == 'function') {
                    obj = obj(lib, game, ui, get, ai, _status);
                    noeval = true;
                }
                {
                    // function changeStep(content) {
                    //     if (content instanceof Function) {
                    //         let v = new Function('return ' + content.toString())()
                    //         content = [];
                    //         let str = v.toString();
                    //         str = str.slice(str.indexOf('{') + 1);
                    //         if (str.indexOf('step 0') == -1) {
                    //             content[0] = new Function(str)
                    //         }
                    //         else {
                    //             let keys = str.split('step ')
                    //             for (let k = 0; k < keys.length; k++) {
                    //                 content[k] = new Function(keys[k].slice(1))
                    //             }
                    //         }
                    //     }
                    // }
                    // for (let i in obj.skill) {
                    //     changeStep(obj.skill[i].content)
                    //     changeStep(obj.skill[i].callback)
                    //     changeStep(obj.skill[i].precontent)
                    // }
                    // for (let i in obj.card) {
                    //     changeStep(obj.skill[i].content)
                    // }
                }
                lib.extensionMenu['extension_' + obj.name] = {
                    enable: {
                        name: '开启',
                        init: true
                    }
                };
                if (obj.package && obj.package.author) {
                    lib.extensionMenu['extension_' + obj.name].author = {
                        name: '作者：' + obj.package.author,
                        clear: true,
                        nopointer: true,
                    }
                }
                if (obj.package && obj.package.intro) {
                    lib.extensionMenu['extension_' + obj.name].intro = {
                        name: obj.package.intro,
                        clear: true,
                        nopointer: true,
                    }
                }
                for (var i in obj.config) {
                    lib.extensionMenu['extension_' + obj.name][i] = obj.config[i];
                }
                for (var i in obj.help) {
                    lib.help[i] = obj.help[i];
                }
                if (obj.editable !== false && lib.config.show_extensionmaker) {
                    lib.extensionMenu['extension_' + obj.name].edit = {
                        name: '编辑此扩展',
                        clear: true,
                        onclick: function () {
                            if (game.editExtension && lib.extensionPack && lib.extensionPack[obj.name]) {
                                game.editExtension(obj.name);
                            }
                            else {
                                alert('无法编辑未启用的扩展，请启用此扩展并重启后重试')
                            }
                        }
                    }
                }
                lib.extensionMenu['extension_' + obj.name].delete = {
                    name: '删除此扩展',
                    clear: true,
                    onclick: function () {
                        if (this.innerHTML == '<span>确认删除</span>') {
                            var prefix = 'extension_' + obj.name;
                            var page = this.parentNode;
                            var start = page.parentNode.previousSibling;
                            page.remove();
                            if (start) {
                                for (var i = 0; i < start.childElementCount; i++) {
                                    if (start.childNodes[i].link == page) {
                                        var active = false;
                                        if (start.childNodes[i].classList.contains('active')) {
                                            active = true;
                                        }
                                        start.childNodes[i].remove();
                                        if (active) {
                                            start.firstChild.classList.add('active');
                                            start.nextSibling.appendChild(start.firstChild.link);
                                        }
                                        break;
                                    }
                                }
                            }
                            game.removeExtension(obj.name);
                            if (obj.onremove) {
                                obj.onremove();
                            }
                        }
                        else {
                            this.innerHTML = '<span>确认删除</span>';
                            var that = this;
                            setTimeout(function () {
                                that.innerHTML = '<span>删除此扩展</span>';
                            }, 1000);
                        }
                    }
                }
        
                if (!_status.importingExtension) {
                    if (obj && lib.config['extension_' + obj.name + '_enable']) {
                        if (!noeval) lib.init.eval(obj);
                        var cfg = {};
                        for (var j in lib.config) {
                            if (j.indexOf('extension_' + obj.name) == 0 &&
                                j != 'extension_' + obj.name) {
                                cfg[j.slice(11 + obj.name.length)] = lib.config[j];
                            }
                        }
                        try {
                            if (obj.package) {
                                lib.extensionPack[obj.name] = obj.package;
                                lib.extensionPack[obj.name].files = obj.files || {};
                                if (!lib.extensionPack[obj.name].files.character) {
                                    lib.extensionPack[obj.name].files.character = [];
                                }
                                if (!lib.extensionPack[obj.name].files.card) {
                                    lib.extensionPack[obj.name].files.card = [];
                                }
                                if (!lib.extensionPack[obj.name].files.skill) {
                                    lib.extensionPack[obj.name].files.skill = [];
                                }
                            }
                            else {
                                lib.extensionPack[obj.name] = {};
                            }
                            lib.extensionPack[obj.name].code = {
                                content: obj.content,
                                precontent: obj.precontent,
                                help: obj.help,
                                config: obj.config
                            }
                            if (obj.precontent) {
                                _status.extension = obj.name;
                                obj.precontent(cfg);
                                delete _status.extension;
                            }
                            if (obj.content) {
                                lib.extensions.push([obj.name, obj.content, cfg, _status.evaluatingExtension, obj.package || {}]);
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                }
                else {
                    game.importedPack = obj;
                }
            },
            createDir: function (dir, success, error) {
                var nullFC = function () { };
                success = success || nullFC;
                error = error || nullFC;
                dir = dir.split("/");
                if (window.resolveLocalFileSystemURL) {
                    window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
                        (function redo(entry) {
                            var i = dir.shift();
                            entry.getDirectory(i, { create: true }, function (dirEntry) {
                                if (dir.length) redo(dirEntry);
                                else success();
                            });
                        })(entry);
                    }, error);
                }
                else {
                    var fs = require("fs");
                    var str = __dirname;
                    (function redo() {
                        str += "/";
                        str += dir.shift();
                        fs.access(str, function (err) {
                            if (!err) {
                                //已存在此目录
                                if (dir.length) redo();
                                else success();
                            }
                            else {
                                fs.mkdir(str, function () {
                                    if (dir.length) redo();
                                    else success();
                                });
                            }
                        });
                    })();
                }
            },
            importExtension: function (data, finishLoad, exportext, pkg) {
                if (!window.JSZip) {
                    lib.init.js(lib.assetURL + 'game', 'jszip', function () {
                        game.importExtension(data, finishLoad, exportext, pkg);
                    });
                }
                else if (get.objtype(data) == 'object') {
                    //导出
                    var zip = new JSZip();
                    var filelist = [];
                    var filelist2 = [];
                    if (data._filelist) {
                        filelist2 = data._filelist;
                        delete data._filelist;
                    }
                    for (var i in data) {
                        zip.file(i, data[i]);
                        filelist.push(i);
                    }
                    if (exportext) {
                        if (pkg) {
                            filelist.remove('extension.js');
                            pkg.files = filelist.slice(0);
                            pkg.files.addArray(filelist2);
                            pkg.size = zip.generate({ type: "arraybuffer" }).byteLength;
                            if (pkg.size < 1000) {
                                pkg.size = pkg.size + 'B';
                            }
                            else if (pkg.size < 1000000) {
                                pkg.size = Math.round(pkg.size / 1000) + 'KB';
                            }
                            else {
                                pkg.size = Math.round(pkg.size / 100000) / 10 + 'MB';
                            }
                            var pkgstr = 'extension["' + exportext + '"]={\n';
                            for (var i in pkg) {
                                var pkgfrag;
                                if (i == 'files') {
                                    var pkgjs = JSON.stringify(pkg[i]);
                                    var pkgfrag = '';
                                    var pkgbuffer = 0;
                                    for (var j = 0; j < pkgjs.length; j++) {
                                        pkgfrag += pkgjs[j];
                                        pkgbuffer++;
                                        if (pkgbuffer >= 80 && pkgjs[j] == ',' && pkgjs[j - 1] == '"') {
                                            pkgfrag += '\n\t\t';
                                            pkgbuffer = 0;
                                        }
                                    }
                                }
                                else {
                                    pkgfrag = JSON.stringify(pkg[i]);
                                }
                                pkgstr += '\t' + i + ':' + pkgfrag + ',\n'
                            }
                            pkgstr = pkgstr.slice(0, pkgstr.length - 2);
                            pkgstr += '\n};';
                            zip.file('package.js', pkgstr);
                        }
                        var blob = zip.generate({ type: "blob" });
                        var fileNameToSaveAs = exportext;
                        fileNameToSaveAs = fileNameToSaveAs.replace(/\\|\/|\:|\?|\"|\*|<|>|\|/g, '.');
                        fileNameToSaveAs += '.zip';
        
                        if (lib.device) {
                            var directory;
                            if (lib.device == 'android') {
                                directory = cordova.file.externalDataDirectory;
                            }
                            else {
                                directory = cordova.file.documentsDirectory;
                            }
                            window.resolveLocalFileSystemURL(directory, function (entry) {
                                entry.getFile(fileNameToSaveAs, { create: true }, function (fileEntry) {
                                    fileEntry.createWriter(function (fileWriter) {
                                        fileWriter.onwriteend = function () {
                                            alert('文件已导出至' + directory + fileNameToSaveAs);
                                        }
                                        fileWriter.write(blob)
                                    });
                                });
                            });
                        }
                        else {
                            var downloadLink = document.createElement("a");
                            downloadLink.download = fileNameToSaveAs;
                            downloadLink.innerHTML = "Download File";
                            downloadLink.href = window.URL.createObjectURL(blob);
                            downloadLink.click();
                        }
        
                        if (typeof finishLoad == 'function') {
                            finishLoad();
                        }
                    }
                    else {
                        game.importExtension.apply(this, [zip.generate({ type: 'arraybuffer' }), finishLoad]);
                    }
                }
                else {
                    //导入
                    function UHP() {
                        alert("导入失败");
                    };
                    var zip = new JSZip();
                    try {
                        zip.loadAsync(data).then(zip => {
                            zip.file('extension.js').async("string").then(str => {
                                _status.importingExtension = true;
                                eval(str)
                                _status.importingExtension = false;
                                if (!game.importedPack) throw ('err');
                                let extname = game.importedPack.name;
                                if (lib.config.all.plays.contains(extname)) {
                                    throw ('禁止安装游戏原生扩展');
                                }
                                if (lib.config.extensions.contains(extname)) {
                                    game.removeExtension(extname, true);
                                }
                                lib.config.extensions.add(extname);
                                game.saveConfig('extensions', lib.config.extensions);
                                game.saveConfig('extension_' + extname + '_enable', true);
                                for (let i in game.importedPack.config) {
                                    if (game.importedPack.config[i] && game.importedPack.config[i].hasOwnProperty('init')) {
                                        game.saveConfig('extension_' + extname + '_' + i, game.importedPack.config[i].init);
                                    }
                                }
                                if (game.download) {
                                    let filelist = [];
                                    for (let i in zip.files) {
                                        //alert(zip.files[i].dir+i)
                                        if (!zip.files[i].dir && i[0] != '.' && i[0] != '_') {
                                            filelist.push(i);
                                        }
                                    }
                                    //alert(filelist)
                                    if (lib.node && lib.node.fs) {
                                        //电脑端
                                        //具备nodeJS环境
                                        game.ensureDirectory('extension/' + extname, function () {
                                            let writeFile = function (e) {
                                                if (e) {
                                                    finishLoad();
                                                    UHP();
                                                    return;
                                                }
                                                if (filelist.length) {
                                                    let filename = filelist.shift();
                                                    //filename 数组 ...dir+/+file
                                                    let zipdir = filename;
                                                    filename = filename.split("/");
                                                    let name = filename.pop();
                                                    if (filename.length) game.createDir(`extension/${extname}/${filename.join("/")}`, function () {
                                                        //这里需要个创文件夹的函数
                                                        Letgo(`${filename.join("/")}/${name}`);
                                                    }, UHP);
                                                    else Letgo(name);
                                                    function Letgo(name) {
                                                        zip.file(zipdir).async('nodebuffer').then(str => {
                                                            lib.node.fs.writeFile(`${__dirname}/extension/${extname}/${name}`, str, null, writeFile);
                                                        })
                                                    }
                                                }
                                                else {
                                                    finishLoad();
                                                }
                                            }
                                            writeFile();
                                        });
                                    }
                                    else {
                                        window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
                                            entry.getDirectory('extension/' + extname, { create: true }, function (dirEntry) {
                                                //扩展文件夹
                                                writeFile();
                                                function writeFile() {
                                                    if (filelist.length) {
                                                        let filename = filelist.shift();
                                                        //filename 数组 ...dir+/+file
                                                        let zipdir = filename;
                                                        filename = filename.split("/");
                                                        let name = filename.pop();
                                                        if (filename.length) game.createDir(`extension/${extname}/${filename.join("/")}`, function () {
                                                            Letgo(`${filename.join("/")}/${name}`);
                                                        }, UHP);
                                                        else Letgo(name);
                                                        function Letgo(name) {
                                                            dirEntry.getFile(name, { create: true }, function (fileEntry) {
                                                                fileEntry.createWriter(function (fileWriter) {
                                                                    fileWriter.onwriteend = writeFile;
                                                                    zip.file(zipdir).async("arraybuffer").then(str => {
                                                                        fileWriter.write(str);
                                                                    })
                                                                });
                                                            }, UHP);
                                                        }
                                                    }
                                                    else {
                                                        finishLoad();
                                                    }
                                                };
                
                                            });
                                        });
                                    }
                                }
                                else {
                                    localStorage.setItem(`${lib.configprefix}extension_${extname}`, str);
                                    let imglist = [];
                                    for (let i in zip.files) {
                                        if (i[0] != '.' && i[0] != '_') {
                                            if (i.indexOf('.jpg') != -1 || i.indexOf('.png') != -1) {
                                                imglist.push(i);
                                            }
                                        }
                                    }
                                    if (imglist.length && lib.db) {
                                        lib.config.extensionInfo[extname] = {
                                            image: imglist
                                        }
                                        game.saveConfig('extensionInfo', lib.config.extensionInfo);
                                        for (let i = 0; i < imglist.length; i++) {
                                            let imgname = imglist[i];
                                            zip.file(imgname).async("arraybuffer").then(str => {
                                                let blob = new Blob([str]);
                                                let fileReader = new FileReader();
                                                console.log(imgname,str,blob)
                                                fileReader.onload = (function (imgname) {
                                                    return function (fileLoadedEvent) {
                                                        let data = fileLoadedEvent.target.result;
                                                        game.putDB('image', `extension-${extname}:${imgname}`, data);
                                                    };
                                                }(imgname))
                                                fileReader.readAsDataURL(blob);
                                            });
                                        }
                                    }
                                    finishLoad();
                                }
                                delete game.importedPack;
                            }).catch(reason => {
                                if (!str) throw (`你导入的不是扩展！请选择正确的文件:\n ${reason}`);
                            })
                        })
                    }
                    catch (e) {
                        console.log(e);
                        alert('导入失败');
                        return false;
                    }
                }
            },
            export: function (textToWrite, name) {
                let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
                let fileNameToSaveAs = name || 'noname';
                fileNameToSaveAs = fileNameToSaveAs.replace(/\\|\/|\:|\?|\"|\*|<|>|\|/g, '.');
        
                if (lib.device) {
                    let directory;
                    if (lib.device == 'android') {
                        directory = cordova.file.externalDataDirectory;
                    }
                    else {
                        directory = cordova.file.documentsDirectory;
                    }
                    window.resolveLocalFileSystemURL(directory, function (entry) {
                        entry.getFile(fileNameToSaveAs, { create: true }, function (fileEntry) {
                            fileEntry.createWriter(function (fileWriter) {
                                fileWriter.onwriteend = function () {
                                    alert('文件已导出至' + directory + fileNameToSaveAs);
                                }
                                fileWriter.write(textFileAsBlob)
                            });
                        });
                    });
                }
                else {
                    let downloadLink = document.createElement("a");
                    downloadLink.download = fileNameToSaveAs;
                    downloadLink.innerHTML = "Download File";
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.click();
                }
            },
            multiDownload2: function (list, onsuccess, onerror, onfinish, process, dev) {
                list = list.slice(0);
                let download = function () {
                    if (list.length) {
                        let current = list.shift();
                        let current2;
                        if (typeof process == 'function') {
                            current2 = process(current);
                        }
                        else {
                            current2 = current;
                        }
                        if (current.indexOf('theme') == 0) {
                            game.print(current.slice(6));
                        }
                        else if (current.indexOf('image/skin') == 0) {
                            game.print(current.slice(11));
                        }
                        else {
                            game.print(current.slice(current.lastIndexOf('/') + 1));
                        }
                        game.download(current, current2, function () {
                            if (onsuccess) onsuccess(list.length);
                            download();
                        }, function () {
                            if (onerror) onerror(list.length);
                            download();
                        }, dev);
                    }
                    else {
                        if (onfinish) onfinish();
                    }
                }
                download();
            },
            multiDownload: function (list, onsuccess, onerror, onfinish, process, dev) {
                if (lib.config.dev) game.print(get.url());
                var args = Array.from(arguments);
                if (list.length <= 3) {
                    game.multiDownload2.apply(this, args);
                }
                else {
                    var num = Math.round(list.length / 3);
                    var left = 3;
                    args[3] = function () {
                        left--;
                        if (left == 0) {
                            onfinish();
                        }
                    };
                    setTimeout(function () {
                        args[0] = list.slice(0, num); game.multiDownload2.apply(game, args);
                    });
                    setTimeout(function () {
                        args[0] = list.slice(num, 2 * num); game.multiDownload2.apply(this, args);
                    }, 200);
                    setTimeout(function () {
                        args[0] = list.slice(2 * num); game.multiDownload2.apply(this, args);
                    }, 400);
                }
            },
            fetch: function (url, onload, onerror, onprogress) {
                var tmpName = '~tmp' + get.id();
                game.download(encodeURI(url), tmpName, function () {
                    game.readFile(tmpName, function (data) {
                        onload(data);
                        game.removeFile(tmpName);
                    }, onerror);
                }, onerror, null, onprogress);
            },
            playVideo: function (time, mode) {
                if (!_status.replayvideo) {
                    localStorage.setItem(lib.configprefix + 'playbackmode', lib.config.mode);
                }
                game.saveConfig('mode', mode);
                localStorage.setItem(lib.configprefix + 'playback', time);
                game.reload();
            },
            playVideoContent: function (video) {
                var next = game.createEvent('video', false);
                next.video = video;
                ui.system.style.display = 'none';
                ui.system.hide();
                ui.arena.style.display = 'none';
                ui.arena.hide();
                ui.window.classList.remove('leftbar');
                ui.window.classList.remove('rightbar');
                ui.historybar.style.display = 'none';
                _status.event = next;
                _status.paused = false;
                _status.paused2 = false;
                _status.over = false;
                _status.video = true;
                clearTimeout(_status.timeout);
        
                for (var i in lib.characterPack) {
                    for (var j in lib.characterPack[i]) {
                        lib.character[j] = lib.character[j] || lib.characterPack[i][j];
                    }
                }
                next.setContent('playVideoContent');
                game.loop();
            },
            /**
             * 一些函数的回放实现(录像功能)
             * @type {!Object}
             */
            videoContent: {
                arrangeLib: function (content) {
                    for (var i in content) {
                        for (var j in content[i]) {
                            lib[i][j] = content[i][j];
                        }
                    }
                },
                jiuNode: function (player, bool) {
                    //Powered by 升麻
                    if (bool) {
                        if (!player.node.jiu && lib.config.jiu_effect) {
                            player.node.jiu = ui.create.div('.playerjiu', player.node.avatar);
                            player.node.jiu2 = ui.create.div('.playerjiu', player.node.avatar2);
                        }
                    }
                    else {
                        if (player.node.jiu) {
                            player.node.jiu.delete();
                            player.node.jiu2.delete();
                            delete player.node.jiu;
                            delete player.node.jiu2;
                        }
                    }
                },
                init: function (players) {
                    if (game.chess) return;
                    if (lib.config.mode == 'versus') {
                        players.bool = players.pop();
                    }
                    ui.arena.setNumber(players.length);
                    ui.arena.classList.add('video');
                    game.players.length = 0;
                    game.dead.length = 0;
                    ui.create.players(players.length);
                    game.me = game.players[0];
                    ui.handcards1 = game.me.node.handcards1;
                    ui.handcards2 = game.me.node.handcards2;
                    ui.handcards1Container.appendChild(ui.handcards1);
                    ui.handcards2Container.appendChild(ui.handcards2);
                    if (lib.config.mode == 'versus') {
                        if (players.bool) {
                            ui.arena.setNumber(parseInt(ui.arena.dataset.number) + 1);
                            for (var i = 0; i < game.players.length; i++) {
                                game.players[i].dataset.position = parseInt(game.players[i].dataset.position) + 1;
                            }
                            game.singleHandcard = true;
                            ui.arena.classList.add('single-handcard');
                            ui.window.classList.add('single-handcard');
                            ui.fakeme = ui.create.div('.fakeme.avatar', ui.me);
                        }
                        ui.arena.style.display = '';
                        ui.refresh(ui.arena);
                        ui.arena.show();
                    }
                    else if (lib.config.mode == 'boss') {
                        if (!players.boss) {
                            game.singleHandcard = true;
                            ui.arena.classList.add('single-handcard');
                            ui.window.classList.add('single-handcard');
                            ui.fakeme = ui.create.div('.fakeme.avatar', ui.me);
                        }
                        ui.arena.setNumber(8);
                    }
                    ui.updatehl();
                    for (var i = 0; i < players.length; i++) {
                        if (lib.config.mode == 'identity') {
                            game.players[i].init(players[i].name, players[i].name2);
                            game.players[i].setIdentity(players[i].identity);
                        }
                        else if (lib.config.mode == 'doudizhu' || lib.config.mode == 'longlaoguan' || lib.config.mode == 'single') {
                            game.players[i].init(players[i].name, players[i].name2);
                            game.players[i].setIdentity(players[i].identity);
                        }
                        else if (lib.config.mode == 'stone') {
                            game.players[i].init(players[i].name, players[i].name2);
                            game.players[i].classList.add('noidentity');
                            game.players[i].updateActCount(null, players[i].count, 0);
                        }
                        else if (lib.config.mode == 'boss') {
                            game.players[i].init(players[i].name, players[i].name2);
                            game.players[i].setIdentity(players[i].identity);
                            game.players[i].dataset.position = players[i].position;
                            game.players[i].node.action.innerHTML = '行动';
                        }
                        else if (lib.config.mode == 'versus') {
                            game.players[i].init(players[i].name, players[i].name2);
                            game.players[i].node.identity.firstChild.innerHTML = players[i].identity;
                            game.players[i].node.identity.dataset.color = players[i].color;
                            game.players[i].node.action.innerHTML = '行动';
                        }
                        else if (lib.config.mode == 'guozhan') {
                            game.players[i].name = players[i].name;
                            game.players[i].name1 = players[i].name1;
                            game.players[i].name2 = players[i].name2;
        
                            game.players[i].sex = 'unknown';
                            game.players[i].identity = 'unknown';
        
                            lib.translate[game.players[i].name] = players[i].translate;
                            game.players[i].init(players[i].name1, players[i].name2);
        
                            game.players[i].classList.add('unseen_v');
                            game.players[i].classList.add('unseen2_v');
                            if (game.players[i] != game.me) {
                                game.players[i].node.identity.firstChild.innerHTML = '猜';
                                game.players[i].node.identity.dataset.color = 'unknown';
                            }
                            else {
                                game.players[i].setIdentity(game.players[i].group);
                            }
                        }
                    }
                    for (var i = 0; i < game.players.length; i++) {
                        game.playerMap[game.players[i].dataset.position] = game.players[i];
                    }
        
                    if (lib.config.mode == 'versus') {
                        if (players.bool) {
                            game.onSwapControl();
                        }
                    }
                    else if (lib.config.mode == 'boss') {
                        if (!players.boss) {
                            game.onSwapControl();
                        }
                        ui.arena.style.display = '';
                        ui.refresh(ui.arena);
                        ui.arena.show();
                        ui.updatehl();
                    }
                },
                newcard: function (content) {
                    if (content) {
                        lib.translate[content.name] = content.translate;
                        lib.translate[content.name + '_info'] = content.info;
                        lib.card[content.name] = {};
                        lib.card[content.name].cardimage = content.card
                        for (var i in lib.card[content.card]) {
                            lib.card[content.name][i] = lib.card[content.card][i];
                        }
                        if (content.legend) {
                            lib.card[content.name].legend = true;
                        }
                        else if (content.epic) {
                            lib.card[content.name].epic = true;
                        }
                        else if (content.unique) {
                            lib.card[content.name].unique = true;
                        }
                    }
                },
                changeLand: function (player, url) {
                    game.changeLand(url, player);
                },
                destroyLand: function () {
                    if (ui.land) {
                        ui.land.destroy();
                    }
                },
                playAudio: function (str) {
                    game.playAudio(str, 'video');
                },
                playSkillAudio: function (name) {
                    game.playSkillAudio(name, 'video');
                },
                phaseChange: function (player) {
                    if (player) {
                        var glowing = document.querySelector('.glow_phase');
                        if (glowing) {
                            glowing.classList.remove('glow_phase');
                        }
                        if (lib.config.glow_phase) {
                            player.classList.add('glow_phase');
                            // player.dataset.glow_phase=lib.config.glow_phase;
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                playerfocus: function (player, time) {
                    if (player && player.playerfocus) {
                        player.playerfocus(time);
                    }
                    else {
                        console.log(player);
                    }
                },
                playerfocus2: function () {
                    ui.arena.classList.add('playerfocus');
                    setTimeout(function () {
                        ui.arena.classList.remove('playerfocus');
                    }, 1500)
                },
                identityText: function (player, str) {
                    if (player && str) {
                        player.node.identity.firstChild.innerHTML = str;
                    }
                    else {
                        console.log(player);
                    }
                },
                identityColor: function (player, str) {
                    if (player && str) {
                        player.node.identity.dataset.color = str;
                    }
                    else {
                        console.log(player);
                    }
                },
                chessSwap: function (content) {
                    var me = game.playerMap[content[0]];
                    var player = game.playerMap[content[1]];
                    if (me) {
                        me.classList.remove('current_action');
                    }
                    if (player) {
                        player.classList.add('current_action');
                    }
                },
                chessgainmod: function (player, num) {
                    if (Array.isArray(num)) {
                        num = get.infoCards(num);
                    }
                    if (player && player.$gainmod) {
                        player.$gainmod(num);
                    }
                    else {
                        console.log(player);
                    }
                },
                moveTo: function (player, pos) {
                    if (player && player.moveTo && pos) {
                        player.moveTo(pos[0], pos[1]);
                    }
                    else {
                        console.log(player)
                    }
                },
                addObstacle: function (pos) {
                    if (pos) {
                        game.addObstacle(pos[0], pos[1]);
                    }
                },
                removeObstacle: function (pos) {
                    game.removeObstacle(pos);
                },
                moveObstacle: function (pos) {
                    if (pos) {
                        game.moveObstacle(pos[0], pos[1], pos[2]);
                    }
                },
                colorObstacle: function (pos) {
                    if (pos) {
                        game.colorObstacle(pos[0], pos[1]);
                    }
                },
                thrownhighlight1: function () {
                    ui.arena.classList.add('thrownhighlight');
                },
                thrownhighlight2: function () {
                    ui.arena.classList.remove('thrownhighlight');
                },
                chessFocus: function (player) {
                    if (player) {
                        player.chessFocus();
                    }
                    else {
                        console.log('chessFocus');
                    }
                },
                removeTreasure: function (pos) {
                    if (game.playerMap[pos]) {
                        game.playerMap[pos].delete();
                        delete game.playerMap[pos];
                    }
                    else {
                        console.log(pos);
                    }
                },
                initobs: function (obs) {
                    if (obs) {
                        for (var i = 0; i < obs.length; i++) {
                            game.addObstacle(obs[i]);
                        }
                    }
                    else {
                        console.log(obs);
                    }
                },
                stonePosition: function (content) {
                    var player = game.playerMap[content[0]];
                    if (player) {
                        delete game.playerMap[content[0]];
                        player.dataset.position = content[1];
                        game.playerMap[content[1]] = player;
                    }
                    else {
                        console.log(content);
                    }
                },
                bossSwap: function (player, name) {
                    if (player && name) {
                        player.delete();
                        var noboss = false;
                        if (name[0] == '_') {
                            name = name.slice(1);
                            noboss = true;
                        }
                        var boss = ui.create.player().init(name);
                        boss.dataset.position = player.dataset.position;
                        game.playerMap[player.dataset.position] = boss;
                        if (game.me == player) {
                            game.me = boss;
                        }
                        game.players.push(boss);
                        game.arrangePlayers();
                        if (!noboss) {
                            game.boss = boss;
                            boss.setIdentity('zhu');
                            boss.identity = 'zhu';
                        }
                        else {
                            boss.setIdentity('zhong');
                            boss.identity = 'zhong';
                        }
                        ui.arena.appendChild(boss.animate('zoominanim'));
                    }
                },
                stoneSwap: function (info) {
                    var player = ui.create.player();
                    player.classList.add('noidentity');
                    player.dataset.position = info.position;
                    player.animate(info.me ? 'replaceme' : 'replaceenemy');
                    player.actcount = info.actcount;
                    player.init(info.name, info.name2);
                    game.players.push(player);
                    player.updateActCount(null, info.actcount, 0);
                    ui.arena.appendChild(player);
                    game.playerMap[player.dataset.position] = player;
                    game.arrangePlayers();
                },
                chess_tongshuai: function (player, content) {
                    if (player && player.storage) {
                        player.storage.tongshuai.owned = content;
                    }
                    else {
                        console.log(player);
                    }
                },
                chess_tongshuai_skill: function (player, content) {
                    if (player && content) {
                        if (player.marks.tongshuai.firstChild) {
                            player.marks.tongshuai.firstChild.remove();
                        }
                        player.marks.tongshuai.setBackground(content[0], 'character');
                        player.additionalSkills.tongshuai = content[1];
                    }
                    else {
                        console.log(player);
                    }
                },
                smoothAvatar: function (player, vice) {
                    if (player && player.node) {
                        if (vice) {
                            if (player.node.avatar2) {
                                player.smoothAvatar(vice);
                            }
                        }
                        else {
                            if (player.node.avatar) {
                                player.smoothAvatar(vice);
                            }
                        }
                    }
                },
                setAvatar: function (player, content) {
                    if (player && content && content.length == 2) {
                        player.setAvatar(content[0], content[1])
                    }
                },
                setAvatarQueue: function (player, content) {
                    if (player && content && content.length == 2) {
                        player.setAvatarQueue(content[0], content[1])
                    }
                },
                addSubPlayer: function (player, content) {
                    if (player && content && content[0] && content[1] &&
                        content[2] && content[3] && content[4]) {
                        var skill = content[0];
                        lib.skill[skill] = content[1];
                        lib.character[skill] = content[2];
                        lib.translate[skill] = content[3];
                        player.storage[skill] = content[4];
                    }
                },
                arenaNumber: function (content) {
                    ui.arena.dataset.number = content;
                },
                reinit: function (source, content) {
                    if (source && content) {
                        source.uninit();
                        source.init(content[0]);
                        source.node.identity.dataset.color = content[1];
                    }
                    else {
                        console.log(source);
                    }
                },
                reinit2: function (source, name) {
                    if (source && name) {
                        source.init(name);
                    }
                    else {
                        console.log(source);
                    }
                },
                reinit3: function (source, content) {
                    if (source && content) {
                        var info1 = lib.character[content.from];
                        var info2 = lib.character[content.to];
                        if (content.avatar2) {
                            source.name2 = content.to;
                            if (source.isUnseen(0)) {
                                source.sex = info2[0];
                            }
                            source.node.avatar2.setBackground(content.to, 'character');
                            source.node.name2.innerHTML = get.slimName(content.to);
                        }
                        else {
                            source.name = content.to;
                            source.sex = info2[0];
                            source.node.avatar.setBackground(content.to, 'character');
                            source.node.name.innerHTML = get.slimName(content.to);
                        }
                        source.maxHp = content.hp;
                        this.update();
                        for (var i = 0; i < info1[3].length; i++) {
                            source.removeSkill(info1[3][i]);
                        }
                        for (var i = 0; i < info2[3].length; i++) {
                            source.addSkill(info2[3][i]);
                        }
                    }
                },
                skill: function (player, content) {
                    if (typeof content == 'string') {
                        lib.skill[content].video(player);
                    }
                    else if (Array.isArray(content)) {
                        lib.skill[content[0]].video(player, content[1]);
                    }
                    else {
                        console.log(player, content)
                    }
                },
                addFellow: function (content) {
                    var player = game.addFellow(content[0], content[1], content[2]);
                    game.playerMap[player.dataset.position] = player;
                },
                windowzoom1: function () {
                    ui.window.style.transition = 'all 0.5s';
                    ui.window.classList.add('zoomout3');
                    ui.window.hide();
                },
                windowzoom2: function () {
                    ui.window.style.transition = 'all 0s';
                    ui.refresh(ui.window);
                },
                windowzoom3: function () {
                    ui.window.classList.remove('zoomout3');
                    ui.window.classList.add('zoomin3');
                },
                windowzoom4: function () {
                    ui.window.style.transition = 'all 0.5s';
                    ui.refresh(ui.window);
                    ui.window.show();
                    ui.window.classList.remove('zoomin3');
                },
                windowzoom5: function () {
                    ui.window.style.transition = '';
                },
                updateActCount: function (player, content) {
                    if (player && content) {
                        player.updateActCount(content[0], content[1], content[2]);
                    }
                    else {
                        console.log(player);
                    }
                },
                setIdentity: function (player, identity) {
                    if (player && identity) {
                        player.setIdentity(identity);
                    }
                    else {
                        console.log(num);
                    }
                },
                showCharacter: function (player, num) {
                    if (player && player.classList) {
                        switch (num) {
                            case 0:
                                player.classList.remove('unseen_v');
                                break;
                            case 1:
                                player.classList.remove('unseen2_v');
                                break;
                            case 2:
                                player.classList.remove('unseen_v');
                                player.classList.remove('unseen2_v');
                                break;
                        }
                        if (!player.classList.contains('unseen_v') && (!player.name2 || !player.classList.contains('unseen2_v')) && player.storage.nohp) {
                            delete player.storage.nohp;
                            player.node.hp.show();
                            player.update();
                        }
                    }
                    else {
                        console.log(num);
                    }
                },
                hidePlayer: function (player) {
                    if (player) {
                        player.hide();
                    }
                },
                deleteHandcards: function (player) {
                    if (player) {
                        player.node.handcards1.delete();
                        player.node.handcards2.delete();
                    }
                },
                hideCharacter: function (player, num) {
                    if (player && player.classList) {
                        switch (num) {
                            case 0:
                                player.classList.add('unseen_v');
                                break;
                            case 1:
                                player.classList.add('unseen2_v');
                                break;
                            case 2:
                                player.classList.add('unseen_v');
                                player.classList.add('unseen2_v');
                                break;
                        }
                    }
                    else {
                        console.log(num);
                    }
                },
                popup: function (player, info) {
                    if (player && info) {
                        player.popup(info[0], info[1]);
                    }
                    else {
                        console.log(player);
                    }
                },
                log: function (str) {
                    game.log(str);
                },
                draw: function (player, info) {
                    if (player && player.$draw) {
                        player.$draw(info);
                    }
                    else {
                        console.log(player);
                    }
                },
                drawCard: function (player, info) {
                    if (player && info) {
                        player.$draw(get.infoCards(info));
                    }
                    else {
                        console.log(player);
                    }
                },
                throw: function (player, info) {
                    if (player && info) {
                        player.$throw(get.infoCards(info[0]), info[1], null, info[2]);
                    }
                    else {
                        console.log(player);
                    }
                },
                compare: function (player, info) {
                    if (player && info) {
                        player.$compare(get.infoCard(info[0]), game.playerMap[info[1]], get.infoCard(info[2]));
                    }
                    else {
                        console.log(player);
                    }
                },
                compareMultiple: function (player, info) {
                    if (player && info) {
                        player.$compareMultiple(get.infoCard(info[0]), get.infoTargets(info[1]), get.infoCards(info[2]));
                    }
                    else {
                        console.log(player);
                    }
                },
                give: function (player, info) {
                    if (player && info) {
                        player.$give(info[0], game.playerMap[info[1]]);
                    }
                    else {
                        console.log(player);
                    }
                },
                giveCard: function (player, info) {
                    if (player && info) {
                        player.$give(get.infoCards(info[0]), game.playerMap[info[1]]);
                    }
                    else {
                        console.log(player);
                    }
                },
                gain: function (player, info) {
                    if (player && player.$gain) {
                        player.$gain(info);
                    }
                    else {
                        console.log(player);
                    }
                },
                gainCard: function (player, info) {
                    if (player && info) {
                        player.$gain(get.infoCards(info));
                    }
                    else {
                        console.log(player);
                    }
                },
                gain2: function (player, cards) {
                    if (player && player.$draw) {
                        var nodeList = document.querySelectorAll('#arena>.card,#chess>.card');
                        var nodes = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            nodes.push(nodeList[i]);
                        }
                        for (var i = 0; i < cards.length; i++) {
                            for (var j = 0; j < nodes.length; j++) {
                                if (cards[i][2] == nodes[j].name && cards[i][0] == nodes[j].suit && cards[i][1] == nodes[j].number) {
                                    nodes[j].moveDelete(player);
                                    cards.splice(i--, 1);
                                    nodes.splice(j--, 1);
                                    break;
                                }
                            }
                        }
                        if (cards.length) {
                            player.$draw(get.infoCards(cards));
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                deletenode: function (player, cards, method) {
                    if (cards) {
                        var nodeList = document.querySelectorAll('#arena>.card,#chess>.card');
                        var nodes = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            nodes.push(nodeList[i]);
                        }
                        for (var i = 0; i < cards.length; i++) {
                            for (var j = 0; j < nodes.length; j++) {
                                if (cards[i][2] == nodes[j].name && cards[i][0] == nodes[j].suit && cards[i][1] == nodes[j].number) {
                                    nodes[j].delete();
                                    if (method == 'zoom') {
                                        nodes[j].style.transform = 'scale(0)';
                                    }
                                    cards.splice(i--, 1);
                                    nodes.splice(j--, 1);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        console.log(player, cards);
                    }
                },
                highlightnode: function (player, card) {
                    if (card) {
                        var nodeList = document.querySelectorAll('#arena>.card,#chess>.card');
                        var nodes = [];
                        for (var i = 0; i < nodeList.length; i++) {
                            nodes.push(nodeList[i]);
                        }
                        for (var j = nodes.length - 1; j >= 0; j--) {
                            if (card[2] == nodes[j].name && card[0] == nodes[j].suit && card[1] == nodes[j].number) {
                                nodes[j].classList.add('thrownhighlight');
                                break;
                            }
                        }
                    }
                    else {
                        console.log(player, cards);
                    }
                },
                uiClear: function () {
                    ui.clear();
                },
                judge1: function (player, content) {
                    if (player && content) {
                        var judging = get.infoCard(content[0]);
                        if (game.chess) {
                            judging.copy('thrown', 'center', 'thrownhighlight', ui.arena).animate('start');
                        }
                        else {
                            player.$throwordered(judging.copy('thrownhighlight'), true);
                        }
        
                        ui.create.dialog(content[1]).videoId = content[2];
                        ui.arena.classList.add('thrownhighlight');
                    }
                    else {
                        console.log(player);
                    }
                },
                centernode: function (content) {
                    get.infoCard(content).copy('thrown', 'center', 'thrownhighlight', ui.arena).animate('start');
                },
                judge2: function (videoId) {
                    for (var i = 0; i < ui.dialogs.length; i++) {
                        if (ui.dialogs[i].videoId == videoId) {
                            ui.dialogs[i].close();
                        }
                    }
                    ui.arena.classList.remove('thrownhighlight');
                },
                unmarkname: function (player, name) {
                    if (player && player.unmark) {
                        player.unmark(name);
                    }
                    else {
                        console.log(player);
                    }
                },
                unmark: function (player, name) {
                    if (player && player.marks && player.marks[name]) {
                        player.marks[name].delete();
                        player.marks[name].style.transform += ' scale(0.2)';
                        delete player.marks[name];
                        ui.updatem(this);
                    }
                },
                flame: function (player, type) {
                    if (player && type) {
                        player['$' + type]();
                    }
                    else {
                        console.log(player);
                    }
                },
                throwEmotion: function (player, content) {
                    if (player && content) {
                        player.$throwEmotion(game.playerMap[content[0]], content[1]);
                    }
                    else {
                        console.log(player);
                    }
                },
                addGaintag: function (player, content) {
                    if (player && content) {
                        var checkMatch = function (l1, l2) {
                            for (var i = 0; i < l1.length; i++) {
                                for (var j = 0; j < l2.length; j++) {
                                    if (l2[j].suit == l1[i][0] && l2[j].number == l1[i][1] && l2[j].name == l1[i][2]) {
                                        l2[j].addGaintag(content[1]);
                                        l2.splice(j--, 1);
                                        break;
                                    }
                                }
                            }
                        }
                        checkMatch(content[0], player.getCards('h'));
                    }
                    else {
                        console.log(player);
                    }
                },
                removeGaintag: function (player, content) {
                    if (player && content) {
                        player.removeGaintag(content);
                    }
                    else {
                        console.log(player);
                    }
                },
                line: function (player, content) {
                    if (player && content) {
                        player.line(game.playerMap[content[0]], content[1]);
                    }
                    else {
                        console.log(player);
                    }
                },
                fullscreenpop: function (player, content) {
                    if (player && content) {
                        player.$fullscreenpop(content[0], content[1], content[2]);
                    }
                    else {
                        console.log(player);
                    }
                },
                damagepop: function (player, content) {
                    if (player && content) {
                        player.$damagepop(content[0], content[1], content[2]);
                    }
                    else {
                        console.log(player);
                    }
                },
                damage: function (player, source) {
                    if (player && player.$damage) {
                        player.$damage(game.playerMap[source]);
                    }
                    else {
                        console.log(player);
                    }
                },
                diex: function (player) {
                    if (!player) {
                        console.log('diex');
                        return;
                    }
                    var cards = player.getCards('hej');
                    for (var i = 0; i < cards.length; i++) {
                        cards[i].discard();
                    }
                    while (player.node.marks.childNodes.length > 1) {
                        player.node.marks.lastChild.remove();
                    }
                    player.classList.add('dead');
                    player.classList.remove('turnedover');
                    player.classList.remove('out');
                    player.node.count.innerHTML = '0';
                    player.node.hp.hide();
                    player.node.equips.hide();
                    player.node.count.hide();
                    player.previous.next = player.next;
                    player.next.previous = player.previous;
                    game.players.remove(player);
                    game.dead.push(player);
                    if (lib.config.mode == 'stone') {
                        setTimeout(function () {
                            player.delete();
                        }, 500);
                    }
                },
                tafangMe: function (player) {
                    if (player) {
                        game.me = player;
                        ui.me.lastChild.show();
                        ui.create.fakeme();
                        ui.handcards1 = player.node.handcards1.animate('start').fix();
                        ui.handcards2 = player.node.handcards2.animate('start').fix();
                        ui.handcards1Container.appendChild(ui.handcards1);
                        ui.handcards2Container.appendChild(ui.handcards2);
                        ui.updatehl();
                        game.setChessInfo();
                    }
                },
                deleteChessPlayer: function (player) {
                    if (player) {
                        player.delete();
                        delete game.playerMap[player.dataset.position];
                        game.players.remove(player);
                        for (var i = 0; i < ui.phasequeue.length; i++) {
                            if (ui.phasequeue[i].link == player) {
                                ui.phasequeue[i].remove();
                                ui.phasequeue.splice(i, 1);
                                break;
                            }
                        }
                    }
                },
                addChessPlayer: function (content) {
                    game.addChessPlayer.apply(this, content);
                },
                die: function (player) {
                    if (!player) {
                        console.log('die');
                        return;
                    }
                    player.$die();
                    if (game.chess) {
                        delete lib.posmap[player.dataset.position];
                        setTimeout(function () {
                            player.delete();
                        }, 500);
                        for (var i = 0; i < ui.phasequeue.length; i++) {
                            if (ui.phasequeue[i].link == player) {
                                ui.phasequeue[i].remove();
                                ui.phasequeue.splice(i, 1);
                                break;
                            }
                        }
                    }
                },
                revive: function (player) {
                    if (!player) {
                        console.log('revive');
                        return;
                    }
                    player.classList.remove('dead');
                    player.node.hp.show();
                    player.node.equips.show();
                    player.node.count.show();
                    player.node.avatar.style.transform = '';
                    player.node.avatar2.style.transform = '';
                    player.removeAttribute('style');
                },
                update: function (player, info) {
                    if (player && info) {
                        player.hp = info[1];
                        player.maxHp = info[2];
                        player.hujia = info[3];
                        player.update(info[0]);
                    }
                    else {
                        console.log(player);
                    }
                },
                phaseJudge: function (player, card) {
                    if (player && card) {
                        // player.$phaseJudge(get.infoCard(card));
                    }
                    else {
                        console.log(player);
                    }
                },
                directgain: function (player, cards) {
                    if (player && cards) {
                        player.directgain(get.infoCards(cards));
                    }
                    else {
                        console.log(player);
                    }
                },
                directgains: function (player, cards) {
                    if (player && cards) {
                        player.directgains(get.infoCards(cards));
                    }
                    else {
                        console.log(player);
                    }
                },
                directequip: function (player, cards) {
                    if (player && cards) {
                        player.directequip(get.infoCards(cards));
                    }
                    else {
                        console.log(player);
                    }
                },
                gain12: function (player, cards12) {
                    if (player && cards12) {
                        var cards1 = get.infoCards(cards12[0]);
                        var cards2 = get.infoCards(cards12[1]);
                        for (var i = 0; i < cards1.length; i++) {
                            cards1[i].classList.add('drawinghidden');
                            cards1[i].addGaintag(cards12[2]);
                            player.node.handcards1.insertBefore(cards1[i], player.node.handcards1.firstChild);
                        }
                        for (var i = 0; i < cards2.length; i++) {
                            cards2[i].classList.add('drawinghidden');
                            cards2[i].addGaintag(cards12[2]);
                            player.node.handcards2.insertBefore(cards2[i], player.node.handcards2.firstChild);
                        }
                        ui.updatehl();
                    }
                    else {
                        console.log(player);
                    }
                },
                equip: function (player, card) {
                    if (player && card) {
                        player.$equip(get.infoCard(card));
                    }
                    else {
                        console.log(player);
                    }
                },
                addJudge: function (player, content) {
                    if (player && content) {
                        var card = get.infoCard(content[0]);
                        card.viewAs = content[1];
                        if (card.viewAs && card.viewAs != card.name && (card.classList.contains('fullskin') || card.classList.contains('fullborder'))) {
                            card.classList.add('fakejudge');
                            card.node.background.innerHTML = lib.translate[card.viewAs + '_bg'] || get.translation(card.viewAs)[0]
                        }
                        card.classList.add('drawinghidden');
                        player.node.judges.insertBefore(card, player.node.judges.firstChild);
                        ui.updatej(player);
                    }
                    else {
                        console.log(player);
                    }
                },
                markCharacter: function (player, content) {
                    if (player && content) {
                        if (game.playerMap[content.target]) {
                            content.target = game.playerMap[content.target];
                        }
                        var mark = player.markCharacter(content.target, content);
                        if (content.id) {
                            player.marks[content.id] = mark;
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                changeMarkCharacter: function (player, content) {
                    if (player && content && player.marks[content.id]) {
                        player.marks[content.id].info = {
                            name: content.name,
                            content: content.content
                        };
                        player.marks[content.id].setBackground(content.target, 'character');
                    }
                },
                mark: function (player, content) {
                    if (player && content) {
                        var mark = player.mark(content.id, content);
                    }
                    else {
                        console.log(player);
                    }
                },
                markSkill: function (player, content) {
                    if (player && content) {
                        if (content[1]) {
                            player.markSkill(content[0], null, get.infoCard(content[1]));
                        }
                        else {
                            player.markSkill(content[0]);
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                unmarkSkill: function (player, name) {
                    if (player && player.unmarkSkill) {
                        player.unmarkSkill(name);
                    }
                    else {
                        console.log(player);
                    }
                },
                storage: function (player, content) {
                    if (player && content) {
                        if (content[2]) {
                            switch (content[2]) {
                                case 'cards': content[1] = get.infoCards(content[1]); break;
                                case 'card': content[1] = get.infoCard(content[1]); break;
                            }
                        }
                        player.storage[content[0]] = content[1];
                    }
                    else {
                        console.log(player);
                    }
                },
                markId: function (player, content) {
                    if (player && content) {
                        player.mark(get.infoCard(content[0]), content[1]);
                    }
                    else {
                        console.log(player);
                    }
                },
                unmarkId: function (player, content) {
                    if (player && content) {
                        player.unmark(get.infoCard(content[0]), content[1]);
                    }
                    else {
                        console.log(player);
                    }
                },
                lose: function (player, info) {
                    if (player && info) {
                        var hs = info[0] || [], es = info[1] || [], js = info[2] || [], ss = info[3] || [];
                        var phs = player.getCards('h'), pes = player.getCards('e'), pjs = player.getCards('j'), pss = player.getCards('s');
                        var checkMatch = function (l1, l2) {
                            for (var i = 0; i < l1.length; i++) {
                                for (var j = 0; j < l2.length; j++) {
                                    if (l2[j].suit == l1[i][0] && l2[j].number == l1[i][1] && l2[j].name == l1[i][2]) {
                                        l2[j].remove();
                                        l2.splice(j--, 1);
                                        break;
                                    }
                                }
                            }
                        }
                        checkMatch(hs, phs);
                        checkMatch(es, pes);
                        checkMatch(js, pjs);
                        checkMatch(ss, pss);
                        ui.updatehl();
                    }
                    else {
                        console.log(player);
                    }
                },
                loseAfter: function (player) {
                    if (!player) {
                        console.log('loseAfter');
                        return;
                    }
                },
                link: function (player, bool) {
                    if (player && player.classList) {
                        if (bool) {
                            player.addLink();
                        }
                        else {
                            player.removeLink();
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                turnOver: function (player, bool) {
                    if (player && player.classList) {
                        if (bool) {
                            player.classList.add('turnedover');
                        }
                        else {
                            player.classList.remove('turnedover');
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                showCards: function (player, info) {
                    if (info) {
                        var dialog = ui.create.dialog(info[0], get.infoCards(info[1]));
                        setTimeout(function () {
                            dialog.close();
                        }, 1000);
                    }
                    else {
                        console.log(player);
                    }
                },
                cardDialog: function (content) {
                    if (Array.isArray(content)) {
                        ui.create.dialog(content[0], get.infoCards(content[1])).videoId = content[2];
                    }
                    else if (typeof content == 'number') {
                        for (var i = 0; i < ui.dialogs.length; i++) {
                            if (ui.dialogs[i].videoId == content) {
                                ui.dialogs[i].close();
                                return;
                            }
                        }
                    }
                },
                changeSeat: function (player, info) {
                    if (player && player.getBoundingClientRect && player.changeSeat) {
                        player.changeSeat(info);
                        game.playerMap = {};
                        var players = game.players.concat(game.dead);
                        for (var i = 0; i < players.length; i++) {
                            game.playerMap[players[i].dataset.position] = players[i];
                        }
                    }
                },
                dialogCapt: function (content) {
                    for (var i = 0; i < ui.dialogs.length; i++) {
                        if (ui.dialogs[i].videoId == content[0]) {
                            ui.dialogs[i].content.firstChild.innerHTML = content[1];
                            return;
                        }
                    }
                },
                swapSeat: function (content) {
                    var player1 = game.playerMap[content[0]];
                    var player2 = game.playerMap[content[1]];
                    if (!player1 || !player2) {
                        console.log(content);
                        return;
                    }
                    var temp1, pos, i, num;
                    temp1 = player1.dataset.position;
                    player1.dataset.position = player2.dataset.position;
                    player2.dataset.position = temp1;
                    game.arrangePlayers();
                    if (player1.dataset.position == '0' || player2.dataset.position == '0') {
                        pos = parseInt(player1.dataset.position);
                        if (pos == 0) pos = parseInt(player2.dataset.position);
                        num = game.players.length + game.dead.length;
                        for (i = 0; i < game.players.length; i++) {
                            temp1 = parseInt(game.players[i].dataset.position) - pos;
                            if (temp1 < 0) temp1 += num;
                            game.players[i].dataset.position = temp1;
                        }
                        for (i = 0; i < game.dead.length; i++) {
                            temp1 = parseInt(game.dead[i].dataset.position) - pos;
                            if (temp1 < 0) temp1 += num;
                            game.dead[i].dataset.position = temp1;
                        }
                    }
                    game.playerMap = {};
                    var players = game.players.concat(game.dead);
                    for (var i = 0; i < players.length; i++) {
                        game.playerMap[players[i].dataset.position] = players[i];
                    }
                },
                removeTafangPlayer: function () {
                    ui.fakeme.hide();
                    ui.handcards1Container.innerHTML = '';
                    ui.handcards2Container.innerHTML = '';
                    game.me = ui.create.player();
                },
                swapControl: function (player, hs) {
                    if (player && player.node) {
                        var cards = get.infoCards(hs);
                        player.node.handcards1.innerHTML = '';
                        player.node.handcards2.innerHTML = '';
                        player.directgain(cards, false);
        
                        game.me.node.handcards1.remove();
                        game.me.node.handcards2.remove();
        
                        ui.handcards1 = player.node.handcards1.animate('start').fix();
                        ui.handcards2 = player.node.handcards2.animate('start').fix();
                        ui.handcards1Container.insertBefore(ui.handcards1, ui.handcards1Container.firstChild);
                        ui.handcards2Container.insertBefore(ui.handcards2, ui.handcards2Container.firstChild);
        
                        game.me = player;
                        ui.updatehl();
                        if (game.chess) {
                            ui.create.fakeme();
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                onSwapControl: function () {
                    game.onSwapControl();
                },
                swapPlayer: function (player, hs) {
                    if (player && player.node) {
                        var cards = get.infoCards(hs);
                        player.node.handcards1.innerHTML = '';
                        player.node.handcards2.innerHTML = '';
                        player.directgain(cards, false);
        
                        var pos = parseInt(player.dataset.position);
                        var num = game.players.length + game.dead.length;
                        var players = game.players.concat(game.dead);
                        var temp;
                        for (var i = 0; i < players.length; i++) {
                            temp = parseInt(players[i].dataset.position) - pos;
                            if (temp < 0) temp += num;
                            players[i].dataset.position = temp;
                        }
                        game.me.node.handcards1.remove();
                        game.me.node.handcards2.remove();
                        game.me = player;
                        ui.handcards1 = player.node.handcards1.animate('start').fix();
                        ui.handcards2 = player.node.handcards2.animate('start').fix();
                        ui.handcards1Container.appendChild(ui.handcards1);
                        ui.handcards2Container.appendChild(ui.handcards2);
        
                        ui.updatehl();
        
                        game.playerMap = {};
                        var players = game.players.concat(game.dead);
                        for (var i = 0; i < players.length; i++) {
                            game.playerMap[players[i].dataset.position] = players[i];
                        }
                    }
                    else {
                        console.log(player);
                    }
                },
                over: function (str) {
                    var dialog = ui.create.dialog('hidden');
                    dialog.noforcebutton = true;
                    dialog.content.innerHTML = str;
                    dialog.forcebutton = true;
                    dialog.open();
                    if (game.chess) {
                        dialog.classList.add('center');
                    }
                    if ((game.layout == 'long2' || game.layout == 'nova') && !game.chess) {
                        ui.arena.classList.add('choose-character');
                        if (ui.me) ui.me.hide();
                        if (ui.mebg) ui.mebg.hide()
                        if (ui.autonode) ui.autonode.hide();
                        if (lib.config.radius_size != 'off') {
                            if (ui.historybar) ui.historybar.style.borderRadius = '0 0 0 4px';
                        }
                    }
                }
            },
            reload: function () {
                if (_status) {
                    if (_status.reloading) return;
                    _status.reloading = true;
                }
                if (_status.video && !_status.replayvideo) {
                    localStorage.removeItem(lib.configprefix + 'playbackmode');
                }
                localStorage.setItem('show_splash_off', true);
                if (lib.status.reload) {
                    _status.waitingToReload = true;
                }
                else {
                    window.location.reload();
                }
            },
            reload2: function () {
                lib.status.reload--;
                if (lib.status.reload == 0 && lib.ondb2.length) {
                    var command = lib.ondb2.shift();
                    game[command[0]].apply(game, command[1]);
                }
                if (lib.status.reload == 0 && lib.ondb.length) {
                    var command = lib.ondb.shift();
                    game[command[0]].apply(game, command[1]);
                }
                if (lib.status.reload == 0) {
                    if (_status.waitingToReload) {
                        window.location.reload();
                        delete _status.waitingToReload;
                    }
                }
            },
            exit: function () {
                if (lib.device == 'ios') {
                    game.saveConfig('mode');
                    if (_status) {
                        if (_status.reloading) return;
                        _status.reloading = true;
                    }
                    if (_status.video && !_status.replayvideo) {
                        localStorage.removeItem(lib.configprefix + 'playbackmode');
                    }
                    window.location.reload();
                }
                else {
                    if (navigator.app && navigator.app.exitApp) {
                        navigator.app.exitApp();
                    }
                }
            },
            open: function (url) {
                if (lib.device) {
                    if (cordova.InAppBrowser) {
                        cordova.InAppBrowser.open(url, '_system');
                    }
                    else {
                        ui.create.iframe(url);
                    }
                }
                else {
                    window.open(url);
                }
            },
            reloadCurrent: function () {
                game.saveConfig('continue_name', [game.me.name1 || game.me.name, game.me.name2]);
                game.saveConfig('mode', lib.config.mode);
                localStorage.setItem(lib.configprefix + 'directstart', true);
                game.reload();
            },
            update: function (func) {
                lib.updates.push(func);
                if (lib.updates.length === 1) {
                    game.run();
                }
                return func;
            },
            unupdate: function (func) {
                lib.updates.remove(func);
            },
            stop: function () {
                cancelAnimationFrame(lib.status.frameId);
            },
            run: function () {
                if (lib.updates.length) {
                    cancelAnimationFrame(lib.status.frameId);
                    lib.status.frameId = requestAnimationFrame(function (time) {
                        if (lib.status.time !== 0) {
                            lib.status.delayed += time - lib.status.time;
                        }
                        lib.status.frameId = requestAnimationFrame(lib.run);
                    });
                }
            },
            addVideo: function (type, player, content) {
                if (_status.video || game.online) return;
                if (!_status.videoInited) {
                    if (type == 'arrangeLib') {
                        lib.video.push({
                            type: type,
                            player: player,
                            content: content,
                            delay: 0
                        });
                    }
                    return;
                }
                if (type == 'storage' && player && player.updateMarks) {
                    player.updateMarks();
                }
                if (game.getVideoName) {
                    var time = get.time();
                    if (!_status.lastVideoLog) {
                        _status.lastVideoLog = time;
                    }
                    if (get.itemtype(player) == 'player') {
                        player = player.dataset.position;
                    }
                    lib.video.push({
                        type: type,
                        player: player,
                        content: content,
                        delay: time - _status.lastVideoLog
                    });
                    _status.lastVideoLog = time;
                }
            },
            draw: function (func) {
                lib.canvasUpdates.push(func);
                if (!lib.status.canvas) {
                    lib.status.canvas = true;
                    game.update(lib.updateCanvas);
                }
            },
            vibrate: function (time) {
                if (typeof navigator.vibrate == 'function') {
                    navigator.vibrate(time || 500);
                }
            },
            prompt: function () {
                var str, forced, callback, noinput = false, str2 = '';
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] == 'alert') {
                        forced = true;
                        callback = function () { };
                        noinput = true;
                    }
                    else if (typeof arguments[i] == 'string') {
                        if (arguments[i].indexOf('###') == 0) {
                            var list = arguments[i].slice(3).split('###');
                            str = list[0];
                            str2 = list[1];
                        }
                        else str = arguments[i];
                    }
                    else if (typeof arguments[i] == 'boolean') {
                        forced = arguments[i];
                    }
                    else if (typeof arguments[i] == 'function') {
                        callback = arguments[i];
                    }
                }
                if (!callback) {
                    return;
                }
                //try{
                //    if(noinput){
                //        throw('e');
                //    }
                //    var result=prompt(str);
                //    callback(result);
                //}
                //catch(e){
                var promptContainer = ui.create.div('.popup-container', ui.window, function () {
                    if (this.clicked) {
                        this.clicked = false;
                    }
                    else {
                        clickCancel();
                    }
                });
                var dialogContainer = ui.create.div('.prompt-container', promptContainer);
                var dialog = ui.create.div('.menubg', ui.create.div(dialogContainer), function () {
                    promptContainer.clicked = true;
                });
                var strnode = ui.create.div('', str || '', dialog);
                var input = ui.create.node('input', ui.create.div(dialog));
                input.value = str2;
                if (noinput) {
                    input.style.display = 'none';
                }
                var controls = ui.create.div(dialog);
                var clickConfirm = function () {
                    if (noinput) {
                        promptContainer.remove();
                    }
                    else if (input.value) {
                        callback(input.value);
                        promptContainer.remove();
                    }
                }
                var clickCancel = function () {
                    if (!forced) {
                        callback(false);
                        promptContainer.remove();
                    }
                }
                var confirmNode = ui.create.div('.menubutton.large.disabled', '确定', controls, clickConfirm);
                if (!forced) {
                    ui.create.div('.menubutton.large', '取消', controls, clickCancel);
                }
                if (noinput) {
                    confirmNode.classList.remove('disabled');
                }
                else {
                    input.onkeydown = function (e) {
                        if (e.keyCode == 13) {
                            clickConfirm();
                        }
                        else if (e.keyCode == 27) {
                            clickCancel();
                        }
                    }
                    input.onkeyup = function () {
                        if (input.value) {
                            confirmNode.classList.remove('disabled');
                        }
                        else {
                            confirmNode.classList.remove('disabled');
                        }
                    }
                    input.focus();
                }
                //}
            },
            alert: function (str) {
                game.prompt(str, 'alert');
            },
            print: function () {
                if (!_status.toprint) {
                    _status.toprint = [];
                }
                _status.toprint.push(Array.from(arguments));
            },
            animate: {
                window: function (num) {
                    switch (num) {
                        case 1: {
                            ui.window.style.transition = 'all 0.5s';
                            ui.window.classList.add('zoomout3');
                            ui.window.hide();
                            game.addVideo('windowzoom1');
                            game.delay(0, 500);
                            break;
                        }
                        case 2: {
                            ui.window.style.transition = 'all 0s';
                            ui.refresh(ui.window);
                            game.addVideo('windowzoom2');
                            game.pause();
                            setTimeout(function () {
                                ui.window.classList.remove('zoomout3');
                                ui.window.classList.add('zoomin3');
                                game.addVideo('windowzoom3');
                                setTimeout(function () {
                                    ui.window.style.transition = 'all 0.5s';
                                    ui.refresh(ui.window);
                                    ui.window.show();
                                    ui.window.classList.remove('zoomin3');
                                    game.addVideo('windowzoom4');
                                    setTimeout(function () {
                                        ui.window.style.transition = '';
                                        game.addVideo('windowzoom5');
                                        game.resume();
                                    }, 500);
                                }, 100);
                            }, 100);
                            break;
                        }
                    }
                },
                flame: function (x, y, duration, type) {
                    var particles = [];
                    var particle_count = 50;
                    if (type == 'thunder' || type == 'recover') {
                        particle_count = 30;
                    }
                    else if (type == 'coin' || type == 'dust') {
                        particle_count = 50;
                    }
                    else if (type == 'legend') {
                        particle_count = 120;
                    }
                    else if (type == 'epic') {
                        particle_count = 80;
                    }
                    else if (type == 'rare') {
                        particle_count = 50;
                    }
                    for (var i = 0; i < particle_count; i++) {
                        particles.push(new particle());
                    }
                    function particle() {
                        this.speed = { x: -1 + Math.random() * 2, y: -5 + Math.random() * 5 };
                        if (type == 'thunder' || type == 'coin' || type == 'dust') {
                            this.speed.y = -3 + Math.random() * 5;
                            this.speed.x = -2 + Math.random() * 4;
                        }
                        if (type == 'legend' || type == 'rare' || type == 'epic') {
                            this.speed.x *= 3;
                            this.speed.y *= 1.5;
                        }
                        this.location = { x: x, y: y };
        
                        this.radius = 0.5 + Math.random() * 1;
        
                        this.life = 10 + Math.random() * 10;
                        this.death = this.life;
        
                        switch (type) {
                            case 'thunder': {
                                this.b = 255;
                                this.r = Math.round(Math.random() * 255);
                                this.g = Math.round(Math.random() * 255);
                                this.x += Math.random() * 20 - 10;
                                this.y += Math.random() * 20 - 10;
        
                                break;
                            }
                            case 'fire': {
                                this.r = 255;
                                this.g = Math.round(Math.random() * 155);
                                this.b = 0;
                                break;
                            }
                            case 'coin': {
                                this.r = 255;
                                this.g = Math.round(Math.random() * 25 + 230);
                                this.b = Math.round(Math.random() * 100 + 50);
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.life *= 1.3;
                                this.death *= 1.3;
                                break;
                            }
                            case 'dust': {
                                this.r = Math.round(Math.random() * 55) + 105;
                                this.g = Math.round(Math.random() * 55) + 150;
                                this.b = 255;
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.life *= 1.3;
                                this.death *= 1.3;
                                break;
                            }
                            case 'legend': {
                                this.r = 255;
                                this.g = Math.round(Math.random() * 100 + 155);
                                this.b = Math.round(Math.random() * 100 + 50);
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.speed.x /= 2;
                                this.speed.y /= 2;
                                this.life *= 2;
                                this.death *= 2;
                                break;
                            }
                            case 'epic': {
                                this.r = Math.round(Math.random() * 55) + 200;
                                this.g = Math.round(Math.random() * 100) + 55;
                                this.b = 255;
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.speed.x /= 2;
                                this.speed.y /= 2;
                                this.life *= 2;
                                this.death *= 2;
                                break;
                            }
                            case 'rare': {
                                this.r = Math.round(Math.random() * 55) + 105;
                                this.g = Math.round(Math.random() * 55) + 150;
                                this.b = 255;
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.speed.x /= 2;
                                this.speed.y /= 2;
                                this.life *= 2;
                                this.death *= 2;
                                break;
                            }
                            case 'recover': {
                                this.g = 255;
                                this.r = Math.round(Math.random() * 200 + 55);
                                this.b = Math.round(Math.random() * 155 + 55);
                                this.location.x += Math.round(Math.random() * 60) - 30;
                                this.location.y += Math.round(Math.random() * 40) - 20;
                                if (this.location.x < x) {
                                    this.speed.x = -Math.abs(this.speed.x);
                                }
                                else if (this.location.x > x) {
                                    this.speed.x = Math.abs(this.speed.x);
                                }
                                this.speed.x /= 2;
                                this.speed.y /= 2;
                                this.life *= 2;
                                this.death *= 2;
                                break;
                            }
                            default: {
                                this.r = 255;
                                this.g = Math.round(Math.random() * 155);
                                this.b = 0;
                            }
                        }
                    }
        
                    game.draw(function (time, surface) {
                        surface.globalCompositeOperation = "source-over";
                        surface.globalCompositeOperation = "lighter";
        
                        for (var i = 0; i < particles.length; i++) {
                            var p = particles[i];
        
                            surface.beginPath();
                            var middle = 0.5;
                            var radius = p.radius;
                            if (type == 'recover' || type == 'legend' || type == 'rare' ||
                                type == 'epic' || type == 'coin' || type == 'dust') {
                                middle = 0.7;
                                radius /= 3;
                            }
        
                            p.opacity = Math.round(p.death / p.life * 100) / 100
                            var gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
                            gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                            gradient.addColorStop(middle, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                            gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
                            surface.fillStyle = gradient;
                            surface.arc(p.location.x, p.location.y, radius, Math.PI * 2, false);
                            surface.fill();
                            p.death--;
                            if (type == 'recover') {
                                p.radius += 0.5;
                            }
                            else if (type == 'coin' || type == 'dust') {
                                p.radius += 0.7;
                            }
                            else if (type == 'legend' || type == 'rare' || type == 'epic') {
                                p.radius += 0.5;
                            }
                            else {
                                p.radius++;
                            }
                            p.location.x += (p.speed.x);
                            p.location.y += (p.speed.y);
        
                            if (p.death < 0 || p.radius < 0) {
                                if (typeof duration == 'number' && time + 500 >= duration) {
                                    particles.splice(i--, 1);
                                }
                                else {
                                    particles[i] = new particle();
                                }
                            }
                        }
                        if (particles.length == 0) {
                            return false;
                        }
                    });
                }
            },
            linexy: function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                var total = typeof arguments[1] === 'number' ? arguments[1] : lib.config.duration * 2;
                var opacity = 1;
                var color = [255, 255, 255];
                var dashed = false;
                var drag = false;
                if (typeof arguments[1] == 'object') {
                    for (var i in arguments[1]) {
                        switch (i) {
                            case 'opacity': opacity = arguments[1][i]; break;
                            case 'color': color = arguments[1][i]; break;
                            case 'dashed': dashed = arguments[1][i]; break;
                            case 'duration': total = arguments[1][i]; break;
                        }
                    }
                }
                else if (arguments[1] == 'fire' || arguments[1] == 'thunder' || arguments[1] == 'ocean' || arguments[1] == 'green') {
                    color = arguments[1];
                }
                if (color == 'fire') {
                    color = [255, 146, 68];
                }
                else if (color == 'thunder') {
                    color = [141, 216, 255];
                }
                else if (color == 'ocean') {
                    color = [98, 146, 240];
                }
                else if (color == 'green') {
                    color = [141, 255, 216];
                }
                var node;
                if (arguments[1] == 'drag') {
                    color = [236, 201, 71];
                    drag = true;
                    if (arguments[2]) {
                        node = arguments[2]
                    }
                    else {
                        node = ui.create.div('.linexy.drag');
                        node.style.left = from[0] + 'px';
                        node.style.top = from[1] + 'px';
                        node.style.background = 'linear-gradient(transparent,rgba(' + color.toString() + ',' + opacity + '),rgba(' + color.toString() + ',' + opacity + '))';
                        if (game.chess) {
                            ui.chess.appendChild(node);
                        }
                        else {
                            ui.arena.appendChild(node);
                        }
                    }
                }
                else {
                    node = ui.create.div('.linexy.hidden');
                    node.style.left = from[0] + 'px';
                    node.style.top = from[1] + 'px';
                    node.style.background = 'linear-gradient(transparent,rgba(' + color.toString() + ',' + opacity + '),rgba(' + color.toString() + ',' + opacity + '))';
                    node.style.transitionDuration = (total / 3000) + 's';
                }
                var dy = to[1] - from[1];
                var dx = to[0] - from[0];
                var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
                if (dx >= 0) {
                    if (dy <= 0) {
                        deg += 90;
                    }
                    else {
                        deg = 90 - deg;
                    }
                }
                else {
                    if (dy <= 0) {
                        deg = 270 - deg;
                    }
                    else {
                        deg += 270;
                    }
                }
                if (drag) {
                    node.style.transform = 'rotate(' + (-deg) + 'deg)';
                    node.style.height = get.xyDistance(from, to) + 'px';
                }
                else {
                    node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(0)';
                    node.style.height = get.xyDistance(from, to) + 'px';
                    if (game.chess) {
                        ui.chess.appendChild(node);
                    }
                    else {
                        ui.arena.appendChild(node);
                    }
                    ui.refresh(node);
                    node.show();
                    node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(1)';
                    node.listenTransition(function () {
                        setTimeout(function () {
                            if (node.classList.contains('removing')) return;
                            node.delete();
                        }, total / 3);
                    });
                }
                return node;
            },
            _linexy: function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                var total = typeof arguments[1] === 'number' ? arguments[1] : lib.config.duration * 2;
                var opacity = 1;
                var color = [255, 255, 255];
                var dashed = false;
                if (typeof arguments[1] == 'object') {
                    for (var i in arguments[1]) {
                        switch (i) {
                            case 'opacity': opacity = arguments[1][i]; break;
                            case 'color': color = arguments[1][i]; break;
                            case 'dashed': dashed = arguments[1][i]; break;
                            case 'duration': total = arguments[1][i]; break;
                        }
                    }
                }
                else if (arguments[1] == 'fire' || arguments[1] == 'thunder' || arguments[1] == 'ocean' || arguments[1] == 'green') {
                    color = arguments[1];
                }
                if (color == 'fire') {
                    color = [255, 146, 68];
                }
                else if (color == 'thunder') {
                    color = [141, 216, 255];
                }
                else if (color == 'ocean') {
                    color = [98, 146, 250];
                }
                else if (color == 'green') {
                    color = [141, 255, 216];
                }
                var drawfunc = function (time, ctx) {
                    var current;
                    if (time < total / 3) {
                        ctx.strokeStyle = 'rgba(' + color.toString() + ',' + opacity * (time / (total / 3)) + ')';
                        current = [from[0] + (to[0] - from[0]) * time / (total / 3),
                        from[1] + (to[1] - from[1]) * time / (total / 3)];
                    }
                    else if (time <= total) {
                        current = to;
                        if (time > total / 1.5) {
                            ctx.strokeStyle = 'rgba(' + color.toString() + ',' + opacity * (1 - (time - total / 1.5) / (total - total / 1.5)) + ')';
                        }
                        else {
                            ctx.strokeStyle = 'rgba(' + color.toString() + ',' + opacity + ')';
                        }
                    }
                    else {
                        return false;
                    }
                    ctx.beginPath();
                    if (dashed) {
                        ctx.lineCap = 'butt';
                        ctx.setLineDash([8, 2]);
                    }
                    else {
                        ctx.lineCap = 'round';
                    }
                    ctx.moveTo(from[0], from[1]);
                    ctx.lineTo(current[0], current[1]);
                    ctx.stroke();
                };
                if (arguments[2] && game.chess) {
                    game.draw2(drawfunc);
                }
                else {
                    game.draw(drawfunc);
                }
            },
            /**
             * 创建trigger事件；`trigger`本身也是事件，但是`trigger`事件不可触发
             * @param {string} name trigger name
             * @param {*} skill 技能ID
             * @param {GameCores.GameObjects.Player} player 事件所属的角色
             * @param {GameCores.Bases.Event} Evt trigger事件的触发事件
             */
            createTrigger: function (name, skill, player, Evt) {
                if (player.isOut() || player.removed) return;
                if (player.isDead() && !lib.skill[skill].forceDie) return;
                var next = game.createEvent('trigger', false);
                next.skill = skill;
                next.player = player;
                next.triggername = name;
                next.forceDie = true;
                next._trigger = Evt;
                next.setContent('createTrigger');
            },
            /**
             * 创建事件
             * @function
             * @param {string} name 事件名称
             * @param {?boolean} [canTriggered] 是否可以触发，如果是true或未指定，可以触发；如果是false，不会触发
             * @param {?GameCores.Bases.Event} [triggerevent] 前置事件，如果未指定，使用当前事件{@link _status.event}
             */
            createEvent: function (name, trigger, triggerevent) {
                /**
                 * 事件对象
                 * 创建事件，见{@link game.createEvent}
                 * @namespace GameCores.Bases.Event
                 */
                var next =
                /**@lends GameCores.Bases.Event */
                {
                    /**
                     * 事件名称
                     * @type {string}
                     */
                    name: name,
                    /**
                     * 事件状态，用于记录状态机状态
                     * @type {string}
                     * @default 0
                     */
                    step: 0,
                    /**
                     * 事件是否结束，如果结束则为true；默认为false
                     * @type {boolean}
                     * @default false
                     */
                    finished: false,
                    /**
                     * 事件的子事件数组
                     * @type {!GameCores.Bases.Event[]}
                     */
                    next: [],
                    /**
                     * 事件的追加事件数组，在After后如果有事件就执行
                     * 受`skipList`影响
                     * @type {GameCores.Bases.Event[]}
                     */
                    after: [],
                    custom: {//??
                        add: {},
                        replace: {}
                    },
                    _aiexclude: [],
                    /**
                     * 禁止触发对象数组，该事件无法被其中的角色对象触发
                     * @type {GameCores.GameObjects.Player[]}
                     */
                    _notrigger: [],
                    /**
                     * 子事件返回值
                     * @type {?Object}
                     */
                    _result: {},
                    _set: [],
                }
                if (trigger !== false && !game.online) next._triggered = 0;
                for (var i in lib.element.event) {
                    next[i] = lib.element.event[i];
                }
                (triggerevent || _status.event).next.push(next);
                return next;
            },
            /**
             * 添加角色
             * @param {*} name 
             * @param {*} info 
             */
            //TODO
            addCharacter: function (name, info) {
                var extname = (_status.extension || info.extension);
                var imgsrc;
                if (_status.evaluatingExtension) {
                    imgsrc = 'db:extension-' + extname + ':' + name + '.jpg';
                }
                else {
                    imgsrc = 'ext:' + extname + '/' + name + '.jpg';
                }
                var character = [info.sex, info.group, info.hp, info.skills || [], [imgsrc]];
                if (info.tags) {
                    character[4] = character[4].concat(info.tags);
                }
                lib.character[name] = character;
                var packname = 'mode_extension_' + extname;
                if (!lib.characterPack[packname]) {
                    lib.characterPack[packname] = {};
                }
                lib.translate[name] = info.translate;
                lib.characterPack[packname][name] = character;
                lib.translate[packname + '_character_config'] = extname;
            },
            /**
             * 添加角色包
             * @param {*} pack 
             * @param {*} packagename 
             */
            //TODO
            addCharacterPack: function (pack, packagename) {
                var extname = _status.extension || '扩展';
                packagename = packagename || extname;
                for (var i in pack) {
                    if (i == 'mode' || i == 'forbid') continue;
                    for (var j in pack[i]) {
                        if (i == 'character') {
                            if (!pack[i][j][4]) {
                                pack[i][j][4] = [];
                            }
                            var imgsrc;
                            if (_status.evaluatingExtension) {
                                imgsrc = 'db:extension-' + extname + ':' + j + '.jpg';
                            }
                            else {
                                imgsrc = 'ext:' + extname + '/' + j + '.jpg';
                            }
                            pack[i][j][4].push(imgsrc);
                            if (pack[i][j][4].contains('boss') ||
                                pack[i][j][4].contains('hiddenboss')) {
                                lib.config.forbidai.add(j);
                            }
                            if (lib.config.forbidai_user && lib.config.forbidai_user.contains(j)) {
                                lib.config.forbidai.add(j);
                            }
                            for (var l = 0; l < pack[i][j][3].length; l++) {
                                lib.skilllist.add(pack[i][j][3][l]);
                            }
                        }
                        else if (i == 'skill') {
                            if (typeof pack[i][j].audio == 'number' || typeof pack[i][j].audio == 'boolean') {
                                pack[i][j].audio = 'ext:' + extname + ':' + pack[i][j].audio;
                            }
                        }
                        if (lib[i][j] == undefined) {
                            lib[i][j] = pack[i][j];
                        }
                    }
                }
                var packname = 'mode_extension_' + packagename;
                lib.characterPack[packname] = pack.character;
                lib.translate[packname + '_character_config'] = packagename;
            },
            /**
             * 添加卡牌
             */
            //TODO
            addCard: function (name, info, info2) {
                var extname = (_status.extension || info2.extension);
                if (info.audio == true) {
                    info.audio = 'ext:' + extname;
                }
                if (info.fullskin) {
                    if (_status.evaluatingExtension) {
                        info.image = 'db:extension-' + extname + ':' + name + '.png';
                    }
                    else {
                        info.image = 'ext:' + extname + '/' + name + '.png';
                    }
                }
                else if (info.fullimage) {
                    if (_status.evaluatingExtension) {
                        info.image = 'db:extension-' + extname + ':' + name + '.jpg';
                    }
                    else {
                        info.image = 'ext:' + extname + '/' + name + '.jpg';
                    }
                }
                lib.card[name] = info;
                lib.translate[name] = info2.translate;
                lib.translate[name + '_info'] = info2.description;
                if (typeof info2.number == 'number') {
                    var suits = ['heart', 'spade', 'diamond', 'club'];
                    if (info2.color == 'red') {
                        suits = ['heart', 'diamond'];
                    }
                    else if (info2.color == 'black') {
                        suits = ['club', 'spade'];
                    }
                    for (var i = 0; i < info2.number; i++) {
                        lib.card.list.push([suits[Math.floor(Math.random() * suits.length)], Math.ceil(Math.random() * 13), name]);
                    }
                }
                var packname = 'mode_extension_' + extname;
                if (!lib.cardPack[packname]) {
                    lib.cardPack[packname] = [];
                    lib.translate[packname + '_card_config'] = extname;
                }
                lib.cardPack[packname].push(name);
            },
            /**
             * 添加卡包
             * @param {Object} pack 包
             * @param {string} packagename 包名
             */
            //TODO
            addCardPack: function (pack, packagename) {
                var extname = _status.extension || '扩展';
                packagename = packagename || extname;
                var packname = 'mode_extension_' + packagename;
                lib.cardPack[packname] = [];
                lib.translate[packname + '_card_config'] = packagename;
                for (var i in pack) {
                    if (i == 'mode' || i == 'forbid') continue;
                    if (i == 'list') {
                        for (var j = 0; j < pack[i].length; j++) {
                            lib.card.list.push(pack[i][j]);
                        }
                        continue;
                    }
                    for (var j in pack[i]) {
                        if (i == 'card') {
                            if (pack[i][j].audio == true) {
                                pack[i][j].audio = 'ext:' + extname;
                            }
                            if (pack[i][j].fullskin) {
                                if (_status.evaluatingExtension) {
                                    pack[i][j].image = 'db:extension-' + extname + ':' + j + '.png';
                                }
                                else {
                                    pack[i][j].image = 'ext:' + extname + '/' + j + '.png';
                                }
                            }
                            else if (pack[i][j].fullimage) {
                                if (_status.evaluatingExtension) {
                                    pack[i][j].image = 'db:extension-' + extname + ':' + j + '.jpg';
                                }
                                else {
                                    pack[i][j].image = 'ext:' + extname + '/' + j + '.jpg';
                                }
                            }
                            lib.cardPack[packname].push(j);
                        }
                        else if (i == 'skill') {
                            if (typeof pack[i][j].audio == 'number' || typeof pack[i][j].audio == 'boolean') {
                                pack[i][j].audio = 'ext:' + extname + ':' + pack[i][j].audio;
                            }
                        }
                        if (lib[i][j] == undefined) lib[i][j] = pack[i][j];
                    }
                }
            },
            /**
             * 添加技能
             */
            //TODO
            addSkill: function (name, info, translate, description) {
                if (lib.skill[name]) {
                    return false;
                }
                if (typeof info.audio == 'number' || typeof info.audio == 'boolean') {
                    info.audio = 'ext:' + _status.extension + ':' + info.audio;
                }
                lib.skill[name] = info;
                lib.translate[name] = translate;
                lib.translate[name + '_info'] = description;
                return true;
            },
            /**
             * 添加游戏模式（Mode）
             * @param {string} name 
             * @param {string} info 
             * @param {string} info2
             * @deprecated [never used] 
             */
            addMode: function (name, info, info2) {
                lib.config.all.mode.push(name);
                lib.translate[name] = info2.translate;
                var imgsrc;
                var extname = _status.extension || info2.extension;
                if (_status.evaluatingExtension) {
                    imgsrc = 'extension-' + extname + ':' + name + '.jpg';
                }
                else {
                    imgsrc = 'ext:' + extname + '/' + name + '.jpg';
                }
                lib.mode[name] = {
                    name: info2.translate,
                    config: info2.config,
                    splash: imgsrc,
                    fromextension: true
                }
                lib.init['setMode_' + name] = function () {
                    game.import('mode', function (lib, game, ui, get, ai, _status) {
                        info.name = name;
                        return info;
                    });
                }
                if (!lib.config.extensionInfo[extname]) {
                    lib.config.extensionInfo[extname] = {};
                }
                if (!lib.config.extensionInfo[extname].mode) {
                    lib.config.extensionInfo[extname].mode = [];
                }
                if (lib.config.extensionInfo[extname].mode.indexOf(name) == -1) {
                    lib.config.extensionInfo[extname].mode.push(name);
                }
                game.saveConfig('extensionMode', lib.config.extensionInfo);
            },
            /**
             * 添加全局技能
             * @param {string} skill 技能名
             * @param {?string} player 可以为该技能绑定一名角色
             * @deprecated [never used] 
             */
            addGlobalSkill: function (skill, player) {
                var info = lib.skill[skill];
                if (!info) return false;
                lib.skill.global.add(skill);
                if (player) {
                    if (!lib.skill.globalmap[skill]) {
                        lib.skill.globalmap[skill] = [];
                    }
                    lib.skill.globalmap[skill].add(player);
                }
                if (info.trigger) {
                    var setTrigger = function (i, evt) {
                        var name = i + '_' + evt;
                        if (!lib.hook.globalskill[name]) {
                            lib.hook.globalskill[name] = [];
                        }
                        lib.hook.globalskill[name].add(skill);
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
                return true;
            },
            removeGlobalSkill: function (skill) {
                lib.skill.global.remove(skill);
                delete lib.skill.globalmap[skill];
                for (var i in lib.hook.globalskill) {
                    lib.hook.globalskill[i].remove(skill);
                }
            },
            //将清除武将牌上的临时技能
            resetSkills: function () {
                for (var i = 0; i < game.players.length; i++) {
                    for (var j in game.players[i].tempSkills) {
                        game.players[i].removeSkill(j);
                    }
                    var skills = game.players[i].getSkills();
                    for (var j = 0; j < skills.length; j++) {
                        if (lib.skill[skills[j]].vanish) {
                            game.players[i].removeSkill(skills[j]);
                        }
                    }
                    game.players[i].in(true);
                }
                ui.clear();
            },
            removeExtension: function (extname, keepfile) {
                var prefix = 'extension_' + extname;
                for (var i in lib.config) {
                    if (i.indexOf(prefix) == 0) {
                        game.saveConfig(i);
                    }
                }
                localStorage.removeItem(lib.configprefix + prefix);
                game.deleteDB('data', prefix);
                lib.config.extensions.remove(extname);
                game.saveConfig('extensions', lib.config.extensions);
                var modelist = lib.config.extensionInfo[extname];
                if (modelist) {
                    if (modelist.image) {
                        for (var i = 0; i < modelist.image.length; i++) {
                            game.deleteDB('image', 'extension-' + extname + ':' + modelist.image[i]);
                        }
                    }
                    if (modelist.mode) {
                        for (var i = 0; i < modelist.mode.length; i++) {
                            game.clearModeConfig(modelist.mode[i]);
                        }
                    }
                    delete lib.config.extensionInfo[extname];
                    game.saveConfig('extensionInfo', lib.config.extensionInfo);
                }
                if (game.download && !keepfile) {
                    if (lib.node && lib.node.fs) {
                        try {
                            lib.node.fs.readdir(__dirname + '/extension/' + extname, function (err, list) {
                                if (err) {
                                    return;
                                }
                                var removeFile = function () {
                                    if (list.length) {
                                        var filename = list.shift();
                                        lib.node.fs.unlink(__dirname + '/extension/' + extname + '/' + filename, removeFile);
                                    }
                                    else {
                                        try {
                                            lib.node.fs.rmdir(__dirname + '/extension/' + extname, function () { });
                                        }
                                        catch (e) { }
                                    }
                                }
                                removeFile();
                            });
                        }
                        catch (e) { }
                    }
                    else {
                        window.resolveLocalFileSystemURL(lib.assetURL + 'extension/' + extname, function (entry) {
                            entry.removeRecursively();
                        });
                    }
                }
            },
            addRecentCharacter: function () {
                var list = get.config('recentCharacter') || [];
                for (var i = 0; i < arguments.length; i++) {
                    if (lib.character[arguments[i]]) {
                        list.remove(arguments[i]);
                        list.unshift(arguments[i]);
                    }
                }
                var num = parseInt(lib.config.recent_character_number);
                if (list.length > num) {
                    list.splice(num);
                }
                game.saveConfig('recentCharacter', list, true);
            },
            createCard: function (name, suit, number, nature, tags, specialEffects) {
                if (typeof name == 'object') {
                    nature = name.nature;
                    number = name.number;
                    suit = name.suit;
                    name = name.name;
                    if (tags) tags = name.tags;
                    if (specialEffects) specialEffects = name.specialEffects;
                }
                if (typeof name != 'string') {
                    name = 'sha';
                }
                var noclick = false;
                if (suit == 'noclick') {
                    noclick = true;
                    suit = null;
                }
                if (!lib.card[name]) console.log(name);
                if (!suit && lib.card[name] && lib.card[name].cardcolor) {
                    suit = lib.card[name].cardcolor;
                }
                if (!nature && lib.card[name] && lib.card[name].cardnature) {
                    nature = lib.card[name].cardnature;
                }
                if (typeof suit != 'string') {
                    suit = ['heart', 'diamond', 'club', 'spade'].randomGet();
                }
                else if (suit == 'black') {
                    suit = Math.random() < 0.5 ? 'club' : 'spade';
                }
                else if (suit == 'red') {
                    suit = Math.random() < 0.5 ? 'diamond' : 'heart';
                }
                if (typeof number != 'number' && typeof number != 'string') {
                    number = Math.ceil(Math.random() * 13);
                }
                var card;
                if (noclick) {
                    card = ui.create.card(ui.special, 'noclick', true);
                }
                else {
                    card = ui.create.card(ui.special);
                }
                card.storage.vanish = true;
                return card.init([suit, number, name, nature, tags, specialEffects]);
            },
            createCard2: function () {
                var card = game.createCard.apply(this, arguments);
                delete card.storage.vanish;
                return card;
            },
            forceOver: function (bool, callback) {
                _status.event.next.length = 0;
                var next = game.createEvent('finish_game');
                next.bool = bool;
                next.callback = callback;
                next.setContent('forceOver');
                if (_status.paused) {
                    game.uncheck();
                    game.resume();
                }
            },
            over: function (result) {
                if (_status.over) return;
                if (game.me._trueMe) game.swapPlayer(game.me._trueMe);
                var i, j, k, num, table, tr, td, dialog;
                _status.over = true;
                ui.control.show();
                ui.clear();
                game.stopCountChoose();
                if (ui.time3) {
                    clearInterval(ui.time3.interval);
                }
                if ((game.layout == 'long2' || game.layout == 'nova') && !game.chess) {
                    ui.arena.classList.add('choose-character');
                    ui.me.hide();
                    ui.mebg.hide()
                    ui.autonode.hide();
                    if (lib.config.radius_size != 'off') {
                        ui.historybar.style.borderRadius = '0 0 0 4px';
                    }
                }
                if (game.online) {
                    var dialog = ui.create.dialog();
                    dialog.noforcebutton = true;
                    dialog.content.innerHTML = result;
                    dialog.forcebutton = true;
                    var result2 = arguments[1];
                    if (result2 == true) {
                        dialog.content.firstChild.innerHTML = '战斗胜利';
                    }
                    else if (result2 == false) {
                        dialog.content.firstChild.innerHTML = '战斗失败';
                    }
                    ui.update();
                    dialog.add(ui.create.div('.placeholder'));
                    for (var i = 0; i < game.players.length; i++) {
                        var hs = game.players[i].getCards('h');
                        if (hs.length) {
                            dialog.add('<div class="text center">' + get.translation(game.players[i]) + '</div>');
                            dialog.addSmall(hs);
                        }
                    }
        
                    for (var j = 0; j < game.dead.length; j++) {
                        var hs = game.dead[j].getCards('h');
                        if (hs.length) {
                            dialog.add('<div class="text center">' + get.translation(game.dead[j]) + '</div>');
                            dialog.addSmall(hs);
                        }
                    }
        
                    dialog.add(ui.create.div('.placeholder.slim'));
                    if (lib.config.background_audio) {
                        if (result2 === true) {
                            game.playAudio('effect', 'win');
                        }
                        else if (result2 === false) {
                            game.playAudio('effect', 'lose');
                        }
                        else {
                            game.playAudio('effect', 'tie');
                        }
                    }
                    if (!ui.exit) {
                        ui.create.exit();
                    }
                    if (ui.giveup) {
                        ui.giveup.remove();
                        delete ui.giveup;
                    }
                    if (game.servermode) {
                        ui.exit.firstChild.innerHTML = '返回房间';
                        setTimeout(function () {
                            ui.exit.firstChild.innerHTML = '退出房间';
                            _status.roomtimeout = true;
                            lib.config.reconnect_info[2] = null;
                            game.saveConfig('reconnect_info', lib.config.reconnect_info);
                        }, 10000);
                    }
                    if (ui.tempnowuxie) {
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                    if (ui.auto) ui.auto.hide();
                    if (ui.wuxie) ui.wuxie.hide();
                    if (game.getIdentityList) {
                        for (var i = 0; i < game.players.length; i++) {
                            game.players[i].setIdentity();
                        }
                    }
                    return;
                }
                if (lib.config.background_audio) {
                    if (result === true) {
                        game.playAudio('effect', 'win');
                    }
                    else if (result === false) {
                        game.playAudio('effect', 'lose');
                    }
                    else {
                        game.playAudio('effect', 'tie');
                    }
                }
                var resultbool = result;
                if (typeof resultbool !== 'boolean') {
                    resultbool = null;
                }
                if (result === true) result = '战斗胜利';
                if (result === false) result = '战斗失败';
                if (result == undefined) result = '战斗结束';
                dialog = ui.create.dialog(result);
                dialog.noforcebutton = true;
                dialog.forcebutton = true;
                if (game.addOverDialog) {
                    game.addOverDialog(dialog, result);
                }
                if (typeof _status.coin == 'number' && !_status.connectMode) {
                    var coeff = Math.random() * 0.4 + 0.8;
                    var added = 0;
                    var betWin = false;
                    if (result == '战斗胜利') {
                        if (_status.betWin) {
                            betWin = true;
                            _status.coin += 10;
                        }
                        _status.coin += 20;
                        if (_status.additionalReward) {
                            _status.coin += _status.additionalReward();
                        }
                        switch (lib.config.mode) {
                            case 'identity': {
                                switch (game.me.identity) {
                                    case 'zhu': case 'zhong': case 'mingzhong':
                                        if (get.config('enhance_zhu')) {
                                            added = 10;
                                        }
                                        else {
                                            added = 20;
                                        }
                                        break;
                                    case 'fan':
                                        if (get.config('enhance_zhu')) {
                                            added = 16;
                                        }
                                        else {
                                            added = 8;
                                        }
                                        break;
                                    case 'nei':
                                        added = 40;
                                        break;
                                }
                                added = added * (game.players.length + game.dead.length) / 8;
                                break;
                            }
                            case 'guozhan':
                                if (game.me.identity == 'ye') {
                                    added = 8;
                                }
                                else {
                                    added = 5 / get.totalPopulation(game.me.identity);
                                }
                                added = added * (game.players.length + game.dead.length);
                                break;
                            case 'versus':
                                if (_status.friend) {
                                    added = 5 * (game.players.length + _status.friend.length);
                                }
                                break;
                            default:
                                added = 10;
                        }
                    }
                    else {
                        added = 10;
                    }
                    if (lib.config.mode == 'chess' && _status.mode == 'combat' && get.config('additional_player')) {
                        added = 2;
                    }
                    _status.coin += added * coeff;
                    if (_status.coinCoeff) {
                        _status.coin *= _status.coinCoeff;
                    }
                    _status.coin = Math.ceil(_status.coin);
                    dialog.add(ui.create.div('', '获得' + _status.coin + '金'));
                    if (betWin) {
                        game.changeCoin(20);
                        dialog.content.appendChild(document.createElement('br'));
                        dialog.add(ui.create.div('', '（下注赢得10金）'));
                    }
                    game.changeCoin(_status.coin);
                }
                if (get.mode() == 'versus' && _status.ladder) {
                    var mmr = _status.ladder_mmr;
                    mmr += 10 - get.rank(game.me.name, true) * 2;
                    if (result == '战斗胜利') {
                        mmr = 20 + Math.round(mmr);
                        if (mmr > 40) {
                            mmr = 40;
                        }
                        else if (mmr < 10) {
                            mmr = 10;
                        }
                        dialog.add(ui.create.div('', '获得 ' + mmr + ' 积分'));
                    }
                    else {
                        mmr = -30 + Math.round(mmr / 2);
                        if (mmr > -20) {
                            mmr = -20;
                        }
                        else if (mmr < -35) {
                            mmr = -35;
                        }
                        if (lib.storage.ladder.current < 900) {
                            mmr = Math.round(mmr / 4);
                        }
                        else if (lib.storage.ladder.current < 1400) {
                            mmr = Math.round(mmr / 2);
                        }
                        else if (lib.storage.ladder.current < 2000) {
                            mmr = Math.round(mmr / 1.5);
                        }
                        else if (lib.storage.ladder.current > 2500) {
                            mmr = Math.round(mmr * 1.5);
                        }
                        dialog.add(ui.create.div('', '失去 ' + (-mmr) + ' 积分'));
                    }
                    if (_status.ladder_tmp) {
                        lib.storage.ladder.current += 40;
                        delete _status.ladder_tmp;
                    }
                    lib.storage.ladder.current += mmr;
                    if (lib.storage.ladder.top < lib.storage.ladder.current) {
                        lib.storage.ladder.top = lib.storage.ladder.current;
                    }
                    game.save('ladder', lib.storage.ladder);
                    if (ui.ladder && game.getLadderName) {
                        ui.ladder.innerHTML = game.getLadderName(lib.storage.ladder.current);
                    }
                }
                // if(true){
                var tableData = [];
                if (game.players.length) {
                    table = document.createElement('table');
                    tr = document.createElement('tr');
                    tr.appendChild(document.createElement('td'));
                    td = document.createElement('td');
                    td.innerHTML = '伤害';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '受伤';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '摸牌';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '出牌';
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = '杀敌';
                    tr.appendChild(td);
                    table.appendChild(tr);
                    for (i = 0; i < game.players.length; i++) {
                        var uploadDataRow = {}
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.players[i]);
                        uploadDataRow.name = game.players[i].name; //名字拼音
                        uploadDataRow.transName = td.innerHTML; //名字
                        uploadDataRow.nickname = game.players[i].nickname;//昵称
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        uploadDataRow.damage = num; //伤害
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        uploadDataRow.damaged = num; //受伤
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        uploadDataRow.gain = num; //摸牌
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            for (k in game.players[i].stat[j].card) {
                                num += game.players[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        uploadDataRow.card = num; //出牌
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.players[i].stat.length; j++) {
                            if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        uploadDataRow.kill = num; //杀敌
                        tr.appendChild(td);
                        table.appendChild(tr);
                        uploadDataRow.identity = get.translation(game.players[i].identity) //身份
                        uploadDataRow.alive = true; //存活
                        if (get.mode() == 'identity') {	//胜利或失败
                            if (game.zhu.isAlive()) {
                                if (game.players[i].identity == 'fan' || game.players[i].identity == 'nei') {
                                    uploadDataRow.winner = false;
                                }
                                else {
                                    uploadDataRow.winner = true;
                                }
                            }
                            else {
                                if (game.players.length == 1) {
                                    if (game.players[i].identity == 'zhong')
                                        uploadDataRow.winner = false;
                                    else
                                        uploadDataRow.winner = true;
                                }
                                else {
                                    if (game.players[i].identity == 'fan') {
                                        uploadDataRow.winner = true;
                                    }
                                    else
                                        uploadDataRow.winner = false;
                                }
                            }
                        }
                        else if (get.mode() == 'guozhan') {
                            uploadDataRow.winner = true;
                        }
                        else {
                            uploadDataRow.winner = true;
                        }
                        tableData.push(uploadDataRow)
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                if (game.dead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    if (game.players.length == 0) {
                        tr = document.createElement('tr');
                        tr.appendChild(document.createElement('td'));
                        td = document.createElement('td');
                        td.innerHTML = '伤害';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '受伤';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '摸牌';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '出牌';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.innerHTML = '杀敌';
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    for (i = 0; i < game.dead.length; i++) {
                        var uploadDataRow = {}
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.dead[i]);
                        uploadDataRow.name = game.dead[i].name;//名字拼音
                        uploadDataRow.transName = td.innerHTML; //名字
                        uploadDataRow.nickname = game.dead[i].nickname;//昵称
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        uploadDataRow.damage = num; //伤害
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        uploadDataRow.damaged = num; //受伤
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        uploadDataRow.gain = num; //摸牌
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            for (k in game.dead[i].stat[j].card) {
                                num += game.dead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        uploadDataRow.card = num; //出牌
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.dead[i].stat.length; j++) {
                            if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        uploadDataRow.kill = num; //杀敌
                        tr.appendChild(td);
                        table.appendChild(tr);
                        uploadDataRow.identity = get.translation(game.dead[i].identity); //身份
                        uploadDataRow.alive = false; //存活
                        if (get.mode() == 'identity') {	//胜利或失败
                            if (game.zhu.isAlive()) {
                                if (game.dead[i].identity == 'fan' || game.dead[i].identity == 'nei') {
                                    uploadDataRow.winner = false;
                                }
                                else {
                                    uploadDataRow.winner = true;
                                }
                            }
                            else {
                                if (game.players.length == 1) {
                                    if (game.players[0].identity == 'nei') {
                                        uploadDataRow.winner = false;
                                    }
                                    else if (game.players[0].identity == 'fan') {
                                        if (game.dead[i].identity == 'fan')
                                            uploadDataRow.winner = true;
                                        else
                                            uploadDataRow.winner = false;
                                    }
                                }
                                else {
                                    if (game.dead[i].identity == 'fan') {
                                        uploadDataRow.winner = true;
                                    }
                                    else
                                        uploadDataRow.winner = false;
                                }
                            }
                        }
                        else if (get.mode() == 'guozhan') {
                            if (game.players[0] && (game.dead[i].identity == game.players[0])) {
                                if (game.dead[i].identity != 'ye') {
                                    uploadDataRow.winner = true;
                                }
                                else {
                                    uploadDataRow.winner = false;
                                }
                            }
                            else
                                uploadDataRow.winner = false;
                        }
                        else {
                            if (game.players[0] && (game.dead[i].identity == game.players[0])) {
                                if (game.dead[i].identity != 'ye') {
                                    uploadDataRow.winner = true;
                                }
                                else {
                                    uploadDataRow.winner = false;
                                }
                            }
                        }
                        tableData.push(uploadDataRow)
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                var nowType = 'other'
                if (get.mode() == 'identity') nowType = 'identity'
                else if (get.mode() == 'guozhan') nowType = 'guozhan'
                var uploadData = { type: nowType, playerRecords: tableData }
                if (game.onlinezhu) {
                    try {
                        var xhr = new XMLHttpRequest();
                        var sendForm = new FormData();
                        sendForm.append('data', JSON.stringify(uploadData))
                        xhr.open('post', 'https://data.vtuberkill.com/game-records/', (e) => { console.log(e) })
                        xhr.send(sendForm);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                if (game.additionaldead && game.additionaldead.length) {
                    table = document.createElement('table');
                    table.style.opacity = '0.5';
                    for (i = 0; i < game.additionaldead.length; i++) {
                        tr = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = get.translation(game.additionaldead[i]);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damage != undefined) num += game.additionaldead[i].stat[j].damage;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].damaged != undefined) num += game.additionaldead[i].stat[j].damaged;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].gain != undefined) num += game.additionaldead[i].stat[j].gain;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            for (k in game.additionaldead[i].stat[j].card) {
                                num += game.additionaldead[i].stat[j].card[k];
                            }
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        td = document.createElement('td');
                        num = 0;
                        for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                            if (game.additionaldead[i].stat[j].kill != undefined) num += game.additionaldead[i].stat[j].kill;
                        }
                        td.innerHTML = num;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    dialog.content.appendChild(table);
                }
                // }
                dialog.add(ui.create.div('.placeholder'));
        
                var clients = game.players.concat(game.dead);
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].isOnline2()) {
                        clients[i].send(game.over, dialog.content.innerHTML, game.checkOnlineResult(clients[i]));
                    }
                }
        
                dialog.add(ui.create.div('.placeholder'));
        
                for (var i = 0; i < game.players.length; i++) {
                    if (!_status.connectMode && game.players[i].isUnderControl(true) && game.layout != 'long2') continue;
                    var hs = game.players[i].getCards('h');
                    if (hs.length) {
                        dialog.add('<div class="text center">' + get.translation(game.players[i]) + '</div>');
                        dialog.addSmall(hs);
                    }
                }
                for (var i = 0; i < game.dead.length; i++) {
                    if (!_status.connectMode && game.dead[i].isUnderControl(true) && game.layout != 'long2') continue;
                    var hs = game.dead[i].getCards('h');
                    if (hs.length) {
                        dialog.add('<div class="text center">' + get.translation(game.dead[i]) + '</div>');
                        dialog.addSmall(hs);
                    }
                }
                dialog.add(ui.create.div('.placeholder.slim'));
                game.addVideo('over', null, dialog.content.innerHTML);
                var vinum = parseInt(lib.config.video);
                if (!_status.video && vinum && game.getVideoName && window.indexedDB && _status.videoInited) {
                    var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                    var videos = lib.videos.slice(0);
                    for (var i = 0; i < videos.length; i++) {
                        if (videos[i].starred) {
                            videos.splice(i--, 1);
                        }
                    }
                    for (var deletei = 0; deletei < 5; deletei++) {
                        if (videos.length >= vinum) {
                            var toremove = videos.pop();
                            lib.videos.remove(toremove);
                            store.delete(toremove.time);
                        }
                        else {
                            break;
                        }
                    }
                    var me = game.me || game.players[0];
                    if (!me) return;
                    var newvid = {
                        name: game.getVideoName(),
                        mode: lib.config.mode,
                        video: lib.video,
                        win: result == '战斗胜利',
                        name1: me.name1 || me.name,
                        name2: me.name2,
                        time: lib.getUTC(new Date())
                    };
                    var modecharacters = lib.characterPack['mode_' + get.mode()];
                    if (modecharacters) {
                        if (get.mode() == 'guozhan') {
                            if (modecharacters[newvid.name1]) {
                                if (newvid.name1.indexOf('gz_shibing') == 0) {
                                    newvid.name1 = newvid.name1.slice(3, 11);
                                }
                                else {
                                    newvid.name1 = newvid.name1.slice(3);
                                }
                            }
                            if (modecharacters[newvid.name2]) {
                                if (newvid.name2.indexOf('gz_shibing') == 0) {
                                    newvid.name2 = newvid.name2.slice(3, 11);
                                }
                                else {
                                    newvid.name2 = newvid.name2.slice(3);
                                }
                            }
                        }
                        else {
                            if (modecharacters[newvid.name1]) {
                                newvid.name1 = get.mode() + '::' + newvid.name1;
                            }
                            if (modecharacters[newvid.name2]) {
                                newvid.name2 = get.mode() + '::' + newvid.name2;
                            }
                        }
                    }
                    if (newvid.name1 && newvid.name1.indexOf('subplayer_') == 0) {
                        newvid.name1 = newvid.name1.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    if (newvid.name2 && newvid.name2.indexOf('subplayer_') == 0) {
                        newvid.name1 = newvid.name2.slice(10, newvid.name1.lastIndexOf('_'));
                    }
                    lib.videos.unshift(newvid);
                    store.put(newvid);
                    ui.create.videoNode(newvid, true);
                }
                // _status.auto=false;
                if (ui.auto) {
                    // ui.auto.classList.remove('glow');
                    ui.auto.hide();
                }
                if (ui.wuxie) ui.wuxie.hide();
                if (ui.giveup) {
                    ui.giveup.remove();
                    delete ui.giveup;
                }
        
                if (lib.config.test_game && !_status.connectMode) {
                    if (typeof lib.config.test_game !== 'string') {
                        switch (lib.config.mode) {
                            case 'identity': game.saveConfig('mode', 'guozhan'); break;
                            case 'guozhan': game.saveConfig('mode', 'versus'); break;
                            case 'versus': game.saveConfig('mode', 'boss'); break;
                            case 'boss': game.saveConfig('mode', 'chess'); break;
                            case 'chess': game.saveConfig('mode', 'stone'); break;
                            case 'stone': game.saveConfig('mode', 'identity'); break;
                        }
                    }
                    setTimeout(game.reload, 500);
                }
                if (game.controlOver) {
                    game.controlOver(); return;
                }
                if (!_status.brawl) {
                    if (lib.config.mode == 'boss') {
                        ui.create.control('再战', function () {
                            var pointer = game.boss;
                            var map = { boss: game.me == game.boss, links: [] };
                            for (var iwhile = 0; iwhile < 10; iwhile++) {
                                pointer = pointer.nextSeat;
                                if (pointer == game.boss) {
                                    break;
                                }
                                if (!pointer.side) {
                                    map.links.push(pointer.name);
                                }
                            }
                            game.saveConfig('continue_name_boss', map);
                            game.saveConfig('mode', lib.config.mode);
                            localStorage.setItem(lib.configprefix + 'directstart', true);
                            game.reload();
                        });
                    }
                    else if (lib.config.mode == 'versus') {
                        if (_status.mode == 'standard' || _status.mode == 'three') {
                            ui.create.control('再战', function () {
                                game.saveConfig('continue_name_versus' + (_status.mode == 'three' ? '_three' : ''), {
                                    friend: _status.friendBackup,
                                    enemy: _status.enemyBackup,
                                    color: _status.color
                                });
                                game.saveConfig('mode', lib.config.mode);
                                localStorage.setItem(lib.configprefix + 'directstart', true);
                                game.reload();
                            });
                        }
                    }
                    else if (!_status.connectMode && get.config('continue_game') && !ui.continue_game && !_status.brawl && !game.no_continue_game) {
                        ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                    }
                }
                if (!ui.restart) {
                    if (game.onlineroom && typeof game.roomId == 'number') {
                        ui.restart = ui.create.control('restart', function () {
                            game.broadcastAll(function () {
                                if (ui.exit) {
                                    ui.exit.stay = true;
                                    ui.exit.firstChild.innerHTML = '返回房间';
                                }
                            });
                            game.saveConfig('tmp_owner_roomId', game.roomId);
                            setTimeout(game.reload, 100);
                        });
                    }
                    else {
                        ui.restart = ui.create.control('restart', game.reload);
                    }
                }
                if (ui.tempnowuxie) {
                    ui.tempnowuxie.close();
                    delete ui.tempnowuxie;
                }
        
                if (ui.revive) {
                    ui.revive.close();
                    delete ui.revive;
                }
                if (ui.swap) {
                    ui.swap.close();
                    delete ui.swap;
                }
                for (var i = 0; i < lib.onover.length; i++) {
                    lib.onover[i](resultbool);
                }
                if (game.addRecord) {
                    game.addRecord(resultbool);
                }
                if (window.isNonameServer) {
                    lib.configOL.gameStarted = false;
                    game.saveConfig('pagecfg' + window.isNonameServer, [lib.configOL, game.roomId, _status.onlinenickname, _status.onlineavatar]);
                    game.reload();
                }
                else if (_status.connectMode && !game.online) {
                    setTimeout(game.reload, 15000)
                }
            },
            /**
             * 游戏事件循环
             * @function
             */
            loop: function () {
                var Evt = _status.event;
                var step = Evt.step;
                var source = Evt.source;
                var player = Evt.player;
                var target = Evt.target;
                var targets = Evt.targets;
                var card = Evt.card;
                var cards = Evt.cards;
                var skill = Evt.skill;
                var forced = Evt.forced;
                var num = Evt.num;
                var trigger = Evt._trigger;
                var result = Evt._result;
                if (_status.paused2 || _status.imchoosing) {
                    if (!lib.status.dateDelaying) {
                        lib.status.dateDelaying = new Date();
                    }
                }
                if (_status.paused || _status.paused2 || _status.over) {
                    return;
                }
                if (_status.paused3) {
                    _status.paused3 = 'paused';
                    return;
                }
                if (lib.status.dateDelaying) {
                    lib.status.dateDelayed += lib.getUTC(new Date()) - lib.getUTC(lib.status.dateDelaying);
                    delete lib.status.dateDelaying;
                }
                if (Evt.next.length > 0) {
                    var next = Evt.next.shift();
                    if (next.player && next.player.skipList.contains(next.name)) {
                        Evt.trigger(next.name + 'Skipped');
                        next.player.skipList.remove(next.name);
                        if (lib.phaseName.contains(next.name)) next.player.getHistory('skipped').add(next.name);
                    }
                    else {
                        /**
                         * _status.event.parent(即Evt.parent)：当前正在执行事件的父事件
                         * 当_status.event.next或_status.event.after内的事件被执行时，当前事件会成为被执行事件的父事件
                         * @name _status.event_parent
                         * @type {!Object}
                         */
                        next.parent = Evt;
                        /**
                         * _status.event.player(即Evt.player)：当前正在执行事件的角色
                         * @name _status.event_player
                         * @type {!HTMLDivElement}
                         */
                        /**
                         * _status.event.target(即Evt.target)：当前正在执行事件的目标
                         * @name _status.event_target
                         * @type {!HTMLDivElement}
                         */
                        _status.event = next;
                    }
                }
                else if (Evt.finished) {
                    if (Evt._triggered == 1) {
                        if (Evt.type == 'card') Evt.trigger('useCardToOmitted');
                        Evt.trigger(Evt.name + 'Omitted');
                        Evt._triggered = 4;
                    }
                    else if (Evt._triggered == 2) {
                        if (Evt.type == 'card') Evt.trigger('useCardToEnd');
                        Evt.trigger(Evt.name + 'End');
                        Evt._triggered = 3;
                    }
                    else if (Evt._triggered == 3) {
                        if (Evt.type == 'card') Evt.trigger('useCardToAfter');
                        Evt.trigger(Evt.name + 'After');
                        Evt._triggered++;
                    }
                    else if (Evt.after && Evt.after.length) {
                        var next = Evt.after.shift();
                        if (next.player && next.player.skipList.contains(next.name)) {
                            Evt.trigger(next.name + 'Skipped');
                            next.player.skipList.remove(next.name);
                            if (lib.phaseName.contains(next.name)) next.player.getHistory('skipped').add(next.name)
                        }
                        else {
                            next.parent = Evt;
                            _status.event = next;
                        }
                    }
                    else {
                        if (Evt.parent) {
                            if (Evt.result) {
                                Evt.parent._result = Evt.result;
                            }
                            _status.event = Evt.parent;
                        }
                        else {
                            return;
                        }
                    }
                }
                else {
                    if (Evt._triggered == 0) {
                        if (Evt.type == 'card') Evt.trigger('useCardToBefore');
                        Evt.trigger(Evt.name + 'Before');
                        Evt._triggered++;
                    }
                    else if (Evt._triggered == 1) {
                        if (Evt.type == 'card') Evt.trigger('useCardToBegin');
                        if (Evt.name == 'phase' && !Evt._begun) {
                            var next = game.createEvent('phasing', false, Evt);
                            next.player = Evt.player;
                            next.skill = Evt.skill;
                            next.setContent('phasing');
                            Evt._begun = true;
                        }
                        else {
                            Evt.trigger(Evt.name + 'Begin');
                            Evt._triggered++;
                        }
                    }
                    else {
                        if (player && player.classList.contains('dead') && !Evt.forceDie && Evt.name != 'phaseLoop') {
                            game.broadcastAll(function () {
                                while (_status.dieClose.length) {
                                    _status.dieClose.shift().close();
                                }
                            });
                            if (Evt._oncancel) {
                                Evt._oncancel();
                            }
                            Evt.finish();
                        }
                        else if (player && player.removed && Evt.name != 'phaseLoop') {
                            Evt.finish();
                        }
                        else if (player && player.isOut() && Evt.name != 'phaseLoop' && !Evt.includeOut) {
                            if (Evt.name == 'phase' && player == _status.roundStart && !Evt.skill) {
                                _status.roundSkipped = true;
                            }
                            Evt.finish();
                        }
                        else {
                            if (_status.withError || lib.config.compatiblemode || (_status.connectMode && !lib.config.debug)) {
                                try {
                                    Evt.content(Evt, step, source, player, target, targets,
                                        card, cards, skill, forced, num, trigger, result,
                                        _status, lib, game, ui, get, ai);
                                }
                                catch (e) {
                                    game.print('游戏出错：' + Evt.name);
                                    game.print(e.toString());
                                    console.log(e);
                                }
                            }
                            else {
                                Evt.content(Evt, step, source, player, target, targets,
                                    card, cards, skill, forced, num, trigger, result,
                                    _status, lib, game, ui, get, ai);
                            }
                        }
                        Evt.step++;
                    }
                }
                game.loop();
            },
            pause: function () {
                clearTimeout(_status.timeout);
                _status.paused = true;
            },
            pause2: function () {
                if (_status.connectMode) return;
                _status.paused2 = true;
            },
            resume: function () {
                if (_status.paused) {
                    if (!_status.noclearcountdown) {
                        game.stopCountChoose();
                    }
                    _status.paused = false;
                    delete _status.waitingForTransition;
                    game.loop();
                }
            },
            resume2: function () {
                if (_status.connectMode) return;
                if (_status.paused2) {
                    _status.paused2 = false;
                    game.loop();
                }
            },
            delay: function (time, time2) {
                if (_status.paused) return;
                game.pause();
                if (typeof time != 'number') time = 1;
                if (typeof time2 != 'number') time2 = 0;
                time = time * lib.config.duration + time2;
                if (lib.config.speed == 'vvfast') time /= 3;
                _status.timeout = setTimeout(game.resume, time);
            },
            delayx: function (time, time2) {
                if (typeof time != 'number') time = 1;
                switch (lib.config.game_speed) {
                    case 'vslow': time *= 2.5; break;
                    case 'slow': time *= 1.5; break;
                    case 'fast': time *= 0.7; break;
                    case 'vfast': time *= 0.4; break;
                    case 'vvfast': time *= 0.2; break;
                }
                return game.delay(time, time2);
            },
            /**
             * 检测玩家是否选择完毕(选择按钮`Evt.filterButton`，选择卡牌`Evt.filterCard`，选择对象`Evt.filterTarget`)
             * @param {?GameCores.Bases.Event} Evt 要处理的事件，如果为null，使用当前事件
             * @returns {(undefined|boolean)} 如果事件不需要等待玩家选择，返回undefined；如果事件选择完毕，返回true；否则返回false
             */
            check: function (Evt) {
                var i, j, range;
                if (Evt == undefined) Evt = _status.event;
                var custom = Evt.custom || {};
                var ok = true, auto = true;
                var player = Evt.player;
                var auto_confirm = lib.config.auto_confirm;
                var players = game.players.slice(0);
                if (Evt.deadTarget) players.addArray(game.dead);
                if (!Evt.filterButton && !Evt.filterCard && !Evt.filterTarget && (!Evt.skill || !Evt._backup)) {
                    if (Evt.choosing) {
                        _status.imchoosing = true;//??
                    }
                    return;
                }
                player.node.equips.classList.remove('popequip');
                //button
                if (Evt.filterButton) {
                    var dialog = Evt.dialog;
                    range = get.select(Evt.selectButton);
                    var selectableButtons = false;
                    if (Evt.forceAuto && ui.selected.buttons.length == range[1]) auto = true;
                    else if (range[0] != range[1] || range[0] > 1) auto = false;
                    for (i = 0; i < dialog.buttons.length; i++) {
                        if (dialog.buttons[i].classList.contains('unselectable')) continue;
                        if (Evt.filterButton(dialog.buttons[i], player) && lib.filter.buttonIncluded(dialog.buttons[i])) {
                            if (ui.selected.buttons.length < range[1]) {
                                dialog.buttons[i].classList.add('selectable');
                            }
                            else if (range[1] == -1) {
                                dialog.buttons[i].classList.add('selected');
                                ui.selected.buttons.add(dialog.buttons[i]);
                            }
                            else {
                                dialog.buttons[i].classList.remove('selectable');
                            }
                        }
                        else {
                            dialog.buttons[i].classList.remove('selectable');
                            if (range[1] == -1) {
                                dialog.buttons[i].classList.remove('selected');
                                ui.selected.buttons.remove(dialog.buttons[i]);
                            }
                        }
                        if (dialog.buttons[i].classList.contains('selected')) {
                            dialog.buttons[i].classList.add('selectable');
                        }
                        else if (!selectableButtons && dialog.buttons[i].classList.contains('selectable')) {
                            selectableButtons = true;
                        }
                    }
                    if (ui.selected.buttons.length < range[0]) {
                        if (!Evt.forced || selectableButtons) {
                            ok = false;
                        }
                        if (Evt.complexSelect || Evt.getParent().name == 'chooseCharacter' || Evt.getParent().name == 'chooseButtonOL') {
                            ok = false;
                        }
                    }
                    if (custom.add.button) {
                        custom.add.button();
                    }
                }
                //card
                if (Evt.filterCard) {
                    if (ok == false) {
                        game.uncheck('card');
                    }
                    else {
                        var cards = player.getCards(Evt.position);
                        var firstCheck = false;
                        range = get.select(Evt.selectCard);
                        if (!Evt._cardChoice && typeof Evt.selectCard != 'function' &&
                            !Evt.complexCard && range[1] != -1 && !lib.config.compatiblemode) {
                            Evt._cardChoice = [];
                            firstCheck = true;
                        }
                        if (Evt.isMine() && Evt.name == 'chooseToUse' && Evt.parent.name == 'phaseUse' && !Evt.skill &&
                            !Evt._targetChoice && !firstCheck && window.Map && !lib.config.compatiblemode) {
                            Evt._targetChoice = new Map();
                            for (var i = 0; i < Evt._cardChoice.length; i++) {
                                if (!lib.card[Evt._cardChoice[i].name].complexTarget) {
                                    var targets = [];
                                    for (var j = 0; j < players.length; j++) {
                                        if (Evt.filterTarget(Evt._cardChoice[i], player, players[j])) {
                                            targets.push(players[j]);
                                        }
                                    }
                                    Evt._targetChoice.set(Evt._cardChoice[i], targets);
                                }
                            }
                        }
                        var selectableCards = false;
                        if (range[0] != range[1] || range[0] > 1) auto = false;
                        for (i = 0; i < cards.length; i++) {
                            if (lib.config.cardtempname != 'off') {
                                var cardname = get.name(cards[i]);
                                var cardnature = get.nature(cards[i]);
                                if (cards[i].name != cardname || ((cardnature || cards[i].nature) && cards[i].nature != cardnature)) {
                                    if (!cards[i]._tempName) cards[i]._tempName = ui.create.div('.tempname', cards[i]);
                                    var tempname = get.translation(cardname);
                                    cards[i]._tempName.dataset.nature = 'fire';
                                    if (cardname == 'sha') {
                                        if (cardnature) tempname = get.translation(cardnature) + tempname;
                                        if (cardnature == 'thunder') cards[i]._tempName.dataset.nature = 'thunder';
                                        if (cardnature == 'kami') cards[i]._tempName.dataset.nature = 'kami';
                                        if (cardnature == 'ice') cards[i]._tempName.dataset.nature = 'ice';
                                        if (cardnature == 'ocean') cards[i]._tempName.dataset.nature = 'ocean';
                                        if (cardnature == 'yami') cards[i]._tempName.dataset.nature = 'yami';
                                    }
                                    cards[i]._tempName.innerHTML = lib.config.cardtempname == 'default' ? get.verticalStr(tempname) : tempname;
                                    cards[i]._tempName.tempname = tempname;
                                }
                            }
                            var nochess = true;
                            if (!lib.filter.cardAiIncluded(cards[i])) {
                                nochess = false;
                            }
                            else if (Evt._cardChoice && !firstCheck) {
                                if (!Evt._cardChoice.contains(cards[i])) {
                                    nochess = false;
                                }
                            }
                            else {
                                if (player.isOut() || !lib.filter.cardRespondable(cards[i], player) ||
                                    cards[i].classList.contains('uncheck') ||
                                    !Evt.filterCard(cards[i], player)) {
                                    nochess = false;
                                }
                            }
                            if (nochess) {
                                if (ui.selected.cards.length < range[1]) {
                                    cards[i].classList.add('selectable');
                                    if (Evt._cardChoice && firstCheck) {
                                        Evt._cardChoice.push(cards[i]);
                                    }
                                }
                                else if (range[1] == -1) {
                                    cards[i].classList.add('selected');
                                    cards[i].updateTransform(true);
                                    ui.selected.cards.add(cards[i]);
                                }
                                else {
                                    cards[i].classList.remove('selectable');
                                }
                            }
                            else {
                                cards[i].classList.remove('selectable');
                                if (range[1] == -1) {
                                    cards[i].classList.remove('selected');
                                    cards[i].updateTransform();
                                    ui.selected.cards.remove(cards[i]);
                                }
                            }
                            if (cards[i].classList.contains('selected')) {
                                cards[i].classList.add('selectable');
                            }
                            else if (!selectableCards && cards[i].classList.contains('selectable')) {
                                selectableCards = true;
                            }
                        }
                        if (ui.selected.cards.length < range[0]) {
                            if (!Evt.forced || selectableCards || Evt.complexSelect) {
                                ok = false;
                            }
                        }
        
                        if (lib.config.popequip && get.is.phoneLayout() &&
                            typeof Evt.position == 'string' && Evt.position.indexOf('e') != -1 &&
                            player.node.equips.querySelector('.card.selectable')) {
                            player.node.equips.classList.add('popequip');
                            auto_confirm = false;
                        }
                    }
                    if (custom.add.card) {
                        custom.add.card();
                    }
                }
                //player
                if (Evt.filterTarget) {
                    if (ok == false) {
                        game.uncheck('target');
                    }
                    else {
                        var card = get.card();
                        var firstCheck = false;
                        range = get.select(Evt.selectTarget);
                        var selectableTargets = false;
                        if (range[0] != range[1] || range[0] > 1) auto = false;
                        for (i = 0; i < players.length; i++) {
                            var nochess = true;
                            if (game.chess && !Evt.chessForceAll && player && get.distance(player, players[i], 'pure') > 7) {
                                nochess = false;
                            }
                            else if (players[i].isOut()) {
                                nochess = false;
                            }
                            else if (Evt._targetChoice && Evt._targetChoice.has(card)) {
                                var targetChoice = Evt._targetChoice.get(card);
                                if (!Array.isArray(targetChoice) || !targetChoice.contains(players[i])) {
                                    nochess = false;
                                }
                            }
                            else if (!Evt.filterTarget(card, player, players[i])) {
                                nochess = false;
                            }
                            if (nochess) {
                                if (ui.selected.targets.length < range[1]) {
                                    players[i].classList.add('selectable');
                                    if (Array.isArray(Evt._targetChoice)) {
                                        Evt._targetChoice.push(players[i]);
                                    }
                                }
                                else if (range[1] == -1) {
                                    players[i].classList.add('selected');
                                    ui.selected.targets.add(players[i]);
                                }
                                else {
                                    players[i].classList.remove('selectable');
                                }
                            }
                            else {
                                players[i].classList.remove('selectable');
                                if (range[1] == -1) {
                                    players[i].classList.remove('selected');
                                    ui.selected.targets.remove(players[i]);
                                }
                            }
                            if (players[i].classList.contains('selected')) {
                                players[i].classList.add('selectable');
                            }
                            else if (!selectableTargets && players[i].classList.contains('selectable')) {
                                selectableTargets = true;
                            }
                            if (players[i].instance) {
                                if (players[i].classList.contains('selected')) {
                                    players[i].instance.classList.add('selected');
                                }
                                else {
                                    players[i].instance.classList.remove('selected');
                                }
                                if (players[i].classList.contains('selectable')) {
                                    players[i].instance.classList.add('selectable');
                                }
                                else {
                                    players[i].instance.classList.remove('selectable');
                                }
                            }
                        }
                        if (ui.selected.targets.length < range[0]) {
                            if (!Evt.forced || selectableTargets || Evt.complexSelect) {
                                ok = false;
                            }
                        }
                        if (range[1] == -1 && ui.selected.targets.length == 0 && Evt.targetRequired) {
                            ok = false;
                        }
                    }
                    if (custom.add.target) {
                        custom.add.target();
                    }
                }
                //skill
                if (!Evt.skill && get.noSelected() && !_status.noconfirm) {
                    var skills = [], enable, info;
                    var skills2;
                    if (Evt._skillChoice) {
                        skills2 = Evt._skillChoice;
                        for (var i = 0; i < skills2.length; i++) {
                            if (Evt.isMine() || !Evt._aiexclude.contains(skills2[i])) {
                                skills.push(skills2[i]);
                            }
                        }
                    }
                    else {
                        var skills2;
                        if (get.mode() == 'guozhan' && player.hasSkillTag('nomingzhi', false, null, true)) {
                            skills2 = player.getSkills(false, true, false);
                        }
                        else {
                            skills2 = player.getSkills(true, true, false);
                        }
                        skills2 = game.filterSkills(skills2.concat(lib.skill.global), player, player.getSkills('e').concat(lib.skill.global));
                        Evt._skillChoice = [];
                        game.expandSkills(skills2);
                        for (i = 0; i < skills2.length; i++) {
                            _status.event.skillBy = skills2[i];
                            info = get.info(skills2[i]);
                            enable = false;
                            if (typeof info.enable == 'function') enable = info.enable(Evt);
                            else if (typeof info.enable == 'object') enable = info.enable.contains(Evt.name);
                            else if (info.enable == 'phaseUse') enable = (Evt.type == 'phase');
                            else if (typeof info.enable == 'string') enable = (info.enable == Evt.name);
                            if (enable) {
                                if (!game.expandSkills(player.getSkills().concat(lib.skill.global)).contains(skills2[i]) && (info.noHidden || get.mode() != 'guozhan' || player.hasSkillTag('nomingzhi', false, null, true))) enable = false;
                                if (info.filter && !info.filter(Evt, player)) enable = false;
                                if (info.viewAs && typeof info.viewAs != 'function' && Evt.filterCard && !Evt.filterCard(info.viewAs, player, Evt)) enable = false;
                                if (info.viewAs && typeof info.viewAs != 'function' && info.viewAsFilter && info.viewAsFilter(player) == false) enable = false;
                                if (info.usable && get.skillCount(skills2[i]) >= info.usable) enable = false;
                                if (info.chooseButton && _status.event.noButton) enable = false;
                                if (info.round && player.storage[_status.event.skillBy + '_roundcount'] > 0) enable = false;
                            }
                            if (enable) {
                                if (Evt.isMine() || !Evt._aiexclude.contains(skills2[i])) {
                                    skills.add(skills2[i]);
                                }
                                Evt._skillChoice.add(skills2[i]);
                            }
                            delete _status.event.skillBy;
                        }
                    }
        
                    var globalskills = [];
                    var globallist = lib.skill.global.slice(0);
                    game.expandSkills(globallist);
                    for (var i = 0; i < skills.length; i++) {
                        if (globallist.contains(skills[i])) {
                            globalskills.push(skills.splice(i--, 1)[0]);
                        }
                    }
                    var equipskills = [];
                    var ownedskills = player.getSkills(true, false);
                    game.expandSkills(ownedskills);
                    for (var i = 0; i < skills.length; i++) {
                        if (!ownedskills.contains(skills[i])) {
                            equipskills.push(skills.splice(i--, 1)[0]);
                        }
                    }
                    if (equipskills.length) {
                        ui.create.skills3(equipskills);
                    }
                    else if (ui.skills3) {
                        ui.skills3.close();
                    }
                    if (skills.length) {
                        ui.create.skills(skills);
                    }
                    else if (ui.skills) {
                        ui.skills.close();
                    }
                    if (globalskills.length) {
                        ui.create.skills2(globalskills);
                    }
                    else if (ui.skills2) {
                        ui.skills2.close();
                    }
                }
                else {
                    if (ui.skills) {
                        ui.skills.close()
                    }
                    if (ui.skills2) {
                        ui.skills2.close()
                    }
                    if (ui.skills3) {
                        ui.skills3.close()
                    }
                }
                //is multipled targets
                _status.multitarget = false;
                var skillinfo = get.info(_status.event.skill);
                if (_status.event.name == 'chooseToUse') {
                    if (skillinfo && skillinfo.multitarget && !skillinfo.multiline) {
                        _status.multitarget = true;
                    }
                    if ((skillinfo && skillinfo.viewAs && typeof skillinfo.viewAs != 'function') || !_status.event.skill) {
                        var cardinfo = get.info(get.card());
                        if (cardinfo && cardinfo.multitarget && !cardinfo.multiline) {
                            _status.multitarget = true;
                        }
                    }
                }
                else if (_status.event.multitarget) {
                    _status.multitarget = true;
                }
        
                if (Evt.isMine()) {
                    if (game.chess && game.me && get.config('show_distance')) {
                        for (var i = 0; i < players.length; i++) {
                            if (players[i] == game.me) {
                                players[i].node.action.hide();
                            }
                            else {
                                players[i].node.action.show();
                                var dist = get.distance(game.me, players[i], 'pure');
                                var dist2 = get.distance(game.me, players[i]);
                                players[i].node.action.innerHTML = '距离：' + dist2 + '/' + dist;
                                if (dist > 7) {
                                    players[i].node.action.classList.add('thunder');
                                }
                                else {
                                    players[i].node.action.classList.remove('thunder');
                                }
                            }
                        }
                    }
                    if (ok && auto && (auto_confirm || (skillinfo && skillinfo.direct)) && (!_status.mousedragging || !_status.mouseleft) &&
                        !_status.mousedown && !_status.touchnocheck) {
                        if (ui.confirm) {
                            if (!skillinfo || !skillinfo.preservecancel) {
                                ui.confirm.close();
                            }
                        }
                        if (skillinfo && skillinfo.preservecancel && !ui.confirm) {
                            ui.create.confirm('c');
                        }
                        if (Evt.skillDialog == true) Evt.skillDialog = false;
                        ui.click.ok();
                        _status.mousedragging = null;
                    }
                    else {
                        ui.arena.classList.add('selecting');
                        if (Evt.filterTarget && (!Evt.filterCard || !Evt.position || (typeof Evt.position == 'string' && Evt.position.indexOf('e') == -1))) {
                            ui.arena.classList.add('tempnoe');
                        }
                        game.countChoose();
                        if (!_status.noconfirm && !_status.event.noconfirm) {
                            if (!_status.mousedown || _status.mouseleft) {
                                var str = '';
                                if (ok) str += 'o';
                                if (!Evt.forced && !Evt.fakeforce && get.noSelected()) str += 'c';
                                ui.create.confirm(str);
                            }
                        }
                    }
                    if (ui.confirm && ui.confirm.lastChild.link == 'cancel') {
                        if (_status.event.type == 'phase' && !_status.event.skill) {
                            ui.confirm.lastChild.innerHTML = '结束';
                        }
                        else {
                            ui.confirm.lastChild.innerHTML = '取消';
                        }
                    }
                }
                return ok;
            },
            uncheck: function () {
                var i, j;
                if (game.chess) {
                    var shadows = ui.chessContainer.getElementsByClassName('playergrid temp');
                    while (shadows.length) {
                        shadows[0].remove();
                    }
                }
                var argc = arguments.length;
                var args = new Array(argc);
                for (var i = 0; i < argc; i++) {
                    args[i] = arguments[i];
                }
                if ((args.length == 0 || args.contains('card')) && _status.event.player) {
                    var cards = _status.event.player.getCards('hejs');
                    for (j = 0; j < cards.length; j++) {
                        cards[j].classList.remove('selected');
                        cards[j].classList.remove('selectable');
                        if (cards[j]._tempName) {
                            cards[j]._tempName.delete();
                            delete cards[j]._tempName;
                        }
                        cards[j].updateTransform();
                    }
                    ui.selected.cards.length = 0;
                    _status.event.player.node.equips.classList.remove('popequip');
                }
                var players = game.players.slice(0);
                if (_status.event.deadTarget) players.addArray(game.dead);
                if ((args.length == 0 || args.contains('target'))) {
                    for (j = 0; j < players.length; j++) {
                        players[j].classList.remove('selected');
                        players[j].classList.remove('selectable');
                        if (players[j].instance) {
                            players[j].instance.classList.remove('selected');
                            players[j].instance.classList.remove('selectable');
                        }
                    }
                    ui.selected.targets.length = 0;
                }
                if ((args.length == 0 || args.contains('button')) && _status.event.dialog && _status.event.dialog.buttons) {
                    for (var j = 0; j < _status.event.dialog.buttons.length; j++) {
                        _status.event.dialog.buttons[j].classList.remove('selectable');
                        _status.event.dialog.buttons[j].classList.remove('selected');
                    }
                    ui.selected.buttons.length = 0;
                }
                if (args.length == 0) {
                    ui.arena.classList.remove('selecting');
                    ui.arena.classList.remove('tempnoe');
                    _status.imchoosing = false;
                    _status.lastdragchange.length = 0;
                    _status.mousedragging = null;
                    _status.mousedragorigin = null;
        
                    while (ui.touchlines.length) {
                        ui.touchlines.shift().delete();
                    }
                }
                ui.canvas.width = ui.arena.offsetWidth;
                ui.canvas.height = ui.arena.offsetHeight;
                for (var i = 0; i < players.length; i++) {
                    players[i].unprompt();
                }
                for (var i = 0; i < _status.dragline.length; i++) {
                    if (_status.dragline[i]) _status.dragline[i].remove();
                }
                ui.arena.classList.remove('dragging');
                _status.dragline.length = 0;
            },
            swapSeat: function (player1, player2, prompt, behind, noanimate) {
                if (noanimate) {
                    player1.style.transition = 'all 0s';
                    player2.style.transition = 'all 0s';
                    ui.refresh(player1);
                    ui.refresh(player2);
                }
                if (behind) {
                    var totalPopulation = game.players.length + game.dead.length + 1;
                    for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                        if (player1.next != player2) {
                            game.swapSeat(player1, player1.next, false, false);
                        }
                        else {
                            break;
                        }
                    }
                    if (prompt != false) {
                        game.log(player1, '将座位移至', player2, '后');
                    }
                }
                else {
                    game.addVideo('swapSeat', null, [player1.dataset.position, player2.dataset.position]);
                    var temp1, pos, i, num;
                    temp1 = player1.dataset.position;
                    player1.dataset.position = player2.dataset.position;
                    player2.dataset.position = temp1;
                    game.arrangePlayers();
                    if (!game.chess) {
                        if (player1.dataset.position == '0' || player2.dataset.position == '0') {
                            pos = parseInt(player1.dataset.position);
                            if (pos == 0) pos = parseInt(player2.dataset.position);
                            num = game.players.length + game.dead.length;
                            for (i = 0; i < game.players.length; i++) {
                                temp1 = parseInt(game.players[i].dataset.position) - pos;
                                if (temp1 < 0) temp1 += num;
                                game.players[i].dataset.position = temp1;
                            }
                            for (i = 0; i < game.dead.length; i++) {
                                temp1 = parseInt(game.dead[i].dataset.position) - pos;
                                if (temp1 < 0) temp1 += num;
                                game.dead[i].dataset.position = temp1;
                            }
                        }
                    }
                    if (prompt != false) {
                        game.log(player1, '和', player2, '交换了座位');
                    }
                }
                if (noanimate) {
                    setTimeout(function () {
                        player1.style.transition = '';
                        player2.style.transition = '';
                    }, 200);
                }
            },
            swapPlayer: function (player, player2) {
                if (player2) {
                    if (player == game.me) game.swapPlayer(player2);
                    else if (player2 == game.me) game.swapPlayer(player);
                }
                else {
                    if (player == game.me) return;
                    var players = game.players.concat(game.dead);
                    for (var i = 0; i < players.length; i++) {
                        players[i].style.transition = 'all 0s';
                    }
                    game.addVideo('swapPlayer', player, get.cardsInfo(player.getCards('h')));
                    if (!game.chess) {
                        var pos = parseInt(player.dataset.position);
                        var num = game.players.length + game.dead.length;
                        var players = game.players.concat(game.dead);
                        var temp;
                        for (var i = 0; i < players.length; i++) {
                            temp = parseInt(players[i].dataset.position) - pos;
                            if (temp < 0) temp += num;
                            players[i].dataset.position = temp;
                        }
                    }
                    game.me.node.handcards1.remove();
                    game.me.node.handcards2.remove();
                    var current = game.me;
                    game.me = player;
                    if (current.isDead()) {
                        current.$die();
                    }
                    ui.handcards1 = player.node.handcards1.animate('start').fix();
                    ui.handcards2 = player.node.handcards2.animate('start').fix();
                    ui.handcards1Container.appendChild(ui.handcards1);
                    ui.handcards2Container.appendChild(ui.handcards2);
        
                    ui.updatehl();
                }
                if (game.me.isAlive()) {
                    if (ui.auto) ui.auto.show();
                    if (ui.wuxie) ui.wuxie.show();
                    if (ui.revive) {
                        ui.revive.close();
                        delete ui.revive;
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
                if (lib.config.mode == 'identity') {
                    game.me.setIdentity(game.me.identity);
                }
                setTimeout(function () {
                    for (var i = 0; i < players.length; i++) {
                        players[i].style.transition = '';
                    }
                }, 100);
            },
            swapControl: function (player) {
                if (player == game.me) return;
        
                game.me.node.handcards1.remove();
                game.me.node.handcards2.remove();
        
                game.me = player;
                ui.handcards1 = player.node.handcards1.animate('start').fix();
                ui.handcards2 = player.node.handcards2.animate('start').fix();
                ui.handcards1Container.insertBefore(ui.handcards1, ui.handcards1Container.firstChild);
                ui.handcards2Container.insertBefore(ui.handcards2, ui.handcards2Container.firstChild);
                ui.updatehl();
                game.addVideo('swapControl', player, get.cardsInfo(player.getCards('h')));
        
                if (game.me.isAlive()) {
                    if (ui.auto) ui.auto.show();
                    if (ui.wuxie) ui.wuxie.show();
                    if (ui.revive) {
                        ui.revive.close();
                        delete ui.revive;
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
            },
            swapPlayerAuto: function (player) {
                if (game.modeSwapPlayer) {
                    game.modeSwapPlayer(player);
                }
                else {
                    game.swapPlayer(player);
                }
            },
            findNext: function (player) {
                var players = get.players(lib.sort.position);
                var position = parseInt(player.dataset.position);
                for (var i = 0; i < players.length; i++) {
                    if (parseInt(players[i].dataset.position) >= position) {
                        return players[i];
                    }
                }
                return players[0];
            },
            loadModeAsync: function (name, callback) {
                window.game = game;
                var script = lib.init.js(dist(), 'mode', function () {
                    if (!lib.config.dev) delete window.game;
                    script.remove();
                    var content = lib.imported.mode[name];
                    delete lib.imported.mode[name];
                    if (get.is.empty(lib.imported.mode)) {
                        delete lib.imported.mode;
                    }
                    callback(content);
                });
            },
            switchMode: function (name, configx) {
                if (!lib.layoutfixed.contains(name)) {
                    if (lib.config.layout != game.layout) {
                        lib.init.layout(lib.config.layout);
                    }
                    else if (lib.config.mode == 'brawl') {
                        if (lib.config.player_border == 'normal' && (game.layout == 'long' || game.layout == 'long2')) {
                            ui.arena.classList.add('lslim_player');
                        }
                    }
                }
                window.game = game;
                var script = lib.init.js(dist(), 'mode', function () {
                    if (!lib.config.dev) delete window.game;
                    script.remove();
                    var mode = lib.imported.mode;
                    _status.sourcemode = lib.config.mode;
                    lib.config.mode = name;
        
                    var i, j;
                    for (i in mode[lib.config.mode].element) {
                        if (!lib.element[i]) lib.element[i] = [];
                        for (j in mode[lib.config.mode].element[i]) {
                            if (j == 'init') {
                                if (!lib.element[i].inits) lib.element[i].inits = [];
                                lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
                            }
                            else {
                                lib.element[i][j] = mode[lib.config.mode].element[i][j];
                            }
                        }
                    }
                    for (i in mode[lib.config.mode].ai) {
                        if (typeof mode[lib.config.mode].ai[i] == 'object') {
                            if (ai[i] == undefined) ai[i] = {};
                            for (j in mode[lib.config.mode].ai[i]) {
                                ai[i][j] = mode[lib.config.mode].ai[i][j];
                            }
                        }
                        else {
                            ai[i] = mode[lib.config.mode].ai[i];
                        }
                    }
                    for (i in mode[lib.config.mode].ui) {
                        if (typeof mode[lib.config.mode].ui[i] == 'object') {
                            if (ui[i] == undefined) ui[i] = {};
                            for (j in mode[lib.config.mode].ui[i]) {
                                ui[i][j] = mode[lib.config.mode].ui[i][j];
                            }
                        }
                        else {
                            ui[i] = mode[lib.config.mode].ui[i];
                        }
                    }
                    for (i in mode[lib.config.mode].game) {
                        game[i] = mode[lib.config.mode].game[i];
                    }
                    for (i in mode[lib.config.mode].get) {
                        get[i] = mode[lib.config.mode].get[i];
                    }
                    if (game.onwash) {
                        lib.onwash.push(game.onwash);
                        delete game.onwash;
                    }
                    if (game.onover) {
                        lib.onover.push(game.onover);
                        delete game.onover;
                    }
                    lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
                    lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];
        
                    for (i in mode[lib.config.mode]) {
                        if (i == 'element') continue;
                        if (i == 'game') continue;
                        if (i == 'ai') continue;
                        if (i == 'ui') continue;
                        if (i == 'get') continue;
                        if (i == 'config') continue;
                        if (i == 'start') continue;
                        if (i == 'startBefore') continue;
                        if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][i])) ? [] : {};
                        for (j in mode[lib.config.mode][i]) {
                            lib[i][j] = mode[lib.config.mode][i][j];
                        }
                    }
        
                    // var pilecfg=lib.config.customcardpile[get.config('cardpilename')];
                    // if(pilecfg){
                    //     lib.config.bannedpile=pilecfg[0]||{};
                    //     lib.config.addedpile=pilecfg[1]||{};
                    // }
        
                    _status.event = {
                        finished: true,
                        next: [],
                        after: []
                    };
                    _status.paused = false;
        
                    if (_status.connectMode && lib.mode[name].connect) {
                        game.saveConfig('connect_mode', name);
                        game.clearConnect();
                        lib.configOL.mode = name;
                        if (configx) {
                            for (var i in configx) {
                                lib.configOL[i] = configx[i];
                            }
                        }
                        else {
                            for (var i in lib.mode[name].connect) {
                                if (i == 'update') continue;
                                lib.configOL[i.slice(8)] = get.config(i);
                            }
                            lib.configOL.characterPack = lib.connectCharacterPack.slice(0);
                            lib.configOL.cardPack = lib.connectCardPack.slice(0);
                            for (var i = 0; i < lib.config.connect_characters.length; i++) {
                                lib.configOL.characterPack.remove(lib.config.connect_characters[i]);
                            }
                            for (var i = 0; i < lib.config.connect_cards.length; i++) {
                                lib.configOL.cardPack.remove(lib.config.connect_cards[i]);
                            }
                            lib.configOL.banned = lib.config['connect_' + name + '_banned'];
                            lib.configOL.bannedcards = lib.config['connect_' + name + '_bannedcards'];
                        }
                        lib.configOL.version = lib.versionOL;
                        for (var i in lib.cardPackList) {
                            if (lib.configOL.cardPack.contains(i)) {
                                lib.card.list = lib.card.list.concat(lib.cardPackList[i]);
                            }
                        }
                        for (i = 0; i < lib.card.list.length; i++) {
                            if (lib.card.list[i][2] == 'huosha') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'sha';
                                lib.card.list[i][3] = 'fire';
                            }
                            else if (lib.card.list[i][2] == 'leisha') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'sha';
                                lib.card.list[i][3] = 'thunder';
                            }
                            else if (lib.card.list[i][2] == 'haisha') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'sha';
                                lib.card.list[i][3] = 'ocean';
                            }
                            else if (lib.card.list[i][2] == 'yamisha') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'sha';
                                lib.card.list[i][3] = 'yami';
                            }
                            if (lib.card.list[i][2] == 'haitao') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'tao';
                                lib.card.list[i][3] = 'ocean';
                            }
                            if (lib.card.list[i][2] == 'haijiu') {
                                lib.card.list[i] = lib.card.list[i].slice(0);
                                lib.card.list[i][2] = 'jiu';
                                lib.card.list[i][3] = 'ocean';
                            }
                            if (!lib.card[lib.card.list[i][2]]) {
                                lib.card.list.splice(i, 1); i--;
                            }
                            else if (lib.card[lib.card.list[i][2]].mode &&
                                lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
                                lib.card.list.splice(i, 1); i--;
                            }
                        }
                    }
        
                    if (!lib.config.show_playerids || !game.showIdentity) {
                        ui.playerids.style.display = 'none';
                    }
                    else {
                        ui.playerids.style.display = '';
                    }
        
                    if (mode[lib.config.mode].startBefore) mode[lib.config.mode].startBefore();
                    game.createEvent('game', false).setContent(mode[lib.config.mode].start);
                    if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
                        var startstr = mode[lib.config.mode].start.toString();
                        if (startstr.indexOf('onfree') == -1) {
                            setTimeout(lib.init.onfree, 500);
                        }
                    }
                    delete lib.imported.mode[name];
        
                    if (!lib.db) {
                        try {
                            lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
                            if (typeof lib.storage != 'object') throw ('err');
                            if (lib.storage == null) throw ('err');
                        }
                        catch (err) {
                            lib.storage = {};
                            localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
                        }
                        game.loop();
                    }
                    else {
                        game.getDB('data', lib.config.mode, function (obj) {
                            lib.storage = obj || {};
                            game.loop();
                        });
                    }
                });
            },
            loadMode: function (mode) {
                var next = game.createEvent('loadMode', false);
                next.mode = mode;
                next.setContent('loadMode');
            },
            loadPackage: function () {
                var next = game.createEvent('loadPackage');
                next.packages = [];
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'string') {
                        next.packages.push(arguments[i]);
                    }
                }
                next.setContent('loadPackage');
            },
            phaseLoop: function (player) {
                var next = game.createEvent('phaseLoop');
                next.player = player;
                next.setContent('phaseLoop');
            },
            gameDraw: function (player, num) {
                var next = game.createEvent('gameDraw');
                next.player = player || game.me;
                if (num == undefined) next.num = 4;
                else next.num = num;
                next.setContent('gameDraw');
                return next;
            },
            chooseCharacterDouble: function () {
                var next = game.createEvent('chooseCharacter', false);
                var config, width, num, ratio, func, update, list, first;
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'number') {
                        if (!width) {
                            width = arguments[i];
                        }
                        else if (!num) {
                            num = arguments[i];
                        }
                        else {
                            ratio = arguments[i];
                        }
                    }
                    else if (typeof arguments[i] == 'function') {
                        if (!func) {
                            func = arguments[i];
                        }
                        else {
                            update = arguments[i];
                        }
                    }
                    else if (Array.isArray(arguments[i])) {
                        list = arguments[i];
                    }
                    else if (get.objtype(arguments[i]) == 'object') {
                        config = arguments[i];
                    }
                }
                if (!config) {
                    list = config;
                    config = {};
                }
                config.width = config.width || width || 8;
                config.height = 4;
                config.size = config.width * config.height;
                config.num = config.num || num || 3;
                config.ratio = config.ratio || ratio || 1.2;
                config.update = config.update || update;
                if (!config.hasOwnProperty('first')) {
                    if (typeof first == 'boolean') {
                        config.first = first;
                    }
                    else {
                        config.first = 'rand';
                    }
                }
                if (!list) {
                    list = [];
                    for (var i in lib.character) {
                        if (typeof func == 'function') {
                            if (!func(i)) continue;
                        }
                        else {
                            if (lib.filter.characterDisabled(i)) continue;
                        }
                        list.push(i);
                    }
                }
                next.config = config;
                next.list = list;
                next.setContent([function(){
                    Evt.nodes = [];
                    Evt.avatars = [];
                    Evt.friend = [];
                    Evt.enemy = [];
                    Evt.blank = [];
                    for (var i = 0; i < Evt.config.size; i++) {
                        Evt.nodes.push(ui.create.div('.shadowed.reduce_radius.choosedouble'));
                    }
                    Evt.moveAvatar = function (node, i) {
                        if (!node.classList.contains('moved')) {
                            Evt.blank.push(node.index);
                        }
                        Evt.nodes[node.index].style.display = '';
                        Evt.nodes[node.index].show();
                        clearTimeout(Evt.nodes[node.index].choosetimeout);
                        Evt.moveNode(node, i);
                        var nodex = Evt.nodes[node.index];
                        nodex.choosetimeout = setTimeout(function () {
                            nodex.hide();
                            nodex.choosetimeout = setTimeout(function () {
                                nodex.show();
                                nodex.style.display = 'none';
                            }, 300);
                        }, 400);
                    };
                    Evt.aiMove = function (friend) {
                        var list = [];
                        for (var i = 0; i < Evt.avatars.length; i++) {
                            if (!Evt.avatars[i].classList.contains('moved')) {
                                list.push(Evt.avatars[i]);
                            }
                        }
                        for (var i = 0; i < list.length; i++) {
                            if (Math.random() < 0.7 || i == list.length - 1) {
                                if (friend) {
                                    Evt.moveAvatar(list[i], Evt.friend.length + Evt.config.width * (Evt.config.height - 1));
                                    Evt.friend.push(list[i]);
                                }
                                else {
                                    Evt.moveAvatar(list[i], Evt.enemy.length);
                                    Evt.enemy.push(list[i]);
                                }
                                list[i].classList.add('moved');
                                break;
                            }
                        }
                    };
                    Evt.promptbar = ui.create.div('.hidden', ui.window);
                    Evt.promptbar.style.width = '100%';
                    Evt.promptbar.style.left = 0;
                    if (get.is.phoneLayout()) {
                        Evt.promptbar.style.top = '20px';
                    }
                    else {
                        Evt.promptbar.style.top = '58px';
                    }
                    Evt.promptbar.style.pointerEvents = 'none';
                    Evt.promptbar.style.textAlign = 'center';
                    Evt.promptbar.style.zIndex = '2';
                    ui.create.div('.shadowed.reduce_radius', Evt.promptbar);
                    Evt.promptbar.firstChild.style.fontSize = '18px';
                    Evt.promptbar.firstChild.style.padding = '6px 10px';
                    Evt.promptbar.firstChild.style.position = 'relative';
                    Evt.prompt = function (str) {
                        Evt.promptbar.firstChild.innerHTML = str;
                        Evt.promptbar.show();
                    };
                    Evt.moveNode = function (node, i) {
                        var width = Evt.width, height = Evt.height, margin = Evt.margin;
                        var left = -(width + 10) * Evt.config.width / 2 + 5 + (i % Evt.config.width) * (width + 10);
                        var top = -(height + 10) * Evt.config.height / 2 + 5 + Math.floor(i / Evt.config.width) * (height + 10) + margin / 2;
                        node.style.transform = 'translate(' + left + 'px,' + top + 'px)';
                        node.index = i;
                    };
                    Evt.resize = function () {
                        var margin = 0;
                        if (!get.is.phoneLayout()) {
                            margin = 38;
                        }
                        var height = (ui.window.offsetHeight - 10 * (Evt.config.height + 1) - margin) / Evt.config.height;
                        var width = (ui.window.offsetWidth - 10 * (Evt.config.width + 1)) / Evt.config.width;
                        if (width * Evt.config.ratio < height) {
                            height = width * Evt.config.ratio;
                        }
                        else {
                            width = height / Evt.config.ratio;
                        }
                        Evt.width = width;
                        Evt.height = height;
                        Evt.margin = margin;
                        for (var i = 0; i < Evt.config.size; i++) {
                            Evt.moveNode(Evt.nodes[i], i);
                            Evt.nodes[i].style.width = width + 'px';
                            Evt.nodes[i].style.height = height + 'px';
                            if (Evt.avatars[i]) {
                                Evt.moveNode(Evt.avatars[i], Evt.avatars[i].index);
                                Evt.avatars[i].style.width = width + 'px';
                                Evt.avatars[i].style.height = height + 'px';
                                Evt.avatars[i].nodename.style.fontSize = Math.max(14, Math.round(width / 5.6)) + 'px';
                            }
                        }
                        if (Evt.deciding) {
                            var str = 'px,' + (Evt.margin / 2 - Evt.height * 0.5) + 'px)';
                            for (var i = 0; i < Evt.friendlist.length; i++) {
                                Evt.friendlist[i].style.transform = 'scale(1.2) translate(' + (-(Evt.width + 14) * Evt.friendlist.length / 2 + 7 + i * (Evt.width + 14)) + str;
                            }
                        }
                    };
                    lib.onresize.push(Evt.resize);
                    Evt.clickAvatar = function () {
                        if (Evt.deciding) {
                            if (this.index < Evt.config.width) return;
                            if (Evt.friendlist.contains(this)) {
                                Evt.friendlist.remove(this);
                                Evt.moveNode(this, this.index);
                                this.nodename.innerHTML = get.slimName(this.link);
                            }
                            else {
                                Evt.friendlist.push(this);
                            }
                            if (Evt.friendlist.length == Evt.config.num) {
                                Evt.deciding = false;
                                Evt.prompt('比赛即将开始');
                                setTimeout(game.resume, 1000);
                            }
                            if (Evt.config.update) {
                                for (var i = 0; i < Evt.friendlist.length; i++) {
                                    Evt.friendlist[i].nodename.innerHTML = Evt.config.update(i, Evt.friendlist.length) || Evt.friendlist[i].nodename.innerHTML;
                                }
                            }
                            var str = 'px,' + (Evt.margin / 2 - Evt.height * 0.5) + 'px)';
                            for (var i = 0; i < Evt.friendlist.length; i++) {
                                Evt.friendlist[i].style.transform = 'scale(1.2) translate(' + (-(Evt.width + 14) * Evt.friendlist.length / 2 + 7 + i * (Evt.width + 14)) + str;
                            }
                        }
                        else {
                            if (!Evt.imchoosing) return;
                            if (Evt.replacing) {
                                this.link = Evt.replacing;
                                this.setBackground(Evt.replacing, 'character');
        
                                this.nodename.innerHTML = get.slimName(Evt.replacing);
                                this.nodename.dataset.nature = get.groupnature(lib.character[Evt.replacing][1]);
        
                                delete Evt.replacing;
                                if (this.classList.contains('moved')) {
                                    Evt.custom.add.window();
                                }
                            }
                            if (this.classList.contains('moved')) return;
                            Evt.moveAvatar(this, Evt.friend.length + Evt.config.width * (Evt.config.height - 1));
                            Evt.friend.push(this.link);
                            this.classList.add('moved');
                            game.resume();
                        }
                    };
                    Evt.skipnode = ui.create.system('跳过', function () {
                        this.remove();
                        Evt._skiprest = true;
                        if (Evt.imchoosing) {
                            game.resume();
                        }
                    });
                    if (get.config('change_choice')) {
                        Evt.replacenode = ui.create.system('换将', function () {
                            Evt.promptbar.hide();
                            while (Evt.avatars.length) {
                                Evt.avatars.shift().remove();
                            }
                            for (var i = 0; i < Evt.config.size; i++) {
                                Evt.nodes[i].show();
                                Evt.nodes[i].style.display = '';
                                clearTimeout(Evt.nodes[i].choosetimeout);
                            }
                            delete Evt.list2;
                            Evt.friend.length = 0;
                            Evt.enemy.length = 0;
                            Evt.blank.length = 0;
                            Evt.redoing = true;
                            if (Evt.imchoosing) {
                                game.resume();
                            }
                        }, true);
                    }
                    if (get.config('change_choice')) {
                        Evt.reselectnode = ui.create.system('重选', function () {
                            Evt.promptbar.hide();
                            Evt.list2 = Evt.list2.concat(Evt.friend).concat(Evt.enemy);
                            Evt.friend.length = 0;
                            Evt.enemy.length = 0;
                            for (var i = 0; i < Evt.avatars.length; i++) {
                                if (Evt.avatars[i].classList.contains('moved')) {
                                    Evt.moveAvatar(Evt.avatars[i], Evt.blank.randomRemove());
                                    Evt.avatars[i].classList.remove('moved');
                                }
                            }
                            Evt.redoing = true;
                            if (Evt.imchoosing) {
                                game.resume();
                            }
                        }, true);
                    }
                    if (get.config('free_choose')) {
                        var createCharacterDialog = function () {
                            Evt.freechoosedialog = ui.create.characterDialog();
                            Evt.freechoosedialog.style.height = '80%';
                            Evt.freechoosedialog.style.top = '10%';
                            Evt.freechoosedialog.style.transform = 'scale(0.8)';
                            Evt.freechoosedialog.style.transition = 'all 0.3s';
                            Evt.freechoosedialog.listen(function (e) {
                                if (!Evt.replacing) {
                                    Evt.dialoglayer.clicked = true;
                                }
                            });
                            Evt.freechoosedialog.classList.add('pointerdialog');
                            Evt.dialoglayer = ui.create.div('.popup-container.hidden', function (e) {
                                if (this.classList.contains('removing')) return;
                                if (this.clicked) {
                                    this.clicked = false;
                                    return;
                                }
                                ui.window.classList.remove('modepaused');
                                this.delete();
                                e.stopPropagation();
                                Evt.freechoosedialog.style.transform = 'scale(0.8)';
                                if (Evt.replacing) {
                                    Evt.prompt('用' + get.translation(Evt.replacing) + '替换一名武将');
                                }
                                else {
                                    if (Evt.side == 0) {
                                        Evt.prompt('请选择两名武将');
                                    }
                                    else {
                                        Evt.prompt('请选择一名武将');
                                    }
                                }
                            });
                            Evt.dialoglayer.classList.add('modenopause');
                            Evt.dialoglayer.appendChild(Evt.freechoosedialog);
                            Evt.freechoosenode.classList.remove('hidden');
                        }
        
                        Evt.custom.replace.button = function (button) {
                            Evt.replacing = button.link;
                        };
                        Evt.custom.add.window = function () {
                            if (Evt.replacing) {
                                delete Evt.replacing;
                                if (Evt.side == 0) {
                                    Evt.prompt('请选择两名武将');
                                }
                                else {
                                    Evt.prompt('请选择一名武将');
                                }
                            }
                        };
                        Evt.freechoosenode = ui.create.system('自由选将', function () {
                            if (this.classList.contains('hidden')) return;
                            if (!Evt.imchoosing) {
                                Evt.prompt('请等待敌方选将');
                                return;
                            }
                            delete Evt.replacing;
                            ui.window.classList.add('modepaused');
                            ui.window.appendChild(Evt.dialoglayer);
                            ui.refresh(Evt.dialoglayer);
                            Evt.dialoglayer.show();
                            Evt.freechoosedialog.style.transform = 'scale(1)';
                            Evt.promptbar.hide();
                        }, true);
                        if (lib.onfree) {
                            Evt.freechoosenode.classList.add('hidden');
                            lib.onfree.push(createCharacterDialog);
                        }
                        else {
                            createCharacterDialog();
                        }
                    }
                    Evt.checkredo = function () {
                        if (Evt.redoing) {
                            Evt.goto(1);
                            delete Evt.redoing;
                            return true;
                        }
                    };
                    // if(ui.cardPileButton) ui.cardPileButton.style.display='none';
                    ui.auto.hide();
                    ui.wuxie.hide();
                    Evt.resize();
                    for (var i = 0; i < Evt.config.size; i++) {
                        ui.window.appendChild(Evt.nodes[i]);
                    }},function(){
                    var rand = Evt.config.first;
                    if (rand == 'rand') {
                        rand = (Math.random() < 0.5);
                    }
                    if (rand) {
                        _status.color = true;
                        Evt.side = 1;
                    }
                    else {
                        _status.color = false;
                        Evt.side = 3;
                    }
                    if (!Evt.list2) {
                        Evt.list2 = Evt.list.randomGets(Evt.config.width * 2);
                        for (var i = 0; i < Evt.config.width * 2; i++) {
                            Evt.avatars.push(ui.create.div('.shadowed.shadowed2.reduce_radius.character.choosedouble', Evt.clickAvatar));
                            var name = Evt.list2[i];
                            Evt.avatars[i].setBackground(name, 'character');
                            Evt.avatars[i].link = name;
                            Evt.avatars[i].nodename = ui.create.div('.name', Evt.avatars[i], get.slimName(name));
                            Evt.avatars[i].nodename.style.fontFamily = lib.config.name_font;
                            Evt.avatars[i].index = i + Evt.config.width;
                            Evt.avatars[i].animate('start');
                            Evt.nodes[Evt.avatars[i].index].style.display = 'none';
                            Evt.avatars[i].nodename.dataset.nature = get.groupnature(lib.character[name][1]);
                            lib.setIntro(Evt.avatars[i]);
                        }
                        Evt.resize();
                        for (var i = 0; i < Evt.avatars.length; i++) {
                            ui.window.appendChild(Evt.avatars[i]);
                        }
                        Evt.avatars.sort(function (a, b) {
                            return get.rank(b.link, true) - get.rank(a.link, true);
                        })
                    }
                    game.delay();
                    lib.init.onfree();},function(){
                    if (Evt.checkredo()) return;
                    if (Evt._skiprest) return;
                    if (Evt.side < 2) {
                        Evt.imchoosing = true;
                        if (Evt.side == 0) {
                            Evt.prompt('请选择两名武将');
                        }
                        else {
                            Evt.prompt('请选择一名武将');
                            Evt.fast = get.time();
                        }
                        game.pause();
                    }
                    else {
                        Evt.aiMove();
                        game.delay();
                    }},function(){
                    if (typeof Evt.fast == 'number' && get.time() - Evt.fast <= 1000) {
                        Evt.fast = true;
                    }
                    else {
                        Evt.fast = false;
                    }
                    delete Evt.imchoosing;
                    if (Evt.checkredo()) return;
                    if (Evt._skiprest) {
                        while (Evt.enemy.length < Evt.config.width) {
                            Evt.aiMove();
                        }
                        while (Evt.friend.length < Evt.config.width) {
                            Evt.aiMove(true);
                        }
                    }
                    else if (Evt.friend.length + Evt.enemy.length < Evt.config.width * 2 - 1) {
                        if (Evt.side == 1) {
                            game.delay(Evt.fast ? 1 : 2);
                            Evt.promptbar.hide();
                        }
                        Evt.side++;
                        if (Evt.side > 3) {
                            Evt.side = 0;
                        }
                        Evt.goto(2);
                    }
                    else {
                        Evt.promptbar.hide();
                        Evt.side++;
                        if (Evt.side > 3) {
                            Evt.side = 0;
                        }
                        if (Evt.side >= 2) {
                            game.delay()
                        }
                    }},function(){
                    if (Evt.checkredo()) return;
                    if (Evt.skipnode) Evt.skipnode.delete();
                    if (Evt.replacenode) Evt.replacenode.delete();
                    if (Evt.reselectnode) Evt.reselectnode.delete();
                    if (Evt.freechoosenode) Evt.freechoosenode.delete();
                    for (var i = 0; i < Evt.avatars.length; i++) {
                        if (!Evt.avatars[i].classList.contains('moved')) {
                            if (Evt.side < 2) {
                                Evt.moveAvatar(Evt.avatars[i], Evt.friend.length + Evt.config.width * (Evt.config.height - 1));
                                Evt.friend.push(Evt.avatars[i]);
                            }
                            else {
                                Evt.moveAvatar(Evt.avatars[i], Evt.enemy.length);
                                Evt.enemy.push(Evt.avatars[i]);
                            }
                            Evt.avatars[i].classList.add('moved');
                        }
                    }
                    game.delay();},function(){
                    Evt.prompt('选择' + get.cnNumber(Evt.config.num) + '名出场武将');
                    Evt.enemylist = [];
                    for (var i = 0; i < Evt.avatars.length; i++) {
                        if (Evt.avatars[i].index > Evt.config.width) {
                            Evt.avatars[i].classList.add('selecting');
                        }
                    }
                    var rand = [];
                    for (var i = 0; i < Evt.config.width; i++) {
                        for (var j = 0; j < Evt.config.width - i; j++) {
                            rand.push(i);
                        }
                    }
                    for (var i = 0; i < Evt.config.num; i++) {
                        var rand2 = rand.randomGet();
                        for (var j = 0; j < rand.length; j++) {
                            if (rand[j] == rand2) {
                                rand.splice(j--, 1);
                            }
                        }
                        Evt.enemylist.push(Evt.enemy[rand2]);
                    }
                    Evt.enemylist.randomSort();
                    Evt.friendlist = [];
                    Evt.deciding = true;
                    for (var i = 0; i < Evt.config.size; i++) {
                        Evt.nodes[i].hide();
                    }
                    game.pause();},function(){
                    Evt.promptbar.delete();
                    if (ui.cardPileButton) ui.cardPileButton.style.display = '';
                    lib.onresize.remove(Evt.resize);
                    ui.wuxie.show();
                    ui.auto.show();
                    for (var i = 0; i < Evt.avatars.length; i++) {
                        Evt.avatars[i].delete();
                    }
                    for (var i = 0; i < Evt.nodes.length; i++) {
                        Evt.nodes[i].delete();
                    }
                    Evt.result = { friend: [], enemy: [] };
                    for (var i = 0; i < Evt.config.num; i++) {
                        Evt.result.friend[i] = Evt.friendlist[i].link;
                        Evt.result.enemy[i] = Evt.enemylist[i].link;
                    }
                }]);
            },
            updateRoundNumber: function () {
                game.broadcastAll(function (num1, num2, top) {
                    if (ui.cardPileNumber) ui.cardPileNumber.innerHTML = num1 + '轮 剩余牌: ' + num2;
                    _status.pileTop = top;
                }, game.roundNumber, ui.cardPile.childNodes.length, ui.cardPile.firstChild);
            },
            asyncDraw: function (players, num, drawDeck, bottom) {
                for (var i = 0; i < players.length; i++) {
                    var num2 = 1;
                    if (typeof num == 'number') {
                        num2 = num;
                    }
                    else if (Array.isArray(num)) {
                        num2 = num[i];
                    }
                    else if (typeof num == 'function') {
                        num2 = num(players[i]);
                    }
                    if (drawDeck && drawDeck.drawDeck) {
                        players[i].draw(num2, false, drawDeck);
                    }
                    else {
                        if (bottom) players[i].draw(num2, 'nodelay', 'bottom');
                        else players[i].draw(num2, 'nodelay');
                    }
                }
            },
            asyncDrawAuto: function (players, num, drawDeck) {
                if (players.length == 1) {
                    var num2 = 1;
                    if (typeof num == 'number') {
                        num2 = num;
                    }
                    else if (Array.isArray(num)) {
                        num2 = num[0];
                    }
                    else if (typeof num == 'function') {
                        num2 = num(players[0]);
                    }
                    if (drawDeck && drawDeck.drawDeck) {
                        players[0].draw(num2, drawDeck);
                    }
                    else {
                        players[0].draw(num2);
                    }
                }
                else {
                    game.asyncDraw.apply(this, arguments);
                }
            },
            /**
             * 为角色技能添加`translate`文本，设置默认ai，进行预处理
             * 同时将下划线(_)开头的技能添加到{@link lib.skill.global}
             * @param {string} i 技能名
             * @param {*} [sub] 
             * @see{@link game.finishCards}
             */
            finishSkill: function (i, sub) {
                var j;
                var mode = get.mode();
                var info = lib.skill[i];
                if (info.alter) {
                    lib.translate[i + '_info_origin'] = lib.translate[i + '_info'];
                    if (!lib.config.vintageSkills.contains(i)) {
                        lib.translate[i + '_info'] = lib.translate[i + '_info_alter'];
                    }
                }
                else if (lib.translate[i + '_info_' + mode]) {
                    lib.translate[i + '_info'] = lib.translate[i + '_info_' + mode];
                }
                else if (lib.translate[i + '_info_zhu'] && (mode == 'identity' || (mode == 'guozhan' && _status.mode == 'four'))) {
                    lib.translate[i + '_info'] = lib.translate[i + '_info_zhu'];
                }
                else if (lib.translate[i + '_info_combat'] && get.is.versus()) {
                    lib.translate[i + '_info'] = lib.translate[i + '_info_combat'];
                }
                if (info.forbid && info.forbid.contains(mode)) {
                    lib.skill[i] = {};
                    if (lib.translate[i + '_info']) {
                        lib.translate[i + '_info'] = '此模式下不可用';
                    }
                    return;
                }
                if (info.mode && info.mode.contains(mode) == false) {
                    lib.skill[i] = {};
                    if (lib.translate[i + '_info']) {
                        lib.translate[i + '_info'] = '此模式下不可用';
                    }
                    return;
                }
                if (info.available && info.available(mode) == false) {
                    lib.skill[i] = {};
                    if (lib.translate[i + '_info']) {
                        lib.translate[i + '_info'] = '此模式下不可用';
                    }
                    return;
                }
                if (info.viewAs && typeof info.viewAs != 'function') {
                    if (typeof info.viewAs == 'string') {
                        info.viewAs = { name: info.viewAs };
                    }
                    if (!lib.card[info.viewAs.name]) {
                        lib.skill[i] = {};
                        lib.translate[i + '_info'] = '技能不可用';
                        return;
                    }
                    if (info.ai == undefined) info.ai = {};
                    var skill = info.ai;
                    var card = lib.card[info.viewAs.name].ai;
                    for (j in card) {
                        if (skill[j] == undefined) skill[j] = card[j];
                        else if (typeof skill[j] == 'object') {
                            for (var k in card[j]) {
                                if (skill[j][k] == undefined) skill[j][k] = card[j][k];
                            }
                        }
                    }
                }
                if (info.inherit) {
                    var skill = lib.skill[info.inherit];
                    for (j in skill) {
                        if (info[j] == undefined) {
                            if (j == 'audio' && (typeof info[j] == 'number' || typeof info[j] == 'boolean')) {
                                info[j] = info.inherit;
                            }
                            else {
                                info[j] = skill[j];
                            }
                        }
                    }
                    if (lib.translate[i] == undefined) {
                        lib.translate[i] = lib.translate[info.inherit];
                    }
                    if (lib.translate[i + '_info'] == undefined) {
                        lib.translate[i + '_info'] = lib.translate[info.inherit + '_info'];
                    }
                }
                if (info.limited) {
                    if (info.mark === undefined) info.mark = true;
                    if (!info.intro) info.intro = {};
                    if (info.intro.content === undefined) info.intro.content = 'limited';
                    if (info.skillAnimation === undefined) info.skillAnimation = true;
                    if (info.init === undefined) info.init = function (player, skill) {
                        player.storage[skill] = false;
                    }
                }
                if (info.subSkill && !sub) {
                    for (var j in info.subSkill) {
                        lib.skill[i + '_' + j] = info.subSkill[j];
                        lib.skill[i + '_' + j].sub = true;
                        if (info.subSkill[j].name) {
                            lib.translate[i + '_' + j] = info.subSkill[j].name;
                        }
                        else {
                            lib.translate[i + '_' + j] = lib.translate[i + '_' + j] || lib.translate[i];
                        }
                        if (info.subSkill[j].description) {
                            lib.translate[i + '_' + j + '_info'] = info.subSkill[j].description;
                        }
                        if (info.subSkill[j].marktext) {
                            lib.translate[i + '_' + j + '_bg'] = info.subSkill[j].marktext;
                        }
                        game.finishSkill(i + '_' + j, true);
                    }
                }
                if (info.round) {
                    var k = i + '_roundcount';
                    if (typeof info.group == 'string') {
                        info.group = [info.group, k];
                    }
                    else if (Array.isArray(info.group)) {
                        info.group.add(k);
                    }
                    else {
                        info.group = [k];
                    }
                    lib.skill[k] = (function (round, name) {
                        return {
                            init(player) {
                                if (typeof player.storage[name] !== 'number') player.storage[name] = 0;
                            },
                            intro: {
                                content(storage, player) {
                                    let str = '';
                                    let info = get.info(name.slice(0, name.indexOf('_roundcount')));
                                    if (info && info.addintro) {
                                        str += info.addintro(storage, player);
                                    }
                                    // let num = round - (game.roundNumber - storage);
                                    let num = storage
                                    if (num > 0) {
                                        str += get.cnNumber(num) + '轮后' + (info.roundtext || '技能重置');
                                    }
                                    else {
                                        str += '技能可发动';
                                    }
                                    return str;
                                },
                                markcount(storage, player) {
                                    let num = storage;
                                    if (num > 0) {
                                        return num;
                                    }
                                    return 0;
                                }
                            },
                            trigger: { global: 'roundEnd' },
                            forced: true,
                            popup: false,
                            silent: true,
                            content() {
                                var roundname = Evt.name;
                                if (player.storage[roundname] > 0) {
                                    player.storage[roundname]--
                                }
                                if (player.storage[roundname] > 0) {
                                    player.updateMarks();
                                }
                                else {
                                    player.unmarkSkill(roundname);
                                }
                            }
                        };
                    }(info.round, k));
                    lib.translate[k] = lib.translate[i] || '';
                    lib.translate[k + '_bg'] = lib.translate[i + '_bg'] || lib.translate[k][0];
                }
                if (info.marktext) {
                    lib.translate[i + '_bg'] = info.marktext;
                }
                if (info.silent) {
                    if (!info.hasOwnProperty('forced')) info.forced = true;
                    if (!info.hasOwnProperty('popup')) info.popup = false;
                }
                if (i[0] == '_') {
                    game.addGlobalSkill(i);
                }
            },
            /**
             * 为(游戏牌|角色技能)添加`translate`文本，设置默认ai，进行预处理
             * @see {@link game.finishSkill}
             */
            finishCards: function () {
                _status.cardsFinished = true;
                var i, j, k;
                var mode = get.mode();
                for (i in lib.card) {
                    if (lib.translate[i + '_info_' + mode]) {
                        lib.translate[i + '_info'] = lib.translate[i + '_info_' + mode];
                    }
                    else if (lib.translate[i + '_info_zhu'] && (mode == 'identity' || (mode == 'guozhan' && _status.mode == 'four'))) {
                        lib.translate[i + '_info'] = lib.translate[i + '_info_zhu'];
                    }
                    else if (lib.translate[i + '_info_combat'] && get.is.versus()) {
                        lib.translate[i + '_info'] = lib.translate[i + '_info_combat'];
                    }
                    var card = lib.card[i];
                    if (card.filterTarget && card.selectTarget == undefined) {
                        card.selectTarget = 1;
                    }
                    if (card.autoViewAs) {
                        if (!card.ai) {
                            card.ai = {};
                        }
                        if (!card.ai.order) {
                            card.ai.order = lib.card[card.autoViewAs].ai.order;
                            if (!card.ai.order && lib.card[card.autoViewAs].ai.basic) {
                                card.ai.order = lib.card[card.autoViewAs].ai.basic.order;
                            }
                        }
                    }
                    if (card.type == 'equip') {
                        if (card.enable == undefined) card.enable = true;
                        if (card.selectTarget == undefined) card.selectTarget = -1;
                        if (card.filterTarget == undefined) card.filterTarget = function (card, player, target) {
                            return target == player;
                        };
                        if (card.modTarget == undefined) card.modTarget = true;
                        if (card.allowMultiple == undefined) card.allowMultiple = false;
                        if (card.content == undefined) card.content = lib.element.content.equipCard;
                        if (card.toself == undefined) card.toself = true;
                        if (card.ai == undefined) card.ai = { basic: {} };
                        if (card.ai.basic == undefined) card.ai.basic = {};
                        if (card.ai.result == undefined) card.ai.result = { target: 1.5 };
                        if (card.ai.basic.order == undefined) card.ai.basic.order = function (card, player) {
                            if (player && player.hasSkillTag('reverseEquip')) {
                                return 8.5 - get.equipValue(card, player) / 20;
                            }
                            else {
                                return 8 + get.equipValue(card, player) / 20;
                            }
                        };
                        if (card.ai.basic.useful == undefined) card.ai.basic.useful = 2;
                        if (card.subtype == 'equip3') {
                            if (card.ai.basic.equipValue == undefined) card.ai.basic.equipValue = 7;
                        }
                        else if (card.subtype == 'equip4') {
                            if (card.ai.basic.equipValue == undefined) card.ai.basic.equipValue = 4;
                        }
                        else {
                            if (card.ai.basic.equipValue == undefined) card.ai.basic.equipValue = 1;
                        }
                        if (card.ai.basic.value == undefined) card.ai.basic.value = function (card, player, index, method) {
                            if (player.isDisabled(get.subtype(card))) return 0.01;
                            var value = 0;
                            var info = get.info(card);
                            var current = player.getEquip(info.subtype);
                            if (current && card != current) {
                                value = get.value(current, player);
                            }
                            var equipValue = info.ai.equipValue;
                            if (equipValue == undefined) {
                                equipValue = info.ai.basic.equipValue;
                            }
                            if (typeof equipValue == 'function') {
                                if (method == 'raw') return equipValue(card, player);//原装备价值
                                if (method == 'raw2') return equipValue(card, player) - value;//装备牌`card`的相对装备价值(相对当前相同位置的装备。如果没有装备，则为原装备价值)
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != 'number') equipValue = 0;
                            if (method == 'raw') return equipValue;
                            if (method == 'raw2') return equipValue - value;
                            return Math.max(0.1, equipValue - value);
                        }
                        if (!card.ai.result.keepAI) card.ai.result.target = function (player, target, card) {
                            return get.equipResult(player, target, card.name);
                        };
                    }
                    else if (card.type == 'delay') {
                        if (card.enable == undefined) card.enable = true;
                        if (card.filterTarget == undefined) card.filterTarget = lib.filter.judge;
                        if (card.content == undefined) card.content = lib.element.content.addJudgeCard;
                        if (card.allowMultiple == undefined) card.allowMultiple = false;
                    }
                }
                for (i in lib.skill) {
                    game.finishSkill(i);
                }
            },
            //Mod类技能的相关检测
            checkMod: function () {
                var name = arguments[arguments.length - 2];
                var skills = arguments[arguments.length - 1];
                if (skills.getSkills) {
                    if (name != 'cardname') skills = skills.getSkills();
                    else skills = skills.getSkills(null, false);
                }
                skills = skills.concat(lib.skill.global);
                game.expandSkills(skills);
                var arg = [], i, info;
                for (i = 0; i < arguments.length - 2; i++) {
                    arg.push(arguments[i]);
                }
                for (i = 0; i < skills.length; i++) {
                    info = get.info(skills[i]);
                    if (info && info.mod && info.mod[name]) {
                        var result = info.mod[name].apply(this, arg);
                        if (typeof arg[arg.length - 1] != 'object' && result != undefined) arg[arg.length - 1] = result;
                    }
                }
                return arg[arg.length - 1];
            },
            prepareArena: function (num) {
                _status.prepareArena = true;
                game.showHistory(false);
                ui.create.players(num);
                ui.create.me();
                ui.create.cardsAsync();
                game.finishCards();
            },
            clearArena: function () {
                ui.control.innerHTML = '';
                ui.arenalog.innerHTML = '';
                var nodes = [];
                for (var i = 0; i < ui.arena.childNodes.length; i++) {
                    nodes.push(ui.arena.childNodes[i]);
                }
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i] == ui.canvas) continue;
                    if (nodes[i] == ui.control) continue;
                    if (nodes[i] == ui.arenalog) continue;
                    if (nodes[i] == ui.roundmenu) continue;
                    if (nodes[i] == ui.timer) continue;
                    if (nodes[i] == ui.autonode) continue;
                    nodes[i].remove();
                }
                ui.sidebar.innerHTML = '';
                ui.cardPile.innerHTML = '';
                ui.discardPile.innerHTML = '';
                ui.special.innerHTML = '';
                ui.ordering.innerHTML = '';
                ui.playerids.remove();
                game.players.length = 0;
                game.dead.length = 0;
                game.me = null;
            },
            clearConnect: function () {
                if (ui.ipnode) {
                    ui.ipnode.remove();
                    delete ui.ipnode;
                }
                if (ui.iptext) {
                    ui.iptext.remove();
                    delete ui.iptext;
                }
                if (ui.ipbutton) {
                    ui.ipbutton.remove();
                    delete ui.ipbutton;
                }
                if (ui.recentIP) {
                    ui.recentIP.remove();
                    delete ui.recentIP;
                }
                if (ui.hall_button) {
                    ui.hall_button.remove();
                    delete ui.hall_button;
                }
                if (ui.startServer) {
                    ui.startServer.remove();
                    delete ui.startServer;
                }
                if (ui.rooms) {
                    for (var i = 0; i < ui.rooms.length; i++) {
                        ui.rooms[i].remove();
                    }
                    delete ui.rooms;
                }
                if (ui.roombase) {
                    ui.roombase.remove();
                    delete ui.roombase;
                }
                if (ui.connectEvents) {
                    ui.connectEvents.remove();
                    ui.connectEventsCount.remove();
                    ui.connectClients.remove();
                    ui.connectClientsCount.remove();
                    ui.createRoomButton.remove();
                    delete ui.connectEvents;
                    delete ui.connectEventsCount;
                    delete ui.connectClients;
                    delete ui.connectClientsCount;
                    delete ui.createRoomButton;
                }
            },
            log: function () {
                var str = '', str2 = '', logvid = null;
                for (var i = 0; i < arguments.length; i++) {
                    var itemtype = get.itemtype(arguments[i]);
                    if (itemtype == 'player' || itemtype == 'players') {
                        str += '<span class="bluetext">' + get.translation(arguments[i]) + '</span>';
                        str2 += get.translation(arguments[i]);
                    }
                    else if (itemtype == 'cards' || itemtype == 'card' || (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name)) {
                        str += '<span class="yellowtext">' + get.translation(arguments[i]) + '</span>';
                        str2 += get.translation(arguments[i]);
                    }
                    else if (typeof arguments[i] == 'object') {
                        if (arguments[i]) {
                            if (arguments[i].parentNode == ui.historybar) {
                                logvid = arguments[i].logvid;
                            }
                            else {
                                str += get.translation(arguments[i]);
                                str2 += get.translation(arguments[i]);
                            }
                        }
                    }
                    else if (typeof arguments[i] == 'string') {
                        if (arguments[i][0] == '【' && arguments[i][arguments[i].length - 1] == '】') {
                            str += '<span class="greentext">' + get.translation(arguments[i]) + '</span>';
                            str2 += get.translation(arguments[i]);
                        }
                        else if (arguments[i][0] == '#') {
                            var color = '';
                            switch (arguments[i][1]) {
                                case 'r': color = 'fire'; break;
                                case 'p': color = 'legend'; break;
                                case 'b': color = 'blue'; break;
                                case 'g': color = 'green'; break;
                                case 'y': color = 'yellow'; break;
                                case 'i': color = 'ice'; break;
                            }
                            str += '<span class="' + color + 'text">' + get.translation(arguments[i].slice(2)) + '</span>';
                            str2 += get.translation(arguments[i].slice(2));
                        }
                        else {
                            str += get.translation(arguments[i]);
                            str2 += get.translation(arguments[i]);
                        }
                    }
                    else {
                        str += arguments[i];
                        str2 += arguments[i];
                    }
        
                }
                var node = ui.create.div();
                node.innerHTML = lib.config.log_highlight ? str : str2;
                ui.sidebar.insertBefore(node, ui.sidebar.firstChild);
                game.addVideo('log', null, lib.config.log_highlight ? str : str2);
                game.broadcast(function (str, str2) {
                    game.log(lib.config.log_highlight ? str : str2);
                }, str, str2);
                if (!_status.video && !game.online) {
                    if (!logvid) {
                        logvid = _status.event.getLogv();
                    }
                    if (logvid) {
                        game.logv(logvid, '<div class="text center">' + lib.config.log_highlight ? str : str2 + '</div>');
                    }
                }
                // if(lib.config.title) document.title=lib.config.log_highlight?str:str2;
                if (lib.config.show_log != 'off' && !game.chess) {
                    var nodeentry = node.cloneNode(true);
                    ui.arenalog.insertBefore(nodeentry, ui.arenalog.firstChild);
                    if (!lib.config.clear_log) {
                        while (ui.arenalog.childNodes.length && ui.arenalog.scrollHeight > ui.arenalog.offsetHeight) {
                            ui.arenalog.lastChild.remove();
                        }
                    }
                    if (!lib.config.low_performance) {
                        nodeentry.style.transition = 'all 0s';
                        nodeentry.style.marginBottom = (-nodeentry.offsetHeight) + 'px';
                        ui.refresh(nodeentry);
                        nodeentry.style.transition = '';
                        nodeentry.style.marginBottom = '';
                    }
                    if (lib.config.clear_log) {
                        nodeentry.timeout = setTimeout(function () {
                            nodeentry.delete();
                        }, 1000);
                        for (var i = 0; i < ui.arenalog.childElementCount; i++) {
                            if (!ui.arenalog.childNodes[i].timeout) {
                                ui.arenalog.childNodes[i].remove();
                            }
                        }
                    }
                }
            },
            logv: function (player, card, targets, Evt, forced, logvid) {
                var node = ui.create.div('.hidden');
                node.node = {};
                logvid = logvid || get.id();
                if (!player) {
                    player = _status.event.getParent().logvid;
                    if (!player) return;
                }
                game.broadcast(function (player, card, targets, Evt, forced, logvid) {
                    game.logv(player, card, targets, Evt, forced, logvid);
                }, player, card, targets, Evt, forced, logvid);
                if (typeof player == 'string') {
                    for (var i = 0; i < ui.historybar.childElementCount; i++) {
                        if (ui.historybar.childNodes[i].logvid == player) {
                            ui.historybar.childNodes[i].added.push(card); break;
                        }
                    }
                    return;
                }
                if (typeof card == 'string') {
                    if (card != 'die') {
                        if (lib.skill[card] && lib.skill[card].logv === false && !forced) return;
                        if (!lib.translate[card]) return;
                    }
                    var avatar;
                    if (!player.isUnseen(0)) {
                        avatar = player.node.avatar.cloneNode();
                    }
                    else if (!player.isUnseen(1)) {
                        avatar = player.node.avatar2.cloneNode();
                    }
                    else {
                        return;
                    }
                    node.node.avatar = avatar;
                    avatar.style.transform = '';
                    avatar.className = 'avatar';
                    if (card == 'die') {
                        node.dead = true;
                        node.player = player;
                        var avatar2 = avatar.cloneNode();
                        avatar2.className = 'avatarbg grayscale1';
                        avatar.appendChild(avatar2);
                        avatar.style.opacity = 0.6;
                    }
                    else {
                        node.node.text = ui.create.div('', get.translation(card, 'skill'), avatar);
                        node.node.text.dataset.nature = 'water';
                        node.skill = card;
                    }
                    node.appendChild(avatar);
                    if (card == 'die' && targets && targets != player) {
                        node.source = targets;
                        var avatar;
                        player = targets;
                        if (!player.isUnseen(0)) {
                            avatar = player.node.avatar.cloneNode();
                        }
                        else if (!player.isUnseen(1)) {
                            avatar = player.node.avatar2.cloneNode();
                        }
                        else if (get.mode() == 'guozhan' && player.node && player.node.name_seat) {
                            avatar = ui.create.div('.avatar.cardbg');
                            avatar.innerHTML = player.node.name_seat.innerHTML[0];
                        }
                        else {
                            return;
                        }
                        avatar.style.transform = '';
                        node.node.avatar2 = avatar;
                        avatar.classList.add('avatar2');
                        node.appendChild(avatar);
                    }
                }
                else if (Array.isArray(card)) {
                    node.cards = card[1];
                    card = card[0];
                    var info = [card.suit || '', card.number || '', card.name || '', card.nature || ''];
                    if (!Array.isArray(node.cards) || !node.cards.length) {
                        node.cards = [ui.create.card(node, 'noclick', true).init(info)];
                    }
                    if (card.name == 'wuxie') {
                        if (ui.historybar.firstChild && ui.historybar.firstChild.type == 'wuxie') {
                            ui.historybar.firstChild.players.push(player);
                            ui.historybar.firstChild.cards.addArray(node.cards);
                            return;
                        }
                        else {
                            node.type = 'wuxie';
                            node.players = [player];
                        }
                    }
                    if (card.copy) {
                        card.copy(node, false);
                    }
                    else {
                        card = ui.create.card(node, 'noclick', true);
                        card.init(info);
                    }
                    var avatar;
                    if (!player.isUnseen(0)) {
                        avatar = player.node.avatar.cloneNode();
                    }
                    else if (!player.isUnseen(1)) {
                        avatar = player.node.avatar2.cloneNode();
                    }
                    else if (get.mode() == 'guozhan' && player.node && player.node.name_seat) {
                        avatar = ui.create.div('.avatar.cardbg');
                        avatar.innerHTML = player.node.name_seat.innerHTML[0];
                    }
                    else {
                        return;
                    }
                    node.node.avatar = avatar;
                    avatar.style.transform = '';
                    avatar.classList.add('avatar2');
                    node.appendChild(avatar);
        
                    if (targets && targets.length == 1 && targets[0] != player && get.itemtype(targets[0]) == 'player') {
                        (function () {
                            var avatar2;
                            var target = targets[0];
                            if (!target.isUnseen(0)) {
                                avatar2 = target.node.avatar.cloneNode();
                            }
                            else if (!player.isUnseen(1)) {
                                avatar2 = target.node.avatar2.cloneNode();
                            }
                            else if (get.mode() == 'guozhan' && target.node && target.node.name_seat) {
                                avatar2 = ui.create.div('.avatar.cardbg');
                                avatar2.innerHTML = target.node.name_seat.innerHTML[0];
                            }
                            else {
                                return;
                            }
                            node.node.avatar2 = avatar2;
                            avatar2.style.transform = '';
                            avatar2.classList.add('avatar2');
                            avatar2.classList.add('avatar3');
                            node.insertBefore(avatar2, avatar);
                        }());
                    }
                }
                if (targets && targets.length) {
                    if (targets.length == 1 && targets[0] == player) {
                        node.targets = [];
                    }
                    else {
                        node.targets = targets;
                    }
                }
                var fullheight = ui.historybar.offsetHeight;
                var num = Math.round((fullheight - 8) / 50);
                var margin = (fullheight - 42 * num) / (num + 1);
                node.style.transform = 'scale(0.8)';
                ui.historybar.insertBefore(node, ui.historybar.firstChild);
                ui.refresh(node);
                node.classList.remove('hidden');
                for (var i = 0; i < ui.historybar.childElementCount; i++) {
                    var current = ui.historybar.childNodes[i];
                    if (i < num) {
                        current.style.transform = 'scale(1) translateY(' + (margin + i * (42 + margin) - 4) + 'px)';
                    }
                    else {
                        if (!current.removetimeout) {
                            current.style.opacity = 0;
                            current.style.transform = 'scale(1) translateY(' + fullheight + 'px)';
                            current.removetimeout = setTimeout((function (current) {
                                return function () {
                                    current.remove();
                                };
                            }(current)), 500);
                        }
                    }
                }
                if (lib.config.touchscreen) {
                    node.addEventListener('touchstart', ui.click.intro);
                }
                else {
                    // node.addEventListener('mouseenter',ui.click.intro);
                    node.addEventListener(lib.config.pop_logv ? 'mousemove' : 'click', ui.click.logv);
                    node.addEventListener('mouseleave', ui.click.logvleave);
                }
                node.logvid = logvid;
                node.added = [];
                if (!game.online) {
                    Evt = Evt || _status.event;
                    Evt.logvid = node.logvid;
                }
                return node;
            },
            /**
             * 从IndexedDB中获取对象仓库(object store)，并更新对象
             * @param {string} type - 仓库名称
             * @param {string} id - 键路径的值
             * @param {any} item - 要插入/更新的对象
             * @param {function} callback - 成功时回调函数
             */
            putDB: function (type, id, item, callback) {
                if (!lib.db) return item;
                if (lib.status.reload) {
                    lib[_status.dburgent ? 'ondb2' : 'ondb'].push(['putDB', Array.from(arguments)]);
                    return;
                }
                lib.status.reload++;
                var put = lib.db.transaction([type], 'readwrite').objectStore(type).put(item, id);
                put.onsuccess = function () {
                    if (callback) {
                        _status.dburgent = true;
                        callback.apply(this, arguments);
                        delete _status.dburgent;
                    }
                    game.reload2();
                };
            },
            /**
             * 从IndexedDB中获取对象仓库(object store)，并获取对象
             * @param {string} type - 仓库名称
             * @param {string} id - 键路径的值
             * @param {!function} callback - 成功时回调函数
             */
            getDB: function (type, id, callback) {
                if (!lib.db) {
                    callback(null);
                    return;
                }
                if (!callback) return;
                if (lib.status.reload) {
                    lib[_status.dburgent ? 'ondb2' : 'ondb'].push(['getDB', Array.from(arguments)]);
                    return;
                }
                lib.status.reload++;
                var store = lib.db.transaction([type], 'readwrite').objectStore(type);
                if (id) {
                    store.get(id).onsuccess = function (e) {
                        _status.dburgent = true;
                        callback(e.target.result);
                        delete _status.dburgent;
                        game.reload2();
                    };
                }
                else {
                    var obj = {};
                    store.openCursor().onsuccess = function (e) {
                        var cursor = e.target.result;
                        if (cursor) {
                            obj[cursor.key] = cursor.value;
                            cursor.continue();
                        }
                        else {
                            _status.dburgent = true;
                            callback(obj);
                            delete _status.dburgent;
                            game.reload2();
                        }
                    }
                }
            },
            /**
             * 从IndexedDB中获取对象仓库(object store)，并删除对象
             * @param {string} type - 仓库名称
             * @param {string} id - 键路径的值
             * @param {function} callback - 成功时回调函数
             */
            deleteDB: function (type, id, callback) {
                if (!lib.db) {
                    callback(false);
                    return;
                }
                if (lib.status.reload) {
                    lib[_status.dburgent ? 'ondb2' : 'ondb'].push(['deleteDB', Array.from(arguments)]);
                    return;
                }
                if (arguments.length == 1) {
                    game.getDB(type, null, function (obj) {
                        var store = lib.db.transaction([type], 'readwrite').objectStore(type);
                        for (var id in obj) {
                            lib.status.reload++;
                        }
                        for (var id in obj) {
                            store.delete(id).onsuccess = game.reload2;
                        }
                        game.reload2();
                    });
                }
                else {
                    lib.status.reload++;
                    var store = lib.db.transaction([type], 'readwrite').objectStore(type);
                    store.delete(id).onsuccess = function () {
                        if (callback) {
                            callback.apply(this, arguments);
                        }
                        game.reload2();
                    };
                }
            },
            save: function (key, value, mode) {
                if (_status.reloading) return;
                mode = mode || lib.config.mode;
                if (!lib.db) {
                    var config = {};
                    if (key) {
                        try {
                            config = JSON.parse(localStorage.getItem(lib.configprefix + mode));
                            if (typeof config != 'object') throw 'err';
                        }
                        catch (err) {
                            config = {};
                        }
                        if (value == undefined) {
                            delete config[key];
                            if (mode == lib.config.mode) delete lib.storage[key];
                        }
                        else {
                            config[key] = value;
                            if (mode == lib.config.mode) lib.storage[key] = value;
                        }
                        config.version = lib.version;
                        localStorage.setItem(lib.configprefix + mode, JSON.stringify(config));
                    }
                    else {
                        localStorage.setItem(lib.configprefix + mode, JSON.stringify(lib.storage));
                    }
                }
                else {
                    if (key) {
                        if (mode == lib.config.mode) {
                            if (value == undefined) {
                                delete lib.storage[key];
                            }
                            else {
                                lib.storage[key] = value;
                            }
                            lib.storage.version = lib.version;
                            game.putDB('data', mode, lib.storage);
                        }
                        else {
                            game.getDB('data', mode, function (config) {
                                if (!config) config = {};
                                if (value == undefined) {
                                    delete config[key];
                                }
                                else {
                                    config[key] = value;
                                }
                                config.version = lib.version;
                                game.putDB('data', mode, config);
                            });
                        }
                    }
                    else {
                        game.putDB('data', mode, get.copy(lib.storage));
                    }
                }
            },
            showChangeLog: function () {
                if (lib.version != lib.config.version || _status.extensionChangeLog) {
                    var ul = document.createElement('ul');
                    ul.style.textAlign = 'left';
                    var caption;
                    var players = null, cards = null;
                    if (lib.version != lib.config.version) {
                        for (var i = 0; i < lib.changeLog.length; i++) {
                            if (lib.changeLog[i].indexOf('players://') == 0) {
                                try {
                                    players = JSON.parse(lib.changeLog[i].slice(10));
                                }
                                catch (e) {
                                    players = null;
                                }
                            }
                            else if (lib.changeLog[i].indexOf('cards://') == 0) {
                                try {
                                    cards = JSON.parse(lib.changeLog[i].slice(8));
                                }
                                catch (e) {
                                    cards = null;
                                }
                            }
                            else {
                                var li = document.createElement('li');
                                li.innerHTML = lib.changeLog[i];
                                ul.appendChild(li);
                            }
                        }
                        caption = lib.version + '更新内容';
                    }
                    else {
                        caption = '扩展更新';
                    }
                    game.saveConfig('version', lib.version);
                    for (var i in _status.extensionChangeLog) {
                        var li = document.createElement('li');
                        li.innerHTML = i + '：' + _status.extensionChangeLog[i];
                        ul.appendChild(li);
                    }
                    var dialog = ui.create.dialog(caption, 'hidden');
                    var lic = ui.create.div(dialog.content);
                    lic.style.display = 'block';
                    ul.style.display = 'inline-block';
                    ul.style.marginLeft = '-40px';
                    lic.appendChild(ul);
                    if (players) {
                        for (var i = 0; i < players.length; i++) {
                            if (!lib.character[players[i]]) {
                                players.splice(i--, 1);
                            }
                        }
                        if (players.length) {
                            dialog.addSmall([players, 'character']);
                            dialog.classList.add('forcebutton');
                            dialog.classList.add('withbg');
                        }
                    }
                    if (cards) {
                        for (var i = 0; i < cards.length; i++) {
                            if (!lib.card[cards[i]]) {
                                cards.splice(i--, 1);
                            }
                        }
                        if (cards.length) {
                            for (var i = 0; i < cards.length; i++) {
                                cards[i] = [get.translation(get.type(cards[i])), '', cards[i]]
                            }
                            dialog.addSmall([cards, 'vcard']);
                            dialog.classList.add('forcebutton');
                            dialog.classList.add('withbg');
                        }
                    }
                    dialog.open();
                    var hidden = false;
                    if (!ui.auto.classList.contains('hidden')) {
                        ui.auto.hide();
                        hidden = true;
                    }
                    game.pause();
                    var control = ui.create.control('确定', function () {
                        dialog.close();
                        control.close();
                        if (hidden) ui.auto.show();
                        game.resume();
                    });
                    lib.init.onfree();
                }
            },
            showExtensionChangeLog: function (str, extname) {
                extname = extname || _status.extension;
                var cfg = 'extension_' + extname + '_changelog';
                if (lib.extensionPack[extname] && lib.extensionPack[extname].version != lib.config[cfg]) {
                    game.saveConfig(cfg, lib.extensionPack[extname].version);
                    if (!_status.extensionChangeLog) {
                        _status.extensionChangeLog = {};
                        _status.extensionChangeLog[extname] = str;
                    }
                }
            },
            /**
             * 保存配置
             * 如果有IndexedDB，使用IndexedDB；否则以`{key:lib.configprefix + 'config', value:{key:value}}`的形式存入localStorage
             * @function
             * @param {!string} key 对应的键名
             * @param {?Object} value 值，如果为虚值表示删除数据，否则添加/更新数据
             * @param {?string} local 模组名，如果指定字符串，更新模组配置(`lib.config.mode_config[local]`)，否则更新全局配置(`lib.config`)
             * @param {function():void} callback 更新完成的回调函数
             */
            saveConfig: function (key, value, local, callback) {
                if (_status.reloading) return;
                if (local) {
                    var localmode;
                    if (typeof local == 'string') {
                        localmode = local;
                    }
                    else {
                        localmode = lib.config.mode;
                    }
                    if (!lib.config.mode_config[localmode]) {
                        lib.config.mode_config[localmode] = {};
                    }
                    if (value == undefined) {
                        delete lib.config.mode_config[localmode][key];
                    }
                    else {
                        lib.config.mode_config[localmode][key] = value;
                    }
                    key += '_mode_config_' + localmode;
                }
                else {
                    if (value == undefined) {
                        delete lib.config[key];
                    }
                    else {
                        lib.config[key] = value;
                    }
                }
                if (!lib.db) {
                    var config;
                    try {
                        config = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
                        if (!config || typeof config != 'object') throw 'err'
                    }
                    catch (err) {
                        config = {};
                    }
                    if (value === undefined) {
                        delete config[key];
                    }
                    else {
                        config[key] = value;
                    }
                    localStorage.setItem(lib.configprefix + 'config', JSON.stringify(config));
                    if (callback) {
                        callback();
                    }
                }
                else {
                    if (value == undefined) {
                        game.deleteDB('config', key, callback);
                    }
                    else {
                        game.putDB('config', key, value, callback);
                    }
                }
            },
            /**
             * 持久化配置，`lib.config[key]`
             * @function
             * @param {!string} key 键名
             * @see {@link game.saveConfig}
             */
            saveConfigValue: function (key) {
                game.saveConfig(key, lib.config[key]);
            },
            /**
             * 持久化拓展的配置
             * @function
             * @param {!string} extension 拓展名
             * @param {!string} key 键名，自动拓展为`extension_${extension}_${key}`
             * @param {?Object} value
             * @see {@link game.saveConfig}
             */
            saveExtensionConfig: function (extension, key, value) {
                return game.saveConfig('extension_' + extension + '_' + key, value);
            },
            /**
             * 获取拓展的配置
             * @function
             * @param {!string} extension 拓展名
             * @param {!string} key 键名
             * @returns {?Object} 
             */
            getExtensionConfig: function (extension, key) {
                return lib.config['extension_' + extension + '_' + key];
            },
            /**
             * 于IndexedDB/localStorage中清空某个mode的配置
             * @function
             * @param {!string} mode mode名
             */
            clearModeConfig: function (mode) {
                if (_status.reloading) return;
                if (!lib.db) {
                    var config;
                    try {
                        config = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
                        if (!config || typeof config != 'object') throw 'err'
                    }
                    catch (err) {
                        config = {};
                    }
                    for (var i in config) {
                        if (i.substr(i.indexOf('_mode_config') + 13) == mode) {
                            delete config[i];
                        }
                    }
                    localStorage.setItem(lib.configprefix + 'config', JSON.stringify(config));
                    localStorage.removeItem(lib.configprefix + mode);
                }
                else {
                    game.getDB('config', null, function (config) {
                        for (var i in config) {
                            if (i.substr(i.indexOf('_mode_config') + 13) == mode) {
                                game.saveConfig(i);
                            }
                        }
                    });
                }
            },
            addPlayer: function (position, character, character2) {
                if (position < 0 || position > game.players.length + game.dead.length || position == undefined) {
                    position = Math.ceil(Math.random() * (game.players.length + game.dead.length));
                }
                var players = game.players.concat(game.dead);
                ui.arena.setNumber(players.length + 1);
                for (var i = 0; i < players.length; i++) {
                    if (parseInt(players[i].dataset.position) >= position) {
                        players[i].dataset.position = parseInt(players[i].dataset.position) + 1;
                    }
                }
                var player = ui.create.player(ui.arena).animate('start');
                if (character) player.init(character, character2);
                game.players.push(player);
                player.dataset.position = position;
                game.arrangePlayers();
                return player;
            },
            addFellow: function (position, character, animation) {
                game.addVideo('addFellow', null, [position, character, animation]);
                var player = ui.create.player(ui.arena).animate(animation || 'start');
                player.dataset.position = position || game.players.length + game.dead.length;
                player.getId();
                if (character) player.init(character);
                game.players.push(player); game.arrangePlayers();
                return player;
            },
            triggerEnter: function (player) {
                var next = game.createEvent('enterGame', false);
                next.player = player;
                next.setContent(function () {
                    Evt.trigger('enterGame');
                });
            },
            restorePlayer: function (player) {
                if (game.players.contains(player) || game.dead.contains(player)) return;
                var position = parseInt(player.dataset.position);
                if (position < 0 || position > game.players.length + game.dead.length || position == undefined) {
                    position = Math.ceil(Math.random() * (game.players.length + game.dead.length));
                }
                var players = game.players.concat(game.dead);
                ui.arena.setNumber(players.length + 1);
                for (var i = 0; i < players.length; i++) {
                    if (parseInt(players[i].dataset.position) >= position) {
                        players[i].dataset.position = parseInt(players[i].dataset.position) + 1;
                    }
                }
                game.players.push(player);
                delete player.removed;
                player.removeAttribute('style');
                player.animate('start');
                ui.arena.appendChild(player);
                game.arrangePlayers();
                return player;
            },
            removePlayer: function (player) {
                if (_status.roundStart == player) {
                    _status.roundStart = player.next || player.getNext() || game.players[0];
                }
                var players = game.players.concat(game.dead);
                player.style.left = player.getLeft() + 'px';
                player.style.top = player.getTop() + 'px';
                if (player == undefined) player = game.dead[0] || game.me.next;
                var position = parseInt(player.dataset.position);
                for (var i = 0; i < players.length; i++) {
                    if (parseInt(players[i].dataset.position) > position) {
                        players[i].dataset.position = parseInt(players[i].dataset.position) - 1;
                    }
                }
                if (player.isAlive()) {
                    player.next.previous = player.previous;
                    player.previous.next = player.next;
                }
                player.nextSeat.previousSeat = player.previousSeat;
                player.previousSeat.nextSeat = player.nextSeat;
                player.delete();
                game.players.remove(player);
                game.dead.remove(player);
                ui.arena.setNumber(players.length - 1);
                player.removed = true;
                if (player == game.me) {
                    ui.me.hide();
                    ui.auto.hide();
                    ui.wuxie.hide();
                }
                setTimeout(function () {
                    player.removeAttribute('style');
                }, 500);
                return player;
            },
            replacePlayer: function (player, character, character2) {
                player.removed = true;
                var position = parseInt(player.dataset.position);
                game.players.remove(player);
                game.dead.remove(player);
                player.delete();
                var player2 = ui.create.player(ui.arena).animate('start');
                if (character) player2.init(character, character2);
                game.players.push(player2);
                player2.dataset.position = position;
                player2.nextSeat = player.nextSeat;
                player2.previousSeat = player.previousSeat;
                player2.nextSeat.previousSeat = player2;
                player2.previousSeat.nextSeat = player2;
                var player3 = player2.nextSeat;
                while (player3.isDead()) player3 = player3.nextSeat;
                player3.previous = player2;
                player2.next = player3;
                var player4 = player2.previousSeat;
                while (player4.isDead()) player4 = player4.previousSeat;
                player4.next = player2;
                player2.previous = player4;
                if (_status.roundStart == player) {
                    _status.roundStart = player2;
                }
                return player2;
            },
            arrangePlayers: function () {
                if (game.chess && game.me) {
                    var friendCount = 0;
                    var enemyCount = 0;
                    var rand = Math.random() < 0.5;
                    for (var i = 0; i < game.players.length; i++) {
                        if (game.players[i].side == game.me.side) {
                            if (rand) {
                                if (game.players[i] == game.friendZhu) {
                                    game.players[i]._sortCount = -2;
                                }
                                else {
                                    game.players[i]._sortCount = 2 * friendCount;
                                }
                            }
                            else {
                                if (game.players[i] == game.friendZhu) {
                                    game.players[i]._sortCount = -1;
                                }
                                else {
                                    game.players[i]._sortCount = 2 * friendCount + 1;
                                }
                            }
                            friendCount++;
                        }
                        else {
                            if (rand) {
                                if (game.players[i] == game.enemyZhu) {
                                    game.players[i]._sortCount = -1;
                                }
                                else {
                                    game.players[i]._sortCount = 2 * enemyCount + 1;
                                }
                            }
                            else {
                                if (game.players[i] == game.enemyZhu) {
                                    game.players[i]._sortCount = -2;
                                }
                                else {
                                    game.players[i]._sortCount = 2 * enemyCount;
                                }
                            }
                            enemyCount++;
                        }
                    }
                    game.players.sort(function (a, b) {
                        return a._sortCount - b._sortCount;
                    });
                    for (var i = 0; i < game.players.length; i++) {
                        delete game.players[i]._sortCount;
                    }
                }
                else {
                    game.players.sort(lib.sort.position);
                }
                var players = game.players.concat(game.dead);
                players.sort(lib.sort.position);
                for (var i = 0; i < players.length; i++) {
                    if (i == 0) {
                        players[i].previousSeat = players[players.length - 1];
                    }
                    else {
                        players[i].previousSeat = players[i - 1];
                    }
                    if (i == players.length - 1) {
                        players[i].nextSeat = players[0];
                    }
                    else {
                        players[i].nextSeat = players[i + 1];
                    }
                }
                for (var i = 0; i < game.players.length; i++) {
                    if (i == 0) {
                        game.players[i].previous = game.players[game.players.length - 1];
                    }
                    else {
                        game.players[i].previous = game.players[i - 1];
                    }
                    if (i == game.players.length - 1) {
                        game.players[i].next = game.players[0];
                    }
                    else {
                        game.players[i].next = game.players[i + 1];
                    }
                }
            },
            /**
             * 检测一组技能，返回其中未失效的技能
             * @param {!Array<string>} skills 技能名数组
             * @param {!HTMLDivElement} player 检测角色
             * @param {?Function} exclude 用于筛选的函数
             * @returns {Array<string>} 排除失效技能的数组
             */
            filterSkills: function (skills, player, exclude) {
                let out = skills.slice(0);
                for (let i in player.disabledSkills) {
                    out.remove(i);
                }
                if (player.storage.skill_blocker && player.storage.skill_blocker.length) {
                    for (let i = 0; i < out.length; i++) {
                        if ((!exclude || !exclude.contains(out[i])) && get.is.blocked(out[i], player)) out.splice(i--, 1);
                    }
                }
                return out;
            },
            /**
             * 对一组技能进行展开，得到由其中每个技能和其子技能组成的数组，返回展开后的技能名数组
             * @param {!Array<string>} skills 技能名数组
             * @returns {Array<string>} 包含子技能的技能名数组
             */
            expandSkills: function (skills) {
                var skills2 = [];
                for (var i = 0; i < skills.length; i++) {
                    var info = get.info(skills[i]);
                    if (info) {
                        if (info.group) skills2 = skills2.concat(info.group);
                    }
                    else {
                        console.log(skills[i]);
                    }
                }
                for (var i = 0; i < skills2.length; i++) {
                    skills.add(skills2[i]);
                }
                return skills;
            },
            css: function (style) {
                for (var i in style) {
                    if (ui.style[i]) ui.style[i].innerHTML = i + JSON.stringify(style[i]).replace(/"/g, "");
                    else {
                        ui.style[i] = document.createElement('style');
                        ui.style[i].innerHTML = i + JSON.stringify(style[i]).replace(/"/g, "");
                        document.head.appendChild(ui.style[i]);
                    }
                }
            },
            players: [],
            dead: [],
            imported: [],
            playerMap: {},
            phaseNumber: 0,
            roundNumber: 0,
            shuffleNumber: 0,
            /**检测类game方法 */
            ...require('@m/_game_detect'),
            /**联机类game方法 */
            ...require('@m/_game_connect'),
        }
    }
}