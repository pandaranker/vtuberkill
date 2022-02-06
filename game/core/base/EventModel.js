var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_context"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _context = __importStar(require("../_context"));
    const { _status, lib, game, ui, get } = _context;
    class EventModel {
        constructor(arg) {
            this.step = 0;
            this.finished = false;
            this.next = [];
            this.after = [];
            this.custom = {
                add: {},
                replace: {}
            };
            this._aiexclude = [];
            this._notrigger = [];
            this._result = {};
            this._set = [];
            this._LinkChild = [];
            this._LinkAfter = [];
            if (!arg) {
                this.finished = true;
                this.next = [];
                this.after = [];
            }
            else if (arg instanceof EventModel) {
            }
            else {
                this.name = arg;
            }
        }
        LinkParent(evt = this.parent) {
            if (!evt)
                throw (event);
            return evt;
        }
        LinkChild(evt) {
            let child = evt;
            this._LinkChild.push(child);
            child.parent = this;
            child.mounted = true;
            return child;
        }
        LinkAfter(evt) {
            let after = evt;
            this._LinkAfter.push(after);
            after._before = this;
            after.mounted = true;
            return after;
        }
        changeToZero() {
            this.num = 0;
            this.numFixed = true;
        }
        finish() {
            this.finished = true;
        }
        cancel(arg1, arg2, notrigger) {
            this.untrigger.call(this, arguments);
            this.finish();
            if (notrigger != 'notrigger') {
                this.trigger(this.name + 'Cancelled');
                if (this.player && lib.phaseName.contains(this.name))
                    this.player.getHistory('skipped').add(this.name);
            }
        }
        goto(step) {
            this.step = step - 1;
        }
        redo() {
            this.step--;
        }
        setHiddenSkill(skill) {
            if (!this.player)
                return this;
            var hidden = this.player.hiddenSkills.slice(0);
            game.expandSkills(hidden);
            if (hidden.contains(skill))
                this.set('hsskill', skill);
            return this;
        }
        set(key, value) {
            if (arguments.length == 1 && Array.isArray(arguments[0])) {
                for (var i = 0; i < arguments[0].length; i++) {
                    if (Array.isArray(arguments[0][i])) {
                        this.set(arguments[0][i][0], arguments[0][i][1]);
                    }
                }
            }
            else {
                if (typeof key != 'string') {
                    console.log('warning: using non-string object as event key');
                    console.log(key, value);
                    console.log(_status.event);
                }
                this[key] = value;
                this._set.push([key, value]);
            }
            return this;
        }
        setContent(name) {
            if (typeof name == 'function') {
                this.content = lib.init.parse(name);
            }
            else {
                if (!lib.element.content[name]._parsed) {
                    lib.element.content[name] = lib.init.parse(lib.element.content[name]);
                    lib.element.content[name]._parsed = true;
                }
                this.content = lib.element.content[name];
            }
            return this;
        }
        getLogv() {
            for (var i = 1; i <= 3; i++) {
                var event = this.getParent(i);
                if (event && event.logvid)
                    return event.logvid;
            }
            return null;
        }
        send() {
            this.player.send(function (name, args, set, event, skills) {
                game.me.applySkills(skills);
                let next = game.me[name].apply(game.me, args);
                for (var i = 0; i < set.length; i++) {
                    next.set(set[i][0], set[i][1]);
                }
                if (next._backupevent) {
                    next.backup(next._backupevent);
                }
                next._modparent = event;
                game.resume();
            }, this.name, this._args || [], this._set, get.stringifiedResult(this.parent, 3), get.skillState(this.player));
            this.player.wait();
            game.pause();
        }
        resume() {
            delete this._cardChoice;
            delete this._targetChoice;
            delete this._skillChoice;
        }
        getParent(level = 1, forced = false) {
            var parent;
            if (this._modparent && game.online) {
                parent = this._modparent;
            }
            else {
                parent = this.parent;
            }
            var toreturn = {};
            if (typeof level == 'string' && forced == true) {
                toreturn = null;
            }
            if (!parent)
                return toreturn;
            if (typeof level == 'number') {
                for (var i = 1; i < level; i++) {
                    if (!parent)
                        return toreturn;
                    parent = parent.parent;
                }
            }
            else if (typeof level == 'string') {
                for (var i = 0; i < 20; i++) {
                    if (!parent)
                        return toreturn;
                    if (parent.name == level)
                        return parent;
                    parent = parent.parent;
                }
                if (!parent)
                    return toreturn;
            }
            if (toreturn === null) {
                return null;
            }
            return parent;
        }
        getTrigger() {
            return this.getParent()._trigger;
        }
        getRand(name) {
            if (name) {
                if (!this._rand_map)
                    this._rand_map = {};
                if (!this._rand_map[name])
                    this._rand_map[name] = Math.random();
                return this._rand_map[name];
            }
            if (!this._rand)
                this._rand = Math.random();
            return this._rand;
        }
        insert(func, map) {
            let next = game.createEvent(this.name + 'Inserted', false, this);
            next.setContent(func);
            for (var i in map) {
                next.set(i, map[i]);
            }
            return next;
        }
        insertAfter(func, map) {
            let next = game.createEvent(this.name + 'Inserted', false, { next: [] });
            this.after.push(next);
            next.setContent(func);
            for (var i in map) {
                next.set(i, map[i]);
            }
            return next;
        }
        backup(skill) {
            this._backup = {
                filterButton: this.filterButton,
                selectButton: this.selectButton,
                filterTarget: this.filterTarget,
                selectTarget: this.selectTarget,
                filterCard: this.filterCard,
                selectCard: this.selectCard,
                position: this.position,
                forced: this.forced,
                fakeforce: this.fakeforce,
                _aiexclude: this._aiexclude,
                complexSelect: this.complexSelect,
                complexCard: this.complexCard,
                complexTarget: this.complexTarget,
                _cardChoice: this._cardChoice,
                _targetChoice: this._targetChoice,
                _skillChoice: this._skillChoice,
                ai1: this.ai1,
                ai2: this.ai2,
            };
            if (skill) {
                var info = get.info(skill);
                this.skill = skill;
                this._aiexclude = [];
                if (typeof info.viewAs == 'function') {
                    if (info.filterButton != undefined)
                        this.filterButton = get.filter(info.filterButton);
                    if (info.selectButton != undefined)
                        this.selectButton = info.selectButton;
                    if (info.filterTarget != undefined)
                        this.filterTarget = get.filter(info.filterTarget);
                    if (info.selectTarget != undefined)
                        this.selectTarget = info.selectTarget;
                    if (info.filterCard != undefined) {
                        if (info.ignoreMod)
                            this.ignoreMod = true;
                        this.filterCard2 = get.filter(info.filterCard);
                        this.filterCard = function (card, player, event) {
                            var evt = event || _status.event;
                            if (!evt.ignoreMod && player) {
                                var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                                if (mod != 'unchanged')
                                    return mod;
                                if (evt._backup && evt._backup.filterCard) {
                                    var cardx2 = lib.skill[evt.skill].viewAs(ui.selected.cards.concat([card]), player);
                                    if (get.is.object(cardx2)) {
                                        var cardx = get.autoViewAs(cardx2, ui.selected.cards.concat([card]));
                                        if (!get.filter(evt._backup.filterCard)(cardx, player, evt))
                                            return false;
                                    }
                                }
                            }
                            return get.filter(evt.filterCard2).apply(this, arguments);
                        };
                    }
                    if (info.selectCard != undefined)
                        this.selectCard = info.selectCard;
                    if (info.position != undefined)
                        this.position = info.position;
                    if (info.forced != undefined)
                        this.forced = info.forced;
                    if (info.complexSelect != undefined)
                        this.complexSelect = info.complexSelect;
                    if (info.complexCard != undefined)
                        this.complexCard = info.complexCard;
                    if (info.complexTarget != undefined)
                        this.complexTarget = info.complexTarget;
                    if (info.ai1 != undefined)
                        this.ai1 = info.ai1;
                    if (info.ai2 != undefined)
                        this.ai2 = info.ai2;
                }
                else if (info.viewAs) {
                    if (info.filterButton != undefined)
                        this.filterButton = get.filter(info.filterButton);
                    if (info.selectButton != undefined)
                        this.selectButton = info.selectButton;
                    if (info.filterTarget != undefined)
                        this.filterTarget = get.filter(info.filterTarget);
                    if (info.selectTarget != undefined)
                        this.selectTarget = info.selectTarget;
                    if (info.filterCard != undefined) {
                        if (info.ignoreMod)
                            this.ignoreMod = true;
                        this.filterCard2 = get.filter(info.filterCard);
                        this.filterCard = function (card, player, event) {
                            var evt = event || _status.event;
                            if (!evt.ignoreMod && player) {
                                var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                                if (mod != 'unchanged')
                                    return mod;
                                if (evt._backup && evt._backup.filterCard) {
                                    var cardx = get.autoViewAs(lib.skill[evt.skill].viewAs, ui.selected.cards.concat([card]));
                                    if (!get.filter(evt._backup.filterCard)(cardx, player, evt))
                                        return false;
                                }
                                ;
                            }
                            return get.filter(evt.filterCard2).apply(this, arguments);
                        };
                    }
                    if (info.selectCard != undefined)
                        this.selectCard = info.selectCard;
                    if (info.position != undefined)
                        this.position = info.position;
                    if (info.forced != undefined)
                        this.forced = info.forced;
                    if (info.complexSelect != undefined)
                        this.complexSelect = info.complexSelect;
                    if (info.complexCard != undefined)
                        this.complexCard = info.complexCard;
                    if (info.complexTarget != undefined)
                        this.complexTarget = info.complexTarget;
                    if (info.ai1 != undefined)
                        this.ai1 = info.ai1;
                    if (info.ai2 != undefined)
                        this.ai2 = info.ai2;
                }
                else {
                    this.filterButton = info.filterButton ? get.filter(info.filterButton) : undefined;
                    this.selectButton = info.selectButton;
                    this.filterTarget = info.filterTarget ? get.filter(info.filterTarget) : undefined;
                    this.selectTarget = info.selectTarget;
                    this.filterCard = info.filterCard ? get.filter(info.filterCard) : undefined;
                    this.selectCard = info.selectCard;
                    this.position = info.position;
                    this.forced = info.forced;
                    this.complexSelect = info.complexSelect;
                    this.complexCard = info.complexCard;
                    this.complexTarget = info.complexTarget;
                    if (info.ai1 != undefined)
                        this.ai1 = info.ai1;
                    if (info.ai2 != undefined)
                        this.ai2 = info.ai2;
                }
                delete this.fakeforce;
            }
            delete this._cardChoice;
            delete this._targetChoice;
            delete this._skillChoice;
        }
        restore() {
            if (this._backup) {
                this.filterButton = this._backup.filterButton;
                this.selectButton = this._backup.selectButton;
                this.filterTarget = this._backup.filterTarget;
                this.selectTarget = this._backup.selectTarget;
                this.filterCard = this._backup.filterCard;
                this.selectCard = this._backup.selectCard;
                this.position = this._backup.position;
                this.forced = this._backup.forced;
                this.fakeforce = this._backup.fakeforce;
                this._aiexclude = this._backup._aiexclude;
                this.complexSelect = this._backup.complexSelect;
                this.complexCard = this._backup.complexCard;
                this.complexTarget = this._backup.complexTarget;
                this.ai1 = this._backup.ai1;
                this.ai2 = this._backup.ai2;
                this._cardChoice = this._backup._cardChoice;
                this._targetChoice = this._backup._targetChoice;
                this._skillChoice = this._backup._skillChoice;
            }
            delete this.skill;
            delete this.ignoreMod;
            delete this.filterCard2;
        }
        isMine() {
            return (this.player && this.player == game.me && !_status.auto && !this.player.isMad() && !game.notMe);
        }
        isOnline() {
            return (this.player && this.player.isOnline());
        }
        notLink() {
            return this.getParent().name != '_lianhuan' && this.getParent().name != '_lianhuan2';
        }
        isPhaseUsing(player) {
            var evt = this.getParent('phaseUse');
            if (!evt || evt.name != 'phaseUse')
                return false;
            return !player || player == evt.player;
        }
        addTrigger(skill, player) {
            if (!player)
                return;
            let evt = this;
            while (true) {
                evt = evt.getParent('arrangeTrigger');
                if (!evt || evt.name != 'arrangeTrigger' || !evt.map)
                    return;
                if (typeof skill == 'string')
                    skill = [skill];
                game.expandSkills(skill);
                var filter = function (content) {
                    if (typeof content == 'string')
                        return content == triggername;
                    return content.contains(triggername);
                };
                var trigger = evt._trigger;
                var triggername = evt.triggername;
                var map = null;
                if (evt.doing && evt.doing.player == player)
                    map = evt.doing;
                else {
                    for (var i = 0; i < evt.map.length; i++) {
                        if (evt.map[i].player == player) {
                            map = evt.map[i];
                            break;
                        }
                    }
                }
                if (!map)
                    return;
                var func = function (skillx) {
                    var info = lib.skill[skillx];
                    var bool = false;
                    for (let i in info.trigger) {
                        if (filter(info.trigger[i])) {
                            bool = true;
                            break;
                        }
                    }
                    if (!bool)
                        return;
                    var priority = 0;
                    if (info.priority) {
                        priority = info.priority * 100;
                    }
                    if (info.silent) {
                        priority++;
                    }
                    if (info.equipSkill)
                        priority -= 25;
                    if (info.cardSkill)
                        priority -= 50;
                    if (info.ruleSkill)
                        priority -= 75;
                    var toadd = [skillx, player, priority];
                    if (map.list2) {
                        for (let i = 0; i < map.list2.length; i++) {
                            if (map.list2[i][0] == toadd[0] && map.list2[i][1] == toadd[1])
                                return;
                        }
                    }
                    ;
                    for (let i = 0; i < map.list.length; i++) {
                        if (map.list[i][0] == toadd[0] && map.list[i][1] == toadd[1])
                            return;
                    }
                    map.list.add(toadd);
                    map.list.sort(function (a, b) {
                        return b[2] - a[2];
                    });
                };
                for (let j = 0; j < skill.length; j++) {
                    func(skill[j]);
                }
            }
        }
        trigger(name) {
            if (_status.video)
                return;
            if ((this.name === 'gain' || this.name === 'lose') && !_status.gameDrawed)
                return;
            if (name === 'gameDrawEnd')
                _status.gameDrawed = true;
            if (name === 'gameStart') {
                if (_status.brawl && _status.brawl.gameStart) {
                    _status.brawl.gameStart();
                }
                if (lib.config.show_cardpile) {
                    ui.cardPileButton.style.display = '';
                }
                _status.gameStarted = true;
                game.showHistory();
            }
            if (!lib.hookmap[name] && !lib.config.compatiblemode)
                return;
            if (!game.players || !game.players.length)
                return;
            var event = this;
            var start = false;
            var starts = [_status.currentPhase, event.source, event.player, game.me, game.players[0]];
            for (var i = 0; i < starts.length; i++) {
                if (get.itemtype(starts[i]) == 'player') {
                    start = starts[i];
                    break;
                }
            }
            if (!start)
                return;
            if (!game.players.contains(start)) {
                start = game.findNext(start);
            }
            var list = [];
            var list2 = [];
            var mapx = [];
            var allbool = false;
            var roles = ['player', 'source', 'target'];
            var listAdded;
            var addList = function (skill, player, mapxx) {
                if (listAdded[skill])
                    return;
                if (player.forbiddenSkills[skill])
                    return;
                if (player.disabledSkills[skill])
                    return;
                listAdded[skill] = true;
                var info = lib.skill[skill];
                var num = 0;
                if (info.priority) {
                    num = info.priority * 100;
                }
                if (info.silent) {
                    num++;
                }
                if (info.equipSkill)
                    num -= 30;
                if (info.ruleSkill)
                    num -= 30;
                if (info.firstDo) {
                    list.push([skill, player, num]);
                    list.sort(function (a, b) {
                        return b[2] - a[2];
                    });
                    allbool = true;
                    return;
                }
                else if (info.lastDo) {
                    list2.push([skill, player, num]);
                    list2.sort(function (a, b) {
                        return b[2] - a[2];
                    });
                    allbool = true;
                    return;
                }
                mapxx.list.push([skill, player, num]);
                mapxx.list.sort(function (a, b) {
                    return b[2] - a[2];
                });
                allbool = true;
            };
            var totalPopulation = game.players.length + game.dead.length + 1;
            var player = start;
            var globalskill = 'global_' + name;
            var map = _status.connectMode ? lib.playerOL : game.playerMap;
            for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                var id = player.playerid;
                var mapxx = {
                    player: player,
                    list: [],
                    list2: [],
                };
                listAdded = {};
                var notemp = player.skills.slice(0);
                for (var j in player.additionalSkills) {
                    if (j.indexOf('hidden:') != 0)
                        notemp.addArray(player.additionalSkills[j]);
                }
                for (var j in player.tempSkills) {
                    if (notemp.contains(j))
                        return;
                    var expire = player.tempSkills[j];
                    if (expire === name ||
                        (Array.isArray(expire) && expire.contains(name)) ||
                        (typeof expire === 'function' && expire(event, player, name))) {
                        delete player.tempSkills[j];
                        player.removeSkill(j);
                    }
                    else if (get.objtype(expire) === 'object') {
                        for (var i = 0; i < roles.length; i++) {
                            if (expire[roles[i]] && player === event[roles[i]] &&
                                (expire[roles[i]] === name || (Array.isArray(expire[roles[i]]) && expire[roles[i]].contains(name)))) {
                                delete player.tempSkills[j];
                                player.removeSkill(j);
                            }
                        }
                    }
                }
                if (lib.config.compatiblemode) {
                    (function () {
                        var skills = player.getSkills(true).concat(lib.skill.global);
                        game.expandSkills(skills);
                        for (var i = 0; i < skills.length; i++) {
                            var info = get.info(skills[i]);
                            if (info && info.trigger) {
                                var trigger = info.trigger;
                                var add = false;
                                if (trigger.player) {
                                    if (typeof trigger.player === 'string') {
                                        if (trigger.player === name)
                                            add = true;
                                    }
                                    else if (trigger.player.contains(name))
                                        add = true;
                                }
                                if (trigger.target) {
                                    if (typeof trigger.target === 'string') {
                                        if (trigger.target === name)
                                            add = true;
                                    }
                                    else if (trigger.target.contains(name))
                                        add = true;
                                }
                                if (trigger.source) {
                                    if (typeof trigger.source === 'string') {
                                        if (trigger.source === name)
                                            add = true;
                                    }
                                    else if (trigger.source.contains(name))
                                        add = true;
                                }
                                if (trigger.global) {
                                    if (typeof trigger.global === 'string') {
                                        if (trigger.global === name)
                                            add = true;
                                    }
                                    else if (trigger.global.contains(name))
                                        add = true;
                                }
                                if (add) {
                                    addList(skills[i], player, mapxx);
                                }
                            }
                        }
                    }());
                }
                else {
                    for (let i = 0; i < roles.length; i++) {
                        var triggername = player.playerid + '_' + roles[i] + '_' + name;
                        if (lib.hook[triggername]) {
                            for (let j = 0; j < lib.hook[triggername].length; j++) {
                                addList(lib.hook[triggername][j], player, mapxx);
                            }
                        }
                        triggername = roles[i] + '_' + name;
                        if (lib.hook.globalskill[triggername]) {
                            for (let j = 0; j < lib.hook.globalskill[triggername].length; j++) {
                                addList(lib.hook.globalskill[triggername][j], player, mapxx);
                            }
                        }
                    }
                    if (lib.hook.globalskill[globalskill]) {
                        for (let j = 0; j < lib.hook.globalskill[globalskill].length; j++) {
                            addList(lib.hook.globalskill[globalskill][j], player, mapxx);
                        }
                    }
                    for (let i in lib.hook.globaltrigger[name]) {
                        if (map[i] === player) {
                            for (let j = 0; j < lib.hook.globaltrigger[name][i].length; j++) {
                                addList(lib.hook.globaltrigger[name][i][j], map[i], mapxx);
                            }
                        }
                    }
                }
                mapx.push(mapxx);
                player = player.nextSeat;
                if (!player || player === start) {
                    break;
                }
            }
            if (allbool) {
                let next = game.createEvent('arrangeTrigger', false, event);
                next.setContent('arrangeTrigger');
                next.list = list;
                next.list2 = list2;
                next.map = mapx;
                next._trigger = event;
                next.triggername = name;
                event._triggering = next;
            }
        }
        untrigger(all, player) {
            var evt = this._triggering;
            if (all) {
                if (evt && evt.map) {
                    for (var i = 0; i < evt.map.length; i++) {
                        evt.map[i].list = [];
                    }
                    evt.list = [];
                    if (evt.doing)
                        evt.doing.list = [];
                }
                ;
                this._triggered = 5;
            }
            else {
                if (player) {
                    this._notrigger.add(player);
                    if (!evt || !evt.map)
                        return;
                    for (var i = 0; i < evt.map.length; i++) {
                        if (evt.map[i].player == player)
                            evt.map[i].list.length = 0;
                    }
                }
            }
        }
    }
    exports.default = EventModel;
});
