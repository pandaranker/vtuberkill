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
    /**
     * 内容方法，setContent所调用的方法，即事件的具体内容
     * 状态机
     * @name commonContent
     * @namespace
     * @global
     */
    let commonContent = (({ _status, lib, game, ui, get, ai }) => {
        return {
            resetRound: function () {
                var skill = event.resetSkill || event.name.slice(0, event.name.indexOf('_roundcount'));
                if (!player || !lib.skill[skill])
                    return;
                var roundname = skill + '_roundcount';
                if (player.storage[roundname] > 0) {
                    player.storage[roundname]--;
                }
                if (player.storage[roundname] > 0) {
                    player.updateMarks();
                }
                else {
                    player.unmarkSkill(roundname);
                }
            },
            //崭新出炉
            chooseShengjie: function () {
                'step 0';
                var list = [];
                if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length)
                    event.finish();
                for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
                    var info = lib.card[lib.cardPack.mode_derivation[i]];
                    if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials)))
                        list.push(lib.cardPack.mode_derivation[i]);
                }
                if (event.filterProduct)
                    list = list.filter(event.filterProduct);
                event.list = list;
                'step 1';
                var next = player.chooseButton([event.prompt, [event.list, 'vcard'], '素材区', [event.materials, 'card'], 'hidden'], event.forced);
                next.set('filterButton', function (button) {
                    var ub = ui.selected.buttons;
                    if (get.itemtype(button.link) == 'card') {
                        if (!ub.length)
                            return false;
                        var card = button.link;
                        var scards = ub.slice(1).map(function (scard) {
                            return scard.link;
                        });
                        var product = ub[0].link[2];
                        scards = scards.filter(function (scard) {
                            return get.itemtype(scard) == 'card';
                        });
                        if (_status.event.filterMaterial && !_status.event.filterMaterial(button.link, scards))
                            return false;
                        var filter = get.info({ name: product }).materials;
                        if (Array.isArray(filter)) {
                            if (filter.length > scards.length) {
                                var mate = filter.slice(0);
                                var smate = [];
                                for (var j = 0; j < mate.length; j++) {
                                    for (var k of scards) {
                                        if (!smate.contains(k)) {
                                            if (get.is.filterCardBy(k, mate[j])) {
                                                smate.push(k);
                                                mate.splice(j--, 1);
                                            }
                                        }
                                    }
                                }
                                for (var j = 0; j < mate.length; j++) {
                                    if (get.is.filterCardBy(card, mate[j])) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        }
                        return true;
                    }
                    if (ub.length)
                        return false;
                    return true;
                });
                next.set('selectButton', function () {
                    var ub = ui.selected.buttons;
                    if (ub.length) {
                        var scards = ub.slice(1).map(function (scard) {
                            return scard.link;
                        });
                        var product = ub[0].link[2];
                        var filter = get.info({ name: product }).materials;
                        if (Array.isArray(filter)) {
                            if (filter.length == scards.length) {
                                var mate = filter.slice(0);
                                for (var j = 0; j < mate.length; j++) {
                                    for (var k of scards) {
                                        if (get.is.filterCardBy(k, mate[j])) {
                                            mate.splice(j--, 1);
                                        }
                                    }
                                }
                                if (mate.length == 0)
                                    return ub.length;
                            }
                        }
                    }
                    return [ub.length + 1, ub.length + 2];
                });
                next.set('filterMaterial', event.filterMaterial);
                'step 2';
                if (result.bool) {
                    var cards = result.links.slice(1);
                    var star = game.createCard2(result.links[0][2], get.suit3(cards).randomGet(), 14);
                    event.result = {
                        bool: true,
                        cards: cards,
                        materials: cards,
                        star: star,
                    };
                }
                else
                    event.result = { bool: false };
            },
            emptyEvent: function () {
                event.trigger(event.name);
            },
            showCharacter: function () {
                'step 0';
                event.trigger('showCharacterEnd');
                'step 1';
                event.trigger('showCharacterAfter');
                if (get.mode() == 'identity' && player.isZhu)
                    event.trigger('zhuUpdate');
            },
            removeCharacter: function () {
                player.$removeCharacter(event.num);
            },
            chooseUseTarget: function () {
                'step 0';
                if (get.is.object(card) && !event.viewAs)
                    card.isCard = true;
                if (cards && get.itemtype(card) != 'card') {
                    card = get.copy(card);
                    card.cards = cards.slice(0);
                    event.card = card;
                }
                if (!lib.filter.cardEnabled(card, player) || (event.addCount !== false && !lib.filter.cardUsable(card, player))) {
                    event.result = { bool: false };
                    event.finish();
                    return;
                }
                var info = get.info(card);
                var range;
                if (!info.notarget) {
                    var select = get.copy(info.selectTarget);
                    if (select == undefined) {
                        range = [1, 1];
                    }
                    else if (typeof select == 'number')
                        range = [select, select];
                    else if (get.itemtype(select) == 'select')
                        range = select;
                    else if (typeof select == 'function')
                        range = select(card, player);
                    game.checkMod(card, player, range, 'selectTarget', player);
                }
                if (info.notarget || range[1] == -1) {
                    if (!info.notarget && range[1] == -1) {
                        for (var i = 0; i < targets.length; i++) {
                            if (!player.canUse(card, targets[i], event.nodistance ? false : null, event.addCount === false ? null : true)) {
                                targets.splice(i--, 1);
                            }
                        }
                        if (targets.length) {
                            event.targets2 = targets;
                        }
                        else {
                            event.finish();
                            return;
                        }
                    }
                    else
                        event.targets2 = [];
                    if (event.forced) {
                        event._result = { bool: true };
                    }
                    else {
                        var next = player.chooseBool();
                        next.set('prompt', event.prompt || ('是否' + (event.targets2.length ? '对' : '') + get.translation(event.targets2) + '使用' + get.translation(card) + '?'));
                        if (event.hsskill)
                            next.setHiddenSkill(event.hsskill);
                        if (event.prompt2)
                            next.set('prompt2', event.prompt2);
                        next.ai = function () {
                            var eff = 0;
                            for (var i = 0; i < event.targets2.length; i++) {
                                eff += get.effect(event.targets2[i], card, player, player);
                            }
                            return eff > 0;
                        };
                    }
                }
                else {
                    var next = player.chooseTarget();
                    next.set('_get_card', card);
                    next.set('filterTarget', function (card, player, target) {
                        if (!_status.event.targets.contains(target))
                            return false;
                        if (!_status.event.nodistance && !lib.filter.targetInRange(card, player, target))
                            return false;
                        return lib.filter.targetEnabledx(card, player, target);
                    });
                    next.set('ai', event.ai || get.effect_use);
                    next.set('selectTarget', event.selectTarget || lib.filter.selectTarget);
                    if (event.nodistance)
                        next.set('nodistance', true);
                    if (event.forced)
                        next.set('forced', true);
                    if (event.addCount !== false)
                        next.set('addCount_extra', true);
                    next.set('targets', targets);
                    next.set('prompt', event.prompt || ('选择' + get.translation(card) + '的目标'));
                    if (event.prompt2)
                        next.set('prompt2', event.prompt2);
                    if (event.hsskill)
                        next.setHiddenSkill(event.hsskill);
                }
                'step 1';
                if (result.bool) {
                    event.result = {
                        bool: true,
                        targets: event.targets2 || result.targets,
                    };
                    var next = player.useCard(card, event.targets2 || result.targets);
                    next.oncard = event.oncard;
                    if (cards)
                        next.cards = cards.slice(0);
                    if (event.nopopup)
                        next.nopopup = true;
                    if (event.animate === false)
                        next.animate = false;
                    if (event.throw === false)
                        next.throw = false;
                    if (event.addCount === false)
                        next.addCount = false;
                    if (event.noTargetDelay)
                        next.targetDelay = false;
                    if (event.nodelayx)
                        next.delayx = false;
                    if (event.logSkill) {
                        if (typeof event.logSkill == 'string') {
                            next.skill = event.logSkill;
                        }
                        else if (Array.isArray(event.logSkill)) {
                            player.logSkill.apply(player, event.logSkill);
                        }
                    }
                }
                else
                    event.result = { bool: false };
            },
            chooseToDuiben: function () {
                'step 0';
                game.log(player, '对', target, '发起了', '#y对策');
                if (_status.connectMode) {
                    player.chooseButtonOL([
                        [player, ['对策：请选择一种防御对策', [[['', '', 'db_def2'], ['', '', 'db_def1']], 'vcard']], true],
                        [target, ['对策：请选择一种进攻之策', [[['', '', 'db_atk1'], ['', '', 'db_atk2']], 'vcard']], true]
                    ], function () { }, function () { return 1 + Math.random(); }).set('switchToAuto', function () {
                        _status.event.result = 'ai';
                    }).set('processAI', function () {
                        var buttons = _status.event.dialog.buttons;
                        return {
                            bool: true,
                            links: [buttons.randomGet().link],
                        };
                    });
                }
                'step 1';
                if (_status.connectMode) {
                    event.mes = result[player.playerid].links[0][2];
                    event.tes = result[target.playerid].links[0][2];
                    event.goto(4);
                }
                else {
                    player.chooseButton(['对策：请选择一种防御对策', [[['', '', 'db_def2'], ['', '', 'db_def1']], 'vcard']], true).ai = function () { return 1 + Math.random(); };
                }
                'step 2';
                event.mes = result.links[0][2];
                target.chooseButton(['对策：请选择一种进攻之策', [[['', '', 'db_atk1'], ['', '', 'db_atk2']], 'vcard']], true).ai = function () { return 1 + Math.random(); };
                'step 3';
                event.tes = result.links[0][2];
                'step 4';
                game.broadcast(function () {
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                target.$compare(game.createCard(event.tes, '', ''), player, game.createCard(event.mes, '', ''));
                game.log(target, '选择的进攻之策为', '#g' + get.translation(event.tes));
                game.log(player, '选择的防御对策为', '#g' + get.translation(event.mes));
                game.delay(0, 1500);
                'step 5';
                var mes = event.mes.slice(6);
                var tes = event.tes.slice(6);
                var str;
                if (mes == tes) {
                    str = get.translation(player) + '对策成功';
                    player.popup('胜', 'wood');
                    target.popup('负', 'fire');
                    game.log(player, '#g胜');
                    event.result = { bool: true };
                }
                else {
                    str = get.translation(player) + '对策失败';
                    target.popup('胜', 'wood');
                    player.popup('负', 'fire');
                    game.log(target, '#g胜');
                    event.result = { bool: false };
                }
                game.broadcastAll(function (str) {
                    var dialog = ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function () {
                        dialog.close();
                    }, 1000);
                }, str);
                game.delay(2);
                'step 6';
                game.broadcastAll(function () {
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if (event.clear !== false) {
                    game.broadcastAll(ui.clear);
                }
            },
            chooseToPSS: function () {
                'step 0';
                game.log(player, '对', target, '发起了猜拳');
                if (_status.connectMode) {
                    player.chooseButtonOL([
                        [player, ['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true],
                        [target, ['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true]
                    ], function () { }, function () { return 1 + Math.random(); }).set('switchToAuto', function () {
                        _status.event.result = 'ai';
                    }).set('processAI', function () {
                        var buttons = _status.event.dialog.buttons;
                        return {
                            bool: true,
                            links: [buttons.randomGet().link],
                        };
                    });
                }
                'step 1';
                if (_status.connectMode) {
                    event.mes = result[player.playerid].links[0][2];
                    event.tes = result[target.playerid].links[0][2];
                    event.goto(4);
                }
                else {
                    player.chooseButton(['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true).ai = function () { return 1 + Math.random(); };
                }
                'step 2';
                event.mes = result.links[0][2];
                target.chooseButton(['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true).ai = function () { return 1 + Math.random(); };
                'step 3';
                event.tes = result.links[0][2];
                'step 4';
                game.broadcast(function () {
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                player.$compare(game.createCard(event.mes, '', ''), target, game.createCard(event.tes, '', ''));
                game.log(player, '选择的手势为', '#g' + get.translation(event.mes));
                game.log(target, '选择的手势为', '#g' + get.translation(event.tes));
                game.delay(0, 1500);
                'step 5';
                var mes = event.mes.slice(4);
                var tes = event.tes.slice(4);
                var str;
                if (mes == tes) {
                    str = '二人平局';
                    player.popup('平', 'metal');
                    target.popup('平', 'metal');
                    game.log('猜拳的结果为', '#g平局');
                    event.result = { tie: true };
                }
                else {
                    if ({ paper: 'stone', scissor: 'paper', stone: 'scissor' }[mes] == tes) {
                        str = get.translation(player) + '胜利';
                        player.popup('胜', 'wood');
                        target.popup('负', 'fire');
                        game.log(player, '#g胜');
                        event.result = { bool: true, winner: mes };
                    }
                    else {
                        str = get.translation(target) + '胜利';
                        target.popup('胜', 'wood');
                        player.popup('负', 'fire');
                        game.log(target, '#g胜');
                        event.result = { bool: false, winner: tes };
                    }
                }
                game.broadcastAll(function (str) {
                    var dialog = ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function () {
                        dialog.close();
                    }, 1000);
                }, str);
                game.delay(2);
                'step 6';
                game.broadcastAll(function () {
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if (event.clear !== false) {
                    game.broadcastAll(ui.clear);
                }
            },
            cardsDiscard: function () {
                game.getGlobalHistory().cardMove.push(event);
                for (var i = 0; i < cards.length; i++) {
                    cards[i].discard();
                }
            },
            orderingDiscard: function () {
                var cards = event.relatedEvent.orderingCards;
                for (var i = 0; i < cards.length; i++) {
                    if (get.position(cards[i], true) != 'o')
                        cards.splice(i--, 1);
                }
                if (cards.length)
                    game.cardsDiscard(cards);
            },
            cardsGotoOrdering: function () {
                game.getGlobalHistory().cardMove.push(event);
                for (var i = 0; i < cards.length; i++) {
                    cards[i].fix();
                    ui.ordering.appendChild(cards[i]);
                }
                var evt = event.relatedEvent || event.getParent();
                if (!evt.orderingCards)
                    evt.orderingCards = [];
                if (!event.noOrdering && !event.cardsOrdered) {
                    event.cardsOrdered = true;
                    var next = game.createEvent('orderingDiscard', false, evt.getParent());
                    next.relatedEvent = evt;
                    next.setContent('orderingDiscard');
                }
                if (!event.noOrdering)
                    evt.orderingCards.addArray(cards);
            },
            cardsGotoSpecial: function () {
                game.getGlobalHistory().cardMove.push(event);
                for (var i = 0; i < cards.length; i++) {
                    cards[i].fix();
                    ui.special.appendChild(cards[i]);
                }
                if (event.notrigger !== true)
                    event.trigger('addCardToStorage');
            },
            chooseToEnable: function () {
                'step 0';
                var list = [];
                for (var i = 1; i < 6; i++) {
                    if (!player.isDisabled(i))
                        continue;
                    list.push('equip' + i);
                }
                if (!list.length)
                    event.finish();
                else {
                    event.list = list;
                    var next = player.chooseControl(list);
                    next.set('prompt', '请选择恢复一个装备栏');
                    if (!event.ai)
                        event.ai = function (event, player, list) {
                            return list.randomGet();
                        };
                    event.ai = event.ai(event.getParent(), player, list);
                    next.ai = function () {
                        return event.ai;
                    };
                }
                'step 1';
                event.result = { control: result.control };
                player.enableEquip(result.control);
            },
            chooseToDisable: function () {
                'step 0';
                var list = [];
                for (var i = 1; i < 7; i++) {
                    if ((i == 3 || i == 4) && event.horse)
                        continue;
                    if (i == 6 && !event.horse)
                        continue;
                    if (player.isDisabled(i))
                        continue;
                    list.push('equip' + i);
                }
                if (!list.length)
                    event.finish();
                else {
                    event.list = list;
                    var next = player.chooseControl(list);
                    next.set('prompt', '请选择废除一个装备栏');
                    if (!event.ai)
                        event.ai = function (event, player, list) {
                            return list.randomGet();
                        };
                    event.ai = event.ai(event.getParent(), player, list);
                    next.ai = function () {
                        return event.ai;
                    };
                }
                'step 1';
                event.result = { control: result.control };
                if (result.control == 'equip6') {
                    player.disableEquip(3);
                    player.disableEquip(4);
                }
                else
                    player.disableEquip(result.control);
            },
            swapEquip: function () {
                "step 0";
                game.log(player, '和', target, '交换了装备区中的牌');
                var e1 = player.getCards('e');
                var todis1 = [];
                for (var i = 0; i < e1.length; i++) {
                    if (target.isDisabled(get.subtype(e1[i])))
                        todis1.push(e1[i]);
                }
                player.discard(todis1);
                var e2 = target.getCards('e');
                var todis2 = [];
                for (var i = 0; i < e2.length; i++) {
                    if (player.isDisabled(get.subtype(e2[i])))
                        todis2.push(e2[i]);
                }
                target.discard(todis2);
                "step 1";
                event.cards = [player.getCards('e'), target.getCards('e')];
                player.lose(event.cards[0], ui.ordering, 'visible');
                target.lose(event.cards[1], ui.ordering, 'visible');
                if (event.cards[0].length)
                    player.$give(event.cards[0], target, false);
                if (event.cards[1].length)
                    target.$give(event.cards[1], player, false);
                "step 2";
                for (var i = 0; i < event.cards[1].length; i++) {
                    player.equip(event.cards[1][i]);
                }
                for (var i = 0; i < event.cards[0].length; i++) {
                    target.equip(event.cards[0][i]);
                }
            },
            disableEquip: function () {
                if (!player.isDisabled(event.pos)) {
                    var cards = player.getCards('e', function (card) {
                        var subtype = get.subtype(card);
                        if (subtype == event.pos)
                            return true;
                        if (subtype == 'equip6' && ['equip3', 'equip4'].contains(event.pos))
                            return true;
                        return false;
                    });
                    if (cards.length)
                        player.discard(cards).delay = false;
                    game.log(player, '废除了', get.translation(event.pos), '栏');
                    player.$disableEquip(event.pos);
                }
            },
            enableEquip: function () {
                if (player.isDisabled(event.pos)) {
                    player.syncStorage('_disableEquip');
                    game.log(player, '恢复了', get.translation(event.pos), '栏');
                    player.$enableEquip(event.pos);
                }
                ;
            },
            disableJudge: function () {
                'step 0';
                game.log(player, '废除了判定区');
                var js = player.getCards('j');
                if (js.length)
                    player.discard(js);
                player.storage._disableJudge = true;
                //player.markSkill('_disableJudge');
                'step 1';
                game.broadcastAll(function (player, card) {
                    player.$disableJudge();
                }, player);
            },
            enableJudge: function () {
                if (!player.storage._disableJudge)
                    return;
                game.log(player, '恢复了判定区');
                game.broadcastAll(function (player) {
                    player.$enableJudge();
                }, player);
            },
            /*----分界线----*/
            phasing: function () {
                'step 0';
                while (ui.dialogs.length) {
                    ui.dialogs[0].close();
                }
                if (!player.noPhaseDelay && lib.config.show_phase_prompt) {
                    player.popup('回合开始');
                }
                if (lib.config.glow_phase) {
                    if (_status.currentPhase) {
                        _status.currentPhase.classList.remove('glow_phase');
                        game.broadcast(function (player) {
                            player.classList.remove('glow_phase');
                        }, _status.currentPhase);
                    }
                    player.classList.add('glow_phase');
                    game.broadcast(function (player) {
                        player.classList.add('glow_phase');
                    }, player);
                }
                _status.currentPhase = player;
                _status.discarded = [];
                game.phaseNumber++;
                player.phaseNumber++;
                game.syncState();
                game.addVideo('phaseChange', player);
                if (game.phaseNumber == 1 && lib.configOL.observe) {
                    lib.configOL.observeReady = true;
                    game.send('server', 'config', lib.configOL);
                }
                game.log();
                game.log(player, '的回合开始');
                player._noVibrate = true;
                if (get.config('identity_mode') != 'zhong' && get.config('identity_mode') != 'purple' && !_status.connectMode) {
                    var num;
                    switch (get.config('auto_identity')) {
                        case 'one':
                            num = 1;
                            break;
                        case 'two':
                            num = 2;
                            break;
                        case 'three':
                            num = 3;
                            break;
                        case 'always':
                            num = -1;
                            break;
                        default:
                            num = 0;
                            break;
                    }
                    if (num && !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
                        if (!_status.video)
                            player.popup('显示身份');
                        _status.identityShown = true;
                        game.showIdentity(false);
                    }
                }
                player.ai.tempIgnore = [];
                _status.globalHistory.push({
                    cardMove: [],
                    custom: [],
                });
                game.countPlayer2(function (current) {
                    current.actionHistory.push({ ...lib.historyRecorder });
                    current.stat.push({ card: {}, skill: {} });
                    if (event.parent._roundStart) {
                        current.getHistory().isRound = true;
                        current.getStat().isRound = true;
                    }
                });
                player.getHistory().isMe = true;
                player.getStat().isMe = true;
                if (event.parent._roundStart) {
                    game.getGlobalHistory().isRound = true;
                }
                if (ui.land && ui.land.player == player) {
                    game.addVideo('destroyLand');
                    ui.land.destroy();
                }
                'step 1';
                event.trigger('phaseBeginStart');
            },
            /**
                * 更换随从
                * @name content.toggleSubPlayer
                * @type {GameCores.Bases.StateMachine}
                */
            toggleSubPlayer: function () {
                'step 0';
                var list = event.list || player.storage.subplayer.skills.slice(0);
                list.remove(player.storage.subplayer.name2);
                event.list = list;
                if (!event.directresult) {
                    if (list.length > 1) {
                        var dialog = ui.create.dialog('更换一个随从', 'hidden');
                        dialog.add([list, 'character']);
                        player.chooseButton(dialog, true);
                    }
                    else if (list.length == 1) {
                        event.directresult = list[0];
                    }
                    else {
                        event.finish();
                    }
                }
                else {
                    if (!list.contains(event.directresult)) {
                        event.finish();
                    }
                }
                'step 1';
                if (!event.directresult) {
                    if (result && result.bool && result.links[0]) {
                        event.directresult = result.links[0];
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                if (player.storage.subplayer) {
                    var current = player.storage.subplayer.name2;
                    if (event.directresult == current) {
                        event.finish();
                        return;
                    }
                    player.storage[current].hp = player.hp;
                    player.storage[current].maxHp = player.maxHp;
                    player.storage[current].hs = player.getCards('h');
                    player.storage[current].es = player.getCards('e');
                    player.lose(player.getCards('he'), ui.special)._triggered = null;
                    var cfg = player.storage[event.directresult];
                    player.storage.subplayer.name2 = event.directresult;
                    player.reinit(current, event.directresult, [
                        cfg.hp,
                        cfg.maxHp
                    ]);
                    if (cfg.hs.length)
                        player.directgain(cfg.hs);
                    if (cfg.es.length)
                        player.directequip(cfg.es);
                }
            },
            /**
                * 结束调遣随从
                * @name content.callSubPlayer
                * @type {GameCores.Bases.StateMachine}
                */
            exitSubPlayer: function () {
                'step 0';
                if (player.storage.subplayer) {
                    var current = player.storage.subplayer.name2;
                    if (event.remove) {
                        player.lose(player.getCards('he'), ui.discardPile)._triggered = null;
                    }
                    else {
                        player.storage[current].hp = player.hp;
                        player.storage[current].maxHp = player.maxHp;
                        player.storage[current].hs = player.getCards('h');
                        player.storage[current].es = player.getCards('e');
                        player.lose(player.getCards('he'), ui.special)._triggered = null;
                    }
                    player.reinit(current, player.storage.subplayer.name, [
                        player.storage.subplayer.hp,
                        player.storage.subplayer.maxHp
                    ]);
                    player.update();
                    if (event.remove) {
                        if (player.storage[current].onremove) {
                            player.storage[current].onremove(player);
                        }
                        delete player.storage[current];
                        player.storage.subplayer.skills.remove(current);
                        game.log(player, '牺牲了随从', '#g' + current);
                    }
                    else {
                        game.log(player, '收回了随从', '#g' + current);
                    }
                    player.addSkill(player.storage.subplayer.skills);
                }
                'step 1';
                if (player.storage.subplayer) {
                    player.directgain(player.storage.subplayer.hs);
                    player.directequip(player.storage.subplayer.es);
                }
                player.removeSkill('subplayer');
                'step 2';
                if (event.remove) {
                    event.trigger('subPlayerDie');
                }
            },
            /**
                * 调遣随从
                * @name content.callSubPlayer
                * @type {GameCores.Bases.StateMachine}
                */
            callSubPlayer: function () {
                'step 0';
                var list = player.getSubPlayers(event.tag);
                event.list = list;
                if (!event.directresult) {
                    if (list.length > 1) {
                        var dialog = ui.create.dialog('调遣一个随从', 'hidden');
                        dialog.add([list, 'character']);
                        player.chooseButton(dialog, true);
                    }
                    else if (list.length == 1) {
                        event.directresult = list[0];
                    }
                    else {
                        event.finish();
                    }
                }
                else {
                    if (!list.contains(event.directresult)) {
                        event.finish();
                    }
                }
                'step 1';
                if (!event.directresult) {
                    if (result && result.bool && result.links[0]) {
                        event.directresult = result.links[0];
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                if (event.directresult) {
                    var cfg = player.storage[event.directresult];
                    var source = cfg.source || player.name;
                    var name = event.directresult;
                    game.log(player, '调遣了随从', '#g' + name);
                    player.storage.subplayer = {
                        name: source,
                        name2: event.directresult,
                        hp: player.hp,
                        maxHp: player.maxHp,
                        skills: event.list.slice(0),
                        hs: player.getCards('h'),
                        es: player.getCards('e'),
                        intro2: cfg.intro2
                    };
                    player.removeSkill(event.list);
                    player.reinit(source, name, [cfg.hp, cfg.maxHp]);
                    player.addSkill('subplayer');
                    player.lose(player.getCards('he'), ui.special)._triggered = null;
                    if (cfg.hs.length)
                        player.directgain(cfg.hs);
                    if (cfg.es.length)
                        player.directequip(cfg.es);
                }
                'step 2';
                game.delay();
            },
            /**
                * 反转结算顺序
                * @name content.reverseOrder
                * @type {GameCores.Bases.StateMachine}
                */
            reverseOrder: function () {
                "step 0";
                game.delay();
                "step 1";
                var choice;
                if (get.tag(card, 'multineg')) {
                    choice = (player.previous.side == player.side) ? '逆时针' : '顺时针';
                }
                else {
                    choice = (player.next.side == player.side) ? '逆时针' : '顺时针';
                }
                player.chooseControl('顺时针', '逆时针', function (event, player) {
                    return _status.event.choice || '逆时针';
                }).set('prompt', '选择' + get.translation(card) + '的结算方向').set('choice', choice).set('forceDie', true);
                "step 2";
                if (result && result.control == '顺时针') {
                    var evt = event.getParent();
                    evt.fixedSeat = true;
                    evt.targets.sortBySeat();
                    evt.targets.reverse();
                    if (evt.targets[evt.targets.length - 1] == player) {
                        evt.targets.unshift(evt.targets.pop());
                    }
                }
            },
            /**
                * 使用判定牌
                * @name content.addJudgeCard
                * @type {GameCores.Bases.StateMachine}
                */
            addJudgeCard: function () {
                if (lib.filter.judge(card, player, target) && cards.length && get.position(cards[0], true) == 'o')
                    target.addJudge(card, cards);
            },
            /**
                * 使用装备牌
                * @name content.equipCard
                * @type {GameCores.Bases.StateMachine}
                */
            equipCard: function () {
                if (cards.length && get.position(cards[0], true) == 'o')
                    target.equip(card, cards[0]);
            },
            /**
                * 游戏开始前分牌
                * @name content.gameDraw
                * @type {GameCores.Bases.StateMachine}
                */
            gameDraw: function () {
                "step 0";
                if (_status.brawl && _status.brawl.noGameDraw) {
                    event.finish();
                    return;
                }
                var end = player;
                var numx = num;
                do {
                    if (typeof num == 'function') {
                        numx = num(player);
                    }
                    if (player.getTopCards)
                        player.directgain(player.getTopCards(numx));
                    else
                        player.directgain(get.cards(numx));
                    if (player.singleHp === true && get.mode() != 'guozhan' && (lib.config.mode != 'doudizhu' || _status.mode != 'online')) {
                        player.doubleDraw();
                    }
                    player = player.next;
                } while (player != end);
                event.changeCard = get.config('change_card');
                if (_status.connectMode || (lib.config.mode == 'doudizhu' && _status.mode == 'online') || lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu' && lib.config.mode != 'longlaoguan') {
                    event.changeCard = 'disabled';
                }
                "step 1";
                if (event.changeCard != 'disabled' && !_status.auto) {
                    event.dialog = ui.create.dialog('是否使用手气卡？');
                    ui.create.confirm('oc');
                    event.custom.replace.confirm = function (bool) {
                        _status.event.bool = bool;
                        game.resume();
                    };
                }
                else {
                    event.finish();
                }
                "step 2";
                if (event.changeCard == 'once') {
                    event.changeCard = 'disabled';
                }
                else if (event.changeCard == 'twice') {
                    event.changeCard = 'once';
                }
                else if (event.changeCard == 'disabled') {
                    event.bool = false;
                    return;
                }
                _status.imchoosing = true;
                event.switchToAuto = function () {
                    _status.event.bool = false;
                    game.resume();
                };
                game.pause();
                "step 3";
                _status.imchoosing = false;
                if (event.bool) {
                    if (game.changeCoin) {
                        game.changeCoin(-3);
                    }
                    var hs = game.me.getCards('h');
                    game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
                    for (var i = 0; i < hs.length; i++) {
                        hs[i].discard(false);
                    }
                    game.me.directgain(get.cards(hs.length));
                    var ss = game.me.getCards('s');
                    game.addVideo('lose', game.me, [get.cardsInfo(ss), [], [], []]);
                    for (var i = 0; i < ss.length; i++) {
                        ss[i].discard(false);
                    }
                    game.me.directgains(get.cards(ss.length));
                    event.goto(2);
                }
                else {
                    if (event.dialog)
                        event.dialog.close();
                    if (ui.confirm)
                        ui.confirm.close();
                    event.finish();
                }
            },
            /**
                * 阶段循环
                * @name content.phaseLoop
                * @type {GameCores.Bases.StateMachine}
                */
            phaseLoop: function () {
                "step 0";
                for (var i = 0; i < lib.onphase.length; i++) {
                    lib.onphase[i]();
                }
                player.phase();
                "step 1";
                if (!game.players.contains(event.player.next)) {
                    event.player = game.findNext(event.player.next);
                }
                else {
                    event.player = event.player.next;
                }
                event.goto(0);
            },
            /**
                * 加载包
                * @name content.loadPackage
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Array<Object>} event.packages 包名数组，用于加载
                * @property {string} event.packages[].0 包目录，相对`lib.assetURL`路径
                * @property {string} event.packages[].1 包名
                */
            loadPackage: function () {
                'step 0';
                if (event.packages.length) {
                    // window.game = game;//[todo delete]
                    var pack = event.packages.shift().split('/');
                    lib.init.js(lib.assetURL + pack[0], pack[1], game.resume);
                    game.pause();
                }
                else {
                    event.finish();
                }
                'step 1';
                // if (!lib.config.dev) delete window.game;//[todo delete]
                var character = lib.imported.character;
                var card = lib.imported.card;
                var i, j, k;
                for (i in character) {
                    if (character[i].character) {
                        lib.characterPack[i] = character[i].character;
                    }
                    if (character[i].forbid && character[i].forbid.contains(lib.config.mode))
                        continue;
                    if (character[i].mode && character[i].mode.contains(lib.config.mode) == false)
                        continue;
                    if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
                        lib[j].addArray(character[i][j]);
                        continue;
                    }
                    for (j in character[i]) {
                        if (j == 'mode' || j == 'forbid' || j == 'characterSort')
                            continue;
                        for (k in character[i][j]) {
                            if (j == 'character') {
                                if (!character[i][j][k][4]) {
                                    character[i][j][k][4] = [];
                                }
                                if (character[i][j][k][4].contains('boss') ||
                                    character[i][j][k][4].contains('hiddenboss')) {
                                    lib.config.forbidai.add(k);
                                }
                                if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
                                    lib.config.forbidai.add(k);
                                }
                                for (var l = 0; l < character[i][j][k][3].length; l++) {
                                    lib.skilllist.add(character[i][j][k][3][l]);
                                }
                            }
                            if (j == 'translate' && k == i) {
                                lib[j][k + '_character_config'] = character[i][j][k];
                            }
                            else {
                                if (lib[j][k] == undefined) {
                                    lib[j][k] = character[i][j][k];
                                }
                                else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
                                    lib[j][k].addArray(character[i][j][k]);
                                }
                                else {
                                    console.log('dublicate ' + j + ' in character ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + character[i][j][k]);
                                }
                            }
                        }
                    }
                }
                for (i in card) {
                    lib.cardPack[i] = [];
                    if (card[i].card) {
                        for (var j in card[i].card) {
                            if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
                                lib.cardPack[i].push(j);
                            }
                        }
                    }
                    for (j in card[i]) {
                        if (j == 'mode' || j == 'forbid')
                            continue;
                        if (j == 'list')
                            continue;
                        for (k in card[i][j]) {
                            if (j == 'skill' && k[0] == '_' && !lib.config.cards.contains(i)) {
                                continue;
                            }
                            if (j == 'translate' && k == i) {
                                lib[j][k + '_card_config'] = card[i][j][k];
                            }
                            else {
                                if (lib[j][k] == undefined)
                                    lib[j][k] = card[i][j][k];
                                else
                                    console.log('dublicate ' + j + ' in card ' + i + ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
                            }
                        }
                    }
                }
                event.goto(0);
            },
            /**
                * 加载模组
                * @name content.loadMode
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!string} event.mode 要加载的mode名
                * @property {?Object} event.result 如果加载成功返回加载的模组，如果失败则返回未指定(undefined)结果
                */
            loadMode: function () {
                'step 0';
                // window.game = game;//[todo delete]
                lib.init.js(lib.assetURL + 'mode', event.mode, game.resume);
                game.pause();
                'step 1';
                // if (!lib.config.dev) delete window.game;//[todo delete]
                event.result = lib.imported.mode[event.mode];
                delete lib.imported.mode[event.mode];
            },
            /**
                * 强制结束
                * @name content.forceOver
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {?string} event.bool 是否调用{@link game.over}，如果为'noover'，则不调用
                * @property {?function():void} [event.callback] 回调函数，在事件结束前调用
                */
            forceOver: function () {
                'step 0';
                while (ui.controls.length) {
                    ui.controls[0].close();
                }
                while (ui.dialogs.length) {
                    ui.dialogs[0].close();
                }
                'step 1';
                if (event.bool != 'noover') {
                    game.over(event.bool);
                }
                if (event.callback) {
                    event.callback();
                }
            },
            /**
                * 事件触发调度状态机
                * @name content.arrangeTrigger
                * @type {GameCores.Bases.StateMachine}
                */
            arrangeTrigger: function () {
                'step 0';
                event.filter1 = function (info) {
                    if (info[1].isDead() && !lib.skill[info[0]].forceDie)
                        return false;
                    return lib.filter.filterTrigger(trigger, info[1], event.triggername, info[0]);
                };
                event.filter2 = function (info2) {
                    var info = lib.skill[info2[0]];
                    if (!lib.translate[info2[0]] || info.popup === false || info.silent)
                        return false;
                    return true;
                };
                event.filter3 = function (info, info2) {
                    return event.filter2(info2) && event.filter1(info2) && info2[1] == info[1] && info[2] == info2[2] && (lib.skill.global.contains(info2[0]) || info[1].hasSkill(info2[0], true));
                };
                'step 1';
                if (trigger.filterStop && trigger.filterStop()) {
                    event.finish();
                }
                else if (event.list.length) {
                    var info = event.list.shift();
                    game.createTrigger(event.triggername, info[0], info[1], trigger);
                    event.redo();
                }
                'step 2';
                if (!event.map.length) {
                    if (event.list2.length) {
                        var info = event.list2.shift();
                        game.createTrigger(event.triggername, info[0], info[1], trigger);
                        event.redo();
                    }
                    else {
                        if (trigger._triggering == this) {
                            delete trigger._triggering;
                        }
                        event.finish();
                        return;
                    }
                }
                ;
                event.doing = event.map.shift();
                'step 3';
                event.num = 0;
                var bool = false;
                var list = event.doing.list;
                for (var i = 0; i < list.length; i++) {
                    if (event.filter1(list[i])) {
                        event.num = i;
                        bool = true;
                        break;
                    }
                }
                if (!bool) {
                    event.goto(2);
                    return;
                }
                var priority = list[event.num][2];
                for (var i = 0; i < event.num; i++) {
                    if (event.doing.list[i][2] > priority) {
                        event.doing.list.splice(i--, 1);
                        event.num--;
                    }
                }
                event.choice = [];
                if (event.num < event.doing.list.length - 1 && event.filter2(event.doing.list[event.num])) {
                    var current = event.doing.list[event.num];
                    event.choice.push(current);
                    for (var i = event.num + 1; i < event.doing.list.length; i++) {
                        if (event.filter3(current, event.doing.list[i]))
                            event.choice.push(event.doing.list[i]);
                    }
                }
                if (event.choice.length < 2)
                    event.goto(6);
                'step 4';
                var controls = [];
                event.current = event.choice[0][1];
                for (var i = 0; i < event.choice.length; i++) {
                    controls.push(event.choice[i][0]);
                }
                event.current.chooseControl(controls).set('prompt', '选择下一个触发的技能').set('forceDie', true).set('arrangeSkill', true);
                'step 5';
                if (result.control) {
                    for (var i = 0; i < event.doing.list.length; i++) {
                        if (event.doing.list[i][0] == result.control && event.doing.list[i][1] == event.current) {
                            event.num = i;
                            break;
                        }
                    }
                }
                'step 6';
                var info = event.doing.list[event.num];
                if (info) {
                    event.doing.list2.push(info);
                    event.doing.list.splice(event.num, 1);
                    game.createTrigger(event.triggername, info[0], info[1], trigger);
                }
                'step 7';
                if (trigger.filterStop && trigger.filterStop()) {
                    event.finish();
                }
                else
                    event.goto(event.doing.list.length ? 3 : 2);
            },
            /**
                * 检测时机并让玩家选择是否发动触发类技能
                * 创建触发器
                * @name content.createTrigger
                * @type {GameCores.Bases.StateMachine}
                */
            createTrigger: function () {
                "step 0";
                if (lib.filter.filterTrigger(trigger, player, event.triggername, event.skill)) {
                    var fullskills = game.expandSkills(player.getSkills().concat(lib.skill.global));
                    if (!fullskills.contains(event.skill)) {
                        var info = get.info(event.skill);
                        var hidden = player.hiddenSkills.slice(0);
                        game.expandSkills(hidden);
                        if (hidden.contains(event.skill)) {
                            if (!info.silent && player.hasSkillTag('nomingzhi', false, null, true)) {
                                event.finish();
                            }
                            else if (!info.direct) {
                                event.trigger('triggerHidden');
                            }
                            else {
                                event.skillHidden = true;
                            }
                        }
                        else {
                            var keep = false;
                            for (var i in player.additionalSkills) {
                                if (i.indexOf('hidden:') == 0 && game.expandSkills(player.additionalSkills[i]).contains(event.skill)) {
                                    keep = true;
                                    break;
                                }
                            }
                            if (!keep) {
                                event.finish();
                            }
                        }
                    }
                }
                else {
                    event.finish();
                }
                "step 1";
                if (event.cancelled) {
                    event.finish();
                    return;
                }
                var info = get.info(event.skill);
                if (!event.revealed && !info.forced) {
                    var checkFrequent = function (info) {
                        if (player.hasSkillTag('nofrequent', false, event.skill))
                            return false;
                        if (typeof info.frequent == 'boolean')
                            return info.frequent;
                        if (typeof info.frequent == 'function')
                            return info.frequent(trigger, player);
                        if (info.frequent == 'check' && typeof info.check == 'function')
                            return info.check(trigger, player);
                        return false;
                    };
                    if (info.direct && player.isUnderControl()) {
                        game.swapPlayerAuto(player);
                        event._result = { bool: true };
                        event._direct = true;
                    }
                    else if (info.direct) {
                        event._result = { bool: true };
                        event._direct = true;
                    }
                    else if (info.direct && player.isOnline()) {
                        event._result = { bool: true };
                        event._direct = true;
                    }
                    else {
                        if (checkFrequent(info)) {
                            event.frequentSkill = true;
                        }
                        var str;
                        var check = info.check;
                        if (info.prompt)
                            str = info.prompt;
                        else {
                            if (typeof info.logTarget == 'string') {
                                str = get.prompt(event.skill, trigger[info.logTarget], player);
                            }
                            else if (typeof info.logTarget == 'function') {
                                str = get.prompt(event.skill, info.logTarget(trigger, player), player);
                            }
                            else {
                                str = get.prompt(event.skill, null, player);
                            }
                        }
                        if (typeof str == 'function') {
                            str = str(trigger, player);
                        }
                        var next = player.chooseBool(str);
                        if (event.frequentSkill)
                            next.set('frequentSkill', event.skill);
                        next.set('forceDie', true);
                        next.ai = function () {
                            return !check || check(trigger, player);
                        };
                        if (typeof info.prompt2 == 'function') {
                            next.set('prompt2', info.prompt2(trigger, player));
                        }
                        else if (typeof info.prompt2 == 'string') {
                            next.set('prompt2', info.prompt2);
                        }
                        else if (info.prompt2 != false) {
                            if (lib.dynamicTranslate[event.skill] || lib.translate[event.skill + '_info'])
                                next.set('prompt2', get.skillInfoTranslation(event.skill, player));
                        }
                        if (trigger.skillwarn) {
                            if (next.prompt2) {
                                next.set('prompt2', '<span class="thundertext">' + trigger.skillwarn + '。</span>' + next.prompt2);
                            }
                            else {
                                next.set('prompt2', trigger.skillwarn);
                            }
                        }
                        if (info.addDialog) {
                            var createDialog = [str, 'small'];
                            if (next.prompt2)
                                createDialog.push(next.prompt2);
                            createDialog.push(info.addDialog(trigger, player));
                            next.set('createDialog', createDialog);
                        }
                    }
                }
                "step 2";
                var info = get.info(event.skill);
                if (result && result.bool != false) {
                    var autodelay = info.autodelay;
                    if (typeof autodelay == 'function') {
                        autodelay = autodelay(trigger, player);
                    }
                    if (autodelay && (info.forced || !event.isMine())) {
                        if (typeof autodelay == 'number') {
                            game.delayx(autodelay);
                        }
                        else {
                            game.delayx();
                        }
                    }
                }
                "step 3";
                var info = get.info(event.skill);
                if (result && result.bool == false) {
                    if (info.oncancel)
                        info.oncancel(trigger, player);
                    event.finish();
                    return;
                }
                var next = game.createEvent(event.skill);
                if (typeof info.usable == 'number') {
                    player.addSkill('counttrigger');
                    if (!player.storage.counttrigger) {
                        player.storage.counttrigger = {};
                    }
                    if (!player.storage.counttrigger[event.skill]) {
                        player.storage.counttrigger[event.skill] = 1;
                    }
                    else {
                        player.storage.counttrigger[event.skill]++;
                    }
                }
                next.player = player;
                next._trigger = trigger;
                next.triggername = event.triggername;
                next.setContent(info.content);
                next.skillHidden = event.skillHidden;
                if (info.forceDie)
                    next.forceDie = true;
                if (info.popup != false && !info.direct) {
                    if (info.popup) {
                        player.popup(info.popup);
                        game.log(player, '发动了', '#p『' + get.skillTranslation(event.skill, player) + '』');
                    }
                    else {
                        if (info.logTarget && info.logLine !== false) {
                            if (typeof info.logTarget == 'string') {
                                player.logSkill(event.skill, trigger[info.logTarget], info.line);
                            }
                            else if (typeof info.logTarget == 'function') {
                                player.logSkill(event.skill, info.logTarget(trigger, player), info.line);
                            }
                        }
                        else {
                            player.logSkill(event.skill, false, info.line);
                        }
                    }
                }
                "step 4";
                if (player._hookTrigger) {
                    for (var i = 0; i < player._hookTrigger.length; i++) {
                        var info = lib.skill[player._hookTrigger[i]].hookTrigger;
                        if (info) {
                            if (info.after && info.after(event, player, event.triggername)) {
                                event.trigger('triggerAfter');
                                break;
                            }
                        }
                    }
                }
            },
            /**
                * Play video
                * @name content.playVideoContent
                * @type {GameCores.Bases.StateMachine}
                */
            playVideoContent: function () {
                'step 0';
                game.delay(0, 500);
                'step 1';
                if (!game.chess) {
                    ui.control.innerHTML = '';
                    var nodes = [];
                    for (var i = 0; i < ui.arena.childNodes.length; i++) {
                        nodes.push(ui.arena.childNodes[i]);
                    }
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i] == ui.canvas)
                            continue;
                        if (nodes[i] == ui.control)
                            continue;
                        if (nodes[i] == ui.mebg)
                            continue;
                        if (nodes[i] == ui.me)
                            continue;
                        if (nodes[i] == ui.roundmenu)
                            continue;
                        nodes[i].remove();
                    }
                    ui.sidebar.innerHTML = '';
                    ui.cardPile.innerHTML = '';
                    ui.discardPile.innerHTML = '';
                    ui.special.innerHTML = '';
                    ui.ordering.innerHTML = '';
                }
                ui.system.firstChild.innerHTML = '';
                ui.system.lastChild.innerHTML = '';
                ui.system.firstChild.appendChild(ui.config2);
                if (ui.updateVideoMenu) {
                    ui.updateVideoMenu();
                }
                _status.videoDuration = 1;
                ui.create.system('返回', function () {
                    var mode = localStorage.getItem(lib.configprefix + 'playbackmode');
                    if (mode) {
                        game.saveConfig('mode', mode);
                    }
                    game.reload();
                });
                ui.create.system('重播', function () {
                    _status.replayvideo = true;
                    game.playVideo(_status.playback, lib.config.mode);
                });
                ui.create.system('暂停', ui.click.pause, true).id = 'pausebutton';
                var slow = ui.create.system('减速', function () {
                    _status.videoDuration *= 1.5;
                    updateDuration();
                }, true);
                var fast = ui.create.system('加速', function () {
                    _status.videoDuration /= 1.5;
                    updateDuration();
                }, true);
                var updateDuration = function () {
                    if (_status.videoDuration > 1) {
                        slow.classList.add('glow');
                    }
                    else {
                        slow.classList.remove('glow');
                    }
                    if (_status.videoDuration < 1) {
                        fast.classList.add('glow');
                    }
                    else {
                        fast.classList.remove('glow');
                    }
                };
                ui.system.style.display = '';
                ui.refresh(ui.system);
                ui.system.show();
                ui.window.show();
                if (lib.config.mode != 'versus' && lib.config.mode != 'boss') {
                    ui.arena.style.display = '';
                    ui.refresh(ui.arena);
                    ui.arena.show();
                }
                if (!game.chess) {
                    game.playerMap = {};
                }
                game.finishCards();
                'step 2';
                if (event.video.length) {
                    var content = event.video.shift();
                    // console.log(content);
                    if (content.type == 'delay') {
                        game.delay(content.content);
                    }
                    else if (content.type == 'play') {
                        window.play = {};
                        if (!event.playtoload) {
                            event.playtoload = 1;
                        }
                        else {
                            event.playtoload++;
                        }
                        var script = lib.init.js(lib.assetURL + 'play', content.name);
                        script.addEventListener('load', function () {
                            var play = window.play[content.name];
                            if (play && play.video) {
                                play.video(content.init);
                            }
                            event.playtoload--;
                            if (event.playtoload == 0) {
                                delete window.play;
                            }
                        });
                    }
                    else if (typeof content.player == 'string' && game.playerMap[content.player] &&
                        game.playerMap[content.player].classList &&
                        !game.playerMap[content.player].classList.contains('obstacle')) {
                        game.videoContent[content.type](game.playerMap[content.player], content.content);
                    }
                    else {
                        game.videoContent[content.type](content.content);
                    }
                    if (event.video.length) {
                        game.delay(0, _status.videoDuration * Math.min(2000, event.video[0].delay));
                    }
                    event.redo();
                }
                else {
                    _status.over = true;
                    ui.system.lastChild.hide();
                    setTimeout(function () {
                        ui.system.lastChild.innerHTML = '';
                    }, 500);
                }
            },
            /**
                * wait for player
                * @name content.waitForPlayer
                * @type {GameCores.Bases.StateMachine}
                */
            waitForPlayer: function () {
                'step 0';
                ui.auto.hide();
                ui.pause.hide();
                game.createServer();
                if (!lib.translate.zhu) {
                    lib.translate.zhu = '主';
                }
                if (event.func) {
                    event.func();
                }
                if (!lib.configOL.number) {
                    lib.configOL.number = parseInt(lib.configOL.player_number);
                }
                if (game.onlineroom) {
                    game.send('server', 'config', lib.configOL);
                }
                ui.create.connectPlayers(game.ip);
                if (!window.isNonameServer) {
                    var me = game.connectPlayers[0];
                    me.setIdentity('zhu');
                    me.initOL(get.connectNickname(), lib.config.connect_avatar);
                    me.playerid = '1';
                    game.onlinezhu = '1';
                }
                _status.waitingForPlayer = true;
                if (window.isNonameServer) {
                    document.querySelector('#server_status').innerHTML = '等待中';
                }
                game.pause();
                'step 1';
                _status.waitingForPlayer = false;
                lib.configOL.gameStarted = true;
                if (window.isNonameServer) {
                    document.querySelector('#server_status').innerHTML = '游戏中';
                }
                if (game.onlineroom) {
                    game.send('server', 'config', lib.configOL);
                }
                for (var i = 0; i < game.connectPlayers.length; i++) {
                    game.connectPlayers[i].delete();
                }
                delete game.connectPlayers;
                if (ui.roomInfo) {
                    ui.roomInfo.remove();
                    delete ui.roomInfo;
                }
                if (ui.exitroom) {
                    ui.exitroom.remove();
                    delete ui.exitroom;
                }
                game.broadcast('gameStart');
                game.delay(2);
                ui.auto.show();
                ui.pause.show();
                if (lib.config.show_cardpile) {
                    ui.cardPileButton.style.display = '';
                }
            },
            /**
                * 置换手牌(单机)
                * @name content.replaceHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            replaceHandcards: function () {
                'step 0';
                if (event.players.contains(game.me)) {
                    game.me.chooseBool('是否置换手牌？');
                }
                else {
                    event.finish();
                }
                'step 1';
                if (result && result.bool) {
                    var hs = game.me.getCards('h');
                    for (var i = 0; i < hs.length; i++) {
                        hs[i].discard(false);
                    }
                    game.me.directgain(get.cards(hs.length));
                }
            },
            /**
                * 置换手牌[support online]
                * @name content.replaceHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            replaceHandcardsOL: function () {
                'step 0';
                var send = function () {
                    game.me.chooseBool('是否置换手牌？');
                    game.resume();
                };
                var sendback = function (result, player) {
                    if (result && result.bool) {
                        var hs = player.getCards('h');
                        game.broadcastAll(function (player, hs) {
                            game.addVideo('lose', player, [get.cardsInfo(hs), [], [], []]);
                            for (var i = 0; i < hs.length; i++) {
                                hs[i].discard(false);
                            }
                        }, player, hs);
                        player.directgain(get.cards(hs.length));
                    }
                };
                for (var i = 0; i < event.players.length; i++) {
                    if (event.players[i].isOnline()) {
                        event.withol = true;
                        event.players[i].send(send);
                        event.players[i].wait(sendback);
                    }
                    else if (event.players[i] == game.me) {
                        event.withme = true;
                        game.me.chooseBool('是否置换手牌？');
                        game.me.wait(sendback);
                    }
                }
                'step 1';
                if (event.withme) {
                    game.me.unwait(result);
                }
                'step 2';
                if (event.withol && !event.resultOL) {
                    game.pause();
                }
            },
            /**
                * 一个完整的回合
                * @name content.phase
                * @type {GameCores.Bases.StateMachine}
                */
            phase: function () {
                "step 0";
                if (!event.stageList || !event.stageList.length)
                    event.stageList = lib.phaseName;
                event.stepNum = 0;
                "step 1";
                if (typeof player[event.stageList[event.stepNum]] == 'function')
                    player[event.stageList[event.stepNum]]();
                "step 2";
                if (event.stageList[event.stepNum] == 'phaseDraw') {
                    if (!player.noPhaseDelay) {
                        if (player == game.me) {
                            game.delay();
                        }
                        else {
                            game.delayx();
                        }
                    }
                }
                if (event.stageList[event.stepNum] == 'phaseUse') {
                    game.broadcastAll(function () {
                        if (ui.tempnowuxie) {
                            ui.tempnowuxie.close();
                            delete ui.tempnowuxie;
                        }
                    });
                }
                if (event.stageList[event.stepNum] == 'phaseDiscard') {
                    if (!player.noPhaseDelay)
                        game.delayx();
                    delete player._noSkill;
                }
                "step 3";
                event.trigger('phaseNext');
                if (event.stageList[++event.stepNum]) {
                    event.trigger('stepNext');
                    event.goto(1);
                }
            },
            /**
                * 判定阶段
                * @name content.phaseJudge
                * @type {GameCores.Bases.StateMachine}
                */
            phaseJudge: function () {
                "step 0";
                event.cards = player.getCards('j');
                if (!event.cards.length)
                    event.finish();
                "step 1";
                if (cards.length && player.getCards('j').contains(cards[0])) {
                    event.card = cards.shift();
                    if (event.card.classList.contains('removing')) {
                        event.card.remove();
                        delete event.card;
                        event.redo();
                    }
                    else if (event.card.classList.contains('feichu')) {
                        event.finish();
                        return;
                    }
                    else {
                        player.lose(event.card, 'visible', ui.ordering);
                        player.$phaseJudge(event.card);
                        event.cancelled = false;
                        event.trigger('phaseJudge');
                        var name = event.card.viewAs || event.card.name;
                        player.popup(name, 'thunder');
                        if (!lib.card[name].effect) {
                            game.delay();
                            event.redo();
                        }
                        else if (!lib.card[name].judge) {
                            game.delay();
                            event.nojudge = true;
                        }
                    }
                }
                else
                    event.finish();
                "step 2";
                if (!event.cancelled && !event.nojudge)
                    player.judge(event.card).set('type', 'phase');
                "step 3";
                var name = event.card.viewAs || event.card.name;
                if (event.cancelled && !event.direct) {
                    if (lib.card[name].cancel) {
                        var next = game.createEvent(name + 'Cancel');
                        next.setContent(lib.card[name].cancel);
                        next.card = event.card;
                        next.cards = [event.card];
                        next.player = player;
                    }
                }
                else {
                    var next = game.createEvent(name);
                    next.setContent(lib.card[name].effect);
                    next._result = result;
                    next.card = event.card;
                    next.cards = [event.card];
                    next.player = player;
                }
                ui.clear();
                event.goto(1);
            },
            /**
                * 摸牌阶段
                * @name content.phaseDraw
                * @type {GameCores.Bases.StateMachine}
                */
            phaseDraw: function () {
                "step 0";
                event.trigger("phaseDrawBegin1");
                "step 1";
                event.trigger("phaseDrawBegin2");
                "step 2";
                if (game.modPhaseDraw) {
                    game.modPhaseDraw(player, event.num);
                }
                else {
                    if (event.num > 0) {
                        var num = event.num;
                        if (event.attachDraw) {
                            for (var i = 0; i < event.attachDraw.length; i++) {
                                ui.cardPile.insertBefore(event.attachDraw[i], ui.cardPile.firstChild);
                            }
                            num += event.attachDraw.length;
                        }
                        var next = player.draw(num);
                        if (event.attachDraw) {
                            next.minnum = event.attachDraw.length;
                        }
                    }
                }
                "step 3";
                if (Array.isArray(result)) {
                    event.cards = result;
                }
            },
            /**
                * 出牌阶段
                * @name content.phaseUse
                * @type {GameCores.Bases.StateMachine}
                */
            phaseUse: function () {
                "step 0";
                var next = player.chooseToUse();
                if (!lib.config.show_phaseuse_prompt) {
                    next.set('prompt', false);
                }
                next.set('type', 'phase');
                "step 1";
                if (result.bool && !event.skipped) {
                    event.goto(0);
                }
                game.broadcastAll(function () {
                    if (ui.tempnowuxie) {
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                });
                "step 2";
                var stat = player.getStat();
                for (var i in stat.skill) {
                    var bool = false;
                    var info = lib.skill[i];
                    if (!info)
                        continue;
                    if (info.enable != undefined) {
                        if (typeof info.enable == 'string' && info.enable == 'phaseUse')
                            bool = true;
                        else if (typeof info.enable == 'object' && info.enable.contains('phaseUse'))
                            bool = true;
                    }
                    if (bool)
                        stat.skill[i] = 0;
                }
                for (var i in stat.card) {
                    var bool = false;
                    var info = lib.card[i];
                    if (!info)
                        continue;
                    if (info.updateUsable == 'phaseUse')
                        stat.card[i] = 0;
                }
            },
            /**
                * 弃牌阶段
                * @name content.phaseDiscard
                * @type {GameCores.Bases.StateMachine}
                */
            phaseDiscard: function () {
                "step 0";
                if (!event.num)
                    event.num = player.needsToDiscard();
                if (event.num <= 0)
                    event.finish();
                else {
                    if (lib.config.show_phase_prompt) {
                        player.popup('弃牌阶段');
                    }
                }
                event.trigger('phaseDiscard');
                "step 1";
                player.chooseToDiscard(num, true);
                "step 2";
                event.cards = result.cards;
            },
            /**
                * 选择以使用(牌|技能)
                * @name content.chooseToUse
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToUse: function () {
                "step 0";
                if (event.responded)
                    return;
                if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
                    game.modeSwapPlayer(player);
                }
                var skills = player.getSkills(true);
                game.expandSkills(skills);
                for (var i = 0; i < skills.length; i++) {
                    var info = lib.skill[skills[i]];
                    if (info && info.onChooseToUse) {
                        info.onChooseToUse(event);
                    }
                }
                _status.noclearcountdown = true;
                if (event.type == 'phase') {
                    if (event.isMine()) {
                        if (lib.config.mode == 'richer' && lib.skill._chessmove.filter(true, player) && player.getStat().skill && !player.getStat().skill._chessmove) {
                            event.endButton = ui.create.control('请进行移动', 'stayleft', function () { });
                        }
                        else {
                            event.endButton = ui.create.control('结束回合', 'stayleft', function () {
                                if (_status.event.skill) {
                                    ui.click.cancel();
                                }
                                ui.click.cancel();
                            });
                        }
                        event.fakeforce = true;
                    }
                    else {
                        if (event.endButton) {
                            event.endButton.close();
                            delete event.endButton;
                        }
                        event.fakeforce = false;
                    }
                }
                if (event.player.isUnderControl() && !_status.auto) {
                    event.result = {
                        bool: false
                    };
                    return;
                }
                else if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    if (event.type == 'wuxie') {
                        if (ui.tempnowuxie) {
                            var triggerevent = event.getTrigger();
                            if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
                                ui.tempnowuxie.close();
                            }
                        }
                        if (lib.filter.wuxieSwap(event)) {
                            event.result = {
                                bool: false
                            };
                            return;
                        }
                    }
                    var ok = game.check();
                    if (!ok || !lib.config.auto_confirm) {
                        game.pause();
                        if (lib.config.enable_vibrate && player._noVibrate) {
                            delete player._noVibrate;
                            game.vibrate();
                        }
                    }
                    if (!ok) {
                        if (typeof event.prompt == 'string') {
                            if (event.openskilldialog) {
                                event.skillDialog = ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog = event.prompt;
                            }
                            else {
                                event.dialog = ui.create.dialog(event.prompt);
                                if (event.prompt2) {
                                    event.dialog.addText(event.prompt2);
                                }
                            }
                        }
                        else if (event.prompt == 'function') {
                            event.dialog = ui.create.dialog(event.prompt(event));
                        }
                        else if (event.prompt == undefined) {
                            var str;
                            if (typeof event.filterCard == 'object') {
                                var filter = event.filterCard;
                                str = '请使用' + get.cnNumber(event.selectCard[0]) + '张';
                                if (filter.name) {
                                    str += get.translation(filter.name);
                                }
                                else {
                                    str += '牌';
                                }
                            }
                            else {
                                str = '请选择要使用的牌';
                            }
                            if (event.openskilldialog) {
                                event.skillDialog = ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog = str;
                            }
                            else if (typeof event.skillDialog != 'string') {
                                event.dialog = ui.create.dialog(str);
                            }
                            else {
                                event.dialog = str;
                            }
                        }
                    }
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = 'ai';
                }
                "step 1";
                if (event.result == 'ai') {
                    var ok = game.check();
                    if (ok) {
                        ui.click.ok();
                    }
                    else if (ai.basic.chooseCard(event.ai1)) {
                        if (ai.basic.chooseTarget(event.ai2)) {
                            ui.click.ok();
                            event._aiexcludeclear = true;
                        }
                        else {
                            if (!event.norestore) {
                                if (event.skill) {
                                    var skill = event.skill;
                                    ui.click.cancel();
                                    event._aiexclude.add(skill);
                                    var info = get.info(skill);
                                    if (info.sourceSkill) {
                                        event._aiexclude.add(info.sourceSkill);
                                    }
                                }
                                else {
                                    get.card(true).aiexclude();
                                    game.uncheck();
                                }
                                event.redo();
                                game.resume();
                            }
                            else {
                                ui.click.cancel();
                            }
                        }
                    }
                    else if (event.skill && !event.norestore) {
                        var skill = event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        var info = get.info(skill);
                        if (info.sourceSkill) {
                            event._aiexclude.add(info.sourceSkill);
                        }
                        event.redo();
                        game.resume();
                    }
                    else {
                        ui.click.cancel();
                    }
                    if (event.aidelay && event.result && event.result.bool) {
                        game.delayx();
                    }
                }
                "step 2";
                if (event.endButton) {
                    event.endButton.close();
                    delete event.endButton;
                }
                event.resume();
                if (event.result) {
                    if (event.result.skill) {
                        var info = get.info(event.result.skill);
                        if (info && info.chooseButton) {
                            if (event.dialog && typeof event.dialog == 'object')
                                event.dialog.close();
                            var dialog = info.chooseButton.dialog(event, player);
                            if (info.chooseButton.chooseControl) {
                                var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
                                next.dialog = dialog;
                                next.set('ai', info.chooseButton.check || function () { return 0; });
                            }
                            else {
                                var next = player.chooseButton(dialog);
                                next.set('ai', info.chooseButton.check || function () { return 1; });
                                next.set('filterButton', info.chooseButton.filter || function () { return true; });
                                next.set('selectButton', info.chooseButton.select || 1);
                            }
                            event.buttoned = event.result.skill;
                        }
                        else if (info && info.precontent && !game.online && !event.nouse) {
                            var next = game.createEvent('pre_' + event.result.skill);
                            next.setContent(info.precontent);
                            next.set('result', event.result);
                            next.set('player', player);
                        }
                    }
                }
                "step 3";
                if (event.buttoned) {
                    if (result.bool || result.control && result.control != 'cancel2') {
                        var info = get.info(event.buttoned).chooseButton;
                        lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
                        lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
                        if (game.online) {
                            event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
                        }
                        event.backup(event.buttoned + '_backup');
                        if (info.prompt) {
                            event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
                        }
                    }
                    else {
                        ui.control.animate('nozoom', 100);
                        event._aiexclude.add(event.buttoned);
                    }
                    event.goto(0);
                    delete event.buttoned;
                }
                "step 4";
                if (event._aiexcludeclear) {
                    delete event._aiexcludeclear;
                    event._aiexclude.length = 0;
                }
                delete _status.noclearcountdown;
                if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                    event.skillDialog.close();
                }
                if (event.result && event.result.bool && !game.online && !event.nouse) {
                    player.useResult(event.result, event);
                }
                else if (event._sendskill) {
                    event.result._sendskill = event._sendskill;
                }
                if (event.dialog && typeof event.dialog == 'object')
                    event.dialog.close();
                if (!_status.noclearcountdown) {
                    game.stopCountChoose();
                }
                "step 5";
                if (event._result && event.result) {
                    event.result.result = event._result;
                }
            },
            /**
                * 选择以响应(牌|技能)
                * @name content.chooseToUse
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToRespond: function () {
                "step 0";
                if (event.responded) {
                    delete event.dialog;
                    return;
                }
                var skills = player.getSkills(true);
                game.expandSkills(skills);
                for (var i = 0; i < skills.length; i++) {
                    var info = lib.skill[skills[i]];
                    if (info && info.onChooseToRespond) {
                        info.onChooseToRespond(event);
                    }
                }
                _status.noclearcountdown = true;
                if (!_status.connectMode && lib.config.skip_shan && event.autochoose && event.autochoose()) {
                    event.result = { bool: false };
                }
                else {
                    if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
                        game.modeSwapPlayer(player);
                    }
                    if (event.isMine()) {
                        if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                            ui.click.cancel();
                            return;
                        }
                        var ok = game.check();
                        if (!ok) {
                            game.pause();
                            if (event.openskilldialog) {
                                event.skillDialog = ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog = event.prompt;
                            }
                            else {
                                if (event.prompt)
                                    event.dialog = ui.create.dialog(event.prompt);
                                if (event.prompt2)
                                    event.dialog.addText(event.prompt2);
                            }
                        }
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    var ok = game.check();
                    if (ok) {
                        ui.click.ok();
                    }
                    else if (ai.basic.chooseCard(event.ai)) {
                        ui.click.ok();
                        event._aiexcludeclear = true;
                    }
                    else if (event.skill && !event.norestore) {
                        var skill = event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        var info = get.info(skill);
                        if (info.sourceSkill) {
                            event._aiexclude.add(info.sourceSkill);
                        }
                        event.redo();
                        game.resume();
                    }
                    else {
                        ui.click.cancel();
                    }
                    if (event.aidelay && event.result && event.result.bool) {
                        game.delayx();
                    }
                }
                "step 2";
                event.resume();
                if (event.result) {
                    if (event.result.skill) {
                        var info = get.info(event.result.skill);
                        if (info && info.chooseButton) {
                            if (event.dialog && typeof event.dialog == 'object')
                                event.dialog.close();
                            var dialog = info.chooseButton.dialog(event, player);
                            if (info.chooseButton.chooseControl) {
                                var next = player.chooseControl(info.chooseButton.chooseControl(event, player));
                                next.dialog = dialog;
                                next.set('ai', info.chooseButton.check || function () { return 0; });
                            }
                            else {
                                var next = player.chooseButton(dialog);
                                next.set('ai', info.chooseButton.check || function () { return 1; });
                                next.set('filterButton', info.chooseButton.filter || function () { return true; });
                                next.set('selectButton', info.chooseButton.select || 1);
                            }
                            event.buttoned = event.result.skill;
                        }
                        else if (info && info.precontent && !game.online) {
                            var next = game.createEvent('pre_' + event.result.skill);
                            next.setContent(info.precontent);
                            next.set('result', event.result);
                            next.set('player', player);
                        }
                    }
                }
                "step 3";
                if (event.buttoned) {
                    if (result.bool || result.control && result.control != 'cancel2') {
                        var info = get.info(event.buttoned).chooseButton;
                        lib.skill[event.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
                        lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
                        if (game.online) {
                            event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
                        }
                        event.backup(event.buttoned + '_backup');
                        if (info.prompt) {
                            event.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
                        }
                    }
                    else {
                        ui.control.animate('nozoom', 100);
                        event._aiexclude.add(event.buttoned);
                    }
                    event.goto(0);
                    delete event.buttoned;
                }
                "step 4";
                delete _status.noclearcountdown;
                if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
                    event.skillDialog.close();
                }
                if (event.result.bool && !game.online) {
                    if (event.result._sendskill) {
                        lib.skill[event.result._sendskill[0]] = event.result._sendskill[1];
                    }
                    var info = get.info(event.result.skill);
                    if (event.onresult) {
                        event.onresult(event.result);
                    }
                    if (event.result.skill) {
                        if (info.direct && !info.clearTime) {
                            _status.noclearcountdown = true;
                        }
                    }
                    if (event.logSkill) {
                        if (typeof event.logSkill == 'string') {
                            player.logSkill(event.logSkill);
                        }
                        else if (Array.isArray(event.logSkill)) {
                            player.logSkill.apply(player, event.logSkill);
                        }
                    }
                    if (!event.result.card && event.result.skill) {
                        event.result.used = event.result.skill;
                        player.useSkill(event.result.skill, event.result.cards, event.result.targets);
                    }
                    else {
                        if (info && info.prerespond) {
                            info.prerespond(event.result, player);
                        }
                        var next = player.respond(event.result.cards, event.result.card, event.animate, event.result.skill, event.source);
                        if (event.result.noanimate)
                            next.animate = false;
                        if (event.parent.card && event.parent.type == 'card') {
                            next.set('respondTo', [event.parent.player, event.parent.card]);
                        }
                        if (event.noOrdering)
                            next.noOrdering = true;
                    }
                }
                else if (event._sendskill) {
                    event.result._sendskill = event._sendskill;
                }
                if (event.dialog && event.dialog.close)
                    event.dialog.close();
                if (!_status.noclearcountdown) {
                    game.stopCountChoose();
                }
            },
            /**
                * 选择以弃置牌
                * @name content.chooseToDiscard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToDiscard: function () {
                "step 0";
                if (event.autochoose()) {
                    event.result = {
                        bool: true,
                        autochoose: true,
                        cards: player.getCards(event.position),
                        rawcards: player.getCards(event.position),
                    };
                    for (var i = 0; i < event.result.cards.length; i++) {
                        if (!lib.filter.cardDiscardable(event.result.cards[i], player, event)) {
                            event.result.cards.splice(i--, 1);
                        }
                    }
                }
                else {
                    // &&!lib.filter.wuxieSwap(trigger)
                    if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
                        game.modeSwapPlayer(player);
                    }
                    event.rangecards = player.getCards(event.position);
                    for (var i = 0; i < event.rangecards.length; i++) {
                        if (lib.filter.cardDiscardable(event.rangecards[i], player, event)) {
                            event.rangecards.splice(i--, 1);
                        }
                        else {
                            event.rangecards[i].uncheck('chooseToDiscard');
                        }
                    }
                    var range = get.select(event.selectCard);
                    game.check();
                    if (event.isMine()) {
                        if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                            ui.click.cancel();
                            return;
                        }
                        game.pause();
                        if (range[1] > 1 && typeof event.selectCard != 'function') {
                            event.promptdiscard = ui.create.control('提示', function () {
                                ai.basic.chooseCard(event.ai);
                                if (_status.event.custom.add.card) {
                                    _status.event.custom.add.card();
                                }
                                for (var i = 0; i < ui.selected.cards.length; i++) {
                                    ui.selected.cards[i].updateTransform(true);
                                }
                            });
                        }
                        if (Array.isArray(event.dialog)) {
                            event.dialog = ui.create.dialog.apply(this, event.dialog);
                            event.dialog.open();
                            event.dialog.classList.add('noselect');
                        }
                        else if (event.prompt != false) {
                            var str;
                            if (typeof (event.prompt) == 'string')
                                str = event.prompt;
                            else {
                                str = '请弃置';
                                if (range[0] == range[1])
                                    str += get.cnNumber(range[0]);
                                else if (range[1] == Infinity)
                                    str += '至少' + get.cnNumber(range[0]);
                                else
                                    str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                                str += '张';
                                if (event.position == 'h' || event.position == undefined)
                                    str += '手';
                                if (event.position == 'e')
                                    str += '装备';
                                str += '牌';
                            }
                            event.dialog = ui.create.dialog(str);
                            if (event.prompt2) {
                                event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                            }
                            if (Array.isArray(event.selectCard)) {
                                event.promptbar = event.dialog.add('0/' + get.numStr(event.selectCard[1], 'card'));
                                event.custom.add.card = function () {
                                    _status.event.promptbar.innerHTML =
                                        ui.selected.cards.length + '/' + get.numStr(_status.event.selectCard[1], 'card');
                                };
                            }
                        }
                        else if (get.itemtype(event.dialog) == 'dialog') {
                            event.dialog.style.display = '';
                            event.dialog.open();
                        }
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseCard(event.ai) || event.forced) {
                        ui.click.ok();
                    }
                    else if (event.skill) {
                        var skill = event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        event.redo();
                        game.resume();
                    }
                    else {
                        ui.click.cancel();
                    }
                }
                if (event.rangecards) {
                    for (var i = 0; i < event.rangecards.length; i++) {
                        event.rangecards[i].recheck('chooseToDiscard');
                    }
                }
                "step 2";
                event.resume();
                if (event.promptdiscard) {
                    event.promptdiscard.close();
                }
                "step 3";
                if (event.result.bool && event.result.cards && event.result.cards.length &&
                    !game.online && event.autodelay && !event.isMine()) {
                    if (typeof event.autodelay == 'number') {
                        game.delayx(event.autodelay);
                    }
                    else {
                        game.delayx();
                    }
                }
                "step 4";
                if (event.logSkill && event.result.bool && !game.online) {
                    if (typeof event.logSkill == 'string') {
                        player.logSkill(event.logSkill);
                    }
                    else if (Array.isArray(event.logSkill)) {
                        player.logSkill.apply(player, event.logSkill);
                    }
                }
                if (!game.online) {
                    if (typeof event.delay == 'boolean') {
                        event.done = player.discard(event.result.cards).set('delay', event.delay);
                    }
                    else {
                        event.done = player.discard(event.result.cards);
                    }
                }
                if (event.dialog && event.dialog.close)
                    event.dialog.close();
            },
            /**
                * 拼点失败
                * @name content.chooseToCompareLose
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToCompareLose: function () {
                for (var i = 0; i < event.lose_list.length; i++) {
                    var next = event.lose_list[i][0].lose(event.lose_list[i][1], ui.ordering);
                    next.relatedEvent = event.getParent();
                    next.getlx = false;
                }
            },
            /**
                * 多人拼点
                * @name content.chooseToCompareMultiple
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToCompareMultiple: function () {
                "step 0";
                if (player.countCards('h') == 0) {
                    event.result = { cancelled: true, bool: false };
                    event.finish();
                    return;
                }
                for (var i = 0; i < targets.length; i++) {
                    if (targets[i].countCards('h') == 0) {
                        event.result = { cancelled: true, bool: false };
                        event.finish();
                        return;
                    }
                }
                if (!event.multitarget) {
                    targets.sort(lib.sort.seat);
                }
                game.log(player, '对', targets, '发起拼点');
                "step 1";
                event._result = [];
                event.list = targets.filter(function (current) {
                    return !event.fixedResult || !event.fixedResult[current.playerid];
                });
                if (event.list.length || !event.fixedResult || !event.fixedResult[player.playerid]) {
                    if (!event.fixedResult || !event.fixedResult[player.playerid])
                        event.list.unshift(player);
                    player.chooseCardOL(event.list, '请选择拼点牌', true).set('type', 'compare').set('ai', event.ai).set('source', player).aiCard = function (target) {
                        var hs = target.getCards('h');
                        var event = _status.event;
                        event.player = target;
                        hs.sort(function (a, b) {
                            return event.ai(b) - event.ai(a);
                        });
                        delete event.player;
                        return { bool: true, cards: [hs[0]] };
                    };
                }
                "step 2";
                var cards = [];
                var lose_list = [];
                if (event.fixedResult && event.fixedResult[player.playerid]) {
                    event.list.unshift(player);
                    result.unshift({ bool: true, cards: [event.fixedResult[player.playerid]] });
                    lose_list.push([player, [event.fixedResult[player.playerid]]]);
                }
                else {
                    if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
                        player.logSkill(result[0].skill);
                        result[0].cards = lib.skill[result[0].skill].onCompare(player);
                    }
                    else
                        lose_list.push([player, result[0].cards]);
                }
                ;
                for (var j = 0; j < targets.length; j++) {
                    if (event.list.contains(targets[j])) {
                        var i = event.list.indexOf(targets[j]);
                        if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
                            event.list[i].logSkill(result[i].skill);
                            result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
                        }
                        else
                            lose_list.push([targets[j], result[i].cards]);
                        cards.push(result[i].cards[0]);
                    }
                    else if (event.fixedResult && event.fixedResult[targets[j].playerid]) {
                        cards.push(event.fixedResult[targets[j].playerid]);
                        lose_list.push([targets[j], [event.fixedResult[targets[j].playerid]]]);
                    }
                }
                if (lose_list.length) {
                    game.loseAsync({
                        lose_list: lose_list,
                    }).setContent('chooseToCompareLose');
                }
                event.cardlist = cards;
                event.cards = cards;
                event.card1 = result[0].cards[0];
                event.num1 = event.card1.number;
                event.iwhile = 0;
                event.result = {
                    player: event.card1,
                    targets: event.cardlist.slice(0),
                    num1: [],
                    num2: [],
                };
                game.log(player, '的拼点牌为', event.card1);
                "step 3";
                if (event.iwhile < targets.length) {
                    event.target = targets[event.iwhile];
                    event.target.animate('target');
                    player.animate('target');
                    event.card2 = event.cardlist[event.iwhile];
                    event.num2 = event.card2.number;
                    game.log(event.target, '的拼点牌为', event.card2);
                    player.line(event.target);
                    player.$compare(event.card1, event.target, event.card2);
                    event.trigger('compare');
                    game.delay(0, 1500);
                }
                else {
                    event.goto(7);
                }
                "step 4";
                event.result.num1[event.iwhile] = event.num1;
                event.result.num2[event.iwhile] = event.num2;
                var str;
                if (event.num1 > event.num2) {
                    event.result.winner = player;
                    event.result.loser = target;
                    str = get.translation(player) + '拼点成功';
                    player.popup('胜');
                    target.popup('负');
                }
                else {
                    str = get.translation(player) + '拼点失败';
                    if (event.num1 == event.num2) {
                        event.result.tie = true;
                        player.popup('平');
                        target.popup('平');
                    }
                    else {
                        event.result.winner = target;
                        event.result.loser = player;
                        player.popup('负');
                        target.popup('胜');
                    }
                }
                game.broadcastAll(function (str) {
                    var dialog = ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function () {
                        dialog.close();
                    }, 1000);
                }, str);
                game.delay(2);
                "step 5";
                if (event.callback) {
                    game.broadcastAll(function (card1, card2) {
                        if (card1.clone)
                            card1.clone.style.opacity = 0.5;
                        if (card2.clone)
                            card2.clone.style.opacity = 0.5;
                    }, event.card1, event.card2);
                    var next = game.createEvent('compareMultiple');
                    next.player = player;
                    next.target = event.target;
                    next.card1 = event.card1;
                    next.card2 = event.card2;
                    next.num1 = event.num1;
                    next.num2 = event.num2;
                    next.winner = event.result.winner;
                    next.setContent(event.callback);
                }
                "step 6";
                game.broadcastAll(ui.clear);
                event.iwhile++;
                event.goto(3);
                "step 7";
                event.cards.add(event.card1);
            },
            /**
                * 两人拼点
                * @name content.chooseToCompare
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseToCompare: function () {
                "step 0";
                if (player.countCards('h') == 0 || target.countCards('h') == 0) {
                    event.result = { cancelled: true, bool: false };
                    event.finish();
                    return;
                }
                game.log(player, '对', target, '发起拼点');
                event.lose_list = [];
                "step 1";
                var sendback = function () {
                    if (_status.event != event) {
                        return function () {
                            event.resultOL = _status.event.resultOL;
                        };
                    }
                };
                if (event.fixedResult && event.fixedResult[player.playerid]) {
                    event.card1 = event.fixedResult[player.playerid];
                    event.lose_list.push([player, event.card1]);
                }
                else if (player.isOnline()) {
                    player.wait(sendback);
                    event.ol = true;
                    player.send(function (ai) {
                        game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
                        game.resume();
                    }, event.ai);
                }
                else {
                    event.localPlayer = true;
                    player.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = event.ai;
                }
                if (event.fixedResult && event.fixedResult[target.playerid]) {
                    event.card2 = event.fixedResult[target.playerid];
                    event.lose_list.push([target, event.card2]);
                }
                else if (target.isOnline()) {
                    target.wait(sendback);
                    event.ol = true;
                    target.send(function (ai) {
                        game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
                        game.resume();
                    }, event.ai);
                }
                else {
                    event.localTarget = true;
                }
                "step 2";
                if (event.localPlayer) {
                    if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
                        result.cards = lib.skill[result.skill].onCompare(player);
                        player.logSkill(result.skill);
                    }
                    else
                        event.lose_list.push([player, result.cards[0]]);
                    event.card1 = result.cards[0];
                }
                if (event.localTarget) {
                    target.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = event.ai;
                }
                "step 3";
                if (event.localTarget) {
                    if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
                        target.logSkill(result.skill);
                        result.cards = lib.skill[result.skill].onCompare(target);
                    }
                    else
                        event.lose_list.push([target, result.cards[0]]);
                    event.card2 = result.cards[0];
                }
                if (!event.resultOL && event.ol) {
                    game.pause();
                }
                "step 4";
                try {
                    if (!event.card1) {
                        if (event.resultOL[player.playerid].skill && lib.skill[event.resultOL[player.playerid].skill] && lib.skill[event.resultOL[player.playerid].skill].onCompare) {
                            player.logSkill(event.resultOL[player.playerid].skill);
                            event.resultOL[player.playerid].cards = lib.skill[event.resultOL[player.playerid].skill].onCompare(player);
                        }
                        else
                            event.lose_list.push([player, event.resultOL[player.playerid].cards[0]]);
                        event.card1 = event.resultOL[player.playerid].cards[0];
                    }
                    ;
                    if (!event.card2) {
                        if (event.resultOL[target.playerid].skill && lib.skill[event.resultOL[target.playerid].skill] && lib.skill[event.resultOL[target.playerid].skill].onCompare) {
                            target.logSkill(event.resultOL[target.playerid].skill);
                            event.resultOL[target.playerid].cards = lib.skill[event.resultOL[target.playerid].skill].onCompare(player);
                        }
                        else
                            event.lose_list.push([target, event.resultOL[target.playerid].cards[0]]);
                        event.card2 = event.resultOL[target.playerid].cards[0];
                    }
                    if (!event.card1 || !event.card2) {
                        throw ('err');
                    }
                }
                catch (e) {
                    console.log(e);
                    game.print(e);
                    event.finish();
                    return;
                }
                if (event.card2.number >= 10 || event.card2.number <= 4) {
                    if (target.countCards('h') > 2) {
                        event.addToAI = true;
                    }
                }
                if (event.lose_list.length) {
                    game.loseAsync({
                        lose_list: event.lose_list,
                    }).setContent('chooseToCompareLose');
                }
                "step 5";
                game.broadcast(function () {
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                player.$compare(event.card1, target, event.card2);
                game.log(player, '的拼点牌为', event.card1);
                game.log(target, '的拼点牌为', event.card2);
                event.num1 = event.card1.number;
                event.num2 = event.card2.number;
                event.trigger('compare');
                game.delay(0, 1500);
                "step 6";
                event.result = {
                    player: event.card1,
                    target: event.card2,
                    num1: event.num1,
                    num2: event.num2
                };
                var str;
                if (event.num1 > event.num2) {
                    event.result.bool = true;
                    event.result.winner = player;
                    event.result.loser = target;
                    str = get.translation(player) + '拼点成功';
                    player.popup('胜');
                    target.popup('负');
                }
                else {
                    event.result.bool = false;
                    str = get.translation(player) + '拼点失败';
                    if (event.num1 == event.num2) {
                        event.result.tie = true;
                        player.popup('平');
                        target.popup('平');
                    }
                    else {
                        event.result.winner = target;
                        event.result.loser = player;
                        player.popup('负');
                        target.popup('胜');
                    }
                }
                game.broadcastAll(function (str) {
                    var dialog = ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function () {
                        dialog.close();
                    }, 1000);
                }, str);
                game.delay(2);
                "step 7";
                if (typeof event.target.ai.shown == 'number' && event.target.ai.shown <= 0.85 && event.addToAI) {
                    event.target.ai.shown += 0.1;
                }
                game.broadcastAll(function () {
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if (event.clear !== false) {
                    game.broadcastAll(ui.clear);
                }
                if (typeof event.preserve == 'function') {
                    event.preserve = event.preserve(event.result);
                }
                else if (event.preserve == 'win') {
                    event.preserve = event.result.bool;
                }
                else if (event.preserve == 'lose') {
                    event.preserve = !event.result.bool;
                }
            },
            /**
                * 选择以获得一项技能
                * @name content.discoverSkill
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            discoverSkill: function () {
                'step 0';
                var num = event.num || 3;
                var choice;
                if (typeof event.list == 'string' || typeof event.list == 'function') {
                    choice = get.gainableSkills(event.list).randomGets(num);
                }
                else if (Array.isArray(event.list)) {
                    choice = event.list.randomGets(num);
                }
                else {
                    choice = Array.from(event.list).randomGets(num);
                }
                if (!choice.length) {
                    event.finish();
                    event.result = { bool: false };
                    return;
                }
                event.skillai = event.ai || function (list) {
                    return get.max(list, get.skillRank, 'item');
                };
                if (_status.connectMode) {
                    if (choice.length == 1)
                        event._result = { control: list[0] };
                    else
                        player.chooseControl(choice).set('prompt', '选择获得一个技能').set('forceDie', true).set('ai', function () {
                            return event.skillai(choice);
                        });
                }
                else if (event.isMine()) {
                    game.check();
                    game.pause();
                    event.dialog = ui.create.dialog('forcebutton');
                    event.dialog.add(event.prompt || '选择获得一项技能');
                    var clickItem = function () {
                        _status.event._result = this.link;
                        game.resume();
                    };
                    for (i = 0; i < choice.length; i++) {
                        if (lib.translate[choice[i] + '_info']) {
                            var translation = get.translation(choice[i]);
                            if (translation[0] == '新' && translation.length == 3) {
                                translation = translation.slice(1, 3);
                            }
                            else {
                                translation = translation.slice(0, 2);
                            }
                            var item = event.dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">' +
                                translation + '</div><div>' + lib.translate[choice[i] + '_info'] + '</div></div>');
                            item.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickItem);
                            item.firstChild.link = choice[i];
                        }
                    }
                    event.dialog.add(ui.create.div('.placeholder'));
                    event.switchToAuto = function () {
                        event._result = event.skillai(event.choice);
                        game.resume();
                    };
                    if (event.isMine() || event.dialogdisplay) {
                        event.dialog.style.display = '';
                        event.dialog.open();
                    }
                    game.countChoose();
                    event.choosing = true;
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event._result = event.skillai(choice);
                }
                'step 1';
                if (_status.connectMode) {
                    event.result = { bool: true, skill: result.control };
                }
                else {
                    if (event.dialog) {
                        event.dialog.close();
                    }
                    event.choosing = false;
                    event.result = { bool: true, skill: result };
                }
            },
            /**
                * 选择以获得一项技能
                * @name content.chooseSkill
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseSkill: function () {
                'step 0';
                var list;
                if (typeof event.target == 'string') {
                    list = get.gainableSkillsName(event.target, event.func);
                }
                else {
                    list = event.target.getGainableSkills(event.func);
                }
                if (!list.length) {
                    event.finish();
                    event.result = { bool: false };
                    return;
                }
                event.skillai = function (list) {
                    return get.max(list, get.skillRank, 'item');
                };
                if (event.isMine()) {
                    var dialog = ui.create.dialog('forcebutton');
                    dialog.add(event.prompt || '选择获得一项技能');
                    _status.event.list = list;
                    var clickItem = function () {
                        _status.event._result = this.link;
                        game.resume();
                    };
                    for (var i = 0; i < list.length; i++) {
                        if (lib.translate[list[i] + '_info']) {
                            var translation = get.translation(list[i]);
                            if (translation[0] == '新' && translation.length == 3) {
                                translation = translation.slice(1, 3);
                            }
                            else {
                                translation = translation.slice(0, 2);
                            }
                            var item = dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">' +
                                translation + '</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
                            item.firstChild.addEventListener('click', clickItem);
                            item.firstChild.link = list[i];
                        }
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    event.dialog = dialog;
                    event.switchToAuto = function () {
                        event._result = event.skillai(event.list);
                        game.resume();
                    };
                    _status.imchoosing = true;
                    game.pause();
                }
                else {
                    event._result = event.skillai(list);
                }
                'step 1';
                _status.imchoosing = false;
                if (event.dialog) {
                    event.dialog.close();
                }
                event.result = { bool: true, skill: result };
            },
            /**
                * 选择以(获得|使用)牌
                * @name content.chooseSkill
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            discoverCard: function () {
                'step 0';
                var num = event.num || 3;
                var choice;
                if (typeof event.list == 'string' || typeof event.list == 'function') {
                    choice = get.inpile(event.list).randomGets(num);
                }
                else if (Array.isArray(event.list)) {
                    choice = event.list.randomGets(num);
                }
                else {
                    choice = Array.from(event.list).randomGets(num);
                }
                if (choice.length) {
                    var prompt = event.prompt;
                    if (!prompt) {
                        prompt = '选择一张牌';
                        if (event.use) {
                            prompt += '使用之';
                        }
                        else if (!event.nogain) {
                            prompt += '获得之';
                        }
                    }
                    if (typeof choice[0] === 'string') {
                        var next = player.chooseVCardButton(choice, prompt, event.forced);
                        if (event.ai) {
                            next.set('ai', event.ai);
                        }
                    }
                    else if (get.itemtype(choice[0]) == 'card') {
                        var next = player.chooseCardButton(choice, prompt, event.forced);
                        if (event.ai) {
                            next.set('ai', event.ai);
                        }
                    }
                    else {
                        event.finish();
                    }
                }
                else {
                    event.finish();
                }
                'step 1';
                event.result = {
                    bool: result.bool,
                    card: null,
                    choice: null
                };
                if (result.bool && result.links.length) {
                    var link = result.links[0];
                    var togain = null;
                    if (get.itemtype(link) == 'card') {
                        event.result.card = link;
                        togain = link;
                    }
                    else if (Array.isArray(link)) {
                        event.result.choice = link[2];
                        togain = game.createCard(link[2]);
                    }
                    if (togain) {
                        if (event.use) {
                            player.chooseUseTarget(togain);
                        }
                        else if (!event.nogain) {
                            player.gain(togain, 'draw');
                            game.log(player, '获得了一张牌');
                        }
                    }
                }
            },
            /**
                * 选择项(按钮)
                * @name content.chooseButton
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseButton: function () {
                "step 0";
                if (typeof event.dialog == 'number') {
                    event.dialog = get.idDialog(event.dialog);
                }
                if (event.createDialog && !event.dialog) {
                    if (Array.isArray(event.createDialog)) {
                        event.createDialog.add('hidden');
                        event.dialog = ui.create.dialog.apply(this, event.createDialog);
                    }
                    event.closeDialog = true;
                }
                if (event.dialog == undefined)
                    event.dialog = ui.dialog;
                if (event.isMine() || event.dialogdisplay) {
                    event.dialog.style.display = '';
                    event.dialog.open();
                }
                game.check();
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    game.pause();
                }
                else if (event.isOnline()) {
                    event.send();
                    delete event.callback;
                }
                else {
                    event.result = 'ai';
                }
                if (event.onfree) {
                    lib.init.onfree();
                }
                "step 1";
                if (event.result == 'ai') {
                    if (event.processAI) {
                        event.result = event.processAI();
                    }
                    else {
                        game.check();
                        if (ai.basic.chooseButton(event.ai) || event.forced)
                            ui.click.ok();
                        else
                            ui.click.cancel();
                    }
                }
                if (event.closeDialog) {
                    event.dialog.close();
                }
                if (event.callback) {
                    event.callback(event.player, event.result);
                }
                event.resume();
            },
            /**
                * 多人选择牌
                * @name content.chooseCardOL
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseCardOL: function () {
                'step 0';
                event.targets = event.list.slice(0);
                if (!_status.connectMode) {
                    event.result = [];
                    event.goto(7);
                }
                else {
                    for (var i = 0; i < event.list.length; i++) {
                        var target = event.list[i];
                        target.wait();
                        if (target.isOnline()) {
                            target.send(function (args, set) {
                                game.me.chooseCard.apply(game.me, args).set(set);
                                game.resume();
                            }, event._args, event._set);
                            event.list.splice(i--, 1);
                        }
                        else if (target == game.me) {
                            event.withme = true;
                            event.list.splice(i--, 1);
                        }
                    }
                }
                'step 1';
                if (event.list.length) {
                    event.target = event.list.shift();
                    event.target.chooseCard.apply(event.target, event._args).set(event._set);
                }
                else {
                    event.goto(3);
                }
                'step 2';
                event.target.unwait(result);
                event.goto(1);
                'step 3';
                if (event.withme) {
                    game.me.chooseCard.apply(game.me, event._args).set(event._set);
                }
                else {
                    event.goto(5);
                }
                'step 4';
                game.me.unwait(result);
                'step 5';
                if (!event.resultOL) {
                    game.pause();
                }
                'step 6';
                event.result = [];
                for (var i = 0; i < event.targets.length; i++) {
                    event.result[i] = event.resultOL[event.targets[i].playerid] || {};
                    if (event.result[i] == 'ai' && event.aiCard) {
                        event.result[i] = event.aiCard(event.targets[i]);
                    }
                }
                event.finish();
                'step 7';
                if (event.list.length) {
                    event.target = event.list.shift();
                    event.target.chooseCard.apply(event.target, event._args).set(event._set);
                }
                else {
                    for (var i = 0; i < event.targets.length; i++) {
                        if (!event.result[i]) {
                            event.result[i] = {};
                        }
                    }
                    event.finish();
                }
                'step 8';
                event.result[event.targets.indexOf(event.target)] = result;
                event.goto(7);
            },
            /**
                * 多人选择项(按钮)
                * @name content.chooseButtonOL
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseButtonOL: function () {
                'step 0';
                ui.arena.classList.add('markhidden');
                for (var i = 0; i < event.list.length; i++) {
                    var current = event.list[i];
                    current[0].wait();
                    if (current[0].isOnline()) {
                        var target = current.shift();
                        target.send(function (args, callback, switchToAuto, processAI) {
                            ui.arena.classList.add('markhidden');
                            var next = game.me.chooseButton.apply(game.me, args);
                            next.callback = callback;
                            next.switchToAuto = switchToAuto;
                            next.processAI = processAI;
                            next.complexSelect = true;
                            game.resume();
                        }, current, event.callback, event.switchToAuto, event.processAI);
                        target._choose_button_ol = current;
                        event.list.splice(i--, 1);
                    }
                    else if (current[0] == game.me) {
                        event.last = current;
                        event.last.shift();
                        event.list.splice(i--, 1);
                    }
                }
                'step 1';
                if (event.list.length) {
                    var current = event.list.shift();
                    if (current.length)
                        event.target = current.shift();
                    else {
                        event.target = current;
                        current = null;
                    }
                    var next = event.target.chooseButton.apply(event.target, current);
                    next.callback = event.callback;
                    next.switchToAuto = event.switchToAuto;
                    next.processAI = event.processAI;
                }
                else {
                    event.goto(3);
                }
                'step 2';
                event.target.unwait(result);
                event.goto(1);
                'step 3';
                if (event.last) {
                    var next = game.me.chooseButton.apply(game.me, event.last);
                    next.callback = event.callback;
                    next.switchToAuto = event.switchToAuto;
                    next.processAI = event.processAI;
                }
                else {
                    event.goto(5);
                }
                'step 4';
                game.me.unwait(result);
                'step 5';
                if (!event.resultOL) {
                    game.pause();
                }
                'step 6';
                game.broadcastAll(function () {
                    ui.arena.classList.remove('markhidden');
                });
                event.result = event.resultOL;
            },
            /**
                * 选择牌
                * @name content.chooseCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseCard: function () {
                "step 0";
                if (event.directresult) {
                    event.result = {
                        buttons: [],
                        cards: event.directresult.slice(0),
                        targets: [],
                        confirm: 'ok',
                        bool: true,
                        links: []
                    };
                }
                else {
                    game.check();
                    if (event.isMine()) {
                        game.pause();
                        if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                            ui.click.cancel();
                            return;
                        }
                        if (event.prompt != false) {
                            var str;
                            if (typeof event.prompt == 'string')
                                str = event.prompt;
                            else {
                                str = '请选择';
                                var range = get.select(event.selectCard);
                                if (range[0] == range[1])
                                    str += get.cnNumber(range[0]);
                                else if (range[1] == Infinity)
                                    str += '至少' + get.cnNumber(range[0]);
                                else
                                    str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                                str += '张';
                                if (event.position == 'h' || event.position == undefined)
                                    str += '手';
                                if (event.position == 'e')
                                    str += '装备';
                                str += '牌';
                            }
                            event.dialog = ui.create.dialog(str);
                            if (event.prompt2) {
                                event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                            }
                            if (Array.isArray(event.promptx)) {
                                for (var i = 0; i < event.promptx.length; i++) {
                                    event.dialog.add(event.promptx[i]);
                                }
                            }
                            if (Array.isArray(event.selectCard)) {
                                event.promptbar = event.dialog.add('0/' + get.numStr(event.selectCard[1], 'card'));
                                event.custom.add.card = function () {
                                    _status.event.promptbar.innerHTML =
                                        ui.selected.cards.length + '/' + get.numStr(_status.event.selectCard[1], 'card');
                                };
                            }
                        }
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseCard(event.ai) || event.forced) {
                        ui.click.ok();
                    }
                    else if (event.skill) {
                        var skill = event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        event.redo();
                        game.resume();
                    }
                    else {
                        ui.click.cancel();
                    }
                }
                "step 2";
                event.resume();
                if (event.glow_result && event.result.cards && !event.directresult) {
                    for (var i = 0; i < event.result.cards.length; i++) {
                        event.result.cards[i].classList.add('glow');
                    }
                }
                if (event.dialog)
                    event.dialog.close();
            },
            /**
                * 选择角色对象
                * @name content.chooseTarget
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseTarget: function () {
                "step 0";
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    game.check();
                    game.pause();
                    if (event.createDialog && !event.dialog && Array.isArray(event.createDialog)) {
                        event.dialog = ui.create.dialog.apply(this, event.createDialog);
                    }
                    else if (event.prompt != false) {
                        var str;
                        if (typeof event.prompt == 'string')
                            str = event.prompt;
                        else {
                            str = '请选择';
                            var range = get.select(event.selectTarget);
                            if (range[0] == range[1])
                                str += get.cnNumber(range[0]);
                            else if (range[1] == Infinity)
                                str += '至少' + get.cnNumber(range[0]);
                            else
                                str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                            str += '个目标';
                        }
                        event.dialog = ui.create.dialog(str);
                        if (event.prompt2) {
                            event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                        }
                        if (event.promptbar != 'none') {
                            event.promptbar = event.dialog.add('0/' + get.numStr(get.select(event.selectTarget)[1], 'target'));
                            event.custom.add.target = function () {
                                _status.event.promptbar.innerHTML =
                                    ui.selected.targets.length + '/' + get.numStr(get.select(event.selectTarget)[1], 'target');
                            };
                        }
                    }
                    else if (get.itemtype(event.dialog) == 'dialog') {
                        event.dialog.open();
                    }
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = 'ai';
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseTarget(event.ai) || event.forced) {
                        ui.click.ok();
                    }
                    else {
                        ui.click.cancel();
                    }
                }
                if (event.result.bool && event.animate !== false) { //play anim
                    for (var i = 0; i < event.result.targets.length; i++) {
                        event.result.targets[i].animate('target');
                    }
                }
                if (event.dialog)
                    event.dialog.close();
                event.resume();
                "step 2";
                if (event.onresult) {
                    event.onresult(event.result);
                }
                if (event.result.bool && event.autodelay && !event.isMine()) {
                    if (typeof event.autodelay == 'number') {
                        game.delayx(event.autodelay);
                    }
                    else {
                        game.delayx();
                    }
                }
            },
            /**
                * 选择卡牌和目标角色
                * @name content.chooseCardTarget
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseCardTarget: function () {
                "step 0";
                if (event.isMine()) {
                    if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    game.check();
                    game.pause();
                    if (event.prompt != false) {
                        event.dialog = ui.create.dialog(event.prompt || '请选择卡牌和目标');
                        if (event.prompt2) {
                            event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                        }
                    }
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = 'ai';
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseCard(event.ai1)) {
                        if (ai.basic.chooseTarget(event.ai2)) {
                            ui.click.ok();
                            _status.event._aiexclude.length = 0;
                        }
                        else {
                            get.card(true).aiexclude();
                            game.uncheck();
                            event.redo();
                            game.resume();
                        }
                    }
                    else {
                        ui.click.cancel();
                    }
                }
                "step 2";
                event.resume();
                if (event.result.bool && event.animate !== false) {
                    for (var i = 0; i < event.result.targets.length; i++) {
                        event.result.targets[i].animate('target');
                    }
                }
                if (event.dialog)
                    event.dialog.close();
            },
            /**
                * 选择项(列表项)
                * @name content.chooseControl
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseControl: function () {
                "step 0";
                if (event.controls.length == 0) {
                    if (event.sortcard) {
                        var sortnum = 2;
                        if (event.sorttop) {
                            sortnum = 1;
                        }
                        for (var i = 0; i < event.sortcard.length + sortnum; i++) {
                            event.controls.push(get.cnNumber(i, true));
                        }
                    }
                    else if (event.choiceList) {
                        for (var i = 0; i < event.choiceList.length; i++) {
                            event.controls.push('选项' + get.cnNumber(i + 1, true));
                        }
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                else if (event.choiceList && event.controls.length == 1 && event.controls[0] == 'cancel2') {
                    event.controls.shift();
                    for (var i = 0; i < event.choiceList.length; i++) {
                        event.controls.push('选项' + get.cnNumber(i + 1, true));
                    }
                    event.controls.push('cancel2');
                }
                if (event.isMine()) {
                    if (event.arrangeSkill) {
                        var hidden = player.hiddenSkills.slice(0);
                        game.expandSkills(hidden);
                        if (hidden.length) {
                            for (var i of event.controls) {
                                if (_status.prehidden_skills.contains(i) && hidden.contains(i)) {
                                    event.result = {
                                        bool: true,
                                        control: i,
                                    };
                                    return;
                                }
                            }
                        }
                    }
                    else if (event.hsskill && _status.prehidden_skills.contains(event.hsskill) && event.controls.contains('cancel2')) {
                        event.result = {
                            bool: true,
                            control: 'cancel2',
                        };
                        return;
                    }
                    if (event.sortcard) {
                        var prompt = event.prompt || '选择一个位置';
                        if (event.tosort) {
                            prompt += '放置' + get.translation(event.tosort);
                        }
                        event.dialog = ui.create.dialog(prompt, 'hidden');
                        if (event.sortcard && event.sortcard.length) {
                            event.dialog.addSmall(event.sortcard);
                        }
                        else {
                            event.dialog.buttons = [];
                            event.dialog.add(ui.create.div('.buttons'));
                        }
                        var buttons = event.dialog.content.lastChild;
                        var sortnum = 2;
                        if (event.sorttop) {
                            sortnum = 1;
                        }
                        for (var i = 0; i < event.dialog.buttons.length + sortnum; i++) {
                            var item = ui.create.div('.button.card.pointerdiv.mebg');
                            item.style.width = '50px';
                            buttons.insertBefore(item, event.dialog.buttons[i]);
                            item.innerHTML = '<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第' + get.cnNumber(i + 1, true) + '张</div>';
                            if (i == event.dialog.buttons.length + 1) {
                                item.firstChild.innerHTML = '牌堆底';
                            }
                            item.link = get.cnNumber(i, true);
                            item.listen(ui.click.dialogcontrol);
                        }
                        event.dialog.forcebutton = true;
                        event.dialog.classList.add('forcebutton');
                        event.dialog.open();
                    }
                    else if (event.dialogcontrol) {
                        event.dialog = ui.create.dialog(event.prompt || '选择一项', 'hidden');
                        for (var i = 0; i < event.controls.length; i++) {
                            var item = event.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">' + event.controls[i] + '</div>');
                            item.firstChild.listen(ui.click.dialogcontrol);
                            item.firstChild.link = event.controls[i];
                        }
                        event.dialog.forcebutton = true;
                        event.dialog.classList.add('forcebutton');
                        if (event.addDialog) {
                            for (var i = 0; i < event.addDialog.length; i++) {
                                if (get.itemtype(event.addDialog[i]) == 'cards') {
                                    event.dialog.addSmall(event.addDialog[i]);
                                }
                                else {
                                    event.dialog.add(event.addDialog[i]);
                                }
                            }
                            event.dialog.add(ui.create.div('.placeholder.slim'));
                        }
                        event.dialog.open();
                    }
                    else {
                        if (event.seperate || lib.config.seperate_control) {
                            event.controlbars = [];
                            for (var i = 0; i < event.controls.length; i++) {
                                event.controlbars.push(ui.create.control([event.controls[i]]));
                            }
                        }
                        else {
                            event.controlbar = ui.create.control(event.controls);
                        }
                        if (event.dialog) {
                            if (Array.isArray(event.dialog)) {
                                event.dialog = ui.create.dialog.apply(this, event.dialog);
                            }
                            event.dialog.open();
                        }
                        else if (event.choiceList) {
                            event.dialog = ui.create.dialog(event.prompt || '选择一项', 'hidden');
                            event.dialog.forcebutton = true;
                            event.dialog.open();
                            for (var i = 0; i < event.choiceList.length; i++) {
                                event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' +
                                    get.cnNumber(i + 1, true) + '：' + event.choiceList[i] + '</div>');
                            }
                        }
                        else if (event.prompt) {
                            event.dialog = ui.create.dialog(event.prompt);
                            if (event.prompt2) {
                                event.dialog.addText(event.prompt2, event.prompt2.length <= 20 || event.centerprompt2);
                            }
                        }
                    }
                    game.pause();
                    game.countChoose();
                    event.choosing = true;
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = 'ai';
                }
                "step 1";
                if (event.result == 'ai') {
                    event.result = {};
                    if (event.ai) {
                        var result = event.ai(event.getParent(), player);
                        if (typeof result == 'number')
                            event.result.control = event.controls[result];
                        else
                            event.result.control = result;
                    }
                    else
                        event.result.control = event.controls[event.choice];
                }
                event.result.index = event.controls.indexOf(event.result.control);
                event.choosing = false;
                _status.imchoosing = false;
                if (event.dialog && event.dialog.close)
                    event.dialog.close();
                if (event.controlbar)
                    event.controlbar.close();
                if (event.controlbars) {
                    for (var i = 0; i < event.controlbars.length; i++) {
                        event.controlbars[i].close();
                    }
                }
                event.resume();
            },
            /**
                * 确认项(确认|取消)
                * @name content.chooseBool
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseBool: function () {
                "step 0";
                if (event.isMine()) {
                    if (event.frequentSkill && !lib.config.autoskilllist.contains(event.frequentSkill)) {
                        ui.click.ok();
                        return;
                    }
                    else if (event.hsskill && _status.prehidden_skills.contains(event.hsskill)) {
                        ui.click.cancel();
                        return;
                    }
                    ui.create.confirm('oc');
                    if (event.createDialog && !event.dialog) {
                        if (Array.isArray(event.createDialog)) {
                            event.dialog = ui.create.dialog.apply(this, event.createDialog);
                            if (event.dialogselectx) {
                                for (var i = 0; i < event.dialog.buttons.length; i++) {
                                    event.dialog.buttons[i].classList.add('selectedx');
                                }
                            }
                        }
                    }
                    if (event.dialog) {
                        event.dialog.open();
                    }
                    else if (event.prompt) {
                        event.dialog = ui.create.dialog(event.prompt);
                        if (event.prompt2) {
                            event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                        }
                    }
                    game.pause();
                    game.countChoose();
                    event.choosing = true;
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.result = 'ai';
                }
                "step 1";
                if (event.result == 'ai') {
                    if (event.ai) {
                        event.choice = event.ai(event.getParent(), player);
                    }
                    event.result = { bool: event.choice };
                }
                _status.imchoosing = false;
                event.choosing = false;
                if (event.dialog)
                    event.dialog.close();
                event.resume();
            },
            /**
                * 选择(摸牌|回血)
                * @name content.chooseDrawRecover
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            chooseDrawRecover: function () {
                'step 0';
                if (player.isHealthy() && event.forced) {
                    player.draw(event.num1);
                    event.finish();
                    return;
                }
                var controls = ['draw_card'];
                if (player.isDamaged()) {
                    event.num2 = Math.min(event.num2, player.maxHp - player.hp);
                    controls.push('recover_hp');
                }
                if (!event.forced) {
                    controls.push('cancel2');
                }
                var prompt = event.prompt;
                if (!prompt) {
                    if (player.isHealthy()) {
                        prompt = '是否摸' + get.cnNumber(event.num1) + '张牌？';
                    }
                    else {
                        prompt = '摸' + get.cnNumber(event.num1) + '张牌或回复' + get.cnNumber(event.num2) + '点' + get.translation('hp');
                    }
                }
                var next = player.chooseControl(controls);
                next.set('prompt', prompt);
                if (event.hsskill)
                    next.setHiddenSkill(event.hsskill);
                if (event.ai) {
                    next.set('ai', event.ai);
                }
                else {
                    var choice;
                    if (player.isDamaged() && get.recoverEffect(player) > 0 && (player.hp == 1 || player.needsToDiscard() ||
                        player.hasSkillTag('maixie_hp') || event.num2 > event.num1 ||
                        (event.num2 == event.num1 && player.needsToDiscard(1)))) {
                        choice = 'recover_hp';
                    }
                    else {
                        choice = 'draw_card';
                    }
                    next.set('ai', function () {
                        return _status.event.choice;
                    });
                    next.set('choice', choice);
                }
                'step 1';
                if (result.control != 'cancel2') {
                    if (event.logSkill) {
                        if (typeof event.logSkill == 'string') {
                            player.logSkill(event.logSkill);
                        }
                        else if (Array.isArray(event.logSkill)) {
                            player.logSkill.apply(player, event.logSkill);
                        }
                    }
                    if (result.control == 'draw_card') {
                        player.draw(event.num1);
                    }
                    else {
                        player.recover(event.num2);
                    }
                }
                event.result = result;
            },
            /**
                * 从目标角色选择牌
                * @name content.choosePlayerCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            choosePlayerCard: function () {
                "step 0";
                if (!event.dialog)
                    event.dialog = ui.create.dialog('hidden');
                else if (!event.isMine) {
                    event.dialog.style.display = 'none';
                }
                if (event.prompt) {
                    event.dialog.add(event.prompt);
                }
                else {
                    event.dialog.add('选择' + get.translation(target) + '的一张牌');
                }
                if (event.prompt2) {
                    event.dialog.addText(event.prompt2);
                }
                var directh = (!lib.config.unauto_choose && !event.complexSelect);
                directh = game.showPlayerCard(event, target, directh, null);
                if (event.dialog.buttons.length == 0) {
                    event.finish();
                    return;
                }
                var cs = target.getCards(event.position);
                var select = get.select(event.selectButton);
                if (event.forced && select[0] >= cs.length) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons,
                        links: cs
                    };
                }
                else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons.randomGets(select[0]),
                        links: []
                    };
                    for (var i = 0; i < event.result.buttons.length; i++) {
                        event.result.links[i] = event.result.buttons[i].link;
                    }
                }
                else {
                    if (event.isMine()) {
                        if (event.hsskill && !event.forced && _status.prehidden_skills.contains(event.hsskill)) {
                            ui.click.cancel();
                            return;
                        }
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseButton(event.ai) || event.forced)
                        ui.click.ok();
                    else
                        ui.click.cancel();
                }
                event.dialog.close();
                if (event.result.links) {
                    event.result.cards = event.result.links.slice(0);
                }
                event.resume();
            },
            /**
                * 从目标角色选择牌弃置
                * @name content.discardPlayerCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            discardPlayerCard: function () {
                "step 0";
                if (event.directresult) {
                    event.result = {
                        buttons: [],
                        cards: event.directresult.slice(0),
                        links: event.directresult.slice(0),
                        targets: [],
                        confirm: 'ok',
                        bool: true
                    };
                    event.cards = event.directresult.slice(0);
                    event.goto(2);
                    return;
                }
                if (!event.dialog)
                    event.dialog = ui.create.dialog('hidden');
                else if (!event.isMine) {
                    event.dialog.style.display = 'none';
                }
                if (event.prompt == undefined) {
                    var str = '弃置' + get.translation(target);
                    var range = get.select(event.selectButton);
                    if (range[0] == range[1])
                        str += get.cnNumber(range[0]);
                    else if (range[1] == Infinity)
                        str += '至少' + get.cnNumber(range[0]);
                    else
                        str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                    str += '张';
                    if (event.position == 'h' || event.position == undefined)
                        str += '手';
                    if (event.position == 'e')
                        str += '装备';
                    str += '牌';
                    event.prompt = str;
                }
                if (event.prompt) {
                    event.dialog.add(event.prompt);
                }
                if (event.prompt2) {
                    event.dialog.addText(event.prompt2);
                }
                var directh = (!lib.config.unauto_choose && !event.complexSelect);
                directh = game.showPlayerCard(event, target, directh, 'canBeDiscarded');
                if (event.dialog.buttons.length == 0) {
                    event.finish();
                    return;
                }
                var cs = target.getCards(event.position);
                var select = get.select(event.selectButton);
                if (event.forced && select[0] >= cs.length) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons,
                        links: cs
                    };
                }
                else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons.randomGets(select[0]),
                        links: []
                    };
                    for (var i = 0; i < event.result.buttons.length; i++) {
                        event.result.links[i] = event.result.buttons[i].link;
                    }
                }
                else {
                    if (event.isMine()) {
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseButton(event.ai) || event.forced)
                        ui.click.ok();
                    else
                        ui.click.cancel();
                }
                event.dialog.close();
                "step 2";
                event.resume();
                if (event.result.bool && event.result.links && !game.online) {
                    if (event.logSkill) {
                        if (typeof event.logSkill == 'string') {
                            player.logSkill(event.logSkill);
                        }
                        else if (Array.isArray(event.logSkill)) {
                            player.logSkill.apply(player, event.logSkill);
                        }
                    }
                    var cards = [];
                    for (var i = 0; i < event.result.links.length; i++) {
                        cards.push(event.result.links[i]);
                    }
                    event.result.cards = event.result.links.slice(0);
                    event.cards = cards;
                    event.trigger("rewriteDiscardResult");
                }
                "step 3";
                if (event.boolline) {
                    player.line(target, 'green');
                }
                if (!event.chooseonly) {
                    var next = target.discard(event.cards);
                    if (player != target)
                        next.notBySelf = true;
                    event.done = next;
                    if (event.delay === false) {
                        next.set('delay', false);
                    }
                }
            },
            /**
                * 从目标角色选择牌获得
                * @name content.gainPlayerCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            gainPlayerCard: function () {
                "step 0";
                if (event.directresult) {
                    event.result = {
                        buttons: [],
                        cards: event.directresult.slice(0),
                        links: event.directresult.slice(0),
                        targets: [],
                        confirm: 'ok',
                        bool: true
                    };
                    event.cards = event.directresult.slice(0);
                    event.goto(2);
                    return;
                }
                if (!event.dialog)
                    event.dialog = ui.create.dialog('hidden');
                else if (!event.isMine) {
                    event.dialog.style.display = 'none';
                }
                if (event.prompt == undefined) {
                    var str = '获得' + get.translation(target);
                    var range = get.select(event.selectButton);
                    if (range[0] == range[1])
                        str += get.cnNumber(range[0]);
                    else if (range[1] == Infinity)
                        str += '至少' + get.cnNumber(range[0]);
                    else
                        str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                    str += '张';
                    if (event.position == 'h' || event.position == undefined)
                        str += '手';
                    if (event.position == 'e')
                        str += '装备';
                    str += '牌';
                    event.prompt = str;
                }
                if (event.prompt) {
                    event.dialog.add(event.prompt);
                }
                if (event.prompt2) {
                    event.dialog.addText(event.prompt2);
                }
                var directh = (!lib.config.unauto_choose && !event.complexSelect);
                directh = game.showPlayerCard(event, target, directh, 'canBeGained');
                if (event.dialog.buttons.length == 0) {
                    event.dialog.close();
                    event.finish();
                    return;
                }
                var cs = target.getCards(event.position);
                var select = get.select(event.selectButton);
                if (event.forced && select[0] >= cs.length) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons,
                        links: cs
                    };
                }
                else if (event.forced && directh && !event.isOnline() && select[0] == select[1]) {
                    event.result = {
                        bool: true,
                        buttons: event.dialog.buttons.randomGets(select[0]),
                        links: []
                    };
                    for (var i = 0; i < event.result.buttons.length; i++) {
                        event.result.links[i] = event.result.buttons[i].link;
                    }
                }
                else {
                    if (event.isMine()) {
                        event.dialog.open();
                        game.check();
                        game.pause();
                    }
                    else if (event.isOnline()) {
                        event.send();
                    }
                    else {
                        event.result = 'ai';
                    }
                }
                "step 1";
                if (event.result == 'ai') {
                    game.check();
                    if (ai.basic.chooseButton(event.ai) || event.forced)
                        ui.click.ok();
                    else
                        ui.click.cancel();
                }
                event.dialog.close();
                "step 2";
                event.resume();
                if (game.online || !event.result.bool) {
                    event.finish();
                }
                "step 3";
                if (event.logSkill && event.result.bool && !game.online) {
                    if (typeof event.logSkill == 'string') {
                        player.logSkill(event.logSkill);
                    }
                    else if (Array.isArray(event.logSkill)) {
                        player.logSkill.apply(player, event.logSkill);
                    }
                }
                var cards = [];
                for (var i = 0; i < event.result.links.length; i++) {
                    cards.push(event.result.links[i]);
                }
                event.result.cards = event.result.links.slice(0);
                event.cards = cards;
                event.trigger("rewriteGainResult");
                "step 4";
                if (event.boolline) {
                    player.line(target, 'green');
                }
                if (!event.chooseonly) {
                    if (event.delay !== false) {
                        var next = player.gain(event.cards, target, event.visibleMove ? 'give' : 'giveAuto', 'bySelf');
                        event.done = next;
                    }
                    else {
                        var next = player.gain(event.cards, target, 'bySelf');
                        event.done = next;
                        target[event.visibleMove ? '$give' : '$giveAuto'](cards, player);
                        if (event.visibleMove)
                            next.visible = true;
                    }
                }
                else
                    target[event.visibleMove ? '$give' : '$giveAuto'](cards, player);
            },
            /**
                * 展示角色手牌
                * @name content.showHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            showHandcards: function () {
                "step 0";
                if (player.countCards('h') == 0) {
                    event.finish();
                    return;
                }
                var cards = player.getCards('h');
                var str = get.translation(player.name) + '的手牌';
                if (typeof event.prompt == 'string') {
                    str = event.prompt;
                }
                event.dialog = ui.create.dialog(str, cards);
                event.dialogid = lib.status.videoId++;
                event.dialog.videoId = event.dialogid;
                game.broadcast(function (str, cards, id) {
                    ui.create.dialog(str, cards).videoId = id;
                }, str, cards, event.dialogid);
                game.log(player, '展示了', cards);
                game.addVideo('showCards', player, [str, get.cardsInfo(cards)]);
                game.delayx(2);
                "step 1";
                game.broadcast('closeDialog', event.dialogid);
                event.dialog.close();
            },
            /**
                * 展示角色的牌
                * @name content.showHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            showCards: function () {
                "step 0";
                if (get.itemtype(cards) != 'cards') {
                    event.finish();
                    return;
                }
                if (!event.str) {
                    event.str = get.translation(player.name) + '展示的牌';
                }
                event.dialog = ui.create.dialog(event.str, cards);
                event.dialogid = lib.status.videoId++;
                event.dialog.videoId = event.dialogid;
                if (event.hiddencards) {
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        if (event.hiddencards.contains(event.dialog.buttons[i].link)) {
                            event.dialog.buttons[i].className = 'button card';
                            event.dialog.buttons[i].innerHTML = '';
                        }
                    }
                }
                game.broadcast(function (str, cards, cards2, id) {
                    var dialog = ui.create.dialog(str, cards);
                    dialog.forcebutton = true;
                    dialog.videoId = id;
                    if (cards2) {
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (cards2.contains(dialog.buttons[i].link)) {
                                dialog.buttons[i].className = 'button card';
                                dialog.buttons[i].innerHTML = '';
                            }
                        }
                    }
                }, event.str, cards, event.hiddencards, event.dialogid);
                if (event.hiddencards) {
                    var cards2 = cards.slice(0);
                    for (var i = 0; i < event.hiddencards.length; i++) {
                        cards2.remove(event.hiddencards[i]);
                    }
                    game.log(player, '展示了', cards2);
                }
                else {
                    game.log(player, '展示了', cards);
                }
                game.delayx(2);
                game.addVideo('showCards', player, [event.str, get.cardsInfo(cards)]);
                "step 1";
                game.broadcast('closeDialog', event.dialogid);
                event.dialog.close();
            },
            /**
                * 查看牌
                * @name content.showHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            viewCards: function () {
                "step 0";
                if (player == game.me) {
                    event.dialog = ui.create.dialog(event.str, event.cards);
                    if (event.isMine()) {
                        game.pause();
                        ui.create.confirm('o');
                        game.countChoose();
                        event.choosing = true;
                    }
                    else {
                        event.finish();
                        event.result = 'viewed';
                        setTimeout(function () {
                            event.dialog.close();
                        }, 2 * lib.config.duration);
                        game.delayx(2);
                    }
                }
                else if (event.isOnline()) {
                    event.send();
                }
                else {
                    event.finish();
                }
                "step 1";
                event.result = 'viewed';
                _status.imchoosing = false;
                event.choosing = false;
                if (event.dialog)
                    event.dialog.close();
            },
            /**
                * 移动牌位置
                * @name content.moveCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Object} event.result 返回选择结果给父事件
                */
            moveCard: function () {
                'step 0';
                if (!player.canMoveCard(null, event.nojudge, event.moveHandcard)) {
                    event.finish();
                    return;
                }
                var next = player.chooseTarget(2, function (card, player, target) {
                    if (_status.event.sourceFilterTarget && typeof _status.event.sourceFilterTarget == 'function') {
                        if (!_status.event.sourceFilterTarget(card, player, target))
                            return false;
                    }
                    if (ui.selected.targets.length) {
                        var from = ui.selected.targets[0];
                        if (_status.event.moveHandcard && from.countCards('h') > 0)
                            return true;
                        var js = from.getCards('j');
                        for (var i = 0; i < js.length; i++) {
                            if (_status.event.nojudge)
                                break;
                            if (target.canAddJudge(js[i]))
                                return true;
                        }
                        if (target.isMin())
                            return false;
                        var es = from.getCards('e');
                        for (var i = 0; i < es.length; i++) {
                            if (target.isEmpty(get.subtype(es[i])))
                                return true;
                        }
                        return false;
                    }
                    else {
                        var range = 'ej';
                        if (_status.event.nojudge)
                            range = 'e';
                        if (_status.event.moveHandcard)
                            range = 'h' + range;
                        return target.countCards(range) > 0;
                    }
                });
                next.set('nojudge', event.nojudge || false);
                next.set('moveHandcard', event.moveHandcard || false);
                next.set('sourceFilterTarget', event.sourceFilterTarget || false);
                next.set('ai', event.ai || function (target) {
                    var player = _status.event.player;
                    var att = get.attitude(player, target);
                    var sgnatt = get.sgn(att);
                    if (ui.selected.targets.length == 0) {
                        if (att > 0) {
                            if (!_status.event.nojudge && target.countCards('j', function (card) {
                                return game.hasPlayer(function (current) {
                                    return current != target && current.canAddJudge(card) && get.attitude(player, current) < 0;
                                });
                            }))
                                return 14;
                            if (target.countCards('e', function (card) {
                                return get.value(card, target) < 0 && game.hasPlayer(function (current) {
                                    return current != target && get.attitude(player, current) < 0 && current.isEmpty(get.subtype(card)) && get.effect(target, card, player, player) < 0;
                                });
                            }) > 0)
                                return 9;
                        }
                        else if (att < 0) {
                            if (game.hasPlayer(function (current) {
                                if (current != target && get.attitude(player, current) > 0) {
                                    var es = target.getCards('e');
                                    for (var i = 0; i < es.length; i++) {
                                        if (get.value(es[i], target) > 0 && current.isEmpty(get.subtype(es[i])) && get.effect(current, es[i], player, player) > 0)
                                            return true;
                                    }
                                }
                            })) {
                                return -att;
                            }
                        }
                        return 0;
                    }
                    var es = ui.selected.targets[0].getCards('e');
                    var i;
                    var att2 = get.sgn(get.attitude(player, ui.selected.targets[0]));
                    for (i = 0; i < es.length; i++) {
                        if (sgnatt != 0 && att2 != 0 && sgnatt != att2 &&
                            get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
                            get.sgn(get.effect(target, es[i], player, target)) == sgnatt &&
                            target.isEmpty(get.subtype(es[i]))) {
                            return Math.abs(att);
                        }
                    }
                    if (i == es.length && (_status.event.nojudge || !ui.selected.targets[0].countCards('j', function (card) {
                        return target.canAddJudge(card);
                    }) || att2 <= 0)) {
                        return 0;
                    }
                    return -att * att2;
                });
                next.set('multitarget', true);
                next.set('targetprompt', _status.event.targetprompt || ['被移走', '移动目标']);
                next.set('prompt', event.prompt || '移动场上的一张牌');
                if (event.prompt2)
                    next.set('prompt2', event.prompt2);
                if (event.forced)
                    next.set('forced', true);
                'step 1';
                event.result = result;
                if (result.bool) {
                    player.line2(result.targets, 'green');
                    event.targets = result.targets;
                }
                else {
                    event.finish();
                }
                'step 2';
                game.delay();
                'step 3';
                if (targets.length == 2) {
                    player.choosePlayerCard('hej', true, function (button) {
                        var player = _status.event.player;
                        var targets0 = _status.event.targets0;
                        var targets1 = _status.event.targets1;
                        if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
                            if (get.position(button.link) == 'j')
                                return 12;
                            if (get.value(button.link, targets0) < 0 && get.effect(targets1, button.link, player, targets1) > 0)
                                return 10;
                            return 0;
                        }
                        else {
                            if (get.position(button.link) == 'j')
                                return -10;
                            return get.value(button.link) * get.effect(targets1, button.link, player, targets1);
                        }
                    }, targets[0]).set('nojudge', event.nojudge || false).set('targets0', targets[0]).set('targets1', targets[1]).set('filterButton', function (button) {
                        var targets1 = _status.event.targets1;
                        if (get.position(button.link) == 'h') {
                            if (!_status.event.moveHandcard)
                                return false;
                            return true;
                        }
                        if (get.position(button.link) == 'j') {
                            if (_status.event.nojudge)
                                return false;
                            return targets1.canAddJudge(button.link);
                        }
                        else {
                            return targets1.isEmpty(get.subtype(button.link));
                        }
                    }).set('moveHandcard', event.moveHandcard || false);
                }
                else {
                    event.finish();
                }
                'step 4';
                if (result.bool && result.links.length) {
                    var link = result.links[0];
                    if (get.position(link) == 'e') {
                        event.targets[1].equip(link);
                    }
                    else if (get.position(link) == 'h') {
                        event.targets[0].give(link, event.targets[1], 'giveAuto');
                    }
                    else if (link.viewAs) {
                        event.targets[1].addJudge({ name: link.viewAs }, [link]);
                    }
                    else {
                        event.targets[1].addJudge(link);
                    }
                    if (get.position(link) != 'h') {
                        event.targets[0].$give(link, event.targets[1], false);
                        game.log(event.targets[0], '的', link, '被移动给了', event.targets[1]);
                    }
                    event.result.card = link;
                    event.result.position = get.position(link);
                    game.delay();
                }
            },
            /**
                * 角色使用牌
                * @name content.useCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {?Object} event.result 返回选择使用结果(如果有)给父事件
                */
            useCard: function () {
                "step 0";
                if (!card) {
                    console.log('err: no card', get.translation(event.player));
                    event.finish();
                    return;
                }
                if (!get.info(card, false).noForceDie)
                    event.forceDie = true;
                var next = player.lose(cards, 'visible', ui.ordering).set('type', 'use');
                var directDiscard = [];
                for (var i = 0; i < cards.length; i++) {
                    if (!next.cards.contains(cards[i])) {
                        directDiscard.push(cards[i]);
                    }
                }
                if (directDiscard.length)
                    game.cardsGotoOrdering(directDiscard);
                //player.using=cards;
                var cardaudio = true;
                if (event.skill) {
                    if (lib.skill[event.skill].audio) {
                        cardaudio = false;
                    }
                    if (lib.skill[event.skill].log != false) {
                        player.logSkill(event.skill);
                    }
                    if (get.info(event.skill).popname) {
                        player.tryCardAnimate(card, event.card.name, 'metal', true);
                    }
                }
                else if (!event.nopopup) {
                    if (lib.translate[event.card.name + '_pop']) {
                        player.tryCardAnimate(card, lib.translate[event.card.name + '_pop'], 'metal');
                    }
                    else {
                        player.tryCardAnimate(card, event.card.name, 'metal');
                    }
                }
                if (event.audio === false) {
                    cardaudio = false;
                }
                if (cardaudio) {
                    game.broadcastAll(function (player, card) {
                        if (lib.config.background_audio) {
                            if (get.type(card) == 'equip' && !lib.config.equip_audio)
                                return;
                            var sex = player.sex == 'female' ? 'female' : 'male';
                            var audioinfo = lib.card[card.name].audio;
                            // if(audioinfo||true){
                            if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder' || card.nature == 'ice' || card.nature == 'ocean')) {
                                game.playAudio('card', sex, card.name + '_' + card.nature);
                            }
                            else {
                                if (typeof audioinfo == 'string') {
                                    if (audioinfo.indexOf('ext:') == 0)
                                        game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
                                    else
                                        game.playAudio('card', sex, audioinfo);
                                }
                                else {
                                    game.playAudio('card', sex, card.name);
                                }
                            }
                            // }
                            // else if(get.type(card)!='equip'){
                            //     game.playAudio('card/default');
                            // }
                        }
                    }, player, card);
                }
                if (event.animate != false && event.line != false) {
                    if ((card.name == 'wuxie' || card.name == 'youdishenru') && event.getParent().source) {
                        var lining = event.getParent().sourcex || event.getParent().source2 || event.getParent().source;
                        if (lining == player && event.getParent().sourcex2) {
                            lining = event.getParent().sourcex2;
                        }
                        if (Array.isArray(lining) && event.getTrigger().name == 'jiedao') {
                            player.line(lining[0], 'green');
                        }
                        else {
                            player.line(lining, 'green');
                        }
                    }
                    else {
                        var config = {};
                        if (card.nature == 'fire' ||
                            (card.classList && card.classList.contains('fire'))) {
                            config.color = 'fire';
                        }
                        else if (card.nature == 'thunder' ||
                            (card.classList && card.classList.contains('thunder'))) {
                            config.color = 'thunder';
                        }
                        else if (card.nature == 'ocean' ||
                            (card.classList && card.classList.contains('ocean'))) {
                            config.color = 'ocean';
                        }
                        else if (card.nature == 'yami' ||
                            (card.classList && card.classList.contains('yami'))) {
                            config.color = 'yami';
                        }
                        if (event.addedTarget) {
                            player.line2(targets.concat(event.addedTargets), config);
                        }
                        else if (get.info(card, false).multitarget && targets.length > 1 && !get.info(card, false).multiline) {
                            player.line2(targets, config);
                        }
                        else {
                            player.line(targets, config);
                        }
                    }
                    if (event.throw !== false)
                        player.$throw(cards);
                    if (lib.config.sync_speed && cards[0] && cards[0].clone) {
                        var waitingForTransition = get.time();
                        event.waitingForTransition = waitingForTransition;
                        cards[0].clone.listenTransition(function () {
                            if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                                game.resume();
                            }
                            delete event.waitingForTransition;
                        });
                    }
                }
                event.id = get.id();
                event.excluded = [];
                event.directHit = [];
                event.customArgs = { default: {} };
                if (typeof event.baseDamage != 'number')
                    event.baseDamage = get.info(card, false).baseDamage || 1;
                if (event.oncard) {
                    event.oncard(event.card, event.player);
                }
                player.actionHistory[player.actionHistory.length - 1].useCard.push(event);
                if (event.addCount !== false) {
                    if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
                        player.stat[player.stat.length - 1].card[card.name] = 1;
                    }
                    else {
                        player.stat[player.stat.length - 1].card[card.name]++;
                    }
                    if (event.skill) {
                        if (player.stat[player.stat.length - 1].skill[event.skill] == undefined) {
                            player.stat[player.stat.length - 1].skill[event.skill] = 1;
                        }
                        else {
                            player.stat[player.stat.length - 1].skill[event.skill]++;
                        }
                        var sourceSkill = get.info(event.skill).sourceSkill;
                        if (sourceSkill) {
                            if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
                                player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
                            }
                            else {
                                player.stat[player.stat.length - 1].skill[sourceSkill]++;
                            }
                        }
                    }
                }
                if (targets.length) {
                    var str = (targets.length == 1 && targets[0] == player) ? '#b自己' : targets;
                    if (cards.length && !card.isCard) {
                        if (event.addedTarget) {
                            game.log(player, '对', str, '使用了', card, '（', cards, '，指向', event.addedTargets, '）');
                        }
                        else {
                            game.log(player, '对', str, '使用了', card, '（', cards, '）');
                        }
                    }
                    else {
                        if (event.addedTarget) {
                            game.log(player, '对', str, '使用了', card, '（指向', event.addedTargets, '）');
                        }
                        else {
                            game.log(player, '对', str, '使用了', card);
                        }
                    }
                }
                else {
                    if (cards.length && !card.isCard) {
                        if (event.addedTarget) {
                            game.log(player, '使用了', card, '（', cards, '，指向', event.addedTargets, '）');
                        }
                        else {
                            game.log(player, '使用了', card, '（', cards, '）');
                        }
                    }
                    else {
                        if (event.addedTarget) {
                            game.log(player, '使用了', card, '（指向', event.addedTargets, '）');
                        }
                        else {
                            game.log(player, '使用了', card);
                        }
                    }
                }
                if (card.name == 'wuxie') {
                    game.logv(player, [card, cards], [event.getTrigger().card]);
                }
                else {
                    game.logv(player, [card, cards], targets);
                }
                event.trigger('useCard1');
                "step 1";
                event.trigger('useCard2');
                "step 2";
                event.trigger('useCard');
                event._oncancel = function () {
                    game.broadcastAll(function (id) {
                        if (ui.tempnowuxie && ui.tempnowuxie._origin == id) {
                            ui.tempnowuxie.close();
                            delete ui.tempnowuxie;
                        }
                    }, event.id);
                };
                "step 3";
                event.sortTarget = function (animate, sort) {
                    var info = get.info(card, false);
                    if (num == 0 && targets.length > 1) {
                        if (!info.multitarget) {
                            if (!event.fixedSeat && !sort) {
                                targets.sortBySeat(player);
                            }
                            if (animate)
                                for (var i = 0; i < targets.length; i++) {
                                    targets[i].animate('target');
                                }
                        }
                        else if (animate) {
                            for (var i = 0; i < targets.length; i++) {
                                targets[i].animate('target');
                            }
                        }
                    }
                };
                event.sortTarget();
                event.getTriggerTarget = function (list1, list2) {
                    var listx = list1.slice(0).sortBySeat();
                    for (var i = 0; i < listx.length; i++) {
                        if (list2.numOf(listx[i]) < listx.numOf(listx[i]))
                            return listx[i];
                    }
                    return null;
                };
                var info = get.info(card, false);
                if (!info.nodelay && event.animate != false) {
                    if (event.delayx !== false) {
                        if (event.waitingForTransition) {
                            _status.waitingForTransition = event.waitingForTransition;
                            game.pause();
                        }
                        else {
                            game.delayx();
                        }
                    }
                }
                "step 4";
                if (event.all_excluded)
                    return;
                if (!event.triggeredTargets1)
                    event.triggeredTargets1 = [];
                var target = event.getTriggerTarget(targets, event.triggeredTargets1);
                if (target) {
                    event.triggeredTargets1.push(target);
                    var next = game.createEvent('useCardToPlayer', false);
                    if (event.triggeredTargets1.length == 1)
                        next.isFirstTarget = true;
                    next.setContent('emptyEvent');
                    next.targets = targets;
                    next.target = target;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.excluded = event.excluded;
                    next.directHit = event.directHit;
                    next.customArgs = event.customArgs;
                    if (event.forceDie)
                        next.forceDie = true;
                    event.redo();
                }
                "step 5";
                if (event.all_excluded)
                    return;
                if (!event.triggeredTargets2)
                    event.triggeredTargets2 = [];
                var target = event.getTriggerTarget(targets, event.triggeredTargets2);
                if (target) {
                    event.triggeredTargets2.push(target);
                    var next = game.createEvent('useCardToTarget', false);
                    if (event.triggeredTargets2.length == 1)
                        next.isFirstTarget = true;
                    next.setContent('emptyEvent');
                    next.targets = targets;
                    next.target = target;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.excluded = event.excluded;
                    next.directHit = event.directHit;
                    next.customArgs = event.customArgs;
                    if (event.forceDie)
                        next.forceDie = true;
                    event.redo();
                }
                "step 6";
                if (event.all_excluded)
                    return;
                if (!event.triggeredTargets3)
                    event.triggeredTargets3 = [];
                var target = event.getTriggerTarget(targets, event.triggeredTargets3);
                if (target) {
                    event.triggeredTargets3.push(target);
                    var next = game.createEvent('useCardToPlayered', false);
                    if (event.triggeredTargets3.length == 1)
                        next.isFirstTarget = true;
                    next.setContent('emptyEvent');
                    next.targets = targets;
                    next.target = target;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.excluded = event.excluded;
                    next.directHit = event.directHit;
                    next.customArgs = event.customArgs;
                    if (event.forceDie)
                        next.forceDie = true;
                    event.redo();
                }
                "step 7";
                if (event.all_excluded)
                    return;
                if (!event.triggeredTargets4)
                    event.triggeredTargets4 = [];
                var target = event.getTriggerTarget(targets, event.triggeredTargets4);
                if (target) {
                    event.triggeredTargets4.push(target);
                    var next = game.createEvent('useCardToTargeted', false);
                    if (event.triggeredTargets4.length == 1)
                        next.isFirstTarget = true;
                    next.setContent('emptyEvent');
                    next.targets = targets;
                    next.target = target;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.excluded = event.excluded;
                    next.directHit = event.directHit;
                    next.customArgs = event.customArgs;
                    if (event.forceDie)
                        next.forceDie = true;
                    if (targets.length == event.triggeredTargets4.length) {
                        event.sortTarget();
                    }
                    event.redo();
                }
                "step 8";
                var info = get.info(card, false);
                if (info.contentBefore) {
                    var next = game.createEvent(card.name + 'ContentBefore');
                    next.setContent(info.contentBefore);
                    next.targets = targets;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.type = 'precard';
                    if (event.forceDie)
                        next.forceDie = true;
                }
                else if (info.reverseOrder && get.is.versus() && targets.length > 1) {
                    var next = game.createEvent(card.name + 'ContentBefore');
                    next.setContent('reverseOrder');
                    next.targets = targets;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.type = 'precard';
                    if (event.forceDie)
                        next.forceDie = true;
                }
                "step 9";
                if (event.all_excluded)
                    return;
                var info = get.info(card, false);
                if (num == 0 && targets.length > 1) {
                    event.sortTarget(true, true);
                }
                if (targets[num] && targets[num].isDead())
                    return;
                if (targets[num] && targets[num].isOut())
                    return;
                if (targets[num] && targets[num].removed)
                    return;
                if (targets[num] && info.ignoreTarget && info.ignoreTarget(card, player, targets[num]))
                    return;
                if (targets.length == 0 && !info.notarget)
                    return;
                if (targets[num] && event.excluded.contains(targets[num])) {
                    var next = game.createEvent('useCardToExcluded', false);
                    next.setContent('emptyEvent');
                    next.targets = targets;
                    next.target = targets[num];
                    next.num = num;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    return;
                }
                ;
                var next = game.createEvent(card.name);
                next.setContent(info.content);
                next.targets = targets;
                next.card = card;
                next.cards = cards;
                next.player = player;
                next.num = num;
                next.type = 'card';
                next.skill = event.skill;
                next.multitarget = info.multitarget;
                next.preResult = event.preResult;
                next.baseDamage = event.baseDamage;
                if (event.forceDie)
                    next.forceDie = true;
                if (event.addedTargets) {
                    next.addedTargets = event.addedTargets;
                    next.addedTarget = event.addedTarget;
                    next._targets = event._targets;
                }
                if (info.targetDelay === false) {
                    event.targetDelay = false;
                }
                next.target = targets[num];
                for (var i in event.customArgs.default)
                    next[i] = event.customArgs.default[i];
                if (next.target && event.customArgs[next.target.playerid]) {
                    var customArgs = event.customArgs[next.target.playerid];
                    for (var i in customArgs)
                        next[i] = customArgs[i];
                }
                if (next.target && event.directHit.contains(next.target))
                    next.directHit = true;
                if (next.target && !info.multitarget) {
                    if (num == 0 && targets.length > 1) {
                        // var ttt=next.target;
                        // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
                    }
                    else {
                        next.target.animate('target');
                    }
                }
                if (!info.nodelay && num > 0) {
                    if (event.targetDelay !== false) {
                        game.delayx(0.5);
                    }
                }
                "step 10";
                if (event.all_excluded)
                    return;
                if (!get.info(event.card, false).multitarget && num < targets.length - 1 && !event.cancelled) {
                    event.num++;
                    event.goto(9);
                }
                "step 11";
                if (get.info(card, false).contentAfter) {
                    var next = game.createEvent(card.name + 'ContentAfter');
                    next.setContent(get.info(card, false).contentAfter);
                    next.targets = targets;
                    next.card = card;
                    next.cards = cards;
                    next.player = player;
                    next.preResult = event.preResult;
                    next.type = 'postcard';
                    if (event.forceDie)
                        next.forceDie = true;
                }
                "step 12";
                if (event.postAi) {
                    event.player.logAi(event.targets, event.card);
                }
                if (event._result) {
                    event.result = event._result;
                }
                //delete player.using;
                if (document.getElementsByClassName('thrown').length) {
                    if (event.delayx !== false)
                        game.delayx();
                }
                else {
                    event.finish();
                }
                "step 13";
                event._oncancel();
            },
            /**
                * 角色使用技能
                * @name content.useSkill
                * @type {GameCores.Bases.StateMachine}
                */
            useSkill: function () {
                "step 0";
                var info = get.info(event.skill);
                if (!info.noForceDie)
                    event.forceDie = true;
                event._skill = event.skill;
                game.trySkillAudio(event.skill, player);
                var checkShow = player.checkShow(event.skill);
                if (info.discard != false && info.lose != false && !info.viewAs) {
                    player.discard(cards).delay = false;
                    if (lib.config.low_performance) {
                        event.discardTransition = true;
                    }
                }
                else {
                    if (info.lose != false) {
                        if (info.losetrigger == false) {
                            var losecard = player.lose(cards, ui.special)._triggered = null;
                        }
                        else {
                            var losecard = player.lose(cards, ui.special);
                            if (info.visible)
                                losecard.visible = true;
                            if (info.loseTo)
                                losecard.position = ui[info.loseTo];
                            if (info.insert)
                                losecard.insert_card = true;
                            if (losecard.position == ui.special && info.toStorage)
                                losecard.toStorage = true;
                        }
                    }
                    if (!info.prepare && info.viewAs) {
                        player.$throw(cards);
                        if (losecard)
                            losecard.visible = true;
                        if (lib.config.sync_speed && cards[0] && cards[0].clone) {
                            var waitingForTransition = get.time();
                            event.waitingForTransition = waitingForTransition;
                            cards[0].clone.listenTransition(function () {
                                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                                    game.resume();
                                }
                                delete event.waitingForTransition;
                            });
                        }
                    }
                }
                if (info.line != false && targets.length) {
                    var config = {};
                    if (get.is.object(info.line))
                        config = info.line;
                    else if (info.line == 'fire') {
                        config.color = 'fire';
                    }
                    else if (info.line == 'thunder') {
                        config.color = 'thunder';
                    }
                    else if (info.line == 'ocean') {
                        config.color = 'ocean';
                    }
                    else if (info.line === undefined || info.line == 'green') {
                        config.color = 'green';
                    }
                    if (info.multitarget && !info.multiline && targets.length > 1) {
                        player.line2(targets, config);
                    }
                    else {
                        player.line(targets, config);
                    }
                }
                var str = '';
                if (targets && targets.length && info.log != 'notarget') {
                    str += '对<span class="bluetext">' + (targets[0] == player ? '自己' : get.translation(targets[0]));
                    for (var i = 1; i < targets.length; i++) {
                        str += '、' + (targets[i] == player ? '自己' : get.translation(targets[i]));
                    }
                    str += '</span>';
                }
                str += '发动了';
                if (!info.direct) {
                    game.log(player, str, '#p『' + get.skillTranslation(skill, player) + '』');
                    if (info.logv !== false)
                        game.logv(player, skill, targets);
                    player.trySkillAnimate(skill, skill, checkShow);
                }
                if (event.addCount != false) {
                    if (player.stat[player.stat.length - 1].skill[skill] == undefined) {
                        player.stat[player.stat.length - 1].skill[skill] = 1;
                    }
                    else {
                        player.stat[player.stat.length - 1].skill[skill]++;
                    }
                    var sourceSkill = get.info(skill).sourceSkill;
                    if (sourceSkill) {
                        if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
                            player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
                        }
                        else {
                            player.stat[player.stat.length - 1].skill[sourceSkill]++;
                        }
                    }
                }
                if (player.stat[player.stat.length - 1].allSkills == undefined) {
                    player.stat[player.stat.length - 1].allSkills = 1;
                }
                else {
                    player.stat[player.stat.length - 1].allSkills++;
                }
                if (info.prepare) {
                    switch (info.prepare) {
                        case 'give':
                            if (losecard)
                                losecard.visible = true;
                            player.$give(cards, targets[0]);
                            break;
                        case 'give2':
                            player.$give(cards.length, targets[0]);
                            break;
                        case 'throw':
                            if (losecard)
                                losecard.visible = true;
                            player.$throw(cards);
                            break;
                        case 'throw2':
                            player.$throw(cards.length);
                            break;
                        default: info.prepare(cards, player, targets);
                    }
                }
                if (info.round) {
                    var roundname = skill + '_roundcount';
                    player.storage[roundname] = game.roundNumber;
                    player.syncStorage(roundname);
                    player.markSkill(roundname);
                }
                "step 1";
                var info = get.info(event.skill);
                if (info && info.contentBefore) {
                    var next = game.createEvent(event.skill + 'ContentBefore');
                    next.setContent(info.contentBefore);
                    next.targets = targets;
                    next.cards = cards;
                    next.player = player;
                    if (event.forceDie)
                        next.forceDie = true;
                }
                "step 2";
                if (!event.skill) {
                    console.log('error: no skill', get.translation(event.player), event.player.getSkills());
                    if (event._skill) {
                        event.skill = event._skill;
                        console.log(event._skill);
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                var info = get.info(event.skill);
                if (targets[num] && targets[num].isDead() ||
                    targets[num] && targets[num].isOut() ||
                    targets[num] && targets[num].removed) {
                    if (!info.multitarget && num < targets.length - 1) {
                        event.num++;
                        event.redo();
                    }
                    return;
                }
                var next = game.createEvent(event.skill);
                next.setContent(info.content);
                next.targets = targets;
                next.cards = cards;
                next.player = player;
                next.num = num;
                next.multitarget = info.multitarget;
                if (num == 0 && next.targets.length > 1) {
                    if (!info.multitarget) {
                        lib.tempSortSeat = player;
                        targets.sort(lib.sort.seat);
                        delete lib.tempSortSeat;
                    }
                    for (var i = 0; i < targets.length; i++) {
                        targets[i].animate('target');
                    }
                }
                next.target = targets[num];
                if (event.forceDie)
                    next.forceDie = true;
                if (next.target && !info.multitarget) {
                    if (num == 0 && targets.length > 1) {
                        // var ttt=next.target;
                        // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
                    }
                    else {
                        next.target.animate('target');
                    }
                }
                if (num == 0) {
                    if (typeof info.delay == 'number')
                        game.delay(info.delay);
                    else if (info.delay !== false && info.delay !== 0) {
                        if (event.waitingForTransition) {
                            _status.waitingForTransition = event.waitingForTransition;
                            game.pause();
                        }
                        else {
                            game.delayx();
                        }
                    }
                }
                else
                    game.delayx(0.5);
                if (!info.multitarget && num < targets.length - 1) {
                    event.num++;
                    event.redo();
                }
                "step 3";
                var info = get.info(event.skill);
                if (info && info.contentAfter) {
                    var next = game.createEvent(event.skill + 'ContentAfter');
                    next.setContent(info.contentAfter);
                    next.targets = targets;
                    next.cards = cards;
                    next.player = player;
                    if (event.forceDie)
                        next.forceDie = true;
                }
                "step 4";
                if (player.getStat().allSkills > 200) {
                    player._noSkill = true;
                    console.log(player.name, event.skill);
                }
                if (document.getElementsByClassName('thrown').length) {
                    if (event.skill && get.info(event.skill).delay !== false && get.info(event.skill).delay !== 0)
                        game.delayx();
                }
                else {
                    event.finish();
                }
                "step 5";
                ui.clear();
            },
            /**
                * 从(牌库|牌堆顶|牌堆底)摸牌
                * @name content.useCard
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 当前事件
                * @property {!Array<GameCores.GameObjects.Card>} event.result 返回摸到的牌数组
                */
            draw: function () {
                // if(lib.config.background_audio){
                //     game.playAudio('effect','draw');
                // }
                // game.broadcast(function(){
                //     if(lib.config.background_audio){
                //         game.playAudio('effect','draw');
                //     }
                // });
                if (typeof event.minnum == 'number' && num < event.minnum) {
                    num = event.minnum;
                }
                if (event.drawDeck) {
                    if (event.drawDeck > num) {
                        event.drawDeck = num;
                    }
                    num -= event.drawDeck;
                }
                if (event.log != false) {
                    if (num > 0) {
                        if (event.bottom)
                            game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌');
                        else
                            game.log(player, '摸了' + get.cnNumber(num) + '张牌');
                    }
                    if (event.drawDeck) {
                        game.log(player, '从牌库中获得了' + get.cnNumber(event.drawDeck) + '张牌');
                    }
                }
                var cards;
                if (num > 0) {
                    if (event.bottom)
                        cards = get.bottomCards(num);
                    else if (player.getTopCards)
                        cards = player.getTopCards(num);
                    else
                        cards = get.cards(num);
                }
                else {
                    cards = [];
                }
                if (event.drawDeck) {
                    cards = cards.concat(player.getDeckCards(event.drawDeck));
                }
                if (event.animate != false) {
                    if (event.visible) {
                        var next = player.gain(cards, 'gain2');
                        if (event.bottom)
                            game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌（', cards, '）');
                        else
                            game.log(player, '摸了' + get.cnNumber(num) + '张牌（', cards, '）');
                    }
                    else {
                        var next = player.gain(cards, 'draw');
                    }
                }
                else {
                    var next = player.gain(cards);
                    if (event.$draw) {
                        player.$draw(cards.length);
                    }
                }
                if (event.gaintag)
                    next.gaintag.addArray(event.gaintag);
                event.result = cards;
            },
            /**
                * 从(手牌区|装备区|武将牌上|判定区)弃置牌
                * @name content.discard
                * @type {GameCores.Bases.StateMachine}
                */
            discard: function () {
                "step 0";
                game.log(player, '弃置了', cards);
                event.done = player.lose(cards, event.position, 'visible').type = 'discard';
                "step 1";
                event.trigger('discard');
            },
            /**
                * 角色打出牌
                * @name content.respond
                * @type {GameCores.Bases.StateMachine}
                */
            respond: function () {
                'step 0';
                var cardaudio = true;
                if (event.skill) {
                    if (lib.skill[event.skill].audio) {
                        cardaudio = false;
                    }
                    player.logSkill(event.skill);
                    player.checkShow(event.skill, true);
                    if (lib.skill[event.skill].onrespond && !game.online) {
                        lib.skill[event.skill].onrespond(event, player);
                    }
                }
                else if (!event.nopopup)
                    player.tryCardAnimate(card, card.name, 'wood');
                if (cardaudio && event.getParent(3).name == 'useCard') {
                    game.broadcastAll(function (player, card) {
                        if (lib.config.background_audio) {
                            var sex = player.sex == 'female' ? 'female' : 'male';
                            var audioinfo = lib.card[card.name].audio;
                            // if(audioinfo||true){
                            if (typeof audioinfo == 'string' && audioinfo.indexOf('ext:') == 0) {
                                game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
                            }
                            else {
                                game.playAudio('card', sex, card.name);
                            }
                            // }
                            // else{
                            //     game.playAudio('card/default');
                            // }
                        }
                    }, player, card);
                }
                if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
                    game.log(player, '打出了', card, '（', cards, '）');
                }
                else {
                    game.log(player, '打出了', card);
                }
                player.actionHistory[player.actionHistory.length - 1].respond.push(event);
                var cards2 = cards.slice(0);
                if (cards2.length) {
                    var next = player.lose(cards2, ui.ordering, 'visible');
                    if (event.noOrdering)
                        next.noOrdering = true;
                    cards2.removeArray(next.cards);
                    if (cards2.length) {
                        var next2 = game.cardsGotoOrdering(cards2);
                        if (event.noOrdering)
                            next2.noOrdering = true;
                    }
                }
                if (event.animate != false && event.throw !== false) {
                    for (var i = 0; i < cards.length; i++) {
                        player.$throw(cards[i]);
                        if (event.highlight) {
                            cards[i].clone.classList.add('thrownhighlight');
                            game.addVideo('highlightnode', player, get.cardInfo(cards[i]));
                        }
                    }
                    if (event.highlight) {
                        game.broadcast(function (cards) {
                            for (var i = 0; i < cards.length; i++) {
                                if (cards[i].clone) {
                                    cards[i].clone.classList.add('thrownhighlight');
                                }
                            }
                        }, cards);
                    }
                }
                event.trigger('respond');
                'step 1';
                game.delayx(0.5);
            },
            /**
                * 角色和目标交换(手)牌
                * @name content.swapHandcards
                * @type {GameCores.Bases.StateMachine}
                */
            swapHandcards: function () {
                'step 0';
                event.cards1 = event.cards1 || player.getCards('h');
                event.cards2 = event.cards2 || target.getCards('h');
                game.loseAsync({
                    player: player,
                    target: target,
                    cards1: event.cards1,
                    cards2: event.cards2,
                }).setContent('swapHandcardsx');
                'step 1';
                player.gain(event.cards2);
                target.gain(event.cards1);
            },
            swapHandcardsx: function () {
                'step 0';
                player.$giveAuto(event.cards1, target);
                target.$giveAuto(event.cards2, player);
                'step 1';
                event.cards = event.cards1;
                var next = player.lose(event.cards, ui.ordering).getlx = false;
                next.relatedEvent = event.getParent();
                if (player == game.me) {
                    event.delayed = true;
                }
                else {
                    next.delay = false;
                }
                'step 2';
                event.cards = event.cards2;
                var next = target.lose(event.cards, ui.ordering).getlx = false;
                next.relatedEvent = event.getParent();
                if (target == game.me) {
                    event.delayed = true;
                }
                else {
                    next.delay = false;
                }
                'step 3';
                if (!event.delayed)
                    game.delay();
            },
            /**
                * 角色从每个目标获得一张牌
                * @name content.gainMultiple
                * @type {GameCores.Bases.StateMachine}
                */
            gainMultiple: function () {
                'step 0';
                event.delayed = false;
                event.num = 0;
                event.cards = [];
                'step 1';
                player.gainPlayerCard(targets[num], event.position, true).set('boolline', false).set('delay', num == targets.length - 1);
                'step 2';
                if (result.bool) {
                    event.cards.addArray(result.cards);
                    if (num == targets.length - 1)
                        event.delayed = true;
                }
                event.num++;
                if (event.num < targets.length) {
                    event.goto(1);
                }
                'step 3';
                if (!event.delayed)
                    game.delay();
            },
            /**
                * 角色获得牌
                * @name content.lose
                * @type {GameCores.Bases.StateMachine}
                */
            gain: function () {
                "step 0";
                if (cards) {
                    var map = {};
                    for (var i of cards) {
                        var owner = get.owner(i, 'judge');
                        if (owner && (owner != player || get.position(i) != 'h')) {
                            var id = owner.playerid;
                            if (!map[id])
                                map[id] = [];
                            map[id].push(i);
                        }
                    }
                    for (var i in map) {
                        var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                        var next = owner.lose(map[i], ui.special).set('type', 'gain').set('forceDie', true).set('getlx', false);
                        if (event.animate == 'give' || event.visible == true)
                            next.visible = true;
                        event.relatedLose = next;
                    }
                }
                else {
                    event.finish();
                }
                "step 1";
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].destroyed) {
                        if (player.hasSkill(cards[i].destroyed)) {
                            delete cards[i].destroyed;
                        }
                        else {
                            cards.splice(i--, 1);
                        }
                    }
                }
                if (cards.length == 0) {
                    event.finish();
                    return;
                }
                player.getHistory('gain').push(event);
                //if(event.source&&event.delay!==false) game.delayx();
                "step 2";
                if (player.getStat().gain == undefined) {
                    player.getStat().gain = cards.length;
                }
                else {
                    player.getStat().gain += cards.length;
                }
                "step 3";
                var sort;
                var frag1 = document.createDocumentFragment();
                var frag2 = document.createDocumentFragment();
                var hs = player.getCards('hs');
                for (var i = 0; i < cards.length; i++) {
                    if (hs.contains(cards[i])) {
                        cards.splice(i--, 1);
                    }
                }
                for (var num = 0; num < cards.length; num++) {
                    sort = lib.config.sort_card(cards[num]);
                    if (lib.config.reverse_sort)
                        sort = -sort;
                    cards[num].fix();
                    cards[num].style.transform = '';
                    cards[num].addGaintag(event.gaintag);
                    if (_status.discarded) {
                        _status.discarded.remove(cards[num]);
                    }
                    // cards[num].vanishtag.length=0;
                    for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
                        if (cards[num].vanishtag[num2][0] != '_') {
                            cards[num].vanishtag.splice(num2--, 1);
                        }
                    }
                    if (player == game.me) {
                        cards[num].classList.add('drawinghidden');
                    }
                    if (get.is.singleHandcard() || sort > 1)
                        frag1.appendChild(cards[num]);
                    else
                        frag2.appendChild(cards[num]);
                }
                var addv = function () {
                    if (player == game.me) {
                        game.addVideo('gain12', player, [get.cardsInfo(frag1.childNodes), get.cardsInfo(frag2.childNodes), event.gaintag]);
                    }
                };
                var broadcast = function () {
                    game.broadcast(function (player, cards, num, gaintag) {
                        player.directgain(cards, null, gaintag);
                        _status.cardPileNum = num;
                    }, player, cards, ui.cardPile.childNodes.length, event.gaintag);
                };
                if (event.animate == 'draw') {
                    player.$draw(cards.length);
                    game.pause();
                    setTimeout(function () {
                        addv();
                        player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
                        player.update();
                        if (player == game.me)
                            ui.updatehl();
                        broadcast();
                        game.resume();
                    }, get.delayx(500, 500));
                }
                else if (event.animate == 'gain') {
                    player.$gain(cards);
                    game.pause();
                    setTimeout(function () {
                        addv();
                        player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
                        player.update();
                        if (player == game.me)
                            ui.updatehl();
                        broadcast();
                        game.resume();
                    }, get.delayx(700, 700));
                }
                else if (event.animate == 'gain2' || event.animate == 'draw2') {
                    var gain2t = 300;
                    if (player.$gain2(cards) && player == game.me) {
                        gain2t = 500;
                    }
                    game.pause();
                    setTimeout(function () {
                        addv();
                        player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
                        player.update();
                        if (player == game.me)
                            ui.updatehl();
                        broadcast();
                        game.resume();
                    }, get.delayx(gain2t, gain2t));
                }
                else if (event.source && (event.animate == 'give' || event.animate == 'giveAuto')) {
                    if (event.animate == 'give')
                        event.source['$' + event.animate](cards, player);
                    else {
                        var givemap = { hs: [], ots: [] };
                        for (var i = 0; i < cards.length; i++) {
                            givemap[event.relatedLose && event.relatedLose.hs && event.relatedLose.hs.contains(cards[i]) ? 'hs' : 'ots'].push(cards[i]);
                        }
                        if (givemap.hs.length)
                            event.source.$giveAuto(givemap.hs, player);
                        if (givemap.ots.length)
                            event.source.$give(givemap.ots, player);
                    }
                    game.pause();
                    setTimeout(function () {
                        addv();
                        player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
                        player.update();
                        if (player == game.me)
                            ui.updatehl();
                        broadcast();
                        game.resume();
                    }, get.delayx(500, 500));
                }
                else {
                    addv();
                    player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
                    player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
                    player.update();
                    if (player == game.me)
                        ui.updatehl();
                    broadcast();
                    event.finish();
                }
                if (event.log) {
                    game.log(player, '获得了', cards);
                }
                "step 4";
                game.delayx();
            },
            /**
                * 失去牌至(弃牌堆|牌堆)，或将牌移动至武将牌上(special arena)
                * @name content.lose
                * @type {GameCores.Bases.StateMachine}
                */
            lose: function () {
                "step 0";
                var evt = event.getParent();
                if (evt.name != 'discard' && event.type != 'discard') {
                    event.delay = false;
                    return;
                }
                if (evt.delay === false)
                    event.delay = false;
                if (evt.animate != false) {
                    evt.discardid = lib.status.videoId++;
                    game.broadcastAll(function (player, cards, id) {
                        player.$throw(cards, null, 'nobroadcast');
                        var cardnodes = [];
                        cardnodes._discardtime = get.time();
                        for (var i = 0; i < cards.length; i++) {
                            if (cards[i].clone) {
                                cardnodes.push(cards[i].clone);
                            }
                        }
                        ui.todiscard[id] = cardnodes;
                    }, player, cards, evt.discardid);
                    if (lib.config.sync_speed && cards[0] && cards[0].clone) {
                        if (evt.delay != false) {
                            var waitingForTransition = get.time();
                            evt.waitingForTransition = waitingForTransition;
                            cards[0].clone.listenTransition(function () {
                                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                                    game.resume();
                                }
                                delete evt.waitingForTransition;
                            });
                        }
                        else if (evt.getParent().discardTransition) {
                            delete evt.getParent().discardTransition;
                            var waitingForTransition = get.time();
                            evt.getParent().waitingForTransition = waitingForTransition;
                            cards[0].clone.listenTransition(function () {
                                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                                    game.resume();
                                }
                                delete evt.getParent().waitingForTransition;
                            });
                        }
                    }
                }
                "step 1";
                event.gaintag_map = {};
                var hs = [], es = [], js = [], ss = [];
                if (event.insert_card && event.position == ui.cardPile)
                    event.cards.reverse();
                var hej = player.getCards('hejs');
                event.stockcards = cards.slice(0);
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].gaintag && cards[i].gaintag.length) {
                        event.gaintag_map[cards[i].cardid] = cards[i].gaintag.slice(0);
                        if (cards[i].hasGaintag('ming_'))
                            event.gaintag_map[cards[i].cardid].push('ming_');
                        if (cards[i].hasGaintag('an_'))
                            event.gaintag_map[cards[i].cardid].push('an_');
                        cards[i].removeGaintag(true);
                    }
                    if (!hej.contains(cards[i])) {
                        cards.splice(i--, 1);
                    }
                    else if (cards[i].parentNode) {
                        if (cards[i].parentNode.classList.contains('equips')) {
                            cards[i].original = 'e';
                            es.push(cards[i]);
                        }
                        else if (cards[i].parentNode.classList.contains('judges')) {
                            cards[i].original = 'j';
                            js.push(cards[i]);
                        }
                        else if (cards[i].parentNode.classList.contains('handcards')) {
                            if (cards[i].classList.contains('glows')) {
                                cards[i].original = 's';
                                ss.push(cards[i]);
                            }
                            else {
                                cards[i].original = 'h';
                                hs.push(cards[i]);
                            }
                        }
                        else {
                            cards[i].original = null;
                        }
                    }
                    cards[i].style.transform += ' scale(0.2)';
                    cards[i].classList.remove('glow');
                    cards[i].classList.remove('glows');
                    cards[i].recheck();
                    var info = lib.card[cards[i].name];
                    if (info.destroy || cards[i]._destroy) {
                        cards[i].delete();
                        cards[i].destroyed = info.destroy || cards[i]._destroy;
                    }
                    else if (event.position) {
                        if (_status.discarded) {
                            if (event.position == ui.discardPile) {
                                _status.discarded.add(cards[i]);
                            }
                            else {
                                _status.discarded.remove(cards[i]);
                            }
                        }
                        if (event.insert_index) {
                            event.position.insertBefore(cards[i], event.insert_index(event, cards[i]));
                            cards[i].fix();
                        }
                        else if (event.insert_card) {
                            event.position.insertBefore(cards[i], event.position.firstChild);
                            cards[i].fix();
                        }
                        else if (event.position == ui.cardPile) {
                            event.position.appendChild(cards[i]);
                            cards[i].fix();
                        }
                        else
                            cards[i].goto(event.position);
                    }
                    else {
                        cards[i].remove();
                    }
                    //if(ss.contains(cards[i])) cards.splice(i--,1);
                }
                if (player == game.me)
                    ui.updatehl();
                ui.updatej(player);
                game.broadcast(function (player, cards, num) {
                    for (var i = 0; i < cards.length; i++) {
                        cards[i].classList.remove('glow');
                        cards[i].classList.remove('glows');
                        cards[i].fix();
                        cards[i].remove();
                    }
                    if (player == game.me) {
                        ui.updatehl();
                    }
                    ui.updatej(player);
                    _status.cardPileNum = num;
                }, player, cards, ui.cardPile.childNodes.length);
                game.addVideo('lose', player, [get.cardsInfo(hs), get.cardsInfo(es), get.cardsInfo(js), get.cardsInfo(ss)]);
                event.cards2 = hs.concat(es);
                player.getHistory('lose').push(event);
                game.getGlobalHistory().cardMove.push(event);
                player.update();
                game.addVideo('loseAfter', player);
                event.num = 0;
                if (event.position == ui.ordering) {
                    var evt = event.relatedEvent || event.getParent();
                    if (!evt.orderingCards)
                        evt.orderingCards = [];
                    if (!event.noOrdering && !event.cardsOrdered) {
                        event.cardsOrdered = true;
                        var next = game.createEvent('orderingDiscard', false, evt.getParent());
                        next.relatedEvent = evt;
                        next.setContent('orderingDiscard');
                    }
                    if (!event.noOrdering) {
                        evt.orderingCards.addArray(cards);
                        evt.orderingCards.addArray(ss);
                    }
                }
                else if (event.position == ui.cardPile) {
                    game.updateRoundNumber();
                }
                event.hs = hs;
                event.es = es;
                event.js = js;
                event.ss = ss;
                "step 2";
                if (num < cards.length) {
                    let evt = event.getParent();
                    if (event.es.contains(cards[num])) {
                        event.moveEquip = false;
                        if ((evt.name == 'equip' && evt.cards.contains(cards[num]))
                            || (event.getParent() && event.getParent().name != 'swapEquip'))
                            event.moveEquip = true;
                        event.loseEquip = true;
                        player.removeEquipTrigger(cards[num], event.moveEquip);
                        var info = get.info(cards[num]);
                        if (info.onLose && (!info.filterLose || info.filterLose(cards[num], player))) {
                            event.goto(3);
                            return;
                        }
                    }
                    event.num++;
                    event.redo();
                }
                else {
                    if (event.loseEquip) {
                        player.addEquipTrigger();
                    }
                    event.goto(4);
                }
                "step 3";
                var info = get.info(cards[num]);
                if (info.loseDelay != false && (player.isAlive() || info.forceDie)) {
                    player.popup(cards[num].name);
                    game.delayx();
                }
                if (Array.isArray(info.onLose)) {
                    for (var i = 0; i < info.onLose.length; i++) {
                        var next = game.createEvent('lose_' + cards[num].name);
                        next.setContent(info.onLose[i]);
                        if (info.forceDie)
                            next.forceDie = true;
                        next.player = player;
                        next.card = cards[num];
                    }
                }
                else {
                    var next = game.createEvent('lose_' + cards[num].name);
                    next.setContent(info.onLose);
                    next.player = player;
                    if (info.forceDie)
                        next.forceDie = true;
                    next.card = cards[num];
                }
                event.num++;
                event.goto(2);
                "step 4";
                var evt = event.getParent();
                if (evt.name != 'discard' && event.type != 'discard')
                    return;
                if (evt.delay != false) {
                    if (evt.waitingForTransition) {
                        _status.waitingForTransition = evt.waitingForTransition;
                        game.pause();
                    }
                    else {
                        game.delayx();
                    }
                }
            },
            /**
                * 令角色受到伤害
                * @name content.damage
                * @type {GameCores.Bases.StateMachine}
                */
            damage: function () {
                "step 0";
                event.forceDie = true;
                event.trigger('damageBegin1');
                "step 1";
                event.trigger('damageBegin2');
                "step 2";
                event.trigger('damageBegin3');
                "step 3";
                event.trigger('damageBegin4');
                "step 4";
                if (num > 0 && player.hujia && !player.hasSkillTag('nohujia') && !(source && source.hasSkillTag('overHujia', true, {
                    name: event.card ? event.card.name : null,
                    target: player,
                    card: event.card
                }))) {
                    if (num >= player.hujia) {
                        event.hujia = player.hujia;
                        num -= player.hujia;
                    }
                    else {
                        event.hujia = num;
                        num = 0;
                    }
                    player.changeHujia(-event.hujia).type = 'damage';
                }
                event.num = num;
                if (num <= 0) {
                    event.trigger('damageZero');
                    delete event.filterStop;
                    event.finish();
                    event._triggered = null;
                }
                if (num > 0) {
                    event.trigger('damageHit');
                }
                "step 5";
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
                }
                game.broadcast(function (num) {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
                    }
                }, num);
                var str = '受到了';
                if (source)
                    str += '来自<span class="bluetext">' + (source == player ? '自己' : get.translation(source)) + '</span>的';
                str += get.cnNumber(num) + '点';
                if (event.nature)
                    str += get.translation(event.nature) + '属性';
                str += '伤害';
                game.log(player, str);
                if (player.stat[player.stat.length - 1].damaged == undefined) {
                    player.stat[player.stat.length - 1].damaged = num;
                }
                else {
                    player.stat[player.stat.length - 1].damaged += num;
                }
                if (source) {
                    source.getHistory('sourceDamage').push(event);
                    if (source.stat[source.stat.length - 1].damage == undefined) {
                        source.stat[source.stat.length - 1].damage = num;
                    }
                    else {
                        source.stat[source.stat.length - 1].damage += num;
                    }
                }
                player.getHistory('damage').push(event);
                if (event.notrigger) {
                    player.changeHp(-num, false)._triggered = null;
                }
                else {
                    player.changeHp(-num, false);
                }
                if (event.animate !== false) {
                    player.$damage(source);
                    game.broadcastAll(function (nature, player) {
                        if (lib.config.animation && !lib.config.low_performance) {
                            if (nature == 'fire') {
                                player.$fire();
                            }
                            else if (nature == 'thunder') {
                                player.$thunder();
                            }
                        }
                    }, event.nature, player);
                    player.$damagepop(-num, event.nature);
                }
                if (!event.notrigger) {
                    if (num == 0) {
                        event.trigger('damageZero');
                        event._triggered = null;
                    }
                    else {
                        event.trigger('damage');
                    }
                }
                "step 6";
                if (player.hp <= 0 && player.isAlive()) {
                    game.delayx();
                    player.dying(event);
                }
                if (source && lib.config.border_style == 'auto') {
                    var dnum = 0;
                    for (var j = 0; j < source.stat.length; j++) {
                        if (source.stat[j].damage != undefined)
                            dnum += source.stat[j].damage;
                    }
                    if (dnum >= 2) {
                        if (lib.config.autoborder_start == 'silver') {
                            dnum += 4;
                        }
                        else if (lib.config.autoborder_start == 'gold') {
                            dnum += 8;
                        }
                    }
                    if (lib.config.autoborder_count == 'damage') {
                        source.node.framebg.dataset.decoration = '';
                        if (dnum >= 10) {
                            source.node.framebg.dataset.auto = 'gold';
                            if (dnum >= 12)
                                source.node.framebg.dataset.decoration = 'gold';
                        }
                        else if (dnum >= 6) {
                            source.node.framebg.dataset.auto = 'silver';
                            if (dnum >= 8)
                                source.node.framebg.dataset.decoration = 'silver';
                        }
                        else if (dnum >= 2) {
                            source.node.framebg.dataset.auto = 'bronze';
                            if (dnum >= 4)
                                source.node.framebg.dataset.decoration = 'bronze';
                        }
                        if (dnum >= 2) {
                            source.classList.add('topcount');
                        }
                    }
                    else if (lib.config.autoborder_count == 'mix') {
                        source.node.framebg.dataset.decoration = '';
                        switch (source.node.framebg.dataset.auto) {
                            case 'bronze':
                                if (dnum >= 4)
                                    source.node.framebg.dataset.decoration = 'bronze';
                                break;
                            case 'silver':
                                if (dnum >= 8)
                                    source.node.framebg.dataset.decoration = 'silver';
                                break;
                            case 'gold':
                                if (dnum >= 12)
                                    source.node.framebg.dataset.decoration = 'gold';
                                break;
                        }
                    }
                }
                "step 7";
                if (!event.notrigger)
                    event.trigger('damageSource');
            },
            /**
                * 角色回复血量
                * @name content.recover
                * @type {GameCores.Bases.StateMachine}
                */
            recover: function () {
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'recover');
                }
                game.broadcast(function () {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'recover');
                    }
                });
                if (num > player.maxHp - player.hp) {
                    num = player.maxHp - player.hp;
                    event.num = num;
                }
                if (num > 0) {
                    player.changeHp(num, false);
                    game.broadcastAll(function (player) {
                        if (lib.config.animation && !lib.config.low_performance) {
                            player.$recover();
                        }
                    }, player);
                    player.$damagepop(num, 'wood');
                    game.log(player, '回复了' + get.cnNumber(num) + '点' + get.translation('hp'));
                    event.result = num;
                }
                player.getHistory('recover').push(event);
            },
            /**
                * 令角色失去血量
                * @name content.loseHp
                * @type {GameCores.Bases.StateMachine}
                */
            loseHp: function () {
                "step 0";
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'loseHp');
                }
                game.broadcast(function () {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'loseHp');
                    }
                });
                game.log(player, '失去了' + get.cnNumber(num) + '点' + get.translation('hp'));
                player.changeHp(-num);
                "step 1";
                if (player.hp <= 0) {
                    game.delayx();
                    player.dying(event);
                }
            },
            /**
                * 双将模式下，如果“双将体力设置”选择为“平均值”，因此向下取整体力的角色可以摸一张牌
                * @name content.doubleDraw
                * @type {GameCores.Bases.StateMachine}
                */
            doubleDraw: function () {
                "step 0";
                player.chooseBool('你的主副将体力上限之和是奇数，是否摸一张牌？');
                "step 1";
                if (result.bool) {
                    player.draw();
                }
            },
            /**
                * 令角色减少血量上限
                * @name content.loseMaxHp
                * @type {GameCores.Bases.StateMachine}
                */
            loseMaxHp: function () {
                "step 0";
                game.log(player, '减少了' + get.cnNumber(num) + '点' + get.translation('hp') + '上限');
                player.maxHp -= num;
                event.loseHp = Math.max(0, player.hp - player.maxHp);
                player.update();
                "step 1";
                if (player.maxHp <= 0) {
                    player.die(event);
                }
            },
            /**
                * 令角色增加血量上限
                * @name content.gainMaxHp
                * @type {GameCores.Bases.StateMachine}
                */
            gainMaxHp: function () {
                "step 0";
                game.log(player, '增加了' + get.cnNumber(num) + '点' + get.translation('hp') + '上限');
                player.maxHp += num;
                player.update();
            },
            /**
                * 令角色改变血量(不能超过上限)
                * @name content.changeHp
                * @type {GameCores.Bases.StateMachine}
                */
            changeHp: function () {
                //柚子：这里加了一个改变体力前时机
                'step 0';
                event.trigger('changeHpBegin');
                'step 1';
                player.hp += num;
                if (isNaN(player.hp))
                    player.hp = 0;
                if (player.hp > player.maxHp)
                    player.hp = player.maxHp;
                player.update();
                if (event.popup !== false) {
                    player.$damagepop(num, 'water');
                }
                //改变体力后立即刷新濒死列表
                if (_status.dying.contains(player) && player.hp > 0) {
                    _status.dying.remove(player);
                    game.broadcast(function (list) {
                        _status.dying = list;
                    }, _status.dying);
                    var evt = event.getParent('_save');
                    if (evt && evt.finish)
                        evt.finish();
                    evt = event.getParent('dying');
                    if (evt && evt.finish)
                        evt.finish();
                }
                event.trigger('changeHp');
            },
            /**
                * 令角色获得/失去护甲
                * @name content.changeHujia
                * @type {GameCores.Bases.StateMachine}
                */
            changeHujia: function () {
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'hujia');
                }
                game.broadcast(function () {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'hujia');
                    }
                });
                player.hujia += num;
                player.$damagepop((num > 0 ? '+' + num : num), 'gray');
                if (num > 0) {
                    game.log(player, '获得了' + get.cnNumber(num) + '点护甲');
                }
                else if (num < 0) {
                    if (event.type == 'damage')
                        game.log(player, '的护甲抵挡了' + get.cnNumber(-num) + '点伤害');
                    //else if(event.type=='lose')	game.log(player,'失去了'+get.cnNumber(-num)+'点护甲');
                    else
                        game.log(player, '失去了' + get.cnNumber(-num) + '点护甲');
                }
                if (player.hujia < 0) {
                    player.hujia = 0;
                }
                player.getHistory('changeHujia').push(event);
                player.update();
            },
            /**
                * 角色濒死事件
                * @name content.dying
                * @type {GameCores.Bases.StateMachine}
                */
            dying: function () {
                "step 0";
                event.forceDie = true;
                if (player.isDying() || player.hp > 0) {
                    event.finish();
                    return;
                }
                _status.dying.unshift(player);
                game.broadcast(function (list) {
                    _status.dying = list;
                }, _status.dying);
                event.trigger('dying');
                game.log(player, '濒死');
                "step 1";
                delete event.filterStop;
                if (player.hp > 0) {
                    _status.dying.remove(player);
                    game.broadcast(function (list) {
                        _status.dying = list;
                    }, _status.dying);
                    event.finish();
                }
                else if (!event.skipTao) {
                    var next = game.createEvent('_save');
                    var start = false;
                    var starts = [_status.currentPhase, event.source, event.player, game.me, game.players[0]];
                    for (var i = 0; i < starts.length; i++) {
                        if (get.itemtype(starts[i]) == 'player') {
                            start = starts[i];
                            break;
                        }
                    }
                    next.player = start;
                    next._trigger = event;
                    next.triggername = '_save';
                    next.forceDie = true;
                    next.setContent(lib.skill._save.content);
                }
                "step 2";
                _status.dying.remove(player);
                game.broadcast(function (list) {
                    _status.dying = list;
                }, _status.dying);
                if (player.hp <= 0 && !player.nodying)
                    player.die(event.reason);
            },
            /**
                * 角色死亡事件
                * @name content.die
                * @type {GameCores.Bases.StateMachine}
                */
            die: function () {
                "step 0";
                event.forceDie = true;
                if (_status.roundStart == player) {
                    _status.roundStart = player.next || player.getNext() || game.players[0];
                }
                if (ui.land && ui.land.player == player) {
                    game.addVideo('destroyLand');
                    ui.land.destroy();
                }
                var unseen = false;
                if (player.classList.contains('unseen')) {
                    player.classList.remove('unseen');
                    unseen = true;
                }
                var logvid = game.logv(player, 'die', source);
                event.logvid = logvid;
                if (unseen) {
                    player.classList.add('unseen');
                }
                if (source) {
                    game.log(player, '被', source, '杀害');
                    if (source.stat[source.stat.length - 1].kill == undefined) {
                        source.stat[source.stat.length - 1].kill = 1;
                    }
                    else {
                        source.stat[source.stat.length - 1].kill++;
                    }
                }
                else {
                    game.log(player, '阵亡');
                }
                // player.removeEquipTrigger();
                // for(var i in lib.skill.globalmap){
                //     if(lib.skill.globalmap[i].contains(player)){
                //                  lib.skill.globalmap[i].remove(player);
                //                  if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
                //                               game.removeGlobalSkill(i);
                //                  }
                //     }
                // }
                game.broadcastAll(function (player) {
                    player.classList.add('dead');
                    player.removeLink();
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
                    _status.dying.remove(player);
                    if (lib.config.background_speak) {
                        if (lib.character[player.name] && lib.character[player.name][4].contains('die_audio')) {
                            game.playAudio('die', player.name);
                        }
                        // else if(true){
                        else {
                            game.playAudio('die', player.name, function () {
                                game.playAudio('die', player.name.slice(player.name.indexOf('_') + 1));
                            });
                        }
                    }
                }, player);
                game.addVideo('diex', player);
                if (event.animate !== false) {
                    player.$die(source);
                }
                if (player.hp != 0) {
                    player.changeHp(0 - player.hp, false).forceDie = true;
                }
                "step 1";
                if (player.dieAfter)
                    player.dieAfter(source);
                "step 2";
                event.trigger('die');
                "step 3";
                if (player.isDead()) {
                    if (!game.reserveDead) {
                        for (var mark in player.marks) {
                            player.unmarkSkill(mark);
                        }
                        while (player.node.marks.childNodes.length > 1) {
                            player.node.marks.lastChild.remove();
                        }
                        game.broadcast(function (player) {
                            while (player.node.marks.childNodes.length > 1) {
                                player.node.marks.lastChild.remove();
                            }
                        }, player);
                    }
                    for (var i in player.tempSkills) {
                        player.removeSkill(i);
                    }
                    var skills = player.getSkills();
                    for (var i = 0; i < skills.length; i++) {
                        if (lib.skill[skills[i]].temp) {
                            player.removeSkill(skills[i]);
                        }
                    }
                    if (_status.characterlist) {
                        if (lib.character[player.name])
                            _status.characterlist.add(player.name);
                        if (lib.character[player.name1])
                            _status.characterlist.add(player.name1);
                        if (lib.character[player.name2])
                            _status.characterlist.add(player.name2);
                    }
                    event.cards = player.getCards('hejs');
                    if (event.cards.length) {
                        player.discard(event.cards).forceDie = true;
                        //player.$throw(event.cards,1000);
                    }
                }
                "step 4";
                if (player.dieAfter2)
                    player.dieAfter2(source);
                "step 5";
                game.broadcastAll(function (player) {
                    if (game.online && player == game.me && !_status.over && !game.controlOver && !ui.exit) {
                        if (lib.mode[lib.configOL.mode].config.dierestart) {
                            ui.create.exit();
                        }
                    }
                }, player);
                if (!_status.connectMode && player == game.me && !_status.over && !game.controlOver) {
                    ui.control.show();
                    if (get.config('revive') && lib.mode[lib.config.mode].config.revive && !ui.revive) {
                        ui.revive = ui.create.control('revive', ui.click.dierevive);
                    }
                    if (get.config('continue_game') && !ui.continue_game && lib.mode[lib.config.mode].config.continue_game && !_status.brawl && !game.no_continue_game) {
                        ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                    }
                    if (get.config('dierestart') && lib.mode[lib.config.mode].config.dierestart && !ui.restart) {
                        ui.restart = ui.create.control('restart', game.reload);
                    }
                }
                if (!_status.connectMode && player == game.me && !game.modeSwapPlayer) {
                    // _status.auto=false;
                    if (ui.auto) {
                        // ui.auto.classList.remove('glow');
                        ui.auto.hide();
                    }
                    if (ui.wuxie)
                        ui.wuxie.hide();
                }
                if (typeof _status.coin == 'number' && source && !_status.auto) {
                    if (source == game.me || source.isUnderControl()) {
                        _status.coin += 10;
                    }
                }
                if (source && lib.config.border_style == 'auto' && (lib.config.autoborder_count == 'kill' || lib.config.autoborder_count == 'mix')) {
                    switch (source.node.framebg.dataset.auto) {
                        case 'gold':
                        case 'silver':
                            source.node.framebg.dataset.auto = 'gold';
                            break;
                        case 'bronze':
                            source.node.framebg.dataset.auto = 'silver';
                            break;
                        default: source.node.framebg.dataset.auto = lib.config.autoborder_start || 'bronze';
                    }
                    if (lib.config.autoborder_count == 'kill') {
                        source.node.framebg.dataset.decoration = source.node.framebg.dataset.auto;
                    }
                    else {
                        var dnum = 0;
                        for (var j = 0; j < source.stat.length; j++) {
                            if (source.stat[j].damage != undefined)
                                dnum += source.stat[j].damage;
                        }
                        source.node.framebg.dataset.decoration = '';
                        switch (source.node.framebg.dataset.auto) {
                            case 'bronze':
                                if (dnum >= 4)
                                    source.node.framebg.dataset.decoration = 'bronze';
                                break;
                            case 'silver':
                                if (dnum >= 8)
                                    source.node.framebg.dataset.decoration = 'silver';
                                break;
                            case 'gold':
                                if (dnum >= 12)
                                    source.node.framebg.dataset.decoration = 'gold';
                                break;
                        }
                    }
                    source.classList.add('topcount');
                }
            },
            /**
                * 角色使用装备牌
                * @name content.equip
                * @type {GameCores.Bases.StateMachine}
                */
            equip: function () {
                "step 0";
                console.log(card, cards);
                if (cards) {
                    var owner = get.owner(cards[0]);
                    if (owner)
                        owner.lose(card, ui.special, 'visible').set('type', 'equip').set('getlx', false);
                }
                "step 1";
                if (event.cancelled) {
                    event.finish();
                    return;
                }
                if (cards[0].destroyed) {
                    if (player.hasSkill(cards[0].destroyed)) {
                        delete cards[0].destroyed;
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                if (event.draw) {
                    game.delay(0, 300);
                    player.$draw(cards);
                }
                var viewAs = typeof card == 'string' ? card : card.name;
                event.viewAs = viewAs;
                if (!lib.card[viewAs]) {
                    cards[0].fix();
                    cards[0].style.transform = '';
                    cards[0].classList.remove('drawinghidden');
                    delete cards[0]._transform;
                    game.cardsDiscard(cards[0]);
                    event.finish();
                }
                "step 2";
                game.broadcast(function (player, card, viewAs) {
                    if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)) {
                        card.clone.moveDelete(player);
                        game.addVideo('gain2', player, get.cardsInfo([card]));
                    }
                }, player, cards[0], event.viewAs);
                if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)) {
                    cards[0].clone.moveDelete(player);
                    game.addVideo('gain2', player, get.cardsInfo(cards));
                }
                player.equiping = true;
                "step 3";
                var info = get.info(card, false);
                var current = player.getCards('e', function (card) {
                    if (info.customSwap)
                        return info.customSwap(card);
                    return get.subtype(card, false) == info.subtype;
                });
                if (current.length) {
                    player.lose(current, false, 'visible').set('type', 'equip').set('getlx', false);
                    if (info.loseThrow) {
                        player.$throw(current);
                    }
                    event.swapped = true;
                    event.redo();
                }
                if (get.itemtype(card) != 'card') {
                    if (typeof card == 'string')
                        cards[0].viewAs = card;
                    else
                        cards[0].viewAs = card.name;
                }
                else {
                    delete cards[0].viewAs;
                }
                "step 4";
                if (player.isMin() || player.countCards('e', { subtype: get.subtype(event.viewAs) })) {
                    event.finish();
                    game.cardsDiscard(cards[0]);
                    delete player.equiping;
                    return;
                }
                if (lib.config.background_audio) {
                    game.playAudio('effect', get.subtype(event.viewAs));
                }
                game.broadcast(function (type) {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', type);
                    }
                }, get.subtype(cards[0].viewAs));
                if (cards[0].viewAs && cards[0].viewAs != cards[0].name) {
                    player.$equip(cards[0], cards[0].viewAs);
                    game.addVideo('equip', player, get.cardInfo(cards[0].viewAs));
                    game.log(player, '装备了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards[0], '）');
                }
                else if (cards[0].originalName && cards[0].originalName != cards[0].name) {
                    player.$equip(cards[0]);
                    game.addVideo('equip', player, get.cardInfo(cards[0]));
                    game.log(player, '装备了', cards[0], '（【' + get.translation(cards[0].originalName) + '】）');
                }
                else {
                    player.$equip(cards[0]);
                    game.addVideo('equip', player, get.cardInfo(card));
                    game.log(player, '装备了', card);
                }
                "step 5";
                var info = get.info(card, false);
                if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
                    if (Array.isArray(info.onEquip)) {
                        for (var i = 0; i < info.onEquip.length; i++) {
                            var next = game.createEvent('equip_' + card.name);
                            next.setContent(info.onEquip[i]);
                            next.player = player;
                            next.card = card;
                        }
                    }
                    else {
                        var next = game.createEvent('equip_' + card.name);
                        next.setContent(info.onEquip);
                        next.player = player;
                        next.card = card;
                    }
                    if (info.equipDelay != 'false')
                        game.delayx();
                }
                delete player.equiping;
                if (event.delay) {
                    game.delayx();
                }
            },
            /**
                * 角色添加判定牌
                * @name content.addJudge
                * @type {GameCores.Bases.StateMachine}
                */
            addJudge: function () {
                "step 0";
                if (cards) {
                    var owner = get.owner(cards[0]);
                    if (owner) {
                        event.relatedLose = owner.lose(cards, 'visible').set('getlx', false);
                    }
                }
                "step 1";
                if (cards[0].destroyed) {
                    if (player.hasSkill(cards[0].destroyed)) {
                        delete cards[0].destroyed;
                    }
                    else {
                        event.finish();
                        return;
                    }
                }
                cards[0].fix();
                cards[0].style.transform = '';
                cards[0].classList.remove('drawinghidden');
                delete cards[0]._transform;
                var viewAs = typeof card == 'string' ? card : card.name;
                if (!lib.card[viewAs] || !lib.card[viewAs].effect) {
                    game.cardsDiscard(cards[0]);
                }
                else {
                    cards[0].style.transform = '';
                    cards[0].classList.add('drawinghidden');
                    player.node.judges.insertBefore(cards[0], player.node.judges.firstChild);
                    if (_status.discarded) {
                        _status.discarded.remove(cards[0]);
                    }
                    ui.updatej(player);
                    game.broadcast(function (player, card, viewAs) {
                        card.fix();
                        card.style.transform = '';
                        card.classList.add('drawinghidden');
                        card.viewAs = viewAs;
                        if (viewAs && viewAs != card.name && (card.classList.contains('fullskin') || card.classList.contains('fullborder'))) {
                            card.classList.add('fakejudge');
                            card.node.background.innerHTML = lib.translate[viewAs + '_bg'] || get.translation(viewAs)[0];
                        }
                        else {
                            card.classList.remove('fakejudge');
                        }
                        player.node.judges.insertBefore(card, player.node.judges.firstChild);
                        ui.updatej(player);
                        if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)) {
                            card.clone.moveDelete(player);
                            game.addVideo('gain2', player, get.cardsInfo([card]));
                        }
                    }, player, cards[0], viewAs);
                    if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)) {
                        cards[0].clone.moveDelete(player);
                        game.addVideo('gain2', player, get.cardsInfo(cards));
                    }
                    // player.$gain2(cards);
                    if (get.itemtype(card) != 'card') {
                        if (typeof card == 'string')
                            cards[0].viewAs = card;
                        else
                            cards[0].viewAs = card.name;
                    }
                    else {
                        delete cards[0].viewAs;
                    }
                    if (cards[0].viewAs && cards[0].viewAs != cards[0].name) {
                        if (cards[0].classList.contains('fullskin') || cards[0].classList.contains('fullborder')) {
                            cards[0].classList.add('fakejudge');
                            cards[0].node.background.innerHTML = lib.translate[cards[0].viewAs + '_bg'] || get.translation(cards[0].viewAs)[0];
                        }
                        //姑且改成了取单牌的形式，以后需要叠多张牌的时候再改回来
                        game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards[0], '）');
                    }
                    else {
                        cards[0].classList.remove('fakejudge');
                        game.log(player, '被贴上了', cards);
                    }
                    game.addVideo('addJudge', player, [get.cardInfo(cards[0]), cards[0].viewAs]);
                }
            },
            /**
                * 角色进行判定
                * @name content.judge
                * @type {GameCores.Bases.StateMachine}
                * @property {!Object} event 本事件
                * @property {!Object} event.result 将判定牌信息返回给父事件
                */
            judge: function () {
                "step 0";
                var judgestr = get.translation(player) + '的' + event.judgestr + '判定';
                event.videoId = lib.status.videoId++;
                var cardj = event.directresult;
                if (!cardj) {
                    if (player.getTopCards)
                        cardj = player.getTopCards()[0];
                    else
                        cardj = get.cards()[0];
                }
                var nextj = game.cardsGotoOrdering(cardj);
                if (event.position != ui.discardPile)
                    nextj.noOrdering = true;
                player.judging.unshift(cardj);
                game.addVideo('judge1', player, [get.cardInfo(player.judging[0]), judgestr, event.videoId]);
                game.broadcastAll(function (player, card, str, id, cardid) {
                    var event;
                    if (game.online) {
                        event = {};
                    }
                    else {
                        event = _status.event;
                    }
                    if (game.chess) {
                        event.node = card.copy('thrown', 'center', ui.arena).animate('start');
                    }
                    else {
                        event.node = player.$throwordered(card.copy(), true);
                    }
                    if (lib.cardOL)
                        lib.cardOL[cardid] = event.node;
                    event.node.cardid = cardid;
                    event.node.classList.add('thrownhighlight');
                    ui.arena.classList.add('thrownhighlight');
                    event.dialog = ui.create.dialog(str);
                    event.dialog.classList.add('center');
                    event.dialog.videoId = id;
                }, player, player.judging[0], judgestr, event.videoId, get.id());
                game.log(player, '进行' + event.judgestr + '判定，亮出的判定牌为', player.judging[0]);
                game.delay(2);
                if (!event.noJudgeTrigger)
                    event.trigger('judge');
                "step 1";
                event.result = {
                    card: player.judging[0],
                    name: player.judging[0].name,
                    number: get.number(player.judging[0]),
                    suit: get.suit(player.judging[0]),
                    color: get.color(player.judging[0]),
                    node: event.node,
                };
                if (event.fixedResult) {
                    for (var i in event.fixedResult) {
                        event.result[i] = event.fixedResult[i];
                    }
                }
                event.result.judge = event.judge(event.result);
                if (event.result.judge > 0)
                    event.result.bool = true;
                else if (event.result.judge < 0)
                    event.result.bool = false;
                else
                    event.result.bool = null;
                player.judging.shift();
                game.checkMod(player, event.result, 'judge', player);
                if (event.result.bool == true) {
                    player.popup('洗具');
                }
                else if (event.result.bool == false) {
                    player.popup('杯具');
                }
                if (event.clearArena != false) {
                    game.broadcastAll(ui.clear);
                }
                game.broadcast(function (id) {
                    var dialog = get.idDialog(id);
                    if (dialog) {
                        dialog.close();
                    }
                    ui.arena.classList.remove('thrownhighlight');
                }, event.videoId);
                event.dialog.close();
                game.addVideo('judge2', null, event.videoId);
                ui.arena.classList.remove('thrownhighlight');
                game.log(player, '的判定结果为', event.result.card);
                if (event.callback) {
                    var next = game.createEvent('judgeCallback', false);
                    next.player = player;
                    next.card = event.result.card;
                    next.judgeResult = get.copy(event.result);
                    next.setContent(event.callback);
                }
                else {
                    if (!get.owner(event.result.card)) {
                        if (event.position != ui.discardPile)
                            event.position.appendChild(event.result.card);
                    }
                }
            },
            /**
                * 角色武将牌翻面
                * @name content.turnOver
                * @type {GameCores.Bases.StateMachine}
                */
            turnOver: function () {
                game.log(player, '翻面');
                player.classList.toggle('turnedover');
                game.broadcast(function (player) {
                    player.classList.toggle('turnedover');
                }, player);
                game.addVideo('turnOver', player, player.classList.contains('turnedover'));
            },
            /**
                * 角色连环/解除连环
                * @name content.link
                * @type {GameCores.Bases.StateMachine}
                */
            link: function () {
                if (player.isLinked()) {
                    game.log(player, '解除连环');
                }
                else {
                    game.log(player, '被连环');
                }
                if (lib.config.background_audio) {
                    game.playAudio('effect', 'link');
                }
                game.broadcast(function () {
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'link');
                    }
                });
                player.classList.remove('target');
                if (get.is.linked2(player)) {
                    player.classList.toggle('linked2');
                }
                else {
                    player.classList.toggle('linked');
                }
                ui.updatej(player);
                ui.updatem(player);
                game.broadcast(function (player, linked) {
                    player.classList.remove('target');
                    if (get.is.linked2(player)) {
                        if (linked) {
                            player.classList.add('linked2');
                        }
                        else {
                            player.classList.remove('linked2');
                        }
                    }
                    else {
                        if (linked) {
                            player.classList.add('linked');
                        }
                        else {
                            player.classList.remove('linked');
                        }
                    }
                    ui.updatej(player);
                    ui.updatem(player);
                }, player, player.isLinked());
                game.addVideo('link', player, player.isLinked());
            },
            chooseToGuanxing: function () {
                "step 0";
                if (player.isUnderControl()) {
                    game.swapPlayerAuto(player);
                }
                var cards = get.cards(num);
                event.cards = cards;
                var switchToAuto = (event.ai || function () {
                    _status.imchoosing = false;
                    if (event.dialog)
                        event.dialog.close();
                    if (event.control)
                        event.control.close();
                    var top = [];
                    var bottom;
                    cards.sort(function (a, b) {
                        return get.value(b, player) - get.value(a, player);
                    });
                    while (cards.length) {
                        if (get.value(cards[0], player) <= 5)
                            break;
                        top.unshift(cards.shift());
                    }
                    bottom = cards;
                    for (var i = 0; i < top.length; i++) {
                        ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                    }
                    for (i = 0; i < bottom.length; i++) {
                        ui.cardPile.appendChild(bottom[i]);
                    }
                    player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
                    game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
                    game.delay(2);
                });
                var chooseButton = function (player, cards) {
                    var event = _status.event;
                    player = player || event.player;
                    cards = cards || event.cards;
                    event.top = [];
                    event.bottom = [];
                    event.status = true;
                    event.dialog = ui.create.dialog('按顺序选择置于牌堆顶的牌（先选择的在上）', cards);
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        event.dialog.buttons[i].classList.add('pointerdiv');
                    }
                    event.switchToAuto = function () {
                        event._result = 'ai';
                        event.dialog.close();
                        event.control.close();
                        _status.imchoosing = false;
                    },
                        event.control = ui.create.control('ok', 'pileTop', 'pileBottom', function (link) {
                            var event = _status.event;
                            if (link == 'ok') {
                                event._result = {
                                    top: [],
                                    bottom: []
                                };
                                for (var i = 0; i < event.top.length; i++) {
                                    event._result.top.push(event.top[i].link);
                                }
                                for (var i = 0; i < event.bottom.length; i++) {
                                    event._result.bottom.push(event.bottom[i].link);
                                }
                                event.dialog.close();
                                event.control.close();
                                game.resume();
                                _status.imchoosing = false;
                            }
                            else if (link == 'pileTop') {
                                event.status = true;
                                event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆顶的牌';
                            }
                            else {
                                event.status = false;
                                event.dialog.content.childNodes[0].innerHTML = '按顺序选择置于牌堆底的牌';
                            }
                        });
                    for (var i = 0; i < event.dialog.buttons.length; i++) {
                        event.dialog.buttons[i].classList.add('selectable');
                    }
                    event.custom.replace.button = function (link) {
                        var event = _status.event;
                        if (link.classList.contains('target')) {
                            link.classList.remove('target');
                            event.top.remove(link);
                        }
                        else if (link.classList.contains('glow')) {
                            link.classList.remove('glow');
                            event.bottom.remove(link);
                        }
                        else if (event.status) {
                            link.classList.add('target');
                            event.top.unshift(link);
                        }
                        else {
                            link.classList.add('glow');
                            event.bottom.push(link);
                        }
                    };
                    event.custom.replace.window = function () {
                        for (var i = 0; i < _status.event.dialog.buttons.length; i++) {
                            _status.event.dialog.buttons[i].classList.remove('target');
                            _status.event.dialog.buttons[i].classList.remove('glow');
                            _status.event.top.length = 0;
                            _status.event.bottom.length = 0;
                        }
                    };
                    game.pause();
                    game.countChoose();
                };
                event.switchToAuto = switchToAuto;
                if (event.isMine()) {
                    chooseButton();
                }
                else if (event.isOnline()) {
                    event.player.send(chooseButton, event.player, event.cards);
                    event.player.wait();
                    game.pause();
                }
                else {
                    event.switchToAuto();
                    event.finish();
                }
                "step 1";
                var result = event.result || result;
                if (!result || result == 'ai') {
                    event.switchToAuto();
                }
                else {
                    var top = result.top || [];
                    var bottom = result.bottom || [];
                    for (var i = 0; i < top.length; i++) {
                        ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                    }
                    for (i = 0; i < event.cards.length; i++) {
                        if (!top.contains(event.cards[i]) && !bottom.contains(event.cards[i])) {
                            ui.cardPile.appendChild(event.cards[i]);
                        }
                    }
                    for (i = 0; i < bottom.length; i++) {
                        ui.cardPile.appendChild(bottom[i]);
                    }
                    player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(event.cards.length - top.length) + '下');
                    game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
                    game.updateRoundNumber();
                    game.delay(2);
                }
            },
        };
    })(_context);
    exports.default = commonContent;
});
