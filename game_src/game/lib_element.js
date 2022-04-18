const { set } = require("core-js/core/dict");

{
  /**
   * 基础属性
   * @namespace
   */
  const { game, ui, get, ai, lib, _status } = vkCore
  module.exports = {
    /**
     * 内容方法，setContent所调用的方法，即事件的具体内容
     * 状态机
     * @name content
     * @namespace
     * @global
     */
    content: {
      resetRound: function () {
        let skill = Evt.resetSkill || Evt.name.slice(0, Evt.name.indexOf('_roundcount'));
        if (!player || !lib.skill[skill]) return;
        let roundname = skill + '_roundcount';
        if (player.storage[roundname] > 0) {
          player.storage[roundname]--
        }
        if (player.storage[roundname] > 0) {
          player.updateMarks();
        }
        else {
          player.unmarkSkill(roundname);
        }
      },
      //崭新出炉
      choosePromotion: [() => {
        let list = [];
        if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length) {
          Evt.finish();
          return;
        }
        for (let i of lib.cardPack.mode_derivation) {
          let info = lib.card[i];
          if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials)))
            list.push(i);
        }
        if (Evt.filterProduct)
          list = list.filter(Evt.filterProduct);
        Evt.list = list;
      }, () => {
        let next = player.chooseButton([Evt.prompt, '###额外区###（可以右键/长按查看合成路线）', [Evt.list, 'vcard'], '素材区', [Evt.materials, 'card'], 'hidden'], Evt.forced);
        next.set('filterButton', function (button) {
          let ub = ui.selected.buttons;
          if (get.itemtype(button.link) == 'card') {
            if (!ub.length)
              return false;
            let card = button.link;
            let scards = ub.slice(1).map(function (scard) {
              return scard.link;
            });
            let product = ub[0].link[2];
            scards = scards.filter(function (scard) {
              return get.itemtype(scard) == 'card';
            });
            if (_status.event.filterMaterial && !_status.event.filterMaterial(button.link, scards))
              return false;
            let filter = get.info({ name: product }).materials;
            if (Array.isArray(filter)) {
              if (filter.length > scards.length) {
                let mate = filter.slice(0);
                let smate = [];
                for (let j = 0; j < mate.length; j++) {
                  for (let k of scards) {
                    if (!smate.contains(k)) {
                      if (get.is.filterCardBy(k, mate[j])) {
                        smate.push(k);
                        mate.splice(j--, 1);
                      }
                    }
                  }
                }
                for (let j = 0; j < mate.length; j++) {
                  if (mate[j].number) console.log(mate[j], get.number(card))
                  if (get.is.filterCardBy(card, mate[j])) {
                    return true;
                  }
                }

              }
              return false;
            }
            return true;
          }
          if (ub.length)
            return false;
          return true;
        });
        next.set('selectButton', function () {
          let ub = ui.selected.buttons;
          if (ub.length) {
            let scards = ub.slice(1).map(function (scard) {
              return scard.link;
            });
            let product = ub[0].link[2];
            if (get.info({ name: product })) {
              let filter = get.info({ name: product }).materials;
              if (Array.isArray(filter)) {
                if (filter.length == scards.length) {
                  let mate = filter.slice(0);
                  for (let j = 0; j < mate.length; j++) {
                    for (let k of scards) {
                      if (get.is.filterCardBy(k, mate[j])) {
                        mate.splice(j--, 1);
                      }
                    }
                  }
                  if (mate.length == 0)
                    return ub.length;
                }
              }
            }
            else {
              ui.selected.buttons.length = 0
            }
          }
          return [ub.length + 1, ub.length + 2];
        });
        next.set('filterMaterial', Evt.filterMaterial);
        let fun = function () {
          if (!ui.promotionbutton)
            lib.init.sheet(`
              .promotionbutton{
                width: calc(90% - 100px);
                left: calc(5% + 50px);
              }`, `
              .promotion{
                transition: .5s;
              }`)
          return ui.create.control('切换弹窗大小', () => {
            ui.dialog.classList.add('promotion')
            ui.dialog.classList.toggle('promotionbutton')
            if (ui.dialog.classList.contains('promotionbutton')) {
              ui.dialog._heightset = 'calc(90% - 120px)'
              ui.dialog.promotionbutton = true
            }
            else {
              ui.dialog.style.height = ''
              ui.dialog.promotionbutton = false
            }
            ui.update()
          })
        }
        if (player.isOnline2()) {
          player.send(fun);
        }
        Evt.control = fun();
        if (player != game.me || _status.auto) {
          Evt.control.style.display = 'none';
        }
      }, () => {
        if (player.isOnline2()) {
          player.send(function () { ui.controls[0].close() });
        }
        Evt.control.close()
        if (result.bool) {
          let cards = result.links.slice(1);
          let star = game.createCard2(result.links[0][2], get.suit3(cards).randomGet(), 14);
          Evt.result = {
            bool: true,
            cards: cards,
            materials: cards,
            star: star,
          };
        }
        else
          Evt.result = { bool: false };
      }],
      emptyEvent: function () {
        Evt.trigger(Evt.name);
      },
      chooseToPlayBeatmap: function () {
        'step 0'
        if (game.online) return;
        if (_status.connectMode) event.time = lib.configOL.choose_timeout;
        event.videoId = lib.status.videoId++;
        //给其他角色看的演奏框
        game.broadcastAll(function (player, id, beatmap) {
          if (_status.connectMode) lib.configOL.choose_timeout = (Math.ceil((beatmap.timeleap[beatmap.timeleap.length - 1] + beatmap.speed * 100 + (beatmap.current || 0)) / 1000) + 5).toString();
          if (player == game.me) return;
          var str = get.translation(player) + '正在演奏《' + beatmap.name + '》...<br>';
          ui.create.dialog(str).videoId = id;
          if (ui.backgroundMusic) ui.backgroundMusic.pause();
          if (lib.config.background_audio) {
            if (beatmap.filename.indexOf('ext:') == 0) game.playAudio('..', 'extension', beatmap.filename.slice(4), beatmap.name);
            else game.playAudio('effect', beatmap.filename);
          }
        }, player, event.videoId, event.beatmap);
        'step 1'
        var beatmap = event.beatmap;
        if (event.isMine()) {
          var timeleap = beatmap.timeleap.slice(0);
          var current = beatmap.current;
          //获取两个音符的时间间隔
          var getTimeout = function () {
            var time = timeleap.shift();
            var out = time - current;
            current = time;
            return out;
          };
          //初始化一堆变量
          var score = 0;
          var added = timeleap.length;
          var abs = 1;
          var node_pos = 0;
          var combo = 0;
          var max_combo = 0;
          var nodes = [];
          var roundmenu = false;
          //隐藏菜单按钮
          if (ui.roundmenu && ui.roundmenu.display != 'none') {
            roundmenu = true;
            ui.roundmenu.style.display = 'none';
          }
          if (ui.backgroundMusic) ui.backgroundMusic.pause();
          var event = _status.event;
          event.settleed = false;
          //建个框框
          var dialog = ui.create.dialog('forcebutton', 'hidden');
          event.dialog = dialog;
          event.dialog.textPrompt = event.dialog.add('<div class="text center">' + (beatmap.prompt || '在音符滑条和底部判定区重合时点击屏幕！') + '</div>');
          event.switchToAuto = function () { };
          event.dialog.classList.add('fixed');
          event.dialog.classList.add('scroll1');
          event.dialog.classList.add('scroll2');
          event.dialog.classList.add('fullwidth');
          event.dialog.classList.add('fullheight');
          event.dialog.classList.add('noupdate');
          event.dialog.style.overflow = 'hidden';
          //结束后操作
          event.settle = function () {
            if (event.settleed) return;
            event.settleed = true;
            //评分
            var acc = Math.floor(score / (added * 5) * 100);
            var rank;
            if (acc == 100) rank = ['SS', 'metal'];
            else if (acc >= 94) rank = ['S', 'orange'];
            else if (acc >= 87) rank = ['A', 'wood'];
            else if (acc >= 80) rank = ['B', 'water'];
            else if (acc >= 65) rank = ['C', 'thunder'];
            else rank = ['D', 'fire'];
            event.dialog.textPrompt.innerHTML = '<div class="text center">演奏结束！<br>最大连击数：' + max_combo + '  精准度：' + acc + '%</div>';
            game.me.$fullscreenpop('<span style="font-family:xinwei">演奏评级：<span data-nature="' + rank[1] + '">' + rank[0] + '</span></span>', null, null, false);
            //返回结果并继续游戏
            setTimeout(function () {
              event._result = {
                bool: true,
                accuracy: acc,
                rank: rank,
              };
              event.dialog.close();
              game.resume();
              _status.imchoosing = false;
              if (roundmenu) ui.roundmenu.style.display = '';
              if (ui.backgroundMusic) ui.backgroundMusic.play();
            }, 1000);
          };
          event.dialog.open();
          //操作容差
          var height = event.dialog.offsetHeight;
          var width = event.dialog.offsetWidth;
          var range1 = (beatmap.range1 || [90, 110]);
          var range2 = (beatmap.range2 || [93, 107]);
          var range3 = (beatmap.range3 || [96, 104]);
          var speed = (beatmap.speed || 25);
          //初始化底部的条子
          var judger = ui.create.div('');
          judger.style["background-image"] = (beatmap.judgebar_color || 'linear-gradient(rgba(240, 235, 3, 1), rgba(230, 225, 5, 1))');
          judger.style["border-radius"] = '3px';
          judger.style.position = 'absolute';
          judger.style.opacity = '0.3';
          var heightj = Math.ceil(height * (beatmap.judgebar_height || 0.1));
          judger.style.height = heightj + 'px';
          judger.style.width = width + 'px';
          judger.style.left = '0px';
          judger.style.top = (height - heightj) + 'px';
          event.dialog.appendChild(judger);
          //生成每个音符
          var addNode = function () {
            var node = ui.create.div('');
            nodes.push(node);
            node.style["background-image"] = (beatmap.node_color || 'linear-gradient(rgba(120, 120, 240, 1), rgba(100, 100, 230, 1))');
            node.style["border-radius"] = '3px';
            node.style.position = 'absolute';
            node.style.height = Math.ceil(height / 10) + 'px';
            node.style.width = Math.ceil(width / 6) - 10 + 'px';
            node._position = get.utc();
            event.dialog.appendChild(node);

            node.style.left = Math.ceil(width * node_pos / 6 + 5) + 'px';
            node.style.top = '-' + (Math.ceil(height / 10)) + 'px';
            ui.refresh(node);
            node.style.transition = 'all ' + speed * 110 + 'ms linear';
            node.style.transform = 'translateY(' + Math.ceil(height * 1.1) + 'px)';
            node.timeout = setTimeout(function () {
              if (nodes.contains(node)) {
                nodes.remove(node);
                player.popup('Miss', 'fire', false);
                if (player.damagepopups.length) player.$damagepop();
                combo = 0;
              }
            }, speed * 110);

            node_pos += abs;
            if (node_pos > 5) {
              abs = -1;
              node_pos = 4;
            }
            else if (node_pos < 0) {
              abs = 1;
              node_pos = 1;
            }
            if (timeleap.length) {
              setTimeout(function () {
                addNode();
              }, getTimeout());
            }
            else {
              setTimeout(function () {
                event.settle();
              }, speed * 110 + 100)
            }
          }
          //点击时的判断操作
          var click = function () {
            if (!nodes.length) return;
            for (var node of nodes) {
              //用生成到点击的时间差来判断距离
              var time = get.utc();
              var top = (time - node._position) / speed;
              if (top > range1[1]) continue;
              else if (top < range1[0]) return;
              nodes.remove(node);
              clearTimeout(node.timeout);
              node.style.transform = '';
              node.style.transition = 'all 0s';
              node.style.top = (height * ((top - 10) / 100)) + 'px';
              ui.refresh(node);
              node.style.transition = 'all 0.5s';
              node.style.transform = 'scale(1.2)';
              node.delete();
              if (top >= range3[0] && top < range3[1]) {
                score += 5;
                player.popup('Perfect', 'orange', false);
              }
              else if (top >= range2[0] && top < range2[1]) {
                score += 3;
                player.popup('Great', 'wood', false);
              }
              else {
                score += 1;
                player.popup('Good', 'soil', false);
              }
              if (player.damagepopups.length) player.$damagepop();
              combo++;
              max_combo = Math.max(combo, max_combo);
              break;
            }
          };
          document.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', click);

          game.pause();
          game.countChoose();
          setTimeout(function () {
            if (lib.config.background_audio) {
              if (beatmap.filename.indexOf('ext:') == 0) game.playAudio('..', 'extension', beatmap.filename.slice(4), beatmap.name);
              else game.playAudio('effect', beatmap.filename);
            }
          }, Math.floor(speed * 100 * (0.9 + beatmap.judgebar_height)) + beatmap.current);
          setTimeout(function () {
            addNode();
          }, getTimeout());
        }
        else if (event.isOnline()) {
          event.send();
        }
        else {
          game.pause();
          game.countChoose();
          setTimeout(function () {
            _status.imchoosing = false;
            var acc = get.rand.apply(get, beatmap.aiAcc || [70, 100]);
            var rank;
            if (acc == 100) rank = ['SS', 'metal'];
            else if (acc >= 94) rank = ['S', 'orange'];
            else if (acc >= 87) rank = ['A', 'green'];
            else if (acc >= 80) rank = ['B', 'water'];
            else if (acc >= 65) rank = ['C', 'thunder'];
            else rank = ['D', 'fire'];
            event._result = {
              bool: true,
              accuracy: acc,
              rank: rank,
            };
            if (event.dialog) event.dialog.close();
            if (event.control) event.control.close();
            game.resume();
          }, beatmap.timeleap[beatmap.timeleap.length - 1] + beatmap.speed * 100 + 1000 + (beatmap.current || 0));
        }
        'step 2'
        game.broadcastAll(function (id, time) {
          if (_status.connectMode) lib.configOL.choose_timeout = time;
          var dialog = get.idDialog(id);
          if (dialog) {
            dialog.close();
          }
          if (ui.backgroundMusic) ui.backgroundMusic.play();
        }, event.videoId, event.time);
        var result = event.result || result;
        event.result = result;
      },
      chooseToMove: [() => {
        if (event.chooseTime && _status.connectMode && !game.online) {
          event.time = lib.configOL.choose_timeout;
          game.broadcastAll(function (time) {
            lib.configOL.choose_timeout = time;
          }, event.chooseTime);
        }
        if (event.isMine()) {
          delete ui.selected.guanxing_button;
          var list = event.list, filterMove = event.filterMove, filterOk = event.filterOk;
          _status.imchoosing = true;
          var event = _status.event;
          event.settleed = false;
          event.dialog = ui.create.dialog(event.prompt || '请选择要操作的牌', 'hidden', 'forcebutton');
          event.switchToAuto = function () {
            if (!filterOk(event.moved)) {
              if (!event.forced) event._result = { bool: false };
              else event._result = 'ai';
            }
            else {
              event._result = {
                bool: true,
                moved: event.moved,
              };
            }
            event.dialog.close();
            if (ui.confirm) ui.confirm.close();
            game.resume();
            _status.imchoosing = false;
          };
          event.dialog.classList.add('scroll1');
          event.dialog.classList.add('scroll2');
          event.dialog.classList.add('fullwidth');

          event.moved = [];
          var buttonss = [];
          event.buttonss = buttonss;
          var updateButtons = function () {
            for (var i of buttonss) {
              event.moved[i._link] = get.links(Array.from(i.childNodes));
              if (i.textPrompt) i.previousSibling.innerHTML = ('<div class="text center">' + i.textPrompt(event.moved[i._link]) + '</div>');
            }
            if (filterOk(event.moved)) {
              ui.create.confirm('o');
            }
            else {
              if (!event.forced) ui.create.confirm('c');
              else if (ui.confirm) ui.confirm.close();
            }
          };
          var clickButtons = function () {
            if (!ui.selected.guanxing_button) return;
            if (ui.selected.guanxing_button.parentNode == this) return;
            if (!filterMove(ui.selected.guanxing_button, this._link, event.moved)) return;
            ui.selected.guanxing_button.classList.remove('glow2');
            this.appendChild(ui.selected.guanxing_button);
            delete ui.selected.guanxing_button;
            updateButtons();
          };

          for (var i = 0; i < list.length; i++) {
            event.dialog.add('<div class="text center">' + list[i][0] + '</div>');
            var buttons = ui.create.div('.buttons', event.dialog.content, clickButtons);
            buttonss.push(buttons);
            buttons.classList.add('popup');
            buttons.classList.add('guanxing');
            buttons._link = i;
            if (list[i][1]) {
              ui.create.buttons(list[i][1], 'card', buttons);
            }
            if (list[i][2]) buttons.textPrompt = list[i][2];
          }
          event.dialog.open();
          updateButtons();

          event.custom.replace.button = function (button) {
            if (!ui.selected.guanxing_button) {
              ui.selected.guanxing_button = button;
              button.classList.add('glow2');
              return;
            }
            if (ui.selected.guanxing_button == button) {
              button.classList.remove('glow2');
              delete ui.selected.guanxing_button;
              return;
            }
            if (!filterMove(button, ui.selected.guanxing_button, event.moved)) return;
            var par1 = ui.selected.guanxing_button.parentNode, ind1 = ui.selected.guanxing_button.nextSibling, par2 = button.parentNode, ind2 = button.nextSibling;
            ui.selected.guanxing_button.classList.remove('glow2');
            par1.insertBefore(button, ind1);
            par2.insertBefore(ui.selected.guanxing_button, ind2);
            delete ui.selected.guanxing_button;
            updateButtons();
          }
          event.custom.replace.confirm = function (bool) {
            if (bool) event._result = {
              bool: true,
              moved: event.moved,
            };
            else event._result = { bool: false };
            event.dialog.close();
            if (ui.confirm) ui.confirm.close();
            game.resume();
            _status.imchoosing = false;
          };

          game.pause();
          game.countChoose();
          event.choosing = true;
        }
        else if (event.isOnline()) {
          event.send();
        }
        else {
          event.result = 'ai';
        }
      }, () => {
        if (event.time) game.broadcastAll(function (time) {
          lib.configOL.choose_timeout = time;
        }, event.time);
        var result = event.result || result;
        if ((!result || result == 'ai' || (event.forced && !result.bool)) && event.processAI) {
          var moved = event.processAI(event.list);
          if (moved) result = {
            bool: true,
            moved: moved,
          }
          else result = { bool: false };
        }
        event.result = result;
      }],
      showCharacter: [function () {
        Evt.trigger('showCharacterEnd');
      }, function () {
        Evt.trigger('showCharacterAfter');
        if (get.mode() == 'identity' && player.isZhu) Evt.trigger('zhuUpdate');
      }],
      removeCharacter: function () {
        player.$removeCharacter(Evt.num);
      },
      chooseUseTarget: [function () {
        if (get.is.object(card) && !Evt.viewAs) card.isCard = true;
        if (cards && get.itemtype(card) != 'card') {
          card = get.copy(card);
          card.cards = cards.slice(0);
          Evt.card = card;
        }
        if (!lib.filter.cardEnabled(card, player) || (Evt.addCount !== false && !lib.filter.cardUsable(card, player))) {
          Evt.result = { bool: false };
          Evt.finish();
          return;
        }
        let info = get.info(card);
        let range;
        if (!info.notarget) {
          let select = get.copy(info.selectTarget);
          if (select == undefined) {
            range = [1, 1];
          }
          else if (typeof select == 'number') range = [select, select];
          else if (get.itemtype(select) == 'select') range = select;
          else if (typeof select == 'function') range = select(card, player);
          game.checkMod(card, player, range, 'selectTarget', player);
        }
        if (info.notarget || range[1] == -1) {
          if (!info.notarget && range[1] == -1) {
            for (let i = 0; i < targets.length; i++) {
              if (!player.canUse(card, targets[i], Evt.nodistance ? false : null, Evt.addCount === false ? null : true)) {
                targets.splice(i--, 1);
              }
            }
            if (targets.length) {
              Evt.targets2 = targets;
            }
            else {
              Evt.finish();
              return;
            }
          }
          else Evt.targets2 = [];
          if (Evt.forced) {
            Evt._result = { bool: true };
          }
          else {
            let next = player.chooseBool();
            next.set('prompt', Evt.prompt || ('是否' + (Evt.targets2.length ? '对' : '') + get.translation(Evt.targets2) + '使用' + get.translation(card) + '?'));
            if (Evt.hsskill) next.setHiddenSkill(Evt.hsskill);
            if (Evt.prompt2) next.set('prompt2', Evt.prompt2);
            next.ai = function () {
              let eff = 0;
              for (let i of Evt.targets2) {
                eff += get.effect(i, card, player, player);
              }
              return eff > 0;
            };
          }
        }
        else {
          let next = player.chooseTarget();
          next.set('_get_card', card);
          next.set('filterTarget', function (card, player, target) {
            if (!_status.event.targets.contains(target)) return false;
            if (!_status.event.nodistance && !lib.filter.targetInRange(card, player, target)) return false;
            return lib.filter.targetEnabledx(card, player, target);
          });
          next.set('ai', Evt.ai || get.effect_use);
          next.set('selectTarget', Evt.selectTarget || lib.filter.selectTarget);
          if (Evt.nodistance) next.set('nodistance', true);
          if (Evt.forced) next.set('forced', true);
          if (Evt.addCount !== false) next.set('addCount_extra', true);
          next.set('targets', targets);
          next.set('prompt', Evt.prompt || ('选择' + get.translation(card) + '的目标'));
          if (Evt.prompt2) next.set('prompt2', Evt.prompt2);
          if (Evt.hsskill) next.setHiddenSkill(Evt.hsskill);
        }
      }, function () {
        if (result.bool) {
          Evt.result = {
            bool: true,
            targets: Evt.targets2 || result.targets,
          };
          let next = player.useCard(card, Evt.targets2 || result.targets);
          next.oncard = Evt.oncard;
          if (cards) next.cards = cards.slice(0);
          if (Evt.nopopup) next.nopopup = true;
          if (Evt.animate === false) next.animate = false;
          if (Evt.throw === false) next.throw = false;
          if (Evt.addCount === false) next.addCount = false;
          if (Evt.noTargetDelay) next.targetDelay = false;
          if (Evt.nodelayx) next.delayx = false;
          if (Evt.logSkill) {
            if (typeof Evt.logSkill == 'string') {
              next.skill = Evt.logSkill;
            }
            else if (Array.isArray(Evt.logSkill)) {
              player.logSkill.apply(player, Evt.logSkill);
            }
          }
        }
        else Evt.result = { bool: false };
      }],
      chooseToDuiben: [function () {
        game.log(player, '对', target, '发起了', '#y对策');
        if (_status.connectMode) {
          player.chooseButtonOL([
            [player, ['对策：请选择一种防御对策', [[['', '', 'db_def2'], ['', '', 'db_def1']], 'vcard']], true],
            [target, ['对策：请选择一种进攻之策', [[['', '', 'db_atk1'], ['', '', 'db_atk2']], 'vcard']], true]
          ], function () { }, function () { return 1 + Math.random() }).set('switchToAuto', function () {
            _status.event.result = 'ai';
          }).set('processAI', function () {
            let buttons = _status.event.dialog.buttons;
            return {
              bool: true,
              links: [buttons.randomGet().link],
            }
          });
        }
      }, function () {
        if (_status.connectMode) {
          Evt.mes = result[player.playerid].links[0][2];
          Evt.tes = result[target.playerid].links[0][2];
          Evt.goto(4);
        }
        else {
          player.chooseButton(['对策：请选择一种防御对策', [[['', '', 'db_def2'], ['', '', 'db_def1']], 'vcard']], true).ai = function () { return 1 + Math.random() };
        }
      }, function () {
        Evt.mes = result.links[0][2];
        target.chooseButton(['对策：请选择一种进攻之策', [[['', '', 'db_atk1'], ['', '', 'db_atk2']], 'vcard']], true).ai = function () { return 1 + Math.random() };
      }, function () {
        Evt.tes = result.links[0][2];
      }, function () {
        game.broadcast(function () {
          ui.arena.classList.add('thrownhighlight');
        });
        ui.arena.classList.add('thrownhighlight');
        game.addVideo('thrownhighlight1');
        target.$compare(game.createCard(Evt.tes, '', ''), player, game.createCard(Evt.mes, '', ''));
        game.log(target, '选择的进攻之策为', '#g' + get.translation(Evt.tes));
        game.log(player, '选择的防御对策为', '#g' + get.translation(Evt.mes));
        game.delay(0, 1500);
      }, function () {
        let mes = Evt.mes.slice(6);
        let tes = Evt.tes.slice(6);
        let str;
        if (mes == tes) {
          str = get.translation(player) + '对策成功';
          player.popup('胜', 'wood');
          target.popup('负', 'fire');
          game.log(player, '#g胜');
          Evt.result = { bool: true };
        }
        else {
          str = get.translation(player) + '对策失败';
          target.popup('胜', 'wood');
          player.popup('负', 'fire');
          game.log(target, '#g胜');
          Evt.result = { bool: false };
        }
        game.broadcastAll(function (str) {
          let dialog = ui.create.dialog(str);
          dialog.classList.add('center');
          setTimeout(() => {
            dialog.close();
          }, 1000);
        }, str);
        game.delay(2);
      }, function () {
        game.broadcastAll(function () {
          ui.arena.classList.remove('thrownhighlight');
        });
        game.addVideo('thrownhighlight2');
        if (Evt.clear !== false) {
          game.broadcastAll(ui.clear);
        }
      }],
      chooseToPSS: [function () {
        game.log(player, '对', target, '发起了猜拳');
        if (_status.connectMode) {
          player.chooseButtonOL([
            [player, ['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true],
            [target, ['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true]
          ], function () { }, function () { return 1 + Math.random() }).set('switchToAuto', function () {
            _status.event.result = 'ai';
          }).set('processAI', () => {
            let buttons = _status.event.dialog.buttons;
            return {
              bool: true,
              links: [buttons.randomGet().link],
            };
          });
        }
      }, function () {
        if (_status.connectMode) {
          Evt.mes = result[player.playerid].links[0][2];
          Evt.tes = result[target.playerid].links[0][2];
          Evt.goto(4);
        }
        else {
          player.chooseButton(['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true).ai = function () { return 1 + Math.random() };
        }
      }, function () {
        Evt.mes = result.links[0][2];
        target.chooseButton(['猜拳：请选择一种手势', [[['', '', 'pss_stone'], ['', '', 'pss_scissor'], ['', '', 'pss_paper']], 'vcard']], true).ai = function () { return 1 + Math.random() };
      }, function () {
        Evt.tes = result.links[0][2];
      }, function () {
        game.broadcast(function () {
          ui.arena.classList.add('thrownhighlight');
        });
        ui.arena.classList.add('thrownhighlight');
        game.addVideo('thrownhighlight1');
        player.$compare(game.createCard(Evt.mes, '', ''), target, game.createCard(Evt.tes, '', ''));
        game.log(player, '选择的手势为', '#g' + get.translation(Evt.mes));
        game.log(target, '选择的手势为', '#g' + get.translation(Evt.tes));
        game.delay(0, 1500);
      }, function () {
        let mes = Evt.mes.slice(4);
        let tes = Evt.tes.slice(4);
        let str;
        if (mes == tes) {
          str = '二人平局';
          player.popup('平', 'metal');
          target.popup('平', 'metal');
          game.log('猜拳的结果为', '#g平局');
          Evt.result = { tie: true };
        }
        else {
          if ({ paper: 'stone', scissor: 'paper', stone: 'scissor' }[mes] == tes) {
            str = get.translation(player) + '胜利';
            player.popup('胜', 'wood');
            target.popup('负', 'fire');
            game.log(player, '#g胜');
            Evt.result = { bool: true, winner: mes };
          }
          else {
            str = get.translation(target) + '胜利';
            target.popup('胜', 'wood');
            player.popup('负', 'fire');
            game.log(target, '#g胜');
            Evt.result = { bool: false, winner: tes };
          }
        }
        game.broadcastAll(function (str) {
          let dialog = ui.create.dialog(str);
          dialog.classList.add('center');
          setTimeout(function () {
            dialog.close();
          }, 1000);
        }, str);
        game.delay(2);
      }, function () {
        game.broadcastAll(function () {
          ui.arena.classList.remove('thrownhighlight');
        });
        game.addVideo('thrownhighlight2');
        if (Evt.clear !== false) {
          game.broadcastAll(ui.clear);
        }
      }],
      cardsDiscard: function () {
        game.getGlobalHistory().cardMove.push(Evt);
        for (let i of cards) {
          i.discard();
        }
      },
      orderingDiscard: function () {
        let cards = Evt.relatedEvent.orderingCards;
        for (let i = 0; i < cards.length; i++) {
          if (get.position(cards[i], true) != 'o') cards.splice(i--, 1);
        }
        if (cards.length) game.cardsDiscard(cards);
      },
      cardsGotoOrdering: function () {
        game.getGlobalHistory().cardMove.push(Evt);
        for (let i of cards) {
          i.fix();
          ui.ordering.appendChild(i);
        }
        let evt = Evt.relatedEvent || Evt.getParent();
        if (!evt.orderingCards) evt.orderingCards = [];
        if (!Evt.noOrdering && !Evt.cardsOrdered) {
          Evt.cardsOrdered = true;
          let next = game.createEvent('orderingDiscard', false, evt.getParent());
          next.relatedEvent = evt;
          next.setContent('orderingDiscard');
        }
        if (!Evt.noOrdering) evt.orderingCards.addArray(cards);
      },
      cardsGotoSpecial: function () {
        game.getGlobalHistory().cardMove.push(Evt);
        for (let i of cards) {
          i.fix();
          ui.special.appendChild(i);
        }
      },
      chooseToEnable: [function () {
        let list = [];
        for (let i = 1; i < 6; i++) {
          if (!player.isDisabled(i)) continue;
          list.push('equip' + i);
        }
        if (!list.length) Evt.finish();
        else {
          Evt.list = list;
          let next = player.chooseControl(list);
          next.set('prompt', '请选择恢复一个装备栏');
          if (!Evt.ai) Evt.ai = function (Evt, player, list) {
            return list.randomGet();
          }
          Evt.ai = Evt.ai(Evt.getParent(), player, list);
          next.ai = function () {
            return Evt.ai;
          };
        }
      }, function () {
        Evt.result = { control: result.control };
        player.enableEquip(result.control);
      }],
      chooseToDisable: [function () {
        let list = [];
        for (let i = 1; i < 7; i++) {
          if ((i == 3 || i == 4) && Evt.horse) continue;
          if (i == 6 && !Evt.horse) continue;
          if (player.isDisabled(i)) continue;
          list.push('equip' + i);
        }
        if (!list.length) Evt.finish();
        else {
          Evt.list = list;
          let next = player.chooseControl(list);
          next.set('prompt', '请选择废除一个装备栏');
          if (!Evt.ai) Evt.ai = function (Evt, player, list) {
            return list.randomGet();
          }
          Evt.ai = Evt.ai(Evt.getParent(), player, list);
          next.ai = function () {
            return Evt.ai;
          };
        }
      }, function () {
        Evt.result = { control: result.control };
        if (result.control == 'equip6') {
          player.disableEquip(3);
          player.disableEquip(4);
        }
        else player.disableEquip(result.control);
      }],
      swapEquip: [() => {
        game.log(player, '和', target, '交换了装备区中的牌')
        let e1 = player.getCards('e');
        let todis1 = [];
        for (let i of e1) {
          if (target.isDisabled(get.subtype(i))) todis1.push(i);
        }
        player.discard(todis1);
        let e2 = target.getCards('e');
        let todis2 = [];
        for (let i of e2) {
          if (player.isDisabled(get.subtype(i))) todis2.push(i);
        }
        target.discard(todis2);
      }, () => {
        Evt.cards = [player.getCards('e'), target.getCards('e')];
        player.lose(Evt.cards[0], ui.ordering, 'visible');
        target.lose(Evt.cards[1], ui.ordering, 'visible');
        if (Evt.cards[0].length) player.$give(Evt.cards[0], target, false);
        if (Evt.cards[1].length) target.$give(Evt.cards[1], player, false);
      }, () => {
        for (let i = 0; i < Evt.cards[1].length; i++) {
          player.equip(Evt.cards[1][i]);
        }
        for (let i = 0; i < Evt.cards[0].length; i++) {
          target.equip(Evt.cards[0][i]);
        }
      }],
      disableEquip: function () {
        if (!player.isDisabled(Evt.pos)) {
          let cards = player.getCards('e', (card) => {
            let subtype = get.subtype(card);
            if (subtype == Evt.pos)
              return true;
            if (subtype == 'equip6' && ['equip3', 'equip4'].contains(Evt.pos))
              return true;
            return false;
          });
          if (cards.length) player.discard(cards).delay = false;
          game.log(player, '废除了', get.translation(Evt.pos), '栏');
          player.$disableEquip(Evt.pos);
        }
      },
      enableEquip: function () {
        if (player.isDisabled(Evt.pos)) {
          player.syncStorage('_disableEquip');
          game.log(player, '恢复了', get.translation(Evt.pos), '栏');
          player.$enableEquip(Evt.pos);
        };
      },
      disableJudge: [function () {
        game.log(player, '废除了判定区');
        let js = player.getCards('j');
        if (js.length) player.discard(js);
        player.$._disableJudge = true;
        //player.markSkill('_disableJudge');},function(){
        game.broadcastAll(function (player, card) {
          player.$disableJudge();
        }, player);
      }],
      enableJudge: function () {
        if (!player.$._disableJudge) return;
        game.log(player, '恢复了判定区');
        game.broadcastAll(function (player) {
          player.$enableJudge();
        }, player);
      },
      /*----分界线----*/
      phasing: [function () {
        while (ui.dialogs.length) {
          ui.dialogs[0].close();
        }
        if (!player.noPhaseDelay && lib.config.show_phase_prompt) {
          player.popup('回合开始');
        }
        if (lib.config.glow_phase) {
          if (_status.currentPhase) {
            _status.currentPhase.classList.remove('glow_phase');
            game.broadcast(function (player) {
              player.classList.remove('glow_phase');
            }, _status.currentPhase);
          }
          player.classList.add('glow_phase');
          game.broadcast(function (player) {
            player.classList.add('glow_phase');
          }, player);
        }
        _status.currentPhase = player;
        _status.discarded = [];
        game.phaseNumber++;
        player.phaseNumber++;
        game.syncState();
        game.addVideo('phaseChange', player);
        if (game.phaseNumber == 1 && lib.configOL.observe) {
          lib.configOL.observeReady = true;
          game.send('server', 'config', lib.configOL);
        }
        game.log();
        game.log(player, '的回合开始');
        player._noVibrate = true;
        if (get.config('identity_mode') != 'zhong' && get.config('identity_mode') != 'purple' && !_status.connectMode) {
          let num;
          switch (get.config('auto_identity')) {
            case 'one': num = 1; break;
            case 'two': num = 2; break;
            case 'three': num = 3; break;
            case 'always': num = -1; break;
            default: num = 0; break;
          }
          if (num && !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
            if (!_status.video) player.popup('显示身份');
            _status.identityShown = true;
            game.showIdentity(false);
          }
        }
        player.ai.tempIgnore = [];
        _status.globalHistory.push({
          cardMove: [],
          custom: [],
        });
        game.countPlayer2(function (current) {
          current.actionHistory.push(JSON.parse(JSON.stringify({ ...lib.historyRecorder })));
          current.stat.push({ card: {}, skill: {} });
          if (Evt.parent._roundStart) {
            current.getHistory().isRound = true;
            current.getStat().isRound = true;
          }
        });
        player.getHistory().isMe = true;
        player.getStat().isMe = true;
        if (Evt.parent._roundStart) {
          game.getGlobalHistory().isRound = true;
        }
        if (ui.land && ui.land.player == player) {
          game.addVideo('destroyLand');
          ui.land.destroy();
        }
      }, function () {
        Evt.trigger('phaseBeginStart');
      }],
      /**
       * 更换随从
       * @name content.toggleSubPlayer
       * @type {GameCores.Bases.StateMachine}
       */
      toggleSubPlayer: [function () {
        let list = Evt.list || player.$.subplayer.skills.slice(0);
        list.remove(player.$.subplayer.name2);
        Evt.list = list;
        if (!Evt.directresult) {
          if (list.length > 1) {
            let dialog = ui.create.dialog('更换一个随从', 'hidden');
            dialog.add([list, 'character']);
            player.chooseButton(dialog, true);
          }
          else if (list.length == 1) {
            Evt.directresult = list[0];
          }
          else {
            Evt.finish();
          }
        }
        else {
          if (!list.contains(Evt.directresult)) {
            Evt.finish();
          }
        }
      }, function () {
        if (!Evt.directresult) {
          if (result && result.bool && result.links[0]) {
            Evt.directresult = result.links[0];
          }
          else {
            Evt.finish();
            return;
          }
        }
        if (player.$.subplayer) {
          let current = player.$.subplayer.name2;
          if (Evt.directresult == current) {
            Evt.finish();
            return;
          }
          player.storage[current].hp = player.hp;
          player.storage[current].maxHp = player.maxHp;
          player.storage[current].hs = player.getCards('h');
          player.storage[current].es = player.getCards('e');
          player.lose(player.getCards('he'), ui.special)._triggered = null;

          let cfg = player.storage[Evt.directresult];
          player.$.subplayer.name2 = Evt.directresult;
          player.reinit(current, Evt.directresult, [
            cfg.hp,
            cfg.maxHp
          ]);
          if (cfg.hs.length) player.directgain(cfg.hs);
          if (cfg.es.length) player.directequip(cfg.es);
        }
      }],
      /**
       * 结束调遣随从
       * @name content.callSubPlayer
       * @type {GameCores.Bases.StateMachine}
       */
      exitSubPlayer: [function () {
        if (player.$.subplayer) {
          let current = player.$.subplayer.name2;
          if (Evt.remove) {
            player.lose(player.getCards('he'), ui.discardPile)._triggered = null;
          }
          else {
            player.storage[current].hp = player.hp;
            player.storage[current].maxHp = player.maxHp;
            player.storage[current].hs = player.getCards('h');
            player.storage[current].es = player.getCards('e');
            player.lose(player.getCards('he'), ui.special)._triggered = null;
          }
          player.reinit(current, player.$.subplayer.name, [
            player.$.subplayer.hp,
            player.$.subplayer.maxHp
          ]);
          player.update();
          if (Evt.remove) {
            if (player.storage[current].onremove) {
              player.storage[current].onremove(player);
            }
            delete player.storage[current];
            player.$.subplayer.skills.remove(current);
            game.log(player, '牺牲了随从', '#g' + current);
          }
          else {
            game.log(player, '收回了随从', '#g' + current);
          }
          player.addSkill(player.$.subplayer.skills);
        }
      }, function () {
        if (player.$.subplayer) {
          player.directgain(player.$.subplayer.hs);
          player.directequip(player.$.subplayer.es);
        }
        player.removeSkill('subplayer');
      }, function () {
        if (Evt.remove) {
          Evt.trigger('subPlayerDie');
        }
      }],
      /**
       * 调遣随从
       * @name content.callSubPlayer
       * @type {GameCores.Bases.StateMachine}
       */
      callSubPlayer: [function () {
        let list = player.getSubPlayers(Evt.tag);
        Evt.list = list;
        if (!Evt.directresult) {
          if (list.length > 1) {
            let dialog = ui.create.dialog('调遣一个随从', 'hidden');
            dialog.add([list, 'character']);
            player.chooseButton(dialog, true);
          }
          else if (list.length == 1) {
            Evt.directresult = list[0];
          }
          else {
            Evt.finish();
          }
        }
        else {
          if (!list.contains(Evt.directresult)) {
            Evt.finish();
          }
        }
      }, function () {
        if (!Evt.directresult) {
          if (result && result.bool && result.links[0]) {
            Evt.directresult = result.links[0];
          }
          else {
            Evt.finish();
            return;
          }
        }
        if (Evt.directresult) {
          let cfg = player.storage[Evt.directresult];
          let source = cfg.source || player.name;
          let name = Evt.directresult;
          game.log(player, '调遣了随从', '#g' + name);
          player.$.subplayer = {
            name: source,
            name2: Evt.directresult,
            hp: player.hp,
            maxHp: player.maxHp,
            skills: Evt.list.slice(0),
            hs: player.getCards('h'),
            es: player.getCards('e'),
            intro2: cfg.intro2
          }
          player.removeSkill(Evt.list);
          player.reinit(source, name, [cfg.hp, cfg.maxHp]);
          player.addSkill('subplayer');
          player.lose(player.getCards('he'), ui.special)._triggered = null;
          if (cfg.hs.length) player.directgain(cfg.hs);
          if (cfg.es.length) player.directequip(cfg.es);
        }
      }, function () {
        game.delay();
      }],
      /**
       * 反转结算顺序
       * @name content.reverseOrder
       * @type {GameCores.Bases.StateMachine}
       */
      reverseOrder: [() => {
        game.delay();
      }, () => {
        let choice;
        if (get.tag(card, 'multineg')) {
          choice = (player.previous.side == player.side) ? '逆时针' : '顺时针';
        }
        else {
          choice = (player.next.side == player.side) ? '逆时针' : '顺时针';
        }
        player.chooseControl('顺时针', '逆时针', function (Evt, player) {
          return _status.event.choice || '逆时针';
        }).set('prompt', '选择' + get.translation(card) + '的结算方向').set('choice', choice).set('forceDie', true);
      }, () => {
        if (result && result.control == '顺时针') {
          let evt = Evt.getParent();
          evt.fixedSeat = true;
          evt.targets.sortBySeat();
          evt.targets.reverse();
          if (evt.targets[evt.targets.length - 1] == player) {
            evt.targets.unshift(evt.targets.pop());
          }
        }
      }],
      /**
       * 使用判定牌
       * @name content.addJudgeCard
       * @type {GameCores.Bases.StateMachine}
       */
      addJudgeCard: function () {
        if (lib.filter.judge(card, player, target) && cards.length && get.position(cards[0], true) == 'o') target.addJudge(card, cards);
      },
      /**
       * 使用装备牌
       * @name content.equipCard
       * @type {GameCores.Bases.StateMachine}
       */
      equipCard: function () {
        if (cards.length && get.position(cards[0], true) == 'o') target.equip(card, cards[0]);
      },
      /**
       * 游戏开始前分牌
       * @name content.gameDraw
       * @type {GameCores.Bases.StateMachine}
       */
      gameDraw: [() => {
        if (_status.brawl && _status.brawl.noGameDraw) {
          Evt.finish();
          return;
        }
        let end = player;
        let numx = num;
        do {
          if (typeof num == 'function') {
            numx = num(player);
          }
          if (player.getTopCards) player.directgain(player.getTopCards(numx));
          else player.directgain(get.cards(numx));
          if (player.singleHp === true && get.mode() != 'guozhan' && (lib.config.mode != 'doudizhu' || _status.mode != 'online')) {
            player.doubleDraw();
          }
          player = player.next;
        }
        while (player != end);
        Evt.changeCard = get.config('change_card');
        if (_status.connectMode || (lib.config.mode == 'doudizhu' && _status.mode == 'online') || lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && lib.config.mode != 'doudizhu' && lib.config.mode != 'longlaoguan') {
          Evt.changeCard = 'disabled';
        }
      }, () => {
        if (Evt.changeCard != 'disabled' && !_status.auto) {
          Evt.dialog = ui.create.dialog('是否使用手气卡？');
          ui.create.confirm('oc');
          Evt.custom.replace.confirm = function (bool) {
            _status.event.bool = bool;
            game.resume();
          }
        }
        else {
          Evt.finish();
        }
      }, () => {
        if (Evt.changeCard == 'once') {
          Evt.changeCard = 'disabled';
        }
        else if (Evt.changeCard == 'twice') {
          Evt.changeCard = 'once';
        }
        else if (Evt.changeCard == 'disabled') {
          Evt.bool = false;
          return;
        }
        _status.imchoosing = true;
        Evt.switchToAuto = function () {
          _status.event.bool = false;
          game.resume();
        }
        game.pause();
      }, () => {
        _status.imchoosing = false;
        if (Evt.bool) {
          if (game.changeCoin) {
            game.changeCoin(-3);
          }
          let hs = game.me.getCards('h');
          game.addVideo('lose', game.me, [get.cardsInfo(hs), [], [], []]);
          for (let i of hs) {
            i.discard(false);
          }
          game.me.directgain(get.cards(hs.length));
          let ss = game.me.getCards('s');
          game.addVideo('lose', game.me, [get.cardsInfo(ss), [], [], []]);
          for (let i of ss) {
            i.discard(false);
          }
          game.me.directgains(get.cards(ss.length));
          Evt.goto(2);
        }
        else {
          if (Evt.dialog) Evt.dialog.close();
          if (ui.confirm) ui.confirm.close();
          Evt.finish();
        }
      }],
      /**
       * 阶段循环
       * @name content.phaseLoop
       * @type {GameCores.Bases.StateMachine}
       */
      phaseLoop: [() => {
        for (var i = 0; i < lib.onphase.length; i++) {
          lib.onphase[i]();
        }
        player.phase();
      }, () => {
        if (!game.players.contains(Evt.player.next)) {
          Evt.player = game.findNext(Evt.player.next);
        }
        else {
          Evt.player = Evt.player.next;
        }
        Evt.goto(0);
      }],
      /**
       * 加载包
       * @name content.loadPackage
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Array<Object>} Evt.packages 包名数组，用于加载
       * @property {string} Evt.packages[].0 包目录，相对`lib.assetURL`路径
       * @property {string} Evt.packages[].1 包名
       */
      loadPackage: [function () {
        if (Evt.packages.length) {
          window.game = game;
          var pack = Evt.packages.shift().split('/');
          lib.init.js(lib.assetURL + pack[0], pack[1], game.resume);
          game.pause();
        }
        else {
          Evt.finish();
        }
      }, function () {
        if (!lib.config.dev) delete window.game;
        var character = lib.imported.character;
        var card = lib.imported.card;
        var i, j, k;
        for (i in character) {
          if (character[i].character) {
            lib.characterPack[i] = character[i].character;
          }
          if (character[i].forbid && character[i].forbid.contains(lib.config.mode)) continue;
          if (character[i].mode && character[i].mode.contains(lib.config.mode) == false) continue;

          if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
            lib[j].addArray(character[i][j]);
            continue;
          }
          for (j in character[i]) {
            if (j == 'mode' || j == 'forbid' || j == 'characterSort') continue;
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
              if (j == 'translate' && k == i) {
                lib[j][k + '_character_config'] = character[i][j][k];
              }
              else {
                if (lib[j][k] == undefined) {
                  lib[j][k] = character[i][j][k];
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
            if (j == 'list') continue;
            for (k in card[i][j]) {
              if (j == 'skill' && k[0] == '_' && !lib.config.cards.contains(i)) {
                continue;
              }
              if (j == 'translate' && k == i) {
                lib[j][k + '_card_config'] = card[i][j][k];
              }
              else {
                if (lib[j][k] == undefined) lib[j][k] = card[i][j][k];
                else console.log('dublicate ' + j + ' in card ' + i + ':\n' + k + '\n' + lib[j][k] + '\n' + card[i][j][k]);
              }
            }
          }
        }
        Evt.goto(0);
      }],
      /**
       * 加载模组
       * @name content.loadMode
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!string} Evt.mode 要加载的mode名
       * @property {?Object} Evt.result 如果加载成功返回加载的模组，如果失败则返回未指定(undefined)结果
       */
      loadMode: [function () {
        window.game = game;
        lib.init.js(lib.assetURL + 'mode', Evt.mode, game.resume);
        game.pause();
      }, function () {
        if (!lib.config.dev) delete window.game;
        Evt.result = lib.imported.mode[Evt.mode];
        delete lib.imported.mode[Evt.mode];
      }],
      /**
       * 强制结束
       * @name content.forceOver
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {?string} Evt.bool 是否调用{@link game.over}，如果为'noover'，则不调用
       * @property {?function():void} [Evt.callback] 回调函数，在事件结束前调用
       */
      forceOver: [function () {
        while (ui.controls.length) {
          ui.controls[0].close();
        }
        while (ui.dialogs.length) {
          ui.dialogs[0].close();
        }
      }, function () {
        if (Evt.bool != 'noover') {
          game.over(Evt.bool);
        }
        if (Evt.callback) {
          Evt.callback();
        }
      }],
      /**
       * 事件触发调度状态机
       * @name content.arrangeTrigger
       * @type {GameCores.Bases.StateMachine}
       */
      arrangeTrigger: [function () {
        Evt.filter1 = function (info) {
          if (info[1].isDead() && !lib.skill[info[0]].forceDie) return false;
          return lib.filter.filterTrigger(trigger, info[1], Evt.triggername, info[0]);
        }
        Evt.filter2 = function (info2) {
          var info = lib.skill[info2[0]];
          if (!lib.translate[info2[0]] || info.silent) return false;
          return true;
        }
        Evt.filter3 = function (info, info2) {
          return Evt.filter2(info2) && Evt.filter1(info2) && info2[1] == info[1] && info[2] == info2[2] && (lib.skill.global.contains(info2[0]) || info[1].hasSkill(info2[0], true));
        }
      }, function () {
        if (trigger.filterStop && trigger.filterStop()) {
          Evt.finish();
        }
        else if (Evt.list.length) {
          var info = Evt.list.shift();
          game.createTrigger(Evt.triggername, info[0], info[1], trigger);
          Evt.redo();
        }
      }, function () {
        if (!Evt.map.length) {
          if (Evt.list2.length) {
            var info = Evt.list2.shift();
            game.createTrigger(Evt.triggername, info[0], info[1], trigger);
            Evt.redo();
          }
          else {
            if (trigger._triggering == this) {
              delete trigger._triggering;
            }
            Evt.finish();
            return;
          }
        };
        Evt.doing = Evt.map.shift();
      }, function () {
        Evt.num = 0;
        var bool = false;
        var list = Evt.doing.list;
        for (var i = 0; i < list.length; i++) {
          if (Evt.filter1(list[i])) {
            Evt.num = i;
            bool = true;
            break;
          }
        }
        if (!bool) { Evt.goto(2); return; }
        var priority = list[Evt.num][2];
        for (var i = 0; i < Evt.num; i++) {
          if (Evt.doing.list[i][2] > priority) {
            Evt.doing.list.splice(i--, 1);
            Evt.num--;
          }
        }
        Evt.choice = [];
        if (Evt.num < Evt.doing.list.length - 1 && Evt.filter2(Evt.doing.list[Evt.num])) {
          var current = Evt.doing.list[Evt.num];
          Evt.choice.push(current);
          for (var i = Evt.num + 1; i < Evt.doing.list.length; i++) {
            if (Evt.filter3(current, Evt.doing.list[i])) Evt.choice.push(Evt.doing.list[i]);
          }
        }
        if (Evt.choice.length < 2) Evt.goto(6);
      }, function () {
        var controls = [];
        Evt.current = Evt.choice[0][1]
        for (var i = 0; i < Evt.choice.length; i++) {
          controls.push(Evt.choice[i][0]);
        }
        Evt.current.chooseControl(controls).set('prompt', '选择下一个触发的技能').set('forceDie', true).set('arrangeSkill', true);
      }, function () {
        if (result.control) {
          for (var i = 0; i < Evt.doing.list.length; i++) {
            if (Evt.doing.list[i][0] == result.control && Evt.doing.list[i][1] == Evt.current) {
              Evt.num = i; break;
            }
          }
        }
      }, function () {
        var info = Evt.doing.list[Evt.num];
        if (info) {
          Evt.doing.list2.push(info);
          Evt.doing.list.splice(Evt.num, 1);
          game.createTrigger(Evt.triggername, info[0], info[1], trigger);
        }
      }, function () {
        if (trigger.filterStop && trigger.filterStop()) {
          Evt.finish();
        }
        else Evt.goto(Evt.doing.list.length ? 3 : 2);
      }],
      /**
       * 检测时机并让玩家选择是否发动触发类技能
       * 创建触发器
       * @name content.createTrigger
       * @type {GameCores.Bases.StateMachine}
       */
      createTrigger: [() => {
        if (lib.filter.filterTrigger(trigger, player, Evt.triggername, Evt.skill)) {
          var fullskills = game.expandSkills(player.getSkills().concat(lib.skill.global));
          if (!fullskills.contains(Evt.skill)) {
            var info = get.info(Evt.skill);
            var hidden = player.hiddenSkills.slice(0);
            game.expandSkills(hidden);
            if (hidden.contains(Evt.skill)) {
              if (!info.silent && player.hasSkillTag('nomingzhi', false, null, true)) {
                Evt.finish();
              }
              else if (!info.direct) {
                Evt.trigger('triggerHidden');
              }
              else {
                Evt.skillHidden = true;
              }
            }
            else {
              var keep = false;
              for (var i in player.additionalSkills) {
                if (i.indexOf('hidden:') == 0 && game.expandSkills(player.additionalSkills[i]).contains(Evt.skill)) {
                  keep = true; break;
                }
              }
              if (!keep) {
                Evt.finish();
              }
            }
          }
        }
        else {
          Evt.finish();
        }
      }, () => {
        if (Evt.cancelled) {
          Evt.finish();
          return;
        }
        var info = get.info(Evt.skill);
        if (!Evt.revealed && !info.forced) {
          var checkFrequent = function (info) {
            if (player.hasSkillTag('nofrequent', false, Evt.skill)) return false;
            if (typeof info.frequent == 'boolean') return info.frequent;
            if (typeof info.frequent == 'function') return info.frequent(trigger, player);
            if (info.frequent == 'check' && typeof info.check == 'function') return info.check(trigger, player);
            return false;
          }
          if (info.direct && player.isUnderControl()) {
            game.swapPlayerAuto(player);
            Evt._result = { bool: true };
            Evt._direct = true;
          }
          else if (info.direct) {
            Evt._result = { bool: true };
            Evt._direct = true;
          }
          else if (info.direct && player.isOnline()) {
            Evt._result = { bool: true };
            Evt._direct = true;
          }
          else {
            if (checkFrequent(info)) {
              Evt.frequentSkill = true;
            }
            var str;
            var check = info.check;
            if (info.prompt) str = info.prompt;
            else {
              if (typeof info.logTarget == 'string') {
                str = get.prompt(Evt.skill, trigger[info.logTarget], player);
              }
              else if (typeof info.logTarget == 'function') {
                str = get.prompt(Evt.skill, info.logTarget(trigger, player), player);
              }
              else {
                str = get.prompt(Evt.skill, null, player);
              }
            }
            if (typeof str == 'function') { str = str(trigger, player) }
            var next = player.chooseBool(str);
            if (Evt.frequentSkill) next.set('frequentSkill', Evt.skill);
            next.set('forceDie', true);
            next.ai = function () {
              return !check || check(trigger, player);
            };
            if (typeof info.prompt2 == 'function') {
              next.set('prompt2', info.prompt2(trigger, player));
            }
            else if (typeof info.prompt2 == 'string') {
              next.set('prompt2', info.prompt2);
            }
            else if (info.prompt2 != false) {
              if (lib.dynamicTranslate[Evt.skill] || lib.translate[Evt.skill + '_info'])
                next.set('prompt2', get.skillInfoTranslation(Evt.skill, player));
            }
            if (trigger.skillwarn) {
              if (next.prompt2) {
                next.set('prompt2', '<span class="thundertext">' + trigger.skillwarn + '。</span>' + next.prompt2);
              }
              else {
                next.set('prompt2', trigger.skillwarn);
              }
            }

            if (info.addDialog) {
              var createDialog = [str, 'small'];
              if (next.prompt2) createDialog.push(next.prompt2);
              createDialog.push(info.addDialog(trigger, player));
              next.set('createDialog', createDialog);
            }
          }
        }
      }, () => {
        var info = get.info(Evt.skill);
        if (result && result.bool != false) {
          var autodelay = info.autodelay;
          if (typeof autodelay == 'function') {
            autodelay = autodelay(trigger, player);
          }
          if (autodelay && (info.forced || !Evt.isMine())) {
            if (typeof autodelay == 'number') {
              game.delayx(autodelay);
            }
            else {
              game.delayx();
            }
          }
        }
      }, () => {
        var info = get.info(Evt.skill);
        if (result && result.bool == false) {
          if (info.oncancel) info.oncancel(trigger, player);
          Evt.finish();
          return;
        }
        var next = game.createEvent(Evt.skill);
        if (typeof info.usable == 'number') {
          player.addSkill('counttrigger');
          if (!player.$.counttrigger) {
            player.$.counttrigger = {};
          }
          if (!player.$.counttrigger[Evt.skill]) {
            player.$.counttrigger[Evt.skill] = 1;
          }
          else {
            player.$.counttrigger[Evt.skill]++;
          }
        }
        next.player = player;
        next._trigger = trigger;
        next.triggername = Evt.triggername;
        next.setContent(info.content);
        next.skillHidden = Evt.skillHidden;
        if (info.forceDie) next.forceDie = true;
        if (info.popup != false && !info.direct) {
          if (info.popup) {
            player.popup(info.popup);
            game.log(player, '发动了', '#p『' + get.skillTranslation(Evt.skill, player) + '』');
          }
          else {
            if (info.logTarget && info.logLine !== false) {
              if (typeof info.logTarget == 'string') {
                player.logSkill(Evt.skill, trigger[info.logTarget], info.line);
              }
              else if (typeof info.logTarget == 'function') {
                player.logSkill(Evt.skill, info.logTarget(trigger, player), info.line);
              }
            }
            else {
              player.logSkill(Evt.skill, false, info.line);
            }
          }
        }
      }, () => {
        if (player._hookTrigger) {
          for (var i = 0; i < player._hookTrigger.length; i++) {
            var info = lib.skill[player._hookTrigger[i]].hookTrigger;
            if (info) {
              if (info.after && info.after(Evt, player, Evt.triggername)) {
                Evt.trigger('triggerAfter');
                break;
              }
            }
          }
        }
      }],
      /**
       * Play video
       * @name content.playVideoContent
       * @type {GameCores.Bases.StateMachine}
       */
      playVideoContent: [function () {
        game.delay(0, 500);
      }, function () {
        if (!game.chess) {
          ui.control.innerHTML = '';
          var nodes = [];
          for (var i = 0; i < ui.arena.childNodes.length; i++) {
            nodes.push(ui.arena.childNodes[i]);
          }
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] == ui.canvas) continue;
            if (nodes[i] == ui.control) continue;
            if (nodes[i] == ui.mebg) continue;
            if (nodes[i] == ui.me) continue;
            if (nodes[i] == ui.roundmenu) continue;
            nodes[i].remove();
          }
          ui.sidebar.innerHTML = '';
          ui.cardPile.innerHTML = '';
          ui.discardPile.innerHTML = '';
          ui.special.innerHTML = '';
          ui.ordering.innerHTML = '';
        }
        ui.system.firstChild.innerHTML = '';
        ui.system.lastChild.innerHTML = '';
        ui.system.firstChild.appendChild(ui.config2);
        if (ui.updateVideoMenu) {
          ui.updateVideoMenu();
        }
        _status.videoDuration = 1;
        ui.create.system('返回', function () {
          var mode = localStorage.getItem(lib.configprefix + 'playbackmode');
          if (mode) {
            game.saveConfig('mode', mode);
          }
          game.reload();
        });
        ui.create.system('重播', function () {
          _status.replayvideo = true;
          game.playVideo(_status.playback, lib.config.mode);
        });
        ui.create.system('暂停', ui.click.pause, true).id = 'pausebutton';
        var slow = ui.create.system('减速', function () {
          _status.videoDuration *= 1.5;
          updateDuration();
        }, true);
        var fast = ui.create.system('加速', function () {
          _status.videoDuration /= 1.5;
          updateDuration();
        }, true);
        var updateDuration = function () {
          if (_status.videoDuration > 1) {
            slow.classList.add('glow');
          }
          else {
            slow.classList.remove('glow');
          }
          if (_status.videoDuration < 1) {
            fast.classList.add('glow');
          }
          else {
            fast.classList.remove('glow');
          }
        }
        ui.system.style.display = '';
        ui.refresh(ui.system);
        ui.system.show();
        ui.window.show();
        if (lib.config.mode != 'versus' && lib.config.mode != 'boss') {
          ui.arena.style.display = '';
          ui.refresh(ui.arena);
          ui.arena.show();
        }
        if (!game.chess) {
          game.playerMap = {};
        }
        game.finishCards();
      }, function () {
        if (Evt.video.length) {
          var content = Evt.video.shift();
          // console.log(content);
          if (content.type == 'delay') {
            game.delay(content.content);
          }
          else if (content.type == 'play') {
            window.play = {};
            if (!Evt.playtoload) {
              Evt.playtoload = 1;
            }
            else {
              Evt.playtoload++;
            }
            var script = lib.init.js(lib.assetURL + 'play', content.name);
            script.addEventListener('load', function () {
              var play = window.play[content.name]
              if (play && play.video) {
                play.video(content.init);
              }
              Evt.playtoload--;
              if (Evt.playtoload == 0) {
                delete window.play;
              }
            });
          }
          else if (typeof content.player == 'string' && game.playerMap[content.player] &&
            game.playerMap[content.player].classList &&
            !game.playerMap[content.player].classList.contains('obstacle')) {
            game.videoContent[content.type](game.playerMap[content.player], content.content);
          }
          else {
            game.videoContent[content.type](content.content);
          }
          if (Evt.video.length) {
            game.delay(0, _status.videoDuration * Math.min(2000, Evt.video[0].delay));
          }
          Evt.redo();
        }
        else {
          _status.over = true;
          ui.system.lastChild.hide();
          setTimeout(function () {
            ui.system.lastChild.innerHTML = '';
          }, 500);
        }
      }],
      /**
       * wait for player
       * @name content.waitForPlayer
       * @type {GameCores.Bases.StateMachine}
       */
      waitForPlayer: [function () {
        ui.auto.hide();
        ui.pause.hide();

        game.createServer();
        if (!lib.translate.zhu) {
          lib.translate.zhu = '主';
        }
        if (Evt.func) {
          Evt.func();
        }
        if (!lib.configOL.number) {
          lib.configOL.number = parseInt(lib.configOL.player_number);
        }
        if (game.onlineroom) {
          game.send('server', 'config', lib.configOL);
        }

        ui.create.connectPlayers(game.ip);
        if (!window.isNonameServer) {
          var me = game.connectPlayers[0];
          me.setIdentity('zhu');
          me.initOL(get.connectNickname(), lib.config.connect_avatar);
          me.playerid = '1';
          game.onlinezhu = '1';
        }
        _status.waitingForPlayer = true;
        if (window.isNonameServer) {
          document.querySelector('#server_status').innerHTML = '等待中';
        }
        game.pause();
      }, function () {
        _status.waitingForPlayer = false;
        lib.configOL.gameStarted = true;
        if (window.isNonameServer) {
          document.querySelector('#server_status').innerHTML = '游戏中';
        }
        if (game.onlineroom) {
          game.send('server', 'config', lib.configOL);
        }
        for (var i = 0; i < game.connectPlayers.length; i++) {
          game.connectPlayers[i].delete();
        }
        delete game.connectPlayers;
        if (ui.roomInfo) {
          ui.roomInfo.remove();
          delete ui.roomInfo;
        }
        if (ui.exitroom) {
          ui.exitroom.remove();
          delete ui.exitroom;
        }
        game.broadcast('gameStart');
        game.delay(2);
        ui.auto.show();
        ui.pause.show();
        if (lib.config.show_cardpile) {
          ui.cardPileButton.style.display = '';
        }
      }],
      /**
       * 置换手牌(单机)
       * @name content.replaceHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      replaceHandcards: [function () {
        if (Evt.players.contains(game.me)) {
          game.me.chooseBool('是否置换手牌？');
        }
        else {
          Evt.finish();
        }
      }, function () {
        if (result && result.bool) {
          var hs = game.me.getCards('h')
          for (var i = 0; i < hs.length; i++) {
            hs[i].discard(false);
          }
          game.me.directgain(get.cards(hs.length));
        }
      }],
      /**
       * 置换手牌[support online]
       * @name content.replaceHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      replaceHandcardsOL: [function () {
        var send = function () {
          game.me.chooseBool('是否置换手牌？');
          game.resume();
        };
        var sendback = function (result, player) {
          if (result && result.bool) {
            var hs = player.getCards('h')
            game.broadcastAll(function (player, hs) {
              game.addVideo('lose', player, [get.cardsInfo(hs), [], [], []]);
              for (var i = 0; i < hs.length; i++) {
                hs[i].discard(false);
              }
            }, player, hs);
            player.directgain(get.cards(hs.length));
          }
        };
        for (var i = 0; i < Evt.players.length; i++) {
          if (Evt.players[i].isOnline()) {
            Evt.withol = true;
            Evt.players[i].send(send);
            Evt.players[i].wait(sendback);
          }
          else if (Evt.players[i] == game.me) {
            Evt.withme = true;
            game.me.chooseBool('是否置换手牌？');
            game.me.wait(sendback);
          }
        }
      }, function () {
        if (Evt.withme) {
          game.me.unwait(result);
        }
      }, function () {
        if (Evt.withol && !Evt.resultOL) {
          game.pause();
        }
      }],
      /**
       * 一个完整的回合
       * @name content.phase
       * @type {GameCores.Bases.StateMachine}
       */
      phase: [() => {
        if (!Evt.stageList || !Evt.stageList.length) Evt.stageList = lib.phaseName;
        Evt.stepNum = 0;
      }, () => {
        if (typeof player[Evt.stageList[Evt.stepNum]] == 'function') player[Evt.stageList[Evt.stepNum]]();
      }, () => {
        if (Evt.stageList[Evt.stepNum] == 'phaseDraw') {
          if (!player.noPhaseDelay) {
            if (player == game.me) {
              game.delay();
            }
            else {
              game.delayx();
            }
          }
        }
        if (Evt.stageList[Evt.stepNum] == 'phaseUse') {
          game.broadcastAll(function () {
            if (ui.tempnowuxie) {
              ui.tempnowuxie.close();
              delete ui.tempnowuxie;
            }
          });
        }
        if (Evt.stageList[Evt.stepNum] == 'phaseDiscard') {
          if (!player.noPhaseDelay) game.delayx();
          delete player._noSkill;
        }
      }, () => {
        Evt.trigger('phaseNext');
        if (Evt.stageList[++Evt.stepNum]) {
          Evt.trigger('stepNext');

          Evt.goto(1);
        }
      }],
      /**
       * 判定阶段
       * @name content.phaseJudge
       * @type {GameCores.Bases.StateMachine}
       */
      phaseJudge: [() => {
        Evt.cards = player.getCards('j');
        if (!Evt.cards.length) Evt.finish();
      }, () => {
        if (cards.length && player.getCards('j').contains(cards[0])) {
          Evt.card = cards.shift();
          if (Evt.card.classList.contains('removing')) {
            Evt.card.remove();
            delete Evt.card;
            Evt.redo();
          }
          else if (Evt.card.classList.contains('feichu')) {
            Evt.finish();
            return;
          }
          else {
            player.lose(Evt.card, 'visible', ui.ordering);
            player.$phaseJudge(Evt.card);
            Evt.cancelled = false;
            Evt.trigger('phaseJudge');
            var name = Evt.card.viewAs || Evt.card.name;
            player.popup(name, 'thunder');
            if (!lib.card[name].effect) {
              game.delay();
              Evt.redo();
            }
            else if (!lib.card[name].judge) {
              game.delay();
              Evt.nojudge = true;
            }
          }
        }
        else Evt.finish();
      }, () => {
        if (!Evt.cancelled && !Evt.nojudge) player.judge(Evt.card).set('type', 'phase');
      }, () => {
        var name = Evt.card.viewAs || Evt.card.name;
        if (Evt.excluded) {
          delete Evt.excluded;
        }
        else if (Evt.cancelled && !Evt.direct) {
          if (lib.card[name].cancel) {
            var next = game.createEvent(name + 'Cancel');
            next.setContent(lib.card[name].cancel);
            next.card = Evt.card;
            next.cards = [Evt.card];
            next.player = player;
          }
        }
        else {
          var next = game.createEvent(name);
          next.setContent(lib.card[name].effect);
          next._result = result;
          next.card = Evt.card;
          next.cards = [Evt.card];
          next.player = player;
        }
        ui.clear();
        Evt.goto(1);
      }],
      /**
       * 摸牌阶段
       * @name content.phaseDraw
       * @type {GameCores.Bases.StateMachine}
       */
      phaseDraw: [() => {
        Evt.trigger("phaseDrawBegin1");
      }, () => {
        Evt.trigger("phaseDrawBegin2");
      }, () => {
        if (game.modPhaseDraw) {
          game.modPhaseDraw(player, Evt.num);
        }
        else {
          if (Evt.num > 0) {
            var num = Evt.num;
            if (Evt.attachDraw) {
              for (var i = 0; i < Evt.attachDraw.length; i++) {
                ui.cardPile.insertBefore(Evt.attachDraw[i], ui.cardPile.firstChild);
              }
              num += Evt.attachDraw.length;
            }
            var next = player.draw(num);
            if (Evt.attachDraw) {
              next.minnum = Evt.attachDraw.length;
            }
          }
        }
      }, () => {
        if (Array.isArray(result)) {
          Evt.cards = result;
        }
      }],
      /**
       * 出牌阶段
       * @name content.phaseUse
       * @type {GameCores.Bases.StateMachine}
       */
      phaseUse: [() => {
        ;
        var next = player.chooseToUse();
        if (!lib.config.show_phaseuse_prompt) {
          next.set('prompt', false);
        }
        next.set('type', 'phase');
      }, () => {
        if (result.bool && !Evt.skipped) {
          Evt.goto(0);
        }
        game.broadcastAll(function () {
          if (ui.tempnowuxie) {
            ui.tempnowuxie.close();
            delete ui.tempnowuxie;
          }
        });
      }, () => {
        var stat = player.getStat();
        for (var i in stat.skill) {
          var bool = false;
          var info = lib.skill[i];
          if (!info) continue;
          if (info.enable != undefined) {
            if (typeof info.enable == 'string' && info.enable == 'phaseUse') bool = true;
            else if (typeof info.enable == 'object' && info.enable.contains('phaseUse')) bool = true;
          }
          if (bool) stat.skill[i] = 0;
        }
        for (var i in stat.card) {
          var bool = false;
          var info = lib.card[i];
          if (!info) continue;
          if (info.updateUsable == 'phaseUse') stat.card[i] = 0;
        }
      }],
      /**
       * 弃牌阶段
       * @name content.phaseDiscard
       * @type {GameCores.Bases.StateMachine}
       */
      phaseDiscard: [() => {
        if (!Evt.num) Evt.num = player.needsToDiscard();
        if (Evt.num <= 0) Evt.finish();
        else {
          if (lib.config.show_phase_prompt) {
            player.popup('弃牌阶段');
          }
        }
        Evt.trigger('phaseDiscard');
      }, () => {
        player.chooseToDiscard(num, true);
      }, () => {
        Evt.cards = result.cards;
      }],
      /**
       * 选择以使用(牌|技能)
       * @name content.chooseToUse
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToUse: [() => {
        if (Evt.responded) return;
        if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(Evt)) {
          game.modeSwapPlayer(player);
        }
        var skills = player.getSkills(true);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var info = lib.skill[skills[i]];
          if (info && info.onChooseToUse) {
            info.onChooseToUse(Evt);
          }
        }
        _status.noclearcountdown = true;
        if (Evt.type == 'phase') {
          if (Evt.isMine()) {
            if (lib.config.mode == 'richer' && lib.skill._chessmove.filter(true, player) && player.getStat().skill && !player.getStat().skill._chessmove) {
              Evt.endButton = ui.create.control('请进行移动', 'stayleft', function () { });
            }
            else {
              Evt.endButton = ui.create.control('结束回合', 'stayleft', function () {
                if (_status.event.skill) {
                  ui.click.cancel();
                }
                ui.click.cancel();
              });
            }
            Evt.fakeforce = true;
          }
          else {
            if (Evt.endButton) {
              Evt.endButton.close();
              delete Evt.endButton;
            }
            Evt.fakeforce = false;
          }
        }
        if (Evt.player.isUnderControl() && !_status.auto) {
          Evt.result = {
            bool: false
          }
          return;
        }
        else if (Evt.isMine()) {
          if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
            ui.click.cancel();
            return;
          }
          if (Evt.type == 'wuxie') {
            if (ui.tempnowuxie) {
              var triggerevent = Evt.getTrigger();
              if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
                ui.tempnowuxie.close();
              }
            }
            if (lib.filter.wuxieSwap(Evt)) {
              Evt.result = {
                bool: false
              }
              return;
            }
          }
          var ok = game.check();
          if (!ok || !lib.config.auto_confirm) {
            game.pause();
            if (lib.config.enable_vibrate && player._noVibrate) {
              delete player._noVibrate;
              game.vibrate();
            }
            if (typeof Evt.prompt == 'string') {
              if (Evt.openskilldialog) {
                Evt.skillDialog = ui.create.dialog(Evt.openskilldialog);
                delete Evt.openskilldialog;
                Evt.dialog = Evt.prompt;
              }
              else {
                Evt.dialog = ui.create.dialog(Evt.prompt);
                if (Evt.prompt2) {
                  Evt.dialog.addText(Evt.prompt2);
                }
              }
            }
            else if (Evt.prompt == 'function') {
              Evt.dialog = ui.create.dialog(Evt.prompt(Evt));
            }
            else if (Evt.prompt == undefined) {
              var str;
              if (typeof Evt.filterCard == 'object') {
                var filter = Evt.filterCard;
                str = '请使用' + get.cnNumber(Evt.selectCard[0]) + '张'
                if (filter.name) {
                  str += get.translation(filter.name);
                }
                else {
                  str += '牌';
                }
              }
              else {
                str = '请选择要使用的牌';
              }
              if (Evt.openskilldialog) {
                Evt.skillDialog = ui.create.dialog(Evt.openskilldialog);
                delete Evt.openskilldialog;
                Evt.dialog = str;
              }
              else if (typeof Evt.skillDialog != 'string') {
                Evt.dialog = ui.create.dialog(str);
              }
              else {
                Evt.dialog = str;
              }
            }
          }
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.result = 'ai';
        }
      }, () => {
        if (Evt.result == 'ai') {
          var ok = game.check();
          if (ok) {
            ui.click.ok();
          }
          else if (ai.basic.chooseCard(Evt.ai1)) {
            if (ai.basic.chooseTarget(Evt.ai2)) {
              ui.click.ok();
              Evt._aiexcludeclear = true;
            }
            else {
              if (!Evt.norestore) {
                if (Evt.skill) {
                  var skill = Evt.skill;
                  ui.click.cancel();
                  Evt._aiexclude.add(skill);
                  var info = get.info(skill);
                  if (info.sourceSkill) {
                    Evt._aiexclude.add(info.sourceSkill);
                  }
                }
                else {
                  get.card(true).aiexclude();
                  game.uncheck();
                }
                Evt.redo();
                game.resume();
              }
              else {
                ui.click.cancel();
              }
            }
          }
          else if (Evt.skill && !Evt.norestore) {
            var skill = Evt.skill;
            ui.click.cancel();
            Evt._aiexclude.add(skill);
            var info = get.info(skill);
            if (info.sourceSkill) {
              Evt._aiexclude.add(info.sourceSkill);
            }
            Evt.redo();
            game.resume();
          }
          else {
            ui.click.cancel();
          }
          if (Evt.aidelay && Evt.result && Evt.result.bool) {
            game.delayx();
          }
        }
      }, () => {
        if (Evt.endButton) {
          Evt.endButton.close();
          delete Evt.endButton;
        }
        Evt.resume();
        if (Evt.result) {
          if (Evt.result.skill) {
            var info = get.info(Evt.result.skill);
            if (info && info.chooseButton) {
              if (Evt.dialog && typeof Evt.dialog == 'object') Evt.dialog.close();
              var dialog = info.chooseButton.dialog(Evt, player);
              if (info.chooseButton.chooseControl) {
                var next = player.chooseControl(info.chooseButton.chooseControl(Evt, player));
                next.dialog = dialog;
                next.set('ai', info.chooseButton.check || function () { return 0; });
              }
              else {
                var next = player.chooseButton(dialog);
                next.set('ai', info.chooseButton.check || function () { return 1; });
                next.set('filterButton', info.chooseButton.filter || function () { return true; });
                next.set('selectButton', info.chooseButton.select || 1);
              }
              Evt.buttoned = Evt.result.skill;
            }
            else if (info && info.precontent && !game.online && !Evt.nouse) {
              var next = game.createEvent('pre_' + Evt.result.skill);
              next.setContent(info.precontent);
              next.set('result', Evt.result);
              next.set('player', player);
            }
          }
        }
      }, () => {
        if (Evt.buttoned) {
          if (result.bool || result.control && result.control != 'cancel2') {
            var info = get.info(Evt.buttoned).chooseButton;
            lib.skill[Evt.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
            lib.skill[Evt.buttoned + '_backup'].sourceSkill = Evt.buttoned;
            if (game.online) {
              Evt._sendskill = [Evt.buttoned + '_backup', lib.skill[Evt.buttoned + '_backup']];
            }
            Evt.backup(Evt.buttoned + '_backup');
            if (info.prompt) {
              Evt.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
            }
          }
          else {
            ui.control.animate('nozoom', 100);
            Evt._aiexclude.add(Evt.buttoned);
          }
          Evt.goto(0);
          delete Evt.buttoned;
        }
      }, () => {
        if (Evt._aiexcludeclear) {
          delete Evt._aiexcludeclear;
          Evt._aiexclude.length = 0;
        }
        delete _status.noclearcountdown;
        if (Evt.skillDialog && get.objtype(Evt.skillDialog) == 'div') {
          Evt.skillDialog.close();
        }
        if (Evt.result && Evt.result.bool && !game.online && !Evt.nouse) {
          player.useResult(Evt.result, Evt);
        }
        else if (Evt._sendskill) {
          Evt.result._sendskill = Evt._sendskill;
        }
        if (Evt.dialog && typeof Evt.dialog == 'object') Evt.dialog.close();
        if (!_status.noclearcountdown) {
          game.stopCountChoose();
        }
      }, () => {
        if (Evt._result && Evt.result) {
          Evt.result.result = Evt._result;
        }
      }],
      /**
       * 选择以响应(牌|技能)
       * @name content.chooseToUse
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToRespond: [() => {
        if (Evt.responded) {
          delete Evt.dialog;
          return;
        }
        var skills = player.getSkills(true);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var info = lib.skill[skills[i]];
          if (info && info.onChooseToRespond) {
            info.onChooseToRespond(Evt);
          }
        }
        _status.noclearcountdown = true;
        if (!_status.connectMode && lib.config.skip_shan && Evt.autochoose && Evt.autochoose()) {
          Evt.result = { bool: false };
        }
        else {
          if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
            game.modeSwapPlayer(player);
          }
          if (Evt.isMine()) {
            if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
              ui.click.cancel();
              return;
            }
            var ok = game.check();
            if (!ok || !lib.config.auto_confirm) {
              game.pause();
              if (Evt.openskilldialog) {
                Evt.skillDialog = ui.create.dialog(Evt.openskilldialog);
                delete Evt.openskilldialog;
                Evt.dialog = Evt.prompt;
              }
              else {
                if (Evt.prompt) Evt.dialog = ui.create.dialog(Evt.prompt);
                if (Evt.prompt2) Evt.dialog.addText(Evt.prompt2);
              }
            }
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          var ok = game.check();
          if (ok) {
            ui.click.ok();
          }
          else if (ai.basic.chooseCard(Evt.ai)) {
            ui.click.ok();
            Evt._aiexcludeclear = true;
          }
          else if (Evt.skill && !Evt.norestore) {
            var skill = Evt.skill;
            ui.click.cancel();
            Evt._aiexclude.add(skill);
            var info = get.info(skill);
            if (info.sourceSkill) {
              Evt._aiexclude.add(info.sourceSkill);
            }
            Evt.redo();
            game.resume();
          }
          else {
            ui.click.cancel();
          }
          if (Evt.aidelay && Evt.result && Evt.result.bool) {
            game.delayx();
          }
        }
      }, () => {
        Evt.resume();
        if (Evt.result) {
          if (Evt.result.skill) {
            var info = get.info(Evt.result.skill);
            if (info && info.chooseButton) {
              if (Evt.dialog && typeof Evt.dialog == 'object') Evt.dialog.close();
              var dialog = info.chooseButton.dialog(Evt, player);
              if (info.chooseButton.chooseControl) {
                var next = player.chooseControl(info.chooseButton.chooseControl(Evt, player));
                next.dialog = dialog;
                next.set('ai', info.chooseButton.check || function () { return 0; });
              }
              else {
                var next = player.chooseButton(dialog);
                next.set('ai', info.chooseButton.check || function () { return 1; });
                next.set('filterButton', info.chooseButton.filter || function () { return true; });
                next.set('selectButton', info.chooseButton.select || 1);
              }
              Evt.buttoned = Evt.result.skill;
            }
            else if (info && info.precontent && !game.online) {
              var next = game.createEvent('pre_' + Evt.result.skill);
              next.setContent(info.precontent);
              next.set('result', Evt.result);
              next.set('player', player);
            }
          }
        }
      }, () => {
        if (Evt.buttoned) {
          if (result.bool || result.control && result.control != 'cancel2') {
            var info = get.info(Evt.buttoned).chooseButton;
            lib.skill[Evt.buttoned + '_backup'] = info.backup(info.chooseControl ? result : result.links, player);
            lib.skill[Evt.buttoned + '_backup'].sourceSkill = Evt.buttoned;
            if (game.online) {
              Evt._sendskill = [Evt.buttoned + '_backup', lib.skill[Evt.buttoned + '_backup']];
            }
            Evt.backup(Evt.buttoned + '_backup');
            if (info.prompt) {
              Evt.openskilldialog = info.prompt(info.chooseControl ? result : result.links, player);
            }
          }
          else {
            ui.control.animate('nozoom', 100);
            Evt._aiexclude.add(Evt.buttoned);
          }
          Evt.goto(0);
          delete Evt.buttoned;
        }
      }, () => {
        delete _status.noclearcountdown;
        if (Evt.skillDialog && get.objtype(Evt.skillDialog) == 'div') {
          Evt.skillDialog.close();
        }
        if (Evt.result.bool && !game.online) {
          if (Evt.result._sendskill) {
            lib.skill[Evt.result._sendskill[0]] = Evt.result._sendskill[1];
          }
          var info = get.info(Evt.result.skill);
          if (Evt.onresult) {
            Evt.onresult(Evt.result);
          }
          if (Evt.result.skill) {
            if (info.direct && !info.clearTime) {
              _status.noclearcountdown = true;
            }
          }
          if (Evt.logSkill) {
            if (typeof Evt.logSkill == 'string') {
              player.logSkill(Evt.logSkill);
            }
            else if (Array.isArray(Evt.logSkill)) {
              player.logSkill.apply(player, Evt.logSkill);
            }
          }
          if (!Evt.result.card && Evt.result.skill) {
            Evt.result.used = Evt.result.skill;
            player.useSkill(Evt.result.skill, Evt.result.cards, Evt.result.targets);
          }
          else {
            if (info && info.prerespond) {
              info.prerespond(Evt.result, player);
            }
            var next = player.respond(Evt.result.cards, Evt.result.card, Evt.animate, Evt.result.skill, Evt.source);
            if (Evt.result.noanimate) next.animate = false;
            if (Evt.parent.card && Evt.parent.type == 'card') {
              next.set('respondTo', [Evt.parent.player, Evt.parent.card]);
            }
            if (Evt.noOrdering) next.noOrdering = true;
          }
        }
        else if (Evt._sendskill) {
          Evt.result._sendskill = Evt._sendskill;
        }
        if (Evt.dialog && Evt.dialog.close) Evt.dialog.close();
        if (!_status.noclearcountdown) {
          game.stopCountChoose();
        }
      }],
      /**
       * 选择以弃置牌
       * @name content.chooseToDiscard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToDiscard: [() => {
        if (Evt.autochoose()) {
          Evt.result = {
            bool: true,
            autochoose: true,
            cards: player.getCards(Evt.position),
            rawcards: player.getCards(Evt.position),
          }
          for (var i = 0; i < Evt.result.cards.length; i++) {
            if (!lib.filter.cardDiscardable(Evt.result.cards[i], player, Evt)) {
              Evt.result.cards.splice(i--, 1);
            }
          }
        }
        else {
          // &&!lib.filter.wuxieSwap(trigger)
          if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
            game.modeSwapPlayer(player);
          }
          Evt.rangecards = player.getCards(Evt.position);
          for (var i = 0; i < Evt.rangecards.length; i++) {
            if (lib.filter.cardDiscardable(Evt.rangecards[i], player, Evt)) {
              Evt.rangecards.splice(i--, 1);
            }
            else {
              Evt.rangecards[i].uncheck('chooseToDiscard');
            }
          }
          var range = get.select(Evt.selectCard);
          game.check();
          if (Evt.isMine()) {
            if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
              ui.click.cancel();
              return;
            }
            game.pause();
            if (range[1] > 1 && typeof Evt.selectCard != 'function') {
              Evt.promptdiscard = ui.create.control('AI代选', function () {
                ai.basic.chooseCard(Evt.ai);
                if (_status.event.custom && _status.event.custom.add.card) {
                  _status.event.custom.add.card();
                }
                for (var i = 0; i < ui.selected.cards.length; i++) {
                  ui.selected.cards[i].updateTransform(true);
                }
              });
            }
            if (Array.isArray(Evt.dialog)) {
              Evt.dialog = ui.create.dialog.apply(this, Evt.dialog);
              Evt.dialog.open();
              Evt.dialog.classList.add('noselect');
            }
            else if (Evt.prompt != false) {
              var str;
              if (typeof (Evt.prompt) == 'string') str = Evt.prompt;
              else {
                str = '请弃置';
                if (range[0] == range[1]) str += get.cnNumber(range[0]);
                else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
                else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                str += '张';
                if (Evt.position == 'h' || Evt.position == undefined) str += '手';
                if (Evt.position == 'e') str += '装备';
                str += '牌';
              }
              Evt.dialog = ui.create.dialog(str);
              if (Evt.prompt2) {
                Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20);
              }
              if (Array.isArray(Evt.selectCard)) {
                Evt.promptbar = Evt.dialog.add('0/' + get.numStr(Evt.selectCard[1], 'card'));
                Evt.custom.add.card = function () {
                  _status.event.promptbar.innerHTML =
                    ui.selected.cards.length + '/' + get.numStr(_status.event.selectCard[1], 'card');
                }
              }
            }
            else if (get.itemtype(Evt.dialog) == 'dialog') {
              Evt.dialog.style.display = '';
              Evt.dialog.open();
            }
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseCard(Evt.ai) || forced) {
            ui.click.ok();
          }
          else if (Evt.skill) {
            var skill = Evt.skill;
            ui.click.cancel();
            Evt._aiexclude.add(skill);
            Evt.redo();
            game.resume();
          }
          else {
            ui.click.cancel();
          }
        }
        if (Evt.rangecards) {
          for (var i = 0; i < Evt.rangecards.length; i++) {
            Evt.rangecards[i].recheck('chooseToDiscard');
          }
        }
      }, () => {
        Evt.resume();
        if (Evt.promptdiscard) {
          Evt.promptdiscard.close();
        }
      }, () => {
        if (Evt.result.bool && Evt.result.cards && Evt.result.cards.length &&
          !game.online && Evt.autodelay && !Evt.isMine()) {
          if (typeof Evt.autodelay == 'number') {
            game.delayx(Evt.autodelay);
          }
          else {
            game.delayx();
          }
        }
      }, () => {
        if (Evt.logSkill && Evt.result.bool && !game.online) {
          if (typeof Evt.logSkill == 'string') {
            player.logSkill(Evt.logSkill);
          }
          else if (Array.isArray(Evt.logSkill)) {
            player.logSkill.apply(player, Evt.logSkill);
          }
        }
        if (!game.online) {
          if (typeof Evt.delay == 'boolean') {
            Evt.done = player.discard(Evt.result.cards).set('delay', Evt.delay);
          }
          else {
            Evt.done = player.discard(Evt.result.cards);
          }
        }
        if (Evt.dialog && Evt.dialog.close) Evt.dialog.close();
      }],
      /**
       * 拼点失败
       * @name content.chooseToCompareLose
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToCompareLose: function () {
        for (var i = 0; i < Evt.lose_list.length; i++) {
          var next = Evt.lose_list[i][0].lose(Evt.lose_list[i][1], ui.ordering);
          next.relatedEvent = Evt.getParent();
          next.getlx = false;
        }
      },
      /**
       * 多人拼点
       * @name content.chooseToCompareMultiple
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToCompareMultiple: [() => {
        if (player.countCards('h') == 0) {
          Evt.result = { cancelled: true, bool: false }
          Evt.finish();
          return;
        }
        for (var i = 0; i < targets.length; i++) {
          if (targets[i].countCards('h') == 0) {
            Evt.result = { cancelled: true, bool: false }
            Evt.finish();
            return;
          }
        }
        if (!Evt.multitarget) {
          targets.sort(lib.sort.seat);
        }
        game.log(player, '对', targets, '发起拼点');
      }, () => {
        Evt._result = [];
        Evt.list = targets.filter(function (current) {
          return !Evt.fixedResult || !Evt.fixedResult[current.playerid];
        });
        if (Evt.list.length || !Evt.fixedResult || !Evt.fixedResult[player.playerid]) {
          if (!Evt.fixedResult || !Evt.fixedResult[player.playerid]) Evt.list.unshift(player);
          player.chooseCardOL(Evt.list, '请选择拼点牌', true).set('type', 'compare').set('ai', Evt.ai).set('source', player).aiCard = function (target) {
            var hs = target.getCards('h');
            var Evt = _status.event;
            Evt.player = target;
            hs.sort(function (a, b) {
              return Evt.ai(b) - Evt.ai(a);
            });
            delete Evt.player;
            return { bool: true, cards: [hs[0]] };
          };
        }
      }, () => {
        var cards = [];
        var lose_list = [];
        if (Evt.fixedResult && Evt.fixedResult[player.playerid]) {
          Evt.list.unshift(player);
          result.unshift({ bool: true, cards: [Evt.fixedResult[player.playerid]] });
          lose_list.push([player, [Evt.fixedResult[player.playerid]]]);
        }
        else {
          if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
            player.logSkill(result[0].skill);
            result[0].cards = lib.skill[result[0].skill].onCompare(player)
          }
          else lose_list.push([player, result[0].cards]);
        };
        for (var j = 0; j < targets.length; j++) {
          if (Evt.list.contains(targets[j])) {
            var i = Evt.list.indexOf(targets[j]);
            if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
              Evt.list[i].logSkill(result[i].skill);
              result[i].cards = lib.skill[result[i].skill].onCompare(Evt.list[i]);
            }
            else lose_list.push([targets[j], result[i].cards]);
            cards.push(result[i].cards[0]);
          }
          else if (Evt.fixedResult && Evt.fixedResult[targets[j].playerid]) {
            cards.push(Evt.fixedResult[targets[j].playerid]);
            lose_list.push([targets[j], [Evt.fixedResult[targets[j].playerid]]]);
          }
        }
        if (lose_list.length) {
          game.loseAsync({
            lose_list: lose_list,
          }).setContent('chooseToCompareLose');
        }
        Evt.cardlist = cards;
        Evt.cards = cards;
        Evt.card1 = result[0].cards[0];
        Evt.num1 = Evt.card1.number;
        Evt.iwhile = 0;
        Evt.result = {
          player: Evt.card1,
          targets: Evt.cardlist.slice(0),
          num1: [],
          num2: [],
        };
        game.log(player, '的拼点牌为', Evt.card1);
      }, () => {
        if (Evt.iwhile < targets.length) {
          Evt.target = targets[Evt.iwhile];
          Evt.target.animate('target');
          player.animate('target');
          Evt.card2 = Evt.cardlist[Evt.iwhile];
          Evt.num2 = Evt.card2.number;
          game.log(Evt.target, '的拼点牌为', Evt.card2);
          player.line(Evt.target);
          player.$compare(Evt.card1, Evt.target, Evt.card2);
          Evt.trigger('compare');
          game.delay(0, 1500);
        }
        else {
          Evt.goto(7);
        }
      }, () => {
        Evt.result.num1[Evt.iwhile] = Evt.num1;
        Evt.result.num2[Evt.iwhile] = Evt.num2;
        var str;
        if (Evt.num1 > Evt.num2) {
          Evt.result.winner = player;
          Evt.result.loser = target;
          str = get.translation(player) + '拼点成功';
          player.popup('胜');
          target.popup('负');
        }
        else {
          str = get.translation(player) + '拼点失败';
          if (Evt.num1 == Evt.num2) {
            Evt.result.tie = true;
            player.popup('平');
            target.popup('平');
          }
          else {
            Evt.result.winner = target;
            Evt.result.loser = player;
            player.popup('负');
            target.popup('胜');
          }
        }
        game.broadcastAll(function (str) {
          var dialog = ui.create.dialog(str);
          dialog.classList.add('center');
          setTimeout(function () {
            dialog.close();
          }, 1000);
        }, str);
        game.delay(2);
      }, () => {
        if (Evt.callback) {
          game.broadcastAll(function (card1, card2) {
            if (card1.clone) card1.clone.style.opacity = 0.5;
            if (card2.clone) card2.clone.style.opacity = 0.5;
          }, Evt.card1, Evt.card2);
          var next = game.createEvent('compareMultiple');
          next.player = player;
          next.target = Evt.target;
          next.card1 = Evt.card1;
          next.card2 = Evt.card2;
          next.num1 = Evt.num1;
          next.num2 = Evt.num2;
          next.winner = Evt.result.winner;
          next.setContent(Evt.callback);
        }
      }, () => {
        game.broadcastAll(ui.clear);
        Evt.iwhile++;
        Evt.goto(3);
      }, () => {
        Evt.cards.add(Evt.card1);
      }],
      /**
       * 两人拼点
       * @name content.chooseToCompare
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseToCompare: [() => {
        if (player.countCards('h') == 0 || target.countCards('h') == 0) {
          Evt.result = { cancelled: true, bool: false }
          Evt.finish();
          return;
        }
        game.log(player, '对', target, '发起拼点');
        Evt.lose_list = [];
      }, () => {
        var sendback = function () {
          if (_status.event != Evt) {
            return function () {
              Evt.resultOL = _status.event.resultOL;
            };
          }
        };
        if (Evt.fixedResult && Evt.fixedResult[player.playerid]) {
          Evt.card1 = Evt.fixedResult[player.playerid];
          Evt.lose_list.push([player, Evt.card1]);
        }
        else if (player.isOnline()) {
          player.wait(sendback);
          Evt.ol = true;
          player.send(function (ai) {
            game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
            game.resume();
          }, Evt.ai);
        }
        else {
          Evt.localPlayer = true;
          player.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = Evt.ai;
        }
        if (Evt.fixedResult && Evt.fixedResult[target.playerid]) {
          Evt.card2 = Evt.fixedResult[target.playerid];
          Evt.lose_list.push([target, Evt.card2]);
        }
        else if (target.isOnline()) {
          target.wait(sendback);
          Evt.ol = true;
          target.send(function (ai) {
            game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
            game.resume();
          }, Evt.ai);
        }
        else {
          Evt.localTarget = true;
        }
      }, () => {
        if (Evt.localPlayer) {
          if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
            result.cards = lib.skill[result.skill].onCompare(player);
            player.logSkill(result.skill);
          }
          else Evt.lose_list.push([player, result.cards[0]]);
          Evt.card1 = result.cards[0];
        }
        if (Evt.localTarget) {
          target.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = Evt.ai;
        }
      }, () => {
        if (Evt.localTarget) {
          if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
            target.logSkill(result.skill);
            result.cards = lib.skill[result.skill].onCompare(target);
          }
          else Evt.lose_list.push([target, result.cards[0]]);
          Evt.card2 = result.cards[0];
        }
        if (!Evt.resultOL && Evt.ol) {
          game.pause();
        }
      }, () => {
        try {
          if (!Evt.card1) {
            if (Evt.resultOL[player.playerid].skill && lib.skill[Evt.resultOL[player.playerid].skill] && lib.skill[Evt.resultOL[player.playerid].skill].onCompare) {
              player.logSkill(Evt.resultOL[player.playerid].skill);
              Evt.resultOL[player.playerid].cards = lib.skill[Evt.resultOL[player.playerid].skill].onCompare(player);
            }
            else Evt.lose_list.push([player, Evt.resultOL[player.playerid].cards[0]]);
            Evt.card1 = Evt.resultOL[player.playerid].cards[0];
          };
          if (!Evt.card2) {
            if (Evt.resultOL[target.playerid].skill && lib.skill[Evt.resultOL[target.playerid].skill] && lib.skill[Evt.resultOL[target.playerid].skill].onCompare) {
              target.logSkill(Evt.resultOL[target.playerid].skill);
              Evt.resultOL[target.playerid].cards = lib.skill[Evt.resultOL[target.playerid].skill].onCompare(player);
            }
            else Evt.lose_list.push([target, Evt.resultOL[target.playerid].cards[0]]);
            Evt.card2 = Evt.resultOL[target.playerid].cards[0];
          }
          if (!Evt.card1 || !Evt.card2) {
            throw ('err');
          }
        }
        catch (e) {
          console.log(e);
          game.print(e);
          Evt.finish();
          return;
        }
        if (Evt.card2.number >= 10 || Evt.card2.number <= 4) {
          if (target.countCards('h') > 2) {
            Evt.addToAI = true;
          }
        }
        if (Evt.lose_list.length) {
          game.loseAsync({
            lose_list: Evt.lose_list,
          }).setContent('chooseToCompareLose');
        }
      }, () => {
        game.broadcast(function () {
          ui.arena.classList.add('thrownhighlight');
        });
        ui.arena.classList.add('thrownhighlight');
        game.addVideo('thrownhighlight1');
        player.$compare(Evt.card1, target, Evt.card2);
        game.log(player, '的拼点牌为', Evt.card1);
        game.log(target, '的拼点牌为', Evt.card2);
        Evt.num1 = Evt.card1.number;
        Evt.num2 = Evt.card2.number;
        Evt.trigger('compare');
        game.delay(0, 1500);
      }, () => {
        Evt.result = {
          player: Evt.card1,
          target: Evt.card2,
          num1: Evt.num1,
          num2: Evt.num2
        }
        var str;
        if (Evt.num1 > Evt.num2) {
          Evt.result.bool = true;
          Evt.result.winner = player;
          Evt.result.loser = target;
          str = get.translation(player) + '拼点成功';
          player.popup('胜');
          target.popup('负');
        }
        else {
          Evt.result.bool = false;
          str = get.translation(player) + '拼点失败';
          if (Evt.num1 == Evt.num2) {
            Evt.result.tie = true;
            player.popup('平');
            target.popup('平');
          }
          else {
            Evt.result.winner = target;
            Evt.result.loser = player;
            player.popup('负');
            target.popup('胜');
          }
        }
        game.broadcastAll(function (str) {
          var dialog = ui.create.dialog(str);
          dialog.classList.add('center');
          setTimeout(function () {
            dialog.close();
          }, 1000);
        }, str);
        game.delay(2);
      }, () => {
        if (typeof Evt.target.ai.shown == 'number' && Evt.target.ai.shown <= 0.85 && Evt.addToAI) {
          Evt.target.ai.shown += 0.1;
        }
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
        else if (Evt.preserve == 'win') {
          Evt.preserve = Evt.result.bool;
        }
        else if (Evt.preserve == 'lose') {
          Evt.preserve = !Evt.result.bool;
        }
      }],
      /**
       * 选择以获得一项技能
       * @name content.discoverSkill
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      discoverSkill: [function () {
        var num = Evt.num || 3;
        var choice;
        if (typeof Evt.list == 'string' || typeof Evt.list == 'function') {
          choice = get.gainableSkills(Evt.list).randomGets(num);
        }
        else if (Array.isArray(Evt.list)) {
          choice = Evt.list.randomGets(num);
        }
        else {
          choice = Array.from(Evt.list).randomGets(num);
        }
        if (!choice.length) {
          Evt.finish();
          Evt.result = { bool: false };
          return;
        }
        Evt.skillai = Evt.ai || function (list) {
          return get.max(list, get.skillRank, 'item');
        };
        if (_status.connectMode) {
          if (choice.length == 1) Evt._result = { control: list[0] };
          else player.chooseControl(choice).set('prompt', '选择获得一个技能').set('forceDie', true).set('ai', function () {
            return Evt.skillai(choice);
          });
        }
        else if (Evt.isMine()) {
          game.check();
          game.pause();
          Evt.dialog = ui.create.dialog('forcebutton');
          Evt.dialog.add(Evt.prompt || '选择获得一项技能');
          var clickItem = function () {
            _status.event._result = this.link;
            game.resume();
          };
          for (i = 0; i < choice.length; i++) {
            if (lib.translate[choice[i] + '_info']) {
              var translation = get.translation(choice[i]);
              if (translation[0] == '新' && translation.length == 3) {
                translation = translation.slice(1, 3);
              }
              else {
                translation = translation.slice(0, 2);
              }
              var item = Evt.dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">' +
                translation + '</div><div>' + lib.translate[choice[i] + '_info'] + '</div></div>');
              item.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickItem);
              item.firstChild.link = choice[i];
            }
          }
          Evt.dialog.add(ui.create.div('.placeholder'));
          Evt.switchToAuto = function () {
            Evt._result = Evt.skillai(Evt.choice);
            game.resume();
          };
          if (Evt.isMine() || Evt.dialogdisplay) {
            Evt.dialog.style.display = '';
            Evt.dialog.open();
          }
          game.countChoose();
          Evt.choosing = true;
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt._result = Evt.skillai(choice);
        }
      }, function () {
        if (_status.connectMode) {
          Evt.result = { bool: true, skill: result.control };
        } else {
          if (Evt.dialog) {
            Evt.dialog.close();
          }
          Evt.choosing = false;
          Evt.result = { bool: true, skill: result };
        }
      }],
      /**
       * 选择以获得一项技能
       * @name content.chooseSkill
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseSkill: [function () {
        var list;
        if (typeof Evt.target == 'string') {
          list = get.gainableSkillsName(Evt.target, Evt.func);
        }
        else {
          list = Evt.target.getGainableSkills(Evt.func);
        }
        if (!list.length) {
          Evt.finish();
          Evt.result = { bool: false };
          return;
        }
        Evt.skillai = function (list) {
          return get.max(list, get.skillRank, 'item');
        };
        if (Evt.isMine()) {
          var dialog = ui.create.dialog('forcebutton');
          dialog.add(Evt.prompt || '选择获得一项技能');
          _status.event.list = list;
          var clickItem = function () {
            _status.event._result = this.link;
            game.resume();
          };
          for (i = 0; i < list.length; i++) {
            if (lib.translate[list[i] + '_info']) {
              var translation = get.translation(list[i]);
              if (translation[0] == '新' && translation.length == 3) {
                translation = translation.slice(1, 3);
              }
              else {
                translation = translation.slice(0, 2);
              }
              var item = dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">' +
                translation + '</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
              item.firstChild.addEventListener('click', clickItem);
              item.firstChild.link = list[i];
            }
          }
          dialog.add(ui.create.div('.placeholder'));
          Evt.dialog = dialog;
          Evt.switchToAuto = function () {
            Evt._result = Evt.skillai(Evt.list);
            game.resume();
          };
          _status.imchoosing = true;
          game.pause();
        }
        else {
          Evt._result = Evt.skillai(list);
        }
      }, function () {
        _status.imchoosing = false;
        if (Evt.dialog) {
          Evt.dialog.close();
        }
        Evt.result = { bool: true, skill: result };
      }],
      /**
       * 选择以(获得|使用)牌
       * @name content.chooseSkill
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      discoverCard: [function () {
        var num = Evt.num || 3;
        var choice;
        if (typeof Evt.list == 'string' || typeof Evt.list == 'function') {
          choice = get.inpile(Evt.list).randomGets(num);
        }
        else if (Array.isArray(Evt.list)) {
          choice = Evt.list.randomGets(num);
        }
        else {
          choice = Array.from(Evt.list).randomGets(num);
        }
        if (choice.length) {
          var prompt = Evt.prompt;
          if (!prompt) {
            prompt = '选择一张牌';
            if (Evt.use) {
              prompt += '使用之';
            }
            else if (!Evt.nogain) {
              prompt += '获得之';
            }
          }
          if (typeof choice[0] === 'string') {
            var next = player.chooseVCardButton(choice, prompt, Evt.forced);
            if (Evt.ai) {
              next.set('ai', Evt.ai);
            }
          }
          else if (get.itemtype(choice[0]) == 'card') {
            var next = player.chooseCardButton(choice, prompt, Evt.forced);
            if (Evt.ai) {
              next.set('ai', Evt.ai);
            }
          }
          else {
            Evt.finish();
          }
        }
        else {
          Evt.finish();
        }
      }, function () {
        Evt.result = {
          bool: result.bool,
          card: null,
          choice: null
        };
        if (result.bool && result.links.length) {
          var link = result.links[0];
          var togain = null;
          if (get.itemtype(link) == 'card') {
            Evt.result.card = link;
            togain = link;
          }
          else if (Array.isArray(link)) {
            Evt.result.choice = link[2];
            togain = game.createCard(link[2]);
          }
          if (togain) {
            if (Evt.use) {
              player.chooseUseTarget(togain);
            }
            else if (!Evt.nogain) {
              player.gain(togain, 'draw');
              game.log(player, '获得了一张牌');
            }
          }
        }
      }],
      /**
       * 选择项(按钮)
       * @name content.chooseButton
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseButton: [() => {
        if (typeof Evt.dialog == 'number') {
          Evt.dialog = get.idDialog(Evt.dialog);
        }
        if (Evt.createDialog && !Evt.dialog) {
          if (Array.isArray(Evt.createDialog)) {
            Evt.createDialog.add('hidden');
            Evt.dialog = ui.create.dialog.apply(this, Evt.createDialog);
          }
          Evt.closeDialog = true;
        }
        if (Evt.dialog == undefined) Evt.dialog = ui.dialog;
        if (Evt.isMine() || Evt.dialogdisplay) {
          Evt.dialog.style.display = '';
          Evt.dialog.open();
        }
        game.check();
        if (Evt.isMine()) {
          if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
            ui.click.cancel();
            return;
          }
          game.pause();
        }
        else if (Evt.isOnline()) {
          Evt.send();
          delete Evt.callback;
        }
        else {
          Evt.result = 'ai';
        }
        if (Evt.onfree) {
          lib.init.onfree();
        }
      }, () => {
        if (Evt.result == 'ai') {
          if (Evt.processAI) {
            Evt.result = Evt.processAI();
          }
          else {
            game.check();
            if (ai.basic.chooseButton(Evt.ai) || forced) ui.click.ok();
            else ui.click.cancel();
          }
        }
        if (Evt.closeDialog) {
          Evt.dialog.close();
        }
        if (Evt.callback) {
          Evt.callback(Evt.player, Evt.result);
        }
        Evt.resume();
      }],
      /**
       * 多人选择牌
       * @name content.chooseCardOL
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseCardOL: [function () {
        Evt.targets = Evt.list.slice(0);
        if (!_status.connectMode) {
          Evt.result = [];
          Evt.goto(7);
        }
        else {
          for (var i = 0; i < Evt.list.length; i++) {
            var target = Evt.list[i];
            target.wait();
            if (target.isOnline()) {
              target.send(function (args, set) {
                game.me.chooseCard.apply(game.me, args).set(set);
                game.resume();
              }, Evt._args, Evt._set);
              Evt.list.splice(i--, 1);
            }
            else if (target == game.me) {
              Evt.withme = true;
              Evt.list.splice(i--, 1);
            }
          }
        }
      }, function () {
        if (Evt.list.length) {
          Evt.target = Evt.list.shift();
          Evt.target.chooseCard.apply(Evt.target, Evt._args).set(Evt._set);
        }
        else {
          Evt.goto(3);
        }
      }, function () {
        Evt.target.unwait(result);
        Evt.goto(1);
      }, function () {
        if (Evt.withme) {
          game.me.chooseCard.apply(game.me, Evt._args).set(Evt._set);
        }
        else {
          Evt.goto(5);
        }
      }, function () {
        game.me.unwait(result);
      }, function () {
        if (!Evt.resultOL) {
          game.pause();
        }
      }, function () {
        Evt.result = [];
        for (var i = 0; i < Evt.targets.length; i++) {
          Evt.result[i] = Evt.resultOL[Evt.targets[i].playerid] || {};
          if (Evt.result[i] == 'ai' && Evt.aiCard) {
            Evt.result[i] = Evt.aiCard(Evt.targets[i]);
          }
        }
        Evt.finish();
      }, function () {
        if (Evt.list.length) {
          Evt.target = Evt.list.shift();
          Evt.target.chooseCard.apply(Evt.target, Evt._args).set(Evt._set);
        }
        else {
          for (var i = 0; i < Evt.targets.length; i++) {
            if (!Evt.result[i]) {
              Evt.result[i] = {};
            }
          }
          Evt.finish();
        }
      }, function () {
        Evt.result[Evt.targets.indexOf(Evt.target)] = result;
        Evt.goto(7);
      }],
      /**
       * 多人选择项(按钮)
       * @name content.chooseButtonOL
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseButtonOL: [function () {
        ui.arena.classList.add('markhidden');
        for (var i = 0; i < Evt.list.length; i++) {
          var current = Evt.list[i];
          current[0].wait();
          if (current[0].isOnline()) {
            var target = current.shift();
            target.send(function (args, callback, switchToAuto, processAI) {
              ui.arena.classList.add('markhidden');
              var next = game.me.chooseButton.apply(game.me, args);
              next.callback = callback;
              next.switchToAuto = switchToAuto;
              next.processAI = processAI;
              next.complexSelect = true;
              game.resume();
            }, current, Evt.callback, Evt.switchToAuto, Evt.processAI);
            target._choose_button_ol = current;
            Evt.list.splice(i--, 1);
          }
          else if (current[0] == game.me) {
            Evt.last = current;
            Evt.last.shift();
            Evt.list.splice(i--, 1);
          }
        }
      }, function () {
        if (Evt.list.length) {
          var current = Evt.list.shift();
          if (current.length)
            Evt.target = current.shift();
          else {
            Evt.target = current;
            current = null;
          }
          var next = Evt.target.chooseButton.apply(Evt.target, current);
          next.callback = Evt.callback;
          next.switchToAuto = Evt.switchToAuto;
          next.processAI = Evt.processAI;
        }
        else {
          Evt.goto(3);
        }
      }, function () {
        Evt.target.unwait(result);
        Evt.goto(1);
      }, function () {
        if (Evt.last) {
          var next = game.me.chooseButton.apply(game.me, Evt.last);
          next.callback = Evt.callback;
          next.switchToAuto = Evt.switchToAuto;
          next.processAI = Evt.processAI;
        }
        else {
          Evt.goto(5);
        }
      }, function () {
        game.me.unwait(result);
      }, function () {
        if (!Evt.resultOL) {
          game.pause();
        }
      }, function () {
        game.broadcastAll(function () {
          ui.arena.classList.remove('markhidden');
        });
        Evt.result = Evt.resultOL;
      }],
      /**
       * 选择牌
       * @name content.chooseCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseCard: [() => {
        if (Evt.directresult) {
          Evt.result = {
            buttons: [],
            cards: Evt.directresult.slice(0),
            targets: [],
            confirm: 'ok',
            bool: true,
            links: []
          };
        }
        else {
          game.check();
          if (Evt.isMine()) {
            game.pause();
            if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
              ui.click.cancel();
              return;
            }
            if (Evt.prompt != false) {
              var str;
              if (typeof Evt.prompt == 'string') str = Evt.prompt;
              else {
                str = '请选择'
                var range = get.select(Evt.selectCard);
                if (range[0] == range[1]) str += get.cnNumber(range[0]);
                else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
                else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                str += '张';
                if (Evt.position == 'h' || Evt.position == undefined) str += '手';
                if (Evt.position == 'e') str += '装备';
                str += '牌';
              }
              Evt.dialog = ui.create.dialog(str);
              if (Evt.prompt2) {
                Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20);
              }
              if (Array.isArray(Evt.promptx)) {
                for (var i = 0; i < Evt.promptx.length; i++) {
                  Evt.dialog.add(Evt.promptx[i]);
                }
              }
              if (Array.isArray(Evt.selectCard)) {
                Evt.promptbar = Evt.dialog.add('0/' + get.numStr(Evt.selectCard[1], 'card'));
                Evt.custom.add.card = function () {
                  _status.event.promptbar.innerHTML =
                    ui.selected.cards.length + '/' + get.numStr(_status.event.selectCard[1], 'card');
                }
              }
            }
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseCard(Evt.ai) || forced) {
            ui.click.ok();
          }
          else if (Evt.skill) {
            var skill = Evt.skill;
            ui.click.cancel();
            Evt._aiexclude.add(skill);
            Evt.redo();
            game.resume();
          }
          else {
            ui.click.cancel();
          }
        }
      }, () => {
        Evt.resume();
        if (Evt.glow_result && Evt.result.cards && !Evt.directresult) {
          for (var i = 0; i < Evt.result.cards.length; i++) {
            Evt.result.cards[i].classList.add('glow');
          }
        }
        if (Evt.dialog) Evt.dialog.close();
      }],
      /**
       * 选择角色对象
       * @name content.chooseTarget
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseTarget: [() => {
        if (Evt.isMine()) {
          if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
            ui.click.cancel();
            return;
          }
          game.check();
          game.pause();
          if (Evt.createDialog && !Evt.dialog && Array.isArray(Evt.createDialog)) {
            Evt.dialog = ui.create.dialog.apply(this, Evt.createDialog);
          }
          else if (Evt.prompt != false) {
            var str;
            if (typeof Evt.prompt == 'string') str = Evt.prompt;
            else {
              str = '请选择'
              var range = get.select(Evt.selectTarget);
              if (range[0] == range[1]) str += get.cnNumber(range[0]);
              else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
              else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
              str += '个目标';
            }
            Evt.dialog = ui.create.dialog(str);
            if (Evt.prompt2) {
              Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20);
            }
            if (Evt.promptbar != 'none') {
              Evt.promptbar = Evt.dialog.add('0/' + get.numStr(get.select(Evt.selectTarget)[1], 'target'));
              Evt.custom.add.target = function () {
                _status.event.promptbar.innerHTML =
                  ui.selected.targets.length + '/' + get.numStr(get.select(Evt.selectTarget)[1], 'target');
              }
            }
          }
          else if (get.itemtype(Evt.dialog) == 'dialog') {
            Evt.dialog.open();
          }
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.result = 'ai';
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseTarget(Evt.ai) || forced) {
            ui.click.ok();
          }
          else {
            ui.click.cancel();
          }
        }
        if (Evt.result.bool && Evt.animate !== false) {//play anim
          for (var i = 0; i < Evt.result.targets.length; i++) {
            Evt.result.targets[i].animate('target');
          }
        }
        if (Evt.dialog) Evt.dialog.close();
        Evt.resume();
      }, () => {
        if (Evt.onresult) {
          Evt.onresult(Evt.result);
        }
        if (Evt.result.bool && Evt.autodelay && !Evt.isMine()) {
          if (typeof Evt.autodelay == 'number') {
            game.delayx(Evt.autodelay);
          }
          else {
            game.delayx();
          }
        }
      }],
      /**
       * 选择卡牌和目标角色
       * @name content.chooseCardTarget
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseCardTarget: [() => {
        if (Evt.isMine()) {
          if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
            ui.click.cancel();
            return;
          }
          game.check();
          game.pause();
          if (Evt.prompt != false) {
            Evt.dialog = ui.create.dialog(Evt.prompt || '请选择卡牌和目标');
            if (Evt.prompt2) {
              Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20);
            }
          }
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.result = 'ai';
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseCard(Evt.ai1)) {
            if (ai.basic.chooseTarget(Evt.ai2)) {
              ui.click.ok();
              _status.event._aiexclude.length = 0;
            }
            else {
              ui.click.cancel();
            }
          }
          else {
            ui.click.cancel();
          }
        }
      }, () => {
        Evt.resume();
        if (Evt.result.bool && Evt.animate !== false) {
          for (var i = 0; i < Evt.result.targets.length; i++) {
            Evt.result.targets[i].animate('target');
          }
        }
        if (Evt.dialog) Evt.dialog.close();
      }],
      /**
       * 选择项(列表项)
       * @name content.chooseControl
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseControl: [() => {
        if (Evt.controls.length == 0) {
          if (Evt.sortcard) {
            var sortnum = 2;
            if (Evt.sorttop) {
              sortnum = 1;
            }
            for (var i = 0; i < Evt.sortcard.length + sortnum; i++) {
              Evt.controls.push(get.cnNumber(i, true));
            }
          }
          else if (Evt.choiceList) {
            for (var i = 0; i < Evt.choiceList.length; i++) {
              Evt.controls.push('选项' + get.cnNumber(i + 1, true));
            }
          }
          else {
            Evt.finish();
            return;
          }
        }
        else if (Evt.choiceList && Evt.controls.length == 1 && Evt.controls[0] == 'cancel2') {
          Evt.controls.shift();
          for (var i = 0; i < Evt.choiceList.length; i++) {
            Evt.controls.push('选项' + get.cnNumber(i + 1, true));
          }
          Evt.controls.push('cancel2');
        }
        if (Evt.isMine()) {
          if (Evt.arrangeSkill) {
            var hidden = player.hiddenSkills.slice(0);
            game.expandSkills(hidden);
            if (hidden.length) {
              for (var i of Evt.controls) {
                if (_status.prehidden_skills.contains(i) && hidden.contains(i)) {
                  Evt.result = {
                    bool: true,
                    control: i,
                  }
                  return;
                }
              }
            }
          }
          else if (Evt.hsskill && _status.prehidden_skills.contains(Evt.hsskill) && Evt.controls.contains('cancel2')) {
            Evt.result = {
              bool: true,
              control: 'cancel2',
            }
            return;
          }
          if (Evt.sortcard) {
            var prompt = Evt.prompt || '选择一个位置';
            if (Evt.tosort) {
              prompt += '放置' + get.translation(Evt.tosort);
            }
            Evt.dialog = ui.create.dialog(prompt, 'hidden');
            if (Evt.sortcard && Evt.sortcard.length) {
              Evt.dialog.addSmall(Evt.sortcard);
            }
            else {
              Evt.dialog.buttons = [];
              Evt.dialog.add(ui.create.div('.buttons'));
            }
            var buttons = Evt.dialog.content.lastChild;
            var sortnum = 2;
            if (Evt.sorttop) {
              sortnum = 1;
            }
            for (var i = 0; i < Evt.dialog.buttons.length + sortnum; i++) {
              var item = ui.create.div('.button.card.pointerdiv.mebg');
              item.style.width = '50px';
              buttons.insertBefore(item, Evt.dialog.buttons[i]);
              item.innerHTML = '<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第' + get.cnNumber(i + 1, true) + '张</div>';
              if (i == Evt.dialog.buttons.length + 1) {
                item.firstChild.innerHTML = '牌堆底';
              }
              item.link = get.cnNumber(i, true);
              item.listen(ui.click.dialogcontrol);
            }

            Evt.dialog.forcebutton = true;
            Evt.dialog.classList.add('forcebutton');
            Evt.dialog.open();
          }
          else if (Evt.dialogcontrol) {
            Evt.dialog = ui.create.dialog(Evt.prompt || '选择一项', 'hidden');
            for (var i = 0; i < Evt.controls.length; i++) {
              var item = Evt.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">' + Evt.controls[i] + '</div>');
              item.firstChild.listen(ui.click.dialogcontrol);
              item.firstChild.link = Evt.controls[i];
            }
            Evt.dialog.forcebutton = true;
            Evt.dialog.classList.add('forcebutton');
            if (Evt.addDialog) {
              for (var i = 0; i < Evt.addDialog.length; i++) {
                if (get.itemtype(Evt.addDialog[i]) == 'cards') {
                  Evt.dialog.addSmall(Evt.addDialog[i]);
                }
                else {
                  Evt.dialog.add(Evt.addDialog[i]);
                }
              }
              Evt.dialog.add(ui.create.div('.placeholder.slim'));
            }
            Evt.dialog.open();
          }
          else {
            if (Evt.seperate || lib.config.seperate_control) {
              Evt.controlbars = [];
              for (var i = 0; i < Evt.controls.length; i++) {
                Evt.controlbars.push(ui.create.control([Evt.controls[i]]));
              }
            }
            else {
              Evt.controlbar = ui.create.control(Evt.controls);
            }
            if (Evt.dialog) {
              if (Array.isArray(Evt.dialog)) {
                Evt.dialog = ui.create.dialog.apply(this, Evt.dialog);
              }
              Evt.dialog.open();
            }
            else if (Evt.choiceList) {
              Evt.dialog = ui.create.dialog(Evt.prompt || '选择一项', 'hidden');
              Evt.dialog.forcebutton = true;
              Evt.dialog.open();
              for (var i = 0; i < Evt.choiceList.length; i++) {
                Evt.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">选项' +
                  get.cnNumber(i + 1, true) + '：' + Evt.choiceList[i] + '</div>');
              }
            }
            else if (Evt.prompt) {
              Evt.dialog = ui.create.dialog(Evt.prompt);
              if (Evt.prompt2) {
                Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20 || Evt.centerprompt2);
              }
            }
          }
          game.pause();
          game.countChoose();
          Evt.choosing = true;
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.result = 'ai';
        }
      }, () => {
        if (Evt.result == 'ai') {
          Evt.result = {};
          if (Evt.ai) {
            var result = Evt.ai(Evt.getParent(), player);
            if (typeof result == 'number') Evt.result.control = Evt.controls[result];
            else Evt.result.control = result;
          }
          else Evt.result.control = Evt.controls[Evt.choice];
        }
        Evt.result.index = Evt.controls.indexOf(Evt.result.control);
        Evt.choosing = false;
        _status.imchoosing = false;
        if (Evt.dialog && Evt.dialog.close) Evt.dialog.close();
        if (Evt.controlbar) Evt.controlbar.close();
        if (Evt.controlbars) {
          for (var i = 0; i < Evt.controlbars.length; i++) {
            Evt.controlbars[i].close();
          }
        }
        Evt.resume();
      }],
      /**
       * 确认项(确认|取消)
       * @name content.chooseBool
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseBool: [() => {
        if (Evt.isMine()) {
          if (Evt.frequentSkill && !lib.config.autoskilllist.contains(Evt.frequentSkill)) {
            ui.click.ok();
            return;
          }
          else if (Evt.hsskill && _status.prehidden_skills.contains(Evt.hsskill)) {
            ui.click.cancel();
            return;
          }
          ui.create.confirm('oc');
          if (Evt.createDialog && !Evt.dialog) {
            if (Array.isArray(Evt.createDialog)) {
              Evt.dialog = ui.create.dialog.apply(this, Evt.createDialog);
              if (Evt.dialogselectx) {
                for (var i = 0; i < Evt.dialog.buttons.length; i++) {
                  Evt.dialog.buttons[i].classList.add('selectedx');
                }
              }
            }
          }
          if (Evt.dialog) {
            Evt.dialog.open();
          }
          else if (Evt.prompt) {
            Evt.dialog = ui.create.dialog(Evt.prompt);
            if (Evt.prompt2) {
              Evt.dialog.addText(Evt.prompt2, Evt.prompt2.length <= 20);
            }
          }
          game.pause();
          game.countChoose();
          Evt.choosing = true;
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.result = 'ai';
        }
      }, () => {
        if (Evt.result == 'ai') {
          if (Evt.ai) {
            Evt.choice = Evt.ai(Evt.getParent(), player);
          }
          Evt.result = { bool: Evt.choice };
        }
        _status.imchoosing = false;
        Evt.choosing = false;
        if (Evt.dialog) Evt.dialog.close();
        Evt.resume();
      }],
      /**
       * 选择(摸牌|回血)
       * @name content.chooseDrawRecover
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      chooseDrawRecover: [function () {
        if (player.isHealthy() && Evt.forced) {
          player.draw(Evt.num1);
          Evt.finish();
          return;
        }
        var controls = ['draw_card'];
        if (player.isDamaged()) {
          Evt.num2 = Math.min(Evt.num2, player.maxHp - player.hp);
          controls.push('recover_hp');
        }
        if (!Evt.forced) {
          controls.push('cancel2');
        }
        var prompt = Evt.prompt;
        if (!prompt) {
          if (player.isHealthy()) {
            prompt = '是否摸' + get.cnNumber(Evt.num1) + '张牌？';
          }
          else {
            prompt = '摸' + get.cnNumber(Evt.num1) + '张牌或回复' + get.cnNumber(Evt.num2) + '点' + get.translation('hp');
          }
        }
        var next = player.chooseControl(controls);
        next.set('prompt', prompt);
        if (Evt.hsskill) next.setHiddenSkill(Evt.hsskill);
        if (Evt.ai) {
          next.set('ai', Evt.ai);
        }
        else {
          var choice;
          if (player.isDamaged() && get.recoverEffect(player) > 0 && (
            player.hp == 1 || player.needsToDiscard() ||
            player.hasSkillTag('maixie_hp') || Evt.num2 > Evt.num1 ||
            (Evt.num2 == Evt.num1 && player.needsToDiscard(1))
          )) {
            choice = 'recover_hp';
          }
          else {
            choice = 'draw_card';
          }
          next.set('ai', function () {
            return _status.event.choice;
          });
          next.set('choice', choice);
        }
      }, function () {
        if (result.control != 'cancel2') {
          if (Evt.logSkill) {
            if (typeof Evt.logSkill == 'string') {
              player.logSkill(Evt.logSkill);
            }
            else if (Array.isArray(Evt.logSkill)) {
              player.logSkill.apply(player, Evt.logSkill);
            }
          }
          if (result.control == 'draw_card') {
            player.draw(Evt.num1);
          }
          else {
            player.recover(Evt.num2);
          }
        }
        Evt.result = result;
      }],
      /**
       * 从目标角色选择牌
       * @name content.choosePlayerCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      choosePlayerCard: [() => {
        if (!Evt.dialog) Evt.dialog = ui.create.dialog('hidden');
        else if (!Evt.isMine) {
          Evt.dialog.style.display = 'none';
        }
        if (Evt.prompt) {
          Evt.dialog.add(Evt.prompt);
        }
        else {
          Evt.dialog.add('选择' + get.translation(target) + '的一张牌');
        }
        if (Evt.prompt2) {
          Evt.dialog.addText(Evt.prompt2);
        }
        var directh = (!lib.config.unauto_choose && !Evt.complexSelect);
        directh = game.showPlayerCard(Evt, target, directh, null);
        if (Evt.dialog.buttons.length == 0) {
          Evt.finish();
          return;
        }
        var cs = target.getCards(Evt.position);
        var select = get.select(Evt.selectButton);
        if (Evt.forced && select[0] >= cs.length) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons,
            links: cs
          }
        }
        else if (Evt.forced && directh && !Evt.isOnline() && select[0] == select[1]) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons.randomGets(select[0]),
            links: []
          }
          for (var i = 0; i < Evt.result.buttons.length; i++) {
            Evt.result.links[i] = Evt.result.buttons[i].link;
          }
        }
        else {
          if (Evt.isMine()) {
            if (Evt.hsskill && !Evt.forced && _status.prehidden_skills.contains(Evt.hsskill)) {
              ui.click.cancel();
              return;
            }
            Evt.dialog.open();
            game.check();
            game.pause();
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseButton(Evt.ai) || forced) ui.click.ok();
          else ui.click.cancel();
        }
        Evt.dialog.close();
        if (Evt.result.links) {
          Evt.result.cards = Evt.result.links.slice(0);
        }
        Evt.resume();
      }],
      /**
       * 从目标角色选择牌弃置
       * @name content.discardPlayerCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      discardPlayerCard: [() => {
        if (Evt.directresult) {
          Evt.result = {
            buttons: [],
            cards: Evt.directresult.slice(0),
            links: Evt.directresult.slice(0),
            targets: [],
            confirm: 'ok',
            bool: true
          };
          Evt.cards = Evt.directresult.slice(0);
          Evt.goto(2);
          return;
        }
        if (!Evt.dialog) Evt.dialog = ui.create.dialog('hidden');
        else if (!Evt.isMine) {
          Evt.dialog.style.display = 'none';
        }
        if (Evt.prompt == undefined) {
          var str = '弃置' + get.translation(target);
          var range = get.select(Evt.selectButton);
          if (range[0] == range[1]) str += get.cnNumber(range[0]);
          else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
          else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
          str += '张';
          if (Evt.position == 'h' || Evt.position == undefined) str += '手';
          if (Evt.position == 'e') str += '装备';
          str += '牌';
          Evt.prompt = str;
        }
        if (Evt.prompt) {
          Evt.dialog.add(Evt.prompt);
        }
        if (Evt.prompt2) {
          Evt.dialog.addText(Evt.prompt2);
        }
        var directh = (!lib.config.unauto_choose && !Evt.complexSelect);
        directh = game.showPlayerCard(Evt, target, directh, 'canBeDiscarded');
        if (Evt.dialog.buttons.length == 0) {
          Evt.finish();
          return;
        }
        var cs = target.getCards(Evt.position);
        var select = get.select(Evt.selectButton);
        if (Evt.forced && select[0] >= cs.length) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons,
            links: cs
          }
        }
        else if (Evt.forced && directh && !Evt.isOnline() && select[0] == select[1]) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons.randomGets(select[0]),
            links: []
          }
          for (var i = 0; i < Evt.result.buttons.length; i++) {
            Evt.result.links[i] = Evt.result.buttons[i].link;
          }
        }
        else {
          if (Evt.isMine()) {
            Evt.dialog.open();
            game.check();
            game.pause();
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseButton(Evt.ai) || forced) ui.click.ok();
          else ui.click.cancel();
        }
        Evt.dialog.close();
      }, () => {
        Evt.resume();
        if (Evt.result.bool && Evt.result.links && !game.online) {
          if (Evt.logSkill) {
            if (typeof Evt.logSkill == 'string') {
              player.logSkill(Evt.logSkill);
            }
            else if (Array.isArray(Evt.logSkill)) {
              player.logSkill.apply(player, Evt.logSkill);
            }
          }
          var cards = [];
          for (var i = 0; i < Evt.result.links.length; i++) {
            cards.push(Evt.result.links[i]);
          }
          Evt.result.cards = Evt.result.links.slice(0);
          Evt.cards = cards;
          Evt.trigger("rewriteDiscardResult");
        }
      }, () => {
        if (Evt.boolline) {
          player.line(target, 'green');
        }
        if (!Evt.chooseonly) {
          var next = target.discard(Evt.cards);
          if (player != target) next.notBySelf = true;
          Evt.done = next;
          if (Evt.delay === false) {
            next.set('delay', false);
          }
        }
      }],
      /**
       * 从目标角色选择牌获得
       * @name content.gainPlayerCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      gainPlayerCard: [() => {
        if (Evt.directresult) {
          Evt.result = {
            buttons: [],
            cards: Evt.directresult.slice(0),
            links: Evt.directresult.slice(0),
            targets: [],
            confirm: 'ok',
            bool: true
          };
          Evt.cards = Evt.directresult.slice(0);
          Evt.goto(2);
          return;
        }
        if (!Evt.dialog) Evt.dialog = ui.create.dialog('hidden');
        else if (!Evt.isMine) {
          Evt.dialog.style.display = 'none';
        }
        if (Evt.prompt == undefined) {
          var str = '获得' + get.translation(target);
          var range = get.select(Evt.selectButton);
          if (range[0] == range[1]) str += get.cnNumber(range[0]);
          else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
          else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
          str += '张';
          if (Evt.position == 'h' || Evt.position == undefined) str += '手';
          if (Evt.position == 'e') str += '装备';
          str += '牌';
          Evt.prompt = str;
        }
        if (Evt.prompt) {
          Evt.dialog.add(Evt.prompt);
        }
        if (Evt.prompt2) {
          Evt.dialog.addText(Evt.prompt2);
        }
        var directh = (!lib.config.unauto_choose && !Evt.complexSelect);
        directh = game.showPlayerCard(Evt, target, directh, 'canBeGained');
        if (Evt.dialog.buttons.length == 0) {
          Evt.dialog.close();
          Evt.finish();
          return;
        }
        var cs = target.getCards(Evt.position);
        var select = get.select(Evt.selectButton);
        if (Evt.forced && select[0] >= cs.length) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons,
            links: cs
          }
        }
        else if (Evt.forced && directh && !Evt.isOnline() && select[0] == select[1]) {
          Evt.result = {
            bool: true,
            buttons: Evt.dialog.buttons.randomGets(select[0]),
            links: []
          }
          for (var i = 0; i < Evt.result.buttons.length; i++) {
            Evt.result.links[i] = Evt.result.buttons[i].link;
          }
        }
        else {
          if (Evt.isMine()) {
            Evt.dialog.open();
            game.check();
            game.pause();
          }
          else if (Evt.isOnline()) {
            Evt.send();
          }
          else {
            Evt.result = 'ai';
          }
        }
      }, () => {
        if (Evt.result == 'ai') {
          game.check();
          if (ai.basic.chooseButton(Evt.ai) || forced) ui.click.ok();
          else ui.click.cancel();
        }
        Evt.dialog.close();
      }, () => {
        Evt.resume();
        if (game.online || !Evt.result.bool) {
          Evt.finish();
        }
      }, () => {
        if (Evt.logSkill && Evt.result.bool && !game.online) {
          if (typeof Evt.logSkill == 'string') {
            player.logSkill(Evt.logSkill);
          }
          else if (Array.isArray(Evt.logSkill)) {
            player.logSkill.apply(player, Evt.logSkill);
          }
        }
        var cards = [];
        for (var i = 0; i < Evt.result.links.length; i++) {
          cards.push(Evt.result.links[i]);
        }
        Evt.result.cards = Evt.result.links.slice(0);
        Evt.cards = cards;
        Evt.trigger("rewriteGainResult");
      }, () => {
        if (Evt.boolline) {
          player.line(target, 'green');
        }
        if (!Evt.chooseonly) {
          if (Evt.delay !== false) {
            var next = player.gain(Evt.cards, target, Evt.visibleMove ? 'give' : 'giveAuto', 'bySelf');
            Evt.done = next;
          }
          else {
            var next = player.gain(Evt.cards, target, 'bySelf');
            Evt.done = next;
            target[Evt.visibleMove ? '$give' : '$giveAuto'](cards, player);
            if (Evt.visibleMove) next.visible = true;
          }
        }
        else target[Evt.visibleMove ? '$give' : '$giveAuto'](cards, player);
      }],
      /**
       * 展示角色手牌
       * @name content.showHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      showHandcards: [() => {
        if (player.countCards('h') == 0) {
          Evt.finish();
          return;
        }
        var cards = player.getCards('h');
        var str = get.translation(player.name) + '的手牌';
        if (typeof Evt.prompt == 'string') {
          str = Evt.prompt;
        }
        Evt.dialog = ui.create.dialog(str, cards);
        Evt.dialogid = lib.status.videoId++;
        Evt.dialog.videoId = Evt.dialogid;
        game.broadcast(function (str, cards, id) {
          ui.create.dialog(str, cards).videoId = id;
        }, str, cards, Evt.dialogid);
        game.log(player, '展示了', cards);
        game.addVideo('showCards', player, [str, get.cardsInfo(cards)]);
        game.delayx(2);
      }, () => {
        game.broadcast('closeDialog', Evt.dialogid);
        Evt.dialog.close();
      }],
      /**
       * 展示角色的牌
       * @name content.showHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      showCards: [() => {
        if (get.itemtype(cards) != 'cards') {
          Evt.finish();
          return;
        }
        if (!Evt.str) {
          Evt.str = get.translation(player.name) + '展示的牌';
        }
        Evt.dialog = ui.create.dialog(Evt.str, cards);
        Evt.dialogid = lib.status.videoId++;
        Evt.dialog.videoId = Evt.dialogid;

        if (Evt.hiddencards) {
          for (var i = 0; i < Evt.dialog.buttons.length; i++) {
            if (Evt.hiddencards.contains(Evt.dialog.buttons[i].link)) {
              Evt.dialog.buttons[i].className = 'button card';
              Evt.dialog.buttons[i].innerHTML = '';
            }
          }
        }
        game.broadcast(function (str, cards, cards2, id) {
          var dialog = ui.create.dialog(str, cards);
          dialog.forcebutton = true;
          dialog.videoId = id;
          if (cards2) {
            for (var i = 0; i < dialog.buttons.length; i++) {
              if (cards2.contains(dialog.buttons[i].link)) {
                dialog.buttons[i].className = 'button card';
                dialog.buttons[i].innerHTML = '';
              }
            }
          }
        }, Evt.str, cards, Evt.hiddencards, Evt.dialogid);
        if (Evt.hiddencards) {
          var cards2 = cards.slice(0);
          for (var i = 0; i < Evt.hiddencards.length; i++) {
            cards2.remove(Evt.hiddencards[i]);
          }
          game.log(player, '展示了', cards2);
        }
        else {
          game.log(player, '展示了', cards);
        }
        game.delayx(2);
        game.addVideo('showCards', player, [Evt.str, get.cardsInfo(cards)]);
      }, () => {
        game.broadcast('closeDialog', Evt.dialogid);
        Evt.dialog.close();
      }],
      /**
       * 查看牌
       * @name content.showHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      viewCards: [() => {
        if (player == game.me) {
          Evt.dialog = ui.create.dialog(Evt.str, Evt.cards);
          if (Evt.isMine()) {
            game.pause();
            ui.create.confirm('o');
            game.countChoose();
            Evt.choosing = true;
          }
          else {
            Evt.finish();
            Evt.result = 'viewed';
            setTimeout(function () {
              Evt.dialog.close();
            }, 2 * lib.config.duration);
            game.delayx(2);
          }
        }
        else if (Evt.isOnline()) {
          Evt.send();
        }
        else {
          Evt.finish();
        }
      }, () => {
        Evt.result = 'viewed';
        _status.imchoosing = false;
        Evt.choosing = false;
        if (Evt.dialog) Evt.dialog.close();
      }],
      /**
       * 移动牌位置
       * @name content.moveCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Object} Evt.result 返回选择结果给父事件
       */
      moveCard: [function () {
        if (!player.canMoveCard(null, Evt.nojudge, Evt.moveHandcard)) {
          Evt.finish();
          return;
        }
        var next = player.chooseTarget(2, function (card, player, target) {
          if (_status.event.sourceFilterTarget && typeof _status.event.sourceFilterTarget == 'function') {
            if (!_status.event.sourceFilterTarget(card, player, target)) return false;
          }
          if (ui.selected.targets.length) {
            var from = ui.selected.targets[0];
            if (_status.event.moveHandcard && from.countCards('h') > 0) return true;
            var js = from.getCards('j');
            for (var i = 0; i < js.length; i++) {
              if (_status.event.nojudge) break;
              if (target.canAddJudge(js[i])) return true;
            }
            if (target.isMin()) return false;
            var es = from.getCards('e');
            for (var i = 0; i < es.length; i++) {
              if (target.isEmpty(get.subtype(es[i]))) return true;
            }
            return false;
          }
          else {
            var range = 'ej';
            if (_status.event.nojudge) range = 'e';
            if (_status.event.moveHandcard) range = 'h' + range;
            return target.countCards(range) > 0;
          }
        });
        next.set('nojudge', Evt.nojudge || false);
        next.set('moveHandcard', Evt.moveHandcard || false);
        next.set('sourceFilterTarget', Evt.sourceFilterTarget || false);
        next.set('ai', Evt.ai || function (target) {
          var player = _status.event.player;
          var att = get.attitude(player, target);
          var sgnatt = get.sgn(att);
          if (ui.selected.targets.length == 0) {
            if (att > 0) {
              if (!_status.event.nojudge && target.countCards('j', function (card) {
                return game.hasPlayer(function (current) {
                  return current != target && current.canAddJudge(card) && get.attitude(player, current) < 0;
                })
              })) return 14;
              if (target.countCards('e', function (card) {
                return get.value(card, target) < 0 && game.hasPlayer(function (current) {
                  return current != target && get.attitude(player, current) < 0 && current.isEmpty(get.subtype(card)) && get.effect(target, card, player, player) < 0;
                });
              }) > 0) return 9;
            }
            else if (att < 0) {
              if (game.hasPlayer(function (current) {
                if (current != target && get.attitude(player, current) > 0) {
                  var es = target.getCards('e');
                  for (var i = 0; i < es.length; i++) {
                    if (get.value(es[i], target) > 0 && current.isEmpty(get.subtype(es[i])) && get.effect(current, es[i], player, player) > 0) return true;
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
            if (sgnatt != 0 && att2 != 0 && sgnatt != att2 &&
              get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
              get.sgn(get.effect(target, es[i], player, target)) == sgnatt &&
              target.isEmpty(get.subtype(es[i]))) {
              return Math.abs(att);
            }
          }
          if (i == es.length && (_status.event.nojudge || !ui.selected.targets[0].countCards('j', function (card) {
            return target.canAddJudge(card);
          }) || att2 <= 0)) {
            return 0;
          }
          return -att * att2;
        });
        next.set('multitarget', true);
        next.set('targetprompt', _status.event.targetprompt || ['被移走', '移动目标']);
        next.set('prompt', Evt.prompt || '移动场上的一张牌');
        if (Evt.prompt2) next.set('prompt2', Evt.prompt2);
        if (Evt.forced) next.set('forced', true);
      }, function () {
        Evt.result = result;
        if (result.bool) {
          player.line2(result.targets, 'green');
          Evt.targets = result.targets;
        }
        else {
          Evt.finish();
        }
      }, function () {
        game.delay();
      }, function () {
        if (targets.length == 2) {
          if (Evt.logSkill) {
            if (typeof Evt.logSkill == 'string') {
              player.logSkill(Evt.logSkill);
            }
            else if (Array.isArray(Evt.logSkill)) {
              player.logSkill.apply(player, Evt.logSkill);
            }
          }
          player.choosePlayerCard('hej', true, function (button) {
            var player = _status.event.player;
            var targets0 = _status.event.targets0;
            var targets1 = _status.event.targets1;
            if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
              if (get.position(button.link) == 'j') return 12;
              if (get.value(button.link, targets0) < 0 && get.effect(targets1, button.link, player, targets1) > 0) return 10;
              return 0;
            }
            else {
              if (get.position(button.link) == 'j') return -10;
              return get.value(button.link) * get.effect(targets1, button.link, player, targets1);
            }
          }, targets[0]).set('nojudge', Evt.nojudge || false).set('targets0', targets[0]).set('targets1', targets[1]).set('filterButton', function (button) {
            var targets1 = _status.event.targets1;
            if (get.position(button.link) == 'h') {
              if (!_status.event.moveHandcard) return false;
              return true;
            }
            if (get.position(button.link) == 'j') {
              if (_status.event.nojudge) return false;
              return targets1.canAddJudge(button.link);
            }
            else {
              return targets1.isEmpty(get.subtype(button.link));
            }
          }).set('moveHandcard', Evt.moveHandcard || false);
        }
        else {
          Evt.finish();
        }
      }, function () {
        if (result.bool && result.links.length) {
          var link = result.links[0];
          if (get.position(link) == 'e') {
            Evt.targets[1].equip(link);
          }
          else if (get.position(link) == 'h') {
            Evt.targets[0].give(link, Evt.targets[1], 'giveAuto');
          }
          else if (link.viewAs) {
            Evt.targets[1].addJudge({ name: link.viewAs }, [link]);
          }
          else {
            Evt.targets[1].addJudge(link);
          }
          if (get.position(link) != 'h') {
            Evt.targets[0].$give(link, Evt.targets[1], false);
            game.log(Evt.targets[0], '的', link, '被移动给了', Evt.targets[1]);
          }
          Evt.result.card = link;
          Evt.result.position = get.position(link);
          game.delay();
        }
      }],
      /**
       * 角色使用牌
       * @name content.useCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {?Object} Evt.result 返回选择使用结果(如果有)给父事件
       */
      useCard: [() => {
        if (!card) {
          console.log('err: no card', get.translation(Evt.player));
          Evt.finish();
          return;
        }
        if (!get.info(card, false).noForceDie) Evt.forceDie = true;
        if (cards.length) {
          var owner = (get.owner(cards[0]) || player);
          var next = owner.lose(cards, 'visible', ui.ordering).set('type', 'use');
          var directDiscard = [];
          for (var i = 0; i < cards.length; i++) {
            if (!next.cards.contains(cards[i])) {
              directDiscard.push(cards[i]);
            }
          }
          if (directDiscard.length) game.cardsGotoOrdering(directDiscard);
        }
        //player.using=cards;
        var cardaudio = true;
        if (Evt.skill) {
          if (lib.skill[Evt.skill].audio) {
            cardaudio = false;
          }
          if (lib.skill[Evt.skill].log != false) {
            player.logSkill(Evt.skill);
          }
          if (get.info(Evt.skill).popname) {
            player.tryCardAnimate(card, Evt.card.name, 'metal', true);
          }
        }
        else if (!Evt.nopopup) {
          if (lib.translate[Evt.card.name + '_pop']) {
            player.tryCardAnimate(card, lib.translate[Evt.card.name + '_pop'], 'metal');
          }
          else {
            player.tryCardAnimate(card, Evt.card.name, 'metal');
          }
        }
        if (Evt.audio === false) {
          cardaudio = false;
        }
        if (cardaudio) {
          game.broadcastAll(function (player, card) {
            if (lib.config.background_audio) {
              if (get.type(card) == 'equip' && !lib.config.equip_audio) return;
              var sex = player.sex == 'female' ? 'female' : 'male';
              var audioinfo = lib.card[card.name].audio;
              // if(audioinfo||true){
              if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder' || card.nature == 'ice' || card.nature == 'ocean')) {
                game.playAudio('card', sex, card.name + '_' + card.nature);
              }
              else {
                if (typeof audioinfo == 'string') {
                  if (audioinfo.indexOf('ext:') == 0) game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
                  else game.playAudio('card', sex, audioinfo);
                }
                else {
                  game.playAudio('card', sex, card.name);
                }
              }
              // }
              // else if(get.type(card)!='equip'){
              //     game.playAudio('card/default');
              // }
            }
          }, player, card);
        }
        if (Evt.animate != false && Evt.line != false) {
          if ((card.name == 'wuxie' || card.name == 'youdishenru') && Evt.getParent().source) {
            var lining = Evt.getParent().sourcex || Evt.getParent().source2 || Evt.getParent().source;
            if (lining == player && Evt.getParent().sourcex2) {
              lining = Evt.getParent().sourcex2;
            }
            if (Array.isArray(lining) && Evt.getTrigger().name == 'jiedao') {
              player.line(lining[0], 'green');
            }
            else {
              player.line(lining, 'green');
            }
          }
          else {
            var config = {};
            if (card.nature == 'fire' ||
              (card.classList && card.classList.contains('fire'))) {
              config.color = 'fire';
            }
            else if (card.nature == 'thunder' ||
              (card.classList && card.classList.contains('thunder'))) {
              config.color = 'thunder';
            }
            else if (card.nature == 'ocean' ||
              (card.classList && card.classList.contains('ocean'))) {
              config.color = 'ocean';
            }
            else if (card.nature == 'yami' ||
              (card.classList && card.classList.contains('yami'))) {
              config.color = 'yami';
            }
            if (Evt.addedTarget) {
              player.line2(targets.concat(Evt.addedTargets), config);
            }
            else if (get.info(card, false).multitarget && targets.length > 1 && !get.info(card, false).multiline) {
              player.line2(targets, config);
            }
            else {
              player.line(targets, config);
            }
          }
          if (Evt.throw !== false) player.$throw(cards);
          if (lib.config.sync_speed && cards[0] && cards[0].clone) {
            var waitingForTransition = get.time();
            Evt.waitingForTransition = waitingForTransition;
            cards[0].clone.listenTransition(function () {
              if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                game.resume();
              }
              delete Evt.waitingForTransition;
            });
          }
        }
        Evt.id = get.id();
        if (!Evt.excluded) Evt.excluded = [];
        if (!Evt.directHit) Evt.directHit = [];
        Evt.customArgs = { default: {} };
        if (typeof Evt.baseDamage != 'number') Evt.baseDamage = get.info(card, false).baseDamage || 1;
        if (typeof Evt.baseNumber != 'number') Evt.baseNumber = get.info(card, false).baseNumber || 1;
        if (Evt.oncard) {
          Evt.oncard(Evt.card, Evt.player);
        }
        player.actionHistory[player.actionHistory.length - 1].useCard.push(Evt);
        if (Evt.addCount !== false) {
          if (player.stat[player.stat.length - 1].card[card.name] == undefined) {
            player.stat[player.stat.length - 1].card[card.name] = 1;
          }
          else {
            player.stat[player.stat.length - 1].card[card.name]++;
          }
        }
        if (Evt.skill) {
          if (player.stat[player.stat.length - 1].skill[Evt.skill] == undefined) {
            player.stat[player.stat.length - 1].skill[Evt.skill] = 1;
          }
          else {
            player.stat[player.stat.length - 1].skill[Evt.skill]++;
          }
          var sourceSkill = get.info(Evt.skill).sourceSkill;
          if (sourceSkill) {
            if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
              player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
            }
            else {
              player.stat[player.stat.length - 1].skill[sourceSkill]++;
            }
          }
        }
        if (targets.length) {
          var str = (targets.length == 1 && targets[0] == player) ? '#b自己' : targets;
          if (cards.length && !card.isCard) {
            if (Evt.addedTarget) {
              game.log(player, '对', str, '使用了', card, '（', cards, '，指向', Evt.addedTargets, '）');
            }
            else {
              game.log(player, '对', str, '使用了', card, '（', cards, '）');
            }
          }
          else {
            if (Evt.addedTarget) {
              game.log(player, '对', str, '使用了', card, '（指向', Evt.addedTargets, '）');
            }
            else {
              game.log(player, '对', str, '使用了', card);
            }
          }
        }
        else {
          if (cards.length && !card.isCard) {
            if (Evt.addedTarget) {
              game.log(player, '使用了', card, '（', cards, '，指向', Evt.addedTargets, '）');
            }
            else {
              game.log(player, '使用了', card, '（', cards, '）');
            }
          }
          else {
            if (Evt.addedTarget) {
              game.log(player, '使用了', card, '（指向', Evt.addedTargets, '）');
            }
            else {
              game.log(player, '使用了', card);
            }
          }
        }
        if (card.name == 'wuxie') {
          game.logv(player, [card, cards], [Evt.getTrigger().card]);
        }
        else {
          game.logv(player, [card, cards], targets);
        }
        Evt.trigger('useCard1');
      }, () => {
        Evt.trigger('useCard2');
      }, () => {
        Evt.trigger('useCard');
        Evt._oncancel = function () {
          game.broadcastAll(function (id) {
            if (ui.tempnowuxie && ui.tempnowuxie._origin == id) {
              ui.tempnowuxie.close();
              delete ui.tempnowuxie;
            }
          }, Evt.id);
        };
      }, () => {
        Evt.sortTarget = function (animate, sort) {
          var info = get.info(card, false);
          if (num == 0 && targets.length > 1) {
            if (!info.multitarget) {
              if (!Evt.fixedSeat && !sort) {
                targets.sortBySeat(player);
              }
              if (animate) for (var i = 0; i < targets.length; i++) {
                targets[i].animate('target');
              }
            }
            else if (animate) {
              for (var i = 0; i < targets.length; i++) {
                targets[i].animate('target');
              }
            }
          }
        }
        Evt.sortTarget();
        Evt.getTriggerTarget = function (list1, list2) {
          var listx = list1.slice(0).sortBySeat();
          for (var i = 0; i < listx.length; i++) {
            if (list2.numOf(listx[i]) < listx.numOf(listx[i])) return listx[i];
          }
          return null;
        }
      }, () => {
        if (Evt.all_excluded) return;
        if (!Evt.triggeredTargets1) Evt.triggeredTargets1 = [];
        var target = Evt.getTriggerTarget(targets, Evt.triggeredTargets1);
        if (target) {
          Evt.triggeredTargets1.push(target);
          var next = game.createEvent('useCardToPlayer', false);
          if (Evt.triggeredTargets1.length == 1) next.isFirstTarget = true;
          next.setContent('emptyEvent');
          next.targets = targets;
          next.target = target;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.excluded = Evt.excluded;
          next.directHit = Evt.directHit;
          next.customArgs = Evt.customArgs;
          if (Evt.forceDie) next.forceDie = true;
          Evt.redo();
        }
      }, () => {
        if (Evt.all_excluded) return;
        if (!Evt.triggeredTargets2) Evt.triggeredTargets2 = [];
        var target = Evt.getTriggerTarget(targets, Evt.triggeredTargets2);
        if (target) {
          Evt.triggeredTargets2.push(target);
          var next = game.createEvent('useCardToTarget', false);
          if (Evt.triggeredTargets2.length == 1) next.isFirstTarget = true;
          next.setContent('emptyEvent');
          next.targets = targets;
          next.target = target;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.excluded = Evt.excluded;
          next.directHit = Evt.directHit;
          next.customArgs = Evt.customArgs;
          if (Evt.forceDie) next.forceDie = true;
          Evt.redo();
        }
      }, () => {
        if (Evt.all_excluded) return;
        if (!Evt.triggeredTargets3) Evt.triggeredTargets3 = [];
        var target = Evt.getTriggerTarget(targets, Evt.triggeredTargets3);
        if (target) {
          Evt.triggeredTargets3.push(target);
          var next = game.createEvent('useCardToPlayered', false);
          if (Evt.triggeredTargets3.length == 1) next.isFirstTarget = true;
          next.setContent('emptyEvent');
          next.targets = targets;
          next.target = target;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.excluded = Evt.excluded;
          next.directHit = Evt.directHit;
          next.customArgs = Evt.customArgs;
          if (Evt.forceDie) next.forceDie = true;
          Evt.redo();
        }
      }, () => {
        var info = get.info(card, false);
        if (!info.nodelay && Evt.animate != false) {
          if (Evt.delayx !== false) {
            if (Evt.waitingForTransition) {
              _status.waitingForTransition = Evt.waitingForTransition;
              game.pause();
            }
            else {
              game.delayx();
            }
          }
        }
      }, () => {
        if (Evt.all_excluded) return;
        if (!Evt.triggeredTargets4) Evt.triggeredTargets4 = [];
        var target = Evt.getTriggerTarget(targets, Evt.triggeredTargets4);
        if (target) {
          Evt.triggeredTargets4.push(target);
          var next = game.createEvent('useCardToTargeted', false);
          if (Evt.triggeredTargets4.length == 1) next.isFirstTarget = true;
          next.setContent('emptyEvent');
          next.targets = targets;
          next.target = target;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.excluded = Evt.excluded;
          next.directHit = Evt.directHit;
          next.customArgs = Evt.customArgs;
          if (Evt.forceDie) next.forceDie = true;
          if (targets.length == Evt.triggeredTargets4.length) {
            Evt.sortTarget();
          }
          Evt.redo();
        }
      }, () => {
        var info = get.info(card, false);
        if (info.contentBefore) {
          var next = game.createEvent(card.name + 'ContentBefore');
          next.setContent(info.contentBefore);
          next.targets = targets;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.type = 'precard';
          if (Evt.forceDie) next.forceDie = true;
        }
        else if (info.reverseOrder && get.is.versus() && targets.length > 1) {
          var next = game.createEvent(card.name + 'ContentBefore');
          next.setContent('reverseOrder');
          next.targets = targets;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.type = 'precard';
          if (Evt.forceDie) next.forceDie = true;
        }
      }, () => {
        if (Evt.all_excluded) return;
        var info = get.info(card, false);
        if (num == 0 && targets.length > 1) {
          Evt.sortTarget(true, true);
        }
        if (targets[num] && targets[num].isDead()) return;
        if (targets[num] && targets[num].isOut()) return;
        if (targets[num] && targets[num].removed) return;
        if (targets[num] && info.ignoreTarget && info.ignoreTarget(card, player, targets[num])) return;
        if (targets.length == 0 && !info.notarget) return;
        if (targets[num] && Evt.excluded.contains(targets[num])) {
          var next = game.createEvent('useCardToExcluded', false);
          next.setContent('emptyEvent');
          next.targets = targets;
          next.target = targets[num];
          next.num = num;
          next.card = card;
          next.cards = cards;
          next.player = player;
          return;
        };
        var next = game.createEvent(card.name);
        next.setContent(info.content);
        next.targets = targets;
        next.card = card;
        next.cards = cards;
        next.player = player;
        next.num = num;
        next.type = 'card';
        next.skill = Evt.skill;
        next.multitarget = info.multitarget;
        next.preResult = Evt.preResult;
        next.baseDamage = Evt.baseDamage;
        next.baseNumber = Evt.baseNumber;
        if (Evt.forceDie) next.forceDie = true;
        if (Evt.addedTargets) {
          next.addedTargets = Evt.addedTargets;
          next.addedTarget = Evt.addedTarget;
          next._targets = Evt._targets;
        }
        if (info.targetDelay === false) {
          Evt.targetDelay = false;
        }
        next.target = targets[num];
        for (var i in Evt.customArgs.default) next[i] = Evt.customArgs.default[i];
        if (next.target && Evt.customArgs[next.target.playerid]) {
          var customArgs = Evt.customArgs[next.target.playerid];
          for (var i in customArgs) next[i] = customArgs[i];
        }
        if (next.target && Evt.directHit.contains(next.target)) next.directHit = true;
        if (next.target && !info.multitarget) {
          if (num == 0 && targets.length > 1) {
            // var ttt=next.target;
            // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
          }
          else {
            next.target.animate('target');
          }
        }
        if (!info.nodelay && num > 0) {
          if (Evt.targetDelay !== false) {
            game.delayx(0.5);
          }
        }
      }, () => {
        if (Evt.all_excluded) return;
        if (!get.info(Evt.card, false).multitarget && num < targets.length - 1 && !Evt.cancelled) {
          Evt.num++;
          Evt.goto(10)
        }
      }, () => {
        if (get.info(card, false).contentAfter) {
          var next = game.createEvent(card.name + 'ContentAfter');
          next.setContent(get.info(card, false).contentAfter);
          next.targets = targets;
          next.card = card;
          next.cards = cards;
          next.player = player;
          next.preResult = Evt.preResult;
          next.type = 'postcard';
          if (Evt.forceDie) next.forceDie = true;
        }
      }, () => {
        if (Evt.postAi) {
          Evt.player.logAi(Evt.targets, Evt.card);
        }
        if (Evt._result) {
          Evt.result = Evt._result;
        }
        //delete player.using;
        if (document.getElementsByClassName('thrown').length) {
          if (Evt.delayx !== false) game.delayx();
        }
        else {
          Evt.finish();
        }
      }, () => {
        Evt._oncancel();
      }],
      /**
       * 角色使用技能
       * @name content.useSkill
       * @type {GameCores.Bases.StateMachine}
       */
      useSkill: [() => {
        var info = get.info(Evt.skill);
        if (!info.noForceDie) Evt.forceDie = true;
        Evt._skill = Evt.skill;
        game.trySkillAudio(Evt.skill, player);
        var checkShow = player.checkShow(Evt.skill);
        if (info.discard != false && info.lose != false && !info.viewAs) {
          player.discard(cards).delay = false;
          if (lib.config.low_performance) {
            Evt.discardTransition = true;
          }
        }
        else {
          if (info.lose != false) {
            if (info.losetrigger == false) {
              var losecard = player.lose(cards, ui.special)._triggered = null;
            }
            else {
              var losecard = player.lose(cards, ui.special);
              if (info.visible) losecard.visible = true;
              if (info.loseTo) losecard.position = ui[info.loseTo];
              if (info.insert) losecard.insert_card = true;
              if (losecard.position == ui.special && info.toStorage) losecard.toStorage = true;
            }
          }
          if (!info.prepare && info.viewAs) {
            player.$throw(cards);
            if (losecard) losecard.visible = true;
            if (lib.config.sync_speed && cards[0] && cards[0].clone) {
              var waitingForTransition = get.time();
              Evt.waitingForTransition = waitingForTransition;
              cards[0].clone.listenTransition(function () {
                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                  game.resume();
                }
                delete Evt.waitingForTransition;
              });
            }
          }
        }
        if (info.line != false && targets.length) {
          var config = {};
          if (get.is.object(info.line)) config = info.line;
          else if (info.line == 'fire') {
            config.color = 'fire';
          }
          else if (info.line == 'thunder') {
            config.color = 'thunder';
          }
          else if (info.line == 'ocean') {
            config.color = 'ocean';
          }
          else if (info.line === undefined || info.line == 'green') {
            config.color = 'green';
          }
          if (info.multitarget && !info.multiline && targets.length > 1) {
            player.line2(targets, config);
          }
          else {
            player.line(targets, config);
          }
        }
        var str = '';
        if (targets && targets.length && info.log != 'notarget') {
          str += '对<span class="bluetext">' + (targets[0] == player ? '自己' : get.translation(targets[0]));
          for (var i = 1; i < targets.length; i++) {
            str += '、' + (targets[i] == player ? '自己' : get.translation(targets[i]));
          }
          str += '</span>'
        }
        str += '发动了';
        if (!info.direct) {
          game.log(player, str, '#p『' + get.skillTranslation(skill, player) + '』');
          if (info.logv !== false) game.logv(player, skill, targets);
          player.trySkillAnimate(skill, skill, checkShow);
        }
        if (Evt.addCount != false) {
          if (player.stat[player.stat.length - 1].skill[skill] == undefined) {
            player.stat[player.stat.length - 1].skill[skill] = 1;
          }
          else {
            player.stat[player.stat.length - 1].skill[skill]++;
          }
          var sourceSkill = get.info(skill).sourceSkill;
          if (sourceSkill) {
            if (player.stat[player.stat.length - 1].skill[sourceSkill] == undefined) {
              player.stat[player.stat.length - 1].skill[sourceSkill] = 1;
            }
            else {
              player.stat[player.stat.length - 1].skill[sourceSkill]++;
            }
          }
        }
        if (player.stat[player.stat.length - 1].allSkills == undefined) {
          player.stat[player.stat.length - 1].allSkills = 1;
        }
        else {
          player.stat[player.stat.length - 1].allSkills++;
        }
        if (info.prepare) {
          switch (info.prepare) {
            case 'give': if (losecard) losecard.visible = true; player.$give(cards, targets[0]); break;
            case 'give2': player.$give(cards.length, targets[0]); break;
            case 'throw': if (losecard) losecard.visible = true; player.$throw(cards); break;
            case 'throw2': player.$throw(cards.length); break;
            default: info.prepare(cards, player, targets);
          }
        }
        if (info.round) {
          var roundname = skill + '_roundcount';
          player.storage[roundname] = info.round;
          if (!player.hasSkill(roundname)) player.addSkill(roundname)
          // player.storage[roundname] = game.roundNumber;
          player.syncStorage(roundname);
          player.markSkill(roundname);
        }
      }, () => {
        var info = get.info(Evt.skill);
        if (info && info.contentBefore) {
          var next = game.createEvent(Evt.skill + 'ContentBefore');
          next.setContent(info.contentBefore);
          next.targets = targets;
          next.cards = cards;
          next.player = player;
          if (Evt.forceDie) next.forceDie = true;
        }
      }, () => {
        if (!Evt.skill) {
          console.log('error: no skill', get.translation(Evt.player), Evt.player.getSkills());
          if (Evt._skill) {
            Evt.skill = Evt._skill;
            console.log(Evt._skill);
          }
          else {
            Evt.finish();
            return;
          }
        }
        var info = get.info(Evt.skill);
        if (targets[num] && targets[num].isDead() ||
          targets[num] && targets[num].isOut() ||
          targets[num] && targets[num].removed) {
          if (!info.multitarget && num < targets.length - 1) {
            Evt.num++;
            Evt.redo();
          }
          return;
        }
        var next = game.createEvent(Evt.skill);
        next.setContent(info.content);
        next.targets = targets;
        next.cards = cards;
        next.player = player;
        next.num = num;
        next.multitarget = info.multitarget;
        if (num == 0 && next.targets.length > 1) {
          if (!info.multitarget) {
            lib.tempSortSeat = player;
            targets.sort(lib.sort.seat);
            delete lib.tempSortSeat;
          }
          for (var i = 0; i < targets.length; i++) {
            targets[i].animate('target');
          }
        }
        next.target = targets[num];
        if (Evt.forceDie) next.forceDie = true;
        if (next.target && !info.multitarget) {
          if (num == 0 && targets.length > 1) {
            // var ttt=next.target;
            // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
          }
          else {
            next.target.animate('target');
          }
        }
        if (num == 0) {
          if (typeof info.delay == 'number') game.delay(info.delay);
          else if (info.delay !== false && info.delay !== 0) {
            if (Evt.waitingForTransition) {
              _status.waitingForTransition = Evt.waitingForTransition;
              game.pause();
            }
            else {
              game.delayx()
            }
          }
        }
        else game.delayx(0.5);
        if (!info.multitarget && num < targets.length - 1) {
          Evt.num++;
          Evt.redo();
        }
      }, () => {
        var info = get.info(Evt.skill);
        if (info && info.contentAfter) {
          var next = game.createEvent(Evt.skill + 'ContentAfter');
          next.setContent(info.contentAfter);
          next.targets = targets;
          next.cards = cards;
          next.player = player;
          if (Evt.forceDie) next.forceDie = true;
        }
      }, () => {
        if (player.getStat().allSkills > 200) {
          player._noSkill = true;
        }
        if (document.getElementsByClassName('thrown').length) {
          if (Evt.skill && get.info(Evt.skill).delay !== false && get.info(Evt.skill).delay !== 0) game.delayx();
        }
        else {
          Evt.finish();
        }
      }, () => {
        ui.clear();
      }],
      /**
       * 从(牌库|牌堆顶|牌堆底)摸牌
       * @name content.useCard
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 当前事件
       * @property {!Array<GameCores.GameObjects.Card>} Evt.result 返回摸到的牌数组
       */
      draw: function () {
        // if(lib.config.background_audio){
        //     game.playAudio('effect','draw');
        // }
        // game.broadcast(function(){
        //     if(lib.config.background_audio){
        //         game.playAudio('effect','draw');
        //     }
        // });
        if (typeof Evt.minnum == 'number' && num < Evt.minnum) {
          num = Evt.minnum;
        }
        if (Evt.drawDeck) {
          if (Evt.drawDeck > num) {
            Evt.drawDeck = num;
          }
          num -= Evt.drawDeck;
        }
        if (Evt.log != false) {
          if (num > 0) {
            if (Evt.bottom) game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌');
            else game.log(player, '摸了' + get.cnNumber(num) + '张牌');
          }
          if (Evt.drawDeck) {
            game.log(player, '从牌库中获得了' + get.cnNumber(Evt.drawDeck) + '张牌');
          }
        }
        var cards;
        if (num > 0) {
          if (Evt.bottom) cards = get.bottomCards(num);
          else if (player.getTopCards) cards = player.getTopCards(num);
          else cards = get.cards(num);
        }
        else {
          cards = [];
        }
        if (Evt.drawDeck) {
          cards = cards.concat(player.getDeckCards(Evt.drawDeck));
        }
        if (Evt.animate != false) {
          if (Evt.visible) {
            var next = player.gain(cards, 'gain2');
            if (Evt.bottom) game.log(player, '从牌堆底摸了' + get.cnNumber(num) + '张牌（', cards, '）');
            else game.log(player, '摸了' + get.cnNumber(num) + '张牌（', cards, '）');
          }
          else {
            var next = player.gain(cards, 'draw');
          }
        }
        else {
          var next = player.gain(cards);
          if (Evt.$draw) {
            player.$draw(cards.length);
          }
        }
        if (Evt.gaintag) next.gaintag.addArray(Evt.gaintag);
        Evt.result = cards;
      },
      /**
       * 从(手牌区|装备区|武将牌上|判定区)弃置牌
       * @name content.discard
       * @type {GameCores.Bases.StateMachine}
       */
      discard: [() => {
        game.log(player, '弃置了', cards);
        event.done = player.lose(cards, event.position, 'visible');
        event.done.type = 'discard';
      }, () => {
        Evt.trigger('discard');
      }],
      /**
       * 将牌置入弃牌堆
       * @name content.loseToDiscardpile
       * @type {GameCores.Bases.StateMachine}
       */
      loseToDiscardpile: function () {
        "step 0"
        game.log(player, '将', cards, '置入了弃牌堆');
        event.done = player.lose(cards, event.position, 'visible');
        event.done.type = 'loseToDiscardpile';
        "step 1"
        event.trigger('loseToDiscardpile');
      },
      /**
       * 角色打出牌
       * @name content.respond
       * @type {GameCores.Bases.StateMachine}
       */
      respond: [function () {
        var cardaudio = true;
        if (Evt.skill) {
          if (lib.skill[Evt.skill].audio) {
            cardaudio = false;
          }
          player.logSkill(Evt.skill);
          player.checkShow(Evt.skill, true);
          if (lib.skill[Evt.skill].onrespond && !game.online) {
            lib.skill[Evt.skill].onrespond(Evt, player);
          }
        }
        else if (!Evt.nopopup) player.tryCardAnimate(card, card.name, 'wood');
        if (cardaudio && Evt.getParent(3).name == 'useCard') {
          game.broadcastAll(function (player, card) {
            if (lib.config.background_audio) {
              var sex = player.sex == 'female' ? 'female' : 'male';
              var audioinfo = lib.card[card.name].audio;
              // if(audioinfo||true){
              if (typeof audioinfo == 'string' && audioinfo.indexOf('ext:') == 0) {
                game.playAudio('..', 'extension', audioinfo.slice(4), card.name + '_' + sex);
              }
              else {
                game.playAudio('card', sex, card.name);
              }
              // }
              // else{
              //     game.playAudio('card/default');
              // }
            }
          }, player, card);
        }
        if (cards.length && (cards.length > 1 || cards[0].name != card.name)) {
          game.log(player, '打出了', card, '（', cards, '）');
        }
        else {
          game.log(player, '打出了', card);
        }
        player.actionHistory[player.actionHistory.length - 1].respond.push(Evt);
        if (cards.length) {
          var owner = (get.owner(cards[0]) || player);
          var next = owner.lose(cards, 'visible', ui.ordering).set('type', 'use');
          var directDiscard = [];
          for (var i = 0; i < cards.length; i++) {
            if (!next.cards.contains(cards[i])) {
              directDiscard.push(cards[i]);
            }
          }
          if (directDiscard.length) game.cardsGotoOrdering(directDiscard);
        }
        if (Evt.animate != false && Evt.throw !== false) {
          for (var i = 0; i < cards.length; i++) {
            player.$throw(cards[i]);
            if (Evt.highlight) {
              cards[i].clone.classList.add('thrownhighlight');
              game.addVideo('highlightnode', player, get.cardInfo(cards[i]));
            }
          }
          if (Evt.highlight) {
            game.broadcast(function (cards) {
              for (var i = 0; i < cards.length; i++) {
                if (cards[i].clone) {
                  cards[i].clone.classList.add('thrownhighlight');
                }
              }
            }, cards);
          }
        }
        Evt.trigger('respond');
      }, function () {
        game.delayx(0.5);
      }],
      /**
       * 角色和目标交换(手)牌
       * @name content.swapHandcards
       * @type {GameCores.Bases.StateMachine}
       */
      swapHandcards: [function () {
        Evt.cards1 = Evt.cards1 || player.getCards('h');
        Evt.cards2 = Evt.cards2 || target.getCards('h');
        game.loseAsync({
          player: player,
          target: target,
          cards1: Evt.cards1,
          cards2: Evt.cards2,
        }).setContent('swapHandcardsx');
      }, function () {
        player.gain(Evt.cards2);
        target.gain(Evt.cards1);
      }],
      swapHandcardsx: [function () {
        player.$giveAuto(Evt.cards1, target);
        target.$giveAuto(Evt.cards2, player);
      }, function () {
        Evt.cards = Evt.cards1;
        var next = player.lose(Evt.cards, ui.ordering).getlx = false;
        next.relatedEvent = Evt.getParent();
        if (player == game.me) {
          Evt.delayed = true;
        }
        else {
          next.delay = false;
        }
      }, function () {
        Evt.cards = Evt.cards2;
        var next = target.lose(Evt.cards, ui.ordering).getlx = false;
        next.relatedEvent = Evt.getParent();
        if (target == game.me) {
          Evt.delayed = true;
        }
        else {
          next.delay = false;
        }
      }, function () {
        if (!Evt.delayed) game.delay();
      }],
      /**
       * 角色从每个目标获得一张牌
       * @name content.gainMultiple
       * @type {GameCores.Bases.StateMachine}
       */
      gainMultiple: [function () {
        Evt.delayed = false;
        Evt.num = 0;
        Evt.cards = [];
      }, function () {
        player.gainPlayerCard(targets[num], Evt.position, true).set('boolline', false).set('delay', num == targets.length - 1);
      }, function () {
        if (result.bool) {
          Evt.cards.addArray(result.cards);
          if (num == targets.length - 1) Evt.delayed = true;
        }
        Evt.num++;
        if (Evt.num < targets.length) {
          Evt.goto(1);
        }
      }, function () {
        if (!Evt.delayed) game.delay();
      }],
      /**
       * 角色获得牌
       * @name content.lose
       * @type {GameCores.Bases.StateMachine}
       */
      gain: [() => {
        if (cards) {
          var map = {};
          for (var i of cards) {
            var owner = get.owner(i, 'judge');
            if (owner && (owner != player || get.position(i) != 'h')) {
              var id = owner.playerid;
              if (!map[id]) map[id] = [];
              map[id].push(i);
            }
          }
          for (var i in map) {
            var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
            var next = owner.lose(map[i], ui.special).set('type', 'gain').set('forceDie', true).set('getlx', false);
            if (Evt.animate == 'give' || Evt.visible == true) next.visible = true;
            Evt.relatedLose = next;
          }
        }
        else {
          Evt.finish();
        }
      }, () => {
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].destroyed) {
            if (player.hasSkill(cards[i].destroyed)) {
              delete cards[i].destroyed;
            }
            else {
              cards.splice(i--, 1);
            }
          }
        }
        if (cards.length == 0) {
          Evt.finish();
          return;
        }
        player.getHistory('gain').push(Evt);
        //if(Evt.source&&Evt.delay!==false) game.delayx();}, () => {
        if (player.getStat().gain == undefined) {
          player.getStat().gain = cards.length;
        }
        else {
          player.getStat().gain += cards.length;
        }
      }, () => {
        var sort;
        var frag1 = document.createDocumentFragment();
        var frag2 = document.createDocumentFragment();
        var hs = player.getCards('hs');
        for (var i = 0; i < cards.length; i++) {
          if (hs.contains(cards[i])) {
            cards.splice(i--, 1);
          }
        }
        for (var num = 0; num < cards.length; num++) {
          sort = lib.config.sort_card(cards[num]);
          if (lib.config.reverse_sort) sort = -sort;
          cards[num].fix();
          cards[num].style.transform = '';
          cards[num].addGaintag(Evt.gaintag);
          if (_status.discarded) {
            _status.discarded.remove(cards[num]);
          }
          // cards[num].vanishtag.length=0;
          for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
            if (cards[num].vanishtag[num2][0] != '_') {
              cards[num].vanishtag.splice(num2--, 1);
            }
          }
          if (player == game.me) {
            cards[num].classList.add('drawinghidden');
          }
          if (get.is.singleHandcard() || sort > 1) frag1.appendChild(cards[num]);
          else frag2.appendChild(cards[num]);
        }
        var addv = function () {
          if (player == game.me) {
            game.addVideo('gain12', player, [get.cardsInfo(frag1.childNodes), get.cardsInfo(frag2.childNodes), Evt.gaintag]);
          }
        };
        var broadcast = function () {
          game.broadcast(function (player, cards, num, gaintag) {
            player.directgain(cards, null, gaintag);
            _status.cardPileNum = num;
          }, player, cards, ui.cardPile.childNodes.length, Evt.gaintag);
        };
        if (Evt.animate == 'draw') {
          player.$draw(cards.length);
          game.pause();
          setTimeout(function () {
            addv();
            player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
            player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
            player.update();
            if (player == game.me) ui.updatehl();
            broadcast();
            game.resume();
          }, get.delayx(500, 500));
        }
        else if (Evt.animate == 'gain') {
          player.$gain(cards);
          game.pause();
          setTimeout(function () {
            addv();
            player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
            player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
            player.update();
            if (player == game.me) ui.updatehl();
            broadcast();
            game.resume();
          }, get.delayx(700, 700));
        }
        else if (Evt.animate == 'gain2' || Evt.animate == 'draw2') {
          var gain2t = 300;
          if (player.$gain2(cards) && player == game.me) {
            gain2t = 500;
          }
          game.pause();
          setTimeout(function () {
            addv();
            player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
            player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
            player.update();
            if (player == game.me) ui.updatehl();
            broadcast();
            game.resume();
          }, get.delayx(gain2t, gain2t));
        }
        else if (Evt.source && (Evt.animate == 'give' || Evt.animate == 'giveAuto')) {
          if (Evt.animate == 'give') Evt.source['$' + Evt.animate](cards, player);
          else {
            var givemap = { hs: [], ots: [] };
            for (var i = 0; i < cards.length; i++) {
              givemap[Evt.relatedLose && Evt.relatedLose.hs && Evt.relatedLose.hs.contains(cards[i]) ? 'hs' : 'ots'].push(cards[i]);
            }
            if (givemap.hs.length) Evt.source.$giveAuto(givemap.hs, player);
            if (givemap.ots.length) Evt.source.$give(givemap.ots, player);
          }
          game.pause();
          setTimeout(function () {
            addv();
            player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
            player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
            player.update();
            if (player == game.me) ui.updatehl();
            broadcast();
            game.resume();
          }, get.delayx(500, 500));
        }
        else {
          addv();
          player.node.handcards1.insertBefore(frag1, player.node.handcards1.firstChild);
          player.node.handcards2.insertBefore(frag2, player.node.handcards2.firstChild);
          player.update();
          if (player == game.me) ui.updatehl();
          broadcast();
          Evt.finish();
        }
        if (Evt.log) {
          game.log(player, '获得了', cards);
        }
      }, () => {
        game.delayx();
      }],
      /**
       * 角色将牌加入额外区
       * @name content.addToExpansion
       * @type {GameCores.Bases.StateMachine}
       */
      addToExpansion: function () {
        "step 0"
        if (event.animate == 'give') event.visible = true;
        if (cards) {
          var map = {};
          for (var i of cards) {
            var owner = get.owner(i, 'judge');
            if (owner && get.position(i) != 'x') {
              var id = owner.playerid;
              if (!map[id]) map[id] = [];
              map[id].push(i);
            }
          }
          for (var i in map) {
            var owner = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
            var next = owner.lose(map[i], ui.special).set('type', 'loseToExpansion').set('forceDie', true).set('getlx', false);
            if (event.visible == true) next.visible = true;
            event.relatedLose = next;
          }
        }
        else {
          event.finish();
        }
        "step 1"
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].destroyed) {
            if (player.hasSkill(cards[i].destroyed)) {
              delete cards[i].destroyed;
            }
            else {
              cards.splice(i--, 1);
            }
          }
        }
        if (cards.length == 0) {
          event.finish();
          return;
        }
        "step 2"
        var hs = player.getCards('x');
        for (var i = 0; i < cards.length; i++) {
          if (hs.contains(cards[i])) {
            cards.splice(i--, 1);
          }
        }
        for (var num = 0; num < cards.length; num++) {
          if (_status.discarded) {
            _status.discarded.remove(cards[num]);
          }
          for (var num2 = 0; num2 < cards[num].vanishtag.length; num2++) {
            if (cards[num].vanishtag[num2][0] != '_') {
              cards[num].vanishtag.splice(num2--, 1);
            }
          }
        }
        if (event.animate == 'draw') {
          player.$draw(cards.length);
          game.log(player, '将', get.cnNumber(cards.length), '张牌置于了武将牌上');
          game.pause();
          setTimeout(function () {
            player.$addToExpansion(cards, null, event.gaintag);
            for (var i of event.gaintag) player.markSkill(i);
            game.resume();
          }, get.delayx(500, 500));
        }
        else if (event.animate == 'gain') {
          player.$gain(cards, false);
          game.pause();
          setTimeout(function () {
            player.$addToExpansion(cards, null, event.gaintag);
            for (var i of event.gaintag) player.markSkill(i);
            game.resume();
          }, get.delayx(700, 700));
        }
        else if (event.animate == 'gain2' || event.animate == 'draw2') {
          var gain2t = 300;
          if (player.$gain2(cards) && player == game.me) {
            gain2t = 500;
          }
          game.pause();
          setTimeout(function () {
            player.$addToExpansion(cards, null, event.gaintag);
            for (var i of event.gaintag) player.markSkill(i);
            game.resume();
          }, get.delayx(gain2t, gain2t));
        }
        else if (event.source && (event.animate == 'give' || event.animate == 'giveAuto')) {
          if (event.animate == 'give') event.source['$' + event.animate](cards, player, false);
          else {
            var givemap = { hs: [], ots: [] };
            for (var i = 0; i < cards.length; i++) {
              givemap[event.relatedLose && event.relatedLose.hs && event.relatedLose.hs.contains(cards[i]) ? 'hs' : 'ots'].push(cards[i]);
            }
            if (givemap.hs.length) {
              event.source.$giveAuto(givemap.hs, player, false);
              game.log(player, '将', get.cnNumber(givemap.hs.length), '张牌置于了武将牌上');
            }
            if (givemap.ots.length) {
              event.source.$give(givemap.ots, player, false);
              game.log(player, '将', givemap.ots, '置于了武将牌上');
            }
          }
          game.pause();
          setTimeout(function () {
            player.$addToExpansion(cards, null, event.gaintag);
            for (var i of event.gaintag) player.markSkill(i);
            game.resume();
          }, get.delayx(500, 500));
        }
        else {
          player.$addToExpansion(cards, null, event.gaintag);
          for (var i of event.gaintag) player.markSkill(i);
          event.finish();
        }
        if (event.log) {
          game.log(player, '将', cards, '置于了武将牌上');
        }
        "step 4"
        game.delayx();
      },
      /**
       * 失去牌至(弃牌堆|牌堆)，或将牌移动至武将牌上(special arena)
       * @name content.lose
       * @type {GameCores.Bases.StateMachine}
       */
      lose: [() => {
        var evt = Evt.getParent();
        if ((evt.name != 'discard' && Evt.type != 'discard') && (evt.name != 'loseToDiscardpile' && Evt.type != 'loseToDiscardpile')) {
          Evt.delay = false;
          return;
        }
        if (evt.delay === false) Evt.delay = false;
        if (evt.animate != false) {
          evt.discardid = lib.status.videoId++;
          game.broadcastAll(function (player, cards, id) {
            player.$throw(cards, null, 'nobroadcast');
            var cardnodes = [];
            cardnodes._discardtime = get.time();
            for (var i = 0; i < cards.length; i++) {
              if (cards[i].clone) {
                cardnodes.push(cards[i].clone);
              }
            }
            ui.todiscard[id] = cardnodes;
          }, player, cards, evt.discardid);
          if (lib.config.sync_speed && cards[0] && cards[0].clone) {
            if (evt.delay != false) {
              var waitingForTransition = get.time();
              evt.waitingForTransition = waitingForTransition;
              cards[0].clone.listenTransition(function () {
                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                  game.resume();
                }
                delete evt.waitingForTransition;
              });
            }
            else if (evt.getParent().discardTransition) {
              delete evt.getParent().discardTransition;
              var waitingForTransition = get.time();
              evt.getParent().waitingForTransition = waitingForTransition;
              cards[0].clone.listenTransition(function () {
                if (_status.waitingForTransition == waitingForTransition && _status.paused) {
                  game.resume();
                }
                delete evt.getParent().waitingForTransition;
              });
            }
          }
        }
      }, () => {
        Evt.gaintag_map = {};
        var hs = [], es = [], js = [], ss = [], xs = [];
        var unmarks = [];
        if (Evt.insert_card && Evt.position == ui.cardPile) Evt.cards.reverse();
        var hej = player.getCards('hejsx');
        Evt.stockcards = cards.slice(0);
        for (var i = 0; i < cards.length; i++) {
          if (!hej.contains(cards[i])) {
            cards.splice(i--, 1);
            continue;
          }
          else if (cards[i].parentNode) {
            if (cards[i].parentNode.classList.contains('equips')) {
              cards[i].original = 'e';
              es.push(cards[i]);
            }
            else if (cards[i].parentNode.classList.contains('judges')) {
              cards[i].original = 'j';
              js.push(cards[i]);
            }
            else if (cards[i].parentNode.classList.contains('expansions')) {
              cards[i].original = 'x';
              xs.push(cards[i]);
              if (cards[i].gaintag && cards[i].gaintag.length) unmarks.addArray(cards[i].gaintag);
            }
            else if (cards[i].parentNode.classList.contains('handcards')) {
              if (cards[i].classList.contains('glows')) {
                cards[i].original = 's';
                ss.push(cards[i]);
              }
              else {
                cards[i].original = 'h';
                hs.push(cards[i]);
              }
            }
            else {
              cards[i].original = null;
            }
          }
          if (cards[i].gaintag && cards[i].gaintag.length) {
            Evt.gaintag_map[cards[i].cardid] = cards[i].gaintag.slice(0);
            cards[i].removeGaintag(true);
          }

          cards[i].style.transform += ' scale(0.2)';
          cards[i].classList.remove('glow');
          cards[i].classList.remove('glows');
          cards[i].recheck();

          var info = lib.card[cards[i].name];
          if (info.destroy || cards[i]._destroy) {
            cards[i].delete();
            cards[i].destroyed = info.destroy || cards[i]._destroy;
          }
          else if (Evt.position) {
            if (_status.discarded) {
              if (Evt.position == ui.discardPile) {
                _status.discarded.add(cards[i]);
              }
              else {
                _status.discarded.remove(cards[i]);
              }
            }
            if (Evt.insert_index) {
              Evt.position.insertBefore(cards[i], Evt.insert_index(Evt, cards[i]));
              cards[i].fix();
            }
            else if (Evt.insert_card) {
              Evt.position.insertBefore(cards[i], Evt.position.firstChild);
              cards[i].fix();
            }
            else if (Evt.position == ui.cardPile) {
              Evt.position.appendChild(cards[i]);
              cards[i].fix();
            }
            else cards[i].goto(Evt.position);
          }
          else {
            cards[i].remove();
          }
          //if(ss.contains(cards[i])) cards.splice(i--,1);
        }
        if (player == game.me) ui.updatehl();
        ui.updatej(player);
        game.broadcast(function (player, cards, num) {
          for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove('glow');
            cards[i].classList.remove('glows');
            cards[i].fix();
            cards[i].remove();
          }
          if (player == game.me) {
            ui.updatehl();
          }
          ui.updatej(player);
          _status.cardPileNum = num;
        }, player, cards, ui.cardPile.childNodes.length);
        game.addVideo('lose', player, [get.cardsInfo(hs), get.cardsInfo(es), get.cardsInfo(js), get.cardsInfo(ss)]);
        Evt.cards2 = hs.concat(es);
        player.getHistory('lose').push(Evt);
        game.getGlobalHistory().cardMove.push(Evt);
        player.update();
        game.addVideo('loseAfter', player);
        Evt.num = 0;
        if (Evt.position == ui.ordering) {
          var evt = Evt.relatedEvent || Evt.getParent();
          if (!evt.orderingCards) evt.orderingCards = [];
          if (!Evt.noOrdering && !Evt.cardsOrdered) {
            Evt.cardsOrdered = true;
            var next = game.createEvent('orderingDiscard', false, evt.getParent());
            next.relatedEvent = evt;
            next.setContent('orderingDiscard');
          }
          if (!Evt.noOrdering) {
            evt.orderingCards.addArray(cards);
            evt.orderingCards.addArray(ss);
          }
        }
        else if (Evt.position == ui.cardPile) {
          game.updateRoundNumber();
        }
        if (unmarks.length) {
          for (var i of unmarks) {
            player[(lib.skill[i] && lib.skill[i].mark || player.hasCard((card) => card.hasGaintag(i), 'x')) ? 'markSkill' : 'unmarkSkill'](i);
          }
        }
        Evt.hs = hs;
        Evt.es = es;
        Evt.js = js;
        Evt.ss = ss;
        Evt.xs = xs;
      }, () => {
        if (num < cards.length) {
          let evt = Evt.getParent();
          if (Evt.es.contains(cards[num])) {
            Evt.moveEquip = false;
            if ((evt.name == 'equip' && evt.cards.contains(cards[num]))
              || (Evt.getParent() && Evt.getParent().name != 'swapEquip')) Evt.moveEquip = true;
            Evt.loseEquip = true;
            player.removeEquipTrigger(cards[num], Evt.moveEquip);
            var info = get.info(cards[num]);
            if (info.onLose && (!info.filterLose || info.filterLose(cards[num], player))) {
              Evt.goto(3);
              return;
            }
          }
          Evt.num++;
          Evt.redo();
        }
        else {
          if (Evt.loseEquip) {
            player.addEquipTrigger();
          }
          Evt.goto(4);
        }
      }, () => {
        var info = get.info(cards[num]);
        if (info.loseDelay != false && (player.isAlive() || info.forceDie)) {
          player.popup(cards[num].name);
          game.delayx();
        }
        if (Array.isArray(info.onLose)) {
          for (var i = 0; i < info.onLose.length; i++) {
            var next = game.createEvent('lose_' + cards[num].name);
            next.setContent(info.onLose[i]);
            if (info.forceDie) next.forceDie = true;
            next.player = player;
            next.card = cards[num];
          }
        }
        else {
          var next = game.createEvent('lose_' + cards[num].name);
          next.setContent(info.onLose);
          next.player = player;
          if (info.forceDie) next.forceDie = true;
          next.card = cards[num];
        }
        Evt.num++;
        Evt.goto(2);
      }, () => {
        var evt = Evt.getParent();
        if ((evt.name != 'discard' && event.type != 'discard') && (evt.name != 'loseToDiscardpile' && Evt.type != 'loseToDiscardpile')) return;
        if (evt.delay != false) {
          if (evt.waitingForTransition) {
            _status.waitingForTransition = evt.waitingForTransition;
            game.pause();
          }
          else {
            game.delayx();
          }
        }
      }],
      /**
       * 令角色受到伤害
       * @name content.damage
       * @type {GameCores.Bases.StateMachine}
       */
      damage: [() => {
        Evt.forceDie = true;
        Evt.trigger('damageBegin1');
      }, () => {
        Evt.trigger('damageBegin2');
      }, () => {
        Evt.trigger('damageBegin3');
      }, () => {
        Evt.trigger('damageBegin4');
      }, () => {
        if (num > 0 && player.hujia && !player.hasSkillTag('nohujia') && !(source && source.hasSkillTag('overHujia', true, {
          name: Evt.card ? Evt.card.name : null,
          target: player,
          card: Evt.card
        }))) {
          if (num >= player.hujia) {
            Evt.hujia = player.hujia;
            num -= player.hujia;
          }
          else {
            Evt.hujia = num;
            num = 0;
          }
          player.changeHujia(-Evt.hujia).type = 'damage';
        }
        Evt.num = num;
        if (num <= 0) {
          Evt.trigger('damageZero');
          delete Evt.filterStop;
          Evt.finish();
          Evt._triggered = null;
        }
        if (num > 0) {
          Evt.trigger('damageHit');
        }
      }, () => {
        if (lib.config.background_audio) {
          game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
        }
        game.broadcast(function (num) {
          if (lib.config.background_audio) {
            game.playAudio('effect', 'damage' + (num > 1 ? '2' : ''));
          }
        }, num);
        var str = '受到了';
        if (source) str += '来自<span class="bluetext">' + (source == player ? '自己' : get.translation(source)) + '</span>的';
        str += get.cnNumber(num) + '点';
        if (Evt.nature) str += get.translation(Evt.nature) + '属性';
        str += '伤害';
        game.log(player, str);
        if (player.stat[player.stat.length - 1].damaged == undefined) {
          player.stat[player.stat.length - 1].damaged = num;
        }
        else {
          player.stat[player.stat.length - 1].damaged += num;
        }
        if (source) {
          source.getHistory('sourceDamage').push(Evt);
          if (source.stat[source.stat.length - 1].damage == undefined) {
            source.stat[source.stat.length - 1].damage = num;
          }
          else {
            source.stat[source.stat.length - 1].damage += num;
          }
        }
        player.getHistory('damage').push(Evt);
        if (Evt.notrigger) {
          player.changeHp(-num, false)._triggered = null;
        }
        else {
          player.changeHp(-num, false);
        }
        if (Evt.animate !== false) {
          player.$damage(source);
          game.broadcastAll(function (nature, player) {
            if (lib.config.animation && !lib.config.low_performance) {
              if (nature == 'fire') {
                player.$fire();
              }
              else if (nature == 'thunder') {
                player.$thunder();
              }
            }
          }, Evt.nature, player);
          player.$damagepop(-num, Evt.nature);
        }
        if (!Evt.notrigger) {
          if (num == 0) {
            Evt.trigger('damageZero');
            Evt._triggered = null;
          }
          else {
            Evt.trigger('damage');
          }
        }
      }, () => {
        if (player.hp <= 0 && player.isAlive()) {
          game.delayx();
          player.dying(Evt);
        }
        if (source && lib.config.border_style == 'auto') {
          var dnum = 0;
          for (var j = 0; j < source.stat.length; j++) {
            if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
          }
          if (dnum >= 2) {
            if (lib.config.autoborder_start == 'silver') {
              dnum += 4;
            }
            else if (lib.config.autoborder_start == 'gold') {
              dnum += 8;
            }
          }
          if (lib.config.autoborder_count == 'damage') {
            source.node.framebg.dataset.decoration = '';
            if (dnum >= 10) {
              source.node.framebg.dataset.auto = 'gold';
              if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold';
            }
            else if (dnum >= 6) {
              source.node.framebg.dataset.auto = 'silver';
              if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver';
            }
            else if (dnum >= 2) {
              source.node.framebg.dataset.auto = 'bronze';
              if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze';
            }
            if (dnum >= 2) {
              source.classList.add('topcount');
            }
          }
          else if (lib.config.autoborder_count == 'mix') {
            source.node.framebg.dataset.decoration = '';
            switch (source.node.framebg.dataset.auto) {
              case 'bronze': if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze'; break;
              case 'silver': if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver'; break;
              case 'gold': if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold'; break;
            }
          }
        }
      }, () => {
        if (!Evt.notrigger) Evt.trigger('damageSource');
      }],
      /**
       * 角色回复血量
       * @name content.recover
       * @type {GameCores.Bases.StateMachine}
       */
      recover: function () {
        if (lib.config.background_audio) {
          game.playAudio('effect', 'recover');
        }
        game.broadcast(function () {
          if (lib.config.background_audio) {
            game.playAudio('effect', 'recover');
          }
        });
        if (num > player.maxHp - player.hp) {
          num = player.maxHp - player.hp;
          Evt.num = num;
        }
        if (num > 0) {
          player.changeHp(num, false);
          game.broadcastAll(function (player) {
            if (lib.config.animation && !lib.config.low_performance) {
              player.$recover();
            }
          }, player);
          player.$damagepop(num, 'wood');
          game.log(player, '回复了' + get.cnNumber(num) + '点' + get.translation('hp'));
          Evt.result = num;
        }
        player.getHistory('recover').push(Evt);
      },
      /**
       * 令角色失去血量
       * @name content.loseHp
       * @type {GameCores.Bases.StateMachine}
       */
      loseHp: [() => {
        if (lib.config.background_audio) {
          game.playAudio('effect', 'loseHp');
        }
        game.broadcast(function () {
          if (lib.config.background_audio) {
            game.playAudio('effect', 'loseHp');
          }
        });
        game.log(player, '失去了' + get.cnNumber(num) + '点' + get.translation('hp'))
        player.changeHp(-num);
      }, () => {
        if (player.hp <= 0) {
          game.delayx();
          player.dying(Evt);
        }
      }],
      /**
       * 双将模式下，如果“双将体力设置”选择为“平均值”，因此向下取整体力的角色可以摸一张牌
       * @name content.doubleDraw
       * @type {GameCores.Bases.StateMachine}
       */
      doubleDraw: [() => {
        player.chooseBool('你的主副将体力上限之和是奇数，是否摸一张牌？');
      }, () => {
        if (result.bool) {
          player.draw();
        }
      }],
      /**
       * 令角色减少血量上限
       * @name content.loseMaxHp
       * @type {GameCores.Bases.StateMachine}
       */
      loseMaxHp: [() => {
        game.log(player, '减少了' + get.cnNumber(num) + '点' + get.translation('hp') + '上限');
        player.maxHp -= num;
        Evt.loseHp = Math.max(0, player.hp - player.maxHp);
        player.update();
      }, () => {
        if (player.maxHp <= 0) {
          player.die(Evt);
        }
      }],
      /**
       * 令角色增加血量上限
       * @name content.gainMaxHp
       * @type {GameCores.Bases.StateMachine}
       */
      gainMaxHp: [() => {
        game.log(player, '增加了' + get.cnNumber(num) + '点' + get.translation('hp') + '上限');
        player.maxHp += num;
        player.update();
      }],
      /**
       * 令角色改变血量(不能超过上限)
       * @name content.changeHp
       * @type {GameCores.Bases.StateMachine}
       */
      changeHp: [() => {
        Evt.trigger('changeHpBegin');
      }, () => {
        player.hp += num;
        if (isNaN(player.hp))
          player.hp = 0;
        if (player.hp > player.maxHp)
          player.hp = player.maxHp;
        player.update();
        if (Evt.popup !== false) {
          player.$damagepop(num, 'water');
        }
        //改变体力后立即刷新濒死列表
        if (_status.dying.contains(player) && player.hp > 0) {
          _status.dying.remove(player);
          game.broadcast(function (list) {
            _status.dying = list;
          }, _status.dying);
          var evt = Evt.getParent('_save');
          if (evt && evt.finish)
            evt.finish();
          evt = Evt.getParent('dying');
          if (evt && evt.finish)
            evt.finish();
        }
        Evt.trigger('changeHp');
      }],
      /**
       * 令角色获得/失去护甲
       * @name content.changeHujia
       * @type {GameCores.Bases.StateMachine}
       */
      changeHujia: () => {
        if (lib.config.background_audio) {
          game.playAudio('effect', 'hujia');
        }
        game.broadcast(function () {
          if (lib.config.background_audio) {
            game.playAudio('effect', 'hujia');
          }
        });
        player.hujia += num;
        player.$damagepop((num > 0 ? '+' + num : num), 'gray');
        if (num > 0) {
          game.log(player, '获得了' + get.cnNumber(num) + '点护甲');
        } else if (num < 0) {
          if (Evt.type == 'damage')
            game.log(player, '的护甲抵挡了' + get.cnNumber(-num) + '点伤害');
          else
            game.log(player, '失去了' + get.cnNumber(-num) + '点护甲');
        }
        if (player.hujia < 0) {
          player.hujia = 0;
        }
        player.update();
        player.getHistory('changeHujia').push(Evt);
      },
      /**
       * 角色濒死事件
       * @name content.dying
       * @type {GameCores.Bases.StateMachine}
       */
      dying: [() => {
        Evt.forceDie = true;
        if (player.isDying() || player.hp > 0) {
          Evt.finish();
          return;
        }
        _status.dying.unshift(player);
        game.broadcast(function (list) {
          _status.dying = list;
        }, _status.dying);
        Evt.trigger('dying');
        game.log(player, '濒死');
      }, () => {
        delete Evt.filterStop;
        if (player.hp > 0) {
          _status.dying.remove(player);
          game.broadcast(function (list) {
            _status.dying = list;
          }, _status.dying);
          Evt.finish();
        }
        else if (!Evt.skipTao) {
          var next = game.createEvent('_save');
          var start = false;
          var starts = [_status.currentPhase, Evt.source, Evt.player, game.me, game.players[0]];
          for (var i = 0; i < starts.length; i++) {
            if (get.itemtype(starts[i]) == 'player') {
              start = starts[i]; break;
            }
          }
          next.player = start;
          next._trigger = Evt;
          next.triggername = '_save';
          next.forceDie = true;
          next.setContent(lib.skill._save.content);
        }
      }, () => {
        _status.dying.remove(player);
        game.broadcast(function (list) {
          _status.dying = list;
        }, _status.dying);
        if (player.hp <= 0 && !player.nodying && !(Evt.reason && Evt.reason.nofatal)) player.die(Evt.reason);
      }],
      /**
       * 角色死亡事件
       * @name content.die
       * @type {GameCores.Bases.StateMachine}
       */
      die: [() => {
        Evt.forceDie = true;
        if (_status.roundStart == player) {
          _status.roundStart = player.next || player.getNext() || game.players[0];
        }
        if (ui.land && ui.land.player == player) {
          game.addVideo('destroyLand');
          ui.land.destroy();
        }
        var unseen = false;
        if (player.classList.contains('unseen')) {
          player.classList.remove('unseen');
          unseen = true;
        }
        var logvid = game.logv(player, 'die', source);
        Evt.logvid = logvid;
        if (unseen) {
          player.classList.add('unseen');
        }
        if (source) {
          game.log(player, '被', source, '杀害');
          if (source.stat[source.stat.length - 1].kill == undefined) {
            source.stat[source.stat.length - 1].kill = 1;
          }
          else {
            source.stat[source.stat.length - 1].kill++;
          }
        }
        else {
          game.log(player, '阵亡')
        }


        // player.removeEquipTrigger();

        // for(var i in lib.skill.globalmap){
        //     if(lib.skill.globalmap[i].contains(player)){
        //                  lib.skill.globalmap[i].remove(player);
        //                  if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
        //                               game.removeGlobalSkill(i);
        //                  }
        //     }
        // }

        game.broadcastAll(function (player) {
          player.classList.add('dead');
          player.removeLink();
          player.classList.remove('turnedover');
          player.classList.remove('out');
          player.node.count.innerHTML = '0';
          player.node.hp.hide();
          player.node.equips.hide();
          player.node.count.hide();
          player.previous.next = player.next;
          player.next.previous = player.previous;
          game.players.remove(player);
          game.dead.push(player);
          _status.dying.remove(player);

          if (lib.config.background_speak) {
            if (lib.character[player.name] && lib.character[player.name][4].contains('die_audio')) {
              game.playAudio('die', player.name);
            }
            // else if(true){
            else {
              game.playAudio('die', player.name, function () {
                game.playAudio('die', player.name.slice(player.name.indexOf('_') + 1));
              });
            }
          }
        }, player);

        game.addVideo('diex', player);
        if (Evt.animate !== false) {
          player.$die(source);
        }
        if (player.hp != 0) {
          player.changeHp(0 - player.hp, false).forceDie = true;
        }
      }, () => {
        if (player.dieAfter) player.dieAfter(source);
      }, () => {
        Evt.trigger('die');
      }, () => {
        if (player.isDead()) {
          if (!game.reserveDead) {
            for (var mark in player.marks) {
              player.unmarkSkill(mark);
            }
            while (player.node.marks.childNodes.length > 1) {
              player.node.marks.lastChild.remove();
            }
            game.broadcast(function (player) {
              while (player.node.marks.childNodes.length > 1) {
                player.node.marks.lastChild.remove();
              }
            }, player);
          }
          for (var i in player.tempSkills) {
            player.removeSkill(i);
          }
          var skills = player.getSkills();
          for (var i = 0; i < skills.length; i++) {
            if (lib.skill[skills[i]].temp) {
              player.removeSkill(skills[i]);
            }
          }
          if (_status.characterlist) {
            if (lib.character[player.name]) _status.characterlist.add(player.name);
            if (lib.character[player.name1]) _status.characterlist.add(player.name1);
            if (lib.character[player.name2]) _status.characterlist.add(player.name2);
          }
          Evt.cards = player.getCards('hejsx');
          if (Evt.cards.length) {
            player.discard(Evt.cards).forceDie = true;
            //player.$throw(Evt.cards,1000);
          }
        }
      }, () => {
        if (player.dieAfter2) player.dieAfter2(source);
      }, () => {
        game.broadcastAll(function (player) {
          if (game.online && player == game.me && !_status.over && !game.controlOver && !ui.exit) {
            if (lib.mode[lib.configOL.mode].config.dierestart) {
              ui.create.exit();
            }
          }
        }, player);
        if (!_status.connectMode && player == game.me && !_status.over && !game.controlOver) {
          ui.control.show();
          if (get.config('revive') && lib.mode[lib.config.mode].config.revive && !ui.revive) {
            ui.revive = ui.create.control('revive', ui.click.dierevive);
          }
          if (get.config('continue_game') && !ui.continue_game && lib.mode[lib.config.mode].config.continue_game && !_status.brawl && !game.no_continue_game) {
            ui.continue_game = ui.create.control('再战', game.reloadCurrent);
          }
          if (get.config('dierestart') && lib.mode[lib.config.mode].config.dierestart && !ui.restart) {
            ui.restart = ui.create.control('restart', game.reload);
          }
        }

        if (!_status.connectMode && player == game.me && !game.modeSwapPlayer) {
          // _status.auto=false;
          if (ui.auto) {
            // ui.auto.classList.remove('glow');
            ui.auto.hide();
          }
          if (ui.wuxie) ui.wuxie.hide();
        }

        if (typeof _status.coin == 'number' && source && !_status.auto) {
          if (source == game.me || source.isUnderControl()) {
            _status.coin += 10;
          }
        }
        if (source && lib.config.border_style == 'auto' && (lib.config.autoborder_count == 'kill' || lib.config.autoborder_count == 'mix')) {
          switch (source.node.framebg.dataset.auto) {
            case 'gold': case 'silver': source.node.framebg.dataset.auto = 'gold'; break;
            case 'bronze': source.node.framebg.dataset.auto = 'silver'; break;
            default: source.node.framebg.dataset.auto = lib.config.autoborder_start || 'bronze';
          }
          if (lib.config.autoborder_count == 'kill') {
            source.node.framebg.dataset.decoration = source.node.framebg.dataset.auto;
          }
          else {
            var dnum = 0;
            for (var j = 0; j < source.stat.length; j++) {
              if (source.stat[j].damage != undefined) dnum += source.stat[j].damage;
            }
            source.node.framebg.dataset.decoration = '';
            switch (source.node.framebg.dataset.auto) {
              case 'bronze': if (dnum >= 4) source.node.framebg.dataset.decoration = 'bronze'; break;
              case 'silver': if (dnum >= 8) source.node.framebg.dataset.decoration = 'silver'; break;
              case 'gold': if (dnum >= 12) source.node.framebg.dataset.decoration = 'gold'; break;
            }
          }
          source.classList.add('topcount');
        }
      }],
      /**
       * 角色使用装备牌
       * @name content.equip
       * @type {GameCores.Bases.StateMachine}
       */
      equip: [() => {
        console.log(card, cards)
        if (cards) {
          var owner = get.owner(cards[0]);
          if (owner) owner.lose(card, ui.special, 'visible').set('type', 'equip').set('getlx', false);
        }
      }, () => {
        if (Evt.cancelled) {
          Evt.finish();
          return;
        }
        if (cards[0].destroyed) {
          if (player.hasSkill(cards[0].destroyed)) {
            delete cards[0].destroyed;
          }
          else {
            Evt.finish();
            return;
          }
        }
        if (Evt.draw) {
          game.delay(0, 300);
          player.$draw(cards);
        }
        var viewAs = typeof card == 'string' ? card : card.name;
        Evt.viewAs = viewAs;
        if (!lib.card[viewAs]) {
          cards[0].fix();
          cards[0].style.transform = '';
          cards[0].classList.remove('drawinghidden');
          delete cards[0]._transform;
          game.cardsDiscard(cards[0]);
          Evt.finish();
        }
      }, () => {
        game.broadcast(function (player, card, viewAs) {
          if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)) {
            card.clone.moveDelete(player);
            game.addVideo('gain2', player, get.cardsInfo([card]));
          }
        }, player, cards[0], Evt.viewAs);
        if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)) {
          cards[0].clone.moveDelete(player);
          game.addVideo('gain2', player, get.cardsInfo(cards));
        }
        player.equiping = true;
      }, () => {
        var info = get.info(card, false);
        var current = player.getCards('e', function (card) {
          if (info.customSwap) return info.customSwap(card);
          return get.subtype(card, false) == info.subtype;
        });
        if (current.length) {
          player.lose(current, false, 'visible').set('type', 'equip').set('getlx', false);
          if (info.loseThrow) {
            player.$throw(current);
          }
          Evt.swapped = true;
          Evt.redo();
        }
        if (get.itemtype(card) != 'card') {
          if (typeof card == 'string') cards[0].viewAs = card;
          else cards[0].viewAs = card.name;
        }
        else {
          delete cards[0].viewAs;
        }
      }, () => {
        if (player.isMin() || player.countCards('e', { subtype: get.subtype(Evt.viewAs) })) {
          Evt.finish();
          game.cardsDiscard(cards[0]);
          delete player.equiping;
          return;
        }
        if (lib.config.background_audio) {
          game.playAudio('effect', get.subtype(Evt.viewAs));
        }
        game.broadcast(function (type) {
          if (lib.config.background_audio) {
            game.playAudio('effect', type);
          }
        }, get.subtype(cards[0].viewAs));
        if (cards[0].viewAs && cards[0].viewAs != cards[0].name) {
          player.$equip(cards[0], cards[0].viewAs);
          game.addVideo('equip', player, get.cardInfo(cards[0].viewAs));
          game.log(player, '装备了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards[0], '）');
        }
        else if (cards[0].originalName && cards[0].originalName != cards[0].name) {
          player.$equip(cards[0]);
          game.addVideo('equip', player, get.cardInfo(cards[0]));
          game.log(player, '装备了', cards[0], '（【' + get.translation(cards[0].originalName) + '】）');
        }
        else {
          player.$equip(cards[0]);
          game.addVideo('equip', player, get.cardInfo(card));
          game.log(player, '装备了', card);
        }
      }, () => {
        var info = get.info(card, false);
        if (info.onEquip && (!info.filterEquip || info.filterEquip(card, player))) {
          if (Array.isArray(info.onEquip)) {
            for (var i = 0; i < info.onEquip.length; i++) {
              var next = game.createEvent('equip_' + card.name);
              next.setContent(info.onEquip[i]);
              next.player = player;
              next.card = card;
            }
          }
          else {
            var next = game.createEvent('equip_' + card.name);
            next.setContent(info.onEquip);
            next.player = player;
            next.card = card;
          }
          if (info.equipDelay != 'false') game.delayx();
        }
        delete player.equiping;
        if (Evt.delay) {
          game.delayx();
        }
      }],
      /**
       * 角色添加判定牌
       * @name content.addJudge
       * @type {GameCores.Bases.StateMachine}
       */
      addJudge: [() => {
        if (cards) {
          var owner = get.owner(cards[0]);
          if (owner) {
            Evt.relatedLose = owner.lose(cards, 'visible').set('getlx', false);
          }
        }
      }, () => {
        if (cards[0].destroyed) {
          if (player.hasSkill(cards[0].destroyed)) {
            delete cards[0].destroyed;
          }
          else {
            Evt.finish();
            return;
          }
        }
        cards[0].fix();
        cards[0].style.transform = '';
        cards[0].classList.remove('drawinghidden');
        delete cards[0]._transform;
        var viewAs = typeof card == 'string' ? card : card.name;
        if (!lib.card[viewAs] || !lib.card[viewAs].effect) {
          game.cardsDiscard(cards[0]);
        }
        else {
          cards[0].style.transform = '';
          cards[0].classList.add('drawinghidden');
          player.node.judges.insertBefore(cards[0], player.node.judges.firstChild);
          if (_status.discarded) {
            _status.discarded.remove(cards[0]);
          }
          ui.updatej(player);
          game.broadcast(function (player, card, viewAs) {
            card.fix();
            card.style.transform = '';
            card.classList.add('drawinghidden');
            card.viewAs = viewAs;
            if (viewAs && viewAs != card.name && (card.classList.contains('fullskin') || card.classList.contains('fullborder'))) {
              card.classList.add('fakejudge');
              card.node.background.innerHTML = lib.translate[viewAs + '_bg'] || get.translation(viewAs)[0]
            }
            else {
              card.classList.remove('fakejudge');
            }
            player.node.judges.insertBefore(card, player.node.judges.firstChild);
            ui.updatej(player);
            if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)) {
              card.clone.moveDelete(player);
              game.addVideo('gain2', player, get.cardsInfo([card]));
            }
          }, player, cards[0], viewAs);
          if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)) {
            cards[0].clone.moveDelete(player);
            game.addVideo('gain2', player, get.cardsInfo(cards));
          }
          // player.$gain2(cards);
          if (get.itemtype(card) != 'card') {
            if (typeof card == 'string') cards[0].viewAs = card;
            else cards[0].viewAs = card.name;
          }
          else {
            delete cards[0].viewAs;
          }
          if (cards[0].viewAs && cards[0].viewAs != cards[0].name) {
            if (cards[0].classList.contains('fullskin') || cards[0].classList.contains('fullborder')) {
              cards[0].classList.add('fakejudge');
              cards[0].node.background.innerHTML = lib.translate[cards[0].viewAs + '_bg'] || get.translation(cards[0].viewAs)[0];
            }
            //姑且改成了取单牌的形式，以后需要叠多张牌的时候再改回来
            game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards[0], '）');
          }
          else {
            cards[0].classList.remove('fakejudge');
            game.log(player, '被贴上了', cards);
          }
          game.addVideo('addJudge', player, [get.cardInfo(cards[0]), cards[0].viewAs]);
        }
      }],
      /**
       * 角色进行判定
       * @name content.judge
       * @type {GameCores.Bases.StateMachine}
       * @property {!Object} Evt 本事件
       * @property {!Object} Evt.result 将判定牌信息返回给父事件
       */
      judge: [() => {
        var judgestr = get.translation(player) + '的' + Evt.judgestr + '判定';
        Evt.videoId = lib.status.videoId++;
        var cardj = Evt.directresult;
        if (!cardj) {
          if (player.getTopCards) cardj = player.getTopCards()[0];
          else cardj = get.cards()[0];
        }
        var nextj = game.cardsGotoOrdering(cardj);
        if (Evt.position != ui.discardPile) nextj.noOrdering = true;
        player.judging.unshift(cardj);
        game.addVideo('judge1', player, [get.cardInfo(player.judging[0]), judgestr, Evt.videoId]);
        game.broadcastAll(function (player, card, str, id, cardid) {
          var Evt;
          if (game.online) {
            Evt = {};
          }
          else {
            Evt = _status.event;
          }
          if (game.chess) {
            Evt.node = card.copy('thrown', 'center', ui.arena).animate('start');
          }
          else {
            Evt.node = player.$throwordered(card.copy(), true);
          }
          if (lib.cardOL) lib.cardOL[cardid] = Evt.node;
          Evt.node.cardid = cardid;
          Evt.node.classList.add('thrownhighlight');
          ui.arena.classList.add('thrownhighlight');
          Evt.dialog = ui.create.dialog(str);
          Evt.dialog.classList.add('center');
          Evt.dialog.videoId = id;
        }, player, player.judging[0], judgestr, Evt.videoId, get.id());

        game.log(player, '进行' + Evt.judgestr + '判定，亮出的判定牌为', player.judging[0]);
        game.delay(2);
        if (!Evt.noJudgeTrigger) Evt.trigger('judge');
      }, () => {
        Evt.result = {
          card: player.judging[0],
          name: player.judging[0].name,
          number: get.number(player.judging[0]),
          suit: get.suit(player.judging[0]),
          color: get.color(player.judging[0]),
          node: Evt.node,
        };
        if (Evt.fixedResult) {
          for (var i in Evt.fixedResult) {
            Evt.result[i] = Evt.fixedResult[i];
          }
        }
        Evt.result.judge = Evt.judge(Evt.result);
        if (Evt.result.judge > 0) Evt.result.bool = true;
        else if (Evt.result.judge < 0) Evt.result.bool = false;
        else Evt.result.bool = null;
        player.judging.shift();
        game.checkMod(player, Evt.result, 'judge', player);
        if (Evt.result.bool == true) {
          player.popup('洗具');
        }
        else if (Evt.result.bool == false) {
          player.popup('杯具');
        }
        if (Evt.clearArena != false) {
          game.broadcastAll(ui.clear);
        }
        game.broadcast(function (id) {
          var dialog = get.idDialog(id);
          if (dialog) {
            dialog.close();
          }
          ui.arena.classList.remove('thrownhighlight');
        }, Evt.videoId);
        Evt.dialog.close();
        game.addVideo('judge2', null, Evt.videoId);
        ui.arena.classList.remove('thrownhighlight');
        game.log(player, '的判定结果为', Evt.result.card);
        if (Evt.callback) {
          var next = game.createEvent('judgeCallback', false);
          next.player = player;
          next.card = Evt.result.card;
          next.judgeResult = get.copy(Evt.result);
          next.setContent(Evt.callback);
        }
        else {
          if (!get.owner(Evt.result.card)) {
            if (Evt.position != ui.discardPile) Evt.position.appendChild(Evt.result.card);
          }
        }
        player.getHistory('judge').push(Evt);
      }],
      /**
       * 角色武将牌翻面
       * @name content.turnOver
       * @type {GameCores.Bases.StateMachine}
       */
      turnOver: function () {
        game.log(player, '翻面');
        player.classList.toggle('turnedover');
        game.broadcast(function (player) {
          player.classList.toggle('turnedover');
        }, player);
        game.addVideo('turnOver', player, player.classList.contains('turnedover'));
      },
      /**
       * 角色连环/解除连环
       * @name content.link
       * @type {GameCores.Bases.StateMachine}
       */
      link: function () {
        if (player.isLinked()) {
          game.log(player, '解除连环');
        }
        else {
          game.log(player, '被连环');
        }
        if (lib.config.background_audio) {
          game.playAudio('effect', 'link');
        }
        game.broadcast(function () {
          if (lib.config.background_audio) {
            game.playAudio('effect', 'link');
          }
        });
        player.classList.remove('target');
        if (get.is.linked2(player)) {
          player.classList.toggle('linked2');
        }
        else {
          player.classList.toggle('linked');
        }
        ui.updatej(player);
        ui.updatem(player);
        game.broadcast(function (player, linked) {
          player.classList.remove('target');
          if (get.is.linked2(player)) {
            if (linked) {
              player.classList.add('linked2');
            }
            else {
              player.classList.remove('linked2');
            }
          }
          else {
            if (linked) {
              player.classList.add('linked');
            }
            else {
              player.classList.remove('linked');
            }
          }
          ui.updatej(player);
          ui.updatem(player);
        }, player, player.isLinked());
        game.addVideo('link', player, player.isLinked());
      },
      chooseToGuanxing: [() => {
        var cards = get.cards(num);
        game.cardsGotoOrdering(cards);
        var next = player.chooseToMove();
        next.set('list', [
          ['牌堆顶', cards],
          ['牌堆底'],
        ]);
        next.set('prompt', '点击将牌移动到牌堆顶或牌堆底');
        next.processAI = event.processAI || function (list) {
          var cards = list[0][1], player = _status.event.player;
          var top = [];
          var bottom;
          cards.sort(function (a, b) {
            return get.value(b, player) - get.value(a, player);
          });
          while (cards.length) {
            if (get.value(cards[0], player) <= 5) break;
            top.unshift(cards.shift());
          }
          bottom = cards;
          return [top, bottom];
        }
      }, () => {
        var top = result.moved[0];
        var bottom = result.moved[1];
        top.reverse();
        for (var i = 0; i < top.length; i++) {
          ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
        }
        for (i = 0; i < bottom.length; i++) {
          ui.cardPile.appendChild(bottom[i]);
        }
        player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
        game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
        game.updateRoundNumber();
        game.delayx();
      }],
    },
    /**
     * 玩家方法，.player节点共用的方法（比如展示牌【showCard】）
     * 角色
     * @namespace
     * @mixin
     */
    player: {
      /**
       * 检测本角色武将牌周围是否有牌
       */
      hasCardAround: function () {
        return this.getCardAround().length > 0
      },
      getCardAround: function () {
        let cards = [];
        let skills = this.getSkills(true, false, false);
        game.expandSkills(skills);
        for (let i of skills) {
          if (lib.skill[i]) {
            if (lib.skill[i].cardAround) {
              let key = [];
              let storage = this.getStorage(i);
              let method = lib.skill[i].cardAround;
              if (Array.isArray(method)) {
                for (let j of method) key = key.concat(storage[j]);
              }
              else if (typeof method == 'function') {
                key = key.concat(method(this));
              }
              else if (Array.isArray(storage)) {
                key = key.concat(storage);
              }
              else key.push(storage);
              cards.addArray(key);
            }
            else if (lib.skill[i].intro && lib.skill[i].intro.markcount === 'expansion') {
              cards.addArray(this.getExpansions(i));
            }
          }
        }
        return cards;
      },
      isYingV: function () {
        var info = lib.character[this.name || this.name1];
        if (info && info[4]) {
          if (info[4].contains('yingV')) return true;
        }
      },
      isGuoV: function () {
        var info = lib.character[this.name || this.name1];
        if (info && info[4]) {
          if (info[4].contains('guoV')) return true;
        }
      },
      /**
       * 将一张牌置入本角色的判定区
       */
      addToJudge: function (card, source) {
        let cards = (get.itemtype(card) == 'card') ? [card] : card;
        if (source) source.$give(cards, this, false);
        if (get.type(cards[0]) == 'delay') this.addJudge(cards[0]);
        else if (get.color(cards[0]) == 'red' && this.canAddJudge('lebu')) this.addJudge({ name: 'lebu' }, cards);
        else if (get.color(cards[0]) == 'black' && this.canAddJudge('bingliang')) this.addJudge({ name: 'bingliang' }, cards);
      },
      /**
       * 判断一张牌能否本角色的判定区
       */
      canAddToJudge: function (card) {
        if (get.type(card) == 'delay') return this.canAddJudge(card);
        if (this.canAddJudge('lebu') && get.color(card) == 'red') return true
        if (this.canAddJudge('bingliang') && get.color(card) == 'black') return true
        return false;
      },
      //自创函数(升阶相关)
      choosePromotion: function (...args) {
        let next = game.createEvent('choosePromotion');
        next.player = this;
        for (let i of args) {
          if (get.itemtype(i) == 'cards') next.materials = i;
          else if (typeof i == 'boolean') next.forced = i;
          else if (typeof i == 'string') next.prompt = i;
          else if (get.itemtype(i) == 'select' || typeof i == 'number') next.select = i;
          else if (typeof i == 'function') next.filterProduct = i;
          else if (typeof i == 'function') next.filterMaterial = i;
        }
        if (!this.canPromotion.apply(this, arguments)) return;
        if (next.prompt == undefined) next.prompt = '「普通升阶」（每个出牌阶段限一次）<br>请选择升阶获得的卡牌';
        if (next.select == undefined) next.select = [1, Infinity];
        next.setContent('choosePromotion');
        return next;
      },
      canPromotion: function (...args) {
        if (this.$.canPromotion === false) return false
        if (lib.configOL.protect_beginner) return false;
        let list = [];
        if (!lib.cardPack.mode_derivation || !lib.cardPack.mode_derivation.length) return false;
        for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
          var info = lib.card[lib.cardPack.mode_derivation[i]];
          if (info && info.materials && (typeof info.materials == 'function' || Array.isArray(info.materials))) list.push(lib.cardPack.mode_derivation[i]);
        }
        let materials, select, filterProduct, bool = false;
        for (let i of args) {
          if (get.itemtype(i) == 'cards') materials = i;
          else if (get.itemtype(i) == 'select' || typeof i == 'number') select = i;
          else if (typeof i == 'function') filterProduct = i;
        }
        if (filterProduct) list = list.filter(filterProduct);
        if (!materials || !list.length) return false;
        if (select == undefined) select = [1, Infinity];
        let materialList = [];
        let cards = materials.slice(0);
        let l = cards.length;
        let all = Math.pow(l, 2);
        for (let i = 1; i < all; i++) {
          let array = [];
          for (let j = 0; j < l; j++) {
            if (Math.floor((i % Math.pow(2, j + 1)) / Math.pow(2, j)) > 0) array.push(cards[j])
          }
          if ((get.itemtype(select) == 'select' && array.length >= select[0] && array.length <= select[1])
            || (typeof select == 'number' && array.length == select)) materialList.push(array);
        }
        for (let j of materialList) {
          for (let k of list) {
            let filter = get.info({ name: k }).materials;
            if (Array.isArray(filter) && filter.length == j.length) {
              let mate = filter.slice(0);
              for (let l = 0; l < mate.length; l++) {
                for (let card of j) {
                  if (get.is.filterCardBy(card, mate[l])) {
                    mate.splice(l--, 1);
                  }
                }
              }
              if (mate.length == 0) {
                bool = true;
              }
            }
            if (typeof filter == 'function') {
              bool = filter(j);
            }
          }
        }
        return bool;
      },
      //新函数
      /**
       * 将技能移入本角色的封锁列表
       */
      addSkillBlocker: function (skill) {
        if (!this.storage.skill_blocker) this.storage.skill_blocker = [];
        this.storage.skill_blocker.push(skill);
      },
      /**
       * 将技能移出本角色的封锁列表
       */
      removeSkillBlocker: function (skill) {
        if (this.storage.skill_blocker) {
          this.storage.skill_blocker.remove(skill);
          if (!this.storage.skill_blocker.length) delete this.storage.skill_blocker;
        }
      },
      /**
       * 将本角色的卡牌移入(目标角色)特殊区
       */
      loseToSpecial: function (cards, tag, target) {
        var next = game.loseAsync({
          player: this,
          cards: cards,
          tag: tag,
          toStorage: true,
          target: target || this,
        });
        next.setContent([() => {
          player.lose(cards, ui.special).set('getlx', false);
        }, () => {
          target.directgains(cards, null, Evt.tag)
        }]);
        return next;
      },
      /**
       * 为本角色的手牌添加标签
       */
      addGaintag: function (cards, tag) {
        if (get.itemtype(cards) == 'card') cards = [cards];
        game.addVideo('addGaintag', this, [get.cardsInfo(cards), tag]);
        game.broadcastAll(function (player, cards, tag) {
          var hs = player.getCards('h');
          for (var i of cards) {
            if (hs.contains(i)) i.addGaintag(tag);
          }
        }, this, cards, tag);
      },
      /**
       * 为本角色手牌移除标签
       */
      removeGaintag: function (tag, cards) {
        game.addVideo('removeGaintag', this, tag);
        game.broadcastAll(function (player, tag, cards) {
          cards = cards || player.getCards('h');
          for (var i of cards) i.removeGaintag(tag);
        }, this, tag, cards);
      },
      /**
       * 判断本角色能否在濒死求桃事件中救治目标角色
       * @param {string} target 目标角色
       * @returns {!boolean} 可以救治返回`true`，不可以返回`false`
       */
      canSave: function (target) {
        var player = this;
        if (player.hasSkillTag('save', true, target, true)) return true;
        var name = {}, hs = player.getCards('hs');
        for (var i of hs) name[get.name(i)] = true;
        for (var i in lib.card) {
          if (lib.card[i].savable && (lib.inpile.contains(i) || name[i])) {
            if (lib.filter.cardSavable({ name: i }, player, target) && (_status.connectMode || player.hasUsableCard(i))) return true;
          }
        }
        return false;
      },
      /**
       * 展示本角色
       * @param {(0|1|2)} num 0:展示主将; 1: 展示副将; 2: 全部展示
       * @param {?boolean} [log] 如果为true或未指定，输出日志；如果为false，不输出日志
       * @returns {GameCores.Bases.Event}
       */
      showCharacter: function (num, log) {
        var toShow = [];
        if ((num == 0 || num == 2) && this.isUnseen(0)) toShow.add(this.name1);
        if ((num == 1 || num == 2) && this.isUnseen(1)) toShow.add(this.name2);
        if (!toShow.length) return;
        lib.element.player.$showCharacter.apply(this, arguments);
        var next = game.createEvent('showCharacter', false);
        next.player = this;
        next.num = num;
        next.toShow = toShow;
        next._args = arguments;
        next.setContent('showCharacter');
        return next;
      },
      /**
       * 展示本角色(无事件)
       * @param {(0|1|2)} num 0:展示主将; 1: 展示副将; 2: 全部展示
       * @param {?boolean} [log] 如果为true或未指定，输出日志；如果为false，不输出日志
       */
      $showCharacter: function (num, log) {
        if (num == 0 && !this.isUnseen(0)) {
          return;
        }
        if (num == 1 && (!this.name2 || !this.isUnseen(1))) {
          return;
        }
        if (!this.isUnseen(2)) {
          return;
        }
        game.addVideo('showCharacter', this, num);
        var skills;
        switch (num) {
          case 0:
            if (log !== false) game.log(this, '展示了主将', '#b' + this.name1);
            this.name = this.name1;
            skills = lib.character[this.name][3] || [];
            this.sex = lib.character[this.name][0];
            if (this.group == 'unknown') this.group = lib.character[this.name][1];
            this.classList.remove('unseen');
            break;
          case 1:
            if (log !== false) game.log(this, '展示了副将', '#b' + this.name2);
            skills = lib.character[this.name2][3] || [];
            if (this.sex == 'unknown') this.sex = lib.character[this.name2][0];
            if (this.name.indexOf('unknown') == 0) this.name = this.name2;
            this.classList.remove('unseen2');
            break;
          case 2:
            if (log !== false) {
              if (this.name2) game.log(this, '展示了主将', '#b' + this.name1, '、副将', '#b' + this.name2);
              else game.log(this, '展示了主将', '#b' + this.name1);
            }
            this.name = this.name1;
            var skills = (lib.character[this.name][3] || []);
            if (this.name2) skills = skills.concat(lib.character[this.name2][3] || []);
            this.sex = lib.character[this.name][0];
            if (this.group == 'unknown') this.group = lib.character[this.name][1];
            this.classList.remove('unseen');
            this.classList.remove('unseen2');
            break;
        }
        if (!this.isUnseen(2)) {
          delete this.storage.nohp;
          this.hp = this.storage.rawHp + this.maxHp - 1;
          this.maxHp = this.storage.rawMaxHp + this.maxHp - 1;
          this.node.hp.show();
          this.update();
        }
        game.broadcast(function (player, name, sex, num, group) {
          player.group = group;
          player.name = name;
          player.sex = sex;
          switch (num) {
            case 0: player.classList.remove('unseen'); break;
            case 1: player.classList.remove('unseen2'); break;
            case 2: player.classList.remove('unseen'); player.classList.remove('unseen2'); break;
          }
          if (!player.isUnseen(2)) {
            delete player.$.nohp;
            player.node.hp.show();
            player.update();
          }
        }, this, this.name, this.sex, num, this.group);
        for (var i = 0; i < skills.length; i++) {
          if (this.hiddenSkills.contains(skills[i])) {
            this.hiddenSkills.remove(skills[i]);
            this.addSkill(skills[i]);
          }
        }
        this.checkConflict();
      },
      /**
       * 演奏音符
       * 本角色演奏音符
       * @returns {GameCores.Bases.Event}
       */
      chooseToPlayBeatmap: function (beatmap) {
        var next = game.createEvent('chooseToPlayBeatmap');
        next.player = this;
        next.beatmap = beatmap;
        next._args = Array.from(arguments);
        next.setContent('chooseToPlayBeatmap');
        return next;
      },
      /**
       * 移动牌
       * 本角色牌堆顶、牌堆底、各区域之间移动牌
       * @returns {GameCores.Bases.Event}
       */
      chooseToMove: function () {
        var next = game.createEvent('chooseToMove');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
        }
        next.setContent('chooseToMove');
        next.filterOk = function () { return true };
        next.filterMove = function () { return true };
        return next;
      },
      /**
       * 观星
       * 本角色观看牌堆顶的`num`张牌并将其以任意顺序置于牌堆顶或牌堆底
       * @param {number} num
       * @returns {GameCores.Bases.Event}
       */
      chooseToGuanxing: function (num) {
        var next = game.createEvent('chooseToGuanxing');
        next.num = num || 1;
        next.player = this;
        next.setContent('chooseToGuanxing');
        return next;
      },
      /**
       * 向其他角色发送互动表情(本机)
       * @param {!GameCores.GameObjects.Player} 互动的对象
       * @param {!string} emotion 表情
       */
      $throwEmotion: function (target, name) {
        game.addVideo('throwEmotion', this, [target.dataset.position, name]);
        var getLeft = function (player) {
          if (player == game.me && !ui.fakeme && !ui.chess) return player.getLeft() + player.node.avatar.offsetWidth / 2;
          return player.getLeft() + player.offsetWidth / 2;
        }
        var player = this;
        var emotion = ui.create.div('', '<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '1.png"> </div>', game.chess ? ui.chess : ui.window);
        emotion.style.width = '60px';
        emotion.style.height = '60px';
        var width = emotion.offsetWidth / 2;
        var height = emotion.offsetHeight / 2;
        if (game.chess) width += 60;
        var left = getLeft(player) - width;
        var top = player.getTop() + player.offsetHeight / 3 - height;
        emotion.style.left = left + 'px';
        emotion.style.top = top + 'px';
        var left2 = getLeft(target) - width;
        var top2 = target.getTop() + target.offsetHeight / 3 - height;
        emotion.style['z-index'] = 10;
        emotion.style.transform = 'translateY(' + (top2 - top) + 'px) translateX(' + (left2 - left) + 'px)';
        if (lib.config.background_audio) game.playAudio('effect', 'throw_' + name + get.rand(1, 2));
        setTimeout(function () {
          emotion.innerHTML = ('<div style="text-align:center"> <img src="' + lib.assetURL + 'image/emotion/throw_emotion/' + name + '2.png"> </div>');
          setTimeout(function () {
            emotion.delete();
          }, 1200);
        }, 600);
      },
      /**
       * 本角色尝试播放一个技能动画[support online]
       * @param {string} name 技能名
       * @param {string} popname 弹出的名称，如果`popname`等于`name`，使用`get.skillTranslation(name, this)`作为弹出的名称
       * @param {?boolean} [checkShow]
       */
      trySkillAnimate: function (name, popname, checkShow) {
        if (!game.online && lib.config.skill_animation_type != 'off' && lib.skill[name] && lib.skill[name].skillAnimation) {
          if (lib.config.skill_animation_type == 'default') {
            checkShow = checkShow || 'main';
          }
          else {
            checkShow = false;
          }
          if (lib.skill[name].textAnimation) {
            checkShow = false;
          }
          this.$skill(lib.skill[name].animationStr || lib.translate[name], lib.skill[name].skillAnimation, lib.skill[name].animationColor, checkShow);
          return;
        }
        var player = this;
        game.broadcast(function (player, name, popname) {
          player.trySkillAnimate(name, popname);
        }, player, name, popname);
        if (lib.animate.skill[name]) lib.animate.skill[name].apply(this, arguments);
        else {
          if (popname != name) this.popup(popname, 'water', false);
          else this.popup(get.skillTranslation(name, this), 'water', false);
        }
      },
      /**
       * 本角色尝试播放一个游戏牌动画[support online]
       * @param {!GameCores.GameObjects.Card} card
       * @param {string} name 游戏牌名
       * @param {string} nature 属性
       * @param {?string} [popname] 弹出的名称，如果未指定，使用`name`作为弹出的名称
       */
      tryCardAnimate: function (card, name, nature, popname) {
        var player = this;
        game.broadcast(function (player, card, name, nature, popname) {
          player.tryCardAnimate(card, name, nature, popname);
        }, player, card, name, nature, popname);
        if (lib.animate.card[card.name]) lib.animate.card[card.name].apply(this, arguments);
        else {
          if (!lib.config.show_card_prompt) return;
          if (get.type(card) == 'equip' && lib.config.hide_card_prompt_equip) return;
          if (get.type(card) == 'basic' && lib.config.hide_card_prompt_basic) return;
          if (popname) player.popup({ name: card.name, nature: card.nature }, nature, false);
          else player.popup(name, nature, false);
        }
      },
      hasUsableCard: function (name) {
        var player = this;
        if (player.countCards('hs', name)) return true;
        var skills = player.getSkills(true).concat(lib.skill.global);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var ifo = get.info(skills[i]);
          if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == name) {
            if (!ifo.viewAsFilter || ifo.viewAsFilter(player) !== false) {
              return true;
            }
          }
          else {
            var hiddenCard = get.info(skills[i]).hiddenCard;
            if (typeof hiddenCard == 'function' && hiddenCard(player, name)) {
              return true;
            }
          }
        }
      },
      /**
       * 判断目标角色是否在本角色的攻击范围内
       * @param {string} to 目标角色
       * @returns {!boolean} 在范围内返回`true`，在范围外返回`false`
       */
      inRange: function (to) {
        var from = this;
        if (from == to || from.hasSkill('undist') || to.hasSkill('undist')) return false;
        if (!game.players.contains(from) && !game.dead.contains(from)) return false;
        if (!game.players.contains(to) && !game.dead.contains(to)) return false;
        var mod1 = game.checkMod(from, to, 'unchanged', 'inRange', from);
        if (mod1 != 'unchanged') return mod1;
        var mod2 = game.checkMod(from, to, 'unchanged', 'inRangeOf', to);
        if (mod2 != 'unchanged') return mod2;
        if (from.getAttackRange() < 1) return false;
        var player = from, m, n = 1, i;
        var fxy, txy;
        if (game.chess) {
          fxy = from.getXY();
          txy = to.getXY();
          n = Math.abs(fxy[0] - txy[0]) + Math.abs(fxy[1] - txy[1]);
        }
        else if (to.isMin(true) || from.isMin(true)) { }
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
          if (from.isDead()) length++;
          if (to.isDead()) length++;
          var left = from.hasSkillTag('left_hand');
          var right = from.hasSkillTag('right_hand');
          if (left === right) n = Math.min(n, length - n);
          else if (left == true) n = length - n;
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
          if (info.attaclTo) {
            m += info.attaclTo;
          }
        }
        return m <= 1;
      },
      /**
       * 判断本角色是否在目标角色的攻击范围内
       * @param {string} source 目标角色
       * @returns {!boolean} 在范围内返回`true`，在范围外返回`false`
       */
      inRangeOf: function (source) {
        return source.inRange(this);
      },
      /**
       * 获得本角色已损失的体力值
       * @returns {!number} this.maxHp - Math.max(0, this.hp)
       */
      getDamagedHp: function () {
        return this.maxHp - Math.max(0, this.hp);
      },
      changeGroup: function (group, log, broadcast) {
        var player = this;
        if (broadcast !== false) {
          game.broadcast(function (player, group) {
            player.group = group;
            player.node.name.dataset.nature = get.groupnature(group);
          }, player, group);
        }
        player.group = group;
        player.node.name.dataset.nature = get.groupnature(group);
        if (log !== false) game.log(this, '将势力变为了', '#y' + get.translation(group + 2));
      },
      chooseToDuiben: function (target) {
        var next = game.createEvent('chooseToDuiben');
        next.player = this;
        next.target = target;
        next.setContent('chooseToDuiben');
        return next;
      },
      chooseToPSS: function (target) {
        var next = game.createEvent('chooseToPSS');
        next.player = this;
        next.target = target;
        next.setContent('chooseToPSS');
        return next;
      },
      chooseToEnable: function () {
        var next = game.createEvent('chooseToEnable');
        next.player = this;
        next.setContent('chooseToEnable');
        return next;
      },
      chooseToDisable: function (horse) {
        var next = game.createEvent('chooseToDisable');
        next.player = this;
        if (horse) next.horse = true;
        next.setContent('chooseToDisable');
        return next;
      },
      countDisabled: function () {
        if (!this.storage.disableEquip) return 0;
        return this.storage.disableEquip.length;
      },
      isPhaseUsing: function (notmeisok) {
        if (!notmeisok && _status.currentPhase != this) return false;
        return _status.event.name == 'phaseUse' || _status.event.getParent('phaseUse').name == 'phaseUse';
      },
      swapEquip: function (target, subtype) {
        var next = game.createEvent('swapEquip');
        next.player = this;
        next.target = target;
        next.subtype = subtype;
        next.setContent('swapEquip');
        return next;
      },
      canCompare: function (target) {
        if (this == target) return false;
        if (!this.countCards('h') || !target.countCards('h')) return false;
        if (this.hasSkillTag('noCompareSource') || target.hasSkillTag('noCompareTarget')) return false;
        return true;
      },
      disableEquip: function (pos) {
        if (typeof pos == 'number') pos = 'equip' + pos;
        var next = game.createEvent('disableEquip');
        next.player = this;
        next.pos = pos;
        next.source = _status.event.player;
        next.setContent('disableEquip');
        return next;
      },
      $disableEquip: function (skill) {
        game.broadcast(function (player, skill) {
          player.$disableEquip(skill);
        }, this, skill);
        var player = this;
        if (!player.$.disableEquip) player.$.disableEquip = [];
        player.$.disableEquip.add(skill);
        player.$.disableEquip.sort();
        var pos = { equip1: '武器栏', equip2: '防具栏', equip3: '+1马栏', equip4: '-1马栏', equip5: '宝物栏' }[skill];
        if (!pos) return;
        var card = game.createCard('feichu_' + skill, pos, '');
        card.fix();
        card.style.transform = '';
        card.classList.remove('drawinghidden');
        card.classList.add('feichu');
        delete card._transform;
        var equipNum = get.equipNum(card);
        var equipped = false;
        for (var i = 0; i < player.node.equips.childNodes.length; i++) {
          if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
            player.node.equips.insertBefore(card, player.node.equips.childNodes[i]);
            equipped = true;
            break;
          }
        }
        if (!equipped) {
          player.node.equips.appendChild(card);
          if (_status.discarded) {
            _status.discarded.remove(card);
          }
        }
        return player;
      },
      enableEquip: function (pos) {
        if (typeof pos == 'number') pos = 'equip' + pos;
        var next = game.createEvent('enableEquip');
        next.player = this;
        next.pos = pos;
        next.source = _status.event.player;
        next.setContent('enableEquip');
        return next;
      },
      $enableEquip: function (skill) {
        game.broadcast(function (player, skill) {
          player.$enableEquip(skill);
        }, this, skill);
        var player = this;
        if (player.$.disableEquip) player.$.disableEquip.remove(skill);
        for (var i = 0; i < player.node.equips.childNodes.length; i++) {
          if (player.node.equips.childNodes[i].name == 'feichu_' + skill) {
            player.node.equips.removeChild(player.node.equips.childNodes[i]);
            break;
          }
        }
        return player;
      },
      isDisabled: function (arg) {
        if (typeof arg == 'number') arg = 'equip' + arg;
        if (arg == 'equip6' && this.storage.disableEquip && (this.storage.disableEquip.contains('equip3') || this.storage.disableEquip.contains('equip4'))) return true;
        if (this.storage.disableEquip && this.storage.disableEquip.contains(arg)) return true;
        return false;
      },
      isEmpty: function (num) {
        if (num == 6 || num == 'equip6') {
          if (!this.isEmpty(3) || !this.isEmpty(4)) return false;
        }
        else if ([3, 4, 'equip3', 'equip4'].contains(num)) {
          if (this.getEquip(6)) return false;
        }
        return !this.isDisabled(num) && !this.getEquip(num);
      },
      $disableJudge: function () {
        var player = this;
        var card = game.createCard('disable_judge', '', '');
        player.$._disableJudge = true;
        card.fix();
        card.classList.add('feichu');
        card.style.transform = '';
        card.classList.add('drawinghidden');
        player.node.judges.insertBefore(card, player.node.judges.firstChild);
        ui.updatej(player);
      },
      $enableJudge: function () {
        var player = this;
        player.$._disableJudge = false;
        for (var i = 0; i < player.node.judges.childNodes.length; i++) {
          if (player.node.judges.childNodes[i].name == 'disable_judge') {
            player.node.judges.removeChild(player.node.judges.childNodes[i]);
            break;
          }
        }
      },
      disableJudge: function () {
        var next = game.createEvent('disableJudge');
        next.player = this;
        next.source = _status.event.player;
        next.setContent('disableJudge');
        return next;
      },
      enableJudge: function () {
        var next = game.createEvent('enableJudge');
        next.player = this;
        next.source = _status.event.player;
        next.setContent('enableJudge');
        return next;
      },
      //原有函数
      /**
       * 角色初始化
       * @param {?string} character 角色名，如果未指定，函数直接返回undefined
       * @param {(string|false)} character2 如果为角色名，创建双将角色；如果为false，创建单将
       * @param {!boolean} skill 如果为true，添加技能；如果为false，不添加角色技能；该参数在`character2`参数为false时无效
       * @returns {GameCores.GameObjects.Card} 角色对象
       */
      init: function (character, character2, skill) {
        if (typeof character == 'string' && !lib.character[character]) {
          lib.character[character] = get.character(character);
        }
        if (typeof character2 == 'string' && !lib.character[character2]) {
          lib.character[character2] = get.character(character2);
        }
        if (!lib.character[character]) return;
        if (get.is.jun(character2)) {
          var tmp = character;
          character = character2;
          character2 = tmp;
        }
        if (character2 == false) {
          skill = false;
          character2 = null;
        }
        var info = lib.character[character];
        if (!info) {
          info = ['', '', 1, [], []];
        }
        if (!info[4]) {
          info[4] = [];
        }
        var skills = info[3].slice(0);
        this.clearSkills(true);
        this.classList.add('fullskin');
        if (!game.minskin && get.is.newLayout() && !info[4].contains('minskin')) {
          this.classList.remove('minskin');
          this.node.avatar.setBackground(character, 'character');
        }
        else {
          this.node.avatar.setBackground(character, 'character');
          if (info[4].contains('minskin')) {
            this.classList.add('minskin');
          }
          else if (game.minskin) {
            this.classList.add('minskin');
          }
          else {
            this.classList.remove('minskin');
          }
        }

        var hp1 = get.infoHp(info[2]);
        var maxHp1 = get.infoMaxHp(info[2]);

        this.node.avatar.show();
        this.node.count.show();
        this.node.equips.show();
        this.name = character;
        this.name1 = character;
        this.sex = info[0];
        this.group = info[1];
        this.hp = hp1;
        this.maxHp = maxHp1;
        this.hujia = 0;
        this.node.intro.innerHTML = lib.config.intro;
        this.node.name.dataset.nature = get.groupnature(this.group);
        lib.setIntro(this);
        this.node.name.innerHTML = get[get.slimName2 ? 'slimName2' : 'slimName'](character);
        let nameLength = this.node.name.querySelectorAll('br').length
        if (this.classList.contains('minskin')) {
          if (nameLength <= 1) {
            this.node.name.classList.add('short');
          }
          else if (nameLength == 2) {
            this.node.name.classList.add('lowshort');
          }
          else if (nameLength == 4 || nameLength == 5) {
            this.node.name.classList.add('lowlong');
          }
          else if (nameLength >= 6) {
            this.node.name.classList.add('long');
          }
        }
        else if (this.classList.contains('fullskin')) {
          if (nameLength <= 1) {
            this.node.name.classList.add('short');
          }
          else if (nameLength == 2) {
            this.node.name.classList.add('lowshort');
          }
          else if (nameLength >= 6) {
            this.node.name.classList.add('long');
          }
        }
        if (info[4].contains('hiddenSkill') && !this.noclick) {
          if (!this.hiddenSkills) this.hiddenSkills = [];
          this.hiddenSkills.addArray(skills);
          skills = [];
          this.classList.add(_status.video ? 'unseen_v' : 'unseen');
          this.name = 'unknown';
          if (!this.node.name_seat && !_status.video) {
            this.node.name_seat = ui.create.div('.name.name_seat', get.verticalStr(get.translation(this.name)), this);
            this.node.name_seat.dataset.nature = get.groupnature(this.group);
          }
          this.sex = 'male';
          //this.group='unknown';
          this.storage.nohp = true;
          skills.add('g_hidden_ai');
        }
        if (character2 && lib.character[character2]) {
          var info2 = lib.character[character2];
          if (!info2) {
            info2 = ['', '', 1, [], []];
          }
          if (!info2[4]) {
            info2[4] = [];
          }
          this.classList.add('fullskin2');
          this.node.avatar2.setBackground(character2, 'character');

          this.node.avatar2.show();
          this.name2 = character2;
          var hp2 = get.infoHp(info2[2]);
          var maxHp2 = get.infoMaxHp(info2[2]);
          var double_hp;
          if (_status.connectMode || get.mode() == 'single') {
            double_hp = 'pingjun';
          }
          else {
            double_hp = get.config('double_hp');
          }
          switch (double_hp) {
            case 'pingjun': {
              this.maxHp = Math.floor((maxHp1 + maxHp2) / 2);
              this.hp = Math.floor((hp1 + hp2) / 2);
              this.singleHp = ((maxHp1 + maxHp2) % 2 === 1);
              break;
            }
            case 'zuidazhi': {
              this.maxHp = Math.max(maxHp1, maxHp2);
              this.hp = Math.max(hp1, hp2);
              break;
            }
            case 'zuixiaozhi': {
              this.maxHp = Math.min(maxHp1, maxHp2);
              this.hp = Math.min(hp1, hp2);
              break;
            }
            case 'zonghe': {
              this.maxHp = maxHp1 + maxHp2;
              this.hp = hp1 + hp2;
              break;
            }
            default: {
              this.maxHp = maxHp1 + maxHp2 - 3;
              this.hp = hp1 + hp2 - 3;
            };
          }
          this.node.count.classList.add('p2');
          if (info2[4].contains('hiddenSkill') && !this.noclick) {
            if (!this.hiddenSkills) this.hiddenSkills = [];
            this.hiddenSkills.addArray(info2[3]);
            this.classList.add(_status.video ? 'unseen2_v' : 'unseen2');
            this.storage.nohp = true;
            skills.add('g_hidden_ai');
          }
          else skills = skills.concat(info2[3]);

          this.node.name2.innerHTML = get.slimName(character2);
        }
        if (this.storage.nohp) {
          this.storage.rawHp = this.hp;
          this.storage.rawMaxHp = this.maxHp;
          this.hp = 1;
          this.maxHp = 1;
          this.node.hp.hide();
        }
        if (skill != false) {
          for (var i = 0; i < skills.length; i++) {
            this.addSkill(skills[i]);
          }
          this.checkConflict();
        }
        if (this.group) {
          lib.group.add(this.group);
        }
        if (this.inits) {
          for (var i = 0; i < lib.element.player.inits.length; i++) {
            lib.element.player.inits[i](this);
          }
        }
        if (this._inits) {
          for (var i = 0; i < this._inits.length; i++) {
            this._inits[i](this);
          }
        }
        this.update();
        return this;
      },
      /**
       * 角色初始化[support online]
       * @param {string} name 玩家名
       * @param {string} character 角色名
       */
      initOL: function (name, character) {
        this.node.avatar.setBackground(character, 'character');
        this.node.avatar.show();
        this.node.name.innerHTML = get.verticalStr(name);
        this.nickname = name;
        this.avatar = character;
        this.node.nameol.innerHTML = '';
        if (lib.character[character]) this.sex = lib.character[character][0];
      },
      /**
       * 在角色销毁时调用[support online]
       */
      uninitOL: function () {
        this.node.avatar.hide();
        this.node.name.innerHTML = '';
        this.node.identity.firstChild.innerHTML = '';
        delete this.nickname;
        delete this.avatar;
        delete this.sex;
      },
      /**
       * 初始化房间
       * @returns {GameCores.GameObjects.Player} this self
       * @param {Array} info 房间信息
       */
      initRoom: function (info, info2) {
        var str = '';
        this.serving = false;
        if (!info || info == 'server') {
          this.roomempty = true;
          str = '空房间';
          this.roomfull = false;
          this.roomgaming = false;
          this.version = null;
          if (info == 'server') {
            this.serving = true;
          }
        }
        else {
          var config = info[2];
          this.key = info[4];
          this.roomempty = false;
          str += get.modetrans(config);
          str += ' 模式　';
          for (var i = str.length; i < 11; i++) str += '　';
          this.version = config.version;
          if (config.gameStarted) {
            str += '<span class="firetext">游戏中</span>　';
            if (config.observe && config.observeReady && this.version == lib.versionOL) {
              this.classList.remove('exclude');
            }
            else {
              this.classList.add('exclude');
            }
          }
          else {
            str += '<span class="greentext">等待中</span>　';
            if (this.version != lib.versionOL) {
              this.classList.add('exclude');
            }
            else {
              this.classList.remove('exclude');
            }
          }
          this.maxHp = parseInt(config.number);
          this.hp = Math.min(this.maxHp, info[3]);
          if (this.hp < this.maxHp || config.gameStarted) str += ('人数：' + this.hp + '/' + this.maxHp);
          else str += ('人数：<span class="firetext">' + this.hp + '/' + this.maxHp + '</span>');

          str += ('　(' + info[0].slice(0, 12) + ' 的房间)');
          this.config = config;
          if (this.hp == this.maxHp && !config.gameStarted) {
            this.roomfull = true;
          }
          else {
            this.roomfull = false;
          }
          if (config.gameStarted && (!config.observe || !config.observeReady)) {
            this.roomgaming = true;
          }
          else {
            this.roomgaming = false;
          }
        }
        this.firstChild.innerHTML = str;
        return this;
      },
      /**
       * TODO - 重新初始化
       * @param {*} from
       * @param {*} to
       * @param {*} maxHp
       * @param {*} online
       * @returns {(undefined|GameCores.GameObjects.Player)}
       */
      reinit: function (from, to, maxHp, online) {
        var info1 = lib.character[from];
        var info2 = lib.character[to];
        var smooth = true;
        if (maxHp == 'nosmooth') {
          smooth = false;
          maxHp = null;
        }
        if (this.name2 == from) {
          this.name2 = to;
          if (this.isUnseen(0) && !this.isUnseen(1)) {
            this.sex = info2[0];
            this.name = to;
          }
          if (smooth) this.smoothAvatar(true);
          this.node.avatar2.setBackground(to, 'character');
          this.node.name2.innerHTML = get.slimName(to);
        }
        else if (this.name == from || this.name1 == from) {
          if (this.name1 == from) {
            this.name1 = to;
          }
          if (!this.classList.contains('unseen2')) {
            this.name = to;
            this.sex = info2[0];
          }
          if (smooth) this.smoothAvatar(false);
          this.node.avatar.setBackground(to, 'character');
          this.node.name.innerHTML = get.slimName(to);

          if (this == game.me && ui.fakeme) {
            ui.fakeme.style.backgroundImage = this.node.avatar.style.backgroundImage;
          }
        }
        else {
          return this;
        }
        if (online) {
          return;
        }
        for (var i = 0; i < info1[3].length; i++) {
          this.removeSkill(info1[3][i]);
        }
        for (var i = 0; i < info2[3].length; i++) {
          this.addSkill(info2[3][i]);
        }
        if (Array.isArray(maxHp)) {
          this.maxHp = maxHp[1];
          this.hp = maxHp[0];
        }
        else {
          var num;
          if (maxHp === false) {
            num = 0;
          }
          else {
            if (typeof maxHp != 'number') {
              maxHp = get.infoMaxHp(info2[2]);
            }
            num = maxHp - get.infoMaxHp(info1[2]);
          }
          if (typeof this.singleHp == 'boolean') {
            if (num % 2 != 0) {
              if (this.singleHp) {
                this.maxHp += (num + 1) / 2;
                this.singleHp = false;
              }
              else {
                this.maxHp += (num - 1) / 2;
                this.singleHp = true;
                if (!game.online) {
                  this.doubleDraw();
                }
              }
            }
            else {
              this.maxHp += num / 2;
            }
          }
          else {
            this.maxHp += num;
          }
        }
        game.broadcast(function (player, from, to, skills) {
          player.reinit(from, to, null, true);
          player.applySkills(skills);
        }, this, from, to, get.skillState(this));
        game.addVideo('reinit3', this, {
          from: from,
          to: to,
          hp: this.maxHp,
          avatar2: this.name2 == to
        });
        this.update();
      },
      /**
       * 在角色销毁时调用
       * @returns {!GameCores.GameObjects.Player} this self
       */
      uninit: function () {
        for (var i = 1; i < 6; i++) {
          if (this.isDisabled(i)) this.$enableEquip('equip' + i);
        }
        if (this.storage._disableJudge) {
          game.broadcastAll(function (player) {
            player.$._disableJudge = false;
            for (var i = 0; i < player.node.judges.childNodes.length; i++) {
              if (player.node.judges.childNodes[i].name == 'disable_judge') {
                player.node.judges.removeChild(player.node.judges.childNodes[i]);
                break;
              }
            }
          }, this);
        }
        this.node.displayer.style.opacity = 0;
        this.node.displayer.style.transition = 'none'
        setTimeout(() => {
          this.node.displayer.style.opacity = ''
          this.node.displayer.style.transition = ''
        }, 220)
        this.node.avatar.hide();
        this.node.count.hide();
        if (this.node.wuxing) {
          this.node.wuxing.hide();
        }
        if (this.node.name_seat) {
          this.node.name_seat.remove();
          delete this.node.name_seat;
        }
        if (this.storage.nohp) this.node.hp.show();
        this.classList.remove('unseen');
        this.classList.remove('unseen2');
        delete this.name;
        delete this.name1;
        delete this.sex;
        delete this.group;
        delete this.hp;
        delete this.maxHp;
        delete this.hujia;
        this.clearSkills(true);
        this.node.identity.style.backgroundColor = '';
        this.node.intro.innerHTML = '';
        this.node.name.innerHTML = '';
        this.node.hp.innerHTML = '';
        this.node.count.innerHTML = '0';
        if (this.name2) {
          delete this.singleHp;
          this.node.avatar2.hide();
          this.node.name2.innerHTML = '';
          this.classList.remove('fullskin2')
          delete this.name2;
          this.node.count.classList.remove('p2');
        }
        for (var mark in this.marks) {
          this.marks[mark].remove();
        }
        ui.updatem(this);

        this.skipList = [];
        this.skills = this.skills.contains('cangji_yozuru') ? ['cangji_yozuru'] : [];
        this.initedSkills = [];
        this.additionalSkills = {};
        this.disabledSkills = {};
        this.hiddenSkills = [];
        this.awakenedSkills = [];
        this.forbiddenSkills = {};
        this.phaseNumber = 0;
        this.stat = [{ card: {}, skill: {} }];
        this.tempSkills = {};
        let storage = {}
        this.$ = this.storage = storage;
        this.marks = {};
        this.ai = { friend: [], enemy: [], neutral: [] };

        return this;
      },
      /**
       * 返回`this.offsetLeft`
       * @returns {!number}
       */
      getLeft: function () {
        return this.offsetLeft;
      },
      /**
       * 返回`this.offsetTop`
       * @returns {!number}
       */
      getTop: function () {
        return this.offsetTop;
      },
      /**
       * @param {?boolean} [vice] 是否使用副将头像，如果为true则使用副将头像；如果为false或未指定，使用(主将)头像
       * @param {?boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
       */
      smoothAvatar: function (vice, video) {
        var div = ui.create.div('.fullsize');
        if (vice) {
          div.style.background = getComputedStyle(this.node.avatar2).background;
          this.node.avatar2.appendChild(div);
        }
        else {
          div.style.background = getComputedStyle(this.node.avatar).background;
          this.node.avatar.appendChild(div);
        }
        ui.refresh(div);
        div.style.transition = 'all 1s';
        setTimeout(function () {
          div.classList.add('removing');
          setTimeout(function () {
            div.remove();
          }, 2000);
        }, 100);
        if (video != false) {
          game.addVideo('smoothAvatar', this, vice);
        }
      },
      /**
       * 强制改变本角色座次，即使目标座次已经有角色存在
       * @param {number} position
       * @param {boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
       */
      changeSeat: function (position, video) {
        var player = this;
        if (video !== false) game.addVideo('changeSeat', player, position);
        var rect1 = player.getBoundingClientRect();
        player.style.transition = 'all 0s';
        ui.refresh(player);
        player.dataset.position = position;
        var rect2 = player.getBoundingClientRect();
        var dx = rect1.left - rect2.left;
        var dy = rect1.top - rect2.top;
        if ((game.chess || (player.dataset.position != 0 && position != 0)) && player.classList.contains('linked')) {
          player.style.transform = 'rotate(-90deg) translate(' + (-dy) + 'px,' + (dx) + 'px)';
        }
        else {
          player.style.transform = 'translate(' + (dx) + 'px,' + (dy) + 'px)';
        }
        setTimeout(function () {
          player.style.transition = '';
          ui.refresh(player);
          player.style.transform = '';
        }, 100);
      },
      /**
       * 将数据(参数)传输至服务器
       * @returns {!GameCores.GameObjects.Player} this self
       */
      send: function () {
        if (!this.ws || this.ws.closed) return this;
        this.ws.send.apply(this.ws, arguments);
        return this;
      },
      /**
       * 为本角色生成并注册ID，如果本角色的ID已经存在就重新生成；如果是在(联机|播放录播)的情况下，该函数不做操作
       * @returns {!GameCores.GameObjects.Player} this self
       */
      getId: function () {
        if (_status.video || _status.connectMode) return this;
        if (this.playerid) {
          delete game.playerMap[this.playerid];
        }
        this.playerid = get.id();
        game.playerMap[this.playerid] = this;
        return this;
      },
      /**
       * 向其他角色发送互动表情[support online]
       * @param {!GameCores.GameObjects.Player} 互动的对象
       * @param {!string} emotion 表情
       */
      throwEmotion: function (target, emotion) {
        game.broadcastAll(function (player, target, emotion) {
          player.$throwEmotion(target, emotion);
        }, this, target, emotion);
      },
      /**
       * 本角色发送聊天表情
       * @param {string} emotionPack 表情包
       * @param {number} emotionID 表情ID
       */
      emotion: function (pack, id) {
        var str = '<img src="##assetURL##image/emotion/' + pack + '/' + id + '.gif" width="50" height="50">';
        lib.element.player.say.call(this, str);
        game.broadcast(function (id, str) {
          if (lib.playerOL[id]) {
            lib.playerOL[id].say(str);
          }
          else if (game.connectPlayers) {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == id) {
                lib.element.player.say.call(game.connectPlayers[i], str);
                return;
              }
            }
          }
        }, this.playerid, str);
      },
      /**
       * 本角色发送聊天消息[support online]
       * @param {!string} str 聊天消息
       */
      chat: function (str, forced) {
        if (!forced && get.is.banWords(str)) return;
        lib.element.player.say.call(this, str);
        game.broadcast(function (id, str) {
          if (lib.playerOL[id]) {
            lib.playerOL[id].say(str);
          }
          else if (game.connectPlayers) {
            for (var i = 0; i < game.connectPlayers.length; i++) {
              if (game.connectPlayers[i].playerid == id) {
                lib.element.player.say.call(game.connectPlayers[i], str);
                return;
              }
            }
          }
        }, this.playerid, str);
      },
      /**
       * 本角色发送聊天消息(单机)
       * @param {!string} str 聊天消息
       */
      say: function (str) {
        str = str.replace(/##assetURL##/g, lib.assetURL);
        var dialog = ui.create.dialog('hidden');
        dialog.classList.add('static');
        dialog.add('<div class="text" style="word-break:break-all;display:inline">' + str + '</div>');
        dialog.classList.add('popped');
        ui.window.appendChild(dialog);
        var width = dialog.content.firstChild.firstChild.offsetWidth;
        if (width < 190) {
          dialog._mod_height = -16;
        }
        else {
          dialog.content.firstChild.style.textAlign = 'left';
        }
        dialog.style.width = (width + 16) + 'px';
        var refnode;
        if (this.node && this.node.avatar && this.parentNode == ui.arena) {
          refnode = this.node.avatar;
        }
        if (refnode) {
          lib.placePoppedDialog(dialog, {
            clientX: (ui.arena.offsetLeft + this.getLeft() + refnode.offsetLeft + refnode.offsetWidth / 2) * game.documentZoom,
            clientY: (ui.arena.offsetTop + this.getTop() + refnode.offsetTop + refnode.offsetHeight / 4) * game.documentZoom
          });
        }
        else {
          lib.placePoppedDialog(dialog, {
            clientX: (this.getLeft() + this.offsetWidth / 2) * game.documentZoom,
            clientY: (this.getTop() + this.offsetHeight / 4) * game.documentZoom
          });
        }
        if (dialog._mod_height) {
          dialog.content.firstChild.style.padding = 0;
        }
        setTimeout(function () {
          dialog.delete();
        }, lib.quickVoice.indexOf(str) != -1 ? 3800 : 2000);
        var name = get.translation(this.name);
        var info = [name ? (name + '[' + this.nickname + ']') : this.nickname, str];
        lib.chatHistory.push(info);
        if (_status.addChatEntry) {
          if (_status.addChatEntry._origin.parentNode) {
            _status.addChatEntry(info, false);
          }
          else {
            delete _status.addChatEntry;
          }
        }
        if (lib.config.background_speak && lib.quickVoice.indexOf(str) != -1) {
          game.playAudio('voice', (this.sex == 'female' ? 'female' : 'male'), lib.quickVoice.indexOf(str));
        }
      },
      /**
       * 显示投降按钮
       */
      showGiveup: function () {
        this._giveUp = true;
        if (this == game.me) {
          ui.create.giveup();
        }
        else if (this.isOnline2()) {
          this.send(ui.create.giveup);
        }
      },
      /**
       * 同步技能信息[support online]
       * @param {Object} skills 要同步的技能信息
       * @param {?Array<string>} skills.global 全局技能的信息
       * @param {?Object} skills.skillinfo 技能模板信息
       * @param {?Object} skills.stat 本角色的技能状态信息
       * @param {?Object} skills."['playerid']" 角色的技能信息
       */
      applySkills: function (skills) {
        for (var i in skills) {
          if (i == 'global') {
            lib.skill.global = skills[i];
          }
          else if (i == 'skillinfo') {
            for (var j in skills[i]) {
              if (!lib.skill[j]) {
                lib.skill[j] = {};
              }
              lib.skill[j].chooseButton = skills[i][j];
            }
          }
          else if (i == 'stat') {
            this.stat = [skills.stat];
          }
          else if (lib.playerOL[i]) {
            for (var j in skills[i]) {
              lib.playerOL[i][j] = skills[i][j];
            }
          }
        }
      },
      /**
       * 返回本角色状态信息
       * @returns {GameCores.GameObjects.Player~State}
       */
      getState: function () {
        /**
         * @name GameCores.GameObjects.Player~State
         * @property {number} hp 当前血量
         * @property {number} maxHp 最大血量
         * @property {string} nickname 玩家昵称
         * @property {string} sex 角色性别
         * @property {string} group 角色势力
         * @property {string} name 角色姓名
         * @property {string} name1 角色(主将)姓名
         * @property {string} name2 角色(副将)姓名
         * @property {Array<GameCores.GameObjects.Card>} handcards 角色手牌
         * @property {Array<string>} gaintag gaintag标签数组
         * @property {Array<GameCores.GameObjects.Card>} equips 角色装备区的牌
         * @property {Array<GameCores.GameObjects.Card>} judges 角色判定区的牌
         * @property {Array<GameCores.GameObjects.Card>} specials 角色武将牌上的牌
         * @property {Array<string>} disableJudge 对角色无效的判定数组
         * @property {Array<(string|number)>} disableEquip 角色废除的装备(类型)数组
         * @property {Array<(string|undefined)>} views 角色判定区牌的视为名数组，即使判定牌的视为名为空也会添加到该数组中，`views`与`judges`一一对应
         * @property {number} position 角色位置(座次)
         * @property {number} hujia 角色护甲
         * @property {(boolean|undefined)} side 角色所属的一侧，如果`p1.side == p2.side`则认为p1与p2为同侧(友方)，否则为异侧(敌方)；该值仅在部分模式(vs等)中使用，在其他模式中默认为undefined
         * @property {boolean} identityShown 是否显示身份
         * @property {Array} identityNode [this.node.identity.innerHTML, this.node.identity.dataset.color] 
         * @property {string} identity 角色身份
         * @property {boolean} dead 角色是否已死亡
         * @property {boolean} linked 角色是否被链接
         * @property {boolean} turnedover 角色是否翻面
         * @property {number} phaseNumber 此时的回合计数
         * @property {boolean} unseen
         * @property {boolean} unseen2 
         * @property {string} mode 当前的模式
         */
        var state = {
          hp: this.hp,
          maxHp: this.maxHp,
          nickname: this.nickname,
          sex: this.sex,
          group: this.group,
          name: this.name,
          name1: this.name1,
          name2: this.name2,
          handcards: this.getCards('hs'),
          gaintag: [],
          equips: this.getCards('e'),
          judges: this.getCards('j'),
          specials: this.getCards('s'),
          expansions: this.getCards('x'),
          expansion_gaintag: [],
          disableJudge: this.storage._disableJudge,
          disableEquip: this.storage.disableEquip,
          views: [],
          position: parseInt(this.dataset.position),
          hujia: this.hujia,
          side: this.side,
          identityShown: this.identityShown,
          identityNode: [this.node.identity.innerHTML, this.node.identity.dataset.color],
          identity: this.identity,
          dead: this.isDead(),
          linked: this.isLinked(),
          turnedover: this.isTurnedOver(),
          phaseNumber: this.phaseNumber,
          unseen: this.isUnseen(0),
          unseen2: this.isUnseen(1),
        }
        for (var i = 0; i < state.judges.length; i++) {
          state.views[i] = state.judges[i].viewAs;
        }
        for (var i = 0; i < state.handcards.length; i++) {
          state.gaintag[i] = state.handcards[i].gaintag;
        }
        for (var i = 0; i < state.expansions.length; i++) {
          state.expansion_gaintag[i] = state.expansions[i].gaintag;
        }
        if (this.getModeState) {
          state.mode = this.getModeState();
        }
        return state;
      },
      /**
       * 设置玩家昵称
       * @param {string} [str] 玩家昵称，如果未指定或为空字符串，使用`this.nickname`。如果`this.nickname`的值也未指定，使用空字符串
       * @returns {GameCores.GameObjects.Player} this self
       */
      setNickname: function (str) {
        this.node.nameol.innerHTML = (str || this.nickname || '').slice(0, 12);
        return this;
      },
      /**
       * 设置头像[support online]
       * @param {!string} name 武将名，如果是角色副将，则设置副将的头像；如果是主将，则设置主将的头像
       * @param {!string} name2 新图片名(角色名)，用于设置背景；{@link HTMLDivElement#setBackground}
       * @param {?boolean} [video] 如果为true或未指定，添加动画；如果为false，不添加动画
       * @param {?boolean} [fakeme] 如果为true或未指定，设置{@link ui.fakeme}的背景图为头像图；如果为false，不设置
       */
      setAvatar: function (name, name2, video, fakeme) {
        var node;
        if (this.name2 == name) {
          node = this.node.avatar2;
          this.smoothAvatar(true, video);
        }
        else if (this.name == name) {
          node = this.node.avatar;
          this.smoothAvatar(false, video);
        }
        if (node) {
          node.setBackground(name2, 'character');
          if (this == game.me && ui.fakeme && fakeme !== false) {
            ui.fakeme.style.backgroundImage = node.style.backgroundImage;
          }
          if (video != false) {
            game.addVideo('setAvatar', this, [name, name2]);
          }
        }
        game.broadcast(function (player, name, name2) {
          player.setAvatar(name, name2, false);
        }, this, name, name2);
      },
      /**
       * 设置头像更新数组，每张头像更新后停留1s，全部更新完成后，还原头像
       * @param {!string} name 武将名，如果是角色副将，则设置副将的头像；如果是主将，则设置主将的头像
       * @param {Array<string>} list 头像名(角色名)数组
       * @see {@link lib.element.player.setAvatar}
       */
      setAvatarQueue: function (name, list) {
        var node;
        var player = this;
        if (player.name2 == name) {
          node = player.node.avatar2;
        }
        else {
          node = player.node.avatar;
        }
        if (node._avatarqueue) {
          for (var i = 0; i < list.length; i++) {
            node._avatarqueue.push(list[i]);
          }
        }
        else {
          var func = function () {
            if (node._avatarqueue.length) {
              player.setAvatar(name, node._avatarqueue.shift(), false, false);
            }
            else {
              clearInterval(node._avatarqueueinterval);
              delete node._avatarqueue;
              delete node._avatarqueueinterval;
              player.setAvatar(name, name, false, false);
            }
          };
          node._avatarqueue = list.slice(0);
          node._avatarqueueinterval = setInterval(func, 1000);
          func();
        }
        game.addVideo('setAvatarQueue', this, [name, list]);
      },
      /**
       * 本角色闪烁头像
       * @param {!string} skill 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
       * @param {!string} name (角色|技能)名，如果是角色名，闪烁此角色的头像；如果是技能名，使用此技能所属角色的角色名
       */
      flashAvatar: function (skill, name) {
        if (lib.skill[name] && !lib.character[name]) {
          var stop = false;
          var list = lib.config.all.characters.slice(0);
          for (var i in lib.characterPack) {
            list.add(i);
          }
          for (var i = 0; i < list.length; i++) {
            for (var j in lib.characterPack[list[i]]) {
              if (lib.characterPack[list[i]][j][3].contains(name)) {
                name = j;
                stop = true;
                break;
              }
            }
            if (stop) {
              break;
            }
          }
        }
        if (lib.character[this.name2] && lib.character[this.name2][3].contains(skill)) {
          this.setAvatarQueue(this.name2, [name]);
        }
        else {
          this.setAvatarQueue(this.name, [name]);
        }
      },
      /**
       * 本角色头像下绘制图像
       * @param {!string} buff 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
       * @param {!string} skill 技能名，如果技能属于角色副将，则设置副将的头像，否则设置主将的头像
       * @param {!string} name (角色|技能)名，如果是角色名，闪烁此角色的头像；如果是技能名，使用此技能所属角色的角色名
       */
      // buffAvatar: function (buff, skill, name) {
      //   if (lib.skill[name] && !lib.character[name]) {
      //     var stop = false;
      //     var list = lib.config.all.characters.slice(0);
      //     for (var i in lib.characterPack) {
      //       list.add(i);
      //     }
      //     for (var i = 0; i < list.length; i++) {
      //       for (var j in lib.characterPack[list[i]]) {
      //         if (lib.characterPack[list[i]][j][3].contains(name)) {
      //           name = j;
      //           stop = true;
      //           break;
      //         }
      //       }
      //       if (stop) {
      //         break;
      //       }
      //     }
      //   }
      //   if (lib.character[this.name2] && lib.character[this.name2][3].contains(skill)) {
      //     this.setAvatarQueue(this.name2, [name]);
      //   }
      //   else {
      //     this.setAvatarQueue(this.name, [name]);
      //   }
      // },
      /**
       * 同步本角色数据(联网)
       * @returns {?GameCores.GameObjects.Player} this self；如果是回放模式且该函数被无参调用，返回空值(undefined)
       */
      update: function () {
        if (_status.video && arguments.length == 0) return;
        if (this.hp >= this.maxHp) this.hp = this.maxHp;
        var hp = this.node.hp;
        hp.style.transition = 'none';
        game.broadcast(function (player, hp, maxHp, hujia) {
          player.hp = hp;
          player.maxHp = maxHp;
          player.hujia = hujia;
          if (player.storage) player.$ = player.storage;
          player.update();
        }, this, this.hp, this.maxHp, this.hujia);
        if (!_status.video) {
          if (this.hujia) {
            this.markSkill('ghujia');
          }
          else {
            this.unmarkSkill('ghujia');
          }
        }
        if (!this.storage.nohp) {
          var libHp = lib.character[(this.name && this.name.indexOf('unknown') == 0) ? this.name1 : this.name];
          if (this.maxHp == Infinity) {
            hp.innerHTML = '∞';
          }
          else if ((libHp && libHp[2] && get.infoHp(libHp[2]) < 0)
            || (this.hp < 0 && !this.isDying())) {
            hp.innerHTML = this.hp + '/' + this.maxHp;
            hp.classList.add('text');
          }
          else if (game.layout == 'default' && this.maxHp > 14) {
            hp.innerHTML = this.hp + '/' + this.maxHp;
            hp.classList.add('text');
          }
          else if (get.is.newLayout() &&
            (
              this.maxHp > 9 ||
              (this.maxHp > 5 && this.classList.contains('minskin')) ||
              ((game.layout == 'mobile' || game.layout == 'long') && this.dataset.position == 0 && this.maxHp > 7)
            )) {
            hp.innerHTML = this.hp + '<br>/<br>' + this.maxHp + '<div></div>';
            if (this.hp == 0) {
              hp.lastChild.classList.add('lost');
            }
            hp.classList.add('textstyle');
            // hp.classList.remove('long');
          }
          else {
            hp.innerHTML = '';
            hp.classList.remove('text');
            hp.classList.remove('textstyle');
            while (this.maxHp > hp.childNodes.length) {
              ui.create.div(hp);
            }
            while (Math.max(0, this.maxHp) < hp.childNodes.length) {
              hp.removeChild(hp.lastChild);
            }
            for (var i = 0; i < this.maxHp; i++) {
              var index = i;
              if (get.is.newLayout()) {
                index = this.maxHp - i - 1;
              }
              if (i < this.hp) {
                hp.childNodes[index].classList.remove('lost');
              }
              else {
                hp.childNodes[index].classList.add('lost');
              }
            }
            // if(this.maxHp==9){
            //     hp.classList.add('long');
            // }
            // else{
            //     hp.classList.remove('long');
            // }
          }
          if (hp.classList.contains('room')) {
            hp.dataset.condition = 'high';
          }
          else if (this.hp == 0) {
            hp.dataset.condition = '';
          }
          else if (this.hp > Math.round(this.maxHp / 2) || this.hp === this.maxHp) {
            hp.dataset.condition = 'high';
          }
          else if (this.hp > Math.floor(this.maxHp / 3)) {
            hp.dataset.condition = 'mid';
          }
          else {
            hp.dataset.condition = 'low';
          }

          setTimeout(function () {
            hp.style.transition = '';
          });
        }
        var numh = this.countCards('h');
        if (_status.video) {
          numh = arguments[0];
        }
        if (numh >= 10) {
          numh = numh.toString();
          this.node.count.dataset.condition = 'low';
          this.node.count.innerHTML = numh[0] + '<br>' + numh[1];
        }
        else {
          if (numh > 5) {
            this.node.count.dataset.condition = 'higher';
          }
          else if (numh > 2) {
            this.node.count.dataset.condition = 'high';
          }
          else if (numh > 0) {
            this.node.count.dataset.condition = 'mid';
          }
          else {
            this.node.count.dataset.condition = 'none';
          }
          this.node.count.innerHTML = numh;
        }
        if (this.updates) {
          for (var i = 0; i < lib.element.player.updates.length; i++) {
            lib.element.player.updates[i](this);
          }
        }
        if (!_status.video) {
          game.addVideo('update', this, [this.countCards('h'), this.hp, this.maxHp, this.hujia]);
        }
        function checkEnglish(name) {
          let nameLength = name.querySelectorAll('br').length
          if (nameLength === 0 && /^[A-z\d\.\s]+$/.test(name.innerHTML)) {
            name.classList.add('English');
          }
          else if (nameLength >= 1 && name.classList.contains('English')) {
            name.classList.remove('English');
          }
        }
        if (this.node.name) {
          checkEnglish(this.node.name)
        }
        if (this.node.name2) {
          checkEnglish(this.node.name2)
        }
        this.updateMarks();
        return this;
      },
      /**
       * 本角色的一个技能标记移除指定数量，如果这个技能当前(没有标记|标记数为0)，返回`undefined`；
       * 此函数仅支持数值类型的标记，如果是非数值类型的标记，不做任何移除操作，返回`undefined`；
       * 数值类型仅支持整数
       * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
       * @param {?number} [num] 正整数，标记要移除的数量；如果值为0或未指定，则使用数量 **1** 作为要移除的数量
       * @param {?boolean} [log] 是否输出日志，如果为true或未指定，输出日志；如果为false，不输出日志
       */
      removeMark: function (i, num, log) {
        if (typeof num != 'number' || !num) num = 1;
        if (typeof this.storage[i] != 'number' || !this.storage[i]) return;
        if (num > this.storage[i]) num = this.storage[i];
        this.storage[i] -= num;
        if (log !== false) {
          var str = false;
          var info = get.info(i);
          if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
          else str = lib.translate[i];
          if (str) game.log(this, '移去了', get.cnNumber(num), '个', '#g【' + str + '】');
        }
        this.syncStorage(i);
        this[this.storage[i] ? 'markSkill' : 'unmarkSkill'](i);
      },
      /**
       * 本角色的一个技能标记添加指定数量；
       * 此函数支持任意类型的标记，但不建议使用非数值类型的标记，因为对非数值类型的标记，会首先使用 0 值覆盖原值；
       * 数值类型不支持浮点数
       * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
       * @param {?number} [num] 正整数，标记要添加的数量；如果值为0或未指定，则使用数量 **1** 作为要添加的数量
       * @param {?boolean} [log] 是否输出日志，如果为true或未指定，输出日志；如果为false，不输出日志
       */
      addMark: function (i, num, log) {
        if (typeof num != 'number' || !num) num = 1;
        if (typeof this.storage[i] != 'number') this.storage[i] = 0;
        this.storage[i] += num;
        if (log !== false) {
          var str = false;
          var info = get.info(i);
          if (info && info.intro && (info.intro.name || info.intro.name2)) str = info.intro.name2 || info.intro.name;
          else str = lib.translate[i];
          if (str) game.log(this, '获得了', get.cnNumber(num), '个', '#g【' + str + '】');
        }
        this.syncStorage(i);
        this.markSkill(i);
      },
      /**
       * 返回本角色一个技能的标记数
       * @param {?string} [i] 技能名，如果是数值型标记，返回此技能的标记数；如果是数组型标记，返回数组的长度值；否则，返回0值
       * @returns {!number}
       */
      countMark: function (i) {
        if (this.storage[i] == undefined) return 0;
        if (typeof this.storage[i] == 'number') return this.storage[i];
        if (Array.isArray(this.storage[i])) return this.storage[i].length;
        return 0;
      },
      /**
       * 返回此角色是否有一个技能的标记
       * 此函数仅支持数值型标记，对于非数值型标记，此函数总返回false
       * @param {!string} i 技能名，此函数会调用`this.storage[i]`获取该技能的标记数量
       * @returns {!boolean}
       */
      hasMark: function (i) {
        return this.countMark(i) > 0;
      },
      /**
       * 同步本角色一个技能标记的显示数值，如果是非数值类型的标记，不做同步操作，返回`this`
       * @param {!string} i 技能名
       * @param {?boolean} [storage] 是否同步标记数据，如果为true，同步标记(联网)；如果为false或未指定，不同步
       */
      updateMark: function (i, storage) {
        if (!this.marks[i]) {
          if (lib.skill[i] && lib.skill[i].intro && (this.storage[i] || lib.skill[i].intro.markcount)) {
            this.markSkill(i);
            if (!this.marks[i]) return this;
          }
          else {
            return this;
          }
        }
        if (storage && this.storage[i]) {
          this.syncStorage(i);
        }
        if (i == 'ghujia' || ((!this.marks[i].querySelector('.image') || this.storage[i + '_markcount']) &&
          lib.skill[i] && lib.skill[i].intro && !lib.skill[i].intro.nocount &&
          (this.storage[i] || this.storage[i + '_markcount'] || lib.skill[i].intro.markcount))) {
          this.marks[i].classList.add('overflowmark')
          var num = 0;
          if (typeof lib.skill[i].intro.markcount == 'function') {
            num = lib.skill[i].intro.markcount(this.storage[i], this);
          }
          else if (lib.skill[i].intro.markcount == 'expansion') {
            num = this.countCards('x', (card) => card.hasGaintag(i));
          }
          else if (typeof this.storage[i + '_markcount'] == 'number') {
            num = this.storage[i + '_markcount'];
          }
          else if (i == 'ghujia') {
            num = this.hujia;
          }
          else if (typeof this.storage[i] == 'number') {
            num = this.storage[i];
          }
          else if (Array.isArray(this.storage[i])) {
            num = this.storage[i].length;
          }
          if (num) {
            if (!this.marks[i].markcount) {
              this.marks[i].markcount = ui.create.div('.markcount.menubutton', this.marks[i]);
            }
            this.marks[i].markcount.innerHTML = num;
          }
          else if (this.marks[i].markcount) {
            this.marks[i].markcount.delete();
            delete this.marks[i].markcount;
          }
        }
        else {
          if (this.marks[i].markcount) {
            this.marks[i].markcount.delete();
            delete this.marks[i].markcount;
          }
          if (lib.skill[i].mark == 'auto') {
            this.unmarkSkill(i);
          }
        }
        return this;
      },
      /**
       * 更新本角色全部数值型技能标记信息，不处理非数值标记
       * @param {?string} [skillname] 技能名，同步本角色的一个技能标记数据然后同步更新(联网)；如果未指定，则不进行同步，仅在本机更新
       */
      updateMarks: function (connect) {
        if (typeof connect == 'string' && _status.connectMode && !game.online) {
          game.broadcast(function (player, storage, skill) {
            player.$[skill] = storage;
            player.updateMarks();
          }, this, this.$[connect], connect);
        }
        for (var i in this.marks) {
          this.updateMark(i);
        }
      },
      num: function (arg1, arg2, arg3) {
        if (get.itemtype(arg1) == 'position') {
          return this.get(arg1, arg2, arg3).length;
        }
        else if (arg1 == 's') {
          if (typeof arg2 == 'boolean') {
            return game.expandSkills(this.getSkills(arg2).concat(lib.skill.global)).contains(arg3);
          }
          else {
            return game.expandSkills(this.getSkills().concat(lib.skill.global)).contains(arg2);
          }
        }
      },
      line: function (target, config) {
        if (get.itemtype(target) == 'players') {
          for (var i = 0; i < target.length; i++) {
            this.line(target[i], config);
          }
        }
        else if (get.itemtype(target) == 'player') {
          if (target == this) return;
          game.broadcast(function (player, target, config) {
            player.line(target, config);
          }, this, target, config);
          game.addVideo('line', this, [target.dataset.position, config]);
          game.linexy([
            this.getLeft() + this.offsetWidth / 2,
            this.getTop() + this.offsetHeight / 2,
            target.getLeft() + target.offsetWidth / 2,
            target.getTop() + target.offsetHeight / 2
          ], config, true);
        }
      },
      line2: function (targets, config) {
        this.line(targets[0], config);
        targets = targets.slice(0);
        for (var i = 1; i < targets.length; i++) {
          (function (j) {
            setTimeout(function () {
              targets[j - 1].line(targets[j], config);
            }, lib.config.duration * i);
          }(i));
        }
      },
      getNext: function () {
        if (this.hasSkill('undist')) return null;
        var target = this;
        for (var i = 0; i < game.players.length - 1; i++) {
          target = target.next;
          if (!target.hasSkill('undist')) {
            return target;
          }
        }
        return null;
      },
      getPrevious: function () {
        if (this.hasSkill('undist')) return null;
        var target = this;
        for (var i = 0; i < game.players.length - 1; i++) {
          target = target.previous;
          if (!target.hasSkill('undist')) {
            return target;
          }
        }
        return null;
      },
      countUsed: function (card, type) {
        if (type === true) {
          var num = 0;
          var history = this.getHistory('useCard');
          for (var i = 0; i < history.length; i++) {
            if (!card) num++;
            else if (typeof card == 'string' && history[i].card && card == history[i].card.name) num++;
            else if (typeof card == 'object' && history[i].card && card.name == history[i].card.name) num++;
          }
          return num;
        }
        var num;
        var stat = this.getStat('card');
        if (!card) {
          num = 0;
          for (var i in stat) {
            if (typeof stat[i] == 'number') {
              num += stat[i];
            }
          }
          return num;
        }
        if (typeof card == 'object') {
          card = card.name;
        }
        num = stat[card];
        if (typeof num != 'number') return 0;
        return num;
      },
      countSkill: function (skill) {
        var num = this.getStat('skill')[skill];
        if (num == undefined) return 0;
        return num;
      },
      getStockSkills: function (unowned, unique, hidden) {
        var list = [];
        if (lib.character[this.name] && (hidden || !this.isUnseen(0))) {
          list.addArray(lib.character[this.name][3]);
        }
        if (lib.character[this.name1] && (hidden || !this.isUnseen(0))) {
          list.addArray(lib.character[this.name1][3]);
        }
        if (lib.character[this.name2] && (hidden || !this.isUnseen(1))) {
          list.addArray(lib.character[this.name2][3]);
        }
        if (!unowned) {
          for (var i = 0; i < list.length; i++) {
            if (!this.hasSkill(list[i])) {
              list.splice(i--, 1);
            }
          }
        }
        if (!unique) {
          for (var i = 0; i < list.length; i++) {
            var info = lib.skill[list[i]];
            if (!info || info.unique || info.temp || info.sub || info.charlotte) {
              list.splice(i--, 1);
            }
          }
        }
        return list;
      },
      /**
       * 返回本角色(手牌|装备区|判定区|武将牌上)或任意位置组合的游戏牌
       * @function lib.element.player.getCards
       * @param {string} [position='h'] 游戏牌位置组合: [hesj]+
       * @returns {!Array<GameCores.GameObjects.Card>}
       */
      /**
       * 返回本角色所有牌中等于指定名称或手牌轴被视为指定名称的游戏牌
       * @function lib.element.player.getCards
       * @variation 2
       * @param {string} [position='h'] 游戏牌位置: [hesj]+
       * @param {!string} [name] 游戏牌名，返回所有名称等于该牌名，或者手牌中被视为此牌名的牌
       * @returns {!Array<GameCores.GameObjects.Card>}
       */
      /**
       * 返回本角色所有牌中满足特定条件的游戏牌
       * @function lib.element.player.getCards
       * @variation 3
       * @param {string} [position='h'] 游戏牌位置: [hesj]+
       * @param {?Object} [cond] 条件对象，每个属性对应一个匹配条件(游戏牌对象必须有该属性，否则该条件会被跳过，不会生效)，只要有一次匹配失败就将牌从结果数组中移除；如果未指定则跳过匹配过程
       * @param {...(Array<(Object|string)>|string)} cond.'[keyname]' 匹配条件，如果`cond[keyname] == card[keyname] || cond[keyname].contains(card[keyname])`成立，则匹配成功
       * @returns {!Array<GameCores.GameObjects.Card>}
       */
      /**
       * getCards筛选函数
       * @callback lib.element.player.getCards~filterCard
       * @param {!GameCores.GameObjects.Card} card 游戏牌对象
       * @returns {?boolean} true表示保留此游戏牌，false或未指定表示不保留
       * @see {@link lib.element.player.getCards(4)}
       */
      /**
       * 返回本角色所有牌中通过筛选函数的游戏牌
       * @function lib.element.player.getCards
       * @variation 4
       * @param {string} [position='h'] 游戏牌位置: [hesj]+
       * @param {?lib.element.player.getCards~filterCard} [filter] 筛选函数，如果未指定则跳过筛选过程
       * @returns {!Array<GameCores.GameObjects.Card>}
       */
      getCards: function (arg1, arg2) {
        if (typeof arg1 != 'string') {
          arg1 = 'h';
        }
        var cards = [], cards1 = [];
        var i, j;
        for (i = 0; i < arg1.length; i++) {
          if (arg1[i] == 'h') {
            for (j = 0; j < this.node.handcards1.childElementCount; j++) {
              if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
                cards.push(this.node.handcards1.childNodes[j]);
              }
            }
            for (j = 0; j < this.node.handcards2.childElementCount; j++) {
              if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
                cards.push(this.node.handcards2.childNodes[j]);
              }
            }
          }
          else if (arg1[i] == 's') {
            for (j = 0; j < this.node.handcards1.childElementCount; j++) {
              if (!this.node.handcards1.childNodes[j].classList.contains('removing') && this.node.handcards1.childNodes[j].classList.contains('glows')) {
                cards.push(this.node.handcards1.childNodes[j]);
              }
            }
            for (j = 0; j < this.node.handcards2.childElementCount; j++) {
              if (!this.node.handcards2.childNodes[j].classList.contains('removing') && this.node.handcards2.childNodes[j].classList.contains('glows')) {
                cards.push(this.node.handcards2.childNodes[j]);
              }
            }
          }
          else if (arg1[i] == 'e') {
            for (j = 0; j < this.node.equips.childElementCount; j++) {
              if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
                cards.push(this.node.equips.childNodes[j]);
              }
            }
          }
          else if (arg1[i] == 'j') {
            for (j = 0; j < this.node.judges.childElementCount; j++) {
              if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
                cards.push(this.node.judges.childNodes[j]);
                if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
                  this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
                  this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
                  cards1.push(this.node.judges.childNodes[j]);
                }
              }
            }
          }
          else if (arg1[i] == 'x') {
            for (j = 0; j < this.node.expansions.childElementCount; j++) {
              if (!this.node.expansions.childNodes[j].classList.contains('removing')) {
                cards.push(this.node.expansions.childNodes[j]);
              }
            }
          }
        }
        if (arguments.length == 1) {
          return cards;
        }
        if (arg2) {
          for (i = 0; i < cards.length; i++) {
            if (!get.is.filterCardBy(cards[i], arg2)) {
              cards.splice(i--, 1);
            }
          }
        }
        for (i = 0; i < cards1.length; i++) {
          if (cards1[i].tempJudge) {
            cards1[i].name = cards1[i].tempJudge;
            delete cards1[i].tempJudge;
          }
        }
        return cards;
      },
      getDiscardableCards: function (player, arg1, arg2) {
        var cards = this.getCards(arg1, arg2);
        for (var i = 0; i < cards.length; i++) {
          if (!lib.filter.canBeDiscarded(cards[i], player, this)) {
            cards.splice(i--, 1);
          }
        }
        return cards;
      },
      getGainableCards: function (player, arg1, arg2) {
        var cards = this.getCards(arg1, arg2);
        for (var i = 0; i < cards.length; i++) {
          if (!lib.filter.canBeGained(cards[i], player, this)) {
            cards.splice(i--, 1);
          }
        }
        return cards;
      },
      getGainableSkills: function (func) {
        var list = [];
        var names = [this.name, this.name1, this.name2];
        for (var i = 0; i < names.length; i++) {
          list.addArray(get.gainableSkillsName(names[i], func));
        }
        return list;
      },
      countCards: function (arg1, arg2) {
        return this.getCards(arg1, arg2).length;
      },
      countDiscardableCards: function (player, arg1, arg2) {
        return this.getDiscardableCards(player, arg1, arg2).length;
      },
      countGainableCards: function (player, arg1, arg2) {
        return this.getGainableCards(player, arg1, arg2).length;
      },
      getOriginalSkills: function () {
        var skills = [];
        if (lib.character[this.name] && !this.isUnseen(0)) {
          skills.addArray(lib.character[this.name][3]);
        }
        if (this.name2 && lib.character[this.name2] && !this.isUnseen(1)) {
          skills.addArray(lib.character[this.name2][3]);
        }
        return skills;
      },
      /**
       * 返回本角色的技能组；
       * 该技能组不包括子技能；
       * @param {!string} skill 技能名
       * @param {*} arg2 为真时表示计入隐藏的技能、为'e'时表示仅返回装备技能
       * @param {*} arg3 为false时表示不计入装备技能
       * @param {*} arg4 为false时表示计入失效的技能
       * @returns {!Array<string>}
       */
      getSkills: function (arg2, arg3, arg4) {
        var skills = this.skills.slice(0);
        var es = [];
        var i, j;
        if (arg3 !== false) {
          for (i = 0; i < this.node.equips.childElementCount; i++) {
            if (!this.node.equips.childNodes[i].classList.contains('removing')) {
              var equipskills = get.info(this.node.equips.childNodes[i], false).skills;
              if (equipskills) {
                es.addArray(equipskills);
              }
            }
          }
          if (arg2 == 'e') {
            return es;
          }
        }
        for (var i in this.additionalSkills) {
          if (Array.isArray(this.additionalSkills[i]) && (arg2 || i.indexOf('hidden:') !== 0)) {
            for (j = 0; j < this.additionalSkills[i].length; j++) {
              if (this.additionalSkills[i][j]) {
                skills.add(this.additionalSkills[i][j]);
              }
            }
          }
          else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
            skills.add(this.additionalSkills[i]);
          }
        }
        for (var i in this.tempSkills) {
          skills.add(i);
        }
        if (arg2) skills.addArray(this.hiddenSkills);
        if (arg3 !== false) skills.addArray(es);
        for (var i in this.forbiddenSkills) {
          skills.remove(i);
        }
        if (arg4 !== false) {
          skills = game.filterSkills(skills, this, es);
        }
        return skills;
      },
      /**
       * 角色的游戏牌区域(手牌|装备区|判定区)组合
       * Regex: [hej]|he|hj|ej|hej
       * @typedef {string} GameCores.PlayerCardPosition
       * @see {@link GameCores.CardPosition}
       */
      /**
       * 返回本角色(武将牌上|手牌|装备区|判定区)的游戏牌 TODO
       * @param {('s'|GameCores.PlayerCardPosition)} position 角色的游戏牌区域或者角色的武将牌上区域
       * @param {*} arg2
       * @param {*} arg3
       * @param {*} arg4
       * @returns {Array<GameCores.GameObjects.Card>}
       * @see {@link GameCores.PlayerCardPosition}
       * @example
       * let cards = player.get('he')//手牌和装备区所有未被移除、废除、的牌
       * 
       * 
       */
      get: function (arg1, arg2, arg3, arg4) {
        var i, j;
        if (arg1 == 's') {
          var skills = this.skills.slice(0);
          var es = [];
          if (arg3 !== false) {
            for (i = 0; i < this.node.equips.childElementCount; i++) {
              if (!this.node.equips.childNodes[i].classList.contains('removing') && !this.node.equips.childNodes[i].classList.contains('feichu')) {
                var equipskills = get.info(this.node.equips.childNodes[i]).skills;
                if (equipskills) {
                  es.addArray(equipskills);
                }
              }
            }
            if (arg2 == 'e') {
              return es;
            }
          }
          for (var i in this.additionalSkills) {
            if (Array.isArray(this.additionalSkills[i])) {
              for (j = 0; j < this.additionalSkills[i].length; j++) {
                if (this.additionalSkills[i][j]) {
                  skills.add(this.additionalSkills[i][j]);
                }
              }
            }
            else if (this.additionalSkills[i] && typeof this.additionalSkills[i] == 'string') {
              skills.add(this.additionalSkills[i]);
            }
          }
          for (var i in this.tempSkills) {
            skills.add(i);
          }
          if (arg2) skills.addArray(this.hiddenSkills);
          if (arg3 !== false) skills.addArray(es);
          for (var i in this.forbiddenSkills) {
            skills.remove(i);
          }
          if (arg4 !== false) {
            skills = game.filterSkills(skills, this, es);
          }
          return skills;
        }
        else if (get.is.pos(arg1)) {
          var cards = [], cards1 = [];
          for (i = 0; i < arg1.length; i++) {
            if (arg1[i] == 'h') {
              for (j = 0; j < this.node.handcards1.childElementCount; j++) {
                if (!this.node.handcards1.childNodes[j].classList.contains('removing') && !this.node.handcards1.childNodes[j].classList.contains('feichu') && !this.node.handcards1.childNodes[j].classList.contains('glows')) {
                  cards.push(this.node.handcards1.childNodes[j]);
                }
              }
              for (j = 0; j < this.node.handcards2.childElementCount; j++) {
                if (!this.node.handcards2.childNodes[j].classList.contains('removing') && !this.node.handcards2.childNodes[j].classList.contains('feichu') && !this.node.handcards2.childNodes[j].classList.contains('glows')) {
                  cards.push(this.node.handcards2.childNodes[j]);
                }
              }
            }
            else if (arg1[i] == 'e') {
              for (j = 0; j < this.node.equips.childElementCount; j++) {
                if (!this.node.equips.childNodes[j].classList.contains('removing') && !this.node.equips.childNodes[j].classList.contains('feichu')) {
                  cards.push(this.node.equips.childNodes[j]);
                }
              }
              if (arguments.length == 2 && typeof arg2 == 'string' && /1|2|3|4|5/.test(arg2)) {
                for (j = 0; j < cards.length; j++) {
                  if (get.subtype(cards[j]) == 'equip' + arg2) return cards[j];
                }
                return;
              }
            }
            else if (arg1[i] == 'j') {
              for (j = 0; j < this.node.judges.childElementCount; j++) {
                if (!this.node.judges.childNodes[j].classList.contains('removing') && !this.node.judges.childNodes[j].classList.contains('feichu')) {
                  cards.push(this.node.judges.childNodes[j]);
                  if (this.node.judges.childNodes[j].viewAs && arguments.length > 1) {
                    this.node.judges.childNodes[j].tempJudge = this.node.judges.childNodes[j].name;
                    this.node.judges.childNodes[j].name = this.node.judges.childNodes[j].viewAs;
                    cards1.push(this.node.judges.childNodes[j]);
                  }
                }
              }
            }
          }
          if (arguments.length == 1) {
            return cards;
          }
          if (arg2 != undefined) {
            if (typeof arg3 == 'function') {
              var cards2 = cards.slice(0);
              cards.sort(function (a, b) {
                return arg3(b, cards2) - arg3(a, cards2);
              });
            }
            if (typeof arg2 == 'string') {
              for (i = 0; i < cards.length; i++) {
                if (cards[i].name != arg2) {
                  cards.splice(i, 1); i--;
                }
              }
            }
            else if (typeof arg2 == 'object') {
              for (i = 0; i < cards.length; i++) {
                for (j in arg2) {
                  if (j == 'type') {
                    if (typeof arg2[j] == 'object') {
                      if (arg2[j].contains(get.type(cards[i])) == false) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                    else if (typeof arg2[j] == 'string') {
                      if (get.type(cards[i]) != arg2[j]) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                  }
                  else if (j == 'subtype') {
                    if (typeof arg2[j] == 'object') {
                      if (arg2[j].contains(get.subtype(cards[i])) == false) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                    else if (typeof arg2[j] == 'string') {
                      if (get.subtype(cards[i]) != arg2[j]) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                  }
                  else if (j == 'color') {
                    if (typeof arg2[j] == 'object') {
                      if (arg2[j].contains(get.color(cards[i])) == false) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                    else if (typeof arg2[j] == 'string') {
                      if (get.color(cards[i]) != arg2[j]) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                  }
                  else if (j == 'suit') {
                    if (typeof arg2[j] == 'object') {
                      if (arg2[j].contains(get.suit(cards[i])) == false) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                    else if (typeof arg2[j] == 'string') {
                      if (get.suit(cards[i]) != arg2[j]) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                  }
                  else if (j == 'number') {
                    if (typeof arg2[j] == 'object') {
                      if (arg2[j].contains(get.number(cards[i])) == false) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                    else if (typeof arg2[j] == 'string') {
                      if (get.number(cards[i]) != arg2[j]) {
                        cards.splice(i, 1); i--; break;
                      }
                    }
                  }
                  else if (typeof arg2[j] == 'object') {
                    if (arg2[j].contains(cards[i][j]) == false) {
                      cards.splice(i, 1); i--; break;
                    }
                  }
                  else if (typeof arg2[j] == 'string') {
                    if (cards[i][j] != arg2[j]) {
                      cards.splice(i, 1); i--; break;
                    }
                  }
                }
              }
            }
            else if (typeof arg2 == 'number' && arg2 > 0) {
              cards.splice(arg2);
            }
            else if (typeof arg2 == 'function') {
              for (i = 0; i < cards.length; i++) {
                if (!arg2(cards[i])) {
                  cards.splice(i, 1); i--;
                }
              }
            }
          }
          for (i = 0; i < cards1.length; i++) {
            if (cards1[i].tempJudge) {
              cards1[i].name = cards1[i].tempJudge;
              delete cards1[i].tempJudge;
            }
          }
          if (arg2 === 0) return cards[0];
          if (typeof arg3 == 'number') {
            if (arg3 == 0) return cards[0];
            cards.splice(arg3);
          }
          if (typeof arg4 == 'number') {
            if (arg4 == 0) return cards[0];
            cards.splice(arg4);
          }
          return cards;
        }
      },
      /**
       * 记录本角色的一个技能当前标记数(回放记录)，并更新全部标记信息({@link lib.element.player.updateMarks})
       * @param {!string} skill 技能名
       */
      syncStorage: function (skill) {
        switch (get.itemtype(this.storage[skill])) {
          case 'cards': game.addVideo('storage', this, [skill, get.cardsInfo(this.storage[skill]), 'cards']); break;
          case 'card': game.addVideo('storage', this, [skill, get.cardInfo(this.storage[skill]), 'card']); break;
          default:
            try {
              game.addVideo('storage', this, [skill, JSON.parse(JSON.stringify(this.storage[skill]))]);
            }
            catch (e) {
              console.log(this.storage[skill]);
            }
        }
      },
      syncSkills: function () {
        game.broadcast(function (player, skills) {
          player.applySkills(skills);
        }, this, get.skillState(this));
      },
      playerfocus: function (time) {
        time = time || 1000;
        this.classList.add('playerfocus');
        ui.arena.classList.add('playerfocus');
        var that = this;
        setTimeout(function () {
          that.classList.remove('playerfocus');
          ui.arena.classList.remove('playerfocus');
        }, time);
        game.addVideo('playerfocus', this, time);
        game.broadcast(function (player, time) {
          player.playerfocus(time);
        }, this, time);
        return this;
      },
      /**
       * 记录本角色的一个技能当前标记数(回放记录)，并更新全部标记信息({@link lib.element.player.updateMarks})
       * @param {!string} skill 技能名
       */
      setIdentity: function (identity, nature) {
        if (!identity) identity = this.identity;
        if (get.is.jun(this)) {
          this.node.identity.firstChild.innerHTML = '君';
        }
        else {
          this.node.identity.firstChild.innerHTML = get.translation(identity);
        }
        this.node.identity.dataset.color = nature || identity;
        return this;
      },
      insertPhase: function (skill, insert) {
        var evt = _status.event.getParent('phase');
        var next;
        if (evt && evt.parent && evt.parent.next) {
          evt = evt.parent;
          next = game.createEvent('phase', null, evt);
        }
        else if (_status.event.parent && _status.event.parent.next) {
          evt = _status.event.parent;
          next = game.createEvent('phase', null, evt);
        }
        else {
          evt = null;
          next = game.createEvent('phase');
        }
        if (evt && insert && evt.next.contains(next)) {
          evt.next.remove(next);
          evt.next.unshift(next);
        }
        next.player = this;
        next.skill = skill || _status.event.name;
        next.setContent('phase');
        return next;
      },
      insertEvent: function (name, content, arg) {
        var evt = _status.event.getParent('phase');
        var next;
        if (evt && evt.parent && evt.parent.next) {
          next = game.createEvent(name, null, evt.parent);
        }
        else {
          next = game.createEvent(name);
        }
        for (var i in arg) {
          next[i] = arg[i];
        }
        next.player = this;
        next.setContent(content);
        return next;
      },
      phase: function (skill, stageList) {
        var next = game.createEvent('phase');
        next.player = this;
        next.setContent('phase');
        if (!_status.roundStart) {
          _status.roundStart = this;
        }
        if (skill) {
          next.skill = skill;
        }
        if (stageList) {
          next.stageList = stageList;
        }
        return next;
      },
      phaseZhunbei: function () {
        var next = game.createEvent('phaseZhunbei');
        next.player = this;
        next.setContent('emptyEvent');
        return next;
      },
      phaseJudge: function () {
        var next = game.createEvent('phaseJudge');
        next.player = this;
        next.setContent('phaseJudge');
        return next;
      },
      phaseDraw: function () {
        var next = game.createEvent('phaseDraw');
        next.player = this;
        next.num = 2;
        if ((get.config('first_less') || _status.connectMode || _status.first_less_forced) && game.phaseNumber == 1 && _status.first_less) {
          next.num--;
        }
        next.setContent('phaseDraw');
        return next;
      },
      phaseUse: function () {
        var next = game.createEvent('phaseUse');
        next.player = this;
        next.setContent('phaseUse');
        return next;
      },
      phaseDiscard: function () {
        var next = game.createEvent('phaseDiscard');
        next.player = this;
        next.setContent('phaseDiscard');
        return next;
      },
      phaseJieshu: function () {
        var next = game.createEvent('phaseJieshu');
        next.player = this;
        next.setContent('emptyEvent');
        return next;
      },
      chooseToUse: function (use) {
        var next = game.createEvent('chooseToUse');
        next.player = this;
        if (arguments.length == 1 && get.objtype(arguments[0]) == 'object') {
          for (var i in use) {
            next[i] = use[i];
          }
        }
        else {
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number' || get.itemtype(arguments[i]) == 'select') {
              next.selectTarget = arguments[i];
            }
            else if ((typeof arguments[i] == 'object' && arguments[i]) || typeof arguments[i] == 'function') {
              if (get.itemtype(arguments[i]) == 'player' || next.filterCard) {
                next.filterTarget = arguments[i];
              }
              else next.filterCard = arguments[i];
            }
            else if (typeof arguments[i] == 'boolean') {
              next.forced = arguments[i];
            }
            else if (typeof arguments[i] == 'string') {
              next.prompt = arguments[i];
            }
          }
        }
        if (typeof next.filterCard == 'object') {
          next.filterCard = get.filter(next.filterCard);
        }
        if (typeof next.filterTarget == 'object') {
          next.filterTarget = get.filter(next.filterTarget, 2);
        }
        if (next.filterCard == undefined) {
          next.filterCard = lib.filter.filterCard;
        }
        if (next.selectCard == undefined) {
          next.selectCard = [1, 1];
        }
        if (next.filterTarget == undefined) {
          next.filterTarget = lib.filter.filterTarget;
        }
        if (next.selectTarget == undefined) {
          next.selectTarget = lib.filter.selectTarget;
        }
        next.position = 'hs';
        if (next.ai1 == undefined) next.ai1 = get.order;
        if (next.ai2 == undefined) next.ai2 = get.effect_use;
        next.setContent('chooseToUse');
        next._args = Array.from(arguments);
        return next;
      },
      chooseToRespond: function () {
        var next = game.createEvent('chooseToRespond');
        next.player = this;
        var filter;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            next.selectCard = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectCard = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            next.position = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            if (next.filterCard) next.ai = arguments[i];
            else next.filterCard = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i]) {
            next.filterCard = get.filter(arguments[i]);
            filter = arguments[i];
          }
          else if (arguments[i] == 'nosource') {
            next.nosource = true;
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
        }
        if (next.filterCard == undefined) next.filterCard = lib.filter.all;
        if (next.selectCard == undefined) next.selectCard = [1, 1];
        if (next.source == undefined && !next.nosource) next.source = _status.event.player;
        if (next.ai == undefined) next.ai = get.unuseful2;
        if (next.prompt != false) {
          if (typeof next.prompt == 'string') {
            //next.dialog=next.prompt;
          }
          else {
            var str = '请打出' + get.cnNumber(next.selectCard[0]) + '张'
            if (filter) {
              if (filter.name) {
                str += get.translation(filter.name);
              }
              else {
                str += '牌';
              }
            }
            else {
              str += '牌';
            }
            if (_status.event.getParent().name == 'useCard') {
              var cardname = _status.event.name;
              if (lib.card[cardname] && lib.translate[cardname]) {
                str += '响应' + lib.translate[cardname];
              }
            }
            next.prompt = str;
          }
        }
        next.position = 'hs';
        next.setContent('chooseToRespond');
        next._args = Array.from(arguments);
        return next;
      },
      chooseToDiscard: function () {
        var next = game.createEvent('chooseToDiscard');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            next.selectCard = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectCard = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'dialog') {
            next.dialog = arguments[i];
            next.prompt = false;
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            next.position = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            if (next.filterCard) next.ai = arguments[i];
            else next.filterCard = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i]) {
            next.filterCard = get.filter(arguments[i]);
          }
          else if (typeof arguments[i] == 'string') {
            get.evtprompt(next, arguments[i]);
          }
          if (arguments[i] === null) {
            for (var i = 0; i < arguments.length; i++) {
              console.log(arguments[i]);
            }
          }
        }
        if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
        if (next.filterCard == undefined) next.filterCard = lib.filter.all;
        if (next.selectCard == undefined) next.selectCard = [1, 1];
        if (next.ai == undefined) next.ai = get.unuseful;
        next.autochoose = function () {
          if (!this.forced) return false;
          if (typeof this.selectCard == 'function') return false;
          var cards = this.player.getCards(this.position);
          var num = cards.length;
          for (var i = 0; i < cards.length; i++) {
            if (!lib.filter.cardDiscardable(cards[i], this.player, this)) num--;
          }
          return get.select(this.selectCard)[0] >= num;
        }
        next.setContent('chooseToDiscard');
        next._args = Array.from(arguments);
        return next;
      },
      chooseToCompare: function (target, check) {
        var next = game.createEvent('chooseToCompare');
        next.player = this;
        if (Array.isArray(target)) {
          next.targets = target;
          if (check) next.ai = check;
          else next.ai = function (card) {
            if (typeof card == 'string' && lib.skill[card]) {
              var ais = lib.skill[card].check || function () { return 0 };
              return ais();
            }
            var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -10 : 0;
            if (card.name == 'du') addi += 5;
            var source = _status.event.source;
            var player = _status.event.player;
            var getn = function (card) {
              if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13;
              return get.number(card);
            }
            if (source && source != player && get.attitude(player, source) > 1) {
              return -getn(card) - get.value(card) / 2 + addi;
            }
            return getn(card) - get.value(card) / 2 + addi;
          }
          next.setContent('chooseToCompareMultiple');
        }
        else {
          next.target = target;
          if (check) next.ai = check;
          else next.ai = function (card) {
            if (typeof card == 'string' && lib.skill[card]) {
              var ais = lib.skill[card].check || function () { return 0 };
              return ais();
            }
            var player = get.owner(card);
            var getn = function (card) {
              if (player.hasSkill('tianbian') && get.suit(card) == 'heart') return 13;
              return get.number(card);
            }
            var Evt = _status.event.getParent();
            var to = (player == Evt.player ? Evt.target : Evt.player);
            var addi = (get.value(card) >= 8 && get.type(card) != 'equip') ? -10 : 0;
            if (card.name == 'du') addi -= 5;
            if (player == Evt.player) {
              if (get.attitude(player, to) > 0 && Evt.small) {
                return -getn(card) - get.value(card) / 2 + addi;
              }
              return getn(card) - get.value(card) / 2 + addi;
            }
            else {
              if (get.attitude(player, to) > 0 && !Evt.small) {
                return -getn(card) - get.value(card) / 2 + addi;
              }
              return getn(card) - get.value(card) / 2 + addi;
            }
          }
          next.setContent('chooseToCompare');
        }
        next.forceDie = true;
        next._args = Array.from(arguments);
        return next;
      },
      discoverSkill: function (list) {
        var next = game.createEvent('discoverSkill');
        next.player = this;
        next.setContent('discoverSkill');
        next.list = list;
        for (var i = 1; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.num = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
          else if (typeof arguments[i] === 'function') {
            next.ai = arguments[i];
          }
        }
      },
      chooseSkill: function (target) {
        var next = game.createEvent('chooseSkill');
        next.player = this;
        next.setContent('chooseSkill');
        next.target = target;
        for (var i = 1; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            next.func = arguments[i];
          }
        }
      },
      discoverCard: function (list) {
        var next = game.createEvent('discoverCard');
        next.player = this;
        next.setContent('discoverCard');
        next.list = list || lib.inpile.slice(0);
        next.forced = true;
        for (var i = 1; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            switch (arguments[i]) {
              case 'use': next.use = true; break;
              case 'nogain': next.nogain = true; break;
              default: next.prompt = arguments[i];
            }
          }
          else if (typeof arguments[i] == 'number') {
            next.num = arguments[i];
          }
          else if (typeof arguments[i] === 'function') {
            next.ai = arguments[i];
          }
        }
        return next;
      },
      chooseCardButton: function () {
        var cards, prompt, forced, select;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') cards = arguments[i];
          else if (typeof arguments[i] == 'boolean') forced = arguments[i];
          else if (typeof arguments[i] == 'string') prompt = arguments[i];
          else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
        }
        if (prompt == undefined) prompt = '请选择卡牌';
        return this.chooseButton(forced, select, 'hidden', [prompt, cards, 'hidden']);
      },
      chooseVCardButton: function () {
        var list, prompt, forced, select, notype = false;
        for (var i = 0; i < arguments.length; i++) {
          if (Array.isArray(arguments[i])) {
            list = arguments[i];
          }
          else if (arguments[i] == 'notype') {
            notype = true;
          }
          else if (typeof arguments[i] == 'boolean') forced = arguments[i];
          else if (typeof arguments[i] == 'string') prompt = arguments[i];
          else if (get.itemtype(arguments[i]) == 'select' || typeof arguments[i] == 'number') select = arguments[i];
        }
        for (var i = 0; i < list.length; i++) {
          list[i] = [notype ? '' : (get.subtype(list[i]) || get.type(list[i])), '', list[i]];
        }
        if (prompt == undefined) prompt = '请选择卡牌';
        return this.chooseButton(forced, select, 'hidden', [prompt, [list, 'vcard'], 'hidden']);
      },
      chooseButton: function () {
        var next = game.createEvent('chooseButton');
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'dialog') {
            next.dialog = arguments[i];
            next.closeDialog = true;
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectButton = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.selectButton = [arguments[i], arguments[i]];
          }
          else if (typeof arguments[i] == 'function') {
            if (next.ai) next.filterButton = arguments[i];
            else next.ai = arguments[i];
          }
          else if (Array.isArray(arguments[i])) {
            next.createDialog = arguments[i];
          }
        }
        next.player = this;
        if (typeof next.forced != 'boolean') next.forced = false;
        if (next.isMine() == false && next.dialog) next.dialog.style.display = 'none';
        if (next.filterButton == undefined) next.filterButton = lib.filter.filterButton;
        if (next.selectButton == undefined) next.selectButton = [1, 1];
        if (next.ai == undefined) next.ai = function () { return 1 };
        next.setContent('chooseButton');
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
      },
      chooseButtonOL: function (list, callback, ai) {
        var next = game.createEvent('chooseButtonOL');
        next.list = list;
        next.setContent('chooseButtonOL');
        next.ai = ai;
        next.callback = callback;
        next._args = Array.from(arguments);
        return next;
      },
      chooseCardOL: function () {
        var next = game.createEvent('chooseCardOL');
        next._args = [];
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'players') {
            next.list = arguments[i].slice(0);
          }
          else {
            next._args.push(arguments[i]);
          }
        }
        next.setContent('chooseCardOL');
        next._args.add('glow_result');
        return next;
      },
      chooseCard: function (choose) {
        var next = game.createEvent('chooseCard');
        next.player = this;
        if (arguments.length == 1 && get.is.object(choose)) {
          for (var i in choose) {
            next[i] = choose[i];
          }
        }
        else {
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == 'number') {
              next.selectCard = [arguments[i], arguments[i]];
            }
            else if (get.itemtype(arguments[i]) == 'select') {
              next.selectCard = arguments[i];
            }
            else if (typeof arguments[i] == 'boolean') {
              next.forced = arguments[i];
            }
            else if (get.itemtype(arguments[i]) == 'position') {
              next.position = arguments[i];
            }
            else if (typeof arguments[i] == 'function') {
              if (next.filterCard) next.ai = arguments[i];
              else next.filterCard = arguments[i];
            }
            else if (typeof arguments[i] == 'object' && arguments[i]) {
              next.filterCard = get.filter(arguments[i]);
            }
            else if (arguments[i] == 'glow_result') {
              next.glow_result = true;
            }
            else if (typeof arguments[i] == 'string') {
              get.evtprompt(next, arguments[i]);
            }
          }
        }
        if (next.filterCard == undefined) next.filterCard = lib.filter.all;
        if (next.selectCard == undefined) next.selectCard = [1, 1];
        if (next.ai == undefined) next.ai = get.unuseful3;
        next.setContent('chooseCard');
        next._args = Array.from(arguments);
        return next;
      },
      chooseUseTarget: function () {
        var next = game.createEvent('chooseUseTarget');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'players') {
            next.targets = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            next.targets = [arguments[i]];
          }
          else if (get.is.object(arguments[i]) && arguments[i].name) {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            if (arguments[i] == 'nopopup') {
              next.nopopup = true;
            }
            else if (arguments[i] == 'noanimate') {
              next.animate = false;
            }
            else if (arguments[i] == 'nothrow') {
              next.throw = false;
            }
            else if (arguments[i] == 'nodistance') {
              next.nodistance = true;
            }
            else if (arguments[i] == 'noTargetDelay') {
              next.noTargetDelay = true;
            }
            else if (arguments[i] == 'nodelayx') {
              next.nodelayx = true;
            }
            else if (lib.card[arguments[i]] && !next.card) {
              next.card = { name: arguments[i], isCard: true };
            }
            else get.evtprompt(next, arguments[i]);
          }
          else if (arguments[i] === true) {
            next.forced = true;
          }
          else if (arguments[i] === false) {
            next.addCount = false;
          }
        }
        if (!next.targets) next.targets = game.players.slice(0);
        if (next.cards == undefined) {
          if (get.itemtype(next.card) == 'card') {
            next.cards = [next.card];
          }
          else next.cards = [];
        }
        else if (next.card == undefined) {
          if (next.cards) {
            next.card = next.cards[0];
          }
        }
        next.setContent('chooseUseTarget');
        next._args = Array.from(arguments);
        return next;
        // Fully Online-Ready! Enjoy It!
      },
      chooseTarget: function () {
        var next = game.createEvent('chooseTarget');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            next.selectTarget = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectTarget = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'dialog') {
            next.dialog = arguments[i];
            next.prompt = false;
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            if (next.filterTarget) next.ai = arguments[i];
            else next.filterTarget = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            get.evtprompt(next, arguments[i]);
          }
        }
        if (next.filterTarget == undefined) next.filterTarget = lib.filter.all;
        if (next.selectTarget == undefined) next.selectTarget = [1, 1];
        if (next.ai == undefined) next.ai = get.attitude2;
        next.setContent('chooseTarget');
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
      },
      chooseCardTarget: function (choose) {
        var next = game.createEvent('chooseCardTarget');
        next.player = this;
        if (arguments.length == 1) {
          for (var i in choose) {
            next[i] = choose[i];
          }
        }
        if (typeof next.filterCard == 'object') {
          next.filterCard = get.filter(next.filterCard);
        }
        if (typeof next.filterTarget == 'object') {
          next.filterTarget = get.filter(next.filterTarget, 2);
        }
        if (next.filterCard == undefined || next.filterCard === true) {
          next.filterCard = lib.filter.all;
        }
        if (next.selectCard == undefined) {
          next.selectCard = 1;
        }
        if (next.filterTarget == undefined || next.filterTarget === true) {
          next.filterTarget = lib.filter.all;
        }
        if (next.selectTarget == undefined) {
          next.selectTarget = 1;
        }
        if (next.ai1 == undefined) next.ai1 = get.unuseful2;
        if (next.ai2 == undefined) next.ai2 = get.attitude2;
        next.setContent('chooseCardTarget');
        next._args = Array.from(arguments);
        return next;
      },
      chooseControlList: function () {
        var list = [];
        var prompt = null;
        var forced = 'cancel2';
        var func = null;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') {
            if (!prompt) {
              prompt = arguments[i];
            }
            else {
              list.push(arguments[i]);
            }
          }
          else if (Array.isArray(arguments[i])) {
            list = arguments[i];
          }
          else if (arguments[i] === true) {
            forced = null;
          }
          else if (typeof arguments[i] == 'function') {
            func = arguments[i];
          }
        }
        return this.chooseControl(forced, func).set('choiceList', list).set('prompt', prompt);
      },
      chooseControl: function () {
        var next = game.createEvent('chooseControl');
        next.controls = [];
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') {
            if (arguments[i] == 'dialogcontrol') {
              next.dialogcontrol = true;
            }
            else if (arguments[i] == 'seperate') {
              next.seperate = true;
            }
            else {
              next.controls.push(arguments[i]);
            }
          }
          else if (Array.isArray(arguments[i])) {
            next.controls = next.controls.concat(arguments[i]);
          }
          else if (typeof arguments[i] == 'function') {
            next.ai = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.choice = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'dialog') {
            next.dialog = arguments[i];
          }
        }
        next.player = this;
        if (next.choice == undefined) next.choice = 0;
        next.setContent('chooseControl');
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
      },
      chooseBool: function () {
        var next = game.createEvent('chooseBool');
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.choice = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            next.ai = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            get.evtprompt(next, arguments[i]);
          }
          else if (get.itemtype(arguments[i]) == 'dialog') {
            next.dialog = arguments[i];
          }
          if (next.choice == undefined) next.choice = true;
        }
        next.player = this;
        next.setContent('chooseBool');
        next._args = Array.from(arguments);
        next.forceDie = true;
        return next;
      },
      chooseDrawRecover: function () {
        var next = game.createEvent('chooseDrawRecover', false);
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            if (typeof next.num1 == 'number') {
              next.num2 = arguments[i];
            }
            else {
              next.num1 = arguments[i];
            }
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            next.ai = arguments[i];
          }
        }
        if (typeof next.num1 != 'number') {
          next.num1 = 1;
        }
        if (typeof next.num2 != 'number') {
          next.num2 = 1;
        }
        next.setContent('chooseDrawRecover');
        return next;
      },
      choosePlayerCard: function () {
        var next = game.createEvent('choosePlayerCard');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.target = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.selectButton = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectButton = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'visible') {
            next.visible = true;
          }
          else if (typeof arguments[i] == 'function') {
            if (next.ai) next.filterButton = arguments[i];
            else next.ai = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i]) {
            next.filterButton = get.filter(arguments[i]);
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
        }
        if (next.filterButton == undefined) next.filterButton = lib.filter.all;
        if (next.position == undefined) next.position = 'he';
        if (next.selectButton == undefined) next.selectButton = [1, 1];
        if (next.ai == undefined) next.ai = function (button) {
          var val = get.buttonValue(button);
          if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
          return val;
        };
        next.setContent('choosePlayerCard');
        next._args = Array.from(arguments);
        return next;
      },
      discardPlayerCard: function () {
        var next = game.createEvent('discardPlayerCard');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.target = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.selectButton = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectButton = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'visible') {
            next.visible = true;
          }
          else if (typeof arguments[i] == 'function') {
            if (next.ai) next.filterButton = arguments[i];
            else next.ai = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i]) {
            next.filterButton = get.filter(arguments[i]);
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
        }
        if (next.filterButton == undefined) next.filterButton = lib.filter.all;
        if (next.position == undefined) next.position = 'he';
        if (next.selectButton == undefined) next.selectButton = [1, 1];
        if (next.ai == undefined) next.ai = function (button) {
          var val = get.buttonValue(button);
          if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
          return val;
        };
        next.setContent('discardPlayerCard');
        next._args = Array.from(arguments);
        return next;
      },
      gainPlayerCard: function () {
        var next = game.createEvent('gainPlayerCard');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.target = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.selectButton = [arguments[i], arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'select') {
            next.selectButton = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'visible') {
            next.visible = true;
          }
          else if (arguments[i] == 'visibleMove') {
            next.visibleMove = true;
          }
          else if (typeof arguments[i] == 'function') {
            if (next.ai) next.filterButton = arguments[i];
            else next.ai = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i]) {
            next.filterButton = get.filter(arguments[i]);
          }
          else if (typeof arguments[i] == 'string') {
            next.prompt = arguments[i];
          }
        }
        if (next.filterButton == undefined) next.filterButton = lib.filter.all;
        if (next.position == undefined) next.position = 'he';
        if (next.selectButton == undefined) next.selectButton = [1, 1];
        if (next.ai == undefined) next.ai = function (button) {
          var val = get.buttonValue(button);
          if (get.attitude(_status.event.player, get.owner(button.link)) > 0) return -val;
          return val;
        };
        next.setContent('gainPlayerCard');
        next._args = Array.from(arguments);
        return next;
      },
      showHandcards: function (str) {
        var next = game.createEvent('showHandcards');
        next.player = this;
        if (typeof str == 'string') {
          next.prompt = str;
        }
        next.setContent('showHandcards');
        next._args = Array.from(arguments);
        return next;
      },
      showCards: function (cards, str) {
        var next = game.createEvent('showCards');
        next.player = this;
        next.str = str;
        if (typeof cards == 'string') {
          str = cards;
          cards = next.str;
          next.str = str;
        }
        if (get.itemtype(cards) == 'card') next.cards = [cards];
        else if (get.itemtype(cards) == 'cards') next.cards = cards.slice(0);
        else _status.event.next.remove(next);
        next.setContent('showCards');
        next._args = Array.from(arguments);
        return next;
      },
      viewCards: function (str, cards) {
        var next = game.createEvent('viewCards');
        next.player = this;
        next.str = str;
        next.cards = cards.slice(0);
        next.setContent('viewCards');
        next._args = Array.from(arguments);
        return next;
      },
      viewHandcards: function (target) {
        var cards = target.getCards('h');
        if (cards.length) {
          return this.viewCards(get.translation(target) + '的手牌', cards);
        }
        else {
          return false;
        }
      },
      canMoveCard: function (withatt, nojudge, moveHandcard) {
        var player = this;
        return game.hasPlayer(function (current) {
          var att = get.sgn(get.attitude(player, current));
          if (!withatt || att != 0) {
            var es = current.getCards('e');
            for (var i = 0; i < es.length; i++) {
              if (game.hasPlayer(function (current2) {
                if (withatt) {
                  if (get.sgn(get.value(es[i], current)) != -att) return false;
                  var att2 = get.sgn(get.attitude(player, current2));
                  if (att == att2 || att2 != get.sgn(get.effect(current2, es[i], player, current2))) return false;
                }
                return current != current2 && !current2.isMin() && current2.isEmpty(get.subtype(es[i]));
              })) {
                return true;
              }
            }
          }
          if (!nojudge && (!withatt || att > 0)) {
            var js = current.getCards('j');
            for (var i = 0; i < js.length; i++) {
              if (game.hasPlayer(function (current2) {
                if (withatt) {
                  var att2 = get.attitude(player, current2);
                  if (att2 >= 0) return false;
                }
                return current != current2 && current2.canAddJudge(js[i]);
              })) {
                return true;
              }
            }
          }
          if (moveHandcard == true) {
            if (current.countCards('h') > 0) return true;
          }
        });
      },
      /**
       * 移动场上牌
       * 本角色移动场上的牌
       * @returns {GameCores.Bases.Event}
       */
      moveCard: function () {
        var next = game.createEvent('moveCard');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'boolean') {
            next.forced = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            get.evtprompt(next, arguments[i]);
          }
          else if (typeof arguments[i] == 'function') {
            if (next.sourceFilterTarget) next.ai = arguments[i];
            else next.sourceFilterTarget = arguments[i];
          }
          else if (Array.isArray(arguments[i])) {
            for (var j = 0; j < arguments[i].length; j++) {
              if (typeof arguments[i][j] != 'string') break;
            }
            if (j == arguments[i].length) {
              next.targetprompt = arguments[i];
            }
          }
        }
        next.setContent('moveCard');
        next._args = Array.from(arguments);
        return next;
      },
      /**
       * 本角色使用牌或技能；`chooseToUse`时调用
       * @function
       * @param {*} result `chooseToUse`的结果
       * @param {?GameCores.Bases.Event} [Evt] 父事件，如果不指定，使用当前事件作为父事件
       */
      useResult: function (result, Evt) {
        Evt = Evt || _status.event;
        if (result._sendskill) {
          lib.skill[result._sendskill[0]] = result._sendskill[1];
        }
        if (Evt.onresult) {
          Evt.onresult(result);
        }
        if (result.skill) {
          var info = get.info(result.skill);
          if (info.onuse) {
            info.onuse(result, this);
          }
          if (info.direct && !info.clearTime) {
            _status.noclearcountdown = true;
          }
        }
        if (Evt.logSkill) {
          if (typeof Evt.logSkill == 'string') {
            this.logSkill(Evt.logSkill);
          }
          else if (Array.isArray(Evt.logSkill)) {
            this.logSkill.apply(this, Evt.logSkill);
          }
        }
        if (result.card || !result.skill) {
          result.used = result.card || result.cards[0];
          var next = this.useCard(result.card, result.cards, result.targets, result.skill);
          next.oncard = Evt.oncard;
          next.respondTo = Evt.respondTo;
          if (Evt.addCount === false) {
            next.addCount = false;
          }
          return next;
        }
        else if (result.skill) {
          result.used = result.skill;
          return this.useSkill(result.skill, result.cards, result.targets);
        }
      },
      useCard: function () {
        var next = game.createEvent('useCard');
        next.player = this;
        next.num = 0;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'players') {
            next.targets = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            next.targets = [arguments[i]];
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            if (arguments[i] == 'noai') {
              next.noai = true;
            }
            else if (arguments[i] == 'nowuxie') {
              next.nowuxie = true;
            }
            else {
              next.skill = arguments[i];
            }
          }
          else if (typeof arguments[i] == 'boolean') {
            next.addCount = arguments[i];
          }
        }
        if (next.cards == undefined) {
          if (get.itemtype(next.card) == 'card') {
            next.cards = [next.card];
          }
          else next.cards = [];
        }
        else if (next.card == undefined) {
          if (next.cards) {
            next.card = next.cards[0];
          }
        }
        if (!next.targets) {
          next.targets = [];
        }
        if (next.card) {
          next.card = get.autoViewAs(next.card, false, next.player);
          var info = get.info(next.card);
          if (info.changeTarget) {
            info.changeTarget(next.player, next.targets);
          }
          if (info.singleCard) {
            next._targets = next.targets.slice(0);
            next.target = next.targets[0];
            next.addedTargets = next.targets.splice(1);
            if (next.addedTargets.length) {
              next.addedTarget = next.addedTargets[0];
            }
          }
          if (!next.card.isCard && next.cards.length) {
            next.card.cards = next.cards.slice(0);
          }
        }
        for (var i = 0; i < next.targets.length; i++) {
          if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
            if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
            this.ai.tempIgnore.add(next.targets[i]);
          }
        }
        if (typeof this.logAi == 'function' && !next.noai && !get.info(next.card).noai) {
          var postAi = get.info(next.card).postAi;
          if (postAi && postAi(next.targets)) {
            next.postAi = true;
          }
          else {
            this.logAi(next.targets, next.card);
          }
        }
        next.stocktargets = next.targets.slice(0);
        next.setContent('useCard');
        return next;
      },
      useSkill: function () {
        var next = game.createEvent('useSkill');
        next.player = this;
        next.num = 0;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'players') {
            next.targets = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            next.skill = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.addCount = arguments[i];
          }
        }
        if (next.cards == undefined) {
          next.cards = [];
        }
        if (next.skill && get.info(next.skill) && get.info(next.skill).changeTarget) {
          get.info(next.skill).changeTarget(next.player, next.targets);
        }
        if (next.targets) {
          for (var i = 0; i < next.targets.length; i++) {
            if (get.attitude(this, next.targets[i]) >= -1 && get.attitude(this, next.targets[i]) < 0) {
              if (!this.ai.tempIgnore) this.ai.tempIgnore = [];
              this.ai.tempIgnore.add(next.targets[i]);
            }
          }
          if (typeof this.logAi == 'function') {
            this.logAi(next.targets, next.skill);
          }
        }
        else {
          next.targets = [];
        }
        next.setContent('useSkill');
        return next;
      },
      drawTo: function (num, args) {
        var num2 = num - this.countCards('h');
        if (!num2) return;
        var next = this.draw(num2);
        if (Array.isArray(args)) {
          for (var i = 0; i < args.length; i++) {
            if (get.itemtype(args[i]) == 'player') {
              next.source = args[i];
            }
            else if (typeof args[i] == 'boolean') {
              next.animate = args[i];
            }
            else if (args[i] == 'nodelay') {
              next.animate = false;
              next.$draw = true;
            }
            else if (args[i] == 'visible') {
              next.visible = true;
            }
            else if (args[i] == 'bottom') {
              next.bottom = true;
            }
            else if (typeof args[i] == 'object' && args[i] && args[i].drawDeck != undefined) {
              next.drawDeck = args[i].drawDeck;
            }
          }
        }
        return next;
      },
      draw: function () {
        var next = game.createEvent('draw');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.num = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.animate = arguments[i];
          }
          else if (arguments[i] == 'nodelay') {
            next.animate = false;
            next.$draw = true;
          }
          else if (arguments[i] == 'visible') {
            next.visible = true;
          }
          else if (arguments[i] == 'bottom') {
            next.bottom = true;
          }
          else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].drawDeck != undefined) {
            next.drawDeck = arguments[i].drawDeck;
          }
        }
        if (next.num == undefined) next.num = 1;
        if (next.num <= 0) _status.event.next.remove(next);
        next.setContent('draw');
        if (lib.config.mode == 'stone' && _status.mode == 'deck' &&
          next.drawDeck == undefined && !next.player.isMin() && next.num > 1) {
          next.drawDeck = 1;
        }
        return next;
      },
      randomDiscard: function () {
        var position = 'he', num = 1, delay = null;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            num = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            position = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            delay = arguments[i];
          }
        }
        var cards = this.getCards(position).randomGets(num);
        if (cards.length) {
          var next = this.discard(cards, 'notBySelf');
          if (typeof delay == 'boolean') {
            next.delay = delay;
          }
        }
        return cards;
      },
      randomGain: function () {
        var position = 'he', num = 1, target = null, line = false;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            num = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'position') {
            position = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            target = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            line = arguments[i];
          }
        }
        if (target) {
          var cards = target.getCards(position).randomGets(num);
          if (cards.length) {
            if (line) {
              this.line(target, 'green');
            }
            this.gain(cards, target, 'log', 'bySelf');
            target.$giveAuto(cards, this);
          }
          return cards;
        }
        return [];
      },
      discard: function () {
        var next = game.createEvent('discard');
        next.player = this;
        next.num = 0;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.cards = [arguments[i]];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.animate = arguments[i];
          }
          else if (get.objtype(arguments[i]) == 'div') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'notBySelf') {
            next.notBySelf = true;
          }
        }
        if (next.cards == undefined) _status.event.next.remove(next);
        next.setContent('discard');
        return next;
      },
      loseToDiscardpile: function () {
        var next = game.createEvent('loseToDiscardpile');
        next.player = this;
        next.num = 0;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.cards = [arguments[i]];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.animate = arguments[i];
          }
          else if (get.objtype(arguments[i]) == 'div') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'notBySelf') {
            next.notBySelf = true;
          }
        }
        if (next.cards == undefined) _status.event.next.remove(next);
        next.setContent('loseToDiscardpile');
        return next;
      },
      respond: function () {
        var next = game.createEvent('respond');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') next.animate = arguments[i];
          else if (arguments[i] == 'highlight') next.highlight = true;
          else if (arguments[i] == 'noOrdering') next.noOrdering = true;
          else if (typeof arguments[i] == 'string') next.skill = arguments[i];
        }
        if (next.cards == undefined) {
          if (get.itemtype(next.card) == 'card') {
            next.cards = [next.card];
          }
          else {
            next.cards = [];
          }
        }
        else if (next.card == undefined) {
          if (next.cards) {
            next.card = next.cards[0];
            if (!next.skill) {
              next.card = get.autoViewAs(next.card, null, next.player);
            }
          }
        }
        next.setContent('respond');
        return next;
      },
      swapHandcards: function (target, cards1, cards2) {
        var next = game.createEvent('swapHandcards', false);
        next.player = this;
        next.target = target;
        if (cards1) next.cards1 = cards1;
        if (cards2) next.cards2 = cards2;
        next.setContent('swapHandcards');
        return next;
      },
      $addToExpansion: function (cards, broadcast, gaintag) {
        var hs = this.getCards('x');
        for (var i = 0; i < cards.length; i++) {
          if (hs.contains(cards[i])) {
            cards.splice(i--, 1);
          }
        }
        for (var i = 0; i < cards.length; i++) {
          cards[i].fix();
          if (gaintag) cards[i].addGaintag(gaintag);
          var sort = lib.config.sort_card(cards[i]);
          this.node.expansions.insertBefore(cards[i], this.node.expansions.firstChild);
        }
        if (broadcast !== false) game.broadcast(function (player, cards, gaintag) {
          player.$addToExpansion(cards, null, gaintag);
        }, this, cards, gaintag);
        return this;
      },
      directequip: function (cards) {
        for (var i = 0; i < cards.length; i++) {
          this.$equip(cards[i]);
        }
        if (!_status.video) {
          game.addVideo('directequip', this, get.cardsInfo(cards));
        }
      },
      directgain: function (cards, broadcast, gaintag) {
        var hs = this.getCards('hs');
        for (var i = 0; i < cards.length; i++) {
          if (hs.contains(cards[i])) {
            cards.splice(i--, 1);
          }
        }
        for (var i = 0; i < cards.length; i++) {
          cards[i].fix();
          if (gaintag) cards[i].addGaintag(gaintag);
          var sort = lib.config.sort_card(cards[i]);
          if (this == game.me) {
            cards[i].classList.add('drawinghidden');
          }
          if (get.is.singleHandcard() || sort > 0) {
            this.node.handcards1.insertBefore(cards[i], this.node.handcards1.firstChild);
          }
          else {
            this.node.handcards2.insertBefore(cards[i], this.node.handcards2.firstChild);
          }
        }
        if (this == game.me || _status.video) ui.updatehl();
        if (!_status.video) {
          game.addVideo('directgain', this, get.cardsInfo(cards));
          this.update();
        }
        if (broadcast !== false) game.broadcast(function (player, cards) {
          player.directgain(cards);
        }, this, cards);
        return this;
      },
      /**
       * 本角色获取游戏牌到武将牌上，从除本角色武将牌上、手牌外的区域
       * @param {Array<GameCores.GameObjects.Card>} cards 要获取的游戏牌数组，如果一张游戏牌在本角色(手牌|武将牌上)，就从数组中移除它
       * @param {?boolean} [broadcast] 如果为trueh或未指定，通过{@link game.broadcast}同步获取游戏牌；如果为false，本机更新
       * @param {string} [gaintag] 为此次通过此函数移动到武将牌上的每张游戏牌设置`card.gaintag=`
       */
      directgains: function (cards, broadcast, gaintag) {
        var hs = this.getCards('hs');
        for (var i = 0; i < cards.length; i++) {
          if (hs.contains(cards[i])) {
            cards.splice(i--, 1);
          }
        }
        var addLast = function (card, node) {
          if (gaintag) {
            for (var i = 0; i < node.childNodes.length; i++) {
              var add = node.childNodes[node.childNodes.length - i - 1];
              if (!add.classList.contains('glows')) break;
              if (add.hasGaintag(gaintag)) {
                node.insertBefore(card, add.nextSibling);
                return;
              }
            }
          }
          node.appendChild(card);
        }
        for (var i = 0; i < cards.length; i++) {
          cards[i].fix();
          cards[i].remove();
          if (gaintag) cards[i].addGaintag(gaintag);
          cards[i].classList.add('glows');
          if (this == game.me) {
            cards[i].classList.add('drawinghidden');
          }
          if (get.is.singleHandcard()) {
            addLast(cards[i], this.node.handcards1);
          }
          else {
            addLast(cards[i], this.node.handcards2);
          }
        }
        if (this == game.me || _status.video) ui.updatehl();
        if (!_status.video) {
          game.addVideo('directgains', this, get.cardsInfo(cards));
          this.update();
        }
        if (broadcast !== false) game.broadcast(function (player, cards, gaintag) {
          player.directgains(cards, null, gaintag);//[recommend] use false instead of null
        }, this, cards, gaintag);
        return this;
      },
      gainMultiple: function (targets, position) {
        var next = game.createEvent('gainMultiple', false);
        next.setContent('gainMultiple');
        next.player = this;
        next.targets = targets;
        next.position = position || 'h';
        return next;
      },
      gain: function () {
        var next = game.createEvent('gain');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.cards = [arguments[i]];
          }
          else if (arguments[i] === 'log') {
            next.log = true;
          }
          else if (arguments[i] == 'fromStorage') {
            next.fromStorage = true;
          }
          else if (arguments[i] == 'bySelf') {
            next.bySelf = true;
          }
          else if (typeof arguments[i] == 'string') {
            next.animate = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.delay = arguments[i];
          }
        }
        if (next.animate == 'gain2' || next.animate == 'draw2') {
          if (!next.hasOwnProperty('log')) {
            next.log = true;
          }
        }
        next.setContent('gain');
        next.getl = function (player) {
          var that = this;
          var map = {
            player: player,
            hs: [],
            es: [],
            js: [],
            ss: [],
            xs: [],
            cards: [],
            cards2: [],
          };
          player.getHistory('lose', function (evt) {
            if (evt.parent == that) {
              map.hs.addArray(evt.hs);
              map.es.addArray(evt.es);
              map.js.addArray(evt.js);
              map.ss.addArray(evt.ss);
              map.xs.addArray(evt.xs);
              map.cards.addArray(evt.cards);
              map.cards2.addArray(evt.cards2);
            }
          });
          if (map.cards.length > 0 || map.ss.length > 0 || map.xs.length > 0) return map;
        };
        next.gaintag = [];
        return next;
      },
      addToExpansion: function () {
        var next = game.createEvent('addToExpansion');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.cards = [arguments[i]];
          }
          else if (arguments[i] === 'log') {
            next.log = true;
          }
          else if (arguments[i] == 'fromStorage') {
            next.fromStorage = true;
          }
          else if (arguments[i] == 'fromRenku') {
            next.fromStorage = true;
            next.fromRenku = true;
          }
          else if (arguments[i] == 'bySelf') {
            next.bySelf = true;
          }
          else if (typeof arguments[i] == 'string') {
            next.animate = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.delay = arguments[i];
          }
        }
        if (next.animate == 'gain2' || next.animate == 'draw2' || next.animate == 'give') {
          if (!next.hasOwnProperty('log')) {
            next.log = true;
          }
        }
        next.setContent('addToExpansion');
        next.getl = function (player) {
          var that = this;
          var map = {
            player: player,
            hs: [],
            es: [],
            js: [],
            ss: [],
            xs: [],
            cards: [],
            cards2: [],
          };
          player.getHistory('lose', function (evt) {
            if (evt.parent == that) {
              map.hs.addArray(evt.hs);
              map.es.addArray(evt.es);
              map.js.addArray(evt.js);
              map.ss.addArray(evt.ss);
              map.xs.addArray(evt.xs);
              map.cards.addArray(evt.cards);
              map.cards2.addArray(evt.cards2);
            }
          });
          if (map.cards.length > 0 || map.ss.length > 0 || map.xs.length > 0) return map;
        };
        next.gaintag = [];
        return next;
      },
      give: function (cards, target, visible) {
        var next = target.gain(cards, this);
        next.animate = visible ? 'give' : 'giveAuto';
      },
      lose: function () {
        var next = game.createEvent('lose');
        next.player = this;
        next.forceDie = true;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.cards = [arguments[i]];
          }
          else if (get.objtype(arguments[i]) == 'div') {
            next.position = arguments[i];
          }
          else if (arguments[i] == 'toStorage') {
            next.toStorage = true;
          }
          else if (arguments[i] == 'visible') {
            next.visible = true;
          }
          else if (arguments[i] == 'insert') {
            next.insert_card = true;
          }
        }
        if (next.cards) {
          var hej = this.getCards('hejsx');
          for (var i = 0; i < next.cards.length; i++) {
            if (!hej.contains(next.cards[i])) {
              next.cards.splice(i--, 1);
            }
          }
        }
        if (!next.cards || !next.cards.length) {
          _status.event.next.remove(next);
        }
        else {
          if (next.position == undefined) next.position = ui.discardPile;
          next.cards = next.cards.slice(0);
        }
        next.setContent('lose');
        next.getl = function (player) {
          if (this.getlx !== false && this.player == player) return this;
        };
        return next;
      },
      damage: function (...args) {
        let next = game.createEvent('damage');
        //next.forceDie=true;
        next.player = this;
        let nocard, nosource;
        let Evt = _status.event;
        for (let v of args) {
          if (get.itemtype(v) == 'cards') {
            next.cards = v.slice(0);
          }
          else if (get.itemtype(v) == 'card') {
            next.card = v;
          }
          else if (typeof v == 'number') {
            next.num = v;
          }
          else if (get.itemtype(v) == 'player') {
            next.source = v;
          }
          else if (typeof v == 'object' && v && v.name) {
            next.card = v;
          }
          else if (v == 'nocard') {
            nocard = true;
          }
          else if (v == 'nosource') {
            nosource = true;
          }
          else if (v == 'notrigger') {
            next._triggered = null;
            next.notrigger = true;
          }
          else if (v === 'nofatal') {
            next.nofatal = true
          }
          else if (get.itemtype(v) == 'nature') {
            next.nature = v;
          }
        }
        if (next.card == undefined && !nocard) next.card = Evt.card;
        if (next.cards == undefined && !nocard) next.cards = Evt.cards;
        if (next.source == undefined && !nosource) next.source = Evt.player;
        if (next.source && next.source.isDead()) delete next.source;
        if (next.num == undefined) next.num = 1;
        if (next.nature == 'poison') delete next._triggered;
        next.setContent('damage');
        next.filterStop = function () {
          if (this.source && this.source.isDead()) delete this.source;
          if (this.num <= 0) {
            delete this.filterStop;
            this.trigger('damageZero');
            this.finish();
            this._triggered = null;
            return true;
          }
        };
        return next;
      },
      recover: function () {
        var next = game.createEvent('recover');
        next.player = this;
        var nocard, nosource;
        var Evt = _status.event;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'cards') {
            next.cards = arguments[i].slice(0);
          }
          else if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (typeof arguments[i] == 'object' && arguments[i] && arguments[i].name) {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'number') {
            next.num = arguments[i];
          }
          else if (arguments[i] == 'nocard') {
            nocard = true;
          }
          else if (arguments[i] == 'nosource') {
            nosource = true;
          }
        }
        if (next.card == undefined && !nocard) next.card = Evt.card;
        if (next.cards == undefined && !nocard) next.cards = Evt.cards;
        if (next.source == undefined && !nosource) next.source = Evt.player;
        if (next.num == undefined) next.num = 1;
        if (next.num <= 0) _status.event.next.remove(next);
        next.setContent('recover');
        return next;
      },
      doubleDraw: function () {
        if (get.is.changban()) return;
        var next = game.createEvent('doubleDraw');
        next.player = this;
        next.setContent('doubleDraw');
        return next;
      },
      loseHp: function (num) {
        var next = game.createEvent('loseHp');
        next.num = num;
        next.player = this;
        if (next.num == undefined) next.num = 1;
        next.setContent('loseHp');
        return next;
      },
      loseMaxHp: function () {
        var next = game.createEvent('loseMaxHp');
        next.player = this;
        var nosource;
        var Evt = _status.event;
        next.num = 1;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (typeof arguments[i] === 'number') {
            next.num = arguments[i];
          }
          else if (typeof arguments[i] === 'boolean') {
            next.forced = arguments[i];
          }
          else if (arguments[i] == 'nosource') {
            nosource = true;
          }
        }
        if (next.source == undefined && !nosource) next.source = Evt.player;
        next.setContent('loseMaxHp');
        return next;
      },
      gainMaxHp: function () {
        var next = game.createEvent('gainMaxHp');
        next.player = this;
        var nosource;
        var Evt = _status.event;
        next.num = 1;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] === 'number') {
            next.num = arguments[i];
          }
          else if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (typeof arguments[i] === 'boolean') {
            next.forced = arguments[i];
          }
          else if (arguments[i] == 'nosource') {
            nosource = true;
          }
        }
        if (next.source == undefined && !nosource) next.source = Evt.player;
        next.setContent('gainMaxHp');
        return next;
      },
      changeHp: function (num, popup) {
        var next = game.createEvent('changeHp', false);
        next.num = num;
        if (popup != undefined) next.popup = popup;
        next.player = this;
        next.setContent('changeHp');
        return next;
      },

      changeHujia: function (num, type) {
        var next = game.createEvent('changeHujia');
        if (typeof num != 'number') {
          num = 1;
        }
        next.num = num;
        next.player = this;
        if (type) next.type = type;
        next.setContent('changeHujia');
        return next;
      },
      getBuff: function () {
        var list = [1, 2, 3, 4, 5, 6];
        var nodelay = false;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            list.remove(arguments[i]);
          }
          else if (arguments[i] === false) {
            nodelay = true;
          }
        }
        if (this.isHealthy()) {
          list.remove(2);
        }
        if (!this.countCards('j')) {
          list.remove(5);
        }
        if (!this.isLinked() && !this.isTurnedOver()) {
          list.remove(6);
        }
        if (this.hasSkill('qianxing')) {
          list.remove(4);
        }
        switch (list.randomGet()) {
          case 1: this.draw(nodelay ? 'nodelay' : 1); break;
          case 2: this.recover(); break;
          case 3: this.changeHujia(); break;
          case 4: this.tempHide();
          case 5: this.discard(this.getCards('j')).delay = (!nodelay); break;
          case 6: {
            if (this.isLinked()) this.link();
            if (this.isTurnedOver()) this.turnOver();
            break;
          }
        }
        return this;
      },
      getDebuff: function () {
        var list = [1, 2, 3, 4, 5, 6];
        var nodelay = false;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'number') {
            list.remove(arguments[i]);
          }
          else if (arguments[i] === false) {
            nodelay = true;
          }
        }
        if (this.countCards('he') == 0) {
          list.remove(1);
        }
        if (this.isLinked()) {
          list.remove(4);
        }
        if (this.hasSkill('fengyin')) {
          list.remove(5);
        }
        if (this.hp == 1) {
          list.remove(3);
          if (list.length > 1) list.remove(2);
        }
        if (!list.length) return this;
        var num = list.randomGet();
        switch (list.randomGet()) {
          case 1: this.randomDiscard(nodelay ? false : 'he'); break;
          case 2: this.loseHp(); break;
          case 3: this.damage(); break;
          case 4: if (!this.isLinked()) this.link(); break;
          case 5: this.addTempSkill('fengyin', { player: 'phaseAfter' }); break;
          case 6: {
            var list = [];
            for (var i = 0; i < lib.inpile.length; i++) {
              var info = lib.card[lib.inpile[i]];
              if (info.type == 'delay' && !info.cancel && !this.hasJudge(lib.inpile[i])) {
                list.push(lib.inpile[i]);
              }
            }
            if (list.length) {
              var card = game.createCard(list.randomGet());
              this.addJudge(card);
              this.$draw(card);
              if (!nodelay) game.delay();
            }
            else {
              this.getDebuff(6);
            }
            break;
          }
        }
        return this;
      },
      dying: function (reason) {
        if (this.nodying || this.hp > 0 || this.isDying()) return;
        var next = game.createEvent('dying');
        next.player = this;
        next.reason = reason;
        if (reason && reason.source) next.source = reason.source;
        next.setContent('dying');
        next.filterStop = function () {
          if (this.player.hp > 0) {
            delete this.filterStop;
            return true;
          }
        };
        return next;
      },
      die: function (reason) {
        var next = game.createEvent('die');
        next.player = this;
        next.reason = reason;
        if (reason) next.source = reason.source;
        next.setContent('die');
        return next;
      },
      revive: function (hp, log) {
        if (log !== false) game.log(this, '复活');
        if (this.maxHp < 1) this.maxHp = 1;
        if (hp) this.hp = hp;
        else {
          this.hp = 1;
        }
        game.addVideo('revive', this);
        this.classList.remove('dead');
        this.removeAttribute('style');
        this.node.avatar.style.transform = '';
        this.node.avatar2.style.transform = '';
        this.node.hp.show();
        this.node.equips.show();
        this.node.count.show();
        this.update();
        var player;
        player = this.previousSeat;
        while (player.isDead()) player = player.previousSeat;
        player.next = this;
        this.previous = player;
        player = this.nextSeat;
        while (player.isDead()) player = player.nextSeat;
        player.previous = this;
        this.next = player;
        game.players.add(this);
        game.dead.remove(this);
        if (this == game.me) {
          if (ui.auto) ui.auto.show();
          if (ui.wuxie) ui.wuxie.show();
          if (ui.revive) {
            ui.revive.close();
            delete ui.revive;
          }
          if (ui.exit) {
            ui.exit.close();
            delete ui.exit;
          }
          if (ui.swap) {
            ui.swap.close();
            delete ui.swap;
          }
          if (ui.restart) {
            ui.restart.close();
            delete ui.restart;
          }
          if (ui.continue_game) {
            ui.continue_game.close();
            delete ui.continue_game;
          }
        }
      },
      /**
       * 返回本角色是否处于混乱状态
       * @returns {!boolean}
       */
      isMad: function () {
        return this.hasSkill('mad');
      },
      /**
       * 令本角色进入混乱状态；
       * 此函数会输出日志
       * @param {(string|Object)} [end] 结束时点，下一次触发该时点时结束本角色结束混乱状态；如果未指定，默认为'phaseAfter'
       */
      goMad: function (end) {
        if (end) {
          this.addTempSkill('mad', end);
        }
        else {
          this.addSkill('mad');
        }
        game.log(this, '进入混乱状态');
      },
      /**
       * 令本角色移除混乱状态
       */
      unMad: function () {
        this.removeSkill('mad');
      },
      tempHide: function () {
        this.addTempSkill('qianxing', { player: 'phaseBegin' });
      },
      addExpose: function (num) {
        if (typeof this.ai.shown == 'number' && !this.identityShown && this.ai.shown < 1) {
          this.ai.shown += num;
          if (this.ai.shown > 0.95) {
            this.ai.shown = 0.95;
          }
        }
        return this;
      },
      equip: function (card, arg2) {
        if (get.type(card) != 'equip') return;
        var next = game.createEvent('equip');
        next.card = card;
        if (get.is.object(next.card) && get.itemtype(next.card.cards) == 'cards' && get.name(next.card.cards[0]) == next.card.name && next.card.cards.length == 1) next.card = next.card.cards[0];
        next.player = this;
        if (arg2) {
          if (arg2 === true) {
            next.draw = true;
          } else {
            next.cards = arg2;
          }
        }
        if (!next.cards) next.cards = [next.card];
        if (get.itemtype(next.cards) == 'card') next.cards = [next.cards];
        next.setContent(lib.element.content.equip);
        next.getl = function (player) {
          var that = this;
          var map = {
            player: player,
            hs: [],
            es: [],
            js: [],
            ss: [],
            xs: [],
            cards: [],
            cards2: [],
          };
          player.getHistory('lose', function (evt) {
            if (evt.parent == that) {
              map.hs.addArray(evt.hs);
              map.es.addArray(evt.es);
              map.js.addArray(evt.js);
              map.ss.addArray(evt.ss);
              map.xs.addArray(evt.xs);
              map.cards.addArray(evt.cards);
              map.cards2.addArray(evt.cards2);
            }
          });
          if (map.cards.length > 0 || map.ss.length > 0 || map.xs.length > 0) return map;
        };
        return next;
      },
      addJudge: function (card, cards) {
        var next = game.createEvent('addJudge');
        next.card = card;
        next.cards = cards;
        if (next.cards == undefined) next.cards = [card];
        if (get.itemtype(next.cards) == 'card') next.cards = [next.cards];
        next.player = this;
        next.setContent('addJudge');
        next.getl = function (player) {
          var that = this;
          var map = {
            player: player,
            hs: [],
            es: [],
            js: [],
            ss: [],
            xs: [],
            cards: [],
            cards2: [],
          };
          player.getHistory('lose', function (evt) {
            if (evt.parent == that) {
              map.hs.addArray(evt.hs);
              map.es.addArray(evt.es);
              map.js.addArray(evt.js);
              map.ss.addArray(evt.ss);
              map.xs.addArray(evt.xs);
              map.cards.addArray(evt.cards);
              map.cards2.addArray(evt.cards2);
            }
          });
          if (map.cards.length > 0 || map.ss.length > 0 || map.xs.length > 0) return map;
        };
        return next;
      },
      canAddJudge: function (card) {
        if (this.storage._disableJudge) return false;
        var name;
        if (typeof card == 'string') {
          name = card;
        }
        else {
          name = card.viewAs || card.name;
        }
        if (!name) return false;
        if (this.hasJudge(name)) return false;
        var mod = game.checkMod(card, this, this, 'unchanged', 'targetEnabled', this);
        if (mod != 'unchanged') return mod;
        return true;
      },
      addJudgeNext: function (card) {
        if (!card.expired) {
          var target = this.next;
          var name = card.viewAs || card.name;
          var bool = false;
          for (var iwhile = 0; iwhile < 20; iwhile++) {
            if (target.canAddJudge(card)) {
              bool = true; break;
            }
            target = target.next;
          }
          if (!bool) {
            game.log(card, '进入了弃牌堆');
            game.cardsDiscard(card);
          }
          else {
            if (card.name != name) {
              target.addJudge(name, card);
            }
            else {
              target.addJudge(card);
            }
          }
        }
        else {
          card.expired = false;
        }
      },
      /**
       * 判定事件
       * @returns {!boolean}
       */
      judge: function () {
        var next = game.createEvent('judge');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'card') {
            next.card = arguments[i];
          }
          else if (typeof arguments[i] == 'string') {
            next.skill = arguments[i];
          }
          else if (typeof arguments[i] == 'function') {
            next.judge = arguments[i];
          }
          else if (typeof arguments[i] == 'boolean') {
            next.clearArena = arguments[i];
          }
          else if (get.objtype(arguments[i]) == 'div') {
            next.position = arguments[i];
          }
        }
        if (next.card && next.judge == undefined) {
          next.judge = get.judge(next.card);
        }
        if (next.judge == undefined) next.judge = function () { return 0 };
        if (next.position == undefined) next.position = ui.discardPile;
        if (next.card) next.cardname = next.card.viewAs || next.card.name;

        var str = '';
        if (next.card) str = get.translation(next.card.viewAs || next.card.name);
        else if (next.skill) str = get.translation(next.skill);
        else str = get.translation(_status.event.name);
        next.judgestr = str;
        next.setContent('judge');
        return next;
      },
      /**
       * 翻面事件
       * @returns {!boolean}
       */
      turnOver: function (bool) {
        if (typeof bool == 'boolean') {
          if (bool) {
            if (this.isTurnedOver()) return;
          }
          else {
            if (!this.isTurnedOver()) return;
          }
        }
        var next = game.createEvent('turnOver');
        next.player = this;
        var nosource;
        var Evt = _status.event;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (arguments[i] == 'nosource') {
            nosource = true;
          }
        }
        if (next.source == undefined && !nosource) next.source = Evt.player;
        next.setContent('turnOver');
        return next;
      },
      out: function (skill) {
        if (typeof skill == 'number') {
          this.outCount += skill;
        }
        else if (typeof skill == 'string') {
          if (!this.outSkills) {
            this.outSkills = [];
          }
          this.outSkills.add(skill);
        }
        else {
          this.outCount++;
        }
        if (!this.classList.contains('out')) {
          this.classList.add('out');
          game.log(this, '离开游戏');
        }
        if (!game.countPlayer()) {
          game.over();
        }
      },
      in: function (skill) {
        if (this.isOut()) {
          if (typeof skill == 'string') {
            if (this.outSkills) {
              this.outSkills.remove(skill);
              if (!this.outSkills.length) {
                delete this.outSkills;
              }
            }
          }
          else if (typeof skill == 'number') {
            this.outCount -= skill;
          }
          else {
            if (skill === true) {
              delete this.outSkills;
            }
            this.outCount = 0;
          }
          if (this.outCount <= 0 && !this.outSkills) {
            this.outCount = 0;
            this.classList.remove('out');
            game.log(this, '进入游戏');
          }
        }
      },
      /**
       * 横置事件
       * @returns {!boolean}
       */
      link: function (bool) {
        if (typeof bool == 'boolean') {
          if (bool) {
            if (this.isLinked()) return;
          }
          else {
            if (!this.isLinked()) return;
          }
        }
        var next = game.createEvent('link');
        next.player = this;
        var nosource;
        var Evt = _status.event;
        for (var i = 0; i < arguments.length; i++) {
          if (get.itemtype(arguments[i]) == 'player') {
            next.source = arguments[i];
          }
          else if (arguments[i] == 'nosource') {
            nosource = true;
          }
        }
        if (next.source == undefined && !nosource) next.source = Evt.player;
        next.setContent('link');
        return next;
      },
      skip: function (name) {
        this.skipList.add(name);
      },
      wait: function (callback) {
        if (lib.node) {
          if (typeof callback == 'function') {
            callback._noname_waiting = true;
            lib.node.torespond[this.playerid] = callback;
          }
          else {
            lib.node.torespond[this.playerid] = '_noname_waiting';
          }
          clearTimeout(lib.node.torespondtimeout[this.playerid]);
          if (this.ws && !this.ws.closed) {
            var player = this;
            var time = parseInt(lib.configOL.choose_timeout) * 1000;
            if (ui.arena && ui.arena.classList.contains('choose-character') && lib.configOL.chooseCharacter_timeout) {
              time *= 5;
            }
            if (_status.event.getParent().skillHidden) {
              for (var i = 0; i < game.players.length; i++) {
                game.players[i].showTimer(time);
              }
              player._hide_all_timer = true;
            }
            else if (!_status.event._global_waiting) {
              player.showTimer(time);
            }
            lib.node.torespondtimeout[this.playerid] = setTimeout(function () {
              player.unwait('ai');
              player.ws.ws.close();
            }, time + 5000);
          }
        }
      },
      unwait: function (result) {
        if (this._hide_all_timer) {
          delete this._hide_all_timer;
          for (var i = 0; i < game.players.length; i++) {
            game.players[i].hideTimer();
          }
        }
        else if (!_status.event._global_waiting) {
          this.hideTimer();
        }
        clearTimeout(lib.node.torespondtimeout[this.playerid]);
        delete lib.node.torespondtimeout[this.playerid];
        if (!lib.node.torespond.hasOwnProperty(this.playerid)) {
          return;
        }
        var noresume = false;
        var proceed = null;
        if (typeof lib.node.torespond[this.playerid] == 'function' && lib.node.torespond[this.playerid]._noname_waiting) {
          proceed = lib.node.torespond[this.playerid](result, this);
          if (proceed === false) {
            noresume = true;
          }
        }
        lib.node.torespond[this.playerid] = result;
        for (var i in lib.node.torespond) {
          if (lib.node.torespond[i] == '_noname_waiting') {
            return;
          }
          else if (lib.node.torespond[i] && lib.node.torespond[i]._noname_waiting) {
            return;
          }
        }
        _status.event.result = result;
        _status.event.resultOL = lib.node.torespond;
        lib.node.torespond = {};
        if (typeof proceed == 'function') proceed();
        else if (_status.paused && !noresume) game.resume();
      },
      /**
       * 
       * @returns {!boolean}
       */
      logSkill: function (name, targets, nature, logv, audio) {
        if (get.itemtype(targets) == 'player') targets = [targets];
        var nopop = false;
        var popname = name;
        if (Array.isArray(name)) {
          popname = name[1];
          name = name[0];
        }
        var checkShow = this.checkShow(name);
        if (lib.translate[name]) {
          this.trySkillAnimate(name, popname, checkShow);
          if (typeof targets == 'object' && targets.length) {
            var str;
            if (targets[0] == this) {
              str = '#b自己';
              if (targets.length > 1) {
                str += '、';
                str += get.translation(targets.slice(1));
              }
            }
            else str = targets;
            game.log(this, '对', str, '发动了', '#p『' + get.skillTranslation(name, this) + '』');
          }
          else {
            game.log(this, '发动了', '#p『' + get.skillTranslation(name, this) + '』');
          }
        }
        if (nature != false) {
          if (nature === undefined) {
            nature = 'green';
          }
          this.line(targets, nature);
        }
        var info = lib.skill[name];
        if (info && info.ai && info.ai.expose != undefined &&
          this.logAi && (!targets || targets.length != 1 || targets[0] != this)) {
          this.logAi(lib.skill[name].ai.expose);
        }
        if (info && info.round) {
          var roundname = name + '_roundcount';
          this.storage[roundname] = info.round;
          if (!this.hasSkill(roundname)) this.addSkill(roundname)
          // this.storage[roundname] = game.roundNumber;
          this.syncStorage(roundname);
          this.markSkill(roundname);
        }
        if (audio !== false) {
          game.trySkillAudio(name, this, true);
        }
        if (game.chess) {
          this.chessFocus();
        }
        if (logv === true) {
          game.logv(this, name, targets, null, true);
        }
        else if (info && info.logv !== false) {
          game.logv(this, name, targets);
        }
        if (this._hookTrigger) {
          for (var i = 0; i < this._hookTrigger.length; i++) {
            var info = lib.skill[this._hookTrigger[i]].hookTrigger;
            if (info && info.log) {
              info.log(this, name, targets);
            }
          }
        }
      },
      unprompt: function () {
        if (this.node.prompt) {
          this.node.prompt.delete();
          delete this.node.prompt;
        }
      },
      prompt: function (str, nature) {
        var node;
        if (this.node.prompt) {
          node = this.node.prompt;
          node.innerHTML = '';
          node.className = 'damage normal-font damageadded';
        }
        else {
          node = ui.create.div('.damage.normal-font', this);
          this.node.prompt = node;
          ui.refresh(node);
          node.classList.add('damageadded');
        }
        node.innerHTML = str;
        node.dataset.nature = nature || 'soil';
      },
      prompt_old: function (name2, className) {
        var node;
        if (this.node.prompt) {
          node = this.node.prompt;
          node.innerHTML = '';
          node.className = 'popup';
        }
        else {
          node = ui.create.div('.popup', this.parentNode);
          this.node.prompt = node;
        }
        node.dataset.position = this.dataset.position;
        if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
          typeof name2 == 'number' || this.classList.contains('minskin')) {
          node.innerHTML = name2;
        }
        else {
          for (var i = 0; i < name2.length; i++) {
            node.innerHTML += name2[i] + '<br/>';
          }
        }
        if (className) {
          node.classList.add(className);
        }
      },
      /**
       * 文字弹出动画效果
       * [recommend] 令人迷惑的是，此函数实质调用了{@link lib.element.player.$damagepop}，而不是{@link lib.element.player.$damagepop}调用此函数
       * @param {!string} name (技能|角色|游戏牌)名或其他任意非空字符串
       * @param {string} [className='water'] 效果色
       * @param {?boolean} [nobroadcast] 如果为true，则
       */
      popup: function (name, className, nobroadcast) {
        var name2 = get.translation(name);
        if (!name2) return;
        this.$damagepop(name2, className || 'water', true, nobroadcast);
      },
      popup_old: function (name, className) {
        var name2 = get.translation(name);
        var node = ui.create.div('.popup', this.parentNode);
        if (!name2) {
          node.remove();
          return node;
        }
        game.addVideo('popup', this, [name, className]);
        node.dataset.position = this.dataset.position;
        if (this.dataset.position == 0 || parseInt(this.dataset.position) == parseInt(ui.arena.dataset.number) / 2 ||
          typeof name2 == 'number' || this.classList.contains('minskin')) {
          node.innerHTML = name2;
        }
        else {
          for (var i = 0; i < name2.length; i++) {
            node.innerHTML += name2[i] + '<br/>';
          }
        }
        if (className) {
          node.classList.add(className);
        }
        this.popups.push(node);
        if (this.popups.length > 1) {
          node.hide();
        }
        else {
          var that = this;
          setTimeout(function () { that._popup(); }, 1000);
        }
        return node;
      },
      _popup: function () {
        if (this.popups.length) {
          this.popups.shift().delete();
          if (this.popups.length) {
            this.popups[0].show();
            var that = this;
            setTimeout(function () { that._popup(); }, 1000);
          }
        }
      },
      showTimer: function (time) {
        if (!time && lib.configOL) {
          time = parseInt(lib.configOL.choose_timeout) * 1000;
        }
        // if(ui.arena&&ui.arena.classList.contains('choose-character')&&lib.configOL.chooseCharacter_timeout){
        // 	time *= 5;
        // }
        if (_status.connectMode && !game.online) {
          game.broadcast(function (player, time) {
            player.showTimer(time);
          }, this, time);
        }
        if (this == game.me) {
          return;
        }
        if (this.node.timer) {
          this.node.timer.remove();
        }
        var timer = ui.create.div('.timerbar', this);
        this.node.timer = timer;
        ui.create.div(this.node.timer);
        var bar = ui.create.div(this.node.timer);
        ui.refresh(bar);
        bar.style.transitionDuration = (time / 1000) + 's';
        bar.style.width = 0;
      },
      hideTimer: function () {
        if (_status.connectMode && !game.online && this.playerid) {
          game.broadcast(function (player) {
            player.hideTimer();
          }, this);
        }
        if (this.node.timer) {
          this.node.timer.delete();
          delete this.node.timer;
        }
      },
      markAuto: function (name, info) {
        if (Array.isArray(info)) {
          if (!Array.isArray(this.storage[name])) this.storage[name] = [];
          this.storage[name].addArray(info);
          this.markSkill(name);
        }
        else {
          var storage = this.storage[name];
          if (Array.isArray(storage)) {
            this[storage.length > 0 ? 'markSkill' : 'unmarkSkill'](name);
          }
          else if (typeof storage == 'number') {
            this[storage.length > 0 ? 'markSkill' : 'unmarkSkill'](name);
          }
        }
      },
      unmarkAuto: function (name, info) {
        var storage = this.storage[name]
        if (Array.isArray(info) && Array.isArray(storage)) {
          storage.removeArray(info.slice(0));
          this.markAuto(name);
        }
      },
      getExpansions: function (tag) {
        return this.getCards('x', (card) => card.hasGaintag(tag));
      },
      getStorage: function (name) {
        return this.storage[name] || [];
      },
      markSkill: function (name, info, card) {
        if (info === true) {
          this.syncStorage(name);
          info = null;
        }
        if (get.itemtype(card) == 'card') {
          game.addVideo('markSkill', this, [name, get.cardInfo(card)]);
        }
        else {
          game.addVideo('markSkill', this, [name]);
        }
        game.broadcastAll(function (storage, player, name, info, card) {
          if (storage != undefined) {
            player.storage[name] = storage;
          }
          if (!info) {
            if (player.marks[name]) {
              player.updateMarks();
              return;
            }
            if (lib.skill[name]) {
              info = lib.skill[name].intro;
            }
            if (!info) {
              return;
            }
          }
          if (player.marks[name]) {
            player.marks[name].info = info;
          }
          else {
            if (card) {
              player.marks[name] = player.mark(card, info, name);
            }
            else {
              player.marks[name] = player.mark(name, info);
            }
          }
          player.updateMarks();
        }, this.storage[name], this, name, info, card);
        return this;
      },
      unmarkSkill: function (name) {
        game.addVideo('unmarkSkill', this, name);
        game.broadcast(function (player, name) {
          if (player.marks[name]) {
            player.marks[name].delete();
            player.marks[name].style.transform += ' scale(0.2)';
            delete player.marks[name];
            ui.updatem(player);
          }
        }, this, name);
        if (this.marks[name]) {
          this.marks[name].delete();
          this.marks[name].style.transform += ' scale(0.2)';
          delete this.marks[name];
          ui.updatem(this);
          var info = lib.skill[name];
          if (info && info.intro && info.intro.onunmark) {
            if (info.intro.onunmark == 'throw') {
              if (get.itemtype(this.storage[name]) == 'cards') {
                this.$throw(this.storage[name], 1000);
                game.cardsDiscard(this.storage[name]);
                game.log(this.storage[name], '进入了弃牌堆');
                this.storage[name].length = 0;
              }
            }
            else if (typeof info.intro.onunmark == 'function') {
              info.intro.onunmark(this.storage[name], this);
            }
          }
        }
        return this;
      },
      markSkillCharacter: function (id, target, name, content) {
        if (typeof target == 'object') {
          target = target.name;
        }
        game.broadcastAll(function (player, target, name, content, id) {
          if (player.marks[id]) {
            player.marks[id].name = name + '_charactermark';
            player.marks[id]._name = target;
            player.marks[id].info = {
              name: name,
              content: content,
              id: id
            };
            player.marks[id].setBackground(target, 'character');
            game.addVideo('changeMarkCharacter', player, {
              id: id,
              name: name,
              content: content,
              target: target
            });
          }
          else {
            player.marks[id] = player.markCharacter(target, {
              name: name,
              content: content,
              id: id
            });
            player.marks[id]._name = target;
            game.addVideo('markCharacter', player, {
              name: name,
              content: content,
              id: id,
              target: target
            });
          }
        }, this, target, name, content, id);
        return this;
      },
      markCharacter: function (name, info, learn, learn2) {
        if (typeof name == 'object') {
          name = name.name;
        }
        var node;
        if (name.indexOf('unknown') == 0) {
          node = ui.create.div('.card.mark.drawinghidden');
          ui.create.div('.background.skillmark', node).innerHTML = get.translation(name)[0];
        }
        else {
          if (!lib.character[name]) return;
          node = ui.create.div('.card.mark.drawinghidden').setBackground(name, 'character');
        }
        this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
        node.name = name + '_charactermark';
        if (!info) {
          info = {};
        }
        if (!info.name) {
          info.name = get.translation(name);
        }
        if (!info.content) {
          info.content = get.skillintro(name, learn, learn2)
        }
        node.info = info;
        node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
        if (!lib.config.touchscreen) {
          if (lib.config.hover_all) {
            lib.setHover(node, ui.click.hoverplayer);
          }
          if (lib.config.right_info) {
            node.oncontextmenu = ui.click.rightplayer;
          }
        }
        ui.updatem(this);
        return node;
      },
      /**
       * 标记
       * @function
       * @param {(Array<Card>|Card|string)} name 
       * @param {*} info mark info
       * @param {*} skill 
       * @returns {*}
       */
      mark: function (name, info, skill) {
        if (get.itemtype(name) == 'cards') {
          var marks = [];
          for (var i = 0; i < name.length; i++) {
            marks.push(this.mark(name[i], info));
          }
          return marks;
        }
        else {
          var node;
          if (get.itemtype(name) == 'card') {
            node = name.copy('mark');
            node.classList.add('drawinghidden');
            this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
            node.suit = name.suit;
            node.number = name.number;
            // if(name.name&&lib.card[name.name]&&lib.card[name.name].markimage){
            //     node.node.image.style.left=lib.card[name.name].markimage;
            // }

            if (name.classList.contains('fullborder')) {
              node.classList.add('fakejudge');
              node.classList.add('fakemark');
              (node.querySelector('.background') || ui.create.div('.background', node)).innerHTML = lib.translate[name.name + '_bg'] || get.translation(name.name)[0];
            }

            name = name.name;
          }
          else {
            node = ui.create.div('.card.mark.drawinghidden');
            this.node.marks.insertBefore(node, this.node.marks.childNodes[1]);
            var str = lib.translate[name + '_bg'];
            if (!str || str[0] == '+' || str[0] == '-') {
              str = get.translation(name)[0];
            }
            ui.create.div('.background.skillmark', node).innerHTML = str;
          }
          node.name = name;
          node.skill = skill || name;
          if (typeof info == 'object') {
            node.info = info;
          }
          else if (typeof info == 'string') {
            node.markidentifer = info;
          }
          node.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.card);
          if (!lib.config.touchscreen) {
            if (lib.config.hover_all) {
              lib.setHover(node, ui.click.hoverplayer);
            }
            if (lib.config.right_info) {
              node.oncontextmenu = ui.click.rightplayer;
            }
          }
          this.updateMarks();
          ui.updatem(this);
          return node;
        }
      },
      /**
       * 取消标记
       * @function
       * @param {*} name
       * @param {*} info
       */
      unmark: function (name, info) {
        game.addVideo('unmarkname', this, name);
        if (get.itemtype(name) == 'card') {
          this.unmark(name.name, info);
        }
        else if (get.itemtype(name) == 'cards') {
          for (var i = 0; i < name.length; i++) {
            this.unmark(name[i].name, info);
          }
        }
        else {
          for (var i = 0; i < this.node.marks.childNodes.length; i++) {
            if (this.node.marks.childNodes[i].name == name &&
              (!info || this.node.marks.childNodes[i].markidentifer == info)) {
              this.node.marks.childNodes[i].delete();
              this.node.marks.childNodes[i].style.transform += ' scale(0.2)';
              ui.updatem(this);
              return;
            }
          }
        }
      },
      addLink: function () {
        if (get.is.linked2(this)) {
          this.classList.add('linked2');
        }
        else {
          this.classList.add('linked');
        }
      },
      removeLink: function () {
        if (get.is.linked2(this)) {
          this.classList.remove('linked2');
        }
        else {
          this.classList.remove('linked');
        }
      },
      /**
       * 返回一张牌当前本角色是否可以(对目标角色)使用
       * @returns {!boolean}
       */
      canUse: function (card, target, distance, includecard) {
        if (typeof card == 'string') card = { name: card, isCard: true };
        var info = get.info(card);
        if (info.multicheck && !info.multicheck(card, this)) return false;
        if (!lib.filter.cardEnabled(card, this)) return false;
        if (distance !== false && !lib.filter.targetInRange(card, this, target)) return false;
        return lib.filter[includecard ? 'targetEnabledx' : 'targetEnabled'](card, this, target);
      },
      /**
       * 返回一张牌当前本角色是否可以使用
       * @returns {!boolean}
       */
      hasUseTarget: function (card, distance, includecard) {
        var player = this;
        return game.hasPlayer(function (current) {
          return player.canUse(card, current, distance, includecard);
        });
      },
      /**
       * 返回一张牌当前本角色使用的收益为正收益，当前可以使用，且有使用对象
       * @returns {!boolean}
       */
      hasValueTarget: function () {
        return this.getUseValue.apply(this, arguments) > 0;
      },
      /**
       * 返回一张牌当前本角色使用的收益
       * @returns {!boolean}
       */
      getUseValue: function (card, distance, includecard) {
        if (typeof (card) == 'string') {
          card = { name: card, isCard: true };
        }
        var player = this;
        var targets = game.filterPlayer();
        var value = [];
        var min = 0;
        var info = get.info(card);
        if (!info || info.notarget) return 0;
        var range;
        var select = get.copy(info.selectTarget);
        if (select == undefined) {
          if (info.filterTarget == undefined) return true;
          range = [1, 1];
        }
        else if (typeof select == 'number') range = [select, select];
        else if (get.itemtype(select) == 'select') range = select;
        else if (typeof select == 'function') range = select(card, player);
        if (info.singleCard) range = [1, 1];
        game.checkMod(card, player, range, 'selectTarget', player);
        if (!range) return 0;

        for (var i = 0; i < targets.length; i++) {
          if (player.canUse(card, targets[i], distance, includecard)) {
            var eff = get.effect(targets[i], card, player, player);
            value.push(eff);
          }
        }
        value.sort(function (a, b) {
          return b - a;
        });
        for (var i = 0; i < value.length; i++) {
          if (i == range[1] || range[1] != -1 && value[i] <= 0) break;
          min += value[i];
        }
        return min;
      },
      /**
       * 
       * @returns {!boolean}
       */
      addSubPlayer: function (cfg) {
        var skill = 'subplayer_' + cfg.name + '_' + get.id();
        game.log(this, '获得了随从', '#g' + get.translation(cfg.name))
        cfg.hs = cfg.hs || [];
        cfg.es = cfg.es || [];
        cfg.skills = cfg.skills || [];
        cfg.hp = cfg.hp || 1;
        cfg.maxHp = cfg.maxHp || 1;
        cfg.sex = cfg.sex || 'male';
        cfg.group = cfg.group || 'qun';
        cfg.skill = cfg.skill || _status.event.name;
        if (!cfg.source) {
          if (this.hasSkill(_status.event.name) && this.name2 && lib.character[this.name2] &&
            lib.character[this.name2][3].contains(_status.event.name)) {
            cfg.source = this.name2;
          }
          else {
            cfg.source = this.name;
          }
        }
        game.broadcastAll(function (player, skill, cfg) {
          lib.skill[skill] = {
            intro: {
              content: cfg.intro || ''
            },
            mark: 'character',
            subplayer: cfg.skill,
            ai: {
              subplayer: true
            }
          }
          lib.character[skill] = [cfg.sex, cfg.group, cfg.maxHp, cfg.skills, ['character:' + cfg.name]];
          lib.translate[skill] = cfg.caption || get.rawName(cfg.name);
          player.storage[skill] = cfg;
        }, this, skill, cfg);
        game.addVideo('addSubPlayer', this, [skill, lib.skill[skill], lib.character[skill], lib.translate[skill], { name: cfg.name }]);
        this.addSkill(skill);
        return skill;
      },
      /**
       * 
       * @returns {!boolean}
       */
      removeSubPlayer: function (name) {
        if (this.hasSkill('subplayer') && this.name == name) {
          this.exitSubPlayer(true);
        }
        else {
          if (player.storage[name].onremove) {
            player.storage[name].onremove(player);
          }
          this.removeSkill(name);
          delete this.storage[name];
          game.log(player, '牺牲了随从', '#g' + name);
          _status.event.trigger('removeSubPlayer');
        }
      },
      /**
       * 
       * @returns {!boolean}
       */
      callSubPlayer: function () {
        if (this.hasSkill('subplayer')) return;
        var next = game.createEvent('callSubPlayer');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') {
            next.directresult = arguments[i];
          }
        }
        next.setContent('callSubPlayer');
        return next;
      },
      /**
       * 
       * @returns {!boolean}
       */
      toggleSubPlayer: function () {
        if (!this.hasSkill('subplayer')) return;
        var next = game.createEvent('toggleSubPlayer');
        next.player = this;
        for (var i = 0; i < arguments.length; i++) {
          if (typeof arguments[i] == 'string') {
            next.directresult = arguments[i];
          }
        }
        next.setContent('toggleSubPlayer');
        return next;
      },
      /**
       * 
       * @returns {!boolean}
       */
      exitSubPlayer: function (remove) {
        if (!this.hasSkill('subplayer')) return;
        var next = game.createEvent('exitSubPlayer');
        next.player = this;
        next.remove = remove;
        next.setContent('exitSubPlayer');
        return next;
      },
      /**
       * 
       * @returns {!boolean}
       */
      getSubPlayers: function (tag) {
        var skills = this.getSkills();
        var list = [];
        for (var i = 0; i < skills.length; i++) {
          var name = skills[i];
          var info = lib.skill[name];
          if (tag && info.subplayer != tag) continue;
          if (info.ai && info.ai.subplayer && this.storage[name] && this.storage[name].name) {
            list.push(name);
          }
        }
        return list;
      },
      /**
       * 同时将info.global内的技能添加到{@link lib.skill.global}
       * @returns {!boolean}
       */
      addSkillTrigger: function (skill, hidden, triggeronly) {
        var info = lib.skill[skill];
        if (!info) return;
        if (typeof info.group == 'string') {
          this.addSkillTrigger(info.group, hidden);
        }
        else if (Array.isArray(info.group)) {
          for (var i = 0; i < info.group.length; i++) {
            this.addSkillTrigger(info.group[i], hidden);
          }
        }
        if (!triggeronly) {
          if (info.global && (!hidden || info.globalSilent)) {
            if (typeof info.global == 'string') {
              game.addGlobalSkill(info.global, this);
            }
            else {
              for (var j = 0; j < info.global.length; j++) {
                game.addGlobalSkill(info.global[j], this);
              }
            }
          }
          if (this.initedSkills.contains(skill)) return this;
          this.initedSkills.push(skill);
          if (info.init && !_status.video) {
            info.init(this, skill);
          }
        }
        if (info.trigger && this.playerid) {
          var playerid = this.playerid;
          var setTrigger = function (i, evt) {
            if (i == 'global') {
              if (!lib.hook.globaltrigger[evt]) {
                lib.hook.globaltrigger[evt] = {};
              }
              if (!lib.hook.globaltrigger[evt][playerid]) {
                lib.hook.globaltrigger[evt][playerid] = [];
              }
              lib.hook.globaltrigger[evt][playerid].add(skill);
            }
            else {
              var name = playerid + '_' + i + '_' + evt;
              if (!lib.hook[name]) {
                lib.hook[name] = [];
              }
              lib.hook[name].add(skill);
            }
            lib.hookmap[evt] = true;
          }
          for (var i in info.trigger) {
            if (typeof info.trigger[i] == 'string') {
              setTrigger(i, info.trigger[i]);
            }
            else if (Array.isArray(info.trigger[i])) {
              for (var j = 0; j < info.trigger[i].length; j++) {
                setTrigger(i, info.trigger[i][j]);
              }
            }
          }
        }
        if (info.hookTrigger) {
          if (!this._hookTrigger) {
            this._hookTrigger = [];
          }
          this._hookTrigger.add(skill);
        }
        if (_status.event && _status.event.addTrigger) _status.event.addTrigger(skill, this);
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      addSkillLog: function (skill) {
        this.addSkill(skill);
        this.popup(skill);
        game.log(this, '获得了技能', '#g『' + get.translation(skill) + '』');
      },
      /**
       * 添加一组技能
       * @name lib.element.player.addSkill
       * @function
       * @param {Array<string>} skills 技能名数组
       * @param {?boolean} [checkConflict] 是否检测冲突，如果为true，添加技能完成后检测；如果为false或未指定，不检测
       * @param {?boolean} [nobroadcast] 如果为true，直接添加技能；如果为false或未指定，调用{@link game.broadcast}为本角色添加技能
       * @returns {string} 如果添加技能成功，返回技能名`skill`；如果失败，返回undefined
       * @see {@link lib.element.player.addSkill(2)}
       */
      /**
       * 本角色添加技能
       * @name lib.element.player.addSkill
       * @function
       * @variation 2
       * @param {!string} skill 技能名
       * @param {?boolean} [checkConflict] 是否检测冲突，如果为true，添加技能完成后检测；如果为false或未指定，不检测
       * @param {?boolean} [nobroadcast] 如果为true，直接添加技能；如果为false或未指定，调用{@link game.broadcast}为本角色添加技能
       * @returns {string} 如果添加技能成功，返回技能名`skill`；如果失败，返回undefined
       */
      addSkill: function (skill, checkConflict, nobroadcast) {
        if (Array.isArray(skill)) {
          for (var i = 0; i < skill.length; i++) {
            this.addSkill(skill[i]);
          }
        }
        else {
          if (this.skills.contains(skill)) return;
          var info = lib.skill[skill];
          if (!info) return;
          if (!nobroadcast) {
            game.broadcast(function (player, skill) {
              player.skills.add(skill);
            }, this, skill);
          }
          this.skills.add(skill);
          this.addSkillTrigger(skill);
          if (this.awakenedSkills.contains(skill)) {
            this.awakenSkill(skill);
            return;
          }
          if (info.init2 && !_status.video) {
            info.init2(this, skill);
          }
          if (info.mark) {
            if (info.mark == 'card' &&
              get.itemtype(this.storage[skill]) == 'card') {
              this.markSkill(skill, null, this.storage[skill]);
            }
            else if (info.mark == 'card' &&
              get.itemtype(this.storage[skill]) == 'cards') {
              this.markSkill(skill, null, this.storage[skill][0]);
            }
            else if (info.mark == 'image') {
              this.markSkill(skill, null, ui.create.card(null, 'noclick').init([null, null, skill]));
            }
            else if (info.mark == 'character') {
              var intro = info.intro.content;
              if (typeof intro == 'function') {
                intro = intro(this.storage[skill], this);
              }
              else if (typeof intro == 'string') {
                intro = intro.replace(/#/g, this.storage[skill]);
                intro = intro.replace(/&/g, get.cnNumber(this.storage[skill]));
                intro = intro.replace(/\$/g, get.translation(this.storage[skill]));
              }
              var caption;
              if (typeof info.intro.name == 'function') {
                caption = info.intro.name(this.storage[skill], this);
              }
              else if (typeof info.intro.name == 'string') {
                caption = info.name;
              }
              else {
                caption = get.translation(skill);
              }
              this.markSkillCharacter(skill, this.storage[skill], caption, intro);
            }
            else {
              this.markSkill(skill);
            }
          }
        }
        if (checkConflict) this.checkConflict();
        return skill;
      },
      /**
       * 
       * @returns {!boolean}
       */
      addAdditionalSkill: function (skill, skills, keep) {
        if (this.additionalSkills[skill]) {
          if (keep) {
            if (typeof this.additionalSkills[skill] == 'string') {
              this.additionalSkills[skill] = [this.additionalSkills[skill]];
            }
          }
          else {
            this.removeAdditionalSkill(skill);
            this.additionalSkills[skill] = [];
          }
        }
        else {
          this.additionalSkills[skill] = [];
        }
        if (typeof skills == 'string') {
          skills = [skills];
        }
        for (var i = 0; i < skills.length; i++) {
          this.addSkill(skills[i], null, true);
          this.skills.remove(skills[i]);
          this.additionalSkills[skill].push(skills[i]);
        }
        this.checkConflict();
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      removeAdditionalSkill: function (skill, target) {
        if (this.additionalSkills[skill]) {
          var additionalSkills = this.additionalSkills[skill];
          if (Array.isArray(additionalSkills) && typeof target == 'string') {
            if (additionalSkills.contains(target)) {
              additionalSkills.remove(target);
              this.removeSkill(target);
            }
          }
          else {
            delete this.additionalSkills[skill];
            if (typeof additionalSkills == 'string') {
              this.removeSkill(additionalSkills);
            }
            else if (Array.isArray(additionalSkills)) {
              for (var i = 0; i < additionalSkills.length; i++) {
                this.removeSkill(additionalSkills[i]);
              }
            }
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      awakenSkill: function (skill, nounmark) {
        if (!nounmark) this.unmarkSkill(skill);
        this.disableSkill(skill + '_awake', skill);
        this.awakenedSkills.add(skill);
        if (this.storage[skill] === false) this.storage[skill] = true;
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      restoreSkill: function (skill, nomark) {
        if (this.storage[skill] === true) this.storage[skill] = false;
        this.awakenedSkills.remove(skill);
        this.enableSkill(skill + '_awake', skill);
        if (!nomark) this.markSkill(skill);
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      disableSkill: function (skill, skills) {
        if (typeof skills == 'string') {
          if (!this.disabledSkills[skills]) {
            this.disabledSkills[skills] = [];
            var info = get.info(skills);
            if (info.ondisable && info.onremove) {
              info.onremove(this);
            }
          }
          this.disabledSkills[skills].add(skill);
          var group = lib.skill[skills].group;
          if (typeof group == 'string' || Array.isArray(group)) {
            this.disableSkill(skill, group);
          }
        }
        else if (Array.isArray(skills)) {
          for (var i = 0; i < skills.length; i++) {
            this.disableSkill(skill, skills[i]);
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      enableSkill: function (skill) {
        for (var i in this.disabledSkills) {
          this.disabledSkills[i].remove(skill);
          if (this.disabledSkills[i].length == 0) {
            delete this.disabledSkills[i];
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      checkMarks: function () {
        var skills = this.getSkills();
        game.expandSkills(skills);
        for (var i in this.marks) {
          if (!skills.contains(i) && !this.marks[i].info.fixed) {
            this.unmarkSkill(i);
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      addEquipTrigger: function (card) {
        if (card) {
          var info = get.info(card);
          if (info.skills) {
            for (var j = 0; j < info.skills.length; j++) {
              this.addSkillTrigger(info.skills[j]);
            }
          }
        }
        else {
          var es = this.getCards('e');
          for (var i = 0; i < es.length; i++) {
            this.addEquipTrigger(es[i]);
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      removeEquipTrigger: function (card, move) {
        if (card) {
          var info = get.info(card);
          if (move === false) {
            if (card.originalName) {
              card.classList.remove('fakejudge');
              if (get.type(card.originalName) == 'equip') {
                card.classList.remove(get.subtype(card.viewAs));
                card.classList.add(get.subtype(card.originalName));
              } else {
                card.classList.remove(get.subtype(card.viewAs));
              }
              card.name = card.originalName;
              delete card.viewAs;
              delete card.originalName;
            }
          } else {
            //	if(card.viewAs&&card.originalName&&card.originalName){
            //		card.name = card.originalName
            //	}
          }
          var skills = this.getSkills(null, false);
          if (info.skills) {
            for (var j = 0; j < info.skills.length; j++) {
              if (skills.contains(info.skills[j])) continue;
              this.removeSkillTrigger(info.skills[j]);
            }
          }
          if (info.clearLose && typeof info.onLose == 'function') {
            var next = game.createEvent('lose_' + card.name);
            next.setContent(info.onLose);
            next.player = this;
            next.card = card;
          }
        }
        else {
          var es = this.getCards('e');
          for (var i = 0; i < es.length; i++) {
            this.removeEquipTrigger(es[i]);
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      removeSkillTrigger: function (skill, triggeronly) {
        var info = lib.skill[skill];
        if (!info) return;
        if (typeof info.group == 'string') {
          this.removeSkillTrigger(info.group);
        }
        else if (Array.isArray(info.group)) {
          for (var i = 0; i < info.group.length; i++) {
            this.removeSkillTrigger(info.group[i]);
          }
        }
        if (!triggeronly) this.initedSkills.remove(skill);
        if (info.trigger) {
          var playerid = this.playerid;
          var removeTrigger = function (i, evt) {
            if (i == 'global') {
              for (var j in lib.hook.globaltrigger) {
                if (lib.hook.globaltrigger[j][playerid]) {
                  lib.hook.globaltrigger[j][playerid].remove(skill);
                  if (lib.hook.globaltrigger[j][playerid].length == 0) {
                    delete lib.hook.globaltrigger[j][playerid];
                  }
                  if (get.is.empty(lib.hook.globaltrigger[j])) {
                    delete lib.hook.globaltrigger[j];
                  }
                }
              }
            }
            else {
              var name = playerid + '_' + i + '_' + evt;
              if (lib.hook[name]) {
                lib.hook[name].remove(skill);
                if (lib.hook[name].length == 0) {
                  delete lib.hook[name];
                }
              }
            }
          }
          for (var i in info.trigger) {
            if (typeof info.trigger[i] == 'string') {
              removeTrigger(i, info.trigger[i]);
            }
            else if (Array.isArray(info.trigger[i])) {
              for (var j = 0; j < info.trigger[i].length; j++) {
                removeTrigger(i, info.trigger[i][j]);
              }
            }
          }
        }
        if (info.hookTrigger) {
          if (this._hookTrigger) {
            this._hookTrigger.remove(skill);
            if (!this._hookTrigger.length) {
              delete this._hookTrigger;
            }
          }
        }
        return this;
      },
      /**
       * 
       * @returns {!boolean}
       */
      removeSkill: function (skill) {
        if (!skill) return;
        if (Array.isArray(skill)) {
          for (var i = 0; i < skill.length; i++) {
            this.removeSkill(skill[i]);
          }
        }
        else {
          var info = lib.skill[skill];
          if (info && info.fixed && arguments[1] !== true) return skill;
          this.unmarkSkill(skill);
          game.broadcastAll(function (player, skill) {
            player.skills.remove(skill);
            player.hiddenSkills.remove(skill);
          }, this, skill);
          this.checkConflict(skill);
          delete this.tempSkills[skill];
          if (info) {
            if (info.onremove) {
              if (typeof info.onremove == 'function') {
                info.onremove(this, skill);
              }
              else if (typeof info.onremove == 'string') {
                if (info.onremove == 'storage') {
                  delete this.storage[skill];
                }
                else {
                  var cards = this.storage[skill];
                  if (get.itemtype(cards) == 'card') {
                    cards = [cards];
                  }
                  if (get.itemtype(cards) == 'cards') {
                    if (this.onremove == 'discard') {
                      this.$throw(cards);
                    }
                    if (this.onremove == 'discard' || this.onremove == 'lose') {
                      game.cardsDiscard(cards);
                      delete this.storage[skill];
                    }
                  }
                }
              }
              else if (Array.isArray(info.onremove)) {
                for (var i = 0; i < info.onremove.length; i++) {
                  delete this.storage[info.onremove[i]];
                }
              }
              else if (info.onremove === true) {
                delete this.storage[skill];
              }
            }
            this.removeSkillTrigger(skill);
            if (!info.keepSkill) {
              this.removeAdditionalSkill(skill);
            }
          }
          this.enableSkill(skill + '_awake');
        }
        return skill;
      },
      /**
       * 本角色添加一个临时技能
       * @param {!string} skill 技能名
       * @param {(string|Object|undefined)} [expire='phaseAfter'] 过期时间，`expire`实际上对应一个触发器，本角色在下一次触发器被触发的时候移除此技能；如果未指定，使用'phaseAfter'
       * @param {?boolean} [checkConflict] 如果为true，添加技能完成后检测冲突；如果为false或未指定，不检测
       * @returns {string} 如果添加成功，返回技能名`skill`；否则，返回undefined
       */
      addTempSkill: function (skill, expire, checkConflict) {
        if (this.hasSkill(skill) && this.tempSkills[skill] == undefined) return;
        var noremove = this.skills.contains(skill);
        this.addSkill(skill, checkConflict, true);
        if (!noremove) this.skills.remove(skill);

        if (!expire) {
          expire = 'phaseAfter';
        }
        this.tempSkills[skill] = expire;

        if (typeof expire == 'string') {
          lib.hookmap[expire] = true;
        }
        else if (Array.isArray(expire)) {
          for (var i = 0; i < expire.length; i++) {
            lib.hookmap[expire[i]] = true;
          }
        }
        else if (get.objtype(expire) == 'object') {
          var roles = ['player', 'source', 'target'];
          for (var i = 0; i < roles.length; i++) {
            if (typeof expire[roles[i]] == 'string') {
              lib.hookmap[expire[roles[i]]] = true;
            }
            else if (Array.isArray(expire[roles[i]])) {
              for (var j = 0; j < expire[roles[i]].length; j++) {
                lib.hookmap[expire[roles[i]][j]] = true;
              }
            }
          }
          if (expire.global) {
            if (typeof expire.global == 'string') {
              lib.hookmap[expire.global] = true;
            }
            else if (Array.isArray(expire.global)) {
              for (var i = 0; i < expire.global.length; i++) {
                lib.hookmap[expire.global[i]] = true;
              }
            }
          }
        }

        for (var i in expire) {
          if (typeof expire[i] == 'string') {
            lib.hookmap[expire[i]] = true;
          }
          else if (Array.isArray(expire[i])) {
            for (var j = 0; j < expire.length; j++) {
              lib.hookmap[expire[i][j]] = true;
            }
          }
        }
        return skill;
      },
      /**
       * 
       * @returns {!boolean}
       */
      attitudeTo: function (target) {
        if (typeof get.attitude == 'function') return get.attitude(this, target);
        return 0;
      },
      /**
       * 
       * @returns {!boolean}
       */
      clearSkills: function (all) {
        var list = [];
        var exclude = [];
        for (var i = 0; i < arguments.length; i++) {
          exclude.push(arguments[i]);
        }
        for (i = 0; i < this.skills.length; i++) {
          if (lib.skill[this.skills[i]].superCharlotte) continue;
          if (!all && (lib.skill[this.skills[i]].temp || lib.skill[this.skills[i]].charlotte)) continue;
          if (!exclude.contains(this.skills[i])) {
            list.push(this.skills[i]);
          }
        }
        if (all) {
          for (var i in this.additionalSkills) {
            this.removeAdditionalSkill(i);
          }
        }
        this.removeSkill(list);
        this.checkConflict();
        this.checkMarks();
        return list;
      },
      /**
       * 
       * @returns {!boolean}
       */
      checkConflict: function (skill) {
        if (skill) {
          if (this.forbiddenSkills[skill]) {
            delete this.forbiddenSkills[skill];
          }
          else {
            for (var i in this.forbiddenSkills) {
              if (this.forbiddenSkills[i].remove(skill)) {
                if (!this.forbiddenSkills[i].length) {
                  delete this.forbiddenSkills[i];
                }
              }
            }
          }
        }
        else {
          this.forbiddenSkills = {};
          var forbid = [];
          var getName = function (arr) {
            var str = '';
            for (var i = 0; i < arr.length; i++) {
              str += arr[i] + '+';
            }
            return str.slice(0, str.length - 1);
          }
          var forbidlist = lib.config.forbid.concat(lib.config.customforbid);
          var skills = this.getSkills();
          for (var i = 0; i < forbidlist.length; i++) {
            if (lib.config.customforbid.contains(forbidlist[i]) ||
              !lib.config.forbidlist.contains(getName(forbidlist[i]))) {
              for (var j = 0; j < forbidlist[i].length; j++) {
                if (!skills.contains(forbidlist[i][j])) break;
              }
              if (j == forbidlist[i].length) {
                forbid.push(forbidlist[i]);
              }
            }
          }
          for (var i = 0; i < forbid.length; i++) {
            if (forbid[i][1] || this.name2) {
              this.forbiddenSkills[forbid[i][0]] = this.forbiddenSkills[forbid[i][0]] || [];
              if (forbid[i][1]) {
                this.forbiddenSkills[forbid[i][0]].add(forbid[i][1]);
              }
            }
          }
        }
      },
      /**
       * 返回本角色的一个记录数据
       * @returns {!boolean}
       */
      getHistory: function (key, filter, last) {
        if (!key) return this.actionHistory[this.actionHistory.length - 1];
        if (!filter) return this.actionHistory[this.actionHistory.length - 1][key];
        else {
          var history = this.getHistory(key).slice(0);
          if (last) history = history.slice(0, history.indexOf(last) + 1);
          for (var i = 0; i < history.length; i++) {
            if (!filter(history[i])) history.splice(i--, 1);
          }
          return history;
        }
      },
      hasHistory: function (key, filter, last) {
        var history = this.getHistory(key).slice(0);
        if (last) history = history.slice(0, history.indexOf(last) + 1);
        for (var i = 0; i < history.length; i++) {
          if (filter(history[i])) return true;
        }
        return false;
      },
      /**
       * 返回本角色最近(当前)的记录数据
       * @returns {Array}
       */
      getLastHistory: function (key, filter, last) {
        var history = false;
        for (var i = this.actionHistory.length - 1; i >= 0; i--) {
          if (this.actionHistory[i].isMe) {
            history = this.actionHistory[i]; break;
          }
        }
        if (!history) return null;
        if (!key) return history;
        if (!filter) return history[key];
        else {
          history = history.slice(0);
          if (last) history = history.slice(0, history.indexOf(last) + 1);
          for (var i = 0; i < history.length; i++) {
            if (!filter(history[i])) history.splice(i--, 1);
          }
          return history;
        }
      },
      /**
       * 返回本角色的记录数据 TODO
       * @returns {Array}
       */
      getAllHistory: function (key, filter, last) {
        var list = [];
        var all = this.actionHistory;
        for (var j = 0; j < all.length; j++) {
          if (!key || !all[j][key]) {
            list.push(all[j]);
          }
          else {
            if (!filter) list.addArray(all[j][key]);
            else {
              var history = all[j][key].slice(0);
              if (last) history = history.slice(0, history.indexOf(last) + 1);
              for (var i = 0; i < history.length; i++) {
                if (filter(history[i])) list.push(history[i]);
              }
            }
          }
        }
        return list;
      },
      hasAllHistory: function (key, filter, last) {
        var list = [];
        var all = this.actionHistory;
        for (var j = 0; j < all.length; j++) {
          var history = all[j][key].slice(0);
          if (last) history = history.slice(0, history.indexOf(last) + 1);
          for (var i = 0; i < history.length; i++) {
            if (filter(history[i])) return true;
          }
        }
        return false;
      },
      /**
       * 返回一张本角色使用过的牌
       * @param {number} [idx=0] 索引，从最近到最远，为0表示最近使用的牌，如果未索引到(e.g. `idx >= length`)，返回null
       * @returns {(GameCores.GameObjects.Card|null)} 
       */
      getLastUsed: function (num) {
        if (typeof num != 'number') num = 0;
        var history = this.getHistory('useCard');
        if (history.length <= num) return null;
        return history[history.length - num - 1];
      },
      /**
       * 返回最后的`stat`的指定键名的值
       * @param {string} [key] 键名；如果未指定或者为空字符串，返回最后`stat`
       * @returns {?Object}
       */
      getStat: function (key) {
        if (!key) return this.stat[this.stat.length - 1];
        return this.stat[this.stat.length - 1][key];
      },
      /**
       * 返回最后的`stat`的指定键名的值 TODO
       * @param {string} [key] 键名；如果未指定或者为空字符串，返回最后`stat`
       * @returns {?Object}
       */
      getLastStat: function (key) {
        var stat = false;
        for (var i = this.stat.length - 1; i >= 0; i--) {
          if (this.stat[i].isMe) {
            stat = this.stat[i]; break;
          }
        }
        if (!stat) return null
        if (!key) return stat;
        return stat[key];
      },
      /**
       * 设置本角色的Timeout队列，Timeout延迟一定时长，然后重置角色位置
       * @param {(number|false)} [time=500] 等待时长(ms)；如果为false，表示终止最近添加的Timeout并重置本角色Timeout队列计数
       */
      queue: function (time) {
        if (time == false) {
          clearTimeout(this.queueTimeout);
          this.queueCount = 0;
          return;
        }
        if (time == undefined) time = 500;
        var player = this;
        player.queueCount++;
        this.queueTimeout = setTimeout(function () {
          player.queueCount--;
          if (player.queueCount == 0) {
            player.style.transform = '';
            player.node.avatar.style.transform = '';
            player.node.avatar2.style.transform = '';
            if (game.chess) {
              ui.placeChess(player, player.dataset.position);
            }
            if (player == game.me) ui.me.removeAttribute('style');
          }
        }, time)
      },
      /**
       * 返回一张游戏牌可以被本角色使用的次数，如果本角色有被动技**cardUsable**改变游戏牌的使用次数，采用改变后的值
       * @param {!string} cardname 牌名
       * @param {boolean} [ignoreUsed] 是否忽略使用过的次数，如果为true，忽略使用过的次数；如果为false或者未指定，结果会减去使用过的次数
       * @returns {!number}
       */
      getCardUsable: function (card, pure) {
        var player = this;
        if (typeof card == 'string') {
          card = { name: card };
        }
        card = get.autoViewAs(card, null, player);
        var num = get.info(card).usable;
        if (typeof num == 'function') num = num(card, player);
        num = game.checkMod(card, player, num, 'cardUsable', player);
        if (typeof num != 'number') return Infinity;
        if (!pure && _status.currentPhase == player) {
          return num - player.countUsed(card);
        }
        return num;
      },
      /**
       * 返回攻击范围
       * @returns {!number}
       */
      getAttackRange: function (raw) {
        var player = this;
        var range = 0;
        if (raw) range = game.checkMod(player, player, range, 'globalFrom', player);
        range = game.checkMod(player, player, range, 'attackFrom', player);
        var equips = player.getCards('e', function (card) {
          return !ui.selected.cards || !ui.selected.cards.contains(card);
        });
        for (var i = 0; i < equips.length; i++) {
          var info = get.info(equips[i]).distance;
          if (!info) continue;
          if (raw && info.globalFrom) {
            range += info.globalFrom;
          }
          if (info.attackFrom) {
            range += info.attackFrom;
          }
        }
        return (1 - range);
      },
      /**
       * TODO
       * @returns {!boolean}
       */
      getGlobalFrom: function () {
        var player = this;
        var range = 0;
        range = game.checkMod(player, player, range, 'globalFrom', player);
        var equips = player.getCards('e', function (card) {
          return !ui.selected.cards || !ui.selected.cards.contains(card);
        });
        for (var i = 0; i < equips.length; i++) {
          var info = get.info(equips[i]).distance;
          if (!info) continue;
          if (info.globalFrom) {
            range += info.globalFrom;
          }
        }
        return (-range);
      },
      /**
       * TODO
       * @returns {!boolean}
       */
      getGlobalTo: function () {
        var player = this;
        var range = 0;
        range = game.checkMod(player, player, range, 'globalTo', player);
        var equips = player.getCards('e', function (card) {
          return !ui.selected.cards || !ui.selected.cards.contains(card);
        });
        for (var i = 0; i < equips.length; i++) {
          var info = get.info(equips[i]).distance;
          if (!info) continue;
          if (info.globalTo) {
            range += info.globalTo;
          }
        }
        return (range);
      },
      /**
       * 返回本角色的最大手牌数**num**；如果本角色有被动技**maxHandcardBase maxHandcard maxHandcardFinal**，依次改变**num**，返回改变后的**num**；**num**不会小于0
       * @returns {!number} 非负整数
       */
      getHandcardLimit: function () {
        var num = Math.max(this.hp, 0);
        num = game.checkMod(this, num, 'maxHandcardBase', this);
        num = game.checkMod(this, num, 'maxHandcard', this);
        num = game.checkMod(this, num, 'maxHandcardFinal', this);
        return Math.max(0, num);
      },
      /**
       * @callback lib.element.player~playerFilterPredicate
       * @param {!GameCores.GameObjects.Player} player
       * @returns {!boolean}
       */
      /**
       * 返回本角色的敌方角色
       * @name lib.element.player.getEnemies
       * @function
       * @param {lib.element.player~playerFilterPredicate} [predicate] 筛选函数
       * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
       */
      getEnemies: function (func) {
        var player = this;
        var targets;
        var mode = get.mode();
        if (mode == 'identity') {
          if (_status.mode == 'purple') {
            switch (player.identity) {
              case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
              }); break;
              case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
              }); break;
              case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return !['rYe', 'bYe'].contains(target.identity);
              }); break;
            }
          }
          else {
            var num = get.population('fan');
            switch (player.identity) {
              case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                if (num >= 3) return target.identity == 'fan';
                return target.identity == 'nei' || target.identity == 'fan';
              }); break;
              case 'nei': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                if (num >= 3) return target.identity == 'fan';
                if (game.players.length == 2) return target != player;
                return target.identity == 'zhong' || target.identity == 'mingzhong' || target.identity == 'fan';
              }); break;
              case 'fan': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return target.identity != 'fan';
              }); break;
            }
          }
        }
        else if (mode == 'guozhan') {
          if (player.identity == 'ye') {
            targets = game.filterPlayer(function (target) {
              if (func && !func(target)) return false;
              return true;
            });
          }
          else {
            var group = lib.character[player.name1][1];
            targets = game.filterPlayer(function (target) {
              if (func && !func(target)) return false;
              return target.identity == 'ye' || lib.character[target.name1][1] != group;
            });
          }
        }
        else if (mode == 'doudizhu' || mode == 'longlaoguan') {
          targets = game.filterPlayer(function (target) {
            if (func && !func(target)) return false;
            return target.identity != player.identity;
          });
        }
        else {
          targets = game.filterPlayer(function (target) {
            if (func && !func(target)) return false;
            return target.side != player.side;
          });
        }
        targets.remove(player);
        return targets;
      },
      /**
       * 返回本角色的友方角色
       * @name lib.element.player.getFriends
       * @function
       * @param {lib.element.player~playerFilterPredicate} predicate 筛选函数
       * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
       */
      /**
       * 返回本角色的友方角色
       * @name lib.element.player.getFriends
       * @function
       * @param {?boolean} hasSelf 结果是否包含本角色，如果为true，则包括；如果为false或未指定，则不包括
       * @returns {!GameCores.GameObjects.Player[]} 如果没有找到角色，返回空数组
       */
      getFriends: function (func) {
        var player = this;
        var targets;
        var mode = get.mode();
        var self = false;
        if (func === true) {
          func = null;
          self = true;
        }
        if (mode == 'identity') {
          if (_status.mode == 'purple') {
            switch (player.identity) {
              case 'rZhu': case 'rZhong': case 'bNei': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['rZhu', 'rZhong', 'bNei'].contains(target.identity);
              }); break;
              case 'bZhu': case 'bZhong': case 'rNei': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['bZhu', 'bZhong', 'rNei'].contains(target.identity);
              }); break;
              case 'rYe': case 'bYe': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['rYe', 'bYe'].contains(target.identity);
              }); break;
            }
          }
          else {
            switch (player.identity) {
              case 'zhu': case 'zhong': case 'mingzhong': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return ['zhu', 'zhong', 'mingzhong'].contains(target.identity);
              }); break;
              case 'nei': targets = []; break;
              case 'fan': targets = game.filterPlayer(function (target) {
                if (func && !func(target)) return false;
                return target.identity == 'fan';
              }); break;
            }
          }
        }
        else if (mode == 'guozhan') {
          if (player.identity == 'ye') {
            targets = [];
          }
          else {
            var group = lib.character[player.name1][1];
            targets = game.filterPlayer(function (target) {
              if (func && !func(target)) return false;
              return target.identity != 'ye' && lib.character[target.name1][1] == group;
            });
          }
        }
        else if (mode == 'doudizhu' || mode == 'longlaoguan') {
          targets = game.filterPlayer(function (target) {
            if (func && !func(target)) return false;
            return target.identity == player.identity;
          });
        }
        else {
          targets = game.filterPlayer(function (target) {
            if (func && !func(target)) return false;
            return target.side == player.side;
          });
        }
        if (self) {
          targets.add(player);
        }
        else {
          targets.remove(player);
        }
        return targets;
      },
      /**
       * 返回本角色是否是目标的敌方
       * @param {!GameCores.GameObjects.Player} player 目标角色
       * @returns {!boolean}
       */
      isEnemyOf: function () {
        return !this.isFriendOf.apply(this, arguments);
      },
      /**
       * 返回本角色是否是目标的友方
       * @param {!GameCores.GameObjects.Player} player 目标角色
       * @returns {!boolean}
       */
      isFriendOf: function (player) {
        if (get.mode() == 'guozhan') {
          if (this == player) return true;
          if (this.storage.yexinjia_friend == player || player.$.yexinjia_friend == this) return true;
          if (this.identity == 'unknown' || this.identity == 'ye') return false;
          if (player.identity == 'unknown' || player.identity == 'ye') return false;
          return this.identity == player.identity;
        }
        if (get.mode() == 'doudizhu' || get.mode() == 'longlaoguan') {
          return this.identity == player.identity;
        }
        if (this.side != undefined && typeof player.side == 'boolean') {
          return this.side == player.side;
        }
        return this == player;
      },
      /**
       * 返回本角色是否是目标的友方
       * @param {!GameCores.GameObjects.Player} player 目标角色
       * @returns {!boolean}
       */
      isFriendsOf: function (player) {
        return player.getFriends(true).contains(this);
      },
      /**
       * 返回本角色是否是目标的敌方
       * @param {!GameCores.GameObjects.Player} player 目标角色
       * @returns {!boolean}
       */
      isEnemiesOf: function (player) {
        return player.getEnemies().contains(this);
      },
      /**
       * 返回本角色是否未死亡
       * @returns {!boolean} true表示未死亡，false表示已死亡
       */
      isAlive: function () {
        return this.classList.contains('dead') == false;
      },
      /**
       * 返回本角色是否死亡
       * @returns {!boolean}
       */
      isDead: function () {
        return this.classList.contains('dead');
      },
      /**
       * 返回本角色是否处于濒死状态
       * @returns {!boolean}
       */
      isDying: function () {
        return _status.dying.contains(this) && this.hp <= 0 && this.isAlive();
      },
      /**
       * 返回本角色是否当前血量小于最大血量，如果本角色处于**无HP状态**，返回false
       * @returns {!boolean}
       */
      isDamaged: function () {
        return this.hp < this.maxHp && !this.storage.nohp;
      },
      /**
       * 返回本角色是否当前血量等于最大血量，如果本角色处于**无HP状态**，返回true
       * @returns {!boolean}
       */
      isHealthy: function () {
        return this.hp == this.maxHp || this.storage.nohp;
      },
      /**
       * 返回本角色的血量是否是局中最多
       * @param {boolean} [isUnique] 如果为true，只在血量最多且唯一时返回true；如果为false或未指定，只要血量最多就返回true
       * @returns {!boolean}
       */
      isMaxHp: function (equal) {
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].hp >= this.hp) return false;
          }
          else {
            if (game.players[i].hp > this.hp) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的血量是否是局中最少
       * @param {boolean} [isUnique] 如果为true，只在血量最少且唯一时返回true；如果为false或未指定，只要血量最少就返回true
       * @returns {!boolean}
       */
      isMinHp: function (equal) {
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].hp <= this.hp) return false;
          }
          else {
            if (game.players[i].hp < this.hp) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的手牌和装备总数是否是局中最多
       * @param {boolean} [isUnique] 如果为true，只在数量最多且唯一时返回true；如果为false或未指定，只要数量是最多就返回true
       * @returns {!boolean}
       */
      isMaxCard: function (equal) {
        var nh = this.countCards('he');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('he') >= nh) return false;
          }
          else {
            if (game.players[i].countCards('he') > nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的手牌和装备总数是否是局中最少
       * @param {boolean} [isUnique] 如果为true，只在数量最少且唯一时返回true；如果为false或未指定，只要数量是最少就返回true
       * @returns {!boolean}
       */
      isMinCard: function (equal) {
        var nh = this.countCards('he');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('he') <= nh) return false;
          }
          else {
            if (game.players[i].countCards('he') < nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的手牌数量是否是局中最多
       * @param {boolean} [isUnique] 如果为true，只在手牌数量最多且唯一时返回true；如果为false或未指定，只要装备数量是最多就返回true
       * @returns {!boolean}
       */
      isMaxHandcard: function (equal) {
        var nh = this.countCards('h');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('h') >= nh) return false;
          }
          else {
            if (game.players[i].countCards('h') > nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的手牌数量是否是局中最少
       * @param {boolean} [isUnique] 如果为true，只在手牌数量最少且唯一时返回true；如果为false或未指定，只要手牌数量是最少就返回true
       * @returns {!boolean}
       */
      isMinHandcard: function (equal) {
        var nh = this.countCards('h');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('h') <= nh) return false;
          }
          else {
            if (game.players[i].countCards('h') < nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的装备数量是否是局中最多
       * @param {boolean} [isUnique] 如果为true，只在装备数量最多且唯一时返回true；如果为false或未指定，只要装备数量是最多就返回true
       * @returns {!boolean}
       */
      isMaxEquip: function (equal) {
        var nh = this.countCards('e');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('e') >= nh) return false;
          }
          else {
            if (game.players[i].countCards('e') > nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色的装备数量是否是局中最少
       * @param {boolean} [isUnique] 如果为true，只在装备数量最少且唯一时返回true；如果为false或未指定，只要装备数量是最少就返回true
       * @returns {!boolean}
       */
      isMinEquip: function (equal) {
        var nh = this.countCards('e');
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut() || game.players[i] == this) continue;
          if (equal) {
            if (game.players[i].countCards('e') <= nh) return false;
          }
          else {
            if (game.players[i].countCards('e') < nh) return false;
          }
        }
        return true;
      },
      /**
       * 返回本角色是否被链接
       * @returns {!boolean} true表示被链接，false表示未被链接
       */
      isLinked: function () {
        if (get.is.linked2(this)) {
          return this.classList.contains('linked2');
        }
        return this.classList.contains('linked');
      },
      /**
       * 返回本角色是否翻面
       * @returns {!boolean} true表示翻面，false表示未翻面
       */
      isTurnedOver: function () {
        return this.classList.contains('turnedover');
      },
      /**
       * 返回本角色的玩家是否离开
       * @returns {!boolean} true表示离开，false表示未离开
       */
      isOut: function () {
        return this.classList.contains('out');
      },
      /**
       * 本角色是否不计入距离的计算
       * @param {?boolean} [distance]
       * @returns {!boolean}
       */
      //TODO
      isMin: function (distance) {
        if (distance && lib.config.mode != 'stone') return false;
        if (this.forcemin) return true;
        return this.classList.contains('minskin') && !game.chess;
      },
      /**
       * 表示本角色是否在局中(未死亡&未离开&未移出房间)
       * @returns {!boolean} true表示在局中，false表示不在局中
       */
      isIn: function () {
        return this.classList.contains('dead') == false && this.classList.contains('out') == false && !this.removed;
      },
      /**
       * 返回本角色是否可见，如果可见返回true
       * @param {number} num **0**: unseen; **1**: unseen2; **2**: unseen && unseen2; **default**: unseen && !unseen2 
       * @returns {!boolean}
       */
      isUnseen: function (num) {
        switch (num) {
          case 0: return this.classList.contains('unseen');
          case 1: return this.classList.contains('unseen2');
          case 2: return this.classList.contains('unseen') || this.classList.contains('unseen2');
          default: return this.classList.contains('unseen') && (!this.name2 || this.classList.contains('unseen2'));
        }
      },
      /**
       * 判断本角色是否可以被某角色的玩家控制
       * @param {?boolean} self 如果为true，当是两个角色是同一个角色时返回true；如果为false或未指定，返回false
       * @param {GameCores.GameObjects.Player} [me] 某角色，用于判断本角色是否被`me`的玩家控制，如果未指定，默认使用`game.me`
       * @returns {!boolean}
       */
      isUnderControl: function (self, me) {
        me = (me || game.me);
        var that = this._trueMe || this;
        if (that.isMad() || game.notMe) return false;
        if (this === me) {
          if (self) return true;
          return false;
        }
        if (that === me || this == me._trueMe) return true;
        if (_status.connectMode) return false;
        if (lib.config.mode == 'versus') {
          if (_status.mode == 'three') return this.side == me.side;
          if (_status.mode == 'standard') return lib.storage.single_control && this.side == me.side;
          if (_status.mode == 'four') return get.config('four_phaseswap') && this.side == me.side;
          if (_status.mode == 'two') return get.config('two_phaseswap') && this.side == me.side;
          return false;
        }
        else if (lib.config.mode == 'boss') {
          if (me.side) return false;
          return this.side == me.side && get.config('single_control');
        }
        else if (game.chess) {
          if (lib.config.mode == 'chess') {
            if (_status.mode == 'combat' && !get.config('single_control')) return false;
          }
          return this.side == me.side;
        }
        return false;
      },
      /**
       * 角色是否处于联机状态
       * 注意，该函数如果角色处于托管状态，返回false
       * @returns {!boolean}
       */
      isOnline: function () {
        if (this.ws && lib.node && !this.ws.closed && this.ws.inited && !this.isAuto) {
          return true;
        }
        return false;
      },
      /**
       * 角色是否处于联机状态
       * @returns {!boolean}
       */
      isOnline2: function () {
        if (this.ws && lib.node && !this.ws.closed) {
          return true;
        }
        return false;
      },
      /**
       * 角色是否处于脱机状态
       * @returns {!boolean}
       */
      isOffline: function () {
        if (this.ws && lib.node && this.ws.closed) {
          return true;
        }
        return false;
      },
      checkShow: function (skill, showonly) {
        var sourceSkill = get.info(skill);
        var noshow = false;
        if (sourceSkill && sourceSkill.sourceSkill) {
          skill = sourceSkill.sourceSkill;
        }
        if (lib.skill.global.contains(skill)) return false;
        if (get.mode() != 'guozhan' || game.expandSkills(this.getSkills()).contains(skill)) {
          if (showonly) {
            return false;
          }
          else {
            noshow = true;
          }
        }
        var unseen0 = this.isUnseen(0);
        var name1 = this.name1 || this.name;
        if (lib.character[name1] && (!showonly || unseen0)) {
          var skills = game.expandSkills(lib.character[name1][3].slice(0));
          if (skills.contains(skill)) {
            if (!noshow && this.isUnseen(0)) this.showCharacter(0);
            return 'main';
          }
        }
        var unseen1 = this.isUnseen(1);
        var name2 = this.name2;
        if (lib.character[name2] && (!showonly || unseen1)) {
          var skills = game.expandSkills(lib.character[name2][3].slice(0));
          if (skills.contains(skill)) {
            if (!noshow && this.isUnseen(1)) this.showCharacter(1);
            return 'vice';
          }
        }
        return false;
      },
      /**
       * 返回本角色当前超出手牌上限多少张牌，如果没有超出上限，返回0；
       * 如果角色有被动技**ignoredHandcard**，令被动技返回`true`的牌不计入手牌上限
       * @param {?number} [num] 
       * @returns {!number} 非负整数
       */
      needsToDiscard: function (num) {
        if (typeof num != 'number') num = 0;
        var hs = this.getCards('h');
        num += hs.length;
        for (var i = 0; i < hs.length; i++) {
          if (game.checkMod(hs[i], this, false, 'ignoredHandcard', this) == true) {
            num--;
          }
        }
        return Math.max(0, num - this.getHandcardLimit());
      },
      distanceTo: function (target, method) {
        return get.distance(this, target, method);
      },
      distanceFrom: function (target, method) {
        return get.distance(target, this, method);
      },
      /**
       * 返回本角色是否拥有一个技能；
       * 此技能会在角色拥有(技能|子技能)中查找技能名；
       * 实际调用了{@link lib.element.player.getSkills this.getSkills(arg2, arg3, arg4)}，并用{@link game.expandSkills}展开
       * @param {!string} skill 技能名
       * @param {*} arg2 为真时表示计入隐藏的技能、为'e'时表示仅返回装备技能
       * @param {*} arg3 为false时表示不计入装备技能
       * @param {*} arg4 为false时表示计入失效的技能
       * @returns {!boolean}
       */
      hasSkill: function (skill, arg2, arg3, arg4) {
        return game.expandSkills(this.getSkills(arg2, arg3, arg4)).contains(skill);
      },
      hasStockSkill: function (skill, arg1, arg2, arg3) {
        return game.expandSkills(this.getStockSkills(arg1, arg2, arg3)).contains(skill);
      },
      hasZhuSkill: function (skill, player) {
        if (!this.hasSkill(skill)) return false;
        var mode = get.mode();
        if (mode == 'identity' || (mode == 'versus' && (_status.mode == 'four' || _status.mode == 'guandu'))) {
          if (mode != 'identity') {
            if (player && this.side != player.side) return false;
          }
          if (_status.mode == 'purple') {
            if (player && this.identity.slice(0, 1) != player.identity.slice(0, 1)) return false;
          }
          if (this.isZhu == true) return true;
          for (var i in this.storage) {
            if (i.indexOf('zhuSkill_') == 0 && this.storage[i].contains(skill)) return true;
          }
        }
        return false;
      },
      hasGlobalTag: function (tag, arg) {
        var skills = lib.skill.global.slice(0);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var info = lib.skill[skills[i]];
          if (info && info.ai) {
            if (info.ai.skillTagFilter && info.ai[tag] &&
              info.ai.skillTagFilter(this, tag, arg) === false) continue;
            if (typeof info.ai[tag] == 'string') {
              if (info.ai[tag] == arg) return true;
            }
            else if (info.ai[tag]) {
              return true;
            }
          }
        }
        return false;
      },
      hasSkillTag: function (tag, hidden, arg, globalskill) {
        var skills = this.getSkills(hidden);
        if (globalskill) {
          skills.addArray(lib.skill.global);
        }
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var info = lib.skill[skills[i]];
          if (info && info.ai) {
            if (info.ai.skillTagFilter && info.ai[tag] &&
              info.ai.skillTagFilter(this, tag, arg) === false) continue;
            if (typeof info.ai[tag] == 'string') {
              if (info.ai[tag] == arg) return true;
            }
            else if (info.ai[tag]) {
              return true;
            }
          }
        }
        return false;
      },
      hasJudge: function (name) {
        if (name && typeof name == 'object') {
          name = name.viewAs || name.name;
        }
        var judges = this.node.judges.childNodes;
        for (var i = 0; i < judges.length; i++) {
          if (judges[i].classList.contains('removing')) continue;
          if ((judges[i].viewAs || judges[i].name) == name) {
            return true;
          }
        }
        return false;
      },
      hasFriend: function () {
        for (var i = 0; i < game.players.length; i++) {
          if (game.players[i].isOut()) continue;
          if (game.players[i] != this && get.attitude(game.players[i], this) > 0) {
            return true;
          }
        }
        return false;
      },
      hasUnknown: function (num) {
        var mode = get.mode();
        if (typeof num != 'number') {
          num = 0;
        }
        if (mode == 'identity' || mode == 'guozhan') {
          for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].ai.shown == 0 && game.players[i] != this) {
              num--;
              if (num <= 0) {
                return true;
              }
            }
          }
        }
        return false;
      },
      isUnknown: function (player) {
        var mode = get.mode();
        if (mode == 'identity' || mode == 'guozhan') {
          if (this.ai.shown == 0 && this != player) {
            return true;
          }
        }
        return false;
      },
      //暗属性
      hasYami: function () {
        if (this.countCards('h', { nature: 'yami' })) return true;
        var skills = this.getSkills(true).concat(lib.skill.global);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var ifo = get.info(skills[i]);
          if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.nature == 'yami') {
            if (!ifo.viewAsFilter || ifo.viewAsFilter(this)) {
              return true;
            }
          }
          else {
            var hiddenYami = get.info(skills[i]).hiddenYami;
            if (typeof hiddenYami == 'function' && hiddenYami(this, false)) {
              return true;
            }
          }
        }
        return false;
      },
      hasWuxie: function () {
        if (this.countCards('hs', 'wuxie')) return true;
        var skills = this.getSkills(true).concat(lib.skill.global);
        game.expandSkills(skills);
        for (var i = 0; i < skills.length; i++) {
          var ifo = get.info(skills[i]);
          if (ifo.viewAs && typeof ifo.viewAs != 'function' && ifo.viewAs.name == 'wuxie') {
            if (!ifo.viewAsFilter || ifo.viewAsFilter(this)) {
              return true;
            }
          }
          else {
            var hiddenCard = get.info(skills[i]).hiddenCard;
            if (typeof hiddenCard == 'function' && hiddenCard(this, 'wuxie')) {
              return true;
            }
          }
        }
        return false;
      },
      hasSha: function (respond, noauto) {
        if (this.countCards('hs', 'sha')) return true;
        if (this.countCards('hs', 'hufu')) return true;
        if (!noauto && this.countCards('hs', 'yuchanqian')) return true;
        if (this.hasSkillTag('respondSha', true, respond ? 'respond' : 'use', true)) return true;
        return false;
      },
      hasShan: function () {
        if (this.countCards('hs', 'shan')) return true;
        if (this.countCards('hs', 'hufu')) return true;
        if (this.hasSkillTag('respondShan', true, null, true)) return true;
        return false;
      },
      mayHaveShan: function () {
        return this.hasShan();
        // modify: After AngelBeats! -2nd Beat-
      },
      hasCard: function (name, position) {
        if (typeof name == 'function') {
          var hs = this.getCards(position);
          for (var i = 0; i < hs.length; i++) {
            if (name(hs[i])) return true;
          }
        }
        else {
          if (this.countCards(position, name)) return true;
        }
        return false;
      },
      canEquip: function (name, replace) {
        if (get.type(name) == 'card') {
          name = get.equiptype(name);
        }
        var range = get.subtype(name);
        if (this.isDisabled(range)) return false;
        if (['equip3', 'equip4'].contains(range) && this.getEquip(6)) return false;
        if (!replace && !this.isEmpty(range)) return false;
        return true;
      },
      /**
       * 装备类型
       * |string|number|equip|
       * |:----:|:----:|:---:|
       * |equip1|1|武器|
       * |equip2|2|防具|
       * |equip3|3|防御载具|
       * |equip4|4|攻击载具|
       * |equip5|5|宝物|
       * |equip6|6|坐骑|
       * 
       * @typedef {('equip[1-6]'|number)} GameCores.EquipType
       */
      /**
       * 返回角色装备区的一张牌
       * @param {(GameCores.GameObjects.Card|'equip[0-9]'|number)} name 如果为游戏牌对象，使用其装备类型(如果有)；如果不是可装备类型或者`name`未指定，此函数返回null；可以取值为数值[0-9]或字符串'equip[0-9]'，但是通常只在[1-6]范围内({@link GameCores.EquipType})
       * @returns {(null|GameCores.GameObjects.Card)}
       */
      getEquip: function (name) {
        var es = this.getCards('e');
        if (typeof name == 'object' && get.info(name)) {
          name = get.info(name).subtype;
          if (name) {
            name = parseInt(name[5]);
          }
        }
        else if (typeof name == 'string' && name.indexOf('equip') == 0 && name.length == 6) {
          name = parseInt(name[5]);
        }
        if (!name) {
          return null;
        }
        for (var i = 0; i < es.length; i++) {
          if (typeof name === 'number') {
            if (get.info(es[i]).subtype === 'equip' + name) {
              return es[i];
            }
          }
          else {
            if (es[i].name === name) return es[i];
            var source = get.info(es[i]).source;
            if (Array.isArray(source) && source.contains(name)) {
              return es[i];
            }
          }
        }
        return null;
      },
      /**
       * 返回角色判定区一张(指定牌|视为指定牌)
       * @function
       * @param {?string} name 指定牌的牌名
       * @returns {(GameCores.GameObjects.Card|null)} 如果没找到，返回null
       */
      getJudge: function (name) {
        var judges = this.node.judges.childNodes;
        for (var i = 0; i < judges.length; i++) {
          if (judges[i].classList.contains('removing')) continue;
          if ((judges[i].viewAs || judges[i].name) == name) {
            return judges[i];
          }
        }
        return null;
      },
      $drawAuto: function (cards, target) {
        if (this.isUnderControl(true, target)) {
          this.$draw(cards);
        }
        else {
          this.$draw(cards.length);
        }
      },
      $draw: function (num, init, config) {
        if (init !== false && init !== 'nobroadcast') {
          game.broadcast(function (player, num, init, config) {
            player.$draw(num, init, config)
          }, this, num, init, config);
        }
        var cards, node;
        if (get.itemtype(num) == 'cards') {
          cards = num;
          num = cards.length;
        }
        else if (get.itemtype(num) == 'card') {
          cards = [num];
          num = 1;
        }
        if (init !== false) {
          if (cards) {
            game.addVideo('drawCard', this, get.cardsInfo(cards));
          }
          else {
            game.addVideo('draw', this, num);
          }
        }
        if (cards) {
          cards = cards.slice(0);
          node = cards.shift().copy('thrown', 'drawingcard');
        }
        else {
          node = ui.create.div('.card.thrown.drawingcard');
        }
        node.fixed = true;
        node.hide();

        var dx, dy;
        if (game.chess) {
          var rect = this.getBoundingClientRect();

          if (rect.left <= 80) {
            dx = -10;
            if (rect.top <= 80) {
              dy = -10;
            }
            else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
              dy = 10;
            }
            else {
              dy = 0;
            }
          }
          else if (rect.left + rect.width + 80 >= ui.chessContainer.offsetWidth) {
            dx = 10;
            if (rect.top <= 80) {
              dy = -10;
            }
            else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
              dy = 10;
            }
            else {
              dy = 0;
            }
          }
          else if (rect.top <= 80) {
            dx = 0;
            dy = -10;
          }
          else if (rect.top + rect.height + 80 >= ui.chessContainer.offsetHeight) {
            dx = 0;
            dy = 10;
          }
          else {
            dx = rect.left + this.offsetWidth / 2 - ui.arena.offsetWidth / 2;
            dy = rect.top + this.offsetHeight / 2 - ui.arena.offsetHeight / 2;
          }

          var coeff = 240 / Math.sqrt(dx * dx + dy * dy);
          dx *= coeff;
          dy *= coeff;

          node.style.left = (this.getLeft() + this.offsetWidth / 2 - 52 - dx) + 'px';
          node.style.top = (this.getTop() + this.offsetHeight / 2 - 52 - dy) + 'px';
          this.parentNode.appendChild(node);
        }
        else {
          this.parentNode.appendChild(node);
          node.style.left = 'calc(50% - 52px)';
          node.style.top = 'calc(50% - 52px)';

          dx = this.getLeft() + this.offsetWidth / 2 - 52 - node.offsetLeft;
          dy = this.getTop() + this.offsetHeight / 2 - 52 - node.offsetTop;

          if (get.is.mobileMe(this)) {
            dx += get.cardOffset();
            if (ui.arena.classList.contains('oblongcard')) {
              dy -= 16;
            }
          }
        }
        node.style.transitionDuration = '0.8s';
        ui.refresh(node);
        if (typeof num == 'number' && init !== false) {
          config = {
            total: num,
            current: 1
          }
        }
        if (config && config.total > 1) {
          var total = config.total, current = config.current;
          var dxtotal;
          if (total <= 5) {
            dxtotal = Math.min(80, (total - 1) * 20);
            dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1)
          }
          else {
            var total2 = Math.floor(total / 2);
            if (current <= total2) {
              total = total2;
              dy -= 20;
            }
            else {
              current -= total2;
              total -= total2;
              dy += 20;
            }
            dxtotal = Math.min(80, (total - 1) * 20);
            dx += -dxtotal + 2 * dxtotal * (current - 1) / (total - 1)
          }
          config.current++;
        }
        if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
          node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
        }
        else {
          node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        }
        node.show();

        node.listenTransition(function () {
          node.style.transitionDuration = '0.5s';
          ui.refresh(node);
          node.delete();
        });
        var that = this;
        if (num && num > 1) {
          if (config && config.total > 1) {
            setTimeout(function () {
              if (cards) {
                that.$draw(cards, false, config)
              }
              else {
                that.$draw(num - 1, false, config)
              }
            }, 50)
          }
          else {
            setTimeout(function () {
              if (cards) {
                that.$draw(cards, false, config)
              }
              else {
                that.$draw(num - 1, false, config)
              }
            }, 200);
          }
        }
      },
      $compareMultiple: function (card1, targets, cards) {
        game.broadcast(function (player, card1, targets, cards) {
          player.$compareMultiple(card1, targets, cards);
        }, this, card1, targets, cards);
        game.addVideo('compareMultiple', this, [get.cardInfo(card1), get.targetsInfo(targets), get.cardsInfo(cards)]);
        var player = this;
        var node1 = player.$throwxy2(card1,
          'calc(50% - 52px)', 'calc(50% + 10px)', 'perspective(600px) rotateY(180deg)', true
        );
        if (lib.config.cardback_style != 'default') {
          node1.style.transitionProperty = 'none';
          ui.refresh(node1);
          node1.classList.add('infohidden');
          ui.refresh(node1);
          node1.style.transitionProperty = '';
        }
        else {
          node1.classList.add('infohidden');
        }

        node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
        var onEnd01 = function () {
          node1.removeEventListener('webkitTransitionEnd', onEnd01);
          setTimeout(function () {
            node1.style.transition = 'all ease-in 0.3s';
            node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
            var onEnd = function () {
              node1.classList.remove('infohidden');
              node1.style.transition = 'all 0s';
              ui.refresh(node1);
              node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
              ui.refresh(node1);
              node1.style.transition = '';
              ui.refresh(node1);
              node1.style.transform = '';
              node1.removeEventListener('webkitTransitionEnd', onEnd);
            }
            node1.listenTransition(onEnd);
          }, 300);
        };
        node1.listenTransition(onEnd01);

        setTimeout(function () {
          var left0 = -targets.length * 52 - (targets.length - 1) * 8;
          for (var i = 0; i < targets.length; i++) {
            (function (target, card2, i) {
              var left = left0 + i * 120;
              var node2;
              if (left < 0) {
                node2 = target.$throwxy2(card2,
                  'calc(50% - ' + (-left) + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
                );
              }
              else {
                node2 = target.$throwxy2(card2,
                  'calc(50% + ' + left + 'px)', 'calc(50% - 114px)', 'perspective(600px) rotateY(180deg)', true
                );
              }
              if (lib.config.cardback_style != 'default') {
                node2.style.transitionProperty = 'none';
                ui.refresh(node2);
                node2.classList.add('infohidden');
                ui.refresh(node2);
                node2.style.transitionProperty = '';
              }
              else {
                node2.classList.add('infohidden');
              }
              node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
              var onEnd02 = function () {
                node2.removeEventListener('webkitTransitionEnd', onEnd02);
                setTimeout(function () {
                  node2.style.transition = 'all ease-in 0.3s';
                  node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
                  var onEnd = function () {
                    node2.classList.remove('infohidden');
                    node2.style.transition = 'all 0s';
                    ui.refresh(node2);
                    node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                    ui.refresh(node2);
                    node2.style.transition = '';
                    ui.refresh(node2);
                    node2.style.transform = '';
                    node2.removeEventListener('webkitTransitionEnd', onEnd);
                  }
                  node2.listenTransition(onEnd);
                }, 200);
              };
              node2.listenTransition(onEnd02);
            }(targets[i], cards[i], i))
          }
        }, 200);
      },
      $compare: function (card1, target, card2) {
        game.broadcast(function (player, target, card1, card2) {
          player.$compare(card1, target, card2);
        }, this, target, card1, card2);
        game.addVideo('compare', this, [get.cardInfo(card1), target.dataset.position, get.cardInfo(card2)]);
        var player = this;
        var node1 = player.$throwxy2(card1,
          'calc(50% - 114px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
        );
        node1.classList.add('comparing');
        if (lib.config.cardback_style != 'default') {
          node1.style.transitionProperty = 'none';
          ui.refresh(node1);
          node1.classList.add('infohidden');
          ui.refresh(node1);
          node1.style.transitionProperty = '';
        }
        else {
          node1.classList.add('infohidden');
        }

        node1.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
        var onEnd01 = function () {
          node1.removeEventListener('webkitTransitionEnd', onEnd01);
          setTimeout(function () {
            node1.style.transition = 'all ease-in 0.3s';
            node1.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
            var onEnd = function () {
              node1.classList.remove('infohidden');
              node1.style.transition = 'all 0s';
              ui.refresh(node1);
              node1.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
              ui.refresh(node1);
              node1.style.transition = '';
              ui.refresh(node1);
              node1.style.transform = '';
              node1.removeEventListener('webkitTransitionEnd', onEnd);
            }
            node1.listenTransition(onEnd);
          }, 300);
        };
        node1.listenTransition(onEnd01);
        setTimeout(function () {
          var node2 = target.$throwxy2(card2,
            'calc(50% + 10px)', 'calc(50% - 52px)', 'perspective(600px) rotateY(180deg)', true
          );
          node2.classList.add('comparing');
          if (lib.config.cardback_style != 'default') {
            node2.style.transitionProperty = 'none';
            ui.refresh(node2);
            node2.classList.add('infohidden');
            ui.refresh(node2);
            node2.style.transitionProperty = '';
          }
          else {
            node2.classList.add('infohidden');
          }
          node2.style.transform = 'perspective(600px) rotateY(180deg) translateX(0)';
          var onEnd02 = function () {
            node2.removeEventListener('webkitTransitionEnd', onEnd02);
            setTimeout(function () {
              node2.style.transition = 'all ease-in 0.3s';
              node2.style.transform = 'perspective(600px) rotateY(270deg) translateX(52px)';
              var onEnd = function () {
                node2.classList.remove('infohidden');
                node2.style.transition = 'all 0s';
                ui.refresh(node2);
                node2.style.transform = 'perspective(600px) rotateY(-90deg) translateX(52px)';
                ui.refresh(node2);
                node2.style.transition = '';
                ui.refresh(node2);
                node2.style.transform = '';
                node2.removeEventListener('webkitTransitionEnd', onEnd);
              }
              node2.listenTransition(onEnd);
            }, 200);
          };
          node2.listenTransition(onEnd02);
        }, 200);
      },
      $throw: function (card, time, init, nosource) {
        if (typeof card == 'number') {
          var tmp = card;
          card = [];
          while (tmp--) {
            var cardx = ui.create.card();
            cardx.classList.add('infohidden');
            cardx.classList.add('infoflip');
            card.push(cardx);
          }
        }
        if (init !== false) {
          if (init !== 'nobroadcast') {
            game.broadcast(function (player, card, time, init, nosource) {
              player.$throw(card, time, init, nosource);
            }, this, card, time, init);
          }
          if (get.itemtype(card) != 'cards') {
            if (get.itemtype(card) == 'card') {
              card = [card];
            }
            else {
              return;
            }
          }
          game.addVideo('throw', this, [get.cardsInfo(card), time, nosource]);
        }
        if (game.chess) {
          this.chessFocus();
        }
        if (get.itemtype(card) == 'cards') {
          var node;
          for (var i = 0; i < card.length; i++) {
            node = this.$throw(card[i], time, false, nosource);
          }
          return node;
        }
        else {
          var node;
          if (card == undefined || card.length == 0) return;
          node = this.$throwordered(card.copy('thrown'), nosource);
          if (time != undefined) {
            node.fixed = true;
            setTimeout(function () { node.delete() }, time);
          }
          lib.listenEnd(node);
          return node;
        }
      },
      $throwordered: function () {
        return this.$throwordered2.apply(this, arguments);
        // if(lib.config.low_performance){
        //     return this.$throwordered2.apply(this,arguments);
        // }
        // else{
        //     return this.$throwordered1.apply(this,arguments);
        // }
      },
      $throwordered1: function (node, nosource) {
        node.classList.add('thrown');
        node.hide();
        node.style.transitionProperty = 'left,top,opacity,transform';
        for (var i = 0; i < ui.thrown.length; i++) {
          if (ui.thrown[i].parentNode != ui.arena ||
            ui.thrown[i].classList.contains('removing')) {
            ui.thrown.splice(i--, 1);
          }
        }
        ui.thrown.push(node);
        var uithrowns = ui.thrown.slice(0);
        var tops;
        if (game.chess) {
          switch (Math.floor((ui.thrown.length - 1) / 4)) {
            case 0:
              tops = ['calc(50% - 82px)'];
              break;
            case 1:
              tops = ['calc(50% - 139px)', 'calc(50% - 25px)'];
              break;
            case 2:
              tops = ['calc(50% - 196px)', 'calc(50% - 82px)', 'calc(50% + 32px)'];
              break;
            default:
              tops = ['calc(50% - 253px)', 'calc(50% - 139px)',
                'calc(50% - 25px)', 'calc(50% + 89px)'];
          }
        }
        else {
          switch (Math.floor((ui.thrown.length - 1) / 4)) {
            case 0:
              tops = ['calc(50% - 52px)'];
              break;
            case 1:
              tops = ['calc(50% - 109px)', 'calc(50% + 5px)'];
              break;
            case 2:
              tops = ['calc(50% - 166px)', 'calc(50% - 52px)', 'calc(50% + 62px)'];
              break;
            default:
              tops = ['calc(50% - 223px)', 'calc(50% - 109px)',
                'calc(50% + 5px)', 'calc(50% + 119px)'];
          }
        }
        while (uithrowns.length) {
          var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
          switch (throwns.length) {
            case 1:
              throwns[0].style.left = 'calc(50% - 52px)';
              break;
            case 2:
              throwns[0].style.left = 'calc(50% - 109px)';
              throwns[1].style.left = 'calc(50% + 5px)';
              break;
            case 3:
              throwns[0].style.left = 'calc(50% - 166px)';
              throwns[1].style.left = 'calc(50% - 52px)';
              throwns[2].style.left = 'calc(50% + 62px)';
              break;
            case 4:
              throwns[0].style.left = 'calc(50% - 223px)';
              throwns[1].style.left = 'calc(50% - 109px)';
              throwns[2].style.left = 'calc(50% + 5px)';
              throwns[3].style.left = 'calc(50% + 119px)';
              break;
          }
          var top;
          if (tops.length) {
            top = tops.shift();
          }
          else {
            if (game.chess) {
              top = 'calc(50% - 82px)';
            }
            else {
              top = 'calc(50% - 52px)';
            }
          }
          for (var i = 0; i < throwns.length; i++) {
            throwns[i].style.top = top;
          }
        }
        if (nosource) {
          node.style.transform = 'scale(0)';
          node.classList.add('center');
        }
        else {
          var parseCalc = function (str) {
            var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
            var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
            return [parseInt(per), parseInt(add)];
          }
          var nx = parseCalc(node.style.left);
          var ny = parseCalc(node.style.top);
          nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
          ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
          var dx, dy;
          if (game.chess) {
            var rect = this.getBoundingClientRect();
            dx = rect.left + this.offsetWidth / 2 - 52 - nx;
            dy = rect.top + this.offsetHeight / 2 - 52 - ny;
          }
          else {
            dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
            dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
            if (get.is.mobileMe(this)) {
              dx += get.cardOffset();
              if (ui.arena.classList.contains('oblongcard')) {
                dy -= 16;
              }
            }
          }
          if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
            node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
          }
          else {
            node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
          }
        }
        ui.arena.appendChild(node);
        ui.refresh(node);
        node.style.transform = '';
        node.show();
        lib.listenEnd(node);
        return node;
      },
      $throwordered2: function (node, nosource) {
        node.classList.add('thrown');
        node.classList.add('center');
        node.hide();
        node.style.transitionProperty = 'left,top,opacity,transform';

        if (nosource) {
          // node.style.transform='scale(0)';
        }
        else {
          var nx = [50, -52];
          var ny = [50, -52];
          nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
          ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
          var dx, dy;
          if (game.chess) {
            var rect = this.getBoundingClientRect();
            dx = rect.left + this.offsetWidth / 2 - 52 - nx;
            dy = rect.top + this.offsetHeight / 2 - 52 - ny;
          }
          else {
            dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
            dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
            if (get.is.mobileMe(this)) {
              dx += get.cardOffset();
              if (ui.arena.classList.contains('oblongcard')) {
                dy -= 16;
              }
            }
          }
          if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
            node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
          }
          else {
            node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
          }
        }
        ui.arena.appendChild(node);
        ui.refresh(node);

        for (var i = 0; i < ui.thrown.length; i++) {
          if (ui.thrown[i].parentNode != ui.arena ||
            ui.thrown[i].classList.contains('removing')) {
            ui.thrown.splice(i--, 1);
          }
        }
        ui.thrown.push(node);
        var uithrowns = ui.thrown.slice(0);
        var tops;
        switch (Math.floor((ui.thrown.length - 1) / 4)) {
          case 0:
            tops = [0];
            break;
          case 1:
            tops = [-57, 57];
            break;
          case 2:
            tops = [-114, 0, 114];
            break;
          default:
            tops = [-171, -57, 57, 171];
        }
        while (uithrowns.length) {
          var throwns = uithrowns.splice(0, Math.min(uithrowns.length, 4));
          switch (throwns.length) {
            case 1:
              throwns[0]._transthrown = 'translate(0px,';
              break;
            case 2:
              throwns[0]._transthrown = 'translate(-57px,';
              throwns[1]._transthrown = 'translate(57px,';
              break;
            case 3:
              throwns[0]._transthrown = 'translate(-114px,';
              throwns[1]._transthrown = 'translate(0,';
              throwns[2]._transthrown = 'translate(114px,';
              break;
            case 4:
              throwns[0]._transthrown = 'translate(-171px,';
              throwns[1]._transthrown = 'translate(-57px,';
              throwns[2]._transthrown = 'translate(57px,';
              throwns[3]._transthrown = 'translate(171px,';
              break;
          }
          var top;
          if (tops.length) {
            top = tops.shift();
          }
          else {
            top = 0;
          }
          if (game.chess) {
            top -= 30;
          }
          for (var i = 0; i < throwns.length; i++) {
            throwns[i].style.transform = throwns[i]._transthrown + top + 'px)';
            delete throwns[i]._transthrown;
          }
        }

        node.show();
        lib.listenEnd(node);
        return node;
      },
      $throwxy: function (card, left, top) {
        var node = card.copy('thrown', 'thrownhighlight');
        node.dataset.position = this.dataset.position;
        node.hide();
        node.style.transitionProperty = 'left,top,opacity';

        ui.arena.appendChild(node);
        ui.refresh(node);
        node.show();
        node.style.left = left;
        node.style.top = top;
        lib.listenEnd(node);
        return node;
      },
      $throwxy2: function (card, left, top, trans, flipx, flipy) {
        if (game.chess) {
          return this.$throwxy.apply(this, arguments);
        }
        var node = card.copy('thrown', 'thrownhighlight');
        node.style.left = left;
        node.style.top = top;
        node.hide();
        // node.style.transitionProperty='left,top,opacity,transform';

        var parseCalc = function (str) {
          var per = str.slice(str.indexOf('calc(') + 5, str.indexOf('%'));
          var add = str.slice(str.indexOf('%') + 1, str.indexOf('px')).replace(/\s/g, '');
          return [parseInt(per), parseInt(add)];
        }
        var nx = parseCalc(node.style.left);
        var ny = parseCalc(node.style.top);
        nx = nx[0] * ui.arena.offsetWidth / 100 + nx[1];
        ny = ny[0] * ui.arena.offsetHeight / 100 + ny[1];
        var dx = this.getLeft() + this.offsetWidth / 2 - 52 - nx;
        var dy = this.getTop() + this.offsetHeight / 2 - 52 - ny;
        if (flipx) dx = -dx;
        if (flipy) dy = -dy;
        if (trans) {
          node.style.transform = trans + ' translate(' + dx + 'px,' + dy + 'px)';
        }
        else {
          node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        }

        ui.arena.appendChild(node);
        ui.refresh(node);
        node.show();
        // node.style.transform=trans||'';
        lib.listenEnd(node);
        return node;
      },
      throwDice: function (num) {
        if (typeof num != 'number') {
          num = get.rand(6) + 1;
        }
        _status.event.num = num;
        if (!game.online) {
          game.pause();
        }
        game.broadcastAll(function (num) {
          var diceContainer = ui.create.div('.fullsize.dice-container', ui.window);
          ui.window.classList.add('dicepaused');
          var dice = ui.create.div('.dice');
          var side;

          side = ui.create.div('.side.front', dice);
          ui.create.div('.dot.center', side);
          ui.create.div('.side.front.inner', dice);

          side = ui.create.div('.side.top', dice);
          ui.create.div('.dot.dtop.dleft', side);
          ui.create.div('.dot.dbottom.dright', side);
          ui.create.div('.side.top.inner', dice);

          side = ui.create.div('.side.right', dice);
          ui.create.div('.dot.dtop.dleft', side);
          ui.create.div('.dot.center', side);
          ui.create.div('.dot.dbottom.dright', side);
          ui.create.div('.side.right.inner', dice);

          side = ui.create.div('.side.left', dice);
          ui.create.div('.dot.dtop.dleft', side);
          ui.create.div('.dot.dtop.dright', side);
          ui.create.div('.dot.dbottom.dleft', side);
          ui.create.div('.dot.dbottom.dright', side);
          ui.create.div('.side.left.inner', dice);

          side = ui.create.div('.side.bottom', dice);
          ui.create.div('.dot.center', side);
          ui.create.div('.dot.dtop.dleft', side);
          ui.create.div('.dot.dtop.dright', side);
          ui.create.div('.dot.dbottom.dleft', side);
          ui.create.div('.dot.dbottom.dright', side);
          ui.create.div('.side.bottom.inner', dice);

          side = ui.create.div('.side.back', dice);
          ui.create.div('.dot.dtop.dleft', side);
          ui.create.div('.dot.dtop.dright', side);
          ui.create.div('.dot.dbottom.dleft', side);
          ui.create.div('.dot.dbottom.dright', side);
          ui.create.div('.dot.center dleft', side);
          ui.create.div('.dot.center dright', side);
          ui.create.div('.side.back.inner', dice);

          ui.create.div('.side.cover.x', dice);
          ui.create.div('.side.cover.y', dice);
          ui.create.div('.side.cover.z', dice);

          var map = {
            1: [75, 0, 45],
            2: [-15, 45, 0],
            3: [165, -45, 90],
            4: [345, -45, 90],
            5: [345, -45, 180],
            6: [255, 0, 135]
          };
          dice.roll = function (deg) {
            if (typeof deg == 'number') {
              dice.current[0] += deg;
              deg = dice.current;
            }
            deg = deg.slice(0);
            dice.current = deg;
            this.style.transform = 'rotateX(' + deg[0] + 'deg) rotateY(' + deg[1] + 'deg) rotateZ(' + deg[2] + 'deg)';
          };
          dice.roll(map[num]);
          diceContainer.appendChild(dice);
          ui.refresh(dice);
          dice.roll(1025);

          dice.addEventListener('webkitTransitionEnd', function () {
            if (!dice.over) {
              dice.style.transition = 'transform 0.8s ease';
              dice.roll(-20);
              dice.over = true;
            }
            else if (!dice.resumed) {
              setTimeout(function () {
                diceContainer.delete();
                ui.window.classList.remove('dicepaused');
              }, 300);
              if (!game.online) {
                setTimeout(game.resume, 800);
              }
              dice.resumed = true;
            }
          });
        }, num);
      },
      $giveAuto: function (card, player) {
        if (Array.isArray(card) && card.length == 0) return;
        var args = Array.from(arguments);
        if (_status.connectMode || (!this.isUnderControl(true) && !player.isUnderControl(true))) {
          if (Array.isArray(card)) {
            card = card.length;
          }
          else {
            card = 1;
          }
          args[0] = card;
        }
        return this.$give.apply(this, args);
      },
      $give: function (card, player, log, init) {
        if (init !== false) {
          game.broadcast(function (source, card, player, init) {
            source.$give(card, player, false, init);
          }, this, card, player, init);
          if (typeof card == 'number' && card >= 0) {
            game.addVideo('give', this, [card, player.dataset.position]);
          }
          else {
            if (get.itemtype(card) == 'card') {
              card = [card];
            }
            if (get.itemtype(card) == 'cards') {
              game.addVideo('giveCard', this, [get.cardsInfo(card), player.dataset.position]);
            }
          }
        }
        if (get.itemtype(card) == 'cards') {
          if (log != false && !_status.video) {
            game.log(player, '从', this, '获得了', card);
          }
          if (this.$givemod) {
            this.$givemod(card, player);
          }
          else {
            for (var i = 0; i < card.length; i++) {
              this.$give(card[i], player, false, false);
            }
          }
        }
        else if (typeof card == 'number' && card >= 0) {
          if (log != false && !_status.video) {
            game.log(player, '从', this, '获得了' + get.cnNumber(card) + '张牌');
          }
          if (this.$givemod) {
            this.$givemod(card, player);
          }
          else {
            while (card--) this.$give('', player, false, false);
          }
        }
        else {
          if (log != false && !_status.video) {
            if (get.itemtype(card) == 'card' && log != false) {
              game.log(player, '从', this, '获得了', card);
            }
            else {
              game.log(player, '从', this, '获得了一张牌');
            }
          }
          if (this.$givemod) {
            this.$givemod(card, player);
          }
          else {
            var node;
            if (get.itemtype(card) == 'card') {
              node = card.copy('card', 'thrown', false);
            }
            else {
              node = ui.create.div('.card.thrown');
            }
            // node.dataset.position=this.dataset.position;
            node.fixed = true;
            this.$throwordered(node);
            // lib.listenEnd(node);
            // node.hide();
            // node.style.transitionProperty='left,top,opacity';
            //
            // node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
            //
            // ui.arena.appendChild(node);
            // ui.refresh(node);
            // node.show();
            // node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
            // node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

            node.listenTransition(function () {
              var dx = player.getLeft() + player.offsetWidth / 2 - 52 - node.offsetLeft;
              var dy = player.getTop() + player.offsetHeight / 2 - 52 - node.offsetTop;
              if (node.style.transform && node.style.transform != 'none' && node.style.transform.indexOf('translate') == -1) {
                node.style.transform += ' translate(' + dx + 'px,' + dy + 'px)';
              }
              else {
                node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
              }

              node.delete();
            });
            // setTimeout(function(){
            //     // node.removeAttribute('style');
            //     // node.dataset.position=player.dataset.position;
            //     var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
            //     var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
            //     if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
            //         node.style.transform+=' translate('+dx+'px,'+dy+'px)';
            //     }
            //     else{
            //         node.style.transform='translate('+dx+'px,'+dy+'px)';
            //     }
            //
            //     node.delete();
            // },700);
          }
        }
      },
      $equip: function (card, viewAs) {
        var originalName = card.originalName;
        if (viewAs && this.storage.disableEquip != undefined && this.storage.disableEquip.contains(get.subtype(viewAs))) {
          this.gain(card, 'gain2');
          game.log(this, '装备失败');
        }
        else if (this.storage.disableEquip != undefined && this.storage.disableEquip.contains(get.subtype(card))) {
          this.gain(card, 'gain2');
          game.log(this, '装备失败');
        }
        else {
          var player = this;
          game.broadcast(function (player, card, viewAs) {
            player.$equip(card, viewAs);
          }, player, card, viewAs);
          card.fix();
          card.style.transform = '';
          card.classList.remove('drawinghidden');
          delete card._transform;
          //已修改
          card.originalName = originalName;
          card.viewAs = viewAs;
          if (viewAs && viewAs != card.name) {
            if (card.classList.contains('fullskin') || card.classList.contains('fullborder')) {
              card.classList.add('fakejudge');
              card.node.background.innerHTML = lib.translate[viewAs.name + '_bg'] || get.translation(viewAs)[0];
            }
            card.classList.remove(get.subtype(card));
            card.classList.add(get.subtype(viewAs));
            if (typeof viewAs == 'string') card.viewAs = viewAs;
            else card.viewAs = viewAs.name;
          }
          else {
            card.classList.remove('fakejudge');
            delete card.viewAs;
          }
          //console.log(card.viewAs);
          if (card.viewAs && card.name != card.viewAs) {
            if (!card.originalName) card.originalName = card.name;
            card.name = card.viewAs;
          }
          var equipNum = get.equipNum(card);
          var equipped = false;
          for (var i = 0; i < player.node.equips.childNodes.length; i++) {
            if (get.equipNum(player.node.equips.childNodes[i]) >= equipNum) {
              player.node.equips.insertBefore(card, player.node.equips.childNodes[i]);
              equipped = true;
              break;
            }
          }
          if (!equipped) {
            player.node.equips.appendChild(card);
            if (_status.discarded) {
              _status.discarded.remove(card);
            }
          }
          var ecard = viewAs ? { name: viewAs } : card;
          var info = get.info(ecard);
          if (info.skills) {
            for (var i = 0; i < info.skills.length; i++) {
              player.addSkillTrigger(info.skills[i]);
            }
          }
          return player;
        };
      },
      $gain: function (card, log, init) {
        if (init !== false) {
          game.broadcast(function (player, card, init) {
            player.$gain(card, false, init);
          }, this, card, init);
          if (typeof card == 'number' && card >= 0) {
            game.addVideo('gain', this, card);
          }
          else {
            if (get.itemtype(card) == 'card') {
              card = [card];
            }
            if (get.itemtype(card) == 'cards') {
              game.addVideo('gainCard', this, get.cardsInfo(card));
            }
            else {
              game.addVideo('gain', this, 1);
            }
          }
        }
        if (get.itemtype(card) == 'cards') {
          if (log != false && !_status.video) {
            game.log(this, '获得了', card);
          }
          if (this.$gainmod) {
            this.$gainmod(card);
          }
          else {
            for (var i = 0; i < card.length; i++) {
              this.$gain(card[i], false, false);
            }
          }
        }
        else if (typeof card == 'number' && card > 1) {
          if (log != false && !_status.video) {
            game.log(this, '获得了' + get.cnNumber(card) + '张牌');
          }
          if (this.$gainmod) {
            this.$gainmod(card);
          }
          else {
            for (var i = 0; i < card; i++) {
              this.$gain(1, false, false);
            }
          }
        }
        else {
          if (get.itemtype(card) == 'card' && log != false && !_status.video) {
            game.log(this, '获得了', card);
          }
          if (this.$gainmod) {
            this.$gainmod(card);
          }
          else {
            var node;
            if (get.itemtype(card) == 'card') {
              // node=this.$throwordered(card.copy(),true);
              node = card.copy('thrown', false);
            }
            else {
              // node=this.$throwordered(ui.create.div('.card.thrown'),true);
              node = ui.create.div('.card.thrown');
              node.moveTo = lib.element.card.moveTo;
              node.moveDelete = lib.element.card.moveDelete;
            }
            node.fixed = true;
            node.style.left = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
            node.style.top = 'calc(50% - 52px ' + ((Math.random() - 0.5 < 0) ? '+' : '-') + ' ' + Math.random() * 100 + 'px)';
            node.style.transform = 'scale(0)';
            node.hide();
            ui.arena.appendChild(node);
            ui.refresh(node);
            node.show();
            node.style.transform = '';

            lib.listenEnd(node);
            var player = this;
            setTimeout(function () {
              node.moveDelete(player);
            }, 700);
          }
        }
      },
      $gain2: function (cards, log) {
        if (log === true) {
          game.log(this, '获得了', cards);
        }
        game.broadcast(function (player, cards) {
          player.$gain2(cards);
        }, this, cards);
        if (get.itemtype(cards) == 'card') cards = [cards];
        else if (get.itemtype(cards) != 'cards') return;
        var list = [], list2 = [];
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].clone &&
            (cards[i].clone.parentNode == this.parentNode ||
              cards[i].clone.parentNode == ui.arena) &&
            parseFloat(getComputedStyle(cards[i].clone).opacity) > 0.3) {
            cards[i].clone.moveDelete(this);
            list2.push(cards[i].clone);
          }
          else {
            list.push(cards[i]);
          }
        }
        if (list2.length) {
          game.addVideo('gain2', this, get.cardsInfo(list2));
        }
        if (list.length) {
          this.$draw(list, 'nobroadcast');
          return true;
        }
      },
      /**
       * 本角色播放技能动画
       */
      //TODO
      $skill: function (name, type, color, avatar) {
        if (typeof type != 'string') type = 'legend';
        if (!avatar) {
          this.playerfocus(1500);
          game.delay(2);
        }
        else {
          game.addVideo('playerfocus2');
          game.broadcastAll(function () {
            ui.arena.classList.add('playerfocus');
            setTimeout(function () {
              ui.arena.classList.remove('playerfocus');
            }, 1800)
          });
          game.delay(3);
        }
        var that = this;
        setTimeout(function () {
          game.broadcastAll(function (that, type, name, color, avatar) {
            if (lib.config.animation && !lib.config.low_performance) {
              if (game.chess) {
                that['$' + type + '2'](1200);
              }
              else {
                that['$' + type](1200);
              }
            }
            if (name) {
              that.$fullscreenpop(name, color, avatar);
            }
          }, that, type, name, color, avatar);
        }, avatar ? 0 : 300);
      },
      $fire: function () {
        game.addVideo('flame', this, 'fire');
        var left, top;
        if (game.chess) {
          var rect = this.getBoundingClientRect();
          left = rect.left;
          top = rect.top;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 20, 700, 'fire');
      },
      $thunder: function () {
        game.addVideo('flame', this, 'thunder');
        var left, top;
        if (game.chess) {
          var rect = this.getBoundingClientRect();
          left = rect.left;
          top = rect.top;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'thunder');
      },
      $rare2: function () {
        game.addVideo('flame', this, 'rare2');
        var rect = this.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top + 15;
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'rare');
      },
      $epic2: function () {
        game.addVideo('flame', this, 'epic2');
        var rect = this.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top + 15;
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'epic');
      },
      $legend2: function () {
        game.addVideo('flame', this, 'legend2');
        var rect = this.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top + 15;
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'legend');
      },
      $rare: function (time) {
        time = time || 700;
        game.addVideo('flame', this, 'rare');
        var left, top;
        if (game.chess) {
          left = this.getLeft() - ui.arena.offsetLeft;
          top = this.getTop() - ui.arena.offsetTop;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        if (this.classList.contains('minskin')) {
          top += 15;
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, time, 'rare');
      },
      $epic: function (time) {
        time = time || 700;
        game.addVideo('flame', this, 'epic');
        var left, top;
        if (game.chess) {
          left = this.getLeft() - ui.arena.offsetLeft;
          top = this.getTop() - ui.arena.offsetTop;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        if (this.classList.contains('minskin')) {
          top += 15;
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, time, 'epic');
      },
      $legend: function (time) {
        time = time || 700;
        game.addVideo('flame', this, 'legend');
        var left, top;
        if (game.chess) {
          left = this.getLeft() - ui.arena.offsetLeft;
          top = this.getTop() - ui.arena.offsetTop;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        if (this.classList.contains('minskin')) {
          top += 15;
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, time, 'legend');
      },
      $coin: function () {
        game.broadcast(function (player) {
          if (!lib.config.low_performance) {
            player.$coin();
          }
        }, this);
        game.addVideo('flame', this, 'coin');
        var left = this.getLeft() - ui.arena.offsetLeft;
        var top = this.getTop() - ui.arena.offsetTop;
        if (this.classList.contains('minskin')) {
          top += 15;
        }
        top -= 25;
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'coin');
      },
      $dust: function () {
        game.broadcast(function (player) {
          if (!lib.config.low_performance) {
            player.$dust();
          }
        }, this);
        game.addVideo('flame', this, 'dust');
        var left = this.getLeft() - ui.arena.offsetLeft;
        var top = this.getTop() - ui.arena.offsetTop;
        if (this.classList.contains('minskin')) {
          top += 15;
        }
        top -= 25;
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'dust');
      },
      $recover: function () {
        game.addVideo('flame', this, 'recover');
        var left, top;
        if (game.chess) {
          var rect = this.getBoundingClientRect();
          left = rect.left;
          top = rect.top;
        }
        else {
          left = this.getLeft();
          top = this.getTop();
        }
        game.animate.flame(left + this.offsetWidth / 2,
          top + this.offsetHeight - 30, 700, 'recover');
      },
      $fullscreenpop: function (str, nature, avatar, broadcast) {
        if (broadcast !== false) game.broadcast(function (player, str, nature, avatar) {
          player.$fullscreenpop(str, nature, avatar);
        }, this, str, nature, avatar);
        game.addVideo('fullscreenpop', this, [str, nature, avatar]);
        var node = ui.create.div('.damage');
        if (avatar && this.node) {
          if (avatar == 'vice') {
            if (lib.character[this.name2]) {
              avatar = this.node.avatar2;
            }
          }
          else {
            if (lib.character[this.name]) {
              avatar = this.node.avatar;
            }
          }
          if (!get.is.div(avatar)) {
            avatar = false;
          }
        }
        else {
          avatar = false;
        }
        if (avatar) {
          node.classList.add('fullscreenavatar');
          ui.create.div('', ui.create.div(node));
          // ui.create.div('',str.split('').join('<br>'),ui.create.div('.text.textbg',node));
          ui.create.div('', '<div>' + str.split('').join('</div><br><div>') + '</div>', ui.create.div('.text', node));
          node.firstChild.firstChild.style.backgroundImage = avatar.style.backgroundImage;
          if (str.length >= 7) node.lastChild.firstChild.className = 'long';
          node.dataset.nature = nature || 'unknown';
          var num = 0;
          var nodes = node.lastChild.firstChild.querySelectorAll('div');
          var interval = setInterval(function () {
            if (num < nodes.length) {
              nodes[num].classList.add('flashtext');
              num++;
            }
            else {
              clearInterval(interval);
            }
          }, 100);
        }
        else {
          avatar = false;
          node.innerHTML = str;
          node.dataset.nature = nature || 'soil';
        }
        if (avatar) {
          var rect1 = ui.window.getBoundingClientRect();
          var rect2 = this.getBoundingClientRect();
          var dx = Math.round(2 * rect2.left + rect2.width - rect1.width);
          var dy = Math.round(2 * rect2.top + rect2.height - rect1.height);
          node.style.transform = 'scale(0.5) translate(' + dx + 'px,' + dy + 'px)';
        }
        ui.window.appendChild(node);
        ui.refresh(node);
        if (avatar) {
          node.style.transform = 'scale(1)';
          node.style.opacity = 1;
        }
        else {
          node.classList.add('damageadded');
        }
        setTimeout(function () {
          node.delete();
          node.style.transform = 'scale(1.5)'
        }, avatar ? 1600 : 1000);
      },
      /**
       * 伤害效果
       * @param {(string|number)} num 伤害数值或者任意字符串
       * @param {string} [nature='soil'] 伤害属性
       * @param {?boolean} font 如果为true，`damage div`添加类`normal-font`；如果为false或未指定，使用伤害默认字体大小
       * @param {?boolean} nobroadcast 如果为true或未指定，调用`game.broadcast`广播；如果为false，仅在本机
       */
      $damagepop: function (num, nature, font, nobroadcast) {
        if (typeof num == 'number' || typeof num == 'string') {
          game.addVideo('damagepop', this, [num, nature, font]);
          if (nobroadcast !== false) game.broadcast(function (player, num, nature, font) {
            player.$damagepop(num, nature, font);
          }, this, num, nature, font);
          var node = ui.create.div('.damage');
          if (font) {
            node.classList.add('normal-font');
          }
          if (typeof num == 'number' && num > 0) {
            if (num == Infinity) num = '+∞'
            else num = '+' + num;
          }
          else if (num == -Infinity) num = '-∞';
          node.innerHTML = num;
          this.damagepopups.push(node);
          node.dataset.nature = nature || 'soil';
          if (this.damagepopups.length == 1) {
            this.$damagepop();
          }
        }
        else if (this.damagepopups.length) {
          var node = this.damagepopups[0];
          this.appendChild(node);
          ui.refresh(node);
          node.classList.add('damageadded');
          node.listenTransition(function () {
            setTimeout(function () {
              node.delete();
            }, 200);
          });
          // setTimeout(function(){
          //     node.delete();
          // },500);
          var that = this;
          setTimeout(function () {
            that.damagepopups.shift();
            that.$damagepop();
          }, 500);
        }
      },
      $damage: function (source) {
        if (get.itemtype(source) == 'player') {
          game.addVideo('damage', this, source.dataset.position);
        }
        else {
          game.addVideo('damage', this);
        }
        game.broadcast(function (player, source) {
          player.$damage(source);
        }, this, source);
        if (source && source != this && lib.config.damage_shake) {
          var left, top;
          if (source.getTop() == this.getTop()) {
            left = 20;
            top = 0;
          }
          else {
            var ratio = (source.getLeft() - this.getLeft()) / (source.getTop() - this.getTop());
            left = Math.abs(20 * ratio / Math.sqrt(1 + ratio * ratio));
            top = Math.abs(20 / Math.sqrt(1 + ratio * ratio));
          }
          if (source.getLeft() - this.getLeft() > 0) left = -left;
          if (source.getTop() - this.getTop() > 0) top = -top;
          if (get.is.mobileMe(this)) {
            if (this.classList.contains('linked')) {
              this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
              this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
            }
            else {
              this.node.avatar.style.transform = 'translate(' + left + 'px,' + top + 'px)';
              this.node.avatar2.style.transform = 'translate(' + left + 'px,' + top + 'px)';
            }
          }
          else if (this.classList.contains('linked') && get.is.newLayout()) {
            this.style.transform = 'translate(' + left + 'px,' + top + 'px) rotate(-90deg)';
          }
          else if (this._chesstransform) {
            this.style.transform = 'translate(' + (left + this._chesstransform[0]) + 'px,' + (top + this._chesstransform[1]) + 'px)';
          }
          else {
            this.style.transform = 'translate(' + left + 'px,' + top + 'px)';
          }
        }
        else {
          var zoom1 = 0.9, zoom2 = 0.95;
          if (arguments[1] == 'phase') {
            zoom1 = 1.05;
            zoom2 = 1.05;
          }
          if (get.is.mobileMe(this)) {
            if (this.classList.contains('linked')) {
              this.node.avatar.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
              this.node.avatar2.style.transform = 'scale(' + zoom1 + ') rotate(-90deg)';
            }
            else {
              this.node.avatar.style.transform = 'scale(' + zoom1 + ')';
              this.node.avatar2.style.transform = 'scale(' + zoom1 + ')';
            }
          }
          else if (this.classList.contains('linked') && get.is.newLayout()) {
            this.style.transform = 'scale(' + zoom2 + ') rotate(-90deg)';
          }
          else if (game.chess && this._chesstransform) {
            this.style.transform = 'translate(' + this._chesstransform[0] + 'px,' + this._chesstransform[1] + 'px) scale(' + zoom2 + ')';
          }
          else {
            this.style.transform = 'scale(' + zoom2 + ')';
          }
        }
        this.queue();
      },
      $die: function () {
        game.addVideo('die', this);
        game.broadcast(function (player) {
          player.$die();
        }, this);
        if (lib.config.die_move != 'off') {
          this.$dieflip(lib.config.die_move);
        }
        if (lib.element.player.$dieAfter) {
          lib.element.player.$dieAfter.call(this);
        }
      },
      $dieflip: function (type) {
        var top0 = ui.window.offsetHeight / 2;
        var left0 = ui.window.offsetWidth / 2;
        var ratio = (left0 - this.getLeft()) / (top0 - this.getTop());
        var left = Math.abs(50 * ratio / Math.sqrt(1 + ratio * ratio));
        var top = Math.abs(50 / Math.sqrt(1 + ratio * ratio));
        if (left0 - this.getLeft() > 0) left = -left;
        if (top0 - this.getTop() > 0) top = -top;
        if (get.is.mobileMe(this)) {
          left = -Math.random() * 5 - 10;
          top = Math.random() * 5 + 10;
        }
        if (this._chesstransform) {
          left += this._chesstransform[0];
          top += this._chesstransform[1];
        }
        var transform = 'translate(' + left + 'px,' + top + 'px) ' +
          'rotate(' + (Math.random() * 20 - 10) + 'deg) ';
        if (type == 'flip') {
          if (game.layout == 'long' || game.layout == 'long2') {
            transform += 'rotateY(180deg)';
          }
          else {
            transform += ((Math.random() - 0.5 < 0) ? 'rotateX(180deg)' : 'rotateY(180deg)');
          }
        }
        if (get.is.mobileMe(this)) {
          this.node.avatar.style.transform = transform;
          this.node.avatar2.style.transform = transform;
          this.style.transform = '';
        }
        else {
          this.node.avatar.style.transform = '';
          this.node.avatar2.style.transform = '';
          this.style.transform = transform;
        }
        this.queue(false);
      },
      $phaseJudge: function (card) {
        game.addVideo('phaseJudge', this, get.cardInfo(card));
        var player = this;
        var clone = player.$throw(card);
        if (lib.config.low_performance && card && card.clone) {
          var waitingForTransition = get.time();
          _status.waitingForTransition = waitingForTransition;
          card.clone.listenTransition(function () {
            if (_status.waitingForTransition == waitingForTransition && _status.paused) {
              game.resume();
            }
          });
          game.pause();
        }
        else {
          game.delay();
        }
      }
    },
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