"use strict";
//Check global object.
const globalThis = function(){
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
}();

// var event = _status.event;
// var step = event.step; //很重要，在替换switch-step体系之前，不可删除
// var source = event.source;
// var player = event.player;
// var target = event.target;
// var targets = event.targets;
// var card = event.card;
// var cards = event.cards;
// var skill = event.skill;
// var forced = event.forced; //使用过少，故删除
// var num = event.num;
// var trigger = event._trigger;
// var result = event._result;

// var keys = ['step','player','source','target','targets','card','cards','_trigger','_result','num','skill']
var event = null
// var step = null
// var player = null
// var source = null
// var target = null
// var targets = []
// var card = null
// var cards = []
// var trigger = null
// var result = null
// var num = null
// var skill = null
// /**父子事件变量映射表*/
// var mapKeys = ['step','player','source','card','skill'], allMap = {}
// for(let i of mapKeys){
//     // allRecord[i+'Record'] = [undefined]
//     allMap[i+'Map'] = new Map()
// }
/**从映射表更新全局变量 */
// function update_record(v, evt, method){
//     if(method){
//         if(mapKeys.includes(method)){
//             allMap[method+'Map'].set(evt,v)
//         }
//         else{
//             switch(method){
//                 case 'Parent':
//                     for(let i of mapKeys){
//                         allMap[i+'Map'].delete(evt)
//                         allMap[i+'Map'].delete(evt.parent)
//                     }
//                     break;
//                 case 'After':
//                     for(let i of mapKeys){
//                         allMap[i+'Map'].delete(evt)
//                     }
//                     break;
//             }
//         }
//     }
//     //累了，毁灭了
//     // }else if(v){
//     // }
//     // else{
//     //     let stepMap = new Map(allMap.stepMap)
//     //     let playerMap = new Map(allMap.playerMap)
//     //     let sourceMap = new Map(allMap.sourceMap)
//     //     let cardMap = new Map(allMap.cardMap)
//     //     let skillMap = new Map(allMap.skillMap)
//     //     step = stepMap.flat().pop()
//     //     player = stepMap.flat().pop()
//     //     source = sourceMap.flat().pop()
//     //     card = cardMap.flat().pop()
//     //     skill = skillMap.flat().pop()
//     // }
//     else{
//         if(event!=null){
//             step = event.step;
//             source = event.source;
//             player = event.player;
//             target = event.target;
//             targets = event.targets;
//             card = event.card;
//             cards = event.cards;
//             skill = event.skill;
//             num = event.num;
//             trigger = event._trigger;
//             result = event._result;
//         }
//     }
// }
class Status_Event {
    _LinkChild = []
    _LinkAfter = []
    //从子状态事件转到父状态事件
    LinkParent(evt = this.parent){
        if(!evt)    throw(this)
        // this.forget('Parent',evt)
        event = evt
        // update_record()
        return evt
    }
    //创建子状态事件
    LinkChild(evt){
        // this.forget('Child')
        let child = new Status_Event(evt)
        this._LinkChild.push(child)
        child.parent = this
        // update_record()
        return child
    }
    //创建妹妹状态事件
    LinkAfter(evt){
        // this.forget('After')
        let after = new Status_Event(evt)
        if(!this._linkAfter)   this._linkAfter = []
        this._linkAfter.push(after)
        after._before = this
        // update_record()
        return after
    }
    //赋初始值
    constructor(evt){
        event = this
        for(let v in evt){
            this[v] = evt[v];
        }
    }
    // //切换状态事件时，遗忘原事件产生的全局变量
    // forget(method,evt){
    //     event = null
    //     step = null
    //     player = null
    //     source = null
    //     target = null
    //     targets = null
    //     trigger = null
    //     update_record(null,this,method)
    //     if(method === 'Parent'){
    //         for(let k of keys){
    //             evt[k] = evt[k]
    //         }
    //     }
    //     update_record()
    //     // console.log(method,player,playerRecord)
    // }
    // get step() {return this.__step}
    // set step(v) {
    //     update_record(v, this, 'step')
    //     this.__step = v
    //     update_record('step')
    // }
    // get player() {return this.__player}
    // set player(v) {
    //     update_record(v, this, 'player')
    //     this.__player = v
    //     update_record('player')
    // }
    // get source() {return this.__source}
    // set source(v) {
    //     update_record(v, this, 'source')
    //     this.__source = v
    //     update_record('source')
    // }
    // get target() {return this.__target}
    // set target(v) {
    //     this.__target = v
    //     target = v
    // }
    // get targets() {return this.__targets}
    // set targets(v) {
    //     this.__targets = v
    //     targets = v
    // }
    // get card() {return this.__card}
    // set card(v) {
    //     update_record(v, this, 'card')
    //     this.__card = v
    //     update_record('card')
    // }
    // get cards() {return this.__cards}
    // set cards(v) {
    //     this.__cards = v
    //     cards = v
    // }
    // get _trigger() {return this.___trigger}
    // set _trigger(v) {
    //     this.___trigger = v
    //     update_record('trigger')
    // }
    // get _result() {return this.___result}
    // set _result(v) {
    //     this.___result = v
    //     update_record('result')
    // }
    // get num() {return this.__num}
    // set num(v) {
    //     // console.log(num)
    //     this.__num = v
    //     num = v
    // }
    // get skill() {return this.__skill}
    // set skill(v) {
    //     update_record(v, this, 'skill')
    //     this.__skill = v
    //     update_record('skill')
    // }
}
/**
 * 混入函数
 * @param {(object|prototype)} ori 被混入的对象[原型]
 * @param {Object} mix 混入的对象
 * @returns {undefined}
 */
