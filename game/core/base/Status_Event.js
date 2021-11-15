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
        constructor(evt) {
            this._LinkChild = [];
            this._LinkAfter = [];
            this.parent = Status_Event.event || null;
            Status_Event.event = this;
            for (let v in evt) {
                this[v] = evt[v];
            }
        }
        LinkParent(evt = this.parent) {
            if (!evt)
                throw (event);
            Status_Event.event = evt;
            return evt;
        }
        LinkChild(evt) {
            let child = new Status_Event(evt);
            this._LinkChild.push(child);
            child.parent = this;
            Status_Event.event = child;
            return child;
        }
        LinkAfter(evt) {
            let after = new Status_Event(evt);
            this._LinkAfter.push(after);
            after._before = this;
            Status_Event.event = after;
            return after;
        }
    }
    window.Status_Event = Status_Event;
    exports.default = Status_Event;
});
