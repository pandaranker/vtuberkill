(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mixin = exports.ai = exports.get = exports.ui = exports.game = exports.lib = exports._status = void 0;
    ///<reference path="./_status.d.ts" />
    ///<reference path="./lib.d.ts" />
    const _status = {};
    exports._status = _status;
    const lib = {};
    exports.lib = lib;
    const game = {};
    exports.game = game;
    const ui = {};
    exports.ui = ui;
    const get = {};
    exports.get = get;
    const ai = {};
    exports.ai = ai;
    /**
         * 混入函数
         * @param {(object|prototype)} ori 被混入的对象[原型]
         * @param {Object} mix 混入的对象
         * @returns {undefined}
         */
    function mixin(ori, mix) {
        if (!mix || !ori)
            return ori;
        for (const key of Object.keys(mix)) {
            if (!ori[key]) {
                ori[key] = mix[key];
            }
            else if (typeof mix[key] === 'function' && typeof ori[key] === 'function') {
                console.warn('Function[' + key + '] is overridden.');
                let oriFunc = ori[key];
                ori[key] = function () {
                    oriFunc.apply(this, arguments);
                    mix[key].apply(this, arguments);
                };
            }
            else if (Array.isArray(mix[key]) && Array.isArray(ori[key])) {
                ori[key].push(...mix[key]);
            }
            else {
                console.warn('Property[' + ori[key] + '] is overridden[' + mix[key] + '].');
                ori[key] = mix[key];
            }
        }
        return ori;
    }
    exports.mixin = mixin;
});
