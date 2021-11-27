///<reference path="./_status.d.ts" />
///<reference path="./lib.d.ts" />
const _status:_status_type = {} as _status_type;
const lib:lib_type = {} as lib_type;
const game:Record<string, any> = {};
const ui:Record<string, any> = {};
const get:Record<string, any> = {};
const ai:Record<string, any> = {};

/**
     * 混入函数
     * @param {(object|prototype)} ori 被混入的对象[原型]
     * @param {Object} mix 混入的对象
     * @returns {undefined}
     */
 function mixin(ori:Record<string, any>, mix:Record<string, any>):Record<string, any>{
    if(!mix||!ori) return ori;
    for(const key of Object.keys(mix)){
        if(!ori[key]){
            ori[key] = mix[key];
        }else if(typeof mix[key] === 'function' && typeof ori[key] === 'function'){
            console.warn('Function['+key+'] is overridden.');
            ori[key] = mix[key];
            // let oriFunc = ori[key];
            // ori[key] = function(){
            //     oriFunc.apply(this, arguments);
            //     mix[key].apply(this, arguments);
            // }
        }else if(Array.isArray(mix[key]) && Array.isArray(ori[key])){
            (ori[key] as Array<any>).push(...(mix[key] as Array<any>));
        }else{
            console.warn('Property['+ori[key]+'] is overridden['+mix[key]+'].');
            ori[key] = mix[key];
        }
    }
    return ori;
}
export {
    _status,
    lib,
    game,
    ui,
    get,
    ai,
    mixin
};