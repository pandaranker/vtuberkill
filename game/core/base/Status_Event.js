var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./EventModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const EventModel_1 = __importDefault(require("./EventModel"));
    class Status_Event extends EventModel_1.default {
        constructor(evt) {
            super(evt.name);
            this._LinkChild = [];
            this._LinkAfter = [];
            this.parent = Status_Event.event || null;
            this.origin = evt;
            Status_Event.event = this;
            for (let v in evt) {
                this[v] = evt[v];
            }
            if (!(evt instanceof Status_Event)) {
                evt.getEvent = () => this;
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
        get orderingCards() {
            return this._orderingCards;
        }
        set orderingCards(e) {
            this._orderingCards = e;
        }
        get targets() {
            return this._targets;
        }
        set targets(e) {
            this._targets = e;
        }
        get fixedSeat() {
            return this._fixedSeat;
        }
        set fixedSeat(e) {
            this._fixedSeat = e;
        }
    }
    window.Status_Event = Status_Event;
    exports.default = Status_Event;
});
