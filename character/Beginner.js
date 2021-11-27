"use strict";
window.game.import('character', function (lib, game, ui, get, ai, _status) {
    return {
        name: 'Beginner',
        connect: true,
        character: {
            re_KizunaAI: ['female', 'upd8', 4, ['re_ailian'], ['zhu']],
            re_KaguyaLuna: ['female', 'qun', 4, ['re_jiajiupaidui']],
            re_MiraiAkari: ['female', 'qun', 4, ['duanli', 'qingmi']],
            re_NekomiyaHinata: ['female', 'qun', 4, ['yingdan', 'tianzhuo']],
            re_kaguraNaNa: ['female', 'qun', 4, ['re_DDzhanshou'], ['zhu']],
            re_Siro: ['female', 'dotlive', 3, ['lingsi']],
            re_Nekomasu: ['female', 'qun', 3, ['milijianying', 're_dianyin']],
            re_Noracat: ['female', 'upd8', 5, ['kouhu', 'zhiqiu']],
            re_XiaDi: ['male', 'qun', 4, ['re_yinliu', 'dunzou'], ['guoV']],
            re_MononobeAlice: ['female', 'nijisanji', 3, ['tinenghuifu1', 're_dianmingguzhen']],
            re_ShizukaRin: ['female', 'nijisanji', 4, ['re_mozhaotuji']],
            re_MitoTsukino: ['female', 'nijisanji', 3, ['re_bingdielei'], ['zhu']],
            re_UshimiIchigo: ['female', 'nijisanji', 3, ['re_shuangren', 're_jitui']],
            re_HiguchiKaede: ['female', 'nijisanji', 4, ['re_zhenyin']],
            re_SuzuharaLulu: ['female', 'nijisanji', 5, ['tunshi']],
            re_HonmaHimawari: ['female', 'nijisanji', 4, ['mark_tianqing', 'kuiquan']],
            re_AibaUiha: ['female', 'nijisanji', 4, ['kangding', 'longshe']],
            re_SukoyaKana: ['female', 'nijisanji', 3, ['re_huawen', 're_liaohu']],
            re_ShirayukiTomoe: ['female', 'nijisanji', 4, ['re_gonggan', 'yejing']],
            re_TokinoSora: ['female', 'holo', 4, ['re_taiyangzhiyin'], ['zhu']],
            re_AZKi: ['female', 'holo', 4, ['WHiTE', 'BLacK']],
            re_RobokoSan: ['female', 'holo', 3, ['re_zhanxie', 're_chongdian']],
            re_ShirakamiFubuki: ['female', 'holo', 3, ['re_yuanlv', 're_jinyuan'], ['zhu']],
            re_HoshimatiSuisei: ['female', 'holo', 4, ['cansha']],
            re_AkiRosenthal: ['female', 'holo', 3, ['meiwu', 're_huichu']],
            re_YozoraMel: ['female', 'holo', 3, ['fuyi', 'xihun']],
            re_SakuraMiko: ['female', 'holo', 3, ['huangyou', 'qidao']],
            re_NatsuiroMatsuri: ['female', 'holo', 3, ['re_huxi1']],
            re_MurasakiShion: ['female', 'holo', 3, ['anshu', 'xingchi']],
            re_AkaiHaato: ['female', 'holo', 3, ['xinchixin']],
            re_UsadaPekora: ['female', 'holo', 4, ['qiangyun', 'tuquan']],
            re_UruhaRushia: ['female', 'holo', 3, ['juebi', 'zhanhou']],
            re_ŌokamiMio: ['female', 'holo', 4, ['re_yuzhan', 're_bizuo']],
            re_NakiriAyame: ['female', 'holo', 4, ['guiren']],
            re_ŌzoraSubaru: ['female', 'holo', 4, ['cejing']],
            re_SpadeEcho: ['female', 'holo', 3, ['qinglve', 'yingshi'], ['guoV']],
            re_XiaoxiXiaotao: ['female', 'xuyan', 3, ['re_doupeng', 're_xuyan'], ['guoV']],
            re_InuyamaTamaki: ['male', 'nori', 3, ['rongyaochengyuan', 're_hundunliandong']],
            re_KaguraMea: ['female', 'paryi', 3, ['fengna', 're_xiaoyan']],
            re_OtomeOto: ['female', 'paryi', 3, ['re_yuxia', 'hanyin'], ['zhu']],
            re_HisekiErio: ['female', 'paryi', 4, ['re_huange']],
            re_HanazonoSerena: ['female', 'paryi', 3, ['re_jiumao', 're_enfan']],
            re_MinamiNami: ['female', 'qun', 4, ['re_longdan']],
            re_Kano: ['female', 'qun', 4, ['shiguang']],
            re_HanamaruHareru: ['female', 'qun', 3, ['rangran', 'jiazhao']],
            re_SisterClearie: ['female', 'nijisanji', 4, ['shenyou', 'shenfa']],
            re_LizeHelesta: ['female', 'nijisanji', 3, ['yubing']],
            re_AngeKatrina: ['female', 'nijisanji', 3, ['akxiaoqiao', 'liancheng']],
            re_YuNi: ['female', 'upd8', 4, ['re_shengcai']],
            re_TomariMari: ['male', 'upd8', 3, ['liansheng', 'ruantang']],
            re_Omesis: ['female', 'upd8', 4, ['yaozhan', 'chongxin']],
            re_NijikawaRaki: ['female', 'upd8', 4, ['yayun', 'jidao']],
            re_Fairys: ['male', 'upd8', 4, ['ywshuangxing', 'yinni']],
            re_TenkaiTsukasa: ['male', 'qun', 4, ['re_pojie', 're_dazhen']],
            re_DoumyoujiHaruto: ['male', 'qun', 3, ['shengfu', 'wanbi']],
            re_ShigureUi: ['female', 'qun', 3, ['uijieyuan', 'huixiang']],
            re_ShirakamiHaruka: ['female', 'psp', 3, ['zhenbao', 'heimo'], ['guoV']],
        },
        characterSort: {
            Beginner: {
                hololive: [
                    're_TokinoSora', 're_AZKi', 're_RobokoSan', 're_ShirakamiFubuki', 're_HoshimatiSuisei', 're_AkiRosenthal', 're_YozoraMel', 're_MurasakiShion',
                    're_SakuraMiko', 're_NatsuiroMatsuri', 're_UsadaPekora', 're_AkaiHaato', 're_UruhaRushia', 're_ŌokamiMio', 're_NakiriAyame', 're_ŌzoraSubaru', 're_YukihanaLamy',
                    're_SpadeEcho'
                ],
            }
        },
        characterReplace: {
            SisterClearie: ['re_SisterClearie', 'SisterClearie'],
            ShirayukiTomoe: ['re_ShirayukiTomoe', 'ShirayukiTomoe'],
            SukoyaKana: ['re_SukoyaKana', 'SukoyaKana'],
        },
        characterIntro: {
            re_SisterClearie: '神のご加護があらんことを<br>--《DOMAG》',
        },
        skill: {
            re_ailian: {
                audio: 'ailian',
                enable: 'phaseUse',
                selectCard: [1, Infinity],
                position: 'h',
                usable: 1,
                filterCard: true,
                filterTarget(event, player, target) {
                    return target != player;
                },
                check(card) {
                    if (ui.selected.cards.length > 1)
                        return 0;
                    if (ui.selected.cards.length && ui.selected.cards[0].name == 'du')
                        return 0;
                    if (!ui.selected.cards.length && card.name == 'du')
                        return 20;
                    var player = get.owner(card);
                    if (player.hp == player.maxHp || player.storage.re_ailian_clear > 1 || player.countCards('h') <= 1) {
                        if (ui.selected.cards.length) {
                            return -1;
                        }
                        var players = game.filterPlayer();
                        for (let i of players) {
                            if (!i.isTurnedOver() &&
                                !i.hasJudge('lebu') &&
                                get.attitude(player, i) >= 3 &&
                                get.attitude(i, player) >= 3) {
                                return 11 - get.value(card);
                            }
                        }
                        if (player.countCards('h') > player.hp)
                            return 10 - get.value(card);
                        if (player.countCards('h') > 2)
                            return 6 - get.value(card);
                        return -1;
                    }
                    return 10 - get.value(card);
                },
                discard: false,
                filter(event, player) {
                    return player.countCards('h') > 0;
                },
                content() {
                    'step 0';
                    var _a;
                    event.num = player.storage.re_ailian_clear;
                    targets[0].gain(cards, player, 'giveAuto');
                    'step 1';
                    player.storage.re_ailian_clear += cards.length;
                    'step 2';
                    if (player.storage.re_ailian_clear >= 2 && event.num < 2) {
                        let list = [];
                        for (let i of get.inpile('basic')) {
                            if (lib.filter.cardUsable({ name: i }, player) && player.hasUseTarget(i)) {
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
                                        if (game.hasPlayer((cur) => {
                                            return player.canUse(card, cur) && get.effect(cur, card, player, player) > 0;
                                        })) {
                                            if (card.nature == 'fire')
                                                return 2.95;
                                            if (card.nature == 'thunder' || card.nature == 'ice')
                                                return 2.92;
                                            return 2.9;
                                        }
                                        return 0;
                                    case 'jiu':
                                        if (player.getCardUsable('sha') == 0 || !player.hasSha() || !player.hasUseTarget('sha'))
                                            return 0;
                                        return 0.8 + Math.random();
                                    case 'qi':
                                        if (player.isDamaged())
                                            return 1.1 + Math.random();
                                        return 0.1;
                                    default: return 0;
                                }
                            });
                        }
                        else {
                            event.finish();
                        }
                    }
                    'step 3';
                    if ((result === null || result === void 0 ? void 0 : result.bool) && ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length)) {
                        let card = { name: result.links[0][2], nature: result.links[0][3] };
                        player.chooseUseTarget(card, true);
                    }
                },
                ai: {
                    order(skill, player) {
                        if (player.hp < player.maxHp && player.storage.re_ailian_clear < 2 && player.countCards('h') > 1) {
                            return 10;
                        }
                        return 1;
                    },
                    result: {
                        target(player, target) {
                            if (target.hasSkillTag('nogain'))
                                return 0;
                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                if (target.hasSkillTag('nodu'))
                                    return 0;
                                return -10;
                            }
                            if (target.hasJudge('lebu'))
                                return 0;
                            var nh = target.countCards('h');
                            var np = player.countCards('h');
                            if (player.hp == player.maxHp || player.storage.re_ailian_clear < 0 || player.countCards('h') <= 1) {
                                if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi'))
                                    return 0;
                            }
                            return Math.max(1, 5 - nh);
                        }
                    },
                    effect: {
                        target(card, player, target) {
                            if (player == target && get.type(card) == 'equip') {
                                if (player.countCards('e', { subtype: get.subtype(card) })) {
                                    var players = game.filterPlayer();
                                    for (let i of players) {
                                        if (i != player && get.attitude(player, i) > 0) {
                                            return 0;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    threaten: 0.8,
                },
                group: ['re_ailian_clear', 're_ailian_damage'],
                subSkill: {
                    clear: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = 0;
                        },
                        trigger: { global: 'phaseNext' },
                        direct: true,
                        locked: true,
                        silent: true,
                        firstDo: true,
                        content() {
                            player.storage.re_ailian_clear = 0;
                        }
                    },
                    damage: {
                        trigger: { player: 'damageEnd' },
                        filter(event, player) {
                            return player.countCards('h') > 0;
                        },
                        direct: true,
                        content() {
                            'step 0';
                            var _a;
                            player.chooseCardTarget({
                                prompt: get.prompt2('re_ailian'),
                                selectCard: [1, Infinity],
                                position: 'h',
                                filterCard: true,
                                filterTarget(event, player, target) {
                                    return target != player;
                                },
                                ai2(target) {
                                    var att = get.attitude(_status.event.player, target);
                                    if (target.hasSkillTag('nogain'))
                                        att /= 10;
                                    if (target.hasJudge('lebu'))
                                        att /= 5;
                                    return att;
                                },
                                ai1(card) {
                                    if (ui.selected.cards && ui.selected.cards.length > 2)
                                        return 0;
                                    var player = _status.event.player;
                                    if (player.getStorage('re_ailian_clear') > 2)
                                        return 0;
                                    return 8 - get.value(card);
                                },
                            }).set('logSkill', 're_ailian');
                            'step 1';
                            if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                                player.useSkill('re_ailian', result.cards, result.targets);
                            }
                        }
                    }
                },
            },
            re_jiajiupaidui: {
                audio: 'jiajiupaidui',
                enable: 'chooseToUse',
                usable: 1,
                filter(event, player) {
                    return event.filterCard({ name: 'jiu', isCard: true }, player, event);
                },
                filterTarget(card, player, target) {
                    return target.countCards('he');
                },
                content() {
                    "step 0";
                    var att = get.sgnAttitude(target, player);
                    target.chooseToDiscard('he', '弃置一张牌(若其中有♠或点数9，则视为' + get.translation(player) + '使用了一张酒)', true).set('ai', (card) => {
                        if (att > 1)
                            return (get.suit(card) == 'spade' || get.number(card) == 9);
                    }).set('att', att);
                    "step 1";
                    if (result.bool && result.cards) {
                        event.discardCards = result.cards.slice(0);
                    }
                    else
                        event.finish();
                    "step 2";
                    event.discardCards.forEach((discard) => {
                        if (get.suit(discard) == 'spade' || get.number(discard) == 9)
                            event.isJiu = true;
                    });
                    if (event.isJiu) {
                        if (_status.event.getParent(2).type == 'dying') {
                            event.dying = player;
                            event.type = 'dying';
                        }
                        player.useCard({ name: 'jiu', isCard: true }, player);
                    }
                    else {
                        event.finish();
                    }
                    "step 3";
                    player.getStat().card.jiu--;
                },
                ai: { order: 10, result: { target: -1 } },
            },
            duanli: {
                audio: 'shiyilijia',
                group: ['duanli_draw'],
                enable: 'phaseUse',
                usable: 1,
                init(player) {
                    if (player.storage.duanli == undefined) {
                        player.storage.duanli = 0;
                    }
                },
                filter(event, player) {
                    return player.countCards('h');
                },
                content() {
                    'step 0';
                    player.storage.duanli = player.countCards('h');
                    'step 1';
                    var cards = player.getCards('h');
                    player.discard(cards);
                },
                ai: { order: 4, result: { player: 1 } },
                mod: {
                    aiOrder(player, card, num) {
                        if (typeof card == 'object' && player == _status.currentPhase && get.name(card) == 'tao') {
                            var damage = (player.maxHp - player.hp) * 2;
                            return num + damage;
                        }
                    },
                },
                subSkill: {
                    draw: {
                        forced: true,
                        trigger: {
                            player: 'phaseEnd'
                        },
                        filter(event, player) {
                            return player.storage.duanli;
                        },
                        content() {
                            'step 0';
                            player.draw(player.storage.duanli);
                            'step 1';
                            player.storage.duanli = 0;
                        }
                    }
                }
            },
            qingmi: {
                audio: 'seqinghuashen',
                trigger: { global: 'useCardAfter' },
                direct: true,
                filter(event, player) {
                    return event.card.name == 'tao'
                        && event.player != player;
                },
                content() {
                    'step 0';
                    trigger.player.chooseBool('是否让' + get.translation(player) + '摸一张牌').set('choice', get.attitude(trigger.player, player) > 0);
                    'step 1';
                    if (result.bool) {
                        player.logSkill('qingmi');
                        player.draw(trigger.player);
                    }
                }
            },
            yingdan: {
                hiddenCard(player, name) {
                    if (['wuxie', 'shan'].contains(name) && player.countCards('h', { name: 'sha' }))
                        return true;
                },
                mod: {
                    aiValue(player, card, num) {
                        if (player.countCards('hs', { name: 'sha' }) >= 2) {
                            if (card.name == 'shan' || card.name == 'tao' || card.name == 'wuxie')
                                return num / 5;
                            if (card.name == 'sha')
                                return num + 3;
                        }
                    },
                    aiUseful(player, card, num) {
                        return lib.skill.yingdan.mod.aiValue.apply(this, arguments);
                    },
                },
                trigger: { player: ['useCardBefore', 'shaBefore', 'shanBefore', 'wuxieBefore', 'damageBefore'] },
                direct: true,
                firstDo: true,
                filter(event, player) {
                    var evt = event;
                    if (event.name == 'damage')
                        evt = event.getParent();
                    if (!evt || !evt.card || evt.skill)
                        return false;
                    var name = get.name(evt.card);
                    var tri;
                    if (name == 'sha')
                        tri = evt.getParent('chooseUseTarget');
                    else
                        tri = evt.getParent('pre_yingdan_' + name);
                    return tri && tri.addedSkill && tri.addedSkill.contains('number') && evt.skill == 'yingdan_' + name;
                },
                content() {
                    trigger.untrigger(true);
                },
                group: ['yingdan_shan', 'yingdan_wuxie', 'yingdan_sha'],
                subSkill: {
                    sha: {
                        trigger: {
                            player: 'useCardBegin',
                        },
                        filter(event, player) {
                            return ['yingdan_shan', 'yingdan_wuxie'].contains(event.skill) && get.name(event.cards[0], player);
                        },
                        direct: true,
                        firstDo: true,
                        content() {
                            'step 0';
                            player.chooseUseTarget(trigger.cards[0], true, false, trigger.cards);
                            'step 1';
                            if (result.bool) {
                                trigger.card.cards = [];
                                trigger.cards = [];
                            }
                            else {
                                trigger.cancel();
                            }
                        },
                    },
                    shan: {
                        audio: 'songzang',
                        enable: ['chooseToUse'],
                        prompt: '使用一张【杀】，视为使用了一张【闪】',
                        viewAs: { name: 'shan' },
                        check(card) {
                            let number = get.number(card), player = _status.event.player, range = player.getAttackRange();
                            let useful = 0;
                            if (number <= range)
                                useful += 2;
                            return useful + get.order(card);
                        },
                        complexCard: true,
                        filterCard(card, player, event) {
                            return get.name(card, player) == 'sha';
                        },
                        viewAsFilter(player) {
                            if (!player.hasUseTarget({ name: 'sha', isCard: true }) || !player.countCards('hs', { name: 'sha' }))
                                return false;
                        },
                        ai: {
                            respondShan: true,
                        }
                    },
                    wuxie: {
                        audio: 'songzang',
                        enable: ['chooseToUse'],
                        prompt: '使用一张【杀】，视为使用了一张【无懈可击】',
                        viewAs: { name: 'wuxie' },
                        check(card) {
                            var number = get.number(card);
                            var player = _status.event.player;
                            var range = player.getAttackRange();
                            var useful = 0;
                            if (number <= range)
                                useful += 2;
                            return useful + get.order(card);
                        },
                        complexCard: true,
                        filterCard(card, player, event) {
                            return get.name(card, player) == 'sha';
                        },
                        viewAsFilter(player) {
                            if (!player.hasUseTarget({ name: 'sha', isCard: true }) || !player.countCards('hs', { name: 'sha' }))
                                return false;
                        },
                    }
                },
                ai: {
                    noautowuxie: true,
                }
            },
            tianzhuo: {
                audio: 2,
                trigger: { global: 'die' },
                filter(event) {
                    return event.player.countCards('e') > 0;
                },
                logTarget: 'player',
                content() {
                    "step 0";
                    event.togain = trigger.player.getCards('e');
                    player.gain(event.togain, trigger.player, 'giveAuto');
                    'step 1';
                    if (trigger.source == player) {
                        player.draw(3);
                    }
                },
                ai: {
                    threaten: 1.5,
                }
            },
            lingsi: {
                enable: 'phaseUse',
                usable: 1,
                content() {
                    player.draw(2);
                    player.chooseToDiscard(2, 'he', true).set('ai', (card) => {
                        if (get.type(card) == 'basic' && player.countCards('h', { type: 'basic' }) && player.hasUseTarget('sha')) {
                            return 12 - get.value(card) + Math.random();
                        }
                        else if (get.type(card) != 'basic' && (player.countCards('he') - player.countCards('h', { type: 'basic' }) >= 2) && player.hp < player.maxHp) {
                            return 6 + Math.random();
                        }
                        return 6 - get.value(card);
                    });
                },
                ai: {
                    useSha: 1,
                    order: 9,
                    result: {
                        player: 1,
                    },
                },
                group: 'lingsi_discard',
                subSkill: {
                    discard: {
                        trigger: { player: ['loseAfter'] },
                        filter(event, player) {
                            if (!event.cards || event.cards.length < 2)
                                return false;
                            var num1 = 0, num2 = 0;
                            event.cards.forEach((card) => {
                                if (get.type(card) == 'basic') {
                                    num1++;
                                }
                                else {
                                    num2++;
                                }
                            });
                            return Math.max(num1, num2) >= 2;
                        },
                        prompt2(event, player) {
                            var num1 = 0, num2 = 0;
                            event.cards.forEach((card) => {
                                if (get.type(card) == 'basic') {
                                    num1++;
                                }
                                else {
                                    num2++;
                                }
                            });
                            var prompt2 = '可以';
                            if (num1 >= 2) {
                                prompt2 += '视为使用一张杀';
                                if (num2 >= 2) {
                                    prompt2 += ',且令一名角色回复一点体力';
                                }
                            }
                            else if (num2 >= 2) {
                                prompt2 += '令一名角色回复一点体力';
                            }
                            return prompt2;
                        },
                        priority: 22,
                        content() {
                            'step 0';
                            var _a;
                            var num1 = 0, num2 = 0;
                            trigger.cards.forEach((card) => {
                                if (get.type(card) == 'basic') {
                                    num1++;
                                }
                                else {
                                    num2++;
                                }
                            });
                            if (num1 >= 2) {
                                player.chooseUseTarget({ name: 'sha' }, '可以视为打出一张杀', false).set('ai', function (target) {
                                    var player = _status.event.player;
                                    return get.effect(target, { name: 'sha' }, player, player);
                                });
                            }
                            if (num2 >= 2)
                                event.change = true;
                            'step 1';
                            if (event.change) {
                                player.chooseTarget('令一名角色回复一点体力', function (card, player, target) {
                                    return target.hp < target.maxHp;
                                }).ai = function (target) {
                                    var att = get.attitude(_status.event.player, target);
                                    return att;
                                };
                            }
                            else {
                                event.finish();
                            }
                            'step 2';
                            if ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length) {
                                result.targets[0].recover();
                            }
                        },
                    }
                },
            },
            re_dianyin: {
                trigger: { player: 'damageEnd' },
                content() {
                    'step 0';
                    event.num = trigger.num;
                    'step 1';
                    var next = player.chooseTarget('令一名角色摸两张牌');
                    next.set('prompt2', '（若其手牌数少于你或为全场最少，改为摸三张牌）');
                    next.set('ai', function (target) {
                        var player = _status.event.player;
                        var att = get.attitude(player, target);
                        return att;
                    });
                    'step 2';
                    if (result.bool) {
                        var target = result.targets[0];
                        player.line(target, 'green');
                        if (target.countCards('h') < player.countCards('h') || target.isMinHandcard()) {
                            target.draw(3);
                        }
                        else {
                            target.draw(2);
                        }
                    }
                    'step 3';
                    if (--event.num > 0) {
                        player.chooseBool(get.prompt2('dianyin'));
                    }
                    else {
                        event.finish();
                    }
                    'step 4';
                    if (result.bool) {
                        player.logSkill('dianyin');
                        event.goto(1);
                    }
                },
                ai: {
                    maixie: true,
                },
            },
            kouhu: {
                group: ['kouhu_shan', 'kouhu_sha'],
                subSkill: {
                    shan: {
                        enable: ['chooseToUse'],
                        viewAs: { name: 'shan' },
                        viewAsFilter(player) {
                            if (!_status.currentPhase)
                                return false;
                        },
                        filterCard: () => false,
                        selectCard: -1,
                        filter(event, player) {
                            if (player.hasSkill('kouhu_usedShan'))
                                return false;
                            return true;
                        },
                        precontent() {
                            player.addTempSkill('kouhu_usedShan', 'roundStart');
                            _status.currentPhase.draw();
                        }
                    },
                    sha: {
                        enable: ['chooseToRespond'],
                        viewAs: { name: 'sha' },
                        viewAsFilter(player) {
                            if (!_status.currentPhase)
                                return false;
                        },
                        filterCard: () => false,
                        selectCard: -1,
                        filter(event, player) {
                            if (player.hasSkill('kouhu_usedSha'))
                                return false;
                            return true;
                        },
                        precontent() {
                            player.addTempSkill('kouhu_usedSha', 'roundStart');
                            _status.currentPhase.draw();
                        }
                    },
                    usedShan: {},
                    usedSha: {},
                }
            },
            zhiqiu: {
                trigger: { player: ['useCardAfter', 'respondAfter'] },
                filter(event, player) {
                    var name = get.name(event.card);
                    if (!['sha', 'shan'].contains(name))
                        return false;
                    return event.skill && event.skill == 'kouhu_' + name && player.countCards('h') > 0 && game.hasPlayer((cur) => {
                        return player.canCompare(cur);
                    });
                },
                content() {
                    'step 0';
                    player.chooseTarget(true, '『直球』：与一名角色拼点', function (card, player, target) {
                        return player.canCompare(target);
                    });
                    'step 1';
                    if (result.bool) {
                        var target = result.targets[0];
                        event.target = target;
                        player.logSkill('zhiqiu', target);
                        player.chooseToCompare(target);
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (result.bool) {
                        player.chooseTarget(true, '『直球』：对一名角色造成一点伤害').set('ai', function (target) {
                            var player = _status.event.player;
                            return get.damageEffect(target, player, player);
                        });
                    }
                    else {
                        player.damage(event.target);
                        event.finish();
                    }
                    'step 3';
                    if (result.bool && result.targets && result.targets[0]) {
                        result.targets[0].damage(player);
                    }
                }
            },
            re_shengcai: {
                trigger: { player: 'useCardAfter' },
                priority: 123,
                filter(event, player) {
                    var repeat = 0;
                    var another = 0;
                    game.hasPlayer((cur) => {
                        cur.getHistory('useCard', (evt) => {
                            if (get.color(evt.card, cur) == get.color(event.card, player)) {
                                repeat++;
                            }
                            else {
                                another++;
                            }
                            ;
                        });
                    });
                    return repeat == 1 && another;
                },
                frequent: true,
                content() {
                    var stats = 0;
                    game.hasPlayer((cur) => {
                        cur.getHistory('useCard', (evt) => {
                            if (get.color(evt.card, cur) == get.color(trigger.card, player)) {
                            }
                            else {
                                stats++;
                            }
                            ;
                        });
                    });
                    player.draw(stats);
                },
                mod: {
                    aiOrder(player, card, num) {
                        if (typeof card == 'object' && player != _status.currentPhase) {
                            if (lib.skill.re_shengcai.filter({ card: card }, player)) {
                                return num + 10;
                            }
                        }
                    },
                },
            },
            liansheng: {
                trigger: { player: 'changeHp' },
                forced: true,
                silent: true,
                firstDo: true,
                content() {
                    if (player.hp == player.maxHp && player.sex == 'female') {
                        player.sex = 'male';
                        player.markSkill('liansheng');
                        game.log(player, '的性别变更为', '#g' + get.translation(player.sex));
                        if (_status.currentPhase && _status.currentPhase.sex == 'female')
                            player.draw();
                    }
                    if (player.hp < player.maxHp && player.sex == 'male') {
                        player.sex = 'female';
                        player.markSkill('liansheng');
                        game.log(player, '的性别变更为', '#g' + get.translation(player.sex));
                        if (_status.currentPhase && _status.currentPhase.sex == 'female')
                            player.draw();
                    }
                },
                mark: true,
                intro: {
                    content(storage, player) {
                        return '当前性别：' + get.translation(player.sex);
                    },
                },
            },
            ruantang: {
                trigger: { player: 'phaseJudgeBefore' },
                direct: true,
                content() {
                    "step 0";
                    var check = player.countCards('h') >= 2 && player.hp < player.maxHp;
                    player.chooseTarget(get.prompt('ruantang'), '令至多一名异性角色与自己各回复一点体力（选择自己则表示仅为自己回复体力）', function (card, player, target) {
                        return target == player || (target.sex != player.sex && target.isDamaged());
                    }).set('check', check).set('ai', function (target) {
                        if (!_status.event.check)
                            return 0;
                        var att = get.attitude(_status.event.player, target);
                        return att;
                    });
                    "step 1";
                    if (result.bool) {
                        event.target = result.targets[0];
                        var target = result.targets[0];
                        if (target != player) {
                            player.logSkill('ruantang', target);
                            if (target.hp < target.maxHp)
                                event.recover1 = 1;
                            target.recover();
                        }
                        else {
                            player.logSkill('ruantang');
                        }
                        if (player.hp < player.maxHp)
                            event.recover2 = 1;
                        player.recover();
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (event.recover1 && event.target.hp == event.target.maxHp)
                        event.target.draw();
                    if (event.recover2 && player.hp == player.maxHp)
                        player.draw();
                    "step 3";
                    trigger.cancel();
                    player.skip('phaseDraw');
                },
            },
            yaozhan: {
                trigger: { player: ['phaseDrawBefore', 'phaseUseBefore'] },
                direct: true,
                content() {
                    "step 0";
                    var _a;
                    var check = player.countCards('h') > 2;
                    if (trigger.name == 'phaseUse' && player.getHandcardLimit() > 2)
                        check = player.countCards('h') <= player.getHandcardLimit();
                    player.chooseTarget('###是否发动『邀战』？###跳过' + get.translation(trigger.name) + '，视为对一名其他角色使用一张【决斗】', function (card, player, target) {
                        if (player == target)
                            return false;
                        return player.canUse({ name: 'juedou' }, target);
                    }).set('check', check).set('ai', function (target) {
                        if (!_status.event.check)
                            return 0;
                        return get.effect(target, { name: 'juedou' }, _status.event.player);
                    });
                    "step 1";
                    if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                        player.logSkill('yaozhan', result.targets);
                        player.useCard({ name: 'juedou' }, result.targets[0]);
                        trigger.cancel();
                    }
                }
            },
            chongxin: {
                init(player, skill) {
                    var _a;
                    var _b;
                    (_a = (_b = player.storage)[skill]) !== null && _a !== void 0 ? _a : (_b[skill] = []);
                },
                mark: true,
                intro: {
                    name: '崇新',
                    content: 'cards',
                    onunmark(storage, player) {
                        if (storage && storage.length) {
                            player.$throw(storage, 1000);
                            game.cardsDiscard(storage);
                            game.log(storage, '被置入了弃牌堆');
                            storage.length = 0;
                        }
                    },
                },
                cardAround: true,
                trigger: { global: 'judge' },
                filter(event, player) {
                    var suit0 = get.suit(event.player.judging[0]);
                    return player.countCards('he', { suit: suit0 }) > 0;
                },
                direct: true,
                content() {
                    'step 0';
                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('chongxin'), 'he', (card) => {
                        var judging = _status.event.judging;
                        if (get.suit(card) != get.suit(judging))
                            return false;
                        var player = _status.event.player;
                        var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                        if (mod2 != 'unchanged')
                            return mod2;
                        var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                        if (mod != 'unchanged')
                            return mod;
                        return true;
                    }).set('ai', (card) => {
                        var trigger = _status.event.getTrigger();
                        var player = _status.event.player;
                        var judging = _status.event.judging;
                        var result = trigger.judge(card) - trigger.judge(judging);
                        var attitude = get.attitude(player, trigger.player);
                        if (attitude == 0 || result == 0)
                            return 0;
                        if (attitude > 0) {
                            return result;
                        }
                        else {
                            return -result;
                        }
                    }).set('judging', trigger.player.judging[0]);
                    'step 1';
                    if (result.bool) {
                        player.respond(result.cards, 'highlight', 'noOrdering');
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (result.bool) {
                        event.card = trigger.player.judging[0];
                        player.gain(event.card, 'gain2');
                        trigger.player.judging[0] = result.cards[0];
                        trigger.orderingCards.addArray(result.cards);
                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                    }
                    else {
                        event.finish();
                    }
                    'step 3';
                    player.chooseBool('是否将' + get.translation(event.card) + '置于武将牌上');
                    'step 4';
                    if (result.bool) {
                        var card = event.card;
                        player.lose(card, ui.special, 'toStorage');
                        player.$give(card, player, false);
                        player.markAuto('chongxin', [card]);
                        game.log(player, '将', card, '置于武将牌上');
                    }
                    game.delay(1);
                },
                global: 'chongxin2',
                ai: {
                    rejudge: true,
                    tag: {
                        rejudge: 0.2,
                    }
                },
            },
            chongxin2: {
                mod: {
                    cardEnabled(card, player, now) {
                        var _a, _b;
                        if (_status.event.type == 'wuxie' && _status.event.getParent().name == '_wuxie' && _status.event.getParent().card.name == 'juedou') {
                            let source = _status.event.getParent().player;
                            if (source != player && source.hasSkill('chongxin') && ((_b = (_a = source.storage) === null || _a === void 0 ? void 0 : _a.chongxin) === null || _b === void 0 ? void 0 : _b.length)) {
                                let suits = get.suit3(source.storage.chongxin);
                                return !suits.contains(get.suit(card));
                            }
                        }
                    },
                    cardRespondable(card, player, now) {
                        var _a, _b;
                        if (_status.event.name == 'chooseToRespond' && _status.event.getParent().name == 'juedou') {
                            let source = _status.event.getParent().player;
                            if (source != player && source.hasSkill('chongxin') && ((_b = (_a = source.storage) === null || _a === void 0 ? void 0 : _a.chongxin) === null || _b === void 0 ? void 0 : _b.length)) {
                                let suits = get.suit3(source.storage.chongxin);
                                return !suits.contains(get.suit(card));
                            }
                        }
                    },
                },
            },
            yayun: {
                audio: true,
                clickable(player) {
                    player.storage.yayun = false;
                    player.updateMark('yayun', true);
                    lib.skill.yayun.laohuji(player);
                    if (_status.imchoosing) {
                        delete _status.event._cardChoice;
                        delete _status.event._targetChoice;
                        game.check();
                    }
                },
                clickableFilter(player) {
                    return player.storage.yayun == true && player.countDiscardableCards(player, 'h');
                },
                laohuji(player) {
                    console.log('Outter');
                    var next = game.createEvent('laohuji');
                    next.player = player;
                    next.setContent(function () {
                        'step 0';
                        var audio = [player.name, player.name1, player.name2].contains('re_NijikawaRaki');
                        player.logSkill('yayun', true, true, true, audio);
                        event.discards = player.getDiscardableCards(player, 'h');
                        player.discard(event.discards);
                        if (event.discards.length == 0)
                            event.finish();
                        else
                            event.cards = [];
                        'step 1';
                        var suits = get.suit3(event.discards);
                        var next = player.judge((card) => {
                            var suits = _status.event.suits;
                            if (suits.contains(get.suit(card)))
                                return 1;
                            return -1;
                        });
                        next.set('callback', function () {
                        });
                        next.set('suits', suits);
                        if (!event.num)
                            event.num = 1;
                        else
                            event.num++;
                        'step 2';
                        console.log(event.num);
                        if (result.bool) {
                            player.draw();
                        }
                        if (event.num < 3) {
                            event.cards.push(result.card);
                            event.goto(1);
                        }
                        else {
                            event.cards.push(result.card);
                        }
                        'step 3';
                        if (event.cards.length == 3) {
                            var suits = get.suit3(event.cards);
                            if (suits.length == 1) {
                                player.draw(3);
                                game.playAudio('skill', 'laohuji');
                            }
                        }
                    });
                },
                init(player) {
                    player.storage.yayun = true;
                },
                mark: true,
                trigger: { global: 'roundStart' },
                direct: true,
                content() {
                    player.storage.yayun = true;
                    player.updateMark('yayun', true);
                },
                intro: {
                    mark(dialog, content, player) {
                        if (player.isUnderControl(true)) {
                            if (_status.gameStarted) {
                                if (player.storage.yayun) {
                                    if (!player.getDiscardableCards(player, 'h'))
                                        dialog.addText('不可发动');
                                    else
                                        dialog.add(ui.create.div('.menubutton.pointerdiv', '点击发动', function () {
                                            if (!this.disabled) {
                                                this.disabled = true;
                                                this.classList.add('disabled');
                                                this.style.opacity = 0.5;
                                                lib.skill.yayun.clickable(player);
                                            }
                                        }));
                                }
                                else
                                    dialog.addText('本轮已发动');
                            }
                        }
                        else {
                            if (player.storage.yayun)
                                dialog.addText('本轮未发动');
                            else
                                dialog.addText('本轮已发动');
                        }
                    },
                    content(content, player) {
                        if (player.isUnderControl(true)) {
                        }
                        else {
                            if (content)
                                return '本轮未发动';
                            else
                                return '本轮已发动';
                        }
                    }
                },
            },
            jidao: {
                audio: 3,
                audioname: ['jike'],
                trigger: { source: 'damageBegin2' },
                priority: 9,
                filter(event, player) {
                    return event.num > 0;
                },
                check(event, player) {
                    return get.damageEffect(event.player, player, player) < 0
                        || (event.player.countCards('h') > 4 && get.attitude(player, event.player) < 0);
                },
                logTarget: 'player',
                content() {
                    'step 0';
                    event.target = trigger.player;
                    trigger.changeToZero();
                    'step 1';
                    lib.skill.yayun.laohuji(event.target);
                },
            },
            ywshuangxing: {
                trigger: { target: 'useCardToBefore' },
                priority: 15,
                check(event, player) {
                    return get.effect(event.target, event.card, event.player, player) < 0;
                },
                filter(event, player) {
                    return get.type2(event.card) != 'basic' && get.color(event.card) == 'black' && player.hp % 2 == 1
                        || get.type2(event.card) != 'equip' && get.color(event.card) == 'red' && player.hp % 2 == 0;
                },
                content() {
                    trigger.cancel();
                },
                ai: {
                    effect: {
                        target(card, player, target, current) {
                            if ((get.type2(card) != 'basic' && get.color(card) == 'black' && player.hp % 2 == 1
                                || get.type2(card) != 'equip' && get.color(card) == 'red' && player.hp % 2 == 0)
                                && current < 0)
                                return 'zeroplayertarget';
                        },
                    }
                }
            },
            yinni: {
                trigger: { player: 'useCard2' },
                direct: true,
                filter(event, player) {
                    var card = event.card;
                    var info = get.info(card);
                    if (info.allowMultiple == false)
                        return false;
                    if (event.targets && !info.multitarget) {
                        if (player.storage.yinni_record_color && player.storage.yinni_record_color != get.color(card)) {
                            return event.targets.length != player.storage.yinni_record;
                        }
                    }
                    return false;
                },
                content() {
                    'step 0';
                    var num = player.storage.yinni_record - trigger.targets.length;
                    if (num > 0) {
                        var prompt2 = '为' + get.translation(trigger.card) + '增加目标至' + get.cnNumber(player.storage.yinni_record) + '个';
                        player.chooseTarget(num, get.prompt('yinni'), function (card, player, target) {
                            var player = _status.event.player;
                            return !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                        }).set('prompt2', prompt2).set('ai', function (target) {
                            var trigger = _status.event.getTrigger();
                            var player = _status.event.player;
                            return get.effect(target, trigger.card, player, player);
                        }).set('card', trigger.card).set('targets', trigger.targets);
                    }
                    else if (num < 0) {
                        player.chooseTarget(-num, get.prompt('yinni'), '为' + get.translation(trigger.card) + '减少目标至' + get.cnNumber(player.storage.yinni_record) + '个', function (card, player, target) {
                            return _status.event.targets.contains(target);
                        }).set('targets', trigger.targets).set('ai', function (target) {
                            var player = _status.event.player;
                            return -get.effect(target, _status.event.getTrigger().card, player, player);
                        });
                    }
                    'step 1';
                    if (result.bool) {
                        if (!event.isMine())
                            game.delayx();
                        event.targets = result.targets;
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (event.targets) {
                        player.logSkill('yinni', event.targets);
                        if (trigger.targets.contains(event.targets[0])) {
                            player.draw();
                            trigger.targets.removeArray(event.targets);
                        }
                        else
                            trigger.targets.addArray(event.targets);
                    }
                },
                group: 'yinni_record',
                subSkill: {
                    record: {
                        trigger: {
                            global: 'useCardAfter',
                        },
                        silent: true,
                        firstDo: true,
                        filter(event, player) {
                            if (!event.card || !get.color(event.card) || !event.targets || !event.targets.length)
                                return false;
                            var type = get.type2(event.card);
                            return type != 'equip';
                        },
                        content() {
                            player.storage.yinni_record = trigger.targets.length;
                            player.storage.yinni_record_color = get.color(trigger.card);
                            if (!player.isUnseen(1))
                                player.markSkill('yinni_record');
                        },
                        intro: {
                            content: '上一张牌的目标数为&'
                        },
                    }
                }
            },
            re_pojie: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = 0;
                },
                trigger: {
                    global: ['loseAfter'],
                },
                marktext: "戒",
                mark: true,
                intro: {
                    content: '出牌阶段结束时弃置#张牌',
                },
                filter(event, player) {
                    var _a;
                    if (player != _status.currentPhase)
                        return false;
                    return (_a = event === null || event === void 0 ? void 0 : event.es) === null || _a === void 0 ? void 0 : _a.length;
                },
                content() {
                    player.draw();
                    player.addMark('re_pojie', 1, false);
                },
                group: 're_pojie_phaseDiscard',
                subSkill: {
                    phaseDiscard: {
                        trigger: { player: ['phaseUseEnd', 'phaseEnd'] },
                        direct: true,
                        lastDo: true,
                        priority: 2,
                        filter(event, player) {
                            return player.storage.re_pojie > 0;
                        },
                        content() {
                            'step 0';
                            if (trigger.name == 'phaseUse') {
                                player.logSkill('re_pojie');
                                player.chooseToDiscard(player.storage.re_pojie, true, 'h');
                                trigger.cancel();
                            }
                            'step 1';
                            player.storage.re_pojie = 0;
                            player.unmarkSkill('re_pojie');
                        },
                    },
                },
            },
            re_dazhen: {
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.getEquip(1);
                },
                filterCard(card, player) {
                    return get.subtype(card) == 'equip1';
                },
                discard: false,
                position: 'e',
                filterTarget(card, player, target) {
                    return target != player;
                },
                content() {
                    'step 0';
                    player.$give(cards, target);
                    target.equip(cards[0]);
                    'step 1';
                    event.num = Math.abs(player.getHandcardLimit() - player.countCards('h'));
                    target.chooseToDiscard('『大振』：弃置' + get.cnNumber(event.num) + '张牌，否则受到' + get.translation(player) + '造成的1点伤害', event.num, 'he');
                    'step 2';
                    if (result.bool && result.cards) {
                        event.finish();
                    }
                    else {
                        target.damage(player);
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        target(player, target) {
                            if (player.countCards('h') > player.getHandcardLimit()) {
                                return -1;
                            }
                            else {
                                return 0;
                            }
                        },
                        player(player, target) {
                            if (target.getEquip(1))
                                return 1;
                            else
                                return -0.5;
                        },
                    },
                    threaten: 1.2,
                },
            },
            re_DDzhanshou: {
                audio: 'DDzhanshou',
                trigger: { global: 'phaseEnd' },
                priority: 77,
                frequent: true,
                filter(event, player) {
                    var history = event.player.getHistory('useCard');
                    var DD = false;
                    history.forEach(function (his) {
                        if (!(his.targets.contains(event.player) || his.targets.contains(player)) && get.color(his.card) == 'red')
                            DD = true;
                    });
                    return DD;
                },
                content() {
                    'step 0';
                    if (trigger.player == player) {
                        player.draw();
                        event.finish();
                    }
                    else {
                        player.chooseToUse({
                            preTarget: target,
                            filterCard(card, player) {
                                return get.name(card) == 'sha' && lib.filter.filterCard.apply(this, arguments);
                            },
                            filterTarget(card, player, target) {
                                return target == _status.event.preTarget && lib.filter.filterTarget.apply(this, arguments);
                            },
                            addCount: false,
                            nodistance: true,
                            prompt: 'DD斩首！(若不出【杀】则摸一张牌）',
                        }).set('logSkill', ['re_DDzhanshou', trigger.player]);
                    }
                    'step 1';
                    if (result.bool) {
                        event.finish();
                    }
                    else {
                        player.draw();
                    }
                },
            },
            re_taiyangzhiyin: {
                audio: 'taiyangzhiyin',
                trigger: { player: 'useCard2' },
                filter(event, player) {
                    return get.number(event.card) > 10 && (player.storage.onlink == null || player.storage.onlink.indexOf(event.card.cardid) == -1);
                },
                priority: 1,
                forced: false,
                content() {
                    var info = get.info(trigger.card);
                    var players = game.filterPlayer();
                    if (player.storage.onlink == null) {
                        player.storage.onlink = [];
                    }
                    'step 0';
                    var list = [['无法响应'], ['额外目标'], ['摸一张牌']];
                    if (!game.hasPlayer((cur) => lib.filter.targetEnabled2(trigger.card, player, cur)
                        && player.inRange(cur)
                        && !trigger.targets.contains(cur)
                        && (get.type(trigger.card) != 'equip' && get.type(trigger.card) != 'delay'))) {
                        list.splice(1, 1);
                    }
                    event.videoId = lib.status.videoId++;
                    game.broadcastAll(function (id, choicelist, Dvalue) {
                        var dialog = ui.create.dialog('选择' + Dvalue + '项');
                        choicelist.forEach((element) => {
                            dialog.add([element, 'vcard']);
                        });
                        dialog.videoId = id;
                    }, event.videoId, list, 1);
                    player.storage.onlink.push(trigger.card.cardid);
                    'step 1';
                    player.chooseButton(1).set('dialog', event.videoId).set('prompt', get.prompt('re_taiyangzhiyin'));
                    'step 2';
                    game.broadcastAll('closeDialog', event.videoId);
                    if (result.bool) {
                        result.links.forEach((element) => {
                            if (element[2] == "摸一张牌") {
                                player.draw();
                            }
                            if (element[2] == "无法响应") {
                                game.log(player, '令', trigger.card, '无法被响应');
                                trigger.directHit.addArray(game.players);
                                trigger.nowuxie = true;
                            }
                        });
                        result.links.forEach((element) => {
                            if (element[2] == "额外目标") {
                                player.chooseTarget(true, '额外指定一名' + get.translation(trigger.card) + '的目标？', function (card, player, target) {
                                    var trigger = _status.event;
                                    if (trigger.targets.contains(target))
                                        return false;
                                    return lib.filter.targetEnabled2(trigger.card, _status.event.player, target);
                                }).set('ai', function (target) {
                                    var trigger = _status.event.getTrigger();
                                    var player = _status.event.player;
                                    return get.effect(target, trigger.card, player, player);
                                }).set('targets', trigger.targets).set('card', trigger.card);
                            }
                        });
                    }
                    'step 3';
                    if (result === null || result === void 0 ? void 0 : result.bool) {
                        if (!event.isMine())
                            game.delayx();
                        event.target = result.targets[0];
                        if (event.target) {
                            trigger.targets.add(event.target);
                        }
                    }
                },
                group: 're_taiyangzhiyin_clear',
                subSkill: {
                    clear: {
                        trigger: { player: ['useCardAfter'] },
                        forced: true,
                        silent: true,
                        firstDo: true,
                        content() {
                            if (player.storage.onlink != null) {
                                var deleteIndex = player.storage.onlink.indexOf(trigger.card.cardid);
                                if (deleteIndex != -1) {
                                    player.storage.onlink.splice(deleteIndex, 1, null);
                                }
                            }
                        }
                    }
                }
            },
            re_mozhaotuji: {
                audio: true,
                audioname: ['jike'],
                group: ['re_mozhaotuji_DrawOrStop', 're_mozhaotuji_useCard', 're_mozhaotuji_Ready', 're_mozhaotuji_Judge', 're_mozhaotuji_PhaseDraw', 're_mozhaotuji_Discard', 're_mozhaotuji_End'],
                contentx(trigger, player) {
                    'step 0';
                    trigger.cancel();
                    'step 1';
                    player.addTempSkill('re_mozhaotujiStop');
                    player.phaseUse();
                    'step 2';
                    let stat = player.getStat();
                    stat.card = {};
                    for (let i in stat.skill) {
                        let bool = false;
                        let info = lib.skill[i];
                        if (info.enable != undefined) {
                            if (typeof info.enable == 'string' && info.enable == 'phaseUse')
                                bool = true;
                            else if (typeof info.enable == 'object' && info.enable.contains('phaseUse'))
                                bool = true;
                        }
                        if (bool)
                            stat.skill[i] = 0;
                    }
                },
                subSkill: {
                    DrawOrStop: {
                        trigger: { global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd'] },
                        filter(event, player) {
                            if ((player.storage.re_mozhaotuji_useCard) >= 1)
                                return true;
                            else if ((player.storage.re_mozhaotuji_useCard) == 0)
                                return player == _status.currentPhase;
                            else
                                return false;
                        },
                        priority: 14,
                        direct: true,
                        content() {
                            'step 0';
                            if ((player.storage.re_mozhaotuji_useCard) >= 2) {
                                player.logSkill('re_mozhaotuji');
                                player.draw(1);
                            }
                            'step 1';
                            player.storage.re_mozhaotuji_useCard = 0;
                        },
                    },
                    useCard: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = 0;
                        },
                        trigger: { player: 'useCardAfter' },
                        direct: true,
                        silent: true,
                        priority: 1,
                        content() {
                            player.storage.re_mozhaotuji_useCard++;
                        },
                    },
                    Ready: {
                        audio: 're_mozhaotuji',
                        trigger: {
                            player: 'phaseZhunbeiBegin'
                        },
                        filter(event, player) {
                            return !player.hasSkill('re_mozhaotujiStop');
                        },
                        prompt() {
                            return '把准备阶段转换为出牌阶段';
                        },
                        content() {
                            lib.skill.re_mozhaotuji.contentx(trigger, player);
                        },
                    },
                    Judge: {
                        audio: 're_mozhaotuji',
                        trigger: {
                            player: 'phaseJudgeBefore'
                        },
                        filter(event, player) {
                            return !player.hasSkill('re_mozhaotujiStop');
                        },
                        prompt() {
                            return '把判定阶段转换为出牌阶段';
                        },
                        content() {
                            lib.skill.re_mozhaotuji.contentx(trigger, player);
                        },
                    },
                    PhaseDraw: {
                        audio: 're_mozhaotuji',
                        trigger: {
                            player: 'phaseDrawBefore'
                        },
                        filter(event, player) {
                            return !player.hasSkill('re_mozhaotujiStop');
                        },
                        prompt() {
                            return '把摸牌阶段转换为出牌阶段';
                        },
                        content() {
                            lib.skill.re_mozhaotuji.contentx(trigger, player);
                        },
                    },
                    Discard: {
                        audio: 're_mozhaotuji',
                        trigger: {
                            player: 'phaseDiscardBefore'
                        },
                        filter(event, player) {
                            return !player.hasSkill('re_mozhaotujiStop');
                        },
                        prompt() {
                            return '把弃牌阶段转换为出牌阶段';
                        },
                        content() {
                            lib.skill.re_mozhaotuji.contentx(trigger, player);
                        },
                    },
                    End: {
                        audio: 're_mozhaotuji',
                        trigger: {
                            player: 'phaseJieshuBegin'
                        },
                        filter(event, player) {
                            return !player.hasSkill('re_mozhaotujiStop');
                        },
                        prompt() {
                            return '把结束阶段转换为出牌阶段';
                        },
                        content() {
                            lib.skill.re_mozhaotuji.contentx(trigger, player);
                        },
                    },
                }
            },
            re_mozhaotujiStop: {},
            re_bingdielei: {
                audio: 'bingdielei',
                trigger: { global: 'phaseEnd' },
                round: 1,
                prompt2: '获得一个额外回合',
                filter(event, player) {
                    return player.getHistory('lose').length;
                },
                content() {
                    player.unmarkSkill(event.name);
                    player.logSkill(event.name);
                    player.insertPhase();
                },
                group: ['re_bingdielei_lose'],
                subSkill: {
                    lose: {
                        trigger: { player: 'loseAfter' },
                        priority: 99,
                        silent: true,
                        popup: false,
                        forced: true,
                        filter(event, player) {
                            return event.cards.length && !player.storage.re_bingdielei_roundcount;
                        },
                        direct: true,
                        content() {
                            player.addTempSkill('re_bingdielei_mark');
                        },
                    },
                    mark: {
                        mark: true,
                        marktext: '蕾',
                        intro: {
                            content: '当前回合结束后可以获得一个额外回合',
                            name: '盛蕾',
                        },
                    },
                },
            },
            re_zhenyin: {
                audio: 'zhenyin',
                trigger: {
                    player: 'useCardToPlayered',
                },
                usable: 1,
                filter(event, player) {
                    var num = 0;
                    event.targets.forEach(function (tar) {
                        num += tar.countCards('hej');
                    });
                    return event.targets.length
                        && num > 0
                        && get.color(event.card) == 'black';
                },
                content() {
                    'step 0';
                    var _a;
                    player.chooseTarget('选择『震音』的目标', function (card, player, target) {
                        return _status.event.targets.contains(target);
                    }).set('targets', trigger.targets);
                    'step 1';
                    if (result.bool) {
                        event.A = result.targets[0];
                        event.B = event.A.next;
                        if (!event.A.countCards('hej'))
                            event.finish();
                        else {
                            player.choosePlayerCard('hej', event.A).set('ai', function (button) {
                                var player = _status.event.player;
                                var source = _status.event.target;
                                var target = source.next;
                                var link = button.link;
                                if (get.position(link) == 'j') {
                                    if (target.canAddJudge(link))
                                        return get.effect(target, link, player, player);
                                    else
                                        return get.damageEffect(target, player, player);
                                }
                                else if (get.position(link) == 'e') {
                                    var subtype = get.subtype(link);
                                    if (!target.getEquip(subtype))
                                        return get.effect(target, link, player, player);
                                    else
                                        return get.damageEffect(target, player, player);
                                }
                                else {
                                    return get.value(link, target, 'raw') * get.attitude(player, target);
                                }
                            });
                        }
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (result.bool && ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length)) {
                        let card = result.links[0];
                        let dam = false;
                        if (get.position(card) == 'e') {
                            var c = event.B.getEquip(get.subtype(card));
                            if (c) {
                                dam = true;
                                game.log(c, '掉落了');
                            }
                            event.B.equip(card);
                        }
                        else if (get.position(card) == 'j') {
                            var cname = card.viewAs ? card.viewAs : get.name(card);
                            event.B.getCards('j').forEach(function (c) {
                                if (get.name(c) == cname) {
                                    game.log(c, '掉落了');
                                    game.cardsDiscard(c);
                                    dam = true;
                                }
                            });
                            event.B.addJudge({ name: cname }, [card]);
                        }
                        else {
                            event.B.gain(card, event.A);
                        }
                        event.A.$give(card, event.B);
                        if (dam)
                            event.B.damage('nocard');
                        game.delay();
                    }
                }
            },
            re_shuangren: {
                audio: 'kuangbaoshuangren',
                trigger: { player: 'shaBegin' },
                priority: 98,
                forced: true,
                filter(event, player) {
                    return get.color(event.card) == 'red';
                },
                content() { },
                group: ['re_shuangren_red', 're_shuangren_black'],
                subSkill: {
                    red: {
                        mod: {
                            targetInRange(card, player) {
                                if (_status.currentPhase == player && card.name == 'sha' && get.color(card) == 'red')
                                    return true;
                            },
                            cardUsable(card, player, num) {
                                if (card.name == 'sha' && get.color(card) == 'red')
                                    return Infinity;
                            },
                        },
                    },
                    black: {
                        trigger: { player: 'useCard2' },
                        filter(event, player) {
                            if (event.card.name != 'sha' || get.color(event.card) == 'red')
                                return false;
                            return game.hasPlayer((cur) => !event.targets.contains(cur) && player.canUse(event.card, cur));
                        },
                        direct: true,
                        content() {
                            'step 0';
                            player.chooseTarget(get.prompt('re_shuangren'), '为' + get.translation(trigger.card) + '增加一个目标', function (card, player, target) {
                                return !_status.event.sourcex.contains(target) && player.canUse(_status.event.card, target);
                            }).set('sourcex', trigger.targets).set('card', trigger.card);
                            'step 1';
                            if (result.bool) {
                                if (!event.isMine() && !_status.connectMode)
                                    game.delayx();
                                event.target = result.targets[0];
                            }
                            else {
                                event.finish();
                            }
                            'step 2';
                            player.logSkill('re_shuangren', event.target);
                            trigger.targets.push(event.target);
                        },
                    },
                }
            },
            re_jitui: {
                audio: 'guangsuxiabo',
                audioname: ['jike'],
                trigger: {
                    player: ['loseAfter', 'damageAfter'],
                },
                filter(event, player) {
                    if (event.name == 'damage')
                        return true;
                    var unB = event.cards.filter((card) => get.type(card) != 'basic');
                    return player != _status.currentPhase && event.visible && event.name == 'lose' && unB.length;
                },
                priority: 98,
                content() {
                    player.draw();
                },
            },
            re_dianmingguzhen: {
                audio: 'dianmingguzhen',
                enable: "phaseUse",
                usable: 1,
                filter(event, player) {
                    return player.canMoveCard(null, true);
                },
                content() {
                    'step 0';
                    player.loseHp(1);
                    'step 1';
                    player.moveCard(true).set('nojudge', true).set('ai', function (target) {
                        var player = _status.event.player;
                        var att = get.attitude(player, target);
                        var sgnatt = get.sgn(att);
                        if (ui.selected.targets.length == 0) {
                            if (target == player) {
                                if (target.countCards('e', (card) => {
                                    return get.value(card, target) < 0
                                        && game.hasPlayer((cur) => cur != player && cur != target && get.attitude(player, cur) < 0 && cur.isEmpty(get.subtype(card)));
                                }) > 0)
                                    return 9;
                            }
                            else {
                                if (game.hasPlayer((cur) => {
                                    if (cur != target && cur != player && get.attitude(player, cur) > 0) {
                                        var es = target.getCards('e');
                                        for (let i = 0; i < es.length; i++) {
                                            if (get.value(es[i], target) > 0 && cur.isEmpty(get.subtype(es[i])) && get.value(es[i], cur) > 0)
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
                            if (sgnatt != 0 && att2 != 0 &&
                                get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
                                get.sgn(get.value(es[i], target)) == sgnatt &&
                                target.isEmpty(get.subtype(es[i]))) {
                                return Math.abs(att);
                            }
                        }
                        if (i == es.length) {
                            return 0;
                        }
                        return -att * get.attitude(player, ui.selected.targets[0]);
                    });
                    'step 2';
                    if (result.targets[0] == player) {
                        player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, '是否视为使用一张雷【杀】？', false);
                    }
                },
                ai: {
                    order: 7,
                    result: {
                        player(player, target) {
                            if (player.hp != 1)
                                return 1;
                            else
                                return -2;
                        },
                    },
                },
            },
            re_longdan: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = true;
                },
                hiddenCard(player, name) {
                    if (player.storage.re_longdan == true && name == 'sha' && lib.inpile.contains(name))
                        return player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' });
                    if (player.storage.re_longdan == false && get.type(name) == 'basic' && lib.inpile.contains(name))
                        return player.countCards('h', { name: 'sha' });
                },
                enable: ['chooseToUse', 'chooseToRespond'],
                usable: 1,
                filter(event, player) {
                    return player.storage.re_longdan == true && player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' }) || player.storage.re_longdan == false && player.countCards('h', { name: 'sha' });
                },
                chooseButton: {
                    dialog(event, player) {
                        var list = [];
                        for (let i of lib.inpile) {
                            let name = i;
                            if (player.storage.re_longdan == true && name == 'sha') {
                                list.push(['基本', '', 'sha']);
                                list.push(['基本', '', 'sha', 'fire']);
                                list.push(['基本', '', 'sha', 'thunder']);
                                list.push(['基本', '', 'sha', 'ice']);
                                list.push(['基本', '', 'sha', 'ocean']);
                            }
                            else if (player.storage.re_longdan == false && get.type(name) == 'basic' && name != 'sha')
                                list.push(['基本', '', name]);
                        }
                        return ui.create.dialog(get.translation('re_longdan'), [list, 'vcard']);
                    },
                    filter(button, player) {
                        return _status.event.getParent().filterCard({ name: button.link[2] }, player, _status.event.getParent());
                    },
                    check(button) {
                        var player = _status.event.player;
                        if (player.countCards('h', button.link[2]) > 0)
                            return 0;
                        var effect = player.getUseValue(button.link[2]);
                        if (effect > 0)
                            return effect;
                        return 0;
                    },
                    backup(links, player) {
                        return {
                            filterCard(card, player) {
                                if (player.storage.re_longdan == false)
                                    return get.name(card) == 'sha';
                                if (get.type(card) == 'basic' && get.name(card) != 'sha') {
                                    return true;
                                }
                                return false;
                            },
                            selectCard: 1,
                            popname: true,
                            check(card) {
                                return 6 - get.value(card);
                            },
                            position: 'hes',
                            viewAs: { name: links[0][2], nature: links[0][3], isCard: true },
                            onrespond() { return this.onuse.apply(this, arguments); },
                            onuse(result, player) {
                                if (player.storage.re_longdan == false)
                                    player.storage.re_longdan = true;
                                else
                                    player.storage.re_longdan = false;
                            },
                        };
                    },
                    prompt(links, player) {
                        if (player.storage.re_longdan == false)
                            return '将一张【杀】当作' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
                        return '将一张基本牌当作' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '使用或打出';
                    }
                },
                mod: {
                    targetInRange(card, player, target) {
                        if (_status.event.skill == 're_longdan_backup' && get.number(card) > 7)
                            return true;
                    },
                    cardUsable(card, player, num) {
                        console.log(_status.event.skill, card);
                        if (_status.event.skill == 're_longdan_backup' && get.number(card) > 7)
                            return Infinity;
                        var result = _status.event.getParent().result;
                        if ((result === null || result === void 0 ? void 0 : result.skill) == 're_longdan' && player.countCards('hes', function (card0) {
                            return get.number(card0) > 7;
                        }))
                            return Infinity;
                    },
                },
                ai: {
                    useSha: 1,
                    skillTagFilter(player, tag) {
                        switch (tag) {
                            case 'respondSha': {
                                if (player.storage.re_longdan != true || !player.countCards('h', { type: 'basic' }) > player.countCards('h', { name: 'sha' }))
                                    return false;
                                break;
                            }
                            case 'respondShan': {
                                if (player.storage.re_longdan != false || !player.countCards('h', { name: 'sha' }))
                                    return false;
                                break;
                            }
                            case 'save': {
                                if (player.storage.re_longdan != false || !player.countCards('h', { name: 'sha' }))
                                    return false;
                                break;
                            }
                        }
                    },
                    result: { player: 1 },
                    respondSha: true,
                    respondShan: true,
                    save: true,
                },
            },
            shenyou: {
                marktext: '神',
                intro: {
                    name: "神佑",
                    content: '<font color=#f66>你受到来自基本牌的伤害+1；其它的伤害-1。</font>',
                },
                mark: true,
                trigger: { player: 'damageBegin3' },
                forced: true,
                priority: 1,
                content() {
                    if (get.type(trigger.getParent(1).card, 'trick') == 'basic') {
                        trigger.num++;
                    }
                    else {
                        trigger.num--;
                    }
                },
                ai: {
                    notrick: 1,
                    effect: {
                        target(card, player, target, current) {
                            if (get.name(card, player) == 'sha')
                                return [0, -4];
                        },
                    },
                },
            },
            shenfa: {
                trigger: { player: 'loseAfter' },
                priority: 1,
                filter(event, player) {
                    if (!game.hasPlayer((cur) => {
                        return !cur.hasSkill('shenyou');
                    }))
                        return false;
                    return event.cards.length && event.hs.length;
                },
                direct: true,
                content() {
                    'step 0';
                    event.num = trigger.cards.length;
                    'step 1';
                    var next = player.chooseTarget('令一名其他角色获得『神佑』直到回合结束');
                    next.set('filterTarget', function (card, player, target) {
                        return !target.hasSkill('shenyou');
                    });
                    next.set('ai', function (target) {
                        var player = _status.event.player;
                        var evt = _status.event.getTrigger().getParent();
                        var cur = _status.currentPhase;
                        if ((player == cur && player.hasSha() && player.getCardUsable('sha')
                            && (player.countCards('h', (card) => get.tag(card, 'damage') && get.type('card') == 'trick') < 1)
                            || (evt.name == 'useCard' && evt.card.name == 'sha')) && player.inRange(target))
                            return get.damageEffect(target, player, player);
                        if (player != cur) {
                            if (cur.hasSkillTag('useSha') && get.attitude(cur, player) > 0)
                                return 10 - get.attitude(player, target);
                            if (cur.getCardUsable('sha') && cur.hasSha())
                                return 4 + get.attitude(player, cur) - get.attitude(player, target);
                        }
                        return get.attitude(player, target);
                    });
                    'step 2';
                    if (result.bool) {
                        player.logSkill('shenfa', result.targets[0]);
                        result.targets[0].addTempSkill('shenyou');
                        event.num--;
                        if (event.num) {
                            event.goto(1);
                        }
                        else {
                            event.finish();
                        }
                    }
                    else {
                        event.finish();
                    }
                },
            },
            yubing: {
                audio: 5,
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = 0;
                },
                trigger: { player: 'useCardAfter' },
                priority: 14,
                filter(event, player) {
                    return player.getHandcardLimit() && (get.type(event.card) == 'basic' || get.type(event.card) == 'trick')
                        && !(event.result.bool == false || event.iswuxied);
                },
                check(event, player) {
                    return player != _status.currentPhase || (player.getHandcardLimit() * 2) >= player.countCards('h');
                },
                content() {
                    player.storage.yubing++;
                    player.markSkill('yubing');
                    player.draw(2);
                },
                marktext: "冰",
                mark: true,
                intro: {
                    content: '手牌上限-#',
                },
                mod: {
                    maxHandcard(player, num) {
                        return num - player.storage.yubing;
                    },
                },
                group: 'yubing_clear',
                subSkill: {
                    clear: {
                        trigger: { global: 'phaseAfter' },
                        forced: true,
                        priority: 42,
                        filter(event, player) {
                            return player.hasMark('yubing');
                        },
                        content() {
                            player.unmarkSkill('yubing');
                            player.storage.yubing = 0;
                        }
                    },
                },
            },
            akxiaoqiao: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = [];
                },
                trigger: { player: 'phaseDiscardBegin' },
                filter(event, player) {
                    return player.countCards('h');
                },
                direct: true,
                lastDo: true,
                content() {
                    'step 0';
                    player.chooseCardButton('###' + get.prompt('akxiaoqiao') + '###展示任意张类型不同的手牌', player.getCards('h'), [1, 3]).set('filterButton', function (button) {
                        let type = get.type(button.link, 'trick');
                        for (let i of ui.selected.buttons) {
                            if (type == get.type(i.link, 'trick'))
                                return false;
                        }
                        return true;
                    });
                    'step 1';
                    if (result.bool && result.links) {
                        player.logSkill('akxiaoqiao');
                        let cards = result.links;
                        player.showCards(cards, '『小巧』展示手牌');
                        player.storage.akxiaoqiao.addArray(cards);
                    }
                },
                mod: {
                    ignoredHandcard(card, player) {
                        if (player.storage.akxiaoqiao && player.storage.akxiaoqiao.contains(card)) {
                            return true;
                        }
                    },
                    cardDiscardable(card, player, name) {
                        if (name == 'phaseDiscard' && player.storage.akxiaoqiao && player.storage.akxiaoqiao.contains(card)) {
                            return false;
                        }
                    },
                },
                group: 'akxiaoqiao_init',
                subSkill: {
                    init: {
                        trigger: { player: 'phaseAfter' },
                        forced: true,
                        silent: true,
                        popup: false,
                        content() {
                            player.storage.akxiaoqiao = [];
                        },
                    }
                },
            },
            liancheng: {
                trigger: { global: 'phaseEnd' },
                filter(event, player) {
                    if (player.storage.liancheng && player.storage.liancheng == 2)
                        return false;
                    return player.countCards('h');
                },
                content() {
                    'step 0';
                    player.chooseCardButton('###『链成』###重铸任意张类型不同的手牌', player.getCards('h'), [1, 3]).set('filterButton', function (button) {
                        let type = get.type(button.link, 'trick');
                        for (let i of ui.selected.buttons) {
                            if (type == get.type(i.link, 'trick'))
                                return false;
                        }
                        return true;
                    });
                    'step 1';
                    if (result.bool) {
                        player.storage.liancheng++;
                        var cards = result.links;
                        player.lose(cards, ui.discardPile).set('visible', true);
                        player.$throw(cards, 1000);
                        game.log(player, '将', cards, '置入了弃牌堆');
                        player.draw(cards.length);
                        if (player == _status.currentPhase || cards.filter((card) => get.type(card) == 'equip').length == 0)
                            event.finish();
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    event.diff = player.countCards('h') - _status.currentPhase.countCards('h');
                    if (event.diff == 0) {
                        event.finish();
                    }
                    'step 3';
                    var check = (event.diff > 0) ? (get.attitude(player, _status.currentPhase) > 0) : (get.attitude(player, _status.currentPhase) < 0);
                    var next = player.chooseBool('###『链成』###是否令当前回合角色调整手牌与你相同？');
                    next.set('ai', function () {
                        if (!_status.event.check)
                            return 0;
                        return 1;
                    });
                    next.set('check', check);
                    'step 4';
                    if (result.bool) {
                        if (event.diff > 0) {
                            _status.currentPhase.gain(get.cards(event.diff), 'draw');
                        }
                        else if (event.diff < 0) {
                            _status.currentPhase.chooseToDiscard(-event.diff, true, 'h');
                        }
                    }
                },
                mod: {
                    ignoredHandcard(card, player) {
                        if (player.storage.akxiaoqiao && player.storage.akxiaoqiao.contains(card)) {
                            return true;
                        }
                    },
                    cardDiscardable(card, player, name) {
                        if (name == 'phaseDiscard' && player.storage.akxiaoqiao && player.storage.akxiaoqiao.contains(card)) {
                            return false;
                        }
                    },
                },
                ai: {
                    expose: 0.2,
                },
                group: 'liancheng_init',
                subSkill: {
                    init: {
                        trigger: { global: 'roundStart' },
                        forced: true,
                        silent: true,
                        popup: false,
                        content() {
                            player.storage.liancheng = 0;
                        },
                    }
                },
            },
            re_yinliu: {
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.countDiscardableCards(player, 'he') > 0;
                },
                check(card) {
                    return 7 - get.value(card);
                },
                filterCard: true,
                position: 'he',
                selectCard: [1, 3],
                content() {
                    'step 0';
                    game.delayx();
                    'step 1';
                    player.draw();
                    'step 2';
                    if (get.itemtype(result) == 'cards') {
                        player.showCards(result);
                        cards.forEach(cur => {
                            if (get.suit3(result).contains(get.suit(cur)))
                                event.goto(1);
                        });
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        player: 1,
                    },
                    threaten: 0.6,
                },
                subSkill: {
                    used: {},
                },
            },
            re_zhanxie: {
                priority: 15,
                firstDo: true,
                mod: {
                    cardUsable(card, player, num) {
                        if (card.name == 'sha') {
                            return num + 2;
                        }
                    },
                },
                group: ['re_zhanxie_draw'],
                subSkill: {
                    draw: {
                        trigger: {
                            player: 'useCardAfter'
                        },
                        firstDo: true,
                        direct: true,
                        filter(event, player) {
                            if (event.card.name == 'sha')
                                return true;
                            else
                                return false;
                        },
                        content() {
                            if (player.countUsed('sha', true) == 3) {
                                player.draw(2);
                            }
                        },
                        ai: {
                            useSha: 1,
                            effect: {
                                player(card, player, target, current) {
                                    if (['sha'].contains(card.name) && player.countUsed('sha', true) == 2)
                                        return [1, 4];
                                }
                            }
                        }
                    }
                }
            },
            re_chongdian: {
                forced: true,
                trigger: { player: 'damageBegin4' },
                filter(event) {
                    return event.nature == 'thunder';
                },
                content() {
                    player.recover(trigger.num);
                    trigger.cancel(true);
                },
                group: 're_chongdian_leisha',
                subSkill: {
                    leisha: {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filterCard(card) {
                            return get.type(card) == 'equip';
                        },
                        position: 'hes',
                        viewAs: { name: 'sha', nature: 'thunder' },
                        check() { return 1; },
                        ai: {
                            effect: {
                                target(card, player, target, current) {
                                    if (get.tag(card, 'respondSha') && current < 0)
                                        return 0.5;
                                }
                            },
                            respondSha: true,
                            order: 4,
                            useful: -1,
                        },
                        mod: {
                            targetInRange(card, player, target) {
                                if (_status.event.skill == 're_chongdian_leisha' && get.type(card.cards[0]) == 'equip')
                                    return true;
                            },
                        },
                    },
                },
                ai: {
                    nothunder: true
                },
            },
            re_yuanlv: {
                audio: 'yuanlv',
                trigger: { player: ['damageAfter', 'useCardAfter'] },
                priority: 2,
                usable: 1,
                filter(event, player) {
                    if (event.name == 'damage' || (event.name == 'useCard' && get.type(event.card, 'trick') == 'trick')) {
                        return true;
                    }
                    else
                        return false;
                },
                content() {
                    'step 0';
                    var _a;
                    player.draw(3);
                    'step 1';
                    player.chooseCard(2, 'he', '选择放置到牌堆顶部的牌', true);
                    'step 2';
                    if (result.bool == true && result.cards != null) {
                        event.cards = result.cards;
                    }
                    if (event.cards.length > 0) {
                        player.chooseButton(true, event.cards.length, ['按顺序将卡牌置于牌堆顶（先选择的在上）', event.cards]).set('ai', function (button) {
                            var player = _status.event.player;
                            var now = _status.currentPhase;
                            var next = now.getNext();
                            var att = get.attitude(player, next);
                            var card = button.link;
                            var judge = next.getCards('j')[ui.selected.buttons.length];
                            if (judge) {
                                return get.judge(judge)(card) * att;
                            }
                            return next.getUseValue(card) * att;
                        });
                    }
                    'step 3';
                    if (result.bool && ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length))
                        event.linkcards = result.links.slice(0);
                    else
                        event.finish();
                    game.delay();
                    'step 4';
                    var cards = event.linkcards;
                    player.lose(cards, ui.special);
                    game.delay();
                    'step 5';
                    var cards = event.linkcards;
                    while (cards.length > 0) {
                        var card = cards.pop();
                        card.fix();
                        ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
                        game.updateRoundNumber();
                    }
                },
                ai: {
                    maixie: true,
                }
            },
            re_jinyuan: {
                audio: 'jinyuan',
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.countCards('he') > 0;
                },
                filterCard: true,
                position: 'he',
                filterTarget(card, player, target) {
                    return player != target;
                },
                content() {
                    'step 0';
                    target.draw();
                    'step 1';
                    event.card = result[0];
                    if (target.hasUseTarget(event.card)) {
                        target.chooseUseTarget(event.card, '是否立即使用该牌（' + get.translation(event.card) + '）？');
                    }
                },
                ai: {
                    order: 6,
                    result: {
                        target: 1,
                    },
                    expose: 0.1,
                },
            },
            cansha: {
                audio: 4,
                trigger: { player: 'useCardAfter' },
                priority: 3,
                filter(event, player) {
                    return event.cards.length && event.targets.length && (get.name(event.card) == 'sha' || get.name(event.card) == 'guohe')
                        && !(event.result.bool == false || event.iswuxied);
                },
                content() {
                    if (get.name(trigger.card) == 'sha') {
                        player.chooseUseTarget({ name: 'guohe', isCard: false }, false);
                    }
                    else if (get.name(trigger.card) == 'guohe') {
                        player.chooseUseTarget({ name: 'sha', isCard: false }, false);
                    }
                },
                ai: {
                    useSha: 2,
                    skillTagFilter(player, tag, arg) {
                        if (player.countCards('h', 'guohe') > 0)
                            return true;
                    },
                    effect: {
                        player(card, player, target, current) {
                            if (['sha', 'guohe'].contains(card.name) && current < 0)
                                return [0, 0.9];
                        }
                    }
                }
            },
            re_huichu: {
                trigger: {
                    global: 'phaseBegin',
                },
                round: 1,
                filter(event, player) {
                    return player.countCards('h');
                },
                check(event, player) {
                    if (player.countCards('h') == player.countCards('h', { color: 'red' }))
                        return get.recoverEffect(event.player, player, player) > 0;
                    return true;
                },
                content() {
                    'step 0';
                    player.showHandcards();
                    event.chk = player.countCards('h') == player.countCards('h', { color: 'red' });
                    'step 1';
                    if (event.chk) {
                        trigger.player.recover();
                    }
                    'step 2';
                    if (!event.chk) {
                        player.chooseCard("重铸任意张手牌", 'h', [1, Infinity]).set('ai', (card) => {
                            return 6.5 - get.value(card);
                        });
                    }
                    'step 3';
                    if (!event.chk && result.bool && result.cards.length) {
                        player.lose(result.cards, ui.discardPile).set('visible', true);
                        player.$throw(result.cards, 1000);
                        game.log(player, '将', result.cards, '置入了弃牌堆');
                        player.draw(result.cards.length);
                    }
                }
            },
            fuyi: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = (game.roundNumber % 2 == 1);
                },
                mod: {
                    globalFrom(from, to, current) {
                        if (from.storage.fuyi)
                            return current - 1;
                    },
                    globalTo(from, to, current) {
                        if (!to.storage.fuyi)
                            return current + 1;
                    },
                },
                trigger: { global: 'roundStart' },
                locked: true,
                direct: true,
                content() {
                    player.storage.fuyi = (game.roundNumber % 2 == 1);
                },
            },
            xihun: {
                trigger: { global: 'damageEnd' },
                frequent: true,
                usable: 1,
                filter(event, player) {
                    return event.card && get.name(event.card) == 'sha' && !player.hasSkill('xihun_used');
                },
                content() {
                    'step 0';
                    player.draw();
                    'step 1';
                    if (player.getHandcardLimit() < player.countCards('h')) {
                        player.addTempSkill('xihun_used', 'roundStart');
                    }
                },
                subSkill: { used: {} },
            },
            huangyou: {
                enable: 'phaseUse',
                filterCard(card) {
                    return get.color(card) == 'red';
                },
                selectCard: 2,
                position: 'he',
                filter(event, player) {
                    return player.countCards('he', { color: 'red' }) > 1 && !player.hasSkill('huangyou_used');
                },
                content() {
                    'step 0';
                    if (player.hp == player.maxHp) {
                        player.draw(3);
                        event.goto(4);
                    }
                    'step 1';
                    var list = ['摸三张牌', '回复体力'];
                    event.videoId = lib.status.videoId++;
                    game.broadcastAll(function (id, list) {
                        var dialog = ui.create.dialog('选择一项', [list, 'vcard']);
                        dialog.videoId = id;
                    }, event.videoId, list);
                    'step 2';
                    player.chooseButton(true).set('dialog', event.videoId);
                    'step 3';
                    game.broadcastAll('closeDialog', event.videoId);
                    if (result.buttons[0].link[2] == '摸三张牌') {
                        player.draw(3);
                    }
                    if (result.buttons[0].link[2] == '回复体力') {
                        player.recover();
                    }
                    'step 4';
                    player.judge((card) => {
                        if (get.suit(card, player) == 'heart')
                            return 4;
                        else {
                            player.addTempSkill('huangyou_used');
                            return -1;
                        }
                    });
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
                subSkill: {
                    used: {},
                },
            },
            qidao: {
                trigger: {
                    global: "judge",
                },
                filter(event, player) {
                    return player.countCards('he') > 0;
                },
                direct: true,
                priority: 1,
                content() {
                    "step 0";
                    player.chooseToDiscard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('qidao'), 'he', (card) => {
                        return true;
                    }).set('ai', (card) => {
                        var trigger = _status.event.getTrigger();
                        var player = _status.event.player;
                        var judging = _status.event.judging;
                        var result = trigger.judge(judging);
                        var attitude = get.attitude(player, trigger.player);
                        if (attitude == 0 || result == 0)
                            return 0;
                        if (attitude > 0) {
                            return (-result) - get.value(card) + Math.random();
                        }
                        else {
                            return result - get.value(card);
                        }
                    }).set('judging', trigger.player.judging[0]);
                    "step 1";
                    if (result.bool) {
                        trigger.player.judge();
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (trigger.player.judging[0].clone) {
                        trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                        game.broadcast((card) => {
                            if (card.clone) {
                                card.clone.classList.remove('thrownhighlight');
                            }
                        }, trigger.player.judging[0]);
                        game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                    }
                    game.cardsDiscard(trigger.player.judging[0]);
                    trigger.player.judging[0] = result.card;
                    trigger.orderingCards.add(result.card);
                    game.log(trigger.player, '重新判定后的判定牌为', result.card);
                    game.delay(0.5);
                },
            },
            re_huxi1: {
                audio: 'huxi1',
                trigger: { player: 'gainEnd' },
                filter(event, player) {
                    return game.hasPlayer((cur) => {
                        if (player.storage.huxiGroup == null)
                            return true;
                        return !player.storage.huxiGroup.contains(cur) && cur != player;
                    }) && event.getParent().skill != 're_huxi1' && event.getParent(2).skill != 're_huxi1' && event.getParent(3).skill != 're_huxi1';
                },
                content() {
                    "step 0";
                    var next = player.chooseCardTarget('『呼吸』：请选择呼吸的对象与交换的牌', true).set('type', 'compare');
                    next.set('filterTarget', function (card, player, target) {
                        if (player.storage.huxiGroup && player.storage.huxiGroup.contains(target))
                            return false;
                        return target != player && player.countCards('h') && target.countCards('h');
                    });
                    "step 1";
                    if (result.bool) {
                        event.target = result.targets[0];
                        game.log(player, '想要呼吸', event.target);
                        event.card1 = result.cards[0];
                        event.target.chooseCard('『呼吸』：请选择交换的牌', true).set('type', 'compare');
                    }
                    else {
                        event.finish();
                    }
                    "step 2";
                    event.card2 = result.cards[0];
                    if (!event.resultOL && event.ol) {
                        game.pause();
                    }
                    "step 3";
                    player.lose(event.card1, ui.ordering);
                    event.target.lose(event.card2, ui.ordering);
                    "step 4";
                    game.broadcast(function () {
                        ui.arena.classList.add('thrownhighlight');
                    });
                    ui.arena.classList.add('thrownhighlight');
                    game.addVideo('thrownhighlight1');
                    player.$compare(event.card1, event.target, event.card2);
                    game.log(player, '的交换牌为', event.card1);
                    game.log(event.target, '的交换牌为', event.card2);
                    event.num1 = event.card1.number;
                    event.num2 = event.card2.number;
                    event.trigger('compare');
                    game.delay(0, 1500);
                    "step 5";
                    event.result = {
                        getC: event.card2,
                    };
                    var str;
                    str = get.translation(player.name) + '想要呼吸' + get.translation(event.target.name);
                    game.broadcastAll(function (str) {
                        var dialog = ui.create.dialog(str);
                        dialog.classList.add('center');
                        setTimeout(function () {
                            dialog.close();
                        }, 1000);
                    }, str);
                    game.delay(2);
                    "step 6";
                    if (typeof event.target.ai.shown == 'number' && event.target.ai.shown <= 0.85 && event.addToAI) {
                        event.target.ai.shown += 0.1;
                    }
                    player.gain(event.card2, 'visible');
                    player.$gain2(event.card2);
                    game.delay(1);
                    target.gain(event.card1, 'visible');
                    target.$gain2(event.card1);
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
                    "step 7";
                    if (get.color(event.result.getC) == 'red') {
                        player.draw(1);
                        if (!player.hasSkill('re_huxi2')) {
                            player.addTempSkill('re_huxi2');
                        }
                    }
                    if (player.storage.huxiGroup == null)
                        player.storage.huxiGroup = [];
                    player.storage.huxiGroup.add(target);
                },
                group: 're_huxi1_clear',
                subSkill: {
                    clear: {
                        firstDo: true,
                        silent: true,
                        direct: true,
                        trigger: {
                            player: ['phaseAfter']
                        },
                        content() {
                            delete player.storage.huxiGroup;
                        }
                    }
                }
            },
            re_huxi2: {
                trigger: {
                    player: 'useCard'
                },
                firstDo: true,
                direct: true,
                filter(event, player) {
                    return get.name(event.card) == 'sha';
                },
                content() {
                    if (trigger.addCount !== false) {
                        trigger.addCount = false;
                        var stat = player.getStat();
                        if (stat && stat.card && stat.card[trigger.card.name])
                            stat.card[trigger.card.name]--;
                        if (player.hasSkill('re_huxi2')) {
                            player.removeSkill('re_huxi2');
                        }
                    }
                },
            },
            xinchixin: {
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                filter(event, player) {
                    if (event.name == 'cardsDiscard' && event.getParent().name == 'orderingDiscard' && event.getParent().relatedEvent.name == 'useCard')
                        return false;
                    if (event.name == 'lose' && (event.getParent().name == 'useCard' || event.position != ui.discardPile))
                        return false;
                    var list = event.cards.filter((card) => {
                        if (player.storage.xinchixin && player.storage.xinchixin.contains(card))
                            return false;
                        return get.suit(card) == 'heart' && get.position(card) == 'd';
                    });
                    return list.length > 0;
                },
                direct: true,
                content() {
                    'step 0';
                    event.cards = trigger.cards.filterInD('d');
                    'step 1';
                    event.videoId = lib.status.videoId++;
                    var dialogx = ['###『赤心』：进入弃牌堆的牌###获得其中一张红色牌；或将其中任意张牌以任意顺序置于牌堆顶（先选择的在上）'];
                    dialogx.push(event.cards);
                    if (player.isOnline2()) {
                        player.send(function (dialogx, id) {
                            ui.create.dialog.apply(null, dialogx).videoId = id;
                        }, dialogx, event.videoId);
                    }
                    event.dialog = ui.create.dialog.apply(null, dialogx);
                    event.dialog.videoId = event.videoId;
                    if (player != game.me || _status.auto) {
                        event.dialog.style.display = 'none';
                    }
                    var next = player.chooseButton();
                    next.set('selectButton', function () {
                        if (ui.selected.buttons.length == 0)
                            return 2;
                        else if (get.color(ui.selected.buttons[0].link) == 'red' && ui.dialog.buttons.length == 1)
                            return 1;
                        return [1, Infinity];
                    });
                    next.set('dialog', event.videoId);
                    next.set('ai', function (button) {
                        return get.value(button.link) && ui.selected.buttons.length == 1;
                    });
                    next.set('forceAuto', function () {
                        return ui.selected.buttons.length == ui.dialog.buttons.length || ui.dialog.buttons.length == 1;
                    });
                    'step 2';
                    if (result.bool) {
                        event.links = result.links;
                        var controls = ['取消选择', '将这些牌置于牌堆顶', '获得这张牌'];
                        if (event.links.length != 1 || get.color(event.links[0]) != 'red') {
                            controls.splice(2, 1);
                        }
                        var func = function (cards, id) {
                            var dialog = get.idDialog(id);
                            if (dialog) {
                                for (var j = 0; j < cards.length; j++) {
                                    for (let i of dialog.buttons) {
                                        if (i.link == cards[j]) {
                                            i.classList.add('glow');
                                        }
                                        else {
                                            i.classList.add('unselectable');
                                        }
                                    }
                                }
                            }
                        };
                        if (player.isOnline2()) {
                            player.send(func, event.links, event.videoId);
                        }
                        else if (player == game.me && !_status.auto) {
                            func(event.links, event.videoId);
                        }
                        player.chooseControl(controls).set('ai', function (event, player) {
                            return _status.event.index;
                        }).set('index', 2);
                    }
                    else {
                        if (player.isOnline2()) {
                            player.send('closeDialog', event.videoId);
                        }
                        event.dialog.close();
                        event.finish();
                    }
                    'step 3';
                    switch (result.index) {
                        case 0: {
                            event.goto(1);
                            break;
                        }
                        case 1: {
                            var list = event.links.slice(0);
                            while (list.length) {
                                ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
                            }
                            game.log(player, '将牌放在牌堆顶');
                            break;
                        }
                        case 2: {
                            if (!player.storage.xinchixin)
                                player.storage.xinchixin = [];
                            player.storage.xinchixin.addArray(event.links);
                            player.gain(event.links);
                            game.log(player, '获得了', event.links);
                            break;
                        }
                    }
                    'step 4';
                    if (player.isOnline2()) {
                        player.send('closeDialog', event.videoId);
                    }
                    event.dialog.close();
                },
                group: 'xinchixin_clear',
                subSkill: {
                    clear: {
                        trigger: { global: 'phaseAfter' },
                        priority: 23,
                        forced: true,
                        silent: true,
                        popup: false,
                        content() {
                            if (player.storage.xinchixin && player.storage.xinchixin.length) {
                                player.storage.xinchixin.length = 0;
                            }
                        }
                    }
                },
            },
            juebi: {
                group: ['juebi_shan', 'juebi_dam'],
                subSkill: {
                    shan: {
                        enable: ['chooseToUse', 'chooseToRespond'],
                        filterCard(card) {
                            return get.type(card) != 'basic';
                        },
                        viewAs: { name: 'shan' },
                        position: 'hes',
                        prompt: '将一张非基本牌当【闪】使用或打出',
                        check(card) { return 8 - get.value(card); },
                        filter(event, player) {
                            return !player.getStat().damaged;
                        },
                    },
                    dam: {
                        trigger: { player: 'damageEnd' },
                        priority: 199,
                        direct: true,
                        filter(event, player) {
                            return !player.hasSkill('juebi_addDam');
                        },
                        content() {
                            player.addTempSkill('juebi_addDam', 'phaseAfter');
                        },
                    },
                    addDam: {
                        marktext: '壁',
                        mark: true,
                        intro: {
                            content: '可以令下一次造成的伤害+1',
                            name: '绝壁狂怒',
                        },
                        trigger: { source: 'damageBegin2' },
                        priority: 199,
                        forced: true,
                        silent: true,
                        popup: false,
                        content() {
                            'step 0';
                            player.chooseBool('###『绝壁』###是否令本次造成的伤害+1', function () {
                                return get.attitude(player, trigger.player) < 0;
                            });
                            'step 1';
                            if (result.bool) {
                                player.logSkill('juebi', trigger.player);
                                trigger.num++;
                            }
                            if (player.hasSkill('juebi_addDam'))
                                player.removeSkill('juebi_addDam');
                        },
                        ai: {
                            damageBonus: true,
                        },
                    }
                }
            },
            zhanhou: {
                group: ['zhanhou_damage', 'zhanhou_recover'],
                subSkill: {
                    damage: {
                        trigger: { player: 'phaseUseBegin' },
                        priority: 199,
                        check(event, player) {
                            return player.getCardUsable('shunshou') && player.hp > 1;
                        },
                        prompt2: '『战吼』出牌阶段开始时，你可以受到1点伤害，视为使用一张【顺手牵羊】。',
                        content() {
                            'step 0';
                            player.damage('nosource');
                            'step 1';
                            player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】', { name: 'shunshou' }, true);
                        },
                    },
                    recover: {
                        trigger: { global: 'dieAfter' },
                        priority: 199,
                        filter(event, player) {
                            return player.hp < player.maxHp;
                        },
                        prompt2: '『战吼』其他角色阵亡时，你可以回复1点体力，视为使用一张【顺手牵羊】。',
                        content() {
                            'step 0';
                            player.recover();
                            'step 1';
                            player.chooseUseTarget('###『战吼』###视为使用一张【顺手牵羊】', { name: 'shunshou' }, true);
                        },
                    }
                }
            },
            qiangyun: {
                trigger: { global: 'judge' },
                filter(event, player) {
                    return player == event.player && player.countCards('he') > 0;
                },
                direct: true,
                priority: 2,
                content() {
                    'step 0';
                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('qiangyun'), 'he', (card) => {
                        return true;
                    }).set('ai', (card) => {
                        var trigger = _status.event.getTrigger();
                        var player = _status.event.player;
                        var judging = _status.event.judging;
                        var result = trigger.judge(card) - trigger.judge(judging);
                        var attitude = get.attitude(player, trigger.player);
                        if (attitude == 0 || result == 0)
                            return 0;
                        if (attitude > 0) {
                            return result;
                        }
                        else {
                            return -result;
                        }
                    }).set('judging', trigger.player.judging[0]);
                    'step 1';
                    if (result.bool) {
                        event.card = result.cards[0];
                        player.addTempSkill('qiangyun2');
                        player.storage.qiangyun2 = [event.card];
                        player.respond(event.card, 'highlight');
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (result.bool) {
                        if (trigger.player.judging[0].clone) {
                            trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                            game.broadcast((card) => {
                                if (card.clone) {
                                    card.clone.classList.remove('thrownhighlight');
                                }
                            }, trigger.player.judging[0]);
                            game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                        }
                        game.cardsDiscard(trigger.player.judging[0]);
                        trigger.player.judging[0] = event.card;
                        if (!get.owner(event.card, 'judge')) {
                            trigger.position.appendChild(event.card);
                        }
                        game.log(trigger.player, '的判定牌改为', event.card);
                    }
                    else {
                        event.finish();
                    }
                    'step 3';
                    game.delay(2.5);
                },
            },
            qiangyun2: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = [];
                },
                trigger: { global: 'judgeAfter' },
                filter(event, player) {
                    return player.hasUseTarget(player.storage.qiangyun2[0]);
                },
                direct: true,
                priority: 2,
                content() {
                    event.card = player.storage.qiangyun2[0];
                    player.addTempSkill('qiangyun3', 'useCardAfter');
                    player.storage.qiangyun3 = [event.card];
                    player.chooseUseTarget('是否使用' + get.translation(event.card), event.card, false, 'noanimate');
                    if (player.hasSkill('qiangyun2'))
                        player.removeSkill('qiangyun2');
                },
                onremove(player) {
                    delete player.storage.qiangyun2;
                }
            },
            qiangyun3: {
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = [];
                },
                trigger: { source: 'damageEnd' },
                filter(event, player) {
                    return event.cards && player.storage.qiangyun3.contains(event.cards[0]);
                },
                direct: true,
                priority: 2,
                content() {
                    player.draw();
                },
                onremove(player) {
                    delete player.storage.qiangyun3;
                },
            },
            tuquan: {
                audio: 4,
                trigger: { player: 'shaMiss' },
                forced: true,
                content() {
                    'step 0';
                    player.judge((card) => {
                        if (get.suit(card) == 'spade') {
                            return 1;
                        }
                        else if (get.suit(card) == 'heart') {
                            return -1;
                        }
                        return 0;
                    });
                    'step 1';
                    if (result.bool) {
                        if (result.suit == 'spade') {
                            player.discardPlayerCard('结果为♠，请弃置对方一张牌', trigger.target, 'he', true);
                        }
                        else if (result.suit == 'heart') {
                            player.chooseToDiscard('结果为♥，请弃置一张牌', 'he', true);
                        }
                    }
                },
            },
            re_doupeng: {
                enable: 'phaseUse',
                usable: 1,
                filterTarget(card, player, target) {
                    return player.canCompare(target);
                },
                filter(event, player) {
                    return player.countCards('h') > 0;
                },
                content() {
                    'step 0';
                    player.chooseToCompare(target).set('small', get.recoverEffect(player, target, target) > 0);
                    'step 1';
                    event.resultWinner = result.winner;
                    'step 2';
                    if (event.resultWinner == player) {
                        player.draw(2);
                    }
                    else if (event.resultWinner == target) {
                        target.draw(2);
                    }
                    'step 3';
                    if (event.resultWinner != player) {
                        player.chooseBool('是否使对方回复一点体力').set('ai', function () {
                            return _status.event.check;
                        }).set('check', get.recoverEffect(target, player, player) > 0);
                    }
                    else
                        event.goto(5);
                    'step 4';
                    if (result.bool) {
                        target.recover(player);
                    }
                    'step 5';
                    if (event.resultWinner != target) {
                        target.chooseBool('是否使对方回复一点体力').set('ai', function () {
                            return _status.event.check;
                        }).set('check', get.recoverEffect(player, target, target) > 0);
                    }
                    else
                        event.finish();
                    'step 6';
                    if (result.bool) {
                        player.recover(target);
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: 0.6,
                        target: 0.6,
                    },
                },
            },
            re_xuyan: {
                trigger: { player: 'phaseJieshuBegin' },
                content() {
                    'step 0';
                    player.chooseTarget(1, '选择观察目标', function (card, player, target) {
                        return player != target;
                    });
                    'step 1';
                    if (result.bool) {
                        result.targets[0].addSkill('re_xuyan_mark');
                    }
                },
                group: ['re_xuyan_phaseStart', 're_xuyan_damage'],
                subSkill: {
                    mark: {
                        mark: true,
                        intro: {
                            content: '造成伤害被列入了观察项目'
                        },
                    },
                    phaseStart: {
                        trigger: { player: 'phaseBegin' },
                        forced: true,
                        filter(event, player) {
                            return player.hasSkill('re_xuyan_damaged') || player.hasSkill('re_xuyan_dead') || game.filterPlayer((cur) => {
                                if (cur.hasSkill('re_xuyan_mark')) {
                                    return true;
                                }
                                else
                                    return false;
                            }).length > 0;
                        },
                        content() {
                            'step 0';
                            game.filterPlayer((cur) => {
                                if (cur.hasSkill('re_xuyan_mark')) {
                                    cur.removeSkill('re_xuyan_mark');
                                    return true;
                                }
                                else
                                    return false;
                            });
                            'step 1';
                            if (player.hasSkill('re_xuyan_damaged')) {
                                player.draw(1);
                                player.removeSkill('re_xuyan_damaged');
                            }
                            else {
                                player.chooseTarget(true, '令一名角色与你各失去1点体力').set('ai', function (target) {
                                    var player = _status.event.player;
                                    return 2 - get.attitude(player, target);
                                });
                            }
                            'step 2';
                            if (result.bool) {
                                player.loseHp();
                                result.targets[0].loseHp();
                            }
                        }
                    },
                    damage: {
                        trigger: { global: 'damageAfter' },
                        forced: true,
                        filter(event, player) {
                            if (event.source) {
                                return event.source.hasSkill('re_xuyan_mark');
                            }
                            else
                                return false;
                        },
                        content() {
                            player.addSkill('re_xuyan_damaged');
                        }
                    },
                    damaged: {
                        mark: true,
                        marktext: '伤',
                        intro: {
                            content: '观察目标造成了伤害'
                        },
                    },
                }
            },
            re_hundunliandong: {
                enable: 'phaseUse',
                usable: 1,
                filterTarget(card, player, target) {
                    if (target.hasSkill('rongyaochengyuan_homolive')) {
                        for (let i of ui.selected.targets) {
                            if (i.hasSkill('rongyaochengyuan_homolive'))
                                return false;
                        }
                    }
                    else {
                        for (let i of ui.selected.targets) {
                            if (i.group == target.group)
                                return false;
                        }
                    }
                    return true;
                },
                selectTarget: [1, Infinity],
                complexTarget: true,
                multitarget: false,
                content() {
                    target.chooseToDiscard(true, 1, 'he', '混沌联动：弃置一张牌');
                },
                ai: {
                    order: 8,
                    result: {
                        target(player, target) {
                            return lib.card.guohe_copy2.ai.result.target.apply(this, arguments);
                        },
                    },
                },
            },
            fengna: {
                audio: 'luecai',
                enable: 'phaseUse',
                filter(event, player) {
                    return !player.hasSkill('fengna_used') && !player.isMaxHandcard();
                },
                filterTarget(card, player, target) {
                    if (player == target)
                        return false;
                    return target.countCards('h') > player.countCards('h');
                },
                selectTarget: -1,
                multitarget: false,
                content() {
                    'step 0';
                    target.chooseCard('he', '『奉纳』：将一张牌交给' + get.translation(player), true);
                    'step 1';
                    player.gain(result.cards[0], target, 'giveAuto');
                    player.addTempSkill('fengna_used', 'phaseUseEnd');
                },
                ai: {
                    threaten: 1.8,
                    order: 4,
                    result: {
                        target(player, target) {
                            return lib.card.shunshou_copy2.ai.result.target.apply(this, arguments);
                        },
                        player(player, target) {
                            return lib.card.shunshou_copy2.ai.result.player.apply(this, arguments);
                        },
                    },
                },
                subSkill: {
                    used: {}
                },
            },
            re_xiaoyan: {
                audio: 'xiaoyan',
                direct: true,
                trigger: {
                    player: "useCard",
                },
                content() {
                    trigger.directHit.addArray(game.filterPlayer((cur) => {
                        return cur.countCards('h') < player.countCards('h');
                    }));
                },
            },
            re_yuxia: {
                audio: 'yuxia',
                hiddenCard(player, name) {
                    if (!lib.skill.re_yuxia.filter(false, player) || player.getStat('skill').re_yuxia)
                        return false;
                    let list = get.inpile('trick');
                    return list.contains(name);
                },
                enable: 'chooseToUse',
                filter(event, player) {
                    return player.countCards('he') >= 3 && !player.getStat('skill').re_yuxia;
                },
                chooseButton: {
                    dialog(event, player) {
                        let list = get.inpile('trick');
                        for (let i = 0; i < list.length; i++) {
                            list[i] = ['锦囊', '', list[i]];
                        }
                        return ui.create.dialog('『龙箱』', [list, 'vcard']);
                    },
                    filter(button, player) {
                        return _status.event.getParent().filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
                    },
                    check(button) {
                        let player = _status.event.player;
                        if (player.countCards('h', button.link[2]) > 0)
                            return 0;
                        if (['wugu', 'jingluo'].contains(button.link[2]))
                            return 0;
                        let effect = player.getUseValue(button.link[2]);
                        if (effect > 0)
                            return effect;
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
                                return ui.selected.buttons.length == 3;
                            },
                            popname: true,
                            check(card) {
                                return 7 - get.value(card);
                            },
                            position: 'he',
                            viewAs(cards, player) {
                                var number = 0;
                                for (let i of cards) {
                                    number += get.number(i);
                                }
                                if (number)
                                    return { name: links[0][2], nature: links[0][3], number: number };
                                return { name: links[0][2], nature: links[0][3] };
                            },
                        };
                    },
                    prompt(links, player) {
                        return '###『龙箱』###将三张牌当做【' + (get.translation(links[0][3]) || '') + get.translation(links[0][2]) + '】使用';
                    }
                },
                ai: {
                    order: 6,
                    result: { player: 1 },
                },
                group: 're_yuxia_after',
                subSkill: {
                    after: {
                        trigger: { player: 'useCardEnd' },
                        priority: 66,
                        forced: true,
                        silent: true,
                        popup: false,
                        filter(event, player) {
                            return event.cards.length == 3 && event.skill == 're_yuxia_backup' && get.position(event.cards[0]) == 'd';
                        },
                        content() {
                            'step 0';
                            event.cards = trigger.cards.filterInD();
                            game.broadcastAll(function (player, cards) {
                                player.chooseCardButton([0, 1], true, cards, '『龙箱』：可以将其中一张牌置于牌堆顶').set('ai', function (button) {
                                    return get.value(button.link) + Math.random();
                                });
                            }, player, event.cards);
                            'step 1';
                            if (result.bool && result.links) {
                                var list = result.links.slice(0);
                                event.cards.removeArray(list);
                                while (list.length) {
                                    ui.cardPile.insertBefore(list.pop(), ui.cardPile.firstChild);
                                }
                                game.log(player, '将牌放在牌堆顶');
                                if (event.cards.length) {
                                    game.cardsDiscard(event.cards);
                                    game.log(event.cards, '进入了弃牌堆');
                                }
                            }
                            else {
                                game.cardsDiscard(event.cards);
                                game.log(event.cards, '进入了弃牌堆');
                            }
                        }
                    }
                },
            },
            hanyin: {
                trigger: { global: ['useCard', 'respond'] },
                frequent: true,
                filter(event, player) {
                    if (Array.isArray(event.respondTo) && event.respondTo[0] == player) {
                        var num = get.number(event.respondTo[1]);
                        return (event.cards && event.cards.filter(function (i) {
                            return get.number(i) < num;
                        }).length) || get.number(event.card) < num;
                    }
                    ;
                },
                content() {
                    player.draw();
                },
                ai: {
                    effect: {
                        player(card, player) {
                            if (['nanman', 'wanjian', 'haixiao'].contains(get.name(card))) {
                                var num = game.countPlayer((cur) => {
                                    return cur != player;
                                });
                                if (get.number(card))
                                    num *= get.number(card) / 12;
                                return [1, num];
                            }
                        }
                    },
                    directHit_ai: true,
                    skillTagFilter(player, tag, arg) {
                        if (tag == 'directHit_ai' && arg) {
                            if (get.attitude(arg.target, player) > 0)
                                return false;
                            return get.number(arg.card) && get.number(arg.card) >= 13;
                        }
                    },
                },
            },
            re_huange: {
                trigger: { global: 'phaseBegin' },
                round: 1,
                priority: 996,
                filter(event, player) {
                    return game.countPlayer((cur) => {
                        return cur.hp != Infinity;
                    });
                },
                check(event, player) {
                    if (event.player != player && get.attitude(event.player, player) < 0 && event.player.inRange(player))
                        return true;
                    return event.player == player && !player.hasJudge('lebu') && (!player.hasUnknown(2) || !player.needsToDiscard());
                },
                content() {
                    'step 0';
                    var _a;
                    var next = player.chooseTarget('###『幻歌』###选择一名角色，摸取其体力值的牌', true, function (card, player, target) {
                        return target.hp != Infinity;
                    });
                    next.set('ai', function (target) {
                        if (player.inRange(target))
                            return 2 - get.attitude(player, target);
                        else
                            return target.hp - (get.attitude(player, target) / 2);
                    });
                    'step 1';
                    if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                        player.logSkill('re_huange', result.targets);
                        player.draw(result.targets[0].hp);
                        player.storage.re_huange_disc = result.targets[0];
                        player.markSkill('re_huange_disc');
                        player.addTempSkill('re_huange_disc');
                    }
                },
                subSkill: {
                    disc: {
                        mark: 'character',
                        intro: {
                            name: '幻歌',
                            content: '回合结束时弃置$体力值的牌',
                            onunmark: true,
                        },
                        trigger: { global: 'phaseEnd' },
                        priority: 996,
                        onremove: true,
                        forced: true,
                        filter(event, player) {
                            return player.countDiscardableCards(player, 'he');
                        },
                        content() {
                            'step 0';
                            if (player.storage.re_huange_disc.isIn() && player.countCards('he')) {
                                player.chooseCard('he', '###『幻歌』###弃置' + get.cnNumber(player.storage.re_huange_disc.hp) + '张牌', player.storage.re_huange_disc.hp, true, lib.filter.cardDiscardable);
                            }
                            else {
                                event.goto(2);
                            }
                            'step 1';
                            if (result.bool) {
                                player.discard(result.cards);
                            }
                            'step 2';
                            player.unmarkSkill('re_huange_disc');
                            delete player.storage.re_huange_disc;
                        },
                    }
                },
            },
            re_jiumao: {
                audio: 'jiumao',
                group: ['re_jiumao_put', 're_jiumao_use', 're_jiumao_jiesuan'],
                subSkill: {
                    put: {
                        trigger: {
                            global: 'phaseDiscardBegin',
                        },
                        filter(event, player) {
                            return player != event.player;
                        },
                        frequent: true,
                        content() {
                            'step 0';
                            trigger.player.chooseCard('###' + get.prompt('re_jiumao', player) + '###将任意张手牌交给' + get.translation(player), 'he', [1, Infinity]).set('ai', (card) => {
                                var player = _status.event.player;
                                var source = _status.event.source;
                                if (get.attitude(player, source) <= 0)
                                    return -1;
                                if (!source.needsToDiscard() && !ui.selected.cards.length)
                                    return get.value(card, target) - get.value(card, player) + 4;
                                if (player.needsToDiscard() && ui.selected.cards.length < (player.countCards('h') - source.countCards('h')) / 2)
                                    return get.value(card, target) - get.value(card, player) + 1;
                                else
                                    return get.value(card, target) - get.value(card, player) - 2;
                            }).set('source', player);
                            'step 1';
                            if (result.bool) {
                                trigger.player.logSkill('re_jiumao', player);
                                trigger.player.give(result.cards, player);
                            }
                            else
                                event.finish();
                            'step 2';
                            if (player.countCards('h') == trigger.player.countCards('h')) {
                                trigger._re_jiumao = true;
                            }
                            game.delayx();
                        }
                    },
                    use: {
                        trigger: {
                            global: 'phaseDiscardEnd',
                        },
                        filter(event, player) {
                            return player != event.player && event._re_jiumao == true;
                        },
                        direct: true,
                        content() {
                            'step 0';
                            var _a;
                            player.chooseCardTarget({
                                position: 'hs',
                                filterCard: true,
                                prompt: get.prompt('re_jiumao') + '使用一张牌并使其额外结算一次',
                                filterTarget(card, player, target) {
                                    return lib.filter.filterTarget.apply(this, arguments);
                                },
                                ai1(card, player, target) {
                                    if (get.type(card) != 'equip' && get.name(card) != 'jiu')
                                        return get.order(card);
                                    return 0;
                                },
                                ai2(card, player, target) {
                                    if (!_status.event.check)
                                        return 0;
                                    return get.effect(target, { name: 'sha' }, _status.event.player);
                                }
                            });
                            'step 1';
                            if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                                player.useCard(result.cards[0], result.targets, result.cards, false).set('addedSkill', 're_jiumao_use');
                            }
                        }
                    },
                    jiesuan: {
                        trigger: { player: 'useCardAfter' },
                        forced: true,
                        priority: 42,
                        filter(event, player) {
                            return event.addedSkill == 're_jiumao_use';
                        },
                        content() {
                            var card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
                            player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = trigger.skill || 're_jiumao_jiesuan';
                        }
                    },
                }
            },
            re_enfan: {
                audio: 'shiqi',
                trigger: {
                    global: 'dying'
                },
                filter(event, player) {
                    return player.countCards('h') && event.player != player;
                },
                direct: true,
                content() {
                    'step 0';
                    player.chooseCard([1, Infinity], get.prompt2('re_enfan'), 'he').set('ai', (card) => {
                        if (!_status.event.check)
                            return 0;
                        return 6 - get.value(card);
                    }).set('check', get.attitude(player, trigger.player) > 0);
                    'step 1';
                    if (result.bool) {
                        event.target = trigger.player;
                        player.logSkill('re_enfan', event.target);
                        player.give(result.cards, event.target, 'giveAuto');
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (event.target.countCards('h')) {
                        event.target.chooseToDiscard([1, Infinity], true, 'he').set('complexCard', true).set('cardResult', function () {
                            var cards = event.target.getCards('he');
                            var l = cards.length;
                            var all = Math.pow(l, 2);
                            var list = [];
                            for (var i = 1; i < all; i++) {
                                var array = [];
                                for (var j = 0; j < l; j++) {
                                    if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0)
                                        array.push(cards[j]);
                                }
                                var types = [];
                                for (var k of array) {
                                    types.add(get.type2(k));
                                }
                                if (types.length == 3)
                                    list.push(array);
                            }
                            if (list.length) {
                                var sortx = function (x) {
                                    var num = get.value(x);
                                    if (x.filter(function (y) {
                                        return get.color(y) == 'red';
                                    }).length && x.filter(function (y) {
                                        return get.color(y) == 'black';
                                    }).length)
                                        num -= 4;
                                    return num;
                                };
                                list.sort(function (a, b) {
                                    var numa = sortx(a);
                                    var numb = sortx(b);
                                    return numa - numb;
                                });
                                return list[0];
                            }
                            return list;
                        }()).set('ai', (card) => {
                            if (!_status.event.cardResult.length)
                                return 0 - get.value(card);
                            if (!_status.event.cardResult.contains(card))
                                return 0;
                            return 10;
                        });
                    }
                    else {
                        event.finish();
                    }
                    'step 3';
                    if (result.bool) {
                        if (get.type3(result.cards).length >= 3) {
                            event.target.recover();
                        }
                        if (get.color3(result.cards).length >= 2) {
                            game.asyncDraw([event.target, player]);
                        }
                    }
                }
            },
            re_yuzhan: {
                audio: 'xuanxu',
                enable: 'phaseUse',
                usable: 1,
                content() {
                    'step 0';
                    var _a;
                    var cards = get.cards(4);
                    event.cards = cards;
                    var rednum = 0, blacknum = 0;
                    for (var i = 0; i < cards.length; i++) {
                        if (get.color(cards[i]) == 'red')
                            rednum++;
                        if (get.color(cards[i]) == 'black')
                            blacknum++;
                    }
                    if ((rednum == 2 && blacknum == 2) || rednum == 4 || blacknum == 4) {
                        var next = player.chooseCardButton(2, '预占:选择令当前回合角色获得其中一对', event.cards, true);
                        next.set('filterButton', function (button) {
                            for (var i = 0; i < ui.selected.buttons.length; i++) {
                                if (get.color(ui.selected.buttons[i].link) != get.color(button.link))
                                    return false;
                            }
                            return true;
                        });
                        next.set('ai', function (button) {
                            if (_status.currentPhase != _status.event.player) {
                                return -get.value(button.link, _status.event.player);
                            }
                            return get.value(button.link, _status.event.player);
                        });
                    }
                    else {
                        for (var i = event.cards.length - 1; i >= 0; i--) {
                            ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
                        }
                        player.chooseToGuanxing(event.cards.length);
                    }
                    'step 1';
                    if (result.bool && ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length)) {
                        var player2 = _status.currentPhase;
                        event.cards.remove(result.links[0]);
                        event.cards.remove(result.links[1]);
                        player2.gain(result.links, 'gain2');
                        if (player != player2) {
                            player.gain(event.cards, 'gain2');
                            event.cards = [];
                        }
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (_status.currentPhase == player && event.cards.length) {
                        for (var i = event.cards.length - 1; i >= 0; i--) {
                            ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
                        }
                        player.chooseToGuanxing(event.cards.length);
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
            },
            re_bizuo: {
                trigger: { global: 'phaseBegin' },
                round: 1,
                filter(event, player) {
                    return _status.currentPhase && player.countCards('h');
                },
                check(event, player) {
                    return get.attitude(player, event.player) > 0;
                },
                content() {
                    'step 0';
                    var next = player.chooseCard(get.prompt2('re_bizuo'), 'h', [1, player.countCards('h')]);
                    next.set('ai', (card) => {
                        if (['shan', 'wuxie', 'jinchan'].contains(get.name(card)) || !_status.currentPhase.hasUseTarget(card))
                            return 0;
                        return 6 - get.value(card);
                    });
                    'step 1';
                    if (result.cards && result.cards.length) {
                        player.logSkill('re_bizuo', trigger.player);
                        player.lose(result.cards, ui.special);
                        player.$throw(result.cards, 1000);
                    }
                    else {
                        event.finish();
                    }
                    'step 2';
                    if (result.cards && result.cards.length) {
                        for (var i = 0; i < result.cards.length; i++) {
                            result.cards[i].fix();
                            result.cards[i].storage.bizuo = true;
                            ui.cardPile.insertBefore(result.cards[i], ui.cardPile.firstChild);
                        }
                        game.log(player, '将' + get.cnNumber(result.cards.length) + '张牌置于牌堆顶');
                    }
                },
                group: ['re_bizuo_use', 're_bizuo_end'],
                subSkill: {
                    use: {
                        trigger: {
                            global: 'useCard',
                        },
                        check(event, player) {
                            return true;
                        },
                        filter(event, player) {
                            if (event.card && event.card.storage && event.card.storage.bizuo == true)
                                return true;
                            if (event.cards && event.cards.length) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i].storage && event.cards[i].storage.bizuo == true)
                                        return true;
                                }
                            }
                            return false;
                        },
                        prompt: '弼佐:是否发动一次【预占】？',
                        content() {
                            'step 0';
                            if (player.isOnline()) {
                                player.send(function () {
                                    player.useSkill('re_yuzhan', false, false);
                                });
                            }
                            else {
                                player.useSkill('re_yuzhan', false, false);
                            }
                            'step 1';
                            if (trigger.card && trigger.card.storage && trigger.card.storage.bizuo == true)
                                delete trigger.card.storage.bizuo;
                            if (trigger.cards && trigger.cards.length) {
                                for (var i = 0; i < trigger.cards.length; i++) {
                                    if (trigger.cards[i].storage && trigger.cards[i].storage.bizuo == true)
                                        delete trigger.cards[i].storage.bizuo;
                                }
                            }
                        }
                    },
                    end: {
                        trigger: { global: 'phaseAfter' },
                        direct: true,
                        content() {
                            for (var i = 0; i < ui.cardPile.childElementCount; i++) {
                                if (ui.cardPile.childNodes[i].storage && ui.cardPile.childNodes[i].storage.bizuo == true) {
                                    delete ui.cardPile.childNodes[i].storage.bizuo;
                                }
                            }
                            for (var i = 0; i < ui.discardPile.childElementCount; i++) {
                                if (ui.discardPile.childNodes[i].storage && ui.discardPile.childNodes[i].storage.bizuo == true) {
                                    delete ui.discardPile.childNodes[i].storage.bizuo;
                                }
                            }
                            var cards = [];
                            for (var i = 0; i < game.players.length; i++) {
                                var cards2 = game.players[i].getCards('hej');
                                cards = cards.concat(cards2);
                            }
                            for (var i = 0; i < cards.length; i++) {
                                if (cards[i].storage && cards[i].storage.bizuo == true) {
                                    delete cards[i].storage.bizuo;
                                }
                            }
                        }
                    },
                },
                ai: {
                    expose: 0.1,
                }
            },
            guiren: {
                audio: 2,
                enable: ['chooseToUse'],
                viewAs: { name: 'sha' },
                selectCard: 2,
                complexCard: true,
                position: 'hes',
                filterCard(card) {
                    if (ui.selected.cards.length)
                        return get.color(card) != get.color(ui.selected.cards[0]);
                    return true;
                },
                check(card) {
                    if (ui.selected.cards.length && get.type(card, 'trick') != get.type(ui.selected.cards[0], 'trick'))
                        return 10 - get.value(card);
                    return 4 - get.value(card);
                },
                precontent() {
                    'step 0';
                    var cards = event.result.cards.slice(0);
                    var types = [];
                    for (var i = 0; i < cards.length; i++) {
                        types.add(get.type(cards[i], 'trick'));
                    }
                    event.types = types;
                    event.targets = event.result.targets.slice(0);
                    event.getParent().addCount = false;
                    'step 1';
                    if (event.types.contains('basic')) {
                        var list = get.info(event.result.card).nature.slice(0);
                        list.remove('kami');
                        list.push('cancel2');
                        player.chooseControl(list).set('prompt', get.prompt('guiren')).set('prompt2', '将' + get.translation(event.result.card) + '转换为以下属性之一').set('ai', function () {
                            var player = _status.event.player;
                            var card = _status.event.card;
                            if (get.name(card) == 'tao' && get.nature(card) == 'ocean')
                                return 'cancel2';
                            if (get.name(card) == 'tao' && get.nature(card) != 'ocean')
                                return 'ocean';
                            if (get.name(card) == 'sha') {
                                var targets = _status.event.targets;
                                for (var i = 0; i < targets.length; i++) {
                                    if (get.damageEffect(target, player, player)) {
                                        if (targets[i].hasSkillTag('nodamage'))
                                            return 'ice';
                                        if (!targets[i].hasSkillTag('noocean') && targets[i].hujia > 0)
                                            return 'ocean';
                                        if (!targets[i].hasSkillTag('nofire') && targets[i].getEquip('tengjia'))
                                            return 'fire';
                                        if (!targets[i].hasSkillTag('noyami') && targets[i].countCards('h') >= player.countCards('h'))
                                            return 'yami';
                                    }
                                }
                            }
                            return list.randomGet();
                        }).set('card', event.result.card).set('targets', event.targets);
                    }
                    else {
                        event.goto(3);
                    }
                    'step 2';
                    if (result.control != 'cancel2') {
                        event.result.card.nature = result.control;
                        player.popup(get.translation(event.result.card).slice(0, 2), result.control);
                        game.log('#y' + get.translation(get.name(event.result.card)), '被转为了', event.result.card);
                    }
                    'step 3';
                    if (event.types.contains('trick')) {
                        var target = event.targets.shift();
                        if (target.countGainableCards(player, 'he') > 0)
                            player.gainPlayerCard(target, 'he');
                        if (event.targets.length)
                            event.redo();
                    }
                },
                group: ['guiren_num', 'guiren_redraw'],
                subSkill: {
                    num: {
                        trigger: { player: 'useCard' },
                        forced: true,
                        popup: false,
                        filter(event) {
                            return event.skill == 'guiren' && ['sha'].contains(event.card.name) && event.cards && event.cards.filter((card) => get.type(card) == 'equip').length;
                        },
                        content() {
                            trigger.baseDamage++;
                        }
                    },
                    redraw: {
                        trigger: { player: 'shaMiss' },
                        prompt(event, player) {
                            return '是否收回' + get.translation(event.cards) + '并结束此阶段？';
                        },
                        filter(event) {
                            return event.skill == 'guiren' && ['sha'].contains(event.card.name) && event.cards && event.cards.length;
                        },
                        content() {
                            player.gain(trigger.cards);
                            var evt = _status.event.getParent('phaseUse') || _status.event.getParent('phaseJieshu');
                            if (evt && ['phaseJieshu', 'phaseUse'].contains(evt.name)) {
                                evt.skipped = true;
                            }
                        }
                    }
                }
            },
            anshu: {
                trigger: { global: 'phaseJieshuBegin' },
                direct: true,
                filter(event, player) {
                    return event.player != player && player.countCards('h', (card) => player.canUse(card, event.player))
                        && event.player.countCards('h') >= player.countCards('h');
                },
                content() {
                    player.chooseToUse({
                        preTarget: trigger.player,
                        filterCard(card, player) {
                            return lib.filter.filterCard.apply(this, arguments);
                        },
                        filterTarget(card, player, target) {
                            return target == _status.event.preTarget && lib.filter.filterTarget.apply(this, arguments);
                        },
                        addCount: false,
                        nodistance: true,
                        prompt: get.prompt2('anshu'),
                    }).set('logSkill', ['anshu', trigger.player]);
                },
                group: 'anshu_directHit',
                subSkill: {
                    directHit: {
                        trigger: { player: 'useCard' },
                        direct: true,
                        filter(event, player) {
                            return get.suit(event.card) == 'spade' && Array.isArray(event.getParent().logSkill) && event.getParent().logSkill[0] == 'anshu';
                        },
                        content() {
                            console.log('a');
                            trigger.directHit.add(trigger.getParent().logSkill[1]);
                        },
                    }
                }
            },
            xingchi: {
                mod: {
                    targetEnabled(card, player, target) {
                        if (!player.hasSkill('xingchi_countUsed'))
                            return false;
                    },
                },
                trigger: { player: 'gainAfter' },
                filter(event, player) {
                    if (player.countCards('h') > player.getHandcardLimit())
                        return player.getCardUsable('sha') > 0;
                    else
                        return !player.hasSkill('xingchi_used');
                },
                check(event, player) {
                    return true;
                },
                content() {
                    'step 0';
                    var _a;
                    if (player.countCards('h') > player.getHandcardLimit()) {
                        player.chooseCardTarget({
                            position: 'h',
                            filterCard: true,
                            prompt: '将一张手牌当作不计入次数【杀】使用',
                            filterTarget(card, player, target) {
                                return lib.filter.filterTarget({ name: 'sha' }, player, target);
                            },
                            ai1(card) {
                                return 6 - get.value(card);
                            },
                            ai2(target) {
                                if (!_status.event.check)
                                    return 0;
                                return get.effect(target, { name: 'sha' }, _status.event.player);
                            }
                        });
                    }
                    else {
                        player.draw(2);
                        player.addTempSkill('xingchi_used');
                        event.finish();
                    }
                    'step 1';
                    if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                        player.useCard({ name: 'sha' }, result.targets, result.cards, false);
                    }
                },
                group: 'xingchi_record',
                subSkill: {
                    record: {
                        trigger: { global: 'useCard1' },
                        filter(event, player) {
                            return !event.player.hasSkill('xingchi_countUsed');
                        },
                        direct: true,
                        locked: true,
                        silent: true,
                        firstDo: true,
                        content() {
                            trigger.player.addTempSkill('xingchi_countUsed');
                        },
                    },
                    countUsed: {},
                    used: {
                        mark: true,
                        intro: { content: '本回合已通过『醒迟』摸牌' },
                    }
                },
            },
            cejing: {
                trigger: { global: 'phaseEnd' },
                firstDo: true,
                filter(event, player) {
                    if (player.hasSkill('cejing_disable'))
                        return false;
                    return event.player.isIn() && !event.player.getStat('damage') && player.countDiscardableCards('he') >= 1;
                },
                direct: true,
                content() {
                    'step 0';
                    var target = trigger.player;
                    event.target = target;
                    var check = (get.attitude(player, target) > 0) || (get.attitude(player, target) < 0 && target.countCards('h') - target.getHandcardLimit() >= 2);
                    player.chooseToDiscard(get.prompt2('cejing'), 'he').set('ai', (card) => {
                        if (_status.event.check)
                            return 6 - get.value(card);
                        return -1;
                    }).set('check', check);
                    'step 1';
                    if (result.bool && result.cards) {
                        var att = get.attitude(player, event.target);
                        var list0 = lib.phaseName;
                        var list = ['『策竞』：选择一个阶段'];
                        list.push([list0, 'vcard']);
                        list.push('hidden');
                        var next = player.chooseButton(list, true);
                        next.set('ai', function (button) {
                            var link = button.link[2];
                            var att = _status.event.att;
                            if (att > 0) {
                                return link == ['phaseDraw'];
                            }
                            if (att <= 0)
                                return link == 'phaseDiscard';
                        });
                        next.set('att', att);
                    }
                    'step 2';
                    if (result.bool && result.links) {
                        player.logSkill('cejing', event.target);
                        var phase = result.links[0][2];
                        event.target[phase]();
                    }
                },
                group: 'cejing_drawBy',
                subSkill: {
                    drawBy: {
                        trigger: {
                            global: ['phaseZhunbeiEnd', 'phaseJudgeEnd', 'phaseDrawEnd', 'phaseUseEnd', 'phaseDiscardEnd', 'phaseJieshuEnd']
                        },
                        filter(event, player) {
                            return event.getParent().name == 'cejing';
                        },
                        direct: true,
                        content() {
                            'step 0';
                            var num = 0;
                            var name = trigger.name;
                            trigger.player.getHistory('sourceDamage', (evt) => {
                                var phase = evt.getParent(name);
                                if (phase && phase.getParent && phase.getParent().name == 'cejing')
                                    num += evt.num;
                            });
                            event.num = num;
                            'step 1';
                            if (event.num > 0) {
                                var list = [player];
                                list.add(trigger.player);
                                player.logSkill('cejing', list);
                                game.asyncDraw(list, event.num);
                            }
                            else {
                                player.addTempSkill('cejing_disable', 'roundStart');
                            }
                        },
                    },
                    disable: {
                        mark: true,
                        marktext: "竞",
                        intro: {
                            name: '策竞失败',
                            content(storage, player, skill) {
                                return '失去『策竞』直到下个回合开始';
                            },
                        },
                    }
                }
            },
            qinglve: {
                enable: ['chooseToUse'],
                viewAs: { name: 'shunshou' },
                usable: 1,
                viewAsFilter(player) {
                    if (!player.isPhaseUsing() || player.countDisabled() >= 5)
                        return false;
                },
                filterCard: () => false,
                selectCard: -1,
                precontent() {
                    'step 0';
                    var list = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5'];
                    for (var i = 0; i < list.length; i++) {
                        if (player.isDisabled(list[i]))
                            list.splice(i--, 1);
                    }
                    player.chooseControl(list).set('prompt', '请选择废除一个装备栏').ai = function () {
                        if (list.contains('equip1') && player.isEmpty('equip1') && player.countCards('h', (card) => card.name == 'sha' && player.getUseValue(card) > 0))
                            return 'equip1';
                        if (list.contains('equip3') && player.isEmpty('equip3'))
                            return 'equip3';
                        if (list.contains('equip4') && player.isEmpty('equip4'))
                            return 'equip4';
                        if (list.contains('equip5') && player.isEmpty('equip5'))
                            return 'equip5';
                        if (list.contains('equip2') && player.isEmpty('equip2'))
                            return 'equip2';
                        return list.randomGet();
                    };
                    'step 1';
                    event.pos = result.control;
                    player.disableEquip(event.pos);
                },
                group: ['qinglve_mark'],
                subSkill: {
                    mark: {
                        mod: {
                            maxHandcard(player, num) {
                                return num += player.countDisabled();
                            },
                            attackFrom(from, to, distance) {
                                return distance - from.countDisabled();
                            }
                        },
                        marktext: '♠',
                        intro: {
                            name: '轻掠',
                            content: '手牌上限和攻击范围+$',
                        },
                        sub: true,
                        trigger: { player: 'disableEquipAfter' },
                        direct: true,
                        content() {
                            player.markSkill('qinglve_mark');
                        },
                    },
                }
            },
            yingshi: {
                enable: ['chooseToUse'],
                viewAs(cards, player) {
                    var name = false;
                    var nature = null;
                    var suit = null;
                    var number = null;
                    var cards = player.getStorage('yingshi_cardsDis');
                    if (cards[0]) {
                        name = get.name(cards[0]);
                        nature = get.nature(cards[0]);
                        suit = get.suit(cards[0]);
                        number = get.number(cards[0]);
                    }
                    if (name)
                        return { name: name, nature: nature, suit: suit, number: number, isCard: true };
                    return null;
                },
                usable: 1,
                viewAsFilter(player) {
                    if (player.countCards('h', { suit: 'club' }) == 0)
                        return false;
                },
                filterCard(card, player, event) {
                    event = event || _status.event;
                    var filter = event._backup.filterCard;
                    var name = get.suit(card, player);
                    if (name == 'club')
                        return true;
                    return false;
                },
                filter(event, player) {
                    var cards = player.getStorage('yingshi_cardsDis');
                    var card = cards[0];
                    var filter = event.filterCard;
                    if (card && filter(card, player, event) && player.countCards('h', { suit: 'club' }))
                        return true;
                    return false;
                },
                selectCard: 1,
                group: ['yingshi_cardsDis'],
                subSkill: {
                    cardsDis: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = [];
                        },
                        marktext: '♣',
                        intro: {
                            name: '影逝',
                            content: '上一次进入弃牌堆的非♣基本牌为$',
                        },
                        sub: true,
                        trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                        direct: true,
                        filter(event, player) {
                            return event.cards.filter((card) => get.position(card, true) == 'd' && get.suit(card) != 'club' && get.type(card) == 'basic').length > 0;
                        },
                        content() {
                            let cards = trigger.cards.filter((card) => get.position(card, true) == 'd' && get.suit(card) != 'club' && get.type(card) == 'basic');
                            player.storage.yingshi_cardsDis = [cards.pop()];
                            if (!player.isUnseen(1))
                                player.markSkill('yingshi_cardsDis');
                        },
                    },
                }
            },
            re_meici: {
                zhuanhuanji: true,
                audio: 2,
                init(player, skill) {
                    if (!player.storage[skill])
                        player.storage[skill] = true;
                },
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                filter(event, player) {
                    if (event.name == 'cardsDiscard' && event.getParent().name == 'orderingDiscard' && event.getParent().relatedEvent.name == 'useCard')
                        return false;
                    if (event.name == 'lose' && (event.getParent().name == 'useCard' || event.position != ui.discardPile))
                        return false;
                    if (event.name == 'lose' && event.getParent().name == 'addJudge')
                        return false;
                    var color = player.storage.re_meici == true ? 'red' : 'black';
                    for (var i = 0; i < event.cards.length; i++) {
                        if (get.position(event.cards[i], true) == 'd') {
                            if (get.color(event.cards[i]) == color)
                                return true;
                        }
                    }
                    return false;
                },
                check(event, player) {
                    return true;
                },
                usable: 1,
                content() {
                    'step 0';
                    var _a;
                    if (trigger.cards.length && trigger.cards.length == 1) {
                        player.gain(trigger.cards, 'gain2');
                        if (player.storage.re_meici == true) {
                            player.storage.re_meici = false;
                        }
                        else {
                            player.storage.re_meici = true;
                        }
                    }
                    else {
                        var color = player.storage.re_meici == true ? 'red' : 'black';
                        var cards = [];
                        for (var i = 0; i < trigger.cards.length; i++) {
                            if (get.position(trigger.cards[i], true) == 'd') {
                                if (get.color(trigger.cards[i]) == color)
                                    cards.push(trigger.cards[i]);
                            }
                        }
                        if (cards.length) {
                            var str = '###『美词』###获得一张' + get.translation(color) + '牌';
                            var next = player.chooseButton(ui.create.dialog(str, [cards, 'vcard'], 'hidden'), true);
                            next.set('ai', function (button) {
                                var card = { name: button.link[2] };
                                var value = get.value(card);
                                return value;
                            });
                        }
                        else {
                            event.finish();
                        }
                    }
                    'step 1';
                    if (result.bool && ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length)) {
                        player.gain(result.links, 'gain2');
                        if (player.storage.re_meici == true) {
                            player.storage.re_meici = false;
                        }
                        else {
                            player.storage.re_meici = true;
                        }
                    }
                    else {
                        event.finish();
                    }
                }
            },
            re_danlian: {
                audio: 2,
                trigger: { player: 'gainAfter' },
                filter(event, player) {
                    if (event.getParent(2).name == 'phaseDraw')
                        return false;
                    var list = ['heart', 'spade', 'diamond'];
                    for (var i = 0; i < event.cards.length; i++) {
                        if (list.contains(get.suit(event.cards[i])))
                            return true;
                    }
                    return false;
                },
                direct: true,
                content() {
                    "step 0";
                    var list = ['heart', 'spade', 'diamond'];
                    var cards = [];
                    for (var i = 0; i < trigger.cards.length; i++) {
                        if (list.contains(get.suit(trigger.cards[i])))
                            cards.push(trigger.cards[i]);
                    }
                    event.cards = cards.slice(0);
                    "step 1";
                    if (event.cards.length) {
                        event.cards2 = event.cards.shift();
                        var prompt3 = "###『耽恋』###你可以将" + get.translation(event.cards2) + '置入一名角色合理的区域';
                        player.chooseTarget(prompt3, function (card, player, target) {
                            if (get.type(_status.event.card, false) == 'delay')
                                return target.canAddJudge({ name: _status.event.card.name }) && target != player;
                            if (get.type(_status.event.card, false) == 'equip')
                                return target.isEmpty(get.subtype(_status.event.card, false)) && target != player;
                            return target != player && lib.filter.canBeGained(_status.event.card, target, player);
                        }).set('card', event.cards2).set('ai', function (target) {
                            if (get.type(_status.event.card, false) == 'delay')
                                return -get.attitude(_status.event.player, target);
                            return get.attitude(_status.event.player, target);
                        });
                    }
                    else {
                        event.finish();
                    }
                    "step 2";
                    if (result.bool) {
                        if (get.type(event.cards2, false) == 'delay') {
                            player.logSkill('re_danlian', result.targets);
                            result.targets[0].addJudge(event.cards2);
                        }
                        else if (get.type(event.cards2, false) == 'equip') {
                            player.logSkill('re_danlian', result.targets);
                            result.targets[0].equip(event.cards2);
                        }
                        else {
                            player.logSkill('re_danlian', result.targets);
                            result.targets[0].gain(event.cards2, player, 'giveAuto');
                        }
                        if (event.cards.length)
                            event.goto(1);
                    }
                    else {
                        if (event.cards.length)
                            event.goto(1);
                    }
                }
            },
            tunshi: {
                audio: 'xinhuo',
                trigger: { global: 'dyingBegin' },
                frequent: true,
                priority: 24,
                filter(event, player) {
                    if (event.player == player)
                        return false;
                    return _status.currentPhase == player;
                },
                content() {
                    player.recover();
                },
                group: 'tunshi_redraw',
                subSkill: {
                    redraw: {
                        trigger: { global: 'loseAfter' },
                        priority: 24,
                        filter(event, player) {
                            if (event.getParent().name == 'gain' || !_status.currentPhase)
                                return false;
                            if (event.player == player || event.player == _status.currentPhase)
                                return false;
                            if (event.player.countCards('e') == 0) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i].original == 'e')
                                        return true;
                                }
                            }
                            if (event.player.countCards('h') == 0) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i].original == 'h')
                                        return true;
                                }
                            }
                            if (event.player.countCards('j') == 0) {
                                for (var i = 0; i < event.cards.length; i++) {
                                    if (event.cards[i].original == 'j')
                                        return true;
                                }
                            }
                            return false;
                        },
                        check(event, player) {
                            return get.attitude(player, _status.currentPhase) > 0;
                        },
                        content() {
                            _status.currentPhase.gain(trigger.cards, 'draw');
                        },
                    }
                }
            },
            mark_tianqing: {
                audio: 'tianqing',
                trigger: { global: 'damageBegin3' },
                filter(event, player) {
                    return player.storage.mark_tianqing_record;
                },
                round: 1,
                check(event, player) {
                    return get.attitude(player, event.player) > 0;
                },
                logTarget: 'player',
                content() {
                    trigger.changeToZero();
                },
                group: 'mark_tianqing_record',
                subSkill: {
                    record: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = false;
                        },
                        trigger: { global: ['damageEnd', 'phaseAfter'] },
                        forced: true,
                        silent: true,
                        firstDo: true,
                        filter(event, player) {
                            return true;
                        },
                        content() {
                            if (trigger.name == 'damage' || trigger.numFixed == true) {
                                player.storage.mark_tianqing_record = true;
                            }
                            else {
                                player.storage.mark_tianqing_record = false;
                            }
                        }
                    }
                }
            },
            tianqing: {
                audio: 6,
                trigger: { global: 'damageBegin3' },
                filter(event, player) {
                    return player.storage.tianqing_record;
                },
                check(event, player) {
                    return get.attitude(player, event.player) > 0;
                },
                logTarget: 'player',
                content() {
                    trigger.changeToZero();
                },
                group: 'tianqing_record',
                subSkill: {
                    record: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = true;
                        },
                        trigger: { global: ['damageZero', 'damageEnd', 'phaseAfter'] },
                        forced: true,
                        silent: true,
                        firstDo: true,
                        filter(event, player) {
                            return true;
                        },
                        content() {
                            console.log(trigger);
                            if (trigger.name == 'damageZero' || trigger.numFixed == true) {
                                player.storage.tianqing_record = false;
                            }
                            else {
                                player.storage.tianqing_record = true;
                            }
                        }
                    }
                }
            },
            kuiquan: {
                audio: 3,
                enable: 'chooseToUse',
                filterCard(card, player) {
                    return !player.storage.kuiquan_record.contains(get.type(card, 'trick'));
                },
                viewAs: { name: 'huogong', nature: 'fire' },
                position: 'hes',
                viewAsFilter(player) {
                    if (!player.countCards('h', (card) => !player.storage.kuiquan_record.contains(get.type(card, 'trick'))))
                        return false;
                },
                check(card) {
                    var player = _status.currentPhase;
                    if (player.countCards('h') > player.hp || player.countCards('h', { name: 'sha' }) > 0) {
                        if (card.name == 'sha')
                            return 4 - get.value(card);
                        return 6 - get.value(card);
                    }
                    return 3 - get.value(card);
                },
                onuse(result, player) {
                    player.storage.kuiquan_record.add(get.type(result.cards[0], 'trick'));
                },
                ai: {
                    kuiquan: true,
                    fireAttack: true,
                },
                group: 'kuiquan_record',
                subSkill: {
                    record: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = [];
                        },
                        trigger: { global: 'phaseAfter' },
                        forced: true,
                        silent: true,
                        firstDo: true,
                        content() {
                            player.storage.kuiquan_record = [];
                        }
                    }
                }
            },
            kangding: {
                trigger: { source: 'damageBegin3', player: 'damageBegin3' },
                filter(event, player) {
                    if (event.num <= 0)
                        return false;
                    return player.countCards('he', { subtype: 'equip1' }) && player == event.source || player.countCards('he', { subtype: 'equip2' }) && player == event.player;
                },
                check(event, player) {
                    return player == event.source && get.attitude(player, event.player) < 0 || player == event.player;
                },
                logTarget: 'player',
                content() {
                    'step 0';
                    if (player.countCards('he', { subtype: 'equip1' }) && player == trigger.source) {
                        player.chooseToDiscard(get.prompt('kangding'), 'he', { subtype: 'equip1' });
                    }
                    else {
                        player.chooseToDiscard(get.prompt('kangding'), 'he', { subtype: 'equip2' });
                        event.goto(2);
                    }
                    'step 1';
                    if (result.bool) {
                        trigger.num++;
                        event.finish();
                    }
                    'step 2';
                    if (result.bool) {
                        trigger.num--;
                    }
                },
            },
            longshe: {
                enable: 'phaseUse',
                filter(event, player) {
                    return player.countDiscardableCards(player, 'h')
                        && (!player.getStat('skill').longshe) || ((player.getStat('skill').longshe || 0) < [1, 2, 3, 4, 5].filter(function (num) {
                        return player.canEquip(num);
                    }).length);
                },
                filterCard(card, player) {
                    return get.type(card) == 'basic';
                },
                content() {
                    'step 0';
                    var cards = [ui.cardPile.firstChild];
                    event.cards = cards;
                    player.showCards(event.cards, '『龙蛇笔走』展示牌');
                    'step 1';
                    if (get.type(event.cards[0]) == 'basic') {
                        game.log(event.cards, '被置入了弃牌堆');
                        game.cardsDiscard(event.cards);
                        player.draw();
                    }
                    else if (player.hasUseTarget(event.cards[0])) {
                        player.chooseUseTarget(event.cards[0]);
                    }
                }
            },
            re_huawen: {
                audio: 2,
                enable: 'phaseUse',
                usable: 1,
                selectCard: 2,
                complexCard: true,
                check(card) {
                    var player = _status.event.player;
                    if (get.color(card) == 'red')
                        return player.getUseValue(card) - 2;
                    return 6 - get.value(card);
                },
                filter(event, player) {
                    return player.countCards('he', { color: 'red' }) && player.countCards('he', { color: 'black' });
                },
                filterCard(card, player, event) {
                    if (ui.selected.cards.length) {
                        let pre = ui.selected.cards[0];
                        if (get.color(card, player) == get.color(pre, player))
                            return false;
                    }
                    return true;
                },
                content() { },
                ai: {
                    order: 6,
                    result: { player: 1 }
                },
                group: ['re_huawen_useBy', 're_huawen_change'],
                subSkill: {
                    useBy: {
                        trigger: { player: 'discardEnd' },
                        filter(event, player) {
                            return event.cards.length == 2
                                && event.cards.filter((card) => get.color(card) == 'red').length
                                && event.cards.filter((card) => get.color(card) == 'black').length
                                && player.hasUseTarget(event.cards.filter((card) => get.color(card) == 'red')[0]);
                        },
                        check(event, player) {
                            let card = event.cards.filter((card) => get.color(card) == 'red')[0];
                            return player.getUseValue(card);
                        },
                        direct: true,
                        content() {
                            let card = trigger.cards.filter((card) => get.color(card) == 'red')[0];
                            player.chooseUseTarget(card, `###${get.prompt('re_huawen')}###使用${get.translation(card)}（额外结算一次）`).set('logSkill', 're_huawen_useBy');
                        },
                    },
                    change: {
                        trigger: { player: 'useCardAfter' },
                        priority: 40,
                        direct: true,
                        filter(event, player) {
                            var _a;
                            if (event.skill == 're_huawen_change')
                                return false;
                            let evt = event.getParent('chooseUseTarget');
                            return ((_a = event.targets) === null || _a === void 0 ? void 0 : _a.length)
                                && (evt === null || evt === void 0 ? void 0 : evt.logSkill) == 're_huawen_useBy';
                        },
                        content() {
                            let card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number, trigger.card.nature);
                            player.useCard(card, (trigger._targets || trigger.targets).slice(0), trigger.cards).skill = 're_huawen_change';
                        },
                    },
                    give: {
                        trigger: { player: 'useCardAfter' },
                        priority: 23,
                        direct: true,
                        filter(event, player) {
                            if (player.hasHistory('sourceDamage', (evt) => {
                                return evt.card == event.card;
                            }).length == 0) {
                                let evt = event.getParent('chooseUseTarget');
                                return (evt === null || evt === void 0 ? void 0 : evt.logSkill) === 're_huawen_useBy'
                                    && event.cards.filter((card) => get.color(card) == 'black' && get.position(card) == 'd').length;
                            }
                        },
                        content() {
                            'step 0';
                            event.card = trigger.cards.filter((card) => get.color(card) == 'black' && get.position(card) == 'd')[0];
                            player.chooseTarget(function (card, player, target) {
                                return player != target;
                            }).set('card', event.card).set('ai', function (target) {
                                var player = _status.event.player;
                                return get.attitude(player, target) * get.value(_status.event.card, target);
                            }).set('prompt2', '『花吻』：其他角色获得' + get.translation(event.card));
                            'step 1';
                            if (result.bool && result.targets[0]) {
                                player.logSkill('re_huawen_give', result.targets[0]);
                                result.targets[0].gain(event.card, 'log', 'gain2');
                            }
                        },
                    }
                },
            },
            re_liaohu: {
                audio: 'liaohu',
                trigger: { global: 'phaseEnd' },
                priority: 23,
                filter(event, player) {
                    return player.getStat('damage');
                },
                direct: true,
                content() {
                    'step 0';
                    console.log(player.getStat('skill'));
                    if (player.getStat('skill').re_huawen) {
                        event.change = true;
                    }
                    'step 1';
                    var str = '###' + get.prompt('re_liaohu') + '###令一名角色摸两张牌';
                    if (event.change)
                        str += '或回复1点体力';
                    player.chooseTarget(str).set('ai', function (target) {
                        return get.attitude(_status.event.player, target);
                    });
                    'step 2';
                    if (result.bool) {
                        event.target = result.targets[0];
                        event.target.classList.add('glow');
                    }
                    else {
                        event.finish();
                    }
                    'step 3';
                    if (event.change) {
                        var controls = ['摸两张牌', '回复一点体力', '取消选择'];
                        player.chooseControl(controls).set('ai', function () {
                            return _status.event.index;
                        }).set('index', (get.recoverEffect(event.target, player, player) > 2) ? 1 : 0);
                    }
                    else
                        event._result = { index: 0 };
                    'step 4';
                    event.target.classList.remove('glow');
                    switch (result.index) {
                        case 0: {
                            player.logSkill('re_liaohu', event.target);
                            event.target.draw(2);
                            break;
                        }
                        case 1: {
                            player.logSkill('re_liaohu', event.target);
                            event.target.draw();
                            event.target.recover(player);
                            break;
                        }
                        case 2: {
                            event.goto(0);
                            break;
                        }
                    }
                },
            },
            re_gonggan: {
                enable: 'phaseUse',
                usable: 1,
                selectCard: 2,
                complexCard: true,
                check(card) {
                    var player = _status.event.player;
                    if (get.color(card) == 'black')
                        return player.getUseValue(card) - 2;
                    return 6 - get.value(card);
                },
                filter(event, player) {
                    return player.countCards('h', { color: 'red' }) && player.countCards('h', { color: 'black' });
                },
                filterCard(card, player, event) {
                    if (ui.selected.cards.length) {
                        let pre = ui.selected.cards[0];
                        if (get.color(card, player) == get.color(pre, player))
                            return false;
                    }
                    return true;
                },
                content() { },
                ai: {
                    order: 6,
                    result: { player: 1 }
                },
                group: ['re_gonggan_useBy', 're_gonggan_change'],
                subSkill: {
                    useBy: {
                        trigger: { player: 'discardEnd' },
                        filter(event, player) {
                            return event.cards.length == 2
                                && event.cards.filter((card) => get.color(card) == 'red').length
                                && event.cards.filter((card) => get.color(card) == 'black').length
                                && player.hasUseTarget(event.cards.filter((card) => get.color(card) == 'black')[0]);
                        },
                        check(event, player) {
                            let card = event.cards.filter((card) => get.color(card) == 'black')[0];
                            return player.getUseValue(card);
                        },
                        direct: true,
                        content() {
                            let card = trigger.cards.filter((card) => get.color(card) == 'black')[0];
                            player.chooseUseTarget(card, `###${get.prompt('re_gonggan')}###使用${get.translation(card)}（可增减目标）`, true).set('logSkill', 're_gonggan_useBy');
                        },
                    },
                    change: {
                        trigger: { player: 'useCard2' },
                        priority: 23,
                        direct: true,
                        filter(event, player) {
                            var _a;
                            let card = event.card;
                            if (get.info(card).allowMultiple == false)
                                return false;
                            let evt = event.getParent('chooseUseTarget');
                            return ((_a = event.targets) === null || _a === void 0 ? void 0 : _a.length)
                                && (evt === null || evt === void 0 ? void 0 : evt.logSkill) == 're_gonggan_useBy';
                        },
                        content() {
                            'step 0';
                            let prompt2 = '为' + get.translation(trigger.card) + '增加或减少一个目标';
                            player.chooseTarget(get.prompt('re_gonggan'), function (card, player, target) {
                                var player = _status.event.player;
                                var source = _status.event.source;
                                if (_status.event.targets.contains(target))
                                    return true;
                                return lib.filter.targetEnabled2(_status.event.card, source, target) && lib.filter.targetInRange(_status.event.card, source, target);
                            }).set('prompt2', prompt2).set('ai', function (target) {
                                let [trigger, player, source] = [_status.event.getTrigger(), _status.event.player, _status.event.source];
                                return get.effect(target, trigger.card, source, player) * (_status.event.targets.contains(target) ? -1 : 1);
                            }).set('targets', trigger.targets).set('card', trigger.card).set('source', trigger.player);
                            'step 1';
                            if (!event.isMine())
                                game.delayx();
                            event.targets = result.targets;
                            'step 2';
                            if (event.targets) {
                                player.logSkill('re_gonggan', event.targets);
                                if (trigger.targets.contains(event.targets[0]))
                                    trigger.targets.removeArray(event.targets);
                                else
                                    trigger.targets.addArray(event.targets);
                            }
                        },
                    },
                    give: {
                        trigger: { player: 'useCardAfter' },
                        priority: 23,
                        direct: true,
                        filter(event, player) {
                            if (player.getHistory('sourceDamage', (evt) => {
                                return evt.card == event.card;
                            }).length) {
                                let evt = event.getParent('chooseUseTarget');
                                return (evt === null || evt === void 0 ? void 0 : evt.logSkill) == 're_gonggan_useBy'
                                    && event.cards.filter((card) => get.color(card) == 'red' && get.position(card) == 'd').length;
                            }
                        },
                        content() {
                            'step 0';
                            event.card = trigger.cards.filter((card) => get.color(card) == 'red' && get.position(card) == 'd')[0];
                            player.chooseTarget(function (card, player, target) {
                                return player != target;
                            }).set('card', event.card).set('ai', function (target) {
                                var player = _status.event.player;
                                return get.attitude(player, target) * get.value(_status.event.card, target);
                            }).set('prompt2', '『共感』：令其他角色获得' + get.translation(event.card));
                            'step 1';
                            if (result.bool && result.targets[0]) {
                                player.logSkill('re_gonggan_give', result.targets[0]);
                                result.targets[0].gain(event.card, 'log', 'gain2');
                            }
                        },
                    }
                },
            },
            yejing: {
                trigger: { global: 'useCard2' },
                priority: 23,
                filter(event, player) {
                    if (player.hasSkill('yejing_used'))
                        return false;
                    if (get.name(event.card) != 'sha' || !event.targets.contains(player))
                        return false;
                    return (get.name(event.card) == 'sha') && player.countDiscardableCards(player, 'he', (card) => get.number(card, player) > _status.event.num);
                },
                direct: true,
                content() {
                    'step 0';
                    var next = player.chooseToDiscard('he', get.prompt2('yejing')).set('logSkill', ['yejing', trigger.player]);
                    next.set('filterCard', function (card, player) {
                        return get.number(card, player) > _status.event.num;
                    });
                    next.set('num', get.number(trigger.card));
                    'step 1';
                    if (result.bool) {
                        player.addTempSkill('yejing_used');
                        trigger.cancel();
                    }
                },
                subSkill: { used: {} }
            },
            shengfu: {
                enable: 'chooseToUse',
                init(player, skill) {
                    player.storage.shengfu = {};
                },
                filter(event, player) {
                    if (event.type == 'wuxie' && event.respondTo && event.respondTo[0] != player) {
                        if (player.storage.shengfu.wuxie != undefined)
                            return false;
                        return true;
                    }
                    return false;
                },
                hiddenCard(player, name) {
                    return player.storage.shengfu.wuxie == undefined && name == 'wuxie';
                },
                content() {
                    'step 0';
                    event.p1 = event.getParent().respondTo[0];
                    player.chooseToCompare(event.p1);
                    player.storage.shengfu.wuxie = true;
                    player.syncStorage('shengfu');
                    'step 1';
                    if (result.bool) {
                        event.getParent().result = { wuxied: true };
                    }
                    else {
                        player.addTempSkill('shengfu_onLose', 'phaseEnd');
                    }
                },
                group: ['shengfu_reset', 'shengfu_onCompare', 'shengfu_onPhaseUse'],
                subSkill: {
                    reset: {
                        trigger: { global: 'roundStart' },
                        direct: true,
                        log: false,
                        content() {
                            player.storage.shengfu = {};
                            player.syncStorage('shengfu');
                        }
                    },
                    onLose: {
                        mod: {
                            cardEnabled2(card, player) {
                                return false;
                            },
                            cardUsable(card, player) {
                                return 0;
                            },
                            hiddenCard(player, name) {
                                return false;
                            }
                        }
                    },
                    onCompare: {
                        trigger: {
                            player: 'compare',
                            target: 'compare'
                        },
                        filter(event, player) {
                            return get.color(event.card1) == 'black' || get.color(event.card2) == 'black';
                        },
                        check(event, player) {
                            return event.card1.number <= event.card2.number;
                        },
                        content() {
                            'step 0';
                            player.chooseTarget('选择一方收回黑色拼点牌，改用牌堆顶牌代替', function (card, player, target) {
                                if (!_status.event.compareData)
                                    return false;
                                if (_status.event.compareData.player == target) {
                                    return get.color(_status.event.compareData.card1) == 'black';
                                }
                                if (_status.event.compareData.target == target) {
                                    return get.color(_status.event.compareData.card2) == 'black';
                                }
                                return false;
                            }).set('ai', function (target) {
                                if (!_status.event.compareData)
                                    return 0;
                                if (_status.event.compareData.player == target) {
                                    if (_status.event.compareData.card1.number > _status.event.compareData.card2.number) {
                                        return 0;
                                    }
                                    else {
                                        return 10;
                                    }
                                    ;
                                }
                                return 0;
                            }).set('compareData', {
                                player: player,
                                target: player == trigger.target ? trigger.player : trigger.target,
                                card1: player == trigger.target ? trigger.card2 : trigger.card1,
                                card2: player == trigger.target ? trigger.card1 : trigger.card2
                            });
                            'step 1';
                            if (result.bool && result.targets[0]) {
                                event.chosePlayer = result.targets[0];
                                if (event.chosePlayer == player) {
                                    event.comparedCard = trigger.card1;
                                }
                                else {
                                    event.comparedCard = trigger.card2;
                                }
                                game.broadcastAll(ui.clear);
                                event.chosePlayer.gain(event.comparedCard, 'gain');
                                event.pileCard = get.cards()[0];
                                game.log(event.chosePlayer, '判定牌', event.comparedCard, '改为', event.pileCard);
                            }
                            else {
                                event.finish();
                            }
                            'step 2';
                            if (event.chosePlayer == player) {
                                trigger.card1 = event.pileCard;
                                trigger.num1 = event.pileCard.number;
                            }
                            else {
                                trigger.card2 = event.pileCard;
                                trigger.num2 = event.pileCard.number;
                            }
                            player.$compare(trigger.card1, trigger.target, trigger.card2);
                            game.delay(0, 1500);
                        }
                    },
                    onPhaseUse: {
                        enable: 'phaseUse',
                        filter(event, player) {
                            if (player.storage.shengfu.juedou != undefined)
                                return false;
                            return true;
                        },
                        filterTarget(card, player, target) {
                            return player.canCompare(target);
                        },
                        content() {
                            'step 0';
                            player.storage.shengfu.juedou = true;
                            player.syncStorage('shengfu');
                            event.juedouTarget = target;
                            player.chooseToCompare(event.juedouTarget);
                            'step 1';
                            if (result.bool) {
                                player.useCard({ name: 'juedou', isCard: true }, event.juedouTarget);
                            }
                            else {
                                player.addTempSkill('shengfu_onLose', 'phaseEnd');
                            }
                        },
                        ai: {
                            order: 1,
                            result: {
                                target(player, target, card) {
                                    return -1.5;
                                },
                                player(player, target, card) {
                                    return lib.card.juedou.ai.result.player(player, target, card);
                                }
                            }
                        },
                    }
                },
                ai: {
                    order() {
                        return get.order({ name: 'wuxie' }) + 0.2;
                    },
                    result: {
                        player(player, target) {
                            var ext = _status.event.getParent('_wuxie');
                            if (!Object.getOwnPropertyNames(ext).length)
                                return 0;
                            var att = get.attitude(player, ext.target);
                            var eff = get.effect(ext.target, ext.card, ext.player, player);
                            if (att > 0) {
                                return eff < 0 ? 1 : 0;
                            }
                            else if (att < 0) {
                                return eff > 0 ? 1 : 0;
                            }
                            return 0;
                        }
                    }
                }
            },
            wanbi: {
                trigger: {
                    player: ['shanAfter', 'wuxieAfter', 'useSkillAfter']
                },
                frequent: true,
                filter(event, player) {
                    var _a;
                    if (event.name == 'shan') {
                        let evt = event.getParent('sha');
                        if (evt.player.countCards('h') < player.countCards('h'))
                            return false;
                        return evt.player != player && evt.card && evt.card.cards[0];
                    }
                    if (event.name == 'wuxie') {
                        let evt = event.getParent('useCard');
                        if (evt === null || evt === void 0 ? void 0 : evt.respondTo) {
                            if (evt.respondTo[0] && evt.respondTo[0].countCards('h') < player.countCards('h'))
                                return false;
                            return evt.respondTo[0] != player && evt.respondTo[1] && evt.respondTo[1].cards && evt.respondTo[1].cards[0];
                        }
                        else {
                            evt = event.getParent('_wuxie');
                            if (evt.player.countCards('h') < player.countCards('h'))
                                return false;
                            return evt.player != player && evt.card;
                        }
                    }
                    if (event.name == 'useSkill' && Object.getOwnPropertyNames(event.getParent('_wuxie')).length) {
                        let evt = event;
                        if ((_a = evt.result) === null || _a === void 0 ? void 0 : _a.wuxied) {
                            if (evt.respondTo) {
                                if (evt.respondTo[0] && evt.respondTo[0].countCards('h') < player.countCards('h'))
                                    return false;
                                return evt.respondTo[0] != player && evt.respondTo[1] && evt.respondTo[1].cards && evt.respondTo[1].cards[0];
                            }
                            else {
                                evt = event.getParent('_wuxie');
                                if (evt.player.countCards('h') < player.countCards('h'))
                                    return false;
                                return evt.player != player && evt.card;
                            }
                        }
                    }
                    return false;
                },
                content() {
                    let evt;
                    if (trigger.name == 'wuxie') {
                        evt = event.getParent('useCard');
                        if (evt.respondTo) {
                            var card = evt.respondTo[1].cards[0];
                            player.gain(card, 'gain2');
                        }
                        else {
                            var card = evt.getParent('_wuxie').card;
                            player.gain(card, 'gain2');
                        }
                        if (card)
                            game.broadcastAll((card) => {
                                if (card && card.clone)
                                    card.clone.delete();
                            }, card);
                    }
                    else if (trigger.name == 'shan') {
                        evt = event.getParent('sha');
                        player.gain(evt.card.cards[0], 'gain2');
                    }
                    else {
                        evt = trigger;
                        if (evt.respondTo) {
                            var card = evt.respondTo[1].cards[0];
                            player.gain(card, 'gain2');
                        }
                        else {
                            var card = trigger.getParent('_wuxie').card;
                            player.gain(card, 'gain2');
                        }
                        if (card)
                            game.broadcastAll((card) => {
                                if (card && card.clone)
                                    card.clone.delete();
                            }, card);
                    }
                }
            },
            uijieyuan: {
                enable: ['chooseToUse'],
                viewAs: { name: 'yuanjiao' },
                check(card) {
                    return 6 - get.value(card);
                },
                usable: 1,
                selectCard() {
                    var player = _status.event.player;
                    if (!ui.selected.targets.length)
                        return [1, 2];
                    if (ui.selected.targets.length && player.getStorage('uijieyuan_record').contains(ui.selected.targets[0]))
                        return [1, 1];
                    return [2, 2];
                },
                filterCard(card, player) {
                    if (!ui.selected.targets.length)
                        return get.type(card) != 'basic' || get.color(card) == 'red';
                    else if (ui.selected.cards.length && ui.selected.cards)
                        return get.color(card) == 'red';
                },
                position: 'he',
                group: 'uijieyuan_record',
                subSkill: {
                    record: {
                        init(player, skill) {
                            if (!player.storage[skill])
                                player.storage[skill] = [];
                        },
                        trigger: { global: ['gainAfter', 'loseAfter', 'phaseAfter'] },
                        filter(event, player) {
                            if (event.name == 'lose')
                                return event.hs && event.hs.length;
                            return true;
                        },
                        direct: true,
                        silent: true,
                        firstDo: true,
                        content() {
                            if (!player.storage.uijieyuan_record)
                                player.storage.uijieyuan_record = [];
                            if (trigger.name == 'phase')
                                player.storage.uijieyuan_record.length = 0;
                            else
                                player.storage.uijieyuan_record.add(trigger.player);
                        }
                    }
                }
            },
            huixiang: {
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return player.countCards('h') > 0;
                },
                filterTarget(card, player, target) {
                    return target != player && target.countCards('e', (card) => get.equiptype(card) != 5);
                },
                position: 'he',
                filterCard: true,
                prepare: 'give',
                discard: false,
                lose: false,
                content() {
                    'step 0';
                    var _a;
                    target.gain(cards, player);
                    'step 1';
                    var list = target.getCards('e', (card) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
                    player.choosePlayerCard(event.target, 'e', true).set('filterButton', function (button) {
                        return get.equiptype(button.link) != 5;
                    }).set('ai', function (button) {
                        var link = button.link;
                        if (_status.event.list.contains(link))
                            return get.value(link, player, 'raw');
                        return 1;
                    }).set('list', list);
                    'step 2';
                    if ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length) {
                        event.cardname = get.name(result.links[0]);
                        if (!player.getEquip(get.subtype(event.cardname))) {
                            player.addTempSkill('huixiang_equip', { player: ['huixiangBegin'] });
                            var name = event.cardname;
                            player.storage.huixiang_equip2 = name;
                            player.markAuto('huixiang_equip', result.links);
                            var info = lib.card[name].skills;
                            if (info && info.length)
                                player.addAdditionalSkill('huixiang_equip', info);
                            game.log(player, '声明了', '#y' + get.translation(name));
                        }
                    }
                },
                group: 'huixiang_end',
                subSkill: {
                    end: {
                        trigger: { player: 'phaseJieshuBegin' },
                        direct: true,
                        filter(event, player) {
                            return player.countCards('he') > 0 && game.hasPlayer((cur) => {
                                return cur != player && lib.skill.huixiang.filterTarget(true, player, cur);
                            });
                        },
                        content() {
                            'step 0';
                            var _a;
                            player.chooseCardTarget('he', function (card, player) {
                                return true;
                            }, function (card, player, target) {
                                return target != player && lib.skill.huixiang.filterTarget.apply(this, arguments);
                            }).set('prompt', get.prompt2('huixiang'));
                            'step 1';
                            if (result.bool && result.targets && result.cards) {
                                if (player.hasSkill('huixiang_equip'))
                                    player.removeSkill('huixiang_equip');
                                event.target = result.targets[0];
                                player.give(result.cards, event.target, 'giveAuto');
                            }
                            else {
                                event.finish();
                            }
                            'step 2';
                            console.log(event.target);
                            var list = event.target.getCards('e', (card) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
                            player.choosePlayerCard(event.target, 'e', true).set('filterButton', function (button) {
                                return get.equiptype(button.link) != 5;
                            }).set('ai', function (button) {
                                var link = button.link;
                                if (_status.event.list.contains(link))
                                    return get.value(link, player, 'raw');
                                return 1;
                            }).set('list', list);
                            'step 3';
                            if ((_a = result.links) === null || _a === void 0 ? void 0 : _a.length) {
                                event.cardname = get.name(result.links[0]);
                                if (!player.getEquip(get.subtype(event.cardname))) {
                                    player.addTempSkill('huixiang_equip', { player: ['huixiangBegin'] });
                                    var name = event.cardname;
                                    player.storage.huixiang_equip2 = name;
                                    player.markAuto('huixiang_equip', result.links);
                                    var info = lib.card[name].skills;
                                    if (info && info.length)
                                        player.addAdditionalSkill('huixiang_equip', info);
                                    game.log(player, '声明了', '#y' + get.translation(name));
                                }
                            }
                        },
                    }
                },
                ai: {
                    order: 5,
                    result: {
                        player(player, target) {
                            var list = target.getCards('e', (card) => get.equiptype(card) != 5 && !player.getEquip(get.subtype(card)));
                            if (list.length)
                                return 0.5;
                            else
                                return -1;
                        },
                        target: 1,
                    },
                },
            },
            huixiang_equip: {
                trigger: { global: ['loseAfter', 'cardsDiscardAfter'] },
                filter(event, player) {
                    return player != event.player && player != _status.currentPhase && event.cards
                        && event.cards.filter((card) => get.position(card, true) == 'd' && get.type(card) == 'equip' && player.storage.huixiang_equip.contains(card)).length > 0;
                },
                forced: true,
                content() {
                    'step 0';
                    if (trigger.delay == false)
                        game.delay();
                    player.draw();
                    'step 1';
                    player.unmarkAuto('huixiang_equip', trigger.cards);
                },
                mod: {
                    globalFrom(from, to, distance) {
                        var info = lib.card[from.storage.huixiang_equip2];
                        if (info && info.distance && info.distance.globalFrom)
                            return distance + info.distance.globalFrom;
                    },
                    globalTo(from, to, distance) {
                        var info = lib.card[to.storage.huixiang_equip2];
                        if (info && info.distance && info.distance.globalTo)
                            return distance + info.distance.globalTo;
                    },
                    attackFrom(from, to, distance) {
                        var info = lib.card[from.storage.huixiang_equip2];
                        if (info && info.distance && info.distance.attackFrom)
                            return distance + info.distance.attackFrom;
                    },
                    attackTo(from, to, distance) {
                        var info = lib.card[to.storage.huixiang_equip2];
                        if (info && info.distance && info.distance.attackTo)
                            return distance + info.distance.attackTo;
                    },
                },
                onremove: true,
                intro: {
                    mark(dialog, storage, player) {
                        dialog.add(storage);
                        dialog.addText('当前装备：' + get.translation(player.storage.huixiang_equip2));
                        var str2 = lib.translate[player.storage.huixiang_equip2 + '_info'];
                        if (str2) {
                            if (str2.length >= 12)
                                dialog.addText(str2, false);
                            else
                                dialog.addText(str2);
                        }
                    },
                },
            },
            WHiTE: {
                trigger: {
                    player: 'damageEnd',
                },
                frequent: true,
                filter(event, player) {
                    return event.source != undefined;
                },
                logTarget: 'source',
                content() {
                    'step 0';
                    player.viewHandcards(trigger.source);
                    'step 1';
                    player.chooseControl(lib.suit).set('prompt', '『WHiTE』：请选择一个花色').ai = function () { return lib.suit.randomGet(); };
                    'step 2';
                    event.suit = result.control;
                    player.popup(event.suit + 2);
                    game.log(player, '声明了', event.suit + 2);
                    'step 3';
                    if (!trigger.source.storage.WHiTE_suit)
                        trigger.source.storage.WHiTE_suit = [];
                    trigger.source.storage.WHiTE_suit.add(event.suit);
                    if (trigger.source.hasSkill('WHiTE_suit'))
                        trigger.source.markSkill('WHiTE_suit');
                    else
                        trigger.source.addTempSkill('WHiTE_suit');
                },
                subSkill: {
                    suit: {
                        mark: true,
                        intro: {
                            content: '不能使用、打出或弃置$牌',
                        },
                        mod: {
                            cardDiscardable(card, player) {
                                if (player.getStorage('WHiTE_suit').contains(get.suit(card)))
                                    return false;
                            },
                            cardEnabled2(card, player) {
                                if (player.getStorage('WHiTE_suit').contains(get.suit(card)))
                                    return false;
                            },
                        },
                    }
                }
            },
            BLacK: {
                enable: 'phaseUse',
                usable: 1,
                filter(event, player) {
                    return game.hasPlayer((cur) => {
                        return cur != player;
                    });
                },
                filterTarget(card, player, target) {
                    return player.canCompare(target);
                },
                content() {
                    'step 0';
                    var cards = get.cards(target.hp);
                    event.cards = cards;
                    player.chooseCardButton('『BLacK』：选择一张牌', cards, true);
                    'step 1';
                    if (result.bool && player.canCompare(target)) {
                        for (let i = event.cards.length - 1; i >= 0; i--) {
                            if (event.cards[i] == result.links[0])
                                continue;
                            event.cards[i].fix();
                            ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
                        }
                        player.storage.BLacK = result.links[0];
                        player.chooseToCompare(target);
                    }
                    else {
                        for (let i = event.cards.length - 1; i >= 0; i--) {
                            event.cards[i].fix();
                            ui.cardPile.insertBefore(event.cards[i], ui.cardPile.firstChild);
                        }
                        game.delay();
                        event.finish();
                    }
                    'step 2';
                    if (result.winner) {
                        if (event.cards.length) {
                            if (result.winner == player) {
                                event.card = player.storage.BLacK;
                                if (event.card && player.canUse(event.card, target))
                                    player.useCard(event.card, target);
                            }
                            else if (result.winner == target) {
                                event.card = [result.player, result.target].filterInD('d')[0];
                                if (event.card && target.canUse(event.card, player))
                                    target.useCard(event.card, player);
                            }
                        }
                    }
                    delete player.storage.BLacK;
                },
                group: 'BLacK_compare',
                subSkill: {
                    compare: {
                        trigger: { player: 'chooseToCompareBegin' },
                        firstDo: true,
                        direct: true,
                        filter(event, player) {
                            if (event.getParent().name == 'BLacK' && player.storage.BLacK) {
                                return !event.fixedResult;
                            }
                            return false;
                        },
                        content() {
                            if (!trigger.fixedResult)
                                trigger.fixedResult = {};
                            trigger.fixedResult[player.playerid] = player.storage.BLacK;
                        }
                    }
                },
            },
            shiguang: {
                trigger: { player: 'damageEnd' },
                priority: 222,
                filter(event, player) {
                    return event.num > 0;
                },
                direct: true,
                content() {
                    'step 0';
                    event.num = trigger.num;
                    var next = player.chooseTarget('###' + get.prompt('shiguang') + '###令一名角色受到' + get.cnNumber(event.num) + '点伤害', function (card, player, target) {
                        return target != _status.event.another;
                    });
                    next.set('num', event.num);
                    next.set('another', trigger.source);
                    next.set('logSkill', 'shiguang');
                    next.set('ai', function (target) {
                        var player = _status.event.player;
                        var num = _status.event.num;
                        var att = get.attitude(player, target);
                        if (target.hp <= num) {
                            return -att * (num + 1 - target.hp) * 2;
                        }
                        else {
                            return -att;
                        }
                    });
                    'step 1';
                    if (result.bool && result.targets[0]) {
                        result.targets[0].damage(event.num, trigger.source || 'nosource');
                        if (!result.targets[0].storage.shiguang_lose)
                            result.targets[0].storage.shiguang_lose = 0;
                        result.targets[0].storage.shiguang_lose += event.num;
                        result.targets[0].addTempSkill('shiguang_lose', 'phaseBegin');
                    }
                },
                group: 'shiguang_source',
                subSkill: {
                    source: {
                        trigger: { source: 'damageSource' },
                        priority: 222,
                        filter(event, player) {
                            return event.num > 0;
                        },
                        direct: true,
                        content() {
                            'step 0';
                            var _a;
                            event.num = trigger.num;
                            var next = player.chooseTarget('###' + get.prompt('shiguang') + '###令一名角色回复' + get.cnNumber(event.num) + '点体力', function (card, player, target) {
                                return target != _status.event.another;
                            });
                            next.set('num', event.num);
                            next.set('another', trigger.player);
                            next.set('ai', function (target) {
                                var player = _status.event.player;
                                var num = _status.event.num;
                                var att = get.attitude(player, target);
                                if (get.recoverEffect(target, player, player) <= 0 || target.maxHp - target.hp < num) {
                                    return -att * num;
                                }
                                else {
                                    return att * num;
                                }
                            });
                            'step 1';
                            if (result.bool && ((_a = result.targets) === null || _a === void 0 ? void 0 : _a.length)) {
                                player.logSkill('shiguang', result.targets);
                                result.targets[0].recover(event.num);
                                if (!result.targets[0].storage.shiguang_gain)
                                    result.targets[0].storage.shiguang_gain = 0;
                                result.targets[0].storage.shiguang_gain += event.num;
                                result.targets[0].addTempSkill('shiguang_gain', 'phaseBegin');
                            }
                        },
                    },
                    gain: {
                        marktext: "失",
                        locked: true,
                        intro: {
                            content: '在下个回合开始时失去&点体力',
                        },
                        mark: true,
                        onremove(player) {
                            game.log('『失光』后续效果');
                            game.delayx(0.5);
                            player.loseHp(player.storage.shiguang_gain);
                            delete player.storage.shiguang_gain;
                        },
                    },
                    lose: {
                        marktext: "失",
                        locked: true,
                        intro: {
                            content: '在下个回合开始时回复&点体力',
                        },
                        mark: true,
                        onremove(player) {
                            if (player.isDamaged()) {
                                game.log('『失光』后续效果');
                            }
                            game.delayx(0.5);
                            player.recover(player.storage.shiguang_lose, 'nosource');
                            delete player.storage.shiguang_lose;
                        },
                    },
                }
            },
            rangran: {
                trigger: { player: 'useCard2' },
                priority: 222,
                filter(event, player) {
                    var card = event.card;
                    var info = get.info(card);
                    if (info.allowMultiple == false)
                        return false;
                    if (!player.storage.rangran)
                        player.storage.rangran = [];
                    return game.countPlayer((cur) => {
                        return cur.isMaxHp() && !player.storage.rangran.contains(cur) && !event.targets.contains(cur) && lib.filter.targetEnabled2(event.card, player, cur);
                    });
                },
                direct: true,
                content() {
                    'step 0';
                    console.log(player.storage.rangran);
                    var next = player.chooseTarget(get.prompt2('rangran'), [1, Infinity], function (card, player, target) {
                        return target.isMaxHp() && !player.storage.rangran.contains(target) && !_status.event.targets.contains(target) && lib.filter.targetEnabled2(_status.event.card, player, target);
                    }).set('ai', function (target) {
                        var evt = _status.event;
                        return get.effect(target, evt.card, evt.source, evt.player);
                    }).set('card', trigger.card).set('targets', trigger.targets);
                    'step 1';
                    if (result.bool && result.targets[0]) {
                        player.logSkill('rangran');
                        var targets = result.targets.slice(0);
                        trigger.targets.addArray(targets);
                        player.storage.rangran.addArray(targets);
                        player.line(targets, { color: [255, 224, 172] });
                    }
                },
                group: ['rangran_drawBy', 'rangran_clear'],
                subSkill: {
                    drawBy: {
                        trigger: { global: 'damageHit' },
                        priority: 222,
                        filter(event, player) {
                            return event.nature && event.player.isMaxHp();
                        },
                        forced: true,
                        content() {
                            player.draw();
                        }
                    },
                    clear: {
                        trigger: { global: 'phaseEnd' },
                        priority: 222,
                        filter(event, player) {
                            return player.storage.rangran;
                        },
                        forced: true,
                        silent: true,
                        popup: false,
                        content() {
                            delete player.storage.rangran;
                        }
                    },
                }
            },
            jiazhao: {
                trigger: { global: 'damageEnd' },
                filter(event, player) {
                    return event.player.isIn();
                },
                check(event, player) {
                    return get.attitude(player, event.player) > 0;
                },
                logTarget: 'player',
                content() {
                    trigger.player.draw(trigger.player.isMinHp() ? 2 : 1).gaintag = ['jiazhao'];
                },
                ai: {
                    expose: 0.1,
                },
                global: 'jiazhao_discardBy',
                subSkill: {
                    discardBy: {
                        mod: {
                            aiValue(player, card, num) {
                                if (card.hasGaintag && card.hasGaintag('jiazhao'))
                                    return num / 10;
                            },
                        },
                        trigger: { player: 'phaseBegin' },
                        filter(event, player) {
                            return event.player == player && player.countCards('h', (card) => card.hasGaintag('jiazhao'));
                        },
                        forced: true,
                        content() {
                            var hs = player.getCards('h', (card) => card.hasGaintag('jiazhao'));
                            if (hs.length)
                                player.discard(hs);
                        }
                    }
                }
            },
            zhenbao: {
                trigger: { player: 'discardAfter' },
                filter(event, player) {
                    if (!event.cards || event.cards.length < 2)
                        return false;
                    return game.hasPlayer((cur) => {
                        return !cur.countCards('j');
                    });
                },
                priority: 22,
                direct: true,
                content() {
                    'step 0';
                    event.cards = trigger.cards;
                    player.chooseTarget(function (card, player, target) {
                        return !target.countCards('j');
                    }).set('card', event.card).set('ai', function (target) {
                        var player = _status.event.player;
                        return -get.attitude(player, target);
                    }).set('prompt', get.prompt2('zhenbao'));
                    'step 1';
                    if (result.bool) {
                        event.target = result.targets[0];
                        player.logSkill('zhenbao', event.target);
                    }
                    else
                        event.finish();
                    'step 2';
                    event.target.chooseCardButton(cards, '选择一张牌置于判定区', true);
                    'step 3';
                    if (result.bool) {
                        var cards = result.links.slice(0);
                        player.$give(cards, event.target, false);
                        if (get.type(cards[0]) == 'delay')
                            event.target.addJudge(cards[0]);
                        else if (get.color(cards[0]) == 'red' && event.target.canAddJudge('lebu'))
                            event.target.addJudge({ name: 'lebu' }, cards);
                        else if (get.color(cards[0]) == 'black' && event.target.canAddJudge('bingliang'))
                            event.target.addJudge({ name: 'bingliang' }, cards);
                    }
                },
            },
            heimo: {
                audio: 'quru',
                trigger: {
                    player: 'damageEnd',
                },
                direct: true,
                filter(event, player) {
                    return player.countCards('he');
                },
                content() {
                    'step 0';
                    event.targets = [player];
                    if (trigger.source && trigger.source.isIn()) {
                        event.damageBy = true;
                        event.targets.add(trigger.source);
                    }
                    ;
                    var next = player.chooseToDiscard('he', [1, Infinity], get.prompt2('heimo', event.targets));
                    next.set('logSkill', ['heimo', event.targets, 'fire']);
                    'step 1';
                    if (result.bool) {
                        event.num = result.cards.length;
                    }
                    else
                        event.finish();
                    'step 2';
                    player.judge((card) => {
                        return 0;
                    }).callback = lib.skill.heimo.callback;
                    if (--event.num)
                        event.redo();
                    'step 3';
                    if (event.black && event.targets[1])
                        event.targets[1].damage();
                    'step 4';
                    if (event.red)
                        player.draw(2);
                },
                callback() {
                    var evt = event.getParent('heimo');
                    if (event.judgeResult.color == 'black') {
                        evt.black = true;
                        player.popup('黑色');
                    }
                    else if (event.judgeResult.color == 'red') {
                        evt.red = true;
                        player.popup('红色');
                    }
                    game.delay(2);
                },
            },
        },
        dynamicTranslate: {
            re_longdan(player) {
                let str = lib.translate.re_longdan_info;
                let result = /(阳：.*?)[；。].*(阴：.*?)[；。]/g.exec(str);
                let yang = result[1], yin = result[2];
                if (player.storage.re_longdan === true)
                    return str.replace(yang, lib.spanClass(yang, 'changetext'));
                return str.replace(yin, lib.spanClass(yin, 'changetext'));
            },
        },
        translate: {
            hololive: `HOLO`,
            re_KizunaAI: `新·绊爱`,
            re_ailian: `爱冀`,
            re_ailian_info: `当你受到伤害后或出牌阶段限一次，你可以将任意张手牌交给一名其他角色。当你于一个阶段内以此法给出第二张牌时，你可以视为使用一张基本牌。`,
            re_ailian_append: lib.figurer(`特性：传递关键牌`),
            re_YuNi: `新·YuNi`,
            re_shengcai: `声彩`,
            re_shengcai_info: `当你使用一张牌后，若与本回合此前被使用的牌颜色均不同，你可以摸X张牌。（X为本回合之前使用过的牌数）`,
            re_shengcai_append: lib.figurer(`回合内爆发（注意不要被其他人使用的牌干扰）`),
            re_TomariMari: `新·兎鞠まり`,
            liansheng: `恋声`,
            liansheng_info: `锁定技 你未受伤时性别为男；受伤时性别为女。你的性别变化时，若当前回合角色为女性，你摸一张牌。`,
            ruantang: `软糖`,
            ruantang_info: `你可以跳过判定阶段和摸牌阶段，令至多一名异性角色与你各回复1点体力，然后体力因此回复至上限的角色摸一张牌。`,
            re_Omesis: `新·欧米伽姐妹`,
            yaozhan: `邀战`,
            yaozhan_info: `你可以跳过摸牌阶段/出牌阶段，视为使用一张【决斗】。`,
            yaozhan_append: lib.figurer(`特性：易上手`),
            chongxin: `崇新`,
            chongxin_info: `当判定牌生效前，你可以用相同花色的牌替换之，然后你可以将获得的牌置于武将牌上。其他角色不能使用与之花色相同的牌响应你使用的【决斗】。`,
            re_NijikawaRaki: `新·虹河ラキ`,
            yayun: `押运`,
            laohuji: `老虎机`,
            yayun_info: `轮次技 在合适的时机，你可以弃置所有手牌，连续判定三次，每有一张判定牌花色包含于弃牌中，你便摸一张牌；若三次判定结果均为同一花色，你额外摸三张牌。`,
            yayun_append: lib.figurer(`特性：赌狗`),
            jidao: `极道`,
            jidao_info: `你可以防止对其他角色造成的伤害，改为令其发动一次『押运』。`,
            re_Fairys: `新·Fairys`,
            re_Fairys_ab: `新·鹦鹉`,
            ywshuangxing: `双形`,
            ywshuangxing_info: `当你成为黑色非基本牌/红色非装备牌的目标时，若你的体力为奇数/偶数，你可以取消之。`,
            yinni: `音拟`,
            yinni_info: `当你使用一张牌时，若与上一张被使用的牌颜色不同，你可将之目标数改为与上一张牌相同。若目标数因此减少，你摸一张牌。`,
            re_TenkaiTsukasa: `新·天开司`,
            re_pojie: `破戒`,
            re_pojie_info: `回合内，一名角色失去装备区的牌时，你可以摸一张牌。出牌阶段结束时，本阶段你每发动过一次此技能便弃置一张牌。`,
            re_dazhen: `大振`,
            re_dazhen_info: `出牌阶段，你可将你武器栏的牌移动至其他角色武器栏（代替原装备），然后其选择一项：<br>弃置你手牌数与手牌上限之差的牌；或受到你造成的1点伤害。`,
            re_KaguyaLuna: `新·辉夜月`,
            re_jiajiupaidui: `假酒`,
            re_jiajiupaidui_info: `每回合限一次，当你需要使用【酒】时，你可以令一名角色弃一张牌，若为♠或点数9，视为你使用之。`,
            re_MiraiAkari: `新·未来明`,
            duanli: `断离`,
            duanli_info: `出牌阶段限一次，你可以弃置所有手牌，然后你于回合结束时摸等量的牌。`,
            duanli_append: lib.figurer(`特性：制衡`),
            qingmi: `情迷`,
            qingmi_info: `其他角色使用【桃】后，可以令你摸一张牌。`,
            re_NekomiyaHinata: `新·猫宫日向`,
            yingdan: `盈弹`,
            yingdan_info: `你可以使用一张【杀】，视为使用了一张【闪】或【无懈可击】。若此【杀】的点数不大于你的攻击范围，则这些牌均不触发技能时机。`,
            yingdan_append: lib.figurer(`特性：强化出杀`),
            tianzhuo: `舔镯`,
            tianzhuo_info: `当其他角色死亡时，你可以获得其装备区的牌，若该角色由你杀死，你摸三张牌。`,
            re_kaguraNaNa: `新·神乐七奈`,
            re_DDzhanshou: `D斩`,
            re_DDzhanshou_info: `一名角色的回合结束时，若本回合其对除你和其以外的角色使用过红色牌，你可以摸一张牌或对其使用一张【杀】。`,
            re_Siro: `新·小白`,
            lingsi: `灵思`,
            lingsi_info: `出牌阶段限一次，你可以摸两张牌然后弃两张牌。你一次性弃置至少两张基本牌后，可以视为使用一张【杀】；一次性弃置至少两张非基本牌后，可以令一名角色回复1点体力。`,
            lingsi_append: lib.figurer(`特性：制衡`),
            re_Nekomasu: `新·ねこます`,
            re_dianyin: `承志`,
            re_dianyin_info: `当你受到 1 点伤害后，你可以令一名角色摸两张牌，若其手牌数少于你或为全场最少，改为摸三张牌。`,
            re_Noracat: `新·野良喵`,
            kouhu: `口胡`,
            kouhu_shan: `口胡-闪`,
            kouhu_sha: `口胡-杀`,
            kouhu_info: `每轮每项限一次。你可以令当前回合角色摸一张牌，视为打出了一张【杀】或使用了一张【闪】。`,
            zhiqiu: `直球`,
            zhiqiu_info: `当你发动『口胡』时，你可以与一名角色拼点，若你赢，你指定一名角色受到一点伤害；否则其对你造成一点伤害。`,
            re_XiaDi: `新·下地`,
            re_yinliu: `逐流`,
            re_yinliu_info: `出牌阶段限一次，你可以弃置至多三张牌，然后摸牌并展示直到出现了你弃置牌未包含的花色为止。`,
            re_ShizukaRin: `新·静凛`,
            re_mozhaotuji: `夜杰`,
            re_mozhaotuji_DrawOrStop: `夜杰`,
            re_mozhaotuji_info: `每回合限一次，你可以将你的一个阶段变为出牌阶段。你使用过至少两张牌的出牌阶段结束时，摸一张牌。`,
            re_MitoTsukino: `新·月之美兔`,
            re_MitoTsukino_info: `月之美兔`,
            re_bingdielei: `盛蕾`,
            re_bingdielei_info: `轮次技 一个回合结束时，若你于该回合内失去过牌，你可以获得一个额外回合。`,
            re_HiguchiKaede: `新·樋口枫`,
            re_zhenyin: `震音`,
            re_zhenyin_info: `每回合限一次，当你使用黑色牌指定目标后，可以将一名目标区域内的一张牌移至其下家，若引起冲突，进行替代并对下家造成 1 点伤害。`,
            re_UshimiIchigo: `新·宇志海莓`,
            re_shuangren: `双刃`,
            re_shuangren_info: `你的黑色【杀】可以额外指定一名角色为目标；你的红色【杀】无距离与次数限制。`,
            re_jitui: `急退`,
            re_jitui_info: `当你受到伤害后或在回合外正面朝上失去非基本牌后，你可以摸一张牌。`,
            re_MononobeAlice: `新·物述有栖`,
            re_dianmingguzhen: `电鸣`,
            re_dianmingguzhen_info: `出牌阶段限一次，你可以失去 1 点体力移动场上的一张装备牌，若移动的是你的，你可视为使用一张雷【杀】。`,
            re_MinamiNami: `新·美波七海`,
            re_longdan: `龙胆雄心`,
            re_longdan_info: `转换技 每回合限一次，阳：你可以将你任意一张不为【杀】的基本牌当作一张【杀】使用或打出；阴：你可以将一张【杀】当作任意一张不为【杀】的基本牌使用或打出。你以此法转化点数大于7的牌无次数与距离限制。`,
            re_SisterClearie: `新·克蕾雅`,
            shenyou: `神佑`,
            shenyou_info: `锁定技 你受到来自基本牌的伤害+1；其它的伤害-1。`,
            shenfa: `神罚`,
            shenfa_info: `当你失去一张手牌时，你可以令一名其他角色获得『神佑』直到回合结束。`,
            shenfa_append: lib.figurer(`特性：易上手`),
            re_SuzukaUtako: `新·铃鹿诗子`,
            re_meici: `美词`,
            re_meici_info: `转换技 每回合限一次，有牌不因使用进入弃牌堆时，你可以获得其中一张①红色️②黑色️牌。`,
            re_danlian: `耽恋`,
            re_danlian_info: `当你于摸牌阶段外获得♦/♥/♠牌时，你可以将之合理的置于一名角色的判定区/手牌区/装备区。`,
            re_SuzuharaLulu: `新·铃原露露`,
            tunshi: `吞食`,
            tunshi_info: `其他角色于其回合外失去某区域最后一张牌时，你可以令当前回合角色获得之。你的回合内其他角色进入濒死状态时，你可以回复1点体力。`,
            re_LizeHelesta: `新·莉泽`,
            yubing: `语冰`,
            yubing_info: `你使用基本牌或通常锦囊牌后，若未被抵消，你可以令你不为0的手牌上限-1直到回合结束，然后摸两张牌。`,
            yubing_append: lib.figurer(`特性：易上手`),
            re_AngeKatrina: `新·安洁`,
            akxiaoqiao: `小巧`,
            akxiaoqiao_info: `弃牌阶段开始时，你可以展示任意张类型不同的手牌，本回合这些牌不计入手牌上限。`,
            akxiaoqiao_append: lib.figurer(`特性：易上手`),
            liancheng: `链成`,
            liancheng_info: `每轮限两次。一个回合结束时，你可以重铸任意张类型不同的手牌。若你重铸了装备牌，你可以令当前回合角色调整手牌与你相同。`,
            re_HonmaHimawari: `新·本间向日葵`,
            tianqing: `天晴烂漫`,
            tianqing_info: `一名角色受到伤害时，若本回合上一次伤害没有被防止，你可以防止本次伤害。`,
            mark_tianqing: `天晴烂漫`,
            mark_tianqing_info: `轮次技 一名角色受到伤害时，若本回合已有角色受过伤，你可以防止本次伤害。`,
            mark_tianqing_append: lib.figurer(`特性：减伤`),
            kuiquan: `葵拳连打`,
            kuiquan_info: `你可以将一张牌当【火攻】使用，此牌类型不得为本回合你使用过的类型。当你在【火攻】中弃置了【杀】后，获得目标的展示牌。`,
            re_AibaUiha: `新·相羽初叶`,
            kangding: `扛鼎膂力`,
            kangding_info: `你可以弃置一张武器牌令你即将造成的伤害+1；你可以弃置一张防具牌令你即将受到的伤害-1。`,
            kangding_append: lib.figurer(`特性：减伤`),
            longshe: `龙蛇笔走`,
            longshe_info: `出牌阶段限X次，你可以弃置一张基本牌并展示牌堆顶牌，若为基本牌，弃置之并摸一张牌。若为非基本牌，你可立即使用之。（X为你没有牌的装备栏数）`,
            re_SukoyaKana: `新·健屋花那`,
            re_huawen: `花吻`,
            re_huawen_info: `出牌阶段限一次，你可以弃置两张颜色不同的牌。<br>
			当你弃置两张颜色不同的牌时，可以视为使用其中的红色牌且此牌额外结算一次。`,
            re_liaohu: `疗护`,
            re_liaohu_info: `你造成过伤害的回合结束时，可以令一名角色摸两张牌。若本回合『花吻』已发动，改为摸一张牌并回复 1 点体力。`,
            re_ShirayukiTomoe: `新·白雪巴`,
            re_gonggan: `共感`,
            re_gonggan_info: `出牌阶段限一次，你可以弃置两张颜色不同的牌。<br>
			当你弃置两张颜色不同的牌时，可以视为使用其中的黑色牌且为此牌增加或减少一个目标。`,
            yejing: `夜境`,
            yejing_info: `每回合限一次，当你成为【杀】的目标时，你可以弃置一张点数更大的牌取消之。`,
            re_TokinoSora: `新·时乃空`,
            re_taiyangzhiyin: `阳语`,
            re_taiyangzhiyin_info: `你使用牌指定目标时，若此牌点数大于10，你可选择一项：<br>令之无法响应；为之额外指定一名目标；或摸一张牌。`,
            re_taiyangzhiyin_append: lib.figurer(`特性：易上手`),
            re_RobokoSan: `新·萝卜子`,
            re_zhanxie: `战械`,
            re_zhanxie_info: `锁定技 你于出牌阶段可多使用两张【杀】。当你使用第三张【杀】时，摸两张牌。`,
            re_chongdian: `机电`,
            re_chongdian_info: `你受到雷电伤害时可改为回复等量体力。你的装备牌可当无距离限制的雷【杀】使用。`,
            re_ShirakamiFubuki: `新·白上吹雪`,
            re_yuanlv: `狐虑`,
            re_yuanlv_info: `每回合限一次，你使用锦囊后或受到伤害后，你可以摸三张牌，然后将两张牌置于牌堆顶。`,
            re_yuanlv_append: lib.figurer(`特性：易上手`),
            re_jinyuan: `边援`,
            re_jinyuan_info: `出牌阶段，你可以弃一张牌令一名其他角色摸一张牌，然后其可以立即使用那张牌。`,
            re_HoshimatiSuisei: `新·星街彗星`,
            cansha: `残杀`,
            cansha_info: `当你的实体【杀】生效后，你可以视为使用一张【过河拆桥】；当你的实体【过河拆桥】生效后，你可以视为使用一张【杀】。`,
            re_AkiRosenthal: `新·亚琦`,
            re_huichu: `烩料`,
            re_huichu_info: `轮次技 一名角色的回合开始时，你可以展示所有手牌，若均为红色，其回复 1 点体力。若有其它花色，你可以重铸任意张手牌。`,
            re_YozoraMel: `新·夜空梅露`,
            fuyi: `蝠翼`,
            fuyi_info: `锁定技 奇数轮内你计算与其他角色的距离-1，偶数轮内其他角色计算与你的距离+1。`,
            xihun: `吸魂`,
            xihun_info: `一名角色受到【杀】造成的伤害后，你可以摸一张牌。然后若你的手牌数大于手牌上限，你本轮不能再发动此技能。`,
            re_SakuraMiko: `新·樱巫女`,
            huangyou: `黄油`,
            huangyou_info: `出牌阶段，你可以弃置两张红色牌摸三张牌或回复1点体力，然后判定一次，若不为♥，本回合不能再发动此技能。`,
            huangyou_append: lib.figurer(`特性：赌狗`),
            qidao: `祈祷`,
            qidao_info: `当判定牌生效前，你可以弃一张牌重新判定。`,
            re_NatsuiroMatsuri: `新·夏色祭`,
            re_huxi1: `恋上`,
            re_huxi1_info: `当你不因此技能获得牌后，你可以与一名本回合未『恋上』过的角色交换一张手牌。然后若你获得了红色牌，你摸一张牌，使用的下一张【杀】不计入次数。`,
            re_AkaiHaato: `新·赤井心`,
            xinchixin: `赤心`,
            xinchixin_info: `当牌进入弃牌堆时，若其中有本回合未以此技能获得的♥牌，你可以获得其中一张红色牌；或将其中任意张牌以任意顺序置于牌堆顶。`,
            xinchixin_append: lib.figurer(`特性：回收关键牌`),
            re_NakiriAyame: `新·百鬼绫目`,
            guiren: `鬼刃`,
            guiren_info: `你可以将两张颜色不同的牌当做一张不计入次数的【杀】使用，若被抵消，你可以收回之并结束此阶段；若造成伤害，根据你转化牌包含的类型获得对应效果：基本~指定此伤害的属性；锦囊~获得目标一张牌；装备~此【杀】伤害+1。`,
            guiren_append: lib.figurer(`特性：易上手`),
            re_MurasakiShion: `新·紫咲诗音`,
            anshu: `暗术`,
            anshu_info: `其他角色的回合结束时，若其手牌数不小于你，你可对其使用一张牌。且若此牌为♠，此牌不可被其响应。`,
            xingchi: `醒迟`,
            xingchi_info: `其他角色每回合使用的第一张牌不能指定你为目标。当你获得牌后，若你的手牌数：大于手牌上限，你可以将一张牌当【杀】使用；不大于手牌上限，你摸两张牌，然后本回合不再触发此项。`,
            re_UsadaPekora: `新·兔田佩克拉`,
            qiangyun: `强运`,
            qiangyun_info: `你的判定牌生效前，你可以打出一张牌代替之，然后你可以立即使用打出牌，且此牌造成伤害后，你摸一张牌。`,
            tuquan: `兔拳`,
            tuquan_info: `锁定技 你的【杀】被【闪】抵消时，你进行判定，若为♠，你弃置目标一张牌，若为♥，你弃置一张牌。`,
            re_UruhaRushia: `新·润羽露西娅`,
            juebi: `绝壁`,
            juebi_info: `在你未受到伤害的回合内，你可以将非基本牌当【闪】使用或打出；你受到伤害后，可以令本回合下一次造成的伤害+1。`,
            zhanhou: `战吼`,
            zhanhou_info: `出牌阶段开始时/其他角色阵亡时，你可以受到1点无来源的伤害/回复1点体力，视为使用一张【顺手牵羊】。`,
            zhanhou_append: lib.figurer(`特性：易上手`),
            re_SpadeEcho: `新·黑桃影`,
            qinglve: `轻掠`,
            qinglve_info: `出牌阶段限一次，你可以废除一个装备栏，视为使用一张【顺手牵羊】。你的手牌上限和攻击范围始终增加你废除装备栏之数。`,
            yingshi: `影逝`,
            yingshi_info: `你可以将♣️牌当做最近进入弃牌堆的非♣️基本牌使用或打出。`,
            re_ŌzoraSubaru: `新·大空昴`,
            cejing: `策竞`,
            cejing_info: `一名角色的回合结束时，若其于此回合未造成伤害，你可以弃一张牌令其执行一个指定的额外阶段。此阶段结束时，你与其各摸等同本阶段造成伤害数的牌，若未因此摸牌，本轮此技能失效。`,
            cejing_append: lib.figurer(`特性：辅助`),
            re_TsunomakiWatame: `新·角卷绵芽`,
            re_XiaoxiXiaotao: `新·小希小桃`,
            re_doupeng: `逗捧`,
            re_doupeng_info: `出牌阶段限一次，你可以与一名其他角色拼点，赢的角色摸两张牌，没赢的角色可以令赢的角色回复1点体力。`,
            re_xuyan: `虚研`,
            re_xuyan_info: `结束阶段，你可以选择一名其他角色；你下个回合开始时，若该角色在此期间造成过伤害，你摸一张牌。否则你与一名角色各失去1点体力。`,
            re_InuyamaTamaki: `新·犬山玉姬`,
            re_hundunliandong: `混联`,
            re_hundunliandong_info: `出牌阶段限一次，你可以令任意势力不相同的角色各弃置一张牌。此技能计算势力时，有「homolive」标记的角色视为同势力。`,
            re_hundunliandong_append: lib.figurer(`特性：强制弃牌`),
            re_KaguraMea: `新·神乐めあ`,
            fengna: `奉纳`,
            fengna_info: `出牌阶段限一次，你可以令手牌数大于你的角色依次交给你一张牌。`,
            fengna_append: lib.figurer(`特性：高嘲讽`),
            re_xiaoyan: `嚣言`,
            re_xiaoyan_info: `锁定技 你对手牌数小于你的角色使用牌不可被响应。`,
            re_OtomeOto: `新·乙女音`,
            re_yuxia: `龙箱`,
            re_yuxia_info: `每回合限一次，你可以将三张牌当作一张通常锦囊牌使用，此牌点数视为这些牌的合计。然后，你可以将其中一张置于牌堆顶。`,
            hanyin: `瀚音`,
            hanyin_info: `你使用牌被点数小于之的牌响应或抵消时，摸一张牌。`,
            re_HisekiErio: `新·绯赤艾莉欧`,
            re_huange: `幻歌`,
            re_huange_info: `轮次技 一个回合开始时，你可以摸等同一名角色体力值的牌，然后于回合结束时，弃置等同于该角色当前体力值的牌。`,
            re_huange_append: lib.figurer(`特性：易上手`),
            re_HanazonoSerena: `新·花園セレナ`,
            re_jiumao: `啾猫`,
            re_jiumao_info: `其他角色于弃牌阶段开始时，可以交给你任意张手牌；然后若你的手牌数与其相等，你可以于此阶段结束时使用一张牌，且此牌额外结算一次。`,
            re_enfan: `恩返`,
            re_enfan_info: `其他角色进入濒死状态时，你可以交给其任意张牌，然后其弃置任意张牌。若因此弃置的牌包含所有类型，其回复1点体力；若包含所有颜色，你与其各摸一张牌。`,
            re_ŌokamiMio: `新·大神澪`,
            re_yuzhan: `预占`,
            re_yuzhan_info: `出牌阶段限一次，你可以观看牌堆顶的四张牌，若有两对颜色相同，你令当前回合角色获得其中一对，若不为你，你获得另一对。然后你将剩余牌以任意顺序置于牌堆顶或牌堆底。`,
            re_bizuo: `弼佐`,
            re_bizuo_info: `轮次技 一名角色的回合开始时，你可以将任意张牌置于牌堆顶，其本回合使用这些牌时，你可以发动一次『预占』。`,
            re_DoumyoujiHaruto: `新·道明寺晴翔`,
            shengfu: `胜负`,
            shengfu_info: `每轮每项限一次，当你需要使用【决斗】/【无懈可击】时，你可以与目标/来源拼点，赢则视为使用之，没赢则不能使用牌直到回合结束。你的拼点牌亮出后，你可以令一方收回黑色拼点牌，改用牌堆顶牌代替。`,
            shengfu_append: lib.figurer(`特性：无损拼点`),
            wanbi: `完璧`,
            wanbi_info: `当你抵消其他角色的牌后，若其手牌数不小于你，你可以获得被抵消的牌。`,
            re_ShigureUi: `新·时雨羽衣`,
            uijieyuan: `结缘`,
            uijieyuan_info: `出牌阶段限一次，你可以将两张红色牌当【远交近攻】使用，若对本回合手牌数变化过的角色使用，则改为用一张非基本牌以转化。`,
            huixiang: `绘象`,
            huixiang_equip: `绘象`,
            huixiang_info: `出牌阶段或结束阶段，你可以选择场上的一张非宝物装备牌并交给拥有者一张牌，若你对应装备栏没有牌，你视为装备之直到下次发动此技能。被选择的装备进入弃牌堆时，你摸一张牌。`,
            huixiang_append: lib.figurer(`特性：难上手`),
            re_AZKi: `新·AZKi`,
            WHiTE: `WHiTE`,
            WHiTE_info: `当你受到伤害后，你可以观看来源的手牌并声明一种花色，其无法使用、打出或弃置该花色的牌直到回合结束。`,
            BLacK: `BLacK`,
            BLacK_info: `出牌阶段限一次，你可以指定一名其他角色，然后观看牌堆顶X张牌并用其中一张与其拼点，赢的角色对没赢的角色使用拼点牌。（X为目标体力值）`,
            re_Kano: `新·鹿乃`,
            shiguang: `失光`,
            shiguang_info: `当你造成/受到伤害后，你可以令另一名角色回复等量体力/受到等量同来源伤害。然后下个回合开始时，其失去等量体力/回复等量体力。`,
            re_HanamaruHareru: `新·花丸晴琉`,
            rangran: `昂然`,
            rangran_info: `你使用牌可指定本回合未以此法指定过的场上体力最多角色为额外目标。场上体力最多的角色受到属性伤害后，你摸一张牌。`,
            jiazhao: `佳朝`,
            jiazhao_info: `当一名角色受到伤害后，你可以令其摸一张牌，若其体力值为全场最少，额外摸一张。然后其回合开始时弃置因此获得的牌。`,
            re_ShirakamiHaruka: `新·白神遥`,
            zhenbao: `心灵震豹`,
            zhenbao_info: `当你一次性弃置两张或更多的牌后，你可以令一名判定区没有牌的角色选择其中一张置于其判定区。`,
            heimo: `黑魔唤醒`,
            heimo_info: `当你受到伤害后，你可以弃置任意张牌并进行等量次判定。若判定结果中有黑色牌，你对来源造成1点伤害；若有红色牌，你摸两张牌。`,
            heimo_append: lib.figurer(`特性：卖血`),
        }
    };
});
