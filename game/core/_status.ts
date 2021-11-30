import {_status, mixin} from './_context';
import EventModel from './base/EventModel';
/**
 * 其中的变量是游戏中的全局变量
 * @namespace _status
 * @memberof module:core
 */
mixin(_status, /**@lends module:core._status */ {
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
    event: new EventModel(),
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
    prehidden_skills:[]
});
export default _status;