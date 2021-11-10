'use strict';
globalThis.game.import('character', function (lib, game, ui, get, ai, _status) {
    return {
        name: 'xingtian',
        connect: true,
        card: {
            ci: {
                fullskin: true,
                enable: true,
                type: 'basic',
                vanish: true,
                global: ['g_ci'],
                materials: ['sha', 'sha'],
                materials_prompt: '【杀】+【杀】',
                derivation: true,
                derivationpack: 'xingtian',
                addinfo: '杀'
            },
            peng: {
                fullskin: true,
                enable: true,
                type: 'basic',
                vanish: true,
                filterTarget: function (card, player, target) {
                    return true;
                },
                selectTarget: 1,
                modTarget: true,
                materials: ['sha', 'shan'],
                materials_prompt: '【杀】+【闪】',
                derivation: true,
                derivationpack: 'xingtian',
                content: function () {
                    'step 0';
                    target.loseHp();
                    'step 1';
                    target.draw(2);
                },
                ai: {
                    order: 7,
                    value: [2, 4, 6, 2],
                    useful: [3, 2, 2, 1],
                    result: {
                        target: function (player, target) {
                            if (target.hasSkill('zhangdeng') || target.hp == Infinity)
                                return 3;
                            if (target.hp == 1)
                                return -2;
                            return target.hp - 2;
                        },
                    },
                    tag: {
                        loseHp: 1,
                        draw: 2,
                    }
                }
            },
            gao: {
                fullskin: true,
                type: 'basic',
                vanish: true,
                enable: function (card, player) {
                    return false;
                },
                savable: function (card, player, dying) {
                    return dying != player;
                },
                selectTarget: -1,
                modTarget: function (card, player, target) {
                    return target.hp < target.maxHp;
                },
                materials: ['tao', 'jiu'],
                materials_prompt: '【桃】+【酒】',
                derivation: true,
                derivationpack: 'xingtian',
                content: function () {
                    target.recover(3);
                },
                ai: {
                    basic: {
                        useful: function (card, i) {
                            if (game.hasPlayer(function (cur) {
                                return cur.hp <= 1;
                            })) {
                                if (i == 0)
                                    return 8;
                                return 6;
                            }
                            return 0.5;
                        },
                        value: function (card, player, i) {
                            if (game.hasPlayer(function (cur) {
                                return get.recoverEffect(cur, player, player) > 1;
                            })) {
                                if (player.hp <= 2) {
                                    if (i == 0)
                                        return 7.3;
                                    return 3;
                                }
                                else {
                                    if (i == 0)
                                        return 10;
                                    return 6;
                                }
                            }
                            return 1;
                        },
                    },
                    result: {
                        target: 6,
                    },
                    tag: {
                        recover: 3,
                        save: 1,
                    }
                }
            },
            wudaoqu: {
                fullskin: true,
                type: 'trick',
                vanish: true,
                global: ['g_wudaoqu'],
                notarget: true,
                materials: ['shan', 'wuxie'],
                materials_prompt: '【闪】+【无懈可击】',
                derivation: true,
                derivationpack: 'xingtian',
                content: function () {
                    var evt = event.getParent(3)._trigger;
                    if (evt.wudaoqu) {
                        evt.cancel();
                        event.cards = evt.cards;
                        var next = game.createEvent('wudaoqu_gain');
                        next.player = player;
                        next.setContent(function () {
                            var cards = event.getParent().cards.filterInD();
                            if (cards.length)
                                player.gain(cards, 'gain2', 'log');
                        });
                    }
                },
                ai: {
                    basic: {
                        useful: [6, 4],
                        value: [7, 4],
                    },
                    result: { player: 1 },
                },
            },
            daluandou: {
                fullskin: true,
                enable: true,
                type: 'trick',
                vanish: true,
                materials: [{ color: 'red' }, { color: 'black' }],
                materials_prompt: '红色牌+黑色牌',
                derivation: true,
                derivationpack: 'xingtian',
                filterTarget: function (card, player, target) {
                    return player.canCompare(target);
                },
                content: function () {
                    'step 0';
                    player.chooseToCompare(target);
                    'step 1';
                    if (result.winner == player) {
                        player.gainPlayerCard(target, [1, 3], 'hej', true).set('filterButton', function (button) {
                            for (var i = 0; i < ui.selected.buttons.length; i++) {
                                if (get.position(button.link) == get.position(ui.selected.buttons[i].link))
                                    return false;
                            }
                            return true;
                        });
                    }
                    else if (result.winner == target) {
                        target.gainPlayerCard(player, [1, 3], 'hej', true).set('filterButton', function (button) {
                            for (var i = 0; i < ui.selected.buttons.length; i++) {
                                if (get.position(button.link) == get.position(ui.selected.buttons[i].link))
                                    return false;
                            }
                            return true;
                        });
                    }
                },
                ai: {
                    basic: {
                        useful: [5, 4, 2],
                        value: [7, 3, 1],
                    },
                    result: { player: 1, target: -1 },
                },
            },
        },
        character: {},
        characterSort: {
            xingtian: {},
        },
        characterIntro: {},
        skill: {
            g_ci: {
                ruleSkill: true,
                mod: {
                    cardname: function (card, player) {
                        if (card.name == 'ci')
                            return 'sha';
                    },
                },
                trigger: { player: 'useCard1' },
                forced: true,
                filter: function (event, player) {
                    return event.card && event.card.name == 'sha' && event.addCount !== false && event.cards &&
                        event.cards.length == 1 && get.name(event.cards[0], null) == 'ci';
                },
                content: function () {
                    if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        if (player.stat[player.stat.length - 1].card.sha > 0) {
                            player.stat[player.stat.length - 1].card.sha--;
                        }
                    }
                    player.addTempSkill('g_ci2', { player: 'useCardAfter' });
                },
            },
            g_ci2: {
                cardSkill: true,
                trigger: { source: 'damageBegin4' },
                forced: true,
                logTarget: 'player',
                filter: function (event, player) {
                    return event.player.hujia > 0 && player.hasSkillTag('overHujia', true, {
                        name: event.card.name,
                        target: event.player,
                        card: event.card
                    });
                },
                content: function () { },
                ai: {
                    unequip: true,
                    overHujia: true,
                    skillTagFilter: function (player, tag, arg) {
                        if (!arg || !arg.card || arg.card.name != 'sha') {
                            return false;
                        }
                        var cards = arg.card.cards;
                        if (!cards || cards.length != 1 || get.name(cards[0], null) != 'ci') {
                            return false;
                        }
                    },
                }
            },
            g_wudaoqu: {
                cardSkill: true,
                trigger: { global: 'useCard' },
                forced: true,
                popup: false,
                filter: function (event, player) {
                    if (!event.targets.contains(player) || !event.cards || !event.cards.length)
                        return false;
                    if (event.getParent().directHit && event.getParent().directHit.contains(player))
                        return false;
                    return player.hasUsableCard('wudaoqu');
                },
                content: function () {
                    'step 0';
                    trigger.wudaoqu = true;
                    player.chooseToUse('是否对' + get.translation(trigger.card) + '使用【无刀取】？').set('ai1', function (card) {
                        return _status.event.bool;
                    }).set('bool', -get.effect(player, trigger.card, trigger.player, player)).set('respondTo', [trigger.player, trigger.card]).set('filterCard', function (card, player) {
                        if (get.name(card) != 'wudaoqu')
                            return false;
                        return lib.filter.cardEnabled(card, player, 'forceEnable');
                    });
                    'step 1';
                    delete trigger.wudaoqu;
                }
            },
        },
        characterReplace: {},
        translate: {
            ci: '刺',
            g_ci: '刺',
            g_ci2: '刺',
            ci_info: '在规则上视为【杀】。此牌无视目标的防具与护甲，且不计入次数。',
            peng: '烹',
            peng_info: '出牌阶段，对一名角色使用，目标失去一点体力并摸两张牌。',
            gao: '膏',
            gao_info: '其他角色的濒死阶段，对其使用，目标回复3点体力。',
            wudaoqu: '无刀取',
            wudaoqu_info: '成为实体牌的目标时使用，取消此牌，并立即获得之。',
            ruiping: '锐评',
            ruiping_info: '出牌阶段，你可以与一名角色拼点，赢的角色获得双方拼点牌并受到一点火焰伤害。',
            daluandou: '大乱斗',
            daluandou_info: '出牌阶段，你可以与一名角色拼点，赢的角色获得对方每个区域各一张牌。',
        },
    };
});
