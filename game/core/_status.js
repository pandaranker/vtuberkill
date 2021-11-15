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
    (0, _context_1.mixin)(_context_1._status, {
        paused: false,
        paused2: false,
        paused3: false,
        over: false,
        clicked: false,
        auto: false,
        event: new Status_Event_1.default({
            finished: true,
            next: [],
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
