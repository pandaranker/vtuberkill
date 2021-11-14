var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_context", "./base/Status_Event"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _context_1 = require("./_context");
    const Status_Event_1 = __importDefault(require("./base/Status_Event"));
    /**
     * 其中的变量是游戏中的全局变量
     * @namespace _status
     * @memberof module:core
     */
    (0, _context_1.mixin)(_context_1._status, /**@lends module:core._status */ {
        paused: false,
        paused2: false,
        paused3: false,
        over: false,
        clicked: false,
        auto: false,
        /**
         * 当前事件对象，游戏内所有未定义的event等价于_status.event
         * @name _status.event
         * @type {!Object}
         */
        event: new Status_Event_1.default({
            finished: true,
            /**
             * _status.event.next：插入事件列表，当前step结束后，该列表内的事件会被执行
             * {@link game.createEvent}生成的事件默认插入其中
             * @name _status.event_next
             * @type {!Array}
             */
            next: [],
            /**
             * _status.event.after：后续事件列表，当前事件结束后，该列表内的事件会被执行
             * @name _status.event_after
             * @type {!Array}
             */
            after: []
        }),
        ai: {},
        lastdragchange: [],
        skillaudio: [],
        dieClose: [],
        dragline: [],
        dying: [],
        globalHistory: [{
                cardMove: [],
                custom: [],
            }],
        cardtag: {
            yingbian_zhuzhan: [],
            yingbian_kongchao: [],
            yingbian_fujia: [],
            yingbian_canqu: [],
        },
        prehidden_skills: []
    });
    exports.default = _context_1._status;
});
