module.exports = {
   uiFun: (vkCore) => {
      let { game, ui, get, ai, lib, _status } = vkCore
      return {
         updates: [],
         thrown: [],
         touchlines: [],
         todiscard: {},
         /**
          * 立即应用缓存的更改，回流页面
          * @param {HTMLElement} node DOM节点
          */
         refresh: function (node) {
            void window.getComputedStyle(node, null).getPropertyValue("opacity");
         },
         /**
          * 创建UI
          * @namespace
          */
         create: {
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
            menu: function (connectMenu) {
               var menuTimeout = null;
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
                     ui.arena.classList.remove('menupaused');
                     ui.historybar.classList.remove('menupaused');
                     ui.window.classList.remove('touchinfohidden');
                     ui.config2.classList.remove('pressdown2');
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
                  if (connectMenu) {
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
                        ui.config2.classList.add('pressdown2');
                        ui.arena.classList.add('menupaused');
                        ui.historybar.classList.add('menupaused');
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
                  menux = createMenu(['开始', '选项', '武将', '卡牌', '扩展', '其它'], {
                     position: menuContainer, bar: 40
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

                  menux = createMenu(['模式', '武将', '卡牌'], {
                     position: menuContainer, bar: 123
                  });
                  menu = menux.menu;
               }
               var menuxpages = menux.pages.slice(0);

               var copyObj = get.copy;

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

               (function () {
                  if (connectMenu) return;
                  var start = menuxpages.shift();
                  var rightPane = start.lastChild;

                  var clickMode = function () {
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

                  var clickAutoSkill = function (bool) {
                     var name = this._link.config._name;
                     var list = lib.config.autoskilllist;
                     if (bool) {
                        list.remove(name);
                     }
                     else {
                        list.add(name);
                     }
                     game.saveConfig('autoskilllist', list);
                  };
                  var skilllistexpanded = game.expandSkills(lib.skilllist);
                  for (var i in lib.skill) {
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
                  var clickBanSkill = function (bool) {
                     var name = this._link.config._name;
                     var list = lib.config.forbidlist;
                     if (bool) {
                        list.remove(name);
                     }
                     else {
                        list.add(name);
                     }
                     game.saveConfig('forbidlist', list);
                  };
                  var forbid = lib.config.forbid;
                  if (!lib.config.forbidlist) {
                     game.saveConfig('forbidlist', []);
                  }
                  for (var i = 0; i < forbid.length; i++) {
                     var skip = false;
                     var str = '';
                     var str2 = '';
                     var str3 = '';
                     for (var j = 0; j < forbid[i].length; j++) {
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

                  var updateView = null;
                  var updateAppearence = null;
                  var createModeConfig = function (mode, position) {
                     var info = lib.configMenu[mode];
                     var page = ui.create.div('');
                     var node = ui.create.div('.menubutton.large', info.name, position, clickMode);
                     node.link = page;
                     node.mode = mode;
                     var map = {};
                     if (info.config) {
                        var hiddenNodes = [];
                        var autoskillNodes = [];
                        var banskillNodes = [];
                        var custombanskillNodes = [];
                        var banskill;

                        if (mode == 'skill') {
                           var autoskillexpanded = false;
                           var banskillexpanded = false;
                           ui.create.div('.config.more', '自动发动 <div>&gt;</div>', page, function () {
                              if (autoskillexpanded) {
                                 this.classList.remove('on');
                                 for (var k = 0; k < autoskillNodes.length; k++) {
                                    autoskillNodes[k].style.display = 'none';
                                 }
                              }
                              else {
                                 this.classList.add('on');
                                 for (var k = 0; k < autoskillNodes.length; k++) {
                                    autoskillNodes[k].style.display = '';
                                 }
                              }
                              autoskillexpanded = !autoskillexpanded;
                           });
                           banskill = ui.create.div('.config.more', '双将禁配 <div>&gt;</div>', page, function () {
                              if (banskillexpanded) {
                                 this.classList.remove('on');
                                 for (var k = 0; k < banskillNodes.length; k++) {
                                    banskillNodes[k].style.display = 'none';
                                 }
                              }
                              else {
                                 this.classList.add('on');
                                 for (var k = 0; k < banskillNodes.length; k++) {
                                    banskillNodes[k].style.display = '';
                                 }
                              }
                              banskillexpanded = !banskillexpanded;
                           });

                           var banskilladd = ui.create.div('.config.indent', '<span class="pointerdiv">添加...</span>', page, function () {
                              this.nextSibling.classList.toggle('hidden');
                           });
                           banskilladd.style.display = 'none';
                           banskillNodes.push(banskilladd);

                           var banskilladdNode = ui.create.div('.config.indent.hidden.banskilladd', page);
                           banskilladdNode.style.display = 'none';
                           banskillNodes.push(banskilladdNode);

                           var matchBanSkill = function (skills1, skills2) {
                              if (skills1.length != skills2.length) return false;
                              for (var i = 0; i < skills1.length; i++) {
                                 if (!skills2.contains(skills1[i])) return false;
                              }
                              return true;
                           }
                           var deleteCustomBanSkill = function () {
                              for (var i = 0; i < lib.config.customforbid.length; i++) {
                                 if (matchBanSkill(lib.config.customforbid[i], this.parentNode.link)) {
                                    lib.config.customforbid.splice(i--, 1);
                                    break;
                                 }
                              }
                              game.saveConfig('customforbid', lib.config.customforbid);
                              this.parentNode.remove();
                           }
                           var createCustomBanSkill = function (skills) {
                              var node = ui.create.div('.config.indent.toggle');
                              node.style.display = 'none';
                              node.link = skills;
                              banskillNodes.push(node);
                              custombanskillNodes.push(node);
                              var str = get.translation(skills[0]);
                              for (var i = 1; i < skills.length; i++) {
                                 str += '+' + get.translation(skills[i]);
                              }
                              node.innerHTML = str;
                              var span = document.createElement('span');
                              span.classList.add('cardpiledelete');
                              span.innerHTML = '删除';
                              span.onclick = deleteCustomBanSkill;
                              node.appendChild(span);
                              page.insertBefore(node, banskilladdNode.nextSibling);
                              return node;
                           };
                           for (var i = 0; i < lib.config.customforbid.length; i++) {
                              createCustomBanSkill(lib.config.customforbid[i]);
                           }
                           (function () {
                              var list = [];
                              for (var i in lib.character) {
                                 if (lib.character[i][3].length)
                                    list.push([i, lib.translate[i]]);
                              }

                              list.sort(function (a, b) {
                                 a = a[0]; b = b[0];
                                 var aa = a, bb = b;
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

                              var list2 = [];
                              var skills = lib.character[list[0][0]][3];
                              for (var i = 0; i < skills.length; i++) {
                                 list2.push([skills[i], lib.translate[skills[i]]]);
                              }

                              var selectname = ui.create.selectlist(list, list[0], banskilladdNode);
                              selectname.onchange = function () {
                                 var skills = lib.character[this.value][3];
                                 skillopt.innerHTML = '';
                                 for (var i = 0; i < skills.length; i++) {
                                    var option = document.createElement('option');
                                    option.value = skills[i];
                                    option.innerHTML = lib.translate[skills[i]];
                                    skillopt.appendChild(option);
                                 }
                              };
                              selectname.style.maxWidth = '85px';
                              var skillopt = ui.create.selectlist(list2, list2[0], banskilladdNode);

                              var span = document.createElement('span');
                              span.innerHTML = '＋';
                              banskilladdNode.appendChild(span);
                              var br = document.createElement('br');
                              banskilladdNode.appendChild(br);

                              var selectname2 = ui.create.selectlist(list, list[0], banskilladdNode);
                              selectname2.onchange = function () {
                                 var skills = lib.character[this.value][3];
                                 skillopt2.innerHTML = '';
                                 for (var i = 0; i < skills.length; i++) {
                                    var option = document.createElement('option');
                                    option.value = skills[i];
                                    option.innerHTML = lib.translate[skills[i]];
                                    skillopt2.appendChild(option);
                                 }
                              };
                              selectname2.style.maxWidth = '85px';
                              var skillopt2 = ui.create.selectlist(list2, list2[0], banskilladdNode);
                              var confirmbutton = document.createElement('button');
                              confirmbutton.innerHTML = '确定';
                              banskilladdNode.appendChild(confirmbutton);

                              confirmbutton.onclick = function () {
                                 var skills = [skillopt.value, skillopt2.value];
                                 if (skills[0] == skills[1]) {
                                    skills.shift();
                                 }
                                 if (!lib.config.customforbid) return;
                                 for (var i = 0; i < lib.config.customforbid.length; i++) {
                                    if (matchBanSkill(lib.config.customforbid[i], skills)) return;
                                 }
                                 lib.config.customforbid.push(skills);
                                 game.saveConfig('customforbid', lib.config.customforbid);
                                 createCustomBanSkill(skills).style.display = '';
                              }
                           }());
                           page.style.paddingBottom = '10px';
                        }
                        var config = lib.config;
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
                        for (var j in info.config) {
                           if (j === 'update') {
                              continue;
                           }
                           var cfg = copyObj(info.config[j]);
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
                                 var cfg = this._link.config;
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
                           var cfgnode = createConfig(cfg);
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
                                 var fileToLoad = this.previousSibling.files[0];
                                 if (fileToLoad) {
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                       var data = fileLoadedEvent.target.result;
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
                                          var noname_inited = localStorage.getItem('noname_inited');
                                          var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                                          localStorage.clear();
                                          if (noname_inited) {
                                             localStorage.setItem('noname_inited', noname_inited);
                                          }
                                          if (onlineKey) {
                                             localStorage.setItem(lib.configprefix + 'key', onlineKey);
                                          }
                                          for (var i in data) {
                                             localStorage.setItem(i, data[i]);
                                          }
                                       }
                                       else {
                                          for (var i in data.config) {
                                             game.putDB('config', i, data.config[i]);
                                             lib.config[i] = data.config[i];
                                          }
                                          for (var i in data.data) {
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
                                 var fileToLoad = this.previousSibling.files[0];
                                 if (fileToLoad) {
                                    if (!lib.config.customBackgroundMusic) lib.config.customBackgroundMusic = {};
                                    var name = fileToLoad.name;
                                    if (name.indexOf('.') != -1) {
                                       name = name.slice(0, name.indexOf('.'));
                                    }
                                    var link = (game.writeFile ? 'cdv_' : 'custom_') + name;
                                    if (lib.config.customBackgroundMusic[link]) {
                                       if (!confirm('已经存在文件名称相同的背景音乐，是否仍然要继续导入？')) { _status.music_importing = false; return };
                                       for (var i = 1; i < 1000; i++) {
                                          if (!lib.config.customBackgroundMusic[link + '_' + i]) {
                                             link = link + '_' + i; break;
                                          }
                                       }
                                    }
                                    var callback = function () {
                                       var nodexx = ui.background_music_setting;
                                       var nodeyy = nodexx._link.menu;
                                       var nodezz = nodexx._link.config;
                                       var musicname = link.slice(link.indexOf('_') + 1);
                                       game.prompt('###请输入音乐的名称###' + musicname, true, function (str) {
                                          if (str) musicname = str;
                                          lib.config.customBackgroundMusic[link] = musicname;
                                          lib.config.background_music = link;
                                          lib.config.all.background_music.add(link);
                                          game.saveConfig('background_music', link);
                                          game.saveConfig('customBackgroundMusic', lib.config.customBackgroundMusic);
                                          nodezz.item[link] = lib.config.customBackgroundMusic[link];
                                          var textMenu = ui.create.div('', lib.config.customBackgroundMusic[link], nodeyy, clickMenuItem, nodeyy.childElementCount - 2);
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
                           for (var k = 0; k < hiddenNodes.length; k++) {
                              page.appendChild(hiddenNodes[k]);
                           }
                        }
                        if (info.config.update) {
                           info.config.update(config, map);
                        }
                     }
                     return node;
                  };

                  for (var i in lib.configMenu) {
                     if (i != 'others') createModeConfig(i, start.firstChild);
                  }
                  createModeConfig('others', start.firstChild);

                  var active = start.firstChild.querySelector('.active');
                  if (!active) {
                     active = start.firstChild.firstChild;
                     active.classList.add('active');
                  }
                  rightPane.appendChild(active.link);
               }());

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
                        var group = get.is.double(name, true);
                        if (group) return group[0];
                        return lib.character[name][1];
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
               var getPack = function (name) {
                  for (var i in lib.characterPack) {
                     if (lib.characterPack[i][name]) return i;
                  }
                  return null;
               }
               var packs = {};
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
                  var translate;
                  var pack = null;
                  if (packname == '最近') {
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
                  node = createNode('最近');
                  if (lib.config.character_dialog_tool == '最近') {
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
             * 生成带有卡牌或角色按钮的弹窗
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
               var list = [];
               var dialog;
               var node = ui.create.div('.caption.pointerspan');
               if (get.is.phoneLayout()) {
                  node.style.fontSize = '30px';
               }
               var namecapt = [];
               var getCapt = function (str) {
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
               }
               if (thisiscard) {
                  for (var i in lib.card) {
                     if (!lib.translate[i + '_info']) continue;
                     if (filter && filter(i)) continue;
                     list.push(['', get.translation(lib.card[i].type), i]);
                     if (namecapt.indexOf(getCapt(i)) == -1) {
                        namecapt.push(getCapt(i));
                     }
                  }
               }
               else {
                  for (var i in lib.character) {
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
                     if (namecapt.indexOf(getCapt(i)) == -1) {
                        namecapt.push(getCapt(i));
                     }
                  }
               }
               namecapt.sort(function (a, b) {
                  return a > b ? 1 : -1;
               });
               if (!thisiscard) {
                  namecapt.remove('自定义');
                  namecapt.push('newline');
                  for (var i in lib.characterDialogGroup) {
                     namecapt.push(i);
                  }
               }
               var newlined = false;
               var newlined2;
               var packsource;
               var clickCapt = function (e) {
                  if (_status.dragged) return;
                  if (dialog.currentcapt2 == '最近' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
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
                        for (var i = 0; i < dialog.buttons.length; i++) {
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
                        for (var i = 0; i < dialog.buttons.length; i++) {
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
               for (i = 0; i < namecapt.length; i++) {
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
                     var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius');
                     span.style.margin = '3px';
                     span.style.width = 'auto';
                     span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                     span.link = namecapt[i];
                     span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                     newlined.appendChild(span);
                     node[namecapt[i]] = span;
                     if (namecapt[i] == '收藏') {
                        span._nature = 'fire';
                     }
                     else {
                        span._nature = 'wood';
                     }
                  }
                  else {
                     var span = document.createElement('span');
                     span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                     span.link = namecapt[i];
                     span.alphabet = true;
                     span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                     node.appendChild(span);
                  }
               }
               if (!thisiscard) {
                  let groups = lib.group.slice(0).removeArray(['wei', 'shu', 'wu', 'jin', 'western', 'key', 'vtuber', 'clubs']);
                  if (get.mode() == 'guozhan' || (get.mode() == 'versus' && _status.mode != 'jiange' && (!_status.connectMode || lib.configOL.versus_mode === '4v4'))) groups = ['holo', 'nijisanji', 'vtuber', 'clubs'];
                  let bool1 = false;
                  let bool4 = false;
                  let groups_copy = [...groups]
                  for (let i of list) {
                     let group = lib.character[i][1]
                     if (groups_copy.includes(group)) {
                        groups_copy.remove(group)
                     }
                     if (group == 'shen') {
                        bool1 = true;
                     }
                     if (!bool4 && get.is.double(i)) bool4 = true;
                     if (bool1 && bool4 && groups_copy.length === 0) break;
                  }
                  groups.removeArray(groups_copy)
                  if (!bool1) groups.remove('shen');
                  if (bool4) groups.add('double');
                  var natures = ['water', 'soil', 'wood', 'metal'];
                  var span = document.createElement('span');
                  newlined.appendChild(span);
                  span.style.margin = '8px';
                  var clickGroup = function () {
                     if (_status.dragged) return;
                     if (dialog.currentcapt2 == '最近' && dialog.currentcaptnode2 != this && !dialog.currentcaptnode2.inited) {
                        dialog.currentcapt2 = null;
                        dialog.currentcaptnode2.classList.remove('thundertext');
                        dialog.currentcaptnode2.inited = true;
                        dialog.currentcaptnode2 = null;
                     }
                     var node = this, link = this.link;
                     if (node.classList.contains('thundertext')) {
                        dialog.currentgroup = null;
                        dialog.currentgroupnode = null;
                        node.classList.remove('thundertext');
                        for (var i = 0; i < dialog.buttons.length; i++) {
                           if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
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
                        if (dialog.currentgroupnode) {
                           dialog.currentgroupnode.classList.remove('thundertext');
                        }
                        dialog.currentgroup = link;
                        dialog.currentgroupnode = node;
                        node.classList.add('thundertext');
                        for (var i = 0; i < dialog.buttons.length; i++) {
                           if (dialog.currentcapt && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt)) {
                              dialog.buttons[i].classList.add('nodisplay');
                           }
                           else if (dialog.currentcapt2 && dialog.buttons[i].capt != dialog.getCurrentCapt(dialog.buttons[i].link, dialog.buttons[i].capt, true)) {
                              dialog.buttons[i].classList.add('nodisplay');
                           }
                           else if (dialog.currentgroup == 'double') {
                              if (dialog.buttons[i]._changeGroup || dialog.buttons[i].group == 'ye') dialog.buttons[i].classList.remove('nodisplay');
                              else dialog.buttons[i].classList.add('nodisplay');
                           }
                           else {
                              if (dialog.buttons[i]._changeGroup || dialog.buttons[i].group == 'ye' || dialog.buttons[i].group != dialog.currentgroup) {
                                 dialog.buttons[i].classList.add('nodisplay');
                              }
                              else {
                                 dialog.buttons[i].classList.remove('nodisplay');
                              }
                           }
                        }
                     }
                  };
                  for (var i = 0; i < groups.length; i++) {
                     var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
                     span.style.margin = '3px';
                     newlined.appendChild(span);
                     span.innerHTML = lib.translate[groups[i] + '2'] ? get.translation(groups[i] + '2') : get.translation(groups[i]);
                     span.link = groups[i];
                     span._nature = natures[i];
                     span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickGroup);
                  }

                  var span = document.createElement('span');
                  newlined.appendChild(span);
                  span.style.margin = '8px';

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
                     for (var i = 0; i < node.childElementCount; i++) {
                        if (node.childNodes[i].tagName.toLowerCase() == 'span') {
                           node.childNodes[i].style.display = 'none';
                           node.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large.capt', node.childNodes[i].innerHTML);
                           node.childNodes[i].touchlink.link = node.childNodes[i];
                        }
                     }
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
                           newlined2.style.display = 'block';
                        }
                        else {
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
                     var group = get.is.double(name, true);
                     if (group) return group[0];
                     return lib.character[name][1];
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
               dialog = ui.create.dialog('hidden');
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
                  var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
                  if (this.seperatelist && noalph) {
                     if (this.seperatelist[currentcapt].contains(link)) return capt;
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
               for (i = 0; i < dialog.buttons.length; i++) {
                  if (thisiscard) {
                     dialog.buttons[i].capt = getCapt(dialog.buttons[i].link[2]);
                  }
                  else {
                     dialog.buttons[i].group = lib.character[dialog.buttons[i].link][1];
                     dialog.buttons[i].capt = getCapt(dialog.buttons[i].link);
                  }
               }
               if (!expandall) {
                  if (!thisiscard && (lib.characterDialogGroup[lib.config.character_dialog_tool] ||
                     lib.config.character_dialog_tool == '自创')) {
                     clickCapt.call(node[lib.config.character_dialog_tool]);
                  }
               }
               return dialog;
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
               var i, controls;
               var nozoom = false;
               if (Array.isArray(arguments[0])) controls = arguments[0];
               else controls = arguments;
               var control = ui.create.div('.control');
               ui.control.insertBefore(control, _status.createControl || ui.confirm);
               for (i in lib.element.control) {
                  control[i] = lib.element.control[i];
               }
               for (i = 0; i < controls.length; i++) {
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
               var i, same;
               if (ui.skills) {
                  if (ui.skills.skills.length == skills.length && ui.skills.style.display != 'none') {
                     same = true;
                     for (i = 0; i < skills.length; i++) {
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
               var i, same;
               if (ui.skills2) {
                  if (ui.skills2.skills.length == skills.length && ui.skills2.style.display != 'none') {
                     same = true;
                     for (i = 0; i < skills.length; i++) {
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
               var i, same;
               if (ui.skills3) {
                  if (ui.skills3.skills.length == skills.length && ui.skills3.style.display != 'none') {
                     same = true;
                     for (i = 0; i < skills.length; i++) {
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
                           else{
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
               };
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
         },
         /**
          * HTML 事件
          * @namespace
          */
         click: {
            identitycircle: function () {
               var list = [];
               this.classList.toggle('transparent');
               for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                  if (!this.parentNode.childNodes[i].classList.contains('transparent')) {
                     list.add(this.parentNode.childNodes[i].link[2]);
                  }
               }
               var info = this.link;
               if (list.length == 1) {
                  for (var i = 0; i < this.parentNode.childNodes.length; i++) {
                     if (!this.parentNode.childNodes[i].classList.contains('transparent')) {
                        var info2 = this.parentNode.childNodes[i].link;
                        info[0].firstChild.innerHTML = info2[1];
                        info[0].dataset.color = info2[2];
                     }
                  }
               }
               else {
                  info[0].firstChild.innerHTML = '';
                  info[0].dataset.color = '';
                  ui.create.identitycircle(list, info[0].firstChild);
               }
               this._source._guozhanguess = list;
            },
            connectEvents: function () {
               if (this.info) {
                  var button = this;
                  var layer = ui.create.div('.poplayer', ui.window);
                  var uiintro = ui.create.dialog('hidden', 'notouchscroll');
                  this.classList.add('active');
                  if (lib.config.touchscreen) {
                     lib.setScroll(uiintro.contentContainer);
                  }
                  layer.listen(function () {
                     if (this.clicked) {
                        this.clicked = false;
                        return;
                     }
                     button.classList.remove('active');
                     uiintro.delete();
                     this.delete();
                  });
                  uiintro.listen(function () {
                     _status.clicked = true;
                  });
                  uiintro.style.zIndex = 21;
                  uiintro.classList.add('popped');
                  uiintro.classList.add('static');
                  uiintro.classList.add('onlineclient');
                  uiintro.style.width = '180px';
                  uiintro.style.height = '300px';
                  uiintro.style.left = 'auto';
                  uiintro.style.right = '20px';
                  uiintro.style.top = 'auto';
                  uiintro.style.bottom = '75px';

                  uiintro.refresh = function () {
                     if (button.focused) return;
                     uiintro.content.innerHTML = '';
                     uiintro.addText('创建约战');
                     button.textnode = uiintro.content.lastChild.lastChild;
                     uiintro.add('<input type="text" style="width:calc(100% - 10px);resize: none;border: none;border-radius: 2px;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;margin-top: -2px;margin-bottom: 2px;">');
                     uiintro.content.lastChild.style.paddingTop = 0;
                     button.input = uiintro.content.lastChild.lastChild;
                     button.input.onfocus = function () {
                        button.focused = true;
                     }
                     button.input.onblur = function () {
                        delete button.focused;
                     }
                     if (button.interval) {
                        button.input.disabled = true;
                        button.input.style.opacity = 0.6;
                        if (button.intervaltext) {
                           button.textnode.innerHTML = button.intervaltext;
                        }
                     }
                     var datenode = ui.create.div(uiintro.content);
                     datenode.style.marginTop = 0;
                     datenode.style.whiteSpace = 'nowrap';
                     var date = new Date();
                     var days = [];
                     var currentDay = date.getDay();
                     if (currentDay == 0) currentDay = 7;
                     for (var i = 1; i <= 7; i++) {
                        if (i < currentDay) {
                           days.push([i.toString(), '下周' + get.cnNumber(i, true)]);
                        }
                        else if (i == 7) {
                           days.push([i.toString(), '周日']);
                        }
                        else if (i == currentDay) {
                           days.push([i.toString(), '今天']);
                        }
                        else {
                           days.push([i.toString(), '周' + get.cnNumber(i, true)]);
                        }
                     }
                     days = days.concat(days.splice(0, currentDay - 1));
                     var initday = currentDay + 1;
                     if (initday > 7) {
                        initday -= 7;
                     }
                     var daysselect = ui.create.selectlist(days, initday.toString(), datenode);
                     daysselect.style.width = '55px';
                     var hours = [];
                     for (var i = 0; i < 24; i++) {
                        hours.push([i.toString(), i.toString() + '点']);
                     }
                     var hoursselect = ui.create.selectlist(hours, date.getHours().toString(), datenode);
                     hoursselect.style.marginLeft = '5px';
                     hoursselect.style.width = '55px';
                     var timeconfirm = ui.create.node('button', '确定', datenode);
                     timeconfirm.style.marginLeft = '5px';
                     timeconfirm.onclick = function () {
                        if (!button.input.value) {
                           alert('请填写约战标题');
                           return;
                        }
                        var date2 = new Date();
                        date2.setHours(parseInt(hoursselect.value));
                        date2.setMinutes(0);
                        date2.setSeconds(0);
                        var deltaday = parseInt(daysselect.value) - currentDay;
                        if (deltaday < 0) {
                           deltaday += 7;
                        }
                        var utc = date2.getTime() + deltaday * 24 * 3600000;
                        if (utc < date.getTime()) {
                           alert('创建失败，时间已过');
                           return;
                        }
                        if (get.is.banWords(button.input.value)) {
                           var eventnode = ui.create.div('.menubutton.videotext.onlineEvt.pointerdiv', function () {
                              setTimeout(() => {
                                 if (this.classList.contains('active')) {
                                    if (confirm('确定要离开' + this.info.content + '？')) {
                                       this.classList.remove('active');
                                    }
                                 }
                                 else {
                                    if (confirm('确定要加入' + this.info.content + '？')) {
                                       this.classList.add('active');
                                    }
                                 }
                              });
                           }, uiintro.content, 4);
                           var fakeinfo = {
                              utc: utc,
                              day: parseInt(daysselect.value),
                              hour: parseInt(hoursselect.value),
                              nickname: get.connectNickname(),
                              avatar: lib.config.connect_avatar,
                              content: button.input.value,
                              create: game.onlineKey,
                              members: [game.onlineKey],
                           };
                           eventnode.info = fakeinfo;
                           ui.create.div('.title', fakeinfo.content, eventnode);
                           var str;
                           if (fakeinfo.day < currentDay) {
                              str = '下周';
                           }
                           else {
                              str = '周';
                           }
                           if (fakeinfo.day == 7) {
                              str += '日'
                           }
                           else {
                              str += get.cnNumber(fakeinfo.day, true);
                           }
                           str += ' ';
                           var hour = fakeinfo.hour;
                           if (hour <= 12) {
                              if (hour <= 5) {
                                 str += '凌晨';
                              }
                              else if (hour < 12) {
                                 str += '上午';
                              }
                              else {
                                 str += '中午';
                              }
                              str += fakeinfo.hour + '点';
                           }
                           else {
                              if (hour <= 17) {
                                 str += '下午';
                              }
                              else {
                                 str += '晚上';
                              }
                              str += (fakeinfo.hour - 12) + '点';
                           }
                           ui.create.div('', '已有' + (fakeinfo.members.length) + '人加入', eventnode);
                           ui.create.div('', '时间：' + str, eventnode);
                           if (fakeinfo.members.contains(game.onlineKey)) {
                              eventnode.classList.add('active');
                           }
                           button.input.value = '';
                           return;
                        }
                        game.send('server', 'events', {
                           utc: utc,
                           day: parseInt(daysselect.value),
                           hour: parseInt(hoursselect.value),
                           nickname: get.connectNickname(),
                           avatar: lib.config.connect_avatar,
                           content: button.input.value
                        }, game.onlineKey);
                     };

                     var num = 0;
                     for (var i = 0; i < button.info.length; i++) {
                        if (typeof button.info[i].creator == 'string' && button.info[i].creator != game.onlineKey && get.is.banWords(button.info[i].content)) continue;
                        if (button.info[i].creator == game.onlineKey) {
                           num++;
                        }
                        var eventnode = ui.create.div('.menubutton.videotext.onlineEvt.pointerdiv', function () {
                           if (typeof this.info.creator != 'string') return;
                           setTimeout(() => {
                              if (this.classList.contains('active')) {
                                 if (confirm('确定要离开' + this.info.content + '？')) {
                                    game.send('server', 'events', this.info.id, game.onlineKey, 'leave');
                                 }
                              }
                              else {
                                 if (confirm('确定要加入' + this.info.content + '？')) {
                                    game.send('server', 'events', this.info.id, game.onlineKey, 'join');
                                 }
                              }
                           });
                        }, uiintro.content);
                        eventnode.info = button.info[i];
                        if (typeof button.info[i].creator == 'string') {
                           ui.create.div('.title', button.info[i].content, eventnode);
                           var str;
                           if (button.info[i].day < currentDay) {
                              str = '下周';
                           }
                           else {
                              str = '周';
                           }
                           if (button.info[i].day == 7) {
                              str += '日'
                           }
                           else {
                              str += get.cnNumber(button.info[i].day, true);
                           }
                           str += ' ';
                           var hour = button.info[i].hour;
                           if (hour <= 12) {
                              if (hour <= 5) {
                                 str += '凌晨';
                              }
                              else if (hour < 12) {
                                 str += '上午';
                              }
                              else {
                                 str += '中午';
                              }
                              str += button.info[i].hour + '点';
                           }
                           else {
                              if (hour <= 17) {
                                 str += '下午';
                              }
                              else {
                                 str += '晚上';
                              }
                              str += (button.info[i].hour - 12) + '点';
                           }
                           ui.create.div('', '创建者：' + (button.info[i].nickname), eventnode);
                           //ui.create.div('','创建者：'+(button.info[i].nickname)+'<br>ID：'+button.info[i].creator,eventnode);
                           ui.create.div('', '已有' + (button.info[i].members.length) + '人加入', eventnode);
                           ui.create.div('', '时间：' + str, eventnode);
                           if (button.info[i].members.contains(game.onlineKey)) {
                              eventnode.classList.add('active');
                           }
                        }
                        else {
                           ui.create.div('.title', button.info[i].title, eventnode);
                           ui.create.div('', button.info[i].content, eventnode);
                           ui.create.div('', '创建者：' + (button.info[i].nickname), eventnode);
                        }
                     }
                     if (num >= 3) {
                        button.input.disabled = true;
                        button.input.style.opacity = 0.6;
                        hoursselect.disabled = true;
                        daysselect.disabled = true;
                        timeconfirm.disabled = true;
                     }
                  }
                  uiintro.refresh();
                  ui.window.appendChild(uiintro);
                  _status.connectEventsCallback = function () {
                     if (uiintro.parentNode == ui.window) {
                        uiintro.refresh();
                     }
                  };
               }
            },
            connectClients: function () {
               if (this.info) {
                  var button = this;
                  var layer = ui.create.div('.poplayer', ui.window);
                  var uiintro = ui.create.dialog('hidden', 'notouchscroll');
                  this.classList.add('active');
                  if (lib.config.touchscreen) {
                     lib.setScroll(uiintro.contentContainer);
                  }
                  layer.listen(function () {
                     if (this.clicked) {
                        this.clicked = false;
                        return;
                     }
                     button.classList.remove('active');
                     uiintro.delete();
                     this.delete();
                  });
                  uiintro.listen(function () {
                     _status.clicked = true;
                  });
                  uiintro.style.zIndex = 21;
                  uiintro.classList.add('popped');
                  uiintro.classList.add('static');
                  uiintro.classList.add('onlineclient');
                  uiintro.style.width = '180px';
                  uiintro.style.height = '300px';
                  uiintro.style.left = 'auto';
                  uiintro.style.right = '20px';
                  uiintro.style.top = 'auto';
                  uiintro.style.bottom = '75px';

                  uiintro.refresh = function () {
                     if (button.focused) return;
                     uiintro.content.innerHTML = '';
                     uiintro.addText('发状态');
                     button.textnode = uiintro.content.lastChild.lastChild;
                     uiintro.add('<input type="text" style="width:calc(100% - 10px);resize: none;border: none;border-radius: 2px;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;margin-top: -2px;margin-bottom: 2px;">');
                     uiintro.content.lastChild.style.paddingTop = 0;
                     button.input = uiintro.content.lastChild.lastChild;
                     button.input.onfocus = function () {
                        button.focused = true;
                     }
                     button.input.onblur = function () {
                        delete button.focused;
                     }
                     if (button.interval) {
                        button.input.disabled = true;
                        button.input.style.opacity = 0.6;
                        if (button.intervaltext) {
                           button.textnode.innerHTML = button.intervaltext;
                        }
                     }
                     button.input.onkeydown = function (e) {
                        if (e.keyCode == 13 && !this.disabled) {
                           game.send('server', 'status', this.value);
                           this.blur();
                           this.disabled = true;
                           this.style.opacity = 0.6;
                           button.textnode.innerHTML = '发状态(10)';
                           button.intervaltext = button.textnode.innerHTML;
                           var num = 10;
                           button.input.disabled = true;
                           button.input.style.opacity = 0.6;
                           this.value = '';
                           button.interval = setInterval(() => {
                              num--;
                              if (num > 0) {
                                 button.textnode.innerHTML = '发状态(' + num + ')';
                                 button.intervaltext = button.textnode.innerHTML;
                              }
                              else {
                                 button.textnode.innerHTML = '发状态';
                                 button.input.disabled = false;
                                 button.input.style.opacity = '';
                                 clearInterval(button.interval);
                                 delete button.interval;
                                 delete button.intervaltext;
                              }
                           }, 1000);
                        }
                     }

                     for (var i = 0; i < button.info.length; i++) {
                        var node = ui.create.div('.menubutton.videonode.pointerdiv', uiintro.content);
                        ui.create.div('.menubutton.videoavatar', node).setBackground(button.info[i][1] || 'KizunaAI', 'character');
                        if (button.info[i][4] == game.wsid) {
                           ui.create.div('.name', '<span class="thundertext thunderauto">' + (button.info[i][0] || '无名玩家'), node); node.isme = true;
                        }
                        else if (button.info[i][2]) {
                           ui.create.div('.name', (button.info[i][0] || '无名玩家'), node);
                        }
                        else {
                           ui.create.div('.name', '<span style="opacity:0.6">' + (button.info[i][0] || '无名玩家'), node);
                        }
                        //ui.create.div('.videostatus',node,button.info[i][5]);
                        //node.classList.add('videonodestatus');
                        if (button.info[i][3]) {
                           ui.create.div('.videostatus', node, button.info[i][3].slice(0, 80));
                           node.classList.add('videonodestatus')
                        }
                     }
                  };

                  uiintro.refresh();
                  ui.window.appendChild(uiintro);
                  _status.connectClientsCallback = function () {
                     if (uiintro.parentNode == ui.window) {
                        uiintro.refresh();
                     }
                  };
               }
            },
            autoskin: function () {
               if (!lib.config.change_skin) return;
               var players = game.filterPlayer();
               var change = function (player, num, callback) {
                  if (num == '1') {
                     ui.click.skin(player.node.avatar, player.name, callback);
                  }
                  else {
                     ui.click.skin(player.node.avatar2, player.name2, callback);
                  }
               };
               var finish = function () {
                  if (lib.config.change_skin_auto != 'off') {
                     _status.skintimeout = setTimeout(ui.click.autoskin, parseInt(lib.config.change_skin_auto));
                  }
               };
               var autoskin = function () {
                  if (players.length) {
                     var player = players.randomRemove();
                     var list = [];
                     if (player.name && !player.isUnseen(0)) {
                        list.push('1');
                     }
                     if (player.name2 && !player.isUnseen(1)) {
                        list.push('2');
                     }
                     if (list.length) {
                        change(player, list.randomRemove(), function (bool) {
                           if (bool) {
                              finish();
                           }
                           else if (list.length) {
                              change(player, list[0], function (bool) {
                                 if (bool) {
                                    finish();
                                 }
                                 else {
                                    autoskin();
                                 }
                              });
                           }
                           else {
                              autoskin();
                           }
                        });
                     }
                     else {
                        autoskin();
                     }
                  }
               }
               autoskin();
            },
            skin: function (avatar, name, callback) {
               var num = 1;
               if (name.indexOf('gz_') == 0) {
                  name = name.slice(3);
               }
               if (lib.config.skin[name]) {
                  num = lib.config.skin[name] + 1;
               }
               var fakeavatar = avatar.cloneNode(true);
               var finish = function (bool) {
                  var player = avatar.parentNode;
                  if (bool) {
                     fakeavatar.style.boxShadow = 'none';
                     player.insertBefore(fakeavatar, avatar.nextSibling);
                     setTimeout(function () {
                        fakeavatar.delete();
                     }, 100);
                  }
                  if (bool && lib.config.animation && !lib.config.low_performance) {
                     player.$rare();
                  }
                  if (callback) {
                     callback(bool);
                  }
               }
               var img = new Image();
               img.onload = function () {
                  lib.config.skin[name] = num;
                  game.saveConfig('skin', lib.config.skin);
                  avatar.style.backgroundImage = 'url("' + img.src + '")';
                  finish(true);
               }
               img.onerror = function () {
                  if (lib.config.skin[name]) {
                     finish(true);
                  }
                  else {
                     finish(false);
                  }
                  delete lib.config.skin[name];
                  game.saveConfig('skin', lib.config.skin);
                  avatar.setBackground(name, 'character');
               }
               img.src = lib.assetURL + 'image/skin/' + name + '/' + num + '.jpg';
            },
            touchpop: function (forced) {
               if (lib.config.touchscreen || forced) {
                  _status.touchpopping = true;
                  clearTimeout(_status.touchpoppingtimeout);
                  _status.touchpoppingtimeout = setTimeout(function () {
                     _status.touchpopping = false;
                  }, 600);
               }
            },
            exit: function () {
               if (game.servermode && lib.config.reconnect_info && _status.over) {
                  if (!_status.roomtimeout) {
                     lib.config.reconnect_info[2] = game.roomId;
                     game.saveConfig('reconnect_info', lib.config.reconnect_info);
                  }
                  game.reload();
                  return;
               }
               else {
                  if (typeof game.roomId != 'string') {
                     game.saveConfig('reconnect_info');
                  }
               }
               if (!ui.exit || !ui.exit.stay) {
                  if (lib.config.reconnect_info) {
                     lib.config.reconnect_info.length = 1;
                     game.saveConfig('reconnect_info', lib.config.reconnect_info);
                  }
                  game.saveConfig('tmp_user_roomId', undefined, false, function () {
                     game.reload();
                  });
               }
               else {
                  game.reload();
               }
            },
            shortcut: function (show) {
               if (show === false) {
                  ui.shortcut.classList.add('hidden');
               }
               else {
                  ui.shortcut.classList.toggle('hidden');
               }
               if (ui.shortcut.classList.contains('hidden')) {
                  ui.favmode.style.display = 'none';
                  if (window.StatusBar && lib.config.show_statusbar_ios == 'auto') {
                     document.body.classList.remove('statusbar');
                     window.StatusBar.hide();
                  }
                  ui.window.classList.remove('shortcutpaused');
               }
               else {
                  if (lib.config.show_favmode) {
                     ui.favmode.style.display = '';
                  }
                  if (window.StatusBar && lib.config.show_statusbar_ios == 'auto') {
                     document.body.classList.add('statusbar');
                     window.StatusBar.overlaysWebView(true);
                     window.StatusBar.backgroundColorByName('black');
                     window.StatusBar.show();
                  }
                  if (_status.auto) {
                     ui.shortcut.autobutton.classList.add('active');
                  }
                  else {
                     ui.shortcut.autobutton.classList.remove('active');
                  }
                  ui.window.classList.add('shortcutpaused');
               }
            },
            favouriteCharacter: function (e) {
               if (typeof this.link == 'string') {
                  if (this.innerHTML == '添加收藏') {
                     this.innerHTML = '移除收藏';
                     lib.config.favouriteCharacter.add(this.link);
                  }
                  else {
                     this.innerHTML = '添加收藏';
                     lib.config.favouriteCharacter.remove(this.link);
                  }
                  if (ui.favouriteCharacter) {
                     if (lib.config.favouriteCharacter.contains(this.link)) {
                        for (var i = 0; i < ui.favouriteCharacter.childElementCount; i++) {
                           if (ui.favouriteCharacter.childNodes[i].link == this.link) {
                              break;
                           }
                        }
                        if (i == ui.favouriteCharacter.childElementCount) {
                           ui.create.button(this.link, 'character', ui.favouriteCharacter).listen(function (e) {
                              this._banning = 'offline';
                              ui.click.touchpop();
                              ui.click.intro.call(this, e);
                              _status.clicked = false;
                              delete this._banning;
                           }).classList.add('noclick');
                        }
                     }
                     else {
                        for (var i = 0; i < ui.favouriteCharacter.childElementCount; i++) {
                           if (ui.favouriteCharacter.childNodes[i].link == this.link) {
                              ui.favouriteCharacter.childNodes[i].remove();
                              break;
                           }
                        }
                     }
                     var shownode = false;
                     for (var i = 0; i < lib.config.favouriteCharacter.length; i++) {
                        var favname = lib.config.favouriteCharacter[i];
                        if (lib.character[favname]) {
                           shownode = true; break;
                        }
                     }
                     if (shownode) {
                        ui.favouriteCharacter.node.style.display = '';
                     }
                     else {
                        ui.favouriteCharacter.node.style.display = 'none';
                     }
                  }
                  game.saveConfig('favouriteCharacter', lib.config.favouriteCharacter);
               }
               e.stopPropagation();
            },
            buttonnameenter: function () {
               if (this.buttonscrollinterval) {
                  clearInterval(this.buttonscrollinterval);
               }
               var node = this.node.name;
               if (node.offsetHeight < node.scrollHeight) {
                  var num = 40;
                  this.buttonscrollinterval = setInterval(() => {
                     if (node.scrollTop + node.offsetHeight >= node.scrollHeight) {
                        clearInterval(this.buttonscrollinterval);
                        delete this.buttonscrollinterval;
                     }
                     else {
                        if (num > 0) {
                           num--;
                        }
                        else {
                           node.scrollTop += 2;
                        }
                     }
                  }, 16);
               }
            },
            buttonnameleave: function () {
               if (this.buttonscrollinterval) {
                  clearInterval(this.buttonscrollinterval);
               }
               var node = this.node.name;
               if (node.offsetHeight < node.scrollHeight) {
                  this.buttonscrollinterval = setInterval(() => {
                     if (node.scrollTop == 0) {
                        clearInterval(this.buttonscrollinterval);
                        delete this.buttonscrollinterval;
                     }
                     else {
                        node.scrollTop -= 2;
                     }
                  }, 16);
               }
            },
            dragtouchdialog: function (e) {
               if (e.touches.length > 1 &&
                  !this.classList.contains('popped') &&
                  !this.classList.contains('fixed')) {
                  _status.draggingtouchdialog = this;
                  this._dragorigin = {
                     clientX: e.touches[0].clientX,
                     clientY: e.touches[0].clientY,
                  };
                  if (!this._dragtransform) {
                     this._dragtransform = [0, 0];
                  }
                  this._dragorigintransform = this._dragtransform.slice(0);
                  e.preventDefault();
                  e.stopPropagation();
               }
            },
            identity: function (e) {
               if (_status.dragged) return;
               _status.clicked = true;
               if (!game.getIdentityList) return;
               if (_status.video) return;
               if (this.parentNode.forceShown) return;
               if (_status.clickingidentity) {
                  for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                     _status.clickingidentity[1][i].delete();
                     _status.clickingidentity[1][i].style.transform = '';
                  }
                  if (_status.clickingidentity[0] == this.parentNode) {
                     delete _status.clickingidentity;
                     return;
                  }
               }
               var list = game.getIdentityList(this.parentNode);
               if (!list) return;
               if (lib.config.mark_identity_style == 'click') {
                  var list2 = [];
                  for (var i in list) {
                     list2.push(i);
                  }
                  list2.push(list2[0]);
                  for (var i = 0; i < list2.length; i++) {
                     if (this.firstChild.innerHTML == list[list2[i]]) {
                        this.firstChild.innerHTML = list[list2[i + 1]];
                        this.dataset.color = list2[i + 1];
                        break;
                     }
                  }
               }
               else {
                  if (get.mode() == 'guozhan') {
                     list = { holo: '杏', nijisanji: '虹', vtuber: '企', clubs: '社' };
                  }
                  var list2 = get.copy(list);
                  if (game.getIdentityList2) {
                     game.getIdentityList2(list2);
                  }
                  var rect = this.parentNode.getBoundingClientRect();
                  this._customintro = function (uiintro) {
                     if (get.mode() == 'guozhan') {
                        uiintro.clickintro = true;
                     }
                     else {
                        uiintro.touchclose = true;
                     }
                     // if(lib.config.theme!='woodden'){
                     uiintro.classList.add('woodbg');
                     // }
                     if (get.is.phoneLayout()) {
                        uiintro.style.width = '100px';
                     }
                     else {
                        uiintro.style.width = '85px';
                     }
                     var source = this.parentNode;
                     for (var i in list) {
                        var node = ui.create.div();
                        node.classList.add('guessidentity');
                        node.classList.add('pointerdiv');
                        ui.create.div('.menubutton.large', list2[i], node);
                        if (!get.is.phoneLayout()) {
                           node.firstChild.style.fontSize = '24px';
                           node.firstChild.style.lineHeight = '24px';
                        }
                        if (get.mode() == 'guozhan') {
                           if (source._guozhanguess) {
                              if (!source._guozhanguess.contains(i)) {
                                 node.classList.add('transparent');
                              }
                           }
                           node._source = source;
                           node.listen(ui.click.identitycircle);
                        }
                        else {
                           node.listen(function () {
                              var info = this.link;
                              info[0].firstChild.innerHTML = info[1];
                              info[0].dataset.color = info[2];
                              _status.clicked = false;
                           });
                        }

                        node.link = [this, list[i], i];
                        uiintro.add(node);
                     }
                  };
                  ui.click.touchpop();
                  ui.click.intro.call(this, {
                     clientX: (rect.left + rect.width),
                     clientY: (rect.top)
                  });
                  // var nodes=[];
                  // _status.clickingidentity=[this.parentNode,nodes];
                  // var num=1;
                  // var dy=30;
                  // if(get.is.phoneLayout()){
                  //     dy=45;
                  // }
                  // for(var i in list){
                  //     if(this.firstChild.innerHTML!=list[i]){
                  //         var node=ui.create.div('.identity.hidden.pointerdiv',this.parentNode,ui.click.identity2);
                  //         ui.create.div(node).innerHTML=list[i];
                  //         node.dataset.color=i;
                  //         ui.refresh(node);
                  //         node.show();
                  //         var transstr='translateY('+((num++)*dy)+'px)';
                  //         if(get.is.phoneLayout()){
                  //             transstr+=' scale(1.3)';
                  //         }
                  //         if(get.is.newLayout()&&this.parentNode.classList.contains('linked')){
                  //             transstr+=' rotate(90deg)';
                  //         }
                  //         node.style.transform=transstr;
                  //         nodes.push(node);
                  //     }
                  // }
               }
            },
            identity2: function () {
               if (_status.clickingidentity) {
                  _status.clicked = true;
                  var player = _status.clickingidentity[0];
                  var nodes = _status.clickingidentity[1];
                  player.node.identity.dataset.color = this.dataset.color;
                  player.node.identity.firstChild.innerHTML = this.firstChild.innerHTML;
                  for (var i = 0; i < nodes.length; i++) {
                     nodes[i].delete();
                     nodes[i].style.transform = '';
                  }
                  delete _status.clickingidentity;
               }
            },
            roundmenu: function () {
               game.closeConnectMenu();
               switch (lib.config.round_menu_func) {
                  case 'system':
                     game.closePopped();
                     ui.system1.classList.add('shown');
                     ui.system2.classList.add('shown');
                     game.closeMenu();
                     ui.click.shortcut();
                     break;
                  case 'menu':
                     if (ui.click.configMenu) {
                        game.closePopped();
                        game.pause2();
                        ui.click.configMenu();
                        ui.system1.classList.remove('shown');
                        ui.system2.classList.remove('shown');
                     }
                     break;
                  case 'pause':
                     ui.click.pause();
                     break;
                  case 'auto':
                     ui.click.auto();
                     break;
               }
               _status.clicked = true;
            },
            pausehistory: function () {
               if (!lib.config.auto_popped_history) return;
               if (!ui.sidebar.childNodes.length) return;
               var uiintro = ui.create.dialog('hidden');
               uiintro.style.maxHeight = '400px';
               uiintro.add(ui.sidebar);
               return uiintro;
            },
            pauseconfig: function () {
               if (!lib.config.auto_popped_config) return;
               if (get.is.phoneLayout()) return;
               var uiintro = ui.create.dialog('hidden');
               uiintro.listen(function (e) {
                  e.stopPropagation();
               });

               var rows = Math.floor(lib.config.all.mode.length / 3);
               uiintro.type = 'config';
               var modes = lib.config.modeorder || lib.config.all.mode.slice(0);
               for (var i = 0; i < modes.length; i++) {
                  if (!lib.config.all.mode.contains(modes[i])) {
                     modes.splice(i--, 1);
                  }
               }
               for (var k = 0; k < rows; k++) {
                  var node = ui.create.div('.newgame.pointernode');
                  for (var i = 0; i < 3 && i + k * 3 < modes.length; i++) {
                     var thismode = modes[i + k * 3];
                     var div = ui.create.div(thismode == (_status.sourcemode || lib.config.mode) ? '.underlinenode.on' : '.underlinenode', node);
                     div.innerHTML = lib.translate[thismode];
                     div.link = thismode;
                     div.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                        game.saveConfig('mode', this.link);
                        localStorage.setItem(lib.configprefix + 'directstart', true);
                        game.reload();
                     });
                  }
                  uiintro.add(node);
               }

               return uiintro;
            },
            cardPileButton: function () {
               var uiintro = ui.create.dialog('hidden');
               uiintro.listen(function (e) {
                  e.stopPropagation();
               });
               var num;
               if (game.online) {
                  num = _status.cardPileNum || 0;
               }
               else {
                  num = ui.cardPile.childNodes.length;
               }
               uiintro.add('剩余 <span style="font-family:' + 'xinwei' + '">' + num);

               if (_status.connectMode) return uiintro;
               uiintro.add('<div class="text center">轮数 <span style="font-family:xinwei">' + game.roundNumber + '</span>&nbsp;&nbsp;&nbsp;&nbsp;洗牌 <span style="font-family:xinwei">' + game.shuffleNumber + '</div>');
               uiintro.add('<div class="text center">弃牌堆</div>');
               if (ui.discardPile.childNodes.length) {
                  var list = [];
                  for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
                     list.unshift(ui.discardPile.childNodes[i]);
                  }
                  uiintro.addSmall([list, 'card']);
               }
               else {
                  uiintro.add('<div class="text center" style="padding-bottom:3px">无</div>');
               }
               return uiintro;
            },
            chat: function () {
               ui.system1.classList.add('shown');
               ui.system2.classList.add('shown');

               var uiintro = ui.create.dialog('hidden');
               uiintro.listen(function (e) {
                  e.stopPropagation();
               });

               var list = ui.create.div('.caption');
               if (get.is.phoneLayout()) {
                  list.style.maxHeight = '110px';
               }
               else {
                  list.style.maxHeight = '220px';
               }
               list.style.overflow = 'scroll';
               lib.setScroll(list);
               uiintro.contentContainer.style.overflow = 'hidden';

               var input;
               var addEntry = function (info, clear) {
                  if (list._chatempty) {
                     list.innerHTML = '';
                     delete list._chatempty;
                  }
                  var node = ui.create.div('.text.chat');
                  node.innerHTML = info[0] + ': ' + info[1];
                  list.appendChild(node);
                  list.scrollTop = list.scrollHeight;
                  uiintro.style.height = uiintro.content.scrollHeight + 'px';
               }
               _status.addChatEntry = addEntry;
               _status.addChatEntry._origin = uiintro;
               if (lib.chatHistory.length) {
                  for (var i = 0; i < lib.chatHistory.length; i++) {
                     addEntry(lib.chatHistory[i]);
                  }
               }
               else {
                  list._chatempty = true;
                  list.appendChild(ui.create.div('.text.center', '无聊天记录'))
               }
               uiintro.add(list);
               uiintro.style.height = uiintro.content.offsetHeight + 'px';
               list.scrollTop = list.scrollHeight;

               if (!_status.chatValue) _status.chatValue = '';
               var node = uiintro.add('<input type="text" value="' + _status.chatValue + '">');
               node.style.paddingTop = 0;
               node.style.marginBottom = '16px';
               input = node.firstChild;
               input.style.width = 'calc(100% - 20px)';
               input.onchange = function () {
                  _status.chatValue = input.value;
               }
               input.onkeydown = function (e) {
                  if (e.keyCode == 13 && input.value) {
                     var player = game.me;
                     var str = input.value;
                     if (!player) {
                        if (game.connectPlayers) {
                           if (game.online) {
                              for (var i = 0; i < game.connectPlayers.length; i++) {
                                 if (game.connectPlayers[i].playerid == game.onlineID) {
                                    player = game.connectPlayers[i]; break;
                                 }
                              }
                           }
                           else {
                              player = game.connectPlayers[0];
                           }
                        }
                     }
                     if (!player) return;
                     if (get.is.banWords(input.value)) {
                        player.say(input.value);
                        input.value = '';
                        _status.chatValue = '';
                     }
                     else {
                        if (game.online) {
                           game.send('chat', game.onlineID, str);
                        }
                        else {
                           lib.element.player.chat.call(player, str);
                        }
                        input.value = '';
                        _status.chatValue = '';
                     }
                  }
                  e.stopPropagation();
               }
               uiintro._onopen = function () {
                  input.focus();
                  list.scrollTop = list.scrollHeight;
               };
               uiintro._heightfixed = true;
               var emotionTitle = ui.create.div('.text.center', '聊天表情', function () {
                  if (emotionTitle.innerHTML == '快捷语音') {
                     emotionTitle.innerHTML = '聊天表情';
                     list2.remove();
                     list3.remove();
                     uiintro.add(list1);
                     while (list2.childNodes.length) {
                        list2.firstChild.remove();
                     }
                  }
                  else {
                     emotionTitle.innerHTML = '快捷语音';
                     list1.remove();
                     list2.remove();
                     uiintro.add(list3);
                  }
               });
               uiintro.add(emotionTitle);
               var list1 = ui.create.div('');
               if (get.is.phoneLayout()) {
                  list1.style.height = '110px';
               }
               else {
                  list1.style.height = '150px';
               }
               list1.style.overflow = 'scroll';
               lib.setScroll(list1);
               uiintro.add(list1);
               uiintro.style.height = uiintro.content.scrollHeight + 'px';
               var list2 = ui.create.div('');
               if (get.is.phoneLayout()) {
                  list2.style.height = '110px';
               }
               else {
                  list2.style.height = '150px';
               }
               list2.style.overflow = 'scroll';
               lib.setScroll(list2);
               //uiintro.add(list2);
               for (var i in lib.emotionList) {
                  var emotionPack = ui.create.div('.card.fullskin', '<img src="' + lib.assetURL + 'image/emotion/' + i + '/1.gif" width="50" height="50">', function () {
                     emotionTitle.innerHTML = get.translation(this.pack);
                     for (var j = 1; j <= lib.emotionList[this.pack]; j++) {
                        var emotionButton = ui.create.div('.card.fullskin', '<img src="' + lib.assetURL + 'image/emotion/' + this.pack + '/' + j + '.gif" width="50" height="50">', function () {
                           var player = game.me;
                           if (!player) {
                              if (game.connectPlayers) {
                                 if (game.online) {
                                    for (var i = 0; i < game.connectPlayers.length; i++) {
                                       if (game.connectPlayers[i].playerid == game.onlineID) {
                                          player = game.connectPlayers[i]; break;
                                       }
                                    }
                                 }
                                 else {
                                    player = game.connectPlayers[0];
                                 }
                              }
                           }
                           if (!player) return;
                           if (game.online) {
                              game.send('emotion', game.onlineID, this.pack, this.emotionID);
                           }
                           else {
                              lib.element.player.emotion.apply(player, [this.pack, this.emotionID]);
                           }
                        });
                        emotionButton.emotionID = j;
                        emotionButton.pack = this.pack;
                        emotionButton.style.height = '50px';
                        emotionButton.style.width = '50px';
                        list2.appendChild(emotionButton);
                     }
                     list1.remove();
                     uiintro.add(list2);
                  });
                  emotionPack.pack = i;
                  emotionPack.style.height = '50px';
                  emotionPack.style.width = '50px';
                  list1.appendChild(emotionPack);
               }
               list1.scrollTop = list1.scrollHeight;
               uiintro.style.height = uiintro.content.scrollHeight + 'px';
               var list3 = ui.create.div('.caption');
               if (get.is.phoneLayout()) {
                  list3.style.height = '110px';
               }
               else {
                  list3.style.height = '150px';
               }
               list3.style.overflow = 'scroll';
               lib.setScroll(list3);
               for (var i = 0; i < lib.quickVoice.length; i++) {
                  var node = ui.create.div('.text.chat', function () {
                     var player = game.me;
                     var str = this.innerHTML;
                     if (!player) {
                        if (game.connectPlayers) {
                           if (game.online) {
                              for (var i = 0; i < game.connectPlayers.length; i++) {
                                 if (game.connectPlayers[i].playerid == game.onlineID) {
                                    player = game.connectPlayers[i]; break;
                                 }
                              }
                           }
                           else {
                              player = game.connectPlayers[0];
                           }
                        }
                     }
                     if (!player) return;
                     if (game.online) {
                        game.send('chat', game.onlineID, str);
                     }
                     else {
                        lib.element.player.chat.call(player, str);
                     }
                  });
                  node.innerHTML = lib.quickVoice[i];
                  list3.appendChild(node);
               }
               list3.scrollTop = list1.scrollHeight;
               return uiintro;
            },
            volumn: function () {
               var uiintro = ui.create.dialog('hidden');
               uiintro.listen(function (e) {
                  e.stopPropagation();
               });
               uiintro.add('背景音乐');
               var vol1 = ui.create.div('.volumn');
               uiintro.add(vol1);
               for (var i = 0; i < 8; i++) {
                  var span = document.createElement('span');
                  span.link = i + 1;
                  span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.volumn_background);
                  if (i < lib.config.volumn_background) {
                     span.innerHTML = '●';
                  }
                  else {
                     span.innerHTML = '○';
                  }
                  vol1.appendChild(span);
               }

               uiintro.add('游戏音效');
               var vol2 = ui.create.div('.volumn');
               uiintro.add(vol2);
               for (var i = 0; i < 8; i++) {
                  var span = document.createElement('span');
                  span.link = i + 1;
                  span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.volumn_audio);
                  if (i < lib.config.volumn_audio) {
                     span.innerHTML = '●';
                  }
                  else {
                     span.innerHTML = '○';
                  }
                  vol2.appendChild(span);
               }
               if ('onmousedown' in document) {
                  uiintro.add('按键音效');
                  var vol3 = ui.create.div('.volumn');
                  uiintro.add(vol3);
                  for (var i = 0; i < 8; i++) {
                     var span = document.createElement('span');
                     span.link = i + 1;
                     span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.volumn_click);
                     if (i < lib.config.volumn_click) {
                        span.innerHTML = '●';
                     }
                     else {
                        span.innerHTML = '○';
                     }
                     vol3.appendChild(span);
                  }
               }
               uiintro.add(ui.create.div('.placeholder'));
               return uiintro;
            },
            volumn_background: function (e) {
               if (_status.dragged) return;
               var volume = this.link;
               if (volume === 1 && lib.config.volumn_background === 1) {
                  volume = 0;
               }
               game.saveConfig('volumn_background', volume);
               ui.backgroundMusic.volume = volume / 8;
               for (var i = 0; i < 8; i++) {
                  if (i < lib.config.volumn_background) {
                     this.parentNode.childNodes[i].innerHTML = '●';
                  }
                  else {
                     this.parentNode.childNodes[i].innerHTML = '○';
                  }
               }
               e.stopPropagation();
            },
            volumn_audio: function (e) {
               if (_status.dragged) return;
               var volume = this.link;
               if (volume === 1 && lib.config.volumn_audio === 1) {
                  volume = 0;
               }
               game.saveConfig('volumn_audio', volume);
               for (var i = 0; i < 8; i++) {
                  if (i < lib.config.volumn_audio) {
                     this.parentNode.childNodes[i].innerHTML = '●';
                  }
                  else {
                     this.parentNode.childNodes[i].innerHTML = '○';
                  }
               }
               e.stopPropagation();
            },
            volumn_click: function (e) {
               if (_status.dragged) return;
               var volume = this.link;
               if (volume === 1 && lib.config.volumn_click === 1) {
                  volume = 0;
               }
               game.saveConfig('volumn_click', volume);
               for (var i = 0; i < 8; i++) {
                  if (i < lib.config.volumn_click) {
                     this.parentNode.childNodes[i].innerHTML = '●';
                  }
                  else {
                     this.parentNode.childNodes[i].innerHTML = '○';
                  }
               }
               e.stopPropagation();
            },
            hoverpopped: function () {
               if (this._uiintro) {
                  return;
               }
               if (!this._poppedfunc) {
                  return;
               }
               ui.click.touchpop(this.forceclick);
               var uiintro = this._poppedfunc();
               if (!uiintro) return;
               if (ui.currentpopped && ui.currentpopped._uiintro) {
                  ui.currentpopped._uiintro.delete();
                  delete ui.currentpopped._uiintro;
               }
               ui.currentpopped = this;
               uiintro.classList.add('popped');
               uiintro.classList.add('hoverdialog');
               uiintro.classList.add('static');
               this._uiintro = uiintro;

               ui.window.appendChild(uiintro);
               var width = this._poppedwidth || 330;
               uiintro.style.width = width + 'px';
               if (get.is.phoneLayout()) {
                  width *= 1.3;
               }

               if (uiintro._heightfixed) {
                  uiintro.style.height = uiintro.content.scrollHeight + 'px';
               }
               else {
                  var height = this._poppedheight || uiintro.content.scrollHeight;
                  var height2 = ui.window.offsetHeight - 260;
                  if (get.is.phoneLayout()) {
                     height2 = (ui.window.offsetHeight - 80) / 1.3;
                  }
                  uiintro.style.height = Math.min(height2, height) + 'px';
               }
               if (get.is.phoneLayout()) {
                  uiintro.style.top = '70px';
               }
               else {
                  uiintro.style.top = '50px';
               }
               var left = this.parentNode.offsetLeft + this.offsetLeft + this.offsetWidth / 2 - width / 2;
               if (left < 10) {
                  left = 10;
               }
               else if (left + width > ui.window.offsetWidth - 10) {
                  left = ui.window.offsetWidth - width - 10;
               }
               uiintro.style.left = left + 'px';
               uiintro._poppedorigin = this;
               if (!lib.config.touchscreen) {
                  uiintro.addEventListener('mouseleave', ui.click.leavehoverpopped);
               }
               ui.click.shortcut(false);
               if (uiintro._onopen) {
                  uiintro._onopen();
               }
               if (this._paused2 && !lib.config.touchscreen) {
                  game.pause2();
                  uiintro.classList.add('static');
                  var layer = ui.create.div('.poplayer', ui.window);
                  var clicklayer = function (e) {
                     uiintro.delete();
                     layer.remove();
                     game.resume2();
                     e.stopPropagation();
                     return false;
                  }
                  uiintro.style.zIndex = 21;
                  layer.onclick = clicklayer;
                  layer.oncontextmenu = clicklayer;
                  uiintro.addEventListener('mouseleave', clicklayer);
                  uiintro.addEventListener('click', clicklayer);
               }
            },
            hoverpopped_leave: function () {
               this._poppedalready = false;
            },
            leavehoverpopped: function () {
               if (_status.dragged) return;
               if (this.classList.contains('noleave')) return;
               this.delete();
               var button = this._poppedorigin;

               var uiintro = this;
               setTimeout(function () {
                  if (button._uiintro == uiintro) {
                     delete button._uiintro;
                  }
               }, 500);

            },
            dierevive: function () {
               if (game.me.isDead()) {
                  game.me.revive(Math.max(1, game.me.maxHp));
                  game.me.draw(2);
               }
               else {
                  if (ui.revive) {
                     ui.revive.close();
                     delete ui.revive;
                  }
               }
            },
            dieswap: function () {
               if (game.me.isDead()) {
                  _status.clicked = true;
                  var i, translation, intro, str;
                  if (ui.intro) {
                     ui.intro.close();
                     if (ui.intro.source == 'dieswap') {
                        delete ui.intro;
                        ui.control.show();
                        game.resume2();
                        return;
                     }
                  }
                  game.pause2();
                  ui.control.hide();
                  ui.intro = ui.create.dialog();
                  ui.intro.source = 'dieswap';

                  var players = [];
                  for (var i = 0; i < game.players.length; i++) {
                     if (game.players[i].isAlive()) {
                        players.push(game.players[i]);
                     }
                  }
                  ui.intro.add(players, true);
                  var buttons = ui.intro.querySelectorAll('.button');
                  for (var i = 0; i < buttons.length; i++) {
                     buttons[i].addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.dieswap2);
                  }
               }
               else {
                  if (ui.swap) {
                     ui.swap.close();
                     delete ui.swap;
                  }
               }
            },
            dieswap2: function () {
               if (_status.dragged) return;
               game.swapPlayer(this.link);
            },
            touchconfirm: function () {
               _status.touchconfirmed = true;
               document.removeEventListener('touchstart', ui.click.touchconfirm);
            },
            windowtouchstart: function (e) {
               if (window.inSplash) return;
               if (e.touches[0] && lib.config.swipe && e.touches.length < 2) {
                  _status._swipeorigin = {
                     clientX: e.touches[0].clientX,
                     clientY: e.touches[0].clientY,
                     time: get.utc()
                  }
               }
               // if(window.ForceTouch&&!_status.paused2&&!_status.forcetouchinterval&&lib.config.enable_pressure){
               //     _status.forcetouchinterval=setInterval(ui.click.forcetouch,30);
               // }
            },
            windowtouchmove: function (e) {
               e.preventDefault();
               if (window.inSplash) return;
               if (_status.draggingroundmenu) {
                  delete _status._swipeorigin;
                  if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform && e.touches.length) {
                     var translate = ui.roundmenu._dragtransform.slice(0);
                     var dx = e.touches[0].clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                     var dy = e.touches[0].clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                     translate[0] += dx;
                     translate[1] += dy;
                     if (dx * dx + dy * dy > 100) {
                        if (ui.roundmenu._resetTimeout) {
                           clearTimeout(ui.roundmenu._resetTimeout);
                           delete ui.roundmenu._resetTimeout;
                        }
                     }
                     ui.roundmenu._dragtouches = e.touches[0];
                     ui.click.checkroundtranslate(translate);
                  }
                  _status.clicked = true;
               }
               else if (_status.draggingtouchdialog) {
                  delete _status._swipeorigin;
                  if (_status.draggingtouchdialog._dragorigin && _status.draggingtouchdialog._dragtransform && e.touches.length) {
                     var translate = _status.draggingtouchdialog._dragtransform.slice(0);
                     var dx = e.touches[0].clientX / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientX / game.documentZoom;
                     var dy = e.touches[0].clientY / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientY / game.documentZoom;
                     translate[0] += dx;
                     translate[1] += dy;
                     _status.draggingtouchdialog._dragtouches = e.touches[0];
                     ui.click.checkdialogtranslate(translate, _status.draggingtouchdialog);
                  }
                  _status.clicked = true;
               }
               else if (_status._swipeorigin && e.touches[0]) {
                  _status._swipeorigin.touches = e.touches[0];
               }

               if (_status.mousedragging && e.touches.length) {
                  e.preventDefault();
                  var item = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                  if (game.chess && ui.selected.cards.length) {
                     var itemtype = get.itemtype(item);
                     if (itemtype != 'card' && itemtype != 'button') {
                        var ex = e.touches[0].clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.touches[0].clientY / game.documentZoom - ui.arena.offsetTop;
                        for (var i = 0; i < game.players.length; i++) {
                           var left = -ui.chessContainer.chessLeft + ui.chess.offsetLeft + game.players[i].getLeft();
                           var top = -ui.chessContainer.chessTop + ui.chess.offsetTop + game.players[i].getTop();
                           var width = game.players[i].offsetWidth;
                           var height = game.players[i].offsetHeight;
                           if (ex > left && ex < left + width && ey > top && ey < top + height) {
                              item = game.players[i];
                              break;
                           }
                        }
                     }
                  }
                  while (item) {
                     if (lib.config.enable_touchdragline && _status.mouseleft && !game.chess) {
                        ui.canvas.width = ui.arena.offsetWidth;
                        ui.canvas.height = ui.arena.offsetHeight;
                        var ctx = ui.ctx;
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = 'rgba(0,0,0,0.3)';
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 3;
                        ctx.setLineDash([8, 2]);

                        ctx.beginPath();

                        ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);

                        if (_status.multitarget) {
                           for (var i = 0; i < _status.lastdragchange.length; i++) {
                              var exy = _status.lastdragchange[i]._lastdragchange;
                              ctx.lineTo(exy[0], exy[1]);
                           }
                        }
                        if (!_status.selectionfull) {
                           ctx.lineTo(e.touches[0].clientX / game.documentZoom - ui.arena.offsetLeft, e.touches[0].clientY / game.documentZoom - ui.arena.offsetTop);
                        }
                        ctx.stroke();
                        if (!_status.multitarget) {
                           for (var i = 0; i < _status.lastdragchange.length; i++) {
                              ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);
                              var exy = _status.lastdragchange[i]._lastdragchange;
                              ctx.lineTo(exy[0], exy[1]);
                              ctx.stroke();
                           }
                        }
                     }

                     if (item == _status.mousedragorigin) {
                        if (_status.mouseleft) {
                           _status.mousedragging = null;
                           _status.mousedragorigin = null;
                           _status.clicked = false;
                           game.uncheck();
                           game.check();
                           _status.clicked = true;
                        }
                        return;
                     }
                     var itemtype = get.itemtype(item);
                     if (itemtype == 'card' || itemtype == 'button' || itemtype == 'player') {
                        _status.mouseleft = true;
                        if (ui.selected.cards.length) {
                           ui.selected.cards[0].updateTransform(true, 100);
                        }
                        var ex = e.touches[0].clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.touches[0].clientY / game.documentZoom - ui.arena.offsetTop;
                        var exx = ex, eyy = ey;
                        if (game.chess) {
                           ex -= -ui.chessContainer.chessLeft + ui.chess.offsetLeft;
                           ey -= -ui.chessContainer.chessTop + ui.chess.offsetTop;
                        }
                        if (itemtype != 'player' || game.chess || (ex > item.offsetLeft && ex < item.offsetLeft + item.offsetWidth &&
                           ey > item.offsetTop && ey < item.offsetTop + item.offsetHeight)) {
                           var targetfixed = false;
                           if (itemtype == 'player') {
                              if (get.select(_status.event.selectTarget)[1] == -1) {
                                 targetfixed = true;
                              }
                           }
                           if (!targetfixed && item.classList.contains('selectable') && _status.dragstatuschanged != item) {
                              _status.mouseleft = true;
                              _status.dragstatuschanged = item;
                              _status.clicked = false;
                              _status.dragged = false;
                              var notbefore = itemtype == 'player' && !item.classList.contains('selected');
                              ui.click[itemtype].call(item);
                              if (item.classList.contains('selected')) {
                                 if (notbefore) {
                                    _status.lastdragchange.push(item);
                                    item._lastdragchange = [exx, eyy];
                                    if (lib.falseitem) {
                                       var from = [_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop];
                                       var to = [exx, eyy];
                                       var node = ui.create.div('.linexy.hidden');
                                       node.style.left = from[0] + 'px';
                                       node.style.top = from[1] + 'px';
                                       node.style.transitionDuration = '0.3s';
                                       node.style.backgroundColor = 'white';
                                       var dy = to[1] - from[1];
                                       var dx = to[0] - from[0];
                                       var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
                                       if (dx >= 0) {
                                          if (dy <= 0) {
                                             deg += 90;
                                          }
                                          else {
                                             deg = 90 - deg;
                                          }
                                       }
                                       else {
                                          if (dy <= 0) {
                                             deg = 270 - deg;
                                          }
                                          else {
                                             deg += 270;
                                          }
                                       }
                                       node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(0)';
                                       node.style.height = get.xyDistance(from, to) + 'px';
                                       if (game.chess) {
                                          ui.chess.appendChild(node);
                                       }
                                       else {
                                          ui.arena.appendChild(node);
                                       }
                                       ui.refresh(node);
                                       node.show();
                                       node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(1)';
                                       ui.touchlines.push(node);
                                       node._origin = item;
                                    }
                                 }
                              }
                              else {
                                 _status.lastdragchange.remove(item);
                                 for (var i = 0; i < ui.touchlines.length; i++) {
                                    if (ui.touchlines[i]._origin == item) {
                                       ui.touchlines[i].delete();
                                       ui.touchlines.splice(i--, 1);
                                    }
                                 }
                              }
                              _status.selectionfull = true;
                              if (_status.event.filterButton && ui.selected.buttons.length < get.select(_status.event.selectButton)[1]) {
                                 _status.selectionfull = false;
                              }
                              else if (_status.event.filterCard && ui.selected.cards.length < get.select(_status.event.selectCard)[1]) {
                                 _status.selectionfull = false;
                              }
                              else if (_status.event.filterTarget && ui.selected.targets.length < get.select(_status.event.selectTarget)[1]) {
                                 _status.selectionfull = false;
                              }
                           }
                        }
                        return;
                     }
                     item = item.parentNode;
                  }
                  _status.mouseleft = true;
                  _status.dragstatuschanged = null;
               }
            },
            windowtouchend: function (e) {
               delete _status.force;
               // if(_status.forcetouchinterval){
               //     clearInterval(_status.forcetouchinterval);
               //     delete _status.forcetouchinterval;
               // }
               if (window.inSplash) return;
               if (e.touches.length == 1 && !_status.dragged && !_status.draggingtouchdialog) {
                  ui.click.pause();
               }
               if (_status.draggingroundmenu) {
                  delete _status._swipeorigin;
                  if (ui.roundmenu._resetTimeout) {
                     clearTimeout(ui.roundmenu._resetTimeout);
                     delete ui.roundmenu._resetTimeout;
                  }
                  var translate;
                  if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform && ui.roundmenu._dragtouches) {
                     var dx = ui.roundmenu._dragtouches.clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                     var dy = ui.roundmenu._dragtouches.clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                     if (dx * dx + dy * dy < 1000) {
                        ui.click.roundmenu();
                        ui.roundmenu._dragtransform = ui.roundmenu._dragorigintransform;
                        translate = ui.roundmenu._dragtransform;
                        ui.roundmenu.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px)';
                     }
                     else {
                        translate = ui.roundmenu._dragtransform;
                        translate[0] += dx;
                        translate[1] += dy;
                        ui.click.checkroundtranslate();
                     }
                     delete ui.roundmenu._dragorigin;
                  }
                  else {
                     ui.click.roundmenu();
                  }
                  _status.clicked = false;
                  game.saveConfig('roundmenu_transform', translate);
                  delete _status.draggingroundmenu;
               }
               else if (_status.draggingtouchdialog) {
                  delete _status._swipeorigin;
                  var translate;
                  if (_status.draggingtouchdialog._dragorigin && _status.draggingtouchdialog._dragtransform && _status.draggingtouchdialog._dragtouches) {
                     var dx = _status.draggingtouchdialog._dragtouches.clientX / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientX / game.documentZoom;
                     var dy = _status.draggingtouchdialog._dragtouches.clientY / game.documentZoom - _status.draggingtouchdialog._dragorigin.clientY / game.documentZoom;
                     translate = _status.draggingtouchdialog._dragtransform;
                     translate[0] += dx;
                     translate[1] += dy;
                     ui.click.checkdialogtranslate(null, _status.draggingtouchdialog);

                     delete _status.draggingtouchdialog._dragorigin;
                  }
                  _status.clicked = false;
                  game.saveConfig('dialog_transform', translate);
                  delete _status.draggingtouchdialog;
                  _status.justdragged = true;
                  setTimeout(function () {
                     _status.justdragged = false;
                  }, 500);
               }
               else if (_status._swipeorigin && !_status.paused2 && !_status.mousedragging && _status._swipeorigin.touches && !_status.filterCharacter) {
                  if (get.utc() - _status._swipeorigin.time < 500) {
                     var dx = _status._swipeorigin.touches.clientX / game.documentZoom - _status._swipeorigin.clientX / game.documentZoom;
                     var dy = _status._swipeorigin.touches.clientY / game.documentZoom - _status._swipeorigin.clientY / game.documentZoom;
                     var goswipe = function (action) {
                        game.closeConnectMenu();
                        switch (action) {
                           case 'system':
                              game.closePopped();
                              ui.system1.classList.add('shown');
                              ui.system2.classList.add('shown');
                              game.closeMenu();
                              ui.click.shortcut();
                              break;
                           case 'menu':
                              if (ui.click.configMenu) {
                                 game.closePopped();
                                 game.pause2();
                                 ui.click.configMenu();
                                 ui.system1.classList.remove('shown');
                                 ui.system2.classList.remove('shown');
                              }
                              break;
                           case 'pause':
                              ui.click.pause();
                              break;
                           case 'auto':
                              ui.click.auto();
                              break;
                           case 'chat':
                              game.closeMenu();
                              if (ui.chatButton) {
                                 ui.click.hoverpopped.call(ui.chatButton);
                              }
                              break;
                        }
                     }
                     if (Math.abs(dx) < 100) {
                        if (dy < -200) {
                           goswipe(lib.config.swipe_up);
                        }
                        else if (dy > 200) {
                           goswipe(lib.config.swipe_down);
                        }
                     }
                     else if (Math.abs(dy) < 100) {
                        if (dx < -200) {
                           goswipe(lib.config.swipe_left);
                        }
                        else if (dx > 200) {
                           goswipe(lib.config.swipe_right);
                        }
                     }
                  }
               }
               var tmpflag = false;
               _status.mousedown = false;
               _status.clicked = false;
               if (_status.mousedragging && _status.mouseleft) {
                  if (game.check()) {
                     if (ui.confirm) {
                        ui.confirm.close();
                     }
                     ui.click.ok();
                     ui.canvas.width = ui.arena.offsetWidth;
                     ui.canvas.height = ui.arena.offsetHeight;
                  }
                  else {
                     game.uncheck();
                     game.check();
                  }
               }
               else if (_status.mousedragging && _status.mousedragorigin) {
                  tmpflag = _status.mousedragorigin;
               }
               _status.lastdragchange.length = 0;
               _status.mousedragging = null;
               _status.mouseleft = false;
               _status.mousedragorigin = null;
               _status.dragstatuschanged = false;
               while (ui.touchlines.length) {
                  ui.touchlines.shift().delete();
               }
               if (tmpflag) {
                  game.check();
               }
               _status.dragged = false;
               _status.clicked = false;
            },
            checkroundtranslate: function (translate) {
               var translate = translate || ui.roundmenu._dragtransform;
               if (translate[1] + ui.roundmenu._position[1] + 50 + ui.arena.offsetTop > ui.window.offsetHeight) {
                  translate[1] = ui.window.offsetHeight - (ui.roundmenu._position[1] + 50) - ui.arena.offsetTop;
               }
               else if (translate[1] + ui.roundmenu._position[1] + ui.arena.offsetTop < 0) {
                  translate[1] = -ui.roundmenu._position[1] - ui.arena.offsetTop;
               }
               if (translate[0] + ui.roundmenu._position[0] + 50 + ui.arena.offsetLeft > ui.window.offsetWidth) {
                  translate[0] = ui.window.offsetWidth - (ui.roundmenu._position[0] + 50) - ui.arena.offsetLeft;
               }
               else if (translate[0] + ui.roundmenu._position[0] + ui.arena.offsetLeft < 0) {
                  translate[0] = -ui.roundmenu._position[0] - ui.arena.offsetLeft;
               }
               ui.roundmenu.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px)';
            },
            checkdialogtranslate: function (translate, dialog) {
               var translate = translate || dialog._dragtransform;
               if (Math.sqrt(translate[0] * translate[0] + translate[1] * translate[1]) < 10) {
                  translate[0] = 0;
                  translate[1] = 0;
               }
               dialog.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px)';
            },
            windowmousewheel: function (e) {
               _status.tempunpopup = e;
            },
            windowmousemove: function (e) {
               if (window.inSplash) return;
               if (_status.tempunpopup) {
                  if (get.evtDistance(_status.tempunpopup, e) > 5) {
                     delete _status.tempunpopup;
                  }
               }
               if (e.button == 2) return;
               var dialogs = document.querySelectorAll('#window>.dialog.popped:not(.static)');
               for (var i = 0; i < dialogs.length; i++) {
                  dialogs[i].delete();
               }
               var node = _status.currentmouseenter;
               var sourceitem = document.elementFromPoint(e.clientX, e.clientY);
               if (game.chess && ui.selected.cards.length) {
                  var itemtype = get.itemtype(sourceitem);
                  if (itemtype != 'card' && itemtype != 'button') {
                     for (var i = 0; i < game.players.length; i++) {
                        var ex = e.clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.clientY / game.documentZoom - ui.arena.offsetTop;
                        var left = -ui.chessContainer.chessLeft + ui.chess.offsetLeft + game.players[i].getLeft();
                        var top = -ui.chessContainer.chessTop + ui.chess.offsetTop + game.players[i].getTop();
                        var width = game.players[i].offsetWidth;
                        var height = game.players[i].offsetHeight;
                        if (ex > left && ex < left + width && ey > top && ey < top + height) {
                           sourceitem = game.players[i];
                           break;
                        }
                     }
                  }
               }
               var item = sourceitem;
               if (_status.mousedragging) {
                  e.preventDefault();
                  if (lib.config.enable_dragline) {
                     // var i=0;
                     // var startPoint0=[_status.mousedragging.clientX/game.documentZoom-ui.arena.offsetLeft,_status.mousedragging.clientY/game.documentZoom-ui.arena.offsetTop];
                     // var startPoint=startPoint0;
                     // var endPoint;
                     // if(_status.multitarget){
                     //     for(;i<_status.lastdragchange.length;i++){
                     //         var exy=_status.lastdragchange[i]._lastdragchange;
                     //         endPoint=[exy[0],exy[1]];
                     //         _status.dragline[i]=game.linexy(startPoint.concat(endPoint),'drag',_status.dragline[i]);
                     //         startPoint=endPoint;
                     //     }
                     // }
                     // if(!_status.selectionfull){
                     //     endPoint=[e.clientX/game.documentZoom-ui.arena.offsetLeft,e.clientY/game.documentZoom-ui.arena.offsetTop];
                     //     _status.dragline[i]=game.linexy(startPoint.concat(endPoint),'drag',_status.dragline[i]);
                     //     startPoint=endPoint;
                     //     i++;
                     // }
                     // if(!_status.multitarget){
                     //     for(var j=0;j<_status.lastdragchange.length;j++){
                     //         i+=j;
                     //         var exy=_status.lastdragchange[j]._lastdragchange;
                     //         _status.dragline[i]=game.linexy(startPoint0.concat([exy[0],exy[1]]),'drag',_status.dragline[i]);
                     //     }
                     // }
                     // var remained=_status.dragline.splice(i+1);
                     // for(var j=0;j<remained.length;j++){
                     //     if(remained[j]) remained[j].remove();
                     // }

                     ui.canvas.width = ui.arena.offsetWidth;
                     ui.canvas.height = ui.arena.offsetHeight;
                     var ctx = ui.ctx;
                     ctx.shadowBlur = 5;
                     ctx.shadowColor = 'rgba(0,0,0,0.3)';
                     ctx.strokeStyle = 'white';
                     ctx.lineWidth = 3;
                     ctx.setLineDash([8, 2]);

                     ctx.beginPath();

                     ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);
                     if (_status.multitarget) {
                        for (var i = 0; i < _status.lastdragchange.length; i++) {
                           var exy = _status.lastdragchange[i]._lastdragchange;
                           ctx.lineTo(exy[0], exy[1]);
                        }
                     }
                     if (!_status.selectionfull) {
                        ctx.lineTo(e.clientX / game.documentZoom - ui.arena.offsetLeft, e.clientY / game.documentZoom - ui.arena.offsetTop);
                     }
                     ctx.stroke();
                     if (!_status.multitarget) {
                        for (var i = 0; i < _status.lastdragchange.length; i++) {
                           ctx.moveTo(_status.mousedragging.clientX / game.documentZoom - ui.arena.offsetLeft, _status.mousedragging.clientY / game.documentZoom - ui.arena.offsetTop);
                           var exy = _status.lastdragchange[i]._lastdragchange;
                           ctx.lineTo(exy[0], exy[1]);
                           ctx.stroke();
                        }
                     }
                  }

                  while (item) {
                     if (item == _status.mousedragorigin) {
                        if (_status.mouseleft) {
                           _status.mousedragging = null;
                           _status.mousedragorigin = null;
                           _status.clicked = false;
                           if (_status.event.type == 'phase' && !_status.event.skill && ui.confirm) {
                              ui.confirm.classList.add('removing');
                           }
                           game.uncheck();
                           game.check();
                           _status.clicked = true;
                        }
                        return;
                     }
                     var itemtype = get.itemtype(item);
                     if (itemtype == 'card' || itemtype == 'button' || itemtype == 'player') {
                        _status.mouseleft = true;
                        if (ui.selected.cards.length) {
                           ui.selected.cards[0].updateTransform(true, 100);
                        }
                        var ex = e.clientX / game.documentZoom - ui.arena.offsetLeft;
                        var ey = e.clientY / game.documentZoom - ui.arena.offsetTop;
                        var exx = ex, eyy = ey;
                        if (game.chess) {
                           ex -= -ui.chessContainer.chessLeft + ui.chess.offsetLeft;
                           ey -= -ui.chessContainer.chessTop + ui.chess.offsetTop;
                        }
                        if (itemtype != 'player' || game.chess || (ex > item.offsetLeft && ex < item.offsetLeft + item.offsetWidth &&
                           ey > item.offsetTop && ey < item.offsetTop + item.offsetHeight)) {
                           var targetfixed = false;
                           if (itemtype == 'player') {
                              if (get.select(_status.event.selectTarget)[1] == -1) {
                                 targetfixed = true;
                              }
                           }
                           if (!targetfixed && item.classList.contains('selectable') && _status.dragstatuschanged != item) {
                              _status.mouseleft = true;
                              _status.dragstatuschanged = item;
                              _status.clicked = false;
                              var notbefore = itemtype == 'player' && !item.classList.contains('selected');
                              ui.click[itemtype].call(item);
                              if (item.classList.contains('selected')) {
                                 if (notbefore) {
                                    _status.lastdragchange.push(item);
                                    item._lastdragchange = [exx, eyy];
                                 }
                              }
                              else {
                                 _status.lastdragchange.remove(item);
                              }
                              _status.selectionfull = true;
                              if (_status.event.filterButton && ui.selected.buttons.length < get.select(_status.event.selectButton)[1]) {
                                 _status.selectionfull = false;
                              }
                              else if (_status.event.filterCard && ui.selected.cards.length < get.select(_status.event.selectCard)[1]) {
                                 _status.selectionfull = false;
                              }
                              else if (_status.event.filterTarget && ui.selected.targets.length < get.select(_status.event.selectTarget)[1]) {
                                 _status.selectionfull = false;
                              }
                           }
                        }
                        return;
                     }
                     item = item.parentNode;
                  }
                  if (!_status.mouseleft) {
                     _status.mouseleft = true;
                     game.check();
                     for (var i = 0; i < ui.selected.cards.length; i++) {
                        ui.selected.cards[i].updateTransform(true);
                     }
                  }
                  _status.dragstatuschanged = null;
               }
               else {
                  while (item) {
                     if (item == node && !node._mouseentercreated) {
                        ui.click.mouseentercancel();
                        var hoveration;
                        if (typeof node._hoveration == 'number') {
                           hoveration = node._hoveration;
                        }
                        else {
                           hoveration = parseInt(lib.config.hoveration);
                           if (node.classList.contains('button') ||
                              (node.parentNode && node.parentNode.parentNode) == ui.me) {
                              hoveration += 500;
                           }
                        }
                        _status._mouseentertimeout = setTimeout(function () {
                           if (_status.currentmouseenter != node || node._mouseentercreated || _status.tempunpopup ||
                              _status.mousedragging || _status.mousedown || !node.offsetWidth || !node.offsetHeight) {
                              return;
                           }
                           if (node._hoverfunc && !node._nopup) {
                              var dialog = node._hoverfunc.call(node, e);
                              if (dialog) {
                                 dialog.classList.add('popped');
                                 ui.window.appendChild(dialog);
                                 lib.placePoppedDialog(dialog, e);
                                 if (node._hoverwidth) {
                                    dialog.style.width = node._hoverwidth + 'px';
                                    dialog._hovercustomed = true;
                                 }
                                 node._mouseenterdialog = dialog;
                                 node._mouseentercreated = true;
                              }
                           }
                        }, hoveration);
                        break;
                     }
                     item = item.parentNode;
                  }
                  if (_status.draggingdialog) {
                     var ddialog = _status.draggingdialog;
                     if (ddialog._dragorigin && ddialog._dragtransform) {
                        var translate = ddialog._dragtransform.slice(0);
                        translate[0] += e.clientX / game.documentZoom - ddialog._dragorigin.clientX / game.documentZoom;
                        translate[1] += e.clientY / game.documentZoom - ddialog._dragorigin.clientY / game.documentZoom;
                        ui.click.checkdialogtranslate(translate, ddialog);
                     }
                     _status.clicked = true;
                  }
                  if (_status.draggingroundmenu) {
                     if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform) {
                        var translate = ui.roundmenu._dragtransform.slice(0);
                        translate[0] += e.clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                        translate[1] += e.clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                        ui.click.checkroundtranslate(translate);
                     }
                     _status.clicked = true;
                  }
               }
            },
            windowmousedown: function (e) {
               if (window.inSplash) return;
               if (!ui.window) return;
               if (e.button == 2) return;
               _status.mousedown = true;
               var dialogs = ui.window.querySelectorAll('#window>.dialog.popped:not(.static)');
               for (var i = 0; i < dialogs.length; i++) {
                  dialogs[i].delete();
               }
               var sourceitem = document.elementFromPoint(e.clientX, e.clientY);
               var item = sourceitem;
               while (item) {
                  var itemtype = get.itemtype(item);
                  if (itemtype == 'button') break;
                  if (itemtype == 'dialog' &&
                     !item.classList.contains('popped') &&
                     !item.classList.contains('fixed')) {
                     var ddialog = item;
                     _status.draggingdialog = ddialog;
                     ddialog._dragorigin = e;
                     if (!ddialog._dragtransform) {
                        ddialog._dragtransform = [0, 0];
                     }
                     return;
                  }
                  if (item == ui.roundmenu) {
                     _status.draggingroundmenu = true;
                     ui.roundmenu._dragorigin = e;
                     if (!ui.roundmenu._dragtransform) {
                        ui.roundmenu._dragtransform = [0, 0];
                     }
                     return;
                  }
                  item = item.parentNode;
               }

               var evt = _status.event;
               if (!lib.config.enable_drag) return;
               if (!ui.arena.classList.contains('selecting')) return;
               if (!evt.isMine()) return;

               item = sourceitem;
               while (item) {
                  var itemtype = get.itemtype(item);
                  if (itemtype == 'card' || itemtype == 'button' || itemtype == 'player') {
                     if (item.classList.contains('selectable') &&
                        !item.classList.contains('selected') &&
                        !item.classList.contains('noclick')) {
                        _status.clicked = false;
                        ui.click[itemtype].call(item);
                        if (item.classList.contains('selected')) {
                           _status.mousedragging = e;
                           _status.mousedragorigin = item;
                           _status.mouseleft = false;
                           _status.selectionfull = false;
                           _status.multitarget = false;
                           _status.lastmouseutc = get.utc();
                           ui.arena.classList.add('dragging');
                        }
                     }
                     return;
                  }
                  item = item.parentNode;
               }
            },
            cardtouchstart: function (e) {
               if (e.touches.length != 1) return;
               if (!lib.config.enable_drag) return;
               if (!this.parentNode) return;
               if (!this.parentNode.parentNode) return;
               if (this.parentNode.parentNode.parentNode != ui.me) return;
               if (this.parentNode.parentNode.classList.contains('scrollh')) return;
               if (this.classList.contains('selectable') &&
                  !this.classList.contains('selected') &&
                  !this.classList.contains('noclick')) {
                  this._waitingfordrag = {
                     clientX: e.touches[0].clientX,
                     clientY: e.touches[0].clientY
                  };
               }
            },
            cardtouchmove: function (e) {
               ui.click.longpresscancel.call(this);
               if (this._waitingfordrag) {
                  var drag = this._waitingfordrag;
                  _status.clicked = false;
                  _status.touchnocheck = true;
                  ui.click.card.call(this);
                  _status.touchnocheck = false;
                  if (this.classList.contains('selected')) {
                     _status.mousedragging = drag;
                     _status.mousedragorigin = this;
                     _status.mouseleft = false;
                     _status.selectionfull = false;
                     _status.multitarget = false;
                  }
                  delete this._waitingfordrag;
               }
            },
            windowmouseup: function (e) {
               delete _status.force;
               // if(_status.forcetouchinterval){
               //     clearInterval(_status.forcetouchinterval);
               //     delete _status.forcetouchinterval;
               // }
               if (window.inSplash) return;
               if (_status.draggingdialog) {
                  var ddialog = _status.draggingdialog;
                  var translate;
                  if (ddialog._dragorigin && ddialog._dragtransform) {
                     translate = ddialog._dragtransform;
                     translate[0] += e.clientX / game.documentZoom - ddialog._dragorigin.clientX / game.documentZoom;
                     translate[1] += e.clientY / game.documentZoom - ddialog._dragorigin.clientY / game.documentZoom;
                     ui.click.checkdialogtranslate(null, ddialog);
                     delete ddialog._dragorigin;
                  }
                  game.saveConfig('dialog_transform', translate);
                  delete _status.draggingdialog;
               }
               if (_status.draggingroundmenu) {
                  var translate;
                  if (ui.roundmenu._dragorigin && ui.roundmenu._dragtransform) {
                     var dx = e.clientX / game.documentZoom - ui.roundmenu._dragorigin.clientX / game.documentZoom;
                     var dy = e.clientY / game.documentZoom - ui.roundmenu._dragorigin.clientY / game.documentZoom;
                     if (dx * dx + dy * dy < 25) {
                        ui.click.roundmenu();
                     }
                     translate = ui.roundmenu._dragtransform;
                     translate[0] += dx;
                     translate[1] += dy;
                     ui.click.checkroundtranslate();
                     delete ui.roundmenu._dragorigin;
                  }
                  game.saveConfig('roundmenu_transform', translate);
                  delete _status.draggingroundmenu;
               }
               if (e.button == 2) {
                  if (_status.mousedragging) {
                     _status.mousedragging = null;
                     _status.mouseleft = false;
                     _status.mousedragorigin = null;
                     _status.dragstatuschanged = false;
                     game.uncheck();
                     game.check();
                     _status.noright = true;
                  }
               }
               else {
                  var tmpflag = false;
                  _status.mousedown = false;
                  for (var i = 0; i < ui.selected.cards.length; i++) {
                     ui.selected.cards[i].updateTransform(true);
                  }
                  if (_status.mousedragging && _status.mouseleft) {
                     if (game.check()) {
                        if (ui.confirm) {
                           ui.confirm.close();
                        }
                        ui.click.ok();
                     }
                     else {
                        game.uncheck();
                        game.check();
                     }
                  }
                  else if (_status.mousedragging && _status.mousedragorigin) {
                     tmpflag = _status.mousedragorigin;
                  }
                  _status.lastdragchange.length = 0;
                  _status.mousedragging = null;
                  _status.mouseleft = false;
                  _status.mousedragorigin = null;
                  _status.dragstatuschanged = false;
                  if (ui.arena) {
                     ui.canvas.width = ui.arena.offsetWidth;
                     ui.canvas.height = ui.arena.offsetHeight;
                  }
                  if (tmpflag) {
                     ui.click[get.itemtype(tmpflag)].call(tmpflag);
                     game.check();
                  }
                  // ui.updatehl();
               }
               if (ui.arena) {
                  ui.arena.classList.remove('dragging');
               }
            },
            mousemove: function () {
               if (!lib.config.hover_handcard && this.parentNode && this.parentNode.parentNode == ui.me) {
                  return;
               }
               if (!_status.currentmouseenter) {
                  _status.currentmouseenter = this;
               }
            },
            mouseenter: function () {
               if (!lib.config.hover_handcard && this.parentNode && this.parentNode.parentNode == ui.me) {
                  return;
               }
               _status.currentmouseenter = this;
            },
            mouseleave: function () {
               ui.click.mouseentercancel();
               if (_status.currentmouseenter == this) {
                  _status.currentmouseenter = null;
               }
               this._mouseentercreated = false;
            },
            mousedown: function () {
               ui.click.mouseentercancel();
               if (_status.currentmouseenter == this) {
                  _status.currentmouseenter = null;
               }
               this._mouseentercreated = true;
            },
            mouseentercancel: function () {
               if (_status._mouseentertimeout) {
                  clearTimeout(_status._mouseentertimeout);
                  delete _status._mouseentertimeout
               }
            },
            hoverplayer: function (e) {
               var node = get.nodeintro(this, true);
               if (node) node.style.zIndex = 21;
               return node;
            },
            longpressdown: function (e) {
               if (_status.longpressed) return;
               if (this._longpresstimeout) {
                  clearTimeout(this._longpresstimeout);
               }
               if (lib.config.longpress_info) {
                  this._longpresstimeout = setTimeout(ui.click.longpresscallback, 500);
               }
               this._longpressevent = e;
               if (_status.longpressing && _status.longpressing != this) {
                  ui.click.longpresscancel.call(_status.longpressing);
               }
               // if(window.ForceTouch&&!_status.forcetouchinterval&&lib.config.enable_pressure){
               //     _status.forcetouchinterval=setInterval(ui.click.forcetouch,30);
               // }
               _status.longpressing = this;
            },
            longpresscallback: function () {
               if (!_status.longpressing) return;
               var node = _status.longpressing;
               var func = node._longpresscallback;
               var e = node._longpressevent;
               if (!func || !e) return;
               clearTimeout(node._longpresstimeout);
               _status.force = true;
               delete _status.longpressing;
               delete node._longpresstimeout;
               delete node._longpressevent;
               if (_status.mousedragging && _status.mouseleft) return;
               if (!_status.longpressed) {
                  _status.longpressed = true;
                  setTimeout(function () {
                     _status.longpressed = false;
                  }, 500);
                  func.call(node, e);
                  if (lib.config.touchscreen && lib.config.enable_drag && !node._waitingfordrag) {
                     _status.mousedragging = null;
                     _status.mousedragorigin = null;
                     _status.clicked = false;
                     game.uncheck();
                     game.check();
                     _status.clicked = true;
                  }
                  delete node._waitingfordrag;
                  ui.click.touchpop();
               }
            },
            longpresscancel: function () {
               if (this._longpresstimeout) {
                  clearTimeout(this._longpresstimeout);
                  delete this._longpresstimeout;
               }
               delete this._longpressevent;
               if (_status.longpressing == this) {
                  delete _status.longpressing;
               }
            },
            window: function () {
               var clicked = _status.clicked;
               var dialogtouched = false;
               if (_status.dialogtouched) {
                  _status.dialogtouched = false;
                  dialogtouched = true;
               }
               if (_status.dragged) return;
               if (_status.touchpopping) return;
               if (_status.reloading) return;
               if (_status.clicked || _status.clicked2) {
                  _status.clicked = false;
                  _status.clicked2 = false;
               }
               else {
                  if (_status.clickingidentity) {
                     for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                        _status.clickingidentity[1][i].delete();
                        _status.clickingidentity[1][i].style.transform = '';
                     }
                     delete _status.clickingidentity;
                  }
                  if (!_status.event.isMine) return;
                  if (ui.controls.length) {
                     ui.updatec();
                  }
                  if (_status.editing) {
                     if (_status.editing.innerHTML.length) {
                        _status.editing.link = _status.editing.innerHTML;
                     }
                     _status.editing.innerHTML = get.translation(_status.editing.link);
                     delete _status.editing;
                  }
                  else if (_status.choosing) {
                     if (!_status.choosing.expand) {
                        _status.choosing.parentNode.style.height = '';
                        _status.choosing.nextSibling.delete();
                        _status.choosing.previousSibling.show();
                        delete _status.choosing;
                     }
                  }
                  else if (ui.intro) {
                     ui.intro.close();
                     delete ui.intro;
                     ui.control.show();
                     game.resume2();
                  }
                  else if ((_status.event.isMine() || _status.event.forceMine) && !dialogtouched) {
                     if (_status.event.custom && _status.event.custom.replace.window) {
                        _status.event.custom.replace.window();
                     }
                     else {
                        if (_status.event.skill && _status.event.name == 'chooseToUse') {
                           ui.click.cancel();
                        }
                        else {
                           game.uncheck();
                           game.check();
                        }
                     }
                  }
                  if (!ui.shortcut.classList.contains('hidden')) {
                     ui.click.shortcut(false);
                  }
                  if (get.is.phoneLayout() && ui.menuContainer && ui.menuContainer.classList.contains('hidden')) {
                     if (ui.system2.classList.contains('shown')) {
                        _status.removinground = true;
                        setTimeout(function () {
                           _status.removinground = false;
                        }, 200);
                     }
                     ui.arena.classList.remove('phonetop');
                     ui.system1.classList.remove('shown');
                     ui.system2.classList.remove('shown');
                     // if(ui.chessinfo){
                     //     ui.chessinfo.classList.remove('zoomed');
                     // }
                  }
               }
               if (_status.tempunpop) {
                  _status.tempunpop = false;
               }
               else {
                  game.closePopped();
               }
               if (_status.event.custom && _status.event.custom.add.window) {
                  _status.event.custom.add.window(clicked);
               }
            },
            toggle: function () {
               if (_status.dragged) return;
               if (this.parentNode.classList.contains('disabled')) return;
               _status.tempunpop = true;
               if (this.link) {
                  this.link = false;
                  this.classList.remove('on');
                  if (this.additionalCommand) this.additionalCommand(false, this.parentNode);
               }
               else {
                  this.link = true;
                  this.classList.add('on');
                  if (this.additionalCommand) this.additionalCommand(true, this.parentNode);
               }
            },
            editor: function () {
               if (_status.dragged) return;
               if (_status.editing) return;
               _status.clicked = true;
               this.innerHTML = '';
               _status.editing = this;
               if (this.additionalCommand) this.additionalCommand(this);
            },
            switcher: function () {
               if (_status.dragged) return;
               if (this.parentNode.classList.contains('disabled')) return;
               if (_status.choosing) return;
               _status.clicked = true;
               _status.tempunpop = true;
               this.previousSibling.hide();
               var node = ui.create.div('.switcher', this.parentNode).animate('start');
               for (var i = 0; i < this.choice.length; i++) {
                  var choice = ui.create.div('.pointerdiv', node);
                  choice.innerHTML = get.translation(this.choice[i]);
                  choice.link = this.choice[i];
                  choice.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.choice);
               }
               // this.parentNode.style.height=(node.offsetHeight)+'px';
               _status.choosing = this;
               if (!_status.choosing.expand) {
                  _status.choosing.expand = true;
                  setTimeout(function () {
                     _status.choosing.expand = false;
                  }, 500);
               }
            },
            choice: function () {
               if (_status.dragged) return;
               if (!_status.choosing) return;
               _status.choosing.link = this.link;
               _status.choosing.innerHTML = get.translation(this.link);
               this.parentNode.parentNode.style.height = '';
               this.parentNode.delete();
               _status.choosing.previousSibling.show();
               delete _status.choosing;
               if (this.parentNode.parentNode.querySelector('.toggle').additionalCommand) {
                  this.parentNode.parentNode.querySelector('.toggle').additionalCommand(this.link, this.parentNode.parentNode);
               }
            },
            button: function () {
               if (_status.dragged) return;
               if (_status.clicked) return;
               if (_status.tempNoButton) return;
               if (_status.draggingtouchdialog) return;
               if (this.classList.contains('noclick')) return;
               if (_status.justdragged) return;
               _status.clicked = true;
               var custom = _status.event.custom;
               if (custom && custom.replace.button) {
                  custom.replace.button(this);
                  return;
               }
               if (!_status.event.isMine()) return;
               if (this.classList.contains('selectable') == false) return;
               if (this.classList.contains('selected')) {
                  ui.selected.buttons.remove(this);
                  this.classList.remove('selected');
                  if (_status.multitarget || _status.event.complexSelect) {
                     game.uncheck();
                     game.check();
                  }
               }
               else {
                  this.classList.add('selected');
                  ui.selected.buttons.add(this);
               }
               if (custom.add.button) {
                  custom.add.button();
               }
               game.check();
            },
            touchintro: function () {
               var rect = this.getBoundingClientRect();
               ui.click.touchpop();
               ui.click.intro.call(this, {
                  clientX: rect.left + 18,
                  clientY: rect.top + 12
               });
               _status.clicked = false;
            },
            /**
             * 卡牌点击事件
             * @callback
             */
            card: function () {
               delete this._waitingfordrag;
               if (_status.dragged) return;
               if (_status.clicked) return;
               if (ui.intro) return;
               _status.clicked = true;
               if (this.parentNode && (this.parentNode.classList.contains('judges') || this.parentNode.classList.contains('marks'))) {
                  var rect = this.getBoundingClientRect();
                  ui.click.touchpop();
                  ui.click.intro.call(this, {
                     clientX: rect.left + 18,
                     clientY: rect.top + 12
                  });
                  _status.clicked = false;
                  return;
               }
               var custom = _status.event.custom;
               if (custom && custom.replace.card) {
                  custom.replace.card(this);
                  return;
               }
               if (this.classList.contains('selectable') == false) return;
               if (this.classList.contains('selected')) {
                  ui.selected.cards.remove(this);
                  if (_status.multitarget || _status.event.complexSelect) {
                     game.uncheck();
                     game.check();
                  }
                  else {
                     this.classList.remove('selected');
                     this.updateTransform();
                  }
               }
               else {
                  ui.selected.cards.add(this);
                  this.classList.add('selected');
                  this.updateTransform(true);
               }
               if (game.chess && get.config('show_range') && !_status.event.skill && this.classList.contains('selected') &&
                  _status.event.isMine() && _status.event.name == 'chooseToUse') {
                  var player = _status.event.player;
                  var range = get.info(this).range;
                  if (range) {
                     if (typeof range.attack === 'number') {
                        player.createRangeShadow(Math.min(8, player.getAttackRange(true) + range.attack - 1));
                     }
                     else if (typeof range.global === 'number') {
                        player.createRangeShadow(Math.min(8, player.getGlobalFrom() + range.global));
                     }
                  }
               }
               if (custom.add.card) {
                  custom.add.card();
               }
               game.check();

               if (lib.config.popequip && get.is.phoneLayout() &&
                  arguments[0] != 'popequip' && ui.arena && ui.arena.classList.contains('selecting') &&
                  this.parentNode && this.parentNode.classList.contains('popequip')) {
                  var rect = this.getBoundingClientRect();
                  ui.click.touchpop();
                  ui.click.intro.call(this.parentNode, {
                     clientX: rect.left + 18,
                     clientY: rect.top + 12
                  });
               }
            },
            avatar: function () {
               if (!lib.config.doubleclick_intro) return;
               if (this.playerEle.isUnseen(0)) return;
               if (!lib.character[this.playerEle.name]) return;
               if (!ui.menuContainer) return;
               var avatar = this;
               var player = this.playerEle;
               if (!game.players.contains(player) && !game.dead.contains(player)) return;
               if (!this._doubleClicking) {
                  this._doubleClicking = true;
                  setTimeout(function () {
                     avatar._doubleClicking = false;
                  }, 500);
                  return;
               }
               // ui.click.skin(this,player.name);
               game.pause2();
               ui.click.charactercard(player.name, null, null, true, this);
            },
            avatar2: function () {
               if (!lib.config.doubleclick_intro) return;
               if (this.playerEle.classList.contains('unseen2')) return;
               if (!lib.character[this.playerEle.name2]) return;
               if (!ui.menuContainer) return;
               var avatar = this;
               var player = this.playerEle;
               if (!game.players.contains(player) && !game.dead.contains(player)) return;
               if (!this._doubleClicking) {
                  this._doubleClicking = true;
                  setTimeout(function () {
                     avatar._doubleClicking = false;
                  }, 500);
                  return;
               }
               // ui.click.skin(this,player.name2);
               game.pause2();
               ui.click.charactercard(player.name2, null, null, true, this);
            },
            connectroom: function (e) {
               if (_status.dragged) return;
               if (_status.clicked) return;
               if (ui.intro) return;
               if (this.roomfull) {
                  alert('房间已满');
               }
               else if (this.roomgaming && !game.onlineID) {
                  if (this.config && this.config.observe) {
                     alert('房间暂时不可旁观');
                  }
                  else {
                     alert('房间不允许旁观');
                  }
               }
               else if (!this.roomempty && this.version != lib.versionOL) {
                  if (this.version > lib.versionOL) {
                     alert('加入失败：你的游戏版本过低');
                  }
                  else {
                     alert('加入失败：房主的游戏版本过低');
                  }
               }
               else {
                  if (!_status.enteringroom) {
                     _status.enteringroom = true;
                     _status.enteringroomserver = this.serving;
                     game.send('server', 'enter', this.key, get.connectNickname(), lib.config.connect_avatar);
                  }
               }
            },
            player: function () {
               return ui.click.target.apply(this, arguments);
            },
            target: function (e) {
               if (_status.dragged) return;
               if (_status.clicked) return;
               if (ui.intro) return;
               if (this.classList.contains('connect')) {
                  if (game.online) {
                     if (game.onlinezhu) {
                        if (!this.playerid && game.connectPlayers) {
                           if (['versus', 'doudizhu', 'longlaoguan'].contains(lib.configOL.mode)) return;
                           if (lib.configOL.mode == 'identity' && lib.configOL.identity_mode == 'zhong') return;
                           if (!this.classList.contains('unselectable2') && lib.configOL.number <= 2) return;
                           this.classList.toggle('unselectable2')
                           if (this.classList.contains('unselectable2')) {
                              lib.configOL.number--;
                           }
                           else {
                              lib.configOL.number++;
                           }
                           game.send('changeNumConfig', lib.configOL.number,
                              game.connectPlayers.indexOf(this), this.classList.contains('unselectable2'));
                        }
                     }
                     return;
                  }
                  if (this.playerid) {
                     if (this.ws) {
                        if (confirm('是否踢出' + this.nickname + '？')) {
                           var id = get.id();
                           this.ws.send(function (id) {
                              if (game.ws) {
                                 game.ws.close();
                                 game.saveConfig('reconnect_info');
                                 game.saveConfig('banned_info', id);
                              }
                           }, id);
                           lib.node.banned.push(id);
                        }
                     }
                  }
                  else {
                     if (['versus', 'doudizhu', 'longlaoguan', 'single'].contains(lib.configOL.mode)) return;
                     if (lib.configOL.mode == 'identity' && (lib.configOL.identity_mode == 'zhong' || lib.configOL.identity_mode == 'purple')) return;
                     if (!this.classList.contains('unselectable2') && lib.configOL.number <= 2) return;
                     this.classList.toggle('unselectable2')
                     if (this.classList.contains('unselectable2')) {
                        lib.configOL.number--;
                     }
                     else {
                        lib.configOL.number++;
                     }
                     game.send('server', 'config', lib.configOL);
                     game.updateWaiting();
                  }
                  return;
               }
               _status.clicked = true;
               var custom = _status.event.custom;
               if (custom && custom.replace.target) {
                  custom.replace.target(this, e);
                  return;
               }
               if (this.classList.contains('selectable') == false) return;
               this.unprompt();
               if (this.classList.contains('selected')) {
                  ui.selected.targets.remove(this);
                  if (_status.multitarget || _status.event.complexSelect) {
                     game.uncheck();
                     game.check();
                  }
                  else {
                     this.classList.remove('selected');
                  }
               }
               else {
                  ui.selected.targets.add(this);
                  if (_status.event.name == 'chooseTarget' || _status.event.name == 'chooseToUse' || _status.event.name == 'chooseCardTarget') {
                     var targetprompt = null;
                     if (_status.event.targetprompt) {
                        targetprompt = _status.event.targetprompt;
                     }
                     else if (_status.event.skill && !get.info(_status.event.skill).viewAs) {
                        targetprompt = get.info(_status.event.skill).targetprompt;
                     }
                     else if (_status.event.name == 'chooseToUse') {
                        var currentcard = get.card();
                        if (currentcard) {
                           targetprompt = get.info(currentcard).targetprompt;
                        }
                     }
                     if (targetprompt) {
                        if (Array.isArray(targetprompt)) {
                           targetprompt = targetprompt[Math.min(targetprompt.length - 1, ui.selected.targets.indexOf(this))];
                        }
                        else if (typeof targetprompt == 'function') {
                           targetprompt = targetprompt(this);
                        }
                        if (targetprompt && typeof targetprompt == 'string') {
                           this.prompt(targetprompt);
                        }
                     }
                  }
                  this.classList.add('selected');
               }
               if (custom.add.target) {
                  custom.add.target();
               }
               game.check();
            },
            control2: function () {
               if (this.childNodes.length == 1 && !this._doubleclick) {
                  ui.click.control.call(this.firstChild);
               }
            },
            control: function () {
               if (_status.dragged) return;
               if (ui.control.classList.contains('hidden')) return;
               var node = this.parentNode;
               if (node) {
                  if (node._doubleclick) {
                     return;
                  }
                  else {
                     node._doubleclick = true;
                     setTimeout(function () {
                        node._doubleclick = false;
                     }, 500);
                  }
                  if (node.classList.contains('hidden')) return;
                  if (node.classList.contains('removing')) return;
                  if (node.classList.contains('disabled')) return;
               }
               if (ui.intro) {
                  ui.intro.close();
                  delete ui.intro;
               }
               _status.clicked = true;
               if (this.parentNode.custom) {
                  this.parentNode.custom(this.link, this);
                  return;
               }
               if (this.link == 'ok') {
                  ui.click.ok(this);
               }
               else if (this.link == 'cancel') {
                  ui.click.cancel(this);
               }
               else {
                  _status.event.result = {
                     buttons: ui.selected.buttons.slice(0),
                     cards: ui.selected.cards.slice(0),
                     targets: ui.selected.targets.slice(0),
                     control: this.link,
                     links: get.links(ui.selected.buttons)
                  };
                  if (this.parentNode.close != false) {
                     game.uncheck();
                     this.parentNode.close();
                  }
                  game.resume();
               }
            },
            dialogcontrol: function () {
               _status.event.result = {
                  buttons: ui.selected.buttons.slice(0),
                  cards: ui.selected.cards.slice(0),
                  targets: ui.selected.targets.slice(0),
                  control: this.link,
                  links: get.links(ui.selected.buttons)
               };
               game.resume();
            },
            skill: function (skill) {
               var info = get.info(skill);
               var Evt = _status.event;
               Evt.backup(skill);
               if (info.filterCard && info.discard != false && info.lose != false && !info.viewAs) {
                  var cards = Evt.player.getCards(Evt.position);
                  for (var i = 0; i < cards.length; i++) {
                     if (!lib.filter.cardDiscardable(cards[i], Evt.player)) {
                        cards[i].uncheck('useSkill');
                     }
                  }
               }
               if (typeof Evt.skillDialog == 'object') {
                  Evt.skillDialog.close();
               }
               if (Evt.isMine()) {
                  Evt.skillDialog = true;
               }
               game.uncheck();
               game.check();
               if (Evt.skillDialog) {
                  var str = get.translation(skill);
                  if (info.prompt) {
                     var str2;
                     if (typeof info.prompt == 'function') {
                        str2 = info.prompt(Evt);
                     }
                     else {
                        str2 = info.prompt;
                     }
                     Evt.skillDialog = ui.create.dialog(str, '<div><div style="width:100%;text-align:center">' + str2 + '</div></div>');
                     if (info.longprompt) {
                        Evt.skillDialog.forcebutton = true;
                        ui.update();
                     }
                  }
                  else if (info.promptfunc) {
                     Evt.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + info.promptfunc(Evt, Evt.player) + '</div></div>');
                  }
                  else if (lib.dynamicTranslate[skill] || lib.translate[skill + '_info']) {
                     Evt.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + get.skillInfoTranslation(skill, _status.event.player) + '</div></div>');
                  }
               }
            },
            /**
             * 玩家/ai确认选择的函数
             * @function
             * @param {?HTMLDivElement} node 调用确认函数的节点，如果不为null，对`node`的父节点调用`close()`函数
             */
            ok: function (node) {
               var Evt = _status.event;
               if (Evt.custom && Evt.custom.replace.confirm) {
                  Evt.custom.replace.confirm(true); return;
               }
               Evt.result = {
                  buttons: ui.selected.buttons.slice(0),//选择的按钮
                  cards: ui.selected.cards.slice(0),//选择的牌
                  targets: ui.selected.targets.slice(0),//选择的目标
                  confirm: 'ok',//确认
                  bool: true,
                  links: get.links(ui.selected.buttons)
               };
               if (node) {
                  node.parentNode.close();
               }
               if (Evt.skill) {
                  Evt.result.skill = Evt.skill;
                  if (typeof get.info(Evt.skill).viewAs == 'function') Evt.result.card = get.info(Evt.skill).viewAs(Evt.result.cards, Evt.player);
                  else Evt.result.card = get.copy(get.info(Evt.skill).viewAs);
                  if (Evt.result.cards.length == 1 && Evt.result.card) {
                     if (!Evt.result.card.suit) Evt.result.card.suit = get.suit(Evt.result.cards[0]);
                     if (!Evt.result.card.number) Evt.result.card.number = get.number(Evt.result.cards[0]);
                  }
                  if (Evt.skillDialog && get.objtype(Evt.skillDialog) == 'div') {
                     Evt.skillDialog.close();
                  }
                  var cards = Evt.player.getCards('hej');
                  for (var i = 0; i < cards.length; i++) {
                     cards[i].recheck('useSkill');
                  }
                  Evt.restore();
               }
               else if (Evt.name == 'chooseToUse' || Evt.name == 'chooseToRespond') {
                  Evt.result.card = get.autoViewAs(Evt.result.cards[0]);
               }
               if (ui.skills) ui.skills.close();
               if (ui.skills2) ui.skills2.close();
               if (ui.skills3) ui.skills3.close();
               game.uncheck();
               if (Evt.custom.add.confirm) {
                  Evt.custom.add.confirm(true);
               }
               game.resume();
            },
            /**
             * 托管按钮点击函数
             * @function
             * @param {?HTMLDivElement} node 调用确认函数的节点，如果不为null，对`node`的父节点调用`close()`函数
             */
            cancel: function (node) {
               var Evt = _status.event;
               if (Evt.custom.replace.confirm) {
                  Evt.custom.replace.confirm(false); return;
               }
               if (Evt.skill && !Evt.norestore) {
                  if (Evt.skillDialog && get.objtype(Evt.skillDialog) == 'div') {
                     Evt.skillDialog.close();
                  }
                  if (typeof Evt.dialog == 'string' && Evt.isMine()) {
                     Evt.dialog = ui.create.dialog(Evt.dialog);
                  }
                  if (_status.event.type == 'phase' && ui.confirm) {
                     ui.confirm.classList.add('removing');
                  }
                  // ui.control.animate('nozoom',100);
                  Evt.restore();
                  var cards = Evt.player.getCards('hej');
                  for (var i = 0; i < cards.length; i++) {
                     cards[i].recheck('useSkill');
                  }
                  game.uncheck();
                  game.check();
                  return;
               }
               Evt.result = {
                  confirm: 'cancel',
                  bool: false
               };
               if (node) {
                  node.parentNode.close();
               }
               if (ui.skills) ui.skills.close();
               if (ui.skills2) ui.skills2.close();
               if (ui.skills3) ui.skills3.close();
               game.uncheck();
               if (Evt.custom.add.confirm) {
                  Evt.custom.add.confirm(true);
               }
               game.resume();
            },
            logv: function (e) {
               if (_status.currentlogv) {
                  if (_status.currentlogv == this) return;
                  if (_status.logvtimeout) {
                     clearTimeout(_status.logvtimeout);
                  }
                  _status.logvtimeout = setTimeout(() => {
                     if (!_status.currentlogv) {
                        _status.currentlogv = this;
                        ui.click.intro.call(this, e);
                     }
                  }, 200);
                  this.logvtimeout = _status.logvtimeout;
               }
               else {
                  _status.currentlogv = this;
                  ui.click.intro.call(this, e);
               }
            },
            logvleave: function () {
               if (_status.currentlogv == this) {
                  setTimeout(function () {
                     delete _status.currentlogv;
                  }, 150);
               }
               if (this.logvtimeout) {
                  clearTimeout(this.logvtimeout);
                  if (_status.logvtimeout == this.logvtimeout) {
                     delete _status.logvtimeout;
                  }
                  delete this.logvtimeout;
               }
            },
            charactercard: function (name, sourcenode, noedit, resume, avatar) {
               if (_status.dragged) return;
               if (lib.config.theme != 'simple') {
                  ui.window.classList.add('shortcutpaused');
                  ui.menuContainer.classList.add('forceopaque');
               }
               else {
                  ui.window.classList.add('systempaused');
                  ui.menuContainer.classList.add('transparent2');
               }
               if (lib.config.blur_ui) {
                  ui.arena.classList.add('blur');
                  ui.system.classList.add('blur');
                  ui.menuContainer.classList.add('blur');
               }
               var layer = ui.create.div('.popup-container');
               var clicklayer = function (e) {
                  if (_status.touchpopping) return;
                  if (_status.dragged) return;
                  ui.window.classList.remove('shortcutpaused');
                  ui.window.classList.remove('systempaused');
                  ui.menuContainer.classList.remove('forceopaque');
                  ui.menuContainer.classList.remove('transparent2');
                  ui.arena.classList.remove('blur');
                  ui.system.classList.remove('blur');
                  ui.menuContainer.classList.remove('blur');
                  this.delete();
                  e.stopPropagation();
                  if (resume) game.resume2();
                  return false;
               }
               var uiintro = ui.create.div('.menubg.charactercard', layer);
               var playerbg = ui.create.div('.menubutton.large.ava', uiintro);
               var bg = ui.create.div('.avatar', playerbg, function () {
                  if (changeskinfunc) {
                     changeskinfunc();
                  }
               }).setBackground(name, 'character');
               var changeskinfunc = null;
               var nameskin = name;
               var nameskin2 = name;
               var gzbool = false;
               if (nameskin.indexOf('gz_shibing') == 0) {
                  nameskin = nameskin.slice(3, 11);
               }
               else if (nameskin.indexOf('gz_') == 0) {
                  nameskin = nameskin.slice(3);
                  gzbool = true;
               }
               var changeskin = function () {
                  var node = ui.create.div('.changeskin', '可换肤', playerbg);
                  var avatars = ui.create.div('.avatars', playerbg);
                  changeskinfunc = function () {
                     playerbg.classList.add('scroll');
                     if (node._created) {
                        return;
                     }
                     node._created = true;
                     var createButtons = function (num) {
                        if (!num) return;
                        if (num >= 4) {
                           avatars.classList.add('scroll');
                           if (lib.config.touchscreen) {
                              lib.setScroll(avatars);
                           }
                        }
                        for (var i = 0; i <= num; i++) {
                           var button = ui.create.div(avatars, function () {
                              playerbg.classList.remove('scroll');
                              if (this._link) {
                                 lib.config.skin[nameskin] = this._link;
                                 bg.style.backgroundImage = this.style.backgroundImage;
                                 if (sourcenode) sourcenode.style.backgroundImage = this.style.backgroundImage;
                                 if (avatar) avatar.style.backgroundImage = this.style.backgroundImage;
                                 game.saveConfig('skin', lib.config.skin);
                              }
                              else {
                                 delete lib.config.skin[nameskin];
                                 if (gzbool && lib.character[nameskin2][4].contains('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) {
                                    bg.setBackground(nameskin2, 'character');
                                    if (sourcenode) sourcenode.setBackground(nameskin2, 'character');
                                    if (avatar) avatar.setBackground(nameskin2, 'character');
                                 }
                                 else {
                                    bg.setBackground(nameskin, 'character');
                                    if (sourcenode) sourcenode.setBackground(nameskin, 'character');
                                    if (avatar) avatar.setBackground(nameskin, 'character');
                                 }
                                 game.saveConfig('skin', lib.config.skin);
                              }
                           });
                           button._link = i;
                           if (i) {
                              button.setBackgroundImage('image/skin/' + nameskin + '/' + i + '.jpg');
                           }
                           else {
                              if (gzbool && lib.character[nameskin2][4].contains('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) button.setBackground(nameskin2, 'character', 'noskin');
                              else button.setBackground(nameskin, 'character', 'noskin');
                           }
                        }
                     };
                     var num = 1;
                     var loadImage = function () {
                        var img = new Image();
                        img.onload = function () {
                           num++;
                           loadImage();
                        }
                        img.onerror = function () {
                           num--;
                           createButtons(num);
                        }
                        img.src = lib.assetURL + 'image/skin/' + nameskin + '/' + num + '.jpg';
                     }
                     if (lib.config.change_skin) {
                        loadImage();
                     }
                     else {
                        createButtons(lib.skin[nameskin]);
                     }
                  };
               };
               if (lib.config.change_skin) {
                  var img = new Image();
                  img.onload = changeskin;
                  img.src = lib.assetURL + 'image/skin/' + nameskin + '/1.jpg';
               }
               else if (lib.config.debug && lib.skin[nameskin]) {
                  changeskin();
               }
               var ban = ui.create.div('.menubutton.large.ban.character', uiintro, '禁用', function (e) {
                  if (this.classList.contains('unselectable')) return;
                  if (typeof noedit == 'string') {
                     this.classList.toggle('active');
                     var bannedname = noedit + '_banned';
                     if (!lib.config[bannedname]) {
                        lib.config[bannedname] = [];
                     }
                     if (this.classList.contains('active')) {
                        lib.config[bannedname].add(name);
                     }
                     else {
                        lib.config[bannedname].remove(name);
                     }
                     game.saveConfig(bannedname, lib.config[bannedname]);
                     ban.updateBanned();
                  }
                  else {
                     ui.click.touchpop();
                     ui.click.intro.call(this, e);
                     _status.clicked = true;
                  }
               });
               ban.link = name;
               ban._banning = 'offline';
               ban.updateBanned = function () {
                  if (noedit === true) return;
                  if (lib.config[get.mode() + '_banned'] && lib.config[get.mode() + '_banned'].contains(name)) {
                     ban.classList.add('active');
                  }
                  else {
                     ban.classList.remove('active');
                  }
                  if (sourcenode && sourcenode.updateBanned) {
                     sourcenode.updateBanned();
                  }
               };
               ban.updateBanned();
               var fav = ui.create.div('.menubutton.large.fav', uiintro, '收藏', function () {
                  if (this.classList.contains('unselectable')) return;
                  this.classList.toggle('active');
                  if (this.classList.contains('active')) {
                     lib.config.favouriteCharacter.add(name);
                  }
                  else {
                     lib.config.favouriteCharacter.remove(name);
                  }
                  game.saveConfig('favouriteCharacter', lib.config.favouriteCharacter);
               });
               if (noedit === true) {
                  fav.classList.add('unselectable');
                  ban.classList.add('unselectable');
               }
               else if (lib.config.favouriteCharacter.contains(name)) {
                  fav.classList.add('active');
               }
               var intro = ui.create.div('.charactercontainer', uiintro);
               if (get.characterIntro(name).length) {
                  var intro0 = ui.create.div('.characterintro', get.characterIntro(name), intro);
               }
               if (get.characterTag(name).length) {
                  var intro1 = ui.create.div('.characterintro.intro1', get.characterTag(name), intro);
               }
               var intro2 = ui.create.div('.characterintro.intro2', intro);
               var list = get.character(name, 3) || [];
               var skills = ui.create.div('.characterskill', intro);
               if (lib.config.touchscreen) {
                  lib.setScroll(intro);
                  lib.setScroll(intro2);
                  lib.setScroll(skills);
               }

               if (lib.config.mousewheel) {
                  skills.onmousewheel = ui.click.mousewheel;
               }
               var clickSkill = function (e) {
                  var current = this.parentNode.querySelector('.active');
                  if (current) {
                     current.classList.remove('active');
                  }
                  this.classList.add('active');
                  intro2.innerHTML = '<span style="font-weight:bold;margin-right:5px">' + get.translation(this.link) + '</span>' + get.skillInfoTranslation(this.link);
                  var info = get.info(this.link);
                  var skill = this.link;
                  var playername = this.linkname;
                  var skillnode = this;
                  if (info.derivation) {
                     var derivation = info.derivation;
                     if (typeof derivation == 'string') {
                        derivation = [derivation];
                     }
                     for (var i = 0; i < derivation.length; i++) {
                        intro2.innerHTML += '<br><br><span style="font-weight:bold;margin-right:5px">' + get.translation(derivation[i]) + '</span>' + get.skillInfoTranslation(derivation[i]);
                     }
                  }
                  if (info.alter) {
                     intro2.innerHTML += '<br><br><div class="hrefnode skillversion"></div>';
                     var skillversionnode = intro2.querySelector('.hrefnode.skillversion');
                     if (lib.config.vintageSkills.contains(skill)) {
                        skillversionnode.innerHTML = '切换至新版';
                     }
                     else {
                        skillversionnode.innerHTML = '切换至旧版';
                     }
                     skillversionnode.listen(function () {
                        if (lib.config.vintageSkills.contains(skill)) {
                           lib.config.vintageSkills.remove(skill);
                           lib.translate[skill + '_info'] = lib.translate[skill + '_info_alter'];
                        }
                        else {
                           lib.config.vintageSkills.push(skill);
                           lib.translate[skill + '_info'] = lib.translate[skill + '_info_origin'];
                        }
                        game.saveConfig('vintageSkills', lib.config.vintageSkills);
                        clickSkill.call(skillnode, 'init');
                     });
                  }
                  if (lib.config.background_speak && e !== 'init') {
                     var audioname = this.link;
                     if (info.audioname2 && info.audioname2[playername]) {
                        audioname = info.audioname2[playername];
                        info = lib.skill[audioname];
                     }
                     var audioinfo = info.audio;
                     var getIndex = (i) => {
                        if (typeof this.audioindex != 'number') {
                           this.audioindex = i;
                        }
                        this.audioindex++;
                        if (this.audioindex > i) {
                           this.audioindex = 1;
                        }
                        return this.audioindex;
                     };
                     if (typeof audioinfo == 'string') {
                        if (audioinfo.indexOf('ext:') == 0) {
                           audioinfo = audioinfo.split(':');
                           if (audioinfo.length == 3) {
                              if (audioinfo[2] == 'true') {
                                 game.playAudio('..', 'extension', audioinfo[1], audioname);
                              }
                              else {
                                 audioinfo[2] = parseInt(audioinfo[2]);
                                 if (audioinfo[2]) {
                                    game.playAudio('..', 'extension', audioinfo[1], audioname + getIndex(audioinfo[2]));
                                 }
                              }
                           }
                           return;
                        }
                        else {
                           audioname = audioinfo;
                           if (lib.skill[audioinfo]) {
                              audioinfo = lib.skill[audioinfo].audio;
                           }
                        }
                     }
                     else if (Array.isArray(audioinfo)) {
                        audioname = audioinfo[0];
                        audioinfo = audioinfo[1];
                     }
                     if (typeof audioinfo == 'number') {
                        if (Array.isArray(info.audioname) && info.audioname.contains(playername)) audioname = audioname + '_' + playername;
                        game.playAudio('skill', audioname + getIndex(audioinfo));
                     }
                     else if (audioinfo) {
                        if (Array.isArray(info.audioname) && info.audioname.contains(playername)) audioname = audioname + '_' + playername;
                        game.playAudio('skill', audioname);
                     }
                     else if (true && info.audio !== false) {
                        if (Array.isArray(info.audioname) && info.audioname.contains(playername)) audioname = audioname + '_' + playername;
                        game.playSkillAudio(audioname, getIndex(2));
                     }
                  }
               }
               var initskill = false;
               for (var i = 0; i < list.length; i++) {
                  if (!get.info(list[i]) || get.info(list[i]).nopop) continue;
                  if (!lib.translate[list[i]] || !lib.translate[list[i] + '_info']) continue;
                  var skilltrans = get.translation(list[i]);
                  if (skilltrans.indexOf('&nbsp;') == 0) {
                     skilltrans = skilltrans.slice(6);
                  }
                  var current = ui.create.div('.menubutton.large', skills, clickSkill, skilltrans);
                  current.link = list[i];
                  current.linkname = name;
                  if (!initskill) {
                     initskill = true;
                     clickSkill.call(current, 'init');
                  }
               }

               uiintro.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.touchpop);
               layer.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clicklayer);
               ui.window.appendChild(layer);
            },
            /**
             * 详细信息弹窗
             * @function
             * @param {(MouseEvent|TouchEvent)} e 
             * @returns {(undefined|false|HTMLDivElement)}
             */
            intro: function (e) {
               if (_status.dragged) return;
               _status.clicked = true;
               if (this.classList.contains('player') && !this.name) {
                  return;
               }
               if (this.parentNode == ui.historybar) {
                  if (ui.historybar.style.zIndex == '22') {
                     if (_status.removePop) {
                        if (_status.removePop(this) == false) return;
                     }
                     else {
                        return;
                     }
                  }
                  ui.historybar.style.zIndex = 22;
               }
               var uiintro;
               if (this.classList.contains('card') && this.parentNode &&
                  this.parentNode.classList.contains('equips') && get.is.phoneLayout() &&
                  !get.is.mobileMe(this.parentNode.parentNode)) {
                  uiintro = get.nodeintro(this.parentNode.parentNode, false, e);
               }
               uiintro = uiintro || get.nodeintro(this, false, e);
               uiintro.destroyLink = uiintro.destroyLink || []
               if (!uiintro) return;
               uiintro.classList.add('popped');
               uiintro.classList.add('static');
               ui.window.appendChild(uiintro);
               var layer = ui.create.div('.poplayer', ui.window);
               uiintro.destroyLink.push(layer)
               var clicklayer = function (e) {
                  if (_status.touchpopping) return;
                  delete ui.throwEmotion;
                  delete _status.removePop;
                  uiintro.delete();
                  this.remove();
                  ui.historybar.style.zIndex = '';
                  delete _status.currentlogv;
                  if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                  if (e && e.stopPropagation) e.stopPropagation();
                  if (uiintro._onclose) {
                     uiintro._onclose();
                  }
                  return false;
               }
               layer.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clicklayer);
               if (!lib.config.touchscreen) layer.oncontextmenu = clicklayer;
               if (this.parentNode == ui.historybar && lib.config.touchscreen) {
                  var rect = this.getBoundingClientRect();
                  e = { clientX: 0, clientY: rect.top + 30 };
               }
               lib.placePoppedDialog(uiintro, e);
               if (this.parentNode == ui.historybar) {
                  if (lib.config.show_history == 'right') {
                     uiintro.style.left = (ui.historybar.offsetLeft - 230) + 'px';
                  }
                  else {
                     uiintro.style.left = (ui.historybar.offsetLeft + 60) + 'px';
                  }
               }
               uiintro.style.zIndex = 21;
               var clickintro = function () {
                  if (_status.touchpopping) return;
                  delete _status.removePop;
                  layer.remove();
                  this.delete();
                  ui.historybar.style.zIndex = '';
                  delete _status.currentlogv;
                  if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                  if (uiintro._onclose) {
                     uiintro._onclose();
                  }
               };
               var currentpop = this;
               _status.removePop = function (node) {
                  if (node == currentpop) return false;
                  layer.remove();
                  uiintro.delete();
                  delete _status.removePop;
                  return true;
               };
               if (uiintro.clickintro) {
                  uiintro.listen(function () {
                     _status.clicked = true;
                  });
                  uiintro._clickintro = clicklayer;
               }
               else if (!lib.config.touchscreen) {
                  uiintro.addEventListener('mouseleave', clickintro);
                  uiintro.addEventListener('click', clickintro);
               }
               else if (uiintro.touchclose) {
                  uiintro.listen(clickintro);
               }
               uiintro._close = clicklayer;

               game.pause2();
               return uiintro;
            },
            intro2: function () {
               if (ui.intro) {
                  ui.intro.close();
                  if (ui.intro.source == this) {
                     delete ui.intro;
                     ui.control.show();
                     game.resume2();
                     return;
                  }
               }
            },
            /**
             * 托管按钮点击函数
             * @function
             */
            auto: function () {
               if (ui.auto.classList.contains('hidden') && arguments[0] !== 'forced') return;
               if (_status.paused2) return;
               ui.click.shortcut(false);
               if (!_status.auto) {
                  _status.auto = true;
                  ui.auto.classList.add('glow');
                  ui.arena.classList.add('auto');

                  if (_status.imchoosing && _status.paused) {
                     if (ui.confirm) ui.confirm.close();
                     ui.control.hide();
                     if (_status.event.switchToAuto) {
                        _status.event.switchToAuto();
                     }
                     else {
                        if (_status.paused && _status.imchoosing) {
                           game.uncheck();
                           _status.event.redo();
                        }
                     }
                     game.resume();
                  }
                  else if (_status.event.switchToAuto) {
                     _status.event.switchToAuto();
                  }
                  if (game.online) {
                     game.send('auto');
                  }
                  else if (_status.connectMode) {
                     game.broadcastAll(function (player) {
                        player.setNickname(player.nickname + ' - 托管');
                     }, game.me);
                  }
               }
               else {
                  if (game.notMe) return;
                  ui.control.show();
                  _status.auto = false;
                  ui.auto.classList.remove('glow');
                  ui.arena.classList.remove('auto');

                  if (game.online) {
                     game.send('unauto');
                  }
                  else if (_status.connectMode) {
                     game.broadcastAll(function (player) {
                        player.setNickname(player.nickname);
                     }, game.me);
                  }
               }
            },
            /**
             * 无懈按钮点击函数
             * @function
             */
            wuxie: function () {
               if (this.classList.contains('hidden')) return;
               this.classList.toggle('glow');
               if (this.classList.contains('glow') && _status.event.type == 'wuxie' &&
                  _status.event.isMine() && ui.confirm && _status.imchoosing) {
                  ui.click.cancel(ui.confirm.lastChild);
               }
            },
            tempnowuxie: function () {
               if (this.classList.contains('hidden')) return;
               this.classList.toggle('glow');
               if (this.classList.contains('glow') && _status.event.type == 'wuxie' &&
                  _status.event.isMine() && ui.confirm && _status.imchoosing) {
                  var triggerevent = _status.event.getTrigger();
                  if (triggerevent && this._origin == triggerevent.parent.id) {
                     if (triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
                        this.close();
                     }
                  }
                  ui.click.cancel(ui.confirm.lastChild);
               }
            },
            pause: function () {
               if (_status.paused2 || _status.pausing || _status.nopause) return;
               if (!_status.video) {
                  if (ui.pause.classList.contains('hidden')) return;
                  if (!_status.gameStarted) return;
               }
               ui.system.hide();
               game.pause2();
               var node = ui.create.pause();
               if (!node) return;
               node.animate('start');
               ui.sidebar3.innerHTML = '';
               if (lib.config.show_discardpile) {
                  for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
                     var div = ui.create.div(ui.sidebar3);
                     div.innerHTML = get.translation(ui.discardPile.childNodes[i]);
                     ui.sidebar3.insertBefore(div, ui.sidebar3.firstChild);
                  }
               }
               node.appendChild(ui.sidebar);
               node.appendChild(ui.sidebar3);
               ui.historybar.classList.add('paused');
               ui.arena.classList.add('paused');
               ui.window.classList.add('touchinfohidden');
               ui.time.hide();
               if (game.onpause) {
                  game.onpause();
               }
            },
            resume: function (e) {
               if (_status.pausing) return;
               if (_status.dragged) return;
               if (_status.clicked) return;
               this.delete();
               ui.system.show();
               ui.time.show();
               ui.historybar.classList.remove('paused');
               ui.arena.classList.remove('paused');
               ui.window.classList.remove('touchinfohidden');
               game.resume2();
               e.stopPropagation();
               if (game.onresume) {
                  game.onresume();
               }
               return false;
            },
            config: function () {
               if (!ui.click.configMenu) return;
               if (_status.paused2) _status.config2 = false;
               else _status.config2 = true;

               _status.clicked = true;
               game.pause2();
               ui.click.configMenu();
               ui.system1.classList.remove('shown');
               ui.system2.classList.remove('shown');
            },
            swap: function () {
               if (_status.dragged) return;
               if (this.classList.contains('dead')) return;
               if (_status.over) return;
               if (ui.auto) ui.auto.show();
               if (ui.wuxie) ui.wuxie.show();
               game.swapPlayer(this);
            },
            mousewheel: function (evt) {
               if (this.firstChild && this.firstChild.classList.contains('handcards') &&
                  !this.classList.contains('scrollh')) return;
               var node = this;
               var num = this._scrollnum || 6;
               var speed = this._scrollspeed || 16;
               clearInterval(node.interval);
               if (evt.detail > 0 || evt.wheelDelta < 0) {
                  node.interval = setInterval(function () {
                     if (num-- && Math.abs(node.scrollLeft + node.clientWidth - node.scrollWidth) > 0) {
                        node.scrollLeft += speed;
                     }
                     else {
                        clearInterval(node.interval);
                     }
                  }, 16);
               }
               else {
                  node.interval = setInterval(function () {
                     if (num-- && node.scrollLeft > 0) {
                        node.scrollLeft -= speed;
                     }
                     else {
                        clearInterval(node.interval);
                     }
                  }, 16);
               }
            },
            touchStart: function (e) {
               this.startX = e.touches[0].clientX / game.documentZoom;
               this.startY = e.touches[0].clientY / game.documentZoom;
               _status.dragged = false;
            },
            dialogtouchStart: function (e) {
               ui.click.touchStart.call(this, e);
               _status.dialogtouched = true;
            },
            touchScroll: function (e) {
               if (_status.mousedragging) return;
               if (_status.draggingtouchdialog) return;
               if (!_status.dragged) {
                  if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 ||
                     Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
                     _status.dragged = true;
                  }
               }
               if ((this == ui.handcards1Container || this == ui.handcards2Container) && !this.classList.contains('scrollh')) {
                  e.preventDefault();
               }
               else if (lib.device == 'ios' && this.scrollHeight <= this.offsetHeight + 5 && this.scrollWidth <= this.offsetWidth + 5) {
                  e.preventDefault();
               }
               else {
                  delete _status._swipeorigin;
                  e.stopPropagation();
               }
            },
            autoskill: function (bool, node) {
               var list = lib.config.autoskilllist;
               if (bool) {
                  list.remove(node.link);
               }
               else {
                  list.add(node.link);
               }
               game.saveConfig('autoskilllist', list);
            },
            skillbutton: function () {
               this.func(this.link);
            },
            autoskill2: function (e) {
               this.classList.toggle('on');
               var list = [];
               if (lib.skill[this.link].frequent) {
                  list.push(this.link);
               }
               if (lib.skill[this.link].subfrequent) {
                  for (var i = 0; i < lib.skill[this.link].subfrequent.length; i++) {
                     list.push(this.link + '_' + lib.skill[this.link].subfrequent[i]);
                  }
               }
               for (var i = 0; i < list.length; i++) {
                  if (this.classList.contains('on')) {
                     lib.config.autoskilllist.remove(list[i]);
                  }
                  else {
                     lib.config.autoskilllist.add(list[i]);
                  }
               }
               game.saveConfig('autoskilllist', lib.config.autoskilllist);
               ui.click.touchpop();
               e.stopPropagation();
            },
            hiddenskill: function (e) {
               this.classList.toggle('on');
               var hidden = lib.skill[this.link].preHidden;
               if (Array.isArray(hidden)) {
                  if (this.classList.contains('on')) {
                     _status.prehidden_skills.removeArray(hidden);
                  }
                  else {
                     _status.prehidden_skills.addArray(hidden);
                  }
               }
               if (this.classList.contains('on')) {
                  _status.prehidden_skills.remove(this.link);
               }
               else {
                  _status.prehidden_skills.add(this.link);
               }
               ui.click.touchpop();
               e.stopPropagation();
            },
            rightplayer: function (e) {
               if (this._nopup) return false;
               if (_status.clickedplayer) {
                  return false;
               }

               if (this._mouseenterdialog && this._mouseenterdialog.parentNode) {
                  this._mouseenterdialog.delete();
               }
               else {
                  ui.click.intro.call(this, e);
               }
               _status.clickedplayer = true;
               _status.clicked = false;
               ui.click.longpresscancel.call(this);
               return false;
            },
            right: function (e) {
               if (window.inSplash) return false;
               if (lib.config.touchscreen) return;
               if (_status.noright) {
                  _status.noright = false;
                  return false;
               }
               if (_status.clickedplayer) {
                  _status.clickedplayer = false;
                  return;
               }
               game.closePopped();
               switch (lib.config.right_click) {
                  case 'shortcut': ui.click.shortcut(); break;
                  case 'pause': ui.click.pause(); break;
                  case 'auto': ui.click.auto(); break;
                  case 'config': ui.click.config(); break;
               }
               e.preventDefault();
               return false;
            }
         },
         /**
          * 当前被选择的对象
          * 在游戏中非常有用的对象
          * ui.selected = {buttons: [被选择的按钮], cards: [被选择的卡牌], targets: [被选择的角色]},
          * @type {!Object}
          */
         selected: {
            buttons: [], cards: [], targets: []
         },
         /**
          * 清除残留ui
          * 例如：被使用或打出的牌，会显示并停留在画面中央，直到ui.clear将其清除
          * @function
          */
         clear: function () {
            game.addVideo('uiClear');
            var thrown = document.getElementsByClassName('thrown');
            var nodes = [];
            var i;
            for (i = 0; i < thrown.length; i++) {
               nodes.push(thrown[i]);
            }
            for (i = 0; i < nodes.length; i++) {
               if (!nodes[i].fixed) nodes[i].delete();
            }
         },
         updatec: function () {
            if (_status.noupdatec) return;
            var length = 0;
            var controls = [];
            var widths = [];
            var add = function (node, first) {
               var thiswidth = parseInt(node.style.width);
               if (thiswidth) {
                  thiswidth += 8;
                  length += thiswidth;
                  if (first) {
                     widths.unshift(thiswidth);
                  }
                  else {
                     widths.push(thiswidth);
                  }
               }
               else {
                  length += node.offsetWidth;
                  if (first) {
                     widths.unshift(node.offsetWidth);
                  }
                  else {
                     widths.push(node.offsetWidth);
                  }
               }
               if (first) {
                  controls.unshift(node);
               }
               else {
                  controls.push(node);
               }
            }
            var stayleft = null;
            for (var i = 0; i < ui.control.childNodes.length; i++) {
               if (ui.control.childNodes[i].classList.contains('removing')) continue;
               if (!stayleft && lib.config.wuxie_right && ui.control.childNodes[i].stayleft) {
                  stayleft = ui.control.childNodes[i];
               }
               else {
                  add(ui.control.childNodes[i]);
               }
            }
            if (stayleft) {
               var fullwidth = 0;
               var fullright = (game.layout == 'long' || game.layout == 'long2' || game.chess || (game.layout != 'nova' && parseInt(ui.arena.dataset.number) <= 5));
               for (var i = 0; i < widths.length; i++) {
                  fullwidth += widths[i] + 6;
                  if (get.is.phoneLayout()) fullwidth += 6;
               }
               fullwidth /= 2;
               fullwidth += stayleft.offsetWidth;
               if (get.is.phoneLayout()) {
                  fullwidth += 18;
               }
               else {
                  fullwidth += 12;
               }
               if (fullright) {
                  fullwidth += 124;
                  if ((game.layout == 'long2' || game.layout == 'nova') && ui.arena.dataset.number == '8' && get.mode() != 'boss') {
                     fullwidth += game.me.getLeft();
                  }
               }
               else {
                  fullwidth += 154;
               }
               if (game.layout != 'default' && game.layout != 'newlayout' && ui.arena.offsetWidth / 2 >= fullwidth) {
                  var current_offset = stayleft._offset;
                  if (fullright) {
                     stayleft._offset = Math.ceil(-ui.arena.offsetWidth / 2) + 135;
                     if ((game.layout == 'long2' || game.layout == 'nova') && ui.arena.dataset.number == '8' && get.mode() != 'boss') {
                        stayleft._offset += game.me.getLeft();
                     }
                  }
                  else {
                     stayleft._offset = Math.ceil(-ui.arena.offsetWidth / 2) + 165;
                  }
                  if (current_offset != stayleft._offset) {
                     stayleft.animate('controlpressdownx', 500);
                     stayleft.style.transform = 'translateX(' + stayleft._offset + 'px)';
                  }
               }
               else {
                  add(stayleft, true);
               }
            }
            if (!controls.length) return;
            var offset = -length / 2;
            var control = controls.shift();
            if (control._offset != offset) {
               control.animate('controlpressdownx', 500);
               control.style.transform = 'translateX(' + offset + 'px)';
               control._offset = offset;
            }
            while (controls.length) {
               var control = controls.shift();
               var width = widths.shift();
               offset += width + 6;
               if (get.is.phoneLayout()) {
                  offset += 6;
               }
               if (control._offset != offset) {
                  control.animate('controlpressdownx', 500);
                  control.style.transform = 'translateX(' + offset + 'px)';
                  control._offset = offset;
               }
            }
         },
         updatex: function () {
            ui.update.apply(this, arguments);
            ui.updatehl();
            for (var i = 0; i < lib.onresize.length; i++) {
               lib.onresize[i]();
            }
            var cfg = game.documentZoom / game.deviceZoom;
            ui.updated();
            game.documentZoom = cfg * game.deviceZoom;
            ui.updatez();
            delete ui._updatexr;
         },
         updatexr: function () {
            if (ui._updatexr) {
               clearTimeout(ui._updatexr);
            }
            ui._updatexr = setTimeout(ui.updatex, 500);
         },
         /**
          * 更新标记位置
          * @function
          * @param {GameCores.GameObjects.Player} player 要更新的角色
          * @param {HTMLDivElement} nodes 父节点，对其中作为标记的子节点变换位置
          * @param {?number} start 起始子节点[>=0]，从该子节点开始变换位置
          * @param {?boolean} inv 是否反向，如果为true表示反向，如果为false或未指定则默认正向；正向为X轴的正方向，如果沿Y轴位移，不做变换
          */
         updatejm: function (player, nodes, start, inv) {
            if (typeof start != 'number') {
               start = 0;
            }
            var str;
            if (get.is.mobileMe(player) || game.layout == 'default' || player.classList.contains('linked')) {
               str = 'translateX(';
               if (inv) {
                  str += '-';
               }
            }
            else {
               str = 'translateY(';
            }
            var num = 0;
            for (var i = 0; i < nodes.childElementCount; i++) {
               var node = nodes.childNodes[i];
               if (i < start) {
                  node.style.transform = '';
               }
               else if (node.classList.contains('removing')) {
                  start++;
               }
               else {
                  ui.refresh(node);
                  node.classList.remove('drawinghidden');
                  node._transform = str + ((i - start) * 28) + 'px)';
                  node.style.transform = node._transform;
               }
            }
         },
         /**
          * 更新角色标记
          * @function
          * @param {?GameCores.GameObjects.Player} player 要更新的角色，如果未指定则对全部角色更新
          */
         updatem: function (player) {
            if (player) {
               var start = 0;
               if (!player.classList.contains('linked2') || !ui.arena.classList.contains('nolink')) {
                  start = 1;
               }
               ui.updatejm(player, player.node.marks, start, get.is.mobileMe(player));
            }
            else {
               for (var i = 0; i < game.players.length; i++) {
                  ui.updatem(game.players[i]);
               }
            }
         },
         /**
          * 更新角色判定标记
          * @function
          * @param {?GameCores.GameObjects.Player} player 要更新的角色，如果未指定则对全部角色更新
          */
         updatej: function (player) {
            if (player) {
               ui.updatejm(player, player.node.judges);
            }
            else {
               for (var i = 0; i < game.players.length; i++) {
                  ui.updatej(game.players[i]);
               }
            }
         },
         updatehl: function () {
            if (!game.me) return;
            if (!ui.handcards1Container || !ui.handcards2Container) return;
            if (!ui.handcards1Container.childNodes.length) return;
            var hs1 = [], hs2 = [];
            for (var i = 0; i < ui.handcards1Container.firstChild.childElementCount; i++) {
               if (!ui.handcards1Container.firstChild.childNodes[i].classList.contains('removing')) {
                  hs1.push(ui.handcards1Container.firstChild.childNodes[i]);
               }
            }
            for (var i = 0; i < ui.handcards2Container.firstChild.childElementCount; i++) {
               if (!ui.handcards2Container.firstChild.childNodes[i].classList.contains('removing')) {
                  hs2.push(ui.handcards2Container.firstChild.childNodes[i]);
               }
            }
            var offset1, offset12 = 0;
            if (!lib.config.fold_card) {
               offset1 = 112;
               ui.handcards1Container.classList.add('scrollh');
            }
            else {
               offset1 = Math.min(112, (ui.handcards1Container.offsetWidth - 128) / (hs1.length - 1));
               if (hs1.length > 1 && offset1 < 32) {
                  offset1 = 32;
                  ui.handcards1Container.classList.add('scrollh');
               }
               else {
                  ui.handcards1Container.classList.remove('scrollh');
               }
            }
            if (offset1 < 100) {
               offset12 = 100 - offset1;
            }
            for (var i = 0; i < hs1.length; i++) {
               hs1[i].style.transform = 'translateX(' + (i * offset1) + 'px)';
               hs1[i]._transform = 'translateX(' + (i * offset1) + 'px)';
               ui.refresh(hs1[i]);
               hs1[i].classList.remove('drawinghidden');
               if (offset12 > 40) {
                  offset12 = 90 - hs1[i].node.info.offsetWidth;
                  hs1[i].node.info.querySelector('span').style.display = 'none';
                  if (hs1[i].node.name.classList.contains('long')) {
                     hs1[i].node.name.style.transform = 'translateY(16px)  scale(0.85)';
                     hs1[i].node.name.style.transformOrigin = 'top left';
                  }
                  else {
                     hs1[i].node.name.style.transform = 'translateY(16px)';
                  }
                  hs1[i].node.info.style.transform = 'translateX(-' + offset12 + 'px) translateY(-3px)';
               }
               else {
                  hs1[i].node.info.querySelector('span').style.display = '';
                  hs1[i].node.name.style.transform = '';
                  hs1[i].node.name.style.transformOrigin = '';
                  hs1[i].node.info.style.transform = 'translateX(-' + offset12 + 'px)';
               }
            }
            ui.handcards1Container.firstChild.style.width = (offset1 * (hs1.length - 1) + 118) + 'px';

            var offset2, offset22 = 0;
            if (!lib.config.fold_card) {
               offset2 = 112;
               ui.handcards2Container.classList.add('scrollh');
            }
            else {
               offset2 = Math.min(112, (ui.handcards2Container.offsetWidth - 128) / (hs2.length - 1));
               if (hs2.length > 1 && offset2 < 32) {
                  offset2 = 32;
                  ui.handcards2Container.classList.add('scrollh');
               }
               else {
                  ui.handcards2Container.classList.remove('scrollh');
               }
            }
            if (offset2 < 100) {
               offset22 = 100 - offset2;
            }
            for (var i = 0; i < hs2.length; i++) {
               hs2[i].style.transform = 'translateX(' + (i * offset2) + 'px)';
               hs2[i]._transform = 'translateX(' + (i * offset2) + 'px)';
               ui.refresh(hs2[i]);
               hs2[i].classList.remove('drawinghidden');
               if (offset22 > 40) {
                  offset22 = 90 - hs2[i].node.info.offsetWidth;
                  hs2[i].node.info.querySelector('span').style.display = 'none';
                  if (hs2[i].node.name.classList.contains('long')) {
                     hs2[i].node.name.style.transform = 'translateY(16px)  scale(0.85)';
                     hs2[i].node.name.style.transformOrigin = 'top left';
                  }
                  else {
                     hs2[i].node.name.style.transform = 'translateY(16px)';
                  }
                  hs2[i].node.info.style.transform = 'translateX(-' + offset22 + 'px) translateY(-3px)';
               }
               else {
                  hs2[i].node.info.querySelector('span').style.display = '';
                  hs2[i].node.name.style.transform = '';
                  hs2[i].node.name.style.transformOrigin = '';
                  hs2[i].node.info.style.transform = 'translateX(-' + offset22 + 'px)';
               }
            }
            ui.handcards2Container.firstChild.style.width = (offset2 * (hs2.length - 1) + 118) + 'px';
         },
         /**
          * 更新角色手牌
          * @function
          * @param {?boolean} compute 是否重新计算位置，如果为true则计算
          */
         updateh: function (compute) {
            if (!game.me) return;
            if (!ui.handcards1Container) return;
            if (lib.config.low_performance) {
               if (compute) {
                  ui.updatehl();
                  setTimeout(ui.updatehl, 1000);
               }
               return;
            }
            if (compute) {
               ui.handcards1Container._handcardsWidth = ui.handcards1Container.offsetWidth;
               ui.handcards2Container._handcardsWidth = ui.handcards2Container.offsetWidth;
            }
            ui.updatehx(game.me.node.handcards1);
            ui.updatehx(game.me.node.handcards2);
         },
         updatehx: function (node) {
            var width = node.parentNode._handcardsWidth;
            var num = node.childElementCount - node.getElementsByClassName('removing').length;
            node.classList.remove('fold0');
            node.classList.remove('fold1');
            node.classList.remove('fold2');
            node.classList.remove('fold3');
            if (num * 78 + 40 >= width) {
               // node.dataset.fold=3;
               node.classList.add('fold3');
            }
            else if (num * 93 + 25 >= width) {
               // node.dataset.fold=2;
               node.classList.add('fold2');
            }
            else if (num * 112 + 6 >= width) {
               // node.dataset.fold=1;
               node.classList.add('fold1');
            }
            else {
               // node.dataset.fold=0;
               node.classList.add('fold0');
            }
         },
         /**
          * 更新设备缩放比例
          * @function
          */
         updated: function () {
            if (document.documentElement.offsetWidth < 900 || document.documentElement.offsetHeight < 500) {
               /**
                * 设备缩放比例
                * @type {number}
                */
               game.deviceZoom = Math.min(
                  Math.round(document.documentElement.offsetWidth / 98) / 10,//?? 98?
                  Math.round(document.documentElement.offsetHeight / 50) / 10
               );
            }
            else {
               game.deviceZoom = 1;
            }
         },
         /**
          * 根据{@link game.documenZoom}调整document大小
          * @function
          */
         updatez: function () {
            var width = document.documentElement.offsetWidth;
            var height = document.documentElement.offsetHeight;
            var zoom = game.documentZoom;
            if (zoom != 1) {
               document.body.style.width = Math.round(width / zoom) + 'px';
               document.body.style.height = Math.round(height / zoom) + 'px';
               document.body.style.transform = 'scale(' + (Math.floor(zoom * 100) / 100) + ')';
            }
            else {
               document.body.style.width = width + 'px';
               document.body.style.height = height + 'px';
               document.body.style.transform = '';
            }
         },
         /**
          * 更新UI，弹窗
          * @function
          */
         update: function () {
            for (var i = 0; i < ui.updates.length; i++) {
               ui.updates[i]();
            }
            if (ui.dialog && !ui.dialog.classList.contains('noupdate')) {
               if (game.chess) {
                  if (ui.dialog.content.scrollHeight < 240 && (!ui.dialog.buttons || !ui.dialog.buttons.length) && !ui.dialog.forcebutton) {
                     ui.dialog.style.height = ui.dialog.content.offsetHeight + 'px';
                     ui.dialog.classList.add('slim');
                  }
                  else {
                     ui.dialog.style.height = '';
                     ui.dialog.classList.remove('slim');
                  }
               }
               else {
                  if ((!ui.dialog.buttons || !ui.dialog.buttons.length) && !ui.dialog.forcebutton && ui.dialog.classList.contains('fullheight') == false && get.mode() != 'stone') {
                     ui.dialog.classList.add('nobutton');
                     if (ui.dialog.content.offsetHeight < 240) {
                        if (!ui.dialog._heightset) {
                           ui.dialog._heightset = ui.dialog.style.height || true;
                        }
                        ui.dialog.style.height = ui.dialog.content.offsetHeight + 'px';
                        if (lib.config.show_log != 'off') {
                           ui.dialog.classList.add('scroll1');
                           ui.dialog.classList.add('scroll2');
                           return;
                        }
                     }
                     else {
                        if (typeof ui.dialog._heightset == 'string') {
                           ui.dialog.style.height = ui.dialog._heightset;
                        }
                        else if (ui.dialog._heightset) {
                           ui.dialog.style.height = '';
                        }
                        delete ui.dialog._heightset;
                     }
                  }
                  else {
                     if (typeof ui.dialog._heightset == 'string') {
                        ui.dialog.style.height = ui.dialog._heightset;
                     }
                     else if (ui.dialog._heightset) {
                        ui.dialog.style.height = '';
                     }
                     delete ui.dialog._heightset;
                     ui.dialog.classList.remove('nobutton');
                  }
               }
               var height1 = ui.dialog.content.offsetHeight;
               var height2 = ui.dialog.contentContainer.offsetHeight;
               if (game.chess) {
                  if (height1 < 240) {
                     ui.dialog.style.height = height1 + 'px';
                  }
               }
               else {
                  if (!ui.dialog.forcebutton && !ui.dialog._scrollset && (height1 <= 190 || (height2 >= height1 && height2 >= 210))) {
                     ui.dialog.classList.remove('scroll1');
                     ui.dialog.classList.remove('scroll2');
                  }
                  else {
                     ui.dialog.classList.add('scroll1');
                     ui.dialog.classList.add('scroll2');
                     if (game.layout != 'default' && !ui.dialog.promotionbutton) {
                        ui.dialog.style.height = Math.min(height1, ((game.layout == 'long2' || game.layout == 'nova') && ui.arena.classList.contains('choose-character')) ? 380 : 350) + 'px';
                        ui.dialog._scrollset = true;
                     }
                  }
                  if (game.layout == 'long2' || game.layout == 'nova') {
                     if (height1 + 240 >= ui.arena.offsetHeight) {
                        ui.dialog.classList.add('scroll3');
                     }
                     else {
                        ui.dialog.classList.remove('scroll3');
                     }
                  }
               }
            }
         },
         recycle: function (node, key) {
            if (!ui._recycle) ui._recycle = {};
            if (typeof node == 'string') {
               return ui._recycle[node]
            }
            ui._recycle[key] = node;
         },
      }
   }
}