{
    /**
     * 基础属性
     * @namespace
     */
    const { game, ui, get, ai, lib, _status } = vkCore
    const element = require('@c/lib_element')
    module.exports = {
        connectRooms: function (list) {
            ui.rooms = [];
            ui.roombase = ui.create.dialog();
            ui.roombase.classList.add('fullwidth');
            ui.roombase.classList.add('fullheight');
            ui.roombase.classList.add('fixed');
            ui.roombase.classList.add('scroll1');
            ui.roombase.classList.add('scroll2');
            ui.roombase.classList.add('noupdate');
            for (var i = 0; i < list.length; i++) {
                var player = ui.roombase.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>');
                player.roomindex = i;
                player.initRoom = lib.element.player.initRoom;
                player.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.connectroom);
                player.initRoom(list[i]);
                ui.rooms.push(player);
            }
        },
        rarity: function (button) {
            var rarity = game.getRarity(button.link);
            if (rarity != 'common' && lib.config.show_rarity) {
                var intro = button.node.intro;
                intro.classList.add('showintro');
                intro.style.fontFamily = 'yuanli';
                intro.style.fontSize = '16px';
                intro.style.bottom = '6px';
                intro.style.left = '6px';
                switch (rarity) {
                    case 'beginner': intro.dataset.nature = 'oceanm'; break;
                    case 'rare': intro.dataset.nature = 'thunderm'; break;
                    case 'epic': intro.dataset.nature = 'metalm'; break;
                    case 'legend': intro.dataset.nature = 'orangem'; break;
                    case 'junk': intro.dataset.nature = 'woodm'; break;
                }
                intro.innerHTML = get.translation(rarity);
            }
            if ((button.link == 'xushu' || button.link == 'xin_xushu') && button.node && button.node.name && button.node.group) {
                if (button.classList.contains('newstyle')) {
                    button.node.name.dataset.nature = 'watermm';
                    button.node.group.dataset.nature = 'water';
                }
                else button.node.group.style.backgroundColor = get.translation('weiColor');
            }
        },
        /**
         * 创建`<div>`元素
         * @function
         * @param {?string} selectors 类选择器和id选择器的任意组合，用于设置创建元素的类和id；如果有id选择器，id选择器的数量不能超过一个；如果为null，不设置
         * @param {?string} innerHTML 创建元素内的HTML，如果为null，不设置
         * @param {?HTMLElement} parent 元素的父节点，如果为null，不设置父节点
         * @param {?number} referenceNode 参考子节点，新节点会插入在参考节点的前；如果为null，插入在最后
         * @param {?Object} style 参考{@link HTMLDivElement#css}，如果为null，不设置内联样式
         * @param {?number[]} offsets 元素定位，参考{@link HTMLDivElement#setPosition}
         * @param {?function} clickCallback 点击回调函数
         * @returns {HTMLDivElement} 返回生成的div
         */
        div: function () {
            var str, innerHTML, position, position2, style, divposition, listen;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    if (typeof str == 'string') {
                        innerHTML = arguments[i];
                    }
                    else {
                        str = arguments[i];
                    }
                }
                else if (get.objtype(arguments[i]) == 'div' ||
                    get.objtype(arguments[i]) == 'table' ||
                    get.objtype(arguments[i]) == 'tr' ||
                    get.objtype(arguments[i]) == 'td' ||
                    get.objtype(arguments[i]) == 'body') position = arguments[i];
                else if (typeof arguments[i] == 'number') position2 = arguments[i];
                else if (get.itemtype(arguments[i]) == 'divposition') divposition = arguments[i];
                else if (typeof arguments[i] == 'object') style = arguments[i];
                else if (typeof arguments[i] == 'function') listen = arguments[i];
            }
            if (str == undefined) str = '';
            var node = document.createElement('div');
            for (var i = 0; i < str.length; i++) {
                if (str[i] == '.') {
                    if (node.className.length != 0) {
                        node.className += ' ';
                    }
                    while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                        node.className += str[i + 1];
                        i++;
                    }
                }
                else if (str[i] == '#') {
                    while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                        node.id += str[i + 1];
                        i++;
                    }
                }
            }
            if (position) {
                if (typeof position2 == 'number' && position.childNodes.length > position2) {
                    position.insertBefore(node, position.childNodes[position2]);
                }
                else {
                    position.appendChild(node);
                }
            }
            if (style) node.css(style);
            if (divposition) node.setPosition(divposition);
            if (innerHTML) node.innerHTML = innerHTML;
            if (listen) node.listen(listen);
            return node;
        },
        filediv: function () {
            var args = Array.from(arguments);
            var func = null;
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] == 'function') {
                    func = args[i];
                    args.splice(i, 1);
                    break;
                }
            }
            var div = ui.create.div.apply(this, args);
            var input = ui.create.node('input.fileinput');
            input.type = 'file';
            input.onchange = function (e) {
                func.call(this, this.files[0], e);
            };
            div.appendChild(input);
            div.inputNode = input;
            return div;
        },
        node: function () {
            var tagName, str, innerHTML, position, position2, style, divposition, listen;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') {
                    if (typeof tagName == 'string') {
                        innerHTML = arguments[i];
                    }
                    else {
                        tagName = arguments[i];
                    }
                }
                else if (get.objtype(arguments[i]) == 'div' ||
                    get.objtype(arguments[i]) == 'table' ||
                    get.objtype(arguments[i]) == 'tr' ||
                    get.objtype(arguments[i]) == 'td' ||
                    get.objtype(arguments[i]) == 'body') position = arguments[i];
                else if (typeof arguments[i] == 'number') position2 = arguments[i];
                else if (get.itemtype(arguments[i]) == 'divposition') divposition = arguments[i];
                else if (typeof arguments[i] == 'object') style = arguments[i];
                else if (typeof arguments[i] == 'function') listen = arguments[i];
            }
            if (tagName == undefined) {
                tagName = 'div';
            }
            else {
                var i1 = tagName.indexOf('.');
                var i2 = tagName.indexOf('#');
                if (i1 != -1 || i2 != -1) {
                    if (i2 != -1 && i2 < i1) {
                        i1 = i2;
                    }
                    str = tagName.slice(i1);
                    tagName = tagName.slice(0, i1);
                }
            }
            var node = document.createElement(tagName);
            if (str) {
                for (var i = 0; i < str.length; i++) {
                    if (str[i] == '.') {
                        if (node.className.length != 0) {
                            node.className += ' ';
                        }
                        while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                            node.className += str[i + 1];
                            i++;
                        }
                    }
                    else if (str[i] == '#') {
                        while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                            node.id += str[i + 1];
                            i++;
                        }
                    }
                }
            }
            if (position) {
                if (typeof position2 == 'number' && position.childNodes.length > position2) {
                    position.insertBefore(node, position.childNodes[position2]);
                }
                else {
                    position.appendChild(node);
                }
            }
            if (style) HTMLDivElement.prototype.css.call(node, style);
            if (divposition) HTMLDivElement.prototype.setPosition.call(node, divposition);
            if (innerHTML) node.innerHTML = innerHTML;
            if (listen) node.onclick = listen;
            return node;
        },
        iframe: function (src) {
            var layer = document.createElement('div');
            layer.classList.add('poplayer');
            layer.style.zIndex = '100';
            layer.listen(function () {
                this.remove();
            });
            layer.style.background = 'white';

            var webview = document.createElement('iframe');
            webview.src = src;
            webview.style.width = '100%';
            webview.style.height = '100%';
            webview.style.left = '0px';
            webview.style.top = '0px';
            webview.style.position = 'absolute';
            webview.style.border = 'none';
            layer.appendChild(webview);

            var backbutton = ui.create.div('.menubutton.round', '返', layer, function () {
                layer.remove();
            });
            backbutton.style.bottom = '10px';
            backbutton.style.right = '10px';
            backbutton.style.background = 'rgba(0,0,0,0.4)';
            backbutton.style.color = 'white';
            backbutton.style.textShadow = 'rgba(0,0,0,0.5) 0px 0px 2px';
            backbutton.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 3px 10px';
            backbutton.style.position = 'fixed';

            ui.window.appendChild(layer);
        },
        identitycircle: function (list, target) {
            var container = ui.create.div('.identitycircle.menubg', target);
            var circle = ui.create.div(container);
            container.dataset.num = list.length;
            for (var i = 0; i < list.length; i++) {
                var sec1 = ui.create.div(circle);
                sec1.dataset.color = list[i];
                var sec2 = ui.create.div(circle);
                sec2.dataset.color = list[i];
                var deg1 = 360 / list.length * i;
                var deg2 = 0;
                if (list.length == 2) {
                    deg2 = 90;
                }
                else if (list.length == 3) {
                    deg2 = 30;
                }
                sec1.style.transform = 'rotate(' + deg1 + 'deg)';
                sec2.style.transform = 'rotate(' + (deg1 + deg2) + 'deg)';
            }
        },
        chat: function () {
            var chat = ui.create.system('聊天', null, true);
            ui.chatButton = chat;
            lib.setPopped(chat, ui.click.chat, 220);
        },
        exit: function () {
            if (!ui.exit) {
                ui.exit = ui.create.control('退出房间', ui.click.exit);
            }
        },
        connecting: function (bool) {
            if (bool) {
                ui.window.classList.remove('connecting');
                if (ui.connecting) {
                    ui.connecting.delete();
                    delete ui.connecting;
                }
            }
            else {
                ui.window.classList.add('connecting');
                ui.connecting = ui.create.div('.fullsize.connectlayer');
                document.body.appendChild(ui.connecting);
                ui.create.div('', '正在重连...', ui.connecting);
                ui.connecting.splashtimeout = setTimeout(function () {
                    if (ui.connecting) {
                        delete ui.connecting.splashtimeout;
                    }
                }, 300);
                // setTimeout(function(){
                //     if(ui.connecting){
                //         ui.connecting.firstChild.show();
                //     }
                // },1000);
            }
        },
        roomInfo: function () {
            var chat = ui.create.system(game.online ? '房间信息' : '房间设置', function () {
                if (!game.online || game.onlinezhu) {
                    ui.click.connectMenu();
                }
            }, true);
            ui.roomInfo = chat;
            lib.setPopped(chat, function () {
                if (game.getRoomInfo) {
                    var uiintro = ui.create.dialog('hidden');
                    game.getRoomInfo(uiintro);
                    return uiintro;
                }
            }, 180);
        },
        templayer: function (time) {
            if (typeof time != 'number' || isNaN(time) || time == Infinity) {
                time = 500;
            }
            var templayer = ui.create.div('.popup-container', ui.window);
            setTimeout(function () {
                templayer.remove();
            }, time);
        },
        selectlist: function (list, init, position, onchange) {
            var select = document.createElement('select');
            for (var i = 0; i < list.length; i++) {
                var option = document.createElement('option');
                if (Array.isArray(list[i])) {
                    option.value = list[i][0];
                    option.innerHTML = list[i][1];
                }
                else {
                    option.value = list[i];
                    option.innerHTML = list[i];
                }
                if (init == option.value) {
                    option.selected = 'selected';
                }
                select.appendChild(option);
            }
            if (position) {
                position.appendChild(select);
            }
            if (onchange) {
                select.onchange = onchange;
            }
            return select;
        },
        /**
         * 菜单创建
         * @param {*} connectMenu 
         */
        menu: function (...args) {
            let menuTimeout = null;
            let connectMenu = false,
                menuList = ['开始', '选项', '武将', '卡牌', '扩展', '其它'],
                bar = 40,
                methods = {}
            for (let v of args) {
                if (v === true) {
                    connectMenu = true
                    menuList = ['模式', '武将', '卡牌']
                    bar = 123
                }
                else if (v instanceof Array) {
                    menuList = v
                }
                else if (v instanceof Object) {
                    methods = v
                }
                else if (typeof v === 'number') {
                    bar = v
                }
            }
            if (!connectMenu && !game.syncMenu) {
                menuTimeout = setTimeout(lib.init.reset, 1000);
            }
            var menu, menuContainer;
            var startButton;
            var popupContainer;
            var closeMenu = function () {
                if (popupContainer.noclose) {
                    popupContainer.noclose = false;
                    return;
                }
                popupContainer.classList.add('hidden');
                if (popupContainer.onclose) {
                    popupContainer.onclose();
                }
            };
            popupContainer = ui.create.div('.popup-container.hidden', ui.window, closeMenu);

            var openMenu = function (node, e, onclose) {
                popupContainer.innerHTML = '';
                var left = Math.round(e.clientX / game.documentZoom);
                var zoom = get.is.phoneLayout ? 1.3 : 1;
                popupContainer.appendChild(node);
                // var rect=node.getBoundingClientRect();
                if (node.classList.contains('visual')) {
                    // var num=node.querySelectorAll('.menu.visual>div').length;
                    // node.style.top=(e.y-node.offsetHeight/2+30)+'px';
                    for (var i = 0; i < node.childElementCount; i++) {
                        if (node.childNodes[i].update) {
                            node.childNodes[i].update();
                        }
                    }
                    // if(node.offsetTop<10){
                    //     node.style.top='10px';
                    // }
                }
                // else if(get.is.phoneLayout()&&rect.top*1.3+rect.height*1.3+20>ui.window.offsetHeight){
                //     node.style.top=(ui.winheightdow.offsetHeight-20-rect.height*1.3)/1.3+'px';
                // }
                // if(e){
                var height = node.offsetHeight;
                var idealtop = e.clientY / game.documentZoom;
                if (idealtop < 10) {
                    idealtop = 10;
                }
                else if ((idealtop + height) * zoom + 10 > ui.window.offsetHeight) {
                    idealtop = (ui.window.offsetHeight - 10) / zoom - height;
                }
                node.style.top = idealtop + 'px';
                node.style.left = left + 'px';
                // }

                popupContainer.classList.remove('hidden');
                popupContainer.onclose = onclose;
            };
            var clickToggle = function () {
                if (this.classList.contains('disabled')) return;
                this.classList.toggle('on');
                var config = this._link.config;
                if (config.onclick) {
                    if (config.onclick.call(this, this.classList.contains('on')) === false) {
                        this.classList.toggle('on');
                    }
                }
                if (config.update) {
                    config.update();
                }
            };
            var clickSwitcher = function () {
                if (this.classList.contains('disabled')) return;
                var node = this;
                this.classList.add('on');
                if (this._link.menu) {
                    var pos1 = this.lastChild.getBoundingClientRect();
                    var pos2 = ui.window.getBoundingClientRect();
                    if (this._link.menu.classList.contains('visual')) {
                        console.log(this._link.menu, pos1.left + pos1.width + 5 - pos2.left)
                        openMenu(this._link.menu, {
                            clientX: pos1.left + pos1.width + 5 - pos2.left,
                            clientY: pos1.top - pos2.top
                        }, function () {
                            node.classList.remove('on');
                        });
                    }
                    else if (this._link.menu.childElementCount > 10) {
                        openMenu(this._link.menu, {
                            clientX: pos1.left + pos1.width + 5 - pos2.left,
                            clientY: Math.min((ui.window.offsetHeight - 400) / 2, pos1.top - pos2.top)
                        }, function () {
                            node.classList.remove('on');
                        });
                        lib.setScroll(this._link.menu);
                    }
                    else {
                        openMenu(this._link.menu, {
                            clientX: pos1.left + pos1.width + 5 - pos2.left,
                            clientY: pos1.top - pos2.top
                        }, function () {
                            node.classList.remove('on');
                        });
                    }
                }
            };
            var clickContainer = function () {
                menuContainer.classList.add('hidden');
                if (connectMenu) {
                    if (_status.enteringroom) {
                        _status.enteringroom = false;
                    }
                    if (_status.creatingroom) {
                        _status.creatingroom = false;
                    }
                    ui.window.classList.remove('shortcutpaused');
                }
                else {
                    game.resume2();
                    if (game.onresume2) {
                        game.onresume2();
                    }
                    if (ui.config2) {
                        ui.config2.classList.remove('pressdown2');
                    }
                    if (ui.historybar) {
                        ui.historybar.classList.remove('menupaused');
                    }
                    ui.arena.classList.remove('menupaused');
                    ui.window.classList.remove('touchinfohidden');
                }
            };
            var clickMenuItem = function () {
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
            };
            var createMenu = function (tabs, config) {
                var createPage = function (position) {
                    var node = ui.create.div(position);
                    lib.setScroll(ui.create.div('.left.pane', node));
                    lib.setScroll(ui.create.div('.right.pane', node));
                    return node;
                };
                var menu = ui.create.div('.main.menu.dialog.popped.static', config.position, function (e) {
                    e.stopPropagation();
                });
                if (connectMenu || methods.center) {
                    menu.classList.add('center');
                    menuContainer.classList.add('centermenu');
                }
                var menuTab = ui.create.div('.menu-tab', menu);
                var menuTabBar = ui.create.div('.menu-tab-bar', menu);
                menuTabBar.style.left = (config.bar || 0) + 'px';
                if (Math.round(2 * game.documentZoom) < 2) {
                    menuTabBar.style.height = '3px';
                }
                var menuContent = ui.create.div('.menu-content', menu);
                var clickTab = function () {
                    if (this.classList.contains('disabled')) return;
                    var active = this.parentNode.querySelector('.active');
                    if (active) {
                        active.classList.remove('active');
                        active._link.remove();
                    }
                    this.classList.add('active');
                    menuTabBar.style.transform = 'translateX(' + (this.getBoundingClientRect().left - this.parentNode.firstChild.getBoundingClientRect().left) / game.documentZoom + 'px)';
                    menuContent.appendChild(this._link);
                };
                ui.click.menuTab = function (tab) {
                    for (var i = 0; i < menuTab.childNodes.length; i++) {
                        if (menuTab.childNodes[i].innerHTML == tab) {
                            clickTab.call(menuTab.childNodes[i]);
                            return;
                        }
                    }
                };
                var pages = [];
                for (var i = 0; i < tabs.length; i++) {
                    var active = (i === (config.init || 0));
                    pages[i] = createPage(active ? menuContent : null);
                    ui.create.div(active ? '.active' : '', tabs[i], menuTab, clickTab)._link = pages[i];
                }
                return {
                    menu: menu,
                    pages: pages
                };
            };
            var createConfig = function (config, position) {
                var node = ui.create.div('.config', config.name);
                node._link = { config: config };
                if (!config.clear) {
                    if (config.name != '开启') {
                        if (config.name == '屏蔽弱将') {
                            config.intro = '强度过低的武将（孙策除外）不会出现在选将框，也不会被AI选择'
                        }
                        else if (config.name == '屏蔽强将') {
                            config.intro = '强度过高的武将不会出现在选将框，也不会被AI选择'
                        }
                        else if (!config.intro) {
                            config.intro = '设置' + config.name;
                        }
                        lib.setIntro(node, function (uiintro) {
                            if (lib.config.touchscreen) _status.dragged = true;
                            uiintro.style.width = '170px';
                            var str = config.intro;
                            if (typeof str == 'function') {
                                str = str();
                            }
                            uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + str + '</div>');
                        });
                    }
                }
                else {
                    node.innerHTML = '<span>' + config.name + '</span>';
                    if (!config.nopointer) {
                        node.classList.add('pointerspan');
                    }
                }
                if (config.item) {
                    if (typeof config.item == 'function') {
                        config.item = config.item();
                    }
                    if (Array.isArray(config.init)) {

                    }
                    else {
                        node.classList.add('switcher');
                        node.listen(clickSwitcher);
                        node._link.choosing = ui.create.div('', config.item[config.init], node);
                        node._link.menu = ui.create.div('.menu');
                        if (config.visualMenu) {
                            node._link.menu.classList.add('visual');
                            var updateVisual = function () {
                                config.visualMenu(this, this._link, config.item[this._link], config);
                            };
                            var createNode = function (i, before) {
                                var visualMenu = ui.create.div();
                                if (config.visualBar) {
                                    if (before) {
                                        node._link.menu.insertBefore(visualMenu, before);
                                    }
                                    else {
                                        node._link.menu.insertBefore(visualMenu, node._link.menu.lastChild);
                                    }
                                }
                                else {
                                    node._link.menu.appendChild(visualMenu);
                                }
                                ui.create.div('.name', get.verticalStr(config.item[i]), visualMenu);
                                visualMenu._link = i;
                                if (config.visualMenu(visualMenu, i, config.item[i], config) !== false) {
                                    visualMenu.listen(clickMenuItem);
                                }
                                visualMenu.update = updateVisual;
                            };
                            if (config.visualBar) {
                                var visualBar = ui.create.div(node._link.menu, function () {
                                    this.parentNode.parentNode.noclose = true;
                                });
                                node._link.menu.classList.add('withbar');
                                config.visualBar(visualBar, config.item, createNode, node);
                                visualBar.update = function () {
                                    config.visualBar(visualBar, config.item, createNode, node);
                                }
                            }
                            for (var i in config.item) {
                                createNode(i);
                            }
                            lib.setScroll(node._link.menu);
                            node._link.menu.updateBr = function () {
                                var br = Array.from(this.querySelectorAll('.menu.visual>br'));
                                while (br.length) {
                                    br.shift().remove();
                                }
                                var split = [];
                                for (var i = 1; i < this.childElementCount; i++) {
                                    if (i % 3 == 0) {
                                        split.push(this.childNodes[i]);
                                    }
                                }
                                for (var i = 0; i < split.length; i++) {
                                    this.insertBefore(ui.create.node('br'), split[i]);
                                }
                            }
                            node._link.menu.updateBr();
                        }
                        else {
                            for (var i in config.item) {
                                var textMenu = ui.create.div('', config.item[i], node._link.menu, clickMenuItem);
                                textMenu._link = i;
                                if (config.textMenu) {
                                    config.textMenu(textMenu, i, config.item[i], config)
                                }
                                lib.setScroll(node._link.menu);
                            }
                        }
                        node._link.menu._link = node;
                        node._link.current = config.init;
                    }
                }
                else if (config.range) {

                }
                else if (config.clear) {
                    if (node.innerHTML.length >= 15) node.style.height = 'auto';
                    node.listen(clickToggle);
                }
                else if (config.input) {
                    node.classList.add('switcher');
                    var input = ui.create.div(node);
                    if (!config.fixed) {
                        input.contentEditable = true;
                        input.style.webkitUserSelect = 'text';
                    }
                    input.style.minWidth = '10px';
                    input.onkeydown = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            input.blur();
                        }
                    };
                    if (config.name == '联机昵称') {
                        input.innerHTML = config.init || '无名玩家';
                        input.onblur = function () {
                            input.innerHTML = input.innerHTML.replace(/<br>/g, '');
                            if (!input.innerHTML || get.is.banWords(input.innerHTML)) {
                                input.innerHTML = '无名玩家';
                            }
                            input.innerHTML = input.innerHTML.slice(0, 12);
                            game.saveConfig('connect_nickname', input.innerHTML);
                            game.saveConfig('connect_nickname', input.innerHTML, 'connect');
                        }
                    }
                    else if (config.name == '联机大厅') {
                        input.innerHTML = config.init || lib.hallURL;
                        input.onblur = function () {
                            if (!input.innerHTML) {
                                input.innerHTML = lib.hallURL;
                            }
                            input.innerHTML = input.innerHTML.replace(/<br>/g, '');
                            game.saveConfig('hall_ip', input.innerHTML, 'connect');
                        }
                    }
                    else {
                        input.innerHTML = config.init;
                        input.onblur = config.onblur;
                    }
                }
                else {
                    node.classList.add('toggle');
                    node.listen(clickToggle);
                    ui.create.div(ui.create.div(node));
                    if (config.init == true) {
                        node.classList.add('on');
                    }
                }
                if (position) {
                    position.appendChild(node);
                }
                return node;
            };
            var updateActive, updateActiveCard;
            var menuUpdates = [];
            menuContainer = ui.create.div('.menu-container.hidden', ui.window, clickContainer);
            var menux;
            if (!connectMenu) {
                ui.menuContainer = menuContainer;
                ui.click.configMenu = function () {
                    ui.click.shortcut(false)
                    if (menuContainer.classList.contains('hidden')) {
                        if (ui.config2) {
                            ui.config2.classList.add('pressdown2');
                        }
                        if (ui.historybar) {
                            ui.historybar.classList.add('menupaused');
                        }
                        ui.arena.classList.add('menupaused');
                        ui.window.classList.add('touchinfohidden');
                        menuContainer.classList.remove('hidden');
                        for (var i = 0; i < menuUpdates.length; i++) {
                            menuUpdates[i]();
                        }
                    }
                    else {
                        clickContainer.call(menuContainer);
                    }
                }
                menux = createMenu(menuList, {
                    position: menuContainer, bar: bar
                });
            }
            else {
                ui.connectMenuContainer = menuContainer;
                ui.click.connectMenu = function () {
                    if (menuContainer.classList.contains('hidden')) {
                        if (_status.waitingForPlayer) {
                            startButton.innerHTML = '设';
                            var start = menux.pages[0].firstChild;
                            for (var i = 0; i < start.childNodes.length; i++) {
                                if (start.childNodes[i].mode != lib.configOL.mode) {
                                    start.childNodes[i].classList.add('unselectable');
                                    start.childNodes[i].classList.remove('active');
                                    start.childNodes[i].link.remove();
                                }
                                else {
                                    start.childNodes[i].classList.add('active');
                                    start.nextSibling.appendChild(start.childNodes[i].link);
                                }
                            }
                        }
                        ui.window.classList.add('shortcutpaused');
                        menuContainer.classList.remove('hidden');
                        for (var i = 0; i < menuUpdates.length; i++) {
                            menuUpdates[i]();
                        }
                    }
                    else {
                        clickContainer.call(menuContainer);
                    }
                }

                menux = createMenu(menuList, {
                    position: menuContainer, bar: bar
                });
                menu = menux.menu;
            }
            var menuxpages = menux.pages.slice(0);

            var copyObj = get.copy;

            if (menuList.includes('开始') || menuList.includes('模式'))
                (function () {
                    var start = menuxpages.shift();
                    var rightPane = start.lastChild;

                    startButton = ui.create.div('.menubutton.round.highlight', '启', start, function () {
                        if (this.animating || this.classList.contains('dim')) {
                            return;
                        }
                        var active = this.parentNode.querySelector('.active');
                        if (active) {
                            if (connectMenu) {
                                if (_status.waitingForPlayer) {
                                    var config = {};
                                    for (var i in lib.mode[lib.configOL.mode].connect) {
                                        if (i == 'update') continue;
                                        config[i.slice(8)] = get.config(i, lib.configOL.mode);
                                    }
                                    if (game.online) {
                                        if (game.onlinezhu) {
                                            game.send('changeRoomConfig', config);
                                        }
                                    }
                                    else {
                                        game.broadcastAll(function (config) {
                                            for (var i in config) {
                                                lib.configOL[i] = config[i];
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
                                        game.connectPlayers[0].chat('房间设置已更改');
                                    }
                                }
                                else if (_status.enteringroom || _status.creatingroom) {
                                    lib.configOL.mode = active.mode;
                                    if (_status.enteringroomserver) {
                                        game.saveConfig('connect_mode', lib.configOL.mode);

                                        var config = {};
                                        for (var i in lib.mode[lib.configOL.mode].connect) {
                                            if (i == 'update') continue;
                                            config[i.slice(8)] = get.config(i, lib.configOL.mode);
                                        }

                                        config.characterPack = lib.connectCharacterPack.slice(0);
                                        config.cardPack = lib.connectCardPack.slice(0);
                                        for (var i = 0; i < lib.config.connect_characters.length; i++) {
                                            config.characterPack.remove(lib.config.connect_characters[i]);
                                        }
                                        for (var i = 0; i < lib.config.connect_cards.length; i++) {
                                            config.cardPack.remove(lib.config.connect_cards[i]);
                                        }
                                        config.banned = lib.config['connect_' + active.mode + '_banned'];
                                        config.bannedcards = lib.config['connect_' + active.mode + '_bannedcards'];
                                        game.send('server', 'create', game.onlineKey, get.connectNickname(), lib.config.connect_avatar, config, active.mode);
                                    }
                                    else {
                                        game.send('server', 'create', game.onlineKey, get.connectNickname(), lib.config.connect_avatar);
                                    }
                                }
                                else {
                                    localStorage.setItem(lib.configprefix + 'directstart', true);
                                    game.saveConfig('directstartmode', active.mode);
                                    game.saveConfig('mode', 'connect');
                                    ui.exitroom = ui.create.system('退出房间', function () {
                                        game.saveConfig('directstartmode');
                                        game.reload();
                                    }, true);
                                    game.switchMode(active.mode);
                                }
                                clickContainer.call(menuContainer);
                            }
                            else {
                                game.saveConfig('mode', active.mode);
                                localStorage.setItem(lib.configprefix + 'directstart', true);
                                game.reload();
                            }
                        }
                    });

                    var clickMode = function () {
                        if (this.classList.contains('unselectable')) return;
                        var active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                        if (connectMenu) {
                            if (updateActive) updateActive();
                            if (updateActiveCard) updateActiveCard();
                        }
                    };

                    var createModeConfig = function (mode, position) {
                        var info = lib.mode[mode];
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', info.name, position, clickMode);
                        node.link = page;
                        node.mode = mode;
                        if (connectMenu) {
                            if (mode == lib.config.connect_mode) {
                                node.classList.add('active');
                            }
                        }
                        else {
                            if (mode == lib.config.mode) {
                                node.classList.add('active');
                            }
                        }
                        var map = {};
                        var infoconfig = connectMenu ? info.connect : info.config;
                        if (infoconfig) {
                            var hiddenNodes = [];
                            var config = lib.config.mode_config[mode] || {};
                            if (connectMenu) {
                                infoconfig.connect_choose_timeout = {
                                    name: '出牌时限',
                                    init: '30',
                                    item: {
                                        '10': '10秒',
                                        '15': '15秒',
                                        '30': '30秒',
                                        '60': '60秒',
                                        '90': '90秒',
                                    },
                                    connect: true,
                                    frequent: true
                                };
                                infoconfig.connect_chooseCharacter_timeout = {
                                    name: '五倍选将时间',
                                    init: true,
                                    connect: true,
                                    intro: function () {
                                        return '将选将阶段（包括选择是否使用手气牌）的时间翻五倍';
                                    },
                                };
                                infoconfig.connect_observe = {
                                    name: '允许旁观',
                                    init: true,
                                    connect: true
                                };
                                infoconfig.connect_observe_handcard = {
                                    name: '允许观看手牌',
                                    init: false,
                                    connect: true
                                };
                                infoconfig.connect_protect_beginner = {
                                    name: '保护新手模式',
                                    init: true,
                                    connect: true,
                                    intro: function () {
                                        return '开启保护新手模式时，化鲸包、测试包、特殊包和一些上手难度较高的角色不会出现在选将框中，卡包限制在标准与军争之内，不能进行升阶';
                                    },
                                };
                                infoconfig.connect_observe_race = {
                                    name: '比赛模式',
                                    init: false,
                                    connect: true,
                                    intro: function () {
                                        return '开启比赛模式后，游戏内的座次始终等于玩家进入房间的顺序';
                                    },
                                };
                            }
                            for (var j in infoconfig) {
                                if (j === 'update') {
                                    continue;
                                }
                                var cfg = copyObj(infoconfig[j]);
                                cfg._name = j;
                                cfg.mode = mode;
                                if (!config.hasOwnProperty(j)) {
                                    game.saveConfig(j, cfg.init, mode);
                                }
                                else {
                                    cfg.init = config[j];
                                }
                                if (!cfg.onclick) {
                                    cfg.onclick = function (result) {
                                        var cfg = this._link.config;
                                        game.saveConfig(cfg._name, result, mode);
                                        if (cfg.onsave) {
                                            cfg.onsave.call(this, result);
                                        }
                                        if (!_status.connectMode || game.online) {
                                            if (typeof cfg.restart == 'function') {
                                                if (cfg.restart()) {
                                                    startButton.classList.add('glowing');
                                                }
                                            }
                                            else if (cfg.restart) {
                                                startButton.classList.add('glowing');
                                            }
                                        }
                                    };
                                }
                                if (infoconfig.update) {
                                    cfg.update = function () {
                                        infoconfig.update(config, map);
                                    };
                                }
                                var cfgnode = createConfig(cfg);
                                map[j] = cfgnode;
                                if (cfg.frequent) {
                                    page.appendChild(cfgnode);
                                }
                                else {
                                    cfgnode.classList.add('auto-hide');
                                    hiddenNodes.push(cfgnode);
                                }
                            }
                            if (!connectMenu) {
                                var move = ui.create.div('.auto-hide.config', '<div style="margin-right:10px" class="pointerdiv">上移↑</div><div class="pointerdiv">下移↓</div>');
                                move.firstChild.listen(function () {
                                    if (node.previousSibling) {
                                        node.parentNode.insertBefore(node, node.previousSibling);
                                        var order = [];
                                        for (var i = 0; i < node.parentNode.childNodes.length; i++) {
                                            order.push(node.parentNode.childNodes[i].mode);
                                        }
                                        game.saveConfig('modeorder', order);
                                    }
                                });
                                move.lastChild.listen(function () {
                                    if (node.nextSibling) {
                                        if (node.nextSibling.nextSibling) {
                                            node.parentNode.insertBefore(node, node.nextSibling.nextSibling);
                                        }
                                        else {
                                            node.parentNode.insertBefore(node.nextSibling, node);
                                        }
                                        var order = [];
                                        for (var i = 0; i < node.parentNode.childNodes.length; i++) {
                                            order.push(node.parentNode.childNodes[i].mode);
                                        }
                                        game.saveConfig('modeorder', order);
                                    }
                                });
                                hiddenNodes.push(move);
                            }
                            var expanded = false;
                            var hasexpand = true;
                            if (hiddenNodes.length) {
                                if (lib.config.fold_mode) {
                                    var clickmore = function (type) {
                                        if (type === 'expand' && expanded) return;
                                        if (type === 'unexpand' && !expanded) return;
                                        if (expanded) {
                                            this.classList.remove('on');
                                            this.parentNode.classList.remove('expanded');
                                        }
                                        else {
                                            this.classList.add('on');
                                            this.parentNode.classList.add('expanded');
                                        }
                                        expanded = !expanded;
                                    };
                                    var morenodes = ui.create.div('.config.more', '更多 <div>&gt;</div>', page);
                                    morenodes.listen(clickmore);
                                    morenodes._onclick = clickmore;
                                    page.morenodes = morenodes;
                                }
                                else {
                                    page.classList.add('expanded');
                                    if (!connectMenu) {
                                        page.classList.add('expanded2');
                                    }
                                }
                                for (var k = 0; k < hiddenNodes.length; k++) {
                                    page.appendChild(hiddenNodes[k]);
                                }
                            }
                            else {
                                hasexpand = false;
                            }
                            if (!connectMenu) {
                                var hidemode = ui.create.div('.config.pointerspan', '<span>隐藏此模式</span>', page, function () {
                                    if (this.firstChild.innerHTML == '隐藏此模式') {
                                        this.firstChild.innerHTML = '此模式将在重启后隐藏';
                                        lib.config.hiddenModePack.add(mode);
                                        if (!lib.config.prompt_hidepack) {
                                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                                            game.saveConfig('prompt_hidepack', true);
                                        }
                                    }
                                    else {
                                        this.firstChild.innerHTML = '隐藏此模式';
                                        lib.config.hiddenModePack.remove(mode);
                                    }
                                    game.saveConfig('hiddenModePack', lib.config.hiddenModePack);
                                });
                                if (hasexpand) {
                                    hidemode.classList.add('auto-hide');
                                }
                            }
                            if (infoconfig.update) {
                                infoconfig.update(config, map);
                                node.update = function () {
                                    infoconfig.update(config, map);
                                }
                            }
                        }
                        if (connectMenu) {
                            menuUpdates.push(function () {
                                if (_status.waitingForPlayer) {
                                    if (map.connect_player_number) {
                                        map.connect_player_number.style.display = 'none';
                                    }
                                    if (map.connect_versus_mode) {
                                        map.connect_versus_mode.style.display = 'none';
                                    }
                                }
                            })
                        }
                        return node;
                    };
                    var modeorder = lib.config.modeorder || [];
                    for (var i in lib.mode) {
                        modeorder.add(i);
                    }
                    for (var i = 0; i < modeorder.length; i++) {
                        if (connectMenu) {
                            if (!lib.mode[modeorder[i]].connect) continue;
                            if (!lib.config['connect_' + modeorder[i] + '_banned']) {
                                lib.config['connect_' + modeorder[i] + '_banned'] = [];
                            }
                            if (!lib.config['connect_' + modeorder[i] + '_bannedcards']) {
                                lib.config['connect_' + modeorder[i] + '_bannedcards'] = [];
                            }
                        }
                        if (lib.config.all.mode.contains(modeorder[i])) {
                            createModeConfig(modeorder[i], start.firstChild);
                        }
                    }
                    var active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                    if (lib.config.fold_mode) {
                        rightPane.addEventListener('mousewheel', function (e) {
                            var morenodes = this.firstChild.morenodes;
                            if (morenodes) {
                                if (e.wheelDelta < 0) {
                                    morenodes._onclick.call(morenodes, 'expand');
                                }
                                else if (this.scrollTop == 0) {
                                    morenodes._onclick.call(morenodes, 'unexpand');
                                }
                            }
                        }, { passive: true });
                    }
                }());

            if (menuList.includes('选项'))
                (function () {
                    if (connectMenu) return;
                    let start = menuxpages.shift();
                    let rightPane = start.lastChild;

                    let clickMode = function () {
                        let active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                    };

                    let clickAutoSkill = function (bool) {
                        let name = this._link.config._name;
                        let list = lib.config.autoskilllist;
                        if (bool) {
                            list.remove(name);
                        }
                        else {
                            list.add(name);
                        }
                        game.saveConfig('autoskilllist', list);
                    };
                    let skilllistexpanded = game.expandSkills(lib.skilllist);
                    for (let i in lib.skill) {
                        if (!skilllistexpanded.contains(i)) continue;
                        if (lib.skill[i].frequent && lib.translate[i]) {
                            lib.configMenu.skill.config[i] = {
                                name: lib.translate[i + '_noconf'] || lib.translate[i],
                                init: true,
                                type: 'autoskill',
                                onclick: clickAutoSkill,
                                intro: lib.translate[i + '_info']
                            }
                        }
                    }
                    let clickBanSkill = function (bool) {
                        let name = this._link.config._name;
                        let list = lib.config.forbidlist;
                        if (bool) {
                            list.remove(name);
                        }
                        else {
                            list.add(name);
                        }
                        game.saveConfig('forbidlist', list);
                    };
                    let forbid = lib.config.forbid;
                    if (!lib.config.forbidlist) {
                        game.saveConfig('forbidlist', []);
                    }
                    for (let i = 0; i < forbid.length; i++) {
                        let skip = false;
                        let str = '';
                        let str2 = '';
                        let str3 = '';
                        for (let j = 0; j < forbid[i].length; j++) {
                            if (!lib.skilllist.contains(forbid[i][j])) {
                                skip = true;
                                break;
                            }
                            str += get.translation(forbid[i][j]) + '+';
                            str2 += forbid[i][j] + '+';
                            str3 += get.translation(forbid[i][j]) + '：' + lib.translate[forbid[i][j] + '_info'];
                            if (j < forbid[i].length - 1) {
                                str3 += '<div class="placeholder slim" style="display:block;height:8px"></div>';
                            }
                        }
                        if (skip) continue;
                        str = str.slice(0, str.length - 1);
                        str2 = str2.slice(0, str2.length - 1);

                        lib.configMenu.skill.config[str2] = {
                            name: str,
                            init: true,
                            type: 'banskill',
                            onclick: clickBanSkill,
                            intro: str3
                        }
                    }

                    let updateView = null;
                    let updateAppearence = null;
                    let createModeConfig = function (mode, position) {
                        let info = lib.configMenu[mode];
                        let page = ui.create.div('');
                        let node = ui.create.div('.menubutton.large', info.name, position, clickMode);
                        node.link = page;
                        node.mode = mode;
                        let map = {};
                        if (info.config) {
                            let hiddenNodes = [];
                            let autoskillNodes = [];
                            let banskillNodes = [];
                            let custombanskillNodes = [];
                            let banskill;

                            if (mode == 'skill') {
                                let autoskillexpanded = false;
                                let banskillexpanded = false;
                                ui.create.div('.config.more', '自动发动 <div>&gt;</div>', page, function () {
                                    if (autoskillexpanded) {
                                        this.classList.remove('on');
                                        for (let k = 0; k < autoskillNodes.length; k++) {
                                            autoskillNodes[k].style.display = 'none';
                                        }
                                    }
                                    else {
                                        this.classList.add('on');
                                        for (let k = 0; k < autoskillNodes.length; k++) {
                                            autoskillNodes[k].style.display = '';
                                        }
                                    }
                                    autoskillexpanded = !autoskillexpanded;
                                });
                                banskill = ui.create.div('.config.more', '双将禁配 <div>&gt;</div>', page, function () {
                                    if (banskillexpanded) {
                                        this.classList.remove('on');
                                        for (let k = 0; k < banskillNodes.length; k++) {
                                            banskillNodes[k].style.display = 'none';
                                        }
                                    }
                                    else {
                                        this.classList.add('on');
                                        for (let k = 0; k < banskillNodes.length; k++) {
                                            banskillNodes[k].style.display = '';
                                        }
                                    }
                                    banskillexpanded = !banskillexpanded;
                                });

                                let banskilladd = ui.create.div('.config.indent', '<span class="pointerdiv">添加...</span>', page, function () {
                                    this.nextSibling.classList.toggle('hidden');
                                });
                                banskilladd.style.display = 'none';
                                banskillNodes.push(banskilladd);

                                let banskilladdNode = ui.create.div('.config.indent.hidden.banskilladd', page);
                                banskilladdNode.style.display = 'none';
                                banskillNodes.push(banskilladdNode);

                                let matchBanSkill = function (skills1, skills2) {
                                    if (skills1.length != skills2.length) return false;
                                    for (let i = 0; i < skills1.length; i++) {
                                        if (!skills2.contains(skills1[i])) return false;
                                    }
                                    return true;
                                }
                                let deleteCustomBanSkill = function () {
                                    for (let i = 0; i < lib.config.customforbid.length; i++) {
                                        if (matchBanSkill(lib.config.customforbid[i], this.parentNode.link)) {
                                            lib.config.customforbid.splice(i--, 1);
                                            break;
                                        }
                                    }
                                    game.saveConfig('customforbid', lib.config.customforbid);
                                    this.parentNode.remove();
                                }
                                let createCustomBanSkill = function (skills) {
                                    let node = ui.create.div('.config.indent.toggle');
                                    node.style.display = 'none';
                                    node.link = skills;
                                    banskillNodes.push(node);
                                    custombanskillNodes.push(node);
                                    let str = get.translation(skills[0]);
                                    for (let i = 1; i < skills.length; i++) {
                                        str += '+' + get.translation(skills[i]);
                                    }
                                    node.innerHTML = str;
                                    let span = document.createElement('span');
                                    span.classList.add('cardpiledelete');
                                    span.innerHTML = '删除';
                                    span.onclick = deleteCustomBanSkill;
                                    node.appendChild(span);
                                    page.insertBefore(node, banskilladdNode.nextSibling);
                                    return node;
                                };
                                for (let i = 0; i < lib.config.customforbid.length; i++) {
                                    createCustomBanSkill(lib.config.customforbid[i]);
                                }
                                (function () {
                                    let list = [];
                                    for (let i in lib.character) {
                                        if (lib.character[i][3].length)
                                            list.push([i, lib.translate[i]]);
                                    }

                                    list.sort(function (a, b) {
                                        a = a[0]; b = b[0];
                                        let aa = a, bb = b;
                                        if (aa.indexOf('_') != -1) {
                                            aa = aa.slice(aa.indexOf('_') + 1);
                                        }
                                        if (bb.indexOf('_') != -1) {
                                            bb = bb.slice(bb.indexOf('_') + 1);
                                        }
                                        if (aa != bb) {
                                            return aa > bb ? 1 : -1;
                                        }
                                        return a > b ? 1 : -1;
                                    });

                                    let list2 = [];
                                    let skills = lib.character[list[0][0]][3];
                                    for (let i = 0; i < skills.length; i++) {
                                        list2.push([skills[i], lib.translate[skills[i]]]);
                                    }

                                    let selectname = ui.create.selectlist(list, list[0], banskilladdNode);
                                    selectname.onchange = function () {
                                        let skills = lib.character[this.value][3];
                                        skillopt.innerHTML = '';
                                        for (let i = 0; i < skills.length; i++) {
                                            let option = document.createElement('option');
                                            option.value = skills[i];
                                            option.innerHTML = lib.translate[skills[i]];
                                            skillopt.appendChild(option);
                                        }
                                    };
                                    selectname.style.maxWidth = '85px';
                                    let skillopt = ui.create.selectlist(list2, list2[0], banskilladdNode);

                                    let span = document.createElement('span');
                                    span.innerHTML = '＋';
                                    banskilladdNode.appendChild(span);
                                    let br = document.createElement('br');
                                    banskilladdNode.appendChild(br);

                                    let selectname2 = ui.create.selectlist(list, list[0], banskilladdNode);
                                    selectname2.onchange = function () {
                                        let skills = lib.character[this.value][3];
                                        skillopt2.innerHTML = '';
                                        for (let i = 0; i < skills.length; i++) {
                                            let option = document.createElement('option');
                                            option.value = skills[i];
                                            option.innerHTML = lib.translate[skills[i]];
                                            skillopt2.appendChild(option);
                                        }
                                    };
                                    selectname2.style.maxWidth = '85px';
                                    let skillopt2 = ui.create.selectlist(list2, list2[0], banskilladdNode);
                                    let confirmbutton = document.createElement('button');
                                    confirmbutton.innerHTML = '确定';
                                    banskilladdNode.appendChild(confirmbutton);

                                    confirmbutton.onclick = function () {
                                        let skills = [skillopt.value, skillopt2.value];
                                        if (skills[0] == skills[1]) {
                                            skills.shift();
                                        }
                                        if (!lib.config.customforbid) return;
                                        for (let i = 0; i < lib.config.customforbid.length; i++) {
                                            if (matchBanSkill(lib.config.customforbid[i], skills)) return;
                                        }
                                        lib.config.customforbid.push(skills);
                                        game.saveConfig('customforbid', lib.config.customforbid);
                                        createCustomBanSkill(skills).style.display = '';
                                    }
                                }());
                                page.style.paddingBottom = '10px';
                            }
                            let config = lib.config;
                            if (mode == 'appearence') {
                                updateAppearence = function () {
                                    info.config.update(config, map);
                                };
                            }
                            else if (mode == 'view') {
                                updateView = function () {
                                    info.config.update(config, map);
                                };
                            }
                            for (let j in info.config) {
                                if (j === 'update') {
                                    continue;
                                }
                                let cfg = copyObj(info.config[j]);
                                cfg._name = j;
                                if (!config.hasOwnProperty(j)) {
                                    if (cfg.type != 'autoskill' && cfg.type != 'banskill') {
                                        game.saveConfig(j, cfg.init);
                                    }
                                }
                                else {
                                    cfg.init = config[j];
                                }
                                if (!cfg.onclick) {
                                    cfg.onclick = function (result) {
                                        let cfg = this._link.config;
                                        game.saveConfig(cfg._name, result);
                                        if (cfg.onsave) {
                                            cfg.onsave.call(this, result);
                                        }
                                    };
                                }
                                if (info.config.update) {
                                    if (mode == 'appearence' || mode == 'view') {
                                        cfg.update = function () {
                                            if (updateAppearence) {
                                                updateAppearence();
                                            }
                                            if (updateView) {
                                                updateView();
                                            }
                                        };
                                    }
                                    else {
                                        cfg.update = function () {
                                            info.config.update(config, map);
                                        };
                                    }
                                }
                                let cfgnode = createConfig(cfg);
                                if (cfg.type == 'autoskill') {
                                    autoskillNodes.push(cfgnode);
                                    // cfgnode.style.transition='all 0s';
                                    cfgnode.classList.add('indent');
                                    // cfgnode.hide();
                                    cfgnode.style.display = 'none';
                                }
                                else if (cfg.type == 'banskill') {
                                    banskillNodes.push(cfgnode);
                                    // cfgnode.style.transition='all 0s';
                                    cfgnode.classList.add('indent');
                                    // cfgnode.hide();
                                    cfgnode.style.display = 'none';
                                }
                                if (j == 'import_data_button') {
                                    ui.import_data_button = cfgnode;
                                    cfgnode.hide();
                                    cfgnode.querySelector('button').onclick = function () {
                                        let fileToLoad = this.previousSibling.files[0];
                                        if (fileToLoad) {
                                            let fileReader = new FileReader();
                                            fileReader.onload = function (fileLoadedEvent) {
                                                let data = fileLoadedEvent.target.result;
                                                if (!data) return;
                                                try {
                                                    data = JSON.parse(lib.init.decode(data));
                                                    if (!data || typeof data != 'object') {
                                                        throw ('err');
                                                    }
                                                    if (lib.db && (!data.config || !data.data)) {
                                                        throw ('err');
                                                    }
                                                }
                                                catch (e) {
                                                    console.log(e);
                                                    alert('导入失败');
                                                    return;
                                                }
                                                alert('导入成功');
                                                if (!lib.db) {
                                                    let noname_inited = localStorage.getItem('noname_inited');
                                                    let onlineKey = localStorage.getItem(lib.configprefix + 'key');
                                                    localStorage.clear();
                                                    if (noname_inited) {
                                                        localStorage.setItem('noname_inited', noname_inited);
                                                    }
                                                    if (onlineKey) {
                                                        localStorage.setItem(lib.configprefix + 'key', onlineKey);
                                                    }
                                                    for (let i in data) {
                                                        localStorage.setItem(i, data[i]);
                                                    }
                                                }
                                                else {
                                                    for (let i in data.config) {
                                                        game.putDB('config', i, data.config[i]);
                                                        lib.config[i] = data.config[i];
                                                    }
                                                    for (let i in data.data) {
                                                        game.putDB('data', i, data.data[i]);
                                                    }
                                                }
                                                lib.init.background();
                                                game.reload();
                                            };
                                            fileReader.readAsText(fileToLoad, "UTF-8");
                                        }
                                    }
                                }
                                else if (j == 'import_music') {
                                    cfgnode.querySelector('button').onclick = function () {
                                        if (_status.music_importing) return;
                                        _status.music_importing = true;
                                        let fileToLoad = this.previousSibling.files[0];
                                        if (fileToLoad) {
                                            if (!lib.config.customBackgroundMusic) lib.config.customBackgroundMusic = {};
                                            let name = fileToLoad.name;
                                            if (name.indexOf('.') != -1) {
                                                name = name.slice(0, name.indexOf('.'));
                                            }
                                            let link = (game.writeFile ? 'cdv_' : 'custom_') + name;
                                            if (lib.config.customBackgroundMusic[link]) {
                                                if (!confirm('已经存在文件名称相同的背景音乐，是否仍然要继续导入？')) { _status.music_importing = false; return };
                                                for (let i = 1; i < 1000; i++) {
                                                    if (!lib.config.customBackgroundMusic[link + '_' + i]) {
                                                        link = link + '_' + i; break;
                                                    }
                                                }
                                            }
                                            let callback = function () {
                                                let nodexx = ui.background_music_setting;
                                                let nodeyy = nodexx._link.menu;
                                                let nodezz = nodexx._link.config;
                                                let musicname = link.slice(link.indexOf('_') + 1);
                                                game.prompt('###请输入音乐的名称###' + musicname, true, function (str) {
                                                    if (str) musicname = str;
                                                    lib.config.customBackgroundMusic[link] = musicname;
                                                    lib.config.background_music = link;
                                                    lib.config.all.background_music.add(link);
                                                    game.saveConfig('background_music', link);
                                                    game.saveConfig('customBackgroundMusic', lib.config.customBackgroundMusic);
                                                    nodezz.item[link] = lib.config.customBackgroundMusic[link];
                                                    let textMenu = ui.create.div('', lib.config.customBackgroundMusic[link], nodeyy, clickMenuItem, nodeyy.childElementCount - 2);
                                                    textMenu._link = link;
                                                    nodezz.updatex.call(nodexx, []);
                                                    _status.music_importing = false;
                                                    if (!_status._aozhan) game.playBackgroundMusic();
                                                });
                                            };
                                            if (game.writeFile) {
                                                game.writeFile(fileToLoad, 'audio/background', link + '.mp3', callback);
                                            }
                                            else {
                                                game.putDB('audio', link, fileToLoad, callback);
                                            }
                                        }
                                    }
                                }
                                else if (j == 'extension_source') {
                                    ui.extension_source = cfgnode;
                                    cfgnode.updateInner = function () {
                                        this._link.choosing.innerHTML = lib.config.extension_source;
                                    }
                                }
                                map[j] = cfgnode;
                                if (!cfg.unfrequent) {
                                    if (cfg.type == 'autoskill') {
                                        page.insertBefore(cfgnode, banskill);
                                    }
                                    else {
                                        page.appendChild(cfgnode);
                                    }
                                }
                                else {
                                    // cfgnode.classList.add('auto-hide');
                                    hiddenNodes.push(cfgnode);
                                }
                            }
                            if (hiddenNodes.length) {
                                page.classList.add('morenodes');
                                for (let k = 0; k < hiddenNodes.length; k++) {
                                    page.appendChild(hiddenNodes[k]);
                                }
                            }
                            if (info.config.update) {
                                info.config.update(config, map);
                            }
                        }
                        return node;
                    };

                    for (let i in lib.configMenu) {
                        if (i != 'others') createModeConfig(i, start.firstChild);
                    }
                    createModeConfig('others', start.firstChild);

                    let active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                }());
            if (menuList.includes('基础'))
                (function () {
                    let start = menuxpages.shift();
                    let rightPane = start.lastChild;

                    let clickMode = function () {
                        let active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                    };

                    let createModeConfig = function (mode, position) {
                        let info = lib.configBaseMenu[mode];
                        let page = ui.create.div('');
                        let node = ui.create.div('.menubutton.large', info.name, position, clickMode);
                        node.link = page;
                        node.mode = mode;
                        let map = {};
                        if (info.config) {
                            let hiddenNodes = [];

                            let config = lib.config;
                            for (let j in info.config) {
                                if (j === 'update') {
                                    continue;
                                }
                                let cfg = copyObj(info.config[j]);
                                cfg._name = j;
                                if (!config.hasOwnProperty(j)) {
                                    game.saveConfig(j, cfg.init);
                                }
                                else {
                                    cfg.init = config[j];
                                }
                                if (!cfg.onclick) {
                                    cfg.onclick = function (result) {
                                        let cfg = this._link.config;
                                        game.saveConfig(cfg._name, result);
                                        if (cfg.onsave) {
                                            cfg.onsave.call(this, result);
                                        }
                                    };
                                }
                                if (info.config.update) {
                                    cfg.update = function () {
                                        info.config.update(config, map);
                                    };
                                }
                                let cfgnode = createConfig(cfg);
                                if (j == 'extension_source') {
                                    ui.extension_source = cfgnode;
                                    cfgnode.updateInner = function () {
                                        this._link.choosing.innerHTML = lib.config.extension_source;
                                    }
                                }
                                map[j] = cfgnode;
                                if (!cfg.unfrequent) {
                                    page.appendChild(cfgnode);
                                }
                                else {
                                    // cfgnode.classList.add('auto-hide');
                                    hiddenNodes.push(cfgnode);
                                }
                            }
                            if (hiddenNodes.length) {
                                page.classList.add('morenodes');
                                for (let k = 0; k < hiddenNodes.length; k++) {
                                    page.appendChild(hiddenNodes[k]);
                                }
                            }
                            if (info.config.update) {
                                info.config.update(config, map);
                            }
                        }
                        return node;
                    };

                    for (let i in lib.configBaseMenu) {
                        createModeConfig(i, start.firstChild);
                    }

                    let active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                }());

            if (menuList.includes('演出'))
                (function () {
                    if (connectMenu) return;
                    let start = menuxpages.shift();
                    let rightPane = start.lastChild;

                    let clickMode = function () {
                        let active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                    };


                    let updateView = null;
                    let updateAppearence = null;
                    let createModeConfig = function (mode, position) {
                        let info = lib.configMenu[mode];
                        let page = ui.create.div('');
                        let node = ui.create.div('.menubutton.large', info.name, position, clickMode);
                        node.link = page;
                        node.mode = mode;
                        let map = {};
                        if (info.config) {
                            let hiddenNodes = [];

                            let config = lib.config;
                            if (mode == 'appearence') {
                                updateAppearence = function () {
                                    info.config.update(config, map);
                                };
                            }
                            else if (mode == 'view') {
                                updateView = function () {
                                    info.config.update(config, map);
                                };
                            }
                            for (let j in info.config) {
                                if (j === 'update') {
                                    continue;
                                }
                                let cfg = copyObj(info.config[j]);
                                cfg._name = j;
                                if (!config.hasOwnProperty(j)) {
                                    game.saveConfig(j, cfg.init);
                                }
                                else {
                                    cfg.init = config[j];
                                }
                                if (!cfg.onclick) {
                                    cfg.onclick = function (result) {
                                        let cfg = this._link.config;
                                        game.saveConfig(cfg._name, result);
                                        if (cfg.onsave) {
                                            cfg.onsave.call(this, result);
                                        }
                                    };
                                }
                                if (info.config.update) {
                                    if (mode == 'appearence' || mode == 'view') {
                                        cfg.update = function () {
                                            if (updateAppearence) {
                                                updateAppearence();
                                            }
                                            if (updateView) {
                                                updateView();
                                            }
                                        };
                                    }
                                    else {
                                        cfg.update = function () {
                                            info.config.update(config, map);
                                        };
                                    }
                                }
                                let cfgnode = createConfig(cfg);
                                if (j == 'import_data_button') {
                                    ui.import_data_button = cfgnode;
                                    cfgnode.hide();
                                    cfgnode.querySelector('button').onclick = function () {
                                        let fileToLoad = this.previousSibling.files[0];
                                        if (fileToLoad) {
                                            let fileReader = new FileReader();
                                            fileReader.onload = function (fileLoadedEvent) {
                                                let data = fileLoadedEvent.target.result;
                                                if (!data) return;
                                                try {
                                                    data = JSON.parse(lib.init.decode(data));
                                                    if (!data || typeof data != 'object') {
                                                        throw ('err');
                                                    }
                                                    if (lib.db && (!data.config || !data.data)) {
                                                        throw ('err');
                                                    }
                                                }
                                                catch (e) {
                                                    console.log(e);
                                                    alert('导入失败');
                                                    return;
                                                }
                                                alert('导入成功');
                                                if (!lib.db) {
                                                    let noname_inited = localStorage.getItem('noname_inited');
                                                    let onlineKey = localStorage.getItem(lib.configprefix + 'key');
                                                    localStorage.clear();
                                                    if (noname_inited) {
                                                        localStorage.setItem('noname_inited', noname_inited);
                                                    }
                                                    if (onlineKey) {
                                                        localStorage.setItem(lib.configprefix + 'key', onlineKey);
                                                    }
                                                    for (let i in data) {
                                                        localStorage.setItem(i, data[i]);
                                                    }
                                                }
                                                else {
                                                    for (let i in data.config) {
                                                        game.putDB('config', i, data.config[i]);
                                                        lib.config[i] = data.config[i];
                                                    }
                                                    for (let i in data.data) {
                                                        game.putDB('data', i, data.data[i]);
                                                    }
                                                }
                                                lib.init.background();
                                                game.reload();
                                            };
                                            fileReader.readAsText(fileToLoad, "UTF-8");
                                        }
                                    }
                                }
                                else if (j == 'import_music') {
                                    cfgnode.querySelector('button').onclick = function () {
                                        if (_status.music_importing) return;
                                        _status.music_importing = true;
                                        let fileToLoad = this.previousSibling.files[0];
                                        if (fileToLoad) {
                                            if (!lib.config.customBackgroundMusic) lib.config.customBackgroundMusic = {};
                                            let name = fileToLoad.name;
                                            if (name.indexOf('.') != -1) {
                                                name = name.slice(0, name.indexOf('.'));
                                            }
                                            let link = (game.writeFile ? 'cdv_' : 'custom_') + name;
                                            if (lib.config.customBackgroundMusic[link]) {
                                                if (!confirm('已经存在文件名称相同的背景音乐，是否仍然要继续导入？')) { _status.music_importing = false; return };
                                                for (let i = 1; i < 1000; i++) {
                                                    if (!lib.config.customBackgroundMusic[link + '_' + i]) {
                                                        link = link + '_' + i; break;
                                                    }
                                                }
                                            }
                                            let callback = function () {
                                                let nodexx = ui.background_music_setting;
                                                let nodeyy = nodexx._link.menu;
                                                let nodezz = nodexx._link.config;
                                                let musicname = link.slice(link.indexOf('_') + 1);
                                                game.prompt('###请输入音乐的名称###' + musicname, true, function (str) {
                                                    if (str) musicname = str;
                                                    lib.config.customBackgroundMusic[link] = musicname;
                                                    lib.config.background_music = link;
                                                    lib.config.all.background_music.add(link);
                                                    game.saveConfig('background_music', link);
                                                    game.saveConfig('customBackgroundMusic', lib.config.customBackgroundMusic);
                                                    nodezz.item[link] = lib.config.customBackgroundMusic[link];
                                                    let textMenu = ui.create.div('', lib.config.customBackgroundMusic[link], nodeyy, clickMenuItem, nodeyy.childElementCount - 2);
                                                    textMenu._link = link;
                                                    nodezz.updatex.call(nodexx, []);
                                                    _status.music_importing = false;
                                                    if (!_status._aozhan) game.playBackgroundMusic();
                                                });
                                            };
                                            if (game.writeFile) {
                                                game.writeFile(fileToLoad, 'audio/background', link + '.mp3', callback);
                                            }
                                            else {
                                                game.putDB('audio', link, fileToLoad, callback);
                                            }
                                        }
                                    }
                                }
                                else if (j == 'extension_source') {
                                    ui.extension_source = cfgnode;
                                    cfgnode.updateInner = function () {
                                        this._link.choosing.innerHTML = lib.config.extension_source;
                                    }
                                }
                                map[j] = cfgnode;
                                if (!cfg.unfrequent) {
                                    page.appendChild(cfgnode);
                                }
                                else {
                                    // cfgnode.classList.add('auto-hide');
                                    hiddenNodes.push(cfgnode);
                                }
                            }
                            if (hiddenNodes.length) {
                                page.classList.add('morenodes');
                                for (let k = 0; k < hiddenNodes.length; k++) {
                                    page.appendChild(hiddenNodes[k]);
                                }
                            }
                            if (info.config.update) {
                                info.config.update(config, map);
                            }
                        }
                        return node;
                    };

                    for (let i in lib.configMenu) {
                        if (!['others', 'general', 'skill'].includes(i)) createModeConfig(i, start.firstChild);
                    }
                    createModeConfig('others', start.firstChild);

                    let active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                }());

            if (menuList.includes('武将') || menuList.includes('角色'))
                (function () {
                    var start = menuxpages.shift();
                    var rightPane = start.lastChild;

                    var clickMode = function () {
                        var active = this.parentNode.querySelector('.active');
                        if (active) {
                            if (active === this) {
                                return;
                            }
                            active.classList.remove('active');
                            active.link.remove();
                        }
                        this.classList.add('active');
                        updateActive(this);
                        rightPane.appendChild(this.link);
                    };
                    updateActive = function (node) {
                        if (!node) {
                            node = start.firstChild.querySelector('.active');
                            if (!node) {
                                return;
                            }
                        }
                        for (var i = 0; i < node.link.childElementCount; i++) {
                            if (node.link.childNodes[i].updateBanned) {
                                node.link.childNodes[i].updateBanned();
                            }
                        }
                    };
                    var updateNodes = function () {
                        for (var i = 0; i < start.firstChild.childNodes.length; i++) {
                            var node = start.firstChild.childNodes[i];
                            if (node.link) {
                                if (node.mode.indexOf('mode_') == 0) continue;
                                if (node.mode == 'custom') continue;
                                if (connectMenu) {
                                    if (!lib.config.connect_characters.contains(node.mode)) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                                else {
                                    if (lib.config.characters.contains(node.mode)) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                            }
                        }
                    }
                    var togglePack = function (bool) {
                        var name = this._link.config._name;
                        if (connectMenu) {
                            if (!bool) {
                                lib.config.connect_characters.add(name);
                            }
                            else {
                                lib.config.connect_characters.remove(name);
                            }
                            game.saveConfig('connect_characters', lib.config.connect_characters);
                        }
                        else {
                            if (bool) {
                                lib.config.characters.add(name);
                            }
                            else {
                                lib.config.characters.remove(name);
                            }
                            game.saveConfig('characters', lib.config.characters);
                        }
                        updateNodes();
                    };

                    var createModeConfig = function (mode, position, position2) {
                        var info = lib.characterPack[mode];
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', lib.translate[mode + '_character_config'], position, clickMode);
                        if (node.innerHTML.length >= 5) {
                            node.classList.add('smallfont');
                        }
                        if (position2) {
                            position.insertBefore(node, position2);
                        }
                        node.link = page;
                        node.mode = mode;
                        page.node = node;
                        var list = [];
                        var boolAI = true;
                        var alterableSkills = [];
                        var alterableCharacters = [];
                        var charactersToAlter = [];
                        for (var i in info) {
                            if (info[i][4] && info[i][4].contains('unseen')) continue;
                            if (connectMenu && lib.connectBanned.contains(i)) continue;
                            if (connectMenu && lib.configOL.protect_beginner && get.is.banForBeginner(i)) return true;
                            list.push(i);
                            if (boolAI && !lib.config.forbidai_user.contains(i)) boolAI = false;
                            for (var j = 0; j < info[i][3].length; j++) {
                                if (!lib.skill[info[i][3][j]]) {
                                    continue;
                                }
                                if (lib.skill[info[i][3][j]].alter) {
                                    alterableSkills.add(info[i][3][j]);
                                    alterableCharacters.add(i);
                                    if (lib.config.vintageSkills.contains(info[i][3][j])) {
                                        charactersToAlter.add(i);
                                    }
                                }
                            }
                        }
                        alterableCharacters.sort();
                        var getGroup = function (name) {
                            let groups = get.charaGroups(name);
                            if (groups) return groups[0];
                        },
                            groupSort = function (name) {
                                if (!lib.character[name]) return 50;
                                var group = getGroup(name);
                                if (group == 'vtuber') return 40;
                                if (group == 'clubs') return 41;
                                var list = get.groups();
                                if (list.contains(group)) return list.indexOf(group);
                                return 49;
                            };
                        list.sort(function (a, b) {
                            var del = groupSort(a) - groupSort(b);
                            if (del != 0) return del;
                            var aa = a, bb = b;
                            if (a.indexOf('_') != -1) {
                                a = a.slice(a.lastIndexOf('_') + 1);
                            }
                            if (b.indexOf('_') != -1) {
                                b = b.slice(b.lastIndexOf('_') + 1);
                            }
                            if (a != b) {
                                return a > b ? 1 : -1;
                            }
                            return aa > bb ? 1 : -1;
                        });
                        var list2 = list.slice(0);
                        var cfgnode = createConfig({
                            name: '开启',
                            _name: mode,
                            init: lib.config.characters.contains(mode),
                            onclick: togglePack
                        });
                        var cfgnodeAI = createConfig({
                            name: '仅点将可用',
                            _name: mode,
                            init: boolAI,
                            intro: '将该武将包内的武将全部设置为仅点将可用',
                            onclick: function (bool) {
                                if (bool) {
                                    for (var i = 0; i < list.length; i++) {
                                        lib.config.forbidai_user.add(list[i]);
                                    }
                                }
                                else {
                                    for (var i = 0; i < list.length; i++) {
                                        lib.config.forbidai_user.remove(list[i]);
                                    }
                                }
                                game.saveConfig('forbidai_user', lib.config.forbidai_user);
                            },
                        });
                        if (mode.indexOf('mode_') != 0) {
                            cfgnodeAI.style.marginTop = '0px';
                            page.appendChild(cfgnode);
                            page.appendChild(cfgnodeAI);
                            if (alterableCharacters.length) {
                                var cfgnode2 = createConfig({
                                    name: '新版替换',
                                    _name: mode,
                                    init: charactersToAlter.length == 0,
                                    intro: '以下武将将被修改：' + get.translation(alterableCharacters),
                                    onclick: function (bool) {
                                        if (bool) {
                                            for (var i = 0; i < alterableSkills.length; i++) {
                                                lib.config.vintageSkills.remove(alterableSkills[i]);
                                                lib.translate[alterableSkills[i] + '_info'] = lib.translate[alterableSkills[i] + '_info_alter'];
                                            }
                                        }
                                        else {
                                            for (var i = 0; i < alterableSkills.length; i++) {
                                                lib.config.vintageSkills.add(alterableSkills[i]);
                                                lib.translate[alterableSkills[i] + '_info'] = lib.translate[alterableSkills[i] + '_info_origin'];
                                            }
                                        }
                                        game.saveConfig('vintageSkills', lib.config.vintageSkills);
                                    }
                                });
                                cfgnode2.style.marginTop = '0px';
                                page.appendChild(cfgnode2);
                            }
                        }
                        else if (mode.indexOf('mode_extension') == 0) {
                            page.appendChild(cfgnodeAI);
                        }
                        else {
                            page.style.paddingTop = '8px';
                        }
                        var banCharacter = function (e) {
                            if (_status.clicked) {
                                _status.clicked = false;
                                return;
                            }
                            if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 &&
                                mode != 'mode_favourite' && mode != 'mode_banned') {
                                if (!connectMenu && lib.config.show_charactercard) {
                                    ui.click.charactercard(this.link, this, mode == 'mode_guozhan' ? 'guozhan' : true);
                                }
                                return;
                            }
                            ui.click.touchpop();
                            this._banning = connectMenu ? 'online' : 'offline';
                            if (!connectMenu && lib.config.show_charactercard) {
                                ui.click.charactercard(this.link, this);
                            }
                            else {
                                ui.click.intro.call(this, e);
                            }
                            _status.clicked = false;
                            delete this._banning;
                        };
                        var updateBanned = function () {
                            var list;
                            if (connectMenu) {
                                var mode = menux.pages[0].firstChild.querySelector('.active');
                                if (mode && mode.mode) {
                                    list = lib.config['connect_' + mode.mode + '_banned'];
                                }
                            }
                            else {
                                list = lib.config[get.mode() + '_banned'];
                            }
                            if (list && list.contains(this.link)) {
                                this.classList.add('banned');
                            }
                            else {
                                this.classList.remove('banned');
                            }
                        };
                        if (lib.characterSort[mode]) {
                            var listb = [];
                            if (!connectMenu) {
                                listb = lib.config[get.mode() + '_banned'] || [];
                            }
                            else {
                                var modex = menux.pages[0].firstChild.querySelector('.active');
                                if (modex && modex.mode) {
                                    listb = lib.config['connect_' + modex.mode + '_banned'];
                                }
                            }
                            for (var pak in lib.characterSort[mode]) {
                                var info = lib.characterSort[mode][pak];
                                var listx = [];
                                var boolx = false;
                                for (var ii = 0; ii < list2.length; ii++) {
                                    if (info.contains(list2[ii])) {
                                        listx.add(list2[ii]);
                                        if (!listb.contains(list2[ii])) boolx = true;
                                        list2.splice(ii--, 1);
                                    }
                                }
                                if (listx.length) {
                                    var cfgnodeY = {
                                        name: lib.translate[pak],
                                        _name: pak,
                                        init: boolx,
                                        onclick: function (bool) {
                                            var banned = [];
                                            if (connectMenu) {
                                                var modex = menux.pages[0].firstChild.querySelector('.active');
                                                if (modex && modex.mode) {
                                                    banned = lib.config['connect_' + modex.mode + '_banned'];
                                                }
                                            }
                                            else if (_status.connectMode) return;
                                            else banned = lib.config[get.mode() + '_banned'] || [];
                                            var listx = lib.characterSort[mode][this._link.config._name];
                                            if (bool) {
                                                for (var i = 0; i < listx.length; i++) {
                                                    banned.remove(listx[i]);
                                                }
                                            }
                                            else {
                                                for (var i = 0; i < listx.length; i++) {
                                                    banned.add(listx[i]);
                                                }
                                            }
                                            game.saveConfig(connectMenu ? ('connect_' + modex.mode + '_banned') : (get.mode() + '_banned'), banned);
                                            updateActive();
                                        },
                                    };
                                    if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 && mode.indexOf('mode_guozhan') != 0) {
                                        cfgnodeY.clear = true;
                                        delete cfgnodeY.onclick;
                                    }
                                    var cfgnodeX = createConfig(cfgnodeY);
                                    page.appendChild(cfgnodeX);
                                    var buttons = ui.create.buttons(listx, 'character', page);
                                    for (var i = 0; i < buttons.length; i++) {
                                        buttons[i].classList.add('noclick');
                                        buttons[i].listen(banCharacter);
                                        ui.create.rarity(buttons[i]);
                                        buttons[i].node.hp.style.transition = 'all 0s';
                                        buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
                                        if (mode != 'mode_banned') {
                                            buttons[i].updateBanned = updateBanned;
                                        }
                                    }
                                }
                            }
                            if (list2.length) {
                                var cfgnodeX = createConfig({
                                    name: '其他',
                                    _name: 'others',
                                    clear: true,
                                });
                                page.appendChild(cfgnodeX);
                                var buttons = ui.create.buttons(list2, 'character', page);
                                for (var i = 0; i < buttons.length; i++) {
                                    buttons[i].classList.add('noclick');
                                    buttons[i].listen(banCharacter);
                                    ui.create.rarity(buttons[i]);
                                    buttons[i].node.hp.style.transition = 'all 0s';
                                    buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
                                    if (mode != 'mode_banned') {
                                        buttons[i].updateBanned = updateBanned;
                                    }
                                }
                            }
                        }
                        else {
                            var buttons = ui.create.buttons(list, 'character', page);
                            for (var i = 0; i < buttons.length; i++) {
                                buttons[i].classList.add('noclick');
                                ui.create.rarity(buttons[i]);
                                buttons[i].listen(banCharacter);
                                buttons[i].node.hp.style.transition = 'all 0s';
                                buttons[i].node.hp._innerHTML = buttons[i].node.hp.innerHTML;
                                if (mode != 'mode_banned') {
                                    buttons[i].updateBanned = updateBanned;
                                }
                            }
                        }
                        page.classList.add('menu-buttons');
                        page.classList.add('leftbutton');
                        // if (!connectMenu) {
                        //     if (mode.indexOf('mode_') != 0) {
                        //         ui.create.div('.config.pointerspan', '<span>隐藏武将包</span>', page, function () {
                        //             if (this.firstChild.innerHTML == '隐藏武将包') {
                        //                 this.firstChild.innerHTML = '武将包将在重启后隐藏';
                        //                 lib.config.hiddenCharacterPack.add(mode);
                        //                 if (!lib.config.prompt_hidepack) {
                        //                     alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                        //                     game.saveConfig('prompt_hidepack', true);
                        //                 }
                        //             }
                        //             else {
                        //                 this.firstChild.innerHTML = '隐藏武将包';
                        //                 lib.config.hiddenCharacterPack.remove(mode);
                        //             }
                        //             game.saveConfig('hiddenCharacterPack', lib.config.hiddenCharacterPack);
                        //         });
                        //     }
                        // }
                        return node;
                    };
                    if (lib.config.show_favourite_menu && !connectMenu && Array.isArray(lib.config.favouriteCharacter)) {
                        lib.characterPack.mode_favourite = {};
                        for (var i = 0; i < lib.config.favouriteCharacter.length; i++) {
                            var favname = lib.config.favouriteCharacter[i];
                            if (lib.character[favname]) {
                                lib.characterPack.mode_favourite[favname] = lib.character[favname];
                            }
                        }
                        ui.favouriteCharacter = createModeConfig('mode_favourite', start.firstChild).link;
                        if (get.is.empty(lib.characterPack.mode_favourite)) {
                            ui.favouriteCharacter.node.style.display = 'none';
                        }
                        delete lib.characterPack.mode_favourite;
                    }
                    if (!connectMenu && lib.config.show_ban_menu) {
                        lib.characterPack.mode_banned = {};
                        for (var i = 0; i < lib.config.all.mode.length; i++) {
                            var banned = lib.config[lib.config.all.mode[i] + '_banned'];
                            if (banned) {
                                for (var j = 0; j < banned.length; j++) {
                                    if (lib.character[banned[j]]) {
                                        lib.characterPack.mode_banned[banned[j]] = lib.character[banned[j]];
                                    }
                                }
                            }
                        }
                        var bannednode = createModeConfig('mode_banned', start.firstChild);
                        if (get.is.empty(lib.characterPack.mode_banned)) {
                            bannednode.style.display = 'none';
                        }
                        delete lib.characterPack.mode_banned;
                    }
                    var characterlist = connectMenu ? lib.connectCharacterPack : lib.config.all.characters;
                    for (var i = 0; i < characterlist.length; i++) {
                        //if(['sololive'].contains(characterlist[i])) continue;
                        createModeConfig(characterlist[i], start.firstChild);
                    }
                    if (!connectMenu) {
                        for (var i in lib.characterPack) {
                            if (i.indexOf('mode_') == 0) {
                                createModeConfig(i, start.firstChild);
                            }
                        }
                    }
                    var active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        if (active.style.display == 'none') {
                            active = active.nextSibling;
                            if (active.style.display == 'none') {
                                active = active.nextSibling;
                            }
                        }
                        active.classList.add('active');
                        updateActive(active);
                    }
                    rightPane.appendChild(active.link);

                    if (!connectMenu) {
                        var node1 = ui.create.div('.lefttext', '全部开启', start.firstChild, function () {
                            game.saveConfig('characters', lib.config.all.characters);
                            updateNodes();
                        });
                        var node2 = ui.create.div('.lefttext', '恢复默认', start.firstChild, function () {
                            game.saveConfig('characters', lib.config.defaultcharacters);
                            updateNodes();
                        });
                        node1.style.marginTop = '12px';
                        node2.style.marginTop = '7px';
                    }

                    updateNodes();
                }());

            if (menuList.includes('卡牌'))
                (function () {
                    var start = menuxpages.shift();
                    var rightPane = start.lastChild;
                    var pileCreated = false;
                    var recreatePile = function () {
                        lib.config.customcardpile['当前牌堆'] = [lib.config.bannedpile, lib.config.addedpile];
                        game.saveConfig('customcardpile', lib.config.customcardpile);
                        game.saveConfig('cardpilename', '当前牌堆', true);
                        pileCreated = false;
                    };

                    var clickMode = function () {
                        var active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        updateActiveCard(this);
                        if (this.mode == 'cardpile') {
                            this.create();
                        }
                        rightPane.appendChild(this.link);
                    };
                    updateActiveCard = function (node) {
                        if (!node) {
                            node = start.firstChild.querySelector('.active');
                            if (!node) {
                                return;
                            }
                        }
                        for (var i = 0; i < node.link.childElementCount; i++) {
                            if (node.link.childNodes[i].updateBanned) {
                                node.link.childNodes[i].updateBanned();
                            }
                        }
                    };
                    var updateNodes = function () {
                        for (var i = 0; i < start.firstChild.childNodes.length; i++) {
                            var node = start.firstChild.childNodes[i];
                            if (node.link) {
                                if (node.mode.indexOf('mode_') == 0) continue;
                                if (node.mode == 'custom') continue;
                                if (node.mode == 'cardpile') continue;
                                if (connectMenu) {
                                    if (!lib.config.connect_cards.contains(node.mode)) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                                else {
                                    if (lib.config.cards.contains(node.mode)) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                            }
                        }
                    }
                    var togglePack = function (bool) {
                        var name = this._link.config._name;
                        if (connectMenu) {
                            if (!bool) {
                                lib.config.connect_cards.add(name);
                            }
                            else {
                                lib.config.connect_cards.remove(name);
                            }
                            game.saveConfig('connect_cards', lib.config.connect_cards);
                        }
                        else {
                            if (bool) {
                                lib.config.cards.add(name);
                            }
                            else {
                                lib.config.cards.remove(name);
                            }
                            game.saveConfig('cards', lib.config.cards);
                        }
                        updateNodes();
                    };
                    var toggleCardPile = function (bool) {
                        var name = this._link.config._name;
                        var number = this._link.config._number;
                        if (!lib.config.bannedpile[name]) {
                            lib.config.bannedpile[name] = [];
                        }
                        if (bool) {
                            lib.config.bannedpile[name].remove(number);
                        }
                        else {
                            lib.config.bannedpile[name].add(number);
                        }
                        recreatePile();
                    }

                    var createModeConfig = function (mode, position) {
                        var info = lib.cardPack[mode];
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', lib.translate[mode + '_card_config'], position, clickMode);
                        if (node.innerHTML.length >= 5) {
                            node.classList.add('smallfont');
                        }
                        node.link = page;
                        node.mode = mode;
                        var list = [];
                        for (var i = 0; i < info.length; i++) {
                            if (!lib.card[info[i]] || (lib.card[info[i]].derivation && mode != 'mode_derivation')) continue;
                            list.push(['', get.translation(get.type(info[i], 'trick')), info[i]]);
                        }
                        var sortCard = function (card) {
                            var type = lib.card[card[2]].type;
                            var subtype = lib.card[card[2]].subtype;
                            if (lib.cardType[subtype]) {
                                return lib.cardType[subtype];
                            }
                            if (lib.cardType[type]) {
                                return lib.cardType[type];
                            }
                            switch (type) {
                                case 'basic': return 0;
                                case 'chess': return 1.5;
                                case 'trick': return 2;
                                case 'delay': return 3;
                                case 'equip': {
                                    switch (lib.card[card[2]].subtype) {
                                        case 'equip1': return 4.1;
                                        case 'equip2': return 4.2;
                                        case 'equip3': return 4.3;
                                        case 'equip4': return 4.4;
                                        case 'equip5': return 4.5;
                                        default: return 4;
                                    }
                                }
                                case 'zhenfa': return 5;
                                default: return 6;
                            }
                        }
                        list.sort(function (a, b) {
                            var sort1 = sortCard(a);
                            var sort2 = sortCard(b);
                            if (sort1 == sort2) {
                                return (b[2] < a[2]) ? 1 : -1;
                            }
                            else if (sort1 > sort2) {
                                return 1;
                            }
                            else {
                                return -1;
                            }
                        });
                        var cfgnode = createConfig({
                            name: '开启',
                            _name: mode,
                            init: lib.config.cards.contains(mode),
                            onclick: togglePack
                        });
                        if (mode.indexOf('mode_') != 0) {
                            page.appendChild(cfgnode);
                        }
                        else {
                            page.style.paddingTop = '8px';
                        }
                        var banCard = function (e) {
                            if (_status.clicked) {
                                _status.clicked = false;
                                return;
                            }
                            if (mode.indexOf('mode_') == 0 && mode.indexOf('mode_extension_') != 0 && mode != 'mode_banned') {
                                return;
                            }
                            ui.click.touchpop();
                            this._banning = connectMenu ? 'online' : 'offline';
                            ui.click.intro.call(this, e);
                            _status.clicked = false;
                            delete this._banning;
                        };
                        var updateBanned = function () {
                            var list;
                            if (connectMenu) {
                                var mode = menux.pages[0].firstChild.querySelector('.active');
                                if (mode && mode.mode) {
                                    list = lib.config['connect_' + mode.mode + '_bannedcards'];
                                }
                            }
                            else {
                                list = lib.config[get.mode() + '_bannedcards'];
                            }
                            if (list && list.contains(this.link[2])) {
                                this.classList.add('banned');
                            }
                            else {
                                this.classList.remove('banned');
                            }
                        };
                        var buttons = ui.create.buttons(list, 'vcard', page);
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].classList.add('noclick');
                            buttons[i].listen(banCard);
                            if (mode != 'mode_banned') {
                                buttons[i].updateBanned = updateBanned;
                            }
                        }
                        page.classList.add('menu-buttons');
                        page.classList.add('leftbutton');
                        if (!connectMenu && mode.indexOf('mode_') != 0) {
                            ui.create.div('.config.pointerspan', '<span>隐藏卡牌包</span>', page, function () {
                                if (this.firstChild.innerHTML == '隐藏卡牌包') {
                                    this.firstChild.innerHTML = '卡牌包将在重启后隐藏';
                                    lib.config.hiddenCardPack.add(mode);
                                    if (!lib.config.prompt_hidepack) {
                                        alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                                        game.saveConfig('prompt_hidepack', true);
                                    }
                                }
                                else {
                                    this.firstChild.innerHTML = '隐藏卡牌包';
                                    lib.config.hiddenCardPack.remove(mode);
                                }
                                game.saveConfig('hiddenCardPack', lib.config.hiddenCardPack);
                            });
                        }
                        if (mode.indexOf('mode_') != 0 && lib.cardPile[mode]) {
                            var cardpileNodes = [];
                            var cardpileexpanded = false;
                            if (!lib.config.bannedpile[mode]) {
                                lib.config.bannedpile[mode] = [];
                            }
                            if (!lib.config.addedpile[mode]) {
                                lib.config.addedpile[mode] = [];
                            }
                            ui.create.div('.config.more.pile', '编辑牌堆 <div>&gt;</div>', page, function () {
                                if (cardpileexpanded) {
                                    this.classList.remove('on');
                                    for (var k = 0; k < cardpileNodes.length; k++) {
                                        cardpileNodes[k].style.display = 'none';
                                    }
                                }
                                else {
                                    this.classList.add('on');
                                    for (var k = 0; k < cardpileNodes.length; k++) {
                                        cardpileNodes[k].style.display = '';
                                    }
                                }
                                cardpileexpanded = !cardpileexpanded;
                            });
                            var cfgnode = ui.create.div(page, '.config.pointerspan.cardpilecfg.toggle');
                            var cfgaddcard = ui.create.node('button', '', '添加卡牌', cfgnode, function () {
                                this.parentNode.nextSibling.classList.toggle('hidden');
                            });
                            var cfgbancard = ui.create.node('button', '', '全部关闭', cfgnode, function () {
                                for (var i = 0; i < cardpileNodes.length; i++) {
                                    if (cardpileNodes[i].type == 'defaultcards' && cardpileNodes[i].classList.contains('on')) {
                                        clickToggle.call(cardpileNodes[i]);
                                    }
                                }
                            });
                            var cfgenablecard = ui.create.node('button', '', '全部开启', cfgnode, function () {
                                for (var i = 0; i < cardpileNodes.length; i++) {
                                    if (cardpileNodes[i].type == 'defaultcards' && !cardpileNodes[i].classList.contains('on')) {
                                        clickToggle.call(cardpileNodes[i]);
                                    }
                                }
                            });
                            cfgbancard.style.marginLeft = '5px';
                            cfgenablecard.style.marginLeft = '5px';
                            cardpileNodes.push(cfgnode);
                            cfgnode.style.display = 'none';
                            cfgnode.classList.add('cardpilecfg');
                            cfgnode.classList.add('toggle');
                            cfgnode.style.marginTop = '5px';
                            page.appendChild(cfgnode);

                            var cardpileadd = ui.create.div('.config.toggle.hidden.cardpilecfg.cardpilecfgadd', page);
                            var pileaddlist = [];
                            for (var i = 0; i < lib.config.cards.length; i++) {
                                if (!lib.cardPack[lib.config.cards[i]]) continue;
                                for (var j = 0; j < lib.cardPack[lib.config.cards[i]].length; j++) {
                                    var cname = lib.cardPack[lib.config.cards[i]][j];
                                    pileaddlist.push([cname, get.translation(cname)]);
                                    if (cname == 'sha') {
                                        pileaddlist.push(['huosha', '火杀']);
                                        pileaddlist.push(['leisha', '雷杀']);
                                        pileaddlist.push(['haisha', '海杀']);
                                    }
                                    if (cname == 'tao') {
                                        pileaddlist.push(['haitao', '海桃']);
                                    }
                                }
                            }
                            var cardpileaddname = ui.create.selectlist(pileaddlist, null, cardpileadd);
                            cardpileaddname.style.width = '75px';
                            cardpileaddname.style.marginRight = '2px';
                            cardpileaddname.style.marginLeft = '-1px';
                            var cardpileaddsuit = ui.create.selectlist([
                                ['heart', '红桃'],
                                ['diamond', '方片'],
                                ['club', '梅花'],
                                ['spade', '黑桃'],
                            ], null, cardpileadd);
                            cardpileaddsuit.style.width = '53px';
                            cardpileaddsuit.style.marginRight = '2px';
                            var cardpileaddnumber = ui.create.selectlist([
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
                            ], null, cardpileadd);
                            cardpileaddnumber.style.width = '43px';
                            cardpileaddnumber.style.marginRight = '2px';
                            var button = document.createElement('button');
                            button.innerHTML = '确定';
                            button.style.width = '40px';
                            var deletecard = function () {
                                this.parentNode.remove();
                                var info = this.parentNode._info;
                                var list = lib.config.addedpile[mode];
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i][0] == info[0] && list[i][1] == info[1] && list[i][2] == info[2]) {
                                        list.splice(i, 1); break;
                                    }
                                }
                                recreatePile();
                            };
                            button.onclick = function () {
                                var card = [
                                    cardpileaddsuit.value,
                                    cardpileaddnumber.value,
                                    cardpileaddname.value,
                                ];
                                lib.config.addedpile[mode].push(card);
                                recreatePile();
                                var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
                                cfgnode._info = card;
                                cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + card[1];
                                var cfgnodedelete = document.createElement('span');
                                cfgnodedelete.classList.add('cardpiledelete');
                                cfgnodedelete.innerHTML = '删除';
                                cfgnodedelete.onclick = deletecard;
                                cfgnode.appendChild(cfgnodedelete);
                                page.insertBefore(cfgnode, cardpileadd.nextSibling);
                            };
                            cardpileadd.appendChild(button);
                            cardpileadd.style.whiteSpace = 'nowrap';
                            cardpileNodes.push(cardpileadd);

                            for (var i = 0; i < lib.config.addedpile[mode].length; i++) {
                                var card = lib.config.addedpile[mode][i];
                                var cfgnode = ui.create.div('.config.toggle.cardpilecfg');
                                cfgnode._info = card;
                                cfgnode.innerHTML = get.translation(card[2]) + ' ' + get.translation(card[0]) + card[1];
                                var cfgnodedelete = document.createElement('span');
                                cfgnodedelete.classList.add('cardpiledelete');
                                cfgnodedelete.innerHTML = '删除';
                                cfgnodedelete.onclick = deletecard;
                                cfgnode.appendChild(cfgnodedelete);
                                cfgnode.style.display = 'none';
                                cardpileNodes.push(cfgnode);
                                page.appendChild(cfgnode);
                            }

                            for (var i = 0; i < lib.cardPile[mode].length; i++) {
                                var card = lib.cardPile[mode][i];
                                var cfgnode = createConfig({
                                    name: get.translation(card[2]) + ' ' + get.translation(card[0]) + card[1],
                                    _number: i,
                                    _name: mode,
                                    init: !lib.config.bannedpile[mode].contains(i),
                                    onclick: toggleCardPile
                                });
                                cfgnode.type = 'defaultcards';
                                cardpileNodes.push(cfgnode);
                                cfgnode.style.display = 'none';
                                cfgnode.classList.add('cardpilecfg');
                                page.appendChild(cfgnode);
                            }
                            ui.create.div('.menuplaceholder', page);
                        }
                        return node;
                    };
                    if (!connectMenu && lib.config.show_ban_menu) {
                        lib.cardPack.mode_banned = [];
                        for (var i = 0; i < lib.config.all.mode.length; i++) {
                            var banned = lib.config[lib.config.all.mode[i] + '_bannedcards'];
                            if (banned) {
                                for (var j = 0; j < banned.length; j++) {
                                    lib.cardPack.mode_banned.add(banned[j]);
                                }
                            }
                        }
                        var bannednode = createModeConfig('mode_banned', start.firstChild);
                        if (lib.cardPack.mode_banned.length == 0) {
                            bannednode.style.display = 'none';
                        }
                        delete lib.cardPack.mode_banned;
                    }
                    for (var i = 0; i < lib.config.all.cards.length; i++) {
                        if (connectMenu && !lib.connectCardPack.contains(lib.config.all.cards[i])) continue;
                        createModeConfig(lib.config.all.cards[i], start.firstChild);
                    }
                    if (!connectMenu) {
                        for (var i in lib.cardPack) {
                            if (i.indexOf('mode_') == 0) {
                                createModeConfig(i, start.firstChild);
                            }
                        }
                    }
                    var active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        if (active.style.display == 'none') {
                            active = active.nextSibling;
                        }
                        active.classList.add('active');
                        updateActiveCard(active);
                    }
                    rightPane.appendChild(active.link);

                    (function () {
                        if (connectMenu) return;
                        var page = ui.create.div('.menu-buttons');
                        var node = ui.create.div('.menubutton.large', '牌堆', clickMode);
                        start.firstChild.insertBefore(node, start.firstChild.querySelector('.lefttext'));
                        node.link = page;
                        node.mode = 'cardpile';
                        node.create = function () {
                            if (pileCreated) return;
                            pileCreated = true;
                            page.innerHTML = '';

                            var pileList = null;
                            var createList = function () {
                                if (pileList) {
                                    pileList.remove();
                                }
                                var list = ['默认牌堆'];
                                if (lib.config.customcardpile['当前牌堆']) {
                                    list.push('当前牌堆');
                                }
                                for (var i in lib.config.customcardpile) {
                                    list.add(i);
                                }
                                var currentpile = get.config('cardpilename');
                                if (!currentpile) {
                                    if (list.contains('当前牌堆')) {
                                        currentpile = '当前牌堆';
                                    }
                                    else {
                                        currentpile = '默认牌堆';
                                    }
                                }
                                pileList = ui.create.selectlist(list, currentpile, pileChoose, function (e) {
                                    game.saveConfig('cardpilename', this.value, true);
                                    restart.style.display = '';
                                });
                                pileList.style.float = 'right';
                            }
                            var pileChoose = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', '选择牌堆', page);
                            createList();

                            var pileDel = function () {
                                delete lib.config.customcardpile[this.parentNode.link];
                                this.parentNode.remove();
                                game.saveConfig('customcardpile', lib.config.customcardpile);
                                for (var i in lib.config.mode_config) {
                                    if (i == 'global') continue;
                                    if (lib.config.mode_config[i].cardpilename == this.parentNode.link) {
                                        game.saveConfig('cardpilename', null, i);
                                    }
                                }
                                createList();
                            };

                            var restart = ui.create.div('.config.more', '重新启动', game.reload, page);
                            restart.style.display = 'none';
                            var createPileNode = function (name) {
                                var node = ui.create.div('.config.toggle.cardpilecfg.nomarginleft', name);
                                node.link = name;
                                var del = document.createElement('span');
                                del.innerHTML = '删除';
                                del.classList.add('cardpiledelete');
                                del.onclick = pileDel;
                                node.appendChild(del);
                                if (name == '当前牌堆') {
                                    page.insertBefore(node, pileChoose.nextSibling);
                                }
                                else {
                                    page.insertBefore(node, restart);
                                }
                            };
                            for (var i in lib.config.customcardpile) {
                                createPileNode(i);
                            }
                            var exportCardPile;
                            ui.create.div('.config.more', '保存当前牌堆 <div>&gt;</div>', page, function () {
                                this.classList.toggle('on');
                                if (this.classList.contains('on')) {
                                    exportCardPile.classList.remove('hidden');
                                }
                                else {
                                    exportCardPile.classList.add('hidden');
                                }
                            });
                            exportCardPile = ui.create.div('.config.cardpileadd.indent', page);
                            exportCardPile.classList.add('hidden');
                            ui.create.div('', '名称：<input type="text"><button>确定</button>', exportCardPile);
                            var input = exportCardPile.firstChild.lastChild.previousSibling;
                            input.value = '自定义牌堆';
                            input.style.marginRight = '3px';
                            input.style.width = '120px';
                            exportCardPile.firstChild.lastChild.onclick = function () {
                                var name = input.value;
                                var ok = true;
                                if (lib.config.customcardpile[name] || name == '默认牌堆' || name == '当前牌堆') {
                                    for (var i = 1; i <= 1000; i++) {
                                        if (!lib.config.customcardpile[name + '(' + i + ')']) {
                                            name = name + '(' + i + ')';
                                            break;
                                        }
                                    }
                                }
                                lib.config.customcardpile[name] = [lib.config.bannedpile, lib.config.addedpile];
                                delete lib.config.customcardpile['当前牌堆'];
                                for (var i in lib.mode) {
                                    if (lib.config.mode_config[i] &&
                                        (lib.config.mode_config[i].cardpilename == '当前牌堆' || !lib.config.mode_config[i].cardpilename)) {
                                        game.saveConfig('cardpilename', name, i);
                                    }
                                }
                                for (var i = 0; i < page.childElementCount; i++) {
                                    if (page.childNodes[i].link == '当前牌堆') {
                                        page.childNodes[i].remove();
                                        break;
                                    }
                                }
                                game.saveConfig('customcardpile', lib.config.customcardpile);
                                createPileNode(name);
                                createList();
                            };
                        }
                    }());

                    if (!connectMenu) {
                        var node1 = ui.create.div('.lefttext', '全部开启', start.firstChild, function () {
                            game.saveConfig('cards', lib.config.all.cards);
                            updateNodes();
                        });
                        var node2 = ui.create.div('.lefttext', '恢复默认', start.firstChild, function () {
                            game.saveConfig('cards', lib.config.defaultcards);
                            updateNodes();
                        });
                        node1.style.marginTop = '12px';
                        node2.style.marginTop = '7px';
                    }

                    updateNodes();
                }());

            if (menuList.includes('扩展'))
                (function () {
                    if (connectMenu) return;
                    var start = menuxpages.shift();
                    var rightPane = start.lastChild;

                    var clickMode = function () {
                        if (this.mode == 'get') {
                            this.update();
                        }
                        var active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        active.classList.remove('active');
                        active.link.remove();
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                    };
                    ui.click.extensionTab = function (name) {
                        ui.click.menuTab('扩展');
                        for (var i = 0; i < start.firstChild.childElementCount; i++) {
                            if (start.firstChild.childNodes[i].innerHTML == name) {
                                clickMode.call(start.firstChild.childNodes[i]);
                                break;
                            }
                        }
                    }
                    var updateNodes = function () {
                        for (var i = 0; i < start.firstChild.childNodes.length; i++) {
                            var node = start.firstChild.childNodes[i];
                            if (node.link) {
                                if (node.mode == 'get') continue;
                                if (node.mode == 'create') continue;
                                if (node.mode.indexOf('extension_') == 0) {
                                    if (lib.config[node.mode + '_enable']) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                                else {
                                    if (lib.config.plays.contains(node.mode)) {
                                        node.classList.remove('off');
                                        node.link.firstChild.classList.add('on');
                                    }
                                    else {
                                        node.classList.add('off');
                                        node.link.firstChild.classList.remove('on');
                                    }
                                }
                            }
                        }
                    }
                    var togglePack = function (bool) {
                        var name = this._link.config._name;
                        if (name.indexOf('extension_') == 0) {
                            if (bool) {
                                game.saveConfig(name, true);
                            }
                            else {
                                game.saveConfig(name, false);
                            }
                        }
                        else {
                            name = name.slice(0, name.indexOf('_enable_playpackconfig'));
                            if (bool) {
                                lib.config.plays.add(name);
                            }
                            else {
                                lib.config.plays.remove(name);
                            }
                            game.saveConfig('plays', lib.config.plays);
                        }
                        if (this.onswitch) {
                            this.onswitch(bool);
                        }
                        updateNodes();
                    };

                    var createModeConfig = function (mode, position) {
                        var page = ui.create.div('');
                        page.style.paddingBottom = '10px';
                        var node;
                        if (mode.indexOf('extension_') == 0) {
                            node = ui.create.div('.menubutton.large', mode.slice(10), position, clickMode);
                        }
                        else {
                            node = ui.create.div('.menubutton.large', lib.translate[mode + '_play_config'], position, clickMode);
                        }
                        if (node.innerHTML.length >= 5) {
                            node.classList.add('smallfont');
                        }
                        node.link = page;
                        node.mode = mode;
                        for (var i in lib.extensionMenu[mode]) {
                            if (i == 'game') continue;
                            var cfg = copyObj(lib.extensionMenu[mode][i]);
                            var j;
                            if (mode.indexOf('extension_') == 0) {
                                j = mode + '_' + i;
                            }
                            else {
                                j = mode + '_' + i + '_playpackconfig';
                            }
                            cfg._name = j;
                            if (!lib.config.hasOwnProperty(j)) {
                                game.saveConfig(j, cfg.init);
                            }
                            else {
                                cfg.init = lib.config[j];
                            }

                            if (i == 'enable') {
                                cfg.onclick = togglePack;
                            }
                            else if (!lib.extensionMenu[mode][i].onclick) {
                                cfg.onclick = function (result) {
                                    var cfg = this._link.config;
                                    game.saveConfig(cfg._name, result);
                                };
                            }
                            var cfgnode = createConfig(cfg);
                            if (cfg.onswitch) {
                                cfgnode.onswitch = cfg.onswitch;
                            }
                            page.appendChild(cfgnode);
                        }
                        return node;
                    };
                    for (var i in lib.extensionMenu) {
                        if (lib.config.all.stockextension.contains(i) && !lib.config.all.plays.contains(i)) continue;
                        if (lib.config.hiddenPlayPack.contains(i)) continue;
                        createModeConfig(i, start.firstChild);
                    }
                    (function () {
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', '获取扩展', start.firstChild, clickMode);
                        node.link = page;
                        node.mode = 'get';
                        page.listen(function () {
                            if (!page.currenttimeout) {
                                var active = page.querySelector('.videonode.current');
                                if (active) {
                                    active.classList.remove('current');
                                }
                            }
                        });
                        var importextensionexpanded = false;
                        page.style.paddingBottom = '10px';
                        var importExtension;
                        var extensionnode = ui.create.div('.config.more', '导入扩展 <div>&gt;</div>', page, function () {
                            if (importextensionexpanded) {
                                this.classList.remove('on');
                                importExtension.style.display = 'none';
                            }
                            else {
                                this.classList.add('on');
                                importExtension.style.display = '';
                            }
                            importextensionexpanded = !importextensionexpanded;
                        });
                        importExtension = ui.create.div('.new_character.export.import', page);
                        importExtension.style.marginLeft = '5px';
                        importExtension.style.marginTop = '5px';
                        importExtension.style.marginBottom = '5px';
                        importExtension.style.display = 'none';
                        importExtension.style.width = '100%';
                        importExtension.style.textAlign = 'left';
                        ui.create.div('', '<input type="file" accept="application/zip" style="width:153px"><button>确定</button>', importExtension);

                        var reloadnode = ui.create.div('.config.toggle.pointerdiv', '重新启动', page, game.reload);
                        reloadnode.style.display = 'none';
                        var placeholder = ui.create.div('.config.toggle', page);
                        placeholder.style.height = 0;
                        placeholder.style.marginTop = '5px';

                        importExtension.firstChild.lastChild.onclick = function () {
                            var fileToLoad = this.previousSibling.files[0];
                            if (fileToLoad) {
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var finishLoad = function () {
                                        extensionnode.innerHTML = '导入成功，3秒后将重启';
                                        setTimeout(function () {
                                            extensionnode.innerHTML = '导入成功，2秒后将重启';
                                            setTimeout(function () {
                                                extensionnode.innerHTML = '导入成功，1秒后将重启';
                                                setTimeout(game.reload, 1000);
                                            }, 1000);
                                        }, 1000);
                                    };
                                    var data = fileLoadedEvent.target.result;
                                    if (game.importExtension(data, finishLoad) !== false) {
                                        importExtension.style.display = 'none';
                                    }
                                };
                                fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
                            }
                        }

                        node.update = function () { };
                    }());
                    var active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                    updateNodes();
                }());

            if (menuList.includes('其它'))
                (function () {
                    if (connectMenu) return;
                    var start = menuxpages.shift();
                    var rightPane = start.lastChild;
                    var cheatButton = ui.create.div('.menubutton.round.highlight', '作', start);
                    cheatButton.style.display = 'none';
                    var runButton = ui.create.div('.menubutton.round.highlight', '执', start);
                    runButton.style.display = 'none';
                    var clearButton = ui.create.div('.menubutton.round.highlight', '清', start);
                    clearButton.style.display = 'none';
                    clearButton.style.left = '275px';
                    var playButton = ui.create.div('.menubutton.round.highlight.hidden', '播', start);
                    playButton.style.display = 'none';
                    playButton.style.left = '215px';
                    playButton.style.transition = 'opacity 0.3s';
                    var deleteButton = ui.create.div('.menubutton.round.highlight.hidden', '删', start);
                    deleteButton.style.display = 'none';
                    deleteButton.style.left = '275px';
                    deleteButton.style.transition = 'opacity 0.3s';
                    var saveButton = ui.create.div('.menubutton.round.highlight.hidden', '存', start);
                    saveButton.style.display = 'none';
                    saveButton.style.transition = 'opacity 0.3s';


                    var clickMode = function () {
                        if (this.classList.contains('off')) return;
                        var active = this.parentNode.querySelector('.active');
                        if (active === this) {
                            return;
                        }
                        if (active) {
                            active.classList.remove('active');
                            active.link.remove();
                        }
                        active = this;
                        this.classList.add('active');
                        rightPane.appendChild(this.link);
                        if (this.type == 'cheat') {
                            cheatButton.style.display = '';
                        }
                        else {
                            cheatButton.style.display = 'none';
                        }
                        if (this.type == 'cmd') {
                            runButton.style.display = '';
                            clearButton.style.display = '';
                        }
                        else {
                            runButton.style.display = 'none';
                            clearButton.style.display = 'none';
                        }
                        if (this.type == 'video') {
                            playButton.style.display = '';
                            saveButton.style.display = '';
                            deleteButton.style.display = '';
                        }
                        else {
                            playButton.style.display = 'none';
                            saveButton.style.display = 'none';
                            deleteButton.style.display = 'none';
                        }
                    };

                    ui.click.consoleMenu = function () {
                        ui.click.menuTab('其它');
                        clickMode.call(ui.commandnode);
                    };
                    (function () {
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', '更新', start.firstChild, clickMode);
                        node.link = page;
                        page.classList.add('menu-help');
                        var ul = document.createElement('ul');
                        var li1 = document.createElement('li');
                        var li2 = document.createElement('li');
                        var li3 = document.createElement('li');
                        var trimurl = function (str) {
                            if (str == lib.updateURLS.github) {
                                return 'GitHub';
                            }
                            if (str == lib.updateURLS.coding) {
                                return 'Coding';
                            }
                            var index;
                            index = str.indexOf('://');
                            if (index != -1) {
                                str = str.slice(index + 3);
                            }
                            index = str.indexOf('/');
                            if (index != -1) {
                                str = str.slice(0, index);
                            }
                            if (str.length > 15) {
                                var list = str.split('.');
                                if (list.length > 1) {
                                    list.shift();
                                }
                                str = list[0];
                                for (var i = 1; i < list.length; i++) {
                                    str += '.' + list[i];
                                }
                            }
                            if (str.length > 15) {
                                var list = str.split('.');
                                if (list.length > 1) {
                                    list.pop();
                                }
                                str = list[0];
                                for (var i = 1; i < list.length; i++) {
                                    str += '.' + list[i];
                                }
                            }
                            return str;
                        }
                        li1.innerHTML = '游戏版本：' + lib.version + '<p style="margin-top:8px;white-space:nowrap"></p>';
                        li2.innerHTML = '素材版本：' + (lib.config.asset_version || '无') + '<p style="margin-top:8px"></p>';
                        li3.innerHTML = '更新地址：<span>' + trimurl(lib.config.updateURL || lib.updateURL) + '</span><p style="margin-top:8px"></p>';
                        li3.style.whiteSpace = 'nowrap';
                        li3.style.display = 'none';// coding

                        var button1, button2, button3, button4, button5;

                        game.checkForUpdate = function (forcecheck, dev) {
                            if (!dev && button1.disabled) {
                                return;
                            }
                            else if (dev && button3.disabled) {
                                return;
                            }
                            else if (!game.download) {
                                // alert('此版本不支持游戏内更新，请手动更新');
                                return;
                            }
                            else {
                                if (dev) {
                                    button3.innerHTML = '正在检查更新';
                                }
                                else {
                                    button1.innerHTML = '正在检查更新';
                                }
                                button3.disabled = true;
                                button1.disabled = true;

                                var goupdate = function (files, update) {
                                    lib.version = update.version;
                                    if (update.dev && !lib.config.debug) {
                                        dev = 'nodev';
                                    }
                                    lib.init.req('game/source.js', function () {
                                        try {
                                            eval(this.responseText);
                                            if (!window.noname_source_list) {
                                                throw ('err');
                                            }
                                        }
                                        catch (e) {
                                            alert('更新地址有误');
                                            console.log(e);
                                            return;
                                        }

                                        var updates = window.noname_source_list;
                                        delete window.noname_source_list;
                                        if (Array.isArray(files)) {
                                            files.add('game/update.js');
                                            var files2 = [];
                                            for (var i = 0; i < files.length; i++) {
                                                var str = files[i].indexOf('*');
                                                if (str != -1) {
                                                    str = files[i].slice(0, str);
                                                    files.splice(i--, 1);
                                                    for (var j = 0; j < updates.length; j++) {
                                                        if (updates[j].indexOf(str) == 0) {
                                                            files2.push(updates[j]);
                                                        }
                                                    }
                                                }
                                            }
                                            updates = files.concat(files2);
                                        }
                                        for (var i = 0; i < updates.length; i++) {
                                            if (updates[i].indexOf('theme/') == 0 && updates[i].indexOf('.css') == -1) {
                                                updates.splice(i--, 1);
                                            }
                                            else if (updates[i].indexOf('node_modules/') == 0 && !update.node) {
                                                updates.splice(i--, 1);
                                            }
                                        }

                                        if (!ui.arena.classList.contains('menupaused')) {
                                            ui.click.configMenu();
                                            ui.click.menuTab('其它');
                                        }
                                        var p = button1.parentNode;
                                        button1.remove();
                                        button3.remove();
                                        var span = document.createElement('span');
                                        var n1 = 0;
                                        var n2 = updates.length;
                                        span.innerHTML = '正在下载文件（' + n1 + '/' + n2 + '）';
                                        p.appendChild(span);
                                        var finish = function () {
                                            span.innerHTML = '游戏更新完毕（' + n1 + '/' + n2 + '）';
                                            p.appendChild(document.createElement('br'));
                                            var button = document.createElement('button');
                                            button.innerHTML = '重新启动';
                                            button.onclick = game.reload;
                                            button.style.marginTop = '8px';
                                            p.appendChild(button);
                                        }
                                        game.multiDownload(updates, function () {
                                            n1++;
                                            span.innerHTML = '正在下载文件（' + n1 + '/' + n2 + '）';
                                        }, function (e) {
                                            game.print('下载失败：' + e.source);
                                        }, function () {
                                            setTimeout(finish, 500);
                                        }, null, dev);
                                    }, function () {
                                        alert('更新地址有误');
                                    }, true);
                                };

                                lib.init.req('game/update.js', function () {
                                    try {
                                        eval(this.responseText);
                                        if (!window.noname_update) {
                                            throw ('err');
                                        }
                                    }
                                    catch (e) {
                                        alert('更新地址有误');
                                        console.log(e);
                                        return;
                                    }

                                    var update = window.noname_update;
                                    delete window.noname_update;
                                    if (forcecheck === false) {
                                        if (update.version == lib.config.check_version) {
                                            return;
                                        }
                                    }
                                    game.saveConfig('check_version', update.version);
                                    var goon = true;
                                    if (!dev) {
                                        if (update.version.indexOf('beta') != -1 || update.version == lib.version) {
                                            goon = false;
                                        }
                                    }
                                    if (goon) {
                                        var files = null;
                                        var version = lib.version;
                                        if (Array.isArray(update.dev) && dev) {
                                            files = update.dev;
                                        }
                                        else if (Array.isArray(update.files) && update.update && !dev) {
                                            var version1 = version.split('.');
                                            var version2 = update.update.split('.');
                                            for (var i = 0; i < version1.length && i < version2.length; i++) {
                                                if (version2[i] > version1[i]) {
                                                    files = false; break;
                                                }
                                                else if (version1[i] > version2[i]) {
                                                    files = update.files.slice(0); break;
                                                }
                                            }
                                            if (files === null) {
                                                if (version1.length >= version2.length) {
                                                    files = update.files.slice(0);
                                                }
                                            }
                                        }
                                        var str;
                                        if (dev) {
                                            str = '开发版仅供测试使用，可能存在风险，是否确定更新？'
                                        }
                                        else {
                                            str = '有新版本' + update.version + '可用，是否下载？';
                                        }
                                        if (navigator.notification && navigator.notification.confirm) {
                                            var str2;
                                            if (dev) {
                                                str2 = str;
                                                str = '更新到开发版';
                                            }
                                            else {
                                                str2 = update.changeLog[0];
                                                for (var i = 1; i < update.changeLog.length; i++) {
                                                    if (update.changeLog[i].indexOf('://') == -1) {
                                                        str2 += '；' + update.changeLog[i];
                                                    }
                                                }
                                            }
                                            navigator.notification.confirm(
                                                str2,
                                                function (index) {
                                                    if (index == 1) {
                                                        goupdate(files, update);
                                                    }
                                                    else {
                                                        button1.disabled = false;
                                                        button1.innerHTML = '检查游戏更新';
                                                        button3.disabled = false;
                                                        button3.innerHTML = '更新到开发版';
                                                    }
                                                },
                                                str,
                                                ['确定', '取消']
                                            );
                                        }
                                        else {
                                            if (confirm(str)) {
                                                goupdate(files, update);
                                            }
                                            else {
                                                button1.disabled = false;
                                                button1.innerHTML = '检查游戏更新';
                                                button3.disabled = false;
                                                button3.innerHTML = '更新到开发版';
                                            }
                                        }
                                    }
                                    else {
                                        alert('当前版本已是最新');
                                        button1.disabled = false;
                                        button1.innerHTML = '检查游戏更新';
                                        button3.disabled = false;
                                        button3.innerHTML = '更新到开发版';
                                    }
                                }, function () {
                                    if (forcecheck === false) {
                                        return;
                                    }
                                    alert('连接失败');
                                    button1.disabled = false;
                                    button1.innerHTML = '检查游戏更新';
                                    button3.disabled = false;
                                    button3.innerHTML = '更新到开发版';
                                }, true);
                            }
                        };
                        game.checkForAssetUpdate = function (type) {
                            if (button2.disabled) {
                                return;
                            }
                            else if (game.download) {
                                button2.innerHTML = '正在检查更新';
                                button2.disabled = true;
                                lib.init.req('game/asset.js', function () {
                                    try {
                                        eval(this.responseText);
                                        if (!window.vk_asset_list || !window.vk_skin_list) {
                                            throw ('err');
                                        }
                                    }
                                    catch (e) {
                                        alert('更新地址有误');
                                        console.log(e);
                                        return;
                                    }

                                    var updates = window.vk_asset_list;
                                    delete window.vk_asset_list;
                                    var skins = window.vk_skin_list;
                                    delete window.vk_skin_list;
                                    var asset_version = updates.shift();

                                    var skipcharacter = [], skipcard = ['tiesuo_mark'];
                                    if (!lib.config.asset_full) {
                                        for (var i = 0; i < lib.config.all.sgscharacters.length; i++) {
                                            var pack = lib.characterPack[lib.config.all.sgscharacters[i]];
                                            for (var j in pack) {
                                                skipcharacter.add(j);
                                            }
                                        }
                                        for (var i = 0; i < lib.config.all.sgscards.length; i++) {
                                            var pack = lib.cardPack[lib.config.all.sgscards[i]];
                                            if (pack) {
                                                skipcard = skipcard.concat(pack);
                                            }
                                        }
                                    }
                                    for (var i = 0; i < updates.length; i++) {
                                        switch (updates[i].slice(0, 5)) {
                                            case 'image': {
                                                if (!lib.config.asset_full) {
                                                    if (!lib.config.asset_image) {
                                                        updates.splice(i--, 1);
                                                    }
                                                    else {
                                                        if (updates[i].indexOf('image/character') == 0) {
                                                            if (updates[i].indexOf('jun_') != 16 && updates[i].indexOf('gz_') != 16 && !skipcharacter.contains(updates[i].slice(16, updates[i].lastIndexOf('.')))) {
                                                                updates.splice(i--, 1);
                                                            }
                                                        }
                                                        else if (updates[i].indexOf('image/card') == 0) {
                                                            if (!skipcard.contains(updates[i].slice(11, updates[i].lastIndexOf('.')))) {
                                                                updates.splice(i--, 1);
                                                            }
                                                        }
                                                        // else if (updates[i].indexOf('image/mode/stone') == 0) {
                                                        //    updates.splice(i--, 1);
                                                        // }
                                                    }
                                                }
                                                break;
                                            }
                                            case 'audio': {
                                                if (!lib.config.asset_audio) {
                                                    updates.splice(i--, 1);
                                                }
                                                break;
                                            }
                                            case 'font/': {
                                                if (!lib.config.asset_font) {
                                                    updates.splice(i--, 1);
                                                }
                                            }
                                        }
                                    }
                                    if (lib.config.asset_skin) {
                                        for (var i in skins) {
                                            for (var j = 1; j <= skins[i]; j++) {
                                                updates.push('image/skin/' + i + '/' + j + '.jpg');
                                            }
                                        }
                                    }
                                    if (!ui.arena.classList.contains('menupaused')) {
                                        ui.click.configMenu();
                                        ui.click.menuTab('其它');
                                    }

                                    var proceed = function () {
                                        if (updates.length == 0) {
                                            game.print(updates);
                                            game.saveConfig('asset_version', asset_version);
                                            alert('素材已是最新');
                                            button2.disabled = false;
                                            button2.innerHTML = '检查素材更新';
                                            return;
                                        }
                                        var p = button2.parentNode;
                                        button2.remove();
                                        var span = document.createElement('span');
                                        span.style.whiteSpace = 'nowrap';
                                        var n1 = 0;
                                        var n2 = updates.length;
                                        span.innerHTML = '正在下载素材（' + n1 + '/' + n2 + '）';
                                        span1.remove();
                                        span2.remove();
                                        span2_check.remove();
                                        span3.remove();
                                        span3_check.remove();
                                        span4.remove();
                                        span4_check.remove();
                                        span5.remove();
                                        span5_check.remove();
                                        span6.remove();
                                        span6_check.remove();
                                        span2_br.remove();
                                        span3_br.remove();
                                        span4_br.remove();
                                        span5_br.remove();
                                        span6_br.remove();
                                        p.appendChild(span);

                                        var br6 = ui.create.node('br');
                                        var span7 = ui.create.div('.hrefnode', '详细信息');
                                        span7.style.marginTop = '6px';
                                        span7.listen(ui.click.consoleMenu);
                                        p.appendChild(br6);
                                        p.appendChild(span7);

                                        var finish = function () {
                                            if (n1 == n2) {
                                                game.saveConfig('asset_version', asset_version);
                                            }
                                            span.innerHTML = '素材更新完毕（' + n1 + '/' + n2 + '）';
                                            p.appendChild(document.createElement('br'));
                                            var button = document.createElement('button');
                                            button.innerHTML = '重新启动';
                                            button.onclick = game.reload;
                                            button.style.marginTop = '8px';
                                            p.appendChild(button);
                                        }
                                        game.multiDownload(updates, function () {
                                            n1++;
                                            span.innerHTML = '正在下载素材（' + n1 + '/' + n2 + '）';
                                        }, function (e) {
                                            game.print('下载失败：' + e.source);
                                        }, function () {
                                            setTimeout(finish, 500);
                                        });
                                    };
                                    game.checkFileList(updates, proceed);
                                }, function () {
                                    alert('连接失败');
                                    button2.disabled = false;
                                    button2.innerHTML = '检查素材更新';
                                }, true);
                            }
                            else {
                                alert('此版本不支持游戏内更新素材，请手动更新');
                            }
                        };

                        button1 = document.createElement('button');
                        button1.innerHTML = '检查游戏更新';
                        button1.onclick = game.checkForUpdate;
                        li1.lastChild.appendChild(button1);

                        button3 = document.createElement('button');
                        button3.innerHTML = '更新到开发版';
                        button3.style.marginLeft = '5px';
                        button3.onclick = function () {
                            game.checkForUpdate(null, true);
                        };
                        // if(lib.config.dev){
                        //     li1.lastChild.appendChild(button3);
                        // }

                        (function () {
                            var updatep1 = li1.querySelector('p');
                            var updatep2 = li2;
                            var updatep3 = li3;
                            var updatep4 = node;
                            var updatepx = ui.create.node('p');
                            li1.appendChild(updatepx);
                            updatepx.style.display = 'none';
                            updatepx.style.whiteSpace = 'nowrap';
                            updatepx.style.marginTop = '8px';
                            var buttonx = ui.create.node('button', '访问项目主页', function () {
                                window.open('https://github.com/libccy/noname');
                            });
                            updatepx.appendChild(buttonx);
                            ui.updateUpdate = function () {
                                if (!game.download) {
                                    updatep1.style.display = 'none';
                                    updatep2.style.display = 'none';
                                    updatep3.style.display = 'none';
                                    updatepx.style.display = '';
                                    updatep4.innerHTML = '关于';
                                }
                                else {
                                    updatep1.style.display = '';
                                    updatep2.style.display = '';
                                    updatep3.style.display = 'none'; // coding
                                    updatepx.style.display = 'none';
                                    updatep4.innerHTML = '更新';
                                }
                            }
                            ui.updateUpdate();
                        }());

                        button4 = document.createElement('button');
                        button4.innerHTML = '设置更新地址';
                        button4.onclick = function () {
                            game.prompt('设置更新地址', function (str) {
                                if (str) {
                                    game.saveConfig('updateURL', str);
                                    li3.querySelector('span').innerHTML = trimurl(str);
                                    button5.style.display = '';
                                    button6.style.display = 'none';
                                }
                            });
                        };
                        // li3.lastChild.appendChild(button4);

                        var button6 = document.createElement('button');
                        button6.innerHTML = '设为备用镜像';
                        button6.style.display = 'none';// coding
                        // button6.style.marginLeft='5px';
                        button6.onclick = function () {
                            game.saveConfig('updateURL', lib.mirrorURL);
                            button5.style.display = '';
                            button6.style.display = 'none';
                            li3.querySelector('span').innerHTML = trimurl(lib.mirrorURL);
                        };
                        li3.lastChild.appendChild(button6);

                        button5 = document.createElement('button');
                        button5.innerHTML = '设为默认镜像';
                        // button5.style.marginLeft='5px';
                        button5.onclick = function () {
                            game.saveConfig('updateURL');
                            button5.style.display = 'none';
                            button6.style.display = '';
                            li3.querySelector('span').innerHTML = trimurl(lib.updateURL);
                        };
                        li3.lastChild.appendChild(button5);
                        if (!lib.config.updateURL) {
                            button5.style.display = 'none';
                        }
                        else {
                            button6.style.display = 'none';
                        }

                        button2 = document.createElement('button');
                        button2.innerHTML = '检查素材更新';
                        button2.onclick = game.checkForAssetUpdate;
                        li2.lastChild.appendChild(button2);

                        var span1 = ui.create.div('.config.more', '选项 <div>&gt;</div>');
                        span1.style.fontSize = 'small';
                        span1.style.display = 'inline';
                        span1.toggle = function () {
                            if (!this.classList.toggle('on')) {
                                game.saveConfig('asset_toggle_off', true);
                                span2.style.display = 'none';
                                span2_br.style.display = 'none';
                                span2_check.style.display = 'none';
                                span3.style.display = 'none';
                                span3_br.style.display = 'none';
                                span3_check.style.display = 'none';
                                span4.style.display = 'none';
                                span4_br.style.display = 'none';
                                span4_check.style.display = 'none';
                                span5.style.display = 'none';
                                span5_br.style.display = 'none';
                                span5_check.style.display = 'none';
                                span6.style.display = 'none';
                                span6_br.style.display = 'none';
                                span6_check.style.display = 'none';
                            }
                            else {
                                game.saveConfig('asset_toggle_off');
                                span2.style.display = '';
                                span2_br.style.display = '';
                                span2_check.style.display = '';
                                span3.style.display = '';
                                span3_br.style.display = '';
                                span3_check.style.display = '';
                                span4.style.display = '';
                                span4_br.style.display = '';
                                span4_check.style.display = '';
                                span5.style.display = '';
                                span5_br.style.display = '';
                                span5_check.style.display = '';
                                span6.style.display = '';
                                span6_br.style.display = '';
                                span6_check.style.display = '';
                            }
                        };
                        span1.listen(span1.toggle);
                        li2.lastChild.appendChild(span1);

                        var span6_br = ui.create.node('br');
                        li2.lastChild.appendChild(span6_br);

                        var span5 = ui.create.div('', '图片素材（精简，221MB）');
                        span5.style.fontSize = 'small';
                        span5.style.lineHeight = '16px';
                        var span5_check = document.createElement('input');
                        span5_check.type = 'checkbox';
                        span5_check.style.marginLeft = '5px';
                        if (lib.config.asset_image) {
                            span5_check.checked = true;
                        }
                        span5_check.onchange = function () {
                            game.saveConfig('asset_image', this.checked);
                        }
                        var span2_br = ui.create.node('br');

                        var span4 = ui.create.div('', '字体素材（56MB）');
                        span4.style.fontSize = 'small';
                        span4.style.lineHeight = '16px';
                        li2.lastChild.appendChild(span4);
                        var span4_check = document.createElement('input');
                        span4_check.type = 'checkbox';
                        span4_check.style.marginLeft = '5px';
                        if (lib.config.asset_font) {
                            span4_check.checked = true;
                        }
                        span4_check.onchange = function () {
                            game.saveConfig('asset_font', this.checked);
                        }
                        li2.lastChild.appendChild(span4_check);
                        var span3_br = ui.create.node('br');
                        li2.lastChild.appendChild(span3_br);

                        var span3 = ui.create.div('', '音效素材（172MB）');
                        span3.style.fontSize = 'small';
                        span3.style.lineHeight = '16px';
                        li2.lastChild.appendChild(span3);
                        var span3_check = document.createElement('input');
                        span3_check.type = 'checkbox';
                        span3_check.style.marginLeft = '5px';
                        if (lib.config.asset_audio) {
                            span3_check.checked = true;
                        }
                        span3_check.onchange = function () {
                            game.saveConfig('asset_audio', this.checked);
                        }
                        li2.lastChild.appendChild(span3_check);
                        var span4_br = ui.create.node('br');
                        li2.lastChild.appendChild(span4_br);

                        var span2 = ui.create.div('', '皮肤素材（261MB）');
                        span2.style.fontSize = 'small';
                        span2.style.lineHeight = '16px';
                        li2.lastChild.appendChild(span2);
                        var span2_check = document.createElement('input');
                        span2_check.type = 'checkbox';
                        span2_check.style.marginLeft = '5px';
                        if (lib.config.asset_skin) {
                            span2_check.checked = true;
                        }
                        span2_check.onchange = function () {
                            game.saveConfig('asset_skin', this.checked);
                        }
                        li2.lastChild.appendChild(span2_check);
                        var span5_br = ui.create.node('br');
                        li2.lastChild.appendChild(span5_br);


                        li2.lastChild.appendChild(span5);
                        li2.lastChild.appendChild(span5_check);
                        li2.lastChild.appendChild(span2_br);

                        var span6 = ui.create.div('', '图片素材（完整，569MB）');
                        span6.style.fontSize = 'small';
                        span6.style.lineHeight = '16px';
                        li2.lastChild.appendChild(span6);
                        var span6_check = document.createElement('input');
                        span6_check.type = 'checkbox';
                        span6_check.style.marginLeft = '5px';
                        if (lib.config.asset_full) {
                            span6_check.checked = true;
                        }
                        span6_check.onchange = function () {
                            game.saveConfig('asset_full', this.checked);
                        }
                        li2.lastChild.appendChild(span6_check);

                        span2.style.display = 'none';
                        span2_br.style.display = 'none';
                        span2_check.style.display = 'none';
                        span3.style.display = 'none';
                        span3_br.style.display = 'none';
                        span3_check.style.display = 'none';
                        span4.style.display = 'none';
                        span4_br.style.display = 'none';
                        span4_check.style.display = 'none';
                        span5.style.display = 'none';
                        span5_br.style.display = 'none';
                        span5_check.style.display = 'none';
                        span6.style.display = 'none';
                        span6_br.style.display = 'none';
                        span6_check.style.display = 'none';

                        ul.appendChild(li1);
                        ul.appendChild(li2);
                        ul.appendChild(li3);
                        page.appendChild(ul);


                        if (!lib.config.asset_toggle_off) {
                            span1.toggle();
                        }
                    }());
                    if (!methods.noControl)
                        (function () {
                            var norow2 = function () {
                                var node = currentrow1;
                                if (!node) return false;
                                return node.innerHTML == '横置' || node.innerHTML == '翻面' || node.innerHTML == '换人' || node.innerHTML == '复活';
                            };
                            var checkCheat = function () {
                                if (norow2()) {
                                    for (var i = 0; i < row2.childElementCount; i++) {
                                        row2.childNodes[i].classList.remove('selectedx');
                                        row2.childNodes[i].classList.add('unselectable');
                                    }
                                }
                                else {
                                    for (var i = 0; i < row2.childElementCount; i++) {
                                        row2.childNodes[i].classList.remove('unselectable');
                                    }
                                }
                                if (currentrow1 && currentrow1.innerHTML == '复活') {
                                    for (var i = 0; i < row3.childNodes.length; i++) {
                                        if (row3.childNodes[i].dead) {
                                            row3.childNodes[i].style.display = '';
                                        }
                                        else {
                                            row3.childNodes[i].style.display = 'none';
                                            row3.childNodes[i].classList.remove('glow');
                                        }
                                        row3.childNodes[i].classList.remove('unselectable');
                                    }
                                }
                                else {
                                    for (var i = 0; i < row3.childElementCount; i++) {
                                        if (currentrow1 && currentrow1.innerHTML == '换人' && row3.childNodes[i].link == game.me) {
                                            row3.childNodes[i].classList.add('unselectable');
                                        }
                                        else {
                                            row3.childNodes[i].classList.remove('unselectable');
                                        }
                                        if (!row3.childNodes[i].dead) {
                                            row3.childNodes[i].style.display = '';
                                        }
                                        else {
                                            row3.childNodes[i].style.display = 'none';
                                            row3.childNodes[i].classList.remove('glow');
                                        }
                                    }
                                }
                                if (currentrow1 && (currentrow2 || norow2()) && row3.querySelector('.glow')) {
                                    cheatButton.classList.add('glowing');
                                    return true;
                                }
                                else {
                                    cheatButton.classList.remove('glowing');
                                    return false;
                                }
                            }
                            cheatButton.listen(function () {
                                if (checkCheat()) {
                                    var num;
                                    if (currentrow2) {
                                        switch (currentrow2.innerHTML) {
                                            case '一': num = 1; break;
                                            case '二': num = 2; break;
                                            case '三': num = 3; break;
                                            case '四': num = 4; break;
                                            case '五': num = 5; break;
                                        }
                                    }
                                    var targets = [];
                                    var buttons = row3.querySelectorAll('.glow');
                                    for (var i = 0; i < buttons.length; i++) {
                                        targets.push(buttons[i].link);
                                    }
                                    while (targets.length) {
                                        var target = targets.shift();
                                        switch (currentrow1.innerHTML) {
                                            case '伤害': target.damage(num, 'nosource'); break;
                                            case '回复': target.recover(num, 'nosource'); break;
                                            case '摸牌': target.draw(num); break;
                                            case '弃牌': target.discard(target.getCards('he').randomGets(num)); break;
                                            case '横置': target.link(); break;
                                            case '翻面': target.turnOver(); break;
                                            case '复活': target.revive(target.maxHp); break;
                                            case '换人': {
                                                if (_status.event.isMine()) {
                                                    if (!ui.auto.classList.contains('hidden')) {
                                                        setTimeout(function () {
                                                            ui.click.auto();
                                                            setTimeout(function () {
                                                                ui.click.auto();
                                                                game.swapPlayer(target);
                                                            }, 500);
                                                        });
                                                    }
                                                }
                                                else {
                                                    game.swapPlayer(target);
                                                }
                                                break;
                                            }
                                        }
                                    }
                                    if (ui.coin) {
                                        game.changeCoin(-20);
                                    }
                                    clickContainer.call(menuContainer);
                                }
                            });

                            var page = ui.create.div('');
                            var node = ui.create.div('.menubutton.large', '控制', start.firstChild, clickMode);
                            node.link = page;
                            node.type = 'cheat';
                            page.classList.add('menu-sym');

                            var currentrow1 = null;
                            var row1 = ui.create.div('.menu-cheat', page);
                            var clickrow1 = function () {
                                if (this.classList.contains('unselectable')) return;
                                if (currentrow1 == this) {
                                    this.classList.remove('selectedx');
                                    currentrow1 = null;
                                }
                                else {
                                    this.classList.add('selectedx');
                                    if (currentrow1) {
                                        currentrow1.classList.remove('selectedx');
                                    }
                                    currentrow1 = this;
                                    if (this.innerHTML == '换人') {
                                        for (var i = 0; i < row3.childNodes.length; i++) {
                                            row3.childNodes[i].classList.remove('glow');
                                        }
                                    }
                                }
                                checkCheat();
                            };
                            var nodedamage = ui.create.div('.menubutton', '伤害', row1, clickrow1);
                            var noderecover = ui.create.div('.menubutton', '回复', row1, clickrow1);
                            var nodedraw = ui.create.div('.menubutton', '摸牌', row1, clickrow1);
                            var nodediscard = ui.create.div('.menubutton', '弃牌', row1, clickrow1);
                            var nodelink = ui.create.div('.menubutton', '横置', row1, clickrow1);
                            var nodeturnover = ui.create.div('.menubutton', '翻面', row1, clickrow1);
                            var noderevive = ui.create.div('.menubutton', '复活', row1, clickrow1);
                            var nodereplace = ui.create.div('.menubutton', '换人', row1, clickrow1);
                            if (lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu') {
                                nodereplace.classList.add('unselectable');
                            }

                            var currentrow2 = null;
                            var row2 = ui.create.div('.menu-cheat', page);
                            var clickrow2 = function () {
                                if (this.classList.contains('unselectable')) return;
                                if (currentrow2 == this) {
                                    this.classList.remove('selectedx');
                                    currentrow2 = null;
                                }
                                else {
                                    this.classList.add('selectedx');
                                    if (currentrow2) {
                                        currentrow2.classList.remove('selectedx');
                                    }
                                    currentrow2 = this;
                                }
                                checkCheat();
                            };
                            var nodex1 = ui.create.div('.menubutton', '一', row2, clickrow2);
                            var nodex2 = ui.create.div('.menubutton', '二', row2, clickrow2);
                            var nodex3 = ui.create.div('.menubutton', '三', row2, clickrow2);
                            var nodex4 = ui.create.div('.menubutton', '四', row2, clickrow2);
                            var nodex5 = ui.create.div('.menubutton', '五', row2, clickrow2);

                            var row3 = ui.create.div('.menu-buttons.leftbutton.commandbutton', page);
                            row3.style.marginTop = '3px';
                            var clickrow3 = function () {
                                if (this.classList.contains('unselectable')) return;
                                this.classList.toggle('glow');
                                if (currentrow1 && currentrow1.innerHTML == '换人' && this.classList.contains('glow')) {
                                    if (this.link == game.me) {
                                        this.classList.remove('glow');
                                    }
                                    for (var i = 0; i < row3.childElementCount; i++) {
                                        if (row3.childNodes[i] != this) {
                                            row3.childNodes[i].classList.remove('glow');
                                        }
                                    }
                                }
                                checkCheat();
                            };
                            menuUpdates.push(function () {
                                if (_status.video || _status.connectMode || _status.yindao) {
                                    node.classList.add('off');
                                    if (node.classList.contains('active')) {
                                        node.classList.remove('active');
                                        node.link.remove();
                                        active = start.firstChild.firstChild;
                                        active.classList.add('active');
                                        rightPane.appendChild(active.link);
                                    }

                                    page.remove();
                                    cheatButton.remove();
                                    if (_status.video) node.remove();
                                    return;
                                }
                                var list = [];
                                for (var i = 0; i < game.players.length; i++) {
                                    if (lib.character[game.players[i].name] || game.players[i].name1) {
                                        list.push(game.players[i]);
                                    }
                                }
                                for (var i = 0; i < game.dead.length; i++) {
                                    if (lib.character[game.dead[i].name] || game.dead[i].name1) {
                                        list.push(game.dead[i]);
                                    }
                                }
                                if (list.length) {
                                    row1.show();
                                    row2.show();
                                    row3.innerHTML = '';
                                    var buttons = ui.create.buttons(list, 'player', row3, true);
                                    for (var i = 0; i < buttons.length; i++) {
                                        buttons[i].listen(clickrow3);
                                        if (game.dead.contains(buttons[i].link)) {
                                            buttons[i].dead = true;
                                        }
                                    }
                                    checkCheat();
                                }
                                else {
                                    row1.hide();
                                    row2.hide();
                                }
                                if (lib.config.mode == 'identity' || lib.config.mode == 'guozhan' || lib.config.mode == 'doudizhu') {
                                    if (game.notMe || (game.me && (game.me._trueMe || game.hasPlayer(function (current) {
                                        return current._trueMe == game.me;
                                    }))) || !game.phaseNumber || _status.qianlidanji) {
                                        nodereplace.classList.add('unselectable');
                                    }
                                    else if (_status.event.isMine() && ui.auto.classList.contains('hidden')) {
                                        nodereplace.classList.add('unselectable');
                                    }
                                    else {
                                        nodereplace.classList.remove('unselectable');
                                    }
                                }
                                if (game.dead.length == 0) {
                                    noderevive.classList.add('unselectable');
                                }
                                else {
                                    noderevive.classList.remove('unselectable');
                                }
                                checkCheat();
                            });
                        }());
                    (function () {
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', '命令', start.firstChild, clickMode);
                        ui.commandnode = node;
                        node.type = 'cmd';
                        node.link = page;
                        page.classList.add('menu-sym');
                        menuUpdates.push(function () {
                            if (_status.connectMode) {
                                node.classList.add('off');
                                if (node.classList.contains('active')) {
                                    node.classList.remove('active');
                                    node.link.remove();
                                    active = start.firstChild.firstChild;
                                    active.classList.add('active');
                                    rightPane.appendChild(active.link);
                                }
                            }
                        });
                        var text = document.createElement('div');
                        text.style.width = '194px';
                        text.style.height = '124px';
                        text.style.padding = '3px';
                        text.style.borderRadius = '2px';
                        text.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 0 0 1px';
                        text.style.textAlign = 'left';
                        text.style.webkitUserSelect = 'initial';
                        text.style.overflow = 'scroll';
                        text.style.position = 'absolute';
                        text.style.left = '30px';
                        text.style.top = '50px';
                        text.style.wordBreak = 'break-all';
                        var pre = ui.create.node('pre.fullsize', text);
                        pre.style.margin = 0;
                        pre.style.padding = 0;
                        pre.style.position = 'relative';
                        lib.setScroll(pre);
                        page.appendChild(text);

                        var text2 = document.createElement('input');
                        text2.style.width = '200px';
                        text2.style.height = '20px';
                        text2.style.padding = '0';
                        text2.style.position = 'absolute';
                        text2.style.top = '15px';
                        text2.style.left = '30px';
                        text2.style.resize = 'none';
                        text2.style.border = 'none';
                        text2.style.borderRadius = '2px';
                        text2.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 0 0 1px';
                        var g = {};
                        var logs = [];
                        var logindex = -1;
                        var cheat = lib.cheat;
                        var runCommand = function (e) {
                            if (text2.value && !['up', 'down'].contains(text2.value)) {
                                logindex = -1;
                                logs.unshift(text2.value);
                            }
                            if (text2.value == 'cls') {
                                pre.innerHTML = '';
                                text2.value = '';
                            }
                            else if (text2.value == 'up') {
                                if (logindex + 1 < logs.length) {
                                    text2.value = logs[++logindex];
                                }
                                else {
                                    text2.value = '';
                                }
                            }
                            else if (text2.value == 'down') {
                                if (logindex >= 0) {
                                    logindex--;
                                    if (logindex < 0) {
                                        text2.value = '';
                                    }
                                    else {
                                        text2.value = logs[logindex];
                                    }
                                }
                                else {
                                    text2.value = '';
                                }
                            }
                            else if (text2.value.indexOf('无天使') != -1 && (text2.value.indexOf('无神佛') != -1 || text2.value.indexOf('无神') != -1 && text2.value.indexOf('无佛') != -1)) {
                                game.print('密码正确！欢迎来到死后世界战线！');
                                _status.keyVerified = true;
                                text2.value = '';
                            }
                            else {
                                if (!game.observe && !game.online) {
                                    try {
                                        var result = eval(text2.value);
                                        game.print(result);
                                    }
                                    catch (e) {
                                        game.print(e);
                                    }
                                }
                                text2.value = '';
                            }
                        }
                        text2.addEventListener('keydown', function (e) {
                            if (e.keyCode == 13) {
                                runCommand();
                            }
                            else if (e.keyCode == 38) {
                                if (logindex + 1 < logs.length) {
                                    text2.value = logs[++logindex];
                                }
                            }
                            else if (e.keyCode == 40) {
                                if (logindex >= 0) {
                                    logindex--;
                                    if (logindex < 0) {
                                        text2.value = '';
                                    }
                                    else {
                                        text2.value = logs[logindex];
                                    }
                                }
                            }
                        });
                        page.appendChild(text2);
                        game.print = function () {
                            var textstr = '';
                            for (var i = 0; i < arguments.length; i++) {
                                if (get.is.object(arguments[i])) {
                                    var argi = get.stringify(arguments[i]);
                                    if (argi && argi.length < 5000) {
                                        textstr += argi;
                                    }
                                    else {
                                        textstr += arguments[i].toString();
                                    }
                                }
                                else {
                                    textstr += arguments[i];
                                }
                                if (i < arguments.length - 1) {
                                    textstr += ' ';
                                }
                            }
                            textstr += '<br>';
                            pre.innerHTML += textstr;
                            text.scrollTop = text.scrollHeight;
                        }
                        if (_status.toprint) {
                            for (var i = 0; i < _status.toprint.length; i++) {
                                game.print.apply(this, _status.toprint[i]);
                            }
                            delete _status.toprint;
                        }
                        runButton.listen(runCommand);
                        clearButton.listen(function () {
                            pre.innerHTML = '';
                        });
                    }());
                    if (lib.config.all.mode.length)
                        (function () {
                            var page = ui.create.div('');
                            var node = ui.create.div('.menubutton.large', '战绩', start.firstChild, clickMode);
                            node.type = 'rec';
                            node.link = page;
                            page.style.paddingBottom = '10px';
                            var reset = function () {
                                if (this.innerHTML == '重置') {
                                    this.innerHTML = '确定';
                                    setTimeout(() => {
                                        this.innerHTML = '重置';
                                    }, 1000);
                                }
                                else {
                                    this.parentNode.previousSibling.remove();
                                    this.parentNode.remove();
                                    lib.config.gameRecord[this.parentNode.link] = { data: {} };
                                    game.saveConfig('gameRecord', lib.config.gameRecord);
                                }
                            }
                            for (var i = 0; i < lib.config.all.mode.length; i++) {
                                if (!lib.config.gameRecord[lib.config.all.mode[i]]) continue;
                                if (lib.config.gameRecord[lib.config.all.mode[i]].str) {
                                    ui.create.div('.config.indent', lib.translate[lib.config.all.mode[i]], page).style.marginBottom = '-5px';
                                    var item = ui.create.div('.config.indent', lib.config.gameRecord[lib.config.all.mode[i]].str + '<span>重置</span>', page);
                                    item.style.height = 'auto';
                                    item.lastChild.addEventListener('click', reset);
                                    item.lastChild.classList.add('pointerdiv');
                                    item.link = lib.config.all.mode[i];
                                }
                            }
                        }());
                    (function () {
                        if (!window.indexedDB || window.nodb) return;
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', '录像', start.firstChild, clickMode);
                        node.type = 'video';
                        node.link = page;

                        var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                        lib.videos = [];
                        store.openCursor().onsuccess = function (e) {
                            var cursor = e.target.result;
                            if (cursor) {
                                lib.videos.push(cursor.value);
                                cursor.continue();
                            }
                            else {
                                lib.videos.sort(function (a, b) {
                                    return parseInt(b.time) - parseInt(a.time);
                                });
                                var clickcapt = function () {
                                    var current = this.parentNode.querySelector('.videonode.active');
                                    if (current && current != this) {
                                        current.classList.remove('active');
                                    }
                                    if (this.classList.toggle('active')) {
                                        playButton.show();
                                        deleteButton.show();
                                        saveButton.show();
                                    }
                                    else {
                                        playButton.hide();
                                        deleteButton.hide();
                                        saveButton.hide();
                                    }
                                };
                                var staritem = function () {
                                    this.parentNode.classList.toggle('starred');
                                    var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                                    if (this.parentNode.classList.contains('starred')) {
                                        this.parentNode.link.starred = true;
                                    }
                                    else {
                                        this.parentNode.link.starred = false;
                                    }
                                    store.put(this.parentNode.link);
                                }
                                var createNode = function (video, before) {
                                    var node = ui.create.div('.videonode.menubutton.large', clickcapt);
                                    node.link = video;
                                    var nodename1 = ui.create.div('.menubutton.videoavatar', node);
                                    nodename1.setBackground(video.name1, 'character');
                                    if (video.name2) {
                                        var nodename2 = ui.create.div('.menubutton.videoavatar2', node);
                                        nodename2.setBackground(video.name2, 'character');
                                    }
                                    var date = new Date(video.time);
                                    var str = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + (date.getDate()) + ' ' +
                                        date.getHours() + ':';
                                    var minutes = date.getMinutes();
                                    if (minutes < 10) {
                                        str += '0';
                                    }
                                    str += minutes;
                                    ui.create.div('.caption', video.name[0], node);
                                    ui.create.div('.text', str + '<br>' + video.name[1], node);
                                    if (video.win) {
                                        ui.create.div('.victory', '胜', node);
                                    }

                                    if (before) {
                                        page.insertBefore(node, page.firstChild);
                                    }
                                    else {
                                        page.appendChild(node);
                                    }
                                    ui.create.div('.video_star', '★', node, staritem);
                                    if (video.starred) {
                                        node.classList.add('starred');
                                    }
                                }
                                for (var i = 0; i < lib.videos.length; i++) {
                                    createNode(lib.videos[i]);
                                }
                                ui.create.videoNode = createNode;
                                var importVideoNode = ui.create.div('.config.switcher.pointerspan',
                                    '<span class="underlinenode slim ">导入录像...</span>', function () {
                                        this.nextSibling.classList.toggle('hidden');
                                    }, page);
                                importVideoNode.style.marginLeft = '12px';
                                importVideoNode.style.marginTop = '3px';
                                var importVideo = ui.create.div('.config.hidden', page);
                                importVideo.style.whiteSpace = 'nowrap';
                                importVideo.style.marginBottom = '80px';
                                importVideo.style.marginLeft = '13px';
                                importVideo.style.width = 'calc(100% - 30px)';
                                importVideo.innerHTML = '<input type="file" style="width:calc(100% - 40px)">' +
                                    '<button style="width:40px">确定</button>';
                                importVideo.lastChild.onclick = function () {
                                    var fileToLoad = importVideo.firstChild.files[0];
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        var data = fileLoadedEvent.target.result;
                                        if (!data) return;
                                        try {
                                            data = JSON.parse(lib.init.decode(data));
                                        }
                                        catch (e) {
                                            console.log(e);
                                            alert('导入失败');
                                            return;
                                        }
                                        var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                                        var videos = lib.videos.slice(0);
                                        for (var i = 0; i < videos.length; i++) {
                                            if (videos[i].starred) {
                                                videos.splice(i--, 1);
                                            }
                                        }
                                        for (var deletei = 0; deletei < 5; deletei++) {
                                            if (videos.length >= parseInt(lib.config.video) && videos.length) {
                                                var toremove = videos.pop();
                                                lib.videos.remove(toremove);
                                                store.delete(toremove.time);
                                                for (var i = 0; i < page.childNodes.length; i++) {
                                                    if (page.childNodes[i].link == toremove) {
                                                        page.childNodes[i].remove();
                                                        break;
                                                    }
                                                }
                                            }
                                            else {
                                                break;
                                            }
                                        }
                                        for (var i = 0; i < lib.videos.length; i++) {
                                            if (lib.videos[i].time == data.time) {
                                                alert('录像已存在');
                                                return;
                                            }
                                        }
                                        lib.videos.unshift(data);
                                        store.put(data);
                                        createNode(data, true);
                                    };
                                    fileReader.readAsText(fileToLoad, "UTF-8");
                                }

                                playButton.listen(function () {
                                    var current = this.parentNode.querySelector('.videonode.active');
                                    if (current) {
                                        game.playVideo(current.link.time, current.link.mode);
                                    }
                                });
                                deleteButton.listen(function () {
                                    var current = this.parentNode.querySelector('.videonode.active');
                                    if (current) {
                                        lib.videos.remove(current.link);
                                        var store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
                                        store.delete(current.link.time);
                                        current.remove();
                                    }
                                });
                                saveButton.listen(function () {
                                    var current = this.parentNode.querySelector('.videonode.active');
                                    if (current) {
                                        game.export(lib.init.encode(JSON.stringify(current.link)),
                                            '无名杀 - 录像 - ' + current.link.name[0] + ' - ' + current.link.name[1]);
                                    }
                                });

                                ui.updateVideoMenu = function () {
                                    var active = start.firstChild.querySelector('.active');
                                    if (active) {
                                        active.classList.remove('active');
                                        active.link.remove();
                                    }
                                    node.classList.add('active');
                                    rightPane.appendChild(page);
                                    playButton.style.display = '';
                                    deleteButton.style.display = '';
                                    saveButton.style.display = '';
                                }
                            }
                        };
                    }());


                    for (var i in lib.help) {
                        var page = ui.create.div('');
                        var node = ui.create.div('.menubutton.large', i, start.firstChild, clickMode);
                        node.type = 'help';
                        node.link = page;
                        node.style.display = 'none';
                        page.classList.add('menu-help');
                        page.innerHTML = lib.help[i];
                    }

                    if (!connectMenu) {
                        var node = ui.create.div('.menubutton.large', '帮助', start.firstChild, function () {
                            var activex = start.firstChild.querySelector('.active');
                            if (this.innerHTML == '帮助') {
                                cheatButton.style.display = 'none';
                                runButton.style.display = 'none';
                                clearButton.style.display = 'none';
                                playButton.style.display = 'none';
                                saveButton.style.display = 'none';
                                deleteButton.style.display = 'none';

                                this.innerHTML = '返回';
                                for (var i = 0; i < start.firstChild.childElementCount; i++) {
                                    var nodex = start.firstChild.childNodes[i];
                                    if (nodex == node) continue;
                                    if (nodex.type == 'help') {
                                        nodex.style.display = '';
                                        if (activex && activex.type != 'help') {
                                            activex.classList.remove('active');
                                            activex.link.remove();
                                            activex = null;
                                            nodex.classList.add('active');
                                            rightPane.appendChild(nodex.link);
                                        }
                                    }
                                    else {
                                        nodex.style.display = 'none';
                                    }
                                }
                            }
                            else {
                                this.innerHTML = '帮助';
                                for (var i = 0; i < start.firstChild.childElementCount; i++) {
                                    var nodex = start.firstChild.childNodes[i];
                                    if (nodex == node) continue;
                                    if (nodex.type != 'help') {
                                        nodex.style.display = '';
                                        if (activex && activex.type == 'help') {
                                            activex.classList.remove('active');
                                            activex.link.remove();
                                            activex = null;
                                            clickMode.call(nodex);
                                        }
                                    }
                                    else {
                                        nodex.style.display = 'none';
                                    }
                                }
                            }
                        });
                    }

                    var active = start.firstChild.querySelector('.active');
                    if (!active) {
                        active = start.firstChild.firstChild;
                        active.classList.add('active');
                    }
                    rightPane.appendChild(active.link);
                }());

            if (menuTimeout) {
                clearTimeout(menuTimeout);
                delete window.resetExtension;
                localStorage.removeItem(lib.configprefix + 'disable_extension', true);
            }
        },
        table: function () {
            var str, row, col, position, position2, fixed, style, divposition;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string') str = arguments[i];
                else if (typeof arguments[i] == 'number') {
                    if (typeof row == 'number') {
                        if (typeof col == 'number') position2 = arguments[i];
                        else col = arguments[i];
                    }
                    else row = arguments[i];
                }
                else if (get.objtype(arguments[i]) == 'div' ||
                    get.objtype(arguments[i]) == 'table' ||
                    get.objtype(arguments[i]) == 'tr' ||
                    get.objtype(arguments[i]) == 'td' ||
                    get.objtype(arguments[i]) == 'body') position = arguments[i];
                else if (typeof arguments[i] == 'boolean') fixed = arguments[i];
                else if (get.itemtype(arguments[i]) == 'divposition') divposition = arguments[i];
                else if (typeof arguments[i] == 'object') style = arguments[i];
            }
            if (str == undefined) str = '';
            var node = document.createElement('table');
            for (var i = 0; i < str.length; i++) {
                if (str[i] == '.') {
                    if (node.className.length != 0) {
                        node.className += ' ';
                    }
                    while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                        node.className += str[i + 1];
                        i++;
                    }
                }
                else if (str[i] == '#') {
                    while (str[i + 1] != '.' && str[i + 1] != '#' && i + 1 < str.length) {
                        node.id += str[i + 1];
                        i++;
                    }
                }
            }
            var tr, td;
            for (var i = 0; i < row; i++) {
                tr = document.createElement('tr');
                if (fixed) tr.style.height = (100 / row) + '%';
                node.appendChild(tr);
                for (var j = 0; j < col; j++) {
                    td = document.createElement('td');
                    tr.appendChild(td);
                }
            }
            if (position) {
                if (typeof position2 == 'number' && position.childNodes.length > position2) {
                    position.insertBefore(node, position.childNodes[position2]);
                }
                else {
                    position.appendChild(node);
                }
            }
            return node;
        },
        giveup: function () {
            if (ui.giveup) return;
            if (!lib.config.show_giveup) return;
            ui.giveup = ui.create.system('投降', function () {
                var player = game.me;
                this.remove();
                if (game.online) {
                    game.send('giveup', player);
                }
                else {
                    _status.event.next.length = 0;
                    game.createEvent('giveup', false).setContent(function () {
                        game.log(player, '投降');
                        player.popup('投降');
                        player.die('nosource');
                    }).player = player;
                }
                if (_status.paused && _status.imchoosing && !_status.auto) {
                    ui.click.auto();
                }
            }, true, true);
        },
        groupControl: function (dialog) {
            return ui.create.control(...lib.group2, function (link, node) {//'wei','shu','wu','western','key',
                if (link == '全部') {
                    dialog.currentcapt = '';
                    dialog.currentgroup = '';
                    for (var i = 0; i < dialog.buttons.length; i++) {
                        dialog.buttons[i].style.display = '';
                    }
                }
                else {
                    if (node.classList.contains('thundertext')) {
                        dialog.currentgroup = null;
                        dialog.currentgroupnode = null;
                        node.classList.remove('thundertext');
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                    else {
                        if (dialog.currentgroupnode) {
                            dialog.currentgroupnode.classList.remove('thundertext');
                        }
                        dialog.currentgroup = link;
                        dialog.currentgroupnode = node;
                        node.classList.add('thundertext');
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.buttons[i].group != link ||
                                (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt))) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                }
            });
        },
        /**
         * 生成带有卡牌按钮的弹窗
         * @function
         * @returns {HTMLDivElement} 返回生成的弹窗
         * @see {@link ui.create.characterDialog}
         */
        cardDialog: function () {
            var args = ['thisiscard'];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return ui.create.characterDialog.apply(this, args);
        },
        /**
         * 生成带有卡牌或角色按钮的弹窗（旧版）
         * @function
         * @param {?string} thisiscard 是否是卡牌
         * @param {?string} heightset 是否是大弹窗
         * @param {?string} characterx 同一角色是否可替换武将牌（例如在标准和界限突破间切换）
         * @param {?function} filter 卡牌或角色的筛选条件
         * @param {?boolean} noclick 按钮是否可以被点击
         * @returns {HTMLDivElement} 返回生成的弹窗
         */
        characterDialog2: function (filter) {
            var list = [];
            for (var i in lib.character) {
                if (lib.character[i][4].contains('minskin')) continue;
                if (lib.character[i][4].contains('boss') || lib.character[i][4].contains('hiddenboss')) {
                    if (lib.config.mode == 'boss') continue;
                    if (!lib.character[i][4].contains('bossallowed')) continue;
                }

                if (lib.character[i][4].contains('stonehidden')) continue;
                if (lib.config.banned.contains(i)) continue;
                if (filter && filter(i)) continue;
                list.push(i);
            }
            var dialog = ui.create.dialog('hidden');
            dialog.classList.add('noupdate');
            dialog.classList.add('scroll1');
            dialog.classList.add('scroll2');
            dialog.classList.add('scroll3');
            list.sort(lib.sort.character);
            dialog.classList.add('character');
            dialog.classList.add('choose-character');
            // var getPack = function (name) {
            //    for (var i in lib.characterPack) {
            //       if (lib.characterPack[i][name]) return i;
            //    }
            //    return null;
            // }
            // var packs = {};
            var packnode = ui.create.div('.packnode', dialog);
            lib.setScroll(packnode);
            var clickCapt = function () {
                var active = this.parentNode.querySelector('.active');
                if (active) {
                    active.classList.remove('active');
                }
                this.classList.add('active');
                for (var i = 0; i < dialog.buttons.length; i++) {
                    if (this.pack && !this.pack.contains(dialog.buttons[i].link)) {
                        dialog.buttons[i].classList.add('nodisplay');
                    }
                    else {
                        dialog.buttons[i].classList.remove('nodisplay');
                    }
                }
            }
            var createNode = function (packname) {
                var pack = null;
                if (packname == '最近使用') {
                    pack = get.config('recentCharacter') || [];
                }
                else if (packname == '收藏') {
                    pack = lib.config.favouriteCharacter;
                }
                var node = ui.create.div('.dialogbutton.menubutton.large', packname, packnode, clickCapt);
                node.pack = pack;
                return node;
            }
            dialog.add([list, 'character']);
            var bool = true;
            var node;
            var recent = get.config('recentCharacter');
            if (recent && recent.length) {
                node = createNode('最近使用');
                if (lib.config.character_dialog_tool == '最近使用') {
                    clickCapt.call(node);
                    bool = false;
                }
            }
            if (lib.config.favouriteCharacter.length) {
                node = createNode('收藏');
                if (lib.config.character_dialog_tool == '收藏') {
                    clickCapt.call(node);
                    bool = false;
                }
            }
            var node = createNode('全部');
            if (lib.config.character_dialog_tool == 'all') {
                clickCapt.call(node);
                bool = false;
            }
            if (bool) {
                clickCapt.call(packnode.firstChild);
            }

            var node = ui.create.div('.dialogbutton.menubutton.large', '筛选', packnode);
            return dialog;
        },
        /**
         * 生成带有卡牌或角色按钮的弹窗（新版）
         * @function
         * @param {?string} thisiscard 是否是卡牌
         * @param {?string} heightset 是否是大弹窗
         * @param {?string} characterx 同一角色是否可替换武将牌（例如在标准和界限突破间切换）
         * @param {?function} filter 卡牌或角色的筛选条件
         * @param {?boolean} noclick 按钮是否可以被点击
         * @returns {HTMLDivElement} 返回生成的弹窗
         */
        characterDialog: function () {
            // if(lib.config.character_dialog_style=='newstyle'){
            //     for(var i=0;i<arguments.length;i++){
            //                  if(arguments[i]=='thisiscard'){
            //                               break;
            //                  }
            //     }
            //     if(i==arguments.length){
            //                  return ui.create.characterDialog2.apply(this,arguments);
            //     }
            // }
            var filter, str, noclick, thisiscard, seperate, expandall, onlypack, heightset, precharacter, characterx;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 'thisiscard') {
                    thisiscard = true;
                }
                else if (arguments[i] === 'expandall') {
                    expandall = true;
                }
                else if (arguments[i] === 'heightset') {
                    heightset = true;
                }
                else if (arguments[i] == 'precharacter') {
                    precharacter = true;
                }
                else if (arguments[i] == 'characterx') {
                    characterx = true;
                }
                else if (typeof arguments[i] == 'string' && arguments[i].indexOf('onlypack:') == 0) {
                    onlypack = arguments[i].slice(9);
                }
                else if (typeof arguments[i] == 'object' && typeof arguments[i].seperate == 'function') {
                    seperate = arguments[i].seperate;
                }
                else if (typeof arguments[i] === 'string') {
                    str = arguments[i];
                }
                else if (typeof arguments[i] === 'function') {
                    filter = arguments[i];
                }
                else if (typeof arguments[i] == 'boolean') {
                    noclick = arguments[i];
                }
            }
            let dialog = ui.create.dialog('hidden');
            let node = ui.create.div('.caption.pointerspan');
            if (get.is.phoneLayout()) {
                node.style.fontSize = '30px';
            }
            let { list, namecapt } = ui.create.characterDialog_getList(thisiscard, filter);
            if (!thisiscard) {
                namecapt.remove('自定义');
                namecapt.push('newline');
                for (let i in lib.characterDialogGroup) {
                    namecapt.push(i);
                }
            }
            let newlined = false;
            let newlined2;
            let packsource;
            let clickCapt = function (e) {
                if (_status.dragged) return;
                if (dialog.currentcapt2 == '最近使用' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                    dialog.currentcapt2 = null;
                    dialog.currentcaptnode2.classList.remove('thundertext');
                    dialog.currentcaptnode2.inited = true;
                    dialog.currentcaptnode2 = null;
                }
                if (this.alphabet) {
                    if (this.classList.contains('thundertext')) {
                        dialog.currentcapt = null;
                        dialog.currentcaptnode = null;
                        this.classList.remove('thundertext');
                        if (this.touchlink) {
                            this.touchlink.classList.remove('active');
                        }
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                    else {
                        if (dialog.currentcaptnode) {
                            dialog.currentcaptnode.classList.remove('thundertext');
                            if (dialog.currentcaptnode.touchlink) {
                                dialog.currentcaptnode.touchlink.classList.remove('active');
                            }
                        }
                        dialog.currentcapt = this.link;
                        dialog.currentcaptnode = this;
                        this.classList.add('thundertext');
                        if (this.touchlink) {
                            this.touchlink.classList.add('active');
                        }
                        for (var i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                }
                else {
                    if (newlined2) {
                        newlined2.style.display = 'none';
                        if (!packsource.onlypack) {
                            packsource.classList.remove('thundertext');
                            if (!get.is.phoneLayout() || !lib.config.filternode_button) {
                                packsource.innerHTML = '武将包';
                            }
                        }
                    }
                    if (this.classList.contains('thundertext')) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2 = null;
                        this.classList.remove('thundertext');
                        if (this.touchlink) {
                            this.touchlink.classList.remove('active');
                        }
                        for (let i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                    else {
                        if (dialog.currentcaptnode2) {
                            dialog.currentcaptnode2.classList.remove('thundertext');
                            if (dialog.currentcaptnode2.touchlink) {
                                dialog.currentcaptnode2.touchlink.classList.remove('active');
                            }
                        }
                        dialog.currentcapt2 = this.link;
                        dialog.currentcaptnode2 = this;
                        this.classList.add('thundertext');
                        if (this.touchlink) {
                            this.touchlink.classList.add('active');
                        }
                        else if (this.parentNode == newlined2) {
                            packsource.innerHTML = this.innerHTML;
                            packsource.classList.add('thundertext');
                        }
                        for (let i = 0; i < dialog.buttons.length; i++) {
                            if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else if (dialog.currentgroup && dialog.buttons[i].group != dialog.currentgroup) {
                                dialog.buttons[i].classList.add('nodisplay');
                            }
                            else {
                                if (dialog.buttons[i].activate) {
                                    dialog.buttons[i].activate();
                                }
                                dialog.buttons[i].classList.remove('nodisplay');
                            }
                        }
                    }
                }
                if (dialog.seperate) {
                    for (var i = 0; i < dialog.seperate.length; i++) {
                        if (!dialog.seperate[i].nextSibling.querySelector('.button:not(.nodisplay)')) {
                            dialog.seperate[i].style.display = 'none';
                            dialog.seperate[i].nextSibling.style.display = 'none';
                        }
                        else {
                            dialog.seperate[i].style.display = '';
                            dialog.seperate[i].nextSibling.style.display = '';
                        }
                    }
                }
                if (filternode) {
                    if (filternode.querySelector('.active')) {
                        packsource.classList.add('thundertext');
                    }
                    else {
                        packsource.classList.remove('thundertext');
                    }
                }
                if (e) e.stopPropagation();
            };
            for (let i = 0; i < namecapt.length; i++) {
                if (namecapt[i] == 'newline') {
                    newlined = document.createElement('div');
                    newlined.style.marginTop = '5px';
                    newlined.style.display = 'block';
                    // newlined.style.fontFamily='xinwei';
                    if (get.is.phoneLayout()) {
                        newlined.style.fontSize = '32px';
                    }
                    else {
                        newlined.style.fontSize = '22px';
                    }
                    newlined.style.textAlign = 'center';
                    node.appendChild(newlined);
                }
                else if (newlined) {
                    let span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius');
                    span.style.margin = '3px';
                    span.style.width = 'auto';
                    span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                    span.link = namecapt[i];
                    span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                    newlined.appendChild(span);
                    node[namecapt[i]] = span;
                }
                else {
                    if (!node.spans) {
                        node.spans = ui.create.div('.menu.shadowed.reduce_radius.fixed_medium.fixed_around.pinkbg', node);
                        let span = document.createElement('span');
                        span.className = 'menubutton dim'
                        span.innerHTML = '罗马音';
                        node.spans.appendChild(span);
                    }
                    let span = document.createElement('span');
                    span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                    span.link = namecapt[i];
                    span.alphabet = true;
                    span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                    node.spans.appendChild(span);
                }
            }
            let putSpan = () => {
                let span = document.createElement('span');
                newlined.appendChild(span);
                span.style.margin = '8px';
            }
            if (!thisiscard) {
                let updateCapt = (i) => {
                    if (dialog.currentcapt && i.capt != dialog.getCurrentCapt(i.link, i.capt)) {
                        i.classList.add('nodisplay');
                    }
                    else if (dialog.currentcapt2 && i.capt != dialog.getCurrentCapt(i.link, i.capt, true)) {
                        i.classList.add('nodisplay');
                    }
                    else if (dialog.currentcharanode && i.capt != dialog.getCurrentCapt(i.link, i.capt, 'chara')) {
                        i.classList.add('nodisplay');
                    }
                    else {
                        i.classList.remove('nodisplay');
                    }
                }
                putSpan()
                let groupCapt = {
                    ...ui.create.characterDialog_getGroups(list),
                    clickButton() {
                        if (this.classList.contains('thundertext')) {
                            this.classList.remove('thundertext');
                            if (node.bigGroup) node.bigGroup.hide()
                            if (node.smallGroup) node.smallGroup.hide()
                        }
                        else {
                            this.classList.add('thundertext');
                            if (node.bigGroup) node.bigGroup.show()
                            if (node.smallGroup) node.smallGroup.show()
                        }
                    },
                    clickGroup() {
                        if (_status.dragged) return;
                        if (dialog.currentcapt2 == '最近使用' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                            dialog.currentcapt2 = null;
                            dialog.currentcaptnode2.classList.remove('thundertext');
                            dialog.currentcaptnode2.inited = true;
                            dialog.currentcaptnode2 = null;
                        }
                        var link = this.link;
                        if (this.classList.contains('thundertext')) {
                            dialog.currentgroup = null;
                            dialog.currentgroupnode = null;
                            this.classList.remove('thundertext');
                            dialog.buttons.forEach(i => updateCapt(i))
                        }
                        else {
                            if (dialog.currentgroupnode) {
                                dialog.currentgroupnode.classList.remove('thundertext');
                            }
                            dialog.currentgroup = link;
                            dialog.currentgroupnode = this;
                            this.classList.add('thundertext');
                            dialog.buttons.forEach(i => {
                                updateCapt(i)
                                if (dialog.currentgroup == 'double') {
                                    if (i._changeGroup || i.group == 'ye') i.classList.remove('nodisplay');
                                    else i.classList.add('nodisplay');
                                }
                                else {
                                    if (i._changeGroup || i.group == 'ye' || i.group != dialog.currentgroup) {
                                        i.classList.add('nodisplay');
                                    }
                                }
                            })
                        }
                    }
                }
                groupCapt.button = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin', '势力列表', newlined, groupCapt.clickButton)
                groupCapt.button.style.margin = '3px';
                groupCapt.groups.forEach(g => {
                    let groupdiv = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                    groupdiv.style.margin = '3px';
                    groupdiv.innerHTML = lib.translate[`${g}2`] ? get.translation(`${g}2`) : get.translation(g);
                    groupdiv.link = g;
                    groupdiv.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', groupCapt.clickGroup);
                    if (groupCapt.groups_count[g] > 5) {
                        if (!node.bigGroup) {
                            node.bigGroup = ui.create.div('.menu.shadowed.reduce_radius.fixed_medium.pinkbg.hidden', node);
                            ui.create.div('.tdnode.menubutton.dim', '大势力', node.bigGroup);
                        }
                        node.bigGroup.appendChild(groupdiv);
                    }
                    else {
                        if (!node.smallGroup) {
                            node.smallGroup = ui.create.div('.menu.shadowed.reduce_radius.fixed_medium.pinkbg.hidden', node);
                            ui.create.div('.tdnode.menubutton.dim', '小势力', node.smallGroup);
                        }
                        node.smallGroup.appendChild(groupdiv);
                    }
                })
                dialog.groupCapt = groupCapt
                putSpan()
                let charaCapt = {
                    curCapt: '无',
                    charas: {
                        '无': () => true,
                        '主公': (name) => get.character(name, 4).includes('zhu'),
                        '国V': (name) => get.character(name, 4).includes('guoV'),
                        '英V': (name) => get.character(name, 4).includes('yingV'),
                        '觉醒': (name) => lib.character[name][3].some(skill => lib.skill[skill].juexingji),
                    },
                    filter: () => charaCapt.charas[charaCapt.curCapt],
                    clickButton() {
                        if (this.classList.contains('thundertext')) {
                            this.classList.remove('thundertext');
                            if (node.charas) node.charas.hide()
                        }
                        else {
                            this.classList.add('thundertext');
                            if (node.charas) node.charas.show()
                        }
                    },
                    clickChara() {
                        if (_status.dragged) return;
                        if (dialog.currentcapt2 == '最近使用' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                            dialog.currentcapt2 = null;
                            dialog.currentcaptnode2.classList.remove('thundertext');
                            dialog.currentcaptnode2.inited = true;
                            dialog.currentcaptnode2 = null;
                        }
                        var link = this.link;
                        if (this.classList.contains('thundertext')) {
                            charaCapt.curCapt = '无'
                            dialog.currentcharanode = null
                            this.classList.remove('thundertext');
                            dialog.buttons.forEach(i => updateCapt(i))
                        }
                        else {
                            if (dialog.currentcharanode) {
                                dialog.currentcharanode.classList.remove('thundertext');
                            }
                            charaCapt.curCapt = link;
                            dialog.currentcharanode = this;
                            this.classList.add('thundertext');
                            dialog.buttons.forEach(i => updateCapt(i))
                        }
                    }
                }
                charaCapt.button = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin', '角色特性', newlined, charaCapt.clickButton)
                charaCapt.button.style.margin = '3px';
                for (let i in charaCapt.charas) {
                    if (i === '无') continue;
                    let charadiv = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                    charadiv.style.margin = '3px';
                    charadiv.innerHTML = i;
                    charadiv.link = i;
                    charadiv.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', charaCapt.clickChara);
                    if (!node.charas) {
                        node.charas = ui.create.div('.menu.shadowed.reduce_radius.fixed_medium.pinkbg.hidden', node);
                        ui.create.div('.tdnode.menubutton.dim', '特性', node.charas);
                    }
                    node.charas.appendChild(charadiv);
                }
                putSpan()
                dialog.charaCapt = charaCapt
                packsource = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                packsource.style.margin = '3px';
                newlined.appendChild(packsource);
                var filternode = null;
                var clickCaptNode = function (e) {
                    delete _status.filterCharacter;
                    ui.window.classList.remove('shortcutpaused');
                    filternode.delete();
                    filternode.classList.remove('shown');
                    clickCapt.call(this.link, e);
                };
                if (get.is.phoneLayout() && lib.config.filternode_button) {
                    newlined.style.marginTop = '';
                    packsource.innerHTML = '筛选';
                    filternode = ui.create.div('.popup-container.filter-character.modenopause');
                    ui.create.div(filternode);
                    filternode.listen(function (e) {
                        if (this.classList.contains('removing')) return;
                        delete _status.filterCharacter;
                        ui.window.classList.remove('shortcutpaused');
                        this.delete();
                        this.classList.remove('shown');
                        e.stopPropagation();
                    });
                    phone = (container) => {
                        container.style.visibility = 'hidden';
                        container.style.height = '0';
                        for (var i = 1; i < container.childElementCount; i++) {
                            if (container.childNodes[i].tagName.toLowerCase() == 'span') {
                                container.childNodes[i].style.display = 'none';
                                container.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large.capt', container.childNodes[i].innerHTML);
                                container.childNodes[i].touchlink.link = container.childNodes[i];
                            }
                        }
                    }
                    phone(node.spans);
                    ui.create.node('br', filternode.firstChild);
                }
                else {
                    if (onlypack) {
                        packsource.onlypack = true;
                        packsource.innerHTML = get.translation(onlypack + '_character_config');
                        packsource.style.display = 'none';
                        packsource.previousSibling.style.display = 'none';
                    }
                    else {
                        packsource.innerHTML = '武将包';
                    }
                }

                newlined2 = document.createElement('div');
                newlined2.style.marginTop = '5px';
                newlined2.style.display = 'none';
                newlined2.style.fontFamily = 'xinwei';
                newlined2.classList.add('pointernode');
                if (get.is.phoneLayout()) {
                    newlined2.style.fontSize = '32px';
                }
                else {
                    newlined2.style.fontSize = '22px';
                }
                newlined2.style.textAlign = 'center';
                node.appendChild(newlined2);

                packsource.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                    if (packsource.onlypack) return;
                    if (_status.dragged) return;
                    if (get.is.phoneLayout() && lib.config.filternode_button && filternode) {
                        _status.filterCharacter = true;
                        ui.window.classList.add('shortcutpaused');
                        ui.window.appendChild(filternode);
                        ui.refresh(filternode);
                        filternode.classList.add('shown');
                        var dh = filternode.offsetHeight - filternode.firstChild.offsetHeight;
                        if (dh > 0) {
                            filternode.firstChild.style.top = (dh / 2) + 'px';
                        }
                        else {
                            filternode.firstChild.style.top = '';
                        }
                    }
                    else {
                        if (newlined2.style.display == 'none') {
                            packsource.classList.add('thundertext');
                            newlined2.style.display = 'block';
                        }
                        else {
                            packsource.classList.remove('thundertext');
                            newlined2.style.display = 'none';
                        }
                    }
                });
                var packlist = [];
                for (var i = 0; i < lib.config.all.characters.length; i++) {
                    if (!lib.config.characters.contains(lib.config.all.characters[i])) continue;
                    packlist.push(lib.config.all.characters[i]);
                }
                for (var i in lib.characterPack) {
                    if (!lib.config.all.characters.contains(i) && lib.translate[`${i}_character_config`] !== undefined) {
                        packlist.push(i);
                    }
                }
                for (var i = 0; i < packlist.length; i++) {
                    var span = document.createElement('div');
                    span.style.display = 'inline-block';
                    span.style.width = 'auto';
                    span.style.margin = '5px';
                    if (get.is.phoneLayout()) {
                        span.style.fontSize = '32px';
                    }
                    else {
                        span.style.fontSize = '22px';
                    }
                    span.innerHTML = lib.translate[packlist[i] + '_character_config'];
                    span.link = packlist[i];
                    span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                    newlined2.appendChild(span);
                    if (filternode && !onlypack) {
                        span.touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large', span.innerHTML);
                        span.touchlink.link = span;
                    }
                }
            }

            var groupSort;
            if (thisiscard) {
                groupSort = function (name) {
                    var type = lib.card[name[2]].type;
                    if (lib.cardType[type]) {
                        return lib.cardType[type];
                    }
                    switch (type) {
                        case 'basic': return 0;
                        case 'chess': return 1.5;
                        case 'trick': return 2;
                        case 'delay': return 3;
                        case 'equip': return 4;
                        case 'zhenfa': return 5;
                        default: return 6;
                    }
                };
            }
            else {
                var getGroup = function (name) {
                    let groups = get.charaGroups(name);
                    if (groups) return groups[0];
                },
                    groupSort = function (name) {
                        if (!lib.character[name]) return 50;
                        var group = getGroup(name);
                        if (group == 'vtuber') return 40;
                        if (group == 'clubs') return 41;
                        var list = get.groups();
                        if (list.contains(group)) return list.indexOf(group);
                        return 49;
                    };
            }
            list.sort(function (a, b) {
                var del = groupSort(a) - groupSort(b);
                if (del != 0) return del;
                var aa = a, bb = b;
                if (a.indexOf('_') != -1) {
                    a = a.slice(a.lastIndexOf('_') + 1);
                }
                if (b.indexOf('_') != -1) {
                    b = b.slice(b.lastIndexOf('_') + 1);
                }
                if (a != b) {
                    return a > b ? 1 : -1;
                }
                return aa > bb ? 1 : -1;
            });
            dialog.classList.add('noupdate');
            dialog.classList.add('scroll1');
            dialog.classList.add('scroll2');
            dialog.classList.add('scroll3');
            dialog.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
                _status.clicked2 = true;
            });
            if (heightset) {
                dialog.style.height = ((game.layout == 'long2' || game.layout == 'nova') ? 380 : 350) + 'px';
                dialog._scrollset = true;
            }
            dialog.getCurrentCapt = function (link, capt, noalph) {
                if (dialog.charaCapt && !dialog.charaCapt.filter()(link)) return false
                if (noalph === 'chara') return capt
                var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
                if (this.seperatelist && noalph) {
                    if (this.seperatelist[currentcapt].includes(link)) return capt;
                    return null;
                }
                if (lib.characterDialogGroup[currentcapt]) {
                    return lib.characterDialogGroup[currentcapt](link, capt);
                }
                if (lib.characterPack[currentcapt]) {
                    if (lib.characterPack[currentcapt][link]) {
                        return capt;
                    }
                    return null;
                }
                return this.currentcapt;
            }
            if (str) {
                dialog.add(str);
            }
            dialog.add(node);
            if (thisiscard) {
                if (seperate) {
                    seperate = seperate(list);
                    dialog.seperate = [];
                    dialog.seperatelist = seperate.list;
                    if (dialog.seperatelist) {
                        newlined = document.createElement('div');
                        newlined.style.marginTop = '5px';
                        newlined.style.display = 'block';
                        newlined.style.fontFamily = 'xinwei';
                        if (get.is.phoneLayout()) {
                            newlined.style.fontSize = '32px';
                        }
                        else {
                            newlined.style.fontSize = '22px';
                        }
                        newlined.style.textAlign = 'center';
                        node.appendChild(newlined);
                        for (var i in dialog.seperatelist) {
                            var span = document.createElement('span');
                            span.style.margin = '3px';
                            span.innerHTML = i;
                            span.link = i;
                            span.seperate = true;
                            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                            newlined.appendChild(span);
                        }
                    }
                    for (var i in seperate) {
                        if (i == 'list') continue;
                        var link = '';
                        var linkcontent = seperate[i];
                        if (i.indexOf('_link:') != -1) {
                            link = i.slice(i.indexOf('_link:') + 6);
                            i = i.slice(0, i.indexOf('_link:'));
                        }
                        var nodesep = dialog.add(i);
                        nodesep.link = link;
                        dialog.seperate.push(nodesep);
                        dialog.add([linkcontent, 'vcard'], noclick);
                    }
                }
                else {
                    dialog.add([list, 'vcard'], noclick);
                }
            }
            else {
                if (precharacter) {
                    dialog.add([list, 'precharacter'], noclick);
                }
                else if (characterx) {
                    dialog.add([list, 'characterx'], noclick);
                }
                else {
                    dialog.add([list, 'character'], noclick);
                }
            }
            dialog.add(ui.create.div('.placeholder'));
            dialog.buttons.forEach(i => {
                if (thisiscard) {
                    i.capt = ui.create.characterDialog_getCapt(i.link[2]);
                }
                else {
                    i.group = get.charaGroups(i.link)[0];
                    i.capt = ui.create.characterDialog_getCapt(i.link);
                }
            })
            if (!expandall) {
                if (!thisiscard && (lib.characterDialogGroup[lib.config.character_dialog_tool] ||
                    lib.config.character_dialog_tool == '自创')) {
                    clickCapt.call(node[lib.config.character_dialog_tool]);
                }
            }
            return dialog;
        },
        characterDialog_getCapt: function (str) {
            var capt;
            if (str.indexOf('_') == -1) {
                capt = str[0];
            }
            else {
                capt = str[str.lastIndexOf('_') + 1];
            }
            capt = capt.toLowerCase();
            if (!/[a-z]/i.test(capt)) {
                capt = '自定义';
            }
            return capt;
        },
        characterDialog_getList: function (thisiscard, filter) {
            let list = [], namecapt = []
            if (thisiscard) {
                for (let i in lib.card) {
                    if (!lib.translate[i + '_info']) continue;
                    if (filter && filter(i)) continue;
                    list.push(['', get.translation(lib.card[i].type), i]);
                    if (namecapt.indexOf(ui.create.characterDialog_getCapt(i)) == -1) {
                        namecapt.push(ui.create.characterDialog_getCapt(i));
                    }
                }
            }
            else {
                for (let i in lib.character) {
                    if (lib.character[i][4].contains('minskin')) continue;
                    if (lib.character[i][4].contains('boss') || lib.character[i][4].contains('hiddenboss')) {
                        if (lib.config.mode == 'boss') continue;
                        if (!lib.character[i][4].contains('bossallowed')) continue;
                    }

                    if (lib.character[i][4].contains('stonehidden')) continue;
                    if (lib.character[i][4].contains('unseen')) continue;
                    if (lib.config.banned.contains(i)) continue;
                    if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) continue;
                    if (filter && filter(i)) continue;
                    list.push(i);
                    if (namecapt.indexOf(ui.create.characterDialog_getCapt(i)) == -1) {
                        namecapt.push(ui.create.characterDialog_getCapt(i));
                    }
                }
            }
            namecapt.sort(function (a, b) {
                return a > b ? 1 : -1;
            });
            return { list, namecapt }
        },
        characterDialog_getGroups: function (characters) {
            let groups = lib.group.slice().removeArray(['wei', 'shu', 'wu', 'jin', 'western', 'key', 'vtuber', 'clubs']);
            if (get.mode() == 'guozhan' || (get.mode() == 'versus' && _status.mode != 'jiange' && (!_status.connectMode || lib.configOL.versus_mode === '4v4'))) {
                groups = ['holo', 'nijisanji', 'vtuber', 'clubs'];
            }
            let groups_copy = [...groups]
            let groups_count = {}
            characters.forEach(c => {
                if (get.is.double(c)) {
                    groups_count.double ? groups_count.double++ : (groups_count.double = 1)
                }
                else {
                    let sourceGroups = get.charaGroups(c)
                    sourceGroups.forEach(g => groups_count[g] ? groups_count[g]++ : (groups_count[g] = 1))
                    groups_copy.removeArray(sourceGroups)
                }
            })
            groups.removeArray(groups_copy)
            if (groups_count.double) groups.add('double');
            return { groups, groups_count }
        },
        dialog: function (...args) {
            let small = null, hidden = notouchscroll = forcebutton = promotionbutton = false;
            let dialog = ui.create.div('.dialog');
            dialog.contentContainer = ui.create.div('.content-container', dialog);
            dialog.content = ui.create.div('.content', dialog.contentContainer);
            dialog.bar1 = ui.create.div('.bar.top', dialog);
            dialog.bar2 = ui.create.div('.bar.bottom', dialog);
            dialog.buttons = [];
            for (let i in lib.element.dialog) {
                dialog[i] = lib.element.dialog[i];
            }
            for (let i of args) {
                if (typeof i == 'boolean') dialog.static = i;
                else if (i == 'hidden') hidden = true;
                else if (i == 'notouchscroll') notouchscroll = true;
                else if (i == 'forcebutton') forcebutton = true;
                else if (i == 'promotionbutton') promotionbutton = true;
                else if (i == 'small') small = true;
                else {
                    dialog.add(i, small, small);
                }
            }
            if (!hidden) {
                dialog.open();
            }
            if (!lib.config.touchscreen) dialog.contentContainer.onscroll = ui.update;
            if (!notouchscroll) {
                dialog.contentContainer.ontouchstart = ui.click.dialogtouchStart;
                dialog.contentContainer.ontouchmove = ui.click.touchScroll;
                dialog.contentContainer.style.WebkitOverflowScrolling = 'touch';
                dialog.ontouchstart = ui.click.dragtouchdialog;
            }
            if (forcebutton) {
                dialog.forcebutton = true;
                dialog.classList.add('forcebutton');
            }
            if (promotionbutton) {
                dialog.promotionbutton = true;
                dialog.classList.add('promotionbutton');
            }
            return dialog;
        },
        line2: function () {
            var node = ui.create.line.apply(this, arguments);
            node.classList.add('line2');
            return node;
        },
        line: function () {
            var two = false, func;
            var node = ui.create.div('.config');
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'string' || typeof arguments[i] == 'number') {
                    if (two) ui.create.div('.toggle', node).innerHTML = arguments[i];
                    else {
                        ui.create.div(node).innerHTML = arguments[i];
                        two = true;
                    }
                }
                else if (typeof arguments[i] == 'function') func = arguments[i];
            }
            if (func) {
                for (var i = 0; i < node.childNodes.length; i++) node.childNodes[i].listen(func);
            }
            return node;
        },
        switcher: function (name, current, current2) {
            var func;
            var node = ui.create.div('.config');
            ui.create.div(node).innerHTML = get.translation(name + '_config');
            var switcher = ui.create.div('.toggle.pointerdiv', node);
            switcher.name = name;
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'function') {
                    func = arguments[i]; break;
                }
            }
            if (typeof current == 'string') {
                switcher.link = current;
                switcher.innerHTML = get.translation(current);
                switcher.contentEditable = true;
                switcher.style.webkitUserSelect = 'text';
                switcher.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.editor);
            }
            else if (typeof current == 'object') {
                switcher.link = current2 || current[0];
                switcher.innerHTML = get.translation(switcher.link);
                switcher.choice = current;
                switcher.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.switcher);
            }
            else {
                if (current) {
                    switcher.classList.add('on');
                }
                switcher.classList.add('onoff');
                ui.create.div(ui.create.div(switcher));
                switcher.link = current ? true : false;
                switcher.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.toggle);
            }
            if (func) switcher.additionalCommand = func;
            return node;
        },
        caption: function (str, position) {
            var caption = ui.create.div('.caption', position);
            caption.innerHTML = str;
            return caption;
        },
        /**
         * 生成底部控制按钮
         * @function
         * @param {?Array} controls 控制按钮列表
         * @param {?string} stayleft 控制按钮是否靠左侧
         * @param {?function} clickCallback 点击回调函数
         * @returns {HTMLDivElement} 反正生成的按钮
         */
        control: function () {
            var nc = !ui.control.querySelector('div:not(.removing):not(.stayleft)');
            var controls;
            var nozoom = false;
            if (Array.isArray(arguments[0])) controls = arguments[0];
            else controls = arguments;
            var control = ui.create.div('.control');
            ui.control.insertBefore(control, _status.createControl || ui.confirm);
            for (let i in lib.element.control) {
                control[i] = lib.element.control[i];
            }
            for (let i = 0; i < controls.length; i++) {
                if (typeof controls[i] == 'function') {
                    control.custom = controls[i];
                }
                else if (controls[i] == 'nozoom') {
                    nozoom = true;
                }
                else if (controls[i] == 'stayleft') {
                    control.stayleft = true;
                    control.classList.add('stayleft');
                }
                else {
                    control.add(controls[i]);
                }
            }
            ui.controls.unshift(control);
            if (nc) {
                ui.control.animate('nozoom', 100);
            }
            // if(ui.control.classList.contains('nozoom')){
            //     nozoom=true;
            // }
            // if(nozoom){
            //     control.classList.add('nozoom');
            // }
            if (control.childNodes.length) {
                // if(nozoom||true){
                control.style.transition = 'opacity 0.5s';
                control.animate('controlpressdownx', 500);
                // }
                // else{
                //     control.style.transition='';
                //     control.style.transform='scale(0.8)';
                // }
                ui.refresh(control);
                if (!control.stayleft) {
                    control.style.transform = 'translateX(-' + (control.offsetWidth / 2) + 'px)';
                }
                control.style.opacity = 1;
                ui.refresh(control);
                control.style.transition = '';
            }

            control.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control2);

            if (true || '按钮效果') {
                control.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function () {
                    if (this.classList.contains('disabled')) return;
                    this.classList.add('controlpressdown');
                    if (typeof this._offset == 'number') {
                        this.style.transform = 'translateX(' + this._offset + 'px) scale(0.97)';
                    }
                });
                control.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
                    this.classList.remove('controlpressdown');
                    if (typeof this._offset == 'number') {
                        this.style.transform = 'translateX(' + this._offset + 'px)';
                    }
                });
            }

            ui.updatec();
            return control;
        },
        confirm: function (str, func) {
            if (ui.confirm && ui.confirm.str == str) {
                return;
            }
            if (str == 'o') {
                if (ui.confirm) {
                    ui.confirm.replace('ok');
                }
                else {
                    ui.confirm = ui.create.control('ok');
                }
            }
            else if (str == 'oc' || str == 'co') {
                if (ui.confirm) {
                    ui.confirm.replace('ok', 'cancel');
                }
                else {
                    ui.confirm = ui.create.control('ok', 'cancel');
                }
            }
            else if (str == 'c') {
                if (ui.confirm) {
                    ui.confirm.replace('cancel');
                }
                else {
                    ui.confirm = ui.create.control('cancel');
                }
            }
            else if (ui.confirm) {
                ui.confirm.close();
                delete ui.confirm;
            }
            if (ui.confirm) {
                ui.confirm.str = str;
                if (func) ui.confirm.custom = func;
                else delete ui.confirm.custom;
            }
        },
        skills: function (skills) {
            var same;
            if (ui.skills) {
                if (ui.skills.skills.length == skills.length && ui.skills.style.display != 'none') {
                    same = true;
                    for (let i = 0; i < skills.length; i++) {
                        if (ui.skills.skills.contains(skills[i]) == false) {
                            same = false;
                            break;
                        }
                    }
                }
                if (same) return;
                ui.skills.close();
                delete ui.skills;
            }
            if (skills == undefined || skills.length == 0) return;
            if (!_status.event.isMine()) {
                _status.noupdatec = true;
            }
            ui.skills = ui.create.control(skills.concat([ui.click.skill]));
            for (var i = 0; i < ui.skills.childNodes.length; i++) {
                ui.skills.childNodes[i].innerHTML = get.skillTranslation(ui.skills.childNodes[i].link, _status.event.player);
            }
            if (!_status.event.isMine()) {
                ui.skills.style.display = 'none';
            }
            else {
                ui.updatec();
            }
            _status.noupdatec = false;
            ui.skills.skills = skills;
            return ui.skills;
        },
        skills2: function (skills) {
            var same;
            if (ui.skills2) {
                if (ui.skills2.skills.length == skills.length && ui.skills2.style.display != 'none') {
                    same = true;
                    for (let i = 0; i < skills.length; i++) {
                        if (ui.skills2.skills.contains(skills[i]) == false) {
                            same = false;
                            break;
                        }
                    }
                }
                if (same) return;
                ui.skills2.close();
                delete ui.skills2;
            }
            if (skills == undefined || skills.length == 0) return;
            if (!_status.event.isMine()) {
                _status.noupdatec = true;
            }
            ui.skills2 = ui.create.control(skills.concat([ui.click.skill]));
            for (var i = 0; i < ui.skills2.childNodes.length; i++) {
                ui.skills2.childNodes[i].innerHTML = get.skillTranslation(ui.skills2.childNodes[i].link, _status.event.player);
            }
            if (!_status.event.isMine()) {
                ui.skills2.style.display = 'none';
            }
            else {
                ui.updatec();
            }
            _status.noupdatec = false;
            ui.skills2.skills = skills;
            return ui.skills2;
        },
        skills3: function (skills) {
            var same;
            if (ui.skills3) {
                if (ui.skills3.skills.length == skills.length && ui.skills3.style.display != 'none') {
                    same = true;
                    for (let i = 0; i < skills.length; i++) {
                        if (ui.skills3.skills.contains(skills[i]) == false) {
                            same = false;
                            break;
                        }
                    }
                }
                if (same) return;
                ui.skills3.close();
                delete ui.skills3;
            }
            if (skills == undefined || skills.length == 0) return;
            if (!_status.event.isMine()) {
                _status.noupdatec = true;
            }
            ui.skills3 = ui.create.control(skills.concat([ui.click.skill]));
            for (var i = 0; i < ui.skills3.childNodes.length; i++) {
                ui.skills3.childNodes[i].innerHTML = get.skillTranslation(ui.skills3.childNodes[i].link, _status.event.player);
            }
            if (!_status.event.isMine()) {
                ui.skills3.style.display = 'none';
            }
            else {
                ui.updatec();
            }
            _status.noupdatec = false;
            ui.skills3.skills = skills;
            return ui.skills3;
        },
        arena: function () {
            if (!lib.config.low_performance) game.clickCanvas.changeCanvas({ size: [4, 10], particles: 10 })
            ui.window = ui.create.div('#window.hidden', document.body);
            ui.create.div('#statusbg', document.body);
            ui.refresh(ui.window);
            if (!localStorage.getItem(lib.configprefix + 'playback')) {
                ui.window.show();
            }
            else {
                setTimeout(function () {
                    ui.window.show();
                }, 1000);
            }
            // lib.setPressure(ui.window,ui.click.pressurepause);
            if (window.isNonameServer) {
                ui.window.classList.add('server');
                var serverinfo = ui.create.div('.serverinfo', ui.window);
                ui.create.div('', '服务器正在运行', serverinfo);
                var serverinfotable = ui.create.table(2, 2, ui.create.div(serverinfo));
                serverinfotable.style.display = 'inline-block';
                serverinfotable.firstChild.firstChild.innerHTML = '房间人数：';
                serverinfotable.firstChild.lastChild.id = 'server_count';
                serverinfotable.firstChild.lastChild.innerHTML = '0';
                serverinfotable.lastChild.firstChild.innerHTML = '房间状态：';
                serverinfotable.lastChild.lastChild.id = 'server_status';
                serverinfotable.lastChild.lastChild.innerHTML = '空闲';
                ui.create.div('.menubutton.large', '关闭服务器', function () {
                    if (_status.gameStarted && !confirm('关闭服务器当前进行的游戏将终止且不可恢复，是否确定关闭？')) {
                        return;
                    }
                    localStorage.removeItem(lib.configprefix + 'asserver');
                    game.reload();
                }, ui.create.div('', serverinfo));
            }

            ui.window.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.window);
            ui.system = ui.create.div("#system.", ui.window);
            ui.arena = ui.create.div('#arena.nome', ui.window);
            if (lib.device == 'ios' && !get.is.phoneLayout()) {
                ui.arena.classList.add('ipad');
            }
            ui.arena.setNumber = function (num) {
                this.dataset.number = num;
                // if(game.layout=='nova'&&parseInt(num)<7){
                //     ui.arena.classList.add('player_autolong');
                // }
                // else if(lib.config.player_height_nova!='long'){
                //     ui.arena.classList.remove('player_autolong');
                // }
                // if(game.layout=='long'&&parseInt(num)<parseInt(lib.config.fewplayer)){
                //     this.classList.add('fewplayer');
                // }
                // else{
                //     this.classList.remove('fewplayer');
                // }
            }

            if (lib.config.low_performance) {
                ui.window.classList.add('low_performance');
            }
            if (game.layout == 'mobile' || game.layout == 'long') {
                ui.arena.classList.add('mobile');
            }
            if (game.layout == 'long' || game.layout == 'long2') {
                ui.arena.classList.add('long');
            }
            if (game.layout == 'default') {
                ui.arena.classList.add('oldlayout');
            }
            if (lib.config.player_border != 'wide' || game.layout == 'long' || game.layout == 'long2') {
                ui.arena.classList.add('slim_player');
            }
            if (lib.config.player_border == 'slim') {
                ui.arena.classList.add('uslim_player');
            }
            if (lib.config.player_border == 'narrow') {
                ui.arena.classList.add('mslim_player');
            }
            if (lib.config.player_border == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
                ui.arena.classList.add('lslim_player');
            }
            ui.window.dataset.player_border = lib.config.player_border;
            if (lib.config.compatiblemode) {
                ui.window.classList.add('compatiblemode');
            }
            ui.window.dataset.radius_size = lib.config.radius_size || 'default';
            // if (game.layout == 'long' || game.layout == 'mobile') {
            //    if (lib.config.textequip == 'text') ui.arena.classList.add('textequip');
            // }
            if (game.layout == 'long' || game.layout == 'long2' || game.layout == 'mobile' || game.layout == 'nova') {
                if (lib.config.cardshape == 'oblong') {
                    ui.window.classList.add('oblongcard');
                    ui.arena.classList.add('oblongcard');
                }
            }
            if (lib.config.blur_ui) {
                ui.window.classList.add('blur_ui');
            }
            if (lib.config.glass_ui) {
                ui.window.classList.add('glass_ui');
            }
            if (lib.config.custom_button) {
                lib.configMenu.appearence.config.custom_button.onclick('skip');
            }

            if (lib.config.show_statusbar_ios == 'overlay') {
                document.body.classList.add('statusbar');
            }
            if (lib.config.keep_awake) {
                if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
                else {
                    let NoSleep = require('nosleep.js/dist/Nosleep.min')
                    let noSleep = new NoSleep();
                    document.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function enableNoSleep() {
                        document.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', enableNoSleep, false);
                        noSleep.enable();
                        window.noSleep = noSleep;
                    }, false);
                }
            }

            lib.updateURL = lib.updateURLS[lib.config.update_link] || lib.updateURLS.coding;

            lib.init.cssstyles();

            ui.arena.dataset.player_height = lib.config.player_height || 'default';
            ui.arena.dataset.player_height_nova = lib.config.player_height_nova || 'default';
            // if(lib.config.player_height_nova=='long') ui.arena.classList.add('player_autolong');
            ui.arena.dataset.target_shake = lib.config.target_shake || 'off';
            ui.backgroundMusic = document.createElement('audio');
            ui.backgroundMusic.volume = lib.config.volumn_background / 8;
            game.playBackgroundMusic();
            ui.backgroundMusic.autoplay = true;
            ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
            ui.window.appendChild(ui.backgroundMusic);
            if (lib.config.turned_style == false) {
                ui.arena.classList.add('hide_turned');
            }
            if (lib.config.link_style2 != 'chain') {
                ui.arena.classList.add('nolink');
            }
            if (lib.config.show_name == false) {
                ui.arena.classList.add('hide_name');
            }
            if (lib.config.change_skin_auto != 'off') {
                _status.skintimeout = setTimeout(ui.click.autoskin, parseInt(lib.config.change_skin_auto));
            }
            if (lib.config.border_style && lib.config.border_style.indexOf('dragon_') == 0) {
                ui.arena.dataset.framedecoration = lib.config.border_style.slice(7);
            }

            ui.gameinfo = ui.create.div('#time', ui.window);

            ui.arenalog = ui.create.div('#arenalog', ui.arena);
            if (lib.config.show_log == 'off') {
                ui.arenalog.style.display = 'none';
            }
            else {
                ui.arenalog.dataset.position = lib.config.show_log;
            }
            ui.historybar = ui.create.div('#historybar.shadowed', ui.window);
            lib.setScroll(ui.historybar);

            ui.roundmenu = ui.create.div('#roundmenu.roundarenabutton.menubutton.round', ui.arena);
            ui.roundmenu._position = [180, 210];
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);

            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);

            ui.create.div(ui.roundmenu);
            ui.create.div(ui.roundmenu);

            ui.create.div(ui.roundmenu);

            if (lib.config.show_time2) {
                ui.roundmenu.classList.add('clock');
            }
            ui.roundmenu.dataset.watchface = lib.config.watchface || 'none';
            if (get.is.phoneLayout()) {
                if (lib.config.show_time3) {
                    ui.time3 = ui.create.div('.touchinfo.left', ui.window);
                }
                ui.cardPileNumber = ui.create.div('.touchinfo.right', ui.window);
            }
            else {
                if (lib.config.show_time3) {
                    ui.time3 = ui.create.div(ui.gameinfo);
                }
                ui.cardPileNumber = ui.create.div(ui.gameinfo);
            }
            if (!lib.config.show_cardpile_number) {
                ui.cardPileNumber.style.display = 'none';
            }
            if (ui.time3) {
                ui.time3.starttime = get.utc();
                ui.time3.interval = setInterval(function () {
                    var num = Math.round((get.utc() - ui.time3.starttime) / 1000);
                    if (num >= 3600) {
                        var num1 = Math.floor(num / 3600);
                        var num2 = Math.floor((num - num1 * 3600) / 60);
                        if (num2 < 10) {
                            num2 = '0' + num2.toString();
                        }
                        var num3 = num - num1 * 3600 - parseInt(num2) * 60;
                        if (num3 < 10) {
                            num3 = '0' + num3.toString();
                        }
                        ui.time3.innerHTML = num1 + ':' + num2 + ':' + num3;
                    }
                    else {
                        var num1 = Math.floor(num / 60);
                        var num2 = num - num1 * 60;
                        if (num2 < 10) {
                            num2 = '0' + num2.toString();
                        }
                        ui.time3.innerHTML = num1 + ':' + num2;
                    }
                }, 1000);
            }
            if (get.is.nomenu()) {
                if (!['menu', 'system'].contains(lib.config.round_menu_func)) {
                    lib.config.round_menu_func = 'system';
                }
            }
            else if (!lib.config.show_round_menu) {
                ui.roundmenu.style.display = 'none';
            }

            var resetround = function (e) {
                _status.draggingroundmenu = false;
                ui.roundmenu.style.transform = '';
                ui.roundmenu._dragtransform = [0, 0];
                ui.roundmenu.style.transition = 'all 0.3s';
                delete ui.roundmenu._dragtouches;
                delete ui.roundmenu._dragorigin;
                delete ui.roundmenu._dragorigintransform;
                setTimeout(function () {
                    ui.roundmenu.style.transition = '';
                }, 500);
                game.saveConfig('roundmenu_transform', [0, 0]);
                if (e) e.stopPropagation();
                return false;
            };
            ui.click.resetround = resetround;
            if (lib.config.touchscreen) {
                ui.roundmenu.addEventListener('touchstart', function (e) {
                    _status.draggingroundmenu = true;
                    ui.roundmenu._dragorigin = {
                        clientX: e.touches[0].clientX,
                        clientY: e.touches[0].clientY,
                    };
                    if (!ui.roundmenu._dragtransform) {
                        ui.roundmenu._dragtransform = [0, 0];
                    }
                    ui.roundmenu._dragorigintransform = ui.roundmenu._dragtransform.slice(0);
                    ui.roundmenu._resetTimeout = setTimeout(function () {
                        resetround();
                        delete ui.roundmenu._resetTimeout;
                    }, 1000);
                });
            }
            else {
                ui.roundmenu.oncontextmenu = resetround;
            }
            if (!lib.config.remember_round_button) {
                game.saveConfig('roundmenu_transform');
            }
            if (lib.config.roundmenu_transform) {
                var translate = lib.config.roundmenu_transform;
                ui.roundmenu._dragtransform = translate;
                ui.roundmenu.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px)';
                ui.click.checkroundtranslate();
            }
            if (get.is.phoneLayout()) {
                ui.arena.classList.add('phone');
            }

            ui.sidebar = ui.create.div('#sidebar');
            ui.sidebar3 = ui.create.div('#sidebar3');
            ui.canvas = document.createElement('canvas');

            ui.arena.appendChild(ui.canvas);
            ui.canvas.id = 'canvas';
            ui.ctx = ui.canvas.getContext('2d');

            ui.sidebar.ontouchstart = ui.click.touchStart;
            ui.sidebar.ontouchmove = ui.click.touchScroll;
            ui.sidebar.style.WebkitOverflowScrolling = 'touch';

            var zoom;
            switch (lib.config.ui_zoom) {
                case 'esmall': zoom = 0.8; break;
                case 'vsmall': zoom = 0.9; break;
                case 'small': zoom = 0.93; break;
                case 'big': zoom = 1.05; break;
                case 'vbig': zoom = 1.1; break;
                case 'ebig': zoom = 1.2; break;
                default: zoom = 1;
            }
            game.documentZoom = game.deviceZoom * zoom;
            if (zoom != 1) {
                ui.updatez();
            }

            ui.system1 = ui.create.div('#system1', ui.system);
            ui.system2 = ui.create.div('#system2', ui.system);

            ui.replay = ui.create.system('重来', game.reload, true);
            ui.replay.id = 'restartbutton';
            ui.config2 = ui.create.system('选项', ui.click.config);
            ui.pause = ui.create.system('暂停', ui.click.pause);
            ui.pause.id = 'pausebutton';
            if (!_status.video) {
                ui.pause.hide();
            }
            if (!lib.config.touchscreen) {
                lib.setPopped(ui.pause, ui.click.pausehistory, 220, 400, null, true);
            }
            if (!lib.config.show_pause) {
                ui.pause.style.display = 'none';
            }
            ui.cardPileButton = ui.create.system('牌堆', null, true);
            ui.cardPileButton.style.display = 'none';
            lib.setPopped(ui.cardPileButton, ui.click.cardPileButton, 220);
            ui.wuxie = ui.create.system('不询问无懈', ui.click.wuxie, true);
            if (!lib.config.touchscreen) {
                lib.setPopped(ui.config2, ui.click.pauseconfig, 170);
            }
            ui.auto = ui.create.system('托管', ui.click.auto);
            if (!game.syncMenu) {
                ui.config2.classList.add('hidden');
                ui.config2.style.transition = 'all 0.5s';
                ui.roundmenu.classList.add('transparent2');

                ui.auto.style.opacity = 0.5;
                ui.auto.style.transition = 'all 0.5s';
                lib.onfree.push(function () {
                    ui.auto.style.opacity = '';
                    setTimeout(function () {
                        ui.auto.style.transition = '';
                    }, 500);
                });
            }
            ui.auto.id = 'autobutton';
            ui.autonode = ui.create.div('#autonode', '<div>托管中</div>', ui.arena);
            ui.autonode.listen(ui.click.auto);
            if (lib.config.mode == 'connect') {
                ui.auto.hide();
                ui.pause.hide();
            }

            if (lib.forcehide) {
                if (lib.forcehide.contains('replay')) ui.replay.classList.add('forcehide');
                if (lib.forcehide.contains('auto')) ui.auto.classList.add('forcehide');
                if (lib.forcehide.contains('pause')) ui.pause.classList.add('forcehide');
                if (lib.forcehide.contains('wuxie')) ui.wuxie.classList.add('forcehide');
                if (lib.forcehide.contains('cardPileButton')) ui.cardPileButton.classList.add('forcehide');
            }
            ui.volumn = ui.create.system('音量');
            lib.setPopped(ui.volumn, ui.click.volumn, 200);
            // if(lib.config.show_pause) ui.auto.style.marginLeft='10px';
            if (!lib.config.show_volumn) {
                ui.volumn.style.display = 'none';
            }
            if (!lib.config.show_auto) {
                ui.auto.style.display = 'none';
            }
            if (!lib.config.show_wuxie) {
                ui.wuxie.style.display = 'none';
            }
            // if(!lib.config.show_cardpile||_status.connectMode){
            //     ui.cardPileButton.style.display='none';
            // }

            ui.sortCard = ui.create.system('整理手牌', function () {
                if (!game.me) return;
                var hs = game.me.getCards('h');
                if (!hs.length) return;
                game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
                for (var i = 0; i < hs.length; i++) {
                    hs[i].goto(ui.special);
                }
                hs.sort(function (b, a) {
                    if (a.name != b.name) return lib.sort.card(a.name, b.name);
                    else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
                    else return a.number - b.number;
                });
                game.me.directgain(hs, false);
            });
            if (!lib.config.show_sortcard) {
                ui.sortCard.style.display = 'none';
            }
            if (lib.config.mode != 'yindao') {
                ui.playerids = ui.create.system('显示身份', function () {
                    if (game.showIdentity) {
                        game.showIdentity();
                        _status.identityShown = true;
                    }
                }, true);
                if (!lib.config.show_playerids || !game.showIdentity) {
                    ui.playerids.style.display = 'none';
                }
            }
            if (!lib.config.show_replay) {
                ui.replay.style.display = 'none';
            }
            ui.control = ui.create.div('#control', ui.arena).animate('nozoom');
            ui.cardPile = ui.create.div('#cardPile');
            ui.discardPile = ui.create.div('#discardPile');
            ui.special = ui.create.div('#special');
            ui.ordering = ui.create.div('#ordering');
            ui.dialogs = [];
            ui.controls = [];
            ui.style = {};

            ui.time = ui.create.div(ui.gameinfo);
            var timeInterval = function () {
                var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                if (lib.config.watchface == 'simple') {
                    ui.roundmenu.childNodes[13].style.transform = 'rotate(' + get.round((hours + 9) * 30, 2) + 'deg)';
                }
                else {
                    ui.roundmenu.childNodes[13].style.transform = 'rotate(' + get.round((hours + minutes / 60 + 9) * 30, 2) + 'deg)';
                }
                ui.roundmenu.childNodes[12].style.transform = 'rotate(' + (minutes + 45) * 6 + 'deg)';
                if (minutes < 10) {
                    minutes = '0' + minutes.toString();
                }
                ui.time.innerHTML = hours + ':' + minutes;
            };
            _status.timeInterval = setInterval(timeInterval, 30000);
            timeInterval();
            if (!lib.config.show_time) {
                ui.time.style.display = 'none';
            }

            ui.timer = ui.create.div('.skillbar.shadowed.playerbg.hidden');
            ui.timer.id = 'timer';
            ui.create.div('.skillbarshadow', ui.timer);
            ui.create.div('.skillbarfill', ui.timer);
            ui.timer.fillnode = ui.create.div(ui.timer.lastChild);
            ui.timer.popnode = ui.create.div('.skillbartext', ui.timer);
            ui.timer.popnode.style.opacity = 1;
            ui.timer.position = 4;
            ui.timer.style.zIndex = 5;
            ui.timer.set = function (text, percentage) {
                if (typeof text == 'string' || typeof text == 'number') {
                    ui.timer.popnode.innerHTML = text;
                }
                ui.timer.fillnode.style.top = ((1 - percentage) * 100) + '%';
            }
            var setTimerPosition = function (e) {
                this.position++;
                if (this.position > 4) {
                    this.position = 1;
                }
                var left1 = '180px';
                var left2 = 'calc(100% - 245px)';
                var top1 = '210px';
                var top2 = 'calc(100% - 245px)';
                if (game.layout == 'default') {
                    left1 = '265px';
                    top1 = '160px';
                    left2 = 'calc(100% - 330px)';
                    top2 = 'calc(100% - 235px)';
                }
                if (this.position == 1 || this.position == 2) {
                    this.style.top = top2;
                }
                else {
                    this.style.top = top1;
                }
                if (this.position == 1 || this.position == 4) {
                    this.style.left = left2;
                }
                else {
                    this.style.left = left1;
                }
            }
            ui.timer.listen(setTimerPosition);

            ui.shortcut = ui.create.div('#shortcut.hidden', ui.window);
            ui.shortcut.listen(ui.click.shortcut);
            ui.create.div(ui.shortcut, function (e) { e.stopPropagation() });
            ui.create.div('.menubutton.round', '<span>重来</span>', ui.shortcut, game.reload).dataset.position = 1;
            ui.create.div('.menubutton.round', '<span>退出</span>', ui.shortcut, game.exit).dataset.position = 3;
            ui.create.div('.menubutton.round', '<span>记录</span>', ui.shortcut, ui.click.pause).dataset.position = 4;
            ui.shortcut.autobutton = ui.create.div('.menubutton.round', '<span>托管</span>', ui.shortcut, ui.click.auto);
            ui.shortcut.autobutton.dataset.position = 2;
            ui.favmodelist = ui.create.div('.favmodelist', ui.shortcut);
            ui.favmodelist.update = function () {
                this.innerHTML = '';
                var num = Math.min(6, lib.config.favouriteMode.length);
                for (var i = 0; i < num; i++) {
                    this.add(lib.config.favouriteMode[i], i);
                }
                var mode = get.mode();
                if (typeof get.config(mode + '_mode') == 'string') {
                    mode += '|' + get.config(mode + '_mode');
                }
                if (lib.config.favouriteMode.contains(mode)) {
                    ui.favmode.classList.add('glow');
                }
                else {
                    ui.favmode.classList.remove('glow');
                }
            };
            ui.favmodelist.add = function (name, index) {
                var info = name.split('|');
                var mode = info[0];
                var submode = info[1];
                var node = ui.create.div('.menubutton.large', this);
                var num = Math.min(6, lib.config.favouriteMode.length);
                node.dataset.type = num % 2 == 0 ? 'even' : 'odd';
                node.dataset.position = index;
                var str = lib.translate[name] || lib.translate[mode] || '';
                if (str.length == 2) {
                    str += '模式';
                }
                node.innerHTML = str;
                node.listen(function () {
                    game.saveConfig('mode', mode);
                    if (submode) {
                        game.saveConfig(mode + '_mode', submode, mode);
                    }
                    game.reload();
                });
            };
            ui.favmode = ui.create.system('收藏', function () {
                var mode = get.mode();
                if (typeof _status.mode == 'string') {
                    mode += '|' + _status.mode;
                }
                if (this.classList.contains('glow')) {
                    this.classList.remove('glow');
                    lib.config.favouriteMode.remove(mode);
                }
                else {
                    this.classList.add('glow');
                    lib.config.favouriteMode.add(mode);
                }
                game.saveConfig('favouriteMode', lib.config.favouriteMode);
                ui.favmodelist.update();
                _status.clicked = true;
            });
            ui.favmode.style.display = 'none';
            ui.favmodelist.update();
            // ui.create.div('.menubutton.round','<span>菜单</span>',ui.shortcut,ui.click.config).dataset.position=5;


            if (_status.connectMode) {
                ui.playerids.remove();
                ui.pause.innerHTML = '记录';
            }
            setTimerPosition.call(ui.timer);
            ui.arena.appendChild(ui.timer);

            if (!game.syncMenu) {
                lib.onfree.push(function () {
                    ui.create.menu();
                    ui.config2.classList.remove('hidden');
                    ui.roundmenu.classList.remove('transparent2');
                    setTimeout(function () {
                        ui.config2.style.transition = '';
                    }, 500);
                });
            }
            else {
                ui.create.menu();
            }

            lib.status.date = new Date();
            lib.status.dateDelayed = 0;

            while (lib.arenaReady.length) {
                (lib.arenaReady.shift())();
            }
            delete lib.arenaReady;
            if (lib.config.auto_check_update) {
                setTimeout(() => {
                    game.checkForUpdate(false);
                }, 3000);
            }
            if (!lib.config.asset_version) {
                lib.onfree.push(function () {
                    setTimeout(() => {
                        if (!game.download) {
                            game.saveConfig('asset_version', '无');
                        }
                        else {
                            var func = () => {
                                if (confirm('是否下载图片和字体素材？（约275MB）')) {
                                    if (!ui.arena.classList.contains('menupaused')) {
                                        ui.click.configMenu();
                                        ui.click.menuTab('其它');
                                    }
                                    setTimeout(game.checkForAssetUpdate, 500);
                                }
                                else {
                                    game.saveConfig('asset_version', '无');
                                }
                            };
                            if (_status.new_tutorial) {
                                _status.new_tutorial = func;
                            }
                            else {
                                func();
                            }
                        }
                    }, 3000);
                });
            }
            if (localStorage.getItem(lib.configprefix + 'playback')) {
                setTimeout(lib.init.onfree);
            }

            if (lib.config.test_game) {
                ui.window.classList.add('testing');
                lib.config.game_speed = 'vfast';
                lib.config.low_performance = true;
                lib.config.animation = false;
                _status.auto = true;
                ui.auto.classList.add('glow');
                setTimeout(function () {
                    var node = ui.create.pause().animate('start');
                    node.appendChild(ui.sidebar);
                    node.firstChild.innerHTML = '正在测试';
                    node.removeEventListener('click', ui.click.resume);
                }, 500);
            }
        },
        system: function (str, func, right, before) {
            var parent = right ? ui.system2 : ui.system1;
            var node = ui.create.div();
            if (before) {
                parent.insertBefore(node, parent.firstChild);
            }
            else {
                parent.appendChild(node);
            }
            let systemIconMap = {
                '选项': `<ion-icon name="settings-outline"></ion-icon>`,
                '暂停': `<ion-icon name="pause-circle-outline"></ion-icon>`,
                '托管': `<ion-icon name="play-forward-circle-outline"></ion-icon>`,
                '音量': `<ion-icon name="musical-notes-outline"></ion-icon>`,
                '整理手牌': `<ion-icon name="server-outline"></ion-icon>`,
                '牌堆': `<ion-icon name="albums-outline"></ion-icon>`,
            }
            node.innerHTML = (systemIconMap[str] || '') + str;
            // console.log(node.innerHTML)
            if (func) {
                node.listen(func);
            }
            if (true || '按钮效果') {
                node.addEventListener(lib.config.touchscreen ? 'touchstart' : 'mousedown', function (e) {
                    if (!node.classList.contains('hidden')) node.classList.add('pressdown');
                });
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function (e) {
                    node.classList.remove('pressdown');
                });
                node.addEventListener(lib.config.touchscreen ? 'touchmove' : 'mousemove', function (e) {
                    node.classList.remove('pressdown');
                });
            }
            return node;
        },
        pause: function () {
            if (_status.pausing) return;
            ui.click.shortcut(false);
            var node = ui.create.div(".pausedbg", ui.window);
            _status.pausing = true;
            setTimeout(function () {
                _status.pausing = false;
            }, 500);
            if (lib.config.touchscreen) {
                setTimeout(function () {
                    node.addEventListener('touchend', ui.click.resume);
                }, 500);
            }
            else {
                node.addEventListener('click', ui.click.resume);
            }
            if (!lib.config.touchscreen) {
                node.oncontextmenu = ui.click.resume;
            }

            var node2 = ui.create.div(node);
            if (_status.connectMode) {
                node2.innerHTML = '';
            }
            else {
                node2.innerHTML = '已暂停';
            }

            // node2.listen(function(){
            //     _status.clicked=true;
            //     if(ui.sidebar.classList.contains('hidden')){
            //         ui.sidebar.show();
            //         ui.sidebar3.show();
            //     }
            //     else{
            //         ui.sidebar.hide();
            //         ui.sidebar3.hide();
            //     }
            // });
            return node;
        },
        prebutton: function (item, type, position, noclick) {
            var node = ui.create.div(position);
            node.style.display = 'none';
            node.link = item;
            node.activate = function () {
                ui.create.button(item, type, position, noclick, node);
                delete node.activate;
            }
            _status.prebutton.push(node);
            return node;
        },
        /**
         * 生成一个按钮
         * @function
         * @param {!Object} item 按钮link指向的物件
         * @param {!string} type 按钮类型（'blank'空按钮；'card'卡牌；'vcard'虚拟卡牌
         * @param {!HTMLElement} position 按钮添加的位置，参考{@link ui.create.div}的父元素
         * @param {?boolean} noclick 按钮是否可以被点击
         * @returns {HTMLDivElement} 返回生成的生成一个按钮
         */
        button: function (item, type, position, noclick, node) {
            switch (type) {
                case 'blank':
                    node = ui.create.div('.button.card', position);
                    node.link = item;
                    break;

                case 'card':
                    if (typeof item.copy == 'function') {
                        node = item.copy(false);
                    }
                    else {
                        node = item.cloneNode(true);
                    }
                    node.classList.add('button');
                    if (position) position.appendChild(node);
                    node.link = item;
                    if (item.style.backgroundImage) {
                        node.style.backgroundImage = item.style.backgroundImage;
                        node.style.backgroundSize = 'cover';
                    }
                    if (item.style.color) {
                        node.style.color = item.style.color;
                    }
                    if (item.nature) {
                        node.classList.add(item.nature);
                    }
                    if (!noclick) {
                        lib.setIntro(node);
                    }
                    if (get.position(item) == 'j' && item.viewAs && item.viewAs != item.name && lib.config.cardtempname != 'off') {
                        node._tempName = ui.create.div('.tempname', node);
                        var tempname = get.translation(item.viewAs);
                        node._tempName.dataset.nature = 'wood';
                        node._tempName.innerHTML = lib.config.cardtempname == 'default' ? get.verticalStr(tempname) : tempname;
                        node._tempName.tempname = tempname;
                    }
                    break;

                case 'vcard':
                    if (typeof item == 'string') {
                        item = [get.type(item), '', item];
                    }
                    node = ui.create.card(position, 'noclick', noclick);
                    node.classList.add('button');
                    node.init(item);
                    node.link = item;
                    break;

                case 'character': case 'player': case 'characterx':
                    if (node) {
                        node.classList.add('button');
                        node.classList.add('character');
                        node.style.display = '';
                    }
                    else {
                        node = ui.create.div('.button.character', position);
                    }
                    node._link = item;
                    if (_status.noReplaceCharacter && type == 'characterx') type = 'character';
                    if (type == 'characterx') {
                        if (lib.characterReplace[item] && lib.characterReplace[item].length) item = lib.characterReplace[item][0];
                    }
                    node.link = item;
                    if (type == 'character' || type == 'characterx') {
                        var double = get.is.double(node._link, true);
                        if (double) node._changeGroup = true;
                        if (type == 'characterx' && lib.characterReplace[node._link] && lib.characterReplace[node._link].length > 1) node._replaceButton = true;
                        var func = function (node, item) {
                            node.setBackground(item, 'character');
                            if (node.node) {
                                node.node.name.remove();
                                node.node.hp.remove();
                                node.node.group.remove();
                                node.node.intro.remove();
                                if (node.node.replaceButton) node.node.replaceButton.remove();
                            }
                            node.node = {
                                name: ui.create.div('.name', node),
                                hp: ui.create.div('.hp', node),
                                group: ui.create.div('.identity', node),
                                intro: ui.create.div('.intro', node),
                            };
                            var infoitem = lib.character[item];
                            if (!infoitem) {
                                for (var itemx in lib.characterPack) {
                                    if (lib.characterPack[itemx][item]) {
                                        infoitem = lib.characterPack[itemx][item]; break;
                                    }
                                }
                            }
                            node.node.name.innerHTML = get.slimName(item);

                            if (lib.config.buttoncharacter_style == 'default' || lib.config.buttoncharacter_style == 'simple') {
                                if (lib.config.buttoncharacter_style == 'simple') {
                                    node.node.group.style.display = 'none';
                                }
                                node.node.name.dataset.nature = get.groupnature(infoitem[1]);
                                node.node.group.dataset.nature = get.groupnature(infoitem[1], 'raw');
                                node.classList.add('newstyle');
                                if (double && double.length) {
                                    node.node.name.dataset.nature = get.groupnature(double[0]);
                                    node.node.group.dataset.nature = get.groupnature(double[double.length == 2 ? 1 : 0]);
                                }
                                ui.create.div(node.node.hp);
                                var textnode = ui.create.div('.text', get.numStr(infoitem[2]), node.node.hp);
                                if (infoitem[2] == 0) {
                                    node.node.hp.hide();
                                }
                                else if (get.infoHp(infoitem[2]) <= 3) {
                                    node.node.hp.dataset.condition = 'mid';
                                }
                                else {
                                    node.node.hp.dataset.condition = 'high';
                                }
                            }
                            else {
                                var hp = get.infoHp(infoitem[2]);
                                var maxHp = get.infoMaxHp(infoitem[2]);
                                if (maxHp > 14 || hp < 0) {
                                    if (typeof infoitem[2] == 'string') node.node.hp.innerHTML = infoitem[2];
                                    else node.node.hp.innerHTML = get.numStr(infoitem[2]);
                                    node.node.hp.classList.add('text');
                                }
                                else {
                                    for (var i = 0; i < maxHp; i++) {
                                        var next = ui.create.div('', node.node.hp);
                                        if (i >= hp) next.classList.add('exclude');
                                    }
                                }
                            }
                            if (node.node.hp.childNodes.length == 0) {
                                node.node.name.style.top = '8px';
                            }
                            if (/^[A-z\d\s\.]+$/.test(node.node.name.innerHTML)) {
                                node.node.name.classList.add('English');
                            }
                            else {
                                let nameLength = node.node.name.querySelectorAll('br').length
                                if (nameLength <= 1) {
                                    node.node.name.classList.add('short');
                                }
                                else if (nameLength == 2) {
                                    node.node.name.classList.add('lowshort');
                                }
                                else if (nameLength == 4 || nameLength == 5) {
                                    node.node.name.classList.add('lowlong');
                                }
                                else if (nameLength >= 6) {
                                    node.node.name.classList.add('long');
                                }
                                if (nameLength >= 4 && lib.config.buttoncharacter_style == 'old') {
                                    node.addEventListener('mouseenter', ui.click.buttonnameenter);
                                    node.addEventListener('mouseleave', ui.click.buttonnameleave);
                                }
                            }
                            node.node.intro.innerHTML = lib.config.intro;
                            if (!noclick) {
                                lib.setIntro(node);
                            }
                            if (infoitem[1]) {
                                if (double) {
                                    var str = '<div>';
                                    if (double.length <= 3) {
                                        for (let i of double) {
                                            str += get.translation(i);
                                            if (double.indexOf(i) !== double.length - 1) str += '</div><div>'
                                        }
                                    }
                                    else str += get.translation(double[0]);
                                    str += '</div>';
                                    node.node.group.innerHTML = str;
                                }
                                else node.node.group.innerHTML = '<div>' + get.translation(infoitem[1]) + '</div>';
                                node.node.group.style.backgroundColor = get.translation(infoitem[1] + 'Color');
                            }
                            else {
                                node.node.group.style.display = 'none';
                            }
                            if (node._replaceButton) {
                                var intro = ui.create.div('.button.replaceButton', node);
                                node.node.replaceButton = intro;
                                intro.innerHTML = '切换';
                                intro._node = node;
                                intro.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                    _status.tempNoButton = true;
                                    var node = this._node;
                                    var list = lib.characterReplace[node._link];
                                    var link = node.link;
                                    var index = list.indexOf(link);
                                    if (index == list.length - 1) index = 0;
                                    else index++;
                                    link = list[index];
                                    node.link = link;
                                    node.refresh(node, link);
                                    setTimeout(function () {
                                        delete _status.tempNoButton;
                                    }, 200);
                                });
                            }
                        };
                        node.refresh = func;
                        node.refresh(node, item);
                    }
                    else {
                        node.node = {
                            name: ui.create.div('.name', node),
                            intro: ui.create.div('.intro', node)
                        }
                        if (item.name && item.name.indexOf('unknown') == 0) {
                            if (item.node && item.node.name_seat) {
                                node.classList.add('cardbg');
                                ui.create.div('.avatar_name', node, get.translation(item.name));
                            }
                            else {
                                node.setBackground(item.name1, 'character');
                            }
                        }
                        else {
                            node.setBackground(item.name, 'character');
                        }
                    }
                    break;

                case 'text':
                    node = ui.create.div('.button.text', position);
                    node.link = item;
                    node.innerHTML = item;
                    break;

                case 'textButton':
                    node = ui.create.div('.caption', position);
                    node.link = item;
                    node.innerHTML = item;
                    break;
            }
            if (!noclick) {
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
            }
            else {
                node.classList.add('noclick');
                if (node.querySelector('.intro')) {
                    node.querySelector('.intro').remove();
                }
            }
            for (var i in lib.element.button) {
                node[i] = lib.element.button[i];
            }
            return node;
        },
        /**
         * 生成一组按钮
         * @function
         * @param {!Array} list 按钮列表
         * @param {!string} type 按钮类型
         * @returns {HTMLDivElement} 返回生成的一组按钮
         * @see {@link ui.create.button}
         */
        buttons: function (list, type, position, noclick, zoom) {
            var buttons = [];
            var pre = (type.slice(0, 3) == 'pre');
            if (pre) {
                if (!_status.prebutton) {
                    _status.prebutton = [];
                    lib.onfree.push(function () {
                        for (var i = 0; i < _status.prebutton.length; i++) {
                            if (_status.prebutton[i].activate) {
                                _status.prebutton[i].activate();
                            }
                        }
                        delete _status.prebutton;
                    });
                }
            }
            for (var i = 0; i < list.length; i++) {
                if (pre) {
                    buttons.push(ui.create.prebutton(list[i], type.slice(3), position, noclick));
                }
                else {
                    buttons.push(ui.create.button(list[i], type, position, noclick));
                }
            }
            return buttons;
        },
        /**
         * 创建角色
         * @function
         * @param {HTMLDivElement} parent 父节点
         * @param {?boolean} noclick 是否可点击，如果为true，表示**不可点击**；如果为false或未指定，表示**可点击**
         */
        player: function (position, noclick) {
            /**
             * 角色对象
             * 创建角色对象，见{@link ui.create.player}
             * @namespace GameCores.GameObjects.Player
             * @mixes lib.element.player
             */
            var node = ui.create.div('.player', position);
            /**
             * 角色的子节点
             * @name node
             * @memberof GameCores.GameObjects.Player
             * @property {HTMLDivElement} avatar (主将)头像
             * @property {HTMLDivElement} avatar2 副将头像
             * @property {HTMLDivElement} turnover 翻面
             * @property {HTMLDivElement} framebg 背景
             * @property {HTMLDivElement} intro 介绍
             * @property {HTMLDivElement} identity 身份
             * @property {HTMLDivElement} hp 当前血量
             * @property {HTMLDivElement} name (主将)姓名
             * @property {HTMLDivElement} name2 副将姓名
             * @property {HTMLDivElement} nameol 姓名OL
             * @property {HTMLDivElement} count 数量
             * @property {HTMLDivElement} equips 装备栏
             * @property {HTMLDivElement} judges 判定栏
             * @property {HTMLDivElement} marks 标记
             * @property {HTMLDivElement} chain 连环
             * @property {HTMLDivElement} handcards1 手牌1
             * @property {HTMLDivElement} handcards2 手牌2
             * @property {HTMLDivElement} action action
             * @property {HTMLDivElement} link 铁索(横置)
             */
            let displayer = ui.create.div('.displayer', node)
            let avatar = ui.create.div('.avatar', displayer, ui.click.avatar).hide()
            let avatar2 = ui.create.div('.avatar2', displayer, ui.click.avatar2).hide()
            node.node = {
                displayer,
                turnedover: ui.create.div('.turned', '<div>翻<br>面<div>', node),
                framebg: ui.create.div('.framebg', node),
                intro: ui.create.div('.intro', node),
                identity: ui.create.div('.identity', node),
                hp: ui.create.div('.hp', node),
                name: ui.create.div('.name', node),
                name2: ui.create.div('.name.name2', node),
                nameol: ui.create.div('.nameol', node),
                count: ui.create.div('.count', node).hide(),
                equips: ui.create.div('.equips', node).hide(),
                judges: ui.create.div('.judges', node),
                marks: ui.create.div('.marks', node),
                chain: ui.create.div('.chain', '<div></div>', node),
                handcards1: ui.create.div('.handcards'),
                handcards2: ui.create.div('.handcards'),
                expansions: ui.create.div('.expansions'),
            };
            node.node.expansions.display = 'none';
            avatar2.playerEle = avatar.playerEle = node
            var chainlength = game.layout == 'default' ? 64 : 40;
            for (var i = 0; i < chainlength; i++) {
                ui.create.div(node.node.chain.firstChild, '.cardbg').style.transform = 'translateX(' + (i * 5 - 5) + 'px)';
            }
            node.node = {
                ...node.node,
                avatar,
                avatar2,
                action: ui.create.div('.action', node.node.avatar)//特殊行动标识：在战棋模式中显示当前正在行动的角色与角色间距离
            }
            /**
             * 回合计数，初始为0，每回合开始则加1
             * @name phaseNumber
             * @type {!number}
             * @memberof GameCores.GameObjects.Player
             */
            node.phaseNumber = 0;
            /**
             * 事件跳过列表，如果一个事件e的事件名在该列表中存在X个，则接下来的X个事件e会被直接跳过，不执行；每跳过一个事件，列表中就会相应移除一个事件名
             * @name skipList
             * @type {!Array<string>}
             * @memberof GameCores.GameObjects.Player
             */
            node.skipList = [];
            /**
             * 技能列表
             * @name skills
             * @type {!Array<any>}
             * @memberof GameCores.GameObjects.player
             */
            node.skills = [];
            /**
             * ??
             * @name initedSkills
             * @type {!Array<any>}
             * @memberof GameCores.GameObjects.Player
             */
            node.initedSkills = [];
            node.additionalSkills = {};
            node.disabledSkills = {};
            node.hiddenSkills = [];
            node.awakenedSkills = [];
            node.forbiddenSkills = {};
            node.popups = [];
            node.damagepopups = [];
            node.judging = [];
            node.stat = [{ card: {}, skill: {} }];
            node.actionHistory = [JSON.parse(JSON.stringify({ ...lib.historyRecorder }))];
            node.tempSkills = {};
            let storage = {}
            node.$ = node.storage = storage;
            node.marks = {};
            node.ai = { friend: [], enemy: [], neutral: [], handcards: { global: [], source: [], viewed: [] } };
            node.queueCount = 0;
            node.outCount = 0;

            for (var i in lib.element.player) {
                node[i] = lib.element.player[i];
            }
            node.node.link = node.mark(' ', { mark: get.linkintro });
            node.node.link.firstChild.setBackgroundImage('image/card/tiesuo_mark.png')
            node.node.link.firstChild.style.backgroundSize = 'cover';
            ui.create.div(node.node.identity);//创建身份子div
            let addEL = (node, fun) => node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', fun)
            // addEL(node.node.hp,()=>{
            //    html2canvas(node.node.hp, {  
            //       allowTaint: true,  
            //       taintTest: false,  
            //       onrendered: function(canvas) {  
            //           canvas.id = "mycanvas";  
            //           //生成base64图片数据  
            //           var dataUrl = canvas.toDataURL();  
            //           var newImg = document.createElement("img");  
            //           newImg.src =  dataUrl;  
            //           document.body.appendChild(newImg);
            //       }
            //    })
            // })
            if (!noclick) {
                addEL(node, ui.click.target)
                addEL(node.node.identity, ui.click.identity)
                if (lib.config.touchscreen) {
                    node.addEventListener('touchstart', ui.click.playertouchstart);
                }
            }
            else node.noclick = true;

            return node;
        },
        connectPlayers: function (ip) {
            game.connectPlayers = [];
            for (var i = 0; i < 8; i++) {
                var player = ui.create.player(ui.window);
                player.dataset.position = i;
                player.classList.add('connect');
                game.connectPlayers.push(player);
                if (i >= lib.configOL.number) {
                    player.classList.add('unselectable2');
                }
            }

            var bar = ui.create.div(ui.window);
            bar.style.height = '20px';
            bar.style.width = '80%';
            bar.style.left = '10%';
            bar.style.top = 'calc(200% / 7 - 120px + 5px)';
            bar.style.textAlign = 'center';
            var ipbar = ui.create.div('.shadowed', ip, bar);
            ipbar.style.padding = '4px';
            ipbar.style.borderRadius = '2px';
            ipbar.style.position = 'relative';

            var button = ui.create.div('.menubutton.large.highlight.connectbutton.pointerdiv', game.online ? '退出联机' : '开始游戏', ui.window, function () {
                if (button.clicked) return;
                if (game.online) {
                    if (game.onlinezhu) {
                        game.send('startGame');
                    }
                    else {
                        game.saveConfig('tmp_owner_roomId');
                        game.saveConfig('tmp_user_roomId');
                        game.saveConfig('reconnect_info');
                        game.reload();
                    }
                }
                else {
                    var num = 0;
                    for (var i of game.connectPlayers) {
                        if (!i.nickname && !i.classList.contains('unselectable2')) num++;
                    }
                    // if (num >= lib.configOL.number - 1) {
                    //     alert('至少要有两名玩家才能开始游戏！');
                    //     return;
                    // }
                    game.resume();
                }
                button.delete();
                bar.delete();
                delete ui.connectStartButton;
                delete ui.connectStartBar;
                button.clicked = true;
            });

            ui.connectStartButton = button;
            ui.connectStartBar = bar;
        },
        players: function (num) {
            if (num === 0) {
                return;
            }
            if (num == undefined) num = lib.configOL.number;
            if (num == undefined) num = get.playerNumber();
            if (typeof num == 'string') {
                num = parseInt(num);
            }
            if (!num) num = 5;
            for (var i = 0; i < num; i++) {
                var player = ui.create.player().animate('start');
                game.players.push(player);
                player.dataset.position = i;
            }
            var players = game.players;
            for (var i = 0; i < players.length; i++) {
                if (i > 0) {
                    players[i].previous = players[i - 1];
                    players[i].previousSeat = players[i - 1];
                }
                if (i < players.length - 1) {
                    players[i].next = players[i + 1];
                    players[i].nextSeat = players[i + 1];
                }
            }
            players[0].previous = players[players.length - 1];
            players[0].previousSeat = players[players.length - 1];
            players[players.length - 1].next = players[0];
            players[players.length - 1].nextSeat = players[0];
            ui.arena.setNumber(num);
            for (var i = 0; i < num; i++) {
                ui.arena.appendChild(players[i]);
            }
            // ui.arena.classList.add('glass');
            // for(var i=0;i<num;i++){
            //     var bg=ui.create.div('.glassbg');
            //     var bg2=ui.create.div(bg);
            //     ui.create.div(bg);
            //     var rect=players[i].getBoundingClientRect();
            //     bg2.style.backgroundImage='url("image/background/huangtian_bg.jpg")';
            //     bg2.style.width=ui.window.offsetWidth+'px';
            //     bg2.style.height=ui.window.offsetHeight+'px';
            //     bg2.style.transform='translate('+(-rect.left)+'px,'+(-rect.top)+'px)';
            //     players[i].insertBefore(bg,players[i].firstChild);
            // }
            return players;
        },
        me: function (hasme) {
            ui.mebg = ui.create.div('#mebg', ui.arena);
            ui.me = ui.create.div('#me', ui.arena).animate('start');
            ui.handcards1Container = ui.create.div('#handcards1', ui.me);
            ui.handcards2Container = ui.create.div('#handcards2', ui.me);
            ui.arena.classList.remove('nome');
            if (lib.config.mousewheel && !lib.config.touchscreen) {
                ui.handcards1Container.onmousewheel = ui.click.mousewheel;
                ui.handcards2Container.onmousewheel = ui.click.mousewheel;
            }
            ui.handcards1Container.ontouchstart = ui.click.touchStart;
            ui.handcards2Container.ontouchstart = ui.click.touchStart;
            ui.handcards1Container.ontouchmove = ui.click.touchScroll;
            ui.handcards2Container.ontouchmove = ui.click.touchScroll;
            ui.handcards1Container.style.WebkitOverflowScrolling = 'touch';
            ui.handcards2Container.style.WebkitOverflowScrolling = 'touch';

            if (hasme && game.me) {
                ui.handcards1 = game.me.node.handcards1;
                ui.handcards2 = game.me.node.handcards2;
                ui.handcards1Container.appendChild(ui.handcards1);
                ui.handcards2Container.appendChild(ui.handcards2);
                // ui.updatehl();
            }
            else if (game.players.length) {
                game.me = game.players[0];
                ui.handcards1 = game.me.node.handcards1;
                ui.handcards2 = game.me.node.handcards2;
                ui.handcards1Container.appendChild(ui.handcards1);
                ui.handcards2Container.appendChild(ui.handcards2);
                // ui.updatehl();
            }
        },
        /**
         * 创建游戏牌对象
         * @param {HTMLDivElement} parent 父节点，即初始位置(手牌|牌堆|弃牌堆等) 
         * @param {?'noclick'} [noclick] 是否可点击，如果为'noclick'表示**不可点击**，如果为false或未指定，表示可点击
         * @param {?boolean} [nodialog] 是否可弹窗，如果为true表示**不可弹窗**，如果为false或未指定，表示可弹窗
         * @returns {!GameCores.GameObjects.Card} 创建的游戏牌对象
         */
        card: function (position, info, noclick) {
            /**
             * 游戏牌
             * @namespace GameCores.GameObjects.Card
             */
            var node = ui.create.div('.card', position);
            /**
             * @name node
             * @memberof GameCores.GameObjects.Card
             * @property {HTMLDivElement} image 图片
             * @property {HTMLDivElement} info 花色和点数信息
             * ```
             * info.innerHTML = "花色<span> </span>点数"
             * ```
             * @property {HTMLDivElement} name 
             */
            node.node = {
                displayer: ui.create.div('.displayer', node),
                image: ui.create.div('.image', node),
                info: ui.create.div('.info', node),
                name: ui.create.div('.name', node),
                name2: ui.create.div('.name2', node),
                background: ui.create.div('.background', node),
                intro: ui.create.div('.intro', node),
                range: ui.create.div('.range', node),
                gaintag: ui.create.div('.gaintag', node),
            }
            for (var i in lib.element.card) {
                node[i] = lib.element.card[i];
            }
            node.node.intro.innerHTML = lib.config.intro;
            if (!noclick) {
                lib.setIntro(node);
            }
            node.storage = {};
            node.vanishtag = [];
            node.gaintag = [];
            node._uncheck = [];
            if (info != 'noclick') {
                node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
                if (lib.config.touchscreen) {
                    node.addEventListener('touchstart', ui.click.cardtouchstart);
                    node.addEventListener('touchmove', ui.click.cardtouchmove);
                }
                if (lib.cardSelectObserver) {//?? [never used]
                    lib.cardSelectObserver.observe(node, { attributes: true });
                }
            }
            return node;
        },
        cardsAsync: function () {
            if (lib.onfree) {
                _status.waitingForCards = Array.from(arguments);
                lib.onfree.push(function () {
                    if (_status.waitingForCards) {
                        ui.create.cards.apply(ui.create, _status.waitingForCards);
                        delete _status.waitingForCards;
                    }
                });
            }
            else {
                ui.create.cards.apply(ui.create, arguments);
            }
        },
        cards: function (ordered) {
            if (_status.brawl) {
                if (_status.brawl.cardPile) {
                    lib.card.list = _status.brawl.cardPile(lib.card.list);
                }
                if (_status.brawl.orderedPile) {
                    ordered = true;
                }
            }
            if (!ordered) {
                lib.card.list.randomSort();
            }
            for (var i = 0; i < lib.card.list.length; i++) {
                if (lib.card[lib.card.list[i][2]]) {
                    if (!lib.card.list[i]._replaced) {
                        if (!_status.connectMode) {
                            if (lib.config.bannedcards.contains(lib.card.list[i][2])) continue;
                        }
                        else {
                            if (lib.configOL.protect_beginner && get.is.banForBeginner(lib.card.list[i][2])) continue;
                            if (lib.configOL.bannedcards.contains(lib.card.list[i][2])) continue;
                        }
                        if (game.bannedcards && game.bannedcards.contains(lib.card.list[i][2])) continue;
                    }
                    lib.inpile.add(lib.card.list[i][2]);
                    ui.create.card(ui.cardPile).init(lib.card.list[i]);
                }
            }
            lib.inpile.sort(lib.sort.card);
            for (var i in _status.cardtag) {
                if (!_status.cardtag[i].length) delete _status.cardtag[i];
            }
            game.broadcastAll(function (num, pile, top, cardtag) {
                if (ui.cardPileNumber) ui.cardPileNumber.innerHTML = '0轮 剩余牌: ' + num;
                lib.inpile = pile;
                _status.pileTop = top;
                _status.cardtag = cardtag;
            }, ui.cardPile.childNodes.length, lib.inpile, ui.cardPile.firstChild, _status.cardtag);
        },
    }
}