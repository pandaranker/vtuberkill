module.exports = {
    aiFun: (vkCore) => {
        let { game, ui, get, ai, lib, _status } = vkCore
        return {
            basic: {
                chooseButton: function (check) {
                    var Evt = _status.event;
                    var i, j, range, buttons, buttons2;
                    var ok = false, forced = Evt.forced;
                    var iwhile = 100;
                    while (iwhile--) {
                        range = get.select(Evt.selectButton);
                        if (range[1] == -1) {
                            j = 0;
                            for (i = 0; i < ui.selected.buttons.length; i++) {
                                j += check(ui.selected.buttons[i]);
                            }
                            return (j > 0);
                        }
                        buttons = get.selectableButtons();
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
                        ui.selected.buttons.add(buttons[ix]);
                        game.check();
                        if (ui.selected.buttons.length >= range[0]) {
                            ok = true;
                        }
                        if (ui.selected.buttons.length == range[1]) {
                            return true;
                        }
                    }
                },
                chooseCard: function (check) {
                    var Evt = _status.event;
                    if (Evt.filterCard == undefined) return (check() > 0);
                    var i, j, range, cards, cards2, skills, check, effect;
                    var ok = false, forced = Evt.forced;
                    var iwhile = 100;
                    while (iwhile--) {
                        range = get.select(Evt.selectCard);
                        if (ui.selected.cards.length >= range[0]) {
                            ok = true;
                        }
                        if (range[1] == -1) {
                            if (ui.selected.cards.length == 0) return true;
                            j = 0;
                            for (i = 0; i < ui.selected.cards.length; i++) {
                                effect = check(ui.selected.cards[i]);
                                if (effect < 0) j -= Math.sqrt(-effect);
                                else j += Math.sqrt(effect);
                            }
                            return (j > 0);
                        }
                        cards = get.selectableCards();
                        if (!_status.event.player._noSkill) {
                            cards = cards.concat(get.skills());
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
                            ui.click.skill(cards[ix]);
                            var info = get.info(Evt.skill);
                            if (info.filterCard) {
                                check = info.check || get.unuseful2;
                                return (ai.basic.chooseCard(check));
                            }
                            else {
                                return true;
                            }
                        }
                        else {
                            cards[ix].classList.add('selected');
                            ui.selected.cards.add(cards[ix]);
                            game.check();
                            if (ui.selected.cards.length >= range[ix]) {
                                ok = true;
                            }
                            if (ui.selected.cards.length == range[1]) {
                                return true;
                            }
                        }
                    }
                },
                chooseTarget: function (check) {
                    var Evt = _status.event;
                    if (Evt.filterTarget == undefined) return (check() > 0);
                    var i, j, range, targets, targets2, effect;
                    var ok = false, forced = Evt.forced;
                    var iwhile = 100;
                    while (iwhile--) {
                        range = get.select(Evt.selectTarget);
                        if (range[1] == -1) {
                            j = 0;
                            for (i = 0; i < ui.selected.targets.length; i++) {
                                effect = check(ui.selected.targets[i]);
                                if (effect < 0) j -= Math.sqrt(-effect);
                                else j += Math.sqrt(effect);
                            }
                            return (j > 0);
                        }
                        else if (range[1] == 0) {
                            return check() > 0
                        }
                        targets = get.selectableTargets();
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
                        ui.selected.targets.add(targets[ix]);
                        game.check();
                        if (ui.selected.targets.length >= range[0]) {
                            ok = true;
                        }
                        if (ui.selected.targets.length == range[1]) {
                            return true;
                        }
                    }
                }
            },
            /**
             * AI用取值
             * @see {@link get}
             */
            get: get
        }
    }
}