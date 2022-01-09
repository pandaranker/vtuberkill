let { game, ui, get, ai, lib, _status } = vkCore
/**检测类game方法 */
module.exports = {
    /**
     * 判定是否存在满足条件的角色
     * @param {?Function} func 用于筛选的函数
     * @returns {!boolean} 是否存在
     */
    hasPlayer: function (func) {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut()) continue;
            if (func(game.players[i])) return true;
        }
        return false;
    },
    /**
     * 判定是否存在满足条件的角色（包括已死亡角色）
     * @param {?Function} func 用于筛选的函数
     * @returns {!boolean} 是否存在
     */
    hasPlayer2: function (func) {
        var players = game.players.slice(0).concat(game.dead);
        for (var i = 0; i < players.length; i++) {
            if (players[i].isOut()) continue;
            if (func(players[i])) return true;
        }
        return false;
    },
    /**
     * 获取满足条件的角色
     * @param {?Function} func 用于筛选的函数
     * @returns {Array<HTMLDivElement>} 由满足条件的角色组成的数组
     */
    countPlayer: function (func) {
        var num = 0;
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut()) continue;
            var result = func(game.players[i]);
            if (typeof result == 'number') {
                num += result;
            }
            else if (result) {
                num++;
            }
        }
        return num;
    },
    /**
     * 获取满足条件的角色（包括已死亡角色）
     * @param {?Function} func 用于筛选的函数
     * @returns {Array<HTMLDivElement>} 由满足条件的角色组成的数组
     */
    countPlayer2: function (func) {
        var num = 0;
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        var players = game.players.slice(0).concat(game.dead);
        for (var i = 0; i < players.length; i++) {
            if (players[i].isOut()) continue;
            var result = func(players[i]);
            if (typeof result == 'number') {
                num += result;
            }
            else if (result) {
                num++;
            }
        }
        return num;
    },
    filterPlayer: function (func, list) {
        if (!Array.isArray(list)) {
            list = [];
        }
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut()) continue;
            if (func(game.players[i])) {
                list.add(game.players[i]);
            }
        }
        return list;
    },
    filterPlayer2: function (func, list) {
        if (!Array.isArray(list)) {
            list = [];
        }
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        var players = game.players.slice(0).concat(game.dead);
        for (var i = 0; i < players.length; i++) {
            if (players[i].isOut()) continue;
            if (func(players[i])) {
                list.add(players[i]);
            }
        }
        return list;
    },
    findPlayer: function (func) {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut()) continue;
            if (func(game.players[i])) {
                return game.players[i];
            }
        }
        return null;
    },
    findPlayer2: function (func) {
        var players = game.players.slice(0).concat(game.dead);
        for (var i = 0; i < players.length; i++) {
            if (players[i].isOut()) continue;
            if (func(players[i])) {
                return players[i];
            }
        }
        return null;
    },
    findCards: function (func, all) {
        var cards = [];
        for (var i in lib.card) {
            if (!lib.translate[i + '_info']) continue;
            if (lib.card[i].mode && lib.card[i].mode.contains(lib.config.mode) == false) continue;
            if (!all && !lib.inpile.contains(i)) continue;
            if (func(i, lib.card[i])) {
                cards.push(i);
            }
        }
        return cards;
    },
    /**
     * 用 countPlayer 计算场上存在的势力数
     * @returns {!number} 势力数
     */
    countGroup: function () {
        var list = lib.group.slice(0);
        return game.countPlayer(function (current) {
            if (list.contains(current.group)) {
                list.remove(current.group);
                return true;
            }
        });
    },
}