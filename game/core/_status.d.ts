///<reference path="./game.ts"/>
declare type _status_type = {
    paused: boolean,
    paused2: boolean,
    paused3: boolean,
    over: boolean,
    clicked: boolean,
    auto: boolean,
    /**
     * 当前事件对象，游戏内所有未定义的event等价于_status.event
     * @name _status.event
     * @type {!Status_Event}
     */
    event: Status_Event,
    ai: Record<string, any>,
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
    dburgent?: boolean,
    reloading?: boolean,
    waitingToReload?: boolean,
    noclearcountdown?: boolean,
    connectMode?: boolean
}