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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Status_Event {
        //赋初始值
        constructor(evt) {
            this._LinkChild = [];
            this._LinkAfter = [];
            this.parent = Status_Event.event || null;
            Status_Event.event = this;
            for (let v in evt) {
                this[v] = evt[v];
            }
        }
        //从子状态事件转到父状态事件
        LinkParent(evt = this.parent) {
            if (!evt)
                throw (event);
            // this.forget('Parent',evt)
            Status_Event.event = evt;
            // update_record()
            return evt;
        }
        //创建子状态事件
        LinkChild(evt) {
            // this.forget('Child')
            let child = new Status_Event(evt);
            this._LinkChild.push(child);
            child.parent = this;
            Status_Event.event = child;
            // update_record()
            return child;
        }
        //创建妹妹状态事件
        LinkAfter(evt) {
            // this.forget('After')
            let after = new Status_Event(evt);
            this._LinkAfter.push(after);
            after._before = this;
            Status_Event.event = after;
            // update_record()
            return after;
        }
    }
    globalThis.Status_Event = Status_Event;
    exports.default = Status_Event;
});
