module.exports = {
   getFun: (vkCore) => {
      let { game, ui, get, ai, lib, _status } = vkCore
      return {
         /**
          * 返回联机名称
          * @returns {!number} 默认为“无名玩家”
          */
         connectNickname: function () {
            return typeof lib.config.connect_nickname == 'string' ? (lib.config.connect_nickname.slice(0, 12)) : '无名玩家';
         },
         //TODO
         sourceCharacter: function (str) {
            if (str) {
               for (var i in lib.characterReplace) {
                  if (lib.characterReplace[i].contains(str)) return i;
               }
            }
            return str;
         },
         /**
          * 返回一个角色是否是幸运星；
          * 此函数仅单机模式有效，联机模式总返回false
          * @param {GameCores.GameObjects.Player} player 一个角色
          * @returns {!boolean}
          */
         isLuckyStar: function (player) {
            if (player && player.hasSkillTag('luckyStar')) return true;
            if (_status.connectMode) return false;
            return (!player || player == game.me || player.isUnderControl()) && lib.config.lucky_star == true;
         },
         /**
          * 返回模板的hp
          * @param {(number|string)} hp 如果是数值，返回`hp`；如果是字符串，且为`hp/maxHp`的形式，返回那个**hp**的值；其他情况返回0
          * @returns {!number}
          */
         infoHp: function (hp) {
            if (typeof hp == 'number') return hp;
            else if (typeof hp == 'string' && hp.indexOf('/') != -1) {
               return parseInt(hp.slice(0, hp.indexOf('/')));
            }
            return 0;
         },
         /**
          * 返回模板的maxHp
          * @param {(number|string)} hp 如果是数值，返回`hp`；如果是字符串，且为`hp/maxHp`的形式，返回那个**maxHp**的值；其他情况返回0
          * @returns {!number}
          */
         infoMaxHp: function (hp) {
            if (typeof hp == 'number') return hp;
            else if (typeof hp == 'string' && hp.indexOf('/') != -1) {
               return parseInt(hp.slice(hp.indexOf('/') + 1));
            }
            return 0;
         },
         /**
          * 布尔判断封装
          * @namespace
          */
         is: {
            //“保护新手”模式的ban将
            banForBeginner: function (current) {
               if (current in lib.character) {
                  for (var i in lib.characterPack) {
                     if (!['Beginner', 'hololive', 'nijisanji', 'clubs', 'vtuber'].contains(i)) {
                        if (current in lib.characterPack[i]) {
                           return true
                        }
                     }
                  }
                  if ([
                     're_ShigureUi', 're_NijikawaRaki',
                     'ŌokamiMio',
                     'Elu', 'SuzukaUtako', 'MononobeAlice', 'SakuraRitsuki', 'YagamiKaruta',
                     'Bella', 'Carol', 'Azusa', 'Yousa', 'AkiRinco', 'Lovely', 'Pudding', 'jike', 'Bacharu', 'SephiraSu', 'Reine', 'IsekaiJoucho', 'Rim', 'Harusaruhi',
                     'Bafuko', 'Hiiro', 'Eilene', 'YaotomeNoe', 'Niuniuzi', 'Zaodaoji'
                  ].contains(current)) return true;
                  return false;
               }
               if (current in lib.card) {
                  for (var i in lib.cardPack) {
                     if (!['standard', 'extra'].contains(i)) {
                        if (lib.cardPack[i].contains(current)) {
                           return true
                        }
                     }
                  }
                  return false;
               }
            },
            //检查卡牌是否符合要求的快捷方法(只要求满足至少一种条件，无条件时默认不满足)
            filterCardBy: function (card, arg) {
               if (!card || !arg) return false;
               if (typeof arg == 'string') {
                  if (arg == get.name(card)) return true;
               }
               else if (typeof arg == 'object') {
                  for (var x in arg) {
                     var value;
                     if (x == 'type' || x == 'subtype' || x == 'color' || x == 'suit' || x == 'number') {
                        value = get[x](card);
                     }
                     else {
                        value = card[x];
                     }
                     if ((typeof arg[x] == 'string' && value == arg[x]) ||
                        (Array.isArray(arg[x]) && arg[x].contains(value))) {
                        return true;
                     }
                  }
               }
               else if (typeof arg == 'function') {
                  return arg(card);
               }
               return false;
            },
            /**
             * 判断技能是否被封锁
             */
            blocked: function (skill, player) {
               if (!player.storage.skill_blocker || !player.storage.skill_blocker.length) return false;
               for (let i of player.storage.skill_blocker) {
                  if (lib.skill[i] && lib.skill[i].skillBlocker && lib.skill[i].skillBlocker(skill, player)) return true;
               }
               return false;
            },
            /**
             * 判断角色是否为多势力
             */
            double: function (name, array) {
               if (!lib.character[name] || !lib.character[name][4]) return false;
               for (let i of lib.character[name][4]) {
                  if (i.indexOf('doublegroup:') == 0) {
                     if (!array) return true;
                     return i.split(':').slice(1);
                  }
               }
               return false;
            },
            /**
             * 判断卡牌是否携带应变标签
             */
            yingbian: function (node) {
               return get.cardtag(node, 'yingbian_zhuzhan') || get.cardtag(node, 'yingbian_fujia') || get.cardtag(node, 'yingbian_canqu') || get.cardtag(node, 'yingbian_kongchao');
            },
            emoji: function (substring) {
               if (substring) {
                  var reg = new RegExp("[~#^$@%&!?%*]", 'g');
                  if (substring.match(reg)) {
                     return true;
                  }
                  for (var i = 0; i < substring.length; i++) {
                     var hs = substring.charCodeAt(i);
                     if (0xd800 <= hs && hs <= 0xdbff) {
                        if (substring.length > 1) {
                           var ls = substring.charCodeAt(i + 1);
                           var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                           if (0x1d000 <= uc && uc <= 0x1f77f) {
                              return true;
                           }
                        }
                     }
                     else if (substring.length > 1) {
                        var ls = substring.charCodeAt(i + 1);
                        if (ls == 0x20e3) {
                           return true;
                        }
                     }
                     else {
                        if (0x2100 <= hs && hs <= 0x27ff) {
                           return true;
                        }
                        else if (0x2B05 <= hs && hs <= 0x2b07) {
                           return true;
                        }
                        else if (0x2934 <= hs && hs <= 0x2935) {
                           return true;
                        }
                        else if (0x3297 <= hs && hs <= 0x3299) {
                           return true;
                        }
                        else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                           || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                           || hs == 0x2b50) {
                           return true;
                        }
                     }
                  }
               }
               return false;
            },
            banWords: function (str) {
               if (get.is.emoji(str)) return true;
               for (let i of require('@e/keyWords').bannedKeyWords) {
                  if (str.indexOf(i) != -1) return true;
               }
               return false;
            },
            converted: function (Evt) {
               return !(Evt.card && Evt.card.isCard);
            },
            safari: function () {
               var ua = navigator.userAgent.toLowerCase();
               return ua.indexOf('safari' != -1) && ua.indexOf('chrome') == -1;
            },
            freePosition: function (cards) {
               for (var i = 0; i < cards.length; i++) {
                  if (!cards[i].hasPosition) return false;
                  if (cards[i].hasPosition()) return false;
               }
               return true;
            },
            nomenu: function (name, item) {
               var menus = ['system', 'menu'];
               var configs = {
                  show_round_menu: lib.config.show_round_menu,
                  round_menu_func: lib.config.round_menu_func,
                  touchscreen: lib.config.touchscreen,
                  swipe_up: lib.config.swipe_up,
                  swipe_down: lib.config.swipe_down,
                  swipe_left: lib.config.swipe_left,
                  swipe_right: lib.config.swipe_right,
                  right_click: lib.config.right_click,
                  phonelayout: lib.config.phonelayout
               };
               configs[name] = item;
               if (!configs.phonelayout) return false;
               if (configs.show_round_menu && menus.contains(configs.round_menu_func)) {
                  return false;
               }
               if (configs.touchscreen) {
                  if (menus.contains(configs.swipe_up)) return false;
                  if (menus.contains(configs.swipe_down)) return false;
                  if (menus.contains(configs.swipe_left)) return false;
                  if (menus.contains(configs.swipe_right)) return false;
               }
               else {
                  if (configs.right_click == 'config') return false;
               }
               if (name) {
                  setTimeout(function () {
                     alert('请将至少一个操作绑定为显示按钮或打开菜单，否则将永远无法打开菜单');
                  });
               }
               return true;
            },
            altered: function (skill) {
               return false;
               // if(_status.connectMode) return true;
               // return !lib.config.vintageSkills.contains(skill);
            },
            node: function (obj) {
               var str = Object.prototype.toString.call(obj);
               if (str && str.indexOf('[object HTML')) return true;
               return false;
            },
            div: function (obj) {
               return Object.prototype.toString.call(obj) === '[object HTMLDivElement]';
            },
            map: function (obj) {
               return Object.prototype.toString.call(obj) === '[object Map]';
            },
            set: function (obj) {
               return Object.prototype.toString.call(obj) === '[object Set]';
            },
            object: function (obj) {
               return Object.prototype.toString.call(obj) === '[object Object]';
            },
            singleSelect: function (func) {
               if (typeof func == 'function') return false;
               var select = get.select(func);
               return select[0] == 1 && select[1] == 1;
            },
            jun: function (name) {
               if (get.mode() == 'guozhan') {
                  if (name && typeof name == 'object') {
                     if (name.isUnseen && name.isUnseen(0)) return false;
                     name = name.name1;
                  }
                  if (typeof name == 'string' && name.indexOf('gz_jun_') == 0) {
                     return true;
                  }
               }
               return false;
            },
            versus: function () {
               return !_status.connectMode && get.mode() == 'versus' && _status.mode == 'three';
            },
            changban: function () {
               return get.mode() == 'single' && _status.mode == 'changban';
            },
            single: function () {
               return get.mode() == 'single' && _status.mode == 'normal';
            },
            mobileMe: function (player) {
               return (game.layout == 'mobile' || game.layout == 'long') && !game.chess && player.dataset.position == 0;
            },
            newLayout: function () {
               if (game.layout != 'default') return true;
               return false;
            },
            phoneLayout: function () {
               if (!lib.config.phonelayout) return false;
               return (game.layout == 'mobile' || game.layout == 'long' || game.layout == 'long2' || game.layout == 'nova');
            },
            singleHandcard: function () {
               if (game.singleHandcard || game.layout == 'mobile' || game.layout == 'long' || game.layout == 'long2' || game.layout == 'nova') {
                  return true;
               }
               return false;
            },
            linked2: function (player) {
               if (game.chess) return true;
               if (lib.config.link_style2 != 'rotate') return true;
               // if(game.chess) return false;
               if (game.layout == 'long' || game.layout == 'long2' || game.layout == 'nova') return true;
               if (player.dataset.position == '0') {
                  return ui.arena.classList.contains('oblongcard');
               }
               return false;
            },
            empty: function (obj) {
               for (var i in obj) return false;
               return true;
            },
            pos: function (str) {
               return (str == 'h' || str == 'e' || str == 'j' || str == 'he' || str == 'hj' || str == 'ej' || str == 'hej');
            },
            /**
             * 判断技能是否为锁定技
             */
            locked: function (skill, player) {
               var info = lib.skill[skill];
               if (typeof info.locked == 'function') return info.locked(skill, player);
               if (info.locked == false) return false;
               if (info.trigger && info.forced) return true;
               if (info.mod) return true;
               if (info.locked) return true;
               return false;
            },
         },
         /**
          * 从牌堆底抽取指定数量的游戏牌
          * 如果牌堆没有牌，游戏直接平局
          * @param {number} num 要抽的牌数
          * @returns {!Array<GameCores.GameObjects.Card>}
          */
         bottomCards: function (num) {
            if (_status.waitingForCards) {
               ui.create.cards.apply(ui.create, _status.waitingForCards);
               delete _status.waitingForCards;
            }
            var list = [];
            var card = false;
            if (typeof num != 'number') num = 1;
            if (num == 0) { card = true; num = 1; }
            if (num < 0) num = 1;
            while (num--) {
               if (ui.cardPile.hasChildNodes() == false) {
                  if (_status.maxShuffle != undefined) {
                     if (_status.maxShuffle == 0) {
                        if (_status.maxShuffleCheck) {
                           game.over(_status.maxShuffleCheck());
                        }
                        else {
                           game.over('平局');
                        }
                        return [];
                     }
                     _status.maxShuffle--;
                  }
                  game.shuffleNumber++;
                  if (_status.event.trigger) _status.event.trigger('washCard');
                  var cards = [], i;
                  for (var i = 0; i < lib.onwash.length; i++) {
                     if (lib.onwash[i]() == 'remove') {
                        lib.onwash.splice(i--, 1);
                     }
                  }
                  if (_status.discarded) {
                     _status.discarded.length = 0;
                  }
                  for (i = 0; i < ui.discardPile.childNodes.length; i++) {
                     var currentcard = ui.discardPile.childNodes[i];
                     currentcard.vanishtag.length = 0;
                     if (get.info(currentcard).vanish || currentcard.storage.vanish) {
                        currentcard.remove();
                        continue;
                     }
                     cards.push(currentcard);
                  }
                  cards.randomSort();
                  for (var i = 0; i < cards.length; i++) {
                     ui.cardPile.appendChild(cards[i]);
                  }
               }
               if (ui.cardPile.hasChildNodes() == false) {
                  game.over('平局');
                  return [];
               }
               var cardx = ui.cardPile.removeChild(ui.cardPile.lastChild);
               cardx.original = 'c';
               list.push(cardx);
            }
            game.updateRoundNumber();
            if (card) return list[0];
            return list;
         },
         //TODO
         discarded: function () {
            var list = _status.discarded.slice(0);
            for (var i = 0; i < list.length; i++) {
               if (list[i].parentNode != ui.discardPile) {
                  list.splice(i--, 1);
               }
            }
            return list;
         },
         /**
          * 返回横坐标上的一个偏移量
          * #window <- #arena
          * @returns {number}
          */
         cardOffset: function () {
            var x = ui.arena.getBoundingClientRect();
            var y = ui.window.getBoundingClientRect();
            return -y.width / 2 + (x.left + x.width / 2);
         },
         /**
          * @param {string} str color
          * @returns {string} '#r'
          */
         colorspan: function (str) {
            if (str[0] == '#') {
               var color;
               switch (str[1]) {
                  case 'r': color = 'fire'; break;
                  case 'p': color = 'legend'; break;
                  case 'b': color = 'blue'; break;
                  case 'g': color = 'green'; break;
                  case 'y': color = 'yellow'; break;
                  case 'i': color = 'ice'; break;
                  default: return str.slice(2);
               }
               return '<span class="' + color + 'text ' + color + 'auto">' + str.slice(2) + '</span>';
            }
            return str;
         },
         evtprompt: function (next, str) {
            if (next.prompt) {
               next.set('prompt2', str);
            }
            else {
               if (str.indexOf('###') == 0) {
                  var prompts = str.slice(3).split('###');
                  if (prompts[0]) next.set('prompt', prompts[0]);
                  if (prompts[1]) next.set('prompt2', prompts[1]);
               }
               else {
                  next.set('prompt', str);
               }
            }
         },
         /**
          * 将游戏牌(数组)`cards`视为一张给定牌名的游戏牌`card`；
          * 如果游戏牌`card`有属性`autoViewAs`，游戏牌(数组)`cards`视为一张牌名为`autoViewAs`的游戏牌
          * @param {GameCores.GameObjects.Card} card  一个至少有牌名的临时"游戏牌"对象，除了牌名，其他属性、函数可以不指定
          * @param {!string} card.name 牌名
          * @param {(GameCores.GameObjects.Card|Array<GameCores.GameObjects.Card>)} cards 游戏牌(数组)
          * @returns {({name:string, cards:?Array<GameCores.GameObjects.Card>}|{name:string, suit: string, number: (string|number), nature: string}|{name:string, suit: string, number: (string|number), nature: string, isCard: true, cardid: (string|number), wunature: boolean, storage: Object, cards: Array<GameCores.GameObjects.Card>}|GameCores.GameObjects.Card)}
          */
         autoViewAs: function (card, cards) {
            var info = get.info(card);
            if (info.autoViewAs) {
               if (cards === false) {
                  return {
                     name: info.autoViewAs
                  };
               }
               else if (Array.isArray(cards)) {
                  return {
                     name: info.autoViewAs,
                     cards: cards.slice(0)
                  };
               }
               else if (get.itemtype(card) == 'card') {
                  return {
                     name: info.autoViewAs,
                     cards: [card]
                  };
               }
               else {
                  return {
                     name: info.autoViewAs,
                     suit: card.suit,
                     number: card.number,
                     nature: card.nature,
                  };
               }
            }
            else {
               if (card.isCard || get.itemtype(card) == 'card') {
                  var next = {
                     name: get.name(card),
                     suit: get.suit(card),
                     number: get.number(card),
                     nature: get.nature(card),
                     isCard: true,
                     cardid: card.cardid,
                     wunature: card.wunature,
                     storage: card.storage,
                     cards: card.cards,
                  };
                  if (get.itemtype(cards) == 'cards' && !card.cards) next.cards = cards.slice(0);
                  else if (get.itemtype(card) == 'card') next.cards = [card];
                  return next;
               }
               else if (get.is.object(card) && get.itemtype(cards) == 'cards' && !card.cards) {
                  card = get.copy(card);
                  card.cards = cards.slice(0);
               }
               return card;
            }
         },
         max: function (list, func, type) {
            list = list.slice(0);
            if (typeof func == 'string') {
               var key = func;
               func = function (item) {
                  return item[key];
               }
            }
            list.sort(function (a, b) {
               return func(b) - func(a);
            });
            if (type == 'list') {
               var list2 = [];
               for (var i = 0; i < list.length; i++) {
                  if (func(list[i]) == func(list[0])) {
                     list2.push(list[i]);
                  }
               }
               return list2;
            }
            else if (type == 'item') {
               return list[0];
            }
            else {
               return func(list[0]);
            }
         },
         min: function (list, func, type) {
            list = list.slice(0);
            if (typeof func == 'string') {
               var key = func;
               func = function (item) {
                  return item[key];
               }
            }
            list.sort(function (a, b) {
               return func(a) - func(b);
            });
            if (type == 'list') {
               var list2 = [];
               for (var i = 0; i < list.length; i++) {
                  if (func(list[i]) == func(list[0])) {
                     list2.push(list[i]);
                  }
               }
               return list2;
            }
            else if (type == 'item') {
               return list[0];
            }
            else {
               return func(list[0]);
            }
         },
         character: function (name, num) {
            var info = lib.character[name];
            if (!info) {
               for (var i in lib.characterPack) {
                  if (lib.characterPack[i][name]) {
                     info = lib.characterPack[i][name];
                     break;
                  }
               }
            }
            if (info) {
               if (typeof num == 'number') {
                  return info[num];
               }
               return info;
            }
            return null;
         },
         characterIntro: function (name) {
            if (lib.characterIntro[name]) return lib.characterIntro[name];
            var tags = get.character(name, 4);
            if (tags) {
               for (var i = 0; i < tags.length; i++) {
                  if (tags[i].indexOf('des:') == 0) {
                     return tags[i].slice(4);
                  }
               }
            }
            if (name.indexOf('gz_') == 0) {
               name = name.slice(3);
               if (lib.characterIntro[name]) return lib.characterIntro[name];
            }
            if (name.indexOf('_') != -1) {
               name = name.slice(name.indexOf('_') + 1);
            }
            if (lib.characterIntro[name]) return lib.characterIntro[name];
            // return '暂无武将介绍';
            return '';
         },
         characterTag: function (name) {
            var str = '';
            var tags = get.character(name, 4);
            if (!tags) return str;
            if (tags) {
               for (var i = 0; i < tags.length; i++) {
                  if (tags[i].indexOf('des:') == 0) {
                     continue;
                  }
                  var str0 = lib.translate[tags[i] + '_tag'] || lib.translate[tags[i]];
                  if (str0) {
                     if (!str.length) str += '标签:';
                     str += ' ';
                     str += str0;
                  }
               }
            }
            return str;
         },
         groupnature: function (group, method) {
            var nature = lib.groupnature[group];
            if (!nature) return '';
            if (method == 'raw') {
               return nature;
            }
            return nature + 'mm';
         },
         /**
          * 符号函数，提取数值的符号
          * @param {number} 数值
          * @returns {number} (-1|0|1)
          */
         sgn: function (num) {
            if (num > 0) return 1;
            if (num < 0) return -1;
            return 0;
         },
         rand: function (num, num2) {
            if (typeof num2 == 'number') {
               return num + Math.floor(Math.random() * (num2 - num + 1));
            }
            else {
               return Math.floor(Math.random() * num);
            }
         },
         sort: function (arr, method) {
            switch (method) {
               case 'seat': {
                  lib.tempSortSeat = arguments[2];
                  arr.sort(lib.sort.seat);
                  delete lib.tempSortSeat;
                  return arr;
               }
            }
         },
         sortSeat: function (arr, target) {
            lib.tempSortSeat = target;
            arr.sort(lib.sort.seat);
            delete lib.tempSortSeat;
            return arr;
         },
         zip: function (callback) {
            callback(new JSZip());
         },
         delayx: function (num, max) {
            if (typeof num != 'number') num = 1;
            if (typeof max != 'number') max = Infinity;
            switch (lib.config.game_speed) {
               case 'vslow': return Math.min(max, 2.5 * num);
               case 'slow': return Math.min(max, 1.5 * num);
               case 'fast': return Math.min(max, 0.7 * num);
               case 'vfast': return Math.min(max, 0.4 * num);
               case 'vvfast': return Math.min(max, 0.2 * num);
               default: return Math.min(max, num);
            }
         },
         prompt: function (skill, target, player) {
            player = player || _status.event.player;
            if (target) {
               var str = get.translation(target);
               if (target == player) {
                  str += '（你）'
               }
               return '是否对' + str + '发动『' + get.skillTranslation(skill, player) + '』？';
            }
            else {
               return '是否发动『' + get.skillTranslation(skill, player) + '』？';
            }
         },
         prompt2: function (skill, target, player) {
            var str = get.prompt.apply(this, arguments);
            if (!lib.translate[skill + '_info'] && !lib.dynamicTranslate[skill]) return str;
            return '###' + str + '###' + get.skillInfoTranslation(skill, player);
         },
         url: function (master) {
            var url = lib.config.updateURL || lib.updateURL;
            if (url[url.length - 1] != '/') {
               url += '/';
            }
            if (master != 'nodev') {
               return url + 'master/';
            }
            else {
               return url + 'v' + lib.version + '/';
            }
         },
         round: function (num, f) {
            var round = 1;
            for (var i = 0; i < f; i++) {
               round *= 10;
            }
            return Math.round(num * round) / round;
         },
         playerNumber: function () {
            var num;
            if (_status.brawl && _status.brawl.playerNumber) {
               num = _status.brawl.playerNumber
            }
            else {
               num = get.config('player_number');
            }
            return parseInt(num) || 2;
         },
         benchmark: function (func1, func2, iteration, arg) {
            var tic, toc;
            var key1, key2;
            if (!arg) arg = [];
            if (Array.isArray(func2)) {
               key1 = func2[0];
               key2 = func2[1];
            }
            else if (typeof func2 == 'string') {
               key1 = func2;
               func2 = iteration || 100;
            }
            else if (typeof func2 == 'number') {
               arg = iteration || arg;
               iteration = func2;
            }
            tic = get.utc();
            for (var i = 0; i < iteration; i++) {
               if (key1) {
                  func1[key1](arg.randomGet());
               }
               else {
                  func1(arg.randomGet());
               }
            }
            toc = get.utc();
            if (typeof func2 == 'number') {
               return toc - tic;
            }
            console.log('time1: ' + (toc - tic));
            tic = get.utc();
            for (var i = 0; i < iteration; i++) {
               if (key2) {
                  func1[key2](arg.randomGet());
               }
               else {
                  func2(arg.randomGet());
               }
            }
            toc = get.utc();
            console.log('time2: ' + (toc - tic));
         },
         stringify: function (obj, level) {
            level = level || 0;
            var indent = '';
            var str;
            for (var i = 0; i < level; i++) {
               indent += '    ';
            }
            if (get.objtype(obj) == 'object') {
               str = '{\n';
               for (var i in obj) {
                  if (/[^a-zA-Z]/.test(i)) {
                     str += indent + '    "' + i + '":' + get.stringify(obj[i], level + 1) + ',\n';
                  }
                  else {
                     str += indent + '    ' + i + ':' + get.stringify(obj[i], level + 1) + ',\n';
                  }
               }
               str += indent + '}';
               return str;
            }
            else {
               if (typeof obj == 'function') {
                  str = obj.toString();
                  str = str.replace(/\t/g, '    ');
                  var i = str.lastIndexOf('\n');
                  var num = 0;
                  for (var j = i + 1; j < str.length && str[j] == ' '; j++) {
                     num++;
                  }
                  num = Math.floor(num / 4);
                  for (i = 0; i < num - level; i++) {
                     str = str.replace(/\n    /g, '\n');
                  }
               }
               else {
                  try {
                     if (Array.isArray(obj) && obj.contains(Infinity)) {
                        obj = obj.slice(0);
                        var rand = get.id();
                        for (var i = 0; i < obj.length; i++) {
                           if (obj[i] === Infinity) {
                              obj[i] = parseInt(rand);
                           }
                        }
                        str = JSON.stringify(obj).replace(new RegExp(rand, 'g'), 'Infinity');
                     }
                     else {
                        str = JSON.stringify(obj) || '';
                     }
                  }
                  catch (e) {
                     str = '';
                  }
               }
               return str;
            }
         },
         /**
          * 浅拷贝(对象|数组)，要拷贝的对象如果是HTML元素，不做任何操作，返回原对象
          * @param {any} obj 要拷贝的对象
          * @returns {any}
          */
         copy: function (obj) {
            if (get.objtype(obj) == 'object') {
               var copy = {};
               for (var i in obj) {
                  copy[i] = get.copy(obj[i]);
               }
               return copy;
            }
            else if (Array.isArray(obj)) {
               var copy = [];
               for (var i = 0; i < obj.length; i++) {
                  copy.push(get.copy(obj[i]));
               }
               return copy;
            }
            else {
               return obj;
            }
         },
         inpilefull: function (type) {
            var list = [];
            for (var i in lib.cardPile) {
               for (var j = 0; j < lib.cardPile[i].length; j++) {
                  var info = lib.cardPile[i][j];
                  if (lib.inpile.contains(info[2]) && get.type(info[2]) == type) {
                     list.push({
                        name: info[2],
                        suit: info[0],
                        number: info[1],
                        nature: info[3]
                     });
                  }
               }
            }
            return list;
         },
         inpile: function (type, filter) {
            var list = [];
            if (filter == 'trick' || type == 'trick2') {
               if (type == 'trick2') type = 'trick'
               for (var i = 0; i < lib.inpile.length; i++) {
                  if (typeof filter == 'function' && !filter(lib.inpile[i])) continue;
                  if (get.type(lib.inpile[i], 'trick') == type) list.push(lib.inpile[i]);
               }
            }
            else {
               for (var i = 0; i < lib.inpile.length; i++) {
                  if (typeof type == 'function') {
                     if (type(lib.inpile[i])) {
                        list.push(lib.inpile[i]);
                     }
                  }
                  else {
                     if (typeof filter == 'function' && !filter(lib.inpile[i])) continue;
                     if (type.indexOf('equip') == 0 && type.length == 6) {
                        if (get.subtype(lib.inpile[i]) == type) list.push(lib.inpile[i]);
                     }
                     else {
                        if (get.type(lib.inpile[i]) == type) list.push(lib.inpile[i]);
                     }
                  }
               }
            }
            return list;
         },
         inpile2: function (type) {
            return get.inpile(type, 'trick');
         },
         typeCard: function (type, filter) {
            var list = [];
            for (var i in lib.card) {
               if (lib.card[i].mode && lib.card[i].mode.contains(get.mode()) == false) continue;
               // if(lib.card[i].vanish||lib.card[i].destroy) continue;
               if (lib.card[i].destroy) continue;
               if (typeof filter == 'function' && !filter(i)) continue;
               if (lib.config.bannedcards.contains(i)) continue;
               if (!lib.translate[i + '_info']) continue;
               if ((type.indexOf('equip') == 0 && type.length == 6) ||
                  (type.indexOf('hslingjian') == 0 && type.length == 11) ||
                  (type.indexOf('spell_') == 0)) {
                  if (get.subtype(i) == type) list.push(i);
               }
               else {
                  if (get.type(i) == type) list.push(i);
               }
            }
            return list;
         },
         libCard: function (filter) {
            var list = [];
            for (var i in lib.card) {
               if (lib.card[i].mode && lib.card[i].mode.contains(get.mode()) == false) continue;
               // if(lib.card[i].vanish||lib.card[i].destroy) continue;
               if (lib.card[i].destroy) continue;
               if (lib.config.bannedcards.contains(i)) continue;
               if (!lib.translate[i + '_info']) continue;
               if (filter(lib.card[i], i)) {
                  list.push(i);
               }
            }
            return list;
         },
         ip: function () {
            if (!require) return '';
            var interfaces = require('os').networkInterfaces();
            for (var devName in interfaces) {
               var iface = interfaces[devName];
               for (var i = 0; i < iface.length; i++) {
                  var alias = iface[i];
                  if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                     return alias.address;
                  }
               }
            }
         },
         modetrans: function (config, server) {
            if (config.mode == 'doudizhu') {
               switch (config.doudizhu_mode) {
                  case 'kaihei': return '开黑斗地主';
                  case 'huanle': return '欢乐斗地主';
                  case 'binglin': return '兵临城下';
                  case 'online': return '智斗三国';
                  default: return '休闲' + (config.double_character ? '双将' : '') + '斗地主';
               }
            }
            if (config.mode == 'longlaoguan') return '龙牢关';
            if (config.mode == 'versus') {
               switch (config.versus_mode) {
                  case '1v1': return '单人对决';
                  case '2v2': return '欢乐成双';
                  case '3v3': return '血战到底';
                  case '4v4': return '四人对决';
                  case 'guandu': return '官渡之战';
               }
            }
            else if (config.mode == 'single') {
               switch (config.single_mode) {
                  case 'normal': return '新1v1';
                  case 'changban': return '血战长坂坡';
                  case 'dianjiang': return '点将单挑';
               }
            }
            else if (config.mode == 'identity') {
               switch (config.identity_mode) {
                  case 'purple': return '三对三对二';
                  case 'zhong': return (config.double_character ? '双将' : '') + '忠胆英杰';
                  default: return get.cnNumber(parseInt(config.number)) + '人' + (config.double_character ? '双将' : '') + '身份';
               }
            }
            else if (config.mode == 'guozhan' && config.guozhan_mode != 'normal') {
               switch (config.guozhan_mode) {
                  case 'yingbian': return '应变国战';
                  case 'old': return '怀旧国战';
               }
            }
            else {
               if (server) {
                  return get.translation(config.mode) + '模式';
               }
               else {
                  return get.cnNumber(parseInt(config.number)) + '人' + get.translation(config.mode);
               }
            }
         },
         charactersOL: function (func) {
            var list = [];
            var libCharacter = {};
            for (var i = 0; i < lib.configOL.characterPack.length; i++) {
               var pack = lib.characterPack[lib.configOL.characterPack[i]];
               for (var j in pack) {
                  if (typeof func == 'function' && func(j)) continue;
                  if (lib.connectBanned.contains(j)) continue;
                  if (lib.configOL.protect_beginner && get.is.banForBeginner(i)) return true;
                  if (lib.character[j]) libCharacter[j] = pack[j];
               }
            }
            for (i in libCharacter) {
               if (lib.filter.characterDisabled(i, libCharacter)) continue;
               list.push(i);
            }
            return list;
         },
         trimip: function (str) {
            var len = str.length - 5;
            if (str.lastIndexOf(':8080') == len) {
               str = str.slice(0, len);
            }
            return str;
         },
         /**
          * 返回游戏的当前模式
          * @returns {!string}
          */
         mode: function () {
            if (_status.connectMode) {
               return lib.configOL.mode;
            }
            else {
               return lib.config.mode;
            }
         },
         idDialog: function (id) {
            for (var i = 0; i < ui.dialogs.length; i++) {
               if (ui.dialogs[i].videoId == id) {
                  return ui.dialogs[i];
               }
            }
            return null;
         },
         arenaState: function () {
            var state = {
               number: ui.arena.dataset.number,
               players: {},
               mode: _status.mode,
               dying: _status.dying,
               servermode: window.isNonameServer,
               roomId: game.roomId,
               over: _status.over,
               inpile: lib.inpile,
               cardtag: _status.cardtag,
            };
            for (var i in lib.playerOL) {
               state.players[i] = lib.playerOL[i].getState();
            }
            return state;
         },
         skillState: function (player) {
            var skills = {
               global: lib.skill.global
            };
            var skillinfo = {};
            for (var i in lib.playerOL) {
               skills[i] = {
                  skills: lib.playerOL[i].skills,
                  hiddenSkills: lib.playerOL[i].hiddenSkills,
                  additionalSkills: lib.playerOL[i].additionalSkills,
                  disabledSkills: lib.playerOL[i].disabledSkills,
                  tempSkills: lib.playerOL[i].tempSkills,
                  storage: lib.playerOL[i].storage,
               }
            }
            for (var i in lib.skill) {
               if (lib.skill[i].chooseButton && lib.skill[i].enable) {
                  skillinfo[i] = lib.skill[i].chooseButton;
               }
            }
            skills.skillinfo = skillinfo;
            if (player) {
               skills.stat = player.getStat();
            }
            return skills;
         },
         /**
          * 通过随机数生成Id
          * @returns {!number} ID
          */
         id: function () {
            return (Math.floor(1000000 + 9000000 * Math.random())).toString() + (10 + lib.status.globalId++);
         },
         zhu: function (player, skill, unseen) {
            if (typeof player == 'string') {
               skill = player;
               player = null;
            }
            var mode = get.mode();
            if (mode == 'identity') {
               if (_status.mode == 'purple') {
                  if (!player) return null;
                  var zhu = game[player.identity.slice(0, 1) + 'Zhu'];
                  if (!zhu) return null;
                  if (skill && !zhu.hasSkill(skill)) return null;
                  return zhu;
               }
               if (!game.zhu) return null;
               if (skill && !game.zhu.hasSkill(skill)) return null;
               if (game.zhu.isZhu) return game.zhu;
            }
            else if (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu')) {
               for (var i = 0; i < game.players.length; i++) {
                  if (game.players[i].isZhu) {
                     if (skill && !(game.players[i].hasSkill(skill))) continue;
                     if (!player) return game.players[i];
                     if (player.side == game.players[i].side) {
                        return game.players[i];
                     }
                  }
               }
            }
            else if (mode == 'guozhan') {
               for (var i = 0; i < game.players.length; i++) {
                  if (get.is.jun(game.players[i]) && !game.players[i].isUnseen()) {
                     if (skill && !game.players[i].hasSkill(skill)) continue;
                     if (!player) return game.players[i];
                     if (player.identity == game.players[i].identity) {
                        return game.players[i];
                     }
                     else if (unseen && player._group == game.players[i].identity) {
                        return game.players[i];
                     }
                  }
               }
            }
            return null;
         },
         config: function (item, mode) {
            mode = mode || lib.config.mode;
            if (!lib.config.mode_config[mode]) return;
            return lib.config.mode_config[mode][item];
         },
         coinCoeff: function (list) {
            var num = 0;
            for (var i = 0; i < list.length; i++) {
               var rank = get.rank(list[i]);
               switch (rank) {
                  case 'sp': return 0.1;
                  case 's': num += 0.4; break;
                  case 'ap': num += 0.6; break;
                  case 'a': num += 0.8; break;
                  case 'am': num += 0.95; break;
                  case 'bp': num += 1.05; break;
                  case 'b': num += 1.2; break;
                  case 'bm': num += 1.4; break;
                  case 'c': num += 1.6; break;
                  case 'd': num += 1.8; break;
               }
            }
            return num / list.length;
         },
         rank: function (name, num) {
            if (typeof name == 'object' && name.name) {
               name = name.name;
            }
            if (num == true) num = 9;
            if (typeof num != 'number') num = false;
            if (name == _status.lord) return num ? Math.round(7 * (num - 1) / 8 + 1) : 'ap';
            var rank = lib.rank;
            if (lib.characterPack.clubs[name] || lib.characterPack.vtuber[name] || lib.characterPack.yuzu[name] || lib.characterPack.hololive[name] || lib.characterPack.nijisanji[name]) {
               var skills;
               if (lib.character[name]) {
                  skills = lib.character[name][3];
               }
               else {
                  var tmpinfo = get.character(name);
                  if (tmpinfo) {
                     skills = tmpinfo[3];
                  }
                  else {
                     skills = [];
                  }
               }
               for (var i = 0; i < skills.length; i++) {
                  if (skills[i].alter && !lib.config.vintageSkills.contains(skills[i])) {
                     name = lib.rank.a[0]; break;
                  }
               }
            }
            if (rank.s.contains(name)) return num ? Math.round(8 * (num - 1) / 8 + 1) : 's';
            if (rank.ap.contains(name)) return num ? Math.round(7 * (num - 1) / 8 + 1) : 'ap';
            if (rank.a.contains(name)) return num ? Math.round(6 * (num - 1) / 8 + 1) : 'a';
            if (rank.am.contains(name)) return num ? Math.round(5 * (num - 1) / 8 + 1) : 'am';
            if (rank.bp.contains(name)) return num ? Math.round(4 * (num - 1) / 8 + 1) : 'bp';
            if (rank.b.contains(name)) return num ? Math.round(3 * (num - 1) / 8 + 1) : 'b';
            if (rank.bm.contains(name)) return num ? Math.round(2 * (num - 1) / 8 + 1) : 'bm';
            if (rank.c.contains(name)) return num ? Math.round(1 * (num - 1) / 8 + 1) : 'c';
            if (rank.d.contains(name)) return num ? Math.round(0 * (num - 1) / 8 + 1) : 'd';
            if (lib.character[name] && lib.character[name][4]) {
               if (lib.character[name][4].contains('boss') ||
                  lib.character[name][4].contains('bossallowed') ||
                  lib.character[name][4].contains('hiddenboss')) {
                  return num ? Math.round(9 * (num - 1) / 8 + 1) : 'sp';
               }
            }
            return num ? Math.round(9 * (num - 1) / 8 + 1) : 'x';
         },
         skillRank: function (skill, type, grouped) {
            var info = lib.skill[skill];
            var player = _status.event.skillRankPlayer || _status.event.player;
            if (!info) return 0;
            if (info.ai) {
               if (info.ai.halfneg) return 0;
               if (typeof info.ai.combo == 'string' && player && !player.hasSkill(info.ai.combo)) {
                  return 0;
               }
               if (info.ai.neg) return -1;
            }
            var num = 1;
            var threaten = 1;
            if (info.ai && info.ai.threaten) {
               if (typeof info.ai.threaten == 'number') {
                  threaten = info.ai.threaten;
               }
               else if (typeof info.ai.threaten == 'function' && player) {
                  threaten = info.ai.threaten(player, player);
               }
            }
            if (type == 'in') {
               if (info.enable == 'phaseUse') num += 0.5;
               if (info.trigger && info.trigger.player) {
                  var list = Array.isArray(info.trigger.player) ? info.trigger.player : [info.trigger.player];
                  var add = false;
                  for (var i of list) {
                     for (var j of lib.phaseName) {
                        if (i.indexOf[j] == 0) {
                           num += 0.5;
                           add = true;
                           break;
                        }
                     }
                     if (add) break;
                  }
               }
               if (info.trigger && ((typeof info.trigger.player == 'string' && info.trigger.player.indexOf('use') == 0) || info.trigger.source)) {
                  num += 0.3;
               }
               if (num > 1 && threaten > 1) {
                  num += Math.sqrt(threaten) - 1;
               }
            }
            else if (type == 'out') {
               if (threaten < 1) {
                  num = 1 / Math.sqrt(threaten);
               }
               if (info.trigger && (info.trigger.global || info.trigger.target || (typeof info.trigger.player == 'string' &&
                  (info.trigger.player.indexOf('damage') == 0 || info.trigger.player.indexOf('lose') == 0)))) num += 0.1;
               if (info.ai) {
                  if (info.ai.maixie || info.ai.maixie_hp || info.ai.maixie_defend) {
                     num += 0.5;
                  }
                  if (info.ai.nolose || info.ai.noh || info.ai.noe || info.ai.nodiscard) {
                     num += 0.3;
                  }
               }
            }
            if (!grouped) {
               var groups = game.expandSkills([skill]);
               groups.remove(skill);
               var ggt = [];
               for (var i = 0; i < groups.length; i++) {
                  var gi = get.skillRank(groups[i], type, true);
                  if (gi < 0) {
                     num -= 0.5;
                  }
                  else if (gi > 1) {
                     ggt.push(gi);
                  }
               }
               if (ggt.length) {
                  num += Math.max.apply(this, ggt) - 1 + ggt.length / 20;
               }
            }
            return num;
         },
         targetsInfo: function (targets) {
            var info = [];
            for (var i = 0; i < targets.length; i++) {
               info.push(targets[i].dataset.position);
            }
            return info;
         },
         infoTargets: function (info) {
            var targets = [];
            for (var i = 0; i < info.length; i++) {
               targets.push(game.playerMap[info[i]]);
            }
            return targets;
         },
         cardInfo: function (card) {
            if (card.specialEffects) return [card.suit, card.number, card.name, card.nature, card.tags, card.specialEffects];
            else return [card.suit, card.number, card.name, card.nature, card.tags];
         },
         cardsInfo: function (cards) {
            var info = [];
            for (var i = 0; i < cards.length; i++) {
               info.push(get.cardInfo(cards[i]));
            }
            return info;
         },
         infoCard: function (info) {
            var card = ui.create.card();
            if (info[0]) {
               card.init(info);
            }
            return card;
         },
         infoCards: function (info) {
            var cards = [];
            for (var i = 0; i < info.length; i++) {
               cards.push(get.infoCard(info[i]));
            }
            return cards;
         },
         cardInfoOL: function (card) {
            return '_noname_card:' + JSON.stringify([card.cardid, card.suit, card.number, card.name, card.nature, card.tags, card.specialEffects]);
         },
         infoCardOL: function (info) {
            if (!lib.cardOL) return info;
            var card;
            try {
               var info = JSON.parse(info.slice(13));
               var id = info.shift();
               if (!id) {
                  card = ui.create.card();
                  if (info && info[2]) card.init(info);
               }
               else if (lib.cardOL[id]) {
                  if (lib.cardOL[id].name != info[2]) {
                     if (info && info[2]) lib.cardOL[id].init(info);
                  }
                  if (lib.cardOL[id].specialEffects != info[5]) {
                     if (info && info[2]) lib.cardOL[id].init(info);
                  }
                  card = lib.cardOL[id];
               }
               else if (game.online) {
                  card = ui.create.card();
                  card.cardid = id;
                  if (info && info[2]) card.init(info);
                  lib.cardOL[id] = card;
               }
            }
            catch (e) {
               console.log(e);
            }
            return card || info;
         },
         cardsInfoOL: function (cards) {
            var info = [];
            for (var i = 0; i < cards.length; i++) {
               info.push(get.cardInfoOL(cards[i]));
            }
            return info;
         },
         infoCardsOL: function (info) {
            var cards = [];
            for (var i = 0; i < info.length; i++) {
               cards.push(get.infoCardOL(info[i]));
            }
            return cards;
         },
         playerInfoOL: function (player) {
            return '_noname_player:' + player.playerid;
         },
         infoPlayerOL: function (info) {
            if (!lib.playerOL) return info
            return lib.playerOL[info.slice(15)] || info;
         },
         playersInfoOL: function (players) {
            var info = [];
            for (var i = 0; i < players.length; i++) {
               info.push(get.playerInfoOL(players[i]));
            }
            return info;
         },
         infoPlayersOL: function (info) {
            var players = [];
            for (var i = 0; i < info.length; i++) {
               players.push(get.infoPlayerOL(info[i]));
            }
            return players;
         },
         funcInfoOL: function (func) {
            if (typeof func == 'function') {
               if (func._filter_args) {
                  return `_noname_func:${JSON.stringify(get.stringifiedResult(func._filter_args, 3))}`;
               }
               let str = func.toString()
               return `_noname_func:${str.slice(str.indexOf('('))}`;
            }
            return '';
         },
         infoFuncOL: function (info) {
            var func;
            try {
               eval(`func=(function${info.slice(13)});`);
            }
            catch (e) {
               return function () { };
            }
            if (Array.isArray(func)) {
               func = get.filter.apply(this, get.parsedResult(func));
            }
            return func;
         },
         eventInfoOL: function (item, level) {
            if (Object.prototype.toString.call(item) == '[object Object]') {
               var item2 = {};
               for (var i in item) {
                  if (i == '_trigger') {
                     if (level !== false) item2[i] = get.eventInfoOL(item[i], false);
                  }
                  else if (lib.element.event[i] || i == 'content' || get.itemtype(item[i]) == 'event') continue;
                  else item2[i] = get.stringifiedResult(item[i], level - 1);
               }
               return '_noname_event:' + JSON.stringify(item2);
            }
            else {
               return '';
            }
         },
         infoEventOL: function (item) {
            var evt;
            try {
               evt = JSON.parse(item.slice(14));
               for (var i in evt) {
                  evt[i] = get.parsedResult(evt[i]);
               }
               for (var i in lib.element.event) evt[i] = lib.element.event[i];
            }
            catch (e) {
               console.log(e);
            }
            return evt || item;
         },
         stringifiedResult: function (item, level) {
            if (!item) return item;
            if (typeof item == 'function') {
               return get.funcInfoOL(item);
            }
            else if (typeof item == 'object') {
               switch (get.itemtype(item)) {
                  case 'card': return get.cardInfoOL(item);
                  case 'cards': return get.cardsInfoOL(item);
                  case 'player': return get.playerInfoOL(item);
                  case 'players': return get.playersInfoOL(item);
                  case 'event': return get.eventInfoOL(item);
                  default:
                     if (typeof level != 'number') {
                        level = 5;
                     }
                     if (Array.isArray(item)) {
                        if (level == 0) {
                           return [];
                        }
                        var item2 = [];
                        for (var i = 0; i < item.length; i++) {
                           item2.push(get.stringifiedResult(item[i], level - 1));
                        }
                        return item2;
                     }
                     else if (Object.prototype.toString.call(item) == '[object Object]') {
                        if (level == 0) {
                           return {};
                        }
                        var item2 = {};
                        for (var i in item) {
                           item2[i] = get.stringifiedResult(item[i], level - 1);
                        }
                        return item2;
                     }
                     else {
                        return {};
                     }
               }
            }
            else if (item === Infinity) {
               return '_noname_infinity';
            }
            else {
               return item;
            }
         },
         parsedResult: function (item) {
            if (!item) return item;
            if (typeof item == 'string') {
               if (item.indexOf('_noname_func:') == 0) {
                  return get.infoFuncOL(item);
               }
               else if (item.indexOf('_noname_card:') == 0) {
                  return get.infoCardOL(item);
               }
               else if (item.indexOf('_noname_player:') == 0) {
                  return get.infoPlayerOL(item);
               }
               else if (item.indexOf('_noname_event:') == 0) {
                  return get.infoEventOL(item);
               }
               else if (item == '_noname_infinity') {
                  return Infinity;
               }
               else {
                  return item;
               }
            }
            else if (Array.isArray(item)) {
               var item2 = [];
               for (var i = 0; i < item.length; i++) {
                  item2.push(get.parsedResult(item[i]));
               }
               return item2;
            }
            else if (typeof item == 'object') {
               var item2 = {};
               for (var i in item) {
                  item2[i] = get.parsedResult(item[i]);
               }
               return item2;
            }
            else {
               return item;
            }
         },
         /**
          * 字符串垂直化
          * 实际是通过加`<br>`标签实现垂直化
          * @function
          * @param {?string} 原字符串
          * @param {?boolean} sp 'SP'字符是否连接，如果为true，表示'S'和'P'在同一行，否则分割
          * @returns {!string} 垂直化后的字符串
          * @example
          * get.verticalStr('Hello sP')
          * //result:
          * //"H<br>E<br>L<br>L<br>O<br> <br>S<br>P"
          * get.verticalStr('Hello sP', true)
          * //result:
          * //"H<br>E<br>L<br>L<br>O<br> <br>SP"
          * get.verticalStr('`He`llo sP')
          * //result:
          * //"HEL<br>L<br>O<br> <br>S<br>P"
          */
         verticalStr: function (str, sp) {
            if (typeof str != 'string') return '';
            str = str.toUpperCase();
            var str2 = '';
            var nobreak = false;
            for (var i = 0; i < str.length; i++) {
               if (str[i] == '`') {
                  nobreak = !nobreak; continue;
               }
               if (str.slice(i, i + 4) == '<BR>') { i += 3; continue; }
               str2 += str[i];
               if (nobreak) continue;
               if (sp && str[i] == 'S' && str[i + 1] == 'P') continue;
               if (/[0-9]/.test(str[i]) && /[0-9]/.test(str[i + 1])) continue;
               if (i < str.length - 1) {
                  str2 += '<br>';
               }
            }
            return str2;
         },
         numStr: function (num, method) {
            if (num == Infinity) {
               if (method == 'card') return get.selectableCards().length + ui.selected.cards.length;
               if (method == 'target') return get.selectableTargets().length + ui.selected.targets.length;
               return '∞';
            }
            return num.toString();
         },
         rawName: function (str) {
            if (lib.translate[str + '_ab']) return lib.translate[str + '_ab'];
            var str2 = lib.translate[str];
            if (!str2) return '';
            if (str2.indexOf('SP') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('TW') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('OL') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('JSP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('☆SP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('手杀') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('界') == 0 && lib.characterPack.refresh && lib.characterPack.refresh[str]) {
               str2 = str2.slice(1);
            }
            else if (str2.indexOf('旧') == 0 && (lib.characterPack.old || lib.characterPack.mobile) && (lib.characterPack.old[str] || lib.characterPack.mobile[str])) {
               str2 = str2.slice(1);
            }
            else if (str2.indexOf('新·') == 0 && str.indexOf('re_') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('新') == 0 && (str.indexOf('re_') == 0 || str.indexOf('new_') == 0)) {
               str2 = str2.slice(1);
            }
            return str2;
         },
         rawName2: function (str) {
            if (lib.translate[str + '_ab']) return lib.translate[str + '_ab'];
            var str2 = lib.translate[str];
            if (!str2) return '';
            if (str2.indexOf('SP') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('TW') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('OL') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('JSP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('☆SP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('手杀') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('新·') == 0 && str.indexOf('re_') == 0) {
               str2 = str2.slice(2);
            }
            return str2;
         },
         slimName: function (str) {
            var str2 = lib.translate[str];
            if (lib.translate[str + '_ab']) str2 = lib.translate[str + '_ab'];
            if (!str2) return '';
            if (str2.indexOf('SP') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('TW') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('OL') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('JSP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('☆SP') == 0) {
               str2 = str2.slice(3);
            }
            else if (str2.indexOf('手杀') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('新·') == 0 && str.indexOf('re_') == 0) {
               str2 = str2.slice(2);
            }
            else if (str2.indexOf('皇·') == 0 && str.indexOf('sp_') == 0) {
               str2 = str2.replace('皇·', '皇');
            }
            else if (str2.indexOf('海·') == 0 && str.indexOf('sea_') == 0) {
               str2 = str2.replace('海·', '海');
            }
            else if (str2.indexOf('国战') == 0 && lib.config.mode == 'guozhan' && str.indexOf('gz_') == 0) {
               str2 = str2.slice(2);
            }
            return get.verticalStr(str2, true);
         },
         time: function () {
            if (lib.status.dateDelaying) {
               return lib.getUTC(lib.status.dateDelaying) - lib.getUTC(lib.status.date) - lib.status.dateDelayed;
            }
            else {
               return lib.getUTC(new Date()) - lib.getUTC(lib.status.date) - lib.status.dateDelayed;
            }
         },
         /**
          * 返回当前的datetime(`new Date().getTime()`)
          * @returns {number} datetime
          */
         utc: function () {
            return (new Date()).getTime();
         },
         evtDistance: function (e1, e2) {
            var dx = (e1.clientX - e2.clientX) / game.documentZoom;
            var dy = (e1.clientY - e2.clientY) / game.documentZoom;
            return Math.sqrt(dx * dx + dy * dy);
         },
         xyDistance: function (from, to) {
            return Math.sqrt((from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]));
         },
         /**
          * 判断对象物品类型(字符串(区域名|属性名)，玩家及玩家组，卡牌及卡牌组，选择范围，元素坐标，按钮，弹窗，事件)
          * @param {Object} obj 要判断物品类型的对象
          * @returns {?string} 对象的物品类型
          */
         itemtype: function (obj) {
            var i, j;
            if (typeof obj == 'string') {
               if (obj.length <= 4) {
                  var bool = true;
                  for (i = 0; i < obj.length; i++) {
                     if (/h|e|j|s/.test(obj[i]) == false) {
                        bool = false; break;
                     }
                  }
                  if (bool) return 'position';
               }
               if (lib.nature.contains(obj)) return 'nature';
            }
            if (Array.isArray(obj) && obj.length) {
               var isPlayers = true;
               for (i = 0; i < obj.length; i++) {
                  if (get.itemtype(obj[i]) != 'player') { isPlayers = false; break; }
               }
               if (isPlayers) return 'players';

               var isCards = true;
               for (i = 0; i < obj.length; i++) {
                  if (get.itemtype(obj[i]) != 'card') { isCards = false; break; }
               }
               if (isCards) return 'cards';

               if (obj.length == 2) {
                  if (typeof obj[0] == 'number' && typeof obj[1] == 'number') {
                     if (obj[0] <= obj[1] || obj[1] == -1) return 'select';
                  }
               }

               if (obj.length == 4) {
                  var isPosition = true;
                  for (i = 0; i < obj.length; i++) {
                     if (typeof obj[i] != 'number') { isPosition = false; break; }
                  }
                  if (isPosition) return 'divposition';
               }
            }
            if (get.objtype(obj) == 'div') {
               if (obj.classList.contains('button')) return 'button';
               if (obj.classList.contains('card')) return 'card';
               if (obj.classList.contains('player')) return 'player';
               if (obj.classList.contains('dialog')) return 'dialog';
            }
            if (get.is.object(obj)) {
               if (obj.isMine == lib.element.event.isMine) return 'event';
            }
         },
         equipNum: function (card) {
            if (get.type(card) == 'equip') {
               return parseInt(get.subtype(card)[5]);
            }
            return 0;
         },
         /**
          * 判断对象类型(数组，Object对象，Div元素，Table元素，TableRow元素，TableCell元素，Body元素)
          * @param {Object} obj 要判断类型的对象
          * @returns {?string} 对象的类型
          */
         objtype: function (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') return 'array';
            if (Object.prototype.toString.call(obj) === '[object Object]') return 'object';
            if (Object.prototype.toString.call(obj) === '[object HTMLDivElement]') return 'div';
            if (Object.prototype.toString.call(obj) === '[object HTMLTableElement]') return 'table';
            if (Object.prototype.toString.call(obj) === '[object HTMLTableRowElement]') return 'tr';
            if (Object.prototype.toString.call(obj) === '[object HTMLTableCellElement]') return 'td';
            if (Object.prototype.toString.call(obj) === '[object HTMLBodyElement]') return 'td';
         },
         type: function (obj, method, player) {
            if (typeof obj == 'string') obj = { name: obj };
            if (typeof obj != 'object') return;
            var name = get.name(obj, player);
            if (!lib.card[name]) return;
            if (method == 'trick' && lib.card[name].type == 'delay') return 'trick';
            return lib.card[name].type;
         },
         type2: function (card, player) {
            return get.type(card, 'trick', player);
         },
         //新增函数
         type3: function (cards, method, player) {
            if (get.itemtype(cards) != 'cards') return;
            var types = [];
            for (let i of cards) {
               types.add(get.type(i, method, player));
            }
            return types;
         },
         subtype: function (obj) {
            if (typeof obj == 'string') obj = { name: obj };
            if (typeof obj != 'object') return;
            if (!lib.card[obj.name]) return;
            return lib.card[obj.name].subtype;
         },
         equiptype: function (card, player) {
            var subtype = get.subtype(card, player);
            if (subtype.indexOf('equip') == 0) return parseInt(subtype[5]);
            return 0;
         },
         /**
          * 返回手牌牌名
          * @name get.name
          * @function
          * @param {!GameCores.GameObjects.Card} card 卡牌对象
          * @param {boolean} [isCheckMod=true] 是否检测被动技，如果为true，手牌持有者有被动技**cardname**改变牌名，则返回改变后的牌名；如果为false，直接返回牌名
          * @returns {?string} 牌名
          */
         /**
          * 返回游戏牌对象的牌名
          * @name get.name
          * @function
          * @variation 2
          * @param {!GameCores.GameObjects.Card} card 卡牌对象
          * @param {(GameCores.GameObjects.Player|false)} player 如果为角色对象，当角色有被动技**cardname**改变牌名，返回改变后的牌名；如果为false，直接返回牌名
          * @returns {string} 牌名
          */
         name: function (card, player) {
            if (get.itemtype(player) == 'player' || (player !== false && get.position(card) == 'h')) {
               var owner = player || get.owner(card);
               if (owner) {
                  return game.checkMod(card, owner, card.name, 'cardname', owner);
               }
            }
            return card.name;
         },
         suit: function (card, player) {
            if (get.itemtype(card) == 'cards') {
               if (card.length == 1) return get.suit(card[0], player);
               return 'none';
               //var suit=get.suit(card[0])
               //for(var i=1;i<card.length;i++){
               //    if(get.suit(card[i])!=suit) return 'none';
               //}
               //return suit;
            }
            else if (get.itemtype(card.cards) == 'cards' && card.suit != 'none' && !lib.suit.contains(card.suit)) {
               return get.suit(card.cards, player);
            }
            else {
               var owner = player || get.owner(card);
               if (owner) {
                  return game.checkMod(card, card.suit, 'suit', owner);
               }
               return card.suit;
            }
         },
         suit3: function (cards, player) {
            if (get.itemtype(cards) != 'cards') return [];
            var suits = [];
            for (var i of cards) {
               suits.add(get.suit(i, player));
            }
            return suits;
         },
         color: function (card, player) {
            if (_status.event.name == 'judge' && card.color) return card.color;
            if (get.itemtype(card) == 'cards') {
               var color = get.color(card[0], player)
               for (var i = 1; i < card.length; i++) {
                  if (get.color(card[i], player) != color) return 'none';
               }
               return color;
            }
            else if (get.itemtype(card.cards) == 'cards' && card.suit != 'none' && !lib.suit.contains(card.suit)) {
               return get.color(card.cards, player);
            }
            else {
               //柚子：已修改
               var color = 'none'
               if (get.suit(card, player) == 'spade' || get.suit(card, player) == 'club') color = 'black';
               if (get.suit(card, player) == 'heart' || get.suit(card, player) == 'diamond') color = 'red';
               var owner = player || get.owner(card);
               if (owner) {
                  return game.checkMod(card, owner, color, 'color', owner);
               }
               return color;
            }
         },
         color3: function (cards, player) {
            if (get.itemtype(cards) != 'cards') return;
            var colors = [];
            for (var i of cards) {
               colors.add(get.color(i, player));
            }
            return colors;
         },
         number: function (card, player) {
            //柚子：已修改
            var number = null;
            if (card.number && typeof card.number == 'number') number = card.number;
            else if (card.cards && card.cards.length == 1) number = get.number(card.cards[0]);
            if (number != null && get.itemtype(player) == 'player' || (player !== false && get.position(card) == 'h')) {
               var owner = player || get.owner(card);
               if (owner) {
                  return game.checkMod(card, owner, number, 'number', owner);
               }
            }
            return number;
         },
         /**
          * 一个角色查看一张牌的属性，并返回结果；
          * 如果角色有被动技`cardnature`，属性为改变后的值
          * @param {!GameCores.GameObjects.Card} card 被查看的牌
          * @param {(GameCores.GameObjects.Player|false|undefined)} [player] 要查看的角色，如果未指定，使用被查看牌的所属角色，如果所属角色未定义或这个参数为false，直接返回牌的属性；
          * @returns {string}
          */
         nature: function (card, player) {
            if (get.itemtype(player) == 'player' || player !== false) {
               var owner = get.owner(card);
               if (owner) {
                  return game.checkMod(card, owner, card.nature, 'cardnature', owner);
               }
            }
            return card.nature;
         },
         /**
          * 从牌堆顶抽取指定数量的游戏牌
          * 如果牌堆没有牌，游戏直接平局
          * @param {number} num 要抽的牌数
          * @returns {!Array<GameCores.GameObjects.Card>}
          */
         cards: function (num) {
            if (_status.waitingForCards) {
               ui.create.cards.apply(ui.create, _status.waitingForCards);
               delete _status.waitingForCards;
            }
            var list = [];
            var card = false;
            if (typeof num != 'number') num = 1;
            if (num == 0) { card = true; num = 1; }
            if (num < 0) num = 1;
            while (num--) {
               if (ui.cardPile.hasChildNodes() == false) {
                  if (_status.maxShuffle != undefined) {
                     if (_status.maxShuffle == 0) {
                        if (_status.maxShuffleCheck) {
                           game.over(_status.maxShuffleCheck());
                        }
                        else {
                           game.over('平局');
                        }
                        return [];
                     }
                     _status.maxShuffle--;
                  }
                  game.shuffleNumber++;
                  var cards = [], i;
                  for (var i = 0; i < lib.onwash.length; i++) {
                     if (lib.onwash[i]() == 'remove') {
                        lib.onwash.splice(i--, 1);
                     }
                  }
                  if (_status.discarded) {
                     _status.discarded.length = 0;
                  }
                  for (i = 0; i < ui.discardPile.childNodes.length; i++) {
                     var currentcard = ui.discardPile.childNodes[i];
                     currentcard.vanishtag.length = 0;
                     if (get.info(currentcard).vanish || currentcard.storage.vanish) {
                        currentcard.remove();
                        continue;
                     }
                     cards.push(currentcard);
                  }
                  cards.randomSort();
                  for (var i = 0; i < cards.length; i++) {
                     ui.cardPile.appendChild(cards[i]);
                  }
               }
               if (ui.cardPile.hasChildNodes() == false) {
                  game.over('平局');
                  return [];
               }
               var cardx = ui.cardPile.removeChild(ui.cardPile.firstChild);
               cardx.original = 'c';
               list.push(cardx);
            }
            game.updateRoundNumber();
            if (card) return list[0];
            return list;
         },
         /**
          * 返回`info.judge`，如果这张牌可视为其他牌(`viewAs`)，返回视为牌的`info.judge`
          * @param {GameCores.GameObjects.Card} card 游戏牌，除牌名外其他属性和函数可以为空
          * @returns {string}
          */
         judge: function (card) {
            if (card.viewAs) return lib.card[card.viewAs].judge;
            return get.info(card).judge;
         },
         /**
          * 返回两个角色之间的距离；
          * 如果目标角色就是参考角色，即这个角色到自己的距离，不计算任何技能和装备效果，直接返回0；
          * 除此之外，根据`method`参数返回距离，详情见下表:
          * `method`参数表:
          * **Chess Mode:**
          * 
          * |method|type|
          * |:----:|:--:|
          * |undefined|计算距离，此距离计算被动技和装备的效果|
          * |raw, pure, absolute|原距离，不计算被动技和装备的效果|
          * **Stone Mode:**
          * 
          * |method|type|
          * |:----:|:--:|
          * |undefined|计算距离，此距离计算被动技和装备的效果|
          * |raw, pure, absolute|原距离，1|
          * **Others:**
          * 
          * |method|type|
          * |:----:|:--:|
          * |undefined|计算距离，此距离计算[^被动技]和装备的效果|
          * |raw, pure|原距离，不计算被动技和装备的效果|
          * |absolute|右手(逆时针)距离，不计算被动技和装备的效果|
          * |attack|攻击距离，此距离计算被动技和装备的效果|
          * **原距离** 一名角色与其他角色的距离最小为1；如果是到自己的距离，为0
          * **被动技** 如果参考角色`from`有被动技**globalFrom**，计算被动技效果，然后如果目标角色`to`有被动技**globalTo**，计算被动技效果，结果作为计算距离；之后如果参考角色`from`有被动技**attackFrom**, 目标角色`to`有被动技**attackTo**，同理，继续依次计算`from`和`to`的被动技效果，结果作为攻击距离；不计算被动技时，攻击距离等于计算距离；被动技效果计算完成后，继续计算角色的装备效果(如果有装备)
          * @param {!GameCores.GameObjects.Player} from 参考角色
          * @param {!GameCores.GameObjects.Player} to 目标角色
          * @param {?string} method 见method参数表
          * @returns {number} 如果`from`或`to`不在游戏中或未指定，返回`Infinity`；如果`from==to`，返回0
          */
         distance: function (from, to, method) {
            if (from == to) return 0;
            if (!game.players.contains(from) && !game.dead.contains(from)) return Infinity;
            if (!game.players.contains(to) && !game.dead.contains(to)) return Infinity;
            var player = from, m, n = 1, i;
            var fxy, txy;
            if (game.chess) {
               fxy = from.getXY();
               txy = to.getXY();
               n = Math.abs(fxy[0] - txy[0]) + Math.abs(fxy[1] - txy[1]);
               if (method == 'raw' || method == 'pure' || method == 'absolute') return n;
            }
            else if (to.isMin(true) || from.isMin(true)) {
               if (method == 'raw' || method == 'pure' || method == 'absolute') return n;
            }
            else {
               var length = game.players.length;
               var totalPopulation = game.players.length + game.dead.length + 1;
               for (var iwhile = 0; iwhile < totalPopulation; iwhile++) {
                  if (player.nextSeat != to) {
                     player = player.nextSeat;
                     if (player.isAlive() && !player.isOut() && !player.hasSkill('undist') && !player.isMin(true)) n++;
                  }
                  else {
                     break;
                  }
               }
               for (i = 0; i < game.players.length; i++) {
                  if (game.players[i].isOut() || game.players[i].hasSkill('undist') || game.players[i].isMin(true)) length--;
               }
               if (method == 'absolute') return n;
               if (from.isDead()) length++;
               if (to.isDead()) length++;
               var left = from.hasSkillTag('left_hand');
               var right = from.hasSkillTag('right_hand');
               if (left === right) n = Math.min(n, length - n);
               else if (left == true) n = length - n;
               if (method == 'raw' || method == 'pure') return n;
            }

            n = game.checkMod(from, to, n, 'globalFrom', from);
            n = game.checkMod(from, to, n, 'globalTo', to);
            m = n;
            m = game.checkMod(from, to, m, 'attackFrom', from);
            m = game.checkMod(from, to, m, 'attackTo', to);
            var equips1 = from.getCards('e', function (card) {
               return !ui.selected.cards || !ui.selected.cards.contains(card);
            }), equips2 = to.getCards('e', function (card) {
               return !ui.selected.cards || !ui.selected.cards.contains(card);
            });
            for (i = 0; i < equips1.length; i++) {
               var info = get.info(equips1[i]).distance;
               if (!info) continue;
               if (info.globalFrom) {
                  m += info.globalFrom;
                  n += info.globalFrom;
               }
               if (info.attackFrom) {
                  m += info.attackFrom;
               }
            }
            for (i = 0; i < equips2.length; i++) {
               var info = get.info(equips2[i]).distance;
               if (!info) continue;
               if (info.globalTo) {
                  m += info.globalTo;
                  n += info.globalTo;
               }
               if (info.attaclTo) {//[recommend][bug] use attackTo instead of attaclTo
                  m += info.attaclTo;
               }
            }
            if (method == 'attack') return m;
            return n;
         },
         /**
          * 返回技能模板
          * @name get.info
          * @function
          * @param {?string} item 技能ID，如果未定义，返回undefined
          * @returns {?GameCores.GameObjects.SkillInfo} 技能模板
          */
         /**
          * 获取游戏牌模板
          * @name get.info
          * @function
          * @variation 2
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象，除了牌名(`card.name`)外，其他属性或函数可以为空
          * @param {(GameCores.GameObjects.Player|boolean|undefined)} option 将根据`option`获取游戏牌牌名，然后根据牌名获取模板。详见{@link game.name}，{@link game.name(2)}
          * @returns {?GameCores.GameObjects.CardInfo} 游戏牌模板
          */
         info: function (item, player) {
            if (typeof item == 'string') {
               return lib.skill[item];
            }
            if (typeof item == 'object') {
               var name = item.name;
               if (player !== false) name = get.name(item, player);
               return lib.card[name];
            }
         },
         /**
          * 将选择范围格式化为`[(number), (number)]`再返回
          * @param {(number|Array<number>|function():Array<number>)} select 如果为数值，返回`[select, select]`；如果为数组且为`[(number), (number)]`的形式，返回`select`；如果为函数，将函数的返回值作为此函数的参数迭代，然后将结果返回；其他情况，返回`[1, 1]`
          * @returns {Array<number>} 一个`[(number), (number)]`形式的数组
          */
         select: function (select) {
            if (typeof select == 'number') return [select, select];
            if (get.itemtype(select) == 'select') return select;
            if (typeof select == 'function') return get.select(select());
            return [1, 1]
         },
         /**
          * 返回本机角色当前选择的一张牌，或将本机角色当前选择的牌视为一张牌返回；
          * 如果`get.info(_status.event.skill).viewAs`存在，然后将当前选择的牌视为一张`viewAs8`返回；如果`viewAs`为函数，且`viewAs(ui.selected.cards, _status.event.player)`有返回值(`card`)，将当前选择的牌视为一张`card`返回；
          * 除此之外，如果`_status.event._get_card`存在，返回`_status.event._get_card`
          * @param {?boolean} [original] 如果为true，返回`ui.selected.cards[0]`；如果为false或未指定，将当前选择的牌视为一张`ui.selected.cards[0]`返回
          * @returns {?GameCores.GameObjects.Card} 如果当前没有选择的牌，返回undefined
          */
         card: function (original) {
            if (_status.event.skill) {
               var card = get.info(_status.event.skill).viewAs;
               if (typeof card == 'function') card = card(ui.selected.cards, _status.event.player);
               if (card) {
                  return get.autoViewAs(card, ui.selected.cards, _status.event.player);
               }
            }
            if (_status.event._get_card) {
               return _status.event._get_card;
            }
            var card = ui.selected.cards[0];
            if (original) return card;
            if (card) {
               card = get.autoViewAs(card, ui.selected.cards, _status.event.player);
            }
            return card;
         },
         /**
          * 返回当前事件角色
          * @returns {GameCores.GameObjects.Player}
          */
         player: function () {
            return _status.event.player;
         },
         /**
          * 返回一个角色数组
          * @param {*} sort 
          * @param {*} dead 
          * @param {*} out 
          * @returns {Array<GameCores.GameObjects.Player>}
          */
         //TODO
         players: function (sort, dead, out) {
            var players = game.players.slice(0);
            if (sort != false) {
               if (typeof sort == 'function') {
                  players.sort(sort);
               }
               else {
                  if (get.itemtype(sort) != 'player') lib.tempSortSeat = _status.event.player;
                  else lib.tempSortSeat = sort;
                  players.sort(lib.sort.seat);
                  delete lib.tempSortSeat;
               }
            }
            if (dead) players = players.concat(game.dead);
            if (!out) {
               for (var i = 0; i < players.length; i++) {
                  if (players[i].isOut()) players.splice(i--, 1);
               }
            }
            return players;
         },
         /**
          * 返回(角色座次|游戏牌所在区域)
          * @param {*} card 
          * @param {*} ordering 
          * @returns {(number|'h'|'e'|'j'|'o'|'s'|'c'|'d'|null)}
          */
         //TODO
         position: function (card, ordering) {
            if (get.itemtype(card) == 'player') return parseInt(card.dataset.position);
            if (card.timeout && card.destiny) {
               if (card.destiny.classList.contains('equips')) return 'e';
               if (card.destiny.classList.contains('judges')) return 'j';
               if (card.destiny.classList.contains('handcards')) return card.classList.contains('glows') ? 's' : 'h';
               if (card.destiny.id == 'cardPile') return 'c';
               if (card.destiny.id == 'discardPile') return 'd';
               if (card.destiny.id == 'special') return 's';
               if (card.destiny.id == 'ordering') return ordering ? 'o' : 'd';
               return null;
            }
            if (!card.parentNode) return;
            if (card.parentNode.classList.contains('equips')) return 'e';
            if (card.parentNode.classList.contains('judges')) return 'j';
            if (card.parentNode.classList.contains('handcards')) return card.classList.contains('glows') ? 's' : 'h';
            if (card.parentNode.id == 'cardPile') return 'c';
            if (card.parentNode.id == 'discardPile') return 'd';
            if (card.parentNode.id == 'special') return 's';
            if (card.parentNode.id == 'ordering') return ordering ? 'o' : 'd';
            return null;
         },
         skillTranslation: function (str, player) {
            var str2, str3;
            if (str.indexOf('re_') == 0) {
               str2 = str.slice(3);
               if (str2) {
                  if (lib.translate[str] == lib.translate[str2]) {
                     if (player.hasSkill(str2)) {
                        return '新·' + lib.translate[str];
                     }
                  }
                  str3 = 'mark_' + str2;
                  if (lib.translate[str3] && lib.translate[str] == lib.translate[str3]) {
                     if (player.hasSkill(str3)) {
                        return '新·' + lib.translate[str];
                     }

                  }
               }
            }
            if (str.indexOf('re') == 0) {
               str2 = str.slice(2);
               if (str2) {
                  if (lib.translate[str] == lib.translate[str2]) {
                     if (player.hasSkill(str2)) {
                        return '界' + lib.translate[str];
                     }
                  }
               }
            }
            else if (str.indexOf('xin') == 0) {
               str2 = str.slice(3);
               if (str2) {
                  if (lib.translate[str] == lib.translate[str2]) {
                     if (player.hasSkill(str2)) {
                        return '新' + lib.translate[str];
                     }
                  }
               }
            }
            return get.translation(str);
         },
         interoperableText(name, player) {
            var _a, _b;
            let str = lib.translate[name];
            if (lib.skill[name] && lib.translate[name + '_info']) {
               str = get.skillInfoTranslation(name, player);
               let info = lib.skill[name];
               let iSkill = [(_a = info.ai) === null || _a === void 0 ? void 0 : _a.combo, info.derivation, info.involve].vkflat();
               iSkill = [...new Set(iSkill)];
               for (let i of iSkill) {
                  let tra = get.translation(i);
                  if (tra.indexOf('(') > 0)
                     tra = tra.substring(0, tra.indexOf('('));
                  let reg = new RegExp(`『(${tra})』`, 'g');
                  str = str.replace(reg, `<span class="iText" data-introLink="${i}">
                              <svg width="${tra.length * 1.1 + 2}em" height="1.3em" style="vertical-align: bottom">
                                  <text x="0" y="80%" fill="white">『$1』</text>
                                  <rect width="100%" height="100%" class="iRec"/>
                              </svg></span>`);
               }
            }
            (_b = ui.interoperableText) !== null && _b !== void 0 ? _b : (ui.interoperableText = [
               lib.init.sheet(`
                              .iText{
                                  position: relative;
                                  cursor: pointer;
                                  font-style: italic;
                                  line-height: 1em;
                              }
                          `), lib.init.sheet(`
                              .iRec{
                                  fill:transparent;
                                  stroke:aqua;
                                  stroke-width: 6px;
                                  stroke-dasharray: 100 500;
                                  stroke-dashoffset: 230;
                                  transition: 1.2s;
                              }
                          `), lib.init.sheet(`
                              .iText:hover .iRec{
                                  stroke-width: 4px;
                                  stroke-dasharray: 600;
                                  stroke-dashoffset: 0;
                              }
                          `)]);
            return str;
         },
         skillInfoTranslation(name, player) {
            let str = lib.translate[name + '_info'];
            if (player && lib.dynamicTranslate[name])
               str = lib.dynamicTranslate[name](player, name);
            if (!str)
               return '';
            str = str
               .replace(/(.*?)(出牌阶段限一次|出牌阶段|准备阶段|每回合限一次|每回合每项限一次|每回合限X次|一轮开始时)，/g, '$1<font style="color:#ccc;font-weight: bold">$2</font>，')
               .replace(/(锁定技) /g, '<font color=#f77>$1 </font>')
               .replace(/(阵法技) /g, '<font color=#fe2>$1 </font>')
               .replace(/(轮次技) /g, '<font color=#fc2>$1 </font>')
               .replace(/(转换技) /g, '<font color=#8ae>$1 </font>')
               .replace(/(限定技) /g, '<font color=#baf>$1 </font>')
               .replace(/(使命技) /g, '<font color=#bf9>$1 </font>')
               .replace(/(觉醒技) /g, '<font color=#fcd>$1 </font>')
               .replace(/(主公技) /g, '<font color=#ff4>$1 </font>');
            return str;
         },
         translation: function (str, arg) {
            if (str && typeof str == 'object' && (str.name || str._tempTranslate)) {
               if (str._tempTranslate) return str._tempTranslate;
               var str2;
               if (arg == 'viewAs' && str.viewAs) {
                  str2 = get.translation(str.viewAs);
               }
               else {
                  str2 = get.translation(str.name);
               }
               if (str2.length == 1) {
                  if (str.nature == 'fire') {
                     str2 = '火' + str2;
                  }
                  else if (str.nature == 'thunder') {
                     str2 = '雷' + str2;
                  }
                  else if (str.nature == 'kami') {
                     str2 = '神' + str2;
                  }
                  else if (str.nature == 'ocean') {
                     str2 = '海' + str2;
                  }
                  else if (str.nature == 'ice') {
                     str2 = '冰' + str2;
                  }
                  else if (str.nature == 'yami') {
                     str2 = '暗' + str2;
                  }
               } else if (str.nature && str.nature.length) {
                  if (str.nature == 'fire') {
                     str2 = str2.replace(str2.charAt(0), '火');
                  }
                  else if (str.nature == 'thunder') {
                     str2 = str2.replace(str2.charAt(0), '雷');
                  }
                  else if (str.nature == 'kami') {
                     str2 = str2.replace(str2.charAt(0), '神');
                  }
                  else if (str.nature == 'ocean') {
                     str2 = str2.replace(str2.charAt(0), '海');
                  }
                  else if (str.nature == 'ice') {
                     str2 = str2.replace(str2.charAt(0), '冰');
                  }
                  else if (str.nature == 'yami') {
                     str2 = str2.replace(str2.charAt(0), '暗');
                  }
               }
               if (get.itemtype(str) == 'card' || str.isCard) {
                  if (_status.cardtag && str.cardid) {
                     var tagstr = '';
                     for (var i in _status.cardtag) {
                        if (_status.cardtag[i].contains(str.cardid)) {
                           tagstr += lib.translate[i + '_tag'];
                        }
                     }
                     if (tagstr) {
                        str2 += '·' + tagstr;
                     }
                  }
                  if (str.suit && str.number) {
                     var cardnum = str.number || '';
                     if ([1, 11, 12, 13, 14].contains(cardnum)) {
                        cardnum = { '1': 'A', '11': 'J', '12': 'Q', '13': 'K', '14': '★' }[cardnum]
                     }
                     if (arg == 'viewAs' && str.viewAs != str.name && str.viewAs) {
                        str2 += '（' + get.translation(str) + '）';
                     }
                     else {
                        str2 += '【' + get.translation(str.suit) + cardnum + '】';
                        // var len=str2.length-1;
                        // str2=str2.slice(0,len)+'<span style="letter-spacing: -2px">'+str2[len]+'·</span>'+get.translation(str.suit)+str.number;
                     }
                  }
               }
               return str2;
            }
            if (Array.isArray(str)) {
               var str2 = get.translation(str[0], arg);
               for (var i = 1; i < str.length; i++) {
                  str2 += '、' + get.translation(str[i], arg);
               }
               return str2;
            }
            if (arg == 'skill') {
               if (lib.translate[str + '_ab']) return lib.translate[str + '_ab'];
               if (lib.translate[str]) return lib.translate[str].slice(0, 2);
               return str;
            }
            else if (arg == 'info') {
               if (lib.translate[str + '_info']) return lib.translate[str + '_info'];
               var str2 = str.slice(0, str.length - 1);
               if (lib.translate[str2 + '_info']) return lib.translate[str2 + '_info'];
               if (str.lastIndexOf('_') > 0) {
                  str2 = str.slice(0, str.lastIndexOf('_'));
                  if (lib.translate[str2 + '_info']) return lib.translate[str2 + '_info'];
               }
               str2 = str.slice(0, str.length - 2);
               if (lib.translate[str2 + '_info']) return lib.translate[str2 + '_info'];
               if (lib.skill[str] && lib.skill[str].prompt) return lib.skill[str].prompt;
            }
            if (lib.translate[str]) {
               return lib.translate[str];
            }
            if (typeof str == 'string') {
               return str;
            }
            if (typeof str == 'number' || typeof str == 'boolean') {
               return str.toString();
            }
            if (str && str.toString) {
               return str.toString();
            }
            return '';
         },
         strNumber: function (num) {
            switch (num) {
               case 1: return 'A';
               case 11: return 'J';
               case 12: return 'Q';
               case 13: return 'K';
               case 14: return '★';
               default: return num.toString();
            }
         },
         cnNumber: function (num, two) {
            if (num == Infinity) return '∞';
            if (isNaN(num)) return '';
            if (typeof num != 'number') return num;
            if (num < 0 || num > 99) return num;
            if (num <= 10) {
               switch (num) {
                  case 0: return '〇';
                  case 1: return '一';
                  case 2: return two ? '二' : '两';
                  case 3: return '三';
                  case 4: return '四';
                  case 5: return '五';
                  case 6: return '六';
                  case 7: return '七';
                  case 8: return '八';
                  case 9: return '九';
                  case 10: return '十';
               }
            }
            if (num < 20) {
               return '十' + get.cnNumber(num - 10, true);
            }
            var x = Math.floor(num / 10);
            return get.cnNumber(x, true) + '十' + (num > 10 * x ? get.cnNumber(num - 10 * x, true) : '');
         },
         selectableButtons: function (sort) {
            if (!_status.event.player) return [];
            var buttons = _status.event.dialog.buttons;
            var selectable = [];
            for (var i = 0; i < buttons.length; i++) {
               if (buttons[i].classList.contains('selectable') &&
                  buttons[i].classList.contains('selected') == false) {
                  selectable.push(buttons[i]);
               }
            }
            if (sort) {
               selectable.sort(sort);
            }
            return selectable;
         },
         selectableCards: function (sort) {
            if (!_status.event.player) return [];
            var cards = _status.event.player.getCards('hes');
            var selectable = [];
            for (var i = 0; i < cards.length; i++) {
               if (cards[i].classList.contains('selectable') &&
                  cards[i].classList.contains('selected') == false) {
                  selectable.push(cards[i]);
               }
            }
            if (sort) {
               selectable.sort(sort);
            }
            return selectable;
         },
         skills: function () {
            var skills = [];
            if (ui.skills) {
               skills = skills.concat(ui.skills.skills);
            }
            if (ui.skills2) {
               skills = skills.concat(ui.skills2.skills);
            }
            if (ui.skills3) {
               skills = skills.concat(ui.skills3.skills);
            }
            return skills;
         },
         /**
          * 返回本角色可获得的技能；
          * @param {?Function} func 筛选条件
          * @param {?HTMLDivElement} player 可选
          * @returns {!Array<string>}
          */
         gainableSkills: function (func, player) {
            var list = [];
            for (var i in lib.character) {
               if (lib.filter.characterDisabled(i)) continue;
               if (lib.filter.characterDisabled2(i)) continue;
               if (lib.character[i][4]) {
                  if (lib.character[i][4].contains('boss')) continue;
                  if (lib.character[i][4].contains('hiddenboss')) continue;
                  if (lib.character[i][4].contains('minskin')) continue;
                  if (lib.character[i][4].contains('unseen')) continue;
               }
               for (var j = 0; j < lib.character[i][3].length; j++) {
                  var skill = lib.character[i][3][j];
                  var info = lib.skill[skill];
                  if (lib.filter.skillDisabled(skill)) continue;
                  if (func && !func(info, skill, i)) continue;
                  if (player && player.hasSkill && info.ai && info.ai.combo && !player.hasSkill(info.ai.combo)) continue;
                  list.add(skill);
               }
            }
            return list;
         },
         /**
          * 返回目标角色可被获得的技能；
          * @param {!string} name 角色名
          * @param {?Function} func 筛选条件
          * @returns {!Array<string>}
          */
         gainableSkillsName: function (name, func) {
            var list = [];
            if (name && lib.character[name]) {
               if (lib.character[name][4]) {
                  if (lib.character[name][4].contains('boss')) return list;
                  if (lib.character[name][4].contains('hiddenboss')) return list;
                  if (lib.character[name][4].contains('minskin')) return list;
                  if (lib.character[name][4].contains('unseen')) return list;
               }
               for (var j = 0; j < lib.character[name][3].length; j++) {
                  var skill = lib.character[name][3][j];
                  var info = lib.skill[skill];
                  if (lib.filter.skillDisabled(skill)) continue;
                  if (func && !func(info, skill, name)) continue;
                  list.add(skill);
               }
            }
            return list;
         },
         /**
          * 返回可获得的武将牌；
          * @param {?Function} func 筛选条件
          * @returns {!Array<string>}
          */
         gainableCharacters: function (func) {
            var list = [];
            for (var i in lib.character) {
               var info = lib.character[i];
               if (!info) continue;
               if (typeof func == 'function' && !func(info, i)) continue;
               if (lib.filter.characterDisabled(i)) continue;
               if (lib.filter.characterDisabled2(i)) continue;
               list.push(i);
            }
            if (func === true) {
               var players = game.players.concat(game.dead);
               for (var i = 0; i < players.length; i++) {
                  list.remove(players[i].name);
                  list.remove(players[i].name1);
                  list.remove(players[i].name2);
               }
            }
            return list;
         },
         selectableTargets: function (sort) {
            var selectable = [];
            var players = game.players.slice(0);
            if (_status.event.deadTarget) players.addArray(game.dead);
            for (var i = 0; i < players.length; i++) {
               if (players[i].classList.contains('selectable') &&
                  players[i].classList.contains('selected') == false) {
                  selectable.push(players[i]);
               }
            }
            selectable.randomSort();
            if (sort) {
               selectable.sort(sort);
            }
            return selectable;
         },
         //检查卡牌是否符合要求的快捷方法(要求满足全部条件，无条件时默认满足)
         filter: function (filter, i) {
            if (typeof filter == 'function') return filter;
            if (i == undefined) i = 0;
            var result = function () {
               if (filter == arguments[i]) return true;
               for (var j in filter) {
                  if (filter.hasOwnProperty(j)) {
                     if (get.itemtype(arguments[i]) == 'card') {
                        if (j == 'name') {
                           if (typeof filter[j] == 'object') {
                              if (filter[j].contains(get.name(arguments[i])) == false) return false;
                           }
                           else if (typeof filter[j] == 'string') {
                              if (get.name(arguments[i]) != filter[j]) return false;
                           }
                        }
                        else if (j == 'type') {
                           if (typeof filter[j] == 'object') {
                              if (filter[j].contains(get.type(arguments[i])) == false) return false;
                           }
                           else if (typeof filter[j] == 'string') {
                              if (get.type(arguments[i]) != filter[j]) return false;
                           }
                        }
                        else if (j == 'subtype') {
                           if (typeof filter[j] == 'object') {
                              if (filter[j].contains(get.subtype(arguments[i])) == false) return false;
                           }
                           else if (typeof filter[j] == 'string') {
                              if (get.subtype(arguments[i]) != filter[j]) return false;
                           }
                        }
                        else if (['color', 'suit', 'number'].contains(j)) {
                           if (typeof filter[j] == 'object') {
                              if (filter[j].contains(get[j](arguments[i])) == false) return false;
                           }
                           else if (typeof filter[j] == 'string') {
                              if (get[j](arguments[i]) != filter[j]) return false;
                           }
                        }
                        else if (typeof filter[j] == 'object') {
                           if (filter[j].contains(arguments[i][j]) == false) return false;
                        }
                        else if (typeof filter[j] == 'string') {
                           if (typeof get[j] == 'function') {
                              if (get[j](arguments[i]) != filter[j]) return false;
                           }
                           else if (arguments[i][j] != filter[j]) return false;
                        }
                     }
                     else {
                        if (arguments[i][j] != filter[j]) return false;
                     }
                  }
               }
               return true;
            }
            result._filter_args = [filter, i];
            return result;
         },
         cardCount: function (card, player) {
            var num;
            if (card == true) {
               num = 0;
               var stat = player.getStat('card');
               for (var i in stat) {
                  if (typeof stat[i] == 'number') num += stat[i];
               }
               return num;
            }
            if (player == undefined) player = _status.event.player;
            if (typeof card == 'object') {
               card = card.name;
            }
            num = player.getStat('card')[card];
            if (num == undefined) return 0;
            return num;
         },
         skillCount: function (skill, player) {
            if (player == undefined) player = _status.event.player;
            var num = player.getStat('skill')[skill];
            if (num == undefined) return 0;
            return num;
         },
         owner: function (card, method) {
            var list = game.players.concat(game.dead);
            for (var i = 0; i < list.length; i++) {
               if (list[i].getCards('hej').contains(card)) return list[i];
               if (list[i].judging[0] == card && method != 'judge') return list[i];
            }
            //for(var i=0;i<game.players.length;i++){
            //    if(game.players[i].using&&game.players[i].using.contains(card)) return game.players[i];
            //}
         },
         noSelected: function () {
            return (ui.selected.buttons.length + ui.selected.cards.length + ui.selected.targets.length == 0)
         },
         population: function (identity) {
            if (identity == undefined) return game.players.length + game.dead.length;
            var i;
            var num = 0;
            for (i = 0; i < game.players.length; i++) {
               if (game.players[i].identity == identity) num++;
            }
            return num;
         },
         totalPopulation: function (identity) {
            if (identity == undefined) return game.players.length + game.dead.length;
            var i, players = game.players.concat(game.dead);
            var num = 0;
            for (i = 0; i < players.length; i++) {
               if (players[i].identity == identity) num++;
            }
            return num;
         },
         //标记
         cardtag: function (item, tag) {
            if (item.cardid && (get.itemtype(item) == 'card' || !item.cards || !item.cards.length || item.name == item.cards[0].name) && _status.cardtag && _status.cardtag[tag] && _status.cardtag[tag].contains(item.cardid)) {
               return true;
            }
            if (item.cardtags && item.cardtags.contains(tag)) return true;
            return false;
         },
         tag: function (item, tag, item2) {
            var result;
            if (get.info(item) && get.info(item).ai && get.info(item).ai.tag) {
               result = get.info(item).ai.tag[tag];
            }
            if (typeof result == 'function') return result(item, item2);
            return result;
         },
         sortCard: function (sort) {
            var func;
            if (sort == 'type_sort') {
               func = function (card) {
                  var type = get.type(card);
                  var subtype = get.subtype(card);
                  if (lib.cardType[subtype]) {
                     return lib.cardType[subtype];
                  }
                  if (lib.cardType[type]) {
                     return lib.cardType[type];
                  }
                  switch (type) {
                     case 'basic': return 2;
                     case 'chess': return 1.5;
                     case 'trick': return -1;
                     case 'delay': return -2;
                     case 'equip': return -3;
                     default: return -4;
                  }
               }
            }
            else if (sort == 'suit_sort') {
               func = function (card) {
                  if (get.suit(card) == 'heart') return 2;
                  if (get.suit(card) == 'diamond') return 1;
                  if (get.suit(card) == 'spade') return -1;
                  if (get.suit(card) == 'club') return -2;
               }
            }
            else if (sort == 'number_sort') {
               func = function (card) {
                  return get.number(card) - 7 + 0.5;
               }
            }
            return func;
         },
         difficulty: function () {
            switch (get.config('difficulty')) {
               case 'easy': return 1;
               case 'normal': return 2;
               case 'hard': return 3;
               default: return 1;
            }
         },
         cardPile: function (name, create) {
            var filter = function (card) {
               if (typeof name == 'string') {
                  if (card.name == name) {
                     return true;
                  }
               }
               else if (typeof name == 'function') {
                  if (name(card)) {
                     return true;
                  }
               }
               return false;
            };
            if (create != 'discardPile') {
               for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
                  if (filter(ui.cardPile.childNodes[i])) {
                     return ui.cardPile.childNodes[i];
                  }
               }
            }
            if (create != 'cardPile') {
               for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
                  if (filter(ui.discardPile.childNodes[i])) {
                     return ui.discardPile.childNodes[i];
                  }
               }
            }
            if (create == 'field') {
               var found = null;
               game.findPlayer(function (current) {
                  var ej = current.getCards('ej');
                  for (var i = 0; i < ej.length; i++) {
                     if (filter(ej[i])) {
                        found = ej[i];
                        return true;
                     }
                  }
               });
               return found;
            }
            if (create && !['cardPile', 'discardPile', 'field'].contains(create)) {
               return game.createCard(name);
            }
            return null;
         },
         cardPile2: function (name) {
            return get.cardPile(name, 'cardPile');
         },
         discardPile: function (name) {
            return get.cardPile(name, 'discardPile');
         },
         aiStrategy: function () {
            switch (get.config('ai_strategy')) {
               case 'ai_strategy_1': return 1;
               case 'ai_strategy_2': return 2;
               case 'ai_strategy_3': return 3;
               case 'ai_strategy_4': return 4;
               case 'ai_strategy_5': return 5;
               case 'ai_strategy_6': return 6;
               default: return 1;
            }
         },
         skillintro: function (name, learn, learn2) {
            var str = '';
            var infoitem = lib.character[name];
            if (!infoitem) {
               for (var itemx in lib.characterPack) {
                  if (lib.characterPack[itemx][name]) {
                     infoitem = lib.characterPack[itemx][name]; break;
                  }
               }
            }
            var skills = infoitem[3];
            var opacity;
            for (var i = 0; i < skills.length; i++) {
               if (lib.translate[skills[i]] && lib.translate[skills[i] + '_info'] && lib.skill[skills[i]]) {
                  if (learn && lib.skill[skills[i]].unique && (learn2 || !lib.skill[skills[i]].gainable)) {
                     opacity = 'opacity:0.5';
                  }
                  else {
                     opacity = '';
                  }
                  var skilltrans = get.translation(skills[i]).slice(0, 2);
                  str += '<div class="skill" style="' + opacity +
                     '">' + skilltrans + '</div><div style="' + opacity + '">' +
                     get.skillInfoTranslation(skills[i]) + '</div><div style="display:block;height:10px"></div>';
               }
            }
            return str;
         },
         intro: function (name) {
            var info = lib.character[name];
            var str = '性别：' + get.translation(info[0]) + '<br/>';
            str += '势力：' + get.translation(info[1]) + '<br/>';
            str += '体力：' + get.translation(info[2]) + '<br/>';
            str += '技能：';
            if (info[3].length) {
               str += get.translation(info[3][0]);
               for (var i = 1; i < info[3].length; i++) {
                  str += '、' + get.translation(info[3][i]);
               }
            }
            return str;
         },
         storageintro: function (type, content, player, dialog, skill) {
            switch (type) {
               case 'mark': {
                  if (content > 0) {
                     return '共有' + content + '个标记';
                  }
                  return false;
               }
               case 'turn': {
                  if (content > 0) {
                     return '剩余' + content + '个回合';
                  }
                  return false;
               }
               case 'time': {
                  if (content > 0) {
                     return '剩余' + content + '次';
                  }
                  return false;
               }
               case 'limited': {
                  if (content) {
                     return '已发动';
                  }
                  return '未发动';
               }
               case 'info': {
                  return lib.translate[skill + '_info'];
               }
               case 'cardCount': {
                  if (typeof content == 'object' && typeof content.length == 'number') {
                     return '共有' + get.cnNumber(content.length) + '张牌';
                  }
                  return false;
               }
               case 'card': case 'cards': {
                  if (get.itemtype(content) == 'card') {
                     content = [content];
                  }
                  if (dialog && get.itemtype(content) == 'cards') {
                     dialog.addAuto(content);
                  }
                  else {
                     if (content && content.length) {
                        return get.translation(content);
                     }
                  }
                  if (Array.isArray(content) && !content.length) {
                     return '没有卡牌';
                  }
                  return false;
               }
               case 'player': case 'players': {
                  if (get.itemtype(content) == 'player') {
                     content = [content];
                  }
                  if (dialog && get.itemtype(content) == 'players') {
                     dialog.addAuto(content);
                     return false;
                  }
                  else {
                     if (content && content.length) {
                        return get.translation(content);
                     }
                     return false;
                  }
               }
               case 'character': case 'characters': {
                  if (typeof content == 'string') {
                     content = [content];
                  }
                  if (dialog && Array.isArray(content)) {
                     dialog.addAuto([content, 'character']);
                     return false;
                  }
                  else {
                     if (content && content.length) {
                        return get.translation(content);
                     }
                     return false;
                  }
               }
               default: {
                  if (typeof type == 'string') {
                     type = type.replace(/#/g, content);
                     type = type.replace(/&/g, get.cnNumber(content));
                     type = type.replace(/\$/g, get.translation(content));
                     return type;
                  }
                  else if (typeof type == 'function') {
                     return type(content, player, skill);
                  }
                  return false;
               }
            }
         },
         /**
          * 生成(触屏: 长按[, 点击])|(鼠标: 悬浮, 右击[, 点击])弹窗
          * @name get.nodeintro
          * @function
          * @param {!HTMLDivElement} node 要弹窗的节点
          * @returns {!HTMLDivElement} 返回生成的弹窗
          * @see {@link lib.setIntro}
          */
         nodeintro: function (node, simple, evt) {
            var uiintro = ui.create.dialog('hidden', 'notouchscroll');
            if (node.classList.contains('player') && !node.name) {
               return uiintro;
            }
            var i, translation, intro, str;
            if (node._nointro) return;
            if (typeof node._customintro == 'function') {
               if (node._customintro(uiintro) === false) return;
            }
            else if (Array.isArray(node._customintro)) {
               var caption = node._customintro[0];
               var content = node._customintro[1];
               if (typeof caption == 'function') {
                  caption = caption(node);
               }
               if (typeof content == 'function') {
                  content = content(node);
               }
               uiintro.add(caption);
               uiintro.add('<div class="text center" style="padding-bottom:5px">' + content + '</div>');
            }
            else if (node.classList.contains('player') || node.linkplayer) {
               if (node.linkplayer) {
                  node = node.link;
               }
               var capt = get.translation(node.name);
               if ((lib.character[node.name] && lib.character[node.name][1]) || lib.group.contains(node.group)) {
                  capt += '&nbsp;&nbsp;' + (lib.group.contains(node.group) ? (lib.translate[node.group + '2'] ? get.translation(node.group + '2') : get.translation(node.group)) : lib.translate[lib.character[node.name][1]]);
               }
               uiintro.add(capt);

               if (lib.characterTitle[node.name]) {
                  uiintro.addText(get.colorspan(lib.characterTitle[node.name]));
               }

               if (true) {
                  var hs = node.getCards('h');
                  if (hs.length) {
                     var ms = [];
                     if (node.isUnderControl() || (!game.observe && game.me && game.me.hasSkillTag('viewHandcard', null, node, true))) {
                        ms.addArray(hs);
                     }
                     for (var i = 0; i < hs.length; i++) {
                        if (hs[i].hasGaintag('ming_')) ms.add(hs[i]);
                        if (hs[i].hasGaintag('an_')) ms.remove(ms[i]);
                     }
                     if (ms.length) {
                        uiintro.add('<div class="text center">手牌</div>');
                        uiintro.addSmall(ms);
                     }
                  }
               }

               var skills = node.getSkills(null, null, false).slice(0);
               var skills2 = game.filterSkills(skills, node);
               if (node == game.me && node.hiddenSkills.length) {
                  skills.addArray(node.hiddenSkills);
               }
               for (let i in node.disabledSkills) {
                  if (node.disabledSkills[i].length == 1 &&
                     node.disabledSkills[i][0] == i + '_awake' &&
                     !node.hiddenSkills.contains(i)) {
                     skills.add(i);
                  }
               }
               for (let i = 0; i < skills.length; i++) {
                  if (lib.skill[skills[i]] && (lib.skill[skills[i]].nopop || lib.skill[skills[i]].equipSkill)) continue;
                  if (lib.translate[skills[i] + '_info']) {
                     translation = lib.translate[skills[i] + '_ab'] || get.translation(skills[i]).slice(0, 5);
                     let info = get.interoperableText(skills[i], node)
                     if (node.forbiddenSkills[skills[i]]) {
                        let forbidstr = '<div style="opacity:0.5"><div class="skill">' + translation + '</div><div' + ((translation.length > 3) ? ' class="skilltext"' : '') + '>';
                        if (node.forbiddenSkills[skills[i]].length) {
                           forbidstr += '（与' + get.translation(node.forbiddenSkills[skills[i]]) + '冲突）<br>';
                        }
                        else {
                           forbidstr += '（双将禁用）<br>';
                        }
                        forbidstr += info + '</div></div>'
                        uiintro.add(forbidstr);
                     }
                     else if (!skills2.contains(skills[i])) {
                        uiintro.add(`<div style="opacity:0.5"><div class="skill">${translation}</div><div${(translation.length > 3) ? ' class="skilltext"' : ''}>${info}</div></div>`);
                     }
                     else if (lib.skill[skills[i]].temp || !node.skills.contains(skills[i]) || lib.skill[skills[i]].thundertext) {
                        if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
                           uiintro.add(`<div><div class="skill thundertext thunderauto">${translation}</div><div${(translation.length > 3) ? ' class="skilltext thundertext thunderauto"' : ' class="thundertext thunderauto"'}>${info}<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>`);
                           let underlinenode = uiintro.content.lastChild.querySelector('.underlinenode');
                           if (lib.skill[skills[i]].frequent) {
                              if (lib.config.autoskilllist.contains(skills[i])) {
                                 underlinenode.classList.remove('on');
                              }
                           }
                           if (lib.skill[skills[i]].subfrequent) {
                              for (let j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
                                 if (lib.config.autoskilllist.contains(skills[i] + '_' + lib.skill[skills[i]].subfrequent[j])) {
                                    underlinenode.classList.remove('on');
                                 }
                              }
                           }
                           if (lib.config.autoskilllist.contains(skills[i])) {
                              underlinenode.classList.remove('on');
                           }
                           underlinenode.link = skills[i];
                           underlinenode.listen(ui.click.autoskill2);
                        }
                        else {
                           uiintro.add(`<div><div class="skill thundertext thunderauto">${translation}</div><div${(translation.length > 3) ? ' class="skilltext thundertext thunderauto"' : ' class="thundertext thunderauto"'}>${info}</div></div>`);
                        }
                     }
                     else if (lib.skill[skills[i]].frequent || lib.skill[skills[i]].subfrequent) {
                        uiintro.add(`<div><div class="skill">${translation}</div><div${(translation.length > 3) ? ' class="skilltext"' : ''}>${info}<br><div class="underlinenode on gray" style="position:relative;padding-left:0;padding-top:7px">自动发动</div></div></div>`);
                        let underlinenode = uiintro.content.lastChild.querySelector('.underlinenode');
                        if (lib.skill[skills[i]].frequent) {
                           if (lib.config.autoskilllist.contains(skills[i])) {
                              underlinenode.classList.remove('on');
                           }
                        }
                        if (lib.skill[skills[i]].subfrequent) {
                           for (let j = 0; j < lib.skill[skills[i]].subfrequent.length; j++) {
                              if (lib.config.autoskilllist.contains(skills[i] + '_' + lib.skill[skills[i]].subfrequent[j])) {
                                 underlinenode.classList.remove('on');
                              }
                           }
                        }
                        if (lib.config.autoskilllist.contains(skills[i])) {
                           underlinenode.classList.remove('on');
                        }
                        underlinenode.link = skills[i];
                        underlinenode.listen(ui.click.autoskill2);
                     }
                     else if (lib.skill[skills[i]].clickable && node.isIn() && node.isUnderControl(true)) {
                        if (lib.skill[skills[i]].clickChange) {
                           var intronode = uiintro.add(`<div><div class="skill">${translation}</div><div${(translation.length > 3) ? ' class="skilltext"' : ''}>${info}<br><div class="menubutton skillbutton" style="position:relative;margin-top:5px">点击${lib.skill[skills[i]].clickChange}</div></div></div>`).querySelector('.skillbutton');
                           if (!_status.gameStarted || (lib.skill[skills[i]].clickableFilter && !lib.skill[skills[i]].clickableFilter(node))) {
                              intronode.innerHTML = lib.discoloration1 + '已' + lib.skill[skills[i]].clickChange;
                              intronode.classList.add('hrefnode');
                              intronode.style.opacity = 0.8;
                           }
                           intronode.link = node;
                           intronode.func = lib.skill[skills[i]].clickable;
                           intronode.classList.add('pointerdiv');
                           intronode.listen(ui.click.skillbutton);
                        }
                        else {
                           var intronode = uiintro.add(`<div><div class="skill">${translation}</div><div${(translation.length > 3) ? ' class="skilltext"' : ''}>${info}<br><div class="menubutton skillbutton" style="position:relative;margin-top:5px">点击发动</div></div></div>`).querySelector('.skillbutton');
                           if (!_status.gameStarted || (lib.skill[skills[i]].clickableFilter && !lib.skill[skills[i]].clickableFilter(node))) {
                              intronode.classList.add('disabled');
                              intronode.style.opacity = 0.5;
                           }
                           else {
                              intronode.link = node;
                              intronode.func = lib.skill[skills[i]].clickable;
                              intronode.classList.add('pointerdiv');
                              intronode.listen(ui.click.skillbutton);
                           }
                        }
                     }
                     else if (lib.skill[skills[i]].nobracket) {
                        uiintro.add(`<div><div class="skilln">${get.translation(skills[i])}</div><div${(get.translation(skills[i]).length > 3) ? ' class="skilltext"' : ''}>${info}</div></div>`);
                     }
                     else {
                        uiintro.add(`<div><div class="skill">${translation}</div><div${(translation.length > 3) ? ' class="skilltext"' : ''}>${info}</div></div>`);
                     }
                     if (lib.translate[skills[i] + '_append']) {
                        uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + '_append'] + '</div>')
                     }
                     for (let v of uiintro.getElementsByTagName('span')) {
                        v.link = v.dataset.introlink
                        if (v.classList.contains('iText')) lib.setIntro(v)
                     }
                  }
               }
               // if(get.is.phoneLayout()){
               //     var storage=node.storage;
               //     for(i in storage){
               //                  if(get.info(i)&&get.info(i).intro){
               //                               intro=get.info(i).intro;
               //                               if(node.getSkills().concat(lib.skill.global).contains(i)==false&&!intro.show) continue;
               //                               var name=intro.name?intro.name:get.translation(i);
               //                               if(typeof name=='function'){
               //                                            name=name(storage[i],node);
               //                               }
               //                               translation='<div><div class="skill">『'+name.slice(0,2)+'』</div><div>';
               //                               var stint=get.storageintro(intro.content,storage[i],node,null,i);
               //                               if(stint){
               //                                            translation+=stint+'</div></div>';
               //                                            uiintro.add(translation);
               //                               }
               //                  }
               //     }
               // }

               if (lib.config.right_range && _status.gameStarted) {
                  uiintro.add(ui.create.div('.placeholder'));
                  var table, tr, td;
                  table = document.createElement('table');
                  tr = document.createElement('tr');
                  table.appendChild(tr);
                  td = document.createElement('td');
                  td.innerHTML = '距离';
                  tr.appendChild(td);
                  td = document.createElement('td');
                  td.innerHTML = game.chess ? '道具' : '手牌';
                  tr.appendChild(td);
                  td = document.createElement('td');
                  td.innerHTML = '行动';
                  tr.appendChild(td);
                  td = document.createElement('td');
                  td.innerHTML = game.chess ? '职业' : '伤害';
                  tr.appendChild(td);

                  tr = document.createElement('tr');
                  table.appendChild(tr);
                  td = document.createElement('td');
                  if (node == game.me || !game.me || !game.me.isIn()) {
                     td.innerHTML = '-';
                  }
                  else {
                     var dist1 = get.numStr(Math.max(1, game.me.distanceTo(node)));
                     var dist2 = get.numStr(Math.max(1, node.distanceTo(game.me)));
                     if (dist1 == dist2) {
                        td.innerHTML = dist1;
                     }
                     else {
                        td.innerHTML = dist1 + '/' + dist2;
                     }
                  }
                  tr.appendChild(td);
                  td = document.createElement('td');
                  td.innerHTML = node.countCards('h');
                  tr.appendChild(td);
                  td = document.createElement('td');
                  td.innerHTML = node.phaseNumber;
                  tr.appendChild(td);
                  td = document.createElement('td');
                  if (game.chess) {
                     if (node.storage.curClass) td.innerHTML = get.translation(node.storage.curClass);
                     else td.innerHTML = '-';
                  } else {
                     (function () {
                        num = 0;
                        for (var j = 0; j < node.stat.length; j++) {
                           if (typeof node.stat[j].damage == 'number') num += node.stat[j].damage;
                        }
                        td.innerHTML = num;
                     }());
                  }
                  tr.appendChild(td);
                  table.style.width = 'calc(100% - 20px)';
                  table.style.marginLeft = '10px';

                  uiintro.content.appendChild(table);
                  if (!lib.config.show_favourite) {
                     table.style.paddingBottom = '5px'
                  }
               }
               if (!simple || get.is.phoneLayout()) {
                  let es = node.getCards('e');
                  for (let i = 0; i < es.length; i++) {
                     if (es[i].viewAs && es[i].originalName && es[i].originalName != es[i].name) {
                        uiintro.add('<div><div class="equip">' + es[i].outerHTML + '</div><div>' + lib.translate[es[i].viewAs] + '：' + lib.translate[es[i].viewAs + '_info'] + '</div></div>');
                     }
                     else {
                        uiintro.add('<div><div class="equip">' + es[i].outerHTML + '</div><div>' + lib.translate[es[i].name + '_info'] + '</div></div>');
                     }
                     uiintro.content.lastChild.querySelector('.equip>.card').style.transform = '';
                  }
                  let js = node.getCards('j');
                  for (let i = 0; i < js.length; i++) {
                     if (js[i].viewAs && js[i].viewAs != js[i].name) {
                        uiintro.add('<div><div class="equip">' + js[i].outerHTML + '</div><div>' + lib.translate[js[i].viewAs] + '：' + lib.translate[js[i].viewAs + '_info'] + '</div></div>');
                     }
                     else {
                        uiintro.add('<div><div class="equip">' + js[i].outerHTML + '</div><div>' + lib.translate[js[i].name + '_info'] + '</div></div>');
                     }
                     uiintro.content.lastChild.querySelector('.equip>.card').style.transform = '';
                  }
                  if (get.is.phoneLayout()) {
                     let markCoutainer = ui.create.div('.mark-container.marks');
                     for (let i in node.marks) {
                        let nodemark = node.marks[i].cloneNode(true);
                        nodemark.classList.add('pointerdiv');
                        nodemark.link = node.marks[i];
                        nodemark.style.transform = '';
                        markCoutainer.appendChild(nodemark);
                        nodemark.listen(function () {
                           uiintro.noresume = true;
                           let rect = this.link.getBoundingClientRect();
                           ui.click.intro.call(this.link, {
                              clientX: rect.left + rect.width,
                              clientY: rect.top + rect.height / 2,
                           });
                           if (lib.config.touchscreen) {
                              uiintro._close();
                           }
                        });
                     }
                     if (markCoutainer.childElementCount) {
                        uiintro.addText('标记');
                        uiintro.add(markCoutainer);
                     }
                  }
               }
               if (!game.observe && _status.gameStarted && game.me && node != game.me) {
                  ui.throwEmotion = [];
                  uiintro.addText('发送交互表情');
                  var click = function () {
                     if (_status.dragged) return;
                     if (_status.justdragged) return;
                     if (_status.throwEmotionWait) return;
                     var emotion = this.link;
                     if (game.online) {
                        game.send('throwEmotion', node, emotion);
                     }
                     else game.me.throwEmotion(node, emotion);
                     uiintro._close();
                     _status.throwEmotionWait = true;
                     setTimeout(function () {
                        _status.throwEmotionWait = false;
                        if (ui.throwEmotion) {
                           for (var i of ui.throwEmotion) i.classList.remove('exclude');
                        }
                     }, (emotion == 'flower' || emotion == 'egg') ? 5000 : 10000)
                  };
                  var td;
                  var table = document.createElement('div');
                  table.classList.add('add-setting');
                  table.style.margin = '0';
                  table.style.width = '100%';
                  table.style.position = 'relative';
                  var listi = ['flower', 'egg', 'wine', 'shoe'];
                  for (var i = 0; i < listi.length; i++) {
                     td = ui.create.div('.menubutton.reduce_radius.pointerdiv.tdnode');
                     ui.throwEmotion.add(td);
                     if (_status.throwEmotionWait) td.classList.add('exclude');
                     td.link = listi[i];
                     table.appendChild(td);
                     td.innerHTML = '<span>' + get.translation(listi[i]) + '</span>';
                     td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', click);
                  }
                  uiintro.content.appendChild(table);
                  table = document.createElement('div');
                  table.classList.add('add-setting');
                  table.style.margin = '0';
                  table.style.width = '100%';
                  table.style.position = 'relative';
                  var listi = ['yuxisx', 'shoukao', 'sc', 'ship'];
                  for (var i = 0; i < listi.length; i++) {
                     td = ui.create.div('.menubutton.reduce_radius.pointerdiv.tdnode');
                     ui.throwEmotion.add(td);
                     if (_status.throwEmotionWait) td.classList.add('exclude');
                     td.link = listi[i];
                     table.appendChild(td);
                     td.innerHTML = '<span>' + get.translation(listi[i]) + '</span>';
                     td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', click);
                  }
                  uiintro.content.appendChild(table);
               }
               var modepack = lib.characterPack['mode_' + get.mode()];
               if (lib.config.show_favourite && lib.character[node.name] && game.players.contains(node) &&
                  (!modepack || !modepack[node.name]) && (!simple || get.is.phoneLayout())) {
                  var addFavourite = ui.create.div('.text.center.pointerdiv');
                  addFavourite.link = node.link;
                  if (lib.config.favouriteCharacter.contains(node.name)) {
                     addFavourite.innerHTML = '移除收藏';
                  }
                  else {
                     addFavourite.innerHTML = '添加收藏';
                  }
                  addFavourite.listen(ui.click.favouriteCharacter)
                  uiintro.add(addFavourite);
               }
               if (!simple || get.is.phoneLayout()) {
                  if ((lib.config.change_skin || lib.skin) && !node.isUnseen()) {
                     var num = 1;
                     var introadded = false;
                     var createButtons = function (num, avatar2) {
                        if (!introadded) {
                           introadded = true;
                           uiintro.add('<div class="text center">更改皮肤</div>');
                        }
                        var buttons = ui.create.div('.buttons.smallzoom.scrollbuttons');
                        lib.setMousewheel(buttons);
                        var nameskin = (avatar2 ? node.name2 : node.name1);
                        var nameskin2 = nameskin;
                        var gzbool = false;
                        if (nameskin.indexOf('gz_shibing') == 0) {
                           nameskin = nameskin.slice(3, 11);
                        }
                        else if (nameskin.indexOf('gz_') == 0) {
                           nameskin = nameskin.slice(3);
                           gzbool = true;
                        }
                        for (var i = 0; i <= num; i++) {
                           var button = ui.create.div('.button.character.pointerdiv', buttons, function () {
                              if (this._link) {
                                 if (avatar2) {
                                    lib.config.skin[nameskin] = this._link;
                                    node.node.avatar2.style.backgroundImage = this.style.backgroundImage;
                                 }
                                 else {
                                    lib.config.skin[nameskin] = this._link;
                                    node.node.avatar.style.backgroundImage = this.style.backgroundImage;
                                 }
                              }
                              else {
                                 delete lib.config.skin[nameskin];
                                 if (avatar2) {
                                    if (gzbool && lib.character[nameskin2][4].contains('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar2.setBackground(nameskin2, 'character');
                                    else node.node.avatar2.setBackground(nameskin, 'character');
                                 }
                                 else {
                                    if (gzbool && lib.character[nameskin2][4].contains('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.node.avatar.setBackground(nameskin2, 'character');
                                    else node.node.avatar.setBackground(nameskin, 'character');
                                 }
                              }
                              game.saveConfig('skin', lib.config.skin);
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
                        uiintro.add(buttons);
                     };
                     var loadImage = function (avatar2) {
                        var img = new Image();
                        img.onload = function () {
                           num++;
                           loadImage(avatar2);
                        }
                        img.onerror = function () {
                           num--;
                           if (num) {
                              createButtons(num, avatar2);
                           }
                           if (!avatar2) {
                              if (!node.classList.contains('unseen2') && node.name2) {
                                 num = 1;
                                 loadImage(true);
                              }
                           }
                        }
                        var nameskin = (avatar2 ? node.name2 : node.name1);
                        var nameskin2 = nameskin;
                        var gzbool = false;
                        if (nameskin.indexOf('gz_shibing') == 0) {
                           nameskin = nameskin.slice(3, 11);
                        }
                        else if (nameskin.indexOf('gz_') == 0) {
                           nameskin = nameskin.slice(3);
                           gzbool = true;
                        }
                        img.src = lib.assetURL + 'image/skin/' + nameskin + '/' + num + '.jpg';
                     }
                     if (lib.config.change_skin) {
                        if (!node.isUnseen(0)) {
                           loadImage();
                        }
                        else if (node.name2) {
                           loadImage(true);
                        }
                     }
                     else {
                        setTimeout(function () {
                           var nameskin1 = node.name1;
                           var nameskin2 = node.name2;
                           if (nameskin1 && nameskin1.indexOf('gz_') == 0) {
                              nameskin1 = nameskin1.slice(3);
                           }
                           if (nameskin2 && nameskin2.indexOf('gz_') == 0) {
                              nameskin2 = nameskin2.slice(3);
                           }
                           if (!node.isUnseen(0) && lib.skin[nameskin1]) {
                              createButtons(lib.skin[nameskin1]);
                           }
                           if (!node.isUnseen(1) && lib.skin[nameskin2]) {
                              createButtons(lib.skin[nameskin2], true);
                           }
                        });
                     }
                  }
               }

               uiintro.add(ui.create.div('.placeholder.slim'));
            }
            else if (node.classList.contains('mark') && node.info &&
               node.parentNode && node.parentNode.parentNode && node.parentNode.parentNode.classList.contains('player')) {
               var info = node.info;
               var player = node.parentNode.parentNode;
               if (info.name) {
                  if (typeof info.name == 'function') {
                     var named = info.name(player.storage[node.skill], player);
                     if (named) {
                        uiintro.add(named);
                     }
                  }
                  else {
                     uiintro.add(info.name);
                  }
               }
               else if (info.name !== false) {
                  uiintro.add(get.translation(node.skill));
               }
               if (typeof info.id == 'string' && info.id.indexOf('subplayer') == 0 &&
                  player.isUnderControl(true) && player.storage[info.id] && !_status.video) {
                  var storage = player.storage[info.id];
                  uiintro.addText('当前体力：' + storage.hp + '/' + storage.maxHp);
                  if (storage.hs.length) {
                     uiintro.addText('手牌区');
                     uiintro.addSmall(storage.hs);
                  }
                  if (storage.es.length) {
                     uiintro.addText('装备区');
                     uiintro.addSmall(storage.es);
                  }
               }
               if (typeof info.mark == 'function') {
                  var stint = info.mark(uiintro, player.storage[node.skill], player);
                  if (stint) {
                     var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + '</div>');
                     if (stint.indexOf('<div class="equip"') != 0) {
                        uiintro._place_text = placetext;
                     }
                     // if(stint.length<=100){
                     //     uiintro.add('<div class="text center">'+stint+'</div>');
                     // }
                     // else{
                     //     uiintro.add('<div class="text">'+stint+'</div>');
                     // }
                  }
               }
               else {
                  var stint = get.storageintro(info.content, player.storage[node.skill], player, uiintro, node.skill);
                  if (stint) {
                     if (stint[0] == '@') {
                        uiintro.add('<div class="caption">' + stint.slice(1) + '</div>');
                     }
                     else {
                        var placetext = uiintro.add('<div class="text" style="display:inline">' + stint + '</div>');
                        if (stint.indexOf('<div class="equip"') != 0) {
                           uiintro._place_text = placetext;
                        }
                     }
                     // else if(stint.length<=100){
                     //     uiintro.add('<div class="text center">'+stint+'</div>');
                     // }
                     // else{
                     //     uiintro.add('<div class="text">'+stint+'</div>');
                     // }
                  }
               }
               uiintro.add(ui.create.div('.placeholder.slim'));
            }
            else if (node.classList.contains('card')) {
               //卡牌长按介绍
               if (ui.arena.classList.contains('observe') && node.parentNode.classList.contains('handcards')) {
                  return;
               }
               var name = node.name;
               if (node.parentNode.cardMod) {
                  var moded = false;
                  for (var i in node.parentNode.cardMod) {
                     var item = node.parentNode.cardMod[i](node);
                     if (Array.isArray(item)) {
                        moded = true;
                        uiintro.add(item[0]);
                        uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + item[1] + '</div>');
                     }
                  }
                  if (moded) return uiintro;
               }
               if (node.link && node.link.name && lib.card[node.link.name]) {
                  name = node.link.name;
               }
               if ((get.position(node) == 'j' || get.position(node) == 'e') && node.viewAs && (node.viewAs != name || node.originalName != name)) {
                  uiintro.add(get.translation(node.viewAs));
                  console.log(node.originalName)
                  uiintro.add('<div class="text center">（' + get.translation(get.translation(node.originalName || node)) + '）</div>');
                  // uiintro.add(get.translation(node.viewAs)+'<br><div class="text center" style="padding-top:5px;">（'+get.translation(node)+'）</div>');
                  uiintro.nosub = true;
                  name = node.viewAs;
               }
               else {
                  uiintro.add(get.translation(node));
               }
               if (node._banning) {
                  var clickBanned = function () {
                     var banned = lib.config[this.bannedname] || [];
                     if (banned.contains(name)) {
                        banned.remove(name);
                     }
                     else {
                        banned.push(name);
                     }
                     game.saveConfig(this.bannedname, banned);
                     this.classList.toggle('on');
                     if (node.updateBanned) {
                        node.updateBanned();
                     }
                  };
                  var modeorder = lib.config.modeorder || [];
                  for (var i in lib.mode) {
                     modeorder.add(i);
                  }
                  var list = [];
                  uiintro.contentContainer.listen(function (e) {
                     ui.click.touchpop();
                     e.stopPropagation();
                  });
                  for (var i = 0; i < modeorder.length; i++) {
                     if (node._banning == 'online') {
                        if (!lib.mode[modeorder[i]].connect) continue;
                     }
                     else if (modeorder[i] == 'connect' || modeorder[i] == 'brawl') {
                        continue;
                     }
                     if (lib.config.all.mode.contains(modeorder[i])) {
                        list.push(modeorder[i]);
                     }
                  }
                  var page = ui.create.div('.menu-buttons.configpopped', uiintro.content);
                  var banall = false;
                  for (var i = 0; i < list.length; i++) {
                     var cfg = ui.create.div('.config', lib.translate[list[i]] + '模式', page);
                     cfg.classList.add('toggle');
                     if (node._banning == 'offline') {
                        cfg.bannedname = list[i] + '_bannedcards';
                     }
                     else {
                        cfg.bannedname = 'connect_' + list[i] + '_bannedcards';
                     }
                     cfg.listen(clickBanned);
                     ui.create.div(ui.create.div(cfg));
                     var banned = lib.config[cfg.bannedname] || [];
                     if (!banned.contains(name)) {
                        cfg.classList.add('on');
                        banall = true;
                     }
                  }
                  ui.create.div('.menubutton.pointerdiv', banall ? '全部禁用' : '全部启用', uiintro.content, function () {
                     if (this.innerHTML == '全部禁用') {
                        for (var i = 0; i < page.childElementCount; i++) {
                           if (page.childNodes[i].bannedname && page.childNodes[i].classList.contains('on')) {
                              clickBanned.call(page.childNodes[i]);
                           }
                        }
                        this.innerHTML = '全部启用';
                     }
                     else {
                        for (var i = 0; i < page.childElementCount; i++) {
                           if (page.childNodes[i].bannedname && !page.childNodes[i].classList.contains('on')) {
                              clickBanned.call(page.childNodes[i]);
                           }
                        }
                        this.innerHTML = '全部禁用';
                     }
                  }).style.marginTop = '-10px';
                  ui.create.div('.placeholder.slim', uiintro.content);
               }
               else {
                  if (lib.translate[name + '_info']) {
                     if (!uiintro.nosub) {
                        if (get.subtype(node) == 'equip1') {
                           var added = false;
                           if (lib.card[node.name] && lib.card[node.name].distance) {
                              var dist = lib.card[node.name].distance;
                              if (dist.attackFrom) {
                                 added = true;
                                 uiintro.add('<div class="text center">攻击范围：' + (-dist.attackFrom + 1) + '</div>');
                              }
                           }
                           if (!added) {
                              uiintro.add('<div class="text center">攻击范围：1</div>');
                           }
                        }
                        else if (get.subtype(node)) {
                           uiintro.add('<div class="text center">' + get.translation(get.subtype(node)) + '</div>');
                        }
                        else if (lib.card[name] && lib.card[name].addinfomenu) {
                           uiintro.add('<div class="text center">' + lib.card[name].addinfomenu + '</div>');
                        }
                        else if (lib.card[name] && lib.card[name].derivation) {
                           if (typeof lib.card[name].derivation == 'string') {
                              uiintro.add('<div class="text center">来源：' + get.translation(lib.card[name].derivation) + '</div>');
                           }
                           else if (lib.card[name].derivationpack) {
                              uiintro.add('<div class="text center">来源：' + get.translation(lib.card[name].derivationpack + '_card_config') + '</div>');
                           }
                        }
                        else {
                           if (lib.card[name].unique) {
                              uiintro.add('<div class="text center">特殊' + get.translation(lib.card[name].type) + '牌</div>');
                           }
                           else {
                              if (lib.card[name].type && lib.translate[lib.card[name].type]) uiintro.add('<div class="text center">' + get.translation(lib.card[name].type) + '牌</div>');
                           }
                        }
                        if (lib.card[name].unique && lib.card[name].type == 'equip') {
                           if (lib.cardPile.guozhan && lib.cardPack.guozhan.contains(name)) {
                              uiintro.add('<div class="text center">专属装备</div>').style.marginTop = '-5px';
                           }
                           else {
                              uiintro.add('<div class="text center">特殊装备</div>').style.marginTop = '-5px';
                           }
                        }
                     }
                     if (lib.translate[name + '_info']) {
                        var placetext = uiintro.add('<div class="text" style="display:inline">' + lib.translate[name + '_info'] + '</div>');
                        if (lib.translate[name + '_info'].indexOf('<div class="equip"') != 0) {
                           uiintro._place_text = placetext;
                        }
                     }
                     if (lib.card[name].materials) {
                        if (lib.card[name].materials_prompt) uiintro.add('<div class="text" style="font-family: yuanli">★升阶：' + lib.card[name].materials_prompt + '</div>');
                        else if (typeof lib.card[name].materials == 'function') uiintro.add('<div class="text" style="font-family: yuanli">★升阶：' + lib.card[name].materials_prompt(node.link || node) + '</div>');
                        else if (Array.isArray(lib.card[name].materials)) uiintro.add('<div class="text" style="font-family: yuanli">★升阶：' + get.translation(lib.card[name].materials) + '</div>');
                        else uiintro.add('<div class="text" style="font-family: yuanli">★升阶卡牌</div>');
                     }
                     if (lib.card[name].yingbian_prompt && get.is.yingbian(node.link || node)) {
                        if (typeof lib.card[name].yingbian_prompt == 'function') uiintro.add('<div class="text" style="font-family: yuanli">应变：' + lib.card[name].yingbian_prompt(node.link || node) + '</div>');
                        else uiintro.add('<div class="text" style="font-family: yuanli">应变：' + lib.card[name].yingbian_prompt + '</div>');
                     }
                     if (node.nature == 'ocean') {
                        uiintro.add('<div class="text" style="font-family: yuanli;zoom: 0.8">' + '<span class="bluetext">海洋</span>' + '：海洋属性的牌被使用时，若此牌没有「伤害」标签且目标没有护甲，则令目标获得1点护甲；有护甲的角色受到海洋伤害时，此伤害+1且不产生传递' + '</div>');
                     }
                     if (node.nature == 'yami') {
                        uiintro.add('<div class="text" style="font-family: yuanli;zoom: 0.8">' + '<span class="legendtext">暗影</span>' + '：暗影属性的牌可以在其他角色的结束阶段对其使用；暗影属性的牌被使用时，若目标手牌数多于使用者，则其不能响应此牌且此牌造成的伤害不产生传递' + '</div>');
                     }
                     if (lib.translate[name + '_append']) {
                        uiintro.add('<div class="text" style="display:inline">' + lib.translate[name + '_append'] + '</div>');
                     }
                  }
                  uiintro.add(ui.create.div('.placeholder.slim'));
               }
            }
            else if (node.classList.contains('character')) {
               var character = node.link;
               if (lib.character[node.link] && lib.character[node.link][1]) {
                  var group = get.is.double(node.link, true);
                  if (group) {
                     var str = get.translation(character) + '&nbsp;&nbsp;';
                     for (var i = 0; i < group.length; i++) {
                        str += get.translation(group[i]);
                        if (i < group.length - 1) str += '/';
                     }
                     uiintro.add(str);
                  }
                  else uiintro.add(get.translation(character) + '&nbsp;&nbsp;' + lib.translate[lib.character[node.link][1]] || lib.character[node.link][1]);
               }
               else {
                  uiintro.add(get.translation(character));
               }

               if (lib.characterTitle[node.link]) {
                  uiintro.addText(get.colorspan(lib.characterTitle[node.link]));
               }

               if (node._banning) {
                  var clickBanned = function () {
                     var banned = lib.config[this.bannedname] || [];
                     if (banned.contains(character)) {
                        banned.remove(character);
                     }
                     else {
                        banned.push(character);
                     }
                     game.saveConfig(this.bannedname, banned);
                     this.classList.toggle('on');
                     if (node.updateBanned) {
                        node.updateBanned();
                     }
                  };
                  var modeorder = lib.config.modeorder || [];
                  for (var i in lib.mode) {
                     modeorder.add(i);
                  }
                  var list = [];
                  uiintro.contentContainer.listen(function (e) {
                     ui.click.touchpop();
                     e.stopPropagation();
                  });
                  for (var i = 0; i < modeorder.length; i++) {
                     if (node._banning == 'online') {
                        if (!lib.mode[modeorder[i]].connect) continue;
                        if (!lib.config['connect_' + modeorder[i] + '_banned']) {
                           lib.config['connect_' + modeorder[i] + '_banned'] = [];
                        }
                     }
                     else if (modeorder[i] == 'connect' || modeorder[i] == 'brawl') {
                        continue;
                     }
                     if (lib.config.all.mode.contains(modeorder[i])) {
                        list.push(modeorder[i]);
                     }
                  }
                  var page = ui.create.div('.menu-buttons.configpopped', uiintro.content);
                  var banall = false;
                  for (var i = 0; i < list.length; i++) {
                     var cfg = ui.create.div('.config', lib.translate[list[i]] + '模式', page);
                     cfg.classList.add('toggle');
                     if (node._banning == 'offline') {
                        cfg.bannedname = list[i] + '_banned';
                     }
                     else {
                        cfg.bannedname = 'connect_' + list[i] + '_banned';
                     }
                     cfg.listen(clickBanned);
                     ui.create.div(ui.create.div(cfg));
                     var banned = lib.config[cfg.bannedname] || [];
                     if (!banned.contains(character)) {
                        cfg.classList.add('on');
                        banall = true;
                     }
                  }
                  if (node._banning == 'offline') {
                     var cfg = ui.create.div('.config', '随机选将可用', page);
                     cfg.classList.add('toggle');
                     cfg.listen(function () {
                        this.classList.toggle('on');
                        if (this.classList.contains('on')) {
                           lib.config.forbidai_user.remove(character);
                        }
                        else {
                           lib.config.forbidai_user.add(character);
                        }
                        game.saveConfig('forbidai_user', lib.config.forbidai_user);
                     });
                     ui.create.div(ui.create.div(cfg));
                     if (!lib.config.forbidai_user.contains(character)) {
                        cfg.classList.add('on');
                     }
                  }
                  ui.create.div('.menubutton.pointerdiv', banall ? '全部禁用' : '全部启用', uiintro.content, function () {
                     if (this.innerHTML == '全部禁用') {
                        for (var i = 0; i < page.childElementCount; i++) {
                           if (page.childNodes[i].bannedname && page.childNodes[i].classList.contains('on')) {
                              clickBanned.call(page.childNodes[i]);
                           }
                        }
                        this.innerHTML = '全部启用';
                     }
                     else {
                        for (var i = 0; i < page.childElementCount; i++) {
                           if (page.childNodes[i].bannedname && !page.childNodes[i].classList.contains('on')) {
                              clickBanned.call(page.childNodes[i]);
                           }
                        }
                        this.innerHTML = '全部禁用';
                     }
                  }).style.marginTop = '-10px';
                  ui.create.div('.placeholder.slim', uiintro.content);
               }
               else {
                  var infoitem = lib.character[character];
                  if (!infoitem) {
                     for (var itemx in lib.characterPack) {
                        if (lib.characterPack[itemx][character]) {
                           infoitem = lib.characterPack[itemx][character]; break;
                        }
                     }
                  }
                  var skills = infoitem[3];
                  for (i = 0; i < skills.length; i++) {
                     if (lib.translate[skills[i] + '_info']) {
                        translation = lib.translate[skills[i] + '_ab'] || get.translation(skills[i]).slice(0, 5);
                        let info = get.interoperableText(skills[i])
                        if (lib.skill[skills[i]] && lib.skill[skills[i]].nobracket) {
                           uiintro.add('<div><div class="skilln">' + get.translation(skills[i]) + '</div><div' + ((get.translation(skills[i]).length > 3) ? ' class="skilltext"' : '') + '>' + info + '</div></div>');
                        }
                        else {
                           uiintro.add('<div><div class="skill">' + translation + '</div><div' + ((translation.length > 3) ? ' class="skilltext"' : '') + '>' + info + '</div></div>');
                        }
                        if (lib.translate[skills[i] + '_append']) {
                           uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[skills[i] + '_append'] + '</div>')
                        }
                        for (let v of uiintro.getElementsByTagName('span')) {
                           v.link = v.dataset.introlink
                           if (v.classList.contains('iText')) lib.setIntro(v)
                        }
                     }
                  }
                  var modepack = lib.characterPack['mode_' + get.mode()];
                  if (lib.config.show_favourite &&
                     lib.character[node.link] && (!modepack || !modepack[node.link]) && (!simple || get.is.phoneLayout())) {
                     var addFavourite = ui.create.div('.text.center.pointerdiv');
                     addFavourite.link = node.link;
                     addFavourite.style.marginBottom = '15px';
                     if (lib.config.favouriteCharacter.contains(node.link)) {
                        addFavourite.innerHTML = '移除收藏';
                     }
                     else {
                        addFavourite.innerHTML = '添加收藏';
                     }
                     addFavourite.listen(ui.click.favouriteCharacter)
                     uiintro.add(addFavourite);
                  }
                  else {
                     uiintro.add(ui.create.div('.placeholder.slim'));
                  }
                  var addskin = false;
                  if (node.parentNode.classList.contains('menu-buttons')) {
                     addskin = !lib.config.show_charactercard;
                  }
                  else {
                     addskin = lib.config.change_skin || lib.skin;
                  }
                  if (addskin && (!simple || get.is.phoneLayout())) {
                     var num = 1;
                     var introadded = false;
                     var nameskin = node.link;
                     var nameskin2 = nameskin;
                     var gzbool = false;
                     if (nameskin.indexOf('gz_shibing') == 0) {
                        nameskin = nameskin.slice(3, 11);
                     }
                     else if (nameskin.indexOf('gz_') == 0) {
                        nameskin = nameskin.slice(3);
                        gzbool = true;
                     }
                     var createButtons = function (num) {
                        if (!num) return;
                        if (!introadded) {
                           introadded = true;
                           uiintro.add('<div class="text center">更改皮肤</div>');
                        }
                        var buttons = ui.create.div('.buttons.smallzoom.scrollbuttons');
                        lib.setMousewheel(buttons);
                        for (var i = 0; i <= num; i++) {
                           var button = ui.create.div('.button.character.pointerdiv', buttons, function () {
                              if (this._link) {
                                 lib.config.skin[nameskin] = this._link;
                                 node.style.backgroundImage = this.style.backgroundImage;
                                 game.saveConfig('skin', lib.config.skin);
                              }
                              else {
                                 delete lib.config.skin[nameskin];
                                 if (gzbool && lib.character[nameskin2][4].contains('gzskin') && lib.config.mode_config.guozhan.guozhanSkin) node.setBackground(nameskin2, 'character');
                                 else node.setBackground(nameskin, 'character');
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
                        uiintro.add(buttons);
                     };
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
                        setTimeout(function () {
                           createButtons(lib.skin[nameskin]);
                        });
                     }
                  }
               }
            }
            else if (node.classList.contains('iText')) {
               if (node.curUiintro) node.curUiintro.close();
               let name = node.link;
               if (lib.translate[name + '_info']) {
                  node.curUiintro = uiintro
                  translation = lib.translate[name + '_ab'] || get.translation(name).slice(0, 5);
                  if (lib.skill[name] && lib.skill[name].nobracket) {
                     uiintro.add('<div><div class="skilln">' + get.translation(name) + '</div><div' + ((get.translation(name).length > 3) ? ' class="skilltext"' : '') + '>' + get.skillInfoTranslation(name) + '</div></div>');
                  }
                  else {
                     uiintro.add('<div><div class="skill">' + translation + '</div><div' + ((translation.length > 3) ? ' class="skilltext"' : '') + '>' + get.skillInfoTranslation(name) + '</div></div>');
                  }
                  if (lib.translate[name + '_append']) {
                     uiintro._place_text = uiintro.add('<div class="text">' + lib.translate[name + '_append'] + '</div>')
                  }
               }
            }
            else if (node.classList.contains('equips') && ui.arena.classList.contains('selecting')) {
               (function () {
                  uiintro.add('选择装备');
                  uiintro.addSmall(Array.from(node.childNodes), true);
                  uiintro.clickintro = true;
                  ui.control.hide();
                  uiintro._onclose = function () {
                     ui.control.show();
                  }
                  var confirmbutton;
                  for (var i = 0; i < uiintro.buttons.length; i++) {
                     var button = uiintro.buttons[i];
                     button.classList.add('pointerdiv');
                     if (button.link.classList.contains('selected')) {
                        button.classList.add('selected');
                     }
                     button.listen(function (e) {
                        ui.click.card.call(this.link, 'popequip');
                        ui.click.window.call(ui.window, e);
                        if (this.link.classList.contains('selected')) {
                           this.classList.add('selected');
                        }
                        else {
                           this.classList.remove('selected');
                        }
                        if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf('o') != -1) {
                           confirmbutton.classList.remove('disabled');
                        }
                        else {
                           confirmbutton.classList.add('disabled');
                        }
                     });
                  }
                  var buttoncontainer = uiintro.add(ui.create.div());
                  buttoncontainer.style.display = 'block';
                  confirmbutton = ui.create.div('.menubutton.large.pointerdiv', '确定', function () {
                     if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf('o') != -1) {
                        uiintro._clickintro();
                        ui.click.ok(ui.confirm.firstChild);
                     }
                  }, buttoncontainer);
                  confirmbutton.style.position = 'relative';
                  setTimeout(function () {
                     if (ui.confirm && ui.confirm.str && ui.confirm.str.indexOf('o') != -1) {
                        confirmbutton.classList.remove('disabled');
                     }
                     else {
                        confirmbutton.classList.add('disabled');
                     }
                  }, 300);
               }());
            }
            else if (node.classList.contains('identity') && node.dataset.career) {
               var career = node.dataset.career;
               uiintro.add(get.translation(career));
               uiintro.add('<div class="text center" style="padding-bottom:5px">' + lib.translate['_' + career + '_skill_info'] + '</div>');
            }
            else if (node.classList.contains('skillbar')) {
               if (node == ui.friendBar) {
                  uiintro.add('友方怒气值');
                  uiintro.add('<div class="text center" style="padding-bottom:5px">' + _status.friendRage + '/100</div>');
               }
               else if (node == ui.enemyBar) {
                  uiintro.add('敌方怒气值');
                  uiintro.add('<div class="text center" style="padding-bottom:5px">' + _status.enemyRage + '/100</div>');
               }
            }
            else if (node.parentNode == ui.historybar) {
               if (node.dead) {
                  if (!node.source || node.source == node.player) {
                     uiintro.add('<div class="text center">' + get.translation(node.player) + '阵亡</div>');
                     uiintro.addSmall([node.player]);
                  }
                  else {
                     uiintro.add('<div class="text center">' + get.translation(node.player) + '被' + get.translation(node.source) + '杀害</div>');
                     uiintro.addSmall([node.source]);
                  }
               }
               if (node.skill) {
                  uiintro.add('<div class="text center">' + get.translation(node.skill, 'skill') + '</div>');
                  uiintro._place_text = uiintro.add('<div class="text" style="display:inline">' + get.translation(node.skill, 'info') + '</div>');
               }
               if (node.targets && get.itemtype(node.targets) == 'players') {
                  uiintro.add('<div class="text center">目标</div>');
                  uiintro.addSmall(node.targets);
               }
               if (node.players && node.players.length > 1) {
                  uiintro.add('<div class="text center">使用者</div>');
                  uiintro.addSmall(node.players);
               }
               if (node.cards && node.cards.length) {
                  uiintro.add('<div class="text center">卡牌</div>');
                  uiintro.addSmall(node.cards);
               }
               for (var i = 0; i < node.added.length; i++) {
                  uiintro.add(node.added[i]);
               }
               if (node.added.length) {
                  uiintro.add(ui.create.div('.placeholder.slim'));
               }
               if (uiintro.content.firstChild) {
                  uiintro.content.firstChild.style.paddingTop = '3px';
               }
            }
            if (lib.config.touchscreen) {
               lib.setScroll(uiintro.contentContainer);
            }
            return uiintro;
         },
         linkintro: function (dialog, content, player) {
            dialog.content.firstChild.remove();
            dialog.add('<div class="text center">已横置</div>');
            var list = [];
            for (var i = 0; i < game.players.length; i++) {
               if (game.players[i].isLinked() && game.players[i].name && game.players[i].name.indexOf('unknown') != 0) {
                  list.push(game.players[i]);
               }
            }
            if (list.length) {
               dialog.add(list, true, true);
            }
         },
         groups: function () {
            return [...lib.group].remove('shen');
         },
         types: function () {
            var types = [];
            for (var i in lib.card) {
               if (lib.card[i].mode && lib.card[i].mode.contains(lib.config.mode) == false) continue;
               if (lib.card[i].forbid && lib.card[i].forbid.contains(lib.config.mode)) continue;
               if (lib.card[i].type) {
                  if (lib.card[i].type == 'delay') types.add('trick');
                  else types.add(lib.card[i].type);
               }
            }
            return types;
         },
         links: function (buttons) {
            var links = [];
            for (var i = 0; i < buttons.length; i++) {
               if (buttons[i].link != undefined) links.push(buttons[i].link);
            }
            return links;
         },
         /**
          * 返回目标对一个角色$P$的嘲讽值$threaten$，即这个角色对目标的仇恨度，该值越高越容易被攻击，这个值与目标角色$T$有嘲讽值`info.ai.threaten`的技能$S_n$，以及目标角色的血量$h$和手牌数量$c$有关，计算公式如下:
          * <p>
          * \begin{align*}
          * {threaten} & = \alpha{F(h,c)}\\
          * \alpha & = \left\{\begin{aligned}&1,\,n = 0\\
          * &\prod_{i=1}^{n-1}{f(S_i)},\,n \geq 1\\
          * \end{aligned}\right.\\
          * {f(x)} & = \left\{\begin{aligned}{S_i.ai.threaten},\,\textrm{threaten是number类型}\\
          * S_i.ai.threaten(P, T),\,\textrm{threaten为function类型}
          * \end{aligned}\right.\\
          * {F(x, y)} & = \left\{\begin{aligned}&1,\,\textrm{不计算血量和手牌的影响}\\
          * &g(x)g(y),\,\textrm{计算血量和手牌的影响}\\
          * \end{aligned}\right.\\
          * {g(x)} & = \left\{\begin{aligned}&1.5,\,x = 0\\
          * &1.2,\,x = 1\\
          * &1,\,x \not = 0 \land x \not = 1
          * \end{aligned}\right.
          * \end{align*}
          * </p>
          * @param {?GameCores.GameObjects.Player} [player] 角色，如果未指定，使用当前事件角色；如果为false，角色为空，忽略此参数
          * @param {GameCores.GameObjects.Player} [target] 目标，如果未指定，使用`player`
          * @param {?boolean} [hp] 目标角色的血量和手牌数量是否影响嘲讽值，如果为true，会返回计算影响后的嘲讽值；如果为false或未指定，不影响结果
          * @returns {number}
          */
         threaten: function (target, player, hp) {
            var threaten = 1;
            var skills = target.getSkills();
            if (!player && player !== false) {
               player = _status.event.player;
            }
            for (var i = 0; i < skills.length; i++) {
               var info = get.info(skills[i]);
               if (info && info.ai && info.ai.threaten) {
                  if (typeof info.ai.threaten == 'function' && player) {
                     var tmp = info.ai.threaten(player, target);
                     if (typeof tmp == 'number') {
                        threaten *= tmp;
                     }
                  }
                  else if (typeof info.ai.threaten == 'number') {
                     threaten *= info.ai.threaten;
                  }
               }
            }
            if (hp) {
               switch (target.hp) {
                  case 0: threaten *= 1.5; break;
                  case 1: threaten *= 1.2; break;
               }
               switch (target.countCards('h')) {
                  case 0: threaten *= 1.5; break;
                  case 1: threaten *= 1.2; break;
               }
            }
            return threaten;
         },
         /**
          * 返回一个角色状态值$condition$，这个值受角色血量$h$、手牌数量$H$、装备收益$E_n$影响，计算公式如下:
          * <p>
          * \begin{align*}
          * {condition} & = \left\{\begin{aligned}
          * & {h}+\frac{H}{2},\,n=0 \\
          * & {h}+\frac{H}{2}+\sum_{i=0}^{n-1}{M(E_i)},\,n\geq1
          * \end{aligned}\right.\\
          * {M(x)} & = \left\{\begin{aligned}
          * & 0.8,\,x\geq7\\
          * & 0.5,\,x\geq5\\
          * & 0.2,\,x\geq3\\
          * & 0,\,x<3
          * \end{aligned}\right.\\
          * E_n & = {get.equipValueNumber(equips[n])}\\
          * {equips} & = {player.getCards('e')}
          * \end{align*}
          * </p>
          * @param {GameCores.GameObjects.Player} player 要计算的角色
          * @returns {number}
          * @see {@link get.equipValueNumber}
          */
         condition: function (player) {
            var num = player.hp;
            if (num > 4) {
               num = 4 + Math.sqrt(num - 4);
            }
            else {
               if (player.isHealthy()) {
                  if (player.hp == 3) {
                     num += 0.5;
                  }
                  else if (player.hp < 3) {
                     num++;
                  }
               }
            }
            num += player.countCards('h') / 2;
            var es = player.getCards('e');
            for (var i = 0; i < es.length; i++) {
               var val = get.equipValueNumber(es[i]);
               if (val >= 7) num += 0.8;
               if (val >= 5) num += 0.5;
               if (val >= 3) num += 0.2;
            }
            return num;
         },
         /**
          * 返回一个角色对目标角色的态度值，正值为友方，负值为敌方；
          * 如果这个角色处于混乱状态，则对友方的态度变负、对敌方的态度变正，态度值为原来的相反数；
          * 此后，
          * 如果目标角色处于混乱状态，当态度值为正值时，返回0；当态度值为正值，目标角色的身份为主公时返回1
          * @param {!GameCores.GameObjects.Player} from 参考角色，如果未指定，会返回0
          * @param {!GameCores.GameObjects.Player} to 目标角色，如果未指定，会返回0
          * @returns {number}
          */
         attitude: function (from, to) {
            if (!from || !to) return 0;
            from = from._trueMe || from;
            arguments[0] = from;
            var att = get.rawAttitude.apply(this, arguments);
            if (from.isMad()) att = -att;
            if (to.isMad() && att > 0) {
               if (to.identity == 'zhu') {
                  att = 1;
               }
               else {
                  att = 0;
               }
            }
            if (!_status.tempnofake) {
               _status.tempnofake = true;
               if (from.ai.modAttitudeFrom) {
                  att = from.ai.modAttitudeFrom(from, to, att);
               }
               if (to.ai.modAttitudeTo) {
                  att = to.ai.modAttitudeTo(from, to, att);
               }
               delete _status.tempnofake;
            }
            return att;
         },
         /**
          * 返回态度值的符号
          * @param {...any} args 此函数的参数会作为{@link get.attitude}的参数调用
          * @returns {number} (-1|0|1)
          */
         sgnAttitude: function () {
            return get.sgn(get.attitude.apply(this, arguments));
         },
         /**
          * 返回牌的留牌收益(`info.ai.useful`|`info.ai.basic.useful`)，留牌收益低的牌，在弃牌时会被丢弃，而留牌收益高的则会保留；
          * 如果`card._modUseful`存在，则返回`card._modUseful()`；
          * 如果`useful`是函数，则留牌收益值为`useful(card, cardIndex)`，`cardIndex`为`card`在当前事件角色`player`手牌中同名(`card.name`)牌数组中的索引，如果(当前事件没有角色|没有找到此牌)，`cardIndex`为0
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象
          * @returns {number} 如果是判定区的牌，返回-1；如果 `useful`未定义，此函数返回-1(`useful`默认为-1)
          */
         useful: function (card, player) {
            if (get.position(card) == 'j') return -1;
            if (get.position(card) == 'e') return get.equipValue(card);
            if (card._modUseful) {
               return card._modUseful();
            }
            var i = 0;
            player = player || _status.event.player;
            if (player) {
               i = player.getCards('h', card.name).indexOf(card);
               if (i < 0) i = 0;
            }
            var aii = get.info(card).ai;
            var useful;
            if (aii && aii.useful) useful = aii.useful;
            else if (aii && aii.basic) useful = aii.basic.useful;
            var result;
            if (useful == undefined) result = -1;
            else if (typeof useful == 'function') {
               result = useful(card, i);
            }
            else if (typeof useful == 'number') result = useful;
            else if (i < useful.length) {
               result = useful[i];
            }
            else result = useful[useful.length - 1];
            result = game.checkMod(player, card, result, 'aiUseful', player);
            return result;
         },
         /**
          * 返回牌的留牌收益，但是此函数返回的留牌收益为原留牌收益的相反数
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象
          * @returns {!number}
          */
         unuseful: function (card) {
            return -get.useful(card);
         },
         /**
          * 返回牌的留牌收益，但是此函数返回的留牌收益为`10 - oriUseful`，oriUseful为原留牌收益
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象
          * @returns {!number}
          */
         unuseful2: function (card) {
            return 10 - get.useful(card);
         },
         /**
          * 返回牌的留牌收益，但是此函数返回的留牌收益为`10 - oriUseful`，oriUseful为原留牌收益；
          * 一种特别的情况是，游戏牌的牌名(card.name)为'du'，此时返回20
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象
          * @returns {!number}
          */
         unuseful3: function (card) {
            if (card.name == 'du') return 20;
            return 10 - get.useful(card);
         },
         /**
          * 返回一个角色$P$当前使用一组游戏牌$C_n$的收益值$value$，受`method`$m$影响，计算公式:
          * <p>
          * \begin{align*}
          * {value} & = \frac{\sum_{i=0}^{n-1}F(C_i)}{\sqrt{n}}\\
          * {F(x)} & = {get.value(x, P, m)}
          * \end{align*}
          * </p>
          * @name get.value
          * @function
          * @param {!Array<GameCores.GameObjects.Card>} cards 游戏牌数组。**注意**：一种特别的情况是，此数组为空数组，此时收益值为`0/0`，即`NaN`值
          * @param {?GameCores.GameObjects.Player} [player] 角色，如果未指定，使用当前事件角色
          * @param {?string} [method] 'raw'
          * @returns {number}
          */
         /**
          * 返回一个角色当前使用一张游戏牌的收益值(`info.ai.value`|`info.ai.basic.value`)；
          * 如果`card._modValue`存在，则返回`card._modValue(player, method)`；
          * 除此之外：
          * 如果`value`是函数，则收益值为`value(card, player, cardIndex, method)`，`cardIndex`为`card`在角色`player`手牌中同名(`card.name`)牌数组中的索引，如果`card`不在其中，返回同名牌数组的长度
          * 如果此角色有被动技**aiValue**，则返回改变后的收益值
          * @name get.value
          * @function
          * @variation 2
          * @param {(!GameCores.GameObjects.Card)} card 游戏牌对象
          * @param {?GameCores.GameObjects.Player} [player] 角色，如果未指定，使用当前事件角色
          * @param {?string} [method] 'raw'
          * @returns {number}
          */
         value: function (card, player, method) {
            var result = 0;
            var value;
            if (Array.isArray(card)) {
               value = 0;
               for (var i = 0; i < card.length; i++) {
                  value += get.value(card[i], player, method);
               }
               return value / Math.sqrt(card.length);
            }
            if (card._modValue) {
               return card._modValue(player, method);
            }
            var aii = get.info(card).ai;
            if (aii && aii.value) value = aii.value;
            else if (aii && aii.basic) value = aii.basic.value;
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            var geti = function () {
               var num = 0, i;
               var cards = player.getCards('hs', card.name);
               if (cards.contains(card)) {
                  return cards.indexOf(card);
               }
               return cards.length;
            };
            if (typeof value == 'function') {
               result = value(card, player, geti(), method);
            }
            if (typeof value == 'number') result = value;
            if (Array.isArray(value)) {
               if (method == 'raw') result = value[0];//??
               var num = geti();
               if (num < value.length) result = value[num];
               else result = value[value.length - 1];
            }
            result = game.checkMod(player, card, result, 'aiValue', player);
            return result;
         },
         /**
          * 返回装备收益，如果**原装备收益大于0而且不需要弃牌**的时候，就不用装备(除非装备牌有tag`valueswap`)，返回0值；
          * 此函数返回的装备收益$equipValue$正比于新装备的装备收益$v$与原装备$v_{0}$的差值，
          * 其计算公式如下:
          * $${equipValue}=\frac{max(0, {v}-{v_{0}})}{5}$$
          * @param {GameCores.GameObjects.Player} player [never used]牌的使用者
          * @param {GameCores.GameOjbects.Player} target 装备牌的角色
          * @param {!string} name 装备牌牌名，如果当前没有选择的牌或那个牌的牌名与此牌名不同，使用`{name:name}`
          * @returns {number}
          */
         equipResult: function (player, target, name) {
            var card = get.card();
            if (!card || card.name != name) {
               card = { name: name };
            }
            var value1 = get.equipValue(card, target);
            var value2 = 0;
            var current = target.getEquip(card);
            if (current && current != card) {
               value2 = get.equipValue(current, target);
               if (value2 > 0 && !target.needsToDiscard() && !get.tag(card, 'valueswap')) {
                  return 0;
               }
            }
            return Math.max(0, value1 - value2) / 5;
         },
         /**
          * 返回游戏牌的装备收益(`info.ai.equipValue`|`info.ai.basic.equipValue`)；
          * 如果装备收益未定义，返回0值；
          * 如果`equipValue`是函数，则装备收益为`equipValue(card, player, null, 'raw2')`，其中`player`为装备的目标角色，`card`与`player`不会为空值
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象，除了牌名外其他属性或函数可以为空
          * @param {?GameCores.GameObjects.Player} [player] 装备的目标角色，如果未指定，使用游戏牌`card`的所属角色，如果`card`没有所属角色，使用当前事件角色
          * @returns {!number}
          */
         equipValue: function (card, player) {
            if (player == undefined || get.itemtype(player) != 'player') player = get.owner(card);
            if (player == undefined || get.itemtype(player) != 'player') player = _status.event.player;
            var info = get.info(card);
            if (!info.ai) return 0;
            var value = info.ai.equipValue;
            if (value == undefined) {
               if (info.ai.basic && info.ai.basic.equipValue != undefined) {
                  value = info.ai.basic.equipValue;
               }
               else return 0;
            }
            if (typeof value == 'number') return value;
            if (typeof value == 'function') return value(card, player, null, 'raw2');
            return 0;
         },
         /**
          * 返回游戏牌的装备收益(`info.ai.equipValue`|`info.ai.basic.equipValue`)；
          * 如果装备收益未定义或者`equipValue`不是'number'类型，返回0值
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象，除了牌名外其他属性或函数可以为空
          * @returns {number}
          */
         equipValueNumber: function (card) {
            var info = get.info(card);
            if (info.ai) {
               if (typeof info.ai.equipValue == 'number') return info.ai.equipValue;
               if (info.ai.basic && typeof info.ai.basic.equipValue == 'number') return info.ai.basic.equipValue;
            }
            return 0;
         },
         /**
          * 返回一个角色使用一张游戏牌的收益值，但是此函数返回的收益值是计算收益值的相反数
          * @param {GameCores.GameObjects.Card} card 游戏牌对象
          * @param {GameCores.GameObjects.Player} player 角色
          * @returns {number}
          */
         disvalue: function (card, player) {
            return -get.value(card, player);
         },
         /**
          * 返回一个角色使用一张游戏牌的收益值，但是此函数返回的收益值是原收益值的相反数
          * @param {GameCores.GameObjects.Card} card 游戏牌对象
          * @param {GameCores.GameObjects.Player} player 角色
          * @returns {number}
          */
         disvalue2: function (card, player) {
            return -get.value(card, player, 'raw');
         },
         /**
          * 返回目标对一个角色的使用某个技能的嘲讽值(对应技能的`info.ai.threaten`)，即这个角色对目标的仇恨度，该值越高越容易被攻击；
          * 如果`threaten`是函数，则嘲讽值为函数的返回值；
          * 该函数会以`order(player, target)`调用`threaten`
          * @param {!string} skill 技能名
          * @param {?GameCores.GameObjects.Player} [player] 角色，如果未指定，使用当前事件角色
          * @param {GameCores.GameObjects.Player} [target] 目标，如果未指定，使用`player`
          * @returns {number} 如果没有找到技能，返回1；如果 `info.ai.threaten`未定义，此函数返回1(`threaten`默认为1)
          */
         skillthreaten: function (skill, player, target) {
            if (!lib.skill[skill]) return 1;
            if (!lib.skill[skill].ai) return 1;
            var threaten = lib.skill[skill].ai.threaten;
            if (typeof threaten == 'number') return threaten;
            if (typeof threaten == 'function') {
               player = player || _status.event.player;
               target = target || player;
               return threaten(player, target);
            }
            return 1;
         },
         /**
          * 返回(技能使用|游戏牌发动)的优先级(`info.ai.order`|`info.ai.basic.order`)；
          * 如果`order`是函数，则优先级为函数的返回值；
          * 该函数会以`order(item, _status.event.player)`调用`order`，`_status.event.player`为当前事件角色；
          * 如果当前事件角色有被动技**aiOrder**，则返回改变后的优先级
          * @param {(string|GameCores.GameObjects.Card)} item 技能名或游戏牌对象，游戏牌对象除牌名外其他属性或函数可以为空
          * @returns {!number} 如果`{@link get.info() get.info(item)}`返回undefined，此函数返回-1；如果`info.ai.order`或`info.ai.basic.order`未定义，此函数返回-1
          */
         order: function (item) {
            var info = get.info(item);
            if (!info) return -1;
            var aii = info.ai;
            var order;
            if (aii && aii.order) order = aii.order;
            else if (aii && aii.basic) order = aii.basic.order;
            if (order == undefined) return -1;
            var num = order;
            if (typeof (order) == 'function') {
               num = order(item, _status.event.player);
            }
            if (typeof item == 'object' && _status.event.player) {
               var player = _status.event.player;
               num = game.checkMod(player, item, num, 'aiOrder', player);
            }
            return num;
         },
         /**
          * 返回`get.info(item).ai.result`的浅拷贝对象，如果`ai.result`是函数，返回`get.info(item).ai.result(item)`
          * @private
          * @param {GameCores.GameObjects.Card} item 
          * @param {?} skill 
          * @returns {!Object}
          */
         result: function (item, skill) {
            var result;
            var info = get.info(item);
            if (info.ai) result = get.copy(info.ai.result);
            if (typeof (result) == 'function') result = result(item);
            if (!result) result = {};
            if (skill) {
               var info2 = get.info(skill);
               if (info2.ai) {
                  info2 = info2.ai.result;
                  for (var i in info2) {
                     result[i] = info2[i];
                  }
               }
            }
            return result;
         },
         /**
          * 返回源对目标使用一张游戏牌的效果值
          * @param {GameCores.GameObjects.Player} target 目标
          * @param {*} card 
          * @param {?GameCores.GameObjects.Player} [player] 源，如果未指定，使用当前事件角色
          * @param {?GameCores.GameObjects.Player} player2 观察者
          * @param {?boolean} [isLink] 
          * @returns {number}
          */
         effect_use: function (target, card, player, player2, isLink) {
            var Evt = _status.event;
            var eventskill = null;
            if (player == undefined) player = _status.event.player;
            if (typeof card != 'string' && (typeof card != 'object' || !card.name)) {
               var skillinfo = get.info(Evt.skill);
               if (Evt.skill && skillinfo.viewAs == undefined) card = _status.event.skill;
               else {
                  card = get.card();
                  if (skillinfo && skillinfo.viewAs && card.name === skillinfo.viewAs.name) {
                     eventskill = Evt.skill;
                  }
               }
            }
            var info = get.info(card);
            if (typeof card == 'object' && info && info.changeTarget) {
               var targets = [target];
               info.changeTarget(player, targets);
               var eff = 0;
               for (var i of targets) {
                  eff += get.effect(i, card, player, player2, isLink);
               }
               return eff;
            }
            var result = get.result(card, eventskill);
            var result1 = result.player_use || result.player, result2 = result.target_use || result.target;
            if (typeof result1 == 'function') result1 = result1(player, target, card, isLink);
            if (typeof result2 == 'function') result2 = result2(player, target, card, isLink);

            if (typeof result1 != 'number') result1 = 0;
            if (typeof result2 != 'number') result2 = 0;
            var temp1, temp2, temp3, temp01 = 0, temp02 = 0, threaten = 1;
            var skills1 = player.getSkills().concat(lib.skill.global);
            game.expandSkills(skills1);
            var zerotarget = false, zeroplayer = false;
            for (var i = 0; i < skills1.length; i++) {
               temp1 = get.info(skills1[i]).ai;
               if (temp1 && typeof temp1.effect == 'object' && typeof temp1.effect.player_use == 'function') {
                  temp1 = temp1.effect.player_use(card, player, target, result1, isLink);
               }
               else if (temp1 && typeof temp1.effect == 'object' && typeof temp1.effect.player == 'function') {
                  temp1 = temp1.effect.player(card, player, target, result1, isLink);
               }
               else temp1 = undefined;
               if (typeof temp1 == 'object') {
                  if (temp1.length == 2 || temp1.length == 4) {
                     result1 *= temp1[0];
                     temp01 += temp1[1];
                  }
                  if (temp1.length == 4) {
                     result2 *= temp1[2];
                     temp02 += temp1[3];
                  }
               }
               else if (typeof temp1 == 'number') {
                  result1 *= temp1;
               }
               else if (temp1 == 'zeroplayer') {
                  zeroplayer = true;
               }
               else if (temp1 == 'zerotarget') {
                  zerotarget = true;
               }
               else if (temp1 == 'zeroplayertarget') {
                  zeroplayer = true;
                  zerotarget = true;
               }
            }
            if (target) {
               var skills2 = target.getSkills().concat(lib.skill.global);
               game.expandSkills(skills2);
               for (var i = 0; i < skills2.length; i++) {
                  temp2 = get.info(skills2[i]).ai;
                  if (temp2 && temp2.threaten) temp3 = temp2.threaten;
                  else temp3 = undefined;
                  if (temp2 && typeof temp2.effect == 'function') {
                     if (!player.hasSkillTag('ignoreSkill', true, {
                        card: card,
                        target: target,
                        skill: skills2[i],
                        isLink: isLink,
                     })) temp2 = temp2.effect(card, player, target, result2, isLink);
                     else temp2 = undefined;
                  }
                  else if (temp2 && typeof temp2.effect == 'object' && typeof temp2.effect.target_use == 'function') {
                     if (!player.hasSkillTag('ignoreSkill', true, {
                        card: card,
                        target: target,
                        skill: skills2[i],
                        isLink: isLink,
                     })) temp2 = temp2.effect.target_use(card, player, target, result2, isLink);
                     else temp2 = undefined;
                  }
                  else if (temp2 && typeof temp2.effect == 'object' && typeof temp2.effect.target == 'function') {
                     if (!player.hasSkillTag('ignoreSkill', true, {
                        card: card,
                        target: target,
                        skill: skills2[i],
                        isLink: isLink,
                     })) temp2 = temp2.effect.target(card, player, target, result2, isLink);
                     else temp2 = undefined;
                  }
                  else temp2 = undefined;
                  if (typeof temp2 == 'object') {
                     if (temp2.length == 2 || temp2.length == 4) {
                        result2 *= temp2[0];
                        temp02 += temp2[1];
                     }
                     if (temp2.length == 4) {
                        result1 *= temp2[2];
                        temp01 += temp2[3];
                     }
                  }
                  else if (typeof temp2 == 'number') {
                     result2 *= temp2;
                  }
                  else if (temp2 == 'zeroplayer') {
                     zeroplayer = true;
                  }
                  else if (temp2 == 'zerotarget') {
                     zerotarget = true;
                  }
                  else if (temp2 == 'zeroplayertarget') {
                     zeroplayer = true;
                     zerotarget = true;
                  }
                  if (typeof temp3 == 'function' && temp3(player, target) != undefined) {
                     threaten *= temp3(player, target);
                  }
                  else if (typeof temp3 == 'object') {
                     if (typeof temp3.target == 'number') {
                        threaten *= temp3;
                     }
                     else if (typeof temp3.target == 'function' && temp3(player, target) != undefined) {
                        threaten *= temp3(player, target);
                     }
                  }
                  else if (typeof temp3 == 'number') {
                     threaten *= temp3;
                  }
               }
               result2 += temp02;
               result1 += temp01;
               if (get.attitude(player, target) < 0) {
                  result2 *= Math.sqrt(threaten);
               }
               else {
                  result2 *= Math.sqrt(Math.sqrt(threaten));
               }
               if (target.hp == 1) result2 *= 2.5;
               if (target.hp == 2) result2 *= 1.8;
               if (target.countCards('h') == 0) {
                  if (get.tag(card, 'respondSha') || get.tag(card, 'respondShan')) {
                     result2 *= 1.7;
                  }
                  else {
                     result2 *= 1.5;
                  }
               }
               if (target.countCards('h') == 1) result2 *= 1.3;
               if (target.countCards('h') == 2) result2 *= 1.1;
               if (target.countCards('h') > 3) result2 *= 0.5;
               if (target.hp == 4) result2 *= 0.9;
               if (target.hp == 5) result2 *= 0.8;
               if (target.hp > 5) result2 *= 0.6;
            }
            else {
               result2 += temp02;
               result1 += temp01;
            }
            if (zeroplayer) result1 = 0;
            if (zerotarget) result2 = 0;
            var final = 0;
            if (player2) {
               final = (result1 * get.attitude(player2, player) + (target ? result2 * get.attitude(player2, target) : 0));
            }
            else final = (result1 * get.attitude(player, player) + (target ? result2 * get.attitude(player, target) : 0));
            if (!isLink && get.tag(card, 'natureDamage') && !zerotarget) {
               var info = get.info(card);
               if (!info || !info.ai || !info.ai.canLink) {
                  if (target.isLinked()) game.countPlayer(function (current) {
                     if (current != target && current.isLinked()) final += get.effect(current, card, player, player2, true);
                  });
               }
               else if (info.ai.canLink(player, target, card)) {
                  game.countPlayer(function (current) {
                     if (current != target && current.isLinked()) final += get.effect(current, card, player, player2, true);
                  });
               }
            }
            return final;
         },
         /**
          * 返回一个角色对目标(使用一张游戏牌|造成伤害|回复血量)的效果值
          * @param {?GameCores.GameObjects.Player} target 目标
          * @param {!GameCores.GameObjects.Card} card 游戏牌对象，除了牌名，其他属性或函数可以为空
          * @param {?string} [card.name] 牌名，如果未指定，`card`使用`_status.event.skill`
          * @param {?GameCores.GameObjects.Player} [player] 角色，如果未指定，使用当前事件角色
          * @param {?GameCores.GameObjects.Player} player2 观察者
          * @param {?boolean} [isLink] 是否计算被链接的角色，如果为true，不计算；如果为false或未指定，对效果值$effect$，被链接的角色$P_n$(包括`target`)，游戏牌$C$，角色$P2$，观察者$O$，计算公式：${effect}=\sum_{i=0}^{n-1}{get.effect(P_i, C, P2, O, true)})$。
          * @returns {number}
          */
         effect: function (target, card, player, player2, isLink) {
            var Evt = _status.event;
            var eventskill = null;
            if (player == undefined) player = _status.event.player;
            if (typeof card != 'string' && (typeof card != 'object' || !card.name)) {
               var skillinfo = get.info(Evt.skill);
               if (Evt.skill && skillinfo.viewAs == undefined) card = _status.event.skill;
               else {
                  card = get.card();
                  if (skillinfo && skillinfo.viewAs && card.name === skillinfo.viewAs.name) {
                     eventskill = Evt.skill;
                  }
               }
            }
            var result = get.result(card, eventskill);
            var result1 = result.player, result2 = result.target;
            if (typeof result1 == 'function') result1 = result1(player, target, card, isLink);
            if (typeof result2 == 'function') result2 = result2(player, target, card, isLink);

            if (typeof result1 != 'number') result1 = 0;
            if (typeof result2 != 'number') result2 = 0;
            var temp1, temp2, temp3, temp01 = 0, temp02 = 0, threaten = 1;
            var skills1 = player.getSkills().concat(lib.skill.global);
            game.expandSkills(skills1);
            var zerotarget = false, zeroplayer = false;
            for (var i = 0; i < skills1.length; i++) {
               temp1 = get.info(skills1[i]).ai;
               if (temp1 && typeof temp1.effect == 'object' && typeof temp1.effect.player == 'function') {
                  temp1 = temp1.effect.player(card, player, target, result1, isLink);
               }
               else temp1 = undefined;
               if (typeof temp1 == 'object') {
                  if (temp1.length == 2 || temp1.length == 4) {
                     result1 *= temp1[0];
                     temp01 += temp1[1];
                  }
                  if (temp1.length == 4) {
                     result2 *= temp1[2];
                     temp02 += temp1[3];
                  }
               }
               else if (typeof temp1 == 'number') {
                  result1 *= temp1;
               }
               else if (temp1 == 'zeroplayer') {
                  zeroplayer = true;
               }
               else if (temp1 == 'zerotarget') {
                  zerotarget = true;
               }
               else if (temp1 == 'zeroplayertarget') {
                  zeroplayer = true;
                  zerotarget = true;
               }
            }
            if (target) {
               var skills2 = target.getSkills().concat(lib.skill.global);
               game.expandSkills(skills2);
               for (var i = 0; i < skills2.length; i++) {
                  temp2 = get.info(skills2[i]).ai;
                  if (temp2 && temp2.threaten) temp3 = temp2.threaten;
                  else temp3 = undefined;
                  if (temp2 && typeof temp2.effect == 'function') {
                     if (!player.hasSkillTag('ignoreSkill', true, {
                        card: card,
                        target: target,
                        skill: skills2[i],
                        isLink: isLink,
                     })) temp2 = temp2.effect(card, player, target, result2, isLink);
                     else temp2 = undefined;
                  }
                  else if (temp2 && typeof temp2.effect == 'object' && typeof temp2.effect.target == 'function') {
                     if (!player.hasSkillTag('ignoreSkill', true, {
                        card: card,
                        target: target,
                        skill: skills2[i],
                        isLink: isLink,
                     })) temp2 = temp2.effect.target(card, player, target, result2, isLink);
                     else temp2 = undefined;
                  }
                  else temp2 = undefined;
                  if (typeof temp2 == 'object') {
                     if (temp2.length == 2 || temp2.length == 4) {
                        result2 *= temp2[0];
                        temp02 += temp2[1];
                     }
                     if (temp2.length == 4) {
                        result1 *= temp2[2];
                        temp01 += temp2[3];
                     }
                  }
                  else if (typeof temp2 == 'number') {
                     result2 *= temp2;
                  }
                  else if (temp2 == 'zeroplayer') {
                     zeroplayer = true;
                  }
                  else if (temp2 == 'zerotarget') {
                     zerotarget = true;
                  }
                  else if (temp2 == 'zeroplayertarget') {
                     zeroplayer = true;
                     zerotarget = true;
                  }
                  if (typeof temp3 == 'function' && temp3(player, target) != undefined) {
                     threaten *= temp3(player, target);
                  }
                  else if (typeof temp3 == 'object') {
                     if (typeof temp3.target == 'number') {
                        threaten *= temp3;
                     }
                     else if (typeof temp3.target == 'function' && temp3(player, target) != undefined) {
                        threaten *= temp3(player, target);
                     }
                  }
                  else if (typeof temp3 == 'number') {
                     threaten *= temp3;
                  }
               }
               result2 += temp02;
               result1 += temp01;
               if (get.attitude(player, target) < 0) {
                  result2 *= Math.sqrt(threaten);
               }
               else {
                  result2 *= Math.sqrt(Math.sqrt(threaten));
               }
               // *** continue here ***
               if (target.hp == 1) result2 *= 2.5;
               if (target.hp == 2) result2 *= 1.8;
               if (target.countCards('h') == 0) {
                  if (get.tag(card, 'respondSha') || get.tag(card, 'respondShan')) {
                     result2 *= 1.7;
                  }
                  else {
                     result2 *= 1.5;
                  }
               }
               if (target.countCards('h') == 1) result2 *= 1.3;
               if (target.countCards('h') == 2) result2 *= 1.1;
               if (target.countCards('h') > 3) result2 *= 0.5;
               if (target.hp == 4) result2 *= 0.9;
               if (target.hp == 5) result2 *= 0.8;
               if (target.hp > 5) result2 *= 0.6;
               // if(get.attitude(player,target)<0){
               //     result2*=threaten;
               // }
               // else{
               //     result2*=Math.sqrt(threaten);
               // }
               // if(target.hp<=1) result2*=2;
               // if(target.hp==2) result2*=1.1;
               // if(target.countCards('h')==0){
               //     result2*=1.1;
               //     if(get.tag(card,'respondSha')||get.tag(card,'respondShan')) result2*=1.4;
               // }
               // if(target.countCards('h')==1) result2*=1.05;
               // if(target.countCards('h')==2) result2*=1.02;
               // if(target.countCards('h')>3) result2*=0.9;
               // if(target.hp==4) result2*=0.9;
               // if(target.hp==5) result2*=0.8;
               // if(target.hp>5) result2*=0.6;
            }
            else {
               result2 += temp02;
               result1 += temp01;
            }
            if (zeroplayer) result1 = 0;
            if (zerotarget) result2 = 0;
            var final = 0;
            if (player2) {
               final = (result1 * get.attitude(player2, player) + (target ? result2 * get.attitude(player2, target) : 0));
            }
            else final = (result1 * get.attitude(player, player) + (target ? result2 * get.attitude(player, target) : 0));
            if (!isLink && get.tag(card, 'natureDamage') && !zerotarget) {
               var info = get.info(card);
               if (!info || !info.ai || !info.ai.canLink) {
                  if (target.isLinked()) game.countPlayer(function (current) {
                     if (current != target && current.isLinked()) final += get.effect(current, card, player, player2, true);
                  });
               }
               else if (info.ai.canLink(player, target, card)) {
                  game.countPlayer(function (current) {
                     if (current != target && current.isLinked()) final += get.effect(current, card, player, player2, true);
                  });
               }
            }
            return final;
         },
         /**
          * 返回源对目标进行伤害的效果值
          * @param {GameCores.GameObjects.Player} target 目标
          * @param {?GameCores.GameObjects.Player} [player] 源，如果未指定，使用`target`
          * @param {?GameCores.GameObjects.Player} [viewer] 观察者，用于判断最后的效果是正效果(对观察者或其方有益)还是负效果(对观察者敌方有益)；如果未指定，使用`target`
          * @param {?string} [nature] 伤害属性，如果未指定，则非属性伤害
          * @returns {number}
          */
         damageEffect: function (target, player, viewer, nature) {
            if (!player) {
               player = target;
            }
            if (!viewer) {
               viewer = target;
            }
            var name = 'damage';
            if (nature == 'fire') {
               name = 'firedamage';
            }
            else if (nature == 'thunder') {
               name = 'thunderdamage';
            }
            else if (nature == 'ocean') {
               name = 'oceandamage';
            }
            else if (nature == 'ice') {
               name = 'icedamage';
            }
            else if (nature == 'yami') {
               name = 'yamidamage';
            }
            var eff = get.effect(target, { name: name }, player, viewer);
            if (eff > 0 && target.hujia > 0) return 0;
            return eff;
         },
         /**
          * 返回源对目标回复血量的效果值，如果目标当前没有损失血量，返回0值(无效果)
          * @param {GameCores.GameObjects.Player} target 目标
          * @param {?GameCores.GameObjects.Player} [player] 源，如果未指定，使用`target`
          * @param {?GameCores.GameObjects.Player} [viewer] 观察者，用于判断最后的效果是正效果(对观察者或其方有益)还是负效果(对观察者敌方有益)；如果未指定，使用`target`
          * @returns {number}
          */
         recoverEffect: function (target, player, viewer) {
            if (target.hp == target.maxHp) return 0;
            if (!player) {
               player = target;
            }
            if (!viewer) {
               viewer = target;
            }
            return get.effect(target, { name: 'recover' }, player, viewer);
         },
         /**
          * 返回按钮绑定(手牌|装备区|判定区|正在判定的)卡牌所属的角色使用此牌的收益
          * 如果是其他区域的牌，返回当前事件的角色使用此牌的收益，**这个时候**，此函数假定当前事件的角色(`_status.event.player`)存在，所以如果当前事件的角色未定义或者为空，此函数会报错
          * @param {HTMLDivElement} button 按钮，返回此按钮的收益
          * @returns {number}
          */
         buttonValue: function (button) {
            var card = button.link;
            var player = get.owner(card);
            if (!player) player = _status.event.player;
            if (player.getCards('j').contains(card)) {
               var efff = get.effect(player, {
                  name: card.viewAs || card.name,
                  cards: [card],
               }, player, player);
               if (efff > 0) return 0.5;
               if (efff == 0) return 0;
               return -1.5;
            }
            if (player.getCards('e').contains(card)) {
               var evalue = get.value(card, player);
               if (player.hasSkillTag('noe')) {
                  if (evalue >= 7) {
                     return evalue / 6;
                  }
                  return evalue / 10;
               }
               return evalue / 3;
            }
            if (player.hasSkillTag('noh')) return 0.1;
            var nh = player.countCards('h');
            switch (nh) {
               case 1: return 2;
               case 2: return 1.6;
               case 3: return 1;
               case 4: return 0.8;
               case 5: return 0.6;
               default: return 0.4;
            }
         },
         /**
          * 返回当前事件角色对一个角色的态度值
          * @param {GameCores.GameObjects.Player} to 一个角色，返回对该角色的态度值
          * @param {number}
          */
         attitude2: function (to) {
            return get.attitude(_status.event.player, to);
         },
      }
   }
}