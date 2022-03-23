import { toSkill } from './skilltype'
let { game, ui, get, ai, lib, _status } = window.vkCore
export default {

    //旧艾琳
    duanfu: {
        trigger: { player: 'useCardToPlayer', target: 'useCardToPlayer' },
        priority: 100,
        lastDo: true,
        check(Evt, player) {
            if (player == Evt.player) return get.effect(Evt.target, Evt.card, player) < 0;
            return get.effect(player, Evt.card, Evt.target, player) < 0;
        },
        prompt(Evt, player) {
            if (player == Evt.player && Evt.target != player) return '指定' + get.translation(Evt.target) + '为' + get.translation(Evt.card) + '的目标，' + get.prompt('duanfu');
            else return '被' + get.translation(Evt.player) + '指定为' + get.translation(Evt.card) + '的目标，' + get.prompt('duanfu');
        },
        filter(Evt, player) {
            if (player == Evt.player && !Evt.target.isLinked()) return true;
            if (player == Evt.target && Evt.player.isLinked()) return true;
            return false;
        },
        content() {
            if (player == trigger.player) {
                trigger.target.link();
                trigger.excluded.add(trigger.target);
                game.log(trigger.getParent().card, '不会对', trigger.target, '生效');
            } else {
                trigger.player.link();
                trigger.excluded.add(trigger.target);
                game.log(trigger.getParent().card, '不会对', player, '生效');
            }
        },
        ai: {
            effect: {
                player(card, player, target, current) {
                    if (get.name(card) == 'tiesuo') return [1, 1];
                }
            }
        }
    },
    daichang: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return game.hasPlayer(cur => cur.isLinked());
        },
        content() {
            'step 0'
            player.loseMaxHp();
            'step 1'
            Evt.num = game.countPlayer(cur => cur.isLinked());
            player.draw(Evt.num);
            player.addTempSkill('daichang_bottom', 'phaseUseAfter')
        },
        subSkill: {
            bottom: {
                mark: true,
                intro: {
                    name: '借贷',
                    content: '造成伤害时，需将X张牌置于牌堆底。（X为场上被横置的角色数）',
                },
                trigger: { source: 'damageEnd' },
                priority: 100,
                lastDo: true,
                forced: true,
                filter(Evt, player) {
                    return player.countCards('he') && game.hasPlayer(cur => cur.isLinked());
                },
                content() {
                    'step 0'
                    Evt.num = game.countPlayer(cur => {
                        return cur.isLinked();
                    });
                    player.choosePlayerCard('###『贷偿』###请选择要置于牌堆底的牌（先选择的在下）', player, 'he', Evt.num, true);
                    'step 1'
                    Evt.cards = result.cards.slice(0);
                    player.lose(Evt.cards);
                    'step 2'
                    while (Evt.cards.length) {
                        var card = Evt.cards.pop();
                        card.fix();
                        ui.cardPile.appendChild(card);
                    }
                    game.log(player, '将' + get.cnNumber(Evt.num) + '张牌置于牌堆底');
                }
            }
        },
    },
    hongtu: {
        trigger: { player: 'phaseUseEnd' },
        unique: true,
        limited: true,
        priority: 100,
        filter(Evt, player) {
            return player.isLinked() && player.hp == player.maxHp;
        },
        content() {
            'step 0'
            player.$.hongtu = true;
            player.awakenSkill('hongtu');
            Evt.going = 1;
            'step 1'
            Evt.card = get.bottomCards()[0];
            player.showCards(Evt.card);
            'step 2'
            if (player.hasUseTarget(Evt.card, false)) {
                player.chooseUseTarget(Evt.card, false, true);
            } else {
                Evt.going = 0;
            }
            'step 3'
            player.draw();
            'step 4'
            if (Evt.going == 1) {
                Evt.goto(1);
            }
        },
    },
    //旧黄兔
    huangtu: {
        trigger: {
            global: 'gameDrawAfter',
            player: 'enterGame',
        },
        forced: true,
        filter(Evt, player) {
            return game.countPlayer(cur => {
                return !cur.$.nohp && cur.maxHp != Infinity && cur != player;
            });
        },
        audio: 6,
        content() {
            'step 0'
            player.chooseTarget('请选择『颂恩』的目标', lib.translate.huangtu_info, true, function (card, player, target) {
                if (target.$.nohp || target.maxHp == Infinity) return false
                return target != player && (!player.$.huangtu2 || !player.$.huangtu2.contains(target));
            }).set('ai', function (target) {
                var att = get.attitude(_status.event.player, target);
                if (att > 0) return att + 1;
                if (att == 0) return Math.random();
                return att;
            });
            'step 1'
            if (result.bool) {
                Evt.target = result.targets[0];
                if (!player.$.huangtu2) player.$.huangtu2 = [];
                player.$.huangtu2.add(Evt.target);
                player.addSkill('huangtu2');
                player.addSkill('huangtu3');
            }
            'step 2'
            var target = Evt.target;
            target.$.huangtu_mark = player;
            target.addSkill('huangtu_mark');
            'step 3'
            var target = Evt.target;
            player.gainMaxHp(target.maxHp);
            player.recover(target.maxHp);
        }
    },
    huangtu_mark: {
        mark: 'character',
        intro: {
            name: '颂恩',
            content: '当你在$的回合外体力变化时，$体力进行同样的变化，当$在自己的回合内合体力变化时，你体力进行同样的变化'
        },
        onremove: true,
    },
    huangtu2: {
        trigger: { global: ['damageEnd', 'recoverEnd', 'loseHpEnd'] },
        forced: true,
        filter(Evt, player) {
            if (player == _status.currentPhase && player == Evt.player) return true;
            if (Evt.player.isDead() || Evt.num == 0) return false;
            return player.$.huangtu2 && player.$.huangtu2.contains(Evt.player) && player != _status.currentPhase;
        },
        logTarget: 'player',
        content() {
            'step 0'
            if (trigger.player == player) {
                var target = player.$.huangtu2[0];
                target[trigger.name](trigger.num, 'nosource');
                if (target.$.huangtu_mark != player) {
                    target.$.huangtu_mark = player;
                }
                target.markSkill('huangtu_mark');
                Evt.finish();
            }
            'step 1'
            var target = trigger.player;
            if (target.$.huangtu_mark != player) {
                target.$.huangtu_mark = player;
            }
            target.markSkill('huangtu_mark');
            game.delayx();
            'step 2'
            player[trigger.name](trigger.num, 'nosource');
        },
        onremove(player) {
            if (!player.$.huangtu2) return;
            var splayer = player.$.huangtu2[0];
            splayer.removeSkill('huangtu_mark');
            delete player.$.huangtu2;
        },
    },
    huangtu3: {
        trigger: { global: 'dieBegin' },
        silent: true,
        filter(Evt, player) {
            return Evt.player == player || player.$.huangtu2 && player.$.huangtu2.contains(player);
        },
        content() {
            if (player == Evt.player) player.removeSkill('huangtu2');
            else player.$.huangtu2.remove(Evt.player);
        }
    },
    wudao: {
        init(player, skill) {
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
                var name = lib.inpile[i];
                if (get.type(name) == 'basic') list.push(name);
            }
            if (!player.storage[skill]) player.storage[skill] = list;
        },
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.countCards('h', function (card, player) {
                return Evt.player.$.wudao.contains(get.name(card));
            }) > 0;
        },
        filterCard(card, player, Evt) {
            return player.$.wudao.contains(get.name(card));
        },
        prepare(cards, player) {
            player.$throw(cards, 1000);
            game.log(player, '将', cards, '置入了弃牌堆');
        },
        position: 'h',
        discard: false,
        loseTo: 'discardPile',
        visible: true,
        delay: 0.5,
        content() {
            player.draw();
            //					console.log(player.$.wudao);
            player.$.wudao.remove(get.name(Evt.cards[0]));
        },
        ai: {
            basic: {
                order: 1
            },
            result: {
                player: 1,
            },
        },
        group: ['wudao_useEnd', 'wudao_clear'],
        subSkill: {
            useEnd: {
                trigger: { player: 'phaseUseEnd' },
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    return player.$.wudao.length == 0;
                },
                content() {
                    'step 0'
                    if (player.$.wudao.length) {
                        Evt.finish();
                    } else {
                        player.logSkill('wudao');
                    }
                    'step 1'
                    var list = ['摸两张牌', '回复体力'];
                    game.broadcastAll(function (player, list) {
                        var dialog = ui.create.dialog('选择一项', [list, 'vcard']);
                        player.chooseButton(dialog, true);
                    }, player, list)
                    'step 2'
                    if (result.buttons[0].link[2] == '摸两张牌') {
                        player.draw(2);
                    }
                    if (result.buttons[0].link[2] == '回复体力') {
                        player.recover();
                    }
                }
            },
            clear: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    var list = [];
                    for (var i = 0; i < lib.inpile.length; i++) {
                        var name = lib.inpile[i];
                        if (get.type(name) == 'basic') list.push(name);
                    }
                    player.$.wudao = list;
                },
            },
        }
    },
    yinyuan: {
        zhuSkill: true,
        trigger: { player: 'wudao_useEndAfter' },
        filter(Evt, player) {
            if (!player.hasZhuSkill('yinyuan')) return false;
            return Evt._result;
        },
        content() {
            'step 0'
            let next = player.chooseTarget()
                .set('filterTarget', function (card, player, target) {
                    return target.group == player.group;
                });
            if (trigger._result?.length) {
                next.set('prompt2', '失去一点体力上限，令其回复一点体力');
            } else if (trigger._result?.links && trigger._result.links[0][3] == '回复体力') {
                next.set('prompt2', '失去一点体力上限，令其摸两张牌');
            }
            'step 1'
            if (result.bool) {
                player.loseMaxHp();
                if (trigger._result?.length) {
                    result.targets[0].recover(player);
                } else if (trigger._result?.links[0][3] == '回复体力') {
                    result.targets[0].draw(2, player);
                }
            }
        }
    },
    /**旧花园猫 */
    old_maoliang: {
        mark: true,
        locked: true,
        marktext: '粮',
        intro: {
            content: 'cards',
            onunmark: 'throw',
            cardAround: true
        },
    },
    old_jiumao: {
        audio: 'jiumao',
        global: 'old_jiumao_put',
        group: ['old_jiumao_gain'],
        subSkill: {
            put: {
                trigger: {
                    player: 'phaseDiscardBegin',
                },
                check(Evt, player) {
                    var target = game.findPlayer(cur => {
                        return cur.hasSkill('old_jiumao');
                    })
                    return target && get.attitude(player, target) > 0;
                },
                filter(Evt, player) {
                    return !player.hasSkill('old_jiumao') && player.countCards('he')
                        && game.hasPlayer(cur => {
                            return cur.hasSkill('old_jiumao');
                        });
                },
                content() {
                    'step 0'
                    player.chooseCard(get.prompt('old_jiumao'), 'he', [1, Infinity])
                        .set('ai', card => {
                            var player = _status.event.player;
                            if (player.needsToDiscard() && ui.selected.cards.length < player.countCards('h')) return 6 - get.useful(card);
                            else return 2 - get.useful(card);
                        }).set('prompt', '###『啾猫』###你在弃牌阶段开始时，可将任意数量的牌放在自己武将牌旁，称为「猫粮」');
                    'step 1'
                    if (result.bool) {
                        player.lose(result.cards, ui.special, 'visible', 'toStorage');
                        player.$give(result.cards, player, false);
                        if (player.$.old_maoliang) {
                            player.$.old_maoliang = player.$.old_maoliang.concat(result.cards);
                        }
                        else {
                            player.$.old_maoliang = result.cards;
                        }
                        // game.addVideo('storage', player, ['old_maoliang',get.cardsInfo(player.$.old_maoliang),'cards']);
                        player.addSkill('old_maoliang');
                        player.markSkill('old_maoliang');
                        player.showCards(player.$.old_maoliang, "猫粮");
                    }
                    else Evt.finish();
                    'step 2'
                    game.delayx();
                }
            },
            gain: {
                popup: false,
                trigger: {
                    player: 'phaseBegin',
                },
                filter(Evt, player) {
                    return game.countPlayer(cur => {
                        return cur.hasSkill('old_maoliang');
                    });
                },
                content() {
                    'step 0'
                    Evt.targets = game.filterPlayer(cur => {
                        return cur.hasSkill('old_maoliang');
                    });
                    Evt.videoId = lib.status.videoId++;
                    game.broadcastAll(function (targets, id) {
                        var dialog = ui.create.dialog('选择猫粮');
                        targets.forEach(function (p) {
                            if (p.$.old_maoliang.length) {
                                dialog.addText(get.translation(p));
                                dialog.add(p.$.old_maoliang);
                            }
                        })
                        dialog.videoId = id;
                    }, Evt.targets, Evt.videoId);
                    let next = player.chooseButton([1, player.maxHp]);
                    next.set('dialog', Evt.videoId);
                    'step 1'
                    game.broadcastAll('closeDialog', Evt.videoId)
                    if (result.bool) {
                        Evt.cards = result.links;
                        player.logSkill('old_jiumao');
                        Evt.targets.forEach(function (p) {
                            var all = p.$.old_maoliang;
                            var cho = [];
                            p.$.old_maoliang = [];
                            all.forEach(card => {
                                if (Evt.cards.indexOf(card) != -1) {
                                    cho.push(card);
                                    p.addTempSkill('old_jiumao_cancel');
                                }
                                else {
                                    p.$.old_maoliang.push(card);
                                }
                            })
                            p.$give(cho, player, false);
                            player.gain(cho, 'fromStorage');
                            p.syncStorage('old_maoliang');
                            p.markSkill('old_maoliang');
                            game.log(player, "获得了", p, "的猫粮：", cho);
                        })
                        player.line(game.filterPlayer(cur => {
                            return cur.hasSkill('old_jiumao_cancel');
                        }), 'green');
                    }
                }
            },
            cancel: {
                mod: {
                    targetEnabled(card, player, target) {
                        if (get.color(card) == 'black' && player.hasSkill('old_jiumao')) {
                            return false;
                        }
                    }
                }
            },
        }
    },
    old_enfan: {
        popup: false,
        trigger: {
            global: 'dying'
        },
        filter(Evt, player) {
            return Evt.player.hasSkill('old_jiumao') || Evt.player.hasSkill('old_maoliang');
        },
        content() {
            'step 0'
            Evt.targets = game.filterPlayer(cur => {
                return cur.hasSkill('old_maoliang');
            });
            Evt.videoId = lib.status.videoId++;
            game.broadcastAll(function (targets, id, current) {
                var dialog = ui.create.dialog('选择猫粮');
                targets.forEach(function (p) {
                    if (p != current && p.$.old_maoliang.length) {
                        dialog.addText(get.translation(p));
                        dialog.add(p.$.old_maoliang);
                    }
                })
                dialog.videoId = id;
            }, Evt.targets, Evt.videoId, trigger.player)
            let next = player.chooseButton([1, player.maxHp])
                .set('dialog', Evt.videoId);
            'step 1'
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                Evt.cards = result.links;
                var targets = [];
                var less = false;
                Evt.targets.forEach(function (p) {
                    var temp = p.$.old_maoliang;
                    p.$.old_maoliang = [];
                    temp.forEach(card => {
                        if (Evt.cards.indexOf(card) != -1) {
                            p.$give(card, trigger.player, false);
                            trigger.player.gain(card, 'fromStorage');
                            targets.push(p);
                        }
                        else {
                            p.$.old_maoliang.push(card);
                            less = true;
                        }
                    })
                    p.syncStorage('old_maoliang');
                    p.markSkill('old_maoliang');
                })
                if (!less) {
                    trigger.player.recover();
                }
                player.logSkill('old_enfan', trigger.player);
                trigger.player.line(targets, 'green');
            }
            else Evt.finish();
        }
    },
    old_shiqi: {
        audio: 'shiqi',
        forced: true,
        trigger: {
            player: 'phaseZhunbeiBegin',
        },
        filter(Evt, player) {
            var cnt = game.filterPlayer(cur => {
                return player.countCards('h') < cur.countCards('h');
            })
            return cnt == 0;
        },
        content() {
            player.addTempSkill('old_shiqi_addDam');
            game.putBuff(player, 'old_shiqi', '.player_buff')
        },
        subSkill: {
            addDam: {
                direct: true,
                silent: true,
                trigger: {
                    source: 'damageBegin',
                },
                content() {
                    player.removeSkill('old_shiqi_addDam');
                    trigger.num++;
                },
                onremove(player, skill) {
                    game.clearBuff(player, 'old_shiqi')
                },
                ai: {
                    damageBonus: true,
                },
            }
        }
    },
    //旧兔宝
    pekoyu: {
        audio: 'tuquan',
        init(player) {
            player.$.pekoyu = [];
        },
        marktext: "peko",
        intro: {
            name: '嚣张咚鼓',
            content(storage, player, skill) {
                if (storage.length) {
                    return '本回合已通过花色为' + get.translation(storage) + '的牌发动了技能';
                }
                else {
                    return '本回合尚未发动技能';
                }
            },
        },
        trigger: { player: 'useCardAfter' },
        priority: 111,
        filter(Evt, player) {
            if (!player.isPhaseUsing()) return false;
            if (!(get.type(Evt.card) == 'basic' || get.type(Evt.card) == 'trick')) return false;
            if (Evt.result.bool == false || Evt.iswuxied) return false;
            for (let i of player.getStorage('pekoyu')) {
                if (get.suit(Evt.card) == i) return false
            }
            return true;
        },
        content() {
            'step 0'
            player.draw(),
                player.$.pekoyu.add(get.suit(trigger.card));
            'step 1'
            player.chooseToDiscard('###『嚣张咚鼓』###然后，弃置一张牌', 'h', true)
                .set('ai', card => {
                    var name = card.name;
                    if (name == 'jiu') return 12;
                    if (get.type(card) == 'trick') return 4;
                    return 10 - get.value(card);
                });
            'step 2'
            if (result.bool && result.cards?.length) {
                if (get.name(result.cards[0], player) == 'jiu')
                    player.chooseTarget('###『嚣张咚鼓』###选择一名角色，令其摸两张牌').set('ai', function (target) {
                        var player = _status.event.player;
                        if (player.countCards('h') < player.getHandcardLimit()) return target == player;
                        return get.attitude(player, target) * (target.isDamaged() ? 2 : 1);
                    });
            }
            'step 3'
            if (result.bool && result.targets?.length) {
                var target = result.targets[0];
                player.line(target, 'thunder');
                target.draw(2, player);
            }
        },
        group: ['pekoyu_update', 'pekoyu_back'],
        subSkill: {
            update: {
                trigger: { player: 'phaseBegin' },
                forced: true,
                silent: true,
                firstDo: true,
                content() {
                    player.markSkill('pekoyu');
                }
            },
            back: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                firstDo: true,
                content() {
                    player.unmarkSkill('pekoyu');
                    player.$.pekoyu = [];
                }
            },
        },
    },
    hongshaoturou: {
        audio: true,
        filter(Evt, player) {
            return !player.isLinked();
        },
        enable: "phaseUse",
        usable: 1,
        content() {
            player.link(true);
            player.addMark('hongshaoturou', 1, false);
            player.addTempSkill('hongshaoturou_viewAs');
            player.addTempSkill('hongshaoturou_shao');
            game.putBuff(player, 'hongshaoturou', '.player_buff')
        },
        onremove(player, skill) {
            player.removeSkill('hongshaoturou_shao');
        },
        subSkill: {
            viewAs: {
                mod: {
                    cardname(card, player,name) {
                        if (name == 'shan' || name == 'tao') return 'jiu';
                        if (get.subtype(name) == 'equip3' || get.subtype(name) == 'equip4' || get.subtype(name) == 'equip6') return 'tiesuo';
                    },
                },
                trigger: { player: ['useCard1', 'respond', 'loseBeign'] },
                firstDo: true,
                forced: true,
                filter(Evt, player) {
                    return Evt.card.name == 'jiu' && !Evt.skill &&
                        Evt.cards.length == 1 && (Evt.cards[0].name == 'tao' || Evt.cards[0].name == 'shan');
                },
                content() {
                },
            },
            shao: {
                trigger: { player: 'phaseEnd' },
                marktext: '炎',
                mark: true,
                forced: true,
                intro: {
                    content: '当前回合结束后受到一点火焰伤害',
                    name: '自煲自足',
                },
                onremove(player, skill) {
                    game.clearBuff(player, 'hongshaoturou')
                },
                filter(Evt, player) {
                    return true;
                },
                content() {
                    player.damage('fire');
                    player.removeSkill('hongshaoturou_shao');
                }
            },
        }
    },
    //旧elu
    old_huangran: {
        trigger: { player: 'damageBegin4' },
        priority: 99,
        filter(Evt, player) {
            return Evt.num >= 2 && Evt.nature == 'fire' && game.hasPlayer(cur => {
                return cur != player && get.$dis(player, cur) <= 1;
            });
        },
        content: [() => {
            player.chooseTarget('###『煌燃』###选择一名角色与自己平摊伤害', function (card, player, target) {
                return target != player && get.$dis(player, target) <= 1;
            }).set('ai', function (target) {
                return 1 - get.$a(player, target) + Math.random();
            });
        }, () => {
            if (result.bool) {
                if (trigger.num % 2 == 0) {
                    trigger.num /= 2;
                    result.targets[0].damage(trigger.num, trigger.source, 'fire');
                    Evt.finish();
                } else {
                    trigger.num--;
                    trigger.num /= 2;
                    result.targets[0].damage(trigger.num, trigger.source, 'fire');
                    player.chooseTarget(true, '###『煌燃』###分配多余的一点伤害').set('ai', function (target) {
                        return 1 - get.$a(player, target) < 0 + Math.random();
                    });
                }
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.bool) {
                result.targets[0].damage(1, trigger.source, 'fire');
            }
        }],
        group: 'old_huangran_drawBy',
        subSkill: {
            drawBy: {
                trigger: { global: 'damageEnd' },
                priority: 99,
                forced: true,
                filter(Evt, player) {
                    if (Evt.player.hasSkill('old_huangran_shao')) return false;
                    return Evt.nature == 'fire' && Evt.getParent().name == 'old_huangran';
                },
                content() {
                    player.draw();
                    trigger.player.addTempSkill('old_huangran_shao', 'old_huangranAfter');
                },
            },
            shao: {},
        }
    },
    old_yinzhen: {
        group: ['old_yinzhen_fire', 'old_yinzhen_includes', 'old_yinzhen_getC'],
        subSkill: {
            fire: {
                trigger: { global: 'damageBegin1' },
                priority: 999,
                usable: 1,
                forced: true,
                /*		filter(Evt,player){
                            return player!=Evt.source;
                        },*/
                content() {
                    trigger.nature = 'fire';
                },
            },
            includes: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                trigger: { global: 'phaseBefore' },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    player.$.old_yinzhen_includes.length = 0;
                    game.hasPlayer(cur => {
                        if (cur != player) {
                            player.$.old_yinzhen_includes.push(cur);
                            player.$.old_yinzhen_includes.push(get.$dis(cur, player));
                        }
                    })
                },
            },
            getC: {
                trigger: { global: 'phaseAfter' },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    for (let i = 0; i < (player.$.old_yinzhen_includes.length); i += 2) {
                        if (get.$dis(player.$.old_yinzhen_includes[i], player) < player.$.old_yinzhen_includes[i + 1]) {
                            player.logSkill('old_yinzhen', player.$.old_yinzhen_includes[i]);
                            player.gainPlayerCard('h', player.$.old_yinzhen_includes[i], true).set('visible', true);
                        }
                    }
                },
            },

        },
    },
    old_senhu: {
        group: 'old_senhu_tengjia2',
        //	group:['old_senhu_tengjia1','old_senhu_tengjia2','old_senhu_tengjia3'],
        locked: true,
        ai: {
            effect: {
                target(card, player, target) {
                    if (player == target && get.subtype(card) == 'equip2') {
                        if (get.equipValue(card) <= 7.5) return 0;
                    }
                    if (!target.isEmpty(2)) return;
                    return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
                }
            }
        },
        subSkill: {
            tengjia1: {
                equipSkill: true,
                noHidden: true,
                inherit: 'tengjia1',
                filter(Evt, player) {
                    if (!player.isEmpty(2)) return false;
                    return true;
                },
            },
            tengjia2: {
                equipSkill: true,
                noHidden: true,
                inherit: 'tengjia2',
                filter(Evt, player) {
                    if (!player.isEmpty(2)) return false;
                    return Evt.nature == 'fire';
                },
            },
            tengjia3: {
                equipSkill: true,
                noHidden: true,
                inherit: 'tengjia3',
                filter(Evt, player) {
                    if (!player.isEmpty(2)) return false;
                    return true;
                },
            },
        }
    },
}