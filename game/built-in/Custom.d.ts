declare global {

    //模块结构
    type Gender = 'female'|'male'|'none'|'unknown'
    type Key = string | Array<any>
    type Num = string | number
    type Keyword = string | Array<string>
    type AObject = {[propName: string]: Array<string>}
    type Keymap = {[propName: string]: string | Array<string>}
    type Aimap = {[propName: string]: string | Array<string> | number | Keymap}
    type Statmap = {[propName: string]: string | Array<string> | number | boolean}
    type Dialogword = Array<Key>
    type Charaword = Array<>
	type skillContent = () => void
	type skillCheck = (event:Status_Event, player?:PlayerModel) => boolean|number|string
    type targetCheck = (card:any, player?:PlayerModel, event?:Status_Event) => boolean
    interface Skill{
		audio?: number|boolean|string
        enable?: Keyword
        trigger?: Keymap
        usable?: number
        group?: Keyword
        filter?: skillCheck
        check?: skillCheck
        prompt2?: string | skillCheck
        logTarget?: string | ((event:Status_Event, player?:PlayerModel) => boolean|number|string|string[])
        filterTarget?: boolean | targetCheck
		content?: skillContent
        subSkill?: {[propName: string]: Skill}
        position?: string
        [propName: string]: any
    }
    interface Chara{
        [propName: string]: [string, string, number | string, Array<string>, Array<string>?]
    }
    interface currentObject {
        character: Chara
        skill: { [propName: string]: Skill }
        characterTitle?: { [propName: string]: string }
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
    var skill: string
    var result: number | Array | {
        bool?: Boolean
        targets?: PlayerModel[]
        cards?: Array
        links?: Array
    }
    var event:Status_Event
    //原生游戏核心类
    // class Status_Event {
    //     LinkParent(event: Object): Status_Event
    //     LinkChild(event: Object): Status_Event
    //     LinkAfter(event: Object): Status_Event
    //     [propName: string]: any
    //     constructor(event: Object)
    // }
    interface Window{
        game
        play
        isNonameServer
    }
    interface HTMLDivElement{
        getModel:()=>Object
        node?:{[propName: string]: HTMLDivElement}
        noclick?:boolean
        _doubleClicking?:boolean
        onClickAvatar?
        onClickAvatar2?
        onClickCharacter?
        onClickIdentity?
    }
    interface ChildNode{
        innerHTML
        setBackgroundImage
        style
    }
    //扩展的类
    class JSZip {
        generate(Object): String|Uint8Array|ArrayBuffer|Buffer|Blob
        file(name: string | RegExp, data: String | ArrayBuffer | Uint8Array | Buffer, o?: Object): JSZip | Object | Array
    }
}
export { }