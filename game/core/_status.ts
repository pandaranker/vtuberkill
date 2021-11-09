moduleManager.define(['core/core'], function ({_status, lib, game, ui, get, ai}) {
    /**
     * 其中的变量是游戏中的全局变量，因为是在IIFE中声明而不是实际上的全局范围，从而对外部实现了隐藏
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
        event: {
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
        },
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
		prehidden_skills:[],
    });
    return _status;
});
