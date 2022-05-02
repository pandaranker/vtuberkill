{
  /**
   * 基础属性
   * @namespace
   */
  const { game, ui, get, ai, lib, _status } = vkCore
  const element = require('@c/lib_element')
  module.exports = {
    /**
     * 内容方法，setContent所调用的方法，即事件的具体内容
     * 状态机
     * @name content
     * @namespace
     * @global
     */
    content: element.content.getData(vkCore),
    /**
     * 玩家方法，.player节点共用的方法（比如展示牌【showCard】）
     * 角色
     * @namespace
     * @mixin
     */
    player: element.player.getData(vkCore),
    /**
     * 卡牌方法，.card节点共用的方法（比如检测卡牌是否在区域内【hasPosition】和添加去除标签【add/removeGaintag】）
     * 卡牌
     * @namespace
     * @mixin
     */
    card: {
      /**
       * 为本游戏牌添加gain标签名；本游戏牌`this.node.gaintag`也会更新
       * @param {(string|Array<string>)} gaintag gain标签名，如果是一个数组，会**覆盖**本游戏牌的原gain标签数组为此数组，而不是向原数组中添加gain标签
       */
      addGaintag: function (gaintag) {
        if (Array.isArray(gaintag)) this.gaintag = gaintag.slice(0);
        else this.gaintag.add(gaintag);
        var str = '';
        for (var gi = 0; gi < this.gaintag.length; gi++) {
          str += get.translation(this.gaintag[gi]);
          if (gi < this.gaintag.length - 1) str += ' ';
        }
        this.node.gaintag.innerHTML = str;
      },
      /**
       * 为本游戏牌移除gain标签，或置空gain标签数组；本游戏牌`this.node.gaintag`也会更新
       * @param {(string|true)} tag 要移除的gain标签名，如果此gain标签不在其中则不做任何处理；如果此值为true，置空gain标签数组
       */
      removeGaintag: function (tag) {
        if (tag === true) {
          if (this.gaintag && this.gaintag.length || this.node.gaintag.innerHTML.length) this.addGaintag([]);
        }
        else if (this.hasGaintag(tag)) {
          this.gaintag.remove(tag);
          this.addGaintag(this.gaintag);
        }
      },
      /**
       * 返回本游戏牌是否含有某一个gain标签
       * @param {!string} tag 要搜索的gain标签
       * @returns {!boolean}
       */
      hasGaintag: function (tag) {
        if (['ming_', 'an_'].contains(tag)) {
          return this.gaintag && this.gaintag.filter(function (gain) {
            return gain.indexOf(tag) == 0;
          }).length;
        }
        else return this.gaintag && this.gaintag.contains(tag);
      },
      /**
       * 初始化
       * 同时将info.global内的技能添加到{@link lib.skill.global}
       * @function
       * @param {(Array|Object)} card TODO
       * @returns {!GameCores.GameObjects.Card} this self
       */
      init: function (card) {
        if (Array.isArray(card)) {
          if (card[2] == 'huosha') {
            card[2] = 'sha';
            card[3] = 'fire';
          }
          if (card[2] == 'leisha') {
            card[2] = 'sha';
            card[3] = 'thunder';
          }
          if (card[2] == 'kamisha') {
            card[2] = 'sha';
            card[3] = 'kami';
          }
          if (card[2] == 'icesha') {
            card[2] = 'sha';
            card[3] = 'ice';
          }
          if (card[2] == 'haisha') {
            card[2] = 'sha';
            card[3] = 'ocean';
          }
          if (card[2] == 'yamisha') {
            card[2] = 'sha';
            card[3] = 'yami';
          }
          if (card[2] == 'haitao') {
            card[2] = 'tao';
            card[3] = 'ocean';
          }
          if (card[2] == 'haijiu') {
            card[2] = 'jiu';
            card[3] = 'ocean';
          }
        }
        else if (typeof card == 'object') {
          card = [card.suit, card.number, card.name, card.nature];
          card[5] = card.specialEffects
        }
        var cardnum = card[1] || '';
        if (parseInt(cardnum) == cardnum) cardnum = parseInt(cardnum);
        if ([1, 11, 12, 13, 14].contains(cardnum)) {
          cardnum = { '1': 'A', '11': 'J', '12': 'Q', '13': 'K', '14': '★' }[cardnum]
        }
        if (!lib.card[card[2]]) {
          lib.card[card[2]] = {};
        }
        var info = lib.card[card[2]];
        if (info.global && !this.classList.contains('button')) {
          if (Array.isArray(info.global)) {
            while (info.global.length) {
              game.addGlobalSkill(info.global.shift());
            }
          }
          else if (typeof info.global == 'string') {
            game.addGlobalSkill(info.global);
          }
          delete info.global;
        }
        if (this.name) {
          this.classList.remove('epic');
          this.classList.remove('legend');
          this.classList.remove('gold');
          this.classList.remove('unique');
          this.style.background = '';
          var subtype = get.subtype(this);
          if (subtype) {
            this.classList.remove(subtype);
          }
        }
        if (info.epic) {
          this.classList.add('epic');
        }
        else if (info.legend) {
          this.classList.add('legend');
        }
        else if (info.gold) {
          this.classList.add('gold');
        }
        else if (info.unique) {
          this.classList.add('unique');
        }
        var bg = card[2];
        if (info.cardimage) {
          bg = info.cardimage;
        }
        var img = lib.card[bg].image;
        if (img) {
          if (img.indexOf('db:') == 0) {
            img = img.slice(3);
          }
          else if (img.indexOf('ext:') != 0) {
            img = null;
          }
        }
        this.classList.remove('fullskin');
        this.classList.remove('fullimage');
        this.classList.remove('fullborder');
        this.dataset.cardName = card[2];
        this.dataset.cardType = info.type || '';
        this.dataset.cardSubype = info.subtype || '';
        this.dataset.cardMultitarget = info.multitarget ? '1' : '0';
        this.node.name.dataset.nature = '';
        this.node.info.classList.remove('red');
        if (lib.card[bg].fullskin) {
          this.classList.add('fullskin');
          if (img) {
            if (img.indexOf('ext:') == 0) {
              this.node.image.setBackgroundImage(img.replace(/ext:/, 'extension/'));
            }
            else {
              this.node.image.setBackgroundDB(img);
            }
          }
          else {
            if (lib.card[bg].modeimage) {
              this.node.image.setBackgroundImage('image/mode/' + lib.card[bg].modeimage + '/card/' + bg + '.png');
            }
            else {
              if (bg.indexOf('rm_') === 0) {
                var bg = bg.slice(3);
                this.node.image.setBackgroundImage('image/replace/' + bg + '.png');
              }
              else if (bg.indexOf('group_') === 0) {
                this.node.image.setBackgroundImage('image/card/groups/' + bg.slice(6) + '.png');
              }
              else if (lib.config.replace_image) {
                this.node.image.setBackgroundImage('image/replace/' + bg + '.png');
              }
              else {
                this.node.image.setBackgroundImage('image/card/' + bg + '.png');
              }
            }
          }
        }
        else if (lib.card[bg].image == 'background') {
          if (card[3]) this.node.background.setBackground(bg + '_' + card[3], 'card');
          else this.node.background.setBackground(bg, 'card');
        }
        else if (lib.card[bg].fullimage) {
          this.classList.add('fullimage');
          if (img) {
            if (img.indexOf('ext:') == 0) {
              this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
              this.style.backgroundSize = 'cover';
            }
            else {
              this.setBackgroundDB(img);
            }
          }
          else if (lib.card[bg].image) {
            if (lib.card[bg].image.indexOf('character:') == 0) {
              this.setBackground(lib.card[bg].image.slice(10), 'character');
            }
            else {
              this.setBackground(lib.card[bg].image);
            }
          }
          else {
            var cardPack = lib.cardPack['mode_' + get.mode()];
            if (Array.isArray(cardPack) && cardPack.contains(bg)) {
              this.setBackground('mode/' + get.mode() + '/card/' + bg);
            }
            else {
              this.setBackground('card/' + bg);
            }
          }
        }
        else if (lib.card[bg].fullborder) {
          this.classList.add('fullborder');
          if (lib.card[bg].fullborder == 'gold') {
            this.node.name.dataset.nature = 'metalmm';
          }
          else if (lib.card[bg].fullborder == 'silver') {
            this.node.name.dataset.nature = 'watermm';
          }
          if (!this.node.avatar) {
            this.node.avatar = ui.create.div('.cardavatar');
            this.insertBefore(this.node.avatar, this.firstChild);
          }
          if (!this.node.framebg) {
            this.node.framebg = ui.create.div('.cardframebg');
            this.node.framebg.dataset.auto = lib.card[bg].fullborder;
            this.insertBefore(this.node.framebg, this.firstChild);
          }
          if (img) {
            if (img.indexOf('ext:') == 0) {
              this.node.avatar.setBackgroundImage(img.replace(/ext:/, 'extension/'));
              this.node.avatar.style.backgroundSize = 'cover';
            }
            else {
              this.node.avatar.setBackgroundDB(img);
            }
          }
          else if (lib.card[bg].image) {
            if (lib.card[bg].image.indexOf('character:') == 0) {
              this.node.avatar.setBackground(lib.card[bg].image.slice(10), 'character');
            }
            else {
              this.node.avatar.setBackground(lib.card[bg].image);
            }
          }
          else {
            var cardPack = lib.cardPack['mode_' + get.mode()];
            if (Array.isArray(cardPack) && cardPack.contains(bg)) {
              this.node.avatar.setBackground('mode/' + get.mode() + '/card/' + bg);
            }
            else {
              this.node.avatar.setBackground('card/' + bg);
            }
          }
        }
        else if (lib.card[bg].image == 'card') {
          if (card[3]) this.setBackground(bg + '_' + card[3], 'card');
          else this.setBackground(bg, 'card');
        }
        else if (typeof lib.card[bg].image == 'string' && !lib.card[bg].fullskin) {
          if (img) {
            if (img.indexOf('ext:') == 0) {
              this.setBackgroundImage(img.replace(/ext:/, 'extension/'));
              this.style.backgroundSize = 'cover';
            }
            else {
              this.setBackgroundDB(img);
            }
          }
          else {
            this.setBackground(lib.card[bg].image);
          }
        }
        else {
          this.node.background.innerHTML = lib.translate[bg + '_cbg'] || lib.translate[bg + '_bg'] || get.translation(bg)[0];
          if (this.node.background.innerHTML.length > 1) this.node.background.classList.add('tight');
          else this.node.background.classList.remove('tight');
        }
        if ((bg == 'wuxingpan' || !lib.card[bg].fullborder) && this.node.avatar && this.node.framebg) {
          this.node.avatar.remove();
          this.node.framebg.remove();
          delete this.node.avatar;
          delete this.node.framebg;
        }
        if (info.noname && !this.classList.contains('button')) {
          this.node.name.style.display = 'none';
        }
        if (info.color) {
          this.style.color = info.color;
        }
        if (info.textShadow) {
          this.style.textShadow = info.textShadow;
        }
        if (info.opacity) {
          this.node.info.style.opacity = info.opacity;
          this.node.name.style.opacity = info.opacity;
        }
        if (info.modinfo) {
          this.node.info.innerHTML = info.modinfo;
        }
        else {
          this.node.info.innerHTML = get.translation(card[0]) + '<span> </span>' + cardnum;
        }
        if (info.addinfo) {
          if (!this.node.addinfo) {
            this.node.addinfo = ui.create.div('.range', this);
          }
          this.node.addinfo.innerHTML = info.addinfo;
        }
        else if (this.node.addinfo) {
          this.node.addinfo.remove();
          delete this.node.addinfo;
        }
        if (card[0] == 'heart' || card[0] == 'diamond') {
          this.node.info.classList.add('red');
        }
        this.node.name.innerHTML = '';
        this.node.image.className = 'image';
        var name = get.translation(card[2]);
        if (name.length == 1) {
          if (card[3] == 'fire') {
            name = '火' + name;
            this.node.image.classList.add('fire');
          }
          else if (card[3] == 'thunder') {
            name = '雷' + name;
            this.node.image.classList.add('thunder');
          }
          else if (card[3] == 'kami') {
            name = '神' + name;
            this.node.image.classList.add('kami');
          }
          else if (card[3] == 'ice') {
            name = '冰' + name;
            this.node.image.classList.add('ice');
          }
          else if (card[3] == 'ocean') {
            name = '海' + name;
            this.node.image.classList.add('ocean');
          }
          else if (card[3] == 'yami') {
            name = '暗' + name;
            this.node.image.classList.add('yami');
          }
        } else {
          if (card[3] == 'fire') {
            this.node.image.classList.add('fire');
          }
          else if (card[3] == 'thunder') {
            this.node.image.classList.add('thunder');
          }
          else if (card[3] == 'kami') {
            this.node.image.classList.add('kami');
          }
          else if (card[3] == 'ice') {
            this.node.image.classList.add('ice');
          }
          else if (card[3] == 'ocean') {
            name = name.replace(name.charAt(0), '海');
            this.node.image.classList.add('ocean');
          }
          else if (card[3] == 'yami') {
            name = name.replace(name.charAt(0), '暗');
            this.node.image.classList.add('yami');
          }
        }
        for (var i = 0; i < name.length; i++) {
          this.node.name.innerHTML += name[i] + '<br/>';
        }
        if (name.length >= 5) {
          this.node.name.classList.add('long');
          if (name.length >= 7) {
            this.node.name.classList.add('longlong');
          }
        }
        this.node.name2.innerHTML = get.translation(card[0]) + cardnum + ' ' + name;
        this.suit = card[0];
        this.number = parseInt(card[1]) || 0;
        this.name = card[2];
        this.classList.add('card');
        if (card[3]) {
          if (lib.nature.contains(card[3])) this.nature = card[3];
          this.classList.add(card[3]);
        }
        else if (this.nature) {
          this.classList.remove(this.nature);
          delete this.nature;
        }
        if (info.subtype) this.classList.add(info.subtype);
        if (this.inits) {
          for (var i = 0; i < lib.element.card.inits.length; i++) {
            lib.element.card.inits[i](this);
          }
        }
        if (typeof info.init == 'function') info.init();
        this.node.range.innerHTML = '';
        switch (get.subtype(this)) {
          case 'equip1':
            var added = false;
            if (lib.card[this.name] && lib.card[this.name].distance) {
              var dist = lib.card[this.name].distance;
              if (dist.attackFrom) {
                added = true;
                this.node.range.innerHTML = '范围: ' + (-dist.attackFrom + 1);
              }
            }
            if (!added) {
              this.node.range.innerHTML = '范围: 1';
            }
            break;
          case 'equip3':
            if (info.distance && info.distance.globalTo) {
              this.node.range.innerHTML = '防御: ' + info.distance.globalTo;
              this.node.name2.innerHTML += '+';
            }
            break;
          case 'equip4':
            if (info.distance && info.distance.globalFrom) {
              this.node.range.innerHTML = '进攻: ' + (-info.distance.globalFrom);
              this.node.name2.innerHTML += '-';
            }
            break;
        }
        var specialEffects = [];
        if (Array.isArray(card[5])) {
          specialEffects.addArray(card[5]);
        }
        if (this.node.image.parentNode.classList.length > 0)
          this.node.image.parentNode.classList.forEach(element => {
            if (element.indexOf("card_") != -1) {
              this.node.image.parentNode.classList.remove(element);
            }
          });
        if (specialEffects.length) {
          for (var i = 0; i < specialEffects.length; i++) {
            this.node.image.parentNode.classList.add(specialEffects[i]);
          }
          this.specialEffects = specialEffects;
        }
        if (_status.connectMode && !game.online && lib.cardOL && !this.cardid) {
          this.cardid = get.id();
          lib.cardOL[this.cardid] = this;
        }
        if (!_status.connectMode && !_status.video) {
          this.cardid = get.id();
        }
        var tags = [];
        if (Array.isArray(card[4])) {
          tags.addArray(card[4]);
        }
        if (this.cardid) {
          if (!_status.cardtag) {
            _status.cardtag = {};
          }
          for (var i in _status.cardtag) {
            if (_status.cardtag[i].contains(this.cardid)) {
              tags.add(i);
            }
          }
          if (tags.length) {
            var tagstr = ' <span class="cardtag">';
            for (var i = 0; i < tags.length; i++) {
              var tag = tags[i];
              if (!_status.cardtag[tag]) {
                _status.cardtag[tag] = [];
              }
              _status.cardtag[tag].add(this.cardid);
              tagstr += lib.translate[tag + '_tag'];
            }
            tagstr += '</span>';
            this.node.range.innerHTML += tagstr;
          }
        }
        return this;
      },
      /**
       * 选中状态，更新本游戏牌的位置；仅供`ui.me`中的手牌使用的函数(本机)
       * @param {?boolean} [bool] 如果为true，translate`translateY(-20px)`
       * @param {?number} [delay] 延迟`delay`(ms)时长，再更新本游戏牌位置；如果未指定或为0，不调用延迟函数，立即更新
       */
      updateTransform: function (bool, delay) {
        if (delay) {
          var that = this;
          setTimeout(function () {
            that.updateTransform(that.classList.contains('selected'));
          }, delay);
        }
        else {
          if (_status.event.player != game.me) return;
          if (this._transform && this.parentNode && this.parentNode.parentNode &&
            this.parentNode.parentNode.parentNode == ui.me &&
            (!_status.mousedown || _status.mouseleft) &&
            (!this.parentNode.parentNode.classList.contains('scrollh') || (game.layout == 'long2' || game.layout == 'nova'))) {
            if (bool) {
              this.style.transform = this._transform + ' translateY(-20px)';
            }
            else {
              this.style.transform = this._transform || '';
            }
          }
        }
      },
      aiexclude: function () {
        _status.event._aiexclude.add(this);
      },
      getSource: function (name) {
        if (this.name == name) return true;
        var info = lib.card[this.name];
        if (info && Array.isArray(info.source)) {
          return info.source.contains(name);
        }
        return false;
      },
      moveDelete: function (player) {
        this.fixed = true;
        if (!this._listeningEnd || this._transitionEnded) {
          this.moveTo(player);
          var that = this;
          setTimeout(function () {
            that.delete();
          }, 200);
        }
        else {
          this._onEndMoveDelete = player;
        }
      },
      moveTo: function (player) {
        this.fixed = true;
        var dx, dy;
        if (this.classList.contains('center')) {
          var nx = [50, -52];
          var ny = [50, -52];
          nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
          ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
          dx = player.getLeft() + player.offsetWidth / 2 - 52 - nx;
          dy = player.getTop() + player.offsetHeight / 2 - 52 - ny;
        }
        else {
          this.style.left = this.offsetLeft + 'px';
          this.style.top = this.offsetTop + 'px';

          dx = player.getLeft() + player.offsetWidth / 2 - 52 - this.offsetLeft;
          dy = player.getTop() + player.offsetHeight / 2 - 52 - this.offsetTop;
        }
        if (get.is.mobileMe(player)) {
          dx += get.cardOffset();
          if (ui.arena.classList.contains('oblongcard')) {
            dy -= 16;
          }
        }


        if (this.style.transform && this.style.transform != 'none' && this.style.transform.indexOf('translate') == -1) {
          this.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
        }
        else {
          this.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        }
        return this;
      },
      copy: function () {
        var node = this.cloneNode(true);
        node.style.transform = '';
        node.name = this.name;
        node.suit = this.suit;
        node.number = this.number;
        node.classList.remove('hidden');
        node.classList.remove('start');
        node.classList.remove('thrown');
        node.classList.remove('selectable');
        node.classList.remove('selected');
        node.classList.remove('removing');
        node.classList.remove('drawinghidden');
        node.classList.remove('glows');
        node.node = {
          name: node.querySelector('.name'),
          info: node.querySelector('.info'),
          intro: node.querySelector('.intro'),
          background: node.querySelector('.background'),
          image: node.querySelector('.image'),
          gaintag: node.querySelector('.gaintag'),
        }
        node.node.gaintag.innerHTML = '';
        var clone = true;
        var position;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') node.classList.add(arguments[i]);
          else if (get.objtype(arguments[i]) == 'div') position = arguments[i];
          else if (typeof arguments[i] == 'boolean') clone = arguments[i];
        }
        node.moveTo = lib.element.card.moveTo;
        node.moveDelete = lib.element.card.moveDelete;
        if (clone) this.clone = node;
        if (position) position.appendChild(node);
        return node;
      },
      uncheck: function (skill) {
        if (skill) this._uncheck.add(skill);
        this.classList.add('uncheck');
      },
      recheck: function (skill) {
        if (skill) this._uncheck.remove(skill);
        else this._uncheck.length = 0;
        if (this._uncheck.length == 0) this.classList.remove('uncheck');
      },
      discard: function (bool) {
        if (!this.destroyed) {
          ui.discardPile.appendChild(this);
        }
        this.fix();
        this.classList.remove('glow');
        if (bool === false) {
          ui.cardPile.insertBefore(this, ui.cardPile.childNodes[Math.floor(Math.random() * ui.cardPile.childNodes.length)]);
        }
        else {
          if (_status.discarded) {
            _status.discarded.add(this);
          }
        }
      },
      hasTag: function (tag) {
        if (this.cardid && _status.cardtag && _status.cardtag[tag] && _status.cardtag[tag].contains(this.cardid)) {
          return true;
        }
        return false;
      },
      /**
       * 判断本卡牌是否在某角色的区域中
       * @returns {!boolean}
       */
      hasPosition: function () {
        return ['h', 'e', 'j', 's', 'x'].contains(get.position(this));
      },
      /**
       * 判断本卡牌是否在牌堆或弃牌堆中
       * @returns {!boolean}
       */
      isInPile: function () {
        return ['c', 'd'].contains(get.position(this));
      }
    },
    /**
     * 按钮方法
     * @name element.button
     * @type {!Object}
     */
    button: {
      exclude: function () {
        if (_status.event.excludeButton == undefined) {
          _status.event.excludeButton = [];
        }
        _status.event.excludeButton.add(this);
      }
    },
    /**
     * 事件方法，游戏进行过程中每一个事件所具有的方法（比如设置事件内容【setContent】和停止事件【finish】）
     * 事件
     * @namespace
     * @mixin
     */
    event: {
      changeToZero: function () {
        this.num = 0;
        this.numFixed = true;
      },
      /**
       * 结束事件
       * @function
       */
      finish: function () {
        this.finished = true;
      },
      /**
       * 取消事件
       * 直接结束事件，也跳过子事件的触发和执行
       * @function
       * @param {?boolean} all 见{@link lib.element.event.untrigger}
       * @param {?GameCores.GameObjects.Player} player 见{@link lib.element.event.untrigger}
       * @param {?string} notrigger 如果为'notrigger'则**不尝试触发**`${this.name}Cancelled`
       */
      cancel: function (arg1, arg2, notrigger) {
        this.untrigger.call(this, arguments);//??
        this.finish();
        if (notrigger != 'notrigger') {
          this.trigger(this.name + 'Cancelled');
          if (this.type === 'card') {
            this.trigger('cardCancelled');
          }
          if (this.player && lib.phaseName.contains(this.name)) this.player.getHistory('skipped').add(this.name)
        }
      },
      /**
       * 转移状态
       * @function
       * @param {!number} step 新状态
       */
      goto: function (step) {
        this.step = step - 1;
      },
      /**
       * 自环(循环)
       * @function
       */
      redo: function () {
        this.step--;
      },
      setHiddenSkill: function (skill) {
        if (!this.player) return this;
        var hidden = this.player.hiddenSkills.slice(0);
        game.expandSkills(hidden);
        if (hidden.contains(skill)) this.set('hsskill', skill);
        return this;
      },
      /**
       * 链式函数，为Event的属性赋值
       * 赋值`this[key] = value`，同时绑定`this._set.push([key, value])`
       * @function lib.element.event.set
       * @param {!string} key 键名
       * @param {?Object} value 键值
       * @returns {GameCores.GameObjects.Event} this self
       */
      /**
       * 为Event的属性赋值
       * 对每个键值对，调用{@link lib.element.event.set}绑定到Event上
       * @function lib.element.event.set
       * @variation 2
       * @param {!Array<Array>} pairs 要设置键值对数组
       * @param {!string} pairs[].'[0]' 键名
       * @param {?Object} pairs[].'[1]' 键值
       */
      set: function (key, value) {
        if (arguments.length == 1 && Array.isArray(arguments[0])) {
          for (var i = 0; i < arguments[0].length; i++) {
            if (Array.isArray(arguments[0][i])) {
              this.set(arguments[0][i][0], arguments[0][i][1]);
            }
          }
        }
        else {
          if (typeof key != 'string') {
            console.log('warning: using non-string object as Evt key');
            console.log(_status.event);
          }
          this[key] = value;
          this._set.push([key, value]);
        }
        return this;
      },
      /**
       * 设置事件的状态机
       * @function
       * @param {?GameCores.Bases.StateMachine} stateMachine 状态机，如果未指定则不设置
       * @returns {GameCores.Bases.Event} this self
       */
      /**
       * 设置事件的状态机
       * @param {?string} name 状态机名，使用`lib.element.content[name]`作为事件的状态机，见{@link lib.element.content}
       * @returns {GameCores.Bases.Event} this self
       */
      setContent: function (name) {
        if (typeof name == 'function' || Array.isArray(name)) {
          this.content = lib.init.parse(name);
        }
        else {
          if (!lib.element.content[name]) console.log(name)
          if (!lib.element.content[name]._parsed) {
            lib.element.content[name] = lib.init.parse(lib.element.content[name]);
            lib.element.content[name]._parsed = true;
          }
          this.content = lib.element.content[name];
        }
        return this;
      },
      getLogv: function () {
        for (var i = 1; i <= 3; i++) {
          var Evt = this.getParent(i);
          if (Evt && Evt.logvid) return Evt.logvid;
        }
        return null;
      },
      send: function () {
        this.player.send(function (name, args, set, Evt, skills) {
          game.me.applySkills(skills);
          var next = game.me[name].apply(game.me, args);
          for (var i = 0; i < set.length; i++) {
            next.set(set[i][0], set[i][1]);
          }
          if (next._backupevent) {
            next.backup(next._backupevent);
          }
          next._modparent = Evt;
          game.resume();
        }, this.name, this._args || [], this._set,
          get.stringifiedResult(this.parent, 3), get.skillState(this.player));
        this.player.wait();
        game.pause();
      },
      /**
       * 选择结束，清空事件的选择(card，target, skill)
       */
      resume: function () {
        delete this._cardChoice;
        delete this._targetChoice;
        delete this._skillChoice;
      },
      /**
       * 获取本事件的指定父事件
       * @function
       * @param {(string|number)} [level] 指定父事件的名称 | 为number值时表示重复取level次_parent
       * @param {?boolean} [forced] 为true表示强制返回：获取不到指定父事件时返回{null}
       * @returns {?GameCores.Bases.Event} 通过_parent（_modparent）属性获取本事件的父事件，若父事件不满足要求或重复次数少于level，则取父事件的_parent，依此类推直至获取到满足条件的父事件
       */
      getParent: function (level, forced) {
        var parent;
        if (this._modparent && game.online) {
          parent = this._modparent;
        }
        else {
          parent = this.parent;
        }
        var toreturn = {};
        if (typeof level == 'string' && forced == true) {
          toreturn = null;
        }
        if (!parent) return toreturn;
        if (typeof level == 'number') {
          for (var i = 1; i < level; i++) {
            if (!parent) return toreturn;
            parent = parent.parent;
          }
        }
        else if (typeof level == 'string') {
          for (var i = 0; i < 20; i++) {
            if (!parent) return toreturn;
            if (parent.name == level) return parent;
            parent = parent.parent;
          }
          if (!parent) return toreturn;
        }
        if (toreturn === null) {
          return null;
        }
        return parent;
      },
      /**
       * 获取本事件的触发事件
       * @function
       * @returns {?GameCores.Bases.Event} 本事件的触发事件，如果本事件没有触发事件，返回undefined/null
       */
      getTrigger: function () {
        return this.getParent()._trigger;
      },
      /**
       * 返回本事件的随机值，如果已经有随机值就返回之前的随机值；未调用该函数时，随机值`this._rand`默认未指定(undefined)
       * @returns {!number} this._rand
       */
      getRand: function (name) {
        if (name) {
          if (!this._rand_map) this._rand_map = {};
          if (!this._rand_map[name]) this._rand_map[name] = Math.random();
          return this._rand_map[name];
        }
        if (!this._rand) this._rand = Math.random();
        return this._rand;
      },
      /**
       * 创建不可触发的`${this.name}Inserted`事件，立即执行
       * @function
       * @param {?GameCores.Bases.StateMachine} stateMachine 状态机
       * @param {?Object<string, Object>} map 键值对对象
       * @returns {!GameCores.Bases.Event} 创建的事件
       */
      insert: function (func, map) {
        var next = game.createEvent(this.name + 'Inserted', false, this);
        next.setContent(func);
        for (var i in map) {
          next.set(i, map[i]);
        }
        return next;
      },
      /**
       * 创建不可触发的`${this.name}Inserted`事件，于本事件结算后执行
       * @function
       * @param {?GameCores.Bases.StateMachine} stateMachine 状态机
       * @param {?Object<string, Object>} map 键值对对象
       * @returns {!GameCores.Bases.Event} 创建的事件
       */
      insertAfter: function (func, map) {
        var next = game.createEvent(this.name + 'Inserted', false, { next: [] });
        this.after.push(next);
        next.setContent(func);
        for (var i in map) {
          next.set(i, map[i]);
        }
        return next;
      },
      /**
       * 备份
       * @function
       * @param {?string} skill 技能ID
       */
      backup: function (skill) {
        this._backup = {
          filterButton: this.filterButton,
          selectButton: this.selectButton,
          filterTarget: this.filterTarget,
          selectTarget: this.selectTarget,
          filterCard: this.filterCard,
          selectCard: this.selectCard,
          position: this.position,
          forced: this.forced,
          fakeforce: this.fakeforce,
          _aiexclude: this._aiexclude,
          complexSelect: this.complexSelect,
          complexCard: this.complexCard,
          complexTarget: this.complexTarget,
          _cardChoice: this._cardChoice,
          _targetChoice: this._targetChoice,
          _skillChoice: this._skillChoice,
          ai1: this.ai1,
          ai2: this.ai2,
        }
        if (skill) {
          var info = get.info(skill);
          this.skill = skill;
          this._aiexclude = [];
          if (typeof info.viewAs == 'function') {
            if (info.filterButton != undefined) this.filterButton = get.filter(info.filterButton);
            if (info.selectButton != undefined) this.selectButton = info.selectButton;
            if (info.filterTarget != undefined) this.filterTarget = get.filter(info.filterTarget);
            if (info.selectTarget != undefined) this.selectTarget = info.selectTarget;
            if (info.filterCard != undefined) {
              if (info.ignoreMod) this.ignoreMod = true;
              this.filterCard2 = get.filter(info.filterCard);
              this.filterCard = function (card, player, Evt) {
                var evt = Evt || _status.event;
                if (!evt.ignoreMod && player) {
                  var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                  if (mod != 'unchanged') return mod;
                  if (evt._backup && evt._backup.filterCard) {
                    var cardx2 = lib.skill[evt.skill].viewAs(ui.selected.cards.concat([card]), player);
                    if (get.is.object(cardx2)) {
                      var cardx = get.autoViewAs(cardx2, ui.selected.cards.concat([card]));
                      if (!get.filter(evt._backup.filterCard)(cardx, player, evt)) return false;
                    }
                  }
                }
                return get.filter(evt.filterCard2).apply(this, arguments);
              };
            }
            if (info.selectCard != undefined) this.selectCard = info.selectCard;
            if (info.position != undefined) this.position = info.position;
            if (info.forced != undefined) this.forced = info.forced;
            if (info.complexSelect != undefined) this.complexSelect = info.complexSelect;
            if (info.complexCard != undefined) this.complexCard = info.complexCard;
            if (info.complexTarget != undefined) this.complexTarget = info.complexTarget;
            if (info.ai1 != undefined) this.ai1 = info.ai1;
            if (info.ai2 != undefined) this.ai2 = info.ai2;
          }
          else if (info.viewAs) {
            if (info.filterButton != undefined) this.filterButton = get.filter(info.filterButton);
            if (info.selectButton != undefined) this.selectButton = info.selectButton;
            if (info.filterTarget != undefined) this.filterTarget = get.filter(info.filterTarget);
            if (info.selectTarget != undefined) this.selectTarget = info.selectTarget;
            if (info.filterCard != undefined) {
              if (info.ignoreMod) this.ignoreMod = true;
              this.filterCard2 = get.filter(info.filterCard);
              this.filterCard = function (card, player, Evt) {
                var evt = Evt || _status.event;
                if (!evt.ignoreMod && player) {
                  var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                  if (mod != 'unchanged') return mod;
                  if (evt._backup && evt._backup.filterCard) {
                    var cardx = get.autoViewAs(lib.skill[evt.skill].viewAs, ui.selected.cards.concat([card]));
                    if (!get.filter(evt._backup.filterCard)(cardx, player, evt)) return false;
                  };
                }
                return get.filter(evt.filterCard2).apply(this, arguments);
              };
            }
            if (info.selectCard != undefined) this.selectCard = info.selectCard;
            if (info.position != undefined) this.position = info.position;
            if (info.forced != undefined) this.forced = info.forced;
            if (info.complexSelect != undefined) this.complexSelect = info.complexSelect;
            if (info.complexCard != undefined) this.complexCard = info.complexCard;
            if (info.complexTarget != undefined) this.complexTarget = info.complexTarget;
            if (info.ai1 != undefined) this.ai1 = info.ai1;
            if (info.ai2 != undefined) this.ai2 = info.ai2;
          }
          else {
            this.filterButton = info.filterButton ? get.filter(info.filterButton) : undefined;
            this.selectButton = info.selectButton;
            this.filterTarget = info.filterTarget ? get.filter(info.filterTarget) : undefined;
            this.selectTarget = info.selectTarget;
            this.filterCard = info.filterCard ? get.filter(info.filterCard) : undefined;
            this.selectCard = info.selectCard;
            this.position = info.position;
            this.forced = info.forced;
            this.complexSelect = info.complexSelect;
            this.complexCard = info.complexCard;
            this.complexTarget = info.complexTarget;
            if (info.ai1 != undefined) this.ai1 = info.ai1;
            if (info.ai2 != undefined) this.ai2 = info.ai2;
          }
          delete this.fakeforce;
        }
        delete this._cardChoice;
        delete this._targetChoice;
        delete this._skillChoice;
      },
      restore: function () {
        if (this._backup) {
          this.filterButton = this._backup.filterButton;
          this.selectButton = this._backup.selectButton;
          this.filterTarget = this._backup.filterTarget;
          this.selectTarget = this._backup.selectTarget;
          this.filterCard = this._backup.filterCard;
          this.selectCard = this._backup.selectCard;
          this.position = this._backup.position;
          this.forced = this._backup.forced;
          this.fakeforce = this._backup.fakeforce;
          this._aiexclude = this._backup._aiexclude;
          this.complexSelect = this._backup.complexSelect;
          this.complexCard = this._backup.complexCard;
          this.complexTarget = this._backup.complexTarget;
          this.ai1 = this._backup.ai1;
          this.ai2 = this._backup.ai2;
          this._cardChoice = this._backup._cardChoice;
          this._targetChoice = this._backup._targetChoice;
          this._skillChoice = this._backup._skillChoice;
        }
        delete this.skill;
        delete this.ignoreMod;
        delete this.filterCard2;
      },
      isMine: function () {
        return (this.player && this.player == game.me && !_status.auto && !this.player.isMad() && !game.notMe);
      },
      isOnline: function () {
        return (this.player && this.player.isOnline());
      },
      notLink: function () {
        return this.getParent().name != '_lianhuan' && this.getParent().name != '_lianhuan2';
      },
      isPhaseUsing: function (player) {
        var evt = this.getParent('phaseUse');
        if (!evt || evt.name != 'phaseUse') return false;
        return !player || player == evt.player;
      },
      addTrigger: function (skill, player) {
        if (!player) return;
        var evt = this;
        while (true) {
          var evt = evt.getParent('arrangeTrigger');
          if (!evt || evt.name != 'arrangeTrigger' || !evt.map) return;
          if (typeof skill == 'string') skill = [skill];
          game.expandSkills(skill);
          var filter = function (content) {
            if (typeof content == 'string') return content == triggername;
            return content.contains(triggername);
          };
          var trigger = evt._trigger;
          var triggername = evt.triggername;
          var map = false;
          if (evt.doing && evt.doing.player == player) map = evt.doing;
          else {
            for (var i = 0; i < evt.map.length; i++) {
              if (evt.map[i].player == player) { map = evt.map[i]; break; }
            }
          }
          if (!map) return;
          var func = function (skillx) {
            var info = lib.skill[skillx];
            var bool = false;
            for (var i in info.trigger) {
              if (filter(info.trigger[i])) { bool = true; break }
            }
            if (!bool) return;
            var priority = 0;
            if (info.priority) {
              priority = info.priority * 100;
            }
            if (info.silent) {
              priority++;
            }
            if (info.equipSkill) priority -= 25;
            if (info.cardSkill) priority -= 50;
            if (info.ruleSkill) priority -= 75;
            var toadd = [skillx, player, priority];
            if (map.list2) {
              for (var i = 0; i < map.list2.length; i++) {
                if (map.list2[i][0] == toadd[0] && map.list2[i][1] == toadd[1]) return;
              }
            };
            for (var i = 0; i < map.list.length; i++) {
              if (map.list[i][0] == toadd[0] && map.list[i][1] == toadd[1]) return;
            }
            map.list.add(toadd);
            map.list.sort(function (a, b) {
              return b[2] - a[2];
            });
          }
          for (var j = 0; j < skill.length; j++) {
            func(skill[j]);
          }
        }
      },
      /**
       * 尝试触发子事件
       * @param {!string} name trigger name
       */
      trigger: function (name) {
        //??
        if (_status.video) return;
        //如果是游戏开始前，分发手牌时，一切因获得/失去牌而触发的技能不会触发
        if ((this.name === 'gain' || this.name === 'lose') && !_status.gameDrawed) return;
        //分发手牌结束 [recommend] why here//??
        /**
         * 如果为true，表示游戏开始前分发手牌结束；如果未指定，则游戏未开始且手牌没有分发完成
         * @name _status.gameDrawed
         * @type {?true}
         */
        if (name === 'gameDrawEnd') _status.gameDrawed = true;
        if (name === 'gameStart') {
          if (_status.brawl && _status.brawl.gameStart) {
            _status.brawl.gameStart();
          }
          if (lib.config.show_cardpile) {
            ui.cardPileButton.style.display = '';
          }
          /**
           * 如果为true，表示游戏已经开始；如果未指定，则游戏还在分发武将和手牌，尚未开始
           * @name _status.gameStarted
           * @type {?true}
           */
          _status.gameStarted = true;
          game.showHistory();
        }
        //通过hookmap优化性能，但是hookmap不向下兼容；如果处于兼容模式，则忽略hookmap优化
        if (!lib.hookmap[name] && !lib.config.compatiblemode) return;
        //?? 是否需要判空?
        if (!game.players || !game.players.length) return;
        var Evt = this;
        //?? 是否可以简化?
        //??
        var start = false;
        var starts = [_status.currentPhase, Evt.source, Evt.player, game.me, game.players[0]];
        for (var i = 0; i < starts.length; i++) {
          if (get.itemtype(starts[i]) == 'player') {
            start = starts[i]; break;
          }
        }
        if (!start) return;
        //确保start角色在游戏之中
        if (!game.players.contains(start)) {
          start = game.findNext(start);
        }
        var list = [];
        var list2 = [];
        var mapx = [];
        var allbool = false;
        var roles = ['player', 'source', 'target'];
        var listAdded;
        var mapxx;
        var addList = function (skill, player) {
          if (listAdded[skill]) return;
          if (player.forbiddenSkills[skill]) return;
          if (player.disabledSkills[skill]) return;
          listAdded[skill] = true;
          var info = lib.skill[skill];
          var num = 0;
          if (info.priority) {
            num = info.priority * 100;
          }
          if (info.silent) {
            num++;
          }
          if (info.equipSkill) num -= 30;
          if (info.ruleSkill) num -= 30;
          if (info.firstDo) {
            list.push([skill, player, num]);
            list.sort(function (a, b) {
              return b[2] - a[2];
            });
            allbool = true;
            return;
          }
          else if (info.lastDo) {
            list2.push([skill, player, num]);
            list2.sort(function (a, b) {
              return b[2] - a[2];
            });
            allbool = true;
            return;
          }
          mapxx.list.push([skill, player, num]);
          mapxx.list.sort(function (a, b) {
            return b[2] - a[2];
          });
          allbool = true;
        };
        var totalPopulation = game.players.length + game.dead.length + 1;
        var player = start;
        var globalskill = 'global_' + name;
        var map = _status.connectMode ? lib.playerOL : game.playerMap;
        for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
          var id = player.playerid;
          var mapxx = {
            player: player,
            list: [],
            list2: [],
          };
          listAdded = {};
          var notemp = player.skills.slice(0);
          for (var j in player.additionalSkills) {
            if (j.indexOf('hidden:') != 0) notemp.addArray(player.additionalSkills[j]);
          }
          for (var j in player.tempSkills) {
            if (notemp.contains(j)) return;
            var expire = player.tempSkills[j];
            if (expire === name ||
              (Array.isArray(expire) && expire.contains(name)) ||
              (typeof expire === 'function' && expire(Evt, player, name))) {
              delete player.tempSkills[j];
              player.removeSkill(j);
            }
            else if (get.objtype(expire) === 'object') {
              for (var i = 0; i < roles.length; i++) {
                if (expire[roles[i]] && player === Evt[roles[i]] &&
                  (expire[roles[i]] === name || (Array.isArray(expire[roles[i]]) && expire[roles[i]].contains(name)))) {
                  delete player.tempSkills[j];
                  player.removeSkill(j);
                }
              }
            }
          }
          if (lib.config.compatiblemode) {
            (function () {
              var skills = player.getSkills(true).concat(lib.skill.global);
              game.expandSkills(skills);
              for (var i = 0; i < skills.length; i++) {
                var info = get.info(skills[i]);
                if (info && info.trigger) {
                  var trigger = info.trigger;
                  var add = false;
                  if (trigger.player) {
                    if (typeof trigger.player === 'string') {
                      if (trigger.player === name) add = true;
                    }
                    else if (trigger.player.contains(name)) add = true;
                  }
                  if (trigger.target) {
                    if (typeof trigger.target === 'string') {
                      if (trigger.target === name) add = true;
                    }
                    else if (trigger.target.contains(name)) add = true;
                  }
                  if (trigger.source) {
                    if (typeof trigger.source === 'string') {
                      if (trigger.source === name) add = true;
                    }
                    else if (trigger.source.contains(name)) add = true;
                  }
                  if (trigger.global) {
                    if (typeof trigger.global === 'string') {
                      if (trigger.global === name) add = true;
                    }
                    else if (trigger.global.contains(name)) add = true;
                  }
                  if (add) {
                    addList(skills[i], player);
                  }
                }
              }
            }());
          }
          else {
            for (var i = 0; i < roles.length; i++) {
              var triggername = player.playerid + '_' + roles[i] + '_' + name;
              if (lib.hook[triggername]) {
                for (var j = 0; j < lib.hook[triggername].length; j++) {
                  addList(lib.hook[triggername][j], player);
                }
              }
              triggername = roles[i] + '_' + name;
              if (lib.hook.globalskill[triggername]) {
                for (var j = 0; j < lib.hook.globalskill[triggername].length; j++) {
                  addList(lib.hook.globalskill[triggername][j], player);
                }
              }
            }
            if (lib.hook.globalskill[globalskill]) {
              for (var j = 0; j < lib.hook.globalskill[globalskill].length; j++) {
                addList(lib.hook.globalskill[globalskill][j], player);
              }
            }
            for (var i in lib.hook.globaltrigger[name]) {
              if (map[i] === player) {
                for (var j = 0; j < lib.hook.globaltrigger[name][i].length; j++) {
                  addList(lib.hook.globaltrigger[name][i][j], map[i]);
                }
              }
            }
          }
          mapx.push(mapxx);
          player = player.nextSeat;
          if (!player || player === start) {
            break;
          }
        }

        if (allbool) {
          var next = game.createEvent('arrangeTrigger', false, Evt);
          next.setContent('arrangeTrigger');
          next.list = list;
          next.list2 = list2;
          next.map = mapx;
          next._trigger = Evt;
          next.triggername = name;
          //next.starter=start;
          Evt._triggering = next;
        }
      },
      /**
       * 取消将要触发的子事件；如果无参调用，不进行任何处理
       * @function
       * @param {?boolean} all 如果为true，取消全部要触发的子事件；如果未指定或为false，忽略该值
       * @param {?GameCores.GameObjects.Player} player 一个角色，取消所有将要对该角色触发的子事件，如果未指定，忽略该值
       */
      untrigger: function (all, player) {
        var evt = this._triggering;
        if (all) {
          if (evt && evt.map) {
            for (var i = 0; i < evt.map.length; i++) {
              evt.map[i].list = [];
            }
            evt.list = [];
            if (evt.doing) evt.doing.list = [];
          };
          this._triggered = 5;
        }
        else {
          if (player) {
            this._notrigger.add(player);
            if (!evt || !evt.map) return;
            for (var i = 0; i < evt.map.length; i++) {
              if (evt.map[i].player == player) evt.map[i].list.length = 0;
            }
          }
        }
      }
    },
    /**
     * 弹窗方法，.dialog节点共用的方法（比如开启和关闭弹窗【open/close】）
     * 对话框(弹窗)
     * @name element.dialog
     * @type {!Object}
     */
    dialog: {
      add: function (item, noclick, zoom) {
        if (typeof item == 'string') {
          if (item.indexOf('###') == 0) {
            var items = item.slice(3).split('###');
            this.add(items[0], noclick, zoom);
            this.addText(items[1], items[1].length <= 20, zoom);
          }
          else if (noclick) {
            var strstr = item;
            item = ui.create.div('', this.content);
            item.innerHTML = strstr;
          }
          else {
            item = ui.create.caption(item, this.content);
          }
        }
        else if (get.objtype(item) == 'div') {
          this.content.appendChild(item);
        }
        else if (get.itemtype(item) == 'cards') {
          var buttons = ui.create.div('.buttons', this.content);
          if (zoom) buttons.classList.add('smallzoom');
          this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
        }
        else if (get.itemtype(item) == 'players') {
          var buttons = ui.create.div('.buttons', this.content);
          if (zoom) buttons.classList.add('smallzoom');
          this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
        }
        else {
          var buttons = ui.create.div('.buttons', this.content);
          if (zoom) buttons.classList.add('smallzoom');
          this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
        }
        this.updateForcebutton(zoom)
        ui.update();
        return item;
      },
      updateForcebutton(zoom) {
        if (this.buttons.length) {
          if (this.forcebutton !== false) this.forcebutton = true;
          if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
            this.classList.remove('forcebutton-auto');
          }
          else if (!this.noforcebutton) {
            this.classList.add('forcebutton-auto');
          }
        }
      },
      addText: function (str, center) {
        if (center !== false) {
          this.add('<div class="text center">' + str + '</div>');
        }
        else {
          this.add('<div class="text">' + str + '</div>');
        }
        return this;
      },
      addSmall: function (item, noclick) {
        return this.add(item, noclick, true);
      },
      addAuto: function (content) {
        if (content && content.length > 4 && !this._hovercustomed) {
          this.addSmall(content);
        }
        else {
          this.add(content);
        }
      },
      open: function () {
        if (this.noopen) return;
        for (var i = 0; i < ui.dialogs.length; i++) {
          if (ui.dialogs[i] == this) {
            this.show();
            this.refocus();
            ui.dialogs.remove(this);
            ui.dialogs.unshift(this);
            ui.update();
            return this;
          }
          if (ui.dialogs[i].static) ui.dialogs[i].unfocus();
          else ui.dialogs[i].hide();
        }
        ui.dialog = this;
        var translate;
        if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
          translate = lib.config.dialog_transform;
          this._dragtransform = translate;
          this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(0.8)';
        }
        else {
          this.style.transform = 'scale(0.8)';
        }
        this.style.transitionProperty = 'opacity,transform';
        this.style.opacity = 0;
        ui.arena.appendChild(this);
        ui.dialogs.unshift(this);
        ui.update();
        ui.refresh(this);
        if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
          this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(1)';
        }
        else {
          this.style.transform = 'scale(1)';
        }
        this.style.opacity = 1;
        var that = this;
        setTimeout(function () {
          that.style.transitionProperty = '';
        }, 500);
        return this;
      },
      close: function () {
        ui.dialogs.remove(this);
        this.delete();
        if (ui.dialogs.length > 0) {
          ui.dialog = ui.dialogs[0];
          ui.dialog.show();
          ui.dialog.refocus();
          ui.update();
        }
        // if(ui.arenalog){
        //     ui.arenalog.classList.remove('withdialog');
        // }
        return this;
      },
      setCaption: function (str) {
        this.querySelector('.caption').innerHTML = str;
        return this;
      }
    },
    /**
     * 选项方法，参考弹窗方法，在创建.control节点时依次为其添加
     * 选择项
     * @name element.control
     * @type {!Object}
     */
    control: {
      open: function () {
        ui.control.insertBefore(this, _status.createControl || ui.confirm);
        ui.controls.unshift(this);
        if (this.childNodes.length) {
          this.style.transition = 'opacity 0.5s';
          ui.refresh(this);
          this.style.transform = 'translateX(-' + (this.offsetWidth / 2) + 'px)';
          this.style.opacity = 1;
          ui.refresh(this);
          this.style.transition = '';
        }
        else {
          this.animate('controlpressdownx', 500);
        }
        ui.updatec();
        return this;
      },
      add: function (item) {
        var node = document.createElement('div');
        this.appendChild(node);
        node.link = item;
        node.innerHTML = get.translation(item);
        node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control);
      },
      close: function () {
        this.animate('controlpressdownx', 500);

        ui.controls.remove(this);
        this.delete();

        setTimeout(ui.updatec, 100);


        if (ui.confirm == this) delete ui.confirm;
        if (ui.skills == this) delete ui.skills;
        if (ui.skills2 == this) delete ui.skills2;
        if (ui.skills3 == this) delete ui.skills3;
      },
      replace: function () {
        // this.animate('controlpressdownx',500);
        if (this.replaceTransition === false) {
          this.style.transitionProperty = 'none';
          ui.refresh(this);
        }

        while (this.childNodes.length) this.firstChild.remove();
        var i, controls;
        if (Array.isArray(arguments[0])) controls = arguments[0];
        else controls = arguments;
        delete this.custom;
        for (i = 0; i < controls.length; i++) {
          if (typeof controls[i] == 'function') {
            this.custom = controls[i];
          }
          else {
            this.add(controls[i]);
          }
        }
        if (this.childNodes.length) {
          var width = 0;
          for (i = 0; i < this.childNodes.length; i++) width += this.childNodes[i].offsetWidth;
          ui.refresh(this);
          this.style.width = width + 'px';
        }
        ui.updatec();
        if (this.replaceTransition === false) {
          var that = this;
          setTimeout(function () {
            that.style.transitionProperty = '';
          }, 200);
        }
        return this;
      }
    },
    /**
     * 客户端
     * @name element.client
     * @type {!Object}
     */
    client: {
      send: function () {
        if (this.closed) return this;
        var args = Array.from(arguments);
        if (typeof args[0] == 'function') {
          args.unshift('exec');
        }
        for (var i = 1; i < args.length; i++) {
          args[i] = get.stringifiedResult(args[i]);
        }
        try {
          this.ws.send(JSON.stringify(args));
        }
        catch (e) {
          this.ws.close();
        }
        return this;
      },
      close: function () {
        lib.node.clients.remove(this);
        lib.node.observing.remove(this);
        if (ui.removeObserve && !lib.node.observing.length) {
          ui.removeObserve.remove();
          delete ui.removeObserve;
        }
        this.closed = true;
        if (_status.waitingForPlayer) {
          for (var i = 0; i < game.connectPlayers.length; i++) {
            if (game.connectPlayers[i].playerid == this.id) {
              game.connectPlayers[i].uninitOL();
              delete game.connectPlayers[i].playerid;
            }
          }
          if (game.onlinezhu == this.id) {
            game.onlinezhu = null;
          }
          game.updateWaiting();
        }
        else if (lib.playerOL[this.id]) {
          var player = lib.playerOL[this.id];
          player.setNickname(player.nickname + ' - 离线');
          game.broadcast(function (player) {
            player.setNickname(player.nickname + ' - 离线');
          }, player);
          player.unwait('ai');
        }

        if (window.isNonameServer) {
          document.querySelector('#server_count').innerHTML = lib.node.clients.length;
        }
        return this;
      }
    },
    /**
     * Node Web Server listeners and callbacks
     * @name element.nodews
     * @type {!Object}
     */
    nodews: {
      send: function (message) {
        game.send('server', 'send', this.wsid, message);
      },
      on: function (type, func) {
        this['on' + type] = func;
      },
      close: function () {
        game.send('server', 'close', this.wsid);
      }
    },
    /**
     * Web Server
     * @name element.ws
     * @type {!Object}
     */
    ws: {
      onopen: function () {
        if (_status.connectCallback) {
          _status.connectCallback(true);
          delete _status.connectCallback;
        }
      },
      onmessage: function (messageevent) {
        if (messageevent.data == 'heartbeat') {
          this.send('heartbeat');
          return;
        }
        var message;
        try {
          message = JSON.parse(messageevent.data);
          if (!Array.isArray(message) ||
            typeof lib.message.client[message[0]] !== 'function') {
            throw ('err');
          }
          for (var i = 1; i < message.length; i++) {
            message[i] = get.parsedResult(message[i]);
          }
        }
        catch (e) {
          console.log(e);
          console.log('invalid message: ' + messageevent.data);
          return;
        }
        lib.message.client[message.shift()].apply(null, message);
      },
      onerror: function (e) {
        if (this._nocallback) return;
        if (_status.connectCallback) {
          _status.connectCallback(false);
          delete _status.connectCallback;
        }
        else {
          alert('连接失败');
        }
      },
      onclose: function () {
        if (this._nocallback) return;
        if (_status.connectCallback) {
          _status.connectCallback(false);
          delete _status.connectCallback;
        }
        if (game.online || game.onlineroom) {
          if ((game.servermode || game.onlinehall) && _status.over) {

          }
          else {
            localStorage.setItem(lib.configprefix + 'directstart', true);
            game.reload();
          }
        }
        else {
          // game.saveConfig('reconnect_info');
        }
        game.online = false;
        game.ws = null;
      }
    }
  }
}