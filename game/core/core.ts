/**
 * 游戏内核模块
 * @module core
 */
globalThis.moduleManager.define([], function(){
    return /**@lends module:core */ {
        _status:{},
        lib:{},
        game: {},
        ui: {},
        get: {},
        ai: {}
    };
});