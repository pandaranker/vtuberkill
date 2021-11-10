"use strict";
globalThis.moduleManager.define(['core/core'], function ({ _status, lib, game, ui, get, ai }) {
    globalThis.mixin(_status, {
        paused: false,
        paused2: false,
        paused3: false,
        over: false,
        clicked: false,
        auto: false,
        event: {
            finished: true,
            next: [],
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
        prehidden_skills: [],
    });
    return _status;
});
