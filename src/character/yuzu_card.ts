let { game, ui, get, ai, lib, _status } = window.vkCore
export default {
    jinzhou: { fullskin: true },
    gouhun: { fullskin: true },

    niwei_sha: {
        derivation: 'ŌokamiMio',
        content() {
            Evt.target.recover(player);
            game.delay(0.5);
        },
    },
    niwei_shan: {
        derivation: 'ŌokamiMio',
        content() {
            delete Evt.result;
            Evt.player.draw(2);
            game.delay(0.5);
        },
    },
    niwei_tao: {
        derivation: 'ŌokamiMio',
        content() {
            Evt.target.loseHp();
            game.delay(0.5);
        },
    },
    niwei_jiu: {
        derivation: 'ŌokamiMio',
        content() {
            Evt.target.chooseToUse().set('targetRequired', true);
            game.delay(0.5);
        },
    },

    yayin_jiu: {
        audio: true,
        fullskin: true,
        nature: ['ocean'],
        type: "basic",
        toself: true,
        enable: function (event, player) {
            return true;
        },
        lianheng: true,
        logv: false,
        savable: function (card, player, dying) {
            return true;
        },
        selectTarget: -1,
        modTarget: true,
        filterTarget: function (card, player, target) {
            return target == player;
        },
        content: [() => {
            if (typeof Evt.baseDamage != 'number') Evt.baseDamage = Evt.baseNumber || 1;
            if (target.isDying() || Evt.getParent(2).type == 'dying' || target !== player) {
                target.recover(Evt.baseDamage);
                Evt.goto(2)
            }
            else {
                player.chooseControlList([
                    '1.出牌阶段对自己使用，本回合下一张【杀】或伤害类锦囊基础伤害+1（无次数限制）',
                    '2.出牌阶段对一名角色使用/一名角色濒死阶段对其使用，令其恢复一点体力'
                ], function () {
                    return 0;
                },true);
            }
        }, () => {
            switch (result.index) {
                case 0: {
                    game.addVideo('jiuNode', target, true);
                    if (cards && cards.length) {
                        card = cards[0];
                    }
                    if (!target.$.yayin_jiu) target.$.yayin_jiu = 0;
                    target.$.yayin_jiu += Evt.baseDamage;
                    game.broadcastAll(function (target, card, gain2) {
                        target.addSkill('yayin_jiu');
                        if (!target.node.jiu && '喝酒效果') {
                            target.node.jiu = ui.create.div('.playerjiu', target.node.avatar);
                            target.node.jiu2 = ui.create.div('.playerjiu', target.node.avatar2);
                        }
                        if (gain2 && card.clone && (card.clone.parentNode == target.parentNode || card.clone.parentNode == ui.arena)) {
                            card.clone.moveDelete(target);
                        }
                    }, target, card, target == targets[0] && cards.length == 1);
                    if (target == targets[0] && cards.length == 1) {
                        if (card.clone && (card.clone.parentNode == target.parentNode || card.clone.parentNode == ui.arena)) {
                            game.addVideo('gain2', target, get.cardsInfo([card]));
                        }
                    }
                    break;
                }
                case 1: {
                    target.recover(Evt.baseDamage);
                    break;
                }
            }
        }, () => {
            if (get.nature(Evt.card) == 'ocean' && !target.hujia) target.changeHujia();
        }],
        ai: {
            basic: {
                useful: function (card, i) {
                    if (_status.event.player.hp > 1) {
                        if (i == 0) return 4;
                        return 1;
                    }
                    if (i == 0) return 7.3;
                    return 4;
                },
                value: function (card, player, i) {
                    if (player.hp > 1) {
                        if (i == 0) return 5;
                        return 1;
                    }
                    if (i == 0) return 7.3;
                    return 4;
                },
            },
            order: function () {
                return get.order({ name: 'sha' }) + 0.2;
            },
            result: {
                target: function (player, target) {
                    if (target && target.isDying()) return 2;
                    if (target && !target.isPhaseUsing() && target.isHealthy()) return 0;
                    if (lib.config.mode == 'stone' && !player.isMin()) {
                        if (player.getActCount() + 1 >= player.actcount) return 0;
                    }
                    var shas = player.getCards('h', 'sha');
                    if (shas.length > 1 && (player.getCardUsable('sha') > 1 || player.countCards('h', 'zhuge'))) {
                        return 0;
                    }
                    shas.sort(function (a, b) {
                        return get.order(b) - get.order(a);
                    })
                    var card;
                    if (shas.length) {
                        for (var i = 0; i < shas.length; i++) {
                            if (lib.filter.filterCard(shas[i], target)) {
                                card = shas[i]; break;
                            }
                        }
                    }
                    else if (player.hasSha() && player.needsToDiscard()) {
                        if (player.countCards('h', 'hufu') != 1) {
                            card = { name: 'sha' };
                        }
                    }
                    if (card) {
                        if (game.hasPlayer(function (current) {
                            return (get.attitude(target, current) < 0 &&
                                target.canUse(card, current, true, true) &&
                                !current.hasSkillTag('filterDamage', null, {
                                    player: player,
                                    card: card,
                                    jiu: true,
                                }) &&
                                get.effect(current, card, target) > 0);
                        })) {
                            return 1;
                        }
                    }
                    return 0;
                },
            },
            tag: {
                save: 1
            }
        }
    }
}