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

import EventModel from "./EventModel";

// var keys = ['step','player','source','target','targets','card','cards','_trigger','_result','num','skill']
// var event = null
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
interface State_Event {
    _LinkChild:Status_Event[];
    _LinkAfter:Status_Event[];
    parent: Status_Event | null;
    [prop: string]: any;
}
class Status_Event extends EventModel implements State_Event{
    static event:Status_Event;
    _LinkChild:Status_Event[] = [];
    _LinkAfter:Status_Event[] = [];
    parent: Status_Event | null;
    [prop: string]: any;
    //从子状态事件转到父状态事件
    LinkParent(evt:Status_Event| null = this.parent){
        if(!evt) throw(event)
        // this.forget('Parent',evt)
        Status_Event.event = evt
        // update_record()
        return evt
    }
    //创建子状态事件
    LinkChild(evt:Status_Event){
        // this.forget('Child')
        let child = new Status_Event(evt)
        this._LinkChild.push(child)
        child.parent = this
        Status_Event.event = child
        // update_record()
        return child
    }
    //创建妹妹状态事件
    LinkAfter(evt:Status_Event){
        // this.forget('After')
        let after = new Status_Event(evt)
        this._LinkAfter.push(after)
        after._before = this
        Status_Event.event = after
        // update_record()
        return after
    }
    //赋初始值
    constructor(evt:{[prop in keyof State_Event]?:State_Event[prop]}){
        super(evt.name)
        this.parent = Status_Event.event || null;
        this.origin = evt;
        Status_Event.event = this;
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
(window as any).Status_Event = Status_Event;
export default Status_Event;