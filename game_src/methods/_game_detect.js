let { game, ui, get, ai, lib, _status } = vkCore
/**检测类game方法 */
module.exports = {
    players2: () => {
        return game.players.slice(0).concat(game.dead)
    },
    /**
     * 判定是否存在满足条件的角色
     * @param {?Function} func 用于筛选的函数
     * @returns {!boolean} 是否存在
     */
    hasPlayer: function (func) {
        return game.players.some(p => !p.isOut() && func(p));
    },
    /**
     * 判定是否存在满足条件的角色（包括已死亡角色）
     * @param {?Function} func 用于筛选的函数
     * @returns {!boolean} 是否存在
     */
    hasPlayer2: function (func) {
        return game.players2().some(p => !p.isOut() && func(p));
    },
    /**
     * 获取满足条件的角色
     * @param {?Function} func 用于筛选的函数
     * @returns {Array<HTMLDivElement>} 由满足条件的角色组成的数组
     */
    countPlayer: function (func) {
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        return game.players.reduce((num, p) => {
            if (p.isOut()) return num
            let result = func(p);
            if (typeof result == 'number') {
                return num + result;
            }
            else if (result) {
                return num + 1;
            }
            return num
        }, 0);
    },
    /**
     * 获取满足条件的角色（包括已死亡角色）
     * @param {?Function} func 用于筛选的函数
     * @returns {Array<HTMLDivElement>} 由满足条件的角色组成的数组
     */
    countPlayer2: function (func) {
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        return game.players2().reduce((num, p) => {
            if (p.isOut()) return num
            let result = func(p);
            if (typeof result == 'number') {
                return num + result;
            }
            else if (result) {
                return num + 1;
            }
            return num
        }, 0);
    },
    filterPlayer: function (func, list) {
        if (!Array.isArray(list)) {
            list = [];
        }
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        return _.uniq(game.players.filter(p => !p.isOut() && func(p)).concat(list))
    },
    filterPlayer2: function (func, list) {
        if (!Array.isArray(list)) {
            list = [];
        }
        if (typeof func != 'function') {
            func = lib.filter.all;
        }
        return _.uniq(game.players2().filter(p => !p.isOut() && func(p)).concat(list))

    },
    findPlayer: function (func) {
        return game.players.find(p => !p.isOut() && func(p)) || null;
    },
    findPlayer2: function (func) {
        return game.players2().find(p => !p.isOut() && func(p)) || null;
    },
    findCards: function (func, all) {
        let cards = [];
        for (let i in lib.card) {
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
        let list = lib.group.slice(0);
        return game.countPlayer(cur => {
            if (list.includes(cur.group)) {
                list.remove(cur.group);
                return true;
            }
        });
    },
}