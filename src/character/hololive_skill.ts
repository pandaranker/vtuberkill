import { toSkill } from './skilltype'
let { game, ui, get, ai, lib, _status } = window.vkCore
let kuali = {
    contentx: [() => {
        var choice = 1;
        if (player.hp == 1 && game.hasPlayer(cur => {
            return cur.countCards('h') % player.countCards('h') == 0 && cur != player;
        })) choice = 0;
        player.chooseControlList(
            ['选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力',
                '摸体力为你整数倍的角色数的牌，然后失去1点体力'],
            function (Evt, player) {
                return _status.event.choice;
            }).set('choice', choice).set('prompt', get.prompt2(Evt.name));
    }, () => {
        if (result.index == 0) {
            player.chooseTarget('###『夸力满满』###选择任意名手牌数为你整数倍的角色，你弃置等量牌并回复等量体力', [1, Infinity], function (card, player, target) {
                if (target == player) return false;
                return target.countCards('h') % player.countCards('h') == 0;
            }).set('ai', function (target) {
                var player = _status.event.player;
                return ui.selected.targets.length < (player.maxHp - player.hp);
            })
        }
        if (result.index == 1) {
            Evt.goto(4)
        }
    }, () => {
        if (result.bool && result.targets?.length) {
            Evt.num = result.targets.length;
            player.chooseToDiscard(Evt.num, `弃置${get.cnNumber(Evt.num)}张牌并回复${get.cnNumber(Evt.num)}体力`, true, 'he').set('logSkill', 'kuali');
        }
    }, () => {
        player.recover(Evt.num);
        Evt.finish();
    }, () => {
        player.logSkill('kuali');
        Evt.num = game.countPlayer(cur => {
            return cur.hp % player.hp == 0;
        });
        player.draw(Evt.num);
    }, () => {
        player.loseHp();
    }],
}
export default {
    taiyangzhiyin: {
        audio: 2,
        trigger: { player: 'useCard2' },
        filter(Evt, player) {
            //console.log(player.$.onlink,Evt.card.cardid)
            return get.number(Evt.card) > 10 && (player.$.onlink == null || player.$.onlink.indexOf(Evt.card.cardid) == -1);
        },
        priority: 1,
        frequent: true,
        forced: false,
        content() {
            var info = get.info(trigger.card);
            var players = game.filterPlayer();
            if (player.$.onlink == null) {
                player.$.onlink = [];
            }//处理正处于连锁中的卡牌
            'step 0'
            Evt.Dvalue = Math.min(3, get.number(trigger.card) - 10);
            var list = [['无法响应'], ['额外目标'], ['摸一张牌']];
            if (!game.hasPlayer(cur => {
                return lib.filter.targetEnabled2(trigger.card, player, cur)
                    && player.inRange(cur)
                    && !trigger.targets.contains(cur)
                    //&& (player.canUse(trigger.card, cur)||cur.canUse(trigger.card, cur))
                    && (get.type(trigger.card) != 'equip' && get.type(trigger.card) != 'delay')
            })) {
                list.splice(1, 1);
                if (Evt.Dvalue == 3) {
                    Evt.Dvalue = 2;
                }
            }
            Evt.videoId = lib.status.videoId++;
            game.broadcastAll(function (id, choicelist, Dvalue) {
                var dialog = ui.create.dialog('选择' + Dvalue + '项');
                choicelist.forEach(element => {
                    dialog.add([element, 'vcard']);
                })
                dialog.videoId = id;
            }, Evt.videoId, list, Evt.Dvalue);
            player.$.onlink.push(trigger.card.cardid);
            'step 1'
            player.chooseButton(Evt.Dvalue).set('dialog', Evt.videoId).set('prompt', get.prompt('taiyangzhiyin'));
            'step 2'
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                result.links.forEach(element => {
                    if (element[2] == "摸一张牌") {
                        player.draw();
                    }
                    if (element[2] == "无法响应") {
                        game.log(player, '令', trigger.card, '无法被响应');
                        trigger.directHit.addArray(game.players);
                        trigger.nowuxie = true;
                    }
                });
                result.links.forEach(element => {
                    if (element[2] == "额外目标") {
                        //console.log(trigger);
                        player.chooseTarget(true, '额外指定一名' + get.translation(trigger.card) + '的目标？', function (card, player, target) {
                            var trigger = _status.event;
                            if (trigger.targets.contains(target)) return false;
                            return lib.filter.targetEnabled2(trigger.card, _status.event.player, target);
                        }).set('ai', function (target) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            return get.effect(target, trigger.card, player, player);
                        }).set('targets', trigger.targets).set('card', trigger.card);
                    }
                });
            }
            'step 3'
            if (result.bool && result.targets?.length) {
                if (!Evt.isMine()) game.delayx();
                Evt.target = result.targets[0];
                if (Evt.target) {
                    trigger.targets.add(Evt.target);
                }
            }
        },
        group: 'taiyangzhiyin_clear',
        subSkill: {
            clear: {
                trigger: { player: ['useCardAfter'] },
                direct: true,
                content() {
                    if (player.$.onlink != null) {
                        var deleteIndex = player.$.onlink.indexOf(trigger.card.cardid);
                        if (deleteIndex != -1) {
                            player.$.onlink.splice(deleteIndex, 1, null)
                        }
                    }
                }
            }
        }
    },
    renjiazhizhu: {
        unique: true,
        trigger: { player: 'phaseBegin' },
        zhuSkill: true,
        forced: true,
        filter(Evt, player) {
            if (!player.hasZhuSkill('renjiazhizhu')) return false;
            return game.countPlayer(cur => cur.group == 'holo' && cur != player);
        },
        content() {
            if (player.$.skillCardID == null) {
                player.$.skillCardID = [];
            }
            Evt.players = game.filterPlayer(cur => cur.group == 'holo' && cur != player);
            Evt.players.sortBySeat(player);
            'step 0'
            if (Evt.playersIndex == null) {
                Evt.playersIndex = 0;
            }
            if (Evt.playersIndex < Evt.players.length) {
                Evt.players[Evt.playersIndex].chooseCard('是否交给' + get.translation(player) + '一张手牌').set('ai', card => {
                    if (get.attitude(_status.event.player, _status.event.kong) >= 0) return 7 - get.value(card);
                    return -1;
                }).set('kong', player)
            }
            else {
                Evt.playersIndex = 0;
                Evt.finish();
            }
            'step 1'
            if (result.bool) {
                let source = Evt.players[Evt.playersIndex];
                source.addExpose(0.2);
                if (player.$.changecardList == null) {
                    player.$.changecardList = [];
                }
                player.$.changecardList.push({
                    result: result,
                    card: result.cards[0],
                    oldNumber: result.cards[0].number,
                    oldData: result.cards[0].childNodes[1].childNodes[2].data
                });
                player.gain(result.cards, Evt.players[Evt.playersIndex], 'giveAuto');
                result.cards[0].number = 11;
                result.cards[0].specialEffects = ['card_hightlight'];
                var newcard = get.cardInfoOL(result.cards[0]);//取得card对象
                let newcard2 = get.cardInfo(result.cards);
                var info = JSON.parse(newcard.slice(13));//
                var id = info.shift();
                game.broadcastAll(function (card, info) {
                    card.init(info)
                }, result.cards[0], info);
                //result.cards[0].init(info)
                //lib.cardOL[id].init(info);
                //console.log(player.$.changecardList);
                player.$.skillCardID.push(result.cards[0].cardid);
            }
            if (Evt.playersIndex < Evt.players.length) {
                Evt.playersIndex++;
                Evt.goto(0);
            }
            //console.log(player.$.skillCardID)
        },
        group: ['renjiazhizhu_changecard', 'renjiazhizhu_clear'],
        subSkill: {
            changecard: {
                trigger: { player: 'useCardToBefore' },
                direct: true,
                filter(Evt, player) {
                    if (player.$.skillCardID == null) {
                        return false
                    }
                    else {
                        return player.$.skillCardID.indexOf(Evt.card.cardid) != -1;
                    }
                },
                content() {
                    //trigger.card.number=11;
                }
            },
            clear: {
                trigger: { global: 'phaseBefore' },
                silent: true,
                content() {
                    delete player.$.skillCardID;
                    if (player.$.changecardList != null) {
                        player.$.changecardList.forEach((element, index) => {
                            var newcard = get.cardInfoOL(element.card);
                            var info = JSON.parse(newcard.slice(13));
                            var id = info.shift();
                            info[1] = element.oldNumber;
                            if (info[5] == null) {
                                info[5] = []
                            }
                            info[5].remove('card_hightlight');
                            game.broadcastAll(function (card, info) {
                                card.init(info)
                            }, element.card, info);
                        })
                    }
                    delete player.$.changecardList;
                }
            }
        }
    },
    renjiazhizhu2: {
        trigger: { global: 'gainBefore' },
        forced: true,
        content() {
            //trigger.card.number=1;
            //trigger.card.cards[0].childNodes[1].childNodes[2].data=1;
            console.log(card);
            console.log(trigger);
        }
    },
    juhun: {
        trigger: { global: 'damageAfter' },
        forced: true,
        usable: 1,
        content() {
            Evt.card = get.cards()[0];
            if (!player.$.juhun) player.$.juhun = [];
            game.cardsGotoSpecial(Evt.card);
            player.$gain2(Evt.card);
            player.markAuto('juhun', [Evt.card]);
            // player.showCards(player.$.juhun,'聚魂');
            // player.markSkill('juhun');
        },
        intro: {
            content: 'cards',
            onunmark: 'throw',
        },
        cardAround: true,
        group: ['juhun_get'],
        subSkill: {
            get: {
                trigger: {
                    global: 'roundStart'
                },
                direct: true,
                filter(Evt, player) {
                    return player.$.juhun != undefined && player.$.juhun.length != 0;
                },
                content() {
                    // player.$.juhun.forEach(function(c) {
                    // 	player.gain(c);
                    // });
                    'step 0'
                    player.gain(player.$.juhun);
                    player.$give(player.$.juhun, player, false);
                    delete player.$.juhun;
                    'step 1'
                    player.unmarkSkill('juhun');
                }
            },
            // draw:{
            // 	trigger:{
            // 		player:'phaseDrawBegin'
            // 	},
            // 	direct:true,
            // 	filter(Evt,player){
            // 		return !Evt.numFixed&&player.isMaxHandcard(false);
            // 	},
            // 	content(){
            // 		trigger.num--;
            // 	},
            // }
        }
    },
    meilu: {
        trigger: {
            player: 'phaseBegin'
        },
        forced: true,
        filter(Evt, player) {
            return player.countCards('h') - 3 >= player.hp
        },
        content() {
            player.turnOver();
        },
        group: ['meilu_kill', 'meilu_draw'],
        subSkill: {
            kill: {
                firstDo: true,
                trigger: { player: 'phaseUseBefore' },
                forced: true,
                filter(Evt, player) {
                    return player.classList.contains('turnedover');
                },
                content() {
                    trigger.audioed = true;
                    player.markSkill('meilu');
                    player.addTempSkill('meilu_infinityKill', 'phaseUseEnd');
                },
            },
            draw: {
                trigger: { player: 'turnOverAfter' },
                forced: true,
                filter(Evt, player) {
                    return !player.classList.contains('turnedover');
                },
                content() {
                    if (player.hp < player.maxHp) {
                        player.markSkill('meilu');
                        player.recover();
                    }
                },
            },
            infinityKill: {
                mod: {
                    cardUsable(card, player, num) {
                        if (card.name == 'sha') return Infinity;
                    }
                }
            }
        }
    },
    liaolishiyan: {
        trigger: {
            player: "phaseDrawBegin1",
        },
        filter(Evt, player) {
            return !Evt.numFixed;
        },
        check(Evt, player) {
            return Evt.num < 2 || player.isDamaged();
        },
        content() {
            'step 0'
            trigger.changeToZero();
            var cards = get.cards(2);
            game.cardsGotoOrdering(cards);
            Evt.videoId = lib.status.videoId++;
            game.broadcastAll(function (player, id, cards) {
                var str;
                if (player == game.me && !_status.auto) {
                    str = '料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
                }
                else {
                    str = '料理实验<br>♦~重铸一张牌<br>♣~弃置一张牌<br>♥~令赤井心回复 1 点体力<br>♠~失去 1 点体力';
                }
                var dialog = ui.create.dialog(str, cards);
                dialog.videoId = id;
            }, player, Evt.videoId, cards);
            player.showCards(cards, '料理实验');
            player.$.resultCards = cards;
            Evt.cards = cards;
            player.gain(cards, 'log', 'gain2');
            'step 1'
            //player.$.resultCards=Evt.resultCards;
            for (var i = 0; i < Evt.cards.length; i++) {
                switch (get.suit(player.$.resultCards[i])) {
                    case 'spade':
                        player.storage['card' + i] = '黑桃：失去 1 点体力';
                        break
                    case 'heart':
                        player.storage['card' + i] = '红桃：令赤井心回复 1 点体力';
                        break
                    case 'diamond':
                        player.storage['card' + i] = '方块：重铸一张牌';
                        break
                    case 'club':
                        player.storage['card' + i] = '梅花：弃置一张牌';
                        break
                }
            }
            'step 2'
            switch (get.suit(player.$.resultCards[0])) {
                case 'spade':
                    player.loseHp(1);
                    break
                case 'heart':
                    player.recover();
                    break
                case 'diamond':
                    player.chooseCard('he', '重铸一张牌', 1, true);
                    // player.chooseToDiscard('he','重铸一张牌',1,true)
                    // player.draw();
                    break
                case 'club':
                    player.discardPlayerCard(player, 1, 'he', true);
                    break
            }
            "step 3"
            if (get.suit(player.$.resultCards[0]) == 'diamond' && result.cards) {
                player.lose(result.cards, ui.discardPile).set('visible', true);
                player.$throw(result.cards, 1000);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw();
            }
            'step 4'
            switch (get.suit(player.$.resultCards[1])) {
                case 'spade':
                    player.loseHp(1);
                    break
                case 'heart':
                    player.recover();
                    break
                case 'diamond':
                    player.chooseCard('he', '重铸一张牌', 1, true);
                    // player.chooseToDiscard('he','重铸一张牌',1,true)
                    // player.draw();
                    break
                case 'club':
                    player.discardPlayerCard(player, 1, 'he', true);
                    break
            }
            'step 5'
            if (get.suit(player.$.resultCards[1]) == 'diamond' && result.cards) {
                player.lose(result.cards, ui.discardPile);
                player.$throw(result.cards, 1000);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw();
            }
            game.broadcastAll('closeDialog', Evt.videoId);
            player.addTempSkill('liaolishiyan2');
        },
        group: 'liaolishiyan_clear',
        subSkill: {
            clear: {
                trigger: { global: ['phaseUseAfter', 'phaseAfter'] },
                silent: true,
                filter(Evt) {
                },
                content() {
                    delete player.$.resultCards;
                    delete player.$.card0;
                    delete player.$.card1;
                }
            }
        }
    },
    liaolishiyan2: {
        enable: 'phaseUse',
        position: 'he',
        filter(Evt, player) {
            return !player.hasSkill('liaolishiyan3');
        },
        content() {
            'step 0'
            player.chooseCardTarget({
                position: 'he',
                prompt: '重置两张相同花色牌令一名角色按顺序执行' + '<br>' + player.$.card0 + '<br>' + player.$.card1,
                selectCard: 2,
                filterCard(card, player) {
                    return (get.suit(card) == get.suit(player.$.resultCards[0])) || (get.suit(card) == get.suit(player.$.resultCards[1]))
                },
                filterTarget(card, player, target) {
                    if (card.cards) {
                        if (get.suit(player.$.resultCards[0]) == get.suit(player.$.resultCards[1])) return true;
                        else
                            return get.suit(card.cards[0]) != get.suit(card.cards[1]);
                    }
                }
            });
            'step 1'
            Evt.result = result;
            if (Evt.result.bool) {
                // player.discard(result.cards,'重铸二张牌',2);
                // player.draw(2);
                player.lose(result.cards, ui.discardPile);
                player.$throw(result.cards, 1000);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw(2);
                switch (get.suit(player.$.resultCards[0])) {
                    case 'spade':
                        Evt.result.targets[0].loseHp(1);
                        break
                    case 'heart':
                        player.recover();
                        //Evt.result.targets[0].recover();
                        break
                    case 'diamond':
                        Evt.result.targets[0].chooseCard('he', '重铸一张牌', 1, true);
                        break
                    case 'club':
                        Evt.result.targets[0].discardPlayerCard(Evt.result.targets[0], 1, 'he', true);
                        break
                }
            }
            else {
                Evt.goto(4);
            }
            'step 2'
            if (get.suit(player.$.resultCards[0]) == 'diamond' && result.cards) {
                Evt.result.targets[0].lose(result.cards, ui.discardPile);
                Evt.result.targets[0].$throw(result.cards, 1000);
                game.log(Evt.result.targets[0], '将', result.cards, '置入了弃牌堆');
                Evt.result.targets[0].draw();
            }
            switch (get.suit(player.$.resultCards[1])) {
                case 'spade':
                    Evt.result.targets[0].loseHp(1);
                    break
                case 'heart':
                    player.recover();
                    //Evt.result.targets[0].recover();
                    break
                case 'diamond':
                    Evt.result.targets[0].chooseCard('he', '重铸一张牌', 1, true);
                    break
                case 'club':
                    Evt.result.targets[0].discardPlayerCard(Evt.result.targets[0], 1, 'he', true);
                    break
            }
            'step 3'
            if (get.suit(player.$.resultCards[1]) == 'diamond' && result.cards) {
                Evt.result.targets[0].lose(result.cards, ui.discardPile);
                Evt.result.targets[0].$throw(result.cards, 1000);
                game.log(Evt.result.targets[0], '将', result.cards, '置入了弃牌堆');
                Evt.result.targets[0].draw();
            }
            player.addTempSkill('liaolishiyan3');
            Evt.finish();
            'step 4'
            Evt.finish();

        }

    },
    liaolishiyan3: {
        trigger: { global: ['phaseUseAfter', 'phaseAfter'] },
        silent: true,
        filter(Evt) {
            return Evt.skill != 'liaolishiyan' && Evt.skill != 'liaolishiyan2';
        },
        content() {
            player.removeSkill('liaolishiyan3');
        }
    },
    momizhiyan: {
        usable: 1,
        trigger: {
            player: 'useCardToBegin',
        },
        filter(Evt, player) {
            return (player.countCards('he') > 0) && Evt.targets && Evt.targets.length > 0;
        },
        content() {
            'step 0'
            player.chooseToDiscard('he', '弃置一张牌', 1, true);
            game.delayx();
            'step 1'
            Evt.multiTrue = false;
            if (result.bool) {
                Evt.suit = get.suit(result.cards[0]);
                player.$.momizhiyanGroup = trigger.targets;
                if (trigger.targets.length > 1) {
                    Evt.multiTrue = true;
                    player.chooseTarget(function (card, player, target) {
                        return player.$.momizhiyanGroup.contains(target);
                    }, 1, true);
                    game.delayx();
                }
            }
            else {
                Evt.finish();
            }
            'step 2'
            if (result.targets && result.targets?.length) {
                trigger.targets[0] = result.targets[0];
            }
            else if (result.multiTrue) {
                trigger.targets[0] = player;
            }
            if (Evt.suit) {
                switch (Evt.suit) {
                    case 'spade':
                        trigger.targets[0].loseHp(1);
                        break
                    case 'heart':
                        player.recover();
                        //trigger.targets[0].recover();
                        break
                    case 'diamond':
                        trigger.targets[0].chooseCard('he', '重铸一张牌', 1, true);
                        break
                    case 'club':
                        trigger.targets[0].discardPlayerCard(trigger.targets[0], 1, 'he', true);
                        break
                }
            }
            delete player.$.momizhiyanGroup;
            'step 3'
            if (Evt.suit == 'diamond' && result.cards) {
                trigger.targets[0].lose(result.cards, ui.discardPile);
                trigger.targets[0].$throw(result.cards, 1000);
                game.log(trigger.targets[0], '将', result.cards, '置入了弃牌堆');
                trigger.targets[0].draw();
            }
            Evt.finish()
        }
    },
    huxi: {
        audio: 4,
        enable: 'phaseUse',
        position: 'he',
        usable: 1,
        filter(Evt, player) {
            if (!player.$.huxiGroup) player.$.huxiGroup = [];
            return player.countCards('h');
        },
        filterTarget(card, player, target) {
            return player.inRange(target) && player.countCards('h') && target.countCards('h');
        },
        content() {
            "step 0"
            if (player.countCards('h') == 0 || target.countCards('h') == 0) {
                Evt.result = { cancelled: true, bool: false }
                Evt.finish();
                return;
            }
            game.log(player, '想要呼吸', target);
            "step 1"
            player.chooseCard('###『呼吸』###请选择交换的牌', true).set('type', 'compare').set('ai', card => {
                return 5 - get.value(card);
            });
            "step 2"
            Evt.card1 = result.cards[0];
            target.chooseCard('###『呼吸』###请选择交换的牌', true).set('type', 'compare');
            "step 3"
            Evt.card2 = result.cards[0];
            if (!Evt.resultOL && Evt.ol) {
                game.pause();
            }
            "step 4"
            player.lose(Evt.card1, ui.ordering);
            target.lose(Evt.card2, ui.ordering);
            "step 5"
            game.broadcast(function () {
                ui.arena.classList.add('thrownhighlight');
            });
            ui.arena.classList.add('thrownhighlight');
            game.addVideo('thrownhighlight1');
            player.$compare(Evt.card1, target, Evt.card2);
            game.log(player, '的交换牌为', Evt.card1);
            game.log(target, '的交换牌为', Evt.card2);
            Evt.num1 = Evt.card1.number;
            Evt.num2 = Evt.card2.number;
            Evt.trigger('compare');
            game.delay(0, 1500);
            "step 6"
            Evt.result = {
                player: Evt.card1,
                target: Evt.card2,
                suit1: get.suit(Evt.card1),
                suit2: get.suit(Evt.card2)
            }
            var str;
            str = get.translation(player.name) + '想要呼吸' + get.translation(target.name);
            game.broadcastAll(function (str) {
                var dialog = ui.create.dialog(str);
                dialog.classList.add('center');
                setTimeout(function () {
                    dialog.close();
                }, 1000);
            }, str);
            game.delay(2);
            "step 7"
            if (typeof Evt.target.ai.shown == 'number' && Evt.target.ai.shown <= 0.85 && Evt.addToAI) {
                Evt.target.ai.shown += 0.1;
            }
            player.gain(Evt.card2, 'visible');
            player.$gain2(Evt.card2);
            game.delay(2);
            target.gain(Evt.card1, 'visible');
            target.$gain2(Evt.card1);
            game.broadcastAll(function () {
                ui.arena.classList.remove('thrownhighlight');
            });
            game.addVideo('thrownhighlight2');
            if (Evt.clear !== false) {
                game.broadcastAll(ui.clear);
            }
            if (typeof Evt.preserve == 'function') {
                Evt.preserve = Evt.preserve(Evt.result);
            }
            "step 8"
            if (Evt.result.suit2 == 'heart' || Evt.result.suit2 == 'diamond') {
                player.draw(1);
                if (!player.hasSkill('huxi_buff')) {
                    player.addTempSkill('huxi_buff');
                }
                else {
                    player.$.huxi_buff++
                    player.markSkill('huxi_buff')
                }
            }
            player.$.huxiGroup.add(target);
        },
        ai: {
            order: 6,
            result: {
                player: 1,
                target(player, target) {
                    if (player.countCards('h', { name: 'du' })) return -2;
                    return 0.5;
                }
            },
            threaten: 0.8,
        },
        group: 'huxi_clear',
        subSkill: {
            clear: {
                firstDo: true,
                silent: true,
                direct: true,
                trigger: {
                    player: ['phaseAfter']
                },
                content() {
                    delete player.$.huxiGroup;
                }
            },
            buff: new toSkill('mark', {
                mark: true,
                intro: {
                    content: '『呼吸』：成功呼吸次数：#',
                },
                onremove: true,
                mod: {
                    cardUsable(card, player, num) {
                        let Buff = (player.$.huxi_buff) || 1;
                        if (card.name == 'sha') return num + Buff;
                    },
                    globalFrom(from, to, distance) {
                        let Buff = (player.$.huxi_buff) || 1;
                        return -Buff;
                    },
                }
            }).setI(1)
        }
    },
    lianmeng: {
        trigger: {
            player: 'useCardAfter',
            source: 'damageSource',
        },
        forced: true,
        filter(Evt, player) {
            if (!player.$.huxiGroup) player.$.huxiGroup = [];
            if (Evt.target) {
                if (player.$.huxiGroup && player.$.huxiGroup.contains(Evt.target)) {
                    return false;
                }
            }
            if (Evt.name == 'useCard') {
                if (Evt.cards != null && get.subtype(Evt.cards[0]) != 'equip1') {
                    return false;
                }
            }
            if (player.countCards('h') < 1) {
                return false;
            }
            if (game.hasPlayer(cur => {
                return player.inRange(cur) && !player.$.huxiGroup.contains(cur) && cur.countCards('h') > 0;
            })) {
                return true;
            }
            else
                return false
        },
        content() {
            'step 0'
            player.chooseTarget('对一名角色使用' + get.translation('huxi'), {}, true, function (card, player, target) {
                if (player == target) return false;
                if (!player.inRange(target)) return false;
                if (target.countCards('h') < 1) {
                    return false;
                }
                if (player.$.huxiGroup && player.$.huxiGroup.contains(target)) {
                    return false;
                }
                if (player.$.huxiGroup.contains(target)) return false;
                if (game.hasPlayer(cur => {
                    if (player.$.huxiGroup && player.$.huxiGroup.contains(cur)) {
                        return false;
                    }
                    if (cur.countCards('h') == 0) {
                        return false;
                    }
                    if (cur != player && get.distance(player, cur) < get.distance(player, target)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })) {
                    return false;
                }
                return true;
            });
            'step 1'
            if (result.bool && result.targets?.length) {
                player.useSkill('huxi', false, result.targets);
            }
        },
        group: 'lianmeng_difang',
        subSkill: {
            difang: {
                trigger: {
                    player: ['gainAfter']
                },
                firstDo: true,
                direct: true,
                filter(Evt, player) {
                    if (player == _status.currentPhase) return false;
                    return Evt.source && player != Evt.source;
                },
                content() {
                    let card = player.getEquip(2)
                    if (card) {
                        player.discard(card);
                        player.draw()
                    }
                }
            }
        }
    },
    gaonengzhanxie: {
        priority: 15,
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha') {
                    return num + player.countCards('e');
                }
            }
        },
        trigger: {
            player: 'useCardAfter'
        },
        forced: true,
        filter(Evt, player) {
            if (Evt.card.name == 'sha') return true;
            else return false;
        },
        content() {
            'step 0'
            player.draw(player.getStat().card.sha);
            'step 1'
            if (player.getCardUsable({ name: 'sha' }) !== 0 && lib.filter.cardEnabled({ name: 'sha' }, player)) {
                player.chooseToDiscard('he', '弃置' + player.getStat().card.sha.toString() + '张牌', player.getStat().card.sha, true)
            }
        }
    },
    ranyouxielou: {
        forced: true,
        trigger: { player: 'damageBegin4' },
        filter(Evt) {
            if (Evt.nature != null) return true;
            return false;
        },
        content() {
            'step 0'
            if (trigger.source) {
                var list = [
                    '取消此伤害，令' + get.translation(player) + '回复' + trigger.num + '点生命',
                    '将' + get.translation(trigger.cards) + '交给' + get.translation(player),
                ];
                if (!trigger.cards || trigger.cards.length == 0) list.pop();
                trigger.source.chooseControl(true).set('choiceList', list)
            }
            else {
                player.recover(trigger.num, trigger.source);
                Evt.finish();
            }
            'step 1'
            if (result.index == 0) {
                player.recover(trigger.num, trigger.source);
                trigger.cancel();
            }
            else {
                if (trigger.cards) {
                    player.gain(trigger.cards, 'gain2', trigger.source)
                }
            }
        },
        ai: {
            effect: {
                target(card, player, target, current) {
                    if (card.name == 'tiesuo') return 0;
                    if (get.tag(card, 'natureDamage')) return 0;
                }
            },
        },
        group: 'ranyouxielou_fire',
        subSkill: {
            fire: {
                trigger: { global: 'damageBegin3' },
                forced: true,
                filter(Evt, player) {
                    if (Evt.player == player) return false;
                    if (Evt.player && player.inRange(Evt.player) && Evt.nature == 'fire') {
                        if (player.countCards('h') >= player.getHandcardLimit())
                            return true;
                    }//
                    return false;
                },
                content() {
                    player.chooseToDiscard('he', '弃置一张牌，使该伤害+1', true, 1);
                    trigger.num++;
                    //player.recover();
                }
            }
        }
    },
    baihuqingguo: {
        trigger: { global: 'phaseBegin' },
        //frequent:true,
        filter(Evt, player) {
            return Evt.player != player && player.countCards('he') > 0;
        },
        content() {
            'step 0'
            player.chooseToDiscard(1, '弃置一张牌');
            'step 1'
            if (result.bool) {
                player.addTempSkill('baihuqingguo_chaofeng');
                trigger.player.addTempSkill('baihuqingguo_meihuo');
            }
            else {
                Evt.finish();
            }
        },
        subSkill: {
            chaofeng: {
                mark: true,
                markText: '狐',
                intro: {
                    name: '狐',
                    content: '你只能摸这只🦊'
                },
            },
            meihuo: {
                mark: true,
                markText: '魅',
                intro: {
                    name: '魅',
                    content: '你只能摸那只🦊'
                },
                mod: {
                    playerEnabled(card, player, target) {
                        if (target == player || target.hasSkill('baihuqingguo_chaofeng')) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        }
    },
    huyanluanyu: {
        trigger: {
            player: 'damage'
        },
        content() {
            'step 0'
            Evt.index = 0;
            Evt.damageNum = trigger.num;
            Evt.nowHand = player.countCards('h');
            Evt.getPlayers = game.filterPlayer(cur => {
                if (cur.countCards('h') > Evt.nowHand) {
                    return true;
                }
            });
            Evt.givePlayers = game.filterPlayer(cur => {
                if (cur.countCards('h') < Evt.nowHand) {
                    return true;
                }
            });
            'step 1'
            if (Evt.index < Evt.getPlayers.length) {
                if (Evt.getPlayers[Evt.index].countCards('he') > 0) {
                    Evt.getPlayers[Evt.index].chooseCard(1, 'he', '交给' + get.translation(player) + '一张牌', true);
                }
            }
            else {
                Evt.index = 0;
                Evt.goto(3);
            }
            'step 2'
            player.gain(result.cards);
            game.delayx();
            Evt.index += 1;
            Evt.goto(1);
            'step 3'
            if (Evt.index < Evt.givePlayers.length) {
                if (player.countCards('he') > 0) {
                    player.chooseCard(1, 'he', '交给' + get.translation(Evt.givePlayers[Evt.index]) + '一张牌', true);
                }
            }
            else {
                Evt.goto(5);
            }
            'step 4'
            Evt.givePlayers[Evt.index].gain(result.cards);
            game.delayx();
            Evt.index += 1;
            Evt.goto(3);
            'step 5'
            Evt.finish();
        }
    },
    yuanlv: {
        audio: 6,
        trigger: { global: 'phaseEnd' },
        priority: 2,
        filter(Evt, player) {
            if (player.hasSkill('yuanlv_tag')) {
                return true;
            }
            else
                return false;
        },
        content: [() => {
            player.draw(player.maxHp);
        }, () => {
            player.chooseToMove('『远虑』：选择放置到牌堆顶部的牌', true)
                .set('list', [
                    ['牌堆顶'],
                    ['手牌&装备区', player.getCards('he')],
                ])
                .set('reverse', ((_status.currentPhase && _status.currentPhase.next) ? get.attitude(player, _status.currentPhase.next) > 0 : false))
                .set('processAI', function (list) {
                    var cards = list[1][1].slice(0);
                    cards.sort(function (a, b) {
                        return (_status.event.reverse ? 1 : -1) * (get.value(b) - get.value(a));
                    });
                    return [cards.slice(0, _status.event.puts), cards.slice(_status.event.puts)];
                })
                .set('filterMove', function (from, to, moved) {
                    if (to == 0 && moved[0].length >= _status.event.puts) return false;
                    return true;
                })
                .set('filterOk', function (moved) {
                    return moved[0].length == _status.event.puts;
                })
                .set('puts', player.hp)
        }, () => {
            if (result.bool && result.moved && result.moved[0].length) Evt.cards = result.moved[0].slice(0);
            if (!Evt.cards) {
                Evt.finish()
                return
            }
            game.broadcastAll(function (player, cards) {
                let cardxs = []
                for (let v of cards) {
                    let cardx = ui.create.card();
                    cardx.classList.add('infohidden');
                    cardx.classList.add('infoflip');
                    cardxs.push(cardx)
                }
                player.$throw(cardxs, 500, 'nobroadcast');
            }, player, Evt.cards);
            player.lose(Evt.cards, ui.special);
            game.delayx();
        }, () => {
            let tops = Evt.cards.slice(0)
            game.log(player, `将${get.cnNumber(tops.length)}张牌放在牌堆顶`)
            while (tops.length) {
                ui.cardPile.insertBefore(tops.pop().fix(), ui.cardPile.firstChild);
            }
            game.updateRoundNumber();
            game.delayx();
        }],
        group: ['yuanlv_ready'],
        subSkill: {
            ready: {
                trigger: { player: ['damageAfter', 'loseHpAfter', 'useCardAfter'] },
                priority: 2,
                direct: true,
                filter(Evt, player) {
                    if (Evt.name == 'useCard') {
                        var indexi = 0
                        while (indexi < Evt.cards.length) {
                            if (get.type(Evt.cards[indexi]) == 'trick' || get.type(Evt.cards[indexi]) == 'delay')
                                return true;
                            indexi++;
                        }
                        return false;
                    }
                    else
                        return true;
                },
                content() {
                    if (trigger.name == 'useCard') {
                        if (!player.hasSkill('yuanlv_tag') && !player.hasSkill('yuanlv_trickUsed')) {
                            player.addTempSkill('yuanlv_tag');
                            player.addTempSkill('yuanlv_trickUsed', 'roundStart');
                        }
                    }
                    else {
                        if (!player.hasSkill('yuanlv_tag') && !player.hasSkill('yuanlv_damaged')) {
                            player.addTempSkill('yuanlv_tag');
                            player.addTempSkill('yuanlv_damaged', 'roundStart');
                        }
                    }
                }
            },
            tag: {
                mark: true,
                markText: '虑',
                intro: {
                    content() {
                        return '结束时触发技能' + get.translation('yuanlv')
                    }
                }
            },
            damaged: {
                mark: true,
                markText: '伤',
                intro: {
                    content() {
                        return '本轮已经通过失去体力触发' + get.translation('yuanlv')
                    }
                }
            },
            trickUsed: {
                mark: true,
                markText: '锦',
                intro: {
                    content() {
                        return '本轮已经通过使用锦囊触发' + get.translation('yuanlv')
                    }
                }
            }
        },
        ai: {
            threaten: 0.6,
        }
    },
    jinyuan: {
        audio: 4,
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('he') > 0;
        },
        filterTarget(card, player, target) {
            return player != target && target.countCards('h') > 0;
        },
        content: [() => {
            player.viewHandcards(target);
            game.delayx();
        }, () => {
            Evt.nowHandCards = target.getCards('h');
            player.chooseCard('he', '###『近援』###选择给予的牌').set('ai', card => {
                return 6 - get.value(card);
            });
        }, () => {
            if (result.cards && result.cards.length) {
                Evt.card = result.cards[0];
                Evt.cardUsable = target.hasUseTarget(Evt.card);
                target.gain(Evt.card, player, 'give');
                game.delay(0.2);
            }
        }, () => {
            if (Evt.cardUsable) {
                target.chooseUseTarget(Evt.card, `可选择一个目标直接使用${get.translation(Evt.card)}`);
            }
        }],
        ai: {
            order: 6,
            result: {
                target: 1,
            },
        },
    },
    zhongjian: {
        audio: true,
        unique: true,
        zhuSkill: true,
        trigger: { global: 'useCard2' },
        round: 1,
        direct: true,
        filter(Evt, player) {
            if (!player.hasZhuSkill('zhongjian')) return false;
            if (get.type(Evt.card) !== 'trick' || !Evt.targets || !Evt.targets.length) return false;
            return game.hasPlayer(cur => {
                return cur.group == player.group;
            });
        },
        content() {
            "step 0"
            player.chooseTarget('###' + get.prompt('zhongjian') + '###令一名' + get.translation(player.group + '2') + '势力角色本回合一张手牌视为无懈可击', {}, function (card, player, target) {
                return target.group == player.group && target.countCards('h') > 0
            });
            "step 1"
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.logSkill('zhongjian', Evt.target);
                player.choosePlayerCard(Evt.target, 1, 'h', true)
                //var dropcards=Evt.dropTarget.getCards('h')
            }
            else {
                Evt.finish()
            }
            "step 2"
            if (result.bool) {
                Evt.target.$.changeWuxie = result.links[0];
                //Evt.dropTarget.chooseCard('he',1,true);
                Evt.target.addTempSkill('zhongjian_zhuanhua');
            }
            else {
                Evt.finish()
            }
        },
        subSkill: {
            zhuanhua: {
                mark: true,
                intro: {
                    content() {
                        return '一张手牌视为【无懈可击】'
                    }
                },
                onremove: ['changeWuxie'],
                mod: {
                    cardname(card, player) {
                        if (card == player.$.changeWuxie)
                            return 'wuxie';
                    },
                },
            }
        }
    },
    meiwu: {
        // popup: false,
        direct: true,
        trigger: {
            target: 'useCardToTarget',
        },
        usable: 1,
        filter(Evt, player) {
            return get.color(Evt.card) == 'black' && Evt.targets.length == 1 && game.hasPlayer(cur => {
                return cur != player && cur != Evt.player;
            });
        },
        content() {
            'step 0'
            player.chooseTarget('###『魅舞』###转移给一名其它角色', function (card, player, target) {
                return player != target && target != _status.event.tplayer;
            }).set('ai', function (target) {
                var player = _status.event.player;
                return get.effect(target, _status.event.card, _status.event.tplayer, player) - 0.5;
            }).set('tplayer', trigger.player).set('card', trigger.card);
            'step 1'
            if (result.bool && result.targets?.length) {
                var target = result.targets[0];
                player.logSkill(Evt.name, target);
                var evt = trigger.getParent();
                evt.triggeredTargets2.remove(player);
                evt.targets.remove(player);
                evt.targets.push(target);
                player.$.meiwu_trace = {
                    cardid: trigger.card.cardid,
                    target: target,
                };
            }
        },
        group: ['meiwu_trace'],
        subSkill: {
            trace: {
                direct: true,
                trigger: {
                    global: 'useCardAfter',
                },
                filter(Evt, player) {
                    if (!player.$.meiwu_trace) return false;
                    return player.$.meiwu_trace.cardid == Evt.card.cardid &&
                        (Evt.result.bool == false || Evt.iswuxied);
                },
                content() {
                    'step 0'
                    player.chooseCard(true, 'he', "交给其一张牌");
                    'step 1'
                    if (result.bool && result.cards.length) {
                        var target = player.$.meiwu_trace.target;
                        player.$giveAuto(result.cards, target);
                        target.gain(result.cards, player);
                    }
                }
            },
        }
    },
    huichu: {
        trigger: {
            global: 'phaseBegin',
        },
        filter(Evt, player) {
            return player.countCards('h')
                && !game.hasPlayer(cur => {
                    return cur.hp < Evt.player.hp;
                });
        },
        check(Evt, player) {
            if (player.countCards('h') == player.countCards('h', { suit: 'heart' })) return get.recoverEffect(Evt.player, player, player) > 0;
            return 1;
        },
        content() {
            'step 0'
            player.showHandcards();
            Evt.chk = player.countCards('h') == player.countCards('h', { suit: 'heart' });
            'step 1'
            if (Evt.chk) {
                trigger.player.recover();
            }
            'step 2'
            if (!Evt.chk) {
                player.chooseCard("###『慧厨』###重铸任意张手牌", 'h', [1, Infinity]).set('ai', card => {
                    return 6.5 - get.value(card);
                });
            }
            'step 3'
            if (!Evt.chk && result.bool && result.cards.length) {
                player.lose(result.cards, ui.discardPile).set('visible', true);
                player.$throw(result.cards, 1000);
                game.log(player, '将', result.cards, '置入了弃牌堆');
                player.draw(result.cards.length);
            }
        }
    },

    haodu: {
        enable: 'phaseUse',
        filterCard: true,
        selectCard: [1, Infinity],
        position: 'h',
        selectTarget: 1,
        discard: false,
        lose: false,
        filter(Evt, player) {
            return player.countCards('h') && !player.hasSkill('haodu_lose')
                && (!player.getStat('skill').haodu) || ((player.getStat('skill').haodu || 0) < player.maxHp - player.hp);
        },
        filterTarget(card, player, target) {
            return player != target;
        },
        check(card) {
            if (ui.selected.cards.length) return 0;
            return (get.type(card) != 'basic' ? (6 - get.value(card)) : 7 - get.value(card));
        },
        complexCard: true,
        content() {
            'step 0'
            target.gain(cards, player, 'giveAuto');
            'step 1'
            Evt.videoId = lib.status.videoId++;
            var typelist = [
                ['基本', '', 'sha', 'basic', 'div1'],
                ['锦囊', '', 'wuzhong', 'trick', 'delay', 'div1'],
                ['装备', '', 'renwang', 'equip', 'div1']
            ];
            var suitlist = [
                ['heart', '', 'heart', 'heart', 'div2'],
                ['diamond', '', 'diamond', 'diamond', 'div2'],
                ['club', '', 'club', 'club', 'div2'],
                ['spade', '', 'spade', 'spade', 'div2']
            ];
            var numberlist = [];
            for (let i = 1; i <= 13; ++i) {
                numberlist.push(['', i, get.strNumber(i), i, 'div3']);
            }
            game.broadcastAll(function (id, typelist, suitlist, numberlist) {
                var dialog = ui.create.dialog('『豪赌』 选择');
                dialog.addText('类型');
                dialog.add([typelist, 'vcard']);
                dialog.addText('花色');
                dialog.add([suitlist, 'vcard']);
                dialog.addText('点数');
                dialog.add([numberlist, 'vcard']);
                dialog.videoId = id;
            }, Evt.videoId, typelist, suitlist, numberlist);
            'step 2'
            let next = player.chooseButton(3, true)
                .set('dialog', Evt.videoId)
                .set('filterButton', function (button) {
                    for (var i = 0; i < ui.selected.buttons.length; i++) {
                        var now = button.link, pre = ui.selected.buttons[i].link;
                        if (now[now.length - 1] == pre[pre.length - 1]) return false;
                    }
                    return true;
                })
                .set('ai', function (button) {
                    var card = _status.event.card;
                    var now = button.link;
                    if ([get.type2(card), get.suit(card), get.number(card)].contains(now[3])) return true;
                    return 0;
                })
                .set('card', cards[0]);
            'step 3'
            game.broadcastAll('closeDialog', Evt.videoId);
            if (result.bool) {
                Evt.chi = [];
                result.links.forEach(card => {
                    for (var i = 3; i < card.length - 1; ++i) Evt.chi.push(card[i]);
                })
            }
            else Evt.finish();
            'step 4'
            player.choosePlayerCard(target, 'h', true);
            'step 5'
            if (result.bool) {
                Evt.card = result.links[0];
                var str = "『豪赌』展示<br>";
                game.log(player, '选择了', Evt.chi);
                if (Evt.chi.contains(get.number(Evt.card))) str += "你与其交换手牌<br>";
                if (Evt.chi.contains(get.type(Evt.card, 'trick'))) str += "你弃置其两张牌<br>";
                if (Evt.chi.contains(get.suit(Evt.card))) str += "你获得其一张牌<br>";
                player.showCards(Evt.card, str);
                game.delayx();
            }
            else Evt.finish();
            'step 6'
            if (Evt.chi.contains(get.number(Evt.card))) {
                player.line(target, 'grean');
                player.swapHandcards(target);
            }
            'step 7'
            if (Evt.chi.contains(get.type(Evt.card))) {
                game.delayx();
                if (target.countDiscardableCards(player, 'he')) {
                    player.line(target, 'grean');
                    target.discardPlayerCard("弃置两张牌", target, 2, 'he', true);
                }
            }
            'step 8'
            if (Evt.chi.contains(get.suit(Evt.card))) {
                game.delayx();
                if (target.countGainableCards(player, 'he')) {
                    player.line(target, 'grean');
                    player.gainPlayerCard("获得其一张牌", 'he', target, true);
                }
            }
        },
        ai: {
            order: 7,
            result: {
                player(player, target) {
                    return 2.5 + (target.countCards('h') / 2) - player.countCards('h');
                },
                target(player, target) {
                    if (player.countCards('h') <= target.countCards('h') || target.countCards('h') <= target.countCards('e')) return -1;
                    return 0;
                }
            }
        },
        subSkill: {
            lose: {},
        }
    },
    yong: {
        init(player) {
            if (!player.$.yong) {
                player.$.yong = [];
            }
        },
        locked: true,
        notemp: true,
        marktext: '咏',
        intro: {
            content: 'cards',
            onunmark: 'throw',
        },
        cardAround: true
    },
    yemuxingyong: {
        audio: 3,
        round: 1,
        trigger: {
            global: 'phaseDiscardAfter',
        },
        filter(Evt, player) {
            if (Evt.player.isIn()) {
                var find = false;
                Evt.player.getHistory('lose', evt => {
                    return evt.type == 'discard' && evt.getParent('phaseDiscard') == Evt && evt.hs.filterInD('d').length > 0;
                }).forEach(function (arr) {
                    if (arr.cards != undefined) arr.cards.forEach(function (c) {
                        find = true;
                    })
                });
                return find;
            }
            return false;
        },
        check(Evt, player) {
            return Evt.cards.length > 1;
        },
        content() {
            "step 0"
            var cards = [];
            game.getGlobalHistory('cardMove', evt => {
                if (evt.name == 'cardsDiscard' && evt.getParent('phaseDiscard') == trigger) cards.addArray(evt.cards.filterInD('d'));
            });
            game.countPlayer2(cur => {
                cur.getHistory('lose', evt => {
                    if (evt.type != 'discard' || evt.getParent('phaseDiscard') != trigger) return;
                    cards.addArray(evt.cards.filterInD('d'));
                })
            });
            Evt.cards = cards;
            if (Evt.cards.length) {
                game.cardsGotoSpecial(Evt.cards);
            }
            else {
                Evt.finish();
            }
            'step 1'
            player.$.yong = player.$.yong.concat(Evt.cards);
            player.showCards(player.$.yong, '夜幕星咏');
            player.syncStorage('yong');
            player.markSkill('yong');
            "step 2"
            Evt.players = game.filterPlayer(cur => {
                return cur != player && cur.countCards('he') > 0;
            });
            Evt.players.sortBySeat(player);
            if (!Evt.players.length) {
                player.showCards(player.$.yong, "咏");
                game.delayx();
                Evt.finish();
            }
            "step 3"
            player.line(Evt.players, 'green');
            player.chooseCardOL(Evt.players, 'he', { color: 'black' }, '可将一张黑色牌置于' + get.translation(player) + '武将牌上')
                .set('ai', card => {
                    var source = _status.event.source;
                    var player = _status.event.player;
                    if (get.attitude(player, source) > 0) return 6 - get.value(card);
                    return 0;
                })
                .set('source', player).aiCard = function (target) {
                    var hs = target.getCards('h').filter(card => get.color(card) == 'black');
                    var Evt = _status.event;
                    Evt.player = target;
                    hs.sort(function (a, b) {
                        return Evt.ai(a) - Evt.ai(b);
                    });
                    delete Evt.player;
                    return { bool: true, cards: [hs[0]] };
                };
            "step 4"
            for (var i = 0; i < result.length; i++) {
                if (result[i].bool && result[i].cards) {
                    var card = result[i].cards[0];
                    Evt.players[i].lose(card, ui.special, 'toStorage');
                    player.$.yong.push(card);
                    Evt.players[i].$give(card, player, false);
                }
            }
            'step 5'
            player.showCards(player.$.yong, '夜幕星咏');
            player.syncStorage('yong');
            player.markSkill('yong');
        },
        group: ['yong', 'yemuxingyong_use'],
        subSkill: {
            use: {
                audio: 'cansha',
                enable: 'phaseUse',
                filter(Evt, player) {
                    if (!player.$.yong.length) {
                        return false;
                    }
                    return true;
                },
                content() {
                    'step 0'
                    player.chooseButton(['选择一张咏', player.$.yong], 1);
                    'step 1'
                    if (result.bool) {
                        var card = result.links[0];
                        player.gain(result.links, 'fromStorage');
                        player.$.yong.remove(card);
                        player.syncStorage('yong');
                        player.markSkill('yong');
                        player.$give(card, player, false);
                        if (!player.$.yong.length) {
                            player.unmarkSkill('yong');
                        }
                    }
                    else Evt.finish();
                    'step 2'
                    if (player.countCards('h') >= 2) {
                        let chk = (lib.filter.cardUsable({ name: 'jiu' }, player, Evt.getParent('chooseToUse')) && player.canUse('jiu', player))
                        if (player.hasUseTarget('guohe')) chk = true;
                        if (!chk) Evt.finish();
                    }
                    else {
                        Evt.finish();
                    }
                    'step 3'
                    player.chooseCardTarget({
                        prompt: "选择两张手牌并对自己使用一张酒或对其它角色使用一张过河拆桥",
                        position: 'h',
                        selectCard: 2,
                        // forced: true,
                        filterTarget(card, player, target) {
                            if (player == target) {
                                return lib.filter.cardUsable({ name: 'jiu' }, player, _status.event.getParent('chooseToUse'))
                                    && player.canUse('jiu', player);
                            }
                            else {
                                return player.canUse('guohe', target);
                            }
                        },
                        ai1(card) {
                            return 6 - get.value(card);
                        },
                        ai2(target) {
                            if (target != player) return get.effect(target, { name: 'guohe' }, player, player) - Math.random();
                            return get.effect(player, { name: 'jiu' }, player, player) - Math.random() * 2;
                        },
                    })
                    'step 4'
                    if (result.bool && result.targets.length && result.cards.length) {
                        var tar = result.targets[0];
                        if (tar == player) player.useCard({ name: 'jiu' }, tar, result.cards);
                        else player.useCard({ name: 'guohe' }, tar, result.cards);
                    }
                },
                ai: {
                    order: 9,
                    result: {
                        player(player, target) {
                            if (player.countCards('h') >= 5 || (player.needsToDiscard && player.getUseValue({ name: 'jiu' }) > 0.5)) return 1;
                            return 0;
                        },
                    }
                },
            },
        }
    },
    xinghejianduei: {
        skillAnimation: true,
        animationColor: 'thunder',
        juexingji: true,
        unique: true,
        trigger: {
            global: 'roundStart'
        },
        filter(Evt, player) {
            return !player.$.xinghejianduei && player.hp <= game.roundNumber;
        },
        forced: true,
        content() {
            player.loseMaxHp();
            player.draw(8);
            // player.draw(10 - player.countCards('h'));
            player.addSkill('xinghejianduei_juexing');
            player.awakenSkill(Evt.name);
            player.storage[Evt.name] = true;
        },
        subSkill: {
            juexing: {
                mod: {
                    maxHandcard(player, num) {
                        return num + player.$.yong.length;
                    },
                    attackFrom(from, to, distance) {
                        return distance - from.$.yong.length;
                    },
                }
            }
        }
    },

    //夸
    kuali: {
        audio: 4,
        group: ['kuali_active', 'kuali_jieshu'],
        subSkill: {
            active: {
                usable: 1,
                enable: "phaseUse",
                filter(Evt, player) {
                    if (player.hasSkill('kuali_used')) return false;
                    return game.hasPlayer(cur => {
                        return (cur.countCards('h') % player.countCards('h') == 0)
                            || (cur.hp % player.hp == 0);
                    });
                },
                log: false,
                content: kuali.contentx,
            },
            ai: {
                order(item, player) {
                    if (player.hp == 1 && game.hasPlayer(cur => {
                        return cur.countCards('h') % player.countCards('h') == 0 && cur != player;
                    })) return 2;
                    if (!player.needsToDiscard() && game.countPlayer(cur => {
                        return cur.hp % player.hp == 0 && cur != player;
                    }) > 2) return 8;
                    return 0;
                },
                result: { player: 1 }
            },
            jieshu: {
                trigger: { player: 'phaseJieshuBegin' },
                priority: 40,
                direct: true,
                filter(Evt, player) {
                    if (player.hasSkill('kuali_used')) return false;
                    return game.hasPlayer(cur => {
                        return (cur.countCards('h') % player.countCards('h') == 0)
                            || (cur.hp % player.hp == 0);
                    });
                },
                content: kuali.contentx,
            },
        },
    },
    youyi: {
        audio: 2,
        trigger: {
            global: 'phaseBegin'
        },
        round: 1,
        priority: 80,
        direct: true,
        filter(Evt, player) {
            return Evt.player != player && player.countCards('he');
        },
        check(Evt, player) {
            if (Evt.player.hasJudge('lebu') || get.attitude(player, Evt.player) < 0) return false;
            return true;
        },
        content() {
            'step 0'
            let next = player.chooseCard(get.prompt2('youyi'), 'he')
                .set('ai', card => {
                    if (get.name(card) == 'shan') return 9;
                    return 8 - get.value(card);
                });
            'step 1'
            if (result.bool) {
                player.logSkill('youyi');
                player.showCards(result.cards);
            }
            'step 2'
            if (result.cards) {
                var target = trigger.player;
                player.$giveAuto(result.cards, target);
                target.gain(result.cards, player).gaintag.add('youyishiyue');
                player.$.youyi = result.cards[0];
                target.$.youyishiyue = result.cards[0];
                target.addTempSkill('youyishiyue', 'phaseAfter');
            }
        },
        group: ['youyi_dam'],
        subSkill: {
            dam: {
                trigger: { global: 'damageBegin' },
                priority: 80,
                check(Evt, player) {
                    return 3 - get.damageEffect(Evt.player, Evt.source, player) * 2 - get.attitude(player, Evt.source);
                },
                filter(Evt, player) {
                    if (!Evt.source || !Evt.source.hasSkill('youyishiyue')) return false;
                    var shi = Evt.source.$.youyishiyue;
                    shi = player.$.youyi || shi;
                    return Evt.source.countGainableCards(player, 'hej', card => card == shi);
                },
                prompt: '是否收回「誓约」牌？',
                logTarget: 'player',
                content() {
                    trigger.changeToZero();
                    player.line(trigger.source, 'thunder');
                    player.gain(player.$.youyi, trigger.source, 'giveAuto');
                }
            },
        },
    },
    youyishiyue: {
        onremove(player) {
            player.removeGaintag('youyishiyue');
        },
        intro: {
            name: '誓约牌',
            content: '当前的「誓约」牌为$当你造成伤害时，湊阿库娅可令你将「誓约」牌交给她以防止之。<br>本回合结束时，你可以弃置「誓约」牌令你或其回复1点体力。',
            onunmark(storage, player) {
                if (storage && storage.length) {
                    game.log(storage, '誓约解除');
                    delete player.$.youyishiyue;
                }
            },
        },
        locked: true,
        mark: 'card',
        group: ['youyishiyue_rec'],
        subSkill: {
            //弃「誓约」牌回复
            rec: {
                trigger: { player: 'phaseEnd' },
                direct: true,
                priority: 80,
                filter(Evt, player) {
                    var shi, damaged = player.isDamaged();
                    game.hasPlayer(cur => {
                        if (cur.hasSkill('youyi')) {
                            if (cur.isDamaged()) damaged = true;
                            shi = cur.$.youyi;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    shi = player.$.youyishiyue || shi;
                    return damaged && player.countDiscardableCards(player, 'hej', card => card == shi);
                },
                content() {
                    'step 0'
                    var shi;
                    var aqua;
                    game.hasPlayer(cur => {
                        if (cur.hasSkill('youyi')) {
                            aqua = cur
                            shi = cur.$.youyi;
                        }
                    });
                    Evt.card = player.$.youyishiyue || shi;
                    player.chooseTarget('让你或她回复一点体力', 1, function (card, player, target) {
                        return [player, _status.event.aqua].contains(target) && target.isDamaged();
                    }).set('ai', function (target) {
                        return get.recoverEffect(target, player, player) + Math.random();
                    }).set('aqua', aqua);
                    'step 1'
                    if (result.bool && result.targets?.length) {
                        Evt.target = result.targets[0];
                        player.discard(Evt.card);
                        player.logSkill('youyishiyue', Evt.target);
                        Evt.target.recover(player);
                    }
                },
            },


        },
    },
    //兔宝
    zhonggong: {
        audio: 'tuquan',
        trigger: { player: 'phaseZhunbeiBegin' },
        frequent: true,
        filter(Evt, player) {
            return player.isMinEquip(true) || player.isMaxEquip(true);
        },
        popup: false,
        content() {
            'step 0'
            if (player.isMinEquip(true)) {
                player.logSkill('zhonggong');
                player.$.zhonggong_mark++;
                player.markSkill('zhonggong_mark');
            }
            if (player.isMaxEquip(true)) {
                player.chooseTarget('###' + get.prompt('zhonggong') + '###：令两名角色横置', 2, function (card, player, target) {
                    return !target.isLinked();
                }).set('ai', function (target) {
                    var player = _status.event.player;
                    if (target == player) return 1;
                    return -get.attitude(player, target) + Math.random();
                });
            }
            'step 1'
            if (result.bool && result.targets?.length) {
                var targets = result.targets;
                player.logSkill('zhonggong', targets)
                while (targets.length) {
                    targets.shift().link(true);
                }
            }
        },
        group: 'zhonggong_mark',
        subSkill: {
            mark: {
                init(player) {
                    player.$.zhonggong_mark = 0;
                },
                intro: {
                    name: '重工',
                    content: '手牌上限+#',
                },
                locked: true,
                mod: {
                    maxHandcard(player, num) {
                        var Buff = (player.$.zhonggong_mark) || 0;
                        return num += Buff;
                    },
                },
            },
        },
    },
    binzhan: {
        audio: 'hongshaoturou',
        filter(Evt, player) {
            return player.countCards('h') != player.getHandcardLimit();
        },
        enable: "phaseUse",
        usable: 1,
        filterCard(Evt, player) {
            if (player.countCards('h') > player.getHandcardLimit()) return true;
            return false;
        },
        selectCard() {
            var player = _status.event.player;
            if (player.countCards('h') > player.getHandcardLimit()) return player.countCards('h') - player.getHandcardLimit();
            return 0;
        },
        content() {
            'step 0'
            if (cards && cards.length) {
                player.chooseTarget([1, cards.length], '『缤绽』：选择角色，对其造成火焰伤害', function (card, player, target) {
                    return player.inRange(target);
                }).set('ai', function (target) {
                    var player = _status.event.target;
                    return get.damageEffect(target, player, player);
                });
            }
            else {
                player.draw(player.getHandcardLimit() - player.countCards('h'));
                Evt.finish();
            }
            'step 1'
            if (result.bool && result.targets?.length) {
                var targets = result.targets;
                player.line2(targets, 'fire');
                while (targets.length) {
                    targets.shift().damage('fire');
                }
            }
        },
        onremove(player, skill) {
            player.removeSkill('hongshaoturou_shao');
        },
        subSkill: {
            viewAs: {
                mod: {
                    cardname(card, player) {
                        if (card.name == 'shan' || card.name == 'tao') return 'jiu';
                        if (get.subtype(card) == 'equip3' || get.subtype(card) == 'equip4' || get.subtype(card) == 'equip6') return 'tiesuo';
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
                    game.broadcastAll(function (player) {
                        if (player.node.hongshaoturou) {
                            player.node.hongshaoturou.delete();
                            delete player.node.hongshaoturou;
                        }
                    }, player);
                },
                filter(Evt, player) {
                    return true;
                },
                content() {
                    player.damage('fire');
                    player.removeSkill('hongshaoturou_shao');
                }
            },
        },
        ai: {
            order: 6,
            result: {
                player(player, target) {
                    if (player.getHandcardLimit() - player.countCards() > 1) return 1.5;
                }
            },
        }
    },
    //Civia
    kuangxin: {
        trigger: { global: 'useCardToPlayered' },
        usable: 1,
        filter(Evt, player) {
            if (Evt.targets.length != 1) return false;
            if (Evt.targets[0] == player) return false;
            return get.tag(Evt.card, 'damage') && Evt.targets[0].countCards('h') && player.countCards('h');
        },
        content() {
            'step 0'
            Evt.target = trigger.targets[0];
            Evt.target.chooseCard('h', true).set('visible', true).set('prompt', get.translation('kuangxin') + '：选择一张牌与对方交换');
            'step 1'
            if (result.bool) {
                Evt.card = result.cards[0];
                player.chooseCard('h', true).set('visible', true).set('prompt', get.translation('kuangxin') + '：选择一张牌与对方交换');
            }
            else {
                Evt.finish();
            }
            'step 2'
            if (result.bool) {
                trigger.targets[0].gain(result.cards[0], player, 'giveAuto');
                player.gain(Evt.card, trigger.targets[0], 'giveAuto');
                trigger.targets[0].addTempSkill('kuangxin2', 'phaseEnd');
                trigger.targets[0].$.kuangxin2.add(trigger.card);
                trigger.targets[0].$.kuangxin2.add(player);
                trigger.targets[0].syncStorage('kuangxin2');
                player.$.kuangxin_draw.add(trigger.card);
                player.$.kuangxin_draw.add(trigger.targets[0]);
            }
        },
        group: ['kuangxin_draw', 'kuangxin_back'],
        subSkill: {
            draw: {
                init(player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = [];
                },
                trigger: { global: 'useCardAfter' },
                forced: true,
                priority: 66,
                filter(Evt, player) {
                    if (!(player.$.kuangxin_draw.contains(Evt.targets[0]) && player.$.kuangxin_draw.contains(Evt.card))) return false
                    if (!Evt.targets[0].$.kuangxin2) return false;
                    return Evt.targets[0].$.kuangxin2.contains(player);
                },
                content() {
                    'step 0'
                    player.chooseTarget('『旷心』：令你或其摸一张牌').set('filterTarget', function (card, player, target) {
                        return target == player || target == player.$.kuangxin_draw[1];
                    });
                    'step 1'
                    if (result.bool && result.targets && result.targets[0]) {
                        result.targets[0].draw(player);
                    }
                },
            },
            back: {
                trigger: { global: 'phaseEnd' },
                forced: true,
                silent: true,
                popup: false,
                content() {
                    if (player.$.kuangxin_draw)
                        player.$.kuangxin_draw = [];
                },

            }
        },
    },
    kuangxin2: {
        firstDo: true,
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        onremove: true,
        trigger: {
            player: ['damage'],
        },
        filter(Evt, player) {
            return player.$.kuangxin2 && Evt.card && player.$.kuangxin2.contains(Evt.card);
        },
        silent: true,
        forced: true,
        popup: false,
        priority: 14,
        content() {
            player.removeSkill('kuangxin2');
        },
    },
    danyan: {
        trigger: { player: 'loseEnd' },
        priority: 22,
        frequent: true,
        filter(Evt, player) {
            var num = 0;
            player.getHistory('sourceDamage', evt => {
                num += evt.num;
            });
            if (num || !Evt.hs.length) return false;
            var canG = 0;
            Evt.hs.forEach(function (car) {
                if (player.hasUseTarget(car)) canG++;
            })
            return canG && (Evt.name == 'cardsDiscard' || (Evt.name == 'lose' && Evt.getParent().name == 'discard'));
        },
        content() {
            'step 0'
            Evt.cards = trigger.hs;
            let next = player.chooseCardButton(1, '『弹言』：选择使用的牌', Evt.cards)
                .set('filterButton', function (button) {
                    var player = _status.event.player;
                    return player.hasUseTarget(button.link);
                })
                .set('ai', function (button) {
                    var player = _status.event.player;
                    return player.getUseValue(button.link);
                });
            'step 1'
            if (result.bool) {
                player.chooseUseTarget(result.links[0], true, 'nopopup');
            }

        },
    },
    qingjie: {
        mod: {
            globalFrom(from, to, distance) {
                if (distance > 1 && !(to.getEquip(3) || to.getEquip(4))) return 1;
            },
            globalTo(from, to, distance) {
                var dist = distance;
                if (to.countCards('h') > from.countCards('h')) {
                    dist += to.countCards('h') - from.countCards('h');
                }
                //					if(to.hp>from.hp){
                //						dist+=to.hp-from.hp;
                //					}
                return dist;
            },
        },
    },
    //Echo
    hangao: {
        enable: 'phaseUse',
        usable: 1,
        //			selectCard:1,
        //			filterCard (card,player){
        //			return get.suit(card)=='spade';
        //			},
        filter(Evt, player) {
            var hangao = player.getCards('he').filter(function (ca) {
                return get.suit(ca) == 'spade';
            });
            return hangao.length;
        },
        position: 'he',
        filterCard(card) {
            return get.suit(card) == 'spade';
        },
        filterTarget(card, player, target) {
            return target != player;
        },
        discard: false,
        visible: true,
        prepare: 'give',
        content() {
            target.gain(cards, player);
            target.$.hangao_houxu = player;
            target.$.hangao = cards[0];
            target.syncStorage('hangao_houxu');
            target.addTempSkill('hangao_houxu', { player: 'phaseAfter' });
        },
        subSkill: {
            houxu: {
                onremove: ['hangao_houxu', 'hangao'],
                marktext: "♠",
                locked: true,
                intro: {
                    name: '函告',
                    content(storage, player, skill) {
                        return '在回合结束时展示手牌';
                    },
                },
                mark: 'character',
                forced: true,
                priority: 42,
                trigger: { player: 'phaseEnd' },
                filter(Evt, player) {
                    return player.$.hangao_houxu.isIn();
                },
                content: [() => {
                    player.showCards(player.getCards('h'), '函告后续');
                    game.delay(0.5);
                }, () => {
                    let history = player.getHistory('useCard');
                    let heaG = 1, diaG = 1;
                    for (let i = 0; i < history.length; i++) {
                        if (history[i].cards[0] == player.$.hangao) diaG = 0;
                        if (!history[i].targets) continue;
                        for (let j = 0; j < history[i].targets.length; j++) {
                            if (history[i].targets[j] == player.$.hangao_houxu) heaG = 0;
                        }
                    }
                    if (heaG) {
                        player.$.hangao_houxu.gain(player, player.getCards('he').filter(ca => {
                            return get.suit(ca) == 'heart';
                        }), 'giveAuto');
                    }
                    if (diaG && !player.getCards('h').contains(player.$.hangao)) {
                        player.$.hangao_houxu.gain(player, player.getCards('he').filter(ca => {
                            return get.suit(ca) == 'diamond';
                        }), 'giveAuto');
                    }
                    player.removeSkill('hangao_houxu');
                }]
            },
        }
    },
    yinglve: {
        trigger: { player: 'phaseJieshuBegin' },
        priority: 42,
        filter(Evt, player) {
            return player.countDisabled() != 5;
        },
        content() {
            'step 0'
            player.chooseToDisable().set('ai', function (Evt, player, list) {
                if (list.contains('equip2')) return 'equip2';
                if (list.contains('equip1') && player.countCards('h', { name: 'sha' }) > 2) return 'equip1';
                if (list.contains('equip5') && player.countCards('h', { type: 'trick' }) >= 1) return 'equip5';
                return list.randomGet();
            });
            'step 1'
            player.chooseUseTarget('###『影掠』###视为使用一张没有距离限制的【顺手牵羊】', { name: 'shunshou' }, true, 'nodistance');
        },
        mod: {
            selectTarget(card, player, range) {
                if (get.name(card) == 'shunshou') {
                    range[1] = player.countDisabled() || range[1];
                }
            },
            attackFrom(from, to, distance) {
                return distance - from.countDisabled();
            },
        },
    },
    //Artia
    shangdong: {
        marktext: "冻",
        locked: true,
        intro: {
            name: '殇冻',
            content(storage, player, skill) {
                return '受到伤害时加' + storage;
            },
        },
        mark: true,
        onremove(player) {
            delete player.$.shangdong;
        },
    },
    shuangzhi: {
        trigger: { global: 'loseAfter' },
        priority: 222,
        direct: true,
        filter(Evt, player) {
            if (Evt.player.$.shuangzhi2 && Evt.player.$.shuangzhi2 >= 2) return false;
            if (Evt.player.isAlive() && Evt.player != player) {
                if (Evt.type == 'discard' && Evt.cards.filterInD('d').length) return true;
            }
        },
        content() {
            'step 0'
            Evt.target = trigger.player;
            Evt.target.addTempSkill('shuangzhi2');
            if (!Evt.target.$.shuangzhi2) Evt.target.$.shuangzhi2 = 0;
            Evt.target.$.shuangzhi2 += trigger.cards.filterInD('d').length;
            if (Evt.target.$.shuangzhi2 < 2) Evt.finish();
            else player.chooseBool(get.prompt2('shuangzhi')).set('ai', function () {
                return get.attitude(player, Evt.target) < 1
            });
            'step 1'
            if (result.bool) {
                player.logSkill('shuangzhi', Evt.target);
                var list = ['受到1点无来源伤害', '受到的伤害+1直到其回合开始']
                Evt.target.chooseControlList('选择其中的一项', list, true, function (Evt, player) {
                    return _status.event.choice;
                }).set('choice', ((_status.currentPhase == Evt.target) ? 0 : 1));
            } else Evt.finish();
            'step 2'
            if (result.index == 0) {
                Evt.target.damage('nosource');
            }
            else {
                Evt.target.addSkill('shangdong');
                Evt.target.addMark('shangdong', 1);
            }
        },
        group: ['shuangzhi_init', 'shuangzhi_addDam'],
        subSkill: {
            init: {
                trigger: { global: 'phaseBefore' },
                forced: true,
                silent: true,
                firstDo: true,
                filter(Evt, player) {
                    return Evt.player.hasMark('shangdong');
                },
                content() {
                    trigger.player.unmarkSkill('shangdong');
                    trigger.player.removeSkill('shangdong');
                    trigger.player.syncStorage('shangdong');
                }
            },
            addDam: {
                trigger: { global: 'damageBegin3' },
                forced: true,
                silent: true,
                firstDo: true,
                filter(Evt, player) {
                    return Evt.player.hasMark('shangdong');
                },
                content() {
                    trigger.num += trigger.player.countMark('shangdong');
                },
            },
        },
    },
    shuangzhi2: {
        onremove(player) {
            delete player.$.shuangzhi2;
        },
    },
    xiwo: {
        trigger: { global: 'roundStart' },
        priority: 222,
        round: 1,
        filter(Evt, player) {
            return game.players.length - 1;
        },
        content() {
            'step 0'
            let next = player.chooseTarget(2, function (card, player, target) {
                return true;
            })
                .set('targetprompt', ['失去体力', '回复体力'])
                .set('prompt', '指定两名角色，分别失去一点体力和回复一点体力')
                .set('ai', function (target) {
                    var player = _status.event.player;
                    var att = get.attitude(player, target);
                    var sgnatt = get.sgn(att);
                    if (ui.selected.targets.length == 0) {
                        if (target.hp == 1 && sgnatt <= 0) {
                            return 9;
                        } else if (target.hp == 1 && sgnatt >= 1) {
                            return -10;
                        } else {
                            return 9 - att
                        }
                    } else {
                        if (target.hp == target.maxHp && sgnatt <= 0) {
                            return 9;
                        } else if (target.hp < target.maxHp && sgnatt >= 1) {
                            return 7;
                        } else if (target.hp < target.maxHp && sgnatt <= 0) {
                            return -10;
                        } else {
                            return 9 - att;
                        }
                    }
                });
            'step 1'
            if (result.bool && result.targets?.length) {
                player.logSkill('xiwo', result.targets);
                result.targets[0].loseHp();
                result.targets[0].addTempSkill('xiwo_lose', 'roundEnd');
                result.targets[1].recover();
                result.targets[1].addTempSkill('xiwo_gain', 'roundEnd');
            }
        },
    },
    xiwo_lose: {
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        marktext: "握",
        locked: true,
        intro: {
            name: '生化之握-',
            content: '在轮次结束时回复体力',
        },
        mark: true,
        forced: true,
        priority: 420,
        onremove(player) {
            if (player.isDamaged()) {
                game.log('『希握』后续效果');
            }
            game.delay(0.5);
            player.recover('nosource');
        },
        content() {
        }
    },
    xiwo_gain: {
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        marktext: "握",
        locked: true,
        intro: {
            name: '生化之握+',
            content: '在轮次结束时失去体力',
        },
        mark: true,
        forced: true,
        priority: 420,
        onremove(player) {
            game.log('『希握』后续效果');
            game.delay(0.5);
            player.loseHp();
        },
        content() {
        }
    },
    //Doris
    shenhai: {
        marktext: '海',
        intro: {
            name: "光辉深海",
            content: "<li>当前回合发动技能次数：#",
        },
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = 0;
        },
        trigger: { player: 'useCard2' },
        priority: 42,
        filter(Evt, player) {
            if (get.type(Evt.card) == 'delay' || !Evt.targets) return false;
            if (!player.getLastUsed(1)) return false;
            var num = player.$.paomo_contains.length ? player.$.paomo_contains[0] : get.number(player.getLastUsed(1).card);
            if (player.$.paomo_contains && player.$.paomo_contains.length) {
                player.unmarkSkill('paomo_contains');
                player.$.paomo_contains.length = 0;
            }
            return get.number(Evt.card) && get.number(Evt.card) > num;
        },
        frequent: true,
        content() {
            'step 0'
            if (player.$.shenhai >= 3) {
                var list = ['令一名其他角色使用', '额外结算一次', '增加或减少一个目标'];
                player.chooseControlList(list, true, function () {
                    return 1;
                });
                Evt.goto(1);
            } else {
                if (get.type(trigger.card) == 'equip') {
                    Evt.goto(5);
                }
                else if (get.type(trigger.card) == 'basic') {
                    Evt.goto(7);
                }
                else if (get.type(trigger.card) == 'trick') {
                    Evt.goto(2);
                }
            }
            'step 1'
            if (!result.bool && player.$.shenhai < 3) {
                Evt.finish();
            }
            if (result.index == 0) {
                Evt.goto(5);
            }
            else if (result.index == 1) {
                Evt.goto(7);
            }
            else if (result.index == 2) {
                Evt.goto(2);
            }
            'step 2'//改变目标
            var prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标';
            player.chooseTarget(get.prompt('shenhai'), function (card, player, target) {
                var player = _status.event.player;
                if (_status.event.targets.contains(target)) return true;
                return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
            }).set('prompt2', prompt2).set('ai', function (target) {
                var trigger = _status.event.getTrigger();
                var player = _status.event.player;
                return get.effect(target, trigger.card, player, player) * (_status.event.targets.contains(target) ? -1 : 1);
            }).set('targets', trigger.targets).set('card', trigger.card);
            'step 3'
            if (result.bool) {
                player.$.shenhai++;
                player.markSkill('shenhai');
                if (!Evt.isMine()) game.delayx();
                Evt.targets = result.targets;
            }
            'step 4'
            if (Evt.targets) {
                player.logSkill('shenhai', Evt.targets);
                if (trigger.targets.contains(Evt.targets[0])) trigger.targets.removeArray(Evt.targets);
                else trigger.targets.addArray(Evt.targets);
            }
            Evt.finish();
            'step 5'//改变使用者
            player.chooseTarget('令一名其他角色使用', function (card, player, target) {
                if (!target.hasUseTarget(trigger.card)) return false;
                return target != player;
            }).set('ai', function (target) {
                var player = _status.event.player;
                var card = _status.event.card;
                return target.getUseValue(card) * get.attitude(player, target);
            }).set('card', trigger.card);
            'step 6'
            if (result.targets?.length) {
                player.$.shenhai++;
                player.markSkill('shenhai');
                Evt.target = result.targets[0];
                player.logSkill('shenhai', Evt.target)
                trigger.cancel();
                Evt.target.chooseUseTarget(trigger.card, trigger.cards)
            }
            Evt.finish();
            'step 7'//改变结算
            player.$.shenhai++;
            player.markSkill('shenhai');
            player.$.shenhai_jiesuan = [];
            player.$.shenhai_jiesuan.add(trigger.card);
            Evt.finish();
        },
        mod: {
            aiOrder(player, card, num) {
                if (typeof card == 'object' && player == _status.currentPhase && get.number(card)) {
                    var cards = player.getCards('h');
                    var numx = 0
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i] != card && get.number(cards[i]) > get.number(card) && player.getCardUsable(cards[i]) && player.hasUseTarget(cards[i])) {
                            numx++;
                        }
                    }
                    if (get.type(card) == 'equip') return num + 4 * numx;
                    return num + 8 * numx;
                }
            },
        },
        group: ['shenhai_jiesuan', 'shenhai_clear'],
        subSkill: {
            jiesuan: {
                init(player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = [];
                },
                trigger: { player: 'useCardAfter' },
                forced: true,
                priority: 42,
                filter(Evt, player) {
                    if (get.type(Evt.card) == 'delay') return false;
                    return player.$.shenhai_jiesuan[0] == Evt.card;
                },
                content() {
                    let card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
                    player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = trigger.skill || 'shenhai_jiesuan';
                }
            },
            clear: {
                trigger: { player: 'phaseEnd' },
                forced: true,
                silent: true,
                priority: 42,
                content() {
                    player.unmarkSkill('shenhai');
                    player.$.shenhai_jiesuan.length = 0;
                    player.$.shenhai = 0;
                }
            }
        }
    },
    paomo: new toSkill('trigger', {
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        priority: 42,
        filter(Evt, player) {
            if (player != _status.currentPhase || player == Evt.player) return false;
            return !player.$.paomo.contains(Evt.player) && player.getLastUsed(1) && get.number(Evt.card);
        },
        check(Evt, player) {
            return get.$a(player, Evt.player) > 0
        },
        content() {
            player.$.paomo.add(trigger.player);
            if (player.getLastUsed(1)) {
                if (player.$.paomo_contains && player.$.paomo_contains.length) player.$.paomo_contains.length = 0;
                player.$.paomo_contains.add(get.number(trigger.card));
                player.markSkill('paomo_contains');
            }
            player.draw();
            trigger.player.draw();
        },
        ai: {
            combo: 'shenhai'
        },
        group: ['paomo_contains', 'paomo_init'],
        subSkill: {
            contains: {
                marktext: '恋',
                intro: {
                    name: "泡沫爱恋",
                    content(storage, player, skill) {
                        if (storage) return "<li>上一张使用的牌点数变为" + get.translation(storage);
                        return "<li>当前回合未发动技能";
                    },
                },
                init(player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = [];
                },
                mark: true,
            },
            init: {
                trigger: { player: 'phaseEnd' },
                forced: true,
                silent: true,
                priority: 42,
                content() {
                    player.unmarkSkill('paomo_contains');
                    player.$.paomo_contains.length = 0;
                    player.$.paomo.length = 0;
                }
            }
        }
    }).setT({ global: 'useCardAfter' }),
    //Yogiri
    shisang: {
        trigger: { player: 'useCard1' },
        priority: 42,
        check(Evt, player) {
            var eff1 = 0, eff2 = 0;
            for (var i = 0; i < Evt.targets; i++) {
                eff1 += get.effect(Evt.targets[i], Evt.card, player, player)
                eff2 += get.recoverEffect(Evt.targets[i], player, player);
            }
            return (eff2 - eff1) > 0;
        },
        filter(Evt, player) {
            return player.isPhaseUsing() && !player.hasSkill('shisang_used') && Evt.targets && Evt.targets.length;
        },
        prompt2(Evt, player) {
            if (player.hasSkill('wanjie_change')) return '出牌阶段限一次，可以将此牌的效果改为 <font color=#fc8>受到你造成的1点伤害</font>';
            return '出牌阶段限一次，可以将此牌的效果改为 令目标回复1点体力';
        },
        content() {
            'step 0'
            player.addTempSkill('shisang_used', 'phaseUseEnd');
            if (!trigger.addedSkill) trigger.addedSkill = [];
            trigger.addedSkill.add('shisang');
            //		if(player.$.shisang_clear)	delete player.$.shisang_clear;
            if (player.$.shisang2) delete player.$.shisang2;
            lib.skill.shisang2.trigger = { player: [get.name(trigger.card) + 'Begin'/** ,get.name(trigger.card)+'ContentBefore'*/] };
            'step 1'
            player.$.shisang2 = trigger.card;
            player.addTempSkill('shisang2', { player: 'useCardAfter' });
            /*		if(player.hasSkill('wanjie_change')){
                        trigger.getParent().setContent(function(){
                            targets.forEach(function(target){
                                target.damage(player);
                            })
                        });
                    }else{
                        trigger.getParent().setContent(function(){
                            targets.forEach(function(target){
                                target.recover();
                            })
                        });
                    }
                */
            /*		player.$.shisang_clear = get.info(trigger.card).content;
                    if(player.hasSkill('wanjie_change')){
                        get.info(trigger.card).content = function(){
                            target.damage(player);
                        }
                    }else{
                        get.info(trigger.card).content = function(){
                            target.recover();
                        }
                    }
                    'step 2'
                    if(get.itemtype(trigger.card)=='card'){
                        let next = game.createEvent('sanchaji_clear');
                        next.card = trigger.card;
                        next.cardContent = player.$.shisang_clear;
                        Evt.next.remove(next);
                        trigger.after.push(next);
                        next.setContent(function(){
                            get.info(next).content = cardContent;
                        });
                    }
                */
        },
        //	group:'shisang_clear',
        subSkill: {
            used: {},
            clear: {
                trigger: { global: ['damage', 'damageZero', 'recoverEnd', 'useCardEnd'] },
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    return false;
                    if (!player.hasSkill('shisang_used')) return false;
                    if ((Evt.name == 'useCard' && Evt.addedSkill && Evt.addedSkill.contains('shisang'))) return true;
                    if (!(Evt.getParent(2).addedSkill && Evt.getParent(2).addedSkill.contains('shisang'))) return false;
                    return (Evt.player == Evt.getParent(2).targets[Evt.getParent(2).targets.length - 1]);
                },
                content() {
                    if (get.info(trigger.card).content != player.$.shisang_clear) {
                        get.info(trigger.card).content = player.$.shisang_clear;
                    }
                },
            },
        }
    },
    shisang2: {
        trigger: { global: 'Xbegin' },
        forced: true,
        silent: true,
        popup: false,
        filter(Evt, player) {
            return Evt.card == player.$.shisang2;
        },
        content() {
            if (player.hasSkill('wanjie_change')) {
                trigger.setContent(function () {
                    target.damage(player);
                });
            } else {
                trigger.setContent(function () {
                    target.recover();
                });
            }
        },
    },
    wanjie: {
        enable: 'phaseUse',
        filterCard: true,
        selectCard: -1,
        discard: false,
        lose: false,
        filter(Evt, player) {
            return player.isPhaseUsing() && !player.hasSkill('wanjie_used') && player.countDiscardableCards(player, 'h');
        },
        content() {
            'step 0'
            player.showHandcards();
            player.chooseCard(true, lib.filter.cardDiscardable, 
                '###『腕解』选择一种颜色的牌弃置###若弃置黑色，你摸两张牌；若弃置红色，本回合『食尚』的“回复1点体力”改为“受到你造成的1点伤害”')
                .set('ai', card => {
                    var player = _status.event.player;
                    var cardTo = player.getCards('h', { color: 'black' });
                    return cardTo.contains(card);
                });
            'step 1'
            if (result.bool) {
                player.discard(player.getCards('h', card => get.color(card) == get.color(result.cards[0])));
                if (get.color(result.cards[0]) == 'black') {
                    player.draw(2);
                }
                if (get.color(result.cards[0]) == 'red') {
                    player.addTempSkill('wanjie_change');
                }
            }
            player.addTempSkill('wanjie_used', 'phaseUseEnd');
        },
        ai: {
            order(item, player) {
                return 5;
            },
            result: {
                player(player, target) {
                    var cardTo = player.countCards('h', { color: 'black' });
                    if (cardTo == 1) return 1;
                    if (cardTo == 0) return -player.countCards('h', { color: 'red' });
                    return 0;
                },
            }
        },
        subSkill: {
            used: {},
            change: {},
        }
    },
    //蘑菇人
    maoge: {
        marktext: '书',
        intro: {
            mark(dialog, storage, player) {
                if (player.countCards('s', card => card.hasGaintag('maoge')))
                    dialog.addAuto(player.getCards('s', card => card.hasGaintag('maoge')));
            },
            markcount(storage, player) {
                return player.countCards('s', card => card.hasGaintag('maoge'));
            },
            onunmark(storage, player) {
                var cards = player.getCards('s', card => card.hasGaintag('maoge'));
                if (cards.length) {
                    player.lose(cards, ui.discardPile);
                    player.$throw(cards, 1000);
                    game.log(cards, '进入了弃牌堆');
                }
            },
        },
        cardAround(player) {
            return player.getCards('s', card => card.hasGaintag('maoge'));
        },
        hiddenCard(player, name) {
            if (player.countCards('s', card => card.hasGaintag('maoge')) > player.countCards('h')) {
                if (player.countCards('s', card => card.hasGaintag('maoge') && get.name(card) === name)) return true
            }
        },
        trigger: { global: 'phaseLoopBefore', player: ['drawBegin', 'enterGame'] },
        forced: true,
        silent: true,
        popup: false,
        lastDo: true,
        content() {
            'step 0'
            if (['game', 'phaseLoop'].contains(trigger.name)) {
                var cards = player.getCards('h');
                player.loseToSpecial(cards, 'maoge');
            } else {
                var cards = get.cards(trigger.num);
                player.$draw(cards.length);
                player.directgains(cards, null, 'maoge');
                trigger.changeToZero();
            }
            game.log(player, '获得了' + get.cnNumber(cards.length) + '张「书」');
            'step 1'
            player.markSkill('maoge');
        },
        mod: {
            cardEnabled2(cardx, player) {
                if (player.countCards('s', card => card.hasGaintag('maoge')) > player.countCards('h')) {
                    if (get.position(cardx) != 's' || !cardx.hasGaintag('maoge')) return false;
                }
                else {
                    if (get.position(cardx) == 's' && cardx.hasGaintag('maoge')) return false;
                }
            }
        },
        group: 'maoge_drawPhase',
        subSkill: {
            drawPhase: {
                trigger: { player: 'phaseDrawBegin2' },
                forced: true,
                filter(Evt, player) {
                    return player.countCards('s', card => card.hasGaintag('maoge')) < player.countCards('h') && !Evt.numFixed;
                },
                content() {
                    trigger.num++;
                }
            },
        },
    },
    bianlan: {
        trigger: { player: 'useCard2' },
        filter(Evt, player) {
            if (player.countCards('s', card => card.hasGaintag('maoge'))) return Evt.targets && Evt.targets.length;
            return false;
        },
        forced: true,
        silent: true,
        popup: false,
        lastDo: true,
        content() {
            'step 0'
            player.chooseButton(['###是否发动『遍览』？###选择一种花色的「书」', player.getCards('s', card => card.hasGaintag('maoge'))]).set('filterButton', function (button) {
                return true;
            });
            'step 1'
            if (result.bool) {
                player.logSkill('bianlan')
                Evt.suit = get.suit(result.links[0]);
                Evt.targets = trigger.targets;
                {
                    let shus = player.getCards('s', card => card.hasGaintag('maoge') && get.suit(card) == Evt.suit);
                    player.showCards(shus, '获得一种花色的「书」');
                    game.delayx();
                    player.lose(shus, ui.special).set('getlx', false);
                    player.gain(shus, 'giveAuto');
                    player.updateMarks();
                }
            } else {
                Evt.finish();
            }
            'step 2'
            if (game.hasPlayer(cur => Evt.targets.contains(cur) && !player.$.bianlan.contains(cur))) {
                player.chooseTarget('###『遍览』###可以令一名目标摸一张牌', function (card, player, target) {
                    return _status.event.targets.contains(target) && !player.$.bianlan.contains(target);
                }).set('targets', Evt.targets);
            } else {
                Evt.finish();
            }
            'step 3'
            if (result.bool && result.targets?.length) {
                Evt.target = result.targets[0];
                player.line(Evt.target);
                player.storage[Evt.name].add(Evt.target);
                Evt.target.draw();
            }
        },
        ai: {
            combo: 'maoge',
        },
        group: 'bianlan_init',
        subSkill: {
            init: {
                trigger: { global: ['gameDrawAfter', 'phaseAfter'], player: 'enterGame' },
                forced: true,
                silent: true,
                popup: false,
                lastDo: true,
                content() {
                    player.$.bianlan = [];
                },
            },
        },
    },
    futian: {
        trigger: { player: 'phaseBegin' },
        limited: true,
        unique: true,
        skillAnimation: true,
        animationColor: 'fire',
        filter(Evt, player) {
            return player.countCards('s', card => card.hasGaintag('maoge'));
        },
        check(Evt, player) {
            return player.countCards('s', card => card.hasGaintag('maoge')) > 6;
        },
        content() {
            'step 0'
            player.$.futian = true;
            player.awakenSkill(Evt.name);
            Evt.hc = player.getCards('h');
            Evt.shus = player.getCards('s', card => card.hasGaintag('maoge'));
            player.addTempSkill('futian_futian');
            'step 1'
            player.loseToSpecial(Evt.hc, 'maoge');
            'step 2'
            player.updateMarks();
            player.showCards(Evt.shus, '获得所有的「书」');
            game.delayx();
            'step 3'
            player.lose(Evt.shus, ui.special).set('getlx', false);
            player.$giveAuto(Evt.shus, player);
            'step 4'
            player.gain(Evt.shus);
            game.delay(1)
        },
        ai: {
            combo: 'maoge',
        },
        subSkill: {
            futian: {
                init(player, skill) {
                    player.storage[skill] = [];
                },
                hiddenCard(player, name) {
                    if (player.countCards('s', card => card.hasGaintag('maoge')) > player.countCards('h')) return false;
                    var list = get.inpile('trick', card => {
                        var player = _status.event.player;
                        if (player.$.futian_futian.contains(card)) return false;
                        return true;
                    });
                    for (var i = 0; i < list.length; i++) {
                        if (list[i] == name) return true;
                    }
                    return false;
                },
                enable: 'chooseToUse',
                filter(Evt, player) {
                    return player.countCards('he') >= 2 && player.countCards('s', card => card.hasGaintag('maoge')) <= player.countCards('h');
                },
                chooseButton: {
                    dialog(Evt, player) {
                        var list = get.inpile('trick', card => {
                            if (player.$.futian_futian.contains(card)) return false;
                            return true;
                        });
                        for (var i = 0; i < list.length; i++) {
                            list[i] = ['锦囊', '', list[i]];
                        }
                        if (list.length == 0) {
                            return ui.create.dialog('『覆天』已无可用牌');
                        }
                        console.log(player, ui.create.dialog)
                        return ui.create.dialog('『覆天』', [list, 'vcard']);
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
                            filterCard: true,
                            selectCard: 2,
                            popname: true,
                            check(card) {
                                return 6 - get.value(card);
                            },
                            position: 'he',
                            viewAs: { name: links[0][2] },
                            onuse(result, player) {
                                player.$.futian_futian.add(result.card.name);
                            },
                        }
                    },
                    prompt(links, player) {
                        return '###『覆天』###将两张牌当做【' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '】使用';
                    }
                },
            },
        },
    },

}