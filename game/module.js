/**
 * 断言
 * @param {any} condition 断言条件，如果不为真值则抛出错误
 * @param {?string} [message='Assertion failed'] 断言错误信息
 */
 function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}
/**
 * 观察者模块
 * 被观察者
 * @class
 */
 class Subject {
    get observers(){
        return this._observers;
    }
    constructor(){
        this._observers = new Map();
    }
    /**
     * 
     * @param {any} observer 观察者对象
     * @param {function} callback 回调函数，this为绑定的观察者对象`observer`
     * @example
     * let _x = 0;
     * let onUpdateX = new Subject();
     * set x(x){
     *     console.log('x: '+_x+'to '+ x);
     *     _x = x;
     *     onUpdateX.notify(x);
     * }
     * get x(){
     *     return _x;
     * }
     * let y = 0;
     * onUpdateX.set(undefined, function(x){
     *     console.log('y: '+y+'to '+x);
     *     y = x;
     * });
     * x = 1;
     * console.log('x: '+x+'y: '+y);
     * x = 'Hello Subject';
     * console.log('x: '+x+'y: '+y);
     */
    set(observer, callback){
        if(observer){
            assert(callback && typeof callback === 'function', "Observer's callback is undefined or is not a function.");
            this._observers.set(observer, callback);
        }
    }
    delete(observer){
        if(observer) this._observers.delete(observer);
    }
    notify(){
        for(var [observer, callback] of this._observers.entries()){
            callback.apply(observer, arguments);
        }
    }
};
/**游戏模块管理器
 *@example<caption>定义模块A</caption>
 * <script src='A.js' data-module='A'></script>
 * moduleManager.define([], function(){
 *     return {x:1};
 * });
 * @example<caption>定义模块B</caption>
 * <script src='B.js' data-module='B'></script>
 * moduleManager.define(['A'], function(A){
 *     return {A, y:2};
 * });
 * @example<caption>引用模块B</capion>
 * moduleManager.require(['B'], function(B){
 *     console.log('x='+B.A.x+' y='+B.y);
 * });
 * console.log('End');
 * //output:
 * //End
 * //x=1 y=2
 * @module moduleManager
 */
