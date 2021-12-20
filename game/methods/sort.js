{
  /**
   * 用于简单排序的回调函数组
   * @name sort
   * @namespace
   */
  let { game, ui, get, ai, lib, _status } = window.vkCore
  window.methods_sort = {
    /**
     * 将角色按照势力排列
     * @name sort.character
     * @function
     */
    character: function (a, b) {
      var getGroup = function (name) {
        var group = get.is.double(name, true);
        if (group) return group[0];
        return lib.character[name][1];
      },
        groupSort = function (name) {
          if (!lib.character[name]) return 50;
          var group = getGroup(name);
          if (group == 'shen') return -1;
          var list = get.groups();
          if (list.contains(group)) return list.indexOf(group);
          return 49;
        };
      var del = groupSort(a) - groupSort(b);
      if (del != 0) return del;
      var aa = a, bb = b;
      if (a.indexOf('_') != -1) {
        a = a.slice(a.indexOf('_') + 1);
      }
      if (b.indexOf('_') != -1) {
        b = b.slice(b.indexOf('_') + 1);
      }
      if (a != b) {
        return a > b ? 1 : -1;
      }
      return aa > bb ? 1 : -1;
    },
    /**
     * 将卡牌按照类型排列
     * @name sort.card
     * @function
     */
    card: function (a, b) {
      var typeSort = function (name) {
        var type = get.type(name);
        if (!type) return 10;
        if (type == 'basic') return -1;
        if (type == 'trick') return 0;
        if (type == 'delay') return 1;
        if (type == 'equip') {
          var type2 = get.subtype(name);
          if (type2 && type2.slice) return 1 + parseInt(type2.slice(5) || 7);
          return 8.5
        }
        return 9;
      }
      var del = typeSort(a) - typeSort(b);
      if (del != 0) return del;
      var aa = a, bb = b;
      if (a.indexOf('_') != -1) {
        a = a.slice(a.indexOf('_') + 1);
      }
      if (b.indexOf('_') != -1) {
        b = b.slice(b.indexOf('_') + 1);
      }
      if (a != b) {
        return a > b ? 1 : -1;
      }
      return aa > bb ? 1 : -1;
    },
    random: function () {
      return (Math.random() - 0.5);
    },
    /**
     * 将角色按照距离排列
     * @name sort.seat
     * @function
     */
    seat: function (a, b) {
      var player = lib.tempSortSeat || _status.event.player;
      var delta = get.distance(player, a, 'absolute') - get.distance(player, b, 'absolute');
      if (delta) return delta;
      delta = parseInt(a.dataset.position) - parseInt(b.dataset.position);
      if (player.side == game.me.side) return delta;
      return -delta;
    },
    position: function (a, b) {
      return parseInt(a.dataset.position) - parseInt(b.dataset.position);
    },
    priority: function (a, b) {
      var i1 = get.info(a[0]), i2 = get.info(b[0]);
      if (i1.priority == undefined) i1.priority = 0;
      if (i2.priority == undefined) i2.priority = 0;
      if (i1.priority == i2.priority) {
        if (i1.forced == undefined && i2.forced == undefined) return 0;
        if (i1.forced && i2.forced) return 0;
        if (i1.forced) return 1;
        if (i2.forced) return -1;
      }
      return i2.priority - i1.priority;
    },
    number: function (a, b) {
      return get.number(a) - get.number(b);
    },
    number2: function (a, b) {
      return get.number(b) - get.number(a);
    },
    capt: function (a, b) {
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
    },
    name: function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  }
}