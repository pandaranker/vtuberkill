export default {
  vkFun: function () {
    /**
     * 其中的变量是游戏中的全局变量，因为是在IIFE中声明而不是实际上的全局范围，从而对外部实现了隐藏
     * @namespace
     * @global
     */
    const _status = require('./_status');
    /**
     * 包(游戏牌, 武将牌, 拓展)管理相关
     * 游戏入口{@link lib.init.init}
     * @namespace
     * @global
     */
    const lib = {
      configprefix: 'vtuberkill_1.9_',
      versionOL: 27,
      updateURLS: {
        coding: 'https://v8gamemaker.coding.net/p/vtuberkill/d/vtuberkill_github/git/raw/',
        github: 'https://v8gamemaker.coding.net/p/vtuberkill/d/vtuberkill_github/git/raw/',
      },
      updateURL: 'https://v8gamemaker.coding.net/p/vtuberkill/d/vtuberkill_github/git/raw/',
      mirrorURL: 'https://v8gamemaker.coding.net/p/vtuberkill/d/vtuberkill_github/git/raw/',
      hallURL: 'www.vtuberkill.com',
      assetURL: '',
    };
    /**
     * 游戏内核
     * 游戏循环{@link game.loop}
     * @namespace
     * @global
     */
    const game = {};
    /**
     * 游戏UI库
     * @namespace
     * @global
     */
    const ui = {};
    /**
     * 游戏工具函数库，对游戏中一些常用操作(查询，选择，转换，判断等)进行了封装
     * @namespace
     * @global
     */
    const get = {};
    /**
     * 游戏AI模块
     * @namespace
     * @global
     */
    const ai = {};
    const vkCore  = window.vkCore = { game, ui, get, ai, lib, _status }
    function vkExtends(target, source) {
      for (var k in source) {
        if (source.hasOwnProperty(k) === true) {
          target[k] = source[k];
        }
      }
    }
    vkExtends(lib, require('./lib').libFun(vkCore))
    vkExtends(game, require('./_game').gameFun(vkCore))
    vkExtends(ui, require('./ui').uiFun(vkCore))
    vkExtends(get, require('./get').getFun(vkCore))
    vkExtends(ai, require('./ai').aiFun(vkCore))
    //导入资源
    require('@d/entry')
    require('@m/entry')
    game.galgameMod();
    lib.init.init();
  }
}
