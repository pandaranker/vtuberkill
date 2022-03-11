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
    const vkCore = window.vkCore = { game, ui, get, ai, lib, _status }
    function vkExtends(target, source) {
      for (let k in source) {
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
    //galgame相关功能
    require('@e/galgame/galgame')()
    //点击特效功能
    game.clickCanvas = require('@e/clickCanvas')
    //引入自定义样式
    require('@l/custom.less')
    if (typeof global === 'undefined' || !__dirname.length) {
      lib.init.sheet(`*{
        cursor: url('./layout/cursor/aero_arrow_glow.cur'),auto;
      }`)
    }
    lib.init_pack = (pack) => {
      if (game.getFileList instanceof Function) {
        pack.play['特效测试'] = '特效测试'
      }
    }
    lib.init_extra = () => {
      if (game.getFileList instanceof Function) {
        lib.extensionMenu['extension_特效测试'] = {
          enable: {
            name: '开启',
            init: false,
            restart: true,
            onclick: function (bool) {
              if (bool) {
                lib.config.plays.add('特效测试');
              }
              else {
                lib.config.plays.remove('特效测试');
              }
              game.saveConfig('plays', lib.config.plays);
            }
          },
        }
      }
    }
    game.putBuff = (player, skill, buff) => {
      game.broadcastAll(function (player, skill, buff) {
        if (!player.node[skill + '_buff']) {
          player.node[skill + '_buff'] = [ui.create.div(buff, player.node.avatar), ui.create.div(buff, player.node.avatar2)];
        }
      }, player, skill, buff);
    }
    game.clearBuff = (player, skill) => {
      game.broadcastAll(function (player, skill) {
        if (player.node[skill + '_buff']) {
          if (player.node[skill + '_buff'][0].delete) {
            player.node[skill + '_buff'][0].delete();
            player.node[skill + '_buff'][1].delete();
          }
          delete player.node[skill + '_buff']
        }
      }, player, skill);
    }
    ui.putImgDialog = (str) => {
      if (str && !ui[`imgDialog_${str}`]) {
        let dialog = ui.create.dialog('hidden');
        dialog.classList.add('static');
        ui.window.appendChild(dialog);
        dialog.style.left = 'calc(50% - 270px)';
        dialog.style.top = 'calc(50% - 160px)';
        dialog.style.height = '55%';
        dialog.style.width = '60%';
        dialog.style.zIndex = 3;
        dialog.style.animation = 'card_start 0.4s';
        dialog.style.backgroundRepeat = 'no-repeat';
        dialog.setBackgroundImage(`layout/uiImg/${str}.png`)
        ui[`imgDialog_${str}`] = dialog

        game.broadcastAll(function (str) {
          ui.putImgDialog(str);
        }, str);
      }
    },
      ui.clearImgDialog = (str) => {
        if (ui[`imgDialog_${str}`]) {
          let dialog = ui[`imgDialog_${str}`]
          delete ui[`imgDialog_${str}`];
          setTimeout(() => {
            dialog.style.opacity = 0.05;
            setTimeout(() => {
              dialog.delete();
            }, 500);
          }, 1000);
          game.broadcastAll(function (str) {
            ui.clearImgDialog(str);
          }, str);
        }
      }
    lib.skill._pindiankuang = {
      trigger: {
        player: "chooseToCompareBefore",
      },
      forced: true,
      popup: false,
      content: function () {
        let str = 'pindian'
        ui.putImgDialog(str);
      }
    }
    lib.skill._pindiankuangAfter = {
      trigger: {
        player: "chooseToCompareAfter"
      },
      forced: true,
      popup: false,
      content: function () {
        let str = 'pindian'
        ui.clearImgDialog(str);
      }
    }
    lib.init.init();
  }
}