var moduleManager = (function Manager()/** @lends module:moduleManager*/{
    var modules = {};
    /**
     * 配置数据
     * @member {Object} config
     * @instance
     * @property {string} baseUrl 根路径
     * @property {Object} alias 别名映射
     * @todo implement alias
     */
    var config = {
        baseUrl: 'game/',
        alias:{}
    };
    const head = document.getElementsByTagName('head')[0];
    /**
     * 模块
     * @class Module
     */
    class Module {
        /**
         * 是否初始化
         */
        get isInited(){
            return this._isInited;
        }
        constructor(dep){
            this.dep = dep;
            this.script = null;
            this._module = null;
            this._onInited = new Subject();
            this._isInited = false;
            this._lastCallbackId = 0;
        }
        /**
         * 返回模块
         * @returns {any} 模块
         */
        get(){
            assert(this._isInited, `A module[${this.dep}] is not inited.`);
            return this._module;
        }
        /**
         * 模块初始化/延迟初始化函数
         * @param {!string[]} deps 依赖模块名数组
         * @param {function} impl 模块实现函数
         */
        init(deps, impl){
            invokeOnReady(deps, (...args)=>{
                this._setModule(impl.apply(impl, args));
            });
        }
        /**
         * 在模块初始化成功时调用回调函数
         * @param {function} callback 回调函数
         */
        then(callback){
            if(this.isInited){
                callback();
            }else{
                this._onInited.set(++this._lastCallbackId, callback);
            }
        }
        _setModule(module){
            this._module = module;
            this._isInited = true;
            while(this._lastCallbackId){
                var callback = this._onInited.observers.get(this._lastCallbackId);
                callback.apply(this._lastCallbackId);
                this._onInited.delete(this._lastCallbackId);
                --this._lastCallbackId;
            }
        }
    }
    /**
     * 返回对应模块是否存在
     * @function checkModule
     * @param {!string} dep 依赖模块名
     * @returns {!boolean}
     */
    function checkModule(dep){
        const module = getModule(dep);
        return !!module && module.isInited;
    }
    /**
     * 返回对应模块，如果不存在则返回undefined
     * @function getModule
     * @param {!string} dep 依赖模块名
     * @returns {?Module}
     */
    function getModule(dep){
        return modules[dep];
    }
    /**
     * 设置对应模块名的模块对象，如果模块已存在，不修改并返回原模块对象
     * @function setModule
     * @param {!string} dep 模块名
     * @param {!Module} module 模块对象
     * @returns {!Module} 模块对象
     */
    function setModule(dep, module){
        return modules[dep] || (module.dep = dep, modules[dep] = module);
    }
    /**
     * 创建脚本DOM元素
     * @function createScript
     * @returns {HTMLScriptElement}
     */
    function createScript(){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        return script;
    }
    /**
     * 由依赖模块名转化为URL
     * @function toUrl
     * @param {!string} dep 依赖模块名
     * @returns {!string}
     */
    function toUrl(dep){
        const depParts = dep.split('/');
        let parts = config.baseUrl.split('/');
        let nextIdx = parts[parts.length]? parts.length: parts.length - 1;
        for(var i=0; i< depParts.length; ++i){
            if(depParts[i] === '.' || depParts[i] === '') continue;
            else if(depParts[i] === '..') --nextIdx;
            else {
                parts[nextIdx++] = depParts[i];
            }
        }
        assert(nextIdx > 0, `Dependency[${dep}] is not a valid url.`);
        if(nextIdx < parts.length) parts = parts.slice(0, nextIdx);
        let url = parts.join('/');
        if(!/\.js/.test(url)) url = url + '.js';//add suffix '.js'
        return url;
    }
    /**
     * 立即调用回调函数
     * @function immediateInvoke
     * @param {!string[]} deps 依赖模块名数组
     * @param {function} callback 回调函数，`arguments`为依赖模块数组，与`deps`中的顺序一致
     * @returns 回调函数的返回值
     */
    function immediateInvoke(deps, callback){
        let args = [];
        for(var i=0;i<deps.length; ++i){
            args[i] = getModule(deps[i]).get();
        }
        return callback.apply(callback, args);
    }
    /**
     * 在所有依赖模块加载完毕时调用回调函数
     * @function invokeOnReady
     * @param {!string} deps 依赖模块名数组
     * @param {function} callback 回调函数，`arguments`为依赖模块数组，与`deps`中的顺序一致
     */
    function invokeOnReady(deps, callback){
        var notLoadedModulesCount = 0;
        const notLoadedScripts = [];
        //异步加载
        var onInited = ()=>{
            if(notLoadedModulesCount > 0){
                --notLoadedModulesCount;
                if(!notLoadedModulesCount){
                    immediateInvoke(deps, callback);
                }
            }
        };
        for(var i=0; i<deps.length; ++i){
            var dep = deps[i];
            if(!checkModule(dep)){
                var module = getModule(dep) || new Module();
                module.then(onInited);
                if(!module.script){
                    var script = createScript();
                    script.src = toUrl(dep);
                    script.setAttribute('data-module', dep);
                    script.addEventListener('error', onScriptError, false);
                    notLoadedScripts.push(script);
                    module.script = script;
                }
                setModule(dep, module);
                ++notLoadedModulesCount;
            }
        }

        if(!notLoadedModulesCount){
            immediateInvoke(deps, callback);
        }else{
            notLoadedScripts.forEach(node=> head.appendChild(node));
        }
    }
    function onScriptError(evt){
        const script = evt.currentTarget;
        console.log(`Load module[dep=${script.getAttribute('data-module')}, src=${script.src}] failed.`);
        script.removeEventListener('error', onScriptError);
    }
    /**
     * 定义模块函数，在所有依赖模块加载完毕时调用模块实现函数
     * @function define
     * @instance
     * @param {!string[]} deps 依赖模块名数组，如果没有依赖模块，传入空数组`[]`
     * @param {function} impl 模块实现函数，`arguments`为依赖模块数组，与`deps`中的顺序一致
     */
    function define(deps, impl){
        const script = document.currentScript;
        const dep = script.getAttribute('data-module');
        if(!checkModule(dep)){
            let module = getModule(dep) || new Module();
            module.script = script;
            module.init(deps, impl);
            setModule(dep, module);
        }
    }
    /**
     * 加载模块函数，在所有模块加载完毕时调用回调函数
     * @function require
     * @instance
     * @param {!string[]} deps 依赖模块名数组，如果没有依赖模块，传入空数组`[]`
     * @param {function} callback 回调函数，`arguments`为依赖模块数组，与`deps`中的顺序一致
     */
    function require(deps, callback){
        invokeOnReady(deps, callback);
    }

    return{
        config,
        define,
        require
    };
})();