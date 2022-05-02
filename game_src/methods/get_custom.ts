/// <reference path = "../built-in.d.ts" />
module.exports = {
    getData(vkCore) {
        const { game, ui, get, ai, lib, _status } = vkCore
        return {
            charaGroups: (name) => {
                let double = get.is.double(name, true)
                if (double) return double
                let source = lib.character[name][1]
                if (source instanceof Array) {
                    return source
                }
                else {
                    return [source]
                }
            },
            charaMisson: (name) => {
                if (!lib.character[name] || !lib.character[name][4]) return false;
                for (let i of lib.character[name][4]) {
                    if (i.indexOf('misson:') == 0) {
                        return i.split(':')[1];
                    }
                }
                return false;
            },
        }
    }
}