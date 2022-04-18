import { toSkill } from './skilltype'
let { game, ui, get, ai, lib, _status } = window.vkCore
export default {
    ailian: {
        audio: 1,
        enable: 'phaseUse',
        position: 'h',
        filter(Evt, player) {
            if (player.hasSkill('ailianUsable')) return false;
            return player.countCards('h') > 0;
        },
        content() {
            'step 0'
            if (!player.$.targets) player.$.targets = [];
            if (player.countCards('h') > 0) {
                player.chooseTarget('指定一个给予牌的目标', function (card, player, target) {
                    if (target == player) return false;
                    if (player.$.targets) {
                        for (var i = 0; i < player.$.targets.length; i++) {
                            if (player.$.targets[i] == target) {
                                return false;
                            }
                        }
                        return true
                    }
                    else {
                        return true
                    }
                }, function (target) {
                    var player = _status.event.player;
                    if (get.attitude(player, target) <= 0) return 0;
                    else return get.attitude(player, target);
                });
            }
            else {
                Evt.goto(3);
            }
            'step 1'
            //console.log(result);
            if (result?.bool) {
                if (result.targets) {
                    if (!player.$.targets) player.$.targets = [];
                    if (!Evt.targets.contains(result.targets[0])) {
                        Evt.targets.addArray(result.targets);
                        player.$.targets.addArray(result.targets);
                    }
                    Evt.target = result.targets[0];
                }
                player.chooseCard(true, 'h', '选择要交给' + get.translation(Evt.target) + '的牌', [1, Infinity]).set('ai', card => {
                    if (player.isZhu) return 6 - get.useful(card);
                    return 7 - get.useful(card);
                })
            }
            else {
                Evt.goto(3);
            }
            'step 2'
            if (result.bool == true) {
                Evt.cards.addArray(result.cards);
                Evt.target.gain(result.cards, Evt.player, 'give');
                if (player.countCards('h')) {
                    Evt.goto(0);
                }
            }
            else {
                Evt.targets.pop();
                player.$.targets.pop();
            }
            'step 3'
            var difType = true;
            var TypeList = [];
            if (Evt.targets && Evt.targets.length > 0) {
                for (var i = 0; i < Evt.cards.length; i++) {
                    TypeList.add(get.type(Evt.cards[i]));
                    if (TypeList.indexOf(get.type(Evt.cards[i])) != i) {
                        difType = false;
                        break;
                    }
                }
            }
            else {
                Evt.goto(10);
            }
            if (difType == false) {
                Evt.goto(6);
            }
            'step 4'
            player.chooseTarget('是否令' + Evt.cards.length.toString() + '名角色横置？', Evt.cards.length, function (card, player, target) {
                return true;
            }).set('ai', function (target) {
                var player = _status.event.player;
                return get.effect(target, { name: 'tiesuo' }, player, player);
            });
            'step 5'
            if (result.bool == true) {
                result.targets.forEach(element => element.link());
            }
            'step 6'
            var distanceGroup = false;
            for (var i = 0; i < Evt.targets.length; i++) {
                distanceGroup = false;
                for (var j = 0; j < Evt.targets.length; j++) {
                    if (i == j) {
                        continue;
                    }
                    else if (get.distance(player.$.targets[i], player.$.targets[j], 'pure') == 1) {
                        distanceGroup = true;
                        break;
                    }
                }
                if (distanceGroup == false) {
                    break;
                }
            }
            if (distanceGroup == false) {
                Evt.goto(10);
            }
            'step 7'
            if (Evt.targets.length > 1) {
                Evt.num = Evt.targets.length;
                let list = [];
                for (let i of get.inpile('basic')) {
                    if (lib.filter.cardUsable({ name: i }, player, Evt.getParent('chooseToUse')) && player.hasUseTarget(i)) {
                        list.push(['基本', '', i]);
                        if (i == 'sha') {
                            list.push(['基本', '', 'sha', 'fire']);
                            list.push(['基本', '', 'sha', 'thunder']);
                            list.push(['基本', '', 'sha', 'ice']);
                        }
                    }
                }
                if (list.length) {
                    player.chooseButton(['是否视为使用一张基本牌？', [list, 'vcard']]).set('ai', function (button) {
                        var player = _status.event.player;
                        var card = { name: button.link[2], nature: button.link[3] };
                        switch (card.name) {
                            case 'tao':
                                if (player.hp == 1 || (player.hp == 2 && !player.hasShan()) || player.needsToDiscard()) {
                                    return 5;
                                }
                                return 1 + Math.random();
                            case 'sha':
                                if (game.hasPlayer(cur => {
                                    return player.canUse(card, cur) && get.effect(cur, card, player, player) > 0
                                })) {
                                    if (card.nature == 'fire') return 2.95;
                                    if (card.nature == 'thunder' || card.nature == 'ice') return 2.92;
                                    return 2.9;
                                }
                                return 0;
                            case 'jiu':
                                if (player.getCardUsable('sha') == 0 || !player.hasSha() || !player.hasUseTarget('sha')) return 0;
                                return 0.8 + Math.random();
                            case 'qi':
                                if (player.isDamaged()) return 1.1 + Math.random();
                                return 0.1;
                            default: return 0;
                        }
                    });
                }
            }
            else {
                Evt.goto(10);
            }
            'step 8'
            if (result.control != 'cancel2') {
                let usecard = { name: result.links[0][2], nature: result.links[0][3] };
                Evt.usecard = usecard;
                player.chooseTarget('选择至多' + Evt.targets.length.toString() + '个目标', [1, Evt.num], function (card, player, target) {
                    return lib.filter.targetEnabled(_status.event.card, player, target)
                }).set('ai', function (target) {
                    var player = _status.event.player;
                    var card = _status.event.card;
                    return get.effect(target, card, player, player);
                }).set('card', Evt.usecard);
            }
            else {
                Evt.goto(10);
            }
            'step 9'
            //console.log(result);
            if (result.targets)
                Evt.targets = result.targets;
            else Evt.targets = [];
            player.useCard(Evt.usecard, Evt.targets, true);
            'step 10'
            if (Evt.targets && Evt.targets.length == 0 && Evt.cards.length == 0) {
                if (player.hasSkill('ailianUsable')) player.removeSkill('ailianUsable');
            }
            else {
                player.addSkill('ailianUsable');
                delete player.$.targets;
                Evt.finish();
            }
        },
        ai: {
            order(skill, player) {
                if (game.hasPlayer(cur => {
                    return cur != player && get.attitude(player, cur) > 0;
                })) {
                    if (player.needsToDiscard()) {
                        return 1 + Math.random();
                    }
                    return 5 + Math.random();
                }
                else return 0;
            },
            result: {
                player(player, target) {
                    if (player.needsToDiscard()) return Math.random();
                    return Math.random() - 0.6;
                }
            },
            threaten: 0.8
        },
    },
    ailianUsable: {
        trigger: { global: ['phaseUseAfter', 'phaseAfter'] },
        silent: true,
        filter(Evt) {
            return Evt.skill != 'ailian';
        },
        content() {
            player.removeSkill('ailianUsable');
        }
    },
    qixu: {
        unique: true,
        group: ['qixu1', 'qixu2', 'qixu4'],
        zhuSkill: true,
    },
    qixu1: {
        trigger: { player: ['chooseToRespondBefore'] },
        check(Evt) {
            if (Evt.qixu) return false;
            return true;
        },
        filter(Evt, player) {
            if (Evt.responded) return false;
            //if(player.$.qixuing) return false;
            if (!player.hasZhuSkill('qixu')) return false;
            if (player.hasSkill('qixu3')) return false;
            if (!Evt.filterCard({ name: 'sha' }, player, Evt)) return false;
            return game.hasPlayer(cur => {
                return cur != player;
            });
        },
        content() {
            "step 0"
            if (!player.hasSkill('qixu3'))
                player.addSkill('qixu3');
            if (Evt.current == undefined) Evt.current = player.next;
            if (Evt.current == player) {
                Evt.getParent(2).step = 0;
                Evt.finish();
            }
            else if (Evt.current) {
                //player.$.qixuing=true;
                let next = Evt.current.chooseCard(get.translation(player) + '声明使用一张杀，是否替弃置一张杀阻止',
                    function (card, player, Evt) {
                        Evt = Evt || _status.event;
                        return card.name == 'sha';
                    }, { name: 'sha' }, 1);
                next.set('ai', function () {
                    var Evt = _status.event;
                    return (get.attitude(Evt.player, Evt.source) + 1);
                });
                next.set('source', player);
                next.set('qixu', true);
                next.set('skillwarn', '阻止' + get.translation(player) + '打出一张杀');
                next.noOrdering = true;
                next.autochoose = lib.filter.autoRespondSha;
            }
            else {
                Evt.current = Evt.current.next;
                Evt.redo();
            }
            "step 1"
            //player.$.qixuing=false;
            if (!result.bool) {
                Evt.current = Evt.current.next;
                if (Evt.current == player) {
                    Evt.goto(2);
                }
                else {
                    Evt.goto(0);
                }
            }
            else {
                Evt.current.discard(result.cards);
                Evt.finish();
            }
            'step 2'
            trigger.result = { bool: true, card: { name: 'sha', isCard: true } };
            trigger.responded = true;
            trigger.animate = false;
            if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
                Evt.current.ai.shown += 0.3;
                if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
            }
            Evt.finish();
        }
    },
    qixu2: {
        enable: 'chooseToUse',
        prompt: '选择一名目标角色。若其他角色不弃置【杀】响应，则视为你对其使用【杀】。',
        filter(Evt, player) {
            if (Evt.filterCard && !Evt.filterCard({ name: 'sha' }, player, Evt)) return false;
            if (!player.hasZhuSkill('qixu')) return false;
            if (player.hasSkill('qixu3')) return false;
            if (!lib.filter.cardUsable({ name: 'sha' }, player)) return false;
            return game.hasPlayer(cur => {
                return cur != player;
            });
        },
        filterTarget(card, player, target) {
            if (_status.event._backup &&
                typeof _status.event._backup.filterTarget == 'function' &&
                !_status.event._backup.filterTarget({ name: 'sha' }, player, target)) {
                return false;
            }
            return player.canUse({ name: 'sha' }, target);
        },
        content() {
            "step 0"
            if (!player.hasSkill('qixu3'))
                player.addSkill('qixu3');
            if (Evt.current == undefined) Evt.current = player.next;
            if (Evt.current == player) {
                Evt.getParent(2).step = 0;
                Evt.finish();
            }
            else if (Evt.current) {
                let next = Evt.current.chooseCard(get.translation(player) + '对' + get.translation(target) + '使用一张杀，是否替弃置一张杀阻止',
                    function (card, player, Evt) {
                        Evt = Evt || _status.event;
                        return card.name == 'sha';
                    }, { name: 'sha' }, 1);
                next.set('ai', card => {
                    var Evt = _status.event;
                    return -get.effect(Evt.target, card, Evt.source, Evt.player);
                });
                next.set('source', player);
                next.set('target', target);
                next.set('qixu', true);
                next.set('skillwarn', '阻止' + get.translation(player) + '打出一张杀');
                //next.noOrdering=true;
                //next.autochoose=lib.filter.autoRespondSha;
            }
            else {
                Evt.current = Evt.current.next;
                Evt.redo();
            }
            "step 1"
            if (result.bool) {
                Evt.current.discard(result.cards);
                Evt.finish();
            }
            else {
                Evt.current = Evt.current.next;
                if (Evt.current == player) {
                    Evt.getParent(2).step = 0;
                    Evt.goto(2);
                }
                else {
                    Evt.goto(0);
                }
            }
            'step 2'
            if (result.cards && result.cards.length) {
                player.useCard({ name: 'sha', isCard: true }, result.cards, target).animate = false;
            }
            else {
                player.useCard({ name: 'sha', isCard: true }, target).animate = false;
            }
            if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
                Evt.current.ai.shown += 0.3;
                if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
            }
        },
        ai: {
            respondSha: true,
            skillTagFilter(player) {
                if (!player.hasZhuSkill('qixu')) return false;
                return true;
            },
            result: {
                target(player, target) {
                    if (player.hasSkill('qixu3')) return 0;
                    return get.effect(target, { name: 'sha' }, player, target);
                }
            },
            order() {
                return get.order({ name: 'sha' }) - 0.1;
            },
        }
    },
    qixu3: {
        trigger: {
            global: 'roundStart'
        },
        mark: true,
        intro: { content: '一轮后重置(杀)' },
        silent: true,
        // filter(Evt){
        // 	return Evt.skill!='qixu2'&&Evt.skill!='qixu4';
        // },
        content() {
            player.removeSkill('qixu3');
        }
    },
    qixu4: {
        unique: true,
        trigger: { player: ['chooseToRespondBefore', 'chooseToUseBefore'] },
        filter(Evt, player) {
            if (Evt.responded) return false;
            //if(player.$.qixu4) return false;
            if (!player.hasZhuSkill('qixu')) return false;
            if (player.hasSkill('qixu5')) return false;
            if (!Evt.filterCard({ name: 'shan' }, player, Evt)) return false;
            return true;
        },
        check(Evt, player) {
            if (get.damageEffect(Evt.player, player, player) < 0) return true;
            return true;
        },
        content() {
            "step 0"
            player.addSkill('qixu5');
            if (Evt.current == undefined) Evt.current = player.next;
            if (Evt.current == player) {
                Evt.goto(2);
            }
            else if (Evt.current) {
                //player.$.qixu4=true;
                // var next=Evt.current.chooseToDiscard('弃置一张闪阻止'+get.translation(player)+'发动技能？',{name:'shan'},
                // function(card,player,Evt){
                // 	Evt=Evt||_status.event;
                // 	return card.name=='shan';
                // },1);
                let next = Evt.current.chooseCard(get.translation(player) + '声明使用一张闪，是否替弃置一张闪阻止', { name: 'shan' },
                    // function(card,player,Evt){
                    // 	return card.name=='shan';
                    // },
                    1, false);
                // next.set('ai',card => {
                // 	var Evt=_status.event;
                // 	return get.effect(Evt.target,card,Evt.event.source,Evt.player);
                // });
                next.set('ai', function () {
                    var Evt = _status.event;
                    return (3 - get.attitude(Evt.player, Evt.source));
                });
                next.set('skillwarn', '阻止' + get.translation(player) + '技能生效');
                next.autochoose = lib.filter.autoRespondShan;
                next.set('source', player);
            }
            "step 1"
            //player.$.qixu4=false;
            //console.log(result);
            if (result.bool) {
                Evt.current.discard(result.cards);
                Evt.finish();
            }
            else {
                Evt.current = Evt.current.next;
                if (Evt.current == player) {
                    Evt.goto(2);
                }
                else {
                    Evt.goto(0);
                }
            }
            'step 2'
            trigger.result = { bool: true, card: { name: 'shan', isCard: true } };
            trigger.responded = true;
            trigger.animate = false;
            //player.addSkill('qixu3');
            if (typeof Evt.current.ai.shown == 'number' && Evt.current.ai.shown < 0.95) {
                Evt.current.ai.shown += 0.3;
                if (Evt.current.ai.shown > 0.95) Evt.current.ai.shown = 0.95;
            }
            Evt.finish();
        },
        ai: {
            respondShan: true,
            skillTagFilter(player) {
                if (player.$.qixu) return false;
                if (!player.hasZhuSkill('qixu')) return false;
                return true;
            },
        },
    },
    qixu5: {
        trigger: {
            global: 'roundStart'
        },
        mark: true,
        intro: { content: '一轮后重置(闪)' },
        silent: true,
        // filter(Evt){
        // 	return Evt.skill!='qixu2'&&Evt.skill!='qixu4';
        // },
        content() {
            player.removeSkill('qixu5');
        }
    },
    homolive: new toSkill('mark', {
        marktext: '木毛',
        intro: {
            name: 'Homolive',
            content: '我一直都是Homolive的一员啊！'
        },
    }),
    rongyuchengyuan: new toSkill('trigger', {
        audio: 3,
        filter(Evt, player) {
            return game.countPlayer(cur => cur.hasSkill('homolive') || cur.countCards() === 0)
        },
        content() {
            Evt.num = game.countPlayer(cur => cur.hasSkill('homolive') || cur.countCards() === 0)
            player.draw(Evt.num)
        },
        group: 'rongyuchengyuan_putMark',
        subSkill: {
            putMark: new toSkill('trigger', {
                audio: 'rongyuchengyuan',
                filter(Evt, player) {
                    if (!Evt.source || Evt.source === player) return false;
                    if (Evt.source.hasSkill('homolive')) return false;
                    return true;
                },
                prompt2(Evt, player) {
                    return `给${get.translation(Evt.source)}添加homolive标记,并抵挡此次伤害`;
                },
                logTarget: 'source',
                content() {
                    'step 0'
                    Evt.tar = trigger.source
                    Evt.tar.addSkill('homolive');
                    'step 1'
                    trigger.changeToZero();
                },
            }).setT("damageBegin3"),
        },
    }, 'frequent').setT("phaseJieshuBegin"),
    hundunliandong: new toSkill('active', {
        audio: 3,
        usable: 1,
        filterTarget(card, player, target) {
            var targets = [player].concat(ui.selected.targets);
            if (targets.contains(target)) return false;
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].hasSkill('homolive') && target.hasSkill('homolive')) {
                    return false;
                }
                if (targets[i].group == target.group) {
                    return false;
                }
            }
            return target.countCards('he');
        },
        complexTarget: true,
        multitarget: true,
        selectTarget: [1, Infinity],
        content() {
            var targets = [player].concat(targets);
            'step 0'
            if (Evt.dropCardsType == null) {
                Evt.dropCardsType = [];
                Evt.dropCards = [];
                Evt.playerIndex = 0;
                Evt.dialogId = 0;
            }
            if (targets.length >= 1) {
                if (targets[Evt.playerIndex].countCards('he')) {
                    Evt.handcardsCount = targets[Evt.playerIndex].countCards('h');
                    targets[Evt.playerIndex].chooseToDiscard(true, 1, 'he', '『混沌联动』：弃置一张牌');
                }
                else {
                    Evt.handcardsCount = -1;
                }
            }
            else {
                Evt.goto(3);
            }
            'step 1'
            if (result.cards && result.cards.length) {
                Evt.dropCards.addArray(result.cards);
                Evt.dropCardsType = get.suit3(Evt.dropCards);
            }
            'step 2'
            if (Evt.handcardsCount != -1) {
                if (targets[Evt.playerIndex].countCards('h') == 0 && Evt.handcardsCount != 0) {
                    Evt.goto(3);
                }
                else {
                    ui.clear();
                    if (Evt.dialog && Evt.dialogId) {
                        Evt.dialog.close();
                        _status.dieClose.remove(Evt.dialog);
                        game.broadcast('closeDialog', Evt.dialogId);
                        game.broadcast(function (id) {
                            var dialog = get.idDialog(id);
                            if (dialog) {
                                _status.dieClose.remove(dialog);
                            }
                        }, Evt.dialogId);
                    }
                    Evt.dialog = ui.create.dialog('混沌联动', Evt.dropCards, true);
                    _status.dieClose.push(Evt.dialog);
                    Evt.dialog.videoId = lib.status.videoId++;
                    game.broadcast(function (cards, id) {
                        var dialog = ui.create.dialog('混沌联动', cards, true);
                        _status.dieClose.push(dialog);
                        dialog.videoId = id;
                    }, Evt.dropCards, Evt.dialog.videoId);
                    Evt.dialogId = Evt.dialog.videoId;
                    if (Evt.dropCardsType.length >= 4) {
                        Evt.goto(3);
                    }
                    else {
                        Evt.playerIndex++;
                        if (Evt.playerIndex >= targets.length) {
                            Evt.playerIndex = 0;
                        }
                        Evt.goto(0);
                    }
                }
            }
            else {
                Evt.playerIndex++;
                if (Evt.playerIndex < targets.length) {
                    Evt.goto(0);
                }
                else {
                    Evt.playerIndex = 0;
                    Evt.goto(0);
                }
            }
            'step 3'
            ///显示当前弃牌框，待改进
            ui.clear();
            game.broadcast('closeDialog', Evt.dialogId);
            if (Evt.dialog && Evt.dialogId) {
                Evt.dialog.close();
                _status.dieClose.remove(Evt.dialog);
                game.broadcast('closeDialog', Evt.dialogId);
                game.broadcast(function (id) {
                    var dialog = get.idDialog(id);
                    if (dialog) {
                        _status.dieClose.remove(dialog);
                    }
                }, Evt.dialogId);
            }
        },
        ai: {
            order: 7,
            result: {
                player(player, target) {
                    if ((get.mode() != 'identity' || game.roundNumber > 1) && player.countCards('h') > 1) return 1;
                    else return -0.2;
                },
                target(player, target) {
                    if (!target.countCards('h')) return -2;
                    return -target.countCards('h') / 2;
                }
            },
        },

    }),
    zhongxinghezou: new toSkill('trigger', {
        init(player) {
            if (!player.$.zhongxinghezou) {
                player.$.zhongxinghezou = [];
            }
        },
        filter(Evt, player) {
            if (!(get.itemtype(Evt.cards) == 'cards')) return false
            // if (Evt.getParent().triggeredTargets3.length > 1) return false;
            return get.number(Evt.card) && !player.hasSkill('zhongxinghezou_used');
        },
        check(Evt, player) {
            var effect = 0;
            if (Evt.card.name == 'wuxie' || Evt.card.name == 'shan') {
                if (get.attitude(player, Evt.starget) < -1) {
                    effect = -1;
                }
            }
            else if (Evt.targets && Evt.targets.length) {
                for (var i = 0; i < Evt.targets.length; i++) {
                    effect += get.effect(Evt.targets[i], Evt.card, Evt.player, player);
                }
            }
            return get.number(Evt.card) < 6 || effect < 3;
        },
        content() {
            'step 0'
            Evt.ctargets = trigger.targets;
            player.chooseTarget(get.prompt2('zhongxinghezou'), function (card, player, target) {
                return !_status.event.targets.contains(target) && target.countCards('h');
            }).set('ai', function (target) {
                return 2 - get.attitude(_status.event.player, target);
            }).set('targets', trigger.targets);
            'step 1'
            if (result.bool && result.targets[0]) {
                Evt.starget = result.targets[0];
                var att = get.attitude(Evt.starget, player);
                var num = get.number(trigger.card);
                var effect = 0;
                if (trigger.card.name == 'wuxie' || trigger.card.name == 'shan') {
                    if (get.attitude(player, Evt.starget) < -1) {
                        effect = -1;
                    }
                }
                else if (trigger.targets && trigger.targets.length) {
                    for (var i = 0; i < trigger.targets.length; i++) {
                        effect += get.effect(trigger.targets[i], trigger.card, Evt.starget, player);
                    }
                }
                Evt.starget.chooseCard(true, 'h', '众星合奏：亮出一张手牌').set('ai', card => {
                    var source = _status.event.source;
                    var att = _status.event.att;
                    var num = _status.event.num;
                    var player = _status.event.player;
                    var effect = _status.event.effect;
                    if (get.number(card) + num == 12) {
                        if (att > 0 || get.recoverEffect(player, source, player)) return 8 - get.useful(card);
                        else return 0;
                    }
                    else if (get.number(card) + num < 12) {
                        return -effect - get.useful(card);
                    }
                    else {
                        return 4 - get.useful(card);
                    }
                }).set('att', att).set('num', num).set('effect', effect).set('source', player);
            }
            else {
                Evt.finish();
            }
            'step 2'
            if (result.bool && result.cards.length) {
                player.addTempSkill('zhongxinghezou_used')
                Evt.starget.showCards(result.cards);
                Evt.card = result.cards[0];
                var num = get.number(Evt.card) + get.number(trigger.card);
                if (num < 12) {
                    // trigger.targets.length=0;
                    // trigger.getParent().triggeredTargets2.length=0;
                    player.gain(result.cards, Evt.starget, 'give');
                    trigger.cancel();
                }
                if (num >= 12) {
                    player.$.zhongxinghezou.push({
                        source: trigger.card.cardid,
                        user: Evt.starget,
                        card: Evt.card,
                        targets: Evt.ctargets,
                    });
                }
                if (num == 12) {
                    player.draw();
                    Evt.starget.recover(player);
                }
            }
            else {
                Evt.finish();
            }
        },
        group: ['zhongxinghezou_use'],
        subSkill: {
            use: {
                forced: true,
                trigger: {
                    player: 'useCardAfter',
                },
                filter(Evt, player) {
                    if (!Evt.card.isCard) return false;
                    if (!player.$.zhongxinghezou.length) return false;
                    return true;
                },
                content() {
                    player.$.zhongxinghezou.forEach(function (item) {
                        if (item.source == trigger.card.cardid) {
                            item.targets.forEach(function (tar) {
                                if (item.user.canUse(item.card, tar)) {
                                    item.user.useCard(item.card, tar);
                                }
                            })
                            player.$.zhongxinghezou.remove(item);
                        }
                    })
                }
            },
            used: {},
        }
    }).setT('useCard2'),
    xiugong: new toSkill('trigger', {
        priority: 199,
        filter(Evt, player) {
            return game.hasPlayer(cur => {
                return cur != player;
            });
        },
        check(Evt, player) {
            return true;
        },
        content() {
            'step 0'
            player.chooseTarget('选择『天道宿宫』的目标', true, function (card, player, target) {
                return target != player
            });
            'step 1'
            if (result.bool) {
                Evt.target = result.targets[0];
                Evt.num = Evt.target.countCards('h');
                player.logSkill('xiugong', Evt.target)
                if (Evt.num > 0) {
                    Evt.reality = Evt.target.countCards('h', { type: ['trick', 'delay'] });
                    var rand = 1.5 * Math.pow(Math.random(), Evt.num)
                    if (player.hasSkillTag('viewHandcard', null, Evt.target, true)) rand = 1;
                    var list = ['0张'];
                    for (var i = 1; i <= Evt.num; i++) {
                        list.push(i + '张');
                    }
                    player.chooseControl('dialogcontrol', list, true).set('ai', function () {
                        var num = _status.event.num;
                        if (_status.event.rand > Evt.getRand()) {
                            console.log(_status.event.reality)
                            return _status.event.reality + '张';
                        }
                        if (Evt.getRand() < 1 / num) return _status.event.reality + '张';
                        return list.randomGet();
                    }).set('prompt', '猜测' + get.translation(Evt.target) + '手牌中锦囊牌的数量').set('num', Evt.num).set('rand', rand).set('reality', Evt.reality);
                } else {
                    player.draw();
                    Evt.finish();
                }
            }
            'step 2'
            if (result.control) {
                player.chat(result.control);
                game.log(player, '猜测', Evt.target, '手中有' + result.control + '锦囊牌');
                var num = result.control.substring(0, 1);
                Evt.target.showHandcards();
                if (num == Evt.reality) {
                    player.draw();
                    if (player.$.xiugong_times == 0) player.$.xiugong_times = num;
                }
            }
        },
        involve: 'zhongxinghezou',
        group: ['xiugong_times', 'xiugong_clear'],
        subSkill: {
            times: {
                init(player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = 0;
                },
                trigger: { player: 'useCard2' },
                firstDo: true,
                forced: true,
                filter(Evt, player) {
                    console.log(player.$.xiugong_times)
                    return player.$.xiugong_times > 0 && player.hasSkill('zhongxinghezou_used');
                },
                content() {
                    player.$.xiugong_times--;
                    player.removeSkill('zhongxinghezou_used');
                },
            },
            clear: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    return player.$.xiugong_times != 0;
                },
                content() {
                    player.$.xiugong_times = 0;
                },
            }
        }
    }).setT('phaseUseBegin'),
    zuodun: {
        audio: 2,
        trigger: { global: 'damageBegin3' },
        usable: 1,
        priority: 1,
        popup: false,
        filter(Evt, player) {
            return Evt.player != player && Evt.num;
        },
        check(Evt, player) {
            return (player.hp - Evt.player.hp) > 0 && get.attitude(player, Evt.player) > (6 - player.hp);
        },
        logTarget: 'player',
        content() {
            trigger.player = player;
            var targets = [player];
            if (trigger.source) targets.add(trigger.source);
            game.asyncDraw(targets);
            if (!player.hasSkill('zhongxinghezou')) {
                player.addTempSkill('zhongxinghezou', { player: 'phaseAfter' });
            }
        },
        derivation: 'zhongxinghezou',
    },
    baidao: {
        enable: 'phaseUse',
        usable: 1,
        filter(Evt, player) {
            return player.countCards('h');
        },
        filterCard: true,
        selectCard: -1,
        position: 'h',
        discard: false,
        lose: false,
        content() {
            player.showHandcards();
            var overJ = cards.filter(card => get.number(card) > 11);
            var under3 = cards.filter(card => get.number(card) < 3);
            player.recover(overJ.length);
            if (under3.length && player.hasSkill('zhongxinghezou')) {
                if (player.getStat().skill.zhongxinghezou) {
                    player.getStat().skill.zhongxinghezou--;
                    player.$.baidao_times += (under3.length - 1);
                } else {
                    player.$.baidao_times += under3.length;
                }
            }
        },
        ai: {
            order: 10,
            result: {
                player(player, target) {
                    if (player.countCards('h', card => get.number(card) > 11)) return get.recoverEffect(player, player, player);
                    else return -0.2;
                },
            },
        },
        group: ['baidao_times', 'baidao_clear'],
        subSkill: {
            times: {
                init(player, skill) {
                    if (!player.storage[skill]) player.storage[skill] = 0;
                },
                trigger: { player: 'useCard2' },
                firstDo: true,
                forced: true,
                filter(Evt, player) {
                    return player.$.baidao_times > 0 && player.hasSkill('zhongxinghezou_used');
                },
                content() {
                    player.$.baidao_times--;
                    player.removeSkill('zhongxinghezou_used');
                },
            },
            clear: {
                trigger: { player: 'phaseAfter' },
                forced: true,
                silent: true,
                popup: false,
                filter(Evt, player) {
                    return player.$.baidao_times != 0;
                },
                content() {
                    player.$.baidao_times = 0;
                },
            }
        },
        derivation: 'zhongxinghezou',
    },
    yipengyidou: {
        enable: 'phaseUse',
        usable: 1,
        filterTarget(card, player, target) {
            return player.canCompare(target);
        },
        filter(Evt, player) {
            return player.countCards('h') > 0;
        },
        content: [() => {
            player.chooseToCompare(target).set('small', (get.recoverEffect(target, player, player) > get.recoverEffect(player, target, player) + 1));
        }, () => {
            Evt.loop = 1;
            if (result.tie) {
                Evt.finish()
            }
            else {
                Evt.player1 = result.winner;
                Evt.player2 = result.loser;
            }
            Evt.cards = [];
        }, () => {
            for (let v of _status.discarded) {
                if (['basic', 'trick'].includes(get.type(v))) {
                    if ((Evt.loop ? Evt.player1 : Evt.player2).hasUseTarget(v)) {
                        Evt.cards.add(v);
                    }
                }
            }
            if (Evt.cards.length <= 0) {
                Evt.finish();
            }
            else {
                var dialog = ui.create.dialog('一捧一逗', Evt.cards, true);
                _status.dieClose.push(dialog);
                dialog.videoId = lib.status.videoId++;
                game.addVideo('cardDialog', null, ['一捧一逗', get.cardsInfo(Evt.cards), dialog.videoId]);
                Evt.getParent().preResult = dialog.videoId;
                game.broadcast(function (cards, id) {
                    var dialog = ui.create.dialog('一捧一逗', cards, true);
                    _status.dieClose.push(dialog);
                    dialog.videoId = id;
                }, Evt.cards, dialog.videoId);
                Evt.dialog = dialog;
            }
        }, () => {
            let cur = Evt.loop ? Evt.player1 : Evt.player2
            game.log(cur, '观看了', '#y弃牌堆的牌');
            cur.chooseButton('是否视为使用其中一张牌？')
                .set('dialog', Evt.dialog.videoId)
                .set('ai', (button) => _status.event.player.getUseValue(button.link))
        }, () => {
            if (result.bool && result.links) {
                let cur = Evt.loop ? Evt.player1 : Evt.player2
                Evt.cardUse = result.links[0];
                if (cur.hasUseTarget(Evt.cardUse)) {
                    cur.chooseUseTarget(Evt.cardUse, true, false);
                }
            }
            else {
                Evt.goto(5);
                Evt.skipUse = true
            }
        }, () => {
            ui.clear();
            Evt.dialog.close();
            _status.dieClose.remove(Evt.dialog);
            game.broadcast(function (id) {
                var dialog = get.idDialog(id);
                if (dialog) {
                    dialog.close();
                    _status.dieClose.remove(dialog);
                }
            }, Evt.dialog.videoId);
            if (Evt.loop) {
                Evt.loop--;
                Evt.player2.chooseBool('视为使用一张本回合进入弃牌堆的一张基本牌或通常锦囊牌，或取消使对方回复一点体力').set('ai', function () {
                    var player = _status.event.player;
                    var target = _status.event.getParent().player1;
                    if (get.recoverEffect(target, player, player) > 1) return 0;
                    else return -0.2 + Math.random();
                });
            }
            else if (!Evt.skipUse) {
                Evt.finish();
            }
        }, () => {
            if (result.bool && !Evt.skipUse) {
                Evt.goto(2);
            }
            else {
                Evt.player1.recover();
            }
        }],
        ai: {
            order: 8,
            result: {
                target: 1,
            },
        },
    },
    renleiguancha: {
        trigger: { player: 'phaseEnd' },
        content() {
            'step 0'
            player.chooseTarget(1, '选择观察目标', function (card, player, target) {
                return player != target;
            });
            'step 1'
            if (result.bool) {
                result.targets[0].addSkill('renleiguancha_mark');
            }
        },
        group: ['renleiguancha_phaseStart', 'renleiguancha_damage', 'renleiguancha_die'],
        subSkill: {
            mark: {
                mark: true,
                intro: {
                    content: '造成伤害，杀死玩家与死亡都被列入了观察项目'
                },
            },
            phaseStart: {
                trigger: { player: 'phaseBegin' },
                forced: true,
                filter(Evt, player) {
                    return player.hasSkill('renleiguancha_damaged') || player.hasSkill('renleiguancha_dead')
                        || game.filterPlayer(cur => cur.hasSkill('renleiguancha_mark')).length > 0
                },
                content() {
                    'step 0'
                    game.filterPlayer(cur => {
                        if (cur.hasSkill('renleiguancha_mark')) {
                            cur.removeSkill('renleiguancha_mark');
                            return true;
                        }
                        else
                            return false;
                    });
                    if (!player.hasSkill('renleiguancha_damaged') && !player.hasSkill('renleiguancha_dead')) {
                        player.draw(2);
                        player.loseHp();
                        Evt.finish();
                    }
                    'step 1'
                    if (player.hasSkill('renleiguancha_damaged')) {
                        player.draw(1);
                        player.removeSkill('renleiguancha_damaged');
                    }
                    'step 2'
                    if (player.hasSkill('renleiguancha_dead')) {
                        player.removeSkill('renleiguancha_dead');
                        player.chooseTarget(1, '对一名角色造成一点伤害');
                    }
                    else {
                        Evt.finish();
                    }
                    'step 3'
                    if (result.bool) {
                        result.targets[0].damage(player);
                    }
                }
            },
            damage: {
                trigger: { global: 'damageAfter' },
                forced: true,
                filter(Evt, player) {
                    if (Evt.source) {
                        return Evt.source.hasSkill('renleiguancha_mark');//||Evt.player.hasSkill('renleiguancha_mark');
                    }
                    else
                        return false;
                    //return Evt.player.hasSkill('renleiguancha_mark');
                },
                content() {
                    player.addSkill('renleiguancha_damaged');
                }
            },
            die: {
                trigger: { global: 'dieBefore' },
                forced: true,
                filter(Evt, player) {
                    if (Evt.source) {
                        return Evt.source.hasSkill('renleiguancha_mark') || Evt.player.hasSkill('renleiguancha_mark');
                    }
                    else
                        return Evt.player.hasSkill('renleiguancha_mark');
                },
                content() {
                    player.addSkill('renleiguancha_dead');
                }
            },
            damaged: {
                mark: true,
                marktext: '伤',
                intro: {
                    content: '观察目标造成了伤害'
                },
            },
            dead: {
                mark: true,
                marktext: '亡',
                intro: {
                    content: '观察目标死亡或杀死过角色'
                },
            }
        }
    },
    //兰音
    yueyao: new toSkill('trigger', {
        trigger: {
            global: 'gameDrawAfter',
            player: ['enterGame', 'phaseBegin'],
        },
        filter(Evt, player) {
            return true;
        },
        intro: { content: '月谣：#' },
        content() {
            player.$.yueyao = player.countCards('h');
            player.markSkill('yueyao');
        },
        mod: {
            targetEnabled(card, player, target) {
                if (target.$.yueyao === player.countCards('h')) return false;
            },
        },
        group: 'yueyao_addDam',
        subSkill: {
            addDam: {
                trigger: { source: 'damageBegin' },
                forced: true,
                filter(Evt, player) {
                    return player.$.yueyao == player.countCards('h');
                },
                content() {
                    trigger.num++;
                }
            },
        }
    }, 'forced').setI(0),
    kongling: new toSkill('trigger', {
        filter(Evt, player) {
            return Evt.num > 0;
        },
        content() {
            'step 0'
            player.chooseTarget(get.prompt2('kongling'), function (card, player, target) {
                return player.$.yueyao != target.countCards('h');
            }).set('ai', function (target) {
                var player = _status.event.player;
                if (player.$.yueyao < target.countCards('h')) return 1 - get.attitude(player, target) * (target.countCards('h') - player.$.yueyao);
                return get.attitude(player, target);
            });
            'step 1'
            if (result.bool && result.targets) {
                player.logSkill('kongling', result.targets);
                var target = result.targets[0];
                if (player.$.yueyao < target.countCards('h')) target.chooseToDiscard(true, target.countCards('h') - player.$.yueyao);
                else target.gain(get.cards(player.$.yueyao - target.countCards('h')), 'draw');
            }
        },
        ai: {
            maixie: true,
            combo: 'yueyao'
        }
    }, 'direct').setT('damageAfter'),
    jiajiupaidui: {
        audio: 3,
        enable: 'chooseToUse',
        filter(Evt, player) {
            return Evt.filterCard({ name: 'jiu', isCard: true }, player, Evt);
        },
        filterTarget(card, player, target) {
            return target.countCards('he');
        },
        selectTarget: 2,
        multitarget: true,
        round: 1,
        content() {
            'step 0'
            player.chooseCardOL(true, targets, 'he', '弃置一张牌(若其中有♠或9，则视为' + get.translation(player) + '使用了一张酒)').set('ai', card => {
                var source = _status.event.source;
                var player = _status.event.player;
                if (get.attitude(player, source) > 0 && (get.suit(card) == 'spade' || get.number(card) == 9)) return 12 - get.value(card);
                return 6 - get.value(card);
            }).set('source', player).aiCard = function (target) {
                var hs = target.getCards('h');
                var Evt = _status.event;
                Evt.player = target;
                hs.sort(function (a, b) {
                    return Evt.ai(a) - Evt.ai(b);
                });
                delete Evt.player;
                return { bool: true, cards: [hs[0]] };
            };
            'step 1'
            var cards = [];
            result.forEach(cur => cards.addArray(cur.cards));
            targets[0].discard(cards[0]);
            targets[1].discard(cards[1]);
            Evt.cards = cards;
            'step 2'
            game.delay();
            Evt.allJiu = true;
            Evt.cards.forEach(card => {
                if (get.suit(card) === 'spade' || get.number(card) == 9)
                    Evt.isJiu = true;
                else {
                    Evt.allJiu = false;
                }
            });
            if (Evt.isJiu) {
                if (_status.event.getParent(2).type == 'dying') {
                    Evt.dying = player;
                    Evt.type = 'dying';
                }
                player.useCard({ name: 'jiu', isCard: true }, player, false);
            }
            'step 3'
            if (Evt.allJiu) {
                var roundname = 'jiajiupaidui_roundcount';
                if (player.hasMark(roundname)) {
                    player.popup('重置');
                    let next = game.createEvent('resetSkill');
                    [next.player, next.resetSkill] = [player, 'jiajiupaidui']
                    next.setContent('resetRound');
                }
                player.draw();
            }
        },
        ai: {
            order: 9,
            result: {
                player: 0.8,
                target: -1,
                expose: 0.4,
            },
            threaten: 1.2
        },
    },
    kuangzuiluanwu: {
        audio: 1,
        unique: true,
        enable: 'phaseUse',
        limited: true,
        skillAnimation: 'epic',
        animationColor: 'thunder',
        filter(card, player) {
            return player.$.jiu > 0;
        },
        filterTarget(card, player, target) {
            return player.canUse({ name: 'sha' }, target, false);
        },
        selectTarget() {
            return _status.event.player.$.jiu;
        },
        multitarget: true,
        content() {
            'step 0'
            player.$.kuangzuiluanwu = true;
            player.awakenSkill('kuangzuiluanwu');
            player.loseMaxHp();
            'step 1'
            Evt.shaEvent = player.useCard({ name: 'sha' }, targets);
            'step 2'
            player.addSkill('kuangzuiluanwu_count');
        },
        intro: {
            content(storage, player, skill) {
                if (player.$.jiu)
                    return '未发动。当前使用酒计数:' + (player.$.jiu).toString()
                else
                    return '未发动。当前使用酒计数:0'
            }
        },
        subSkill: {
            count: {
                mark: true,
                marktext: "酒",
                direct: true,
                intro: {
                    content(storage, player, skill) {
                        if (player.$.jiu)
                            return '已发动。当前使用酒计数:' + (player.$.jiu).toString()
                        else
                            return '已发动。当前使用酒计数:0'
                    }
                },
            },
        },
        ai: {
            target(player, target) {
                return lib.card.sha.ai.result.target(player, target);
            },
            player(player, target) {
                if (player.isHealthy()) return -3;
                return -1;
            }
        }
    },
    //黄兔
    jiance: {
        frequent: true,
        trigger: { player: ['loseHpEnd', 'damageEnd'] },
        content: [() => {
            player.chooseTarget(get.prompt2('jiance'), function (card, player, target) {
                return target.countCards('h');
            }).set('ai', function (target) {
                let player = _status.event.player;
                if (target.countCards('h') <= 4) return 2 - get.attitude(player, target);
                return 0;
            });
        }, () => {
            if (result.bool && result.targets) {
                Evt.target = result.targets[0];
                Evt.target.showHandcards('监策');
                let types = ['basic', 'trick', 'equip'];
                let cards = Evt.target.getCards('h').slice(0);
                for (let i of cards) {
                    let type = get.type(i, 'trick');
                    if (types.contains(type)) types.remove(type);
                }
                Evt.num = types.length;
            } else Evt.finish();
        }, () => {
            if (Evt.num) {
                player.chooseTarget('『监策』：选择令一名角色摸' + get.cnNumber(Evt.num) + '张牌', function (card, player, target) {
                    return target != _status.event.source;
                })
                    .set('ai', (target) => {
                        let player = _status.event.player;
                        return target.needsToDiscard() ? get.attitude(target, player) / 2 : get.attitude(target, player);
                    }).set('source', Evt.target)
            } else Evt.finish();
        }, () => {
            if (result.bool && result.targets) {
                result.targets[0].draw(Evt.num);
            }
        }],
        ai: {
            maixie: true,
        }
    },
    chanbing: {
        init(player, skill) {
            if (!player.storage[skill]) player.storage[skill] = [];
        },
        trigger: { global: 'roundStart' },
        forced: true,
        filter(Evt, player) {
            return true;
        },
        content() {
            'step 0'
            var numbers = [];
            for (var i = 0; i < player.$.chanbing.length; i++) {
                numbers.add(get.number(player.$.chanbing[i]));
            }
            let next = player.judge(card => {
                var numbers = _status.event.numbers;
                if (numbers && numbers.contains(get.number(card))) return -1;
                return 1;
            })
                .set('numbers', numbers);
            'step 1'
            if (result.bool) {
                var cards = [result.card];
                game.cardsGotoSpecial(cards, ui.special);
                player.$gain(cards, false);
                player.markAuto('chanbing', cards);
                player.recover();
            } else {
                player.loseHp();
            }
        },
        marktext: '缠',
        intro: {
            onunmark(storage, player) {
                if (storage && storage.length) {
                    player.$throw(storage, 1000);
                    game.cardsDiscard(storage);
                    game.log(storage, '被置入了弃牌堆');
                    storage.length = 0;
                }
            },
            mark(dialog, content, player) {
                if (content && content.length) {
                    dialog.addAuto(content);
                }
            },
            content(content, player) {
                if (content && content.length) {
                    return get.translation(content);
                }
            }
        },
    },
    buyu: {
        trigger: { global: 'die' },
        filter(Evt, player) {
            return Evt.player.getStockSkills('黄兔颂恩', '因缘斩断').filter(function (skill) {
                var info = get.info(skill);
                return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited;
            }).length > 0 && player.countCards('h');
        },
        logTarget: 'player',
        content() {
            'step 0'
            Evt.togain = trigger.player.getCards('he');
            trigger.player.lose(Evt.togain, ui.special, 'toStorage');
            trigger.player.$give(Evt.togain, player, false);
            player.markAuto('chanbing', Evt.togain);
            'step 1'
            var list = trigger.player.getStockSkills('黄兔颂恩', '因缘斩断').filter(function (skill) {
                var info = get.info(skill);
                return info && !info.juexingji && !info.hiddenSkill && !info.zhuSkill && !info.charlotte && !info.limited;
            });
            if (list.length == 1) Evt._result = { control: list[0] };
            else player.chooseControl(list).set('prompt', '『不渝』：选择获得一个技能').set('forceDie', true).set('ai', function () {
                return list.randomGet();
            });
            'step 2'
            if (player.$.buyu) player.removeSkill(player.$.buyu);
            player.$.buyu = result.control;
            player.markSkill('buyu');
            player.addSkillLog(result.control);
            game.broadcastAll(function (skill) {
                var list = [skill];
                game.expandSkills(list);
                for (var i of list) {
                    var info = lib.skill[i];
                    if (!info) continue;
                    if (!info.audioname2) info.audioname2 = {};
                    info.audioname2.InabaHaneru = 'buyu';
                }
            }, result.control);
        },
        mark: true,
        intro: { content: '当前『不渝』技能：$' },
    },
    //蝙蝠妹
    hongyi: {
        trigger: { global: 'judgeAfter' },
        usable: 1,
        filter(Evt, player) {
            return Evt.result.color == 'red' && player != _status.currentPhase && _status.currentPhase && _status.currentPhase.countCards('he');
        },
        content() {
            'step 0'
            _status.currentPhase.chooseCard('he', true, '『红移』：你需要交给' + get.translation(player) + '一张牌');
            'step 1'
            if (result.bool)
                player.gain(result.cards[0], _status.currentPhase, 'giveAuto');
        }
    },
    jueshou: {
        enable: 'phaseUse',
        filter(Evt, player) {
            if (player.hasSkill('jueshou_used')) return false;
            var cards = player.getCards('he', { color: 'black' });
            for (var i = 0; i < cards.length; i++) {
                if (get.type(cards[i], 'trick') != 'trick') return true;
            }
            return false;
        },
        position: 'he',
        filterCard(card, player) {
            if (get.type(card, 'trick') == 'trick') return false;
            return get.color(card) == 'black' && get.owner(card) == player;
        },
        check(card) {
            return 7 - get.value(card);
        },
        discard: false,
        prepare: 'throw',
        filterTarget(card, player, target) {
            if (get.suit(card) == 'club') return lib.filter.targetEnabled2({ name: 'bingliang' }, player, target)
            return lib.filter.filterTarget({ name: 'bingliang' }, player, target);
        },
        content() {
            player.addTempSkill('jueshou_used', 'phaseUseEnd');
            player.useCard({ name: 'bingliang' }, target, cards).animate = false;
            if (get.type(cards[0]) == 'equip') {
                player.addTempSkill('jueshou_dist', { player: 'phaseZhunbeiBegin' });
            }
        },
        subSkill: {
            dist: {
                mark: true,
                intro: { content: '距离+1' },
                mod: {
                    globalTo(from, to, distance) {
                        return distance + 1;
                    },
                },
            },
            used: {},
        },
        ai: {
            effect(card) {
                if (get.name(card) == 'shandian') return [1, 1];
            },
            result: {
                target(player, target) {
                    return get.effect(target, { name: 'bingliang' }, player, target);
                }
            },
            order: 9,
        }
    },

    //Kaf
    yu: new toSkill('mark', {
        intro: {
            content: 'expansion',
            markcount: 'expansion',
        },
        onremove: function (player, skill) {
            var cards = player.getExpansions(skill);
            if (cards.length) player.loseToDiscardpile(cards);
        },
    }),
    liuhua: {
        trigger: { global: 'phaseAfter' },
        lastDo: true,
        filter(Evt, player) {
            return player.countCards('h') && game.countPlayer2(cur => cur.getHistory('damage').length);
        },
        check(Evt, player) {
            return player.countCards('h') <= 2 || player.getExpansions('yu').length <= 1;
        },
        content() {
            'step 0'
            player.showHandcards();
            Evt.cards = player.getCards('h');
            game.delayx()
            'step 1'
            player.addToExpansion(Evt.cards, 'give', player).gaintag.add('yu');
            game.delayx()
            'step 2'
            player.insertPhase();
        },
        group: ['liuhua_regain', 'yu'],
        subSkill: {
            regain: new toSkill('trigger', {
                trigger: { player: 'addToExpansionAfter' },
                filter(Evt, player) {
                    if (player.getExpansions('yu').length < 4) return false;
                    var list = get.suit3(player.getExpansions('yu'));
                    return list.length >= 4;
                },
                content() {
                    'step 0'
                    player.chooseCardButton(`###『${get.translation('liuhua')}』###获得一种颜色的「羽」`, player.getExpansions('yu'), true)
                        .set('ai', function (button) {
                            return get.value(button.link);
                        });
                    'step 1'
                    if (result.bool) {
                        player.logSkill('liuhua');
                        Evt.cards = player.getExpansions('yu').filter(card => get.color(card) == get.color(result.links[0]));
                        player.gain(Evt.cards, 'give', player, 'log', 'fromStorage');
                        game.delayx(1.5);
                    }
                    else Evt.finish();
                },
            }, 'direct', 'lastDo'),
        }
    },
    yishi: {
        trigger: { player: 'phaseBefore' },
        firstDo: true,
        forced: true,
        filter(Evt, player) {
            return Evt.skill;
        },
        content() {
            'step 0'
            player.$.yishi_use = _status.currentPhase;
            player.addTempSkill('yishi_use');
            'step 1'
            game.filterPlayer(cur => {
                if (cur != player && cur != player.$.yishi_use) {
                    cur.addTempSkill('yishi_cardDisable');
                }
            })
        },
        mod: {
            phaseSkippable(phase, player, cur) {
                if (cur !== true && phase.skill && player.isTurnedOver()) return false
            }
        },
        subSkill: {
            use: {
                mark: 'character',
                intro: {
                    content(storage, player) {
                        if (storage == player) return '使用牌只能指定自己为目标';
                        return '使用牌只能指定自己或' + get.translation(storage) + '为目标';
                    }
                },
                onremove: true,
                mod: {
                    playerEnabled(card, player, target) {
                        if (player != target && player.$.yishi_use != target) return false;
                    }
                },
            },
            cardDisable: new toSkill('mark', {
                intro: {
                    name: '遗世',
                    content: '本回合内不能使用或打出牌'
                },
                mod: {
                    cardEnabled2(card) {
                        return false;
                    },
                },
            }, 'mark')
        }
    },
    shiji: {
        unique: true,
        global: 'shiji2',
        zhuSkill: true,
    },
    shiji2: {
        enable: 'phaseUse',
        prompt() {
            var player = _status.event.player;
            var list = game.filterPlayer(function (target) {
                return target.hasZhuSkill('shiji', player) && player.group == target.group && target.getExpansions('yu').length;
            });
            var str = '选择' + get.translation(list);
            if (list.length > 1) str += '中的一人';
            str += '将其「羽」不包含花色的任意张牌置于之上';
            return str;
        },
        filter(Evt, player) {
            if (player.countCards('h') == 0) return false;
            return game.hasPlayer(function (target) {
                return target.hasZhuSkill('shiji', player) && player.group == target.group && target.getExpansions('yu').length;
            });
        },
        filterTarget(card, player, target) {
            return target.hasZhuSkill('shiji', player) && player.group == target.group;
        },
        clearTime: true,
        prepare(cards, player, targets) {
            targets[0].logSkill('shiji');
        },
        usable: 1,
        content() {
            "step 0"
            var suits = get.suit3(target.getExpansions('yu'));
            player.chooseCard(true, 'he', '选择置于' + get.translation(target) + '「羽」上的牌', [1, Infinity], function (card, player) {
                return !_status.event.suits.contains(get.suit(card));
            }).set('suits', suits).set('ai', card => {
                var evt = _status.event.getParent();
                if (evt.target.isTurnedOver() && (_status.event.suits + ui.selected.cards.length) < 5) return get.value(card, evt.target, 'raw') - 1;
                if ((evt.player.countCards('he') - ui.selected.cards.length) < 3) return get.value(card, evt.target, 'raw') - 9;
                return get.value(card, evt.target, 'raw') - 5;
            }).set('complexCard', true);
            "step 1"
            if (result.bool && result.cards && result.cards.length) {
                Evt.cards = result.cards;
                target.addToExpansion(Evt.cards, 'give', player).gaintag.add('yu');
            }
        },
        ai: {
            basic: {
                order: 1
            },
            expose: 0.2,
            result: {
                target(player, target) {
                    if (player.countCards('h', 'du') && get.attitude(player, target) < 0) return -1;
                    if (player.countCards('h') >= player.hp) return 1;
                    if (target.isTurnedOver()) return 2;
                    return 0;
                }
            }
        }
    }
}