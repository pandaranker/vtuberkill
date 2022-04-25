import { toSkill } from './skilltype'
let { game, ui, get, ai, lib, _status } = window.vkCore
export default {
    //迟砂：准备阶段，你可以将手牌调整至全场唯一最多，若如此做，你不能使用本回合摸到的牌直到回合结束。
    chisha: {
        audio: true,
        trigger: { player: 'phaseZhunbeiBegin' },
        filter(Evt, player) {
            return !player.isMaxHandcard(true);
        },
        check(Evt, player) {
            let list = game.filterPlayer(cur => cur.isMaxHandcard()).sortBySeat();
            return (list[0].countCards('h') - player.countCards('h')) >= 1;
        },
        content: [() => {
            let num = 1, list = game.filterPlayer(cur => cur.isMaxHandcard());
            num += (list[0].countCards('h') - player.countCards('h'));
            Evt.cards = get.cards(num);
        }, () => {
            player.gain(Evt.cards, 'draw');
        }, () => {
            player.addTempSkill('chisha_cardDisable')
        }],
        subSkill: {
            cardDisable: {
                mark: true,
                intro: { content: '不能使用本回合摸到的牌' },
                mod: {
                    cardEnabled(card, player) {
                        return lib.skill.chisha_cardDisable.mod.cardSavable.apply(this, arguments);
                    },
                    cardSavable(card, player) {
                        if (!card.cards) return
                        let cards = [], hs = player.getCards('h');
                        player.getHistory('gain', evt => {
                            if (evt.getParent().name != 'draw') return false;
                            for (let i of evt.cards) {
                                if (hs.includes(i)) cards.add(i);
                            }
                        });
                        let num = cards.length;
                        cards.removeArray(card.cards);
                        if (cards.length < num) return false;
                    },
                },
            },
        },
    },
    //鹜荐：你对其他角色造成伤害或受到其他角色的伤害后，若你手牌数多于对方，你可以与其交换手牌
    wujian: {
        trigger: {
            player: 'damageAfter', source: 'damageAfter'
        },
        logTarget(Evt, player) {
            if (player == Evt.source) return [player, Evt.player];
            return [player, Evt.source];
        },
        check(Evt, player) {
            return (player.countCards('h') - (player == Evt.source ? Evt.player : Evt.source).countCards('h')) <= 1;
        },
        filter(Evt, player) {
            return Evt.source && player.countCards('h') > (player == Evt.source ? Evt.player : Evt.source).countCards('h');
        },
        content() {
            if (player == trigger.source) Evt.target = trigger.player;
            else Evt.target = trigger.source;
            player.swapHandcards(Evt.target);
        },
    },
    //拒流：其他角色使用非基本牌时，你可以失去一点体力取消之。
    jvliu: {
        trigger: {
            global: 'useCard'
        },
        filter(Evt, player) {
            return get.type(Evt.card) != 'basic' && Evt.player != player;
        },
        check(Evt, player) {
            if (get.$a(player, Evt.player) > 0) {
                return false;
            }
            if (get.tag(Evt.card, 'respondSha') && Evt.targets.includes(player)) {
                if (player.countCards('h', { name: 'sha' }) == 0) {
                    return true;
                }
            }
            else if (get.tag(Evt.card, 'respondShan') && Evt.targets.includes(player)) {
                if (player.countCards('h', { name: 'shan' }) == 0) {
                    return true;
                }
            }
            else if (get.tag(Evt.card, 'damage') && Evt.targets.includes(player)) {
                if (Evt.card.name == 'shuiyanqijunx') return player.countCards('e') == 0;
                return true;
            }
            else if ((Evt.card.name == 'shunshou' || (get.subtype(Evt.card) === 'equip2' && Evt.player.isEmpty(2))) && player.hp > 2) {
                return true;
            }
            return false;
        },
        logTarget: 'player',
        content: [() => {
            player.loseHp(1);
        }, () => {
            trigger.cancel();
            game.delayx();
        }],
    },
    //无瑕：觉醒技。准备阶段，若你体力为1，你增加一点体力并回复一点体力，弃置三张手牌（若不足则改为失去『拒流』）并获得『攻熏』。
    wuxia: {
        unique: true,
        juexingji: true,
        forced: true,
        trigger: {
            player: 'phaseZhunbei'
        },
        firstDo: true,
        filter(Evt, player) {
            return player.hp == 1;
        },
        content: [() => {
            player.awakenSkill('wuxia');
            player.gainMaxHp();
        }, () => {
            player.recover();
        }, () => {
            if (player.countCards('h') >= 3)
                player.chooseToDiscard(3, true);
            else
                player.removeSkill('jvliu');
        }, () => {
            player.setAvatar('Shiranekoyuki', 'Shiranekoyuki1');
            player.addSkill('wuxia_yuanyao');
        }],
        derivation: 'wuxia_yuanyao',
        involve: 'jvliu',
    },
    wuxia_yuanyao: {
        filter(Evt, player) {
            if (player.countCards('h') > player.maxHp || player.countCards('h') == player.hp)
                return false;
            return (player.getStat('skill').wuxia_yuanyao || 0) < game.countPlayer(cur => cur.sex == 'female');
        },
        inherit: 'yuanyao',
    },
    /**------------------------------------------------------------------------------------------------------- */
    //Ruki
    beixie: {
        trigger: { global: 'gameDrawBegin', player: 'enterGame' },
        direct: true,
        content: [() => {
            Evt.togain = [];
            for (let i = 0; i < ui.cardPile.childElementCount; i++) {
                Evt.togain.push(ui.cardPile.childNodes[i]);
            }
        }, () => {
            player.chooseButton(['是否获得其中的一张牌？', Evt.togain]);
        }, () => {
            if (result.bool) {
                player.logSkill(Evt.name);
                player.gain(result.links, 'draw', 'log');
                if (get.subtype(result.links[0]) == 'equip1') {
                    player.equip(result.links[0]);
                }
            }
        }]
    },
    hunzhan: {
        trigger: { global: 'damageAfter' },
        forced: true,
        filter(Evt, player) {
            return Evt.player.isIn();
        },
        logTarget: 'player',
        content: [() => {
            trigger.player.chooseToUse({
                filterCard(card, player) {
                    return lib.filter.filterCard.apply(this, arguments);
                },
                prompt: get.$pro2('hunzhan')
            });
        }, () => {
            if (result.cards && result.cards.length) {
                player.draw();
            }
        }]
    },
    //杜松子dusongziGin
    danqing: new toSkill('trigger', {
        trigger: {
            player: 'damageAfter', source: 'damageAfter'
        },
        init(player, skill) {
            player.$[skill] ??= [['first']];
        },
        filter(Evt, player) {
            return game.countPlayer(cur => !player.getStorage('danqing')[0].includes(cur))
        },
        direct: true,
        content: [() => {
            player.chooseTarget(get.$pro2('danqing'), function (card, player, target) {
                return !player.getStorage('danqing')[0].includes(target);
            }, function (target) {
                return get.$a2(target)
            })
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0]
                let card2 = get.cardPile(function (card) { return card.name == 'jiu' }, ['cardPile', 'discardPile']);
                if (card2) {
                    player.logSkill('danqing', Evt.target)
                    Evt.target.gain(card2, 'draw', 'log');
                }
                else Evt.finish()
            }
            else Evt.finish()
        }, () => {
            if (!Evt.target.hasSkill('danqing_Used')) Evt.target.addSkill('danqing_Used');
            if (player.$.danqing[0]) {
                if (player.$.danqing[0].includes('first')) {
                    player.$.danqing[0].remove('first')
                    let card2 = get.cardPile(function (card) { return card.name == 'jiu' }, ['cardPile', 'discardPile']);
                    if (card2) {
                        Evt.target.gain(card2, 'draw', 'log');
                    }
                }
                player.$.danqing[0].push(Evt.target)
            }
        }],
        group: 'danqing_count',
        subSkill: {
            count: new toSkill('trigger', {
                content() {
                    player.$.danqing ??= []
                    player.$.danqing.unshift(['first'])
                }
            }, 'direct', 'silent').setT({ global: 'phaseBefore' }),
            Used: new toSkill('mark', {
                intro: {
                    content: '已成为过『蛋擎』的目标'
                }
            }, 'locked', 'mark')
        },
    }).setT({ player: 'damageAfter', source: 'damageAfter' }),
    gaiqu: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countCards('h') < player.$.gaiqu_count;
        },
        content: [() => {
            delete player.$.gaiqu_count;
            player.awakenSkill('gaiqu');
            player.unmarkSkill('gaiqu_count')
            player.gainMaxHp();
        }, () => {
            player.recover();
        }, () => {
            if (player.countCards('h') > 2)
                player.chooseToDiscard(3, true);
            else
                player.removeSkill('danqing');
        }, () => {
            game.filterPlayer(cur => { if (cur.hasSkill('danqing_Used') && !cur.hasSkill('songxing')) cur.addSkill('songxing') })
        }],
        group: 'gaiqu_count',
        subSkill: {
            count: new toSkill('trigger', {
                intro: {
                    content: '已使用#张【酒】'
                },
                filter(Evt, player) {
                    return get.name(Evt.card) === 'jiu'
                },
                content() {
                    player.$.gaiqu_count ??= 0
                    player.$.gaiqu_count++
                    player.markSkill('gaiqu_count')
                }
            }, 'forced').setT('useCardAfter')
        },
        derivation: 'songxing',
        involve: 'danqing',
    }, 'unique', 'juexingji', 'forced', 'firstDo').setT('phaseZhunbei'),
    songxing: new toSkill('regard', {
        hiddenCard(player, name) {
            if (!player.countCards('hs', { name: 'jiu' })) return false;
            let list = get.inpile('trick2', card => !player.$.songxing.includes(card));
            return list.some(i => i === name);
        },
        filter(Evt, player) {
            return player.countCards('hs', { name: 'jiu' });
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = get.inpile('trick2', card => !player.$.songxing.includes(card)).map(i => ['锦囊', '', i]);
                if (list.length === 0) {
                    return ui.create.dialog('『松星』已无可用牌');
                }
                return ui.create.dialog('『松星』', [list, 'vcard']);
            },
            filter(button, player) {
                return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
            },
            check(button) {
                let player = _status.event.player
                if (button.link[2] == 'wugu') return 0;
                let effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup(links, player) {
                return {
                    filterCard(card) {
                        return get.name(card) === 'jiu'
                    },
                    selectCard: 1,
                    popname: true,
                    check(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hs',
                    viewAs: { name: links[0][2] },
                    onuse(result, player) {
                        player.$.songxing.push(result.card.name);
                    },
                };
            },
            prompt(links, player) {
                return `###『松星』###将一张【酒】当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
            }
        },
        group: 'songxing_clear',
        subSkill: {
            clear: new toSkill('rule', {
                content() {
                    player.$.songxing = []
                }
            }, 'direct', 'silent').setT({ global: 'phaseAfter' }),
        },
    }, 'enable:chooseToUse').setI([]),
    //月紫亚里亚
    tatongling: new toSkill('trigger', {
        filter(Evt, player) {
            if (player.hasSkill('tatongling_used')) return false
            return Evt.num > 0
        },
        check(Evt, player) {
            if (get.$a(player, Evt.player) > 0) return true
            return !Evt.player.isTurnedOver() && get.$a(player, Evt.player) < 0
        },
        content: [() => {
            player.addTempSkill('tatongling_used', 'phaseNext')
            Evt.target = trigger.player
            let check = !Evt.target.isTurnedOver() && (get.$a(Evt.target, player) >= 0 || Evt.target.needsToDiscard())
            Evt.target.chooseCard(2).set('ai', function (card) {
                if (!_status.event.check) return 0;
                return get.unuseful3(card)
            }).set('check', check).set('prompt', `『彤灵』：将两张手牌置于${get.$t(player)}武将牌上，否则翻面并回复一点体力`);
        }, () => {
            if (result.cards?.length) {
                player.addToExpansion(result.cards, 'give', Evt.target).gaintag.add('tatongling_mark');
            } else {
                Evt.target.turnOver()
                Evt.goto(Evt.step + 2)
            }
        }, () => {
            if (Evt.target.countCards() <= player.countCards()) {
                Evt.target.draw(2)
            }
        }, () => {
            if (Evt.target.hp <= player.hp) {
                Evt.target.recover()
            }
        }],
    }, 'logTarget:player').setT({ global: 'loseHpAfter', source: 'damageAfter' }).set(['group', ['tatongling_gainBy', 'tatongling_mark']], ['subSkill', {
        gainBy: new toSkill('trigger', {
            filter(Evt, player) {
                return player.getExpansions('tatongling').length;
            },
            content() {
                player.gain(player.getExpansions('tatongling'), 'give', player, 'log', 'fromStorage')
            },
        }, 'direct').setT(lib.phaseName, 'Skipped'),
        mark: new toSkill('mark', {
            intro: {
                content: 'expansion',
                markcount: 'expansion',
            },
            onremove: function (player, skill) {
                let cards = player.getExpansions(skill);
                if (cards.length) player.loseToDiscardpile(cards);
            },
        }),
        used: new toSkill('mark'),
    }]),
    yumeng: new toSkill('trigger', {
        content() {
            "step 0"
            let check = player.countCards('h') > 2;
            player.chooseTarget(get.$pro2(`yumeng`), function (card, player, target) {
                if (player == target) return false;
                return true;
            }).set('check', check).set('ai', function (target) {
                if (!_status.event.check) return 0;
                return get.$a(_status.event.player, target);
            });
            "step 1"
            if (result.bool) {
                player.logSkill('yumeng', result.targets);
                Evt.target = result.targets[0]
                Evt.target.$.yumeng2 = player
                Evt.target.addTempSkill('yumeng2', 'none')
                trigger.cancel();
                player.skip('phaseDraw');
            }
        },
    }, 'direct').setT('phaseJudgeBefore').set(['group', 'yumeng_clear'], ['subSkill', {
        clear: new toSkill('trigger', {
            content() {
                game.filterPlayer(cur => {
                    if (cur.$.yumeng2 === player) cur.removeSkill('yumeng2')
                })
            },
        }, 'direct').setT('phaseBegin')
    }]),
    yumeng2: new toSkill('trigger', {
        content() {
            trigger.cancel();
            trigger.player.loseHp(trigger.num);
        }
    }, 'forced', 'mark:character', 'onremove').setT('damageBefore').set(['intro', { content: '受到的伤害改为体力流失' }]),
    suyuan: new toSkill('trigger', {
        filter(Evt, player) {
            if (Evt.name == 'lose') {
                if (Evt.position != ui.discardPile) return false;
            } else {
                let evt = Evt.getParent();
                if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player != player || !['useCard', 'respond'].includes(evt.relatedEvent.name)) return false;
            }
            return get.suit3((Evt.cards2 || Evt.cards).filterInD('d')).length >= 3;
        },
        content: [() => {
            let cards = (trigger.cards2 || trigger.cards).filterInD('d');
            Evt.cards = cards;
            player.chooseTarget(function (card, player, target) {
                if (player == target)
                    return false;
                return true;
            }).set('ai', tar => {
                let att = get.$a2(tar);
                if (tar.hp == 1) return att + (get.damageEffect(tar, null, player) - get.damageEffect(tar))
                return (get.value(_status.event.cards, 'raw', tar) + tar.hp - 5) * att;
            }).set('cards', cards).set('createDialog',
                [get.$pro('suyuan'),
                    'small', get.skillInfoTranslation('suyuan', player), '令一名其他角色获得这些牌',
                [cards, 'card']]);
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('suyuan', Evt.target);

                let evt = trigger.getParent().relatedEvent;
                if ((trigger.name == 'discard' && !trigger.delay) || evt?.name == 'respond') game.delayx();
            } else Evt.finish();
        }, () => {
            Evt.target.$.suyuan = Evt.cards.length
            Evt.target.$.suyuan2 = player
            Evt.target.addTempSkill('suyuan2', 'none')
            Evt.target.gain(Evt.cards, 'gain2', 'log');
        }, () => {
            Evt.target.damage('nosource', 'nocard')
        }],
    }, 'direct').setT({ player: 'loseAfter', global: 'cardsDiscardAfter' }),
    suyuan2: new toSkill('mark', {
        onremove: ['suyuan', 'suyuan2'],
        filter(Evt, player) {
            return player.$.suyuan2 === Evt.player && player.$.suyuan;
        },
        content() {
            player.removeSkill('suyuan2')
            trigger.player.logSkill('suyuan', player)
            trigger.player.gainPlayerCard(player, true, player.$.suyuan)
        }
    }, 'forced', 'mark:character').setT({ global: 'phaseZhunbeiBegin' }).set(['intro', { content: '在$的下个准备阶段由对方获得牌' }]),
    mujian: new toSkill('trigger', {
        filter(Evt, player) {
            return player.hp === 0;
        },
        content() {
            game.filterPlayer(cur => {
                cur.addSkill('mujian2')
            })
        }
    }, 'forced').setT('dieBegin'),
    mujian2: new toSkill('trigger', {
        content() {
            for (let v of game.dead) {
                if (v.isDead() && v.hasSkill('mujian')) {
                    v.revive(1)
                    v.logSkill('mujian')
                    let next = game.createEvent('resetSkill');
                    next.player = v
                    next.setContent([() => {
                        let list = get.gainableSkills((info, skill) => {
                            return info.enable === 'phaseUse' && !info.forceunique && !info.notemp && !player.hasSkill(skill);
                        });
                        player.discoverSkill(list);
                    },
                    () => {
                        let link = result.skill;
                        if (link) {
                            player.addTempSkill(link, 'dieBegin');
                        }
                    }]);
                }
            }
        }
    }, 'locked', 'direct', 'silent').setT({ global: 'roundStart' }),
    cirong: new toSkill('active', {
        usable: 1,
        filterTarget(card, player, target) {
            return get.$dis(player, target, 'pure') <= 1;
        },
        discard: false,
        prepare: 'give2',
        content() {
            target.gain(cards, player);
        },
    }, 'filterCard'),
    maoyu: new toSkill('trigger', {
        filter(Evt, player) {
            if (player !== _status.currentPhase || Evt.player == player) return false;
            {
                let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
                if (info && !info.equipSkill && !info.ruleSkill) return lib.translate[`${name}_info`];
            }
            {
                let name = lib.skill.yiqu.process(Evt.getParent()), info = lib.skill[name];
                if (info && !info.equipSkill && !info.ruleSkill) return lib.translate[`${name}_info`];
            }
        },
        logTarget: 'player',
        content: [function () {
            Evt.tar0 = trigger.player
            Evt.tar1 = Evt.tar0.getNext()
            Evt.list = [`交给${get.$t(player)}两张牌`, `弃置一张牌，令${get.$t(Evt.tar1)}摸一张牌`];
            if (Evt.tar0.countCards('he') >= 2) {
                Evt.tar0.chooseControl('dialogcontrol', Evt.list, function () {
                    return _status.event.att;
                }).set('att', get.$a(Evt.tar0, player) > get.$a(Evt.tar0, Evt.tar1) ? 0 : 1).set('prompt', '『猫羽』请选择一项');
            } else {
                Evt._result = { control: Evt.list[1] };
            }
        }, function () {
            switch (result.control) {
                case Evt.list[0]: {
                    Evt.tar0.chooseCard(2, true, 'he', `交给${get.$t(player)}两张牌`)
                    break;
                }
                case Evt.list[1]: {
                    Evt.tar0.chooseToDiscard(true)
                    break;
                }
            }
        }, function () {
            if (result.cards.length === 2) player.gain(result.cards, Evt.tar0, 'giveAuto');
            else Evt.tar1.draw();
        }]
    }).setT({ global: 'gainAfter' }),
    //日ノ隈兰
    yixiang: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer(cur => cur.getDamagedHp() > 0)
        },
        content: [() => {
            player.chooseTarget(get.$pro2('yixiang'), function (card, player, tar) {
                return tar.getDamagedHp() > 0;
            }, tar => {
                let player = _status.event.player
                if (get.type3(tar.getCards(), 'trick') <= 1) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() - 3 * get.$a(player, tar) - 3
                if (get.type3(tar.getCards(), 'trick') >= 3) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() - 3
                if (tar === player && player.$.xianyu2?.isIn) return get.recoverEffect(tar, player, player) * tar.getDamagedHp() + (player.$.xianyu2.getHandcardLimit() - player.$.xianyu2.countCards('h')) - 3
                return 0
            })
        }, () => {
            if (result.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('yixiang', Evt.target)
                player.turnOver()
                game.delay(0.8)
            }
            else Evt.finish()
        }, () => {
            Evt.target.recover(Evt.target.getDamagedHp())
            Evt.target.$.yixiang_houxu = player
            Evt.target.addTempSkill('yixiang_houxu')
        }],
        subSkill: {
            houxu: new toSkill('mark', {
                mark: 'character',
                marktext: "🐻",
                intro: {
                    name: '异想',
                    content: '在本回合结束时展示手牌',
                },
                priority: 43,
                filter(Evt, player) {
                    return player.$.yixiang_houxu.isIn();
                },
                content: [() => {
                    player.showCards(player.getCards('h'), '异想后续');
                    game.delay(0.5);
                }, () => {
                    let types = ['basic', 'trick', 'equip'];
                    let cards = player.getCards('h').slice(0);
                    for (let i = 0; i < cards.length; i++) {
                        let type = get.type(cards[i], 'trick');
                        if (types.includes(type)) types.remove(type);
                    }
                    Evt.num = types.length;
                    player.loseHp(Evt.num)
                }, () => {
                    player.$.yixiang_houxu.draw(Evt.num)
                }]
            }, 'onremove', 'locked', 'forced', 'mark').setT({ global: 'phaseEnd' }),
        }
    }, 'direct').setT('phaseZhunbei'),
    xianyu: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer() >= 2
        },
        content: [() => {
            player.chooseTarget(get.$pro2('xianyu'), function (card, player, tar) {
                return tar.isIn();
            }, tar => {
                return get.$a2(tar);
            });
        }, () => {
            if (result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('xianyu', Evt.target);
                game.delay(0.5);
            }
            else {
                player.awakenSkill('xianyu');
                Evt.finish();
            }
        }, () => {
            player.$.xianyu2 = Evt.target;
            player.addTempSkill('xianyu2', 'none');
        }],
    }, 'direct', 'onremove').setT({ global: 'gameStart', player: 'enterGame' }),
    xianyu2: new toSkill('mark', {
        mark: 'character',
        intro: {
            name: '衔鱼',
            content: `你失去体力时，$摸牌至手牌上限；
            你或$死亡时，对方重置且翻至正面。`
        },
        filter(Evt, player) {
            if (Evt.num <= 0) return false
            return player.$.xianyu2?.isIn() && !player.$.xianyu2.needsToDiscard()
        },
        logTarget(Evt, player) {
            return player.$.xianyu2
        },
        content() {
            player.$.xianyu2.drawTo(player.getHandcardLimit())
        },
        group: 'xianyu2_going',
        subSkill: {
            going: new toSkill('trigger', {
                filter(Evt, player) {
                    return (player.$?.xianyu2?.isIn() || player.isIn())
                        && [player.$.xianyu2, player].includes(Evt.player)
                },
                logTarget(Evt, player) {
                    return player.$?.xianyu2
                },
                content: [() => {
                    if (player.$.xianyu2.isDead() && player.isIn()) {
                        player.turnOver(false)
                        player.link(false)
                    }
                }, () => {
                    if (trigger.player === player && player.$.xianyu2.isIn()) {
                        player.$.xianyu2.turnOver(false)
                        player.$.xianyu2.link(false)
                    }
                }]
            }, 'forced').setT({ global: 'dieEnd', player: 'dieBegin' })
        }
    }, 'forced').setT('loseHpEnd'),
    //雪团
    chentu: {
        enable: 'phaseUse',
        position: 'h',
        usable: 1,
        filterCard: true,
        selectCard: [1, Infinity],
        complexCard: true,
        check(card) {
            let player = _status.event.player;
            let nh = player.countCards('h') - ui.selected.cards.length;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() || game.players[i] == player) continue;
                if (game.players[i].countCards('h') < nh) return 12 - get.value(card);
            }
            return 5 - get.value(card);
        },
        content() {
            if (player.isMinHandcard()) {
                if (!player.$.chentu) player.$.chentu = 0;
                player.$.chentu += cards.length;
                player.markSkill('chentu');
            }
        },
        marktext: 'yuki',
        intro: {
            content(storage, player) {
                let str = '下个回合开始时，摸';
                str += get.cnNumber(player.$.chentu * 2);
                str += '张牌';
                return str;
            },
        },
        group: ['chentu_drawBy'],
        subSkill: {
            drawBy: {
                trigger: { player: 'phaseBegin' },
                direct: true,
                filter(Evt, player) {
                    return player.$.chentu;
                },
                content() {
                    player.draw(player.$.chentu * 2);
                    player.unmarkSkill('chentu');
                    delete player.$.chentu;
                }
            }
        },
        ai: {
            threaten: 1.3,
            order: 6,
            result: { player: 4 },
        }
    },
    sishu: {
        enable: 'chooseToUse',
        filter(Evt, player) {
            if (player != _status.currentPhase) return false;
            if (!player.countCards('h', { suit: 'heart' }) ||
                !player.countCards('h', { suit: 'spade' }) ||
                !player.countCards('h', { suit: 'diamond' }) ||
                !player.countCards('h', { suit: 'club' })) return false;
            if (!game.hasPlayer(cur => cur != player)) {
                return false;
            }
            return Evt.filterCard({ name: 'sha' }, player, Evt) ||
                Evt.filterCard({ name: 'jiu' }, player, Evt) ||
                Evt.filterCard({ name: 'tao' }, player, Evt) ||
                Evt.filterCard({ name: 'shan' }, player, Evt);
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = [];
                _status.event.skillBy = 'sishu';
                if (Evt.filterCard({ name: 'sha' }, player, Evt)) {
                    list.push(['基本', '', 'sha']);
                    list.push(['基本', '', 'sha', 'fire']);
                    list.push(['基本', '', 'sha', 'thunder']);
                }
                if (Evt.filterCard({ name: 'tao' }, player, Evt)) {
                    list.push(['基本', '', 'tao']);
                }
                if (Evt.filterCard({ name: 'jiu' }, player, Evt)) {
                    list.push(['基本', '', 'jiu']);
                }
                if (Evt.filterCard({ name: 'shan' }, player, Evt)) {
                    list.push(['基本', '', 'shan']);
                }
                delete _status.event.skillBy;
                return ui.create.dialog('饲鼠', [list, 'vcard'], 'hidden');
            },
            check(button) {
                let player = _status.event.player;
                let card = { name: button.link[2], nature: button.link[3] };
                if (card.name == 'jiu') return get.order({ name: 'jiu' });
                if (game.hasPlayer(cur => player.canUse(card, cur) && get.effect(cur, card, player, player) > 0)) {
                    if (card.name == 'sha') {
                        if (card.nature == 'fire') return 2.95;
                        else if (card.nature == 'fire') return 2.92;
                        else return 2.9;
                    } else if (card.name == 'tao' || card.name == 'shan') {
                        return 4;
                    }
                }
                return 0;
            },
            backup(links, player) {
                return {
                    filterCard(card) {
                        if (ui.selected.cards.length) {
                            for (let i of ui.selected.cards) {
                                if (get.suit(card) == get.suit(i)) return false;
                            }
                        }
                        return get.suit(card);
                    },
                    complexCard: true,
                    viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
                    selectCard: 4,
                    popname: true,
                    log: false,
                    precontent: [() => {
                        Evt.cards = Evt.result.cards.slice(0);
                        Evt.result.card.cards = [];
                        Evt.result.cards = [];
                        delete Evt.result.card.suit;
                        delete Evt.result.card.number;
                    }, () => {
                        player.chooseTarget('选择收到这些牌的角色', true, lib.filter.notMe).ai = function (target) {
                            return get.$a(player, target);
                        }
                    }, () => {
                        if (result.bool && result.targets?.length) {
                            player.logSkill('sishu', result.targets);
                            player.give(Evt.cards, result.targets[0], true);
                        }
                    }],
                }
            },
            prompt(links, player) {
                return `###选择交给其他角色的牌，以及${get.$t(links[0][3] || '')}${get.$t(links[0][2])}的目标###（注意是牌的目标。而不是收到牌的角色）`;
            }
        },
        mod: {
            cardEnabled(card, player) {
                if (player == _status.currentPhase && get.type(card) == 'basic' && (_status.event.skillBy != 'sishu' && _status.event.skill != 'sishu_backup')) return false;
            },
            cardSavable(card, player) {
                if (player == _status.currentPhase && get.type(card) == 'basic' && (_status.event.skillBy != 'sishu' && _status.event.skill != 'sishu_backup')) return false;
            },
        },
        ai: {
            order() {
                let player = _status.event.player;
                let Evt = _status.event;
                let nh = player.countCards('h');
                if (game.hasPlayer(cur => get.$a(player, cur) > 0 && cur.countCards('h') < nh)) {
                    if (Evt.type == 'dying') {
                        if (Evt.filterCard({ name: 'tao' }, player, Evt)) {
                            return 0.5;
                        }
                    } else {
                        if (Evt.filterCard({ name: 'tao' }, player, Evt) || Evt.filterCard({ name: 'shan' }, player, Evt)) {
                            return 4;
                        }
                        if (Evt.filterCard({ name: 'sha' }, player, Evt)) {
                            return 2.9;
                        }
                    }
                }
                return 0;
            },
            save: true,
            respondSha: true,
            respondShan: true,
            skillTagFilter(player, tag, arg) {
                return player.countCards('h') >= 4;
            },
            result: {
                player(player) {
                    if (_status.event.type == 'dying') {
                        return get.$a(player, _status.event.dying);
                    } else {
                        return 1;
                    }
                }
            }
        }
    },
    //扇宝
    fengxu: new toSkill('trigger', {
        audio: 2,
        filter(Evt, player) {
            return Evt.targets.length == 1
                && Evt.target == Evt.targets[0]
                && Evt.target.countCards('hej');
        },
        check(Evt, player) {
            return get.$a(player, Evt.target) <= 0
                || (get.$a(player, Evt.target) > 0 && Evt.target.countCards('j'));
        },
        usable: 1,
        content: [() => {
            Evt.A = trigger.target;
            Evt.num = 0;
        }, () => {
            Evt.B = Evt.A.next;
            if (!Evt.A.countCards('hej')) Evt.finish();
            player.choosePlayerCard('hej', Evt.A, true).set('ai', function (button) {
                let player = _status.event.player, source = _status.event.target, target = source.next, link = button.link;
                if (get.position(link) == 'j') {
                    if (target.canAddJudge(link)) return get.effect(target, link, player, player) * get.$a(player, target);
                } else if (get.position(link) == 'e') {
                    let subtype = get.subtype(link);
                    if (!target.getEquip(subtype)) return get.effect(target, link, player, player) * get.$a(player, target);
                } else {
                    return get.value(link, target, 'raw') * get.$a(player, target);
                }
            });
        }, () => {
            if (result.bool) {
                let card = result.links[0];
                if (get.position(card) == 'e') {
                    let c = Evt.B.getEquip(get.subtype(card));
                    if (c) {
                        Evt.change = true;
                        game.log(c, '掉落了');
                    }
                    Evt.B.equip(card);
                } else if (get.position(card) == 'j') {
                    let cname = card.viewAs ? card.viewAs : get.name(card);
                    Evt.B.getCards('j').forEach(function (c) {
                        if (get.name(c) == cname) {
                            Evt.change = true;
                            game.log(c, '掉落了');
                            game.cardsDiscard(c);
                        }
                    })
                    Evt.B.addJudge({ name: cname }, [card]);
                } else {
                    Evt.B.gain(card, Evt.A);
                }
                Evt.A.$give(card, Evt.B)
                game.delayx(2)
            }
        }, () => {
            if (Evt.change) {
                if (Evt.B === player) {
                    if (Evt.num) player.draw(Evt.num);
                    let next = game.createEvent('resetSkill');
                    [next.player, next.resetSkill] = [player, 'fengxu']
                    next.setContent(function () {
                        player.popup('重置');
                        game.log(player, '重置了', '#g『风许』')
                        player.$.counttrigger.fengxu = 0
                    });
                    game.delayx()
                }
            } else if (Evt.num < 5) {
                Evt.A = Evt.B;
                Evt.num++;
                Evt.goto(1);
            }
        }]
    }).setT('useCardToPlayered'),
    //秋蒂Q
    xiangnuo: {
        trigger: {
            player: ['loseAfter', 'equipEnd'],
            global: ['gainAfter', 'equipAfter', 'addJudgeAfter', 'loseAsyncAfter'],
        },
        direct: true,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 1;
        },
        filter(Evt, player) {
            if (player.$.xiangnuo == 1) {
                return Evt.name == 'equip' && Evt.player == player;
            } else {
                let evt = Evt.getl(player);
                return evt?.es?.length;
            }
        },
        content: [() => {
            player.chooseTarget(get.$pro2('xiangnuo')).ai = function (target) {
                return get.$a2(target) * (target.isMinHp(true) && target.isDamaged() ? 4.5 : 2);
            };
        }, () => {
            if (result.bool) {
                player.$.xiangnuo = player.$.xiangnuo == 1 ? 2 : 1;
                let target = result.targets[0];
                target.draw(2);
                if (target.isMinHp(true)) target.recover();
                player.updateMarks('xiangnuo')
            }
        }],
        group: 'xiangnuo2',
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
                }
            },
            expose: 0.5,
            threaten: 1.3
        }
    },
    xiangnuo2: {
        enable: 'phaseUse',
        getResult(cards, player): Array<[]> {
            let l = cards.length, all = Math.pow(l, 2), list = [];
            for (let i = 1; i < all; i++) {
                let array = [];
                for (let j = 0; j < l; j++) {
                    if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
                }
                let num = 0;
                for (let k of array) {
                    num += get.number(k);
                }
                if (num == 12) list.push(array);
            }
            if (list.length) {
                list.sort(function (a, b) {
                    if (a.length != b.length) return b.length - a.length;
                    return get.value(a, player) - get.value(b, player);
                });
                return list[0];
            }
            return list;
        },
        usable: 1,
        filterCard(card) {
            let num = 0;
            for (let i of ui.selected.cards) {
                num += get.number(i);
            }
            return get.number(card) + num <= 12;
        },
        complexCard: true,
        selectCard() {
            let num = 0;
            for (let i of ui.selected.cards) {
                num += get.number(i);
            }
            if (num == 12) return ui.selected.cards.length;
            return ui.selected.cards.length + 2;
        },
        check(card) {
            let evt = _status.event;
            if (!evt.xiangnuo_choice) evt.xiangnuo_choice = lib.skill.xiangnuo2.getResult(evt.player.getCards('he'), evt.player);
            if (!evt.xiangnuo_choice.includes(card)) return 0;
            return 1;
        },
        content: [() => {
            player.draw(cards.length).gaintag = ['xiangnuo'];
        }, () => {
            player.$.xiangnuo = player.$.xiangnuo == 1 ? 2 : 1;
            player.updateMarks('xiangnuo')
        }],
        ai: {
            order: 5,
            result: { player: 1 },
        },
    },
    //陆鳐
    manyou: new toSkill('trigger', {
        usable: 1,
        filter(Evt, player) {
            if (Evt.name == 'lose' && Evt.position != ui.discardPile) return false;
            for (let i of (Evt.cards2 || Evt.cards).filterInD('d')) {
                if (get.name(i) === 'sha' && ['thunder', 'ocean'].includes(get.nature(i))) return true;
            }
            return false;
        },
        content: [() => {
            Evt.cards = (trigger.cards2 || trigger.cards).filterInD('d').filter(i => get.name(i) === 'sha' && ['thunder', 'ocean'].includes(get.nature(i)))
            player.gain(Evt.cards, 'gain2', 'log').gaintag.add('manyou');
        }],
        group: 'manyou_reCount',
        subSkill: {
            reCount: new toSkill('trigger', {
                firstDo: true,
                filter(Evt, player) {
                    return get.type(Evt.card) == 'basic' && Evt.cards.length == 1 && player.hasHistory('lose', evt => {
                        if (evt.getParent() != Evt) return false;
                        for (let i in evt.gaintag_map) {
                            if (evt.gaintag_map[i].includes('manyou')) return true;
                        }
                        return false;
                    });
                },
                content() {
                    if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        let stat = player.getStat().card;
                        if (stat[trigger.card.name]) stat[trigger.card.name]--;
                    }
                },
            }, 'silent').setT('useCard1')
        },
        ai: {
            threaten: 1.1
        }
    }).setT({ global: ['loseAfter', 'cardsDiscardAfter'] }),
    changjie: new toSkill('trigger', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        intro: {
            content: '本局游戏内累计使用了#张属性【杀】'
        },
        filter(Evt, player) {
            return player.$.changjie > 0;
        },
        content() {
            if (player.hasHistory('sourceDamage', evt => {
                return evt.getParent('phaseUse') === trigger;
            })) {
                player.draw(player.$.changjie)
            } else {
                player.chooseToDiscard(true, player.$.changjie, 'he')
            }
        },
        group: 'changjie_mark',
        subSkill: {
            mark: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.card.name === 'sha' && Evt.card.nature;
                },
                content() {
                    player.$.changjie++
                    player.markSkill('changjie')
                },
            }, 'direct', 'locked').setT('useCard')
        },
        ai: {
            threaten: 1.3
        }
    }, 'forced').setT('phaseUseEnd'),
    //虾皇
    tanghuang: new toSkill('trigger', {
        logTarget: 'player',
        usable: 1,
        filter(Evt, player) {
            let source = Evt.player;
            if (source == player) return false;
            return true;
        },
        check(Evt, player) {
            let target = Evt.player;
            if (get.$a(player, target) >= 0) {
                if ((player.hujia || player.getDamagedHp() >= 2) && player.hasSkillTag('xuefeng')) return true;
                if (get.$a(player, target) > 0 && target.hujia && target.hasSkillTag('xuefeng')) return true;
            }
            return false;
        },
        content: [() => {
            Evt.num = (player.getDamagedHp()) || 1;
            Evt.target = trigger.player;
            player.draw(Evt.num);
            game.delayx();
        }, () => {
            let list: Dialogword = [];
            if (Evt.target.countCards('he')) {
                list.push('你的牌', Evt.target.getCards('he'));
            }
            if (player.countCards('h')) {
                list.add(`${get.$t(player.name)}的牌`);
                list.push([player.getCards('h'), 'blank'])
            }
            if (player.countCards('e')) {
                list.add(`${get.$t(player.name)}的牌`);
                list.push(player.getCards('e'));
            }
            let chooseButton = Evt.target.chooseButton(Evt.num + 3, true, list);
            chooseButton.set('target', player);
            chooseButton.set('num', Evt.num);
            chooseButton.set('ai', function (button) {
                let player = _status.event.player, target = _status.event.target;
                let num = _status.event.num
                let ps = [], ts = [];
                for (let i of ui.selected.buttons) {
                    let card = i.link;
                    if (target.getCards('he').includes(card)) ts.push(card);
                    else ps.push(card);
                }
                let card = button.link;
                let owner = get.owner(card), val = get.value(card) || 1;
                if (get.$a(player, target) > 0) {
                    if (target.hujia || player.hujia) { } else if (num % 2 == 0) {
                        if (owner == ((ps.length > ts.length) ? target : player)) return 10 - val;
                    }
                }
                if (owner == player) {
                    if (target.hujia && target.hasSkillTag('xuefeng')) {
                        if (ps.length > 1) return 15 - val;
                        return 12 - val;
                    }
                    return 7 - val;
                } else {
                    if (player.hujia && player.hasSkillTag('xuefeng')) {
                        if (ts.length > 1) return 16 - val;
                        return 11 - val;
                    }
                    return 5.5 - val;
                }
            });
            chooseButton.set('filterButton', function (button) {
                let player = _status.event.player;
                return lib.filter.canBeDiscarded(button.link, player, get.owner(button.link));
            });
        }, () => {
            if (result.bool) {
                let list = result.links, target = Evt.target;
                Evt.list1 = [];
                Evt.list2 = [];
                for (let i of list) {
                    if (get.owner(i) == player) {
                        Evt.list1.push(i);
                    } else {
                        Evt.list2.push(i);
                    };
                };
                if (Evt.list1.length && Evt.list2.length) {
                    target.discard(Evt.list2).delay = false;
                    player.discard(Evt.list1);
                } else if (Evt.list2.length) {
                    target.discard(Evt.list2);
                } else player.discard(Evt.list1);
                let dis = Evt.list1.length - Evt.list2.length;
                if (dis > 0) {
                    Evt.dis = dis;
                    Evt.more = player;
                    Evt.less = target;
                } else if (dis < 0) {
                    Evt.dis = -dis;
                    Evt.more = target;
                    Evt.less = player;
                }
            };
        }, () => {
            if (Evt.more) {
                Evt.less.damage();
                Evt.more.draw(Evt.dis);
            }
        }],
    }).setT({ target: 'useCardToTargeted' }),
    xiejiang: new toSkill('trigger', {
        trigger: { player: ['drawEnd', 'changeHujiaEnd'] },
        filter(Evt, player) {
            if (Evt.name == 'draw') return Evt.num >= 2;
            else return Evt.num < 0 && _status.currentPhase;
        },
        forced: true,
        content() {
            if (trigger.name == 'draw') {
                player.changeHujia();
            } else {
                _status.currentPhase.draw(2);
            }
        },
        ai: {
            tag: {
                xuefeng: 1,
            }
        }
    }),
    //龟龟
    lache: {
        trigger: { player: ['recoverAfter', 'discardAfter', 'changeHujiaEnd'] },
        logTarget(Evt, player) {
            if (Evt.name == 'recover') return _status.currentPhase;
            return player;
        },
        filter(Evt, player) {
            if (Evt.name == 'recover') return _status.currentPhase?.isIn();
            else if (player.hp < player.maxHp) {
                if (Evt.name == 'discard') return Evt.cards.length >= 2;
                else return Evt.num < 0;
            }
        },
        prompt2(Evt, player) {
            if (Evt.name == 'recover') return '令其摸两张牌';
            return '回复一点体力';
        },
        check(Evt, player) {
            if (Evt.name == 'recover') return get.$a(player, _status.currentPhase) > 0;
            else return true;
        },
        content() {
            if (trigger.name == 'recover') {
                _status.currentPhase.draw(2);
            } else {
                if (_status.currentPhase != player) player.draw(Math.abs(trigger.num || trigger.cards.length));
                player.recover();
            }
        },
    },
    danfu: {
        trigger: { player: ['phaseJieshuBegin', 'changeHujiaAfter'] },
        filter(Evt, player) {
            if (Evt.name == 'phaseJieshu') return !player.getStat('damage');
            else return Evt.num < 0 && _status.currentPhase;
        },
        forced: true,
        content() {
            if (trigger.name == 'phaseJieshu') {
                player.loseHp();
                player.changeHujia();
            } else {
                for (let i = 0; i > trigger.num; i--) {
                    _status.currentPhase.draw();
                }
            }
        },
        ai: {
            tag: {
                xuefeng: 1,
            }
        }
    },
    //伊万
    shuipo: {
        trigger: { player: ['discardAfter', 'changeHujiaEnd', 'useCardAfter'] },
        filter(Evt, player) {
            if (Evt.name == 'useCard') return get.type2(Evt.card) == 'trick' && !player.hasSkill('shuipo_used');
            else if (Evt.name == 'discard') return Evt.cards.length >= 3;
            else return !player.hujia;
        },
        forced: true,
        content() {
            if (trigger.name == 'useCard') {
                player.loseHp();
                player.chooseToDiscard([1, Infinity], 'he', true, '『水魄』：请弃置任意张牌')
                player.addTempSkill('shuipo_used', 'phaseNext');
            } else {
                player.recover();
                player.draw();
            }
        },
        subSkill: {
            used: {},
        },
        ai: {
            tag: {
                xuefeng: 1,
            }
        }
    },
    ming_pianchao: {},
    pianchao: {
        mod: {
            aiValue(player, card, num) {
                if (card.hasGaintag && card.hasGaintag('ming_') && player.hasUseTarget(card)) return num / (10 * player.getUseValue(card));
            },
        },
        trigger: { player: ['loseHpAfter', 'discardEnd'] },
        filter(Evt, player) {
            if (Evt.name == 'loseHp') return player.countCards('h', card => !card.hasGaintag('ming_')) >= 2;
            else {
                return player.hasHistory('lose', evt => {
                    if (evt.getParent() != Evt) return false;
                    for (let i in evt.gaintag_map) {
                        if (evt.gaintag_map[i].includes('ming_')) return true;
                    }
                    return false;
                });
            }
        },
        direct: true,
        content: [() => {
            if (trigger.name == 'loseHp') {
                player.chooseCard('h', `###${get.$pro('pianchao')}###亮出两张手牌并获得1点护甲`, 2, card => !card.hasGaintag('ming_'));
            } else {
                Evt.cards = trigger.cards.filter(card => player.getHistory('lose', evt => {
                    if (evt.getParent() != trigger) return false;
                    if (evt.gaintag_map[card.cardid] && evt.gaintag_map[card.cardid].includes('ming_')) return true;
                    return false;
                }).length > 0);
                let next = player.chooseCardButton(1, `###${get.$pro('pianchao')}###使用其中一张牌`, Evt.cards);
                next.set('filterButton', function (button) {
                    let player = _status.event.player;
                    return player.hasUseTarget(button.link);
                });
                next.set('ai', function (button) {
                    let player = _status.event.player;
                    return player.getUseValue(button.link);
                });
            }
        }, () => {
            if (result.bool) {
                if (trigger.name == 'loseHp') {
                    player.logSkill('pianchao')
                    player.addGaintag(result.cards, 'ming_pianchao');
                    player.changeHujia();
                } else {
                    player.logSkill('pianchao')
                    player.chooseUseTarget(result.links[0], true, 'nopopup');
                    player.addTempSkill('pianchao_phaseUseBy', 'none');
                }
            }
        }],
        subSkill: {
            phaseUseBy: {
                mark: true,
                marktext: '片',
                intro: { content: '于下个额定阶段结束后进行一个额外的出牌阶段' },
                trigger: { global: 'phaseNext' },
                forced: true,
                content() {
                    player.removeSkill('pianchao_phaseUseBy');
                    player.phaseUse();
                },
            },
        },
    },
    //申䒕雅
    xyshixi: {
        enable: 'phaseUse',
        usable: 1,
        filterTarget: true,
        content: [() => {
            target.damage();
        }, () => {
            target.recover();
        }],
        ai: {
            tag: {
                xuefeng: 1,
            }
        }
    },
    wenxin: {
        mod: {
            aiValue(player, card, num) {
                if (card.hasGaintag && card.hasGaintag('ming_') && player.hasUseTarget(card)) return num / (10 * player.getUseValue(card));
            },
        },
        trigger: { player: 'phaseJieshuEnd' },
        filter(Evt, player) {
            return game.hasPlayer(cur => cur.hasHistory('recover', evt => evt.player == cur && evt.result))
        },
        content: [() => {
            Evt.targets = game.filterPlayer(cur => cur.hasHistory('recover', evt => evt.player == cur && evt.result));
            game.asyncDraw(Evt.targets, player.getDamagedHp() || 1);
        }],
    },
    //Ciyana
    yankui: new toSkill('trigger', {
        trigger: { global: 'phaseZhunbei' },
        direct: true,
        filter(Evt, player) {
            return player != Evt.player && player.countCards('he', card => !player.$.yankui_mark
                || !player.$.yankui_mark.includes(get.type2(card))) > 1 && Evt.player.countGainableCards(player, 'h');
        },
        check(Evt, player) {
            if (player.hasUnknown(4)) return false;
            return true;
        },
        content: [() => {
            Evt.target = trigger.player;
            player.chooseToDiscard(get.$pro2('yankui'), 'he', function (card, player, target) {
                return !player.$.yankui_mark
                    || !player.$.yankui_mark.includes(get.type2(card));
            })
                .set('ai', card => {
                    let player = _status.event.player, target = _status.event.getTrigger().player, use = 0;
                    if (player.hasUseTarget(card)) use += player.getUseValue(card) * 2;
                    if (get.$a(player, target) < 1) return 6 - get.useful(card) + use;
                    return 0;
                })
                .set('logSkill', ['yankui', Evt.target])
        }, () => {
            if (result.bool && result.cards?.length) {
                Evt.precard = result.cards[0];
                if (!player.$.yankui_mark) player.$.yankui_mark = [];
                player.$.yankui_mark.addArray(get.type3(result.cards));
                player.gainPlayerCard(Evt.target, 'h', true, 'visibleMove')
                    .set('visible', true)
                    .set('ai', function (button) {
                        let player = _status.event.player, target = _status.event.getTrigger().player;
                        if (get.$a(player, target) > 0) {
                            if (target.countCards('h', { name: 'sha' }) > 1 && get.type(button.link) != 'basic' && get.name(button.link) != 'sha') return 6 + get.value(button.link);
                            if (target.countCards('j') && target.needsToDiscard() && get.type(button.link) != 'basic') return 5 + get.value(button.link);
                        }
                        return get.value(button.link);
                    });
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.bool && result.links) {
                player.addTempSkill('yankui_mark', 'roundStart');
                let type = get.type(result.links[0])
                if (type !== 'basic') {
                    Evt.target.skip('phaseJudge');
                    Evt.target.skip('phaseDiscard');
                    Evt.target.addTempSkill('yankui1');
                } else {
                    Evt.target.addTempSkill('yankui2');
                }
                if (type === get.type2(Evt.precard)) {
                    player.draw()
                }
            }
        }],
        subSkill: {
            mark: {
                mark: true,
                marktext: '魇',
                intro: {
                    name: '魇窥',
                    content(storage, player) {
                        let str = '<ul style="padding-top:0;margin-top:0"><p>本轮次已弃置的牌类型</p>';
                        storage.forEach(v => {
                            str += `<li>${get.$t(v)}`;
                        })
                        str += '</ul>'
                        return str;
                    },
                },
                onremove: true,
            },
        },
    }),
    yankui1: new toSkill('mark', {
        marktext: '魇',
        intro: { name: '魇窥 - 非基本牌', content: '跳过本回合下一个判定阶段和弃牌阶段' },
    }, 'mark'),
    yankui2: new toSkill('mark', {
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha') return num + 3;
            },
        },
        marktext: '魇',
        intro: { name: '魇窥 - 基本牌', content: '本回合内使用【杀】次数上限+3' },
    }, 'mark'),
    //赫卡缇亚
    naqi: new toSkill('trigger', {
        filter(Evt, player) {
            return !player.inRange(Evt.player) && Evt.player.countDiscardableCards(player, 'he');
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player
            player.discardPlayerCard(Evt.target, 'hej', true)
        }, () => {
            if (result.bool) {
                Evt.card = result.links[0];
                player.showCards([Evt.card], `${get.$t(player)}弃置的牌`);
                game.delayx()
            } else {
                Evt.finish();
            }
        }, () => {
            if (get.type(Evt.card) === 'equip') {
                player.gain(Evt.card, 'gain2', 'log');
            }
        }],
        mod: {
            globalFrom(from, to, distance) {
                if (from.countCards('e')) return distance + from.countCards('e');
            },
        }
    }, 'forced').setT({ global: 'damageAfter' }),
    shouji: new toSkill('trigger', {
        filter(Evt, player) {
            return player.isDamaged()
        },
        check(Evt, player) {
            return player.countCards('e') > 2
        },
        content: [() => {
            player.awakenSkill('shouji')
            player.gainMaxHp()
        }, () => {
            player.moveCard().set('nojudge', true)
        }, () => {
            if (player.countCards('e') >= 5) {
                game.broadcast(function () {
                    lib.skill.shuangzhi.forced = true
                })
                lib.skill.shuangzhi.forced = true
                player.addTempSkill('suxing')
            }
        }],
        derivation: 'suxing',
        involve: 'shuangzhi',
    }, 'limited').setT('phaseZhunbeiBegin'),
    suxing: new toSkill('active', {
        filter(Evt, player) {
            return (player.getStat('skill').suxing || 0) < player.getDamagedHp();
        },
        content: [() => {
            Evt.cards = []
            Evt.num = 0
        }, () => {
            player.draw()
            Evt.num++
        }, () => {
            if (player.countCards('he')) {
                player.chooseToDiscard(true, 'he', '『塑星』：弃置一张牌')
            }
            else {
                Evt.finish()
            }
        }, () => {
            if (result.cards) {
                Evt.cards.push(...result.cards)
            }
            if (Evt.num < 3) {
                Evt.goto(1)
            }
            else {
                if (get.type3(Evt.cards, 'trick').length >= Evt.cards.length) {
                    console.log(Evt.cards, get.type3(Evt.cards, 'trick'))
                    player.chooseUseTarget(
                        '『塑星』：可以视为对其使用一张【杀】',
                        { name: 'sha' }, 'nodistance'
                    )
                }
            }
        }],
    }),
    //noe
    huiyuan: {
        audio: 4,
        trigger: { global: 'useCard1' },
        filter(Evt, player) {
            return player.countCards('h') < Evt.player.countCards('h') && get.type(Evt.card) == 'basic';
        },
        usable: 2,
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        content() {
            game.asyncDraw([player, trigger.player]);
        },
    },
    suoshi: {
        audio: 2,
        trigger: { player: 'damageBegin3' },
        filter(Evt, player) {
            return player.countCards('h');
        },
        direct: true,
        content: [() => {
            let list = game.filterPlayer(cur => {
                return cur.isMaxHandcard();
            });
            player.chooseCardTarget({
                prompt: get.$pro2('suoshi'),
                position: 'he',
                filterTarget(card, player, target) {
                    return player != target && target.countCards() > player.countCards();
                },
                filterCard: true,
                // filterCard: lib.filter.cardDiscardable,
                ai1(card) {
                    if (_status.event.goon) return 6 - get.value(card);
                    return 0;
                },
                ai2(target) {
                    let player = _status.event.player;
                    return get.$a(player, target);
                },
                goon: !player.isMinHandcard() && (player.countCards('h') < 3 && get.$a(player, list[0]) > 0),
            });
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.cards = result.cards.slice(0);
                Evt.target = result.targets[0];
                player.logSkill('suoshi', Evt.target);
                player.give(Evt.cards, Evt.target);
            }
        }],
        group: ['suoshi_addDam'],
        subSkill: {
            addDam: {
                trigger: { player: 'damageBegin' },
                forced: true,
                filter(Evt, player) {
                    return !player.isMinHandcard();
                },
                content() {
                    trigger.num++;
                }
            }
        }
    },
    //帕里
    paryi: {
        marktext: "P",
        locked: true,
        intro: {
            name: '帕里家常',
            content(storage, player, skill) {
                return `已经历了${storage}次『天扉』`;
            },
        },
    },
    tiantang: {
        audio: 2,
        priority: 987,
        global: 'paryi',
        trigger: {
            global: 'phaseBegin'
        },
        filter(Evt, player) {
            if (player.countCards('he') < (Evt.player.$.paryi || 1)) return false;
            return true;
        },
        check(Evt, player) {
            if (player.$.haoren !== true) return (Evt.player.$.paryi || 1) <= 2 && get.$a(player, Evt.player) < 1 && !Evt.player.hasJudge('lebu');
            return Evt.player.needsToDiscard() && get.$a(player, Evt.player) < 0 || Evt.player.countCards('h') == 0 && Evt.player.getHandcardLimit() >= 3 && get.$a(player, Evt.player) >= 0;
        },
        content: [() => {
            let num = trigger.player.$.paryi || 1;
            if (player.$.haoren === true) player.chooseCard(num, 'he', `『天扉』：重铸${get.cnNumber(num)}张牌`).ai = get.unuseful3;
            else player.chooseToDiscard(num, 'he', `『天扉』：弃置${get.cnNumber(num)}张牌`).ai = get.unuseful2;
        }, () => {
            if (result.bool) {
                Evt.target = trigger.player;
                if (player.$.haoren !== true) {
                    player.addMark('haoren');
                } else {
                    player.lose(result.cards, ui.discardPile).set('visible', true);
                    player.$throw(result.cards, 1000);
                    game.log(player, '将', result.cards, '置入了弃牌堆');
                    player.draw(result.cards.length);
                }
                let target = Evt.target;
                if (target.$.paryi) {
                    target.$.paryi++;
                } else {
                    target.$.paryi = 1;
                }
                target.markSkill('paryi');
                Evt.videoId = lib.status.videoId++;
                let suitlist = [
                    ['heart', '', 'heart', 'heart'],
                    ['diamond', '', 'diamond', 'diamond'],
                    ['club', '', 'club', 'club'],
                    ['spade', '', 'spade', 'spade']
                ];
                game.broadcastAll(function (id, suitlist) {
                    let dialog = ui.create.dialog('『天扉』声明');
                    dialog.addText('花色');
                    dialog.add([suitlist, 'vcard']);
                    dialog.videoId = id;
                }, Evt.videoId, suitlist);
            } else Evt.finish();
        }, () => {
            player.chooseButton().set('dialog', Evt.videoId);
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                Evt.tiantang = result.links[0][2];
                player.chat(get.$t(Evt.tiantang));
                game.log(player, '声明了', Evt.tiantang);

                let list = [`观看${get.$t(Evt.target)}的手牌${player.awakenedSkills.includes('haoren') ? '并重铸' : '并弃置'}其一张${get.$t(Evt.tiantang)}牌，令其执行一个额外的出牌阶段`,
                `令${get.$t(Evt.target)}摸两张牌，然后其只能使用${get.$t(Evt.tiantang)}的牌直到回合结束`];
                // if(!player.awakenedSkills.includes('haoren')&&!Evt.target.countDiscardableCards(player,'he'))	list.shift();
                player.chooseControl('dialogcontrol', list).set('ai', function () {
                    return 1;
                }).set('prompt', '『天扉』：选择一项');
            } else Evt.finish();
        }, () => {
            switch (result.index) {
                case 0: {
                    let next = player[player.$.haoren === true ? 'choosePlayerCard' : 'discardPlayerCard'](`『天扉』：${player.$.haoren === true ? '重铸' : '弃置'}一张声明花色的牌`, Evt.target, 'he').set('visible', true).set('complexSelect', true);
                    next.set('filterButton', function (button) {
                        return get.suit(button.link) == _status.event.suit;
                    });
                    next.set('suit', Evt.tiantang);
                    if (Evt.target.countCards('he', card => get.suit(card) == Evt.tiantang)) {
                        next.set('forced', true);
                    }
                    break;
                }
                case 1: {
                    Evt.target.draw(2, player);
                    Evt.target.addTempSkill('tiantangzhifei_xianzhi', 'phaseEnd');
                    Evt.target.$.tiantangzhifei_xianzhi = Evt.tiantang;
                    Evt.target.syncStorage('tiantangzhifei_xianzhi');
                    Evt.finish();
                    break;
                }
            }
        }, () => {
            if (player.$.haoren === true && result.bool && result.cards) {
                Evt.target.lose(result.cards, ui.discardPile).set('visible', true);
                Evt.target.$throw(result.cards, 1000);
                game.log(Evt.target, '将', result.cards, '置入了弃牌堆');
                Evt.target.draw(result.cards.length);
            }
            if (player.$.haoren === true) {
                Evt.target.addTempSkill('tiantangzhifei_yisheng', 'phaseUseEnd');
            }
            Evt.target.phaseUse();
        }],
    },
    tiantangzhifei: {
        subSkill: {
            yisheng: new toSkill('mark', {
                mark: true,
                marktext: "流",
                intro: {
                    name: '回流',
                    content(storage, player, skill) {
                        return '暂时获得技能『引流』';
                    },
                },
                inherit: 'yinliu',
            }),
            xianzhi: new toSkill('mark', {
                marktext: "断",
                intro: {
                    name: '断臂',
                    content(storage, player, skill) {
                        return `只能使用花色为${get.$t(storage)}的牌`;
                    },
                },
                onremove: true,
                mod: {
                    cardEnabled(card, player, now) {
                        if (get.suit(card) != player.$.tiantangzhifei_xianzhi) return false;

                    },
                },
            }, 'mark', 'locked'),
        }
    },
    haoren: {
        audio: true,
        skillAnimation: true,
        animationStr: '好人一生',
        unique: true,
        juexingji: true,
        forced: true,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        marktext: "井",
        intro: {
            name: '挖井人',
            content(storage, player, skill) {
                return `已发动了${storage}次『天扉』`;
            },
        },
        trigger: { player: 'tiantangAfter' },
        filter(Evt, player) {
            return player.$.haoren > game.countPlayer();
        },
        content() {
            player.loseMaxHp();
            player.$.haoren = true;
            player.awakenSkill('haoren');
            player.unmarkSkill('haoren');
        },
        ai: {
            combo: 'tiantang',
        },
    },
    //ggl
    shengya: new toSkill('trigger', {
        audio: 4,
        trigger: { player: 'useCardAfter' },
        priority: 996,
        forced: true,
        filter(Evt, player) {
            return !player.hasSkill('shengya_lost') && player.isPhaseUsing() && get.color(Evt.card) == 'red';
        },
        content: [() => {
            Evt.cards = get.cards(1);
            game.cardsGotoOrdering(Evt.cards);
            player.showCards(Evt.cards);
            game.delay(1);
            player.gain(Evt.cards);
        }, () => {
            if (get.suit(Evt.cards[0]) === 'club') {
                player.loseHp();
                player.addTempSkill('shengya_lost');
            }
        }],
        subSkill: {
            lost: {
                mark: true,
                marktext: "卒",
                intro: {
                    name: '职业生涯结束',
                    content(storage, player, skill) {
                        return '『职业生涯』失效直到下个回合开始';
                    },
                },
            }
        }
    }).setI(true),
    liangshan: {
        trigger: { global: 'drawEnd' },
        priority: 996,
        filter(Evt, player) {
            return Evt.player != player && player == _status.currentPhase && Evt.player.getHistory('gain').length == 1;
        },
        content() {
            let cards = get.cards();
            game.log(player, '将', cards, '置于武将牌上');
            player.addToExpansion(cards, 'draw').gaintag.add('liangshan_mark');
            game.delayx(2);
        },
        group: ['liangshan_mark', 'liangshan_use', 'liangshan_save'],
        subSkill: {
            mark: new toSkill('mark', {
                marktext: "汉",
                intro: {
                    name: '好汉歌',
                    content: 'expansion',
                    markcount: 'expansion',
                },
                onremove: function (player, skill) {
                    let cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            }, 'locked'),
            use: {
                trigger: { global: 'phaseBegin' },
                priority: 996,
                filter(Evt, player) {
                    return player.getExpansions('liangshan_mark').length;
                },
                check(Evt, player) {
                    if (player.hasUnknown(1)) return false;
                    return get.$a(player, Evt.player) > 0;
                },
                prompt2: '一名角色回合开始时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
                content: [() => {
                    player.chooseCardButton('交给其一张你武将牌上的牌', player.getExpansions('liangshan_mark'));
                }, () => {
                    if (result.bool) {
                        let cards = result.links.slice(0);
                        player.gain(cards, player, 'give', 'log', 'fromStorage');
                        trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
                    }
                }]
            },
            save: {
                trigger: { global: 'dying' },
                priority: 996,
                filter(Evt, player) {
                    return Evt.player.hp <= 0 && player.getExpansions('liangshan_mark').length;
                },
                check(Evt, player) {
                    return get.$a(player, Evt.player) > 0;
                },
                prompt2: '一名角色濒死时，你可以交给其一张你武将牌上的牌，视为其使用了一张【酒】。',
                content: [() => {
                    player.chooseCardButton('交给其一张你武将牌上的一张牌', player.getExpansions('liangshan_mark'));
                }, () => {
                    if (result.bool) {
                        let cards = result.links.slice(0);
                        player.gain(cards, player, 'give', 'log', 'fromStorage');
                        trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
                    }
                }]
            }
        },
    },
    chongshi: {
        trigger: { player: 'shaBegin' },
        priority: 996,
        frequent: true,
        content() {
            game.asyncDraw([player, trigger.target]);
        }
    },
    //miu
    guanzhai: {
        audio: 5,
        trigger: { global: 'phaseEnd' },
        priority: 997,
        prompt2(Evt, player) {
            let target = Evt.player;
            return `可以观看其手牌，并获得其中至多${target.hasSkill('zhai') ? target.countMark('zhai') + 1 : 1}张牌`;
        },
        logTarget: 'player',
        filter(Evt, player) {
            let num = Evt.player.countUsed(null, true);
            return Evt.player != player && Evt.player.countCards('h') && num < (Evt.player.hasSkill('zhai') ? Evt.player.countMark('zhai') + 2 : 2);
        },
        content: [() => {
            let str = `###『观宅』###获得其中至多${trigger.player.hasSkill('zhai') ? trigger.player.countMark('zhai') + 1 : 1}张牌`;
            player.choosePlayerCard(trigger.player,
                [1, (trigger.player.hasSkill('zhai') ? trigger.player.countMark('zhai') + 1 : 1)], 'h')
                .set('visible', true)
                .set('prompt', str);
        }, () => {
            if (result.bool) {
                player.logSkill('guanzhai', trigger.player, true, true, false);
                player.gain(result.cards, trigger.player, 'giveAuto');
            }
        }],
    },
    zhai: new toSkill('mark', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        marktext: '宅',
        intro: {
            name: '直往欲女',
            name2: '观宅',
            content(storage, player, skill) {
                return `下个回合中，『观宅』（）内的数值+${storage}。`;
            },
        },
    }, 'mark', 'onremove'),
    zhishu: {
        audio: 3,
        trigger: { player: ['phaseUseBegin', 'changeHp'] },
        direct: true,
        filter(Evt, player) {
            return player.countCards('h');
        },
        content: [() => {
            let next = player.chooseCardTarget().set('prompt', get.$pro2('zhishu'))
                .set('filterTarget', function (card, player, target) {
                    return target != player;
                })
                .set('ai2', function (target) {
                    let player = _status.event.player;
                    return 7 - get.$a(player, target);
                });
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('zhishu', Evt.target);
                player.showCards(result.cards, '『直抒』展示手牌');
                game.delayx();
                Evt.target.chooseCard('he', `是否交给${get.$t(player)}一张花色为${get.$t(get.suit(result.cards[0]))}的牌？`, function (card, player) {
                    return get.suit(card) == _status.event.suit;
                }).set('suit', get.suit(result.cards[0]))
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.bool) {
                player.gain(result.cards[0], Evt.target, 'giveAuto');
            } else {
                Evt.target.addTempSkill('zhai', { player: 'phaseAfter' });
                Evt.target.addMark('zhai', 1);
                game.log(Evt.target, '拒绝交给', player, '相同花色的牌');
            }
        }],
        ai: {
            combo: 'guanzhai',
        },
    },
    //oto
    yuxia: {
        audio: 4,
        hiddenCard(player, name) {
            if (!lib.skill.yuxia.filter(false, player)) return false;
            let list = get.inpile('trick');
            return list.some(i => i === name);
        },
        enable: 'chooseToUse',
        filter(Evt, player) {
            return player.countCards('he') >= 3;
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = get.inpile('trick');
                for (let i = 0; i < list.length; i++) {
                    list[i] = ['锦囊', '', list[i]];
                }
                return ui.create.dialog('『玉匣』', [list, 'vcard']);
            },
            filter(button, player) {
                return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
            },
            check(button) {
                let player = _status.event.player;
                if (player.countCards('h', button.link[2]) > 0) return 0;
                if (['wugu', 'jingluo'].includes(button.link[2])) return 0;
                let effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup(links, player) {
                return {
                    audio: 'yuxia',
                    filterCard(card) {
                        return true;
                    },
                    selectCard: 3,
                    forceAuto() {
                        return ui.selected.cards.length == 3;
                    },
                    popname: true,
                    check(card) {
                        return 7 - get.value(card);
                    },
                    position: 'hes',
                    viewAs: { name: links[0][2], nature: links[0][3] },
                }
            },
            prompt(links, player) {
                return `###『玉匣』###将三张牌当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
            }
        },
        ai: {
            order: 6,
            result: {
                player(player) {
                    let players = game.filterPlayer();
                    for (let i = 0; i < players.length; i++) {
                        if (players[i] != player && get.$a(player, players[i]) > 0) {
                            return 0.5;
                        }
                    }
                    return 0;
                }
            },
        },
        group: 'yuxia_after',
        subSkill: {
            after: {
                trigger: { player: 'useCardEnd' },
                priority: 66,
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    return Evt.cards.length == 3 && Evt.skill == 'yuxia_backup' && Evt.cards.filterInD().length;
                },
                content: [() => {
                    Evt.cards = trigger.cards.filterInD();
                    player.chooseToMove('『玉匣』：将其中任意张置于牌堆顶', true)
                        .set('list', [
                            ['牌堆顶'],
                            ['弃牌堆', Evt.cards],
                        ])
                        .set('reverse', ((_status.currentPhase && _status.currentPhase.next) ? get.attitude(player, _status.currentPhase.next) > 0 : false))
                        .set('processAI', function (list) {
                            let cards = list[1][1].slice(0);
                            cards.sort(function (a, b) {
                                return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                            });
                            return [cards];
                        })
                }, () => {
                    let tops
                    if (result.bool && result.moved && result.moved[0].length) tops = result.moved[0].slice(0);
                    if (tops) {
                        Evt.cards.removeArray(tops);
                    }
                    game.log(player, `将${get.cnNumber(tops.length)}张牌放在牌堆顶`)
                    while (tops.length) {
                        let card = tops.pop();
                        if (get.position(card, true) == 'o') {
                            card.fix();
                            ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        }
                    }
                    if (Evt.cards.length) {
                        game.cardsDiscard(Evt.cards);
                        game.log(Evt.cards, '进入了弃牌堆')
                    }
                    game.updateRoundNumber();
                    game.delayx();
                }]
            }
        },
    },
    lianjue: {
        init(player, skill) {
            player.$[skill] = [];
        },
        marktext: '崛',
        intro: {
            content: 'cards',
            name: '以『连崛』使用过的锦囊牌',
        },
        trigger: { player: 'phaseEnd' },
        priority: 66,
        frequent: true,
        prompt2: '你可以选择一项：令至多三名角色各摸一张牌；或视为使用一张未以此法使用过的通常锦囊牌。',
        filter(Evt, player) {
            return /*(player.$.lianjue-player.countCards('h'))&&*/(Math.abs(player.$.lianjue_start - player.countCards('h')) % 3 == 0);
        },
        content: [() => {
            player.chooseControlList(['令至多三名角色各摸一张牌', '视为使用一张未以此使用过的通常锦囊牌'], function () {
                return 1;
            });
        }, () => {
            switch (result.index) {
                case 0: {
                    player.chooseTarget([1, 3], '令至多三名角色各摸一张牌').set('ai', function (target) {
                        let att = get.$a(_status.event.player, target);
                        if (att > 1) {
                            return att;
                        }
                        return 0;
                    });
                    Evt.goto(2);
                    break;
                }
                case 1: {
                    Evt.videoId = lib.status.videoId++;
                    let list = [];
                    for (let i = 0; i < lib.inpile.length; i++) {
                        let name = lib.inpile[i];
                        let reapeat = 0;
                        if (player.$.lianjue.length) {
                            player.$.lianjue.forEach(function (his) {
                                if (get.name(his) == name) reapeat++;
                            });
                        }
                        if (reapeat || name == 'wuxie' || name == 'jinchan') continue;
                        else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                    }
                    game.broadcastAll(function (id, list) {
                        let dialog = ui.create.dialog('使用一张未以此使用过的通常锦囊牌', [list, 'vcard']);
                        dialog.videoId = id;
                    }, Evt.videoId, list);
                    Evt.goto(3);
                    break;
                }
            }
        }, () => {
            if (result.targets?.length) {
                game.asyncDraw(result.targets);
            }
            Evt.finish();
        }, () => {
            let next = player.chooseButton(1)
                .set('dialog', Evt.videoId)
                .set('ai', function (button) {
                    return player.getUseValue({ name: button.link[2], isCard: true });
                });
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                let card = result.links[0];
                player.chooseUseTarget({ name: card[2] }, true);
                player.$.lianjue.add(game.createCard(card[2]));
                player.syncStorage('lianjue');
                player.markSkill('lianjue');
            }
        }],
        group: ['lianjue_start'],
        subSkill: {
            start: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = 0;
                },
                trigger: { player: 'phaseBefore' },
                firstDo: true,
                forced: true,
                silent: true,
                popup: false,
                priority: 66,
                content() {
                    player.$.lianjue_start = player.countCards('h');
                },
            },
        },
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase && !player.needsToDiscard() && Math.abs(player.$.lianjue_start - player.countCards('h')) % 3 == 0) {
                    return num - 10;
                }
            },
        },
    },
    changxiang: {
        zhuSkill: true,
        trigger: { global: 'dying' },
        priority: 66,
        filter(Evt, player) {
            if (!player.hasZhuSkill('changxiang')) return false;
            return Evt.player.hp <= 0 && Evt.player != player && Evt.player.group == player.group && player.countCards('he') >= player.hp;
        },
        content: [() => {
            player.chooseToDiscard(player.hp);
        }, () => {
            if (result.bool)
                player.useCard({ name: 'tao' }, trigger.player);
        }]
    },
    //团长
    xhhuanshi: new toSkill('mark', {
        intro: {
            name: '幻士',
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked'),
    huange: new toSkill('trigger', {
        trigger: { global: 'phaseBegin' },
        round: 1,
        priority: 996,
        filter(Evt, player) {
            return game.countPlayer(cur => cur.hp > 0 && cur.hp !== Infinity);
        },
        check(Evt, player) {
            if (Evt.player != player && get.$a(player, Evt.player) < 0 && Evt.player.inRange(player)) return true;
            return Evt.player == player && game.roundNumber > 1 && player.hasUseTarget('sha') && !player.needsToDiscard();
        },
        popup: false,
        content: [() => {
            player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌', true, function (card, player, target) {
                return target.hp > 0 && target.hp !== Infinity;
            })
                .set('ai', function (target) {
                    let player = _status.event.player
                    let num = target.hp
                    if (player.awakenedSkills.includes('qishi')) num += target.hp
                    if (player.inRange(target)) return num - get.$a(player, target);
                    else return num - (get.$a(player, target) / 2);
                })
        }, () => {
            if (result.bool && result.targets?.length) {
                player.logSkill('huange', result.targets);
                player.draw(result.targets[0].hp);
                player.$.huange_disc = result.targets[0];
                player.markSkill('huange_disc');
                player.addTempSkill('huange_disc');
            }
        }],
        subSkill: {
            disc: new toSkill('mark', {
                mark: 'character',
                intro: {
                    name: '幻歌',
                    content: '回合结束时弃置$体力值的牌',
                },
                trigger: { global: 'phaseEnd' },
                priority: 996,
                filter(Evt, player) {
                    return player.countDiscardableCards(player, 'he');
                },
                content: [() => {
                    if (player.$.huange_disc.isIn() && player.$.huange_disc.hp > 0 && player.countCards('he')) {
                        if (player.awakenedSkills.includes('qishi')) {
                            let prompt2 = `将${get.cnNumber(player.$.huange_disc.hp)}张牌置于武将牌上`;
                            player.chooseCard('he', `###『幻歌』###${prompt2}`, player.$.huange_disc.hp, true)
                                .set('ai', card => get.unuseful2(card));
                        }
                        else {
                            let prompt2 = `弃置${get.cnNumber(player.$.huange_disc.hp)}张牌`;
                            player.chooseToDiscard('he', `###『幻歌』###${prompt2}`, player.$.huange_disc.hp, true)
                        }
                    } else {
                        Evt.goto(2);
                    }
                }, () => {
                    if (result.bool) {
                        if (player.awakenedSkills.includes('qishi')) {
                            Evt.cards = result.cards.slice(0);
                            player.addToExpansion(Evt.cards, 'give', player).gaintag.add('xhhuanshi')
                        }
                    }
                }, () => {
                    player.removeSkill('huange_disc');
                }],
            }, 'onremove', 'forced')
        },
    }),
    qishi: new toSkill('trigger', {
        audio: true,
        skillAnimation: true,
        animationStr: '希望之花',
        firstDo: true,
        priority: 996,
        filter(Evt, player) {
            return player.$.qishi_date && player.$.qishi_date.wounded && player.$.qishi_date.hurt;
        },
        content: [() => {
            player.unmarkSkill('qishi_date');
            delete player.$.qishi_date
            player.loseMaxHp();
            Evt.cards = [];
        }, () => {
            player.judge(card => {
                if (get.color(card) == 'black') return -1.5;
                return 1.5;
            })
                .set('callback', function () {
                    Evt.getParent().orderingCards.remove(card);
                });
        }, () => {
            if (result.bool) {
                Evt.cards.push(result.card);
                Evt.goto(1);
            } else {
                Evt.cards.push(result.card);
            }
        }, () => {
            for (let i = 0; i < Evt.cards.length; i++) {
                if (get.position(Evt.cards[i], true) != 'o') {
                    Evt.cards.splice(i, 1);
                    i--;
                }
            }
            if (Evt.cards.length) {
                player.addToExpansion(Evt.cards, 'gain2').gaintag.add('xhhuanshi')
            }
        }, () => {
            player.$.qishi = true;
            player.awakenSkill('qishi');
            player.addSkill('xiban');
        }],
        derivation: 'xiban',
        group: ['qishi_date', 'qishi_update'],
        subSkill: {
            date: new toSkill('mark', {
                intro: {
                    name: '奇誓',
                    content(storage, player, skill) {
                        let str = '本轮内';
                        if (storage.wounded) str += ' 已受到伤害';
                        if (storage.hurt) str += ' 已造成伤害';
                        return str;
                    },
                },
                trigger: { player: 'damageEnd', source: 'damageEnd' },
                priority: 996,
                filter(Evt, player) {
                    if (player.$.qishi === true) return false;
                    if (!player.$.qishi_date) return true
                    if (player.$.qishi_date.wounded && player.$.qishi_date.hurt) return false;
                    return true;
                },
                content() {
                    if (!player.$.qishi_date) player.$.qishi_date = {};
                    if (trigger.player === player) {
                        player.$.qishi_date.wounded = true
                    }
                    if (trigger.source === player) {
                        player.$.qishi_date.hurt = true
                    }
                    player.markSkill('qishi_date');
                },
            }, 'direct', 'firstDo', 'onremove'),
            update: new toSkill('rule', {
                trigger: { global: 'roundStart' },
                lastDo: true,
                priority: 996,
                direct: true,
                filter(Evt, player) {
                    if (player.$.qishi === true) return false;
                    return true;
                },
                content() {
                    player.unmarkSkill('qishi_date');
                    delete player.$.qishi_date
                }
            }),
        },
        ai: {
            combo: 'huange',
        },
    }, 'forced', 'unique', 'juexingji').setT({ global: 'roundEnd' }),
    xiban: new toSkill('trigger', {
        priority: 99,
        filter(Evt, player) {
            return Evt.player != player && Evt.player.getHistory('sourceDamage').length && player.hp <= player.getExpansions('xhhuanshi').length;
        },
        check(Evt, player) {
            return player.isDamaged() || get.$a(player, Evt.player) < 0;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            player.chooseCardButton(`###『系绊』###可以弃置${get.cnNumber(player.hp)}张「士」 对${get.$t(Evt.target)}发动技能`, player.hp, player.getExpansions('xhhuanshi'));
        }, () => {
            if (result.bool) {
                Evt.cards = result.links.slice(0);
                player.discard(Evt.cards);
            } else Evt.finish();
        }, () => {
            let next = Evt.target.chooseToDiscard('he', Evt.cards.length);
            if (player.isHealthy()) {
                next.set('forced', true);
            } else {
                next.set('prompt2', `取消则令${get.$t(player)}回复一点体力`)
            }
            next.set('source', player)
                .set('ai', card => {
                    let source = _status.event.source;
                    let player = _status.event.player;
                    if (source.isDamaged() && get.recoverEffect(source, player, player) >= 0) return -1;
                    return 7 - get.value(card);
                });
        }, () => {
            if (!result.bool) {
                player.recover(Evt.target);
            }
        }],
        ai: {
            combo: 'huange',
        },
    }, 'frequent').setT({ global: 'phaseEnd' }),
    yongtuan: new toSkill('trigger', {
        audio: true,
        skillAnimation: true,
        animationStr: '一袋米要扛几楼',
        round: 2,
        trigger: { player: 'discardEnd' },
        priority: 66,
        filter(Evt, player) {
            if (!player.hasZhuSkill('yongtuan')) return false;
            return player.hasHistory('lose', evt => {
                if (evt.getParent() != Evt || !evt.xs.length) return false;
                for (let i in evt.gaintag_map) {
                    if (evt.gaintag_map[i].includes('xhhuanshi')) return true;
                }
                return false;
            });
        },
        content: [() => {
            player.chooseTarget(true, function (card, player, tar) {
                return tar.group == player.group;
            })
                .set('ai', (target) => get.$a2(target));
        }, () => {
            if (result.bool) {
                Evt.tar = result.targets[0]
                Evt.cards = []
                player.getHistory('lose', evt => {
                    if (evt.getParent() != trigger || !evt.xs.length) return false;
                    Evt.cards.addArray(evt.xs)
                })
                player.line(Evt.tar)
                Evt.tar.gain(Evt.cards, 'draw', 'log');
            }
        }],
        ai: {
            combo: 'huange',
        },
    }, 'zhuSkill', 'unique'),

    //冷鸟
    niaoji: {
        audio: true,
        audioname: ['jike'],
        trigger: { source: 'damageEnd', player: 'damageEnd' },
        priority: 99,
        lastDo: true,
        check(Evt, player) {
            if (Evt.source && Evt.source == player) return get.$a(player, Evt.player) < 1;
            return true;
        },
        frequent: true,
        prompt(Evt, player) {
            if (Evt.source && Evt.source == player) return `对${get.$t(Evt.player)}造成伤害，${get.$pro('niaoji')}`;
            return `受到来自${get.$t(Evt.source)}的伤害，${get.$pro('niaoji')}`;
        },
        filter(Evt, player) {
            return Evt.source;
        },
        content: [() => {
            let func: (Object) => number
            Evt.target = (player == trigger.source) ? trigger.player : trigger.source;
            if (!Evt.target || !Evt.target.isIn() || Evt.target.countCards('he') <= 0) {
                func = function (result) {
                    if (get.suit(result) == 'spade') return 0;
                    if (get.suit(result) == 'heart') return 2;
                    return -1;
                };
            } else {
                func = function (result) {
                    if (get.suit(result) == 'spade') return 2;
                    if (get.suit(result) == 'heart') return 2;
                    return -1;
                };
            }
            player.judge(func);
        }, () => {
            if (result.bool) {
                Evt.num = player.getDamagedHp() + 1;
                if (result.suit == 'spade') {
                    if ([player.name, player.name1].includes('Yousa')) {
                        let audio = 'niaoji_spade' + Math.ceil(3 * Math.random());
                        game.playAudio('skill', audio);
                        game.broadcast(function (audio) {
                            game.playAudio('skill', audio);
                        }, audio);
                    }
                    player.discardPlayerCard(`###『鸟肌』###弃置${get.$t(Evt.target)}${get.cnNumber(Evt.num)}张牌`, Evt.target, Evt.num, true, 'he');
                } else if (result.suit == 'heart') {
                    if ([player.name, player.name1].includes('Yousa')) {
                        let audio = 'niaoji_heart' + Math.ceil(3 * Math.random());
                        game.playAudio('skill', audio);
                        game.broadcast(function (audio) {
                            game.playAudio('skill', audio);
                        }, audio);
                    }
                    player.draw(Evt.num);
                }
            }
        }],
    },
    ysxiangxing: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h') > 0;
        },
        filterTarget(card, player, target) {
            if (player.inRange(target)) return true;
        },
        filterCard: true,
        selectCard: -1,
        discard: false,
        content: [() => {
            player.chooseToMove('###『翔星』###按顺序将卡牌置于牌堆顶（靠前的在上）', true)
                .set('list', [
                    ['牌堆顶', Evt.cards],
                ])
                .set('reverse', get.attitude(player, target) > 0)
                .set('ai', function (list) {
                    function useful(card) {
                        if (get.suit(card) == 'heart') return 8 + Math.random();
                        if (get.suit(card) == 'spade') return (_status.event.reverse ? 1 : -1) * 6 + Math.random();
                        return 4 + Math.random();
                    }
                    let cards = list[0][1].slice(0);
                    cards.sort(function (a, b) {
                        return useful(b) - useful(a);
                    });
                    return [cards];
                })
        }, () => {
            let tops
            if (result.bool && result.moved && result.moved[0].length) {
                tops = result.moved[0].slice(0);
            } else {
                tops = Evt.cards;
            }
            while (tops.length) {
                ui.cardPile.insertBefore(tops.pop(), ui.cardPile.firstChild);
            }
            game.updateRoundNumber();
        }, () => {
            target.damage('nocard');
        }],
        ai: {
            damage: true,
            order(item, player) {
                if (player.countCards('h', { suit: 'heart' })) return 4;
                else return 1;
            },
            result: {
                player(player, target) {
                    let num = -player.countCards('h');
                    if (player.countCards('h', { suit: 'heart' })) num += (player.getDamagedHp() + 1);
                    return num;
                },
                target(player, target) {
                    if (target.hasSkill('shenyou')) return 0;
                    return get.damageEffect(target, player, target);
                }
            },
            expose: 0.2,
        },
    },
    //hanser
    naiwei: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return true;
        },
        filterTarget(card, player, target) {
            if (target.isMinHp() || target.isMaxHp()) return true;
        },
        content: [() => {
            Evt.map = ['recover', 'loseHp'];
            if (target.isMinHp() && target.isMaxHp()) {
                player.chooseControl('recover_hp', 'lose_hp', function () {
                    if (_status.event.check) return 0;
                    return 1;
                }).set('prompt', '令目标执行：').set('check', get.recoverEffect(target, player, player) > 0);
            } else {
                Evt.type = target.isMinHp() ? 0 : 1;
                Evt.goto(2)
            }
        }, () => {
            Evt.type = result.control == 'recover_hp' ? 0 : 1;
        }, () => {
            target[Evt.map[Evt.type]]();
        }, () => {
            if (Evt.type) {
                if (game.countPlayer(cur => {
                    return cur.isMinHp;
                }) < 2) return;
            } else {
                if (game.countPlayer(cur => {
                    return cur.isMaxHp;
                }) < 2) return;
            }
            player.chooseTarget(function (card, player, target) {
                let change = _status.event.change;
                if (change == 'recover') return target.isMaxHp();
                return target.isMinHp();
            }, function (target) {
                let player = _status.event.player;
                let change = _status.event.change;
                if (change == 'recover') return 1 - get.$a(player, target);
                return get.recoverEffect(target, player, player);
            }).set('prompt', '###『奶味天使』###可以执行另一项').set('change', Evt.map[Evt.type]);
        }, () => {
            if (result.bool && result.targets?.length) {
                player.line(result.targets);
                result.targets[0][Evt.map.reverse()[Evt.type]]();
            }
        }],
        ai: {
            order: 6,
            result: {
                target(player, target) {
                    let eff0 = get.recoverEffect(target, player, target);
                    let eff1 = -2;
                    if (target.isMinHp() && target.isMaxHp()) {
                        if (get.$a(player, target) > 0) return Math.max(eff0, eff1);
                        return Math.min(eff0, eff1);
                    }
                    if (target.isMinHp()) return eff0;
                    return eff1;
                }
            },
            expose: 0.2,
        },
    },
    cishan: {
        trigger: { player: 'phaseDrawBegin1' },
        filter(Evt, player) {
            return !Evt.numFixed && player.countCards('h') > 0;
        },
        check(Evt, player) {
            return player.countCards('h') >= 4;
        },
        content: [() => {
            trigger.changeToZero();
        }, () => {
            player.draw(player.countCards('h'));
            Evt.targets = game.filterPlayer().sortBySeat(player);
        }, () => {
            Evt.target = Evt.targets.shift();
            if (Evt.target.canCompare(player)) {
                Evt.target.chooseBool(`###是否与${get.$t(player)}拼点？###若赢可以获得${get.$t(player)}的一张牌`).set('ai', function () {
                    if (!_status.event.check) return 0;
                    return 1;
                }).set('check', get.$a(Evt.target, player) < 0);
            } else Evt.goto(5);
        }, () => {
            if (result.bool) {
                Evt.target.line(player);
                Evt.target.chooseToCompare(player);
            } else Evt.goto(5);
        }, () => {
            if (result.bool) {
                if (player.countGainableCards(Evt.target, 'he')) {
                    Evt.target.gainPlayerCard(player, true, 'he');
                }
            }
        }, () => {
            if (Evt.targets.length) Evt.goto(2);
        }],
    },

    //mishiro
    yi: new toSkill('mark', {
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked'),
    tianyi: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return !player.getEquip(2);
        },
        filterCard: true,
        check(card) {
            return 7 - get.value(card);
        },
        discard: false,
        lose: false,
        content: [() => {
            player.addToExpansion(cards, 'give', player).gaintag.add('yi');
        }],
        group: ['tianyi_drawBy', 'tianyi_cancelBy', 'tianyi_moveCard'],
        subSkill: {
            drawBy: new toSkill('trigger', {
                trigger: { player: 'useCard', target: 'useCardToTarget' },
                priority: 77,
                lastDo: true,
                filter(Evt, player) {
                    if (get.type2(Evt.card) != 'trick') return false;
                    return player.getExpansions('yi').length && !get.suit3(player.getExpansions('yi')).includes(get.suit(Evt.card));
                },
                content: [() => {
                    player.draw();
                    player.addTempSkill('tianyi_drawed')
                }, () => {
                    if (player.hasSkill('tianyi_drawed') && player.hasSkill('tianyi_canceled')) {
                        player.discard(player.getExpansions('yi'));
                    }
                }]
            }, 'forced'),
            drawed: new toSkill('rule'),
            cancelBy: new toSkill('trigger', {
                trigger: { target: 'useCardToTarget' },
                priority: 77,
                lastDo: true,
                check(Evt, player) {
                    return get.effect(player, Evt.card, Evt.player, player) < -1;
                },
                prompt(Evt) {
                    return `被${get.$t(Evt.card)}指定为目标，${get.$pro('tianyi')}`;
                },
                filter(Evt, player) {
                    if (get.type2(Evt.card) != 'trick') return false;
                    return player.getExpansions('yi').length && get.suit3(player.getExpansions('yi')).includes(get.suit(Evt.card));
                },
                content: [() => {
                    trigger.getParent().cancel();
                }, () => {
                    player.gain(trigger.getParent().cards, 'gain2', 'log');
                    player.addTempSkill('tianyi_canceled')
                }, () => {
                    if (player.hasSkill('tianyi_drawed') && player.hasSkill('tianyi_canceled')) {
                        player.discard(player.getExpansions('yi'));
                    }
                }]
            }),
            canceled: new toSkill('rule'),
            moveCard: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.getExpansions('yi').length
                },
                content: [() => {
                    player.discard(player.getExpansions('yi'));
                }, () => {
                    if (Evt.moveCard == true) {
                        player.moveCard(`###${get.$pro('tianyi')}###可以移动场上的一张牌`);
                    }
                }]
            }, 'forced', 'firstDo').setT('phaseZhunbeiBegin'),
        },
        ai: { order: 2, result: { player: 1 } },
    }),
    nveyu: new toSkill('trigger', {
        trigger: { source: 'damageEnd' },
        priority: 77,
        usable: 1,
        lastDo: true,
        forced: true,
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            trigger.player.recover();
        }, () => {
            game.asyncDraw([player, trigger.player]);
        }, () => {
            player.$.nveyu_eff = trigger.player;
            player.addTempSkill('nveyu_eff');
        }],
        subSkill: {
            eff: {
                mark: 'character',
                intro: {
                    name: '虐语',
                    content: '对$使用牌无距离与次数限制',
                },
                mod: {
                    targetInRange(card, player, target) {
                        if (target == player.$.nveyu_eff) return true;
                    },
                    cardUsableTarget(card, player, target) {
                        if (player.$.nveyu_eff == target) return true;
                    },
                },
                onremove: true,
            }
        },
        ai: {
            effect: {
                player(card, player, target, current) {
                    if (get.tag(card, 'damage') == 1 && !target) console.warn(card, target)
                    if (target) {
                        if (get.tag(card, 'damage') == 1 && !player.hasSkill('nveyu_eff') && !target.hujia && target.hp > 1) {
                            if (target.hasSkillTag('maixie')) return [1, 1, 0, 3];
                            return [1, 1, 0, 1];
                        }
                    }
                }
            }
        }
    }),
    //tm
    gonggan: {
        trigger: { global: 'phaseBegin' },
        priority: 23,
        direct: true,
        filter(Evt, player) {
            return Evt.player != player && player.countCards('h') > 0;
        },
        content: [() => {
            player.chooseCard('h', get.$pro2('gonggan')).set('ai', card => {
                if (get.number(card) > 10) return 8 - get.value(card) + Math.random();
                if (player.countCards('h') >= 3) return 5 - get.value(card) + Math.random();
                if (player.countCards('h') == 1) return -get.value(card) + Math.random();
                return 2 - get.value(card) + Math.random();
            });
        }, () => {
            if (result.bool) {
                player.logSkill('gonggan', trigger.player);
                Evt.card = result.cards[0];
                player.showHandcards('『奇癖共感』展示手牌');
                game.delay(1);
            } else {
                Evt.finish();
            }
        }, () => {
            let suitlist = [
                ['heart', '', 'heart', 'heart', 'div2'],
                ['diamond', '', 'diamond', 'diamond', 'div2'],
                ['club', '', 'club', 'club', 'div2'],
                ['spade', '', 'spade', 'spade', 'div2']
            ];
            game.broadcastAll(function (id, suitlist) {
                let dialog = ui.create.dialog('奇癖共感 声明');
                dialog.addText('花色');
                dialog.add([suitlist, 'vcard']);
                dialog.videoId = id;
            }, Evt.videoId, suitlist);
        }, () => {
            let next = trigger.player.chooseButton(1, true)
                .set('dialog', Evt.videoId)
                .set('ai', function (button) {
                    let num = 0
                    _status.event.cards.forEach(card => {
                        if (get.suit(card) == button.link[2]) num++;
                    })
                    return num + Math.random();
                })
                .set('cards', player.getCards('h'));
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                player.$.gonggan = result.links[0][2];
                trigger.player.chat(get.$t(player.$.gonggan));
                game.log(trigger.player, '猜测为', player.$.gonggan)
            } else {
                Evt.finish();
            }
        }, () => {
            if (player.$.gonggan == get.suit(Evt.card)) {
                trigger.player.gain(Evt.card, player, 'giveAuto');
                let suit = 'gonggan_' + get.suit(Evt.card);
                player.$.gonggan_num = get.number(Evt.card);
                player.addTempSkill(suit);
            } else {
                player.$.gonggan_num = 12;
            }
            lib.translate['gonggan_num_bg'] = player.$.gonggan_num;
            player.addTempSkill('gonggan_num');
        }],
        subSkill: {
            heart: {
                marktext: '♥',
                mark: true,
                locked: true,
                intro: {
                    name: '奇癖共感',
                    content: '手牌视为♥',
                },
                mod: {
                    suit(card, suit) {
                        if (suit != 'heart') return 'heart';
                    },
                }
            },
            spade: {
                marktext: '♠',
                mark: true,
                locked: true,
                intro: {
                    name: '奇癖共感',
                    content: '手牌视为♠',
                },
                mod: {
                    suit(card, suit) {
                        if (suit != 'spade') return 'spade';
                    },
                }
            },
            diamond: {
                marktext: '♦',
                mark: true,
                locked: true,
                intro: {
                    name: '奇癖共感',
                    content: '手牌视为♦',
                },
                mod: {
                    suit(card, suit) {
                        if (suit != 'diamond') return 'diamond';
                    },
                }
            },
            club: {
                marktext: '♣',
                mark: true,
                locked: true,
                intro: {
                    name: '奇癖共感',
                    content: '手牌视为♣',
                },
                mod: {
                    suit(card, suit) {
                        if (suit != 'club') return 'club';
                    },
                }
            },
            num: {
                mark: true,
                locked: true,
                intro: {
                    name: '奇癖共感',
                    content: '手牌视为#',
                },
                onremove: true,
                mod: {
                    number(card, player, number) {
                        return number = player.$.gonggan_num;
                    },
                },
            },
        },
    },
    yeyu: {
        group: ['yeyu_sha', 'yeyu_trick'],
        subSkill: {
            sha: {
                trigger: { global: 'useCard2' },
                priority: 23,
                popup: false,
                filter(Evt, player) {
                    if (Evt.player == player || get.name(Evt.card) != 'sha') return false;
                    return (get.name(Evt.card) == 'sha') && player.countDiscardableCards(player, 'he');
                },
                prompt2: '你可以弃置一张点数大于此【杀】的牌取消之',
                content: [() => {
                    let next = player.chooseToDiscard('he', '弃置一张点数大于此【杀】的牌取消之');
                    next.set('filterCard', function (card, player) {
                        return get.number(card, player) > _status.event.num;
                    });
                    next.set('num', get.number(trigger.card))
                }, () => {
                    if (result.bool) {
                        player.logSkill('yeyu', trigger.player);
                        trigger.cancel();
                    }
                }],
            },
            trick: {
                trigger: { global: 'useCard2' },
                priority: 23,
                popup: false,
                filter(Evt, player) {
                    let card = Evt.card;
                    let info = get.info(card);
                    if (info.allowMultiple == false) return false;
                    if (Evt.player == player || get.type(Evt.card) != 'trick') return false;
                    return Evt?.targets?.length && player.countCards('h', { suit: 'club' });
                },
                prompt2: '你可以重铸一张梅花牌为之增加或减少一名目标',
                content: [() => {
                    let next = player.chooseCard('he', '重铸一张梅花牌');
                    next.set('filterCard', function (card, player) {
                        return get.suit(card, player) == 'club';
                    });
                }, () => {
                    if (result.bool) {
                        player.logSkill('yeyu');
                        player.lose(result.cards, ui.discardPile).set('visible', true);
                        player.$throw(result.cards);
                        game.log(player, '将', result.cards, '置入了弃牌堆');
                        player.draw();
                        let prompt2 = `为${get.$t(trigger.card)}增加或减少一个目标`;
                        player.chooseTarget(get.$pro('yeyu'), true, function (card, player, target) {
                            let source = _status.event.source;
                            if (_status.event.targets.includes(target)) return true;
                            return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
                        }).set('prompt2', prompt2).set('ai', function (target) {
                            let player = _status.event.player, source = _status.event.source;
                            return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
                        }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
                    } else {
                        Evt.finish();
                    }
                }, () => {
                    if (!Evt.isMine()) game.delayx();
                    Evt.targets = result.targets;
                }, () => {
                    if (Evt.targets) {
                        player.logSkill('yeyu', Evt.targets);
                        if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                        else trigger.targets.addArray(Evt.targets);
                    }
                }],
            },
        },
    },
    //花那
    huawen: new toSkill('active', {
        audio: 2,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h') > 0;
        },
        filterTarget(card, player, target) {
            return target != player && target.countCards('h') > 0 && target.sex == 'female';
        },
        content: [() => {
            player.$.huawen.add(target);
            Evt.list1 = player.getCards('h');
            Evt.list2 = target.getCards('h');
            game.broadcastAll(function (id, list1, list2, player, target) {
                let dialog = ui.create.dialog('『花吻交染』交换花色、点数、种类相同的牌各一张');
                dialog.addText(`${get.$t(player)}的手牌`);
                dialog.add([list1, 'card']);
                dialog.addText(`${get.$t(target)}的手牌`);
                dialog.add([list2, 'card']);
                dialog.videoId = id;
            }, Evt.videoId, Evt.list1, Evt.list2, player, target);
            game.delay(1);
        }, () => {
            let next = player.chooseButton(true).set('target', target).set('list1', Evt.list1).set('list2', Evt.list2)
                .set('dialog', Evt.videoId)
                .set('selectButton', function () {
                    if (ui.selected.buttons.length % 2 == 1) {
                        return [ui.selected.buttons.length + 1, ui.selected.buttons.length + 1];
                    }
                    return [0, 6];
                })
                .set('filterButton', function (button) {
                    let now = button.link;
                    let links = ui.selected.buttons.map(function (button) {
                        return button.link;
                    })
                    return _status.event.process(links, now);
                })
                .set('switchToAuto', function () {
                    _status.event.result = 'ai';
                }).set('processAI', function () {
                    let player = _status.event.player;
                    let target = _status.event.target;
                    let list1 = _status.event.list1.slice(0);
                    let list2 = _status.event.list2.slice(0);
                    let cards = list1.concat(list2);
                    let links = [];
                    if (get.$a(player, target) < 0) {
                        let saves = list2.filter(card => ['tao', 'jiu', 'zong'].includes(get.name(card)))
                        if (target.hp == 1 || player.hp == 1 || saves.length) {
                            let dones = [];
                            saves.forEach(function (save) {
                                list1.forEach(card => {
                                    if (_status.event.process([save], card)) {
                                        dones.add(save);
                                        dones.add(card);
                                    }
                                })
                            })
                            links.addArray(dones.splice(0, 2));
                        }
                    } else {
                        let dones = [];
                        for (let i = 0; i < list1.length; i++) {
                            let done = [list1[i]];
                            let choices = cards.slice(0).remove(list1[i]);
                            for (let j = 0; j < choices.length; j++) {
                                if (done.length == 6) break;
                                if (_status.event.process(done, choices[j])) {
                                    done.push(choices[j]);
                                    choices.remove(choices[j]);
                                    j = 0;
                                }
                            }
                            if (done.length % 2 == 1) done.pop();
                            dones.push(done);
                        }
                        if (dones.length > 0) {
                            dones.sort(function (a, b) {
                                return b.length - a.length;
                            });
                            links.addArray(dones[0]);
                        }
                    }
                    return {
                        bool: true,
                        links: links,
                    }
                })
                .set('process', function (selected, now) {
                    let last = selected.slice(0);
                    let over = {
                        type2: 0,
                        suit: 0,
                        number: 0
                    };
                    let going = [];
                    let overOne = 0;
                    let pack = 0;
                    if (last.length % 2 == 1) {
                        pack = selected[selected.length - 1];
                    }
                    for (let i = 0; i < last.length; i += 2) {
                        if (!last[i + 1]) continue;
                        let go = [];
                        for (let j in over) {
                            if (get[j](last[i]) == get[j](last[i + 1])) {
                                go.add(j);
                            }
                        }
                        if (!go.length) continue;
                        for (let j = 0; j < go.length; j++) {
                            going.add(go[j]);
                            over[go[j]] += (1 / go.length);
                        }
                    }
                    let list1 = _status.event.list1;
                    let list2 = _status.event.list2;
                    for (let j in over) {
                        overOne = Math.max(over[j] - 1, overOne);
                    }
                    if (!pack) {
                        if (list1.includes(now)) {
                            for (let i = 0; i < list2.length; i++) {
                                for (let j in over) {
                                    if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
                                    if (get[j](list2[i]) == get[j](now)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        if (list2.includes(now)) {
                            for (let i = 0; i < list1.length; i++) {
                                for (let j in over) {
                                    if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
                                    if (get[j](list1[i]) == get[j](now)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    } else {
                        if (list1.includes(pack)) {
                            if (!list2.includes(now)) return false;
                            for (let j in over) {
                                if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
                                if (get[j](pack) == get[j](now)) {
                                    return true;
                                }
                            }
                        }
                        if (list2.includes(pack)) {
                            if (!list1.includes(now)) return false;
                            for (let j in over) {
                                if (over[j] + overOne >= 1 || (going.includes(j) && going.length * 2 <= last.length)) continue;
                                if (get[j](pack) == get[j](now)) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                });
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool && result.links) {
                let cards1 = result.links.slice(0), cards2 = result.links.slice(0);
                cards1 = cards1.filter(card => Evt.list1.includes(card))
                cards2 = cards2.filter(card => Evt.list2.includes(card))
                if (cards1.length && cards2.length && cards1.length == cards2.length) {
                    Evt.num = cards1.length;
                    player.gain(cards2, target, 'giveAuto').set('visible', true);
                    target.gain(cards1, player, 'giveAuto').set('visible', true);
                    game.asyncDraw([player, target], Evt.num)
                }
                if (!Evt.num || Evt.num < 3) {
                    player.loseHp();
                    target.loseHp();
                }
            } else {
                Evt.finish();
            }
        }],
        group: 'huawen_clear',
        ai: {
            order: 8.5,
            result: {
                target(player, target) {
                    if (target.countCards('h') >= 3) {
                        return 2;
                    } else if (target.countCards('h') >= 1) {
                        return 0;
                    } else if (target.hp == 1) {
                        return -2;
                    } else {
                        return -1;
                    }
                },
                player(player, target) {
                    if (player.countCards('h') >= 3) {
                        return 2;
                    } else if (player.countCards('h') >= 1) {
                        return 0;
                    } else if (player.hp == 1) {
                        return -1;
                    } else {
                        return -0.5;
                    }
                },
            }
        },
        subSkill: {
            clear: new toSkill('rule', {
                priority: 23,
                popup: false,
                content() {
                    if (player.storage?.huawen?.length) {
                        player.$.huawen.length = 0;
                    }
                }
            }, 'forced', 'silent').setT({ global: 'phaseAfter' })
        },
    }),
    liaohu: new toSkill('trigger', {
        audio: 2,
        filter(Evt, player) {
            return player.getStat('damage');
        },
        check(Evt, player) {
            return get.recoverEffect((player.$.huawen?.length ? player.$.huawen[0] : player), player, player) > 0;
        },
        content() {
            if (player.getStat().skill.huawen != undefined) {
                if (player.storage?.huawen?.length) {
                    player.$.huawen[0].recover();
                }
            } else {
                player.recover();
            }
        },
        ai: {
            combo: 'huawen'
        }
    }).setT({ global: 'phaseEnd' }),
    //elu
    huangran: new toSkill('trigger', {
        filter(Evt, player) {
            if (player.hasSkill('huangran_used')) return false
            return Evt.card.name === 'sha' && Evt.getParent().targets.length === 1
        },
        mod: {
            targetInRange(card, player, target) {
                if (!game.countPlayer(cur => cur.hasHistory('useCard', evt => evt.targets.includes(target)))) return true;
            },
        },
        logTarget: 'target',
        content: [() => {
            Evt.target = trigger.target
            Evt.cards = trigger.cards.slice(0)
            Evt.list = [
                '1.交给目标此【杀】，令你与其横置',
                `2.将此【杀】属性改为火焰，目标摸一张牌且不可响应`,
                `背水！本回合此技能失效，并依次执行上述所有选项`
            ];
            if (Evt.cards.length) {
                player.chooseControl('dialogcontrol', Evt.list, function () {
                    return _status.event.check;
                }).set('check', Evt.target.isLinked() && !trigger.card.nature ? 1 : 0).set('prompt', '『煌燃』请选择一项').set('addDialog', [trigger.cards]);
            } else {
                Evt._result = { control: Evt.list[1] };
            }
        }, () => {
            function choice1() {
                Evt.target.gain(Evt.cards, 'log', 'gain2');
                player.link(true)
                target.link(true)
            }
            function choice2() {
                trigger.card.nature = 'fire'
                Evt.target.draw()
                trigger.directHit.add(Evt.target)
            }
            switch (result.control) {
                case Evt.list[0]: {
                    choice1()
                    break;
                }
                case Evt.list[1]: {
                    choice2()
                    break;
                }
                case Evt.list[2]: {
                    player.addTempSkill('huangran_used')
                    choice1()
                    choice2()
                    break;
                }
            }
        }],
        group: 'huangran_reCount',
        subSkill: {
            used: new toSkill('mark'),
            reCount: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.card.name === 'sha' && Evt.targets.filter(tar => {
                        return !game.countPlayer(cur => cur.hasHistory('useCard', evt => {
                            return evt !== Evt && evt.targets.includes(tar)
                        }))
                    }).length
                },
                content() {
                    if (trigger.addCount !== false) {
                        player.logSkill('huangran')
                        trigger.addCount = false;
                        let stat = player.getStat().card;
                        if (stat[trigger.card.name]) stat[trigger.card.name]--;
                    }
                },
            }, 'direct').setT('useCard1'),
        }
    }).setT('useCardToPlayered'),
    senhu: new toSkill('trigger', {
        content() {
            player.link(true);
        },
        group: 'senhu_drawBy',
        subSkill: {
            drawBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return true;
                },
                content() {
                    player.draw()
                },
                effect: {
                    target(card, player, target) {
                        if (card.name === 'tiesuo') return [1, 1];
                    }
                }
            }, 'forced').setT({ global: 'linkAfter' }),
        }
    }, 'forced').setT({ global: 'gameDrawAfter', player: 'enterGame' }),
    //ssk
    tiaolian: {
        trigger: { player: 'useCardToPlayer', target: 'useCardToTarget' },
        usable: 1,
        clickChange: '休眠',
        clickable(player) {
            if (player.$.tiaolian_clickChange === undefined) player.$.tiaolian_clickChange = false;
            else player.$.tiaolian_clickChange = !player.$.tiaolian_clickChange;
        },
        clickableFilter(player) {
            return player.$.tiaolian_clickChange !== false;
        },
        filter(Evt, player) {
            if (player.$.tiaolian_clickChange === false) return false;
            if (Evt.player == player && !Evt.targets.filter(cur => {
                return player.canCompare(cur);
            }).length) return false;
            if (Evt.player != player && !player.canCompare(Evt.player)) return false;
            return player.countCards('h') > 0;
        },
        check(Evt, player) {
            if (Evt.player == player && Evt.targets.filter(cur => {
                return player.canCompare(cur) && get.$a(player, cur) < 1;
            })) return 1;
            if (Evt.player != player) return get.$a(player, Evt.player) < 1;
        },
        content: [() => {
            if (trigger.targets.includes(player) && trigger.player != player) {
                player.chooseToCompare(trigger.player);
            }
        }, () => {
            if (trigger.targets.includes(player) && trigger.player != player) {
                if (result.bool) {
                    trigger.getParent().targets.remove(player);
                    game.log(trigger.card, '不会对', player, '生效');
                    if (trigger.getParent().targets.length == 0) trigger.getParent().cancel();
                } else {
                    trigger.getParent().directHit.add(player);
                    game.log(player, '不能响应', trigger.getParent().card);
                }
                Evt.finish();
            }
        }, () => {
            Evt.targets = trigger.targets;
            player.chooseTarget('###『咆咲』###选择拼点的对象', true)
                .set('filterTarget', function (card, player, target) {
                    return player.canCompare(target) && _status.event.targets.includes(target);
                })
                .set('ai', function (target) {
                    return 4 - get.$a2(target);
                })
                .set('selectTarget', [1, Infinity])
                .set('multiline', true)
                .set('targets', Evt.targets);
        }, () => {
            if (result.bool && result.targets?.length) {
                player.chooseToCompare(result.targets).callback = lib.skill.tiaolian.callback;
            }
        }],
        //	chat:['粗鄙之语','天地不容','谄谀之臣','皓首匹夫，苍髯老贼','二臣贼子','断脊之犬','我从未见过有如此厚颜无耻之人！'],
        callback() {
            if (Evt.num1 <= Evt.num2) {
                //			target.chat(lib.skill.tiaolian.chat[Math.floor(Math.random()*5)]);
                Evt.getParent().getTrigger().excluded.add(target);
                game.log(Evt.getParent().getTrigger().card, '不会对', target, '生效');
                game.delay();
            } else {
                Evt.getParent().getTrigger().directHit.add(target);
                game.log(target, '不能响应', Evt.getParent().getTrigger().card);
                game.delay();
            }
        },
    },
    jiaku: {
        trigger: { player: ['chooseToCompareAfter', 'compareMultipleAfter'], target: ['chooseToCompareAfter', 'compareMultipleAfter'] },
        forced: true,
        filter(Evt, player) {
            return !Evt.iwhile;
        },
        content() {
            if (player == trigger.player) {
                if (trigger.num1 > trigger.num2) {
                    player.gainPlayerCard('###『生笹』###获得对方的一张牌', trigger.target, true);
                } else {
                    player.draw();
                }
            } else {
                if (trigger.num2 > trigger.num1) {
                    player.gainPlayerCard('###『生笹』###获得对方的一张牌', trigger.player, true);
                } else {
                    player.draw();
                }
            }
        },
    },
    //lize
    shencha: {
        trigger: { player: 'phaseZhunbeiBegin' },
        filter(Evt, player) {
            return true;
        },
        check(Evt, player) {
            return player.countCards('j') > 0;
        },
        content: [() => {
            Evt.num = 3 + player.countCards('j');
            Evt.getE = (player.countCards('e') == 0);
        }, () => {
            Evt.cards = get.cards(Evt.num)
        }, () => {
            let prompt2 = '获得其中至多两张基础牌';
            let selectButton = [0, 2]
            if (Evt.getE) {
                prompt2 += ',装备其中至多两张装备牌';
                selectButton[1] += 2;
            }
            let next = player.chooseCardButton(Evt.cards, '###『审查』###' + prompt2)
                .set('selectButton', selectButton)
            next.set('filterButton', function (button) {
                let type = get.type2(button.link);
                let geting = [0, 0]
                for (let i = 0; i < ui.selected.buttons.length; i++) {
                    if (get.type2(ui.selected.buttons[i].link) == 'basic') geting[0]++;
                    if (get.type2(ui.selected.buttons[i].link) == 'equip') geting[1]++;
                }
                return (type == 'basic' && geting[0] < 2) || (_status.event.getE && type == 'equip' && geting[1] < 2);
            })
                .set('getE', Evt.getE)
            next.set('ai', function (button) {
                return get.value(button.link, _status.event.player) + Math.random();
            });
        }, () => {
            if (result.bool && result.links?.length) {
                let cards = result.links.slice(0);
                Evt.cards.removeArray(cards);
                let basics = cards.filter(card => get.type(card) == 'basic');
                let equips = cards.filter(card => get.type(card) == 'equip');
                player.gain(basics, 'gain2');
                equips.forEach(function (equip) {
                    player.equip(equip);
                });
            }
        }, () => {
            player.skip('phaseDraw');
            if (Evt.cards.length == 0) Evt.finish();
            if (Evt.cards.length == 1) Evt.goto(7);
        }, () => {
            player.chooseCardButton('###『权力审查』###请选择置于牌堆底的顺序（先选择的在下）', Evt.cards, Evt.cards.length, true);
        }, () => {
            Evt.cards = result.links.slice(0);
        }, () => {
            let cards = Evt.cards;
            game.log(player, `将${get.cnNumber(cards.length)}张牌置于牌堆底`);
            while (cards.length) {
                ui.cardPile.appendChild(cards.pop().fix());
            }
            game.updateRoundNumber();
        }],
    },
    helesta: {
        audio: 'yubing',
        trigger: { player: 'damageBegin3' },
        direct: true,
        filter(Evt, player) {
            return Evt.num && player.countDiscardableCards(player, 'e');
        },
        content: [() => {
            player.discardPlayerCard(`###${get.$pro('helesta')}###可以弃置装备区的一张牌使伤害-1`, player, 'e').set('ai', function () {
                if (player.isDamaged() || player.countCards('e') == 1) return 5 + Math.random();
                return Math.random() - 0.2;
            });
        }, () => {
            if (result.bool) {
                trigger.num--;
            };
        }],
        ai: {
            noe: true,
            reverseEquip: true,
            effect: {
                target(card, player, target, current) {
                    if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
                }
            }
        },
        // mod:{
        // 	aiValue(player,card,num){
        // 		if(game.roundNumber>1&&get.type(card)=='equip'&&!get.cardtag(card,'gifts')){
        // 			if(get.position(card)=='e') return num/player.hp;
        // 			return num*player.hp;
        // 		}
        // 	},
        // },
        group: 'helesta_iceshaBy',
        subSkill: {
            iceshaBy: {
                trigger: {
                    player: 'loseAfter',
                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter'],
                },
                filter(Evt, player) {
                    let evt = Evt.getl(player);
                    return evt?.es?.length > 0 && player.hasUseTarget({ name: 'sha', nature: 'ice', isCard: true });
                },
                direct: true,
                content: [() => {
                    player.chooseUseTarget(`###${get.$pro('helesta')}###视为使用一张冰【杀】并摸一张牌`, { name: 'sha', nature: 'ice', isCard: true }, false);
                }, () => {
                    if (result.targets?.length) {
                        player.logSkill('helesta');
                        player.draw();
                    }
                }],
            }
        },
    },
    //ange
    chuangzuo: {},
    //露露
    zhongli: {
        audio: 3,
        audioname: ['jike'],
        mark: true,
        intro: {
            name: '本回合因『重力牵引』获得的牌',
            content: 'cards',
            onunmark(storage, player) {
                if (storage && storage.length) {
                    storage.length = 0;
                }
            },
        },
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: { player: 'phaseUseAfter' },
        priority: 99,
        lastDo: true,
        forced: true,
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            let func = function (result) {
                if (get.type(result) == 'equip') return 2;
                return 0;
            };
            player.judge(func).callback = lib.skill.zhongli.callback;
        }, () => {
            if (result.judge > 0) {
                if (!Evt.cards) Evt.cards = [];
                Evt.cards.add(result.card);
                Evt.goto(0);
            }
        }, () => {
            if (Evt.cards && Evt.cards.length) {
                for (let i = 0; i < Evt.cards.length; i++) {
                    if (!player.$.zhongli.includes(Evt.cards[i])) {
                        Evt.newPhaseUse = true;
                    }
                }
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.newPhaseUse) {
                player.markAuto('zhongli', Evt.cards);
                if (player.maxHp > 1) player.loseMaxHp();
                player.phaseUse();
            }
        }, () => {
            let stat = player.getStat();
            for (let i in stat.skill) {
                let bool = false;
                let info = lib.skill[i];
                if (info.enable != undefined) {
                    if (typeof info.enable == 'string' && info.enable == 'phaseUse') bool = true;
                    else if (typeof info.enable == 'object' && info.enable.includes('phaseUse')) bool = true;
                }
                if (bool) stat.skill[i] = 0;
            }
        }],
        callback() {
            if (get.type(Evt.judgeResult.name) == 'equip') {
                player.gain(card, 'gain2');
                // Evt.judgeResult.judge = 2;
            }
        },
        group: 'zhongli_clear',
        subSkill: {
            clear: {
                trigger: { global: 'gameDrawAfter', player: ['enterGame', 'phaseAfter'] },
                direct: true,
                lastDo: true,
                priority: 666,
                content() {
                    player.unmarkSkill('zhongli');
                }
            },
        }
    },
    xinhuo: {
        audio: 2,
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.countCards('he') >= 2;
        },
        filterCard: true,
        position: 'he',
        selectCard: 2,
        check(card) {
            let player = _status.event.player
            if (get.type(card) == 'equip') {
                if (typeof get.info(card).onLose == 'function') return 9 + Math.random();
                else return 7 + Math.random();
            }
            if (get.name(card) == 'sha' && player.countCards('h', { name: 'sha' }) == 1) return 0;
            return 7 - get.value(card) / 2;
        },
        discard: false,
        toStorage: true,
        content: [() => {
            let next = player.chooseCardButton('###『薪火相传』###按顺序将卡牌置于牌堆顶（先选择的在上）', cards, 2, true)
                .set('forceAuto', function () {
                    return ui.selected.buttons.length == 2;
                })
                .set('ai', function (button) {
                    if (get.type(button.link) == 'equip') {
                        if (typeof get.info(button.link).onLose == 'function') return 10 + Math.random();
                        else return 7 + Math.random();
                    }
                    if (get.name(button.link) == 'sha' && player.countCards('h', { name: 'sha' }) == 1) return 0;
                    return 7 - get.value(button.link) / 2 + Math.random();
                });
        }, () => {
            if (result.bool && result.links?.length) cards = result.links.slice(0);
        }, () => {
            game.log(Evt.target, `将${get.cnNumber(cards.length)}张牌放在牌堆顶`);
            while (cards.length > 0) {
                ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
            }
            game.updateRoundNumber();
        }, () => {
            if (player.hasSkill('xinhuo_chuanhuo')) {
                player.$.xinhuo_chuanhuo++;
                player.updateMarks();
            } else {
                player.addTempSkill('xinhuo_chuanhuo');
                player.$.xinhuo_chuanhuo = 1;
                game.putBuff(player, 'xinhuo', '.player_buff')
            }
        }],
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase && get.type2(card) == 'trick' && get.info(card).notarget !== true && !player.needsToDiscard()) {
                    let evt = player.getStat().card;
                    for (let i in evt) {
                        if (evt[i] && get.type2(evt[i]) == 'trick') {
                            return num - 7;
                        }
                    }
                }
            },
        },
        ai: {
            order(item, player) {
                let cards = Object.entries(player.getStat().card);
                for (let i = 0; i < cards.length; i++) {
                    if (get.type(cards[i][0]) == 'basic') {
                        if (player.hasSha() && player.countCards('he') >= 3 && (!player.$.xinhuo_chuanhuo || player.$.xinhuo_chuanhuo < 2)) {
                            return 7.1;
                        }
                    }
                }
                return 0;
            },
            result: { player: 1 },
        },
        subSkill: {
            chuanhuo: {
                audio: 3,
                trigger: { player: 'useCard' },
                forced: true,
                onremove(player) {
                    game.clearBuff(player, 'xinhuo')
                    player.unmarkSkill('xinhuo_chuanhuo');
                    delete player.$.xinhuo_chuanhuo;
                },
                mod: {
                    selectTarget(card, player, range) {
                        if (range === 1) console.log(card)
                        if (range[1] == -1) return;
                        range[1] += player.$.xinhuo_chuanhuo;
                    },
                    cardUsable(card, player, num) {
                        return true;
                    },
                    targetInRange(card, player, target, now) {
                        return true;
                    },
                },
                content() {
                    player.removeSkill('xinhuo_chuanhuo');
                },
                mark: true,
                intro: {
                    content: '下一张使用的牌无距离和次数限制且目标上限+#',
                    markcount(storage, player) {
                        return player.$.xinhuo_chuanhuo;
                    }
                },
                ai: {
                    useSha: 1,
                }
            },
        },
    },
    weizhuang: {
        audio: 2,
        trigger: { player: 'useCardAfter' },
        locked: true,
        direct: true,
        lastDo: true,
        filter(Evt, player) {
            return (get.type2(Evt.card) == 'trick' || get.type2(Evt.card) == 'basic') && Evt.targets.length > 0;
        },
        content: [() => {
            if (!player.hasMark('weizhuang')) {
                player.markSkill('weizhuang');
            }
        }, () => {
            if (get.type2(trigger.card) == 'basic' && player.getHistory('useCard', evt => {
                return get.type2(evt.card) == 'basic';
            }).length > 1) {
                player.logSkill('weizhuang');
                player.draw(trigger.targets.length);
            } else if (get.type2(trigger.card) == 'trick' && player.getHistory('useCard', evt => {
                return get.type2(evt.card) == 'trick';
            }).length > 1) {
                player.logSkill('weizhuang_discard');
                player.chooseToDiscard(trigger.targets.length, 'he', true)
            }
        }],
        mark: true,
        intro: {
            content: '使用基本牌/锦囊牌指定目标时，摸/弃X张牌（X为此牌指定的目标数）',
        },
        group: ['weizhuang_clear'],
        subSkill: {
            discard: {},
            clear: {
                trigger: { global: 'gameDrawAfter', player: ['enterGame', 'phaseAfter'] },
                direct: true,
                firstDo: true,
                priority: 666,
                content() {
                    player.unmarkSkill('weizhuang');
                }
            },
        },
    },
    //社长
    liebo: {
        trigger: { player: 'useCardBefore' },
        filter(Evt, player) {
            return get.color(Evt.card, player) == 'black';
        },
        priority: 12,
        forced: true,
        content() {
            if (!trigger.directHit) trigger.directHit = [];
            trigger.directHit.addArray(game.players);
        },
        ai: {
            threaten: 1.5,
            effect: {
                player(card, player, target, current) {
                    if (get.color(card) == 'black' && get.tag(card, 'damage')) {
                        if (player.countDiscardableCards(target, 'e')) return [1, -0.5, 1, -1];
                        return [1, 1, 1, -1];
                    }
                }
            }
        },
        group: 'liebo_drawBy',
        subSkill: {
            drawBy: {
                trigger: { source: 'damage' },
                filter(Evt, player) {
                    let evt = Evt.getParent();
                    if (evt.name == '_lianhuan') evt = Evt.getTrigger().getParent(2);
                    else evt = evt.getParent();
                    if (evt.addedSkill && evt.addedSkill.includes('liebo')) return false;
                    return get.color(Evt.card, player) == 'black';
                },
                priority: 12,
                forced: true,
                logTarget: 'player',
                content: [() => {
                    let evt = trigger.getParent();
                    if (evt.name == '_lianhuan') evt = trigger.getTrigger().getParent(2);
                    else evt = evt.getParent();
                    evt.addedSkill ||= [];
                    evt.addedSkill.add('liebo');
                    player.draw();
                }, () => {
                    if (player.countCards('e')) {
                        Evt.target = trigger.player
                        Evt.target.discardPlayerCard('e', player, true);
                    }
                }],
            },
        },
    },
    zhongjizhimeng: {
        audio: true,
        audioname: ['jike'],
        enable: 'phaseUse',
        usable: 1,
        filterCard: true,
        position: 'he',
        check(card) {
            return 8 - get.value(card);
        },
        content: [() => {
            let next = player.chooseCard('h', true, '『重机织梦』：展示一张手牌')
                .set('ai', card => {
                    let player = _status.event.player;
                    if (get.suit(card) == 'red' && player.hasUseTarget(card)) return 5 + get.order(card);
                    if (player.hasUseTarget(card)) return 2 + get.order(card);
                    return 6 - get.value(card);
                })
        }, () => {
            if (result.bool) {
                Evt.cards = result.cards;
                player.showCards(Evt.cards, '『重机织梦』展示手牌');
                player.addGaintag(Evt.cards, 'zhongjizhimeng')
            } else {
                Evt.finish();
            }
        }],
        mod: {
            color(card, player, color) {
                if (!card.cards || card.cards.length != 1) return;
                for (let i of card.cards) {
                    if (i.hasGaintag('zhongjizhimeng')) {
                        if (color == 'red') return 'black';
                        else if (color == 'black') return 'red';
                    }
                }
            },
        },
        ai: {
            order: 10,
            player(player, target) {
                if (player.countCards('h') >= 2) {
                    return 2;
                }
                else return 0
            },
        },
        group: ['zhongjizhimeng_lose'],
        subSkill: {
            lose: {
                trigger: { player: 'loseAfter' },
                filter(Evt, player) {
                    for (let i in Evt.gaintag_map) {
                        if (Evt.gaintag_map[i].includes('zhongjizhimeng')) return true;
                    }
                },
                direct: true,
                content: [() => {
                    player.chooseTarget(`###${get.$pro('zhongjizhimeng')}###令一名角色回复1点体力或摸两张牌`).set('ai', (target) => get.$a(_status.event.player, target));
                }, () => {
                    if (result.bool) {
                        Evt.target = result.targets[0]
                        Evt.target.classList.add('glow');
                    } else {
                        Evt.finish();
                    }
                }, () => {
                    let controls = ['摸两张牌', '回复一点体力', '取消选择'];
                    player.chooseControl(controls).set('ai', function () {
                        return _status.event.index;
                    }).set('index', 0);
                }, () => {
                    Evt.target.classList.remove('glow');
                    switch (result.index) {
                        case 0: {
                            player.logSkill('zhongjizhimeng', Evt.target);
                            Evt.target.draw(2);
                            break;
                        }
                        case 1: {
                            player.logSkill('zhongjizhimeng', Evt.target);
                            Evt.target.recover(player);
                            break;
                        }
                        case 2: {
                            Evt.goto(0);
                            break;
                        }
                    }
                }]
            }
        },
    },
    //阿喵喵
    miaomiao: new toSkill('trigger', {
        trigger: { source: 'damageBegin3' },
        priority: 3,
        filter(Evt, player) {
            return Evt.num == 1;
        },
        content: [() => {
            let check = -1;
            check += get.recoverEffect(trigger.player, player, player);
            player.chooseTarget('『流泪喵喵』：是否令目标摸两张牌（取消则改本次伤害为回复）', function (card, player, target) {
                return target == _status.event.target0;
            })
                .set('ai', (target) => {
                    if (_status.event.check > 0)
                        return -1;
                    return 1;
                })
                .set('check', check)
                .set('target0', trigger.player);
        }, () => {
            if (result.bool) {
                result.targets[0].draw(2);
                Evt.goto(3);
            } else {
                trigger.cancel(true);
            }
        }, () => {
            trigger.player.recover(player);
        }, () => {
            if (player.hasSkill('chengneng_used')) {
                player.draw();
            }
        }],
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase && !player.needsToDiscard()) {
                    return num - 10;
                }
            },
        },
        ai: {
            notricksource: true,
            effect: {
                player(card, player, target, current) {
                    if (get.tag(card, 'damage') == 1) {
                        let num = get.recoverEffect(target, player, player);
                        return [0, num, 0, num];
                    }
                }
            }
        },
        involve: 'chengneng'
    }, 'locked', 'direct'),
    chengneng: new toSkill('trigger', {
        trigger: { global: 'damageBegin3' },
        priority: 3,
        filter(Evt, player) {
            if (player.hasSkill('chengneng_used')) return false
            return Evt.num && Evt.player != player && player.countDiscardableCards(player, 'he');
        },
        check(Evt, player) {
            if (Evt.num == 1) return get.recoverEffect(Evt.player, player, player);
            return 0;
        },
        content: [() => {
            Evt.tar = trigger.player
            player.chooseToDiscard(get.$pro2('chengneng'), 'he').set('logSkill', ['chengneng', Evt.tar])
        }, () => {
            if (result.bool) {
                player.addTempSkill('chengneng_used')
                if (trigger.source !== player) {
                    trigger.source = player;
                    Evt.finish();
                }
            } else {
                Evt.finish();
            }
        }, () => {
            trigger.cancel();
        }, () => {
            Evt.tar.loseHp(trigger.num);
        }],
        subSkill: {
            used: new toSkill('rule', {
                marktext: "龙",
                intro: {
                    name: '逞能龙息',
                    content: '本回合已发动『逞能龙息』',

                }
            }, 'mark')
        },
    }, 'direct'),
    //下巴
    shenglang: {
        enable: 'phaseUse',
        viewAs: { name: 'juedou' },
        usable: 1,
        filter(Evt, player) {
            return player.hasCard(card => get.name(card) == 'sha');
        },
        filterCard(card, player) {
            return get.name(card) == 'sha';
        },
        check(card) {
            return 8 - get.value(card);
        },
        ai: {
            basic: {
                order: 10
            },
            directHit_ai: true,
            skillTagFilter(player, tag, arg) {
                if (tag == 'directHit_ai') {
                    if (arg && get.name(arg.card) == 'juedou') return true;
                    return false;
                }
            },
            result: { player: 1 },
        },
        group: 'shenglang_drawBy',
        subSkill: {
            drawBy: {
                trigger: { global: 'phaseEnd' },
                priority: 7,
                direct: true,
                filter(Evt, player) {
                    let num = 0, going = 0;
                    game.getGlobalHistory('cardMove', evt => {
                        if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
                        if (evt.player == player) going++;
                        if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
                        for (let i = 0; i < evt.cards.length; i++) {
                            let card = evt.cards[i];
                            if (get.name(card) == 'sha' && get.suit(card) == 'spade') num++;
                        }
                    }, Evt);
                    return going && num;
                },
                content() {
                    let num = 0;
                    game.getGlobalHistory('cardMove', evt => {
                        if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
                        if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
                        for (let i = 0; i < evt.cards.length; i++) {
                            let card = evt.cards[i];
                            if (get.name(card) == 'sha' && get.suit(card) == 'spade') num++;
                        }
                    }, Evt);
                    Evt.num = num;
                    player.logSkill('shenglang');
                    player.draw(Evt.num);
                }
            }
        }
    },
    nodao: {
        audio: 2,
        enable: 'phaseUse',
        filter(Evt, player) {
            return !player.getEquip(1) && player.countCards('h', 'sha') > 0;
        },
        filterCard: { name: 'sha' },
        prepare(cards, player) {
            player.$throw(cards, 1000);
            game.log(player, '将', cards, '置入了弃牌堆');
        },
        discard: false,
        loseTo: 'discardPile',
        visible: true,
        delay: 0.5,
        content: [() => {
            player.draw();
        }, () => {
            if (result && get.itemtype(result) == 'cards') {
                for (let i of result) {
                    if (get.subtype(i) == 'equip1') {
                        Evt.card = i;
                        player.chooseBool(`『无刀之咎』：是否装备${get.$t(Evt.card)}并回复一点体力？`);
                    }
                }
            }
        }, () => {
            if (result.bool) {
                player.equip(Evt.card);
                player.recover();
            }
        }],
        ai: {
            basic: {
                order: 2
            },
            result: {
                player(player, target) {
                    if (player.getStat().card.juedou) return 1;
                    else return 0.5;
                },
            },
        },
        mod: {
            aiOrder(player, card, num) {
                if (get.itemtype(card) == 'card' && get.subtype(card) == 'equip1') return (num > 1 ? 1 : num);
            },
            aiValue(player, card, num) {
                if (get.itemtype(card) == 'card' && get.subtype(card) == 'equip1') return num / 10;
                if (get.itemtype(card) == 'card' && player.getStat().card.juedou && get.name(card) == 'sha') return num / 10;
            },
        },
    },
    //奈罗花
    ming_echi: {},
    echi: {
        trigger: {
            global: "gainAfter",
        },
        direct: true,
        filter(Evt, player) {
            if (Evt.player == player) return false;
            let evt = Evt.getParent('phaseDraw');
            if (!evt || evt.name != 'phaseDraw') {
                return Evt.cards && Evt.cards.length > 0 && Evt.player.hp >= player.hp;
            }
        },
        content: [() => {
            Evt.tar = trigger.player;
            let check = get.$a(player, Evt.player) < 0;
            player.chooseCard(get.$pro2('echi', Evt.tar), function (card, player, target) {
                return !card.hasGaintag('ming_');
            }).set('logSkill', ['echi', Evt.tar]).set('ai', card => {
                if (!_status.event.check) return 0;
                if (get.type(card) == 'equip') return 12 - get.value(card);
                return 8 - get.value(card);
            }).set('check', check);
        }, () => {
            if (result.bool) {
                Evt.cardtype = get.type2(result.cards[0])
                player.showCards(result.cards, '『阿斥』：亮出手牌');
                player.addGaintag(result.cards, 'ming_echi');
                player.$give(result.cards, player, false);
                game.delayx();
            } else Evt.finish();
        }, () => {
            let type = Evt.cardtype;
            Evt.tar.chooseToDiscard(`弃置一张为${get.$t(type)}牌的牌或失去一点体力`, function (card, player, target) {
                return get.type2(card) == _status.event.type;
            }).set('ai', card => {
                if (player.hp == 1) return 11 - get.value(card);
                return 6 - get.value(card);
            }).set('type', type);
        }, () => {
            if (!result.bool) {
                Evt.tar.loseHp();
            }
        }]
    },
    mudu: {
        trigger: {
            global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
        },
        filter(Evt, player) {
            if (Evt.player == player || Evt.player.countCards('he') < 2) return false;
            if (player.getHistory('lose', evt => {
                return evt.getParent(Evt.name) == Evt;
            }).length >= 1) return true;
            return false;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) <= 0;
        },
        popup: false,
        content: [() => {
            Evt.tar = trigger.player;
            player.choosePlayerCard(Evt.tar, 'he', 2, `移除${get.$t(Evt.tar)}两张牌`, true).set('ai', function (button) {
                let info = get.info(button.link);
                if (info.onLose && get.position(button.link) == 'e') return 0;
                return get.value(button.link, player, 'raw');
            }).set('logSkill', ['mudu', Evt.tar]);
        }, () => {
            if (result?.links?.length) {
                let str = 'mudu_card' + player.playerid;
                if (Evt.tar.$[str]) {
                    Evt.tar.$[str] = Evt.tar.$[str].concat(result.links);
                } else {
                    Evt.tar.$[str] = result.links.slice(0);
                }
                Evt.tar.addSkill('mudu_card');
                Evt.tar.lose(result.links, ui.special, 'toStorage');
            }
        }],
        subSkill: {
            card: {
                mark: true,
                trigger: {
                    global: 'phaseEnd'
                },
                filter(Evt, player) {
                    return true;
                },
                forced: true,
                intro: {
                    content: 'cardCount',
                    onunmark(storage, player) {
                        if (storage && storage.length) {
                            player.$throw(storage, 1000);
                            game.cardsDiscard(storage);
                            game.log(storage, '被置入了弃牌堆');
                            storage.length = 0;
                        }
                    },
                },
                content: [() => {
                    let keys = Object.keys(player.storage);
                    for (let i = 0; i < keys.length; i++) {
                        if (keys[i].indexOf('mudu_card') == 0) keys[i] = keys[i].slice(9);
                        else keys.splice(i--, 1);
                    }
                    Evt.keys = keys;
                }, () => {
                    let key = Evt.keys.pop(), source = game.filterPlayer(cur => { return cur.playerid == key });
                    let str = 'mudu_card' + key;
                    if (!source.length) {
                        player.gain(player.$[str], 'fromStorage');
                        delete player.$[str];
                    } else {
                        source = source[0];
                        player.chooseButton(['选择收回的牌', player.$[str], 'hidden'], true).set('callback', function (player, result) {
                            let cards = player.$[str].slice(0).removeArray(result.links);
                            let source = _status.event.source;
                            player.gain(result.links);
                            if (source.isIn()) {
                                player.$give(cards, source);
                                source.gain(cards);
                            }
                            delete player.$[str];
                        }).set('source', source);
                    }
                    if (Evt.keys.length > 0) Evt.redo();
                    else player.removeSkill('mudu_card');
                }],
            },
        },
        ai: {
            threaten: 1.3
        }
    },
    //远北千南
    yingkuo: {
        trigger: {
            player: ['gainAfter', 'equipAfter'],
        },
        direct: true,
        filter(Evt, player) {
            if (Evt.name == 'equip' && Evt.swapped) return false;
            return game.hasPlayer(cur => {
                if (cur == player) return false;
                if (Evt.name == 'equip') return cur.countCards('e') == player.countCards('e');
                else return cur.countCards('h') == player.countCards('h');
            });
        },
        content: [() => {
            player.chooseTarget(get.$pro2('yingkuo'), function (card, player, target) {
                if (player == target) return false;
                if (_status.event.type == 'equip') return target.countCards('e') == player.countCards('e');
                else return target.countCards('h') == player.countCards('h');
            }).set('ai', function (target) {
                return -get.$a2(target);
            }).set('type', trigger.name);
        }, () => {
            if (result.bool) {
                Evt.tar = result.targets[0];
                player.logSkill('yingkuo', Evt.tar);
                Evt.tar.chooseToDiscard((trigger.name == 'equip' ? 'e' : 'h'), true);
            }
        }]
    },
    shengni: {
        enable: 'chooseToUse',
        viewAs(cards, player) {
            if (player.$.shengni_cardsDis) {
                let cur = player.$.shengni_cardsDis[0];
                return {
                    name: get.name(cur),
                    suit: get.suit(cur),
                    number: get.number(cur),
                    nature: get.nature(cur),
                };
            }
            return null;
        },
        filter(Evt, player) {
            let filter = Evt.filterCard;
            if (!player.$.shengni_cardsDis || !player.$.shengni_cardsDis.length) return false;
            return filter(player.$.shengni_cardsDis[0], player, Evt);
        },
        check(card) {
            let player = _status.event.player;
            return player.getUseValue(player.$.shengni_cardsDis[0]) > player.getUseValue(card);
        },
        filterCard(card, player, Evt) {
            if (player.hasSkill('shengni_used')) return true;
            return false;
        },
        selectCard() {
            let player = _status.event.player;
            if (player.hasSkill('shengni_used')) return 1;
            return -1;
        },
        precontent() {
            player.addTempSkill('shengni_used');
        },
        ignoreMod: true,
        position: 'h',
        group: ['shengni_cardsDis', 'shengni_cardsDis2'],
        subSkill: {
            used: {},
            cardsDis: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                marktext: '拟',
                intro: {
                    name: '声拟',
                    content(storage, player) {
                        if (!storage) return '上一次进入弃牌堆的牌不满足条件';
                        return '上一次进入弃牌堆的基本牌/通常锦囊牌为' + get.$t(storage);
                    }
                },
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                direct: true,
                filter(Evt, player) {
                    if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
                        || (!Evt.getParent().relatedEvent || !Evt.getParent().relatedEvent.player || Evt.getParent().relatedEvent.name == 'judge'
                            || Evt.getParent().relatedEvent.player == player))) return false;
                    if (Evt.name == 'lose' && (Evt.position != ui.discardPile
                        || Evt.player == player)) return false;
                    return Evt.cards.filter(card => get.position(card, true) == 'd'
                        && ['basic', 'trick'].includes(get.type(card))).length > 0;
                },
                content() {
                    let cards = trigger.cards.filter(card => get.position(card, true) == 'd' && ['basic', 'trick'].includes(get.type(card)));
                    player.$.shengni_cardsDis = [cards.pop()];
                    player.markSkill('shengni_cardsDis');
                },
            },
            cardsDis2: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                direct: true,
                firstDo: true,
                filter(Evt, player) {
                    return Evt.cards.filter(card => get.position(card, true) == 'd').length > 0;
                },
                content() {
                    delete player.$.shengni_cardsDis;
                    player.markSkill('shengni_cardsDis');
                },
            },
        },
        ai: {
            threaten: 1.3
        }
    },
    //凛月
    zhuqiao: {
        audio: 5,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.$.zhuqiao < 24;
        },
        check(card, cards) {
            let player = _status.event.player;
            if (player.$.zhuqiao_addCard && player.$.zhuqiao_addCard.includes(get.suit(card))) return 6 - get.value(card);
            return 9 - get.value(card);
        },
        filterCard: true,
        prepare(cards, player) {
            player.$throw(cards, 1000);
            game.log(player, '将', cards, '置入了弃牌堆');
        },
        position: 'he',
        discard: false,
        loseTo: 'discardPile',
        visible: true,
        delay: 0.5,
        content() {
            player.draw();
            player.$.zhuqiao += get.number(cards[0]);
            if (!player.hasSkill('zhuqiao_addCard')) player.addTempSkill('zhuqiao_addCard');
            if (!player.$.zhuqiao_addCard) player.$.zhuqiao_addCard = [];
            player.$.zhuqiao_addCard.add(get.suit(cards[0]));
            player.markSkill('zhuqiao_addCard');
        },
        ai: {
            basic: {
                order: 1,
            },
            result: {
                player: 0.5,
            },
            threaten: 1.5
        },
        group: ['zhuqiao_clear'],
        subSkill: {
            clear: {
                trigger: { player: 'phaseAfter' },
                priority: 24,
                forced: true,
                silent: true,
                popup: false,
                content() {
                    player.$.zhuqiao = 0;
                },
            },
            addCard: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                mark: true,
                intro: {
                    content: '本回合重铸牌的花色：$',
                },
                trigger: { player: 'phaseEnd' },
                priority: 24,
                direct: true,
                filter(Evt, player) {
                    return game.countPlayer(cur => {
                        return player.$.zhuqiao_addCard.length > cur.countCards('h');
                    });
                },
                onremove(player) {
                    delete player.$.zhuqiao_addCard;
                },
                content: [() => {
                    Evt.num = player.$.zhuqiao_addCard.length;
                    player.chooseTarget(`###${get.$pro('zhuqiao')}###令一名角色将手牌数补至${get.cnNumber(Evt.num)}张`, function (card, player, target) {
                        return _status.event.num > target.countCards('h');
                    }).set('ai', function (target) {
                        let player = _status.event.player;
                        return (_status.event.num - target.countCards('h')) * get.$a(player, target);
                    }).set('num', Evt.num)
                }, () => {
                    if (result.bool && result.targets?.length) {
                        Evt.target = result.targets[0];
                        player.logSkill('zhuqiao', Evt.target);
                        Evt.target.gain(get.cards(Evt.num - Evt.target.countCards('h')), 'draw')
                    }
                }],
            },
        }
    },
    //开司
    pojie: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        trigger: {
            global: ['loseAfter', 'equipAfter'],
        },
        marktext: "戒",
        mark: true,
        intro: {
            content: '弃牌阶段改为弃置#张牌',
        },
        filter(Evt, player) {
            if (player != _status.currentPhase) return false;
            if (Evt.name == 'equip') {
                return true;
            }
            return Evt?.es?.length;
        },
        content() {
            player.draw();
            player.addMark('pojie', 1, false);
        },
        group: 'pojie_phaseDiscard',
        subSkill: {
            phaseDiscard: {
                trigger: { player: ['phaseDiscardBegin', 'phaseEnd'] },
                direct: true,
                lastDo: true,
                priority: 2,
                filter(Evt, player) {
                    return player.$.pojie > 0;
                },
                content: [() => {
                    if (trigger.name == 'phaseDiscard') {
                        player.logSkill('pojie');
                        if (!trigger.num) trigger.num = player.$.pojie;
                    }
                }, () => {
                    player.$.pojie = 0;
                    player.unmarkSkill('pojie');
                }],
            },
        },
    },
    dazhen: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.getEquip(1);
        },
        filterCard(card, player) {
            return get.subtype(card) == 'equip1';
        },
        discard: false,
        lose: false,
        position: 'e',
        filterTarget(card, player, target) {
            return target != player;
        },
        content: [() => {
            player.$give(cards, target, false);
            target.equip(cards[0]);
        }, () => {
            Evt.num = Math.abs(player.getHandcardLimit() - player.countCards('h'));
            target.chooseToDiscard(`『大振』：需要弃置${get.cnNumber(Evt.num)}张牌`, Evt.num, 'he', true);
        }],
        ai: {
            order: 6,
            result: {
                target(player, target) {
                    if (player.countCards('h') > player.getHandcardLimit()) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                player(player, target) {
                    if (target.getEquip(1)) return 1;
                    else return -0.5;
                },
            },
            threaten: 1.2,
        },
    },
    //梦乃栞
    rencan: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he') && (player.getNext().isIn() || player.getPrevious().isIn());
        },
        check(card) {
            return 7 - get.useful(card)
        },
        position: 'he',
        filterCard: true,
        filterTarget(card, player, target) {
            return [player.getNext(), player.getPrevious()].includes(target) && target.hp < target.maxHp
        },
        content: [() => {
            target.recover()
        }, () => {
            if (!game.countPlayer2(cur => {
                let count = 0
                cur.getHistory('recover').filter(evt => {
                    if (evt.getParent().name === 'rencan' && evt.result) {
                        count += evt.result
                    }
                })
                return count >= 2
            })) {
                target.chooseCardTarget({
                    prompt: get.$pro('rencan'),
                    prompt2: `你可弃置一张牌令你的上家或下家回复一点体力，若没有角色在本回合内因为『饪飨』回复了至少两点体力，其也可以发动一次『饪飨』。`,
                    position: 'he',
                    filterTarget(card, player, target) {
                        return [player.getNext(), player.getPrevious()].includes(target) && target.hp < target.maxHp;
                    },
                    ai1: card => {
                        return 7 - get.useful(card)
                    },
                    ai2: target => {
                        return get.recoverEffect(target, player, target)
                    }

                })
            } else Evt.finish()
        }, () => {
            if (result.bool) {
                target.useSkill('rencan', result.cards, result.targets, false)
            }
        }],
        ai: {
            order: 2,
            result: {
                player(player, target) {
                    if (player.needsToDiscard()) return 0;
                    return -0.5;
                },
                target(player, target) {
                    return get.recoverEffect(target, player, target)
                },
            }
        }
    }),
    yiduo: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.num > 0 && player.countCards('he') && (player.getNext().isIn() || player.getPrevious().isIn());
        },
        content: [() => {
            player.chooseCardTarget({
                prompt: get.$pro2('yiduo'),
                prompt2: `你可弃置一张牌令你的上家或下家受到一点伤害，若没有角色在本回合内因为『呓堕』受到了至少两点伤害，其也可以发动一次『呓堕』。`,
                position: 'he',
                filterTarget(card, player, target) {
                    return [player.getNext(), player.getPrevious()].includes(target);
                },
                ai1: card => {
                    return 6 - get.useful(card)
                },
                ai2: target => {
                    if ((target.hp === 1 && !target.hujia) || target.countCards('he') === 0) return -get.$a2(target)
                    return -1 - get.$a2(target)
                }

            })
        }, () => {
            if (result.bool) {
                player.discard(result.cards)
                Evt.target = result.targets[0]
                player.logSkill('yiduo', Evt.target)
                Evt.target.damage()
            } else Evt.finish()
        }, () => {
            if (!game.countPlayer2(cur => {
                let count = 0
                cur.getHistory('damage').filter(evt => {
                    if (evt.getParent().name === 'yiduo' && evt.num > 0) {
                        count += evt.num
                    }
                })
                return count >= 2
            })) {
                console.log(target)
                target.useSkill('yiduo', false)
            }
        }],
        ai: {
            maixie: true
        }
    }, 'direct').setT('damageEnd'),
    //椎名菜羽
    qiansi: new toSkill('trigger', {
        filter(Evt, player) {
            return player.isIn();
        },
        check(Evt, player) {
            if (Evt.player.hasJudge('lebu')) {
                return player.hp >= 3 && player.$.kangqie < 7
            }
            else {
                return player.hp >= 3 && get.$a(player, Evt.player) > 0
            }
        },
        logTarget: 'player',
        content: [() => {
            player.damage('nosource')
            Evt.tar = trigger.player
        }, () => {
            Evt.tar.draw(3)
            Evt.tar.addTempSkill('qiansi_loseHpBy')
        }],
        subSkill: {
            loseHpBy: new toSkill('trigger', {
                intro: {
                    content: '回合结束时弃置3张牌'
                },
                filter(Evt, player) {
                    return player.isIn();
                },
                content: [() => {
                    player.chooseToDiscard(3, true, 'he', '『牵丝』请弃牌')
                }, () => {
                    player.removeSkill('qiansi_loseHpBy')
                }],
            }, 'forced').setT('phaseEnd')
        },
        ai: {
            expose: 0.1,
        }
    }).setT({ global: 'phaseZhunbeiBegin' }),
    kangqie: new toSkill('trigger', {
        sync: function (player) {
            if (game.online) return;
            let history = player.actionHistory;
            let num = 0;
            for (let his of history) {
                for (let dam of his.damage) {
                    if (!dam.source) num++;
                }
            }
            player.$.kangqie = num;
            if (num > 0) player.markSkill('kangqie');
        },
        intro: {
            content(storage) {
                if (storage == 0) return '未受到无来源伤害';
                return `已受到${storage}次无来源伤害`;
            }
        },
        enable: 'phaseUse',
        filter(Evt, player) {
            lib.skill.kangqie.sync(player);
            console.log(Evt, player.$.kangqie)
            if (Evt.name !== 'phaseJieshu') {
                return player.hp === 1 || player.$.kangqie >= 7
            }
            return true;
        },
        content: [() => {
            player.turnOver()
        }, () => {
            player.recover()
        }, () => {
            player.chooseTarget(true, '『抗切』请选择受到伤害的角色')
                .set('ai', tar => {
                    let player = _status.event.player
                    if (tar === player && player.$.kangqie < 7) return 3
                    return get.damageEffect(tar, player, player);
                })
        }, () => {
            if (result.bool && result.targets) {
                Evt.tar = result.targets[0]
                player.line(Evt.tar)
                Evt.tar.damage('nosource')
            }
        }],
        ai: {
            order: 10,
        }
    }).setT('phaseJieshuBegin'),
    //早见咲
    tuncai: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = true;
        },
        trigger: {
            player: 'discardAfter',
            global: 'drawAfter',
        },
        round: 1,
        filter(Evt, player) {
            if (Evt.name == 'draw') return Evt.player != player && player.$.tuncai;
            else return Evt.cards.length && !player.$.tuncai;
        },
        check(Evt, player) {
            if (player.$.tuncai == true) return Evt.num >= 2;
            return true;
        },
        popup: false,
        content: [() => {
            if (trigger.name == 'draw') {
                player.logSkill('tuncai', player); player.draw(trigger.num); player.$.tuncai = !player.$.tuncai; Evt.finish();
            } else player.chooseTarget(get.$pro2('tuncai'), function (card, player, target) {
                if (player == target) return false;
                return target.countCards('he');
            }).set('ai', function (target) {
                return -get.$a2(target);
            });
        }, () => {
            if (result.bool) {
                Evt.tar = result.targets[0];
                player.logSkill('tuncai', Evt.tar);
                player.$.tuncai = !player.$.tuncai;
                player.updateMarks('tuncai')
                Evt.tar.chooseToDiscard(trigger.cards.length, true, 'he');
            }
        }]
    },
    zhidu: {
        trigger: { global: ['damageAfter', 'dying'] },
        zhuSkill: true,
        filter(Evt, player) {
            if (!player.hasZhuSkill('zhidu') || Evt.player.group != player.group) return false;
            if (Evt.name == 'damage') return Evt.num >= 2;
            return true;
        },
        content() {
            player.$.tuncai = !player.$.tuncai;
            player.updateMarks('tuncai')
            game.delay();
            let roundname = 'tuncai_roundcount';
            if (player.hasMark(roundname)) {
                player.popup('重置');
                let next = game.createEvent('resetSkill');
                [next.player, next.resetSkill] = [player, 'tuncai']
                next.setContent('resetRound');
            }
        },
        ai: {
            combo: 'tuncai',
            threaten: 1.3
        }
    },
    //纪代因果
    huanxi: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = true;
        },
        trigger: {
            player: ['phaseUseBegin', 'phaseUseEnd'],
        },
        filter(Evt, player) {
            return player.countCards('h') > 0;
        },
        check(Evt, player) {
            let cards = player.getCards('h');
            let value = 0;
            for (let i of cards) {
                value += get.value(i);
            }
            value /= player.countCards('h');
            return (value < 6 && player.countCards('h') == player.hp) || value < 4;
        },
        content: [() => {
            Evt.cards = player.getCards('h');
            player.discard(Evt.cards);
        }, () => {
            player.draw(Evt.cards.length);
        }, () => {
            let names = Evt.cards.map(function (i) {
                return get.name(i);
            })
            if (!trigger.huanxi) {
                trigger.huanxi = names;
            } else {
                if (trigger.huanxi.length + names.length == trigger.huanxi.addArray(names).length) {
                    if (player.hasSkill('celv_cardDisable')) {
                        let next = game.createEvent('resetSkill');
                        [next.player, next.resetSkill] = [player, 'celv']
                        next.setContent(function () {
                            player.popup('重置');
                            player.removeSkill('celv_cardDisable');
                        });
                    }
                }
            }
        }]
    },
    celv: {
        trigger: { player: ['changeHp', 'discardAfter'] },
        filter(Evt, player) {
            if (Evt.name == 'changeHp') return Evt.num < 0;
            return Evt.cards.length == player.hp;
        },
        direct: true,
        content: [() => {
            player.chooseTarget(get.$pro2('celv'), function (card, player, target) {
                if (player == target) return false;
                return target.countGainableCards(player, 'h');
            }).set('ai', function (target) {
                let player = _status.event.player;
                return get.effect(target, { name: 'shunshou_copy2' }, player, player);
            });
        }, () => {
            if (result.bool) {
                Evt.tar = result.targets[0];
                player.logSkill('celv', Evt.tar);
                player.gainPlayerCard(Evt.tar, 'h', true, 'visibleMove');
            }
        }, () => {
            if (result.bool) {
                let card = result.cards[0]
                player.showCards(card, '『册吕』获得手牌');
                if (!player.$.celv_cardDisable) player.$.celv_cardDisable = [];
                player.$.celv_cardDisable.add(get.name(card));
                if (!player.hasSkill('celv_cardDisable')) player.addSkill('celv_cardDisable');
                player.markSkill('celv_cardDisable');
            }
        }],
        subSkill: {
            cardDisable: {
                marktext: '吕',
                intro: {
                    name: '春绿',
                    content: '不能使用或打出：$'
                },
                onremove: true,
                mod: {
                    cardEnabled2(card, player) {
                        if (player.$.celv_cardDisable.includes(get.name(card, player))) return false;
                    },
                },
            }
        },
        ai: {
            combo: 'huanxi',
            threaten: 1.3
        }
    },


    //ptr
    mianmo: {
        audio: 3,
        trigger: { player: 'useCard1' },
        filter(Evt, player) {
            if (player.hasSkill('mianmo_used')) return false;
            return Evt.targets && Evt.targets.length && Evt.cards && Evt.cards.length;
        },
        direct: true,
        firstDo: true,
        priority: 4,
        content: [() => {
            Evt.num = 0;
            for (let i = 0; i < trigger.cards.length; i++) {
                Evt.num += get.number(trigger.cards[i], player);
            }
            Evt.card = trigger.cards[0];
            let next = player.chooseTarget()
                .set('prompt', get.$pro2('mianmo').replace('之点数或合计点数', Evt.num))
                .set('filterTarget', function () {
                    return true;
                })
                .set('complexTarget', true)
                .set('selectTarget', function () {
                    let num = _status.event.num, sum = 0;
                    for (let j = 0; j < ui.selected.targets.length; j++) {
                        sum += ui.selected.targets[j].hp;
                    }
                    if (num == sum) return [0, ui.selected.targets.length];
                    else return [ui.selected.targets.length + 1, ui.selected.targets.length + 1];
                })
                .set('num', Evt.num)
                .set('ai', function (target) {
                    let trigger = _status.event.getTrigger();
                    let player = _status.event.player;
                    return get.effect(target, trigger.card, player, player);
                });
        }, () => {
            if (result.bool) {
                Evt.targets = result.targets.slice(0);
                player.logSkill('mianmo', Evt.targets);
                if (player.$.tiaolv_up && player.$.tiaolv_up.includes(Evt.card)) Evt.goto(4);
                if (player.$.tiaolv_down && player.$.tiaolv_down.includes(Evt.card)) Evt.goto(6);
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.targets.includes(player)) {
                if (!player.canUse(Evt.card, player)) Evt.targets.remove(player);
            } else {
                player.addTempSkill('mianmo_used')
            }
        }, () => {
            trigger.targets = Evt.targets;
            Evt.finish();
        }, () => {
            player.chooseBool('眠魔：是否令目标各摸一张牌？').set('ai', function () {
                let player = _status.event.player;
                if (_status.event.targets.includes(player)) return true;
                return false;
            }).set('targets', Evt.targets);
        }, () => {
            if (result.bool) {
                game.asyncDraw(Evt.targets);
            }
            Evt.goto(2);
        }, () => {
            player.chooseBool('眠魔：是否令目标横置？').set('ai', function () {
                return true;
            });
        }, () => {
            if (result.bool) {
                Evt.targets.forEach(function (tar) {
                    tar.link(true)
                });
            }
            Evt.goto(2);
        }],
        subSkill: {
            used: {},
        },
    },
    tiaolv: {
        audio: 4,
        trigger: { player: 'useCard1' },
        filter(Evt, player) {
            return Evt.cards && Evt.cards.length == 1;
        },
        firstDo: true,
        direct: true,
        priority: 5,
        content: [() => {
            player.chooseControl(['增加', '减少', 'cancel2']).set('prompt', get.$pro2('tiaolv'));
        }, () => {
            if (result.control != 'cancel2') {
                player.logSkill('tiaolv');
                switch (result.control) {
                    case '增加':
                        player.$.tiaolv_up.addArray(trigger.cards);
                        break;
                    case '减少':
                        player.$.tiaolv_down.addArray(trigger.cards);
                        break;
                    default:
                        break;
                }
            }
        }],
        ai: {
            combo: 'mianmo'
        },
        group: ['tiaolv_up', 'tiaolv_down'],
        subSkill: {
            up: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                trigger: { player: 'useCardAfter' },
                firstDo: true,
                silent: true,
                direct: true,
                priority: 5,
                content() {
                    if (player.$[Evt.name].length) player.$[Evt.name].length = 0;
                },
                mod: {
                    number(card, player, number) {
                        let num = player.getDamagedHp() || 1;
                        if (player.$.tiaolv_up.includes(card)) return number + num;
                    },
                },
            },
            down: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = [];
                },
                trigger: { player: 'useCardAfter' },
                firstDo: true,
                silent: true,
                direct: true,
                priority: 5,
                content() {
                    if (player.$[Evt.name].length) player.$[Evt.name].length = 0;
                },
                mod: {
                    number(card, player, number) {
                        let num = player.getDamagedHp() || 1;
                        if (player.$.tiaolv_down.includes(card)) return number - num;
                    },
                },
            },
        },
    },
    //狼半仙
    niwei: {
        marktext: '弼',
        intro: {
            name: '味增弼佐',
            content(storage, player) {
                let str = '<ul style="padding-top:0;margin-top:0"><p>本回合变为逆位的牌名</p>';
                for (let i = 0; i < storage.length; i++) {
                    str += '<li>' + get.$t(storage[i]);
                }
                str += '</ul>'
                return str;
            },
        },
        onremove(player, skill) {
            player.unmarkSkill(skill);
            delete player.$[skill]
        },
    },
    ming_niwei: {
        trigger: { global: ['shaBegin', 'shanBegin', 'taoBegin', 'jiuBegin'] },
        direct: true,
        lastDo: true,
        priority: 3,
        filter(Evt, player) {
            if (Evt.player.hasSkill('niwei') && Evt.player.$.niwei && Evt.player.$.niwei.includes(Evt.name)) return true;
            if (Evt.player != player) return false;
            let loser = player.getHistory('lose', evt => {
                return (evt.type == 'use' && evt.getParent().card && evt.getParent().card == Evt.card);
            });
            loser = loser[loser.length - 1];
            if (loser.getParent()) {
                if (Evt.getParent() == loser.getParent()) {
                    for (let i in loser.gaintag_map) {
                        if (loser.gaintag_map[i].includes('ming_niwei')) return true;
                    }
                }
            }
            return false;
        },
        content() {
            let fun = lib.card['niwei_' + trigger.name].content;
            if (fun) trigger.setContent(fun);
        },
        ai: {
            threaten: 0.8,
        }
    },
    xuanxu: {
        audio: 4,
        trigger: { player: 'phaseUseBegin' },
        direct: true,
        lastDo: true,
        priority: 3,
        filter(Evt, player) {
            return player.countCards('h', card => get.type(card) == 'basic'
                && !card.hasGaintag('ming_'));
        },
        content: [() => {
            player.chooseCard(get.$pro2('xuanxu'), [1, Infinity], function (card, player, target) {
                return get.type(card) == 'basic' && !card.hasGaintag('ming_');
            }).set('ai', card => {
                return 7 - get.useful(card);
            });
        }, () => {
            if (result.bool && result.cards && result.cards.length) {
                Evt.cards = result.cards.slice(0);
                player.showCards(Evt.cards, '『玄虚映实』亮出手牌');
                player.addGaintag(Evt.cards, 'ming_niwei');
                game.delayx();
            }
        }],
        group: 'ming_niwei',
        global: 'xuanxu_put',
        subSkill: {
            put: {
                mod: {
                    targetEnabled(card, player, target, now) {
                        if (!card.cards) return;
                        for (let i of card.cards) {
                            if (!i.hasGaintag('ming_niwei')) return;
                        }
                        if (now === false) return true;
                        let info = get.info(card), filter = info.filterTarget, range = info.range, outrange = info.outrange;
                        if (typeof filter == 'boolean') return !filter;
                        if (range == undefined && outrange == undefined) {
                            if (typeof filter == 'function') {
                                return !filter(card, player, target);
                            }
                        } else {
                            return lib.filter.targetInRange(card, player, target) || !filter(card, player, target);
                        }
                    },
                }
            }
        },
        mod: {
            playerEnabled(card, player, target, now) {
                if (!card.cards) return;
                for (let i of card.cards) {
                    if (!i.hasGaintag('ming_niwei')) return;
                }
                let info = get.info(card), filter = info.filterTarget, range = info.range, outrange = info.outrange;
                if (typeof filter == 'boolean') return !filter;
                if (range == undefined && outrange == undefined) {
                    if (typeof filter == 'function') {
                        return !filter(card, player, target);
                    }
                } else {
                    return lib.filter.targetInRange(card, player, target) || !filter(card, player, target);
                }
            },
            selectTarget(card, player, range) {
                if (!card.cards) return;
                for (let i of card.cards) {
                    if (!i.hasGaintag('ming_niwei')) return;
                }
                if (range[0] == -1) range[0] = 1;
                if (range[1] == -1) range[1] = 1;
            },
            targetInRange(card, player, target, now) {
                if (!card.cards) return;
                for (let i of card.cards) {
                    if (!i.hasGaintag('ming_niwei')) return;
                }
                if (_status.niweing) return;
                _status.niwei = true;
                if (typeof now == 'boolean') return !now;
                return lib.filter.targetInRange(card, player, target);
                delete _status.niwei;
            },
            ignoredHandcard(card, player) {
                if (card.hasGaintag('ming_niwei')) {
                    return true;
                }
            },
            cardDiscardable(card, player, name) {
                if (name == 'phaseDiscard' && card.hasGaintag('ming_niwei')) {
                    return false;
                }
            },
        },
    },
    weizeng: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: { global: 'phaseBegin' },
        direct: true,
        lastDo: true,
        priority: 3,
        filter(Evt, player) {
            return Evt.player !== player && player.countCards('h', card => card.hasGaintag('ming_'));
        },
        content: [() => {
            Evt.target = trigger.player;
            Evt.precards = player.getCards('h', card => get.type(card) == 'basic' && card.hasGaintag('ming_'))
            player.chooseToMove(get.$pro2('weizeng'))
                .set('list', [
                    ['牌堆顶'],
                    ['亮出牌', Evt.precards],
                ])
                .set('reverse', (_status.currentPhase ? get.attitude(player, _status.currentPhase) > 0 : false))
                .set('processAI', function (list) {
                    let cards = list[1][1].slice(0);
                    cards.sort(function (a, b) {
                        return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                    });
                    return [cards.slice(0, 1)];
                })
        }, () => {
            if (result.bool && result.moved && result.moved[0].length) Evt.cards = result.moved[0].slice(0);
            if (!Evt.cards) {
                Evt.finish()
                return
            }
            player.logSkill('weizeng', Evt.target)
            Evt.target.addTempSkill('weizeng_put');
            Evt.target.addTempSkill('niwei');
            Evt.target.$.weizeng_put = [];
            Evt.target.$.weizeng_put.addArray(Evt.cards);
            game.log(player, '将', Evt.cards, '置于牌堆顶');
            player.lose(Evt.cards, ui.special);
        }, () => {
            let tops = Evt.cards.slice(0)
            while (tops.length) {
                ui.cardPile.insertBefore(tops.pop().fix(), ui.cardPile.firstChild);
            }
            game.updateRoundNumber();
            game.delayx();
        }],
        subSkill: {
            put: {
                trigger: { player: 'gainAfter' },
                direct: true,
                lastDo: true,
                priority: 3,
                filter(Evt, player) {
                    if (player.$.weizeng_put && player.$.weizeng_put.length) {
                        for (let i = 0; i < Evt.cards.length; i++) {
                            if (player.$.weizeng_put.includes(Evt.cards[i])) {
                                return true;
                            }
                        }
                    }
                },
                content: [() => {
                    Evt.cards = [];
                    if (!player.$.niwei) player.$.niwei = [];
                    for (let i = 0; i < trigger.cards.length; i++) {
                        if (player.$.weizeng_put.includes(trigger.cards[i])) {
                            player.$.niwei.add(trigger.cards[i].name);
                            Evt.cards.includes(trigger.cards.splice(i--, 1));
                        }
                    }
                }, () => {
                    player.markSkill('niwei');
                    player.$.weizeng_put.removeArray(Evt.cards);
                }],
                onremove: true,
            }
        },
    },
    //贝海王
    aswusheng: new toSkill('trigger', {
        init(player, skill) {
            player.$[skill] = 0;
        },
        trigger: { player: ['useCard', 'respond'] },
        priority: 5,
        filter(Evt, player) {
            return get.type(Evt.card) == 'basic' || player.$.aswusheng > 0;
        },
        logTarget(Evt, player) {
            if (Evt.name == 'respond') return Evt.source;
            if (['sha', 'qi', 'jiu', 'tao'].includes(Evt.card.name)) return Evt.targets[0];
            if (Evt.respondTo) return Evt.respondTo[0];
        },
        intro: {
            content: '连续使用或打出了&张基本牌',
        },
        content: [() => {
            if (get.type(trigger.card) != 'basic' && player.$.aswusheng > 0) {
                player.$.aswusheng = 0;
                player.markSkill('aswusheng');
                Evt.finish();
            }
            Evt.num = player.$.aswusheng;
        }, () => {
            let goto = false;
            let logTarget = get.copy(lib.skill.aswusheng.logTarget);
            let target = logTarget(trigger, player);
            player.$.aswusheng++;
            player.markSkill('aswusheng');
            switch (Evt.num) {
                case 0: goto = (trigger.name == 'useCard'); break;
                case 1: goto = true; break;
                case 2: goto = (target.countGainableCards(player, 'he') > 0); break;
                case 3: goto = (player.hp < player.maxHp); break;
                default: break;
            }
            if (goto) {
                Evt.target = target;
                let next = player.chooseBool(get.$pro2('aswusheng').replace(Evt.num, `<span class="yellowtext">${Evt.num}</span>`));
                next.set('ai', function () { return 1 });
                next.set('frequentSkill', Evt.name);
            } else {
                Evt.finish(0)
            }
        }, () => {
            if (result.bool || Evt.frequent) {
                player.logSkill(Evt.name, Evt.target);
                switch (Evt.num) {
                    case 0: {
                        if (trigger.addCount !== false) {
                            trigger.addCount = false;
                            let stat = player.getStat();
                            if (stat && stat.card && stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
                        }
                    }; break;
                    case 1: {
                        player.draw();
                    }; break;
                    case 2: player.gainPlayerCard(Evt.target, 'he'); break;
                    case 3: player.recover(); break;
                }
            }
        }],
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase) {
                    if (get.type(card) != 'basic') {
                        if (player.$.aswusheng == 0) return num - 2;
                        if (player.countCards('hs', { name: 'sha' }) >= 2 && player.$.aswusheng == 1) return num + 10;
                    } else if (get.name(card) != 'sha') {
                        if (player.countCards('hs', { name: 'sha' }) == 1 && player.$.aswusheng == 1) return num + 6;
                    }
                }
            },
        },
        ai: {
            presha: true,
            threaten(player, target) {
                if (player.countCards('hs')) return 0.8;
            },
            skillTagFilter(player) {
                return player.countCards('hs', { name: 'sha' }) > 1 && [0, 2].includes(player.$.aswusheng);
            }
        }
    }, 'mark', 'frequent'),
    gunxun: {
        enable: 'phaseUse',
        init(player, skill) {
            player.$[skill] ||= 1;
        },
        filter(Evt, player) {
            if (player.$.gunxun === 1) return player.countCards('h', card => !card.hasGaintag('ming_') && get.color(card) == 'red');
            return player.countCards('h', card => !card.hasGaintag('ming_') && get.color(card) == 'black');
        },
        selectCard: [1, Infinity],
        filterCard(card, player) {
            if (player.$.gunxun === 1) return !card.hasGaintag('ming_') && get.color(card) == 'red';
            return !card.hasGaintag('ming_') && get.color(card) == 'black';
        },
        check(card) {
            let player = _status.event.player;
            if (player.$.gunxun === 1 && player.countCards('hs', 'sha') < 2) return 6 - get.value(card);
            if (player.$.gunxun === 2 && player.countCards('hs', 'shan') > 1) return 2 - get.value(card);
            return 5 - get.value(card);
        },
        discard: false,
        lose: false,
        content: [() => {
            player.showCards(cards, '『棍训』亮出手牌');
            game.delayx();
        }, () => {
            if (player.$.gunxun === 1) player.addGaintag(cards, 'ming_gunxunsha');
            else player.addGaintag(cards, 'ming_gunxunshan');
            player.$.gunxun = [2, 1][player.$.gunxun - 1];
            player.updateMarks('gunxun')
            let num = cards.length;
            if (game.hasPlayer(cur => cur.countCards('e') < num)) {
                player.chooseTarget(`『棍训』：令装备区牌数少于 ${num} 的一名角色失去所有非锁定技直到回合结束`, function (card, player, target) {
                    return target.countCards('e') < _status.event.num;
                }).set('num', num).set('ai', function (target) {
                    let player = _status.event.player;
                    return -get.$a(player, target) + Math.random();
                })
            }
        }, () => {
            if (result.targets?.length) {
                let target = result.targets[0];
                Evt.target = target;
                if (!target.hasSkill('fengyin')) {
                    target.addTempSkill('fengyin');
                }
            }
        }],
        mod: {
            cardname(card, player) {
                if (card.hasGaintag && card.hasGaintag('ming_gunxunshan')) return 'shan';
                if (card.hasGaintag && card.hasGaintag('ming_gunxunsha')) return 'sha';
            },
        },
        ai: {
            order: 7.5,
            result: { player: 0.5 },
        }
    },
    //嘉然
    quanyu: {
        audio: 6,
        trigger: { global: 'useCard1' },
        clickChange: '休眠',
        clickable(player) {
            if (player.$.quanyu_clickChange === undefined) player.$.quanyu_clickChange = false;
            else player.$.quanyu_clickChange = !player.$.quanyu_clickChange;
        },
        clickableFilter(player) {
            return player.$.quanyu_clickChange !== false;
        },
        filter(Evt, player) {
            if (player.$.quanyu_clickChange === false) return false;
            let suit = get.suit(Evt.card);
            return Evt.cards && Evt.cards.length && suit != 'none' && Evt.player != player && !player.countCards('h', card => suit == get.suit(card));
        },
        check(Evt, player) {
            let handcards = player.getCards('h');
            let num = 4 - get.suit3(handcards).length;
            if (player.hp < num) return false;
            if (['shandian', 'du'].includes(Evt.card.name)) return false;
            if (Evt.targets && Evt.targets.length && get.$a(player, Evt.player) < 0) {
                for (let i = 0; i < Evt.targets.length; i++) {
                    if (get.effect(Evt.targets[i], Evt.card, Evt.player, player) < 0) return true;
                }
            } else {
                return get.$a(player, Evt.player) < 0;
            }
        },
        prompt2(Evt, player) {
            return `你可以获得${get.$t(Evt.player)}使用的${get.$t(Evt.card)}，然后你展示所有手牌，每缺少一种花色便受到1点无来源的伤害。`;
        },
        addDialog(Evt, player) {
            return Evt.cards;
        },
        content: [() => {
            trigger.cancel();
            Evt.cards = trigger.cards;
            Evt.target = trigger.player;
            player.gain(Evt.cards, Evt.target, 'gain2');
        }, () => {
            player.showHandcards('『全域』展示手牌');
            let handcards = player.getCards('h');
            Evt.num = 4 - get.suit3(handcards).length;
        }, () => {
            if (Evt.num > 0) {
                player.damage(Evt.num, 'nosource');
            }
        }],
        ai: {
            expose: 0.2,
        },
    },
    wulian: {
        audio: true,
        enable: 'phaseUse',
        unique: true,
        limited: true,
        filter(Evt, player) {
            return player.isDamaged();
        },
        content: [() => {
            player.$.wulian = true;
            player.awakenSkill('wulian');
            player.draw(player.getDamagedHp() * 2);
        }, () => {
            player.addTempSkill('lianpo', 'roundStart');
        }],
        derivation: 'lianpo',
        ai: {
            order(item, player) {
                if (player.getDamagedHp() >= 3) return 10;
                return 0;
            },
            result: { player: 2 },
        }
    },
    lianpo: {
        audio: 4,
        //audioname:['Diana'],
        trigger: { global: 'phaseAfter' },
        frequent: true,
        onremove: true,
        filter(Evt, player) {
            return player.getStat('kill') > 0;
        },
        content() {
            player.insertPhase();
        },
    },
    //乃琳
    yehua: {
        audio: 3,
        trigger: { player: 'phaseBegin' },
        //frequent:true,
        filter(Evt, player) {
            return !player.isMaxHandcard(true);
        },
        check(Evt, player) {
            let list = game.filterPlayer(cur => {
                return cur.isMaxHandcard();
            }).sortBySeat();
            return (list[0].countCards('h') - player.countCards('h')) >= 1;
        },
        content: [() => {
            let num = 1, list = game.filterPlayer(cur => cur.isMaxHandcard());
            num += (list[0].countCards('h') - player.countCards('h'));
            Evt.cards = get.cards(num);
        }, () => {
            player.gain(Evt.cards, 'draw');
        }, () => {
            player.turnOver();
        }],
    },
    fengqing: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 1;
        },
        trigger: { player: ['linkBegin', 'turnOverBegin'] },
        direct: true,
        filter(Evt, player) {
            return true;
        },
        process(change) {
            switch (change) {
                case 1: return '其下个准备阶段视为使用了【酒】'; break;
                case 2: return '其下个准备阶段视为使用了【桃】'; break;
                case 3: return '其跳过本回合的判定和弃牌阶段'; break;
            }
        },
        content: [() => {
            Evt.change = player.$.fengqing;
            player.chooseTarget(get.$pro('fengqing')).set('ai', function (target) {
                let player = _status.event.player;
                let change = _status.event.change;
                switch (change) {
                    case 1: return get.effect(target, { name: 'jiu' }, target, player) || target == player; break;
                    case 2: return get.effect(target, { name: 'tao' }, target, player); break;
                    case 3: {
                        if (target != _status.currentPhase) return 0;
                        if (target.countCards('j') > 0) return 2 * get.$a(player, target) + Math.random();
                        return get.$a(player, target) + Math.random();
                        break;
                    }
                }
                return get.$a(player, target) + Math.random();
            }).set('prompt2', lib.skill.fengqing.process(Evt.change)).set('change', Evt.change)
        }, () => {
            if (result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('fengqing', Evt.target);
                switch (Evt.change) {
                    case 1: Evt.target.addSkill('fengqing_jiu'); break;
                    case 2: Evt.target.addSkill('fengqing_tao'); break;
                    case 3: {
                        Evt.target.skip('phaseJudge');
                        Evt.target.skip('phaseDiscard');
                        break;
                    }
                }
                player.$.fengqing = (player.$.fengqing == 3) ? 1 : player.$.fengqing + 1;
                player.updateMarks('fengqing')
            }
        }],
        effect: {
            target(card, player, target, current) {
                if (['tiesuo', 'lulitongxin'].includes(card.name)) {
                    return [1, 2];
                }
            },
        },
        subSkill: {
            jiu: {
                audio: 2,
                mark: true,
                intro: {
                    content: '下个准备阶段视为使用了【酒】'
                },
                trigger: { player: 'phaseZhunbeiEnd' },
                forced: true,
                onremove: true,
                popup: '风情-酒',
                audioname: ['EQueen'],
                filter(Evt, player) {
                    return lib.filter.filterCard({ name: 'jiu', isCard: false }, player, Evt);
                },
                content() {
                    player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay');
                    player.removeSkill(Evt.name);
                },
            },
            tao: {
                audio: 2,
                mark: true,
                intro: {
                    content: '下个准备阶段视为使用了【桃】'
                },
                trigger: { player: 'phaseZhunbeiEnd' },
                forced: true,
                onremove: true,
                popup: '风情-桃',
                audioname: ['EQueen'],
                filter(Evt, player) {
                    return true;
                    return lib.filter.filterCard({ name: 'tao', isCard: false }, player, Evt);
                },
                content() {
                    player.chooseUseTarget({ name: 'tao' }, true, 'noTargetDelay');
                    player.removeSkill(Evt.name);
                },
            },
        },
    },
    //珈乐
    huangjia: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = true;
        },
        locked: true,
        notemp: true,
        mark: true,
        marktext: '👠',
        intro: {
            mark(dialog, content, player) {
                dialog.addText('已成为皇珈骑士');
            },
            onunmark(storage, player) {
                if (storage) {
                    storage = undefined;
                }
            },
        },
    },
    shixi: {
        marktext: '时',
        intro: {
            mark(dialog, content, player) {
                dialog.addText('时隙:初始手牌');
                let list = player.$.shixi.slice(0);
                dialog.addSmall(list);
            },
            content: 'cards',
            onunmark(storage, player) {
                if (storage && storage.length) {
                    storage.length = 0;
                }
            },
        },
        trigger: { global: 'phaseLoopBefore', player: 'enterGame' },
        forced: true,
        frequent: true,
        filter(Evt, player) {
            return !player.$.shixi;
        },
        content() {
            let cards = player.getCards('h');
            if (cards.length) {
                if (!player.$.shixi) player.$.shixi = []
                player.showCards(cards, '时隙:记录初始手牌');
                player.$.shixi.addArray(cards);
                player.markSkill('shixi');
            }
        },
        group: ['shixi_mark', 'shixi_draw'],
        subSkill: {
            mark: {
                marktext: '隙',
                intro: {
                    mark(dialog, content, player) {
                        dialog.addText('时隙:已指定');
                        let list = player.$.shixi_mark.slice(0);
                        dialog.addSmall(list);
                    },
                    content: 'cards',
                    onunmark(storage, player) {
                        if (storage && storage.length) {
                            storage.length = 0;
                        }
                    },
                },
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                filter(Evt, player) {
                    let record = player.getStorage('shixi').slice(0);
                    if (!record) return false;
                    let check = cur => (player.$.yuezhi === true && cur.$.huangjia) || cur == player
                    if (Evt.name == 'cardsDiscard' && (Evt.getParent().name != 'orderingDiscard'
                        || (!Evt.getParent().relatedEvent?.player || Evt.getParent().relatedEvent.name == 'judge'
                            || !check(Evt.getParent().relatedEvent.player)))) return false;
                    if (Evt.name == 'lose' && (Evt.position != ui.discardPile
                        || !check(Evt.player))) return false;
                    let list = Evt.cards.filter(card => {
                        if (Evt.js && Evt.js.includes(card)) return false;
                        for (let i = 0; i < record.length; i++) {
                            if (player.$.shixi_mark && player.$.shixi_mark.includes(record[i])) continue;
                            if (get.suit(record[i]) == get.suit(card)) return true;
                        }
                    });
                    return list.length > 0;
                },
                direct: true,
                content: [() => {
                    let record = player.getStorage('shixi').slice(0);
                    let list = trigger.cards.filter(card => {
                        for (let i of record) {
                            if (player.$.shixi_mark && player.$.shixi_mark.includes(i)) continue;
                            if (get.suit(i) == get.suit(card)) return true;
                        }
                    });
                    Evt.record = record;
                    Evt.list = list;
                    Evt.num = 0;
                }, () => {
                    if (Evt.list[Evt.num]) {
                        if (player.$.shixi_mark) Evt.record.removeArray(player.$.shixi_mark);
                        let filterButtons = Evt.record.filter(card => get.suit(Evt.list[Evt.num]) == get.suit(card))
                        if (Evt.record.length) {
                            if (lib.config.autoskilllist.includes('shixi')) {
                                player.chooseButton([`###${get.$pro('shixi')}###选择要指定的牌（与${get.$t(Evt.list[Evt.num])}花色相同）`, Evt.record]).set('filterButton', function (button) {
                                    let card = _status.event.card;
                                    return get.suit(button.link) == get.suit(card);
                                }).set('ai', function (button) {
                                    return get.value(button.link) + 2 * Math.random();
                                }).set('card', Evt.list[Evt.num]);
                            }
                            else if (filterButtons.length) {
                                Evt._result = { bool: true, links: [filterButtons.shift()] };
                            }
                        };
                    }
                }, () => {
                    if (result.bool && result.links) {
                        if (!player.$.shixi_mark) player.$.shixi_mark = [];
                        player.$.shixi_mark.addArray(result.links);
                        player.markSkill('shixi_mark');
                    }
                    Evt.num++;
                    if (Evt.list[Evt.num]) Evt.goto(1);
                }],
            },
            draw: {
                trigger: {
                    global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
                },
                filter(Evt, player) {
                    return player.$.shixi_mark && player.$.shixi_mark.length;
                },
                direct: true,
                content: [() => {
                    Evt.num = Math.floor(player.$.shixi_mark.length / 2);
                }, () => {
                    if (Evt.num > 0) {
                        player.logSkill('shixi');
                        player.draw(Evt.num);
                        player.unmarkSkill('shixi_mark');
                    }
                }],
            },
        }
    },
    xueta: {
        audio: 6,
        trigger: { player: ['useCard', 'respond'] },
        filter(Evt, player) {
            if (player.countCards('he') == 0) return false;
            return Array.isArray(Evt.respondTo) && Evt.respondTo[0] && Evt.respondTo[0] != player;
        },
        direct: true,
        content: [() => {
            Evt.target = trigger.respondTo[0];
            player.chooseToDiscard('he', get.$pro2('xueta'))
                .set('ai', card => {
                    if (!_status.event.check) return 1 - get.value(card);
                    return 8 - get.value(card);
                })
                .set('logSkill', ['xueta', Evt.target, 'fire'])
                .set('check', (get.$a(player, Evt.target) > 0 || !Evt.target.$.yuezhi));
        }, () => {
            if (result.bool && result.cards && result.cards.length) {
                Evt.target.draw(2);
                Evt.target.addSkill('huangjia');
            }
        }],
        ai: {
            effect: {
                target(card, player, target) {
                    if (!player.$.huangjia) {
                        if (get.$a(player, target) > 0 && get.$a(target, player) > 0) {
                            if (get.tag(card, 'respondShan') && target.countCards('hs', 'shan') && target.countCards('he') > target.countCards('h', 'shan')) {
                                return [1, 2, 1, 1];
                            }
                            if (get.tag(card, 'respondSha') && target.countCards('hs', 'sha') && target.countCards('he') > target.countCards('h', 'sha')) {
                                if (card.name == 'juedou') return;
                                return [1, 2, 1, 1];
                            }
                        }
                    }
                }
            }
        }
    },
    yuezhi: {
        audio: true,
        skillAnimation: true,
        animationStr: '音乐珈',
        unique: true,
        juexingji: true,
        forced: true,
        trigger: { player: 'phaseBegin' },
        filter(Evt, player) {
            let num = game.countPlayer(cur => cur.$.huangjia === true);
            return num >= player.hp || num >= player.countCards('h');
        },
        content: [() => {
            player.$.yuezhi = true;
            player.gainMaxHp();
            player.awakenSkill('yuezhi');
            player.updateMarks('yuezhi')
        }, () => {
            let record = player.$.shixi.slice(0);
            record.forEach(card => {
                if (get.position(card, true) == 'd') player.gain(card, 'draw');
                else {
                    player.recover();
                    player.draw(2);
                }
                game.delay(0.4);
            })
        }],
        ai: {
            combo: 'shixi'
        }
    },
    //向晚
    yiqu: {
        trigger: { global: ['chooseTargetAfter', 'chooseCardTargetAfter', 'chooseUseTargetAfter', 'useSkillAfter'] },
        frequent: true,
        filter(Evt, player) {
            if (Evt.player == player) return false;
            let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
            if (!info || info.equipSkill || info.ruleSkill) return false;
            let result = Evt.result, targets = [];
            if (Evt.name == 'useSkill') targets = Evt.targets || [Evt.target];
            else if (!result || result.bool != true) return false;
            else {
                targets = result.targets.slice(0);
            }
            return lib.translate[`${name}_info`] && !player.hasSkill(name) && targets.includes(player);
        },
        prompt2(Evt, player) {
            let name = lib.skill.yiqu.process(Evt);
            return `你可以获得『${get.$t(name)}』，直到下次进入濒死状态`;
        },
        process(Evt) {
            let name = Evt.skill || Evt.getParent().name;
            if (name.length > 3) {
                let index = name.indexOf('_', 4);
                if (index > 3) name = name.substring(0, index);
            }
            return name;
        },
        content() {
            let name = lib.skill.yiqu.process(trigger);
            player.flashAvatar('yiqu', get.name(trigger.player));
            player.addSkillLog(name);
            player.addAdditionalSkill('yiqu', name, true);
        },
        group: 'yiqu_beDying',
        subSkill: {
            beDying: {
                trigger: { player: 'dyingBefore' },
                forced: true,
                filter(Evt, player) {
                    return player.additionalSkills['yiqu'];
                },
                content() {
                    player.removeAdditionalSkill('yiqu');
                }
            }
        }
    },
    wanxian: {
        audio: 2,
        trigger: { global: 'dying' },
        forced: true,
        check() {
            return false;
        },
        filter(Evt, player) {
            return Evt.player != player && Evt.reason && Evt.reason.source && player == Evt.parent.source
                && player.additionalSkills['yiqu'] && player.additionalSkills['yiqu'].length;
        },
        content: [() => {
            Evt.num = player.additionalSkills['yiqu'].length;
            player.removeAdditionalSkill('yiqu');
        }, () => {
            player.draw(Evt.num);
        }],
        ai: {
            combo: 'yiqu',
        },
    },
    zouhun: new toSkill('active', {
        usable: 1,
        content: function () {
            'step 0'
            player.chooseToPlayBeatmap({
                //歌曲名称
                name: 'Quiet',
                //歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式 并将文件名重命名为和上面的歌曲名称相同）
                filename: 'music_Quiet',
                //每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
                timeleap: [1047, 3012, 4978, 5469, 5961, 6452, 6698, 7435, 8909, 10875, 12840],
                //开始播放时间的偏移量（毫秒）
                current: -546,
                //判定栏高度（相对整个对话框高度比例）
                judgebar_height: 0.14,
                //Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
                range1: [86, 110],
                range2: [92, 104],
                range3: [96, 100],
                //滑条每相对于整个对话框下落1%所需的时间（毫秒）
                speed: 30,
            });
            'step 1'
            console.log(result)
            let score = Math.floor(Math.min(4, result.accuracy / 25));
            Evt.score = score;
            game.log(player, '的演奏评级为', '#y' + result.rank[0], '，获得积分点数', '#y' + score, '分');
            player.draw(score)
        },
        ai: {
            order: 10,
            result: {
                player: 1,
            },
        },
    }),
    //阿梓
    juehuo: new toSkill('mark', {
        marktext: '绝',
        intro: {
            mark(dialog, content, player) {
                let ms = player.getExpansions('juehuo_ms'),
                    ans = player.getExpansions('juehuo_ans')
                if (player.$.juehuo.length !== (ms.length + ans.length)) {
                    player.$.juehuo = [...ms, ...ans]
                }
                if (player.$.juehuo.length) {
                    if (ms.length) {
                        dialog.addText('明置绝活');
                        dialog.addSmall(ms);
                    }
                    if (ms.length) {
                        if (player.isUnderControl(true)) {
                            dialog.addText('暗置绝活');
                            dialog.addSmall(ms);
                        } else {
                            dialog.addText(`暗置绝活（${get.cnNumber(ms.length)}张）`);
                        }
                    }
                }
                else {
                    dialog.addText('没有绝活');
                }
            },
        },
        onremove: function (player, skill) {
            let cards = [...player.getExpansions('juehuo_ans'), ...player.getExpansions('juehuo_ms')];
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked', 'cardAround').setI([]),
    zhiyue: new toSkill('trigger', {
        audio: 8,
        frequent: true,
        filter(Evt, player) {
            if (player.$.juehuo.length) {
                let card = Evt.card,
                    list1 = player.getExpansions('juehuo_ans'), list2 = player.getExpansions('juehuo_ms');
                for (let i of list1) {
                    if (get.type2(i) == get.type2(card)) return true;
                }
                for (let i of list2) {
                    if (get.suit(i) == get.suit(card)) return true;
                }
            }
            return false;
        },
        content: [() => {
            Evt.card = trigger.card;
            let list1 = player.getExpansions('juehuo_ans'), list2 = player.getExpansions('juehuo_ms')
            let list: Dialogword = ['『指月』：选择绝活翻面'];
            if (list1.length) {
                list.push('暗置绝活');
                list.push([list1, 'card']);
            }
            if (list2.length) {
                list.push('明置绝活');
                list.push([list2, 'card']);
            }
            list.push('hidden');
            Evt.list1 = list1;
            Evt.list2 = list2;
            let next = player.chooseButton(list)
                .set('selectButton', [1, Math.min(6, list1.length + list2.length)])
                .set('filterButton', function (button) {
                    let card = _status.event.card, evt = _status.event.getParent(),
                        now = button.link, selected = ui.selected.buttons;
                    if (evt.list1.length && evt.list1.includes(now)) {
                        if (selected.length) {
                            if (evt.list1.filter(i => selected.includes(i)).length >= 3) return false
                        }
                        return get.type2(now) == get.type2(card);
                    }
                    if (evt.list2.length && evt.list2.includes(now)) {
                        if (selected.length) {
                            if (evt.list2.filter(i => selected.includes(i)).length >= 3) return false
                        }
                        return get.suit(now) == get.suit(card);
                    }
                })
                .set('card', Evt.card);
        }, () => {
            if (result.bool && result.links?.length) {
                let cards1 = result.links.filter(card => Evt.list1.includes(card)),
                    cards2 = result.links.filter(card => Evt.list2.includes(card));
                Evt.cards = [...cards1, ...cards2]
                if (cards2.length) {
                    player.draw(cards2.length);
                }
                lib.skill.zhiyue.process(player, Evt.cards);
                game.delayx(1.5);
            }
        }],
        process(player, cards) {
            let storage = player.$.juehuo,
                toMs = [], toAns = [], toDraw = [];
            for (let i of storage) {
                if (!player.getExpansions('juehuo_ans').includes(i)
                    && !player.getExpansions('juehuo_ms').includes(i)) {
                    storage.remove(i)
                }
            }
            for (let card of cards) {
                if (storage.includes(card)) {
                    if (player.getExpansions('juehuo_ans').includes(card)) {
                        player.lose(card, ui.special)
                        toMs.push(card)
                    }
                    else if (player.getExpansions('juehuo_ms').includes(card)) {
                        player.lose(card, ui.special)
                        toAns.push(card)
                    }
                }
                else {
                    toDraw.push(card)
                    storage.push(card)
                }
            }
            if (toMs.length) {
                player.$give(toMs, player, false)
                player.addToExpansion(toMs, 'log').gaintag.add('juehuo_ms');
            }
            if (toAns.length) {
                player.$giveAuto(toAns, player, false)
                player.addToExpansion(toAns).gaintag.add('juehuo_ans');
            }
            if (toDraw.length) {
                player.addToExpansion('draw', toDraw).gaintag.add('juehuo_ans');
            }
            player.markSkill('juehuo')
        },
        ai: {
            threaten: 1.5
        },
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player.$.juehuo) {
                    let suit = get.suit(card), type = get.type2(card), ans = player.getExpansions('juehuo_ans'), ms = player.getExpansions('juehuo_ms');
                    for (let i = 0; i < ans.length; i++) {
                        if (get.type2(ans[i]) == type) return num + 6;
                    }
                    for (let i = 0; i < ms.length; i++) {
                        if (get.suit(ms[i]) == suit) return num + 3;
                    }
                }
            },
        },
        group: ['juehuo', 'zhiyue_start', 'zhiyue_lose'],
        subSkill: {
            start: new toSkill('trigger', {
                priority: 10,
                trigger: {
                    global: 'gameStart',
                    player: 'enterGame',
                },
                content() {
                    Evt.cards = get.cards();
                    game.playAudio('skill', 'zhiyue0');
                    lib.skill.zhiyue.process(player, Evt.cards);
                },
            }, 'direct'),
            lose: new toSkill('trigger', {
                priority: 10,
                trigger: {
                    player: ['loseAfter', 'gainAfter'],
                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                },
                filter(Evt, player) {
                    let evt = Evt.getl(player);
                    if (!evt || !evt.xs || !evt.xs.length || player.getExpansions('juehuo_ans').length > 0) return false;
                    for (let i in evt.gaintag_map) {
                        if (evt.gaintag_map[i].includes('juehuo_ans')) return true;
                    }
                    return false;
                },
                content() {
                    Evt.cards = get.cards();
                    lib.skill.zhiyue.process(player, Evt.cards);
                },
            }, 'direct')
        }
    }).setT('useCardEnd'),
    zhengniu: new toSkill('trigger', {
        audio: 4,
        filter(Evt, player) {
            if (!Evt.source || get.itemtype(Evt.source) != 'player' || Evt.source == player) return false;
            if (player.$.juehuo.length) {
                if (Evt.name == 'link') return !player.isLinked();
                return Evt.num > 0
            }
        },
        content: [() => {
            Evt.target = trigger.source;
            let check = get.$a(player, Evt.target) > 0,
                list1 = player.getExpansions('juehuo_ans'),
                list2 = player.getExpansions('juehuo_ms')
            let list: Dialogword = [`###${get.$pro('zhengniu')}###选择交给${get.$t(Evt.target)}的绝活`];
            if (list1.length) {
                list.push('暗置绝活');
                list.push([list1, 'card']);
            }
            if (list2.length) {
                list.push('明置绝活');
                list.push([list2, 'card']);
            }
            list.push('hidden');
            player.chooseButton(list).set('filterButton', function (button) {
                return true;
            }).set('selectButton', [1, Infinity]).set('ai', function (button) {
                if (!_status.event.check) return -1;
                let evt = _status.event.getParent();
                if (evt.list1.includes(button.link)) return get.value(button.link) + 2;
                return get.value(button.link) - 2;
            }).set('check', check);
        }, () => {
            if (result.bool && result.links) {
                player.logSkill('zhengniu', Evt.target);
                player.$.juehuo.removeArray(result.links);
                Evt.target.gain(result.links, player, 'give', 'log', 'fromStorage');
                player.markSkill('juehuo')
            }
        }],
    }, 'direct').setT(['linkBefore', 'recoverBefore', 'drawBefore']),
    //勺宝
    juxiao: {
        trigger: { player: 'damageEnd' },
        filter(Evt, player) {
            return true;
        },
        frequent: true,
        content: [() => {
            player.chooseTarget([1, 2], true, '###『句销』：令至多两名角色各摸一张牌###摸牌的角色不能使用【杀】直到回合结束').set('ai', function (target) {
                let att = get.$a(_status.event.player, target);
                if (target == _status.currentPhase && (target.hasSha() || target.hasSkillTag('useSha'))) {
                    if (target.hasS) return 2 - att;
                }
            })
        }, () => {
            if (result.bool && result.targets?.length) {
                player.logSkill('juxiao', result.targets);
                game.asyncDraw(result.targets);
                result.targets.forEach(function (tar) {
                    tar.addTempSkill('juxiao_xiao');
                })
            }
        }],
        subSkill: {
            xiao: {
                mark: true,
                intro: {
                    content: '无法使用杀直到回合结束'
                },
                mod: {
                    cardEnabled(card) {
                        if (card.name == 'sha') return false;
                    }
                }
            }
        },
        ai: {
            expose: 0.1,
            threaten: 0.8,
            maixie: true,
        }
    },
    shshenyan: {
        audio: 6,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards();
        },
        content: [() => {
            player.showHandcards();
            game.delayx();
            if (!player.$.shshenyan) player.$.shshenyan = [];
        }, () => {
            player.chooseCard('h', '『神言』:弃置一种牌名的牌', true).set('ai', card => {
                if (['sha'].includes(card.name)) return 5;
                if (!['sha', 'tao'].includes(card.name) && get.type(card) == 'basic') return 6 - get.value(card);
                return 1;
            });
        }, () => {
            if (result.bool && result.cards) {
                Evt.cname = get.name(result.cards[0]);
                Evt.discard = player.discard(player.getCards('h', Evt.cname));
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.discard.cards) {
                let cards = Evt.discard.cards;
                cards.forEach(card => {
                    player.$.shshenyan.add(get.suit(card));
                });
                player.draw(cards.length)
            } else {
                Evt.finish();
            }
        }, () => {
            if (player.$.shshenyan) {
                if (!player.hasSkill('shshenyan_mark')) player.addTempSkill('shshenyan_mark', 'phaseUseAfter');
                player.markSkill('shshenyan_mark');
                let num = player.$.shshenyan.length;
                let list = get.inpile('trick', name => get.$t(name).length === num).map(i => ['锦囊', '', i]);
                if (list.length) {
                    player.chooseButton([`『神言』：是否选择一张长度${num}的锦囊牌视为使用之？`, [list, 'vcard'], 'hidden']).set('ai', function (button) {
                        let card = { name: button.link[2] }, value = get.value(card);
                        return value;
                    });
                }
            }
        }, () => {
            if (result.bool && result.links?.length) {
                player.chooseUseTarget({ name: result.links[0][2] }, true);
            } else {
                if (Evt.cname == 'sha') {
                    let next = game.createEvent('resetSkill');
                    [next.player] = [player]
                    next.setContent(function () {
                        player.popup('重置');
                        game.log(player, '重置了『神言』');
                        player.getStat('skill').shshenyan--;
                    });
                }
            }
        }],
        subSkill: {
            mark: {
                marktext: "言",
                locked: true,
                intro: {
                    name: '神言',
                    content(storage, player, skill) {
                        if (player.$.shshenyan.length) {
                            return '本阶段『神言』的弃置花色：' + get.$t(player.$.shshenyan);
                        }
                    },
                },
                onremove(player) {
                    player.$.shshenyan.length = 0;
                },
            }
        },
        ai: {
            order: 6,
            result: {
                player: 1,
            },
        },
    },
    //轴伊Joi
    pianxin: new toSkill('trigger', {
        filter(Evt, player) {
            let evt = Evt.getl(player);
            return evt && (evt.hs.length || evt.es.length) && Evt.player.countCards('hej')
        },
        content: [() => {
            Evt.tar = trigger.player
            player.moveCard(`###${get.$pro('pianxin')}###可以${get.$t(Evt.tar)}区域内的一张牌`, function (card, player, target) {
                if (!ui.selected.targets.length) {
                    return target === _status.event.getParent().presource;
                }
                else {
                    return true;
                }
                return false;
            })
                .set('presource', Evt.tar)
                .set('moveHandcard', true)
                .set('logSkill', ['pianxin', Evt.tar])
        }, () => {
            if (result.bool && result.targets?.length) {
                if (result.position !== 'h' || Evt.tar.group === player.group) {
                    player.draw()
                }
            }
        }],
        ai: {
            expose: 0.1,
            threaten: 1.1,
        }
    }, 'direct').setT({ global: 'gainAfter' }),
    yuancheng: new toSkill('trigger', {
        round: 1,
        filter(Evt, player) {
            return Evt.num > 0 && Evt.player !== player && _status.gameDrawed;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) && Evt.num > 1;
        },
        logTarget: 'player',
        content: [() => {
            trigger.cancel()
            Evt.num = trigger.num
            Evt.tar = trigger.player
            if (!player.$.yuancheng.includes(Evt.tar) || Evt.tar.group !== player.group) {
                Evt.num++
                player.$.yuancheng.push(Evt.tar)
            }
        }, () => {
            player.draw(Evt.num)
            game.delayx()
        }, () => {
            player.chooseCard(Evt.num, 'he', true, `『源承』：交给${get.$t(Evt.tar)}${get.cnNumber(Evt.num)}张牌`)
        }, () => {
            if (result.bool && result.cards) {
                Evt.cards = result.cards.slice(0)
                player.give(Evt.cards, Evt.tar)
            }
        }],
        ai: {
            expose: 0.1,
            threaten: 1.1,
        },
    }, 'lastDo').setT({ global: 'drawBegin' }).setI([]),
    //三三
    zhezhuan: {
        enable: 'chooseToUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he', { type: ['trick', 'delay'] }) >= 1;
        },
        hiddenCard(player, name) {
            if (typeof lib.card[name].yingbian_prompt != 'string') return false;
            return name != 'du' && get.type(name) == 'basic' && player.countCards('he', { type: ['trick', 'delay'] });
        },
        chooseButton: {
            dialog(Evt, player) {
                let dialog = ui.create.dialog('辙转', 'hidden');
                dialog.add('应变标签');
                let table = document.createElement('div');
                let list0 = ['yingbian_kongchao', 'yingbian_canqu', 'yingbian_fujia', 'yingbian_zhuzhan'];
                table.classList.add('add-setting');
                table.style.margin = '0';
                table.style.width = '100%';
                table.style.position = 'relative';
                for (let i of list0) {
                    let td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                    td.innerHTML = `<span>${get.$t(`${i}_tag`)}</span>`;
                    td.link = i;
                    td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                    for (let j in lib.element.button) {
                        td[j] = lib.element.button[i];
                    }
                    table.appendChild(td);
                    dialog.buttons.add(td);
                }
                dialog.content.appendChild(table);
                dialog.add('卡牌转换');
                let list1 = [];
                for (let i = 0; i < lib.inpile.length; i++) {
                    let name = lib.inpile[i];
                    if (name == 'du') continue;
                    if (!lib.card[name].yingbian_prompt) continue;
                    if (name == 'sha') {
                        list1.push(['基本', '', 'sha']);
                        list1.push(['基本', '', 'sha', 'fire']);
                    } else if (get.type(name) == 'trick') {
                        if (!player.countCards('h', { name: name })) continue;
                        list1.push(['锦囊', '', name]);
                    } else if (get.type(name) == 'basic') {
                        list1.push(['基本', '', name])
                    };
                }
                dialog.add([list1, 'vcard']);
                return dialog;
            },
            filter(button, player) {
                if (ui.selected.buttons.length && typeof button.link == typeof ui.selected.buttons[0].link) return false;
                if (typeof button.link == 'object') {
                    let evt = _status.event.getParent(), name = button.link[2];
                    if (evt.filterCard && typeof evt.filterCard == 'function') {
                        return evt.filterCard({ name: name, isCard: true }, player);
                    }
                    return lib.filter.filterCard({ name: name, isCard: true }, player, evt);
                }
                return true;
            },
            select: 2,
            check(button) {
                let player = _status.event.player;
                if (typeof button.link == 'string') {
                    switch (button.link) {
                        case 'yingbian_kongchao': return 4.5; break;
                        case 'yingbian_canqu': return player.hp == 1; break;
                        case 'yingbian_fujia': return 4.3; break;
                        case 'yingbian_zhuzhan': return (3 - player.hp) * 1.5; break;
                    }
                }
                let name = button.link[2], evt = _status.event.getParent();
                if (get.type(name) == 'basic') {
                    if (name == 'shan') return 2;
                    if (evt.type == 'dying') {
                        if (get.$a(player, evt.dying) < 2) return false;
                        return 1.9;
                    }
                    if (evt.type == 'phase') return player.getUseValue({ name: name, nature: button.link[3], isCard: true });
                    return 1;
                }
                let effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup(links, player) {
                if (typeof links[1] == 'string') links.reverse();
                let yingbian = [links[0], ['yingbian_damage', 'yingbian_gain'].randomGet()];
                let name = links[1][2], nature = links[1][3];
                return {
                    filterCard(card, player) {
                        if (get.type2(card) != 'trick') return false;
                        if (get.type2(name) == 'trick') return get.name(card) == name;
                        return true;
                    },
                    selectCard: 1,
                    yingbian: yingbian,
                    viewAs: {
                        cardid: get.id(),//
                        name: name,
                        nature: nature,
                        isCard: true,
                    },
                    popname: true,
                    precontent() {
                        player.logSkill('zhezhuan');
                        let yingbian = lib.skill.zhezhuan_backup.yingbian;
                        _status.cardtag[yingbian[0]].add(Evt.result.card.cardid);
                        _status.cardtag[yingbian[1]].add(Evt.result.card.cardid);
                    },

                }
            },
            prompt(links, player) {
                if (typeof links[1] == 'string') links.reverse();
                let yingbian = links[0], name = links[1][2], nature = links[1][3];
                return `视为使用一张带有${get.$t(`${yingbian}_tag`)}标签的${get.$t(nature) || ''}【${get.$t(name)}】`;
            },
        },
        ai: {
            order: 12,
            result: {
                player: 1
            },
            threaten: 1.5
        },
        group: 'zhezhuan_clear',
        subSkill: {
            clear: {
                trigger: { player: 'useCard1' },
                forced: true,
                popup: false,
                firstDo: true,
                priority: 333,
                content() {
                    if (_status.cardtag.yuzu && _status.cardtag.yuzu.length) delete _status.cardtag.yuzu;
                }
            }
        }
    },
    setu: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he') >= 1;
        },
        filterCard(card) {
            let num = 0;
            for (let i of ui.selected.cards) {
                num += get.number(i);
            }
            return get.number(card) + num < 18;
        },
        discard: false,
        lose: false,
        complexCard: true,
        selectCard: [1, Infinity],
        check(card) {
            if (get.number(card) <= 2) return 2 + get.number(card) - get.value(card);
            return 7 - get.value(card);
        },
        content: [() => {
            player.addToExpansion(cards, 'give', player).gaintag.add('setu_mark');
        }, () => {
            let setus = player.getExpansions('setu_mark');
            Evt.num = setus.length;
            let num = 1;
            for (let i of setus) {
                num *= get.number(i);
            }
            if (num > 100) Evt.going = true;
            if (Evt.going === true) {
                player.discard(player.getExpansions('setu_mark'));
                player.draw(Evt.num);
            }
            else Evt.finish()
        }, () => {
            if (Evt.going === true) {
                player.chooseTarget('『涩涂』：对一名角色造成一点伤害', true).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.damageEffect(target, player, player);
                });
            }
            else Evt.finish()
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                Evt.target.damage('nocard');
            }
        }],
        ai: {
            order: 7.5,
            result: {
                player: 1,
            },
            threaten: 1.5
        },
        group: 'setu_mark',
        subSkill: {
            mark: new toSkill('mark', {
                intro: {
                    name: '涩涂',
                    content: 'expansion',
                    markcount: 'expansion',
                },
                onremove: function (player, skill) {
                    let cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            }, 'locked'),
        }
    }),
    //樱井
    junxu: {
        trigger: { player: 'useCard' },
        frequent: true,
        filter(Evt, player) {
            return player.getHistory('useCard').length == player.hp;
        },
        content() {
            player.chooseDrawRecover(2, 1, true, function () {
                if (player.hp == 1 && player.isDamaged()) return 'recover_hp';
                if (_status.event.check) return 'draw_card';
                if (player.isDamaged() && player.isPhaseUsing() && player.countCards('hs', card => {
                    return player.getUseValue({ name: 'sha', isCard: true }) > 0;
                }) >= 2) return 'recover_hp';
                return 'draw_card';
            }).set('check', get.tag(trigger.card, 'recover') >= 1 && trigger.targets.includes(player));
        },
        ai: {
            threaten: 1.5,
            noShan: true,
            skillTagFilter(player, tag, arg) {
                if (tag == 'noShan') {
                    if (player.isHealthy()) return true;
                    return false;
                }
            },
        }
    },
    jingniang: {
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.countCards('he');
        },
        filterCard: true,
        check(card) {
            if (get.name(card) == 'sha') return 1 - get.value(card);
            return 7 - get.value(card);
        },
        content() {
            player.addTempSkill('jingniang_addDamBy');
            player.addMark('jingniang');
        },
        intro: {
            name: '醉酒',
            content: 'mark'
        },
        position: 'he',
        marktext: '酿',
        subSkill: {
            addDamBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.card && Evt.card.name == 'sha' && player.countMark('jingniang');
                },
                content() {
                    trigger.baseDamage += player.countMark('jingniang');
                    if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        if (player.stat[player.stat.length - 1].card.sha > 0) {
                            player.stat[player.stat.length - 1].card.sha--;
                        }
                    }
                },
                onremove(player, skill) {
                    player.removeMark('jingniang', player.countMark('jingniang'), false);
                },
            }, 'forced').setT('useCard1'),
        },
        ai: {
            order: 4,
            result: {
                player(player, target) {
                    if (player.getUseValue({ name: 'sha', isCard: true }) > 0 && player.countCards('hs', 'sha') >= 2) {
                        return 1;
                    }
                },
            },
            threaten: 1.2
        }
    },
    //宇佐纪诺诺
    tuhui: {
        group: ['tuhuiA', 'tuhuiB'],
    },
    tuhuiA: {
        trigger: { source: 'damageEnd' },
        round: 1,
        filter(Evt, player) {
            return Evt.player.isIn() && Evt.player != player;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        logTarget: 'player',
        content: [() => {
            Evt.targets = [player];
            Evt.targets.add(trigger.player);
            if (!player.$.fuyou && Evt.targets.length > 1) {
                player.chooseTarget('选择一名角色回复体力', true, function (card, player, target) {
                    return _status.event.pretargets.includes(target)
                })
                    .set('ai', get.$a2)
                    .set('pretargets', Evt.targets);
            }
        }, () => {
            if (!player.$.fuyou && Evt.targets.length > 1) {
                Evt.targets = result.targets.slice(0)
            }
        }, () => {
            Evt.target = Evt.targets.shift();
            Evt.recover = Evt.target.recover();
        }, () => {
            if (!Evt.recover.result) {
                Evt.target.draw(2);
            }
            if (Evt.targets.length) {
                game.delayx();
                Evt.goto(2);
            }
        }],
        ai: {
            threaten: 1.6,
            effect: {
                player(card, player, target, current) {
                    if (get.tag(card, 'damage') == 1 && !player.hasMark('tuhuiA_roundcount') && !target.hujia && target.hp > 1 && get.$a(player, target) > 0) {
                        if (target != player) {
                            if (target.hasSkillTag('maixie'))
                                return [1, 1, 0, 3];
                            return [1, 1, 0, 0.5];
                        }
                    }
                }
            }
        }
    },
    tuhuiB: {
        trigger: { player: 'damageEnd' },
        round: 1,
        filter(Evt, player) {
            return Evt.source && Evt.source.isIn() && Evt.source != player;
        },
        check(Evt, player) {
            return get.$a(player, Evt.source) > 0;
        },
        logTarget: 'source',
        content: [() => {
            Evt.targets = [player];
            Evt.targets.add(trigger.source);
            if (!player.$.fuyou && Evt.targets.length > 1) {
                player.chooseTarget('选择一名角色回复体力', true, function (card, player, target) {
                    return _status.event.pretargets.includes(target)
                })
                    .set('ai', get.$a2)
                    .set('pretargets', Evt.targets);
            }
        }, () => {
            if (!player.$.fuyou && Evt.targets.length > 1) {
                Evt.targets = result.targets.slice(0)
            }
        }, () => {
            Evt.target = Evt.targets.shift();
            Evt.recover = Evt.target.recover();
        }, () => {
            if (!Evt.recover.result) {
                Evt.target.draw(2);
            }
            if (Evt.targets.length) {
                game.delayx();
                Evt.goto(2);
            }
        }],
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.tag(card, 'damage') == 1 && !target.hasMark('tuhuiB_roundcount') && !target.hujia && target.hp > 1 && get.$a(target, player) > 0) {
                        if (target != player) return [0, 0, 1, 1];
                    }
                }
            }
        }
    },
    fuyou: {
        audio: true,
        enable: 'phaseUse',
        unique: true,
        limited: true,
        content: [() => {
            player.$.fuyou = true;
            player.awakenSkill('fuyou');
            player.setAvatar('UsakiNono', 'UsakiNono')
        }, () => {
            let roundname = 'tuhuiA_roundcount';
            if (player.hasMark(roundname)) {
                player.draw(3)
                Evt.drawn = true
                player.popup('重置');
                let next = game.createEvent('resetSkill');
                [next.player, next.resetSkill] = [player, 'tuhuiA']
                next.setContent('resetRound');
                game.delayx();
            }
        }, () => {
            let roundname = 'tuhuiB_roundcount';
            if (player.hasMark(roundname)) {
                if (!Evt.drawn) {
                    player.draw(3)
                    Evt.drawn = true
                }
                player.popup('重置');
                let next = game.createEvent('resetSkill');
                [next.player, next.resetSkill] = [player, 'tuhuiB']
                next.setContent('resetRound');
                game.delayx();
            }
        }, () => {
            game.filterPlayer(cur => {
                cur.addTempSkill('fuyou2');
            });
            game.delayx();
        }],
        ai: {
            order(item, player) {
                if (player.hp >= 3 && game.countPlayer(cur => {
                    return get.$a(player, cur) < 0 && cur.hp <= 1;
                })) return 10;
                return 0;
            },
            result: { player: 1 },
        },
        group: 'fuyou_put',
        subSkill: {
            put: new toSkill('rule', {
                content: [() => {
                    player.setAvatar('UsakiNono', 'UsakiNono1')
                }]
            }, 'forced').setT({
                global: 'gameStart',
                player: 'enterGame',
            })
        }
    },
    fuyou2: new toSkill('mark', {
        marktext: '幼',
        intro: {
            name: '复幼',
            content: '无法回复体力',
        },
        trigger: {
            player: 'recoverBegin'
        },
        content() {
            trigger.cancel();
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.tag(card, 'recover')) return 'zeroplayertarget';
                }
            }
        }
    }, 'mark', 'forced'),
    //莱妮娅Rynia
    yinxu: new toSkill('regard', {
        hiddenCard(player, name) {
            if (name == 'sha' && lib.inpile.includes(name)) {
                if (player.$.yinxu == true) return player.countCards('h', { type: ['trick', 'delay'] });
                if (player.$.yinxu == false) return player.countCards('h', { type: 'equip' });
            }
        },
        enable: ['chooseToUse'],
        filter(Evt, player) {
            return lib.inpile.includes('sha');
        },
        filterCard(card, player) {
            if (!player.$.yinxu) return get.type(card) == 'equip';
            return get.type2(card) == 'trick';
        },
        selectCard: 1,
        check(card) {
            return 6 - get.value(card);
        },
        position: 'hes',
        viewAs: { name: 'sha' },
        onuse(result, player) {
            player.$.yinxu = !player.$.yinxu;
            player.updateMarks('yinxu')
        },
        mod: {
            targetInRange(card, player, target) {
                if (_status.event.skill == 'yinxu') return true;
            },
            cardUsable(card, player, num) {
                if (_status.event.skillBy == 'yinxu' || _status.event.skill == 'yinxu') return Infinity;
            },
        },
        ai: {
            useSha: 1,
            result: { player: 1 },
        },
        group: 'yinxu_shaMiss',
        subSkill: {
            shaMiss: {
                trigger: { player: 'shaMiss' },
                direct: true,
                filter(Evt, player) {
                    return Evt.skill == 'yinxu';
                },
                content: [() => {
                    player.chooseTarget(`『吟虚』：令你或${get.$t(trigger.target)}调整手牌至上限`, function (card, player, target) {
                        if (![player, _status.event.target0].includes(target)) return false;
                        return target.getHandcardLimit() != target.countCards('h');
                    }, function (target) {
                        let player = _status.event.player;
                        return (target.getHandcardLimit() - target.countCards('h')) * get.$a(player, target);
                    }).set('target0', trigger.target);
                }, () => {
                    if (result.bool) {
                        Evt.target = result.targets[0];
                        player.logSkill('yinxu', Evt.target);
                        let num = Evt.target.getHandcardLimit() - Evt.target.countCards('h')
                        if (num > 0) {
                            Evt.target.draw(num);
                        } else if (num < -0) {
                            Evt.target.chooseToDiscard(-num, true);
                        }
                    }
                }],
            }
        }
    }).setI(true),
    //艾瑞思
    maozhi: {
        enable: 'phaseUse',
        filter(Evt, player) {
            if (player.hasSkill('maozhi_used')) return false;
            return player.countCards('he') > 0;
        },
        filterCard(card) {
            for (let i = 0; i < ui.selected.cards.length; i++) {
                if (get.type2(card) == get.type2(ui.selected.cards[i])) return false;
            }
            return true;
        },
        check(card) {
            if (ui.selected.cards.length) return 7 - get.value(card);
            return 5 - get.value(card);
        },
        complexCard: true,
        selectCard: 2,
        position: 'he',
        filterTarget(card, player, target) {
            return target != player;
        },
        discard: true,
        content: [() => {
            Evt.suits = get.suit3(cards);
            if (get.color3(cards).length <= 1) player.addTempSkill('maozhi_used');
        }, () => {
            if (Evt.suits.includes('heart')) {
                target.loseHp();
                target.draw(3);
                game.delay(0.5);
            }
        }, () => {
            if (Evt.suits.includes('diamond')) {
                if (target.hasUseTarget('sha')) {
                    target.chooseUseTarget('sha', true, false, '『茆织』：视为使用一张【杀】');
                    game.delay(0.5);
                }
            }
        }, () => {
            if (Evt.suits.includes('spade')) {
                target.showHandcards('『茆织』展示手牌');
                target.link(true);
                game.delay(0.5);
            }
        }, () => {
            if (Evt.suits.includes('club')) {
                target.chooseCard('he', [3, Infinity], true, '『茆织』：重铸至少三张牌').ai = get.unuseful3;
                game.delay(0.5);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards) {
                target.lose(result.cards, ui.discardPile).set('visible', true);
                target.$throw(result.cards);
                game.log(target, '将', result.cards, '置入了弃牌堆');
                target.draw(result.cards.length);
            }
        }],
        ai: {
            order: 2,
            result: {
                target(player, target) {
                    let cards = ui.selected.cards;
                    let suits = get.suit3(cards);
                    if (target.hp == 1 && suits.includes('heart')) return -1;
                    let result = 0;
                    if (suits.includes('heart')) {
                        if (target.countCards('h') < 3) result += 1;
                        else result -= 0.2;
                    }
                    if (suits.includes('diamond')) {
                        result += target.getUseValue({ name: 'sha' }) / 2;
                    }
                    if (suits.includes('spade')) {
                        if (!target.isLinked()) result -= 0.5;
                    }
                    if (suits.includes('club')) {
                        if (target.countCards('h') < 3) result -= 0.2;
                        else result += 1;
                    }
                    return result;
                }
            }
        },
        subSkill: {
            used: {}
        }
    },
    baifei: {
        marktext: '妃',
        intro: {
            name: '已发动『拜妃』的目标角色',
            mark(dialog, storage, player) {
                if (storage && storage.length) {
                    let name = storage.map(cur => get.name(cur));
                    dialog.addSmall([name, 'character']);
                }
            },
            content(storage, player) {
                return `已『拜妃』${get.cnNumber(storage.length)}名角色`
            },
        },
        trigger: { source: 'damageAfter', player: 'damageAfter' },
        zhuSkill: true,
        logTarget(Evt, player) {
            if (player == Evt.source) return [player, Evt.player];
            return [player, Evt.source];
        },
        filter(Evt, player) {
            if (!player.hasZhuSkill('baifei')) return false;
            let characters = player.getStorage('baifei');
            if (player == Evt.source) return !characters.includes(Evt.player);
            else if (Evt.source) return !characters.includes(Evt.source);
        },
        content: [() => {
            if (!player.$.baifei) player.$.baifei = [];
            if (player == trigger.source) Evt.target = trigger.player;
            else Evt.target = trigger.source;
            player.chooseDrawRecover(2, 1, true);
        }, () => {
            if (result) {
                player.$.baifei.add(Evt.target);
                player.markSkill('baifei');
            }
        }],
    },
    //艾白
    bianyin: {
        trigger: { player: 'useCardBegin' },
        // direct:true,
        filter(Evt, player) {
            return Evt.cards && Evt.cards.length == 1;
        },
        usable: 1,
        content: [() => {
            Evt.cards = trigger.card.cards
            player.chooseCard('he', get.$pro2('bianyin'), true, function (card, player, target) {
                return !_status.event.cards.includes(card)
            })
                .set('cards', Evt.cards);
        }, () => {
            if (result.bool) {
                Evt.suit = get.suit(result.cards[0]);
                player.lose(result.cards, ui.discardPile).set('visible', true);
                player.$throw(result.cards, 1000);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw();
                trigger.card.suit = Evt.suit;
                trigger.cards[0].suit = Evt.suit;
            }
        }],
    },
    shabai: {
        trigger: {
            player: ['loseAfter'],
            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
        },
        frequent: true,
        filter(Evt, player) {
            let evt = Evt.getl(player);
            if (_status.currentPhase == player) {
                return evt?.cards?.filter(card => get.color(card) == 'red').length;
            }
            else {
                return evt?.hs?.filter(card => get.color(card) == 'black').length;
            }
        },
        content: [() => {
            let evt = trigger.getl(player);
            if (_status.currentPhase == player) {
                Evt.num = evt.cards.filter(card => get.color(card) == 'red').length;
            }
            else {
                Evt.num = evt.hs.filter(card => get.color(card) == 'black').length;
            }
        }, () => {
            if (_status.currentPhase == player) {
                player.draw(Evt.num);
                Evt.num = 0
            } else {
                player.moveCard();
            }
        }, () => {
            if (_status.currentPhase != player && !result.bool) {
                Evt.finish();
            }
            if (--Evt.num > 0) Evt.goto(1);
        }],
    },
    //文静
    zaiying: {
        audio: 4,
        trigger: {
            global: "gainAfter",
        },
        logTarget: 'player',
        filter(Evt, player) {
            if (Evt.player == player) return false;
            return _status.currentPhase == player && player.canCompare(Evt.player);
        },
        content: [() => {
            Evt.tar = trigger.player;
            player.chooseToCompare([Evt.tar]).callback = lib.skill.zaiying.callback;
        }],
        callback() {
            if (Evt.winner == player) {
                player.drawTo(player.getHandcardLimit());
            } else {
                player.recover();
            }

            if (Evt.winner == target) {
                target.drawTo(target.getHandcardLimit());
            } else {
                target.recover();
            }
        },
        group: 'zaiying_phaseUse',
        subSkill: {
            phaseUse: {
                enable: 'phaseUse',
                usable: 1,
                filterTarget(card, player, target) {
                    return player.canCompare(target);
                },
                filter(Evt, player) {
                    return player.countCards('h') > 0;
                },
                content() {
                    player.chooseToCompare([target]).callback = lib.skill.zaiying.callback;
                },
                ai: {
                    order: 6,
                    result: {
                        player(player, target) {
                            if (!player.needsToDiscard() || player.isDamaged()) return 1
                        },
                        target(player, target) {
                            if (!target.needsToDiscard()) return 1
                        }
                    },
                }
            }
        }
    },
    zhengen: new toSkill('trigger', {
        audio: 4,
        intro: {
            name: '已发动『政恩』的目标角色',
            mark(dialog, storage, player) {
                if (storage && storage.length) {
                    let name = storage.map(cur => get.name(cur));
                    dialog.addSmall([name, 'character']);
                }
            },
            content(storage, player) {
                return `已『政恩』${get.cnNumber(storage.length)}名角色`
            },
        },
        filter(Evt, player) {
            let characters = player.getStorage('zhengen');
            if (player == Evt.source) return player.countCards('h') && Evt.player.countDiscardableCards(player, 'hej') && !characters.includes(Evt.player);
            else if (Evt.source) return player.countCards('h') && Evt.source.countDiscardableCards(player, 'hej') && !characters.includes(Evt.source);
        },
        content: [() => {
            if (!player.$.zhengen) player.$.zhengen = [];
            if (player == trigger.source) Evt.target = trigger.player;
            else Evt.target = trigger.source;
            player.chooseToDiscard(`###${get.prompt('zhengen')}###弃置一张手牌`)
                .set('ai', card => (_status.event.check ? 5 : -1) + get.unuseful(card))
                .set('check', get.attitude(player, Evt.target) < 0);
        }, () => {
            if (result.bool) {
                player.logSkill('zhengen', Evt.target)
                player.$.zhengen_achieve.addArray(result.cards);
                player.discardPlayerCard(Evt.target, 'hej', true, '『政恩』：弃置对方一张牌');
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links) {
                player.$.zhengen.add(Evt.target);
                player.markSkill('zhengen');
                player.$.zhengen_achieve.addArray(result.links);
                player.markSkill('zhengen_achieve')
            }
        }],
        group: ['zhengen_achieve', 'zhengen_fail'],
        subSkill: {
            achieve: new toSkill('trigger', {
                intro: {
                    name: '已发动『政恩』的弃置卡牌',
                    content: 'cards',
                },
                filter(Evt, player) {
                    let cards = player.getStorage('zhengen_achieve');
                    let check = false;
                    cards.forEach(card => {
                        let num = get.number(card);
                        if (cards.filter(cur => get.number(cur) == num).length >= 4) check = true;
                    });
                    return check
                },
                animationColor: 'wood',
                content: [() => {
                    game.log(player, '成功完成使命');
                    player.$.zhengen = [];
                    player.unmarkSkill('zhengen');
                    player.$.zhengen_achieve = [];
                    player.unmarkSkill('zhengen_achieve');
                    player.awakenSkill('zhengen');
                }, () => {
                    player.draw(4)
                }, () => {
                    player.addAdditionalSkill('zhengen', 'wjbenxi')
                }],
            }, 'forced', 'audio', 'skillAnimation').setI([]).setT({ player: 'zhengenAfter' }),
            fail: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.result && player.isHealthy() && player.countCards('h') > 0;
                },
                content: [() => {
                    game.log(player, '使命失败');
                    player.$.zhengen = [];
                    player.unmarkSkill('zhengen');
                    player.$.zhengen_achieve = [];
                    player.unmarkSkill('zhengen_achieve');
                    player.awakenSkill('zhengen');
                    Evt.num = player.countCards('h');
                    player.chooseTarget(Evt.num, `『政恩』：令${get.cnNumber(Evt.num)}名角色横置`, true, function (card, player, target) {
                        return !target.isLinked();
                    }, function (target) {
                        let player = _status.event.player, num = _status.event.num;
                        return get.$a(player, target) / 2 + num * get.damageEffect(target, player, player);
                    }).set('num', Evt.num);
                }, () => {
                    if (result.bool) {
                        let targets = result.targets;
                        player.logSkill('zhengen_fail', targets);
                        while (targets.length) {
                            let target = targets.shift();
                            target.link();
                            target.draw();
                        }
                    }
                }, () => {
                    player.damage(player.countCards('h'), 'fire');
                }],
            }, 'direct', 'forceDie', 'audio').setT('recoverAfter'),
        },
        derivation: 'wjbenxi'
    }, 'direct', 'dutySkill').setT({ source: 'damageAfter', player: 'damageAfter' }),
    wjbenxi: {
        audio: 2,
        trigger: { player: 'useCard2' },
        forced: true,
        filter: function (event, player) {
            return player.isPhaseUsing();
        },
        content: function () { },
        mod: {
            globalFrom: function (from, to, distance) {
                if (_status.currentPhase == from) {
                    return distance - from.countUsed();
                }
            },
            selectTarget: function (card, player, range) {
                if (_status.currentPhase == player) {
                    if (card.name == 'sha' && range[1] != -1) {
                        if (!game.hasPlayer(function (current) {
                            return get.distance(player, current) > 1;
                        })) {
                            range[1]++;
                        }
                    }
                }
            }
        },
        ai: {
            unequip: true,
            skillTagFilter: function (player) {
                if (game.hasPlayer(function (current) {
                    return get.distance(player, current) > 1;
                })) {
                    return false;
                }
            }
        }
    },
    //星瞳
    jiezou: new toSkill('regard', {
        mod: {
            maxHandcardFinal(player, num) {
                return num + game.countPlayer(cur => cur.inRangeOf(player));
            }
        },
        intro: {
            markcount(storage, player) {
                return game.countPlayer(cur => cur.inRangeOf(player));
            }
        },
        filter(Evt, player) {
            return player.isTurnedOver()
        },
        content() {
            trigger.num -= 1
        },
    }, 'forced').setT('damageBegin3'),
    xtguyong: new toSkill('trigger', {
        filter(Evt, player) {
            return game.hasPlayer(cur => cur.countCards('h') < player.countCards('h')
                || cur.countCards('e') < player.countCards('e')
                || cur.countCards('j') < player.countCards('j'))
        },
        content: [() => {
            player.chooseTarget(get.$pro2('xtguyong'), function (card, player, tar) {
                return tar.countCards('h') < player.countCards('h')
                    || tar.countCards('e') < player.countCards('e')
                    || tar.countCards('j') < player.countCards('j');
            }, tar => tar.countCards('j') < player.countCards('j'))
        }, () => {
            if (result?.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('xtguyong', Evt.target)
                Evt.position = ''
                for (let i of ['h', 'e', 'j']) {
                    if (Evt.target.countCards(i) < player.countCards(i)) Evt.position += i
                }
                Evt.num = Evt.position.length
                player.turnOver()
            }
            else Evt.finish()
        }, () => {
            if (Evt.num === 0) Evt.finish()
            else {
                Evt.target.discardPlayerCard(player, Evt.num, Evt.position, true)
                    .set('filterButton', function (button) {
                        return !ui.selected.buttons.some(i => get.position(button.link) == get.position(i.link));
                    })
            }
        }, () => {
            Evt.num = result.links.length
            if (Evt.num === 0) Evt.finish()
            else {
                player.chooseTarget(`令攻击范围内至多${get.cnNumber(Evt.num)}名角色受到${Evt.num}点伤害`, [1, Evt.num],
                    function (card, player, tar) {
                        return tar.inRangeOf(player);
                    }, tar => -get.$a2(tar))
            }
        }, () => {
            if (result?.targets?.length) {
                Evt.targets = result.targets.slice(0)
            }
        }, () => {
            if (Evt.targets.length) {
                let target = Evt.targets.shift();
                player.line(target, 'fire');
                target.damage(Evt.num);
                Evt.redo();
            }
        }],
    }, 'direct').setT('phaseZhunbeiBegin'),
    //乌拉の帝国
    dizuo: {
        trigger: { player: 'useCard' },
        direct: true,
        filter(Evt, player) {
            return get.type(Evt.card) == 'equip' && game.hasPlayer(cur => {
                return cur != player && get.$dis(cur, player) <= 1;
            });
        },
        content: [() => {
            player.chooseTarget(get.$pro2('dizuo'), function (card, player, target) {
                return target != player && get.$dis(target, player) <= 1;
            }, function (target) {
                let player = _status.event.player, att = get.$a(player, target);
                if (att > 0 && target.countCards('he', { type: 'equip' })) return att * 2;
                if (!target.countCards('he', { type: 'equip' }) && player.hasCard(card => {
                    if (get.info(card).selectTarget == '-1') return 0;
                    return get.effect(target, card, player, player) > 0;
                })) return 1 - att / 2;
                return 0;
            });
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('dizuo', Evt.target);
                game.delayx();
                Evt.target.chooseCard('he', { type: 'equip' }).set('ai', card => {
                    return 6 - get.value(card);
                }).set('prompt', `『帝座』：将一张装备牌交给${get.$t(player.name)}并摸两张牌，或成为其下一张牌的额外目标`);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards && result.cards.length) {
                Evt.target.give(result.cards, player, true);
                Evt.target.draw(2);
            } else {
                if (!Evt.target.hasSkill('dizuo_mark')) {
                    Evt.target.addSkill('dizuo_mark');
                    game.swapSeat(player, Evt.target);
                }
                player.$.dizuo_addTarget = Evt.target;
                player.markSkill('dizuo_addTarget');
            }
        }],
        group: 'dizuo_addTarget',
        subSkill: {
            mark: {},
            addTarget: {
                mark: 'character',
                intro: {
                    content: '下一张牌的额外目标：$'
                },
                trigger: { player: 'useCard1' },
                forced: true,
                filter(Evt, player) {
                    return player.$.dizuo_addTarget;
                },
                logTarget(Evt, player) {
                    return player.$.dizuo_addTarget;
                },
                content: [() => {
                    if (trigger.targets && trigger.targets.length) {
                        trigger.targets.add(player.$.dizuo_addTarget);
                    }
                }, () => {
                    delete player.$.dizuo_addTarget;
                    player.unmarkSkill('dizuo_addTarget');
                }],
            }
        },
        ai: {
            threaten: 1.1,
            effect: {
                player(card, player, target, current) {
                    if (player.$.dizuo_addTarget && target != player.$.dizuo_addTarget) {
                        _status.dizuo = true
                        let eff = get.effect(player.$.dizuo_addTarget, card, player, player);
                        delete _status.dizuo
                        if (current > 0 || eff > 0) return [1, eff];
                    }
                }
            }
        },
    },
    hongtie: {
        trigger: { player: 'useCardToPlayered' },
        filter(Evt, player) {
            if (!Evt.isFirstTarget) return false;
            if (Evt.targets.length % 2 != 0) return false;
            return true;
        },
        direct: true,
        content: [() => {
            player.chooseTarget(get.$pro2('hongtie'),
                function (card, player, target) {
                    return _status.event.targets.includes(target);
                }).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.damageEffect(target, player, player);
                }).set('targets', trigger.targets);
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('hongtie', Evt.target);
                Evt.target.damage();
                game.delayx();
            }
        }],
        ai: {
            threaten: 1.1,
        },
    },
    //云玉鸾
    jiujiu: {
        trigger: { player: 'phaseUseBegin' },
        direct: true,
        filter(Evt, player) {
            return player.countCards('he', { type: 'equip' });
        },
        content: [() => {
            player.chooseCardTarget({
                position: 'he',
                filterCard: { type: 'equip' },
                filterTarget(card, player, target) {
                    return true;
                },
                ai2(target) {
                    let player = _status.event.player, att = get.$a(player, target);
                    if (att > 0 && target.countCards('he', { type: 'equip' }) && !player.needsToDiscard()) return att * 1.5;
                    if (!target.countCards('he', { type: 'equip' })) return get.damageEffect(target, player, player) - 1;
                    return 0;
                }
            }).set('prompt', get.$pro2('jiujiu'));
        }, () => {
            if (result.bool && result.cards && result.targets?.length) {
                Evt.target = result.targets[0];
                Evt.card = result.cards[0];
                player.logSkill('jiujiu', Evt.target);
                player.lose(Evt.card, ui.special);
                game.delayx();
            } else Evt.finish();
        }, () => {
            let card = Evt.card;
            ui.cardPile.insertBefore(card.fix(), ui.cardPile.firstChild);
            game.updateRoundNumber();
            trigger.cancel();
            game.delayx()
        }, () => {
            Evt.target.chooseCard('he', { type: 'equip' })
                .set('ai', card => {
                    return 8 - get.value(card);
                })
                .set('prompt', `『臼啾』：将一张装备牌交给${get.$t(player.name)}并摸两张牌，或受到一点伤害`);
        }, () => {
            if (result.bool && result.cards && result.cards.length) {
                Evt.target.give(result.cards, player, true);
                Evt.target.draw(2);
                game.delayx()
            } else {
                player.line(Evt.target);
                Evt.target.damage('nocard');
            }
        }],
        ai: {
            effect: {
                player(card, player, target, current) {
                    if (player.$.dizuo_addTarget && target != player.$.dizuo_addTarget) {
                        let eff = get.effect(player.$.dizuo_addTarget, card, player, player);
                        if (current > 0 || eff > 0) return [1, eff];
                    }
                }
            }
        },
    },
    qitong: new toSkill('trigger', {
        filter(Evt, player) {
            return player.getHistory('sourceDamage').length == 0;
        },
        logTarget(Evt, player) {
            return player.getNext();
        },
        content: [() => {
            Evt.target = player.getNext();
            if (player.$.qitong) {
                player.swapEquip(Evt.target);
                Evt.finish();
            } else {
                game.swapSeat(player, Evt.target);
            }
            player.$.qitong = !player.$.qitong;
        }, () => {
            if ((player.next || player.getNext()) == _status.roundStart) {
                player.drawTo(player.getHandcardLimit());
                player.phaseUse();
            }
        }],
        ai: {
            threaten: 1.1,
        },
    }).setI(true).setT('phaseJieshuBegin'),

    //步步
    tianlve: new toSkill('trigger', {
        priority: 199,
        content: [() => {
            player.chooseTarget(get.$pro2('tianlve'), function (card, player, target) {
                return target != player;
            }, function (target) {
                let player = _status.event.player;
                return get.recoverEffect(target, player, player);
            });
        }, () => {
            if (result.targets?.length) {
                player.logSkill('tianlve', result.targets);
                Evt.target = result.targets[0];
                Evt.target.recover();
                player.$.tianlve_pcr = Evt.target;
                player.addTempSkill('tianlve_pcr', { player: 'phaseUseAfter' });
            }
        }],
        subSkill: {
            pcr: new toSkill('trigger', {
                mark: 'character',
                intro: {
                    name: '甜略',
                    content: '本阶段内你对$使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标',
                },
                onremove(player, skill) {
                    player.unmarkSkill('tianlve_pcr');
                    delete player.$.tianlve_pcr;
                },
                priority: 199,
                filter(Evt, player) {
                    let card = Evt.card, info = get.info(card);
                    if (info.allowMultiple == false) return false;
                    return Evt.targets && Evt.targets.length == 1 && Evt.targets[0] == player.$.tianlve_pcr;
                },
                content: [() => {
                    let prompt2 = `为${get.$t(trigger.card)}增加一个目标`
                    player.chooseTarget(get.$pro('tianlve'), function (card, player, target) {
                        if (_status.event.targets.includes(target)) return false;
                        return lib.filter.targetEnabled2(_status.event.card, player, target);
                    }).set('prompt2', prompt2).set('ai', function (target) {
                        let player = _status.event.player;
                        return get.effect(target, _status.event.card, player, player);
                    }).set('targets', trigger.targets).set('card', trigger.card);
                }, () => {
                    if (result.bool && result.targets?.length) {
                        if (!Evt.isMine()) game.delayx();
                        Evt.targets = result.targets;
                    }
                }, () => {
                    if (Evt.targets) {
                        player.logSkill('tianlve', Evt.targets);
                        trigger.targets.addArray(Evt.targets);
                    } else {
                        player.draw();
                    }
                }],
                mod: {
                    targetInRange(card, player, target) {
                        if (target === player.$.tianlve_pcr) return true;
                    },
                },
            }, 'direct').setT('useCard'),
        }
    }, 'audio', 'direct').setT('phaseUseBegin'),
    luji: {
        audio: true,
        group: 'P_SP',
        trigger: { player: 'phaseZhunbeiBegin' },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'orange',
        forceunique: true,
        filter(Evt, player) {
            return player.isDamaged();
        },
        check(Evt, player) {
            return player.countCards('hes') >= 5 || player.hp <= 1;
        },
        content: [() => {
            let list;
            if (_status.characterlist) {
                list = [];
                for (let i of _status.characterlist) {
                    let info = lib.character[i];
                    if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
                }
            } else if (_status.connectMode) {
                list = get.charactersOL(function (i) {
                    let info = lib.character[i];
                    return !(info[1] == 'psp' || info[4].includes('P_SP'));
                });
            } else {
                list = get.gainableCharacters(function (info) {
                    return info[1] == 'psp' || info[4].includes('P_SP');
                });
            }
            let players = game.players.concat(game.dead);
            for (let i = 0; i < players.length; i++) {
                if (players[i] != player && players[i].group && players[i].group == 'psp') {
                    list.add(players[i].name);
                    list.add(players[i].name1);
                    list.add(players[i].name2);
                }
            }
            list.remove(player.name);
            list.remove(player.name1);
            list.remove(player.name2);
            list.remove('Pudding');
            if (list.length) {
                player.chooseButton(true).set('ai', function (button) {
                    return 5 || get.rank(button.link, true) - lib.character[button.link][2];
                }).set('createDialog', ['『颅祭』：获得其中一名角色所有技能', [list.randomGets(3), 'character']]);
            } else Evt.finish()
        }, () => {
            if (result.links?.length) {
                player.$.luji = true;
                player.awakenSkill('luji');
                player.loseMaxHp();
                for (let i of result.links) {
                    if (_status.characterlist) {
                        _status.characterlist.remove(i);
                    }
                    let skills = lib.character[i][3];
                    for (let j of skills) {
                        player.addTempSkill(j, { player: 'phaseDiscardAfter' });
                    }
                    player.flashAvatar('luji', i);
                }
                player.$.luji_pcr ??= [];
                player.$.luji_pcr.addArray(result.links);
                player.$.P_SP.addArray(result.links);
                player.addTempSkill('luji_pcr', { player: 'phaseDiscardAfter' });
                player.markSkill('P_SP');
            }
        }],
        subSkill: {
            pcr: {
                onremove(player, skill) {
                    let storage = player.getStorage(skill)
                    if (player.hasSkill('P_SP', null, null, false) && storage.length) {
                        if (_status.characterlist) _status.characterlist.addArray(storage);
                        player.$.P_SP.removeArray(storage);
                        if (player.$.P_SP.length == 0) {
                            player.unmarkSkill('P_SP');
                        } else {
                            player.markSkill('P_SP');
                        }
                        delete player.$[skill]
                    }
                }
            },
        }
    },
    //粉兔
    erni: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 1;
        },
        group: ['erni_going', 'erni_change'],
        hiddenCard(player, name) {
            switch (player.$.erni) {
                case 1: if (name == 'sha') return player.countCards('h'); break;
                case 2: if (name == 'shan') return player.countCards('h'); break;
                case 3: if (name == 'tao') return player.countCards('h'); break;
            }
        },
        ai: {
            useSha: 1,
            skillTagFilter(player, tag) {
                switch (tag) {
                    case 'respondSha': {
                        if (player.$.erni != 1 || !player.countCards('h')) return false;
                        break;
                    }
                    case 'respondShan': {
                        if (player.$.erni != 2 || !player.countCards('h')) return false;
                        break;
                    }
                    case 'save': {
                        if (player.$.erni != 3 || !player.countCards('h')) return false;
                        break;
                    }
                }
            },
            result: { player: 1 },
            respondSha: true,
            respondShan: true,
            save: true,
        },
        subSkill: {
            going: {
                enable: ['chooseToUse', 'chooseToRespond'],
                //发动时提示的技能描述
                prompt(Evt, player) {
                    player ||= Evt.player;
                    let str = get.skillInfoTranslation('erni', player);
                    return str;
                },
                viewAs(cards, player) {
                    let name = null;
                    let suit = get.suit(cards[0], player);
                    switch (player.$.erni) {
                        case 1: name = 'sha'; break;
                        case 2: name = 'shan'; break;
                        case 3: name = 'tao'; break;
                    }
                    //返回判断结果
                    if (name) return { name: name, suit: suit };
                    return null;
                },
                viewAsFilter(player) {
                    let cards = player.getCards('h');
                    if (!cards.length) return false;
                    let filter = Evt.filterCard;
                    let name = null;
                    switch (player.$.erni) {
                        case 1: name = 'sha'; break;
                        case 2: name = 'shan'; break;
                        case 3: name = 'tao'; break;
                    }
                    for (let i of cards) {
                        let suit = get.suit(i, player);
                        if (filter({ name: name, suit: suit }, player, _status.event)) return true;
                    }
                    return false;
                },
                check(card) {
                    return 7 - get.value(card);
                },
                filter(Evt, player) {
                    return player.countCards('h');
                },
                filterCard(card, player, Evt) {
                    Evt = Evt || _status.event;
                    let filter = Evt._backup.filterCard;
                    let name = null;
                    let suit = get.suit(card, player);
                    switch (player.$.erni) {
                        case 1: name = 'sha'; break;
                        case 2: name = 'shan'; break;
                        case 3: name = 'tao'; break;
                    }
                    if (filter({ name: name, suit: suit }, player, Evt)) return true;
                    return false;
                },
                precontent: [() => {
                    Evt.cards = Evt.result.cards.slice(0);
                    player.$throw(Evt.cards);
                    player.lose(Evt.cards, ui.ordering);
                    Evt.result.card.cards = [];
                    Evt.result.cards = [];
                    delete Evt.result.card.number;
                }, () => {
                    game.broadcast(function () {
                        ui.arena.classList.add('thrownhighlight');
                    });
                    let cards = Evt.cards
                    ui.arena.classList.add('thrownhighlight');
                    game.addVideo('thrownhighlight1');
                    player.showCards(cards, '『耳匿』展示手牌');
                    while (cards.length) {
                        ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
                    }
                    game.updateRoundNumber();
                }, () => {
                    game.broadcastAll(function () {
                        ui.arena.classList.remove('thrownhighlight');
                    });
                    game.addVideo('thrownhighlight2');
                    if (Evt.clear !== false) {
                        game.broadcastAll(ui.clear);
                    }
                    if (player.$.erni != 3) player.$.erni++;
                    else player.$.erni = 1;
                    player.updateMarks('erni')
                }],
            },
            change: new toSkill('trigger', {
                priority: 199,
                prompt2: '转换一次『耳匿』',
                filter(Evt, player) {
                    return true;
                },
                content() {
                    if (player.$.erni != 3) player.$.erni++;
                    else player.$.erni = 1;
                    player.updateMarks('erni')
                }
            }).setT('phaseJieshuBegin')
        }
    },
    shouru: {
        audio: 4,
        trigger: { player: ['damageAfter', 'useCardAfter', 'respondAfter'] },
        priority: 199,
        frequent: true,
        usable: 1,
        filter(Evt, player) {
            return (Evt.name == 'damage' || ['useCard', 'respond'].includes(Evt.name) && Evt.skill == 'erni_going') && game.hasPlayer(cur => {
                return [_status.currentPhase.getNext(), _status.currentPhase.getPrevious()].includes(cur) && cur.countGainableCards(player, 'hej');
            });
        },
        content: [() => {
            Evt.source = trigger.player;
            player.chooseTarget(get.$pro2('shouru'), true, function (card, player, target) {
                return [_status.currentPhase.getNext(), _status.currentPhase.getPrevious()].includes(target) && target.countGainableCards(player, 'hej');
            }, function (target) {
                let player = _status.event.player;
                return get.effect(target, { name: 'shunshou_copy' }, player, player);
            });
        }, () => {
            if (result.targets?.length) {
                Evt.tar = result.targets[0]
                player.gainPlayerCard('hej', Evt.tar, '『受乳』：获得其一张牌');
            }
        }],
        ai: {
            expose: 0.1,
            threaten: 0.8,
        },
        involve: 'erni',
    },
    chonghuang: {
        audio: true,
        group: 'P_SP',
        trigger: { global: 'changeHp' },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'fire',
        forceunique: true,
        filter(Evt, player) {
            if (player.hasZhuSkill('yinzun') && Evt.player.group == player.group) {
                return Evt.player.hp == 1;
            }
            return Evt.player == player && player.hp == 1;
        },
        content: [() => {
            let list;
            if (_status.characterlist) {
                list = [];
                for (let i of _status.characterlist) {
                    let info = lib.character[i];
                    if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
                }
            } else if (_status.connectMode) {
                list = get.charactersOL(function (i) {
                    let info = lib.character[i];
                    return !(info[1] == 'psp' || info[4].includes('P_SP'));
                });
            } else {
                list = get.gainableCharacters(function (info) {
                    return info[1] == 'psp' || info[4].includes('P_SP');
                });
            }
            let players = game.players.concat(game.dead);
            for (let i = 0; i < players.length; i++) {
                if (players[i] != player && players[i].group && players[i].group == 'psp') {
                    list.add(players[i].name);
                    list.add(players[i].name1);
                    list.add(players[i].name2);
                }
            }
            list.remove(player.name);
            list.remove(player.name1);
            list.remove(player.name2);
            list.remove('AyanaNana');
            if (list.length) {
                player.chooseButton(true).set('ai', function (button) {
                    return 5 || get.rank(button.link, true) - lib.character[button.link][2];
                }).set('createDialog', ['『崇皇』：获得其中一名角色所有技能', [list.randomGets(3), 'character']]);
            } else Evt.finish();
        }, () => {
            if (result.links?.length) {
                player.$.chonghuang = true;
                player.awakenSkill('chonghuang');
                player.loseMaxHp();
                for (let i of result.links) {
                    if (_status.characterlist) {
                        _status.characterlist.remove(result.links[i]);
                    }
                    let skills = lib.character[i][3];
                    for (let j of skills) {
                        player.addTempSkill(j, 'roundStart');
                    }
                    player.flashAvatar('chonghuang', i);
                }
                player.$.chonghuang_kamen ??= [];
                player.$.chonghuang_kamen.addArray(result.links);
                player.$.P_SP.addArray(result.links);
                player.addTempSkill('chonghuang_kamen', 'roundStart');
                player.markSkill('P_SP');
            }
        }],
        subSkill: {
            kamen: {
                onremove(player, skill) {
                    let storage = player.getStorage(skill)
                    if (player.hasSkill('P_SP', null, null, false) && storage.length) {
                        if (_status.characterlist) _status.characterlist.addArray(storage);
                        player.$.P_SP.removeArray(storage);
                        if (player.$.P_SP.length == 0) {
                            player.unmarkSkill('P_SP');
                        } else {
                            player.markSkill('P_SP');
                        }
                        delete player.$[skill]
                    }
                }
            },
        }
    },
    yinzun: {
        unique: true,
        zhuSkill: true,
        involve: 'chonghuang',
    },
    //阿秋
    jiren: new toSkill('active', {
        audio: 6,
        audioname: ['jike'],
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return true;
        },
        content() {
            let func = function (result) {
                let num = 0
                if (get.subtype(result) == 'equip1') {
                    num += get.value(result, player, 'raw') / 2;
                }
                if (get.color(result) == 'red') {
                    num += 1.5;
                }
                return num;
            };
            player.judge(func).callback = lib.skill.jiren.callback;
        },
        callback: [() => {
            if (Evt.judgeResult.color == 'red') {
                player.draw();
            }
            if (get.subtype(Evt.judgeResult.name) == 'equip1') {
                player.gain(card, 'gain2');
            }
            if (Evt.judgeResult.suit) {
                player.$.jiren_going = [];
                player.$.jiren_going.add(Evt.judgeResult.suit);
                if (!player.hasSkill('jiren_going')) player.addTempSkill('jiren_going');
                player.markSkill('jiren_going');
            }
        }],
        group: 'jiren2',
        ai: {
            threaten: 1.2,
            order: 16,
            result: { player: 1 },
        },
        subSkill: {
            going: new toSkill('mark', {
                audio: false,
                marktext: "祭",
                locked: true,
                intro: {
                    name: '戮秋',
                    content(storage, player, skill) {
                        if (storage.length) {
                            return '本回合上一次『祭刃』判定结果：' + get.$t(storage);
                        }
                    },
                },
                onremove: true,
            }),
        }
    }),
    jiren2: new toSkill('active', {
        audio: false,
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.getStat('skill').jiren && player.hp > 1;
        },
        content: [() => {
            player.loseHp(player.hp - 1);
        }, () => {
            let next = game.createEvent('resetSkill');
            [next.player] = [player]
            next.setContent(function () {
                player.popup('重置');
                game.log(player, '重置了『祭刃』');
                player.getStat('skill').jiren--;
            });
        }],
        ai: {
            order(item, player) {
                if (player.isHealthy() || player.hp > 3) return 0;
                let result = 5
                if (player.$.jiren_going) {
                    let num = player.countCards('hs', card => {
                        let info = get.info(card);
                        if (info.allowMultiple == false) return false;
                        return player.hasUseTarget(card) && player.$.jiren_going.includes(get.suit(card));
                    });
                    if (num >= 3) return -1;
                    result -= num
                }
                if (!player.awakenedSkills.includes('canxin')) {
                    result += 2
                }
                if ((player.hasCard('tao', 'hs') && player.hp <= 3) || player.hp === 2) {
                    return result + 5 - player.hp
                }
                return 0
            },
            result: {
                player(player, target) {
                    if (player.hasUnknown(3) || player.hp === 1) return -0.1;
                    if (!player.$.jiren_going) return player.countCards('hs');
                    else if (player.countCards('hs') >= 4) return 0.1;
                    else return -1;
                },
            },
        },
    }),
    luqiu: new toSkill('trigger', {
        trigger: { global: ['loseEnd', 'cardsDiscardEnd'] },
        filter(Evt, player) {
            let record = player.$.jiren_going;
            if (!record) return false;
            return Evt.cards && Evt.cards.filter(card => get.position(card, true) == 'd' && record.includes(get.suit(card))).length;
        },
        direct: true,
        content: [() => {
            if (player.$.luqiu == 1) {
                player.chooseTarget(`${get.$pro('luqiu')}视为使用一张杀？`, function (card, player, target) {
                    return player.canUse('sha', target);
                }).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.effect(target, { name: 'sha' }, player, player);
                }).set('prompt2', get.skillInfoTranslation('luqiu', player));
            } else if (player.$.luqiu == 2) {
                player.chooseBool(function () {
                    return 1;
                }).set('prompt', `###${get.$pro('luqiu')}摸一张牌###${get.skillInfoTranslation('luqiu', player)}`);
            } else {
                player.chooseCard('he')
                    .set('ai', card => {
                        let player = _status.event.player;
                        if (player.$.jiren_going.includes(get.suit(card))) return 12 - get.value(card);
                        return 10 - get.value(card);
                    })
                    .set('prompt', `###${get.$pro('luqiu')}弃一张牌###${get.skillInfoTranslation('luqiu', player)}`);
            }
        }, () => {
            if (result.bool) {
                if (player.$.luqiu < 3) player.$.luqiu++;
                else player.$.luqiu = 1;
                player.updateMarks('luqiu')
                if (result.targets?.length) player.useCard({ name: 'sha' }, result.targets, false);
                else if (result.cards && result.cards.length) player.discard(result.cards);
                else player.draw();
            }
        }],
        mod: {
            aiValue(player, card, num) {
                if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) return num / 10;
            },
            aiOrder(player, card, num) {
                if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) return num + 8;
            },
        },
        ai: {
            combo: 'jiren',
            useSha: 2,
            effect: {
                player(card, player) {
                    if (get.suit(card) && player.$.jiren_going && player.$.jiren_going.includes(get.suit(card))) {
                        if (get.name(card) == 'sha') return [1, 3];
                        return [1, 2];
                    }
                    if (get.name(card) == 'sha') return [1, 2];
                }
            },
            result: { player: 1 },
        },
    }).setI(1),
    canxin: {
        audio: 2,
        trigger: { player: 'phaseUseEnd' },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'fire',
        forceunique: true,
        filter(Evt, player) {
            return player.countCards('he') > 0 && player.isDamaged();
        },
        check(Evt, player) {
            return player.$.jiren_going
                && player.countCards('he', card => get.tag(card, 'damage')) > 0 && player.isDamaged();
        },
        content: [() => {
            player.$.canxin = true;
            player.awakenSkill('canxin');
        }, () => {
            player.chooseCard('he', '###重铸一张牌###若你以此法重铸了【杀】或伤害类锦囊牌，重复此操作')
                .set('ai', card => {
                    if (get.tag(card, 'damage')) return 15 - get.value(card);
                    return 6 - get.value(card);
                });
        }, () => {
            if (result.bool && result.cards) {
                player.lose(result.cards, ui.discardPile).set('visible', true);
                player.$throw(result.cards);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw();
                let card = result.cards[0];
                if (get.tag(card, 'damage')) Evt.goto(1);
                else {
                    player.recover();
                    let evt = _status.event.getParent('phase');
                    if (evt) {
                        evt.finish();
                    }
                }
            }
        }]
    },
    //红晓音
    quankai: {
        audio: 7,
        trigger: { source: 'damageEnd' },
        direct: true,
        round: 1,
        filter(Evt, player) {
            return Evt.player.isIn() && Evt.player.countDiscardableCards(player, 'hej');
        },
        content: [() => {
            player.discardPlayerCard(trigger.player, 'hej', get.$pro2('quankai'));
        }, () => {
            if (result.links?.length) {
                player.logSkill('quankai', trigger.player);
                player.$.quankai = result.links.slice(0);
                player.markSkill('quankai');
            }
        }],
        mark: true,
        intro: { content: 'cards' },
        group: 'quankai_gainBy',
        subSkill: {
            gainBy: {
                trigger: { player: 'useCardAfter' },
                direct: true,
                filter(Evt, player) {
                    let type = get.type2(Evt.card);
                    return type == 'trick' && player.$.quankai;
                },
                content: [() => {
                    player.chooseCardButton('从弃牌堆获得上次『拳开』的弃牌，否则重置『拳开』', 1, player.$.quankai).set('filterButton', function (button) {
                        return _status.event.list.includes(button.link);
                    }).set('list', player.$.quankai.filterInD('d')).set('ai', function (button) {
                        return get.value(button.link) > 0;
                    });
                }, () => {
                    if (result.bool && result.links) {
                        player.logSkill('quankai');
                        player.gain(result.links, 'gain2');
                    } else {
                        let roundname = 'quankai_roundcount';
                        if (player.hasMark(roundname)) {
                            player.popup('重置');
                            let next = game.createEvent('resetSkill');
                            [next.player, next.resetSkill] = [player, 'quankai']
                            next.setContent('resetRound');
                        }
                    }
                }],
            }
        }
    },
    heyuan: {
        audio: 2,
        group: 'P_SP',
        trigger: { player: 'phaseDrawBegin1' },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'fire',
        forceunique: true,
        filter(Evt, player) {
            return !Evt.numFixed && player.isDamaged();
        },
        check(Evt, player) {
            return player.countCards('hs', card => get.tag(card, 'damage')) >= 2;
        },
        content: [() => {
            trigger.changeToZero();
            player.$.heyuan = true;
            player.awakenSkill('heyuan');
            Evt.num = 1;
        }, () => {
            let list;
            if (_status.characterlist) {
                list = [];
                for (let i of _status.characterlist) {
                    let info = lib.character[i];
                    if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
                }
            } else if (_status.connectMode) {
                list = get.charactersOL(function (i) {
                    let info = lib.character[i];
                    return !(info[1] == 'psp' || info[4].includes('P_SP'));
                });
            } else {
                list = get.gainableCharacters(function (info) {
                    return info[1] == 'psp' || info[4].includes('P_SP');
                });
            }
            let players = game.players.concat(game.dead);
            for (let i = 0; i < players.length; i++) {
                if (players[i] != player && players[i].group && players[i].group == 'psp') {
                    list.add(players[i].name);
                    list.add(players[i].name1);
                    list.add(players[i].name2);
                }
            }
            list.remove(player.name);
            list.remove(player.name1);
            list.remove(player.name2);
            list.remove('KurenaiAkane');
            if (list.length) {
                player.chooseButton(true).set('ai', function (button) {
                    return 5 || get.rank(button.link, true) - lib.character[button.link][2];
                }).set('createDialog', [`『合缘』：获得其中一名角色的所有${Evt.num > 0 ? '' : '非'}限定技`, [list.randomGets(3), 'character']]);
            } else Evt.finish();
        }, () => {
            if (result.links?.length) {
                for (let i of result.links) {
                    if (_status.characterlist) {
                        _status.characterlist.remove(result.links[i]);
                    }
                    let skills = lib.character[i][3];
                    for (let j of skills) {
                        if (Evt.num ? (lib.skill[j].limited) : (!lib.skill[j].limited)) {
                            player.addTempSkill(j, { player: 'phaseBegin' });
                        }
                    }
                }
                if (!player.$.heyuan_qiyuan) player.$.heyuan_qiyuan = [];
                player.$.heyuan_qiyuan.addArray(result.links);
                player.$.P_SP.addArray(result.links);
                player.flashAvatar('heyuan', result.links[0]);
                player.addTempSkill('heyuan_qiyuan', { player: 'phaseBegin' });
                player.markSkill('P_SP');
            }
        }, () => {
            if (Evt.num > 0) {
                Evt.num--;
                Evt.goto(1);
            }
        }],
        subSkill: {
            qiyuan: {
                onremove(player, skill) {
                    let storage = player.getStorage(skill)
                    if (player.hasSkill('P_SP', null, null, false) && storage.length) {
                        if (_status.characterlist) _status.characterlist.addArray(storage);
                        player.$.P_SP.removeArray(storage);
                        if (player.$.P_SP.length == 0) {
                            player.unmarkSkill('P_SP');
                        } else {
                            player.markSkill('P_SP');
                        }
                        delete player.$[skill]
                    }
                }
            }
        }
    },
    //拉布里
    yangyao: new toSkill('active', {
        audio: false,
        filter(Evt, player) {
            let list = [];
            if (!player.isAuto) return true;
            for (let i = 0; i < ui.discardPile.childElementCount; i++) {
                let card = ui.discardPile.childNodes[i];
                if (player.getStorage('yangyao').includes(get.name(card))) continue;
                if (get.type2(card) == 'trick') {
                    list.push(card);
                }
            }
            return list.length;
        },
        filterCard(card, player) {
            if (ui.selected.cards.length) return get.color(card) == get.color(ui.selected.cards[0]);
            return player.countCards('hes', { color: get.color(card) }) >= 2;
        },
        complexCard: true,
        selectCard() {
            if (ui.selected.cards.length) return 2;
            return [0, 2];
        },
        position: 'he',
        content: [() => {
            if (!cards.length) player.loseHp();
        }, () => {
            let list = [];
            for (let i = 0; i < ui.discardPile.childElementCount; i++) {
                let card = ui.discardPile.childNodes[i];
                if (player.getStorage('yangyao').includes(get.name(card))) continue;
                if (get.type2(card) == 'trick') {
                    list.push(card);
                }
            }
            if (list.length) {
                target.chooseCardButton('『秧耀』：选择获得一张锦囊牌', list, true).ai = function (button) {
                    return get.value(button.link);
                };
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links) {
                if (!player.$.yangyao) player.$.yangyao = [];
                player.$.yangyao.push(get.name(result.links[0]))
                target.gain(result.links, 'gain2', 'log');
            }
        }],
        group: 'yangyao_clear',
        subSkill: {
            clear: {
                trigger: { global: 'phaseAfter' },
                priority: 23,
                filter(Evt, player) {
                    return player.getStorage('yangyao').length;
                },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    player.getStorage('yangyao').length = 0;
                }
            }
        },
        ai: {
            order(item, player) {
                if (player.hp <= 1 && player.countCards('hes') <= 3) return 0;
                if (player.isHealthy() || player.hp > 3) return 9;
                return 2;
            },
            result: {
                player(player, target) {
                    if (player.hp == 1) return -10;
                    if (ui.selected.cards.length < 2) {
                        return player.hp - 6;
                    }
                    return -2.5;
                },
                target(player, target) {
                    let result = 0;
                    for (let i = 0; i < ui.discardPile.childElementCount; i++) {
                        let card = ui.discardPile.childNodes[i];
                        if (player.getStorage('yangyao').includes(get.name(card))) continue;
                        if (get.type2(card) == 'trick') {
                            result = Math.max(result, get.value(card, target, 'raw'));
                        }
                    }
                    return result;
                }
            },
        },
    }, 'filterTarget').setI([]),
    shili: {
        audio: true,
        trigger: { global: 'phaseEnd' },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'wood',
        forceunique: true,
        filter(Evt, player) {
            if (!player.isDamaged()) return false;
            let history = player.getHistory('useCard');
            for (let i = 0; i < history.length; i++) {
                if (get.type2(history[i].card) != 'basic') return true;
            }
        },
        check(Evt, player) {
            let history = player.getHistory('useCard');
            let num = 0;
            for (let i = 0; i < history.length; i++) {
                if (get.type2(history[i].card) != 'basic') num++;
            }
            if (player.hasUnknown(1)) return false;
            return num >= 3;
        },
        content: [() => {
            let history = player.getHistory('useCard'), num = 0;
            for (let i = 0; i < history.length; i++) {
                if (get.type2(history[i].card) != 'basic') num++;
            }
            Evt.num = num;
            player.$.shili = true;
            player.awakenSkill('shili');
            player.chooseTarget(`『拾璃』：令一名角色摸${get.cnNumber(Evt.num)}张牌并执行一个额外的出牌阶段`, true, function (card, player, target) {
                return target.isIn();
            }).set('num', Evt.num).ai = function (target) {
                let att = get.$a(_status.event.player, target);
                return att * _status.event.num;
            };
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                Evt.target.draw(Evt.num);
            } else Evt.finish();
        }, () => {
            Evt.target.phaseUse();
        }],
    },
    //西魔幽
    akjianwu: {
        trigger: { player: ['useCard', 'respond'] },
        priority: 5,
        filter(Evt, player) {
            let logTarget = get.copy(lib.skill.akjianwu.logTarget);
            let target = logTarget(Evt, player);
            return get.type(Evt.card) == 'basic' && player.canCompare(target);
        },
        check(Evt, player) {
            let logTarget = get.copy(lib.skill.akjianwu.logTarget);
            let target = logTarget(Evt, player);
            return get.$a(player, target) < 0 || Evt.card.name == 'tao';
        },
        logTarget(Evt, player) {
            if (Evt.name == 'respond') return Evt.source;
            if (['sha', 'qi', 'jiu', 'tao'].includes(Evt.card.name)) return Evt.targets[0];
            if (Evt.respondTo) return Evt.respondTo[0];
        },
        content: [() => {
            let logTarget = get.copy(lib.skill.akjianwu.logTarget);
            let target = logTarget(trigger, player);
            Evt.target = target;
            player.chooseToCompare(Evt.target);
        }, () => {
            if (result.winner && result.loser) {
                [Evt.winner, Evt.loser, Evt.card] = [result.winner, result.loser, trigger.card];
                let list = [`于${get.$t(Evt.card)}结算后获得之`, '展示并获得对方的一张牌'], check = 1;
                if (Evt.card.cards && get.value(Evt.card.cards, Evt.winner, 'raw') > Evt.loser.countGainableCards(Evt.winner, 'he')) check = 0;
                Evt.winner.chooseControlList(list, true, function (Evt, player) {
                    return _status.event.check;
                }).set('check', check);
            } else Evt.finish();
        }, () => {
            switch (result.index) {
                case 0: {
                    if (Evt.card.cards && Evt.card.cards.length) {
                        let next = game.createEvent('akjianwu_gain2');
                        Evt.next.remove(next);
                        trigger.after.push(next);
                        [next.player, next.cards] = [Evt.winner, Evt.card.cards];
                        next.setContent(lib.skill.akjianwu.akjianwu_gain2);
                    }
                    Evt.finish();
                    break;
                }
                case 1: {
                    if (Evt.loser.countGainableCards(Evt.winner, 'he') > 0)
                        Evt.winner.gainPlayerCard(Evt.loser, 'he', true, 'visibleMove');
                    break;
                }
            }
        }, () => {
            if (result.links) {
                Evt.winner.chooseToUse({
                    cards: result.links,
                    filterCard(card) {
                        if (get.itemtype(card) != 'card' || !_status.event.cards || !_status.event.cards.includes(card)) return false;
                        if (lib.filter.filterCard.apply(this, arguments)) {
                            if (card.name == 'sha') return true;
                            let range = get.select(get.info(card).selectTarget);
                            if (range[0] == 1 && range[1] == 1) return true;
                        }
                    },
                    prompt: '是否使用获得牌中的一张？',
                });
            }
        }],
        akjianwu_gain2: [() => {
            Evt.gains = cards.filter(card => card.isInPile())
            if (Evt.gains.length) player.gain(cards, 'gain2');
        }, () => {
            player.chooseToUse({
                cards: Evt.gains,
                filterCard(card) {
                    if (get.itemtype(card) != 'card' || !_status.event.cards || !_status.event.cards.includes(card)) return false;
                    if (lib.filter.filterCard.apply(this, arguments)) {
                        if (card.name == 'sha') return true;
                        let range = get.select(get.info(card).selectTarget);
                        if (range[0] == 1 && range[1] == 1) return true;
                    }
                },
                prompt: '是否使用获得牌中的一张？',
            });
        }],
        ai: {
            threaten(player, target) {
                if (target.countCards('hs') >= 2) return 0.7;
            },
        }
    },
    tongzhao: {
        audio: true,
        group: 'P_SP',
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'yami',
        forceunique: true,
        trigger: { player: ['chooseToCompareAfter', 'compareMultipleAfter'], target: ['chooseToCompareAfter', 'compareMultipleAfter'] },
        filter(Evt, player) {
            if (!player.isDamaged()) return false;
            if (Evt.preserve) return false;
            if (Evt.result.tie) return true;
            if (player == Evt.player) {
                return Evt.num1 <= Evt.num2;
            } else {
                return Evt.num1 >= Evt.num2;
            }
        },
        check(Evt, player) {
            if (player.hasUnknown(1)) return Evt.result.tie;
            return player.countCards('hes') >= 4;
        },
        content: [() => {
            player.$.tongzhao = true;
            player.awakenSkill('tongzhao');
            if (trigger.result.tie) {
                Evt.num = 1;
            }
        }, () => {
            let list;
            if (_status.characterlist) {
                list = [];
                for (let i of _status.characterlist) {
                    let info = lib.character[i];
                    if (info[1] == 'psp' || info[4].includes('P_SP')) list.push(i);
                }
            } else if (_status.connectMode) {
                list = get.charactersOL(function (i) {
                    let info = lib.character[i];
                    return !(info[1] == 'psp' || info[4].includes('P_SP'));
                });
            } else {
                list = get.gainableCharacters(function (info) {
                    return info[1] == 'psp' || info[4].includes('P_SP');
                });
            }
            let players = game.players.concat(game.dead);
            for (let i = 0; i < players.length; i++) {
                if (players[i] != player && players[i].group && players[i].group == 'psp') {
                    list.add(players[i].name);
                    list.add(players[i].name1);
                    list.add(players[i].name2);
                }
            }
            list.remove(player.name);
            list.remove(player.name1);
            list.remove(player.name2);
            list.remove('AkumaYuu');
            if (list.length) {
                player.chooseButton(true).set('ai', function (button) {
                    return 5 || get.rank(button.link, true) - lib.character[button.link][2];
                }).set('createDialog', ['『同召』：获得其中一名角色的所有技能', [list.randomGets(3), 'character']]);
            } else Evt.finish();
        }, () => {
            if (result.links?.length) {
                for (let i of result.links) {
                    if (_status.characterlist) {
                        _status.characterlist.remove(result.links[i]);
                    }
                    let skills = lib.character[i][3];
                    for (let j of skills) {
                        player.addTempSkill(j, { player: ['loseHpAfter', 'damageAfter'] });
                    }
                }
                if (!player.$.tongzhao_wangzuo) player.$.tongzhao_wangzuo = [];
                player.$.tongzhao_wangzuo.addArray(result.links);
                player.$.P_SP.addArray(result.links);
                player.flashAvatar('tongzhao', result.links[0]);
                player.addTempSkill('tongzhao_wangzuo', { player: ['loseHpAfter', 'damageAfter'] });
                player.markSkill('P_SP');
            }
        }, () => {
            if (Evt.num > 0) {
                Evt.num--;
                Evt.goto(1);
            }
        }],
        subSkill: {
            wangzuo: {
                onremove(player, skill) {
                    let storage = player.getStorage(skill)
                    if (player.hasSkill('P_SP', null, null, false) && storage.length) {
                        if (_status.characterlist) _status.characterlist.addArray(storage);
                        player.$.P_SP.removeArray(storage);
                        if (player.$.P_SP.length == 0) {
                            player.unmarkSkill('P_SP');
                        } else {
                            player.markSkill('P_SP');
                        }
                        delete player.$[skill]
                    }
                }
            }
        }
    },
    //莲汰
    langfei: new toSkill('trigger', {
        filter(Evt, player) {
            return get.type(Evt.card) === 'trick' && get.tag(Evt.card, 'damage');
        },
        content() {
            trigger.baseDamage++;
        },
        usable: 1
    }).setT('useCard'),
    xieyun: new toSkill('trigger', {
        animationColor: 'yami',
        filter(Evt, player) {
            return game.countPlayer(cur => {
                let skills = cur.getSkills(null, false, false);
                for (let i of skills) {
                    if (i != 'xieyun' && lib.skill[i].limited && cur.awakenedSkills.includes(i)) {
                        return true
                    }
                }
            })
        },
        check(Evt, player) {
            return game.countPlayer(cur => {
                let skills = cur.getSkills(null, false, false);
                for (let i of skills) {
                    if (i != 'xieyun' && lib.skill[i].limited && cur.awakenedSkills.includes(i)) {
                        return get.$a(player, cur) >= 0
                    }
                }
            })
        },
        content: [() => {
            player.awakenSkill('xieyun');
            player.chooseTarget('选择『协韵』的目标', true, function (card, player, tar) {
                let skills = tar.getSkills(null, false, false);
                for (let i of skills) {
                    if (i != 'xieyun' && lib.skill[i].limited && tar.awakenedSkills.includes(i)) {
                        return true;
                    }
                }
            }, (tar) => {
                return get.$a(player, tar) + 1
            });
        }, () => {
            if (result?.targets?.length) {
                Evt.target = result.targets[0]
                let list = [];
                let skills = Evt.target.getSkills(null, false, false);
                for (let i of skills) {
                    if (i != 'xieyun' && lib.skill[i].limited && Evt.target.awakenedSkills.includes(i)) {
                        list.push(i);
                    }
                }
                if (list.length == 1) {
                    Evt.target.restoreSkill(list[0]);
                    player.addSkill(list[0])
                }
                else if (list.length > 1) {
                    player.chooseControl(list).set('prompt', '选择一个限定技重置之');
                }
                else {
                    Evt.finish();
                }
            }
            else Evt.finish()
        }, () => {
            Evt.target.restoreSkill(result.control);
            player.addSkill(result.control)
        }]
    }, 'unique', 'limited', 'skillAnimation', 'forceunique').setT('phaseUseBegin'),
    //YY
    bianshi: {
        trigger: { global: 'phaseBegin' },
        priority: 23,
        direct: true,
        filter(Evt, player) {
            return Evt.player.hp >= player.hp && player.countCards('h', card => !card.hasGaintag('ming_'));
        },
        content: [() => {
            let check = get.$a(player, trigger.player) <= 0 && trigger.player.countCards('h') >= 2;
            player.chooseCard('h', get.$pro2('bianshi'), function (card) {
                return !card.hasGaintag('ming_');
            }).set('ai', card => {
                if (_status.event.check && get.type2(card) != 'equip') return 8 - get.value(card) + Math.random();
                else return 0;
            }).set('check', check);
        }, () => {
            if (result.bool) {
                Evt.target = trigger.player;
                player.showCards(result.cards, '『辨识』亮出手牌');
                player.addGaintag(result.cards, 'ming_bianshi');
                game.delayx();
                player.logSkill('bianshi', Evt.target);
                Evt.target.$.bianshi2 = get.type2(result.cards[0]);
                Evt.target.addTempSkill('bianshi2');
            }
        }]
    },
    bianshi2: {
        trigger: { global: ['loseEnd', 'cardsDiscardEnd'] },
        filter(Evt, player) {
            let record = player.$.bianshi2;
            return Evt.cards && Evt.cards.filter(card => get.position(card, true) == 'd' && get.type2(card) == record).length > 0;
        },
        forced: true,
        mark: true,
        intro: { content: '指定的类型：$' },
        onremove: ['bianshi', 'bianshi2'],
        content: [() => {
            if (player.$.bianshi && player.$.bianshi >= 2) {
                player.chooseToDiscard('『辨识』弃牌', 'he', true);
                Evt.finish();
            } else {
                player.draw();
            }
        }, () => {
            if (!player.$.bianshi) player.$.bianshi = 1;
            else player.$.bianshi++;
        }, () => {
            if (player.$.bianshi === 2) player.loseHp();
        }]
    },
    ming_bianshi: {},
    //星汐
    zhuxing: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            Evt.cards = get.cards(7);
            let list1 = Evt.cards.slice(0), list2 = player.getCards('h').slice(0);
            let list: Dialogword = ['『铸星』：选择进行替换的牌'];
            if (list1.length) {
                list.push('牌堆顶牌');
                list.push([list1, 'card']);
            }
            if (list2.length) {
                list.push('你的手牌');
                list.push([list2, 'card']);
            }
            list.push('hidden');
            Evt.list1 = list1;
            Evt.list2 = list2;
            let next = player.chooseButton(list, true).set('complexSelect', true)
                .set('selectButton', function (button) {
                    let ul = ui.selected.buttons.length;
                    if (ul % 2 == 0) return [ul, ul + 1];
                    return [ul + 2, ul + 2];
                })
                .set('filterButton', function (button) {
                    let evt = _status.event.getParent(), ul = ui.selected.buttons.length;
                    if (ul > 0) {
                        let pre = ui.selected.buttons[ul - 1].link;
                        let now = button.link;
                        if (evt.list2.includes(pre) && evt.list1.includes(now)) {
                            return true;
                        }
                        if (evt.list1.includes(pre) && evt.list2.includes(now)) {
                            return true;
                        }
                        return false;
                    }
                    return true
                })
                .set('switchToAuto', function () {
                    _status.event.result = 'ai';
                }).set('processAI', function () {
                    let evt = _status.event.getParent(), links = [], player = evt.player;
                    evt.list1.sort(function (a, b) {
                        return get.useful(b, player) - get.useful(a, player);
                    })
                    evt.list2.sort(function (a, b) {
                        return get.useful(a, player) - get.useful(b, player);
                    })
                    for (let i = 0; i < Math.min(evt.list2.length, evt.list1.length); i++) {
                        if (get.useful(evt.list1[i], player) - get.useful(evt.list2[i], player) >= 0) links.push(evt.list1[i], evt.list2[i]);
                    }
                    return {
                        bool: true,
                        links: links,
                    }
                });
        }, () => {
            if (result.bool) {
                Evt.cards1 = Evt.list1.filter(card => result.links.includes(card));
                Evt.cards2 = Evt.list2.filter(card => result.links.includes(card));
                Evt.num = Evt.cards1.length;
                player.lose(Evt.cards2, ui.special);
                player.gain(Evt.cards1, 'draw');
            } else Evt.finish();
        }, () => {
            let cards = Evt.cards.map(card => Evt.cards1.includes(card) ? Evt.cards2[Evt.cards1.indexOf(card)] : card)
            while (cards.length) {
                ui.cardPile.insertBefore(cards.pop(), ui.cardPile.firstChild);
            }
        }],
        ai: {
            order(item, player) {
                if (player.isDamaged() && player.countCards('he') >= 3) return 9;
                return 4;
            },
            result: {
                player(player, target) {
                    return 1;
                },
            },
        },
    },
    shanzhu: {
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'yami',
        forceunique: true,
        trigger: { player: ['phaseJieshuBegin'] },
        filter(Evt, player) {
            if (!player.isDamaged()) return false;
            let cards = [];
            return player.getHistory('useCard', evt => {
                cards.addArray(evt.cards);
            });
            return cards.length;
        },
        check(Evt, player) {
            let cards = [];
            return player.getHistory('useCard', evt => {
                cards.addArray(evt.cards);
            });
            return cards.length > 4;
        },
        content() {
            player.$.shanzhu = true;
            player.awakenSkill('shanzhu');
            let cards = [];
            player.getHistory('useCard', evt => {
                cards.addArray(evt.cards);
            })
            player.gain(cards, 'gain2', 'log');
        },
    },

    P_SP: new toSkill('mark', {
        marktext: 'P',
        intro: {
            onunmark(storage, player) {
                if (_status.characterlist) _status.characterlist.addArray(storage);
                storage = [];
            },
            mark(dialog, storage, player) {
                if (storage && storage.length) {
                    dialog.addText(`已叠加：${get.cnNumber(storage.length)}位P-SP角色`);
                    dialog.addSmall([storage, 'character']);
                }
            },
            content(storage, player) {
                return `已叠加：${get.cnNumber(storage.length)}位P-SP角色`
            },
            markcount(storage, player) {
                if (storage && storage.length) return storage.length;
                return 0;
            }
        },
    }).setI([]),
    //机萪
    qianjiwanbian: {
        audio: 4,
        trigger: { source: 'damageAfter', player: 'phaseBegin' },
        priority: 199,
        frequent: true,
        group: ['qianjiwanbian_change', 'qianjiwanbian_clear'],
        filter(Evt, player) {
            if (Evt.name == 'damage' && Evt.getParent() && Evt.getParent().name != "trigger" && Evt.getParent(2) && Evt.getParent(2).qianjiwanbian) return false;
            return true;
        },
        gainable: ['前', '千', '钱', '签', '欠', '浅', '迁', '倩', '谦', '倩', '牵', '乾', '铅', '遣', '仟', '纤', '黔', '嵌', '钳', '歉', '虔', '谴', '堑',
            '技', '级', '及', '机', '祭', '集', '籍', '基', '即', '记', '急', '吉', '寄', '季', '极', '继', '计', '纪', '姬', '己',
            '挤', '剂', '济', '积', '击', '肌', '忌', '棘', '疾', '激', '际', '系', '寂', '迹', '脊', '辑', '藉', '稷', '戟', '骑', '悸', '觊', '嫉',
            '完', '玩', '晚', '碗', '万', '湾', '丸', '弯', '婉', '挽', '腕', '顽', '绾', '蜿', '宛',
            '边', '变', '便', '编', '遍', '扁', '辩', '鞭', '辨', '贬', '匾', '辫',
        ],
        content: [() => {
            if (!player.$.qianjiwanbian_change) player.$.qianjiwanbian_change = 'thunder';
            let list = lib.linked.slice(0);
            list.remove('kami');
            list.remove(player.$.qianjiwanbian_change);
            Evt.map = {};
            for (let i = 0; i < list.length; i++) {
                Evt.map[get.rawName(list[i])] = list[i];
                list[i] = get.rawName(list[i]);
            }
            list.push('取消');
            player.chooseControl('dialogcontrol', list).set('ai', function () {
                return list.randomGets();
            }).set('prompt', `『千机万变』：将（${get.rawName(player.$.qianjiwanbian_change)}）改写为：`);
        }, () => {
            if (result.control != '取消') {
                player.$.qianjiwanbian_change = Evt.map[result.control];
                let list = get.gainableSkills((info, skill) => {
                    let name = get.$t(skill);
                    for (let i = 0; i < name.length; i++) {
                        if (lib.skill.qianjiwanbian.gainable.includes(name.substring(i, i + 1)))
                            return !info.notemp && !player.hasSkill(skill);
                    }
                });
                list.add('qianjiwanbian');
                player.discoverSkill(list);
            } else {
                Evt.finish();
            }
        }, () => {
            // list=list.randomGets(3);
            // Evt.skillai=function(){
            // 	return get.max(list,get.skillRank,'item');
            // };
            let link = result.skill;
            if (link) {
                if (trigger.getParent().name != "trigger" && !trigger.getParent(2).qianjiwanbian) trigger.getParent(2).qianjiwanbian = true;
                if (link != 'qianjiwanbian') {
                    player.addAdditionalSkill('qianjiwanbian', link, true);
                    player.addSkillLog(link);
                }
                if (player.$.qianjiwanbian_clear === true && Evt.reapeat != true) {
                    Evt.reapeat = true;
                    Evt.goto(2);
                }
                if (link == 'qianjiwanbian' && player.$.qianjiwanbian_clear != true) {
                    game.playAudio('skill', 'qianjiwanbian_mua');
                    player.$.qianjiwanbian_clear = true;
                    game.log(player, '改写了', '#y『千机万变』');
                }
            }
        }],
        ai: {
            effect: {
                player(card, player, target) {
                    if (get.tag(card, 'damage')) return [1, 0.5];
                },
            },
            threaten: 3,
        },
        subSkill: {
            change: new toSkill('trigger', {
                trigger: { source: 'damageBegin2' },
                priority: 199,
                prompt(Evt) {
                    let str = `可以将本次对${get.$t(Evt.player)}造成的伤害改为（${get.rawName(_status.event.player.$.qianjiwanbian_change)}）属性`;
                    return str;
                },
                filter(Evt, player) {
                    return player.$.qianjiwanbian_change && Evt.nature != player.$.qianjiwanbian_change;
                },
                content() {
                    trigger.nature = player.$.qianjiwanbian_change;
                }
            }).setI([]),
            clear: {
                audio: 4,
                trigger: { player: 'phaseBegin' },
                priority: 200,
                forced: true,
                silent: true,
                filter(Evt, player) {
                    return true;
                },
                content() {
                    player.$.qianjiwanbian_clear = false;
                    player.removeAdditionalSkill('qianjiwanbian');
                }
            }
        }
    },
    //清则子
    ze: new toSkill('mark', {
        intro: {
            name: '『梦桓』：则',
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked'),
    menghuan: new toSkill('trigger', {
        forced: true,
        priority: 10,
        trigger: {
            global: ['gameStart', 'judgeEnd'],
            player: 'enterGame',
        },
        filter(Evt, player) {
            if (Evt.name == 'judge') return get.position(Evt.result.card, true) == 'o';
            return true;
        },
        content: [() => {
            Evt.cards = trigger.name == 'judge' ? [trigger.result.card] : get.cards();
            player.addToExpansion(Evt.cards, 'gain2').gaintag.add('ze');
        }, () => {
            if (player.getExpansions('ze').length > 6) {
                let discard = player.getExpansions('ze').pop();
                player.loseToDiscardpile(discard);
            }
        }],
        mod: {
            aiOrder(player, card, num) {
                let card0 = player.getExpansions('ze')[player.getHistory('useCard').length];
                if (card0 && (get.suit(card0) == get.suit(card) || get.type2(card0) == get.type2(card))) return num + 4;
            },
        },
        group: ['ze', 'menghuan_drawBy'],
        subSkill: {
            drawBy: {
                trigger: { player: ['useCard'] },
                forced: true,
                filter(Evt, player) {
                    if (player.getExpansions('ze').length) {
                        let card = player.getExpansions('ze')[player.getHistory('useCard').length - 1];
                        return card && (get.suit(card) == get.suit(Evt.card) || get.type2(card) == get.type2(Evt.card));
                    }
                },
                content() {
                    player.draw();
                },
            }
        }
    }),
    gengu: {
        trigger: { player: 'changeHp' },
        direct: true,
        filter(Evt, player) {
            return player.countCards('h');
        },
        content: [() => {
            player.chooseTarget(get.$pro2('gengu')).set('ai', function (target) {
                let player = _status.event.player;
                let att = get.$a(player, target);
                if (!target.countCards('he')) return 0;
                if (target.hasCardAround()) return att - 1;
                return -att;
            });
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('gengu', Evt.target);
                Evt.target.judge(card => {
                    if (get.color(card) == 'black' && !_status.event.player.hasCardAround()) return -2;
                    return 0;
                }).callback = lib.skill.gengu.callback;
            }
        }],
        callback: [() => {
            if (Evt.judgeResult.color == 'black') {
                if (player.hasCardAround()) {
                    player.chooseCard('he', true, '『亘古』：重铸一张牌').ai = get.unuseful3;
                } else {
                    player.chooseToDiscard('he', true);
                }
            }
        }, () => {
            if (result.bool && result.cards && player.hasCardAround()) {
                player.lose(result.cards, ui.discardPile).set('visible', true);
                player.$throw(result.cards);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw(result.cards.length);
            }
        }],
    },
    //笙歌
    di: new toSkill('mark', {
        intro: {
            mark(dialog, content, player) {
                let left = player.getExpansions('di_left'),
                    right = player.getExpansions('di_right')
                if (player.$.di.length > left.length + right.length) {
                    player.$.di = [...left, ...right]
                }
                if (player.$.di.length) {
                    if (left.length) {
                        dialog.addText('左侧「笛」');
                        dialog.addSmall(left);
                    }
                    if (right.length) {
                        dialog.addText('右侧「笛」');
                        dialog.addSmall(right);
                    }
                }
                else {
                    dialog.addText('没有「笛」');
                }
            },
        },
    }, 'locked', 'cardAround').setI([]),
    dixian: new toSkill('active', {
        usable: 1,
        content: [() => {
            player.chooseControl('左侧', '右侧').set('prompt', '『笛鲜』：选择将牌堆顶牌置于').set('ai', function () {
                let player = _status.event.player;
                if (player.getExpansions('di_left') > 3) return 1;
                return 0;
            });
        }, () => {
            Evt.cards = get.cards();
            if (result.control == '左侧') {
                lib.skill.dixian.process(player, Evt.cards[0], 'left');
            } else {
                lib.skill.dixian.process(player, Evt.cards[0], 'right');
            }
        }],
        process(player, card, method) {
            let storage = player.$.di,
                num = 0, toGain = [];
            switch (method) {
                case 'use':
                    for (let i of storage) {
                        if (!player.getExpansions('di_left').includes(i)
                            && !player.getExpansions('di_right').includes(i)) {
                            player.$.di.remove(i)
                        }
                        else if (get.suit(card) == get.suit(i)) {
                            toGain.push(i)
                            num++;
                        }
                    }
                    break;
                case 'left':
                    player.addToExpansion(card, 'draw').gaintag.add('di_left');
                    for (let i of player.getExpansions('di_right')) {
                        if (get.type(card) == get.type(i)) {
                            toGain.push(i)
                            num++;
                        }
                    }
                    break;
                case 'right':
                    player.addToExpansion(card, 'draw').gaintag.add('di_right');
                    for (let i of player.getExpansions('di_left')) {
                        if (get.type(card) == get.type(i)) {
                            toGain.push(i)
                            num++;
                        }
                    }
                    break;
            }
            storage.removeArray(toGain);
            player.gain(toGain, 'give', player, 'log', 'fromStorage');
            player.markSkill('di')
            if (num >= 3) player.useSkill('dixian');
        },
        ai: {
            order: 6,
            result: {
                player: 1,
            },
        },
        group: ['di', 'dixian_useCard'],
        subSkill: {
            useCard: new toSkill('trigger', {
                priority: 545,
                filter(Evt, player) {
                    return get.suit(Evt.cards) && player.getStorage('di').length;
                },
                content() {
                    lib.skill.dixian.process(player, trigger.cards[0], 'use');
                },
            }, 'direct').setT('useCardAfter')
        }
    }),
    gumei: {
        trigger: { player: 'useCard' },
        frequent: true,
        filter(Evt) {
            return get.type2(Evt.card) == 'trick' && Evt.card.isCard;
        },
        content: [() => {
            player.chooseTarget(get.$pro2('gumei')).set('ai', function (target) {
                let player = _status.event.player;
                let att = get.$a(player, target);
                if (target.hasCardAround()) return att - 1;
                return -att;
            });
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('gumei', Evt.target);
                if (Evt.target.hasCardAround()) {
                    Evt.target.draw();
                } else {
                    Evt.target.link();
                }
            }
        }],
        ai: {
            threaten: 1.4,
            noautowuxie: true,
        }
    },

    //纱耶sayako 
    zhichu: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return player.countCards('hs', card => player.hasUseTarget(card, false, false))
        },
        position: 'hs',
        filterCard(card, player) {
            return player.hasUseTarget(card, false, false);
        },
        filterTarget(card, player, target) {
            return player.canUse(card, target, false, false)
        },
        selectTarget: lib.filter.selectTarget,
        discard: false,
        lose: false,
        delay: false,
        multitarget: true,
        content: [() => {
            Evt.usedCard = player.useCard(cards, targets)
        }, () => {
            if (game.countPlayer(cur => cur.hasHistory('damage', evt => evt.getParent(2) === Evt.usedCard))) {
                player.chooseToDiscard([1, 3], true, '『稚楚』请弃置1~3张牌', `${get.$t(targets)}将摸等量牌`)
                console.log(targets)
            }
            else Evt.finish()
        }, () => {
            if (result.cards) {
                game.asyncDraw(targets, result.cards.length)
            }
        }],
        ai: {
            order: 1,
            result: {
                player(player) {
                    if (player.countCards('h') >= 3) return 0.5;
                    return 0;
                },
            }
        }
    }),
    yunxiang: new toSkill('trigger', {
        filter(Evt, player) {
            let cards = (Evt.cards2 || Evt.cards).filterInD('d')
            return Evt.player != player && cards.length > player.countCards()
                && cards.filter(card => player.hasUseTarget(card)).length
        },
        content: [() => {
            Evt.cards = (trigger.cards2 || trigger.cards).filterInD('d');
            player.chooseCardButton(Evt.cards, get.$pro2('yunxiang'), function (button) {
                return _status.event.player.hasUseTarget(card)
            })
        }, () => {
            if (result.bool && result.links) {
                player.chooseUseTarget(result.links[0], true, false)
            }
        }],
    }).setT({ global: 'discardEnd' }),
    mingman: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countCards() === 0
        },
        content() {
            trigger.num++;
        },
    }, 'forced').setT({ player: 'drawBegin', source: 'damageBegin1' }),
    //诸葛哀汐
    kaituan: new toSkill('regard', {
        viewAs: { name: 'guohe' },
        filter(Evt, player) {
            return player.countCards('hs')
        },
        filterCard(card, player) {
            return get.number(card) < 5;
        },
        involve: 'guohe'
    }, 'enable:chooseToUse'),
    gehuang: new toSkill('trigger', {
        filter(Evt, player) {
            return get.type2(Evt.card) === 'trick';
        },
        intro: { content: '鸽簧：#' },
        content() {
            let num = game.countPlayer(cur => player.inRange(cur))
            if (player.$.gehuang && player.$.gehuang != num) {
                player.draw(Math.abs(player.$.gehuang - num))
            }
            player.$.gehuang = num;
            player.markSkill('gehuang');
        },
        group: 'gehuang_addDam',
        subSkill: {
            addDam: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.$.gehuang === player.hp;
                },
                content() {
                    trigger.num++;
                }
            }, 'forced').setT({ source: 'damageBegin' }),
        }
    }, 'forced').setT('useCard1'),
    susi: new toSkill('active', {
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            player.awakenSkill('susi')
            game.filterPlayer(cur => {
                if (cur.group === target.group) {
                    cur.addTempSkill('susi_enable', 'none');
                    game.broadcastAll(function (splayer) {
                        splayer.out('susi_enable');
                    }, cur)
                }
            })
        }, () => {
            game.delay(2)
        }],
        ai: {
            order: 11,
            result: {
                player: -3,
                target: 1
            }
        }
    }, 'unique', 'limited', 'skillAnimation', 'filterTarget'),
    susi_enable: new toSkill('rule', {
        filter(Evt, player) {
            game.broadcastAll(function (splayer) {
                splayer.in('susi_enable');
            }, player)
            return true;
        },
        intro: {
            content: '移除游戏外'
        },
        content() {
            game.broadcastAll(function (splayer) {
                _status.dying.remove(splayer);
            }, player)
            player.removeSkill('dunzou_enable');
        }
    }, 'mark', 'direct').setT({ global: 'phaseEnd' }),
    //胡桃Usa
    jidou: new toSkill('trigger', {
        filter(Evt, player) {
            if (!(Evt.card.name == 'juedou')) return false;
            // return player==Evt.target||Evt.getParent().triggeredTargets3.length==1;
            return player == Evt.target || Evt.getParent().targets.length == 1;
        },
        content() {
            player.draw((player.hp === 1 || player.countCards('h') === 0) ? 3 : 1)
        },
    }, 'forced').setT({ player: 'useCardToPlayered', target: 'useCardToTargeted' }),
    duotian: new toSkill('active', {
        filter(Evt, player) {
            return lib.skill.duotian.computedCard().length && player.countCards('hs', { type: 'basic' });
        },
        computedCard() {
            let list = get.inpile('trick2', card => {
                let info = lib.card[card];
                if (!info) return false
                if (info.toself === true) return true
                if ((info.selectTarget && info.selectTarget !== 1)
                    || info.notarget || info.multitarget) return false;
                return true;
            });
            return list;
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = lib.skill.duotian.computedCard();
                return ui.create.dialog('『堕天』选择转化的锦囊', [list, 'vcard']);
            },
            filter(button, player) {
                return lib.filter.filterCard({ name: button.link[2] }, player, _status.event.getParent());
            },
            check(button) {
                return _status.event.player.getUseValue({ name: button.link[2] });
            },
            backup(links, player) {
                return {
                    popname: true,
                    position: 'hs',
                    viewAs: { name: links[0][2] },
                    check(card) {
                        return 6 - get.value(card);
                    },
                    filterCard(card) {
                        return get.type(card) == 'basic';
                    },
                    onuse(result, player) {
                        let num = result.card.number
                        let targets = result.targets
                        if (num) {
                            if (num >= 6 && get.type(result.card) !== 'delay' && game.countPlayer(cur => {
                                return !targets.includes(cur) && lib.filter.targetEnabled2(result.card, player, cur)
                            })) {
                                /**增加目标 */
                                let next = game.createEvent('duotianChangeTarget')
                                next.player = player
                                next._trigger = result
                                next.setContent([() => {
                                    player.chooseTarget(get.$pro('duotian'), `为${get.$t(trigger.card)}增加一个目标`,
                                        function (card, player, target) {
                                            return !_status.event.targets.includes(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                                        })
                                        .set('ai', target => {
                                            let player = _status.event.player, source = _status.event.source;
                                            return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
                                        }).set('targets', trigger.targets).set('card', trigger.card).set('source', player);
                                }, () => {
                                    if (result.bool) {
                                        if (!Evt.isMine() && !_status.connectMode) game.delayx();
                                        Evt.target = result.targets[0];
                                    }
                                    else {
                                        Evt.finish();
                                    }
                                }, () => {
                                    player.logSkill('duotian', Evt.target);
                                    trigger.targets.push(Evt.target);
                                }]);
                            }
                            if (num >= 12) {
                                /**追加阶段 */
                                let evt = _status.event.getParent('phaseUse')
                                if (evt && evt.name === 'phaseUse') {
                                    let next = game.createEvent('duotianExtraStage');
                                    next.player = player;
                                    next.setContent([() => {
                                        game.delay(1)
                                        player.setAvatar('KurumiUsa', 'KurumiUsa1')
                                    }, () => {
                                        player.popup('额外出牌')
                                        game.delay(0.5)
                                    }, () => {
                                        player.phaseUse()
                                    }, () => {
                                        player.setAvatar('KurumiUsa', 'KurumiUsa')
                                    }]);
                                    _status.event.next.remove(next);
                                    evt.after.push(next);
                                }
                            }
                        }
                    }
                };
            },
            prompt(links, player) {
                return `将一张基本牌当做【${get.$t(links[0][2])}】使用`;
            }
        },
        ai: {
            order: 5,
            result: {
                player: 1
            }
        }
    }).set('usable', 1),
    //七濑Unia
    qisui: new toSkill('trigger', {
        filter(Evt, player) {
            let targets = lib.skill.qisui.logTarget(Evt, player)
            return targets.length
        },
        check(Evt, player) {
            let targets = lib.skill.qisui.logTarget(Evt, player)
            let num = 0
            targets.forEach(target => {
                num += get.$a(player, target)
            });
            return num >= 0
        },
        logTarget(Evt, player) {
            let targets = [];
            if (_status.currentPhase === player) targets.push(Evt.player)
            if (Evt.player === player && Evt.source?.isIn()) targets.push(Evt.source)
            targets.removeArray(player.$.qisui)
            return targets
        },
        content() {
            let targets = lib.skill.qisui.logTarget(trigger, player)
            targets.forEach(tar => {
                player.$.qisui.add(tar)
                if (!tar.hasSkill('lingjun')) tar.addTempSkill('lingjun', { player: 'juedouBegin' })
                else trigger.num++
            });
        },
        group: 'qisui_clear',
        subSkill: {
            clear: new toSkill('trigger', {
                content() {
                    player.$.qisui.length = []
                    if (player.hasSkill('lingjun')) player.setAvatar('NanaseUnia', 'NanaseUnia1')
                    else player.setAvatar('NanaseUnia', 'NanaseUnia')
                }
            }, 'direct', 'silent').setT({ global: 'phaseAfter' }),
        },
        derivation: 'lingjun'
    }).setT({ global: 'drawBegin' }).setI([]),
    lingjun: new toSkill('mark', {
        marktext: '军',
        intro: {
            content: '手牌中的【杀】视为【决斗】'
        },
        mod: {
            cardname(card, player, name) {
                if (get.position(card) === 'h' && name === 'sha') return 'juedou'
            }
        }
    }, 'mark'),
    //玛安娜Myanna
    yemo: new toSkill('active', {
        filter(Evt, player) {
            return player.countDisabled() < 5;
        },
        chooseButton: {
            dialog(Evt, player) {
                return ui.create.dialog('###夜魔###' + lib.translate.yemo_info);
            },
            chooseControl(Evt, player) {
                let list = _.range(1, 6).map(i => 'equip' + i)
                list.push('cancel2');
                return list;
            },
            check(Evt, player) {
                _.range(5, 0, -1).forEach(i => { if (player.isEmpty(i)) return ('equip' + i); })
                return 'cancel2';
            },
            backup(result) {
                let next = get.copy(lib.skill.yemox);
                next.position = result.control;
                return next;
            },
        },
        ai: {
            order: 1,
            result: {
                player(player) {
                    if (game.hasPlayer(tar => {
                        if (player == tar) return false;
                        let hs = tar.countCards('h');
                        return hs > 2 && get.$a(player, tar) <= 0;
                    })) return 1;
                    return 0;
                },
            },
        },
        derivation: 'linghun'
    }),
    yemox: {
        audio: 'yemo',
        content: [() => {
            player.draw()
        }, () => {
            player.disableEquip(lib.skill.yemo_backup.position);
        }, () => {
            if (player.isAlive()) {
                player.chooseTarget(true, '选择一名角色获得『灵昏』直到其下一次使用【决斗】，若其已有『灵昏』，改为弃置其区域内的一张牌').set('ai', (target) => {
                    let player = _status.event.player
                    if (!target.hasSkill('linghun')) return get.$a(player, target) <= 0
                    return get.effect(target, { name: 'guohe_copy' }, player, player)
                });
            }
            else
                Evt.finish();
        }, () => {
            if (result.bool && result.targets?.length) {
                let target = Evt.target = result.targets[0]
                if (!target.hasSkill('linghun')) target.addTempSkill('linghun', { player: 'juedouBegin' })
                else player.discardPlayerCard('hej', true, target);
            }
            else
                Evt.finish();
        }],
    },
    linghun: new toSkill('mark', {
        marktext: '昏',
        intro: {
            content: '手牌中的【闪】视为【决斗】'
        },
        mod: {
            cardname(card, player, name) {
                if (get.position(card) === 'h' && name === 'shan') return 'juedou'
            }
        }
    }, 'mark'),
    jiaopin: new toSkill('trigger', {
        filter(Evt, player) {
            return player.isDamaged() && player.$.disableEquip != undefined && player.$.disableEquip.length > 0
        },
        logTarget: 'player',
        content() {
            player.chooseToEnable();
        },
    }).setT('phaseJieshuBegin'),
    //花花Haya
    shengping: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.player != player && Evt.result?.cards?.length
        },
        logTarget: 'player',
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0
        },
        content() {
            Evt.target = trigger.player
            game.asyncDraw([player, Evt.target])
        },
        ai: {
            effect: {
                target(card, player, target, cur) {
                    if (target.hp < 0) {
                        if (get.tag(card, 'discard') >= 1 && get.$a(target, player) > 0) return [1, 1, 1, 1];
                    }
                }
            }
        },
    }).setT({ target: 'discardPlayerCardEnd' }),
    jiushuang: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countDiscardableCards(Evt.player, 'hej') > 0;
        },
        check(Evt, player) {
            return player === Evt.player ? player.countDiscardableCards(Evt.player, 'j') : get.attitude(player, Evt.player)
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player
            Evt.target.discardPlayerCard('hej', true, player)
        }, () => {
            if (result.links?.length) {
                let target = Evt.target
                if (!target.hasSkill('lingxun')) {
                    target.addTempSkill('lingxun', { player: 'juedouBegin' })
                }
                else {
                    target.link();
                    player.draw()
                }
            }
        }],
        derivation: 'lingxun'
    }).setT({ global: 'phaseZhunbeiBegin' }),
    lingxun: new toSkill('mark', {
        marktext: '醺',
        intro: {
            content: '手牌中的【酒】视为【决斗】'
        },
        mod: {
            cardname(card, player, name) {
                if (get.position(card) === 'h' && name === 'jiu') return 'juedou'
            }
        }
    }, 'mark'),
    //咲间妮娜
    tianjiang: new toSkill('active', {
        filter(Evt, player) {
            return true
        },
        filterTarget(card, player, target) {
            return !target.countCards('h')
        },
        content: [() => {
            target.draw()
        }, () => {
            if (lib.filter.targetEnabled2({ name: 'juedou', isCard: true }, player, target)) {
                player.useCard({ name: 'juedou', isCard: true }, target, false);
            }
        }],
        ai: {
            order(item, player) {
                return 5
            },
            result: {
                player(player, target) {
                    if (target === player) return 1
                    return get.effect(target, { name: 'juedou' }, player, player) - 2;
                },
                target(player, target) {
                    if (target === player) return 1
                    return 2 - get.effect(target, { name: 'juedou' }, player, target);
                }
            },
            threaten: 1.3,
            expose: 0.1,
        },
    }),
    baiquan: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer(cur => cur.countCards('he'));
        },
        content: [() => {
            Evt.count = trigger.num;
        }, () => {
            Evt.count--;
            player.chooseTarget(get.$pro2('baiquan')).set('ai', (target) => {
                let player = _status.event.player;
                return get.effect(target, { name: 'guohe_copy2' }, player, player)
            });
        }, () => {
            if (result.bool && result.targets?.length) {
                player.logSkill('baiquan', result.targets);
                Evt.target = result.targets[0];
                Evt.discard = 3
            } else Evt.finish();
        }, () => {
            if (Evt.target.countDiscardableCards(player, 'he')) {
                player.line(Evt.target);
                player.discardPlayerCard(Evt.target, 'he', true).set('forceDie', true);
                Evt.discard--;
                if (Evt.discard) Evt.redo();
            }
        }, () => {
            if (Evt.count) Evt.goto(1)
        }],
        ai: {
            maixie: true,
            maixie_hp: true,
            threaten: 0.2,
            expose: 0.1,
        },
    }).setT('damageAfter'),
    //月隐空夜
    zhanji: new toSkill('trigger', {
        filter(Evt, player: PlayerModel) {
            return player.countCards('he') > 0 && Evt.getParent().skill != 'zhanji' && Evt.getParent(2).skill != 'zhanji' && Evt.getParent(3).skill != 'zhanji';
        },
        content: [() => {
            player.chooseToDiscard(true, 3, 'he', get.$pro2('zhanji'))
        }, () => {
            if (result.bool) {
                player.chooseButton(true, [1, 3], 'hidden', ['『占机』：许愿1~3个花色', [['heart', 'diamond', 'club', 'spade'], 'vcard'], 'hidden'])
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links) {
                Evt.suits = result.links.map(link => link[2])
            } else Evt.finish();
        }, () => {
            player.chat(get.$t(Evt.suits))
            game.delayx(0.6)
        }, () => {
            player.draw('visible')
        }, () => {
            player.showCards(result)
            game.delayx(0.6)
            if (get.suit3(result).length === 1 && Evt.suits.includes(get.suit3(result)[0])) {
                player.chooseTarget(`『占机』：令${get.cnNumber(4 - Evt.suits.length)}名角色摸两张牌`, 4 - Evt.suits.length)
                    .set('ai', target => get.$a2(target))
            }
            else if (player.countCards('he') >= 3) {
                player.chooseBool('是否重复『占机』流程？')
                Evt.goto(Evt.step + 2)
            }
            else Evt.finish()
        }, () => {
            if (result.bool && result.targets) {
                Evt.targets = result.targets.slice(0)
                player.logSkill('zhanji', Evt.targets)
                game.asyncDraw(Evt.targets, 2)
            }
        }, () => {
            if (result.bool) {
                Evt.goto(0)
            }
        }],
    }).setT('gainEnd'),
    jiyang: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.player.countCards() > player.countCards()
        },
        check(Evt, player) {
            return get.effect(Evt.player, { name: 'juedou' }, player, player) > 0
        },
        logTarget: 'player',
        content: [() => {
            Evt.tar = trigger.player
            Evt.useJuedou = player.useCard({ name: 'juedou', isCard: true }, Evt.tar);
        }, () => {
            Evt.sources = []
            if (game.countPlayer2(cur => cur.hasHistory('damage', evt => {
                let juedou = evt.getParent('juedou')
                if (juedou && juedou.name === 'juedou' && juedou.getParent('useCard') === Evt.useJuedou) {
                    if (evt.source) Evt.sources.add(evt.source)
                    return true
                }
            }))) {
                let shas = []
                game.countPlayer2(cur => cur.hasHistory('respond', evt => {
                    let juedou = evt.getParent('juedou')
                    if (juedou && juedou.name === 'juedou' && juedou.getParent('useCard') === Evt.useJuedou) {
                        shas.addArray(evt.cards.filterInD('d'))
                    }
                }))
                if (shas.length) {
                    player.chooseCardButton(shas, `###${get.$pro('jiyang')}###将响应该【决斗】的一张牌置于牌堆顶`)
                }
                else Evt.finish();
            }
            else Evt.finish();
        }, () => {
            if (result.bool && result.links?.length) {
                Evt.chosenSha = result.links[0]
                ui.cardPile.insertBefore(Evt.chosenSha, ui.cardPile.firstChild);
                game.log(player, `将${get.$t(Evt.chosenSha)}置于牌堆顶`);
                game.updateRoundNumber()
            }
            else Evt.finish();
        }, () => {
            if (Evt.sources.length) {
                let tar = Evt.sources.shift()
                if (tar.countCards('he')) {
                    player.gainPlayerCard(tar, 'he', true, '『激扬』：获得伤害来源一张牌')
                }
                Evt.redo()
            }
        }],
        ai: {
            maixie: true,
            maixie_hp: true,
            threaten: 0.2,
            expose: 0.1,
        },
    }).setT({ global: 'phaseJieshuBegin' }),
    //满月
    xuedian: new toSkill('trigger', {
        priority: 199,
        content: [() => {
            player.chooseTarget(get.$pro2('xuedian'), function (card, player, target) {
                return true;
            }, (target) => {
                let player = _status.event.player;
                return get.damageEffect(target, player, player);
            });
        }, () => {
            if (result.targets?.length) {
                player.logSkill('xuedian', result.targets);
                Evt.target = result.targets[0];
                player.$.xuedian_houxu = Evt.target;
                player.addTempSkill('xuedian_houxu', { player: 'phaseUseAfter' });
            }
        }],
        subSkill: {
            houxu: new toSkill('trigger', {
                mark: 'character',
                intro: {
                    name: '甜略',
                    content: '本阶段内你对$使用牌无距离限制，且指定其为唯一目标时，可以摸一张牌或增加一个额外目标',
                },
                onremove(player, skill) {
                    player.unmarkSkill('xuedian_houxu');
                    delete player.$.xuedian_houxu;
                },
                priority: 199,
                filter(Evt, player) {
                    if (Evt.name === 'damage') {
                        return Evt.num > 0 && Evt.player === player.$.xuedian_houxu;
                    }
                    else {
                        let draw = player.getHistory('gain', evt => {
                            if (evt.getParent().name != 'draw') return false;
                            let houxu = evt.getParent('xuedian_houxu')
                            if (houxu?.name === 'xuedian_houxu') return true
                        })
                        console.log(draw)
                        return draw.length === 0
                    }
                },
                logTarget(Evt, player) {
                    return player.$.xuedian_houxu
                },
                content: [() => {
                    if (trigger.name === 'damage') {
                        player.chooseDrawRecover(2, 1, true)
                    }
                    else {
                        player.turnOver()
                        if (player.$.xuedian_houxu.isIn() && player.$.xuedian_houxu !== player) {
                            player.$.xuedian_houxu.turnOver()
                        }
                    }
                }],
            }, 'forced').setT({ source: 'damageEnd', player: 'phaseUseEnd' }),
        }
    }, 'direct').setT('phaseUseBegin'),
    //蛙吹Keroro
    beifa: new toSkill('trigger', {
        logTarget: 'target',
        filter: function (Evt, player) {
            if (Evt.target.countCards() < player.countCards()) return false
            return ['sha', 'juedou'].includes(Evt.card.name) && !Evt.getParent().directHit.includes(Evt.target);
        },
        content: function () {
            let id = (player == trigger.player ? trigger.target : trigger.player)['playerid'];
            let map = trigger.getParent().customArgs;
            if (trigger.name.name === 'juedou') {
                let idt = trigger.target.playerid;
                if (!map[idt]) map[idt] = {};
                if (!map[idt].shaReq) map[idt].shaReq = {};
                if (!map[idt].shaReq[id]) map[idt].shaReq[id] = 1;
                map[idt].shaReq[id]++;
            }
            else {
                if (!map[id]) map[id] = {};
                if (!map[id].shanRequired) map[id].shanRequired = 1;
                map[id].shanRequired++;
            }
            trigger.getParent().baseDamage++;
        },
        ai: {
            directHit_ai: true,
            skillTagFilter: function (player, tag, arg) {
                if ((arg.card.name != 'juedou' || Math.floor(arg.target.countCards('h', 'sha') / 2) > player.countCards('h', 'sha'))
                    && (arg.card.name != 'sha' || arg.target.countCards('h', 'shan') > 1)) return false;
            }
        }
    }, 'frequent').setT('useCardToPlayered'),
    wuwu: new toSkill('trigger', {
        content: [() => {
            let draws = 0
            game.filterPlayer(cur => {
                if (cur === player) return;
                cur.getHistory('useCard', evt => {
                    if (evt.card) draws++
                })
            })
            if (draws) {
                player.draw(draws)
            }
            else {
                player.chooseUseTarget({ name: 'juedou' }, '###' + get.$pro('wuwu') + '###视为使用一张【决斗】').set('logSkill', 'wuwu')
            }
        }]
    }, 'direct').setT('phaseUseEnd'),
    //茉吱Mojuko
    shufang: new toSkill('active', {
        usable: 1,
        // getDraws(Evt) {
        //     let cards = [];
        //     Evt.player.getHistory('gain', (evt) => {
        //         if (evt.getParent().name == 'draw' && evt.getParent('phaseDraw') == Evt)
        //             cards.addArray(evt.cards);
        //     });
        //     return cards;
        // },
        // filter(Evt, player) {
        //     return lib.skill.shufang.getDraws(Evt).length
        // },
        content: [() => {
            player.draw(2)
            game.delayx()
        }, () => {
            player.chooseToDiscard('『鼠方』：请弃牌', true, [1, 3], 'he')
                .set('ai', card => {
                    if (ui.selected.cards.some(i => get.type2(card) === get.type2(i))) return get.unuseful(card)
                    return get.unuseful2(card) + 2;
                })
                .set('complexCard', true)
        }, () => {
            if (result.cards) {
                Evt.cards = result.cards.slice(0)
                Evt.types = get.type3(Evt.cards, 'trick')
                player.showCards(Evt.cards, '『鼠方』：弃置的牌')
                game.delayx();
            }
        }, () => {
            if (Evt.types.includes('basic')) {
                let list = get.inpile('basic')
                list.add('sha')
                player.chooseVCardButton(list, true, '###『鼠方』：声明一种基本牌名###你所有基本牌均视为与之同名')
            }
            else Evt.goto(Evt.step + 2)
        }, () => {
            if (result.links) {
                player.$.shufang_Buff0 = result.links[0][2]
                player.addTempSkill('shufang_Buff0', { player: 'phaseUseBegin' })
            }
        }, () => {
            if (Evt.types.includes('trick')) {
                player.$.shufang_Buff1 = Evt.cards.filter(card => get.type2(card) === 'trick')
                player.addTempSkill('shufang_Buff1', { player: 'phaseUseBegin' })
            }
        }, () => {
            if (Evt.types.includes('equip')) {
                player.addTempSkill('shufang_Buff2', { player: 'phaseUseBegin' })
            }
        }],
        subSkill: {
            Buff0: new toSkill('mark', {
                intro: {
                    content: '基本牌视为【$】'
                },
                mod: {
                    cardname(card, player, name) {
                        if (get.type2(name) === 'basic' && name !== player.$.shufang_Buff0) return player.$.shufang_Buff0
                    }
                }
            }),
            Buff1: new toSkill('mark', {
                intro: {
                    content: '锦囊牌视为【决斗】'
                },
                mod: {
                    cardname(card, player, name) {
                        if (get.type2(name) === 'trick' && !player.$.shufang_Buff1.includes(card)) return 'juedou'
                    }
                }
            }),
            Buff2: new toSkill('mark', {
                intro: {
                    content: '回合结束时，令一名角色将手牌摸至体力上限'
                },
                filter(Evt, player) {
                    return game.filterPlayer(cur => cur.countCards() < Math.min(cur.maxHp, 5))
                },
                content: [() => {
                    player.chooseTarget('『鼠方』：令一名角色将手牌摸至体力上限', true, function (card, player, target) {
                        return target.countCards() < Math.min(target.maxHp, 5)
                    })
                        .set('ai', target => {
                            let att = get.$a2(target), diff = Math.max(Math.min(target.maxHp, 5) - target.countCards(), 0)
                            return diff * att
                        })
                }, () => {
                    if (result.targets?.length) {
                        Evt.target = result.targets[0]
                        Evt.target.drawTo(Math.min(Evt.target.maxHp, 5))
                    }
                }]
            }, 'forced').setT('phaseEnd'),
        }
    }),
    baihuo: new toSkill('trigger', {
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h', card => {
                return player.countCards('h', get.name(card)) > 1
            })
        },
        content: [() => {
            player.chooseCard(get.$pro('baihuo'), function (card, player) {
                return player.countCards('h', get.name(card)) > 1;
            }).ai = get.unuseful2;
        }, () => {
            if (result.bool) {
                Evt.cards = player.getCards('h', card => {
                    return get.name(card) === get.name(result.cards[0])
                })
                player.discard(Evt.cards)
                Evt.num = Evt.cards.length
            } else {
                Evt.finish();
            }
        }, () => {
            let check = game.countPlayer(cur => get.$a(player, cur) > 0) > game.countPlayer(cur => get.$a(player, cur) < 0)
            player.chooseTarget([1, Evt.num])
                .set('ai', (target) => _status.event.method && get.$a(_status.event.player, target))
                .set('method', check ? 1 : -1)
        }, () => {
            if (result.bool) {
                Evt.targets = result.targets.slice(0)
                for (let v of Evt.targets) {
                    v.classList.add('glow');
                }
            } else {
                Evt.finish();
            }
        }, () => {
            let controls = ['摸一张牌', '弃一张牌', '取消选择'];
            player.chooseControl(controls).set('ai', function () {
                return _status.event.index;
            }).set('index', 0);
        }, () => {
            for (let v of Evt.targets) {
                v.classList.remove('glow');
            }
            switch (result.index) {
                case 0: {
                    player.logSkill('baihuo', Evt.targets);
                    game.asyncDraw(Evt.targets)
                    break;
                }
                case 1: {
                    player.logSkill('baihuo', Evt.targets);
                    for (let v of Evt.targets) {
                        v.chooseToDiscard('he', true)
                    }
                    break;
                }
                case 2: {
                    Evt.goto(2);
                    break;
                }
            }
        }, () => {
            if (player.isMinHandcard()) {
                player.chooseTarget(`###${get.$pro('baihuo')}###令一名角色回复或失去一点体力`, 1)
                    .set('ai', tar => {
                        let player = _status.event.player, att = get.$a(player, tar)
                        if (att) return get.recoverEffect(tar, player, player)
                        else if (tar.hasSkillTag('maixie')) return -0.6 * att
                        else return -1.5 * att
                    })
            }
            else Evt.finish()
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0]
                Evt.target.classList.add('glow');
                let check = get.$a(player, Evt.target) > 0
                player.chooseControl('cancel2', 'recover_hp', 'lose_hp', function () {
                    if (_status.event.check) return 1;
                    return 2;
                }).set('prompt', '令目标执行：').set('check', check);
            } else Evt.finish();
        }, () => {
            Evt.target.classList.remove('glow');
            switch (result.index) {
                case 1: {
                    player.logSkill('baihuo', Evt.target)
                    Evt.target.recover()
                    break;
                }
                case 2: {
                    player.logSkill('baihuo', Evt.target)
                    Evt.target.loseHp()
                    break;
                }
            }
        }],
        ai: {
            expose: 0.2
        }
    }, 'forced').setT({ player: 'damageAfter', source: 'damageAfter' }),
    //柊真华
    huage: new toSkill('trigger', {
        filter(Evt, player) {
            return get.suit(Evt.card) in player.$.huage
        },
        content: [() => {
            Evt.suit = get.suit(trigger.card)
            let check1 = true, check2 = false
            for (let v in player.$.huage) {
                if (v === Evt.suit) {
                    if (player.$.huage[v] % 3 === 2) check2 = true
                }
                else {
                    if (player.$.huage[v] <= player.$.huage[Evt.suit]) check1 = false
                }
            }
            Evt.check1 = check1
            Evt.check2 = check2
            player.$.huage[Evt.suit]++
            player.markSkill('huage')
        }, () => {
            if (Evt.check1) {
                let card1 = get.cardPile(function (card) { return card.name == 'jiu' }, ['cardPile', 'discardPile']);
                let card2 = get.cardPile(function (card) { return card.name == 'sha' }, ['cardPile', 'discardPile']);
                let gainedCards = []
                if (card1) gainedCards.push(card1)
                if (card2) gainedCards.push(card2)
                if (gainedCards.length) {
                    player.gain(gainedCards, 'draw', 'log');
                }
            }
        }, () => {
            if (Evt.check2) {
                let card1 = get.cardPile(function (card) { return card.name == 'juedou' }, ['cardPile', 'discardPile']);
                let card2 = get.cardPile(function (card) { return card.name == 'sha' }, ['cardPile', 'discardPile']);
                let gainedCards = []
                if (card1) gainedCards.push(card1)
                if (card2) gainedCards.push(card2)
                if (gainedCards.length) {
                    player.gain(gainedCards, 'draw', 'log');
                }
            }
        }],
        intro: {
            content(storage, player) {
                let str = '<ul style="padding-top:0;margin-top:0"><p>本轮次记录的花色-牌数</p>';
                for (let v in storage) {
                    str += `<li>${get.$t(v)}牌-${get.$t(storage[v])}张`;
                }
                str += '</ul>'
                return str;
            },
        },
        group: 'huage_clear',
        subSkill: {
            clear: new toSkill('rule', {
                popup: false,
                content() {
                    for (let v in player.$.huage) {
                        player.$.huage[v] = 0
                    }
                    player.unmarkSkill('huage')
                }
            }, 'forced', 'silent').setT({ global: 'roundEnd' })
        }
    }, 'forced').setT(['useCard', 'respond']).setI({ heart: 0, diamond: 0, club: 0, spade: 0 }),
    yayin: new toSkill('regard', {
        priority: 3,
        filter(Evt, player) {
            return true
        },
        content() {
            let fun = lib.card['yayin_jiu'].content;
            if (fun) trigger.setContent(fun);
        },
        mod: {
            cardUsable: function (card, player, num) {
                if (card.name === 'jiu') return Infinity;
            },
            selectTarget(card, player, range) {
                if (card.name === 'jiu' && _status.event.type !== 'dying') {
                    if (range[0] == -1) range[0] = 1;
                    if (range[1] == -1) range[1] = 1;
                }
            },
            cardSavable(card, player) {
                if (card.name === 'jiu') return true;
            },
        },
        ai: {
            save: true,
            skillTagFilter(player) {
                if (!player.countCards('hs', 'jiu')) return false;
            },
            threaten(player, target) {
                if (player.countCards('hs') <= 2) return 1.1;
            }
        },
        global: 'yayin_put',
        subSkill: {
            put: {
                mod: {
                    targetEnabled(card, player, target, now) {
                        if (card.name === 'jiu' && player.hasSkill('yayin') && !target.isHealthy()) {
                            return true
                        }
                    },
                }
            }
        },
    }, 'forced', 'lastDo').setT('jiuBegin'),
    yayin_jiu: new toSkill('mark', {
        filter(Evt, player) {
            return !player.$.yayin_jiu_clear && (Evt.card.name === 'sha' || get.type(Evt.card) === 'trick' && get.tag(Evt.card, 'damage'));
        },
        forced: true,
        charlotte: true,
        firstDo: true,
        content: function () {
            player.$.yayin_jiu_clear = trigger.card;
            if (!trigger.baseDamage) trigger.baseDamage = Evt.baseNumber || 1;
            trigger.baseDamage += player.$.yayin_jiu;
            trigger.jiu = true;
            trigger.jiu_add = player.$.yayin_jiu;
            game.addVideo('jiuNode', player, false);
            game.broadcastAll(function (player) {
                player.removeSkill('yayin_jiu');
            }, player);
        },
        temp: true,
        vanish: true,
        silent: true,
        popup: false,
        nopop: true,
        onremove: function (player) {
            if (player.node.jiu) {
                player.node.jiu.delete();
                player.node.jiu2.delete();
                delete player.node.jiu;
                delete player.node.jiu2;
            }
            delete player.$.yayin_jiu;
            delete player.$.yayin_jiu_clear;
        },
        ai: {
            damageBonus: true
        },
        group: 'yayin_jiu_clear',
        subSkill: {
            clear: {
                trigger: { player: 'useCardAfter', global: 'phaseAfter' },
                priority: 2,
                firstDo: true,
                charlotte: true,
                filter(Evt, player) {
                    if (Evt.name == 'useCard') return player.$.yayin_jiu_clear === Evt.card;
                    return true;
                },
                forced: true,
                popup: false,
                audio: false,
                content: function () {
                    game.broadcastAll(function (player) {
                        player.removeSkill('yayin_jiu');
                    }, player);
                    game.addVideo('jiuNode', player, false);
                },
            }
        }
    }).setT('useCard1'),
    //白桃shirako
    jufu: new toSkill('regard', {
        chooseButton: {
            dialog() {
                let list = [['锦囊', '', 'wuzhong'], ['锦囊', '', 'wugu']];
                return ui.create.dialog('咀福', [list, 'vcard']);
            },
            filter(button, player) {
                let evt = _status.event.getParent();
                if (evt?.filterCard) {
                    return evt.filterCard({ name: button.link[2] }, player, evt);
                }
                return true;
            },
            backup(links, player) {
                return {
                    filterCard: { name: 'tao' },
                    position: 'hs',
                    selectCard: 1,
                    viewAs: { name: links[0][2], nature: links[0][3] },
                }
            },
            prompt(links, player) {
                return `将一张【桃】做当【${get.$t(links[0][2])}】使用`;
            },
        },
        filter(Evt, player) {
            return player.countCards('hs', 'tao');
        },
    }, 'enable:chooseToUse'),
    qihun: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer(cur => cur != player && cur.countCards('h'));
        },
        content: [() => {
            player.chooseTarget(get.$pro2('qihun'), function (card, player, target) {
                return target !== player && target.countCards('h');
            })
                .set('ai', target => {
                    let player = _status.event.player, att = get.$a2(target), reds = target.countCards('h', { color: 'red' });
                    if (target.countCards('h', 'tao'))
                        return -1.6 * reds * att;
                    else if (target.group === player.group)
                        return reds * att;
                    return -0.4 * reds * att;
                });
        }, () => {
            if (result?.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('qihun', Evt.target);
                Evt.target.showHandcards('『祈婚』展示手牌');
                Evt.cards = Evt.target.getCards('h', { color: 'red' });
            }
            else
                Evt.finish();
        }, () => {
            if (Evt.cards.length) {
                Evt.target.give(Evt.cards, player, true);
            }
            else
                Evt.finish();
        }, () => {
            if (Evt.cards.filter(card => card.name === 'tao').length === 0) {
                if (player.group === Evt.target.group) {
                    Evt.target.draw(Evt.cards.length - 1);
                    Evt.finish();
                }
                else {
                    player.chooseCard(`交给${get.$t(Evt.target)}${get.cnNumber(Evt.cards.length)}张牌`, 'he', true, Evt.cards.length).set('ai', card => get.unuseful3(card));
                }
            }
        }, () => {
            if (result.cards?.length) {
                player.give(result.cards, Evt.target, true);
            }
        }]
    }, 'direct').setT('phaseUseEnd'),
    //麟＆犀
    lilian: new toSkill('trigger', {
        trigger: { player: 'phaseZhunbeiBegin' },
        direct: true,
        filter(Evt, player) {
            return player.maxHp > 0;
        },
        content: [() => {
            player.chooseTarget(get.$pro2('lilian')).set('ai', target => {
                let player = _status.event.player;
                return get.$a(player, target) - player.maxHp;
            });
        }, () => {
            if (result.bool) {
                player.logSkill('lilian', Evt.target);
                Evt.target = result.targets[0];
                Evt.target.draw(player.maxHp);
                game.delayx();
            } else Evt.finish();
        }, () => {
            let check = function () {
                for (let i = 0; i < game.players.length; i++) {
                    if (game.players[i].isOut() || game.players[i] == player) continue;
                    if (game.players[i].maxHp <= player.maxHp) return false;
                }
                return true;
            }();
            if (check) {
                player.setAvatar('linxi', 'linxi1');
            } else player.loseMaxHp();
            game.delayx();
        }],
    }),
    zihuai: {
        trigger: { player: 'discardAfter' },
        priority: 199,
        frequent: true,
        round: 1,
        filter(Evt, player) {
            return player.$.zihuai_mark && Evt.cards.length >= player.$.zihuai_mark;
        },
        content() {
            player.draw(player.$.zihuai_mark);
        },
        group: ['zihuai_mark'],
        subSkill: {
            mark: {
                direct: true,
                locked: true,
                marktext: '🎶',
                intro: {
                    content: '上一次于弃牌阶段弃置的牌数：#'
                },
                trigger: { player: 'phaseDiscardEnd' },
                filter(Evt, player) {
                    let cards = [];
                    player.getHistory('lose', evt => {
                        if (evt?.type == 'discard' && evt.getParent('phaseDiscard') == Evt && evt.hs) cards.addArray(evt.cards);
                    });
                    return cards.length >= 1;
                },
                content() {
                    let cards = [];
                    player.getHistory('lose', evt => {
                        if (evt?.type == 'discard' && evt.getParent('phaseDiscard') == trigger && evt.hs) cards.addArray(evt.cards);
                    });
                    player.$.zihuai_mark = cards.length;
                    player.markSkill('zihuai_mark');
                },
            }
        }
    },
    //中国绊爱
    liying: {
        trigger: { player: ['damageEnd', 'respondEnd'] },
        direct: true,
        filter(Evt, player) {
            let source;
            if (Evt.name == 'damage') source = Evt.source;
            else if (Array.isArray(Evt.respondTo)) source = Evt.respondTo[0];
            if (source) {
                return source != player && source.countCards('he') && source.hp > 0;
            }
        },
        content: [() => {
            if (trigger.name == 'damage') Evt.target = trigger.source;
            else Evt.target = trigger.respondTo[0];
            Evt.num = Evt.target.hp;
            player.gainPlayerCard(get.$pro2('liying'), 'he', Evt.target, Evt.target.hp).set('logSkill', ['liying', Evt.target]);
        }, () => {
            if (result.bool && Evt.num > 1) {
                player.chooseCard('he', `将${get.cnNumber(Evt.num - 1)}张牌交给${get.$t(Evt.target)}`, Evt.num - 1, true);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards.length) {
                Evt.target.gain(result.cards, player, 'give');
                if (typeof player.$.fuyu == 'number') {
                    player.$.fuyu += result.cards.length;
                    player.markSkill('fuyu')
                }
                if (typeof player.$.liying != 'number') {
                    player.$.liying = 0;
                }
                if (player.$.liying >= 0) {
                    player.$.liying += result.cards.length;
                    if (player.$.liying >= 2) {
                        let list = [];
                        let type = player.$.fuyu === true ? 'trick' : 'basic';
                        for (let i of get.inpile(type)) {
                            if (lib.filter.cardUsable({ name: i }, player, Evt.getParent()) && player.hasUseTarget(i)) {
                                list.push([get.$t(type), '', i]);
                                if (i == 'sha') {
                                    list.push(['基本', '', 'sha', 'fire']);
                                    list.push(['基本', '', 'sha', 'thunder']);
                                    list.push(['基本', '', 'sha', 'ice']);
                                }
                            }
                        }
                        if (list.length) {
                            player.chooseButton(['是否视为使用其中一张牌？', [list, 'vcard']]).set('ai', function (button) {
                                let player = _status.event.player;
                                let card = { name: button.link[2], nature: button.link[3] };
                                return player.getUseValue(card);
                            });
                        } else {
                            Evt.finish();
                        }
                        player.$.liying = -1;
                    } else {
                        Evt.finish();
                    }
                }
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links?.length) {
                let card = { name: result.links[0][2], nature: result.links[0][3] };
                player.chooseUseTarget(card, true);
            }
        }],
        ai: {
            maixie: true,
        },
        group: ['liying_clear'],
        subSkill: {
            clear: {
                trigger: { global: 'phaseNext' },
                direct: true,
                locked: true,
                silent: true,
                firstDo: true,
                filter(Evt, player) {
                    return player.$.liying;
                },
                content() {
                    player.$.liying = 0;
                }
            },
        }
    },
    fuyu: new toSkill('trigger', {
        marktext: "谕",
        intro: {
            content: '已通过『立影』给出了&张牌',
        },
        trigger: { player: 'phaseZhunbeiBegin' },
        animationColor: 'thunder',
        filter(Evt, player) {
            return player.$.fuyu > 0 && player.$.fuyu % 4 == 0;
        },
        content() {
            player.loseMaxHp();
            player.$.fuyu = true;
            player.awakenSkill('fuyu');
        },
        ai: {
            combo: 'liying'
        }
    }, 'juexingji', 'skillAnimation', 'forced').setI(0),
    //山兔YamaUsagi
    zhengmeng: new toSkill('trigger', {
        filter(Evt, player) {
            return !Evt.numFixed;
        },
        check(Evt, player) {
            return player.countCards('h') >= 2;
        },
        content: [() => {
            trigger.changeToZero();
            player.turnOver();
        }, () => {
            player.throwDice();
        }, () => {
            player.draw(Evt.num);
            if (Evt.num === 6) {
                player.addMark('zhengmeng_addDamBy')
            }
        }],
        group: 'zhengmeng_addDamBy',
        subSkill: {
            addDamBy: new toSkill('trigger', {
                intro: {
                    content: '【杀】伤害+#'
                },
                forced: true,
                popup: false,
                filter(Evt, player) {
                    return ['sha'].includes(Evt.card.name) && player.countMark('zhengmeng_addDamBy');
                },
                content() {
                    trigger.baseDamage += player.countMark('zhengmeng_addDamBy');
                }
            }).setT('useCard1'),
        }
    }).setT('phaseDrawBegin1'),
    wadao: new toSkill('trigger', {
        filter(Evt, player) {
            return !player.isTurnedOver();
        },
        content: [() => {
            player.chooseTarget(get.$pro('wadao'), function (card, player, target) {
                return target !== player;
            }).ai = target => {
                return get.$a2(target);
            }
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('wadao', Evt.target);
                Evt.target.insertPhase();
            }
        }],
        ai: {
            expose: 0.3,
        }
    }, 'direct').setT('turnOverAfter'),
    //栗子酱
    tieyu: new toSkill('trigger', {
        intro: {
            content: '『铁驭』（）值偏差#',
        },
        frequent(Evt, player) {
            return get.type(Evt.card) == 'equip';
        },
        filter(Evt, player) {
            return (get.type(Evt.card) == 'equip' && (2 + player.$.tieyu > 0))
                || player.countCards('he') > (3 + player.$.tieyu);
        },
        check(Evt, player) {
            return get.type(Evt.card) == 'equip';
        },
        content: [() => {
            if (get.type(trigger.card) == 'equip') {
                player.draw(2 + player.$.tieyu);
                Evt.finish();
            } else {
                player.chooseToDiscard(3 + player.$.tieyu, true, '『铁驭』：请弃牌')
            }
        }, () => {
            if (result.cards?.length) {
                let color = get.color(result.cards)
                switch (color) {
                    case 'red':
                        let card = trigger.card;
                        let info = get.info(card);
                        if (['basic', 'trick'].includes(info.type) && info.allowMultiple !== false
                            && trigger.targets && !info.multitarget) {
                            if (game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(card, player, cur))) {
                                let prompt2 = `为${get.$t(trigger.card)}增加至多两个目标`;
                                player.chooseTarget([1, 2], get.$pro('tieyu'), function (card, player, target) {
                                    return !_status.event.targets.includes(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                                }).set('prompt2', prompt2).set('ai', function (target) {
                                    let player = _status.event.player;
                                    return get.effect(target, _status.event.card, player, player);
                                }).set('card', card).set('targets', trigger.targets);
                            }
                        }
                        break;
                    case 'black':
                        game.log(trigger.card, '的数值+1')
                        trigger.baseDamage++;
                        trigger.baseNumber++;
                        break;
                    case 'none':
                        player.$.tieyu--;
                        player.markSkill('tieyu')
                        if (2 - player.$.tieyu <= 0) player.setAvatar('RIKO', 'RIKO1');
                        break;
                }
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                if (!Evt.isMine()) game.delayx();
                Evt.targets = result.targets;
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.targets) {
                player.logSkill('tieyu', Evt.targets);
                trigger.targets.addArray(Evt.targets);
            }
        }],
    }).setT('useCard2').setI(0),

    //新科娘
    daimao: {
        mod: {
            cardUsable(card, player, num) {
                if (!get.suit(card)) return
                let suits = get.suit3(player.getExpansions('daimao_mark'))
                if (suits.includes(suits)) return true;
            },
            targetInRange(card, player, target) {
                if (!get.suit(card)) return
                let suits = get.suit3(player.getExpansions('daimao_mark'))
                if (suits.includes(suits)) return true;
            }
        },
        enable: 'chooseToUse',
        skillAnimation: 'epic',
        locked: true,
        filter(Evt, player) {
            if (Evt.type != 'dying') return false;
            if (player != Evt.dying) return false;
            return player.countCards('hes', card => {
                if (player.getExpansions('daimao_mark').filter((daimao) => get.suit(daimao) == get.suit(card)).length == 0) return true;
            });
        },
        filterCard(card, player) {
            if (player.getExpansions('daimao_mark').filter((daimao) => get.suit(daimao) == get.suit(card)).length == 0) return true;
        },
        position: 'he',
        content: [() => {
            let audio = 'daimao_' + player.getExpansions('daimao_mark').length;
            game.playAudio('skill', audio);
            game.broadcast(function (audio) {
                game.playAudio('skill', audio);
            }, audio);
            player.addToExpansion(cards, 'give', player).gaintag.add('daimao_mark');
        }, () => {
            player.loseMaxHp();
        }, () => {
            player.recover(player.maxHp - player.hp);
        }, () => {
            player.draw(3);
        }],
        ai: {
            skillTagFilter(player) {
                if (player.hp > 0) return false;
            },
            save: true,
            result: {
                player: 3,
            },
            threaten(player, target) {
                if (player.getExpansions('daimao_mark') <= 3 && player.countCards('he')) return 0.7;
            }
        },
        group: ['daimao_mark', 'daimao_start'],
        subSkill: {
            mark: new toSkill('mark', {
                intro: {
                    name: '呆毛',
                    content: 'expansion',
                    markcount: 'expansion',
                },
                onremove: function (player, skill) {
                    let cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            }, 'locked'),
            start: {
                forced: true,
                priority: 10,
                trigger: {
                    global: 'gameStart',
                    player: 'enterGame',
                },
                content() {
                    let cards = get.cards();
                    player.addToExpansion(cards, 'draw').gaintag.add('daimao_mark');
                },
            }
        }
    },
    hongtou: {
        group: ['hongtou2', 'hongtou_shan'],
        unique: true,
        zhuSkill: true,
        filter(Evt, player) {
            if (!player.hasZhuSkill('hongtou') || !game.hasPlayer(cur => cur != player && cur.isGuoV())) return false;
            return !Evt.hongtou && (Evt.type != 'phase' || !player.hasSkill('hongtou3'));
        },
        enable: ['chooseToUse', 'chooseToRespond'],
        viewAs: { name: 'sha' },
        filterCard: () => false,
        selectCard: -1,
        ai: {
            order() {
                return get.order({ name: 'sha' }) + 0.3;
            },
            respondSha: true,
            skillTagFilter(player) {
                if (!player.hasZhuSkill('hongtou') || !game.hasPlayer(cur => cur != player && cur.isGuoV())) return false;
            },
        },
        subSkill: {
            shan: {
                unique: true,
                zhuSkill: true,
                trigger: { player: ['chooseToRespondBefore', 'chooseToUseBefore'] },
                filter(Evt, player) {
                    if (Evt.responded) return false;
                    if (player.$.hongtou_shaning) return false;
                    if (!player.hasZhuSkill('hongtou_shan')) return false;
                    if (!Evt.filterCard({ name: 'shan' }, player, Evt)) return false;
                    return game.hasPlayer(cur => cur != player && cur.isGuoV());
                },
                check(Evt, player) {
                    if (get.damageEffect(player, Evt.player, player) >= 0) return false;
                    return true;
                },
                content() {
                    "step 0"
                    if (Evt.current == undefined) Evt.current = player.next;
                    if (Evt.current == player) {
                        Evt.finish();
                    } else if (Evt.current.isGuoV()) {
                        if ((Evt.current == game.me && !_status.auto) || (
                            get.$a(Evt.current, player) > 2) ||
                            Evt.current.isOnline()) {
                            player.$.hongtou_shaning = true;
                            let next = Evt.current.chooseToRespond(`是否替${get.$t(player)}打出一张闪？`, { name: 'shan' });
                            next.set('ai', function () {
                                let Evt = _status.event;
                                return (get.$a(Evt.player, Evt.source) - 2);
                            });
                            next.set('skillwarn', `替${get.$t(player)}打出一张闪`);
                            next.autochoose = lib.filter.autoRespondShan;
                            next.set('source', player);
                        }
                    }
                    "step 1"
                    player.$.hongtou_shaning = false;
                    if (result.bool) {
                        Evt.finish();
                        trigger.result = { bool: true, card: { name: 'shan', isCard: true } };
                        trigger.responded = true;
                        trigger.animate = false;
                        if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
                            Evt.current.ai.shown += 0.3;
                            if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
                        }
                    } else {
                        Evt.current = Evt.current.next;
                        Evt.goto(0);
                    }
                },
                ai: {
                    respondShan: true,
                    skillTagFilter(player) {
                        if (player.$.hongtou_shaning) return false;
                        if (!player.hasZhuSkill('hongtou_shan')) return false;
                        return game.hasPlayer(cur => cur != player && cur.isGuoV());
                    },
                },
            }
        }
    },
    hongtou2: {
        trigger: { player: ['useCardBegin', 'respondBegin'] },
        logTarget: 'targets',
        filter(Evt, player) {
            return Evt.skill == 'hongtou';
        },
        forced: true,
        content() {
            "step 0"
            delete trigger.skill;
            trigger.getParent().set('hongtou', true);
            "step 1"
            if (Evt.current == undefined) Evt.current = player.next;
            if (Evt.current == player) {
                player.addTempSkill('hongtou3');
                Evt.finish();
                trigger.cancel();
                trigger.getParent().goto(0);
            } else if (Evt.current.isGuoV()) {
                let next = Evt.current.chooseToRespond(`是否替${get.$t(player)}打出一张杀？`, { name: 'sha' });
                next.set('ai', function () {
                    let { player, source } = _status.event;
                    return (get.$a(player, source) - 2);
                });
                next.set('source', player);
                next.set('hongtou', true);
                next.set('skillwarn', `替${get.$t(player)}打出一张杀`);
                next.noOrdering = true;
                next.autochoose = lib.filter.autoRespondSha;
            } else {
                Evt.current = Evt.current.next;
                Evt.redo();
            }
            "step 2"
            if (result.bool) {
                Evt.finish();
                trigger.card = result.card;
                trigger.cards = result.cards;
                trigger.throw = false;
                if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
                    Evt.current.ai.shown += 0.3;
                    if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
                }
            } else {
                Evt.current = Evt.current.next;
                Evt.goto(1);
            }
        }
    },
    hongtou3: {
        trigger: { global: ['useCardAfter', 'useSkillAfter', 'phaseAfter'] },
        silent: true,
        charlotte: true,
        filter(Evt) {
            return Evt.skill != 'hongtou';
        },
        content() {
            player.removeSkill('hongtou3');
        }
    },
    //阿准
    tianqi: new toSkill('trigger', {
        priority: 10,
        trigger: {
            global: 'gameStart',
            player: 'enterGame',
        },
        content() {
            Evt.cards = get.cards();
            player.addToExpansion(Evt.cards, 'draw').gaintag.add('tianqi_mark');
            player.addSkill('tianqi_mark');
        },
    }, 'forced'),
    tianqi_mark: new toSkill('mark', {
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked', 'mark'),
    yubao: {
        trigger: { global: 'phaseZhunbeiBegin' },
        check(Evt, player) {
            return true;
        },
        filter(Evt, player) {
            return Evt.player.getExpansions('tianqi_mark');
        },
        frequent: true,
        content: [() => {
            Evt.num = game.countPlayer(cur => cur.getExpansions('tianqi_mark'));
            Evt.cards = get.cards(Evt.num);
            let next = player.chooseToMove('『预报』：将牌按顺序置于牌堆顶', true)
                .set('list', [
                    ['牌堆顶', Evt.cards],
                ])
                .set('reverse', (_status.currentPhase ? get.attitude(player, _status.currentPhase) > 0 : false))
                .set('processAI', function (list) {
                    let cards = list[0][1].slice(0);
                    cards.sort(function (a, b) {
                        return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                    });
                    return [cards];
                })
        }, () => {
            let tops
            if (result.bool && result.moved && result.moved[0].length) {
                tops = result.moved[0].slice(0);
            } else {
                tops = Evt.cards;
            }
            while (tops.length) {
                ui.cardPile.insertBefore(tops.pop(), ui.cardPile.firstChild);
            }
        }],
    },
    butaizhun: {
        subSkill: { used: {} },
        group: ["butaizhun_guess", "butaizhun_respond", "butaizhun_wuxie"],
        enable: "chooseToUse",
        filter(Evt, player) {
            if (player.hasSkill('butaizhun_used')) return false;
            if (!player.countCards('h')) return false;
            let list = ['sha', 'shan', 'tao', 'jiu', 'taoyuan', 'wugu', 'juedou', 'huogong', 'jiedao', 'tiesuo', 'guohe', 'shunshou', 'wuzhong', 'wanjian', 'nanman', 'haixiao', 'langyong', 'qinshi'];
            if (get.mode() == 'guozhan') {
                list = list.concat(['xietianzi', 'shuiyanqijunx', 'lulitongxin', 'lianjunshengyan', 'chiling', 'diaohulishan', 'yuanjiao', 'huoshaolianying']);
            }
            for (let i = 0; i < list.length; i++) {
                if (Evt.filterCard({ name: list[i] }, player)) return true;
            }
            return false;
        },
        chooseButton: {
            dialog() {
                let list = [];
                for (let i = 0; i < lib.inpile.length; i++) {
                    let name = lib.inpile[i];
                    if (name == 'wuxie') continue;
                    if (name == 'sha') {
                        list.push(['基本', '', 'sha']);
                        list.push(['基本', '', 'sha', 'fire']);
                        list.push(['基本', '', 'sha', 'thunder']);
                        list.push(['基本', '', 'sha', 'ice']);
                    } else if (get.type(name) == 'trick') list.push(['锦囊', '', name]);
                    else if (get.type(name) == 'basic') list.push(['基本', '', name]);
                }
                return ui.create.dialog('不太准', [list, 'vcard']);
            },
            filter(button, player) {
                let evt = _status.event.getParent();
                if (evt?.filterCard) {
                    return evt.filterCard({ name: button.link[2] }, player, evt);
                }
                return true;
            },
            backup(links, player) {
                return {
                    filterCard: true,
                    selectCard: 1,
                    viewAs: { name: links[0][2], nature: links[0][3] },
                }
            },
            prompt(links, player) {
                return `将一张手牌做当${get.$t(links[0][2])}使用`;
            },
        },
        ai: {
            save: true,
            respondShan: true,
            fireAttack: true,
            skillTagFilter(player) {
                if (player.hasSkill('butaizhun_used')) return false;
            },
            threaten: 1.2,
        },
    },
    butaizhun_guess: {
        audio: 2,
        trigger: {
            player: "useCardBefore",
        },
        filter(Evt, player) {
            return Evt.skill == "butaizhun_backup" || Evt.skill == "butaizhun_wuxie";
        },
        forced: true,
        direct: true,
        priority: 15,
        content: [() => {
            player.logSkill('butaizhun_guess');
            player.addTempSkill('butaizhun_used');
            player.popup(trigger.card.name, 'metal');
            player.lose(trigger.cards, ui.special);
            player.line(trigger.targets, trigger.card.nature);
            trigger.line = false;
            trigger.animate = false;
            Evt.prompt = `${get.$t(player)}声明了${get.$t(trigger.card.name)}，是否质疑？`;
            Evt.guessers = game.filterPlayer(cur => cur != player && !cur.getExpansions('tianqi_mark'));
            Evt.guessers.sort(lib.sort.seat);

            game.broadcastAll(card => {
                _status.guhuoNode = card.copy('thrown');
                if (lib.config.cardback_style != 'default') {
                    _status.guhuoNode.style.transitionProperty = 'none';
                    ui.refresh(_status.guhuoNode);
                    _status.guhuoNode.classList.add('infohidden');
                    ui.refresh(_status.guhuoNode);
                    _status.guhuoNode.style.transitionProperty = '';
                } else {
                    _status.guhuoNode.classList.add('infohidden');
                }
                _status.guhuoNode.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
                player.$throwordered2(_status.guhuoNode);
            }, trigger.cards[0]);


            Evt.onEnd01 = function () {
                _status.guhuoNode.removeEventListener('webkitTransitionEnd', Evt.onEnd01);
                _status.guhuoNode.style.transition = 'all ease-in 0.3s';
                _status.guhuoNode.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                let onEnd = function () {
                    _status.guhuoNode.classList.remove('infohidden');
                    _status.guhuoNode.style.transition = 'all 0s';
                    ui.refresh(_status.guhuoNode);
                    _status.guhuoNode.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                    ui.refresh(_status.guhuoNode);
                    _status.guhuoNode.style.transition = '';
                    ui.refresh(_status.guhuoNode);
                    _status.guhuoNode.style.transform = '';
                    _status.guhuoNode.removeEventListener('webkitTransitionEnd', onEnd);
                }
                _status.guhuoNode.listenTransition(onEnd);
            };
        }, () => {
            if (Evt.guessers.length == 0) Evt.goto(3);
            else {
                Evt.guessers[0].chooseControl('质疑', '不质疑').set('prompt', Evt.prompt).set('ai', function () {
                    if (get.$a(Evt.guessers[0], player) > 0) return '不质疑';
                    return Math.random() < 0.5 ? '不质疑' : '质疑';
                });
            }
        }, () => {
            if (!result.control) result.control = '不质疑';
            Evt.guessers[0].chat(result.control);
            game.delay(1);
            if (result.control == '不质疑') {
                game.log(Evt.guessers[0], '#g不质疑');
                Evt.guessers.remove(Evt.guessers[0]);
                Evt.goto(1);
            } else {
                game.log(Evt.guessers[0], '#y质疑');
            }
        }, () => {
            game.broadcastAll(function (onEnd) {
                _status.guhuoNode.listenTransition(onEnd);
            }, Evt.onEnd01);
        }, () => {
            game.delay(3.2);
        }, () => {
            if (!Evt.guessers.length) Evt.finish();
        }, () => {
            if (trigger.card.name == trigger.cards[0].name) {
                Evt.guessers[0].popup('质疑错误', 'fire');
                let cards = get.cards();
                player.addToExpansion(cards, 'draw').gaintag.add('tianqi_mark');
                player.addSkill('tianqi_mark');
                game.log(Evt.guessers[0], '获得了', '#g「天气」');
            } else {
                Evt.guessers[0].popup('质疑正确', 'wood');
                game.log(player, '使用的', trigger.card, '作废了');
                game.cardsDiscard(trigger.cards);
                game.broadcastAll(ui.clear);
                trigger.cancel();
                if (trigger.name == 'useCard' && trigger.parent) trigger.parent.goto(0);
            }
            game.delay();
        }],
    },
    butaizhun_respond: {
        trigger: {
            player: "chooseToRespondBegin",
        },
        filter(Evt, player) {
            if (player.hasSkill('butaizhun_used')) return false;
            if (Evt.responded) return false;
            if (!Evt.filterCard({ name: 'shan' }) && !Evt.filterCard({ name: 'sha' })) return false;
            if (!lib.filter.cardRespondable({ name: 'shan' }, player, Evt) && !lib.filter.cardRespondable({ name: 'sha' }, player, Evt)) return false;
            if (!player.countCards('h')) return false;
            return true;
        },
        direct: true,
        content() {
            "step 0"
            if (trigger.filterCard({ name: 'shan' }) && lib.filter.cardRespondable({ name: 'shan' }, player, trigger)) Evt.name = 'shan';
            else Evt.name = 'sha';
            player.chooseCard(`是否发动【不太准】，将一张手牌当做${get.$t(Evt.name)}打出？`);
            "step 1"
            if (result.bool) {
                player.logSkill('butaizhun_guess');
                player.addTempSkill('butaizhun_used')
                player.popup(Evt.name, 'metal');
                Evt.card = result.cards[0];
                player.lose(Evt.card, ui.special);
                Evt.prompt = `${get.$t(player)}声明了${get.$t(Evt.name)}，是否质疑？`;
                Evt.guessers = game.filterPlayer(cur => cur != player && !cur.getExpansions('tianqi_mark'));
                Evt.guessers.sort(lib.sort.seat);


                game.broadcastAll(card => {
                    _status.guhuoNode = card.copy('thrown');
                    if (lib.config.cardback_style != 'default') {
                        _status.guhuoNode.style.transitionProperty = 'none';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.classList.add('infohidden');
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transitionProperty = '';
                    } else {
                        _status.guhuoNode.classList.add('infohidden');
                    }
                    _status.guhuoNode.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
                    player.$throwordered2(_status.guhuoNode);
                }, result.cards[0]);


                Evt.onEnd01 = function () {
                    _status.guhuoNode.removeEventListener('webkitTransitionEnd', Evt.onEnd01);
                    _status.guhuoNode.style.transition = 'all ease-in 0.3s';
                    _status.guhuoNode.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                    let onEnd = function () {
                        _status.guhuoNode.classList.remove('infohidden');
                        _status.guhuoNode.style.transition = 'all 0s';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transition = '';
                        ui.refresh(_status.guhuoNode);
                        _status.guhuoNode.style.transform = '';
                        _status.guhuoNode.removeEventListener('webkitTransitionEnd', onEnd);
                    }
                    _status.guhuoNode.listenTransition(onEnd);
                };
            } else Evt.finish();
            "step 2"
            if (Evt.guessers.length == 0) Evt.goto(4);
            else {
                Evt.guessers[0].chooseControl('质疑', '不质疑').set('prompt', Evt.prompt).set('ai', function () {
                    if (get.$a(Evt.guessers[0], player) > 0) return '不质疑';
                    return Math.random() < 0.5 ? '不质疑' : '质疑';
                });
            }
            "step 3"
            if (!result.control) result.control = '不质疑';
            Evt.guessers[0].chat(result.control);
            game.delay();
            if (result.control == '不质疑') {
                game.log(Evt.guessers[0], '#g不质疑');
                Evt.guessers.remove(Evt.guessers[0]);
                Evt.goto(2);
            } else {
                game.log(Evt.guessers[0], '#y质疑');
            }
            "step 4"
            game.broadcastAll(function (onEnd) {
                _status.guhuoNode.listenTransition(onEnd);
            }, Evt.onEnd01);
            "step 5"
            game.delay(3.2);
            if (!Evt.guessers.length) Evt.goto(7);
            "step 6"
            if (Evt.name == Evt.card.name) {
                Evt.guessers[0].popup('质疑错误', 'fire');
                let cards = get.cards();
                player.addToExpansion(cards, 'draw').gaintag.add('tianqi_mark');
                player.addSkill('tianqi_mark');
                game.log(Evt.guessers[0], '获得了', '#g「天气」');
            } else {
                Evt.guessers[0].popup('质疑正确', 'wood');
                game.log(player, '打出的', '#y' + get.$t(Evt.name), '作废了');
                game.cardsDiscard(Evt.card);
                Evt.finish();
            }
            "step 7"
            trigger.untrigger();
            trigger.responded = true;
            trigger.result = { bool: true, card: { name: Evt.name }, cards: [Evt.card], noanimate: true };
        },
        ai: {
            order: 4,
            useful: -1,
            value: -1,
        },
    },
    butaizhun_wuxie: {
        log: false,
        silent: true,
        popup: false,
        enable: "chooseToUse",
        filterCard: true,
        viewAsFilter(player) {
            if (player.hasSkill('butaizhun_used')) return false;
            return player.countCards('h') > 0;
        },
        viewAs: {
            name: "wuxie",
        },
        check(card) {
            if (card.name == 'wuxie') return 1000;
            return 0;
        },
        prompt: "将一张手牌当无懈可击使用",
        threaten: 1.2,
    },
    //叽叽
    guangan: {
        trigger: { global: 'useCard2' },
        filter(Evt, player) {
            if (player.$.guangan >= game.countPlayer() - 1) return false;
            return Evt.player == player && (Evt.targets.includes(player.getNext()) || player.getStorage('zonghe').filter(function (zonghe) {
                return Evt.targets.includes(zonghe);
            }).length) || (Evt.player == player.getPrevious() || player.getStorage('zonghe').includes(Evt.player)) && Evt.targets.includes(player);
        },
        frequent: true,
        content: [() => {
            player.draw();
            if (!player.$.guangan) player.$.guangan = 0;
            player.$.guangan++;
        }, () => {
            player.markSkill('guangan');
        }],
        marktext: '叽',
        intro: {
            content: '本轮次已摸了&张牌',
            markcount(storage, player) {
                return player.$.guangan;
            }
        },
        group: 'guangan_clear',
        subSkill: {
            clear: {
                trigger: { global: 'roundStart' },
                forced: true,
                silent: true,
                firstDo: true,
                content() {
                    delete player.$.guangan;
                    player.unmarkSkill('guangan');
                }
            },
        }
    },
    lanxuan: {
        mod: {
            targetInRange(card, player, target) {
                if (_status.event.logSkill == 'lanxuan') return true;
            },
            cardUsable(card, player, num) {
                if (_status.event.logSkill == 'lanxuan') return Infinity;
            },
        },
        trigger: { source: 'damageAfter' },
        filter(Evt, player) {
            if (player.hasSkill('lanxuan_used1')) return false;
            return player.countCards('hs', card => player.hasUseTarget(card));
        },
        direct: true,
        usable: 1,
        content: [() => {
            player.chooseToUse({
                filterCard(card, player) {
                    return lib.filter.filterCard.apply(this, arguments);
                },
                prompt: get.$pro2('lanxuan')
            }).set('logSkill', ['lanxuan']).set('targetRequired', true);
        }, () => {
            if (result.bool) {
                player.addTempSkill('lanxuan_used1');
            }
        }],
        group: 'lanxuan_damageUse',
        subSkill: {
            damageUse: {
                trigger: { player: 'damageAfter' },
                filter(Evt, player) {
                    if (player.hasSkill('lanxuan_used2')) return false;
                    return player.countCards('hs', card => player.hasUseTarget(card));
                },
                direct: true,
                usable: 1,
                content: [() => {
                    player.chooseToUse({
                        filterCard(card, player) {
                            return lib.filter.filterCard.apply(this, arguments);
                        },
                        prompt: get.$pro2('lanxuan')
                    }).set('logSkill', ['lanxuan']).set('targetRequired', true);
                }, () => {
                    if (result.bool) {
                        player.addTempSkill('lanxuan_used2');
                    }
                }],
            },
            used1: {},
            used2: {},
        },
        ai: {
            threaten: 1.2,
        }
    },
    zonghe: {
        audio: true,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        unique: true,
        zhuSkill: true,
        trigger: { global: 'gameDrawAfter', player: 'enterGame' },
        filter(Evt, player) {
            if (!player.hasZhuSkill('zonghe')) return false;
            return game.hasPlayer(function (target) {
                return target != player && !player.getStorage('zonghe').includes(target)
                    && (get.name(target) in lib.characterPack.clubs || target.group == 'qun');
            });
        },
        direct: true,
        content: [() => {
            player.chooseTarget(get.$pro2('zonghe'), function (card, player, target) {
                return target != player && !player.getStorage('zonghe').includes(target)
                    && (get.name(target) in lib.characterPack.clubs || target.group == 'qun');
            }).set('ai', function (target) {
                let player = _status.event.player;
                if (target != player.getNext()) return 5 - get.$a(player, target);
                return 3 - get.$a(player, target);
            });
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('zonghe', Evt.target);
                player.$.zonghe.add(Evt.target);
                player.$.zonghe_mark = Evt.target;
                player.addSkill('zonghe_mark');
            }
        }],
        involve: 'guangan',
        subSkill: {
            mark: {
                mark: 'character',
                locked: true,
                intro: {
                    name: '纵合',
                    content: '对$发动『珖黯』时无视座次限制',
                },
            }
        }
    },
    //牛牛子
    qiying: new toSkill('trigger', {
        filter(Evt, player) {
            if (player == _status.currentPhase) return false;
            return lib.filter.cardEnabled({ name: 'nanman' }, player);
        },
        check(Evt, player) {
            let effect = 0;
            let players = game.players.slice(0);
            if (player.isTurnedOver() || player.isPhaseUsing()) effect += 3;
            for (let i = 0; i < players.length; i++) {
                if (players[i] != player && player.canUse('nanman', players[i])) effect += get.effect(players[i], { name: 'nanman' }, player, player);
            }
            return effect > 0;
        },
        content: [() => {
            player.turnOver();
        }, () => {
            player.chooseUseTarget({ name: 'nanman' }, true);
        }],
        involve: 'nanman'
    }).setT('damageAfter'),
    hengxuan: {
        trigger: { player: 'phaseJieshuBegin' },
        filter(Evt, player) {
            return true;
        },
        check(Evt, player) {
            return true;
        },
        frequent: true,
        content() {
            player.draw(2).gaintag = ['hengxuan'];
        },
        group: 'hengxuan_discardBy',
        subSkill: {
            discardBy: {
                mod: {
                    aiValue(player, card, num) {
                        if (card.hasGaintag && card.hasGaintag('hengxuan')) return num / 10;
                    },
                },
                trigger: { target: "useCardToTarget" },
                filter(Evt, player) {
                    return Evt.player != player && Evt.targets.length == 1 && player.countCards('h', (card) => card.hasGaintag('hengxuan'));
                },
                forced: true,
                content() {
                    let hs = player.getCards('h', card => card.hasGaintag('hengxuan'));
                    if (hs.length) player.discard(hs);
                }
            }
        }
    },
    //高原守
    mishou: {
        audio: 2,
        trigger: { global: 'gameDrawAfter', player: ['enterGame', 'changeHp'] },
        filter(Evt, player) {
            if (Evt.name == 'changeHp') return Evt.num != 0;
            return true;
        },
        forced: true,
        content() {
            if (player.hp == 0) {
                let reason = trigger.getParent();
                delete player.nodying;
                if (trigger.num > 0) player.dying(reason);
            } else {
                player.nodying = true;
                if (player.hp < 0 && !player.hasSkill('mishou_yingzi')) {
                    player.addAdditionalSkill('mishou', 'mishou_yingzi');
                } else if (player.hp > 0 && !player.hasSkill('mishou_guicai')) {
                    player.addAdditionalSkill('mishou', 'mishou_guicai');
                }
            }
        },
        ai: {
            effect: {
                target(card, player, target, cur) {
                    if (target.hp < 0) {
                        if (get.tag(card, 'recover') > 0) return [-1, 0];
                        if (target.hp == -1) return [1, -1];
                        if (get.tag(card, 'damage') >= 1 || get.tag(card, 'loseHp')) return [-1.5, 0];
                    }
                }
            }
        },
        involve: ['mishou_yingzi', 'mishou_guicai']
    },
    mishou_yingzi: {
        trigger: { player: 'phaseDrawBegin2' },
        forced: true,
        filter(Evt, player) {
            return !Evt.numFixed;
        },
        content() {
            trigger.num++;
        },
        ai: {
            threaten: 1.5
        },
        mod: {
            maxHandcardBase(player, num) {
                return player.maxHp;
            }
        }
    },
    mishou_guicai: {
        trigger: { global: 'judge' },
        direct: true,
        filter(Evt, player) {
            return player.countCards('he') > 0;
        },
        content() {
            "step 0"
            player.chooseCard(`${get.$t(trigger.player)}的${trigger.judgestr || ''}判定为${get.$t(trigger.player.judging[0])}，${get.$pro('mishou_guicai')}`, 'he', card => {
                let player = _status.event.player;
                let mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                if (mod2 != 'unchanged') return mod2;
                let mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                if (mod != 'unchanged') return mod;
                return true;
            }).set('ai', card => {
                let trigger = _status.event.getTrigger();
                let player = _status.event.player;
                let judging = _status.event.judging;
                let result = trigger.judge(card) - trigger.judge(judging);
                let att = get.$a(player, trigger.player);
                if (att == 0 || result == 0) return 0;
                if (att > 0) {
                    return result - get.value(card) / 2;
                } else {
                    return -result - get.value(card) / 2;
                }
            }).set('judging', trigger.player.judging[0]);
            "step 1"
            if (result.bool) {
                player.respond(result.cards, 'mishou_guicai', 'highlight', 'noOrdering');
            } else {
                Evt.finish();
            }
            "step 2"
            if (result.bool) {
                if (trigger.player.judging[0].clone) {
                    trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                    game.broadcast(card => {
                        if (card.clone) {
                            card.clone.classList.remove('thrownhighlight');
                        }
                    }, trigger.player.judging[0]);
                    game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                }
                game.cardsDiscard(trigger.player.judging[0]);
                trigger.player.judging[0] = result.cards[0];
                trigger.orderingCards.addArray(result.cards);
                game.log(trigger.player, '的判定牌改为', result.cards[0]);
                game.delay(2);
            }
        },
        ai: {
            rejudge: true,
            tag: {
                rejudge: 1,
            }
        }
    },
    yanwang: {
        trigger: { target: 'useCardToTarget' },
        filter(Evt, player) {
            return Evt.player != player;
        },
        direct: true,
        content: [() => {
            player.line(trigger.player, 'green');
            let check = get.recoverEffect(player, trigger.player, trigger.player);
            if (player.countCards('h') > 0) check += 0.5;
            check = check > 0;
            trigger.player.chooseBool(get.$pro2('yanwang', player)).set('choice', check > 0);
        }, () => {
            if (result.bool) {
                trigger.player.logSkill('yanwang', player);
                player.recover(trigger.player);
            } else Evt.finish();
        }, () => {
            if (player.countCards('h')) {
                trigger.player.gainPlayerCard(player, 'h', true, 'visibleMove');
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links) {
                if (get.color(result.links[0]) == 'black') {
                    if (!game.hasPlayer(cur => cur != player && cur != trigger.player && trigger.player.canUse('juedou', cur))) {
                        Evt.finish();
                        return;
                    }
                    Evt.source = trigger.player;
                    player.chooseTarget(true, function (card, player, target) {
                        let evt = _status.event.getParent();
                        return evt.source.canUse({ name: 'juedou' }, target);
                    }, `请选择一名角色，视为${get.$t(trigger.player)}对其使用【决斗】`).set('ai', function (target) {
                        let evt = _status.event.getParent();
                        return get.effect(target, { name: 'juedou' }, evt.source, _status.event.player) - 2;
                    });
                }
            } else Evt.finish();
        }, () => {
            if (result.bool && result.targets?.length) {
                trigger.player.useCard({ name: 'juedou', isCard: true }, result.targets[0], 'noai');
            }
        }],
    },
    //白夜真宵
    bykuangxin: {
        audio: 2,
        enable: 'phaseUse',
        usable: 1,
        content: [() => {
            if (Evt.cards == undefined) Evt.cards = [];
            if (Evt.d10 == undefined) Evt.d10 = [];
            let next = player.judge(card => {
                if (get.number(card) > 10) return 1.5;
                return 0;
            })
                .set('callback', function () {
                    let evt = Evt.getParent('bykuangxin');
                    if (get.number(card) > 10) {
                        Evt.getParent().orderingCards.remove(card);
                    } else {
                        evt.d10.unshift(card);
                        if (!evt.num) {
                            evt.num = 0;
                        }
                        evt.num++;
                        if (evt.d100 == undefined) {
                            evt.d100 = 0;
                            if (get.number(card) != 10) evt.d100 += get.number(card);
                        } else {
                            if (get.number(card) != 10 || evt.d100 == 0) evt.d100 += (get.number(card) * 10);
                        }
                        if (evt.num == 2) {
                            player.chat('1d100=' + evt.d100);
                            if (evt.d100 >= 96) player.popup('大失败', 'yami');
                            else if (evt.d100 <= 5) player.popup('大成功', 'wood');
                            else if (evt.d100 <= 40) player.popup('成功', 'wood');
                            else if (evt.d100 >= 61) player.popup('失败', 'yami');
                            game.delayx(1.5);
                        }
                    }
                    game.delayx(0.2);
                });
        }, () => {
            if (Evt.num != 2) {
                Evt.card = get.cards()[0];
                if (Evt.videoId == undefined) Evt.videoId = lib.status.videoId++;
                if (result.number > 10) Evt.cards.push(result.card);
                for (let i of Evt.cards) {
                    Evt.card = i;
                    game.addVideo('judge1', player, [get.cardInfo(Evt.card), false, Evt.videoId]);
                    game.broadcastAll(function (player, card, str, id, cardid) {
                        let Evt;
                        if (game.online) {
                            Evt = {};
                        } else {
                            Evt = _status.event;
                        }
                        if (game.chess) {
                            Evt.node = card.copy('thrown', 'center', ui.arena).animate('start');
                        } else {
                            Evt.node = player.$throwordered(card.copy(), true);
                        }
                        if (lib.cardOL) lib.cardOL[cardid] = Evt.node;
                        Evt.node.cardid = cardid;
                        Evt.node.classList.add('thrownhighlight');
                        ui.arena.classList.add('thrownhighlight');
                        Evt.dialog = ui.create.dialog(str);
                        Evt.dialog.classList.add('center');
                        Evt.dialog.videoId = id;
                    }, player, Evt.card, false, Evt.videoId, get.id());
                }
                game.addVideo('centernode', null, get.cardsInfo(Evt.cards));
                Evt.goto(0);
            } else {
                if (Evt.videoId) {
                    game.addVideo('judge2', null, Evt.videoId);
                    game.broadcast(function (id) {
                        let dialog = get.idDialog(id);
                        if (dialog) {
                            dialog.close();
                        }
                        ui.arena.classList.remove('thrownhighlight');
                    }, Evt.videoId);
                }
                for (let i = 0; i < Evt.cards.length; i++) {
                    if (get.position(Evt.cards[i], true) != 'o') {
                        Evt.cards.splice(i, 1);
                        i--;
                    }
                }
                player.gain(Evt.cards, 'gain2').gaintag.add('bykuangxin');
            }
        }, () => {
            if (Evt.d100) {
                player.showCards(Evt.d10, '『狂信』判定结果：' + Evt.d100);
                if (Evt.d100 >= 96) {
                    game.filterPlayer(cur => {
                        if (cur != player) player.randomGain('h', cur);
                    })
                } else if (Evt.d100 <= 5) {
                    player.draw(2);
                    player.gainMaxHp(true);
                } else if (Evt.d100 <= 40) {
                    player.recover();
                } else if (Evt.d100 <= 60) {
                } else if (Evt.d100 <= 95) {
                    player.loseHp();
                    if (player.needsToDiscard()) {
                        player.chooseToDiscard(player.needsToDiscard(), true);
                    }
                }
            }
        }, () => {
            if (Evt.d100) {
                if (Evt.d100 >= 96) {
                    player.loseMaxHp(true);
                    if (lib.config.background_audio) {
                        game.playAudio('effect', 'damage2');
                    }
                    game.broadcast(function () {
                        if (lib.config.background_audio) {
                            game.playAudio('effect', 'damage2');
                        }
                    });
                    player.$damage(player);
                } else if (Evt.d100 >= 41 && Evt.d100 <= 60) {
                    if (player.hasUseTarget('juedou')) {
                        player.chooseUseTarget({ name: 'juedou', isCard: true }, true);
                    }
                }
            }
        }],
        ai: {
            order: 6,
            result: {
                player: 1
            }
        },
    },
    //小柔
    rouqing: {
        init(player, skill) {
            player.$[skill] = 1;
            player.markSkill('rouqing');
        },
        marktext: '柔',
        intro: {
            content(storage, player) {
                let str = `下一次发动『柔情』时，（）值为：${get.cnNumber(player.$.rouqing)}`;
                return str;
            },
        },
        trigger: { global: 'changeHp' },
        filter(Evt, player) {
            return Evt.num < 0;
        },
        usable: 1,
        frequent(Evt, player) {
            return player == Evt.player;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        logTarget: 'player',
        content: [() => {
            Evt.num = -trigger.num;
            Evt.target = trigger.player;
            Evt.max = player.$.rouqing;
        }, () => {
            Evt.num--;
            Evt.cards = get.cards(4);
            Evt.target.chooseToMove(`『柔情』：获得至多(${get.cnNumber(Evt.max)})张牌`, true)
                .set('list', [
                    ['牌堆顶', Evt.cards],
                    ['牌堆底'],
                    ['获得'],
                ])
                .set('processAI', function (list) {
                    let cards = list[0][1].slice(0).sort(function (a, b) {
                        return get.value(b) - get.value(a);
                    })
                    return [[], cards.splice(Evt.max), cards];
                })
                .set('filterMove', function (from, to, moved) {
                    if (to == 0 || (to == 2 && moved[2].length >= _status.event.max)) return false;
                    return true;
                })
                .set('filterOk', function (moved) {
                    return moved[0].length == 0 && moved[2].length <= _status.event.max;
                })
                .set('max', Evt.max)
        }, () => {
            if (result.bool && result.moved) {
                Evt.bottoms = result.moved[1].slice(0)
                Evt.cards = result.moved[2].slice(0)
            }
            player.$.rouqing = 1;
        }, () => {
            let bottoms = Evt.bottoms.slice(0)
            game.log(Evt.target, `将${get.cnNumber(bottoms.length)}张牌置于牌堆底`)
            while (bottoms.length) {
                ui.cardPile.appendChild(bottoms.pop().fix());
            }
            game.updateRoundNumber();
            game.delayx();
            if (Evt.cards.length) {
                Evt.target.gain(Evt.cards);
            }
        }, () => {
            if (Evt.num > 0) Evt.goto(1);
        }],
        ai: {
            threaten: 1.9,
            expose: 0.1,
            maixie: true,
            maixie_hp: true,
        }
    },
    guangying: {
        trigger: {
            player: 'loseAfter',
            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
        },
        filter(Evt, player) {
            if (Evt.getParent().name == 'useCard') return false;
            let evt = Evt.getl(player);
            return evt?.hs?.length;
        },
        forced: true,
        content() {
            if (!player.$.rouqing) player.$.rouqing = 1;
            player.$.rouqing++;
            player.markSkill('rouqing');
        },
        ai: {
            combo: 'rouqing'
        },
        group: 'guangying_recoverBy',
        subSkill: {
            recoverBy: {
                trigger: {
                    player: 'gainAfter',
                },
                filter(Evt, player) {
                    return Evt.cards?.length >= 4;
                },
                forced: true,
                content() {
                    player.recover();
                },
            }
        }
    },
    //艾露露
    aldanyan: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he') > 0;
        },
        filterTarget(card, player, target) {
            if (target.hp >= player.hp) return true;
        },
        position: 'he',
        selectCard: 2,
        discard: false,
        prepare: 'give2',
        content: [() => {
            target.gain(cards, player);
        }, () => {
            Evt.list = [`令${get.$t(player)}获得你的三张牌`, '受到一点伤害']
            target.chooseControl('dialogcontrol', Evt.list).set('ai', function () {
                let { player, source, controls } = _status.event;
                if (get.$a(player, source) > 0 || player.countCards('he') == 0) return 0;
                if (get.damageEffect(player, source, player) < 0 && player.hp == 1) return 0;
                if (get.damageEffect(player, source, player) > 0) return 1;
                return controls.randomGet();
            }).set('source', player);
        }, () => {
            switch (result.control) {
                case Evt.list[0]: {
                    player.gainPlayerCard(target, [1, 3], true, 'he', 'visible');
                    break;
                }
                case Evt.list[1]: {
                    target.damage(player, 'nocard');
                    game.delayx();
                    break;
                }
            }
        }],
        ai: {
            order(item, player) {
                return 6
            },
            result: {
                player(player, target) {
                    return -1;
                },
                target(player, target) {
                    if (target.countCards('he')) return -2;
                    return get.damageEffect(target, player, target);
                }
            },
            threaten: 0.4,
            expose: 0.2,
        },
    }, 'filterCard'),
    hunao: new toSkill('trigger', {
        priority: 199,
        filter(Evt, player) {
            return Evt.player.hp <= player.hp;
        },
        content: [() => {
            let list = lib.linked.slice(0);
            list.remove('kami');
            list.remove(trigger.nature);
            Evt.map = {};
            for (let i = 0; i < list.length; i++) {
                Evt.map[get.rawName(list[i])] = list[i];
                list[i] = get.rawName(list[i]);
            }
            list.push('取消');
            player.chooseControl('dialogcontrol', list).set('ai', () => list.randomGets()).set('prompt', get.$pro2('hunao'));
        }, () => {
            if (result.control != '取消') {
                Evt.target = trigger.player
                player.logSkill('hunao', Evt.target)
                trigger.nature = Evt.map[result.control]
                trigger.num++
                let halt = game.createEvent('halt');
                Evt.next.remove(halt);
                trigger.after.push(halt);
                halt.setContent(function () {
                    let use = _status.event.getParent('phaseUse');
                    if (use && use.name == 'phaseUse') {
                        use.skipped = true;
                    }
                    let phase = _status.event.getParent('phase');
                    if (phase && phase.name == 'phase') {
                        phase.finish();
                    }
                });
            } else {
                Evt.finish();
            }
        }]
    }, 'direct').setT({ source: 'damageBegin2' }),
    //木糖纯
    zuanyan: new toSkill('trigger', {
        filter(Evt, player) {
            return _status.discarded.length
        },
        content: [() => {
            player.chooseCardButton(_status.discarded, get.$pro2('zuanyan'))
                .set('logSkill', 'zuanyan')
        }, () => {
            if (result.bool) {
                Evt.card = result.cards[0]
                player.showCards(Evt.card, '『钻研』获得牌');
                player.gain(Evt.card, 'gain2', 'log').gaintag.add('zuanyan');
                game.delayx();
            }
        }],
        ai: {
            threaten(player, target) {
                if (_status.discarded.length) return 0.7;
                return 1.1;
            },
            maixie: true,
            skillTagFilter(player) {
                if (!_status.discarded.length) return false;
            },
        },
    }).setT('damage', 'After'),
    diji: new toSkill('trigger', {
        filter(Evt, player) {
            if (!player.getGroups().includes('xuyan')) return false
            return player.getDamagedHp() && player.hp < player.maxHp;
        },
        content: [() => {
            let check = player.hp <= 2
            player.chooseCard(get.$pro2('diji'), 'h')
                .set('ai', (card) => {
                    if (!_status.event.check) return -1
                    return get.unuseful2(card)
                })
                .set('check', check)
        }, () => {
            if (result.bool && result.cards) {
                player.recover(player.getDamagedHp())
            }
            else Evt.finish()
        }, () => {
            if (result) {
                player.$.diji_houxu = result
            }
        }],
        group: 'diji_houxu',
        subSkill: {
            houxu: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.$.diji_houxu
                },
                content: [() => {
                    player.loseHp(player.$.diji_houxu)
                }, () => {
                    delete player.$.diji_houxu
                }],
            }).setT('phaseBegin')
        }
    }, 'direct').setT('phaseZhunbei'),
    yaoyan: new toSkill('trigger', {
        usable: 1,
        filter(Evt, player) {
            if (!player.getGroups().includes('qun')) return false
            return Evt.card.name === 'wuxie';
        },
        content: [() => {
            player.chooseTarget(get.$pro2('yaoyan'), true)
                .set('ai', (tar) => {
                    return (get.damageEffect(tar, null, player) - get.damageEffect(tar))
                })
        }, () => {
            if (result.bool && result.targets.length) {
                Evt.tar = result.targets[0]
                player.line(Evt.tar)
                Evt.tar.damage('nosource')
                game.delayx()
            }
        }],
        ai: {
            expose: 0.1,
        }
    }).setT('useCard'),
    //蜜球兔
    zhazong: {
        trigger: { player: 'phaseUseEnd' },
        direct: true,
        audio: 3,
        filter(Evt, player) {
            return !player.hasHistory('useCard', evt => get.type2(evt.card) == 'basic' && evt.getParent('phaseUse') == Evt)
                || !player.hasHistory('useCard', evt => get.type2(evt.card) == 'equip' && evt.getParent('phaseUse') == Evt)
                || !player.hasHistory('useCard', evt => get.type2(evt.card) == 'trick' && evt.getParent('phaseUse') == Evt);
        },
        content: [() => {
            let position = '';
            let str = '弃置一名角色';
            if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'basic' && evt.getParent('phaseUse') == trigger)) {
                position += 'h';
                str += ' 手牌区 ';
            }
            if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'equip' && evt.getParent('phaseUse') == trigger)) {
                position += 'e';
                str += ' 装备区 ';
            }
            if (!player.hasHistory('useCard', evt => get.type2(evt.card) == 'trick' && evt.getParent('phaseUse') == trigger)) {
                position += 'j';
                str += ' 判定区 ';
            }
            Evt.position = position;
            if (position.length) {
                str += '各至多一张牌';
                player.chooseTarget(get.$pro('zhazong'), function (card, player, target) {
                    return target.countCards(_status.event.position);
                }).set('position', position).set('prompt2', str).set('ai', function (target) {
                    let player = _status.event.player;
                    let att = get.$a(player, target);
                    if (att < 0) {
                        att = -Math.sqrt(-att);
                    } else {
                        att = Math.sqrt(att);
                    }
                    if (_status.event.position == 'h') return -att;
                    return att * lib.card.guohe.ai.result.target(player, target);
                });
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                player.logSkill('zhazong', result.targets);
                Evt.target = result.targets[0];
                player.discardPlayerCard(Evt.target, Evt.position, [1, Evt.position.length], true).set('filterButton', function (button) {
                    for (let i = 0; i < ui.selected.buttons.length; i++) {
                        if (get.position(button.link) == get.position(ui.selected.buttons[i].link)) return false;
                    }
                    return true;
                });
            }
        }]
    },
    mengnan: new toSkill('trigger', {
        filter(Evt, player) {
            if (Evt.name == 'addJudge' && Evt.player == player) return true;
            let evt = Evt.getl(player);
            return evt?.js?.length > 0 && !player.hasSkill('misuzu_zhongxing_haruko');
        },
        content() {
            let draw = false, num = 2;
            if (trigger.name == 'addJudge' && trigger.player == player) draw = true
            let evt = trigger.getParent('phaseJudge');
            if (evt?.name == 'phaseJudge') {
                num = 1;
            }
            if (draw) player.draw(num);
            else player.chooseToDiscard(num, true);
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.name(card) == 'shandian') {
                        return [1, 1];
                    }
                }
            }
        },
        subSkill: {
            yuenanBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.isAlive();
                },
                content() {
                    player.removeSkill('mengnan')
                    player.addSkill('yuenan')
                },
            }, 'forced').setT('dyingAfter')
        },
        group: 'mengnan_yuenanBy',
        derivation: 'yuenan'
    }, 'forced').setT({
        player: ['loseAfter', 'addJudgeAfter'],
        global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
    }),
    //无理
    lique: {
        trigger: { target: 'useCardToTargeted' },
        forced: true,
        filter(Evt, player) {
            return get.type(Evt.card) != 'equip';
        },
        content: [() => {
            player.loseHp();
        }, () => {
            player.draw();
        }],
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (target.hp < 0) return [0, 1];
                    if (get.type(card) != 'equip') return [1, 2];
                }
            }
        }
    },
    zhangdeng: {
        trigger: { player: 'dying' },
        forced: true,
        filter: (Evt, player) => true,
        content() {
            player.recover();
            game.delayx();
        },
        ai: {
            maixie_defend: true,
            threaten(player, target) {
                if (target.hp == 1) return 0.6;
                return 1;
            },
            effect: {
                target(card, player, target, current) {
                    if (target.hujia) return;
                    if (player._zhangdeng_tmp) return;
                    if (_status.event.getParent('useCard', true) || _status.event.getParent('_wuxie', true)) return;
                    if (get.tag(card, 'damage')) {
                        let basic = player.$.shangdong || 0;
                        if (get.$a(player, target) > 0 && target.hp > 1) {
                            return basic;
                        }
                        if (get.$a(player, target) < 0 && !player.hasSkillTag('damageBonus', false, {
                            name: card ? card.name : null,
                            target: target,
                            card: card
                        })) {
                            if (card.name == 'sha') return;
                            let sha = false;
                            player._zhangdeng_tmp = true;
                            let num = player.countCards('h', card => {
                                if (card.name == 'sha') {
                                    if (sha) {
                                        return false;
                                    }
                                    else {
                                        sha = true;
                                    }
                                }
                                return get.effect(target, card, player, player) + basic > 0;
                            });
                            delete player._zhangdeng_tmp;
                            if (player.hasSkillTag('damage')) {
                                num++;
                            }
                            if (num < 2) {
                                let enemies = player.getEnemies();
                                if (enemies.length == 1 && enemies[0] == target && player.needsToDiscard()) {
                                    return;
                                }
                                return basic;
                            }
                        }
                    }
                }
            }
        }
    },
    //Aza
    qiding: {
        enable: 'phaseUse',
        usable: 1,
        filter: (Evt, player) => player.countCards('h'),
        filterTarget(card, player, target) {
            return player.inRange(target);
        },
        content: [() => {
            target.viewHandcards(player);
        }, () => {
            Evt.list = ['受到一点伤害', `令${get.$t(player)}观看并获得你的一张牌，且防止其对你的伤害直到本回合结束`];
            target.chooseControl('dialogcontrol', Evt.list).set('ai', function () {
                let player = _status.event.player, source = _status.event.source, controls = _status.event.controls.slice(0);
                if (get.$a(player, source) > 0 || player.countCards('he') == 0) return 1;
                if (get.damageEffect(player, source, player) < 0 && player.hp == 1) return 1;
                if (get.damageEffect(player, source, player) > 0) return 0;
                return controls.randomGet();
            }).set('source', player);
        }, () => {
            switch (result.control) {
                case Evt.list[0]: {
                    target.damage(player);
                    game.delayx();
                    break;
                }
                case Evt.list[1]: {
                    player.gainPlayerCard(target, 'he', 'visible');
                    player.$.qiding_respondDam = target;
                    player.addTempSkill('qiding_respondDam');
                    break;
                }
            }
        }],
        subSkill: {
            respondDam: {
                mark: 'character',
                intro: {
                    name: '契定',
                    content: '防止对$造成的伤害',
                },
                onremove: true,
                forced: true,
                trigger: { source: 'damageBegin' },
                filter(Evt, player) {
                    return player.$.qiding_respondDam == Evt.player;
                },
                content() {
                    trigger.changeToZero();
                },
                ai: {
                    effect: {
                        player(card, player, target, current) {
                            if (target && target == player.$.qiding_respondDam && get.tag(card, 'damage')) return 'zeroplayertarget';
                        }
                    }
                }
            }
        },
        ai: {
            order: 6,
            result: {
                target: -1,
            },
            threaten: 1.1,
        }
    },
    chouxin: {
        trigger: { player: 'loseEnd' },
        filter(Evt, player) {
            if (!Evt.visible) return false;
            for (let i = 0; i < Evt.hs.length; i++) {
                if (get.suit(Evt.hs[i]) == 'heart') return true;
            }
            return false;
        },
        forced: true,
        content() {
            if (player.isHealthy()) player.loseHp();
            else player.recover();
            player.addTempSkill('chouxin_skipDiscard');
        },
        subSkill: {
            skipDiscard: {
                mark: true,
                intro: {
                    name: '酬心',
                    content: '跳过弃牌阶段',
                },
                trigger: { player: 'phaseDiscardBefore' },
                forced: true,
                content() {
                    trigger.cancel();
                },
            }
        }
    },
    //Mhr
    jusheng: {
        trigger: { global: 'phaseZhunbeiBegin' },
        check(Evt, player) {
            return Evt.player.countCards('e') > player.countCards('e');
        },
        logTarget: 'player',
        filter(Evt, player) {
            return (Evt.player.countCards('e') || player.countCards('e')) && player != Evt.player;
        },
        round: 1,
        content: [() => {
            Evt.target = trigger.player;
            Evt.prenum = Evt.target.countCards('e');
            player.swapEquip(Evt.target);
        }, () => {
            if (Evt.target.countCards('e') > Evt.prenum) {
                Evt.target.$.jusheng_shiyue = player;
                Evt.target.addTempSkill('jusheng_shiyue');
                Evt.finish();
            } else if (Evt.target.countCards('e') < Evt.prenum) {
                player.chooseTarget('『剧生』：令你或其调整手牌至与对方相同', true, function (card, player, target) {
                    return _status.event.targets.includes(target);
                }, function (target) {
                    let num = _status.event.targets.slice(0).remove(target)[0].countCards('h') - target.countCards('h');
                    return get.$a2(target) * num;
                }).set('targets', [player, Evt.target]);
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                let target = Evt.target;
                let num = player.countCards('h') - target.countCards('h');
                switch (result.targets[0]) {
                    case player:
                        if (num > 0) player.chooseToDiscard(num, true);
                        else if (num < -0) player.draw(-num);
                        break;
                    case target:
                        if (num > 0) target.draw(num);
                        else if (num < -0) target.chooseToDiscard(-num, true);
                        break;
                }
            }
        }],
        subSkill: {
            shiyue: {
                mark: 'character',
                intro: {
                    name: '剧生',
                    mark(dialog, content, player) {
                        if (content) {
                            dialog.addAuto([content]);
                        }
                    },
                    content: '被$发动了『剧生』',
                },
                onremove: true,
                trigger: { player: 'useCard2' },
                filter(Evt, player) {
                    if (!player.$.jusheng_shiyue.isIn()) return false;
                    return Evt.targets.includes(player) || Evt.targets.includes(player.$.jusheng_shiyue);
                },
                direct: true,
                lastDo: true,
                content() {
                    Evt.source = player.$.jusheng_shiyue;
                    player.line(Evt.source);
                    Evt.source.chooseUseTarget({ name: 'sha', isCard: false }, false).set('logSkill', 'jusheng');
                    game.delayx();
                },
                ai: {
                    effect: {
                        player(card, player, target, current) {
                            if (player.$.jusheng_shiyue.isIn() && target) {
                                if ([player.$.xingxu_shiyue, player].includes(target) && get.$a(player, player.$.jusheng_shiyue)) return [1, 0.5];
                            }
                        }
                    }
                }
            },
        },
        ai: {
            expose: 0.2
        },
    },
    xingqu: {
        trigger: { global: 'dying' },
        limited: true,
        skillAnimation: true,
        animationColor: 'yami',
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0 || (get.$a(player, Evt.player) > -1 && player.isDamaged());
        },
        filter(Evt, player) {
            return Evt.player != player && Evt.reason && Evt.reason.source == player;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            player.loseMaxHp();
            player.awakenSkill('xingqu');
        }, () => {
            Evt.target.recover();
            Evt.choice = get.gainableSkills().randomGets(3);
            Evt.prompt = '『星取』：选择一个技能';
            if (_status.connectMode) Evt.goto(5);
        }, () => {
            Evt.target.chooseButton([Evt.prompt, [Evt.choice, 'vcard']], true).set('ai', function (button) {
                return 1 + Math.random();
            });
        }, () => {
            Evt.tarSkill = result.links[0][2];
            player.chooseButton([Evt.prompt, [Evt.choice, 'vcard']], true).set('ai', function (button) {
                return 1 + Math.random();
            });
        }, () => {
            Evt.mySkill = result.links[0][2];
            Evt.goto(7);
        }, () => {
            let list = [[player, [Evt.prompt, [Evt.choice, 'vcard']], true],
            [Evt.target, [Evt.prompt, [Evt.choice, 'vcard']], true]];
            player.chooseButtonOL(list).set('switchToAuto', function () {
                _status.event.result = 'ai';
            }, function () { }, function () { return 1 + Math.random() }).set('processAI', function () {
                let buttons = _status.event.dialog.buttons;
                return {
                    bool: true,
                    links: [buttons.randomGet().link],
                }
            });
        }, () => {
            Evt.mySkill = result[player.playerid].links[0][2];
            Evt.tarSkill = result[Evt.target.playerid].links[0][2];
        }, () => {
            player.popup(get.$t(Evt.mySkill));
            Evt.target.popup(get.$t(Evt.tarSkill));
            if (Evt.mySkill == Evt.tarSkill) {
                player.line2([Evt.target, player]);
                player.addAdditionalSkill('xingqu', 'xingqu2', true);
            } else {
                player.addSkillLog(Evt.tarSkill);
                player.addAdditionalSkill('xingqu', Evt.tarSkill, true);
            }
        }],
    },
    xingqu2: {
        trigger: { source: 'damageBegin1' },
        forced: true,
        charlotte: true,
        content() {
            trigger.num++;
        },
        mark: true,
        intro: {
            content: '造成伤害时，此伤害+1',
        },
    },
    //Miki
    xingxu: {
        trigger: { global: 'phaseZhunbeiBegin' },
        check(Evt, player) {
            if (get.$a(player, Evt.player) >= 1) {
                return player.countCards('he') >= player.hp;
            } else {
                return player.countCards('he', card => get.value(card) <= 0) >= 2;
            }
            return false;
        },
        logTarget: 'player',
        filter(Evt, player) {
            return player.countCards('he') >= 2 && player != Evt.player;
        },
        round: 1,
        content: [() => {
            Evt.target = trigger.player;
            player.chooseCard(2, true, 'he', `『星许』交给${get.$t(Evt.target)}两张牌`).set('ai', card => {
                return _status.event.att >= 1 ? get.value(card) : -get.value(card);
            }).set('att', get.$a(player, Evt.target));
        }, () => {
            if (result.bool) {
                Evt.cards = result.cards;
                player.give(Evt.cards, Evt.target, true);
                Evt.target.$.xingxu_shiyue = player;
                Evt.target.$.xingxu_shiyue2 = Evt.cards;
                Evt.target.addTempSkill('xingxu_shiyue');
                Evt.target.addTempSkill('xingxu_shiyue2');
            }
        }],
        subSkill: {
            shiyue: {
                mark: 'character',
                intro: {
                    name: '星许',
                    mark(dialog, content, player) {
                        if (content) {
                            dialog.addAuto([content]);
                            dialog.addAuto(player.$.xingxu_shiyue2);
                        }
                    },
                    content: '被$发动了『星许』',
                },
                onremove: true,
                trigger: { player: 'phaseEnd' },
                filter(Evt, player) {
                    if (!player.$.xingxu_shiyue.isIn()) return false;
                    return player.hasHistory('sourceDamage', evt => {
                        return evt.player == player.$.xingxu_shiyue;
                    });
                },
                forced: true,
                lastDo: true,
                content() {
                    Evt.source = player.$.xingxu_shiyue;
                    player.line(Evt.source);
                    Evt.source.recover(Evt.source);
                    game.delayx();
                },
                ai: {
                    effect: {
                        player(card, player, target, current) {
                            if (target && target == player.$.xingxu_shiyue && get.tag(card, 'damage') && !player.getHistory('sourceDamage', evt => {
                                return evt.player == player.$.xingxu_shiyue;
                            }).length) return [1, 0, 1, 1];
                        }
                    }
                }
            },
            shiyue2: {
                onremove: true,
                trigger: { player: 'phaseEnd' },
                filter(Evt, player) {
                    if (!player.$.xingxu_shiyue.isIn()) return false;
                    let cards = player.$.xingxu_shiyue2.slice(0);
                    player.getHistory('useCard', evt => {
                        cards.removeArray(evt.cards);
                    });
                    return cards.length == 1;
                },
                direct: true,
                content: [() => {
                    player.line(Evt.source);
                    game.delayx();
                    Evt.source = player.$.xingxu_shiyue;
                    Evt.cards = player.$.xingxu_shiyue2.slice(0);
                    player.getHistory('useCard', evt => {
                        Evt.cards.removeArray(evt.cards);
                    });
                }, () => {
                    if (Evt.cards.length == 1 && Evt.source.hasUseTarget(Evt.cards[0])) {
                        let card = game.createCard(Evt.cards[0].name, Evt.cards[0].suit, Evt.cards[0].number, Evt.cards[0].nature)
                        Evt.source.chooseUseTarget(card, `视为使用一张${get.$t(card)}`, true);
                    }
                }],
                mod: {
                    aiOrder(player, card, num) {
                        if (get.$a(player, player.$.xingxu_shiyue) > 1 && player.$.xingxu_shiyue2) {
                            if (player.$.xingxu_shiyue2.includes(card)
                                && player.getHistory('useCard', evt => player.$.xingxu_shiyue2.includes(evt.card)).length == 1) {
                                if (player.needsToDiscard()) return num - 2;
                                else return num - 8;
                            }
                        }
                    },
                },
            }
        },
        ai: {
            expose: 0.2
        },
    },
    qingsui: {
        init(player, skill) {
            if (!player.$[skill]) {
                player.$[skill] = 1;
            }
            player.addAdditionalSkill('qingsui', 'qingsui_jiai')
        },
        trigger: { player: ['useCardAfter', 'respondAfter', 'qingsui_shengyinAfter', 'qingsui_quanyuAfter'] },
        filter(Evt, player) {
            if (['useCard', 'respond'].includes(Evt.name)) return Evt.skill == 'qingsui_jiai_backup';
            return true;
        },
        locked: true,
        direct: true,
        content: [() => {
            if (player.$.qingsui == 3) player.$.qingsui = 1;
            else player.$.qingsui++;
            player.addAdditionalSkill('qingsui', ['qingsui_jiai', 'qingsui_shengyin', 'qingsui_quanyu'][player.$.qingsui - 1])
        }, () => {
            player.updateMarks('qingsui')
            if (player.$.qingsui == 1) {
                Evt.target = _status.currentPhase;
                if (Evt.target.countGainableCards(player, 'he') && Evt.target != player) {
                    player.line(Evt.target);
                    player.gainPlayerCard(Evt.target, 'he');
                }
            }
        }],
        subSkill: {
            jiai: {
                inherit: "jiai",
                filter(Evt, player) {
                    if (player.$.qingsui != 1) return false;
                    if (player.countCards('h') < 2) return false;
                    let filterCard = Evt.filterCard || function (card, player, Evt) {
                        return true;
                    };
                    let jiaiCards = [];
                    for (let i = 0; i < lib.inpile.length; ++i) {
                        if (get.type(lib.inpile[i]) != 'basic') continue;
                        let card = { name: lib.inpile[i] };
                        if (filterCard(card, player, Evt)) {
                            jiaiCards.push(card);
                        }

                    }
                    return jiaiCards.length > 0;
                },
            },
            shengyin: {
                inherit: "shengyin",
                filter(Evt, player) {
                    if (player.$.qingsui != 2) return false;
                    return true;
                },
            },
            quanyu: {
                inherit: "quanyu",
                filter(Evt, player) {
                    if (player.$.qingsui != 3) return false;
                    let suit = get.suit(Evt.card);
                    return Evt.cards && Evt.cards.length && suit != 'none' && Evt.player != player && !player.countCards('h', card => suit == get.suit(card));
                },
            },
        },
        involve: ['jiai', 'shengyin', 'quanyu']
    },
    //勾檀Mayumi
    jinzhou: new toSkill('trigger', {
        group: ['jinzhou_level'],
        trigger: { player: 'loseEnd' },
        filter(Evt, player) {
            return Evt.es.filter(card => get.subtype(card) == 'equip2').length;
        },
        content: [() => {
            if (!player.$.jinzhou_level) {
                player.$.jinzhou_level = 1;
            }
            player.draw(player.$.jinzhou_level);
        }, () => {
            let str = '选择一个技能（）值+1'
            let list = ['jinzhou', 'gouhun']
            player.chooseButton([str, [list, 'vcard'], 'hidden'], true)
        }, () => {
            if (result.bool && result.links) {
                game.playAudio('effect', 'hujia');
                game.broadcast(function () {
                    game.playAudio('effect', 'hujia');
                });
                let link = result.links[0][2]
                player.$[`${link}_level`] && player.$[`${link}_level`]++;
            }
        }],
        subSkill: {
            level: new toSkill('mark', {
                mark: 'image',
                intro: {
                    content: '『晋胄』等级：#'
                }
            }).setI(1),
        },
        ai: {
            combo: 'gouhun',
            effect: {
                target(card, player, target, current) {
                    if (get.type(card) == 'equip' && get.subtype(card) == 'equip2') return [1, 2];
                }
            }
        }
    }, 'forced'),
    gouhun: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            if (!player.$.gouhun_level) {
                player.$.gouhun_level = 1;
            }
            let list = get.cards(player.$.gouhun_level + 2);
            Evt.list = list;
            player.showCards(list, '『勾魂』亮出牌');
        }, () => {
            Evt.cards = Evt.list.slice(0);
            player.chooseCardButton(Evt.list, '获得其中一种类型的牌<br>（取消则+1等级）');
        }, () => {
            if (result.bool) {
                let type = get.type2(result.links[0]), cards = Evt.cards.filter(card => get.type2(card) == type);
                player.showCards(cards, '『勾魂』获得牌');
                game.delayx();
                player.gain(cards, 'gain2', 'log').gaintag.add('gouhun');
                Evt.cards.removeArray(cards);
                Evt.goto(4)
            } else {
                let str = '选择一个技能（）值+1'
                let list = ['jinzhou', 'gouhun']
                player.chooseButton([str, [list, 'vcard'], 'hidden'], true)
            }
        }, () => {
            if (result.bool && result.links) {
                game.playAudio('effect', 'hujia');
                game.broadcast(function () {
                    game.playAudio('effect', 'hujia');
                });
                let link = result.links[0][2]
                if (player.$[`${link}_level`]) {
                    player.$[`${link}_level`]++;
                    player.markSkill(`${link}_level`);
                }
            }
        }, () => {
            game.cardsDiscard(Evt.cards);
        }],
        mod: {
            ignoredHandcard(card, player) {
                if (card.hasGaintag('gouhun') && get.type2(card) == 'trick') {
                    return true;
                }
            },
            cardDiscardable(card, player, name) {
                if (name == 'phaseDiscard' && card.hasGaintag('gouhun') && get.type2(card) == 'trick') {
                    return false;
                }
            },
            aiOrder(player, card, num) {
                if (get.itemtype(card) == 'card' && card.hasGaintag('gouhun') && get.type(card) == 'basic') return num + 0.1;
            },
        },
        group: ['gouhun_level', 'gouhun_reCount'],
        subSkill: {
            level: new toSkill('mark', {
                mark: 'image',
                intro: {
                    content: '『勾魂』等级：#'
                }
            }).setI(1),
            reCount: {
                trigger: { player: 'useCard1' },
                firstDo: true,
                silent: true,
                filter(Evt, player) {
                    return get.type(Evt.card) == 'basic' && Evt.cards.length == 1 && player.hasHistory('lose', evt => {
                        if (evt.getParent() != Evt) return false;
                        for (let i in evt.gaintag_map) {
                            if (evt.gaintag_map[i].includes('gouhun')) return true;
                        }
                        return false;
                    });
                },
                content() {
                    if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        let stat = player.getStat().card;
                        if (stat[trigger.card.name]) stat[trigger.card.name]--;
                    }
                },
            }
        },
        involve: 'jinzhou',
        ai: {
            order: 5,
            result: {
                player: 1
            },
            threaten: 1.5
        },
    }),
    //千幽Chiyuu
    anyou: {
        trigger: { player: ['phaseUseBegin', 'damageAfter'] },
        priority: 199,
        filter(Evt, player) {
            return game.countPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
        },
        check(Evt, player) {
            return player.hp > 1;
        },
        logTarget(Evt, player) {
            return game.filterPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
        },
        content: [() => {
            Evt.targets = game.filterPlayer(cur => cur != player && get.$dis(cur, player) <= 1);
            Evt.targets.sortBySeat(player);
        }, () => {
            Evt.target = Evt.targets.shift();
            Evt.target.chooseToUse(`『暗友』：请选择要使用的牌`);
        }, () => {
            if (result.bool || Evt.target.countCards('he') == 0) {
                Evt.goto(4);
            } else {
                Evt.target.chooseCard('he', true, `『暗友』：交给${get.$t(player)}一张牌`);
            }
        }, () => {
            if (result.bool && result.cards) {
                Evt.target.give(result.cards, player, true);
            }
        }, () => {
            if (Evt.targets.length) Evt.goto(1);
        }],
        group: ['anyou_drawBy'],
        subSkill: {
            drawBy: {
                trigger: { target: 'useCardToTarget' },
                priority: 199,
                forced: true,
                filter(Evt, player) {
                    let evt0 = Evt.getParent('anyou');
                    let evt1 = Evt.getParent('chooseToUse');
                    return (evt0 && evt0.name == 'anyou') && (evt1 && evt1.name == 'chooseToUse');
                },
                content() {
                    player.draw();
                },
            },
        },
        ai: {
            maixie: true,
        }
    },
    mingyou: {
        trigger: { target: 'useCardToTarget' },
        filter(Evt, player) {
            return Evt.player.getHistory('damage').length;
        },
        frequent(Evt, player) {
            return player.isDamaged() || Evt.player == player;
        },
        content: [() => {
            Evt.targets = [player];
            Evt.targets.add(trigger.player);
        }, () => {
            Evt.targets.shift().recover();
        }, () => {
            if (Evt.targets.length) Evt.goto(1);
        }],
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (player.getHistory('damage').length) return [1, 2];
                }
            },
        },
    },
    //茉里Mari
    tingzhu: {
        trigger: { source: 'damageAfter' },
        priority: 199,
        filter(Evt, player) {
            return Evt.getParent().type == 'card' && game.hasPlayer(cur => !Evt.getParent().targets.includes(cur));
        },
        direct: true,
        content: [() => {
            let types = get.type3(_status.discarded, 'trick');
            let check = game.hasPlayer(cur => !trigger.getParent().targets.includes(cur) && get.damageEffect(cur, player, player) > 0);
            player.chooseToDiscard(get.$pro2('tingzhu'), 'he', card => {
                return !_status.event.types.includes(get.type(card));
            }).set('ai', card => {
                if (!_status.event.check) return -1;
                return 7 - get.value(card);
            }).set('types', types || []).set('check', check);
        }, () => {
            if (result.bool) {
                player.chooseTarget('『庭柱』：选择一名角色对其造成伤害', true, function (card, player, target) {
                    return !_status.event.targets.includes(target);
                }).set('targets', trigger.getParent().targets).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.damageEffect(target, player, player) > 0;
                });
            } else Evt.finish();
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('tingzhu', Evt.target);
                Evt.target.damage('nocard');
                game.delayx();
            }
        }],
    },
    xuemo: {
        trigger: { source: 'damageBegin1' },
        filter(Evt, player) {
            return Evt.player.hp > 0 && Evt.player.hp != player.hp;
        },
        check(Evt, player) {
            return (Math.min(Evt.player.hp, player.maxHp)) - player.hp > (get.$a(player, Evt.player) / 4);
        },
        content: [() => {
            Evt.num = trigger.player.hp - player.hp;
            player.changeHp(Evt.num);
        }, () => {
            trigger.num++;
        }],
        ai: {
            effect: {
                player(card, player, target, current) {
                    if (get.tag(card, 'damage') && target.hp > player.hp) return [1, 2];
                }
            },
        },
    },
    //露露娜Ruruna
    miluan: new toSkill('active', {
        usable: 1,
        filterTarget(card, player, target) {
            return player.canCompare(target);
        },
        selectTarget: [1, 2],
        content() {
            player.chooseToCompare(targets).callback = lib.skill.miluan.callback;
        },
        callback() {
            if (Evt.winner != player) {
                player.damage(target)
                player.draw(2)
            }
            if (Evt.winner != target) {
                target.damage(player)
                target.draw(2)
            }
        },
        ai: {
            order(item, player) {
                return 6
            },
            result: {
                player(player, target) {
                    if (player.hp === 1) return -2
                    return 1;
                },
                target(player, target) {
                    if (target.hp === 1 || target.countCards('h') === 1) return get.damageEffect(target, player, target)
                    return 2;
                }
            },
            threaten: 0.2
        },
    }, 'multitarget'),
    shenjiao: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.num > 0;
        },
        content: [() => {
            player.chooseTarget(get.$pro2('shenjiao')).set('ai', function (target) {
                let player = _status.event.player;
                return get.$a(player, target) / ((target.$.shenjiao_dam || 0) + 1);
            })
        }, () => {
            if (result.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('shenjiao', Evt.target)
                Evt.target.hasSkill('shenjiao_dam') ? Evt.target.$.shenjiao_dam++ : Evt.target.addTempSkill('shenjiao_dam')
            }
        }],
    }, 'direct').set('subSkill', {
        dam: new toSkill('mark', {
            filter(Evt, player) {
                return Evt.num > 0;
            },
            content() {
                trigger.num -= player.$.shenjiao_dam
            },
            ai: {
                effect: {
                    target(card, player, target, current) {
                        if (get.tag(card, 'damage') && target.$.shenjiao_dam) return [1, -target.$.shenjiao_dam];
                    }
                },
            },
            intro: {
                content: '受到的伤害-#'
            }
        }, 'forced', 'onremove', 'mark').setI(1).setT('damageBegin3')
    }).setT('damageAfter').setI(1),
    //茶冷
    huomo: new toSkill('trigger', {
        round: 1,
        filter(Evt, player) {
            return get.type(Evt.card) !== 'equip' && game.countPlayer(cur => get.$dis(cur, player) === 1) && player.countCards('he')
        },
        content: [() => {
            player.chooseToDiscard('he', get.$pro2('huomo')).set('ai', card => {
                let player = _status.event.player, source = _status.event.source, list = game.filterPlayer(cur => cur !== player && get.$dis(cur, player) <= 1);
                let eff = 0
                for (let v of list) {
                    get.effect(v, _status.event.card, source, player) * (_status.event.targets.includes(v) ? -1 : 1)
                }
                if (eff > 0) return get.unuseful2(card)
                if (eff = 0) return get.unuseful(card)
                return -1
            }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player)
        }, () => {
            if (result.bool) {
                if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
                Evt.targets = game.filterPlayer(cur => cur !== player && get.$dis(cur, player) <= 1);
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.targets) {
                if (!Evt.isOnline()) game.delay(2);
                player.logSkill('huomo', Evt.targets);
                if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                else trigger.targets.addArray(Evt.targets);
            }
        }],
        ai: {
            threaten: 0.9
        },
    }, 'direct').setT({ target: 'useCardToTarget' }),
    tuying: new toSkill('trigger', {
        filter(Evt, player) {
            return player.hasHistory('useCard', (evt) => evt.getParent('phaseUse') === Evt);
        },
        content: [() => {
            Evt.history = player.getHistory('useCard', (evt) => evt.getParent('phaseUse') === trigger)
        }, () => {
            Evt._result = {};
            if (Evt.history.length && player.countCards('hs')) {
                let first = Evt.history[0].targets, last = Evt.history.pop().card,
                    card = { name: last.name, nature: last.nature };
                if (lib.filter.cardEnabled(card)) {
                    if (player.hasUseTarget(card)) {
                        lib.skill.tuyingx.viewAs = card
                        lib.skill.tuyingx.first = first
                        let next = player.chooseToUse();
                        if (next.isOnline()) {
                            player.send(function (card) {
                                lib.skill.tuyingx.viewAs = card
                                lib.skill.tuyingx.first = first
                            }, card)
                        }
                        next.logSkill = 'tuying';
                        next.set('openskilldialog', `涂映：将一张手牌当${get.translation(card)}使用`);
                        next.set('norestore', true);
                        next.set('_backupevent', 'tuyingx');
                        next.set('custom', {
                            add: {},
                            replace: { window: function () { } }
                        });
                        next.backup('tuyingx');
                    }
                }
            }
        }],
    }, 'direct').setT('phaseUseAfter'),
    tuyingx: new toSkill('regard', {
        filterCard: function (card) {
            return get.itemtype(card) == 'card';
        },
        selectCard: 1,
        position: 'hs',
        popname: true,
        onuse(result, player) {
            let first = lib.skill.tuyingx.first
            if (first && first.length !== result.targets.length) {
                let next = game.createEvent('tuying_houxu')
                next.player = player;
                next._trigger = result;
                next.num = first.length - result.targets.length;
                next.setContent([() => {
                    let prompt2 = `为${get.$t(Evt.card)}${num > 0 ? `增加` : `减少`}${get.cnNumber(Math.abs(num))}个目标`;
                    player.chooseTarget(Math.abs(num), get.$pro2('tuying'), function (card, player, target) {
                        let source = _status.event.source;
                        if (_status.event.targets.includes(target))
                            return _status.event.num < 0;

                        else
                            return _status.event.num > 0 && lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
                    }).set('prompt2', prompt2).set('ai', target => {
                        let player = _status.event.player, source = _status.event.source;
                        return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
                    }).set('targets', trigger.targets).set('card', trigger.card).set('source', player).set('num', num)
                }, () => {
                    if (result.bool) {
                        if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
                        Evt.targets = result.targets;
                    }
                }, () => {
                    if (Evt.targets) {
                        player.logSkill('tuying', Evt.targets);
                        if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                        else trigger.targets.addArray(Evt.targets);
                    }
                }]);
            }
        }
    }),
    //小可
    mian: new toSkill('mark', {
        marktext: '面',
        intro: {
            mark(dialog, content, player) {
                let ms = player.getExpansions('mian_ms'),
                    ans = player.getExpansions('mian_ans')
                if (player.$.mian.length !== (ms.length + ans.length)) {
                    player.$.mian = [...ms, ...ans]
                }
                if (player.$.mian.length) {
                    if (ms.length) {
                        dialog.addText('明置面条');
                        dialog.addSmall(ms);
                    }
                    if (ans.length) {
                        if (player.isUnderControl(true)) {
                            dialog.addText('暗置面条');
                            dialog.addSmall(ans);
                        } else {
                            dialog.addText(`暗置面条（${get.cnNumber(player.getExpansions('juehuo_ans').length)}张）`);
                        }
                    }
                }
                else {
                    dialog.addText('没有面条');
                }
            },
        },
        onremove: function (player, skill) {
            let cards = [...player.getExpansions('juehuo_ans'), ...player.getExpansions('juehuo_ms')];
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked', 'cardAround').setI([]),
    dianying: {
        trigger: { player: 'damageBegin' },
        direct: true,
        filter(Evt, player) {
            if (!Evt.source || !Evt.source.isIn()) return false;
            return player.getExpansions('mian_ms').length >= 3;
        },
        content: [() => {
            let list2 = player.getExpansions('mian_ms').slice(0), list: Dialogword = ['『店营』：可以暗置3碗或以上的面条'];
            if (list2 && list2.length) {
                list.push('明置面条');
                list.push([list2, 'card']);
            }
            list.push('hidden');
            Evt.source = trigger.source;
            let check = trigger.num == 1 && Evt.source.isFriendsOf(player);
            let next = player.chooseButton(list)
                .set('selectButton', [3, Infinity])
                .set('source', Evt.source)
                .set('ai', function (button) {
                    if (!_status.event.check) return -1;
                    let player = _status.event.player, source = _status.event.source;
                    return get.value(button.link, source, 'raw');
                })
                .set('check', check)
        }, () => {
            if (result.bool && result.links) {
                player.logSkill('dianying', Evt.source);
                lib.skill.dianying.process(player, result.links);
                trigger.num--;
                trigger.dianyingCards = result.links;
                player.addTempSkill('dianying_ifDamageZero');
                game.delayx(0.5);
            }
        }],
        subSkill: {
            ifDamageZero: {
                trigger: { player: 'damageZero' },
                filter(Evt) {
                    return Evt.dianyingCards;
                },
                forced: true,
                content() {
                    Evt.target = trigger.source;
                    Evt.cards = trigger.dianyingCards;
                    player.$.mian.removeArray(Evt.cards);
                    Evt.target.gain(Evt.cards, player, 'giveAuto', 'log', 'fromStorage');
                    player.markSkill('mian')
                    game.delayx(0.5);
                }
            }
        },
        process(player, cards) {
            let storage = player.$.mian,
                toMs = [], toAns = [], toDraw = [];
            for (let i of storage) {
                if (!player.getExpansions('mian_ans').includes(i)
                    && !player.getExpansions('mian_ms').includes(i)) {
                    storage.remove(i)
                }
            }
            for (let card of cards) {
                if (storage.includes(card)) {
                    if (player.getExpansions('mian_ans').includes(card)) {
                        player.lose(card, ui.special)
                        toMs.push(card)
                    }
                    else if (player.getExpansions('mian_ms').includes(card)) {
                        player.lose(card, ui.special)
                        toAns.push(card)
                    }
                }
                else {
                    toDraw.push(card)
                    storage.push(card)
                }
            }
            if (toMs.length) {
                player.$give(toMs, player, false)
                player.addToExpansion(toMs, 'log').gaintag.add('mian_ms');
            }
            if (toAns.length) {
                player.$giveAuto(toAns, player, false)
                player.addToExpansion(toAns).gaintag.add('mian_ans');
            }
            if (toDraw.length) {
                player.addToExpansion('draw', toDraw).gaintag.add('mian_ans');
            }
            player.markSkill('mian')
        },
        ai: {
            threaten: 1.5
        },
        global: 'dianying2',
        group: 'mian',
    },
    dianying2: new toSkill('active', {
        filter(Evt, player) {
            return player.countCards('he') && game.hasPlayer(cur => cur.hasSkill('dianying') && cur != player);
        },
        filterCard: true,
        selectCard: [1, 3],
        filterTarget(card, player, target) {
            return target.hasSkill('dianying') && target != player;
        },
        discard: false,
        toStorage: true,
        position: 'he',
        usable: 1,
        prompt() {
            let list = game.filterPlayer(cur => cur.hasSkill('dianying'));
            let str = '将1至3张牌交给' + get.$t(list);
            if (list.length > 1) str += '中的一人';
            return str;
        },
        complexCard: true,
        check(card) {
            if (!ui.selected.cards.length && _status.event.player.needsToDiscard()) return 7 - get.value(card);
            return 4 - ui.selected.cards.length - get.value(card);
        },
        content: [() => {
            lib.skill.dianying.process(target, cards);
        }, () => {
            let list1 = target.getExpansions('mian_ans').slice(0);
            let list: Dialogword = ['『店营』：是否选择两碗面条明置'];
            if (list1.length) {
                list.push('暗置面条');
                if (target.isUnderControl(true)) list.push([list1, 'card']);
                else {
                    list1.randomSort();
                    list.push([list1, 'blank']);
                }
            }
            list.push('hidden');
            let next = player.chooseButton(list)
                .set('selectButton', 2)
                .set('target', target)
                .set('ai', function (button) {
                    let player = _status.event.player;
                    let target = _status.event.target;
                    return get.$a(player, target) <= 0 || get.recoverEffect(player, target, player) > 0;
                });
        }, () => {
            if (result.bool && result.links) {
                player.line(target);
                lib.skill.dianying.process(target, result.links);
            } else {
                Evt.finish();
            }
        }, () => {
            player.recover(target);
        }],
        ai: {
            order: 6,
            result: {
                player(player, target) {
                    let num = get.recoverEffect(player, target, player)
                    if (target.getExpansions('mian_ans').length <= 3) num += get.$a(player, target) / 2
                    if (!player.needsToDiscard()) num - 2
                    return num
                },
                target(player, target) {
                    if (target.getExpansions('mian_ans').length > 6) return 0
                    if (target.getExpansions('mian_ans').length > 3) return 0.5
                    return 2
                }
            }
        }
    }),
    ganfen: {
        audio: 2,
        trigger: { player: ['phaseJudgeBefore', 'phaseDrawBefore', 'phaseUseBefore', 'phaseDiscardBefore'] },
        clickChange: '停业',
        clickable(player) {
            if (player.$.ganfen_clickChange === undefined) player.$.ganfen_clickChange = false;
            else player.$.ganfen_clickChange = !player.$.ganfen_clickChange;
        },
        clickableFilter(player) {
            return player.$.ganfen_clickChange !== false;
        },
        filter(Evt, player) {
            if (player.$.ganfen_clickChange === false) return false;
            return player.hasSkill('mian');
        },
        prompt(Evt) {
            let str = get.$pro('ganfen');
            str += '跳过';
            str += get.$t(Evt.name);
            return str;
        },
        check(Evt, player) {
            if (['phaseDraw', 'phaseUse'].includes(Evt.name) || player.hp <= 1) return false;
            if (Evt.name == 'phaseJudge' && player.countCards('j') > 1) return true;
            return player.hp > 2 && player.countCards;
        },
        content: [() => {
            trigger.cancel();
        }, () => {
            player.damage();
        }, () => {
            Evt.cards = get.cards(3);
            lib.skill.dianying.process(player, Evt.cards);
        }],
        group: 'ganfen_fanmian',
        subSkill: {
            fanmian: {
                trigger: { player: ['useCardAfter', 'respondAfter'] },
                filter(Evt, player) {
                    if (player.$.ganfen_clickChange === false) return false;
                    if (player.getExpansions('mian_ans').length) {
                        return get.type(Evt.card) == 'basic';
                    }
                },
                direct: true,
                content: [() => {
                    Evt.card = trigger.card;
                    let list1 = player.getExpansions('mian_ans');
                    let list: Dialogword = ['『擀奋』：选择面条翻面'];
                    if (list1.length) {
                        list.push('暗置面条');
                        list.push([list1, 'card']);
                    }
                    list.push('hidden');
                    Evt.list1 = list1;
                    player.chooseButton(list);
                }, () => {
                    if (result.bool && result.links?.length) {
                        player.logSkill('ganfen');
                        lib.skill.dianying.process(player, result.links);
                        game.delay(0.5);
                    }
                }],
            }
        }
    },
    //启七海
    niyou: {
        trigger: { global: 'phaseEnd' },
        priority: 49,
        filter(Evt, player) {
            return player.getHistory('damage').length;
        },
        forced: true,
        content: [() => {
            game.delay(1);
            Evt.phaseUse = player.phaseUse();
        }, () => {
            if (!player.hasHistory('useCard', evt => {
                return evt.getParent('phaseUse') == Evt.phaseUse;
            })) {
                player.turnOver();
                player.draw(2);
            } else {
                player.markSkill('niyou');
                player.$.niyou = player.$.niyou ? (player.$.niyou + 1) : 1;
            }
        }],
        intro: {
            content: '心之壁厚度：#'
        },
        mod: {
            globalFrom(from, to, distance) {
                if (from.$.niyou) return distance + from.$.niyou;
            }
        }
    },
    shalu: {
        audio: 3,
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h') > 0;
        },
        filterTarget(card, player, target) {
            if (!player.inRange(target)) return true;
        },
        filterCard: true,
        selectCard: -1,
        content: [() => {
            target.damage('nocard');
        }, () => {
            if (target.hp > 0) player.draw(target.hp);
        }],
        ai: {
            order(item, player) {
                if (player.countCards('h', { suit: 'heart' })) return 4;
                else return 1;
            },
            result: {
                player(player, target) {
                    return target.hp - player.countCards('h');
                },
                target(player, target) {
                    if (target.hasSkill('shenyou')) return 0;
                    return get.damageEffect(target, player, target);
                }
            },
            expose: 0.2,
        },
    },
    //启阿梓
    puyu: {
        audio: true,
        trigger: { player: 'phaseUseBegin' },
        priority: 510,
        filter(Evt, player) {
            return game.hasPlayer(cur => cur.countCards('he'))
        },
        direct: true,
        content: [() => {
            player.chooseTarget(get.$pro2('puyu'), function (card, player, target) {
                return target.countCards('he');
            }).set('ai', function (target) {
                let player = _status.event.player;
                return get.effect(target, { name: 'guohe_copy2' }, player, player);
            })
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('puyu', Evt.target);
                Evt.target.chooseToDiscard('『璞玉』：请弃置一张牌', true, 'he').set('ai', card => {
                    let player = _status.event.player, source = _status.event.source, num = 2;
                    if (get.$a(player, source) > 0 && source.getUseValue(card)) {
                        if (source.countCards('h') > 3) {
                            num += 3 * get.value(card, source)
                        } else if (source.countCards('h') > 0) {
                            num += get.value(card, source)
                        }
                    }
                    num -= get.value(card, player)
                    return num;
                }).set('source', player);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards) {
                Evt.card = result.cards[0];
                player.$.puyu_phaseEndBy = Evt.card;
                player.$.puyu_phaseEndBy2 = [0, 0];
                player.addTempSkill('puyu_phaseEndBy', { player: 'phaseUseEnd' })
                game.delayx();
            }
        }],
        subSkill: {
            phaseEndBy: {
                mark: true,
                intro: {
                    mark(dialog, storage, player) {
                        if (storage) {
                            dialog.addSmall('所有手牌视为：');
                            dialog.addSmall([storage]);
                            dialog.addSmall(`本阶段已使用${player.$.puyu_phaseEndBy2[0]}张牌<br>所有角色已获得${player.$.puyu_phaseEndBy2[1]}张牌`);
                        }
                    },
                },
                mod: {
                    cardname(card, player, name) {
                        if (player.$.puyu_phaseEndBy && get.position(card) == 'h') return get.name(player.$.puyu_phaseEndBy);
                    },
                },
                onremove: ['puyu_phaseEndBy', 'puyu_phaseEndBy2'],
                trigger: { player: 'useCardAfter', global: 'gainAfter' },
                priority: 510,
                filter(Evt, player) {
                    return game.hasPlayer(cur => cur.countCards('he'))
                },
                direct: true,
                content() {
                    if (trigger.name == 'useCard') player.$.puyu_phaseEndBy2[0]++;
                    else player.$.puyu_phaseEndBy2[1] += trigger.cards.length;
                    if (player.$.puyu_phaseEndBy2[0] >= 5, player.$.puyu_phaseEndBy2[1] >= 10) {
                        let evt = _status.event.getParent('phaseUse');
                        if (evt?.name == 'phaseUse' && evt.player == player) {
                            evt.skipped = true;
                        }
                    } else player.markSkill('puyu_phaseEndBy')
                }
            }
        }
    },
    appojian: {
        audio: 3,
        trigger: { source: 'damageAfter' },
        priority: 199,
        filter(Evt, player) {
            return Evt.getParent().type == 'card' && game.hasPlayer(cur => !Evt.getParent().targets.includes(cur));
        },
        forced: true,
        content: [() => {
            player.chooseTarget('『破茧』：令体力最多的一名角色失去体力', true, function (card, player, target) {
                return target.isMaxHp();
            }).set('ai', function (target) {
                return 1 - get.$a2(target);
            });
        }, () => {
            if (result.bool) {
                result.targets[0].loseHp();
            } else Evt.finish();
        }, () => {
            player.chooseTarget('『破茧』：令体力最少的一名角色回复体力', true, function (card, player, target) {
                return target.isMinHp();
            }).set('ai', function (target) {
                let player = _status.event.player
                return get.recoverEffect(target, player, player);
            });
        }, () => {
            if (result.bool) {
                result.targets[0].recover();
            }
        }, () => {
            if (player.isMaxHp() || player.isMinHp()) {
                let evt = _status.event.getParent('phaseUse');
                if (evt?.name == 'phaseUse') {
                    evt.skipped = true;
                }
                let phase = _status.event.getParent('phase');
                if (phase?.name == 'phase') {
                    phase.finish();
                }
            }
        }],
        ai: {
            effect: {
                player(card, player, target, current) {
                    if (get.tag(card, 'damage')) return [1, 2];
                }
            },
        },
    },


    //园长
    dieyuan: {
        trigger: { global: 'recoverAfter' },
        filter(Evt, player) {
            return Evt.player != player && Evt.player.isIn();
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            Evt.gainnum = Math.abs(Evt.target.hp - player.hp) || 1;
            Evt.target.draw(Evt.gainnum);
        }, () => {
            if (Evt.target.isIn()) {
                Evt.gainnum = Math.abs(Evt.target.hp - player.hp) || 1;
                Evt.target.chooseCard(Evt.gainnum, 'he', `将${get.cnNumber(Evt.gainnum)}张牌交给${get.$t(player)}`).set('ai', card => {
                    if (_status.event.goon > 0) return 0;
                    if (_status.event.goon < 0) return 1 - get.value(card);
                    return 5 - get.value(card);
                }).set('goon', function () {
                    if (get.recoverEffect(player, Evt.target, Evt.target) > 0) return 1;
                    if (player.isHealthy() || get.$a(player, Evt.target) <= 0) return -1;
                    return 0;
                }());
            } else Evt.finish();
        }, () => {
            if (!result.bool || !result.cards) {
                player.recover(Evt.target);
            } else {
                Evt.target.give(result.cards, player, true);
            }
        }],
        ai: {
            expose: 0.1
        }
    },
    shengyang: {
        enable: 'phaseUse',
        usable: 1,
        filterCard: true,
        position: 'he',
        filterTarget(card, player, target) {
            return target != player;
        },
        check(card) {
            let num = get.value(card);
            if (get.color(card) == 'black') {
                if (num >= 6) return 0;
                return 20 - num;
            } else {
                if (_status.event.player.needsToDiscard()) {
                    return 7 - num;
                }
            }
            return 0;
        },
        discard: false,
        lose: false,
        delay: false,
        content: [() => {
            target.gain(cards, player, 'giveAuto');
        }, () => {
            Evt.gainnum = (Math.abs(target.hp - player.hp) || 1) * 2;
            player.judge(card => {
                let evt = _status.event.getParent('shengyang')
                if (evt?.gainnum >= get.number(card)) return 3
                if (evt?.target?.isDamaged()) return 1;
                return -1;
            }).set('callback', function () {
                let evt = _status.event.getParent('shengyang')
                if (!evt || evt.name != 'shengyang') return;
                if (Evt.judgeResult.number <= evt.gainnum) player.gainPlayerCard([1, evt.gainnum], evt.target, true);
                else evt.target.recover();
            });
        }],
        ai: {
            order: 8,
            expose: 0.2,
            result: {
                target(player, target) {
                    return get.recoverEffect(target, player, target);
                }
            }
        }
    },
    //道姑
    daoyi: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        map: ['color', 'number', 'suit', 'name'],
        trigger: { global: 'judge' },
        filter: () => true,
        direct: true,
        content: [() => {
            Evt.target = trigger.player;
            let list = [];
            if (lib.skill.daoyi.map[player.$.daoyi] == 'name') {
                for (let i = 0; i < lib.inpile.length; i++) {
                    let name = lib.inpile[i];
                    list.push([get.type2(name), '', name]);
                }
            } else {
                for (let i = 0; i < lib[lib.skill.daoyi.map[player.$.daoyi]].length; i++) {
                    let name = lib[lib.skill.daoyi.map[player.$.daoyi]][i];
                    list.push([lib.skill.daoyi.map[player.$.daoyi], '', name]);
                }
            }
            let str = `${get.$t(Evt.target)}的${trigger.judgestr || ''}判定为${get.$t(Evt.target.judging[0])}，是否发动『道易』，修改判定结果？`;
            player.chooseButton([str, [list, 'vcard'], 'hidden']).set('ai', function (button) {
                let judging = _status.event.judging, player = _status.event.player, change = _status.event.change;
                let trigger = _status.event.getTrigger(), res1 = trigger.judge(judging);
                let card = {
                    name: get.name(judging),
                    nature: get.nature(judging),
                    suit: get.suit(judging),
                    color: get.color(judging),
                    number: get.number(judging),
                }, att = get.$a(player, trigger.player);
                if (att == 0) return 0;
                card[change] = button.link[2];
                let now = trigger.judge(card);
                let effect = (now - res1) * att;
                if (player.$.daoyi == 3 && _status.currentPhase && _status.currentPhase.isIn()) effect += (get.damageEffect(_status.currentPhase, player, player)) * 1.5;
                return effect;
            }).set('change', lib.skill.daoyi.map[player.$.daoyi]).set('judging', Evt.target.judging[0]);
        }, () => {
            if (result.bool == true) {
                let link = result.links[0][2];
                player.addExpose(0.25);
                player.logSkill('daoyi', Evt.target);
                player.popup(link);
                game.log(player, '将判定结果改为了', '#y' + get.$t(link));
                if (!trigger.fixedResult) trigger.fixedResult = {};
                if (lib.skill.daoyi.map[player.$.daoyi] == 'number') trigger.fixedResult[lib.skill.daoyi.map[player.$.daoyi]] = lib.number.indexOf(link) + 1;
                else trigger.fixedResult[lib.skill.daoyi.map[player.$.daoyi]] = link;
                game.delayx()
            } else Evt.finish();
        }, () => {
            if (player.$.daoyi < 3) player.$.daoyi++;
            else {
                player.$.daoyi = 0;
                if (_status.currentPhase && _status.currentPhase.isIn()) {
                    player.line(_status.currentPhase);
                    _status.currentPhase.damage(1, 'thunder', 'nocard');
                }
            }
            player.updateMarks('daoyi')
        }],
    },
    shengyin: {
        enable: 'phaseUse',
        usable: 1,
        filterTarget(card, player, target) {
            return target != player && target.countCards('h');
        },
        content: [() => {
            target.chooseCard('h', '『盛阴』：请展示一张牌', true);
        }, () => {
            if (result.cards) {
                let card = result.cards[0];
                target.showCards(card, '『盛阴』展示手牌');
                Evt.card = card;
                Evt.color = get.color(card);
                Evt.type2 = get.type2(card);
            } else Evt.finish();
        }, () => {
            target.judge(card => {
                let evt = _status.event
                if (get.color(card) === evt.precolor) return 2;
                if (get.type2(card) === evt.pretype) return -1;
                return 0;
            })
                .set('callback', function () {
                    let evt = _status.event.getParent()
                    let card0 = evt.precard, source = evt.getParent().player;
                    if (get.type2(Evt.judgeResult.name) == evt.pretype) source.gain(card0, player, 'give');
                    if (Evt.judgeResult.color == evt.precolor) game.asyncDraw([player, source]);
                })
                .set('precard', Evt.card)
                .set('pretype', get.type2(Evt.card))
                .set('precolor', get.color(Evt.card))
        }],
        ai: {
            order: 8,
            expose: 0.2,
            result: {
                target(player, target) {
                    return 2;
                }
            }
        }
    },
    //魂喵喵
    hun: new toSkill('mark', {
        intro: {
            name: '『修又』：魂',
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked'),
    xiuyou: new toSkill('trigger', {
        filter(Evt, player) {
            return player.getStorage('hun').length >= 3 && _status.currentPhase && _status.currentPhase.isIn();
        },
        logTarget(Evt, player) {
            return _status.currentPhase;
        },
        content: [() => {
            Evt.target = _status.currentPhase;
        }, () => {
            let str = `选项A：将全部手牌与${get.$t(player)}的「魂」交换<br>
            选项B：令一名角色摸「魂」数量张牌<br>
            选项C：令${get.$t(player)}回复一点体力`;
            let list = [[['A', '', '选项A']], [['B', '', '选项B']], [['C', '', '选项C']]];
            Evt.videoId = lib.status.videoId++;
            game.broadcastAll(function (id, choicelist, str, num) {
                let dialog = ui.create.dialog(`『修又』：请选择${get.cnNumber(num)}项`);
                dialog.addSmall(str)
                choicelist.forEach(element => {
                    dialog.add([element, 'vcard']);
                })
                dialog.videoId = id;
            }, Evt.videoId, list, str, 1);
        }, () => {
            Evt.curTar = Evt.target
            Evt.curTar.chooseButton(true)
                .set('dialog', Evt.videoId)
        }, () => {
            if (result.bool) {
                result.links.forEach(element => {
                    Evt.preButton = element[0]
                    switch (Evt.preButton) {
                        case 'A':
                            let cards = Evt.curTar.getCards('h');
                            let huns = player.getExpansions('hun')
                            player.addToExpansion(cards, 'giveAuto', Evt.curTar).gaintag.add('hun');
                            Evt.curTar.gain(huns, player, 'give', 'log', 'fromStorage');
                            Evt.goto(Evt.step + 2)
                            break;
                        case 'B':
                            player.chooseTarget(true,
                                `『修又』：令一名角色摸` + get.cnNumber(player.getStorage('hun').length))
                                .set('ai', tar => {
                                    get.$a2(tar)
                                })
                            break;
                        case 'C':
                            player.recover(Evt.curTar);
                            Evt.goto(Evt.step + 2)
                            break;
                    }
                });
            }
            else Evt.finish()
        }, () => {
            if (result.targets) {
                result.targets[0].draw(player.getStorage('hun').length);
            }
        }, () => {
            Evt.curTar = player
            Evt.curTar.chooseButton(true)
                .set('dialog', Evt.videoId)
                .set('filterButton', function (button) {
                    return button.link[0] !== _status.event.preButton
                })
                .set('preButton', Evt.preButton);
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                result.links.forEach(element => {
                    switch (element[0]) {
                        case 'A':
                            let cards = Evt.curTar.getCards('h');
                            let huns = player.getExpansions('hun')
                            player.addToExpansion(cards, 'giveAuto', Evt.curTar).gaintag.add('hun');
                            Evt.curTar.gain(huns, player, 'give', 'log', 'fromStorage');
                            Evt.finish()
                            break;
                        case 'B':
                            player.chooseTarget(true,
                                `『修又』：令一名角色摸` + get.cnNumber(player.getStorage('hun').length))
                                .set('ai', tar => {
                                    get.$a2(tar)
                                })
                            break;
                        case 'C':
                            player.recover(Evt.curTar);
                            Evt.finish()
                            break;
                    }
                });
            }
            else Evt.finish()
        }, () => {
            if (result.targets) {
                result.targets[0].draw(player.getStorage('hun').length);
            }
        }],
        group: ['hun', 'xiuyou_gainMark'],
        subSkill: {
            gainMark: new toSkill('trigger', {
                trigger: { player: ['judgeEnd', 'damageEnd'] },
                forced: true,
                filter(Evt, player) {
                    if (Evt.name == 'judge') return get.itemtype(Evt.result.card) === 'card' && get.position(Evt.result.card, true) === 'o';
                    return true;
                },
                content() {
                    Evt.cards = trigger.name == 'judge' ? [trigger.result.card] : get.cards();
                    player.addToExpansion(Evt.cards, 'draw').gaintag.add('hun');
                    game.delayx(0.5)
                }
            }
            )
        }
    }, 'forced').setT('dying'),
    jiyuan: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.player.isIn();
        },
        check(Evt, player) {
            return player == Evt.player;
        },
        round: 1,
        content() {
            Evt.target = trigger.player;
            let next = Evt.target.judge(card => {
                if (get.color(card) == 'red') return 2;
                if (get.color(card) == 'black') return -2;
                return 0;
            }).set('callback', function () {
                if (Evt.judgeResult.color == 'red') player.draw(2);
                if (Evt.judgeResult.color == 'black') player.damage('nosource', 'nocard');
            });
        },
    }, 'logTarget:player').setT({ global: 'phaseZhunbeiBegin' }),
    //菜菜姐
    tibing: {
        trigger: { player: ['phaseZhunbeiBegin', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseDiscardBefore', 'phaseJieshuBegin'] },
        forced: true,
        direct: true,
        filter: () => true,
        content() {
            trigger.cancel();
        },
        group: ['tibing_drawBy', 'tibing_discardBy'],
        subSkill: {
            drawBy: {
                trigger: { player: ['phaseUseBegin'] },
                forced: true,
                filter: () => true,
                content: [() => {
                    player.draw(2);
                }, () => {
                    player.gain(player.getCards('ej'), player, 'giveAuto', 'log');
                }],
            },
            discardBy: {
                trigger: { player: ['phaseUseEnd'] },
                forced: true,
                filter: () => true,
                content: [() => {
                    player.showHandcards();
                }, () => {
                    player.discard(player.getCards('h', { type: ['equip', 'trick', 'delay'] }));
                }],
            }
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.type(card) == 'delay') return [0.1, 1];
                }
            }
        }
    },
    guangtui: {
        trigger: { global: 'phaseDiscardBegin' },
        filter(Evt, player) {
            return Evt.player != player && player.isDamaged();
        },
        check(Evt, player) {
            return player.hp <= 2 || get.$a(player, Evt.player);
        },
        content: [() => {
            player.loseMaxHp(true);
        }, () => {
            trigger.cancel(true);
            game.delayx();
        }, () => {
            player.phaseUse();
        }],
        ai: {
            threaten(player, target) {
                if (!target.isDamaged()) return 0.6;
            }
        }
    },
    //蓝蓝
    zhepie: {
        trigger: { player: ['phaseZhunbeiBegin'] },
        filter(Evt, player) {
            return true;
        },
        usable: 1,
        content: [() => {
            Evt.card = get.cards()[0];
            player.showCards(Evt.card);
            game.delayx();
        }, () => {
            player.chooseTarget(true).set('ai', function (target) {
                let type2 = get.type2(_status.event.card);
                let att = get.$a2(target);
                if (target.countCards('h', { type2: type2 }) <= 1 || type2 == 'equip') {
                    if (target == player) return 1 + att;
                    return att
                }
                if (type2 == 'basic' && target.countCards('h', { type2: type2 }) >= 1 && att < 0) {
                    return -att;
                }
                return get.value(card) * att / 4;
            }).set('card', Evt.card).set('createDialog',
                ['『折撇』：令一名角色获得此牌',
                    [[Evt.card], 'card']]);
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.line(Evt.target, 'ocean');
                Evt.target.gain(Evt.card, 'gain2', 'log');
                if (!Evt.target.$.zhepie_cardDisable) Evt.target.$.zhepie_cardDisable = [];
                Evt.target.$.zhepie_cardDisable.add(Evt.card);
                Evt.target.addTempSkill('zhepie_cardDisable', { player: 'phaseAfter' });
                game.delayx();
            }
        }],
        subSkill: {
            cardDisable: {
                mark: true,
                intro: {
                    name: '折撇',
                    content: 'cards',
                },
                onremove: true,
                mod: {
                    cardEnabled(card, player) {
                        if (player.getStorage('zhepie_cardDisable').filter(zhepie => get.type2(zhepie) == get.type2(card)).length) return false;
                    },
                    cardSavable(card, player) {
                        if (player.getStorage('zhepie_cardDisable').filter(zhepie => get.type2(zhepie) == get.type2(card)).length) return false;
                    },
                },
            }
        },
        ai: {
            threaten: 1.2,
        }
    },
    chumo: {
        trigger: {
            player: 'loseAfter',
            global: 'cardsDiscardAfter',
        },
        filter(Evt, player) {
            if (Evt.name == 'lose') {
                if (Evt.position != ui.discardPile) return false;
            } else {
                let evt = Evt.getParent();
                if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player != player || !['useCard', 'respond'].includes(evt.relatedEvent.name)) return false;
            }
            return (Evt.cards2 || Evt.cards).filterInD('d').length > 0;
        },
        round: 1,
        direct: true,
        content: [() => {
            let cards = (trigger.cards2 || trigger.cards).filterInD('d');
            Evt.cards = cards;
            player.chooseTarget().set('ai', function (target) {
                let att = get.$a2(target);
                let num = 0;
                for (let i of _status.event.cards) {
                    if (get.value(i) < 0 && att < 0 && !num) num += 1;
                    if (get.value(i) > 0 && att > 0 && !num) num += att;
                    if (!target.hasUseTarget(i)) num += 2;
                }
                return num;
            }).set('cards', cards).set('createDialog',
                [get.$pro2('chumo'),
                [cards, 'card']]);
        }, () => {
            if (result.bool) {
                Evt.target = result.targets[0];
                player.logSkill('chumo', Evt.target);

                let evt = trigger.getParent().relatedEvent;
                if ((trigger.name == 'discard' && !trigger.delay) || evt?.name == 'respond') game.delayx();
                if (Evt.cards.length == 1) {
                    Evt._result = { links: [Evt.cards[0]] };
                    Evt.goto(3);
                }
            } else Evt.finish();
        }, () => {
            player.chooseCardButton(Evt.cards, true, `选择令${get.$t(Evt.target)}获得的牌`, function (button) {
                let evt = _status.event.getParent();
                let att = get.$a(evt.player, evt.target), i = button.link, value = get.value(i, target, 'raw');
                if (!evt.target.hasUseTarget(i)) return att * value + 4;
                return att * value;
            });
        }, () => {
            if (result.links?.length) {
                Evt.card = result.links[0];
                Evt.target.gain(Evt.card, 'gain2', 'log');
                if (!Evt.target.hasUseTarget(Evt.card)) {
                    player.draw(2);
                };
            }
        }],
        ai: {
            threaten(player, target) {
                if (target.isDamaged()) return 1.2;
            }
        }
    },

    //亚哈
    ahbingyi: {
        trigger: { global: 'drawBegin' },
        filter(Evt, player) {
            return Evt.num && Evt.player != player && Evt.player.isMaxHandcard();
        },
        check(Evt, player) {
            if (Evt.num < 2) return false;
            return get.$a(player, Evt.player) < -1 && player.hp >= 3;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            player.loseHp();
        }, () => {
            trigger.cancel();
            game.delayx();
        }, () => {
            if (Evt.target.countDiscardableCards(player, 'he')) {
                player.discardPlayerCard(Evt.target, 'he', true);
            }
            else Evt.finish()
        }, () => {
            if (result.bool && result.cards?.length) {
                let cards = result.cards.filter(card => get.name(card) === 'jiu' || get.type2(card) === 'trick')
                if (cards.length) {
                    player.recover()
                }
            }
        }],
        ai: {
            threaten: 1.1,
        }
    },
    sujian: {
        trigger: { player: 'damageEnd' },
        filter(Evt, player) {
            return get.itemtype(Evt.cards) == 'cards' && get.position(Evt.cards[0], true) == 'o';
        },
        content() {
            player.addToExpansion(trigger.cards, 'gain2').gaintag.add('sujian_su');
        },
        group: ['sujian_su', 'sujian_chooseBy', 'sujian_changeBy'],
        subSkill: {
            su: new toSkill('mark', {
                marktext: '🚨',
                intro: {
                    content: 'expansion',
                    markcount: 'expansion',
                },
                onremove: function (player, skill) {
                    let cards = player.getExpansions(skill);
                    if (cards.length) player.loseToDiscardpile(cards);
                },
            }, 'locked'),
            chooseBy: {
                trigger: { player: 'ahbingyiAfter' },
                filter(Evt, player) {
                    return player.countCards('h');
                },
                direct: true,
                content: [() => {
                    player.chooseCard('h', '发动『秉义』时，可以将一张手牌置于武将牌上').set('ai', card => {
                        return 7 - get.value(card, player);
                    }).set('logSkill', 'sujian');
                }, () => {
                    if (result.bool && result.cards) {
                        player.addToExpansion(result.cards, 'give', player).gaintag.add('sujian_su');
                    }
                }],
            },
            changeBy: {
                trigger: { global: 'useCard' },
                filter(Evt, player) {
                    if (!Evt.targets.length) return false;
                    return player.getExpansions('sujian_su').filter(card => {
                        return get.name(Evt.card) == get.name(card) || get.suit(Evt.card) == get.suit(card);
                    }).length;
                },
                direct: true,
                content: [() => {
                    Evt.sujian = player.getExpansions('sujian_su');
                    Evt.card = trigger.card;
                    Evt.target = trigger.player;
                    let check = 0;
                    for (let i of trigger.targets) {
                        if (get.effect(i, Evt.card, Evt.target, player) < 0) check++;
                    }
                    if (check < Evt.sujian.length) check = 0;
                    player.chooseCardButton(Evt.sujian, `###${get.$pro('sujian')}###将一张对应${get.$t(Evt.card)}的「肃」置于牌堆顶`).set('filterButton', function (button) {
                        let card = button.link;
                        return get.name(_status.event.card0) == get.name(card) || get.suit(_status.event.card0) == get.suit(card);
                    }).set('ai', function (button) {
                        if (!_status.event.check) return -1;
                        return 1;
                    }).set('check', check).set('card0', Evt.card);
                }, () => {
                    if (result.bool && result.links) {
                        Evt.theSu = result.links[0];
                        player.logSkill('sujian', Evt.target);
                        player.lose(Evt.theSu, ui.special);
                        player.$throw(Evt.theSu, 1000);
                    } else Evt.finish();
                }, () => {
                    ui.cardPile.insertBefore(Evt.theSu, ui.cardPile.firstChild);
                    game.log(player, `将${get.$t(Evt.theSu)}置于牌堆顶`);
                    game.updateRoundNumber()
                }, () => {
                    let prompt2 = `为${get.$t(Evt.card)}减少任意个目标`
                    player.chooseTarget('『肃监』：选择目标角色', [1, Infinity], function (card, player, target) {
                        if (_status.event.targets.includes(target)) return true;
                    }).set('prompt2', prompt2).set('ai', function (target) {
                        let card = _status.event.card, player = _status.event.player, source = _status.event.source;
                        return get.effect(target, card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
                    }).set('targets', trigger.targets).set('card', Evt.card).set('source', Evt.target);
                }, () => {
                    if (!Evt.isMine()) game.delayx();
                    Evt.targets = result.targets;
                }, () => {
                    if (Evt.targets) {
                        player.logSkill('sujian', Evt.targets);
                        trigger.excluded.addArray(Evt.targets);
                    }
                }]
            }
        },
        ai: {
            combo: 'ahbingyi',
            maixie: true,
            maixie_hp: true,
            effect: {
                target(card, player, target) {
                    if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
                    if (get.tag(card, 'damage')) return [1, 0.55];
                }
            }
        }
    },
    //雨街F
    ciling: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer(cur => cur !== player && !cur.hasSkill('ciling2'))
        },
        content: [() => {
            player.chooseTarget(get.$pro2('ciling'), function (card, player, target) {
                return target !== player && !target.hasSkill('ciling2')
            }).set('ai', tar => get.$a2(tar) < 0)
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('ciling', Evt.target);
                Evt.target.addSkill('ciling2')
                trigger.cancel();
                game.delayx();
            }
        }],
        ai: {
            threaten: 1.1,
        },
        involve: 'ciling',
        subSkill: {
            dis: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.player.isIn() && Evt.player !== player && Evt.player.hasSkill('ciling2')
                },
                content: [() => {
                    Evt.cards = trigger.cards
                    Evt.target = trigger.player
                    player.chooseControl('dialogcontrol', ['1.获得其弃牌', '2.视为对其使用一张【杀】', '取消'])
                        .set('ai', function () {
                            let { player, target, cards } = _status.event.getParent();
                            // let values = cards?0:get.value(cards,'raw',player)
                            let values = get.value(cards || [], 'raw', player)
                            if (get.effect(target, { name: 'sha' }, player, player) > values / 3) return 0
                            if (values > 0) return 1
                            return 2
                        })
                        .set('prompt', get.$pro2('ciling', Evt.target))
                        .set('addDialog', Evt.cards ? [Evt.cards] : []);
                }, () => {
                    if (result.control.indexOf('1.') === 0 && Evt.cards.length) {
                        player.gain(Evt.cards, 'log', 'gain2')
                    }
                    else if (result.control.indexOf('2.') === 0) {
                        player.useCard({ name: 'sha' }, Evt.target, false)
                    }
                }]
            }, 'direct').setT({ global: 'phaseDiscardEnd' })
        },
        group: 'ciling_dis'
    }, 'direct').setT('phaseUseBefore'),
    ciling2: new toSkill('mark', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        filter(Evt, player) {
            return Evt.name === 'dying' || Evt.target.hasSkill('ciling')
        },
        intro: {
            content: '被追杀中，已累计对杀手使用#张【杀】'
        },
        content() {
            if (trigger.name === 'dying') {
                delete player.$.ciling2
                player.removeSkill('ciling2')
            }
            else {
                if (++player.$.ciling2 >= 3) {
                    delete player.$.ciling2
                    player.removeSkill('ciling2')
                }
            }
        }
    }, 'locked', 'direct', 'mark').setT(['sha', 'dying'], 'Begin'),
    xiyu: new toSkill('trigger', {
        filter(Evt, player) {
            return _status.currentPhase && player !== _status.currentPhase
        },
        content() {
            if (!player.$.xiyu_mark) {
                player.addTempSkill('xiyu_mark')
            }
            else {
                player.$.xiyu_mark++
                player.markSkill('xiyu_mark')
            }
            player.draw(Math.min(player.$.xiyu_mark, 3))
        },
        subSkill: {
            mark: new toSkill('mark', {
                intro: {
                    content: '本回合已发动#次『细雨』'
                },
            }, 'mark', 'onremove').setI(1)
        }
    }, 'forced').setT('useCard2'),
    //艾尔莎
    mengxue: new toSkill('active', {
        usable: 1,
        filterTarget(card, player, target) {
            return true;
        },
        content: [() => {
            let list = [`1.摸2张牌，手牌上限-2`, `2.弃1张牌，手牌上限+2`]
            target.classList.add('glow');
            if (!target.countCards()) {
                Evt._result = { control: list[0] };
            }
            else {
                player.chooseControl('dialogcontrol', list)
                    .set('ai', function () {
                        return _status.event.check
                    })
                    .set('check', (get.$a(player, target) > 0 && target.countCards() <= 3 && !target.needsToDiscard()) ? 0 : 1)
                    .set('prompt', '令目标执行一项：')
            }
        }, () => {
            target.classList.remove('glow');
            if (result.control.indexOf('1.') === 0) {
                target.draw(2)
                target.$.mengxue1_source = player
                target.addTempSkill('mengxue1', 'none')
            }
            else if (result.control.indexOf('2.') === 0) {
                target.chooseToDiscard(true, 'he')
            }
            else Evt.finish()
        }, () => {
            if (result.bool && result.cards?.length) {
                target.$.mengxue2_source = player
                target.addTempSkill('mengxue2', 'none')
            }
        }],
        ai: {
            order: 1,
            threaten: 1.1,
            result: {
                target: 1,
            }
        },
    }),
    mengxue1: new toSkill('mark', {
        marktext: '萌',
        intro: {
            name: '萌学down',
            content: '手牌上限-#'
        },
        mod: {
            maxHandcard(player, num) {
                return num - player.$.mengxue1;
            },
        },
        onremove: ['mengxue1', 'mengxue1_source'],
        filter(Evt, player) {
            return Evt.player === player.$.mengxue1_source
        },
        content() {
            player.removeSkill('mengxue1')
        }
    }, 'locked', 'direct', 'mark').setT({ global: 'mengxue' }, 'Begin').setI(2),
    mengxue2: new toSkill('mark', {
        marktext: '萌',
        intro: {
            name: '萌学up',
            content: '手牌上限+#'
        },
        mod: {
            maxHandcard(player, num) {
                return num + player.$.mengxue2;
            },
        },
        onremove: ['mengxue2', 'mengxue2_source'],
        filter(Evt, player) {
            return Evt.player === player.$.mengxue2_source
        },
        content() {
            player.removeSkill('mengxue2')
        }
    }, 'locked', 'direct', 'mark').setT({ global: 'mengxue' }, 'Begin').setI(2),
    nier: new toSkill('trigger', {
        usable: 1,
        filter(Evt, player) {
            return player.hasHistory('lose', evt => evt.getParent() === Evt && evt.hs?.length)
        },
        check(Evt, player) {
            return player.isTurnedOver() && game.countPlayer(cur => cur.countCards('ej'))
        },
        content: [() => {
            player.turnOver()
        }, () => {
            player.moveCard('『逆二』：移动场上的一张牌')
        }],
        ai: {
            maixie: true
        }
    }).setT('discardEnd'),
    //冥冥meichan
    zhichan: new toSkill('trigger', {
        round: 1,
        filter(Evt, player) {
            return Evt.player != player && Evt.card.name === 'sha'
                && !Evt.targets.includes(player) && player.countCards('he')
                && Evt.getParent().triggeredTargets3.length == 1
        },
        content: [() => {
            player.chooseToDiscard('he', get.$pro2('zhichan')).set('logSkill', 'zhichan')
        }, () => {
            if (result.bool && result.cards) {
                player.$.zhichan_gainBy = _status.discarded.slice()
                player.addTempSkill('zhichan_gainBy')
                game.delayx(2)
            }
        }],
        subSkill: {
            gainBy: new toSkill('mark', {
                intro: {
                    content: '获得在此期间进入弃牌堆的基本牌',
                    mark(dialog, storage, player) {
                        let cards = _status.discarded.filter(card => get.type(card) === 'basic')
                        cards.removeArray(player.$.zhichan_gainBy)
                        if (cards.length) {
                            dialog.addAuto(cards);
                        }
                        else {
                            dialog.addText('还没有牌进入弃牌堆')
                        }
                    },
                },
                content: [() => {
                    Evt.cards = _status.discarded.filter(card => get.type(card) === 'basic')
                    Evt.cards.removeArray(player.$.zhichan_gainBy)
                    if (Evt.cards.length > 0) {
                        player.gain(Evt.cards, 'draw', 'log')
                    }
                    player.removeSkill('zhichan_gainBy')
                }],
            }, 'forced', 'mark', 'onremove').setT({ global: 'phaseNext' })
        },
    }, 'direct').setT({ global: 'useCardToPlayered' }),
    mmjieyuan: new toSkill('regard', {
        hiddenCard(player, name) {
            if (!player.countCards('hs')) return false;
            let list = get.inpile('trick', card => !player.$.mmjieyuan.includes(card));
            return list.some(i => i === name);
        },
        enable: 'chooseToUse',
        filter(Evt, player) {
            return player.countCards('he') >= 2 && player.countCards('s', card => card.hasGaintag('maoge')) <= player.countCards('h');
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = get.inpile('trick', card => !player.$.mmjieyuan.includes(card)).map(i => ['锦囊', '', i]);
                if (list.length === 0) {
                    return ui.create.dialog('『结渊』已无可用牌');
                }
                return ui.create.dialog('『结渊』', [list, 'vcard']);
            },
            filter(button, player) {
                return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
            },
            check(button) {
                let player = _status.event.player;
                if (player.countCards('h', button.link[2]) > 0) return 0;
                if (button.link[2] == 'wugu') return 0;
                let effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup(links, player) {
                return {
                    filterCard: { type: 'basic' },
                    selectCard() {
                        let player = _status.event.player;
                        return (player.$.mmjieyuan_change != (_status.currentPhase === player)) ? 2 : 1;
                    },
                    popname: true,
                    check(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hs',
                    viewAs: { name: links[0][2] },
                    onuse(result, player) {
                        player.$.mmjieyuan.push(result.card.name);
                    },
                }
            },
            prompt(links, player) {
                return `###『结渊』###将${get.cnNumber((player.$.mmjieyuan_change != (_status.currentPhase === player)) ? 2 : 1)}张牌当做【${get.translation(links[0][3]) || ''}${get.translation(links[0][2])}】使用`;
            }
        },
        group: ['mmjieyuan_change', 'mmjieyuan_clear'],
        subSkill: {
            clear: new toSkill('rule', {
                content() {
                    player.$.mmjieyuan = []
                }
            }, 'direct', 'silent').setT({ global: 'phaseAfter' }),
            change: new toSkill('trigger', {
                prompt2: '当你发动『旨阐』后，你可以交换此技能回合内和回合外的技能效果。',
                content: [() => {
                    player.$.mmjieyuan_change = !player.$.mmjieyuan_change
                    player.syncStorage('mmjieyuan_change')
                }],
            }, 'onremove').setT('zhichanAfter').setI(false)
        },
        ai: {
            combo: 'zhichan'
        }
    }, 'enable:chooseToUse').setI([]),
    //Gaku
    exi: {
        enable: 'phaseUse',
        usable: 1,
        filterTarget(card, player, target) {
            return target.countCards('h') && target != player;
        },
        filter(Evt, player) {
            return true;
        },
        content: [() => {
            player.chooseToPSS(target);
        }, () => {
            if (!result.tie) {
                let card = { name: 'sha' };
                if (result.winner == 'stone') card.name = 'juedou';
                if (result.bool) {
                    player.draw(2);
                    target.useCard(card, player, false, 'noai');
                } else {
                    target.draw(2);
                    player.useCard(card, target, false, 'noai');
                }
            }
        }],
        ai: {
            order: 10,
            result: {
                player: 1,
                target: -0.1,
            }
        }
    },
    suisui: {
        trigger: { player: 'damageBegin3' },
        forced: true,
        usable: 1,
        filter(Evt, player) {
            return !Evt.source && player.hp != 1 || Evt.source && player.hp == 1;
        },
        content() {
            trigger.cancel();
        },
        ai: {
            threaten(player, target) {
                if (target.hp == 1) return 0.5;
                return 1;
            },
        }
    },

    //星宫汐
    yuanyao: {
        enable: 'phaseUse',
        filter(Evt, player) {
            if (player.countCards('h') > player.maxHp || player.countCards('h') == player.hp) return false;
            return (player.getStat('skill').yuanyao || 0) < game.countPlayer(cur => cur.sex == 'female');
        },
        complexCard: true,
        filterCard(Evt, player) {
            if (player.countCards('h') > player.hp) return true;
            return false;
        },
        selectCard() {
            let player = _status.event.player;
            if (player.countCards('h') > player.hp) return (player.countCards('h') - player.hp);
            return -1;
        },
        discard: true,
        check(card) {
            return 7.5 - get.value(card);
        },
        content: [() => {
            if (cards && cards.length) {
                Evt.change = 'discard';
                Evt.num = cards.length;
            } else {
                Evt.change = 'draw';
                Evt.num = player.hp - player.countCards('h');
            }
        }, () => {
            switch (Evt.change) {
                case 'discard': {
                    player.recover(Evt.num); break;
                }
                case 'draw': {
                    player.draw(Evt.num); player.loseHp(Evt.num); break;
                }
            }
        }],
        ai: {
            order: 1.5,
            result: {
                player(player) {
                    let num = game.countPlayer(cur => cur.sex == 'female') - (player.getStat('skill').yuanyao || 0);
                    if (num > 1) return player.countCards('h');
                    return player.countCards('h') - player.hp;
                },
            },
        },
    },
    gongni: {
        audio: true,
        trigger: { player: ['phaseZhunbeiBegin', 'useCardAfter', 'respondAfter'] },
        unique: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'yami',
        filter(Evt, player) {
            if (Evt.name != 'phaseZhunbei' && _status.currentPhase == player) return false;
            return game.countPlayer() == game.countPlayer(cur => cur.isDamaged() && cur.hp >= 0);
        },
        logTarget(Evt, player) {
            return game.players;
        },
        check(Evt, player) {
            let effect = 0;
            game.filterPlayer(cur => {
                effect += (cur.getDamagedHp() - cur.hp) * get.$a(player, target);
            })
            return effect >= 3;
        },
        content: [() => {
            player.$.gongni = true;
            player.awakenSkill('gongni');
            Evt.doon = [];
            Evt.current = player;
        }, () => {
            player.line(Evt.current, 'ocean');
            Evt.current.hp = (Evt.current.getDamagedHp());
            Evt.current.$thunder();
            game.log(Evt.current, '的体力变为', '#g' + Evt.current.hp);
            Evt.current.update();
            game.delayx(1.2);
            Evt.doon.add(Evt.current);
        }, () => {
            if (!Evt.doon.includes(Evt.current.next)) {
                Evt.current = Evt.current.next;
                Evt.goto(1);
            }
        }],
    },
    //紫海由爱
    lianyin: {
        trigger: { global: ['useCard', 'respond'] },
        priority: 996,
        filter(Evt, player) {
            if (Evt.name == 'respond' && !player.awakenedSkills.includes('guixiang')) return false;
            if (!player.$.lianyin) player.$.lianyin = 0;
            if (!player.$.guixiang) player.$.guixiang = 0;
            return Evt.player != player && player == _status.currentPhase && player.$.lianyin < player.maxHp;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > -1;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            game.asyncDraw([player, Evt.target]);
        }, () => {
            player.$.lianyin++;
            player.$.guixiang++;
            player.markSkill('guixiang');
        }],
        group: 'lianyin_clear',
        subSkill: {
            clear: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                firstDo: true,
                filter(Evt, player) {
                    return player.$.lianyin;
                },
                content() {
                    player.$.lianyin = 0;
                }
            },
        },
    },
    guixiang: {
        skillAnimation: true,
        unique: true,
        juexingji: true,
        forced: true,
        init(player) {
            player.$.guixiang = 0;
        },
        intro: {
            content: '已发动了&次『联音』',
        },
        trigger: { player: 'phaseZhunbeiBegin' },
        filter(Evt, player) {
            return player.$.guixiang >= game.countPlayer();
        },
        content: [() => {
            player.gainMaxHp();
        }, () => {
            player.recover();
        }, () => {
            player.$.guixiang = true;
            player.awakenSkill('guixiang');
            player.updateMarks('guixiang');
            player.unmarkSkill('guixiang');
        }],
        ai: {
            combo: 'lianyin',
        },
    },
    //亚里亚
    xuanying: {
        trigger: { global: ['useCard', 'respond'] },
        priority: 996,
        filter(Evt, player) {
            if (Evt.name == 'respond' && !player.awakenedSkills.includes('houfan')) return false;
            if (!player.$.xuanying) player.$.xuanying = 0;
            return Evt.player != player && player == _status.currentPhase && player.$.xuanying < (player.countCards('e') || 1);
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            player.chooseCard(`###${get.$pro('xuanying')}###将一张牌交给${get.$t(Evt.target)}`, 'he').set('target', Evt.target).ai = card => {
                let player = _status.event.player, target = _status.event.target;
                if (get.position(card) == 'e') return ((player.countCards('e') + 1) || 1) + get.value(card, target, 'raw') * get.$a(player, target);
                else if (get.type(card) == 'equip') return ((player.countCards('e')) || 1) + get.value(card, target, 'raw') * get.$a(player, target);
                return 1 + get.value(card, target, 'raw') * get.$a(player, target);
            };
        }, () => {
            if (result.bool && result.cards) {
                if (get.type(result.cards[0]) == 'equip') Evt.drawNum = 'equip';
                player.give(result.cards, Evt.target, true);
            } else Evt.finish();
        }, () => {
            Evt.drawNum = Evt.drawNum == 'equip' ? player.countCards('e') + 1 : 1
            player.chooseTarget(`『玄荫』：令一名角色摸${get.cnNumber(Evt.drawNum)}张牌`, true)
                .set('target', Evt.target)
                .set('ai', (target) => {
                    if (target != player && target.hasSkillTag('nogain'))
                        return 0;
                    return get.$a(player, target);
                });
        }, () => {
            if (result.bool && result.targets?.length) {
                result.targets[0].draw(Evt.drawNum);
            }
        }],
        group: 'xuanying_clear',
        subSkill: {
            clear: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                firstDo: true,
                filter(Evt, player) {
                    return player.$.xuanying;
                },
                content() {
                    player.$.xuanying = 0;
                }
            },
        },
    },
    houfan: {
        enable: 'phaseUse',
        unique: true,
        limited: true,
        filter(Evt, player) {
            return player.isMinHandcard();
        },
        content: [() => {
            player.loseMaxHp();
            Evt.num = 0;
        }, () => {
            let card = get.discardPile(card => get.type(card) == 'equip');
            if (card) {
                player.gain(card, 'gain2');
                Evt.num++;
            } else Evt.goto(3);
        }, () => {
            if (Evt.num < 4) Evt.goto(1);
        }, () => {
            player.$.houfan = true;
            player.awakenSkill('houfan');
            player.updateMarks('houfan')
        }],
        ai: {
            combo: 'xuanying',
            order(item, player) {
                let equips = [];
                for (let i = 0; i < ui.discardPile.childElementCount; i++) {
                    let subtype = get.subtype(ui.discardPile.childNodes[i]);
                    if (subtype && player.countCards('h', { subtype: subtype }) == 0) {
                        equips.add(ui.discardPile.childNodes[i]);
                    }
                }
                if (equips.length >= 3) return 10;
                return 0;
            },
            result: { player: 3 },
        }
    },
    //纸木铗
    quzhuan: {
        trigger: { global: 'useCardAfter' },
        usable: 1,
        filter(Evt, player) {
            return player == _status.currentPhase && Evt.player != player && get.itemtype(Evt.cards) == 'cards' && Evt.cards.filterInD().length;
        },
        prompt2(Evt, player) {
            return '你可以获得' + get.$t(Evt.cards.filterInD());
        },
        check(Evt, player) {
            return Evt.cards.filterInD().length > 1 || get.value(Evt.cards.filterInD()[0], player) > 1;
        },
        content() {
            player.gain(trigger.cards.filterInD(), 'gain2');
        }
    },
    yuanjiu: {
        trigger: { global: 'phaseUseBegin' },
        direct: true,
        filter(Evt, player) {
            let esuits = get.suit3(Evt.player.getCards('e'));
            return esuits.length && player.countDiscardableCards(player, 'he', card => esuits.includes(card));
        },
        content: [() => {
            Evt.target = trigger.player;
            let suits = get.suit3(Evt.target.getCards('e'));
            player.chooseCard('he', get.$pro2('yuanjiu'), card => _status.event.suits.includes(get.suit(card))).set('suits', suits).set('ai', card => {
                let target = _status.event.getParent().target;
                let player = _status.event.player;
                if (target.hasSha() && target.getUseValue('jiu') > 0 && get.$a(player, target) > 0) return 11 - get.value(card);
                return 0;
            }).set('logSkill', ['yuanjiu', Evt.target]);
        }, () => {
            if (result.bool) {
                player.give(result.cards, Evt.target, true);
            } else Evt.finish();
        }, () => {
            player.useCard({ name: 'jiu' }, Evt.target);
        }]
    },
    //ccm
    qijian: new toSkill('trigger', {
        audio: 4,
        trigger: { global: 'useCardAfter' },
        filter(Evt, player) {
            if (player.hasSkill('qijian_lost')) return false;
            return Evt.player == _status.currentPhase && Evt.player != player && get.color(Evt.card) == 'red' && Evt.targets && Evt.targets.length;
        },
        prompt2(Evt, player) {
            return `你可以跟随${get.$t(Evt.cards)}使用一张牌`;
        },
        check(Evt, player) {
            return Evt.cards.length > 1 || get.value(Evt.cards[0], player) > 1;
        },
        direct: true,
        content: [() => {
            player.chooseToUse({
                prompt: `###${get.$t('qijian')}###跟随${get.$t(trigger.player)}使用一张牌？`,
                filterCard(card, player) {
                    return lib.filter.filterCard.apply(this, arguments);
                },
                addCount: false,
            }).set('ai1', card => {
                let player = _status.event.player;
                let useBy = _status.event.useBy;
                if (get.tag(card, 'damage') && useBy.group === player.group) return get.order(card) + 10;
                return get.order(card);
            }).set('useBy', trigger.player).set('logSkill', 'qijian').set('targetRequired', true);
        }, () => {
            if (result.bool) {
                if (!player.hasHistory('sourceDamage', evt => evt.card.cardid == result.card.cardid && result.targets.includes(evt.player))) {
                    player.draw();
                }
                if (trigger.player.group !== player.group) player.addTempSkill('qijian_lost');
            }
        }],
        subSkill: {
            lost: {
                marktext: "鉴",
                intro: {
                    name: '查房结束',
                    content: '『起鉴』失效直到下个回合开始',
                },
            }
        }
    }),
    yizhan: {
        subSkill: {
            count: {
                trigger: {
                    global: "recoverBegin",
                },
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    if (!Evt.card) return false;
                    if (!Evt.source || Evt.source != player) return false;
                    if (!Evt.player.isDying()) return false;
                    if (Evt.player.$.yizhan_mark != undefined) return false;
                    return true;
                },
                content() {
                    trigger.yizhan = true;
                },
            },
            mark: {
                mark: 'character',
                locked: true,
                intro: {
                    name: 'ccm的翅膀',
                    content: '已被$发动『翼展』',
                },
            }
        },
        audio: true,
        group: ['yizhan_count'],
        trigger: {
            global: "recoverAfter",
        },
        init(player) {
            player.$.yizhan = false;
        },
        filter(Evt, player) {
            if (Evt.player.$.yizhan) return false;
            if (Evt.player.isDying()) return false;
            if (player.countCards() >= player.getHandcardLimit()) return false;
            return Evt.yizhan === true;
        },
        skillAnimation: true,
        animationColor: 'fire',
        frequent: true,
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            player.drawTo(player.getHandcardLimit());
        }, () => {
            Evt.target.changeGroup('qun');
            Evt.target.$.yizhan_mark = player;
            Evt.target.addSkill('yizhan_mark');
        }],
    },
    jushi: {
        unique: true,
        zhuSkill: true,
        mod: {
            maxHandcard(player, num) {
                if (player.hasZhuSkill('jushi') && game.countPlayer(cur => cur.group === 'qun'))
                    return num + game.countPlayer(cur => cur.group === 'qun');
            },
        },
    },
    //Buff
    shangsheng: {
        audio: 5,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [-1, -1];
        },
        trigger: { player: 'phaseBegin' },
        check(Evt, player) {
            return true;
        },
        filter(Evt, player) {
            return true;
        },
        frequent: true,
        content: [() => {
            let Buff = (player.$.shangsheng_Buff) || 1;
            Evt.ctrlMap = [`A.于摸牌阶段多摸${Buff}张牌`, `B.于出牌阶段多出${Buff}张【杀】`, `C.于弃牌阶段手牌上限+${Buff}`]
            player.chooseControl('dialogcontrol', Evt.ctrlMap).set('ai', function () {
                let player = _status.event.player;
                let controls = _status.event.controls.slice(0);
                let map = _status.event.controls;
                if (player.$.shangsheng[0] == -1) return controls.randomGet();
                else {
                    if (player.$.shangsheng[0] >= 0) controls.remove(map[player.$.shangsheng[0]]);
                    if (player.$.shangsheng[1] >= 0) controls.remove(map[player.$.shangsheng[1]]);
                    if (controls.includes(map[1]) && player.countCards('hs', 'sha') >= 2 && player.hasUseTarget({ name: 'sha', isCard: true })) return map[1];
                    return controls.randomGet();
                }
            }).set('prompt', '『能力上升』：选择一项').set('ctrlMap', Evt.ctrlMap);
        }, () => {
            Evt.change = result.control;
            switch (Evt.change) {
                case Evt.ctrlMap[0]: {
                    player.addTempSkill('shangsheng_Buff0'); break;
                }
                case Evt.ctrlMap[1]: {
                    game.putBuff(player, 'shangsheng', '.player_buff')
                    player.addTempSkill('shangsheng_Buff1'); break;
                }
                case Evt.ctrlMap[2]: {
                    player.addTempSkill('shangsheng_Buff2'); break;
                }
            }
        }, () => {
            if (player.$.shangsheng[0] >= 0 && player.$.shangsheng[0] != Evt.ctrlMap[Evt.change]
                && player.$.shangsheng[1] >= 0 && player.$.shangsheng[1] != Evt.ctrlMap[Evt.change]) player.$.shangsheng_Buff++;
            else if (player.$.shangsheng_Buff > 0) player.$.shangsheng_Buff--;
        }, () => {
            player.$.shangsheng[1] = player.$.shangsheng[0];
            player.$.shangsheng[0] = Evt.ctrlMap[Evt.change];
            player.markSkill('shangsheng_Buff');
        }],
        group: 'shangsheng_Buff',
        subSkill: {
            Buff0: new toSkill('mark', {
                trigger: { player: 'phaseDrawBegin2' },
                filter(Evt, player) {
                    return !Evt.numFixed;
                },
                content() {
                    let Buff = (player.$.shangsheng_Buff) || 1;
                    trigger.num += Buff;
                },
                marktext: 'A',
                intro: { name: 'Buff', content: '本回合内于摸牌阶段多摸牌' },
            }, 'forced', 'mark'),
            Buff1: new toSkill('mark', {
                mod: {
                    cardUsable(card, player, num) {
                        let Buff = (player.$.shangsheng_Buff) || 1;
                        if (card.name == 'sha' && player.isPhaseUsing()) return num + Buff;
                    },
                },
                marktext: 'B',
                intro: { name: 'Buff', content: '本回合内于出牌阶段可以多使用【杀】' },
                onremove(player, skill) {
                    game.clearBuff(player, 'shangsheng')
                },
            }, 'mark'),
            Buff2: new toSkill('mark', {
                trigger: { player: 'phaseDiscardBegin' },
                content() { },
                mod: {
                    maxHandcard(player, num) {
                        if (_status.event.name == 'phaseDiscard') {
                            let Buff = (player.$.shangsheng_Buff) || 1;
                            return num + Buff;
                        }
                    },
                },
                marktext: 'C',
                intro: { name: 'Buff', content: '本回合于弃牌阶段手牌上限上升' },
            }, 'forced', 'mark'),
            Buff: {
                init(player, skill) {
                    if (!player.$[skill]) player.$[skill] = 0;
                },
                marktext: "↑↑",
                locked: true,
                intro: {
                    name: '能力值大上升↑↑',
                    content: 'Buff已叠加&层',
                },
            }
        }
    },
    jinghua: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.getStat().card.sha > 0;
        },
        filterCard: true,
        complexCard: true,
        selectCard() {
            let player = _status.event.player;
            return player.getStat().card.sha;
        },
        complexTarget: true,
        multitarget: true,
        selectTarget() {
            if (!ui.selected.cards.length) return [1, 1];
            return [ui.selected.cards.length, ui.selected.cards.length];
        },
        filterTarget(card, player, target) {
            if (!ui.selected.cards.length) return false;
            return target != player;
        },
        discard: false,
        lose: false,
        check(card) {
            if (get.type(card) == 'basic') return 7 - get.value(card);
            return 4 - get.value(card);
        },
        content: [() => {
            Evt.shows = cards.slice(0);
            Evt.gains = targets.slice(0);
            if (!player.$.jinghua) player.$.jinghua = [];
            player.$.jinghua.addArray(Evt.gains);
        }, () => {
            let show = Evt.shows.shift();
            let gain = Evt.gains.shift();
            player.showCards(show, '『镜花水月』展示牌');
            gain.addSkill('jinghua2');
            player.give(show, gain, true);
            gain.markAuto('jinghua2', [show]);
            if (Evt.gains.length) Evt.redo();
        }],
        ai: {
            order: 7,
            result: {
                target: -1,
            }
        }
    },
    jinghua2: {
        marktext: '镜',
        intro: {
            name: '镜花水月',
            content: 'cards',
        },
        onremove: true,
        charlotte: true,
        mod: {
            cardEnabled(card, player) {
                if (player.getStorage('jinghua2').filter(jinghua => get.type2(jinghua) == get.type2(card)).length) return false;
            },
            cardSavable(card, player) {
                if (player.getStorage('jinghua2').filter(jinghua => get.type2(jinghua) == get.type2(card)).length) return false;
            },
        },
        trigger: {
            global: 'phaseBefore',
        },
        locked: true,
        direct: true,
        filter(Evt, player) {
            return Evt.player.hasSkill('jinghua') && Evt.player.getStorage('jinghua').includes(player);
        },
        content() {
            player.line(trigger.player);
            trigger.player.$.jinghua.remove(player);
            player.removeSkill('jinghua2');
        },
    },
    //七濑胡桃
    shang: new toSkill('mark', {
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked'),
    shangbei: {
        group: ['shang', 'shangbei_give'],
        trigger: { player: 'damageAfter' },
        frequent: true,
        content: [() => {
            let cards = get.cards();
            Evt.cards = cards;
            player.showCards(Evt.cards, '『裳备』展示牌');
        }, () => {
            if (!get.suit3(player.getExpansions('shang')).includes(get.suit(Evt.cards[0], false))) {
                player.addToExpansion(Evt.cards, 'draw').gaintag.add('shang');
                player.draw();
                game.delayx(0.5)
            }
        }],
        subSkill: {
            give: {
                trigger: { player: 'phaseUseBegin' },
                direct: true,
                filter(Evt, player) {
                    return player.getExpansions('shang').length > 0;
                },
                content: [() => {
                    Evt.cards = player.getExpansions('shang');
                }, () => {
                    Evt.videoId = lib.status.videoId++;
                    let dialogx = ['###『裳备』：你的「裳」###选择某一类型的「裳」，然后令一名角色获得之'];
                    dialogx.push(Evt.cards);
                    if (player.isOnline2()) {
                        player.send(function (dialogx, id) {
                            ui.create.dialog.apply(null, dialogx).videoId = id;
                        }, dialogx, Evt.videoId);
                    }
                    Evt.dialog = ui.create.dialog.apply(null, dialogx);
                    Evt.dialog.videoId = Evt.videoId;
                    if (player != game.me || _status.auto) {
                        Evt.dialog.style.display = 'none';
                    }
                }, () => {
                    let next = player.chooseButton()
                        .set('selectButton', 1)
                        .set('dialog', Evt.videoId)
                        .set('ai', function (button) {
                            return get.value(button.link);
                        });
                }, () => {
                    if (result.bool && result.links) {
                        Evt.links = result.links;
                        let func = function (cards, id) {
                            let dialog = get.idDialog(id);
                            if (dialog) {
                                for (let j of cards) {
                                    for (let i = 0; i < dialog.buttons.length; i++) {
                                        if (get.type2(dialog.buttons[i].link) == get.type2(j)) {
                                            dialog.buttons[i].classList.add('glow');
                                        }
                                        else {
                                            dialog.buttons[i].classList.add('unselectable');
                                        }
                                    }
                                }
                            }
                        }
                        if (player.isOnline2()) {
                            player.send(func, Evt.links, Evt.videoId);
                        } else if (player == game.me && !_status.auto) {
                            func(Evt.links, Evt.videoId);
                        }
                        player.chooseTarget('『裳备』：令一名角色获得之').set('ai', function (target) {
                            let player = _status.event.player, effect = get.$a(player, target) * 1.5;
                            if (target != player) effect += get.recoverEffect(player, player, player);
                            return effect;
                        });
                    } else {
                        if (player.isOnline2()) {
                            player.send('closeDialog', Evt.videoId);
                        }
                        Evt.dialog.close();
                        Evt.finish();
                    }
                }, () => {
                    if (result.bool && result.targets?.length) {
                        Evt.target = result.targets[0];
                        let type = get.type2(Evt.links[0]);
                        Evt.cards = Evt.cards.filter(card => get.type2(card) == type);
                        Evt.target.gain(Evt.cards, 'give', player, 'log', 'fromStorage');
                        if (Evt.target != player) player.recover();
                    } else {
                        for (let i = 0; i < ui.dialog.buttons.length; i++) {
                            ui.dialog.buttons[i].classList.remove('glow');
                        }
                        Evt.goto(2);
                    }
                }, () => {
                    if (player.isOnline2()) {
                        player.send('closeDialog', Evt.videoId);
                    }
                    Evt.dialog.close();
                }],
            }
        }
    },
    qianqing: {
        trigger: { player: 'phaseBegin' },
        forced: true,
        filter(Evt, player) {
            return player.getExpansions('shang').length == 0;
        },
        content() {
            player.damage('nosource');
        }
    },
    //Rim
    shenghua: {
        enable: 'phaseUse',
        position: 'h',
        filter(Evt, player) {
            return player.countCards('h');
        },
        filterCard: true,
        selectCard: -1,
        check(card) {
            if (get.type(card) == 'equip') return 10 - get.value(card);
            return 6 - get.value(card);
        },
        content() {
            player.draw(cards.length - player.countSkill('shenghua'));
        },
        ai: {
            order(item, player) {
                if (player.countCards('h', { type: 'equip' })) return 4;
                else return 1;
            },
            result: {
                player(player) {
                    if (player.isTurnedOver() && player.countCards('h', { type: 'equip' })) return 1;
                    return 1 - player.countSkill('shenghua');
                }
            }
        }
    },
    zhanchong: {
        trigger: { player: 'loseEnd' },
        filter(Evt, player) {
            if (Evt.getParent().name && ['useCard', 'addJudge'].includes(Evt.getParent().name)) return false;
            if (!Evt.visible) return false;
            for (let i = 0; i < Evt.hs.length; i++) {
                if (get.type(Evt.hs[i]) == 'equip') return true;
            }
            return false;
        },
        direct: true,
        content: [() => {
            Evt.num ??= trigger.hs.filter(chong => get.type(chong) == 'equip').length;
            if (Evt.num > 0) {
                player.chooseTarget(get.$pro2('zhanchong'), function (card, player, target) {
                    return target.countCards('he');
                }).set('ai', function (target) {
                    let player = _status.event.player;
                    if (player.isTurnedOver()) return 4 - get.$a(player, target);
                    return -1 - get.$a(player, target);
                });
            } else Evt.finish();
        }, () => {
            if (result.bool && result.targets[0]) {
                Evt.target = result.targets[0];
                player.discardPlayerCard(result.targets[0], 'he', true).set('ai', function (button) {
                    if (get.type(button.link) == 'equip') return 2 - get.value(button.link);
                    return 3 - get.value(button.link) + get.damageEffect(_status.event.target, _status.event.player, _status.event.player);
                })
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards?.length) {
                player.turnOver();
                Evt.num--;
                if (get.type(result.cards[0]) != 'equip') {
                    Evt.target.damage(player, 'nocard');
                }
                Evt.goto(0);
            }
        }],
    },
    //情绪
    baiqing: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        trigger: { global: 'useCard2' },
        filter(Evt, player) {
            if (Evt.card.name != 'sha') return false;
            return true;
        },
        direct: true,
        content: [() => {
            if (!player.$.baiqing) player.$.baiqing = 0;
            player.$.baiqing++;
            player.markSkill('baiqing');
        }, () => {
            if (player.getDamagedHp() + 1 == player.$.baiqing) {
                player.chooseBool(get.$pro2('baiqing')).ai = function () {
                    return 1;
                };
            }
        }, () => {
            if (result.bool) {
                Evt.cards = get.cards(player.$.baiqing);
                player.showCards(`『白情』亮出牌堆顶${get.cnNumber(player.$.baiqing)}张牌`, Evt.cards);
            } else Evt.finish();
        }, () => {
            let discards = [];
            if (trigger.cards) {
                Evt.cards = Evt.cards.filter(card => {
                    for (let i = 0; i < trigger.cards.length; i++) {
                        if (get.color(trigger.cards[i]) == get.color(card)) {
                            discards.add(card);
                            return false;
                        }
                    }
                    return true;
                })
            }
            if (discards.length) {
                game.cardsDiscard(discards);
            }
            player.gain(Evt.cards, 'log', 'gain2');
        }],
        marktext: 'ヰ',
        mark: true,
        intro: {
            content: '全场已使用#张杀',
        },
        group: 'baiqing_clear',
        subSkill: {
            clear: {
                trigger: { global: 'phaseAfter' },
                forced: true,
                silent: true,
                firstDo: true,
                priority: 42,
                content() {
                    player.unmarkSkill('baiqing');
                    player.$.baiqing = 0;
                }
            },
        },
    },
    shuangxing: {
        trigger: { player: 'useCard2' },
        filter(Evt, player) {
            if (get.type2(Evt.card) != 'trick') return false;
            return Evt.targets && Evt.targets.length && !Evt.targets.includes(player);
        },
        direct: true,
        content: [() => {
            let controls = ['令你本回合使用牌无次数限制', '令其中一名目标对你使用一张【杀】，否则你获得其一张牌', '取消'];
            player.chooseControl('dialogcontrol', controls).set('ai', function () {
                let player = _status.event.player;
                if (player.countCards('hs', 'sha') > 2 && !player.hasSkill('shuangxing_chenhui') && !player.hasUnknown(2)) return 0;
                return 1;
            }).set('prompt', get.$pro2('shuangxing'));
        }, () => {
            switch (result.control) {
                case '令你本回合使用牌无次数限制': {
                    player.logSkill('shuangxing');
                    player.addTempSkill('shuangxing_chenhui');
                    Evt.finish();
                    break;
                }
                case '令其中一名目标对你使用一张【杀】，否则你获得其一张牌': {
                    player.chooseTarget(get.$pro2('shuangxing'), function (card, player, target) {
                        return _status.event.targets.includes(target) && target.countCards('h');
                    }).set('ai', function (target) {
                        if (get.$a(player, target) < 0) {
                            if (player.maxHp - player.hp + 1 > player.$.baiqing) return 4;
                            else return 5 - target.countCards('hs');
                        }
                        return 0;
                    }).set('targets', trigger.targets);
                    break;
                }
                default: Evt.finish();
            }
        }, () => {
            if (result.bool && result.targets[0]) {
                let target = result.targets[0];
                Evt.target = target;
                player.logSkill('shuangxing', target);
                target.chooseToUse(function (card, player, Evt) {
                    if (get.name(card) != 'sha') return false;
                    return lib.filter.filterCard.apply(this, arguments);
                }, `『星徊』：对${get.$t(player)}使用一张杀，或令其获得你的一张牌`)
                    .set('targetRequired', true).set('complexSelect', true)
                    .set('filterTarget', function (card, player, target) {
                        if (target != _status.event.sourcex && !ui.selected.targets.includes(_status.event.sourcex)) return false;
                        return lib.filter.targetEnabled2.apply(this, arguments);
                    })
                    .set('sourcex', player);
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.bool == false && Evt.target.countGainableCards(player, 'he') > 0) {
                player.gainPlayerCard(Evt.target, 'he', true);
            } else {
                Evt.finish();
            }
        }],
        subSkill: {
            chenhui: {
                mark: true,
                intro: {
                    content: '本回合使用牌无次数限制',
                },
                mod: {
                    cardUsable(card, player, num) {
                        return Infinity;
                    },
                },
            }
        }
    },
    //可不
    nisheng: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: { global: 'phaseEnd' },
        filter(Evt, player) {
            if (Evt.skill) return false;
            return player.countCards('h', card1 => {
                let num = get.number(card1, player);
                if (player.getStorage('nisheng').includes(num)) return false;
                return player.countCards('h', card2 => card1 != card2 && num == get.number(card2, player));
            }) >= 2;
        },
        content: [() => {
            player.chooseCard(get.$pro2('nisheng'), 'h', 2, function (card, player) {
                let num = get.number(card);
                if (player.getStorage('nisheng').includes(num)) return false;
                if (ui.selected.cards.length) return num == get.number(ui.selected.cards[0]);
                return true;
            }).ai = get.unuseful2;
        }, () => {
            if (result.bool && result.cards[0]) {
                player.showCards(result.cards, '拟声');
                player.$.nisheng.add(get.number(result.cards[0]));
                player.markSkill('nisheng');
                player.insertPhase();
            } else {
                Evt.finish();
            }
        }],
        intro: {
            content: '已使用过的点数：#',
        },
    },
    jingyan: {
        trigger: { player: 'damageEnd' },
        filter(Evt, player) {
            return Evt.source && Evt.source.isIn() && Evt.source.countCards('he') / 2 > 0;
        },
        check(Evt, player) {
            return Evt.source.countCards('he') / 2 >= 2 || player.isTurnedOver();
        },
        logTarget: 'source',
        content: [() => {
            Evt.tar = trigger.source
            player.turnOver();
        }, () => {
            Evt.num = Math.ceil(Evt.tar.countCards('he') / 2)
            player.gainPlayerCard(Evt.tar, true, 'he', Evt.num);
        }],
        group: 'jingyan_record',
        subSkill: {
            record: new toSkill('trigger', {
                filter(Evt, player) {
                    let evt = Evt.getParent('gainPlayerCard')
                    if (!evt) return false
                    return evt.name === 'gainPlayerCard' && evt.getParent().name === 'jingyan'
                },
                content() {
                    trigger.gaintag.add('jingyan');
                }
            }, 'direct', 'silent').setT('gainBegin'),
        },
        ai: {
            maixie: true,
            skillTagFilter(player) {
                return player.isTurnedOver();
            },
        },
        mod: {
            ignoredHandcard(card, player) {
                if (card.hasGaintag('jingyan')) {
                    return true;
                }
            },
            aiOrder(player, card, num) {
                if (get.itemtype(card) == 'card' && card.hasGaintag('jingyan')) return num - 0.1;
            },
        },
    },
    //猫又小粥
    fantuan: {
        trigger: { player: 'useCard2' },
        direct: true,
        filter(Evt) {
            return get.type(Evt.card) == 'delay';
        },
        content: [() => {
            player.chooseTarget(get.$pro2('fantuan')).set('ai', function (target) {
                let player = _status.event.player;
                return get.recoverEffect(target, player, player) + get.$a(player, target);
            });
        }, () => {
            if (result.bool && result.targets[0]) {
                result.targets[0].recover();
                result.targets[0].draw();
            }
        }],
    },
    shengang: {
        group: ['shengang_judge', 'shengang_useCard'],
        subSkill: {
            judge: {
                trigger: { global: ['judgeAfter'] },
                filter(Evt, player) {
                    if (!game.filterPlayer(cur => get.$dis(player, cur, 'pure') == 1, [player]).includes(Evt.player)) return false;
                    return Evt.card && get.type(Evt.card) == 'delay' && get.position(Evt.card) == 'd';
                },
                prompt2(Evt, player) {
                    return '获得' + get.$t(Evt.card);
                },
                check(Evt, player) {
                    return get.value(Evt.card) > 3;
                },
                round: 2,
                content() {
                    player.gain(trigger.card, 'gain2', 'log');
                },
            },
            useCard: {
                trigger: { global: ['useCardAfter'] },
                filter(Evt, player) {
                    if (!game.filterPlayer(cur => get.$dis(player, cur, 'pure') == 1, [player]).includes(Evt.player)) return false;
                    return Evt.cards && Evt.cards.filterInD().length;
                },
                prompt2(Evt, player) {
                    return '获得' + get.$t(Evt.cards.filterInD());
                },
                check(Evt, player) {
                    return get.value(Evt.cards.filterInD()) > 3;
                },
                round: 2,
                content() {
                    player.gain(trigger.cards.filterInD(), 'gain2', 'log');
                },
            }
        }
    },
    //狮白牡丹
    dan: {
        locked: true,
        marktext: '弹',
        intro: {
            content: 'cardCount',
        },
        cardAround: true
    },
    sbliedan: {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: { player: 'useCardToPlayered' },
        filter(Evt, player) {
            return get.name(Evt.card) == 'sha' && Evt.target.countCards('he');
        },
        logTarget: 'target',
        content: [() => {
            Evt.target = trigger.target;
            Evt.num = Math.min(game.roundNumber || 1, 7);
            Evt.target.chooseCard('he', Evt.num, true, `『烈弹』：将${get.cnNumber(Evt.num)}张牌置为「弹」`);
        }, () => {
            if (result.bool && result.cards.length) {
                Evt.target.lose(result.cards, ui.special, 'toStorage');
                target.addSkill('sbliedan2');
                target.$.sbliedan2 = Evt.num;
                player.markAuto('dan', result.cards);
            }
        }],
        group: ['dan', 'sbliedan_gainBy'],
        subSkill: {
            gainBy: {
                trigger: { player: 'phaseEnd' },
                forced: true,
                popup: false,
                filter(Evt, player) {
                    return player.$.dan && player.$.dan.length > 0;
                },
                content() {
                    game.log(player, `收回了${get.cnNumber(player.gain(player.$.dan, 'draw', 'fromStorage').cards.length)}张「弹」`);
                    player.$.dan.length = 0;
                },
            }
        }
    },
    sbliedan2: {
        trigger: { global: 'phaseDiscardEnd' },
        direct: true,
        filter(Evt, player) {
            return player.$.sbliedan2;
        },
        content: [() => {
            Evt.num = player.$.sbliedan2;
            let cards = [];
            game.filterPlayer(cur => {
                if (cur.getStorage('dan').length) cards.addArray(cur.getStorage('dan'));
            });
            if (cards.length) {
                player.chooseCardButton(cards, Evt.num, `『烈弹』：可以收回${get.cnNumber(Evt.num)}张「弹」`);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links.length) {
                game.filterPlayer(cur => {
                    if (cur.getStorage('dan').length) cur.unmarkAuto('dan', result.links);
                })
                game.log(player, `收回了${get.cnNumber(player.gain(result.links, 'draw', 'fromStorage').cards.length)}张「弹」`);
                delete player.$.sbliedan2;
                player.removeSkill('sbliedan2');
            }
        }],
        intro: {
            onunmark: 'throw',
            content: 'cardCount',
        },
    },
    buqiang: {
        trigger: { global: 'changeHp' },
        direct: true,
        filter(Evt, player) {
            return Evt.player.hp == 1 && player.canUse('sha', Evt.player, false) && (player.hasSha() || _status.connectMode && player.countCards('hs'));
        },
        content() {
            Evt.target = trigger.player;
            player.chooseToUse(get.$pro2('buqiang', Evt.target), function (card, player, Evt) {
                if (get.name(card) != 'sha') return false;
                return lib.filter.filterCard.apply(this, arguments);
            }, Evt.target, -1).set('addCount', false).set('logSkill', 'buqiang');
        },
    },
    //天音彼方
    yuyi: new toSkill('trigger', {
        filter(Evt, player) {
            return true
        },
        content: [() => {
            Evt.num = 0
            let judge = player.getHistory('judge', evt => evt.getParent('phaseJudge') && evt.getParent('phaseJudge').name === 'phaseJudge')
            let use = player.getHistory('useCard', evt => evt.getParent('phaseUse') && evt.getParent('phaseUse').name === 'phaseUse')
            console.log(use)
            if (judge.length < 2) Evt.num++
            if (use.length < 2) Evt.num++
            if (player.$.yuyi_record < 2) Evt.num++
            player.$.yuyi_record = 0
            player.draw(Evt.num)
        }, () => {
            if (Evt.num === 3) {
                Evt.recover = player.recover()
            }
        }, () => {
            if (Evt.num < 3 || !Evt.recover?.result) {
                player.chooseTarget(`###${get.prompt('yuyi')}###令一名角色获得『愈翼』`)
                    .set('filterTarget', function (card, player, target) {
                        return !target.hasSkill('yuyi');
                    })
                    .set('ai', get.attitude2)
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('yuyi', Evt.target)
                if (!Evt.target.hasSkill('yuyi')) {
                    Evt.target.addTempSkill('yuyi', { player: 'phaseAfter' })
                }
            }
        }],
        ai: {
            threaten: 1.1
        },
        group: 'yuyi_record',
        subSkill: {
            record: new toSkill('rule', {
                filter(Evt, player) {
                    if (Evt.getParent('phaseDiscard') === player.$.yuyi) return true
                    player.$.yuyi_record = 0
                    return Evt.getParent('phaseDiscard') && Evt.getParent('phaseDiscard').name === 'phaseDiscard'
                },
                content: [() => {
                    player.$.yuyi = trigger.getParent('phaseDiscard')
                    player.$.yuyi_record += trigger.cards.length
                }]
            }, 'onremove', 'silent', 'direct').setT('discard', 'End'),
        }
    }, 'frequent').setT('phase', 'End'),
    renjian: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countCards('he')
        },
        content: [() => {
            player.chooseToDiscard('he', get.prompt2('renjian')).set('logSkill', 'renjian')
        }, () => {
            if (result.bool) {
                player.judge(card => {
                    if (get.color(card) == 'black' || get.suit(card) == 'diamond') return 2;
                    return 0;
                }).callback = lib.skill.renjian.callback;
            }
        }],
        callback: [() => {
            if (Evt.judgeResult.color == 'black' || Evt.judgeResult.suit == 'diamond') {
                Evt.num = player.getDamagedHp() + 1
                player.chooseTarget(`视为使用了一张目标数最大为${Evt.num}的【暗杀】`, [1, Evt.num], function (card, player, target) {
                    if (player == target) return false;
                    return player.canUse({ name: 'sha' }, target, false);
                }).set('ai', (target) => get.effect(target, { name: 'sha' }, _status.event.player))
            }
        }, () => {
            if (result.bool && result.targets) {
                player.logSkill('renjian', result.targets);
                player.useCard({ name: 'sha', nature: 'yami', isCard: true }, result.targets, false);
            }
        }],
        involve: [{
            name: 'sha',
            nature: 'yami'
        }]
    }, 'direct').setT('phaseJudge', 'Begin'),
    //PPH
    pphpanfeng: {
        trigger: { player: ['phaseUseBegin', 'damageAfter'] },
        filter(Evt, player) {
            return !player.hasSkill('pphpanfeng_used');
        },
        content() {
            player.judge(card => {
                if (get.color(card) == 'red') return 2;
                return 0;
            }).callback = lib.skill.pphpanfeng.callback;
        },
        callback: [() => {
            if (Evt.judgeResult.color == 'red') {
                player.chooseTarget('『攀峰』：对体力最多的角色造成一点伤害', true, function (card, player, target) {
                    return target.isMaxHp();
                }).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.damageEffect(target, player, player);
                });
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('pphpanfeng', Evt.target);
                Evt.target.damage('nocard');
            }
        }],
        group: 'pphpanfeng_usedBy',
        subSkill: {
            usedBy: {
                trigger: { global: 'dyingAfter' },
                forced: true,
                popup: false,
                filter(Evt, player) {
                    return Evt.player.isAlive() && Evt.reason && Evt.reason.getParent().name == 'judgeCallback'
                        && Evt.reason.getParent(3).name == 'pphpanfeng' && Evt.reason.getParent(3).player == player;
                },
                content() {
                    player.addTempSkill('pphpanfeng_used');
                }
            },
            used: {
                mark: true,
                marktext: '峰',
                intro: {
                    content: '不能发动『攀峰』'
                }
            }
        }
    },
    lanyue: {
        trigger: { global: 'damageSource' },
        filter(Evt, player) {
            if (Evt._notrigger.includes(Evt.player)) return false;
            if (!player.countCards('h')) return false;
            return (Evt.card && Evt.card.name == 'sha' && Evt.getParent().name == 'sha' &&
                Evt.source.isAlive());
        },
        direct: true,
        limited: true,
        skillAnimation: true,
        animationColor: 'metal',
        content: [() => {
            Evt.target = trigger.source;
            Evt.num = trigger.num;
            let check = get.$a(player, Evt.target) > 0 && (!Evt.target.countCards('h') || Evt.num >= 2)
            player.chooseToDiscard(get.$pro2('lanyue')).set('ai', card => {
                let check = _status.event.check;
                if (!check) return 0;
                return get.unuseful2(card);
            }).set('check', check);
        }, () => {
            if (result.bool && result.cards) {
                player.logSkill('lanyue', Evt.target);
                player.awakenSkill('lanyue');
                Evt.target.gainMaxHp();
            } else Evt.finish();
        }, () => {
            let list = [player];
            list.add(Evt.target);
            game.asyncDraw(list, Evt.num)
        }]
    },
    //喵喵人
    shenghuo: {
        audio: 3,
        init(player, skill) {
            player.markSkill('shenghuo');
            if (!player.$[skill]) player.$[skill] = 0;
        },
        enable: 'phaseUse',
        position: 'h',
        filter(Evt, player) {
            return !player.getStat('skill').shenghuo || player.getStat('skill').shenghuo < player.$.shenghuo + 1;
        },
        content: [() => {
            Evt.topCards = get.cards(player.$.shenghuo + 1);
            Evt.bottomCards = get.bottomCards(player.$.shenghuo + 1);
            Evt.bottomCards.removeArray(Evt.topCards);
            let cards = Evt.topCards.concat(Evt.bottomCards);
            player.chooseButton([0, Infinity], true, ['『圣火』：按顺序选择置于牌堆另一端的牌（先选择的在外侧）', '牌堆顶', [Evt.topCards, 'card'], '牌堆底', [Evt.bottomCards, 'card']]).set('ai', function (button) {
                let player = _status.event.player, now = _status.currentPhase, next = now.getNext();
                let att = get.$a(player, next), card = button.link;
                let bottomCards = _status.event.bottomCards;
                let judge = next.getCards('j')[ui.selected.buttons.filter(buttonx => bottomCards.includes(buttonx.link)).length];
                if (judge) {
                    if (bottomCards.includes(card)) return get.judge(judge)(card) * att;
                    else return -get.judge(judge)(card) * att;
                }
                if (bottomCards.includes(card)) return next.getUseValue(card) * att;
                return -next.getUseValue(card) * att;
            }).set('bottomCards', Evt.bottomCards);
        }, () => {
            if (result.bool && result.links) {
                let links = result.links.slice(0)
                let top = Evt.topCards.slice(0).removeArray(links), bottom = Evt.bottomCards.slice(0).removeArray(links);
                for (let i = 0; i < links.length; i++) {
                    if (Evt.topCards.includes(links[i])) bottom.push(links[i]);
                    if (Evt.bottomCards.includes(links[i])) top.unshift(links[i]);
                }
                for (let i = top.length - 1; i > -1; i--) {
                    ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                }
                for (let i = 0; i < bottom.length; i++) {
                    ui.cardPile.appendChild(bottom[i]);
                }
                player.popup(`${get.cnNumber(top.length)}上${get.cnNumber(bottom.length)}下`);
                game.log(player, `将${get.cnNumber(top.length)}张牌置于牌堆顶`);
                game.updateRoundNumber();
                game.delay(2);
            }
        }],
        marktext: 'Nya',
        mark: true,
        intro: {
            content: '上次受到的伤害值为#',
        },
        group: 'shenghuo_change',
        subSkill: {
            change: {
                trigger: { player: 'damage' },
                filter(Evt, player) {
                    return Evt.num > 0;
                },
                direct: true,
                content() {
                    player.$.shenghuo = trigger.num;
                    player.markSkill('shenghuo');
                }
            }
        },
        ai: {
            order(item, player) {
                if (player.countCards('hs', card => get.tag(card, 'draw'))) return 10;
                else return 1;
            },
            result: {
                player(player) {
                    return 1;
                }
            }
        },
    },
    dipo: {
        audio: 1,
        trigger: {
            player: 'drawBegin'
        },
        filter(Evt, player) {
            return player.isDamaged();
        },
        forced: true,
        firstDo: true,
        content() {
            trigger.bottom = true;
            trigger.num++;
        },
        ai: {
            maixie: true,
            maixie_hp: true,
            skillTagFilter(player) {
                return player.isHealthy();
            },
            threaten(player, target) {
                if (target.hp == target.maxHp) return 0.5;
                return 1.2;
            },
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'draw') && target.isDamaged()) return [1, 1];
                }
            }
        }
    },
    miaoche: {
        audio: 2,
        trigger: { global: 'loseAfter' },
        filter(Evt, player) {
            if (!player.hasZhuSkill('miaoche')) return false;
            return Evt.type == 'discard' && Evt.getParent('phaseDiscard').player == Evt.player && Evt.player.isYingV() && Evt.cards2.filterInD('d').length > 0;
        },
        zhuSkill: true,
        direct: true,
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player;
            if (trigger.delay === false) game.delay();
            let cards = trigger.cards2.filterInD('d');
            player.chooseCardButton(cards, '『喵车』：是否获得其中的一张牌？').set('ai', function (button) {
                return get.value(button.link, _status.event.player);
            });
            "step 1"
            if (result.bool) {
                player.logSkill('miaoche', Evt.target);
                player.gain(result.links[0], 'gain2');
                game.delayx();
            }
        }],
    },
    //铁耗子
    haosun: {
        audio: 3,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: {
            player: 'phaseBegin'
        },
        filter(Evt, player) {
            return true;
        },
        direct: true,
        content: [() => {
            let controls = ['回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张', '声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张', '取消'];
            player.chooseControl('dialogcontrol', controls).set('ai', function () {
                let player = _status.event.player;
                if (player.isDamaged() || player.getStorage('haosun').length > 1) return 0;
                return 1;
            }).set('prompt', get.$pro2('haosun'));
        }, () => {
            switch (result.control) {
                case '回复1点体力以重置此技能并修改『伴猫』，然后你本回合每次摸牌少摸一张': {
                    player.logSkill('haosun');
                    player.recover();
                    player.$.banmao = true;
                    player.$.haosun = [];
                    player.addTempSkill('haosun_drop');
                    player.unmarkSkill('haosun');
                    Evt.finish();
                    break;
                }
                case '声明一种你可以使用的基本牌并令你不能使用之，然后你本回合每次摸牌额外摸一张': {
                    player.chooseControl(get.inpile('basic', card => lib.filter.cardEnabled({ name: card }, player, 'forceEnable'))).set('prompt', '声明一种你可以使用的基本牌并令你不能使用之').set('choice', get.inpile('basic', card => {
                        if (player.hasCard(card)) return false;
                        return lib.filter.cardEnabled({ name: card }, player, 'forceEnable');
                    })).set('ai', function () {
                        let player = _status.event.player;
                        let controls = _status.event.controls.slice(0);
                        if (_status.event.choice && _status.event.choice.length) return _status.event.choice.randomGet();
                        if (controls.includes('qi')) return 'qi';
                        if (controls.includes('tao') && player.hp >= 2) return 'tao';
                        if (controls.includes('jiu')) return 'jiu';
                        return controls.randomGet();
                    });
                    break;
                }
                default: Evt.finish();
            }
        }, () => {
            if (result.control) {
                player.logSkill('haosun');
                player.popup(result.control);
                player.$.haosun.add(result.control);
                player.addTempSkill('haosun_plus');
                player.markSkill('haosun');
                game.delayx();
            }
        }],
        mod: {
            cardEnabled(card, player) {
                if (player.getStorage('haosun').includes(get.name(card))) return false;
            },
            cardSavable(card, player) {
                if (player.getStorage('haosun').includes(get.name(card))) return false;
            }
        },
        mark: true,
        intro: {
            content: '已禁用的基本牌：$',
        },
        subSkill: {
            drop: {
                trigger: {
                    player: 'drawBegin'
                },
                forced: true,
                firstDo: true,
                content() {
                    trigger.num--;
                },
                mark: true,
                intro: {
                    content: '摸牌量-1',
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (get.tag(card, 'draw')) return 0;
                        }
                    }
                }
            },
            plus: new toSkill('mark', {
                firstDo: true,
                content() {
                    trigger.num++;
                },
                intro: {
                    content: '摸牌量+1',
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (get.tag(card, 'draw')) return [1, 1];
                        }
                    }
                }
            }, 'forced', 'mark').setT('drawBegin'),
        }
    },
    banmao: {
        audio: 2,
        trigger: {
            player: 'damageEnd', source: 'damageEnd'
        },
        filter(Evt, player) {
            return Evt.source && Evt.card && get.name(Evt.card) == 'sha';
        },
        forced: true,
        content() {
            trigger.source.draw();
        },
        mod: {
            cardEnabled(card, player) {
                if (['shan', 'jiu'].includes(get.name(card)) && player.isHealthy() && player.$.banmao !== true) return false;
            },
            cardSavable(card, player) {
                if (['shan', 'jiu'].includes(get.name(card)) && player.isHealthy() && player.$.banmao !== true) return false;
            }
        },
        derivation: 'banmao_rewrite',
    },
    //Froot
    exiao: {
        trigger: { player: 'useCard' },
        frequent: true,
        filter(Evt) {
            return get.type(Evt.card) == 'trick';
        },
        content: [() => {
            player.judge(card => {
                if (get.color(card) == 'black') return 4;
                return -1;
            });
        }, () => {
            if (result.judge > 0) {
                trigger.nowuxie = true;
                game.delayx();
                if (get.position(result.card) == 'd') player.gain(result.card, 'gain2', 'log');
            }
        }],
    },
    jinmei: {
        audio: 2,
        trigger: { global: 'phaseBegin' },
        round: 1,
        priority: 996,
        filter(Evt, player) {
            return Evt.player != player && player.countCards('he', { color: 'black' });
        },
        direct: true,
        content: [() => {
            Evt.target = trigger.player;
            let goon = get.$a(player, Evt.target) < 0 && !Evt.target.hasJudge('lebu') && !Evt.target.hasJudge('bingliang');
            let next = player.chooseCard(get.$pro2('jinmei'), 'he', { color: 'black' }).set('goon', goon).set('ai', card => {
                if (!goon) return 0;
                return 5 - get.value(card);
            });
        }, () => {
            if (result.bool) {
                player.logSkill('jinmei', Evt.target);
                Evt.target.gain(result.cards, player, 'giveAuto');
                Evt.target.addTempSkill('jinmei_drop')
            }
        }],
        ai: {
            expose: 0.1,
        },
        subSkill: {
            drop: new toSkill('mark', {
                firstDo: true,
                content() {
                    trigger.num--;
                },
                intro: {
                    content: '摸牌量-1',
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (get.tag(card, 'draw')) return 0;
                        }
                    }
                }
            }, 'forced', 'mark').setT('drawBegin'),
        }
    },
    //Veibae
    zhexun: {
        group: 'zhexun0',
        audio: 3,
    },
    zhexun0: {
        trigger: { player: 'useCard2' },
        frequent: true,
        filter(Evt, player) {
            let card = Evt.card;
            let info = get.info(card);
            if (info.allowMultiple == false) return false;
            let history = player.getHistory('useCard', evt => get.color(Evt.card) == get.color(evt.card)).length;
            return history > 1 && history == player.getHistory('useCard').length;
        },
        content: [() => {
            trigger.directHit.addArray(game.players);
        }, () => {
            if (get.type2(trigger.card) != 'equip') {
                let prompt2 = `为${get.$t(trigger.card)}额外指定一个目标`;
                player.chooseTarget(get.$pro(Evt.name), function (card, player, target) {
                    if (_status.event.targets.includes(target)) return false;
                    return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
                }).set('prompt2', prompt2).set('ai', function (target) {
                    let player = _status.event.player;
                    return get.effect(target, _status.event.card, player, player);
                }).set('targets', trigger.targets).set('card', trigger.card);
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                player.line(result.targets);
                game.log(result.targets, '成为了', trigger.card, '的额外目标');
                trigger.targets.addArray(result.targets);
            }
        }],
    },
    yuci: {
        audio: 2,
        trigger: {
            player: 'drawBegin'
        },
        forced: true,
        firstDo: true,
        filter(Evt, player) {
            if (player.hasSkill('yuci_used')) return false;
            let another = player.next;
            let sex = false;
            while (another != player) {
                if (sex != false && another.sex != sex) return false;
                sex = another.sex;
                another = another.next;
            }
            return true;
        },
        content() {
            trigger.num++;
            player.addTempSkill('yuci_used', 'phaseNext');
        },
        subSkill: {
            used: {}
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'draw') && !target.hasSkill('yuci_used')) return [1, 1];
                }
            }
        }
    },
    //Melody
    kuangbiao: new toSkill('active', {
        intro: {
            mark(dialog, storage, player) {
                if (player.countCards('s', card => card.hasGaintag('kuangbiao')))
                    dialog.addAuto(player.getCards('s', card => card.hasGaintag('kuangbiao')));
            },
            markcount(storage, player) {
                return player.countCards('s', card => card.hasGaintag('kuangbiao'));
            },
            onunmark(storage, player) {
                let cards = player.getCards('s', card => card.hasGaintag('kuangbiao'));
                if (cards.length) {
                    player.lose(cards, ui.discardPile);
                    player.$throw(cards, 1000);
                    game.log(cards, '进入了弃牌堆');
                }
            },
        },
        cardAround(player) {
            return player.getCards('s', card => card.hasGaintag('kuangbiao'));
        },
        viewAs: { name: 'wuzhong' },
        position: 'h',
        filterCard: { suit: 'heart' },
        check(card) {
            if (_status.event.player.hp === 1) return 0;
            return 5 - get.value(card);
        },
        ai: {
            effect: {
                player(card, player, target) {
                    if (get.suit(card) === 'heart' && get.type(card) === 'trick') {
                        if (player.hp === 1) return [0, -6, 1, 0]
                        return [1, (player.hp - 3) * 2, 1, 0];
                    }
                }
            }
        },
        group: 'kuangbiao_useTrick',
        subSkill: {
            useTrick: new toSkill('trigger', {
                trigger: { player: 'useCardAfter' },
                filter(Evt, player) {
                    return get.suit(Evt.card) === 'heart' && get.type(Evt.card) === 'trick';
                },
                content: [() => {
                    player.loseHp();
                }, () => {
                    player.directgains(trigger.cards, null, 'kuangbiao');
                    player.markSkill('kuangbiao');
                }],
            }, 'forced')
        }
    }),
    leizhu: {
        trigger: { player: 'useCard2' },
        filter(Evt, player) {
            return get.type2(Evt.card) == 'trick';
        },
        direct: true,
        intro: {
            name2: 'R18',
            content: 'mark',
        },
        content: [() => {
            player.addMark('leizhu', 1, false);
            if (player.countMark('leizhu') == 3) {
                player.removeMark('leizhu', 3, false);
                let card = trigger.card;
                let info = get.info(card);
                if (info.allowMultiple == false || !trigger.targets
                    || !game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(card, player, cur))) Evt.finish();
            } else Evt.finish();
        }, () => {
            let prompt2 = `为${get.$t(trigger.card)}增加一个目标`;
            player.chooseTarget(get.$pro(Evt.name), function (card, player, target) {
                if (_status.event.targets.includes(target)) return false;
                return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
            }).set('prompt2', prompt2).set('ai', function (target) {
                let trigger = _status.event.getTrigger();
                let player = _status.event.player;
                if (player.hp == 1) return false;
                return get.effect(target, trigger.card, player, player) + get.damageEffect(target, player, player);
            }).set('targets', trigger.targets).set('card', trigger.card);
        }, () => {
            if (result.bool) {
                if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
                Evt.targets = result.targets;
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.targets) {
                player.logSkill('leizhu', Evt.targets);
                trigger.targets.addArray(Evt.targets);
                player.damage('nocard');
                Evt.targets[0].damage('nocard');
            }
        }],
    },
    tonggan: {
        unique: true,
        trigger: {
            global: 'drawBegin'
        },
        zhuSkill: true,
        forced: true,
        firstDo: true,
        filter(Evt, player) {
            if (!player.hasZhuSkill('tonggan')) return false;
            if (player.hasSkill('tonggan_used')) return false;
            return Evt.player.group && Evt.player.group == player.group;
        },
        logTarget: 'player',
        content() {
            Evt.target = trigger.player;
            Evt.target.addTempSkill('tonggan_used', 'phaseNext');
            if (game.roundNumber % 2 == 1) return trigger.num--;
            if (game.roundNumber % 2 != 1) return trigger.num++;
        },
        subSkill: {
            used: {}
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'draw') && !target.hasSkill('tonggan_used')) {
                        if (game.roundNumber % 2 == 1) return [0.2, 0];
                        if (game.roundNumber % 2 != 1) return [1, 2];
                    }
                }
            }
        }
    },
    //Silvervale
    yingling: new toSkill('trigger', {
        filter(Evt, player) {
            return !player.hasSkill('yingling_used');
        },
        content() {
            player.addTempSkill('yingling_used', 'phaseNext');
            player.judge(card => {
                if (get.color(card) === 'red') return 1
                return 0
            }).callback = lib.skill.yingling.callback;
        },
        callback() {
            let evt = _status.event.getParent('yingling');
            if (Evt.judgeResult.color == 'red') {
                evt.getTrigger().num++
            }
        },
        subSkill: { used: new toSkill('mark') },
        ai: {
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'draw') && !target.hasSkill('yingling_used')) return [1, 0.5];
                }
            }
        }
    }, 'forced', 'firstDo').setT('drawBegin'),
    duchun: new toSkill('trigger', {
        filter(Evt, player) {
            return get.position(Evt.result.card, true) == 'o';
        },
        content: [() => {
            Evt.card = trigger.result.card
            player.chooseTarget(get.$pro2('duchun'), function (card, player, target) {
                return true
            }).set('ai', target => {
                let { player, card } = _status.event.getParent()
                return get.$a(player, target) * (get.value(card, 'raw', target) + (target.$.duchun_drop > 1 ? 1 : -2))
            })
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('duchun', Evt.target)
                Evt.target.gain(Evt.card, 'gain2')
                if (!Evt.target.$.duchun_drop) {
                    Evt.target.$.duchun_drop = 1
                    Evt.target.addSkill('duchun_drop')
                }
                else {
                    Evt.target.$.duchun_drop++
                    Evt.target.markSkill('duchun_drop')
                }
            }
        }],
        subSkill: {
            drop: new toSkill('mark', {
                content() {
                    trigger.num -= player.$.duchun_drop
                    // player.unmarkSkill('duchun_drop')
                    player.removeSkill('duchun_drop')
                },
                intro: {
                    content: '摸牌量-#',
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (get.tag(card, 'draw')) return 0;
                        }
                    }
                }
            }, 'mark', 'onremove', 'forced', 'firstDo').setT('drawBefore'),
        }
    }, 'direct').setT('judgeEnd'),
    //耳朵
    jiace: {
        trigger: { target: 'useCardToTarget' },
        filter(Evt, player) {
            if (!Evt.targets || !Evt.targets.includes(player)) return false;
            if (Evt.player == player) return false;
            let info = get.info(Evt.card);
            if (info.allowMultiple == false || info.multitarget) return false;
            if (get.color(Evt.card) != 'black') return false;
            if (Evt.targets.length >= 1) return true;
        },
        direct: true,
        content: [() => {
            Evt.target = trigger.player;
            player.chooseCard('h', get.$pro2('jiace'), { suit: get.suit(trigger.card) }).ai = get.unuseful2;
        }, () => {
            if (result.bool) {
                player.logSkill('jiace', Evt.target);
                player.give(result.cards, Evt.target, true);
                if (!player.hasSkill('jiace_used')) {
                    let evt = trigger.getParent()
                    evt.addedSkill ??= [];
                    evt.addedSkill.add('jiace');
                }
            } else {
                Evt.finish();
            }
        }, () => {
            player.addTempSkill('jiace_used')
            let prompt2 = `为${get.$t(trigger.card)}增加或减少一个目标`;
            player.chooseTarget(get.$pro('jiace'), function (card, player, target) {
                let source = _status.event.source;
                if (_status.event.targets.includes(target))
                    return true;
                return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
            }).set('prompt2', prompt2).set('ai', target => {
                let player = _status.event.player, source = _status.event.source;
                return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
            }).set('targets', trigger.targets).set('card', trigger.card).set('source', Evt.target);
        }, () => {
            if (result.bool) {
                if (!Evt.isMine() && !Evt.isOnline()) game.delayx();
                Evt.targets = result.targets;
            } else {
                Evt.finish();
            }
        }, () => {
            if (Evt.targets) {
                player.logSkill('jiace', Evt.targets);
                if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                else trigger.targets.addArray(Evt.targets);
            }
        }],
        group: ['jiace_gainBy'],
        subSkill: {
            used: {},
            gainBy: {
                trigger: { global: 'useCardAfter' },
                forced: true,
                filter(Evt, player) {
                    let cards = Evt.cards.filterInD();
                    return cards.length && Evt.addedSkill && Evt.addedSkill.includes('jiace');
                },
                content() {
                    let cards = trigger.cards.filterInD();
                    player.gain(cards, 'gain2');
                },
            },
        }
    },
    xiangying: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h', { color: 'red' });
        },
        filterCard(card, player) {
            return get.color(card) == 'red';
        },
        selectCard: [1, Infinity],
        position: 'he',
        filterTarget(card, player, target) {
            return target.countCards('h') < player.countCards('h');
        },
        discard: false,
        prepare: 'give2',
        content: [() => {
            target.gain(cards, player);
        }, () => {
            if (target.countCards('h') > player.countCards('h')) {
                target.showHandcards();
            } else {
                Evt.finish();
            }
        }, () => {
            let num = Math.abs(target.countCards('h', { color: 'red' }) - target.countCards('h', { color: 'black' }));
            player.draw(num);
        }],
        ai: {
            order: 10,
            result: {
                player(player, target) {
                    let num = ui.selected.cards.length * 2 + target.countCards('h');
                    if (num <= player.countCards('h')) return -1;
                    return Math.abs(num + target.countCards('h', { color: 'red' }) - target.countCards('h', { color: 'black' }));
                },
                target(player, target) {
                    if (target.hasSkillTag('nogain')) return 0;
                    return ui.selected.cards.length;
                }
            },
            threaten: 0.6
        }
    },
    //凤玲天天
    shengquan: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countCards('h')
        },
        content: [() => {
            player.chooseToDiscard([2, Infinity], 'h', get.$pro2('shengquan'))
                .set('complexCard', true)
                .set('filterCard', function (card, player) {
                    if (ui.selected.cards.length)
                        return get.color(card) == get.color(ui.selected.cards[0]);
                    return player.countCards('hes', { color: get.color(card) }) >= 2;
                })
                .set('ai', (card) => get.unuseful3(card))
        }, () => {
            if (result.bool && result.cards.length) {
                player.logSkill('shengquan', player)
                Evt.num = result.cards.length - 1
                player.recover(Evt.num)
            }
        }],
        ai: {
            maixie: true,
            skillTagFilter(player) {
                return player.countCards('h') > 1
            },
        }
    }, 'direct').setT('damageAfter'),
    yizhu: new toSkill('active', {
        position: 'h',
        filterTarget(card, player, target) {
            return target.countCards('h') >= 2 && target !== player;
        },
        content: [() => {
            player.loseHp()
        }, () => {
            player.gainPlayerCard(target, 'h', 2)
        }, () => {
            player.$.yizhu_giveBy = target
            player.addTempSkill('yizhu_giveBy', 'yizhuBefore')
        }],
        ai: {
            order: 10,
            result: {
                player(player, target) {
                    if (player.hp === 1) return 0
                    if (player.$.yizhu === target && get.$a(player, target) > 0) return -1
                    return player.hp - 2
                },
                target(player, target) {
                    if (player.hp === 1) return 0
                    if (player.$.yizhu === target) return -1
                    return 2;
                }
            },
            threaten: 0.6
        },
    }).set('usable', 1, 'subSkill', {
        giveBy: new toSkill('trigger', {
            filter(Evt, player) {
                return player.$.yizhu_giveBy?.isIn() && (Evt.cards2 || Evt.cards).filterInD('d').length
            },
            logTarget(Evt, player) {
                return player.$.yizhu_giveBy
            },
            content() {
                Evt.tar = player.$.yizhu_giveBy
                Evt.cards = (trigger.cards2 || trigger.cards).filterInD('d');
                Evt.tar.gain(Evt.cards, 'gain2')
            },
            mark: 'character',
            intro: {
                name: '译注',
                content: '令$获得自己的弃牌',
            },
        }, 'direct', 'locked', 'onremove').setT('discardEnd')
    }
    ),
    //萌实
    chengzhang: {
        audio: 3,
        trigger: {
            player: 'loseAfter',
            global: ['gainAfter', 'equipAfter', 'addJudgeAfter', 'loseAsyncAfter'],
        },
        filterTarget(card, player, target) {
            return target != player && target.isIn() && target.hasUseTarget(card);
        },
        filter(Evt, player) {
            let evt = Evt.getl(player);
            return evt?.es?.filter(card => get.position(card, true) == 'd'
                && game.hasPlayer(target => lib.skill.chengzhang.filterTarget)).length > 0;
        },
        frequent: true,
        content: [() => {
            Evt.cards = trigger.getl(player).es.filter(card => {
                return get.position(card, true) == 'd' && game.hasPlayer(target => lib.skill.chengzhang.filterTarget(card, player, target));
            });
            Evt.count = Evt.cards.length;
        }, () => {
            Evt.count--;
            player.chooseTarget(function (card, player, target) {
                return target != player && target.isIn() && target.hasUseTarget(_status.event.cardx);
            }, '选择一名角色使用' + get.$t(Evt.cards[Evt.count])).set('ai', (target) => get.$a(_status.event.player, target) * get.value(_status.event.cardx, target)).set('cardx', Evt.cards[Evt.count]);
        }, () => {
            if (result.bool && result.targets?.length) {
                let target = result.targets[0];
                player.line(target, 'green');
                if (target.hasUseTarget(Evt.cards[Evt.count])) target.chooseUseTarget(Evt.cards[Evt.count], true);
            }
        }, () => {
            if (Evt.count) Evt.goto(1);
        }],
    },
    mengdong: {
        audio: 3,
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = [];
        },
        trigger: { player: 'useCardToPlayered' },
        check: () => true,
        filter(Evt, player) {
            return !player.getStorage('mengdong').includes(Evt.target) && Evt.target.countCards('e') % 2 == 1;
        },
        frequent: true,
        logTarget: 'target',
        content() {
            player.$.mengdong.add(trigger.target);
            player.markSkill('mengdong');
            player.draw();
        },
        group: 'mengdong_clear',
        subSkill: {
            clear: {
                trigger: { global: 'phaseAfter' },
                priority: 23,
                filter(Evt, player) {
                    return player.$.mengdong && player.$.mengdong.length;
                },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    player.$.mengdong.length = 0;
                }
            }
        },
        ai: {
            result: {
                player: 1,
            },
            effect: {
                player(card, player, target, current) {
                    if (target && !player.getStorage('mengdong').includes(target) && target.countCards('e') % 2 == 1) return [1, 1];
                }
            }
        }
    },
    //夏实萌惠
    moemanyi: {
        locked: true,
        mod: {
            targetEnabled(card, player, target, now) {
                if (get.type(card) == 'delay') {
                    if (!game.countPlayer(cur => {
                        return cur.isIn() && cur !== target && cur.getAttackRange() > target.getAttackRange()
                    })) {
                        return false;
                    }
                }
                if (get.name(card) == 'sha' && get.color(card) == 'red') {
                    if (!game.countPlayer(cur => {
                        return cur.isIn() && cur !== target && cur.getAttackRange() < target.getAttackRange()
                    })) {
                        return false;
                    }
                }
            }
        },
    },
    cuchuan: new toSkill('trigger', {
        filter(Evt, player) {
            return !Evt.numFixed && game.hasPlayer(cur => player != cur && get.$dis(player, cur) <= 1);
        },
        check(Evt, player) {
            return game.countPlayer(cur => player != cur && get.$dis(player, cur) <= 1) >= 2;
        },
        logTarget(Evt, player) {
            return game.filterPlayer(cur => player != cur && get.$dis(player, cur) <= 1);
        },
        content: [() => {
            trigger.changeToZero();
            Evt.targets = game.filterPlayer(cur => player != cur && get.$dis(player, cur) <= 1);
        }, () => {
            game.asyncDraw(Evt.targets);
            game.delayx();
            Evt.num = 0;
        }, () => {
            game.delayx();
            player.gainPlayerCard(Evt.targets[Evt.num], 'he', true);
            Evt.num++;
        }, () => {
            if (Evt.targets[Evt.num]) Evt.goto(2);
        }],
    }).setT('phaseDrawBegin1'),
    //春猿火
    huoju: {
        trigger: { global: 'damageBegin' },
        forced: true,
        filter(Evt, player) {
            if (!Evt.source) return false;
            if (Evt.source == player || get.$dis(player, Evt.source, 'pure') == 1) {
                return !Evt.nature;
            }
        },
        content() {
            trigger.nature = 'fire';
        },
        group: 'huoju_turnOverBy',
        subSkill: {
            turnOverBy: {
                trigger: { player: 'damageAfter', source: 'damageAfter' },
                forced: true,
                filter(Evt, player) {
                    return Evt.nature == 'fire' && Evt.source && Evt.source.isIn()
                        && (Evt.source.isMinHp() || Evt.source.isMinHandcard());
                },
                content: [() => {
                    if (trigger.source.isMinHandcard()) {
                        trigger.source.turnOver();
                        trigger.source.draw();
                    }
                }, () => {
                    if (trigger.source.isMinHp()) {
                        trigger.source.turnOver();
                        trigger.source.recover();
                    }
                }],
            }
        }
    },
    zouyang: {
        trigger: { player: 'useCard2' },
        filter(Evt, player) {
            if (player.hasSkill('zouyang_used')) return false;
            let card = Evt.card, info = get.info(card);
            if (info.allowMultiple == false) return false;
            if (Evt.targets && Evt.targets.length == 1 && !info.multitarget) {
                if (game.hasPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1)) {
                    return true;
                }
            }
            return false;
        },
        logTarget(Evt, player) {
            return game.filterPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1);
        },
        check(Evt, player) {
            return game.hasPlayer(cur => !Evt.targets.includes(cur) && get.$dis(Evt.targets[0], cur, 'pure') == 1 && get.effect(cur, Evt.card, player, player) > 0);
        },
        content: [() => {
            Evt.draws = [];
            Evt.targets = game.filterPlayer(cur => !trigger.targets.includes(cur) && get.$dis(trigger.targets[0], cur, 'pure') == 1);
            for (let i of Evt.targets) {
                if (lib.filter.targetEnabled2(trigger.card, player, i)) {
                    if (Evt._zouyang_tmp && Evt._zouyang_tmp != 'target') Evt._zouyang_tmp = 'goon';
                    else Evt._zouyang_tmp = 'target';
                } else {
                    Evt.draws.add(i);
                    if (Evt._zouyang_tmp && Evt._zouyang_tmp != 'draw') Evt._zouyang_tmp = 'goon';
                    else Evt._zouyang_tmp = 'draw';
                }
            }
            Evt.targets.removeArray(Evt.draws);
        }, () => {
            if (Evt._zouyang_tmp != 'goon') {
                player.addTempSkill('zouyang_used');
            }
        }, () => {
            if (Evt.targets.length) {
                trigger.targets.addArray(Evt.targets);
            }
            if (Evt.draws.length) {
                game.asyncDraw(Evt.draws);
            }
        }],
        subSkill: {
            used: {
                mark: true,
                intro: {
                    content: '不能发动『奏扬』',
                },
            },
        }
    },
    //幸祜
    xiezhen: {
        trigger: { global: 'damageBegin' },
        filter(Evt, player) {
            return Evt.source != player && get.$dis(Evt.source, player) <= 1 && Evt.source.countDiscardableCards(player, 'he');
        },
        check(Evt, player) {
            return get.damageEffect(_status.event.player0, player, player) > 0;
        },
        content: [() => {
            Evt.forced = true;
            Evt.target = trigger.source;
            player.turnOver();
        }, () => {
            player.discardPlayerCard('he', Evt.target, Evt.forced, `『谐振』：弃置${get.$t(Evt.target)}的一张牌`).set('ai', (button) => {
                let player = _status.event.player;
                let num = 10;
                if (get.position(button.link) == 'e') {
                    if (get.damageEffect(_status.event.player0, player, player) > 0)
                        num += 6;
                    if (get.damageEffect(_status.event.player0, player, player) < 0)
                        num -= 6;
                }
                return num - get.value(button.link) * _status.event.att;
            }).set('logSkill', ['rejianchu', Evt.target]).set('player0', trigger.player).set('att', get.$a(player, Evt.target) / 2);
        }, () => {
            if (result.bool && result.links?.length) {
                if (get.type(result.links[0], null, result.links[0].original == 'h' ? Evt.target : false) == 'equip') {
                    Evt.forced = false;
                    trigger.num++;
                    game.delayx();
                    if (Evt.target.countDiscardableCards(player, 'he')) Evt.goto(1);
                }
            }
        }],
    },
    wenzhou: {
        trigger: { player: 'damageEnd', global: 'turnOverEnd' },
        filter(Evt, player) {
            if (Evt.name == 'damage') return Evt.num > 1 && Evt.source && Evt.source.isIn();
            return !Evt.player.isTurnedOver();
        },
        logTarget(Evt, player) {
            if (Evt.name == 'damage') return Evt.source;
            return Evt.player;
        },
        forced: true,
        content() {
            if (trigger.name == 'damage') trigger.source.turnOver();
            else trigger.player.draw();
        },
    },
    //猫雷NyaRu
    miaolu: {
        audio: 3,
        trigger: { global: 'dying' },
        filter(Evt, player) {
            return Evt.player.hp <= 0 && Evt.player.countCards('h') > 0;
        },
        direct: true,
        content() {
            "step 0"
            let check;
            if (trigger.player.isUnderControl(true, player) || get.$a(player, trigger.player) > 0) {
                check = trigger.player.hasCard(card => {
                    return get.type(card) != 'basic';
                });
            } else {
                check = trigger.player.hasCard(card => {
                    return get.type(card) == 'basic';
                });
            }
            player.discardPlayerCard(trigger.player, get.$pro('miaolu', trigger.player), 'h').set('ai', (button) => {
                if (!_status.event.check)
                    return 0;
                if (_status.event.target.isUnderControl(true, _status.event.player) || get.recoverEffect(_status.event.target, _status.event.player, _status.event.player) > 0) {
                    if (get.type(button.link) != 'basic') {
                        return 10 - get.value(button.link);
                    }
                    return 0;
                } else {
                    return Math.random();
                }
            }).set('check', check);
            "step 1"
            if (result.bool) {
                player.logSkill('miaolu', trigger.player);
                Evt.card = result.links[0];
                player.showCards([Evt.card], `${get.$t(player)}弃置的手牌`);
            } else {
                Evt.finish();
            }
            "step 2"
            if (get.type(Evt.card) != 'basic') {
                trigger.player.recover();
            } else {
                player.gain(Evt.card, 'gain2', 'log');
            }
        },
        ai: {
            threaten: 1.4
        }
    },
    benglei: {
        audio: 2,
        trigger: { player: 'damageEnd' },
        direct: true,
        filter(Evt, player) {
            return (Evt.num > 0);
        },
        content: [() => {
            Evt.count = trigger.num;
        }, () => {
            Evt.count--;
            player.chooseTarget(get.$pro2('benglei')).set('ai', (target) => {
                let player = _status.event.player;
                return get.damageEffect(target, player, player);
            });
        }, () => {
            if (result.bool && result.targets?.length) {
                player.logSkill('benglei', result.targets);
                Evt.target = result.targets[0];
                Evt.target.judge(card => {
                    if (get.suit(card) == 'spade') return -3;
                    if (get.suit(card) == 'club') return -2;
                    return 0;
                }).callback = lib.skill.benglei.callback;
            } else Evt.finish();
        }, () => {
            if (Evt.discardBy === true) {
                if (Evt.target.countDiscardableCards(player, 'he')) {
                    player.line(Evt.target);
                    player.discardPlayerCard('he', Evt.target, true);
                }
                if (Evt.redoBy) {
                    delete Evt.redoBy;
                } else if (Evt.discardBy) {
                    delete Evt.discardBy;
                }
                Evt.redo();
            }
        }, () => {
            if (Evt.count > 0) Evt.goto(1);
        }],
        callback: [() => {
            let evt = _status.event.getParent('benglei');
            Evt.Nyaru = evt.player;
            if (Evt.judgeResult.suit == 'spade') {
                let evt = _status.event.getParent('damage');
                if (evt?.name == 'damage' && evt.num) {
                    player.damage(evt.num, 'thunder', Evt.Nyaru, 'nocard');
                }
            } else if (Evt.judgeResult.suit == 'club') {
                evt.discardBy = true;
                evt.redoBy = true;
            } else if (Evt.judgeResult.color == 'red') {
                Evt.goto(2);
            }
        }, () => {
            game.delay(2);
            Evt.finish();
        }, () => {
            Evt.Nyaru.discardPlayerCard(player, get.$pro('miaolu', player), 'h').set('ai', (button) => {
                if (_status.event.target.isUnderControl(true, _status.event.player) || get.recoverEffect(_status.event.target, _status.event.player, _status.event.player) > 0) {
                    if (get.type(button.link) != 'basic') {
                        return 10 - get.value(button.link);
                    }
                    return 0;
                } else {
                    return Math.random();
                }
            });
        }, () => {
            if (result.bool) {
                Evt.Nyaru.logSkill('miaolu', player);
                Evt.card = result.links[0];
                Evt.Nyaru.showCards([Evt.card], `${get.$t(Evt.Nyaru)}弃置的手牌`);
            } else {
                Evt.finish();
            }
        }, () => {
            if (get.type(Evt.card) != 'basic') {
                player.recover();
            } else {
                Evt.Nyaru.gain(Evt.card, 'gain2', 'log');
            }
        }],
        ai: {
            maixie_defend: true,
            effect: {
                target(card, player, target) {
                    if (player.countCards('he') > 1 && get.tag(card, 'damage')) {
                        if (player.hasSkillTag('jueqing', false, target)) return [1, -1.5];
                        if (get.$a(target, player) < 0) return [1, 1];
                    }
                }
            }
        }
    },
    //琴吹梦
    xuanquan: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countDisabled() < 5;
        },
        chooseButton: {
            dialog(Evt, player) {
                return ui.create.dialog('###『选权』###' + lib.translate.xuanquan_info);
            },
            chooseControl(Evt, player) {
                let list = [];
                for (let i = 1; i < 6; i++) {
                    if (!player.isDisabled(i)) list.push('equip' + i);
                }
                list.push('cancel2');
                return list;
            },
            check(Evt, player) {
                for (let i = 5; i > 0; i--) {
                    if (player.isEmpty(i)) return ('equip' + i);
                }
                return 'cancel2';
            },
            backup(result) {
                let next = get.copy(lib.skill.xuanquanx);
                next.position = result.control;
                return next;
            },
        },
        group: ['xuanquan_record'],
        subSkill: {
            record: {
                trigger: { global: 'disableEquipAfter' },
                filter(Evt, player) {
                    return Evt.player != player;
                },
                forced: true,
                content() {
                    player.draw();
                },
            },
        },
        ai: {
            order: 1,
            result: {
                player(player) {
                    if (game.hasPlayer(target => {
                        if (player == target)
                            return false;
                        let hs = target.countCards('he');
                        return hs > 2 && get.$a(player, target) >= 0;
                    })) return 1;
                    return 0;
                },
            },
        },
    },
    xuanquanx: {
        content: [() => {
            player.disableEquip(lib.skill.xuanquan_backup.position);
        }, () => {
            if (player.isAlive() && game.hasPlayer(cur => cur != player && cur.countCards('he'))) {
                player.chooseTarget(true, '获得一名角色的一张牌并令其获得技能『选权』', function (card, player, target) {
                    if (player == target) return false;
                    return target.countGainableCards(player, 'he') > 0;
                }).set('ai', target => get.$a(_status.event.player, target) * (target.countCards('he') - 2));
            } else Evt.finish();
        }, () => {
            if (result.bool) {
                let target = result.targets[0];
                Evt.target = target;
                player.line(target);
                player.gainPlayerCard(target, 'he', true);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links?.length) {
                target = Evt.target;
                target.addSkill('xuanquan');
            }
        }],
    },
    rusu: {
        trigger: {
            player: ['loseAfter'],
            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter'],
        },
        direct: true,
        filter(Evt, player) {
            let evt = Evt.getl(player);
            return (evt?.es?.length && player.countCards('he', { type: 'equip' }))
                || (evt?.js?.length && player.countCards('he', { type: ['trick', 'delay'] }));
        },
        content: [() => {
            {
                let evt = trigger.getl(player);
                if (evt?.js?.length && player.countCards('he', { type: ['trick', 'delay'] })) {
                    player.chooseCardTarget({
                        filterCard: { type: ['trick', 'delay'] },
                        position: 'he',
                        filterTarget(card, player, target) {
                            return target.canAddToJudge(card);
                        },
                        ai1(card) {
                            return 7 - get.value(card);
                        },
                        ai2(target) {
                            return 1 - get.$a(_status.event.player, target);
                        },
                        prompt: `###${get.$pro('rusu')}###将一张锦囊牌置于选择目标的判定区`
                    })
                }
            }
        }, () => {
            if (result.bool && result.cards?.length && result.targets?.length) {
                player.logSkill('rusu', result.targets);
                let thisTarget = result.targets[0];
                let thisCard = result.cards[0];
                thisTarget.addToJudge(thisCard, player);
            }
        }, () => {
            let evt = trigger.getl(player);
            if (evt?.es?.length && player.countCards('he', { type: 'equip' })) {
                player.chooseCardTarget({
                    filterCard: { type: 'equip' },
                    position: 'he',
                    filterTarget(card, player, target) {
                        return target.isEmpty(get.subtype(card));
                    },
                    ai1(card) {
                        return 6 - get.value(card);
                    },
                    ai2(target) {
                        return get.$a(_status.event.player, target) - 3;
                    },
                    prompt: `###${get.$pro('rusu')}###将一张装备牌置于选择目标的装备区`
                })
            } else Evt.finish();
        }, () => {
            if (result.bool && result.cards?.length && result.targets?.length) {
                player.logSkill('rusu', result.targets);
                let thisTarget = result.targets[0];
                let thisCard = result.cards[0];
                thisTarget.equip(thisCard);
                Evt.target = thisTarget;
                if (thisTarget != player) {
                    player.$give(thisCard, thisTarget, false);
                }
            }
        }],
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (get.type(card) == 'delay' && target.countCards('he', { type: ['trick', 'delay'] })) return [1, 1];
                }
            },
        }
    },
    //海月シェル
    beike: new toSkill('trigger', {
        init(player, skill) {
            player.$[skill] ??= get.inpile('trick2')
            player.$.beike2 = []
        },
        filter(Evt, player) {
            return get.type2(Evt.card) === 'trick' && !player.$?.beike2?.includes(get.name(Evt.card))
        },
        onremove: ['beike', 'beike2'],
        content() {
            player.$.beike.remove(get.name(trigger.card))
            player.$.beike2.add(get.name(trigger.card))
            player.draw()
            player.markSkill('beike')
        },
        intro: {
            content: '本局游戏内尚未被使用的锦囊（原始牌堆）：<br>$'
        },
        group: 'beike_addDam',
        subSkill: {
            addDam: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.$.beike.length === 0;
                },
                logTarget: 'player',
                content() {
                    trigger.num++;
                }
            }, 'forced').setT({ source: 'damageBegin' }),
        }
    }, 'forced').setT({ global: 'useCard' }),
    wenda: new toSkill('regard', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = true;
        },
        filter(Evt, player) {
            return (player.$.wenda === true && player.countCards('hs', { type: 'equip' }))
                || (player.$.wenda === false && player.countCards('hs', { type: 'basic' }));
        },
        hiddenCard(player, name) {
            if (player.$.wenda === true && player.countCards('hs', { type: 'equip' })) {
                let list = get.inpile('trick2');
                return list.some(i => i === name);
            }
            else if (player.$.wenda === false && player.countCards('hs', { type: 'basic' })) {
                if ('wuxie' === name) return true
            }
        },
        chooseButton: {
            dialog(Evt, player) {
                let list = player.$.wenda ? get.inpile('trick2') : ['wuxie'];
                if (list.length == 0) {
                    return ui.create.dialog('『一问一答』已无可用牌');
                }
                return ui.create.dialog('『一问一答』', [list, 'vcard']);
            },
            filter(button, player) {
                return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
            },
            check(button) {
                let player = _status.event.player
                if (button.link[2] == 'wugu') return 0;
                let effect = player.getUseValue(button.link[2]);
                if (effect > 0) return effect;
                return 0;
            },
            backup(links, player) {
                return {
                    filterCard(card) {
                        return player.$.wenda ? get.type(card) === 'equip' : get.type(card) === 'basic'
                    },
                    selectCard: 1,
                    popname: true,
                    check(card) {
                        return 6 - get.value(card);
                    },
                    position: 'hs',
                    viewAs: { name: links[0][2] },
                    onuse(result, player) {
                        player.$.wenda = !player.$.wenda
                        player.updateMarks('wenda')
                    },
                };
            },
            prompt(links, player) {
                return `###『一问一答』###将一张牌当做【${get.$t(links[0][3]) || ''}${get.$t(links[0][2])}】使用`;
            }
        },
    }, 'enable:chooseToUse'),
    //羽澄照乌愈
    chenming: new toSkill('trigger', {
        filter(Evt, player) {
            return true
        },
        content: [() => {
            let list = trigger.stageList || lib.phaseName.slice(0);
            player.chooseButton([get.$pro2('chenming'), [list, 'vcard'], 'hidden'])
                .set('filterButton', function (button) {
                    return !['phaseDiscard', 'phaseDraw'].includes(button.link[2]);
                })
                .set('ai', button => button.link[2] === 'phaseJudge' ? 10 : 5);
        }, () => {
            if (result.links?.length) {
                player.logSkill('chenming')
                let stageList = (trigger.stageList || lib.phaseName).slice(0)
                stageList.splice(stageList.indexOf(result.links[0][2]), 1, 'phaseDraw')
                trigger.stageList = stageList;
                game.delay(1)
                if (result.links[0][2] === 'phaseUse') {
                    player.chooseUseTarget({ name: 'sha', isCard: false }, '『晨鸣』：使用一张【杀】', false);
                }
            }
        }],
    }, 'direct').setT('phaseBegin'),
    xiantong: new toSkill('trigger', {
        filter(Evt, player) {
            return player.countCards('he');
        },
        content: [() => {
            player.judge()
        }, () => {
            if (result.card && result.color) {
                Evt.card = result.card
                player.chooseToDiscard(`弃置颜色为${get.$t(result.color)}或类型为${get.$t(get.type2(Evt.card))}两张牌`, 'he', 2)
                    .set('filterCard', function (card, player) {
                        return get.color(card) === _status.event.color || get.type2(card) === _status.event.cardtype;
                    })
                    .set('ai', card => get.unuseful2(card))
                    .set('color', result.color)
                    .set('cardtype', get.type2(Evt.card))
            }
        }, () => {
            if (result.cards?.length) {
                trigger.num--
                trigger.addedSkill ??= []
                trigger.addedSkill.add('xiantong')
                trigger.addedSkill.add({ 'xiantong': Evt.card })
            }
        }],
        group: ['xiantong_gainBy'],
        subSkill: {
            gainBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.addedSkill?.includes('xiantong') && Evt.num > 0
                },
                content() {
                    for (let i of trigger.addedSkill) {
                        if (i instanceof Object && i.xiantong) {
                            player.gain(i.xiantong, 'gain2', 'log')
                        }
                    }
                }
            }, 'forced').setT('damageEnd'),
        }
    }).setT('damageBegin3'),
    //猫山苗
    moupi: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.player.countCards('he') && Evt.num > 0 && Evt.player !== player
        },
        getResult(cards, player): Array<[]> {
            let l = cards.length, all = Math.pow(l, 2), list = [];
            for (let i = 1; i < all; i++) {
                let array = [];
                for (let j = 0; j < l; j++) {
                    if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
                }
                let num = 0;
                for (let k of array) {
                    num += get.number(k);
                }
                if (num > 0 && num % 7 == 0) list.push(array);
            }
            if (list.length) {
                list.sort(function (a, b) {
                    if (a.length != b.length) return b.length - a.length;
                    return get.value(a, player) - get.value(b, player);
                });
                return list[0];
            }
            return list;
        },
        content: [() => {
            Evt.tar = trigger.player
            Evt.tar.chooseCard(get.prompt2('moupi', player), 'he', function () {
                return _status.event.getResult.length
            })
                .set('getResult', lib.skill.moupi.getResult(Evt.tar.getCards('he'), Evt.tar))
                .set('check', trigger.num > 2 || get.$a(player, target) > 0)
                .set('selectCard', function () {
                    let num = 0, uc = ui.selected.cards;
                    for (let i = 0; i < uc.length; i++) {
                        num += get.number(uc[i]);
                    }
                    if (num > 0 && num % 6 == 0) return [uc.length, uc.length + 1];
                    return uc.length + 2;
                })
                .set('ai', function (card) {
                    if (!_status.event.check) return -1
                    if (_status.event.getResult.includes(card)) return 1
                    return 0
                })
                .set('logSkill', ['moupi', player])
        }, () => {
            if (result.cards?.length) {
                let num = 0
                Evt.cards = result.cards.slice(0)
                player.$.moupi_drawBy ??= []
                player.$.moupi_drawBy.add(Evt.tar)
                Evt.tar.give(Evt.cards, player, true);
                for (let c of Evt.cards) {
                    num += get.number(c);
                }
                console.log(num)
                trigger.num -= (num / 6)
                game.delay(1)
            }
        }],
        group: 'moupi_drawBy',
        subSkill: {
            drawBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.$.moupi_drawBy?.length && !player.getHistory('sourceDamage').length
                },
                logTarget(Evt, player) {
                    return player.$.moupi_drawBy;
                },
                content() {
                    game.asyncDraw([...player.$.moupi_drawBy, player])
                }
            }, 'forced').setT({ global: 'phaseEnd' })
        }
    }, 'direct').setT({ source: 'damageBegin1' }),
    xuneng: new toSkill('trigger', {
        mod: {
            maxHandcard(player, num) {
                game.filterPlayer(cur => {
                    if (cur !== player) num += cur.countCards('h')
                })
                return num
            },
        },
        filter(Evt, player) {
            return get.tag(Evt.card, 'damage')
        },
        content: [() => {
            trigger.baseDamage = player.$.xuneng || 0
        }],
        intro: {
            content: '『蓄能』：牌堆洗切次数：#',
        },
        group: 'xuneng_mark',
        subSkill: {
            mark: new toSkill('trigger', {
                content: [() => {
                    player.$.xuneng = (player.$.xuneng || 0) + 1
                    player.syncStorage('xuneng');
                    player.markSkill('xuneng')
                }],
            }, 'forced').setT({ global: 'washCard' })
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (get.tag(card, 'damage')) return [player.$.xuneng || 0, -0.1];
                }
            }
        }
    }, 'forced').setT('useCard').setI(0),
    //eve.aic.
    Errorcode: new toSkill('mark', {
        intro: {
            content: '被标记为错误'
        },
    }, 'mark', 'locked'),
    yeze: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.num > 0
        },
        content: [() => {
            let list = ['控制'];
            if (game.countPlayer(cur => cur.countGainableCards(player, 'e'))) list.push('收容')
            if (game.countPlayer() >= 3) list.push('保护')
            Evt.maxNum = Math.min(trigger.num, list.length)
            Evt.videoId = lib.status.videoId++;
            game.broadcastAll(function (id, choicelist, maxNum) {
                let dialog = ui.create.dialog('『业则』：选择至多' + maxNum + '项');
                choicelist.forEach(element => {
                    dialog.add([element, 'vcard']);
                })
                dialog.videoId = id;
            }, Evt.videoId, [['控制'], ['收容'], ['保护']], Evt.maxNum)
            Evt.list = list
        }, () => {
            player.chooseButton([1, Evt.maxNum])
                .set('filterButton', function (button) {
                    return _status.event.list.includes(button.link[2])
                })
                .set('list', Evt.list)
                .set('dialog', Evt.videoId);
        }, () => {
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                Evt.choice = []
                result.links.forEach(element => {
                    Evt.choice.push(element[2])
                })
                trigger.num -= Evt.choice.length
            }
            else Evt.finish()
        }, () => {
            if (Evt.choice.length === 1) {
                player.addTempSkill('yeze_draw', 'none')
            }
        }, () => {
            if (Evt.choice.includes('控制')) {
                player.chooseTarget('『业则』：横置或重置一名角色', true)
                    .set('ai', (target) => get.effect(target, { name: 'tiesuo' }, _status.event.player, _status.event.player));
            }
            else Evt.goto(Evt.step + 2)
        }, () => {
            if (result.targets?.length) {
                let target = result.targets[0];
                player.logSkill('yeze', target);
                target.link();
            }
        }, () => {
            if (Evt.choice.includes('收容')) {
                player.chooseTarget(function (card, player, target) {
                    return target.countGainableCards(player, 'e');
                }, '『业则』：获得一名角色装备区的1张牌', true)
                    .set('ai', (target) => target === _status.event.player ? (2 * player.countCards('e', card => get.value(card) <= 0)) : (1 - get.$a2(target)));
            }
            else Evt.goto(Evt.step + 2)
        }, () => {
            if (result.targets?.length) {
                let target = result.targets[0];
                player.logSkill('yeze', target);
                player.$.yeze = target
                player.gainPlayerCard(target, 'e', true);
            }
        }, () => {
            if (Evt.choice.includes('保护')) {
                player.chooseTarget(2, function (card, player, target) {
                    return target !== player;
                }, '『业则』：令2名其他角色不能成为卡牌目标直到其回合开始', true)
                    .set('ai', (target) => 1 + get.$a2(target));
            }
            else Evt.finish()
        }, () => {
            if (result.targets?.length) {
                let targets = result.targets.slice(0);
                player.logSkill('yeze', targets);
                for (let v of targets) {
                    v.addTempSkill('yeze_put', { player: 'phaseBegin' })
                }
            }
        }],
        group: 'yeze_record',
        subSkill: {
            record: new toSkill('trigger', {
                filter(Evt, player) {
                    let evt = Evt.getParent('gainPlayerCard')
                    if (!evt) return false
                    return evt.name === 'gainPlayerCard' && evt.getParent().name === 'yeze'
                },
                content() {
                    trigger.gaintag.add('yeze');
                }
            }, 'direct', 'silent').setT('gainBegin'),
            put: new toSkill('mark', {
                locked: true,
                mark: true,
                intro: {
                    content: '不能成为卡牌目标'
                },
                mod: {
                    targetEnabled(card, player, target, now) {
                        if (card.name) return false
                    }
                },
            }),
            draw: new toSkill('trigger', {
                trigger: { player: 'phaseDrawBegin' },
                forced: true,
                mark: true,
                intro: {
                    content: '下个摸牌阶段摸牌数+1'
                },
                content: function () {
                    player.removeSkill('yeze_draw');
                    if (!trigger.numFixed) trigger.num += 1;
                },
            })
        }
    }, 'direct').setT('phaseDrawBegin1'),
    E8BFADE4BBA3: new toSkill('trigger', {
        nobracket: true,
        filter(Evt, player) {
            if (!player.$.yeze) return false
            return get.type(Evt.card) == 'equip'
                && get.subtype(Evt.card) == 'equip1'
                && Evt.targets.includes(player) && player.hasHistory('lose', evt => {
                    if (evt.getParent() != Evt) return false;
                    for (let i in evt.gaintag_map) {
                        if (evt.gaintag_map[i].includes('yeze')) return true;
                    }
                    return false;
                });
        },
        content: [() => {
            game.putBuff(player, 'yeze', '.player_buff', 'EveAic')
            player.chat('eve.aic.ver 1.0中的 0x1 Placement weapon 确认到未处理的异常。')
            game.delay(1.2)
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_nerf', 'EveAic')
            player.chat('写入位置 weapon bar 时发生访问冲突。')
            game.delay(1)
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_buff', 'EveAic')
            player.chat('原文件已存在。')
            game.delay(0.8)
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_nerf', 'EveAic')
            player.chat('执行中发生错误，尝试更新数据...')
            game.delay(2.2)
        }, () => {
            game.clearBuff(player, 'yeze')
            if (player.$.yeze.isIn()) {
                player.$.yeze.addMark('Errorcode')
            }
            game.putBuff(player, 'yeze', '.player_buff', 'EveAic')
            player.chat('已对每个错误文件夹进行标记。')
            game.delay(1.2)
            delete player.$.yeze
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_nerf', 'EveAic')
            player.chat('正在试图执行来自未知发布者的以下程序。')
            game.delay(1)
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_buff', 'EveAic')
            player.chat('C:\eve.aic\restart.exe 您想允许执行吗?', true)
            game.delay(0.8)
        }, () => {
            game.clearBuff(player, 'yeze')
            game.putBuff(player, 'yeze', '.player_nerf', 'EveAic')
            player.chooseControl('ok').set('dialog', ['C:\eve.aic\restart.exe 您想允许执行吗?'])
        }, () => {
            game.clearBuff(player, 'yeze')
            game.delay(1)
            player.reinit('EveAic', 'EveAicVer2', false)
            game.delay(2)
        }],
        ai: {
            combo: 'yeze'
        }
    }, 'forced', 'unique').setT('useCard1'),
    //eve.aic.ver2
    xieyan: new toSkill('trigger', {
        filter(Evt, player) {
            return (Evt?.cards?.filterInD('d').length) || game.countPlayer(cur => {
                return cur.countCards('e') === 0
                    || (lib.filter.targetEnabled2({ name: 'sha', nature: 'thunder' }, player, cur)
                        && !Evt.player.hasHistory('sourceDamage', evt => evt.player === cur))
            })
        },
        logTarget: 'player',
        content: [() => {
            Evt.target = trigger.player
            if (trigger.cards) {
                Evt.cards = trigger.cards.filterInD('d')
            }
            let list = [];
            if (Evt.cards?.length) list.push('将其弃置的1至3张牌交给该角色，你获得剩下的牌')
            if (game.countPlayer(cur => {
                return lib.filter.targetEnabled2({ name: 'sha', nature: 'thunder' }, player, cur)
                    && !Evt.target.hasHistory('sourceDamage', evt => evt.player === cur)
            })) list.push('视为对1至2名本回合内未受此角色伤害的其他角色使用一张雷【杀】')
            if (game.countPlayer(cur => !cur.countCards('e'))) list.push('将1名装备区域没有牌的角色翻面')
            Evt.maxNum = Math.min(trigger.num, list.length)
            player.chooseControl('dialogcontrol', list).set('ai', function () {
                return 1;
            })
                .set('prompt', '『协研』：选择一项')
                .set('addDialog', [Evt.cards || '无弃牌'])
            Evt.list = list
        }, () => {
            Evt.choice = result.control
            switch (Evt.choice) {
                case '将其弃置的1至3张牌交给该角色，你获得剩下的牌': {
                    player.chooseToMove(`『协研』：交给${get.translation(Evt.target)}1至3张牌`, true)
                        .set('list', [
                            ['获得牌', Evt.cards],
                            [`交给${get.translation(Evt.target)}`],
                        ])
                        .set('processAI', function (list) {
                            let cards = list[0][1].slice(0);
                            cards.sort(function (a, b) {
                                return get.value(a) - get.value(b);
                            });
                            return [cards.slice(_status.event.puts), cards.slice(0, _status.event.puts)];
                        })
                        .set('filterMove', function (from, to, moved) {
                            if (to == 1 && moved[1].length >= 3) return false;
                            return true;
                        })
                        .set('filterOk', function (moved) {
                            return moved[1].length >= 1 && moved[1].length <= 3;
                        })
                        .set('puts', get.$a(player, Evt.target) > 0 ? Math.min(Evt.cards.length, 3) : 1)
                } break;
                case '视为对1至2名本回合内未受此角色伤害的其他角色使用一张雷【杀】': {
                    player.chooseTarget(`『协研』：对1至2名本回合内未受此角色伤害的其他角色使用一张雷【杀】`, [1, 2], true, function (card, player, target) {
                        if (_status.event.source.hasHistory('sourceDamage', evt => evt.player === target)) return false
                        return player.canUse({ name: 'sha', nature: 'thunder' }, target, false);
                    })
                        .set('source', Evt.target)
                        .set('ai', function (target) {
                            return get.effect(target, { name: 'sha', nature: 'thunder' }, _status.event.player);
                        });
                } break;
                case '将1名装备区域没有牌的角色翻面': {
                    player.chooseTarget(`『协研』：将1名装备区域没有牌的角色翻面`, true, function (card, player, target) {
                        return target.countCards('e') === 0
                    })
                        .set('ai', function (target) {
                            return (target.isTurnedOver() ? 1 : -1) * get.$a2(target);
                        });
                } break;
            }
        }, () => {
            switch (Evt.choice) {
                case '将其弃置的1至3张牌交给该角色，你获得剩下的牌': {
                    if (result.bool && result.moved.length) {
                        player.gain(result.moved[0].slice(0), 'gain2')
                        player.line(Evt.target)
                        Evt.target.gain(result.moved[1].slice(0), 'gain2')
                    }
                } break;
                case '视为对1至2名本回合内未受此角色伤害的其他角色使用一张雷【杀】': {
                    if (result.targets.length) {
                        player.useCard({ name: 'sha', nature: 'thunder' }, result.targets, false)
                    }
                } break;
                case '将1名装备区域没有牌的角色翻面': {
                    if (result.targets.length) {
                        result.targets[0].turnOver()
                    }
                } break;
            }
            player.storage.xieyan = Evt.choice
        }],
        group: 'xieyan_record',
        subSkill: {
            record: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.storage.xieyan
                },
                content() {
                    player.storage.xieyan_record = player.storage.xieyan
                }
            }, 'direct', 'silent').setT('xieyanAfter'),
        }
    }, 'direct').setT({ global: 'phaseDiscardEnd' }),
    E59B9EE6BAAF: new toSkill('trigger', {
        nobracket: true,
        filter(Evt, player) {
            return player.storage.xieyan_record && player.storage.xieyan_record === player.storage.xieyan
        },
        content: [() => {
            game.putBuff(player, 'xieyan', '.player_buff', 'EveAicVer2')
            player.chat('针对eve.aic.ver2.0的访问申请被拒绝，重复的访问类型。')
            game.delay(1.2)
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_nerf', 'EveAicVer2')
            player.chat('正尝试针对历史版本进行数据交换。')
            game.delay(1)
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_buff', 'EveAicVer2')
            player.chat('交换完成。')
            game.delay(2)
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_nerf', 'EveAicVer2')
            player.chat('正在清理错误数据过多的文件夹...')
            game.delay(1)
        }, () => {
            game.filterPlayer(cur => {
                if (cur.countMark('Errorcode') >= cur.maxHp) {
                    player.line(cur)
                    cur.die()
                }
            })
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_buff', 'EveAicVer2')
            player.chat('正准备以历史版本启动系统...')
            game.delay(0.9)
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_nerf', 'EveAicVer2')
            player.chat('<Y/N>...[Y]', true)
            game.delay(0.8)
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.putBuff(player, 'xieyan', '.player_buff', 'EveAicVer2')
            player.chooseControl('ok').set('dialog', ['十分感谢您协助了本次计划的进行。'])
        }, () => {
            game.clearBuff(player, 'xieyan')
            game.delay(1)
            player.reinit('EveAicVer2', 'EveAic', false)
            game.delay(2)
        }],
        ai: {
            combo: 'xieyan'
        }
    }, 'forced', 'unique').setT('xieyanEnd'),

    //琥珀玲
    chunzhen: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.player !== player
        },
        logTarget: 'player',
        mod: {
            globalTo: function (from, to, dist) {
                if (from.$?.chunzhen_mark) return from.$.chunzhen_mark;
            },
        },
        content: [() => {
            Evt.tar = trigger.player
            player.addTempSkill('chunzhen_put')
            Evt.tar.addTempSkill('chunzhen_mark')
        }],
        subSkill: {
            put: new toSkill('trigger', {
                content: [() => {
                    if (Evt.triggername === 'chunzhen_markBegin') {
                        if (player.inRangeOf(trigger.player)) {
                            trigger.enablePut = true
                        }
                    }
                    else {
                        if (trigger.enablePut && !player.inRangeOf(trigger.player)) {
                            let gains = _status.discarded.filter(card => get.type(card) !== 'basic')
                            if (gains.length) {
                                player.logSkill('chunzhen')
                                player.gain(gains, 'log', 'gain2')
                            }
                        }
                    }
                }],
            }, 'direct').setT({ global: 'chunzhen_mark' }, ['Begin', 'End']),
            mark: new toSkill('mark', {
                content: [() => {
                    player.$.chunzhen_mark++
                    player.syncStorage('chunzhen_mark');
                    player.markSkill('chunzhen_mark')
                }],
                intro: {
                    content: '『纯真』：与琥珀玲的距离变为：#',
                }
            }, 'onremove', 'direct', 'mark').setT('useCard1').setI(1),
        }
    }, 'forced').setT({ global: 'phaseBegin' }),
    hupo: new toSkill('trigger', {
        filter(Evt, player) {
            return player.getDamagedHp() && player != Evt.player;
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) < 0;
        },
        round: 1,
        logTarget: 'player',
        content: [() => {
            Evt.tar = trigger.player
            Evt.tar.damage(player.getDamagedHp(), 'nofatal')
        }, () => {
            game.delayx()
            player.addTempSkill('hupo_put')
            Evt.tar.addTempSkill('hupo_mark')
        }],
        subSkill: {
            put: new toSkill('trigger', {
                filter(Evt, player) {
                    return Evt.player.hasSkill('hupo_mark') && !player.inRangeOf(Evt.player);
                },
                logTarget: 'player',
                content: [() => {
                    Evt.tar = trigger.player
                    Evt.tar.recover(player.getDamagedHp())
                    game.delayx()
                }],
            }, 'forced').setT({ global: 'phaseEnd' }),
            mark: new toSkill('mark', {
                intro: {
                    content: '『虎迫』：回合结束时回复体力',
                }
            }, 'mark'),
        }
    }).setT({ global: 'phaseUseBegin' }),
    //寝月ねろ
    peijiu: new toSkill('trigger', {
        filter(Evt, player) {
            return get.name(Evt.card) === 'sha'
        },
        check(Evt, player) {
            return get.$a(player, Evt.target) < 0;
        },
        logTarget: 'target',
        content: [() => {
            Evt.tar = trigger.target
            Evt.tar.damage('nofatal')
            game.delayx()
        }],
    }).setT('useCardToPlayered'),
    ransha: new toSkill('trigger', {
        filter(Evt, player) {
            return !Evt.numFixed && Evt.num > 0;
        },
        check(Evt, player) {
            return player.needsToDiscard() && player.countCards('h') >= 3;
        },
        logTarget: 'player',
        content: [() => {
            trigger.num--;
        }, () => {
            player.addTempSkill('miaolu')
            player.skip('phaseDiscard');
            game.log(player, '跳过了', '#g弃牌阶段');
            game.delayx()
        }],
        derivation: 'miaolu'
    }).setT('phaseDrawBegin2'),
    //hh
    jichu: new toSkill('trigger', {
        mod: {
            selectTarget(card, player, range) {
                if (range[1] == -1) return;
                let evt = player.getLastUsed();
                if (evt?.card && get.type2(evt.card) == 'trick' && !['delay', 'equip'].includes(get.type(card))) range[1] += 1;
            },
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player.isPhaseUsing()) {
                    let evt = player.getLastUsed();
                    let order = num;
                    if (evt?.card && get.type2(evt.card) == 'trick' && !['delay', 'equip'].includes(get.type(card))) {
                        order += 2;
                    }
                    if (evt?.card && get.suit(evt.card) == 'diamond') {
                        order += 2;
                    }
                    return order;
                }
            },
        },
        filter(Evt, player) {
            let evt = player.getLastUsed(1);
            if (!evt || !evt.card) return false;
            return get.suit(evt.card) == 'diamond' && !(Evt.result.bool == false || Evt.iswuxied);
        },
        content() {
            player.draw();
        },
    }, 'frequent').setT('useCardAfter'),
    mingshizhige: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.num > 0;
        },
        check(Evt, player) {
            return player.countCards('h', card => {
                return player.getUseValue(card) > 0;
            });
        },
        content: [() => {
            Evt.cards = player.getCards('h');
            let num = Evt.cards.length;
            player.lose(Evt.cards, ui.discardPile).set('visible', true);
            player.$throw(Evt.cards, 1000);
            game.log(player, '将', Evt.cards, '置入了弃牌堆');
            player.draw(num);
            game.delayx();
        }, () => {
            player.chooseCardButton(Evt.cards, '是否使用其中的一张？').set('filterButton', function (button) {
                return _status.event.player.hasUseTarget(button.link);
            }).set('ai', button => _status.event.player.getUseValue(button.link));
        }, () => {
            if (result.bool) {
                player.chooseUseTarget(true, result.links[0]);
            }
        }],
        ai: {
            maixie: true,
            skillTagFilter(player, tag, arg) {
                if (!player.countCards('h')) return false;
            },
        }
    }).setT('damageEnd'),
    //白玉
    meihua: new toSkill('trigger', {
        filter(Evt, player) {
            if (Evt.type == 'discard') return false;
            return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club').length > 0;
        },
        addDialog(Evt, player) {
            return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club');
        },
        check(Evt, player) {
            return Evt.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club' && get.value(card, player) > 3).length;
        },
        round: 1,
        content: [() => {
            let cards = trigger.cards.filter(card => get.position(card, true) == 'd' && get.suit(card) == 'club');
            if (cards.length == 1) {
                Evt.cards = cards;
            } else {
                player.chooseCardButton(cards, true).set('ai', (button) => get.value(button.link, _status.event.player) - 3);
            }
        }, () => {
            if (result.bool && result.links) {
                Evt.cards = result.links.slice(0);
            }
            player.gain(Evt.cards, 'log', 'gain2');
        }],
    }).setT({ global: ['loseAfter', 'cardsDiscardAfter'] }),
    shentian: new toSkill('active', {
        usable: 1,
        filterTarget(card, player, target) {
            return target.countCards('h') > 0;
        },
        content: [() => {
            player.viewHandcards(target);
        }, () => {
            player.judge();
        }, () => {
            let suit = result.suit;
            player.chooseButton([`请选择重铸${get.$t(target)}的手牌`, target.getCards('h')], [1, Infinity]).set('filterButton', function (button) {
                if (_status.event.suit == get.suit(button.link)) return false;
                for (let i = 0; i < ui.selected.buttons.length; i++) {
                    if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
                }
                return true;
            }).set('suit', suit).set('att', get.$a(player, target)).set('ai', (button) => {
                if (_status.event.att <= 0)
                    return get.value(button.link) - 4;
                return 4 - get.value(button.link);
            });
        }, () => {
            if (result.bool) {
                let cards = result.links;
                target.lose(cards, ui.discardPile).set('visible', true);
                target.$throw(cards, 1000);
                game.log(target, '将', cards, '置入了弃牌堆');
                target.draw(cards.length);
            }
        }],
        ai: {
            order: 6,
            result: {
                target(player, target) {
                    if (target.countCards('h') > 2) {
                        if (get.$a(player, target) > 0) return 1;
                        else return -1;
                    }
                    return -0.1;
                }
            }
        },
    }),
    //苏姐
    mishu: new toSkill('trigger', {
        filter(Evt, player) {
            if (Evt.player == player) return false;
            let cards = [];
            game.getGlobalHistory('cardMove', evt => {
                if (evt == Evt || (evt.name != 'lose' && evt.name != 'cardsDiscard')) return false;
                if (evt.name == 'lose' && evt.position != ui.discardPile) return false;
                cards.addArray(evt.cards)
            });
            return cards.length && _status.currentPhase.isIn();
        },
        content: [() => {
            let cards = _status.discarded.slice(0);
            Evt.discards = cards;
            let list: Dialogword = ['获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力', '令其获得本回合进入弃牌堆的一种类型的牌，且若这些牌点数之积大于13，对其造成1点伤害', '取消'];
            list.removeArray(player.$.mishu);
            if (list.length) {
                player.chooseControl('dialogcontrol', list).set('ai', function () {
                    let evt = _status.event.getParent();
                    let controls = _status.event.controls.slice(0);
                    if (evt.discards.length >= 4 && controls.includes('获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力')) return 0;
                    return _status.event.att;
                })
                    .set('check', (get.$a(player, _status.currentPhase) > 0) ? 0 : 1)
                    .set('prompt', get.$pro2('mishu'))
                    .set('addDialog', [cards]);
            } else Evt.finish();
        }, () => {
            if (result.control && result.control != '取消') {
                let prompt = result.control;
                Evt.target = _status.currentPhase;
                Evt.control = result.control;
                prompt.replace(/其/, get.$t(_status.currentPhase));
                let next = player.chooseCardButton(Evt.discards, prompt);
                if (Evt.control == '获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力') {
                    next.set('filterButton', function (button) {
                        for (let i = 0; i < ui.selected.buttons.length; i++) {
                            if (get.type2(ui.selected.buttons[i].link) == get.type2(button.link)) return false;
                        }
                        return true;
                    }).set('selectButton', function () {
                        let types = [];
                        for (let i of Evt.discards) {
                            types.add(get.type2(i))
                        }
                        return types.length;
                    }());
                } else {
                    next.set('filterButton', function (button) {
                        return true;
                    }).set('ai', function (button) {
                        let cards = [];
                        let type = get.type2(button.link);
                        let player = _status.event.player;
                        let target = _status.event.target;
                        cards.concat(_status.event.discards.filter(card => {
                            return type == get.type2(card);
                        }))
                        let eff = get.$a(player, target) * get.value(cards, target, 'raw');
                        let num = 1;
                        for (let i of cards) {
                            num *= get.number(i);
                        }
                        if (num > 13) eff += get.damageEffect(target, player, player);
                        return eff;
                    }).set('discards', Evt.discards).set('target', Evt.target);
                }
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.bool && result.links?.length) {
                player.$.mishu.add(Evt.control);
                if (Evt.control == '获得本回合进入弃牌堆的任意类型不同的牌，且若这些牌之和为质数，令其回复1点体力') {
                    let num = 0, count = 0, cards = result.links;
                    for (let i of cards) {
                        num += get.number(i);
                    }
                    for (let i = 1; i <= num; i++) {
                        if (num % i == 0) {
                            count++;
                        }
                    }
                    player.gain(cards, 'gain2', 'log');
                    if (count <= 2) Evt.target.recover();
                } else {
                    let num = 1;
                    let cards = Evt.discards.filter(card => {
                        return get.type2(result.links[0]) == get.type2(card);
                    });
                    for (let i of cards) {
                        num *= get.number(i);
                    }
                    Evt.target.gain(cards, 'gain2', 'log');
                    if (num > 13) Evt.target.damage('nocard');

                }
            }
        }],
        group: 'mishu_clear',
        subSkill: {
            clear: new toSkill('trigger', {
                firstDo: true,
                direct: true,
                filter(Evt, player) {
                    return player.$.mishu.length;
                },
                content() {
                    player.$.mishu = [];
                }
            }).setT({ global: 'roundStart' })
        }
    }).setT({ global: 'phaseEnd' }).setI([]),
    xingchen: new toSkill('trigger', {
        priority: 2,
        filter(Evt, player) {
            return true
        },
        content: [() => {
            player.draw(5);
        }, () => {
            player.chooseCard(5, 'he', '『未卜星辰』：选择放置到牌堆顶部的牌', true);
        }, () => {
            if (result.bool == true && result.cards != null) {
                Evt.cards = result.cards
            }
            if (Evt.cards.length > 0) {
                player.chooseButton(true, Evt.cards.length, ['『未卜星辰』：按顺序将卡牌置于牌堆顶（先选择的在上）', Evt.cards]).set('ai', function (button) {
                    let player = _status.event.player, now = _status.currentPhase, next = now.getNext();
                    let att = get.$a(player, next), card = button.link;
                    let judge = next.getCards('j')[ui.selected.buttons.length];
                    if (judge) {
                        return get.judge(judge)(card) * att;
                    }
                    return next.getUseValue(card) * att;
                });
            }
        }, () => {
            if (result.bool && result.links?.length) Evt.linkcards = result.links.slice(0);
            else Evt.finish();
            game.delay();
        }, () => {
            player.lose(Evt.linkcards, ui.special);
            game.delay();
        }, () => {
            let cards = Evt.linkcards;
            while (cards.length > 0) {
                ui.cardPile.insertBefore(cards.pop().fix(), ui.cardPile.firstChild);
                game.updateRoundNumber();
            }
        }],
        ai: {
            maixie: true,
            skillTagFilter(player, tag, arg) {
                if (!player.countCards('h')) return false;
            },
        }
    }).setT('damageAfter'),
    //谢拉
    minghuahongxiao: {
        trigger: { player: ['useCard', 'discardAfter'] },
        filter(Evt, player) {
            return (Evt.name == 'useCard' && player != _status.currentPhase && Evt.cards.length && Evt.cards.length)
                || (Evt.name == 'discard' && player == _status.currentPhase && Evt.cards.length);
        },
        check(Evt, player) {
            if (Evt.name == 'useCard' && player.isPhaseUsing() && player.countCards('h') && get.type2(Evt.card) == 'trick') return false;
            return true;
        },
        content: [() => {
            Evt.list = [];
            for (let i of trigger.cards) {
                Evt.list.add(get.type2(i));
            }
        }, () => {
            if (Evt.list.includes('basic')) player.addSkill('minghuahongxiao_change');
        }, () => {
            if (Evt.list.includes('trick')) {
                let evt = _status.event.getParent('phaseUse');
                if (evt?.name == 'phaseUse') {
                    evt.skipped = true;
                }
                player.chooseTarget('令一名没有手牌的角色摸两张牌', function (card, player, target) {
                    return target.countCards('h') == 0;
                });
            } else Evt.goto(4);
        }, () => {
            if (result.bool && result.targets?.length) {
                result.targets[0].draw(2);
            }
        }, () => {
            if (Evt.list.includes('equip')) player.recover();
        }],
        subSkill: {
            change: {
                trigger: { global: 'useCard2' },
                priority: 23,
                popup: false,
                direct: true,
                filter(Evt, player) {
                    let card = Evt.card;
                    let info = get.info(card);
                    if (info.allowMultiple == false) return false;
                    return Evt.targets && Evt.targets.length;
                },
                content: [() => {
                    if (['equip', 'delay'].includes(get.type(trigger.card))
                        || !game.hasPlayer(cur => !trigger.targets.includes(cur) && lib.filter.targetEnabled2(trigger.card, player, cur))) Evt.goto(4);
                }, () => {
                    let prompt2 = `为${get.$t(trigger.card)}增加一个目标`;
                    player.chooseTarget(get.$pro('minghuahongxiao_change'), function (card, player, target) {
                        let source = _status.event.source;
                        if (_status.event.targets.includes(target)) return false;
                        return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
                    }).set('prompt2', prompt2).set('ai', function (target) {
                        let player = _status.event.player;
                        let source = _status.event.source;
                        return get.effect(target, _status.event.card, source, player) * (_status.event.targets.includes(target) ? -1 : 1);
                    }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
                }, () => {
                    if (!Evt.isMine()) game.delayx();
                    Evt.targets = result.targets;
                }, () => {
                    if (Evt.targets) {
                        player.logSkill('minghuahongxiao_change', Evt.targets);
                        if (trigger.targets.includes(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                        else trigger.targets.addArray(Evt.targets);
                    }
                }, () => {
                    player.removeSkill('minghuahongxiao_change');
                }],
            }
        }
    },
    //恋乃夜舞
    shanying: new toSkill('active', {
        hiddenCard(player, name) {
            let usable = lib.skill.shanying.usable
            if (get.skillCount('shanying', player) < usable
                && player.$.counttrigger?.shanying < usable) {
                if (game.countPlayer(cur => cur.countCards())) return true;
            }
        },
        usable: 1,
        filter(Evt, player) {
            if (Evt._triggering?.triggername === 'chooseToUseBegin') {
                if (Evt.getParent().name === 'phaseUse' || Evt.responded) return false
            }
            return game.countPlayer(cur => {
                return cur.countCards()
            })
        },
        check(Evt, player) {
            return player.countCards('h', card => lib.filter.filterCard(card, player, Evt))
        },
        content: [() => {
            if (Evt.getParent().name === 'useSkill') {
                if (!player.$.counttrigger) {
                    player.$.counttrigger = {};
                }
                player.$.counttrigger.shanying = (player.$.counttrigger.shanying + 1) || 1
                Evt.filterEvent = Evt.getParent(2)
            }
            else {
                player.getStat('skill').shanying = (player.getStat('skill').shanying + 1) || 1
                Evt.filterEvent = trigger
            }
            player.chooseTarget(`『擅营』：选择一名角色，观看其手牌`, true)
                .set('filterTarget', function (card, player, target) {
                    return target.countCards()
                })
                .set('ai', function (target) {
                    if (target === player) return 1
                    if (target.countCards('h', card => lib.filter.filterCard(card, _status.event.player, _status.event.preEvent))) return 2 - get.$a2(target)
                })
                .set('preEvent', Evt.filterEvent)
        }, () => {
            if (result.bool && result.targets) {
                Evt.tar = result.targets[0]
                player.choosePlayerCard(`『擅营』：选择你可以使用的一张牌，使用之`, Evt.tar, 'h')
                    .set('visible', true)
                    .set('filterButton', function (button) {
                        return _status.event.preEvent.filterCard(button.link, _status.event.player, _status.event.preEvent)
                    })
                    .set('ai', function (button) {
                        return get.buttonValue(button) * (Math.abs(12 - get.$a2(_status.event.target)))
                    })
                    .set('preEvent', Evt.filterEvent)
            }
            else Evt.finish()
        }, () => {
            if (result.bool && result.links) {
                Evt.card = result.links[0]
                player.showCards(Evt.card, `『擅营』选择使用的一张牌`)
            }
            else Evt.finish()
        }, () => {
            if (Evt.getParent().name === 'trigger') {
                if (trigger.respondTo instanceof Array) {
                    trigger.untrigger();
                    trigger.set('responded', true);
                }
                trigger.result = { bool: true, card: Evt.card }
            }
            else if (player.hasUseTarget(Evt.card)) {
                player.chooseUseTarget(Evt.card, `视为使用一张${get.$t(Evt.card)}`, true)
            }
            game.delay(0.8)
        }, () => {
            let check1 = player.hasSkill('siqian')
                && game.countPlayer(cur => cur.countCards() - player.countCards() >= 4)
                && get.$a(Evt.tar, player) > 0 && player.hp >= 3
            let check2 = get.damageEffect(player, Evt.tar, Evt.tar) > 0 && (player.isMaxHandcard() || player.isDamaged())
            Evt.list = [`摸一张牌`, `对${get.$t(player)}造成一点伤害`, `取消`]
            Evt.tar.chooseControl('dialogcontrol', Evt.list, function () {
                return _status.event.check;
            })
                .set('check', (check1 || check2) ? 1 : 0)
                .set('prompt', '『擅营』：请选择一项')
        }, () => {
            switch (result.control) {
                case Evt.list[0]: {
                    Evt.tar.draw()
                    break;
                }
                case Evt.list[1]: {
                    Evt.tar.line(player)
                    player.damage(Evt.tar, 'nocard')
                    break;
                }
            }
        }],
        ai: {
            save: true,
            expose: 0.1,
            skillTagFilter(player, tag, arg) {
                if (tag === 'save') {
                    let usable = lib.skill.shanying.usable
                    if (get.skillCount('shanying', player) < usable
                        && player.$.counttrigger?.shanying < usable
                        && game.countPlayer(cur => cur.countCards()))
                        return false
                }
            },
        }
    }).setT('chooseToUseBegin'),
    siqian: new toSkill('trigger', {
        filter(Evt, player) {
            return game.countPlayer(cur => {
                return cur != player
            }) >= 2
        },
        content: [() => {
            player.chooseTarget(get.$pro2('siqian'), 2)
                .set('filterTarget', function (card, player, target) {
                    if (ui.selected.targets.length == 0) {
                        return target.countCards()
                    }
                    return true
                })
                .set('ai', function (target) {
                    let att = get.$a2(target);
                    if (ui.selected.targets.length == 0) {
                        if (target.isMaxHandcard()) {
                            return -2 * att;
                        }
                        else if (att < 0) {
                            return 1 - att;
                        }
                        return 0;
                    }
                    let hs = ui.selected.targets[0].getCards();
                    return -att * get.$a2(ui.selected.targets[0]) * Math.max(hs - target.countCards(), 1);
                })
                .set('complexTarget', true)
                .set('multitarget', true)
                .set('multiline', true)
                .set('targetprompt', ['交出牌', '收到牌']);
        }, () => {
            if (result.bool && result.targets) {
                Evt.targets = result.targets.slice(0)
                Evt.tar = Evt.targets[0]
                player.logSkill('siqian', Evt.targets)
                Evt.tar.give(Evt.tar.getCards(), Evt.targets[1])
                game.delayx();
            } else Evt.finish();
        }, () => {
            Evt.tar.gainPlayerCard(Math.ceil(Evt.targets[1].countCards() / 2), true, Evt.targets[1], 'h')
        }],
        ai: {
            maixie: true
        }
    }, 'direct').setT('damageEnd'),
    //永雏塔菲
    qianqi: new toSkill('trigger', {
        trigger: { global: 'phaseBegin' },
        filter(Evt, player) {
            return player.countCards('he') > player.$.qianqi || 1;
        },
        direct: true,
        content: [() => {
            player.chooseToDiscard(get.$pro2('qianqi', trigger.player), 'he', player.$.qianqi || 1).set('logSkill', ['qianqi', trigger.player]);
        }, () => {
            if (result.bool) {
                game.delayx();
                Evt.target = trigger.player;
                let list = (trigger.stageList || lib.phaseName).slice(0);
                for (let i = 0; i < list.length; i++) {
                    list[i] = ['', i + 1, list[i]];
                }
                player.chooseButton(['『迁奇』：选择两个阶段调换位置', true, [list, 'vcard'], 'hidden'], 2);
            } else Evt.finish();
        }, () => {
            if (result.bool && result.links) {
                let steps = result.links.slice(0), stageList = (trigger.stageList || lib.phaseName).slice(0);
                let index0 = steps[0][1] - 1, index1 = steps[1][1] - 1;
                [stageList[index0], stageList[index1]] = [stageList[index1], stageList[index0]];
                trigger.stageList = stageList;
            }
            player.$.qianqi++;
            player.addTempSkill('qianqi_clear');
            player.markSkill('qianqi');
        }],
        intro: {
            content: '『迁奇』发动次数：#',
        },
        subSkill: {
            clear: new toSkill('trigger', {
                trigger: { global: 'phaseEnd' },
                filter(Evt, player) {
                    return !game.countPlayer2(cur => cur.getHistory('damage').length);
                },
                forced: true,
                content: [() => {
                    player.$.qianqi = 0;
                    player.unmarkSkill('qianqi');
                    game.log(player, '重置了『迁奇』计数');
                    game.delay(0.5);
                }],
            })
        }
    }).setI(0),
    chutan: new toSkill('active', {
        filter(Evt, player) {
            return game.countPlayer(cur => {
                return cur != player && !player.getStorage('chutan').includes(cur)
            });
        },
        position: 'he',
        filterCard(card, player) {
            return true;
        },
        filterTarget(card, player, target) {
            return target != player && !player.getStorage('chutan').includes(target);
        },
        selectTarget: 1,
        check(card) {
            return 6 - get.value(card);
        },
        usable: 1,
        line: false,
        log: 'notarget',
        content: [() => {
            player.$.chutan.add(target);
            player.markSkill('chutan_next')
        }],
        ai: {
            order: 6,
            result: {
                player: 2,
                target: -0.2
            }
        },
        group: 'chutan_next',
        subSkill: {
            next: new toSkill('trigger', {
                intro: {
                    content(storage, player, skill) {
                        return '『雏探』标记了' + get.cnNumber(player.$.chutan.length) + '名角色'
                    }
                },
                priority: 23,
                filter(Evt, player) {
                    let chus = player.getStorage('chutan').slice(0);
                    if (!chus.includes(Evt.player)) return false;
                    chus.remove(Evt.player);
                    if (Evt.player.getHistory('useCard', evt => {
                        return evt.targets.filter(tar => chus.includes(tar)).length;
                    }).length > 0) {
                        return true
                    }
                },
                logTarget: 'player',
                content() {
                    let cards = [];
                    Evt.tar = trigger.player
                    Evt.tar.getHistory('useCard', evt => {
                        cards.addArray(evt.cards);
                    })
                    player.gain(cards, 'gain2', 'log');
                    player.$.chutan.remove(Evt.tar)
                    player.markSkill('chutan_next')
                },
            }, 'forced').setT({ global: 'phaseEnd' })
        }
    }).setI([]),
    //喵田弥夜
    maoxiao: new toSkill('trigger', {
        filter(Evt, player) {
            return player.isMaxHandcard()
        },
        content: [() => {
            if (!Evt.num) Evt.num = 0
            player.chooseToUse({
                prompt: `###${get.$pro('maoxiao')}###（已使用${Evt.num}张）`,
                addCount: false,
            })
        }, () => {
            if (result.bool) {
                Evt.num++
                if (Evt.num < 3) Evt.goto(0)
            }
        }, () => {
            game.delayx()
            switch (Evt.num) {
                case 1:
                    player.link(true)
                    game.delay(1)
                    player.damage('fire')
                    break;
                case 2:
                    player.recover()
                    break;
                case 3:
                    player.draw(2)
                    game.delay(1)
                    player.turnOver()
                    break;
            }
        }]
    }).setT({ global: 'phaseAfter' }),
    jianfa: new toSkill('active', {
        usable: 1,
        filter(Evt, player) {
            return game.countPlayer(cur => {
                if (cur.getEquip(1)) {
                    let dist = get.info(cur.getEquip(1)).distance
                    return dist.attackFrom <= -2
                }
            })
        },
        filterTarget(card, player, target) {
            if (!target.getEquip(1)) return false
            let dist = get.info(target.getEquip(1)).distance
            return dist.attackFrom <= -2
        },
        content: [() => {
            player.gain(target.getEquip(1), 'log')
            game.delayx()
        }]
    }),
    jijie: new toSkill('regard', {
        hiddenCard: function (player, name) {
            if (name == 'sha') return player.hasZhuSkill('jijie');
            return false;
        },
        enable: 'chooseToUse',
        usable: 1,
        filter(Evt, player) {
            if (!player.hasZhuSkill('jijie')) return false;
            return player.hasUseTarget('sha') && Evt.filterCard({ name: 'sha', isCard: true }, player, Evt);
        },
        viewAs: { name: 'sha' },
        log: false,
        filterCard: function () { return false },
        selectCard: -1,
        group: 'jijie_judge',
        subSkill: {
            judge: new toSkill('rule', {
                trigger: {
                    player: "useCardBefore",
                },
                filter(Evt, player) {
                    return Evt.skill == "jijie";
                },
                content: [() => {
                    player.logSkill('jijie', trigger.targets)
                    player.judge(card => {
                        if (get.color(card) == 'red') return 2;
                        return -1;
                    }).callback;
                }, () => {
                    if (result.color !== 'red') {
                        player.getStat('skill').jijie = (player.getStat('skill').jijie || 0) + 1
                        trigger.cancel();
                        if (trigger.name == 'useCard' && trigger.parent) trigger.parent.goto(0);
                    }
                }],
            }, 'direct', 'forced')
        }
    }, 'zhuSkill'),
    //桃井最中
    qutao: new toSkill('active', {
        usable: 1,
        viewAs: { name: 'shunshou' },
        selectCard: 2,
        complexCard: true,
        position: 'hes',
        filterCard(card: any) {
            if (ui.selected.cards.length) return get.color(card) != get.color(ui.selected.cards[0]);
            return true;
        },
        check(card: any) {
            if (ui.selected.cards.length && get.type2(card) === 'basic') return 8 - get.value(card);
            return 5 - get.value(card);
        },
        ai: {
            basic: {
                order: 5
            },
            result: { player: 1 },
        },
    }),
    daifei: new toSkill('trigger', {
        filter(Evt, player) {
            if (Evt.skill) return false
            return player.getHistory('lose', evt => {
                if (evt.cards && evt.cards.length) {
                    let evtG = evt.getParent();
                    return evtG && evtG.name === 'gain' && evtG.player !== player;
                }
            }).length;
        },
        content: [() => {
            game.delayx();
            player.insertPhase();
        }]
    }).setT({ global: 'phaseEnd' }),
    //闪光pika
    yikai: {
        enable: 'phaseUse',
        limited: true,
        filterTarget: true,
        content: [() => {
            player.awakenSkill('yikai');
            target.draw(2);
        }, () => {
            target.damage('thunder', 'nocard');
        }, () => {
            let list = [];
            let skills = target.getOriginalSkills();
            for (let i of skills) {
                if (lib.skill[i].limited) {
                    list.push(i);
                }
            }
            list.push('cancel2');
            if (list.length > 1) {
                player.chooseControl(list).set('prompt', '选择一个限定技：<br><ul><li>未发动~该限定技失效直到你的下个回合开始<li>已发动~此回合结束后视为该限定技未发动过</ul>');
            } else {
                Evt.finish();
            }
        }, () => {
            if (result.control !== 'cancel2') {
                if (target.awakenedSkills.includes(result.control)) {
                    target.$.yikai_restore = result.control;
                    target.addTempSkill('yikai_restore', 'phaseZhunbeiBegin');
                } else {
                    target.$.yikai_blocker = [result.control, player];
                    target.addTempSkill('yikai_blocker', 'none');
                }
            }
        }],
        subSkill: {
            restore: {
                mark: true,
                intro: {
                    content: '在回合结束后重置『$』',
                },
                trigger: { global: 'phaseAfter' },
                locked: true,
                silent: true,
                onremove: true,
                content() {
                    player.restoreSkill(player.$.yikai_restore);
                    player.removeSkill('yikai_restore')
                }
            },
            blocker: {
                mark: true,
                intro: {
                    content(storage, player, skill) {
                        let str = '';
                        let list = player.getSkills(null, null, false).filter(i => lib.skill.yikai_blocker.skillBlocker(i, player));
                        if (list.length) str += ('<li>失效技能：' + get.$t(list))
                        return str;
                    }
                },
                init(player, skill) {
                    player.addSkillBlocker(skill);
                },
                onremove(player, skill) {
                    delete player.$.yikai_blocker;
                    player.removeSkillBlocker(skill);
                },
                locked: true,
                skillBlocker(skill, player) {
                    return !lib.skill[skill].charlotte && player.getStorage('yikai_blocker')[0] == skill;
                },
                trigger: { global: 'phaseBegin' },
                filter(Evt, player) {
                    let pika = player.getStorage('yikai_blocker')[0];
                    return !pika || !pika.isIn() || pika == Evt.player;
                },
                content() {
                    player.removeSkill('yikai_blocker');
                },
            }
        },
        ai: {
            order: 4,
            damage: true,
            result: {
                target(player, target) {
                    if (target.hp > 1) {
                        let skills = target.getOriginalSkills();
                        for (let i of skills) {
                            if (lib.skill[i].limited && target.awakenedSkills.includes(i)) {
                                return 8;
                            }
                        }
                    }
                    if (target != player) return 0;
                    if (get.damageEffect(target, player, player) >= 0) return 10;
                    if (target.hp >= 1) return 5;
                }
            }
        }
    },
    pkyuanjun: {
        trigger: { player: 'damageEnd', source: 'damageEnd' },
        filter(Evt, player) {
            if (Evt.nature != 'thunder') return false;
            return Evt.source && Evt.source.isAlive() && Evt.player.isAlive();
        },
        usable: 1,
        logTarget(Evt, player) {
            return player == Evt.player ? Evt.source : Evt.player;
        },
        check(Evt, player) {
            let target = player == Evt.player ? Evt.source : Evt.player;
            if (target.countCards('h') >= player.countCards('h')) return true;
            if (target.countCards('h') - player.countCards('h') >= -1) return player.isDamaged();
        },
        content: [() => {
            Evt.target = player == trigger.player ? trigger.source : trigger.player;
            let num = Evt.target.countCards('h') - player.countCards('h');
            if (num > 0) {
                player.draw(num);
                Evt.finish();
            } else if (num < 0) {
                player.chooseToDiscard(-num, true);
            }
        }, () => {
            player.recover();
        }],
        ai: {
            result: {
                player: 1,
            }
        },
    },
    //咩栗
    qinhuo: {
        trigger: { global: 'useCardAfter' },
        direct: true,
        filter(Evt, player) {
            if (Evt.cards && get.name(Evt.card) == 'huogong'
                && !Evt.player.hasHistory('sourceDamage', evt => evt.getParent('useCard').name === 'useCard')) return true;
        },
        content: [() => {
            player.chooseTarget(function (card, player, target) {
                return target != _status.event.source;
            }).set('ai', (target) => {
                let att = get.$a(_status.event.player, target);
                if (target.hasSkillTag('nogain'))
                    att /= 10;
                if (target.hasJudge('lebu'))
                    att /= 2;
                return get.value(_status.event.cardx, target, 'raw') * att;
            }).set('cardx', trigger.cards).set('source', trigger.player).set('createDialog',
                [get.$pro('qinhuo'),
                    'small', get.skillInfoTranslation('qinhuo', player), '令一名角色获得这些牌',
                [trigger.cards, 'card']]);
        }, () => {
            if (result.bool) {
                let target = result.targets[0];
                player.logSkill('qinhuo', target);
                target.gain(trigger.cards, 'gain2');
            }
        }],
    },
    lvecao: {
        trigger: { player: 'damageEnd' },
        filter(Evt, player) {
            return player.hasUseTarget({ name: 'tiesuo' });
        },
        check(Evt, player) {
            return true;
        },
        frequent: true,
        content() {
            player.chooseUseTarget({ name: 'tiesuo' }, true).set('addedSkill', ['lvecao']);
        },
        group: 'lvecao_fadian',
        subSkill: {
            fadian: {
                trigger: { global: 'linkEnd' },
                filter(Evt, player) {
                    let evt = Evt.getParent('useCard');
                    if (evt.name === 'useCard' && evt.getParent('chooseUseTarget')?.addedSkill?.includes('lvecao')) {
                        return evt.card.name == 'tiesuo' && evt.player == player && !Evt.player.isLinked()
                            && Evt.player.countGainableCards(player, 'hej', card => {
                                if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
                                return true;
                            });
                    }
                },
                direct: true,
                content() {
                    Evt.tar = trigger.player
                    player.gainPlayerCard(trigger.player, 'hej', `###${get.prompt('lvecao')}###获得其区域内一张可见牌`).set('filterButton', function (button) {
                        if (get.position(button.link) != 'e' && get.position(button.link) != 'j' && !button.link.hasGaintag('ming_')) return false;
                        return true;
                    }).set('logSkill', ['lvecao', Evt.tar]);
                },
                ai: {
                    effect: {
                        player(card, player, target, current) {
                            if (_status.event.name == 'chooseUseTarget' && _status.event.addedSkill?.includes('lvecao')) {
                                if (card.name == 'tiesuo' && target && target.isLinked() && target.countCards('hej', card => {
                                    if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
                                    return true;
                                })) return [1, 2, 1, -1];
                            }
                        }
                    }
                },
            }
        }
    },
    yangxi: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he') > player.countCards('he', { type: ['trick', 'delay'] });
        },
        filterCard(card, player) {
            if (get.type2(card) == 'basic') return false;
            if (get.type(card) == 'delay') return player.canAddJudge(card);
            if (player.canAddJudge('lebu') && get.color(card) == 'red') return true
            if (player.canAddJudge('bingliang') && get.color(card) == 'black') return true
            return false;
        },
        filterTarget(card, player, target) {
            return true;
        },
        position: 'he',
        discard: false,
        lose: false,
        check(card) {
            let player = _status.event.player
            if (['shandian', 'fulei', 'haidi'].includes(get.name(card))) return 9 - get.value(card);
            if (get.color(card) == 'red' && !player.needsToDiscard()) return 6 - get.value(card);
            if (get.color(card) == 'black' && player.countCards('he') >= 3) return 5 - get.value(card);
            if (get.type(card) == 'delay') return 4 - get.value(card);
            return 3 - get.value(card);
        },
        content: [() => {
            player.$give(cards, player, false);
            if (get.type(cards[0]) == 'delay') player.addJudge(cards[0]);
            else if (get.color(cards[0]) == 'red' && player.canAddJudge('lebu')) player.addJudge({ name: 'lebu' }, cards);
            else if (get.color(cards[0]) == 'black' && player.canAddJudge('bingliang')) player.addJudge({ name: 'bingliang' }, cards);
        }, () => {
            target.damage('thunder', 'nocard');
        }],
        ai: {
            order: 2,
            result: {
                player(player, target) {
                    if (player.countCards('h', card => ['shandian', 'fulei', 'haidi'].includes(get.name(card)))) return 0;
                    return -1.5;
                },
                target(player, target) {
                    if (target.hasSkill('shenyou')) return 0;
                    if (target.hp == 1) return get.damageEffect(target, player, target) - 2;
                    return get.damageEffect(target, player, target);
                }
            }
        }
    },
    //呜米
    naisi: {
        trigger: { global: 'phaseEnd' },
        direct: true,
        init(player, skill) {
            player.$[skill] = 0;
        },
        filter(Evt, player) {
            return player.$.naisi;
        },
        content: [() => {
            if (player.$.naisi > 1) {
                player.chooseTarget(get.$pro2('naisi'), function (card, player, target) {
                    return true;
                }).set('ai', function (target) {
                    return get.damageEffect(target, _status.event.player, _status.event.player);
                });
            }
        }, () => {
            if (result.bool && result.targets?.length) {
                let target = result.targets[0];
                player.logSkill('naisi', target);
                target.damage(player.$.naisi);
            }
        }, () => {
            player.$.naisi = 0;
        }],
        group: 'naisi_recover',
        subSkill: {
            recover: {
                trigger: { player: 'recoverAfter' },
                direct: true,
                lastDo: true,
                forced: true,
                silent: true,
                content() {
                    player.$.naisi++;
                },
            }
        }
    },
    tuzai: {
        trigger: { source: 'damageEnd' },
        filter(Evt, player) {
            return Evt.player.countGainableCards(player, 'hej', card => {
                if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
                return true;
            });
        },
        check(Evt, player) {
            if (get.recoverEffect(Evt.player, player, player) > 0) return true;
            let att = get.$a(player, Evt.player);
            if (att > 0 && Evt.player.countCards('j')) return true;
            let cards = Evt.player.getGainableCards(player, 'he', card => get.position(card) == 'e' || card.hasGaintag('ming_'));
            for (let i of cards) {
                if (get.equipValue(i) >= 6) return true;
            }
            return false;
        },
        logTarget: 'player',
        content: [() => {
            player.gainPlayerCard(trigger.player, 'hej', '获得其区域内一张可见牌', true).set('filterButton', function (button) {
                if (get.position(button.link) != 'e' && get.position(button.link) != 'j' && !button.link.hasGaintag('ming_')) return false;
                return true;
            });
        }, () => {
            trigger.player.recover();
        }],
        effect: {
            player(cardx, player, target) {
                if (get.$a(player, target) > 0 && target.countGainableCards(player, 'hej', card => {
                    if (get.position(card) != 'e' && get.position(card) != 'j' && !card.hasGaintag('ming_')) return false;
                    return true;
                })) {
                    if (get.tag(cardx, 'damage') == 1) {
                        if (target.countGainableCards(player, 'j')) return [1, 1, 0, 2];
                        else return [1, 1, 0, -0.5];
                    }
                }
            }
        }
    },
    wuneng: {
        enable: 'phaseUse',
        filter(Evt, player) {
            return player.countCards('h', card => ['tao', 'taoyuan'].includes(card.name) && !card.hasGaintag('ming_'));
        },
        filterCard(card, player) {
            return ['tao', 'taoyuan'].includes(card.name) && !card.hasGaintag('ming_');
        },
        position: 'h',
        discard: false,
        lose: false,
        check(card) {
            return true;
        },
        content: [() => {
            player.showCards(cards, '『呜能』亮出手牌');
            player.addGaintag(cards, 'ming_wuneng');
            player.$give(cards, player, false);
            game.delayx();
        }, () => {
            player.draw();
        }],
        ai: {
            order: 10,
            result: {
                player: 1,
            }
        }
    },
    //林大力
    xilv: new toSkill('trigger', {
        trigger: { global: 'drawAfter' },
        filter(Evt, player) {
            if (Evt.player == player) return false;
            let name = lib.skill.yiqu.process(Evt), info = lib.skill[name];
            if (!info || info.equipSkill || info.ruleSkill) return false;
            return lib.translate[`${name}_info`] && player.countCards('h') > 0;
        },
        content: [() => {
            Evt.target = trigger.player;
            player.chooseCard('h', get.$pro2('xilv')).set('ai', card => {
                let target = _status.event.target;
                return get.$a2(target) * get.value(card, target, 'raw') + 1;
            }).set('target', Evt.target);
        }, () => {
            if (result.bool) {
                player.logSkill('xilv', Evt.target)
                Evt.target.gain(result.cards, player, 'giveAuto');
            } else Evt.finish();
        }, () => {
            let name = lib.skill.yiqu.process(trigger);
            Evt.list = [`将摸到的牌交给${get.$t(player)}`, `令${get.$t(player)}获得<div class="skill">${get.$t(name)}</div>`];
            if (!player.hasSkill(name)) {
                Evt.target.chooseControl('dialogcontrol', Evt.list, function () {
                    return _status.event.att;
                })
                    .set('att', get.$a(Evt.target, player) > 0 ? 1 : 0)
                    .set('prompt', '『习律』：请选择一项')
                    .set('addDialog', [trigger.result]);
            } else {
                Evt._result = { control: Evt.list[0] };
            }
        }, () => {
            switch (result.control) {
                case Evt.list[0]: {
                    player.gain(trigger.result, Evt.target, 'giveAuto');
                    break;
                }
                case Evt.list[1]: {
                    let name = lib.skill.yiqu.process(trigger);
                    player.flashAvatar('xilv', get.name(trigger.player));
                    player.addAdditionalSkill('xilv', name, true);
                    break;
                }
            }
        }],
        group: 'xilv_phaseEnd',
        subSkill: {
            phaseEnd: new toSkill('trigger', {
                trigger: { player: 'phaseEnd' },
                forced: true,
                filter(Evt, player) {
                    return player.additionalSkills['xilv'];
                },
                content() {
                    player.removeAdditionalSkill('xilv');
                }
            })
        }
    }, 'direct'),
    bana: new toSkill('trigger', {
        trigger: { global: 'changeHp' },
        filter(Evt, player) {
            return Evt.player.countCards('he') <= Evt.player.hp && Evt.player.hp <= game.countPlayer();
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0;
        },
        logTarget: 'player',
        content() {
            trigger.player.draw();
        },
        ai: {
            expose: 0.1,
        }
    }),
    //Kira
    weiguang: {
        intro: {
            content: '『微光』：$',
        },
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = null;
        },
        trigger: { player: 'phaseBegin' },
        filter(Evt, player) {
            return player.countCards('hs');
        },
        direct: true,
        content: [() => {
            player.chooseToUse({
                prompt: get.$pro2('weiguang'),
                addCount: false,
            });
        }, () => {
            if (result.card && get.type(result.card)) {
                if (!player.$.weiguang) player.$.weiguang = get.type(result.card);
                if (player.$.weiguang === get.type(result.card)) {
                    player.markSkill('weiguang');
                    player.draw();
                } else {
                    player.$.weiguang = true;
                }
            }
        }],
    },
    liangqin: {
        trigger: { player: 'dyingAfter' },
        unique: true,
        limited: true,
        priority: 100,
        check(Evt, player) {
            return true;
        },
        content: [() => {
            player.$.liangqin = true;
            player.awakenSkill('liangqin');
        }, () => {
            player.addSkill('liangqin_phaseBefore')
        }],
        subSkill: {
            phaseBefore: {
                mark: true,
                intro: {
                    content: '在下个回合内摸牌量上升',
                },
                trigger: {
                    player: 'phaseBefore'
                },
                forced: true,
                firstDo: true,
                content: [() => {
                    player.$.liangqin_drawPlus = 1;
                    player.addTempSkill('liangqin_drawPlus');
                }, () => {
                    player.removeSkill('liangqin_phaseBefore');
                }],
            },
            drawPlus: {
                trigger: {
                    player: 'drawBegin'
                },
                forced: true,
                firstDo: true,
                onremove: true,
                content() {
                    trigger.num += player.$.liangqin_drawPlus;
                    player.$.liangqin_drawPlus++;
                },
                mark: true,
                intro: {
                    content: '摸牌量+#',
                },
                ai: {
                    effect: {
                        target(card, player, target) {
                            if (get.tag(card, 'draw')) return [1, player.$.liangqin_drawPlus || 1];
                        }
                    }
                }
            }
        }
    },
    //李清歌
    tage: new toSkill('trigger', {
        firstDo: true,
        direct: true,
        filter(Evt, player) {
            if (Evt.player != _status.currentPhase) return false;
            let usable = player.getDamagedHp() + 1;
            if (player.$.tage >= usable) return false;
            let num = get.number(Evt.card);
            return typeof num == "number" && player.countCards('hs', card => [1, -1].includes(get.number(card) - num));
        },
        content: [() => {
            Evt.precard = trigger.cards.slice(0);
            let num = get.number(trigger.card);
            player.chooseToRespond('『踏歌』：是否打出一张牌替换' + get.$t(Evt.precard), function (card) {
                if (!get.number(card))
                    return false;
                let num = _status.event.num;
                return [1, -1].includes(get.number(card) - num);
            }).set('num', num).set('ai', card => {
                if (!_status.event.check) return 1 - get.value(card);
                return 7 - get.value(card);
            }).set('check', get.value(Evt.precard, player) > 1 || (player.getDamagedHp() >= 2));
        }, () => {
            if (result.bool && result.cards) {
                player.logSkill('tage');
                if (!player.$.tage) player.$.tage = 1;
                else player.$.tage++;
                player.markSkill('tage');
                Evt.cards = result.cards.slice(0);
                trigger.cards = Evt.cards;
                player.gain(Evt.precard, 'gain2', 'log');
            }
        }],
        intro: {
            content: '『踏歌』发动次数：#',
        },
        group: ['tage_drawBy', 'tage_clear'],
        subSkill: {
            drawBy: new toSkill('trigger', {
                filter(Evt, player) {
                    return player.$.tage > 0;
                },
                prompt2(Evt, player) {
                    let usable = player.getDamagedHp() + 1;
                    return `摸${get.cnNumber(usable)}张牌，并交给${get.$t(Evt.player)}至少一张牌`;
                },
                content: [() => {
                    let usable = player.getDamagedHp() + 1;
                    player.draw(usable);
                }, () => {
                    if (player.countCards('he') && trigger.player.isIn()) {
                        Evt.target = trigger.player;
                        player.chooseCard('he', true).set('ai', card => {
                            let player = _status.event.player, target = _status.event.target;
                            if (get.$a(player, target) > 0) return get.value(card, target) - get.value(card, player);
                            return get.value(card, player) - get.value(card, target);
                        }).set('target', Evt.target).set('prompt', `选择交给${get.$t(Evt.target)}的牌`)
                    } else Evt.finish();
                }, () => {
                    if (result.bool && result.cards) {
                        player.line(Evt.target);
                        player.give(result.cards, Evt.target, true);
                    }
                }]
            }).setT({ global: 'phaseEnd' }),
            clear: new toSkill('rule', {
                priority: 23,
                popup: false,
                content() {
                    player.$.tage = 0;
                    player.unmarkSkill('tage');
                }
            }, 'forced', 'silent').setT({ global: 'phaseAfter' })
        }
    }).setT({ global: 'useCardAfter' }).setI(0),
    //神宫司玉藻
    aowei: new toSkill('trigger', {
        trigger: { global: 'cardsDiscardAfter' },
        firstDo: true,
        direct: true,
        filter(Evt, player) {
            let evt = Evt.getParent();
            if (evt.name != 'orderingDiscard' || !evt.relatedEvent || evt.relatedEvent.player == player
                || !['useCard', 'respond'].includes(evt.relatedEvent.name) || get.name(evt.relatedEvent.card) != 'sha') return false;
            let cards = (Evt.cards2 || Evt.cards).filterInD('d');
            let precard = evt.relatedEvent.card;
            return cards.length > 0 && player.countCards('hs', card => get.suit(card) == get.suit(precard) || get.number(card) == get.number(precard));
        },
        content: [() => {
            let evt = trigger.getParent(), cards = (trigger.cards2 || trigger.cards).filterInD('d');
            let precard = evt.relatedEvent.card;
            Evt.precard = cards.slice(0);
            Evt.change = !precard.nature;

            player.chooseToRespond('『傲尾』：是否打出一张牌替换' + get.$t(Evt.precard), function (card) {
                if (!get.suit(card) && !get.number(card))
                    return false;
                let precard = _status.event.precard;
                return get.suit(card) == get.suit(precard)
                    || get.number(card) == get.number(precard);
            }).set('precard', precard).set('ai', card => {
                if (!_status.event.check) return 1 - get.value(card);
                return 7 - get.value(card);
            }).set('check', 1);
        }, () => {
            if (result.bool && result.cards) {
                player.logSkill('aowei');
                Evt.cards = result.cards.slice(0);
                trigger.cards = Evt.cards;
                trigger.getParent().relatedEvent.cards = Evt.cards;
                player.gain(Evt.precard, 'gain2', 'log');
            } else Evt.finish();
        }, () => {
            player.chooseTarget('『傲尾』：你可以' + (Evt.change ? '弃置一名角色一张牌' : '令一名角色回复一点体力')).set('ai', function (target) {
                let player = _status.event.player;
                if (_status.event.change) return 1 - get.$a(player, target);
                return get.recoverEffect(target, player, player);
            }).set('change', Evt.change);
        }, () => {
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                if (Evt.change) {
                    player.discardPlayerCard(Evt.target, true, 'he');
                } else {
                    Evt.target.recover();
                }
            }
        }],
    }),
    meizhan: {
        audio: true,
        zhuSkill: true,
        trigger: { global: 'gainAfter' },
        filter(Evt, player) {
            if (!player.hasZhuSkill('meizhan')) return false;
            if (Evt.getParent().name == 'draw') return false;
            return Evt.player.group == player.group;
        },
        direct: true,
        usable: 1,
        content: [() => {
            Evt.target = trigger.player;
            let check = get.$a(Evt.target, player) > 0;
            let next = Evt.target.chooseBool(get.$pro2('meizhan', player, Evt.target))
                .set('ai', () => {
                    if (!_status.event.check)
                        return 0;
                    return 1;
                })
                .set('check', check)
        }, () => {
            if (result.bool) {
                player.logSkill('meizhan', Evt.target);
                let draws = [Evt.target];
                draws.add(player);
                game.asyncDraw(draws);
            }
        }],
    },
    //伊莎贝拉·霍利
    ya: new toSkill('mark', {
        marktext: '芽',
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            let cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }, 'locked', 'notemp', 'cardAround').setI([]),
    youchu: new toSkill('trigger', {
        filter(Evt, player) {
            if (get.name(Evt.card) !== 'sha' && get.type(Evt.card) === 'basic') return false
            return Evt.target.inRangeOf(player) && ![player, Evt.target].includes(Evt.player) && Evt.targets.length == 1;
        },
        check(Evt, player) {
            if (get.name(Evt.card) == 'sha') return get.$a(player, Evt.target) > 0 && player.hp > 2
            return get.effect(player, Evt.card, Evt.player, player) >= get.effect(Evt.target, Evt.card, Evt.player, player);
        },
        logTarget: 'target',
        content: [() => {
            let evt = trigger.getParent();
            let pretarget = trigger.target
            evt.triggeredTargets2.remove(pretarget);
            evt.targets.remove(pretarget);
            evt.targets.push(player);
            evt.addedSkill ??= []
            evt.addedSkill.add('youchu')
        }],
        mod: {
            attackFrom(from, to, distance) {
                return distance - from.getStorage('ya').length;
            },
        },
        group: ['ya', 'youchu_addYa'],
        subSkill: {
            addYa: new toSkill('trigger', {
                filter(Evt, player) {
                    if (Evt.targets.includes(player) && Evt.addedSkill?.includes('youchu') && Evt.cards.length) {
                        return true
                        return !player.hasHistory('damage', evt => evt.getParent('useCard').name === 'useCard' && evt.getParent('useCard') === Evt)
                    }
                },
                content: [() => {
                    Evt.cards = trigger.cards
                    player.addToExpansion(Evt.cards, 'gain2').gaintag.add('ya');
                }],
            }, 'direct').setT({ global: 'useCardAfter' }),
        }
    }).setT({ global: 'useCardToTarget' }),
    yuanhua: new toSkill('trigger', {
        ai: {
            combo: 'youchu',
        },
        filter(Evt, player) {
            console.log(Evt.name)
            return player.countCards('hs') && player.getExpansions('ya').length;
        },
        content: [() => {
            Evt.yas = player.getExpansions('ya')
            player.chooseToRespond(`###${get.$t(trigger.name)}，${get.$pro('yuanhua')}###${get.skillInfoTranslation('yuanhua')}`, function (card) {
                if (!get.number(card))
                    return false;
                let yas = _status.event.yas;
                for (let v of yas) {
                    if ([1, -1].includes(get.number(card) - get.number(v))) return true
                }
            })
                .set('yas', Evt.yas)
                .set('ai', card => {
                    if (player.countCards('h') === 1 && get.position(card) === 'h') return 9 - get.value(card)
                    if (!_status.event.check) return 3 - get.value(card);
                    return 8 - get.value(card);
                })
                .set('check', Evt.yas.length === 1)
        }, () => {
            if (result.bool && result.cards) {
                player.logSkill('yuanhua');
                Evt.prenum = get.number(result.cards[0])
                game.delayx()
            }
            else Evt.finish()
        }, () => {
            player.chooseButton(['选择获得一张「芽」', Evt.yas], true)
                .set('filterButton', function (button) {
                    return [1, -1].includes(get.number(button.link) - _status.event.prenum)
                })
                .set('ai', (button) => get.value(button.link, player))
                .set('prenum', Evt.prenum);
        }, () => {
            if (result.bool && result.links) {
                Evt.ya = result.links[0]
                player.gain(Evt.ya, player, 'give', 'log', 'fromStorage');
            }
            else Evt.finish()
        }, () => {
            if (lib.filter.filterCard(Evt.ya, player)) {
                player.chooseToUse()
                    .set('filterCard', function (card) {
                        return card == _status.event.ya;
                    })
                    .set('ya', Evt.ya)
                    .set('prompt', `是否使用【${get.$t(Evt.ya)}】？`)
            }
        }],
        group: ['ya', 'yuanhua_drawBy'],
        subSkill: {
            drawBy: new toSkill('trigger', {
                trigger: {
                    player: 'loseAfter',
                },
                filter: function (Evt, player) {
                    if (player.countCards('h') && player.getExpansions('ya')) return false;
                    if (!player.countCards('h')) {
                        let evt = Evt.getParent('respond')
                        if (evt.name === 'respond') {
                            return evt.getParent('yuanhua').name === 'yuanhua'
                        }
                    }
                    if (!player.getExpansions('ya')) {
                        let evt = Evt.getParent('gain')
                        if (evt.name === 'gain') {
                            return evt.getParent('yuanhua').name === 'yuanhua'
                        }
                    }
                },
                content: function () {
                    player.draw(2);
                },
            }, 'direct')
        }
    }, 'direct').setT(['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'], 'Begin'),
    //吉诺儿kino
    xiandu: new toSkill('trigger', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        content() {
            player.$.xiandu++
            player.markSkill('xiandu')
            if (player.$.xiandu % 10 === 0) {
                player.logSkill('xiandu')
                player.draw(Math.min(player.$.xiandu / 10, 5))
            }
        },
        intro: {
            content: '本局游戏内累计使用了#张牌'
        }
    }, 'direct', 'locked').setT('useCard'),
    yexi: new toSkill('active', {
        filter(Evt, player) {
            return player.countCards('he');
        },
        filterTarget(card, player, target) {
            return target !== player && player.countDiscardableCards(target, 'he');
        },
        content: [() => {
            target.discardPlayerCard(player, 'he', true, `『椰熙』：请弃置${get.$t(player)}的一张牌`)
        }, () => {
            if (result?.cards?.length) {
                if (get.name(result.cards[0]) !== 'shan') {
                    Evt.shaUse = target.useCard({ name: 'sha' }, get.cards(), player, false)
                }
                else Evt.finish()
            }
            else Evt.finish()
        }, () => {
            player.gain(Evt.shaUse.cards, 'gain2', 'log')
            if (target.countCards('he')) {
                player.gainPlayerCard(target, 'he', `『椰熙』：请回收${get.$t(target)}的椰子壳🥥`)
            }
        }],
        ai: {
            order: 2,
            result: {
                player(player, target) {
                    if (player.hp === 1 || player.countCards('he', { type: 'equip' }) + player.countCards('h', 'sha') === 0) return -5
                    if (!player.needsToDiscard() || player.isEmpty(2)) return -2
                    if (!player.hasShan()) return -1
                    return 0
                },
                target(player, target) {
                    if (target.countCards('he', 'equip')) return -2
                    if (target.countCards('he') > 2) return -1
                    return 0
                }
            }
        }
    }),
    //唐九夏
    jiuxian: new toSkill('trigger', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = 0;
        },
        content: [() => {
            player.$.jiuxian++
            player.markSkill('jiuxian')
        }, () => {
            if (player.$.jiuxian % 9 === 0) {
                player.chooseTarget(get.$pro2('jiuxian'), [1, Math.min(player.$.jiuxian / 9, 3)])
                    .set('ai', tar => {
                        let player = _status.event.player, att = get.$a(player, tar)
                        if (ui.selected.targets.length) {
                            return att * get.$a(player, ui.selected.targets[0])
                        }
                        else {
                            if (att) return get.recoverEffect(tar, player, player)
                            else if (tar.hasSkillTag('maixie')) return -0.6 * att
                            else return -1.5 * att
                        }
                    })
                    .set('complexTarget', true)
            }
        }, () => {
            if (result.bool) {
                Evt.targets = result.targets.slice(0)
                for (let v of Evt.targets) {
                    v.classList.add('glow');
                }
                let check = get.$a(player, Evt.targets[0]) > 0
                player.chooseControl('cancel2', 'recover_hp', 'lose_hp', function () {
                    if (_status.event.check) return 1;
                    return 2;
                }).set('prompt', '令目标执行：').set('check', check);
            } else Evt.finish();
        }, () => {
            for (let v of Evt.targets) {
                v.classList.remove('glow');
            }
            switch (result.index) {
                case 0: {
                    Evt.goto(0);
                    break;
                }
                case 1: {
                    player.logSkill('jiuxian', Evt.targets)
                    for (let v of Evt.targets) {
                        v.recover()
                    }
                    break;
                }
                case 2: {
                    player.logSkill('jiuxian', Evt.target)
                    for (let v of Evt.targets) {
                        v.loseHp()
                    }
                    break;
                }
            }
        }],
        intro: {
            content: '本局游戏内累计使用了#张牌'
        },
        ai: {
            expose: 0.2
        }
    }, 'direct', 'locked').setT('useCard'),
    yujian: new toSkill('trigger', {
        init(player, skill) {
            if (!player.$[skill]) player.$[skill] = true;
        },
        filter(Evt, player) {
            if (get.type(Evt.card) === 'equip') {
                return (player.$.yujian === true && player === Evt.player)
                    || (player.$.yujian === false && player !== Evt.player);
            }
            return false;
        },
        content: [() => {
            if (player.$.yujian === true) {
                player.chooseTarget(get.$pro2('yujian', null, player), function (card, player, target) {
                    return player != target;
                }).set('ai', tar => {
                    let player = _status.event.player
                    return get.effect(tar, _status.event.card, player, player) + 0.1
                }).set('card', trigger.card)
            }
            else if (player.$.yujian === false) {
                player.chooseToDiscard(get.$pro2('yujian', null, player), 'he').set('ai', card => {
                    if (get.$a2(_status.event.target) > 0) return -1
                    return get.unuseful2(card)
                }).set('card', trigger.player)
            }
        }, () => {
            if (player.$.yujian === true && result?.targets?.length) {
                Evt.target = result.targets[0]
                player.logSkill('yujian', Evt.target)
                game.delay(1)
                player.draw()
                trigger.targets = [Evt.target]
            }
            else if (player.$.yujian === false) {
                Evt.target = trigger.player
                player.logSkill('yujian', Evt.target)
                game.delay(1)
                trigger.finish()
                player.gain(trigger.cards, 'gain2', 'log')
            } else Evt.finish();
        }, () => {
            player.$.yujian = !player.$.yujian
            player.updateMarks('yujian')
        }],
    }, 'direct').setT({ global: 'useCard2' }),
    yuenan: new toSkill('trigger', {
        filter(Evt, player) {
            return !Evt.numFixed;
        },
        check(Evt, player) {
            return true;
        },
        content: [() => {
            trigger.changeToZero();
        }, () => {
            let cards = Evt.cards = get.cards(5);
            game.cardsGotoOrdering(cards).relatedEvent = Evt.getParent();
            let dialog = ui.create.dialog('『月喃』使用一张牌', cards);
            _status.dieClose.push(dialog);
            dialog.videoId = lib.status.videoId++;
            game.addVideo('cardDialog', null, ['月喃', get.cardsInfo(cards), dialog.videoId]);
            Evt.getParent().preResult = dialog.videoId;
            game.broadcast(function (cards, id) {
                let dialog = ui.create.dialog('月喃', cards);
                _status.dieClose.push(dialog);
                dialog.videoId = id;
            }, cards, dialog.videoId);
            Evt.dialog = dialog;
            game.log(player, '亮出了', '#y牌堆顶的牌');
            player.chooseButton().set('dialog', dialog.videoId).set('filterButton', function (button) {
                let player = _status.event.player;
                return player.hasUseTarget(button.link)
            }).set('ai', button => {
                let player = _status.event.player;
                let effect = player.getUseValue(button.link);
                if (effect > 0) return effect;
                return 0;
            });
        }, () => {
            Evt.dialog.close();
            _status.dieClose.remove(Evt.dialog);
            game.broadcast(function (id) {
                let dialog = get.idDialog(id);
                if (dialog) {
                    dialog.close();
                    _status.dieClose.remove(dialog);
                }
            }, Evt.dialog.videoId);
            if (!result.links[0]) {
                Evt.goto(5)
            }
            else {
                player.chooseUseTarget(result.links[0], true, false);
                Evt.cards.remove(result.links[0]);
            }
        }, () => {
            if (Evt.cards.length == 0) {
                Evt.finish()
                return
            }
            let cards = Evt.cards
            let dialog = ui.create.dialog('『月喃』使用一张牌', cards);
            _status.dieClose.push(dialog);
            dialog.videoId = lib.status.videoId++;
            game.addVideo('cardDialog', null, ['月喃', get.cardsInfo(cards), dialog.videoId]);
            Evt.getParent().preResult = dialog.videoId;
            game.broadcast(function (cards, id) {
                let dialog = ui.create.dialog('月喃', cards);
                _status.dieClose.push(dialog);
                dialog.videoId = id;
            }, cards, dialog.videoId);
            Evt.dialog = dialog;
            game.log(player, '亮出了', '#y牌堆顶的牌');
            player.chooseButton().set('dialog', dialog.videoId).set('filterButton', function (button) {
                let player = _status.event.player;
                return player.hasUseTarget(button.link)
            }).set('ai', button => {
                let player = _status.event.player;
                let effect = player.getUseValue(button.link);
                if (effect > 0) return effect;
                return 0;
            });
        }, () => {
            if (!result.links[0]) {
                Evt.goto(5)
            }
            else {
                player.chooseUseTarget(result.links[0], true, false);
            }
        }, () => {
            Evt.dialog.close();
            _status.dieClose.remove(Evt.dialog);
            game.broadcast(function (id) {
                let dialog = get.idDialog(id);
                if (dialog) {
                    dialog.close();
                    _status.dieClose.remove(dialog);
                }
            }, Evt.dialog.videoId);
            if (Evt.cards.length == 0) {
                Evt.finish();
            }
        }],
    }).setT('phaseDrawBegin1'),
}