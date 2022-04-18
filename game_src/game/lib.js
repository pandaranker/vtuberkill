const { player } = require('./lib_element');

module.exports = {
  libFun: (vkCore) => {
    let { game, ui, get, ai, lib, _status } = vkCore
    /**
     * 游戏基础对象和状态机
     * @name element
     * @namespace
     * @see {@link content}
     * @see {@link element.player}
     * @see {@link element.card}
     */
    const element = require('./lib_element')
    /**
     * 游戏模式菜单
     * @name configMenu.mode
     * @type {!Object}
     */
    const _mode = {
      connect: {
        name: '联机',
        config: {
          connect_nickname: {
            name: '联机昵称',
            input: true,
            frequent: true,
          },
          connect_avatar: {
            name: '联机头像',
            init: 'KizunaAI',
            item: {},
            frequent: true,
            onclick: function (item) {
              game.saveConfig('connect_avatar', item);
              game.saveConfig('connect_avatar', item, 'connect');
            },
            visualMenu: function (node, link, name, config) {
              node.className = 'button character themebutton';
              if (!node.chara) {
                node.chara = true
                node.setBackground(link, 'character')
              }
            },
          },
          hall_ip: {
            name: '联机大厅',
            input: true,
            frequent: true,
          },
          hall_button: {
            name: '联机大厅按钮',
            init: true,
            frequent: true,
            onclick: function (bool) {
              game.saveConfig('hall_button', bool, 'connect');
              if (ui.hall_button) {
                if (bool) {
                  ui.hall_button.style.display = '';
                }
                else {
                  ui.hall_button.style.display = 'none';
                }
              }
            }
          },
        }
      },
      // richer: {
      //     name: '大富翁',
      //     connect: {
      //         connect_player_number: {
      //             name: '游戏人数',
      //             init: '6',
      //             item: {
      //                 '2': '两人',
      //                 '3': '三人',
      //                 '4': '四人',
      //                 '5': '五人',
      //                 '6': '六人',
      //             },
      //             frequent: true,
      //             restart: true,
      //         },
      //         update: function (config, map) {
      //         },
      //         connect_show_range: {
      //             name: '显示卡牌范围',
      //             init: true,
      //         },
      //         // connect_show_distance:{
      //         // 	name:'显示距离',
      //         // 	init:true,
      //         // },
      //         connect_chessscroll_speed: {
      //             name: '边缘滚动速度',
      //             init: '20',
      //             intro: '鼠标移至屏幕边缘时自动滚屏',
      //             item: {
      //                 '0': '不滚动',
      //                 '10': '10格/秒',
      //                 '20': '20格/秒',
      //                 '30': '30格/秒',
      //             }
      //         },
      //     },
      //     config: {
      //         player_number: {
      //             name: '游戏人数',
      //             init: '6',
      //             item: {
      //                 '2': '两人',
      //                 '3': '三人',
      //                 '4': '四人',
      //                 '5': '五人',
      //                 '6': '六人',
      //             },
      //             frequent: true,
      //             restart: true,
      //         },
      //         update: function (config, map) {
      //             switch (config.player_number) {
      //                 case 4:
      //                 case 6: {
      //                     map.team_number.show();
      //                     break;
      //                 }
      //                 default: {
      //                     map.team_number.hide();
      //                     break;
      //                 }

      //             }
      //         },
      //         show_range: {
      //             name: '显示卡牌范围',
      //             init: true,
      //         },
      //         team_number: {
      //             name: '每队人数',
      //             init: '1',
      //             item: {
      //                 '1': '单人',
      //                 '2': '两人',
      //             },
      //             frequent: true,
      //             restart: true,
      //         },
      //         chessscroll_speed: {
      //             name: '边缘滚动速度',
      //             init: '20',
      //             intro: '鼠标移至屏幕边缘时自动滚屏',
      //             item: {
      //                 '0': '不滚动',
      //                 '10': '10格/秒',
      //                 '20': '20格/秒',
      //                 '30': '30格/秒',
      //             }
      //         },
      //     }
      // },
      identity: {
        name: '身份',
        connect: {
          update: function (config, map) {
            if (config.connect_identity_mode == 'zhong') {
              map.connect_change_choice.hide();
              map.choice_ex.hide();
              map.connect_player_number.hide();
              map.connect_enhance_zhu.hide();
              map.connect_double_nei.hide();
              map.connect_zhong_card.show();
              map.connect_special_identity.hide();
              map.connect_double_character.show();
            }
            else if (config.connect_identity_mode == 'purple') {
              map.connect_change_choice.hide();
              map.choice_ex.hide();
              map.connect_player_number.hide();
              map.connect_enhance_zhu.hide();
              map.connect_double_nei.hide();
              map.connect_zhong_card.hide();
              map.connect_special_identity.hide();
              map.connect_double_character.hide();
            }
            else {
              map.connect_change_choice.show();
              map.choice_ex.show();
              map.connect_double_character.show();
              map.connect_player_number.show();
              map.connect_enhance_zhu.show();
              if (config.connect_player_number != '2') {
                map.connect_double_nei.show();
              }
              else {
                map.connect_double_nei.hide();
              }
              map.connect_zhong_card.hide();

              if (config.connect_player_number == '8') {
                map.connect_special_identity.show();
              }
              else {
                map.connect_special_identity.hide();
              }
            }
          },
          connect_identity_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '标准',
              zhong: '明忠',
              purple: '3v3v2',
            },
            restart: true,
            frequent: true,
            intro: '明忠模式和3v3v2模式详见帮助'
          },
          connect_player_number: {
            name: '游戏人数',
            init: '8',
            item: {
              '2': '两人',
              '3': '三人',
              '4': '四人',
              '5': '五人',
              '6': '六人',
              '7': '七人',
              '8': '八人'
            },
            frequent: true,
            restart: true,
          },
          connect_zhong_card: {
            name: '明忠卡牌替换',
            init: true,
            frequent: true,
            restart: true
          },
          connect_double_nei: {
            name: '双内奸',
            init: false,
            restart: true,
            // frequent:true,
            intro: '开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
          },
          connect_double_character: {
            name: '双将模式',
            init: false,
            frequent: true,
            restart: true,
          },
          connect_change_card: {
            name: '启用手气卡',
            init: false,
            frequent: true,
            restart: true,
          },
          connect_change_choice: {
            name: '自选模式',
            init: false,
            frequent: true,
            restart: true,
          },
          connect_special_identity: {
            name: '特殊身份',
            init: false,
            restart: true,
            frequent: true,
            intro: '开启后游戏中将增加军师、大将、贼首三个身份'
          },
          connect_enhance_zhu: {
            name: '加强主公',
            init: false,
            restart: true,
            intro: '为主公增加一个额外技能'
          },
          choice_ex: {
            name: '额外选将框',
            init: '0',
            restart: true,
            item: {
              '0': '〇',
              '1': '一',
              '2': '二',
              '3': '三',
              '4': '四',
              '5': '五',
            },
            intro: '为所有玩家分配额外选将框'
          },
          card_remark: {
            name: '装备回调',
            init: false,
            frequent: true,
            restart: true,
            intro: '将军争和基础包的装备牌回调至《三国杀》原版'
          }
        },
        config: {
          update: function (config, map) {
            if (config.identity_mode == 'zhong') {
              map.player_number.hide();
              map.enhance_zhu.hide();
              map.double_nei.hide();
              map.auto_identity.hide();
              map.choice_ex.hide();
              map.choice_zhu.hide();
              map.choice_zhong.hide();
              map.choice_nei.hide();
              map.choice_fan.hide();
              map.ban_identity.hide();
              map.ban_identity2.hide();
              map.ban_identity3.hide();
              map.zhong_card.show();
              map.special_identity.hide();
              map.choose_group.show();
              map.change_choice.show();
              map.auto_mark_identity.show();
              map.double_character.show();
              map.free_choose.show();
              map.change_identity.show();
              if (config.double_character) {
                map.double_hp.show();
              }
              else {
                map.double_hp.hide();
              }
              map.continue_game.show();
            }
            else if (config.identity_mode == 'purple') {
              map.player_number.hide();
              map.enhance_zhu.hide();
              map.double_nei.hide();
              map.auto_identity.hide();
              map.choice_ex.hide();
              map.choice_zhu.hide();
              map.choice_zhong.hide();
              map.choice_nei.hide();
              map.choice_fan.hide();
              map.ban_identity.hide();
              map.ban_identity2.hide();
              map.ban_identity3.hide();
              map.zhong_card.hide();
              map.special_identity.hide();
              map.double_character.hide();
              map.double_hp.hide();
              map.choose_group.hide();
              map.auto_mark_identity.hide();
              map.change_choice.hide();
              map.free_choose.hide();
              map.change_identity.hide();
              map.continue_game.hide();
            }
            else {
              map.continue_game.show();
              map.player_number.show();
              map.enhance_zhu.show();
              map.auto_identity.show();
              if (config.player_number != '2') {
                map.double_nei.show();
              }
              else {
                map.double_nei.hide();
              }
              map.choice_ex.show();
              map.choice_zhu.show();
              map.choice_zhong.show();
              map.choice_nei.show();
              map.choice_fan.show();
              map.ban_identity.show();
              if (config.ban_identity == 'off') {
                map.ban_identity2.hide();
              }
              else {
                map.ban_identity2.show();
              }
              if (config.ban_identity == 'off' || config.ban_identity2 == 'off') {
                map.ban_identity3.hide();
              }
              else {
                map.ban_identity3.show();
              }
              map.zhong_card.hide();
              map.choose_group.show();
              map.auto_mark_identity.show();
              map.change_choice.show();
              map.free_choose.show();
              map.change_identity.show();
              if (config.player_number == '8') {
                map.special_identity.show();
              }
              else {
                map.special_identity.hide();
              }
              map.double_character.show();
              if (config.double_character) {
                map.double_hp.show();
              }
              else {
                map.double_hp.hide();
              }
            }
          },
          identity_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '标准',
              zhong: '明忠',
              purple: '3v3v2',
            },
            restart: true,
            frequent: true,
            intro: '明忠模式详见帮助'
          },
          player_number: {
            name: '游戏人数',
            init: '3',
            item: {
              '2': '两人',
              '3': '三人',
              '4': '四人',
              '5': '五人',
              '6': '六人',
              '7': '七人',
              '8': '八人'
            },
            frequent: true,
            restart: true,
          },
          double_nei: {
            name: '双内奸',
            init: false,
            restart: true,
            frequent: true,
            intro: '开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
          },
          choose_group: {
            name: '神武将选择势力',
            init: true,
            restart: true,
            frequent: true,
            intro: '若开启此选项，选择神武将的玩家需在亮出自己的武将牌之前为自己选择一个势力。'
          },
          nei_fullscreenpop: {
            name: '主内单挑特效',
            intro: '在进入主内单挑时，弹出全屏文字特效',
            init: true,
            unfrequent: true,
          },
          double_character: {
            name: '双将模式',
            init: false,
            frequent: true,
            restart: true,
          },
          special_identity: {
            name: '特殊身份',
            init: false,
            restart: true,
            frequent: true,
            intro: '开启后游戏中将增加军师、大将、贼首三个身份'
          },
          zhong_card: {
            name: '明忠卡牌替换',
            init: true,
            frequent: true,
            restart: true
          },
          double_hp: {
            name: '双将体力上限',
            init: 'pingjun',
            item: {
              hejiansan: '和减三',
              pingjun: '平均值',
              zuidazhi: '最大值',
              zuixiaozhi: '最小值',
              zonghe: '相加',
            },
            restart: true,
          },
          auto_identity: {
            name: '自动显示身份',
            item: {
              off: '关闭',
              one: '一轮',
              two: '两轮',
              three: '三轮',
              always: '始终'
            },
            init: 'off',
            onclick: function (bool) {
              game.saveConfig('auto_identity', bool, this._link.config.mode);
              if (get.config('identity_mode') == 'zhong') return;
              var num;
              switch (bool) {
                case '一轮': num = 1; break;
                case '两轮': num = 2; break;
                case '三轮': num = 3; break;
                default: num = 0; break;
              }
              if (num && !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
                _status.identityShown = true;
                game.showIdentity(false);
              }
            },
            intro: '游戏进行若干轮将自动显示所有角色的身份',
          },
          auto_mark_identity: {
            name: '自动标记身份',
            init: true,
            intro: '根据角色的出牌行为自动标记可能的身份',
          },
          // ban_weak:{
          //     name:'屏蔽弱将',
          //     init:true,
          //     restart:true,
          // },
          // ban_strong:{
          //     name:'屏蔽强将',
          //     init:false,
          //     restart:true,
          // },
          enhance_zhu: {
            name: '加强主公',
            init: false,
            restart: true,
            intro: '为主公增加一个额外技能'
          },
          free_choose: {
            name: '自由选将',
            init: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          change_identity: {
            name: '自由选择身份和座位',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_identity', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              var dialog;
              if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
              else dialog = _status.event.dialog;
              if (!_status.brawl || !_status.brawl.noAddSetting) {
                if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                else _status.event.getParent().removeSetting(dialog);
              }
              ui.update();
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            }
          },
          change_card: {
            name: '开启手气卡',
            init: 'disabled',
            item: {
              disabled: '禁用',
              once: '一次',
              twice: '两次',
              unlimited: '无限',
            },
          },
          continue_game: {
            name: '显示再战',
            init: false,
            onclick: function (bool) {
              game.saveConfig('continue_game', bool, this._link.config.mode);
              if (get.config('continue_game')) {
                if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                  ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                }
              }
              else if (ui.continue_game) {
                ui.continue_game.close();
                delete ui.continue_game;
              }
            },
            intro: '游戏结束后可选择用相同的武将再进行一局游戏'
          },
          dierestart: {
            name: '死亡后显示重来',
            init: true,
            onclick: function (bool) {
              game.saveConfig('dierestart', bool, this._link.config.mode);
              if (get.config('dierestart')) {
                if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                  ui.restart = ui.create.control('restart', game.reload);
                }
              }
              else if (ui.restart) {
                ui.restart.close();
                delete ui.restart;
              }
            }
          },
          revive: {
            name: '死亡后显示复活',
            init: false,
            onclick: function (bool) {
              game.saveConfig('revive', bool, this._link.config.mode);
              if (get.config('revive')) {
                if (!ui.revive && game.me.isDead()) {
                  ui.revive = ui.create.control('revive', ui.click.dierevive);
                }
              }
              else if (ui.revive) {
                ui.revive.close();
                delete ui.revive;
              }
            }
          },
          ban_identity: {
            name: '屏蔽身份',
            init: 'off',
            item: {
              off: '关闭',
              zhu: '主公',
              zhong: '忠臣',
              nei: '内奸',
              fan: '反贼',
            },
          },
          ban_identity2: {
            name: '屏蔽身份2',
            init: 'off',
            item: {
              off: '关闭',
              zhu: '主公',
              zhong: '忠臣',
              nei: '内奸',
              fan: '反贼',
            },
          },
          ban_identity3: {
            name: '屏蔽身份3',
            init: 'off',
            item: {
              off: '关闭',
              zhu: '主公',
              zhong: '忠臣',
              nei: '内奸',
              fan: '反贼',
            },
          },
          ai_strategy: {
            name: '内奸策略',
            init: 'ai_strategy_1',
            item: {
              ai_strategy_1: '均衡',
              ai_strategy_2: '偏反',
              ai_strategy_3: '偏忠',
              ai_strategy_4: '酱油',
              ai_strategy_5: '天使',
              ai_strategy_6: '仇主',
            },
            intro: '设置内奸对主忠反的态度'
          },
          difficulty: {
            name: 'AI对人类态度',
            init: 'normal',
            item: {
              easy: '友好',
              normal: '一般',
              hard: '仇视',
            },
          },
          choice_ex: {
            name: '额外选将框',
            init: '0',
            restart: true,
            item: {
              '0': '关闭',
              '1': '一',
              '2': '二',
              '4': '四',
              '6': '六',
              '8': '八',
            },
            intro: '为所有玩家分配额外选将框'
          },
          choice_zhu: {
            name: '主公候选武将数',
            init: '3',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
          choice_zhong: {
            name: '忠臣候选武将数',
            init: '4',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
          choice_nei: {
            name: '内奸候选武将数',
            init: '5',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
          choice_fan: {
            name: '反贼候选武将数',
            init: '3',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
          card_remark: {
            name: '装备回调',
            init: false,
            frequent: true,
            restart: true,
            intro: '将军争和基础包的装备牌回调至《三国杀》原版'
          }
        }
      },
      guozhan: {
        name: '国战',
        connect: {
          update: function (config, map) {
            if (config.connect_onlyguozhan) {
              map.connect_junzhu.show();
            }
            else {
              map.connect_junzhu.hide();
            }
          },
          connect_guozhan_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '势备',
              yingbian: '应变',
              old: '怀旧',
            },
            frequent: true,
            restart: true,
            intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。',
          },
          connect_player_number: {
            name: '游戏人数',
            init: '8',
            item: {
              '3': '三人',
              '4': '四人',
              '5': '五人',
              '6': '六人',
              '7': '七人',
              '8': '八人'
            },
            frequent: true,
            restart: true,
          },
          connect_initshow_draw: {
            name: '首亮奖励',
            item: {
              'off': '关闭',
              'draw': '摸牌',
              'mark': '标记',
            },
            init: 'mark',
            frequent: true,
            intro: '第一个明置武将牌的角色可获得首亮奖励'
          },
          connect_aozhan: {
            name: '鏖战模式',
            init: true,
            intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
            frequent: true,
            restart: true,
          },
          connect_viewnext: {
            name: '观看下家副将',
            init: false,
            intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
          },
          connect_zhulian: {
            name: '珠联璧合',
            init: true,
            // frequent:true,
            intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
          },
          connect_junzhu: {
            name: '替换君主',
            init: true,
            // frequent:true,
            restart: true,
            intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
          },
          connect_change_card: {
            name: '启用手气卡',
            init: false,
            frequent: true,
            restart: true,
          },
          card_remark: {
            name: '装备回调',
            init: false,
            frequent: true,
            restart: true,
            intro: '将军争和基础包的装备牌回调至《三国杀》原版'
          }
        },
        config: {
          update: function (config, map) {
            if (config.onlyguozhan) {
              map.junzhu.show();
            }
            else {
              map.junzhu.hide();
            }
          },
          guozhan_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '势备',
              yingbian: '应变',
              old: '怀旧',
              free: '自由',
            },
            frequent: true,
            restart: true,
            intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。<br><li>自由：使用玩家的自定义牌堆进行游戏。',
          },
          player_number: {
            name: '游戏人数',
            init: '8',
            item: {
              '3': '三人',
              '4': '四人',
              '5': '五人',
              '6': '六人',
              '7': '七人',
              '8': '八人'
            },
            frequent: true,
            restart: true,
          },
          initshow_draw: {
            name: '首亮奖励',
            item: {
              'off': '关闭',
              'draw': '摸牌',
              'mark': '标记',
            },
            init: 'mark',
            frequent: true,
            intro: '第一个明置身份牌的角色可获得摸牌奖励'
          },
          aozhan: {
            name: '鏖战模式',
            init: true,
            frequent: true,
            restart: true,
            intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
          },
          viewnext: {
            name: '观看下家副将',
            init: false,
            intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
          },
          aozhan_bgm: {
            name: '鏖战背景音乐',
            item: {
              disabled: '不启用',
              online: 'Online',
              rewrite: 'Rewrite',
              chaoming: '潮鸣',
            },
            init: 'rewrite',
            onclick: function (item) {
              game.saveConfig('aozhan_bgm', item, this._link.config.mode);
              if (_status._aozhan == true) game.playBackgroundMusic();
            },
          },
          zhulian: {
            name: '珠联璧合',
            init: true,
            // frequent:true,
            intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
          },
          changeViceType: {
            name: '副将变更方式',
            init: 'default',
            item: {
              default: '发现式',
              online: '随机式',
            },
            frequent: true,
            restart: true,
          },
          onlyguozhan: {
            name: '使用国战武将',
            init: true,
            frequent: true,
            restart: true,
            intro: '开启武将技能将替换为国战版本并禁用非国战武将'
          },
          guozhanSkin: {
            name: '使用国战皮肤',
            init: true,
            frequent: true,
            restart: true,
            intro: '开启此选项后，将会把有国战专属皮肤的武将替换为国战皮肤'
          },
          junzhu: {
            name: '替换君主',
            init: true,
            // frequent:true,
            restart: true,
            intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
          },
          double_hp: {
            name: '双将体力上限',
            init: 'pingjun',
            item: {
              hejiansan: '和减三',
              pingjun: '平均值',
              zuidazhi: '最大值',
              zuixiaozhi: '最小值',
              zonghe: '相加',
            },
            restart: true,
          },
          // ban_weak:{
          //     name:'屏蔽弱将',
          //     init:true,
          //     restart:true,
          // },
          // ban_strong:{
          //     name:'屏蔽强将',
          //     init:false,
          //     restart:true,
          // },
          free_choose: {
            name: '自由选将',
            init: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          onlyguozhanexpand: {
            name: '默认展开自由选将',
            init: false,
            restart: true,
            intro: '开启后自由选将对话框将默认显示全部武将'
          },
          change_identity: {
            name: '自由选择座位',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_identity', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              var dialog;
              if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
              else dialog = _status.event.dialog;
              if (!_status.brawl || !_status.brawl.noAddSetting) {
                if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                else _status.event.getParent().removeSetting(dialog);
              }
              ui.update();
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            }
          },
          change_card: {
            name: '开启手气卡',
            init: 'disabled',
            item: {
              disabled: '禁用',
              once: '一次',
              twice: '两次',
              unlimited: '无限',
            }
          },
          continue_game: {
            name: '显示再战',
            init: true,
            intro: '游戏结束后可选择用相同的武将再进行一局游戏',
            onclick: function (bool) {
              game.saveConfig('continue_game', bool, this._link.config.mode);
              if (get.config('continue_game')) {
                if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                  ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                }
              }
              else if (ui.continue_game) {
                ui.continue_game.close();
                delete ui.continue_game;
              }
            }
          },
          dierestart: {
            name: '死亡后显示重来',
            init: true,
            onclick: function (bool) {
              game.saveConfig('dierestart', bool, this._link.config.mode);
              if (get.config('dierestart')) {
                if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                  ui.restart = ui.create.control('restart', game.reload);
                }
              }
              else if (ui.restart) {
                ui.restart.close();
                delete ui.restart;
              }
            }
          },
          revive: {
            name: '死亡后显示复活',
            init: false,
            onclick: function (bool) {
              game.saveConfig('revive', bool, this._link.config.mode);
              if (get.config('revive')) {
                if (!ui.revive && game.me.isDead()) {
                  ui.revive = ui.create.control('revive', ui.click.dierevive);
                }
              }
              else if (ui.revive) {
                ui.revive.close();
                delete ui.revive;
              }
            }
          },
          difficulty: {
            name: 'AI对人类态度',
            init: 'normal',
            item: {
              easy: '友好',
              normal: '一般',
              hard: '仇视',
            }
          },
          choice_num: {
            name: '候选武将数',
            init: '7',
            restart: true,
            item: {
              '5': '五',
              '6': '六',
              '7': '七',
              '8': '八',
              '9': '九',
              '10': '十',
            }
          },
          card_remark: {
            name: '装备回调',
            init: false,
            frequent: true,
            restart: true,
            intro: '将军争和基础包的装备牌回调至《三国杀》原版'
          }
        }
      },
      versus: {
        name: '对决',
        connect: {
          update: function (config, map) {
            if (config.connect_versus_mode == '1v1') {
              map.connect_choice_num.show();
              map.connect_replace_number.show();
            }
            else {
              map.connect_choice_num.hide();
              map.connect_replace_number.hide();
            }
            if (config.connect_versus_mode == '2v2' || config.connect_versus_mode == '3v3') {
              map.connect_replace_handcard.show();
            }
            else {
              map.connect_replace_handcard.hide();
            }
            if (config.connect_versus_mode == '2v2') {
              map.connect_change_choice.show();
            }
            else {
              map.connect_change_choice.hide();
            }
          },
          connect_versus_mode: {
            name: '游戏模式',
            init: '1v1',
            item: {
              '1v1': '1v1',
              '2v2': '2v2',
              '3v3': '3v3',
              '4v4': '4v4',
              //'guandu':'官渡',
            },
            frequent: true
          },
          connect_replace_handcard: {
            name: '四号位保护',
            init: true,
            frequent: true,
            intro: '最后行动的角色起始手牌数+1'
          },
          connect_choice_num: {
            name: '侯选武将数',
            init: '20',
            frequent: true,
            item: {
              '12': '12人',
              '16': '16人',
              '20': '20人',
              '24': '24人',
              '40': '40人',
            }
          },
          connect_replace_number: {
            name: '替补人数',
            init: '2',
            frequent: true,
            item: {
              '0': '无',
              '1': '1人',
              '2': '2人',
              '3': '3人',
              '4': '4人',
              '5': '5人',
            }
          },
          connect_change_choice: {
            name: '自选模式',
            init: false,
            frequent: true,
            restart: true,
          },
        },
        config: {
          update: function (config, map) {
            if (config.versus_mode == 'four') {
              map.change_choice.hide();
              map.ladder.show();
              if (config.ladder) {
                map.ladder_monthly.show();
                map.ladder_reset.show();
              }
              else {
                map.ladder_monthly.hide();
                map.ladder_reset.hide();
              }
              map.enable_all.show();
              map.enable_all_cards_four.show();
              map.four_assign.show();
              map.four_phaseswap.show();
              map.expand_dialog.show();
              map.fouralign.show();
            }
            else {
              map.change_choice.show();
              map.ladder.hide();
              map.ladder_monthly.hide();
              map.ladder_reset.hide();
              map.enable_all.hide();
              map.enable_all_cards_four.hide();
              map.four_assign.hide();
              map.four_phaseswap.hide();
              map.expand_dialog.hide();
              map.fouralign.hide();
            }
            if (config.versus_mode == 'three' || config.versus_mode == 'one') {
              map.enable_all_three.show();
              map.enable_all_cards.show();
            }
            else {
              map.enable_all_three.hide();
              map.enable_all_cards.hide();
            }
            if (config.versus_mode == 'jiange' || config.versus_mode == 'two' || config.versus_mode == 'endless' ||
              config.versus_mode == 'three' || config.versus_mode == 'one' || config.versus_mode == 'siguo') {
              map.free_choose.show();
            }
            else {
              map.free_choose.hide();
            }
            if (config.versus_mode == 'jiange') {
              map.double_character_jiange.show();
            }
            else {
              map.double_character_jiange.hide();
            }
            if (config.versus_mode == 'two') {
              map.replace_handcard_two.show();
              map.replace_character_two.show();
              map.two_assign.show();
              map.two_phaseswap.show();
            }
            else {
              map.replace_handcard_two.hide();
              map.replace_character_two.hide();
              map.two_assign.hide();
              map.two_phaseswap.hide();
            }
            if (config.versus_mode == 'two' || config.versus_mode == 'siguo' || config.versus_mode == 'four') {
              if (config.versus_mode == 'four' && (config.four_assign || config.four_phaseswap)) {
                map.change_identity.hide();
              }
              else {
                map.change_identity.show();
              }
            }
            else {
              map.change_identity.hide();
            }
            if (config.versus_mode == 'siguo') {
              map.siguo_character.show();
            }
            else {
              map.siguo_character.hide();
            }
          },
          versus_mode: {
            name: '游戏模式',
            init: 'four',
            item: {
              four: '对抗',
              three: '统率',
              two: '欢乐',
              //guandu:'官渡',
              jiange: '战场',
              siguo: '四国',
              standard: '自由'
              // endless:'无尽',
              // triple:'血战',
              // one:'<span style="display:inline-block;width:100%;text-align:center">1v1</span>',
            },
            restart: true,
            frequent: true,
          },
          ladder: {
            name: '天梯模式',
            init: true,
            frequent: true,
            restart: true
          },
          ladder_monthly: {
            name: '每月重置天梯',
            init: true,
            frequent: true,
          },
          enable_all: {
            name: '启用全部武将',
            init: false,
            frequent: true,
            restart: true,
          },
          enable_all_cards_four: {
            name: '启用全部卡牌',
            init: false,
            frequent: true,
            restart: true,
          },
          enable_all_three: {
            name: '启用全部武将',
            init: false,
            frequent: true,
            restart: true,
          },
          enable_all_cards: {
            name: '启用全部卡牌',
            init: false,
            frequent: true,
            restart: true,
          },
          four_assign: {
            name: '代替队友选将',
            init: false,
            restart: true,
          },
          four_phaseswap: {
            name: '代替队友行动',
            init: false,
            restart: true,
          },
          two_assign: {
            name: '代替队友选将',
            init: false,
            restart: true,
          },
          two_phaseswap: {
            name: '代替队友行动',
            init: false,
            restart: true,
          },
          free_choose: {
            name: '自由选将',
            init: true,
            frequent: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!ui.create.cheat2) return;
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          fouralign: {
            name: '自由选择阵型',
            init: false
          },
          change_identity: {
            name: '自由选择座位',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_identity', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (_status.mode == 'four') {
                if (get.config('four_assign') || get.config('four_phaseswap')) return;
                if (bool) {
                  if (_status.event.parent.addSetting) {
                    _status.event.parent.addSetting();
                  }
                }
                else {
                  var seats = _status.event.parent.seatsbutton;
                  if (seats) {
                    while (seats.length) {
                      seats.shift().remove();
                    }
                    delete _status.event.parent.seatsbutton;
                  }
                }
              }
              else {
                var dialog;
                if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
                else dialog = _status.event.dialog;
                if (!_status.brawl || !_status.brawl.noAddSetting) {
                  if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                  else _status.event.getParent().removeSetting(dialog);
                }
                ui.update();
              }
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            },
            frequent: true,
          },
          double_character_jiange: {
            name: '双将模式',
            init: false,
            frequent: true,
          },
          replace_handcard_two: {
            name: '四号位保护',
            init: true,
            frequent: true,
            intro: '最后行动的角色起始手牌+1'
          },
          replace_character_two: {
            name: '替补模式',
            init: false,
            frequent: true,
            intro: '每个额外选择一名武将，死亡后用该武将代替重新上场，替补武将用完时失败'
          },
          expand_dialog: {
            name: '默认展开选将框',
            intro: '选将框打开时直接显示全部武将（可能使游戏在开始时卡顿）',
            init: false,
          },
          siguo_character: {
            name: '专属武将出场率',
            init: 'increase',
            item: {
              increase: '大概率',
              normal: '默认概率',
              off: '不出现',
            },
            frequent: true
          },
          // ban_weak:{
          //     name:'屏蔽弱将',
          //     init:true,
          //     restart:true,
          // },
          // ban_strong:{
          //     name:'屏蔽强将',
          //     init:false,
          //     restart:true
          // },
          ladder_reset: {
            name: '重置天梯数据',
            onclick: function () {
              var node = this;
              if (node._clearing) {
                game.save('ladder', {
                  current: 900,
                  top: 900,
                  month: (new Date()).getMonth()
                });
                ui.ladder.innerHTML = '卫士五';
                clearTimeout(node._clearing);
                node.firstChild.innerHTML = '重置天梯数据';
                delete node._clearing;
                return;
              }
              node.firstChild.innerHTML = '单击以确认 (3)';
              node._clearing = setTimeout(function () {
                node.firstChild.innerHTML = '单击以确认 (2)';
                node._clearing = setTimeout(function () {
                  node.firstChild.innerHTML = '单击以确认 (1)';
                  node._clearing = setTimeout(function () {
                    node.firstChild.innerHTML = '重置天梯数据';
                    delete node._clearing;
                  }, 1000);
                }, 1000);
              }, 1000);
            },
            clear: true,
          },
        }
      },
      boss: {
        name: '挑战',
        config: {
          free_choose: {
            name: '自由选将',
            init: true,
            frequent: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            },
            frequent: true,
          },
          single_control: {
            name: '单人控制',
            init: true,
            frequent: true,
            onclick: function (bool) {
              game.saveConfig('single_control', bool, this._link.config.mode);
              if (ui.single_swap && game.me != game.boss) {
                if (bool) {
                  ui.single_swap.style.display = 'none';
                }
                else {
                  ui.single_swap.style.display = '';
                }
              }
            },
            intro: '只控制一名角色，其他角色由AI控制'
          },
          // ban_weak:{
          //     name:'屏蔽弱将',
          //     init:true,
          //     restart:true,
          // },
          // ban_strong:{
          //     name:'屏蔽强将',
          //     init:false,
          //     restart:true,
          // },
        }
      },
      doudizhu: {
        name: '斗地主',
        connect: {
          update: function (config, map) {
            if (config.connect_doudizhu_mode == 'online') {
              map.connect_change_card.hide();
            }
            else {
              map.connect_change_card.show();
            }
            if (config.connect_doudizhu_mode != 'normal') {
              map.connect_double_character.hide();
            }
            else {
              map.connect_double_character.show();
            }
          },
          connect_doudizhu_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '休闲',
              kaihei: '开黑',
              huanle: '欢乐',
              binglin: '兵临',
              online: '智斗',
            },
            restart: true,
            frequent: true,
          },
          connect_double_character: {
            name: '双将模式',
            init: false,
            frequent: true,
            restart: true,
          },
          connect_change_card: {
            name: '启用手气卡',
            init: false,
            frequent: true,
            restart: true,
          },
        },
        config: {
          update: function (config, map) {
            if (config.doudizhu_mode == 'online') {
              map.change_card.hide();
            }
            else {
              map.change_card.show();
            }
            if (config.doudizhu_mode != 'normal') {
              map.double_character.hide();
              map.free_choose.hide();
              map.change_identity.hide();
              map.change_choice.hide();
              map.continue_game.hide();
              map.dierestart.hide();
              map.choice_zhu.hide();
              map.choice_fan.hide();
              map.revive.hide();
            }
            else {
              map.double_character.show();
              map.free_choose.show();
              map.change_identity.show();
              map.change_choice.show();
              map.continue_game.show();
              map.dierestart.show();
              map.choice_zhu.show();
              map.choice_fan.show();
              map.revive.show();
            }
            if (config.double_character && config.doudizhu_mode == 'normal') {
              map.double_hp.show();
            }
            else {
              map.double_hp.hide();
            }
          },
          doudizhu_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '休闲',
              kaihei: '开黑',
              huanle: '欢乐',
              binglin: '兵临',
              online: '智斗',
            },
            restart: true,
            frequent: true,
          },
          double_character: {
            name: '双将模式',
            init: false,
            frequent: true,
            restart: true,
          },
          double_hp: {
            name: '双将体力上限',
            init: 'pingjun',
            item: {
              hejiansan: '和减三',
              pingjun: '平均值',
              zuidazhi: '最大值',
              zuixiaozhi: '最小值',
              zonghe: '相加',
            },
            restart: true,
          },
          free_choose: {
            name: '自由选将',
            init: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          change_identity: {
            name: '自由选择身份和座位',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_identity', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              var dialog;
              if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
              else dialog = _status.event.dialog;
              if (!_status.brawl || !_status.brawl.noAddSetting) {
                if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                else _status.event.getParent().removeSetting(dialog);
              }
              ui.update();
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            }
          },
          change_card: {
            name: '开启手气卡',
            init: 'disabled',
            item: {
              disabled: '禁用',
              once: '一次',
              twice: '两次',
              unlimited: '无限',
            },
          },
          continue_game: {
            name: '显示再战',
            init: false,
            onclick: function (bool) {
              game.saveConfig('continue_game', bool, this._link.config.mode);
              if (get.config('continue_game')) {
                if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                  ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                }
              }
              else if (ui.continue_game) {
                ui.continue_game.close();
                delete ui.continue_game;
              }
            },
            intro: '游戏结束后可选择用相同的武将再进行一局游戏'
          },
          dierestart: {
            name: '死亡后显示重来',
            init: true,
            onclick: function (bool) {
              game.saveConfig('dierestart', bool, this._link.config.mode);
              if (get.config('dierestart')) {
                if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                  ui.restart = ui.create.control('restart', game.reload);
                }
              }
              else if (ui.restart) {
                ui.restart.close();
                delete ui.restart;
              }
            }
          },
          revive: {
            name: '死亡后显示复活',
            init: false,
            onclick: function (bool) {
              game.saveConfig('revive', bool, this._link.config.mode);
              if (get.config('revive')) {
                if (!ui.revive && game.me.isDead()) {
                  ui.revive = ui.create.control('revive', ui.click.dierevive);
                }
              }
              else if (ui.revive) {
                ui.revive.close();
                delete ui.revive;
              }
            }
          },
          choice_zhu: {
            name: '地主候选武将数',
            init: '3',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
          choice_fan: {
            name: '农民候选武将数',
            init: '3',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
        }
      },
      longlaoguan: {
        name: '龙牢关',
        connect: {
          update: function (config, map) { },
          connect_change_card: {
            name: '启用手气卡',
            init: false,
            frequent: true,
            restart: true,
          },
        },
        config: {
          update: function (config, map) {
            if (config.double_character) {
              map.double_hp.show();
            }
            else {
              map.double_hp.hide();
            }
          },
          double_character: {
            name: '双将模式',
            init: false,
            frequent: true,
            restart: true,
          },
          double_hp: {
            name: '双将体力上限',
            init: 'pingjun',
            item: {
              hejiansan: '和减三',
              pingjun: '平均值',
              zuidazhi: '最大值',
              zuixiaozhi: '最小值',
              zonghe: '相加',
            },
            restart: true,
          },
          free_choose: {
            name: '自由选将',
            init: true,
            onclick: function (bool) {
              game.saveConfig('free_choose', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
              else if (ui.cheat2 && !get.config('free_choose')) {
                ui.cheat2.close();
                delete ui.cheat2;
              }
            }
          },
          change_identity: {
            name: '自由选择身份和座位',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_identity', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              var dialog;
              if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
              else dialog = _status.event.dialog;
              if (!_status.brawl || !_status.brawl.noAddSetting) {
                if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                else _status.event.getParent().removeSetting(dialog);
              }
              ui.update();
            }
          },
          change_choice: {
            name: '开启换将卡',
            init: true,
            onclick: function (bool) {
              game.saveConfig('change_choice', bool, this._link.config.mode);
              if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
              if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
              else if (ui.cheat && !get.config('change_choice')) {
                ui.cheat.close();
                delete ui.cheat;
              }
            }
          },
          change_card: {
            name: '开启手气卡',
            init: 'disabled',
            item: {
              disabled: '禁用',
              once: '一次',
              twice: '两次',
              unlimited: '无限',
            },
          },
          continue_game: {
            name: '显示再战',
            init: false,
            onclick: function (bool) {
              game.saveConfig('continue_game', bool, this._link.config.mode);
              if (get.config('continue_game')) {
                if (!ui.continue_game && _status.over && !_status.brawl) {
                  ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                }
              }
              else if (ui.continue_game) {
                ui.continue_game.close();
                delete ui.continue_game;
              }
            },
            intro: '游戏结束后可选择用相同的武将再进行一局游戏'
          },
          dierestart: {
            name: '死亡后显示重来',
            init: true,
            onclick: function (bool) {
              game.saveConfig('dierestart', bool, this._link.config.mode);
              if (get.config('dierestart')) {
                if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                  ui.restart = ui.create.control('restart', game.reload);
                }
              }
              else if (ui.restart) {
                ui.restart.close();
                delete ui.restart;
              }
            }
          },
          revive: {
            name: '死亡后显示复活',
            init: false,
            onclick: function (bool) {
              game.saveConfig('revive', bool, this._link.config.mode);
              if (get.config('revive')) {
                if (!ui.revive && game.me.isDead()) {
                  ui.revive = ui.create.control('revive', ui.click.dierevive);
                }
              }
              else if (ui.revive) {
                ui.revive.close();
                delete ui.revive;
              }
            }
          },
          choice_zhu: {
            name: '龙皇候选武将数',
            init: '1',
            restart: true,
            item: {
              '1': '一',
            },
          },
          choice_fan: {
            name: '反抗军候选武将数',
            init: '5',
            restart: true,
            item: {
              '3': '三',
              '4': '四',
              '5': '五',
              '6': '六',
              '8': '八',
              '10': '十',
            },
          },
        }
      },
      strategy: {
        name: '战略',
        connect: {
          connect_single_mode: {
            name: '游戏模式',
            init: 'normal',
            item: {
              normal: '通常',
            },
            restart: true,
            frequent: true,
          },
          update: function (config, map) {
          },
        },
        config: {
          single_mode: {
            name: '游戏模式',
            init: 'dianjiang',
            item: {
              dianjiang: '点将单挑',
              // normal:'新1v1',
              // changban:'血战长坂坡',
            },
            restart: true,
            frequent: true,
          },
          enable_jin: {
            name: '启用晋势力武将',
            init: false,
            restart: true,
            frequent: true,
          },
          update: function (config, map) {
            if (config.single_mode != 'normal') {
              map.enable_jin.hide();
            }
            else {
              map.enable_jin.show();
            }
          },
        }
      },
      brawl: {
        name: '乱斗',
        config: {
          huanhuazhizhan: {
            name: '幻化之战',
            init: true,
            frequent: true
          },
          qunxionggeju: {
            name: '群雄割据',
            init: true,
            frequent: true
          },
          duzhansanguo: {
            name: '毒战三国',
            init: true,
            frequent: true
          },
          daoshiyueying: {
            name: '导师爱璃',
            init: true,
            frequent: true
          },
          weiwoduzun: {
            name: '唯我独尊',
            init: true,
            frequent: true
          },
          tongxingzhizheng: {
            name: '同姓之争',
            init: true,
            frequent: true
          },
          jiazuzhizheng: {
            name: '家族之争',
            init: true,
            frequent: true
          },
          // tongqueduopao:{
          // 	name:'铜雀夺袍',
          // 	init:true,
          // 	frequent:true
          // },
          tongjiangmoshi: {
            name: '同将模式',
            init: true,
            frequent: true
          },
          // baiyidujiang:{
          // 	name:'白衣渡江',
          // 	init:true,
          // 	frequent:true
          // },
          qianlidanji: {
            name: '千里单骑',
            init: true,
            frequent: true
          },
          // liangjunduilei:{
          // 	name:'两军对垒',
          // 	init:true,
          // 	frequent:true
          // },
          scene: {
            name: '创建场景',
            init: true,
            frequent: true
          }
        }
      },
      single: {
        name: '单挑',
        connect: {
          connect_single_mode: {
            name: '游戏模式',
            init: 'dianjiang',
            item: {
              dianjiang: '点将单挑',
              // normal:'新1v1',
              // changban:'血战长坂坡',
            },
            restart: true,
            frequent: true,
          },
          connect_enable_jin: {
            name: '启用晋势力武将',
            init: false,
            restart: true,
            frequent: true,
          },
          update: function (config, map) {
            if (config.connect_single_mode != 'normal') {
              map.connect_enable_jin.hide();
            }
            else {
              map.connect_enable_jin.show();
            }
          },
        },
        config: {
          single_mode: {
            name: '游戏模式',
            init: 'dianjiang',
            item: {
              dianjiang: '点将单挑',
              // normal:'新1v1',
              // changban:'血战长坂坡',
            },
            restart: true,
            frequent: true,
          },
          enable_jin: {
            name: '启用晋势力武将',
            init: false,
            restart: true,
            frequent: true,
          },
          update: function (config, map) {
            if (config.single_mode != 'normal') {
              map.enable_jin.hide();
            }
            else {
              map.enable_jin.show();
            }
          },
        }
      },
      //引导
      yindao: {
        name: '引导',
        config: {
          update: function (config, map) {
          },
        }
      },
    };
    /**
     * 网络部分的消息处理（回调）函数
     * @type {!Object}
     */
    const _message = {
      server: {
        init: function (version, config, banned_info) {
          if (lib.node.banned.contains(banned_info)) {
            this.send('denied', 'banned');
          }
          else if (config.id && lib.playerOL && lib.playerOL[config.id]) {
            var player = lib.playerOL[config.id];
            player.setNickname();
            player.ws = this;
            player.isAuto = false;
            this.id = config.id;
            game.broadcast(function (player) {
              player.setNickname();
            }, player);
            this.send('reinit', lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, null, _status.onreconnect, _status.cardtag);
          }
          else if (version != lib.versionOL) {
            this.send('denied', 'version');
            lib.node.clients.remove(this);
            this.closed = true;
          }
          else if (!_status.waitingForPlayer) {
            if (game.phaseNumber && lib.configOL.observe) {
              lib.node.observing.push(this);
              this.send('reinit', lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, game.players[0].playerid, null, _status.cardtag);
              if (!ui.removeObserve) {
                ui.removeObserve = ui.create.system('移除旁观', function () {
                  lib.configOL.observe = false;
                  if (game.onlineroom) {
                    game.send('server', 'config', lib.configOL);
                  }
                  while (lib.node.observing.length) {
                    lib.node.observing.shift().ws.close();
                  }
                  this.remove();
                  delete ui.removeObserve;
                }, true);
              }
            }
            else {
              this.send('denied', 'gaming');
              lib.node.clients.remove(this);
              this.closed = true;
            }
          }
          else if (lib.node.clients.length - (window.isNonameServer ? 1 : 0) >= parseInt(lib.configOL.number)) {
            this.send('denied', 'number');
            lib.node.clients.remove(this);
            this.closed = true;
          }
          else {
            if (config) {
              this.avatar = config.avatar;
              this.nickname = config.nickname;
            }
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].classList.contains('unselectable2')) continue;
              if (game.connectPlayers[i] != game.me && !game.connectPlayers[i].playerid) {
                game.connectPlayers[i].playerid = this.id;
                game.connectPlayers[i].initOL(this.nickname, this.avatar);
                game.connectPlayers[i].ws = this;
                break;
              }
            }
            this.send('init', this.id, lib.configOL, game.ip, window.isNonameServer, game.roomId);
          }
        },
        inited: function () {
          this.inited = true;
          if (_status.waitingForPlayer) {
            game.updateWaiting();
          }
        },
        reinited: function () {
          this.inited = true;
        },
        result: function (result) {
          if (lib.node.observing.contains(this)) return;
          var player = lib.playerOL[this.id];
          if (player) {
            player.unwait(result);
          }
        },
        startGame: function () {
          if (this.id == game.onlinezhu) {
            game.resume();
          }
        },
        changeRoomConfig: function (config) {
          if (this.id == game.onlinezhu) {
            game.broadcastAll(function (config) {
              for (var i in config) {
                lib.configOL[i] = config[i];
              }
              if (ui.connectStartBar) {
                ui.connectStartBar.firstChild.innerHTML = get.modetrans(lib.configOL, true);
              }
            }, config);
            if (lib.configOL.mode == 'identity' && lib.configOL.identity_mode == 'zhong' && game.connectPlayers) {
              for (var i = 0; i < game.connectPlayers.length; i++) {
                game.connectPlayers[i].classList.remove('unselectable2');
              }
              lib.configOL.number = 8;
              game.updateWaiting();
            }
            if (game.onlineroom) {
              game.send('server', 'config', lib.configOL);
            }
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == this.id) {
                game.connectPlayers[i].chat('房间设置已更改');
              }
            }
          }
        },
        changeNumConfig: function (num, index, bool) {
          if (this.id == game.onlinezhu) {
            lib.configOL.number = num;
            game.send('server', 'config', lib.configOL);
            if (game.connectPlayers && game.connectPlayers[index]) {
              if (bool) {
                game.connectPlayers[index].classList.add('unselectable2');
              }
              else {
                game.connectPlayers[index].classList.remove('unselectable2');
              }
              game.updateWaiting();
            }
          }
        },
        throwEmotion: function (target, emotion) {
          if (lib.node.observing.contains(this)) return;
          var player = lib.playerOL[this.id];
          if (player) {
            player.throwEmotion(target, emotion);
          }
        },
        emotion: function (id, pack, emotion) {
          if (lib.node.observing.contains(this)) return;
          var that = this;
          if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == that.id) {
                return true;
              }
            }
            return false;
          }()))) return;
          var player;
          if (lib.playerOL[id]) {
            player = lib.playerOL[id];
          }
          else if (game.connectPlayers) {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == id) {
                player = game.connectPlayers[i]; break;
              }
            }
          }
          if (player) element.player.emotion.apply(player, [pack, emotion]);
        },
        chat: function (id, str) {
          var that = this;
          if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == that.id) {
                return true;
              }
            }
            return false;
          }()))) return;
          var player;
          if (lib.playerOL[id]) {
            player = lib.playerOL[id];
          }
          else if (game.connectPlayers) {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == id) {
                player = game.connectPlayers[i]; break;
              }
            }
          }
          if (player) element.player.chat.call(player, str);
        },
        giveup: function (player) {
          if (lib.node.observing.contains(this) || !player || !player._giveUp) return;
          _status.event.next.length = 0;
          game.createEvent('giveup', false).setContent(function () {
            game.log(player, '投降');
            player.popup('投降');
            player.die('nosource');
          }).player = player;
        },
        auto: function () {
          if (lib.node.observing.contains(this)) return;
          var player = lib.playerOL[this.id];
          if (player) {
            player.isAuto = true;
            player.setNickname(player.nickname + ' - 托管');
            game.broadcast(function (player) {
              player.setNickname(player.nickname + ' - 托管');
            }, player);
          }
        },
        unauto: function () {
          if (lib.node.observing.contains(this)) return;
          var player = lib.playerOL[this.id];
          if (player) {
            player.isAuto = false;
            player.setNickname(player.nickname);
            game.broadcast(function (player) {
              player.setNickname(player.nickname);
            }, player);
          }
        },
        exec: function (func) {
          // if(typeof func=='function'){
          //     var args=Array.from(arguments);
          //     args.shift();
          //     func.apply(this,args);
          // }
        },
        log: function () {
          var items = [];
          try {
            for (var i = 0; i < arguments.length; i++) {
              eval('items.push(' + arguments[i] + ')');
            }
          }
          catch (e) {
            this.send('log', ['err']);
            return;
          }
          this.send('log', items);
        }
      },
      client: {
        log: function (arr) {
          if (Array.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
              console.log(arr[i]);
            }
          }
        },
        opened: function () {
          game.send('init', lib.versionOL, {
            id: game.onlineID,
            avatar: lib.config.connect_avatar,
            nickname: get.connectNickname()
          }, lib.config.banned_info);
          if (ui.connecting && !ui.connecting.splashtimeout) {
            ui.connecting.firstChild.innerHTML = '重连成功';
          }
        },
        onconnection: function (id) {
          var ws = { wsid: id };
          for (var i in element.nodews) {
            ws[i] = element.nodews[i];
          }
          lib.wsOL[id] = ws;
          init.connection(ws);
        },
        onmessage: function (id, message) {
          if (lib.wsOL[id]) {
            lib.wsOL[id].onmessage(message);
          }
        },
        onclose: function (id) {
          if (lib.wsOL[id]) {
            lib.wsOL[id].onclose();
          }
        },
        selfclose: function () {
          if (game.online || game.onlineroom) {
            if ((game.servermode || game.onlinehall) && _status.over) {
              // later
            }
            else {
              game.saveConfig('tmp_user_roomId');
            }
          }
          game.ws.close();
        },
        reloadroom: function (forced) {
          if (window.isNonameServer && (forced || !_status.protectingroom)) {
            game.reload();
          }
        },
        createroom: function (index, config, mode) {
          game.online = false;
          game.onlineroom = true;
          game.roomId = index;
          lib.node = {};
          if (config && mode && window.isNonameServer) {
            if (mode == 'auto') {
              mode = lib.configOL.mode;
            }
            game.switchMode(mode, config);
          }
          else {
            game.switchMode(lib.configOL.mode);
          }
          ui.create.connecting(true);
        },
        enterroomfailed: function () {
          alert('请稍后再试');
          _status.enteringroom = false;
          ui.create.connecting(true);
        },
        roomlist: function (list, events, clients, wsid) {
          game.send('server', 'key', [game.onlineKey, lib.version]);
          game.online = true;
          game.onlinehall = true;
          lib.config.recentIP.remove(_status.ip);
          lib.config.recentIP.unshift(_status.ip);
          lib.config.recentIP.splice(5);
          if (!lib.config.reconnect_info || lib.config.reconnect_info[0] != _status.ip) {
            game.saveConfig('reconnect_info', [_status.ip, null]);
          }
          game.saveConfig('recentIP', lib.config.recentIP);
          _status.connectMode = true;

          game.clearArena();
          game.clearConnect();
          ui.pause.hide();
          ui.auto.hide();

          clearTimeout(_status.createNodeTimeout);
          game.send('server', 'changeAvatar', get.connectNickname(), lib.config.connect_avatar);

          var proceed = function () {
            game.ip = get.trimip(_status.ip);
            ui.create.connectRooms(list);
            if (events) {
              ui.connectEvents = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv', '约战', ui.window, ui.click.connectEvents);
              ui.connectEventsCount = ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.hidden', '', ui.window);
              ui.connectClients = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left', '在线', ui.window, ui.click.connectClients);
              ui.connectClientsCount = ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.left', '1', ui.window);
              ui.createRoomButton = ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left2', '创建房间', ui.window, function () {
                if (!_status.creatingroom) {
                  _status.creatingroom = true;
                  ui.click.connectMenu();
                }
              });
              if (events.length) {
                ui.connectEventsCount.innerHTML = events.filter(function (evt) {
                  return evt.creator == game.onlineKey || !get.is.banWords(evt.content)
                }).length;
                ui.connectEventsCount.show();
              }
            }
            game.wsid = wsid;
            _message.client.updaterooms(list, clients);
            _message.client.updateevents(events);
            ui.exitroom = ui.create.system('退出房间', function () {
              game.saveConfig('tmp_owner_roomId');
              game.saveConfig('tmp_user_roomId');
              if (ui.rooms) {
                game.saveConfig('reconnect_info');
              }
              else {
                if (lib.config.reconnect_info) {
                  lib.config.reconnect_info.length = 1;
                  game.saveConfig('reconnect_info', lib.config.reconnect_info);
                }
              }
              game.reload();
            }, true);

            var findRoom = function (id) {
              for (var room of ui.rooms) {
                if (room.key == id) return room;
              }
              return false;
            };
            if (typeof lib.config.tmp_owner_roomId == 'string') {
              if (typeof game.roomId != 'string' && !findRoom(lib.config.tmp_owner_roomId)) {
                lib.configOL.mode = lib.config.connect_mode;
                game.roomId = lib.config.tmp_owner_roomId;
              }
              game.saveConfig('tmp_owner_roomId');
            }
            if (typeof lib.config.tmp_user_roomId == 'string') {
              if (typeof game.roomId != 'string') {
                if (findRoom(lib.config.tmp_user_roomId)) {
                  game.roomId = lib.config.tmp_user_roomId;
                }
                else {
                  ui.create.connecting();
                  (function () {
                    var n = 10;
                    var id = lib.config.tmp_user_roomId;
                    var interval = setInterval(function () {
                      if (n > 0) {
                        n--;
                        if (findRoom(id)) {
                          clearInterval(interval);
                          game.send('server', 'enter', id, get.connectNickname(), lib.config.connect_avatar);
                        }
                      }
                      else {
                        ui.create.connecting(true);
                        clearInterval(interval);
                      }
                    }, 500);
                  }());
                }
              }
              game.saveConfig('tmp_user_roomId');
            }

            if (window.isNonameServer) {
              var cfg = 'pagecfg' + window.isNonameServer;
              if (lib.config[cfg]) {
                lib.configOL = lib.config[cfg][0];
                game.send('server', 'server', lib.config[cfg].slice(1));
                game.saveConfig(cfg);
                _status.protectingroom = true;
                setTimeout(function () {
                  _status.protectingroom = false;
                  if (!lib.node || !lib.node.clients || !lib.node.clients.length) {
                    game.reload();
                  }
                }, 15000);
              }
              else {
                game.send('server', 'server');
              }
            }
            else if (typeof game.roomId == 'string') {
              var room = findRoom(game.roomId);
              if (game.roomIdServer && room && (room.serving || !room.version)) {
                console.log();
                if (lib.config.reconnect_info) {
                  lib.config.reconnect_info[2] = null;
                  game.saveConfig('reconnect_info', lib.config.reconnect_info);
                }
              }
              else {
                ui.create.connecting();
                game.send('server', (game.roomId == game.onlineKey) ? 'create' : 'enter', game.roomId, get.connectNickname(), lib.config.connect_avatar);
              }
            }
            init.onfree();
          }
          if (_status.event.parent) {
            game.forceOver('noover', proceed);
          }
          else {
            proceed();
          }
        },
        updaterooms: function (list, clients) {
          if (ui.rooms) {
            var map = {}, map2 = {};
            for (var i of ui.rooms) map2[i.key] = true;
            for (var i of list) {
              if (!i) continue;
              map[i[4]] = i;
            }
            ui.window.classList.add('more_room');
            for (var i = 0; i < ui.rooms.length; i++) {
              if (!map[ui.rooms[i].key]) {
                ui.rooms[i].remove();
                ui.rooms.splice(i--, 1);
              }
              else ui.rooms[i].initRoom(list[i]);
            }
            for (var i of list) {
              if (!i) continue;
              map[i[4]] = i;
              if (!map2[i[4]]) {
                var player = ui.roombase.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>');
                player.roomindex = i;
                player.initRoom = element.player.initRoom;
                player.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.connectroom);
                player.initRoom(i);
                ui.rooms.push(player);
              }
            }
          }
          _message.client.updateclients(clients, true);
        },
        updateclients: function (clients, bool) {
          if (clients && ui.connectClients) {
            ui.connectClients.info = clients;
            ui.connectClientsCount.innerHTML = clients.length;
          }
          if (_status.connectClientsCallback) {
            _status.connectClientsCallback();
          }
        },
        updateevents: function (events) {
          if (events && ui.connectEvents) {
            ui.connectEvents.info = events;
            var num = events.filter(function (evt) {
              return typeof evt.creator == 'string' && (evt.creator == game.onlineKey || !get.is.banWords(evt.content))
            }).length;
            if (num) {
              ui.connectEventsCount.innerHTML = num;
              ui.connectEventsCount.show();
            }
            else {
              ui.connectEventsCount.hide();
            }
            if (_status.connectEventsCallback) {
              _status.connectEventsCallback();
            }
          }
        },
        eventsdenied: function (reason) {
          var str = '创建约战失败';
          if (reason == 'total') {
            str += '，约战总数不能超过20';
          }
          else if (reason == 'time') {
            str += '，时间已过';
          }
          else if (reason == 'ban') {
            str += '，请注意文明发言';
          }
          alert(str);
        },
        init: function (id, config, ip, servermode, roomId) {
          game.online = true;
          game.onlineID = id;
          game.ip = ip;
          game.servermode = servermode;
          game.roomId = roomId;
          if (game.servermode) {
            game.saveConfig('reconnect_info', [_status.ip, id, game.roomId]);
          }
          else {
            game.saveConfig('reconnect_info', [_status.ip, id]);
            game.saveConfig('tmp_user_roomId', roomId);
          }
          lib.config.recentIP.remove(_status.ip);
          lib.config.recentIP.unshift(_status.ip);
          lib.config.recentIP.splice(5);
          game.saveConfig('recentIP', lib.config.recentIP);
          _status.connectMode = true;
          lib.configOL = config;
          lib.playerOL = {};
          lib.cardOL = {};

          game.clearArena();
          game.finishCards();
          ui.create.roomInfo();
          ui.create.chat();
          if (game.servermode) {
            ui.create.connectPlayers(get.modetrans(config, true));
          }
          else {
            ui.create.connectPlayers(ip);
          }
          ui.pause.hide();
          ui.auto.hide();
          game.clearConnect();
          clearTimeout(_status.createNodeTimeout);

          var proceed = function () {
            game.loadModeAsync(config.mode, function (mode) {
              for (var i in mode.ai) {
                if (typeof mode.ai[i] == 'object') {
                  if (ai[i] == undefined) ai[i] = {};
                  for (var j in mode.ai[i]) {
                    ai[i][j] = mode.ai[i][j];
                  }
                }
                else {
                  ai[i] = mode.ai[i];
                }
              }
              for (var i in mode.get) {
                if (typeof mode.get[i] == 'object') {
                  if (get[i] == undefined) get[i] = {};
                  for (var j in mode.get[i]) {
                    get[i][j] = mode.get[i][j];
                  }
                }
                else {
                  get[i] = mode.get[i];
                }
              }
              for (var i in mode.translate) {
                lib.translate[i] = mode.translate[i];
              }
              if (mode.game) {
                game.getIdentityList = mode.game.getIdentityList;
                game.updateState = mode.game.updateState;
                game.getRoomInfo = mode.game.getRoomInfo;
              }
              if (mode.element && mode.element.player) {
                for (var i in mode.element.player) {
                  element.player[i] = mode.element.player[i];
                }
              }
              if (mode.skill) {
                for (var i in mode.skill) {
                  lib.skill[i] = mode.skill[i];
                }
              }
              if (mode.card) {
                for (var i in mode.card) {
                  lib.card[i] = mode.card[i];
                }
              }
              game.finishCards();
              if (mode.characterPack) {
                for (var i in mode.characterPack) {
                  lib.characterPack[i] = mode.characterPack[i];
                }
              }
              _status.event = {
                finished: true,
                next: [],
                after: []
              };
              _status.paused = false;
              game.createEvent('game', false).setContent(init.startOnline);
              game.loop();
              game.send('inited');
              ui.create.connecting(true);
            });
          }
          if (_status.event.parent) {
            game.forceOver('noover', proceed);
          }
          else {
            proceed();
          }
          for (var i in lib.characterPack) {
            for (var j in lib.characterPack[i]) {
              lib.character[j] = lib.character[j] || lib.characterPack[i][j];
            }
          }
        },
        reinit: function (config, state, state2, ip, observe, onreconnect, cardtag) {
          ui.auto.show();
          ui.pause.show();
          game.clearConnect();
          clearTimeout(_status.createNodeTimeout);
          game.online = true;
          game.ip = ip;
          game.servermode = state.servermode;
          game.roomId = state.roomId;
          if (state.over) {
            _status.over = true;
          }
          if (observe) {
            game.observe = true;
            game.onlineID = null;
            game.roomId = null;
          }
          if (game.servermode && !observe) {
            game.saveConfig('reconnect_info', [_status.ip, game.onlineID, game.roomId]);
          }
          else {
            game.saveConfig('reconnect_info', [_status.ip, game.onlineID]);
            if (!observe) {
              game.saveConfig('tmp_user_roomId', game.roomId);
            }
          }
          _status.connectMode = true;
          lib.configOL = config;
          lib.playerOL = {};
          lib.cardOL = {};

          game.loadModeAsync(config.mode, function (mode) {
            for (var i in mode.ai) {
              if (typeof mode.ai[i] == 'object') {
                if (ai[i] == undefined) ai[i] = {};
                for (var j in mode.ai[i]) {
                  ai[i][j] = mode.ai[i][j];
                }
              }
              else {
                ai[i] = mode.ai[i];
              }
            }
            for (var i in mode.get) {
              if (typeof mode.get[i] == 'object') {
                if (get[i] == undefined) get[i] = {};
                for (var j in mode.get[i]) {
                  get[i][j] = mode.get[i][j];
                }
              }
              else {
                get[i] = mode.get[i];
              }
            }
            for (var i in mode.translate) {
              lib.translate[i] = mode.translate[i];
            }
            if (mode.game) {
              game.getIdentityList = mode.game.getIdentityList;
              game.updateState = mode.game.updateState;
            }
            if (mode.element && mode.element.player) {
              for (var i in mode.element.player) {
                element.player[i] = mode.element.player[i];
              }
            }
            if (mode.skill) {
              for (var i in mode.skill) {
                lib.skill[i] = mode.skill[i];
              }
            }
            game.finishCards();
            if (mode.characterPack) {
              for (var i in mode.characterPack) {
                lib.characterPack[i] = mode.characterPack[i];
              }
            }
            if (mode.onreinit) {
              mode.onreinit();
            }
            _status.cardtag = get.parsedResult(cardtag);
            state = get.parsedResult(state);
            game.players = [];
            game.dead = [];
            for (var i in lib.characterPack) {
              for (var j in lib.characterPack[i]) {
                lib.character[j] = lib.character[j] || lib.characterPack[i][j];
              }
            }
            game.clearArena();
            game.finishCards();
            if (!observe) {
              ui.create.chat();
              if (ui.exitroom) {
                ui.exitroom.remove();
                delete ui.exitroom;
              }
            }
            else {
              if (!ui.exitroom) {
                ui.create.system('退出旁观', function () {
                  game.saveConfig('reconnect_info');
                  game.reload();
                }, true);
              }
              if (!lib.configOL.observe_handcard) {
                ui.arena.classList.add('observe');
              }
            }
            ui.arena.setNumber(state.number);
            _status.mode = state.mode;
            lib.inpile = state.inpile;
            var pos = state.players[observe || game.onlineID].position;
            for (var i in state.players) {
              var info = state.players[i];
              var player = ui.create.player(ui.arena).animate('start');
              player.dataset.position = (info.position < pos) ? info.position - pos + parseInt(state.number) : info.position - pos;
              if (i == observe || i == game.onlineID) {
                game.me = player;
              }
              if (player.setModeState) {
                player.setModeState(info);
              }
              else {
                player.init(info.name1, info.name2);
              }
              if (!info.unseen) player.classList.remove('unseen');
              if (!info.unseen2) player.classList.remove('unseen2');
              if (!player.isUnseen(2) && player.$.nohp) {
                delete player.$.nohp;
                player.node.hp.show();
              }
              player.playerid = i;
              player.nickname = info.nickname;
              player.changeGroup(info.group, false, false);
              player.identity = info.identity;
              player.identityShown = info.identityShown;
              player.hp = info.hp;
              player.maxHp = info.maxHp;
              player.hujia = info.hujia;
              player.sex = info.sex;
              player.side = info.side;
              player.phaseNumber = info.phaseNumber,
                player.setNickname();
              if (info.dead) {
                player.classList.add('dead');
                if (lib.config.die_move) {
                  player.$dieflip();
                }
                if (element.player.$dieAfter) {
                  element.player.$dieAfter.call(player);
                }
                game.dead.push(player);
              }
              else {
                game.players.push(player);
              }
              if (info.linked) {
                player.addLink();
              }
              if (info.turnedover) {
                player.classList.add('turnedover');
              }
              if (info.disableJudge) {
                player.$disableJudge();
              }
              if (Array.isArray(info.disableEquip)) {
                for (var ii = 0; ii < info.disableEquip.length; ii++) {
                  player.$disableEquip(info.disableEquip[ii]);
                }
              }

              player.directgain(info.handcards);
              lib.playerOL[i] = player;
              for (var i = 0; i < info.equips.length; i++) {
                player.$equip(info.equips[i]);
              }
              for (var i = 0; i < info.handcards.length; i++) {
                info.handcards[i].addGaintag(info.gaintag[i]);
              }
              for (var i = 0; i < info.specials.length; i++) {
                info.specials[i].classList.add('glows');
              }
              if (info.expansions.length) {
                var expansion_gaintag = [];
                player.$addToExpansion(info.expansions);
                for (var i = 0; i < info.expansions.length; i++) {
                  info.expansions[i].addGaintag(info.expansion_gaintag[i]);
                  expansion_gaintag.addArray(info.expansion_gaintag[i]);
                }
                for (var i of expansion_gaintag) player.markSkill[i];
              }
              for (var i = 0; i < info.judges.length; i++) {
                if (info.views[i] && info.views[i] != info.judges[i]) {
                  info.judges[i].classList.add('fakejudge');
                  info.judges[i].viewAs = info.views[i];
                  info.judges[i].node.background.innerHTML = lib.translate[info.views[i] + '_bg'] || get.translation(info.views[i])[0]
                }
                player.node.judges.appendChild(info.judges[i]);
              }
              ui.updatej(player);
              if (!player.setModeState) {
                if (!game.getIdentityList && info.identityNode) {
                  player.node.identity.innerHTML = info.identityNode[0];
                  player.node.identity.dataset.color = info.identityNode[1];
                }
                else if (player == game.me || player.identityShown || observe) {
                  player.setIdentity();
                  player.forceShown = true;
                }
                else {
                  player.setIdentity('cai');
                }
                if (!lib.configOL.observe_handcard && (lib.configOL.mode == 'identity' || lib.configOL.mode == 'guozhan')) {
                  if (observe && !player.identityShown) {
                    player.setIdentity('cai');
                    player.forceShown = false;
                  }
                }
              }
              player.update();
            }
            game.arrangePlayers();
            ui.create.me(true);

            _status.event = {
              finished: true,
              next: [],
              after: []
            };
            _status.paused = false;
            _status.dying = get.parsedResult(state.dying) || [];

            if (game.updateState) {
              game.updateState(state2);
            }
            var next = game.createEvent('game', false);
            next.setContent(init.startOnline);
            if (observe) {
              next.custom.replace.target = function (player) {
                if (!lib.configOL.observe_handcard && lib.configOL.mode == 'guozhan') {
                  return;
                }
                if (player.isAlive()) {
                  if (!game.me.identityShown && lib.configOL.mode == 'guozhan') {
                    game.me.node.identity.firstChild.innerHTML = '猜';
                    game.me.node.identity.dataset.color = 'unknown';
                  }
                  game.swapPlayer(player);
                  if (!game.me.identityShown && lib.configOL.mode == 'guozhan') {
                    game.me.node.identity.firstChild.innerHTML = '';
                  }
                }
              }
            }
            else {
              if (Array.isArray(onreconnect)) {
                onreconnect.shift().apply(this, onreconnect);
              }
            }
            game.loop();
            game.send('reinited');
            game.showHistory();
            _status.gameStarted = true;
            if (lib.config.show_cardpile) {
              ui.cardPileButton.style.display = '';
            }
            if (!observe && game.me && (game.me.isDead() || _status.over)) {
              ui.create.exit();
            }
            ui.updatehl();
            ui.create.connecting(true);
          });
        },
        exec: function (func) {
          var key = game.onlineKey;
          if (typeof func == 'function') {
            var args = Array.from(arguments);
            args.shift();
            func.apply(this, args);
          }
          if (key) {
            game.onlineKey = key;
            localStorage.setItem(lib.configprefix + 'key', game.onlineKey);
          }
        },
        denied: function (reason) {
          switch (reason) {
            case 'version':
              alert('加入失败：版本不匹配，请将游戏更新至最新版');
              game.saveConfig('tmp_owner_roomId');
              game.saveConfig('tmp_user_roomId');
              game.saveConfig('reconnect_info');
              break;
            case 'gaming': alert('加入失败：游戏已开始'); break;
            case 'number': alert('加入失败：房间已满'); break;
            case 'banned': alert('加入失败：房间拒绝你加入'); break;
            case 'key':
              alert('您的游戏版本过低，请升级到最新版');
              game.saveConfig('tmp_owner_roomId');
              game.saveConfig('tmp_user_roomId');
              game.saveConfig('reconnect_info');
              break;
            case 'offline':
              if (_status.paused && _status.event.name == 'game') {
                setTimeout(game.resume, 500);
              }
              break;
          }
          game.ws.close();
          if (_status.connectDenied) {
            _status.connectDenied();
          }
        },
        cancel: function (id) {
          if (_status.event.id == id && _status.event.isMine() && _status.paused && _status.imchoosing) {
            ui.click.cancel();
            if (ui.confirm) {
              ui.confirm.close();
            }
            if (_status.event.result) {
              _status.event.result.id = id;
            }
          }
        },
        closeDialog: function (id) {
          var dialog = get.idDialog(id);
          if (dialog) {
            dialog.close();
          }
        },
        createDialog: function (id) {
          var args = Array.from(arguments);
          args.shift();
          ui.create.dialog.apply(this, args).videoId = id;
        },
        gameStart: function () {
          for (var i = 0; i < game.connectPlayers.length; i++) {
            game.connectPlayers[i].delete();
          }
          delete game.connectPlayers;
          if (ui.connectStartButton) {
            ui.connectStartButton.delete();
            delete ui.connectStartButton;
          }
          if (ui.connectStartBar) {
            ui.connectStartBar.delete();
            delete ui.connectStartBar;
          }
          if (ui.roomInfo) {
            ui.roomInfo.remove();
            delete ui.roomInfo;
          }
          if (ui.exitroom) {
            ui.exitroom.remove();
            delete ui.exitroom;
          }
          ui.auto.show();
          ui.pause.show();
          if (lib.config.show_cardpile) {
            ui.cardPileButton.style.display = '';
          }
          _status.gameStarted = true;
          game.showHistory();
        },
        updateWaiting: function (map) {
          if (!game.connectPlayers) return;
          if (!lib.translate.zhu) {
            lib.translate.zhu = '主';
          }
          game.onlinezhu = false;
          _status.waitingForPlayer = true;
          for (var i = 0; i < map.length; i++) {
            if (map[i] == 'disabled') {
              game.connectPlayers[i].classList.add('unselectable2');
            }
            else {
              game.connectPlayers[i].classList.remove('unselectable2');
              if (map[i]) {
                game.connectPlayers[i].initOL(map[i][0], map[i][1]);
                game.connectPlayers[i].playerid = map[i][2];
                if (map[i][3] == 'zhu') {
                  game.connectPlayers[i].setIdentity('zhu');
                  if (map[i][2] == game.onlineID) {
                    game.onlinezhu = true;
                    if (ui.roomInfo) {
                      ui.roomInfo.innerHTML = '房间设置';
                    }
                    if (ui.connectStartButton) {
                      ui.connectStartButton.innerHTML = '开始游戏';
                    }
                  }
                }
                else {
                  game.connectPlayers[i].node.identity.firstChild.innerHTML = '';
                }
              }
              else {
                game.connectPlayers[i].uninitOL();
                delete game.connectPlayers[i].playerid;
              }
            }
          }
        }
      }
    };
    /**
     * 初始化
     * @namespace
     */
    const init = require('./lib_init')(element, _mode, _message)
    return {
      figure: '<span style="font-family: LuoLiTi2;color: #dbb">',
      figurer: (text) => ` ${lib.figure}${text}</span> `,
      spanClass: (str, classes) => {
        return `<span class="${classes}">${str}</span>`
      },
      discoloration1: "<samp id='渐变'><font face='yuanli'><style>#渐变{animation:change 0.8s linear 0s infinite;}@keyframes change{0% {color:#FF0000;}20%{color:#F0A00F;}50% {color:#F000FF;}80%{color: #F0A00F;}100%{color:#FF0000;}}</style>",

      changeLog: [],
      updates: [],
      canvasUpdates: [],
      video: [],
      skilllist: [],
      connectBanned: [],
      characterIntro: {},
      characterTitle: {},
      characterPack: {},
      characterFilter: {},
      characterSort: {},
      characterReplace: {},
      dynamicTranslate: {},
      cardPack: {},
      skin: {},
      onresize: [],
      onphase: [],
      onwash: [],
      onover: [],
      ondb: [],
      ondb2: [],
      chatHistory: [],
      animate: {
        skill: {},
        card: {},
      },
      arenaReady: [],
      onfree: [],
      inpile: [],
      extensions: [],
      extensionPack: {},
      cardType: {},
      hook: { globaltrigger: {}, globalskill: {} },
      hookmap: {},
      imported: {},
      layoutfixed: ['chess', 'tafang', 'stone'],//特殊样式模式
      /**
       * 角色选择弹窗中的特殊选项
       * ['收藏', '最近']
       * @name lib.characterDialogGroup
       * @see {@link ui.create.characterDialog}
       */
      characterDialogGroup: {
        '收藏': function (name, capt) {
          return lib.config.favouriteCharacter.contains(name) ? capt : null;
        },
        '最近': function (name, capt) {
          var list = get.config('recentCharacter') || [];
          return list.contains(name) ? capt : null;
        }
      },
      /**
       * 监听节点动画结束
       * @param {HTMLDivELement} node 节点
       */
      listenEnd: function (node) {
        if (!node._listeningEnd) {
          node._listeningEnd = true;
          node.listenTransition(function () {
            delete node._listeningEnd;
            if (node._onEndMoveDelete) {
              node.moveDelete(node._onEndMoveDelete);
            }
            else if (node._onEndDelete) {
              node.delete();
            }
            node._transitionEnded = true;
          });
        }
      },
      /**
       * lib状态，储存如delayed、videoId等动态数据
       * @type {!Object}
       */
      status: {
        running: false,
        canvas: false,
        time: 0,
        reload: 0,
        delayed: 0,
        frameId: 0,
        videoId: 0,
        globalId: 0,
      },
      /**
       * 帮助菜单
       * @type {!Object}
       */
      help: {
        'FAQ': '<ul><li>Q：关于家长麦技能中的“除外”，有详细的说明吗？<li>A：你不执行奖惩，不能发动技能或使用牌，不能指定目标或被选择为目标（令角色解除除外状态除外）；计算有关全场角色的数据时，不计算你的存在：当你于回合内被除外时，结束你的回合（若当前有卡牌正在结算，则结算后再结束你的回合）。<br>' +
          '<li>Q：若角色有出牌阶段限制次数的技能，则其会因额外的出牌阶段多次发动此技能吗？<li>A：是的，但是一般情况仅限于主动释放的技能（比如下地的『引流』和MEA的『掠财』）。若不做特殊说明，额外出牌阶段结束时，角色回合内的技能使用次数均会清空，而卡牌使用次数不变。<br>' +
          '<li>Q：夜雾和lulu的技能改变出牌效果时，影响牌的使用次数吗？<li>A：不影响，牌的使用次数始终在牌使用或打出时计入。特别的，lulu的技能可以改变牌名，有可能影响牌的后续结算；而夜雾的技能不改变牌名，（虽然效果已经变化）与原牌名关联的效果不会受影响（如【初始服】之于【杀】【万箭】【南蛮】）<br>',

        '游戏操作': '<ul><li>长按/鼠标悬停/右键单击显示信息<li>触屏模式中，双指点击切换暂停；下划显示菜单，上划切换托管<li>键盘快捷键<br>' +
          '<table><tr><td>A<td>切换托管<tr><td>W<td>切换不询问无懈<tr><td>空格<td>暂停</table><li>编辑牌堆<br>在卡牌包中修改牌堆后，将自动创建一个临时牌堆，在所有模式中共用，当保存当前牌堆后，临时牌堆被清除。每个模式可设置不同的已保存牌堆，设置的牌堆优先级大于临时牌堆</ul>',
        // '游戏命令':'<div style="margin:10px">变量名</div><ul style="margin-top:0"><li>场上角色<br>game.players<li>阵亡角色<br>game.dead'+
        // '<li>玩家<br>game.me<li>玩家的上/下家<br>game.me.previous/next'+
        // '<li>玩家的上/下家（含阵亡）<br>game.me.previousSeat/<br>nextSeat'+
        // '<li>牌堆<br>ui.cardPile<li>弃牌堆<br>ui.discardPile</ul>'+
        // '<div style="margin:10px">角色属性</div><ul style="margin-top:0"><li>体力值<br>player.hp'+
        // '<li>体力上限<br>player.maxHp<li>身份<br>player.identity<li>手牌<br>player.getCards("h")<li>装备牌<br>player.getCards("e")<li>判定牌<br>player.getCards("j")'+
        // '<li>是否存活/横置/翻面<br>player.isAlive()/<br>isLinked()/<br>isTurnedOver()</ul>'+
        // '<div style="margin:10px">角色操作</div><ul style="margin-top:0"><li>受到伤害<br>player.damage(source,<br>num)'+
        // '<li>回复体力<br>player.recover(num)<li>摸牌<br>player.draw(num)<li>获得牌<br>player.gain(cards)<li>弃牌<br>player.discard(cards)'+
        // '<li>使用卡牌<br>player.useCard(card,<br>targets)<li>死亡<br>player.die()<li>复活<br>player.revive(hp)</ul>'+
        // '<div style="margin:10px">游戏操作</div><ul style="margin-top:0"><li>在命令框中输出结果<br>game.print(str)<li>清除命令框中的内容<br>cls<li>上一条/下一条输入的内容<br>up/down<li>游戏结束<br>game.over(bool)'+
        // '<li>角色资料<br>lib.character<li>卡牌资料<br>lib.card</ul>',
        '游戏名词': '<ul><li>智囊：无名杀默认为过河拆桥/无懈可击/无中生有/洞烛先机。牌堆中没有的智囊牌会被过滤。可在卡牌设置中自行增减。若没有可用的智囊，则改为随机选取的三种锦囊牌的牌名。' +
          '<li>仁库：部分武将使用的游戏外共通区域。至多包含六张牌。当有新牌注入后，若牌数超过上限，则将最早进入仁库的溢出牌置入弃牌堆。' +
          '<li>护甲：和体力类似，每点护甲可抵挡一点伤害，但不影响手牌上限。' +
          '<li>随从：通过技能获得，拥有独立的技能、手牌区和装备区（共享判定区），出场时替代主武将的位置；随从死亡时自动切换回主武将。' +
          '<li>发现：从三张随机亮出的牌中选择一张，若无特殊说明，则获得此牌。' +
          '<li>蓄力技：发动时可以增大黄色的数字。若如此做，红色数字于技能的结算过程中改为原来的两倍。'
      },
      /**
       * 设置(触屏: 长按[, 点击])|(鼠标: 悬浮, 右击[, 点击])弹窗
       * @name lib.setIntro
       * @param {!HTMLDivElement} node 要弹窗的节点
       * @param {?function} func 用于自定义弹窗的回调函数
       * @param {?boolean} left 如果为true，点击事件也能触发弹窗
       * @see {@link get.nodeintro}
       */
      setIntro: function (node, func, left) {
        if (lib.config.touchscreen) {
          if (left) {
            node.listen(ui.click.touchintro);
          }
          else {
            lib.setLongPress(node, ui.click.intro);
          }
        }
        else {
          if (left) {
            node.listen(ui.click.intro);
          }
          if (lib.config.hover_all) {
            lib.setHover(node, ui.click.hoverplayer);
          }
          if (lib.config.right_info) {
            node.oncontextmenu = ui.click.rightplayer;
          }
        }
        // if(!left){
        //     lib.setPressure(node,ui.click.rightpressure);
        // }
        if (func) {
          node._customintro = func;
        }
      },
      // setPressure:function(node,func){
      //     if(window.Pressure){
      //         window.Pressure.set(node,{change: func}, {polyfill: false});
      //     }
      // },
      setPopped: function (node, func, width, height, forceclick, paused2) {
        node._poppedfunc = func;
        node._poppedwidth = width;
        node._poppedheight = height;
        if (forceclick) {
          node.forceclick = true;
        }
        if (lib.config.touchscreen || forceclick) {
          node.listen(ui.click.hoverpopped);
        }
        else {
          node.addEventListener('mouseenter', ui.click.hoverpopped);
          // node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
        }
        if (paused2) {
          node._paused2 = true;
        }
      },
      placePoppedDialog: function (dialog, e) {
        if (dialog._place_text) {
          if (dialog._place_text.firstChild.offsetWidth >= 190 ||
            dialog._place_text.firstChild.offsetHeight >= 30) {
            dialog._place_text.style.textAlign = 'left';
            dialog._place_text.style.marginLeft = '14px';
          }
        }
        if (e.touches && e.touches[0]) {
          e = e.touches[0];
        }
        var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
        if (dialog._mod_height) {
          height += dialog._mod_height;
        }
        dialog.style.height = height + 'px';
        if (e.clientX / game.documentZoom < ui.window.offsetWidth / 2) {
          dialog.style.left = (e.clientX / game.documentZoom + 10) + 'px';
        }
        else {
          dialog.style.left = (e.clientX / game.documentZoom - dialog.offsetWidth - 10) + 'px';
        }
        var idealtop = (e.clientY || 0) / game.documentZoom - dialog.offsetHeight / 2;
        if (typeof idealtop != 'number' || isNaN(idealtop) || idealtop <= 5) {
          idealtop = 5;
        }
        else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
          idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
        }
        dialog.style.top = idealtop + 'px';
      },
      /**
       * @callback lib.setHover~callback
       * @param {MouseEvent} e MouseEvent on mouse move
       * @returns {*}TODO
       */
      /**
       * 设置悬浮
       * 监听悬停事件
       * @function
       * @param {!HTMLElement} node
       * @param {?lib.setHover~callback} func 回调函数
       * @param {?number} hoveration 悬停的时间，如果为null，使用默认悬停事件 {@link GameConfig}
       * @param {?number} width 弹窗宽度，为null时不设置
       * @returns {!HTMLElement}
       */
      setHover: function (node, func, hoveration, width) {
        node._hoverfunc = func;
        if (typeof hoveration == 'number') {
          node._hoveration = hoveration;
        }
        if (typeof width == 'number') {
          node._hoverwidth = width
        }
        node.addEventListener('mouseenter', ui.click.mouseenter);
        node.addEventListener('mouseleave', ui.click.mouseleave);
        node.addEventListener('mousedown', ui.click.mousedown);
        node.addEventListener('mousemove', ui.click.mousemove);
        return node;
      },
      /**
       * 设置滚轮
       * 为节点监听滚动事件
       * @function
       * @param {!HTMLElement} node 要监听滚动事件的节点
       * @returns {!HTMLElement}
       */
      setScroll: function (node) {
        node.ontouchstart = ui.click.touchStart;
        node.ontouchmove = ui.click.touchScroll;
        node.style.WebkitOverflowScrolling = 'touch';
        return node;
      },
      /**
       * 设置鼠标滚轮（用于切换皮肤菜单）
       * 为节点监听鼠标滚轮事件
       * @function
       * @param {!HTMLElement} node 要监听鼠标滚轮事件的节点
       * @returns {!HTMLElement}
       */
      setMousewheel: function (node) {
        if (lib.config.mousewheel) node.onmousewheel = ui.click.mousewheel;
      },
      /**
       * 设置长按
       * 监听长按事件
       * @param {!HTMLElement} node 要监听长按事件的节点
       * @param {?function} func 回调事件
       * @returns {!HTMLElement}
       */
      setLongPress: function (node, func) {
        node.addEventListener('touchstart', ui.click.longpressdown);
        node.addEventListener('touchend', ui.click.longpresscancel);
        node._longpresscallback = func;
        return node;
      },
      /**
       * 更新`ui.canvas`
       * @param {!number} time 当前时间
       * @returns {(undefined|false)} 如果没有需要更新的`<canvas>`返回false
       */
      updateCanvas: function (time) {
        if (lib.canvasUpdates.length === 0) {
          lib.status.canvas = false;
          return false;
        }
        ui.canvas.width = ui.arena.offsetWidth;
        ui.canvas.height = ui.arena.offsetHeight;
        var ctx = ui.ctx;
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.strokeStyle = 'white';
        // ctx.lineCap='round';
        ctx.lineWidth = 3;
        ctx.save();
        for (var i = 0; i < lib.canvasUpdates.length; i++) {
          ctx.restore();
          ctx.save();
          var update = lib.canvasUpdates[i];
          if (!update.starttime) {
            update.starttime = time;
          }
          if (update(time - update.starttime, ctx) === false) {
            lib.canvasUpdates.splice(i--, 1);
          }
        }
      },
      /**
       * 一个启动函数，其中循环更新`lib.updates`直至没有需要更新的函数
       * @param {!number} time 当前时间
       */
      run: function (time) {
        lib.status.time = time;
        for (var i = 0; i < lib.updates.length; i++) {
          if (!lib.updates[i].hasOwnProperty('_time')) {
            lib.updates[i]._time = time;
          }
          if (lib.updates[i](time - lib.updates[i]._time - lib.status.delayed) === false) {
            lib.updates.splice(i--, 1);
          }
        }
        if (lib.updates.length) {
          lib.status.frameId = requestAnimationFrame(lib.run);
        }
        else {
          lib.status.time = 0;
          lib.status.delayed = 0;
        }
      },
      /**
       * 将date转化为对应的datetime并返回转化后的datetime
       * [recommend] 移到{@link get}中
       * @function
       * @param {Date} date
       * @returns {number} datetime
       * @see {@link get.utc}
       */
      getUTC: function (date) {
        return date.getTime();
      },
      /**
       * 保存录像
       */
      saveVideo: function () {
        if (_status.videoToSave) {
          game.export(init.encode(JSON.stringify(_status.videoToSave)),
            '无名杀 - 录像 - ' + _status.videoToSave.name[0] + ' - ' + _status.videoToSave.name[1]);
        }
      },
      /**
       * 测试用作弊方法
       * @name cheat
       */
      cheat: {
        i: function () {
          window.cheat = lib.cheat;
          window.game = game;
          window.ui = ui;
          window.get = get;
          window.ai = ai;
          window.lib = lib;
          window._status = _status;
        },
        dy: function () {
          var next = game.me.next;
          for (var i = 0; i < 10; i++) {
            if (next.identity != 'zhu') {
              break;
            }
            next = next.next;
          }
          next.die();
        },
        x: function () {
          var gl = function (dir, callback) {
            var files = [], folders = [];
            dir = '/Users/widget/Documents/extension/' + dir;
            lib.node.fs.readdir(dir, function (err, filelist) {
              for (var i = 0; i < filelist.length; i++) {
                if (filelist[i][0] != '.' && filelist[i][0] != '_') {
                  if (lib.node.fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
                    folders.push(filelist[i]);
                  }
                  else {
                    files.push(filelist[i]);
                  }
                }
              }
              callback(folders, files);
            });
          }
          var args = Array.from(arguments);
          for (var i = 0; i < args.length; i++) {
            args[i] = args[i][0];
          }
          gl('', function (list) {
            if (args.length) {
              for (var i = 0; i < list.length; i++) {
                if (!args.contains(list[i][0])) {
                  list.splice(i--, 1);
                }
              }
            }
            if (list.length) {
              for (var i = 0; i < list.length; i++) {
                (function (str) {
                  gl(str, function (folders, files) {
                    if (files.length > 1) {
                      for (var i = 0; i < files.length; i++) {
                        if (files[i].indexOf('extension.js') != -1) {
                          files.splice(i--, 1);
                        }
                        else {
                          if (i % 5 == 0) {
                            str += '\n\t\t\t';
                          }
                          str += '"' + files[i] + '",';
                        }
                      }
                      console.log(str.slice(0, str.length - 1));
                    }
                  });
                }(list[i]));
              }
            }
          });
        },
        cfg: function () {
          var mode = lib.config.all.mode.slice(0);
          mode.remove('connect');
          mode.remove('brawl');
          var banned = ['shen_guanyu', 'shen_caocao', 'caopi', 're_daqiao', 'caorui',
            'daqiao', 'lingcao', 'liuzan', 'lusu', 'luxun', 'yanwen', 'zhouyu', 'ns_wangyue', 'gw_yenaifa',
            'old_caozhen', 'swd_jiangziya', 'xuhuang', 'maliang', 'guojia', 'simayi', 'swd_kangnalishi', 'hs_siwangzhiyi', 'hs_nozdormu', 'old_zhuzhi'];
          var bannedcards = ['zengbin'];
          var favs = ["hs_tuoqi", "hs_siwangxianzhi", "hs_xukongzhiying", "hs_hsjiasha", "gjqt_xieyi", "gjqt_yunwuyue", "gjqt_beiluo",
            "gjqt_cenying", "shen_lvmeng", "shen_zhaoyun", "shen_zhugeliang", "ow_ana", "chenlin", "ns_guanlu", "hs_guldan", "swd_guyue",
            "pal_jiangyunfan", "mtg_jiesi", "swd_lanyin", "pal_liumengli", "swd_muyun", "pal_nangonghuang", "swd_muyue", "pal_murongziying",
            "swd_qiner", "pal_shenqishuang", "hs_taisi", "wangji", "pal_xingxuan", "xunyou", "hs_yelise", "pal_yuejinzhao", "pal_yueqi",
            "gjqt_yuewuyi", "swd_yuxiaoxue", "ow_zhaliya", "zhangchunhua", "hs_zhihuanhua", "swd_zhiyin", "old_zhonghui", "gjqt_bailitusu",
            "hs_barnes", "ow_dva", "swd_hengai", "pal_jushifang", "hs_kazhakusi", "hs_lafamu", "ow_liekong", "hs_lreno", "pal_mingxiu",
            "swd_murongshi", "gw_oudimu", "gjqt_ouyangshaogong", "hs_pyros", "qinmi", "gw_sanhanya", "hs_selajin", "swd_shuwaner",
            "swd_situqiang", "hs_xialikeer", "pal_xuejian", "swd_yuchiyanhong", "swd_yuwentuo", "swd_zhaoyun", "zhugeliang", "gw_aigeleisi",
            "gw_aimin", "gjqt_aruan", "hs_aya", "swd_cheyun", "swd_chenjingchou", "gw_diandian", "swd_huzhongxian", "hs_jinglinglong",
            "hs_kaituozhe", "hs_kalimosi", "gw_linjing", "ow_luxiao", "re_luxun", "hs_morgl", "swd_sikongyu", "hs_sthrall", "sunquan",
            "sunshangxiang", "gw_yioufeisisp", "gw_yisilinni", "hs_yogg", "hs_ysera", "pal_yuntianhe", "zhugejin", "zhugeke", "gw_zhuoertan",
            "hs_anduin", "swd_anka", "ow_banzang", "ow_chanyata", "diaochan", "swd_duguningke", "sp_diaochan", "hetaihou", "ns_huamulan",
            "swd_huanglei", "swd_huanyuanzhi", "re_huatuo", "gw_huoge", "pal_jiangcheng", "yj_jushou", "swd_kendi", "yxs_libai",
            "mtg_lilianna", "xin_liru", "liuxie", "pal_lixiaoyao", "pal_longkui", "ns_nanhua", "swd_qi", "swd_septem", "gw_shasixiwusi",
            "ow_tianshi", "swd_weida", "gjqt_xiayize", "swd_xiyan", "hs_xsylvanas", "hs_yelinlonghou", "ow_yuanshi", "zuoci"];
          var vintage = ['tianjian', 'shuiyun', 'zhuyue', 'zhimeng', 'poyun', 'qianfang', 'xfenxin', 'danqing', 'ywuhun', 'tianwu', 'xuelu',
            'shahun', 'yuling', 'duhun', 'liaoyuan', 'touxi', 'wangchen', 'poyue', 'kunlunjing', 'huanhun', 'yunchou', 'tuzhen', 'cyqiaoxie',
            'mufeng', 'duanyi', 'guozao', 'yaotong', 'pozhen', 'tanlin', 'susheng', 'jikong', 'shouyin', 'jilve', 'hxunzhi', 'huodan', 'shanxian',
            'ziyu', 'kuoyin', 'feiren', 'zihui', 'jidong', 'baoxue', 'aqianghua', 'maoding', 'bfengshi', 'zhongdun', 'pingzhang', 'maichong',
            'guozai', 'jingxiang', 'yuelu', 'liechao', 'fengnu', 'hanshuang', 'enze', 'malymowang', 'xshixin', 'qingzun'];
          var favmodes = ["versus|three", "versus|four", "versus|two", "chess|combat"];
          for (var i = 0; i < mode.length; i++) {
            game.saveConfig(mode[i] + '_banned', banned);
            game.saveConfig(mode[i] + '_bannedcards', bannedcards);
          }
          var characters = lib.config.all.characters.slice(0);
          characters.remove('standard');
          characters.remove('old');
          game.saveConfig('vintageSkills', vintage);
          game.saveConfig('favouriteCharacter', favs);
          game.saveConfig('favouriteMode', favmodes);
          game.saveConfig('theme', 'simple');
          game.saveConfig('player_border', 'slim');
          game.saveConfig('cards', lib.config.all.cards);
          game.saveConfig('characters', characters);
          game.saveConfig('change_skin', false);
          game.saveConfig('show_splash', 'off');
          game.saveConfig('show_favourite', false);
          game.saveConfig('animation', false);
          game.saveConfig('hover_all', false);
          game.saveConfig('asset_version', 'v1.9');
          // game.saveConfig('characters',lib.config.all.characters);
          // game.saveConfig('cards',lib.config.all.cards);
          game.saveConfig('plays', ['cardpile']);
          game.saveConfig('skip_shan', false);
          game.saveConfig('tao_enemy', true);
          game.saveConfig('layout', 'long2');
          game.saveConfig('hp_style', 'ol');
          game.saveConfig('background_music', 'music_off');
          game.saveConfig('background_audio', false);
          game.saveConfig('background_speak', false);
          game.saveConfig('show_volumn', false);
          game.saveConfig('show_replay', true);
          game.saveConfig('autostyle', true);
          game.saveConfig('debug', true);
          game.saveConfig('dev', true);
          if (!lib.device) {
            game.saveConfig('sync_speed', false);
          }
          game.reload();
        },
        o: function () {
          ui.arena.classList.remove('observe');
        },
        pt: function () {
          var list = Array.from(arguments);
          while (list.length) {
            var card = cheat.gn(list.pop());
            if (card) ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
          }
        },
        q: function () {
          // if(lib.config.layout!='mobile') init.layout('mobile');
          if (arguments.length == 0) {
            var style = ui.css.card_style;
            if (lib.config.card_style != 'simple') {
              lib.config.card_style = 'simple';
              ui.css.card_style = init.css(lib.assetURL + 'theme/style/card', 'simple');
            }
            else {
              lib.config.card_style = 'default';
              ui.css.card_style = init.css(lib.assetURL + 'theme/style/card', 'default');
            }
            style.remove();
          }
          else {
            for (var i = 0; i < arguments.length; i++) {
              cheat.g(arguments[i]);
            }
          }
          ui.arena.classList.remove('selecting');
          ui.arena.classList.remove('tempnoe');
        },
        p: function (name, i, skin) {
          var list = ['swd', 'hs', 'pal', 'gjqt', 'ow', 'gw'];
          if (!lib.character[name]) {
            for (var j = 0; j < list.length; j++) {
              if (lib.character[list[j] + '_' + name]) {
                name = list[j] + '_' + name; break;
              }
            }
          }
          if (skin) {
            lib.config.skin[name] = skin
          }
          var target;
          if (typeof i == 'number') {
            target = game.players[i];
          }
          else {
            target = game.me.next;
          }
          if (!lib.character[name]) {
            target.node.avatar.setBackground(name, 'character');
            target.node.avatar.show();
          }
          else {
            target.init(name);
          }
          if (i === true) {
            if (lib.config.layout == 'long2') {
              init.layout('mobile');
            }
            else {
              init.layout('long2');
            }
          }
        },
        e: function () {
          var cards = [], target;
          for (var i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'player') {
              target = arguments[i];
            }
            else {
              cards.push(game.createCard(arguments[i]));
            }
          }
          if (!cards.length) {
            cards.push(game.createCard('qinglong'));
            cards.push(game.createCard('bagua'));
            cards.push(game.createCard('dilu'));
            cards.push(game.createCard('chitu'));
            cards.push(game.createCard('muniu'));
          }
          target = target || game.me;
          for (var i = 0; i < cards.length; i++) {
            var card = target.getEquip(cards[i]);
            if (card) {
              card.discard();
              target.removeEquipTrigger(card);
            }
            target.$equip(cards[i]);
          }
        },
        c: function () {
          (function () {
            var a = 0, b = 0, c = 0, d = 0;
            var aa = 0, bb = 0, cc = 0, dd = 0;
            var sa = 0, sb = 0, sc = 0, sd = 0;
            var sha = 0, shan = 0, tao = 0, jiu = 0, wuxie = 0, heisha = 0, hongsha = 0;
            var num = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
            for (var i in lib.card) {
              if (get.objtype(lib.card[i]) == 'object' && lib.translate[i + '_info']) {
                switch (lib.card[i].type) {
                  case 'basic': a++; break;
                  case 'trick': b++; break;
                  case 'equip': c++; break;
                  default: d++; break;
                }
              }
            }
            for (var i = 0; i < lib.card.list.length; i++) {
              if (typeof lib.card[lib.card.list[i][2]] == 'object') {
                switch (lib.card[lib.card.list[i][2]].type) {
                  case 'basic': aa++; break;
                  case 'trick': case 'delay': bb++; break;
                  case 'equip': cc++; break;
                  default: dd++; break;
                }
                switch (lib.card.list[i][0]) {
                  case 'heart': sa++; break;
                  case 'diamond': sb++; break;
                  case 'club': sc++; break;
                  case 'spade': sd++; break;
                }
                if (lib.card.list[i][2] == 'sha') {
                  sha++;
                  if (lib.card.list[i][0] == 'club' || lib.card.list[i][0] == 'spade') {
                    heisha++;
                  }
                  else {
                    hongsha++;
                  }
                }
                if (lib.card.list[i][2] == 'shan') {
                  shan++;
                }
                if (lib.card.list[i][2] == 'tao') {
                  tao++;
                }
                if (lib.card.list[i][2] == 'jiu') {
                  jiu++;
                }
                if (lib.card.list[i][2] == 'wuxie') {
                  wuxie++;
                }
                num[lib.card.list[i][1]]++;
              }
            }
            var str = '基本牌' + aa + '； ' + '锦囊牌' + bb + '； ' + '装备牌' + cc + '； ' + '其它牌' + dd
            console.log(str);
            str = '红桃牌' + sa + '； ' + '方片牌' + sb + '； ' + '梅花牌' + sc + '； ' + '黑桃牌' + sd
            console.log(str);
            str = '杀' + sha + '； ' + '黑杀' + heisha + '； ' + '红杀' + hongsha + '； ' + '闪' + shan + '； ' + '桃' + tao + '； ' + '酒' + jiu + '； ' + '无懈' + wuxie
            console.log(str);
            if (arguments[1]) {
              for (var i = 1; i <= 13; i++) {
                if (i < 10) {
                  console.log(i + ' ', num[i]);
                }
                else {
                  console.log(i, num[i]);
                }
              }
            }
            var arr = [];
            for (var i = 1; i <= 13; i++) {
              arr.push(num[i]);
            }
            console.log((a + b + c + d) + '/' + (aa + bb + cc + dd), ...arr)
          }());
        },
        id: function () {
          game.showIdentity();
        },
        b: function () {
          if (!ui.dialog || !ui.dialog.buttons) return;
          for (var i = 0; i < Math.min(arguments.length, ui.dialog.buttons.length); i++) {
            ui.dialog.buttons[i].link = arguments[i];
          }
        },
        a: function (bool) {
          if (lib.config.test_game) {
            game.saveConfig('test_game');
          }
          else {
            if (bool) {
              if (typeof bool === 'string') {
                game.saveConfig('test_game', bool);
              }
              else {
                game.saveConfig('test_game', '_');
              }
            }
            else {
              game.saveConfig('test_game', true);
            }
          }
          game.reload();
        },
        as: function () {
          ui.window.classList.remove('testing');
          var bg = ui.window.querySelector('.pausedbg');
          if (bg) {
            bg.remove();
          }
        },
        uj: function () {
          cheat.e('qilin');
          game.me.next.useCard({ name: 'jiedao' }, [game.me, game.me.previous]);
        },
        u: function () {
          var card = { name: 'sha' }, source = game.me.next, targets = [];
          for (var i = 0; i < arguments.length; i++) {
            if (get.itemtype(arguments[i]) == 'player') {
              source = arguments[i];
            }
            else if (Array.isArray(arguments[i])) {
              targets = arguments[i];
            }
            else if (typeof arguments[i] == 'object' && arguments[i]) {
              card = arguments[i];
            }
            else if (typeof arguments[i] == 'string') {
              card = { name: arguments[i] }
            }
          }
          if (!targets.length) targets.push(game.me);
          source.useCard(game.createCard(card.name, card.suit, card.number, card.nature), targets);
        },
        r: function (bool) {
          var list = ['s', 'ap', 'a', 'am', 'bp', 'b', 'bm', 'c', 'd'];
          var str = '';
          for (var i = 0; i < list.length; i++) {
            if (str) str += ' 、 ';
            str += list[i] + '-' + lib.rank[list[i]].length;
          }
          console.log(str);
          for (var i in lib.characterPack) {
            if (!bool && lib.config.all.sgscharacters.contains(i)) continue;
            var map = {};
            var str = '';
            for (var j in lib.characterPack[i]) {
              var rank = get.rank(j);
              if (!map[rank]) {
                map[rank] = 1;
              }
              else {
                map[rank]++;
              }
            }
            for (var j = 0; j < list.length; j++) {
              if (map[list[j]]) {
                if (str) str += ' 、 ';
                str += list[j] + '-' + map[list[j]];
              }
            }
            if (str) {
              console.log(lib.translate[i + '_character_config'] + '：' + str);
            }
          }

          var list = lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
            concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
          for (var i in lib.character) {
            if (lib.config.forbidai.contains(i)) continue;
            if (i.indexOf('boss_') != 0 && i.indexOf('tafang_') != 0 && !list.contains(i)) console.log(get.translation(i), i);
          }
        },
        h: function (player) {
          console.log(get.translation(player.getCards('h')));
        },
        g: function () {
          for (var i = 0; i < arguments.length; i++) {
            if (i > 0 && typeof arguments[i] == 'number') {
              for (var j = 0; j < arguments[i] - 1; j++) {
                cheat.gx(arguments[i - 1]);
              }
            }
            else {
              cheat.gx(arguments[i]);
            }
          }
        },
        ga: function (type) {
          for (var i in lib.card) {
            if (lib.card[i].type == type || lib.card[i].subtype == type) {
              cheat.g(i);
            }
          }
        },
        gg: function () {
          for (var i = 0; i < game.players.length; i++) {
            for (var j = 0; j < arguments.length; j++) {
              cheat.gx(arguments[j], game.players[i]);
            }
          }
        },
        gx: function (name, target) {
          target = target || game.me;
          var card = cheat.gn(name);
          if (!card) return;
          target.node.handcards1.appendChild(card);
          delete _status.event._cardChoice;
          delete _status.event._targetChoice;
          delete _status.event._skillChoice;
          game.check();
          target.update();
          ui.updatehl();
        },
        gn: function (name) {
          var nature = null;
          var suit = null;
          var suits = ['club', 'spade', 'diamond', 'heart'];
          for (var i = 0; i < suits.length; i++) {
            if (name.indexOf(suits[i]) == 0) {
              suit = suits[i];
              name = name.slice(suits[i].length);
              break;
            }
          }
          if (name.indexOf('red') == 0) {
            name = name.slice(3);
            suit = ['diamond', 'heart'].randomGet();
          }
          if (name.indexOf('black') == 0) {
            name = name.slice(5);
            suit = ['spade', 'club'].randomGet();
          }

          if (name == 'huosha') {
            name = 'sha';
            nature = 'fire';
          }
          else if (name == 'leisha') {
            name = 'sha';
            nature = 'thunder';
          }
          else if (name == 'haisha') {
            name = 'sha';
            nature = 'ocean';
          }
          else if (name == 'yamisha') {
            name = 'sha';
            nature = 'yami';
          }
          else if (name == 'haitao') {
            name = 'tao';
            nature = 'ocean';
          }
          if (!lib.card[name]) {
            return null;
          }
          return game.createCard(name, suit, null, nature);
        },
        ge: function (target) {
          if (target) {
            cheat.gx('zhuge', target);
            cheat.gx('qinglong', target);
            cheat.gx('bagua', target);
            cheat.gx('dilu', target);
            cheat.gx('chitu', target);
            cheat.gx('muniu', target);
          }
          else {
            cheat.g('zhuge');
            cheat.g('qinglong');
            cheat.g('bagua');
            cheat.g('dilu');
            cheat.g('chitu');
            cheat.g('muniu');
          }
        },
        gj: function () {
          cheat.g('shandian');
          cheat.g('huoshan');
          cheat.g('hongshui');
          cheat.g('lebu');
          cheat.g('bingliang');
          cheat.g('guiyoujie');
        },
        gf: function () {
          for (var i in lib.card) {
            if (lib.card[i].type == 'food') {
              cheat.g(i);
            }
          }
        },
        d: function (num, target) {
          if (num == undefined) num = 1;
          var cards = get.cards(num);
          for (var i = 0; i < num; i++) {
            var card = cards[i];
            game.me.node.handcards1.appendChild(card);
            delete _status.event._cardChoice;
            delete _status.event._targetChoice;
            delete _status.event._skillChoice;
            game.check();
            game.me.update();
            ui.updatehl();
          }
        },
        s: function () {
          for (var i = 0; i < arguments.length; i++) {
            game.me.addSkill(arguments[i], true);
          }
          delete _status.event._cardChoice;
          delete _status.event._targetChoice;
          delete _status.event._skillChoice;
          game.check();
        },
        t: function (num) {
          if (game.players.contains(num)) {
            num = game.players.indexOf(num);
          }
          if (num == undefined) {
            for (var i = 0; i < game.players.length; i++) cheat.t(i);
            return;
          }
          var player = game.players[num];
          var cards = player.getCards('hej');
          for (var i = 0; i < cards.length; i++) {
            cards[i].discard();
          }
          player.removeEquipTrigger();
          player.update();
        },
        to: function () {
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i] != game.me) {
              cheat.t(i);
            }
          }
        },
        tm: function () {
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i] == game.me) {
              cheat.t(i);
            }
          }
        },
        k: function (i) {
          if (i == undefined) i = 1;
          game.players[i].hp = 1;
          cheat.t(i);
          cheat.g('juedou');
        },
        z: function (name) {
          switch (name) {
            case 'cc': name = 're_caocao'; break;
            case 'lb': name = 're_liubei'; break;
            case 'sq': name = 'sunquan'; break;
            case 'dz': name = 'dongzhuo'; break;
            case 'ys': name = 're_yuanshao'; break;
            case 'zj': name = 'sp_zhangjiao'; break;
            case 'ls': name = 'liushan'; break;
            case 'sc': name = 'sunce'; break;
            case 'cp': name = 'caopi'; break;
            case 'cr': name = 'caorui'; break;
            case 'sx': name = 'sunxiu'; break;
            case 'lc': name = 'liuchen'; break;
            case 'sh': name = 'sunhao'; break;
          }
          game.zhu.init(name);
          game.zhu.maxHp++;
          game.zhu.hp++;
          game.zhu.update();
        },
      },
      /**
       * {@link GameCores}的公共技能组
       * @namespace
       */
      skill: {
        //升阶
        _shengjie: {
          enable: 'phaseUse',
          usable: 1,
          filter: function (Evt, player) {
            return player.canPromotion(player.getCards('h'));
          },
          content: [function () {
            player.choosePromotion(player.getCards('h'))
          }, function () {
            if (result.bool) {
              player.lose(result.cards, ui.discardPile, 'visible');
              player.$throw(result.cards);
              game.log(player, '将', result.cards, '置入了弃牌堆');
              Evt.star = result.star;
            }
            if (!result.bool) {
              var skill = player.getStat().skill;
              skill._shengjie--;
              if (typeof skill._shengjietried == 'number') {
                skill._shengjietried++;
              }
              else {
                skill._shengjietried = 1;
              }
            }
          }, function () {
            if (Evt.star) {
              player.gain(Evt.star, 'gain2').gaintag.add('_shengjie');
            }
          }
          ],
          ai: {
            basic: {
              order: 6
            },
            result: {
              player: function (player) {
                if (player.getStat().skill._shengjietried >= 10) {
                  return 0;
                }
                return 0;
              }
            }
          }
        },
        //搬过来的应变
        _yingbian: {
          trigger: { player: 'useCard1' },
          forced: true,
          popup: false,
          firstDo: true,
          ruleSkill: true,
          forceLoad: true,
          filter: function (Evt, player) {
            if (Evt.card.yingbian) return false;
            var bool = player.hasSkillTag('forceYingbian');
            var card = Evt.card;
            if (get.cardtag(card, 'yingbian_kongchao') && (!player.countCards('h') || bool)) return true;
            if (get.cardtag(card, 'yingbian_canqu') && (player.hp == 1 || bool)) return true;
            if (get.cardtag(card, 'yingbian_fujia') && (player.isMaxHandcard() || bool)) return true;
            if (get.cardtag(card, 'yingbian_zhuzhan')) return true;
            return false;
          },
          content: [function () {
            var card = trigger.card;
            Evt.card = card;
            var bool = false;
            if (get.cardtag(card, 'yingbian_kongchao') && !player.countCards('h')) {
              player.popup('空巢', 'soil');
              bool = true;
            }
            else if (get.cardtag(card, 'yingbian_canqu') && player.hp == 1) {
              player.popup('残躯', 'fire');
              bool = true;
            }
            else if (get.cardtag(card, 'yingbian_fujia') && player.isMaxHandcard()) {
              player.popup('富甲', 'orange');
              bool = true;
            }
            else if (player.hasSkillTag('forceYingbian')) {
              player.popup('应变', 'metal');
              bool = true;
            }
            if (bool) {
              game.log(player, '触发了', card, '的应变条件');
              Evt.goto(10);
            }
          }, function () {
            Evt._global_waiting = true;
            Evt.send = function (player, card, source, targets, id, id2, skillState) {
              if (skillState) {
                player.applySkills(skillState);
              }
              var type = get.type2(card);
              var str = get.translation(source);
              if (targets && targets.length) {
                str += '对';
                str += get.translation(targets);
              }
              str += '使用了';
              var next = player.chooseCard({
                filterCard: function (card) {
                  return get.type2(card) == type && lib.filter.cardDiscardable.apply(this, arguments);
                },
                prompt: str += (get.translation(card) + '，是否弃置一张' + get.translation(type) + '为其助战？'),
                position: 'h',
                _global_waiting: true,
                id: id,
                id2: id2,
                ai: function (cardx) {
                  var info = get.info(card);
                  if (info && info.ai && info.ai.yingbian) {
                    var ai = info.ai.yingbian(card, source, targets, player);
                    if (!ai) return 0;
                    return ai - get.value(cardx);
                  }
                  else if (get.attitude(player, source) <= 0) return 0;
                  return 5 - get.value(cardx);
                },
              });
              if (game.online) {
                _status.event._resultid = id;
                game.resume();
              }
            };
          }, function () {
            var type = get.type2(card);
            var list = game.filterPlayer(function (current) {
              if (current == player) return false;
              if (!current.countCards('h')) return false;
              return _status.connectMode || current.countCards('h', function (cardx) {
                return get.type2(cardx) == type;
              })
            });
            Evt.list = list;
            Evt.id = get.id();
            list.sort(function (a, b) {
              return get.distance(Evt.source, a, 'absolute') - get.distance(Evt.source, b, 'absolute');
            });
          }, function () {
            if (Evt.list.length == 0) {
              Evt.finish();
              return;
            }
            else if (_status.connectMode && (Evt.list[0].isOnline() || Evt.list[0] == game.me)) {
              Evt.goto(5);
            }
            else {
              Evt.current = Evt.list.shift();
              Evt.send(Evt.current, Evt.card, player, trigger.targets, Evt.id, trigger.parent.id);
            }
          }, function () {
            if (result.bool) {
              Evt.zhuzhanresult = Evt.current;
              Evt.zhuzhanresult2 = result;
              if (Evt.current != game.me) game.delayx();
              Evt.goto(9);
            }
            else {
              Evt.goto(3);
            }
          }, function () {
            var id = Evt.id;
            var sendback = function (result, player) {
              if (result && result.id == id && !Evt.zhuzhanresult && result.bool) {
                Evt.zhuzhanresult = player;
                Evt.zhuzhanresult2 = result;
                game.broadcast('cancel', id);
                if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) {
                  return (function () {
                    Evt.resultOL = _status.event.resultOL;
                    ui.click.cancel();
                    if (ui.confirm) ui.confirm.close();
                  });
                }
              }
              else {
                if (_status.event.id == id && _status.event.name == 'chooseCard' && _status.paused) {
                  return (function () {
                    Evt.resultOL = _status.event.resultOL;
                  });
                }
              }
            };

            var withme = false;
            var withol = false;
            var list = Evt.list;
            for (var i = 0; i < list.length; i++) {
              if (list[i].isOnline()) {
                withol = true;
                list[i].wait(sendback);
                list[i].send(Evt.send, list[i], Evt.card, player, trigger.targets, Evt.id, trigger.parent.id, get.skillState(list[i]));
                list.splice(i--, 1);
              }
              else if (list[i] == game.me) {
                withme = true;
                Evt.send(list[i], Evt.card, player, trigger.targets, Evt.id, trigger.parent.id);
                list.splice(i--, 1);
              }
            }
            if (!withme) {
              Evt.goto(7);
            }
            if (_status.connectMode) {
              if (withme || withol) {
                for (var i = 0; i < game.players.length; i++) {
                  if (game.players[i] != player) game.players[i].showTimer();
                }
              }
            }
            Evt.withol = withol;
          }, function () {
            if (result && result.bool && !Evt.zhuzhanresult) {
              game.broadcast('cancel', Evt.id);
              Evt.zhuzhanresult = game.me;
              Evt.zhuzhanresult2 = result;
            }
          }, function () {
            if (Evt.withol && !Evt.resultOL) {
              game.pause();
            }
          }, function () {
            for (var i = 0; i < game.players.length; i++) {
              game.players[i].hideTimer();
            }
          }, function () {
            if (Evt.zhuzhanresult) {
              var target = Evt.zhuzhanresult;
              target.line(player, 'green');
              target.discard(Evt.zhuzhanresult2.cards);
              target.popup('助战', 'wood');
              game.log(target, '响应了', player, '发起的助战');
              target.addExpose(0.2);
            }
            else Evt.finish();
          }, function () {
            trigger.card.yingbian = true;
            var info = get.info(trigger.card);
            if (info && info.yingbian) info.yingbian(trigger);
            player.addTempSkill('yingbian_changeTarget');
          }],
        },
        yingbian_changeTarget: {
          trigger: { player: 'useCard2' },
          forced: true,
          popup: false,
          filter: function (Evt, player) {
            if (Evt.yingbian_removeTarget && Evt.targets && Evt.targets.length > 1) return true;
            if (!Evt.yingbian_addTarget) return false;
            var info = get.info(Evt.card);
            if (info.allowMultiple == false) return false;
            if (Evt.targets && !info.multitarget) {
              if (game.hasPlayer(function (current) {
                return !Evt.targets.contains(current) && lib.filter.targetEnabled2(Evt.card, player, current) && lib.filter.targetInRange(Evt.card, player, current);
              })) {
                return true;
              }
            }
            return false;
          },
          content: [function () {
            if (trigger.yingbian_addTarget) player.chooseTarget('应变：是否为' + get.translation(trigger.card) + '增加一个目标？', function (card, player, target) {
              var trigger = _status.event.getTrigger();
              var card = trigger.card;
              return !trigger.targets.contains(target) && lib.filter.targetEnabled2(card, player, target) && lib.filter.targetInRange(card, player, target);
            }).set('ai', function (target) {
              var player = _status.event.player;
              var card = _status.event.getTrigger().card;
              return get.effect(target, card, player, player);
            });
            else Evt.goto(2);
          },
          function () {
            if (result.bool) {
              var target = result.targets[0];
              player.line(target, 'green');
              game.log(player, '发动应变效果，令', target, '也成为了', trigger.card, '的目标');
              trigger.targets.add(target);
            }
          },
          function () {
            if (trigger.yingbian_removeTarget && trigger.targets.length > 1) player.chooseTarget('应变：是否为' + get.translation(trigger.card) + '减少一个目标？', function (card, player, target) {
              var trigger = _status.event.getTrigger();
              return trigger.targets.contains(target);
            }).set('ai', function (target) {
              var player = _status.event.player;
              var card = _status.event.getTrigger().card;
              return -get.effect(target, card, player, player);
            });
            else Evt.finish();
          },
          function () {
            if (result.bool) {
              var target = result.targets[0];
              player.line(target, 'green');
              game.log(player, '发动应变效果，将', target, '从', trigger.card, '的目标中移除了');
              trigger.targets.remove(target);
            }
          }],
        },
        //
        _showHiddenCharacter: {
          trigger: { player: ['changeHp', 'phaseBeginStart', 'loseMaxHpBegin'] },
          firstDo: true,
          forced: true,
          popup: false,
          priority: 25,
          filter: function (Evt, player, name) {
            return player.isUnseen(2) && get.mode() != 'guozhan';
          },
          content: function () {
            player.showCharacter(2);
            player.removeSkill('g_hidden_ai');
          },
        },
        _kamisha: {
          trigger: { source: 'damageBegin2' },
          //forced:true,
          popup: false,
          prompt: function (Evt, player) {
            return '是否防止即将对' + get.translation(Evt.player) + '造成的伤害，改为令其减少' + get.cnNumber(Evt.num) + '点体力上限？';
          },
          filter: function (Evt, player) {
            return Evt.nature == 'kami' && Evt.num > 0;
          },
          ruleSkill: true,
          check: function (Evt, player) {
            var att = get.attitude(player, Evt.player);
            if (Evt.player.hp == Evt.player.maxHp) return att < 0;
            if (Evt.player.hp == Evt.player.maxHp - 1 &&
              (Evt.player.maxHp <= 3 || Evt.player.hasSkillTag('maixie'))) return att < 0;
            return att > 0;
          },
          content: function () {
            trigger.cancel();
            trigger.player.loseMaxHp(trigger.num).source = player;
          },
        },
        //海洋伤害特性
        _oceansha: {
          trigger: { source: 'damageBegin4' },
          forced: true,
          priority: 7,
          logTarget: 'player',
          equipSkill: false,
          ruleSkill: true,
          filter: function (Evt, player) {
            return Evt.nature == 'ocean' && Evt.num > 0 && Evt.player.hujia > 0;
          },
          ruleSkill: true,
          content: function () {
            trigger.num++;
            trigger.oceanAddDam = true;
          },
        },
        //暗影伤害特性
        _yamisha: {
          trigger: { player: 'useCardToPlayered' },
          forced: true,
          priority: 7,
          logTarget: 'target',
          equipSkill: false,
          ruleSkill: true,
          filter: function (Evt, player) {
            return Evt.card.nature == 'yami' && Evt.target.countCards('h') > player.countCards('h');
          },
          ruleSkill: true,
          content: function () {
            trigger.getParent().directHit.add(trigger.target);
            trigger.getParent().yamiDirect = true;
          },
        },
        _yamisha2: {
          trigger: { player: 'phaseJieshu' },
          priority: 1,
          popup: false,
          forced: true,
          ruleSkill: true,
          filter: function (Evt, player) {
            if (Evt.getParent().noyami) return false;
            if (Evt.player.hasSkillTag('playernoyami', false, Evt)) return false;
            return game.countPlayer(function (cur) {
              return cur.hasYami();
            })
          },
          content: [function () {
            Evt.target = trigger.player;
            Evt.state = true;
            Evt._global_waiting = true;
            Evt.filterCard = function (card, player) {
              if (get.nature(card) != 'yami') return false;
              return lib.filter.cardEnabled(card, player, 'forceEnable');
            };
            Evt.send = function (player, state, target, id, skillState) {
              if (skillState) {
                player.applySkills(skillState);
              }
              state = state ? 1 : -1;
              var str = '';
              if (target) {
                str += '在' + get.translation(target);
              }
              str += '的结束阶段，是否对其使用暗影属性的牌？';

              var next = player.chooseToUse({
                filterCard: function (card, player) {
                  if (get.nature(card) != 'yami') return false;
                  return player.canUse(card, target, false);
                },
                filterTarget: target,
                prompt: str,
                type: 'yami',//
                state: state,
                _global_waiting: true,
                ai1: function () {
                  if (target) {
                    var triggerevent = _status.event.getTrigger();
                    if (triggerevent && triggerevent.parent &&
                      triggerevent.parent.postAi &&
                      triggerevent.player.isUnknown(_status.event.player)) {
                      return 0;
                    }
                    if (Math.abs(get.attitude(_status.event.player, target)) < 0) return Math.random() - 0.2;
                  }
                  else {
                    return 0;
                  }
                },
                id: id,
              });
              if (_status.event.stateplayer && _status.event.statecard) next.set('respondTo', [_status.event.stateplayer]);
              if (game.online) {
                _status.event._resultid = id;
                game.resume();
              }
              else {
                next.nouse = true;
              }
            };
            Evt.settle = function () {
              Evt.finish();
            };
          },
          function () {
            var list = game.filterPlayer(function (current) {
              if (current == Evt.target) return false;
              if (Evt.noyami) return false;
              if (Evt.directHit && Evt.directHit.contains(current)) return false;
              return current.hasYami();
            });
            Evt.list = list;
            Evt.id = get.id();
            list.sort(function (a, b) {
              return get.distance(Evt.target, a, 'absolute') - get.distance(Evt.target, b, 'absolute');
            });
          },
          function () {
            if (Evt.list.length == 0) {
              Evt.settle();
            }
            else if (_status.connectMode && (Evt.list[0].isOnline() || Evt.list[0] == game.me)) {
              Evt.goto(4);
            }
            else {
              Evt.current = Evt.list.shift();
              Evt.send(Evt.current, Evt.state, Evt.target, Evt.id);
            }
          },
          function () {
            if (result.bool) {
              Evt.yamiresult = Evt.current;
              Evt.yamiresult2 = result;
              Evt.goto(8);
            }
            else {
              Evt.goto(2);
            }
          },
          function () {
            var id = Evt.id;
            var sendback = function (result, player) {
              if (result && result.id == id && !Evt.yamiresult && result.bool) {
                Evt.yamiresult = player;
                Evt.yamiresult2 = result;
                game.broadcast('cancel', id);
                if (_status.event.id == id && _status.event.name == 'chooseToUse' && _status.paused) {
                  return (function () {
                    Evt.resultOL = _status.event.resultOL;
                    ui.click.cancel();
                    if (ui.confirm) ui.confirm.close();
                  });
                }
              }
              else {
                if (_status.event.id == id && _status.event.name == 'chooseToUse' && _status.paused) {
                  return (function () {
                    Evt.resultOL = _status.event.resultOL;
                  });
                }
              }
            };

            var withme = false;
            var withol = false;
            var list = Evt.list;
            for (var i = 0; i < list.length; i++) {
              if (list[i].isOnline()) {
                withol = true;
                list[i].wait(sendback);
                list[i].send(Evt.send, list[i], Evt.state, Evt.target, Evt.id, get.skillState(list[i]));
                list.splice(i--, 1);
              }
              else if (list[i] == game.me) {
                withme = true;
                Evt.send(list[i], Evt.state, Evt.target, Evt.id);
                list.splice(i--, 1);
              }
            }
            if (!withme) {
              Evt.goto(6);
            }
            if (_status.connectMode) {
              if (withme || withol) {
                for (var i = 0; i < game.players.length; i++) {
                  game.players[i].showTimer();
                }
              }
            }
            Evt.withol = withol;
          },
          function () {
            if (result && result.bool && !Evt.yamiresult) {
              game.broadcast('cancel', Evt.id);
              Evt.yamiresult = game.me;
              Evt.yamiresult2 = result;
            }
          },
          function () {
            if (Evt.withol && !Evt.resultOL) {
              game.pause();
            }
          },
          function () {
            for (var i = 0; i < game.players.length; i++) {
              game.players[i].hideTimer();
            }
          },
          function () {
            if (Evt.yamiresult) {
              var next = Evt.yamiresult.useResult(Evt.yamiresult2);
              if (Evt.stateplayer) next.respondTo = [Evt.stateplayer, Evt];
            }
          },
          function () {
            if (Evt.yamiresult) {
              if (result) {
                Evt.goto(1);
              }
              else Evt.settle();
            }
            else if (Evt.list.length) {
              Evt.goto(2);
            }
            else {
              Evt.settle();
            }
            delete Evt.resultOL;
            delete Evt.yamiresult;
            delete Evt.yamiresult2;
          }]
        },
        aozhan: {
          charlotte: true,
          mod: {
            targetEnabled: function (card) {
              if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
            },
            cardSavable: function (card) {
              if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
            },
          },
          group: ["aozhan_sha", "aozhan_shan"],
          subSkill: {
            sha: {
              enable: ["chooseToUse", "chooseToRespond"],
              filterCard: {
                name: "tao",
              },
              viewAs: {
                name: "sha",
                isCard: true,
              },
              viewAsFilter: function (player) {
                if (!player.countCards('hs', 'tao')) return false;
              },
              position: 'hs',
              prompt: "将一张桃当杀使用或打出",
              check: function () { return 1 },
              ai: {
                respondSha: true,
                skillTagFilter: function (player) {
                  if (!player.countCards('hs', 'tao')) return false;
                },
                order: function () {
                  return get.order({ name: 'sha' }) - 0.1;
                },
              },
              sub: true,
            },
            shan: {
              enable: ["chooseToRespond", "chooseToUse"],
              filterCard: {
                name: "tao",
              },
              viewAs: {
                name: "shan",
                isCard: true,
              },
              prompt: "将一张桃当闪打出",
              check: function () { return 1 },
              viewAsFilter: function (player) {
                if (!player.countCards('hs', 'tao')) return false;
              },
              position: 'hs',
              ai: {
                respondShan: true,
                skillTagFilter: function (player) {
                  if (!player.countCards('hs', 'tao')) return false;
                },
              },
              sub: true,
            },
          },
        },
        /**
         * 特殊_全局技能
         * 将全局技能的技能名储存于此数组中
         * @type {!Array<string>}
         * @see {@link game.addGlobalSkill}
         */
        global: [],
        globalmap: {},
        storage: {},
        undist: {},
        others: {},
        zhu: {},
        zhuSkill: {},
        land_used: {},
        unequip: { ai: { unequip: true } },
        subplayer: {
          trigger: { player: 'dieBefore' },
          forced: true,
          priority: -9,
          onremove: true,
          mark: 'character',
          intro: {
            content: function (storage, player) {
              if (typeof storage.intro2 == 'string') return storage.intro2;
              if (typeof storage.intro2 == 'function') return storage.intro2(storage, player);
              return '死亡前切换回主武将'
            },
            name: function (storage) {
              return get.rawName(storage.name);
            }
          },
          content: function () {
            trigger.cancel();
            var evt = trigger.getParent('damage');
            if (evt.player == player) {
              evt.untrigger(false, player);
            }
            player.exitSubPlayer(true);
          },
          ai: {
            nosave: true
          }
        },
        autoswap: {
          firstDo: true,
          trigger: {
            player: ['playercontrol', 'chooseToUseBegin', 'chooseToRespondBegin', 'chooseToDiscardBegin', 'chooseToCompareBegin',
              'chooseButtonBegin', 'chooseCardBegin', 'chooseTargetBegin', 'chooseCardTargetBegin', 'chooseControlBegin',
              'chooseBoolBegin', 'choosePlayerCardBegin', 'discardPlayerCardBegin', 'gainPlayerCardBegin', 'chooseToMoveBegin', 'chooseToPlayBeatmapBegin']
          },
          forced: true,
          priority: 100,
          forceDie: true,
          popup: false,
          filter: function (Evt, player) {
            if (Evt.autochoose && Evt.autochoose()) return false;
            if (lib.filter.wuxieSwap(Evt)) return false;
            if (_status.auto || !player.isUnderControl()) return false;
            return true;
          },
          content: function () {
            game.swapPlayerAuto(player);
          },
        },
        dualside: {
          subSkill: {
            turn: {
              trigger: { player: ['turnOverAfter', 'dieBefore'] },
              silent: true,
              filter: function (Evt, player) {
                if (player.$.dualside_over) return false;
                return Array.isArray(player.$.dualside);
              },
              content: function () {
                var cfg = player.$.dualside;
                var bool = player.isTurnedOver();
                if (trigger.name == 'die') {
                  bool = !bool;
                }
                if (bool) {
                  cfg[1] = player.hp;
                  cfg[2] = player.maxHp;
                  player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
                  player.unmarkSkill('dualside');
                  player.markSkillCharacter('dualside', { name: cfg[0] }, '正面', '当前体力：' + cfg[1] + '/' + cfg[2]);
                }
                else {
                  cfg[4] = player.hp;
                  cfg[5] = player.maxHp;
                  player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
                  player.unmarkSkill('dualside');
                  player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
                }

                if (trigger.name == 'die') {
                  trigger.cancel();
                  delete player.$.dualside;
                  player.$.dualside_over = true;
                  player.unmarkSkill('dualside');
                }
              }
            },
            init: {
              trigger: { global: 'gameStart', player: 'enterGame' },
              silent: true,
              content: function () {
                var list = [player.name, player.name1, player.name2];
                for (var i = 0; i < list.length; i++) {
                  if (list[i] && lib.character[list[i]]) {
                    var info = lib.character[list[i]];
                    if (info[3].contains('dualside') && info[4]) {
                      player.$.dualside = [list[i], player.hp, player.maxHp];
                      for (var j = 0; j < info[4].length; j++) {
                        if (info[4][j].indexOf('dualside:') == 0) {
                          var name2 = info[4][j].slice(9);
                          var info2 = lib.character[name2];
                          player.$.dualside.push(name2);
                          player.$.dualside.push(get.infoHp(info2[2]));
                          player.$.dualside.push(get.infoMaxHp(info2[2]));
                        }
                      }
                    }
                  }
                }
                var cfg = player.$.dualside;
                if (get.mode() == 'guozhan') {
                  if (player.name1 == cfg[0]) {
                    player.showCharacter(0);
                  }
                  else {
                    player.showCharacter(1);
                  }
                }
                player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
              }
            }
          },
          group: ['dualside_init', 'dualside_turn']
        },
        _disableJudge: {
          marktext: "废",
          intro: {
            content: "已经废除了判定区",
          },
          mod: {
            targetEnabled: function (card, player, target) {
              if (target.$._disableJudge && get.type(card) == 'delay') return false;
            },
          },
        },
        "_disableEquip": {
          marktext: "废",
          intro: {
            content: function (storage, player, skill) {
              var str = '';
              for (var i = 0; i < player.$.disableEquip.length; i++) {
                str += '、' + get.translation(player.$.disableEquip[i]) + '栏';
              };
              str = str.slice(1, str.length)
              str = '已经废除了' + str;
              return str;
            },
          },
          mod: {
            targetEnabled: function (card, player, target) {
              if (target.isDisabled(get.subtype(card))) return false;
            },
          },
          trigger: {
            player: ['disableEquipBefore', 'enableEquipBefore', 'enterGame'],
            global: 'gameStart',
          },
          forced: true,
          popup: false,
          filter: function (Evt, player) {
            return player.$.disableEquip == undefined;
          },
          content: function () {
            player.$.disableEquip = [];
          },
        },
        /**
         * 技能_封印
         * 使非锁定技失效
         */
        fengyin: {
          init: function (player, skill) {
            player.addSkillBlocker(skill);
          },
          onremove: function (player, skill) {
            player.removeSkillBlocker(skill);
          },
          charlotte: true,
          skillBlocker: function (skill, player) {
            return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
          },
          mark: true,
          intro: {
            content: function (storage, player, skill) {
              var list = player.getSkills(null, false, false).filter(function (i) {
                return lib.skill.fengyin.skillBlocker(i, player);
              });
              if (list.length) return '失效技能：' + get.translation(list);
              return '无失效技能';
            }
          }
        },
        /**
         * 技能_白板
         * 使全部技能失效
         */
        baiban: {
          init: function (player, skill) {
            player.addSkillBlocker(skill);
          },
          onremove: function (player, skill) {
            player.removeSkillBlocker(skill);
          },
          charlotte: true,
          skillBlocker: function (skill, player) {
            return !lib.skill[skill].charlotte;
          },
          mark: true,
          intro: {
            content: function (storage, player, skill) {
              var list = player.getSkills(null, false, false).filter(function (i) {
                return lib.skill.baiban.skillBlocker(i, player);
              });
              if (list.length) return '失效技能：' + get.translation(list);
              return '无失效技能';
            }
          }
        },
        qianxing: {
          mark: true,
          nopop: true,
          init: function (player) {
            game.log(player, '获得了', '【潜行】');
          },
          intro: {
            content: '锁定技，你不能成为其他角色的卡牌的目标'
          },
          mod: {
            targetEnabled: function (card, player, target) {
              if (player != target) return false;
            }
          }
        },
        /**
         * 技能_免疫
         * 防止受到的伤害
         */
        mianyi: {
          trigger: { player: 'damageBefore' },
          mark: true,
          forced: true,
          init: function (player) {
            game.log(player, '获得了', '【免疫】');
          },
          content: function () {
            trigger.cancel();
          },
          ai: {
            noyami: true,
            nofire: true,
            nothunder: true,
            noocean: true,
            nodamage: true,
            effect: {
              target: function (card, player, target, current) {
                if (get.tag(card, 'damage')) return [0, 0];
              }
            },
          },
          intro: {
            content: '防止一切伤害'
          }
        },
        mad: {
          mark: true,
          locked: true,
          intro: {
            content: '已进入混乱状态',
            name: '混乱',
            onunmark: function (storage, player) {
              game.log(player, '解除混乱状态');
            }
          }
        },
        ghujia: {
          intro: {
            content: function (content, player) {
              return '已有' + get.cnNumber(player.hujia) + '点护甲值';
            }
          }
        },
        counttrigger: {
          trigger: { global: 'phaseAfter' },
          silent: true,
          charlotte: true,
          priority: -100,
          content: function () {
            player.removeSkill('counttrigger');
            delete player.$.counttrigger;
          }
        },
        _recovercheck: {
          trigger: { player: 'recoverBefore' },
          forced: true,
          priority: 100,
          firstDo: true,
          popup: false,
          filter: function (Evt, player) {
            return player.hp >= player.maxHp;
          },
          content: function () {
            trigger.cancel();
          },
        },
        /**
         * 规则技能_翻面
         * 被翻面的角色跳过回合
         */
        _turnover: {
          trigger: { player: 'phaseBefore' },
          forced: true,
          priority: 100,
          popup: false,
          firstDo: true,
          content: [function () {
            if ((player == _status.roundStart || _status.roundSkipped) && !trigger.skill && game.roundNumber > 0) {
              Evt.trigger('roundEnd');
            }
          },
          function () {
            if (player.isTurnedOver()&&game.checkMod(trigger, player, 'unchanged', 'phaseSkippable', player)) {
              trigger.cancel();
              player.turnOver();
              player.phaseSkipped = true;
            }
            else {
              player.phaseSkipped = false;
            }
          },
          function () {
            if ((player == _status.roundStart || _status.roundSkipped) && !trigger.skill) {
              delete _status.roundSkipped;
              game.roundNumber++;
              trigger._roundStart = true;
              game.updateRoundNumber();
              for (var i = 0; i < game.players.length; i++) {
                if (game.players[i].isOut() && game.players[i].outCount > 0) {
                  game.players[i].outCount--;
                  if (game.players[i].outCount == 0 && !game.players[i].outSkills) {
                    game.players[i].in();
                  }
                }
              }
              Evt.trigger('roundStart');
            }
          }],
        },
        /**
         * 规则技能_使用
         * 使用一张牌结算后，通过{@link ui.clear}清除残留ui
         */
        _usecard: {
          trigger: { global: 'useCardAfter' },
          forced: true,
          popup: false,
          priority: -100,
          lastDo: true,
          filter: function (Evt) {
            return !Evt._cleared && Evt.card.name != 'wuxie';
          },
          content: function () {
            game.broadcastAll(function () {
              ui.clear();
            });
            Evt._cleared = true;
          }
        },
        /**
         * 规则技能_弃牌
         * 弃牌结算后，延时一段时间清除残留弃牌效果
         */
        _discard: {
          trigger: { global: ['discardAfter', 'loseToDiscardpileAfter'] },
          forced: true,
          popup: false,
          priority: -100,
          lastDo: true,
          filter: function (Evt) {
            return ui.todiscard[Evt.discardid] ? true : false;
          },
          content: function () {
            game.broadcastAll(function (id) {
              var todiscard = ui.todiscard[id];
              delete ui.todiscard[id];
              if (todiscard) {
                var time = 1000;
                if (typeof todiscard._discardtime == 'number') {
                  time += todiscard._discardtime - get.time();
                }
                if (time < 0) {
                  time = 0;
                }
                setTimeout(function () {
                  for (var i = 0; i < todiscard.length; i++) {
                    todiscard[i].delete();
                  }
                }, time);
              }
            }, trigger.discardid);
          }
        },
        _save: {
          //trigger:{source:'dying2',player:'dying2'},
          priority: 5,
          forced: true,
          popup: false,
          filter: function (Evt, player) {
            //if(!Evt.player.isDying()) return false;
            //if(Evt.source&&Evt.source.isIn()&&Evt.source!=player) return false;
            //return true;
            return false;
          },
          content: [function () {
            Evt.dying = trigger.player;
            if (!Evt.acted) Evt.acted = [];
          },
          function () {
            if (trigger.player.isDead()) {
              Evt.finish();
              return;
            }
            Evt.acted.push(player);
            var str = `${get.translation(trigger.player)}濒死，是否帮助？`;
            {
              let evt = Evt.getParent('dying')
              if (evt.reason && evt.reason.nofatal) str += `<br>（本次伤害不致命）`
            }
            var str2 = '当前体力：' + trigger.player.hp;
            if (lib.config.tao_enemy && Evt.dying.side != player.side && lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && !Evt.dying.hasSkillTag('revertsave')) {
              Evt._result = { bool: false }
            }
            else if (player.canSave(Evt.dying)) {
              player.chooseToUse({
                filterCard: function (card, player, Evt) {
                  Evt = Evt || _status.event;
                  return lib.filter.cardSavable(card, player, Evt.dying);
                },
                filterTarget: trigger.player,
                prompt: str,
                prompt2: str2,
                ai1: function (card) {
                  if (typeof card == 'string') {
                    var info = get.info(card);
                    if (info.ai && info.ai.order) {
                      if (typeof info.ai.order == 'number') {
                        return info.ai.order;
                      }
                      else if (typeof info.ai.order == 'function') {
                        return info.ai.order();
                      }
                    }
                  }
                  return 1;
                },
                ai2: get.effect_use,
                type: 'dying',
                targetRequired: true,
                dying: Evt.dying
              });
            }
            else {
              Evt._result = { bool: false }
            }
          },
          function () {
            if (result.bool) {
              if (trigger.player.hp <= 0 && !trigger.player.nodying && trigger.player.isAlive() && !trigger.player.isOut() && !trigger.player.removed) Evt.goto(0);
              else trigger.untrigger();
            }
            else {
              for (var i = 0; i < 20; i++) {
                if (Evt.acted.contains(Evt.player.next)) {
                  break;
                }
                else {
                  Evt.player = Evt.player.next;
                  if (!Evt.player.isOut()) {
                    Evt.goto(1);
                    break;
                  }
                }
              }
            }
          }]
        },
        _ismin: {
          mod: {
            cardEnabled: function (card, player) {
              if (player.isMin()) {
                if (get.type(card) == 'equip') return false;
              }
            }
          }
        },
        /**
         * 规则技能_重铸
         * 令角色可以重铸特定的牌
         */
        _chongzhu: {
          enable: 'phaseUse',
          logv: false,
          visible: true,
          prompt: '将要重铸的牌置入弃牌堆并摸一张牌',
          filter: function (Evt, player) {
            return player.hasCard(function (card) {
              return lib.skill._chongzhu.filterCard(card, player);
            });
          },
          filterCard: function (card, player) {
            var mod = game.checkMod(card, player, 'unchanged', 'cardChongzhuable', player);
            if (mod != 'unchanged') return mod;
            var info = get.info(card);
            if (typeof info.chongzhu == 'function') {
              return info.chongzhu(card, player);
            }
            return info.chongzhu;
          },
          prepare: function (cards, player) {
            player.$throw(cards, 1000);
            game.log(player, '将', cards, '置入了弃牌堆');
          },
          check: function (card) {
            // if(get.type(card)=='stonecharacter'&&_status.event.player.countCards('h',{type:'stonecharacter'})<=1){
            //     return 0;
            // }
            return 1;
          },
          discard: false,
          loseTo: 'discardPile',
          delay: 0.5,
          content: [function () {
            if (lib.config.mode == 'stone' && _status.mode == 'deck' &&
              !player.isMin() && get.type(cards[0]).indexOf('stone') == 0) {
              var list = get.stonecard(1, player.career);
              if (list.length) {
                player.gain(game.createCard(list.randomGet()), 'draw');
              }
              else {
                player.draw({ drawDeck: 1 })
              }
            }
            else if (get.subtype(cards[0]) == 'spell_gold') {
              var list = get.libCard(function (info) {
                return info.subtype == 'spell_silver';
              });
              if (list.length) {
                player.gain(game.createCard(list.randomGet()), 'draw');
              }
              else {
                player.draw();
              }
            }
            else if (get.subtype(cards[0]) == 'spell_silver') {
              var list = get.libCard(function (info) {
                return info.subtype == 'spell_bronze';
              });
              if (list.length) {
                player.gain(game.createCard(list.randomGet()), 'draw');
              }
              else {
                player.draw();
              }
            }
            else {
              player.draw();
            }
          }],
          ai: {
            basic: {
              order: 6
            },
            result: {
              player: 1,
            },
          }
        },
        /**
         * 规则技能_连环
         * 被横置的角色传递属性伤害
         */
        _lianhuan: {
          trigger: { player: 'damageAfter' },
          filter: function (Evt, player) {
            return Evt.lianhuanable == true;
          },
          forced: true,
          popup: false,
          logv: false,
          forceDie: true,
          //priority:-5,
          content: [() => {
            Evt.logvid = trigger.getLogv();
          },
          () => {
            Evt.targets = game.filterPlayer(function (current) {
              return current != Evt.player && current.isLinked();
            });
            lib.tempSortSeat = _status.currentPhase || player;
            Evt.targets.sort(lib.sort.seat);
            delete lib.tempSortSeat;
            Evt._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
            if (trigger.source)
              Evt._args.push(trigger.source);
            else
              Evt._args.push("nosource");
            if (trigger.nofatal)
              Evt.args.push('nofatal')
          },
          () => {
            if (Evt.targets.length) {
              var target = Evt.targets.shift();
              if (target.isLinked())
                target.damage.apply(target, Evt._args.slice(0));
              Evt.redo();
            }
          }],
        },
        _lianhuan4: {
          trigger: { player: 'changeHp' },
          priority: -10,
          forced: true,
          popup: false,
          forceDie: true,
          filter: function (Evt, player) {
            var evt = Evt.getParent();
            return evt && evt.name == 'damage' && evt.nature && lib.linked.contains(evt.nature) && player.isLinked();
          },
          content: function () {
            var overNature = trigger.getParent().oceanAddDam || false;
            if (trigger.getParent(2).type == 'card' && get.nature(trigger.getParent(2).card) == 'yami' && trigger.getParent(3).yamiDirect) overNature = true;
            if (!overNature) {
              player.link();
              if (trigger.getParent().notLink()) trigger.getParent().lianhuanable = true;
            }
          }
        }
      },
      character: {},
      init,
      element,
      mode: _mode,
      message: _message,
      /**
       * 珠联璧合映射
       * @type {!Object}
       */
      perfectPair: {},
      cardPile: {},
      /**
       * 游戏牌颜色
       * @type {('red'|'black'|'none')}
       */
      color: ['red', 'black', 'none'],
      /**
       * 游戏牌花色
       * @type {('club'|'spade'|'diamond'|'heart')}
       */
      suit: ['club', 'spade', 'diamond', 'heart'],
      /**
       * 游戏牌点数
       * @type {('A'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'X'|'J'|'Q'|'K')}
       */
      number: ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K'],
      /**
       * 游戏阶段
       * 
       * @type {string[]}
       */
      phaseName: ['phaseZhunbei', 'phaseJudge', 'phaseDraw', 'phaseUse', 'phaseDiscard', 'phaseJieshu'],
      /**
       * 历史记录
       * 
       * @type {Object}
       */
      historyRecorder: {
        useCard: [],
        respond: [],
        skipped: [],
        lose: [],
        gain: [],
        sourceDamage: [],
        damage: [],
        recover: [],
        changeHujia: [],
        judge: [],
        custom: []
      },
      /**
       * 快捷语音 - TODO
       * @type {string[]}
       */
      quickVoice: [
        '我从未见过如此厚颜无耻之人！',
        '这波不亏',
        '请收下我的膝盖',
        '你咋不上天呢',
        '放开我的队友，冲我来',
        '你随便杀，闪不了算我输',
        '见证奇迹的时刻到了',
        '能不能快一点啊，兵贵神速啊',
        '主公，别开枪，自己人',
        '小内再不跳，后面还怎么玩儿啊',
        '你们忍心，就这么让我酱油了？',
        '我，我惹你们了吗',
        '姑娘，你真是条汉子',
        '三十六计，走为上，容我去去便回',
        '人心散了，队伍不好带啊',
        '昏君，昏君啊！',
        '风吹鸡蛋壳，牌去人安乐',
        '小内啊，您老悠着点儿',
        '不好意思，刚才卡了',
        '你可以打得再烂一点吗',
        '哥们，给力点儿行嘛',
        '哥哥，交个朋友吧',
        '妹子，交个朋友吧',
      ],

      group: require('@d/lib_groupList').group,
      group2: require('@d/lib_groupList').group2,
      groupnature: require('@d/lib_groupList').groupnature,
      nature: require('@d/lib_natureList').nature,
      linked: require('@d/lib_natureList').linked,
      translate: require('@d/lib_translate').translate,
    }
  }
}