function mixin(ori, mix){
    if(!mix||!ori) return;
    for(const [key, val] of Object.entries(mix)){
        if(!ori[key]){
            ori[key] = val;
        }else if(typeof val === 'function'){
            let oriFunc = ori[key];
            ori[key] = function(){
                oriFunc.apply(this, arguments);
                val.apply(this, arguments);
            }
        }else{
            ori[key] = val;
        }
    }
}
//Load moduleManager.
new Promise((resolve, reject)=>{
    if(!globalThis.moduleManager){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        const rootDir = localStorage.getItem('noname_inited');
        var baseUrl = '';//根路径
        if(rootDir && rootDir !== 'nodejs'){
            baseUrl = rootDir;
        }
        baseUrl += 'game/';
        script.src = baseUrl + 'module.js';
        function onScriptLoaded(evt){
            const script = getScript(evt);
            globalThis.moduleManager.config.baseUrl = baseUrl;
            resolve(script);
        }
        function onScriptError(evt){
            const script = getScript(evt);
            reject(script);
        }
        function getScript(evt){
            const script = evt.currentTarget;
            script.removeEventListener('load', onScriptLoaded);
            script.removeEventListener('error', onScriptError);
        }
        script.addEventListener('load', onScriptLoaded, false);
        script.addEventListener('error', onScriptError, false);
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        console.log('Game begin to run.');
    }
}).then(()=>{//初始化游戏
    globalThis.moduleManager.require(['core/_status', 'core/lib', 'core/game', 'core/ui', 'core/get', 'core/ai'], function(_status, lib, game, ui, get, ai){
        globalThis.game = game
        globalThis.event = _status.event
        globalThis.player = _status.event.player
        lib.figure = '<span style="font-family: LuoLiTi2;color: #dbb">'
        lib.figurer = text => ` ${lib.figure}${text}</span> `
        lib.spanClass = (str,classes)=>{
            return `<span class="${classes}">${str}</span>`
        }
        game.galgameMod();
        lib.init.init();
        console.log('Game initialized.');
    });
}).catch(()=>{
    console.log('Game crashed.');
});


/**
 * Build-in Array
 * @name Array
 * @class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}
 */
/**
 * @name Error
 * @class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error Error}
 */
/**
 * 
 * @name HTMLDivElement
 * @class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement HTMLDivElement}
 */
/**
 * @name HTMLTableElement
 * @class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement HTMLTableElement}
 */
/**
 * @name HTMLTableCellElement
 * @class
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement HTMLTableCellElement}
 */
/**
 * @event MouseEvent
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent MouseEvent}
 */
/**
 * @event TouchEvent
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent TouchEvent}
 */
/**
 * @event KeyboardEvent
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent KeyboardEvent}
 */

