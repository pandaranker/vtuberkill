{
  /**
   * 用于简单筛选的回调函数组
   * @namespace
   */
  let { game, ui, get, ai, lib, _status } = window.vkCore
  lib.filter = {
    all: function () {
      return true;
    },
    buttonIncluded: function (button) {
      return !(_status.event.excludeButton && _status.event.excludeButton.contains(button));
    },
    filterButton: function (button) {
      return true;
    },
    /**
     * 检测角色A能否使用某卡牌救治角色B
     * @function
     * @param {!GameCores.GameObjects.Card} card 检测卡牌
     * @param {!GameCores.GameObjects.Player} player 卡牌使用者(角色A)
     * @param {!GameCores.GameObjects.Player} target 卡牌目标(角色B)
     * @returns {!boolean} 如果可触发，返回true；否则返回false
     */
    cardSavable: function (card, player, target) {
      var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
      if (mod2 != 'unchanged') return mod2;
      var mod = game.checkMod(card, player, target, 'unchanged', 'cardSavable', player);
      if (mod != 'unchanged') return mod;
      var savable = get.info(card).savable;
      if (typeof savable == 'function') savable = savable(card, player, target);
      return savable;
    },
    /**
     * 检测技能的trigger事件是否可触发
     * @function
     * @param {!GameCores.Bases.Event} event 父事件
     * @param {!GameCores.GameObjects.Player} player 触发对象(角色)
     * @param {!string} name 触发器名/触发条件，即triggername
     * @param {!string} skill 技能ID
     * @returns {!boolean} 如果可触发，返回true；否则返回false
     */
    filterTrigger: function (event, player, name, skill) {
      if (player._hookTrigger) {
        for (let i = 0; i < player._hookTrigger.length; i++) {
          let info = lib.skill[player._hookTrigger[i]].hookTrigger;
          if (info) {
            if (info.block && info.block(event, player, name, skill)) {
              return false;
            }
          }
        }
      }
      var fullskills = game.expandSkills(player.getSkills().concat(lib.skill.global));
      var info = get.info(skill);
      if ((info.noHidden || get.mode() != 'guozhan') && !fullskills.contains(skill)) {
        return false;
      }
      if (!info.trigger) return false;
      var bool = false;
      var has = function (obj) {
        if (typeof obj == 'string') return obj == name;
        else if (obj.contains(name)) return true;
        return false;
      }
      for (let i in info.trigger) {//check trigger
        if ((i == 'global' || player == event[i]) && has(info.trigger[i])) {
          bool = true; break;
        }
      }
      if (!bool) return false;
      if (info.filter && !info.filter(event, player, name)) {
        return false;
      }
      if (event._notrigger.contains(player) && !lib.skill.global.contains(skill)) {
        return false;
      }
      if (typeof info.usable == 'number' && player.hasSkill('counttrigger') &&
        player.storage.counttrigger && player.storage.counttrigger[skill] >= info.usable) {
        return false;
      }
      if (info.round && player.storage[skill + '_roundcount'] > 0) {
        return false;
      }
      return true;
    },
    characterDisabled: function (i, libCharacter) {
      if (!lib.character[i] || lib.character[i][4] && lib.character[i][4].contains('forbidai')) return true;
      if (lib.character[i][4] && lib.character[i][4].contains('unseen')) return true;
      if (lib.config.forbidai.contains(i)) return true;
      if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
      if (_status.connectMode) {
        if (lib.configOL.banned.contains(i) || lib.connectBanned.contains(i)) return true;
        if (lib.configOL.protect_beginner && get.is.banForBeginner(i)) return true;
        var double_character = false;
        if (lib.configOL.mode == 'guozhan') {
          double_character = true;
        }
        else if (lib.configOL.double_character && (lib.configOL.mode == 'identity' || lib.configOL.mode == 'stone')) {
          double_character = true;
        }
        else if (lib.configOL.double_character_jiange && (lib.configOL.mode == 'versus' && _status.mode == 'jiange')) {
          double_character = true;
        }
        if (double_character && lib.config.forbiddouble.contains(i)) {
          return true;
        }
        // if(lib.configOL.ban_weak){
        //     if(lib.config.replacecharacter[i]&&libCharacter&&libCharacter[lib.config.replacecharacter[i]]) return true;
        //     if(lib.config.forbidall.contains(i)) return true;
        //     if(!double_character&&get.rank(i,true)<=2){
        //         return true;
        //     }
        // }
        // if(lib.configOL.ban_strong&&get.rank(i,true)>=8){
        //     return true;
        // }
      }
      else {
        if (lib.config.banned.contains(i)) return true;
        var double_character = false;
        if (get.mode() == 'guozhan') {
          double_character = true;
        }
        else if (get.config('double_character') && (lib.config.mode == 'identity' || lib.config.mode == 'stone')) {
          double_character = true;
        }
        else if (get.config('double_character_jiange') && (lib.config.mode == 'versus' && _status.mode == 'jiange')) {
          double_character = true;
        }
        if (double_character && lib.config.forbiddouble.contains(i)) {
          return true;
        }
        // if(get.config('ban_weak')){
        //     if(lib.config.replacecharacter[i]&&lib.character[lib.config.replacecharacter[i]]) return true;
        //     if(lib.config.forbidall.contains(i)) return true;
        //     if(!double_character&&get.rank(i,true)<=2){
        //         return true;
        //     }
        // }
        // if(get.config('ban_strong')&&get.rank(i,true)>=8){
        //     return true;
        // }
      }
    },
    characterDisabled2: function (i) {
      var info = lib.character[i];
      if (!info) return true;
      if (info[4]) {
        if (info[4].contains('boss')) return true;
        if (info[4].contains('hiddenboss')) return true;
        if (info[4].contains('minskin')) return true;
        if (info[4].contains('unseen')) return true;
        if (info[4].contains('forbidai') && (!_status.event.isMine || !_status.event.isMine())) return true;
        if (lib.characterFilter[i] && !lib.characterFilter[i](get.mode())) return true;
      }
      return false;
    },
    skillDisabled: function (skill) {
      if (!lib.translate[skill] || !lib.translate[skill + '_info']) return true;
      var info = lib.skill[skill];
      if (info && !info.unique && !info.temp && !info.sub && !info.fixed && !info.vanish) {
        return false;
      }
      return true;
    },
    cardEnabled: function (card, player, event) {
      if (player == undefined) player = _status.event.player;
      if (!player) return false;
      var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
      if (mod2 != 'unchanged') return mod2;
      card = get.autoViewAs(card, null, player);
      if (event === 'forceEnable') {
        var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled', player);
        if (mod != 'unchanged') return mod;
        return true;
      }
      else {
        var filter = get.info(card).enable;
        if (!filter) return;
        var mod = game.checkMod(card, player, 'unchanged', 'cardEnabled', player);
        if (mod != 'unchanged') return mod;
        if (typeof filter == 'boolean') return filter;
        if (typeof filter == 'function') return filter(card, player, event);
      }
    },
    cardRespondable: function (card, player, event) {
      event = event || _status.event;
      if (event.name != 'chooseToRespond') return true;
      var source = event.getParent().player;
      if (source && source != player) {
        if (source.hasSkillTag('norespond', false, [card, player, event], true)) {
          return false;
        }
      }
      if (player == undefined) player = _status.event.player;
      var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
      if (mod2 != 'unchanged') return mod2;
      var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
      if (mod != 'unchanged') return mod;
      return true;
    },
    cardUsable2: function (card, player, event) {
      card = get.autoViewAs(card, null, player);
      var info = get.info(card);
      if (info.updateUsable == 'phaseUse') {
        event = event || _status.event;
        if (player != _status.event.player) return true;
        if (event.getParent().name != 'phaseUse') return true;
        if (event.getParent().player != player) return true;
      }
      var num = info.usable;
      if (typeof num == 'function') num = num(card, player);
      num = game.checkMod(card, player, num, 'cardUsable', player);
      if (typeof num != 'number') return true;
      else return (player.countUsed(card) < num);
    },
    cardUsable: function (card, player, event) {
      card = get.autoViewAs(card, null, player);
      var info = get.info(card);
      event = event || _status.event;
      if (player != _status.event.player) return true;
      if (info.updateUsable == 'phaseUse') {
        if (event.getParent().name != 'phaseUse') return true;
        if (event.getParent().player != player) return true;
      }
      event.addCount_extra = true;
      var num = info.usable;
      if (typeof num == 'function') num = num(card, player);
      num = game.checkMod(card, player, num, 'cardUsable', player);
      if (typeof num != 'number') return true;
      if (player.countUsed(card) < num) return true;
      if (game.hasPlayer(function (current) {
        return game.checkMod(card, player, current, false, 'cardUsableTarget', player);
      })) {
        return true;
      }
      return false;
    },
    cardDiscardable: function (card, player, event) {
      event = event || _status.event;
      if (typeof event != 'string') event = event.getParent().name;
      var mod = game.checkMod(card, player, event, 'unchanged', 'cardDiscardable', player);
      if (mod != 'unchanged') return mod;
      return true;
    },
    canBeDiscarded: function (card, player, target, event) {
      event = event || _status.event;
      if (typeof event != 'string') event = event.getParent().name;
      var mod = game.checkMod(card, player, target, event, 'unchanged', 'canBeDiscarded', target);
      if (mod != 'unchanged') return mod;
      return true;
    },
    canBeGained: function (card, player, target, event) {
      event = event || _status.event;
      if (typeof event != 'string') event = event.getParent().name;
      var mod = game.checkMod(card, player, target, event, 'unchanged', 'canBeGained', target);
      if (mod != 'unchanged') return mod;
      return true;
    },
    cardAiIncluded: function (card) {
      if (_status.event.isMine()) return true;
      return (_status.event._aiexclude.contains(card) == false);
    },
    filterCard: function (card, player, event) {
      var info = get.info(card);
      //if(info.toself&&!lib.filter.targetEnabled(card,player,player)) return false;
      if (player == undefined) player = _status.event.player;
      if (!lib.filter.cardEnabled(card, player, event) || !lib.filter.cardUsable(card, player, event)) return false;
      if (info.notarget) return true;
      var range;
      var select = get.copy(info.selectTarget);
      if (select == undefined) {
        if (info.filterTarget == undefined) return true;
        range = [1, 1];
      }
      else if (typeof select == 'number') range = [select, select];
      else if (get.itemtype(select) == 'select') range = select;
      else if (typeof select == 'function') range = select(card, player);
      if (!range[1]) console.log(card, select, range)
      game.checkMod(card, player, range, 'selectTarget', player);
      if (!range || range[1] != -1) return true;
      var filterTarget = (event && event.filterTarget) ? event.filterTarget : lib.filter.filterTarget;
      return game.hasPlayer(function (current) {
        return filterTarget(card, player, current);
      });
    },
    targetEnabledx: function (card, player, target) {
      if (!card) return false;
      if (_status.event.addCount_extra && !lib.filter.cardUsable2(card, player) && !game.checkMod(card, player, target, false, 'cardUsableTarget', player)) return false;
      return lib.filter.targetEnabled.apply(this, arguments);
    },
    targetEnabled: function (card, player, target) {
      if (!card) return false;
      var info = get.info(card);
      var filter = info.filterTarget;
      var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
      if (mod == false) return false;
      if (!info.singleCard || ui.selected.targets.length == 0) {
        var mod = game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target);
        if (mod != 'unchanged') return mod;
      }
      if (typeof filter == 'boolean') return filter;
      if (typeof filter == 'function') return filter(card, player, target);
    },
    targetEnabled2: function (card, player, target) {
      if (lib.filter.targetEnabled(card, player, target)) return true;
      if (!card) return false;

      if (game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player) == false) return false;
      if (game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target) == false) return false;

      var filter = get.info(card).modTarget;
      if (typeof filter == 'boolean') return filter;
      if (typeof filter == 'function') return filter(card, player, target);
      return false;
    },
    targetEnabled3: function (card, player, target) {
      if (!card) return false;
      var info = get.info(card);

      if (info.filterTarget == true) return true;
      if (typeof info.filterTarget == 'function' && info.filterTarget(card, player, target)) return true;

      if (info.modTarget == true) return true;
      if (typeof info.modTarget == 'function' && info.modTarget(card, player, target)) return true;
      return false;
    },
    targetInRange: function (card, player, target) {
      var mod = game.checkMod(card, player, target, 'unchanged', 'targetInRange', player);
      var extra = 0;
      if (mod != 'unchanged') {
        if (typeof mod == 'boolean') return mod;
        if (typeof mod == 'number') extra = mod;
      }
      var info = get.info(card);
      var range = info.range;
      var outrange = info.outrange;
      if (range == undefined && outrange == undefined) return true;

      if (player.hasSkill('undist') || target.hasSkill('undist')) return false;
      for (var i in range) {
        if (i == 'attack') {
          if (player.inRange(target)) return true;
          var range2 = player.getAttackRange();
          if (range2 <= 0) return false;
          var distance = get.distance(player, target) + extra;
          if (range[i] <= distance - range2) return false;
        }
        else {
          var distance = get.distance(player, target, i) + extra;
          if (range[i] < distance) return false;
        }
      }
      for (var i in outrange) {
        if (i == 'attack') {
          var range2 = player.getAttackRange();
          if (range2 <= 0) return false;
          var distance = get.distance(player, target) + extra;
          if (outrange[i] > distance - range2 + 1) return false;
        }
        else {
          var distance = get.distance(player, target, i) + extra;
          if (outrange[i] > distance) return false;
        }
      }
      return true;
    },
    filterTarget: function (card, player, target) {
      return (lib.filter.targetEnabledx(card, player, target) &&
        lib.filter.targetInRange(card, player, target));
    },
    filterTarget2: function (card, player, target) {
      return (lib.filter.targetEnabled2(card, player, target) &&
        lib.filter.targetInRange(card, player, target));
    },
    notMe: function (card, player, target) {
      return player != target;
    },
    isMe: function (card, player, target) {
      return player == target;
    },
    attackFrom: function (card, player, target) {
      return get.distance(player, target, 'attack') <= 1;
    },
    globalFrom: function (card, player, target) {
      return get.distance(player, target) <= 1;
    },
    selectCard: function () {
      return [1, 1];
    },
    selectTarget: function () {
      var card = get.card(), player = get.player();
      if (card == undefined) return;
      var range;
      var select = get.copy(get.info(card).selectTarget);
      if (select == undefined) {
        if (get.info(card).filterTarget == undefined) return [0, 0];
        range = [1, 1];
      }
      else if (typeof select == 'number') range = [select, select];
      else if (get.itemtype(select) == 'select') range = select;
      else if (typeof select == 'function') range = select(card, player);
      game.checkMod(card, player, range, 'selectTarget', player);
      return range;
    },
    judge: function (card, player, target) {
      var judges = target.getCards('j');
      for (var i = 0; i < judges.length; i++) {
        if ((judges[i].viewAs || judges[i].name) == card.name) return false;
      }
      return true;
    },
    autoRespondSha: function () {
      return !this.player.hasSha(true);
    },
    autoRespondShan: function () {
      return !this.player.hasShan();
    },
    wuxieSwap: function (event) {
      if (event.type == 'wuxie') {
        if (ui.wuxie && ui.wuxie.classList.contains('glow')) {
          return true;
        }
        if (ui.tempnowuxie && ui.tempnowuxie.classList.contains('glow') && event.state > 0) {
          var triggerevent = event.getTrigger();
          if (triggerevent) {
            if (ui.tempnowuxie._origin == triggerevent.parent.id) {
              return true;
            }
          }
          else if (ui.tempnowuxie._origin == _status.event.id2) {
            return true;
          }
        }
        if (!_status.connectMode && lib.config.wuxie_self && event.getParent().state) {
          var tw = event.getTrigger().parent;
          if (tw.player.isUnderControl(true) && !tw.player.hasSkillTag('noautowuxie') &&
            tw.targets && tw.targets.length == 1 && !tw.noai) {
            return true;
          }
        }
      }
    }
  }
}