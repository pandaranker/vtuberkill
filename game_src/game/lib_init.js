module.exports = function (element, _mode, _message) {
  /**
   * 基础属性
   * @namespace
   */
  const { game, ui, get, ai, lib, _status } = vkCore
  /**
   * dist 路径
   */
  const dist = () => lib.assetURL + 'dist'

  let init = {
    /**
     * 初始化游戏，向HTMLDivElement和Array的原型链上添加一批方法（比如delete和addArray）
     * 入口函数
     * @function
     */
    init: function () {
      //part: `lib.configprefix` 初始化
      //如果是从PC端（node.js）载入，额外需要`__dirname`的各级文件夹首字母来拼接
      //例如：`__dirname` 为 `'F:\\vtb\\test\\src'`，则`lib.configprefix`为`'noname_0.9_Fvts_'|'vtuberkill_1.9_Fvts_'`
      //BUG: [PC win10] 路径使用`\`时，只获取了盘符
      if (typeof global !== 'undefined' && __dirname.length) {
        let dirsplit = __dirname.split('/');
        for (let i = 0; i < dirsplit.length; i++) {
          if (dirsplit[i]) {
            let c = dirsplit[i][0];
            lib.configprefix += /[A-Z]|[a-z]/.test(c) ? c : '_';
          }
        }
        lib.configprefix += '_';
      }
      window.resetGameTimeout = setTimeout(init.reset, parseInt(localStorage.getItem(lib.configprefix + 'loadtime')) || 5000);
      //part: `cordovaLoadTimeout`的创建，在 ../app/redirect.js
      if (window.cordovaLoadTimeout) {
        clearTimeout(window.cordovaLoadTimeout);
        delete window.cordovaLoadTimeout;
      }
      //part: 从html中，删除首次启动使用的样式（css）
      let links = document.head.querySelectorAll('link');
      for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf('app/color.css') != -1) {
          links[i].remove();
          break;
        }
      }
      //part: 如果是phantom，则禁用indexedDB
      let index = window.location.href.indexOf('index.html?server=');
      if (index != -1) {
        /**
         * 服务器ID
         * @type {string}
         * @global
         */
        window.isNonameServer = window.location.href.slice(index + 18);
        /**
         * 禁用indexedDB，为真值时禁用
         * @type {boolean}
         * @global
         */
        window.nodb = true;
      }
      else {
        //??
        index = localStorage.getItem(lib.configprefix + 'asserver');
        if (index) {
          window.isNonameServer = index;
          window.isNonameServerIp = lib.hallURL;
        }
      }
      //part: 设置背景图
      var htmlbg = localStorage.getItem(lib.configprefix + 'background');
      if (htmlbg) {
        if (htmlbg[0] == '[') {
          try {
            htmlbg = JSON.parse(htmlbg);
            htmlbg = htmlbg[get.rand(htmlbg.length)];
            if (htmlbg.indexOf('custom_') == 0) {
              throw ('err');
            }
            _status.htmlbg = htmlbg;
          }
          catch (e) {
            htmlbg = null;
          }
        }
        if (htmlbg) {
          if (htmlbg.indexOf('svg_') == 0) {
            document.documentElement.style.backgroundImage = 'url("' + lib.assetURL + 'image/background/' + htmlbg.slice(4) + '.svg")';
          }
          else {
            document.documentElement.style.backgroundImage = 'url("' + lib.assetURL + 'image/background/' + htmlbg + '.jpg")';
            document.documentElement.style.backgroundSize = 'cover';
            document.documentElement.style.backgroundPosition = '50% 50%';
          }
        }
      }
      //part: get, ui, ai, game 引用到 lib对象
      lib.get = get;
      lib.ui = ui;
      lib.ai = ai;
      lib.game = game;
      //part: 拓展 HTMLDivElement.
      /**
       * 本元素播放动画
       * @function HTMLDivElement#animate
       * @param {string} name - 动画名称
       * @param {number} [time=1000] - 动画持续时间（ms）
       * @returns {HTMLDivElement} this self
       */
      {
        HTMLDivElement.prototype.animate = function (name, time) {
          var that;
          if (get.is.mobileMe(this) && name == 'target') {
            that = ui.mebg;
          }
          else {
            that = this;
          }
          that.classList.add(name);
          setTimeout(function () {
            that.classList.remove(name);
          }, time || 1000);
          return this;
        };
        /**
         * 隐藏本元素及其子元素
         * @function HTMLDivElement#hide
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.hide = function () {
          this.classList.add('hidden');
          return this;
        };
        /**
         * 本元素取消焦点
         * @function HTMLDivElement#unfocus
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.unfocus = function () {
          if (lib.config.transparent_dialog) this.classList.add('transparent');
          return this;
        };
        /**
         * 本元素重获焦点
         * @function HTMLDivElement#refocus
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.refocus = function () {
          this.classList.remove('transparent');
          return this;
        };
        /**
         * 本元素取消隐藏
         * @function HTMLDivElement#show
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.show = function () {
          this.classList.remove('hidden');
          return this;
        };
        /**
         * @callback HTMLDivElement~deleteCallback
         * @see {@link HTMLDivElement#delete}
         */
        /**
         * 延时从所属DOM树移除本元素
         * @function HTMLDivElement#delete
         * @param {number} time - 延迟时间（ms）
         * @param {HTMLDivElement~deleteCallback} callback - 移除后回调函数
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.delete = function (time, callback) {
          if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
          }
          if (!this._listeningEnd || this._transitionEnded) {
            if (typeof time != 'number') time = 500;
            this.classList.add('removing');
            var that = this;
            this.timeout = setTimeout(function () {
              that.remove();
              that.classList.remove('removing');
              if (typeof callback == 'function') {
                callback();
              }
            }, time);
          }
          else {
            this._onEndDelete = true;
          }
          return this;
        };
        /**
         * 移动本元素(牌)
         * @function HTMLDivElement#goto
         * @param {*} position - 位置
         * @param {number} time - 持续时间
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.goto = function (position, time) {
          if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
          }

          if (typeof time != 'number') time = 500;
          this.classList.add('removing');

          var that = this;
          this.timeout = setTimeout(function () {
            if (!that.destroyed) {
              position.appendChild(that);
            }
            that.classList.remove('removing');
            delete that.destiny;
          }, time);
          this.destiny = position;
          return this;
        };
        /**
         * 强制取消移动，固定在当前位置
         * @function HTMLDivElement#fix
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.fix = function () {
          clearTimeout(this.timeout);
          delete this.timeout;
          delete this.destiny;
          this.classList.remove('removing');
          return this;
        };
        /**
         * 设置背景图片，当name为虚值或为空白字符串时，使用原背景。
         * 对应路径：`image/${type?type+'/':''}${type?subfolder+'/':''}${name}${ext}`
         * @function HTMLDivElement#setBackground
         * @param {string} [name] - 图片名（无后缀）
         * @param {string} [type] - 类型对应路径
         * @param {string} [ext='.jpg'] - 图片后缀
         * @param {string} [subfolder='default'] - 类型文件夹下的子路径，仅在参数`type`指定值时有效
         * @returns {?HTMLDivElement} this self
         */
        HTMLDivElement.prototype.setBackground = function (name, type, ext, subfolder) {
          if (!name) return;
          var src;
          if (ext == 'noskin') {
            ext = '.jpg';
          }
          ext = ext || '.jpg';
          subfolder = subfolder || 'default'
          if (type) {
            var dbimage = null, extimage = null, modeimage = null;
            var nameinfo;
            var gzbool = false;
            var mode = get.mode();
            if (type == 'character') {
              if (lib.characterPack['mode_' + mode] && lib.characterPack['mode_' + mode][name]) {
                if (mode == 'guozhan') {
                  nameinfo = lib.character[name];
                  if (name.indexOf('gz_shibing') == 0) {
                    name = name.slice(3, 11);
                  }
                  else {
                    if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].contains('gzskin')) gzbool = true;
                    name = name.slice(3);
                  }
                }
                else {
                  modeimage = mode;
                }
              }
              else if (lib.character[name]) {
                nameinfo = lib.character[name];
              }
              else if (name.indexOf('::') != -1) {
                name = name.split('::');
                modeimage = name[0];
                name = name[1];
              }
            }
            if (!modeimage && nameinfo && nameinfo[4]) {
              for (var i = 0; i < nameinfo[4].length; i++) {
                if (nameinfo[4][i].indexOf('ext:') == 0) {
                  extimage = nameinfo[4][i]; break;
                }
                else if (nameinfo[4][i].indexOf('db:') == 0) {
                  dbimage = nameinfo[4][i]; break;
                }
                else if (nameinfo[4][i].indexOf('mode:') == 0) {
                  modeimage = nameinfo[4][i].slice(5); break;
                }
                else if (nameinfo[4][i].indexOf('character:') == 0) {
                  name = nameinfo[4][i].slice(10); break;
                }
              }
            }
            if (extimage) {
              src = extimage.replace(/ext:/, 'extension/');
            }
            else if (dbimage) {
              this.setBackgroundDB(dbimage.slice(3));
              return this;
            }
            else if (modeimage) {
              src = 'image/mode/' + modeimage + '/character/' + name + ext;
            }
            else if (type == 'character' && lib.config.skin[name] && arguments[2] != 'noskin') {
              src = 'image/skin/' + name + '/' + lib.config.skin[name] + ext;
            }
            else {
              if (type == 'character') {
                src = 'image/character/' + (gzbool ? 'gz_' : '') + name + ext;
              }
              else {
                src = 'image/' + type + '/' + subfolder + '/' + name + ext;
              }
            }
          }
          else {
            src = 'image/' + name + ext;
          }
          this.setBackgroundImage(src, type === 'character' ? 'true' : null);
          this.style.backgroundSize = "cover";
          return this;
        };
        /**
         * 设置本元素的背景图片为数据库中的图片
         * @function HTMLDivElement#setBackgroundDB
         * @param {string} img - 图片对应的键值
         */
        HTMLDivElement.prototype.setBackgroundDB = function (img) {
          var node = this;
          game.getDB('image', img, function (src) {
            node.style.backgroundImage = `url('${src}')`;
            node.style.backgroundSize = "cover";
          });
        };
        /**
         * 设置本元素的背景图片
         * @function HTMLDivElement#setBackgroundImage
         * @param {string} img - 图片相对{@link lib.assetURL|assertURL}路径
         * @param {boolean} loading - 是否显示加载中图片
         */
        HTMLDivElement.prototype.setBackgroundImage = function (img, loading) {
          this.style.backgroundImage = `url("${lib.assetURL}${img}")${loading ? `,url("${lib.assetURL}image/loading.gif")` : ``}`;
        },
          /**
           * {@link HTMLDivElement#listen|listen}（click）的回调函数
           * @callback HTMLDivElement#listen~listenCallback
           * @param {(MouseEvent|TouchEvent)} e - 触发事件
           */
          /**
           * 监听点击事件
           * @function HTMLDivElement#listen
           * @param {HTMLDivElement#listen~listenCallback} func - 点击回调函数
           * @returns {HTMLDivElement} this self
           */
          HTMLDivElement.prototype.listen = function (func) {
            if (lib.config.touchscreen) {
              this.addEventListener('touchend', function (e) {
                if (!_status.dragged) {
                  func.call(this, e);
                }
              });
              var fallback = function (e) {
                if (!_status.touchconfirmed) {
                  func.call(this, e);
                }
                else {
                  this.removeEventListener('click', fallback);
                }
              }
              this.addEventListener('click', fallback);
            }
            else {
              this.addEventListener('click', func);
            }
            return this;
          };
        /**
         * @callback HTMLDivElement#listenTransition~callback
         * @see {@link HTMLDivElement#listenTransition}
         */
        /**
         * 延时触发回调函数，同时监听本元素变换动画，如果变换结束则立即触发回调函数
         * @function HTMLDivElement#listenTransition
         * @param {HTMLDivElement#listenTransition~callback} func - 回调函数
         * @param {number} [time=1000] - 延迟时间
         * @returns {!number} timeoutID 
         */
        HTMLDivElement.prototype.listenTransition = function (func, time) {
          var that = this;
          var done = false;
          var callback = function () {
            if (!done) {
              func.call(that);
              done = true;
            }
          };
          this.addEventListener('webkitTransitionEnd', callback);
          return setTimeout(callback, time || 1000);
        };
        /**
         * 设置本元素位置
         * ```JavaScript
         * top = calc(`offsets[0]`%+`offsets[1]`px)
         * left = calc(`offsets[2]`%+`offsets[3]`px)
         * ```
         * @function HTMLDivElement#setPosition
         * @param {!number[]} offsets - 偏移量数组（长度必须为4）。
         * @returns {HTMLDivElement} this self
         */
        /**
         * 设置本元素位置
         * ```JavaScript
         * top  = calc(`top_pc`%+`top_px`px)
         * left = calc(`lft_pc`%+`lft_px`px)
         * ```
         * @function HTMLDivElement#setPosition
         * @variation 2
         * @param {number} top_pc
         * @param {number} top_px
         * @param {number} lft_pc
         * @param {number} lft_px
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.setPosition = function () {
          var position;
          if (arguments.length == 4) {
            position = [];
            for (var i = 0; i < arguments.length; i++) position.push(arguments[i]);
          }
          else if (arguments.length == 1 && Array.isArray(arguments[0]) && arguments[0].length == 4) {
            position = arguments[0];
          }
          else {
            return this;
          }
          var top = 'calc(' + position[0] + '% ';
          if (position[1] > 0) top += '+ ' + position[1] + 'px)';
          else top += '- ' + Math.abs(position[1]) + 'px)';
          var left = 'calc(' + position[2] + '% ';
          if (position[3] > 0) left += '+ ' + position[3] + 'px)';
          else left += '- ' + Math.abs(position[3]) + 'px)';
          this.style.top = top;
          this.style.left = left;
          return this;
        };
        /**
         * 设置本元素css样式
         * @function HTMLDivElement#css
         * @param {Object} style - style
         * @param {string} [style.innerHTML] - 设置本元素内部HTML
         * @param {...string} [style.cssProperty] - 设置任意数量的css属性。{@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference|cssProperty}
         * @returns {HTMLDivElement} this self
         */
        HTMLDivElement.prototype.css = function (style) {
          for (var i in style) {
            if (i == 'innerHTML') {
              this.innerHTML = style[i];
            }
            else {
              this.style[i] = style[i];
            }
          }
          return this;
        };
        /**
         * 获取Table[row][col]对应的元素
         * @deprecated <span style="color:red;">[never use]</span> 实现有问题
         * @function HTMLTableElement#get
         * @param {!number} row - 行元素数组索引
         * @param {!number} col - 列元素数组索引
         * @returns {HTMLTableCellElement} 要索引的标题/单元格元素
         */
        HTMLTableElement.prototype.get = function (row, col) {
          if (row < this.childNodes.length) {
            return this.childNodes[row].childNodes[col];
          }
        };
      }
      {
        //part: 拓展数组
        /**
         * 统计数组中元素`item`出现的数量
         * @function Array#numOf
         * @param {*} item - 要统计的元素
         * @returns {!number} 统计结果（非负）
         */
        Array.prototype.numOf = function (item) {
          var num = 0;
          for (var i = 0; i < this.length; i++) {
            if (this[i] == item) num++;
          }
          return num;
        };
        //数组降维替代方案
        Array.prototype.vkflat = function (depth = 1) {
          const result = [];
          // 开始递归
          (function flat(arr, depth) {
            arr.forEach((item) => {
              if (Array.isArray(item) && depth > 0) {
                // 递归数组
                flat(item, depth - 1)
              } else {
                result.push(item)
              }
            })
          })(this, depth)
          return result;
        };
        /**
         * 创建一个新的数组（浅复制），包含原数组中匹配卡牌位置的卡牌对象
         * @function Array#filterInD
         * @param {CardPosition[]} [pos='o'] - 卡牌位置字符串，匹配其中任意位置
         * @returns {!Array} 新的数组，如果没有匹配位置的卡牌，返回空数组
         */
        Array.prototype.filterInD = function (pos) {
          if (!pos) pos = 'o';
          var list = [];
          for (var i = 0; i < this.length; i++) {
            if (pos.indexOf(get.position(this[i], true)) != -1) list.push(this[i]);
          }
          return list;
        };
        /**
         * 定位元素，等同于{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.prototype.indexOf()}
         * @function Array#find
         * @param {*} item - 要在数组中定位的元素
         * @returns {!number} 数组中元素的第一个索引；如果没有找到返回-1
         */
        Array.prototype.find = function (item) {
          return this.indexOf(item);
        };
        /**
         * 查找元素是否存在，等同于{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.prototype.indexOf(item)!=-1}
         * @function Array#contains
         * @param {any} item - 要在数组中查找的元素
         * @returns {boolean} 存在返回`true`，不存在返回`false`
         */
        Array.prototype.contains = function (item) {
          return this.indexOf(item) != -1;
        };
        /**
         * 向原数组不重复地添加任意数量的元素；但是不保证，添加前，原数组中的元素是否唯一
         * @function Array#add
         * @param {...any} elements - 要添加的任意数量的元素
         * @returns {Array} this self
         */
        Array.prototype.add = function () {
          for (var i = 0; i < arguments.length; i++) {
            if (this.contains(arguments[i])) {
              return false;
            }
            this.push(arguments[i]);
          }
          return this;
        };
        /**
         * 将数组中的元素不重复地添加（{@link Array#add}）到原数组中
         * @deprecated [since ES 2015] 使用ES2015 Spread语法（详见{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax|Spread syntax}）
         * @function Array#addArray
         * @param {!Array} arr - 要添加的数组
         * @returns {Array} this self
         */
        Array.prototype.addArray = function (arr) {
          for (var i = 0; i < arr.length; i++) {
            this.add(arr[i]);
          }
          return this;
        };
        /**
         * 删除元素，如果原数组中可以找到要删除的元素，就会移除该元素；如果原数组有多个元素与要删除的元素等值（==），仅删除第一个
         * <ul>
         *   <li>注意，该函数要删除的元素不能是数组类型，因为数组类型会被当做要删除元素组成的数组</li>
         * </ul>
         * @function Array#remove
         * @deprecated [performance warning] 该函数内部通过迭代删除每个元素，每多一个要删除的元素，就会多一次迭代
         * @param {(*|Array)} item - 要删除的元素；要删除元素的（一维|二维|多维）数组
         * @returns {?Array} this self；如果`item`是数组，返回undefined
         */
        Array.prototype.remove = function (item) {
          if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i++) this.remove(item[i]);
            return;
          }
          var pos = this.find(item);
          if (pos == -1) {
            return false;
          }
          this.splice(pos, 1);
          return this;
        };
        /**
         * 删除元素，如果原数组中可以找到要删除的元素，就会移除该元素；如果原数组有多个元素与要删除的元素等值（==），仅删除第一个
         * <ul>
         *   <li>注意，该函数要删除的元素不能是数组类型，因为数组类型会被当做要删除元素组成的数组</li>
         *   <li>对`arr`中的每个元素会调用{@link Array#remove|Array.prototype.remove}</li>
         * </ul>
         * @function Array#removeArray
         * @deprecated [performance warning] {@link Array#remove}
         * @param {!Array} arr - 要删除元素的数组
         * @returns {Array} this self
         */
        Array.prototype.removeArray = function (arr) {
          for (var i = 0; i < arr.length; i++) {
            this.remove(arr[i]);
          }
          return this;
        };
        /**
         * 从原数组中随机取出一个元素
         * @function Array#randomGet
         * @param {...any} elements - 任意元素，不包含在随机选择的元素中；实质对`elements`中的每个元素调用了{@link Array#remove|Array.prototype.remove}
         * @returns {any} 取出的元素
         */
        Array.prototype.randomGet = function () {
          var arr = this.slice(0);
          for (var i = 0; i < arguments.length; i++) arr.remove(arguments[i]);
          return arr[Math.floor(Math.random() * arr.length)];
        };
        /**
         * 返回一个新的数组，随机删除指定数量的元素
         * @function Array#randomRemove
         * @deprecated [performance warning] 该函数内部通过迭代删除每个元素，每多一个要删除的元素，就会多一次迭代
         * @param {number} [num=undefined] - 要删除的元素数量；默认移除一个
         * @returns {(Array|any)} 被删除元素的数组；当无参调用该函数时，返回被删除的元素而非数组
         */
        Array.prototype.randomRemove = function (num) {
          if (typeof num == 'number') {
            var list = [];
            for (var i = 0; i < num; i++) {
              if (this.length) {
                list.push(this.randomRemove());
              }
              else {
                break;
              }
            }
            return list;
          }
          else {
            return this.splice(Math.floor(Math.random() * this.length), 1)[0];
          }
        };
        /**
         * 对原数组随机排序
         * @function Array#randomSort
         * @returns {Array} this self
         */
        Array.prototype.randomSort = function () {
          var list = [];
          while (this.length) {
            list.push(this.randomRemove());
          }
          for (var i = 0; i < list.length; i++) {
            this.push(list[i]);
          }
          return this;
        };
        /**
         * 从原数组中随机取出指定数量的元素
         * @function Array#randomGet
         * @param {...any} elements - 任意元素，不包含在随机选择的元素中；实质对`elements`中的每个元素调用了{@link Array#remove|Array.prototype.remove}
         * @returns {!Array<any>} 随机取出的元素数组
         */
        Array.prototype.randomGets = function (num) {
          if (num > this.length) {
            num = this.length;
          }
          var arr = this.slice(0);
          var list = [];
          for (var i = 0; i < num; i++) {
            list.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
          }
          return list;
        };
        /**
         * 角色数组排序；以给定角色/当前事件角色为参考，对角色数组排序。- TODO
         * @function Array#sortBySeat
         * @param {GameCores.GameObjects.Player} target 给定的参考角色
         * @returns {Array} this self
         */
        Array.prototype.sortBySeat = function (target) {
          lib.tempSortSeat = target;
          this.sort(lib.sort.seat);
          delete lib.tempSortSeat;
          return this;
        };
        if (!Array.from) {
          /**
           * 由参数数组生成新的数组（浅复制）
           * @function Array#from
           * @param {...any} args - 参数数组
           * @returns {!Array} 生成的数组；如果`args`为虚值或为空则返回空数组
           */
          Array.from = function (args) {
            var list = [];
            if (args && args.length) {
              for (var i = 0; i < args.length; i++) {
                list.push(args[i]);
              }
            }
            return list;
          }
        }
      }
      {
        //part: 设置全局window.onkeydown, window.onload, window.onerror，直到关闭网页（退出游戏）
        /**
         * 监听键盘按下事件
         * @function
         * @global
         * @param {KeyboardEvent} e - 键盘事件
         * @listens KeyboardEvent
         */
        window.onkeydown = function (e) {
          if (!ui.menuContainer || !ui.menuContainer.classList.contains('hidden')) {
            if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
              if (e.shiftKey) {
                if (confirm('是否重置游戏？')) {
                  var noname_inited = localStorage.getItem('noname_inited');
                  var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                  localStorage.clear();
                  if (noname_inited) {
                    localStorage.setItem('noname_inited', noname_inited);
                  }
                  if (onlineKey) {
                    localStorage.setItem(lib.configprefix + 'key', onlineKey);
                  }
                  if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
                  game.reload();
                  return;
                }
              }
              else {
                game.reload();
              }
            }
            else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
              if (window.saveNonameInput) {
                window.saveNonameInput();
              }
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
            else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
              lib.node.debug();
            }
          }
          else {
            game.closePopped();
            var dialogs = document.querySelectorAll('#window>.dialog.popped:not(.static)');
            for (var i = 0; i < dialogs.length; i++) {
              dialogs[i].delete();
            }
            if (e.keyCode == 32) {
              var node = ui.window.querySelector('pausedbg');
              if (node) {
                node.click();
              }
              else {
                ui.click.pause();
              }
            }
            else if (e.keyCode == 65) {
              if (ui.auto) ui.auto.click();
            }
            else if (e.keyCode == 87) {
              if (ui.wuxie && ui.wuxie.style.display != 'none') {
                ui.wuxie.classList.toggle('glow')
              }
              else if (ui.tempnowuxie) {
                ui.tempnowuxie.classList.toggle('glow')
              }
            }
            else if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
              if (e.shiftKey) {
                if (confirm('是否重置游戏？')) {
                  var noname_inited = localStorage.getItem('noname_inited');
                  var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                  localStorage.clear();
                  if (noname_inited) {
                    localStorage.setItem('noname_inited', noname_inited);
                  }
                  if (onlineKey) {
                    localStorage.setItem(lib.configprefix + 'key', onlineKey);
                  }
                  if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
                  game.reload();
                  return;
                }
              }
              else {
                game.reload();
              }
            }
            else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
            else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
              lib.node.debug();
            }
            // else if(e.keyCode==27){
            //     if(!ui.arena.classList.contains('paused')) ui.click.config();
            // }
          }
        };
        /**
         * window加载结束时调用
         * @function
         * @global
         */
        window.onload = function () {
          if (lib.device) {
            var script = document.createElement('script');
            script.src = 'cordova.js';
            document.body.appendChild(script);
            document.addEventListener('deviceready', function () {
              if (init.cordovaReady) {
                init.cordovaReady();
                delete init.cordovaReady;
              }
            });
          }
          if (_status.packLoaded) {
            delete _status.packLoaded;
            init.onload();
          }
          else {
            /**
             * 当onload调用先于包的加载时，标志onload已经运行完毕，直至包全部加载完毕则删除该标志
             * @private
             * @default
             */
            _status.windowLoaded = true;
          }
        };
        /**
         * 触发错误时调用
         * @function
         * @global
         * @param {string} msg - 错误信息
         * @param {string} src - 引发错误的脚本URL
         * @param {string} line - 引发错误的行号
         * @param {string} column - 发生错误的行的列号
         * @param {Error} err - 错误对象
         */
        window.onerror = function (msg, src, line, column, err) {
          var str = msg;
          if (window._status && _status.event) {
            var evt = _status.event;
            str += ('\n' + evt.name + ': ' + evt.step);
            if (evt.parent) str += '\n' + evt.parent.name + ': ' + evt.parent.step;
            if (evt.parent && evt.parent.parent) str += '\n' + evt.parent.parent.name + ': ' + evt.parent.parent.step;
            if (evt.player || evt.target || evt.source || evt.skill || evt.card) {
              str += '\n-------------'
            }
            if (evt.player) {
              str += '\nplayer: ' + evt.player.name;
            }
            if (evt.target) {
              str += '\ntarget: ' + evt.target.name;
            }
            if (evt.source) {
              str += '\nsource: ' + evt.source.name;
            }
            if (evt.skill) {
              str += '\nskill: ' + evt.skill.name;
            }
            if (evt.card) {
              str += '\ncard: ' + evt.card.name;
            }
          }
          str += '\n-------------';
          str += '\n' + line;
          str += '\n' + column;
          if (err && err.stack) str += '\n' + decodeURI(err.stack);
          alert(str);
          window.ea = Array.from(arguments);
          window.em = msg;
          window.el = line;
          window.ec = column;
          window.eo = err;
          game.print(msg);
          game.print(line);
          game.print(column);
          game.print(decodeURI(err.stack));
          if (!lib.config.errstop) {
            _status.withError = true;
            game.loop();
          }
        };
      }
      //part: 更新内容，window.nogame_update，创建于config.js
      if (window.noname_update) {
        lib.version = window.noname_update.version;
        lib.changeLog = window.noname_update.changeLog;
        if (window.noname_update.players) {
          lib.changeLog.push('players://' + JSON.stringify(window.noname_update.players));
        }
        if (window.noname_update.cards) {
          lib.changeLog.push('cards://' + JSON.stringify(window.noname_update.cards));
        }
        delete window.noname_update;
      }
      //part: 如果是移动端，设置移动设备信息lib.device, 资源根路径lib.assetURL
      var noname_inited = localStorage.getItem('noname_inited');
      if (noname_inited && noname_inited !== 'nodejs') {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('android') != -1) {
          lib.device = 'android';
        }
        else if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1) {
          lib.device = 'ios';
        }
        lib.assetURL = noname_inited;
      }
      //part: flag变量，标志`ui.css`是否加载完成，完成时设置为true；如果其他UI和config数据加载完成时`ui.css`未加载完毕，寄存config数据于`config3`，并在css加载完成时调用
      var config3 = null;
      var proceed = function (config2) {
        //[recommend] 移到`init`函数结尾更好，`proceed`函数更整洁
        if (config3 === null) {
          config3 = config2;
          return;
        }
        //part: 如果`config2.mode`存在，则直接进入游戏的`config2.mode`；模式初始化`lib.config.mode_config`
        if (config2.mode) lib.config.mode = config2.mode;
        if (lib.config.mode_config[lib.config.mode] == undefined) lib.config.mode_config[lib.config.mode] = {};
        for (let i in lib.config.mode_config.global) {
          if (lib.config.mode_config[lib.config.mode][i] == undefined) {
            lib.config.mode_config[lib.config.mode][i] = lib.config.mode_config.global[i];
          }
        }
        //part: defaultcharacters
        if (lib.config.characters) {
          lib.config.defaultcharacters = lib.config.characters.slice(0);
        }
        //part: defaultcards
        if (lib.config.cards) {
          lib.config.defaultcards = lib.config.cards.slice(0);
        }
        //part: 从`config2`加载`lib.config`和`_mode_config`的数据
        for (let i in config2) {
          if (i.indexOf('_mode_config') != -1) {
            var thismode = i.substr(i.indexOf('_mode_config') + 13);
            if (!lib.config.mode_config[thismode]) {
              lib.config.mode_config[thismode] = {};
            }
            lib.config.mode_config[thismode][i.substr(0, i.indexOf('_mode_config'))] = config2[i];
          }
          else {
            lib.config[i] = config2[i];
          }
        }
        //part: 从`lib.config.translate`拷贝到`lib.translate`
        for (let i in lib.config.translate) {
          lib.translate[i] = lib.config.translate[i];
        }

        lib.config.all.characters = [];
        lib.config.all.cards = [];
        lib.config.all.plays = [];
        lib.config.all.mode = [];
        //part: 如果测试模式已开启，重置资源列表
        if (lib.config.debug) {
          init.js(lib.assetURL + 'game', 'asset', function () {
            lib.skin = window.vk_skin_list;
            delete window.vk_skin_list;
            delete window.vk_asset_list;
          });
        }

        if (window.isNonameServer) {
          lib.config.mode = 'connect';
        }
        //part: `window.vk_package`，创建于package.js
        var pack = window.vk_package;
        delete window.vk_package;
        if (lib.init_pack) {
          lib.init_pack(pack)
        }
        for (let i in pack.character) {
          if (lib.config.hiddenCharacterPack.indexOf(i) == -1) {
            lib.config.all.characters.push(i);
            lib.translate[i + '_character_config'] = pack.character[i];
          }
        }
        for (let i in pack.card) {
          if (lib.config.hiddenCardPack.indexOf(i) == -1) {
            lib.config.all.cards.push(i);
            lib.translate[i + '_card_config'] = pack.card[i];
          }
        }
        for (let i in pack.play) {
          lib.config.all.plays.push(i);
          lib.translate[i + '_play_config'] = pack.play[i];
        }
        for (let i in pack.submode) {
          for (let j in pack.submode[i]) {
            lib.translate[i + '|' + j] = pack.submode[i][j];
          }
        }

        if (!lib.config.gameRecord) {
          lib.config.gameRecord = {};
        }
        for (let i in pack.mode) {
          if (lib.config.hiddenModePack.indexOf(i) == -1) {
            lib.config.all.mode.push(i);
            lib.translate[i] = pack.mode[i];
            if (!lib.config.gameRecord[i]) {
              lib.config.gameRecord[i] = { data: {} };
            }
          }
        }
        //??
        if (lib.config.all.mode.length == 0) {
          lib.config.all.mode.push('identity');
          lib.translate.identity = '身份';
          if (!lib.config.gameRecord.identity) {
            lib.config.gameRecord.identity = { data: {} };
          }
        }
        {
          if (pack.background) {
            for (let i in pack.background) {
              if (lib.config.hiddenBackgroundPack.contains(i)) continue;
              lib.configMenu.appearence.config.image_background.item[i] = pack.background[i];
            }
            for (let i = 0; i < lib.config.customBackgroundPack.length; i++) {
              var link = lib.config.customBackgroundPack[i];
              lib.configMenu.appearence.config.image_background.item[link] = link.slice(link.indexOf('_') + 1);
            }
            lib.configMenu.appearence.config.image_background.item.default = '默认';
          }
          if (pack.music) {
            if (lib.device || typeof window.require == 'function') {
              lib.configMenu.audio.config.background_music.item.music_custom = '自定义音乐';
            }
            lib.config.all.background_music = ['music_danji'];
            for (let i in pack.music) {
              lib.config.all.background_music.push(i);
              lib.configMenu.audio.config.background_music.item[i] = pack.music[i];
            }
            if (lib.config.customBackgroundMusic) {
              for (let i in lib.config.customBackgroundMusic) {
                lib.config.all.background_music.push(i);
                lib.configMenu.audio.config.background_music.item[i] = lib.config.customBackgroundMusic[i];
              }
            }
            lib.configMenu.audio.config.background_music.item.music_random = '随机播放';
            lib.configMenu.audio.config.background_music.item.music_off = '关闭';
          }
          if (pack.theme) {
            for (let i in pack.theme) {
              lib.configMenu.appearence.config.theme.item[i] = pack.theme[i];
            }
          }
          if (lib.config.extension_sources) {
            for (let i in lib.config.extension_sources) {
              lib.configMenu.general.config.extension_source.item[i] = i;
            }
          }

          if (pack.font) {
            ui.css.fontsheet = init.sheet();
            for (let i in pack.font) {
              lib.configMenu.appearence.config.name_font.item[i] = pack.font[i];
              lib.configMenu.appearence.config.identity_font.item[i] = pack.font[i];
              lib.configMenu.appearence.config.cardtext_font.item[i] = pack.font[i];
              lib.configMenu.appearence.config.global_font.item[i] = pack.font[i];
              ui.css.fontsheet.sheet.insertRule(`@font-face {font-family: '${i}';src: url('${lib.assetURL}font/${i}.ttf');}`, 0);
            }
            lib.configMenu.appearence.config.cardtext_font.item.default = '默认';
            lib.configMenu.appearence.config.global_font.item.default = '默认';
          }
        }
        //part: touch, layout, scroll config
        var ua = navigator.userAgent.toLowerCase();
        if ('ontouchstart' in document) {
          //移动端
          if (!lib.config.totouched) {
            game.saveConfig('totouched', true);
            if (lib.device) {
              //移动端通过客户端访问
              game.saveConfig('low_performance', true);
              game.saveConfig('confirm_exit', true);
              game.saveConfig('touchscreen', true);
              game.saveConfig('fold_mode', false);
              if (ua.indexOf('ipad') == -1) {
                game.saveConfig('phonelayout', true);
              }
              else if (lib.device == 'ios') {
                game.saveConfig('show_statusbar_ios', 'overlay');
              }
            }
            else if (confirm('是否切换到触屏模式？（触屏模式可提高触屏设备的响应速度，但无法使用鼠标）')) {
              //移动端通过网页访问
              game.saveConfig('touchscreen', true);
              if (ua.indexOf('iphone') != -1 || ua.indexOf('android') != -1) {
                game.saveConfig('phonelayout', true);
              }

              game.reload();
            }
          }
        }
        else if (lib.config.touchscreen) {//非移动端，如果触屏模式开启，就设置关闭
          game.saveConfig('touchscreen', false);
        }

        if (!lib.config.toscrolled && ua.indexOf('macintosh') != -1) {
          game.saveConfig('toscrolled', true);
          game.saveConfig('mousewheel', false);
        }
        //part: 是否打开开始界面
        var show_splash = lib.config.show_splash;
        if (show_splash == 'off') {
          show_splash = false;
        }
        else if (show_splash == 'init') {
          if (localStorage.getItem('show_splash_off')) {
            show_splash = false;
          }
        }
        localStorage.removeItem('show_splash_off');
        //part: extension list
        //??
        //[never executed]
        var extensionlist = [];
        if (!localStorage.getItem(lib.configprefix + 'disable_extension')) {
          if (lib.config.extensions && lib.config.extensions.length) {
            window.resetExtension = function () {
              for (let i = 0; i < lib.config.extensions.length; i++) {
                game.saveConfig('extension_' + lib.config.extensions[i] + '_enable', false);
              }
              localStorage.setItem(lib.configprefix + 'disable_extension', true);
            }
          }
          for (let i = 0; i < lib.config.plays.length; i++) {
            if (lib.config.all.plays.indexOf(lib.config.plays[i]) != -1) {
              extensionlist.push(lib.config.plays[i]);
            }
          }
          for (let i = 0; i < lib.config.extensions.length; i++) {
            var extcontent = localStorage.getItem(lib.configprefix + 'extension_' + lib.config.extensions[i]);
            if (extcontent) {
              _status.evaluatingExtension = true;
              try {
                eval(extcontent);
              }
              catch (e) {
                console.log(e);
              }
              _status.evaluatingExtension = false;
            }
            else if (lib.config.mode != 'connect' || (!localStorage.getItem(lib.configprefix + 'directstart') && show_splash)) {
              extensionlist.push(lib.config.extensions[i]);
            }
          }
        }
        else {
          if (lib.config.mode != 'connect' || (!localStorage.getItem(lib.configprefix + 'directstart') && show_splash)) {
            for (let i = 0; i < lib.config.extensions.length; i++) {
              game.import('extension', { name: lib.config.extensions[i] });
            }
          }
        }
        //用于加载包的函数
        let loadPack = function () {
          let toLoad = 2;
          let packLoaded = function () {
            toLoad--;
            if (toLoad == 0) {
              if (_status.windowLoaded) {
                delete _status.windowLoaded;
                init.onload();
              }
              else {
                /**
                 * 当包加载完毕先于window.onload时，标志包已经加载完毕，直至onload加载完毕则删除该标志
                 * @private
                 * @default
                 */
                _status.packLoaded = true;
              }
            }
          };
          if (localStorage.getItem(lib.configprefix + 'playback')
            || ((localStorage.getItem(lib.configprefix + 'directstart') || !show_splash) &&
              lib.config.all.mode.indexOf(lib.config.mode) != -1)) {
            toLoad++;
            init.js(dist(), 'mode', packLoaded, packLoaded);
          }
          init.js(dist(), ['card', 'character'], packLoaded, packLoaded);
        };
        //part: 检查layout并设置`game.layout = layout`
        let layout = lib.config.layout;
        if (lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
          layout = 'mobile';
        }
        if (layout == 'phone') {
          layout = 'mobile';
          game.saveConfig('layout', 'mobile');
          game.saveConfig('phonelayout', true);
        }
        game.layout = layout;
        //part: 随机选取背景或选择_status.htmlbg作为背景图像
        if (lib.config.image_background_random) {
          if (_status.htmlbg) {
            game.saveConfig('image_background', _status.htmlbg);
          }
          else {
            console.log(lib.configMenu.appearence.config.image_background.item)
            let list = [];
            for (let i in lib.configMenu.appearence.config.image_background.item) {
              if (i == 'default') continue;
              list.push(i);
            }
            game.saveConfig('image_background', list.randomGet(lib.config.image_background));
          }
          init.background();
        }
        delete _status.htmlbg;
        //part: game to window.game
        window.game = game;
        //part: 加载js(卡牌, 角色, 模式拓展等)以及css(UI布局, 样式)
        let styleToLoad = 6;
        let styleLoaded = function () {
          styleToLoad--;
          if (styleToLoad == 0) {
            if (extensionlist.length && (lib.config.mode != 'connect' || show_splash)) {
              let extToLoad = extensionlist.length;
              let extLoaded = function () {
                extToLoad--;
                if (extToLoad == 0) {
                  loadPack();
                }
              }
              for (let i = 0; i < extensionlist.length; i++) {
                init.js(lib.assetURL + 'extension/' + extensionlist[i], 'extension', extLoaded, (function (i) {
                  return function () {
                    game.removeExtension(i);
                    extToLoad--;
                    if (extToLoad == 0) {
                      loadPack();
                    }
                  }
                }(extensionlist[i])));
              }
            }
            else {
              loadPack();
            }
          }
        };
        //css.layout
        if (lib.config.layout != 'default') {
          ui.css.layout = init.css(lib.assetURL + 'layout/' + layout, 'layout', styleLoaded);
        }
        else {
          ui.css.layout = init.css();
          styleToLoad--;
        }
        //css.phone
        if (get.is.phoneLayout()) {
          ui.css.phone = init.css(lib.assetURL + 'layout/default', 'phone', styleLoaded);
        }
        else {
          ui.css.phone = init.css();
          styleToLoad--;
        }
        //css.theme
        ui.css.theme = init.css(lib.assetURL + 'theme/' + lib.config.theme, 'style', styleLoaded);
        //css.card_style
        ui.css.card_style = init.css(lib.assetURL + 'theme/style/card', lib.config.card_style, styleLoaded);
        //css_cardpack_style
        ui.css.cardback_style = init.css(lib.assetURL + 'theme/style/cardback', lib.config.cardback_style, styleLoaded);
        //css.hp_style
        ui.css.hp_style = init.css(lib.assetURL + 'theme/style/hp', lib.config.hp_style, styleLoaded);
        //part: 通过配置创建`<link>`, 设置角色牌的背景、边框、边饰、文本样式
        if (lib.config.player_style && lib.config.player_style != 'default' && lib.config.player_style != 'custom') {
          let str = '';
          switch (lib.config.player_style) {
            case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
            case 'music': str = 'linear-gradient(#4b4b4b, #464646)'; break;
            case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
          }
          ui.css.player_stylesheet = init.sheet('#window .player{background-image:' + str + '}');
        }
        if (lib.config.border_style && lib.config.border_style != 'default' && lib.config.border_style != 'custom' && lib.config.border_style != 'auto') {
          ui.css.border_stylesheet = init.sheet();
          let bstyle = lib.config.border_style;
          if (bstyle.indexOf('dragon_') == 0) {
            bstyle = bstyle.slice(7);
          }
          ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + 'theme/style/player/' + bstyle + '1.png")}', 0);
          ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + 'theme/style/player/' + bstyle + '3.png")}', 0);
          ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
        }
        if (lib.config.control_style && lib.config.control_style != 'default' && lib.config.control_style != 'custom') {
          let str = '';
          switch (lib.config.control_style) {
            case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
            case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
            case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
          }
          if (lib.config.control_style == 'wood') {
            ui.css.control_stylesheet = init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:' + str + '}');
          }
          else {
            ui.css.control_stylesheet = init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:' + str + '}');
          }
        }
        if (lib.config.menu_style && lib.config.menu_style != 'default' && lib.config.menu_style != 'custom') {
          let str = '';
          switch (lib.config.menu_style) {
            case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")'; break;
            case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
            case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
          }
          ui.css.menu_stylesheet = init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:' + str + '}');
        }
        //part: ??
        lib.config.duration = 500;
        //part: add mouse/touch Evt listeners to document.
        if (!lib.config.touchscreen) {
          document.addEventListener('mousewheel', ui.click.windowmousewheel, { passive: true });
          document.addEventListener('mousemove', ui.click.windowmousemove);
          document.addEventListener('mousedown', ui.click.windowmousedown);
          document.addEventListener('mouseup', ui.click.windowmouseup);
          document.addEventListener('contextmenu', ui.click.right);
        }
        else {
          document.addEventListener('touchstart', ui.click.touchconfirm);
          document.addEventListener('touchstart', ui.click.windowtouchstart);
          document.addEventListener('touchend', ui.click.windowtouchend);
          document.addEventListener('touchmove', ui.click.windowtouchmove);
        }
      };
      var proceed2 = function () {
        if (config3) {
          proceed(config3);
        }
        else {
          config3 = true;
        }
      };
      require('@l/basis.less')
      //part: 初始化ui.css.menu和ui.css.default样式
      ui.css = {
        menu: init.css(lib.assetURL + 'layout/default', 'menu', function () {
          ui.css.default = init.css(lib.assetURL + 'layout/default', 'layout');
          proceed2();
        })
      };
      //part: config for different type of devices(PC, mobile devices).
      if (lib.device) {
        //移动端，window加载完成时被调用
        init.cordovaReady = function () {
          if (lib.device == 'android') {
            document.addEventListener("pause", function () {
              if (!_status.paused2 && (typeof _status.event.isMine == 'function' && !_status.event.isMine())) {
                ui.click.pause();
              }
              if (ui.backgroundMusic) {
                ui.backgroundMusic.pause();
              }
            });
            document.addEventListener("resume", function () {
              if (ui.backgroundMusic) {
                ui.backgroundMusic.play();
              }
            });
            document.addEventListener("backbutton", function () {
              if (ui.arena && ui.arena.classList.contains('menupaused')) {
                if (window.saveNonameInput) {
                  window.saveNonameInput();
                }
                else {
                  ui.click.configMenu();
                }
              }
              else if (lib.config.confirm_exit) {
                navigator.notification.confirm(
                  '是否退出游戏？',
                  function (index) {
                    switch (index) {
                      case 2: game.saveConfig('null'); game.reload(); break;
                      case 3: navigator.app.exitApp(); break;
                    }
                  },
                  '确认退出',
                  ['取消', '重新开始', '退出']
                );
              }
              else {
                navigator.app.exitApp();
              }
            });
          }
          game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
            if (url.indexOf('http') != 0) {
              url = get.url(dev) + url;
            }
            var fileTransfer = new FileTransfer();
            folder = lib.assetURL + folder;
            if (onprogress) {
              fileTransfer.onprogress = function (progressEvent) {
                onprogress(progressEvent.loaded, progressEvent.total);
              };
            }
            lib.config.brokenFile.add(folder);
            game.saveConfigValue('brokenFile');
            fileTransfer.download(encodeURI(url), encodeURI(folder), function () {
              lib.config.brokenFile.remove(folder);
              game.saveConfigValue('brokenFile');
              if (onsuccess) {
                onsuccess();
              }
            }, onerror);
          };
          game.readFile = function (filename, callback, onerror) {
            window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
              entry.getFile(filename, {}, function (fileEntry) {
                fileEntry.file(function (fileToLoad) {
                  var fileReader = new FileReader();
                  fileReader.onload = function (e) {
                    callback(e.target.result);
                  };
                  fileReader.readAsArrayBuffer(fileToLoad);
                }, onerror);
              }, onerror);
            }, onerror);
          };
          game.writeFile = function (data, path, name, callback) {
            game.ensureDirectory(path, function () { });
            if (Object.prototype.toString.call(data) == '[object File]') {
              var fileReader = new FileReader();
              fileReader.onload = function (e) {
                game.writeFile(e.target.result, path, name, callback);
              };
              fileReader.readAsArrayBuffer(data);
            }
            else {
              window.resolveLocalFileSystemURL(lib.assetURL + path, function (entry) {
                entry.getFile(name, { create: true }, function (fileEntry) {
                  fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = callback;
                    fileWriter.write(data);
                  });
                });
              });
            }
          };
          game.removeFile = function (dir, callback) {
            window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
              entry.getFile(dir, {}, function (fileEntry) {
                fileEntry.remove();
                if (callback) {
                  callback();
                }
              });
            });
          };
          game.getFileList = function (dir, callback) {
            var files = [], folders = [];
            window.resolveLocalFileSystemURL(lib.assetURL + dir, function (entry) {
              var dirReader = entry.createReader();
              var entries = [];
              var readEntries = function () {
                dirReader.readEntries(function (results) {
                  if (!results.length) {
                    entries.sort();
                    for (var i = 0; i < entries.length; i++) {
                      if (entries[i].isDirectory) {
                        folders.push(entries[i].name);
                      }
                      else {
                        files.push(entries[i].name);
                      }
                    }
                    callback(folders, files);
                  }
                  else {
                    entries = entries.concat(Array.from(results));
                    readEntries();
                  }
                });
              };
              readEntries();
            });
          };
          game.ensureDirectory = function (list, callback, file) {
            var directorylist;
            var num = 0;
            if (file) {
              num = 1;
            }
            if (typeof list == 'string') {
              directorylist = [list];
            }
            else {
              var directorylist = list.slice(0);
            }
            window.resolveLocalFileSystemURL(lib.assetURL, function (rootEntry) {
              var access = function (entry, dir, callback) {
                if (dir.length <= num) {
                  callback();
                }
                else {
                  var str = dir.shift();
                  entry.getDirectory(str, { create: false }, function (entry) {
                    access(entry, dir, callback);
                  }, function () {
                    entry.getDirectory(str, { create: true }, function (entry) {
                      access(entry, dir, callback);
                    });
                  });
                }
              }
              var createDirectory = function () {
                if (directorylist.length) {
                  access(rootEntry, directorylist.shift().split('/'), createDirectory);
                }
                else {
                  callback();
                }
              };
              createDirectory();
            });
          }
          if (ui.updateUpdate) {
            ui.updateUpdate();
          }
          var showbar = function () {
            if (window.StatusBar) {
              if (lib.device == 'android') {
                if (lib.config.show_statusbar_android) {
                  window.StatusBar.overlaysWebView(false);
                  window.StatusBar.backgroundColorByName('black');
                  window.StatusBar.show();
                }
              }
              else if (lib.device == 'ios') {
                if (lib.config.show_statusbar_ios != 'off' && lib.config.show_statusbar_ios != 'auto') {
                  if (lib.config.show_statusbar_ios == 'default') {
                    window.StatusBar.overlaysWebView(false);
                  }
                  else {
                    window.StatusBar.overlaysWebView(true);
                  }
                  window.StatusBar.backgroundColorByName('black');
                  window.StatusBar.show();
                }
              }
            }
          }
          if (lib.arenaReady) {
            lib.arenaReady.push(showbar);
          }
          else {
            showbar();
          }
        }
      }
      else if (typeof window.require == 'function') {
        //part: PC端
        lib.node = {
          fs: require('fs'),
          debug: function () {
            require('electron').remote.getCurrentWindow().toggleDevTools();
          }
        };
        game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
          if (url.indexOf('http') != 0) {
            url = get.url(dev) + url;
          }
          game.ensureDirectory(folder, function () {
            try {
              var file = lib.node.fs.createWriteStream(__dirname + '/' + folder);
            }
            catch (e) {
              onerror();
            }
            lib.config.brokenFile.add(folder);
            game.saveConfigValue('brokenFile');
            if (!lib.node.http) lib.node.http = require('http');
            if (!lib.node.https) lib.node.https = require('https');
            var opts = require('url').parse(encodeURI(url));
            opts.headers = { 'User-Agent': 'AppleWebkit' };
            var request = (url.indexOf('https') == 0 ? lib.node.https : lib.node.http).get(opts, function (response) {
              var stream = response.pipe(file);
              stream.on('finish', function () {
                lib.config.brokenFile.remove(folder);
                game.saveConfigValue('brokenFile');
                if (onsuccess) {
                  onsuccess();
                }
              });
              stream.on('error', onerror);
              if (onprogress) {
                var streamInterval = setInterval(function () {
                  if (stream.closed) {
                    clearInterval(streamInterval);
                  }
                  else {
                    onprogress(stream.bytesWritten);
                  }
                }, 200);
              }
            });
          }, true);
        };
        game.readFile = function (filename, callback, onerror) {
          lib.node.fs.readFile(__dirname + '/' + filename, function (err, data) {
            if (err) {
              onerror(err);
            }
            else {
              callback(data);
            }
          });
        };
        game.writeFile = function (data, path, name, callback) {
          game.ensureDirectory(path, function () { });
          if (Object.prototype.toString.call(data) == '[object File]') {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              game.writeFile(e.target.result, path, name, callback);
            };
            fileReader.readAsArrayBuffer(data);
          }
          else {
            get.zip(function (zip) {
              zip.file('i', data);
              lib.node.fs.writeFile(__dirname + '/' + path + '/' + name, zip.files.i.asNodeBuffer(), null, callback);
            });
          }
        };
        game.removeFile = function (filename, callback) {
          lib.node.fs.unlink(__dirname + '/' + filename, callback || function () { });
        };
        game.getFileList = function (dir, callback) {
          var files = [], folders = [];
          dir = __dirname + '/' + dir;
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
        };
        game.ensureDirectory = function (list, callback, file) {
          var directorylist;
          var num = 0;
          if (file) {
            num = 1;
          }
          if (typeof list == 'string') {
            directorylist = [list];
          }
          else {
            var directorylist = list.slice(0);
          }
          var access = function (str, dir, callback) {
            if (dir.length <= num) {
              callback();
            }
            else {
              str += '/' + dir.shift();
              lib.node.fs.access(__dirname + str, function (e) {
                if (e) {
                  try {
                    lib.node.fs.mkdir(__dirname + str, function () {
                      access(str, dir, callback);
                    });
                  }
                  catch (e) {
                    console.log(e);
                  }
                }
                else {
                  access(str, dir, callback);
                }
              });
            }
          }
          var createDirectory = function () {
            if (directorylist.length) {
              access('', directorylist.shift().split('/'), createDirectory);
            }
            else {
              callback();
            }
          };
          createDirectory();
        };
        if (ui.updateUpdate) {
          ui.updateUpdate();
        }
      }
      else {
        //part: 网页端
        window.onbeforeunload = function () {
          if (lib.config.confirm_exit && !_status.reloading) {
            return '是否离开游戏？'
          }
          else {
            return null;
          }
        }
      }
      //part: 游戏设置信息，window.config，创建于config.js
      lib.config = window.config;
      //part: 联机部分的设置
      lib.configOL = {};
      delete window.config;
      var config2;
      if (localStorage.getItem(lib.configprefix + 'nodb')) {
        window.nodb = true;
      }
      //part: 持久化数据
      //`config2` 在这里从indexedDB/localStorage加载config数据，存入`config2`；`config2`，可能是`{}`，`false`或者读取到的config对象
      //如果config加载完成时，`ui.css`未加载完成，则暂存`config2`于`config3`中，等到完成再调用`proceed`
      if (window.indexedDB && !window.nodb) {
        //part: indexedDB
        var request = window.indexedDB.open(lib.configprefix + 'data', 4);
        request.onupgradeneeded = function (e) {
          var db = e.target.result;
          if (!db.objectStoreNames.contains('video')) {
            db.createObjectStore('video', { keyPath: 'time' });
          }
          if (!db.objectStoreNames.contains('image')) {
            db.createObjectStore('image');
          }
          if (!db.objectStoreNames.contains('audio')) {
            db.createObjectStore('audio');
          }
          if (!db.objectStoreNames.contains('config')) {
            db.createObjectStore('config');
          }
          if (!db.objectStoreNames.contains('data')) {
            db.createObjectStore('data');
          }
        };
        request.onsuccess = function (e) {
          lib.db = e.target.result;
          //part: indexedDB 读取config对象
          game.getDB('config', null, function (obj) {
            if (!obj.storageImported) {
              try {
                config2 = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
                if (!config2 || typeof config2 != 'object') throw 'err'
              }
              catch (err) {
                config2 = {};
              }
              for (var i in config2) {
                game.saveConfig(i, config2[i]);
              }
              for (var i in _mode) {
                try {
                  config2 = JSON.parse(localStorage.getItem(lib.configprefix + i));
                  if (!config2 || typeof config2 != 'object' || get.is.empty(config2)) throw 'err'
                }
                catch (err) {
                  config2 = false;
                }
                localStorage.removeItem(lib.configprefix + i);
                if (config2) {
                  game.putDB('data', i, config2);
                }
              }
              game.saveConfig('storageImported', true);
              //init background
              init.background();
              localStorage.removeItem(lib.configprefix + 'config');
            }
            else {
              config2 = obj;
            }
            proceed(config2);
          });
        }
      }
      else {
        //part: localStorage
        try {
          config2 = JSON.parse(localStorage.getItem(lib.configprefix + 'config'));
          if (!config2 || typeof config2 != 'object') throw 'err'
        }
        catch (err) {
          config2 = {};
          localStorage.setItem(lib.configprefix + 'config', JSON.stringify({}));
        }
        proceed(config2);
      }
      if (lib.init_extra) {
        lib.init_extra()
      }
    },
    /**
     * 重置游戏
     * 在游戏初始载入过程中超时的回调函数，发出弹窗询问是否重置（重启）游戏。
     * @function
     */
    reset: function () {
      if (window.inSplash) return;
      if (window.resetExtension) {
        if (confirm('游戏似乎未正常载入，是否禁用扩展并重新打开？')) {
          window.resetExtension();
          window.location.reload();
        }
      }
      else {
        if (lib.device) {
          if (navigator.notification) {
            navigator.notification.confirm(
              '游戏似乎未正常载入，是否重置游戏？',
              function (index) {
                if (index == 2) {
                  localStorage.removeItem('noname_inited');
                  window.location.reload();
                }
                else if (index == 3) {
                  var noname_inited = localStorage.getItem('noname_inited');
                  var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                  localStorage.clear();
                  if (noname_inited) {
                    localStorage.setItem('noname_inited', noname_inited);
                  }
                  if (onlineKey) {
                    localStorage.setItem(lib.configprefix + 'key', onlineKey);
                  }
                  if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
                  setTimeout(function () {
                    window.location.reload();
                  }, 200);
                }
              },
              '确认退出',
              ['取消', '重新下载', '重置设置']
            );
          }
          else {
            if (confirm('游戏似乎未正常载入，是否重置游戏？')) {
              localStorage.removeItem('noname_inited');
              window.location.reload();
            }
          }
        }
        else {
          if (confirm('游戏似乎未正常载入，是否重置游戏？')) {
            var onlineKey = localStorage.getItem(lib.configprefix + 'key');
            localStorage.clear();
            if (onlineKey) {
              localStorage.setItem(lib.configprefix + 'key', onlineKey);
            }
            if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
            setTimeout(function () {
              window.location.reload();
            }, 200);
          }
        }
      }
    },
    /**
     * 游戏初始载入成功时被调用，加载游戏样式数据，并载入开始界面。
     * @function
     */
    onload: function () {
      ui.updated();
      /**
       * 文档缩放比例
       * @type {number}
       */
      game.documentZoom = game.deviceZoom;
      if (game.documentZoom != 1) {
        ui.updatez();
      }
      {
        if (!lib.config.low_performance) game.clickCanvas.init()
        ui.background = ui.create.div('.background');
        ui.background.style.backgroundSize = "cover";
        ui.background.style.backgroundPosition = '50% 50%';
        if (lib.config.image_background && lib.config.image_background != 'default' && lib.config.image_background.indexOf('custom_') != 0) {
          if (lib.config.image_background.indexOf('svg_') == 0) {
            ui.background.setBackgroundImage('image/background/' + lib.config.image_background.slice(4) + '.svg');
          }
          else {
            ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');

            ui.backgroundFlash = ui.create.div('.background', ui.background);
            ui.backgroundFlash.style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.4) 60%,rgba(255, 255, 255, 0.6))`;
            ui.backgroundFlash.style.mixBlendMode = 'overlay';
            ui.backgroundSVG = ui.create.div('.background.slow_flash', ui.backgroundFlash);
            ui.backgroundSVG.style.backgroundImage = `url("${lib.assetURL}image/background/simple1_bg.svg")`;
          }
          if (lib.config.image_background_blur) {
            ui.background.style.filter = 'blur(8px)';
            ui.background.style.webkitFilter = 'blur(8px)';
            ui.background.style.transform = 'scale(1.05)';
          }
        }
        document.documentElement.style.backgroundImage = '';
        document.documentElement.style.backgroundSize = '';
        document.documentElement.style.backgroundPosition = '';
        document.body.insertBefore(ui.background, document.body.firstChild);
        document.body.onresize = ui.updatexr;
        if (lib.config.touchscreen) {
          document.body.addEventListener('touchstart', function (e) {
            this.startX = e.touches[0].clientX / game.documentZoom;
            this.startY = e.touches[0].clientY / game.documentZoom;
            _status.dragged = false;
          });
          document.body.addEventListener('touchmove', function (e) {
            if (_status.dragged) return;
            if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 ||
              Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
              _status.dragged = true;
            }
          });
        }
      }
      {
        if (lib.config.image_background.indexOf('custom_') == 0) {
          ui.background.style.backgroundImage = "none";
          game.getDB('image', lib.config.image_background, function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              var data = fileLoadedEvent.target.result;
              ui.background.style.backgroundImage = 'url(' + data + ')';
              if (lib.config.image_background_blur) {
                ui.background.style.filter = 'blur(8px)';
                ui.background.style.webkitFilter = 'blur(8px)';
                ui.background.style.transform = 'scale(1.05)';
              }
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.card_style == 'custom') {
          game.getDB('image', 'card_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.card_stylesheet) {
                ui.css.card_stylesheet.remove();
              }
              ui.css.card_stylesheet = init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.cardback_style == 'custom') {
          game.getDB('image', 'cardback_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.cardback_stylesheet) {
                ui.css.cardback_stylesheet.remove();
              }
              ui.css.cardback_stylesheet = init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
          game.getDB('image', 'cardback_style2', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.cardback_stylesheet2) {
                ui.css.cardback_stylesheet2.remove();
              }
              ui.css.cardback_stylesheet2 = init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.hp_style == 'custom') {
          game.getDB('image', 'hp_style1', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.hp_stylesheet1) {
                ui.css.hp_stylesheet1.remove();
              }
              ui.css.hp_stylesheet1 = init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
          game.getDB('image', 'hp_style2', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.hp_stylesheet2) {
                ui.css.hp_stylesheet2.remove();
              }
              ui.css.hp_stylesheet2 = init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
          game.getDB('image', 'hp_style3', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.hp_stylesheet3) {
                ui.css.hp_stylesheet3.remove();
              }
              ui.css.hp_stylesheet3 = init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
          game.getDB('image', 'hp_style4', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.hp_stylesheet4) {
                ui.css.hp_stylesheet4.remove();
              }
              ui.css.hp_stylesheet4 = init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.player_style == 'custom') {
          ui.css.player_stylesheet = init.sheet('#window .player{background-image:none;background-size:100% 100%;}');
          game.getDB('image', 'player_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.player_stylesheet) {
                ui.css.player_stylesheet.remove();
              }
              ui.css.player_stylesheet = init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.border_style == 'custom') {
          game.getDB('image', 'border_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.border_stylesheet) {
                ui.css.border_stylesheet.remove();
              }
              ui.css.border_stylesheet = init.sheet();
              ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
              ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.control_style == 'custom') {
          game.getDB('image', 'control_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.control_stylesheet) {
                ui.css.control_stylesheet.remove();
              }
              ui.css.control_stylesheet = init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
        if (lib.config.menu_style == 'custom') {
          game.getDB('image', 'menu_style', function (fileToLoad) {
            if (!fileToLoad) return;
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
              if (ui.css.menu_stylesheet) {
                ui.css.menu_stylesheet.remove();
              }
              ui.css.menu_stylesheet = init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
            };
            fileReader.readAsDataURL(fileToLoad);
          });
        }
      }


      var proceed2 = function () {
        var mode = lib.imported.mode;
        var card = lib.imported.card;
        var character = lib.imported.character;
        var play = lib.imported.play;
        delete window.game;
        var i, j, k;
        for (i in mode[lib.config.mode].element) {
          if (!element[i]) element[i] = [];
          for (j in mode[lib.config.mode].element[i]) {
            if (j == 'init') {
              if (!element[i].inits) element[i].inits = [];
              element[i].inits.push(mode[lib.config.mode].element[i][j]);
            }
            else {
              element[i][j] = mode[lib.config.mode].element[i][j];
            }
          }
        }
        for (i in mode[lib.config.mode].ai) {
          if (typeof mode[lib.config.mode].ai[i] == 'object') {
            if (ai[i] == undefined) ai[i] = {};
            for (j in mode[lib.config.mode].ai[i]) {
              ai[i][j] = mode[lib.config.mode].ai[i][j];
            }
          }
          else {
            ai[i] = mode[lib.config.mode].ai[i];
          }
        }
        for (i in mode[lib.config.mode].ui) {
          if (typeof mode[lib.config.mode].ui[i] == 'object') {
            if (ui[i] == undefined) ui[i] = {};
            for (j in mode[lib.config.mode].ui[i]) {
              ui[i][j] = mode[lib.config.mode].ui[i][j];
            }
          }
          else {
            ui[i] = mode[lib.config.mode].ui[i];
          }
        }
        for (i in mode[lib.config.mode].game) {
          game[i] = mode[lib.config.mode].game[i];
        }
        for (i in mode[lib.config.mode].get) {
          get[i] = mode[lib.config.mode].get[i];
        }
        init.start = mode[lib.config.mode].start;
        init.startBefore = mode[lib.config.mode].startBefore;
        if (game.onwash) {
          lib.onwash.push(game.onwash);
          delete game.onwash;
        }
        if (game.onover) {
          lib.onover.push(game.onover);
          delete game.onover;
        }
        lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
        lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

        lib.rank = require('@d/rank');
        for (i in mode[lib.config.mode]) {
          if (i == 'element') continue;
          if (i == 'game') continue;
          if (i == 'ai') continue;
          if (i == 'ui') continue;
          if (i == 'get') continue;
          if (i == 'config') continue;
          if (i == 'onreinit') continue;
          if (i == 'start') continue;
          if (i == 'startBefore') continue;
          if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][i])) ? [] : {};
          for (j in mode[lib.config.mode][i]) {
            lib[i][j] = mode[lib.config.mode][i][j];
          }
        }
        if (typeof mode[lib.config.mode].init == 'function') {
          mode[lib.config.mode].init();
        }

        var connectCharacterPack = [];
        var connectCardPack = [];
        for (i in character) {
          if (character[i].character) {
            lib.characterPack[i] = character[i].character
          }
          for (j in character[i]) {
            if (j == 'mode' || j == 'forbid') continue;
            if (j == 'connect') {
              connectCharacterPack.push(i);
              continue;
            }
            if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
              if (lib.config.mode == 'chess' && get.config('chess_mode') == 'leader' && get.config('chess_leader_allcharacter')) {
                for (k in character[i][j]) {
                  lib.hiddenCharacters.push(k);
                }
              }
              else if (lib.config.mode != 'boss' || i != 'boss') {
                continue;
              }
            }
            if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
              lib[j].addArray(character[i][j]);
              continue;
            }
            for (k in character[i][j]) {
              if (j == 'character') {
                if (!character[i][j][k][4]) {
                  character[i][j][k][4] = [];
                }
                if (character[i][j][k][4].contains('boss') ||
                  character[i][j][k][4].contains('hiddenboss')) {
                  lib.config.forbidai.add(k);
                }
                if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
                  lib.config.forbidai.add(k);
                }
                for (var l = 0; l < character[i][j][k][3].length; l++) {
                  lib.skilllist.add(character[i][j][k][3][l]);
                }
              }
              if (j == 'skill' && k[0] == '_' && (lib.config.mode != 'connect' ? (!lib.config.characters.contains(i)) : (!character[i].connect))) {
                continue;
              }
              if (j == 'translate' && k == i) {
                lib[j][k + '_character_config'] = character[i][j][k];
              }
              else {
                if (lib[j][k] == undefined) {
                  if (j == 'skill' && !character[i][j][k].forceLoad && lib.config.mode == 'connect' && !character[i].connect) {
                    lib[j][k] = {
                      nopop: character[i][j][k].nopop,
                      derivation: character[i][j][k].derivation
                    };
                  }
                  else {
                    lib[j][k] = character[i][j][k];
                  }
                  if (j == 'card' && lib[j][k].derivation) {
                    if (!lib.cardPack.mode_derivation) {
                      lib.cardPack.mode_derivation = [k];
                    }
                    else {
                      lib.cardPack.mode_derivation.push(k);
                    }
                  }
                }
                else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
                  lib[j][k].addArray(character[i][j][k]);
                }
                else {
                  console.log('dublicate ' + j + ' in character ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + character[i][j][k]);
                }
              }
            }
          }
        }
        var connect_avatar_list = [];
        for (var i in lib.character) {
          connect_avatar_list.push(i);
        }
        connect_avatar_list.sort(lib.sort.capt);
        for (var i = 0; i < connect_avatar_list.length; i++) {
          var ia = connect_avatar_list[i];
          _mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
        }
        if (lib.config.mode != 'connect') {
          var pilecfg = lib.config.customcardpile[get.config('cardpilename') || '当前牌堆'];
          if (pilecfg) {
            lib.config.bannedpile = get.copy(pilecfg[0] || {});
            lib.config.addedpile = get.copy(pilecfg[1] || {});
          }
          else {
            lib.config.bannedpile = {};
            lib.config.addedpile = {};
          }
        }
        else {
          lib.cardPackList = {};
        }
        for (i in card) {
          lib.cardPack[i] = [];
          if (card[i].card) {
            for (var j in card[i].card) {
              if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
                lib.cardPack[i].push(j);
              }
            }
          }
          for (j in card[i]) {
            if (j == 'mode' || j == 'forbid') continue;
            if (j == 'connect') {
              connectCardPack.push(i);
              continue;
            }
            if (j == 'list') {
              if (lib.config.mode == 'connect') {
                lib.cardPackList[i] = card[i][j];
              }
              else {
                if (lib.config.cards.contains(i)) {
                  var pile;
                  if (typeof card[i][j] == 'function') {
                    pile = card[i][j]();
                  }
                  else {
                    pile = card[i][j];
                  }
                  lib.cardPile[i] = pile.slice(0);
                  if (lib.config.bannedpile[i]) {
                    for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
                      pile[lib.config.bannedpile[i][k]] = null;
                    }
                  }
                  for (var k = 0; k < pile.length; k++) {
                    if (!pile[k]) {
                      pile.splice(k--, 1);
                    }
                  }
                  if (lib.config.addedpile[i]) {
                    for (var k = 0; k < lib.config.addedpile[i].length; k++) {
                      pile.push(lib.config.addedpile[i][k]);
                    }
                  }
                  lib.card.list = lib.card.list.concat(pile);
                }
              }
            }
            else {
              for (k in card[i][j]) {
                if (j == 'skill' && k[0] == '_' && !card[i][j][k].forceLoad && (lib.config.mode != 'connect' ? (!lib.config.cards.contains(i)) : (!card[i].connect))) {
                  continue;
                }
                if (j == 'translate' && k == i) {
                  lib[j][k + '_card_config'] = card[i][j][k];
                }
                else {
                  if (lib[j][k] == undefined) {
                    if (j == 'skill' && !card[i][j][k].forceLoad && lib.config.mode == 'connect' && !card[i].connect) {
                      lib[j][k] = {
                        nopop: card[i][j][k].nopop,
                        derivation: card[i][j][k].derivation
                      };
                    }
                    else {
                      lib[j][k] = card[i][j][k];
                    }
                  }
                  else console.log('dublicate ' + j + ' in card ' + i + ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
                  if (j == 'card' && lib[j][k].derivation) {
                    if (!lib.cardPack.mode_derivation) {
                      lib.cardPack.mode_derivation = [k];
                    }
                    else {
                      lib.cardPack.mode_derivation.push(k);
                    }
                  }
                }
              }
            }
          }
        }
        if (lib.cardPack.mode_derivation) {
          for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
            if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation == 'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
              lib.cardPack.mode_derivation.splice(i--, 1);
            }
            else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == 'string' && !lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)) {
              lib.cardPack.mode_derivation.splice(i--, 1);
            }
          }
          if (lib.cardPack.mode_derivation.length == 0) {
            delete lib.cardPack.mode_derivation;
          }
        }
        if (lib.config.mode != 'connect') {
          for (i in play) {
            if (lib.config.hiddenPlayPack.contains(i)) continue;
            if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
            if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
            for (j in play[i].element) {
              if (!element[j]) element[j] = [];
              for (k in play[i].element[j]) {
                if (k == 'init') {
                  if (!element[j].inits) element[j].inits = [];
                  element[j].inits.push(play[i].element[j][k]);
                }
                else {
                  element[j][k] = play[i].element[j][k];
                }
              }
            }
            for (j in play[i].ui) {
              if (typeof play[i].ui[j] == 'object') {
                if (ui[j] == undefined) ui[j] = {};
                for (k in play[i].ui[j]) {
                  ui[j][k] = play[i].ui[j][k];
                }
              }
              else {
                ui[j] = play[i].ui[j];
              }
            }
            for (j in play[i].game) {
              game[j] = play[i].game[j];
            }
            for (j in play[i].get) {
              get[j] = play[i].get[j];
            }
            for (j in play[i]) {
              if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' ||
                j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady') continue;
              for (k in play[i][j]) {
                if (j == 'translate' && k == i) {
                  // lib[j][k+'_play_config']=play[i][j][k];
                }
                else {
                  if (lib[j][k] != undefined) {
                    console.log('dublicate ' + j + ' in play ' + i + ':\n' + k + '\n' + ': ' + lib[j][k] + '\n' + play[i][j][k]);
                  }
                  lib[j][k] = play[i][j][k];
                }
              }
            }
            if (typeof play[i].init == 'function') play[i].init();
            if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i].arenaReady);
          }
        }

        lib.connectCharacterPack = [];
        lib.connectCardPack = [];
        for (var i = 0; i < lib.config.all.characters.length; i++) {
          var packname = lib.config.all.characters[i];
          if (connectCharacterPack.contains(packname)) {
            lib.connectCharacterPack.push(packname)
          }
        }
        for (var i = 0; i < lib.config.all.cards.length; i++) {
          var packname = lib.config.all.cards[i];
          if (connectCardPack.contains(packname)) {
            lib.connectCardPack.push(packname)
          }
        }
        if (lib.config.mode != 'connect') {
          for (i = 0; i < lib.card.list.length; i++) {
            if (lib.card.list[i][2] == 'huosha') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'sha';
              lib.card.list[i][3] = 'fire';
            }
            else if (lib.card.list[i][2] == 'leisha') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'sha';
              lib.card.list[i][3] = 'thunder';
            }
            else if (lib.card.list[i][2] == 'haisha') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'sha';
              lib.card.list[i][3] = 'ocean';
            }
            else if (lib.card.list[i][2] == 'yamisha') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'sha';
              lib.card.list[i][3] = 'yami';
            }
            if (lib.card.list[i][2] == 'haitao') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'tao';
              lib.card.list[i][3] = 'ocean';
            }
            if (lib.card.list[i][2] == 'haijiu') {
              lib.card.list[i] = lib.card.list[i].slice(0);
              lib.card.list[i][2] = 'jiu';
              lib.card.list[i][3] = 'ocean';
            }
            if (!lib.card[lib.card.list[i][2]]) {
              lib.card.list.splice(i, 1); i--;
            }
            else if (lib.card[lib.card.list[i][2]].mode &&
              lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
              lib.card.list.splice(i, 1); i--;
            }
          }
        }

        if (lib.config.mode == 'connect') {
          _status.connectMode = true;
        }
        if (window.isNonameServer) {
          lib.cheat.i();
        }
        else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
          lib.cheat.i();
        }
        lib.config.sort_card = get.sortCard(lib.config.sort);
        delete lib.imported.character;
        delete lib.imported.card;
        delete lib.imported.mode;
        delete lib.imported.play;
        for (var i in init) {
          if (i.indexOf('setMode_') == 0) {
            delete init[i];
          }
        }
        if (!_status.connectMode) {
          for (var i = 0; i < lib.extensions.length; i++) {
            try {
              _status.extension = lib.extensions[i][0];
              _status.evaluatingExtension = lib.extensions[i][3];
              lib.extensions[i][1](lib.extensions[i][2], lib.extensions[i][4]);
              if (lib.extensions[i][4]) {
                if (lib.extensions[i][4].character) {
                  for (var j in lib.extensions[i][4].character.character) {
                    game.addCharacterPack(get.copy(lib.extensions[i][4].character));
                    break;
                  }
                }
                if (lib.extensions[i][4].card) {
                  for (var j in lib.extensions[i][4].card.card) {
                    game.addCardPack(get.copy(lib.extensions[i][4].card));
                    break;
                  }
                }
                if (lib.extensions[i][4].skill) {
                  for (var j in lib.extensions[i][4].skill.skill) {
                    game.addSkill(j, lib.extensions[i][4].skill.skill[j],
                      lib.extensions[i][4].skill.translate[j], lib.extensions[i][4].skill.translate[j + '_info']);
                  }
                }
              }
              delete _status.extension;
              delete _status.evaluatingExtension;
            }
            catch (e) {
              console.log(e);
            }
          }
        }
        delete lib.extensions;

        if (init.startBefore) {
          init.startBefore();
          delete init.startBefore;
        }
        ui.create.arena();
        game.createEvent('game', false).setContent(init.start);
        if (_mode[lib.config.mode] && _mode[lib.config.mode].fromextension) {
          var startstr = mode[lib.config.mode].start.toString();
          if (startstr.indexOf('onfree') == -1) {
            setTimeout(init.onfree, 500);
          }
        }
        delete init.start;
        game.loop();
      }
      var proceed = function () {
        if (!lib.db) {
          try {
            lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
            if (typeof lib.storage != 'object') throw ('err');
            if (lib.storage == null) throw ('err');
          }
          catch (err) {
            lib.storage = {};
            localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
          }
          proceed2();
        }
        else {
          game.getDB('data', lib.config.mode, function (obj) {
            lib.storage = obj || {};
            proceed2();
          });
        }
      };
      if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
        window.inSplash = true;
        clearTimeout(window.resetGameTimeout);
        delete window.resetGameTimeout;
        var clickedNode = false;
        var clickNode = function () {
          if (clickedNode) return;
          this.classList.add('clicked');
          clickedNode = true;
          lib.config.mode = this.link;
          game.saveConfig('mode', this.link);
          if (this.link == 'connect') {
            localStorage.setItem(lib.configprefix + 'directstart', true);
            game.reload();
          }
          else {
            if (game.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
              game.layout = 'mobile';
              ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
            }
            else if (game.layout == 'mobile' && lib.config.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) === -1) {
              game.layout = lib.config.layout;
              if (game.layout == 'default') {
                ui.css.layout.href = '';
              }
              else {
                ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
              }
            }
            splash.delete(1000);
            delete window.inSplash;
            window.resetGameTimeout = setTimeout(init.reset, 5000);

            this.listenTransition(() => {
              init.js(dist(), 'mode', proceed);
            }, 500);
          }
        }
        var downNode = function () {
          this.classList.add('glow');
        }
        var upNode = function () {
          this.classList.remove('glow');
        }
        var splash = ui.create.div('#splash', document.body);
        if (lib.config.touchscreen) {
          splash.classList.add('touch');
          lib.setScroll(splash);
        }
        if (lib.config.player_border != 'wide') {
          splash.classList.add('slim');
        }
        splash.dataset.radius_size = lib.config.radius_size;
        for (var i = 0; i < lib.config.all.mode.length; i++) {
          var node = ui.create.div('.hidden', splash, clickNode);
          node.link = lib.config.all.mode[i];
          node.dataset.cursor_style = "pointer";
          ui.create.div(node, '.splashtext', get.verticalStr(get.translation(lib.config.all.mode[i])));
          if (lib.config.all.stockmode.indexOf(lib.config.all.mode[i]) != -1) {
            ui.create.div(node, '.avatar').setBackgroundImage(`image/splash/${lib.config.all.mode[i]}.jpg`, true);
          }
          else {
            var avatarnode = ui.create.div(node, '.avatar');
            var avatarbg = _mode[lib.config.all.mode[i]].splash;
            if (avatarbg.indexOf('ext:') == 0) {
              avatarnode.setBackgroundImage(avatarbg.replace(/ext:/, 'extension/'));
            }
            else {
              avatarnode.setBackgroundDB(avatarbg);
            }
          }
          if (!lib.config.touchscreen) {
            node.addEventListener('mousedown', downNode);
            node.addEventListener('mouseup', upNode);
            node.addEventListener('mouseleave', upNode);
          }
          setTimeout((function (node) {
            return function () {
              node.show();
            }
          }(node)), i * 100);
        }
        if (lib.config.mousewheel) {
          splash.onmousewheel = ui.click.mousewheel;
        }
      }
      else {
        proceed();
      }
      localStorage.removeItem(lib.configprefix + 'directstart');
      delete init.init;
    },
    startOnline: [function () {
      Evt._resultid = null;
      Evt._result = null;
      game.pause();
    },
    function () {
      if (result) {
        if (Evt._resultid) {
          result.id = Evt._resultid;
        }
        game.send('result', result);
      }
      Evt.goto(0);
    }],
    /**
     * 闲时执行，一般选择角色后开始执行这个方法
     * @function
     */
    onfree: function () {
      if (lib.onfree) {
        clearTimeout(window.resetGameTimeout);
        delete window.resetGameTimeout;
        if (!game.syncMenu) {
          delete window.resetExtension;
          localStorage.removeItem(lib.configprefix + 'disable_extension');
        }

        if (game.removeFile && lib.config.brokenFile.length) {
          while (lib.config.brokenFile.length) {
            game.removeFile(lib.config.brokenFile.shift());
          }
          game.saveConfigValue('brokenFile');
        }

        var onfree = lib.onfree;
        delete lib.onfree;
        var loop = function () {
          if (onfree.length) {
            (onfree.shift())();
            setTimeout(loop, 100);
          }
        };
        setTimeout(loop, 500);
      }
    },
    connection: function (ws) {
      var client = {
        ws: ws,
        id: ws.wsid || get.id(),
        closed: false
      };
      lib.node.clients.push(client);
      for (var i in element.client) {
        client[i] = element.client[i];
      }
      if (window.isNonameServer) {
        document.querySelector('#server_count').innerHTML = lib.node.clients.length;
      }
      ws.on('message', function (messagestr) {
        var message;
        try {
          message = JSON.parse(messagestr);
          if (!Array.isArray(message) ||
            typeof _message.server[message[0]] !== 'function') {
            throw ('err');
          }
          for (var i = 1; i < message.length; i++) {
            message[i] = get.parsedResult(message[i]);
          }
        }
        catch (e) {
          console.log(e);
          console.log('invalid message: ' + messagestr);
          return;
        }
        _message.server[message.shift()].apply(client, message);
      });
      ws.on('close', function () {
        client.close();
      });
      client.send('opened');
    },
    /**
     * 创建（并插入文档）新的`<style>`
     * @function
     * @param {...string} rules css rules
     * @returns {!HTMLStyleElement} 新的`<style>`
     */
    sheet: function (...args) {
      var style = document.createElement('style');
      document.head.appendChild(style);
      for (let v of args) {
        if (typeof v == 'string') {
          style.sheet.insertRule(v, 0);
        }
      }
      return style;
    },
    /**
     * 读取一个css文件
     * 于文档中创建（并插入文档中）新的`<link>`，如果设置路径则先加载再返回，否则直接返回空`<link>`
     * @function init.css
     * @param {string} [path=null] 要加载的css文件所在目录, 如果为null，不设置生成的`<link>`的href值
     * @param {string} file 文件名（不包括拓展名），自动添加后缀.css；如果path为null，则被忽略
     * @param {function():void} [before] 可选，onload回调函数，在新`<link>`加载完成时被调用
     */
    /**
     * 读取一个css文件
     * 于文档中创建（并插入文档中）新的`<link>`，如果设置路径则先加载再返回，否则直接返回空`<link>`
     * @function init.css
     * @variation 2
     * @param {string} [path=null] 要加载的css文件所在目录, 如果为null，不设置生成的`<link>`的href值
     * @param {string} file 文件名（不包括拓展名），自动添加后缀.css；如果path为null，则被忽略
     * @param {HTMLLinkElement} [before] 可选，一个{@link HTMLLinkElement}对象，新`<link>`会插入到`before`前
     * @returns {HTMLLinkElement} 新的`<link>`
     */
    css: function (path, file, before) {
      var style = document.createElement("link");
      style.rel = "stylesheet";
      if (path) {
        style.href = path + '/' + file + ".css";
      }
      if (typeof before == 'function') {
        style.addEventListener('load', before);
        document.head.appendChild(style);
      }
      else if (before) {
        document.head.insertBefore(style, before);
      }
      else {
        document.head.appendChild(style);
      }
      return style;
    },
    /**
     * 读取一个js文件
     * 于文档中创建新的`<script>`对象
     * @function init.js
     * @param {!string} dir 要加载的js文件所在目录, 如果为null，不设置生成的`<link>`的href值
     * @param {!string} file 文件名（不包括拓展名），自动添加后缀.js；如果path为null，则被忽略
     * @param {function():void} [onload] 可选，onload回调函数
     * @param {function():void} [onerror] 可选，onerror回调函数 
     * @returns {!HTMLScriptElement} 新的`<script>`
     */
    /**
     * 读取一个js文件
     * 于文档中创建新的`<script>`对象
     * @function init.js
     * @variation 2
     * @param {!string} path 要加载的js文件所在路径, 如果为null，不设置生成的`<link>`的href值
     * @param {null} file 文件名（无拓展名），自动添加后缀.js
     * @param {function():void} [onload] 可选，onload回调函数
     * @param {function():void} [onerror] 可选，onerror回调函数 
     * @returns {!HTMLScriptElement} 新的`<script>`
     */
    /**
     * 读取一个js文件
     * 于文档中创建一组新的`<script>`对象
     * @function init.js
     * @variation 3
     * @param {!string} path 要加载的js文件所在路径, 如果为null，不设置生成的`<link>`的href值
     * @param {Array<string>} files 文件名数组
     * @param {?function():void} [onload] 可选，onload回调函数，对每个新的`<script>`调用
     * @param {?function():void} [onerror] 可选，onerror回调函数，对每个新的`<script>`调度
     */
    js: function (path, file, onload, onerror) {
      if (path[path.length - 1] == '/') {
        path = path.slice(0, path.length - 1);
      }
      //??
      if (file === 'mode' && lib.config.all.stockmode.indexOf(lib.config.mode) == -1) {
        init['setMode_' + lib.config.mode]();
        onload();
        return;
      }
      if (path == lib.assetURL + 'mode' && lib.config.all.stockmode.indexOf(file) == -1) {
        init['setMode_' + file]();
        onload();
        return;
      }
      if (Array.isArray(file)) {
        for (var i = 0; i < file.length; i++) {
          init.js(path, file[i], onload, onerror);
        }
      }
      else {
        var script = document.createElement('script');
        if (!file) {
          script.src = path;
        }
        else {
          script.src = path + '/' + file + ".js";
        }
        if (path.indexOf('http') == 0) {
          script.src += '?rand=' + get.id();
          script.addEventListener('load', function () {
            script.remove();
          });
        }
        document.head.appendChild(script);
        if (typeof onload == 'function') {
          script.addEventListener('load', onload);
          script.addEventListener('error', onerror);
        }
        return script;
      }
    },
    req: function (str, onload, onerror, master) {
      var sScriptURL;
      if (str.indexOf('http') == 0) {
        sScriptURL = str;
      }
      else {
        var url = get.url(master);
        if (url[url.length - 1] != '/') {
          url += '/';
        }
        sScriptURL = url + str;
      }
      var oReq = new XMLHttpRequest();
      if (onload) oReq.addEventListener("load", onload);
      if (onerror) oReq.addEventListener("error", onerror);
      oReq.open("GET", sScriptURL);
      oReq.send();
    },
    /**
     * 读取一个json文件
     * @function
     * @param {!string} url url路径
     * @param {function(Object):void} onload 成功时的回调函数
     * @param {function():void} onerror 失败时回调函数
     */
    json: function (url, onload, onerror) {
      var oReq = new XMLHttpRequest();
      if (onload) oReq.addEventListener("load", function () {
        var result;
        try {
          result = JSON.parse(this.responseText);
          if (!result) {
            throw ('err');
          }
        }
        catch (e) {
          onerror();
          return;
        }
        onload(result);
      });
      if (onerror) oReq.addEventListener("error", onerror);
      oReq.open("GET", url);
      oReq.send();
    },
    /**
     * 初始化角色字体样式和边缘样式
     * @function
     */
    cssstyles: function () {
      if (ui.css.styles) {
        ui.css.styles.remove();
      }
      ui.css.styles = init.sheet();
      ui.css.styles.sheet.insertRule('#arena .player>.name,#arena .button.character>.name {font-family: ' + (lib.config.name_font || 'xinwei') + ',xinwei}', 0);
      ui.css.styles.sheet.insertRule('#arena .player .identity>div {font-family: ' + (lib.config.identity_font || 'huangcao') + ',xinwei}', 0);
      ui.css.styles.sheet.insertRule('.button.character.newstyle>.identity {font-family: ' + (lib.config.identity_font || 'huangcao') + ',xinwei}', 0);
      if (lib.config.cardtext_font && lib.config.cardtext_font != 'default') {
        ui.css.styles.sheet.insertRule(`.card div:not(.info):not(.background) {font-family: ${lib.config.cardtext_font};Tiejili}`, 0);
      }
      if (lib.config.global_font && lib.config.global_font != 'default') {
        ui.css.styles.sheet.insertRule('#window {font-family: ' + lib.config.global_font + ',xinwei}', 0);
        ui.css.styles.sheet.insertRule('#window #control{font-family: STHeiti,SimHei,Microsoft JhengHei,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica,Arial,sans-serif}', 0);
      }
      switch (lib.config.glow_phase) {
        case 'yellow': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(217, 152, 62) 0 0 15px, rgb(217, 152, 62) 0 0 15px !important;}', 0); break;
        case 'green': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(10, 155, 67, 1) 0 0 15px, rgba(10, 155, 67, 1) 0 0 15px !important;}', 0); break;
        case 'purple': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(189, 62, 170) 0 0 15px, rgb(189, 62, 170) 0 0 15px !important;}', 0); break;
      }
    },
    /**
     * 初始化布局
     * @function
     * @param {string} layout 布局类型
     * @param {boolean} nosave 是否保存
     */
    layout: function (layout, nosave) {
      if (!nosave) game.saveConfig('layout', layout);
      game.layout = layout;
      ui.arena.hide();
      setTimeout(function () {
        if (game.layout == 'default') {
          ui.css.layout.href = '';
        }
        else {
          ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
        }
        if (game.layout == 'mobile' || game.layout == 'long') {
          ui.arena.classList.add('mobile');
        }
        else {
          ui.arena.classList.remove('mobile');
        }
        if (game.layout == 'mobile' || game.layout == 'long' || game.layout == 'long2' || game.layout == 'nova') {
          if (game.me && game.me.node.handcards2.childNodes.length) {
            while (game.me.node.handcards2.childNodes.length) {
              game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
            }
          }
        }
        if (game.layout == 'default') {
          ui.arena.classList.add('oldlayout');
        }
        else {
          ui.arena.classList.remove('oldlayout');
        }
        if (lib.config.cardshape == 'oblong' && (game.layout == 'long' || game.layout == 'mobile' || game.layout == 'long2' || game.layout == 'nova')) {
          ui.arena.classList.add('oblongcard');
          ui.window.classList.add('oblongcard');
        }
        else {
          ui.arena.classList.remove('oblongcard');
          ui.window.classList.remove('oblongcard');
        }
        // if (lib.config.textequip == 'text' && (game.layout == 'long' || game.layout == 'mobile')) {
        //   ui.arena.classList.add('textequip');
        // }
        // else {
        //   ui.arena.classList.remove('textequip');
        // }
        if (get.is.phoneLayout()) {
          ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
          ui.arena.classList.add('phone');
        }
        else {
          ui.css.phone.href = '';
          ui.arena.classList.remove('phone');
        }
        for (var i = 0; i < game.players.length; i++) {
          if (get.is.linked2(game.players[i])) {
            if (game.players[i].classList.contains('linked')) {
              game.players[i].classList.remove('linked');
              game.players[i].classList.add('linked2');
            }
          }
          else {
            if (game.players[i].classList.contains('linked2')) {
              game.players[i].classList.remove('linked2');
              game.players[i].classList.add('linked');
            }
          }
        }
        if (game.layout == 'long' || game.layout == 'long2') {
          ui.arena.classList.add('long');
        }
        else {
          ui.arena.classList.remove('long');
        }
        if (lib.config.player_border != 'wide' || game.layout == 'long' || game.layout == 'long2') {
          ui.arena.classList.add('slim_player');
        }
        else {
          ui.arena.classList.remove('slim_player');
        }
        if (lib.config.player_border == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
          ui.arena.classList.add('lslim_player');
        }
        else {
          ui.arena.classList.remove('lslim_player');
        }
        if (lib.config.player_border == 'slim') {
          ui.arena.classList.add('uslim_player');
        }
        else {
          ui.arena.classList.remove('uslim_player');
        }
        if (lib.config.player_border == 'narrow') {
          ui.arena.classList.add('mslim_player');
        }
        else {
          ui.arena.classList.remove('mslim_player');
        }
        ui.updatej();
        ui.updatem();
        setTimeout(function () {
          ui.arena.show();
          if (game.me) game.me.update();
          setTimeout(function () {
            ui.updatex();
          }, 500);
          setTimeout(function () {
            ui.updatec();
          }, 1000);
        }, 100);
      }, 500);
    },
    /**
     * 保存当前的背景图片
     * @function
     */
    background: function () {
      if (lib.config.image_background_random) {
        var list = [];
        for (var i in lib.configMenu.appearence.config.image_background.item) {
          if (i == 'default') continue;
          list.push(i);
        }
        list.remove(lib.config.image_background);
        localStorage.setItem(lib.configprefix + 'background', JSON.stringify(list));
      }
      else if (lib.config.image_background && lib.config.image_background != 'default' && lib.config.image_background.indexOf('custom_') != 0) {
        localStorage.setItem(lib.configprefix + 'background', lib.config.image_background);
      }
      else if (lib.config.image_background == 'default' && lib.config.theme == 'simple') {
        localStorage.setItem(lib.configprefix + 'background', 'ol_bg');
      }
      else {
        localStorage.removeItem(lib.configprefix + 'background');
      }
    },
    parsex: function (func) {
      var k;
      var str = '(';
      str += func.toString();
      if (str.indexOf('step 0') == -1) {
        str = str.replace(/\{/, '{{if(Evt.step==1) {Evt.finish();return;}');
      }
      else {
        for (k = 1; k < 99; k++) {
          if (str.indexOf('step ' + k) == -1) break;
          str = str.replace(new RegExp("'step " + k + "'", 'g'), "break;case " + k + ":");
          str = str.replace(new RegExp('"step ' + k + '"', 'g'), "break;case " + k + ":");
        }
        str = str.replace(/'step 0'|"step 0"/, 'if(Evt.step==' + k + ') {Evt.finish();return;}switch(step){case 0:');
      }
      str += '})';
      return str;
    },
    parse: function (func) {
      let str = ''
      if (Array.isArray(func)) {
        str += `if(Evt.step==${func.length}) {Evt.finish();return;}switch(step){`
        for (let i = 0; i < func.length; i++) {
          let f = func[i].toString().replace(/galgame\./g, 'game.galgame.').replace(/event/g, 'Evt').replace(/([\.\w])Evt/g, '$1event')
          str += `case ${i}:${f.slice(f.indexOf('{'))}break;`
        }
        str += `}`
      }
      else {
        str += func.toString();
        //galgame调整
        // str = str.replace(/(?<!\.)galgame(?=\.)/g, 'game.galgame').replace(/(?<![\.'])event(?!:)/g, 'Evt');
        str = str.replace(/galgame\./g, 'game.galgame.').replace(/event/g, 'Evt').replace(/event/g, 'Evt').replace(/([\.\w])Evt/g, '$1event');
        str = str.slice(str.indexOf('{') + 1);
        if (str.indexOf('step 0') == -1) {
          str = `{if(Evt.step==1) {Evt.finish();return;}${str}`;
        }
        else {
          // str = str.replace(/['"]step ([1-9]\d*)['"]/g, `break;case $1:`);
          for (var k = 1; k < 99; k++) {
            if (str.indexOf('step ' + k) == -1) break;
            str = str.replace(new RegExp(`'step ${k}'`, 'g'), `break;case ${k}:`);
            str = str.replace(new RegExp(`"step ${k}"`, 'g'), `break;case ${k}:`);
          }
          str = str.replace(/'step 0'|"step 0"/, `if(Evt.step==${k}) {Evt.finish();return;}switch(step){case 0:`);
        }
      }
      return (new Function('Evt', 'step', 'source', 'player', 'target', 'targets',
        'card', 'cards', 'skill', 'forced', 'num', 'trigger', 'result',
        '_status', 'lib', 'game', 'ui', 'get', 'ai', str));
    },
    /**
     * 执行一个，或一组无参函数，并返回结果；如果是`{a:function(){}, b:function(){}}`的形式，返回`{a: any, b: any}`作为结果
     * @function
     * @param {(function():any|Object<string, function():any>)} func 要执行的函数/函数组
     * @returns {(any|Object<string, any>)}
     */
    eval: function (func) {
      if (typeof func == 'function') {
        return eval('(' + func.toString() + ')');
      }
      else if (typeof func == 'object') {
        for (var i in func) {
          if (func.hasOwnProperty(i)) {
            func[i] = init.eval(func[i]);
          }
        }
      }
      return func;
    },
    /**
     * 加密文本
     * @function
     * @param {string} strUni 原文本
     * @returns 加密文本
     */
    encode: function (strUni) {
      var strUtf = strUni.replace(
        /[\u0080-\u07ff]/g, function (c) {
          var cc = c.charCodeAt(0);
          return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        });
      strUtf = strUtf.replace(
        /[\u0800-\uffff]/g, function (c) {
          var cc = c.charCodeAt(0);
          return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        });
      return btoa(strUtf);
    },
    /**
     * 解密
     * @function
     * @param {string} str 加密文本
     * @returns {string} 原文本
     */
    decode: function (str) {
      var strUtf = atob(str);
      var strUni = strUtf.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
          var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
          return String.fromCharCode(cc);
        });
      strUni = strUni.replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
          var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
          return String.fromCharCode(cc);
        });
      return strUni;
    },
    /**
     * js对象转为json字符串
     * @function
     * @returns {!string} 
     */
    stringify: function (obj) {
      var str = '{'
      for (var i in obj) {
        str += '"' + i + '":'
        if (Object.prototype.toString.call(obj[i]) == '[object Object]') {
          str += init.stringify(obj[i]);
        }
        else if (typeof obj[i] == 'function') {
          str += obj[i].toString();
        }
        else {
          str += JSON.stringify(obj[i]);
        }
        str += ','
      }
      str += '}';
      return str;
    },
    /**
     * 技能对象转为json字符串
     * @function
     * @returns {!string} 
     */
    stringifySkill: function (obj) {
      var str = '';
      for (var i in obj) {
        str += i + ':'
        if (Object.prototype.toString.call(obj[i]) == '[object Object]') {
          str += '{\n' + init.stringifySkill(obj[i]) + '}';
        }
        else if (typeof obj[i] == 'function') {
          str += obj[i].toString().replace(/\t/g, '');
        }
        else {
          str += JSON.stringify(obj[i]);
        }
        str += ',\n'
      }
      return str;
    }
  }
  return init
}