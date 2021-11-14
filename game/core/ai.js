(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_context"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path = "../built-in.d.ts" />
    const _context_1 = require("./_context");
    /**
     * 游戏AI模块
     * @namespace ai
     * @memberof module:core
     */
    (0, _context_1.mixin)(_context_1.ai, /**@lends module:core.ai */ {
        basic: {
            chooseButton: function (check) {
                var event = _context_1._status.event;
                var i, j, range, buttons, buttons2;
                var ok = false, forced = event.forced;
                var iwhile = 100;
                while (iwhile--) {
                    range = _context_1.get.select(event.selectButton);
                    if (range[1] == -1) {
                        j = 0;
                        for (i = 0; i < _context_1.ui.selected.buttons.length; i++) {
                            j += check(_context_1.ui.selected.buttons[i]);
                        }
                        return (j > 0);
                    }
                    buttons = _context_1.get.selectableButtons();
                    if (buttons.length == 0) {
                        return ok;
                    }
                    buttons2 = buttons.slice(0);
                    var ix = 0;
                    var checkix = check(buttons[0], buttons2);
                    for (i = 1; i < buttons.length; i++) {
                        var checkixtmp = check(buttons[i], buttons2);
                        if (checkixtmp > checkix) {
                            ix = i;
                            checkix = checkixtmp;
                        }
                    }
                    // buttons.sort(function(a,b){
                    //     return check(b,buttons2)-check(a,buttons2);
                    // });
                    if (check(buttons[ix]) <= 0) {
                        if (!forced || ok) {
                            return ok;
                        }
                    }
                    buttons[ix].classList.add('selected');
                    _context_1.ui.selected.buttons.add(buttons[ix]);
                    _context_1.game.check();
                    if (_context_1.ui.selected.buttons.length >= range[0]) {
                        ok = true;
                    }
                    if (_context_1.ui.selected.buttons.length == range[1]) {
                        return true;
                    }
                }
            },
            chooseCard: function (check) {
                var event = _context_1._status.event;
                if (event.filterCard == undefined)
                    return (check() > 0);
                var i, j, range, cards, cards2, skills, check, effect;
                var ok = false, forced = event.forced;
                var iwhile = 100;
                while (iwhile--) {
                    range = _context_1.get.select(event.selectCard);
                    if (_context_1.ui.selected.cards.length >= range[0]) {
                        ok = true;
                    }
                    if (range[1] == -1) {
                        if (_context_1.ui.selected.cards.length == 0)
                            return true;
                        j = 0;
                        for (i = 0; i < _context_1.ui.selected.cards.length; i++) {
                            effect = check(_context_1.ui.selected.cards[i]);
                            if (effect < 0)
                                j -= Math.sqrt(-effect);
                            else
                                j += Math.sqrt(effect);
                        }
                        return (j > 0);
                    }
                    cards = _context_1.get.selectableCards();
                    if (!_context_1._status.event.player._noSkill) {
                        cards = cards.concat(_context_1.get.skills());
                    }
                    if (cards.length == 0) {
                        return ok;
                    }
                    cards2 = cards.slice(0);
                    // cards.sort(function(a,b){
                    //     return (check(b,cards2)-check(a,cards2));
                    // });
                    var ix = 0;
                    var checkix = check(cards[0], cards2);
                    for (i = 1; i < cards.length; i++) {
                        var checkixtmp = check(cards[i], cards2);
                        if (checkixtmp > checkix) {
                            ix = i;
                            checkix = checkixtmp;
                        }
                    }
                    if (check(cards[ix]) <= 0) {
                        if (!forced || ok) {
                            return ok;
                        }
                    }
                    if (typeof cards[ix] == 'string') {
                        _context_1.ui.click.skill(cards[ix]);
                        var info = _context_1.get.info(event.skill);
                        if (info.filterCard) {
                            check = info.check || _context_1.get.unuseful2;
                            return (_context_1.ai.basic.chooseCard(check));
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        cards[ix].classList.add('selected');
                        _context_1.ui.selected.cards.add(cards[ix]);
                        _context_1.game.check();
                        if (_context_1.ui.selected.cards.length >= range[ix]) {
                            ok = true;
                        }
                        if (_context_1.ui.selected.cards.length == range[1]) {
                            return true;
                        }
                    }
                }
            },
            chooseTarget: function (check) {
                var event = _context_1._status.event;
                if (event.filterTarget == undefined)
                    return (check() > 0);
                var i, j, range, targets, targets2, effect;
                var ok = false, forced = event.forced;
                var iwhile = 100;
                while (iwhile--) {
                    range = _context_1.get.select(event.selectTarget);
                    if (range[1] == -1) {
                        j = 0;
                        for (i = 0; i < _context_1.ui.selected.targets.length; i++) {
                            effect = check(_context_1.ui.selected.targets[i]);
                            if (effect < 0)
                                j -= Math.sqrt(-effect);
                            else
                                j += Math.sqrt(effect);
                        }
                        return (j > 0);
                    }
                    else if (range[1] == 0) {
                        return check() > 0;
                    }
                    targets = _context_1.get.selectableTargets();
                    if (targets.length == 0) {
                        return range[0] == 0 || ok;
                    }
                    targets2 = targets.slice(0);
                    // targets.sort(function(a,b){
                    //     return check(b)-check(a);
                    // });
                    var ix = 0;
                    var checkix = check(targets[0], targets2);
                    for (i = 1; i < targets.length; i++) {
                        var checkixtmp = check(targets[i], targets2);
                        if (checkixtmp > checkix) {
                            ix = i;
                            checkix = checkixtmp;
                        }
                    }
                    if (check(targets[ix]) <= 0) {
                        if (!forced || ok) {
                            return ok;
                        }
                    }
                    targets[ix].classList.add('selected');
                    _context_1.ui.selected.targets.add(targets[ix]);
                    _context_1.game.check();
                    if (_context_1.ui.selected.targets.length >= range[0]) {
                        ok = true;
                    }
                    if (_context_1.ui.selected.targets.length == range[1]) {
                        return true;
                    }
                }
            }
        },
        /**
         * AI用取值
         * @see {@link get}
         */
        get: _context_1.get
    });
    exports.default = _context_1.ai;
});