/** 访问本地存储数据，如果是网页端或禁止使用indexedDB的情况下，部分数据会以`lib.configprefix + name`的形式存入localStorage
 * ##### 键值表
 * |Key Name|Constant|Nullable|Desciption|
 * |:------:|:------:|:------:|:--------:|
 * |noname_inited|是|是|客户端参数，在首次启动文件下载完成时初始化，值表示设备环境是移动端（dir path）还是PC端（nodejs）；如果是通过网页入口访问，`noname_inited`为undefined|
 * ||||
 * **constant**: 只读数据，初始化后其值不会也不应该变化
 * **Nullable**: 可空值，初始化后其值可能为空
 * @name localStorage
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage localStorage}
 */

/**
 * 游戏核心组件
 * @namespace GameCores
 */
/**
 * 游戏配置信息
 * 初始化前在`windows.noname_config`中(见config.js)；初始化完成后，在`lib.config`中
 * |Config Name|Support|Custom Config|Description|
 * |:---------:|:-----:|:-----------:|:---------:|
 * |touchscreen|是|是|触屏模式，true表示开启；仅支持移动端|
 * |totouched|是|否|移动端是否是第一次初始化，如果是第一次，则初始化后此值设置为true|
 * |toscrolled|是|否|MAC是否是第一次初始化，如果是第一次，则初始化后此值设置为true|
 * |low_performance|是|是|流畅（低性能）模式，移动端默认开启|
 * |confirm_exit|是|是|退出游戏确认弹窗，true表示开启，移动端默认开启|
 * |fold_mode|是|是|是否采用折叠式菜单，true表示采用，移动端默认关闭|
 * |phonelayout|是|是|移动端手机布局，true表示采用|
 * |show_statusbar_ios|是|是|显示状态栏，取值: 'auto', 'overlay', 'default', 'off'|
 * |mousewheel|是|是|滚轮控制手牌，true表示开启，在MAC上默认关闭|
 * |layout|是|是|游戏布局，详见{@link GameLayout}|
 * |show_cardpile|是|是|是否显示牌堆，true表示显示，默认显示|
 * **Support**: 当前版本是否支持
 * **Custom Config**: 是否可由用户自定义
 * @name GameConfig
 * 
 */
/**
 * 游戏牌区域
 * |位置|字符串|
 * |:--:|:---:|
 * |手牌区|h|
 * |装备区|e|
 * |判定区|j|
 * |处理区|o|
 * |武将牌上|s|
 * |牌堆|c|
 * |弃牌堆|d|
 * Regex: [hejoscd]+
 * @typedef {string} GameCores.CardPosition
 */
/**
 * 游戏基础
 * @namespace Bases
 * @memberof GameCores
 */
/**
 * 游戏对象
 * @namespace GameObjects
 * @memberof GameCores
 */
/**
 * 状态机，本质是一个由switch控制的无返回值函数
 * @callback GameCores.Bases.StateMachine
 * @param {!GameCores.Bases.Event} event 当前事件
 * @param {?Object} event.result 状态机返回值，当状态机运行结束后，将该值传递给父事件的`event._result`；在状态机中不使用`return obj`返回结果，而使用`event.result = obj`或`this.result = obj`返回结果给父事件
 * @param {!number} step 当前状态，等同于`event.step`
 * @param {?GameCores.GameObjects.Player} source 触发源的事件角色，等同于`event.source`
 * @param {?GameCores.GameObjects.Player} player 当前事件角色，等同于`event.player`
 * @param {?GameCores.GameObjects.Player} target 目标角色，等同于`event.target`
 * @param {?GameCores.GameObjects.Player[]} targets 目标角色数组，等同于`event.targets`
 * @param {?GameCores.GameObjects.Card} card 牌，等同于`event.card`
 * @param {?GameCores.GameObjects.Card} cards 牌数组，等同于`event.cards`
 * @param {?string} skill 技能ID，等同于`event.skill`
 * @param {?boolean} forced 事件是否必选，通常使用于选择事件，如果为true，表示必选项，玩家/ai必须做出选择，不可取消；如果为虚值，表示可以回退/取消；如果事件不需要该项，默认未指定(undefined)；等同于`event.forced`
 * @param {?number} num 见{@link content.useCard}，等同于`event.num`
 * @param {?GameCores.Bases.Event} trigger 当前事件的触发源(事件)，等同于`event.trigger`
 * @param {?Object} result 子事件的返回结果，等同于`event._result`
 * @param {!_status} _status 全局变量
 * @param {!lib} lib
 * @param {!game} game 
 * @param {!ui} ui
 * @param {!get} get
 * @param {!ai} ai
 * @this GameCores.Bases.Event
 */
(function () {






	
}());
