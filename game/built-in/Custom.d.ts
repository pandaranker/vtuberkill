declare global {

    //模块结构
    type Key = string | Array<any>
    type Keyword = string | Array<string>
    type Dialogword = Array<Key>
    type Charaword = Array<>
    type Skill = {
        enable?: Keyword
        trigger?: Keyword
        usable?: number
        group?: Keyword
        subSkill?: { [propName: string]: Skill }
        [propName: string]: any
    }
    type Chara = {
        [propName: string]: [string, string, number | string, Array<string>, Array<string>?]
    }
    interface currentObject {
        character: Chara
        skill: Skill
        characterTitle: { [propName: string]: string }
        [propName: string]: any
    }

    //常用变量结构
    var player: PlayerModel, source: PlayerModel | string, target: PlayerModel
    var targets: PlayerModel[]
    var card: Object
    var cards: Object[]
    var trigger:Status_Event
    var galgame: { sce(string): void }
    var targets: PlayerModel[]
    var num: number
    var result: Array | {
        bool?: Boolean
        targets?: PlayerModel[]
        cards?: Array
        links?: Array
    }
    var event:Status_Event
    //原生游戏核心类
    class Status_Event {
        LinkParent(event: Object): Status_Event
        LinkChild(event: Object): Status_Event
        LinkAfter(event: Object): Status_Event
        [propName: string]: any
        constructor(event: Object)
    }
    //扩展的类
    class JSZip {
        file(name: string | RegExp, data: String | ArrayBuffer | Uint8Array | Buffer, o?: Object): JSZip | Object | Array
    }
}
export { }