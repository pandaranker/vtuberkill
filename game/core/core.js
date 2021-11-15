var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_status", "./lib", "./game", "./ui", "./get", "./ai", "./_context"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mixin = exports.ai = exports.get = exports.ui = exports.game = exports.lib = exports._status = void 0;
    const _status_1 = __importDefault(require("./_status"));
    exports._status = _status_1.default;
    const lib_1 = __importDefault(require("./lib"));
    exports.lib = lib_1.default;
    const game_1 = __importDefault(require("./game"));
    exports.game = game_1.default;
    const ui_1 = __importDefault(require("./ui"));
    exports.ui = ui_1.default;
    const get_1 = __importDefault(require("./get"));
    exports.get = get_1.default;
    const ai_1 = __importDefault(require("./ai"));
    exports.ai = ai_1.default;
    const _context_1 = require("./_context");
    Object.defineProperty(exports, "mixin", { enumerable: true, get: function () { return _context_1.mixin; } });
});
