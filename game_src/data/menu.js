{
    /**
     * 游戏菜单
     * @name configMenu
     * @namespace
     * @type {!Object}
     */
    let { game, ui, get, ai, lib, _status } = vkCore
    lib.configMenu = {
        /**
         * 通用设置
         * @name configMenu.general
         * @type {!Object}
         */
        general: {
            name: '通用',
            config: {
                low_performance: {
                    name: '流畅模式',
                    init: false,
                    intro: '减少部分游戏特效，提高游戏速度',
                    onclick: function (bool) {
                        game.saveConfig('low_performance', bool);
                        if (bool) {
                            ui.window.classList.add('low_performance');
                        }
                        else {
                            ui.window.classList.remove('low_performance');
                        }
                    }
                },
                compatiblemode: {
                    name: '兼容模式',
                    init: false,
                    intro: '开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭',
                    onclick: function (bool) {
                        game.saveConfig('compatiblemode', bool);
                        if (bool) {
                            ui.window.classList.add('compatiblemode');
                        }
                        else {
                            ui.window.classList.remove('compatiblemode');
                        }
                    }
                },
                confirm_exit: {
                    name: '确认退出',
                    init: false,
                    unfrequent: true,
                    intro: '离开游戏前弹出确认对话框',
                },
                keep_awake: {
                    name: '屏幕常亮',
                    init: false,
                    unfrequent: true,
                    intro: '防止屏幕自动关闭<br>注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量',
                    onclick: function (bool) {
                        game.saveConfig('keep_awake', bool);
                        if (bool) {
                            if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
                            else if (window.noSleep) {
                                document.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function enableNoSleepX() {
                                    document.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', enableNoSleepX, false);
                                    window.noSleep.enable();
                                }, false);
                            }
                        }
                        else {
                            if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
                            else if (window.noSleep) window.noSleep.disable();
                        }
                    }
                },
                auto_confirm: {
                    name: '自动确认',
                    init: true,
                    unfrequent: true,
                    intro: '当候选目标只有1个时，点击目标后无需再点击确认',
                },
                skip_shan: {
                    name: '无闪自动取消',
                    init: false,
                    unfrequent: true,
                    intro: '当自己需要使用或打出【闪】时，若自己没有【闪】，则跳过该步骤',
                },
                unauto_choose: {
                    name: '拆顺手牌选择',
                    init: false,
                    unfrequent: true,
                    intro: '拆牌或者顺牌时，就算只能选择对方的手牌依然手动选择',
                },
                wuxie_self: {
                    name: '不无懈自己',
                    init: true,
                    unfrequent: true,
                    intro: '自己使用的单目标普通锦囊即将生效时，不询问无懈',
                },
                tao_enemy: {
                    name: '不对敌方出桃',
                    init: false,
                    intro: '双方阵营明确的模式中（如对决），敌方角色濒死时不询问出桃',
                    unfrequent: true,
                },
                enable_drag: {
                    name: '启用拖拽',
                    init: true,
                    intro: '按住卡牌后可将卡牌拖至目标',
                    unfrequent: true,
                },
                enable_dragline: {
                    name: '拖拽指示线',
                    init: true,
                    unfrequent: true,
                    intro: '拖拽时显示虚线，可能降低游戏速度',
                },
                enable_touchdragline: {
                    name: '拖拽指示线',
                    init: false,
                    unfrequent: true,
                    intro: '拖拽时显示虚线，可能降低游戏速度',
                },
                // enable_pressure:{
                //     name:'启用压感',
                //     init:false,
                //     intro:'开启后可通过按压执行操作',
                //     unfrequent:true,
                // },
                // pressure_taptic:{
                //     name:'触觉反馈',
                //     init:false,
                //     intro:'开启后按压操作执行时将产生震动',
                //     unfrequent:true,
                // },
                // pressure_click:{
                //     name:'按压操作',
                //     init:'pause',
                //     intro:'在空白区域按压时的操作',
                //     unfrequent:true,
                //     item:{
                //         pause:'暂停',
                //         config:'选项',
                //         auto:'托管',
                //     }
                // },
                touchscreen: {
                    name: '触屏模式',
                    init: false,
                    restart: true,
                    unfrequent: true,
                    intro: '开启后可使触屏设备反应更快，但无法使用鼠标操作',
                    onclick: function (bool) {
                        if (get.is.nomenu('touchscreen', bool)) return false;
                        game.saveConfig('touchscreen', bool);
                    }
                },
                swipe: {
                    name: '滑动手势',
                    init: true,
                    unfrequent: true,
                    intro: '在非滚动区域向四个方向滑动可执行对应操作',
                },
                swipe_down: {
                    name: '下划操作',
                    init: 'menu',
                    unfrequent: true,
                    intro: '向下滑动时执行的操作',
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_down', item)) return false;
                        game.saveConfig('swipe_down', item);
                    }
                },
                swipe_up: {
                    name: '上划操作',
                    intro: '向上滑动时执行的操作',
                    init: 'auto',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_up', item)) return false;
                        game.saveConfig('swipe_up', item);
                    }
                },
                swipe_left: {
                    name: '左划操作',
                    intro: '向左滑动时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_left', item)) return false;
                        game.saveConfig('swipe_left', item);
                    }
                },
                swipe_right: {
                    name: '右划操作',
                    intro: '向右滑动时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_right', item)) return false;
                        game.saveConfig('swipe_right', item);
                    }
                },
                round_menu_func: {
                    name: '触屏按钮操作',
                    intro: '点击屏幕中圆形按钮时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管'
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('round_menu_func', item)) return false;
                        game.saveConfig('round_menu_func', item);
                    },
                },
                show_splash: {
                    name: '显示开始界面',
                    intro: '游戏开始前进入模式选择画面',
                    init: 'init',
                    item: {
                        off: '关闭',
                        init: '首次启动',
                        always: '保持开启',
                    }
                },
                game_speed: {
                    name: '游戏速度',
                    init: 'mid',
                    item: {
                        vslow: '慢',
                        slow: '较慢',
                        mid: '中',
                        fast: '较快',
                        vfast: '快',
                        vvfast: '很快',
                    },
                    intro: '设置不同游戏操作间的时间间隔'
                },
                sync_speed: {
                    name: '限制结算速度',
                    intro: '在动画结算完成前不执行下一步操作，开启后游戏操作的间隔更长但画面更浏畅，在游戏较卡时建议开启',
                    init: true
                },
                enable_vibrate: {
                    name: '开启震动',
                    intro: '回合开始时使手机震动',
                    init: false
                },
                right_click: {
                    name: '右键操作',
                    init: 'pause',
                    intro: '在空白区域点击右键时的操作',
                    unfrequent: true,
                    item: {
                        pause: '暂停',
                        shortcut: '工具',
                        config: '选项',
                        auto: '托管',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('right_click', item)) return false;
                        game.saveConfig('right_click', item);
                    }
                },
                longpress_info: {
                    name: '长按显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '长按后弹出菜单',
                },
                right_info: {
                    name: '右键显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '右键点击后弹出菜单',
                },
                hover_all: {
                    name: '悬停显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '悬停后弹出菜单',
                },
                hover_handcard: {
                    name: '悬停手牌显示信息',
                    init: true,
                    unfrequent: true,
                    intro: '悬停手牌后弹出菜单',
                },
                hoveration: {
                    name: '悬停菜单弹出时间',
                    unfrequent: true,
                    intro: '鼠标移至目标到弹出菜单的时间间隔',
                    init: '1000',
                    item: {
                        '500': '0.5秒',
                        '700': '0.7秒',
                        '1000': '1秒',
                        '1500': '1.5秒',
                        '2500': '2.5秒',
                    }
                },
                doubleclick_intro: {
                    name: '双击显示武将资料',
                    init: true,
                    unfrequent: true,
                    intro: '双击武将头像后显示其资料卡',
                },
                video: {
                    name: '保存录像',
                    init: '20',
                    intro: '游戏结束后保存录像在最大条数，超过后将从最早的录像开始删除（已收藏的录像不计入条数）',
                    item: {
                        '0': '关闭',
                        '5': '五局',
                        '10': '十局',
                        '20': '二十局',
                        '50': '五十局',
                        '10000': '无限',
                    },
                    unfrequent: true,
                },
                max_loadtime: {
                    name: '最长载入时间',
                    intro: '设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间',
                    init: '10000',
                    unfrequent: true,
                    item: {
                        5000: '5秒',
                        10000: '10秒',
                        20000: '20秒',
                        60000: '60秒'
                    },
                    onclick: function (item) {
                        game.saveConfig('max_loadtime', item);
                        if (item == '5000') {
                            localStorage.removeItem(lib.configprefix + 'loadtime');
                        }
                        else {
                            localStorage.setItem(lib.configprefix + 'loadtime', item);
                        }
                    }
                },
                mousewheel: {
                    name: '滚轮控制手牌',
                    init: true,
                    unfrequent: true,
                    intro: '开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭',
                    onclick: function (bool) {
                        game.saveConfig('mousewheel', bool);
                        if (lib.config.touchscreen) return;
                        if (lib.config.mousewheel) {
                            ui.handcards1Container.onmousewheel = ui.click.mousewheel;
                            ui.handcards2Container.onmousewheel = ui.click.mousewheel;
                        }
                        else {
                            ui.handcards1Container.onmousewheel = null;
                            ui.handcards2Container.onmousewheel = null;
                        }
                    }
                },
                auto_check_update: {
                    name: '自动检查游戏更新',
                    intro: '进入游戏时检查更新',
                    init: true,
                    unfrequent: true
                },
                lucky_star: {
                    name: '幸运星模式',
                    intro: '在涉及随机数等的技能中，必定得到效果最好的结果。（联机模式无效）',
                    init: false,
                    unfrequent: true
                },
                dev: {
                    name: '开发者模式',
                    intro: '开启后可使用浏览器控制台控制游戏，同时可更新到开发版',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('dev', bool);
                        if (_status.connectMode) return;
                        if (bool) {
                            lib.cheat.i();
                        }
                        else {
                            delete window.cheat;
                            delete window.game;
                            delete window.ui;
                            delete window.get;
                            delete window.ai;
                            delete window.lib;
                            delete window._status;
                        }
                    },
                    unfrequent: true,
                },
                errstop: {
                    name: '出错时停止游戏',
                    init: false,
                    unfrequent: true
                },
                update_link: {
                    name: '更新地址',
                    init: 'coding',
                    unfrequent: true,
                    item: {
                        coding: 'Coding',
                        // github: 'GitHub',
                    },
                    onclick: function (item) {
                        game.saveConfig('update_link', item);
                        lib.updateURL = lib.updateURLS[item] || lib.updateURLS.coding;
                    },
                },
                //https://raw.githubusercontent.com/libccy/noname-extension/master/
                extension_source: {
                    name: '获取扩展地址',
                    init: 'Coding',
                    unfrequent: true,
                    item: {},
                    intro: function () {
                        return '获取在线扩展时的地址。当前地址：<br>' + lib.config.extension_sources[lib.config.extension_source];
                    },
                    onclick: function (item) {
                        game.saveConfig('extension_source', item);
                    },
                },
                extension_create: {
                    name: '添加获取扩展地址',
                    clear: true,
                    unfrequent: true,
                    onclick: function () {
                        game.prompt('请输入地址名称', function (str) {
                            if (str) {
                                var map = lib.config.extension_sources;
                                game.prompt('请输入' + str + '的地址', function (str2) {
                                    if (str2) {
                                        delete map[str];
                                        map[str] = str2;
                                        game.saveConfig('extension_sources', map);
                                        game.saveConfig('extension_source', str);
                                        var nodexx = ui.extension_source;
                                        nodexx.updateInner();
                                        var nodeyy = nodexx._link.menu;
                                        var nodezz = nodexx._link.config;
                                        for (var i = 0; i < nodeyy.childElementCount; i++) {
                                            if (nodeyy.childNodes[i]._link == str) {
                                                nodeyy.childNodes[i].remove();
                                                break;
                                            }
                                        }
                                        var textMenu = ui.create.div('', str, nodeyy, function () {
                                            var node = this.parentNode._link;
                                            var config = node._link.config;
                                            node._link.current = this.link;
                                            var tmpName = node.lastChild.innerHTML;
                                            node.lastChild.innerHTML = config.item[this._link];
                                            if (config.onclick) {
                                                if (config.onclick.call(node, this._link, this) === false) {
                                                    node.lastChild.innerHTML = tmpName;
                                                }
                                            }
                                            if (config.update) {
                                                config.update();
                                            }
                                        });
                                        textMenu._link = str;
                                        nodezz.item[name] = str;
                                        alert('已添加扩展地址：' + str);
                                    }
                                })
                            }
                        });
                    },
                },
                extension_delete: {
                    name: '删除当前扩展地址',
                    clear: true,
                    unfrequent: true,
                    onclick: function () {
                        var bool = false, map = lib.config.extension_sources;
                        for (var i in map) {
                            if (i != lib.config.extension_source) {
                                bool = true;
                                break;
                            }
                        }
                        if (!bool) {
                            alert('不能删除最后一个扩展地址！');
                            return;
                        }
                        var name = lib.config.extension_source;
                        game.saveConfig('extension_source', i);
                        delete map[name];
                        game.saveConfig('extension_sources', map);
                        var nodexx = ui.extension_source;
                        nodexx.updateInner();
                        var nodeyy = nodexx._link.menu;
                        var nodezz = nodexx._link.config;
                        for (var i = 0; i < nodeyy.childElementCount; i++) {
                            if (nodeyy.childNodes[i]._link == name) {
                                nodeyy.childNodes[i].remove();
                                break;
                            }
                        }
                        delete nodezz.item[name];
                        alert('已删除扩展地址：' + name);
                    },
                },
                update: function (config, map) {
                    if ('ontouchstart' in document) {
                        map.touchscreen.show();
                    }
                    else {
                        map.touchscreen.hide();
                    }
                    if (lib.device || lib.node) {
                        map.auto_check_update.show();
                    }
                    else {
                        map.auto_check_update.hide();
                    }
                    if (lib.device) {
                        map.enable_vibrate.show();
                        map.keep_awake.show();
                    }
                    else {
                        map.enable_vibrate.hide();
                        map.keep_awake.hide();
                    }
                    // if(config.enable_pressure){
                    //     map.pressure_click.show();
                    //     if(lib.device){
                    //         map.pressure_taptic.show();
                    //     }
                    //     else{
                    //         map.pressure_taptic.hide();
                    //     }
                    // }
                    // else{
                    //     map.pressure_click.hide();
                    //     map.pressure_taptic.hide();
                    // }
                    if (lib.config.touchscreen) {
                        map.mousewheel.hide();
                        map.hover_all.hide();
                        map.hover_handcard.hide();
                        map.hoveration.hide();
                        map.right_info.hide();
                        map.right_click.hide();
                        map.longpress_info.show();
                        map.swipe.show();
                        if (lib.config.swipe) {
                            map.swipe_up.show();
                            map.swipe_down.show();
                            map.swipe_left.show();
                            map.swipe_right.show();
                        }
                        else {
                            map.swipe_up.hide();
                            map.swipe_down.hide();
                            map.swipe_left.hide();
                            map.swipe_right.hide();
                        }
                    }
                    else {
                        map.mousewheel.show();
                        map.hover_all.show();
                        map.right_info.show();
                        map.right_click.show();
                        map.longpress_info.hide();
                        if (!config.hover_all) {
                            map.hover_handcard.hide();
                            map.hoveration.hide();
                        }
                        else {
                            map.hover_handcard.show();
                            map.hoveration.show();
                        }
                        map.swipe.hide();
                        map.swipe_up.hide();
                        map.swipe_down.hide();
                        map.swipe_left.hide();
                        map.swipe_right.hide();
                    }
                    if (lib.config.enable_drag) {
                        if (lib.config.touchscreen) {
                            map.enable_dragline.hide();
                            map.enable_touchdragline.show();
                        }
                        else {
                            map.enable_dragline.show();
                            map.enable_touchdragline.hide();
                        }
                    }
                    else {
                        map.enable_dragline.hide();
                        map.enable_touchdragline.hide();
                    }
                    if (!get.is.phoneLayout()) {
                        map.round_menu_func.hide();
                    }
                    else {
                        map.round_menu_func.show();
                    }
                    if (!lib.node && lib.device != 'ios') {
                        map.confirm_exit.show();
                    }
                    else {
                        map.confirm_exit.hide();
                    }
                    if (config.dev) {
                        map.errstop.show();
                    }
                    else {
                        map.errstop.hide();
                    }
                }
            }
        },
        /**
         * 外观设置
         * @name configMenu.appearence
         * @type {!Object}
         */
        appearence: {
            name: '外观',
            config: {
                theme: {
                    name: '主题',
                    init: 'vk',
                    item: {},
                    visualMenu: function (node, link) {
                        if (!node.menu) {
                            node.className = 'button character themebutton ' + link;
                            node.menu = ui.create.div(node, '', '<div></div><div></div><div></div><div></div>');
                        }
                    },
                    onclick: function (theme) {
                        game.saveConfig('theme', theme);
                        ui.arena.hide();
                        lib.init.background();
                        if (lib.config.autostyle) {
                            if (theme == 'simple') {
                                lib.configMenu.appearence.config.player_border.onclick('slim');
                            }
                            else {
                                lib.configMenu.appearence.config.player_border.onclick('normal');
                            }
                        }
                        setTimeout(function () {
                            var theme = ui.css.theme;
                            ui.css.theme = lib.init.css(lib.assetURL + 'theme/' + lib.config.theme, 'style');
                            theme.remove();
                            setTimeout(function () { ui.arena.show(); }, 100);
                        }, 500);
                    }
                },
                /**
                 * 游戏布局
                 * @name configMenu.appearence.layout
                 */
                layout: {
                    name: '布局',
                    init: 'mobile',
                    item: {
                        default: '旧版',
                        newlayout: '对称',
                        mobile: '默认',
                        long: '宽屏',
                        long2: '手杀',
                        nova: '新版'
                    },
                    visualMenu: function (node, link) {
                        node.className = 'button character themebutton ' + lib.config.theme;
                        if (!node.created) {
                            node.created = true;
                            node.style.overflow = 'hidden';
                            node.firstChild.style.display = 'none';
                            var me = ui.create.div(node);
                            me.style.top = 'auto';
                            if (link == 'default' || link == 'newlayout') {
                                me.style.width = 'calc(100% - 6px)';
                                me.style.left = '3px';
                                me.style.bottom = '3px';
                                me.style.height = '25px';
                                if (link == 'newlayout') {
                                    me.style.height = '23px';
                                    me.style.bottom = '4px';
                                }
                            }
                            else if (link == 'long2' || link == 'nova') {
                                me.style.display = 'none';
                            }
                            else {
                                me.style.width = '120%';
                                me.style.left = '-10%';
                                me.style.bottom = '0';
                                me.style.height = '22px';
                            }
                            me.style.borderRadius = '2px';
                            var list = ['KizunaAI', 'MiraiAkari', 'Siro', 'Nekomasu'];
                            for (var i = 0; i < 4; i++) {
                                var player = ui.create.div('.fakeplayer', node);
                                ui.create.div('.avatar', player).setBackground(list.randomRemove(), 'character');
                                player.style.borderRadius = '2px';
                                if (i != 3) {
                                    player.style.top = 'auto';
                                }
                                if (link == 'default') {
                                    player.style.height = '19px';
                                    player.style.width = '38px';
                                    player.classList.add('oldlayout')
                                }
                                else if (link == 'mobile' || link == 'newlayout') {
                                    player.style.width = '24px';
                                    player.style.height = '29px';
                                }
                                else if (link == 'nova') {
                                    player.style.width = '20px';
                                    player.style.height = '24px';
                                }
                                else {
                                    player.style.width = '20px';
                                    player.style.height = '34px';
                                }
                                if (i == 1) {
                                    player.style.left = '3px';
                                }
                                if (i == 2) {
                                    player.style.left = 'auto';
                                    player.style.right = '3px';
                                }
                                if (i == 3) {
                                    player.style.top = '3px';
                                }
                                if (link == 'default') {
                                    if (i == 0) {
                                        player.style.bottom = '6px';
                                    }
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 18px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '36px';
                                    }
                                }
                                else if (link == 'newlayout') {
                                    if (i == 0) {
                                        player.style.bottom = '1px';
                                    }
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 12px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '32px';
                                    }
                                }
                                else if (link == 'mobile') {
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 12px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '30px';
                                    }
                                }
                                else if (link == 'long') {
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '45px';
                                    }
                                }
                                else if (link == 'long2') {
                                    if (i == 0) {
                                        player.style.bottom = '2px';
                                        player.style.left = '3px';
                                    }
                                    if (i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '45px';
                                    }
                                }
                                else if (link == 'nova') {
                                    if (i == 0) {
                                        player.style.bottom = '2px';
                                        player.style.left = '3px';
                                    }
                                    if (i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.left = '3px';
                                        player.style.bottom = (i * 30) + 'px';
                                    }
                                }

                                if (i == 0 && (link == 'mobile' || link == 'long')) {
                                    player.classList.add('me');
                                    player.style.borderRadius = '0px';
                                    player.style.width = '25px';
                                    player.style.height = '25px';
                                    player.style.bottom = '-3px';
                                    player.style.left = '-3px';
                                }
                            }
                        }
                    },
                    onclick: function (layout) {
                        if (lib.layoutfixed.contains(lib.config.mode)) {
                            game.saveConfig('layout', layout);
                        }
                        else {
                            lib.init.layout(layout);
                        }
                    }
                },
                // fewplayer:{
                //     name:'启用人数',
                //     intro:'设置启用新版布局的最小人数（不足时切换至默认布局）',
                //     init:'3',
                //     // unfrequent:true,
                //     item:{
                //                  '2':'两人',
                //                  '3':'三人',
                //                  '4':'四人',
                //                  '5':'五人',
                //                  '6':'六人',
                //                  '7':'七人',
                //                  '8':'八人',
                //     },
                //     onclick:function(item){
                //                  game.saveConfig('fewplayer',item);
                //                  if(ui.arena) ui.arena.setNumber(ui.arena.dataset.number);
                //     }
                // },
                player_height: {
                    name: '角色高度',
                    init: 'long',
                    // unfrequent:true,
                    item: {
                        short: '矮',
                        default: '中',
                        long: '高',
                    },
                    onclick: function (item) {
                        game.saveConfig('player_height', item);
                        ui.arena.dataset.player_height = item;
                    }
                },
                player_height_nova: {
                    name: '角色高度',
                    init: 'short',
                    item: {
                        // auto:'自动',
                        short: '矮',
                        default: '中',
                        long: '高',
                    },
                    onclick: function (item) {
                        game.saveConfig('player_height_nova', item);
                        // if(item=='auto'){
                        //     if(parseInt(ui.arena.dataset.number)>=7){
                        //         ui.arena.dataset.player_height_nova='short';
                        //     }
                        //     else{
                        //         ui.arena.dataset.player_height_nova='default';
                        //     }
                        // }
                        // else{
                        ui.arena.dataset.player_height_nova = item;
                        // }
                    }
                },
                // background_color_music:{
                //     name:'背景色',
                //     init:'black',
                //     item:{
                //         blue:'蓝色',
                //         black:'黑色',
                //     },
                //     onclick:function(color){
                //         game.saveConfig('background_color_music',color);
                //         document.body.dataset.background_color_music=color;
                //     }
                // },
                // background_color_wood:{
                //     name:'背景色',
                //     init:'blue',
                //     item:{
                //         blue:'蓝色',
                //         black:'黑色',
                //     },
                //     onclick:function(color){
                //         game.saveConfig('background_color_wood',color);
                //         document.body.dataset.background_color_wood=color;
                //     }
                // },
                // theme_color_music:{
                //     name:'主题色',
                //     init:'black',
                //     item:{
                //         blue:'蓝色',
                //         black:'黑色',
                //     },
                //     onclick:function(color){
                //         game.saveConfig('theme_color_music',color);
                //         document.body.dataset.theme_color_music=color;
                //     }
                // },
                ui_zoom: {
                    name: '界面缩放',
                    unfrequent: true,
                    init: 'normal',
                    item: {
                        esmall: '80%',
                        vsmall: '90%',
                        small: '95%',
                        normal: '100%',
                        big: '105%',
                        vbig: '110%',
                        ebig: '120%',
                    },
                    onclick: function (zoom) {
                        game.saveConfig('ui_zoom', zoom);
                        switch (zoom) {
                            case 'esmall': zoom = 0.8; break;
                            case 'vsmall': zoom = 0.9; break;
                            case 'small': zoom = 0.93; break;
                            case 'big': zoom = 1.05; break;
                            case 'vbig': zoom = 1.1; break;
                            case 'ebig': zoom = 1.2; break;
                            default: zoom = 1;
                        }
                        game.documentZoom = game.deviceZoom * zoom;
                        ui.updatez();
                    }
                },
                image_background: {
                    name: '游戏背景',
                    init: 'default',
                    item: {},
                    visualBar: function (node, item, create) {
                        if (node.created) {
                            node.lastChild.classList.remove('active');
                            return;
                        }
                        node.created = true;
                        ui.create.filediv('.menubutton', '添加背景', node, function (file) {
                            if (file) {
                                var name = file.name;
                                if (name.indexOf('.') != -1) {
                                    name = name.slice(0, name.indexOf('.'));
                                }
                                var link = (game.writeFile ? 'cdv_' : 'custom_') + name;
                                if (item[link]) {
                                    for (var i = 1; i < 1000; i++) {
                                        if (!item[link + '_' + i]) {
                                            link = link + '_' + i; break;
                                        }
                                    }
                                }
                                item[link] = name;
                                var callback = function () {
                                    create(link, node.parentNode.defaultNode);
                                    node.parentNode.updateBr();
                                    lib.config.customBackgroundPack.add(link);
                                    game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
                                };
                                if (game.writeFile) {
                                    game.writeFile(file, 'image/background', link + '.jpg', callback);
                                }
                                else {
                                    game.putDB('image', link, file, callback);
                                }
                                if (node.lastChild.classList.contains('active')) {
                                    editbg.call(node.lastChild);
                                }
                            }
                        }).inputNode.accept = 'image/*';
                        var editbg = function () {
                            this.classList.toggle('active');
                            var page = this.parentNode.parentNode;
                            for (var i = 0; i < page.childElementCount; i++) {
                                if (page.childNodes[i].classList.contains('button')) {
                                    var link = page.childNodes[i]._link;
                                    if (link && link != 'default') {
                                        var str;
                                        if (this.classList.contains('active')) {
                                            if (link.indexOf('custom_') == 0 || link.indexOf('cdv_') == 0) {
                                                str = '删除';
                                            }
                                            else {
                                                str = '隐藏';
                                            }
                                        }
                                        else {
                                            str = item[link];
                                        }
                                        page.childNodes[i].firstChild.innerHTML = get.verticalStr(str);
                                    }
                                }
                            }
                        };
                        ui.create.div('.menubutton', '编辑背景', node, editbg);
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundImage = '';
                        node.style.backgroundSize = '';
                        if (node.firstChild) {
                            node.firstChild.innerHTML = get.verticalStr(name);
                        }
                        if (link == 'default' || link.indexOf('custom_') == 0) {
                            node.style.backgroundImage = 'none';
                            node.classList.add('dashedmenubutton');
                            if (link.indexOf('custom_') == 0) {
                                game.getDB('image', link, function (fileToLoad) {
                                    if (!fileToLoad) return;
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        var data = fileLoadedEvent.target.result;
                                        node.style.backgroundImage = 'url(' + data + ')';
                                        node.style.backgroundSize = 'cover';
                                        node.classList.remove('dashedmenubutton');
                                    };
                                    fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                });
                            }
                            else {
                                node.parentNode.defaultNode = node;
                            }
                        }
                        else {
                            if (link.indexOf('svg_') == 0) {
                                node.setBackgroundImage('image/background/' + link.slice(4) + '.svg');
                            }
                            else {
                                node.setBackgroundImage('image/background/' + link + '.jpg');
                            }
                            node.style.backgroundSize = 'cover';
                        }
                    },
                    onclick: function (background, node) {
                        if (node && node.firstChild) {
                            var menu = node.parentNode;
                            if (node.firstChild.innerHTML == get.verticalStr('隐藏')) {
                                menu.parentNode.noclose = true;
                                node.remove();
                                menu.updateBr();
                                if (!lib.config.prompt_hidebg) {
                                    alert('隐藏的背景可通过选项-其它-重置隐藏内容恢复');
                                    game.saveConfig('prompt_hidebg', true);
                                }
                                lib.config.hiddenBackgroundPack.add(background);
                                game.saveConfig('hiddenBackgroundPack', lib.config.hiddenBackgroundPack);
                                delete lib.configMenu.appearence.config.image_background.item[background];
                                if (lib.config.image_background == background) {
                                    background = 'default';
                                    this.lastChild.innerHTML = '默认';
                                }
                                else {
                                    this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
                                    return;
                                }
                            }
                            else if (node.firstChild.innerHTML == get.verticalStr('删除')) {
                                menu.parentNode.noclose = true;
                                if (confirm('是否删除此背景？（此操作不可撤销）')) {
                                    node.remove();
                                    menu.updateBr();
                                    lib.config.customBackgroundPack.remove(background);
                                    game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
                                    if (background.indexOf('cdv_') == 0) {
                                        game.removeFile('image/background/' + background + '.jpg');
                                    }
                                    else {
                                        game.deleteDB('image', background);
                                    }
                                    delete lib.configMenu.appearence.config.image_background.item[background];
                                    if (lib.config.image_background == background) {
                                        background = 'default';
                                        this.lastChild.innerHTML = '默认';
                                    }
                                    else {
                                        this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
                                        return;
                                    }
                                }
                            }
                        }
                        var animate = lib.config.image_background == 'default';
                        game.saveConfig('image_background', background);
                        lib.init.background();
                        ui.background.delete();
                        ui.background = ui.create.div('.background');

                        if (lib.config.image_background_blur) {
                            ui.background.style.filter = 'blur(8px)';
                            ui.background.style.webkitFilter = 'blur(8px)';
                            ui.background.style.transform = 'scale(1.05)';
                        }
                        else {
                            ui.background.style.filter = '';
                            ui.background.style.webkitFilter = '';
                            ui.background.style.transform = '';
                        }

                        document.body.insertBefore(ui.background, document.body.firstChild);
                        if (animate) ui.background.animate('start');
                        if (lib.config.image_background == 'default') {
                            ui.background.style.backgroundImage = "none";
                        }
                        else if (lib.config.image_background.indexOf('custom_') == 0) {
                            ui.background.style.backgroundImage = "none";
                            game.getDB('image', lib.config.image_background, function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    ui.background.style.backgroundImage = 'url(' + data + ')';
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else {
                            if (lib.config.image_background.indexOf('svg_') == 0) {
                                ui.background.setBackgroundImage('image/background/' + lib.config.image_background.slice(4) + '.svg');
                                if(ui.backgroundFlash){
                                    ui.backgroundFlash.delete()
                                    delete ui.backgroundFlash
                                }
                            }
                            else {
                                ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
                                if(!ui.backgroundFlash){
                                    ui.backgroundFlash = ui.create.div('.background', ui.background);
                                    ui.backgroundFlash.style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.4) 60%,rgba(255, 255, 255, 0.6))`;
                                    ui.backgroundFlash.style.mixBlendMode = 'overlay';
                                    ui.backgroundSVG = ui.create.div('.background.slow_flash', ui.backgroundFlash);
                                    ui.backgroundSVG.style.backgroundImage = `url("${lib.assetURL}image/background/simple1_bg.svg")`;
                                }
                            }
                        }
                        ui.background.style.backgroundSize = 'cover';
                        ui.background.style.backgroundPosition = '50% 50%';
                    },
                },
                image_background_random: {
                    name: '随机背景',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('image_background_random', bool);
                        lib.init.background();
                    }
                },
                image_background_blur: {
                    name: '背景模糊',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('image_background_blur', bool);
                        if (lib.config.image_background_blur) {
                            ui.background.style.filter = 'blur(8px)';
                            ui.background.style.webkitFilter = 'blur(8px)';
                            ui.background.style.transform = 'scale(1.05)';
                        }
                        else {
                            ui.background.style.filter = '';
                            ui.background.style.webkitFilter = '';
                            ui.background.style.transform = '';
                        }
                    },
                },
                phonelayout: {
                    name: '触屏布局',
                    init: false,
                    onclick: function (bool) {
                        if (get.is.nomenu('phonelayout', bool)) return false;
                        game.saveConfig('phonelayout', bool);
                        if (get.is.phoneLayout()) {
                            ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
                            ui.arena.classList.add('phone');
                        }
                        else {
                            ui.css.phone.href = '';
                            ui.arena.classList.remove('phone');
                        }
                    }
                },
                change_skin: {
                    name: '开启换肤',
                    init: true,
                    intro: '在武将的右键菜单中换肤，皮肤可在选项-文件-图片文件-皮肤图片中添加'
                },
                change_skin_auto: {
                    name: '自动换肤',
                    init: 'off',
                    item: {
                        'off': '关闭',
                        '30000': '半分钟',
                        '60000': '一分钟',
                        '120000': '两分钟',
                        '300000': '五分钟',
                    },
                    intro: '游戏每进行一段时间自动为一个随机角色更换皮肤',
                    onclick: function (item) {
                        game.saveConfig('change_skin_auto', item);
                        clearTimeout(_status.skintimeout);
                        if (item != 'off') {
                            _status.skintimeout = setTimeout(ui.click.autoskin, parseInt(item));
                        }
                    }
                },
                card_style: {
                    name: '卡牌样式',
                    init: 'default',
                    intro: '设置正面朝上的卡牌的样式',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '原版',
                        ol: '手杀',
                        // new:'新版',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'card_style', file, function () {
                                    game.getDB('image', 'card_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button card fullskin';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'card_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.card_style == 'custom') {
                                    lib.configMenu.appearence.config.card_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button card fullskin';
                        node.style.backgroundSize = '100% 100%';
                        switch (link) {
                            case 'default': case 'custom': {
                                if (lib.config.theme == 'simple') {
                                    node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
                                    node.className = 'button character';
                                }
                                else {
                                    node.style.backgroundImage = 'none';
                                    node.className = 'button character dashedmenubutton';
                                }
                                break;
                            }
                            case 'new': node.setBackgroundImage('theme/style/card/image/new.png'); break;
                            case 'ol': node.setBackgroundImage('theme/style/card/image/ol.png'); break;
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
                            case 'music': node.setBackgroundImage('theme/music/wood3.png'); break;
                            case 'simple': node.setBackgroundImage('theme/simple/card.png'); break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'card_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button card fullskin';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('card_style', layout);
                        var style = ui.css.card_style;
                        ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', lib.config.card_style);
                        style.remove();
                        if (ui.css.card_stylesheet) {
                            ui.css.card_stylesheet.remove();
                            delete ui.css.card_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'card_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.card_stylesheet) {
                                        ui.css.card_stylesheet.remove();
                                    }
                                    ui.css.card_stylesheet = lib.init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                cardback_style: {
                    name: '卡背样式',
                    intro: '设置背面朝上的卡牌的样式',
                    init: 'default',
                    item: {
                        // wood:'木纹',
                        // music:'音乐',
                        vk: 'V杀',
                        official: '原版',
                        // new:'新版',
                        feicheng: '废城',
                        liusha: '流沙',
                        ol: '手杀',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'cardback_style', file, function () {
                                    game.getDB('image', 'cardback_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        ui.create.filediv('.menubutton.deletebutton.addbutton', '添加翻转图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'cardback_style2', file, function () {
                                    node.classList.add('hideadd');
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'cardback_style');
                                game.deleteDB('image', 'cardback_style2');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                node.classList.remove('hideadd');
                                if (lib.config.cardback_style == 'custom') {
                                    lib.configMenu.appearence.config.cardback_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.style.backgroundSize = '100% 100%';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.className = 'button character dashedmenubutton';
                                break;
                            }
                            case 'vk': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/vk.png'); break;
                            case 'new': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/new.png'); break;
                            case 'feicheng': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/feicheng.png'); break;
                            case 'official': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/official.png'); break;
                            case 'liusha': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/liusha.png'); break;
                            case 'ol': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/ol.png'); break;
                            case 'wood': node.className = 'button card fullskin'; node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
                            case 'music': node.className = 'button card fullskin'; node.setBackgroundImage('theme/music/wood3.png'); break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'cardback_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    game.getDB('image', 'cardback_style2', function (file) {
                                        if (file) {
                                            node.parentNode.lastChild.classList.add('hideadd');
                                        }
                                    });
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('cardback_style', layout);
                        var style = ui.css.cardback_style;
                        ui.css.cardback_style = lib.init.css(lib.assetURL + 'theme/style/cardback', lib.config.cardback_style);
                        style.remove();
                        if (ui.css.cardback_stylesheet) {
                            ui.css.cardback_stylesheet.remove();
                            delete ui.css.cardback_stylesheet;
                        }
                        if (ui.css.cardback_stylesheet2) {
                            ui.css.cardback_stylesheet2.remove();
                            delete ui.css.cardback_stylesheet2;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'cardback_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet) {
                                        ui.css.cardback_stylesheet.remove();
                                    }
                                    ui.css.cardback_stylesheet = lib.init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                    game.getDB('image', 'cardback_style2', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            if (ui.css.cardback_stylesheet2) {
                                                ui.css.cardback_stylesheet2.remove();
                                            }
                                            ui.css.cardback_stylesheet2 = lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                hp_style: {
                    name: '体力条样式',
                    init: 'VK',
                    item: {
                        vk: 'VK',
                        default: '默认',
                        emotion: '表情',
                        glass: '勾玉',
                        round: '国战',
                        ol: '手杀',
                        // xinglass: '双鱼',
                        // xinround: 'OL',
                        custom: '自定',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton.addbutton', '添加图片', node, function (file) {
                            if (file && node.currentDB) {
                                game.putDB('image', 'hp_style' + node.currentDB, file, function () {
                                    game.getDB('image', 'hp_style' + node.currentDB, function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.childNodes[node.currentDB - 1].style.backgroundImage = 'url(' + data + ')';
                                            button.classList.add('shown');
                                            node.classList.add('showdelete');
                                            node.currentDB++;
                                            if (node.currentDB > 4) {
                                                node.classList.add('hideadd');
                                                button.classList.remove('transparent');
                                                delete node.currentDB;
                                            }
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'hp_style1');
                                game.deleteDB('image', 'hp_style2');
                                game.deleteDB('image', 'hp_style3');
                                game.deleteDB('image', 'hp_style4');
                                for (var i = 0; i < button.childElementCount; i++) {
                                    button.childNodes[i].style.backgroundImage = 'none';
                                }
                                node.classList.remove('showdelete');
                                node.classList.remove('hideadd');
                                if (lib.config.hp_style == 'custom') {
                                    lib.configMenu.appearence.config.hp_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                                button.classList.remove('shown');
                                node.currentDB = 1;
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = `button hpbutton dashedmenubutton ${link}Hp`;
                        node.innerHTML = '';
                        if(!ui.hpbutton)    ui.hpbutton = lib.init.css(lib.assetURL + 'theme/style/hp','hpbutton')
                        for (var i = 1; i <= 4; i++) {
                            var div = ui.create.div(node);
                            if (link == 'default') {
                                ui.create.div(div);
                            }
                            else if (link != 'custom') {
                                // div.setBackgroundImage(`theme/style/hp/image/${link}${i}.png`);
                            }
                            if (i == 4&&link !== 'vk') {
                                div.style.webkitFilter = 'grayscale(1)';
                            }
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            var getDB = function (num) {
                                node.parentNode.lastChild.currentDB = num;
                                game.getDB('image', 'hp_style' + num, function (fileToLoad) {
                                    if (!fileToLoad) return;
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        var data = fileLoadedEvent.target.result;
                                        node.childNodes[num - 1].style.backgroundImage = 'url(' + data + ')';
                                        node.classList.add('shown');
                                        node.parentNode.lastChild.classList.add('showdelete');
                                        if (num < 4) {
                                            getDB(num + 1);
                                        }
                                        else {
                                            node.parentNode.lastChild.classList.add('hideadd');
                                            node.classList.remove('transparent');
                                            delete node.parentNode.firstChild.currentDB;
                                        }
                                    };
                                    fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                });
                            }
                            getDB(1);
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('hp_style', layout);
                        var style = ui.css.hp_style;
                        ui.css.hp_style = lib.init.css(lib.assetURL + 'theme/style/hp', lib.config.hp_style);
                        style.remove();
                        if (ui.css.hp_stylesheet1) {
                            ui.css.hp_stylesheet1.remove();
                            delete ui.css.hp_stylesheet1;
                        }
                        if (ui.css.hp_stylesheet2) {
                            ui.css.hp_stylesheet2.remove();
                            delete ui.css.hp_stylesheet2;
                        }
                        if (ui.css.hp_stylesheet3) {
                            ui.css.hp_stylesheet3.remove();
                            delete ui.css.hp_stylesheet3;
                        }
                        if (ui.css.hp_stylesheet4) {
                            ui.css.hp_stylesheet4.remove();
                            delete ui.css.hp_stylesheet4;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'hp_style1', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet1) {
                                        ui.css.hp_stylesheet1.remove();
                                    }
                                    ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style2', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet2) {
                                        ui.css.hp_stylesheet2.remove();
                                    }
                                    ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style3', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet3) {
                                        ui.css.hp_stylesheet3.remove();
                                    }
                                    ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style4', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet4) {
                                        ui.css.hp_stylesheet4.remove();
                                    }
                                    ui.css.hp_stylesheet4 = lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                player_style: {
                    name: '角色背景',
                    init: 'simple',
                    intro: '设置角色的背景图片',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'player_style', file, function () {
                                    game.getDB('image', 'player_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            button.style.backgroundSize = '100% 100%';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'player_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.player_style == 'custom') {
                                    lib.configMenu.appearence.config.player_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = '';
                        node.style.height = '108px';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.className = 'button character dashedmenubutton';
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'player_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    node.style.backgroundSize = '100% 100%';
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('player_style', layout);
                        if (ui.css.player_stylesheet) {
                            ui.css.player_stylesheet.remove();
                            delete ui.css.player_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'player_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.player_stylesheet) {
                                        ui.css.player_stylesheet.remove();
                                    }
                                    ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646)'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                            }
                            ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:' + str + '}');
                        }
                    },
                    unfrequent: true,
                },
                border_style: {
                    name: '角色边框',
                    init: 'auto',
                    intro: '设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变',
                    item: {
                        gold: '金框',
                        silver: '银框',
                        bronze: '铜框',
                        dragon_gold: '金龙',
                        dragon_silver: '银龙',
                        dragon_bronze: '玉龙',
                        custom: '自定',
                        auto: '自动',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'border_style', file, function () {
                                    game.getDB('image', 'border_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            button.style.backgroundSize = '100% 100%';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'border_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.border_style == 'custom') {
                                    lib.configMenu.appearence.config.border_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = '';
                        node.style.height = '108px';
                        node.dataset.decoration = '';
                        if (link == 'default' || link == 'custom' || link == 'auto') {
                            node.style.backgroundImage = 'none';
                            node.className = 'button character dashedmenubutton';
                        }
                        else {
                            if (link.indexOf('dragon_') == 0) {
                                link = link.slice(7);
                                node.dataset.decoration = link;
                            }
                            node.setBackgroundImage('theme/style/player/' + link + '1.png');
                            node.style.backgroundSize = '100% 100%';
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'border_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    node.style.backgroundSize = '100% 100%';
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('border_style', layout);
                        if (ui.css.border_stylesheet) {
                            ui.css.border_stylesheet.remove();
                            delete ui.css.border_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'border_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.border_stylesheet) {
                                        ui.css.border_stylesheet.remove();
                                    }
                                    ui.css.border_stylesheet = lib.init.sheet();
                                    ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
                                    ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default' && layout != 'auto') {
                            ui.css.border_stylesheet = lib.init.sheet();
                            if (layout.indexOf('dragon_') == 0) {
                                layout = layout.slice(7);
                                ui.arena.dataset.framedecoration = layout;
                            }
                            else {
                                ui.arena.dataset.framedecoration = '';
                            }
                            ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '1.png")}', 0);
                            ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '3.png")}', 0);
                            ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
                        }
                    },
                    unfrequent: true,
                },
                autoborder_count: {
                    name: '边框升级方式',
                    intro: '<strong>击杀</strong> 每击杀一人，边框提升两级<br><strong>伤害</strong> 每造成两点伤害，边框提升一级<br><strong>混合</strong> 击杀量决定边框颜色，伤害量决定边框装饰',
                    init: 'mix',
                    item: {
                        kill: '击杀',
                        damage: '伤害',
                        mix: '混合',
                    },
                    unfrequent: true,
                },
                autoborder_start: {
                    name: '基础边框颜色',
                    init: 'bronze',
                    item: {
                        bronze: '铜',
                        silver: '银',
                        gold: '金'
                    },
                    unfrequent: true
                },
                player_border: {
                    name: '边框宽度',
                    init: 'normal',
                    intro: '设置角色的边框宽度',
                    unfrequent: true,
                    item: {
                        slim: '细',
                        narrow: '窄',
                        normal: '中',
                        wide: '宽'
                    },
                    onclick: function (item) {
                        game.saveConfig('player_border', item);
                        if (item != 'wide' || game.layout == 'long' || game.layout == 'long2') {
                            ui.arena.classList.add('slim_player');
                        }
                        else {
                            ui.arena.classList.remove('slim_player');
                        }
                        if (item == 'slim') {
                            ui.arena.classList.add('uslim_player');
                        }
                        else {
                            ui.arena.classList.remove('uslim_player');
                        }
                        if (item == 'narrow') {
                            ui.arena.classList.add('mslim_player');
                        }
                        else {
                            ui.arena.classList.remove('mslim_player');
                        }
                        if (item == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
                            ui.arena.classList.add('lslim_player');
                        }
                        else {
                            ui.arena.classList.remove('lslim_player');
                        }
                        ui.window.dataset.player_border = item;
                    }
                },
                menu_style: {
                    name: '菜单背景',
                    init: 'default',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'menu_style', file, function () {
                                    game.getDB('image', 'menu_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.style.backgroundSize = 'cover';
                                            button.className = 'button character';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'menu_style');
                                button.style.backgroundImage = 'none';
                                button.style.backgroundSize = 'auto';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.menu_style == 'custom') {
                                    lib.configMenu.appearence.config.menu_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = 'auto';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.classList.add('dashedmenubutton');
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood2.png'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'menu_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.style.backgroundSize = 'cover';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('menu_style', layout);
                        if (ui.css.menu_stylesheet) {
                            ui.css.menu_stylesheet.remove();
                            delete ui.css.menu_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'menu_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.menu_stylesheet) {
                                        ui.css.menu_stylesheet.remove();
                                    }
                                    ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
                            }
                            ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:' + str + '}');
                        }
                    },
                    unfrequent: true,
                },
                control_style: {
                    name: '按钮背景',
                    init: 'default',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'control_style', file, function () {
                                    game.getDB('image', 'control_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character controlbutton';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'control_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character controlbutton dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.control_style == 'custom') {
                                    lib.configMenu.appearence.config.control_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character controlbutton';
                        node.style.backgroundSize = '';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.classList.add('dashedmenubutton');
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'control_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character controlbutton';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('control_style', layout);
                        if (ui.css.control_stylesheet) {
                            ui.css.control_stylesheet.remove();
                            delete ui.css.control_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'control_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.control_stylesheet) {
                                        ui.css.control_stylesheet.remove();
                                    }
                                    ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
                            }
                            if (layout == 'wood') {
                                ui.css.control_stylesheet = lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:' + str + '}');
                            }
                            else {
                                ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:' + str + '}');
                            }
                        }
                    },
                    unfrequent: true,
                },
                custom_button: {
                    name: '自定义按钮高度',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        if (bool !== 'skip') {
                            game.saveConfig('custom_button', bool);
                        }
                        if (ui.css.buttonsheet) {
                            ui.css.buttonsheet.remove();
                        }
                        if (lib.config.custom_button) {
                            var cbnum1 = 6 + (parseInt(lib.config.custom_button_system_top) || 0);
                            var cbnum2 = 6 + (parseInt(lib.config.custom_button_system_bottom) || 0);
                            var cbnum3 = 3 + (parseInt(lib.config.custom_button_control_top) || 0);
                            var cbnum4 = 3 + (parseInt(lib.config.custom_button_control_bottom) || 0);
                            var cbnum5 = 2;
                            var cbnum6 = 2;
                            if (cbnum3 < 0) {
                                cbnum5 += cbnum3;
                                cbnum3 = 0;
                            }
                            if (cbnum4 < 0) {
                                cbnum6 += cbnum4;
                                cbnum4 = 0;
                            }
                            ui.css.buttonsheet = lib.init.sheet(
                                '#system>div>div, .caption>div>.tdnode{padding-top:' + cbnum1 + 'px !important;padding-bottom:' + cbnum2 + 'px !important}',
                                '#control>.control>div{padding-top:' + cbnum3 + 'px;padding-bottom:' + cbnum4 + 'px}',
                                '#control>.control{padding-top:' + cbnum5 + 'px;padding-bottom:' + cbnum6 + 'px}'
                            );
                        }
                    }
                },
                custom_button_system_top: {
                    name: '菜单上部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_system_top', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_system_bottom: {
                    name: '菜单下部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_system_bottom', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_control_top: {
                    name: '技能上部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_control_top', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_control_bottom: {
                    name: '技能下部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_control_bottom', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                radius_size: {
                    name: '圆角大小',
                    init: 'default',
                    item: {
                        off: '关闭',
                        reduce: '减小',
                        default: '默认',
                        increase: '增大',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('radius_size', item);
                        ui.window.dataset.radius_size = item;
                    }
                },
                glow_phase: {
                    name: '当前回合角色高亮',
                    unfrequent: true,
                    init: 'yellow',
                    intro: '设置当前回合角色的边框颜色',
                    item: {
                        none: '无',
                        yellow: '黄色',
                        green: '绿色',
                        purple: '紫色',
                    },
                    onclick: function (bool) {
                        game.saveConfig('glow_phase', bool);
                        lib.init.cssstyles();
                    }
                },
                fold_card: {
                    name: '折叠手牌',
                    init: true,
                    unfrequent: true,
                },
                fold_mode: {
                    name: '折叠模式菜单',
                    intro: '关闭后模式菜单中“更多”内的项目将直接展开',
                    init: true,
                    unfrequent: true,
                },
                seperate_control: {
                    name: '分离选项条',
                    init: true,
                    unfrequent: true,
                    intro: '开启后玩家在进行选择时不同的选项将分开，而不是连在一起',
                },
                blur_ui: {
                    name: '模糊效果',
                    intro: '在暂停或打开菜单时开启模糊效果',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('blur_ui', bool);
                        if (bool) {
                            ui.window.classList.add('blur_ui');
                        }
                        else {
                            ui.window.classList.remove('blur_ui');
                        }
                    }
                },
                glass_ui: {
                    name: '玻璃主题',
                    intro: '为游戏主题打开玻璃效果（手机暂不支持）',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('glass_ui', bool);
                        if (bool) {
                            ui.window.classList.add('glass_ui');
                        }
                        else {
                            ui.window.classList.remove('glass_ui');
                        }
                    }
                },
                damage_shake: {
                    name: '伤害抖动',
                    intro: '角色受到伤害时的抖动效果',
                    init: true,
                    unfrequent: true,
                },
                // button_press: {
                //     name: '按钮效果',
                //     intro: '选项条被按下时将有按下效果',
                //     init: true,
                //     unfrequent: true,
                // },
                jiu_effect: {
                    name: '喝酒效果',
                    init: true,
                    unfrequent: true,
                },
                animation: {
                    name: '游戏特效',
                    intro: '开启后出现属性伤害、回复体力等情况时会显示动画',
                    init: false,
                    unfrequent: true,
                },
                skill_animation_type: {
                    name: '技能特效',
                    intro: '开启后觉醒技、限定技将显示全屏文字',
                    init: 'default',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        old: '旧版',
                        off: '关闭'
                    }
                },
                die_move: {
                    name: '阵亡效果',
                    intro: '阵亡后武将的显示效果',
                    init: 'flip',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        move: '移动',
                        flip: '翻面',
                    }
                },
                target_shake: {
                    name: '目标效果',
                    intro: '一名玩家成为卡牌或技能的目标时的显示效果',
                    init: 'off',
                    item: {
                        off: '关闭',
                        zoom: '缩放',
                        shake: '抖动',
                    },
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('target_shake', bool);
                        ui.arena.dataset.target_shake = bool;
                    }
                },
                turned_style: {
                    name: '翻面文字',
                    intro: '角色被翻面时显示“翻面”',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('turned_style', bool);
                        if (bool) {
                            ui.arena.classList.remove('hide_turned');
                        }
                        else {
                            ui.arena.classList.add('hide_turned');
                        }
                    }
                },
                link_style2: {
                    name: '横置样式',
                    intro: '设置角色被横置时的样式',
                    init: 'chain',
                    unfrequent: true,
                    item: {
                        chain: '铁索',
                        rotate: '横置',
                        mark: '标记'
                    },
                    onclick: function (style) {
                        var list = [];
                        for (var i = 0; i < game.players.length; i++) {
                            if (game.players[i].isLinked()) {
                                list.push(game.players[i]);
                            }
                        }
                        game.saveConfig('link_style2', style);
                        for (var i = 0; i < list.length; i++) {
                            if (get.is.linked2(list[i])) {
                                list[i].classList.add('linked2');
                                list[i].classList.remove('linked');
                            }
                            else {
                                list[i].classList.add('linked');
                                list[i].classList.remove('linked2');
                            }
                        }
                        if (style == 'chain') {
                            ui.arena.classList.remove('nolink');
                        }
                        else {
                            ui.arena.classList.add('nolink');
                        }
                        ui.updatem();
                    }
                },
                cardshape: {
                    name: '手牌显示',
                    intro: '将手牌设置为正方形或长方形',
                    init: 'default',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        oblong: '长方',
                    },
                    onclick: function (item) {
                        var linked = false;
                        if (game.me && game.me.isLinked()) {
                            linked = true;
                        }
                        game.saveConfig('cardshape', item);
                        if (item == 'oblong' && (game.layout == 'long' || game.layout == 'mobile' || game.layout == 'long2' || game.layout == 'nova')) {
                            ui.arena.classList.add('oblongcard');
                            ui.window.classList.add('oblongcard');
                        }
                        else {
                            ui.arena.classList.remove('oblongcard');
                            ui.window.classList.remove('oblongcard');
                        }
                        if (linked) {
                            if (get.is.linked2(game.me)) {
                                game.me.classList.remove('linked');
                                game.me.classList.add('linked2');
                            }
                            else {
                                game.me.classList.add('linked');
                                game.me.classList.remove('linked2');
                            }
                        }
                    }
                },
                cardtempname: {
                    name: '视为卡牌名称显示',
                    intro: '显示强制视为类卡牌（如武魂）等名称的显示方式',
                    init: 'default',
                    unfrequent: true,
                    item: {
                        default: '纵向',
                        horizon: '横向',
                        off: '禁用',
                    },
                    onclick: function (item) {
                        game.saveConfig('cardtempname', item);
                        if (!game.me || !game.me.getCards) return;
                        var hs = game.me.getCards('h');
                        for (var i = 0; i < hs.length; i++) {
                            if (hs[i]._tempName) {
                                switch (item) {
                                    case 'default':
                                        var node = hs[i]._tempName;
                                        node.innerHTML = get.verticalStr(node.tempname);
                                        break;
                                    case 'horizon':
                                        var node = hs[i]._tempName;
                                        node.innerHTML = node.tempname;
                                        break;
                                    default:
                                        hs[i]._tempName.delete();
                                        delete hs[i]._tempName;
                                }
                            }
                        }
                    }
                },
                // textequip: {
                //     name: '装备显示',
                //     init: 'image',
                //     unfrequent: true,
                //     item: {
                //         image: '图片',
                //         text: '文字',
                //     },
                //     onclick: function (item) {
                //         game.saveConfig('textequip', item);
                //         if (item == 'text' && (game.layout == 'long' || game.layout == 'mobile')) {
                //             ui.arena.classList.add('textequip');
                //         }
                //         else {
                //             ui.arena.classList.remove('textequip');
                //         }
                //     }
                // },
                buttoncharacter_style: {
                    name: '选将样式',
                    init: 'default',
                    item: {
                        default: '默认',
                        simple: '精简',
                        old: '旧版'
                    },
                    unfrequent: true,
                },
                name_font: {
                    name: '人名字体',
                    init: 'Tiejili',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('name_font', font);
                        lib.init.cssstyles();
                    }
                },
                identity_font: {
                    name: '身份字体',
                    init: 'hyk2gj',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('identity_font', font);
                        lib.init.cssstyles();
                    }
                },
                cardtext_font: {
                    name: '卡牌字体',
                    init: 'Tiejili',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('cardtext_font', font);
                        lib.init.cssstyles();
                    }
                },
                global_font: {
                    name: '界面字体',
                    init: 'default',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        else {
                            node.style.fontFamily = "'STHeiti','SimHei','Microsoft JhengHei','Microsoft YaHei','WenQuanYi Micro Hei',Helvetica,Arial,sans-serif";
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('global_font', font);
                        lib.init.cssstyles();
                    }
                },
                update: function (config, map) {
                    if (lib.config.custom_button) {
                        map.custom_button_system_top.show();
                        map.custom_button_system_bottom.show();
                        map.custom_button_control_top.show();
                        map.custom_button_control_bottom.show();
                    }
                    else {
                        map.custom_button_system_top.hide();
                        map.custom_button_system_bottom.hide();
                        map.custom_button_control_top.hide();
                        map.custom_button_control_bottom.hide();
                    }
                    if (lib.config.change_skin) {
                        map.change_skin_auto.show();
                    }
                    else {
                        map.change_skin_auto.hide();
                    }
                    if (lib.config.image_background_random) {
                        map.image_background_blur.show();
                        map.image_background.hide();
                        // map.import_background.hide();
                    }
                    else {
                        map.image_background.show();
                        if (lib.config.image_background == 'default') {
                            map.image_background_blur.hide();
                        }
                        else {
                            map.image_background_blur.show();
                        }
                        // if(lib.config.image_background=='custom'&&lib.db){
                        //     map.import_background.show();
                        // }
                        // else{
                        //     map.import_background.hide();
                        // }
                    }
                    if (lib.config.layout == 'long' || lib.config.layout == 'mobile') {
                        // map.textequip.show();
                        map.cardshape.show();
                        map.phonelayout.show();
                    }
                    else {
                        // map.textequip.hide();
                        if (lib.config.layout == 'long2' || lib.config.layout == 'nova') {
                            map.phonelayout.show();
                            map.cardshape.show();
                        }
                        else {
                            map.phonelayout.hide();
                            map.cardshape.hide();
                        }
                    }
                    if (lib.config.layout == 'long') {
                        // map.fewplayer.show();
                        map.player_height.show();
                    }
                    else {
                        // map.fewplayer.hide();
                        if (lib.config.layout == 'long2') {
                            map.player_height.show();
                        }
                        else {
                            map.player_height.hide();
                        }
                    }
                    if (lib.config.layout == 'nova') {
                        map.player_height_nova.show();
                    }
                    else {
                        map.player_height_nova.hide();
                    }
                    if (lib.config.border_style == 'auto') {
                        map.autoborder_count.show();
                        map.autoborder_start.show();
                    }
                    else {
                        map.autoborder_count.hide();
                        map.autoborder_start.hide();
                    }
                },
            }
        },
        /**
         * 显示设置
         * @name configMenu.view
         * @type {!Object}
         */
        view: {
            name: '显示',
            config: {
                update: function (config, map) {
                    if (['versus', 'chess', 'tafang', 'boss', 'richer'].contains(lib.config.mode)) {
                        map.show_handcardbutton.show();
                    }
                    else {
                        map.show_handcardbutton.hide();
                    }
                    if (lib.config.touchscreen) {
                        map.pop_logv.hide();
                    }
                    else {
                        map.pop_logv.show();
                    }
                    if (lib.device) {
                        if (lib.device == 'android') {
                            map.show_statusbar_android.show();
                            map.show_statusbar_ios.hide();
                        }
                        else if (lib.device == 'ios') {
                            map.show_statusbar_ios.show();
                            map.show_statusbar_android.hide();
                        }
                        if (!game.download) {
                            setTimeout(function () {
                                if (!window.StatusBar) {
                                    map.show_statusbar.hide();
                                }
                            }, 5000);
                        }
                    }
                    else {
                        map.show_statusbar_ios.hide();
                        map.show_statusbar_android.hide();
                    }
                    if (get.is.phoneLayout()) {
                        map.remember_round_button.show();
                        map.popequip.show();
                        map.filternode_button.show();
                        map.show_pause.hide();
                        map.show_auto.hide();
                        map.show_replay.hide();
                        map.show_round_menu.show();
                    }
                    else {
                        map.show_pause.show();
                        map.show_auto.show();
                        map.show_replay.show();
                        map.show_round_menu.hide();
                        map.remember_round_button.hide();
                        map.popequip.hide();
                        map.filternode_button.hide();
                    }
                    if (lib.config.show_card_prompt) {
                        map.hide_card_prompt_basic.show();
                        map.hide_card_prompt_equip.show();
                    }
                    else {
                        map.hide_card_prompt_basic.hide();
                        map.hide_card_prompt_equip.hide();
                    }
                    if (lib.config.show_log != 'off') {
                        map.clear_log.show();
                    }
                    else {
                        map.clear_log.hide();
                    }
                    if (get.is.phoneLayout()) {
                        map.show_time2.show();
                        map.show_time.hide();
                        if (lib.config.show_time2) {
                            map.watchface.show();
                        }
                        else {
                            map.watchface.hide();
                        }
                    }
                    else {
                        map.show_time2.hide();
                        map.show_time.show();
                        map.watchface.hide();
                    }
                    // if (lib.config.show_extensionmaker) {
                    //     map.show_extensionshare.show();
                    // }
                    // else {
                    //     map.show_extensionshare.hide();
                    // }
                },
                show_history: {
                    name: '出牌记录栏',
                    init: 'off',
                    intro: '在屏幕左侧或右侧显示出牌记录',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        left: '靠左',
                        right: '靠右',
                    },
                    onclick: function (bool) {
                        if (lib.config.show_history == 'right') ui.window.animate('rightbar2');
                        game.saveConfig('show_history', bool);
                        if (_status.video || !_status.prepareArena) return;
                        if (bool == 'left') {
                            ui.window.classList.add('leftbar');
                            ui.window.classList.remove('rightbar');
                        }
                        else if (bool == 'right') {
                            ui.window.classList.remove('leftbar');
                            ui.window.classList.add('rightbar');
                        }
                        else {
                            ui.window.classList.remove('leftbar');
                            ui.window.classList.remove('rightbar');
                        }
                    }
                },
                pop_logv: {
                    name: '自动弹出记录',
                    init: false,
                    unfrequent: true
                },
                show_log: {
                    name: '历史记录栏',
                    init: 'off',
                    intro: '在屏幕中部显示出牌文字记录',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        left: '靠左',
                        center: '居中',
                        right: '靠右',
                    },
                    onclick: function (bool) {
                        game.saveConfig('show_log', bool);
                        if (lib.config.show_log != 'off') {
                            ui.arenalog.style.display = '';
                            ui.arenalog.dataset.position = bool;
                        }
                        else {
                            ui.arenalog.style.display = 'none';
                            ui.arenalog.innerHTML = '';
                        }
                    }
                },
                clear_log: {
                    name: '自动清除历史记录',
                    init: false,
                    unfrequent: true,
                    intro: '开启后将定时清除历史记录栏的条目（而不是等记录栏满后再清除）'
                },
                // log_highlight: {
                //     name: '历史记录高亮',
                //     init: true,
                //     unfrequent: true,
                //     intro: '开启后历史记录不同类别的信息将以不同颜色显示',
                // },
                show_time: {
                    name: '显示时间',
                    intro: '在屏幕顶部显示当前时间',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_time', bool);
                        if (bool) {
                            ui.time.style.display = '';
                        }
                        else {
                            ui.time.style.display = 'none';
                        }
                    }
                },
                show_time2: {
                    name: '显示时间',
                    intro: '在触屏按钮处显示当前时间',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_time2', bool);
                        if (bool) {
                            ui.roundmenu.classList.add('clock');
                        }
                        else {
                            ui.roundmenu.classList.remove('clock');
                        }
                    }
                },
                watchface: {
                    name: '表盘样式',
                    init: 'none',
                    unfrequent: true,
                    item: {
                        none: '默认',
                        simple: '简约',
                    },
                    onclick: function (item) {
                        game.saveConfig('watchface', item);
                        ui.roundmenu.dataset.watchface = item;
                    }
                },
                show_time3: {
                    name: '显示游戏时间',
                    init: false,
                    unfrequent: true
                },
                show_statusbar_android: {
                    name: '显示状态栏',
                    init: false,
                    unfrequent: true,
                    content: function (bool) {
                        game.saveConfig('show_statusbar', bool);
                        if (window.StatusBar && lib.device == 'android') {
                            if (bool) {
                                window.StatusBar.overlaysWebView(false);
                                window.StatusBar.backgroundColorByName('black');
                                window.StatusBar.show();
                            }
                            else {
                                window.StatusBar.hide();
                            }
                        }
                    }
                },
                show_statusbar_ios: {
                    name: '显示状态栏',
                    init: 'off',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        overlay: '嵌入',
                        auto: '自动',
                        off: '关闭'
                    },
                    onclick: function (bool) {
                        game.saveConfig('show_statusbar_ios', bool);
                        if (window.StatusBar && lib.device == 'ios') {
                            if (bool != 'off' && bool != 'auto') {
                                if (lib.config.show_statusbar_ios == 'default') {
                                    window.StatusBar.overlaysWebView(false);
                                    document.body.classList.remove('statusbar');
                                }
                                else {
                                    window.StatusBar.overlaysWebView(true);
                                    document.body.classList.add('statusbar');
                                }
                                window.StatusBar.backgroundColorByName('black');
                                window.StatusBar.show();
                            }
                            else {
                                document.body.classList.remove('statusbar');
                                window.StatusBar.hide();
                            }
                        }
                    }
                },
                show_card_prompt: {
                    name: '显示出牌信息',
                    intro: '出牌时在使用者上显示卡牌名称',
                    init: true,
                    unfrequent: true,
                },
                hide_card_prompt_basic: {
                    name: '隐藏基本牌信息',
                    intro: '不显示基本牌名称',
                    init: false,
                    unfrequent: true,
                },
                hide_card_prompt_equip: {
                    name: '隐藏装备牌信息',
                    intro: '不显示装备牌名称',
                    init: false,
                    unfrequent: true,
                },
                show_phase_prompt: {
                    name: '显示阶段信息',
                    intro: '在当前回合不同阶段开始时显示阶段名称',
                    init: true,
                    unfrequent: true,
                },
                show_phaseuse_prompt: {
                    name: '出牌阶段提示',
                    intro: '在你出牌时显示提示文字',
                    init: true,
                    unfrequent: true,
                },
                auto_popped_config: {
                    name: '自动弹出选项',
                    intro: '鼠标移至选项按钮时弹出模式选择菜单',
                    init: true,
                    unfrequent: true,
                },
                auto_popped_history: {
                    name: '自动弹出历史',
                    intro: '鼠标移至暂停按钮时弹出历史记录菜单',
                    init: false,
                    unfrequent: true,
                },
                show_round_menu: {
                    name: '显示触屏按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        if (get.is.nomenu('show_round_menu', bool)) return false;
                        game.saveConfig('show_round_menu', bool);
                        if (bool && ui.roundmenu) {
                            ui.roundmenu.style.display = '';
                        }
                        else {
                            ui.roundmenu.style.display = 'none';
                            alert('关闭触屏按钮后可通过手势打开菜单（默认为下划）')
                        }
                    }
                },
                remember_round_button: {
                    name: '记住按钮位置',
                    intro: '重新开始后触屏按钮将保存的上一局的位置',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('remember_round_button', bool);
                        if (!bool) {
                            ui.click.resetround();
                        }
                    }
                },
                remember_dialog: {
                    name: '记住对话框位置',
                    intro: '移动对话框后新的对话框也将在移动后的位置显示',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('remember_dialog', bool);
                        if (!bool) {
                            if (ui.dialog) {
                                var dialog = ui.dialog;
                                dialog.style.transform = '';
                                dialog._dragtransform = [0, 0];
                                dialog.style.transition = 'all 0.3s';
                                dialog._dragtouches;
                                dialog._dragorigin;
                                dialog._dragorigintransform;
                                setTimeout(function () {
                                    dialog.style.transition = '';
                                }, 500);
                            }
                            game.saveConfig('dialog_transform', [0, 0]);
                        }
                    }
                },
                transparent_dialog: {
                    name: '堆叠对话框虚化',
                    init: false,
                    intro: '当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明',
                    onclick: function (bool) {
                        game.saveConfig('transparent_dialog', bool);
                        if (bool) {
                            for (var i = 0; i < ui.dialogs.length; i++) {
                                if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
                                    ui.dialogs[i].unfocus();
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < ui.dialogs.length; i++) {
                                if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
                                    ui.dialogs[i].refocus();
                                }
                            }
                        }
                    }
                },
                show_rarity: {
                    name: '显示武将星级',
                    init: true,
                    intro: '仅供娱乐，重启后生效',
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_rarity', bool);
                    }
                },
                mark_identity_style: {
                    name: '标记身份操作',
                    intro: '设置单击身份按钮时的操作',
                    unfrequent: true,
                    init: 'menu',
                    item: {
                        menu: '菜单',
                        click: '单击',
                    },
                },
                character_dialog_tool: {
                    name: '自由选将显示',
                    intro: '点击自由选将时默认显示的条目',
                    init: '最近',
                    item: {
                        '收藏': '收藏',
                        '最近': '最近',
                        'all': '全部'
                    },
                    unfrequent: true,
                },
                recent_character_number: {
                    name: '最近使用武将',
                    intro: '自由选将对话框中最近使用武将的数量',
                    init: '12',
                    item: {
                        '6': '6',
                        '12': '12',
                        '20': '24',
                        '30': '36',
                    },
                    unfrequent: true
                },
                popequip: {
                    name: '触屏装备选择',
                    intro: '设置触屏布局中选择装备的方式',
                    init: true,
                    unfrequent: true,
                },
                filternode_button: {
                    name: '触屏筛选按钮',
                    intro: '设置自由选将对话框中筛选按钮的样式',
                    init: true,
                    unfrequent: true,
                },
                show_charactercard: {
                    name: '显示武将资料',
                    intro: '在武将界面单击时弹出武将资料卡',
                    init: true,
                    unfrequent: true
                },
                show_favourite: {
                    name: '显示添加收藏',
                    intro: '在角色的右键菜单中显示添加收藏',
                    init: false,
                    unfrequent: true
                },
                show_favmode: {
                    name: '显示模式收藏',
                    intro: '快捷菜单中显示收藏模式',
                    init: true,
                    unfrequent: true
                },
                show_favourite_menu: {
                    name: '显示收藏菜单',
                    intro: '在选项-武将中显示收藏一栏',
                    init: true,
                    unfrequent: true
                },
                show_ban_menu: {
                    name: '显示禁将菜单',
                    intro: '在选项-武将中显示禁将一栏',
                    init: true,
                    unfrequent: true
                },
                right_range: {
                    name: '显示距离信息',
                    intro: '在角色的右键菜单中显示距离等信息',
                    init: true,
                    unfrequent: true
                },
                replace_image: {
                    name: '替换为原始卡图',
                    intro: '所有V版卡图替换为三国杀原版卡图',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('replace_image', bool);
                        if (bool) {
                            ui.arena.classList.remove('replace_image');
                        }
                        else {
                            ui.arena.classList.add('replace_image');
                        }
                    },
                },
                // hide_card_image: {
                //     name: '隐藏卡牌背景',
                //     intro: '所有卡牌将使用文字作为背景',
                //     init: false,
                //     unfrequent: true,
                //     restart: true,
                // },
                show_name: {
                    name: '显示角色名称',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_name', bool);
                        if (bool) {
                            ui.arena.classList.remove('hide_name');
                        }
                        else {
                            ui.arena.classList.add('hide_name');
                        }
                    }
                },
                show_replay: {
                    name: '显示重来按钮',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_replay', bool);
                        if (lib.config.show_replay) {
                            ui.replay.style.display = '';
                        }
                        else {
                            ui.replay.style.display = 'none';
                        }
                    }
                },
                show_playerids: {
                    name: '显示身份按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_playerids', bool);
                        if (lib.config.show_playerids) {
                            ui.playerids.style.display = '';
                        }
                        else {
                            ui.playerids.style.display = 'none';
                        }
                    }
                },
                show_sortcard: {
                    name: '显示整理手牌按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_sortcard', bool);
                        if (lib.config.show_sortcard) {
                            ui.sortCard.style.display = '';
                        }
                        else {
                            ui.sortCard.style.display = 'none';
                        }
                    }
                },
                show_pause: {
                    name: '显示暂停按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_pause', bool);
                        if (lib.config.show_pause) {
                            ui.pause.style.display = '';
                        }
                        else {
                            ui.pause.style.display = 'none';
                        }
                    }
                },
                show_auto: {
                    name: '显示托管按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_auto', bool);
                        if (lib.config.show_auto) {
                            ui.auto.style.display = '';
                        }
                        else {
                            ui.auto.style.display = 'none';
                        }
                    }
                },
                show_volumn: {
                    name: '显示音量按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_volumn', bool);
                        if (lib.config.show_volumn) {
                            ui.volumn.style.display = '';
                        }
                        else {
                            ui.volumn.style.display = 'none';
                        }
                    }
                },
                show_cardpile: {
                    name: '显示牌堆按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_cardpile', bool);
                        if (bool) {
                            ui.cardPileButton.style.display = '';
                        }
                        else {
                            ui.cardPileButton.style.display = 'none';
                        }
                    }
                },
                show_cardpile_number: {
                    name: '显示剩余牌数',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_cardpile_number', bool);
                        if (bool) {
                            ui.cardPileNumber.style.display = '';
                        }
                        else {
                            ui.cardPileNumber.style.display = 'none';
                        }
                    }
                },
                show_handcardbutton: {
                    name: '显示手牌按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_handcardbutton', bool);
                    }
                },
                show_giveup: {
                    name: '显示投降按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_giveup', bool);
                    }
                },
                show_wuxie: {
                    name: '显示无懈按钮',
                    intro: '在右上角显示不询问无懈',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_wuxie', bool);
                        if (lib.config.show_wuxie) {
                            ui.wuxie.style.display = '';
                        }
                        else {
                            ui.wuxie.style.display = 'none';
                        }
                    }
                },
                wuxie_right: {
                    name: '无懈按钮靠左',
                    init: true,
                    unfrequent: true,
                },
                show_discardpile: {
                    name: '暂停时显示弃牌堆',
                    init: false,
                    unfrequent: true,
                }
            }
        },
        /**
         * 音效设置
         * @name configMenu.audio
         * @type {!Object}
         */
        audio: {
            name: '音效',
            config: {
                update: function (config, map) {
                    if (lib.config.background_music == 'music_custom' && (lib.device || lib.node)) {
                        map.import_music.show();
                    }
                    else {
                        map.import_music.hide();
                    }
                    map.clear_background_music[get.is.object(lib.config.customBackgroundMusic) ? 'show' : 'hide']();
                    ui.background_music_setting = map.background_music;
                    map.background_music._link.config.updatex.call(map.background_music, []);
                },
                background_music: {
                    updatex: function () {
                        this.lastChild.innerHTML = this._link.config.item[lib.config.background_music];
                        var menu = this._link.menu;
                        for (var i = 0; i < menu.childElementCount; i++) {
                            if (!['music_off', 'music_custom', 'music_random'].concat(lib.config.all.background_music).contains(menu.childNodes[i]._link)) menu.childNodes[i].delete();
                        }
                    },
                    name: '背景音乐',
                    init: true,
                    item: {
                        music_default: '默认',
                    },
                    onclick: function (item) {
                        game.saveConfig('background_music', item);
                        game.playBackgroundMusic();
                    }
                },
                import_music: {
                    name: '<div style="white-space:nowrap;width:calc(100% - 5px)">' +
                        '<input type="file" style="width:calc(100% - 40px)" accept="audio/*">' +
                        '<button style="width:40px">确定</button></div>',
                    clear: true,
                },
                background_audio: {
                    name: '游戏音效',
                    init: true,
                },
                background_speak: {
                    name: '人物配音',
                    init: true,
                },
                // equip_audio: {
                //     name: '装备配音',
                //     init: false,
                // },
                repeat_audio: {
                    name: '播放重复语音',
                    init: false,
                },
                volumn_audio: {
                    name: '音效音量',
                    init: 8,
                    item: {
                        '0': '〇',
                        '1': '一',
                        '2': '二',
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '7': '七',
                        '8': '八',
                    },
                    onclick: function (volume) {
                        game.saveConfig('volumn_audio', parseInt(volume));
                    }
                },
                volumn_background: {
                    name: '音乐音量',
                    init: 8,
                    item: {
                        '0': '〇',
                        '1': '一',
                        '2': '二',
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '7': '七',
                        '8': '八',
                    },
                    onclick: function (volume) {
                        game.saveConfig('volumn_background', parseInt(volume));
                        ui.backgroundMusic.volume = volume / 8;
                    }
                },
                clear_background_music: {
                    name: '清除自定义背景音乐',
                    clear: true,
                    onclick: function () {
                        if (confirm('是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）')) {
                            for (var i in lib.config.customBackgroundMusic) {
                                lib.config.all.background_music.remove(i);
                                if (i.indexOf('cdv_') == 0) {
                                    game.removeFile('audio/background/' + i + '.mp3');
                                }
                                else {
                                    game.deleteDB('audio', i);
                                }
                            }
                            lib.config.customBackgroundMusic = null;
                            game.saveConfig('customBackgroundMusic', null);
                            game.saveConfig('background_music', 'music_off');
                            if (!_status._aozhan) game.playBackgroundMusic();
                        }
                    },
                },
            }
        },
        /**
         * (自动, 禁用)技能设置
         * @name configMenu.skill
         * @type {!Object}
         */
        skill: {
            name: '技能',
            config: {
                update: function (config, map) {
                    for (var i in map) {
                        if (map[i]._link.config.type == 'autoskill') {
                            if (!lib.config.autoskilllist.contains(i)) {
                                map[i].classList.add('on');
                            }
                            else {
                                map[i].classList.remove('on');
                            }
                        }
                        else if (map[i]._link.config.type == 'banskill') {
                            if (!lib.config.forbidlist.contains(i)) {
                                map[i].classList.add('on');
                            }
                            else {
                                map[i].classList.remove('on');
                            }
                        }
                    }
                }
            }
        },
        /**
         * 其他菜单项
         * @name configMenu.others
         * @type {!Object}
         */
        others: {
            name: '其它',
            config: {
                // reset_database:{
                //     name:'重置游戏',
                //     onclick:function(){
                //         var node=this;
                //         if(node._clearing){
                //             if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
                //             game.reload();
                //             return;
                //         }
                //         node._clearing=true;
                //         node.innerHTML='单击以确认 (3)';
                //         setTimeout(function(){
                //             node.innerHTML='单击以确认 (2)';
                //             setTimeout(function(){
                //                 node.innerHTML='单击以确认 (1)';
                //                 setTimeout(function(){
                //                     node.innerHTML='重置游戏录像';
                //                     delete node._clearing;
                //                 },1000);
                //             },1000);
                //         },1000);
                //     },
                //     clear:true
                // },
                reset_game: {
                    name: '重置游戏设置',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            var noname_inited = localStorage.getItem('noname_inited');
                            var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                            localStorage.clear();
                            if (noname_inited) {
                                localStorage.setItem('noname_inited', noname_inited);
                            }
                            if (onlineKey) {
                                localStorage.setItem(lib.configprefix + 'key', onlineKey);
                            }
                            game.deleteDB('config');
                            game.deleteDB('data');
                            game.reload();
                            return;
                        }
                        node._clearing = true;
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        setTimeout(() => {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            setTimeout(() => {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                setTimeout(() => {
                                    node.firstChild.innerHTML = '重置游戏设置';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true
                },
                reset_hiddenpack: {
                    name: '重置隐藏内容',
                    onclick: function () {
                        if (this.firstChild.innerHTML != '已重置') {
                            this.firstChild.innerHTML = '已重置'
                            game.saveConfig('hiddenModePack', []);
                            game.saveConfig('hiddenCharacterPack', []);
                            game.saveConfig('hiddenCardPack', []);
                            game.saveConfig('hiddenPlayPack', []);
                            game.saveConfig('hiddenBackgroundPack', []);
                            setTimeout(() => {
                                this.firstChild.innerHTML = '重置隐藏内容';
                                setTimeout(() => {
                                    if (confirm('是否重新启动使改变生效？')) {
                                        game.reload();
                                    }
                                });
                            }, 500);
                        }
                    },
                    clear: true
                },
                reset_tutorial: {
                    name: '重置身份模式的新手向导',
                    onclick: function () {
                        if (this.firstChild.innerHTML != '已重置') {
                            this.firstChild.innerHTML = '已重置'
                            game.saveConfig('new_tutorial', false);
                            game.saveConfig('prompt_hidebg');
                            game.saveConfig('prompt_hidepack');
                            setTimeout(() => {
                                this.firstChild.innerHTML = '重置新手向导';
                            }, 500);
                        }
                    },
                    clear: true
                },
                import_data: {
                    name: '导入游戏设置',
                    onclick: function () {
                        ui.import_data_button.classList.toggle('hidden');
                    },
                    clear: true
                },
                import_data_button: {
                    name: '<div style="white-space:nowrap;width:calc(100% - 10px)">' +
                        '<input type="file" style="width:calc(100% - 40px)">' +
                        '<button style="width:40px">确定</button></div>',
                    clear: true,
                },
                export_data: {
                    name: '导出游戏设置',
                    onclick: function () {
                        var data;
                        var export_data = function (data) {
                            game.export(lib.init.encode(JSON.stringify(data)), '无名杀 - 数据 - ' + (new Date()).toLocaleString());
                        }
                        if (!lib.db) {
                            data = {};
                            for (var i in localStorage) {
                                if (i.indexOf(lib.configprefix) == 0) {
                                    data[i] = localStorage[i];
                                }
                            }
                            export_data(data);
                        }
                        else {
                            game.getDB('config', null, function (data1) {
                                game.getDB('data', null, function (data2) {
                                    export_data({
                                        config: data1,
                                        data: data2
                                    });
                                });
                            });
                        }

                    },
                    clear: true
                },
                redownload_game: {
                    name: '重新下载游戏',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            localStorage.removeItem('noname_inited');
                            game.reload();
                            return;
                        }
                        node._clearing = true;
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        setTimeout(function () {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            setTimeout(function () {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                setTimeout(function () {
                                    node.firstChild.innerHTML = '重新下载游戏';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true
                },
                update: function (config, map) {
                    if (lib.device || lib.node) {
                        map.redownload_game.show();
                    }
                    else {
                        map.redownload_game.hide();
                    }
                }
            }
        }
    }
    /**
     * 拓展菜单
     * @name configMenu.extensionMenu
     */
    lib.extensionMenu = {
        cardpile: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
            },
            intro: {
                name: '将杀闪等牌在牌堆中的比例维持在与军争牌堆相同，防止开启扩展包后被过多地稀释',
                clear: true,
                nopointer: true,
            },
            sha: {
                name: '杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            huosha: {
                name: '火杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            leisha: {
                name: '雷杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            shan: {
                name: '闪',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            tao: {
                name: '桃',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            jiu: {
                name: '酒',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            wuxie: {
                name: '无懈可击',
                init: '0.5',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            nanman: {
                name: '南蛮入侵',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            wanjian: {
                name: '万箭齐发',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            guohe: {
                name: '过河拆桥',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            shunshou: {
                name: '顺手牵羊',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            tiesuo: {
                name: '铁索连环',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('cardpile');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('cardpile');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
        // boss: {
        //     enable: {
        //         name: '开启',
        //         init: false,
        //         restart: true,
        //         onswitch: function (bool) {
        //             if (bool) {
        //                 var storage = { boss: {}, versus: {}, translate: {} };
        //                 var loadversus = function () {
        //                     game.loadModeAsync('versus', function (mode) {
        //                         for (var i in mode.translate) {
        //                             storage.translate[i] = mode.translate[i];
        //                         }
        //                         for (var i in mode.jiangeboss) {
        //                             if (mode.jiangeboss[i][4].contains('bossallowed')) {
        //                                 storage.versus[i] = mode.jiangeboss[i];
        //                             }
        //                         }
        //                         localStorage.setItem('boss_storage_playpackconfig', JSON.stringify(storage));
        //                     });
        //                 };
        //                 game.loadModeAsync('boss', function (mode) {
        //                     for (var i in mode.translate) {
        //                         storage.translate[i] = mode.translate[i];
        //                     }
        //                     for (var i in mode.characterPack.mode_boss) {
        //                         if (mode.characterPack.mode_boss[i][4].contains('bossallowed')) {
        //                             storage.boss[i] = mode.characterPack.mode_boss[i];
        //                         }
        //                     }
        //                     loadversus();
        //                 });
        //             }
        //             else {
        //                 localStorage.removeItem('boss_storage_playpackconfig');
        //             }
        //         }
        //     },
        //     intro: {
        //         name: '将剑阁和挑战模式的武将添加到其它模式',
        //         clear: true,
        //         nopointer: true,
        //     },
        //     enableai: {
        //         name: '随机选将可用',
        //         init: false
        //     },
        //     hide: {
        //         name: '隐藏此扩展',
        //         clear: true,
        //         onclick: function () {
        //             if (this.firstChild.innerHTML == '隐藏此扩展') {
        //                 this.firstChild.innerHTML = '此扩展将在重启后隐藏';
        //                 lib.config.hiddenPlayPack.add('boss');
        //                 if (!lib.config.prompt_hidepack) {
        //                     alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
        //                     game.saveConfig('prompt_hidepack', true);
        //                 }
        //             }
        //             else {
        //                 this.firstChild.innerHTML = '隐藏此扩展';
        //                 lib.config.hiddenPlayPack.remove('boss');
        //             }
        //             game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
        //         }
        //     },
        // },
        wuxing: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
            },
            intro: {
                name: '每名角色和部分卡牌在游戏开始时随机获得一个属性',
                clear: true,
                nopointer: true,
            },
            num: {
                name: '带属性卡牌',
                init: '0.3',
                item: {
                    '0.1': '10%',
                    '0.2': '20%',
                    '0.3': '30%',
                    '0.5': '50%',
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('wuxing');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('wuxing');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
        coin: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
                onclick: function (bool) {
                    if (bool) {
                        lib.config.plays.add('coin');
                    }
                    else {
                        lib.config.plays.remove('coin');
                    }
                    game.saveConfig('plays', lib.config.plays);
                }
            },
            intro: {
                name: '每完成一次对局，可获得一定数量的金币；金币可用于购买游戏特效',
                clear: true,
                nopointer: true,
            },
            display: {
                name: '金币显示',
                init: 'text',
                item: {
                    symbol: '符号',
                    text: '文字'
                },
                onclick: function (item) {
                    game.saveConfig('coin_display_playpackconfig', item);
                    if (game.changeCoin) game.changeCoin(0);
                }
            },
            canvas: {
                name: '特效置顶',
                init: false,
                onclick: function (bool) {
                    game.saveConfig('coin_canvas_playpackconfig', bool);
                    if (bool) {
                        ui.window.classList.add('canvas_top');
                    }
                    else {
                        ui.window.classList.remove('canvas_top');
                    }
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('coin');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('coin');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
    }
}