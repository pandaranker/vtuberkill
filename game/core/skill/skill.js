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
    let commonSkill = (({ _status, lib, game, ui, get, ai }) => {
        return {
            _shengjie: {
                enable: 'phaseUse',
                usable: 1,
                filter: function (event, player) {
                    return player.canShengjie(player.getCards('h'));
                },
                content: function () {
                    'step 0';
                    player.chooseShengjie(player.getCards('h'));
                    'step 1';
                    if (result.bool) {
                        player.lose(result.cards, ui.discardPile, 'visible');
                        player.$throw(result.cards);
                        game.log(player, '将', result.cards, '置入了弃牌堆');
                        event.star = result.star;
                    }
                    if (!result.bool) {
                        var skill = player.getStat().skill;
                        skill._shengjie--;
                        if (typeof skill._shengjietried == 'number') {
                            skill._shengjietried++;
                        }
                        else {
                            skill._shengjietried = 1;
                        }
                    }
                    'step 2';
                    if (event.star) {
                        player.gain(event.star, 'gain2').gaintag.add('_shengjie');
                    }
                },
                ai: {
                    basic: {
                        order: 6
                    },
                    result: {
                        player: function (player) {
                            if (player.getStat().skill._shengjietried >= 10) {
                                return 0;
                            }
                            return 0;
                        }
                    }
                }
            },
            _yingbian: {
                trigger: { player: 'useCard1' },
                forced: true,
                popup: false,
                firstDo: true,
                ruleSkill: true,
                forceLoad: true,
                filter: function (event, player) {
                    if (event.card.yingbian)
                        return false;
                    var bool = player.hasSkillTag('forceYingbian');
                    var card = event.card;
                    if (get.cardtag(card, 'yingbian_kongchao') && (!player.countCards('h') || bool))
                        return true;
                    if (get.cardtag(card, 'yingbian_canqu') && (player.hp == 1 || bool))
                        return true;
                    if (get.cardtag(card, 'yingbian_fujia') && (player.isMaxHandcard() || bool))
                        return true;
                    if (get.cardtag(card, 'yingbian_zhuzhan'))
                        return true;
                    return false;
                },
                content: function () {
                    'step 0';
                    var card = trigger.card;
                    event.card = card;
                    var bool = false;
                    if (get.cardtag(card, 'yingbian_kongchao') && !player.countCards('h')) {
                        player.popup('空巢', 'soil');
                        bool = true;
                    }
                    else if (get.cardtag(card, 'yingbian_canqu') && player.hp == 1) {
                        player.popup('残躯', 'fire');
                        bool = true;
                    }
                    else if (get.cardtag(card, 'yingbian_fujia') && player.isMaxHandcard()) {
                        player.popup('富甲', 'orange');
                        bool = true;
                    }
                    else if (player.hasSkillTag('forceYingbian')) {
                        player.popup('应变', 'metal');
                        bool = true;
                    }
                    if (bool) {
                        game.log(player, '触发了', card, '的应变条件');
                        event.goto(10);
                    }
                    'step 1';
                    event._global_waiting = true;
                    event.send = function (player, card, source, targets, id, id2, skillState) {
                        if (skillState) {
                            player.applySkills(skillState);
                        }
                        var type = get.type2(card);
                        var str = get.translation(source);
                        if (targets && targets.length) {
                            str += '对';
                            str += get.translation(targets);
                        }
                        str += '使用了';
                        var next = player.chooseCard({
                            filterCard: function (card) {
                                return get.type2(card) == type && lib.filter.cardDiscardable.apply(this, arguments);
                            },
                            prompt: str += (get.translation(card) + '，是否弃置一张' + get.translation(type) + '为其助战？'),
                            position: 'h',
                            _global_waiting: true,
                            id: id,
                            id2: id2,
                            ai: function (cardx) {
                                var info = get.info(card);
                                if (info && info.ai && info.ai.yingbian) {
                                    var ai = info.ai.yingbian(card, source, targets, player);
                                    if (!ai)
                                        return 0;
                                    return ai - get.value(cardx);
                                }
                                else if (get.attitude(player, source) <= 0)
                                    return 0;
                                return 5 - get.value(cardx);
                            },
                        });
                        if (game.online) {
                            _status.event._resultid = id;
                            game.resume();
                        }
                    };
                    'step 2';
                    var type = get.type2(card);
                    var list = game.filterPlayer(function (current) {
                        if (current == player)
                            return false;
                        if (!current.countCards('h'))
                            return false;
                        return _status.connectMode || current.countCards('h', function (cardx) {
                            return get.type2(cardx) == type;
                        });
                    });
                    event.list = list;
                    event.id = get.id();
                    list.sort(function (a, b) {
                        return get.distance(event.source, a, 'absolute') - get.distance(event.source, b, 'absolute');
                    });
                    'step 3';
                    if (event.list.length == 0) {
                        event.finish();
                        return;
                    }
                    else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) {
                        event.goto(5);
                    }
                    else {
                        event.current = event.list.shift();
                        event.send(event.current, event.card, player, trigger.targets, event.id, trigger.parent.id);
                    }
                    'step 4';
                    if (result.bool) {
                        event.zhuzhanresult = event.current;
                        event.zhuzhanresult2 = result;
                        if (event.current != game.me)
                            game.delayx();
                        event.goto(9);
                    }
                    else {
                        event.goto(3);
                    }
                    'step 5';
                    var id = event.id;
                    var sendback = function (result, player) {
                        if (result && result.id == id && !event.zhuzhanresult && result.bool) {
                            event.zhuzhanresult = player;
                            event.zhuzhanresult2 = result;
                            game.broadcast('cancel', id);
                            if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) {
                                return (function () {
                                    event.resultOL = _status.event.resultOL;
                                    ui.click.cancel();
                                    if (ui.confirm)
                                        ui.confirm.close();
                                });
                            }
                        }
                        else {
                            if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) {
                                return (function () {
                                    event.resultOL = _status.event.resultOL;
                                });
                            }
                        }
                    };
                    var withme = false;
                    var withol = false;
                    var list = event.list;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].isOnline()) {
                            withol = true;
                            list[i].wait(sendback);
                            list[i].send(event.send, list[i], event.card, player, trigger.targets, event.id, trigger.parent.id, get.skillState(list[i]));
                            list.splice(i--, 1);
                        }
                        else if (list[i] == game.me) {
                            withme = true;
                            event.send(list[i], event.card, player, trigger.targets, event.id, trigger.parent.id);
                            list.splice(i--, 1);
                        }
                    }
                    if (!withme) {
                        event.goto(7);
                    }
                    if (_status.connectMode) {
                        if (withme || withol) {
                            for (var i = 0; i < game.players.length; i++) {
                                if (game.players[i] != player)
                                    game.players[i].showTimer();
                            }
                        }
                    }
                    event.withol = withol;
                    'step 6';
                    if (result && result.bool && !event.zhuzhanresult) {
                        game.broadcast('cancel', event.id);
                        event.zhuzhanresult = game.me;
                        event.zhuzhanresult2 = result;
                    }
                    'step 7';
                    if (event.withol && !event.resultOL) {
                        game.pause();
                    }
                    'step 8';
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].hideTimer();
                    }
                    'step 9';
                    if (event.zhuzhanresult) {
                        var target = event.zhuzhanresult;
                        target.line(player, 'green');
                        target.discard(event.zhuzhanresult2.cards);
                        target.popup('助战', 'wood');
                        game.log(target, '响应了', player, '发起的助战');
                        target.addExpose(0.2);
                    }
                    else
                        event.finish();
                    'step 10';
                    trigger.card.yingbian = true;
                    var info = get.info(trigger.card);
                    if (info && info.yingbian)
                        info.yingbian(trigger);
                    player.addTempSkill('yingbian_changeTarget');
                },
            },
            yingbian_changeTarget: {
                trigger: { player: 'useCard2' },
                forced: true,
                popup: false,
                filter: function (event, player) {
                    if (event.yingbian_removeTarget && event.targets && event.targets.length > 1)
                        return true;
                    if (!event.yingbian_addTarget)
                        return false;
                    var info = get.info(event.card);
                    if (info.allowMultiple == false)
                        return false;
                    if (event.targets && !info.multitarget) {
                        if (game.hasPlayer(function (current) {
                            return !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
                        })) {
                            return true;
                        }
                    }
                    return false;
                },
                content: function () {
                    'step 0';
                    if (trigger.yingbian_addTarget)
                        player.chooseTarget('应变：是否为' + get.translation(trigger.card) + '增加一个目标？', function (card, player, target) {
                            var trigger = _status.event.getTrigger();
                            var card = trigger.card;
                            return !trigger.targets.contains(target) && lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
                        }).set('ai', function (target) {
                            var player = _status.event.player;
                            var card = _status.event.getTrigger().card;
                            return get.effect(target, card, player, player);
                        });
                    else
                        event.goto(2);
                    'step 1';
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        game.log(player, '发动应变效果，令', target, '也成为了', trigger.card, '的目标');
                        trigger.targets.add(target);
                    }
                    'step 2';
                    if (trigger.yingbian_removeTarget && trigger.targets.length > 1)
                        player.chooseTarget('应变：是否为' + get.translation(trigger.card) + '减少一个目标？', function (card, player, target) {
                            var trigger = _status.event.getTrigger();
                            return trigger.targets.contains(target);
                        }).set('ai', function (target) {
                            var player = _status.event.player;
                            var card = _status.event.getTrigger().card;
                            return -get.effect(target, card, player, player);
                        });
                    else
                        event.finish();
                    'step 3';
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        game.log(player, '发动应变效果，将', target, '从', trigger.card, '的目标中移除了');
                        trigger.targets.remove(target);
                    }
                },
            },
            _showHiddenCharacter: {
                trigger: { player: ['changeHp', 'phaseBeginStart', 'loseMaxHpBegin'] },
                firstDo: true,
                forced: true,
                popup: false,
                priority: 25,
                filter: function (event, player, name) {
                    return player.isUnseen(2) && get.mode() != 'guozhan';
                },
                content: function () {
                    player.showCharacter(2);
                    player.removeSkill('g_hidden_ai');
                },
            },
            _kamisha: {
                trigger: { source: 'damageBegin2' },
                popup: false,
                prompt: function (event, player) {
                    return '是否防止即将对' + get.translation(event.player) + '造成的伤害，改为令其减少' + get.cnNumber(event.num) + '点体力上限？';
                },
                filter: function (event, player) {
                    return event.nature == 'kami' && event.num > 0;
                },
                ruleSkill: true,
                check: function (event, player) {
                    var att = get.attitude(player, event.player);
                    if (event.player.hp == event.player.maxHp)
                        return att < 0;
                    if (event.player.hp == event.player.maxHp - 1 &&
                        (event.player.maxHp <= 3 || event.player.hasSkillTag('maixie')))
                        return att < 0;
                    return att > 0;
                },
                content: function () {
                    trigger.cancel();
                    trigger.player.loseMaxHp(trigger.num).source = player;
                },
            },
            _oceansha: {
                trigger: { source: 'damageBegin4' },
                forced: true,
                priority: 7,
                logTarget: 'player',
                equipSkill: false,
                ruleSkill: true,
                filter: function (event, player) {
                    return event.nature == 'ocean' && event.num > 0 && event.player.hujia > 0;
                },
                ruleSkill: true,
                content: function () {
                    trigger.num++;
                    trigger.oceanAddDam = true;
                },
            },
            _yamisha: {
                trigger: { player: 'useCardToPlayered' },
                forced: true,
                priority: 7,
                logTarget: 'target',
                equipSkill: false,
                ruleSkill: true,
                filter: function (event, player) {
                    return event.card.nature == 'yami' && event.target.countCards('h') > player.countCards('h');
                },
                ruleSkill: true,
                content: function () {
                    trigger.getParent().directHit.add(trigger.target);
                    trigger.getParent().yamiDirect = true;
                },
            },
            _yamisha2: {
                trigger: { player: 'phaseJieshu' },
                priority: 1,
                popup: false,
                forced: true,
                ruleSkill: true,
                filter: function (event, player) {
                    if (event.getParent().noyami)
                        return false;
                    if (event.player.hasSkillTag('playernoyami', false, event))
                        return false;
                    return game.countPlayer(function (cur) {
                        return cur.hasYami();
                    });
                },
                content: function () {
                    'step 0';
                    event.target = trigger.player;
                    event.state = true;
                    event._global_waiting = true;
                    event.filterCard = function (card, player) {
                        if (get.nature(card) != 'yami')
                            return false;
                        return lib.filter.cardEnabled(card, player, 'forceEnable');
                    };
                    event.send = function (player, state, target, id, skillState) {
                        if (skillState) {
                            player.applySkills(skillState);
                        }
                        state = state ? 1 : -1;
                        var str = '';
                        if (target) {
                            str += '在' + get.translation(target);
                        }
                        str += '的结束阶段，是否对其使用暗影属性的牌？';
                        var next = player.chooseToUse({
                            filterCard: function (card, player) {
                                if (get.nature(card) != 'yami')
                                    return false;
                                return player.canUse(card, target, false);
                            },
                            filterTarget: target,
                            prompt: str,
                            type: 'yami',
                            state: state,
                            _global_waiting: true,
                            ai1: function () {
                                if (target) {
                                    var triggerevent = _status.event.getTrigger();
                                    if (triggerevent && triggerevent.parent &&
                                        triggerevent.parent.postAi &&
                                        triggerevent.player.isUnknown(_status.event.player)) {
                                        return 0;
                                    }
                                    if (Math.abs(get.attitude(_status.event.player, target)) < 0)
                                        return Math.random() - 0.2;
                                }
                                else {
                                    return 0;
                                }
                            },
                            id: id,
                        });
                        if (event.stateplayer && event.statecard)
                            next.set('respondTo', [event.stateplayer]);
                        if (game.online) {
                            _status.event._resultid = id;
                            game.resume();
                        }
                        else {
                            next.nouse = true;
                        }
                    };
                    event.settle = function () {
                        event.finish();
                    };
                    'step 1';
                    var list = game.filterPlayer(function (current) {
                        if (current == event.target)
                            return false;
                        if (event.noyami)
                            return false;
                        if (event.directHit && event.directHit.contains(current))
                            return false;
                        return current.hasYami();
                    });
                    event.list = list;
                    event.id = get.id();
                    list.sort(function (a, b) {
                        return get.distance(event.target, a, 'absolute') - get.distance(event.target, b, 'absolute');
                    });
                    'step 2';
                    if (event.list.length == 0) {
                        event.settle();
                    }
                    else if (_status.connectMode && (event.list[0].isOnline() || event.list[0] == game.me)) {
                        event.goto(4);
                    }
                    else {
                        event.current = event.list.shift();
                        event.send(event.current, event.state, event.target, event.id);
                    }
                    'step 3';
                    if (result.bool) {
                        event.yamiresult = event.current;
                        event.yamiresult2 = result;
                        event.goto(8);
                    }
                    else {
                        event.goto(2);
                    }
                    'step 4';
                    var id = event.id;
                    var sendback = function (result, player) {
                        if (result && result.id == id && !event.yamiresult && result.bool) {
                            event.yamiresult = player;
                            event.yamiresult2 = result;
                            game.broadcast('cancel', id);
                            if (_status.event.id == id && _status.event.name == 'chooseToUse' && _status.paused) {
                                return (function () {
                                    event.resultOL = _status.event.resultOL;
                                    ui.click.cancel();
                                    if (ui.confirm)
                                        ui.confirm.close();
                                });
                            }
                        }
                        else {
                            if (_status.event.id == id && _status.event.name == 'chooseToUse' && _status.paused) {
                                return (function () {
                                    event.resultOL = _status.event.resultOL;
                                });
                            }
                        }
                    };
                    var withme = false;
                    var withol = false;
                    var list = event.list;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].isOnline()) {
                            withol = true;
                            list[i].wait(sendback);
                            list[i].send(event.send, list[i], event.state, event.target, event.id, get.skillState(list[i]));
                            list.splice(i--, 1);
                        }
                        else if (list[i] == game.me) {
                            withme = true;
                            event.send(list[i], event.state, event.target, event.id);
                            list.splice(i--, 1);
                        }
                    }
                    if (!withme) {
                        event.goto(6);
                    }
                    if (_status.connectMode) {
                        if (withme || withol) {
                            for (var i = 0; i < game.players.length; i++) {
                                game.players[i].showTimer();
                            }
                        }
                    }
                    event.withol = withol;
                    'step 5';
                    if (result && result.bool && !event.yamiresult) {
                        game.broadcast('cancel', event.id);
                        event.yamiresult = game.me;
                        event.yamiresult2 = result;
                    }
                    'step 6';
                    if (event.withol && !event.resultOL) {
                        game.pause();
                    }
                    'step 7';
                    for (var i = 0; i < game.players.length; i++) {
                        game.players[i].hideTimer();
                    }
                    'step 8';
                    if (event.yamiresult) {
                        var next = event.yamiresult.useResult(event.yamiresult2);
                        if (event.stateplayer)
                            next.respondTo = [event.stateplayer, event];
                    }
                    'step 9';
                    if (event.yamiresult) {
                        if (result) {
                            event.goto(1);
                        }
                        else
                            event.settle();
                    }
                    else if (event.list.length) {
                        event.goto(2);
                    }
                    else {
                        event.settle();
                    }
                    delete event.resultOL;
                    delete event.yamiresult;
                    delete event.yamiresult2;
                }
            },
            aozhan: {
                charlotte: true,
                mod: {
                    targetEnabled: function (card) {
                        if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card'))
                            return false;
                    },
                    cardSavable: function (card) {
                        if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card'))
                            return false;
                    },
                },
                group: ["aozhan_sha", "aozhan_shan"],
                subSkill: {
                    sha: {
                        enable: ["chooseToUse", "chooseToRespond"],
                        filterCard: {
                            name: "tao",
                        },
                        viewAs: {
                            name: "sha",
                            isCard: true,
                        },
                        viewAsFilter: function (player) {
                            if (!player.countCards('hs', 'tao'))
                                return false;
                        },
                        position: 'hs',
                        prompt: "将一张桃当杀使用或打出",
                        check: function () { return 1; },
                        ai: {
                            respondSha: true,
                            skillTagFilter: function (player) {
                                if (!player.countCards('hs', 'tao'))
                                    return false;
                            },
                            order: function () {
                                return get.order({ name: 'sha' }) - 0.1;
                            },
                        },
                        sub: true,
                    },
                    shan: {
                        enable: ["chooseToRespond", "chooseToUse"],
                        filterCard: {
                            name: "tao",
                        },
                        viewAs: {
                            name: "shan",
                            isCard: true,
                        },
                        prompt: "将一张桃当闪打出",
                        check: function () { return 1; },
                        viewAsFilter: function (player) {
                            if (!player.countCards('hs', 'tao'))
                                return false;
                        },
                        position: 'hs',
                        ai: {
                            respondShan: true,
                            skillTagFilter: function (player) {
                                if (!player.countCards('hs', 'tao'))
                                    return false;
                            },
                        },
                        sub: true,
                    },
                },
            },
            global: [],
            globalmap: {},
            storage: {},
            undist: {},
            others: {},
            zhu: {},
            zhuSkill: {},
            land_used: {},
            unequip: { ai: { unequip: true } },
            subplayer: {
                trigger: { player: 'dieBefore' },
                forced: true,
                priority: -9,
                onremove: true,
                mark: 'character',
                intro: {
                    content: function (storage, player) {
                        if (typeof storage.intro2 == 'string')
                            return storage.intro2;
                        if (typeof storage.intro2 == 'function')
                            return storage.intro2(storage, player);
                        return '死亡前切换回主武将';
                    },
                    name: function (storage) {
                        return get.rawName(storage.name);
                    }
                },
                content: function () {
                    trigger.cancel();
                    var evt = trigger.getParent('damage');
                    if (evt.player == player) {
                        evt.untrigger(false, player);
                    }
                    player.exitSubPlayer(true);
                },
                ai: {
                    nosave: true
                }
            },
            autoswap: {
                firstDo: true,
                trigger: {
                    player: ['playercontrol', 'chooseToUseBegin', 'chooseToRespondBegin', 'chooseToDiscardBegin', 'chooseToCompareBegin',
                        'chooseButtonBegin', 'chooseCardBegin', 'chooseTargetBegin', 'chooseCardTargetBegin', 'chooseControlBegin',
                        'chooseBoolBegin', 'choosePlayerCardBegin', 'discardPlayerCardBegin', 'gainPlayerCardBegin']
                },
                forced: true,
                priority: 100,
                forceDie: true,
                popup: false,
                filter: function (event, player) {
                    if (event.autochoose && event.autochoose())
                        return false;
                    if (lib.filter.wuxieSwap(event))
                        return false;
                    if (_status.auto || !player.isUnderControl())
                        return false;
                    return true;
                },
                content: function () {
                    game.swapPlayerAuto(player);
                },
            },
            dualside: {
                subSkill: {
                    turn: {
                        trigger: { player: ['turnOverAfter', 'dieBefore'] },
                        silent: true,
                        filter: function (event, player) {
                            if (player.storage.dualside_over)
                                return false;
                            return Array.isArray(player.storage.dualside);
                        },
                        content: function () {
                            var cfg = player.storage.dualside;
                            var bool = player.isTurnedOver();
                            if (trigger.name == 'die') {
                                bool = !bool;
                            }
                            if (bool) {
                                cfg[1] = player.hp;
                                cfg[2] = player.maxHp;
                                player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
                                player.unmarkSkill('dualside');
                                player.markSkillCharacter('dualside', { name: cfg[0] }, '正面', '当前体力：' + cfg[1] + '/' + cfg[2]);
                            }
                            else {
                                cfg[4] = player.hp;
                                cfg[5] = player.maxHp;
                                player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
                                player.unmarkSkill('dualside');
                                player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
                            }
                            if (trigger.name == 'die') {
                                trigger.cancel();
                                delete player.storage.dualside;
                                player.storage.dualside_over = true;
                                player.unmarkSkill('dualside');
                            }
                        }
                    },
                    init: {
                        trigger: { global: 'gameStart', player: 'enterGame' },
                        silent: true,
                        content: function () {
                            var list = [player.name, player.name1, player.name2];
                            for (var i = 0; i < list.length; i++) {
                                if (list[i] && lib.character[list[i]]) {
                                    var info = lib.character[list[i]];
                                    if (info[3].contains('dualside') && info[4]) {
                                        player.storage.dualside = [list[i], player.hp, player.maxHp];
                                        for (var j = 0; j < info[4].length; j++) {
                                            if (info[4][j].indexOf('dualside:') == 0) {
                                                var name2 = info[4][j].slice(9);
                                                var info2 = lib.character[name2];
                                                player.storage.dualside.push(name2);
                                                player.storage.dualside.push(get.infoHp(info2[2]));
                                                player.storage.dualside.push(get.infoMaxHp(info2[2]));
                                            }
                                        }
                                    }
                                }
                            }
                            var cfg = player.storage.dualside;
                            if (get.mode() == 'guozhan') {
                                if (player.name1 == cfg[0]) {
                                    player.showCharacter(0);
                                }
                                else {
                                    player.showCharacter(1);
                                }
                            }
                            player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
                        }
                    }
                },
                group: ['dualside_init', 'dualside_turn']
            },
            _disableJudge: {
                marktext: "废",
                intro: {
                    content: "已经废除了判定区",
                },
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (target.storage._disableJudge && get.type(card) == 'delay')
                            return false;
                    },
                },
            },
            "_disableEquip": {
                marktext: "废",
                intro: {
                    content: function (storage, player, skill) {
                        var str = '';
                        for (var i = 0; i < player.storage.disableEquip.length; i++) {
                            str += '、' + get.translation(player.storage.disableEquip[i]) + '栏';
                        }
                        ;
                        str = str.slice(1, str.length);
                        str = '已经废除了' + str;
                        return str;
                    },
                },
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (target.isDisabled(get.subtype(card)))
                            return false;
                    },
                },
                trigger: {
                    player: ['disableEquipBefore', 'enableEquipBefore', 'enterGame'],
                    global: 'gameStart',
                },
                forced: true,
                popup: false,
                filter: function (event, player) {
                    return player.storage.disableEquip == undefined;
                },
                content: function () {
                    player.storage.disableEquip = [];
                },
            },
            fengyin: {
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                },
                charlotte: true,
                skillBlocker: function (skill, player) {
                    return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        var list = player.getSkills(null, false, false).filter(function (i) {
                            return lib.skill.fengyin.skillBlocker(i, player);
                        });
                        if (list.length)
                            return '失效技能：' + get.translation(list);
                        return '无失效技能';
                    }
                }
            },
            baiban: {
                init: function (player, skill) {
                    player.addSkillBlocker(skill);
                },
                onremove: function (player, skill) {
                    player.removeSkillBlocker(skill);
                },
                charlotte: true,
                skillBlocker: function (skill, player) {
                    return !lib.skill[skill].charlotte;
                },
                mark: true,
                intro: {
                    content: function (storage, player, skill) {
                        var list = player.getSkills(null, false, false).filter(function (i) {
                            return lib.skill.baiban.skillBlocker(i, player);
                        });
                        if (list.length)
                            return '失效技能：' + get.translation(list);
                        return '无失效技能';
                    }
                }
            },
            qianxing: {
                mark: true,
                nopop: true,
                init: function (player) {
                    game.log(player, '获得了', '【潜行】');
                },
                intro: {
                    content: '锁定技，你不能成为其他角色的卡牌的目标'
                },
                mod: {
                    targetEnabled: function (card, player, target) {
                        if (player != target)
                            return false;
                    }
                }
            },
            mianyi: {
                trigger: { player: 'damageBefore' },
                mark: true,
                forced: true,
                init: function (player) {
                    game.log(player, '获得了', '【免疫】');
                },
                content: function () {
                    trigger.cancel();
                },
                ai: {
                    noyami: true,
                    nofire: true,
                    nothunder: true,
                    noocean: true,
                    nodamage: true,
                    effect: {
                        target: function (card, player, target, current) {
                            if (get.tag(card, 'damage'))
                                return [0, 0];
                        }
                    },
                },
                intro: {
                    content: '防止一切伤害'
                }
            },
            mad: {
                mark: true,
                locked: true,
                intro: {
                    content: '已进入混乱状态',
                    name: '混乱',
                    onunmark: function (storage, player) {
                        game.log(player, '解除混乱状态');
                    }
                }
            },
            ghujia: {
                intro: {
                    content: function (content, player) {
                        return '已有' + get.cnNumber(player.hujia) + '点护甲值';
                    }
                }
            },
            counttrigger: {
                trigger: { global: 'phaseAfter' },
                silent: true,
                charlotte: true,
                priority: -100,
                content: function () {
                    player.removeSkill('counttrigger');
                    delete player.storage.counttrigger;
                }
            },
            _recovercheck: {
                trigger: { player: 'recoverBefore' },
                forced: true,
                priority: 100,
                firstDo: true,
                popup: false,
                filter: function (event, player) {
                    return player.hp >= player.maxHp;
                },
                content: function () {
                    trigger.cancel();
                },
            },
            _turnover: {
                trigger: { player: 'phaseBefore' },
                forced: true,
                priority: 100,
                popup: false,
                firstDo: true,
                content: function () {
                    'step 0';
                    if ((player == _status.roundStart || _status.roundSkipped) && !trigger.skill) {
                        event.trigger('roundEnd');
                    }
                    'step 1';
                    if (player.isTurnedOver()) {
                        trigger.cancel();
                        player.turnOver();
                        player.phaseSkipped = true;
                    }
                    else {
                        player.phaseSkipped = false;
                    }
                    'step 2';
                    if ((player == _status.roundStart || _status.roundSkipped) && !trigger.skill) {
                        delete _status.roundSkipped;
                        game.roundNumber++;
                        trigger._roundStart = true;
                        game.updateRoundNumber();
                        for (var i = 0; i < game.players.length; i++) {
                            if (game.players[i].isOut() && game.players[i].outCount > 0) {
                                game.players[i].outCount--;
                                if (game.players[i].outCount == 0 && !game.players[i].outSkills) {
                                    game.players[i].in();
                                }
                            }
                        }
                        event.trigger('roundStart');
                    }
                },
            },
            _usecard: {
                trigger: { global: 'useCardAfter' },
                forced: true,
                popup: false,
                priority: -100,
                lastDo: true,
                filter: function (event) {
                    return !event._cleared && event.card.name != 'wuxie';
                },
                content: function () {
                    game.broadcastAll(function () {
                        ui.clear();
                    });
                    event._cleared = true;
                }
            },
            _discard: {
                trigger: { global: 'discardAfter' },
                forced: true,
                popup: false,
                priority: -100,
                lastDo: true,
                filter: function (event) {
                    return ui.todiscard[event.discardid] ? true : false;
                },
                content: function () {
                    game.broadcastAll(function (id) {
                        var todiscard = ui.todiscard[id];
                        delete ui.todiscard[id];
                        if (todiscard) {
                            var time = 1000;
                            if (typeof todiscard._discardtime == 'number') {
                                time += todiscard._discardtime - get.time();
                            }
                            if (time < 0) {
                                time = 0;
                            }
                            setTimeout(function () {
                                for (var i = 0; i < todiscard.length; i++) {
                                    todiscard[i].delete();
                                }
                            }, time);
                        }
                    }, trigger.discardid);
                }
            },
            _save: {
                priority: 5,
                forced: true,
                popup: false,
                filter: function (event, player) {
                    return false;
                },
                content: function () {
                    "step 0";
                    event.dying = trigger.player;
                    if (!event.acted)
                        event.acted = [];
                    "step 1";
                    if (trigger.player.isDead()) {
                        event.finish();
                        return;
                    }
                    event.acted.push(player);
                    var str = get.translation(trigger.player) + '濒死，是否帮助？';
                    var str2 = '当前体力：' + trigger.player.hp;
                    if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && !event.dying.hasSkillTag('revertsave')) {
                        event._result = { bool: false };
                    }
                    else if (player.canSave(event.dying)) {
                        player.chooseToUse({
                            filterCard: function (card, player, event) {
                                event = event || _status.event;
                                return lib.filter.cardSavable(card, player, event.dying);
                            },
                            filterTarget: trigger.player,
                            prompt: str,
                            prompt2: str2,
                            ai1: function (card) {
                                if (typeof card == 'string') {
                                    var info = get.info(card);
                                    if (info.ai && info.ai.order) {
                                        if (typeof info.ai.order == 'number') {
                                            return info.ai.order;
                                        }
                                        else if (typeof info.ai.order == 'function') {
                                            return info.ai.order();
                                        }
                                    }
                                }
                                return 1;
                            },
                            ai2: get.effect_use,
                            type: 'dying',
                            targetRequired: true,
                            dying: event.dying
                        });
                    }
                    else {
                        event._result = { bool: false };
                    }
                    "step 2";
                    if (result.bool) {
                        if (trigger.player.hp <= 0 && !trigger.player.nodying && trigger.player.isAlive() && !trigger.player.isOut() && !trigger.player.removed)
                            event.goto(0);
                        else
                            trigger.untrigger();
                    }
                    else {
                        for (var i = 0; i < 20; i++) {
                            if (event.acted.contains(event.player.next)) {
                                break;
                            }
                            else {
                                event.player = event.player.next;
                                if (!event.player.isOut()) {
                                    event.goto(1);
                                    break;
                                }
                            }
                        }
                    }
                }
            },
            _ismin: {
                mod: {
                    cardEnabled: function (card, player) {
                        if (player.isMin()) {
                            if (get.type(card) == 'equip')
                                return false;
                        }
                    }
                }
            },
            _chongzhu: {
                enable: 'phaseUse',
                logv: false,
                visible: true,
                prompt: '将要重铸的牌置入弃牌堆并摸一张牌',
                filter: function (event, player) {
                    return player.hasCard(function (card) {
                        return lib.skill._chongzhu.filterCard(card, player);
                    });
                },
                filterCard: function (card, player) {
                    var mod = game.checkMod(card, player, 'unchanged', 'cardChongzhuable', player);
                    if (mod != 'unchanged')
                        return mod;
                    var info = get.info(card);
                    if (typeof info.chongzhu == 'function') {
                        return info.chongzhu(event, player);
                    }
                    return info.chongzhu;
                },
                prepare: function (cards, player) {
                    player.$throw(cards, 1000);
                    game.log(player, '将', cards, '置入了弃牌堆');
                },
                check: function (card) {
                    return 1;
                },
                discard: false,
                loseTo: 'discardPile',
                delay: 0.5,
                content: function () {
                    "step 0";
                    if (lib.config.mode == 'stone' && _status.mode == 'deck' &&
                        !player.isMin() && get.type(cards[0]).indexOf('stone') == 0) {
                        var list = get.stonecard(1, player.career);
                        if (list.length) {
                            player.gain(game.createCard(list.randomGet()), 'draw');
                        }
                        else {
                            player.draw({ drawDeck: 1 });
                        }
                    }
                    else if (get.subtype(cards[0]) == 'spell_gold') {
                        var list = get.libCard(function (info) {
                            return info.subtype == 'spell_silver';
                        });
                        if (list.length) {
                            player.gain(game.createCard(list.randomGet()), 'draw');
                        }
                        else {
                            player.draw();
                        }
                    }
                    else if (get.subtype(cards[0]) == 'spell_silver') {
                        var list = get.libCard(function (info) {
                            return info.subtype == 'spell_bronze';
                        });
                        if (list.length) {
                            player.gain(game.createCard(list.randomGet()), 'draw');
                        }
                        else {
                            player.draw();
                        }
                    }
                    else {
                        player.draw();
                    }
                },
                ai: {
                    basic: {
                        order: 6
                    },
                    result: {
                        player: 1,
                    },
                }
            },
            _lianhuan: {
                trigger: { player: 'damageAfter' },
                filter: function (event, player) {
                    return event.lianhuanable == true;
                },
                forced: true,
                popup: false,
                logv: false,
                forceDie: true,
                content: function () {
                    "step 0";
                    event.logvid = trigger.getLogv();
                    "step 1";
                    event.targets = game.filterPlayer(function (current) {
                        return current != event.player && current.isLinked();
                    });
                    lib.tempSortSeat = _status.currentPhase || player;
                    event.targets.sort(lib.sort.seat);
                    delete lib.tempSortSeat;
                    event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
                    if (trigger.source)
                        event._args.push(trigger.source);
                    else
                        event._args.push("nosource");
                    "step 2";
                    if (event.targets.length) {
                        var target = event.targets.shift();
                        if (target.isLinked())
                            target.damage.apply(target, event._args.slice(0));
                        event.redo();
                    }
                },
            },
            _lianhuan4: {
                trigger: { player: 'changeHp' },
                priority: -10,
                forced: true,
                popup: false,
                forceDie: true,
                filter: function (event, player) {
                    var evt = event.getParent();
                    return evt && evt.name == 'damage' && evt.nature && lib.linked.contains(evt.nature) && player.isLinked();
                },
                content: function () {
                    var overNature = trigger.getParent().oceanAddDam || false;
                    if (trigger.getParent(2).type == 'card' && get.nature(trigger.getParent(2).card) == 'yami' && trigger.getParent(3).yamiDirect)
                        overNature = true;
                    if (!overNature) {
                        player.link();
                        if (trigger.getParent().notLink())
                            trigger.getParent().lianhuanable = true;
                    }
                }
            }
        };
    })(_context);
    exports.default = commonSkill;
});
